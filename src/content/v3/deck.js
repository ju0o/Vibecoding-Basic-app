'use strict';

const params = new URLSearchParams(location.search);
const courseId = params.get('course') || 'workflow';
const lessonIndex = Math.max(0, Number(params.get('lesson') || 1) - 1);
const course = window.VIBE_V3_COURSES?.[courseId];
const lesson = course?.sessions?.[lessonIndex];
const deck = document.getElementById('deck');

if (!course || !lesson) {
  deck.innerHTML = '<section class="slide active"><h1>강의 데이터를 찾을 수 없습니다.</h1></section>';
  throw new Error(`V3 lesson not found: ${courseId}/${lessonIndex + 1}`);
}

document.body.dataset.mode = course.visualMode;
document.title = `${course.title} ${lessonIndex + 1}강 - ${lesson.title}`;
document.documentElement.style.setProperty('--accent', course.color);

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const stageLabels = lesson.demo.stages;
const sourceNote = lesson.sources?.length ? `공식 자료 ${lesson.sources.length}개 연결` : '과정 내부 사례 기반';
let currentSlide = 0;
let liveStage = -1;
let timerSeconds = 40 * 60;
let timerHandle = null;

function footer(index) {
  return `
    <footer class="slide-foot">
      <small>${escapeHtml(course.code)} · ${escapeHtml(lesson.module)} · ${escapeHtml(sourceNote)}</small>
      <div class="deck-nav">
        <button type="button" data-deck-prev aria-label="이전 슬라이드">‹</button>
        <span class="deck-counter">${String(index + 1).padStart(2, '0')} / 13</span>
        <button type="button" data-deck-next aria-label="다음 슬라이드">›</button>
      </div>
    </footer>
  `;
}

function head(kicker, title, intro, index) {
  return `
    <header class="slide-head enter">
      <div>
        <div class="slide-kicker">${escapeHtml(kicker)}</div>
        <h2>${escapeHtml(title)}</h2>
        ${intro ? `<p class="slide-intro">${escapeHtml(intro)}</p>` : ''}
      </div>
      <div class="head-code">LESSON<b>${String(lessonIndex + 1).padStart(2, '0')}</b>${escapeHtml(course.code)}</div>
    </header>
  `;
}

function slide(index, title, body, intro = '', kicker = lesson.module) {
  return `
    <section class="slide${index === 0 ? ' active' : ''}" data-slide="${index + 1}" data-title="${escapeHtml(title)}">
      ${head(kicker, title, intro, index)}
      <div class="slide-body enter">${body}</div>
      ${footer(index)}
    </section>
  `;
}

function cover() {
  const nodes = lesson.concepts.map(([title]) => `<div class="signal-node">${escapeHtml(title)}</div>`).join('');
  return `
    <section class="slide active" data-slide="1" data-title="${escapeHtml(lesson.title)}">
      <div class="slide-body cover-layout enter">
        <div>
          <div class="slide-kicker">${escapeHtml(course.code)} · ${escapeHtml(lesson.module)}</div>
          <h1 class="cover-title">${escapeHtml(lesson.title)}</h1>
          <p class="cover-sub">${escapeHtml(lesson.subtitle)}<br>${escapeHtml(lesson.objective)}</p>
          <div class="cover-meta">${lesson.flow.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
        </div>
        <div class="signal-stage" aria-label="강의 개념 흐름">
          <div class="signal-ring"></div>
          <div class="signal-core">${escapeHtml(course.code)}<br>${String(lessonIndex + 1).padStart(2, '0')}</div>
          ${nodes}
          <div class="signal-pulse"></div>
        </div>
      </div>
      ${footer(0)}
    </section>
  `;
}

function agenda() {
  return slide(1, '오늘 120분의 작업 지도', `
    <div class="agenda-grid">
      ${lesson.flow.map((item, index) => {
        const [title, time] = item.split(' ');
        return `<button type="button" class="agenda-step${index === 0 ? ' active' : ''}" data-agenda="${index}"><strong>${escapeHtml(time)}</strong><h3>${escapeHtml(title)}</h3><p>${escapeHtml([
          '현재 경험과 오해를 짧게 확인합니다.',
          '용어보다 원인과 결과를 시각 장면으로 이해합니다.',
          '실제 도구와 화면에서 같은 흐름을 확인합니다.',
          '팀 또는 개인 프로젝트에 직접 적용합니다.',
          '오류를 복구하고 다음 작업 기준을 기록합니다.',
        ][index])}</p></button>`;
      }).join('')}
    </div>
  `, '시간을 채우는 수업이 아니라 각 구간마다 확인 가능한 산출물을 남깁니다.');
}

