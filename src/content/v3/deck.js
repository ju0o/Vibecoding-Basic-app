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

const structuredSlides = Array.isArray(lesson.slides) && lesson.slides.length ? lesson.slides : null;
const totalSlides = structuredSlides ? structuredSlides.length : 13;
const stageLabels = lesson.demo.stages;
const sourceNote = lesson.sources?.length ? `공식 자료 ${lesson.sources.length}개 연결` : '과정 내부 사례 기반';
let currentSlide = 0;
let liveStage = -1;
let sceneController = null;
let timerSeconds = 40 * 60;
let timerHandle = null;

function footer(index) {
  return `
    <footer class="slide-foot">
      <small>${escapeHtml(course.code)} · ${escapeHtml(lesson.module)} · ${escapeHtml(sourceNote)}</small>
      <div class="deck-nav">
        <button type="button" data-deck-prev aria-label="이전 슬라이드">‹</button>
        <span class="deck-counter">${String(index + 1).padStart(2, '0')} / ${totalSlides}</span>
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

// Code key visual: a generated SVG motif (no external image asset needed).
// The AI-image path stays as the caption so it can be swapped in later.
function keyVisualSVG(slot, accent, currentLesson) {
  const amber = '#f59e0b';
  const moduleLabel = escapeHtml(currentLesson.module || '');
  const titleLabel = escapeHtml(currentLesson.title || '');
  const defs = `
    <defs>
      <linearGradient id="kvbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0a111c"/><stop offset="1" stop-color="#0d1726"/>
      </linearGradient>
      <radialGradient id="kvglow" cx="0.72" cy="0.22" r="0.62">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.30"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const base = `
    <rect width="640" height="360" fill="url(#kvbg)"/>
    <rect width="640" height="360" fill="url(#kvglow)"/>
    <g stroke="${accent}" stroke-opacity="0.08">
      ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 52 + 18}" x2="640" y2="${i * 52 + 18}"/>`).join('')}
      ${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 64 + 16}" y1="0" x2="${i * 64 + 16}" y2="360"/>`).join('')}
    </g>`;
  let motif = '';
  if (slot === 'metaphor') {
    motif = `
      <g transform="translate(330,176)">
        <rect x="-160" y="-80" width="210" height="132" rx="16" fill="${accent}" fill-opacity="0.10" stroke="${accent}" stroke-opacity="0.55" transform="rotate(-9)"/>
        <rect x="-46" y="-52" width="210" height="132" rx="16" fill="${amber}" fill-opacity="0.08" stroke="${amber}" stroke-opacity="0.45" transform="rotate(7)"/>
        <circle cx="-66" cy="-4" r="6" fill="${accent}"/><circle cx="76" cy="22" r="6" fill="${amber}"/>
        <line x1="-66" y1="-4" x2="76" y2="22" stroke="${accent}" stroke-opacity="0.5"/>
      </g>`;
  } else if (slot === 'next') {
    motif = `
      <g fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round">
        ${[0, 1, 2].map((i) => `<path d="M${300 + i * 74} 126 L${342 + i * 74} 180 L${300 + i * 74} 234" stroke-opacity="${0.28 + i * 0.3}" stroke-width="${5 + i}"/>`).join('')}
      </g>
      <line x1="60" y1="300" x2="580" y2="300" stroke="${accent}" stroke-opacity="0.3"/>
      <circle cx="150" cy="300" r="5" fill="${amber}"/><circle cx="470" cy="178" r="7" fill="${accent}"/>`;
  } else {
    motif = `
      <g transform="translate(438,178)" fill="none">
        ${[64, 104, 146].map((r, i) => `<circle r="${r}" stroke="${accent}" stroke-opacity="${0.46 - i * 0.13}"/>`).join('')}
        <circle r="11" fill="${accent}"/>
        <circle cx="103" cy="-103" r="7" fill="${amber}"/>
      </g>
      <line x1="40" y1="302" x2="600" y2="302" stroke="${accent}" stroke-opacity="0.3"/>
      ${[120, 232, 344].map((x) => `<circle cx="${x}" cy="302" r="4" fill="${accent}" fill-opacity="0.6"/>`).join('')}`;
  }
  return `
    <svg class="asset-keyvisual" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${defs}${base}<g class="kv-anim kv-${slot}">${motif}</g>
      <text x="40" y="54" fill="${accent}" font-family="monospace" font-size="13" font-weight="700" opacity="0.85">${moduleLabel}</text>
      <text x="40" y="332" fill="#9fb2bd" font-family="monospace" font-size="11" opacity="0.55">${titleLabel}</text>
    </svg>`;
}

function assetFrame(item, mode = 'img') {
  const label = mode === 'cap' ? 'DOCUMENTARY CAPTURE' : 'KEY VISUAL';
  const accent = (typeof course !== 'undefined' && course && course.color) || '#2dd4bf';
  const visual = mode === 'img'
    ? `<img class="asset-keyvisual" data-kv-img src="../${item.asset}" alt="${escapeHtml(item.screenText)}">
       <div class="asset-fallback-placeholder" style="position:absolute; inset:0; width:100%; height:100%;">${keyVisualSVG(item.slot, accent, lesson)}</div>
       <div class="keyvisual-caption"><span>${escapeHtml(item.slot || 'visual')}</span></div>`
    : `<div class="asset-grid-lines"></div>
       <div class="asset-device">
         <span>${escapeHtml(item.slot || 'visual')}</span>
         <h3>${escapeHtml(item.screenText)}</h3>
         <p>${escapeHtml(item.presenterNote)}</p>
       </div>`;
  return `
    <div class="slot-asset-frame" data-asset-kind="${escapeHtml(mode)}">
      <div class="asset-toolbar"><span>${escapeHtml(label)}</span><b>${escapeHtml(item.tag || item.kind || '')}</b></div>
      <div class="asset-canvas">
        ${visual}
      </div>
    </div>
  `;
}

// Documentary capture frames (basic-course aesthetic): realistic terminal/browser
// mockups instead of abstract panels. Course-aware — cross-tool panels for advanced,
// concept-derived panels for every other track.
function captureMatrix(item) {
  const isAdvanced = course.visualMode === 'advanced';
  const clip = (text, n) => String(text || '').slice(0, n);
  const panels = isAdvanced
    ? [
      { chrome: 'claude — cli', tag: 'diff', title: '저장소 탐색·변경 설명', desc: '텍스트 증거가 강함', lines: [['p', '$ claude'], ['d', '› 저장소 구조 탐색'], ['d', '› 변경 지점 diff 설명'], ['c', '+ 12  − 4  · 3 files'], ['o', '✓ diff ready'], ['m', '텍스트 증거 확보']] },
      { chrome: 'codex — exec', tag: 'qa', title: '승인·sandbox·브라우저 QA', desc: '검증 증거가 강함', lines: [['p', '$ codex exec'], ['w', 'approve run? (y)'], ['d', '› sandbox 실행'], ['d', '› 브라우저 QA'], ['o', '✓ verified'], ['m', '검증 증거 확보']] },
      { chrome: 'localhost:3000', tag: 'preview', title: '코드와 실제 화면 동시 확인', desc: '시각 판단이 강함', browser: true },
    ]
    : (lesson.concepts || []).slice(0, 3).map(([title, copy], index) => ({
      chrome: `step ${String(index + 1).padStart(2, '0')}`,
      tag: ['why', 'how', 'check'][index] || 'note',
      title,
      desc: copy,
      lines: [['p', `> ${clip(title, 22)}`], ['d', `› ${clip(copy, 24)}`], ['d', `  ${clip(String(copy).slice(24), 24)}`], ['o', '✓ 확인 기준 충족']],
    }));
  return `
    <div class="capture-matrix">
      ${panels.map((panel, index) => `
        <article class="doc-frame${panel.browser ? ' is-browser' : ''}" style="--i:${index}">
          <div class="doc-chrome"><i></i><i></i><i></i><small>${escapeHtml(panel.chrome)}</small><b>${escapeHtml(panel.tag)}</b></div>
          <div class="doc-screen">
            ${panel.browser
              ? `<div class="doc-browser"><span class="doc-pill"></span><strong>${escapeHtml(panel.title)}</strong><span class="doc-bar"></span><span class="doc-bar short"></span><span class="doc-btn">실행 결과 확인</span></div>`
              : `<div class="doc-term">${(panel.lines || []).map(([type, text]) => `<span class="ln ${type}">${escapeHtml(text)}</span>`).join('')}</div>`}
          </div>
          <div class="doc-cap"><b>${escapeHtml(panel.title)}</b><small>${escapeHtml(panel.desc)}</small></div>
        </article>
      `).join('')}
    </div>
  `;
}

// Documentary cover: editorial title on the left, realistic device mockups on the
// right (a course card listing what this lesson teaches + a terminal frame), angled
// in 3D with depth shadows and a gentle pointer tilt.
function heroCover(item, index) {
  const concepts = lesson.concepts.map(([title]) => title);
  const conceptRows = concepts.slice(0, 5).map((title, i) =>
    `<div class="cd-row"><span class="cd-n">${String(i + 1).padStart(2, '0')}</span><b>${escapeHtml(title)}</b></div>`).join('');
  const cliLines = (lesson.sequence || []).slice(0, 3).map((step) =>
    `<span class="ln d">› ${escapeHtml(step)}</span>`).join('');
  const titleHtml = lesson.title.includes(' — ')
    ? `${escapeHtml(lesson.title.split(' — ')[0])}<span class="hero-title-2">${escapeHtml(lesson.title.split(' — ').slice(1).join(' — '))}</span>`
    : escapeHtml(lesson.title);
  return `
    <section class="slide hero-slide${index === 0 ? ' active' : ''}" data-slide="${index + 1}" data-title="${escapeHtml(item.title)}">
      <div class="hero-3d cover-doc" data-hero>
        <canvas class="hero-particles" aria-hidden="true"></canvas>
        <div class="hero-copy">
          <div class="hero-kicker"><i></i>${escapeHtml(course.code)} · ${escapeHtml(lesson.module)}</div>
          <h1 class="hero-title">${titleHtml}</h1>
          <p class="hero-sub">${escapeHtml(item.screenText || lesson.subtitle)}</p>
        </div>
        <div class="hero-scene">
          <div class="cover-stage">
            <div class="cover-device">
              <div class="doc-chrome"><i></i><i></i><i></i><small>vibe-studio — ${escapeHtml(lesson.core || course.code)}</small><b>${escapeHtml(item.tag || 'COVER')}</b></div>
              <div class="cover-screen">
                <span class="cd-kicker">이번 강의에서 배우는 것</span>
                <div class="cd-list">${conceptRows}</div>
              </div>
            </div>
            <div class="cover-cli">
              <div class="doc-chrome"><i></i><i></i><i></i><small>terminal</small></div>
              <div class="doc-term">${cliLines}<span class="ln o">✓ 검증 완료</span></div>
            </div>
          </div>
        </div>
        <div class="hero-vignette" aria-hidden="true"></div>
      </div>
      ${footer(index)}
    </section>
  `;
}

function slotSlide(item, index) {
  const kicker = `${lesson.module} · ${escapeHtml(item.tag || item.kind || 'SLOT')}`;
  if (item.slot === 'cover') return heroCover(item, index);
  if (item.kind === 'scene') {
    return slide(index, item.title, `
      <div class="live-layout structured-live">
        <div class="live-stage scene-stage" id="scene-stage"></div>
        <aside class="live-controls">
          <h3>MANUAL SCENE</h3>
          <button class="control-btn primary" type="button" id="live-start">시작</button>
          <button class="control-btn" type="button" id="live-prev">이전 단계</button>
          <button class="control-btn" type="button" id="live-next">다음 단계</button>
          <button class="control-btn" type="button" id="live-pause">일시정지</button>
          <button class="control-btn" type="button" id="live-reset">초기화</button>
          <p class="control-caption" id="live-caption">시작을 누르면 첫 표면이 강조됩니다. 자동으로 넘어가지 않습니다.</p>
          <div class="motion-brief"><b>SCENE INTENT</b><span>${escapeHtml(item.screenText)}</span></div>
          <div class="control-state" id="live-state">READY<br>0 / ${stageLabels.length}</div>
        </aside>
      </div>
    `, item.presenterNote, kicker);
  }

  if (item.kind === 'cap') {
    return slide(index, item.title, `
      <div class="slot-layout cap-slot">
        <section class="slot-copy">
          <span>${escapeHtml(item.tag)}</span>
          <h3>${escapeHtml(item.screenText)}</h3>
          <p>${escapeHtml(item.presenterNote)}</p>
        </section>
        ${captureMatrix(item)}
      </div>
    `, '본문은 실제 캡처를 우선하고, 캡처가 없는 부분만 코드 렌더 장면으로 보완합니다.', kicker);
  }

  if (item.kind === 'text') {
    return slide(index, item.title, `
      <div class="slot-layout text-slot">
        <section class="slot-copy large">
          <span>${escapeHtml(item.tag)}</span>
          <h3>${escapeHtml(item.screenText)}</h3>
          <p>${escapeHtml(item.presenterNote)}</p>
        </section>
        <aside class="slot-note-board">
          ${lesson.decisions.map(([question, tone, feedback], decisionIndex) => `
            <article style="--i:${decisionIndex}" data-tone="${escapeHtml(tone)}">
              <i>${String(decisionIndex + 1).padStart(2, '0')}</i>
              <b>${escapeHtml(question)}</b>
              <span><em class="nb-tone">${escapeHtml(tone)}</em>${escapeHtml(feedback)}</span>
            </article>
          `).join('')}
        </aside>
      </div>
    `, '화면에 문장을 많이 넣지 않고 판단 기준만 남깁니다.', kicker);
  }

  return slide(index, item.title, `
    <div class="slot-layout image-slot">
      <section class="slot-copy">
        <span>${escapeHtml(item.tag)}</span>
        <h3>${escapeHtml(item.screenText)}</h3>
        <p>${escapeHtml(item.presenterNote)}</p>
      </section>
      ${assetFrame(item, 'img')}
    </div>
  `, '키비주얼은 표지·은유·다음 예고에만 사용합니다.', kicker);
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
      <div class="live-stage scene-stage" id="scene-stage"></div>
      <aside class="live-controls">
        <h3>LIVE CONTROL</h3>
        <button class="control-btn primary" type="button" id="live-start">시작</button>
        <button class="control-btn" type="button" id="live-prev">이전 단계</button>
        <button class="control-btn" type="button" id="live-next">다음 단계</button>
        <button class="control-btn" type="button" id="live-pause">일시정지</button>
        <button class="control-btn" type="button" id="live-reset">초기화</button>
        <p class="control-caption" id="live-caption">시작을 누르면 첫 단계가 열립니다. 자동으로 넘어가지 않습니다.</p>
        ${lesson.professional?.visualSimulation ? `<div class="motion-brief"><b>MOTION INTENT</b><span>${escapeHtml(lesson.professional.visualSimulation)}</span></div>` : ''}
        <div class="control-state" id="live-state">READY<br>0 / ${stageLabels.length}</div>
      </aside>
    </div>
  `);
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

