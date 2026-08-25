import { useState, useEffect, useCallback } from 'react';
import type { ActiveSection, CanvasMode, SectionType } from '../lib/types';

function getCanvasModeForSection(type: SectionType, actIndex: number | null): CanvasMode {
  if (type === 'hero' || type === 'epigraph' || type === 'prologue') return 'prologue';
  if (type === 'epilogue' || type === 'credits') return 'stillness';

  if (actIndex === null) return 'prologue';
  switch (actIndex) {
    case 0: return 'rupture';
    case 1: return 'purgatory';
    case 2: return 'horizon';
    case 3: return 'forge';
    case 4: return 'stillness';
    default: return 'prologue';
  }
}

export function useActiveSection(isReady: boolean = true): ActiveSection & { progress: number } {
  const [active, setActive] = useState<ActiveSection>({
    type: 'hero',
    actIndex: null,
    poemId: null,
    poemTitle: null,
    actTitle: null,
    canvasMode: 'prologue',
  });
  const [progress, setProgress] = useState(0);

  const determineActiveFromScroll = useCallback(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    if (sections.length === 0) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const prog = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    setProgress(prog);

    // Viewport center line
    const viewportCenter = window.innerHeight * 0.45;

    let currentSection: HTMLElement | null = null;
    let closestDist = Infinity;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      // Distance of section center to viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);

      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        currentSection = section;
        break;
      }

      if (dist < closestDist) {
        closestDist = dist;
        currentSection = section;
      }
    }

    if (currentSection) {
      const sectionType = (currentSection.dataset.section || 'hero') as SectionType;
      const actIndexStr = currentSection.dataset.actIndex;
      const actIndex = actIndexStr !== undefined ? parseInt(actIndexStr, 10) : null;
      const poemId = currentSection.dataset.poemId || null;

      let poemTitle =
        currentSection.dataset.poemTitle ||
        (poemId ? currentSection.querySelector('.poem-title')?.textContent || null : null);

      let actTitle: string | null = currentSection.dataset.actTitle || null;
      if (!actTitle) {
        if (sectionType === 'hero') {
          actTitle = 'Musings of Insomnia';
        } else if (sectionType === 'epigraph') {
          actTitle = 'Front Matter · Epigraph';
          poemTitle = 'Epigraph';
        } else if (sectionType === 'prologue') {
          actTitle = 'Prologue · The Genesis';
          if (!poemTitle) poemTitle = 'Where Do I Start Again?';
        } else if (sectionType === 'epilogue') {
          actTitle = 'Epilogue & Author’s Note';
        } else if (sectionType === 'credits') {
          actTitle = 'Credits & Acknowledgements';
          if (!poemTitle) poemTitle = 'Credits';
        }
      }

      const canvasMode = getCanvasModeForSection(sectionType, actIndex);

      setActive((prev) => {
        if (
          prev.type === sectionType &&
          prev.actIndex === actIndex &&
          prev.poemId === poemId &&
          prev.canvasMode === canvasMode
        ) {
          return prev;
        }
        return {
          type: sectionType,
          actIndex,
          poemId,
          poemTitle,
          actTitle,
          canvasMode,
        };
      });
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Run initial determination
    determineActiveFromScroll();

    // Scroll listener
    const onScroll = () => {
      determineActiveFromScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Re-check after a brief tick for DOM layout
    const timeout = setTimeout(determineActiveFromScroll, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(timeout);
    };
  }, [isReady, determineActiveFromScroll]);

  return { ...active, progress };
}
