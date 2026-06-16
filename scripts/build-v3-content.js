'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const contentDir = path.join(root, 'src', 'content');
const manifestPath = path.join(contentDir, 'course-manifest.json');
const archiveDir = path.join(contentDir, 'archive');
const archiveManifestPath = path.join(archiveDir, 'v2-course-manifest.json');
const freezePath = path.join(root, 'docs', 'v3', 'basic-v2-freeze.json');
const outputDataPath = path.join(contentDir, 'v3', 'course-data.js');
const officialSourcesPath = path.join(contentDir, 'sources', 'official-sources.json');

let officialSources = { sources: {} };
try {
  officialSources = JSON.parse(fs.readFileSync(officialSourcesPath, 'utf-8'));
} catch (error) {
  officialSources = { sources: {} };
}

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8') === content) return false;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function normalizedTextBuffer(buffer) {
  return Buffer.from(buffer.toString('utf-8').replace(/\r\n/g, '\n'), 'utf-8');
}

function preserveV2Sources() {
  fs.mkdirSync(archiveDir, { recursive: true });
  if (!fs.existsSync(archiveManifestPath)) {
    fs.copyFileSync(manifestPath, archiveManifestPath);
  }

  const existingFreeze = fs.existsSync(freezePath)
    ? JSON.parse(fs.readFileSync(freezePath, 'utf-8'))
    : null;
  if (!existingFreeze || existingFreeze.hashMode !== 'text-lf-normalized') {
    const sessionDir = path.join(contentDir, 'sessions');
    const files = fs.readdirSync(sessionDir)
      .filter((name) => fs.statSync(path.join(sessionDir, name)).isFile())
      .sort()
      .map((name) => {
        const buffer = normalizedTextBuffer(fs.readFileSync(path.join(sessionDir, name)));
        return {
          file: `src/content/sessions/${name}`,
          bytes: buffer.length,
          sha256: crypto.createHash('sha256').update(buffer).digest('hex'),
        };
      });
    writeIfChanged(freezePath, `${JSON.stringify({
      label: '기초반 2기 6주 운영본',
      frozenAt: '2026-06-16',
      note: '현재 활성 운영본은 해시로 보호한다. V3 개편은 별도 작업본에서 검수 후 회차별로 승격한다.',
      hashMode: 'text-lf-normalized',
      files,
    }, null, 2)}\n`);
  }
}

function sourceLabel(key) {
  const source = officialSources.sources?.[key];
  if (!source) return key;
  return `${source.publisher || '공식자료'} · ${source.title || source.pageTitle || key}`;
}

function inferProfessionalCourse({ title, module, sources }) {
  if (sources.some((key) => key.startsWith('stripe-') || key.startsWith('supabase-') || key.startsWith('product-'))) return 'AI 제품·수익화';
  if (/LAYER/.test(module)) return 'AI Workflow Architect';
  if (sources.some((key) => key.startsWith('claude-'))) return 'Claude Code Professional';
  if (sources.some((key) => key.startsWith('codex-'))) return 'Codex Professional';
  if (sources.some((key) => key.startsWith('mcp-'))) return 'AI Workflow Architect';
  if (/바이브코딩|프로그램|프로젝트와 파일|GitHub·배포|START|SYSTEM|STRUCTURE|SHIP/.test(`${title} ${module}`)) return '바이브코딩 기초반 4주';
  return 'VIBE STUDIO';
}

function professionalStudyNote(courseName, {
  focus,
  officialStudy,
  visualSimulation,
  demoRun,
  failureDrill,
  exercise,
  misconceptions,
  expertQuestions,
  studyPath = [],
  slideUpgrade = [],
  motionStoryboard = [],
  realWorldAssets = [],
  rehearsalChecklist = [],
}) {
  return {
    level: `${courseName} 강사용 연구노트`,
    focus,
    officialStudy,
    visualSimulation,
    demoRun,
    failureDrill,
    exercise,
    misconceptions,
    expertQuestions,
    studyPath,
    slideUpgrade,
    motionStoryboard,
    realWorldAssets,
    rehearsalChecklist,
  };
}

function buildProfessionalEnhancements({
  title,
  subtitle,
  module,
  objective,
  concepts,
  sequence,
  demo,
  compare,
  decisions,
  error,
  practice,
  deliverables,
  sources,
}) {
  const courseName = inferProfessionalCourse({ title, module, sources });
  const studySources = (sources || []).slice(0, 5).map(sourceLabel);
  const primarySource = studySources[0] || '공식자료';
  const sourceList = studySources.length ? studySources.join(' / ') : '과정 내부 사례';
  const conceptNames = concepts.map(([name]) => name).join(' · ');
  const evidenceTargets = ['실제 도구 화면', '터미널 로그', '파일 diff', '브라우저 결과', '권한 또는 환경변수 설정'];

  return {
    studyPath: [
      `${primarySource}에서 오늘 회차의 공식 용어와 기능 안정성을 먼저 확인합니다.`,
      `${sourceList}를 읽고 ${conceptNames}를 수강생 언어로 바꾼 한 문장 설명을 준비합니다.`,
      `${sequence.slice(0, 3).join(' → ')} 구간에서 실제 화면, 명령, 로그, 데이터 중 무엇을 보여줄지 결정합니다.`,
      `${error.symptom} 실패 장면을 공식자료의 권한, 설정, 상태, 이벤트, 복구 개념과 연결합니다.`,
      `수업 전 마지막으로 가격, 요금제, 베타 여부, 명령 이름, UI 메뉴명이 바뀌었는지 다시 확인합니다.`,
    ],
    slideUpgrade: [
      `표지는 ${title}의 핵심 흐름을 한 장의 실제 작업실 화면처럼 구성하고, 장식 문구보다 "${subtitle}" 결과가 먼저 보이게 합니다.`,
      `핵심 개념 슬라이드는 카드 나열을 줄이고 ${conceptNames}가 실제 화면의 어느 영역에 대응되는지 하이라이트합니다.`,
      `대표 시연 슬라이드는 ${demo.title} 장면을 ${demo.stages.join(' → ')} 순서로 수동 진행하며, 각 단계마다 검증 증거를 함께 표시합니다.`,
      `비교 슬라이드는 ${compare.bad[0] || '취약한 방식'}와 ${compare.good[0] || '검증 가능한 방식'}을 같은 실제 UI의 전후 장면으로 보여줍니다.`,
      `오류 복구 슬라이드는 붉은 오류 화면에서 끝내지 않고 ${error.fix} 이후 정상 상태로 회복되는 장면까지 포함합니다.`,
    ],
    motionStoryboard: [
      `Idle: 화면은 멈춘 상태로 시작하고 발표자가 "시작"을 누를 때만 ${demo.stages[0]} 단계가 켜집니다.`,
      `Focus: 현재 단계의 노드만 scale 1.03, opacity 1, 나머지는 opacity .35로 낮춰 시선이 흔들리지 않게 합니다.`,
      `Transfer: 다음 단계로 넘어갈 때 데이터 입자, diff 라인, 승인 빔 중 하나가 420ms 이내로 이동하며 인과를 보여줍니다.`,
      `Evidence: 단계가 완료되면 ${evidenceTargets.join(', ')} 중 하나가 초록 체크 또는 로그 라인으로 남습니다.`,
      `Recover: 실패 시 ${error.trace}가 1초 이상 고정되고, 복구 버튼 이후 ${deliverables[0] || '완료 결과물'} 상태로 전환됩니다.`,
    ],
    realWorldAssets: [
      `${courseName} 실제 도구 화면 또는 공식 문서 캡처 1장`,
      `${title} 정상 흐름을 보여주는 터미널 로그 또는 브라우저 캡처 1장`,
      `${error.symptom} 오류 상태 캡처 1장과 복구 후 성공 상태 캡처 1장`,
      `${deliverables[0] || '실습 산출물'}의 전후 비교 이미지 또는 diff`,
      `인터넷·로그인 실패 시 사용할 오프라인 대체 PNG와 30초 설명 문장`,
    ],
    rehearsalChecklist: [
      `수동 진행 버튼으로 ${demo.stages.length}개 단계를 끊어서 설명할 수 있는지 확인`,
      `각 단계마다 수강생에게 던질 질문 한 문장과 기다릴 지점 표시`,
      `정상 흐름, 실패 흐름, 복구 흐름을 각각 2분 안에 재연`,
      `${sources?.length || 0}개 공식자료의 URL, 확인 날짜, 안정성, 요금·권한 주의점 확인`,
      `실습 시작 전 ${practice}를 30초 안에 설명할 수 있도록 압축`,
    ],
  };
}

function buildProfessionalStudy({
  title,
  subtitle,
  module,
  objective,
  concepts,
  sequence,
  demo,
  compare,
  decisions,
  error,
  practice,
  deliverables,
  sources,
}) {
  if (!sources || sources.length < 3) return null;
  const courseName = inferProfessionalCourse({ title, module, sources });
  const studySources = sources.slice(0, 4).map(sourceLabel);
  const conceptLine = concepts.map(([name, copy]) => `${name}: ${copy}`).join(' / ');
  const bad = compare.bad || [];
  const good = compare.good || [];
  const firstDecision = decisions[0] || ['이 판단이 왜 필요한가요?', '검토', '공식자료와 실제 실행 증거를 함께 확인합니다.'];
  const secondDecision = decisions[1] || firstDecision;
  const enhancements = buildProfessionalEnhancements({
    title,
    subtitle,
    module,
    objective,
    concepts,
    sequence,
    demo,
    compare,
    decisions,
    error,
    practice,
    deliverables,
    sources,
  });

  return professionalStudyNote(courseName, {
    focus: `${courseName}의 ${title} 회차는 "${subtitle}"를 기능 목록으로 설명하는 수업이 아니라, ${objective} 강사는 ${conceptLine}를 실제 도구 화면, 로그, 권한, 실패 조건과 연결해 가르칩니다.`,
    officialStudy: studySources.slice(0, 3).map((label, index) => {
      const stage = sequence[index] || demo.stages[index] || title;
      return `${label}를 수업 전 확인하고, "${stage}" 단계에서 공식 용어가 실제 화면·명령·로그 중 어디에 대응되는지 한 문장으로 연결합니다.`;
    }),
    visualSimulation: `${demo.title} 장면을 대표 시뮬레이션으로 사용합니다. ${demo.stages.join(' → ')} 흐름을 발표자가 수동으로 넘기며, 각 단계마다 화면 변화와 검증 증거가 동시에 바뀌게 설계합니다.`,
    demoRun: [
      `공식자료 ${studySources[0]}의 핵심 용어를 열고 오늘 시연의 판단 기준을 먼저 고정합니다.`,
      `${sequence.slice(0, 3).join(' → ')} 구간을 실제 도구 또는 브라우저 재현 화면으로 보여줍니다.`,
      `정상 흐름에서는 ${good[0] || deliverables[0]}가 어떤 증거로 남는지 확인합니다.`,
      `실패 흐름에서는 ${error.symptom}를 재현하고 로그, diff, 권한, 설정 중 첫 확인 지점을 찾습니다.`,
      `마지막에는 ${deliverables.join(', ')}를 학생 프로젝트에 적용할 수 있게 작업지에 기록시킵니다.`,
    ],
    failureDrill: [
      `${error.symptom} 상황을 일부러 보여주고 ${error.trace}에서 첫 원인을 찾게 합니다.`,
      `${error.cause}를 AI에게 전달할 때 목표, 실행 명령, 로그, 기대 결과를 함께 적게 합니다.`,
      `${error.fix} 이후 같은 문제가 재발하지 않도록 체크리스트나 권한 규칙으로 남깁니다.`,
    ],
    exercise: practice,
    misconceptions: [
      [bad[0] || '도구가 알아서 완성한다', good[0] || '사람이 판단 기준과 검증 증거를 확인해야 합니다.'],
      [bad[1] || '공식 문서는 강사만 보면 된다', good[1] || '수강생에게도 어디를 확인해야 하는지 쉬운 언어로 안내합니다.'],
    ],
    expertQuestions: [
      [firstDecision[0], `${firstDecision[2]} 이 판단은 공식자료의 책임 범위와 실제 시연 증거를 함께 보며 설명합니다.`],
      [secondDecision[0], `${secondDecision[2]} 수강생에게는 정의보다 "어디를 확인하면 되는가"로 답합니다.`],
    ],
    ...enhancements,
  });
}

function detail({
  title,
  subtitle,
  module,
  objective,
  concepts,
  sequence,
  demo,
  compare,
  decisions,
  error,
  practice,
  deliverables,
  preparation = ['개인 노트북', '현재 프로젝트', '강의 워크북'],
  sources = [],
  pathway = null,
  professional = null,
}) {
  return {
    title,
    subtitle,
    module,
    objective,
    duration: '120분',
    flow: ['진단 10분', '이론·시각화 35분', '실제 시연 20분', '실습 40분', '오류 복구·리뷰 15분'],
    concepts,
    sequence,
    demo,
    compare,
    decisions,
    error,
    practice,
    deliverables,
    preparation,
    sources,
    pathway,
    professional: professional || buildProfessionalStudy({
      title,
      subtitle,
      module,
      objective,
      concepts,
      sequence,
      demo,
      compare,
      decisions,
      error,
      practice,
      deliverables,
      sources,
    }),
  };
}

function codexProfessional({
  focus,
  officialStudy,
  visualSimulation,
  demoRun,
  failureDrill,
  exercise,
  misconceptions,
  expertQuestions,
}) {
  return professionalStudyNote('Codex Professional', {
    focus,
    officialStudy,
    visualSimulation,
    demoRun,
    failureDrill,
    exercise,
    misconceptions,
    expertQuestions,
  });
}

