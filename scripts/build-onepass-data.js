'use strict';

// Generator for the standalone "AI 한방 이해하기 · 4주 집중" (onepass) course.
// Produces scripts/data/onepass-course.data.js (runtime, VIBE_V3_COURSES.onepass)
// and scripts/data/onepass-course.manifest.json (studio manifest entry).
// Same 9-slot slides[] architecture as the advanced course; scenes reuse the
// generic board renderer (registered in scene-registry customRenderers).
// Week 1 is authored to flagship depth; weeks 2-4 are added in a later pass.

const fs = require('fs');
const path = require('path');

const COURSE = {
  id: 'onepass',
  title: 'AI 한방 이해하기 · 4주 집중',
  shortTitle: 'AI 한방',
  code: 'ONE',
  family: '원샷 집중',
  level: 'ALL-IN-ONE',
  color: '#a78bfa',
  visualMode: 'onepass',
  description: '프로젝트 흐름 이해부터 Claude Code·Codex 운용, AI 확장 도구 설계, 오케스트레이션까지 180분 강의형으로 압축한 4주 집중 트랙입니다.',
  route: '프로젝트 흐름 → Claude Code·Codex 운용 → MCP·Skill·SubAgent·Workflow → 오케스트레이션·AI 사무실',
  outcomes: [
    'AI에게 일을 시키고 검증·복구하는 사고법',
    'Claude Code·Codex와 Desktop·IDE·CLI의 작업 표면 선택',
    'MCP·Skill·SubAgent·Workflow의 경계와 운영 설계',
    '오케스트레이션으로 나만의 AI 사무실 운영 기준 수립',
  ],
};

