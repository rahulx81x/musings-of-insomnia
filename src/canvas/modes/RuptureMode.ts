// Act I (The Rupture): Anti-aliased parallel bezier lines that curve near each other but never touch

interface CurvePair {
  yOffset: number;
  amplitude: number;
  frequency: number;
  phase: number;
  gap: number;
}

const pairs: CurvePair[] = [
  { yOffset: 0.3, amplitude: 60, frequency: 0.003, phase: 0, gap: 18 },
  { yOffset: 0.5, amplitude: 45, frequency: 0.004, phase: 1.2, gap: 14 },
  { yOffset: 0.7, amplitude: 55, frequency: 0.0025, phase: 2.5, gap: 20 },
];

export function draw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  for (const pair of pairs) {
    const baseY = canvas.height * pair.yOffset;
    const halfGap = pair.gap / 2;

    // Upper line
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 3) {
      const wave = Math.sin(x * pair.frequency + time * 0.3 + pair.phase) * pair.amplitude;
      const proximity = Math.sin(x * pair.frequency * 0.5 + time * 0.15) * 0.4 + 0.6;
      const y = baseY + wave - halfGap * proximity;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(203, 185, 132, ${0.28 * alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Upper glow
    ctx.strokeStyle = `rgba(203, 185, 132, ${0.08 * alpha})`;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Lower line
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 3) {
      const wave = Math.sin(x * pair.frequency + time * 0.3 + pair.phase) * pair.amplitude;
      const proximity = Math.sin(x * pair.frequency * 0.5 + time * 0.15) * 0.4 + 0.6;
      const y = baseY + wave + halfGap * proximity;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(229, 222, 201, ${0.22 * alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Subtle tangent tick marks along the curves
    const sampleX = (time * 40 + pair.phase * 200) % canvas.width;
    const sampleY1 = baseY + Math.sin(sampleX * pair.frequency + time * 0.3 + pair.phase) * pair.amplitude - halfGap;
    const sampleY2 = baseY + Math.sin(sampleX * pair.frequency + time * 0.3 + pair.phase) * pair.amplitude + halfGap;
    ctx.beginPath();
    ctx.moveTo(sampleX, sampleY1);
    ctx.lineTo(sampleX, sampleY2);
    ctx.strokeStyle = `rgba(203, 185, 132, ${0.18 * alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.restore();
}

export function resize() {
  // No state to reset
}
