import { motion } from 'framer-motion';
import { StarRule, CrescentMoon } from './Ornament';

interface Props {
  title: string;
  subtitle: string;
  author: string;
}

export default function HeroSection({ title, subtitle, author }: Props) {
  return (
    <section
      id="hero"
      data-section="hero"
      data-poem-id="hero"
      className="section-fullscreen"
      style={{ position: 'relative' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          a collection of verses
        </motion.div>

        <StarRule color="var(--accent-gold)" />

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          style={{ margin: '0.5rem 0 0.25rem' }}
        >
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {word}
              {i < title.split(' ').length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ margin: '1rem 0 2.5rem' }}
        >
          {subtitle}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
          style={{ margin: '1rem 0' }}
        >
          <CrescentMoon />
        </motion.div>

        <motion.div
          className="hero-author"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{ marginTop: '2rem' }}
        >
          <span className="hero-author-label">written by</span>
          {author}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontSize: '0.6875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(to bottom, var(--accent-gold), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
