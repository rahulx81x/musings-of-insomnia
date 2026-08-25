import { useState, useEffect, useCallback, useRef } from 'react';
import { Howl, Howler } from 'howler';

const AUDIO_SRC = '/audio/369405__flying_deer_fx__music-box-j.wav';
const DEFAULT_VOLUME = 0.35;

export function useAmbientAudio() {
  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('moi-audio-volume');
      if (stored !== null) {
        const val = parseFloat(stored);
        if (!isNaN(val) && val >= 0 && val <= 1) return val;
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
  const howlRef = useRef<Howl | null>(null);
  const lastVolumeRef = useRef<number>(volume > 0 ? volume : DEFAULT_VOLUME);
  const isPlayingRef = useRef<boolean>(false);

  // Initialize Howler instance
  useEffect(() => {
    const howl = new Howl({
      src: [AUDIO_SRC],
      loop: true,
      volume: volume > 0 ? volume : DEFAULT_VOLUME,
      mute: isMuted,
      html5: true,
      preload: true,
      format: ['wav'],
      onload: () => {
        setIsLoaded(true);
        if (!isMuted && volume > 0) {
          try {
            const id = howl.play();
            if (id !== null && id !== undefined) {
              isPlayingRef.current = true;
            }
          } catch {
            // Autoplay blocked on mobile, will be unlocked on gesture
          }
        }
      },
      onplay: () => {
        isPlayingRef.current = true;
      },
      onpause: () => {
        isPlayingRef.current = false;
      },
      onstop: () => {
        isPlayingRef.current = false;
      },
      onloaderror: () => {
        setIsLoaded(true);
      },
      onplayerror: (_id, _err) => {
        isPlayingRef.current = false;
        // Autoplay policy prevented playback until user interaction
      },
    });

    howlRef.current = howl;

    return () => {
      howl.unload();
      howlRef.current = null;
      isPlayingRef.current = false;
    };
  }, []);

  // Sync volume / mute changes to Howl and localStorage
  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;

    howl.mute(isMuted);

    if (!isMuted && volume > 0) {
      howl.volume(volume);
      if (!howl.playing()) {
        try {
          howl.play();
        } catch {
          // Handled by user gesture
        }
      }
    }

    try {
      localStorage.setItem('moi-audio-muted', String(isMuted));
      if (volume > 0) {
        localStorage.setItem('moi-audio-volume', String(volume));
      }
    } catch {
      // Ignore storage errors
    }
  }, [isMuted, volume, isLoaded]);

  // Mobile & Desktop gesture unlock: keep listening until audio actually starts playing
  useEffect(() => {
    if (isMuted || volume === 0) return;

    let attached = false;
    const events = ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown'] as const;

    const cleanup = () => {
      if (attached) {
        events.forEach((evt) => {
          window.removeEventListener(evt, handleInteraction, { capture: true });
        });
        attached = false;
      }
    };

    const handleInteraction = () => {
      const howl = howlRef.current;
      if (!howl || isMuted || volume === 0) {
        cleanup();
        return;
      }

      // Resume Web Audio AudioContext if suspended
      if (typeof Howler !== 'undefined' && Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume().catch(() => {});
      }

      // Try unlocking HTML5 Audio node directly if applicable
      try {
        const sound = (howl as unknown as { _sounds?: Array<{ _node?: HTMLAudioElement }> })._sounds?.[0];
        if (sound?._node) {
          sound._node.muted = false;
          sound._node.volume = volume;
        }
      } catch {
        // Ignore
      }

      if (!howl.playing()) {
        try {
          howl.mute(false);
          howl.volume(volume);
          const playId = howl.play();
          if (playId !== null && playId !== undefined) {
            isPlayingRef.current = true;
          }
        } catch {
          // Still waiting or blocked, keep listeners active
        }
      }

      // If audio is now playing, detach listeners
      if (howl.playing() || isPlayingRef.current) {
        cleanup();
      }
    };

    // Attach listeners
    events.forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { capture: true, passive: true });
    });
    attached = true;

    // Also listen to Howl 'play' event to clean up once playing
    const howl = howlRef.current;
    if (howl) {
      if (howl.playing()) {
        cleanup();
      } else {
        howl.once('play', () => {
          cleanup();
        });
      }
    }

    return () => {
      cleanup();
    };
  }, [isMuted, volume, isLoaded]);

  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    const howl = howlRef.current;

    // Resume AudioContext if suspended
    if (typeof Howler !== 'undefined' && Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume().catch(() => {});
    }

    if (clamped === 0) {
      setIsMuted(true);
      setVolumeState(0);
      if (howl) {
        howl.mute(true);
      }
    } else {
      lastVolumeRef.current = clamped;
      setVolumeState(clamped);
      setIsMuted(false);
      if (howl) {
        howl.mute(false);
        howl.volume(clamped);
        if (!howl.playing()) {
          try {
            howl.play();
          } catch {
            // Ignore
          }
        }
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    // Resume AudioContext if suspended
    if (typeof Howler !== 'undefined' && Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume().catch(() => {});
    }

    setIsMuted((prev) => {
      const next = !prev;
      const howl = howlRef.current;
      if (howl) {
        if (!next) {
          // Un-muting
          const restoredVol = lastVolumeRef.current > 0 ? lastVolumeRef.current : DEFAULT_VOLUME;
          setVolumeState(restoredVol);
          howl.mute(false);
          howl.volume(restoredVol);
          if (!howl.playing()) {
            try {
              howl.play();
            } catch {
              // Ignore
            }
          }
        } else {
          // Muting
          howl.mute(true);
        }
      }
      return next;
    });
  }, []);

  return { isMuted, isLoaded, volume, setVolume, toggleMute };
}
