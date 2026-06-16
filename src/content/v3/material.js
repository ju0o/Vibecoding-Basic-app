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
  practice: '개인 실습 기록지',
  script: '슬라이드별 상세 대본',
  'source-study': '공식자료 연구노트',
  'demo-runbook': '시연 운영 매뉴얼',
  'deep-dive': '강사용 심화 개념집',
  'qa-bank': '질문·답변·오류 복구집',
  demo: '시연 운영 매뉴얼',
  answers: '질문·답변·오류 복구집',
  research: '공식자료 연구노트',
  fallback: '오프라인 대체 화면',
  rehearsal: '현장 리허설 체크리스트',
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
      <h3>실제 실습 파일</h3>
      <table><tbody>
        <tr><th>시작본</th><td><code>${escapeHtml(lesson.demoProject.starter)}</code></td></tr>
        <tr><th>오류본</th><td><code>${escapeHtml(lesson.demoProject.broken)}</code></td></tr>
        <tr><th>완성본</th><td><code>${escapeHtml(lesson.demoProject.complete)}</code></td></tr>
      </tbody></table>
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

function practice() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '개인 실습 기록')}
      <h2>${escapeHtml(lesson.title)}</h2>
      <p class="objective">${escapeHtml(lesson.practice)}</p>
      <div class="two-col">
        <div class="box"><h3>시작 전 판단</h3><p>오늘 바꿀 한 가지</p>${lines(3)}<p>완료를 확인할 화면·파일·로그</p>${lines(3)}</div>
        <div class="box"><h3>AI에게 맡길 일</h3><p>사람이 결정할 것</p>${lines(3)}<p>AI가 탐색·작성할 것</p>${lines(3)}</div>
      </div>
      <h3>변경과 검증 기록</h3>
      <table><thead><tr><th>순서</th><th>한 행동</th><th>확인한 결과</th><th>다음 판단</th></tr></thead>
      <tbody>${Array.from({ length: 5 }, (_, row) => `<tr><td>${row + 1}</td><td></td><td></td><td></td></tr>`).join('')}</tbody></table>
      <div class="callout"><b>오늘의 다음 작업</b>${lines(2)}</div>
      ${footer('PRACTICE LOG', index + 1)}
    </section>
  `).join('');
}

function script() {
  return course.sessions.map((lesson, index) => {
    const groups = [
      lesson.scriptSlides.slice(0, 4),
      lesson.scriptSlides.slice(4, 8),
      lesson.scriptSlides.slice(8, 11),
      lesson.scriptSlides.slice(11),
    ];
    return groups.map((slides, groupIndex) => `
      <section class="sheet">
        ${pageHead(lesson, index, `강사용 상세 대본 ${groupIndex + 1}/4`)}
        <h2>${escapeHtml(lesson.title)}</h2>
        <p class="objective">${escapeHtml(lesson.objective)}</p>
        <div class="script-slide-list">
          ${slides.map((entry) => `
            <article class="script-slide">
              <header><b>SLIDE ${String(entry.slide).padStart(2, '0')}</b><span>${escapeHtml(entry.title)}</span></header>
              <p><strong>SAY</strong>${escapeHtml(entry.say)}</p>
              <p><strong>DO</strong>${escapeHtml(entry.do)}</p>
              <p><strong>ASK</strong>${escapeHtml(entry.ask)}</p>
              <p><strong>예상 답변</strong>${escapeHtml(entry.expected)}</p>
              <p><strong>심화 설명</strong>${escapeHtml(entry.deepDive || '공식자료와 실제 시연을 연결해 정의보다 판단 기준으로 설명합니다.')}</p>
              <p><strong>오류 복구</strong>${escapeHtml(entry.recovery)}</p>
            </article>`).join('')}
        </div>
        ${footer('INSTRUCTOR SCRIPT', index * 4 + groupIndex + 1)}
      </section>`).join('');
  }).join('');
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

function qaBank() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '질문·답변·오류 복구집')}
      <h2>${escapeHtml(lesson.title)}</h2>
      <h3>판단 실습 해설</h3>
      ${lesson.decisions.map(([question, tone, feedback]) => `<div class="script-block"><span class="script-label">${escapeHtml(tone)}</span><span class="script-copy"><b>${escapeHtml(question)}</b><br>${escapeHtml(feedback)}</span></div>`).join('')}
      <h3>완료 판단</h3>${list(lesson.deliverables.map((item) => `${item}: 화면, 파일, 로그 또는 URL로 확인할 수 있어야 함`))}
      <h3>미완료로 판단하는 경우</h3>${list(['결과 화면만 있고 실행 과정이 재현되지 않음', 'AI가 바꾼 파일과 이유를 설명하지 못함', '오류 또는 실패 상태를 확인하지 않음', '다른 사람이 같은 프로젝트를 실행할 수 없음'])}
      <h3>대표 오류 복구</h3>
      <table><tbody>
        <tr><th>증상</th><td>${escapeHtml(lesson.error.symptom)}</td></tr>
        <tr><th>처음 읽을 로그</th><td><code>${escapeHtml(lesson.error.trace)}</code></td></tr>
        <tr><th>원인 가설</th><td>${escapeHtml(lesson.error.cause)}</td></tr>
        <tr><th>복구 요청</th><td>${escapeHtml(lesson.error.fix)}</td></tr>
      </tbody></table>
      ${footer('QA BANK · A', index * 2 + 1)}
    </section>
    <section class="sheet">
      ${pageHead(lesson, index, '예상 질문과 답변')}
      <h2>${escapeHtml(lesson.title)} 질문 대응</h2>
      <div class="script-block"><span class="script-label">Q1</span><span class="script-copy"><b>AI가 알아서 해주는데 왜 이 구조를 알아야 하나요?</b><br>AI가 만든 결과의 문제 위치와 영향 범위를 사람이 판단해야 안전하게 다음 요청을 할 수 있기 때문입니다.</span></div>
      <div class="script-block"><span class="script-label">Q2</span><span class="script-copy"><b>정답 도구나 유일한 방식이 있나요?</b><br>도구는 바뀌지만 목표, 입력, 권한, 검증, 복구라는 작업 구조는 유지됩니다. 이 과정은 그 판단 기준을 훈련합니다.</span></div>
      <div class="script-block"><span class="script-label">Q3</span><span class="script-copy"><b>어디까지 직접 하고 어디부터 AI에게 맡기나요?</b><br>문제와 완료 기준, 승인과 검증은 사람이 소유합니다. 탐색, 초안, 반복 구현과 정리는 AI에게 맡길 수 있습니다.</span></div>
      <div class="script-block"><span class="script-label">Q4</span><span class="script-copy"><b>오류가 나면 처음부터 다시 만들어야 하나요?</b><br>먼저 마지막 정상 상태와 현재 diff를 비교합니다. 증상, 로그, 직전 변경을 기준으로 가장 작은 원인부터 확인하면 대부분 전체 재작성이 필요하지 않습니다.</span></div>
      <h3>추가 질문 기록</h3>${lines(5)}
      ${footer('QA BANK · B', index * 2 + 2)}
    </section>
  `).join('');
}

