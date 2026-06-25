'use strict';

const slides = [...document.querySelectorAll('.slide')];
const slideCount = document.getElementById('slide-count');
let currentSlide = 0;

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === currentSlide));
  slideCount.textContent = `${currentSlide + 1} / ${slides.length}`;
}

document.getElementById('prev-slide').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('next-slide').addEventListener('click', () => showSlide(currentSlide + 1));
document.addEventListener('keydown', (event) => {
  if (document.body.classList.contains('demo-open')) return;
  if (event.target.closest('button, input, textarea')) return;
  if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
  if (event.key === 'ArrowRight' || event.key === ' ') showSlide(currentSlide + 1);
});

const localScene = document.getElementById('local-live-slide').querySelector('.local-live-scene');
const localCopy = document.getElementById('local-live-copy');
document.getElementById('local-live-next').addEventListener('click', () => {
  localScene.classList.add('is-live');
  localCopy.textContent = '공개 URL이 생겼습니다. 이제 내 노트북을 꺼도 사람들이 접속합니다.';
});
document.getElementById('local-live-reset').addEventListener('click', () => {
  localScene.classList.remove('is-live');
  localCopy.textContent = '지금은 내 노트북 안에서만 열립니다.';
});


const gitCommandSteps = {
  status: {
    status: 'WORKING TREE',
    command: '$ git status',
    output: 'On branch main\nChanges not staged for commit:\n  modified: src/components/ApplyButton.jsx',
    title: '바뀐 파일을 먼저 확인합니다',
    copy: 'AI가 수정한 파일이 의도한 위치인지 확인합니다. 아직 기록도, 공유도 되지 않은 내 PC의 상태입니다.',
    location: '확인 위치 · VS Code Source Control / Changes',
    pageTitle: 'Changes',
    pageCopy: '아직 GitHub 페이지에는 없습니다. 내 컴퓨터 안의 변경입니다.',
    record: 'src/components/ApplyButton.jsx',
    footer: 'GitHub에서 확인하려면 마지막에 push가 필요합니다.',
    tab: 'code'
  },
  add: {
    status: 'STAGED',
    command: '$ git add .',
    output: 'Changes to be committed:\n  modified: src/components/ApplyButton.jsx\n  modified: src/components/ApplyButton.css',
    title: '이번 기록에 넣을 파일을 고릅니다',
    copy: 'git add .은 현재 폴더의 변경을 기록 대상으로 올립니다. 큰 프로젝트에서는 필요한 파일만 골라 넣을 수도 있습니다.',
    location: '확인 위치 · VS Code Source Control / Staged Changes',
    pageTitle: 'Staged Changes',
    pageCopy: 'commit을 만들 준비가 된 파일입니다. 아직 GitHub에는 전송되지 않았습니다.',
    record: '2 files staged for commit',
    footer: '다음은 변경 이유를 적은 commit을 만드는 단계입니다.',
    tab: 'code'
  },
  commit: {
    status: 'LOCAL COMMIT',
    command: '$ git commit -m "수강 신청 버튼 수정"',
    output: '[main a8f21c3] 수강 신청 버튼 수정\n 2 files changed, 14 insertions(+), 4 deletions(-)',
    title: '되돌아올 수 있는 저장 지점을 만듭니다',
    copy: 'commit은 파일 묶음에 변경 이유를 붙인 기록입니다. 아직 내 PC에만 있고, 팀과 배포 서비스는 보지 못합니다.',
    location: '확인 위치 · GitHub Commits 탭',
    pageTitle: 'a8f21c3 · 수강 신청 버튼 수정',
    pageCopy: 'push가 끝나면 GitHub의 Commits 탭에서 이 기록을 확인합니다.',
    record: 'a8f21c3  수강 신청 버튼 수정',
    footer: 'commit은 저장 지점, push는 GitHub로 보내는 단계입니다.',
    tab: 'commits'
  },
  push: {
    status: 'GITHUB SYNCED',
    command: '$ git push origin main',
    output: 'Writing objects: 100% (8/8)\nTo github.com:vibe-team/class-project.git\n   7a0e117..a8f21c3  main -> main',
    title: 'GitHub의 공통 기록에 도착했습니다',
    copy: '이제 팀원은 Commits에서 변경을 확인하고, 배포 서비스는 이 commit을 기준으로 build를 시작할 수 있습니다.',
    location: '확인 위치 · GitHub Commits / main',
    pageTitle: 'a8f21c3 is now on main',
    pageCopy: 'GitHub에서 commit hash와 변경 내용을 확인합니다. 다음에 검증한 버전만 release로 표시합니다.',
    record: 'a8f21c3  main  GitHub synced',
    footer: 'GitHub에서 commit을 확인한 뒤, 검증된 버전에만 release 이름을 붙입니다.',
    tab: 'commits'
  }
};

