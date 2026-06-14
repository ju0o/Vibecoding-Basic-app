const ZONE_ORDER = ['menu', 'actbar', 'sidebar', 'editor', 'aichat', 'terminal'];

const ZONE_NUMS = { menu: '①', actbar: '②', sidebar: '③', editor: '④', aichat: '⑤', terminal: '⑥' };

// Static zone info for zones that don't change
const ZONE_INFO = {
  menu: {
    name: '📁 메뉴 바 (Menu Bar)',
    desc: '파일 열기·저장, 설정, 터미널 실행 등 주요 기능에 접근하는 최상단 메뉴입니다.',
    tips: [
      'File → Open Folder: 프로젝트 폴더 열기',
      'Terminal → New Terminal: 하단 터미널 열기',
      'View → Extensions: 확장 패널 열기',
    ],
  },
  actbar: {
    name: '⬛ 액티비티 바 (Activity Bar)',
    desc: '왼쪽 세로 아이콘 줄. 아이콘을 클릭하면 오른쪽 사이드바의 내용이 전환됩니다. 아이콘을 눌러보세요.',
    tips: [
      '📁 탐색기: 프로젝트 파일 목록',
      '🔍 검색: 전체 파일 코드 검색',
      '🔌 확장: AI 도구 설치 위치 ← 주요',
      '🐞 디버그: 오류 추적 & 중단점',
    ],
  },
  editor: {
    name: '✏️ 코드 에디터 (Code Editor)',
    desc: '코드를 보고 수정하는 중앙 공간. AI가 명령을 받으면 이 화면의 파일이 실시간으로 바뀝니다.',
    tips: [
      '여러 탭으로 파일 동시 편집',
      'AI 명령 → 코드 자동 수정',
      'Tab 키: AI 인라인 제안 즉시 수락',
    ],
  },
  aichat: {
    name: '🤖 AI 채팅 패널 (AI Chat)',
    desc: '오른쪽 대화창. 자연어로 요청하면 AI가 직접 파일을 열어 수정하고 결과를 설명합니다.',
    tips: [
      '"버튼을 파란색 그라디언트로 바꿔줘"',
      '"이 오류의 원인 찾아서 고쳐줘"',
      '"로그인 폼 컴포넌트 추가해줘"',
    ],
  },
  terminal: {
    name: '🖥️ 터미널 (Terminal)',
    desc: 'Ctrl+` 로 여닫는 하단 터미널. npm 명령어, git 작업, Claude Code CLI를 바로 실행합니다.',
    tips: [
      'npm run dev → 개발 서버 시작',
      'npm install → 패키지 설치',
      'git commit → 변경사항 저장',
      'claude → CLI AI 에이전트 실행',
    ],
  },
};