function concepts() {
  return slide(2, '개념은 네 개의 판단으로 연결됩니다', `
    <div class="concept-layout">
      <div class="concept-list">
        ${lesson.concepts.map(([title, copy], index) => `<button type="button" class="concept-btn${index === 0 ? ' active' : ''}" data-concept="${index}"><i>${String(index + 1).padStart(2, '0')}</i><span><b>${escapeHtml(title)}</b><span>${escapeHtml(copy)}</span></span></button>`).join('')}
      </div>
      <div class="concept-scene">
        <div class="concept-focus">
          <div class="index" id="concept-index">01</div>
          <h3 id="concept-title">${escapeHtml(lesson.concepts[0][0])}</h3>
          <p id="concept-copy">${escapeHtml(lesson.concepts[0][1])}</p>
        </div>
      </div>
    </div>
  `, '외우는 정의가 아니라 실제 작업에서 무엇을 판단해야 하는지 확인합니다.');
}

function sequence() {
  return slide(3, '한 단계씩 원인과 결과를 따라갑니다', `
    <div class="sequence-shell">
      <div class="sequence-list">
        ${lesson.sequence.map((item, index) => `<button type="button" class="sequence-step${index === 0 ? ' active' : ''}" data-sequence="${index}"><b>STEP ${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(item)}</span></button>`).join('')}
      </div>
      <div class="sequence-stage">
        <div class="sequence-track"></div>
        <div class="sequence-beam" id="sequence-beam"></div>
        <div class="sequence-stations">${lesson.sequence.map((item, index) => `<div class="station${index === 0 ? ' active' : ''}" data-station="${index}">${escapeHtml(item.split(' ').slice(0, 2).join(' '))}</div>`).join('')}</div>
        <div class="sequence-caption" id="sequence-caption">${escapeHtml(lesson.sequence[0])}</div>
      </div>
    </div>
  `, '발표자가 원하는 속도로 클릭하며 설명합니다.');
}

function liveDemo() {
  return slide(4, lesson.demo.title, `
    <div class="live-layout">
      <div class="live-stage">
        <div class="live-grid"></div>
        <div class="live-track"></div>
        <div class="live-nodes">${stageLabels.map((label, index) => `<div class="live-node" data-live-node="${index}">${escapeHtml(label)}</div>`).join('')}</div>
        <div class="live-packet" id="live-packet"></div>
        <div class="live-caption" id="live-caption">시작을 누르면 첫 단계가 강조됩니다. 자동으로 넘어가지 않습니다.</div>
      </div>
      <aside class="live-controls">
        <h3>LIVE CONTROL</h3>
        <button class="control-btn primary" type="button" id="live-start">시작</button>
        <button class="control-btn" type="button" id="live-next">다음 단계</button>
        <button class="control-btn" type="button" id="live-pause">일시정지</button>
        <button class="control-btn" type="button" id="live-reset">초기화</button>
        <div class="control-state" id="live-state">READY<br>0 / ${stageLabels.length}</div>
      </aside>
    </div>
  `, '설명보다 실제 처리 흐름이 먼저 보이도록 구성한 수동 시연입니다.');
}

function compare() {
  const panel = (kind, title, items) => `
    <article class="compare-panel ${kind}">
      <header><span>${kind === 'good' ? 'STRONG SYSTEM' : 'FRAGILE SYSTEM'}</span><span>${kind === 'good' ? '✓' : '!'}</span></header>
      <h3>${escapeHtml(title)}</h3>
      ${items.map((item) => `<div class="compare-item"><i></i><span>${escapeHtml(item)}</span></div>`).join('')}
    </article>`;
  return slide(5, '겉으로 비슷해도 운영 방식은 다릅니다', `
    <div class="compare-grid">
      ${panel('bad', '결과만 빨리 보는 방식', lesson.compare.bad)}
      ${panel('good', '검증 가능한 작업 방식', lesson.compare.good)}
    </div>
  `, '두 화면의 차이를 한 문장으로 설명할 수 있어야 실제 프로젝트에서 선택할 수 있습니다.');
}

