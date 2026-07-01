import './interactive-education.js';
import './onepass-week1-sources-runtime.js';

const scope = '.src-s3';
const query = (selector) => document.querySelector(`${scope} ${selector}`);
const queryAll = (selector) => [...document.querySelectorAll(`${scope} ${selector}`)];
const setText = (selector, value) => {
  const node = query(selector);
  if (node) node.textContent = value;
};

const buildingStages = [
  ['IDEA', '생각은 있지만 아직 아무것도 없습니다', '버튼도, 파일도, 데이터도 없습니다. AI에게 바로 “앱을 만들어줘”라고 하면 빈 땅에 기준 없이 건물을 올리는 것과 같습니다.', '빈 땅', '아이디어', 'SITE CAMERA · LAND', 'SITE'],
  ['PLANNING', 'AI와 함께 서비스의 설계도를 그립니다', '누가 쓰는지, 어떤 화면과 기능이 필요한지 정리합니다. 설계 AI에게 생각을 프롬프트와 작업 순서로 바꾸게 합니다.', '건축 설계도', '기획 · 프롬프트', 'SITE CAMERA · BLUEPRINT', 'PLAN'],
  ['STRUCTURE', '파일과 폴더가 서비스의 뼈대를 만듭니다', 'AI IDE가 프로젝트를 만들고 페이지, 컴포넌트, 스타일, 설정 파일을 세웁니다. 아직 사용자는 살 수 없는 골조 상태입니다.', '철골 구조', '프로젝트 · 파일 구조', 'SITE CAMERA · FRAME', 'FRAME'],
  ['EXTERIOR', '가장 먼저 눈에 보이는 화면이 완성됩니다', '버튼, 카드, 메뉴, 색상, 애니메이션이 붙습니다. 바이브코딩 입문자가 가장 즐거워하는 구간이지만 아직 내부 기능은 확인하지 않았습니다.', '건물 외관', 'UI · 프론트엔드', 'SITE CAMERA · FACADE', 'FACADE'],
  ['INSPECTION', '카메라가 들어가 보니 내부가 비어 있습니다', '배선, 수도, 조명, 방 구조가 없습니다. 앱도 로그인, 저장, 데이터, 오류 처리가 없으면 겉은 예뻐도 실제로 사용할 수 없습니다.', '비어 있는 내부', '기능이 연결되지 않은 앱', 'INTERIOR CAMERA · EMPTY', 'INTERIOR'],
  ['SYSTEMS', '조명과 수도, 방과 업무공간이 채워집니다', '건물에는 설비와 인테리어가 들어오고, 바이브코딩에서는 로그인, DB, API, 상태 같은 기능을 연결합니다.', '조명 · 배관 · 공간 · 인테리어', '로그인 · DB · API · 상태', 'INTERIOR CAMERA · FIT-OUT', 'FIT-OUT'],
  ['COMPLETION', '모든 공정을 마치고 정식으로 준공합니다', '외관과 내부가 모두 완성되고 사람이 실제로 사용할 수 있습니다. 서비스도 화면과 기능을 점검한 뒤 배포하면 운영 가능한 결과물이 됩니다.', '준공 · 입주 시작', '테스트 · 배포 · 운영', 'DRONE CAMERA · GRAND OPEN', 'COMPLETE'],
];

const termCopy = {
  frontend: ['FRONTEND', '손님이 보고 주문하는 카운터', '버튼, 메뉴, 카드, 입력창, 애니메이션처럼 화면에 보이는 모든 영역입니다.', '주문 카운터', '프론트엔드'],
  backend: ['BACKEND', '주문을 규칙에 따라 처리하는 주방', '로그인 여부, 재고, 결제, 저장 규칙처럼 화면 뒤에서 판단하고 실행하는 영역입니다.', '주방', '백엔드'],
  database: ['DATABASE', '돈과 기록을 보관하는 금고', '회원, 게시글, 상품, 주문처럼 나중에 다시 불러올 정보를 보관하는 영역입니다.', '금고 · 기록실', '데이터베이스'],
  api: ['API', '외부 거래처와 이어지는 납품 통로', '내 화면과 서버, AI, 결제, 지도 같은 외부 서비스를 요청과 응답으로 이어줍니다.', '납품 통로', 'API'],
};