// Sidebar content changes based on which Activity Bar icon is active
const SIDEBAR_VIEWS = {
  files: {
    name: '📁 탐색기 (Explorer)',
    desc: '현재 프로젝트의 파일·폴더 구조를 보여줍니다. 파일을 클릭하면 에디터에서 열립니다.',
    tips: [
      '폴더/파일 클릭 → 에디터에서 열림',
      '우클릭 → 파일 생성·삭제·이름변경',
      'AI가 만든 파일들이 여기 표시됨',
    ],
    html: `
      <div class="ide-sb-head">EXPLORER</div>
      <div class="ide-tree">
        <div class="ide-tree-item ide-tree-folder">▾ 📂 src</div>
        <div class="ide-tree-item ide-tree-d1">▾ 📂 components</div>
        <div class="ide-tree-item ide-tree-d2 ide-tree-active">📄 LoginForm.tsx</div>
        <div class="ide-tree-item ide-tree-d2">📄 Header.tsx</div>
        <div class="ide-tree-item ide-tree-d1">📄 page.tsx</div>
        <div class="ide-tree-item ide-tree-d1">📄 globals.css</div>
        <div class="ide-tree-item ide-tree-folder">▸ 📂 public</div>
        <div class="ide-tree-item">📄 package.json</div>
        <div class="ide-tree-item">📄 .env</div>
      </div>
    `,
  },
  search: {
    name: '🔍 검색 (Search)',
    desc: '열린 프로젝트의 모든 파일에서 코드를 검색합니다. 변수명·함수명·오류 메시지를 찾을 때 씁니다.',
    tips: [
      '함수명·변수명 전체 검색',
      '오류 메시지로 원인 파일 찾기',
      'Ctrl+Shift+F 단축키로 바로 열기',
    ],
    html: `
      <div class="ide-sb-head">SEARCH</div>
      <div class="ide-sb-searchbox" style="margin:7px 8px 4px">🔍 btn-gradient...</div>
      <div class="ide-search-result">
        <div class="ide-sr-file">LoginForm.tsx  <span style="opacity:.4">2 matches</span></div>
        <div class="ide-sr-line"><span style="color:#ffcb6b">className</span>=<span style="color:#c3e88d">"btn-gradient"</span></div>
        <div class="ide-sr-file">globals.css  <span style="opacity:.4">1 match</span></div>
        <div class="ide-sr-line"><span style="color:#f07178">.btn-gradient</span> {</div>
      </div>
    `,
  },
  extensions: {
    name: '🔌 확장 프로그램 (Extensions)',
    desc: '여기서 AI 도구와 에이전트 확장을 확인합니다. 설치형 확장은 IDE 안에서 채팅, 파일 수정, 실행 흐름을 연결해줍니다.',
    tips: [
      'Claude Code: Anthropic 코딩 에이전트',
      'Codex: OpenAI 코딩 에이전트',
      'Windsurf: Cascade 중심 AI IDE',
      'Kiro: 명세 중심 AI IDE',
    ],
    html: `
      <div class="ide-sb-head">EXTENSIONS</div>
      <div class="ide-sb-searchbox">🔍 Search Extensions…</div>
      <div class="ide-ext-row ide-ext-ok">
        <span class="ide-ext-ico" style="background:linear-gradient(135deg,#CC785C,#A05C3C)">C</span>
        <div><div class="ide-ext-nm">Claude Code</div><div class="ide-ext-by">Anthropic</div></div>
        <span class="ide-ext-ck">✓</span>
      </div>
      <div class="ide-ext-row ide-ext-ok">
        <span class="ide-ext-ico" style="background:linear-gradient(135deg,#10A37F,#1A8C6A)">O</span>
        <div><div class="ide-ext-nm">Codex</div><div class="ide-ext-by">OpenAI</div></div>
        <span class="ide-ext-ck">✓</span>
      </div>
      <div class="ide-ext-row">
        <span class="ide-ext-ico" style="background:linear-gradient(135deg,#6366F1,#8B5CF6)">W</span>
        <div><div class="ide-ext-nm">Windsurf</div><div class="ide-ext-by">Cascade</div></div>
        <span class="ide-ext-install-btn">설치</span>
      </div>
      <div class="ide-ext-row">
        <span class="ide-ext-ico" style="background:linear-gradient(135deg,#8B5CF6,#6D28D9)">K</span>
        <div><div class="ide-ext-nm">Kiro</div><div class="ide-ext-by">Spec-first</div></div>
        <span class="ide-ext-install-btn">설치</span>
      </div>
    `,
  },
  debug: {
    name: '🐞 디버그 (Run & Debug)',
    desc: '코드에 중단점(Breakpoint)을 설정하고 실행 흐름을 추적합니다. 오류 원인을 찾을 때 사용합니다.',
    tips: [
      'F5: 디버그 모드로 실행',
      '줄 번호 클릭 → 중단점 설정',
      'AI에게 "이 오류 디버그해줘" 도 됨',
    ],
    html: `
      <div class="ide-sb-head">RUN AND DEBUG</div>
      <div style="padding:10px 10px 6px">
        <button style="width:100%;padding:5px 8px;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.25);border-radius:5px;color:var(--edu-emerald);font-size:10px;cursor:pointer">▶ Run LoginForm.tsx</button>
      </div>
      <div style="padding:0 10px 8px;font-size:9px;color:rgba(255,255,255,.3)">중단점</div>
      <div class="ide-debug-bp">
        <span style="color:var(--edu-rose)">⬤</span>
        <span style="font-size:9px;color:rgba(255,255,255,.5)">LoginForm.tsx:8</span>
      </div>
    `,
  },
};

