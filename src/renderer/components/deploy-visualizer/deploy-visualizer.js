import { ParticleSystem } from '../../engine/particle-system/particle-system.js';

const DEPLOY_STEPS = [
  ['local', '내 컴퓨터', 'npm run build'],
  ['github', 'GitHub', '코드 업로드'],
  ['cloud', 'Vercel / Railway', '빌드와 배포'],
  ['domain', 'Live URL', '주소 생성'],
  ['users', '사용자 접속', '모바일 · 데스크탑'],
];

export class DeployVisualizer {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.busy = false;
    this.render();
  }

  static mount(host, context) {
    return new DeployVisualizer(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'deploy-sim');
    this.host.innerHTML = `
      <div class="edu-panel deploy-panel">
        <div class="deploy-head">
          <div>
            <div class="deploy-kicker">DEPLOYMENT VISUALIZER</div>
            <div class="deploy-title">내 컴퓨터의 프로젝트가 인터넷 주소가 되는 과정입니다.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-action="deploy">배포 시작</button>
            <button class="edu-btn" data-tone="danger" data-action="fail">빌드 실패</button>
            <button class="edu-btn" data-action="reset">초기화</button>
          </div>
        </div>
        <div class="deploy-map">
          ${DEPLOY_STEPS.map(([id, title, body]) => `
            <div class="deploy-node" data-node="${id}">
              <span></span>
              <strong>${title}</strong>
              <small>${body}</small>
            </div>
          `).join('')}
        </div>
        <div class="deploy-devices">
          <div class="deploy-device desktop"><i></i><span>desktop</span></div>
          <div class="deploy-device mobile"><i></i><span>mobile</span></div>
          <div class="deploy-url" data-url>https://my-project.vercel.app</div>
        </div>
        <div class="edu-status" data-status>배포 버튼을 누르면 코드가 인터넷으로 이동합니다.</div>
      </div>
    `;

    this.particles = new ParticleSystem(this.host.querySelector('.deploy-panel'));
    this.status = this.host.querySelector('[data-status]');
    this.host.querySelector('[data-action="deploy"]').addEventListener('click', () => this.deploy(true));
    this.host.querySelector('[data-action="fail"]').addEventListener('click', () => this.deploy(false));
    this.host.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
  }

  node(id) {
    return this.host.querySelector(`[data-node="${id}"]`);
  }

  setStatus(message, state = 'neutral') {
    this.status.textContent = message;
    this.status.dataset.state = state;
  }

  reset() {
    this.host.querySelectorAll('.deploy-node').forEach((node) => node.classList.remove('is-active', 'is-done', 'is-fail'));
    this.host.querySelectorAll('.deploy-device').forEach((device) => device.classList.remove('is-live'));
    this.host.querySelector('[data-url]').classList.remove('is-live');
    this.setStatus('초기화 완료. 다시 배포를 시작할 수 있습니다.', 'neutral');
  }

  async transfer(from, to, options = {}) {
    const a = this.node(from);
    const b = this.node(to);
    a.classList.add('is-active');
    b.classList.add('is-active');
    await this.particles.emitBeam(a, b, {
      color: options.fail ? 'rose' : options.color || 'emerald',
      fail: options.fail,
      duration: options.duration || 900,
      count: options.count || 32,
    });
    a.classList.remove('is-active');
    a.classList.add(options.fail ? 'is-fail' : 'is-done');
  }

  async deploy(success = true) {
    if (this.busy) return;
    this.busy = true;
    this.reset();
    this.setStatus('로컬 프로젝트를 빌드합니다.', 'neutral');

    await this.animation.pulse(this.node('local'), 'is-pulsing', 520);
    if (!success) {
      this.node('local').classList.add('is-fail');
      this.setStatus('빌드 실패: 배포 전에 로컬 오류를 먼저 해결해야 합니다.', 'fail');
      this.busy = false;
      return;
    }

    this.setStatus('코드를 GitHub로 업로드합니다.', 'neutral');
    await this.transfer('local', 'github', { color: 'cyan' });
    this.setStatus('배포 서비스가 코드를 받아 빌드합니다.', 'neutral');
    await this.transfer('github', 'cloud', { color: 'violet' });
    this.setStatus('도메인이 활성화되고 공개 주소가 생성됩니다.', 'neutral');
    await this.transfer('cloud', 'domain', { color: 'emerald' });
    this.setStatus('사용자가 모바일과 데스크탑에서 접속합니다.', 'neutral');
    await this.transfer('domain', 'users', { color: 'emerald' });

    this.node('users').classList.add('is-done');
    this.host.querySelectorAll('.deploy-device').forEach((device) => device.classList.add('is-live'));
    this.host.querySelector('[data-url]').classList.add('is-live');
    this.particles.burst(this.node('users'), { color: 'emerald', count: 46 });
    this.setStatus('배포 성공: 링크 한 줄로 누구나 접속할 수 있습니다.', 'success');
    this.busy = false;
  }

  destroy() {
    this.particles?.destroy();
  }
}
