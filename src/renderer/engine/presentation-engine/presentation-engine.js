import { interactionEngine } from '../interaction-engine/interaction-engine.js';

export class PresentationEngine {
  constructor() {
    this.laserEnabled = false;
    this.hud = null;
    this.laser = null;
    this.observer = null;
  }

  mount(root = document) {
    interactionEngine.bindRipples(root);
    this.createHud();
    this.createLaser();
    this.observeSlides();
    this.bindKeys();
    this.updateHud();
  }

  createHud() {
    if (this.hud) return;
    this.hud = document.createElement('div');
    this.hud.className = 'edu-presenter-hud';
    this.hud.innerHTML = `
      <span class="edu-hud-dot"></span>
      <span class="edu-hud-text">Presenter tools: L laser · N note</span>
    `;
    document.body.appendChild(this.hud);
  }

  createLaser() {
    if (this.laser) return;
    this.laser = document.createElement('div');
    this.laser.className = 'edu-laser-dot';
    document.body.appendChild(this.laser);
    document.addEventListener('pointermove', (event) => {
      if (!this.laserEnabled) return;
      this.laser.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    });
    document.addEventListener('pointerdown', (event) => {
      if (!this.laserEnabled) return;
      const pulse = document.createElement('div');
      pulse.className = 'edu-laser-pulse';
      pulse.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      document.body.appendChild(pulse);
      pulse.addEventListener('animationend', () => pulse.remove(), { once: true });
    });
  }

  bindKeys() {
    document.addEventListener('keydown', (event) => {
      if (event.target.matches('input, textarea, [contenteditable="true"]')) return;
      if (event.key.toLowerCase() === 'l') {
        this.laserEnabled = !this.laserEnabled;
        document.body.classList.toggle('edu-laser-on', this.laserEnabled);
        this.updateHud(this.laserEnabled ? 'Laser pointer on' : 'Laser pointer off');
      }
      if (event.key.toLowerCase() === 'n') {
        document.body.classList.toggle('edu-notes-on');
        this.updateHud(document.body.classList.contains('edu-notes-on') ? 'Speaker notes visible' : 'Speaker notes hidden');
      }
    });
  }

  observeSlides() {
    const deck = document.querySelector('.deck');
    if (!deck || this.observer) return;
    this.observer = new MutationObserver(() => this.updateHud());
    this.observer.observe(deck, { subtree: true, attributes: true, attributeFilter: ['class'] });
  }

  updateHud(message) {
    if (!this.hud) return;
    const slides = [...document.querySelectorAll('.slide')];
    const activeIndex = slides.findIndex((slide) => slide.classList.contains('active'));
    const note = slides[activeIndex]?.dataset.presenterNote || '';
    const text = message || (slides.length ? `Slide ${activeIndex + 1} / ${slides.length}` : 'Presenter tools');
    this.hud.querySelector('.edu-hud-text').textContent = note && document.body.classList.contains('edu-notes-on')
      ? `${text} · ${note}`
      : `${text} · L laser · N note`;
  }

  destroy() {
    this.observer?.disconnect();
    this.hud?.remove();
    this.laser?.remove();
  }
}

export const presentationEngine = new PresentationEngine();
