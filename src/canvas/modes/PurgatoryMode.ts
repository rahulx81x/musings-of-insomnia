// Act II (Twilight Purgatory): Midnight celestial sky with twinkling stars, constellations & cosmic aura

interface MidnightStar {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  phase: number;
}

let stars: MidnightStar[] = [];
let initialized = false;

function init(canvas: HTMLCanvasElement) {
  const count = Math.min(180, Math.floor((canvas.width * canvas.height) / 7000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.8 + 0.4,
    baseOpacity: Math.random() * 0.5 + 0.2,
    twinkleSpeed: Math.random() * 1.5 + 0.5,
    phase: Math.random() * Math.PI * 2,
  }));
  initialized = true;
}

export function draw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  alpha: number
) {
  if (!initialized || stars.length === 0) init(canvas);

  ctx.save();
  ctx.globalAlpha = alpha;

  // Deep midnight radial celestial glow
  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.4;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.6);
  grad.addColorStop(0, 'rgba(27, 29, 43, 0.35)');
  grad.addColorStop(0.5, 'rgba(18, 20, 32, 0.15)');
  grad.addColorStop(1, 'rgba(12, 13, 20, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw faint constellation linkages between nearby prominent stars
  const linkDist = 110;
  for (let i = 0; i < Math.min(stars.length, 60); i++) {
    for (let j = i + 1; j < Math.min(stars.length, 60); j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < linkDist) {
        const linkAlpha = (1 - dist / linkDist) * 0.12 * alpha;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(203, 185, 132, ${linkAlpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  // Draw twinkling midnight stars
  for (const s of stars) {
    const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.4 + 0.6;
    const op = s.baseOpacity * twinkle * alpha;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(229, 222, 201, ${op})`;
    ctx.fill();

    // Occasional star cross-glint on brighter stars
    if (s.size > 1.4 && twinkle > 0.85) {
      const glint = (twinkle - 0.85) * 4 * op;
      ctx.strokeStyle = `rgba(203, 185, 132, ${glint})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(s.x - 3, s.y);
      ctx.lineTo(s.x + 3, s.y);
      ctx.moveTo(s.x, s.y - 3);
      ctx.lineTo(s.x, s.y + 3);
      ctx.stroke();
    }
  }

  ctx.restore();
}

export function resize(_canvas: HTMLCanvasElement) {
  initialized = false;
}