function renderGitCommand(mode) {
  const state = gitCommandSteps[mode];
  const root = document.querySelector('.git-command-workbench');
  root.dataset.gitCommand = mode;
  document.getElementById('git-command-status').textContent = state.status;
  document.getElementById('git-command-line').textContent = state.command;
  document.getElementById('git-command-output').textContent = state.output;
  document.getElementById('git-command-title').textContent = state.title;
  document.getElementById('git-command-copy').textContent = state.copy;
  document.getElementById('git-page-location').textContent = state.location;
  document.getElementById('git-page-title').textContent = state.pageTitle;
  document.getElementById('git-page-copy').textContent = state.pageCopy;
  document.getElementById('git-page-record').innerHTML = `<i></i><span>${state.record}</span><em>${state.status}</em>`;
  document.getElementById('git-page-footer').textContent = state.footer;
  ['code', 'commits', 'releases'].forEach((tab) => document.getElementById(`git-page-${tab}`).classList.toggle('active', tab === state.tab));
  document.querySelectorAll('[data-git-command]').forEach((button) => button.classList.toggle('active', button.dataset.gitCommand === mode));
}
document.querySelectorAll('[data-git-command]').forEach((button) => button.addEventListener('click', () => renderGitCommand(button.dataset.gitCommand)));


const devtoolsSteps = [
  ['F12로 개발자도구 열기', '웹사이트를 쓰는 사람도 F12를 눌러 브라우저가 주고받는 요청을 확인할 수 있습니다.', '요청을 선택하면 전송 내용이 보입니다.'],
  ['Network에서 요청 선택', '결제하기를 누르면 /api/checkout 같은 요청이 Network 목록에 남습니다.', 'POST /api/checkout · status 200'],
  ['요청 헤더 확인', '브라우저 코드에 넣은 값은 요청과 함께 보이거나, 번들 파일에서 발견될 수 있습니다.', 'Authorization: sk_live_••••'],
  ['노출되었다면 폐기하고 교체', '파일만 지우는 것으로 끝나지 않습니다. 해당 키를 폐기하고 새 키를 발급해야 합니다.', 'Key revoked · new secret required']
];
let devtoolsIndex = 0;
const devtoolsRoot = document.getElementById('devtools-slide').querySelector('.devtools-documentary');
function renderDevtools() {
  const step = devtoolsSteps[devtoolsIndex];
  devtoolsRoot.dataset.devtoolsState = String(devtoolsIndex);
  document.getElementById('devtools-step').textContent = `STEP ${devtoolsIndex + 1} / ${devtoolsSteps.length}`;
  document.getElementById('devtools-title').textContent = step[0];
  document.getElementById('devtools-copy').textContent = step[1];
}
document.getElementById('devtools-next').addEventListener('click', () => { devtoolsIndex = Math.min(devtoolsSteps.length - 1, devtoolsIndex + 1); renderDevtools(); });
document.getElementById('devtools-reset').addEventListener('click', () => { devtoolsIndex = 0; renderDevtools(); });

const envRoot = document.getElementById('environment-slide').querySelector('.environment-documentary');
const envCaption = document.getElementById('env-caption');
const envCopies = ['실제 값은 배포 서비스 설정에서 별도로 입력합니다.', '.gitignore가 실제 값이 GitHub 기록에 들어가지 않게 막습니다.', '배포 환경은 필요한 값을 암호화된 설정으로 받아 실행합니다.'];
let envIndex = 0;
function renderEnv() { envRoot.dataset.envState = String(envIndex); envCaption.textContent = envCopies[envIndex]; }
document.getElementById('env-next').addEventListener('click', () => { envIndex = Math.min(2, envIndex + 1); renderEnv(); });
document.getElementById('env-reset').addEventListener('click', () => { envIndex = 0; renderEnv(); });