// ── Week definitions (flagship: W1 only for now) ───────────────────────────
const WEEKS = [
  {
    n: 1,
    moduleId: 'W1',
    moduleTitle: 'W1 · WHY IT WORKS',
    core: '원리',
    deck: 'sessions/onepass-week1.html',
    title: '바이브코딩의 원리 — 왜 AI에게 맡겨도 되는가',
    subtitle: '도구 사용법이 아니라, AI에게 일을 시키고 결과를 신뢰·검증·복구하는 사고법',
    sceneId: 'op-01-principles',
    sceneType: 'principle-flow',
    sceneTitle: '바이브코딩 4원칙 플로우',
    objective: '도구 사용법을 외우기 전에, AI에게 무엇을·어디까지 맡기고 결과를 어떻게 검증·복구하는지 판단 기준을 만듭니다.',
    flow: ['진단 15분', '원리 시각화 50분', '검증·복구 시연 30분', '직접 1건 실습 60분', '리뷰 25분'],
    concepts: [
      ['목표와 맥락', 'AI에게 "무엇을, 왜, 어디까지" 만드는지 한 문장으로 먼저 정합니다.'],
      ['권한과 범위', 'AI가 건드릴 파일·작업 범위를 작게 정해 영향 범위를 통제합니다.'],
      ['검증', '결과를 그대로 믿지 않고, 직접 실행해 정상·실패 흐름을 확인합니다.'],
      ['복구', '틀리면 처음부터가 아니라 마지막 정상 상태로 되돌려 작은 원인부터 고칩니다.'],
    ],
    sequence: [
      '만들 것을 한 문장으로 정의',
      'AI에게 맥락과 예시를 제공',
      '작은 범위로 나눠 요청',
      '결과를 직접 실행해 확인',
      '틀린 부분만 다시 요청',
      '완료 기준으로 마무리',
    ],
    demoStages: ['정의', '맥락', '요청', '검증', '복구'],
    compare: {
      bad: [
        'AI 결과를 읽지 않고 바로 신뢰·배포',
        '거대한 기능을 한 번에 통째로 요청',
        '에러가 나면 처음부터 다시 만든다',
      ],
      good: [
        '작은 범위로 나눠 요청',
        '결과를 직접 실행해 검증',
        '마지막 정상 상태로 되돌려 복구',
      ],
    },
    decisions: [
      ['AI가 만든 코드를 읽지 않고 바로 배포한다', '위험', '최소한 직접 실행해 정상 동작과 실패 흐름을 확인해야 합니다.'],
      ['큰 기능을 한 번에 통째로 요청한다', '위험', '작은 범위로 쪼개야 어디서 틀렸는지 보이고 복구가 쉽습니다.'],
      ['완료 기준을 먼저 한 문장으로 정한다', '좋음', '끝이 정해져야 "많이 만들기"가 아니라 "완성"으로 끝납니다.'],
    ],
    error: {
      symptom: 'AI 결과를 검증 없이 신뢰해 배포 후 실제 입력에서 깨짐',
      trace: 'works on prompt, breaks on real input',
      cause: '완료 기준과 검증 없이 결과 화면만 보고 진행함',
      fix: '작은 범위로 다시 요청하고 직접 실행해 정상·실패 흐름을 확인한 뒤 진행',
    },
    practice: '자신의 작은 아이디어 1건을 골라 목표·맥락·범위를 한 문장씩 정하고, AI에게 작은 범위로 요청해 결과를 직접 실행·검증하고 한 번 복구해 봅니다.',
    deliverables: [
      '한 문장 목표와 완료 기준',
      '맥락·예시 메모',
      '직접 실행한 검증 기록',
      '실패 시 복구 한 단계',
    ],
    sources: ['claude-overview', 'claude-quickstart', 'anthropic-eng-agents', 'node-download'],
    professional: {
      level: 'ALL-IN-ONE',
      focus: '이 회차는 도구 사용법이 아니라, AI에게 일을 맡기고 결과를 신뢰·검증·복구하는 사고법을 만든다. 강사는 "결과가 아니라 과정을 검증한다"는 한 문장을 회차 전체에서 반복 강조한다.',
      officialStudy: [
        'Claude Code 개요 — AI에게 작업을 맡길 때의 작업 폴더·권한·diff 개념',
        'Claude Code 빠른 시작 — 작은 범위로 요청하고 결과를 확인하는 첫 흐름',
        'Building effective agents — 결정적 절차와 AI 판단의 경계',
      ],
      visualSimulation: '4원칙(정의·맥락·요청·검증·복구)이 한 단계씩 켜지며, 검증 단계에서 실패가 발생하면 amber로 표시되고 복구 단계에서 마지막 정상으로 되돌아가는 흐름을 보여준다.',
      demoRun: [
        '작은 작업 하나를 한 문장으로 정의해 화면에 띄운다',
        'AI에게 맥락·예시를 주고 작은 범위로 요청한다',
        '결과를 직접 실행해 정상 흐름을 확인한다',
        '의도적으로 실패를 만들고 마지막 정상으로 복구한다',
      ],
      failureDrill: [
        '검증 없이 배포 → 실제 입력에서 깨지는 장면을 재현',
        '큰 요청 한 번 → 어디서 틀렸는지 안 보이는 상황 재현',
        '복구: 작은 범위 재요청 + 직접 실행 검증',
      ],
      exercise: '수강생이 자신의 아이디어를 목표·맥락·범위 3문장으로 적고, 그 중 가장 작은 범위 한 조각만 AI에게 요청해 직접 실행·검증한다.',
      misconceptions: [
        ['AI가 알아서 잘 해준다', '사람이 완료 기준과 검증을 소유해야 안전하게 다음 요청을 할 수 있습니다.'],
        ['많이 한 번에 시켜야 빠르다', '작은 범위로 나눌수록 틀린 곳이 빨리 보이고 복구가 쉽습니다.'],
        ['에러가 나면 실패다', '에러는 관찰 가능한 상태이고, 마지막 정상으로 되돌리면 대부분 전체 재작성이 필요 없습니다.'],
      ],
      expertQuestions: [
        ['코딩을 몰라도 정말 되나요?', '코드를 직접 짜는 대신, 목표·맥락·검증·복구를 사람이 판단하면 됩니다. 이 회차가 그 판단을 훈련합니다.'],
        ['어디까지 AI에게 맡기나요?', '문제 정의·완료 기준·검증·승인은 사람이, 탐색·초안·반복 구현은 AI가 맡습니다.'],
      ],
      studyPath: [
        '결과가 아니라 과정을 검증한다는 원칙을 먼저 내재화',
        '목표·맥락·범위·검증·복구 5요소를 자신의 사례로 1회 적용',
        '작은 범위 요청과 직접 실행 검증을 습관으로',
      ],
      slideUpgrade: [
        '표지 3D 히어로에서 오늘의 한 문장만 예고',
        '4원칙은 한 요소씩 공개하며 시선을 한 지점에 고정',
        '대표 씬은 수동 5버튼으로 검증·복구를 직접 보여줌',
      ],
      motionStoryboard: [
        '정의 → 맥락 → 요청 단계가 순차로 켜짐',
        '검증 단계에서 실패 시 amber 경고',
        '복구 단계에서 마지막 정상 상태로 되돌아가는 모션',
      ],
      realWorldAssets: [
        '작은 작업 1건의 실제 요청·결과 캡처',
        '정상 실행 화면과 실패 화면 캡처',
        '복구 전후 diff 또는 되돌린 커밋',
      ],
      rehearsalChecklist: [
        '5버튼 수동 진행으로 검증·복구를 멈춰가며 설명',
        '"결과가 아니라 과정을 검증한다"를 회차 내 3회 이상 반복',
        '1280x720에서 캡션·코드가 잘리지 않는지 확인',
        '수업 전 공식 문서와 도구 UI 변경 여부 재확인',
      ],
    },
    sceneSteps: [
      { label: 'DEFINE', title: '만들 것을 한 문장으로 정의', detail: '무엇을, 왜, 어디까지 만드는지 목표와 완료 기준을 먼저 적습니다.' },
      { label: 'CONTEXT', title: 'AI에게 맥락·예시 제공', detail: '참고할 화면, 예시, 제약을 함께 줘서 AI가 헤매지 않게 합니다.' },
      { label: 'ASK', title: '작은 범위로 요청', detail: '한 번에 통째로가 아니라, 확인 가능한 작은 조각으로 나눠 요청합니다.' },
      { label: 'VERIFY', title: '결과를 직접 실행해 검증', detail: '결과 화면만 믿지 않고 정상 흐름과 실패 흐름을 직접 실행해 봅니다.' },
      { label: 'RECOVER', title: '틀리면 마지막 정상으로 복구', detail: '처음부터 다시가 아니라, 직전 정상 상태와 비교해 작은 원인부터 고칩니다.' },
    ],
    sceneFlows: {
      normalFlow: ['정의', '맥락', '작은 범위 요청', '직접 실행 검증', '완료 기준 마무리'],
      failureFlow: ['검증 생략', '실제 입력에서 깨짐', '원인 위치 불명'],
      recoveryFlow: ['작은 범위 재요청', '직접 실행 검증', '마지막 정상으로 복구'],
    },
    slides: [
      { slot: 'cover', kind: 'img', tag: 'IMG', title: 'AI에게 일을 시킨다는 것', screenText: '결과가 아니라 과정을 검증합니다.', presenterNote: '표지에서는 길게 설명하지 않고, 오늘은 도구가 아니라 사고법을 만드는 시간이라고 안내합니다.' },
      { slot: 'metaphor', kind: 'img', tag: 'IMG', title: '요리사에게 맡기듯', screenText: '재료·레시피·맛 기준을 주면, 조리는 맡길 수 있습니다.', presenterNote: '직접 코드를 짜는 대신 목표·맥락·검증 기준을 주는 것이라는 비유로 직관화합니다.' },
      { slot: 'concept', kind: 'cap', tag: 'CAP+TEXT', title: '바이브코딩 4원칙', screenText: '목표·맥락 · 권한·범위 · 검증 · 복구', presenterNote: '네 원칙을 한 요소씩 공개하고, 도구가 바뀌어도 유지되는 기준임을 강조합니다.' },
      { slot: 'representative', kind: 'scene', tag: 'SCENE', title: '4원칙 플로우', screenText: '정의 → 맥락 → 요청 → 검증 → 복구를 한 단계씩 봅니다.', presenterNote: '자동 진행 없이 시작·다음 버튼으로 검증과 복구를 직접 보여줍니다.', sceneId: 'op-01-principles' },
      { slot: 'pitfall', kind: 'text', tag: 'TEXT', title: '오해: AI가 알아서 다 해준다', screenText: '완료 기준과 검증은 사람이 소유합니다.', presenterNote: '구독·모델 성능으로 판단하지 않고, 검증 책임을 사람에게 되돌립니다.' },
      { slot: 'qa', kind: 'text', tag: 'TEXT', title: '현장 질문', screenText: '코딩을 몰라도 되나요? → 무엇을 검증할지 정할 수 있나요?', presenterNote: '질문을 "코딩 실력"에서 "검증·완료 기준"으로 바꿔 대답합니다.' },
      { slot: 'lab', kind: 'cap', tag: 'CAP+TEXT', title: '직접 1건 실습', screenText: '목표 · 맥락 · 작은 범위 · 검증 · 복구', presenterNote: '수강생이 자기 아이디어 한 조각을 실제로 요청·실행·검증하게 합니다.' },
      { slot: 'summary', kind: 'text', tag: 'TEXT', title: '오늘의 한 문장', screenText: '결과가 아니라 과정을 검증하면, 도구가 바뀌어도 흔들리지 않습니다.', presenterNote: '도구 사용법이 아니라 사고법을 가져가도록 마무리합니다.' },
      { slot: 'next', kind: 'img', tag: 'IMG', title: '다음 주: CLI·MCP·Skill 이해', screenText: '터미널에서 일하고, 외부 능력·반복 자산을 이해합니다.', presenterNote: '2주차는 CLI 작업 흐름과 MCP·Skill의 개념·사용으로 이어집니다.' },
    ],
  },
];

