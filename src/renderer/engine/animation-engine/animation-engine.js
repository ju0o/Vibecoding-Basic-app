export const Easings = {
  linear: (t) => t,
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
};

export class AnimationEngine {
  constructor() {
    this.jobs = new Set();
    this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
  }

  wait(ms = 0) {
    return new Promise((resolve) => window.setTimeout(resolve, this.reducedMotion ? 0 : ms));
  }

  raf(duration, onFrame, easing = Easings.outCubic) {
    if (this.reducedMotion || duration <= 0) {
      onFrame(1, 1);
      return Promise.resolve();
    }

    let frameId = 0;
    const startedAt = performance.now();
    const job = { cancel: () => cancelAnimationFrame(frameId) };
    this.jobs.add(job);

    return new Promise((resolve) => {
      const tick = (now) => {
        const raw = Math.min(1, (now - startedAt) / duration);
        const eased = easing(raw);
        onFrame(eased, raw);

        if (raw < 1) {
          frameId = requestAnimationFrame(tick);
        } else {
          this.jobs.delete(job);
          resolve();
        }
      };
      frameId = requestAnimationFrame(tick);
    });
  }

  animate(element, keyframes, options = {}) {
    if (!element) return Promise.resolve();

    if (this.reducedMotion) {
      const lastFrame = keyframes[keyframes.length - 1] || {};
      Object.assign(element.style, lastFrame);
      return Promise.resolve();
    }

    if (typeof element.animate !== 'function') {
      return this.wait(options.duration || 0);
    }

    const animation = element.animate(keyframes, {
      duration: 360,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      fill: 'both',
      ...options,
    });

    const job = { cancel: () => animation.cancel() };
    this.jobs.add(job);

    return animation.finished
      .catch(() => {})
      .finally(() => this.jobs.delete(job));
  }

  async typeText(element, text, options = {}) {
    if (!element) return;
    const speed = options.speed ?? 18;
    element.textContent = '';

    if (this.reducedMotion) {
      element.textContent = text;
      return;
    }

    for (let i = 0; i < text.length; i += 1) {
      element.textContent += text[i];
      await this.wait(speed);
    }
  }

  async streamLines(element, lines, options = {}) {
    if (!element) return;
    element.innerHTML = '';

    for (const line of lines) {
      const row = document.createElement('div');
      row.className = options.rowClass || 'edu-stream-line';
      element.appendChild(row);
      await this.typeText(row, line, { speed: options.speed ?? 12 });
      await this.wait(options.gap ?? 120);
    }
  }

  pulse(element, className = 'is-pulsing', duration = 700) {
    if (!element) return Promise.resolve();
    element.classList.add(className);
    return this.wait(duration).then(() => element.classList.remove(className));
  }

  stagger(elements, callback, gap = 80) {
    return Promise.all([...elements].map((element, index) => this.wait(index * gap).then(() => callback(element, index))));
  }

  cancelAll() {
    this.jobs.forEach((job) => job.cancel());
    this.jobs.clear();
  }
}

export const animationEngine = new AnimationEngine();