const roles = {
  guest: { text: '공개 안내만 읽을 수 있습니다', allowed: ['public'], caption: '비회원은 모두가 봐도 되는 정보만 볼 수 있습니다.' },
  member: { text: '내 주문 내역까지 읽을 수 있습니다', allowed: ['public', 'order'], caption: '회원은 로그인한 자신의 주문처럼 소유자가 맞는 데이터만 읽을 수 있습니다.' },
  admin: { text: '운영 데이터와 재고까지 관리할 수 있습니다', allowed: ['public', 'order', 'stock'], caption: '관리자는 운영 권한이 확인될 때만 재고와 관리 정보를 바꿀 수 있습니다.' }
};
document.querySelectorAll('[data-role]').forEach((button) => button.addEventListener('click', () => {
  const role = roles[button.dataset.role];
  document.querySelectorAll('[data-role]').forEach((item) => item.classList.toggle('active', item === button));
  document.querySelectorAll('[data-permission]').forEach((row) => row.classList.toggle('allowed', role.allowed.includes(row.dataset.permission)));
  document.getElementById('permission-result').textContent = role.text;
  document.getElementById('rules-caption').textContent = role.caption;
}));

const platformData = {
  vercel: ['Vercel', 'GitHub의 push가 웹 배포로 이어지는 작업대', 'Vercel은 repository를 연결해 빌드하고, 공개 URL을 만들어 웹 화면을 서비스합니다.', ['GitHub', 'Vercel', 'URL']],
  firebase: ['Firebase', '로그인과 데이터 규칙을 연결하는 앱 플랫폼', 'Firebase는 Authentication, Firestore, Storage처럼 서비스 뒤쪽에 필요한 기능을 제공합니다.', ['App', 'Firebase', 'Auth / DB']]
};
document.querySelectorAll('[data-platform]').forEach((button) => button.addEventListener('click', () => {
  const [label, title, copy, route] = platformData[button.dataset.platform];
  document.querySelectorAll('[data-platform]').forEach((item) => item.classList.toggle('active', item === button));
  document.getElementById('platform-label').textContent = label;
  document.getElementById('platform-title').textContent = title;
  document.getElementById('platform-copy').textContent = copy;
  document.getElementById('platform-route').innerHTML = `<span>${route[0]}</span><i></i><span>${route[1]}</span><i></i><span>${route[2]}</span>`;
}));

