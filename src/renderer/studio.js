'use strict';

const appApi = window.vibeCodingApp || {
  readManifest: async () => {
    const response = await fetch('../content/course-manifest.json');
    if (!response.ok) throw new Error(`Manifest HTTP ${response.status}`);
    return response.json();
  },
  getContentBase: async () => new URL('../content', location.href).href.replace(/\/$/, ''),
  toggleFullscreen: async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
    return Boolean(document.fullscreenElement);
  },
  savePdf: async () => ({ ok: false, canceled: true }),
  saveData: async () => true,
  loadData: async () => null,
  onShortcut: () => {},
};
const state = {
  manifest: null,
  contentBase: '',
  mode: localStorage.getItem('vibe-v3-mode') || 'student',
  courseId: localStorage.getItem('vibe-v3-course') || 'basic-current',
  tab: 'lessons',
  selectionId: null,
  completed: new Set(JSON.parse(localStorage.getItem('vibe-v3-completed') || '[]')),
  notes: JSON.parse(localStorage.getItem('vibe-v3-notes') || '{}'),
  schedule: JSON.parse(localStorage.getItem('vibe-v3-schedule') || '{}'),
  programNote: localStorage.getItem('vibe-v3-program-note') || '',
  commandIndex: 0,
  commandItems: [],
  playerSession: null,
  board: { active: false, drawing: false, color: '#ff5f72', size: 4, x: 0, y: 0 },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function persist(key, value) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  appApi?.saveData?.(key, value);
}

function getCourse(id = state.courseId) {
  return state.manifest.courses.find((course) => course.id === id);
}

function visibleCourses() {
  const allowed = new Set(state.manifest.modes[state.mode].show);
  return state.manifest.courses.filter((course) => allowed.has(course.visibility));
}

function setAccent(course) {
  document.documentElement.style.setProperty('--accent', course.color || '#d8ff66');
}

function renderCourseRail() {
  const courses = visibleCourses();
  if (!courses.some((course) => course.id === state.courseId)) {
    state.courseId = state.manifest.defaultCourseId;
  }

  $('#course-list').innerHTML = courses.map((course) => `
    <button class="course-button${course.id === state.courseId ? ' active' : ''}" type="button"
      data-course="${escapeHtml(course.id)}" style="--course-color:${escapeHtml(course.color)}">
      <span class="course-code">${escapeHtml(course.code)}</span>
      <span>
        <b>${escapeHtml(course.shortTitle)}</b>
        <small>${escapeHtml(course.curriculumVersion || `${course.sessions.length}회`)}</small>
      </span>
      <em class="${course.visibility === 'preview' ? 'preview-flag' : ''}">${course.visibility === 'preview' ? 'BETA' : String(course.sessions.length).padStart(2, '0')}</em>
    </button>
  `).join('');

  $$('#course-list [data-course]').forEach((button) => {
    button.addEventListener('click', () => selectCourse(button.dataset.course));
  });
}

function selectCourse(courseId, selectionId = null) {
  state.courseId = courseId;
  state.tab = 'lessons';
  state.selectionId = selectionId;
  persist('vibe-v3-course', courseId);
  renderStudio();
}

function renderStudio() {
  const course = getCourse();
  setAccent(course);
  renderCourseRail();
  $('#course-kicker').textContent = `${course.code} · ${course.track || course.family}`;
  $('#course-title').textContent = course.title;
  $('#course-route').textContent = course.route;
  $('#detail-course-code').textContent = course.code;
  $('#mode-label').textContent = state.mode === 'instructor' ? '강사 모드' : '학생 모드';
  $('#btn-mode').setAttribute('aria-pressed', String(state.mode === 'instructor'));
  $$('.instructor-only').forEach((node) => node.classList.toggle('hidden', state.mode !== 'instructor'));
  if (state.tab === 'instructor' && state.mode !== 'instructor') state.tab = 'lessons';
  $$('#course-tabs button').forEach((button) => button.classList.toggle('active', button.dataset.tab === state.tab));

  if (state.tab === 'lessons') renderLessons(course);
  else renderMaterials(course, state.tab);
}

