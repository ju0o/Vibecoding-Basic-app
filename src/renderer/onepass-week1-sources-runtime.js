const whenReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
    return;
  }
  callback();
};

const scopeQuery = (scope, selector) => document.querySelector(`${scope} ${selector}`);
const scopeAll = (scope, selector) => [...document.querySelectorAll(`${scope} ${selector}`)];
const setScopedText = (scope, selector, value) => {
  scopeAll(scope, selector).forEach((node) => { node.textContent = value; });
};

const sourceFour = '.src-s4';
const sourceFive = '.src-s5';

const labFiles = {
  page: {
    tab: 'src/app/page.tsx',
    focusTitle: '문구 영역',
    focusCopy: '제목과 설명처럼 이 페이지에만 있는 내용은 page.tsx에서 찾는 경우가 많습니다.',
    activeLine: 3,
    lines: [
      ['1', '<span class="token-key">export default function</span> Home() {'],
      ['2', '  <span class="token-key">return</span> ('],
      ['3', '    &lt;main&gt;'],
      ['4', '      &lt;<span class="token-tag">h1</span>&gt;집중할 수 있는 공간&lt;/<span class="token-tag">h1</span>&gt;'],
      ['5', '      &lt;p&gt;하루 단위로 작업 공간을 예약하세요.&lt;/p&gt;'],
      ['6', '      &lt;ReserveButton /&gt;'],
      ['7', '    &lt;/main&gt;'],
      ['8', '  );'],
      ['9', '}'],
    ],
  },
  button: {
    tab: 'src/components/Button.tsx',
    focusTitle: '버튼 부품',
    focusCopy: '여러 화면에서 반복해 쓰는 버튼은 components 폴더의 파일에서 찾습니다.',
    activeLine: 2,
    lines: [
      ['1', '<span class="token-key">export function</span> ReserveButton() {'],
      ['2', '  <span class="token-key">return</span> ('],
      ['3', '    &lt;<span class="token-tag">button</span> className=<span class="token-string">"primary"</span>&gt;'],
      ['4', '      자리 확인'],
      ['5', '    &lt;/<span class="token-tag">button</span>&gt;'],
      ['6', '  );'],
      ['7', '}'],
    ],
  },
  style: {
    tab: 'src/styles/globals.css',
    focusTitle: '스타일 규칙',
    focusCopy: '색상과 간격처럼 여러 요소에 적용되는 규칙은 CSS 파일에서 확인합니다.',
    activeLine: 6,
    lines: [
      ['1', '.hero {'],
      ['2', '  <span class="token-prop">padding</span>: 28px 20px;'],
      ['3', '  <span class="token-prop">background</span>: #2d3733;'],
      ['4', '}'],
      ['5', ''],
      ['6', '.primary {'],
      ['7', '  <span class="token-prop">background</span>: #e7795d;'],
      ['8', '  <span class="token-prop">border-radius</span>: 4px;'],
      ['9', '}'],
    ],
  },
};

const diffFiles = {
  button: {
    tab: 'src/components/Button.tsx',
    title: '예상한 버튼 파일입니다',
    copy: '문구와 클래스만 바뀌었습니다. 다른 기능 파일까지 건드리지 않았는지 확인합니다.',
    lines: [['1', ' ', 'export function ReserveButton() {'], ['2', ' ', '  return ('], ['3', '-', '    <button className="primary">예약하기</button>'], ['3', '+', '    <button className="primary calm">자리 확인</button>'], ['4', ' ', '  );'], ['5', ' ', '}']],
  },
  style: {
    tab: 'src/styles/globals.css',
    title: '스타일 변경 범위를 확인합니다',
    copy: '공용 클래스가 바뀌면 이 클래스를 쓰는 다른 화면도 함께 확인해야 합니다.',
    lines: [['6', ' ', '.primary {'], ['7', '-', '  background: #e7795d;'], ['7', '+', '  background: #758f7e;'], ['8', '-', '  border-radius: 4px;'], ['8', '+', '  border-radius: 999px;'], ['9', ' ', '}']],
  },
  package: {
    tab: 'package.json',
    title: '요청하지 않은 패키지가 추가됐습니다',
    copy: '단순 버튼 수정에 새 라이브러리가 필요한지 AI에게 이유를 묻고 필요 없으면 되돌립니다.',
    lines: [['11', ' ', '"dependencies": {'], ['12', ' ', '  "next": "..."'], ['13', '+', '  "motion": "^12.0.0"'], ['14', ' ', '}']],
  },
};