// ── scriptSlides: per-slide teaching script derived from slides/error/sources ──
function buildScriptSlides(week) {
  const by = (slot) => week.slides.find((s) => s.slot === slot) || {};
  const cover = by('cover'), metaphor = by('metaphor'), concept = by('concept'),
    scene = by('representative'), pitfall = by('pitfall'), qa = by('qa'),
    lab = by('lab'), next = by('next');
  const e = week.error; const keys = week.sources.join(', ');
  const focus = week.professional.focus;
  const beats = [
    { title: '표지', say: cover.screenText, do: '표지 히어로만 띄우고 길게 설명하지 않습니다. 오늘의 한 문장만 예고합니다.', ask: '오늘 주제와 관련해 최근 겪은 상황이 있나요?', expected: '본인 경험 1~2개', recovery: '응답이 없으면 구체적인 예시 하나를 제시하고 다시 질문합니다.' },
    { title: '은유', say: metaphor.screenText, do: '은유 키비주얼로 직관화하고 도구 우열 논쟁으로 흐르지 않게 합니다.', ask: '이 비유에서 무엇을 기준으로 판단해야 할까요?', expected: '목표·검증 같은 기준', recovery: '비유의 한 지점만 짚고 다음으로 넘어갑니다.' },
    { title: '핵심 개념', say: concept.screenText, do: '4원칙을 한 요소씩 공개하고 시선을 한 지점에 고정합니다.', ask: '이 원칙 중 지금 가장 자신 없는 건 무엇인가요?', expected: '검증·복구 등', recovery: '원칙 하나를 실제 사례에 연결해 다시 설명합니다.' },
    { title: '대표 시연', say: scene.screenText, do: '수동 5버튼으로 한 단계씩 진행하고, 각 단계 전에 결과를 먼저 예측하게 합니다.', ask: '다음 단계에서 무엇이 달라질까요?', expected: '예측 한 문장', recovery: '애매하면 직전 단계로 돌아가 다시 짚습니다.' },
    { title: '자주 오해', say: pitfall.screenText, do: '오해 → 교정 순으로 보여주고 판단 보드를 노출합니다.', ask: '이 오해대로 하면 무엇이 부족해질까요?', expected: '검증 책임 누락', recovery: '실패 사례 한 장을 제시해 차이를 보여줍니다.' },
    { title: '예상 질문', say: qa.screenText, do: '질문을 "코딩 실력"에서 "검증·완료 기준"으로 바꿔 답합니다.', ask: '지금 만들고 싶은 것 한 가지를 말해줄 수 있나요?', expected: '실제 아이디어 1건', recovery: '없으면 예시 아이디어로 대신 분류합니다.' },
    { title: '실습 브리프', say: lab.screenText, do: '빈 양식과 예시 1행을 보여주고 즉시 작성하게 합니다.', ask: '당신 작업의 완료 기준은 무엇인가요?', expected: '완료 기준 1문장', recovery: '예시 양식을 함께 한 줄 채워 시작점을 만듭니다.' },
    { title: '실패 재현', say: e.symptom, do: `broken 상태를 실행해 로그(${e.trace})를 보여주고 증상을 고정합니다.`, ask: '이 증상의 원인은 어디일까요?', expected: '원인 가설 1개', recovery: '로그의 첫 줄을 함께 읽고 가설을 좁힙니다.' },
    { title: '복구 기준', say: e.fix, do: 'complete 상태로 복구 과정을 보여주고 재현 가능한 기준을 남깁니다.', ask: '무엇을 바꿔야 다시 정상이 될까요?', expected: '복구 한 단계', recovery: '직전 정상 상태와 현재 결과를 비교해 범위를 좁힙니다.' },
    { title: '공식자료 확인', say: `수업 전 ${keys} 를 재확인합니다.`, do: '🔄 공식 문서의 메뉴명·요금·UI 변경을 확인합니다.', ask: '최근 바뀐 용어나 화면이 있었나요?', expected: '변경 여부 확인', recovery: '확실치 않으면 공식 문서를 함께 엽니다.' },
    { title: '실습 타이머', say: week.practice, do: '60분 동안 작은 범위를 끝까지 진행하고 중간에 결과를 저장하게 합니다.', ask: '막힌 사람은 현재 상태와 다음 한 단계를 말해줄 수 있나요?', expected: '현재 상태 + 다음 한 단계', recovery: '결과 추가 대신 완료 기준을 다시 설명하게 합니다.' },
    { title: '리뷰', say: `산출물: ${week.deliverables.join(' · ')}`, do: '산출물을 직접 실행·확인하고 검증 기록을 남깁니다.', ask: '사람이 판단한 부분과 검증 근거는 무엇인가요?', expected: '판단·검증 근거', recovery: '하나의 산출물을 함께 실행해 확인합니다.' },
    { title: '다음 회차', say: next.screenText, do: '다음 주로 이어지는 한 문장을 예고하고 산출물을 보존하게 합니다.', ask: '다음 수업 전 준비할 한 가지는 무엇인가요?', expected: '준비 행동 1개', recovery: '구체적인 준비 예시 하나를 제시합니다.' },
  ];
  return beats.map((b, i) => ({
    slide: i + 1, title: b.title, say: b.say, do: b.do, ask: b.ask, expected: b.expected,
    deepDive: focus,
    motionCue: '현재 단계만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.',
    sourceCue: `${keys} 를 판단 기준으로만 짧게 연결합니다.`,
    recovery: b.recovery,
  }));
}

