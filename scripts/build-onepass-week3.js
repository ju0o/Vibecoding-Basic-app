'use strict';

// onepass Week 3 — "나만의 MCP·Skill 제작 + SubAgent·Workflow". All-custom op-enhanced
// tutorial slides reusing the shared shell (chrome + op-* CSS) from the week-1 builder.

const fs = require('fs');
const path = require('path');
const { chrome } = require('./build-onepass-week1.js');

const OUT = path.join(__dirname, '..', 'src', 'content', 'sessions', 'onepass-week3.html');

const flow = (steps) => `<div class="op-flow">${steps.map((s, i) => `${i ? '<span class="op-arrow">→</span>' : ''}<div class="op-node ${s.tone || ''}"><b>${s.t}</b>${s.d ? `<span>${s.d}</span>` : ''}</div>`).join('')}</div>`;
const slide = (eyebrow, title, visual, cap) => `<div class="slide op-slide"><div class="op-eyebrow">${eyebrow}</div><h2 class="op-title">${title}</h2><div class="op-visual">${visual}</div><p class="op-cap">${cap}</p></div>`;
const term = (label, lines) => `<div class="op-term"><div class="op-tbar"><i></i><i></i><i></i><small>${label}</small></div><div class="op-tbody">${lines.map(([t, x]) => `<span class="tl ${t}">${x}</span>`).join('')}<span class="tl-cursor"></span></div></div>`;

const COVER = `<div class="slide op-cover active">
  <div class="op-eyebrow">AI 한방 이해하기 · 3주차 (4주 집중)</div>
  <h1 class="op-cover-title">나만의 <span class="g">MCP·Skill</span> 만들기<br>+ <span class="a">SubAgent·Workflow</span></h1>
  <p class="op-cover-sub">이해했으면 이제 <b>직접 만듭니다</b> — 나만의 Skill·MCP, 작업을 나눠 병렬 처리하는 SubAgent, 반복을 자동화하는 Workflow까지.</p>
  <div class="op-cover-flow"><span>Skill 제작</span><span>MCP 연결</span><span>SubAgent 병렬</span><span>Workflow 자동화</span></div>
</div>`;

