'use strict';

const params = new URLSearchParams(location.search);
const courseId = params.get('course') || 'workflow';
const kind = params.get('kind') || 'workbook';
const audience = params.get('audience') || 'student';
const course = window.VIBE_V3_COURSES?.[courseId];
const sourceCatalog = window.VIBE_OFFICIAL_SOURCES?.sources || {};
const root = document.getElementById('material');

const kindTitles = {
  workbook: '통합 실습 워크북',
  commands: 'Windows·Mac 명령어 및 설정집',
  examples: '예제·설정·복구 파일',
  errors: '오류 사례와 해결 훈련',
  assessment: '프로젝트 체크·평가표',
  script: '슬라이드별 상세 대본',
  demo: '실제 시연 운영 매뉴얼',
  answers: '정답·평가·예상 질문',
  research: '공식 참고자료 연구노트',
};

if (!course || !kindTitles[kind]) {
  root.innerHTML = '<section class="sheet"><h1>자료를 찾을 수 없습니다.</h1></section>';
  throw new Error(`Material not found: ${courseId}/${kind}`);
}

document.documentElement.style.setProperty('--accent', course.color);
document.title = `${course.title} - ${kindTitles[kind]}`;
document.getElementById('toolbar-title').textContent = `${course.code} · ${kindTitles[kind]}`;
document.getElementById('btn-print').addEventListener('click', () => window.print());

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const list = (items, className = 'checklist') => `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
const lines = (count = 4) => `<div class="memo-lines">${Array.from({ length: count }, () => '<i></i>').join('')}</div>`;
const footer = (label, page) => `<footer class="page-foot"><span>VIBE STUDIO · ${escapeHtml(course.code)}</span><span>${escapeHtml(label)} · ${String(page).padStart(2, '0')}</span></footer>`;

function cover() {
  return `
    <section class="sheet cover-sheet">
      <div>
        <span class="document-kicker">${escapeHtml(audience.toUpperCase())} MATERIAL · ${escapeHtml(course.code)}</span>
        <h1>${escapeHtml(kindTitles[kind])}</h1>
        <p class="lead">${escapeHtml(course.title)}<br>${escapeHtml(course.description)}</p>
        <div class="cover-route">${course.sessions.map((lesson, index) => `<div><b>LESSON ${String(index + 1).padStart(2, '0')}</b><span>${escapeHtml(lesson.title)}</span></div>`).join('')}</div>
      </div>
      <div class="cover-footer"><span>${escapeHtml(course.route)}</span><span>V3 BETA · A4 EDITION</span></div>
    </section>
  `;
}

function pageHead(lesson, index, label = kindTitles[kind]) {
  return `<header class="page-head"><span>${escapeHtml(label)}</span><em>${escapeHtml(course.code)} · LESSON ${String(index + 1).padStart(2, '0')}</em></header>`;
}

function workbook() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index)}
      <h2>${escapeHtml(lesson.title)}</h2>
      <p class="objective">${escapeHtml(lesson.objective)}</p>
      <div class="two-col">
        <div class="box"><h3>오늘의 판단 기준</h3>${list(lesson.concepts.map(([title, copy]) => `${title}: ${copy}`))}</div>
        <div class="box"><h3>수업 결과물</h3>${list(lesson.deliverables)}</div>
      </div>
      <h3>작업 순서</h3>${list(lesson.sequence, 'numbered')}
      <div class="callout"><b>수업 중 확인</b><p>설명을 들은 뒤 각 단계에서 화면, 파일, 로그 또는 데이터 중 무엇을 확인해야 하는지 표시합니다.</p></div>
      ${footer('WORKBOOK · A', index * 2 + 1)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '내 프로젝트 적용')}
      <h2>${escapeHtml(lesson.title)} 실습 기록</h2>
      <h3>내 프로젝트에 적용할 작업</h3><p>${escapeHtml(lesson.practice)}</p>${lines(6)}
      <div class="two-col">
        <div class="box"><h3>오류가 났을 때</h3><p><b>증상</b><br>${escapeHtml(lesson.error.symptom)}</p><p><b>첫 확인</b><br>${escapeHtml(lesson.error.trace)}</p><p><b>원인 가설</b><br>${escapeHtml(lesson.error.cause)}</p></div>
        <div class="box"><h3>수업 종료 체크</h3>${list(['직접 실행해 확인했다', '변경 전후를 비교했다', '실패 상태를 기록했다', '다음 작업 한 가지를 정했다'])}</div>
      </div>
      <h3>다음 수업 전 할 일</h3>${lines(4)}
      ${footer('WORKBOOK · B', index * 2 + 2)}
    </section>
  `).join('');
}

