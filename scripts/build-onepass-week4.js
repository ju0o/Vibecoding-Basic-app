'use strict';

const fs = require('fs');
const path = require('path');
const { buildLectureDeck, flow, pair, sequence, slide, terminal } = require('./onepass-lecture-kit.js');
const { agentControl, browserProof, decisionControl, documentaryCss, officeControl, recoveryRoom } = require('./onepass-documentary-scenes.js');

const output = path.join(__dirname, '..', 'src', 'content', 'sessions', 'onepass-week4.html');
const surface = (title, body) => `<h3>${title}</h3>${body}`;
const evidence = (title, status, body, tone = '') => `<div class="op-evidence-top"><b>${title}</b><span class="op-evidence-status ${tone}">${status}</span></div><div class="op-evidence-body">${body}</div>`;

const slides = [
  slide('WEEK 04 · ORCHESTRATE', '오케스트레이션은 AI를 많이 붙이는 기술이 아니라<br><span class="g">일이 끝까지 흐르게 만드는 설계</span>입니다',
    officeControl(),
    '오늘은 여러 AI가 함께 일해도 산만해지지 않도록 <b>역할·승인·복구</b>를 설계합니다.'),

  slide('WHY ORCHESTRATE', '도구가 늘수록 필요한 것은 <span class="g">중앙의 통제 규칙</span>입니다',
    officeControl(),
    '오케스트레이션의 목표는 “더 빨리”보다 <b>중복·누락·폭주를 줄이는 것</b>입니다.'),

  slide('DETERMINISTIC', '<span class="g">결정적인 단계</span>와 <span class="a">AI 판단 단계</span>를 나눕니다',
    decisionControl(),
    '항상 같은 결과가 필요한 곳은 규칙으로 고정하고, <b>판단이 필요한 곳에만 AI의 추론</b>을 씁니다.'),

  slide('OFFICE MAP', '나만의 AI 사무실은 <span class="g">역할이 다른 작은 부서</span>로 시작합니다',
    officeControl(),
    '오너는 일을 전부 하지 않습니다. <b>목표와 승인권을 유지</b>하며 흐름을 조정합니다.'),

  slide('INTAKE', '좋은 AI 사무실은 <span class="g">좋은 접수 문장</span>에서 시작합니다',
    officeControl(),
    '“예쁘게 고쳐줘” 대신 <b>목표·범위·완료·금지</b>를 적어야 좋은 분배가 가능합니다.'),

  slide('MANUAL SCENE · DISPATCH', '수동 시연 1 — <span class="g">요청을 사무실에 접수</span>',
    sequence([
      { title: '오너 접수', detail: '목표와 완료 기준을 한 문장으로 고정합니다.', visual: evidence('CONTROL ROOM · INTAKE', 'OWNER', '<div class="op-evidence-code"><span class="key">goal</span>: 모바일 로그인 오류를 이해하기 쉽게<br><span class="key">done</span>: 375px · check · browser QA</div>') },
      { title: 'PM 분해', detail: '조사·구현·QA를 겹치지 않는 업무로 나눕니다.', visual: evidence('CONTROL ROOM · PLAN', 'SPLIT', '<div class="op-evidence-grid"><span class="live">조사<br>문구 근거</span><span class="live">구현<br>UI만 수정</span><span class="gate">QA<br>화면 확인</span></div>') },
      { title: '담당 배정', detail: '각 담당자에게 입력·출력·금지 범위를 전달합니다.', visual: evidence('CONTROL ROOM · HANDOFF', 'ASSIGNED', '<div class="op-evidence-row"><i class="ok"></i><code>input</code> 목표 · 파일 범위</div><div class="op-evidence-row"><i class="ok"></i><code>output</code> diff · 검증 기록</div><div class="op-evidence-row"><i class="warn"></i><code>blocked</code> 배포·권한 변경</div>') },
      { title: '리뷰 대기', detail: '모든 변경은 승인 전까지 공개하지 않습니다.', visual: evidence('CONTROL ROOM · RELEASE', 'HELD', '<div class="op-evidence-grid"><span class="live">변경<br>완료</span><span class="gate">리뷰<br>대기</span><span>공개<br>잠김</span></div>', 'warn') },
    ]),
    '분배 전에 작업을 잘게 나누는 것이 아니라, <b>누가 무엇을 책임지는지</b>를 먼저 정합니다.'),

  slide('HANDOFF FORMAT', '핸드오프에는 <span class="g">다음 사람이 판단할 수 있는 다섯 줄</span>이 필요합니다',
    agentControl(),
    '“완료했습니다”는 전달이 아닙니다. <b>변경·이유·검증·위험·다음 행동</b>이 필요합니다.'),

  slide('REVIEW GATE', '<span class="g">리뷰 게이트</span>는 빨간불을 만드는 절차가 아니라, 공개 전에 사고를 막는 장치입니다',
    browserProof(),
    '리뷰는 결과가 마음에 드는지 보는 것이 아니라 <b>완료 기준을 통과했는지</b> 확인하는 일입니다.'),

  slide('MANUAL SCENE · GATE', '수동 시연 2 — <span class="g">리뷰 게이트를 통과시키는 순서</span>',
    sequence([
      { title: 'Diff 검사', detail: '요청과 관계없는 파일이 바뀌지 않았는지 확인합니다.', visual: evidence('REVIEW GATE · DIFF', 'CHECKING', '<div class="op-evidence-row"><i class="ok"></i><code>LoginForm.tsx</code> 예상 변경</div><div class="op-evidence-row"><i class="ok"></i><code>login.css</code> 예상 변경</div><div class="op-evidence-row"><i></i><code>API / DB</code> 변경 없음</div>') },
      { title: '자동 검사', detail: 'check와 테스트가 현재 변경에서 통과하는지 봅니다.', visual: evidence('REVIEW GATE · TEST', 'PASS', '<div class="op-evidence-code"><span class="key">$</span> npm run check<br><span class="ok">passed · 0 errors</span><br><span class="key">$</span> test:login<br><span class="ok">passed · 4 assertions</span></div>') },
      { title: '사용자 화면', detail: '실제 브라우저에서 사용자가 보는 결과를 확인합니다.', visual: evidence('REVIEW GATE · BROWSER QA', 'VISIBLE', '<div class="op-evidence-grid"><span class="live">375px<br>글자 안 잘림</span><span class="live">버튼<br>클릭 가능</span><span class="live">오류<br>원인 명확</span></div>') },
      { title: '승인·기록', detail: '승인 이유와 검증 결과를 release 기록에 남깁니다.', visual: evidence('REVIEW GATE · RELEASE', 'APPROVED', '<div class="op-evidence-row"><i class="ok"></i><code>review</code> 통과</div><div class="op-evidence-row"><i class="ok"></i><code>owner</code> 승인</div><div class="op-evidence-row"><i class="ok"></i><code>release note</code> 기록</div>') },
    ]),
    '리뷰 게이트는 AI를 믿지 않는 절차가 아니라, <b>누구도 기억에만 의존하지 않게 하는 장치</b>입니다.'),

  slide('AUTHORITY', '권한과 승인은 <span class="a">역할마다 다르게</span> 줍니다',
    agentControl(),
    '전부에게 전체 권한을 주면 속도가 아니라 위험이 늘어납니다. <b>역할별 최소 권한</b>이 기본입니다.'),

  slide('OBSERVABILITY', 'AI 사무실은 <span class="g">무엇을 했는지 다시 볼 수 있어야</span> 운영됩니다',
    terminal('office run log', [['cmd', '09:12 intake accepted'], ['cmd', '09:13 PM → ui-agent assigned'], ['cmd', '09:18 ui-agent → review queue'], ['warn', '09:19 browser QA blocked'], ['ok', '09:24 recovery verified · approval requested']]),
    '로그는 감시용이 아니라 <b>막힌 위치·비용·복구 경로</b>를 찾기 위한 운영 기록입니다.'),

  slide('COST', '비용은 나중에 계산하지 말고 <span class="g">작업 흐름 안에서 제한</span>합니다',
    `<div class="op-map"><div><b>예산</b><span>작업당 최대 호출·시간</span></div><div><b>중단</b><span>반복 횟수·실패 횟수 제한</span></div><div><b>축소</b><span>작은 모델·작은 범위 우선</span></div><div><b>기록</b><span>무엇이 비용을 만들었나</span></div></div>`,
    '비용 가드는 AI를 덜 쓰자는 말이 아니라, <b>필요한 곳에 충분히 쓰기 위한 기준</b>입니다.'),

  slide('STOP CONDITION', '자동화에는 <span class="a">멈춰야 하는 조건</span>이 반드시 있어야 합니다',
    `<div class="op-incident"><header>STOP CONDITION</header><p>같은 오류가 두 번 반복됨<br>허용된 파일 범위를 벗어남<br>권한이 필요한 외부 행동이 발생함<br>테스트는 통과했지만 화면 QA가 실패함</p><footer>자동 실행을 멈추고, 현재 로그와 마지막 정상 상태를 오너에게 전달합니다.</footer></div>`,
    '계속 시도하는 AI는 성실한 것이 아닐 수 있습니다. <b>정지·보고·복구</b>가 더 안전한 행동입니다.'),

  slide('RECOVERY', '복구는 <span class="g">마지막 정상 상태에서 작은 범위로 다시 시작</span>합니다',
    recoveryRoom(),
    '전체를 다시 만들지 말고, <b>실패 단계와 마지막 정상 결과</b> 사이의 차이를 좁힙니다.'),

  slide('MANUAL SCENE · RECOVERY', '수동 시연 3 — <span class="g">브라우저 QA 실패를 복구</span>',
    sequence([
      { title: '실패 확인', detail: 'DOM에는 있지만 모바일 화면에서 결제 버튼이 잘렸습니다.', visual: evidence('BROWSER QA · 375px', 'FAIL', '<div class="op-evidence-grid"><span>장바구니</span><span>배송지</span><span class="bad">결제하기<br>화면 밖</span></div>', 'fail') },
      { title: '배포 중지', detail: '릴리즈를 열지 않고, QA 실패 상태를 기록합니다.', visual: evidence('RELEASE · GUARD', 'HELD', '<div class="op-evidence-row"><i class="fail"></i><code>browser QA</code> viewport clipped</div><div class="op-evidence-row"><i class="warn"></i><code>release</code> stop · not public</div>') },
      { title: '작은 수정', detail: '버튼 레이아웃과 대표 화면 폭만 수정 대상으로 좁힙니다.', visual: evidence('FIX · MINIMUM CHANGE', 'PATCH', '<div class="op-evidence-code"><span class="bad">- grid-template-columns: 1fr 1fr</span><br><span class="ok">+ grid-template-columns: 1fr</span><br><span class="key">scope</span>: CheckoutFooter.css only</div>') },
      { title: '같은 기준 재검증', detail: '동일한 화면 폭에서 클릭 가능 여부까지 다시 확인합니다.', visual: evidence('BROWSER QA · 375px', 'RECOVERED', '<div class="op-evidence-grid"><span>장바구니</span><span>배송지</span><span class="live">결제하기<br>클릭 가능</span></div>') },
    ]),
    '“테스트는 통과했어요”로 끝내지 않습니다. <b>사용자 화면 기준</b>을 통과해야 복구가 끝납니다.'),

  slide('REAL WORK', 'AI 사무실은 <span class="g">실제 업무 한 건</span>을 끝까지 통과시킬 때 완성됩니다',
    officeControl(),
    '사무실의 성능은 멋진 역할표가 아니라 <b>하나의 실제 요청을 안전하게 끝낸 기록</b>으로 평가합니다.'),

  slide('OFFICE TEMPLATE', '내 AI 사무실의 첫 구조는 <span class="g">작고 명확하게</span> 시작합니다',
    pair(surface('첫 주', '<p><span class="teal">오너</span> 목표·승인</p><p><span class="teal">제작</span> 한 가지 작업</p><p><span class="teal">리뷰</span> Diff·브라우저 확인</p>'), surface('나중에 확장', '<p><span class="amber">조사·문서·배포</span> 역할 추가</p><p>작업량과 검증 기록이 쌓일 때만 역할을 늘립니다.</p>')),
    '처음부터 큰 조직을 만들지 않습니다. <b>자주 반복되는 실제 흐름 하나</b>부터 운영합니다.'),

  slide('ANTI-PATTERN', '피해야 할 AI 사무실 — <span class="a">빠르게 보이지만 통제되지 않는 구조</span>',
    `<div class="op-incident"><header>ANTI-PATTERN</header><p>모든 권한을 한 AI에게 준다<br>여러 에이전트가 같은 파일을 동시에 고친다<br>리뷰 없이 자동 배포한다<br>로그·비용·정지조건이 없다</p><footer>대안: 작은 역할, 명확한 핸드오프, 승인 게이트, 복구 가능한 기록</footer></div>`,
    'AI 사무실은 사람을 지우는 시스템이 아닙니다. <b>사람의 판단을 더 강하게 만드는 운영 구조</b>입니다.'),

  slide('MIDPOINT', '90분 지점 — <span class="g">AI를 관리하는 것이 아니라 흐름을 관리합니다</span>',
    `<div class="op-break"><strong>목표는 사람이 정하고,<br>반복은 시스템이 맡고,<br>승인은 사람이 쥔다.</strong><span>이 원칙을 기준으로 도구·권한·비용·복구를 정렬합니다.</span></div>`,
    '이후의 모든 심화 과정은 이 운영 원리 위에서 도구별 구현을 깊게 다룹니다.'),

  slide('OPERATING CADENCE', 'AI 사무실은 한 번 만들고 끝나지 않습니다. <span class="g">짧은 운영 리듬</span>이 필요합니다',
    officeControl(),
    'AI 사무실은 대단한 자동화보다 <b>작은 운영 규칙을 꾸준히 지키는 것</b>에서 안정됩니다.'),

  slide('RELEASE CONTRACT', '공개는 마지막 버튼이 아니라 <span class="g">검증 기록을 가진 승인 행위</span>입니다',
    recoveryRoom(),
    '문제가 생겨도 복구할 수 있도록, 공개 전에는 <b>변경·검증·승인의 흔적</b>을 남깁니다.'),

  slide('FOUR WEEK', '4주를 지나며 얻는 것은 <span class="g">도구 목록</span>이 아니라 <span class="a">작업 시스템</span>입니다',
    flow([{ title: 'W1', detail: '프로젝트 흐름 이해' }, { title: 'W2', detail: '도구 표면 통제', tone: 'a' }, { title: 'W3', detail: '능력·절차 확장', tone: 'a' }, { title: 'W4', detail: '운영 시스템 설계', tone: 'g' }]),
    '다음 프로젝트에서도 반복할 수 있도록, <b>판단·기록·검증</b>을 남기고 제품 세부는 수업 전 공식 문서 기준으로 확인합니다.'),

  slide('CLOSE', '마지막 한 문장 — <span class="g">AI 사무실의 책임자는 나</span>입니다',
    `<div class="op-note"><b>AI는 제안하고, 실행하고, 기록할 수 있습니다.</b><br>하지만 무엇을 만들지, 어떤 위험을 감수할지, 언제 공개할지는 여전히 오너가 판단합니다.</div>`,
    '이제 기초 과정 이후의 전문 과정에서는 Claude Code·Codex·Workflow를 각각 더 깊게 구현합니다.'),
];

const html = buildLectureDeck({
  week: 4,
  navTitle: 'Orchestration · AI Office',
  coverTitle: '오케스트레이션과<br><span class="g">나만의 AI 사무실</span>',
  coverSubtitle: 'Skill·MCP·SubAgent·Workflow를 하나의 운영 흐름으로 묶고, 사람의 목표·승인·복구 권한을 중심에 둔 AI 작업실을 설계합니다.',
  coverFlow: ['Intake', 'Dispatch', 'Review Gate', 'Recovery', 'Logs', 'Release'],
  slides,
  extraCss: documentaryCss,
});

fs.writeFileSync(output, html, 'utf-8');
console.log(`onepass-week4.html: ${slides.length} lecture slides + cover`);