function decisions() {
  return slide(6, '직접 판단한 뒤 결과를 공개합니다', `
    <div class="decision-layout">
      ${lesson.decisions.map(([question, tone, feedback], index) => `<button type="button" class="choice-btn" data-choice="${index}" data-tone="${escapeHtml(tone)}"><span class="choice-no">DECISION ${String(index + 1).padStart(2, '0')}</span><h3>${escapeHtml(question)}</h3><p>${escapeHtml(feedback)}</p><span class="choice-tone">${escapeHtml(tone)}</span></button>`).join('')}
    </div>
  `, '정답을 먼저 읽지 않고 이유를 말한 뒤 카드를 눌러 판단 기준을 확인합니다.');
}

function errorRecovery() {
  const recovery = [
    ['증상 고정', lesson.error.symptom],
    ['로그 읽기', lesson.error.trace],
    ['원인 가설', lesson.error.cause],
    ['수정·재실행', lesson.error.fix],
  ];
  return slide(7, '에러는 실패가 아니라 관찰 가능한 상태입니다', `
    <div class="error-layout">
      <div class="error-terminal">
        <div class="bar"><i></i><i></i><i></i></div>
        <div class="prompt">$ run current workflow</div>
        <div class="trace">${escapeHtml(lesson.error.trace)}</div>
        <div class="symptom">${escapeHtml(lesson.error.symptom)}</div>
      </div>
      <div class="recovery-list">
        ${recovery.map(([title, copy], index) => `<button type="button" class="recovery-step${index === 0 ? ' active' : ''}" data-recovery="${index}"><b>${String(index + 1).padStart(2, '0')} · ${escapeHtml(title)}</b><span>${escapeHtml(copy)}</span></button>`).join('')}
      </div>
    </div>
  `, '로그를 닫지 않고 증상·명령·첫 원인·환경을 함께 AI에게 전달합니다.');
}

function caseWorkshop() {
  const pathButtons = lesson.pathway
    ? `<div class="path-tabs"><button class="tab-btn active" type="button" data-path="saas">SaaS 팀</button><button class="tab-btn" type="button" data-path="freelance">외주 팀</button><button class="tab-btn" type="button" data-path="personal">개인 사이드 프로젝트</button></div>`
    : '';
  const steps = lesson.sequence.slice(0, 5);
  return slide(8, lesson.pathway ? '한 교실에서 팀과 개인 프로젝트가 함께 움직입니다' : '실제 업무 장면으로 다시 연결합니다', `
    <div class="case-shell">
      ${pathButtons}
      <div class="case-rail" id="case-rail">
        ${steps.map((item, index) => `<article class="case-step"><b>${String(index + 1).padStart(2, '0')}</b><h3>${escapeHtml(item)}</h3><p>${escapeHtml(lesson.concepts[index % lesson.concepts.length][1])}</p></article>`).join('')}
      </div>
    </div>
  `, lesson.pathway ? '팀 트랙을 나누더라도 매주 같은 산출물을 개인 사이드 프로젝트에 적용합니다.' : '배운 개념이 도구 이름이 바뀌어도 유지되는지 확인합니다.');
}

function practiceBrief() {
  return slide(9, '오늘 실습의 완료 장면', `
    <div class="practice-layout">
      <article class="practice-brief">
        <div class="slide-kicker">40 MINUTE PRACTICE</div>
        <h3>해야 할 일</h3>
        <p>${escapeHtml(lesson.practice)}</p>
      </article>
      <article class="deliverable-panel">
        <div class="slide-kicker">DELIVERABLES</div>
        <h3>화면 밖에 남겨야 할 결과</h3>
        ${lesson.deliverables.map((item, index) => `<div class="deliverable"><i>${String(index + 1).padStart(2, '0')}</i><span>${escapeHtml(item)}</span></div>`).join('')}
      </article>
    </div>
  `, '완료 기준은 “많이 만들기”가 아니라 다른 사람이 확인할 수 있는 산출물입니다.');
}