const curricula = {
  'foundation-next': {
    title: '바이브코딩 기초반 · 다음 기수',
    shortTitle: '기초반 4주 개편본',
    code: 'B03',
    family: '기초',
    level: 'START',
    color: '#d8ff66',
    visualMode: 'foundation',
    description: 'AI 일반론 없이 바이브코딩 작업 환경에서 시작해 내 프로젝트를 안전하게 배포하는 4주 과정입니다.',
    route: '바이브코딩 시작 → 프로그램 구조 → 파일 구조 → GitHub·배포·보안',
    outcomes: ['첫 프로젝트 실행', '문제 위치 판단', '안전한 파일 수정', '공개 URL 배포'],
    sessions: [
      detail({
        title: '바이브코딩과 AI 개발환경',
        subtitle: '설계 AI · AI IDE · 터미널 · 브라우저',
        module: '01 · START',
        objective: '네 작업대의 역할을 구분하고 요청, 생성, 실행, 확인의 첫 반복을 완성합니다.',
        concepts: [['설계 AI', '요구사항과 작업 순서를 함께 정리합니다.'], ['AI IDE', '프로젝트 파일을 실제로 생성하고 수정합니다.'], ['터미널', '설치와 실행 상태를 명령으로 확인합니다.'], ['브라우저', '사용자가 보게 될 결과와 오류를 검증합니다.']],
        sequence: ['아이디어를 한 문장으로 설명', '설계 AI와 완료 장면 합의', 'AI IDE가 파일 생성', '터미널에서 개발 서버 실행', '브라우저 확인 후 수정 요청'],
        demo: { type: 'workspace', title: '한 요청이 네 작업대를 순환하는 장면', stages: ['요청 정리', '파일 생성', 'npm run dev', 'localhost 확인', '수정 반복'] },
        compare: { bad: ['바로 만들어줘', '결과 확인 없이 추가 요청', '오류 화면을 닫음'], good: ['완료 장면부터 합의', '한 번에 한 변화 확인', '오류를 복사해 원인 질문'] },
        decisions: [['설치 명령을 이해하지 못해도 AI가 대신 입력하면 된다', '주의', '명령의 목적과 실행 폴더는 확인해야 합니다.'], ['브라우저 결과를 본 뒤 다음 요청을 정한다', '좋음', '관찰과 수정이 연결됩니다.'], ['여러 AI IDE를 동시에 설치해 비교한다', '보류', '한 도구의 기본 흐름부터 익힙니다.']],
        error: { symptom: 'localhost가 열리지 않음', trace: 'npm ERR! missing script: dev', cause: '실행 폴더 또는 package.json 명령이 다름', fix: '현재 폴더와 scripts를 확인한 뒤 올바른 명령으로 재실행' },
        practice: '자기소개 또는 개인 업무 도구를 생성하고 텍스트·색상·버튼 동작을 한 번씩 수정합니다.',
        deliverables: ['실행되는 로컬 프로젝트', '첫 작업 요청서', '수정 전후 캡처'],
        sources: ['github-git', 'node-download', 'vscode-download'],
      }),
      detail({
        title: '프로그램이 작동하는 구조',
        subtitle: 'UI·UX · 프론트엔드 · 백엔드 · API · DB',
        module: '02 · SYSTEM',
        objective: '버튼 클릭이 화면, 처리, 저장, 응답을 지나 돌아오는 과정을 보고 문제 위치를 구분합니다.',
        concepts: [['프론트엔드', '사용자가 보고 누르는 화면과 상호작용입니다.'], ['백엔드', '권한과 업무 규칙을 처리합니다.'], ['API', '기능 사이에서 요청과 응답을 전달합니다.'], ['데이터베이스', '회원, 게시글, 상품과 주문 상태를 저장합니다.']],
        sequence: ['브라우저에서 주문 클릭', '프론트엔드가 요청 생성', 'API가 백엔드로 전달', '권한·재고·결제 검사', 'DB 저장 후 성공 응답'],
        demo: { type: 'request', title: '주문 데이터의 왕복 여행', stages: ['ORDER 클릭', '권한 확인', '재고 확인', '결제 승인', '주문 저장', '완료 응답'] },
        compare: { bad: ['버튼 모양만 완성', '실패 상태 없음', '저장 여부 확인 안 함'], good: ['로딩·성공·실패 UI', '서버 규칙 확인', '새로고침 후 데이터 확인'] },
        decisions: [['버튼이 예쁘면 기능도 완성된 것이다', '아님', '보이는 화면과 실제 처리는 별개입니다.'], ['새로고침 후에도 결과가 남는지 본다', '좋음', '저장 연결을 확인할 수 있습니다.'], ['오류 메시지를 숨긴다', '위험', '원인과 복구 방법을 알 수 없습니다.']],
        error: { symptom: '주문 완료 알림은 뜨지만 목록에 없음', trace: 'POST /orders 200, DB write skipped', cause: '화면 성공 처리와 데이터 저장이 분리됨', fix: '저장 성공 응답 이후에만 완료 UI를 표시하도록 요청' },
        practice: '내 프로젝트의 핵심 버튼 하나를 선택해 화면·처리·저장·응답 흐름과 실패 상태를 그립니다.',
        deliverables: ['기능 흐름도', '문제 위치 판단표', 'AI 수정 요청'],
        sources: ['mdn-http', 'firebase-data', 'mcp-intro'],
      }),
      detail({
        title: '프로젝트와 파일 구조',
        subtitle: 'src · 컴포넌트 · 설정파일 · 패키지 · Git',
        module: '03 · STRUCTURE',
        objective: 'VS Code 파일 트리에서 수정 위치와 영향 범위를 찾고 diff를 확인한 뒤 안전하게 변경합니다.',
        concepts: [['src', '직접 만드는 화면과 기능 코드가 모입니다.'], ['components', '여러 화면에서 재사용하는 UI 단위입니다.'], ['package.json', '프로젝트 명령과 의존성을 설명합니다.'], ['Git', '변경 기록과 되돌아갈 지점을 남깁니다.']],
        sequence: ['브라우저에서 바꿀 요소 지정', '검색으로 관련 텍스트 찾기', '파일 역할 확인', 'AI가 작은 diff 생성', '브라우저·Git diff로 검증'],
        demo: { type: 'ide', title: '버튼 한 줄 수정이 화면에 도착하는 과정', stages: ['요소 선택', '파일 검색', '코드 하이라이트', 'diff 적용', '미리보기 갱신'] },
        compare: { bad: ['프로젝트 전체 재작성', 'node_modules 직접 수정', '검토 없이 모든 변경 승인'], good: ['관련 파일만 수정', 'src와 설정 구분', 'diff·브라우저·Git 상태 확인'] },
        decisions: [['node_modules 안의 버튼 파일을 수정한다', '아님', '설치된 패키지는 재설치 때 사라집니다.'], ['공용 컴포넌트의 사용처를 먼저 찾는다', '좋음', '영향 범위를 예상할 수 있습니다.'], ['작동하면 diff는 볼 필요 없다', '위험', '원치 않는 변경이 함께 들어갈 수 있습니다.']],
        error: { symptom: '한 버튼 수정 후 모든 페이지 버튼이 변함', trace: 'Shared Button component updated', cause: '공용 컴포넌트의 영향 범위를 확인하지 않음', fix: '전용 variant 또는 페이지 전용 컴포넌트로 범위를 제한' },
        practice: '내 프로젝트에서 바꾸고 싶은 요소를 검색해 관련 파일, 공용 여부, 수정 전후 diff를 기록합니다.',
        deliverables: ['개인 프로젝트 파일 지도', '검토한 Git diff', '안전한 수정 체크리스트'],
        sources: ['github-git', 'npm-package-json', 'vscode-download'],
      }),
      detail({
        title: 'GitHub·배포·보안·데이터',
        subtitle: '저장소 · Vercel · Firebase · .env · 권한',
        module: '04 · SHIP',
        objective: '코드를 GitHub에 안전하게 저장하고 비밀값을 분리한 뒤 공개 URL로 배포하고 재배포합니다.',
        concepts: [['GitHub', '코드 변경과 협업 기록을 보관합니다.'], ['Vercel·Firebase', '내 컴퓨터의 프로젝트를 인터넷 서비스로 배포합니다.'], ['.env', 'API 키처럼 공개하면 안 되는 설정을 코드와 분리합니다.'], ['보안 규칙', '사용자가 읽고 쓸 수 있는 데이터 범위를 제한합니다.']],
        sequence: ['비밀값과 .gitignore 확인', 'Git commit과 GitHub push', '배포 서비스 프로젝트 연결', '환경변수와 권한 설정', '공개 URL·로그·재배포 확인'],
        demo: { type: 'deploy', title: '내 컴퓨터에서 실제 사용자까지', stages: ['LOCAL', 'GIT COMMIT', 'GITHUB', 'BUILD', 'ENV INJECT', 'LIVE URL'] },
        compare: { bad: ['API 키를 코드에 입력', 'DB 규칙을 모두 허용', '배포 성공 화면만 확인'], good: ['환경변수와 .gitignore', '사용자별 최소 권한', 'URL·로그·모바일까지 검증'] },
        decisions: [['프론트엔드 환경변수면 모든 키를 숨길 수 있다', '아님', '브라우저에 전달되는 값은 사용자가 볼 수 있습니다.'], ['노출된 키는 삭제 후 재발급한다', '좋음', 'Git 기록 삭제만으로는 충분하지 않습니다.'], ['Firebase 테스트 모드를 계속 사용한다', '위험', '운영 전 보안 규칙을 작성해야 합니다.']],
        error: { symptom: '로컬에서는 되지만 배포 URL에서 API 오류', trace: '401 Unauthorized / ENV undefined', cause: '배포 환경변수 누락 또는 공개·서버 변수 혼동', fix: '배포 서비스 환경변수 등록 후 새 빌드하고 네트워크 로그 확인' },
        practice: 'GitHub 저장소를 만들고 환경변수·권한 체크 후 Vercel 또는 Firebase에 배포해 공개 URL을 검증합니다.',
        deliverables: ['GitHub 저장소', '공개 배포 URL', '보안·재배포 점검표'],
        sources: ['github-repository', 'vercel-deploy', 'vercel-env', 'firebase-hosting', 'firebase-rules', 'firebase-auth', 'firebase-rules-conditions', 'github-actions-secrets', 'vercel-rollback'],
      }),
    ],
  },
  product: {
    title: 'AI 제품·수익화',
    shortTitle: '제품·수익화',
    code: 'P10',
    family: '비즈니스 실전',
    level: 'PROJECT',
    color: '#ffb071',
    visualMode: 'product',
    description: '공통 4주 후 SaaS팀과 외주팀으로 나뉘어 협업 프로젝트와 개인 사이드 프로젝트를 함께 완성합니다.',
    route: '문제·MVP·UX·가격 → SaaS 또는 외주 팀 프로젝트 → 출시·납품',
    outcomes: ['고객 문제 검증', '팀 역할과 리뷰', '개인 사이드 프로젝트', '출시 또는 납품'],
    sessions: [
      detail({
        title: '고객 문제와 팀 구성',
        subtitle: '문제 장면 · 고객 · 역할 · 협업 계약',
        module: 'COMMON · 01',
        objective: '기능 아이디어를 고객의 반복 문제로 바꾸고 팀 역할과 의사결정 규칙을 정합니다.',
        concepts: [['고객 장면', '누가 언제 어떤 불편을 겪는지 묘사합니다.'], ['현재 대안', '지금 돈과 시간을 어떻게 쓰는지 확인합니다.'], ['팀 역할', '기획·제작·검토·운영의 책임을 나눕니다.'], ['협업 계약', '파일·결정·리뷰·마감 소유권을 합의합니다.']],
        sequence: ['개인 문제 후보 수집', '고객 장면 인터뷰', '팀 문제 하나 선택', '역할과 결정권 배정', '개인 프로젝트에도 같은 문제 정의 적용'],
        demo: { type: 'team', title: '아이디어 네 개가 하나의 팀 문제로 수렴하는 과정', stages: ['후보', '근거', '우선순위', '역할', '팀 계약'] },
        compare: { bad: ['기능이 멋져서 선택', '모두가 모든 일 담당', '결정은 단체 채팅'], good: ['반복 문제와 현재 비용', '역할별 Owner', '기록된 결정과 Reviewer'] },
        decisions: [['AI가 들어가면 고객이 쓸 것이다', '약함', '기술보다 해결 결과가 먼저입니다.'], ['현재 대안을 쓰는 고객을 찾는다', '강함', '문제의 실제 비용을 확인할 수 있습니다.'], ['팀원이 모두 같은 파일을 편집한다', '위험', '작업 소유권을 분리해야 합니다.']],
        error: { symptom: '회의는 길지만 결정이 남지 않음', trace: 'Owner: none / deadline changed 3x', cause: '최종 결정자와 기록 형식이 없음', fix: '결정 Owner, Reviewer, 마감과 변경 로그를 계약서에 추가' },
        practice: '팀 문제 선언문, 역할표, 협업 계약서를 만들고 개인 사이드 프로젝트 문제도 한 문장으로 정리합니다.',
        deliverables: ['팀 문제 선언문', '역할 순환표', '협업 계약서', '개인 문제 정의'],
        sources: ['product-yc-startup-advice', 'product-atlassian-user-stories', 'product-nng-heuristics'],
      }),
      detail({
        title: 'MVP와 제품 구조',
        subtitle: '핵심 행동 · Must/Later · 화면 · 데이터',
        module: 'COMMON · 02',
        objective: '팀과 개인 프로젝트에서 4주 안에 검증할 핵심 행동과 최소 제품 범위를 정합니다.',
        concepts: [['핵심 행동', '사용자가 가치에 도달하는 한 번의 행동입니다.'], ['Must', '검증에 반드시 필요한 기능입니다.'], ['Later', '핵심 가치 확인 후 추가할 기능입니다.'], ['완료 장면', '처음부터 끝까지 실제로 시연 가능한 상태입니다.']],
        sequence: ['전체 기능 펼치기', '핵심 행동 하나 선택', 'Must/Later/Remove 분류', '화면·데이터 흐름 연결', '완료 시연 문장 작성'],
        demo: { type: 'scope', title: '기능 18개를 검증 가능한 MVP로 압축', stages: ['18 FEATURES', 'CORE ACTION', 'MUST 4', 'FLOW', 'DEMO READY'] },
        compare: { bad: ['기능 수로 완성도 판단', '랜딩만 제작', '완료 기준 없음'], good: ['핵심 행동 중심', '화면과 데이터 연결', '사용자 시나리오로 완료 정의'] },
        decisions: [['커뮤니티·채팅·배지를 첫 버전에 추가', '과함', '핵심 행동 검증을 늦춥니다.'], ['필수 흐름 3~5개 화면만 연결', '좋음', '실제 사용을 빠르게 확인합니다.'], ['예쁜 목업이면 MVP다', '부분', '핵심 행동을 실행할 수 있어야 합니다.']],
        error: { symptom: '매주 기능은 늘지만 데모가 끝까지 안 됨', trace: '12 screens / 0 complete journeys', cause: '화면 단위로 만들고 사용자 흐름을 연결하지 않음', fix: '핵심 행동의 시작부터 완료까지 세로 한 줄로 우선 완성' },
        practice: '팀·개인 프로젝트의 기능을 Must/Later/Remove로 분류하고 핵심 흐름을 5단계 이하로 만듭니다.',
        deliverables: ['MVP 범위표', '핵심 사용자 흐름', '완료 시연 기준'],
        sources: ['product-yc-startup-advice', 'product-atlassian-user-stories', 'github-git'],
      }),
      detail({
        title: 'UI·UX·신뢰·온보딩',
        subtitle: '첫 문장 · 실제 화면 · 피드백 · 첫 성공',
        module: 'COMMON · 03',
        objective: '사용자가 제품을 이해하고 믿고 첫 성공에 도달하도록 화면과 피드백을 설계합니다.',
        concepts: [['UI', '정보와 행동이 보이는 형태입니다.'], ['UX', '사용자가 목표까지 겪는 전체 과정입니다.'], ['피드백', '로딩·성공·실패를 즉시 알려줍니다.'], ['온보딩', '가입 후 핵심 가치를 처음 경험하게 합니다.']],
        sequence: ['첫 화면에서 대상 선언', '실제 결과 화면 제시', '불안 요소 설명', '하나의 CTA', '첫 성공까지 안내'],
        demo: { type: 'browser', title: '같은 기능, 다른 사용 경험', stages: ['모호한 첫 화면', '대상 명시', '실제 결과', '진행 피드백', '첫 성공'] },
        compare: { bad: ['기능 나열', 'CTA 다섯 개', '실패 시 무반응'], good: ['문제와 결과', '주요 행동 하나', '로딩·성공·실패 피드백'] },
        decisions: [['애니메이션은 많을수록 고급스럽다', '아님', '상태와 인과를 설명할 때만 사용합니다.'], ['결제·데이터·취소 불안을 미리 설명한다', '좋음', '신뢰와 전환을 높입니다.'], ['가입 전에 모든 정보를 요구한다', '위험', '첫 성공에 필요 없는 입력은 미룹니다.']],
        error: { symptom: '가입률은 높지만 첫 기능 사용률이 낮음', trace: 'signup 68% / activation 11%', cause: '가입 이후 다음 행동과 빈 상태 안내가 없음', fix: '샘플 데이터, 한 단계 안내와 완료 피드백 추가' },
        practice: '팀·개인 프로젝트의 첫 화면부터 첫 성공까지 다섯 장면을 제작하고 막힘을 상호 리뷰합니다.',
        deliverables: ['5장면 UX 흐름', '상태·피드백 목록', '동료 리뷰 기록'],
        sources: ['product-nng-heuristics', 'product-material-onboarding', 'product-material-design'],
      }),
      detail({
        title: '가격·수익모델·검증',
        subtitle: '가치 단위 · 비용 · 결제 상태 · 트랙 선택',
        module: 'COMMON · 04',
        objective: '가격 숫자가 아니라 고객이 돈을 내는 결과와 제공 비용을 기준으로 모델을 정하고 팀 트랙을 선택합니다.',
        concepts: [['가치 단위', '고객이 비용을 지불하는 구체적 결과입니다.'], ['가격 모델', '일회성·구독·사용량·프로젝트 비용입니다.'], ['제공 비용', 'AI·인프라·운영·수정에 드는 비용입니다.'], ['검증 신호', '결제 의향, 문의, 반복 사용 같은 행동입니다.']],
        sequence: ['가치와 빈도 확인', '제공 비용 계산', '가격 가설 선택', '결제 전후 상태 설계', 'SaaS·외주 팀 선택'],
        demo: { type: 'pricing', title: '기능표가 가격과 권한표로 바뀌는 과정', stages: ['VALUE', 'FREQUENCY', 'COST', 'PLAN', 'ACCESS'] },
        compare: { bad: ['경쟁사 가격 복사', '무제한 AI 무료', '결제 버튼만 추가'], good: ['가치·빈도·비용 근거', '사용량과 한도', '성공·실패·취소 상태'] },
        decisions: [['반복 사용하는 업무도구를 일회성으로 판매', '검토', '운영 비용과 반복 가치를 반영해야 합니다.'], ['명확한 결과물을 프로젝트 단가로 판매', '적합', '외주 트랙과 잘 맞습니다.'], ['AI 기능을 무제한 무료로 제공', '위험', '사용량 비용과 악용 방지가 필요합니다.']],
        error: { symptom: '사용자는 늘지만 사용할수록 손실 증가', trace: 'revenue 0 / model cost +38%', cause: '사용량 비용과 무료 한도를 설계하지 않음', fix: '원가 추정, 사용량 제한, 유료 전환 조건을 함께 설계' },
        practice: '가격 가설과 비용표를 만든 뒤 팀은 SaaS 또는 외주 트랙을 선택하고 역할을 재배정합니다.',
        deliverables: ['가격·원가 가설', '결제 상태표', '트랙 선택서'],
        sources: ['stripe-subscriptions', 'stripe-checkout', 'stripe-webhooks', 'stripe-customer-portal', 'product-toss-widget'],
      }),
      detail({
        title: '트랙 설계 I',
        subtitle: 'SaaS 데이터·회원 / 외주 요구사항·견적',
        module: 'TRACK · 05',
        objective: '같은 강의실에서 SaaS팀은 상태·회원·권한을, 외주팀은 범위·견적·승인 구조를 완성합니다.',
        concepts: [['SaaS 상태', '사용자와 데이터가 시간에 따라 바뀌는 조건입니다.'], ['SaaS 권한', '역할별 읽기·쓰기 범위를 제한합니다.'], ['외주 범위', '포함·선택·제외 항목을 합의합니다.'], ['외주 견적', '작업량·위험·수정 범위를 가격과 연결합니다.']],
        sequence: ['공통 목표 확인', '트랙별 설계실 이동', '팀 역할별 산출물 제작', 'Reviewer 교차 검토', '개인 프로젝트 적용'],
        demo: { type: 'split', title: '한 교실, 두 개의 실전 설계실', stages: ['COMMON BRIEF', 'SAAS STATE', 'CLIENT SCOPE', 'CROSS REVIEW', 'SIGNED PLAN'] },
        compare: { bad: ['SaaS 화면만 설계', '외주 구두 요청으로 시작', '개인 프로젝트 중단'], good: ['SaaS 상태·권한표', '외주 포함·제외·승인', '개인 프로젝트에 동일 산출물 적용'] },
        decisions: [['SaaS 관리자에게 모든 권한 부여', '위험', '업무에 필요한 최소 권한으로 나눕니다.'], ['외주 수정 무제한 포함', '위험', '횟수·범위·추가 비용을 명시합니다.'], ['상대 트랙 팀이 문서를 리뷰', '좋음', '전문용어 없이도 이해되는지 검증합니다.']],
        error: { symptom: '팀마다 완료 기준이 다름', trace: 'scope mismatch / role undefined', cause: '상태 또는 범위를 화면 이름만으로 표현', fix: '입력·행동·결과·제외·승인을 표로 명시' },
        practice: 'SaaS팀은 데이터·회원·권한표, 외주팀은 요구사항·견적·변경 계약서를 만들고 교차 검토합니다.',
        deliverables: ['트랙별 설계 문서', '교차 리뷰 기록', '개인 적용본'],
        sources: ['supabase-rls', 'supabase-auth', 'firebase-rules', 'firebase-auth', 'stripe-subscriptions'],
        pathway: ['saas', 'freelance'],
      }),
      detail({
        title: '트랙 제작 II',
        subtitle: 'SaaS 핵심 기능 / 외주 마일스톤 제작',
        module: 'TRACK · 06',
        objective: 'SaaS팀은 핵심 행동을 실제 데이터와 연결하고 외주팀은 승인 가능한 마일스톤 단위로 제작합니다.',
        concepts: [['세로 기능', '화면부터 저장까지 하나의 흐름을 완성합니다.'], ['상태 처리', '로딩·빈 상태·성공·실패를 포함합니다.'], ['마일스톤', '고객이 확인하고 승인할 수 있는 작업 단위입니다.'], ['버전 기록', '무엇이 언제 왜 바뀌었는지 남깁니다.']],
        sequence: ['오늘 완료할 한 흐름', 'Owner 제작', 'Reviewer 테스트', '고객·사용자 관점 검수', '승인과 다음 작업'],
        demo: { type: 'build', title: '작업 중이 아니라 승인 가능한 결과로', stages: ['BRIEF', 'BUILD', 'TEST', 'REVIEW', 'ACCEPT'] },
        compare: { bad: ['여러 기능 동시 착수', '완료 보고만 전달', '피드백을 채팅에서 소실'], good: ['한 흐름 끝까지', '실행 URL과 검수 항목', '승인·반려·재작업 기록'] },
        decisions: [['SaaS 핵심 기능 세 개를 동시에 만든다', '과함', '한 세로 흐름부터 완성합니다.'], ['외주 중간 결과를 영상·URL·체크리스트로 제출', '좋음', '고객이 구체적으로 승인할 수 있습니다.'], ['리뷰 없이 다음 마일스톤으로 이동', '위험', '오류와 범위 차이가 누적됩니다.']],
        error: { symptom: '각 기능은 있지만 전체 사용 흐름이 끊김', trace: 'pages ready / journey failed', cause: '파일·화면 단위로 병렬 제작하고 통합 책임자가 없음', fix: '통합 Owner가 사용자 흐름 기준으로 병합·테스트' },
        practice: '팀은 한 세로 기능 또는 마일스톤을 완성하고 다른 역할의 사람이 검수해 승인 기록을 남깁니다.',
        deliverables: ['실행 가능한 마일스톤', '테스트 결과', '승인·반려 기록'],
        sources: ['github-git', 'github-actions', 'github-pull-requests', 'product-atlassian-user-stories'],
        pathway: ['saas', 'freelance'],
      }),
      detail({
        title: '운영 III',
        subtitle: 'SaaS 결제·운영 / 외주 수정·검수·버전',
        module: 'TRACK · 07',
        objective: '정상 화면 뒤에 있는 비용·실패·운영·변경 관리를 실제 사례로 연결합니다.',
        concepts: [['결제 상태', '대기·성공·실패·취소·환불을 관리합니다.'], ['운영 화면', '사용자·결제·오류·문의 상태를 확인합니다.'], ['수정 요청', '버그·변경·추가 요구를 분류합니다.'], ['검수 버전', '승인 대상과 수정 근거를 고정합니다.']],
        sequence: ['운영 사건 발생', '로그와 요청 분류', '권한·범위 판단', '수정·복구', '사용자 또는 고객에게 기록 전달'],
        demo: { type: 'operations', title: '성공 화면 밖에서 서비스가 운영되는 장면', stages: ['EVENT', 'LOG', 'DECIDE', 'FIX', 'REPORT'] },
        compare: { bad: ['결제 성공만 구현', '모든 요청을 버그로 처리', '운영 계정을 공유'], good: ['전체 결제 상태', '버그·변경·추가 분류', '역할별 계정과 감사 기록'] },
        decisions: [['결제 실패 사용자의 권한을 먼저 연다', '위험', '승인 상태를 검증해야 합니다.'], ['요구사항 외 추가 기능은 변경 요청으로 기록', '좋음', '일정과 비용을 재합의할 수 있습니다.'], ['운영 로그에 API 키를 출력', '위험', '민감정보는 마스킹해야 합니다.']],
        error: { symptom: '수정 후 이전 승인 기능이 깨짐', trace: 'regression in accepted milestone', cause: '버전 기준과 회귀 체크리스트가 없음', fix: '승인 버전 태그와 핵심 시나리오 재검증' },
        practice: 'SaaS팀은 결제·운영 사건을, 외주팀은 변경 요청을 처리하고 복구와 보고서까지 작성합니다.',
        deliverables: ['운영·변경 사건 기록', '복구 결과', '회귀 테스트표'],
        sources: ['stripe-subscriptions', 'stripe-checkout', 'stripe-webhooks', 'stripe-customer-portal', 'supabase-rls', 'github-actions'],
        pathway: ['saas', 'freelance'],
      }),
      detail({
        title: '출시·납품 IV',
        subtitle: 'SaaS 지표 / 외주 인수인계·사례화',
        module: 'TRACK · 08',
        objective: 'SaaS팀은 실제 출시와 지표를, 외주팀은 안전한 납품과 포트폴리오 사례를 완성합니다.',
        concepts: [['출시 범위', '처음 사용할 구체적 고객과 채널을 정합니다.'], ['제품 지표', '방문·가입·활성화·결제·유지를 봅니다.'], ['인수인계', '계정·도메인·환경변수·운영 문서를 넘깁니다.'], ['사례화', '문제·과정·역할·결과를 증거로 정리합니다.']],
        sequence: ['최종 점검', '공개 또는 납품', '실제 사용자·고객 확인', '지표·인수 서명', '팀 회고와 개인 사례화'],
        demo: { type: 'launch', title: '프로젝트가 운영 가능한 자산이 되는 마지막 과정', stages: ['QA', 'SHIP', 'VERIFY', 'HANDOVER', 'RETROSPECT'] },
        compare: { bad: ['링크만 공개', '제작자 계정으로 납품', '예쁜 화면만 포트폴리오'], good: ['관찰할 행동과 채널', '고객 소유 계정과 문서', '문제·과정·결과 증거'] },
        decisions: [['출시 후 방문자 수만 본다', '약함', '핵심 가치 행동을 측정해야 합니다.'], ['고객이 직접 로그인하고 운영하도록 확인', '좋음', '인수인계 완료를 증명합니다.'], ['팀 결과를 개인이 전부 했다고 소개', '위험', '본인의 역할과 기여를 정확히 기록합니다.']],
        error: { symptom: '배포는 됐지만 아무도 다음 행동을 모름', trace: 'URL live / owner undefined', cause: '운영·측정·인수 책임이 정해지지 않음', fix: '운영 Owner, 지표 대시보드, 계정 인수와 다음 실험을 명시' },
        practice: '팀 프로젝트를 출시 또는 납품하고 개인 사이드 프로젝트의 다음 30일 개선 계획을 작성합니다.',
        deliverables: ['출시 URL 또는 납품 확인서', '지표·인수 문서', '팀 회고', '개인 사례 초안'],
        sources: ['github-releases', 'vercel-deploy', 'vercel-rollback', 'stripe-subscriptions', 'stripe-customer-portal', 'product-yc-startup-advice'],
        pathway: ['saas', 'freelance'],
      }),
    ],
  },
  workflow: {
    title: 'AI Workflow Architect',
    shortTitle: 'Workflow Architect',
    code: 'W20',
    family: 'AI 시스템 설계',
    level: 'ARCHITECT',
    color: '#74d9c4',
    visualMode: 'workflow',
    description: '특정 제품 사용법이 아니라 업무를 AI가 안전하고 반복 가능하게 수행하도록 구조화하는 4주 고밀도 과정입니다.',
    route: '터미널·로그 → 컨텍스트·메모리 → Tool·MCP·권한 → Agent·자동화·평가',
    outcomes: ['업무 흐름 모델링', '컨텍스트 설계', '최소 권한 Tool 계약', '평가·복구 가능한 Agent'],
    sessions: [
      detail({
        title: '터미널·Git·프로세스·로그',
        subtitle: '명령의 목적 · 상태 · 기록 · 복구',
        module: '01 · OPERATING LAYER',
        objective: '명령어 암기보다 현재 위치, 실행 중인 프로세스, 변경 기록과 오류 로그를 읽는 운영 감각을 만듭니다.',
        concepts: [['경로', '명령이 어느 프로젝트와 폴더에 적용되는지 결정합니다.'], ['프로세스', '실행 중인 서버와 작업의 상태입니다.'], ['Git 상태', '변경·스테이징·커밋의 기록입니다.'], ['로그', '실패 지점과 원인을 추적하는 사건 기록입니다.']],
        sequence: ['pwd·ls로 위치 확인', '프로세스 실행', '로그에서 첫 오류 찾기', 'Git diff로 변경 확인', '안전한 복구 지점 생성'],
        demo: { type: 'terminal', title: '명령을 외우지 않고 상태를 읽는 운영 콘솔', stages: ['LOCATION', 'PROCESS', 'LOG', 'DIFF', 'CHECKPOINT'] },
        compare: { bad: ['폴더 확인 없이 설치', '오류 로그 전체 무시', '문제마다 재설치'], good: ['위치·명령·예상 결과', '첫 원인부터 읽기', 'Git 체크포인트와 작은 복구'] },
        decisions: [['오류 마지막 줄만 AI에게 전달', '부족', '실행 명령과 첫 원인, 환경을 함께 전달합니다.'], ['쓰기 전 Git 상태를 확인', '좋음', '사용자 변경과 복구 범위를 파악합니다.'], ['프로세스가 멈추지 않으면 터미널을 계속 연다', '위험', '포트 충돌과 중복 실행을 확인합니다.']],
        error: { symptom: '개발 서버가 이미 사용 중인 포트로 실패', trace: 'EADDRINUSE :3000', cause: '이전 프로세스가 종료되지 않음', fix: '포트 사용 프로세스를 확인해 종료하거나 다른 포트로 실행' },
        practice: '의도적으로 경로·포트·의존성 오류를 만들고 로그·Git 상태·복구 절차를 운영 일지에 기록합니다.',
        deliverables: ['터미널 운영 일지', '오류 분석 템플릿', 'Git 복구 체크포인트'],
        sources: ['github-git', 'github-actions', 'node-download'],
      }),
      detail({
        title: '워크플로·컨텍스트·지침·메모리',
        subtitle: 'Trigger · Input · Decision · Action · Output',
        module: '02 · CONTEXT LAYER',
        objective: '반복 업무를 단계와 상태로 분해하고 현재 작업 컨텍스트, 지속 지침과 장기 지식을 구분합니다.',
        concepts: [['워크플로', '시작 조건부터 결과까지 이어지는 상태 변화입니다.'], ['현재 컨텍스트', '이번 작업에만 필요한 목표와 자료입니다.'], ['지속 지침', '항상 지켜야 할 규칙과 검증 명령입니다.'], ['메모리', '다음 작업에도 가치가 있는 검증된 지식입니다.']],
        sequence: ['업무 시작 신호 정의', '필수 입력과 결정 분리', '행동·도구·Owner 지정', '산출물과 완료 기준', '지침·메모리로 승격할 내용 선택'],
        demo: { type: 'workflow', title: '모호한 반복 업무가 실행 가능한 상태도로 변환', stages: ['TRIGGER', 'INPUT', 'DECISION', 'ACTION', 'OUTPUT', 'MEMORY'] },
        compare: { bad: ['모든 대화를 장기 메모리', '프로젝트 규칙을 매번 프롬프트', '완료 기준 없음'], good: ['현재·지속·장기 분리', '짧고 검증된 규칙', '산출물·검증·Owner 명시'] },
        decisions: [['최근 로그 전체를 영구 지침에 넣는다', '아님', '현재 작업 자료로만 사용합니다.'], ['반복 오류에서 얻은 검증 규칙을 지속 지침으로 승격', '좋음', '다음 작업의 실패를 줄입니다.'], ['모든 정보를 미리 로드한다', '비효율', '필요한 시점에 단계적으로 불러옵니다.']],
        error: { symptom: 'AI가 이전 프로젝트 규칙을 현재 작업에 잘못 적용', trace: 'stale context selected', cause: '범위와 유효기간 없는 메모리', fix: '프로젝트·경로·유효기간·근거를 메모리에 함께 저장하고 폐기 규칙 설정' },
        practice: '자신의 반복 업무 하나를 상태도로 만들고 정보들을 현재 컨텍스트·지속 지침·메모리로 분류합니다.',
        deliverables: ['워크플로 상태도', '컨텍스트 예산표', '지침·메모리 승격 규칙'],
        sources: ['codex-agents-md', 'claude-memory', 'github-git'],
      }),
      detail({
        title: 'Tool·MCP·API·인증·최소 권한',
        subtitle: '입력 계약 · 권한 · 승인 · 감사',
        module: '03 · TOOL LAYER',
        objective: 'AI가 외부 세계를 읽고 바꿀 때 필요한 Tool 계약과 최소 권한, 인증과 사람 승인 지점을 설계합니다.',
        concepts: [['Tool 계약', '언제 호출하고 무엇을 입력·반환하는지 정의합니다.'], ['MCP', '도구와 컨텍스트를 AI 앱에 표준 방식으로 연결합니다.'], ['인증', '누가 어떤 서비스에 접근하는지 증명합니다.'], ['최소 권한', '업무에 필요한 읽기·쓰기 범위만 제공합니다.']],
        sequence: ['업무에서 외부 행동 찾기', 'Tool 입력·출력·오류 정의', '읽기·쓰기 권한 분리', '민감정보·승인 지점', '호출 로그와 폐기'],
        demo: { type: 'protocol', title: 'Agent가 외부 서비스에 손을 뻗기 전 거치는 계약', stages: ['INTENT', 'TOOL', 'AUTH', 'APPROVAL', 'EXECUTE', 'AUDIT'] },
        compare: { bad: ['전체 드라이브 쓰기', '토큰을 프롬프트에 포함', '모호한 실행 Tool'], good: ['폴더·행동별 최소 권한', '보안 저장소와 만료', '구조화 입력·출력·오류'] },
        decisions: [['문서 검색 Tool에 삭제 권한도 제공', '과함', '읽기 전용으로 시작합니다.'], ['외부 전송 전 사람 승인', '좋음', '민감정보와 잘못된 행동을 통제합니다.'], ['Tool 이름을 작업 실행으로 지정', '모호', '행동·대상·결과가 드러나게 설계합니다.']],
        error: { symptom: 'Agent가 잘못된 고객 폴더에 결과를 저장', trace: 'write scope: /**', cause: '도구 입력 검증과 경로 제한이 없음', fix: '허용 경로 목록, dry-run, 쓰기 전 승인과 감사 로그 추가' },
        practice: '업무 하나의 Tool 명세를 만들고 MCP 필요성, 인증, 최소 권한, 승인과 감사 정책을 설계합니다.',
        deliverables: ['Tool 계약서', '권한 매트릭스', '승인·감사 흐름'],
        sources: ['mcp-intro', 'mcp-security', 'openai-tools', 'openai-apps-sdk', 'codex-mcp', 'claude-mcp'],
      }),
      detail({
        title: 'Agent·팀·자동화·평가·복구',
        subtitle: 'Plan · Act · Observe · Evaluate · Recover',
        module: '04 · CONTROL LAYER',
        objective: '자율성을 높이기 전에 목표, 예산, 평가, 중단, 사람 인계와 복구 경로를 가진 Agent 시스템을 설계합니다.',
        concepts: [['Agent 루프', '계획·행동·관찰·평가를 반복합니다.'], ['팀 경계', 'Owner·Specialist·Reviewer의 책임을 분리합니다.'], ['자동화', '안정된 워크플로를 일정·이벤트로 실행합니다.'], ['평가·복구', '성공 기준, 재시도 한도와 사람 인계를 둡니다.']],
        sequence: ['측정 가능한 목표', '작업·역할·도구 분해', '예산·권한·승인', '평가와 재시도', '중단·격리·사람 인계'],
        demo: { type: 'agent', title: '멈출 줄 아는 Agent가 운영 가능한 Agent다', stages: ['GOAL', 'PLAN', 'ACT', 'OBSERVE', 'EVALUATE', 'RECOVER'] },
        compare: { bad: ['성공할 때까지 무한 반복', '같은 파일 병렬 수정', '최종 책임자 없음'], good: ['최대 비용·재시도', '독립 작업만 병렬화', 'Reviewer와 Human Lead'] },
        decisions: [['Agent 수를 늘리면 항상 빨라진다', '아님', '통합 비용과 컨텍스트 중복이 생깁니다.'], ['읽기·조사 작업부터 병렬화', '좋음', '충돌 위험이 낮습니다.'], ['안정되지 않은 업무를 바로 예약 자동화', '위험', '수동 운영과 평가를 먼저 통과시킵니다.']],
        error: { symptom: '여러 Agent가 같은 설정을 다르게 수정', trace: 'merge conflict / owner duplicated', cause: '역할·파일·결정 소유권이 겹침', fix: '작업 계약과 반환 형식, 통합 Owner, 실패 격리 설정' },
        practice: '하나의 AI 업무 시스템에 Agent 루프, 역할, 비용 한도, 평가표, 실패 격리와 사람 인계를 설계합니다.',
        deliverables: ['Agent 시스템 설계도', '평가 루브릭', '비용·복구 운영표'],
        sources: ['openai-agents-sdk', 'codex-subagents', 'claude-subagents', 'github-actions'],
      }),
    ],
  },
  claude: {
    title: 'Claude Code Professional',
    shortTitle: 'Claude Code',
    code: 'C30',
    family: '도구 전문',
    level: 'PRO',
    color: '#e6a879',
    visualMode: 'claude',
    description: 'Workflow Architect의 원리를 Claude Code의 프로젝트 지침, Skills, Plugins, MCP, Hooks와 Agent Teams로 구현합니다.',
    route: '환경·탐색 → CLAUDE.md·Git → Skills → Plugins·MCP·Hooks → Agents → 자동화·배포',
    outcomes: ['Claude 저장소 운영', '재사용 Skills', 'Plugin·MCP 연결', 'Agent 팀·배포 워크스페이스'],
    sessions: [
      detail({
        title: '설치·터미널·세션·권한·저장소 탐색',
        subtitle: 'CLI · 프로젝트 범위 · 읽기·쓰기 승인',
        module: '01 · FOUNDATION',
        objective: 'Claude Code를 올바른 프로젝트 위치에서 실행하고 탐색·계획·권한 확인 후 첫 안전한 변경을 완료합니다.',
        concepts: [['세션', '현재 목표와 대화·도구 실행이 이어지는 작업 단위입니다.'], ['프로젝트 범위', 'Claude가 읽고 수정할 저장소 경계입니다.'], ['권한', '명령·파일·외부 연결을 허용하는 범위입니다.'], ['탐색', '검색과 의존성을 통해 변경 지점을 찾습니다.']],
        sequence: ['설치·로그인 확인', '프로젝트 루트에서 실행', '파일·명령 구조 탐색', '계획과 권한 검토', '작은 수정·실행 확인'],
        demo: { type: 'terminal', title: '큰 저장소에서 바로 수정하지 않는 첫 세션', stages: ['LAUNCH', 'MAP', 'PLAN', 'APPROVE', 'CHANGE', 'VERIFY'] },
        compare: { bad: ['홈 폴더에서 실행', '전면 리팩토링 요청', '모든 명령 자동 승인'], good: ['프로젝트 루트', '관련 파일과 검증부터', '행동별 권한 판단'] },
        decisions: [['설치 직후 전체 프로젝트 현대화 요청', '위험', '탐색과 작은 검증 작업부터 시작합니다.'], ['읽기·검색 후 계획을 검토', '좋음', '변경 범위와 위험을 알 수 있습니다.'], ['모든 쓰기 권한을 영구 허용', '주의', '프로젝트와 행동별로 최소화합니다.']],
        error: { symptom: 'Claude가 관련 없는 저장소 파일을 탐색', trace: 'working directory: user home', cause: '프로젝트 루트가 아닌 위치에서 시작', fix: '올바른 저장소 폴더로 이동해 새 세션 시작' },
        practice: '실제 저장소를 탐색하고 구조 설명, 변경 계획, 작은 수정, 테스트까지 한 세션으로 완료합니다.',
        deliverables: ['저장소 지도', '검토한 계획', '첫 안전한 diff'],
        sources: ['claude-overview', 'claude-quickstart', 'github-git', 'github-pull-requests'],
      }),
      detail({
        title: 'CLAUDE.md·계획·Git·Diff·테스트',
        subtitle: '프로젝트 규칙 · 변경 계약 · 검증',
        module: '02 · PROJECT CONTROL',
        objective: '반복 설명을 CLAUDE.md에 정리하고 계획, 작은 diff, 테스트와 Git 체크포인트로 변경을 운영합니다.',
        concepts: [['CLAUDE.md', '저장소에서 지속되는 프로젝트 지침입니다.'], ['계획', '목표·범위·순서·검증을 합의합니다.'], ['Diff', '실제 바뀐 코드와 의도를 비교합니다.'], ['테스트', '기대 행동이 유지되는지 실행으로 확인합니다.']],
        sequence: ['반복 규칙 추출', 'CLAUDE.md 범위 정하기', '계획 검토', '작은 diff와 테스트', 'Git commit과 세션 요약'],
        demo: { type: 'ide', title: '프롬프트 반복이 프로젝트 운영 규칙으로 정착', stages: ['FRICTION', 'RULE', 'PLAN', 'DIFF', 'TEST', 'COMMIT'] },
        compare: { bad: ['모든 문서를 CLAUDE.md에 복사', '한 번에 큰 변경', '테스트 없이 완료'], good: ['짧은 규칙과 참조', '작은 커밋', 'diff·테스트·브라우저 확인'] },
        decisions: [['일시적인 업무 요청을 영구 지침에 추가', '아님', '현재 프롬프트에 둡니다.'], ['반복되는 명령·스타일·검증 규칙을 기록', '좋음', '팀의 작업 품질을 유지합니다.'], ['사용자 변경을 되돌리고 시작', '위험', '기존 diff를 먼저 확인합니다.']],
        error: { symptom: 'CLAUDE.md 규칙이 서로 충돌', trace: 'root says npm / nested says pnpm', cause: '범위와 우선순위를 고려하지 않음', fix: '루트는 공통 규칙, 하위 파일은 해당 영역의 구체 규칙으로 정리' },
        practice: '프로젝트 CLAUDE.md를 만들고 계획→diff→테스트→commit까지 검증 가능한 변경을 수행합니다.',
        deliverables: ['CLAUDE.md', '변경 계획', '테스트가 포함된 커밋'],
        sources: ['claude-memory', 'github-git', 'github-pull-requests', 'claude-overview'],
      }),
      detail({
        title: 'Skills와 반복 작업 표준화',
        subtitle: 'Trigger · 절차 · 자료 · 검증',
        module: '03 · REUSABLE WORK',
        objective: '반복되는 한 업무를 호출 조건, 단계, 자료와 완료 검증을 가진 Claude Skill로 만듭니다.',
        concepts: [['Trigger', 'Skill을 사용해야 하는 요청과 사용하지 않을 경계입니다.'], ['절차', '순서대로 실행할 판단과 행동입니다.'], ['자료', '필요한 시점에만 읽는 예시·참고파일입니다.'], ['검증', '산출물이 통과해야 하는 체크와 명령입니다.']],
        sequence: ['반복 업무와 실패 수집', '한 가지 책임으로 축소', 'Skill 지침과 자료 분리', '정상·실패 테스트', '팀 공유와 버전 기록'],
        demo: { type: 'skill', title: '좋은 프롬프트가 재사용 가능한 작업 표준이 되는 과정', stages: ['REPEAT', 'BOUNDARY', 'SKILL', 'TEST', 'VERSION'] },
        compare: { bad: ['모든 개발을 처리하는 Skill', '자료 전부 본문 포함', '좋아 보이면 완료'], good: ['한 가지 책임', '필요한 자료만 로드', '검증 가능한 완료 조건'] },
        decisions: [['Trigger를 코딩 도움으로 작성', '모호', '구체적인 작업과 비사용 조건을 씁니다.'], ['예제와 스크립트를 별도 자료로 분리', '좋음', '컨텍스트를 아낍니다.'], ['테스트 없이 팀에 배포', '위험', '대표 정상·실패 요청으로 검증합니다.']],
        error: { symptom: '관련 없는 요청에도 Skill이 활성화', trace: 'description matched broad term', cause: '설명과 경계가 너무 넓음', fix: '명확한 Trigger·비사용 조건과 한 책임으로 축소' },
        practice: '자신의 반복 개발 업무 하나를 Claude Skill로 만들고 세 개의 테스트 요청으로 검증합니다.',
        deliverables: ['실행 가능한 Skill', '정상·실패 테스트', '버전 기록'],
        sources: ['claude-skills', 'claude-memory', 'claude-overview'],
      }),
      detail({
        title: 'Plugins·MCP·Hooks와 서비스 연결',
        subtitle: '배포 단위 · Tool · 이벤트 · 보안',
        module: '04 · EXTENSIONS',
        objective: 'Skill과 설정을 Plugin으로 묶고 MCP Tool과 Hook을 연결해 외부 서비스를 안전하게 사용합니다.',
        concepts: [['Plugin', 'Skills·Hooks·Agents·MCP 설정을 설치 가능한 단위로 묶습니다.'], ['MCP', '외부 서비스의 자료와 행동을 Tool로 제공합니다.'], ['Hook', '도구 호출 전후와 세션 이벤트에 정책을 실행합니다.'], ['보안', '토큰·권한·승인·로그를 통제합니다.']],
        sequence: ['확장할 업무 선택', 'Plugin 구성 설계', 'MCP 입력·출력·인증', 'Hook 정책과 실패 처리', '설치·호출·감사 테스트'],
        demo: { type: 'plugin', title: '개인 설정이 설치 가능한 Claude 작업 시스템으로', stages: ['SKILL', 'PLUGIN', 'MCP', 'HOOK', 'INSTALL', 'AUDIT'] },
        compare: { bad: ['토큰을 Plugin에 포함', '모든 MCP 권한 허용', 'Hook 실패 무시'], good: ['환경변수·보안 저장', '최소 Tool 권한', '차단·경고·복구 정책'] },
        decisions: [['팀 공유 Plugin에 개인 API 키 포함', '금지', '설치 후 환경변수로 설정합니다.'], ['쓰기 Tool 전 승인 Hook', '좋음', '위험 행동을 통제합니다.'], ['MCP Tool 결과를 그대로 외부 전송', '위험', '민감정보 필터를 둡니다.']],
        error: { symptom: 'Plugin 설치 후 MCP 연결 실패', trace: 'missing env CLAUDE_SERVICE_TOKEN', cause: '설치 요구사항과 인증 안내 누락', fix: '환경 검사, 설정 가이드와 연결 진단 명령 추가' },
        practice: 'Skill 하나를 Plugin으로 묶고 읽기 전용 MCP 또는 모의 Tool, 정책 Hook과 설치 가이드를 연결합니다.',
        deliverables: ['Claude Plugin', 'MCP·Hook 설정', '보안 설치 가이드'],
        sources: ['claude-plugins', 'claude-mcp', 'claude-hooks', 'mcp-intro', 'openai-tools'],
      }),
      detail({
        title: 'Subagents·Agent Teams·리뷰 게이트',
        subtitle: '역할 · 병렬 작업 · 인수인계 · 승인',
        module: '05 · MULTI AGENT',
        objective: '독립 작업만 Subagent와 Agent Team으로 분리하고 반환 형식, Reviewer와 Human Lead를 운영합니다.',
        concepts: [['Subagent', '주 컨텍스트 밖에서 전문 작업을 수행합니다.'], ['Agent Team', '여러 독립 역할이 공유 목표를 병렬 수행합니다.'], ['반환 계약', '결과·근거·변경·위험을 정해진 형식으로 돌려줍니다.'], ['리뷰 게이트', '통합 전 검토·반려·재작업·승인을 둡니다.']],
        sequence: ['병렬화 가치 판단', '역할·파일·결정 소유권', '독립 실행', '반환 요약과 증거', 'Reviewer·Human Lead 통합'],
        demo: { type: 'team', title: 'Agent 수가 아니라 경계가 팀을 만든다', stages: ['DECOMPOSE', 'OWN', 'PARALLEL', 'HANDOFF', 'REVIEW', 'MERGE'] },
        compare: { bad: ['같은 파일 동시 수정', '모든 로그 반환', '최종 책임자 없음'], good: ['독립 조사·구현·리뷰', '결론·증거·위험 요약', 'Reviewer와 Human Lead'] },
        decisions: [['UI 같은 파일을 세 Agent가 수정', '부적합', '충돌이 병렬 이익보다 큽니다.'], ['조사·테스트·리뷰를 분리', '적합', '독립성이 높습니다.'], ['Agent Teams를 모든 과제의 기본값으로 사용', '과함', '비용과 복잡도를 먼저 평가합니다.']],
        error: { symptom: 'Agent 결과가 서로 다른 전제를 사용', trace: 'contract mismatch', cause: '공통 목표·입력·반환 형식이 없음', fix: '작업 계약과 공유 결정 로그를 먼저 제공' },
        practice: '한 저장소 과제를 탐색·구현·테스트·리뷰로 분리하고 반환 계약과 품질 게이트를 적용합니다.',
        deliverables: ['멀티 Agent 작업 계약', '역할별 결과', '리뷰·통합 보고서'],
        sources: ['claude-subagents', 'claude-agent-teams', 'openai-agents-sdk', 'claude-overview'],
      }),
      detail({
        title: '자동화·배포·PR·Claude 워크스페이스',
        subtitle: '반복 실행 · CI · 인수인계 · 운영',
        module: '06 · OPERATIONS',
        objective: '안정된 Claude 작업을 자동화하고 GitHub PR, 테스트, 배포와 다음 세션 인수인계까지 연결합니다.',
        concepts: [['자동화 후보', '규칙과 검증이 안정된 반복 작업입니다.'], ['CI 게이트', '변경마다 빌드·테스트·검사를 실행합니다.'], ['PR', '변경 이유·영향·검증을 리뷰 가능한 기록으로 남깁니다.'], ['인수인계', '다음 세션이 이어갈 목표·상태·위험을 요약합니다.']],
        sequence: ['반복 작업 안정성 평가', '자동 실행과 승인 분리', '브랜치·PR·CI', '배포와 모니터링', '세션 요약·복구 지점'],
        demo: { type: 'release', title: 'Claude 세션이 팀의 릴리즈 파이프라인으로', stages: ['TASK', 'BRANCH', 'TEST', 'PR', 'DEPLOY', 'HANDOFF'] },
        compare: { bad: ['불안정 작업 예약 실행', '검사 실패에도 배포', '긴 대화만 인수인계'], good: ['수동 검증 후 자동화', 'CI·사람 승인', '결정·상태·다음 행동 요약'] },
        decisions: [['모든 수정 자동 커밋·배포', '위험', '검증과 승인 단계를 분리합니다.'], ['읽기·보고 자동화부터 시작', '좋음', '피해 범위가 작습니다.'], ['세션 종료 시 변경 파일만 기록', '부족', '목표·검증·미해결 위험도 남깁니다.']],
        error: { symptom: '자동 PR은 열리지만 항상 사람이 처음부터 다시 조사', trace: 'handoff missing context', cause: '작업 근거와 검증·위험 요약이 없음', fix: '정형화된 PR·세션 인수인계 템플릿 적용' },
        practice: 'Claude 워크스페이스에 Skill·Plugin·Agent 작업과 CI·PR·배포·인수인계 흐름을 통합합니다.',
        deliverables: ['최종 Claude 워크스페이스', '자동화·CI 흐름', 'PR·운영 매뉴얼'],
        sources: ['claude-github-actions', 'github-actions', 'github-actions-secrets', 'github-releases', 'github-pull-requests'],
      }),
    ],
  },
  codex: {
    title: 'Codex Professional',
    shortTitle: 'Codex',
    code: 'O40',
    family: '도구 전문',
    level: 'PRO',
    color: '#82c8ff',
    visualMode: 'codex',
    description: 'Workflow Architect의 원리를 Codex App·CLI·IDE, Skills, Plugins, MCP, Browser, Subagents와 GitHub Release로 구현합니다.',
    route: '환경·권한 → AGENTS.md·Git → Skills·Plugins → MCP·Browser → Subagents → Hooks·Release',
    outcomes: ['Codex 작업 계약', '재사용 Plugin', '브라우저 시각 QA', 'GitHub Release 자동화'],
    sessions: [
      detail({
        title: 'App·CLI·IDE·Workspace·Sandbox',
        subtitle: '표면 선택 · 작업공간 · 승인 · 목표',
        module: '01 · FOUNDATION',
        objective: '작업에 맞는 Codex 표면을 선택하고 Workspace, Sandbox와 승인 정책 안에서 검증 가능한 첫 작업을 완료합니다.',
        concepts: [['App', '계획·리뷰·장기 작업을 시각적으로 운영합니다.'], ['CLI·IDE', '터미널 또는 편집기 문맥에서 저장소를 다룹니다.'], ['Workspace', '사용자와 Codex가 공유하는 실제 작업 공간입니다.'], ['Sandbox', '읽기·쓰기·네트워크 영향 범위를 제한합니다.']],
        sequence: ['작업 성격으로 표면 선택', 'Workspace와 목표 확인', '권한·네트워크 범위', '탐색·계획·실행', '명령·화면으로 검증'],
        demo: { type: 'workspace', title: '같은 Codex, 다른 작업 표면과 권한', stages: ['CHOOSE', 'SCOPE', 'PLAN', 'APPROVE', 'EXECUTE', 'VERIFY'] },
        compare: { bad: ['채팅에 코드 전체 요청', '작업공간 밖 파일 추정', '무제한 권한'], good: ['실제 저장소에서 작업', '명확한 산출물·검증', '최소 권한과 필요한 승인'] },
        decisions: [['현재 Chrome 로그인 상태가 필요한 테스트를 일반 웹 검색으로 처리', '부적합', 'Chrome 연결 또는 적합한 도구를 선택합니다.'], ['로컬 UI는 인앱 Browser로 확인', '적합', 'Codex가 직접 인터랙션과 화면을 검증합니다.'], ['Sandbox 오류를 우회 명령으로 해결', '위험', '필요한 범위만 승인 요청합니다.']],
        error: { symptom: 'Codex가 파일을 찾지 못함', trace: 'path outside writable workspace', cause: 'Workspace와 실제 프로젝트 위치가 다름', fix: '올바른 폴더를 Workspace로 열고 권한 범위를 확인' },
        practice: 'App·CLI·IDE 중 작업에 맞는 표면을 골라 저장소 탐색, 작은 수정과 검증을 완료합니다.',
        deliverables: ['표면 선택 기준표', '작업 계약', '첫 검증된 변경'],
        professional: codexProfessional({
          focus: 'Codex의 핵심은 “대화형 코드 생성기”가 아니라 작업 표면, 작업공간, 권한, 검증 증거를 연결하는 실행 루프입니다. 강사는 App·CLI·IDE를 기능 목록으로 나열하지 말고 피드백 속도와 위험 범위가 다른 세 작업실로 설명합니다.',
          officialStudy: [
            'Codex는 코드 작성, 코드베이스 이해, 리뷰, 디버깅, 반복 개발 작업 자동화를 수행하는 코딩 에이전트입니다.',
            '로컬 CLI와 IDE에서는 기본적으로 네트워크가 꺼져 있고, 쓰기 범위는 활성 작업공간으로 제한되는 샌드박스와 승인 정책이 함께 작동합니다.',
            '작업 표면 선택은 취향 문제가 아니라 필요한 문맥, 확인 방식, 승인 범위, 화면 검증 필요성에 따라 달라지는 운영 판단입니다.',
          ],
          visualSimulation: '하나의 요구사항이 App 계획 보드, CLI 터미널 세션, IDE 파일 트리, Browser 시각 QA로 이동하는 “surface router” 장면을 사용합니다. 각 단계는 자동 재생하지 않고 승인 범위가 바뀌는 순간에 멈춥니다.',
          demoRun: [
            '같은 저장소에서 “작은 UI 문구 수정” 작업을 App, CLI, IDE 중 어디서 시작할지 먼저 투표시킵니다.',
            '작업공간 경로, Git 상태, 권한 상태를 보여준 뒤 Codex에게 탐색과 계획만 요청합니다.',
            '실제 수정은 한 파일 한 줄로 제한하고, 실행 명령과 브라우저 확인을 증거로 남깁니다.',
            '마지막에 “표면 선택 기준표”를 학생 프로젝트에 맞게 다시 작성하게 합니다.',
          ],
          failureDrill: [
            '작업공간 밖 파일을 요청했을 때 승인 또는 거부가 발생하는 장면을 보여줍니다.',
            '네트워크가 필요한 명령을 바로 실행하지 않고 왜 승인이 필요한지 설명합니다.',
            '경로 오류가 나면 “현재 cwd, Git root, 실제 프로젝트 폴더” 세 가지를 확인하게 합니다.',
          ],
          exercise: '학생은 자신의 프로젝트에서 App·CLI·IDE 중 하나를 선택하고, 선택 이유·필요 권한·검증 명령·성공 화면을 한 장의 작업 계약서로 작성합니다.',
          misconceptions: [
            ['Codex는 그냥 ChatGPT가 코드를 써주는 것이다', 'Codex는 저장소, 명령, diff, 브라우저, 승인 흐름과 연결될 때 개발 에이전트가 됩니다.'],
            ['권한을 크게 열수록 더 빨리 끝난다', '초보자일수록 최소 권한과 작은 변경이 오히려 복구 시간을 줄입니다.'],
          ],
          expertQuestions: [
            ['이 작업은 어느 표면에서 시작해야 하나요?', '결과를 확인해야 하는 증거가 코드 diff인지, 터미널 로그인지, 실제 화면인지부터 묻고 표면을 고르게 합니다.'],
            ['승인을 요청하면 그냥 허용하면 되나요?', '승인 전에는 명령 목적, 영향 범위, 되돌릴 방법을 한 문장으로 확인해야 합니다.'],
          ],
        }),
        sources: ['codex-overview', 'codex-security', 'github-git', 'github-pull-requests'],
      }),
      detail({
        title: 'AGENTS.md·config.toml·Rules·Git',
        subtitle: '지속 지침 · 설정 · 정책 · 변경 기록',
        module: '02 · PROJECT CONTROL',
        objective: '저장소 규칙과 개인 설정, 실행 정책을 구분하고 Git 기반의 안전한 변경 루프를 구축합니다.',
        concepts: [['AGENTS.md', '저장소와 하위 경로에 적용되는 지속 지침입니다.'], ['config.toml', '모델·권한·MCP·기능 같은 Codex 설정입니다.'], ['Rules', '허용·승인·차단할 명령 정책입니다.'], ['Git', '변경을 검토·복구·공유하는 기록입니다.']],
        sequence: ['반복 규칙과 개인 취향 분리', 'AGENTS.md 범위 설계', 'config·Rules 최소 설정', '계획·diff·테스트', '작은 commit과 리뷰'],
        demo: { type: 'config', title: '말로 반복하던 기대가 저장소 운영 체계로', stages: ['FRICTION', 'AGENTS', 'CONFIG', 'RULES', 'DIFF', 'COMMIT'] },
        compare: { bad: ['모든 설정을 AGENTS.md', '위험 명령 전체 허용', '사용자 변경 되돌리기'], good: ['지침·설정·정책 분리', '범주별 최소 승인', '현재 diff를 존중한 작은 변경'] },
        decisions: [['개인 모델 선호를 저장소 AGENTS.md에 고정', '아님', '개인 또는 프로젝트 config에 둡니다.'], ['빌드·테스트 명령을 AGENTS.md에 기록', '좋음', '검증 습관이 지속됩니다.'], ['rm 전체를 영구 허용', '금지', '구체적 안전 범위만 규칙화합니다.']],
        error: { symptom: '프로젝트 config가 적용되지 않음', trace: 'project layer ignored: untrusted', cause: '신뢰하지 않은 저장소의 프로젝트 설정', fix: '프로젝트 신뢰 상태를 확인하고 전역·프로젝트 설정 범위를 구분' },
        practice: 'AGENTS.md, 최소 config와 Rules를 설계하고 Git diff·테스트·commit까지 실행합니다.',
        deliverables: ['AGENTS.md', 'Codex 설정 설명서', '검증된 Git 커밋'],
        professional: codexProfessional({
          focus: '이 회차의 핵심은 “좋은 프롬프트”가 아니라 반복되는 기대를 저장소 운영 체계로 옮기는 것입니다. AGENTS.md는 협업 계약, config.toml은 실행 환경 설정, Rules는 위험 행동 정책, Git은 결과 검증 장부로 분리해 가르칩니다.',
          officialStudy: [
            'Codex는 작업 시작 전 전역 AGENTS.md와 프로젝트 경로상의 AGENTS.md를 읽고, 더 가까운 하위 지침이 나중에 결합되어 실무 지침을 구체화합니다.',
            'config.toml과 프로필은 모델, 승인 정책, 샌드박스, MCP 같은 실행 옵션을 관리하는 설정 계층입니다.',
            'Review와 Git diff는 Codex가 만든 변경뿐 아니라 저장소의 현재 변경 전체를 보여주므로, 사용자 변경을 보호하는 습관과 함께 설명해야 합니다.',
          ],
          visualSimulation: '왼쪽에는 전역 AGENTS.md, 루트 AGENTS.md, 하위 폴더 AGENTS.md가 층층이 쌓이는 instruction stack을 보여주고, 오른쪽에는 config와 Rules가 실행 게이트로 작동하는 회로도를 배치합니다.',
          demoRun: [
            '저장소 루트에 AGENTS.md를 만들고 “검증 명령, 스타일, 금지 행동” 세 항목만 작성합니다.',
            '하위 폴더에 더 구체적인 AGENTS.md를 두고 적용 범위가 어떻게 달라지는지 설명합니다.',
            'config.toml 예시는 실제 값보다 설정 책임을 보여주는 데 집중합니다.',
            '수정 후 git diff, 테스트, commit 메시지까지 한 번의 작은 루프로 닫습니다.',
          ],
          failureDrill: [
            'AGENTS.md에 개인 취향과 프로젝트 규칙을 섞어 팀 전체에 불필요한 규칙이 퍼지는 오류를 보여줍니다.',
            '프로젝트 설정이 신뢰되지 않아 적용되지 않는 상황을 “설정이 틀린 것”과 구분하게 합니다.',
            'AI가 만든 변경과 사용자가 만든 변경이 섞였을 때 diff 범위를 먼저 나누게 합니다.',
          ],
          exercise: '학생은 자신의 프로젝트에 맞는 AGENTS.md 초안을 작성하고, 반드시 들어갈 검증 명령 2개와 절대 하지 말아야 할 행동 2개를 정합니다.',
          misconceptions: [
            ['AGENTS.md에 많이 적을수록 좋다', '긴 지침보다 실제로 반복되는 검증, 파일 소유권, 금지 행동을 짧게 적는 편이 안정적입니다.'],
            ['config와 AGENTS.md는 같은 것이다', 'AGENTS.md는 작업 방식 지침이고 config는 실행 환경 설정입니다. 섞이면 유지보수가 어려워집니다.'],
          ],
          expertQuestions: [
            ['AGENTS.md에는 무엇을 적어야 하나요?', '프로젝트의 반복 규칙, 검증 명령, 안전 기준, 리뷰 기대치를 적고 개인 선호나 일회성 요청은 분리합니다.'],
            ['Rules는 언제 필요한가요?', '허용하거나 차단할 행동이 반복되고 위험 비용이 클 때 정책으로 분리합니다.'],
          ],
        }),
        sources: ['codex-agents-md', 'codex-config', 'codex-rules'],
      }),
      detail({
        title: 'Skills·Plugins와 재사용 작업',
        subtitle: '워크플로 작성 · 설치 단위 · 점진적 공개',
        module: '03 · REUSABLE WORK',
        objective: '반복 업무를 Skill로 설계하고 다른 환경에 설치할 수 있도록 Plugin으로 묶어 검증합니다.',
        concepts: [['Skill', '지침·자료·스크립트를 가진 재사용 워크플로입니다.'], ['점진적 공개', '필요한 자료만 선택한 시점에 읽습니다.'], ['Plugin', 'Skills·도구·Hooks·Assets를 설치 가능한 단위로 묶습니다.'], ['테스트', '명시·암시 호출과 실패 경계를 검증합니다.']],
        sequence: ['반복 업무 선택', 'Skill 책임·Trigger·자료', '대표 요청 테스트', 'Plugin 구조·매니페스트', '설치·업데이트·버전'],
        demo: { type: 'plugin', title: '개인 작업법이 설치 가능한 Codex 도구가 되는 과정', stages: ['WORKFLOW', 'SKILL', 'TEST', 'PLUGIN', 'INSTALL', 'UPDATE'] },
        compare: { bad: ['긴 프롬프트 모음', '모든 자료 항상 로드', '설치 후 버전 없음'], good: ['명확한 호출 경계', '필요한 자료만', 'Plugin 매니페스트와 업데이트 기록'] },
        decisions: [['한 Skill에 조사·구현·배포 모두 포함', '과함', '한 책임으로 나누거나 Plugin에 여러 Skill을 묶습니다.'], ['설명에 사용·비사용 조건을 명시', '좋음', '암시 호출 정확도가 높아집니다.'], ['공식 소스 없이 제품 지침 작성', '위험', '변경 가능한 기능은 출처와 확인일을 기록합니다.']],
        error: { symptom: 'Plugin 업데이트 후 Skill이 보이지 않음', trace: 'manifest cache unchanged', cause: '매니페스트·설치 캐시·버전 갱신 누락', fix: '구조 검증 후 버전과 설치 캐시를 갱신하고 재시작' },
        practice: '한 Skill을 만들고 테스트한 뒤 설치 가능한 개인 Plugin으로 패키징합니다.',
        deliverables: ['Codex Skill', 'Plugin 패키지', '테스트·업데이트 기록'],
        professional: codexProfessional({
          focus: 'Skill은 프롬프트 저장소가 아니라 특정 업무를 반복 가능한 절차로 만드는 강사용 핵심 주제입니다. Plugin은 그 Skill과 앱, MCP, Hook, 자산을 설치 가능한 배포 단위로 묶는 단계입니다.',
          officialStudy: [
            'Skill은 SKILL.md와 선택적 스크립트, 참고자료를 포함하는 디렉터리이며 Codex가 필요할 때 전체 지침을 읽는 점진적 공개 구조를 사용합니다.',
            'Skill 설명은 암시 호출 정확도에 직접 영향을 주므로 무엇을 할 때 쓰고 무엇에는 쓰지 않는지 앞부분에 명확해야 합니다.',
            'Plugin은 Skills, Apps, MCP 서버 같은 기능을 설치 가능한 워크플로 단위로 묶습니다.',
          ],
          visualSimulation: '반복 업무 로그가 “Trigger → SKILL.md → references/scripts → 검증 → plugin.json → 설치” 순서로 압축되는 패키징 라인을 보여줍니다.',
          demoRun: [
            '반복 업무 하나를 고르고 성공 조건, 입력 자료, 금지 범위를 먼저 정합니다.',
            'Skill 설명을 작성한 뒤 명시 호출과 암시 호출 두 방식으로 테스트합니다.',
            '참고자료를 항상 본문에 넣지 않고 필요한 파일로 분리하는 이유를 보여줍니다.',
            'Plugin 매니페스트에 Skill을 묶고 설치·업데이트 기록을 남깁니다.',
          ],
          failureDrill: [
            'Skill 설명이 넓어서 엉뚱한 작업에 호출되는 사례를 보여줍니다.',
            'SKILL.md에 긴 문서를 모두 붙여 context 낭비가 생기는 사례를 비교합니다.',
            'Plugin 업데이트 후 버전 또는 캐시 갱신 누락으로 보이지 않는 상황을 복구합니다.',
          ],
          exercise: '학생은 본인이 자주 반복하는 작업 하나를 Skill 후보로 정의하고, trigger, input, output, verification, out-of-scope를 작성합니다.',
          misconceptions: [
            ['Skill은 좋은 프롬프트를 저장하는 곳이다', 'Skill은 업무 절차, 필요한 자료, 검증 명령, 실패 대처까지 포함하는 재사용 워크플로입니다.'],
            ['Plugin은 복잡한 개발자만 만든다', '작게는 개인 Skill 몇 개를 설치 가능한 묶음으로 관리하는 것부터 시작할 수 있습니다.'],
          ],
          expertQuestions: [
            ['Skill과 AGENTS.md의 차이는 무엇인가요?', 'AGENTS.md는 저장소 기본 규칙이고 Skill은 특정 작업을 수행하는 절차입니다. 범위가 다릅니다.'],
            ['언제 Plugin으로 묶나요?', '다른 프로젝트나 사람에게 설치·배포·업데이트해야 할 때 Plugin으로 묶습니다.'],
          ],
        }),
        sources: ['codex-skills', 'codex-plugins', 'codex-overview'],
      }),
      detail({
        title: 'MCP·Apps·Connectors·Browser',
        subtitle: '외부 데이터 · 실제 행동 · 시각 검증',
        module: '04 · CONNECTED WORK',
        objective: '외부 서비스의 자료와 행동을 적절한 MCP·App·Connector로 연결하고 Browser로 실제 결과를 검증합니다.',
        concepts: [['MCP', '도구와 컨텍스트를 Codex에 연결합니다.'], ['App·Connector', '인증된 개인·업무 서비스의 데이터를 사용합니다.'], ['Browser', '로컬·웹 UI를 클릭하고 화면으로 검증합니다.'], ['도구 선택', '검색·API·Connector·브라우저 중 가장 직접적인 경로를 고릅니다.']],
        sequence: ['필요 데이터·행동 분류', '가장 좁은 도구 선택', '인증·권한·승인', '실행과 결과 캡처', '민감정보·실패 로그 확인'],
        demo: { type: 'connected', title: '요청에 맞는 외부 연결을 고르고 화면까지 검증', stages: ['NEED', 'SELECT', 'AUTH', 'ACT', 'BROWSER', 'EVIDENCE'] },
        compare: { bad: ['로그인 데이터도 웹 검색', '모든 MCP를 항상 연결', 'DOM만 보고 UI 완료'], good: ['Connector·API 우선', '업무별 최소 연결', '클릭·스크린샷·반응형 확인'] },
        decisions: [['개인 Gmail 내용을 웹 검색으로 찾는다', '불가', '인증된 Connector를 사용합니다.'], ['공식 API가 있으면 화면 자동화보다 API 사용', '좋음', '더 안정적이고 구조화된 결과를 얻습니다.'], ['UI 검증에서 스크린샷을 생략', '부족', '배치·겹침·가독성은 시각 확인이 필요합니다.']],
        error: { symptom: '자동 테스트는 통과했지만 버튼이 화면 밖에 있음', trace: 'DOM present / viewport clipped', cause: '동작 검사만 하고 실제 렌더링을 보지 않음', fix: '대표 해상도 스크린샷과 인터랙션 QA 추가' },
        practice: 'MCP 또는 Connector 하나를 연결하고 로컬 앱을 Browser로 조작해 동작·반응형·시각 회귀를 검증합니다.',
        deliverables: ['연결 결정표', '권한 설정', '브라우저 QA 보고서'],
        professional: codexProfessional({
          focus: '외부 연결의 핵심은 “많은 도구 연결”이 아니라 데이터 출처, 행동 권한, 인증, 시각 증거를 분리해 가장 좁은 연결을 선택하는 것입니다.',
          officialStudy: [
            'MCP는 모델에 도구와 컨텍스트를 연결하는 프로토콜이며 Codex는 STDIO 서버와 Streamable HTTP 서버, 인증, 서버 instructions를 지원합니다.',
            'MCP 서버 instructions는 도구 선택과 사용 제약을 안내하므로, 서버 전체에 적용되는 워크플로와 rate limit 같은 내용을 짧고 명확하게 작성해야 합니다.',
            '브라우저와 앱 연결은 실제 UI·개인 데이터·외부 행동을 다루므로, 승인과 side effect를 수업의 핵심 판단으로 다뤄야 합니다.',
          ],
          visualSimulation: '요청 하나가 “공개 웹 검색, 공식 API, 인증 Connector, MCP, Browser” 중 어느 경로를 타야 하는지 분기하는 권한망을 보여주고, 각 분기마다 데이터 민감도와 검증 증거가 달라지게 합니다.',
          demoRun: [
            '동일한 질문을 공개 문서 조회, 개인 계정 데이터 조회, 로컬 UI 검증 세 장면으로 나눕니다.',
            '각 장면에서 왜 web search, Connector, Browser 중 하나를 선택해야 하는지 설명합니다.',
            'MCP 연결은 도구 목록보다 권한·인증·실패 시 대체 경로를 먼저 점검합니다.',
            'Browser QA에서는 DOM 존재 여부가 아니라 클릭, 스크린샷, 반응형 화면을 증거로 남깁니다.',
          ],
          failureDrill: [
            '개인 데이터가 필요한 요청을 일반 웹 검색으로 처리하려는 잘못된 흐름을 막습니다.',
            'MCP 서버는 연결됐지만 인증이 빠져 빈 결과가 나오는 상황을 구분합니다.',
            '자동 테스트는 통과하지만 화면 배치가 깨진 사례를 Browser 스크린샷으로 찾아냅니다.',
          ],
          exercise: '학생은 자신의 프로젝트에서 외부 연결 후보 하나를 골라 공개 데이터인지, 개인 인증 데이터인지, 실제 화면 검증인지 분류하고 가장 좁은 도구를 선택합니다.',
          misconceptions: [
            ['MCP를 많이 연결할수록 더 똑똑해진다', '연결이 늘수록 권한, 비용, 오류 표면도 늘어납니다. 필요한 연결만 켜야 합니다.'],
            ['테스트가 통과하면 UI도 괜찮다', '사용자가 보는 화면은 스크린샷과 상호작용으로 별도 검증해야 합니다.'],
          ],
          expertQuestions: [
            ['MCP와 Connector는 무엇이 다른가요?', 'MCP는 도구와 컨텍스트를 연결하는 표준 경로이고, Connector는 특정 서비스의 인증된 데이터와 행동을 앱 형태로 제공하는 경우가 많습니다.'],
            ['브라우저 QA는 언제 필요한가요?', '레이아웃, 클릭 흐름, 로그인 상태, 실제 사용자 화면을 확인해야 할 때 필요합니다.'],
          ],
        }),
        sources: ['codex-mcp', 'codex-browser', 'mcp-intro', 'openai-tools', 'openai-apps-sdk'],
      }),
      detail({
        title: 'Subagents·Worktrees·리뷰·시각 QA',
        subtitle: '병렬 탐색 · 작업 격리 · 통합 · 품질',
        module: '05 · PARALLEL DELIVERY',
        objective: '독립 작업을 Subagent와 Worktree로 격리하고 리뷰·테스트·스크린샷을 통합 품질 게이트로 운영합니다.',
        concepts: [['Subagent', '탐색·테스트·리뷰 같은 독립 작업을 별도 컨텍스트에서 수행합니다.'], ['Worktree', 'Git 브랜치 작업 공간을 물리적으로 격리합니다.'], ['통합 계약', '각 작업의 파일 소유권과 반환 형식을 정합니다.'], ['품질 게이트', '코드·테스트·화면·위험을 합쳐 검토합니다.']],
        sequence: ['병렬화 가능성 판단', '역할·파일·Worktree 분리', '동시 탐색·구현·테스트', '요약·diff·증거 반환', '리뷰·통합·회귀 QA'],
        demo: { type: 'team', title: '빠른 병렬 작업이 안전한 하나의 결과로 합류', stages: ['SPLIT', 'WORKTREE', 'PARALLEL', 'REPORT', 'REVIEW', 'MERGE'] },
        compare: { bad: ['의존 작업도 동시에', '같은 파일 소유', '원시 로그 전부 반환'], good: ['독립 작업만 분리', '소유권·계약', '결론·증거·위험 요약'] },
        decisions: [['테스트와 UI 구현을 독립 Worktree로 진행', '조건부', '인터페이스 계약이 명확해야 합니다.'], ['코드 리뷰와 보안 검토를 병렬 수행', '좋음', '읽기 중심 독립 작업입니다.'], ['Subagent 결과를 검토 없이 병합', '위험', '주 Agent와 사람이 통합 책임을 집니다.']],
        error: { symptom: '각 브랜치는 통과하지만 합치면 UI가 깨짐', trace: 'integration regression', cause: '개별 테스트만 있고 통합 시나리오가 없음', fix: '병합 후 전체 사용자 흐름과 스크린샷 회귀를 다시 실행' },
        practice: '하나의 기능을 탐색·구현·테스트·리뷰로 나눠 Subagent/Worktree에서 수행하고 통합 QA합니다.',
        deliverables: ['병렬 작업 계획', '역할별 결과·증거', '통합 리뷰 보고서'],
        professional: codexProfessional({
          focus: 'Subagent와 Worktree는 속도 자랑이 아니라 컨텍스트 오염을 줄이고 독립 작업을 안전하게 병렬화하기 위한 구조입니다. 강사는 “무엇을 병렬화하면 안 되는지”를 반드시 함께 가르쳐야 합니다.',
          officialStudy: [
            'Subagent는 탐색, 테스트, 리뷰처럼 독립적인 작업을 별도 컨텍스트에서 수행해 주 대화를 요구사항과 의사결정 중심으로 유지합니다.',
            'Worktree는 같은 Git 저장소에서 별도 체크아웃을 만들어 병렬 작업이 현재 Local 작업을 방해하지 않게 합니다.',
            'Review는 Git 저장소 상태를 기준으로 변경 범위, staged/unstaged, branch diff를 확인하게 해 통합 전 검토의 기준점이 됩니다.',
          ],
          visualSimulation: '메인 관제실에서 요구사항과 통합 기준을 들고 있고, 세 개의 Worktree/Subagent가 탐색·테스트·리뷰를 병렬 수행한 뒤 요약 증거만 다시 합류하는 관제판을 보여줍니다.',
          demoRun: [
            '한 기능을 파일 소유권이 겹치지 않는 탐색, 구현, 테스트, 리뷰 작업으로 나눕니다.',
            '각 작업에 반환 형식: 결론, 변경 파일, 실행한 검증, 남은 위험을 지정합니다.',
            'Subagent 결과를 원문 로그가 아니라 요약 증거로 받는 이유를 설명합니다.',
            '통합 후 전체 사용자 흐름과 화면 QA를 다시 실행해 “각자 성공”과 “전체 성공”의 차이를 보여줍니다.',
          ],
          failureDrill: [
            '두 작업이 같은 파일을 동시에 고쳐 충돌하는 사례를 파일 소유권 계약으로 복구합니다.',
            'Subagent가 긴 로그를 그대로 반환해 본 대화가 흐려지는 사례를 요약 형식으로 줄입니다.',
            '개별 브랜치는 통과하지만 병합 후 UI가 깨지는 상황을 통합 QA로 잡습니다.',
          ],
          exercise: '학생은 본인 프로젝트의 다음 작업을 병렬 가능/불가능으로 분류하고, 병렬 가능한 작업에 대해 역할, 파일 범위, 반환 형식, 통합 검증을 작성합니다.',
          misconceptions: [
            ['작업을 많이 쪼개면 항상 빨라진다', '의존성이 크거나 같은 파일을 고치면 병렬화가 오히려 복구 비용을 키웁니다.'],
            ['Subagent가 낸 결과는 바로 합치면 된다', '주 Agent와 사람이 통합 품질과 최종 책임을 가져야 합니다.'],
          ],
          expertQuestions: [
            ['언제 Subagent를 쓰면 좋나요?', '읽기 중심 탐색, 테스트 로그 분석, 리뷰처럼 독립적이고 결과를 요약할 수 있는 작업에 좋습니다.'],
            ['Worktree와 브랜치는 어떻게 다르나요?', '브랜치는 기록의 선이고 Worktree는 그 브랜치를 실제 별도 폴더에서 작업하게 하는 공간입니다.'],
          ],
        }),
        sources: ['codex-subagents', 'codex-worktrees', 'codex-review', 'openai-agents-sdk', 'github-git', 'github-pull-requests'],
      }),
      detail({
        title: 'Hooks·Automations·GitHub Actions·Release',
        subtitle: '정책 실행 · 일정 작업 · CI · 배포 자산',
        module: '06 · OPERATIONS',
        objective: '안정된 Codex 작업을 Hook과 Automation으로 운영하고 GitHub Actions, PR과 Release까지 연결합니다.',
        concepts: [['Hook', '도구 사용 전후와 세션 이벤트에 정책을 실행합니다.'], ['Automation', '정해진 시간이나 반복 조건에서 작업을 실행합니다.'], ['GitHub Actions', '저장소 이벤트마다 빌드·테스트·배포를 수행합니다.'], ['Release', '버전·변경 기록·실행 파일·체크섬을 배포합니다.']],
        sequence: ['정책·반복 후보 선정', 'Hook·Automation 경계', 'CI 검증 명령', 'PR 승인과 태그', 'Release 자산·체크섬·복구'],
        demo: { type: 'release', title: 'Codex 작업이 검증 가능한 소프트웨어 릴리즈로', stages: ['HOOK', 'AUTOMATION', 'CI', 'PR', 'TAG', 'RELEASE'] },
        compare: { bad: ['모든 명령 Hook으로 차단', '실패한 자동화 반복', '태그와 버전 불일치'], good: ['핵심 정책만 Hook', '비용·재시도·알림', '버전 검증과 체크섬'] },
        decisions: [['API 키 패턴을 PreToolUse에서 검사', '좋음', '외부 전송 전 예방할 수 있습니다.'], ['불안정 UI 수정을 매일 자동 실행', '위험', '먼저 수동 성공률과 검증 기준을 확보합니다.'], ['PR 병합 전에 Release 태그 생성', '잘못', '검증된 main 커밋에 태그를 생성합니다.']],
        error: { symptom: 'Release에는 이전 버전 실행 파일이 올라감', trace: 'tag v3 / package 2.0.0', cause: '태그·package 버전·자산명 검증 누락', fix: 'CI에서 버전 일치 검사 후 빌드·체크섬·업로드' },
        practice: 'Hook 또는 Automation 하나와 GitHub Actions 검증, PR, 버전 태그, Release 자산 흐름을 완성합니다.',
        deliverables: ['운영 Hook·Automation', 'GitHub Actions', '최종 Codex 릴리즈 시스템'],
        professional: codexProfessional({
          focus: '마지막 회차의 핵심은 Codex가 만든 작업을 “반복 가능한 운영 체계”로 승격하는 것입니다. Hook은 정책 실행, Automation은 반복 작업, GitHub Actions는 저장소 검증, Release는 배포 증거라는 경계를 분명히 나눕니다.',
          officialStudy: [
            'Hooks는 도구 사용 전후와 세션 이벤트에 스크립트를 주입해 로깅, 비밀값 차단, 검증 강제, 메모리 생성 같은 정책을 실행할 수 있습니다.',
            'Automations와 background worktree는 반복 작업을 현재 작업과 분리해 실행하게 만들지만, 실패 반복·비용·알림·복구 기준을 함께 설계해야 합니다.',
            'Release는 버전, 변경 기록, 실행 파일, 체크섬, 복구 경로가 일치할 때 강의나 제품 운영에서 신뢰 가능한 배포 단위가 됩니다.',
          ],
          visualSimulation: 'Hook 게이트, Automation 스케줄러, GitHub Actions CI, PR 리뷰, tag, release asset이 한 줄 파이프라인으로 이어지고, 각 단계가 통과할 때만 다음 노드가 켜지는 운영 관제 화면을 보여줍니다.',
          demoRun: [
            '위험하거나 반복되는 행동 하나를 Hook 후보로 고르고, 차단할지 기록할지 검증할지 구분합니다.',
            'Automation 후보는 수동으로 세 번 성공한 읽기·검사 중심 작업부터 선정합니다.',
            'GitHub Actions에서는 build, audit, smoke, print QA 중 최소 검증 세트를 연결합니다.',
            'Release 단계에서는 package version, 태그, EXE 파일명, SHA-256이 모두 일치하는지 확인합니다.',
          ],
          failureDrill: [
            'Hook이 너무 넓게 잡혀 정상 작업까지 막는 사례를 최소 정책으로 좁힙니다.',
            '자동화가 실패를 반복하면서 비용과 알림 피로를 만드는 상황을 중지 조건과 재시도 정책으로 복구합니다.',
            '태그, package version, 릴리즈 자산명이 불일치해 이전 EXE가 배포되는 상황을 CI 버전 검사로 막습니다.',
          ],
          exercise: '학생은 자신의 Codex 워크스페이스에 적용할 운영 정책 하나, 반복 자동화 후보 하나, 릴리즈 전 검증 명령 세 개를 작성합니다.',
          misconceptions: [
            ['자동화하면 사람이 안 봐도 된다', '자동화는 반복 실행을 맡을 뿐, 승인 기준과 실패 복구 책임은 사람이 설계해야 합니다.'],
            ['Hook은 많을수록 안전하다', '너무 많은 Hook은 작업을 불안정하게 만들 수 있어 핵심 위험에만 적용해야 합니다.'],
          ],
          expertQuestions: [
            ['Hook과 CI의 차이는 무엇인가요?', 'Hook은 Codex 작업 루프 안에서 빠르게 정책을 실행하고, CI는 저장소 이벤트 기준으로 독립 검증을 수행합니다.'],
            ['언제 자동화를 켜야 하나요?', '수동으로 안정적으로 성공하고 실패 비용과 복구 기준이 명확할 때 켭니다.'],
          ],
        }),
        sources: ['codex-hooks', 'codex-automations', 'github-actions', 'github-actions-secrets', 'github-releases', 'vercel-rollback'],
      }),
    ],
  },
};

