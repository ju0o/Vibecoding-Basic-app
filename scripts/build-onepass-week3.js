'use strict';

const fs = require('fs');
const path = require('path');
const { buildLectureDeck, flow, pair, sequence, slide, terminal } = require('./onepass-lecture-kit.js');
const { agentControl, capabilityMap, documentaryCss, mcpNetwork, officeControl, recoveryRoom, skillStudio } = require('./onepass-documentary-scenes.js');

const output = path.join(__dirname, '..', 'src', 'content', 'sessions', 'onepass-week3.html');
const surface = (title, body) => `<h3>${title}</h3>${body}`;
const evidence = (title, status, body, tone = '') => `<div class="op-evidence-top"><b>${title}</b><span class="op-evidence-status ${tone}">${status}</span></div><div class="op-evidence-body">${body}</div>`;

const slides = [
  slide('WEEK 03 · EXTEND', 'AI의 능력을 늘리는 법은<br><span class="g">더 많이 시키는 것</span>이 아닙니다',
    officeControl(),
    '이번 주는 네 개념을 섞지 않고, <b>각각의 역할과 연결 순서</b>를 분명히 합니다.'),

  slide('BOUNDARY MAP', '<span class="g">능력 · 절차 · 역할 · 흐름</span>은 서로 다른 설계 대상입니다',
    capabilityMap(),
    '한 단어로 뭉뚱그리면 설계가 꼬입니다. <b>무엇을 확장하는지</b>부터 구분합니다.'),

  slide('MCP', 'MCP는 AI가 <span class="g">밖의 도구와 약속된 방식으로 연결</span>되는 통로입니다',
    mcpNetwork(),
    'AI가 DB나 브라우저를 직접 “소유”하는 것이 아니라, <b>연결된 도구에 요청하고 결과를 받는 구조</b>입니다.'),

  slide('MCP PERMISSION', 'MCP를 연결할 때 첫 질문은 <span class="a">“무엇을 할 수 있나?”</span>가 아니라 <span class="g">“어디까지 허용할까?”</span>입니다',
    mcpNetwork(),
    '연결의 품질은 개수가 아니라, <b>권한 경계와 승인 규칙</b>에서 결정됩니다.'),

  slide('MANUAL SCENE · MCP', '수동 시연 1 — <span class="g">MCP 연결의 안전한 순서</span>',
    sequence([
      { title: '도구 목적', detail: '프로젝트 문서만 검색해야 한다는 목표를 정합니다.', visual: evidence('MCP · CONNECTION PLAN', 'PURPOSE', '<div class="op-evidence-grid"><span class="live">AI Host<br>질문 정리</span><span class="live">Docs Search<br>문서만</span><span>외부 쓰기<br>사용 안 함</span></div>') },
      { title: '권한 범위', detail: '읽기 전용·docs 폴더로 범위를 좁힙니다.', visual: evidence('MCP · PERMISSION', 'MINIMUM', '<div class="op-evidence-code"><span class="key">path</span>: <span class="ok">/project/docs</span><br><span class="key">mode</span>: <span class="ok">read-only</span><br><span class="key">network</span>: <span class="amber">off</span></div>') },
      { title: '작은 요청', detail: '문서 제목만 목록으로 가져오는 요청을 해봅니다.', visual: evidence('MCP · FIRST CALL', 'READ ONLY', '<div class="op-evidence-row"><i class="ok"></i><code>request</code> docs 제목만 검색</div><div class="op-evidence-row"><i class="ok"></i><code>response</code> setup.md · rules.md</div><div class="op-evidence-row"><i></i><code>write / delete</code> 호출 없음</div>') },
      { title: '기록·승인', detail: '연결 목적과 권한을 팀 기록에 남깁니다.', visual: evidence('MCP · AUDIT RECORD', 'APPROVED', '<div class="op-evidence-row"><i class="ok"></i><code>purpose</code> 문서 검색</div><div class="op-evidence-row"><i class="ok"></i><code>scope</code> docs · read-only</div><div class="op-evidence-row"><i class="warn"></i><code>write access</code> 별도 승인</div>') },
    ]),
    '처음부터 강한 명령을 실행하지 말고 <b>작은 읽기 요청으로 연결을 검증</b>합니다.'),

  slide('PLUGIN LANGUAGE', '<span class="g">플러그인</span>이라는 말은 제품마다 구현이 다릅니다',
    pair(surface('공통으로 이해할 것', '<p><span class="teal">연결</span> : 외부 능력을 붙인다</p><p><span class="teal">절차</span> : 반복 작업을 저장한다</p><p><span class="teal">배포</span> : 다른 사람도 재사용한다</p>'), surface('수업 전 확인할 것', '<p><span class="amber">제품별 형식</span> : 설치 경로·설정 파일·메뉴</p><p><span class="amber">안정성</span> : 정식·베타·실험 기능</p><p><span class="amber">권한</span> : 어떤 데이터에 접근하는가</p>')),
    '이름이 같아도 포맷은 다를 수 있습니다. 제품별 형식은 <b>수업 전 공식 문서 기준</b>으로 확인합니다.'),

  slide('SKILL ANATOMY', 'Skill은 잘 쓴 프롬프트가 아니라 <span class="g">반복 작업의 운영 문서</span>입니다',
    skillStudio(),
    '좋은 Skill에는 <b>언제 쓰는지, 어떤 순서인지, 무엇을 통과해야 하는지</b>가 들어 있습니다.'),

  slide('SKILL DISCOVERY', 'Skill은 <span class="g">반복되는 불편</span>에서 시작합니다',
    skillStudio(),
    '거창한 자동화보다 “매번 빠지는 한 단계”를 잡는 것이 좋은 첫 Skill입니다.'),

  slide('MANUAL SCENE · SKILL', '수동 시연 2 — <span class="g">PR 요약 Skill을 설계</span>',
    sequence([
      { title: '트리거', detail: '“PR 요약해줘”라는 요청을 Skill의 시작 신호로 정합니다.', visual: evidence('SKILL.md · TRIGGER', 'DEFINED', '<div class="op-evidence-code"><span class="key">when</span>: PR 요약 요청<br><span class="amber">not for</span>: 회의록 · 일반 글 요약</div>') },
      { title: '입력', detail: 'PR 링크, 변경 파일, 테스트 결과를 받도록 정합니다.', visual: evidence('SKILL.md · INPUT', 'REQUIRED', '<div class="op-evidence-row"><i class="ok"></i><code>pull request URL</code></div><div class="op-evidence-row"><i class="ok"></i><code>changed files</code></div><div class="op-evidence-row"><i class="ok"></i><code>test result</code></div>') },
      { title: '절차', detail: '변경 의도·영향·위험을 순서대로 요약합니다.', visual: evidence('SKILL.md · PROCEDURE', 'RUNNING', '<div class="op-evidence-grid"><span class="live">의도<br>무엇을 바꿈</span><span class="live">영향<br>어디가 달라짐</span><span class="gate">위험<br>무엇을 볼까</span></div>') },
      { title: '검증', detail: '사람이 승인할 정보가 빠지지 않았는지 검사합니다.', visual: evidence('SKILL.md · CHECK', 'PASS', '<div class="op-evidence-row"><i class="ok"></i><code>목적</code> 포함</div><div class="op-evidence-row"><i class="ok"></i><code>영향 범위</code> 포함</div><div class="op-evidence-row"><i class="ok"></i><code>남은 위험</code> 포함</div>') },
    ]),
    'Skill은 한번에 완성되지 않습니다. <b>작은 결과를 검증하면서 절차를 다듬는 자산</b>입니다.'),

  slide('SKILL FAILURE', '넓은 트리거는 <span class="a">엉뚱한 순간에 Skill을 호출</span>합니다',
    `<div class="op-incident"><header>FAILURE · broad trigger</header><p>“요약”이라는 단어가 들어간 모든 요청에 PR 요약 Skill이 실행됩니다.<br>사용자는 회의록 요약을 원했는데, 코드 변경을 찾기 시작합니다.</p><footer>복구: 트리거·입력 조건·사용하지 않는 경우를 명확히 적습니다.</footer></div>`,
    'Skill은 편해질수록 오작동도 커집니다. <b>언제 쓰지 않는지</b>까지 설계합니다.'),

  slide('SUBAGENT', 'SubAgent는 “AI를 여러 명 쓰는 것”이 아니라 <span class="g">작업 계약을 나누는 것</span>입니다',
    agentControl(),
    '역할 이름보다 중요한 것은 <b>입력·출력·범위·완료 기준</b>을 계약으로 고정하는 일입니다.'),

  slide('WORKTREE', '동시에 움직일 때는 <span class="g">작업 공간도 분리</span>합니다',
    agentControl(),
    '같은 파일을 여러 작업자가 동시에 만지면 충돌합니다. <b>작업 공간과 담당 범위</b>를 함께 나눕니다.'),

  slide('MANUAL SCENE · SUBAGENT', '수동 시연 3 — <span class="g">로그인 개선 작업을 분배</span>',
    sequence([
      { title: '작업 분해', detail: 'UI 문구·서버 검증·모바일 QA로 겹치지 않게 나눕니다.', visual: evidence('TASK BOARD · OWNERSHIP', 'SPLIT', '<div class="op-evidence-grid"><span class="live">UI<br>LoginForm</span><span class="live">Server<br>validation</span><span class="live">QA<br>375px screen</span></div>') },
      { title: '계약 전달', detail: '각 담당자에게 파일 범위와 완료 기준을 줍니다.', visual: evidence('TASK CONTRACT · UI', 'ASSIGNED', '<div class="op-evidence-code"><span class="key">owner</span>: UI agent<br><span class="key">files</span>: LoginForm.tsx<br><span class="key">done</span>: 오류 문구·여백 검증<br><span class="amber">do not touch</span>: API</div>') },
      { title: '병렬 진행', detail: '각 작업자는 자기 공간에서 변경과 검증을 남깁니다.', visual: evidence('WORKTREE · ISOLATED', 'PARALLEL', '<div class="op-evidence-row"><i class="ok"></i><code>worktree-ui</code> 문구·레이아웃</div><div class="op-evidence-row"><i class="ok"></i><code>worktree-api</code> 검증 메시지</div><div class="op-evidence-row"><i class="ok"></i><code>worktree-qa</code> 화면 검사</div>') },
      { title: '리뷰 통합', detail: '리뷰 게이트를 통과한 변경만 main에 합칩니다.', visual: evidence('REVIEW GATE · MAIN', 'MERGE READY', '<div class="op-evidence-grid"><span class="live">Diff<br>expected</span><span class="live">check<br>passed</span><span class="gate">owner<br>approve</span></div>') },
    ]),
    '병렬 작업의 속도는 에이전트 수가 아니라 <b>충돌 없는 계약</b>에서 나옵니다.'),

  slide('HANDOFF', '핸드오프는 “끝났습니다”가 아니라 <span class="g">다음 사람이 바로 판단할 수 있는 결과</span>입니다',
    pair(surface('나쁜 전달', '<p>“로그인 쪽 수정했습니다.”</p><p class="amber">무엇을 · 왜 · 어디까지 바꿨는지 알 수 없습니다.</p>'), surface('좋은 전달', '<p><code>변경</code> LoginForm 오류 문구</p><p><code>검증</code> 모바일 375px·check 통과</p><p><code>주의</code> 서버 오류 문구는 미변경</p>')),
    '작업을 넘길 때는 <b>변경·검증·남은 위험</b>을 같은 형식으로 남깁니다.'),

  slide('WORKFLOW', 'Workflow는 <span class="g">트리거에서 결과까지의 길</span>을 고정합니다',
    officeControl(),
    'Workflow는 AI가 생각하는 흐름과, 항상 같은 순서로 해야 하는 흐름을 연결합니다.'),

  slide('WORKFLOW GATE', '좋은 Workflow는 <span class="a">승인 없이 넘어가면 안 되는 지점</span>을 가집니다',
    officeControl(),
    '모든 것을 자동화하면 빠른 것이 아니라 위험해집니다. <b>사람의 승인 지점</b>을 명시합니다.'),

  slide('RECOVERY', 'Workflow가 멈추면 <span class="g">어느 단계에서 멈췄는지</span>부터 읽습니다',
    recoveryRoom(),
    '복구는 처음부터 다시 하는 일이 아닙니다. <b>실패한 단계와 마지막 정상 상태</b>를 찾는 일입니다.'),

  slide('ASSEMBLY', 'MCP·Skill·SubAgent·Workflow는 <span class="g">서로를 대체하지 않습니다</span>',
    `<div class="op-map"><div><b>MCP</b><span>문서·DB·브라우저에<br>접근하는 능력</span></div><div><b>Skill</b><span>PR 요약처럼<br>반복하는 절차</span></div><div><b>SubAgent</b><span>계약을 받고<br>독립 실행하는 역할</span></div><div><b>Workflow</b><span>누가 언제 무엇을<br>거치는지 정의</span></div></div>`,
    '도구를 하나 더 설치하기 전에 <b>지금 비어 있는 층이 능력·절차·역할·흐름 중 무엇인지</b> 봅니다.'),

  slide('FIRST ASSET', '첫 개인 자산은 <span class="g">가장 자주 반복되고, 가장 자주 빠지는 일</span>에서 고릅니다',
    pair(surface('좋은 시작', '<p><span class="teal">PR 요약</span> · 회의록 정리 · QA 체크 · 프로젝트 시작 정리</p><p>반복되며, 입력과 완료 기준을 설명할 수 있습니다.</p>'), surface('나중에 할 것', '<p><span class="amber">모든 업무를 처리하는 만능 에이전트</span></p><p>범위가 넓고, 권한·비용·복구 기준이 아직 없습니다.</p>')),
    '처음에는 범위를 작게 잡아 <b>재사용 가능한 한 가지</b>를 남기는 편이 좋습니다.'),

  slide('MIDPOINT', '90분 지점 — <span class="g">AI의 손발을 설계한다는 것</span>',
    `<div class="op-break"><strong>무엇을 연결하고,<br>어떤 절차로, 누구에게 맡기고,<br>어디서 멈출지 정하는 일.</strong><span>다음 장면부터는 이 네 가지를 하나의 운영 흐름으로 묶습니다.</span></div>`,
    '개념을 외우는 시간이 아니라, 내 작업을 네 층으로 분해하는 시간을 만듭니다.'),

  slide('CONFIG CONTRACT', '연결 설정에는 <span class="g">공개해도 되는 구조</span>와 <span class="a">절대 남기면 안 되는 비밀값</span>이 함께 있습니다',
    pair(surface('공유 가능한 예시', '<div class="op-codeboard"><span class="key">name</span>: <span class="str">docs-search</span><br><span class="key">command</span>: <span class="str">node server.js</span><br><span class="key">scope</span>: <span class="str">read-only</span></div><p>동료가 같은 구조를 재현할 수 있게 남깁니다.</p>'), surface('환경변수로 분리할 값', '<div class="op-codeboard"><span class="bad">TOKEN=...</span><br><span class="bad">API_KEY=...</span><br><span class="good">.env.example에는 이름만</span></div><p>키는 코드·Git·Skill 본문에 직접 넣지 않습니다.</p>')),
    '연결 도구를 만들수록 설정 파일의 구조와 <b>비밀값의 경계</b>를 함께 설계해야 합니다.'),

  slide('DESIGN REVIEW', '확장 도구를 만들기 전, <span class="g">네 질문</span>으로 과한 자동화를 걸러냅니다',
    `<div class="op-map"><div><b>반복되는가</b><span>한 번만 할 일인가</span></div><div><b>입력이 분명한가</b><span>누구나 같은 정보를 주는가</span></div><div><b>완료 기준이 있는가</b><span>통과 여부를 판단할 수 있는가</span></div><div><b>복구 가능한가</b><span>실패하면 어디로 돌아가는가</span></div></div>`,
    '네 질문에 답하기 어렵다면, 아직은 자동화보다 <b>작업 흐름을 관찰</b>할 때입니다.'),

  slide('CLOSE', '다음 주에는 이 조각들을 <span class="g">나만의 AI 사무실</span>로 묶습니다',
    flow([{ title: '능력', detail: 'MCP' }, { title: '절차', detail: 'Skill', tone: 'a' }, { title: '역할', detail: 'SubAgent', tone: 'a' }, { title: '운영', detail: 'Orchestration', tone: 'g' }]),
    '다음 주는 자동화를 더 늘리는 시간이 아니라, <b>안전하게 운영되는 하나의 시스템</b>을 설계하는 시간입니다.'),
];

const html = buildLectureDeck({
  week: 3,
  navTitle: 'MCP · Skill · SubAgent · Workflow',
  coverTitle: 'AI의 손발을 직접 설계하는 법<br><span class="g">MCP · Skill · SubAgent · Workflow</span>',
  coverSubtitle: '외부 능력, 반복 절차, 역할 분배, 자동 흐름을 구분하고 연결해 나만의 재사용 가능한 작업 자산을 설계합니다.',
  coverFlow: ['MCP', 'Skill', 'SubAgent', 'Workflow', 'Permission', 'Recovery'],
  slides,
  extraCss: documentaryCss,
});

// The checked-in onepass HTML decks have been hand-enhanced after generation
// (op-enhanced slides, landscape/loop/ending sequences). Regenerating silently
// discards that work, so overwriting now requires an explicit opt-in.
if (process.env.FORCE_ONEPASS_REBUILD === '1') {
  fs.writeFileSync(output, html, 'utf-8');
  console.log(`onepass-week3.html: ${slides.length} lecture slides + cover`);
} else {
  console.log('onepass-week3.html: skipped (hand-maintained deck; set FORCE_ONEPASS_REBUILD=1 to overwrite)');
}