const orderSteps = [
  ['READY', '브라우저에서 주문을 기다리는 중', '상품 · 수량 · 금액', '주문 대기'],
  ['REQUEST', '상품, 수량, 금액을 주문 요청으로 접수합니다', '상품 1개 · 39,000원', '주문 요청 생성'],
  ['AUTH', '로그인한 사용자인지 권한을 확인합니다', '사용자 ID', '로그인 확인'],
  ['INVENTORY', '상품 재고 12개 중 1개를 확보합니다', '상품 ID · 수량 1개', '재고 1개 확보'],
  ['PAYMENT', '39,000원 결제 승인을 요청합니다', '결제수단 · 39,000원', '결제 승인'],
  ['DATABASE', '주문 번호와 구매 내역을 저장합니다', '주문자 · 상품 · 결제', '주문 #2406 저장'],
  ['RESPONSE', '완료 응답이 브라우저로 돌아갑니다', '처리 결과', '200 OK 응답'],
  ['200 OK', '주문 완료 화면으로 갱신되었습니다', '200 OK', '주문 완료 화면'],
];

const dbFlows = {
  signup: ['회원 기록', '김바이브 · vibe@example.com', '회원정보 창고에 새 기록을 보관합니다', '저장', '회원가입 정보를 전송합니다', '회원정보 창고에 새 기록이 만들어집니다.', 'CREATE', '새 회원 기록 생성'],
  login: ['회원 찾기', 'vibe@example.com 회원이 있나요?', '회원정보 창고에서 같은 기록을 찾아 비교합니다', '조회', '입력한 정보와 회원 기록을 비교합니다', '같은 이메일과 비밀번호 기록을 찾아 로그인합니다.', 'READ', '기존 회원 기록 조회'],
  post: ['게시글 기록', '첫 프로젝트 · 김바이브', '게시글 창고에 새 글을 보관합니다', '저장', '게시글 제목과 내용을 전송합니다', '게시글 창고에 작성자와 함께 새 기록을 남깁니다.', 'CREATE', '새 게시글 기록 생성'],
  order: ['주문 기록', '램프 1개 · 주문 #2406', '상품 재고를 11개로 바꾸고 주문내역을 보관합니다', '수정 + 저장', '결제된 주문 정보를 전송합니다', '상품 재고를 줄이고 주문내역 창고에 새 기록을 남깁니다.', 'UPDATE + CREATE', '재고 수정 후 주문 생성'],
};

const apiSteps = [
  ['연결 준비', '내 화면은 외부 서비스의 답을 기다리고 있습니다.', '--°', '날씨 정보를 기다리는 중', '외출 전에 현재 날씨를 확인합니다.'],
  ['요청을 만들었습니다', '내 서비스가 “서울 날씨”라는 요청을 API 창구로 보냅니다.', '...', '요청을 보내는 중', '화면에서 필요한 정보를 부탁합니다.'],
  ['API 약속을 확인합니다', '요청 주소와 필요한 값이 약속에 맞는지 확인합니다.', '...', '요청 형식을 확인하는 중', 'API는 서로 이해할 수 있는 요청 형식을 사용합니다.'],
  ['외부 서비스가 처리합니다', '기상 정보 제공처가 서울의 현재 데이터를 찾습니다.', '...', '외부 서비스 처리 중', '내 서비스 밖의 시스템이 요청을 처리합니다.'],
  ['응답이 화면에 도착했습니다', '24도와 맑음이라는 답이 내 서비스 화면에 표시됩니다.', '24°', '맑음 · 산책하기 좋은 날', 'API로 받은 답이 내 화면의 정보가 되었습니다.'],
];

let buildingToken = 0;
let currentOrderStep = 0;
let currentApiStep = 0;

function setBuildingStage(stage) {
  const index = Math.max(0, Math.min(buildingStages.length - 1, Number(stage) || 0));
  const [label, title, description, real, code, camera, kind] = buildingStages[index];
  const lab = query('#building-lab');
  if (!lab) return;
  lab.dataset.stage = String(index);
  queryAll('[data-building-stage]').forEach((button) => button.classList.toggle('active', Number(button.dataset.buildingStage) === index));
  setText('#building-label', label);
  setText('#building-title', title);
  setText('#building-description', description);
  setText('#building-real', real);
  setText('#building-code', code);
  setText('#camera-status-text', camera);
  setText('#build-scene-number', String(index + 1).padStart(2, '0'));
  setText('#build-scene-kind', kind);
  const meter = query('#building-meter');
  if (meter) meter.style.width = `${((index + 1) / buildingStages.length) * 100}%`;
}

