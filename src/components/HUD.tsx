import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ActiveSection, Anthology } from '../lib/types';
import TOCDrawer from './TOCDrawer';

interface Props {
  activeSection: ActiveSection;
  progress: number;
  isMuted: boolean;
  isAudioLoaded: boolean;
  volume: number;
  onVolumeChange: (vol: number) => void;
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
  volume,
  onVolumeChange,
  onToggleMute,
  isVigil,
  anthology,
  onNavigate,
}: Props) {
  const [tocOpen, setTocOpen] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);

  // Close volume popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setVolumeOpen(false);
      }
    };
    if (volumeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [volumeOpen]);

  // Dynamic volume icon
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 0.35) return '🔈';
    if (volume < 0.70) return '🔉';
    return '🔊';
  };

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
  } else if (activeSection.type === 'credits') {
    displayTitle = 'Credits & Acknowledgements';
  } else if (activeSection.actTitle) {
    displayTitle = activeSection.poemTitle
      ? `${activeSection.actTitle.split('·')[0].trim()} · ${activeSection.poemTitle}`
      : activeSection.actTitle;
  }

  const effectiveVolume = isMuted ? 0 : volume;
  const percentage = Math.round(effectiveVolume * 100);

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

          {/* Audio Volume Controller */}
          <div
            ref={volumeRef}
            className="hud-volume-control"
            style={{
              position: 'relative',
            }}
          >
            {/* Audio Icon Button */}
            <button
              onClick={() => setVolumeOpen(prev => !prev)}
              aria-label="Sound settings"
              title="Adjust ambient volume"
              style={{
                background: volumeOpen ? 'rgba(203, 185, 132, 0.15)' : 'none',
                border: volumeOpen ? '1px solid rgba(203, 185, 132, 0.3)' : '1px solid transparent',
                borderRadius: '4px',
                cursor: 'pointer',
                color: isMuted ? 'var(--text-muted)' : 'var(--accent-gold)',
                fontSize: '1.05rem',
                padding: '0.25rem 0.35rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                opacity: isAudioLoaded ? 1 : 0.6,
              }}
            >
              {getVolumeIcon()}
            </button>

            {/* Click-triggered Volume Popover */}
            <AnimatePresence>
              {volumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    width: '210px',
                    background: 'rgba(18, 20, 30, 0.96)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(203, 185, 132, 0.25)',
                    borderRadius: '8px',
                    padding: '0.9rem 1rem',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
                    zIndex: 60,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-gold)',
                      }}
                    >
                      Ambient Music
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.75rem',
                        color: isMuted ? 'var(--text-muted)' : 'var(--text-light)',
                        minWidth: '28px',
                        textAlign: 'right',
                      }}
                    >
                      {percentage}%
                    </span>
                  </div>

                  {/* Volume range slider */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={effectiveVolume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      aria-label="Volume slider"
                      style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        width: '100%',
                        height: '4px',
                        borderRadius: '2px',
                        background: `linear-gradient(to right, var(--accent-gold) 0%, var(--accent-gold) ${percentage}%, rgba(203, 185, 132, 0.2) ${percentage}%, rgba(203, 185, 132, 0.2) 100%)`,
                        outline: 'none',
                        cursor: 'pointer',
                        display: 'block',
                      }}
                      className="hud-volume-slider"
                    />
                  </div>

                  {/* Quick Toggle Action Button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.6rem',
                      borderTop: '1px solid rgba(203, 185, 132, 0.12)',
                    }}
                  >
                    <button
                      onClick={onToggleMute}
                      style={{
                        background: isMuted ? 'rgba(203, 185, 132, 0.1)' : 'rgba(203, 185, 132, 0.2)',
                        border: '1px solid rgba(203, 185, 132, 0.25)',
                        borderRadius: '4px',
                        color: isMuted ? 'var(--text-muted)' : 'var(--accent-gold)',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.08em',
                        padding: '0.25rem 0.6rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{isMuted ? '🔇 Unmute' : '🔊 Mute'}</span>
                    </button>

                    <button
                      onClick={() => setVolumeOpen(false)}
                      aria-label="Close sound settings"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        padding: '0.2rem',
                        fontFamily: 'var(--font-body)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-cream)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
