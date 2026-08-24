import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ActiveSection, Anthology } from '../lib/types';
import TOCDrawer from './TOCDrawer';

interface Props {
  activeSection: ActiveSection;
  progress: number;
  isMuted: boolean;
  isAudioLoaded: boolean;
  onToggleMute: () => void;
  isVigil: boolean;
  anthology: Anthology | null;
  onNavigate: (target: string) => void;
}

export default function HUD({
  activeSection,
  progress,
  isMuted,
  isAudioLoaded,
  onToggleMute,
  isVigil,
  anthology,
  onNavigate,
}: Props) {
  const [tocOpen, setTocOpen] = useState(false);

  // Build display title
  let displayTitle = '';
  if (activeSection.type === 'hero') {
    displayTitle = 'Musings of Insomnia';
  } else if (activeSection.type === 'epigraph') {
    displayTitle = 'Front Matter · Epigraph';
  } else if (activeSection.type === 'prologue') {
    displayTitle = activeSection.poemTitle
      ? `Prologue · ${activeSection.poemTitle}`
      : 'Prologue · The Genesis';
  } else if (activeSection.type === 'epilogue') {
    displayTitle = 'Epilogue & Author’s Note';
  } else if (activeSection.actTitle) {
    displayTitle = activeSection.poemTitle
      ? `${activeSection.actTitle.split('·')[0].trim()} · ${activeSection.poemTitle}`
      : activeSection.actTitle;
  }

  return (
    <>
      <header
        className="hud-glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem',
          gap: '1rem',
        }}
      >
        {/* Left: Active section title */}
        <div style={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={displayTitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              {displayTitle}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Center: Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(203, 185, 132, 0.08)',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'var(--accent-gold)',
              width: `${progress * 100}%`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Right: Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          {/* Vigil badge */}
          {isVigil && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                padding: '0.2rem 0.5rem',
                border: '1px solid rgba(203, 185, 132, 0.25)',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              12–05 Vigil
            </motion.span>
          )}

          {/* Audio toggle */}
          {isAudioLoaded && (
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isMuted ? 'var(--text-muted)' : 'var(--accent-gold)',
                fontSize: '1rem',
                padding: '0.25rem',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          )}

          {/* TOC toggle */}
          <button
            onClick={() => setTocOpen(!tocOpen)}
            aria-label="Table of Contents"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: tocOpen ? 'var(--accent-gold)' : 'var(--text-muted)',
              fontSize: '1rem',
              padding: '0.25rem',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}
          >
            ☰
          </button>
        </div>
      </header>

      {/* TOC Drawer */}
      <TOCDrawer
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        anthology={anthology}
        activePoemId={activeSection.poemId}
        onNavigate={(target) => {
          onNavigate(target);
          setTocOpen(false);
        }}
      />
    </>
  );
}