function renderLessons(course) {
  const sessions = course.sessions || [];
  if (!state.selectionId || !sessions.some((session) => session.id === state.selectionId)) {
    const stored = localStorage.getItem(`vibe-v3-last-${course.id}`);
    state.selectionId = sessions.some((session) => session.id === stored) ? stored : sessions[sessions.length - 1]?.id;
  }

  $('#list-summary').textContent = `${sessions.length} LESSONS · ${course.status === 'active' ? 'CURRENT COHORT' : course.status.toUpperCase()}`;
  const moduleMap = new Map((course.modules || []).map((module) => [module.id, module.title]));
  let lastModule = null;
  const rows = [];
  sessions.forEach((session, index) => {
    if (session.moduleId !== lastModule) {
      rows.push(`<div class="module-label">${escapeHtml(moduleMap.get(session.moduleId) || session.moduleId || 'CURRICULUM')}</div>`);
      lastModule = session.moduleId;
    }
    rows.push(`
      <button class="lesson-row${session.id === state.selectionId ? ' active' : ''}${state.completed.has(session.id) ? ' complete' : ''}"
        type="button" data-session="${escapeHtml(session.id)}">
        <span class="lesson-no">${String(index + 1).padStart(2, '0')}</span>
        <span class="lesson-copy"><b>${escapeHtml(session.title.replace(/^\d+강\s*·\s*/, ''))}</b><span>${escapeHtml(session.subtitle || session.description)}</span></span>
        <span class="lesson-state">${state.completed.has(session.id) ? '✓' : '›'}</span>
      </button>
    `);
  });
  $('#lesson-list').innerHTML = rows.join('');
  $$('#lesson-list [data-session]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectionId = button.dataset.session;
      localStorage.setItem(`vibe-v3-last-${course.id}`, state.selectionId);
      renderLessons(course);
    });
  });
  renderLessonDetail(course, sessions.find((session) => session.id === state.selectionId));
}

function renderLessonDetail(course, session) {
  const index = course.sessions.findIndex((item) => item.id === session.id);
  $('#detail-position').textContent = `LESSON ${String(index + 1).padStart(2, '0')} / ${String(course.sessions.length).padStart(2, '0')}`;
  const preparation = session.preparation || ['개인 노트북', '현재 프로젝트'];
  const deliverables = session.deliverables || ['수업 실습 결과'];
  $('#detail-content').innerHTML = `
    <div class="detail-hero">
      <span class="detail-number">LESSON ${String(index + 1).padStart(2, '0')}</span>
      <h2>${escapeHtml(session.title.replace(/^\d+강\s*·\s*/, ''))}</h2>
      <p class="detail-subtitle">${escapeHtml(session.subtitle || '')}</p>
    </div>
    <div class="objective-box">
      <span>THIS LESSON</span>
      <p>${escapeHtml(session.description)}</p>
    </div>
    <div class="detail-grid">
      <section class="info-panel"><h3>준비물</h3><ul>${preparation.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
      <section class="info-panel"><h3>수업 결과물</h3><ul>${deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
    </div>
    <div class="lesson-actions">
      <button class="primary-action" id="btn-open-lesson" type="button">강의 실행</button>
      <button class="secondary-action" id="btn-toggle-complete" type="button">${state.completed.has(session.id) ? '완료 취소' : '완료로 표시'}</button>
    </div>
    <div class="detail-meta">
      <span>${escapeHtml(session.duration || '120분')}</span>
      <span>${escapeHtml(course.curriculumVersion || '')}</span>
      <span>${session.sourceKeys?.length || 0} OFFICIAL SOURCES</span>
    </div>
  `;
  $('#btn-open-lesson').addEventListener('click', () => openPlayer(course, session));
  $('#btn-toggle-complete').addEventListener('click', () => toggleComplete(session.id));
}