const releaseSteps = [
  ['release 기준점 선택', 'GitHub의 검증된 v1.0.0을 이번 공개의 기준으로 고정합니다. 그래서 문제가 생기면 되돌릴 버전도 분명합니다.', 'Release selected: v1.0.0 · commit a8f21c3', 'success'],
  ['웹 build 실행', 'Vercel이 해당 release의 의존성을 설치하고 공개용 웹 파일을 만듭니다. 첫 오류가 있으면 이 단계에서 멈춥니다.', '$ npm run build', 'success'],
  ['환경·기능 연결 확인', '브라우저 비밀값은 제외하고, Vercel 환경변수와 Firebase 로그인·데이터 규칙이 필요한 기능을 연결합니다.', 'Environment variables + Firebase rules verified', 'success'],
  ['공개 URL 활성화', '웹 build와 필요한 연결이 준비되면 공개 URL이 활성화됩니다. 다음 장에서 실제 사용자처럼 확인합니다.', 'Production: https://my-project.vercel.app', 'success']
];
let releaseIndex = -1;
let releaseTimer = null;
let releasePaused = false;
function renderRelease() {
  const completed = releaseSteps.slice(0, releaseIndex + 1);
  document.getElementById('release-lines').innerHTML = completed.length ? completed.map((step) => `<p class="command">${step[2]}</p><p class="${step[3]}">${step[0]} · 완료</p>`).join('') : '<p>시작을 누르면 release 기준점부터 공개 URL까지 진행됩니다.</p>';
  document.querySelectorAll('[data-release-node]').forEach((node) => {
    const index = Number(node.dataset.releaseNode);
    node.classList.toggle('active', index === releaseIndex);
    node.classList.toggle('success', index < releaseIndex);
  });
  document.getElementById('release-packet').style.transform = `translateY(${Math.max(0, releaseIndex) * 53}px)`;
  const title = releaseIndex < 0 ? 'release 기준점 선택' : releaseSteps[releaseIndex][0];
  const copy = releaseIndex < 0 ? '발표자가 시작하면 자동 재생할 수 있고, 다음 버튼으로는 한 단계씩 설명할 수 있습니다.' : releaseSteps[releaseIndex][1];
  document.getElementById('release-title').textContent = title;
  document.getElementById('release-copy').textContent = copy;
  document.getElementById('release-badge').textContent = releaseIndex === 3 ? 'READY' : releaseIndex < 0 ? 'WAITING' : 'RUNNING';
  const domain = document.getElementById('release-domain');
  domain.querySelector('em').textContent = releaseIndex === 3 ? 'LIVE' : '대기';
  if (releaseIndex === 3) domain.querySelector('b').textContent = 'my-project.vercel.app';
}
function stopRelease() { clearInterval(releaseTimer); releaseTimer = null; }
function advanceRelease() { releaseIndex = Math.min(releaseSteps.length - 1, releaseIndex + 1); renderRelease(); if (releaseIndex === releaseSteps.length - 1) stopRelease(); }
document.getElementById('release-start').addEventListener('click', () => { stopRelease(); releasePaused = false; if (releaseIndex >= releaseSteps.length - 1) releaseIndex = -1; advanceRelease(); releaseTimer = setInterval(advanceRelease, 1100); });
document.getElementById('release-next').addEventListener('click', () => { stopRelease(); advanceRelease(); });
document.getElementById('release-pause').addEventListener('click', () => { releasePaused = !releasePaused; document.getElementById('release-pause').textContent = releasePaused ? '계속' : '일시정지'; if (releasePaused) stopRelease(); else if (releaseIndex >= 0 && releaseIndex < releaseSteps.length - 1) releaseTimer = setInterval(advanceRelease, 1100); });
document.getElementById('release-reset').addEventListener('click', () => { stopRelease(); releaseIndex = -1; releasePaused = false; document.getElementById('release-pause').textContent = '일시정지'; renderRelease(); });

const launchChecks = document.querySelectorAll('[data-launch-check]');
launchChecks.forEach((button) => button.addEventListener('click', () => {
  button.classList.toggle('checked');
  const count = document.querySelectorAll('[data-launch-check].checked').length;
  document.getElementById('launch-score').textContent = `${count} / ${launchChecks.length}`;
  document.getElementById('launch-copy').textContent = count === launchChecks.length ? '공개 URL 기준의 핵심 확인을 모두 마쳤습니다. 이제 사용자에게 링크를 전달할 수 있습니다.' : '체크는 읽고 표시하는 일이 아니라, 실제 URL에서 작동을 확인한 뒤 누릅니다.';
}));

let timerSeconds = 1800;
let timerHandle = null;
function renderTimer() {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const seconds = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timer-display').textContent = `${minutes}:${seconds}`;
  document.getElementById('timer-fill').style.transform = `scaleX(${timerSeconds / 1800})`;
}
document.getElementById('timer-toggle').addEventListener('click', () => {
  if (timerHandle) { clearInterval(timerHandle); timerHandle = null; document.getElementById('timer-toggle').textContent = '계속'; return; }
  document.getElementById('timer-toggle').textContent = '일시정지';
  timerHandle = setInterval(() => { timerSeconds = Math.max(0, timerSeconds - 1); renderTimer(); if (timerSeconds === 0) { clearInterval(timerHandle); timerHandle = null; document.getElementById('timer-toggle').textContent = '완료'; } }, 1000);
});
document.getElementById('timer-reset').addEventListener('click', () => { clearInterval(timerHandle); timerHandle = null; timerSeconds = 1800; document.getElementById('timer-toggle').textContent = '시작'; renderTimer(); });

