import { motion } from 'framer-motion';
import { StarRule, CrescentMoon } from './Ornament';

interface Props {
  author: string;
}

export default function CreditsSection({ author }: Props) {
  return (
    <section
      id="credits"
      data-section="credits"
      data-poem-id="credits"
      className="credits-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '44rem',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.875rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
            marginBottom: '0.75rem',
          }}
        >
          ✦ Acknowledgements ✦
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-light)',
            margin: '0 0 1rem',
            lineHeight: 1.3,
          }}
        >
          Credits &amp; Inspirations
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--text-epigraph)',
            maxWidth: '32rem',
            margin: '0 auto 2rem',
            lineHeight: 1.7,
          }}
        >
          &ldquo;A quiet tribute to the words, voices, and echoes that seeded these verses across the night.&rdquo;
        </p>

        <StarRule color="var(--accent-gold)" />

        {/* Section 1: Literary Inspirations */}
        <div style={{ marginTop: '3rem', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '0.9375rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ height: '1px', width: '30px', background: 'rgba(203, 185, 132, 0.3)' }} />
            <span>Literary Sparks &amp; Quotes</span>
            <span style={{ height: '1px', width: '30px', background: 'rgba(203, 185, 132, 0.3)' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              textAlign: 'left',
            }}
          >
            {/* Card 1: Broken Choir */}
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(203, 185, 132, 0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'rgba(22, 24, 36, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(203, 185, 132, 0.16)',
                borderRadius: '6px',
                padding: '1.75rem 1.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      padding: '0.15rem 0.5rem',
                      background: 'rgba(203, 185, 132, 0.1)',
                      borderRadius: '3px',
                      border: '1px solid rgba(203, 185, 132, 0.2)',
                    }}
                  >
                    Act III · Poem IX
                  </span>
                  <span style={{ color: 'var(--accent-sepia)', fontSize: '0.85rem' }}>✦</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--text-light)',
                    letterSpacing: '0.04em',
                    margin: '0 0 0.5rem',
                  }}
                >
                  The Broken Choir
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.65,
                    color: 'var(--text-cream)',
                    margin: '0 0 1.25rem',
                  }}
                >
                  Conceived and inspired from the poignant quote by{' '}
                  <strong style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                    Shinaparvain
                  </strong>
                  . Her words provided the central emotional compass for the chorus of fractured souls finding harmony.
                </p>
              </div>

              <div
                style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(203, 185, 132, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Instagram
                </span>
                <a
                  href="https://www.instagram.com/shinaparvain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--accent-gold)',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: 'rgba(203, 185, 132, 0.08)',
                    border: '1px solid rgba(203, 185, 132, 0.2)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(203, 185, 132, 0.2)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(203, 185, 132, 0.08)';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>@shinaparvain</span>
                  <span style={{ fontSize: '0.75rem' }}>↗</span>
                </a>
              </div>
            </motion.div>

            {/* Card 2: How Do I Tell My Dreams / The Replica */}
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(203, 185, 132, 0.35)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'rgba(22, 24, 36, 0.75)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(203, 185, 132, 0.16)',
                borderRadius: '6px',
                padding: '1.75rem 1.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      padding: '0.15rem 0.5rem',
                      background: 'rgba(203, 185, 132, 0.1)',
                      borderRadius: '3px',
                      border: '1px solid rgba(203, 185, 132, 0.2)',
                    }}
                  >
                    Act I · Poem III
                  </span>
                  <span style={{ color: 'var(--accent-sepia)', fontSize: '0.85rem' }}>✦</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--text-light)',
                    letterSpacing: '0.04em',
                    margin: '0 0 0.5rem',
                  }}
                >
                  The Replica
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    lineHeight: 1.65,
                    color: 'var(--text-cream)',
                    margin: '0 0 1.25rem',
                  }}
                >
                  The opening line and theme &mdash;{' '}
                  <em style={{ color: 'var(--text-light)' }}>
                    &ldquo;How do I tell my dreams that you left a long time ago?&rdquo;
                  </em>{' '}
                  &mdash; was inspired by a quote by{' '}
                  <strong style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                    Ignitisanima
                  </strong>
                  .
                </p>
              </div>

              <div
                style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(203, 185, 132, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Instagram
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-epigraph)',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(203, 185, 132, 0.12)',
                  }}
                  title="Account archived / discontinued"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>@ignitisanima</span>
                  <span
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--accent-sepia)',
                      fontStyle: 'italic',
                      marginLeft: '2px',
                    }}
                  >
                    (archived)
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 2: Website & Production Credits */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '0.9375rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ height: '1px', width: '30px', background: 'rgba(203, 185, 132, 0.3)' }} />
            <span>Anthology &amp; Digital Experience</span>
            <span style={{ height: '1px', width: '30px', background: 'rgba(203, 185, 132, 0.3)' }} />
          </div>

          <div
            style={{
              background: 'rgba(22, 24, 36, 0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(203, 185, 132, 0.12)',
              borderRadius: '6px',
              padding: '2rem 1.75rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.75rem',
              textAlign: 'left',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '0.25rem',
                }}
              >
                Poetry &amp; Words
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  color: 'var(--text-light)',
                }}
              >
                {author}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}
              >
                Fifteen poems across five nocturnal acts
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '0.25rem',
                }}
              >
                Digital Experience
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  color: 'var(--text-light)',
                }}
              >
                Interactive Midnight Edition
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}
              >
                Generative Canvas · Vigil Mode · Smooth Scroll
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '0.25rem',
                }}
              >
                Typography
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  color: 'var(--text-light)',
                }}
              >
                Cormorant &amp; Playfair
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.25rem',
                  lineHeight: 1.5,
                }}
              >
                Cormorant Garamond, Playfair Display &amp; SC
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '0.25rem',
                }}
              >
                Ambient Soundtrack
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  color: 'var(--text-light)',
                  lineHeight: 1.35,
                }}
              >
                Music Box &ndash; J. Brahms (Op. 39, Waltz no. 3)
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.35rem',
                  lineHeight: 1.5,
                }}
              >
                By{' '}
                <a
                  href="https://freesound.org/people/Flying_Deer_Fx/sounds/369405/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent-gold)',
                    textDecoration: 'none',
                    borderBottom: '1px dotted var(--accent-gold)',
                    transition: 'color 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                >
                  <span>Flying_Deer_Fx (Freesound)</span>
                  <span style={{ fontSize: '0.75rem' }}>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Colophon */}
        <div style={{ marginTop: '2.5rem' }}>
          <CrescentMoon size={36} />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              marginTop: '1.25rem',
              letterSpacing: '0.04em',
            }}
          >
            Musings of Insomnia &mdash; Written for the sleepless, the searching, and the silent.
          </p>
          <div
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '0.8125rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-sepia)',
              marginTop: '0.5rem',
            }}
          >
            &copy; {new Date().getFullYear()} {author}. All rights reserved.
          </div>
        </div>
      </motion.div>
    </section>
  );
}