function sourceStudy() {
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
    const expectedQuestions = source.expectedQuestions || [];
    return `
      <section class="sheet">
        ${pageHead(course.sessions[0], index + 1, '공식자료 연구노트')}
        <span class="document-kicker">${escapeHtml(source.publisher)} · ${escapeHtml(source.maturity)}</span>
        <h2>${escapeHtml(source.title)}</h2>
        <p class="objective">${escapeHtml(source.coreConceptKo || source.summaryKo)}</p>
        <table><tbody>
          <tr><th>강의 반영 회차</th><td>${escapeHtml(lessons || '공통')}</td></tr>
          <tr><th>강의 반영 위치</th><td>${escapeHtml(source.lectureUseHint || '연결 회차의 공식 개념 학습과 시연 전 주의점')}</td></tr>
          <tr><th>기능 안정성</th><td>${escapeHtml(source.maturity)}</td></tr>
          <tr><th>문서 확인일</th><td>${escapeHtml(source.checkedAt || window.VIBE_OFFICIAL_SOURCES.checkedAt || 'sources:refresh 실행 전')}</td></tr>
          <tr><th>응답 상태</th><td>${escapeHtml(source.status || 'not checked')} · HTTP ${escapeHtml(source.httpStatus || '-')}</td></tr>
        </tbody></table>
        <h3>강사가 반드시 이해할 배경</h3>
        <div class="callout"><p>${escapeHtml(source.instructorBackground || source.instructorNote)}</p></div>
        <h3>수강생에게 말할 쉬운 비유</h3>
        <p>${escapeHtml(source.classroomAnalogy || source.summaryKo)}</p>
        <h3>자주 생기는 오해</h3>
        <p>${escapeHtml(source.commonMisunderstanding || source.instructorNote)}</p>
        <h3>실제 시연 포인트</h3>
        <p>${escapeHtml(source.demoPoint || source.instructorNote)}</p>
        <h3>강사가 알아야 할 주의점</h3>
        <div class="callout"><p>${escapeHtml(source.instructorNote)}</p></div>
        <h3>예상 질문</h3>
        ${expectedQuestions.map((item, questionIndex) => `<div class="script-block"><span class="script-label">Q${questionIndex + 1}</span><span class="script-copy"><b>${escapeHtml(item.q)}</b><br>${escapeHtml(item.a)}</span></div>`).join('') || '<p>수업 중 받은 질문을 기록합니다.</p>'}
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
      <h2>공식자료를 강의로 바꾸는 방식</h2>
      <p class="objective">원문 전체를 복제하지 않고 공식 URL, 확인 날짜, 안정성, 쉬운 한국어 설명, 오해 교정, 시연 포인트만 관리합니다.</p>
      ${list(['기수 시작 전 npm run sources:refresh 실행', '베타·실험 기능은 수업 자료에 상태를 명시', '설치 명령과 가격·요금제는 수업 당일 다시 확인', '슬라이드에는 핵심 원리, 강사 자료에는 배경과 주의점 기록', '공식 문서 내용은 그대로 읽지 말고 수강생 프로젝트 상황으로 번역'])}
      <div class="callout"><b>마지막 갱신</b><p>${escapeHtml(window.VIBE_OFFICIAL_SOURCES.checkedAt || '아직 실행되지 않음')}</p></div>
      ${footer('SOURCE STUDY', 1)}
    </section>
    ${cards || `
      <section class="sheet">
        ${pageHead(course.sessions[0], 1, '공식자료 연구노트')}
        <h2>${escapeHtml(course.title)} 연구 메모</h2>
        <p class="objective">이 과정은 제품별 명령보다 도구 독립적인 설계 원리를 중심으로 구성됩니다.</p>
        <h3>강사가 추가할 사례</h3>${lines(12)}
        ${footer('SOURCE STUDY', 2)}
      </section>`}`;
}

