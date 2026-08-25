import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarRule } from './Ornament';

const AUTHOR_EMAIL = 'rahulgouri072@gmail.com';
const DEFAULT_SUBJECT = 'Feedback: Musings of Insomnia';

export default function FeedbackSection() {
  const [copied, setCopied] = useState(false);

  const encodedSubject = encodeURIComponent(DEFAULT_SUBJECT);

  const handleOpenGmail = () => {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${AUTHOR_EMAIL}&su=${encodedSubject}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenOutlook = () => {
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${AUTHOR_EMAIL}&subject=${encodedSubject}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenMailto = () => {
    const url = `mailto:${AUTHOR_EMAIL}?subject=${encodedSubject}`;
    window.location.href = url;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHOR_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="feedback"
      data-section="feedback"
      data-poem-id="feedback"
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '36rem',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '0.8125rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
            marginBottom: '0.75rem',
          }}
        >
          ✦ Reader Impressions ✦
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-light)',
            margin: '0 0 1.25rem',
            lineHeight: 1.3,
          }}
        >
          A Letter to the Author
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--text-cream)',
            margin: '0 auto 2.25rem',
            maxWidth: '30rem',
            fontStyle: 'italic',
          }}
        >
          Whether a verse resonated with your own midnight hours, a lingering reflection emerged, or you simply wish to share your thoughts — click below to open your preferred mail app with everything pre-addressed.
        </p>

        {/* Action Card */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid rgba(203, 185, 132, 0.22)',
            borderRadius: '12px',
            padding: '2rem 1.75rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(203, 185, 132, 0.05)',
            textAlign: 'left',
          }}
        >
          {/* Recipient info & Copy */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(203, 185, 132, 0.12)',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-sepia)',
                  display: 'block',
                  marginBottom: '2px',
                }}
              >
                Recipient &bull; Pre-set Subject
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--accent-gold)',
                  letterSpacing: '0.03em',
                  display: 'block',
                }}
              >
                {AUTHOR_EMAIL}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                Subject: &ldquo;{DEFAULT_SUBJECT}&rdquo;
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              style={{
                background: copied ? 'rgba(203, 185, 132, 0.25)' : 'rgba(203, 185, 132, 0.08)',
                border: '1px solid rgba(203, 185, 132, 0.3)',
                borderRadius: '4px',
                color: copied ? 'var(--text-light)' : 'var(--accent-gold)',
                fontFamily: 'var(--font-accent)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.45rem 0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {copied ? '✓ Copied Address' : 'Copy Address'}
            </button>
          </div>

          {/* Action Launch Buttons */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-sepia)',
                marginBottom: '0.85rem',
                textAlign: 'center',
              }}
            >
              Choose your mail service:
            </div>

            {/* Direct Webmail Links */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              {/* Gmail Web */}
              <button
                type="button"
                onClick={handleOpenGmail}
                style={{
                  background: 'linear-gradient(135deg, rgba(203, 185, 132, 0.22) 0%, rgba(138, 122, 92, 0.22) 100%)',
                  border: '1px solid rgba(203, 185, 132, 0.45)',
                  borderRadius: '6px',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(203, 185, 132, 0.38) 0%, rgba(138, 122, 92, 0.38) 100%)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(203, 185, 132, 0.22) 0%, rgba(138, 122, 92, 0.22) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(203, 185, 132, 0.45)';
                }}
              >
                <span>📬</span>
                <span>Gmail (Web)</span>
              </button>

              {/* Outlook Web */}
              <button
                type="button"
                onClick={handleOpenOutlook}
                style={{
                  background: 'rgba(203, 185, 132, 0.1)',
                  border: '1px solid rgba(203, 185, 132, 0.3)',
                  borderRadius: '6px',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(203, 185, 132, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(203, 185, 132, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(203, 185, 132, 0.3)';
                }}
              >
                <span>🌐</span>
                <span>Outlook (Web)</span>
              </button>
            </div>

            {/* Default Mail Client / Mobile */}
            <button
              type="button"
              onClick={handleOpenMailto}
              style={{
                width: '100%',
                background: 'rgba(12, 13, 20, 0.6)',
                border: '1px solid rgba(203, 185, 132, 0.2)',
                borderRadius: '6px',
                color: 'var(--text-cream)',
                fontFamily: 'var(--font-accent)',
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(203, 185, 132, 0.4)';
                e.currentTarget.style.color = 'var(--text-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(203, 185, 132, 0.2)';
                e.currentTarget.style.color = 'var(--text-cream)';
              }}
            >
              <span>✉</span>
              <span>Default Mail App (Apple Mail / Windows Mail / Mobile)</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <StarRule />
        </div>
      </motion.div>
    </section>
  );
}
