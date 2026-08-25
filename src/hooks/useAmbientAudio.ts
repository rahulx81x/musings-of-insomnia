import { useState, useEffect, useCallback, useRef } from 'react';
import { Howl } from 'howler';

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
      return stored !== null ? stored === 'true' : false; // Default unmuted
    } catch {
      return false;
    }
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const howlRef = useRef<Howl | null>(null);
  const lastVolumeRef = useRef<number>(volume > 0 ? volume : DEFAULT_VOLUME);

  // Initialize Howler instance
  useEffect(() => {
    const howl = new Howl({
      src: [AUDIO_SRC],
      loop: true,
      volume: volume > 0 ? volume : DEFAULT_VOLUME,
      mute: isMuted,
      html5: true,
      format: ['wav'],
      onload: () => {
        setIsLoaded(true);
        if (!isMuted && volume > 0 && !howl.playing()) {
          howl.play();
        }
      },
      onloaderror: () => setIsLoaded(true),
    });

    howlRef.current = howl;

    return () => {
      howl.unload();
      howlRef.current = null;
    };
  }, []);

  // Sync volume / mute changes directly
  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;

    howl.mute(isMuted);

    if (!isMuted && volume > 0) {
      howl.volume(volume);
      if (!howl.playing()) {
        howl.play();
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

  // Autoplay on first user interaction if unmuted
  useEffect(() => {
    if (isMuted || volume === 0) return;

    const handleFirstInteraction = () => {
      const howl = howlRef.current;
      if (howl && !isMuted && volume > 0) {
        howl.mute(false);
        howl.volume(volume);
        if (!howl.playing()) {
          howl.play();
        }
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isMuted, volume]);

  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    const howl = howlRef.current;
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
          howl.play();
        }
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
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
            howl.play();
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