function buildSession(week) {
  const nn = String(week.n).padStart(2, '0');
  return {
    title: week.title,
    subtitle: week.subtitle,
    module: week.moduleTitle,
    core: week.core,
    objective: week.objective,
    duration: '180분',
    flow: week.flow,
    concepts: week.concepts,
    sequence: week.sequence,
    demo: { type: week.sceneType, sceneId: week.sceneId, manual: true, title: week.sceneTitle, stages: week.demoStages },
    compare: week.compare,
    decisions: week.decisions,
    error: week.error,
    practice: week.practice,
    deliverables: week.deliverables,
    sources: week.sources,
    professional: week.professional,
    revision: '3.0.0-beta.1',
    status: 'preview',
    visualScene: {
      id: week.sceneId,
      type: week.sceneType,
      title: week.sceneTitle,
      layout: 'principle-flow-board',
      normalFlow: week.sceneFlows.normalFlow,
      failureFlow: week.sceneFlows.failureFlow,
      recoveryFlow: week.sceneFlows.recoveryFlow,
      steps: week.sceneSteps,
    },
    interactions: {
      controls: ['start', 'previous', 'next', 'pause', 'reset'],
      predictionPrompt: '다음 단계에서 무엇이 달라질지 먼저 말한 뒤 진행',
      decisionCards: 3,
      manualOnly: true,
    },
    assets: {
      fallbackImage: `assets/v3/fallbacks/onepass-${nn}.png`,
      sceneId: week.sceneId,
      keyvisuals: [
        `assets/v3/keyvisuals/onepass/${nn}/cover.png`,
        `assets/v3/keyvisuals/onepass/${nn}/metaphor.png`,
        `assets/v3/keyvisuals/onepass/${nn}/next.png`,
      ],
      captures: [],
    },
    demoProject: {
      root: `v3/projects/onepass/${nn}`,
      starter: `v3/projects/onepass/${nn}/starter`,
      broken: `v3/projects/onepass/${nn}/broken`,
      complete: `v3/projects/onepass/${nn}/complete`,
      manifest: `v3/projects/onepass/${nn}/lab.json`,
    },
    fallbackMedia: {
      image: `assets/v3/fallbacks/onepass-${nn}.png`,
      slide: `v3/deck.html?course=onepass&lesson=${week.n}&slide=4&motion=low`,
    },
    studentMaterials: ['workbook', 'commands', 'examples', 'errors', 'assessment', 'practice'],
    instructorMaterials: ['script', 'source-study', 'demo-runbook', 'deep-dive', 'qa-bank', 'fallback', 'rehearsal'],
    slides: week.slides,
    scriptSlides: buildScriptSlides(week),
  };
}

