import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onChoose: (withMusic: boolean) => void;
}

export default function SoundPrompt({ open, onChoose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(12, 13, 20, 0.82)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Dialog wrapper handles centering + safe viewport padding so the
              card itself never has to fight fixed widths against the notch/
              edges on small phones. */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 201,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem',
              boxSizing: 'border-box',
              overflowY: 'auto',
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="sound-prompt-title"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                width: '100%',
                maxWidth: '24rem',
                boxSizing: 'border-box',
                background: 'var(--bg-surface)',
                border: '1px solid rgba(203, 185, 132, 0.3)',
                borderRadius: '10px',
                padding: 'clamp(1.5rem, 6vw, 2.25rem) clamp(1.25rem, 5vw, 1.75rem) clamp(1.25rem, 4vw, 1.75rem)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 24px rgba(203, 185, 132, 0.08)',
                textAlign: 'center',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  fontSize: '1.4rem',
                  color: 'var(--accent-gold)',
                  marginBottom: '0.85rem',
                  letterSpacing: '0.1em',
                }}
              >
                ♫
              </div>

              <h2
                id="sound-prompt-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.15rem, 5vw, 1.35rem)',
                  color: 'var(--text-light)',
                  marginBottom: '0.65rem',
                  fontWeight: 500,
                }}
              >
                Enter With Sound?
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.95rem, 4vw, 1.05rem)',
                  lineHeight: 1.55,
                  color: 'var(--text-muted)',
                  marginBottom: '1.75rem',
                }}
              >
                This anthology is set to a quiet ambient score. It's the way it
                was meant to be read, but the choice is yours — and can be
                changed anytime from the sound control.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <button
                  onClick={() => onChoose(true)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--font-accent)',
                    fontSize: 'clamp(0.85rem, 3.6vw, 0.95rem)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--bg-deep)',
                    background: 'var(--accent-gold)',
                    border: '1px solid var(--accent-gold)',
                    borderRadius: '5px',
                    padding: '0.75rem 0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.15rem',
                    lineHeight: 1.3,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <span>🔊 Continue with Music</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      opacity: 0.75,
                      textTransform: 'none',
                    }}
                  >
                    Recommended
                  </span>
                </button>

                <button
                  onClick={() => onChoose(false)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    fontFamily: 'var(--font-accent)',
                    fontSize: 'clamp(0.85rem, 3.6vw, 0.95rem)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text-light)',
                    background: 'rgba(203, 185, 132, 0.08)',
                    border: '1px solid rgba(203, 185, 132, 0.25)',
                    borderRadius: '5px',
                    padding: '0.75rem 0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(203, 185, 132, 0.14)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(203, 185, 132, 0.08)';
                  }}
                >
                  🔇 Continue Muted
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
