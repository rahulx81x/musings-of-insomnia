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

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sound-prompt-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              zIndex: 201,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(26rem, 88vw)',
              background: 'var(--bg-surface)',
              border: '1px solid rgba(203, 185, 132, 0.3)',
              borderRadius: '10px',
              padding: '2.25rem 1.75rem 1.75rem',
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
                fontSize: '1.35rem',
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
                fontSize: '1.05rem',
                lineHeight: 1.55,
                color: 'var(--text-muted)',
                marginBottom: '1.75rem',
              }}
            >
              This anthology is set to a quiet ambient score. It's the way it was
              meant to be read, but the choice is yours — and can be changed
              anytime from the sound control.
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
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--bg-deep)',
                  background: 'var(--accent-gold)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '5px',
                  padding: '0.7rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                🔊 Continue with Music
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    opacity: 0.75,
                  }}
                >
                  (Recommended)
                </span>
              </button>

              <button
                onClick={() => onChoose(false)}
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                  background: 'rgba(203, 185, 132, 0.08)',
                  border: '1px solid rgba(203, 185, 132, 0.25)',
                  borderRadius: '5px',
                  padding: '0.7rem 1rem',
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
        </>
      )}
    </AnimatePresence>
  );
}
