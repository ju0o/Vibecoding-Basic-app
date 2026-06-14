const TAU = Math.PI * 2;

function centerPoint(element, root) {
  const a = element.getBoundingClientRect();
  const b = root.getBoundingClientRect();
  return {
    x: a.left - b.left + a.width / 2,
    y: a.top - b.top + a.height / 2,
  };
}

function parseColor(color, alpha = 1) {
  const map = {
    cyan: [103, 232, 249],
    violet: [167, 139, 250],
    emerald: [52, 211, 153],
    rose: [251, 113, 133],
    amber: [251, 191, 36],
  };
  const rgb = map[color] || map.cyan;
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

export class ParticleSystem {
  constructor(host, options = {}) {
    this.host = host;
    this.options = options;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'edu-particle-canvas';
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.beams = [];
    this.frameId = 0;
    this.running = false;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    if (getComputedStyle(host).position === 'static') {
      host.style.position = 'relative';
    }

    host.appendChild(this.canvas);
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  resize() {
    const rect = this.host.getBoundingClientRect();
    this.canvas.width = Math.max(1, Math.floor(rect.width * this.pixelRatio));
    this.canvas.height = Math.max(1, Math.floor(rect.height * this.pixelRatio));
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.frameId = requestAnimationFrame(this.tick);
  }

  stopIfIdle() {
    if (this.particles.length || this.beams.length) return;
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  emitBeam(fromElement, toElement, options = {}) {
    const duration = options.duration ?? 850;
    const count = options.count ?? 28;
    const color = options.color || 'cyan';
    const from = centerPoint(fromElement, this.host);
    const to = centerPoint(toElement, this.host);
    const startedAt = performance.now();

    this.beams.push({ from, to, startedAt, duration, color, fail: !!options.fail });

    for (let i = 0; i < count; i += 1) {
      this.particles.push({
        from,
        to,
        startedAt: startedAt + i * (duration / count) * 0.72,
        duration: duration * (0.72 + Math.random() * 0.35),
        size: 2.2 + Math.random() * 3.4,
        offset: (Math.random() - 0.5) * 26,
        color,
        fail: !!options.fail,
      });
    }

    this.start();
    return new Promise((resolve) => window.setTimeout(resolve, duration + 120));
  }

  burst(targetElement, options = {}) {
    const origin = centerPoint(targetElement, this.host);
    const color = options.color || 'emerald';
    const count = options.count ?? 34;
    const startedAt = performance.now();

    for (let i = 0; i < count; i += 1) {
      const angle = (TAU / count) * i + Math.random() * 0.35;
      const distance = 34 + Math.random() * 60;
      this.particles.push({
        from: origin,
        to: {
          x: origin.x + Math.cos(angle) * distance,
          y: origin.y + Math.sin(angle) * distance,
        },
        startedAt,
        duration: 620 + Math.random() * 320,
        size: 2 + Math.random() * 4,
        offset: 0,
        color,
        burst: true,
      });
    }

    this.start();
  }

  tick(now) {
    const rect = this.host.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);

    this.drawBeams(now);
    this.drawParticles(now);
    this.stopIfIdle();

    if (this.running) {
      this.frameId = requestAnimationFrame(this.tick);
    }
  }

  drawBeams(now) {
    this.beams = this.beams.filter((beam) => {
      const t = Math.min(1, (now - beam.startedAt) / beam.duration);
      if (t >= 1) return false;

      const alpha = Math.sin(t * Math.PI) * 0.58;
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'lighter';
      this.ctx.strokeStyle = parseColor(beam.fail ? 'rose' : beam.color, alpha);
      this.ctx.lineWidth = beam.fail ? 3 : 2;
      this.ctx.shadowBlur = 18;
      this.ctx.shadowColor = parseColor(beam.fail ? 'rose' : beam.color, 0.9);
      this.ctx.beginPath();
      this.ctx.moveTo(beam.from.x, beam.from.y);
      this.ctx.lineTo(
        beam.from.x + (beam.to.x - beam.from.x) * t,
        beam.from.y + (beam.to.y - beam.from.y) * t,
      );
      this.ctx.stroke();
      this.ctx.restore();
      return true;
    });
  }

  drawParticles(now) {
    this.particles = this.particles.filter((particle) => {
      const raw = (now - particle.startedAt) / particle.duration;
      if (raw < 0) return true;
      if (raw >= 1) return false;

      const t = 1 - Math.pow(1 - raw, 3);
      const dx = particle.to.x - particle.from.x;
      const dy = particle.to.y - particle.from.y;
      const length = Math.max(1, Math.hypot(dx, dy));
      const normalX = -dy / length;
      const normalY = dx / length;
      const wave = Math.sin(raw * Math.PI) * particle.offset;
      const x = particle.from.x + dx * t + normalX * wave;
      const y = particle.from.y + dy * t + normalY * wave;
      const alpha = Math.sin(raw * Math.PI);

      this.ctx.save();
      this.ctx.globalCompositeOperation = 'lighter';
      this.ctx.fillStyle = parseColor(particle.fail ? 'rose' : particle.color, alpha);
      this.ctx.shadowBlur = 16;
      this.ctx.shadowColor = parseColor(particle.fail ? 'rose' : particle.color, 0.9);
      this.ctx.beginPath();
      this.ctx.arc(x, y, particle.size, 0, TAU);
      this.ctx.fill();
      this.ctx.restore();
      return true;
    });
  }

  destroy() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.resize);
    this.canvas.remove();
    this.particles = [];
    this.beams = [];
  }
}
