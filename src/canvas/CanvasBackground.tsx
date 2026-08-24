import { useEffect, useRef, useCallback } from 'react';
import type { CanvasMode } from '../lib/types';

import * as PrologueMode from './modes/PrologueMode';
import * as RuptureMode from './modes/RuptureMode';
import * as PurgatoryMode from './modes/PurgatoryMode';
import * as HorizonMode from './modes/HorizonMode';
import * as ForgeMode from './modes/ForgeMode';
import * as StillnessMode from './modes/StillnessMode';

type DrawFn = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  alpha: number
) => void;

type ResizeFn = (canvas: HTMLCanvasElement) => void;

interface ModeModule {
  draw: DrawFn;
  resize: ResizeFn;
}

const MODES: Record<CanvasMode, ModeModule> = {
  prologue: PrologueMode,
  rupture: RuptureMode,
  purgatory: PurgatoryMode,
  horizon: HorizonMode,
  forge: ForgeMode,
  stillness: StillnessMode,
};

const TRANSITION_DURATION = 900; // ms

interface Props {
  activeMode: CanvasMode;
}

export default function CanvasBackground({ activeMode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const currentModeRef = useRef<CanvasMode>(activeMode);
  const targetModeRef = useRef<CanvasMode>(activeMode);
  const transitionStartRef = useRef<number>(0);
  const transitioningRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  // Track mode changes
  useEffect(() => {
    if (activeMode !== targetModeRef.current) {
      currentModeRef.current = targetModeRef.current;
      targetModeRef.current = activeMode;
      transitionStartRef.current = performance.now();
      transitioningRef.current = true;
    }
  }, [activeMode]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    // Reset canvas dimensions for mode modules (use CSS pixel values)
    const cssCanvas = { ...canvas, width: window.innerWidth, height: window.innerHeight } as HTMLCanvasElement;
    Object.values(MODES).forEach(mode => mode.resize(cssCanvas));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const time = (now - startTimeRef.current) / 1000;

      // Use CSS pixel dimensions for drawing
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Create a virtual canvas reference with CSS dimensions
      const virtualCanvas = { width: w, height: h } as HTMLCanvasElement;

      // Clear
      ctx.clearRect(0, 0, w, h);

      if (transitioningRef.current) {
        const elapsed = now - transitionStartRef.current;
        const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        // Draw outgoing mode
        if (eased < 1) {
          MODES[currentModeRef.current].draw(ctx, virtualCanvas, time, 1 - eased);
        }

        // Draw incoming mode
        MODES[targetModeRef.current].draw(ctx, virtualCanvas, time, eased);

        if (progress >= 1) {
          currentModeRef.current = targetModeRef.current;
          transitioningRef.current = false;
        }
      } else {
        MODES[currentModeRef.current].draw(ctx, virtualCanvas, time, 1);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
