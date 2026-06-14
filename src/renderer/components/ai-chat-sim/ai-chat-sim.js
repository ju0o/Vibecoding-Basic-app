const GENERATE_LINES = [
  '+ src/components/LoginForm.tsx',
  '+ src/app/page.tsx  (updated)',
  '+ src/app/globals.css  (updated)',
  '~ preview refreshed',
];

const REVISE_LINES = [
  '~ LoginForm.tsx',
  '  className="btn-plain"  →  "btn-gradient"',
  '  border-radius: 8px   →  border-radius: 999px',
  '~ preview refreshed',
];

export class AiChatSimulation {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.busy = false;
    this.render();
  }

  static mount(host, context) {
    return new AiChatSimulation(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'ai-chat-sim');
    this.host.innerHTML = `
      <div class="edu-panel ai-chat-panel">
        <div class="ai-chat-head">
          <div>
            <div class="ai-chat-kicker">AI CODING FLOW</div>
            <div class="ai-chat-title">말 한 줄이 화면 변경으로 이어집니다.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-action="generate">로그인 폼 생성</button>
            <button class="edu-btn" data-tone="success" data-action="revise">버튼 스타일 변경</button>
          </div>
        </div>

        <div class="ai-chat-layout">

          <!-- 채팅창 -->
          <div class="ai-chat-window">
            <div class="ai-chat-win-bar">
              <span class="ai-chat-win-dot"></span>
              <span class="ai-chat-win-dot" style="background:var(--edu-amber)"></span>
              <span class="ai-chat-win-dot" style="background:var(--edu-emerald)"></span>
              <span class="ai-chat-win-label">AI IDE · Chat</span>
            </div>
            <div class="ai-chat-win-body">
              <div class="ai-message user" data-user-msg>로그인 폼 만들어줘</div>
              <div class="ai-message ai" data-ai-message>버튼을 눌러 시작하세요.</div>
            </div>
          </div>

          <!-- 생성된 파일 -->
          <div class="ai-code-window">
            <div class="ai-code-head">generated files</div>
            <div class="ai-file-list">
              <span data-file="component">src/components/LoginForm.tsx</span>
              <span data-file="page">src/app/page.tsx</span>
              <span data-file="style">src/app/globals.css</span>
            </div>
            <pre data-code></pre>
          </div>

          <!-- 미리보기: 실제 로그인 화면 -->
          <div class="ai-preview">
            <div class="ai-preview-browser">
              <i></i><i></i><i></i>
              <span class="ai-preview-url">localhost:3000</span>
            </div>
            <div class="ai-preview-body" data-preview-body>
              <!-- 초기 상태: 빈 화면 -->
              <div class="preview-empty" data-preview-empty>
                <div class="preview-empty-icon">🖥️</div>
                <div class="preview-empty-text">미리보기 대기 중</div>
              </div>

              <!-- 로그인 폼 (숨김 → 생성 시 등장) -->
              <div class="login-mock" data-login-mock style="display:none">
                <div class="login-mock-logo" data-login-logo>
                  <span class="login-logo-icon">✦</span>
                  <span>MyApp</span>
                </div>
                <div class="login-mock-title">로그인</div>
                <div class="login-mock-field">
                  <label>이메일</label>
                  <div class="login-mock-input">user@example.com</div>
                </div>
                <div class="login-mock-field">
                  <label>비밀번호</label>
                  <div class="login-mock-input">••••••••</div>
                </div>
                <button class="login-mock-btn" data-login-btn>로그인</button>
                <div class="login-mock-link">계정이 없으신가요? <span>회원가입</span></div>
              </div>
            </div>
          </div>

        </div>

        <div class="edu-status" data-status>버튼을 눌러 AI가 만드는 과정을 체험하세요.</div>
      </div>
    `;

    this.aiMessage  = this.host.querySelector('[data-ai-message]');
    this.userMsg    = this.host.querySelector('[data-user-msg]');
    this.code       = this.host.querySelector('[data-code]');
    this.status     = this.host.querySelector('[data-status]');
    this.loginMock  = this.host.querySelector('[data-login-mock]');
    this.loginBtn   = this.host.querySelector('[data-login-btn]');
    this.emptyState = this.host.querySelector('[data-preview-empty]');

    this.host.querySelector('[data-action="generate"]').addEventListener('click', () => this.generate());
    this.host.querySelector('[data-action="revise"]').addEventListener('click', () => this.revise());
  }

  setStatus(msg, state = 'neutral') {
    this.status.textContent = msg;
    this.status.dataset.state = state;
  }

  async generate() {
    if (this.busy) return;
    this.busy = true;

    // reset
    this.loginMock.style.display = 'none';
    this.loginMock.classList.remove('is-visible');
    this.emptyState.style.display = 'flex';
    this.loginBtn.className = 'login-mock-btn';
    this.loginBtn.textContent = '로그인';
    this.code.textContent = '';
    this.host.querySelectorAll('[data-file]').forEach(f => f.classList.remove('is-flash'));
    this.userMsg.textContent = '로그인 폼 만들어줘';

    this.aiMessage.innerHTML = '<span class="ai-thinking"><i></i><i></i><i></i></span>';
    this.setStatus('AI가 요청을 해석하는 중...');
    await this.animation.wait(700);

    await this.animation.typeText(this.aiMessage, '로그인 폼을 만들어 드릴게요. 이메일·비밀번호 필드와 버튼을 포함해 생성합니다.', { speed: 11 });

    this.setStatus('파일 생성 중...');
    for (const f of this.host.querySelectorAll('[data-file]')) {
      f.classList.add('is-flash');
      await this.animation.wait(220);
    }

    await this.animation.streamLines(this.code, GENERATE_LINES, { speed: 9, gap: 80 });

    // 미리보기 등장
    this.emptyState.style.display = 'none';
    this.loginMock.style.display = 'flex';
    await this.animation.wait(60);
    this.loginMock.classList.add('is-visible');

    this.setStatus('완료: 로그인 폼이 화면에 나타났습니다.', 'success');
    this.busy = false;
  }

  async revise() {
    if (this.busy) return;
    if (this.loginMock.style.display === 'none') {
      this.setStatus('먼저 "로그인 폼 생성"을 실행하세요.', 'fail');
      return;
    }
    this.busy = true;

    this.userMsg.textContent = '버튼을 더 예쁘게 바꿔줘 — 그라디언트 + 둥글게';
    this.aiMessage.innerHTML = '<span class="ai-thinking"><i></i><i></i><i></i></span>';
    this.setStatus('AI가 스타일 수정 중...');
    await this.animation.wait(650);

    await this.animation.typeText(this.aiMessage, '버튼 모양과 색상을 업그레이드했습니다.', { speed: 13 });

    this.host.querySelectorAll('[data-file]').forEach(f => f.classList.remove('is-flash'));
    this.code.textContent = '';
    await this.animation.streamLines(this.code, REVISE_LINES, { speed: 10, gap: 90 });

    // 버튼 시각 변화 — 극적으로
    this.loginBtn.classList.add('is-revising');
    await this.animation.wait(180);
    this.loginBtn.classList.remove('is-revising');
    this.loginBtn.classList.add('is-styled');
    this.loginBtn.textContent = '시작하기 →';

    this.setStatus('완료: 버튼 색상·모양이 바뀌었습니다. 텍스트도 업데이트됐어요.', 'success');
    this.busy = false;
  }
}