const SLIDES = [
  slide('UNDERSTAND → BUILD', '이번 주는 <span class="g">이해에서 제작으로</span>',
    flow([{ t: '2주차', d: '개념 이해' }, { t: '3주차', d: '직접 제작', tone: 'g' }, { t: '4주차', d: '하나로 통합', tone: 'a' }]),
    '남이 만든 걸 쓰는 단계에서, <b>내 작업에 맞는 자산을 직접 만드는</b> 단계로 넘어갑니다.'),

  slide('BUILD · SKILL', '나만의 Skill — <span class="g">SKILL.md</span>로 절차를 저장',
    `<div class="op-file">
      <div class="of-h">📄 SKILL.md</div>
      <div class="of-body">
        <span class="of-key">## 트리거</span><span>"PR 요약해줘"라고 하면</span>
        <span class="of-key">## 절차</span><span>1. 변경 파일 수집 → 2. diff 요약 → 3. 체크리스트</span>
        <span class="of-key">## 예시</span><span>입력/출력 샘플 1개</span>
        <span class="of-key">## 검증</span><span>요약에 변경 의도·위험이 포함됐는가</span>
      </div>
    </div>`,
    '반복 작업의 <b>트리거·절차·예시·검증</b>을 파일로 적어두면, 누가·언제 불러도 같은 결과가 나옵니다.'),

  slide('BUILD · SKILL', 'Skill 제작 — <span class="g">4단계</span>로 만든다',
    flow([{ t: '신호 발견', d: '반복 작업' }, { t: '절차화', d: '단계·예시', tone: 'a' }, { t: '검증 기준', d: '통과 조건', tone: 'a' }, { t: '재사용', d: '트리거로 호출', tone: 'g' }]),
    '거창하게가 아니라 <b>자주 반복하는 작업 하나</b>부터 절차로 굳히면 됩니다.'),

  slide('BUILD · MCP', '나만의 MCP 연결 — <span class="g">설정 → 권한 → 테스트</span>',
    `${term('terminal — mcp', [['p', '$ claude mcp add filesystem'], ['o', '✓ connected · scope: read-only'], ['p', '$ claude'], ['d', '> 이 폴더 구조 정리해줘'], ['o', '✓ 파일 읽기 권한으로 안전하게 처리']])}
     ${flow([{ t: '설정', d: '서버 등록' }, { t: '권한', d: '최소 범위', tone: 'a' }, { t: '테스트', d: '동작 확인', tone: 'g' }])}`,
    '연결할 때 <b>읽기/쓰기 범위를 좁게</b> 잡고, 민감한 작업은 승인을 거치게 합니다.'),

  slide('PARALLEL · SUBAGENT', 'SubAgent — 큰 작업을 <span class="g">나눠서 병렬</span>로',
    `<div class="op-agents">
      <div class="ag-main">큰 작업<span>로그인 기능</span></div>
      <div class="ag-fan">
        <div class="ag-sub a1">서브 A<span>UI</span></div>
        <div class="ag-sub a2">서브 B<span>API</span></div>
        <div class="ag-sub a3">서브 C<span>테스트</span></div>
      </div>
      <div class="ag-merge">리뷰 후 통합 ✓</div>
    </div>`,
    '한 작업을 <b>겹치지 않는 단위로 나눠</b> 동시에 진행하고, 검증한 것만 합칩니다.'),

  slide('ISOLATE · WORKTREE', 'Worktree — <span class="g">격리된 작업 공간</span>으로 충돌 방지',
    `<div class="op-tree">
      <div class="tr-main">main<span>안정 버전</span></div>
      <div class="tr-branches">
        <div class="tr-b">worktree-1 · 기능 A</div>
        <div class="tr-b">worktree-2 · 기능 B</div>
      </div>
    </div>`,
    '각 작업을 <b>분리된 공간</b>에서 진행하면, 동시에 여러 기능을 만들어도 서로 안 섞입니다.'),

  slide('AUTOMATE · WORKFLOW', 'Workflow — 반복 흐름을 <span class="g">자동화</span>',
    `<div class="op-pipe">
      <div class="pipe-step p1">트리거<span>PR 생성</span></div>
      <div class="pipe-step p2">검토<span>diff 분석</span></div>
      <div class="pipe-step p3">테스트<span>자동 실행</span></div>
      <div class="pipe-step p4 live">리포트<span>요약 게시</span></div>
      <div class="pipe-beam"></div>
    </div>`,
    '매번 손으로 하던 <b>정해진 단계</b>를 트리거 한 번으로 자동 실행합니다.'),

  slide('EXAMPLE · WORKFLOW', 'Workflow 예시 — <span class="g">PR 자동 리뷰</span>',
    `${term('workflow — pr-review', [['p', '# PR이 열리면 자동 실행'], ['d', '› 변경 파일 수집'], ['d', '› 위험 지점 표시'], ['o', '✓ 리뷰 요약 코멘트 게시'], ['o', '✓ 사람은 판단만']])}`,
    '사람은 <b>판단·승인</b>에 집중하고, 반복 수집·정리는 Workflow가 대신합니다.'),

  slide('PRACTICE · NEXT', '오늘 실습과 <span class="g">다음 주</span>',
    `<div class="op-cols">
      <div class="op-card"><div class="op-card-h">오늘 실습</div><small>① 반복 작업 1개를 Skill로 · ② MCP 1개 연결 · ③ 작업 하나를 SubAgent로 나눠보기</small></div>
      <div class="op-card"><div class="op-card-h a">다음 주 (W4)</div><small><b>오케스트레이션 + 나만의 AI 사무실</b> — 만든 조각들을 하나의 흐름으로 묶습니다</small></div>
    </div>`,
    '제작까지 됐으면, 다음 주엔 이 조각들을 <b>하나의 AI 사무실</b>로 묶습니다.'),
];

const total = SLIDES.length + 1;

