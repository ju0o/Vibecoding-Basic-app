'use strict';

// Build onepass Week 1 ("바이브코딩의 원리" — 기초 2~5강 요약) by REUSING the real
// basic-session slides. Each of the 4 source sessions has its own design/CSS, so we:
//   1. provide ONE unified chrome (deck frame: nav, slide show/hide),
//   2. scope every source session's CSS under a wrapper class (.src-sN) — including
//      its :root variables — so the 4 designs never collide,
//   3. wrap each reused slide in that wrapper so it keeps its original look.
//
// Slide map (1-based slide numbers within each source deck), per owner request:
//   2강(session-02): 2,3,4,6,7,9
//   3강(session-03): 2,3,4,5,6,7,8,9
//   4강(session-04): 2,3,4,5,6,7,8,10,11,13,15   (+ React/Next slide added in pass 2)
//   5강(session-05): 2,3,4,7,6,9,10,11

const fs = require('fs');
const path = require('path');

const SESS = path.join(__dirname, '..', 'src', 'content', 'sessions');
const OUT = path.join(SESS, 'onepass-week1.html');
const read = (file) => fs.readFileSync(path.join(SESS, file), 'utf-8');

function extractStyle(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

// Find each top-level slide element (<div|section> whose class list includes the exact
// token "slide") and capture it to its matching close via tag-depth counting. Robust to
// indentation, nested divs, and "slide-head"/"slideshow"-style false matches.
function extractSlides(html) {
  const slides = [];
  const openRe = /<(div|section)\b[^>]*\bclass="([^"]*)"[^>]*>/g;
  let m;
  let cursor = 0;
  while ((m = openRe.exec(html)) !== null) {
    if (m.index < cursor) continue; // inside a slide we already captured
    if (!m[2].split(/\s+/).includes('slide')) continue;
    const tag = m[1];
    const tokenRe = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
    tokenRe.lastIndex = m.index;
    let depth = 0;
    let end = -1;
    let t;
    while ((t = tokenRe.exec(html)) !== null) {
      if (t[0][1] === '/') { depth -= 1; if (depth === 0) { end = t.index + t[0].length; break; } } else { depth += 1; }
    }
    if (end === -1) continue;
    slides.push(html.slice(m.index, end));
    cursor = end;
    openRe.lastIndex = end;
  }
  return slides;
}

// ── Robust CSS scoper (brace-matching) ───────────────────────────────────────
function readBlock(css, openIdx) {
  let depth = 0;
  let i = openIdx;
  for (; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') { depth -= 1; if (depth === 0) break; }
  }
  return { body: css.slice(openIdx + 1, i), end: i + 1 };
}

function prefixSelectors(selectorList, scope) {
  return selectorList.split(',').map((raw) => {
    const sel = raw.trim();
    if (!sel) return raw;
    if (/^:root\b/.test(sel)) return `.${scope}${sel.replace(/^:root/, '')}`;
    if (/^html\b/.test(sel)) return `.${scope}${sel.replace(/^html/, '')}`;
    if (/^body\b/.test(sel)) return `.${scope}${sel.replace(/^body/, '')}`;
    if (sel === '*') return `.${scope} *`;
    return `.${scope} ${sel}`;
  }).join(', ');
}

function scopeCss(cssRaw, scope) {
  const css = cssRaw.replace(/\/\*[\s\S]*?\*\//g, ''); // strip comments (may hold braces)
  const out = [];
  let i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === '@') {
      let j = i;
      while (j < css.length && css[j] !== '{' && css[j] !== ';') j += 1;
      const prelude = css.slice(i, j).trim();
      const kw = (prelude.match(/^@([a-z-]+)/i) || [])[1] || '';
      if (css[j] === ';' || j >= css.length) { out.push(`${prelude};`); i = j + 1; continue; }
      const block = readBlock(css, j);
      if (/keyframes|font-face|page|counter-style|property/i.test(kw)) {
        out.push(`${prelude}{${block.body}}`); // leave inner intact (global names)
      } else {
        out.push(`${prelude}{${scopeCss(block.body, scope)}}`); // @media/@supports: recurse
      }
      i = block.end;
      continue;
    }
    let j = i;
    while (j < css.length && css[j] !== '{' && css[j] !== '}' && css[j] !== '@') j += 1;
    if (css[j] === '{') {
      const selector = css.slice(i, j);
      const block = readBlock(css, j);
      out.push(`${prefixSelectors(selector, scope)}{${block.body}}`);
      i = block.end;
    } else {
      out.push(css.slice(i, j));
      i = j;
    }
  }
  return out.join('');
}