function renderMaterials(course, audience) {
  const materials = course.materials?.[audience] || [];
  if (!state.selectionId || !materials.some((material) => material.id === state.selectionId)) {
    state.selectionId = materials[0]?.id;
  }
  $('#list-summary').textContent = `${materials.length} ${audience === 'student' ? 'STUDENT MATERIALS' : 'INSTRUCTOR MATERIALS'} · A4 PRINT READY`;
  $('#lesson-list').innerHTML = materials.map((material, index) => `
    <button class="lesson-row material-row${material.id === state.selectionId ? ' active' : ''}" type="button" data-material="${escapeHtml(material.id)}">
      <span class="lesson-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="lesson-copy"><b>${escapeHtml(material.title)}</b><span>${escapeHtml(material.description)}</span><span class="material-audience">${audience}</span></span>
      <span class="lesson-state">›</span>
    </button>
  `).join('') || '<div class="command-empty">이 과정에 연결된 자료가 없습니다.</div>';

  $$('#lesson-list [data-material]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectionId = button.dataset.material;
      renderMaterials(course, audience);
    });
  });
  renderMaterialDetail(course, materials.find((material) => material.id === state.selectionId), audience);
}

function renderMaterialDetail(course, material, audience) {
  $('#detail-position').textContent = audience === 'student' ? 'STUDENT MATERIAL' : 'INSTRUCTOR MATERIAL';
  if (!material) {
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 자료가 없습니다.</div>';
    return;
  }
  const instructorCopy = audience === 'instructor'
    ? ['SAY / DO / ASK 구조', '예상 답변과 오류 복구', '시간 조정과 공식 참고자료']
    : ['단계별 작업지', '메모와 체크리스트', '밝은 A4 인쇄 레이아웃'];
  $('#detail-content').innerHTML = `
    <div class="material-preview">
      <span class="detail-number">${audience === 'student' ? 'STUDENT' : 'INSTRUCTOR'} LIBRARY</span>
      <h2>${escapeHtml(material.title)}</h2>
      <p>${escapeHtml(material.description)}</p>
      <div class="paper-preview">
        <div class="paper-sheet">${Array.from({ length: 13 }, (_, index) => `<i style="width:${index % 4 === 0 ? 85 : 100 - (index % 3) * 12}%"></i>`).join('')}</div>
        <div class="paper-copy">
          <h3>수업과 함께 사용하는 실제 자료</h3>
          <p>선택한 과정의 회차와 결과물을 기준으로 구성됩니다. 화면 보기와 인쇄용 스타일은 분리되어 있습니다.</p>
          <ul>${instructorCopy.map((item) => `<li>✓ ${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="lesson-actions">
        <button class="primary-action" id="btn-open-material" type="button">자료 열기</button>
      </div>
    </div>
  `;
  $('#btn-open-material').addEventListener('click', () => openPlayer(course, material, true));
}

function toggleComplete(sessionId) {
  if (state.completed.has(sessionId)) state.completed.delete(sessionId);
  else state.completed.add(sessionId);
  persist('vibe-v3-completed', [...state.completed]);
  renderStudio();
}

function buildContentUrl(file) {
  return `${state.contentBase}/${file}`;
}

function openPlayer(course, item, isMaterial = false) {
  state.playerSession = { course, item, isMaterial };
  state.selectionId = item.id;
  if (!isMaterial) {
    localStorage.setItem(`vibe-v3-last-${course.id}`, item.id);
    persist('vibe-v3-course', course.id);
  }
  $('#player-course').textContent = `${course.code} · ${course.title}`;
  $('#player-title').textContent = item.title;
  $('#player-duration').textContent = item.duration || (isMaterial ? 'A4 PRINT' : '120분');
  const index = isMaterial ? 0 : course.sessions.findIndex((session) => session.id === item.id);
  $('#player-counter').textContent = isMaterial ? 'MATERIAL' : `${index + 1} / ${course.sessions.length}`;
  $('#btn-prev').disabled = isMaterial || index <= 0;
  $('#btn-next').disabled = isMaterial || index >= course.sessions.length - 1;
  $('#btn-complete').classList.toggle('complete', state.completed.has(item.id));
  $('#btn-complete').textContent = state.completed.has(item.id) ? '완료' : '미완료';
  $('#notes-input').value = state.notes[item.id] || '';
  $('#notes-panel').classList.add('closed');
  $('#player-loading').classList.remove('hidden');
  const webview = $('#lecture-webview');
  webview.src = buildContentUrl(item.file);
  $('#player').classList.remove('hidden');
}

function closePlayer() {
  $('#player').classList.add('hidden');
  $('#lecture-webview').src = 'about:blank';
  closeBoard();
  renderStudio();
}

function movePlayer(direction) {
  const current = state.playerSession;
  if (!current || current.isMaterial) return;
  const index = current.course.sessions.findIndex((session) => session.id === current.item.id);
  const next = current.course.sessions[index + direction];
  if (next) openPlayer(current.course, next);
}

async function printPlayer() {
  const webview = $('#lecture-webview');
  try {
    await webview.print({ printBackground: true });
  } catch (error) {
    console.error('Print failed', error);
  }
}

async function savePlayerPdf() {
  const webview = $('#lecture-webview');
  try {
    const data = await webview.printToPDF({ printBackground: true, pageSize: 'A4', preferCSSPageSize: true });
    const cleanTitle = state.playerSession.item.title.replace(/[\\/:*?"<>|]/g, '-');
    await appApi.savePdf(data, `${cleanTitle}.pdf`);
  } catch (error) {
    console.error('PDF failed', error);
  }
}

function setMode(mode) {
  state.mode = mode;
  persist('vibe-v3-mode', mode);
  if (mode === 'student' && getCourse()?.visibility === 'preview') {
    state.courseId = state.manifest.defaultCourseId;
  }
  renderStudio();
}

function renderCommandResults(query = '') {
  const term = query.trim().toLowerCase();
  const items = [];
  visibleCourses().forEach((course) => {
    items.push({ type: 'COURSE', title: course.title, subtitle: course.route, courseId: course.id, id: course.id });
    course.sessions.forEach((session) => items.push({
      type: 'LESSON', title: session.title, subtitle: `${course.shortTitle} · ${session.subtitle || ''}`,
      courseId: course.id, id: session.id,
    }));
    ['student', ...(state.mode === 'instructor' ? ['instructor'] : [])].forEach((audience) => {
      (course.materials?.[audience] || []).forEach((material) => items.push({
        type: audience === 'student' ? 'STUDENT' : 'INSTRUCTOR',
        title: material.title, subtitle: course.shortTitle, courseId: course.id, id: material.id, audience,
      }));
    });
  });
  state.commandItems = items.filter((item) => !term || `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(term)).slice(0, 30);
  state.commandIndex = Math.min(state.commandIndex, Math.max(0, state.commandItems.length - 1));
  $('#command-results').innerHTML = state.commandItems.length ? state.commandItems.map((item, index) => `
    <button type="button" class="command-item${index === state.commandIndex ? ' active' : ''}" data-command="${index}">
      <span>${escapeHtml(item.type)}</span>
      <span><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.subtitle)}</small></span>
      <em>↵</em>
    </button>
  `).join('') : '<div class="command-empty">검색 결과가 없습니다.</div>';
  $$('#command-results [data-command]').forEach((button) => {
    button.addEventListener('click', () => executeCommand(Number(button.dataset.command)));
  });
}