const rootDetails = {
  root: ['PROJECT', 'my-project/', 'src, public, node_modules와 설정 파일은 모두 프로젝트 루트의 동등한 구역입니다.'],
  src: ['SOURCE', 'src/', '화면과 기능을 만드는 실제 서비스 코드가 모이는 작업 구역입니다.'],
  public: ['ASSET', 'public/', '브라우저가 그대로 읽는 이미지와 아이콘을 보관합니다.'],
  package: ['MANIFEST', 'package.json', '실행 명령과 필요한 패키지 목록을 기록합니다.'],
  env: ['SECRET', '.env.local', '내 컴퓨터의 실제 비밀값입니다. GitHub에 올리지 않습니다.'],
};

const sourceZones = {
  page: ['src/app/page.tsx', 'PAGE ASSEMBLY', '사용자가 들어오는 한 화면을 조립합니다', '제목, 설명, 버튼과 카드 부품을 모아 특정 주소에서 보이는 페이지를 만듭니다.', 'AI에게: 이 문구가 보이는 페이지 파일을 먼저 찾아줘.'],
  component: ['src/components/Button.tsx', 'REUSABLE UI', '여러 화면에서 반복되는 부품을 한 번 정의합니다', '버튼, 카드, 헤더처럼 반복되는 요소를 독립 파일로 두면 한 곳에서 관리할 수 있습니다.', 'AI에게: 이 버튼을 사용하는 모든 페이지와 영향 범위를 알려줘.'],
  logic: ['src/lib/api.ts', 'SHARED LOGIC', '화면 뒤에서 반복되는 처리 방법을 모읍니다', '데이터 요청과 유효성 검사처럼 여러 화면이 같이 쓰는 처리 규칙을 둡니다.', 'AI에게: 이 함수가 어디에서 호출되고 어떤 데이터를 돌려주는지 설명해줘.'],
  style: ['src/styles/globals.css', 'VISUAL SYSTEM', '서비스 전체의 색과 간격 규칙을 관리합니다', '글꼴, 색상, 여백 같은 공통 스타일은 넓은 화면에 영향을 줍니다.', 'AI에게: 다른 화면 영향 없이 이 클래스를 수정해줘.'],
};

const workflowSteps = [
  ['01 · TARGET', '수정할 장면을 한 문장으로 정합니다', '브라우저에서 직접 보이는 대상을 먼저 고르면 AI에게도 수정 범위를 정확히 말할 수 있습니다.'],
  ['02 · SEARCH', '화면 문구와 파일 검색을 연결합니다', '브라우저에 보이는 문구를 검색어로 써 페이지와 컴포넌트 후보를 좁힙니다.'],
  ['03 · REQUEST', 'AI에게 범위와 지켜야 할 조건을 말합니다', '찾은 파일 후보와 원하는 결과를 주고, 다른 화면 영향도 확인하도록 요청합니다.'],
  ['04 · DIFF', '변경된 파일과 코드 차이를 확인합니다', '파일이 예상보다 많이 바뀌었다면 적용 전에 이유를 묻습니다. diff는 AI 작업의 영수증입니다.'],
  ['05 · VERIFY', '브라우저에서 정상 동작을 다시 확인합니다', '색상만 보지 말고 클릭, 로딩, 모바일, 다른 페이지 영향까지 확인해야 끝납니다.'],
];

function renderCode(target, lines, activeLine = -1) {
  if (!target) return;
  target.innerHTML = lines.map((line, index) => `<div class="code-line ${index === activeLine ? 'active' : ''}" data-code-index="${index}"><span class="line-no">${line[0]}</span><span>${line[1]}</span></div>`).join('');
}

