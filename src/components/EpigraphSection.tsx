import { motion } from 'framer-motion';
import { OrnamentSVG } from './Ornament';

interface Props {
  text: string;
}

export default function EpigraphSection({ text }: Props) {
  return (
    <section
      id="epigraph"
      data-section="epigraph"
      data-poem-id="epigraph"
      className="section-fullscreen"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.5 }}
        style={{ textAlign: 'center', maxWidth: '36rem' }}
      >
        <OrnamentSVG color="var(--accent-sepia)" />

        <blockquote
          className="epigraph-text"
          style={{
            margin: '2rem 0',
            padding: 0,
            border: 'none',
          }}
        >
          &ldquo;{text}&rdquo;
        </blockquote>
      </motion.div>
    </section>
  );
}