// ── Sources ──────────────────────────────────────────────────────────────────
const SOURCES = [
  { file: 'session-02-vibe-coding.html', scope: 'src-s2', pick: [2, 3, 4, 6, 7, 9], label: '2강 · 바이브코딩' },
  { file: 'session-03-direction.html', scope: 'src-s3', pick: [2, 3, 4, 5, 6, 7, 8, 9], label: '3강 · 개발 용어' },
  { file: 'session-04-revenue.html', scope: 'src-s4', pick: [2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 15], label: '4강 · 파일 구조' },
  { file: 'session-05-security-api.html', scope: 'src-s5', pick: [2, 3, 4, 7, 6, 9, 10, 11], label: '5강 · 배포·보안' },
];

// ── 고도화/삽입: clean, visual-first custom slides (op-* style) ───────────────
// flow(steps) draws a left-to-right block diagram with arrows; chips()/box() helpers.
const flow = (steps) => `<div class="op-flow">${steps.map((s, i) => `${i ? '<span class="op-arrow">→</span>' : ''}<div class="op-node ${s.tone || ''}"><b>${s.t}</b>${s.d ? `<span>${s.d}</span>` : ''}</div>`).join('')}</div>`;
const opSlide = (eyebrow, title, visual, cap) => `<div class="slide op-slide">
  <div class="op-eyebrow">${eyebrow}</div>
  <h2 class="op-title">${title}</h2>
  <div class="op-visual">${visual}</div>
  <p class="op-cap">${cap}</p>
</div>`;

const REACT_NEXT = `<div class="slide op-slide op-rn">
  <div class="op-eyebrow">FRAMEWORK · REACT / NEXT.JS</div>
  <h2 class="op-title">React·Next.js — 화면을 <span class="g">조각</span>으로 만들어 <span class="a">사이트</span>로 묶는다</h2>
  <div class="op-rn-stage">
    <div class="op-rn-parts">
      <div class="op-comp"><code>&lt;Header/&gt;</code><div class="mk-nav"><i></i><i></i><i></i></div></div>
      <div class="op-comp"><code>&lt;Card/&gt;</code><div class="mk-card"><div class="mk-img"></div><div class="mk-l"></div><div class="mk-l s"></div></div></div>
      <div class="op-comp"><code>&lt;Button/&gt;</code><div class="mk-btn">시작하기</div></div>
    </div>
    <div class="op-rn-arrow"><span>조립</span>→</div>
    <div class="op-browser">
      <div class="op-bchrome"><i></i><i></i><i></i><small>my-app.vercel.app</small></div>
      <div class="op-bbody">
        <div class="bd b1 mk-nav"><i></i><i></i><i></i></div>
        <div class="bd b2 mk-card"><div class="mk-img"></div><div class="mk-l"></div><div class="mk-l s"></div></div>
        <div class="bd b3"><span class="mk-btn">시작하기</span></div>
      </div>
    </div>
  </div>
  <div class="op-rn-next"><b>Next.js</b> — 이 조각들을 묶어 <span class="a">주소·페이지·배포</span>를 자동으로 처리하는 틀</div>
  <p class="op-cap">한 줄: <b>React는 화면 조각, Next.js는 그 조각들을 사이트로 묶는 틀</b>입니다.</p>
</div>`;

const UI_UX = `<div class="slide op-slide">
  <div class="op-eyebrow">CONCEPT · UI vs UX</div>
  <h2 class="op-title"><span class="g">UI</span>는 보이는 화면, <span class="a">UX</span>는 쓰는 경험</h2>
  <div class="op-cols">
    <div class="op-card"><div class="op-card-h g">UI · 보이는 것</div>
      <div class="op-screen"><div class="sc-img"></div><div class="sc-row"><span class="sc-l"></span><b>₩29,000</b></div><span class="mk-btn">담기</span></div>
      <small>색·배치·글꼴 — <b>눈에 보이는</b> 요소</small>
    </div>
    <div class="op-card"><div class="op-card-h a">UX · 느끼는 것</div>
      <div class="op-ux"><div class="ux-step">상품 도착</div><div class="ux-line"><i></i></div><div class="ux-step">바로 찾고</div><div class="ux-line"><i class="d2"></i></div><div class="ux-step done">3초 결제 ✓</div></div>
      <small>막힘 없이 <b>목표에 닿는 흐름</b></small>
    </div>
  </div>
  <p class="op-cap">화면이 예뻐도(UI) <b>흐름(UX)</b>이 불편하면 안 됩니다 — 둘은 다릅니다.</p>
</div>`;

const ANIM = `<div class="slide op-slide">
  <div class="op-eyebrow">CONCEPT · INTERFACE ANIMATION</div>
  <h2 class="op-title">애니메이션 = <span class="g">화면의 변화</span>로 다음 행동을 안내</h2>
  <div class="op-demos">
    <div class="op-demo"><span class="dm-heart">♥</span><small>좋아요 — 채워짐</small></div>
    <div class="op-demo"><span class="dm-toggle"><i></i></span><small>토글 — 켜짐/꺼짐</small></div>
    <div class="op-demo"><span class="dm-load"><i></i></span><small>로딩 — 진행 표시</small></div>
  </div>
  <div class="op-legend">클릭 → <b>부드러운 변화</b> → "방금 무슨 일이 일어났는지"를 즉시 이해</div>
  <p class="op-cap">장식이 아니라 <b>변화와 다음 행동을 이해시키는 신호</b>입니다.</p>
</div>`;

