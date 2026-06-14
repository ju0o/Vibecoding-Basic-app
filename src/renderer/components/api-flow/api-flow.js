import { ParticleSystem } from '../../engine/particle-system/particle-system.js';

const STAGES = [
  ['front', '사용자 화면', '버튼 클릭 · 입력값'],
  ['api', 'API', '요청을 받는 입구'],
  ['server', '서버', '권한 확인 · 처리'],
  ['db', 'DB', '데이터 저장'],
  ['response', '응답', '완료 메시지'],
];

export class ApiFlowSimulation {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.particles = null;
    this.busy = false;
    this.render();
  }

  static mount(host, context) {
    return new ApiFlowSimulation(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'api-flow-sim');
    this.dbCount = 1;
    this.host.innerHTML = `
      <div class="edu-panel api-flow-panel">
        <div class="api-flow-head">
          <div>
            <div class="api-kicker">LIVE DATA FLOW</div>
            <div class="api-title">버튼 클릭부터 DB 저장까지 — 전체 흐름을 봅니다.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-tone="danger" data-action="fail">실패 시나리오</button>
            <button class="edu-btn" data-tone="success" data-action="retry">재시도</button>
          </div>
        </div>

        <div class="api-browser-row">
          <div class="api-browser-mock">
            <div class="api-bm-chrome">
              <span class="api-bm-dot"></span><span class="api-bm-dot"></span><span class="api-bm-dot"></span>
              <span class="api-bm-url">localhost:3000/todos</span>
            </div>
            <div class="api-bm-body">
              <div class="api-bm-form">
                <input class="api-bm-input" value="오늘 할 일" readonly>
                <button class="api-bm-save-btn" data-bm-btn>💾 저장</button>
              </div>
              <div class="api-bm-feedback" data-bm-feedback>—</div>
            </div>
          </div>
          <div class="api-db-preview">
            <div class="api-db-label">💾 DB 저장된 항목</div>
            <div class="api-db-list" data-db-list>
              <div class="api-db-item api-db-old">1. 기존 항목 A</div>
              <div class="api-db-item api-db-old">2. 기존 항목 B</div>
            </div>
          </div>
        </div>

        <div class="api-stage-row">
          ${STAGES.map(([id, title, body]) => `
            <div class="api-stage" data-stage="${id}">
              <span class="api-stage-dot"></span>
              <strong>${title}</strong>
              <small>${body}</small>
            </div>
          `).join('')}
        </div>
        <div class="api-response-grid">
          <div class="api-request-card">
            <span>REQUEST BODY</span>
            <code>{ "title": "오늘 할 일", "done": false }</code>
          </div>
          <div class="api-latency">
            <span class="api-latency-label">latency</span>
            <div class="api-latency-bar"><i></i></div>
          </div>
          <div class="api-response-card" data-response>
            <span>LIVE RESPONSE</span>
            <code data-response-text>대기 중...</code>
          </div>
        </div>
        <div class="edu-status" data-status>브라우저의 저장 버튼을 누르거나 아래 버튼으로 시뮬레이션하세요.</div>
      </div>
    `;

    this.particles = new ParticleSystem(this.host.querySelector('.api-flow-panel'));
    this.host.querySelector('[data-bm-btn]').addEventListener('click', () => this.run(true));
    this.host.querySelector('[data-action="fail"]').addEventListener('click', () => this.run(false));
    this.host.querySelector('[data-action="retry"]').addEventListener('click', () => this.retry());
  }

  getStage(id) {
    return this.host.querySelector(`[data-stage="${id}"]`);
  }

  setStatus(message, state = 'neutral') {
    const status = this.host.querySelector('[data-status]');
    status.textContent = message;
    status.dataset.state = state;
  }

  reset() {
    this.host.querySelectorAll('.api-stage').forEach((stage) => {
      stage.classList.remove('is-active', 'is-done', 'is-fail');
    });
    this.host.querySelector('[data-response]').classList.remove('is-success', 'is-fail');
    this.host.querySelector('[data-response-text]').textContent = '대기 중...';
    const bmBtn = this.host.querySelector('[data-bm-btn]');
    const bmFeedback = this.host.querySelector('[data-bm-feedback]');
    if (bmBtn) { bmBtn.classList.remove('is-loading'); bmBtn.textContent = '💾 저장'; }
    if (bmFeedback) { bmFeedback.className = 'api-bm-feedback'; bmFeedback.textContent = '—'; }
  }

  async hop(from, to, options = {}) {
    const fromStage = this.getStage(from);
    const toStage = this.getStage(to);
    fromStage.classList.add('is-active');
    toStage.classList.add('is-active');
    await this.particles.emitBeam(fromStage, toStage, {
      color: options.fail ? 'rose' : (options.color || 'cyan'),
      fail: options.fail,
      duration: options.duration || 820,
      count: options.count || 30,
    });
    fromStage.classList.remove('is-active');
    fromStage.classList.add(options.fail ? 'is-fail' : 'is-done');
  }

  async run(success = true) {
    if (this.busy) return;
    this.busy = true;
    this.reset();

    // Browser: button starts loading
    const bmBtn = this.host.querySelector('[data-bm-btn]');
    const bmFeedback = this.host.querySelector('[data-bm-feedback]');
    if (bmBtn) { bmBtn.classList.add('is-loading'); bmBtn.textContent = '처리 중...'; }
    if (bmFeedback) bmFeedback.textContent = '서버로 요청 중...';

    this.setStatus('브라우저 → API → 서버 → DB 흐름이 시작됩니다.', 'neutral');
    await this.animation.pulse(this.getStage('front'));
    this.setStatus('프론트에서 API로 요청을 보냅니다.', 'neutral');
    await this.hop('front', 'api', { color: 'cyan' });

    this.setStatus('API가 서버로 요청을 전달합니다. 잠깐의 지연이 생깁니다.', 'neutral');
    this.host.classList.add('is-latency');
    await this.animation.wait(520);
    this.host.classList.remove('is-latency');
    await this.hop('api', 'server', { color: 'violet' });

    this.setStatus('서버가 권한을 확인하고 DB에 저장을 시도합니다.', 'neutral');
    await this.hop('server', 'db', { color: success ? 'emerald' : 'rose', fail: !success });

    if (!success) {
      this.getStage('db').classList.add('is-fail');
      this.host.querySelector('[data-response]').classList.add('is-fail');
      if (bmBtn) { bmBtn.classList.remove('is-loading'); bmBtn.textContent = '💾 저장'; }
      if (bmFeedback) { bmFeedback.className = 'api-bm-feedback is-fail'; bmFeedback.textContent = '✗ 저장 실패'; }
      await this.animation.typeText(this.host.querySelector('[data-response-text]'), '500 DB_WRITE_FAILED · 권한 또는 연결 문제');
      this.setStatus('실패했습니다. 에러를 복사해 AI에게 원인 분석을 요청합니다.', 'fail');
      this.busy = false;
      return;
    }

    // DB: add new item to the preview list
    this.getStage('db').classList.add('is-done');
    const dbList = this.host.querySelector('[data-db-list]');
    if (dbList) {
      this.dbCount++;
      const item = document.createElement('div');
      item.className = 'api-db-item api-db-new';
      item.textContent = `${this.dbCount + 1}. 오늘 할 일 (방금 추가됨)`;
      dbList.appendChild(item);
    }

    await this.hop('db', 'server', { color: 'emerald', duration: 640, count: 20 });
    await this.hop('server', 'response', { color: 'emerald', duration: 680, count: 22 });
    this.getStage('response').classList.add('is-done');
    this.host.querySelector('[data-response]').classList.add('is-success');
    this.particles.burst(this.getStage('response'), { color: 'emerald' });
    await this.animation.typeText(this.host.querySelector('[data-response-text]'), '200 OK · 저장 완료 · 화면 갱신');

    // Browser: show success
    if (bmBtn) { bmBtn.classList.remove('is-loading'); bmBtn.textContent = '💾 저장'; }
    if (bmFeedback) { bmFeedback.className = 'api-bm-feedback is-success'; bmFeedback.textContent = '✓ 저장 완료! 목록이 업데이트되었습니다.'; }

    this.setStatus('성공: 사용자는 초록색 완료 메시지만 보지만, 뒤에서는 이 모든 흐름이 지나갔습니다.', 'success');
    this.busy = false;
  }

  async retry() {
    if (this.busy) return;
    this.setStatus('같은 요청을 수정한 뒤 다시 실행합니다.', 'neutral');
    // Remove previously added new items (keep only the original old ones)
    const dbList = this.host.querySelector('[data-db-list]');
    if (dbList) dbList.querySelectorAll('.api-db-new').forEach(el => el.remove());
    await this.animation.wait(240);
    this.run(true);
  }

  destroy() {
    this.particles?.destroy();
  }
}