function deepDive() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '강사용 심화 개념집')}
      <h2>${escapeHtml(lesson.title)}</h2>
      <p class="objective">이 페이지는 수강생에게 그대로 나눠주는 자료가 아니라, 강사가 공식자료와 실제 시연 사이의 논리를 이해하기 위한 공부 자료입니다.</p>
      <h3>쉬운 설명</h3>
      ${lesson.concepts.map(([title, copy]) => `<div class="script-block"><span class="script-label">${escapeHtml(title)}</span><span class="script-copy">${escapeHtml(copy)}<br>수업에서는 정의를 먼저 말하지 말고, 화면에서 어떤 판단을 해야 하는지 사례로 설명합니다.</span></div>`).join('')}
      <h3>전문가 관점에서 강조할 것</h3>
      ${list(['권한과 비용은 기능 완성 이후가 아니라 설계 단계에서 함께 결정', 'AI 결과물은 실행·diff·로그·브라우저 증거로 검증', '도구별 명령보다 목표, 컨텍스트, 승인, 복구 흐름을 우선', '수강생의 질문은 정답보다 문제 위치 판단으로 되돌림'])}
      <h3>오해 방지 문장</h3>
      <p>${escapeHtml(lesson.compare.bad.join(' / '))} 방식은 결과를 빨리 보이게 하지만 운영 가능한 결과를 보장하지 않습니다. ${escapeHtml(lesson.compare.good.join(' / '))} 기준으로 다시 묶어 설명합니다.</p>
      <h3>강사 메모</h3>${lines(5)}
      ${footer('DEEP DIVE', index + 1)}
    </section>
  `).join('');
}

function demoRunbook() {
  return demo();
}

function answers() {
  return qaBank();
}

function research() {
  return sourceStudy();
}

function fallback() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet fallback-sheet">
      ${pageHead(lesson, index, '오프라인 대체 화면')}
      <h2>${escapeHtml(lesson.demo.title)}</h2>
      <p class="objective">실제 도구, 로그인 또는 인터넷이 실패하면 아래 캡처를 띄우고 같은 단계와 질문으로 수업을 계속합니다.</p>
      <div class="fallback-frame">
        <img src="../${escapeHtml(lesson.fallbackMedia.image)}" alt="${escapeHtml(lesson.title)} 대체 화면">
      </div>
      <h3>대체 진행</h3>${list(lesson.demo.stages.map((stage, step) => `${step + 1}. ${stage}: 다음 결과를 질문하고 캡처에서 해당 영역을 가리킴`), 'numbered')}
      <div class="callout danger"><b>실제 시연 실패 원인 기록</b>${lines(2)}</div>
      ${footer('OFFLINE FALLBACK', index + 1)}
    </section>
  `).join('');
}