deck.innerHTML = structuredSlides
  ? structuredSlides.map((item, index) => slotSlide(item, index)).join('')
  : [
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
const liveSlideIndex = structuredSlides ? structuredSlides.findIndex((item) => item.kind === 'scene') : 4;
const timerSlideIndex = structuredSlides ? -1 : 10;

function showSlide(index) {
  const previousSlide = currentSlide;
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slideElement, slideIndex) => slideElement.classList.toggle('active', slideIndex === currentSlide));
  if (previousSlide === liveSlideIndex && currentSlide !== liveSlideIndex) {
    document.body.classList.add('is-paused');
    sceneController?.pause(liveStage, true);
  }
  if (timerSlideIndex >= 0 && currentSlide !== timerSlideIndex && timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
    const timerButton = document.getElementById('timer-toggle');
    if (timerButton) timerButton.textContent = '계속';
  }
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
  const caption = document.getElementById('live-caption');
  const state = document.getElementById('live-state');
  if (!caption || !state) return;
  const paused = document.body.classList.contains('is-paused');
  sceneController?.pause(liveStage, paused);
  const current = stageLabels[Math.max(0, liveStage)];
  caption.textContent = liveStage < 0
    ? '시작을 누르면 첫 단계가 강조됩니다. 자동으로 넘어가지 않습니다.'
    : `${liveStage + 1}. ${current} · 다음 결과를 먼저 질문한 뒤 진행하세요.`;
  state.innerHTML = `${paused ? 'PAUSED' : liveStage < 0 ? 'READY' : liveStage === stageLabels.length - 1 ? 'VERIFIED' : 'MANUAL'}<br>${Math.max(0, liveStage + 1)} / ${stageLabels.length}`;
}