curricula['basic-current-work'] = {
  title: '바이브코딩 기초반 · 2기 V3 작업본',
  shortTitle: '기초반 2기 작업본',
  code: 'B02R',
  family: '기초 운영 개편',
  level: 'REVIEW',
  color: '#d8ff66',
  visualMode: 'foundation',
  description: '현재 운영본을 유지하면서 회차별 검수와 승격을 위해 제작하는 V3 작업본입니다.',
  route: 'AI 도구 → 바이브코딩 → 작동 구조 → 파일 구조 → 배포·보안 → 쇼케이스',
  outcomes: ['프로젝터 가독성', '수동 시연', '오프라인 대체자료', '회차별 승격'],
  sessions: [
    detail({
      title: 'AI는 도구다',
      subtitle: '목적에 맞는 AI를 선택하고 결과를 검증하는 법',
      module: 'CURRENT · 01',
      objective: '텍스트·이미지·코딩·영상 AI가 같은 요청을 서로 다른 결과로 바꾸는 장면을 보고 도구 선택 기준을 이해합니다.',
      concepts: [['생성 AI', '입력에서 새로운 텍스트·이미지·코드·영상을 만듭니다.'], ['특화 도구', '같은 AI라도 강점과 출력 형태가 다릅니다.'], ['프롬프트', '원하는 결과와 제약을 전달하는 작업 지시입니다.'], ['검증', 'AI 결과를 사람이 확인하고 다음 요청을 정합니다.']],
      sequence: ['해결할 문제를 한 문장으로 정의', '텍스트 AI로 구조 정리', '이미지 AI로 시각 결과 생성', '코딩 AI로 작동 결과 제작', '결과 비교 후 다음 도구 선택'],
      demo: { type: 'ai-landscape', title: '하나의 아이디어가 서로 다른 AI 결과로 확장되는 장면', stages: ['문제 입력', '텍스트 설계', '이미지 결과', '코드 결과', '영상 결과', '사람 검증'] },
      compare: { bad: ['도구 이름만 외움', '첫 결과를 정답으로 사용', '목표 없이 여러 AI 이동'], good: ['결과 형태로 도구 선택', '비교·수정·검증', '한 작업의 다음 단계와 연결'] },
      decisions: [['가장 유명한 AI 하나면 모든 작업에 충분하다', '아님', '출력과 작업 방식에 따라 도구를 선택합니다.'], ['AI 결과를 실제 화면과 파일로 검증한다', '좋음', '그럴듯함과 작동을 구분할 수 있습니다.'], ['좋은 결과가 나올 때까지 질문만 길게 만든다', '주의', '작은 결과를 확인하며 요청을 조정합니다.']],
      error: { symptom: '설명은 그럴듯하지만 실제 결과가 요구와 다름', trace: 'output accepted without verification', cause: '완료 기준과 검증 장면이 없음', fix: '예상 결과·제약·확인 방법을 추가하고 작은 출력부터 비교' },
      practice: '자신의 프로젝트 아이디어를 텍스트·이미지·코딩 작업으로 나누고 사용할 AI와 검증 방법을 적습니다.',
      deliverables: ['AI 작업 분해표', '도구 선택 이유', '검증 질문 세 가지'],
    }),
    detail({
      title: '바이브코딩, 우리는 코딩을 할 줄 모른다',
      subtitle: '설계 AI · AI IDE · 터미널 · 브라우저',
      module: 'CURRENT · 02',
      objective: '네 작업대를 순환하며 첫 프로젝트를 만들고 브라우저 결과를 보고 다시 수정하는 흐름을 익힙니다.',
      concepts: [['설계 AI', '만들고 싶은 것을 질문과 작업 순서로 정리합니다.'], ['AI IDE', '프로젝트 파일을 생성하고 수정합니다.'], ['터미널', '설치와 실행 상태를 확인합니다.'], ['브라우저', '실제 사용자가 보는 결과를 검증합니다.']],
      sequence: ['아이디어 설명', '완료 장면 합의', 'AI IDE에 작업 전달', '개발 서버 실행', '브라우저 확인과 수정 반복'],
      demo: { type: 'workspace', title: '요청이 네 작업대를 순환하며 결과가 되는 장면', stages: ['설계', '파일 생성', '실행', '브라우저', '피드백', '재수정'] },
      compare: { bad: ['한 번에 전체 완성 요청', '오류를 닫고 다시 생성', '결과 확인 없이 다음 기능'], good: ['작은 완료 기준', '오류를 복사해 질문', '브라우저 확인 후 다음 요청'] },
      decisions: [['AI IDE가 명령을 실행하면 확인하지 않아도 된다', '주의', '명령 목적과 실행 위치는 알아야 합니다.'], ['한 도구의 기본 흐름부터 익힌다', '좋음', '도구 비교보다 제작 반복을 먼저 배웁니다.'], ['프로젝트가 안 되면 새 폴더에서 다시 만든다', '위험', '오류와 마지막 정상 상태를 먼저 확인합니다.']],
      error: { symptom: '개발 서버가 시작되지 않음', trace: 'npm ERR! missing script: dev', cause: '프로젝트 폴더 또는 실행 명령이 다름', fix: '현재 경로와 package.json scripts를 확인해 올바른 명령 실행' },
      practice: '작은 사이트를 만들고 텍스트·색상·버튼 동작을 한 번씩 수정합니다.',
      deliverables: ['실행되는 로컬 프로젝트', '첫 작업 요청서', '수정 전후 캡처'],
    }),
    detail({
      title: '개발 용어 이해',
      subtitle: '화면 · 처리 · 저장 · 응답',
      module: 'CURRENT · 03',
      objective: '사용자 행동이 프론트엔드·API·백엔드·DB를 지나 돌아오는 과정을 보고 문제 위치를 말할 수 있습니다.',
      concepts: [['프론트엔드', '사용자가 보고 누르는 실제 화면입니다.'], ['백엔드', '권한과 업무 규칙을 처리합니다.'], ['API', '기능 사이에 요청과 응답을 전달합니다.'], ['데이터베이스', '회원·게시글·상품·주문 상태를 저장합니다.']],
      sequence: ['브라우저에서 행동', '프론트엔드 요청 생성', 'API 전달', '백엔드 규칙 처리', 'DB 저장과 응답'],
      demo: { type: 'request', title: '주문 버튼을 누른 데이터가 다녀오는 왕복 여행', stages: ['주문 클릭', '권한 확인', '재고 확인', '결제 승인', '주문 저장', '완료 응답'] },
      compare: { bad: ['화면만 보이면 완성', '실패 상태 없음', '저장 확인 안 함'], good: ['로딩·성공·실패 UI', '처리 규칙 확인', '새로고침 후 데이터 확인'] },
      decisions: [['UI가 예쁘면 기능도 완성된 것이다', '아님', '화면과 실제 처리는 별개입니다.'], ['문제 위치를 화면·처리·저장으로 나눈다', '좋음', 'AI에게 더 정확히 요청할 수 있습니다.'], ['오류 메시지는 사용자에게 숨긴다', '주의', '친절한 안내와 내부 로그가 모두 필요합니다.']],
      error: { symptom: '완료 알림은 뜨지만 주문 목록에 없음', trace: 'POST /orders 200, DB write skipped', cause: '화면 성공과 저장 성공이 연결되지 않음', fix: '저장 완료 응답 이후에만 성공 UI 표시' },
      practice: '프로젝트 핵심 버튼 하나를 화면·처리·저장·응답으로 나누어 흐름도를 작성합니다.',
      deliverables: ['기능 흐름도', '문제 위치 판단표', 'AI 수정 요청'],
    }),
    detail({
      title: '파일 구조 이해',
      subtitle: '파일 트리 · 코드 · Diff · 미리보기',
      module: 'CURRENT · 04',
      objective: 'VS Code 파일 트리에서 수정 위치와 영향 범위를 찾고 작은 diff를 브라우저 결과와 연결합니다.',
      concepts: [['src', '직접 만드는 화면과 기능 코드가 모입니다.'], ['컴포넌트', '여러 화면에서 재사용하는 UI 단위입니다.'], ['설정파일', '실행 명령과 프로젝트 규칙을 설명합니다.'], ['Git Diff', '실제로 바뀐 줄과 영향 범위를 보여줍니다.']],
      sequence: ['바꿀 화면 요소 지정', '텍스트·파일 검색', '파일 역할 확인', '작은 diff 적용', '브라우저와 Git 상태 검증'],
      demo: { type: 'ide', title: '버튼 한 줄의 수정이 브라우저 화면에 도착하는 장면', stages: ['요소 선택', '파일 검색', '코드 위치', 'Diff 검토', '미리보기', 'Git 확인'] },
      compare: { bad: ['프로젝트 전체 재작성', 'node_modules 수정', '모든 변경 승인'], good: ['관련 파일만 수정', 'src와 설정 구분', 'diff·브라우저·Git 확인'] },
      decisions: [['node_modules 안의 파일을 직접 고친다', '아님', '재설치하면 사라지는 외부 패키지입니다.'], ['공용 컴포넌트의 사용처를 확인한다', '좋음', '다른 화면에 미치는 영향을 예상합니다.'], ['작동하면 diff는 볼 필요가 없다', '위험', '원치 않는 변경이 섞일 수 있습니다.']],
      error: { symptom: '버튼 하나를 바꿨는데 모든 페이지 버튼이 변함', trace: 'Shared Button component updated', cause: '공용 컴포넌트 영향 범위를 확인하지 않음', fix: '전용 variant 또는 페이지 전용 범위로 수정' },
      practice: '프로젝트 요소 하나를 검색해 관련 파일, 공용 여부, 수정 전후 diff를 기록합니다.',
      deliverables: ['개인 파일 지도', '검토한 Git diff', '안전한 수정 기록'],
    }),
    detail({
      title: '배포와 보안 그리고 데이터',
      subtitle: 'GitHub · 배포 · 환경변수 · 권한',
      module: 'CURRENT · 05',
      objective: '코드를 저장소에 기록하고 비밀값을 분리한 뒤 공개 URL로 배포하고 오류를 복구합니다.',
      concepts: [['GitHub', '코드와 변경 기록을 보관합니다.'], ['배포', '내 컴퓨터의 프로젝트를 인터넷 서비스로 공개합니다.'], ['환경변수', 'API 키와 설정을 코드에서 분리합니다.'], ['데이터 권한', '사용자가 읽고 쓸 수 있는 범위를 제한합니다.']],
      sequence: ['비밀값과 gitignore 점검', 'commit과 push', '배포 서비스 연결', '환경변수와 권한 설정', 'URL·로그·재배포 검증'],
      demo: { type: 'deploy', title: '내 컴퓨터의 프로젝트가 실제 사용자에게 전달되는 과정', stages: ['LOCAL', 'COMMIT', 'GITHUB', 'BUILD', 'ENV', 'LIVE URL'] },
      compare: { bad: ['키를 코드에 입력', 'DB 전체 허용', '배포 성공 화면만 확인'], good: ['환경변수와 gitignore', '사용자별 최소 권한', 'URL·로그·모바일 검증'] },
      decisions: [['프론트엔드 환경변수는 모두 비밀이다', '아님', '브라우저에 전달되는 값은 볼 수 있습니다.'], ['노출된 키는 즉시 폐기하고 재발급한다', '좋음', 'Git 기록 삭제만으로 부족합니다.'], ['테스트 권한을 운영에서도 유지한다', '위험', '배포 전에 권한 규칙을 작성합니다.']],
      error: { symptom: '로컬에서는 되지만 배포 URL에서 API 오류', trace: '401 Unauthorized / ENV undefined', cause: '배포 환경변수 누락 또는 권한 설정 차이', fix: '배포 환경변수와 권한 등록 후 새 빌드하고 로그 검증' },
      practice: '프로젝트를 GitHub에 저장하고 비밀값·권한을 점검한 뒤 공개 URL로 배포합니다.',
      deliverables: ['GitHub 저장소', '공개 배포 URL', '보안·재배포 점검표'],
    }),
    detail({
      title: '쇼케이스 및 Q&A',
      subtitle: '시연 · 피드백 · 다음 단계',
      module: 'CURRENT · 06',
      objective: '프로젝트의 문제·핵심 흐름·직접 해결한 오류를 짧게 시연하고 다음 개선 한 가지를 정합니다.',
      concepts: [['문제', '누구의 어떤 불편을 해결하는지 설명합니다.'], ['핵심 시연', '가장 중요한 사용자 행동을 끝까지 보여줍니다.'], ['증거', 'URL·화면·로그·diff로 결과를 확인합니다.'], ['다음 단계', '피드백을 작은 한 작업으로 바꿉니다.']],
      sequence: ['문제와 대상 소개', '핵심 행동 시연', '어려웠던 오류와 해결', '동료 질문과 피드백', '다음 개선 한 가지 결정'],
      demo: { type: 'showcase', title: '설명보다 실제 작동을 먼저 보여주는 5분 발표', stages: ['문제', '사용자', 'LIVE DEMO', '오류 해결', '피드백', 'NEXT'] },
      compare: { bad: ['기능 목록 발표', '영상만 재생', '피드백 전부 수용'], good: ['문제와 핵심 행동', '실제 URL 시연', '근거로 다음 작업 선택'] },
      decisions: [['만든 기능을 모두 설명한다', '과함', '핵심 흐름 한 가지를 끝까지 보여줍니다.'], ['오류와 해결 과정을 함께 말한다', '좋음', '실제 제작 역량이 드러납니다.'], ['피드백을 즉시 모두 구현한다', '주의', '목표와 영향에 따라 우선순위를 정합니다.']],
      error: { symptom: '발표 직전 인터넷 또는 배포 URL이 열리지 않음', trace: 'network unavailable / live URL timeout', cause: '오프라인 대체 화면과 로컬 실행 준비가 없음', fix: '로컬 완성본, 캡처, 짧은 대체 시연 순서를 준비' },
      practice: '프로젝트를 5분 동안 시연하고 받은 피드백에서 다음 작업 한 가지를 선택합니다.',
      deliverables: ['5분 발표', '피드백 기록', '다음 개선 작업'],
    }),
  ],
};

