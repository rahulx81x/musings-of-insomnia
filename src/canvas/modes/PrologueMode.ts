// Prologue / Hero: Ambient clock dial drifting between 12:00–05:00 with faint stardust

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  phase: number;
}

let stars: Star[] = [];
let initialized = false;

function init(canvas: HTMLCanvasElement) {
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.8 + 0.4,
    speed: Math.random() * 0.15 + 0.05,
    opacity: Math.random() * 0.6 + 0.2,
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

  // ── Clock dial ──
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.18;

  // Dial ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(203, 185, 132, ${0.18 * alpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Subtle outer dashed orbital ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(203, 185, 132, ${0.08 * alpha})`;
  ctx.lineWidth = 0.75;
  ctx.stroke();

  // Hour markers (12–5 highlighted)
  const hourLabels: Record<number, string> = { 0: 'XII', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };
  ctx.font = '9px "Cormorant Garamond", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let h = 0; h < 12; h++) {
    const angle = ((h - 3) / 12) * Math.PI * 2;
    const inner = radius * 0.86;
    const outer = radius * 0.98;
    const isActive = h === 0 || (h >= 1 && h <= 5); // 12, 1, 2, 3, 4, 5

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.strokeStyle = isActive
      ? `rgba(203, 185, 132, ${(0.4 + Math.sin(time * 0.5 + h) * 0.15) * alpha})`
      : `rgba(203, 185, 132, ${0.08 * alpha})`;
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.stroke();

    // Roman numeral for active hours
    if (isActive && hourLabels[h]) {
      const textRadius = radius * 0.72;
      const tx = cx + Math.cos(angle) * textRadius;
      const ty = cy + Math.sin(angle) * textRadius;
      ctx.fillStyle = `rgba(203, 185, 132, ${(0.45 + Math.sin(time * 0.5 + h) * 0.15) * alpha})`;
      ctx.fillText(hourLabels[h], tx, ty);
    }
  }

  // Drifting hour hand (oscillates between 12 and 5)
  const hourAngle = ((Math.sin(time * 0.08) * 0.5 + 0.5) * 5 / 12 - 0.25) * Math.PI * 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(
    cx + Math.cos(hourAngle) * radius * 0.58,
    cy + Math.sin(hourAngle) * radius * 0.58
  );
  ctx.strokeStyle = `rgba(203, 185, 132, ${0.35 * alpha})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(203, 185, 132, ${0.5 * alpha})`;
  ctx.fill();

  // ── Stardust particles ──
  for (const star of stars) {
    star.y -= star.speed;
    star.x += Math.sin(time * 0.5 + star.phase) * 0.15;

    if (star.y < -10) {
      star.y = canvas.height + 10;
      star.x = Math.random() * canvas.width;
    }

    const twinkle = Math.sin(time * 1.5 + star.phase) * 0.3 + 0.7;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(203, 185, 132, ${star.opacity * twinkle * alpha})`;
    ctx.fill();
  }

  ctx.restore();
}

export function resize(_canvas: HTMLCanvasElement) {
  initialized = false;
}
