// Act V & Epilogue (Stillness): Serene sine waves settling into a flat horizontal line

const WAVE_COUNT = 5;

export function draw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;

  const centerY = canvas.height * 0.5;

  for (let w = 0; w < WAVE_COUNT; w++) {
    const waveOffset = (w - WAVE_COUNT / 2) * 25;
    // Amplitude decays over time (settles to flat)
    const settleRate = Math.max(0, 1 - time * 0.01);
    const baseAmplitude = (15 + w * 8) * settleRate;
    const amplitude = baseAmplitude * (Math.sin(time * 0.2 + w) * 0.3 + 0.7);
    const frequency = 0.003 + w * 0.001;
    const speed = 0.15 + w * 0.05;

    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 3) {
      const y = centerY + waveOffset + Math.sin(x * frequency + time * speed) * amplitude;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    const waveAlpha = (0.15 + w * 0.04) * alpha;
    ctx.strokeStyle = `rgba(203, 185, 132, ${waveAlpha})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  // Settled center line with soft horizontal glow
  const lineAlpha = (0.25 + Math.sin(time * 0.4) * 0.05) * alpha;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.strokeStyle = `rgba(203, 185, 132, ${lineAlpha})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Subtle central still-point pulse
  ctx.beginPath();
  ctx.arc(canvas.width / 2, centerY, 3, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(203, 185, 132, ${0.4 * alpha})`;
  ctx.fill();

  ctx.restore();
}

export function resize() {
  // Stateless
}
