'use strict';

(function registerVibeScenes() {
  const familyTypes = {
    workflow: ['workflow'],
    protocol: ['protocol'],
    agent: ['agent'],
    skill: ['skill'],
    plugin: ['plugin'],
    connected: ['connected'],
    terminal: ['terminal'],
    ide: ['ide', 'config', 'skill', 'plugin'],
    browser: ['workspace', 'request', 'browser'],
    pipeline: ['deploy', 'build', 'release', 'launch'],
    architecture: ['workflow', 'protocol', 'agent'],
    board: ['team', 'scope', 'pricing', 'split', 'operations'],
    showcase: ['showcase'],
    landscape: ['ai-landscape'],
    advanced: ['surface-compare'],
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));

  const familyFor = (type) => Object.entries(familyTypes)
    .find(([, types]) => types.includes(type))?.[0] || 'architecture';

  function getSteps({ lesson, scene }) {
    return scene?.steps || lesson.demo.stages.map((label, index) => ({
      label,
      title: lesson.sequence[index] || label,
      detail: lesson.sceneDetails?.[index]
        || lesson.concepts[index % lesson.concepts.length]?.[1]
        || lesson.objective,
    }));
  }

  function windowFrame(context, badge, body) {
    return `
      <div class="sim-window">
        <header class="sim-window-bar">
          <div class="window-dots"><i></i><i></i><i></i></div>
          <strong>${escapeHtml(context.lesson.title)}</strong>
          <span>${escapeHtml(badge)}</span>
        </header>
        ${body}
      </div>`;
  }

  function renderTerminal(context, steps) {
    return windowFrame(context, 'OPERATING CONSOLE', `
      <div class="terminal-workspace">
        <aside class="scene-side-list">
          <span>SESSION</span>
          ${steps.map((step, index) => `<div data-scene-item="${index}"><i></i><b>${String(index + 1).padStart(2, '0')}</b><small>${escapeHtml(step.label)}</small></div>`).join('')}
        </aside>
        <section class="terminal-screen">
          <div class="terminal-context"><span>cwd</span><b>~/vibe-studio/project</b><em>lesson-work</em></div>
          <div class="terminal-output">
            ${steps.map((step, index) => `
              <div class="terminal-line" data-scene-item="${index}">
                <span>${index === 0 ? '$' : index === steps.length - 1 ? '✓' : '›'}</span>
                <code>${escapeHtml(step.title)}</code>
                <small>${escapeHtml(step.detail)}</small>
              </div>`).join('')}
          </div>
          <div class="terminal-cursor">ready <i></i></div>
        </section>
        ${metricPanel(steps)}
      </div>`);
  }

  function renderIde(context, steps) {
    const files = ['src/', 'components/', 'App.tsx', 'styles.css', 'package.json', 'README.md'];
    return windowFrame(context, 'PROJECT WORKSPACE', `
      <div class="ide-workspace">
        <aside class="ide-files">
          <span>EXPLORER</span>
          ${files.map((file, index) => `<div data-scene-item="${Math.min(index, steps.length - 1)}"><i>${file.endsWith('/') ? '▾' : '◇'}</i><b>${escapeHtml(file)}</b></div>`).join('')}
        </aside>
        <section class="ide-editor">
          <div class="editor-tabs"><span class="active">App.tsx</span><span>Preview</span></div>
          <pre>${steps.map((step, index) => `<span data-scene-item="${index}"><i>${String(index + 1).padStart(2, '0')}</i><code>${escapeHtml(`// ${step.title}`)}</code></span>`).join('')}</pre>
          <div class="diff-strip"><b>+${steps.length}</b><span>작은 변경 · 검증 대기</span><em data-scene-metric="checks">0 / ${steps.length}</em></div>
        </section>
        <section class="ide-preview">
          <div class="preview-address"><i></i><span>localhost:3000</span></div>
          <div class="preview-product">
            <span>LIVE PREVIEW</span>
            <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
            <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
            <button type="button">변경 확인</button>
          </div>
        </section>
      </div>`);
  }

  function renderBrowser(context, steps) {
    return windowFrame(context, 'USER JOURNEY', `
      <div class="browser-scene">
        <section class="mock-browser">
          <div class="browser-toolbar"><div><i></i><i></i><i></i></div><span>https://my-service.local</span><em>secure</em></div>
          <nav><strong>VIBE MARKET</strong><span>홈</span><span>프로젝트</span><span>주문</span><span>내 계정</span></nav>
          <div class="browser-content">
            <div class="product-visual"><span>LIVE SERVICE</span><b data-scene-title>${escapeHtml(steps[0].title)}</b></div>
            <div class="product-copy">
              <small>현재 사용자 행동</small>
              <h4 data-scene-detail>${escapeHtml(steps[0].detail)}</h4>
              <div class="browser-state"><i></i><span data-scene-status>READY</span></div>
              <button type="button">${escapeHtml(steps[0].label)}</button>
            </div>
          </div>
          <div class="browser-toast" data-scene-toast>요청을 시작하면 처리 상태가 표시됩니다.</div>
        </section>
        <aside class="service-route">
          <span>REQUEST ROUTE</span>
          ${steps.map((step, index) => `
            <div data-scene-item="${index}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <span><b>${escapeHtml(step.label)}</b><small>${escapeHtml(step.title)}</small></span>
            </div>`).join('')}
          <div class="route-packet" data-scene-packet></div>
        </aside>
      </div>`);
  }

  function renderPipeline(context, steps) {
    return windowFrame(context, 'DELIVERY PIPELINE', `
      <div class="pipeline-scene">
        <div class="pipeline-sky">
          <div class="pipeline-orbit"></div>
          <div class="pipeline-nodes">
            ${steps.map((step, index) => `
              <div data-scene-item="${index}">
                <i>${String(index + 1).padStart(2, '0')}</i>
                <b>${escapeHtml(step.label)}</b>
                <small>${escapeHtml(step.title)}</small>
              </div>`).join('')}
          </div>
          <div class="pipeline-beam"><i data-scene-beam></i><span data-scene-packet></span></div>
        </div>
        <div class="release-console">
          <div><small>PIPELINE</small><b data-scene-status>READY</b></div>
          <div><small>CURRENT ACTION</small><b data-scene-title>${escapeHtml(steps[0].title)}</b></div>
          <div><small>VERIFICATION</small><b data-scene-metric="checks">0 / ${steps.length}</b></div>
          <div><small>LIVE URL</small><code data-scene-url>not-deployed.local</code></div>
        </div>
      </div>`);
  }

  function renderArchitecture(context, steps) {
    return windowFrame(context, 'SYSTEM CONTROL ROOM', `
      <div class="architecture-scene">
        <aside class="architecture-brief">
          <span>CONTROL CONTRACT</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <dl>
            <div><dt>OWNER</dt><dd>Human Lead</dd></div>
            <div><dt>BUDGET</dt><dd>Controlled</dd></div>
            <div><dt>MODE</dt><dd data-scene-status>READY</dd></div>
          </dl>
        </aside>
        <section class="architecture-map">
          <div class="control-core"><span>${escapeHtml(context.course.code)}</span><b>CONTROL</b></div>
          ${steps.map((step, index) => `
            <div class="architecture-node node-${index + 1}" data-scene-item="${index}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(step.label)}</b>
              <small>${escapeHtml(step.title)}</small>
            </div>`).join('')}
          <div class="control-scan" data-scene-beam></div>
        </section>
        <aside class="audit-stream">
          <span>OBSERVATION LOG</span>
          ${steps.map((step, index) => `<div data-scene-log="${index}"><i></i><span>${escapeHtml(step.detail)}</span></div>`).join('')}
        </aside>
      </div>`);
  }

  function renderWorkflow(context, steps) {
    return windowFrame(context, 'CONTEXT DESIGN ROOM', `
      <div class="expert-scene workflow-lab">
        <aside class="expert-brief">
          <span>WORKFLOW CONTRACT</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <dl>
            <div><dt>TRIGGER</dt><dd>업무 시작 신호</dd></div>
            <div><dt>OWNER</dt><dd>Human Lead</dd></div>
            <div><dt>MODE</dt><dd data-scene-status>READY</dd></div>
          </dl>
        </aside>
        <section class="context-board">
          <div class="context-stack">
            ${steps.map((step, index) => `
              <article data-scene-item="${index}">
                <i>${String(index + 1).padStart(2, '0')}</i>
                <span>${escapeHtml(step.label)}</span>
                <b>${escapeHtml(step.title)}</b>
                <small>${escapeHtml(step.detail)}</small>
              </article>`).join('')}
          </div>
          <div class="context-evidence">
            <div><small>INPUT</small><b>current task</b></div>
            <div><small>RULE</small><b>persistent instruction</b></div>
            <div><small>MEMORY</small><b>verified only</b></div>
          </div>
        </section>
        <aside class="expert-log">
          <span>DESIGN LOG</span>
          ${steps.map((step, index) => `<div data-scene-log="${index}"><i></i><span>${escapeHtml(step.title)} · ${escapeHtml(step.detail)}</span></div>`).join('')}
        </aside>
      </div>`);
  }

  function renderProtocol(context, steps) {
    const nodes = [
      ['HOST', 'AI 앱', '사용자 의도와 승인 화면'],
      ['CLIENT', 'MCP Client', '요청 형식과 세션 관리'],
      ['SERVER', 'MCP Server', '도구·자료·프롬프트 제공'],
      ['AUTH', '인증', '토큰과 최소 권한'],
      ['APPROVAL', '사람 승인', '쓰기·전송 전 정지'],
      ['AUDIT', '감사 로그', '누가 무엇을 했는지 기록'],
    ];
    return windowFrame(context, 'MCP PERMISSION NETWORK', `
      <div class="expert-scene protocol-network">
        <section class="mcp-map">
          <div class="mcp-beam" data-scene-beam></div>
          ${nodes.map(([label, title, copy], index) => `
            <article class="mcp-node mcp-node-${index + 1}" data-scene-item="${Math.min(index, steps.length - 1)}">
              <i>${escapeHtml(label)}</i>
              <b>${escapeHtml(title)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="mcp-packet" data-scene-packet></div>
        </section>
        <aside class="permission-panel">
          <span>PERMISSION DIFF</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="permission-grid">
            <div><small>READ</small><b>allowed</b></div>
            <div><small>WRITE</small><b>approval</b></div>
            <div><small>DELETE</small><b>blocked</b></div>
            <div><small>STATUS</small><b data-scene-status>READY</b></div>
          </div>
          <div class="protocol-steps">
            ${steps.map((step, index) => `<button type="button" data-scene-item="${index}">${escapeHtml(step.label)}</button>`).join('')}
          </div>
        </aside>
      </div>`);
  }

  function renderAgent(context, steps) {
    return windowFrame(context, 'AGENT CONTROL ROOM', `
      <div class="expert-scene agent-control">
        <aside class="agent-guardrail">
          <span>HUMAN GATE</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="guardrail-card"><small>BUDGET</small><b>limited</b></div>
          <div class="guardrail-card"><small>RETRY</small><b>max 2</b></div>
          <div class="guardrail-card"><small>ESCALATE</small><b>human lead</b></div>
        </aside>
        <section class="agent-loop">
          <div class="agent-core"><span>${escapeHtml(context.course.code)}</span><b>AGENT</b><em data-scene-status>READY</em></div>
          ${steps.map((step, index) => `
            <article class="agent-step agent-step-${index + 1}" data-scene-item="${index}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(step.label)}</b>
              <small>${escapeHtml(step.title)}</small>
            </article>`).join('')}
          <div class="agent-orbit" data-scene-beam></div>
        </section>
        <aside class="agent-observe">
          <span>OBSERVATION</span>
          ${steps.map((step, index) => `<div data-scene-log="${index}"><i></i><span>${escapeHtml(step.detail)}</span></div>`).join('')}
        </aside>
      </div>`);
  }

  function renderSkill(context, steps) {
    return windowFrame(context, 'SKILL PACKAGE BUILDER', `
      <div class="expert-scene skill-builder">
        <aside class="skill-files">
          <span>PACKAGE</span>
          ${['SKILL.md', 'references/', 'scripts/', 'examples/', 'tests/'].map((file, index) => `
            <div data-scene-item="${Math.min(index, steps.length - 1)}"><i>${file.endsWith('/') ? '▾' : '◇'}</i><b>${escapeHtml(file)}</b></div>`).join('')}
        </aside>
        <section class="skill-editor">
          <div class="editor-tabs"><span class="active">SKILL.md</span><span>verification</span></div>
          <pre>${steps.map((step, index) => `<span data-scene-item="${index}"><i>${String(index + 1).padStart(2, '0')}</i><code>${escapeHtml(`${step.label}: ${step.title}`)}</code></span>`).join('')}</pre>
          <div class="diff-strip"><b>validated</b><span>trigger · boundary · output · check</span><em data-scene-metric="checks">0 / ${steps.length}</em></div>
        </section>
        <aside class="skill-test">
          <span>CALL TEST</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div><small>explicit call</small><b>pass</b></div>
          <div><small>implicit call</small><b data-scene-status>READY</b></div>
          <div><small>out of scope</small><b>blocked</b></div>
        </aside>
      </div>`);
  }

  function renderPlugin(context, steps) {
    return windowFrame(context, 'EXTENSION INTEGRATION BUS', `
      <div class="expert-scene plugin-bus">
        <section class="plugin-lanes">
          ${steps.map((step, index) => `
            <article data-scene-item="${index}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <span>${escapeHtml(step.label)}</span>
              <b>${escapeHtml(step.title)}</b>
              <small>${escapeHtml(step.detail)}</small>
            </article>`).join('')}
          <div class="plugin-transfer"><i data-scene-beam></i><span data-scene-packet></span></div>
        </section>
        <aside class="plugin-inspector">
          <span>INSTALL CONTRACT</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <table>
            <tbody>
              <tr><th>Secrets</th><td>env only</td></tr>
              <tr><th>MCP</th><td>least privilege</td></tr>
              <tr><th>Hooks</th><td>policy gate</td></tr>
              <tr><th>Status</th><td data-scene-status>READY</td></tr>
            </tbody>
          </table>
        </aside>
      </div>`);
  }

  function renderConnected(context, steps) {
    return windowFrame(context, 'CONNECTED QA STUDIO', `
      <div class="expert-scene connected-studio">
        <aside class="tool-router">
          <span>ROUTE SELECTOR</span>
          ${['Public Web', 'Official API', 'Connector', 'MCP', 'Browser QA', 'Evidence'].map((label, index) => `
            <div data-scene-item="${Math.min(index, steps.length - 1)}"><i>${String(index + 1).padStart(2, '0')}</i><b>${escapeHtml(label)}</b></div>`).join('')}
        </aside>
        <section class="connected-browser">
          <div class="browser-toolbar"><div><i></i><i></i><i></i></div><span>https://service.local/qa</span><em data-scene-status>READY</em></div>
          <div class="qa-canvas">
            <span>VISUAL QA</span>
            <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
            <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
            <div class="qa-grid"><i></i><i></i><i></i><i></i></div>
          </div>
        </section>
        <aside class="evidence-panel">
          <span>EVIDENCE</span>
          ${steps.map((step, index) => `<div data-scene-log="${index}"><i></i><span>${escapeHtml(step.label)} · ${escapeHtml(step.title)}</span></div>`).join('')}
        </aside>
      </div>`);
  }

  function renderBoard(context, steps) {
    return windowFrame(context, 'PRODUCT DECISION BOARD', `
      <div class="board-scene">
        <header class="board-metrics">
          <div><small>FOCUS</small><b data-scene-title>${escapeHtml(steps[0].label)}</b></div>
          <div><small>EVIDENCE</small><b data-scene-metric="files">0</b></div>
          <div><small>DECISIONS</small><b data-scene-metric="checks">0 / ${steps.length}</b></div>
          <div><small>STATUS</small><b data-scene-status>READY</b></div>
        </header>
        <div class="board-columns">
          ${steps.map((step, index) => `
            <section data-scene-item="${index}">
              <header><span>${String(index + 1).padStart(2, '0')}</span><b>${escapeHtml(step.label)}</b></header>
              <article><small>${escapeHtml(step.title)}</small><p>${escapeHtml(step.detail)}</p><div><i></i>${index % 2 ? 'REVIEWER' : 'OWNER'}</div></article>
            </section>`).join('')}
        </div>
        <footer class="board-timeline"><i data-scene-beam></i><span data-scene-packet></span></footer>
      </div>`);
  }

  function renderShowcase(context, steps) {
    return windowFrame(context, 'SHOWCASE STAGE', `
      <div class="showcase-scene">
        <section class="showcase-screen">
          <div class="showcase-frame">
            <span>PROJECT LIVE</span>
            <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
            <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          </div>
          <div class="showcase-lights"><i></i><i></i><i></i></div>
        </section>
        <aside class="showcase-run">
          <span>RUN OF SHOW</span>
          ${steps.map((step, index) => `<div data-scene-item="${index}"><i>${String(index + 1).padStart(2, '0')}</i><span><b>${escapeHtml(step.label)}</b><small>${escapeHtml(step.title)}</small></span></div>`).join('')}
        </aside>
      </div>`);
  }

  function renderLandscape(context, steps) {
    return windowFrame(context, 'AI CAPABILITY LANDSCAPE', `
      <div class="landscape-scene">
        <section class="landscape-output">
          <div class="output-canvas">
            <span>GENERATED OUTPUT</span>
            <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
            <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
            <div class="output-bars"><i></i><i></i><i></i><i></i></div>
          </div>
        </section>
        <div class="model-grid">
          ${steps.map((step, index) => `<article data-scene-item="${index}"><i>${String(index + 1).padStart(2, '0')}</i><span><b>${escapeHtml(step.label)}</b><small>${escapeHtml(step.title)}</small></span></article>`).join('')}
        </div>
      </div>`);
  }

  function flowItems(items = []) {
    return items.map((item, index) => `
      <div data-scene-log="${index}">
        <i></i>
        <span>${escapeHtml(item)}</span>
      </div>`).join('');
  }

  function renderWorkflowLogRoom(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const commands = ['pwd && ls', 'npm run dev', 'read first error', 'git diff --stat', 'git status'];
    return windowFrame(context, 'LOG ANALYSIS ROOM', `
      <div class="workflow-pro-scene workflow-log-room">
        <aside class="wf-step-rail">
          <span>RUNBOOK</span>
          ${steps.map((step, index) => `
            <button type="button" data-scene-item="${index}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(step.label)}</b>
              <small>${escapeHtml(commands[index] || step.title)}</small>
            </button>`).join('')}
        </aside>
        <section class="wf-log-terminal">
          <header>
            <span>~/workflow-lab</span>
            <b data-scene-title>${escapeHtml(steps[0].title)}</b>
            <em data-scene-status>READY</em>
          </header>
          <div class="wf-log-lines">
            ${steps.map((step, index) => `
              <article data-scene-item="${index}" class="${index === 2 ? 'is-error' : ''}">
                <code>${escapeHtml(commands[index] || step.label)}</code>
                <strong>${escapeHtml(step.title)}</strong>
                <small>${escapeHtml(step.detail)}</small>
              </article>`).join('')}
          </div>
          <div class="wf-error-dock">
            <span>FAILURE DRILL</span>
            <code>${escapeHtml(error.trace || 'EADDRINUSE :3000')}</code>
            <p>${escapeHtml(error.symptom || '개발 서버가 이미 사용 중인 포트로 실패')}</p>
          </div>
        </section>
        <aside class="wf-flow-panel">
          <section>
            <span>NORMAL</span>
            ${flowItems(scene.normalFlow || [])}
          </section>
          <section class="danger">
            <span>FAIL</span>
            ${flowItems(scene.failureFlow || [])}
          </section>
          <section class="success">
            <span>RECOVER</span>
            ${flowItems(scene.recoveryFlow || [error.fix || '복구 절차 기록'])}
          </section>
        </aside>
      </div>`);
  }

  function renderWorkflowContextBoard(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    return windowFrame(context, 'CONTEXT DESIGN BOARD', `
      <div class="workflow-pro-scene context-design-room">
        <aside class="context-intake">
          <span>INPUT FILTER</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="context-warning">
            <small>FAILURE</small>
            <code>${escapeHtml(error.trace || 'stale context selected')}</code>
            <b>${escapeHtml(error.cause || '범위와 유효기간 없는 메모리')}</b>
          </div>
        </aside>
        <section class="context-design-board">
          <div class="context-lane current-context">
            <span>CURRENT CONTEXT</span>
            ${steps.slice(0, 2).map((step, index) => `<article data-scene-item="${index}"><b>${escapeHtml(step.label)}</b><small>${escapeHtml(step.title)}</small></article>`).join('')}
          </div>
          <div class="context-lane standing-rules">
            <span>STANDING INSTRUCTION</span>
            ${steps.slice(2, 4).map((step, index) => `<article data-scene-item="${index + 2}"><b>${escapeHtml(step.label)}</b><small>${escapeHtml(step.title)}</small></article>`).join('')}
          </div>
          <div class="context-lane memory-store">
            <span>VERIFIED MEMORY</span>
            ${steps.slice(4).map((step, index) => `<article data-scene-item="${index + 4}"><b>${escapeHtml(step.label)}</b><small>${escapeHtml(step.title)}</small></article>`).join('')}
          </div>
          <div class="context-link-beam" data-scene-beam></div>
        </section>
        <aside class="wf-flow-panel">
          <section>
            <span>NORMAL</span>
            ${flowItems(scene.normalFlow || [])}
          </section>
          <section class="danger">
            <span>FAIL</span>
            ${flowItems(scene.failureFlow || [])}
          </section>
          <section class="success">
            <span>RECOVER</span>
            ${flowItems(scene.recoveryFlow || [error.fix || '메모리 폐기 규칙 추가'])}
          </section>
        </aside>
      </div>`);
  }

  function renderWorkflowMcpMesh(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const nodes = [
      ['HOST', 'AI App', '의도·승인 화면'],
      ['CLIENT', 'MCP Client', '세션·요청 형식'],
      ['SERVER', 'MCP Server', 'Tool·Resource·Prompt'],
      ['AUTH', 'Token Vault', '인증·만료'],
      ['APPROVAL', 'Human Gate', '쓰기 전 승인'],
      ['AUDIT', 'Audit Log', '호출·입력 기록'],
    ];
    return windowFrame(context, 'MCP PERMISSION MESH', `
      <div class="workflow-pro-scene mcp-permission-mesh">
        <section class="mcp-mesh-map">
          <div class="mesh-grid"></div>
          <div class="mesh-transfer"><i data-scene-beam></i><span data-scene-packet></span></div>
          ${nodes.map(([label, title, copy], index) => `
            <article class="mesh-node mesh-node-${index + 1}" data-scene-item="${Math.min(index, steps.length - 1)}">
              <i>${escapeHtml(label)}</i>
              <b>${escapeHtml(title)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="mesh-label label-resource">resources</div>
          <div class="mesh-label label-tool">tools</div>
          <div class="mesh-label label-prompt">prompts</div>
        </section>
        <aside class="mesh-permission-panel">
          <span>PERMISSION REVIEW</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="scope-diff danger"><small>BROKEN</small><code>${escapeHtml(error.trace || 'write scope: /**')}</code></div>
          <div class="scope-diff success"><small>FIX</small><code>allow: ./customer-a/** · dry-run · approve</code></div>
          <div class="primitive-grid">
            <b>Tools</b><b>Resources</b><b>Prompts</b><b>Sampling</b>
          </div>
          <section class="success">
            <span>RECOVER</span>
            ${flowItems(scene.recoveryFlow || [error.fix || '최소 권한 적용'])}
          </section>
        </aside>
      </div>`);
  }

  function renderWorkflowAgentRoom(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const agents = [
      ['Lead', 'Human Owner', '최종 결정'],
      ['Planner', 'Task Split', '작업 분해'],
      ['Builder', 'Implementation', '변경 생성'],
      ['Reviewer', 'Quality Gate', '검토·평가'],
      ['Integrator', 'Merge Owner', '충돌 통합'],
      ['Fallback', 'Recovery', '격리·인계'],
    ];
    return windowFrame(context, 'AGENT CONTROL ROOM', `
      <div class="workflow-pro-scene agent-ops-room">
        <aside class="agent-mission">
          <span>MISSION CONTRACT</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="agent-budget"><small>BUDGET</small><b>limited</b></div>
          <div class="agent-budget"><small>RETRY</small><b>max 2</b></div>
          <div class="agent-budget"><small>HUMAN</small><b>required</b></div>
        </aside>
        <section class="agent-ops-map">
          <div class="agent-command-core"><span>${escapeHtml(context.course.code)}</span><b>CONTROL</b><em data-scene-status>READY</em></div>
          ${agents.map(([role, title, copy], index) => `
            <article class="ops-agent ops-agent-${index + 1}" data-scene-item="${Math.min(index, steps.length - 1)}">
              <i>${escapeHtml(role)}</i>
              <b>${escapeHtml(title)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="agent-review-gate">
            <span>REVIEW GATE</span>
            <code>${escapeHtml(error.trace || 'merge conflict / owner duplicated')}</code>
          </div>
          <div class="agent-ops-beam" data-scene-beam></div>
        </section>
        <aside class="wf-flow-panel agent-flow">
          <section>
            <span>NORMAL</span>
            ${flowItems(scene.normalFlow || [])}
          </section>
          <section class="danger">
            <span>FAIL</span>
            ${flowItems(scene.failureFlow || [])}
          </section>
          <section class="success">
            <span>RECOVER</span>
            ${flowItems(scene.recoveryFlow || [error.fix || '통합 Owner에게 인계'])}
          </section>
        </aside>
      </div>`);
  }

  function claudeStepRail(steps, title = 'RUNBOOK') {
    return `
      <aside class="claude-rail">
        <span>${escapeHtml(title)}</span>
        ${steps.map((step, index) => `
          <button type="button" data-scene-item="${index}">
            <i>${String(index + 1).padStart(2, '0')}</i>
            <b>${escapeHtml(step.label)}</b>
            <small>${escapeHtml(step.title)}</small>
          </button>`).join('')}
      </aside>`;
  }

  function claudeFlowPanel(scene, error, title = 'OPERATING FLOW') {
    return `
      <aside class="claude-flow-panel">
        <span>${escapeHtml(title)}</span>
        <section>
          <b>NORMAL</b>
          ${flowItems(scene.normalFlow || [])}
        </section>
        <section class="danger">
          <b>FAIL TRACE</b>
          <code>${escapeHtml(error.trace || scene.failureFlow?.[0] || 'failure trace')}</code>
          ${flowItems((scene.failureFlow || []).slice(1))}
        </section>
        <section class="success">
          <b>RECOVER</b>
          ${flowItems(scene.recoveryFlow || [error.fix || '복구 절차를 고정합니다.'])}
        </section>
      </aside>`;
  }

  function renderClaudeTerminalSession(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const terminalLines = ['pwd', 'git rev-parse --show-toplevel', 'rg "start|dev" package.json', 'claude --permission-mode ask', 'git diff --stat', 'npm run check'];
    return windowFrame(context, 'CLAUDE TERMINAL SESSION', `
      <div class="claude-pro-scene claude-terminal-session">
        ${claudeStepRail(steps, 'SESSION START')}
        <section class="claude-terminal-main">
          <header>
            <span>cwd</span>
            <b>~/vibe-studio</b>
            <em data-scene-status>READY</em>
          </header>
          <div class="claude-terminal-stack">
            ${steps.map((step, index) => `
              <article data-scene-item="${index}" class="${index === 0 ? 'is-warning' : ''}">
                <code>$ ${escapeHtml(terminalLines[index] || step.label.toLowerCase())}</code>
                <b>${escapeHtml(step.title)}</b>
                <small>${escapeHtml(step.detail)}</small>
              </article>`).join('')}
          </div>
          <div class="claude-root-map">
            <span>PROJECT MAP</span>
            <div data-scene-item="0"><i></i><b>user home</b><small>wrong start</small></div>
            <div data-scene-item="1"><i></i><b>repo root</b><small>safe scope</small></div>
            <div data-scene-item="2"><i></i><b>src / package</b><small>read first</small></div>
            <div data-scene-item="5"><i></i><b>verified diff</b><small>handoff ready</small></div>
          </div>
        </section>
        ${claudeFlowPanel(scene, error, 'TRACE CONTROL')}
      </div>`);
  }

  function renderClaudeMdHierarchy(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const files = [
      ['root', 'CLAUDE.md', '공통 원칙 · 검증 명령'],
      ['app', 'app/CLAUDE.md', '프론트엔드 규칙'],
      ['api', 'api/CLAUDE.md', '서버·DB 규칙'],
      ['docs', 'docs/CLAUDE.md', '문서 작성 규칙'],
    ];
    return windowFrame(context, 'CLAUDE.md HIERARCHY', `
      <div class="claude-pro-scene claude-md-hierarchy">
        <section class="claude-md-tree">
          <span>INSTRUCTION SCOPE</span>
          ${files.map(([key, file, copy], index) => `
            <article class="md-node md-node-${key}" data-scene-item="${Math.min(index + 1, steps.length - 1)}">
              <i>${escapeHtml(key)}</i>
              <b>${escapeHtml(file)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="md-conflict-card">
            <span>CONFLICT</span>
            <code>${escapeHtml(error.trace || 'root says npm / nested says pnpm')}</code>
          </div>
          <div class="md-scope-beam" data-scene-beam></div>
        </section>
        <section class="claude-md-editor">
          <header><b data-scene-title>${escapeHtml(steps[0].title)}</b><em data-scene-status>READY</em></header>
          <pre>
${steps.map((step, index) => `<span data-scene-item="${index}"><i>${String(index + 1).padStart(2, '0')}</i><code>${escapeHtml(step.detail)}</code></span>`).join('')}
          </pre>
        </section>
        ${claudeFlowPanel(scene, error, 'RULE DIFF')}
      </div>`);
  }

  function renderClaudeSkillBoundary(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const tests = ['정상 요청', '경계 요청', '관련 없는 요청', '자료 로드', '버전 기록'];
    return windowFrame(context, 'SKILL.md STUDIO', `
      <div class="claude-pro-scene claude-skill-boundary">
        ${claudeStepRail(steps, 'SKILL BUILD')}
        <section class="skill-workbench">
          <div class="skill-card-main">
            <span>SKILL.md</span>
            <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
            <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
            <div class="skill-trigger-box">
              <b>Trigger</b>
              <code>when: focused task + clear artifact</code>
              <code>not when: broad coding help</code>
            </div>
          </div>
          <div class="skill-test-grid">
            ${tests.map((test, index) => `
              <article data-scene-item="${Math.min(index, steps.length - 1)}" class="${index === 2 ? 'danger' : ''}">
                <i>${String(index + 1).padStart(2, '0')}</i>
                <b>${escapeHtml(test)}</b>
                <small>${index === 2 ? escapeHtml(error.trace || 'description matched broad term') : escapeHtml(steps[Math.min(index, steps.length - 1)].label)}</small>
              </article>`).join('')}
          </div>
        </section>
        ${claudeFlowPanel(scene, error, 'BOUNDARY TEST')}
      </div>`);
  }

  function renderClaudePluginFlow(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const nodes = [
      ['Skill', '작업 표준'],
      ['Plugin', '설치 단위'],
      ['MCP', '외부 Tool'],
      ['Hook', '정책 이벤트'],
      ['Env', 'Token 검사'],
      ['Audit', '호출 기록'],
    ];
    return windowFrame(context, 'PLUGIN · MCP · HOOKS', `
      <div class="claude-pro-scene claude-plugin-flow">
        <section class="plugin-event-map">
          <div class="plugin-grid-bg"></div>
          <div class="plugin-transfer"><i data-scene-beam></i><span data-scene-packet></span></div>
          ${nodes.map(([label, copy], index) => `
            <article class="plugin-node plugin-node-${index + 1}" data-scene-item="${index}">
              <i>${escapeHtml(label)}</i>
              <b>${escapeHtml(copy)}</b>
              <small>${escapeHtml(steps[index]?.title || label)}</small>
            </article>`).join('')}
          <div class="plugin-env-alert">
            <span>MISSING ENV</span>
            <code>${escapeHtml(error.trace || 'missing env CLAUDE_SERVICE_TOKEN')}</code>
          </div>
        </section>
        <aside class="plugin-inspector">
          <span>EVENT INSPECTOR</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="hook-policy success"><small>before tool</small><b>secret check · approval</b></div>
          <div class="hook-policy"><small>after tool</small><b>audit log · diagnostics</b></div>
          ${claudeFlowPanel(scene, error, 'RECOVERY').replace('claude-flow-panel', 'claude-flow-panel compact')}
        </aside>
      </div>`);
  }

  function renderClaudeTeamGate(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const agents = [
      ['Lead', '공통 목표'],
      ['Explorer', '탐색·근거'],
      ['Builder', '구현 변경'],
      ['Tester', '검증 로그'],
      ['Reviewer', '전제 비교'],
      ['Integrator', '최종 병합'],
    ];
    return windowFrame(context, 'SUBAGENT REVIEW GATE', `
      <div class="claude-pro-scene claude-team-gate">
        <section class="team-contract-board">
          <span>CONTRACT</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="contract-schema">
            <b>return</b>
            <code>{ conclusion, diff, evidence, risk }</code>
          </div>
          <div class="contract-mismatch">
            <span>FAIL</span>
            <code>${escapeHtml(error.trace || 'contract mismatch')}</code>
          </div>
        </section>
        <section class="team-agent-map">
          <div class="team-core"><b>REVIEW</b><em data-scene-status>READY</em></div>
          ${agents.map(([role, copy], index) => `
            <article class="team-agent team-agent-${index + 1}" data-scene-item="${index}">
              <i>${escapeHtml(role)}</i>
              <b>${escapeHtml(steps[index]?.label || role)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="team-gate-line" data-scene-beam></div>
        </section>
        ${claudeFlowPanel(scene, error, 'REVIEW ROUTE')}
      </div>`);
  }

  function renderClaudeReleaseHandoff(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const columns = ['task', 'branch', 'test', 'pr', 'deploy', 'handoff'];
    return windowFrame(context, 'PR AUTOMATION PIPELINE', `
      <div class="claude-pro-scene claude-release-handoff">
        <section class="release-pr-board">
          <header>
            <span>release/claude-workspace</span>
            <b data-scene-title>${escapeHtml(steps[0].title)}</b>
            <em data-scene-status>READY</em>
          </header>
          <div class="release-columns">
            ${columns.map((column, index) => `
              <article data-scene-item="${index}">
                <i>${escapeHtml(column)}</i>
                <b>${escapeHtml(steps[index]?.title || column)}</b>
                <small>${escapeHtml(steps[index]?.detail || '')}</small>
              </article>`).join('')}
          </div>
          <div class="release-handoff-note">
            <span>HANDOFF TEMPLATE</span>
            <code>${escapeHtml(error.trace || 'handoff missing context')}</code>
            <b>goal · decisions · verification · risks · next action</b>
          </div>
        </section>
        ${claudeFlowPanel(scene, error, 'PIPELINE CHECK')}
      </div>`);
  }

  function codexFlowPanel(scene, error, title = 'VERIFICATION FLOW') {
    return `
      <aside class="codex-flow-panel">
        <span>${escapeHtml(title)}</span>
        <section>
          <b>NORMAL</b>
          ${flowItems(scene.normalFlow || [])}
        </section>
        <section class="danger">
          <b>FAIL TRACE</b>
          <code>${escapeHtml(error.trace || scene.failureFlow?.[0] || 'failure trace')}</code>
          ${flowItems((scene.failureFlow || []).slice(1))}
        </section>
        <section class="success">
          <b>RECOVER</b>
          ${flowItems(scene.recoveryFlow || [error.fix || '복구 절차를 고정합니다.'])}
        </section>
      </aside>`;
  }

  function renderCodexWorkspaceBoundary(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const surfaces = [
      ['App', '계획·리뷰·장기 작업'],
      ['CLI', '빠른 터미널 실행'],
      ['IDE', '파일 맥락과 diff'],
      ['Browser', '시각 QA와 클릭'],
    ];
    return windowFrame(context, 'SURFACE ROUTER · WORKSPACE', `
      <div class="codex-pro-scene codex-workspace-boundary">
        <section class="codex-surface-board">
          <span>4 SURFACES</span>
          <div class="surface-grid">
            ${surfaces.map(([name, copy], index) => `
              <article data-scene-item="${index}">
                <i>${escapeHtml(name)}</i>
                <b>${escapeHtml(copy)}</b>
                <small>${escapeHtml(steps[index]?.title || name)}</small>
              </article>`).join('')}
          </div>
          <div class="workspace-boundary-map">
            <div class="workspace-safe" data-scene-item="1"><b>workspace</b><small>D:/vibe-coding-basic-app</small></div>
            <div class="workspace-blocked" data-scene-item="0"><b>blocked</b><code>${escapeHtml(error.trace || 'path outside writable workspace')}</code></div>
            <div class="workspace-beam" data-scene-beam></div>
          </div>
        </section>
        <section class="codex-main-console">
          <header><b data-scene-title>${escapeHtml(steps[0].title)}</b><em data-scene-status>READY</em></header>
          <pre>
${steps.map((step, index) => `<span data-scene-item="${index}"><i>${escapeHtml(step.label)}</i><code>${escapeHtml(step.detail)}</code></span>`).join('')}
          </pre>
        </section>
        ${codexFlowPanel(scene, error, 'BOUNDARY CHECK')}
      </div>`);
  }

  function renderCodexAgentsConfigLab(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const layers = [
      ['global', 'AGENTS.md', '개인 공통 기대'],
      ['project', 'AGENTS.md', '저장소 규칙'],
      ['config', 'config.toml', '모델·권한·MCP'],
      ['rules', 'Rules', '허용·차단 정책'],
      ['git', 'Git diff', '검증 기록'],
    ];
    return windowFrame(context, 'AGENTS.md · CONFIG TRUST LAB', `
      <div class="codex-pro-scene codex-agents-config-lab">
        <section class="config-layer-stack">
          <span>TRUST LAYERS</span>
          ${layers.map(([key, title, copy], index) => `
            <article class="config-layer config-${key}" data-scene-item="${Math.min(index + 1, steps.length - 1)}">
              <i>${escapeHtml(key)}</i>
              <b>${escapeHtml(title)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="trust-alert">
            <span>UNTRUSTED</span>
            <code>${escapeHtml(error.trace || 'project layer ignored: untrusted')}</code>
          </div>
          <div class="trust-beam" data-scene-beam></div>
        </section>
        <section class="config-policy-editor">
          <header><b data-scene-title>${escapeHtml(steps[0].title)}</b><em data-scene-status>READY</em></header>
          <div class="policy-lines">
            ${steps.map((step, index) => `
              <article data-scene-item="${index}">
                <i>${String(index + 1).padStart(2, '0')}</i>
                <b>${escapeHtml(step.label)}</b>
                <small>${escapeHtml(step.detail)}</small>
              </article>`).join('')}
          </div>
        </section>
        ${codexFlowPanel(scene, error, 'POLICY ROUTE')}
      </div>`);
  }

  function renderCodexPluginCacheStudio(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const stations = ['WORKFLOW', 'SKILL.md', 'TEST', 'plugin.json', 'INSTALL', 'CACHE'];
    return windowFrame(context, 'SKILL · PLUGIN CACHE STUDIO', `
      <div class="codex-pro-scene codex-plugin-cache-studio">
        <section class="plugin-package-line">
          <div class="package-track"><i data-scene-beam></i><span data-scene-packet></span></div>
          ${stations.map((station, index) => `
            <article class="package-station package-station-${index + 1}" data-scene-item="${index}">
              <i>${escapeHtml(station)}</i>
              <b>${escapeHtml(steps[index]?.title || station)}</b>
              <small>${escapeHtml(steps[index]?.label || '')}</small>
            </article>`).join('')}
          <div class="cache-warning">
            <span>CACHE</span>
            <code>${escapeHtml(error.trace || 'manifest cache unchanged')}</code>
          </div>
        </section>
        <aside class="manifest-inspector">
          <span>MANIFEST INSPECTOR</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="manifest-json">
            <code>{ "name": "codex-workflow",</code>
            <code>  "version": "0.1.1",</code>
            <code>  "skills": ["review-pack"] }</code>
          </div>
          ${codexFlowPanel(scene, error, 'UPDATE CHECK').replace('codex-flow-panel', 'codex-flow-panel compact')}
        </aside>
      </div>`);
  }

  function renderCodexConnectedBrowserQa(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const nodes = [
      ['Need', '데이터·행동 분류'],
      ['API', '공식 구조화 호출'],
      ['Connector', '인증 데이터'],
      ['MCP', 'Tool 권한'],
      ['Browser', '실제 화면'],
      ['Evidence', '캡처·로그'],
    ];
    return windowFrame(context, 'CONNECTORS · BROWSER QA', `
      <div class="codex-pro-scene codex-connected-browser-qa">
        <section class="connected-permission-mesh">
          <div class="connected-bg"></div>
          <div class="connected-beam"><i data-scene-beam></i><span data-scene-packet></span></div>
          ${nodes.map(([label, copy], index) => `
            <article class="connected-node connected-node-${index + 1}" data-scene-item="${index}">
              <i>${escapeHtml(label)}</i>
              <b>${escapeHtml(copy)}</b>
              <small>${escapeHtml(steps[index]?.title || label)}</small>
            </article>`).join('')}
        </section>
        <section class="browser-qa-frame">
          <header><b>viewport 1366x768</b><em data-scene-status>READY</em></header>
          <div class="qa-browser-canvas">
            <nav><span></span><b>Checkout Preview</b><small>DOM OK</small></nav>
            <main>
              <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
              <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
              <button data-scene-item="4">주문하기</button>
              <div class="viewport-clipped" data-scene-item="4"><code>${escapeHtml(error.trace || 'DOM present / viewport clipped')}</code></div>
            </main>
          </div>
        </section>
        ${codexFlowPanel(scene, error, 'QA EVIDENCE')}
      </div>`);
  }

  function renderCodexWorktreeGate(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const worktrees = [
      ['main', '통합 기준'],
      ['ui', '화면 변경'],
      ['test', '검증 코드'],
      ['review', '리뷰 증거'],
      ['qa', '스크린샷 회귀'],
      ['merge', '최종 병합'],
    ];
    return windowFrame(context, 'WORKTREE INTEGRATION GATE', `
      <div class="codex-pro-scene codex-worktree-gate">
        <section class="worktree-control">
          <span>INTEGRATION CONTRACT</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="regression-alert">
            <span>FAIL</span>
            <code>${escapeHtml(error.trace || 'integration regression')}</code>
          </div>
          <div class="return-contract"><b>return</b><code>diff · evidence · risk · screenshot</code></div>
        </section>
        <section class="worktree-map">
          <div class="worktree-main-node"><b>MAIN</b><em data-scene-status>READY</em></div>
          ${worktrees.map(([label, copy], index) => `
            <article class="worktree-node worktree-node-${index + 1}" data-scene-item="${index}">
              <i>${escapeHtml(label)}</i>
              <b>${escapeHtml(steps[index]?.label || label)}</b>
              <small>${escapeHtml(copy)}</small>
            </article>`).join('')}
          <div class="worktree-beam" data-scene-beam></div>
        </section>
        ${codexFlowPanel(scene, error, 'REGRESSION QA')}
      </div>`);
  }

  function renderCodexReleaseVersionPipeline(context, steps) {
    const error = context.lesson.error || {};
    const scene = context.scene || {};
    const checks = ['hook', 'automation', 'ci', 'pr', 'tag', 'release'];
    return windowFrame(context, 'GITHUB ACTIONS RELEASE CHECK', `
      <div class="codex-pro-scene codex-release-version">
        <section class="release-version-board">
          <header>
            <span>release.yml</span>
            <b data-scene-title>${escapeHtml(steps[0].title)}</b>
            <em data-scene-status>READY</em>
          </header>
          <div class="version-checks">
            ${checks.map((check, index) => `
              <article data-scene-item="${index}">
                <i>${escapeHtml(check)}</i>
                <b>${escapeHtml(steps[index]?.title || check)}</b>
                <small>${escapeHtml(steps[index]?.detail || '')}</small>
              </article>`).join('')}
          </div>
          <div class="version-mismatch">
            <span>VERSION GATE</span>
            <code>${escapeHtml(error.trace || 'tag v3 / package 2.0.0')}</code>
            <b>if tag != package.version: fail</b>
          </div>
        </section>
        ${codexFlowPanel(scene, error, 'RELEASE SAFETY')}
      </div>`);
  }

  function renderSurfaceCompare(context, steps) {
    const surfaces = [
      ['Claude CLI', '저장소 탐색 · diff 설명', '$ claude', 'context / plan / diff'],
      ['Codex CLI/App', 'sandbox · 승인 · QA', '$ codex', 'approval / run / screenshot'],
      ['IDE/App', '코드와 실제 화면', 'Preview', 'visual / click / viewport'],
    ];
    const axes = ['탐색', '대량수정', '시각QA', '릴리즈'];
    return windowFrame(context, 'SURFACE COMPARE MATRIX', `
      <div class="advanced-surface-scene">
        <aside class="surface-brief">
          <span>SURFACE STRATEGY</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="surface-evidence">
            <b>evidence required</b>
            <code>diff · log · screenshot · release record</code>
          </div>
        </aside>
        <section class="surface-panels">
          ${surfaces.map(([title, copy, prompt, evidence], index) => `
            <article class="surface-panel surface-panel-${index + 1}" data-scene-item="${Math.min(index + 1, steps.length - 1)}">
              <header><span>${escapeHtml(title)}</span><em>${index === 0 ? 'repo' : index === 1 ? 'qa' : 'visual'}</em></header>
              <div class="surface-console">
                <code>${escapeHtml(prompt)}</code>
                <b>${escapeHtml(copy)}</b>
                <small>${escapeHtml(evidence)}</small>
              </div>
            </article>`).join('')}
          <div class="surface-decision" data-scene-item="${steps.length - 1}">
            <span>DECISION TABLE</span>
            <b>작업 → 위험도 → 필요한 증거 → 추천 표면</b>
          </div>
          <div class="surface-beam" data-scene-beam></div>
          <i class="surface-packet" data-scene-packet></i>
        </section>
        <aside class="surface-axis">
          <span>DECISION AXES</span>
          ${axes.map((axis, index) => `
            <div data-scene-item="${Math.min(index, steps.length - 1)}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(axis)}</b>
              <small>${escapeHtml(index === 0 ? 'context first' : index === 1 ? 'diff first' : index === 2 ? 'screenshot first' : 'release record first')}</small>
            </div>`).join('')}
          <div class="surface-status"><b data-scene-status>READY</b><small data-scene-metric="checks">0 / ${steps.length}</small></div>
        </aside>
      </div>`);
  }

  function renderContextMemory(context, steps) {
    const memoryBlocks = [
      ['시스템 지침', 'system rules'],
      ['도구·예시', 'tools / examples'],
      ['대화 이력', 'conversation'],
      ['메모리', 'scope · expiry · why'],
    ];
    const axes = ['적시 투입', 'context rot', '범위·유효기간·근거', '크로스툴 동기화'];
    return windowFrame(context, 'CONTEXT & MEMORY BOARD', `
      <div class="advanced-context-scene">
        <aside class="ctx-brief">
          <span>CONTEXT ENGINEERING</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="ctx-gauge">
            <b>context budget</b>
            <div class="ctx-gauge-track"><i data-scene-beam></i></div>
            <small>적게 · 적시에</small>
          </div>
        </aside>
        <section class="ctx-board">
          ${memoryBlocks.map(([title, meta], index) => `
            <article class="ctx-mem ctx-mem-${index + 1}" data-scene-item="${Math.min(index + 1, steps.length - 1)}">
              <span>${escapeHtml(title)}</span>
              <code>${escapeHtml(meta)}</code>
            </article>`).join('')}
          <div class="ctx-sync" data-scene-item="${steps.length - 1}">
            <b>CLAUDE.md</b><i class="ctx-link"></i><b>AGENTS.md</b>
            <small>same policy</small>
          </div>
          <div class="ctx-beam" data-scene-beam></div>
          <i class="ctx-packet" data-scene-packet></i>
        </section>
        <aside class="ctx-axis">
          <span>MEMORY POLICY</span>
          ${axes.map((axis, index) => `
            <div data-scene-item="${Math.min(index, steps.length - 1)}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(axis)}</b>
              <small>${escapeHtml(index === 0 ? 'just in time' : index === 1 ? 'token up, recall down' : index === 2 ? 'scope/expiry/why' : 'no drift')}</small>
            </div>`).join('')}
          <div class="ctx-status"><b data-scene-status>READY</b><small data-scene-metric="checks">0 / ${steps.length}</small></div>
        </aside>
      </div>`);
  }

  const advancedBoardConfigs = {
    's-03-skill': {
      frame: 'SKILL REUSE STUDIO', kicker: 'SKILL REUSE', gauge: 'reuse coverage', gaugeNote: '한 번 만들고 재사용',
      blocks: [['작업 신호', 'trigger / when'], ['절차', 'steps / checklist'], ['도구·예시', 'tools / examples'], ['공유 자산', 'SKILL.md ↔ Codex']],
      sync: ['Claude SKILL.md', 'Codex Skill', 'same asset'], axisTitle: 'REUSE AXES',
      axes: [['반복 신호', 'triggers'], ['점진적 공개', 'progressive'], ['버전·검증', 'versioned'], ['크로스툴 공유', 'portable']],
    },
    's-04-mcp': {
      frame: 'MCP GRANT MESH', kicker: 'MCP & GRANTS', gauge: 'least privilege', gaugeNote: '필요한 만큼만',
      blocks: [['연결 범위', 'servers / scope'], ['권한', 'read / write'], ['승인·감사', 'approval / log'], ['인젝션 방어', 'untrusted input']],
      sync: ['Claude MCP', 'Codex Connectors', 'same policy'], axisTitle: 'GRANT AXES',
      axes: [['최소 권한', 'least privilege'], ['승인 게이트', 'human approval'], ['감사 로그', 'audit trail'], ['외부=불신', 'injection guard']],
    },
    's-05-agent': {
      frame: 'PARALLEL AGENT ROOM', kicker: 'PARALLEL AGENTS', gauge: 'ownership map', gaugeNote: '소유권 겹침 방지',
      blocks: [['작업 분해', 'decompose'], ['소유권', 'owner / scope'], ['병렬 실행', 'subagent / worktree'], ['리뷰 게이트', 'merge gate']],
      sync: ['Claude Subagents', 'Codex Worktrees', 'no overlap'], axisTitle: 'PARALLEL AXES',
      axes: [['분해 기준', 'decompose'], ['소유권 분리', 'no duplicate owner'], ['비용 의식', 'token cost'], ['리뷰 병합', 'review gate']],
    },
    's-06-orchestration': {
      frame: 'ORCHESTRATION CONTROL', kicker: 'ORCHESTRATION', gauge: 'pipeline health', gaugeNote: '결정적 뼈대 + 에이전틱',
      blocks: [['트리거', 'event / cron'], ['단계', 'plan / build / verify'], ['핸드오프', 'context handoff'], ['정지·복구', 'stop / recover']],
      sync: ['Claude pipeline', 'Codex pipeline', 'one flow'], axisTitle: 'CONTROL AXES',
      axes: [['결정적 뼈대', 'deterministic'], ['에이전틱 보강', 'agentic where stuck'], ['정지 조건', 'stop conditions'], ['복구 경로', 'recovery']],
    },
    's-07-reliability': {
      frame: 'RELIABILITY LAB', kicker: 'EVAL & RELIABILITY', gauge: 'eval coverage', gaugeNote: '측정 가능한 신뢰성',
      blocks: [['평가 하니스', 'eval harness'], ['회귀 테스트', 'prompt/agent regression'], ['관측성', 'trace / metrics'], ['비용 거버넌스', 'budget / guard']],
      sync: ['Claude runs', 'Codex runs', 'same scorecard'], axisTitle: 'RELIABILITY AXES',
      axes: [['정량 평가', 'scored'], ['회귀 방지', 'regression'], ['추적 가능', 'observable'], ['예산 가드', 'cost guard']],
    },
    's-08-capstone': {
      frame: 'INTEGRATION CAPSTONE', kicker: 'CAPSTONE', gauge: 'release readiness', gaugeNote: '두 도구로 끝까지',
      blocks: [['도구 선택', 'surface by task'], ['크로스툴 빌드', 'claude + codex'], ['검증·리뷰', 'eval + review'], ['릴리즈', 'release + evidence']],
      sync: ['Claude', 'Codex', 'one product'], axisTitle: 'CAPSTONE AXES',
      axes: [['작업별 선택', 'S1 surface'], ['정책 공유', 'S2~S4 policy'], ['병렬·오케스트', 'S5~S6'], ['신뢰성·릴리즈', 'S7 + release']],
    },
  };

  function renderAdvancedBoard(context, steps) {
    const cfg = advancedBoardConfigs[context.scene.id] || {};
    const blocks = cfg.blocks || [];
    const axes = cfg.axes || [];
    const sync = cfg.sync || ['', '', ''];
    return windowFrame(context, cfg.frame || 'ADVANCED BOARD', `
      <div class="advanced-context-scene">
        <aside class="ctx-brief">
          <span>${escapeHtml(cfg.kicker || '')}</span>
          <h4 data-scene-title>${escapeHtml(steps[0].title)}</h4>
          <p data-scene-detail>${escapeHtml(steps[0].detail)}</p>
          <div class="ctx-gauge">
            <b>${escapeHtml(cfg.gauge || 'progress')}</b>
            <div class="ctx-gauge-track"><i data-scene-beam></i></div>
            <small>${escapeHtml(cfg.gaugeNote || '')}</small>
          </div>
        </aside>
        <section class="ctx-board">
          ${blocks.map(([title, meta], index) => `
            <article class="ctx-mem ctx-mem-${index + 1}" data-scene-item="${Math.min(index + 1, steps.length - 1)}">
              <span>${escapeHtml(title)}</span>
              <code>${escapeHtml(meta)}</code>
            </article>`).join('')}
          <div class="ctx-sync" data-scene-item="${steps.length - 1}">
            <b>${escapeHtml(sync[0])}</b><i class="ctx-link"></i><b>${escapeHtml(sync[1])}</b>
            <small>${escapeHtml(sync[2])}</small>
          </div>
          <div class="ctx-beam" data-scene-beam></div>
          <i class="ctx-packet" data-scene-packet></i>
        </section>
        <aside class="ctx-axis">
          <span>${escapeHtml(cfg.axisTitle || 'DECISION AXES')}</span>
          ${axes.map(([label, sub], index) => `
            <div data-scene-item="${Math.min(index, steps.length - 1)}">
              <i>${String(index + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(label)}</b>
              <small>${escapeHtml(sub)}</small>
            </div>`).join('')}
          <div class="ctx-status"><b data-scene-status>READY</b><small data-scene-metric="checks">0 / ${steps.length}</small></div>
        </aside>
      </div>`);
  }

  function metricPanel(steps) {
    return `
      <aside class="metric-panel">
        <span>LIVE STATE</span>
        <div><small>PROCESS</small><b data-scene-metric="process">IDLE</b></div>
        <div><small>FILES</small><b data-scene-metric="files">0</b></div>
        <div><small>CHECKS</small><b data-scene-metric="checks">0 / ${steps.length}</b></div>
      </aside>`;
  }

  const renderers = {
    workflow: renderWorkflow,
    protocol: renderProtocol,
    agent: renderAgent,
    skill: renderSkill,
    plugin: renderPlugin,
    connected: renderConnected,
    terminal: renderTerminal,
    ide: renderIde,
    browser: renderBrowser,
    pipeline: renderPipeline,
    architecture: renderArchitecture,
    board: renderBoard,
    showcase: renderShowcase,
    landscape: renderLandscape,
    advanced: renderSurfaceCompare,
  };

  const customRenderers = {
    'workflow-01-terminal': renderWorkflowLogRoom,
    'workflow-02-workflow': renderWorkflowContextBoard,
    'workflow-03-protocol': renderWorkflowMcpMesh,
    'workflow-04-agent': renderWorkflowAgentRoom,
    'claude-01-terminal': renderClaudeTerminalSession,
    'claude-02-ide': renderClaudeMdHierarchy,
    'claude-03-skill': renderClaudeSkillBoundary,
    'claude-04-plugin': renderClaudePluginFlow,
    'claude-05-team': renderClaudeTeamGate,
    'claude-06-release': renderClaudeReleaseHandoff,
    'codex-01-workspace': renderCodexWorkspaceBoundary,
    'codex-02-config': renderCodexAgentsConfigLab,
    'codex-03-plugin': renderCodexPluginCacheStudio,
    'codex-04-connected': renderCodexConnectedBrowserQa,
    'codex-05-team': renderCodexWorktreeGate,
    'codex-06-release': renderCodexReleaseVersionPipeline,
    's-01-surface': renderSurfaceCompare,
    's-02-context': renderContextMemory,
    's-03-skill': renderAdvancedBoard,
    's-04-mcp': renderAdvancedBoard,
    's-05-agent': renderAdvancedBoard,
    's-06-orchestration': renderAdvancedBoard,
    's-07-reliability': renderAdvancedBoard,
    's-08-capstone': renderAdvancedBoard,
    'op-01-principles': renderAdvancedBoard,
    'op-02-cli-tools': renderAdvancedBoard,
    'op-03-build': renderAdvancedBoard,
    'op-04-office': renderAdvancedBoard,
  };

  function update(host, context, index, paused = false) {
    const steps = getSteps(context);
    const safeIndex = Math.max(-1, Math.min(steps.length - 1, index));
    host.dataset.sceneStage = String(safeIndex);
    host.classList.toggle('is-paused', paused);
    host.querySelectorAll('[data-scene-item]').forEach((node) => {
      const itemIndex = Number(node.dataset.sceneItem);
      node.classList.toggle('active', safeIndex >= 0 && itemIndex <= safeIndex);
      node.classList.toggle('current', itemIndex === safeIndex);
    });
    host.querySelectorAll('[data-scene-log]').forEach((node) => {
      node.classList.toggle('active', Number(node.dataset.sceneLog) <= safeIndex);
    });
    const step = steps[Math.max(0, safeIndex)];
    host.querySelectorAll('[data-scene-title]').forEach((node) => { node.textContent = step.title; });
    host.querySelectorAll('[data-scene-detail]').forEach((node) => { node.textContent = step.detail; });
    host.querySelectorAll('[data-scene-status]').forEach((node) => {
      node.textContent = safeIndex < 0 ? 'READY' : paused ? 'PAUSED' : safeIndex === steps.length - 1 ? 'VERIFIED' : 'IN PROGRESS';
    });
    host.querySelectorAll('[data-scene-metric="checks"]').forEach((node) => { node.textContent = `${Math.max(0, safeIndex + 1)} / ${steps.length}`; });
    host.querySelectorAll('[data-scene-metric="files"]').forEach((node) => { node.textContent = String(Math.max(0, safeIndex + 1)); });
    host.querySelectorAll('[data-scene-metric="process"]').forEach((node) => { node.textContent = safeIndex < 0 ? 'IDLE' : paused ? 'PAUSED' : safeIndex === steps.length - 1 ? 'DONE' : 'RUNNING'; });
    host.querySelectorAll('[data-scene-toast]').forEach((node) => { node.textContent = safeIndex < 0 ? '요청을 시작하면 처리 상태가 표시됩니다.' : `${step.label}: ${step.title}`; });
    host.querySelectorAll('[data-scene-url]').forEach((node) => { node.textContent = safeIndex === steps.length - 1 ? 'https://vibe-studio.live' : 'not-deployed.local'; });
    host.querySelectorAll('[data-scene-beam]').forEach((node) => { node.style.setProperty('--scene-progress', `${safeIndex < 0 ? 0 : ((safeIndex + 1) / steps.length) * 100}%`); });
    host.querySelectorAll('[data-scene-packet]').forEach((node) => {
      node.style.setProperty('--scene-index', String(Math.max(0, safeIndex)));
      node.style.setProperty('--scene-count', String(Math.max(1, steps.length - 1)));
    });
  }

  function mount(host, context) {
    const scene = context.scene || { id: `${context.course.code}-${context.lessonIndex + 1}`, type: context.lesson.demo.type };
    const mountedContext = { ...context, scene };
    const family = familyFor(scene.type);
    const renderer = customRenderers[scene.id] || renderers[family];
    host.className = `scene-host scene-${family} scene-type-${scene.type} scene-id-${scene.id}`;
    host.dataset.sceneId = scene.id;
    host.innerHTML = renderer(mountedContext, getSteps(mountedContext));
    update(host, mountedContext, -1);
    return {
      start: () => update(host, mountedContext, 0),
      go: (index) => update(host, mountedContext, index),
      pause: (index, paused) => update(host, mountedContext, index, paused),
      reset: () => update(host, mountedContext, -1),
    };
  }

  window.VibeSceneRegistry = { mount, familyFor };
}());