const commandSets = {
  foundation: [
    ['현재 폴더 확인', 'Windows PowerShell', 'Get-Location', 'Mac Terminal', 'pwd'],
    ['파일 목록 보기', 'Windows PowerShell', 'Get-ChildItem', 'Mac Terminal', 'ls -la'],
    ['Node 버전 확인', '공통', 'node -v', 'npm 버전', 'npm -v'],
    ['개발 서버 실행', '프로젝트 폴더', 'npm run dev', '중지', 'Ctrl + C'],
    ['Git 상태 확인', '공통', 'git status', '변경 비교', 'git diff'],
  ],
  product: [
    ['새 작업 브랜치', '공통', 'git switch -c feature/name', '상태 확인', 'git status'],
    ['변경 저장', '공통', 'git add <file>', '커밋', 'git commit -m "message"'],
    ['테스트 실행', '프로젝트 명령', 'npm test', '빌드 확인', 'npm run build'],
    ['환경변수 예시', '.env.local', 'PAYMENT_SECRET=...', '주의', '.gitignore에 .env* 확인'],
  ],
  workflow: [
    ['현재 위치', 'Windows', 'Get-Location', 'Mac', 'pwd'],
    ['실행 프로세스', 'Windows', 'Get-Process', 'Mac', 'ps aux'],
    ['Git 기록', '공통', 'git log --oneline -10', '변경 비교', 'git diff --stat'],
    ['환경변수 확인', 'Windows', '$env:NAME', 'Mac', 'echo $NAME'],
    ['로그 저장', '공통', 'npm run dev > app.log 2>&1', '주의', '비밀값이 포함되지 않았는지 확인'],
  ],
  claude: [
    ['설치 확인', '터미널', 'claude --version', '시작', 'claude'],
    ['프로젝트 상태', 'Git', 'git status', '변경 비교', 'git diff'],
    ['검증 명령', '예시', 'npm test', '빌드', 'npm run build'],
    ['MCP 확인', '제품 문서 기준', 'claude mcp list', '주의', '명령은 수업 전 공식 문서 재확인'],
  ],
  codex: [
    ['설치 확인', '터미널', 'codex --version', '시작', 'codex'],
    ['프로젝트 상태', 'Git', 'git status', '변경 비교', 'git diff'],
    ['검증 명령', '예시', 'npm run check', '테스트', 'npm test'],
    ['설정 위치', '사용자 설정', '~/.codex/config.toml', '프로젝트 지침', 'AGENTS.md'],
  ],
};

function commands() {
  const rows = commandSets[course.visualMode] || commandSets.workflow;
  const first = `
    <section class="sheet">
      ${pageHead(course.sessions[0], 0)}
      <h2>명령은 목적과 실행 위치를 함께 확인합니다</h2>
      <p class="objective">복사하기 전에 현재 폴더, 변경될 파일, 성공 신호, 중지 방법을 먼저 확인하세요.</p>
      <table><thead><tr><th>목적</th><th>환경</th><th>명령</th><th>함께 확인할 것</th><th>예시</th></tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td><code>${escapeHtml(cell)}</code></td>`).join('')}</tr>`).join('')}</tbody></table>
      <div class="callout danger"><b>주의</b><p>인터넷에서 찾은 삭제, 권한 변경, 전역 설치 명령은 그대로 실행하지 않습니다. AI에게 명령의 목적과 영향 범위를 먼저 설명하게 하세요.</p></div>
      ${footer('COMMANDS', 1)}
    </section>`;
  const second = `
    <section class="sheet">
      ${pageHead(course.sessions[0], 1, '복구 명령')}
      <h2>문제가 생기면 상태를 먼저 수집합니다</h2>
      <h3>AI에게 전달할 정보</h3>${list(['실행한 명령 전체', '터미널 오류의 첫 줄부터 원인 줄까지', '현재 폴더와 프로젝트 종류', '직전에 바꾼 파일', '기대했던 결과와 실제 결과'])}
      <h3>복구 순서</h3>${list(['실행 중인 서버를 Ctrl + C로 중지', 'git status로 변경 파일 확인', '오류 메시지를 삭제하지 말고 복사', '원인 가설 한 가지씩 확인', '수정 후 같은 명령으로 재실행'], 'numbered')}
      <h3>내 프로젝트 명령 기록</h3>${lines(9)}
      ${footer('COMMANDS', 2)}
    </section>`;
  return first + second;
}