const courseData = {
  title: COURSE.title,
  shortTitle: COURSE.shortTitle,
  code: COURSE.code,
  family: COURSE.family,
  level: COURSE.level,
  color: COURSE.color,
  visualMode: COURSE.visualMode,
  description: COURSE.description,
  route: COURSE.route,
  outcomes: COURSE.outcomes,
  sessions: WEEKS.map(buildSession),
};

// HTML-deck weeks (2~4): standalone tutorial decks (sessions/onepass-weekN.html), not
// the V3 9-slot deck. Added to the manifest only (no V3 course-data session needed).
const DECK_WEEKS = [
  {
    n: 2, moduleId: 'W2', moduleTitle: 'W2 · CLAUDE CODE · CODEX · CLI',
    title: 'Claude Code와 Codex — 도구를 직접 운영하는 법',
    subtitle: 'Desktop App·IDE·CLI의 차이, 저장소 경계, Diff·Git·브라우저 검증',
    objective: 'Claude Code와 Codex를 작업 표면별로 비교하고, 계획·수정·검증·기록을 통제하는 공통 작업 규율을 이해합니다.',
    deck: 'sessions/onepass-week2.html', slideCount: 25,
    sources: ['claude-overview', 'codex-overview', 'github-git', 'github-pull-requests'],
    deliverables: ['강의형 과정: 별도 실습 산출물 없음', '도구 표면 선택 기준', '안전한 저장소 작업 흐름'],
  },
  {
    n: 3, moduleId: 'W3', moduleTitle: 'W3 · MCP · SKILL · SUBAGENT · WORKFLOW',
    title: 'MCP·Skill·SubAgent·Workflow — AI의 손발을 설계하는 법',
    subtitle: '외부 능력·반복 절차·역할 계약·자동 흐름을 구분하고 연결',
    objective: 'MCP, Skill, SubAgent, Workflow의 경계를 이해하고 권한·검증·복구를 포함한 개인 확장 구조를 설계합니다.',
    deck: 'sessions/onepass-week3.html', slideCount: 24,
    sources: ['claude-skills', 'claude-mcp', 'claude-subagents', 'anthropic-eng-multiagent'],
    deliverables: ['강의형 과정: 별도 실습 산출물 없음', '개인 확장 구조 참고도', '권한·복구 설계 기준'],
  },
  {
    n: 4, moduleId: 'W4', moduleTitle: 'W4 · ORCHESTRATION · AI OFFICE',
    title: '오케스트레이션과 나만의 AI 사무실',
    subtitle: '접수·분배·리뷰 게이트·권한·복구·로그·릴리즈를 하나의 운영 구조로',
    objective: '확장 도구를 오케스트레이션으로 묶고, 사람의 목표·승인·복구 권한을 중심에 둔 AI 사무실을 설계합니다.',
    deck: 'sessions/onepass-week4.html', slideCount: 24,
    sources: ['anthropic-eng-agents', 'anthropic-eng-multiagent', 'github-actions', 'openai-agents-sdk'],
    deliverables: ['강의형 과정: 별도 실습 산출물 없음', 'AI 사무실 운영 기준', '승인·복구·릴리즈 관제 구조'],
  },
];
const deckSession = (w) => ({
  id: `onepass-${String(w.n).padStart(2, '0')}`,
  title: `${w.moduleId} · ${w.title}`,
  subtitle: w.subtitle,
  description: w.objective,
  duration: '180분',
  type: 'lecture',
  slideCount: w.slideCount,
  file: w.deck,
  moduleId: w.moduleId,
  revision: '3.0.0-beta.1',
  status: 'preview',
  sourceKeys: w.sources,
  preparation: ['개인 노트북', 'AI 코딩 도구 실행 환경'],
  deliverables: w.deliverables,
});

