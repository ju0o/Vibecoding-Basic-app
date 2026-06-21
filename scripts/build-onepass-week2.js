'use strict';

// onepass Week 2 — "CLI로 바이브코딩 + MCP·Skill 이해". All-custom op-enhanced tutorial
// slides (realistic mockups + activity animations), reusing the shared shell (chrome +
// op-* CSS) from the week-1 builder. No basic-session reuse (these topics aren't there).

const fs = require('fs');
const path = require('path');
const { chrome } = require('./build-onepass-week1.js');

const OUT = path.join(__dirname, '..', 'src', 'content', 'sessions', 'onepass-week2.html');

const flow = (steps) => `<div class="op-flow">${steps.map((s, i) => `${i ? '<span class="op-arrow">→</span>' : ''}<div class="op-node ${s.tone || ''}"><b>${s.t}</b>${s.d ? `<span>${s.d}</span>` : ''}</div>`).join('')}</div>`;
const slide = (eyebrow, title, visual, cap) => `<div class="slide op-slide"><div class="op-eyebrow">${eyebrow}</div><h2 class="op-title">${title}</h2><div class="op-visual">${visual}</div><p class="op-cap">${cap}</p></div>`;
const term = (label, lines) => `<div class="op-term"><div class="op-tbar"><i></i><i></i><i></i><small>${label}</small></div><div class="op-tbody">${lines.map(([t, x]) => `<span class="tl ${t}">${x}</span>`).join('')}<span class="tl-cursor"></span></div></div>`;
const mcpStage = (left, leftSub, req, res, right, rightSub) => `<div class="op-api-stage"><div class="op-cloud xl"><b>${left}</b><span>${leftSub}</span></div><div class="op-wire"><div class="op-wlabel req">${req}</div><div class="op-wtrack"><span class="op-packet"></span></div><div class="op-wlabel res">${res}</div></div><div class="op-cloud xl"><b>${right}</b><span>${rightSub}</span></div></div>`;

const COVER = `<div class="slide op-cover active">
  <div class="op-eyebrow">AI 한방 이해하기 · 2주차 (4주 집중)</div>
  <h1 class="op-cover-title">CLI로 바이브코딩<br>+ <span class="g">MCP</span>·<span class="a">Skill</span> 이해</h1>
  <p class="op-cover-sub">터미널에서 일하는 법 → AI에 외부 능력을 끼우는 <b>MCP</b> → 반복을 자산으로 만드는 <b>Skill</b>까지, 오늘 한 흐름으로 이해합니다.</p>
  <div class="op-cover-flow"><span>CLI 작업 흐름</span><span>MCP = 외부 능력</span><span>Skill = 반복 자산</span></div>
</div>`;

