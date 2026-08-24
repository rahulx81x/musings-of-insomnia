interface StarRuleProps {
  color?: string;
}

export function StarRule({ color = 'var(--accent-sepia)' }: StarRuleProps) {
  return (
    <div className="ornament-rule">
      <div
        className="ornament-line"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
      />
      <span className="ornament-glyph" style={{ color }}>✦</span>
      <div
        className="ornament-line"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
      />
    </div>
  );
}

interface OrnamentSVGProps {
  color?: string;
}

export function OrnamentSVG({ color = '#cbb984' }: OrnamentSVGProps) {
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <svg viewBox="0 0 200 30" style={{ width: 90, height: 'auto', opacity: 0.85 }}>
        <path
          d="M20,15 H80 M120,15 H180"
          stroke={color}
          strokeWidth="0.7"
          fill="none"
        />
        <circle cx="100" cy="15" r="2.6" fill={color} />
      </svg>
    </div>
  );
}

export function CrescentMoon({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M62,10 A42,42 0 1 0 62,90 A34,34 0 1 1 62,10 Z" fill="#cbb984" />
      <circle cx="30" cy="35" r="1.6" fill="#cbb984" />
      <circle cx="20" cy="55" r="1.1" fill="#cbb984" />
      <circle cx="75" cy="20" r="1.3" fill="#cbb984" />
      <circle cx="82" cy="60" r="1" fill="#cbb984" />
    </svg>
  );
}
