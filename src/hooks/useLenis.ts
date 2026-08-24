import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement) => {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        lenisRef.current?.scrollTo(el as HTMLElement, {
          duration: 1.4,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
        return;
      }
    }
    lenisRef.current?.scrollTo(target, {
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  }, []);

  return { scrollTo };
}
