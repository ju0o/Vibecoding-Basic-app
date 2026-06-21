'use strict';

// onepass Week 4 — "오케스트레이션 + 나만의 AI 사무실". All-custom op-enhanced tutorial
// slides reusing the shared shell (chrome + op-* CSS) from the week-1 builder. Capstone week.

const fs = require('fs');
const path = require('path');
const { chrome } = require('./build-onepass-week1.js');

const OUT = path.join(__dirname, '..', 'src', 'content', 'sessions', 'onepass-week4.html');

const flow = (steps) => `<div class="op-flow">${steps.map((s, i) => `${i ? '<span class="op-arrow">→</span>' : ''}<div class="op-node ${s.tone || ''}"><b>${s.t}</b>${s.d ? `<span>${s.d}</span>` : ''}</div>`).join('')}</div>`;
const slide = (eyebrow, title, visual, cap) => `<div class="slide op-slide"><div class="op-eyebrow">${eyebrow}</div><h2 class="op-title">${title}</h2><div class="op-visual">${visual}</div><p class="op-cap">${cap}</p></div>`;

const COVER = `<div class="slide op-cover active">
  <div class="op-eyebrow">AI 한방 이해하기 · 4주차 (4주 집중)</div>
  <h1 class="op-cover-title">오케스트레이션<br>+ 나만의 <span class="g">AI 사무실</span></h1>
  <p class="op-cover-sub">만든 조각들(Skill·MCP·SubAgent·Workflow)을 <b>하나의 흐름</b>으로 묶고, 역할을 나눈 <b>나만의 AI 사무실</b>로 일을 굴립니다.</p>
  <div class="op-cover-flow"><span>결정적 + 에이전틱</span><span>핸드오프</span><span>정지조건</span><span>AI 사무실</span></div>
</div>`;

const SLIDES = [
  slide('CONCEPT · ORCHESTRATION', '오케스트레이션 — 여러 도구를 <span class="g">하나의 흐름</span>으로',
    `<div class="op-cols">
      <div class="op-card"><div class="op-card-h">지휘자 없이</div><small>좋은 연주자(도구)가 많아도 따로 놀면 곡이 안 됩니다.</small></div>
      <div class="op-card"><div class="op-card-h g">지휘자(오케스트레이션)</div><small>각 도구·에이전트가 <b>언제·무엇을</b> 할지 하나의 악보로 묶입니다.</small></div>
    </div>`,
    '도구를 많이 모으는 게 아니라, <b>언제 무엇을 거치는지 흐름</b>을 설계하는 일입니다.'),

  slide('PRINCIPLE', '<span class="g">결정적 뼈대</span> + <span class="a">막히는 곳만 에이전틱</span>',
    flow([{ t: '계획', d: '결정적' }, { t: '빌드', d: '결정적' }, { t: '판단 지점', d: '에이전틱', tone: 'a' }, { t: '검증', d: '결정적', tone: 'g' }]),
    '대부분은 <b>정해진 단계(결정적)</b>로 싸고 안정적으로, 예측이 어려운 곳에만 AI 판단을 더합니다.'),

  slide('HANDOFF', '핸드오프 — <span class="g">산출물 형식</span>을 고정해 넘긴다',
    flow([{ t: '도구 A', d: '결과 생성' }, { t: '형식 고정', d: 'JSON·문서', tone: 'a' }, { t: '도구 B', d: '그대로 인수', tone: 'g' }]),
    '말로 전달하면 빠지고 겹칩니다 — <b>정해진 형식</b>으로 넘겨야 중복·누락이 없습니다.'),

  slide('SAFETY · STOP', '정지조건·복구 — <span class="a">무한 루프</span>를 막는다',
    `<div class="op-gate">
      <div class="op-gate-req">끝없이 도는 작업</div>
      <div class="op-gate-door"><span>한도 도달</span></div>
      <div class="op-gate-res a">반복·시간·토큰 한도 → 멈추고 복구</div>
    </div>`,
    '자동화일수록 <b>멈추는 조건과 되돌릴 경로</b>를 먼저 정해야 안전합니다.'),

  slide('YOUR AI OFFICE', '나만의 <span class="g">AI 사무실</span> — 역할을 나눈 팀',
    `<div class="op-office">
      <div class="of-boss">나 (오너)<span>목표 · 승인</span></div>
      <div class="of-conn"></div>
      <div class="of-team">
        <div class="of-role r1">PM 에이전트<span>계획·분배</span></div>
        <div class="of-role r2">개발 에이전트<span>구현</span></div>
        <div class="of-role r3">리뷰 에이전트<span>검증</span></div>
        <div class="of-role r4">배포 에이전트<span>릴리즈</span></div>
      </div>
    </div>`,
    '한 AI에게 다 시키지 않고, <b>역할별 에이전트</b>가 분담합니다 — 내가 목표·승인을 쥡니다.'),

  slide('HOW · AI OFFICE', 'AI 사무실 작동 — 작업이 <span class="g">부서를 거쳐</span> 완성',
    `<div class="op-pipe">
      <div class="pipe-step p1">PM<span>작업 분해</span></div>
      <div class="pipe-step p2">개발<span>병렬 구현</span></div>
      <div class="pipe-step p3">리뷰<span>검증 게이트</span></div>
      <div class="pipe-step p4 live">배포<span>릴리즈</span></div>
      <div class="pipe-beam"></div>
    </div>`,
    '하나의 작업이 <b>계획 → 구현 → 검증 → 배포</b> 부서를 순서대로 거쳐 완성됩니다.'),

  slide('RELIABILITY', '느낌이 아니라 <span class="g">측정</span>으로 운영',
    `<div class="op-cols3">
      <div class="op-card"><div class="op-card-h g">평가</div><small>결과를 정한 기준으로 채점</small></div>
      <div class="op-card"><div class="op-card-h g">관측</div><small>단계·시간·토큰을 추적</small></div>
      <div class="op-card"><div class="op-card-h a">비용</div><small>예산 가드로 폭주 방지</small></div>
    </div>`,
    'AI 사무실이 커질수록 <b>채점·추적·비용 가드</b>로 품질과 비용을 눈으로 확인합니다.'),

  slide('CAPSTONE', '4주 통합 — <span class="g">하나의 제품</span>으로',
    flow([{ t: 'W1 원리', d: '사고법' }, { t: 'W2 CLI·MCP·Skill', d: '도구', tone: 'a' }, { t: 'W3 제작·병렬', d: '자산', tone: 'a' }, { t: 'W4 사무실', d: '운영', tone: 'g' }]),
    '4주가 따로가 아니라, <b>원리 → 도구 → 제작 → 운영</b>이 하나의 제품으로 이어집니다.'),

  slide('수료 · NEXT', '이제 <span class="g">나만의 AI 사무실</span>을 운영하세요',
    `<div class="op-cols">
      <div class="op-card"><div class="op-card-h">수료 후 첫 적용</div><small>본인 실제 작업 1건을 — 목표는 내가, 실행은 AI 사무실이.</small></div>
      <div class="op-card"><div class="op-card-h a">계속 키우기</div><small>자주 하는 일을 Skill·Workflow로 늘리고, 역할 에이전트를 추가합니다.</small></div>
    </div>`,
    '강의는 끝나도 <b>AI 사무실은 매일 조금씩 커집니다</b> — 오늘 한 가지부터 적용하세요.'),
];