function setLabFile(key) {
  const detail = labFiles[key] || labFiles.page;
  scopeAll(sourceFour, '[data-lab-file]').forEach((button) => button.classList.toggle('active', button.dataset.labFile === key));
  setScopedText(sourceFour, '#lab-tab', detail.tab);
  setScopedText(sourceFour, '#lab-focus-title', detail.focusTitle);
  setScopedText(sourceFour, '#lab-focus-copy', detail.focusCopy);
  scopeAll(sourceFour, '#lab-code').forEach((target) => renderCode(target, detail.lines, detail.activeLine));
  const preview = scopeQuery(sourceFour, '#lab-preview');
  preview?.classList.remove('focus');
  requestAnimationFrame(() => preview?.classList.add('focus'));
}

function applyLabChange(change) {
  const preview = scopeQuery(sourceFour, '#lab-preview');
  if (!preview) return;
  preview.dataset.change = change;
  if (change === 'title') setScopedText(sourceFour, '#preview-title', '집중이 잘 되는 공간');
  if (change === 'color') scopeAll(sourceFour, '#preview-button').forEach((button) => button.classList.toggle('is-updated', true));
  if (change === 'space') scopeAll(sourceFour, '#preview-hero').forEach((hero) => hero.classList.toggle('is-spacious', true));
  preview.classList.remove('focus');
  requestAnimationFrame(() => preview.classList.add('focus'));
}

function setDiffFile(key) {
  const detail = diffFiles[key] || diffFiles.button;
  scopeAll(sourceFour, '[data-diff-file]').forEach((button) => button.classList.toggle('active', button.dataset.diffFile === key));
  setScopedText(sourceFour, '#diff-tab', detail.tab);
  setScopedText(sourceFour, '#diff-review-title', detail.title);
  setScopedText(sourceFour, '#diff-review-copy', detail.copy);
  scopeAll(sourceFour, '#diff-code').forEach((target) => {
    target.innerHTML = detail.lines.map(([line, sign, code]) => `<div class="diff-line ${sign === '+' ? 'add' : sign === '-' ? 'remove' : ''}"><span class="line-no">${line}</span><span class="sign">${sign}</span><span>${code}</span></div>`).join('');
  });
}

function setRoot(key) {
  const detail = rootDetails[key] || rootDetails.root;
  scopeAll(sourceFour, '[data-root-key]').forEach((row) => row.classList.toggle('active', row.dataset.rootKey === key));
  setScopedText(sourceFour, '#root-symbol', detail[0]);
  setScopedText(sourceFour, '#root-name', detail[1]);
  setScopedText(sourceFour, '#root-copy', detail[2]);
}

function setSourceZone(key) {
  const detail = sourceZones[key] || sourceZones.page;
  scopeAll(sourceFour, '[data-source-zone]').forEach((button) => button.classList.toggle('active', button.dataset.sourceZone === key));
  setScopedText(sourceFour, '#source-zone-path', detail[0]);
  setScopedText(sourceFour, '#source-zone-role', detail[1]);
  setScopedText(sourceFour, '#source-zone-title', detail[2]);
  setScopedText(sourceFour, '#source-zone-copy', detail[3]);
  setScopedText(sourceFour, '#source-zone-question', detail[4]);
  const detailNode = scopeQuery(sourceFour, '#source-detail');
  if (detailNode) {
    detailNode.dataset.zone = key;
    detailNode.classList.remove('focus');
    requestAnimationFrame(() => detailNode.classList.add('focus'));
  }
}

function setWorkflowStep(index) {
  const safeIndex = Math.max(0, Math.min(workflowSteps.length - 1, Number(index) || 0));
  const detail = workflowSteps[safeIndex];
  scopeAll(sourceFour, '[data-step]').forEach((button) => button.classList.toggle('active', Number(button.dataset.step) === safeIndex));
  setScopedText(sourceFour, '#workflow-label', detail[0]);
  setScopedText(sourceFour, '#workflow-title', detail[1]);
  setScopedText(sourceFour, '#workflow-copy', detail[2]);
  const visual = scopeQuery(sourceFour, '#workflow-visual');
  if (visual) {
    visual.dataset.step = String(safeIndex);
    visual.classList.remove('focus');
    requestAnimationFrame(() => visual.classList.add('focus'));
  }
}

