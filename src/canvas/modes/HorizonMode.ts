// Act III (The Wider Horizon): Geometric Expansion — concentric expanding polygons, rings & radial horizon waves

export function draw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  const cx = canvas.width * 0.5;
  const cy = canvas.height * 0.5;
  const maxRadius = Math.max(canvas.width, canvas.height) * 0.65;

  // Expanding geometric wave pulses
  const waveCount = 6;
  for (let w = 0; w < waveCount; w++) {
    const cycle = (time * 0.08 + w / waveCount) % 1; // 0 to 1
    const r = cycle * maxRadius;
    const waveAlpha = Math.sin(cycle * Math.PI) * 0.25 * alpha;

    // Expanding circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(203, 185, 132, ${waveAlpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Expanding nested diamond/square
    const diamondSize = r * 0.8;
    if (diamondSize > 10) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4 + time * 0.02);
      ctx.beginPath();
      ctx.rect(-diamondSize / 2, -diamondSize / 2, diamondSize, diamondSize);
      ctx.strokeStyle = `rgba(203, 185, 132, ${waveAlpha * 0.7})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }
  }

  // 8-Directional radial expansion rays from center
  const rayCount = 8;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i * Math.PI * 2) / rayCount + time * 0.015;
    const inner = 30;
    const outer = maxRadius * 0.85;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
    ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
    ctx.strokeStyle = `rgba(203, 185, 132, ${0.1 * alpha})`;
    ctx.lineWidth = 0.75;
    ctx.stroke();

    // Small diamond node along each ray
    const nodeDist = (inner + (time * 60 + i * 80) % (outer - inner));
    const nx = cx + Math.cos(angle) * nodeDist;
    const ny = cy + Math.sin(angle) * nodeDist;

    ctx.beginPath();
    ctx.arc(nx, ny, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(203, 185, 132, ${0.35 * alpha})`;
    ctx.fill();
  }

  // Central horizon nucleus
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(203, 185, 132, ${0.6 * alpha})`;
  ctx.fill();

  ctx.restore();
}

export function resize(_canvas: HTMLCanvasElement) {
  // Stateless
}
