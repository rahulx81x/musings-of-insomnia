interface ActGraphicProps {
  actNumber: number;
  className?: string;
}

export default function ActGraphic({ actNumber, className = '' }: ActGraphicProps) {
  switch (actNumber) {
    case 1:
      // Act I: The Rupture (Parallel asymptotic curves & geometric separation coordinate lines)
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          <circle cx="200" cy="200" r="160" stroke="#cbb984" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.25" />
          <circle cx="200" cy="200" r="110" stroke="#cbb984" strokeWidth="0.5" opacity="0.18" />
          <circle cx="200" cy="200" r="40" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />

          {/* Symmetrical parallel asymptotic curves */}
          <path
            d="M 50,110 C 150,175 250,175 350,110"
            stroke="#cbb984"
            strokeWidth="1.4"
            opacity="0.45"
          />
          <path
            d="M 50,290 C 150,225 250,225 350,290"
            stroke="#cbb984"
            strokeWidth="1.4"
            opacity="0.45"
          />

          {/* Coordinate axis chords */}
          <line x1="200" y1="35" x2="200" y2="365" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.2" />
          <line x1="35" y1="200" x2="365" y2="200" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.2" />

          {/* Tangent focal points */}
          <circle cx="200" cy="155" r="3" fill="#cbb984" opacity="0.5" />
          <circle cx="200" cy="245" r="3" fill="#cbb984" opacity="0.5" />
        </svg>
      );

    case 2:
      // Act II: Midnight Sky (Crescent moon, celestial coordinate astrolabe rings & starry constellations)
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          {/* Astrolabe orbital circles */}
          <circle cx="200" cy="200" r="160" stroke="#cbb984" strokeWidth="0.6" opacity="0.2" />
          <circle cx="200" cy="200" r="135" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.3" />
          <circle cx="200" cy="200" r="85" stroke="#cbb984" strokeWidth="0.5" opacity="0.15" />

          {/* Midnight Crescent Moon */}
          <path
            d="M 215,145 A 55,55 0 1,0 215,255 A 44,44 0 1,1 215,145 Z"
            fill="#cbb984"
            opacity="0.25"
          />

          {/* Constellation star points & connective lines */}
          <line x1="120" y1="120" x2="160" y2="90" stroke="#cbb984" strokeWidth="0.5" opacity="0.25" />
          <line x1="160" y1="90" x2="220" y2="80" stroke="#cbb984" strokeWidth="0.5" opacity="0.25" />
          <line x1="280" y1="130" x2="310" y2="180" stroke="#cbb984" strokeWidth="0.5" opacity="0.25" />
          <line x1="110" y1="260" x2="150" y2="290" stroke="#cbb984" strokeWidth="0.5" opacity="0.25" />
          <line x1="260" y1="280" x2="300" y2="250" stroke="#cbb984" strokeWidth="0.5" opacity="0.25" />

          {/* Stars */}
          {[
            [120, 120, 2], [160, 90, 2.5], [220, 80, 1.8], [280, 130, 2.2],
            [310, 180, 1.5], [110, 260, 2], [150, 290, 2.5], [260, 280, 2],
            [300, 250, 1.8], [90, 190, 1.5], [315, 110, 1.5], [200, 320, 1.5]
          ].map(([x, y, r], idx) => (
            <circle key={idx} cx={x} cy={y} r={r} fill="#cbb984" opacity="0.55" />
          ))}

          {/* Celestial meridian crosshairs */}
          <line x1="200" y1="40" x2="200" y2="60" stroke="#cbb984" strokeWidth="0.75" opacity="0.3" />
          <line x1="200" y1="340" x2="200" y2="360" stroke="#cbb984" strokeWidth="0.75" opacity="0.3" />
          <line x1="40" y1="200" x2="60" y2="200" stroke="#cbb984" strokeWidth="0.75" opacity="0.3" />
          <line x1="340" y1="200" x2="360" y2="200" stroke="#cbb984" strokeWidth="0.75" opacity="0.3" />
        </svg>
      );

    case 3:
      // Act III: Geometric Expansion (Concentric expanding geometry & radial horizon expansion)
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          {/* Concentric nested expanding diamonds/squares */}
          <rect x="175" y="175" width="50" height="50" transform="rotate(45 200 200)" stroke="#cbb984" strokeWidth="1" opacity="0.45" />
          <rect x="145" y="145" width="110" height="110" transform="rotate(45 200 200)" stroke="#cbb984" strokeWidth="0.8" opacity="0.35" />
          <rect x="110" y="110" width="180" height="180" transform="rotate(45 200 200)" stroke="#cbb984" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.28" />
          <rect x="75" y="75" width="250" height="250" transform="rotate(45 200 200)" stroke="#cbb984" strokeWidth="0.5" opacity="0.2" />

          {/* Expanding concentric boundary circles */}
          <circle cx="200" cy="200" r="160" stroke="#cbb984" strokeWidth="0.5" opacity="0.15" />
          <circle cx="200" cy="200" r="100" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />

          {/* Radiating 8-directional horizon expansion rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 45;
            const y1 = 200 + Math.sin(rad) * 45;
            const x2 = 200 + Math.cos(rad) * 165;
            const y2 = 200 + Math.sin(rad) * 165;
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#cbb984"
                strokeWidth="0.6"
                strokeDasharray={idx % 2 === 0 ? undefined : '2 4'}
                opacity="0.3"
              />
            );
          })}

          <circle cx="200" cy="200" r="3" fill="#cbb984" opacity="0.6" />
        </svg>
      );

    case 4:
      // Act IV: The Forge (Rising small embers, hearth crucible arc & delicate floating sparks)
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          {/* Ambient forge arc base */}
          <path
            d="M 80,290 Q 200,340 320,290"
            stroke="#cbb984"
            strokeWidth="1.2"
            opacity="0.35"
          />
          <path
            d="M 110,305 Q 200,345 290,305"
            stroke="#cbb984"
            strokeWidth="0.6"
            strokeDasharray="3 5"
            opacity="0.25"
          />

          {/* Delicate ascending ember particles of varied sizes */}
          {[
            // Bottom cluster near forge
            [195, 275, 2.5, 0.7],
            [210, 260, 2.0, 0.65],
            [180, 255, 1.8, 0.6],
            [225, 245, 2.2, 0.65],
            [165, 240, 1.5, 0.55],
            // Mid ascending sparks
            [190, 210, 2.0, 0.6],
            [215, 195, 2.4, 0.7],
            [175, 180, 1.6, 0.5],
            [235, 175, 1.8, 0.55],
            [155, 160, 1.4, 0.45],
            // Upper drifting embers
            [205, 140, 2.2, 0.6],
            [185, 115, 1.6, 0.5],
            [220, 95, 1.8, 0.55],
            [170, 80, 1.3, 0.4],
            [200, 60, 1.5, 0.45],
          ].map(([x, y, r, op], idx) => (
            <g key={idx}>
              {/* Outer soft glow */}
              <circle cx={x} cy={y} r={Number(r) * 3} fill="#cbb984" opacity={Number(op) * 0.1} />
              {/* Core ember */}
              <circle cx={x} cy={y} r={r} fill="#cbb984" opacity={op} />
            </g>
          ))}

          {/* Fine thermal drift vectors */}
          <path d="M 190,260 Q 185,200 195,140" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />
          <path d="M 215,250 Q 225,180 210,100" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />
          <path d="M 175,240 Q 165,170 180,90" stroke="#cbb984" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.15" />
        </svg>
      );

    case 5:
      // Act V: Stillness & Reconvergence (Concentric harmonic resonance rings & calm horizon chord)
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          <circle cx="200" cy="200" r="160" stroke="#cbb984" strokeWidth="0.5" opacity="0.15" />
          <circle cx="200" cy="200" r="120" stroke="#cbb984" strokeWidth="0.6" opacity="0.2" />
          <circle cx="200" cy="200" r="80" stroke="#cbb984" strokeWidth="0.75" opacity="0.28" />
          <circle cx="200" cy="200" r="40" stroke="#cbb984" strokeWidth="0.9" opacity="0.38" />

          {/* Serene horizon lines */}
          <line x1="40" y1="200" x2="360" y2="200" stroke="#cbb984" strokeWidth="1.2" opacity="0.5" />
          <line x1="80" y1="185" x2="320" y2="185" stroke="#cbb984" strokeWidth="0.6" opacity="0.25" />
          <line x1="80" y1="215" x2="320" y2="215" stroke="#cbb984" strokeWidth="0.6" opacity="0.25" />

          {/* Stillness point */}
          <circle cx="200" cy="200" r="3.5" fill="#cbb984" opacity="0.6" />
        </svg>
      );

    default:
      return null;
  }
}
