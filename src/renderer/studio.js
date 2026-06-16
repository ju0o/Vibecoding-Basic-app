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
  $('#course-kicker').textContent = `${course.code} · ${course.track || course.family}`;
  $('#course-title').textContent = course.title;
  $('#course-route').textContent = course.route;
  $('#detail-course-code').textContent = course.code;
  $$('#course-tabs button').forEach((button) => button.classList.toggle('active', button.dataset.tab === state.tab));

  if (state.tab === 'lessons') renderLessons(course);
  else if (state.tab === 'labs') renderLabs(course);
  else if (state.tab === 'sources') renderSources(course);
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

function renderLessonDetail(course, session) {
  const index = course.sessions.findIndex((item) => item.id === session.id);
  const selected = getSessionRevision(session);
  const revisions = session.revisions || [];
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
    ${revisionControl}
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
      <span>${escapeHtml(selected.revision || course.curriculumVersion || '')}</span>
      <span>${escapeHtml(statusLabel(selected.status))}</span>
      <span>${session.sourceKeys?.length || 0} OFFICIAL SOURCES</span>
    </div>
  `;
  $('#btn-open-lesson').addEventListener('click', () => openPlayer(course, selected));
  $('#btn-toggle-complete').addEventListener('click', () => toggleComplete(session.id));
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

function renderMaterials(course, audience) {
  const materials = audience === 'instructor'
    ? visibleCourses().flatMap((item) => (item.materials?.instructor || []).map((material) => ({ ...material, courseId: item.id, courseTitle: item.shortTitle, courseCode: item.code })))
    : (course.materials?.student || []).map((material) => ({ ...material, courseId: course.id, courseTitle: course.shortTitle, courseCode: course.code }));
  if (!state.selectionId || !materials.some((material) => material.id === state.selectionId)) {
    const courseFirst = materials.find((material) => material.courseId === course.id);
    state.selectionId = (courseFirst || materials[0])?.id;
  }
  $('#list-summary').textContent = audience === 'instructor'
    ? `${materials.length} INSTRUCTOR LIBRARY · ALL COURSES`
    : `${materials.length} STUDENT PRINTS · ${course.shortTitle}`;
  $('#lesson-list').innerHTML = materials.map((material, index) => `
    <button class="lesson-row material-row${material.id === state.selectionId ? ' active' : ''}" type="button" data-material="${escapeHtml(material.id)}" data-course="${escapeHtml(material.courseId)}">
      <span class="lesson-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="lesson-copy"><b>${escapeHtml(material.title)}</b><span>${escapeHtml(material.description)}</span><span class="material-audience">${escapeHtml(material.courseCode)} · ${audience === 'instructor' ? '강사자료실' : '수강생 출력물'}</span></span>
      <span class="lesson-state">›</span>
    </button>
  `).join('') || '<div class="command-empty">이 과정에 연결된 자료가 없습니다.</div>';

  $$('#lesson-list [data-material]').forEach((button) => {
    button.addEventListener('click', () => {
      state.courseId = button.dataset.course || state.courseId;
      state.selectionId = button.dataset.material;
      renderStudio();
    });
  });
  const material = materials.find((item) => item.id === state.selectionId);
  renderMaterialDetail(getCourse(material?.courseId) || course, material, audience);
}

function renderMaterialDetail(course, material, audience) {
  $('#detail-position').textContent = audience === 'student' ? 'STUDENT PRINT' : 'INSTRUCTOR LIBRARY';
  if (!material) {
    $('#detail-content').innerHTML = '<div class="command-empty">선택할 자료가 없습니다.</div>';
    return;
  }
  const instructorCopy = audience === 'instructor'
    ? ['공식자료 연구노트', '심화 개념과 예상 오해', '시연·오류 복구 운영']
    : ['단계별 작업지', '메모와 체크리스트', '밝은 A4 인쇄 레이아웃'];
  $('#detail-content').innerHTML = `
    <div class="material-preview">
      <span class="detail-number">${escapeHtml(course.code)} · ${audience === 'student' ? 'STUDENT PRINT' : 'INSTRUCTOR LIBRARY'}</span>
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

function renderLabs(course) {
  const sessions = (course.sessions || []).filter((session) => session.demoProject);
  if (!state.selectionId || !sessions.some((session) => session.id === state.selectionId)) {
    state.selectionId = sessions[0]?.id;
  }
  $('#list-summary').textContent = `${sessions.length} LESSON LABS · STARTER / BROKEN / COMPLETE`;
  $('#lesson-list').innerHTML = sessions.map((session, index) => `
    <button class="lesson-row lab-row${session.id === state.selectionId ? ' active' : ''}" type="button" data-lab="${escapeHtml(session.id)}">
      <span class="lesson-no">${String(index + 1).padStart(2, '0')}</span>
      <span class="lesson-copy"><b>${escapeHtml(session.title.replace(/^\d+강\s*·\s*/, ''))}</b><span>시작본 · 오류본 · 완성본 · 복구 파일</span><em class="readiness ready">실행 가능</em></span>
      <span class="lesson-state">›</span>
    </button>
  `).join('') || '<div class="command-empty">이 과정에 연결된 실습 파일이 없습니다.</div>';
  $$('#lesson-list [data-lab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectionId = button.dataset.lab;
      renderLabs(course);
    });
  });
  renderLabDetail(course, sessions.find((session) => session.id === state.selectionId));
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
    course.sessions.filter((session) => session.demoProject).forEach((session) => items.push({
      type: 'LAB', title: `${session.title} 실습 파일`, subtitle: `${course.shortTitle} · starter / broken / complete`,
      courseId: course.id, id: session.id, tab: 'labs',
    }));
    ['student', 'instructor'].forEach((audience) => {
      (course.materials?.[audience] || []).forEach((material) => items.push({
        type: audience === 'student' ? 'PRINT' : 'LIBRARY',
        title: material.title, subtitle: `${course.shortTitle} · ${audience === 'student' ? '수강생 출력물' : '강사자료실'}`,
        courseId: course.id, id: material.id, tab: audience,
      }));
    });
    course.sessions.flatMap((session) => session.sourceKeys || []).forEach((key) => {
      const source = state.sources?.sources?.[key];
      if (source) {
        items.push({
          type: 'SOURCE',
          title: source.title,
          subtitle: `${source.publisher} · ${course.shortTitle}`,
          courseId: course.id,
          id: key,
          tab: 'sources',
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
  state.tab = item.tab || (item.type === 'LESSON' || item.type === 'COURSE' ? 'lessons' : 'student');
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
