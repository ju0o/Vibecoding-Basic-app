'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const manifestPath = path.join(root, 'src', 'content', 'course-manifest.json');
const tracksDir = path.join(root, 'src', 'content', 'tracks');
const outputDataPath = path.join(tracksDir, 'course-data-expanded.js');

const blueprints = {
  'saas-launch': {
    key: 'saas',
    family: 'SAAS PRODUCT',
    visualMode: 'product',
    theme: { bg: '#0c1010', surface: '#151d1b', text: '#f4fbf7', muted: '#9db1aa', accent: '#ffce73', second: '#70dfbd', third: '#ff8c82' },
    before: ['화면 데모부터 제작', '회원·권한은 나중에', '출시 후 관찰 기준 없음'],
    after: ['반복 핵심 행동부터 설계', '상태·권한·실패를 함께 연결', '제품 지표로 다음 실험 선택'],
    nodeCopy: ['사용자가 시작하는 조건', '서비스가 기억할 상태', '권한과 예외를 처리하는 규칙', '반복 가치가 확인되는 결과'],
    steps: ['사용 장면 정의', '상태와 화면 설계', '기능과 데이터 연결', '실패·지표 검증'],
    choices: [
      ['기능이 많아 보이도록 먼저 확장', '핵심 가치가 검증되기 전에 운영 복잡도만 커집니다.', 'weak'],
      ['핵심 행동과 상태 변화를 먼저 설계', '화면, 데이터와 운영 기준을 하나의 흐름으로 연결할 수 있습니다.', 'strong'],
      ['성공 화면만 만들고 오류는 출시 후 처리', '가입·결제·권한 실패가 실제 사용을 막을 수 있습니다.', 'weak']
    ],
    failure: ['핵심 행동이 여러 개', '사용자 상태와 권한 누락', '운영·측정 화면 없음'],
    recovery: ['한 번의 반복 가치로 축소', '상태표와 역할별 권한 작성', '로그·문의·지표를 제품에 포함'],
    checklist: ['반복해서 쓸 이유가 보인다', '사용자 상태가 정의됐다', '실패와 권한이 설계됐다', '출시 후 볼 지표가 있다'],
    promptLead: '작은 SaaS 제품 설계자처럼',
    sourceLinks: []
  },
  freelance: {
    key: 'freelance',
    family: 'CLIENT DELIVERY',
    visualMode: 'delivery',
    theme: { bg: '#110d0f', surface: '#20171a', text: '#fff7f8', muted: '#c1a7ad', accent: '#ff8f8f', second: '#ffd07a', third: '#8ed9cc' },
    before: ['예쁜 결과만 제시', '범위와 제외 조건이 없음', '수정 요청을 채팅으로만 관리'],
    after: ['문제·과정·결과를 증명', '범위·일정·승인을 문서화', '검수와 인수인계를 기록'],
    nodeCopy: ['고객이 판단할 증거', '작업 범위와 책임 경계', '변경을 승인하는 기록', '안전하게 넘겨줄 산출물'],
    steps: ['요청을 구조화', '범위와 근거 합의', '중간 검수 운영', '납품·인계 확인'],
    choices: [
      ['요청을 받은 즉시 전체 제작 시작', '범위와 완료 기준이 없어 수정 비용을 예측하기 어렵습니다.', 'weak'],
      ['필수·선택·제외·승인 기준을 먼저 합의', '고객과 제작자가 같은 완료 장면을 보게 됩니다.', 'strong'],
      ['모든 계정을 제작자 소유로 유지', '납품 후 고객의 운영과 보안에 큰 위험이 됩니다.', 'weak']
    ],
    failure: ['문제보다 화면만 강조', '무한 수정과 구두 합의', '계정·환경변수 인계 누락'],
    recovery: ['전후와 역할을 사례로 기록', '마일스톤별 승인', '인수인계 체크리스트'],
    checklist: ['문제와 결과가 보인다', '포함·제외 범위가 있다', '수정 승인 기록이 있다', '계정과 운영 문서가 준비됐다'],
    promptLead: '외주 프로젝트 매니저처럼',
    sourceLinks: []
  },
  automation: {
    key: 'automation',
    family: 'WORKFLOW AUTOMATION',
    visualMode: 'automation',
    theme: { bg: '#08110f', surface: '#10201c', text: '#f0fff9', muted: '#91afa5', accent: '#76e0c2', second: '#7eb8ff', third: '#ffd56e' },
    before: ['반복이면 모두 자동화', '정상 흐름만 연결', '실패해도 조용히 넘어감'],
    after: ['빈도·규칙·위험으로 선택', '입력·판단·예외를 설계', '로그·재시도·승인을 운영'],
    nodeCopy: ['실행을 시작하는 신호', '받아야 할 입력과 형식', '자동으로 해도 되는 판단', '실패를 발견하고 멈추는 장치'],
    steps: ['트리거 확인', '입력과 규칙 정리', '액션과 연결 실행', '로그·예외 검증'],
    choices: [
      ['예외가 많은 승인 업무를 완전 자동화', '사람의 판단이 필요한 지점까지 기계에 넘기면 위험합니다.', 'weak'],
      ['규칙이 명확한 반복부터 자동화', '작은 범위에서 비용과 실패 패턴을 안전하게 확인할 수 있습니다.', 'strong'],
      ['실패 알림 없이 매시간 재시도', '중복 실행과 비용 증가를 발견하기 어렵습니다.', 'weak']
    ],
    failure: ['자동화 대상이 부적절', '중복·타임아웃 미처리', '로그와 사람 승인 없음'],
    recovery: ['규칙성과 위험 재평가', '멱등성·재시도 정책', '알림·승인·중단 지점'],
    checklist: ['자동화할 이유가 수치로 보인다', '트리거와 입력이 명확하다', '중복과 실패가 처리된다', '사람 승인과 로그가 있다'],
    promptLead: '업무자동화 아키텍트처럼',
    sourceLinks: []
  },
  mcp: {
    key: 'mcp',
    family: 'MODEL CONTEXT PROTOCOL',
    visualMode: 'protocol',
    theme: { bg: '#07101a', surface: '#101d2a', text: '#f2f8ff', muted: '#96abc0', accent: '#74c7ff', second: '#9c8cff', third: '#70dfbd' },
    before: ['복사·붙여넣기로 연결', '도구 권한을 한 번에 허용', '입출력 형식이 모호함'],
    after: ['표준화된 연결 계약', '최소 권한과 승인 지점', '구조화된 결과와 오류'],
    nodeCopy: ['AI 앱이 연결을 요청하는 위치', '서버가 제공하는 기능과 자료', '호출할 수 있는 실제 행동', '권한·결과·오류를 확인하는 계약'],
    steps: ['연결 목적 정의', '서버·도구 발견', '권한과 입력 계약', '호출·로그·복구'],
    choices: [
      ['편의를 위해 전체 디스크 쓰기 허용', '잘못된 호출이 영향을 미치는 범위가 지나치게 큽니다.', 'weak'],
      ['필요한 자료와 Tool만 최소 권한으로 공개', 'Agent가 할 수 있는 행동과 위험을 명확히 통제합니다.', 'strong'],
      ['Tool 이름을 실행하기로 지정', '언제 무엇을 호출해야 하는지 모델이 판단하기 어렵습니다.', 'weak']
    ],
    failure: ['연결 목적 불명확', '과도한 읽기·쓰기 권한', '민감정보와 오류 노출'],
    recovery: ['업무 한 장면으로 범위 축소', '최소 권한과 승인 분리', '필터·감사 로그·폐기'],
    checklist: ['Host·Client·Server를 구분한다', 'Tool 입력과 출력이 명확하다', '권한 범위가 최소다', '실패와 감사 기록이 있다'],
    promptLead: 'MCP 시스템 설계자처럼',
    sourceLinks: [['MCP 공식 문서', 'https://modelcontextprotocol.io/docs/getting-started/intro']]
  },
  skills: {
    key: 'skills',
    family: 'REUSABLE AI SKILLS',
    visualMode: 'skill',
    theme: { bg: '#0d0b15', surface: '#181426', text: '#faf7ff', muted: '#aaa0bf', accent: '#b59cff', second: '#74d9ff', third: '#ffe17d' },
    before: ['매번 긴 프롬프트 작성', '자료를 항상 전부 로드', '좋아 보이면 완료'],
    after: ['한 가지 책임의 재사용 지침', '필요한 자료만 단계적으로 사용', '검증 조건을 통과해야 완료'],
    nodeCopy: ['언제 이 Skill을 불러올지', '어떤 정보를 받아야 하는지', '어떤 순서와 도구를 쓸지', '어떤 결과를 통과시킬지'],
    steps: ['책임과 Trigger', '입력·자료 구조', '절차와 도구 실행', '검증·버전 관리'],
    choices: [
      ['모든 개발을 처리하는 하나의 Skill', '사용 조건과 완료 기준이 너무 넓어집니다.', 'weak'],
      ['반복되는 한 업무를 검증 가능하게 표준화', '사용 시점과 품질을 팀이 함께 재사용할 수 있습니다.', 'strong'],
      ['예시와 참고자료를 본문에 모두 넣기', '항상 불필요한 컨텍스트를 사용하게 됩니다.', 'weak']
    ],
    failure: ['책임 범위가 넓음', 'Trigger와 입력이 모호함', '검증·변경 기록 없음'],
    recovery: ['한 가지 작업으로 축소', '사용·비사용 조건 명시', '테스트와 버전 기록'],
    checklist: ['한 문장 책임이 있다', '입력과 산출물이 명확하다', '자료가 단계적으로 분리됐다', '검증과 버전 기준이 있다'],
    promptLead: 'AI Skill 설계자처럼',
    sourceLinks: []
  },
  agents: {
    key: 'agents',
    family: 'AGENT ARCHITECTURE',
    visualMode: 'agent',
    theme: { bg: '#071016', surface: '#101d24', text: '#effbff', muted: '#91aeb8', accent: '#66d6eb', second: '#a990ff', third: '#78e4a7' },
    before: ['한 번의 답변만 기대', '도구를 무제한 허용', '실패하면 같은 요청 반복'],
    after: ['목표와 상태를 가진 루프', '행동별 권한과 승인', '평가 후 전략 변경·중단'],
    nodeCopy: ['달성해야 할 측정 가능한 상태', '작업을 나누는 계획', '환경을 바꾸는 도구 행동', '결과를 평가하고 다음을 정하는 관찰'],
    steps: ['목표·제약 정의', '작업과 상태 분해', '도구 실행·관찰', '평가·복구·중단'],
    choices: [
      ['성공할 때까지 무제한 반복', '비용과 잘못된 행동을 통제할 수 없습니다.', 'weak'],
      ['완료 기준과 최대 재시도, 사람 인계 조건 설정', 'Agent의 자율성과 책임 경계를 함께 운영할 수 있습니다.', 'strong'],
      ['모든 쓰기 도구를 자동 승인', '속도는 빨라도 피해를 막는 지점이 사라집니다.', 'weak']
    ],
    failure: ['완료 상태가 모호함', '도구 권한과 비용 무제한', '실패 원인 없이 반복'],
    recovery: ['평가 가능한 목표', '예산·승인·중단 조건', 'trace 분석 후 전략 변경'],
    checklist: ['목표가 측정 가능하다', '상태와 도구가 분리됐다', '재시도와 비용 한도가 있다', '사람에게 넘길 조건이 있다'],
    promptLead: 'Agent 시스템 아키텍트처럼',
    sourceLinks: []
  },
  'agent-teams': {
    key: 'teams',
    family: 'MULTI AGENT TEAM',
    visualMode: 'team',
    theme: { bg: '#110b15', surface: '#21152a', text: '#fff5ff', muted: '#b9a0c0', accent: '#f0a8ff', second: '#72d8ff', third: '#ffd071' },
    before: ['Agent 수부터 늘림', '같은 파일을 동시에 수정', '최종 책임자가 없음'],
    after: ['병렬화 이유부터 판단', '역할·파일·결정 소유권', 'Reviewer와 Human Lead'],
    nodeCopy: ['전체 목표와 최종 결정', '전문 영역을 독립 수행', '결과를 검토하고 반려', '공통 형식으로 합류하는 지점'],
    steps: ['팀 필요성 판단', '역할과 소유권 배정', '병렬 실행·인수인계', '리뷰·통합·격리'],
    choices: [
      ['세 Agent가 같은 UI 파일을 동시에 수정', '충돌 해결 비용이 병렬화 이익보다 커집니다.', 'weak'],
      ['독립 조사·구현·리뷰를 명확한 반환 형식으로 분리', '각 역할의 전문성과 검증을 유지하며 합류할 수 있습니다.', 'strong'],
      ['모든 중간 로그를 Lead에게 반환', '주 컨텍스트가 불필요한 세부정보로 가득 찹니다.', 'weak']
    ],
    failure: ['역할과 파일 소유권 중복', '공통 산출물 형식 없음', '오류가 팀 전체로 전파'],
    recovery: ['Owner·Specialist·Reviewer 분리', '반환 템플릿과 품질 게이트', '작업·권한·비용 격리'],
    checklist: ['팀이 필요한 이유가 있다', '역할별 소유권이 있다', '반환 형식과 리뷰가 있다', '최종 Human Lead가 있다'],
    promptLead: '멀티 Agent 팀 리드처럼',
    sourceLinks: []
  },
  'claude-code': {
    key: 'claude',
    family: 'CLAUDE CODE',
    visualMode: 'terminal-warm',
    theme: { bg: '#120e0b', surface: '#211914', text: '#fff9f2', muted: '#bba99a', accent: '#e7a879', second: '#f0d28c', third: '#8dd7c6' },
    before: ['바로 수정부터 요청', '프로젝트 규칙을 매번 설명', '긴 작업을 한 세션에 몰아넣음'],
    after: ['탐색과 계획 후 수정', 'CLAUDE.md·Skill로 규칙 유지', '세션·체크포인트·리뷰 운영'],
    nodeCopy: ['현재 저장소와 세션 범위', '읽기·수정·명령 도구', '지속되는 프로젝트 지침', 'diff·테스트·Git 검증'],
    steps: ['저장소 탐색', '계획과 권한 확인', '작은 변경·명령 실행', 'diff·테스트·인수인계'],
    choices: [
      ['큰 저장소에서 즉시 전면 리팩토링', '의존성과 사용자 변경을 놓칠 가능성이 큽니다.', 'weak'],
      ['관련 파일과 검증 명령을 찾은 뒤 작은 diff로 진행', '변경 이유와 위험을 단계별로 확인할 수 있습니다.', 'strong'],
      ['CLAUDE.md에 모든 참고자료를 붙여넣기', '항상 불필요한 컨텍스트를 사용하고 규칙이 흐려집니다.', 'weak']
    ],
    failure: ['탐색 없이 수정', '지침 범위와 우선순위 충돌', 'diff·테스트 없이 완료'],
    recovery: ['검색·의존성·변경 범위', 'CLAUDE.md와 자료 분리', '작은 commit과 세션 요약'],
    checklist: ['관련 파일을 먼저 찾았다', '권한과 변경 범위가 보인다', 'diff와 테스트를 검토했다', '다음 세션 인수인계가 있다'],
    promptLead: 'Claude Code 운영 코치처럼',
    sourceLinks: [['Claude Code 공식 문서', 'https://code.claude.com/docs/en/overview']]
  },
  codex: {
    key: 'codex',
    family: 'OPENAI CODEX',
    visualMode: 'terminal-cool',
    theme: { bg: '#081019', surface: '#111d2a', text: '#f1f8ff', muted: '#95aabd', accent: '#8bc7ff', second: '#8ce6c6', third: '#d5a8ff' },
    before: ['요청만 길게 작성', '코드 생성으로 완료 판단', '독립 작업도 순서대로 처리'],
    after: ['목표·제약·검증을 계약', '브라우저와 테스트로 실제 확인', 'Skills·도구·병렬 작업 운영'],
    nodeCopy: ['공유 작업공간과 현재 목표', '읽기·쓰기 권한과 도구', '반복 업무를 재사용하는 Skill', '브라우저·테스트·GitHub 검증'],
    steps: ['목표와 완료 조건', '계획·도구·권한', '구현과 병렬 작업', '시각 QA·저장소 릴리즈'],
    choices: [
      ['파일 전체 코드를 채팅으로만 요청', '실제 저장소 상태와 검증 흐름을 활용하지 못합니다.', 'weak'],
      ['산출물과 검증 방법을 정하고 작업공간에서 실행', '계획, 구현, 브라우저 확인과 Git 기록이 연결됩니다.', 'strong'],
      ['독립적이지 않은 수정까지 모두 병렬화', '파일 충돌과 결과 통합 비용이 커집니다.', 'weak']
    ],
    failure: ['완료 기준 없는 요청', '화면·테스트 검증 누락', '병렬 작업의 소유권 충돌'],
    recovery: ['산출물·제약·검증 명시', '브라우저·명령으로 확인', '독립 작업만 분리·통합'],
    checklist: ['작업 목표와 완료 기준이 있다', '필요한 Skill과 도구를 골랐다', '실제 화면과 테스트를 확인했다', 'commit·PR·릴리즈가 연결된다'],
    promptLead: 'Codex 작업 설계자처럼',
    sourceLinks: [['OpenAI Codex 공식 문서', 'https://developers.openai.com/codex']]
  },
  'instructor-master': {
    key: 'instructor',
    family: 'INSTRUCTOR MASTERY',
    visualMode: 'studio',
    theme: { bg: '#0e1009', surface: '#1a1e12', text: '#fbfff0', muted: '#abb398', accent: '#d7f58b', second: '#79d8cc', third: '#ffb786' },
    before: ['아는 내용을 모두 설명', '애니메이션을 장식으로 사용', '실습 속도 차이를 개인 문제로 둠'],
    after: ['한 장면에 한 판단', '움직임이 원인과 결과를 설명', '질문·오류·속도 차이를 수업 구조로 운영'],
    nodeCopy: ['수강생이 수업 후 할 수 있는 판단', '오개념을 깨는 시각 장면', '이해를 확인하는 질문과 행동', '다음 개편으로 남기는 기록'],
    steps: ['학습자와 목표 진단', '비유·시각 장면 설계', '대본·질문·실습 운영', '피드백·개편 기록'],
    choices: [
      ['용어 정의를 한 슬라이드에 모두 배치', '초보자는 단어를 기억하느라 구조를 이해하지 못합니다.', 'weak'],
      ['한 장면에서 하나의 원인과 결과를 직접 조작', '말을 줄이고 수강생의 판단을 화면으로 확인할 수 있습니다.', 'strong'],
      ['빠른 수강생 기준으로 실습을 진행', '뒤처진 수강생의 불안과 오류가 누적됩니다.', 'weak']
    ],
    failure: ['정보량 과다', '장식 애니메이션', '질문과 실습 복구 계획 없음'],
    recovery: ['한 장면 한 판단', '수동 단계 애니메이션', '예상 질문·오류·시간 플랜'],
    checklist: ['학습 목표가 행동으로 쓰였다', '비유와 실제 개념이 연결된다', '질문과 예상 답변이 있다', '실습 복구와 개편 기록이 있다'],
    promptLead: '비개발자 교육 설계자처럼',
    sourceLinks: []
  }
};

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8') === content) return false;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

