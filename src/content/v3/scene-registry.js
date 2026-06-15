'use strict';

(function registerVibeScenes() {
  const familyTypes = {
    terminal: ['terminal'],
    ide: ['ide', 'config', 'skill', 'plugin'],
    browser: ['workspace', 'request', 'browser', 'connected'],
    pipeline: ['deploy', 'build', 'release', 'launch'],
    architecture: ['workflow', 'protocol', 'agent'],
    board: ['team', 'scope', 'pricing', 'split', 'operations'],
    showcase: ['showcase'],
    landscape: ['ai-landscape'],
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
    terminal: renderTerminal,
    ide: renderIde,
    browser: renderBrowser,
    pipeline: renderPipeline,
    architecture: renderArchitecture,
    board: renderBoard,
    showcase: renderShowcase,
    landscape: renderLandscape,
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
    host.className = `scene-host scene-${family} scene-type-${scene.type}`;
    host.dataset.sceneId = scene.id;
    host.innerHTML = renderers[family](mountedContext, getSteps(mountedContext));
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