const BACKEND = `<div class="slide op-slide op-api">
  <div class="op-eyebrow">CONCEPT · BACKEND ROUND TRIP</div>
  <h2 class="op-title">백엔드 — 로그인은 <span class="g">뒤에서 이렇게 처리</span>됩니다</h2>
  <div class="op-api-stage">
    <div class="op-phone"><div class="ph-top">로그인</div><div class="ph-body lg"><span class="lg-f">아이디</span><span class="lg-f">••••••••</span><span class="mk-btn">로그인</span></div></div>
    <div class="op-wire">
      <div class="op-wlabel req">서버: 비밀번호 확인 → DB: 회원 조회</div>
      <div class="op-wtrack"><span class="op-packet"></span></div>
      <div class="op-wlabel res">응답: 로그인 성공 ✓</div>
    </div>
    <div class="op-cloud"><b>서버 · DB</b><span>처리·판단</span></div>
  </div>
  <p class="op-cap">눈에 안 보이지만 <b>요청을 받아 확인·처리하고 결과를 돌려주는</b> 곳이 백엔드입니다.</p>
</div>`;

const DB = `<div class="slide op-slide">
  <div class="op-eyebrow">CONCEPT · DATABASE</div>
  <h2 class="op-title">데이터베이스 — 기록을 <span class="g">역할별 보관함</span>에 정리</h2>
  <div class="op-dbx">
    <div class="dbx-item">새 회원<br><b>김민수</b></div>
    <div class="dbx-arrow">→</div>
    <div class="dbx-tables">
      <div class="dbx-t active">회원 테이블<span class="dbx-row">+ 김민수 · 가입</span></div>
      <div class="dbx-t">주문 테이블</div>
      <div class="dbx-t">상품 테이블</div>
    </div>
  </div>
  <p class="op-cap">아무 데나가 아니라 <b>역할별 보관함(테이블)</b>에 정리해야 빨리 찾고 안 섞입니다.</p>
</div>`;

const API = `<div class="slide op-slide op-api">
  <div class="op-eyebrow">CONCEPT · SERVICE CONNECTION (API)</div>
  <h2 class="op-title">API — 내 서비스가 <span class="g">다른 서비스에 부탁</span>하는 창구</h2>
  <div class="op-api-stage">
    <div class="op-phone"><div class="ph-top">내 날씨 앱</div><div class="ph-body"><div class="ph-temp">23°</div><div class="ph-city">서울 · 맑음</div></div></div>
    <div class="op-wire">
      <div class="op-wlabel req">GET /weather?city=seoul</div>
      <div class="op-wtrack"><span class="op-packet"></span></div>
      <div class="op-wlabel res">{ "temp": 23, "sky": "맑음" }</div>
    </div>
    <div class="op-cloud"><b>날씨 API</b><span>외부 서비스</span></div>
  </div>
  <p class="op-cap">날씨를 직접 재지 않고, <b>이미 있는 날씨 API에 요청해 결과를 받아</b> 화면에 보여줍니다.</p>
</div>`;

const RELEASE = `<div class="slide op-slide">
  <div class="op-eyebrow">OPERATION · RELEASE</div>
  <h2 class="op-title">검증한 버전을 <span class="g">기준점(태그)</span>으로 공개</h2>
  <div class="op-pipe">
    <div class="pipe-step p1">빌드<span>결과물</span></div>
    <div class="pipe-step p2">검증 ✓<span>정상 확인</span></div>
    <div class="pipe-step p3">v1.0 태그<span>기준점</span></div>
    <div class="pipe-step p4 live">공개<span>배포</span></div>
    <div class="pipe-beam"></div>
  </div>
  <div class="op-rel-card"><b>GitHub Release · v1.0</b> — 검증됨 · 체크섬 · 되돌릴 수 있는 기준점</div>
  <p class="op-cap">아무 때나가 아니라 <b>검증된 시점을 기준점으로 묶어</b> 공개합니다.</p>
</div>`;

const LAUNCH = `<div class="slide op-slide">
  <div class="op-eyebrow">OPERATION · LAUNCH CHECK</div>
  <h2 class="op-title">공개 URL에서 <span class="g">사용자처럼</span> 다시 확인</h2>
  <div class="op-launch">
    <div class="op-browser"><div class="op-bchrome"><i></i><i></i><i></i><small>https://my-service.app</small></div><div class="lc-body"><div class="lc-hero"></div><div class="mk-l"></div><div class="mk-l s"></div></div></div>
    <ul class="op-checks">
      <li class="lc1">첫 화면이 뜨는가</li>
      <li class="lc2">핵심 동작이 되는가</li>
      <li class="lc3">모바일에서도 보이는가</li>
      <li class="lc4">비밀값이 노출되지 않는가</li>
    </ul>
  </div>
  <p class="op-cap">내 PC가 아니라 <b>실제 공개 주소에서 사용자 입장으로</b> 점검합니다.</p>
</div>`;

