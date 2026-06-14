import { ParticleSystem } from '../../engine/particle-system/particle-system.js';

const STEPS = [
  { from: 'chat', to: 'ide',  label: '프롬프트 전달',  color: 'violet', msg: '설계 AI가 정리한 프롬프트를 AI IDE 채팅창에 붙여넣습니다.' },
  { from: 'ide',  to: 'chat', label: '결과물 공유',   color: 'cyan',   msg: 'AI IDE가 만든 코드·에러를 다시 설계 AI에게 보여줍니다.' },
];

export class VibeLoop {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.particles = null;
    this.busy = false;
    this.stepIdx = 0;
    this.loopCount = 0;
    this.render();
  }

  static mount(host, context) {
    return new VibeLoop(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'vibe-loop-sim');
    this.host.innerHTML = `
      <div class="edu-panel vibe-loop-panel">

        <div class="vl-head">
          <div>
            <div class="vl-kicker">THE VIBE LOOP</div>
            <div class="vl-title">두 AI 사이를 오가는 것이 바이브코딩입니다.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-action="step">한 단계 진행</button>
            <button class="edu-btn" data-tone="success" data-action="auto">자동 재생</button>
            <button class="edu-btn" data-tone="danger" data-action="reset">초기화</button>
          </div>
        </div>

        <div class="vl-arena">
          <div class="vl-node" data-node="chat">
            <div class="vl-node-icon">💬</div>
            <div class="vl-node-name">설계 AI</div>
            <div class="vl-node-sub">GPT · Claude · Gemini</div>
            <div class="vl-node-task" data-task="chat">아이디어 정리 · 프롬프트 생성</div>
          </div>

          <div class="vl-pipe">
            <div class="vl-pipe-lbl top" data-dir-label="top">프롬프트 전달 →</div>
            <div class="vl-pipe-line"></div>
            <div class="vl-pipe-lbl bot" data-dir-label="bot">← 결과물 공유</div>
            <div class="vl-loop-badge" data-loop-badge>0</div>
          </div>

          <div class="vl-node" data-node="ide">
            <div class="vl-node-icon">🛠️</div>
            <div class="vl-node-name">AI IDE</div>
            <div class="vl-node-sub">Cursor · Kiro · Windsurf</div>
            <div class="vl-node-task" data-task="ide">파일 생성 · 에러 수정</div>
          </div>
        </div>

        <div class="vl-step-track">
          <div class="vl-step-item" data-step="0">
            <span class="vl-step-dot"></span>
            <span>① 설계 AI → IDE  프롬프트 붙여넣기</span>
          </div>
          <div class="vl-step-arrow">→</div>
          <div class="vl-step-item" data-step="1">
            <span class="vl-step-dot"></span>
            <span>② IDE 결과 → 설계 AI  피드백 요청</span>
          </div>
          <div class="vl-step-arrow">→</div>
          <div class="vl-step-item vl-step-repeat">
            <span class="vl-step-dot"></span>
            <span>♾️ 반복</span>
          </div>
        </div>

        <div class="edu-status" data-status>버튼을 눌러 바이브코딩 루프를 체험해보세요.</div>
      </div>
    `;

    this.particles = new ParticleSystem(this.host.querySelector('.vibe-loop-panel'));
    this.statusEl = this.host.querySelector('[data-status]');
    this.loopBadge = this.host.querySelector('[data-loop-badge]');

    this.host.querySelector('[data-action="step"]').addEventListener('click', () => this.step());
    this.host.querySelector('[data-action="auto"]').addEventListener('click', () => this.autoPlay());
    this.host.querySelector('[data-action="reset"]').addEventListener('click', () => this.reset());
  }

  setStatus(msg, state = 'neutral') {
    this.statusEl.textContent = msg;
    this.statusEl.dataset.state = state;
  }

  getNode(id) {
    return this.host.querySelector(`[data-node="${id}"]`);
  }

  getStepEl(idx) {
    return this.host.querySelector(`[data-step="${idx}"]`);
  }

  reset() {
    this.busy = false;
    this.stepIdx = 0;
    this.loopCount = 0;
    this.loopBadge.textContent = '0';
    this.loopBadge.classList.remove('is-pop');
    this.host.querySelectorAll('.vl-node').forEach(n => n.classList.remove('is-active', 'is-done'));
    this.host.querySelectorAll('.vl-step-item').forEach(s => s.classList.remove('is-active', 'is-done'));
    this.setStatus('버튼을 눌러 바이브코딩 루프를 체험해보세요.');
  }

  async step() {
    if (this.busy) return;
    this.busy = true;

    const s = STEPS[this.stepIdx];
    const fromNode = this.getNode(s.from);
    const toNode = this.getNode(s.to);
    const stepEl = this.getStepEl(this.stepIdx);

    this.host.querySelectorAll('.vl-node').forEach(n => n.classList.remove('is-active'));
    fromNode.classList.add('is-active');
    stepEl.classList.add('is-active');
    this.setStatus(s.msg);
    await this.animation.wait(300);

    await this.particles.emitBeam(fromNode, toNode, {
      color: s.color,
      duration: 900,
      count: 28,
    });

    fromNode.classList.remove('is-active');
    fromNode.classList.add('is-done');
    toNode.classList.add('is-active');
    stepEl.classList.remove('is-active');
    stepEl.classList.add('is-done');
    await this.animation.wait(350);

    this.stepIdx = (this.stepIdx + 1) % STEPS.length;

    if (this.stepIdx === 0) {
      this.loopCount++;
      this.loopBadge.classList.remove('is-pop');
      void this.loopBadge.offsetWidth;
      this.loopBadge.textContent = `${this.loopCount}회`;
      this.loopBadge.classList.add('is-pop');
      this.setStatus(`루프 ${this.loopCount}회 완료! 이 반복이 바이브코딩입니다.`, 'success');
      this.host.querySelectorAll('.vl-node').forEach(n => n.classList.remove('is-active', 'is-done'));
      this.host.querySelectorAll('.vl-step-item').forEach(s => s.classList.remove('is-active', 'is-done'));
    }

    this.busy = false;
  }

  async autoPlay() {
    if (this.busy) return;
    this.reset();
    await this.animation.wait(200);
    for (let i = 0; i < 4; i++) {
      await this.step();
      await this.animation.wait(500);
    }
  }

  destroy() {
    this.particles?.destroy();
  }
}