function cleanTitle(title) {
  return title.replace(/^\d+강\s*·\s*/, '');
}

function getTerms(subtitle) {
  const terms = subtitle.split('·').map((term) => term.trim()).filter(Boolean);
  const fallback = ['목표', '구조', '실행', '검증'];
  while (terms.length < 4) terms.push(fallback[terms.length]);
  return terms.slice(0, 4);
}

function parsePracticeMinutes(duration, type) {
  if (type === 'theory') return 15;
  const matches = [...duration.matchAll(/(\d+)분/g)].map((match) => Number(match[1]));
  return matches.length > 1 ? matches[matches.length - 1] : 30;
}

function buildLesson(course, session, index, blueprint) {
  const title = cleanTitle(session.title);
  const terms = getTerms(session.subtitle || '');
  const nextSession = course.sessions[index + 1];
  const stepCopy = [
    `${session.description} 먼저 ${terms[0]}의 범위와 현재 상태를 한 장면으로 확인합니다.`,
    `${terms[1]}을 화면, 데이터, 역할 또는 문서의 구조로 구체화합니다.`,
    `${terms[2]} 단계에서 실제 행동과 권한, 연결되는 결과를 차례로 실행합니다.`,
    `${terms[3]} 기준으로 성공, 실패와 다음 행동을 검증하고 기록합니다.`
  ];

  return {
    title,
    subtitle: session.subtitle,
    objective: session.description,
    before: blueprint.before,
    after: blueprint.after,
    mapTitle: `${title}을 이해하는 네 가지 판단 축`,
    nodes: terms.map((term, termIndex) => [term, blueprint.nodeCopy[termIndex]]),
    steps: blueprint.steps.map((step, stepIndex) => [step, stepCopy[stepIndex]]),
    choices: blueprint.choices,
    caseTitle: `${terms[0]}에서 ${terms[3]}까지 실제 흐름`,
    caseSteps: [terms[0], terms[1], terms[2], terms[3], '검증·기록 완료'],
    failure: blueprint.failure,
    recovery: blueprint.recovery,
    checklist: blueprint.checklist,
    prompt: `${blueprint.promptLead} 내 프로젝트의 "${title}"을 함께 설계해줘. 바로 답을 만들지 말고 현재 상황과 제약을 질문한 뒤 ${terms.join(', ')}을 흐름표로 정리하고 성공·실패 기준과 검증 순서까지 제안해줘.`,
    timerMinutes: parsePracticeMinutes(session.duration, session.type),
    practice: `내 프로젝트나 업무를 기준으로 "${title}" 설계표와 다음 행동 한 가지를 완성하세요.`,
    next: nextSession
      ? [cleanTitle(nextSession.title), nextSession.subtitle]
      : ['과정 완료', '작성한 설계표를 실제 프로젝트에 적용하고 운영 기록을 남깁니다.']
  };
}