renderDevtools();
renderEnv();
renderRelease();
renderTimer();
const requestedSlide = Number(new URLSearchParams(location.search).get('slide'));
showSlide(Number.isFinite(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0);

function renderDevtoolsWorkbench() {
  const step = devtoolsSteps[devtoolsIndex];
  const headerText = [
    '요청을 선택하면 전송 내용이 보입니다.',
    'POST /api/checkout · status 200',
    'sk_live_••••',
    '키 폐기 완료 · 새 키는 서버 환경변수에서만 사용'
  ][devtoolsIndex];
  const headerLabel = ['Network', 'Request', 'Authorization', 'Recovery'][devtoolsIndex];
  document.getElementById('devtools-header-line').innerHTML = `<b>${headerLabel}</b> ${headerText}`;
  document.getElementById('devtools-status').textContent = devtoolsIndex === 3 ? '401 REVOKED' : '200 OK';
  document.getElementById('devtools-user-state').textContent = devtoolsIndex === 0 ? '비회원' : '결제 요청 확인';
  const secretLine = document.getElementById('secret-source-line');
  secretLine.classList.toggle('visible', devtoolsIndex >= 2);
  const alert = document.querySelector('.devtools-workbench .devtools-alert');
  alert.classList.toggle('recovered', devtoolsIndex === 3);
  alert.innerHTML = devtoolsIndex === 3
    ? '<b>키 폐기 및 서버 환경변수 이동 완료</b><span>기존 키는 더 이상 쓰지 않고, 새 값은 서버의 환경변수에서만 읽습니다. 다시 배포한 뒤 실제 호출을 확인합니다.</span>'
    : '<b>비밀값이 브라우저에 노출되었습니다</b><span>파일을 지우는 것으로 끝나지 않습니다. 해당 키를 폐기하고 새 키를 발급해야 합니다.</span>';
  if (devtoolsIndex === 3) secretLine.innerHTML = '<small>복구 후 브라우저 코드</small><code>const paymentSecret = process.env.PAYMENT_SECRET;</code><span>실제 값은 서버 환경변수에만 남깁니다.</span>';
  if (devtoolsIndex < 3) secretLine.innerHTML = '<small>공개된 app.js 안의 위험한 코드 예시</small><code>const paymentSecret = "sk_live_51ExampleOnly";</code><span>브라우저에 내려온 코드라면 누구나 볼 수 있습니다.</span>';
}
document.getElementById('devtools-next').addEventListener('click', renderDevtoolsWorkbench);
document.getElementById('devtools-reset').addEventListener('click', renderDevtoolsWorkbench);
document.getElementById('devtools-pay-button').addEventListener('click', () => {
  devtoolsIndex = Math.max(devtoolsIndex, 1);
  renderDevtools();
  renderDevtoolsWorkbench();
});

const firestoreRoleDetails = {
  guest: { trace: 'GET /orders/0314', status: 'DENIED', rule: '로그인 전에는 주문 데이터에 접근할 수 없습니다.', code: '<i>01</i> match /orders/{id} {\n<i>02</i>   allow read: if request.auth != null;\n<i>03</i> }' },
  member: { trace: 'GET /orders/0314', status: 'ALLOWED', rule: '로그인한 회원은 자신의 uid와 주문 uid가 같을 때만 읽을 수 있습니다.', code: '<i>01</i> match /orders/{id} {\n<i>02</i>   allow read: if request.auth.uid == resource.data.uid;\n<i>03</i> }' },
  admin: { trace: 'PATCH /classes/stock', status: 'ALLOWED', rule: '관리자는 서버에서 확인된 admin 권한으로 운영 데이터를 수정합니다.', code: '<i>01</i> match /classes/{id} {\n<i>02</i>   allow write: if request.auth.token.admin == true;\n<i>03</i> }' }
};
function renderFirestoreConsole(role) {
  const state = firestoreRoleDetails[role];
  const root = document.querySelector('.firestore-console');
  root.dataset.firestoreRole = role;
  document.getElementById('firestore-rule-code').innerHTML = state.code;
  document.getElementById('firestore-trace-state').innerHTML = `<i></i><b>${role.toUpperCase()}</b><span>${state.trace}</span><em>${state.status}</em>`;
  document.getElementById('firestore-rule-label').textContent = state.rule;
}
document.querySelectorAll('[data-role]').forEach((button) => button.addEventListener('click', () => renderFirestoreConsole(button.dataset.role)));

function renderPlatformConsole(mode) {
  const root = document.querySelector('.platform-console');
  root.dataset.platformMode = mode;
  document.querySelectorAll('.platform-console [data-platform]').forEach((button) => button.classList.toggle('active', button.dataset.platform === mode));
}
document.querySelectorAll('.platform-console [data-platform]').forEach((button) => button.addEventListener('click', () => renderPlatformConsole(button.dataset.platform)));

const launchVisualStates = {
  login: {
    button: '로그아웃', copy: '김수강 님으로 로그인했습니다. 내 신청 내역과 권한이 연결됩니다.', card: '로그인 상태가 확인되었습니다.', action: '로그아웃하기'
  },
  data: {
    button: '신청 완료', copy: '수강 신청이 저장되고, 새로고침해도 내 신청 내역에서 다시 읽힙니다.', card: '바이브코딩 기초반 · 신청 완료', action: '저장 결과 보기'
  },
  mobile: {
    button: '모바일에서도 신청', copy: '모바일 화면으로 줄여도 주요 행동과 글자가 유지되는지 확인합니다.', card: '모바일 viewport QA 완료', action: '모바일 미리보기'
  },
  secret: {
    button: '권한 확인 완료', copy: '브라우저에는 비밀값이 없고, 서버와 데이터 규칙이 권한을 다시 확인합니다.', card: '서버 환경변수 + Firestore Rules 확인', action: '보안 상태 보기'
  }
};
let launchPlayHandle = null;
function renderLaunchAction(action) {
  const state = launchVisualStates[action];
  const root = document.querySelector('.launch-browser-action');
  root.dataset.launchState = action;
  document.getElementById('launch-action-button').textContent = state.action;
  document.getElementById('launch-hero-copy').textContent = state.copy;
  document.querySelector('#launch-data-card b').textContent = state.card;
  document.querySelectorAll('.launch-browser-action [data-launch-check]').forEach((button) => button.classList.toggle('checked', button.dataset.launchCheck === action || button.classList.contains('checked')));
  const count = document.querySelectorAll('.launch-browser-action [data-launch-check].checked').length;
  document.getElementById('launch-score').textContent = `${count} / 4`;
  document.getElementById('launch-copy').textContent = `${state.button} 동작을 공개 URL에서 확인했습니다. 다음 항목도 실제 사용자처럼 검증합니다.`;
}
document.querySelectorAll('.launch-browser-action [data-launch-check]').forEach((button) => button.addEventListener('click', () => renderLaunchAction(button.dataset.launchCheck)));
document.getElementById('launch-action-button').addEventListener('click', () => renderLaunchAction('login'));
document.getElementById('launch-play').addEventListener('click', () => {
  clearInterval(launchPlayHandle);
  const steps = ['login', 'data', 'mobile', 'secret'];
  let index = 0;
  renderLaunchAction(steps[index]);
  launchPlayHandle = setInterval(() => {
    index += 1;
    if (index >= steps.length) { clearInterval(launchPlayHandle); launchPlayHandle = null; return; }
    renderLaunchAction(steps[index]);
  }, 950);
});
document.getElementById('launch-reset').addEventListener('click', () => {
  clearInterval(launchPlayHandle);
  launchPlayHandle = null;
  document.querySelector('.launch-browser-action').dataset.launchState = 'start';
  document.querySelectorAll('.launch-browser-action [data-launch-check]').forEach((button) => button.classList.remove('checked'));
  document.getElementById('launch-score').textContent = '0 / 4';
  document.getElementById('launch-action-button').textContent = '로그인하기';
  document.getElementById('launch-hero-copy').textContent = '공개 URL에서 실제 기능을 확인합니다.';
  document.querySelector('#launch-data-card b').textContent = '아직 저장된 신청이 없습니다.';
  document.getElementById('launch-copy').textContent = '각 항목을 누르면 왼쪽 공개 사이트에서 실제 사용자 동작이 재연됩니다.';
});

renderGitCommand('status');
renderDevtoolsWorkbench();
renderFirestoreConsole('guest');
renderPlatformConsole('vercel');

// Auto-number content slides so inserted slides stay sequential.
function numberSlides() {
  let section = 0;
  slides.forEach((slide, index) => {
    const corner = slide.querySelector('.slide-head > span');
    if (corner && /^\d+$/.test(corner.textContent.trim())) corner.textContent = String(index + 1).padStart(2, '0');
    const eyebrow = slide.querySelector('.eyebrow');
    if (eyebrow && /^\d{2}\s·\s/.test(eyebrow.textContent)) {
      section += 1;
      eyebrow.textContent = eyebrow.textContent.replace(/^\d{2}/, String(section).padStart(2, '0'));
    }
  });
  const nextNumber = document.querySelector('.next-number');
  if (nextNumber) nextNumber.textContent = String(slides.length);
}
numberSlides();

// Interactive CRUD table (data section) — each op makes a clear visible change
const crudBase = [
  { id: 1, name: '지민', role: '관리자' },
  { id: 2, name: '서연', role: '수강생' },
  { id: 3, name: '도윤', role: '수강생' },
  { id: 4, name: '하린', role: '수강생' },
];
function buildCrudRow(record, cls) {
  const row = document.createElement('div');
  row.className = 'crud2-row' + (cls ? ' ' + cls : '');
  row.innerHTML = `<span>${record.id}</span><span>${record.name}</span><span>${record.role}</span>`;
  return row;
}
function selectCrud2(operation) {
  const table = document.getElementById('crud2-table');
  if (!table) return;
  const status = document.getElementById('crud2-status');
  document.querySelectorAll('[data-crud2]').forEach((button) => button.classList.toggle('active', button.dataset.crud2 === operation));
  table.querySelectorAll('.crud2-row:not(.head)').forEach((row) => row.remove());
  const rows = crudBase.map((record) => ({ ...record }));
  let statusHTML = '';
  if (operation === 'create') {
    rows.forEach((record) => table.appendChild(buildCrudRow(record)));
    table.appendChild(buildCrudRow({ id: 5, name: '민준', role: '수강생' }, 'created'));
    statusHTML = '<span class="op c">CREATE</span><span class="msg">새 행 <b>5 · 민준</b>을 추가했습니다 — 행이 하나 늘었습니다.</span>';
  } else if (operation === 'read') {
    rows.forEach((record, index) => { const row = buildCrudRow(record, 'reading'); row.style.animationDelay = (index * 0.14) + 's'; table.appendChild(row); });
    statusHTML = '<span class="op r">READ</span><span class="msg">저장된 <b>4명</b>을 그대로 불러옵니다 — 데이터는 바뀌지 않습니다.</span>';
  } else if (operation === 'update') {
    rows[1].role = '관리자';
    rows.forEach((record, index) => table.appendChild(buildCrudRow(record, index === 1 ? 'updated' : '')));
    statusHTML = '<span class="op u">UPDATE</span><span class="msg"><b>서연</b>의 role을 수강생 → <b>관리자</b>로 바꿨습니다.</span>';
  } else if (operation === 'delete') {
    const els = rows.map((record) => { const row = buildCrudRow(record); table.appendChild(row); return row; });
    requestAnimationFrame(() => requestAnimationFrame(() => els[3].classList.add('removing')));
    statusHTML = '<span class="op d">DELETE</span><span class="msg"><b>4 · 하린</b> 행을 삭제했습니다 — 행이 사라집니다.</span>';
  }
  if (status) status.innerHTML = statusHTML;
}
document.querySelectorAll('[data-crud2]').forEach((button) => button.addEventListener('click', () => selectCrud2(button.dataset.crud2)));
if (document.getElementById('crud2-table')) {
  crudBase.forEach((record) => document.getElementById('crud2-table').appendChild(buildCrudRow(record)));
  const crudStatus = document.getElementById('crud2-status');
  if (crudStatus) crudStatus.innerHTML = '<span class="op n">CRUD</span><span class="msg">버튼을 눌러 추가·조회·수정·삭제가 표를 어떻게 바꾸는지 확인하세요.</span>';
}