function timer() {
  return slide(10, '지금부터 프로젝트 실습입니다', `
    <div class="timer-layout">
      <div class="timer-visual"><div class="timer-ring"><div class="timer-value" id="timer-value">40:00</div></div></div>
      <aside class="timer-side">
        <div class="slide-kicker">PROJECT WORK</div>
        <h3>${escapeHtml(lesson.practice)}</h3>
        <p>막히면 결과물을 추가하려 하지 말고, 현재 상태와 완료 기준을 다시 AI에게 설명하세요.</p>
        <button class="control-btn primary" id="timer-toggle" type="button">40분 시작</button>
        <button class="control-btn" id="timer-reset" type="button">초기화</button>
      </aside>
    </div>
  `, '팀은 역할에 따라 움직이고 개인은 자신의 사이드 프로젝트에 같은 작업을 적용합니다.');
}

function review() {
  return slide(11, '완료보다 검증 기록을 남깁니다', `
    <div class="review-grid">
      ${lesson.deliverables.map((item, index) => `<button class="check-btn" type="button"><i>✓</i><b>${escapeHtml(item)}</b></button>`).join('')}
      <button class="check-btn" type="button"><i>✓</i><b>정상 흐름을 직접 실행했다</b></button>
      <button class="check-btn" type="button"><i>✓</i><b>실패 흐름과 복구를 한 번 확인했다</b></button>
      <button class="check-btn" type="button"><i>✓</i><b>다음 작업을 한 문장으로 기록했다</b></button>
    </div>
  `, '체크는 강사가 대신하는 평가가 아니라 다음 세션을 위한 운영 기록입니다.');
}

function next() {
  const nextLesson = course.sessions[lessonIndex + 1];
  return slide(12, nextLesson ? '다음 회차 예고' : '과정 완료와 다음 경로', `
    <div class="next-layout">
      <div class="next-big">${nextLesson ? String(lessonIndex + 2).padStart(2, '0') : 'DONE'}</div>
      <div class="next-panel">
        <small>${nextLesson ? 'NEXT LESSON' : 'NEXT ROUTE'}</small>
        <h3>${escapeHtml(nextLesson?.title || '실제 프로젝트 운영으로')}</h3>
        <p>${escapeHtml(nextLesson?.objective || '완성한 시스템을 실제 업무에서 사용하고 오류·비용·질문을 다음 개편 자료로 남깁니다.')}</p>
      </div>
    </div>
  `, nextLesson ? '이번 산출물을 다음 회차의 입력으로 가져옵니다.' : '강의가 끝나도 운영 기록과 개선 루프는 계속됩니다.');
}

deck.innerHTML = [
  cover(),
  agenda(),
  concepts(),
  sequence(),
  liveDemo(),
  compare(),
  decisions(),
  errorRecovery(),
  caseWorkshop(),
  practiceBrief(),
  timer(),
  review(),
  next(),
].join('');

const slides = [...document.querySelectorAll('.slide')];

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slideElement, slideIndex) => slideElement.classList.toggle('active', slideIndex === currentSlide));
}

document.querySelectorAll('[data-deck-prev]').forEach((button) => button.addEventListener('click', () => showSlide(currentSlide - 1)));
document.querySelectorAll('[data-deck-next]').forEach((button) => button.addEventListener('click', () => showSlide(currentSlide + 1)));
document.addEventListener('keydown', (event) => {
  if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName)) return;
  if (event.key === 'ArrowRight' || event.key === 'PageDown') showSlide(currentSlide + 1);
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') showSlide(currentSlide - 1);
});

document.querySelectorAll('[data-agenda]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-agenda]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
}));