function buildScriptSlides(session) {
  const conceptNames = session.concepts.map(([title]) => title).join(' · ');
  const professional = session.professional;
  const professionalFocus = professional
    ? professional.focus
    : `${session.title}에서 강사가 먼저 이해해야 할 심화 기준은 ${session.concepts.map(([title, copy]) => `${title}: ${copy}`).join(' / ')}입니다.`;
  const professionalStudy = professional?.officialStudy || [];
  const motionStoryboard = professional?.motionStoryboard || [];
  const studyPath = professional?.studyPath || [];
  return [
    ['표지', `오늘의 목표는 ${session.objective}`, `최근 이 주제에서 막힌 장면이 있었는지 한 명에게 묻습니다.`],
    ['작업 지도', '120분의 다섯 구간과 각 구간의 산출물을 먼저 합의합니다.', '수업이 끝날 때 무엇이 화면 밖에 남아야 하는지 질문합니다.'],
    ['핵심 개념', `${conceptNames}을 정의가 아니라 판단 순서로 연결합니다.`, `각 개념을 자신의 프로젝트 장면으로 바꾸어 말하게 합니다.`],
    ['원인과 결과', `${session.sequence.join(' → ')} 순서를 수동으로 진행합니다.`, '다음 단계에서 무엇이 달라질지 먼저 예측하게 합니다.'],
    ['대표 시연', `${session.demo.title} 장면을 자동 재생 없이 한 단계씩 실행합니다.`, '화면 변화와 확인할 로그를 수강생이 먼저 찾게 합니다.'],
    ['비교', `취약한 방식과 검증 가능한 방식의 차이를 ${session.compare.bad[0]}와 ${session.compare.good[0]}에서 시작해 설명합니다.`, '자신의 현재 작업이 어느 쪽에 가까운지 이유와 함께 답하게 합니다.'],
    ['판단', session.decisions.map(([question, , feedback]) => `${question}: ${feedback}`).join(' '), '카드를 누르기 전에 선택과 이유를 말하게 합니다.'],
    ['오류 복구', `${session.error.symptom} 증상을 고정하고 ${session.error.trace}에서 첫 원인을 읽습니다.`, '오류를 닫지 않고 AI에게 전달할 네 가지 정보를 말하게 합니다.'],
    ['업무 적용', `${session.sequence.slice(0, 5).join(' → ')}를 실제 프로젝트 장면으로 다시 연결합니다.`, '도구 이름이 바뀌어도 유지되는 판단 기준을 묻습니다.'],
    ['실습 브리프', session.practice, `완료 기준인 ${session.deliverables.join(', ')}을 화면·파일·로그로 어떻게 증명할지 질문합니다.`],
    ['실습 타이머', '40분 동안 작은 범위를 끝까지 실행하고 중간에 결과를 저장하게 합니다.', '막힌 사람에게 결과 대신 현재 상태와 다음 한 단계를 말하게 합니다.'],
    ['리뷰', `${session.deliverables.join(', ')}을 직접 실행해 확인합니다.`, '사람이 판단한 부분과 AI 결과를 검증한 근거를 묻습니다.'],
    ['다음 회차', '오늘 산출물을 다음 수업의 입력으로 보존합니다.', '다음 수업 전 한 가지 준비 행동을 말하고 종료합니다.'],
  ].map(([title, say, ask], index) => ({
    slide: index + 1,
    title,
    say,
    do: index === 4 ? `시작 버튼을 누르고 ${session.demo.stages.join(' → ')}를 수동으로 진행합니다.` : '화면 요소를 하나씩 공개하고 수강생의 시선을 한 지점에 고정합니다.',
    ask,
    expected: index === 7 ? `${session.error.cause}와 ${session.error.fix}를 연결한 답` : '자신의 프로젝트 또는 업무 사례를 포함한 한 문장 답',
    deepDive: professional
      ? `${professionalFocus} ${professionalStudy[index % Math.max(1, professionalStudy.length)] || ''}`
      : `${professionalFocus} 공식자료와 실제 시연을 연결해 수강생에게는 정의보다 판단 기준으로 설명합니다.`,
    motionCue: professional
      ? (motionStoryboard[index % Math.max(1, motionStoryboard.length)] || professional.visualSimulation)
      : `현재 화면의 핵심 요소만 강조하고 다음 단계는 발표자 클릭 전까지 멈춥니다.`,
    sourceCue: professional
      ? (studyPath[index % Math.max(1, studyPath.length)] || professionalStudy[index % Math.max(1, professionalStudy.length)] || '공식자료를 판단 기준으로만 짧게 연결합니다.')
      : '자료가 없으면 실제 프로젝트 증거와 수업 사례를 기준으로 설명합니다.',
    recovery: index === 4 ? '실제 도구가 실패하면 저장된 대체 캡처와 동일한 로그로 시연을 계속합니다.' : '응답이 없으면 구체적인 화면 예시 하나를 제시하고 다시 질문합니다.',
  }));
}

