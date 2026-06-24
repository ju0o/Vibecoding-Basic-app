'use strict';

const fs = require('fs');
const path = require('path');
const { buildLectureDeck, flow, pair, sequence, slide, terminal } = require('./onepass-lecture-kit.js');
const { browserProof, documentaryCss, terminalFlight, toolSurface } = require('./onepass-documentary-scenes.js');

const output = path.join(__dirname, '..', 'src', 'content', 'sessions', 'onepass-week2.html');
const surface = (title, body) => `<h3>${title}</h3>${body}`;
const evidence = (title, status, body, tone = '') => `<div class="op-evidence-top"><b>${title}</b><span class="op-evidence-status ${tone}">${status}</span></div><div class="op-evidence-body">${body}</div>`;

const slides = [
  slide('WEEK 02 · OPERATE', '도구를 잘 쓴다는 것은<br><span class="g">대화창을 많이 여는 일</span>이 아닙니다',
    toolSurface('claude'),
    '오늘은 Claude Code와 Codex를 <b>작업 표면과 통제 방식</b>으로 이해합니다.'),

  slide('TOOL SURFACES', '<span class="g">데스크톱 앱</span>과 <span class="a">CLI</span>는 같은 AI를 다른 방식으로 통제합니다',
    terminalFlight(),
    '둘 중 하나가 우월한 것이 아니라, <b>어떤 상황을 더 분명히 보고 싶은가</b>의 차이입니다.'),

  slide('DESKTOP APP', '데스크톱 앱은 <span class="g">큰 그림을 잡고 판단</span>할 때 강합니다',
    toolSurface('claude'),
    '프로젝트의 방향, 계획, 검토가 필요한 순간에는 화면이 넓은 데스크톱 앱이 편합니다.'),

  slide('CLI', 'CLI는 <span class="g">지금 이 저장소에서 무슨 일이 일어나는지</span>를 정확하게 보여줍니다',
    terminalFlight(),
    '명령은 마법 주문이 아니라, <b>현재 상태를 보고 다음 행동을 고르는 질문</b>입니다.'),

  slide('IDE', 'IDE는 <span class="g">코드가 바뀌는 자리</span>를 가장 가까이에서 보여줍니다',
    toolSurface('codex'),
    '데스크톱 앱이 계획실이라면, IDE는 <b>수정 내용을 확인하는 작업대</b>입니다.'),

  slide('ONE REQUEST', '같은 요청도 <span class="g">작업 표면</span>에 따라 확인하는 장면이 달라집니다',
    browserProof(),
    '중요한 것은 “어느 도구로 했나”가 아니라 <b>요청부터 검증까지 빠진 단계가 없는가</b>입니다.'),

  slide('CLAUDE CODE', '<span class="g">Claude Code</span> — 저장소 맥락을 읽고 계획·수정·검토를 이어갑니다',
    toolSurface('claude'),
    '프로젝트 규칙을 먼저 읽히고, 계획과 검증을 같이 남기는 흐름이 핵심입니다.'),

  slide('CODEX', '<span class="g">Codex</span> — 작업 공간과 검증 기준을 바탕으로 구현을 끝까지 확인합니다',
    toolSurface('codex'),
    '작업 공간의 경계와 실제 화면 검증을 명확히 하는 것이 Codex 작업의 중요한 축입니다.'),

  slide('COMMON LOOP', 'Claude Code와 Codex 모두 <span class="g">이 네 단계</span>를 건너뛰면 위험합니다',
    flow([{ title: '읽기', detail: '규칙·현재 상태' }, { title: '계획', detail: '작은 변경 단위', tone: 'a' }, { title: '수정', detail: 'Diff 확인', tone: 'a' }, { title: '검증', detail: '실행·화면', tone: 'g' }]),
    '도구별 화면은 달라도, <b>읽기 → 계획 → 수정 → 검증</b>은 공통된 작업 규율입니다.'),

  slide('WORKSPACE', '첫 명령은 늘 <span class="g">“여기가 맞는 폴더인가?”</span>입니다',
    terminal('terminal · safe boundary', [['cmd', '$ pwd'], ['warn', '/Users/me'], ['fail', 'project root가 아닙니다'], ['cmd', '$ cd projects/shop-app'], ['ok', '$ ls  → src / public / package.json']]),
    '엉뚱한 폴더에서 실행하면 AI가 틀린 파일을 읽고, 변경 기록도 남지 않을 수 있습니다.'),

  slide('COMMAND VOCABULARY', '터미널 명령은 외우기보다 <span class="g">역할</span>로 기억합니다',
    `<div class="op-map"><div><b>이동</b><span>cd · pwd<br>어디에서 일하나</span></div><div><b>확인</b><span>ls · find<br>무엇이 있나</span></div><div><b>실행</b><span>npm run ...<br>프로젝트를 켜고 검사</span></div><div><b>중단</b><span>Ctrl + C<br>실행을 멈추고 다시 본다</span></div></div>`,
    '명령 한 줄은 “컴퓨터에게 시키는 일”이 아니라 <b>작업 상태를 다루는 동사</b>입니다.'),

  slide('COMMAND SCENE', '<span class="g">pwd → ls → npm run check</span>로 시작하면 길을 잃지 않습니다',
    terminal('terminal · project orientation', [['cmd', '$ pwd'], ['ok', '/projects/shop-app'], ['cmd', '$ ls'], ['ok', 'src  public  package.json  README.md'], ['cmd', '$ npm run check'], ['ok', 'Project check passed.']]),
    'AI에게 일을 맡기기 전에도, 내가 <b>프로젝트의 위치와 상태</b>를 한 번 확인합니다.'),

  slide('CONTEXT START', 'AI가 일을 시작하기 전에는 <span class="g">프로젝트의 현재 맥락</span>이 먼저입니다',
    toolSurface('claude'),
    'GitHub의 협업 흐름은 1주차에서 다뤘습니다. 여기서는 <b>AI가 실제 작업을 시작하기 전 어떤 맥락을 읽어야 하는지</b>에 집중합니다.'),

  slide('BROWSER PROOF', '작업이 끝났다는 말보다 <span class="g">실제 화면의 증거</span>가 먼저입니다',
    browserProof(),
    '여기서의 핵심은 기록 명령을 반복하는 것이 아니라, <b>바뀐 결과가 사용자 화면에서 실제로 읽히는지</b> 검증하는 습관입니다.'),

  slide('OPERATING FLOW', '도구가 달라도 <span class="g">작업의 호흡</span>은 같습니다',
    terminalFlight(),
    '이번 주의 작업 흐름은 <b>맥락 → 작은 변경 → Diff → 브라우저 검증</b>입니다. 협업 명령은 1주차의 Git 장면으로 연결해 기억하면 됩니다.'),

  slide('MANUAL SCENE · DESKTOP APP', '수동 시연 1 — <span class="g">계획을 확정하는 순간</span>',
    sequence([
      { title: '요청 접수', detail: '“모바일에서 로그인 오류를 더 쉽게 이해하게 해줘.”', visual: evidence('WORKSPACE · REQUEST', 'INBOX', '<div class="op-evidence-row"><i class="ok"></i><code>goal</code> 로그인 실패 원인을 읽기 쉽게</div><div class="op-evidence-row"><i></i><code>owner</code> 나 · 승인 전 공개 금지</div>') },
      { title: '범위 확인', detail: 'LoginForm과 validation 메시지만 수정 대상으로 잡습니다.', visual: evidence('WORKSPACE · SCOPE', 'BOUNDARY', '<div class="op-evidence-row"><i class="ok"></i><code>src/LoginForm.tsx</code></div><div class="op-evidence-row"><i class="ok"></i><code>src/styles/login.css</code></div><div class="op-evidence-row"><i class="warn"></i><code>API / DB / 권한 규칙</code> 변경 금지</div>') },
      { title: '완료 기준', detail: '모바일 화면에서 오류가 잘리고 겹치지 않아야 합니다.', visual: evidence('WORKSPACE · ACCEPTANCE', 'CHECK', '<div class="op-evidence-grid"><span class="live">375px<br>글자 안 잘림</span><span class="live">오류 문구<br>의미가 분명</span><span class="gate">check<br>통과 필요</span></div>') },
      { title: '실행 전달', detail: '확정된 계획을 IDE 또는 CLI 작업으로 넘깁니다.', visual: evidence('WORKSPACE · HANDOFF', 'READY', '<div class="op-evidence-row"><i class="ok"></i><code>input</code> 요청 · 범위 · 완료 기준</div><div class="op-evidence-row"><i class="ok"></i><code>next</code> IDE / CLI에서 작은 수정</div>') },
    ]),
    '큰 요청을 바로 실행하지 말고 <b>수정 범위와 완료 기준</b>을 먼저 고정합니다.'),

  slide('MANUAL SCENE · CLI', '수동 시연 2 — <span class="g">CLI에서 안전하게 수정</span>',
    sequence([
      { title: '위치 확인', detail: 'pwd와 git status로 올바른 저장소인지 확인합니다.', visual: evidence('TERMINAL · ORIENTATION', 'SAFE', '<div class="op-evidence-code"><span class="key">$</span> pwd<br><span class="ok">/projects/shop-app</span><br><span class="key">$</span> git status<br><span class="ok">On branch main · clean</span></div>') },
      { title: '요청 실행', detail: 'AI에게 LoginForm의 오류 문구만 바꾸라고 요청합니다.', visual: evidence('TERMINAL · REQUEST', 'SCOPED', '<div class="op-evidence-code"><span class="key">request</span> LoginForm 오류 문구만 수정<br><span class="amber">guard</span> API·DB 파일은 건드리지 않음</div>') },
      { title: 'Diff 읽기', detail: '수정 파일과 변경 줄을 확인합니다.', visual: evidence('TERMINAL · DIFF', 'REVIEW', '<div class="op-evidence-code"><span class="bad">- 입력값이 올바르지 않습니다.</span><br><span class="ok">+ 이메일 또는 비밀번호를 확인해 주세요.</span><br><span class="key">files</span> LoginForm.tsx · login.css</div>') },
      { title: '프로젝트 검사', detail: 'check와 브라우저 실행으로 결과를 확인합니다.', visual: evidence('TERMINAL · VERIFY', 'PASS', '<div class="op-evidence-grid"><span class="live">check<br>passed</span><span class="live">browser<br>375px</span><span class="gate">commit<br>가능</span></div>') },
    ]),
    'CLI는 AI가 한 일을 숨기지 않습니다. <b>변경·검증 기록</b>이 바로 옆에 남습니다.'),

  slide('MANUAL SCENE · DIFF', '수동 시연 3 — <span class="g">Diff가 승인 전 마지막 관문</span>',
    sequence([
      { title: '변경 전', detail: '오류 메시지가 기술적이고, 모바일에서 잘립니다.', visual: evidence('BROWSER · 375px', 'FAIL', '<div class="op-evidence-grid"><span class="bad">로그인 실패:<br>credential...</span><span>입력창</span><span>로그인</span></div>', 'fail') },
      { title: '변경 확인', detail: '문구와 레이아웃 수정이 예상한 파일에만 있는지 봅니다.', visual: evidence('DIFF · 2 FILES', 'REVIEW', '<div class="op-evidence-row"><i class="ok"></i><code>LoginForm.tsx</code> 문구 변경</div><div class="op-evidence-row"><i class="ok"></i><code>login.css</code> 줄바꿈 여백</div><div class="op-evidence-row"><i></i><code>그 외 파일 0개</code></div>') },
      { title: '화면 확인', detail: '브라우저의 모바일 폭에서 실제로 읽히는지 확인합니다.', visual: evidence('BROWSER · 375px', 'VISIBLE', '<div class="op-evidence-grid"><span class="live">이메일 또는<br>비밀번호를 확인</span><span>입력창</span><span class="live">로그인</span></div>') },
      { title: '검증 결과', detail: '변경 범위와 브라우저 확인 결과를 다음 작업자가 읽을 수 있게 남깁니다.', visual: evidence('WORK LOG · HANDOFF', 'READY', '<div class="op-evidence-code"><span class="key">changed</span> LoginForm.tsx · login.css<br><span class="ok">verified</span> check · 375px browser QA<br><span class="key">next</span> 사람 승인 대기</div>') },
    ]),
    'AI의 제안은 자동 승인 대상이 아닙니다. <b>Diff와 실행 화면</b>이 사람의 판단 근거입니다.'),

  slide('PERMISSION', '권한 요청은 귀찮은 팝업이 아니라 <span class="a">작업 경계</span>를 묻는 신호입니다',
    `<div class="op-incident"><header>PERMISSION REQUEST</header><p>“외부 서비스에 연결하려고 합니다.”<br>“이 파일을 수정하려고 합니다.”<br>“명령을 실행하려고 합니다.”</p><footer>무엇을 · 어디까지 · 왜 하는지 확인한 뒤 승인합니다.</footer></div>`,
    '권한을 많이 주는 것이 능력이 아닙니다. <b>필요한 범위를 확인하고 승인</b>하는 것이 운영입니다.'),

  slide('RECOVERY', '잘못된 폴더·잘못된 명령은 <span class="g">멈추고 되돌아가는 것</span>이 정답입니다',
    `<div class="op-incident"><header>INCIDENT · wrong working directory</header><p>AI가 프로젝트 밖의 파일을 읽고 있습니다.<br>새 명령을 더 넣지 말고, 현재 경로와 열려 있는 폴더부터 다시 확인합니다.</p><footer>pwd → cd 프로젝트 루트 → ls → 다시 계획</footer></div>`,
    '오류가 나면 더 강한 명령을 넣지 않습니다. <b>현재 위치와 변경 범위</b>로 돌아갑니다.'),

  slide('DECISION', '어떤 표면을 고를지 <span class="g">작업의 질문</span>으로 결정합니다',
    `<div class="op-map"><div><b>계획이 흐리다</b><span>데스크톱 앱<br>문서·맥락 비교</span></div><div><b>코드가 바뀐다</b><span>IDE<br>파일·Diff 확인</span></div><div><b>명령·검사가 중요</b><span>CLI<br>경로·실행·검사</span></div><div><b>사용자 확인</b><span>브라우저<br>화면·동작 검증</span></div></div>`,
    '도구 선택은 취향이 아니라 <b>지금 해결해야 하는 질문</b>에서 출발합니다.'),

  slide('MIDPOINT', '90분 지점 — <span class="g">명령보다 중요한 것은 통제감</span>',
    `<div class="op-break"><strong>내가 지금 무엇을 바꾸고,<br>어떻게 확인하는지 안다.</strong><span>이 감각이 생기면 앱과 CLI를 오가도 흔들리지 않습니다.</span></div>`,
    '잠깐 멈춰 지금까지의 흐름을 한 문장으로 묶고, 다음 장면부터는 도구별 비교를 더 깊게 봅니다.'),

  slide('TOOL-SPECIFIC', '도구별 명령은 <span class="a">제품의 공식 문서</span>로 확인하고, 원리는 공통으로 가져갑니다',
    pair(surface('고정해서 외울 것', '<p><span class="teal">작업 위치</span> · 변경 범위 · Diff · 테스트 · 브라우저 확인</p><p>도구가 바뀌어도 이 다섯 기준은 유지됩니다.</p>'), surface('수업 전 재확인할 것', '<p><span class="amber">설치 명령</span> · 메뉴 이름 · 권한 화면 · 베타 기능 · 요금과 한도</p><p>이 값들은 공식 문서 기준으로 당일 확인합니다.</p>')),
    '변하는 제품 UI는 <b>수업 전 공식 문서 기준</b>으로 확인하고, 변하지 않는 작업 규율을 가져갑니다.'),

  slide('CLOSE', '오늘의 결론 — AI 도구는 <span class="g">작업을 대신하는 손</span>, 판단은 내 몫입니다',
    flow([{ title: '계획', detail: '내가 정함' }, { title: '수정', detail: 'AI가 도움', tone: 'a' }, { title: '검증', detail: '함께 확인', tone: 'a' }, { title: '승인', detail: '내가 결정', tone: 'g' }]),
    '다음 주에는 이 도구들에게 <b>외부 능력과 반복 절차</b>를 직접 연결합니다.'),
];

const html = buildLectureDeck({
  week: 2,
  navTitle: 'Claude Code · Codex · Desktop · CLI',
  coverTitle: 'Claude Code와 Codex,<br><span class="g">도구를 직접 운영하는 법</span>',
  coverSubtitle: '데스크톱 앱·IDE·CLI를 비교하고, AI가 저장소를 읽고 계획·수정·검증하는 실제 작업 장면을 깊게 이해합니다.',
  coverFlow: ['Desktop App', 'IDE', 'CLI', 'Context', 'Diff', 'Browser QA'],
  slides,
  extraCss: documentaryCss,
});

fs.writeFileSync(output, html, 'utf-8');
console.log(`onepass-week2.html: ${slides.length} lecture slides + cover`);