const TOUR_DURATION = 2600;

export class IdeTour {
  constructor(host, context) {
    this.host = host;
    this.animation = context.animation;
    this.activeZone = null;
    this.terminalOpen = false;
    this.autoTourRunning = false;
    this.currentSidebarView = 'files';
    this._fadeTimeout = null;
    this.render();
    this._selectZone('menu', true);
  }

  static mount(host, context) {
    return new IdeTour(host, context);
  }

  render() {
    this.host.classList.add('edu-sim', 'ide-tour-sim');
    this.host.innerHTML = `
      <div class="edu-panel idt-panel">

        <div class="idt-header">
          <div>
            <div class="idt-kicker">IDE · 인터페이스 투어</div>
            <div class="idt-title">각 영역을 클릭하거나 — 자동 투어로 한 바퀴 돌아보세요.</div>
          </div>
          <div class="edu-toolbar">
            <button class="edu-btn" data-action="toggle-terminal"><kbd>Ctrl</kbd>+<kbd>\`</kbd> 터미널</button>
            <button class="edu-btn" data-tone="success" data-action="toggle-tour" data-tour-btn>🎬 자동 투어</button>
          </div>
        </div>

        <!-- IDE Mock -->
        <div class="ide-mock">

          <div class="ide-titlebar">
            <div class="ide-tb-dots"><i></i><i></i><i></i></div>
            <div class="ide-tb-title">Cursor — LoginForm.tsx</div>
            <div class="ide-tb-badge">VS Code 기반 AI IDE</div>
          </div>

          <!-- ① Menu bar zone -->
          <div class="ide-zone ide-menubar" data-zone="menu" tabindex="0" role="button">
            <span class="ide-menu-item">File</span>
            <span class="ide-menu-item">Edit</span>
            <span class="ide-menu-item">View</span>
            <span class="ide-menu-item">Terminal</span>
            <span class="ide-menu-item">Help</span>
          </div>

          <div class="ide-main-row">

            <!-- ② Activity bar zone -->
            <div class="ide-zone ide-actbar" data-zone="actbar" tabindex="0" role="button">
              <div class="ide-act-ico" data-view="files" title="탐색기">📁</div>
              <div class="ide-act-ico" data-view="search" title="검색">🔍</div>
              <div class="ide-act-ico" data-view="extensions" title="확장">🔌</div>
              <div class="ide-act-ico" data-view="debug" title="디버그">🐞</div>
            </div>

            <!-- ③ Sidebar — content is dynamic -->
            <div class="ide-zone ide-sidebar" data-zone="sidebar" tabindex="0" role="button" data-sidebar-content>
              <!-- filled dynamically by _switchSidebar() -->
            </div>

            <!-- ④ Code editor zone -->
            <div class="ide-zone ide-editor" data-zone="editor" tabindex="0" role="button">
              <div class="ide-ed-tabs">
                <div class="ide-ed-tab ide-ed-active">LoginForm.tsx</div>
                <div class="ide-ed-tab">page.tsx</div>
                <div class="ide-ed-tab">globals.css</div>
              </div>
              <pre class="ide-code"><span class="ic-ln"> 1 </span><span class="ic-kw">import</span> <span class="ic-id">React</span> <span class="ic-kw">from</span> <span class="ic-str">'react'</span>
<span class="ic-ln"> 2 </span>
<span class="ic-ln"> 3 </span><span class="ic-kw">export default function</span> <span class="ic-fn">Login</span><span class="ic-pn">() {</span>
<span class="ic-ln"> 4 </span>  <span class="ic-kw">return</span> (
<span class="ic-ln"> 5 </span>    <span class="ic-tag">&lt;form</span> <span class="ic-attr">className</span>=<span class="ic-str">"login-form"</span><span class="ic-tag">&gt;</span>
<span class="ic-ln"> 6 </span>      <span class="ic-tag">&lt;input</span> <span class="ic-attr">type</span>=<span class="ic-str">"email"</span>
<span class="ic-ln"> 7 </span>             <span class="ic-attr">placeholder</span>=<span class="ic-str">"이메일"</span> <span class="ic-tag">/&gt;</span>
<span class="ic-ln"> 8 </span>      <span class="ic-tag">&lt;button</span>
<span class="ic-ln"> 9 </span>        <span class="ic-attr">className</span>=<span class="ic-str">"btn-gradient"</span><span class="ic-tag">&gt;</span>
<span class="ic-ln">10 </span>        로그인
<span class="ic-ln">11 </span>      <span class="ic-tag">&lt;/button&gt;</span>
<span class="ic-ln">12 </span>    <span class="ic-tag">&lt;/form&gt;</span>
<span class="ic-ln">13 </span>  )
<span class="ic-ln">14 </span><span class="ic-pn">}</span></pre>
            </div>

            <!-- ⑤ AI Chat zone -->
            <div class="ide-zone ide-aichat" data-zone="aichat" tabindex="0" role="button">
              <div class="ide-ac-head">
                <span class="ide-ac-logo">✦</span>
                <span>Claude</span>
                <span class="ide-ac-model">agent mode</span>
              </div>
              <div class="ide-ac-body">
                <div class="ide-ac-msg ide-ac-user">버튼에 그라디언트 추가해줘</div>
                <div class="ide-ac-msg ide-ac-ai">버튼 스타일 업데이트 ✓<br><span class="ide-ac-mono">className → "btn-gradient"</span></div>
                <div class="ide-ac-msg ide-ac-user">로그인 폼 만들어줘</div>
                <div class="ide-ac-msg ide-ac-ai">LoginForm.tsx 생성 ✓</div>
              </div>
              <div class="ide-ac-prompt">AI에게 명령 입력…</div>
            </div>

          </div><!-- /ide-main-row -->

          <!-- ⑥ Terminal zone (hidden by default) -->
          <div class="ide-zone ide-terminal" data-zone="terminal" tabindex="0" role="button" data-term-panel style="display:none">
            <div class="ide-term-tabbar">
              <span class="ide-term-tab ide-term-active">TERMINAL  ×</span>
              <span class="ide-term-tab" style="opacity:.4">PROBLEMS</span>
            </div>
            <div class="ide-term-body">
              <span class="ide-term-ps">$</span> npm run dev<br>
              <span style="color:var(--edu-emerald)">  ✓ Ready on http://localhost:3000</span><br>
              <span class="ide-term-ps">$</span> <span class="ide-term-blink">▋</span>
            </div>
          </div>

          <div class="ide-statusbar">
            <span>⎇ main</span>
            <span style="margin-left:8px">TypeScript</span>
            <span style="margin-left:auto">Ln 9, Col 30</span>
          </div>

        </div><!-- /ide-mock -->

        <!-- Callout strip -->
        <div class="idt-strip">
          <div class="idt-strip-top">
            <div class="idt-strip-name" data-strip-name>—</div>
            <div class="idt-strip-step" data-strip-step>1 / 6</div>
          </div>
          <div class="idt-progress-track">
            <div class="idt-progress-fill" data-strip-progress></div>
          </div>
          <div class="idt-strip-body" data-strip-body>
            <div class="idt-strip-desc" data-strip-desc></div>
            <div class="idt-strip-tips" data-strip-tips></div>
          </div>
          <div class="idt-strip-nav">
            <button class="edu-btn" data-action="prev">◀ 이전</button>
            <button class="edu-btn" data-action="next">다음 ▶</button>
          </div>
        </div>

      </div>
    `;

    // Cache refs
    this.termPanel     = this.host.querySelector('[data-term-panel]');
    this.sidebarEl     = this.host.querySelector('[data-sidebar-content]');
    this.stripName     = this.host.querySelector('[data-strip-name]');
    this.stripStep     = this.host.querySelector('[data-strip-step]');
    this.stripProgress = this.host.querySelector('[data-strip-progress]');
    this.stripDesc     = this.host.querySelector('[data-strip-desc]');
    this.stripTips     = this.host.querySelector('[data-strip-tips]');
    this.stripBody     = this.host.querySelector('[data-strip-body]');
    this.tourBtn       = this.host.querySelector('[data-tour-btn]');

    // Init sidebar to files view
    this._renderSidebar('files');
    this._setActiveActIcon('files');

    // Add numbered badges
    this.host.querySelectorAll('.ide-zone').forEach(el => {
      const b = document.createElement('div');
      b.className = 'ide-zone-num';
      b.textContent = ZONE_NUMS[el.dataset.zone] || '';
      el.appendChild(b);
    });

    // Zone clicks — stop tour, select zone
    this.host.querySelectorAll('.ide-zone').forEach(el => {
      el.addEventListener('click', () => {
        this.autoTourRunning = false;
        this._setTourBtn(false);
        this._resetProgress();
        this._selectZone(el.dataset.zone);
      });
    });

    // Activity bar icon clicks — switch sidebar view (no zone change)
    this.host.querySelectorAll('[data-view]').forEach(ico => {
      ico.addEventListener('click', e => {
        e.stopPropagation(); // don't trigger actbar zone click
        this._switchSidebar(ico.dataset.view);
      });
    });

    // Buttons
    this.host.querySelector('[data-action="toggle-terminal"]').addEventListener('click', () => this._toggleTerminal());
    this.host.querySelector('[data-action="toggle-tour"]').addEventListener('click', () => this._handleTourBtn());
    this.host.querySelector('[data-action="prev"]').addEventListener('click', () => this._step(-1));
    this.host.querySelector('[data-action="next"]').addEventListener('click', () => this._step(1));
  }