const total = SLIDES.length + 1;

const extraCss = `
.op-cover{justify-content:center;gap:18px;padding:0 clamp(40px,7vw,120px)!important}
.op-cover .op-eyebrow{color:#34d399}
.op-cover-title{margin:0;font-size:clamp(40px,5.4vw,82px);font-weight:800;line-height:1.05;letter-spacing:-.02em;background:linear-gradient(180deg,#fff 40%,#9fb0bd);-webkit-background-clip:text;background-clip:text;color:transparent}
.op-cover-title .g{-webkit-text-fill-color:#34d399}.op-cover-title .a{-webkit-text-fill-color:#fbbf24}
.op-cover-sub{max-width:42em;color:#aebcc4;font-size:clamp(15px,1.5vw,21px);line-height:1.6;word-break:keep-all}.op-cover-sub b{color:#eaf2f6}
.op-cover-flow{display:flex;flex-wrap:wrap;gap:9px;margin-top:8px}
.op-cover-flow span{padding:8px 14px;border:1px solid rgba(255,255,255,.12);border-radius:8px;color:#aebcc4;font:750 12px ui-monospace,monospace}
.op-cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.op-cols3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.op-gate{display:flex;align-items:center;gap:16px;justify-content:center;flex-wrap:wrap}
.op-gate-req{padding:14px 18px;border:1px solid rgba(251,113,133,.4);border-radius:11px;background:rgba(251,113,133,.08);color:#fda4af;font:700 14px Pretendard,sans-serif}
.op-gate-door{padding:14px 18px;border:1px dashed rgba(251,191,36,.5);border-radius:11px;color:#fbbf24;font:800 13px ui-monospace,monospace;animation:gateGlow 2.4s ease-in-out infinite}
@keyframes gateGlow{0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,0)}50%{box-shadow:0 0 20px 2px rgba(251,191,36,.35)}}
.op-gate-res{padding:14px 18px;border:1px solid rgba(52,211,153,.45);border-radius:11px;background:rgba(52,211,153,.08);color:#7ee8b0;font:700 14px Pretendard,sans-serif}
.op-office{display:flex;flex-direction:column;align-items:center;gap:0}
.of-boss{padding:14px 30px;border:2px solid rgba(52,211,153,.45);border-radius:14px;background:rgba(52,211,153,.08);color:#34d399;font:800 18px Pretendard,sans-serif;text-align:center;box-shadow:0 0 36px -10px rgba(52,211,153,.4)}
.of-boss span{display:block;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.of-conn{width:2px;height:22px;background:rgba(255,255,255,.2)}
.of-team{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;position:relative}
.of-team::before{content:'';position:absolute;top:-12px;left:12%;right:12%;height:2px;background:rgba(255,255,255,.18)}
.of-role{padding:18px 16px;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:rgba(255,255,255,.04);color:#eaf2f6;font:800 15px Pretendard,sans-serif;text-align:center;animation:roleIn 3.6s ease-in-out infinite}
.of-role span{display:block;margin-top:4px;color:#9fb0bd;font:700 11px ui-monospace,monospace}
.of-role.r2{animation-delay:.4s}.of-role.r3{animation-delay:.8s}.of-role.r4{animation-delay:1.2s}
@keyframes roleIn{0%,8%{opacity:.5;transform:translateY(6px)}24%,100%{opacity:1;transform:none}}`;

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI 한방 이해하기 · 4주차 — 오케스트레이션·AI 사무실</title>
<link rel="stylesheet" href="../../assets/fonts/pretendard.css">
<style>
${chrome}
${extraCss}
</style>
</head>
<body>
<div class="app">
  <nav class="nav-bar">
    <span class="nav-title">AI 한방 이해하기 · 4주차 · 오케스트레이션·AI 사무실</span>
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
console.log(`onepass-week4.html: ${SLIDES.length} custom slides + cover (total ${total})`);