const manifest = {
  id: COURSE.id,
  title: COURSE.title,
  shortTitle: COURSE.shortTitle,
  code: COURSE.code,
  family: COURSE.family,
  track: '원샷 집중 · 4주 (1주 플래그십)',
  level: COURSE.level,
  status: 'preview',
  visibility: 'preview',
  audience: ['studio'],
  curriculumVersion: 'ONEPASS-180-LECTURE',
  description: COURSE.description,
  color: COURSE.color,
  route: COURSE.route,
  outcomes: COURSE.outcomes,
  visualMode: COURSE.visualMode,
  modules: [...WEEKS.map((w) => ({ id: w.moduleId, title: w.moduleTitle, weeks: [w.n] })), ...DECK_WEEKS.map((w) => ({ id: w.moduleId, title: w.moduleTitle, weeks: [w.n] }))],
  sessions: [...WEEKS.map((week) => {
    const nn = String(week.n).padStart(2, '0');
    return {
      id: `onepass-${nn}`,
      title: `${week.moduleId} · ${week.title}`,
      subtitle: week.subtitle,
      description: week.objective,
      duration: '180분',
      type: 'lecture',
      slideCount: week.slides.length,
      file: week.deck || `v3/deck.html?course=onepass&lesson=${week.n}`,
      moduleId: week.moduleId,
      revision: '3.0.0-beta.1',
      status: 'preview',
      sourceKeys: week.sources,
      preparation: ['개인 노트북', 'AI 코딩 도구 실행 환경', '만들어보고 싶은 작은 아이디어 1건'],
      deliverables: week.deliverables,
      demoProject: {
        root: `v3/projects/onepass/${nn}`,
        starter: `v3/projects/onepass/${nn}/starter`,
        broken: `v3/projects/onepass/${nn}/broken`,
        complete: `v3/projects/onepass/${nn}/complete`,
        manifest: `v3/projects/onepass/${nn}/lab.json`,
      },
      fallbackMedia: {
        image: `assets/v3/fallbacks/onepass-${nn}.png`,
        slide: `v3/deck.html?course=onepass&lesson=${week.n}&slide=4&motion=low`,
      },
    };
  }), ...DECK_WEEKS.map(deckSession)],
  materials: {
    student: [
      { id: 'onepass-workbook', title: '원샷 실습 워크북', description: '주차별 작업지와 메모', file: 'v3/material.html?course=onepass&kind=workbook&audience=student', audience: 'student', courseId: 'onepass' },
      { id: 'onepass-practice', title: '개인 실습 기록지', description: '목표·맥락·검증·복구 기록', file: 'v3/material.html?course=onepass&kind=practice&audience=student', audience: 'student', courseId: 'onepass' },
    ],
    instructor: [
      { id: 'onepass-script', title: '슬라이드별 상세 대본', description: 'SAY·DO·ASK·예상 답변·복구', file: 'v3/material.html?course=onepass&kind=script&audience=instructor', audience: 'instructor', courseId: 'onepass' },
      { id: 'onepass-source-study', title: '공식자료 연구노트', description: '원리 회차 공식 문서 기반 연구자료', file: 'v3/material.html?course=onepass&kind=source-study&audience=instructor', audience: 'instructor', courseId: 'onepass' },
      { id: 'onepass-deep-dive', title: '강사용 심화 개념집', description: '사고법 중심 배경지식', file: 'v3/material.html?course=onepass&kind=deep-dive&audience=instructor', audience: 'instructor', courseId: 'onepass' },
      { id: 'onepass-qa-bank', title: '질문·답변·오류 복구집', description: '바이브코더 예상 질문과 복구 답변', file: 'v3/material.html?course=onepass&kind=qa-bank&audience=instructor', audience: 'instructor', courseId: 'onepass' },
      { id: 'onepass-rehearsal', title: '현장 리허설 체크리스트', description: '프로젝터·수동 진행 QA', file: 'v3/material.html?course=onepass&kind=rehearsal&audience=instructor', audience: 'instructor', courseId: 'onepass' },
    ],
  },
};

const dataHeader = "'use strict';\n\n// Pre-built onepass (AI 한방 이해하기 · 4주 집중) course data. Generated by\n// scripts/build-onepass-data.js. Same 9-slot slides[] architecture as advanced;\n// scenes reuse the generic board renderer. Injected after enrichCurricula().\nmodule.exports = ";

const dataPath = path.join(__dirname, 'data', 'onepass-course.data.js');
const manifestPath = path.join(__dirname, 'data', 'onepass-course.manifest.json');
fs.writeFileSync(dataPath, dataHeader + JSON.stringify(courseData, null, 2) + ';\n', 'utf-8');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
console.log(`onepass data: ${courseData.sessions.length} session(s), ${courseData.sessions[0].slides.length} slots, ${courseData.sessions[0].scriptSlides.length} script slides`);