const gitCommands = {
  status: ['WORKING TREE', '$ git status', 'On branch main\nChanges not staged for commit:\n  modified: src/components/ApplyButton.jsx', '바뀐 파일을 먼저 확인합니다', '아직 기록도 공유도 되지 않은 내 PC의 변경입니다.', '확인 위치 · VS Code Source Control / Changes', 'Changes', '아직 GitHub에는 없습니다. 내 컴퓨터 안의 변경입니다.', 'src/components/ApplyButton.jsx', 'GitHub에서 확인하려면 마지막에 push가 필요합니다.', 'code'],
  add: ['STAGED', '$ git add .', 'Changes to be committed:\n  modified: src/components/ApplyButton.jsx\n  modified: src/components/ApplyButton.css', '이번 기록에 넣을 파일을 고릅니다', 'commit으로 남길 변경 대상을 올려두는 단계입니다.', '확인 위치 · VS Code Source Control / Staged Changes', 'Staged Changes', 'commit을 만들 준비가 된 파일입니다. 아직 GitHub에는 전송되지 않았습니다.', '2 files staged for commit', '다음은 변경 이유를 적은 commit을 만드는 단계입니다.', 'code'],
  commit: ['LOCAL COMMIT', '$ git commit -m "수강 신청 버튼 수정"', '[main a8f21c3] 수강 신청 버튼 수정\n 2 files changed, 14 insertions(+), 4 deletions(-)', '되돌아올 수 있는 저장 지점을 만듭니다', 'commit은 변경 이유가 붙은 저장 지점입니다. 아직 내 PC에만 있습니다.', '확인 위치 · GitHub Commits 탭', 'a8f21c3 · 수강 신청 버튼 수정', 'push가 끝나면 GitHub의 Commits 탭에서 이 기록을 확인합니다.', 'a8f21c3  수강 신청 버튼 수정', 'commit은 저장 지점, push는 GitHub로 보내는 단계입니다.', 'commits'],
  push: ['GITHUB SYNCED', '$ git push origin main', 'Writing objects: 100% (8/8)\nTo github.com:vibe-team/class-project.git\n   7a0e117..a8f21c3  main -> main', 'GitHub의 공통 기록에 도착했습니다', '팀원과 배포 서비스가 같은 commit을 기준으로 확인할 수 있습니다.', '확인 위치 · GitHub Commits / main', 'a8f21c3 is now on main', '검증한 버전에만 release 이름을 붙여 공개 기준점으로 씁니다.', 'a8f21c3  main  GitHub synced', 'GitHub에서 commit을 확인한 뒤 검증된 버전에만 release를 붙입니다.', 'commits'],
};

const githubOps = [
  ['작업 전', '변경 사항 확인', '먼저 어떤 파일이 바뀌었는지 확인합니다.', 'ApplyButton.jsx', 'main', '변경 전', '수강 신청 버튼의 색상을 수정했습니다.'],
  ['COMMIT CREATED', 'commit으로 저장 지점 만들기', '바뀐 이유를 적은 commit을 만들어 나중에 돌아올 기준을 남깁니다.', 'a8f21c3', 'main', 'commit', '수강 신청 버튼 수정 · 2 files changed'],
  ['RELEASE CANDIDATE', 'release 후보를 검증합니다', '모든 commit을 바로 공개하지 않고, 확인한 commit만 release 기준점으로 표시합니다.', 'v1.0.0', 'release', 'release', 'a8f21c3 → v1.0.0 → Production'],
  ['PRODUCTION', '공개 URL로 배포합니다', '검증한 release가 Production에 연결됩니다. 문제가 생기면 이전 release로 되돌릴 수 있습니다.', 'class-project.vercel.app', 'production', 'deploy', 'Deployment ready · rollback point available'],
];

