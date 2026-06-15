'use strict';

/* ═══════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════ */
const state = {
  view: 'catalog',            // 'catalog' | 'dashboard' | 'appendix' | 'planner' | 'player'
  activeCourseId: 'basic',
  activeSessionId: null,      // session.id 또는 appendix.id
  isAppendixMode: false,      // true = 별첨 자료 플레이어
  manifest: null,
  contentBase: null,
  shareConfig: null,
  appendixAudience: 'student',
  appendixCourseFilter: 'all',
  catalogTrackFilter: 'all',
  notesOpen: false,
  presenterMode: false,
  isDev: false,
};

/* ═══════════════════════════════════════════════════════
   PERSISTENCE — localStorage
═══════════════════════════════════════════════════════ */
const store = {
  // 완료 체크
  get progress() {
    return JSON.parse(localStorage.getItem('vbc_progress') || '{}');
  },
  setProgress(id, val) {
    const p = this.progress;
    p[id] = val;
    localStorage.setItem('vbc_progress', JSON.stringify(p));
  },
  isDone(id) { return !!this.progress[id]; },

  // 즐겨찾기
  get favorites() {
    return JSON.parse(localStorage.getItem('vbc_favorites') || '[]');
  },
  toggleFavorite(id) {
    const favs = this.favorites;
    const idx = favs.indexOf(id);
    if (idx === -1) favs.push(id); else favs.splice(idx, 1);
    localStorage.setItem('vbc_favorites', JSON.stringify(favs));
    return favs.includes(id);
  },
  isFavorite(id) { return this.favorites.includes(id); },

  // 마지막 강의
  get lastSession() { return localStorage.getItem('vbc_last_session'); },
  setLastSession(id) {
    if (id) localStorage.setItem('vbc_last_session', id);
    else localStorage.removeItem('vbc_last_session');
  },

  // 메모
  getNote(id) {
    return (JSON.parse(localStorage.getItem('vbc_notes') || '{}'))[id] || '';
  },
  setNote(id, text) {
    const notes = JSON.parse(localStorage.getItem('vbc_notes') || '{}');
    notes[id] = text;
    localStorage.setItem('vbc_notes', JSON.stringify(notes));
  },

  get programNote() { return localStorage.getItem('vbc_program_note') || ''; },
  setProgramNote(text) { localStorage.setItem('vbc_program_note', text); },

  get schedule() {
    return JSON.parse(localStorage.getItem('vbc_schedule') || '{}');
  },
  setSchedule(courseId, field, value) {
    const schedule = this.schedule;
    schedule[courseId] = { ...(schedule[courseId] || {}), [field]: value };
    localStorage.setItem('vbc_schedule', JSON.stringify(schedule));
  },
};

/* ═══════════════════════════════════════════════════════
   DOM HELPERS
═══════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const show = (el) => el && el.classList.remove('hidden');
const hide = (el) => el && el.classList.add('hidden');
const setText = (sel, text) => {
  const el = typeof sel === 'string' ? $(sel) : sel;
  if (el) el.textContent = text;
};

/* ═══════════════════════════════════════════════════════
   MANIFEST HELPERS
═══════════════════════════════════════════════════════ */
function getCourse(id) {
  return state.manifest.courses.find(c => c.id === id) || null;
}

function getSession(sessionId) {
  for (const course of state.manifest.courses) {
    const session = course.sessions.find(s => s.id === sessionId);
    if (session) return { session, course };
  }
  return null;
}

function getAppendix(id) {
  return state.manifest.appendix.find(a => a.id === id) || null;
}

function getContentUrl(relPath) {
  return `${state.contentBase}/${relPath}`;
}

function getShareableResource(appendixId) {
  return state.shareConfig?.resources?.[appendixId] || null;
}

function getCommunityResourcesUrl() {
  return state.shareConfig?.resourcesUrl || state.manifest?.community?.resourcesUrl || '';
}

function getAppendixAudience(item) {
  if (item.audience) return item.audience;
  if (/^(script|study|wireframe|instructor)/.test(item.id)) return 'instructor';
  return 'student';
}

function getCourseFamily(course) {
  return course.family || course.track || '기타 과정';
}

function getAppendixCourseId(item) {
  if (item.courseId) return item.courseId;
  if (/session[1-6]|session-0[1-6]|curriculum|ai-types|preclass|command|error-guide|mvp|glossary|project-structure|database|deployment|presentation|practice-log|diagrams/.test(item.id)) {
    return 'basic';
  }
  return 'program';
}

function getAppendixSessionLabel(item) {
  if (item.sessionId) {
    const found = getSession(item.sessionId);
    return found?.session?.title || item.sessionId;
  }
  const match = item.id.match(/session-?0?(\d+)/);
  return match ? `${Number(match[1])}강` : (item.scopeLabel || '공통');
}

function getCourseStatusLabel(course) {
  if (course.status === 'planning' || course.comingSoon) return '기획 완료';
  if (course.status === 'updating') return '업데이트 중';
  return '운영 중';
}