function enrichCurricula() {
  for (const [courseId, course] of Object.entries(curricula)) {
    course.sessions.forEach((session, index) => {
      const lessonNumber = String(index + 1).padStart(2, '0');
      const labRoot = `v3/projects/${courseId}/${lessonNumber}`;
      const sceneId = `${courseId}-${lessonNumber}-${session.demo.type}`;
      session.revision = courseId === 'basic-current-work' ? '3.0.0-beta.3-review' : '3.0.0';
      session.status = courseId === 'basic-current-work' ? 'review' : 'ready';
      session.visualScene = {
        id: sceneId,
        type: session.demo.type,
        title: session.demo.title,
        steps: session.demo.stages.map((label, stageIndex) => ({
          label,
          title: session.sequence[stageIndex] || label,
          detail: session.concepts[stageIndex % session.concepts.length]?.[1] || session.objective,
        })),
      };
      session.interactions = {
        controls: ['start', 'previous', 'next', 'pause', 'reset'],
        predictionPrompt: '다음 단계에서 무엇이 달라질지 먼저 말한 뒤 진행',
        decisionCards: session.decisions.length,
        failureRecovery: true,
      };
      session.assets = {
        fallbackImage: `assets/v3/fallbacks/${courseId}-${lessonNumber}.png`,
        sceneId,
      };
      session.demoProject = {
        root: labRoot,
        starter: `${labRoot}/starter`,
        broken: `${labRoot}/broken`,
        complete: `${labRoot}/complete`,
        manifest: `${labRoot}/lab.json`,
      };
      session.fallbackMedia = {
        image: `assets/v3/fallbacks/${courseId}-${lessonNumber}.png`,
        slide: `v3/deck.html?course=${courseId}&lesson=${index + 1}&slide=5&motion=low`,
      };
      session.studentMaterials = ['workbook', 'commands', 'examples', 'errors', 'assessment', 'practice-log'];
      session.instructorMaterials = ['script', 'source-study', 'demo-runbook', 'deep-dive', 'qa-bank', 'fallback', 'rehearsal'];
      session.sourceKeys = session.sources || [];
      if (session.professional) {
        const enhancements = buildProfessionalEnhancements(session);
        for (const [key, value] of Object.entries(enhancements)) {
          if (!Array.isArray(session.professional[key]) || session.professional[key].length === 0) {
            session.professional[key] = value;
          }
        }
      }
      session.scriptSlides = buildScriptSlides(session);
    });
  }
}