const devtoolsSteps = [
  ['F12로 개발자도구 열기', '웹사이트를 쓰는 사람도 F12를 눌러 브라우저가 주고받는 요청을 확인할 수 있습니다.', '요청을 선택하면 전송 내용이 보입니다.', 'Network', '200 OK'],
  ['Network에서 요청 선택', '결제하기를 누르면 /api/checkout 같은 요청이 Network 목록에 남습니다.', 'POST /api/checkout · status 200', 'Request', '200 OK'],
  ['요청 헤더 확인', '브라우저 코드에 넣은 값은 요청과 함께 보이거나, 번들 파일에서 발견될 수 있습니다.', 'Authorization: sk_live_••••', 'Authorization', '200 OK'],
  ['노출되었다면 폐기하고 교체', '파일만 지우는 것으로 끝나지 않습니다. 키를 폐기하고 새 키를 발급해야 합니다.', '키 폐기 완료 · 새 값은 서버 환경변수에서만 사용', 'Recovery', '401 REVOKED'],
];

function renderGitCommand(mode) {
  const state = gitCommands[mode] || gitCommands.status;
  const root = scopeQuery(sourceFive, '.git-command-workbench');
  if (!root) return;
  root.dataset.gitCommand = mode;
  const [status, command, output, title, copy, location, pageTitle, pageCopy, record, footer, tab] = state;
  setScopedText(sourceFive, '#git-command-status', status);
  setScopedText(sourceFive, '#git-command-line', command);
  setScopedText(sourceFive, '#git-command-output', output);
  setScopedText(sourceFive, '#git-command-title', title);
  setScopedText(sourceFive, '#git-command-copy', copy);
  setScopedText(sourceFive, '#git-page-location', location);
  setScopedText(sourceFive, '#git-page-title', pageTitle);
  setScopedText(sourceFive, '#git-page-copy', pageCopy);
  setScopedText(sourceFive, '#git-page-footer', footer);
  scopeAll(sourceFive, '#git-page-record').forEach((node) => { node.innerHTML = `<i></i><span>${record}</span><em>${status}</em>`; });
  ['code', 'commits', 'releases'].forEach((item) => scopeAll(sourceFive, `#git-page-${item}`).forEach((node) => node.classList.toggle('active', item === tab)));
  scopeAll(sourceFive, '[data-git-command]').forEach((button) => button.classList.toggle('active', button.dataset.gitCommand === mode));
}

function renderGithubOperation(index) {
  const safeIndex = Math.max(0, Math.min(githubOps.length - 1, index));
  const [status, title, copy, file, branch, diffLabel, diffCopy] = githubOps[safeIndex];
  const root = scopeQuery(sourceFive, '.github-operations');
  if (!root) return;
  root.dataset.githubState = String(safeIndex);
  setScopedText(sourceFive, '#github-operation-status', status);
  setScopedText(sourceFive, '#github-operation-title', title);
  setScopedText(sourceFive, '#github-operation-copy', copy);
  setScopedText(sourceFive, '#github-operation-file', file);
  setScopedText(sourceFive, '#github-operation-branch', branch);
  scopeAll(sourceFive, '#github-operation-diff').forEach((node) => { node.innerHTML = `<span>${diffLabel}</span><b>${diffCopy}</b>`; });
}

function renderDevtools(index) {
  const safeIndex = Math.max(0, Math.min(devtoolsSteps.length - 1, index));
  const [title, copy, detail, label, status] = devtoolsSteps[safeIndex];
  const root = scopeQuery(sourceFive, '.devtools-documentary');
  if (!root) return;
  root.dataset.devtoolsState = String(safeIndex);
  setScopedText(sourceFive, '#devtools-step', `STEP ${safeIndex + 1} / ${devtoolsSteps.length}`);
  setScopedText(sourceFive, '#devtools-title', title);
  setScopedText(sourceFive, '#devtools-copy', copy);
  setScopedText(sourceFive, '#request-detail', detail);
  setScopedText(sourceFive, '#devtools-status', status);
  setScopedText(sourceFive, '#devtools-user-state', safeIndex === 0 ? '비회원' : '결제 요청 확인');
  scopeAll(sourceFive, '#devtools-header-line').forEach((node) => { node.innerHTML = `<b>${label}</b> ${detail}`; });
  scopeAll(sourceFive, '#secret-source-line').forEach((node) => {
    node.classList.toggle('visible', safeIndex >= 2);
    node.innerHTML = safeIndex === 3
      ? '<small>복구 후 브라우저 코드</small><code>const paymentSecret = process.env.PAYMENT_SECRET;</code><span>실제 값은 서버 환경변수에만 남깁니다.</span>'
      : '<small>공개된 app.js 안의 위험한 코드 예시</small><code>const paymentSecret = "sk_live_51ExampleOnly";</code><span>브라우저에 내려온 코드라면 누구나 볼 수 있습니다.</span>';
  });
  scopeAll(sourceFive, '#leak-warning').forEach((node) => {
    node.classList.toggle('recovered', safeIndex === 3);
    node.innerHTML = safeIndex === 3
      ? '<b>키 폐기 및 서버 환경변수 이동 완료</b><span>기존 키는 더 이상 쓰지 않고, 새 값은 서버 환경변수에서만 읽습니다.</span>'
      : '<b>비밀값이 브라우저에 노출되었습니다</b><span>파일을 지우는 것으로 끝나지 않습니다. 해당 키를 폐기하고 새 키를 발급해야 합니다.</span>';
  });
}