  // ── Sidebar view switching ────────────────────────────

  _switchSidebar(view) {
    if (this.currentSidebarView === view) return;
    this.currentSidebarView = view;
    this._renderSidebar(view);
    this._setActiveActIcon(view);

    // If sidebar zone is active in callout, update it live
    if (this.activeZone === 'sidebar') {
      const info = SIDEBAR_VIEWS[view];
      this.stripBody.style.opacity = '0';
      setTimeout(() => {
        this._writeContent(info);
        this.stripBody.style.transition = 'opacity 200ms';
        this.stripBody.style.opacity = '1';
      }, 80);
    }
  }

  _renderSidebar(view) {
    const v = SIDEBAR_VIEWS[view];
    if (v) this.sidebarEl.innerHTML = v.html;
    // Re-add zone badge (innerHTML wipe removes it)
    const b = document.createElement('div');
    b.className = 'ide-zone-num';
    b.textContent = ZONE_NUMS['sidebar'] || '';
    this.sidebarEl.appendChild(b);
    if (this.activeZone === 'sidebar') {
      this.sidebarEl.classList.add('is-active');
    }
  }

  _setActiveActIcon(view) {
    this.host.querySelectorAll('[data-view]').forEach(ico => {
      ico.classList.toggle('ide-act-sel', ico.dataset.view === view);
    });
  }

