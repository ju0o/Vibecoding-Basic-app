import type { ModelRoutingUnitId } from "@/lib/model-routing/contract"

export type QuizOption = {
  readonly id: string
  readonly label: string
  readonly correct: boolean
  readonly explain: string
}

export type UnitQuiz = {
  readonly unitId: ModelRoutingUnitId
  readonly prompt: string
  readonly options: readonly QuizOption[]
}

export const UNIT_QUIZZES: readonly UnitQuiz[] = [
  {
    unitId: "lu-task-classification",
    prompt: "Task Classification의 직접 목적은?",
    options: [
      {
        id: "a",
        label: "실행 전에 작업 속성을 명시해 이후 경로 선택의 입력을 만든다",
        correct: true,
        explain: "분류는 라우팅의 입력이다.",
      },
      {
        id: "b",
        label: "가장 비싼 모델을 고른다",
        correct: false,
        explain: "모델 선택은 Model Routing 단계다.",
      },
      {
        id: "c",
        label: "배포를 즉시 실행한다",
        correct: false,
        explain: "배포는 고위험 실행 단계다.",
      },
    ],
  },
  {
    unitId: "lu-task-routing",
    prompt: "분류 후 Task Routing이 하는 일은?",
    options: [
      {
        id: "a",
        label: "어느 처리 경로(파이프라인)로 보낼지 정한다",
        correct: true,
        explain: "경로 선택이 Task Routing이다.",
      },
      {
        id: "b",
        label: "공식 벤더 가격을 조회한다",
        correct: false,
        explain: "교육용 시뮬레이터는 가격 API를 쓰지 않는다.",
      },
      {
        id: "c",
        label: "KB를 삭제한다",
        correct: false,
        explain: "관련 없음.",
      },
    ],
  },
  {
    unitId: "lu-executor-routing",
    prompt: "스크립트로 충분한 일을 Agent에게만 맡기면?",
    options: [
      {
        id: "a",
        label: "비용·비결정성이 불필요하게 늘 수 있다",
        correct: true,
        explain: "Executor를 과제에 맞게 고르는 이유다.",
      },
      {
        id: "b",
        label: "항상 더 안전하다",
        correct: false,
        explain: "비결정성과 권한이 오히려 위험할 수 있다.",
      },
      {
        id: "c",
        label: "14섹션 계약이 바뀐다",
        correct: false,
        explain: "무관.",
      },
    ],
  },
  {
    unitId: "lu-model-routing",
    prompt: "Cheap / Standard / Frontier 라벨의 올바른 이해는?",
    options: [
      {
        id: "a",
        label: "학습용 상대 분류이며 벤더 공식 티어가 아니다",
        correct: true,
        explain: "교육용 고지가 필수다.",
      },
      {
        id: "b",
        label: "ISO 표준 등급이다",
        correct: false,
        explain: "표준 등급이 아니다.",
      },
      {
        id: "c",
        label: "달러 가격표와 1:1이다",
        correct: false,
        explain: "상대 비용 지수는 통화가 아니다.",
      },
    ],
  },
  {
    unitId: "lu-cost-aware-orchestration",
    prompt: "저위험 반복 작업에 Frontier만 고수하면?",
    options: [
      {
        id: "a",
        label: "교육적으로 비용 낭비 패턴이 된다",
        correct: true,
        explain: "Cost-Aware의 핵심 메시지다.",
      },
      {
        id: "b",
        label: "항상 정답이다",
        correct: false,
        explain: "과한 경로일 수 있다.",
      },
      {
        id: "c",
        label: "BUILD-PLAN을 활성화한다",
        correct: false,
        explain: "무관.",
      },
    ],
  },
  {
    unitId: "lu-independent-review",
    prompt: "Independent Review가 필요한 이유는?",
    options: [
      {
        id: "a",
        label: "구현자가 스스로만 검증하면 편향이 남는다",
        correct: true,
        explain: "역할 분리가 핵심이다.",
      },
      {
        id: "b",
        label: "퀴즈 점수를 올리기 위해서만",
        correct: false,
        explain: "학습 장치이지 본질 이유는 아니다.",
      },
      {
        id: "c",
        label: "Concept를 22개로 늘리기 위해",
        correct: false,
        explain: "금지 사항이다.",
      },
    ],
  },
  {
    unitId: "lu-evaluation-retry",
    prompt: "실패 후 올바른 순서에 가까운 것은?",
    options: [
      {
        id: "a",
        label: "기준 평가 → 제한된 재시도 → 경로 변경/중단",
        correct: true,
        explain: "무한 재시도 금지.",
      },
      {
        id: "b",
        label: "한도 없이 동일 프롬프트 반복",
        correct: false,
        explain: "루프 위험.",
      },
      {
        id: "c",
        label: "로그를 남기지 않고 무시",
        correct: false,
        explain: "관측 불가.",
      },
    ],
  },
  {
    unitId: "lu-human-escalation",
    prompt: "사람 승인이 특히 필요한 경우는?",
    options: [
      {
        id: "a",
        label: "고위험·비가역·정책이 애매한 변경",
        correct: true,
        explain: "에스컬레이션 게이트.",
      },
      {
        id: "b",
        label: "이미 템플릿화된 포맷 변환",
        correct: false,
        explain: "저위험 반복에 가깝다.",
      },
      {
        id: "c",
        label: "모든 오타 수정",
        correct: false,
        explain: "과도한 승인.",
      },
    ],
  },
  {
    unitId: "lu-routing-observability",
    prompt: "Routing Observability에 남겨야 할 최소 정보에 가까운 것은?",
    options: [
      {
        id: "a",
        label: "적용 rule ID, 분류, 추천, 검증, 승인 여부",
        correct: true,
        explain: "설명 가능한 기록.",
      },
      {
        id: "b",
        label: "완료 한 글자만",
        correct: false,
        explain: "재현 불가.",
      },
      {
        id: "c",
        label: "API 키 전문",
        correct: false,
        explain: "비밀 저장 금지.",
      },
    ],
  },
]