async function playBuilding() {
  const token = ++buildingToken;
  for (let stage = 0; stage < buildingStages.length; stage += 1) {
    if (token !== buildingToken) return;
    setBuildingStage(stage);
    await new Promise((resolve) => window.setTimeout(resolve, stage === 4 ? 2300 : 1650));
  }
}

function setTerm(term) {
  const copy = termCopy[term] || termCopy.frontend;
  const building = query('#term-building');
  if (!building) return;
  building.dataset.term = term;
  queryAll('[data-term]').forEach((button) => button.classList.toggle('active', button.dataset.term === term));
  ['#term-en', '#term-title', '#term-description', '#term-place', '#term-word'].forEach((selector, index) => setText(selector, copy[index]));
}

function setOrderStep(step) {
  const index = Math.max(0, Math.min(orderSteps.length - 1, Number(step) || 0));
  const journey = query('#order-journey');
  if (!journey) return;
  currentOrderStep = index;
  journey.classList.remove('running');
  journey.dataset.step = String(index);
  void journey.offsetWidth;
  if (index > 0) journey.classList.add('running');
  const [label, message, input, output] = orderSteps[index];
  setText('#journey-status-label', label);
  setText('#journey-status', message);
  setText('#journey-input', input);
  setText('#journey-output', output);
  queryAll('[data-order-step]').forEach((button) => {
    const buttonStep = Number(button.dataset.orderStep);
    button.classList.toggle('active', buttonStep === index);
    button.classList.toggle('complete', buttonStep < index);
  });
}

function setDbFlow(flow) {
  const copy = dbFlows[flow] || dbFlows.signup;
  const scene = query('#warehouse-scene');
  const preview = query('#db-browser-preview');
  if (!scene || !preview) return;
  scene.dataset.flow = '';
  preview.dataset.flow = '';
  void scene.offsetWidth;
  scene.dataset.flow = flow;
  preview.dataset.flow = flow;
  ['#record-envelope-title', '#record-envelope-copy', '#warehouse-task', '#record-result-word', '#db-feedback-title', '#db-feedback-copy', '#db-operation-code', '#db-operation-copy'].forEach((selector, index) => setText(selector, copy[index]));
  setText('#stock-record', flow === 'order' ? '램프 재고 12개 → 11개' : '램프 재고 12개');
  queryAll('[data-db-flow]').forEach((button) => button.classList.toggle('active', button.dataset.dbFlow === flow));
}

function setApiStep(step) {
  const index = Math.max(0, Math.min(apiSteps.length - 1, Number(step) || 0));
  const stage = query('#api-stage');
  if (!stage) return;
  currentApiStep = index;
  stage.classList.remove('running');
  stage.dataset.step = String(index);
  const failed = stage.classList.contains('error-mode') && index >= 3;
  stage.dataset.result = failed ? 'error' : index === 4 ? 'success' : 'ready';
  const copy = apiSteps[index];
  setText('#api-result-title', failed ? '외부 서비스에 연결하지 못했습니다' : copy[0]);
  setText('#api-result-copy', failed ? '연결을 복구한 뒤 같은 단계에서 다시 시도할 수 있습니다.' : copy[1]);
  setText('#weather-temperature', failed ? '--°' : copy[2]);
  setText('#weather-condition', failed ? '정보를 가져오지 못했습니다' : copy[3]);
  setText('#weather-extra', failed ? '연결 상태를 확인한 뒤 다시 시도하세요.' : copy[4]);
  queryAll('[data-api-step]').forEach((button) => {
    const buttonStep = Number(button.dataset.apiStep);
    button.classList.toggle('active', buttonStep === index);
    button.classList.toggle('complete', buttonStep < index);
  });
  void stage.offsetWidth;
  if (index > 0) stage.classList.add('running');
}