function examples() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index)}
      <h2>${escapeHtml(lesson.title)} 시작본</h2>
      <p class="objective">이 예시는 정답 코드가 아니라 AI에게 요청할 범위와 확인 순서를 보여주는 복구 가능한 시작점입니다.</p>
      <h3>작업 요청 템플릿</h3>
      <div class="terminal">목표: ${escapeHtml(lesson.objective)}

현재 상태:
- 프로젝트 종류와 실행 명령:
- 관련 파일:
- 현재 보이는 문제:

요청:
1. 먼저 관련 파일과 영향 범위를 설명해줘.
2. 작은 변경 계획을 제시해줘.
3. 변경 후 실행할 검증 명령을 알려줘.
4. 승인 후 구현하고 diff와 결과를 요약해줘.</div>
      <h3>정상 시작 순서</h3>${list(lesson.sequence, 'numbered')}
      ${footer('EXAMPLES · A', index * 2 + 1)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '복구용 예제')}
      <h2>${escapeHtml(lesson.title)} 복구본</h2>
      <div class="two-col">
        <div class="box"><h3>재현할 실패 상태</h3>${list([lesson.error.symptom, lesson.error.trace])}</div>
        <div class="box"><h3>복구 기준</h3>${list([lesson.error.cause, lesson.error.fix, '같은 입력과 환경에서 다시 실행', '원래 사용자 행동을 끝까지 확인'])}</div>
      </div>
      <h3>AI에게 전달할 오류 보고</h3>
      <div class="terminal">실행한 행동:
보이는 증상: ${escapeHtml(lesson.error.symptom)}
오류 또는 로그: ${escapeHtml(lesson.error.trace)}
직전 변경:
기대 결과:

원인을 하나씩 확인할 수 있는 최소 수정 계획을 제시해줘.</div>
      <h3>내 프로젝트에 맞게 바꿀 항목</h3>${lines(6)}
      ${footer('EXAMPLES · B', index * 2 + 2)}
    </section>
  `).join('');
}

function errors() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index)}
      <h2>오류 훈련 ${String(index + 1).padStart(2, '0')} · ${escapeHtml(lesson.error.symptom)}</h2>
      <div class="terminal">${escapeHtml(lesson.error.trace)}</div>
      <table><tbody>
        <tr><th>관찰한 증상</th><td>${escapeHtml(lesson.error.symptom)}</td></tr>
        <tr><th>가능성이 높은 원인</th><td>${escapeHtml(lesson.error.cause)}</td></tr>
        <tr><th>안전한 첫 수정</th><td>${escapeHtml(lesson.error.fix)}</td></tr>
      </tbody></table>
      <h3>AI에게 질문하기 전에 직접 채우기</h3>
      <p><b>실행한 명령 또는 행동</b></p>${lines(2)}
      <p><b>오류가 시작된 첫 지점</b></p>${lines(2)}
      <p><b>수정 후 같은 조건으로 재실행한 결과</b></p>${lines(3)}
      <div class="callout"><b>복구 완료 기준</b><p>오류 문구가 사라진 것만 보지 말고, 원래 하려던 사용자 행동이 끝까지 완료되는지 확인합니다.</p></div>
      ${footer('ERROR DRILL', index + 1)}
    </section>
  `).join('');
}