  // ── Zone selection ────────────────────────────────────

  _selectZone(zoneId, instant = false) {
    if (this._fadeTimeout) clearTimeout(this._fadeTimeout);

    this.host.querySelectorAll('.ide-zone').forEach(z => z.classList.remove('is-active'));
    const el = this.host.querySelector(`[data-zone="${zoneId}"]`);
    if (el) el.classList.add('is-active');

    // Resolve zone info — sidebar is context-sensitive
    const info = zoneId === 'sidebar'
      ? SIDEBAR_VIEWS[this.currentSidebarView]
      : ZONE_INFO[zoneId];
    if (!info) return;

    const idx = ZONE_ORDER.indexOf(zoneId);
    this.stripStep.textContent = `${idx + 1} / ${ZONE_ORDER.length}`;

    if (instant) {
      this._writeContent(info);
    } else {
      this.stripBody.style.opacity = '0';
      this.stripBody.style.transform = 'translateY(6px)';
      this._fadeTimeout = setTimeout(() => {
        this._writeContent(info);
        this.stripBody.style.transition = 'opacity 220ms ease, transform 220ms ease';
        this.stripBody.style.opacity = '1';
        this.stripBody.style.transform = 'translateY(0)';
      }, 110);
    }

    this.activeZone = zoneId;
  }