enrichCurricula();

const currentBasic = {
  id: 'basic-current',
  title: '바이브코딩 기초반 · 2기 운영본',
  shortTitle: '기초반 2기',
  code: 'B02',
  family: '기초',
  track: 'CURRENT COHORT · 6 WEEKS',
  level: 'START',
  status: 'active',
  visibility: 'primary',
  audience: ['studio'],
  curriculumVersion: '2기-6주',
  cohort: '2기',
  description: '현재 수업 중인 6주 운영본입니다. 기존 강의 파일과 진행 상태를 그대로 유지합니다.',
  color: '#d8ff66',
  route: 'AI 이해 → 바이브코딩 → 개발 용어 → 파일 구조 → 배포·보안 → 쇼케이스',
  outcomes: ['현재 기수 운영 유지', '기존 진행률 보존', '프로젝트 배포', '6주 수업 마무리'],
  modules: [{ id: 'current', title: '현재 2기 수업', weeks: [1, 2, 3, 4, 5, 6] }],
  sessions: [
    ['basic-01', '1강 · AI 이해', 'AI는 도구다', 'AI 종류, AI로 할 수 있는 것들, AI를 도구로 바라보는 관점', '30분 이론', 'theory', 'sessions/session-01-ai-understanding.html'],
    ['basic-02', '2강 · 바이브코딩', '코딩을 몰라도 만드는 방식', '바이브코딩 개념, AI 코딩 툴 종류, 코딩 툴 연동과 첫 실습', '30분 이론 + 30~50분 실습', 'practice', 'sessions/session-02-vibe-coding.html'],
    ['basic-03', '3강 · 개발 용어 이해', 'AI에게 일을 시키기 전에', '프론트엔드, UI/UX, 애니메이션, 백엔드, 데이터베이스, API를 실제 서비스 장면으로 이해', '30분 이론 + 30분 실습', 'practice', 'sessions/session-03-direction.html'],
    ['basic-04', '4강 · 파일 구조 이해', 'AI가 만든 프로젝트를 읽는 법', 'VS Code 파일 트리에서 수정 위치와 영향 범위, AI diff와 브라우저 결과를 확인', '20분 이론 + 40분 실습', 'practice', 'sessions/session-04-revenue.html'],
    ['basic-05', '5강 · 배포와 보안 그리고 데이터', '내 프로그램을 링크로 공유하기 전', 'GitHub, 배포, 환경변수, API 키, 데이터 권한과 재배포를 이해하고 실습', '25분 이론 + 35분 실습', 'practice', 'sessions/session-05-security-api.html'],
    ['basic-06', '6강 · 쇼케이스 및 Q&A', '발표 · 피드백 · 다음 단계', '현재 2기 수강생의 프로젝트 발표, 피드백과 다음 고도화 방향 정리', '발표 + Q&A', 'showcase', 'sessions/session-06-showcase.html'],
  ].map(([id, title, subtitle, description, duration, type, file], index) => ({
    id, title, subtitle, description, duration, type, file, moduleId: 'current',
    revision: '2기-6주-active',
    status: 'active',
    activeRevision: 'v2-active',
    revisions: [
      { id: 'v2-active', label: '현재 운영본', revision: '2기-6주', status: 'active', file },
      { id: 'v3-work', label: 'V3 개편 작업본', revision: '3.0.0-beta.3-review', status: 'review', file: `v3/deck.html?course=basic-current-work&lesson=${index + 1}` },
    ],
    preparation: ['개인 노트북', '현재 프로젝트'],
    deliverables: type === 'showcase' ? ['프로젝트 발표', '피드백 기록'] : ['수업별 실습 결과'],
    demoProject: curricula['basic-current-work'].sessions[index].demoProject,
    fallbackMedia: curricula['basic-current-work'].sessions[index].fallbackMedia,
  })),
  materials: {
    student: [
      ['basic-current-curriculum', '과정 안내·실습 기록', '현재 6주 흐름과 매주 실습 기록', 'appendix/practice-log.html'],
      ['basic-current-setup', 'Windows·Mac 설치 준비', 'Node·VS Code·AI IDE와 터미널 준비', 'appendix/handout-session2-prep.html'],
      ['basic-current-commands', '명령어·설정집', '복사 가능한 필수 명령과 오류 확인', 'appendix/command-cheatsheet.html'],
      ['basic-current-errors', '오류 해결 훈련자료', '오류 복사, 질문, 수정과 재실행', 'appendix/error-guide.html'],
      ['basic-current-submit', '배포·제출 체크리스트', '보안과 공개 URL 최종 점검', 'appendix/deployment-checklist.html'],
      ['basic-current-v3-workbook', '2기 V3 개편 실습 워크북', '현재 운영본과 함께 검수하는 회차별 작업지', 'v3/material.html?course=basic-current-work&kind=workbook&audience=student'],
      ['basic-current-v3-practice', '2기 개인 실습 기록지', '판단·변경·검증·다음 작업 기록', 'v3/material.html?course=basic-current-work&kind=practice&audience=student'],
    ],
    instructor: [
      ['basic-current-script2', '2강 상세 대본', '바이브코딩과 첫 실습 운영', 'appendix/script-session2.html'],
      ['basic-current-script3', '3강 상세 대본', '개발 구조와 용어 설명', 'appendix/script-session3.html'],
      ['basic-current-script4', '4강 상세 대본', '파일 구조 시연과 실습 운영', 'appendix/script-session4.html'],
      ['basic-current-script5', '5강 상세 대본', 'GitHub·배포·보안 수업 운영', 'appendix/script-session5.html'],
      ['basic-current-study', '강사용 공부자료', '현재 6주 과정의 핵심 개념과 예상 질문', 'appendix/instructor-study-guide.html'],
      ['basic-current-v3-script', '2기 V3 개편 상세 대본', '13장별 SAY·DO·ASK와 오류 복구', 'v3/material.html?course=basic-current-work&kind=script&audience=instructor'],
      ['basic-current-v3-source-study', '2기 공식자료 연구노트', '공식 문서의 배경·오해·시연 포인트', 'v3/material.html?course=basic-current-work&kind=source-study&audience=instructor'],
      ['basic-current-v3-fallback', '2기 오프라인 대체 화면', '회차별 V3 작업본 캡처와 대체 진행', 'v3/material.html?course=basic-current-work&kind=fallback&audience=instructor'],
      ['basic-current-v3-rehearsal', '2기 현장 리허설', '프로젝터·시연 속도·실습 복구 점검', 'v3/material.html?course=basic-current-work&kind=rehearsal&audience=instructor'],
    ],
  },
};