function executeCommand(index = state.commandIndex) {
  const item = state.commandItems[index];
  if (!item) return;
  state.courseId = item.courseId;
  state.selectionId = item.id;
  state.tab = item.audience || (item.type === 'LESSON' || item.type === 'COURSE' ? 'lessons' : 'student');
  persist('vibe-v3-course', item.courseId);
  closeCommandPalette();
  renderStudio();
}

function openCommandPalette() {
  $('#command-palette').classList.remove('hidden');
  $('#command-input').value = '';
  state.commandIndex = 0;
  renderCommandResults();
  setTimeout(() => $('#command-input').focus(), 0);
}

function closeCommandPalette() {
  $('#command-palette').classList.add('hidden');
}

function openDrawer(type) {
  const course = getCourse();
  if (type === 'planner') {
    $('#drawer-kicker').textContent = `${course.code} · OPERATIONS`;
    $('#drawer-title').textContent = '일정 및 운영 메모';
    const current = state.schedule[course.id] || {};
    $('#drawer-content').innerHTML = `
      <section class="drawer-section">
        <h3>전체 프로그램 메모</h3>
        <textarea id="program-note-input" placeholder="공통 공지와 운영 메모">${escapeHtml(state.programNote)}</textarea>
      </section>
      <section class="drawer-section">
        <h3>${escapeHtml(course.shortTitle)} 일정</h3>
        <div class="schedule-editor">
          <input id="schedule-date" type="date" value="${escapeHtml(current.date || '')}">
          <input id="schedule-time" type="time" value="${escapeHtml(current.time || '')}">
          <input id="schedule-place" type="text" placeholder="장소" value="${escapeHtml(current.place || '')}">
          <input id="schedule-cohort" type="text" placeholder="기수" value="${escapeHtml(current.cohort || course.cohort || '')}">
          <textarea id="schedule-note" placeholder="준비물, 현장 변수, 다음 수업 메모">${escapeHtml(current.note || '')}</textarea>
        </div>
      </section>
    `;
    ['date', 'time', 'place', 'cohort', 'note'].forEach((field) => {
      $(`#schedule-${field}`).addEventListener('input', () => {
        state.schedule[course.id] = state.schedule[course.id] || {};
        state.schedule[course.id][field] = $(`#schedule-${field}`).value;
        persist('vibe-v3-schedule', state.schedule);
      });
    });
    $('#program-note-input').addEventListener('input', (event) => {
      state.programNote = event.target.value;
      persist('vibe-v3-program-note', state.programNote);
    });
  } else {
    $('#drawer-kicker').textContent = 'DISPLAY';
    $('#drawer-title').textContent = '화면 설정';
    $('#drawer-content').innerHTML = `
      <section class="drawer-section">
        <div class="setting-row"><span><b>현재 표시 모드</b><span>다음 기수 자료는 강사 모드에서만 표시됩니다.</span></span><button id="drawer-mode" class="secondary-action" type="button">${state.mode === 'student' ? '강사 모드로 전환' : '학생 모드로 전환'}</button></div>
        <div class="setting-row"><span><b>빠른 검색</b><span>과정·회차·자료를 어디서든 찾습니다.</span></span><kbd>Ctrl K</kbd></div>
        <div class="setting-row"><span><b>전체화면</b><span>프로젝터 발표 화면으로 전환합니다.</span></span><kbd>Ctrl F</kbd></div>
        <div class="setting-row"><span><b>운영본 보호</b><span>기초반 2기 6주 강의 파일은 V3에서 동결되어 있습니다.</span></span><strong>LOCKED</strong></div>
      </section>
    `;
    $('#drawer-mode').addEventListener('click', () => {
      closeDrawer();
      setMode(state.mode === 'student' ? 'instructor' : 'student');
    });
  }
  $('#utility-drawer').classList.add('open');
  $('#utility-drawer').setAttribute('aria-hidden', 'false');
  $('#drawer-shade').classList.add('open');
}

