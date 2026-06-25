'use strict';

const appApi = window.vibeCodingApp || {
  readManifest: async () => {
    const response = await fetch('../content/course-manifest.json');
    if (!response.ok) throw new Error(`Manifest HTTP ${response.status}`);
    return response.json();
  },
  readOfficialSources: async () => {
    const response = await fetch('../content/sources/official-sources.json');
    if (!response.ok) throw new Error(`Sources HTTP ${response.status}`);
    return response.json();
  },
  getContentBase: async () => new URL('../content', location.href).href.replace(/\/$/, ''),
  toggleFullscreen: async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
    return Boolean(document.fullscreenElement);
  },
  savePdf: async () => ({ ok: false, canceled: true }),
  openExternal: async () => ({ ok: false }),
  saveData: async () => true,
  loadData: async () => null,
  exportData: async () => ({ ok: false, canceled: true }),
  importData: async () => ({ ok: false, canceled: true }),
  openContentPath: async () => ({ ok: false }),
  onShortcut: () => {},
};
const state = {
  manifest: null,
  sources: { version: 1, sources: {} },
  contentBase: '',
  courseId: localStorage.getItem('vibe-v3-course') || 'basic-current',
  tab: 'lessons',
  selectionId: null,
  completed: new Set(JSON.parse(localStorage.getItem('vibe-v3-completed') || '[]')),
  notes: JSON.parse(localStorage.getItem('vibe-v3-notes') || '{}'),
  schedule: JSON.parse(localStorage.getItem('vibe-v3-schedule') || '{}'),
  revisionOverrides: JSON.parse(localStorage.getItem('vibe-v3-revision-overrides') || '{}'),
  revisionSelection: {},
  lessonStep: JSON.parse(localStorage.getItem('vibe-v3-lesson-step') || '{}'),
  libFilter: 'all',
  lowMotion: localStorage.getItem('vibe-v3-low-motion') === 'true',
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

function lineIcon(name) {
  const icons = {
    play: '<path d="M8 5v14l11-7z"></path>',
    script: '<path d="M7 4h8l4 4v12H7z"></path><path d="M15 4v5h5"></path><path d="M10 13h7"></path><path d="M10 16h5"></path>',
    print: '<path d="M7 9V4h10v5"></path><path d="M6 14H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"></path><path d="M7 13h10v7H7z"></path>',
    source: '<path d="M12 4v16"></path><path d="M5 8h14"></path><path d="M5 16h14"></path><path d="M8 4c-2 3-2 13 0 16"></path><path d="M16 4c2 3 2 13 0 16"></path>',
    library: '<path d="M4 6h6v14H4z"></path><path d="M14 4h6v16h-6z"></path><path d="M7 9h0"></path><path d="M17 8h0"></path>',
    note: '<path d="M6 4h12v16H6z"></path><path d="M9 8h6"></path><path d="M9 12h6"></path><path d="M9 16h4"></path>',
  };
  return `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.note}</svg>`;
}

function persist(key, value) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  appApi?.saveData?.(key, value);
}

function applyImportedData(data) {
  Object.entries(data || {}).forEach(([key, value]) => {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  });
  location.reload();
}

function getCourse(id = state.courseId) {
  return state.manifest.courses.find((course) => course.id === id);
}

function visibleCourses() {
  return state.manifest.courses;
}

function setAccent(course) {
  document.documentElement.style.setProperty('--accent', course.color || '#d8ff66');
}

function statusLabel(status) {
  return {
    draft: '초안',
    review: '검수 중',
    pilot: '파일럿',
    ready: '준비 완료',
    active: '운영 중',
    archived: '보관',
    preview: '미리보기',
  }[status] || status || '준비 중';
}