function setUxScenario(scenario) {
  const race = query('#ux-race');
  if (!race) return;
  race.dataset.scenario = scenario;
  race.classList.remove('running', 'inspect-bad', 'inspect-good');
  queryAll('[data-ux-scenario]').forEach((button) => button.classList.toggle('active', button.dataset.uxScenario === scenario));
  const messages = {
    checkout: ['방향을 잃는 결제', '한눈에 읽히는 결제', '결제 완료'],
    signup: ['한 화면에 쏟아지는 가입', '필요한 것부터 묻는 가입', '회원가입 완료'],
    search: ['막다른 검색 결과', '다음 선택을 주는 검색', '원하는 정보 찾기'],
    recovery: ['원인을 숨기는 오류', '되돌아올 길을 주는 오류', '작성 내용 복구'],
  };
  const [bad, good, goal] = messages[scenario] || messages.checkout;
  setText('#bad-title', bad);
  setText('#good-title', good);
  setText('#ux-goal', goal);
  const views = {
    checkout: [
      '<div class="ux-mock-head"><strong>주문서</strong><span>단계 표시 없음</span></div><div class="ux-chip-row"><button>쿠폰</button><button>주소</button><button>결제수단</button></div><div class="ux-field-stack"><i></i><i></i></div><div class="ux-action-row"><button>확인</button><button>다음</button></div><div class="ux-late-note"><span>배송비가 마지막에 추가됨</span><b>31,000원</b></div>',
      '<div class="ux-mock-head"><strong>결제</strong><span>3 / 3</span></div><div class="ux-stepper"><i></i><i></i><i></i><span>장바구니</span><span>배송</span><span>결제</span></div><div class="ux-summary-row"><span>워크북</span><b>28,000원</b><span>배송비</span><b>3,000원</b></div><div class="ux-total"><span>최종 결제금액</span><strong>31,000원</strong></div><button class="ux-primary">31,000원 결제하기</button><small class="ux-help">결제 후 주문 완료 화면으로 이동합니다</small>',
    ],
    signup: [
      '<div class="ux-mock-head"><strong>회원가입</strong><span>필수 항목 *</span></div><div class="ux-form-grid"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p class="ux-muted">약관 6개에 모두 동의해야 합니다</p><button class="ux-disabled">가입</button>',
      '<div class="ux-mock-head"><strong>계정 만들기</strong><span>1 / 3</span></div><div class="ux-step-line"><i></i></div><label class="ux-labelled-field"><span>이메일</span><b>수업 안내를 받을 주소</b></label><label class="ux-labelled-field"><span>비밀번호</span><b>8자 이상 입력</b></label><button class="ux-primary">다음 단계</button><small class="ux-help">다음에는 이름과 이용약관을 확인합니다</small>',
    ],
    search: [
      '<div class="ux-search-box"><span>워크스페이스 렘프</span><button>검색</button></div><div class="ux-empty-result"><b>검색 결과가 없습니다</b><span>다른 검색어를 입력하세요</span></div>',
      '<div class="ux-search-box"><span>워크스페이스 램프</span><button>검색</button></div><p class="ux-suggestion">‘렘프’ 대신 ‘램프’ 결과를 보여드립니다</p><div class="ux-filter-row"><button>조명</button><button>10만원대</button><button>재고 있음</button></div><div class="ux-result-item"><i></i><span><b>워크스페이스 램프</b><small>오늘 출고 · 129,000원</small></span></div>',
    ],
    recovery: [
      '<div class="ux-error-box"><b>오류가 발생했습니다</b><span>다시 시도해 주세요</span></div><div class="ux-field-stack"><i></i><i></i><i></i></div><button class="ux-disabled">확인</button>',
      '<div class="ux-mock-head"><strong>프로젝트 저장</strong><span>자동 저장됨</span></div><div class="ux-preserved-copy"><b>작성한 내용은 그대로 보관했습니다</b><span>이미지 용량이 10MB를 초과했습니다</span></div><div class="ux-recovery-actions"><button>이미지 바꾸기</button><button class="ux-primary">다시 저장</button></div><small class="ux-help">허용 용량: 이미지 한 장당 10MB 이하</small>',
    ],
  };
  const [badMarkup, goodMarkup] = views[scenario] || views.checkout;
  const badPanel = query('#bad-scenario-content');
  const goodPanel = query('#good-scenario-content');
  if (badPanel) badPanel.innerHTML = badMarkup;
  if (goodPanel) goodPanel.innerHTML = goodMarkup;
}

