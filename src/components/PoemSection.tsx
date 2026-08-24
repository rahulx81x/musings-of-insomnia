import { motion } from 'framer-motion';
import type { Poem } from '../lib/types';

interface Props {
  poem: Poem;
  actTitle?: string;
  actIndex?: number;
}

const stanzaVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export default function PoemSection({ poem, actTitle, actIndex }: Props) {
  return (
    <section
      id={`poem-${poem.id}`}
      data-section="poem"
      data-poem-id={poem.id}
      data-poem-title={poem.title}
      data-act-title={actTitle}
      data-act-index={actIndex !== undefined ? actIndex : undefined}
      className="poem-section"
    >
      <div className="poem-container">
        {/* Running head */}
        {actTitle && (
          <div className="running-head">{actTitle}</div>
        )}

        {/* Poem header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          {poem.roman && (
            <span className="poem-roman">{poem.roman}.</span>
          )}
          <h3 className="poem-title" style={{ margin: 0 }}>
            {poem.title}
          </h3>
        </motion.div>

        {/* Stanzas */}
        <div className="poem-body">
          {poem.stanzas.map((stanza, si) => (
            <motion.div
              key={si}
              className="stanza"
              variants={stanzaVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: si * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {stanza.lines.map((line, li) => (
                <span key={li} className="verse-line">
                  {line}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
