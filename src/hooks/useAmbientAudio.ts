import { useState, useEffect, useCallback, useRef } from 'react';

const AUDIO_SRC = '/audio/369405__flying_deer_fx__music-box-j.wav';
const DEFAULT_VOLUME = 0.35;
const CHOICE_KEY = 'moi-audio-start-choice';

export function useAmbientAudio() {
  // Whether the visitor has already answered the start-of-site prompt.
  // Returning visitors (choice already stored) skip the prompt entirely and
  // fall back to their previously saved mute/volume preference, exactly as before.
  const [needsStartChoice, setNeedsStartChoice] = useState<boolean>(() => {
    try {
      return localStorage.getItem(CHOICE_KEY) === null;
    } catch {
      return true;
    }
  });
  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('moi-audio-volume');
      if (stored !== null) {
        const val = parseFloat(stored);
        if (!isNaN(val) && val > 0 && val <= 1) return val;
      }
      return DEFAULT_VOLUME;
    } catch {
      return DEFAULT_VOLUME;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('moi-audio-muted');
      return stored !== null ? stored === 'true' : false;
    } catch {
      return false;
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastVolumeRef = useRef<number>(volume > 0 ? volume : DEFAULT_VOLUME);
  const volumeRef = useRef<number>(volume);
  const isMutedRef = useRef<boolean>(isMuted);

  // Sync refs in an effect
  useEffect(() => {
    volumeRef.current = volume;
    isMutedRef.current = isMuted;
  }, [volume, isMuted]);

  // Initialize single native HTMLAudioElement.
  // Returning visitors (who already answered the start prompt) resume playback
  // immediately per their saved preference, same as before. First-time visitors
  // wait for an explicit answer to the start-of-site prompt (see chooseAudioStart).
  useEffect(() => {
    const audio = new Audio();
    audio.src = AUDIO_SRC;
    audio.loop = true;
    audio.preload = 'auto';
    audio.muted = isMutedRef.current;
    audio.volume = isMutedRef.current ? 0 : (volumeRef.current > 0 ? volumeRef.current : DEFAULT_VOLUME);

    let cleanupInteractionListeners: (() => void) | null = null;
    let skipAutoplay = false;
    try {
      skipAutoplay = localStorage.getItem(CHOICE_KEY) === null;
    } catch {
      skipAutoplay = false;
    }

    const tryPlay = () => {
      setIsLoaded(true);
      if (skipAutoplay) return;
      if (!isMutedRef.current && audio.paused) {
        const promise = audio.play();
        if (promise !== undefined) {
          promise.catch((_err) => {
            // Browser blocked unmuted autoplay policy on fresh load.
            // Setup fallback listener on first user interaction (including scroll/wheel/touch/click)
            const events = ['wheel', 'scroll', 'touchmove', 'touchstart', 'pointerdown', 'keydown', 'click'] as const;

            const resumeOnInteraction = () => {
              if (cleanupInteractionListeners) {
                cleanupInteractionListeners();
                cleanupInteractionListeners = null;
              }

              if (audioRef.current && !isMutedRef.current) {
                audioRef.current.muted = false;
                audioRef.current.volume = volumeRef.current > 0 ? volumeRef.current : DEFAULT_VOLUME;
                audioRef.current.play().catch(() => {});
              }
            };

            cleanupInteractionListeners = () => {
              events.forEach((evt) => {
                window.removeEventListener(evt, resumeOnInteraction, true);
              });
            };

            events.forEach((evt) => {
              window.addEventListener(evt, resumeOnInteraction, { capture: true, passive: true });
            });
          });
        }
      }
    };

    audio.addEventListener('canplay', tryPlay, { once: true });
    audio.addEventListener('loadeddata', tryPlay, { once: true });

    audioRef.current = audio;

    // Trigger initial play attempt immediately
    tryPlay();

    return () => {
      if (cleanupInteractionListeners) {
        cleanupInteractionListeners();
      }
      audio.removeEventListener('canplay', tryPlay);
      audio.removeEventListener('loadeddata', tryPlay);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    const audio = audioRef.current;

    if (clamped === 0) {
      setIsMuted(true);
      setVolumeState(0);
      if (audio) {
        audio.muted = true;
        audio.volume = 0;
        audio.pause();
      }
      try {
        localStorage.setItem('moi-audio-muted', 'true');
      } catch {}
    } else {
      lastVolumeRef.current = clamped;
      setVolumeState(clamped);
      setIsMuted(false);
      if (audio) {
        audio.muted = false;
        audio.volume = clamped;
        if (audio.paused) {
          audio.play().catch(() => {});
        }
      }
      try {
        localStorage.setItem('moi-audio-muted', 'false');
        localStorage.setItem('moi-audio-volume', String(clamped));
      } catch {}
    }
  }, []);

  // Answers the one-time start-of-site prompt. Called from a real click handler,
  // so `audio.play()` here satisfies the browser's autoplay policy directly.
  // This only decides how playback *starts*; the HUD's volume/mute controller
  // (setVolume / toggleMute above) is untouched and remains the sole way to
  // change things afterward.
  const chooseAudioStart = useCallback((withMusic: boolean) => {
    try {
      localStorage.setItem(CHOICE_KEY, 'true');
    } catch {}

    const audio = audioRef.current;

    if (withMusic) {
      const startVolume = lastVolumeRef.current > 0 ? lastVolumeRef.current : DEFAULT_VOLUME;
      setVolumeState(startVolume);
      setIsMuted(false);
      if (audio) {
        audio.muted = false;
        audio.volume = startVolume;
        audio.play().catch(() => {});
      }
      try {
        localStorage.setItem('moi-audio-muted', 'false');
        localStorage.setItem('moi-audio-volume', String(startVolume));
      } catch {}
    } else {
      setIsMuted(true);
      if (audio) {
        audio.muted = true;
        audio.pause();
      }
      try {
        localStorage.setItem('moi-audio-muted', 'true');
      } catch {}
    }

    setNeedsStartChoice(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prevMuted) => {
      const nextMuted = !prevMuted;
      const audio = audioRef.current;

      if (!nextMuted) {
        // Unmuting
        const restoredVol = lastVolumeRef.current > 0 ? lastVolumeRef.current : DEFAULT_VOLUME;
        setVolumeState(restoredVol);
        if (audio) {
          audio.muted = false;
          audio.volume = restoredVol;
          if (audio.paused) {
            audio.play().catch(() => {});
          }
        }
        try {
          localStorage.setItem('moi-audio-muted', 'false');
          localStorage.setItem('moi-audio-volume', String(restoredVol));
        } catch {}
      } else {
        // Muting
        if (audio) {
          audio.muted = true;
          audio.pause();
        }
        try {
          localStorage.setItem('moi-audio-muted', 'true');
        } catch {}
      }

      return nextMuted;
    });
  }, []);

  return { isMuted, isLoaded, volume, setVolume, toggleMute, needsStartChoice, chooseAudioStart };
}