function renderEnv(index) {
  const copies = ['실제 값은 배포 서비스 설정에서 별도로 입력합니다.', '.gitignore가 실제 값이 GitHub 기록에 들어가지 않게 막습니다.', '배포 환경은 필요한 값을 암호화된 설정으로 받아 실행합니다.'];
  const root = scopeQuery(sourceFive, '.environment-documentary');
  if (!root) return;
  root.dataset.envState = String(index);
  setScopedText(sourceFive, '#env-caption', copies[index]);
}

function renderRole(role) {
  const roles = {
    guest: ['공개 안내만 읽을 수 있습니다', '비회원은 모두가 봐도 되는 정보만 볼 수 있습니다.', ['public'], 'DENIED', 'GET /orders/0314'],
    member: ['내 주문 내역까지 읽을 수 있습니다', '회원은 본인 소유의 데이터만 읽을 수 있습니다.', ['public', 'order'], 'ALLOWED', 'GET /orders/0314'],
    admin: ['운영 데이터와 재고까지 관리할 수 있습니다', '관리자는 확인된 운영 권한으로만 데이터를 수정합니다.', ['public', 'order', 'stock'], 'ALLOWED', 'PATCH /classes/stock'],
  };
  const state = roles[role] || roles.guest;
  scopeAll(sourceFive, '[data-role]').forEach((button) => button.classList.toggle('active', button.dataset.role === role));
  scopeAll(sourceFive, '[data-permission]').forEach((row) => row.classList.toggle('allowed', state[2].includes(row.dataset.permission)));
  setScopedText(sourceFive, '#permission-result', state[0]);
  setScopedText(sourceFive, '#rules-caption', state[1]);
  scopeAll(sourceFive, '#firestore-trace-state').forEach((node) => { node.innerHTML = `<i></i><b>${role.toUpperCase()}</b><span>${state[4]}</span><em>${state[3]}</em>`; });
}

function renderPlatform(mode) {
  const platforms = {
    vercel: ['Vercel', 'GitHub의 push가 웹 배포로 이어지는 작업대', 'Vercel은 repository를 build해 웹 화면과 공개 URL을 서비스합니다.', ['GitHub', 'Vercel', 'URL']],
    firebase: ['Firebase', '로그인과 데이터 규칙을 연결하는 앱 플랫폼', 'Firebase는 Authentication, Firestore, Storage처럼 서비스 뒤쪽의 기능을 연결합니다.', ['App', 'Firebase', 'Auth / DB']],
  };
  const state = platforms[mode] || platforms.vercel;
  const root = scopeQuery(sourceFive, '.platform-console');
  if (!root) return;
  root.dataset.platformMode = mode;
  scopeAll(sourceFive, '[data-platform]').forEach((button) => button.classList.toggle('active', button.dataset.platform === mode));
  setScopedText(sourceFive, '#platform-label', state[0]);
  setScopedText(sourceFive, '#platform-title', state[1]);
  setScopedText(sourceFive, '#platform-copy', state[2]);
  scopeAll(sourceFive, '#platform-route').forEach((node) => { node.innerHTML = `<span>${state[3][0]}</span><i></i><span>${state[3][1]}</span><i></i><span>${state[3][2]}</span>`; });
}