const extraCss = `
.op-cover{justify-content:center;gap:18px;padding:0 clamp(40px,7vw,120px)!important}
.op-cover .op-eyebrow{color:#34d399}
.op-cover-title{margin:0;font-size:clamp(38px,5vw,76px);font-weight:800;line-height:1.06;letter-spacing:-.02em;background:linear-gradient(180deg,#fff 40%,#9fb0bd);-webkit-background-clip:text;background-clip:text;color:transparent}
.op-cover-title .g{-webkit-text-fill-color:#34d399}.op-cover-title .a{-webkit-text-fill-color:#fbbf24}
.op-cover-sub{max-width:42em;color:#aebcc4;font-size:clamp(15px,1.5vw,21px);line-height:1.6;word-break:keep-all}.op-cover-sub b{color:#eaf2f6}
.op-cover-flow{display:flex;flex-wrap:wrap;gap:9px;margin-top:8px}
.op-cover-flow span{padding:8px 14px;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#aebcc4;font:750 12px ui-monospace,monospace}
.op-term{max-width:600px;border:1px solid rgba(255,255,255,.16);border-radius:12px;overflow:hidden;background:#0a0f17;box-shadow:0 26px 54px -24px rgba(0,0,0,.7)}
.op-tbar{display:flex;align-items:center;gap:6px;padding:9px 12px;background:#161f2c;border-bottom:1px solid rgba(255,255,255,.08)}
.op-tbar i{width:9px;height:9px;border-radius:50%;background:#46505c}.op-tbar i:nth-child(1){background:#ed6a5e}.op-tbar i:nth-child(2){background:#f4bf4f}.op-tbar i:nth-child(3){background:#61c554}
.op-tbar small{margin-left:6px;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.op-tbody{padding:16px 18px;display:grid;gap:8px;font:600 13.5px/1.4 ui-monospace,SFMono-Regular,monospace}
.op-tbody .tl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tl.p{color:#34d399}.tl.d{color:#c4d2dc}.tl.o{color:#7ce4a6}
.tl-cursor{width:9px;height:16px;background:#34d399;animation:tcur 1s steps(1) infinite}
@keyframes tcur{50%{opacity:0}}
.op-file{max-width:540px;border:1px solid rgba(125,211,252,.3);border-radius:12px;overflow:hidden;background:#0a0f17}
.of-h{padding:12px 18px;background:rgba(125,211,252,.1);color:#7dd3fc;font:800 14px ui-monospace,monospace;border-bottom:1px solid rgba(125,211,252,.18)}
.of-body{padding:16px 18px;display:grid;grid-template-columns:auto 1fr;gap:9px 14px;align-items:baseline}
.of-key{color:#7dd3fc;font:800 13px ui-monospace,monospace}
.of-body span:not(.of-key){color:#d9e3e6;font-size:13.5px}
.op-agents{display:flex;flex-direction:column;align-items:center;gap:14px}
.ag-main{padding:14px 24px;border:1px solid rgba(255,255,255,.16);border-radius:12px;background:rgba(255,255,255,.04);color:#eaf2f6;font:800 16px Pretendard,sans-serif;text-align:center}.ag-main span{display:block;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.ag-fan{display:flex;gap:16px;flex-wrap:wrap;justify-content:center}
.ag-sub{padding:16px 22px;border:1px solid rgba(52,211,153,.4);border-radius:12px;background:rgba(52,211,153,.07);color:#7ee8b0;font:800 15px Pretendard,sans-serif;text-align:center;animation:agWork 2.4s ease-in-out infinite}
.ag-sub span{display:block;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.ag-sub.a2{animation-delay:.3s}.ag-sub.a3{animation-delay:.6s}
@keyframes agWork{0%,100%{transform:translateY(0);box-shadow:0 0 0 0 rgba(52,211,153,0)}50%{transform:translateY(-5px);box-shadow:0 0 18px 1px rgba(52,211,153,.3)}}
.ag-merge{padding:11px 20px;border:1px solid rgba(251,191,36,.4);border-radius:10px;background:rgba(251,191,36,.08);color:#fbbf24;font:800 14px Pretendard,sans-serif}
.op-tree{display:flex;align-items:center;gap:24px;justify-content:center;flex-wrap:wrap}
.tr-main{padding:18px 26px;border:2px solid rgba(125,211,252,.4);border-radius:14px;background:rgba(125,211,252,.07);color:#7dd3fc;font:800 18px ui-monospace,monospace;text-align:center}.tr-main span{display:block;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.tr-branches{display:grid;gap:12px}
.tr-b{position:relative;padding:13px 20px 13px 28px;border:1px solid rgba(52,211,153,.35);border-radius:10px;background:rgba(52,211,153,.06);color:#d9f3e8;font:700 14px ui-monospace,monospace}
.tr-b::before{content:'';position:absolute;left:-24px;top:50%;width:24px;height:1px;background:rgba(255,255,255,.2)}
.op-cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}`;

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI 한방 이해하기 · 3주차 — 나만의 MCP·Skill·Workflow</title>
<link rel="stylesheet" href="../../assets/fonts/pretendard.css">
<style>
${chrome}
${extraCss}
</style>
</head>
<body>
<div class="app">
  <nav class="nav-bar">
    <span class="nav-title">AI 한방 이해하기 · 3주차 · 제작·병렬·자동화</span>
    <div class="nav-controls">
      <button class="nav-btn" id="btn-prev" onclick="move(-1)">←</button>
      <span id="counter">1 / ${total}</span>
      <button class="nav-btn" id="btn-next" onclick="move(1)">→</button>
    </div>
  </nav>
  <div class="deck">
${COVER}
${SLIDES.join('\n')}
  </div><!-- .deck -->
</div><!-- .app -->
<script>
const slides=[...document.querySelectorAll('.slide')];
let cur=0;
function render(){slides.forEach(function(s,i){s.classList.remove('active','prev');if(i===cur)s.classList.add('active');else if(i<cur)s.classList.add('prev');});var a=slides[cur];if(a)a.scrollTop=0;document.getElementById('counter').textContent=(cur+1)+' / '+slides.length;document.getElementById('btn-prev').disabled=cur===0;document.getElementById('btn-next').disabled=cur===slides.length-1;}
function move(d){cur=Math.max(0,Math.min(slides.length-1,cur+d));render();}
window.move=move;
document.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}});
render();
</script>
</body>
</html>
`;

fs.writeFileSync(OUT, html, 'utf-8');
console.log(`onepass-week3.html: ${SLIDES.length} custom slides + cover (total ${total})`);