function rehearsal() {
  return course.sessions.map((lesson, index) => `
    <section class="sheet">
      ${pageHead(lesson, index, '현장 리허설')}
      <h2>${escapeHtml(lesson.title)}</h2>
      <div class="two-col">
        <div class="box"><h3>화면·장비</h3>${list(['1280×720과 1920×1080에서 겹침 확인', '프로젝터 복제·화면비·배율 확인', '전체화면과 Esc 동작 확인', '글자와 버튼을 마지막 좌석에서 확인'])}</div>
        <div class="box"><h3>시연·실습</h3>${list(['starter·broken·complete 세 상태 실행', '시작·이전·다음·일시정지·초기화 확인', '오프라인 대체 캡처 열기', '실습 결과 저장 위치 확인'])}</div>
      </div>
      <h3>회차별 시연 순서</h3>${list(lesson.demo.stages, 'numbered')}
      <h3>예상 실패와 대체</h3>
      <table><tbody>
        <tr><th>대표 실패</th><td>${escapeHtml(lesson.error.symptom)}</td></tr>
        <tr><th>첫 확인</th><td>${escapeHtml(lesson.error.trace)}</td></tr>
        <tr><th>대체 진행</th><td>${escapeHtml(lesson.fallbackMedia.image)}</td></tr>
        <tr><th>복구 기준</th><td>${escapeHtml(lesson.error.fix)}</td></tr>
      </tbody></table>
      <h3>리허설 메모</h3>${lines(5)}
      ${footer('REHEARSAL', index + 1)}
    </section>
  `).join('');
}

const renderers = {
  workbook,
  commands,
  examples,
  errors,
  assessment,
  practice,
  script,
  demo,
  answers,
  research,
  fallback,
  rehearsal,
  'source-study': sourceStudy,
  'demo-runbook': demoRunbook,
  'deep-dive': deepDive,
  'qa-bank': qaBank,
};
root.innerHTML = cover() + renderers[kind]();
