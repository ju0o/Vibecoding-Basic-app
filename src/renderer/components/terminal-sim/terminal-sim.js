const SETUP_LINES = [
  { type: 'cmd', text: '> npm install' },
  { type: 'load', text: 'installing packages...' },
  { type: 'ok', text: 'packages installed' },
  { type: 'cmd', text: '> npm run dev' },
  { type: 'load', text: 'starting local server...' },
  { type: 'ok', text: 'localhost running at http://localhost:3000' },
];

const ERROR_LINES = [
  { type: 'cmd', text: '> npm run dev' },
  { type: 'fail', text: 'Error: Cannot find module vite' },
  { type: 'trace', text: 'at node_modules/.bin/vite' },
  { type: 'trace', text: 'Fix hint: dependencies are missing' },
];

export class TerminalSimulation {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.busy = false;
    this.render();
  }

  static mount(host, context) {
    return new TerminalSimulation(host, context);
  }

  render() {
    const scenario = this.host.dataset.scenario || 'setup';
    this.host.classList.add('edu-sim', 'terminal-sim');
    this.host.innerHTML = `
      <div class="edu-panel terminal-panel">
        <div class="terminal-toolbar">
          <div>
            <div class="terminal-kicker">TERMINAL SIMULATOR</div>
            <div class="terminal-title">명령어는 무서운 창이 아니라 실행 버튼입니다.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-action="run">실행</button>
            <button class="edu-btn" data-tone="danger" data-action="error">에러 발생</button>
            <button class="edu-btn" data-tone="success" data-action="fix">AI로 해결</button>
          </div>
        </div>
        <div class="terminal-window-sim">
          <div class="terminal-window-bar">
            <span></span><span></span><span></span>
            <strong>vibe-coding-basic</strong>
          </div>
          <div class="terminal-output" data-output></div>
          <div class="terminal-cursor-line"><span>&gt;</span><i></i></div>
        </div>
        <div class="terminal-helper" data-helper>
          <strong>Tip</strong>
          <span>에러가 나오면 당황하지 말고, 빨간 문장을 복사해서 AI에게 보여주면 됩니다.</span>
        </div>
        <div class="edu-status" data-status>실행 버튼을 눌러 설치와 실행 흐름을 봅니다.</div>
      </div>
    `;

    this.output = this.host.querySelector('[data-output]');
    this.status = this.host.querySelector('[data-status]');
    this.host.querySelector('[data-action="run"]').addEventListener('click', () => this.play(SETUP_LINES, true));
    this.host.querySelector('[data-action="error"]').addEventListener('click', () => this.play(ERROR_LINES, false));
    this.host.querySelector('[data-action="fix"]').addEventListener('click', () => this.fix());

    if (scenario === 'error') {
      this.play(ERROR_LINES, false);
    }
  }

  setStatus(message, state = 'neutral') {
    this.status.textContent = message;
    this.status.dataset.state = state;
  }

  async addLine(line) {
    const row = document.createElement('div');
    row.className = `terminal-line is-${line.type}`;
    this.output.appendChild(row);
    this.output.scrollTop = this.output.scrollHeight;

    if (line.type === 'load') {
      row.innerHTML = `<span class="terminal-loading-label"></span><span class="terminal-loading-bar"><i></i></span>`;
      await this.animation.typeText(row.querySelector('.terminal-loading-label'), line.text, { speed: 12 });
      await this.animation.wait(720);
      return;
    }

    const prefix = line.type === 'ok' ? '✔ ' : line.type === 'fail' ? '✖ ' : '';
    await this.animation.typeText(row, `${prefix}${line.text}`, { speed: line.type === 'trace' ? 4 : 12 });
  }

  async play(lines, success) {
    if (this.busy) return;
    this.busy = true;
    this.output.innerHTML = '';
    this.host.classList.remove('is-error', 'is-success');
    this.setStatus('명령어 실행 중...', 'neutral');

    for (const line of lines) {
      await this.addLine(line);
      await this.animation.wait(120);
    }

    this.host.classList.add(success ? 'is-success' : 'is-error');
    this.setStatus(
      success ? '성공: 개발 서버가 실행됐습니다.' : '에러 발생: 이제 AI에게 물어볼 차례입니다.',
      success ? 'success' : 'fail',
    );
    this.busy = false;
  }

  async fix() {
    if (this.busy) return;
    this.busy = true;
    this.setStatus('AI에게 에러를 전달하고 해결 명령어를 받는 중...', 'neutral');
    await this.addLine({ type: 'cmd', text: '> AI: 이 에러 해결 방법 알려줘' });
    await this.addLine({ type: 'ok', text: 'npm install 을 먼저 실행한 뒤 다시 시작하세요.' });
    await this.animation.wait(250);
    this.busy = false;
    await this.play(SETUP_LINES, true);
  }
}