function bindSourceFour() {
  if (!document.querySelector(sourceFour)) return;
  setLabFile('page');
  setDiffFile('button');
  setRoot('root');
  setSourceZone('page');
  setWorkflowStep(0);
  document.addEventListener('click', (event) => {
    const button = event.target.closest(`${sourceFour} button, ${sourceFour} [data-root-key]`);
    if (!button) return;
    if (button.dataset.labFile) setLabFile(button.dataset.labFile);
    if (button.dataset.diffFile) setDiffFile(button.dataset.diffFile);
    if (button.dataset.rootKey) setRoot(button.dataset.rootKey);
    if (button.dataset.sourceZone) setSourceZone(button.dataset.sourceZone);
    if (button.dataset.step !== undefined) setWorkflowStep(button.dataset.step);
    if (button.dataset.change) applyLabChange(button.dataset.change);
  });
}

function bindSourceFive() {
  if (!document.querySelector(sourceFive)) return;
  let githubIndex = 0;
  let devtoolsIndex = 0;
  let envIndex = 0;
  renderGitCommand('status');
  renderGithubOperation(githubIndex);
  renderDevtools(devtoolsIndex);
  renderEnv(envIndex);
  renderRole('guest');
  renderPlatform('vercel');
  document.addEventListener('click', (event) => {
    const button = event.target.closest(`${sourceFive} button`);
    if (!button) return;
    if (button.dataset.gitCommand) renderGitCommand(button.dataset.gitCommand);
    if (button.id === 'local-live-next') {
      scopeAll(sourceFive, '.local-live-scene').forEach((scene) => scene.classList.add('is-live'));
      setScopedText(sourceFive, '#local-live-copy', '공개 URL을 통해 외부 사용자의 접속이 허용되었습니다.');
    }
    if (button.id === 'local-live-reset') {
      scopeAll(sourceFive, '.local-live-scene').forEach((scene) => scene.classList.remove('is-live'));
      setScopedText(sourceFive, '#local-live-copy', '지금은 내 노트북 안에서만 열립니다.');
    }
    if (button.id === 'git-record-next' || button.id === 'github-operation-next') {
      githubIndex = Math.min(githubOps.length - 1, githubIndex + 1);
      renderGithubOperation(githubIndex);
      if (button.id === 'git-record-next') {
        const lines = ['$ git status', '$ git commit -m "수강 신청 버튼 수정"', '$ git push origin main'];
        scopeAll(sourceFive, '#record-lines').forEach((node) => { node.innerHTML = `<p class="command">${lines[Math.min(githubIndex, lines.length - 1)]}</p><p class="success">${githubOps[githubIndex][0]}</p>`; });
        setScopedText(sourceFive, '#record-status', githubOps[githubIndex][2]);
      }
    }
    if (button.id === 'git-record-reset' || button.id === 'github-operation-reset') {
      githubIndex = 0;
      renderGithubOperation(githubIndex);
      scopeAll(sourceFive, '#record-lines').forEach((node) => { node.innerHTML = '<p>수강 신청 버튼의 색상을 수정했습니다.</p>'; });
      scopeAll(sourceFive, '#record-status').forEach((node) => { node.innerHTML = '<b>기록 전</b><span>먼저 현재 변경을 확인합니다.</span>'; });
    }
    if (button.id === 'devtools-next') {
      devtoolsIndex = Math.min(devtoolsSteps.length - 1, devtoolsIndex + 1);
      renderDevtools(devtoolsIndex);
    }
    if (button.id === 'devtools-reset') {
      devtoolsIndex = 0;
      renderDevtools(devtoolsIndex);
    }
    if (button.id === 'devtools-pay-button') {
      devtoolsIndex = Math.max(devtoolsIndex, 1);
      renderDevtools(devtoolsIndex);
    }
    if (button.id === 'env-next') {
      envIndex = Math.min(2, envIndex + 1);
      renderEnv(envIndex);
    }
    if (button.id === 'env-reset') {
      envIndex = 0;
      renderEnv(envIndex);
    }
    if (button.dataset.role) renderRole(button.dataset.role);
    if (button.dataset.platform) renderPlatform(button.dataset.platform);
  });
}

whenReady(() => {
  bindSourceFour();
  bindSourceFive();
});