function closeDrawer() {
  $('#utility-drawer').classList.remove('open');
  $('#utility-drawer').setAttribute('aria-hidden', 'true');
  $('#drawer-shade').classList.remove('open');
}

function setupBoard() {
  const canvas = $('#board-canvas');
  const context = canvas.getContext('2d');
  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(innerWidth * ratio);
    canvas.height = Math.round(innerHeight * ratio);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.lineCap = 'round';
    context.lineJoin = 'round';
  };
  resize();
  addEventListener('resize', resize);
  canvas.addEventListener('pointerdown', (event) => {
    state.board.drawing = true;
    state.board.x = event.clientX;
    state.board.y = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!state.board.drawing) return;
    context.strokeStyle = state.board.color;
    context.lineWidth = state.board.size;
    context.beginPath();
    context.moveTo(state.board.x, state.board.y);
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
    state.board.x = event.clientX;
    state.board.y = event.clientY;
  });
  canvas.addEventListener('pointerup', () => { state.board.drawing = false; });
  $('#btn-board-clear').addEventListener('click', () => context.clearRect(0, 0, innerWidth, innerHeight));
  $$('#board-toolbar [data-color]').forEach((button) => button.addEventListener('click', () => {
    state.board.color = button.dataset.color;
    $$('#board-toolbar [data-color]').forEach((item) => item.classList.toggle('active', item === button));
  }));
  $$('#board-toolbar [data-size]').forEach((button) => button.addEventListener('click', () => {
    state.board.size = Number(button.dataset.size);
    $$('#board-toolbar [data-size]').forEach((item) => item.classList.toggle('active', item === button));
  }));
}

function openBoard() {
  state.board.active = true;
  $('#board-canvas').classList.add('active');
  $('#board-toolbar').classList.remove('hidden');
}

