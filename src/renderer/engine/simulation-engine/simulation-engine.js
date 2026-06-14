import { animationEngine } from '../animation-engine/animation-engine.js';

export class SimulationEngine {
  constructor() {
    this.registry = new Map();
    this.instances = new WeakMap();
  }

  register(name, component) {
    this.registry.set(name, component);
    return this;
  }

  mountAll(root = document) {
    const nodes = [...root.querySelectorAll('[data-sim]')];
    nodes.forEach((node) => this.mount(node));
  }

  mount(node) {
    if (!node || this.instances.has(node)) return null;

    const name = node.dataset.sim;
    const component = this.registry.get(name);
    if (!component) {
      node.dataset.simError = `Unknown simulation: ${name}`;
      return null;
    }

    const instance = component.mount(node, {
      animation: animationEngine,
      engine: this,
    });

    this.instances.set(node, instance || true);
    node.dataset.simMounted = 'true';
    return instance;
  }

  destroy(node) {
    const instance = this.instances.get(node);
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
    this.instances.delete(node);
  }
}

export const simulationEngine = new SimulationEngine();