function assessment() {
  const criteria = [
    ['문제와 목표', '사용자 또는 업무의 실제 문제를 한 문장으로 설명한다.'],
    ['작동 흐름', '시작부터 결과까지 핵심 행동이 끊기지 않는다.'],
    ['검증 기록', '변경 전후, diff, 테스트 또는 화면 확인이 남아 있다.'],
    ['실패 복구', '오류 증상, 원인, 수정, 재실행 기록이 있다.'],
    ['보안과 권한', '비밀값과 접근 권한을 최소 범위로 관리한다.'],
    ['협업과 인수인계', '다른 사람이 실행하고 다음 작업을 이어갈 수 있다.'],
  ];
  return `
    <section class="sheet">
      ${pageHead(course.sessions[0], 0)}
      <h2>프로젝트 제출 전 점검</h2>
      <p class="objective">기능의 개수보다 실제 작동, 검증, 복구와 설명 가능성을 평가합니다.</p>
      ${list(['공개 또는 시연 가능한 실행 주소가 있다', '핵심 사용자 흐름을 3분 안에 시연할 수 있다', '비밀값이 저장소에 포함되지 않았다', '실패 상태와 복구 방법이 기록되어 있다', 'README 또는 인수인계 문서가 있다'])}
      <h3>평가표</h3>
      <table class="rubric"><thead><tr><th>기준</th><th>확인 내용</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead>
      <tbody>${criteria.map(([title, copy]) => `<tr><td>${escapeHtml(title)}</td><td>${escapeHtml(copy)}</td><td>□</td><td>□</td><td>□</td><td>□</td></tr>`).join('')}</tbody></table>
      <h3>다음 개선 한 가지</h3>${lines(4)}
      ${footer('ASSESSMENT', 1)}
    </section>
    <section class="sheet">
      ${pageHead(course.sessions[0], 1, '동료 리뷰 기록')}
      <h2>동료 리뷰와 개인 작업 기록</h2>
      <div class="two-col">
        <div class="box"><h3>팀 결과물</h3>${list(['내 역할과 책임을 설명했다', '리뷰 요청과 반영 기록이 있다', '팀 결정이 문서에 남아 있다', '다른 사람이 이어받을 수 있다'])}</div>
        <div class="box"><h3>개인 결과물</h3>${list(['같은 주차 산출물을 개인 프로젝트에 적용했다', '내가 직접 판단한 내용을 기록했다', 'AI 결과를 검토한 근거가 있다', '다음 작업을 스스로 정했다'])}</div>
      </div>
      <h3>리뷰어 의견</h3>${lines(8)}
      <h3>반영 여부와 이유</h3>${lines(5)}
      ${footer('PEER REVIEW', 2)}
    </section>`;
}

