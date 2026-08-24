import { motion } from 'framer-motion';
import { StarRule } from './Ornament';
import type { Epilogue } from '../lib/types';

interface Props {
  epilogue: Epilogue;
  author: string;
}

export default function EpilogueSection({ epilogue, author }: Props) {
  return (
    <>
      {/* Epilogue quote page */}
      <section
        id="epilogue"
        data-section="epilogue"
        data-poem-id="epilogue"
        className="section-fullscreen"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5 }}
          style={{ textAlign: 'center', maxWidth: '36rem' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.375rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              marginBottom: '2.5rem',
            }}
          >
            Epilogue
          </h2>

          <blockquote
            className="epigraph-text"
            style={{
              margin: '0 0 2.5rem',
              padding: 0,
              border: 'none',
              fontSize: '1.2rem',
            }}
          >
            &ldquo;{epilogue.quote}&rdquo;
          </blockquote>

          <StarRule />
        </motion.div>
      </section>

      {/* Author's Note */}
      <section
        id="authors-note"
        data-section="epilogue"
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 2rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          style={{ maxWidth: '32rem' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
              color: 'var(--text-light)',
              marginBottom: '2.5rem',
            }}
          >
            Author&rsquo;s Note
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            lineHeight: 1.9,
            color: 'var(--text-cream)',
            textAlign: 'center',
          }}>
            {epilogue.authorsNote}
          </p>

          <div style={{
            textAlign: 'center',
            fontFamily: 'var(--font-accent)',
            fontSize: '1.1rem',
            color: 'var(--accent-warm)',
            marginTop: '2rem',
          }}>
            {author}
          </div>
        </motion.div>
      </section>
    </>
  );
}