function closeBoard() {
  state.board.active = false;
  $('#board-canvas').classList.remove('active');
  $('#board-toolbar').classList.add('hidden');
}

function bindEvents() {
  $('#btn-mode').addEventListener('click', () => setMode(state.mode === 'student' ? 'instructor' : 'student'));
  $$('#course-tabs button').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.tab === 'instructor' && state.mode !== 'instructor') return;
    state.tab = button.dataset.tab;
    state.selectionId = null;
    renderStudio();
  }));
  ['btn-search', 'btn-quick-search'].forEach((id) => $(`#${id}`).addEventListener('click', openCommandPalette));
  $('#command-input').addEventListener('input', (event) => { state.commandIndex = 0; renderCommandResults(event.target.value); });
  $('#command-palette').addEventListener('click', (event) => { if (event.target === $('#command-palette')) closeCommandPalette(); });
  $('#btn-planner').addEventListener('click', () => openDrawer('planner'));
  $('#btn-settings').addEventListener('click', () => openDrawer('settings'));
  $('#btn-drawer-close').addEventListener('click', closeDrawer);
  $('#drawer-shade').addEventListener('click', closeDrawer);
  $('#btn-fullscreen').addEventListener('click', () => appApi.toggleFullscreen());
  $('#btn-player-fullscreen').addEventListener('click', () => appApi.toggleFullscreen());
  $('#btn-player-close').addEventListener('click', closePlayer);
  $('#btn-prev').addEventListener('click', () => movePlayer(-1));
  $('#btn-next').addEventListener('click', () => movePlayer(1));
  $('#btn-notes').addEventListener('click', () => $('#notes-panel').classList.toggle('closed'));
  $('#btn-notes-close').addEventListener('click', () => $('#notes-panel').classList.add('closed'));
  $('#notes-input').addEventListener('input', (event) => {
    if (!state.playerSession) return;
    state.notes[state.playerSession.item.id] = event.target.value;
    persist('vibe-v3-notes', state.notes);
  });
  $('#btn-complete').addEventListener('click', () => {
    if (!state.playerSession) return;
    toggleComplete(state.playerSession.item.id);
    $('#btn-complete').classList.toggle('complete', state.completed.has(state.playerSession.item.id));
    $('#btn-complete').textContent = state.completed.has(state.playerSession.item.id) ? '완료' : '미완료';
  });
  $('#btn-print').addEventListener('click', printPlayer);
  $('#btn-pdf').addEventListener('click', savePlayerPdf);
  $('#btn-board').addEventListener('click', openBoard);
  $('#btn-board-close').addEventListener('click', closeBoard);
  $('#lecture-webview').addEventListener('did-finish-load', () => $('#player-loading').classList.add('hidden'));

  addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      $('#command-palette').classList.contains('hidden') ? openCommandPalette() : closeCommandPalette();
      return;
    }
    if (!$('#command-palette').classList.contains('hidden')) {
      if (event.key === 'Escape') closeCommandPalette();
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        state.commandIndex = Math.min(state.commandItems.length - 1, state.commandIndex + 1);
        renderCommandResults($('#command-input').value);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        state.commandIndex = Math.max(0, state.commandIndex - 1);
        renderCommandResults($('#command-input').value);
      }
      if (event.key === 'Enter') executeCommand();
      return;
    }
    if (event.key === 'Escape') {
      if (state.board.active) closeBoard();
      else if (!$('#player').classList.contains('hidden')) closePlayer();
      else closeDrawer();
    }
  });

  appApi?.onShortcut?.((key) => {
    if (key === 'home' || key === 'escape') closePlayer();
  });
}

async function boot() {
  const [manifest, contentBase] = await Promise.all([appApi.readManifest(), appApi.getContentBase()]);
  state.manifest = manifest;
  state.contentBase = contentBase;
  if (!visibleCourses().some((course) => course.id === state.courseId)) state.courseId = manifest.defaultCourseId;
  bindEvents();
  setupBoard();
  renderStudio();
}

boot().catch((error) => {
  console.error(error);
  $('#detail-content').innerHTML = `<div class="command-empty">프로그램을 불러오지 못했습니다.<br>${escapeHtml(error.message)}</div>`;
});
