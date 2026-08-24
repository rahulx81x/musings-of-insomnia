import { motion } from 'framer-motion';
import { OrnamentSVG } from './Ornament';
import ActGraphic from './ActGraphics';
import type { Act } from '../lib/types';

interface Props {
  act: Act;
}

export default function ActDivider({ act }: Props) {
  return (
    <section
      id={`act-${act.number}`}
      data-section="act-divider"
      data-act-title={`Act ${['I', 'II', 'III', 'IV', 'V'][act.number - 1]} · ${act.title}`}
      data-act-index={act.number - 1}
      className="section-fullscreen"
      style={{
        position: 'relative',
        background: 'rgba(42, 44, 61, 0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Thematic background graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(420px, 85vw)',
          height: 'min(420px, 85vw)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <ActGraphic actNumber={act.number} className="w-full h-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '32rem',
        }}
      >
        <div className="act-number">{act.label}</div>

        <h2 className="act-title" style={{ margin: '0.75rem 0 0' }}>
          <span
            dangerouslySetInnerHTML={{
              __html: act.title.replace(/&/g, '&amp;<br/>'),
            }}
          />
          {act.subtitle && (
            <span className="act-subtitle">
              {act.subtitle}
            </span>
          )}
        </h2>

        <OrnamentSVG />

        <motion.p
          className="epigraph-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            margin: '0 auto',
            fontSize: '1rem',
          }}
        >
          {act.epigraph}
        </motion.p>
      </motion.div>
    </section>
  );
}
