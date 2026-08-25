import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Anthology } from '../lib/types';

interface Props {
  open: boolean;
  onClose: () => void;
  anthology: Anthology | null;
  activePoemId: string | null;
  onNavigate: (target: string) => void;
}

export default function TOCDrawer({ open, onClose, anthology, activePoemId, onNavigate }: Props) {
  // Prevent background page scrolling while TOC drawer is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  if (!anthology) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            data-lenis-prevent
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'rgba(12, 13, 20, 0.5)',
              backdropFilter: 'blur(4px)',
              touchAction: 'none',
            }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(20rem, 85vw)',
              zIndex: 100,
              background: 'var(--bg-surface)',
              borderLeft: '1px solid rgba(203, 185, 132, 0.1)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              padding: '4.5rem 1.5rem 2rem',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              marginBottom: '2rem',
              textAlign: 'center',
            }}>
              Contents
            </div>

            {/* Front Matter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="toc-act-title">Front Matter</div>
              <div
                className={`toc-entry ${activePoemId === 'hero' ? 'active' : ''}`}
                onClick={() => onNavigate('#hero')}
              >
                <span className="toc-roman">&nbsp;</span>
                Title Page
              </div>
              <div
                className={`toc-entry ${activePoemId === 'epigraph' ? 'active' : ''}`}
                onClick={() => onNavigate('#epigraph')}
              >
                <span className="toc-roman">&nbsp;</span>
                Epigraph
              </div>
              <div
                className={`toc-entry ${activePoemId === anthology.prologue.id ? 'active' : ''}`}
                onClick={() => onNavigate(`#poem-${anthology.prologue.id}`)}
              >
                <span className="toc-roman">&nbsp;</span>
                Prologue: {anthology.prologue.title}
              </div>
            </div>

            {/* Acts */}
            {anthology.acts.map((act) => (
              <div key={act.number} style={{ marginBottom: '1.5rem' }}>
                <div
                  className="toc-act-title"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onNavigate(`#act-${act.number}`)}
                >
                  Act {['I', 'II', 'III', 'IV', 'V'][act.number - 1]} · {act.title}
                  {act.subtitle && (
                    <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--accent-gold)', textTransform: 'none', letterSpacing: '0.08em', marginTop: '2px', fontStyle: 'normal' }}>
                      {act.subtitle}
                    </span>
                  )}
                </div>
                {act.poems.map((poem) => (
                  <div
                    key={poem.id}
                    className={`toc-entry ${activePoemId === poem.id ? 'active' : ''}`}
                    onClick={() => onNavigate(`#poem-${poem.id}`)}
                  >
                    <span className="toc-roman">{poem.roman}.</span>
                    {poem.title}
                  </div>
                ))}
              </div>
            ))}

            {/* Epilogue */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="toc-act-title">Epilogue</div>
              <div
                className={`toc-entry ${activePoemId === 'epilogue' ? 'active' : ''}`}
                onClick={() => onNavigate('#epilogue')}
              >
                <span className="toc-roman">&nbsp;</span>
                Epilogue &amp; Author&rsquo;s Note
              </div>
            </div>

            {/* Credits */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div className="toc-act-title">Acknowledgements</div>
              <div
                className={`toc-entry ${activePoemId === 'credits' ? 'active' : ''}`}
                onClick={() => onNavigate('#credits')}
              >
                <span className="toc-roman">&nbsp;</span>
                Credits &amp; Inspirations
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