function script() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '강사용 상세 대본')}
      <h2>${escapeHtml(lesson.title)}</h2>
      <p class="objective">${escapeHtml(lesson.objective)}</p>
      <div class="script-block"><span class="script-label">SAY · 도입</span><span class="script-copy">오늘은 ${escapeHtml(lesson.subtitle)}를 외우는 시간이 아닙니다. 수업이 끝났을 때 여러분의 프로젝트에서 ${escapeHtml(lesson.deliverables[0])}을 직접 확인할 수 있어야 합니다. 먼저 지금 어디에서 막히는지 짧게 확인하겠습니다.</span></div>
      <div class="script-block"><span class="script-label">ASK · 진단</span><span class="script-copy">현재 프로젝트에서 결과는 보이지만 왜 그렇게 작동하는지 설명하기 어려운 장면이 있나요? 최근에 가장 오래 멈췄던 지점을 한 문장으로 이야기해 주세요.</span></div>
      <div class="script-block"><span class="script-label">예상 답변</span><span class="script-copy">어떤 파일을 고쳐야 할지 몰랐다, 오류가 길어서 닫았다, 배포 후에만 문제가 났다, AI가 너무 많은 파일을 바꿨다 같은 답이 나올 수 있습니다. 답을 평가하지 말고 오늘 개념과 연결할 단어만 칠판에 남깁니다.</span></div>
      <div class="script-block"><span class="script-label">SAY · 핵심</span><span class="script-copy">${escapeHtml(lesson.concepts.map(([title, copy]) => `${title}는 ${copy}`).join(' '))} 이 네 가지는 서로 떨어진 용어가 아니라 한 작업을 판단하는 순서입니다.</span></div>
      <div class="script-block"><span class="script-label">DO · 애니메이션</span><span class="script-copy">자동 재생하지 않습니다. 시작을 누른 뒤 ${escapeHtml(lesson.demo.stages.join(' → '))} 순서로 한 단계씩 진행합니다. 각 단계에서 화면 변화와 확인할 로그를 짚고 다음 버튼을 누르기 전에 수강생에게 다음 결과를 예측하게 합니다.</span></div>
      ${footer('INSTRUCTOR SCRIPT · A', index * 3 + 1)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '강사용 진행·복구 대본')}
      <h2>${escapeHtml(lesson.title)} 진행 운영</h2>
      <div class="script-block"><span class="script-label">ASK · 이해</span><span class="script-copy">지금 문제가 생긴다면 어느 단계에서 멈췄다고 AI에게 말해야 할까요? 화면에서 보이는 증상과 실제 원인을 구분해서 이야기해 보세요.</span></div>
      <div class="script-block"><span class="script-label">오류 복구</span><span class="script-copy">${escapeHtml(lesson.error.symptom)} 상황을 보여줍니다. 오류 전문을 지우지 않고 ${escapeHtml(lesson.error.trace)}를 읽은 뒤 ${escapeHtml(lesson.error.cause)}라는 가설을 세웁니다. ${escapeHtml(lesson.error.fix)} 후 같은 조건으로 다시 실행해야 복구가 끝납니다.</span></div>
      <div class="script-block"><span class="script-label">DO · 실습</span><span class="script-copy">${escapeHtml(lesson.practice)} 강사는 완성 화면을 대신 만들어주지 않고 수강생이 현재 상태, 다음 한 단계, 확인 방법을 말하도록 돕습니다.</span></div>
      <div class="script-block"><span class="script-label">ASK · 리뷰</span><span class="script-copy">오늘 만든 결과에서 사람이 직접 판단한 부분은 무엇인가요? AI가 만든 결과를 어떤 화면, 로그, diff 또는 데이터로 검증했나요?</span></div>
      <div class="script-block"><span class="script-label">시간 조정</span><span class="script-copy">10분이 부족하면 개념 카드 설명을 줄이고 시연과 실습을 유지합니다. 10분이 남으면 수강생 두 명의 서로 다른 해결 방법을 비교합니다. 실습이 막히면 완성본을 대신 보여주기보다 증상 수집 템플릿을 함께 채웁니다.</span></div>
      <h3>강사가 확인할 결과</h3>${list(lesson.deliverables.map((item) => `${item}: 말이 아니라 화면, 파일, 로그 또는 URL로 확인`))}
      ${footer('INSTRUCTOR SCRIPT · B', index * 3 + 2)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '강사용 시간 운영표')}
      <h2>${escapeHtml(lesson.title)} 120분 운영</h2>
      <h3>120분 운영표</h3>
      <table><thead><tr><th>구간</th><th>강사 행동</th><th>확인할 산출물</th></tr></thead><tbody>
        <tr><td>진단 10분</td><td>경험과 막힘 수집</td><td>오늘 질문 한 가지</td></tr>
        <tr><td>이론·시각화 35분</td><td>수동 단계 시연</td><td>원인과 결과 설명</td></tr>
        <tr><td>실제 시연 20분</td><td>정상·실패 비교</td><td>검증 화면 또는 로그</td></tr>
        <tr><td>실습 40분</td><td>작은 범위 코칭</td><td>${escapeHtml(lesson.deliverables[0])}</td></tr>
        <tr><td>복구·리뷰 15분</td><td>오류와 다음 작업 정리</td><td>복구 기록</td></tr>
      </tbody></table>
      <h3>현장 체크</h3>${list(['자동 재생을 끄고 발표자가 단계를 제어한다', '수강생이 다음 결과를 예측한 뒤 진행한다', '실패 화면을 숨기지 않고 복구 절차에 사용한다', '실습 종료 10분 전에 결과물 저장을 안내한다', '다음 작업 한 가지를 기록하고 종료한다'])}
      <h3>수업 후 기록</h3>${lines(6)}
      ${footer('INSTRUCTOR SCRIPT · C', index * 3 + 3)}
    </section>
  `).join('');
}

function demo() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '실제 시연 운영 매뉴얼')}
      <h2>${escapeHtml(lesson.demo.title)}</h2>
      <p class="objective">발표자는 시작, 다음, 일시정지, 초기화를 직접 제어합니다. 수강생이 결과를 예측할 시간을 확보합니다.</p>
      <h3>시연 전 준비</h3>${list([...lesson.preparation, '정상 상태 캡처', '실패 상태 캡처', '복구 명령 또는 되돌릴 커밋'])}
      <h3>정상 시연 순서</h3>${list(lesson.demo.stages.map((stage, step) => `${step + 1}. ${stage}: 화면 변화와 확인 기준을 말한 뒤 다음 단계로 이동`), 'numbered')}
      <div class="callout"><b>속도 원칙</b><p>한 단계가 끝날 때마다 다음 결과를 질문하고 3초 이상 기다립니다. 수강생 답을 들은 뒤 다음 버튼을 누릅니다.</p></div>
      ${footer('LIVE DEMO · A', index * 2 + 1)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '실패 시 대체 운영')}
      <h2>${escapeHtml(lesson.title)} 시연 복구</h2>
      <h3>실패 시 대체 화면</h3>
      <table><tbody>
        <tr><th>인터넷 불가</th><td>로컬 캡처와 사전 저장 로그로 같은 원인·결과를 설명합니다.</td></tr>
        <tr><th>도구 로그인 실패</th><td>설정 화면 캡처와 완료된 저장소에서 diff를 재연합니다.</td></tr>
        <tr><th>빌드 지연</th><td>빌드 로그를 멈추고 마지막 성공 산출물로 검증 단계만 이어갑니다.</td></tr>
        <tr><th>예상 밖 오류</th><td>오류를 숨기지 않고 수업의 오류 복구 템플릿을 즉시 적용합니다.</td></tr>
      </tbody></table>
      <h3>현장 실패 복구 순서</h3>${list(['증상과 시간을 그대로 말한다', '수강생에게 오류 화면을 함께 읽게 한다', '사전 준비한 대체 캡처로 개념 설명을 이어간다', '휴식 또는 실습 중 실제 원인을 복구한다', '복구 결과를 수업 종료 전에 공유한다'], 'numbered')}
      <h3>강의 전 리허설 기록</h3>${lines(6)}
      ${footer('LIVE DEMO · B', index * 2 + 2)}
    </section>
  `).join('');
}