function setAnimation(kind) {
  const preview = query('#animation-preview');
  if (!preview) return;
  const captions = {
    menu: ['메뉴 전환', '화면의 출발 위치를 보여줍니다', '메뉴가 어디에서 열리고 어떤 화면으로 이어지는지 알려줍니다.'],
    loading: ['로딩 전환', '기다리는 이유를 알려줍니다', '처리 중이라는 신호가 있으면 사용자는 같은 행동을 반복하지 않습니다.'],
    cart: ['장바구니 이동', '내 행동의 결과를 연결합니다', '상품과 장바구니의 관계가 움직임으로 이어집니다.'],
    success: ['완료 전환', '작업이 끝났음을 확신시킵니다', '저장과 결제가 끝난 순간을 분명하게 보여줍니다.'],
    tabs: ['탭 전환', '같은 화면 안의 위치를 보여줍니다', '현재 위치와 바뀐 내용을 자연스럽게 이어줍니다.'],
    validation: ['입력 검증', '문제 위치와 해결법을 안내합니다', '오류가 난 입력칸과 다음 행동을 같이 보여줍니다.'],
    accordion: ['내용 펼치기', '필요할 때만 상세 내용을 노출합니다', '한 화면에 모든 정보를 쌓지 않고 필요한 순간에 꺼냅니다.'],
    page: ['페이지 연결', '목록과 상세의 관계를 유지합니다', '사용자가 이동했어도 앞뒤 맥락을 잃지 않게 합니다.'],
    favorite: ['좋아요 반응', '작은 행동에 저장 확신을 제공합니다', '아이콘과 숫자가 함께 바뀌면 결과를 즉시 이해합니다.'],
    scroll: ['스크롤 위치', '긴 화면에서 현재 지점을 표시합니다', '페이지 안에서 지금 읽는 곳을 계속 알려줍니다.'],
  };
  const copy = captions[kind] || captions.menu;
  preview.classList.remove('playing');
  preview.dataset.demo = kind;
  void preview.offsetWidth;
  preview.classList.add('playing');
  setText('#animation-caption-label', copy[0]);
  setText('#animation-caption-title', copy[1]);
  setText('#animation-caption-copy', copy[2]);
  queryAll('[data-animation-demo]').forEach((button) => button.classList.toggle('active', button.dataset.animationDemo === kind));
}

function initStore() {
  const shell = query('#site-shell');
  if (!shell) return;
  let carts = 0;
  let favorites = 0;
  const setPage = (page) => {
    shell.dataset.page = page;
    shell.classList.remove('menu-open');
    queryAll('[data-site-page]').forEach((button) => button.classList.toggle('active', button.dataset.sitePage === page));
  };
  const setExample = (kind) => {
    const panel = query('#frontend-reference');
    const copy = {
      commerce: ['쇼핑몰', '비교하고 선택하고 구매하는 화면', '검색 · 상품 카드 · 장바구니 · 결제 상태', '사용자가 상품을 찾고 주문 완료까지 막히지 않는가?', '<div class="example-commerce"><label><span>원하는 상품 검색</span><i>⌕</i></label><div><article><i></i><b>조명</b><small>129,000원</small></article><article><i></i><b>스피커</b><small>89,000원</small></article></div><button type="button">장바구니 2</button></div>'],
      community: ['커뮤니티', '글을 읽고 반응하고 대화하는 화면', '게시글 · 작성 버튼 · 댓글 · 좋아요 · 알림', '새 글과 새로운 반응을 쉽게 발견하고 참여할 수 있는가?', '<div class="example-community"><nav><b>새 글</b><span>인기</span><span>팔로잉</span></nav><article><i>김</i><div><b>처음 만든 프로젝트를 공유합니다</b><span>댓글 12 · 좋아요 38</span></div></article><article><i>박</i><div><b>배포 오류를 이렇게 해결했어요</b><span>댓글 7 · 저장 21</span></div></article><button type="button">글 작성</button></div>'],
      booking: ['예약', '날짜와 조건을 고르고 확정하는 화면', '달력 · 시간 선택 · 인원 · 예약 확인', '이미 선택한 조건과 남은 단계를 계속 확인할 수 있는가?', '<div class="example-booking"><div class="mini-calendar"><b>6월</b><span>9</span><span>10</span><span class="on">11</span><span>12</span><span>13</span></div><div class="mini-time"><button>14:00</button><button class="on">15:30</button><button>17:00</button></div><p><span>성인 2명</span><b>6월 11일 · 15:30</b></p><button type="button">예약 확정</button></div>'],
      dashboard: ['관리자 화면', '많은 상태를 비교하고 처리하는 화면', '필터 · 표 · 상태 배지 · 통계 · 일괄 작업', '중요한 변화와 지금 처리할 항목이 먼저 보이는가?', '<div class="example-dashboard"><div class="mini-metrics"><span><small>오늘 주문</small><b>128</b></span><span><small>처리 필요</small><b>7</b></span><span><small>매출</small><b>₩4.2M</b></span></div><div class="mini-table"><b>주문 번호</b><b>상태</b><span>#240611-18</span><i>결제 완료</i><span>#240611-17</span><i class="warn">확인 필요</i></div><button type="button">선택 항목 처리</button></div>'],
    }[kind] || null;
    if (!copy || !panel) return;
    panel.dataset.example = kind;
    shell.dataset.service = kind;
    ['#frontend-example-label', '#frontend-example-title', '#frontend-example-components', '#frontend-example-question'].forEach((selector, index) => setText(selector, copy[index]));
    const ui = query('#frontend-example-ui');
    if (ui) ui.innerHTML = copy[4];
    queryAll('[data-frontend-example]').forEach((button) => button.classList.toggle('active', button.dataset.frontendExample === kind));
  };
  setExample('commerce');
  const reference = query('#frontend-reference');
  reference?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-frontend-example]');
    if (button) setExample(button.dataset.frontendExample);
  });
  shell.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.sitePage) setPage(button.dataset.sitePage);
    if (button.dataset.frontendExample) setExample(button.dataset.frontendExample);
    const action = button.dataset.action;
    if (action === 'toggle-menu') shell.classList.toggle('menu-open');
    if (action === 'open-modal') shell.classList.add('modal-open');
    if (action === 'close-modal') shell.classList.remove('modal-open');
    if (action === 'add-store-cart') {
      carts += 1;
      setText('#store-cart-count', String(carts));
      const toast = query('#store-toast');
      if (toast) {
        toast.classList.remove('visible');
        void toast.offsetWidth;
        toast.classList.add('visible');
      }
    }
    if (action === 'toggle-favorite') {
      favorites = favorites ? 0 : 1;
      setText('#favorite-count', String(favorites));
      setText('#profile-favorite-copy', favorites ? '워크스페이스 램프' : '저장한 상품 없음');
    }
    if (action === 'focus-search') {
      shell.classList.add('searching');
      const label = query('.store-search span');
      if (label) label.textContent = '워크스페이스 램프';
    }
  });
}