function materialEntries(courseId, title) {
  const query = (kind, audience = 'student') =>
    `v3/material.html?course=${encodeURIComponent(courseId)}&kind=${kind}&audience=${audience}`;
  const professionalInstructorExtras = courseId === 'workflow'
    ? [[`${courseId}-agent-mcp-skill-research`, 'Agent·MCP·Skill 전문 연구자료', '공식자료 기반 개념 경계, 슬라이드 장면, 별도 심화과정 분리 기준', 'appendix/instructor-agent-mcp-skill-research.html']]
    : [];
  return {
    student: [
      [`${courseId}-workbook`, '통합 실습 워크북', `${title} 회차별 작업지와 메모`, query('workbook')],
      [`${courseId}-commands`, 'Windows·Mac 명령어 및 설정집', '설치·실행·설정과 복구 명령', query('commands')],
      [`${courseId}-examples`, '예제·설정·복구 파일', '실습 시작본과 실패 복구 예시', query('examples')],
      [`${courseId}-errors`, '오류 사례와 해결 훈련', '로그 분석과 재실행 시나리오', query('errors')],
      [`${courseId}-assessment`, '프로젝트 체크·평가표', '제출 기준과 자기·동료 평가', query('assessment')],
      [`${courseId}-practice`, '개인 실습 기록지', '회차별 판단·변경·검증·다음 작업 기록', query('practice')],
    ],
    instructor: [
      [`${courseId}-script`, '슬라이드별 상세 대본', 'SAY·DO·ASK·예상 답변·복구·시간 조정', query('script', 'instructor')],
      [`${courseId}-source-study`, '공식자료 연구노트', '공식 문서의 배경·오해·시연 포인트', query('source-study', 'instructor')],
      [`${courseId}-demo-runbook`, '시연 운영 매뉴얼', '정상 흐름·실패 흐름·대체 화면 운영', query('demo-runbook', 'instructor')],
      [`${courseId}-deep-dive`, '강사용 심화 개념집', '회차별 쉬운 설명과 전문가 관점', query('deep-dive', 'instructor')],
      [`${courseId}-qa-bank`, '질문·답변·오류 복구집', '예상 질문, 평가 기준, 복구 시나리오', query('qa-bank', 'instructor')],
      [`${courseId}-fallback`, '오프라인 대체 화면', '인터넷·로그인·빌드 실패 시 사용하는 회차별 캡처', query('fallback', 'instructor')],
      [`${courseId}-rehearsal`, '현장 리허설 체크리스트', '프로젝터·실습 파일·시연 속도와 복구 점검', query('rehearsal', 'instructor')],
      ...professionalInstructorExtras,
    ],
  };
}

