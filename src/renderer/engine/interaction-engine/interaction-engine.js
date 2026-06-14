export function createRipple(event, host = event.currentTarget) {
  if (!host) return;
  const rect = host.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'edu-click-ripple';
  const size = Math.max(rect.width, rect.height) * 1.1;
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  host.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}

export class InteractionEngine {
  bindRipples(root = document) {
    root.querySelectorAll('button, [data-ripple], .card, .term-chip').forEach((element) => {
      if (element.dataset.rippleBound) return;
      element.dataset.rippleBound = 'true';
      element.addEventListener('pointerdown', (event) => createRipple(event, element));
    });
  }

  setActive(elements, activeElement, className = 'is-active') {
    [...elements].forEach((element) => element.classList.toggle(className, element === activeElement));
  }

  announce(host, message, state = 'neutral') {
    let live = host.querySelector('.edu-live-region');
    if (!live) {
      live = document.createElement('div');
      live.className = 'edu-live-region';
      live.setAttribute('aria-live', 'polite');
      host.appendChild(live);
    }
    live.dataset.state = state;
    live.textContent = message;
  }
}

export const interactionEngine = new InteractionEngine();