function getSessionRevision(session) {
  if (!session.revisions?.length) return { ...session, revisionId: null };
  const activeId = state.revisionOverrides[session.id] || session.activeRevision || session.revisions[0].id;
  const selectedId = state.revisionSelection[session.id] || activeId;
  const revision = session.revisions.find((item) => item.id === selectedId) || session.revisions[0];
  return {
    ...session,
    ...revision,
    id: session.id,
    title: session.title,
    subtitle: session.subtitle,
    description: session.description,
    preparation: session.preparation,
    deliverables: session.deliverables,
    revisionId: revision.id,
    activeRevisionId: activeId,
  };
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
  // Navigation reduced to two modes. Official source study notes are now part of the course library.
  const validTabs = ['lessons', 'library'];
  if (!validTabs.includes(state.tab)) {
    state.tab = ['instructor', 'student', 'labs', 'sources'].includes(state.tab) ? 'library' : 'lessons';
  }
  $('#course-kicker').textContent = `${course.code} · ${course.track || course.family}`;
  $('#course-title').textContent = course.title;
  $('#course-route').textContent = course.route;
  $('#detail-course-code').textContent = course.code;
  $$('#course-tabs button').forEach((button) => button.classList.toggle('active', button.dataset.tab === state.tab));

  if (state.tab === 'library') renderLibrary(course);
  else renderLessons(course);
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
        <span class="lesson-copy"><b>${escapeHtml(session.title.replace(/^\d+강\s*·\s*/, ''))}</b><span>${escapeHtml(session.subtitle || session.description)}</span><em class="readiness ${escapeHtml(session.status || 'active')}">${escapeHtml(statusLabel(session.status || 'active'))}</em></span>
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

function courseProgress(course) {
  const total = course.sessions?.length || 0;
  const done = (course.sessions || []).filter((session) => state.completed.has(session.id)).length;
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function sessionSources(session) {
  return (session.sourceKeys || [])
    .map((key) => ({ key, source: state.sources?.sources?.[key] }))
    .filter((item) => item.source);
}

function sessionRecovery(session) {
  const drill = session.professional?.failureDrill || [];
  const firstDrill = drill[0] || '';
  const error = session.error || {};
  return {
    symptom: error.symptom || firstDrill || '현장 시연 또는 실습이 막히는 상황',
    trace: error.trace || '로그·화면·권한·설정 중 첫 단서를 확인',
    fix: error.fix || drill[drill.length - 1] || '오류를 복사해 AI에게 원인 분석을 맡기고, 수정 후 다시 실행',
  };
}

const LESSON_STEPS = ['준비', '도입', '실습', 'Q&A', '마무리'];

// Course-level materials, re-pointed for the current lesson. Instructor scripts
// carry "N강" in their titles, so the matching lesson's 대본 is surfaced first.
function lessonMaterials(course, lessonNo) {
  const tag = (arr) => (arr || []).map((material) => ({ ...material, courseId: course.id, courseCode: course.code }));
  const instructor = tag(course.materials?.instructor);
  const student = tag(course.materials?.student);
  const isLesson = (material) => material.title.includes(`${lessonNo}강`);
  const byLesson = (arr) => [...arr].sort((a, b) => (isLesson(b) ? 1 : 0) - (isLesson(a) ? 1 : 0));
  return {
    instructor,
    student,
    instructorSorted: byLesson(instructor),
    studentSorted: byLesson(student),
    script: instructor.find(isLesson) || instructor.find((m) => m.title.includes('대본')) || instructor[0] || null,
    print: student.find((m) => m.title.includes('워크북')) || student[0] || null,
  };
}

function renderLessonDetail(course, session) {
  const index = course.sessions.findIndex((item) => item.id === session.id);
  const lessonNo = index + 1;
  const selected = getSessionRevision(session);
  const revisions = session.revisions || [];
  const progress = courseProgress(course);
  const currentSchedule = state.schedule[course.id] || {};
  const notePreview = state.programNote || currentSchedule.note || '오늘 수업에서 강조할 포인트와 현장 변수를 기록하세요.';
  const sources = sessionSources(session);
  const recovery = sessionRecovery(session);
  const mats = lessonMaterials(course, lessonNo);
  const preparation = session.preparation || ['개인 노트북', '현재 프로젝트'];
  const deliverables = session.deliverables || ['수업 실습 결과'];
  const cleanTitle = session.title.replace(/^\d+강\s*·\s*/, '');
  const completed = state.completed.has(session.id);
  const lastStep = LESSON_STEPS.length - 1;
  const supplementMaterials = mats.studentSorted.filter(isSupplementMaterial);
  // A completed lesson reads as "마무리"(last step); otherwise use the stored step.
  const currentStep = completed ? lastStep : Math.min(lastStep, Math.max(0, state.lessonStep[session.id] ?? 0));

  const revisionControl = revisions.length > 1
    ? `
      <section class="revision-panel">
        <div>
          <span>LESSON VERSION</span>
          <strong>${escapeHtml(statusLabel(selected.status))} · ${escapeHtml(selected.revision || '')}</strong>
        </div>
        <select id="revision-select">
          ${revisions.map((revision) => `<option value="${escapeHtml(revision.id)}"${revision.id === selected.revisionId ? ' selected' : ''}>${escapeHtml(revision.label)} · ${escapeHtml(statusLabel(revision.status))}</option>`).join('')}
        </select>
        <button id="btn-promote-revision" class="secondary-action" type="button">${selected.revisionId === selected.activeRevisionId ? '현재 활성본' : '이 버전을 운영본으로 승격'}</button>
      </section>`
    : '';

  $('#detail-position').textContent = `LESSON ${String(lessonNo).padStart(2, '0')} / ${String(course.sessions.length).padStart(2, '0')}`;

  const resourceItem = (attrs, icon, title, sub, disabled = false) => `
    <button type="button" class="resource-item${disabled ? ' disabled' : ''}"${disabled ? ' disabled' : ` ${attrs}`}>
      <i>${lineIcon(icon)}</i><span><b>${escapeHtml(title)}</b><small>${escapeHtml(sub)}</small></span><em>열기</em>
    </button>`;

  const resourceGroups = `
    <div class="resource-group">
      <h4>강의자료</h4>
      ${resourceItem('data-res-deck', 'play', cleanTitle, '슬라이드 · 강의 실행')}
    </div>
    <div class="resource-group">
      <h4>강사용 연구자료<button type="button" class="group-more" data-dashboard-tab="library">전체</button></h4>
      ${mats.instructorSorted.slice(0, 3).map((m) => resourceItem(`data-res-material="${escapeHtml(m.id)}" data-res-audience="instructor"`, 'script', m.title, m.description)).join('') || '<p class="empty-state">아직 연결된 강사용 연구자료가 없습니다. 공식자료 요약에서 먼저 확인하세요.</p>'}
    </div>
    <div class="resource-group">
      <h4>강의 보충자료<button type="button" class="group-more" data-dashboard-tab="library">전체</button></h4>
      ${supplementMaterials.slice(0, 3).map((m) => resourceItem(`data-res-material="${escapeHtml(m.id)}" data-res-audience="student"`, 'print', m.title, m.description)).join('') || '<p class="empty-state">수강생에게 추가로 설명할 보충자료가 아직 없습니다.</p>'}
    </div>
    <div class="resource-group">
      <h4>공식자료 요약<button type="button" class="group-more" data-dashboard-tab="library">전체</button></h4>
      ${sources.slice(0, 4).map(({ key, source }) => resourceItem(`data-res-source="${escapeHtml(key)}"`, 'source', source.title, `${source.publisher} · ${source.maturity || 'study note'}`)).join('') || '<p class="empty-state">이 강의에 연결된 공식자료가 없습니다.</p>'}
    </div>`;

  $('#detail-content').innerHTML = `
    <div class="lesson-workspace">
      <section class="workspace-hero">
        <div class="wh-main">
          <span class="detail-number">TODAY · LESSON ${String(lessonNo).padStart(2, '0')}</span>
          <h2>${escapeHtml(cleanTitle)}</h2>
          <p class="detail-subtitle">${escapeHtml(session.subtitle || session.description)}</p>
          <div class="wh-meta">
            <span>${escapeHtml(session.duration || '120분')}</span>
            <span>${escapeHtml(statusLabel(selected.status))}</span>
            <span>${escapeHtml(currentSchedule.cohort || course.cohort || course.curriculumVersion || '')}</span>
          </div>
          <div class="wh-progress" title="${progress.done}/${progress.total} 완료">
            <div class="wh-bar"><i style="width:${progress.pct}%"></i></div>
            <span>${progress.done}/${progress.total}강 완료 · ${progress.pct}%</span>
          </div>
        </div>
        <div class="wh-actions">
          <button class="primary-action" id="btn-open-lesson" type="button"><i>${lineIcon('play')}</i> 강의 시작</button>
          <button class="secondary-action" id="btn-open-script" type="button"${mats.script ? '' : ' disabled'}>대본 열기</button>
          <button class="secondary-action" id="btn-open-print" type="button"${mats.print ? '' : ' disabled'}>출력물 열기</button>
          <button class="ghost-action${completed ? ' is-complete' : ''}" id="btn-toggle-complete" type="button">${completed ? '✓ 완료됨' : '완료로 표시'}</button>
        </div>
      </section>

      <section class="lesson-stepper" aria-label="수업 진행 단계">
        <span class="stepper-label">수업 진행 단계</span>
        <ol>
          ${LESSON_STEPS.map((label, i) => `<li class="${i < currentStep ? 'done' : ''}${i === currentStep ? ' current' : ''}"><button type="button" data-step="${i}">${escapeHtml(label)}</button>${i === currentStep ? `<em>${completed && i === lastStep ? '완료' : '진행중'}</em>` : ''}</li>`).join('')}
        </ol>
      </section>

      <section class="lesson-resources">
        <div class="card-head"><span>이 강의의 자료</span><b>탭 이동 없이 한 화면에서</b></div>
        <div class="resource-groups">
          ${resourceGroups}
        </div>
      </section>

      <section class="workspace-aux">
        <article class="aux-card">
          <div class="card-head"><span>최근 메모</span><b>${escapeHtml(currentSchedule.cohort || course.cohort || '현재 기수')}</b></div>
          <p class="note-copy">${escapeHtml(notePreview)}</p>
          <button class="secondary-action compact" id="btn-open-planner-card" type="button">메모 열기</button>
        </article>
        <article class="aux-card">
          <div class="card-head"><span>주의사항</span><b>막혔을 때</b></div>
          <div class="recovery-card">
            <strong>${escapeHtml(recovery.symptom)}</strong>
            <p>${escapeHtml(recovery.fix)}</p>
          </div>
        </article>
        <article class="aux-card">
          <div class="card-head"><span>준비물 · 결과물</span><b>수업 전후</b></div>
          <div class="split-lists">
            <div><h4>준비물</h4><ul class="clean-list">${preparation.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
            <div><h4>결과물</h4><ul class="clean-list">${deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
          </div>
        </article>
      </section>

      ${revisionControl}

      <div class="detail-meta">
        <span>${escapeHtml(selected.revision || course.curriculumVersion || '')}</span>
        <span>${escapeHtml(course.route || '')}</span>
        <span>${escapeHtml(course.status || '')}</span>
      </div>
    </div>
  `;

  $('#btn-open-lesson').addEventListener('click', () => openPlayer(course, selected));
  $('#btn-toggle-complete').addEventListener('click', () => toggleComplete(session.id));
  if (mats.script) $('#btn-open-script').addEventListener('click', () => openPlayer(course, mats.script, true));
  if (mats.print) $('#btn-open-print').addEventListener('click', () => openPlayer(course, mats.print, true));
  $('#btn-open-planner-card')?.addEventListener('click', () => openDrawer('planner'));

  $$('#detail-content [data-step]').forEach((button) => button.addEventListener('click', () => {
    const step = Number(button.dataset.step);
    state.lessonStep[session.id] = step;
    persist('vibe-v3-lesson-step', state.lessonStep);
    // Keep completion in sync: reaching 마무리 completes the lesson, stepping back un-completes it.
    const shouldComplete = step === LESSON_STEPS.length - 1;
    if (shouldComplete !== state.completed.has(session.id)) toggleComplete(session.id);
    else renderLessonDetail(course, session);
  }));
  $('#detail-content [data-res-deck]')?.addEventListener('click', () => openPlayer(course, selected));
  $$('#detail-content [data-res-material]').forEach((button) => button.addEventListener('click', () => {
    const pool = button.dataset.resAudience === 'instructor' ? mats.instructor : mats.student;
    const material = pool.find((m) => m.id === button.dataset.resMaterial);
    if (material) openPlayer(course, material, true);
  }));
  $$('#detail-content [data-res-source]').forEach((button) => button.addEventListener('click', () => {
    state.tab = 'library';
    state.libFilter = 'all';
    state.selectionId = button.dataset.resSource;
    renderStudio();
  }));
  $$('#detail-content [data-dashboard-tab]').forEach((button) => button.addEventListener('click', (event) => {
    event.stopPropagation();
    state.tab = button.dataset.dashboardTab;
    state.selectionId = null;
    renderStudio();
  }));

  if ($('#revision-select')) {
    $('#revision-select').addEventListener('change', (event) => {
      state.revisionSelection[session.id] = event.target.value;
      renderLessonDetail(course, session);
    });
    $('#btn-promote-revision').disabled = selected.revisionId === selected.activeRevisionId;
    $('#btn-promote-revision').addEventListener('click', () => {
      state.revisionOverrides[session.id] = selected.revisionId;
      persist('vibe-v3-revision-overrides', state.revisionOverrides);
      renderLessonDetail(course, session);
    });
  }
}

// Combined course library: extra explanations, instructor research notes, and
// official-source summaries. Executable lab folders stay in the project but are
// intentionally not surfaced here because they read like file management.
function lessonNoFromTitle(title) {
  const match = String(title || '').match(/(\d+)\s*강/);
  return match ? Number(match[1]) : null;
}

function isSupplementMaterial(material) {
  return !/(워크북|작업지|기록|평가표|제출|체크리스트|practice)/i.test(`${material.id || ''} ${material.title || ''}`);
}

function libraryEntries(course) {
  const entries = [];
  (course.materials?.student || []).filter(isSupplementMaterial).forEach((m) => entries.push({
    kind: 'material',
    audience: 'student',
    id: m.id,
    group: '강의 보충자료',
    lessonNo: lessonNoFromTitle(m.title),
    material: { ...m, courseId: course.id, courseCode: course.code },
  }));
  (course.materials?.instructor || []).forEach((m) => entries.push({
    kind: 'material',
    audience: 'instructor',
    id: m.id,
    group: '강사용 연구자료',
    lessonNo: lessonNoFromTitle(m.title),
    material: { ...m, courseId: course.id, courseCode: course.code },
  }));
  const sourceKeys = [...new Set((course.sessions || []).flatMap((session) => session.sourceKeys || []))];
  sourceKeys.forEach((key) => {
    const source = state.sources?.sources?.[key];
    if (source) {
      entries.push({
        kind: 'source',
        id: key,
        group: '공식자료 요약',
        lessonNo: null,
        source,
        usage: sourceUsageRows(key),
      });
    }
  });
  return entries;
}

function renderLibrary(course) {
  const entries = libraryEntries(course);
  $('#detail-position').textContent = 'COURSE LIBRARY';
  if (!entries.length) {
    state.libFilter = 'all';
    $('#list-summary').textContent = `0 RESOURCES · ${course.shortTitle}`;
    $('#lesson-list').innerHTML = '<div class="command-empty">이 과정에 연결된 자료가 없습니다.</div>';
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 자료가 없습니다.</div>';
    return;
  }

  // Filter set: 전체 · 공통(회차 미지정) · 회차별(자료가 있는 회차만).
  const lessonNos = [...new Set(entries.map((entry) => entry.lessonNo).filter((n) => n != null))].sort((a, b) => a - b);
  const hasCommon = entries.some((entry) => entry.lessonNo == null);
  const filters = ['all', ...(hasCommon ? ['common'] : []), ...lessonNos.map((n) => `lesson-${n}`)];
  if (!filters.includes(state.libFilter)) state.libFilter = 'all';
  const filterLabel = (filter) => (filter === 'all' ? '전체' : filter === 'common' ? '공통' : `${filter.replace('lesson-', '')}강`);
  const inFilter = (entry) => {
    if (state.libFilter === 'all') return true;
    if (state.libFilter === 'common') return entry.lessonNo == null;
    return `lesson-${entry.lessonNo}` === state.libFilter;
  };
  const filtered = entries.filter(inFilter);
  if (!state.selectionId || !filtered.some((entry) => entry.id === state.selectionId)) state.selectionId = filtered[0]?.id;
  $('#list-summary').textContent = `${filtered.length} LIBRARY NOTES · ${course.shortTitle}`;

  const chips = `<div class="lib-filter">${filters.map((filter) => `<button type="button" class="lib-chip${filter === state.libFilter ? ' active' : ''}" data-lib-filter="${escapeHtml(filter)}">${escapeHtml(filterLabel(filter))}</button>`).join('')}</div>`;

  let lastGroup = null;
  let position = 0;
  const rows = [];
  filtered.forEach((entry) => {
    if (entry.group !== lastGroup) {
      rows.push(`<div class="module-label">${escapeHtml(entry.group)}</div>`);
      lastGroup = entry.group;
    }
    position += 1;
    const lessonTag = entry.lessonNo != null ? `${entry.lessonNo}강` : '공통';
    if (entry.kind === 'material') {
      rows.push(`
        <button class="lesson-row material-row${entry.id === state.selectionId ? ' active' : ''}" type="button" data-lib-material="${escapeHtml(entry.id)}" data-lib-audience="${entry.audience}">
          <span class="lesson-no">${String(position).padStart(2, '0')}</span>
          <span class="lesson-copy"><b>${escapeHtml(entry.material.title)}</b><span>${escapeHtml(entry.material.description)}</span><span class="material-audience">${entry.audience === 'instructor' ? '강사용 연구자료' : '강의 보충자료'} · ${escapeHtml(lessonTag)}</span></span>
          <span class="lesson-state">›</span>
        </button>`);
    } else if (entry.kind === 'source') {
      rows.push(`
        <button class="lesson-row source-row${entry.id === state.selectionId ? ' active' : ''}" type="button" data-lib-source="${escapeHtml(entry.id)}">
          <span class="lesson-no">${String(position).padStart(2, '0')}</span>
          <span class="lesson-copy"><b>${escapeHtml(entry.source.title)}</b><span>${escapeHtml(entry.source.coreConceptKo || entry.source.summaryKo || entry.source.publisher)}</span><span class="material-audience">${escapeHtml(entry.source.publisher)} · 공식자료 요약</span></span>
          <span class="lesson-state">›</span>
        </button>`);
    }
  });
  $('#lesson-list').innerHTML = chips + (rows.join('') || '<div class="empty-panel"><b>표시할 자료가 없습니다.</b><span>이 회차에는 아직 보충자료가 없습니다. 공식자료 요약이나 강사용 연구자료를 먼저 연결하세요.</span></div>');
  $$('#lesson-list [data-lib-filter]').forEach((button) => button.addEventListener('click', () => {
    state.libFilter = button.dataset.libFilter;
    renderLibrary(course);
  }));
  $$('#lesson-list [data-lib-material]').forEach((button) => button.addEventListener('click', () => {
    state.selectionId = button.dataset.libMaterial;
    renderLibrary(course);
  }));
  $$('#lesson-list [data-lib-source]').forEach((button) => button.addEventListener('click', () => {
    state.selectionId = button.dataset.libSource;
    renderLibrary(course);
  }));

  const selected = filtered.find((entry) => entry.id === state.selectionId);
  if (!selected) {
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 자료가 없습니다.</div>';
    return;
  }
  if (selected.kind === 'material') renderMaterialDetail(course, selected.material, selected.audience);
  else renderSourceDetail(selected);
}

function renderMaterialDetail(course, material, audience) {
  $('#detail-position').textContent = audience === 'student' ? 'SUPPLEMENT NOTE' : 'INSTRUCTOR RESEARCH';
  if (!material) {
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 자료가 없습니다.</div>';
    return;
  }
  const materialKind = audience === 'instructor' ? '강사용 연구자료' : '강의 보충자료';
  const supportPoints = audience === 'instructor'
    ? ['공식 문서를 강의 언어로 바꾸는 연구노트', '슬라이드에 넣지 않는 심화 배경과 예상 오해', '현장 시연·오류 복구·질문 대응 기준']
    : ['슬라이드에 다 담지 못한 추가 설명', '명령어·개념·체크리스트를 한 번에 확인', '수업 후 다시 읽을 수 있는 밝은 A4 자료'];
  $('#detail-content').innerHTML = `
    <div class="material-preview">
      <span class="detail-number">${escapeHtml(course.code)} · ${escapeHtml(materialKind)}</span>
      <h2>${escapeHtml(material.title)}</h2>
      <p>${escapeHtml(material.description)}</p>
      <div class="paper-preview clean">
        <div class="paper-sheet">
          <header></header>
          ${Array.from({ length: 9 }, (_, index) => `<i style="width:${index % 4 === 0 ? 72 : 96 - (index % 3) * 14}%"></i>`).join('')}
        </div>
        <div class="paper-copy">
          <h3>수강생이 작성하는 빈 양식이 아니라, 강의를 보충하는 설명 자료입니다.</h3>
          <p>슬라이드에서는 흐름과 장면을 보여주고, 자료실에서는 수업 후 다시 읽을 수 있는 설명·근거·체크 기준을 제공합니다.</p>
          <ul>${supportPoints.map((item) => `<li>${lineIcon('note')} ${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="material-note-grid">
        <section><span>역할</span><b>${escapeHtml(materialKind)}</b><p>강의 화면에 넣으면 복잡해지는 설명을 별도 자료로 정리합니다.</p></section>
        <section><span>사용 시점</span><b>수업 전후</b><p>수업 중에는 핵심만 보여주고, 복습과 준비는 자료실에서 확인합니다.</p></section>
        <section><span>출력 기준</span><b>A4 / PDF</b><p>인쇄와 핸드폰 저장에서 읽기 쉬운 밝은 배경을 기준으로 엽니다.</p></section>
      </div>
      <div class="lesson-actions">
        <button class="primary-action" id="btn-open-material" type="button">자료 열기</button>
      </div>
    </div>
  `;
  $('#btn-open-material').addEventListener('click', () => openPlayer(course, material, true));
}

function sourceUsageRows(sourceKey) {
  return visibleCourses().flatMap((course) => course.sessions
    .filter((session) => session.sourceKeys?.includes(sourceKey))
    .map((session) => `${course.code} ${session.title.replace(/^\d+강\s*·\s*/, '')}`));
}

function renderSources(course) {
  const catalog = state.sources?.sources || {};
  const usedKeys = [...new Set(visibleCourses().flatMap((item) => item.sessions.flatMap((session) => session.sourceKeys || [])))];
  const rows = usedKeys.map((key) => ({ key, source: catalog[key], usage: sourceUsageRows(key) }))
    .filter((item) => item.source)
    .sort((a, b) => `${a.source.publisher} ${a.source.title}`.localeCompare(`${b.source.publisher} ${b.source.title}`, 'ko'));
  if (!state.selectionId || !rows.some((row) => row.key === state.selectionId)) state.selectionId = rows[0]?.key;
  $('#list-summary').textContent = `${rows.length} OFFICIAL SOURCES · STUDY NOTES`;
  $('#lesson-list').innerHTML = rows.map((row, index) => `
    <button class="lesson-row source-row${row.key === state.selectionId ? ' active' : ''}" type="button" data-source="${escapeHtml(row.key)}">
      <span class="lesson-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="lesson-copy"><b>${escapeHtml(row.source.title)}</b><span>${escapeHtml(row.source.summaryKo || row.source.coreConceptKo)}</span><span class="material-audience">${escapeHtml(row.source.publisher)} · ${escapeHtml(row.source.maturity)}</span></span>
      <span class="lesson-state">›</span>
    </button>
  `).join('') || '<div class="command-empty">연결된 공식자료가 없습니다.</div>';
  $$('#lesson-list [data-source]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectionId = button.dataset.source;
      renderSources(course);
    });
  });
  renderSourceDetail(rows.find((row) => row.key === state.selectionId));
}

function renderSourceDetail(row) {
  $('#detail-position').textContent = 'OFFICIAL SOURCE STUDY';
  if (!row?.source) {
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 공식자료가 없습니다.</div>';
    return;
  }
  const source = row.source;
  const checks = source.preClassCheck || [];
  const questions = source.expectedQuestions || [];
  $('#detail-content').innerHTML = `
    <div class="source-detail">
      <span class="detail-number">${escapeHtml(source.publisher)} · ${escapeHtml(source.maturity)}</span>
      <h2>${escapeHtml(source.title)}</h2>
      <p>${escapeHtml(source.coreConceptKo || source.summaryKo)}</p>
      <div class="source-grid">
        <section><h3>강사가 이해할 배경</h3><p>${escapeHtml(source.instructorBackground || source.instructorNote)}</p></section>
        <section><h3>쉬운 비유</h3><p>${escapeHtml(source.classroomAnalogy || source.summaryKo)}</p></section>
        <section><h3>자주 생기는 오해</h3><p>${escapeHtml(source.commonMisunderstanding || source.instructorNote)}</p></section>
        <section><h3>시연 포인트</h3><p>${escapeHtml(source.demoPoint || source.instructorNote)}</p></section>
      </div>
      <div class="objective-box">
        <span>강의 반영 위치</span>
        <p>${escapeHtml(row.usage.join(' · ') || source.lectureUseHint || '공통 연구자료')}</p>
      </div>
      <div class="detail-grid">
        <section class="info-panel"><h3>예상 질문</h3><ul>${questions.map((item) => `<li><b>${escapeHtml(item.q)}</b><br>${escapeHtml(item.a)}</li>`).join('') || '<li>수업 중 질문을 기록합니다.</li>'}</ul></section>
        <section class="info-panel"><h3>수업 전 재확인</h3><ul>${checks.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
      </div>
      <div class="lesson-actions">
        <button class="primary-action" id="btn-open-source-material" type="button">과정별 연구노트 열기</button>
        <button class="secondary-action" id="btn-open-source-url" type="button">공식 문서 열기</button>
      </div>
      <div class="detail-meta">
        <span>${escapeHtml(row.key)}</span>
        <span>${escapeHtml(source.status || 'not checked')} · HTTP ${escapeHtml(source.httpStatus || '-')}</span>
        <span>${escapeHtml(source.checkedAt || state.sources.checkedAt || 'not checked')}</span>
      </div>
    </div>
  `;
  $('#btn-open-source-material').addEventListener('click', () => {
    const sourceCourse = visibleCourses().find((item) => item.sessions.some((session) => session.sourceKeys?.includes(row.key))) || getCourse();
    openPlayer(sourceCourse, {
      id: `${sourceCourse.id}-source-study`,
      title: `${sourceCourse.shortTitle} · 공식자료 연구노트`,
      duration: 'A4 STUDY',
      file: `v3/material.html?course=${sourceCourse.id}&kind=source-study&audience=instructor`,
    }, true);
  });
  $('#btn-open-source-url').addEventListener('click', () => appApi.openExternal?.(source.url));
}

function renderLabDetail(course, session) {
  $('#detail-position').textContent = 'PRACTICE FILES';
  if (!session?.demoProject) {
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 실습 파일이 없습니다.</div>';
    return;
  }
  const lab = session.demoProject;
  const variants = [
    ['starter', '시작본', '수강생이 직접 작업을 시작하는 최소 상태'],
    ['broken', '오류본', '수업에서 원인을 찾고 복구하는 실패 상태'],
    ['complete', '완성본', '정상 흐름과 완료 기준을 확인하는 상태'],
  ];
  $('#detail-content').innerHTML = `
    <div class="lab-detail">
      <span class="detail-number">${escapeHtml(course.code)} · EXECUTABLE LAB</span>
      <h2>${escapeHtml(session.title.replace(/^\d+강\s*·\s*/, ''))}</h2>
      <p>${escapeHtml(session.description)}</p>
      <div class="lab-variants">
        ${variants.map(([key, title, copy]) => `
          <article class="lab-variant ${key}">
            <span>${escapeHtml(key.toUpperCase())}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(copy)}</p>
            <div>
              <button class="secondary-action" type="button" data-preview-lab="${key}">미리보기</button>
              <button class="secondary-action" type="button" data-open-lab="${key}">폴더 열기</button>
            </div>
          </article>`).join('')}
      </div>
      <div class="lab-command">
        <span>LOCAL COMMAND</span>
        <code>npm run dev:starter · npm run dev:broken · npm run dev:complete</code>
        <button id="btn-open-lab-root" class="primary-action" type="button">전체 실습 폴더 열기</button>
      </div>
    </div>
  `;
  $$('[data-preview-lab]').forEach((button) => {
    button.addEventListener('click', () => {
      const variant = button.dataset.previewLab;
      openPlayer(course, {
        id: `${session.id}-${variant}`,
        title: `${session.title} · ${variant}`,
        duration: 'OFFLINE LAB',
        file: `${lab.root}/${variant}/index.html`,
      }, true);
    });
  });
  $$('[data-open-lab]').forEach((button) => {
    button.addEventListener('click', () => appApi.openContentPath(`${lab.root}/${button.dataset.openLab}`));
  });
  $('#btn-open-lab-root').addEventListener('click', () => appApi.openContentPath(lab.root));
}

function toggleComplete(sessionId) {
  if (state.completed.has(sessionId)) state.completed.delete(sessionId);
  else state.completed.add(sessionId);
  persist('vibe-v3-completed', [...state.completed]);
  renderStudio();
}

function buildContentUrl(file) {
  const separator = file.includes('?') ? '&' : '?';
  const motion = file.startsWith('v3/deck.html') && state.lowMotion ? `${separator}motion=low` : '';
  return `${state.contentBase}/${file}${motion}`;
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
  if (next) openPlayer(current.course, getSessionRevision(next));
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

function renderCommandResults(query = '') {
  const term = query.trim().toLowerCase();
  const items = [];
  visibleCourses().forEach((course) => {
    items.push({ type: 'COURSE', title: course.title, subtitle: course.route, courseId: course.id, id: course.id });
    course.sessions.forEach((session) => items.push({
      type: 'LESSON', title: session.title, subtitle: `${course.shortTitle} · ${session.subtitle || ''}`,
      courseId: course.id, id: session.id,
    }));
    ['student', 'instructor'].forEach((audience) => {
      (course.materials?.[audience] || []).forEach((material) => items.push({
        type: audience === 'student' ? 'NOTE' : 'RESEARCH',
        title: material.title, subtitle: `${course.shortTitle} · ${audience === 'student' ? '강의 보충자료' : '강사용 연구자료'}`,
        courseId: course.id, id: material.id, tab: 'library',
      }));
    });
    course.sessions.flatMap((session) => session.sourceKeys || []).forEach((key) => {
      const source = state.sources?.sources?.[key];
      if (source) {
        items.push({
          type: 'SOURCE',
          title: source.title,
          subtitle: `${source.publisher} · 공식자료 요약`,
          courseId: course.id,
          id: key,
          tab: 'library',
        });
      }
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
  let nextTab = item.tab || (item.type === 'LESSON' || item.type === 'COURSE' ? 'lessons' : 'library');
  if (['instructor', 'student', 'labs'].includes(nextTab)) nextTab = 'library';
  state.tab = nextTab;
  if (nextTab === 'library') state.libFilter = 'all';
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
        <div class="setting-row"><span><b>단일 강사용 스튜디오</b><span>운영 강의, 강사자료실, 수강생 출력물과 공식자료를 한 화면에서 관리합니다.</span></span><strong>STUDIO</strong></div>
        <div class="setting-row"><span><b>저사양 모션</b><span>장면 전환을 즉시 표시하고 지속 애니메이션을 줄입니다.</span></span><button id="drawer-motion" class="secondary-action" type="button">${state.lowMotion ? '사용 중' : '사용 안 함'}</button></div>
        <div class="setting-row"><span><b>빠른 검색</b><span>과정·회차·자료를 어디서든 찾습니다.</span></span><kbd>Ctrl K</kbd></div>
        <div class="setting-row"><span><b>전체화면</b><span>프로젝터 발표 화면으로 전환합니다.</span></span><kbd>Ctrl F</kbd></div>
        <div class="setting-row"><span><b>운영본 보호</b><span>작업본은 검수 후 회차별로 승격되며 이전 활성본은 보존됩니다.</span></span><strong>VERSIONED</strong></div>
      </section>
      <section class="drawer-section">
        <h3>운영 데이터</h3>
        <div class="backup-actions">
          <button id="btn-export-data" class="secondary-action" type="button">ZIP/JSON 백업</button>
          <button id="btn-import-data" class="secondary-action" type="button">백업 복원</button>
        </div>
        <p id="backup-status" class="drawer-help">기수 일정, 강사 메모, 진행 상태와 회차별 활성 버전을 백업합니다.</p>
      </section>
    `;
    $('#drawer-motion').addEventListener('click', () => {
      state.lowMotion = !state.lowMotion;
      persist('vibe-v3-low-motion', String(state.lowMotion));
      openDrawer('settings');
    });
    $('#btn-export-data').addEventListener('click', async () => {
      const result = await appApi.exportData();
      $('#backup-status').textContent = result.ok ? `백업 완료: ${result.filePath}` : '백업을 취소했습니다.';
    });
    $('#btn-import-data').addEventListener('click', async () => {
      try {
        const result = await appApi.importData();
        if (result.ok) applyImportedData(result.data);
        else $('#backup-status').textContent = '복원을 취소했습니다.';
      } catch (error) {
        $('#backup-status').textContent = `복원 실패: ${error.message}`;
      }
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
  $$('#course-tabs button').forEach((button) => button.addEventListener('click', () => {
    state.tab = button.dataset.tab;
    state.selectionId = null;
    renderStudio();
  }));
  // Vertical wheel / shift-wheel scrolls the tab strip horizontally if it ever overflows.
  const tabsEl = $('#course-tabs');
  tabsEl.addEventListener('wheel', (event) => {
    if (tabsEl.scrollWidth <= tabsEl.clientWidth) return;
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (!delta) return;
    event.preventDefault();
    tabsEl.scrollLeft += delta;
  }, { passive: false });
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
    if (key === 'home') { closePlayer(); return; }
    if (key === 'escape') {
      const webview = $('#lecture-webview');
      if (webview && !$('#player').classList.contains('hidden') && typeof webview.executeJavaScript === 'function') {
        // If the lesson deck has an open overlay (e.g. live demo sandbox), let ESC close that first.
        webview.executeJavaScript("(window.demoStage && document.body.classList.contains('demo-open')) ? (window.demoStage.close(), true) : false")
          .then((closedOverlay) => { if (!closedOverlay) closePlayer(); })
          .catch(() => closePlayer());
        return;
      }
      closePlayer();
    }
  });
}

async function boot() {
  const [manifest, contentBase, sources] = await Promise.all([appApi.readManifest(), appApi.getContentBase(), appApi.readOfficialSources()]);
  state.manifest = manifest;
  state.contentBase = contentBase;
  state.sources = sources || state.sources;
  if (!visibleCourses().some((course) => course.id === state.courseId)) state.courseId = manifest.defaultCourseId;
  bindEvents();
  setupBoard();
  renderStudio();
}

boot().catch((error) => {
  console.error(error);
  $('#detail-content').innerHTML = `<div class="command-empty">프로그램을 불러오지 못했습니다.<br>${escapeHtml(error.message)}</div>`;
});