function makeCourse(id, course, visibility = 'primary') {
  const isPreview = visibility === 'preview';
  const sessions = course.sessions.map((session, index) => ({
    id: `${id}-${String(index + 1).padStart(2, '0')}`,
    title: `${index + 1}강 · ${session.title}`,
    subtitle: session.subtitle,
    description: session.objective,
    duration: '120분',
    type: 'practice',
    file: `v3/deck.html?course=${id}&lesson=${index + 1}`,
    moduleId: session.module.split('·')[0].trim().toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-'),
    preparation: session.preparation,
    deliverables: session.deliverables,
    revision: session.revision,
    status: session.status,
    visualScene: session.visualScene,
    interactions: session.interactions,
    assets: session.assets,
    demoProject: session.demoProject,
    fallbackMedia: session.fallbackMedia,
    studentMaterials: session.studentMaterials,
    instructorMaterials: session.instructorMaterials,
    sourceKeys: session.sourceKeys,
    pathway: session.pathway,
  }));

  const moduleMap = new Map();
  sessions.forEach((session, index) => {
    if (!moduleMap.has(session.moduleId)) {
      moduleMap.set(session.moduleId, {
        id: session.moduleId,
        title: course.sessions[index].module,
        weeks: [],
      });
    }
    moduleMap.get(session.moduleId).weeks.push(index + 1);
  });

  return {
    id,
    title: course.title,
    shortTitle: course.shortTitle,
    code: course.code,
    family: course.family,
    track: `${course.family.toUpperCase()} · ${course.sessions.length} WEEKS`,
    level: course.level,
    status: isPreview ? 'preview' : 'active',
    visibility,
    audience: ['studio'],
    curriculumVersion: isPreview ? '다음-4주' : 'V3',
    description: course.description,
    color: course.color,
    route: course.route,
    outcomes: course.outcomes,
    visualMode: course.visualMode,
    modules: [...moduleMap.values()],
    sessions,
    materials: materialEntries(id, course.title),
  };
}

function normalizeMaterials(course) {
  for (const audience of ['student', 'instructor']) {
    course.materials[audience] = (course.materials[audience] || []).map(
      ([id, title, description, file]) => ({ id, title, description, file, audience, courseId: course.id })
    );
  }
  return course;
}

preserveV2Sources();

const courses = [
  normalizeMaterials(currentBasic),
  normalizeMaterials(makeCourse('product', curricula.product)),
  normalizeMaterials(makeCourse('workflow', curricula.workflow)),
  normalizeMaterials(makeCourse('claude', curricula.claude)),
  normalizeMaterials(makeCourse('codex', curricula.codex)),
  normalizeMaterials(makeCourse('foundation-next', curricula['foundation-next'], 'preview')),
];

const manifest = {
  version: '3.0.0-beta.3',
  productName: 'VIBE STUDIO',
  currentCohort: '2기',
  defaultCourseId: 'basic-current',
  studentCourseIds: ['basic-current', 'product', 'workflow', 'claude', 'codex'],
  recommendedRoute: ['basic-current', 'workflow', ['claude', 'codex']],
  modes: {
    studio: { label: '강사용 로컬 스튜디오', show: ['primary', 'preview'] },
    printPreview: { label: '수강생 출력물 미리보기', show: ['primary'] },
  },
  courses,
  legacyManifest: 'archive/v2-course-manifest.json',
  appendix: [],
};

writeIfChanged(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
writeIfChanged(
  outputDataPath,
  `window.VIBE_V3_COURSES = ${JSON.stringify(curricula, null, 2)};\n`
);

console.log(`✓ V3 manifest generated: ${courses.length} studio courses`);
console.log(`✓ V3 lesson data generated: ${Object.values(curricula).reduce((sum, course) => sum + course.sessions.length, 0)} lessons`);