// scope:n keys map to the reused slide that gets replaced (override) or followed (insert).
const OVERRIDES = {
  'src-s3:5': UI_UX, 'src-s3:6': ANIM, 'src-s3:7': BACKEND, 'src-s3:8': DB, 'src-s3:9': API,
  'src-s5:10': RELEASE, 'src-s5:11': LAUNCH,
};
const INSERTS = { 'src-s4:7': REACT_NEXT };

const styleBlocks = [];
const slideBlocks = [];
for (const src of SOURCES) {
  const html = read(src.file);
  styleBlocks.push(`/* ===== ${src.label} (${src.file}) ===== */\n${scopeCss(extractStyle(html), src.scope)}`);
  const slides = extractSlides(html);
  for (const n of src.pick) {
    const key = `${src.scope}:${n}`;
    if (OVERRIDES[key]) {
      slideBlocks.push(OVERRIDES[key]); // 고도화: clean visual replacement
    } else {
      const slide = slides[n - 1]; // 1-based
      if (!slide) { console.warn(`! ${src.file} slide ${n} not found (have ${slides.length})`); continue; }
      slideBlocks.push(`<div class="src-scope ${src.scope}">\n${slide}\n</div>`);
    }
    if (INSERTS[key]) slideBlocks.push(INSERTS[key]);
  }
}

const cover = `<div class="src-scope src-s2"><div class="slide cover active">
  <div class="deco-grid"></div><div class="deco-orb deco-orb-1"></div><div class="deco-orb deco-orb-2"></div>
  <div class="deck-meta">AI 한방 이해하기 · 1주차 (4주 집중)</div>
  <div class="lead">기초 2~5강을 한 번에 — 180분 집중</div>
  <h1>바이브코딩의 원리,<br><span class="grad-text">왜 AI에게 맡겨도 되는가.</span></h1>
  <p class="subtitle">바이브코딩 개념과 도구 → 개발 용어(프론트·백엔드·DB·API) → 파일 구조와 React/Next → 배포·보안까지,<br>오늘 한 흐름으로 훑습니다.</p>
</div></div>`;

const total = slideBlocks.length + 1;