document.getElementById('live-start')?.addEventListener('click', () => {
  document.body.classList.remove('is-paused');
  liveStage = 0;
  sceneController?.start();
  renderLive();
});
document.getElementById('live-prev')?.addEventListener('click', () => {
  if (document.body.classList.contains('is-paused')) return;
  liveStage = Math.max(0, liveStage - 1);
  sceneController?.go(liveStage);
  renderLive();
});
document.getElementById('live-next')?.addEventListener('click', () => {
  if (document.body.classList.contains('is-paused')) return;
  liveStage = Math.min(stageLabels.length - 1, liveStage + 1);
  sceneController?.go(liveStage);
  renderLive();
});
document.getElementById('live-pause')?.addEventListener('click', () => {
  document.body.classList.toggle('is-paused');
  document.getElementById('live-pause').textContent = document.body.classList.contains('is-paused') ? '계속' : '일시정지';
  renderLive();
});
document.getElementById('live-reset')?.addEventListener('click', () => {
  document.body.classList.remove('is-paused');
  liveStage = -1;
  sceneController?.reset();
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
  const timerValue = document.getElementById('timer-value');
  if (!timerValue) return;
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  timerValue.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
document.getElementById('timer-toggle')?.addEventListener('click', () => {
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
document.getElementById('timer-reset')?.addEventListener('click', () => {
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = null;
  timerSeconds = 40 * 60;
  document.getElementById('timer-toggle').textContent = '40분 시작';
  renderTimer();
});

const requestedSlide = Number(params.get('slide'));
const sceneHost = document.getElementById('scene-stage');
if (sceneHost) {
  sceneController = window.VibeSceneRegistry?.mount(sceneHost, {
    course,
    lesson,
    lessonIndex,
    scene: lesson.visualScene,
  });
}
function initHeroes() {
  const lowMotion = document.body.classList.contains('low-motion');
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.hero-3d[data-hero]').forEach((hero) => {
    const scene = hero.querySelector('.hero-scene');
    const copy = hero.querySelector('.hero-copy');
    if (scene && !reduce) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        if (!rect.width) return;
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        scene.style.transform = `scale(1.03) rotateY(${(px * 16).toFixed(2)}deg) rotateX(${(-py * 11).toFixed(2)}deg)`;
        if (copy) copy.style.transform = `translateY(-50%) translate(${(-px * 14).toFixed(1)}px, ${(-py * 9).toFixed(1)}px)`;
      });
      hero.addEventListener('pointerleave', () => {
        scene.style.transform = '';
        if (copy) copy.style.transform = '';
      });
    }
    const canvas = hero.querySelector('.hero-particles');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    const accent = (getComputedStyle(hero).getPropertyValue('--accent') || '#2dd4bf').trim() || '#2dd4bf';
    let width = 0;
    let height = 0;
    let dots = [];
    let raf = 0;
    function resize() {
      const rect = hero.getBoundingClientRect();
      width = canvas.width = Math.max(1, Math.floor(rect.width));
      height = canvas.height = Math.max(1, Math.floor(rect.height));
      const count = Math.max(24, Math.min(96, Math.floor(width / 15)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const dot of dots) {
        dot.x += dot.vx * dot.z * 2.2;
        dot.y += dot.vy * dot.z * 2.2;
        if (dot.x < -4) dot.x = width + 4; else if (dot.x > width + 4) dot.x = -4;
        if (dot.y < -4) dot.y = height + 4; else if (dot.y > height + 4) dot.y = -4;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.z * 1.9, 0, Math.PI * 2);
        ctx.globalAlpha = dot.z * 0.55;
        ctx.fillStyle = accent;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function loop() {
      draw();
      raf = window.requestAnimationFrame(loop);
    }
    try {
      resize();
      window.addEventListener('resize', () => { window.cancelAnimationFrame(raf); resize(); if (!(lowMotion || reduce)) loop(); });
      if (lowMotion || reduce) draw();
      else loop();
    } catch (error) { /* canvas unsupported: keep the static composition */ }
  });
}

if (params.get('motion') === 'low') document.body.classList.add('low-motion');
if (Number.isFinite(requestedSlide) && requestedSlide > 0) showSlide(requestedSlide - 1);
function wireKeyvisualImages() {
  document.querySelectorAll('img[data-kv-img]').forEach((img) => {
    const placeholder = img.nextElementSibling;
    const hidePlaceholder = () => {
      if (placeholder && placeholder.classList.contains('asset-fallback-placeholder')) placeholder.style.display = 'none';
    };
    const hideImg = () => { img.style.display = 'none'; };
    if (img.complete) {
      if (img.naturalWidth > 0) hidePlaceholder();
      else hideImg();
    }
    img.addEventListener('load', hidePlaceholder);
    img.addEventListener('error', hideImg);
  });
}

renderLive();
renderTimer();
initHeroes();
wireKeyvisualImages();