const SLIDES = [
  slide('WHY CLI', '왜 <span class="g">CLI(터미널)</span>에서 작업하나',
    `<div class="op-cols">
      <div class="op-card"><div class="op-card-h">채팅창</div><small>편하지만 — 대화가 흩어지고, 파일·기록·자동화와 분리됩니다.</small></div>
      <div class="op-card"><div class="op-card-h g">CLI</div><small><b>작업 폴더 안</b>에서 실행 → 변경·기록이 그대로 남고, 반복을 <b>자동화·재현</b>할 수 있습니다.</small></div>
    </div>`,
    'CLI는 "AI를 내 프로젝트 폴더 안으로 데려오는" 방식입니다 — 결과가 파일·기록으로 남습니다.'),

  slide('CLI FLOW', 'CLI 기본 흐름 — <span class="g">요청 → 실행 → 확인</span>',
    `${term('terminal — claude', [['p', '$ claude'], ['d', '> 로그인 폼에 비밀번호 표시 토글 추가해줘'], ['o', '✓ edited  src/Login.tsx  (+12 −2)'], ['d', '> 변경 확인'], ['o', '✓ diff ready · 직접 실행해 확인']])}
     ${flow([{ t: '요청', d: '한 문장' }, { t: '실행', d: '파일 변경', tone: 'a' }, { t: '확인', d: 'diff·실행', tone: 'g' }])}`,
    '자동으로 끝나지 않습니다 — <b>요청하고, 변경을 직접 확인</b>하는 흐름을 반복합니다.'),

  slide('CONCEPT · MCP', 'MCP — AI에 <span class="g">외부 능력을 끼우는 콘센트</span>',
    `<div class="op-plugs">
      <div class="op-ai-box">AI<br><span>Claude · Codex</span></div>
      <div class="op-plug-list">
        <div class="op-plug">파일 시스템</div>
        <div class="op-plug">데이터베이스</div>
        <div class="op-plug">브라우저</div>
        <div class="op-plug">외부 API</div>
      </div>
    </div>`,
    'AI 자체는 대화만 합니다. <b>MCP를 꽂으면</b> 파일·DB·브라우저 같은 실제 능력을 쓸 수 있습니다.'),

  slide('HOW · MCP', 'MCP 작동 — 요청이 <span class="g">외부 서버</span>를 거쳐 돌아온다',
    mcpStage('AI', 'Claude/Codex', '파일 읽어줘 / DB 조회해줘', '결과를 받아 사용', 'MCP 서버', '파일·DB·브라우저'),
    'AI가 직접 하는 게 아니라, <b>MCP 서버에 요청해 결과를 받아</b> 작업에 씁니다.'),

  slide('EXAMPLES · MCP', 'MCP로 연결하는 <span class="g">실제 능력</span>들',
    `<div class="op-cols3">
      <div class="op-card"><div class="op-card-h g">파일 시스템</div><small>프로젝트 파일을 읽고 고침</small></div>
      <div class="op-card"><div class="op-card-h g">데이터베이스</div><small>실제 데이터를 조회·정리</small></div>
      <div class="op-card"><div class="op-card-h g">브라우저·API</div><small>화면 확인·외부 서비스 호출</small></div>
    </div>`,
    '필요한 능력만 골라 꽂습니다 — 모두 연결할 필요는 없습니다.'),

  slide('SAFETY · MCP', 'MCP 권한 — <span class="a">최소 권한 + 승인</span>으로 안전하게',
    `<div class="op-gate">
      <div class="op-gate-req">"파일 전체 삭제" 요청</div>
      <div class="op-gate-door"><span>승인 필요</span></div>
      <div class="op-gate-res a">읽기만 허용 · 쓰기는 승인 후</div>
    </div>`,
    '많이 연결할수록 위험도 커집니다 — <b>필요한 만큼만, 민감한 작업은 승인</b>을 거칩니다.'),

  slide('CONCEPT · SKILL', 'Skill — 반복 작업을 <span class="g">레시피로 저장</span>',
    `<div class="op-recipe">
      <div class="rc-h">📋 SKILL · "PR 요약"</div>
      <div class="rc-body"><span class="rc-trig">트리거: "PR 요약해줘"</span><span>1. 변경된 파일 수집</span><span>2. diff를 사람이 읽게 요약</span><span>3. 리뷰 체크리스트 작성</span></div>
      <div class="rc-foot">한 번 정리 → <b>언제든 같은 품질로 재사용</b></div>
    </div>`,
    '매번 똑같이 설명하던 작업을 <b>트리거·절차·예시가 든 자산</b>으로 만들어 둡니다.'),

  slide('HOW · SKILL', 'Skill 작동 — <span class="g">트리거 → 절차 → 재사용</span>',
    flow([{ t: '트리거', d: '언제 쓰나' }, { t: '절차', d: '정해진 단계', tone: 'a' }, { t: '검증', d: '통과 기준', tone: 'a' }, { t: '재사용', d: '같은 결과', tone: 'g' }]),
    '즉흥 지시 대신 <b>정해진 절차</b>를 부르므로, 누가·언제 해도 결과가 같습니다.'),

  slide('MCP vs SKILL', '<span class="g">MCP</span>는 능력 연결, <span class="a">Skill</span>은 절차 저장',
    `<div class="op-cols">
      <div class="op-card"><div class="op-card-h g">MCP</div><small><b>무엇을 할 수 있나</b> — 파일·DB·브라우저 같은 외부 <b>능력</b>을 AI에 연결</small></div>
      <div class="op-card"><div class="op-card-h a">Skill</div><small><b>어떻게 하나</b> — 반복 작업의 <b>절차</b>를 저장해 재사용</small></div>
    </div>`,
    '둘은 보완 관계입니다 — <b>MCP로 능력을 늘리고, Skill로 절차를 고정</b >합니다.'),

  slide('PRACTICE · NEXT', '오늘 실습과 <span class="g">다음 주</span>',
    `<div class="op-cols">
      <div class="op-card"><div class="op-card-h">오늘 실습</div><small>① CLI로 작은 변경 1건 · ② 필요한 MCP 1개 연결 · ③ 반복 작업 1개를 Skill 후보로 메모</small></div>
      <div class="op-card"><div class="op-card-h a">다음 주 (W3)</div><small><b>나만의 MCP·Skill 제작</b> + SubAgent·Workflow — 직접 만들어 봅니다</small></div>
    </div>`,
    '이해했으면 다음 주에는 <b>직접 만듭니다</b> — 나만의 MCP·Skill·자동화로.'),
];

const total = SLIDES.length + 1;