/* ═══════════════════════════════════════════════════════
   VIEW SWITCHING
═══════════════════════════════════════════════════════ */
function showView(name) {
  $$('.view').forEach(v => v.classList.add('hidden'));
  const el = $(`#view-${name}`);
  if (el) el.classList.remove('hidden');
  state.view = name;
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════ */
function renderSidebar() {
  const container = $('#nav-courses');
  container.innerHTML = '';

  for (const course of state.manifest.courses) {
    const done = course.sessions.filter(s => store.isDone(s.id)).length;
    const total = course.sessions.length;
    const isActive = course.id === state.activeCourseId && !state.isAppendixMode && ['dashboard', 'player'].includes(state.view);
    const courseCode = course.code || course.shortTitle?.slice(0, 2) || 'VC';

    const btn = document.createElement('button');
    btn.className = `nav-item${isActive ? ' active' : ''}`;
    btn.dataset.courseId = course.id;
    btn.style.setProperty('--course-accent', course.color || '#d9ff61');
    btn.innerHTML = `
      <span class="nav-course-code">${courseCode}</span>
      <span class="nav-item-body">
        <span class="nav-item-title">${course.shortTitle || course.title}</span>
        ${total > 0 ? `<span class="nav-item-prog">${done}/${total}</span>` : ''}
      </span>
      ${(course.status === 'planning' || course.comingSoon) ? '<span class="nav-soon">예정</span>' : ''}
    `;

    if (total > 0) {
      btn.addEventListener('click', () => selectCourse(course.id));
    } else {
      btn.classList.add('disabled');
    }
    container.appendChild(btn);
  }

  const studentBtn = $('[data-nav="student-materials"]');
  const instructorBtn = $('[data-nav="instructor-library"]');
  const catalogBtn = $('[data-nav="catalog"]');
  const plannerBtn = $('[data-nav="planner"]');
  studentBtn?.classList.toggle('active', state.isAppendixMode && state.appendixAudience === 'student');
  instructorBtn?.classList.toggle('active', state.isAppendixMode && state.appendixAudience === 'instructor');
  catalogBtn?.classList.toggle('active', state.view === 'catalog');
  plannerBtn?.classList.toggle('active', state.view === 'planner');
}

/* ═══════════════════════════════════════════════════════
   COURSE CATALOG
═══════════════════════════════════════════════════════ */
function showCatalog() {
  state.isAppendixMode = false;
  state.activeSessionId = null;
  renderSidebar();
  renderCatalog();
  showView('catalog');
  renderSidebar();
}

function renderCatalog() {
  const courses = state.manifest.courses;
  const families = [...new Set(courses.map(getCourseFamily))];
  const filterWrap = $('#catalog-track-filter');
  filterWrap.innerHTML = [
    `<button class="filter-chip${state.catalogTrackFilter === 'all' ? ' active' : ''}" data-track-filter="all">전체</button>`,
    ...families.map((family) => `<button class="filter-chip${state.catalogTrackFilter === family ? ' active' : ''}" data-track-filter="${family}">${family}</button>`)
  ].join('');
  $$('[data-track-filter]', filterWrap).forEach((button) => {
    button.addEventListener('click', () => {
      state.catalogTrackFilter = button.dataset.trackFilter;
      renderCatalogGrid($('#search-catalog').value.trim());
      renderCatalog();
    });
  });

  setText('#catalog-course-count', String(courses.length).padStart(2, '0'));
  setText('#catalog-lesson-count', String(courses.reduce((sum, course) => sum + course.sessions.length, 0)).padStart(2, '0'));
  setText('#catalog-active-count', String(courses.filter((course) => course.status === 'active').length).padStart(2, '0'));
  renderCatalogGrid($('#search-catalog').value.trim());
}

function renderCatalogGrid(filter = '') {
  const grid = $('#catalog-grid');
  const courses = state.manifest.courses.filter((course) => {
    const matchesTrack = state.catalogTrackFilter === 'all' || getCourseFamily(course) === state.catalogTrackFilter;
    const haystack = `${course.title} ${course.shortTitle || ''} ${course.description || ''} ${course.track || ''}`;
    return matchesTrack && (!filter || haystack.toLowerCase().includes(filter.toLowerCase()));
  });

  if (courses.length === 0) {
    grid.innerHTML = '<div class="empty-state"><p>조건에 맞는 과정이 없습니다.</p></div>';
    return;
  }

  grid.innerHTML = '';
  courses.forEach((course) => {
    const done = course.sessions.filter((session) => store.isDone(session.id)).length;
    const card = document.createElement('article');
    card.className = 'catalog-card';
    card.style.setProperty('--catalog-accent', course.color || '#d8ff66');
    card.innerHTML = `
      <div class="catalog-card-head">
        <span class="catalog-code">${course.code || 'VIBE'}</span>
        <span class="catalog-family">${getCourseFamily(course)}</span>
      </div>
      <h3>${course.title}</h3>
      <p class="catalog-route">${course.description || course.route || ''}</p>
      <div class="catalog-metrics">
        <span>${course.sessions.length} LESSONS</span>
        <span>${done} COMPLETE</span>
        <span>${course.level || 'ALL'}</span>
      </div>
      <div class="catalog-card-foot">
        <span class="catalog-status">${getCourseStatusLabel(course)}</span>
        <button class="catalog-open" data-open-course="${course.id}">과정 보기</button>
      </div>
    `;
    card.querySelector('[data-open-course]').addEventListener('click', () => selectCourse(course.id));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════ */
function selectCourse(courseId) {
  state.activeCourseId = courseId;
  state.activeSessionId = null;
  state.isAppendixMode = false;

  renderDashboard(courseId);
  showView('dashboard');
  renderSidebar();
}

function renderDashboard(courseId) {
  const course = getCourse(courseId);
  if (!course) return;

  document.body.dataset.course = course.id;
  document.documentElement.style.setProperty('--course-accent', course.color || '#d9ff61');
  setText('#course-eyebrow', `${course.code || 'VIBE'} · ${course.track || 'VIBE CODING PROGRAM'}`);
  setText('#course-title', course.title);
  setText('#course-desc', course.description);
  setText('#course-level', course.level || 'START');
  setText('#course-session-count', String(course.sessions.length).padStart(2, '0'));
  setText('#course-status', getCourseStatusLabel(course));
  setText('#course-route-copy', course.route || '각 회차는 짧은 개념 설명과 직접 만드는 실습으로 이어집니다.');

  const outcomes = $('#course-outcomes');
  outcomes.innerHTML = (course.outcomes || []).slice(0, 4)
    .map((outcome) => `<span>${outcome}</span>`)
    .join('');

  // 진행 요약
  const done = course.sessions.filter(s => store.isDone(s.id)).length;
  const total = course.sessions.length;
  if (total > 0) {
    const pct = Math.round((done / total) * 100);
    $('#progress-summary').innerHTML = `
      <div class="prog-bar-mini"><div class="prog-fill-mini" style="width:${pct}%"></div></div>
      <span class="prog-text-mini">${done} / ${total} 완료</span>
    `;
  } else {
    $('#progress-summary').innerHTML = '';
  }

  renderSessionGrid(course, '');
  renderResumeBanner(courseId);
}

function renderSessionGrid(course, filter) {
  const grid = $('#session-grid');
  grid.innerHTML = '';

  const sessions = filter
    ? course.sessions.filter(s =>
        s.title.includes(filter) || s.description.includes(filter) || (s.subtitle || '').includes(filter)
      )
    : course.sessions;

  if (sessions.length === 0) {
    grid.innerHTML = `<div class="empty-state"><span class="empty-icon">🔍</span><p>검색 결과가 없습니다.</p></div>`;
    return;
  }

  sessions.forEach((session, idx) => {
    grid.appendChild(createSessionCard(session, idx + 1));
  });
}

function createSessionCard(session, num) {
  const done = store.isDone(session.id);
  const fav = store.isFavorite(session.id);
  const isPlanned = Boolean(session.planned || !session.file);
  const typeMap = { intro: '커리큘럼', theory: '이론', practice: '이론+실습', showcase: '발표' };
  const typeLabel = typeMap[session.type] || '';
  const typeClass = session.type || 'theory';

  const card = document.createElement('article');
  card.className = `session-card${done ? ' is-done' : ''}${isPlanned ? ' is-planned' : ''}`;
  card.innerHTML = `
    <div class="card-top">
      <span class="card-num">${String(num).padStart(2, '0')}</span>
      <div class="card-badges">
        ${typeLabel ? `<span class="badge badge-${typeClass}">${typeLabel}</span>` : ''}
        ${fav ? '<span class="badge badge-fav">★</span>' : ''}
        ${done ? '<span class="badge badge-done">✓ 완료</span>' : ''}
        ${isPlanned ? '<span class="badge badge-planned">설계 완료</span>' : ''}
      </div>
    </div>
    <h3 class="card-title">${session.title}</h3>
    ${session.subtitle ? `<p class="card-subtitle">${session.subtitle}</p>` : ''}
    <p class="card-desc">${session.description}</p>
    <div class="card-foot">
      <span class="card-duration">${session.duration}</span>
      <button class="btn-card-open" data-session-id="${session.id}" ${isPlanned ? 'disabled' : ''}>${isPlanned ? '제작 예정' : '강의 열기'}</button>
    </div>
  `;

  if (!isPlanned) {
    card.querySelector('.btn-card-open').addEventListener('click', () => {
      openSession(session.id);
    });
  }

  return card;
}

/* ═══════════════════════════════════════════════════════
   RESUME BANNER
═══════════════════════════════════════════════════════ */
function renderResumeBanner(courseId) {
  const lastId = store.lastSession;
  const banner = $('#resume-banner');
  const nameEl = $('#resume-session-name');
  const btn = $('#resume-btn');

  if (!lastId) { hide(banner); return; }

  const course = getCourse(courseId);
  if (!course) { hide(banner); return; }

  const session = course.sessions.find(s => s.id === lastId);
  if (!session) { hide(banner); return; }

  setText(nameEl, session.title);
  btn.dataset.sessionId = lastId;
  show(banner);
}

/* ═══════════════════════════════════════════════════════
   SESSION PLAYER
═══════════════════════════════════════════════════════ */
function openSession(sessionId) {
  const found = getSession(sessionId);
  if (!found) return;
  const { session, course } = found;

  state.activeSessionId = sessionId;
  state.isAppendixMode = false;
  store.setLastSession(sessionId);

  // 플레이어 상단 바
  const idx = course.sessions.findIndex(s => s.id === sessionId);
  setText('#player-course-label', `${course.shortTitle || course.title}  ·  ${idx + 1} / ${course.sessions.length}`);
  setText('#player-session-title', session.title);

  // 즐겨찾기 / 완료 버튼
  syncFavoriteBtn(sessionId);
  syncCompleteBtn(sessionId);

  // 진행률 바
  syncProgressBar(course);

  // 하단 이전/다음 버튼
  syncNavButtons(course, idx);

  // 타입 · 시간 표시
  const typeMap = { intro: '커리큘럼', theory: '이론', practice: '이론 + 실습', showcase: '쇼케이스' };
  setText('#session-type-badge', typeMap[session.type] || '');
  setText('#session-duration-text', session.duration);

  // 메모 불러오기
  $('#notes-textarea').value = store.getNote(sessionId);

  // 하단 푸터·진행바 표시
  show($('#player-footer'));
  show($('#progress-bar-wrap'));
  show($('#btn-complete'));
  syncShareCommunityBtn(null);

  // 뷰를 먼저 표시해야 webview가 올바른 뷰포트 크기로 렌더링됨
  showView('player');
  renderSidebar();
  loadWebview(getContentUrl(session.file));

}

function syncFavoriteBtn(id) {
  const isFav = store.isFavorite(id);
  const btn = $('#btn-favorite');
  btn.classList.toggle('active', isFav);
  btn.title = isFav ? '즐겨찾기 해제' : '즐겨찾기 추가';
  // 아이콘 채우기 토글
  const path = btn.querySelector('path');
  if (path) path.setAttribute('fill', isFav ? 'currentColor' : 'none');
}

function syncCompleteBtn(id) {
  const done = store.isDone(id);
  const btn = $('#btn-complete');
  btn.textContent = done ? '✓ 완료됨' : '미완료';
  btn.classList.toggle('is-done', done);
}

function syncProgressBar(course) {
  const done = course.sessions.filter(s => store.isDone(s.id)).length;
  const total = course.sessions.length;
  const pct = total > 0 ? (done / total) * 100 : 0;
  $('#progress-fill').style.width = `${pct}%`;
  setText('#progress-text', `${done} / ${total} 완료`);
}

function syncNavButtons(course, currentIdx) {
  const prev = $('#btn-prev-session');
  const next = $('#btn-next-session');

  if (currentIdx > 0) {
    const prevSession = course.sessions[currentIdx - 1];
    prev.disabled = false;
    prev.dataset.targetId = prevSession.id;
    prev.innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> ${prevSession.title}`;
  } else {
    prev.disabled = true;
    prev.dataset.targetId = '';
    prev.innerHTML = `<svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> 이전 강의`;
  }

  if (currentIdx < course.sessions.length - 1) {
    const nextSession = course.sessions[currentIdx + 1];
    next.disabled = false;
    next.dataset.targetId = nextSession.id;
    next.innerHTML = `${nextSession.title} <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  } else {
    next.disabled = true;
    next.dataset.targetId = '';
    next.innerHTML = `다음 강의 <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
  }
}

/* ═══════════════════════════════════════════════════════
   APPENDIX
═══════════════════════════════════════════════════════ */
function showAppendixList(audience = 'student') {
  state.isAppendixMode = true;
  state.activeSessionId = null;
  state.appendixAudience = audience;
  state.appendixCourseFilter = state.appendixCourseFilter || 'all';
  const isInstructor = audience === 'instructor';
  setText('#appendix-eyebrow', isInstructor ? 'INSTRUCTOR LIBRARY' : 'STUDENT MATERIALS');
  setText('#appendix-title', isInstructor ? '강사 자료실' : '수강생 자료');
  setText(
    '#appendix-desc',
    isInstructor
      ? '강의 대본, 개념 공부자료, 다음 과정 설계 문서를 한곳에서 관리합니다.'
      : '수업 중 배포하고 실습에 사용하는 요약표, 워크시트와 참고자료입니다.'
  );
  showView('appendix');
  renderSidebar();
  renderAppendixFilters();
  renderAppendixGrid('');
}

function renderAppendixFilters() {
  const wrap = $('#appendix-filters');
  const audienceItems = state.manifest.appendix.filter(
    (item) => getAppendixAudience(item) === state.appendixAudience
  );
  const courseIds = [...new Set(audienceItems.map(getAppendixCourseId))];
  const options = [
    { id: 'all', label: '전체 과정' },
    ...courseIds.map((courseId) => ({
      id: courseId,
      label: courseId === 'program' ? '프로그램 공통' : (getCourse(courseId)?.shortTitle || getCourse(courseId)?.title || courseId)
    }))
  ];
  wrap.innerHTML = options.map((option) => `
    <button class="filter-chip${state.appendixCourseFilter === option.id ? ' active' : ''}" data-appendix-course="${option.id}">${option.label}</button>
  `).join('');
  $$('[data-appendix-course]', wrap).forEach((button) => {
    button.addEventListener('click', () => {
      state.appendixCourseFilter = button.dataset.appendixCourse;
      renderAppendixFilters();
      renderAppendixGrid($('#search-appendix').value.trim());
    });
  });
}

function renderAppendixGrid(filter) {
  const grid = $('#appendix-grid');
  grid.innerHTML = '';

  const audienceItems = state.manifest.appendix.filter(
    (item) => getAppendixAudience(item) === state.appendixAudience
  );
  const courseItems = state.appendixCourseFilter === 'all'
    ? audienceItems
    : audienceItems.filter((item) => getAppendixCourseId(item) === state.appendixCourseFilter);
  const items = filter
    ? courseItems.filter(a =>
        a.title.toLowerCase().includes(filter.toLowerCase()) || (a.description || '').toLowerCase().includes(filter.toLowerCase())
      )
    : courseItems;

  setText('#appendix-count', `${items.length}개 자료`);

  if (items.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>검색 결과가 없습니다.</p></div>`;
    return;
  }

  const grouped = new Map();
  items.forEach((item) => {
    const courseId = getAppendixCourseId(item);
    if (!grouped.has(courseId)) grouped.set(courseId, []);
    grouped.get(courseId).push(item);
  });

  grouped.forEach((groupItems, courseId) => {
    const course = getCourse(courseId);
    const section = document.createElement('section');
    section.className = 'library-group';
    section.innerHTML = `
      <div class="library-group-head">
        <div><span>${course?.code || 'COMMON'}</span><h2>${course?.title || '프로그램 공통 자료'}</h2></div>
        <small>${groupItems.length} MATERIALS</small>
      </div>
      <div class="library-group-grid"></div>
    `;
    const groupGrid = section.querySelector('.library-group-grid');

    groupItems
      .sort((a, b) => getAppendixSessionLabel(a).localeCompare(getAppendixSessionLabel(b), 'ko'))
      .forEach(item => {
        const isShareable = Boolean(getShareableResource(item.id));
        const card = document.createElement('article');
        card.className = 'session-card appendix-card';
        card.innerHTML = `
          <div class="card-top">
            <span class="card-num appendix-code">${item.code || (state.appendixAudience === 'instructor' ? 'NOTE' : 'FILE')}</span>
            <span class="material-session">${getAppendixSessionLabel(item)}</span>
            ${isShareable ? '<span class="badge badge-practice">커뮤니티 공유</span>' : ''}
          </div>
          <h3 class="card-title">${item.title}</h3>
          ${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
          <p class="card-desc">${item.description || ''}</p>
          <div class="card-foot">
            <button class="btn-card-open" data-appendix-id="${item.id}">열람하기 →</button>
          </div>
        `;
        card.querySelector('.btn-card-open').addEventListener('click', () => openAppendix(item.id));
        groupGrid.appendChild(card);
      });
    grid.appendChild(section);
  });
}

/* ═══════════════════════════════════════════════════════
   PROGRAM PLANNER
═══════════════════════════════════════════════════════ */
function showPlanner() {
  state.isAppendixMode = false;
  state.activeSessionId = null;
  showView('planner');
  renderSidebar();
  renderPlanner();
}

function flashPlannerSaved() {
  setText('#planner-save-label', '저장됨');
  clearTimeout(flashPlannerSaved.timer);
  flashPlannerSaved.timer = setTimeout(() => setText('#planner-save-label', '자동 저장'), 1200);
}

function renderPlanner() {
  $('#program-note').value = store.programNote;
  const list = $('#schedule-list');
  const schedule = store.schedule;
  list.innerHTML = '';
  state.manifest.courses.forEach((course) => {
    const saved = schedule[course.id] || {};
    const row = document.createElement('article');
    row.className = 'schedule-row';
    row.style.setProperty('--row-accent', course.color || '#d8ff66');
    row.innerHTML = `
      <span class="schedule-code">${course.code || 'VC'}</span>
      <div class="schedule-title"><b>${course.shortTitle || course.title}</b><span>${course.sessions.length}회 · ${getCourseStatusLabel(course)}</span></div>
      <input type="date" data-schedule-field="date" value="${saved.date || ''}" aria-label="${course.title} 날짜">
      <input type="time" data-schedule-field="time" value="${saved.time || ''}" aria-label="${course.title} 시간">
      <input type="text" data-schedule-field="note" value="${saved.note || ''}" placeholder="장소 · 기수 · 준비 메모" aria-label="${course.title} 메모">
    `;
    $$('[data-schedule-field]', row).forEach((input) => {
      input.addEventListener('input', () => {
        store.setSchedule(course.id, input.dataset.scheduleField, input.value);
        flashPlannerSaved();
      });
    });
    list.appendChild(row);
  });
}

function openAppendix(appendixId) {
  const item = getAppendix(appendixId);
  if (!item) return;

  state.activeSessionId = appendixId;
  state.isAppendixMode = true;

  const itemCourse = getCourse(getAppendixCourseId(item));
  setText(
    '#player-course-label',
    `${state.appendixAudience === 'instructor' ? '강사 자료실' : '수강생 자료'} · ${itemCourse?.shortTitle || '공통'} · ${getAppendixSessionLabel(item)}`
  );
  setText('#player-session-title', item.title);

  syncFavoriteBtn(appendixId);

  // 완료 버튼 / 진행바 / 하단 푸터 숨기기
  hide($('#btn-complete'));
  hide($('#player-footer'));
  hide($('#progress-bar-wrap'));
  syncShareCommunityBtn(appendixId);

  // 메모
  $('#notes-textarea').value = store.getNote('appendix:' + appendixId);

  // 뷰를 먼저 표시해야 webview가 올바른 뷰포트 크기로 렌더링됨
  showView('player');
  loadWebview(getContentUrl(item.file));
}

/* ═══════════════════════════════════════════════════════
   WEBVIEW LOADING
═══════════════════════════════════════════════════════ */
function loadWebview(url) {
  const webview = $('#lecture-webview');
  const loading = $('#webview-loading');

  show(loading);
  webview.style.opacity = '0';
  webview.src = url;
}

function initWebviewEvents() {
  const webview = $('#lecture-webview');
  const loading = $('#webview-loading');

  webview.addEventListener('did-start-loading', () => {
    show(loading);
    webview.style.opacity = '0';
  });

  webview.addEventListener('did-finish-load', () => {
    hide(loading);
    // CSS injection: transform-origin 및 이미지 안전 처리
    webview.insertCSS(`
      .stage, .deck {
        transform-origin: center center !important;
      }
      img, video, canvas {
        max-width: 100% !important;
        height: auto !important;
      }
    `).catch(() => {});
    // 뷰포트 크기 재계산 트리거 (resize 이벤트로 scale-to-fit 재실행)
    webview.executeJavaScript('window.dispatchEvent(new Event("resize"))').catch(() => {});
    webview.style.opacity = '1';
  });

  webview.addEventListener('did-fail-load', (_e) => {
    hide(loading);
    webview.style.opacity = '1';
  });

  // 디버그 오버레이 비활성화됨
}

/* ═══════════════════════════════════════════════════════
   NOTES PANEL
═══════════════════════════════════════════════════════ */
function toggleNotes() {
  state.notesOpen = !state.notesOpen;
  const panel = $('#notes-panel');

  if (state.notesOpen) {
    show(panel);
    $('#notes-textarea').focus();
    $('#btn-notes-toggle').classList.add('active');
  } else {
    hide(panel);
    $('#btn-notes-toggle').classList.remove('active');
    saveCurrentNote();
  }
}

function saveCurrentNote() {
  const key = state.isAppendixMode
    ? 'appendix:' + state.activeSessionId
    : state.activeSessionId;
  if (key) store.setNote(key, $('#notes-textarea').value);
}

/* ═══════════════════════════════════════════════════════
   PRINT / PDF
═══════════════════════════════════════════════════════ */
function getCurrentTitle() {
  return ($('#player-session-title')?.textContent || 'vibe-coding-material').trim();
}

function sanitizeFilename(name) {
  return name.replace(/[\\/:*?"<>|]/g, '-').replace(/\s+/g, ' ').trim() || 'vibe-coding-material';
}

function notify(message) {
  let toast = $('#app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function getLectureWebview() {
  return $('#lecture-webview');
}

async function printCurrentContent() {
  const webview = getLectureWebview();
  if (!webview || !webview.src) return;

  try {
    await webview.print({ printBackground: true });
  } catch (err) {
    console.error('인쇄 실패:', err);
    notify('인쇄 창을 열지 못했습니다.');
  }
}

async function saveCurrentPdf() {
  const webview = getLectureWebview();
  if (!webview || !webview.src || typeof webview.printToPDF !== 'function') {
    notify('PDF 저장을 사용할 수 없습니다.');
    return;
  }

  try {
    notify('PDF를 만드는 중입니다...');
    const pdfData = await webview.printToPDF({
      landscape: !state.isAppendixMode,
      printBackground: true,
      pageSize: 'A4',
    });
    const defaultPath = `${sanitizeFilename(getCurrentTitle())}.pdf`;
    const result = await window.vibeCodingApp.savePdf(pdfData, defaultPath);
    if (result?.ok) notify('PDF 저장이 완료되었습니다.');
  } catch (err) {
    console.error('PDF 저장 실패:', err);
    notify('PDF 저장 중 오류가 발생했습니다.');
  }
}

/* ═══════════════════════════════════════════════════════
   COMMUNITY SHARE
═══════════════════════════════════════════════════════ */
function syncShareCommunityBtn(appendixId) {
  const btn = $('#btn-share-community');
  if (!btn) return;

  const canShare = Boolean(appendixId && state.isAppendixMode && getShareableResource(appendixId));
  btn.classList.toggle('hidden', !canShare);
  btn.disabled = !canShare;
}

function encodeBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function shareCurrentAppendixToCommunity() {
  if (!state.isAppendixMode || !state.activeSessionId) return;

  const resource = getShareableResource(state.activeSessionId);
  if (!resource) {
    notify('이 자료는 커뮤니티 공유 대상이 아닙니다.');
    return;
  }

  const resourcesUrl = getCommunityResourcesUrl();
  if (!resourcesUrl) {
    notify('커뮤니티 자료실 주소가 설정되어 있지 않습니다.');
    return;
  }

  try {
    const url = new URL(resourcesUrl);
    const payload = {
      version: 1,
      source: 'vibe-coding-basic-app',
      resource,
    };
    url.searchParams.set('vbcResource', encodeBase64Url(JSON.stringify(payload)));

    const result = await window.vibeCodingApp.openExternal(url.toString());
    if (result?.ok) {
      notify('커뮤니티 자료실을 열었습니다. 관리자 계정이면 자동 등록됩니다.');
    } else {
      notify(result?.message || '커뮤니티 자료실을 열지 못했습니다.');
    }
  } catch (err) {
    console.error('커뮤니티 공유 실패:', err);
    notify('공유 주소를 만들지 못했습니다.');
  }
}

/* ═══════════════════════════════════════════════════════
   PRESENTER MODE
═══════════════════════════════════════════════════════ */
async function togglePresenter() {
  state.presenterMode = !state.presenterMode;
  const isFS = await window.vibeCodingApp.toggleFullscreen();

  if (state.presenterMode) {
    hide($('#sidebar'));
    hide($('#player-topbar'));
    hide($('#player-footer'));
    hide($('#progress-bar-wrap'));
    if (state.notesOpen) hide($('#notes-panel'));
  } else {
    show($('#sidebar'));
    show($('#player-topbar'));
    if (!state.isAppendixMode) {
      show($('#player-footer'));
      show($('#progress-bar-wrap'));
    }
  }

  // 레이아웃 변경 후 webview 내부 scale-to-fit 재계산 트리거
  const webview = $('#lecture-webview');
  if (webview && webview.src) {
    setTimeout(() => {
      webview.executeJavaScript('window.dispatchEvent(new Event("resize"))').catch(() => {});
    }, 150);
  }
}

function exitPresenter() {
  if (!state.presenterMode) return;
  state.presenterMode = false;
  show($('#sidebar'));
  show($('#player-topbar'));
  if (!state.isAppendixMode) {
    show($('#player-footer'));
    show($('#progress-bar-wrap'));
  }
}

/* ═══════════════════════════════════════════════════════
   BACK NAVIGATION
═══════════════════════════════════════════════════════ */
function goBack() {
  saveCurrentNote();
  exitPresenter();
  if (state.isAppendixMode) {
    showAppendixList(state.appendixAudience);
  } else {
    selectCourse(state.activeCourseId || 'basic');
  }

  // 숨겼던 UI 복원
  show($('#btn-complete'));
  syncShareCommunityBtn(null);
}

/* ═══════════════════════════════════════════════════════
   EVENT BINDINGS
═══════════════════════════════════════════════════════ */
function bindEvents() {
  $('[data-nav="catalog"]').addEventListener('click', showCatalog);
  $('[data-nav="planner"]').addEventListener('click', showPlanner);

  // 사이드바: 자료실
  $('[data-nav="student-materials"]').addEventListener('click', () => showAppendixList('student'));
  $('[data-nav="instructor-library"]').addEventListener('click', () => showAppendixList('instructor'));

  // 플레이어: 뒤로가기
  $('#btn-back').addEventListener('click', goBack);

  // 플레이어: 즐겨찾기
  $('#btn-favorite').addEventListener('click', () => {
    if (!state.activeSessionId) return;
    store.toggleFavorite(state.activeSessionId);
    syncFavoriteBtn(state.activeSessionId);
  });

  // 플레이어: 완료 체크
  $('#btn-complete').addEventListener('click', () => {
    if (!state.activeSessionId || state.isAppendixMode) return;
    const current = store.isDone(state.activeSessionId);
    store.setProgress(state.activeSessionId, !current);
    syncCompleteBtn(state.activeSessionId);
    const found = getSession(state.activeSessionId);
    if (found) syncProgressBar(found.course);
    renderSidebar();

    // 대시보드 카드도 업데이트 (현재 보이는 뷰가 player일 때도 반영)
    const course = found?.course;
    if (course) renderSessionGrid(course, '');
  });

  // 플레이어: 메모 토글
  $('#btn-notes-toggle').addEventListener('click', toggleNotes);
  $('#btn-notes-close').addEventListener('click', toggleNotes);

  // 플레이어: 현재 자료 인쇄 / PDF 저장
  $('#btn-print-content').addEventListener('click', printCurrentContent);
  $('#btn-save-pdf').addEventListener('click', saveCurrentPdf);
  $('#btn-share-community').addEventListener('click', shareCurrentAppendixToCommunity);

  // 메모: 입력할 때 자동 저장
  $('#notes-textarea').addEventListener('input', saveCurrentNote);

  // 플레이어: 발표자 모드
  $('#btn-presenter').addEventListener('click', togglePresenter);

  // 플레이어: 이전 / 다음 강의
  $('#btn-prev-session').addEventListener('click', () => {
    const id = $('#btn-prev-session').dataset.targetId;
    if (id) openSession(id);
  });
  $('#btn-next-session').addEventListener('click', () => {
    const id = $('#btn-next-session').dataset.targetId;
    if (id) openSession(id);
  });

  // 이어서 보기 배너
  $('#resume-btn').addEventListener('click', () => {
    const id = $('#resume-btn').dataset.sessionId;
    if (id) openSession(id);
  });

  // 검색: 강의
  $('#search-sessions').addEventListener('input', (e) => {
    const course = getCourse(state.activeCourseId);
    if (course) renderSessionGrid(course, e.target.value.trim());
  });

  // 검색: 별첨
  $('#search-appendix').addEventListener('input', (e) => {
    renderAppendixGrid(e.target.value.trim());
  });

  $('#search-catalog').addEventListener('input', (e) => {
    renderCatalogGrid(e.target.value.trim());
  });

  $('#program-note').addEventListener('input', (e) => {
    store.setProgramNote(e.target.value);
    flashPlannerSaved();
  });

  // 키보드 단축키 (메인 프로세스에서 전달)
  window.vibeCodingApp.onShortcut((key) => {
    if (key === 'home') {
      saveCurrentNote();
      exitPresenter();
      showCatalog();
    } else if (key === 'escape') {
      if (state.presenterMode) {
        exitPresenter();
      } else if (state.view === 'player') {
        goBack();
      }
    }
  });

  // 전체화면 상태 변경 (OS 또는 F11로 나갔을 때)
  window.vibeCodingApp.onFullscreenChanged((isFS) => {
    if (!isFS && state.presenterMode) {
      exitPresenter();
      state.presenterMode = false;
    }
  });

  // 키보드: 렌더러에서 직접 처리 (webview 비활성 상태일 때)
  document.addEventListener('keydown', (e) => {
    if (state.view !== 'player' || state.isAppendixMode) return;
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

    if (e.key === 'ArrowLeft' && !e.ctrlKey) {
      const id = $('#btn-prev-session').dataset.targetId;
      if (id && !$('#btn-prev-session').disabled) openSession(id);
    }
    if (e.key === 'ArrowRight' && !e.ctrlKey) {
      const id = $('#btn-next-session').dataset.targetId;
      if (id && !$('#btn-next-session').disabled) openSession(id);
    }
    if (e.key === 'm' || e.key === 'M') {
      toggleNotes();
    }

    // 판서 단축키 (Ctrl+Shift+D)
    if (e.ctrlKey && e.shiftKey && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      toggleDrawingBoard();
    }

    // 고대비 단축키 (Ctrl+Shift+C)
    if (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      toggleHighContrastMode();
    }
  });

  // 판서
  $('#btn-board-toggle').addEventListener('click', toggleDrawingBoard);
}

/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
async function init() {
  try {
    [state.manifest, state.contentBase, state.isDev, state.shareConfig] = await Promise.all([
      window.vibeCodingApp.readManifest(),
      window.vibeCodingApp.getContentBase(),
      window.vibeCodingApp.isDev(),
      window.vibeCodingApp.readShareResources(),
    ]);
  } catch (err) {
    console.error('매니페스트 로드 실패:', err);
    document.body.innerHTML = `<div style="color:#fff;padding:40px;font-family:sans-serif">
      <h2>오류: 강의 데이터를 불러올 수 없습니다.</h2>
      <p style="color:#999">${err.message}</p>
    </div>`;
    return;
  }

  initWebviewEvents();
  initBoardDrawing();
  makeToolbarDraggable();
  renderSidebar();
  bindEvents();
  showCatalog();
}

document.addEventListener('DOMContentLoaded', init);

// =========================================================================
// 강의 운영 기능: 화면 판서와 빔 프로젝터용 고대비 모드
// =========================================================================

// 1. 가상 칠판 판서 드로잉 시스템
let drawColor = '#ff607d';
let drawSize = 4;
let isEraser = false;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initBoardDrawing() {
  const canvas = $('#board-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function startDrawing(e) {
    if (!canvas.classList.contains('active')) return;
    isDrawing = true;
    const pos = getEventPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function draw(e) {
    if (!isDrawing || !canvas.classList.contains('active')) return;
    const pos = getEventPos(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = drawSize * 4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = drawSize;
      ctx.strokeStyle = drawColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = drawColor;
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function getEventPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);

  $$('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.dataset.color;
      if (color === 'eraser') {
        isEraser = true;
      } else {
        isEraser = false;
        drawColor = color;
      }
    });
  });

  $$('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      drawSize = parseInt(btn.dataset.size);
    });
  });

  $('#btn-board-clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  $('#btn-board-close').addEventListener('click', toggleDrawingBoard);
}

function toggleDrawingBoard() {
  const canvas = $('#board-canvas');
  const toolbar = $('#board-toolbar');
  const btn = $('#btn-board-toggle');
  if (!canvas || !toolbar) return;

  const isActive = canvas.classList.toggle('active');
  toolbar.classList.toggle('hidden', !isActive);
  btn.classList.toggle('active', isActive);

  if (isActive) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function makeToolbarDraggable() {
  const toolbar = $('#board-toolbar');
  const handle = $('.toolbar-drag-handle');
  if (!toolbar || !handle) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - toolbar.offsetLeft;
    offsetY = e.clientY - toolbar.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  });

  function drag(e) {
    if (!isDragging) return;
    toolbar.style.left = `${e.clientX - offsetX}px`;
    toolbar.style.top = `${e.clientY - offsetY}px`;
    toolbar.style.bottom = 'auto';
    toolbar.style.transform = 'none';
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }
}

// 빔 프로젝터용 고대비 토글
let isHighContrastMode = false;

function toggleHighContrastMode() {
  isHighContrastMode = !isHighContrastMode;
  document.body.classList.toggle('high-contrast', isHighContrastMode);

  const webview = $('#lecture-webview');
  if (webview) {
    if (isHighContrastMode) {
      webview.insertCSS(`
        :root {
          --bg: #FFFFFF !important;
          --bg-soft: #F5F5F5 !important;
          --surface: #EAEAEA !important;
          --text: #000000 !important;
          --muted: #333333 !important;
          --line: rgba(0,0,0,0.2) !important;
          --line-strong: rgba(0,0,0,0.4) !important;
        }
        body, .deck {
          background: #FFFFFF !important;
          color: #000000 !important;
          background-image: none !important;
        }
        .slide {
          background: #FFFFFF !important;
          color: #000000 !important;
        }
        .slide h1, .slide h2, .slide h3 {
          color: #000000 !important;
        }
        .slide p {
          color: #222222 !important;
        }
        .kitchen-card, .session-card, .diff-line, .timeline-card, .outcome-card, .lab-box, .role-card {
          background: #FAFAFA !important;
          color: #000000 !important;
          border-color: #000000 !important;
        }
        .correct-btn, .quiz-opt-btn, .editable-code-text {
          background: #EAEAEA !important;
          color: #000000 !important;
          border-color: #000000 !important;
          text-shadow: none !important;
          box-shadow: none !important;
        }
        * {
          text-shadow: none !important;
          box-shadow: none !important;
        }
      `, { cssKeys: 'hc-style' }).catch(() => {});
    } else {
      webview.insertCSS(`
        :root {
          --bg: #0b0509 !important;
          --bg-soft: #140a11 !important;
          --surface: #1d0f19 !important;
          --text: #fdf5f7 !important;
        }
      `, { cssKeys: 'hc-style' }).catch(() => {});
    }
  }

  const btn = $('#btn-board-toggle').nextElementSibling.nextElementSibling;
  if (btn) btn.classList.toggle('active', isHighContrastMode);
}
