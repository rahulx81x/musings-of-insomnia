import { useState, useEffect, useCallback, useRef } from 'react';
import { Howl } from 'howler';

export function useAmbientAudio() {
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('moi-audio-muted') === 'true';
    } catch {
      return true; // Default muted
    }
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const howlRef = useRef<Howl | null>(null);

  useEffect(() => {
    const howl = new Howl({
      src: ['/audio/ambient.mp3'],
      loop: true,
      volume: 0,
      html5: true,
      onload: () => setIsLoaded(true),
      onloaderror: () => setIsLoaded(false),
    });

    howlRef.current = howl;

    return () => {
      howl.unload();
      howlRef.current = null;
    };
  }, []);

  // Sync mute state
  useEffect(() => {
    const howl = howlRef.current;
    if (!howl || !isLoaded) return;

    if (!isMuted) {
      if (!howl.playing()) howl.play();
      howl.fade(howl.volume(), 0.3, 1500);
    } else {
      howl.fade(howl.volume(), 0, 800);
      setTimeout(() => {
        if (howlRef.current?.volume() === 0) {
          howlRef.current?.pause();
        }
      }, 900);
    }

    try {
      localStorage.setItem('moi-audio-muted', String(isMuted));
    } catch {
      // Ignore storage errors
    }
  }, [isMuted, isLoaded]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  return { isMuted, isLoaded, toggleMute };
}
