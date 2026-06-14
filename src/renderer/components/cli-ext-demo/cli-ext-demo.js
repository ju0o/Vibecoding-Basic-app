const CLAUDE_LINES = [
  '$ claude',
  '',
  '  ╭───────────────────────────╮',
  '  │  Claude Code  (claude.ai) │',
  '  ╰───────────────────────────╯',
  '',
  '> 버튼에 그라디언트 추가해줘',
  '',
  '  ⠿ Reading LoginForm.tsx...',
  '  ⠿ Analyzing button styles...',
  '  ✔ Updating className → "btn-gradient"',
  '  ✔ Adding gradient CSS rule',
  '',
  '  1 file changed, 2 insertions',
];

const CODEX_LINES = [
  '$ codex',
  '',
  '  Codex CLI  (OpenAI)',
  '  GPT-5.5 기반 에이전트',
  '',
  '> git에 커밋하고 PR 만들어줘',
  '',
  '  → git add -A',
  '  → git commit -m "style: gradient button"',
  '  → gh pr create --title "Button gradient"',
  '',
  '  ✔ PR #42 opened',
];

export class CliExtDemo {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.busy = false;
    this.render();
  }

  static mount(host, context) {
    return new CliExtDemo(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'cli-ext-demo-sim');
    this.host.innerHTML = `
      <div class="edu-panel ced-panel">
        <div class="ced-layout">

          <!-- 터미널 A: Claude Code -->
          <div class="ced-term-box">
            <div class="ced-term-bar">
              <span class="ced-term-dot"></span>
              <span class="ced-term-dot" style="background:var(--edu-amber)"></span>
              <span class="ced-term-dot" style="background:var(--edu-emerald)"></span>
              <span class="ced-term-label">
                <span class="ced-term-badge" style="background:linear-gradient(135deg,#CC785C,#A05C3C)">C</span>
                Claude Code · Terminal
              </span>
            </div>
            <pre class="ced-term-body" data-term-a><span class="ced-term-placeholder">← 버튼을 눌러 실행하세요</span></pre>
          </div>

          <!-- 터미널 B: Codex CLI -->
          <div class="ced-term-box">
            <div class="ced-term-bar">
              <span class="ced-term-dot"></span>
              <span class="ced-term-dot" style="background:var(--edu-amber)"></span>
              <span class="ced-term-dot" style="background:var(--edu-emerald)"></span>
              <span class="ced-term-label">
                <span class="ced-term-badge" style="background:linear-gradient(135deg,#10A37F,#1A8C6A)">O</span>
                Codex CLI · Terminal
              </span>
            </div>
            <pre class="ced-term-body" data-term-b><span class="ced-term-placeholder">← 버튼을 눌러 실행하세요</span></pre>
          </div>

        </div>

        <!-- 확장 설치 줄 -->
        <div class="ced-ext-strip">
          <div class="ced-ext-strip-label">VSCode / Cursor 확장으로도 동일하게 작동합니다</div>
          <div class="ced-ext-badges">
            <div class="ced-ext-badge-item" data-ext-badge="0">
              <span class="ced-ext-badge-icon" style="background:linear-gradient(135deg,#CC785C,#A05C3C)">C</span>
              <span>Claude Code</span>
              <span class="ced-ext-status" data-ext-status="0">Extension</span>
            </div>
            <div class="ced-ext-badge-item" data-ext-badge="1">
              <span class="ced-ext-badge-icon" style="background:linear-gradient(135deg,#10A37F,#1A8C6A)">O</span>
              <span>Codex</span>
              <span class="ced-ext-status" data-ext-status="1">Extension</span>
            </div>
            <div class="ced-ext-badge-item" data-ext-badge="2">
              <span class="ced-ext-badge-icon" style="background:linear-gradient(135deg,#6366F1,#8B5CF6)">W</span>
              <span>Windsurf</span>
              <span class="ced-ext-status" data-ext-status="2">Extension</span>
            </div>
          </div>
        </div>

        <div class="edu-toolbar" style="justify-content:center;margin-top:10px">
          <button class="edu-btn" data-action="run-claude">Claude Code 실행</button>
          <button class="edu-btn" data-action="run-codex">Codex CLI 실행</button>
          <button class="edu-btn" data-tone="success" data-action="activate-ext">확장 활성화</button>
        </div>
        <div class="edu-status" data-status>CLI에서 직접 AI에게 지시할 수 있습니다.</div>
      </div>
    `;

    this.termA   = this.host.querySelector('[data-term-a]');
    this.termB   = this.host.querySelector('[data-term-b]');
    this.statusEl = this.host.querySelector('[data-status]');

    this.host.querySelector('[data-action="run-claude"]').addEventListener('click', () => this.runClaude());
    this.host.querySelector('[data-action="run-codex"]').addEventListener('click', () => this.runCodex());
    this.host.querySelector('[data-action="activate-ext"]').addEventListener('click', () => this.activateExt());
  }

  setStatus(msg, state = 'neutral') {
    this.statusEl.textContent = msg;
    this.statusEl.dataset.state = state;
  }

  async runClaude() {
    if (this.busy) return;
    this.busy = true;
    this.termA.textContent = '';
    this.setStatus('Claude Code 실행 중...');
    await this.animation.streamLines(this.termA, CLAUDE_LINES, { speed: 7, gap: 55 });
    this.setStatus('완료: 터미널에서 AI가 파일을 직접 수정했습니다.', 'success');
    this.busy = false;
  }

  async runCodex() {
    if (this.busy) return;
    this.busy = true;
    this.termB.textContent = '';
    this.setStatus('Codex CLI 실행 중...');
    await this.animation.streamLines(this.termB, CODEX_LINES, { speed: 7, gap: 55 });
    this.setStatus('완료: AI가 git commit과 PR까지 자동으로 처리했습니다.', 'success');
    this.busy = false;
  }

  async activateExt() {
    if (this.busy) return;
    this.busy = true;
    this.setStatus('확장 활성화 중...');

    const badges = [0, 1, 2];
    for (const i of badges) {
      const el = this.host.querySelector(`[data-ext-status="${i}"]`);
      el.textContent = '설치 중...';
      el.className = 'ced-ext-status is-installing';
      await this.animation.wait(420);
      el.textContent = '✓ 활성';
      el.className = 'ced-ext-status is-active';
      this.host.querySelector(`[data-ext-badge="${i}"]`).classList.add('is-active');
    }

    this.setStatus('완료: IDE에 AI 확장이 추가됐습니다. CLI와 동일한 기능을 GUI로 사용합니다.', 'success');
    this.busy = false;
  }
}