// Unified chrome + deck mechanics. Owns nav + slide show/hide so no source session's
// own .slide/.app/.deck rules (now scoped) drive the deck frame.
const chrome = `
*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#070b11;color:#eaf2f6;font-family:Pretendard,"Malgun Gothic",sans-serif;-webkit-font-smoothing:antialiased}
.app{position:fixed;inset:0}
.nav-bar{position:fixed;top:0;left:0;right:0;height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 20px;background:rgba(8,12,18,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.1);z-index:100}
.nav-title{font-weight:700;font-size:13px;color:#cdd8de;letter-spacing:.01em}
.nav-controls{display:flex;align-items:center;gap:8px}
.nav-btn{width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);color:#eaf2f6;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}
.nav-btn:disabled{opacity:.3;cursor:default}
#counter{min-width:58px;text-align:center;color:#9fb0bd;font:700 13px ui-monospace,SFMono-Regular,Consolas,monospace}
.deck{position:absolute;top:48px;left:0;right:0;bottom:0;overflow:hidden}
.src-scope{display:contents}
.app .deck .slide{position:absolute;inset:0;overflow-y:auto}
.app .deck .slide:not(.active){display:none!important}
.app .deck .slide.active{display:flex!important;flex-direction:column;opacity:1!important;transform:none!important;pointer-events:all!important;transition:none!important;animation:none!important}
/* entrance animations on REUSED content use both-fill (start opacity:0); force visible.
   op-slides (custom 고도화) keep their intentional animations. */
.app .deck .slide.active:not(.op-slide) *{animation:none!important;opacity:1!important}
.app .deck .slide.cover{justify-content:center}
/* op-enhanced (고도화): clean visual-first custom slides */
.op-slide{padding:clamp(30px,4.2vw,64px) clamp(40px,6vw,96px)!important;gap:18px;justify-content:center}
.op-eyebrow{color:#34d399;font:800 12px/1 ui-monospace,SFMono-Regular,monospace;letter-spacing:.16em}
.op-title{margin:6px 0 4px;font-size:clamp(27px,3.3vw,46px);font-weight:800;line-height:1.14;letter-spacing:-.01em;word-break:keep-all}
.op-title .g{color:#34d399}.op-title .a{color:#fbbf24}
.op-visual{margin:6px 0;display:flex;flex-direction:column;gap:16px}
.op-cap{margin:0;color:#aebcc4;font-size:clamp(14px,1.3vw,18px);line-height:1.55;word-break:keep-all}
.op-cap b,.op-cap .g{color:#eaf2f6}
.op-flow{display:flex;align-items:center;flex-wrap:wrap;gap:10px}
.op-node{display:flex;flex-direction:column;gap:4px;padding:15px 19px;min-width:118px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:rgba(255,255,255,.04)}
.op-node b{color:#eaf2f6;font-size:clamp(15px,1.5vw,19px)}
.op-node span{color:#9fb0bd;font:700 12px ui-monospace,monospace}
.op-node.a{border-color:rgba(251,191,36,.4);background:rgba(251,191,36,.08)}.op-node.a b{color:#fbbf24}
.op-node.g{border-color:rgba(52,211,153,.4);background:rgba(52,211,153,.08)}.op-node.g b{color:#34d399}
.op-arrow{color:#6b7a85;font-size:22px;font-weight:800}
.op-cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.op-card{display:flex;flex-direction:column;gap:12px;padding:22px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:rgba(255,255,255,.03)}
.op-card-h{color:#eaf2f6;font-weight:800;font-size:clamp(16px,1.6vw,21px)}
.op-card-h.g{color:#34d399}.op-card-h.a{color:#fbbf24}
.op-card small{color:#9fb0bd;font-size:13px;line-height:1.5}.op-card small b{color:#eaf2f6}
.op-merge{color:#6b7a85;font:800 13px ui-monospace,monospace;text-align:center}
.op-page,.op-ui-mock{display:flex;flex-direction:column;gap:7px;padding:14px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:#0c1320}
.op-page-bar{height:9px;border-radius:5px;background:rgba(255,255,255,.16)}.op-page-bar.s{width:60%}
.op-page-btn{align-self:flex-start;margin-top:4px;padding:6px 14px;border-radius:7px;background:#1c7d5e;color:#fff;font:800 12px ui-monospace,monospace}
.op-anim{display:flex;align-items:center}
.op-track{flex:1;height:3px;margin:0 14px;border-radius:3px;background:linear-gradient(90deg,rgba(255,255,255,.12),rgba(52,211,153,.55));position:relative}
.op-dot{position:absolute;right:0;top:50%;width:12px;height:12px;border-radius:50%;background:#34d399;box-shadow:0 0 14px #34d399;transform:translateY(-50%)}
.op-legend{color:#9fb0bd;font-size:13px}
.op-db{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.op-db-in{padding:16px 18px;border:1px dashed rgba(255,255,255,.22);border-radius:12px;color:#cdd8de;font-weight:700}
.op-shelves{display:grid;gap:8px}
.op-shelves div{padding:11px 16px;border:1px solid rgba(52,211,153,.3);border-radius:9px;background:rgba(52,211,153,.07);color:#d9f3e8;font:700 13px ui-monospace,monospace}
.op-check{display:flex;flex-direction:column;gap:12px}
.op-url{align-self:flex-start;padding:9px 16px;border:1px solid rgba(52,211,153,.4);border-radius:8px;background:rgba(52,211,153,.08);color:#34d399;font:800 14px ui-monospace,monospace}
.op-check ul{margin:0;padding:0;list-style:none;display:grid;gap:9px}
.op-check li{color:#d9e3e6;font-size:clamp(14px,1.4vw,18px)}
/* elevated React/Next — realistic mockups + build animation */
.op-rn-stage{display:flex;align-items:center;gap:clamp(14px,2vw,30px)}
.op-rn-parts{display:grid;gap:9px}
.op-comp{display:flex;align-items:center;gap:12px;padding:10px 13px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(255,255,255,.03)}
.op-comp code{color:#7dd3fc;font:800 12px ui-monospace,SFMono-Regular,monospace;min-width:80px}
.mk-nav{display:flex;gap:5px;width:118px}.mk-nav i{flex:1;height:8px;border-radius:3px;background:rgba(255,255,255,.24)}
.mk-card{width:118px;display:grid;gap:4px}.mk-img{height:24px;border-radius:5px;background:linear-gradient(120deg,#34d399,#60a5fa)}.mk-l{height:6px;border-radius:3px;background:rgba(255,255,255,.22)}.mk-l.s{width:60%}
.mk-btn{display:inline-block;padding:6px 14px;border-radius:7px;background:#1c7d5e;color:#fff;font:800 12px ui-monospace,monospace}
.op-rn-arrow{display:flex;flex-direction:column;align-items:center;color:#6b7a85;font:800 16px ui-monospace,monospace}.op-rn-arrow span{font-size:10px;letter-spacing:.1em}
.op-browser{flex:1;max-width:430px;border:1px solid rgba(255,255,255,.16);border-radius:12px;overflow:hidden;background:#0c1320;box-shadow:0 30px 60px -24px rgba(0,0,0,.72)}
.op-bchrome{display:flex;align-items:center;gap:6px;padding:9px 12px;background:#172230;border-bottom:1px solid rgba(255,255,255,.08)}
.op-bchrome i{width:9px;height:9px;border-radius:50%;background:#46505c}.op-bchrome i:nth-child(1){background:#ed6a5e}.op-bchrome i:nth-child(2){background:#f4bf4f}.op-bchrome i:nth-child(3){background:#61c554}
.op-bchrome small{margin-left:6px;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.op-bbody{padding:18px;display:grid;gap:13px;min-height:172px;align-content:start}
.op-bbody .bd{opacity:0;animation:rnBuild 4.8s ease infinite}
.op-bbody .b1{animation-delay:.2s}.op-bbody .b2{animation-delay:1s}.op-bbody .b3{animation-delay:1.8s}
.op-bbody .mk-nav,.op-bbody .mk-card{width:auto}
@keyframes rnBuild{0%,3%{opacity:0;transform:translateY(9px)}11%,88%{opacity:1;transform:none}97%,100%{opacity:0;transform:translateY(-4px)}}
.op-rn-next{margin-top:8px;padding:11px 16px;border-left:3px solid #fbbf24;background:rgba(251,191,36,.08);border-radius:0 8px 8px 0;color:#d9e3e6;font-size:14px}.op-rn-next b{color:#fbbf24}
/* elevated API — phone mockup + request/response packet */
.op-api-stage{display:flex;align-items:center;gap:clamp(16px,3vw,46px);justify-content:center;padding:6px 0}
.op-phone{width:142px;border:2px solid rgba(255,255,255,.18);border-radius:22px;overflow:hidden;background:#0a1118;box-shadow:0 26px 52px -20px rgba(0,0,0,.72)}
.ph-top{padding:9px;text-align:center;color:#9fb0bd;font:700 11px ui-monospace,monospace;border-bottom:1px solid rgba(255,255,255,.08)}
.ph-body{padding:28px 16px;text-align:center;background:linear-gradient(160deg,#0f3a4d,#0a1118)}
.ph-temp{font:800 46px/1 Pretendard,sans-serif;color:#7dd3fc}.ph-city{margin-top:8px;color:#aebcc4;font-size:13px}
.op-wire{flex:1;max-width:360px;display:grid;gap:9px}
.op-wlabel{font:700 12px ui-monospace,monospace;padding:6px 11px;border-radius:6px}
.op-wlabel.req{color:#fbbf24;background:rgba(251,191,36,.1);justify-self:start}
.op-wlabel.res{color:#34d399;background:rgba(52,211,153,.1);justify-self:end}
.op-wtrack{position:relative;height:3px;border-radius:3px;background:linear-gradient(90deg,rgba(251,191,36,.45),rgba(52,211,153,.45))}
.op-packet{position:absolute;top:50%;left:0;width:14px;height:14px;border-radius:50%;background:#fbbf24;box-shadow:0 0 14px #fbbf24;transform:translateY(-50%);animation:apiPacket 3.6s ease-in-out infinite}
@keyframes apiPacket{0%{left:0;opacity:0;background:#fbbf24;box-shadow:0 0 14px #fbbf24}9%{opacity:1}44%{left:calc(100% - 14px);background:#fbbf24;box-shadow:0 0 14px #fbbf24}53%{left:calc(100% - 14px);background:#34d399;box-shadow:0 0 14px #34d399}92%{left:0;background:#34d399;box-shadow:0 0 14px #34d399;opacity:1}100%{left:0;opacity:0}}
.op-cloud{width:140px;text-align:center;padding:22px 14px;border:1px solid rgba(255,255,255,.16);border-radius:16px;background:rgba(255,255,255,.04)}
.op-cloud b{display:block;color:#eaf2f6;font-size:16px}.op-cloud span{color:#9fb0bd;font:700 11px ui-monospace,monospace}
/* UI/UX — screen mockup + animated flow */
.op-screen{display:grid;gap:9px;padding:14px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:#0c1320}
.sc-img{height:66px;border-radius:7px;background:linear-gradient(120deg,#34d399,#60a5fa)}
.sc-row{display:flex;align-items:center;justify-content:space-between}.sc-l{width:50%;height:8px;border-radius:4px;background:rgba(255,255,255,.2)}.sc-row b{color:#eaf2f6;font-size:15px}
.op-screen .mk-btn{text-align:center}
.op-ux{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.ux-step{padding:11px 14px;border:1px solid rgba(251,191,36,.35);border-radius:9px;background:rgba(251,191,36,.07);color:#fbe6a8;font:700 13px Pretendard,sans-serif}
.ux-step.done{border-color:rgba(52,211,153,.5);background:rgba(52,211,153,.12);color:#7ee8b0;animation:uxPulse 2.6s ease-in-out infinite}
.ux-line{flex:1;min-width:22px;height:3px;border-radius:3px;background:rgba(255,255,255,.12);overflow:hidden;position:relative}
.ux-line i{position:absolute;inset:0;background:linear-gradient(90deg,#fbbf24,#34d399);transform-origin:left;animation:uxFill 2.6s ease-in-out infinite}
.ux-line i.d2{animation-delay:.5s}
@keyframes uxFill{0%,10%{transform:scaleX(0)}45%,100%{transform:scaleX(1)}}
@keyframes uxPulse{0%,40%{box-shadow:0 0 0 0 rgba(52,211,153,0)}60%{box-shadow:0 0 18px 2px rgba(52,211,153,.4)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
/* ANIM — real micro-interaction demos */
.op-demos{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.op-demo{display:flex;flex-direction:column;align-items:center;gap:14px;padding:26px 16px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:rgba(255,255,255,.03)}
.op-demo small{color:#9fb0bd;font-size:12px}
.dm-heart{font-size:40px;color:#3a4450;animation:dmHeart 2.4s ease-in-out infinite}
@keyframes dmHeart{0%,30%{color:#3a4450;transform:scale(1)}45%{color:#ff5a7a;transform:scale(1.25)}70%,100%{color:#ff5a7a;transform:scale(1)}}
.dm-toggle{width:56px;height:30px;border-radius:99px;position:relative;animation:dmTrack 2.6s ease-in-out infinite}
.dm-toggle i{position:absolute;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;animation:dmKnob 2.6s ease-in-out infinite}
@keyframes dmKnob{0%,40%{left:3px}60%,100%{left:29px}}
@keyframes dmTrack{0%,40%{background:#3a4450}60%,100%{background:#1c7d5e}}
.dm-load{width:60px;height:60px;border-radius:50%;border:4px solid rgba(255,255,255,.12);border-top-color:#34d399;animation:dmSpin 1.1s linear infinite}
@keyframes dmSpin{to{transform:rotate(360deg)}}
/* BACKEND login form */
.ph-body.lg{display:grid;gap:9px;padding:22px 16px}
.lg-f{padding:9px 12px;border:1px solid rgba(255,255,255,.14);border-radius:7px;color:#9fb0bd;font:700 12px ui-monospace,monospace;text-align:left}
.ph-body.lg .mk-btn{text-align:center}
/* DB — record into table (animated) */
.op-dbx{display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center}
.dbx-item{padding:18px 22px;border:1px dashed rgba(52,211,153,.45);border-radius:12px;color:#cdd8de;text-align:center;animation:dbxIn 3s ease-in-out infinite}
.dbx-item b{color:#34d399;font-size:18px}
.dbx-arrow{color:#6b7a85;font-size:24px;font-weight:800}
.dbx-tables{display:grid;gap:9px}
.dbx-t{padding:12px 18px;border:1px solid rgba(255,255,255,.12);border-radius:9px;background:rgba(255,255,255,.03);color:#aebcc4;font:700 13px ui-monospace,monospace;min-width:240px}
.dbx-t.active{border-color:rgba(52,211,153,.45);background:rgba(52,211,153,.08);color:#d9f3e8}
.dbx-row{display:block;margin-top:6px;color:#34d399;font-size:12px;animation:dbxRow 3s ease-in-out infinite}
@keyframes dbxIn{0%,12%{opacity:.4;transform:translateX(-8px)}30%,100%{opacity:1;transform:none}}
@keyframes dbxRow{0%,22%{opacity:0}40%,100%{opacity:1}}
/* RELEASE pipeline (animated progress) */
.op-pipe{position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 4px}
.pipe-step{position:relative;z-index:2;flex:1;text-align:center;padding:16px 8px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:#0c1320;color:#cdd8de;font:800 15px Pretendard,sans-serif;opacity:.45;animation:pipeLit 4.4s ease-in-out infinite}
.pipe-step span{display:block;margin-top:4px;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.pipe-step.live{border-color:rgba(52,211,153,.5);color:#7ee8b0}
.pipe-step.p1{animation-delay:.2s}.pipe-step.p2{animation-delay:1s}.pipe-step.p3{animation-delay:1.8s}.pipe-step.p4{animation-delay:2.6s}
@keyframes pipeLit{0%,7%{opacity:.4}16%,92%{opacity:1}100%{opacity:.4}}
.pipe-beam{position:absolute;left:0;top:50%;height:3px;width:0;border-radius:3px;background:linear-gradient(90deg,#fbbf24,#34d399);z-index:1;animation:pipeBeam 4.4s ease-in-out infinite}
@keyframes pipeBeam{0%,7%{width:0}82%,100%{width:100%}}
.op-rel-card{margin-top:8px;padding:12px 16px;border:1px solid rgba(52,211,153,.3);border-radius:10px;background:rgba(52,211,153,.06);color:#d9e3e6;font-size:14px}.op-rel-card b{color:#34d399}
/* LAUNCH — live URL + animated checklist */
.op-launch{display:flex;align-items:center;gap:clamp(18px,3vw,44px)}
.op-launch .op-browser{flex:0 0 auto;width:300px}
.lc-body{padding:16px;display:grid;gap:9px}.lc-hero{height:78px;border-radius:8px;background:linear-gradient(120deg,#1c7d5e,#2563eb)}
.op-checks{flex:1;margin:0;padding:0;list-style:none;display:grid;gap:12px}
.op-checks li{position:relative;padding-left:34px;color:#d9e3e6;font-size:clamp(14px,1.4vw,18px)}
.op-checks li::before{content:'';position:absolute;left:0;top:50%;width:22px;height:22px;margin-top:-11px;border-radius:6px;border:1px solid rgba(52,211,153,.5);background:rgba(52,211,153,.08)}
.op-checks li::after{content:'✓';position:absolute;left:5px;top:50%;margin-top:-12px;color:#34d399;font-weight:800;opacity:0;animation:lcCheck 4.6s ease-in-out infinite}
.op-checks li.lc1::after{animation-delay:.4s}.op-checks li.lc2::after{animation-delay:1.1s}.op-checks li.lc3::after{animation-delay:1.8s}.op-checks li.lc4::after{animation-delay:2.5s}
@keyframes lcCheck{0%,5%{opacity:0;transform:scale(.5)}13%,92%{opacity:1;transform:none}100%{opacity:0}}`;

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI 한방 이해하기 · 1주차 — 바이브코딩의 원리</title>
<link rel="stylesheet" href="../../assets/fonts/pretendard.css">
<link rel="stylesheet" href="../../renderer/interactive-education.css">
<style>
${chrome}