function lessonHtml(courseKey, lessonNumber, title) {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' file:; script-src 'self' file:; style-src 'self' 'unsafe-inline' file:; img-src 'self' data: file:; font-src 'self' data: file:; object-src 'none'; base-uri 'self';">
  <title>${title}</title>
  <link rel="stylesheet" href="../assets/fonts/pretendard.css">
  <link rel="stylesheet" href="./course-deck.css">
</head>
<body data-course="${courseKey}" data-lesson="${lessonNumber}">
  <main class="deck" id="deck"></main>
  <nav class="nav" aria-label="슬라이드 이동">
    <button id="prev" type="button" aria-label="이전 슬라이드">‹</button>
    <span id="counter"></span>
    <button id="next" type="button" aria-label="다음 슬라이드">›</button>
  </nav>
  <script src="./course-data.js"></script>
  <script src="./course-data-expanded.js"></script>
  <script src="./course-deck.js"></script>
</body>
</html>
`;
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const expanded = {};
let generatedCount = 0;

for (const course of manifest.courses) {
  const blueprint = blueprints[course.id];
  if (!blueprint) continue;

  course.status = 'active';
  expanded[blueprint.key] = {
    courseId: course.id,
    courseTitle: course.title,
    courseCode: course.code,
    family: blueprint.family,
    visualMode: blueprint.visualMode,
    sourceLinks: blueprint.sourceLinks,
    theme: blueprint.theme,
    lessons: course.sessions.map((session, index) => {
      const fileName = `${session.id}.html`;
      session.file = `tracks/${fileName}`;
      delete session.planned;
      writeIfChanged(
        path.join(tracksDir, fileName),
        lessonHtml(blueprint.key, index + 1, `${course.title} ${index + 1}강`)
      );
      generatedCount += 1;
      return buildLesson(course, session, index, blueprint);
    })
  };
}

for (const [courseId, courseKey] of Object.entries({ practical: 'practical', advanced: 'advanced' })) {
  const course = manifest.courses.find((item) => item.id === courseId);
  if (!course) continue;
  course.sessions.forEach((session, index) => {
    const fileName = path.basename(session.file);
    writeIfChanged(
      path.join(tracksDir, fileName),
      lessonHtml(courseKey, index + 1, `${course.title} ${index + 1}강`)
    );
    generatedCount += 1;
  });
}

manifest.appendix = manifest.appendix.filter((item) => !item.generatedTrackMaterial);
const courseKeyMap = {
  practical: 'practical',
  advanced: 'advanced',
  ...Object.fromEntries(Object.entries(blueprints).map(([courseId, blueprint]) => [courseId, blueprint.key]))
};

for (const course of manifest.courses) {
  if (course.id === 'basic') continue;
  const courseKey = courseKeyMap[course.id];
  if (!courseKey) continue;

  manifest.appendix.push(
    {
      id: `${course.id}-student-workbook`,
      title: `${course.title} 수강생 워크북`,
      subtitle: `${course.sessions.length}개 회차 핵심 요약 · 판단표 · 실습 메모`,
      description: `${course.title} 전 회차의 핵심 개념, 체크리스트와 내 프로젝트 적용 메모를 과정 순서대로 작성하는 A4 프린트 자료입니다.`,
      icon: 'WORKBOOK',
      code: course.code,
      audience: 'student',
      courseId: course.id,
      scopeLabel: '과정 전체',
      file: `appendix/course-materials.html?course=${courseKey}&audience=student`,
      generatedTrackMaterial: true
    },
    {
      id: `${course.id}-instructor-guide`,
      title: `${course.title} 강사용 운영 가이드`,
      subtitle: `${course.sessions.length}개 회차 설명 핵심 · 질문 · 오개념 · 교정`,
      description: `${course.title}을 가르치기 전 회차별 설명 순서, 화면 조작, 질문 유도, 예상 오개념과 교정 기준을 공부하고 인쇄하는 강사용 자료입니다.`,
      icon: 'TEACH',
      code: course.code,
      audience: 'instructor',
      courseId: course.id,
      scopeLabel: '과정 전체',
      file: `appendix/course-materials.html?course=${courseKey}&audience=instructor`,
      generatedTrackMaterial: true
    }
  );
}

const outputData = `window.VIBE_TRACKS = window.VIBE_TRACKS || {};
Object.assign(window.VIBE_TRACKS, ${JSON.stringify(expanded, null, 2)});
`;

writeIfChanged(outputDataPath, outputData);
writeIfChanged(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`✓ generated ${generatedCount} professional track lessons`);