  _writeContent(info) {
    this.stripName.textContent = info.name;
    this.stripDesc.textContent = info.desc;
    this.stripTips.innerHTML = info.tips
      .map(t => `<div class="idt-tip">▸ ${t}</div>`)
      .join('');
  }

  // ── Navigation ────────────────────────────────────────

  _step(dir) {
    this.autoTourRunning = false;
    this._setTourBtn(false);
    this._resetProgress();
    const zones = this.terminalOpen ? ZONE_ORDER : ZONE_ORDER.filter(z => z !== 'terminal');
    const cur = zones.indexOf(this.activeZone ?? zones[0]);
    const next = (cur + dir + zones.length) % zones.length;
    this._selectZone(zones[next]);
  }

  // ── Auto-tour ─────────────────────────────────────────

  _handleTourBtn() {
    if (this.autoTourRunning) {
      this.autoTourRunning = false;
      this._setTourBtn(false);
      this._resetProgress();
    } else {
      this._runTour();
    }
  }

  async _runTour() {
    this.autoTourRunning = true;
    this._setTourBtn(true);

    if (!this.terminalOpen) {
      this.terminalOpen = true;
      this.termPanel.style.display = 'flex';
    }

    for (let i = 0; i < ZONE_ORDER.length; i++) {
      if (!this.autoTourRunning) break;

      const zoneId = ZONE_ORDER[i];

      // When touring actbar → switch sidebar to Extensions to demo the connection
      if (zoneId === 'actbar') {
        this._switchSidebar('extensions');
      }
      // When sidebar is highlighted → it already shows Extensions from above

      this._selectZone(zoneId);
      await this._animateProgress(TOUR_DURATION);
      if (!this.autoTourRunning) break;
    }

    this.autoTourRunning = false;
    this._setTourBtn(false);
    this._resetProgress();
  }

  async _animateProgress(ms) {
    const fill = this.stripProgress;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    fill.getBoundingClientRect();
    fill.style.transition = `width ${ms}ms linear`;
    fill.style.width = '100%';
    return this.animation.wait(ms);
  }

  _resetProgress() {
    const fill = this.stripProgress;
    fill.style.transition = 'none';
    fill.style.width = '0%';
  }

  _setTourBtn(running) {
    if (running) {
      this.tourBtn.textContent = '⏹ 투어 중지';
      this.tourBtn.removeAttribute('data-tone');
    } else {
      this.tourBtn.innerHTML = '🎬 자동 투어';
      this.tourBtn.dataset.tone = 'success';
    }
  }

  // ── Terminal ─────────────────────────────────────────

  _toggleTerminal() {
    this.terminalOpen = !this.terminalOpen;
    this.termPanel.style.display = this.terminalOpen ? 'flex' : 'none';
    const btn = this.host.querySelector('[data-action="toggle-terminal"]');
    btn.innerHTML = this.terminalOpen
      ? '<kbd>Ctrl</kbd>+<kbd>`</kbd> 터미널 닫기'
      : '<kbd>Ctrl</kbd>+<kbd>`</kbd> 터미널';
    if (this.terminalOpen) {
      this.autoTourRunning = false;
      this._setTourBtn(false);
      this._resetProgress();
      this._selectZone('terminal');
    }
  }
}