const extraCss = `
.op-cover{justify-content:center;gap:18px;padding:0 clamp(40px,7vw,120px)!important}
.op-cover .op-eyebrow{color:#34d399}
.op-cover-title{margin:0;font-size:clamp(40px,5.4vw,82px);font-weight:800;line-height:1.05;letter-spacing:-.02em;background:linear-gradient(180deg,#fff 40%,#9fb0bd);-webkit-background-clip:text;background-clip:text;color:transparent}
.op-cover-title .g{-webkit-text-fill-color:#34d399}.op-cover-title .a{-webkit-text-fill-color:#fbbf24}
.op-cover-sub{max-width:40em;color:#aebcc4;font-size:clamp(15px,1.5vw,21px);line-height:1.6;word-break:keep-all}.op-cover-sub b{color:#eaf2f6}
.op-cover-flow{display:flex;flex-wrap:wrap;gap:9px;margin-top:8px}
.op-cover-flow span{padding:8px 14px;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#aebcc4;font:750 12px ui-monospace,monospace}
.op-cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.op-term{max-width:600px;border:1px solid rgba(255,255,255,.16);border-radius:12px;overflow:hidden;background:#0a0f17;box-shadow:0 26px 54px -24px rgba(0,0,0,.7)}
.op-tbar{display:flex;align-items:center;gap:6px;padding:9px 12px;background:#161f2c;border-bottom:1px solid rgba(255,255,255,.08)}
.op-tbar i{width:9px;height:9px;border-radius:50%;background:#46505c}.op-tbar i:nth-child(1){background:#ed6a5e}.op-tbar i:nth-child(2){background:#f4bf4f}.op-tbar i:nth-child(3){background:#61c554}
.op-tbar small{margin-left:6px;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.op-tbody{padding:16px 18px;display:grid;gap:8px;font:600 13.5px/1.4 ui-monospace,SFMono-Regular,monospace}
.op-tbody .tl{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tl.p{color:#34d399}.tl.d{color:#c4d2dc}.tl.o{color:#7ce4a6}
.tl-cursor{width:9px;height:16px;background:#34d399;animation:tcur 1s steps(1) infinite}
@keyframes tcur{50%{opacity:0}}
.op-plugs{display:flex;align-items:center;gap:clamp(20px,4vw,60px);justify-content:center;flex-wrap:wrap}
.op-ai-box{padding:26px 34px;border:2px solid rgba(52,211,153,.45);border-radius:18px;background:rgba(52,211,153,.07);color:#34d399;font:800 22px Pretendard,sans-serif;text-align:center;box-shadow:0 0 40px -8px rgba(52,211,153,.35)}
.op-ai-box span{display:block;margin-top:4px;color:#9fb0bd;font:700 12px ui-monospace,monospace}
.op-plug-list{display:grid;gap:10px}
.op-plug{position:relative;padding:12px 16px 12px 40px;border:1px solid rgba(255,255,255,.14);border-radius:10px;background:rgba(255,255,255,.03);color:#eaf2f6;font:700 14px Pretendard,sans-serif;min-width:200px;animation:plugIn 3.2s ease-in-out infinite}
.op-plug:nth-child(2){animation-delay:.3s}.op-plug:nth-child(3){animation-delay:.6s}.op-plug:nth-child(4){animation-delay:.9s}
.op-plug::before{content:'🔌';position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:16px}
@keyframes plugIn{0%,10%{opacity:.4;transform:translateX(-10px)}28%,100%{opacity:1;transform:none}}
.op-cloud.xl{width:170px;padding:24px 16px}.op-cloud.xl b{font-size:18px}
.op-gate{display:flex;align-items:center;gap:16px;justify-content:center;flex-wrap:wrap}
.op-gate-req{padding:14px 18px;border:1px solid rgba(251,113,133,.4);border-radius:11px;background:rgba(251,113,133,.08);color:#fda4af;font:700 14px Pretendard,sans-serif}
.op-gate-door{padding:14px 18px;border:1px dashed rgba(251,191,36,.5);border-radius:11px;color:#fbbf24;font:800 13px ui-monospace,monospace;animation:gateGlow 2.4s ease-in-out infinite}
@keyframes gateGlow{0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,0)}50%{box-shadow:0 0 20px 2px rgba(251,191,36,.35)}}
.op-gate-res{padding:14px 18px;border:1px solid rgba(52,211,153,.45);border-radius:11px;background:rgba(52,211,153,.08);color:#7ee8b0;font:700 14px Pretendard,sans-serif}
.op-recipe{max-width:520px;border:1px solid rgba(52,211,153,.3);border-radius:14px;overflow:hidden;background:rgba(255,255,255,.02)}
.rc-h{padding:13px 18px;background:rgba(52,211,153,.1);color:#7ee8b0;font:800 15px Pretendard,sans-serif;border-bottom:1px solid rgba(52,211,153,.2)}
.rc-body{padding:16px 18px;display:grid;gap:9px;color:#d9e3e6;font:600 14px/1.4 ui-monospace,monospace}
.rc-trig{color:#fbbf24}
.rc-foot{padding:12px 18px;border-top:1px solid rgba(255,255,255,.08);color:#aebcc4;font-size:13px}.rc-foot b{color:#eaf2f6}`;

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI 한방 이해하기 · 2주차 — CLI·MCP·Skill</title>
<link rel="stylesheet" href="../../assets/fonts/pretendard.css">
<style>
${chrome}
${extraCss}
</style>
</head>
<body>
<div class="app">
  <nav class="nav-bar">
    <span class="nav-title">AI 한방 이해하기 · 2주차 · CLI·MCP·Skill</span>
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
console.log(`onepass-week2.html: ${SLIDES.length} custom slides + cover (total ${total})`);
