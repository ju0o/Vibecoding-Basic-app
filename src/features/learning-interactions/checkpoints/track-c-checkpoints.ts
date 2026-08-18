import type { CheckpointOutcome, CheckpointQuestion } from "../core/NodeCheckpoint"

export const C05_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "c05-q1",
    question: "작은 작업으로 나누는 이유로 가장 가까운 것은?",
    choices: [
      "한 번에 더 많은 파일을 고치려고",
      "검증 가능한 성공 기준을 단계마다 두려 해서",
      "AI가 비밀 키를 원해서",
      "HTML을 쓰지 않으려고",
    ],
    answer: 1,
    whyCorrect: "각 조각에 확인 가능한 결과가 있어야 합니다.",
    whyWrong: "범위 확대·비밀·HTML 회피는 분해 목적이 아닙니다.",
  },
  {
    id: "c05-q2",
    question: "나쁜 분해 예는?",
    choices: [
      "제목 문구 변경 → 저장 확인",
      "로그인+결제+DB+배포를 한 요청에",
      "UI 문구 후 API는 다음으로 미룸",
      "성공 기준 1개씩 붙이기",
    ],
    answer: 1,
    whyCorrect: "한 요청에 과한 범위입니다.",
    whyWrong: "나머지는 작은 검증 단위에 가깝습니다.",
  },
]

export const C05_OUTCOMES: readonly CheckpointOutcome[] = [
  { id: "O-C05-1", label: "3단계 이하로 분해했다", level: "Independent" },
  { id: "O-C05-2", label: "단계별 성공 기준 1줄", level: "Explainable" },
  { id: "O-C05-3", label: "나중 일을 분리했다", level: "Assisted" },
]

export const C06_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "c06-q1",
    question: "오류 수정 Loop의 권장 순서에 가까운 것은?",
    choices: [
      "재생성 → 추측 대량 수정 → 무시",
      "재현 → 증거 → 가설 1 → 작은 수정 → 재실행",
      "비밀 키 공유 → 전체 리팩터",
      "Quiz만 풀기",
    ],
    answer: 1,
    whyCorrect: "증거 기반 한 루프입니다.",
    whyWrong: "추측·비밀·퀴즈 대체는 루프가 아닙니다.",
  },
]

export const C06_OUTCOMES: readonly CheckpointOutcome[] = [
  { id: "O-C06-1", label: "5단계 순서를 말한다", level: "Explainable" },
  { id: "O-C06-2", label: "증거 포함 요청을 썼다", level: "Independent" },
  { id: "O-C06-3", label: "한 가설·한 수정", level: "Assisted" },
]

export const C07_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "c07-q1",
    question: "AI 출력에 대한 올바른 태도는?",
    choices: [
      "생성 = 완료",
      "초안이며 범위·비밀·실행·의도를 확인한다",
      "퀴즈 점수만으로 Outcome 완료",
      "항상 커밋 후 확인",
    ],
    answer: 1,
    whyCorrect: "사람 확인(QA)이 필요합니다.",
    whyWrong: "생성≠완료, quiz≠outcome, 커밋 전 확인이 안전합니다.",
  },
]

export const C07_OUTCOMES: readonly CheckpointOutcome[] = [
  { id: "O-C07-1", label: "생성≠완료를 설명", level: "Explainable" },
  { id: "O-C07-2", label: "검사 항목 3+ 체크", level: "Independent" },
  { id: "O-C07-3", label: "비밀 미포함 확인", level: "Observed" },
]

export const C08_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "c08-q1",
    question: "이 수업에서 Agent를 어떻게 다루나?",
    choices: [
      "특정 회사 제품의 공식 이름",
      "목표를 위해 관측-행동-재관측을 반복할 수 있는 교육용 패턴 설명",
      "검증이 필요 없는 만능 시스템",
      "HTML 태그",
    ],
    answer: 1,
    whyCorrect: "educational_interpretation — 브랜드≠정의.",
    whyWrong: "제품 전유·무검증·HTML이 아닙니다.",
  },
]

export const C08_OUTCOMES: readonly CheckpointOutcome[] = [
  { id: "O-C08-1", label: "Agent≠브랜드 설명", level: "Explainable" },
  { id: "O-C08-2", label: "루프 단계 말함", level: "Explainable" },
  { id: "O-C08-3", label: "금지/범위 목록", level: "Assisted" },
]

export const C09_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "c09-q1",
    question: "SubAgent(교육) 패턴의 핵심은?",
    choices: [
      "한 에이전트에 모든 역할 몰아주기",
      "조사/작성/검토처럼 좁은 역할로 위임",
      "항상 유료 API 필수",
      "DB 스키마 이름",
    ],
    answer: 1,
    whyCorrect: "역할 분리 위임입니다.",
    whyWrong: "몰아주기·유료 필수·DB명과 무관.",
  },
]

export const C09_OUTCOMES: readonly CheckpointOutcome[] = [
  { id: "O-C09-1", label: "위임 한 줄", level: "Explainable" },
  { id: "O-C09-2", label: "3역할 표 작성", level: "Independent" },
  { id: "O-C09-3", label: "전부-한-에이전트 위험", level: "Explainable" },
]

export const C10_QUESTIONS: readonly CheckpointQuestion[] = [
  {
    id: "c10-q1",
    question: "좋은 교육용 Workflow에 빠지기 쉬운 누락은?",
    choices: [
      "사람 확인(Human-in-the-loop) 지점",
      "목표 적기",
      "작은 작업",
      "QA 체크",
    ],
    answer: 0,
    whyCorrect: "자동화만 나열하면 HITL이 빠지기 쉽습니다. (문제: 누락 위험 항목)",
    whyWrong: "목표·분해·QA는 템플릿에 이미 강조됩니다. HITL 누락이 전형적 위험입니다.",
  },
  {
    id: "c10-q2",
    question: "Workflow를 특정 CI 제품 이름으로 정의해도 되나?",
    choices: [
      "예, 업계 유일 표준이다",
      "아니오. 제품은 구현체일 수 있고 교육 정의는 단계 순서다",
      "Workflow = Database",
      "Workflow = CSS",
    ],
    answer: 1,
    whyCorrect: "educational 단계 순서이며 제품 전유가 아닙니다.",
    whyWrong: "유일 표준·DB·CSS가 아닙니다.",
  },
]

export const C10_OUTCOMES: readonly CheckpointOutcome[] = [
  { id: "O-C10-1", label: "5단계+ 워크플로 작성", level: "Independent" },
  { id: "O-C10-2", label: "HITL 지점 표시", level: "Assisted" },
  { id: "O-C10-3", label: "Track C 연결 설명", level: "Explainable" },
]