function bindSourceThree() {
  if (!document.querySelector(scope)) return;
  setBuildingStage(0);
  setTerm('frontend');
  setUxScenario('checkout');
  setAnimation('menu');
  setOrderStep(0);
  setDbFlow('signup');
  setApiStep(0);
  initStore();

  document.addEventListener('click', (event) => {
    const button = event.target.closest(`${scope} button`);
    if (!button) return;
    if (button.dataset.buildingStage !== undefined) {
      buildingToken += 1;
      setBuildingStage(button.dataset.buildingStage);
    }
    if (button.dataset.term) setTerm(button.dataset.term);
    if (button.dataset.uxScenario) setUxScenario(button.dataset.uxScenario);
    if (button.dataset.animationDemo) setAnimation(button.dataset.animationDemo);
    if (button.dataset.dbFlow) setDbFlow(button.dataset.dbFlow);
    if (button.dataset.apiStep) setApiStep(button.dataset.apiStep);
    if (button.dataset.orderStep) setOrderStep(button.dataset.orderStep);
    if (button.dataset.uxInspect) {
      const race = query('#ux-race');
      if (race) race.classList.toggle(`inspect-${button.dataset.uxInspect}`);
    }
    const action = button.dataset.action;
    if (action === 'play-building') playBuilding();
    if (action === 'run-ux') query('#ux-race')?.classList.add('running');
    if (action === 'run-order-journey') setOrderStep(currentOrderStep >= 7 ? 1 : currentOrderStep + 1);
    if (action === 'reset-order-journey') setOrderStep(0);
    if (action === 'next-api') setApiStep(currentApiStep >= 4 ? 1 : currentApiStep + 1);
    if (action === 'reset-api') setApiStep(0);
    if (action === 'toggle-api-error') {
      const stage = query('#api-stage');
      if (stage) {
        stage.classList.toggle('error-mode');
        button.textContent = stage.classList.contains('error-mode') ? '연결 복구' : '연결 끊기';
        setApiStep(0);
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindSourceThree, { once: true });
} else {
  bindSourceThree();
}