${styleBlocks.join('\n\n')}
</style>
</head>
<body>
<div class="app">
  <nav class="nav-bar">
    <span class="nav-title">AI 한방 이해하기 · 1주차 · 바이브코딩의 원리</span>
    <div class="nav-controls">
      <button class="nav-btn" id="btn-prev" onclick="move(-1)">←</button>
      <span id="counter">1 / ${total}</span>
      <button class="nav-btn" id="btn-next" onclick="move(1)">→</button>
    </div>
  </nav>
  <div class="deck">
${cover}
${slideBlocks.join('\n')}
  </div><!-- .deck -->
</div><!-- .app -->
<script>
const slides=[...document.querySelectorAll('.slide')];
let cur=0;
function render(){slides.forEach(function(s,i){s.classList.remove('active','prev');if(i===cur)s.classList.add('active');else if(i<cur)s.classList.add('prev');});var a=slides[cur];if(a)a.scrollTop=0;document.getElementById('counter').textContent=(cur+1)+' / '+slides.length;document.getElementById('btn-prev').disabled=cur===0;document.getElementById('btn-next').disabled=cur===slides.length-1;}
function move(d){cur=Math.max(0,Math.min(slides.length-1,cur+d));render();}
window.move=move;
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}});
document.querySelectorAll('.card[data-hl]').forEach(function(c){c.addEventListener('click',function(){c.classList.toggle('lit');});});
document.querySelectorAll('.workbench-node[data-step]').forEach(function(node){node.addEventListener('click',function(){var all=node.closest('.vibe-workbench').querySelectorAll('[data-step]');var was=node.classList.contains('is-live');all.forEach(function(i){i.classList.remove('is-live');});if(!was)node.classList.add('is-live');});});
document.querySelectorAll('.visual-loop .ln').forEach(function(node){node.addEventListener('click',function(){var all=node.closest('.visual-loop').querySelectorAll('.ln');var was=node.classList.contains('is-active');all.forEach(function(n){n.classList.remove('is-active');});if(!was)node.classList.add('is-active');});});
document.querySelectorAll('.check-item[data-check]').forEach(function(item){item.addEventListener('click',function(){item.classList.toggle('done');var ind=item.querySelector('.check-indicator');if(ind)ind.textContent=item.classList.contains('done')?'✓':'';});});
render();
</script>
</body>
</html>
`;

// check.js counts `<div class="slide` by prefix, which false-matches `.slide-takeaway`.
// Rename it consistently (markup + scoped CSS) so the static slide counter stays accurate.
const finalHtml = html.replace(/slide-takeaway/g, 'op-takeaway');
fs.writeFileSync(OUT, finalHtml, 'utf-8');
console.log(`onepass-week1.html: ${slideBlocks.length} reused slides + cover from ${SOURCES.length} sources (total ${total})`);

// Shared shell (chrome + op-enhanced CSS) reused by week 2-4 builders.
module.exports = { chrome, scopeCss, extractSlides };
