// Act IV (The Forge): Small delicate rising golden ember sparks & subtle thermal glow

interface SmallEmber {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  life: number;
  maxLife: number;
  brightness: number;
  swaySpeed: number;
  swayAmp: number;
}

let embers: SmallEmber[] = [];
let initialized = false;

function spawnEmber(canvas: HTMLCanvasElement): SmallEmber {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 25,
    vy: -(Math.random() * 0.75 + 0.35), // gentle upward float
    vx: (Math.random() - 0.5) * 0.25,
    size: Math.random() * 1.3 + 0.5,     // small, delicate ember sizes
    life: 0,
    maxLife: Math.random() * 350 + 180,
    brightness: Math.random() * 0.6 + 0.4,
    swaySpeed: Math.random() * 1.2 + 0.6,
    swayAmp: Math.random() * 0.3 + 0.1,
  };
}

function init(canvas: HTMLCanvasElement) {
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 7500));
  embers = Array.from({ length: count }, () => {
    const e = spawnEmber(canvas);
    e.y = Math.random() * canvas.height; // Distribute across height on start
    e.life = Math.random() * e.maxLife;
    return e;
  });
  initialized = true;
}

export function draw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  time: number,
  alpha: number
) {
  if (!initialized || embers.length === 0) init(canvas);

  ctx.save();
  ctx.globalAlpha = alpha;

  // Soft bottom hearth glow
  const glowHeight = canvas.height * 0.2;
  const glow = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - glowHeight);
  const pulse = Math.sin(time * 0.7) * 0.03 + 0.08;
  glow.addColorStop(0, `rgba(203, 185, 132, ${pulse * alpha})`);
  glow.addColorStop(0.6, `rgba(138, 122, 92, ${pulse * 0.3 * alpha})`);
  glow.addColorStop(1, 'rgba(12, 13, 20, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, canvas.height - glowHeight, canvas.width, glowHeight);

  // Small ember sparks
  for (let i = 0; i < embers.length; i++) {
    const e = embers[i];
    e.life++;
    e.y += e.vy;
    e.x += e.vx + Math.sin(time * e.swaySpeed + i) * e.swayAmp;

    if (e.life > e.maxLife || e.y < -15) {
      embers[i] = spawnEmber(canvas);
      continue;
    }

    const progress = e.life / e.maxLife;
    const fadeIn = Math.min(progress * 6, 1);
    const fadeOut = Math.pow(1 - progress, 1.5);
    const opacity = fadeIn * fadeOut * e.brightness * alpha;

    // Outer subtle thermal halo
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(203, 185, 132, ${opacity * 0.18})`;
    ctx.fill();

    // Core delicate ember spark
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(250, 230, 170, ${opacity * 0.9})`;
    ctx.fill();
  }

  ctx.restore();
}

export function resize(_canvas: HTMLCanvasElement) {
  initialized = false;
}