function answers() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '정답·평가 기준')}
      <h2>${escapeHtml(lesson.title)}</h2>
      <h3>판단 실습 해설</h3>
      ${lesson.decisions.map(([question, tone, feedback]) => `<div class="script-block"><span class="script-label">${escapeHtml(tone)}</span><span class="script-copy"><b>${escapeHtml(question)}</b><br>${escapeHtml(feedback)}</span></div>`).join('')}
      <h3>완료 판단</h3>${list(lesson.deliverables.map((item) => `${item}: 화면, 파일, 로그 또는 URL로 확인할 수 있어야 함`))}
      <h3>미완료로 판단하는 경우</h3>${list(['결과 화면만 있고 실행 과정이 재현되지 않음', 'AI가 바꾼 파일과 이유를 설명하지 못함', '오류 또는 실패 상태를 확인하지 않음', '다른 사람이 같은 프로젝트를 실행할 수 없음'])}
      ${footer('ANSWERS · A', index * 2 + 1)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '예상 질문과 답변')}
      <h2>${escapeHtml(lesson.title)} 질문 대응</h2>
      <div class="script-block"><span class="script-label">Q1</span><span class="script-copy"><b>AI가 알아서 해주는데 왜 이 구조를 알아야 하나요?</b><br>AI가 만든 결과의 문제 위치와 영향 범위를 사람이 판단해야 안전하게 다음 요청을 할 수 있기 때문입니다.</span></div>
      <div class="script-block"><span class="script-label">Q2</span><span class="script-copy"><b>정답 도구나 유일한 방식이 있나요?</b><br>도구는 바뀌지만 목표, 입력, 권한, 검증, 복구라는 작업 구조는 유지됩니다. 이 과정은 그 판단 기준을 훈련합니다.</span></div>
      <div class="script-block"><span class="script-label">Q3</span><span class="script-copy"><b>어디까지 직접 하고 어디부터 AI에게 맡기나요?</b><br>문제와 완료 기준, 승인과 검증은 사람이 소유합니다. 탐색, 초안, 반복 구현과 정리는 AI에게 맡길 수 있습니다.</span></div>
      <div class="script-block"><span class="script-label">Q4</span><span class="script-copy"><b>오류가 나면 처음부터 다시 만들어야 하나요?</b><br>먼저 마지막 정상 상태와 현재 diff를 비교합니다. 증상, 로그, 직전 변경을 기준으로 가장 작은 원인부터 확인하면 대부분 전체 재작성이 필요하지 않습니다.</span></div>
      <h3>추가 질문 기록</h3>${lines(5)}
      ${footer('ANSWERS · B', index * 2 + 2)}
    </section>
  `).join('');
}

function research() {
  const keys = [...new Set(course.sessions.flatMap((lesson) => lesson.sources || []))];
  const cards = keys.map((key, index) => {
    const source = sourceCatalog[key];
    if (!source) return `
      <section class="sheet">
        ${pageHead(course.sessions[0], index + 1, '공식 참고자료')}
        <h2>${escapeHtml(key)}</h2>
        <div class="callout danger"><p>출처 정보가 아직 등록되지 않았습니다.</p></div>
        ${footer('RESEARCH SOURCE', index + 2)}
      </section>`;
    const lessons = course.sessions.map((lesson, index) => lesson.sources?.includes(key) ? `${index + 1}강` : null).filter(Boolean).join(', ');
    return `
      <section class="sheet">
        ${pageHead(course.sessions[0], index + 1, '공식 참고자료')}
        <span class="document-kicker">${escapeHtml(source.publisher)} · ${escapeHtml(source.maturity)}</span>
        <h2>${escapeHtml(source.title)}</h2>
        <p class="objective">${escapeHtml(source.summaryKo)}</p>
        <table><tbody>
          <tr><th>강의 반영 회차</th><td>${escapeHtml(lessons || '공통')}</td></tr>
          <tr><th>기능 안정성</th><td>${escapeHtml(source.maturity)}</td></tr>
          <tr><th>문서 확인일</th><td>${escapeHtml(source.checkedAt || window.VIBE_OFFICIAL_SOURCES.checkedAt || 'sources:refresh 실행 전')}</td></tr>
          <tr><th>응답 상태</th><td>${escapeHtml(source.status || 'not checked')} · HTTP ${escapeHtml(source.httpStatus || '-')}</td></tr>
        </tbody></table>
        <h3>강사가 알아야 할 주의점</h3>
        <div class="callout"><p>${escapeHtml(source.instructorNote)}</p></div>
        <h3>공식 문서</h3>
        <div class="source-card"><a href="${escapeHtml(source.url)}">${escapeHtml(source.url)}</a></div>
        <h3>수업 전 추가 확인</h3>${list(['설치 명령과 지원 운영체제', '가격·요금제 또는 사용 한도', '베타·실험 기능 상태', '권한과 보안 주의점', '슬라이드와 대본의 표현이 현재 문서와 일치하는지'])}
        <h3>강사 메모</h3>${lines(4)}
        ${footer('RESEARCH SOURCE', index + 2)}
      </section>`;
  }).join('');
  return `
    <section class="sheet">
      ${pageHead(course.sessions[0], 0)}
      <h2>공식 참고자료 사용 원칙</h2>
      <p class="objective">원문 전체를 복제하지 않고 공식 URL, 확인 날짜, 기능 안정성, 쉬운 한국어 설명과 강의 반영 위치만 관리합니다.</p>
      ${list(['기수 시작 전 npm run sources:refresh 실행', '베타·실험 기능은 수업 자료에 상태를 명시', '설치 명령과 가격·요금제는 수업 당일 다시 확인', '슬라이드에는 핵심 원리, 강사 자료에는 주의점 기록'])}
      <div class="callout"><b>마지막 갱신</b><p>${escapeHtml(window.VIBE_OFFICIAL_SOURCES.checkedAt || '아직 실행되지 않음')}</p></div>
      ${footer('RESEARCH', 1)}
    </section>
    ${cards || `
      <section class="sheet">
        ${pageHead(course.sessions[0], 1, '공식 참고자료')}
        <h2>${escapeHtml(course.title)} 연구 메모</h2>
        <p class="objective">이 과정은 제품별 명령보다 도구 독립적인 설계 원리를 중심으로 구성됩니다.</p>
        <h3>강사가 추가할 사례</h3>${lines(12)}
        ${footer('RESEARCH', 2)}
      </section>`}`;
}

const renderers = { workbook, commands, examples, errors, assessment, script, demo, answers, research };
root.innerHTML = cover() + renderers[kind]();