document.querySelectorAll('[data-concept]').forEach((button) => button.addEventListener('click', () => {
  const index = Number(button.dataset.concept);
  document.querySelectorAll('[data-concept]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.getElementById('concept-index').textContent = String(index + 1).padStart(2, '0');
  document.getElementById('concept-title').textContent = lesson.concepts[index][0];
  document.getElementById('concept-copy').textContent = lesson.concepts[index][1];
}));

document.querySelectorAll('[data-sequence]').forEach((button) => button.addEventListener('click', () => {
  const index = Number(button.dataset.sequence);
  document.querySelectorAll('[data-sequence]').forEach((item) => item.classList.toggle('active', Number(item.dataset.sequence) <= index));
  document.querySelectorAll('[data-station]').forEach((item) => item.classList.toggle('active', Number(item.dataset.station) <= index));
  document.getElementById('sequence-beam').style.width = `${Math.max(0, (index / Math.max(1, lesson.sequence.length - 1)) * 80)}%`;
  document.getElementById('sequence-caption').textContent = lesson.sequence[index];
}));

function renderLive() {
  const nodes = [...document.querySelectorAll('[data-live-node]')];
  nodes.forEach((node, index) => node.classList.toggle('active', index <= liveStage));
  const progress = liveStage < 0 ? 0 : (liveStage / Math.max(1, nodes.length - 1)) * 84;
  document.getElementById('live-packet').style.left = `${8 + progress}%`;
  document.getElementById('live-caption').textContent = liveStage < 0
    ? '시작을 누르면 첫 단계가 강조됩니다. 자동으로 넘어가지 않습니다.'
    : `${liveStage + 1}. ${stageLabels[liveStage]} 단계에서 무엇을 입력하고 무엇을 확인해야 하는지 설명합니다.`;
  document.getElementById('live-state').innerHTML = `${document.body.classList.contains('is-paused') ? 'PAUSED' : liveStage < 0 ? 'READY' : 'MANUAL'}<br>${Math.max(0, liveStage + 1)} / ${stageLabels.length}`;
}

document.getElementById('live-start').addEventListener('click', () => {
  document.body.classList.remove('is-paused');
  liveStage = 0;
  renderLive();
});
document.getElementById('live-next').addEventListener('click', () => {
  if (document.body.classList.contains('is-paused')) return;
  liveStage = Math.min(stageLabels.length - 1, liveStage + 1);
  renderLive();
});
document.getElementById('live-pause').addEventListener('click', () => {
  document.body.classList.toggle('is-paused');
  document.getElementById('live-pause').textContent = document.body.classList.contains('is-paused') ? '계속' : '일시정지';
  renderLive();
});
document.getElementById('live-reset').addEventListener('click', () => {
  document.body.classList.remove('is-paused');
  liveStage = -1;
  document.getElementById('live-pause').textContent = '일시정지';
  renderLive();
});

document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => button.classList.toggle('revealed')));
document.querySelectorAll('[data-recovery]').forEach((button) => button.addEventListener('click', () => {
  const index = Number(button.dataset.recovery);
  document.querySelectorAll('[data-recovery]').forEach((item) => item.classList.toggle('active', Number(item.dataset.recovery) <= index));
}));

document.querySelectorAll('[data-path]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-path]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const path = button.dataset.path;
  const labels = path === 'saas'
    ? ['상태 정의', '회원·권한', '세로 기능', '운영·결제', '출시·지표']
    : path === 'freelance'
      ? ['요구 분석', '범위·견적', '마일스톤', '수정·검수', '납품·사례']
      : ['개인 목표', '작은 범위', '직접 제작', '동료 리뷰', '다음 30일'];
  document.querySelectorAll('#case-rail .case-step h3').forEach((item, index) => { item.textContent = labels[index]; });
}));

document.querySelectorAll('.check-btn').forEach((button) => button.addEventListener('click', () => button.classList.toggle('checked')));

function renderTimer() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  document.getElementById('timer-value').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
document.getElementById('timer-toggle').addEventListener('click', () => {
  const button = document.getElementById('timer-toggle');
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
    button.textContent = '계속';
    return;
  }
  button.textContent = '일시정지';
  timerHandle = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    renderTimer();
    if (timerSeconds === 0) {
      clearInterval(timerHandle);
      timerHandle = null;
      button.textContent = '실습 완료';
    }
  }, 1000);
});
document.getElementById('timer-reset').addEventListener('click', () => {
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = null;
  timerSeconds = 40 * 60;
  document.getElementById('timer-toggle').textContent = '40분 시작';
  renderTimer();
});

const requestedSlide = Number(params.get('slide'));
if (Number.isFinite(requestedSlide) && requestedSlide > 0) showSlide(requestedSlide - 1);
renderLive();
renderTimer();
