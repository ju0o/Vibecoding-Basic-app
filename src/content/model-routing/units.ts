import type { ModelRoutingUnitId } from "@/lib/model-routing/contract"

export type UnitSection = {
  readonly id: string
  readonly title: string
  readonly body: string
}

export type ModelRoutingUnit = {
  readonly id: ModelRoutingUnitId
  readonly order: number
  readonly title: string
  readonly oneLiner: string
  readonly parentConcepts: readonly string[]
  readonly whyBridgeIn: string
  readonly whyBridgeOut: string
  readonly relatedKbIds: readonly string[]
  readonly relatedLessonSlugs: readonly string[]
  readonly sections: readonly UnitSection[]
}

export const MODEL_ROUTING_UNITS: readonly ModelRoutingUnit[] = [
  {
    id: "lu-task-classification",
    order: 1,
    title: "Task Classification",
    oneLiner: "실행 전에 작업을 속성 축으로 분류해 ‘무엇인 일인가’를 명시한다.",
    parentConcepts: ["orchestration"],
    whyBridgeIn: "여러 Agent를 만들었지만 작업을 나누는 기준이 없었다.",
    whyBridgeOut: "분류가 생기면 어떤 처리 경로로 보낼지 정할 수 있다.",
    relatedKbIds: ["orchestration", "requirement-task-breakdown"],
    relatedLessonSlugs: ["multi-agent-orchestration", "requirement-to-task-breakdown"],
    sections: baseSections(
      "Task Classification",
      "작업을 시작하기 전에 난이도·위험·반복성·판단·문맥·가역성으로 라벨을 붙이는 단계다.",
      "모든 일을 ‘알아서 해’로 던지면 비용·위험이 섞인다.",
      "같은 크기로 보이는 일도 속성이 다르면 경로가 달라진다.",
      "택배 상자에 취급주의 스티커를 붙이는 것과 같다.",
      "린트 수정과 인증 변경을 같은 큐에 넣지 않는다.",
      "‘대충 어려워 보인다’만으로 분류하면 기준이 사라진다.",
    ),
  },
  {
    id: "lu-task-routing",
    order: 2,
    title: "Task Routing",
    oneLiner: "분류 결과에 따라 작업이 들어갈 처리 경로(흐름)를 고른다.",
    parentConcepts: ["orchestration", "workflow"],
    whyBridgeIn: "분류만 있고 보낼 길이 없으면 라벨이 장식이 된다.",
    whyBridgeOut: "경로가 정해져야 실행자를 고를 수 있다.",
    relatedKbIds: ["orchestration", "loop-engineering"],
    relatedLessonSlugs: ["multi-agent-orchestration", "loop-engineering-basics"],
    sections: baseSections(
      "Task Routing",
      "분류 티켓을 어떤 파이프라인(자동 스크립트, 구현 큐, 검토 큐 등)으로 보낼지 정한다.",
      "한 큐에 모든 일을 넣으면 병목과 잘못된 우선순위가 생긴다.",
      "일의 성격에 맞는 흐름으로 보내 대기·검증 단계를 맞춘다.",
      "병원 접수에서 응급/외래/검사를 나누는 것과 비슷하다.",
      "배포 작업은 배포 체크리스트 경로로 보낸다.",
      "급한 기분만으로 모든 일을 최우선 큐에 넣는다.",
    ),
  },
  {
    id: "lu-executor-routing",
    order: 3,
    title: "Executor Routing",
    oneLiner: "경로 안에서 실제 수행 주체(사람·Agent·스크립트 등)를 고른다.",
    parentConcepts: ["orchestration", "subagent", "agent"],
    whyBridgeIn: "경로만 있고 누가 할지가 없으면 실행이 멈춘다.",
    whyBridgeOut: "실행자를 골라도 모델·방식 선택이 남는다.",
    relatedKbIds: ["subagents", "orchestration", "human-ai-collaboration-patterns"],
    relatedLessonSlugs: ["subagents-and-delegation", "human-ai-collaboration-patterns"],
    sections: baseSections(
      "Executor Routing",
      "스크립트, 단일 Agent, SubAgent, 사람 중 누가 손을 댈지 고른다.",
      "항상 같은 실행자에게 맡기면 전문성과 권한이 어긋난다.",
      "능력·권한·문맥 범위에 맞는 실행 주체를 배치한다.",
      "식당에서 홀/주방/매니저를 나누는 것과 같다.",
      "조사는 Researcher, 구현은 Implementer에게 맡긴다.",
      "모든 일을 한 ‘만능 Agent’에게 몰아준다.",
    ),
  },
  {
    id: "lu-model-routing",
    order: 4,
    title: "Model Routing",
    oneLiner: "모델이 필요할 때 교육용 상대 등급·방식으로 모델 선택을 고른다.",
    parentConcepts: ["orchestration"],
    whyBridgeIn: "실행자를 골라도 어떤 모델 등급을 쓸지 정해야 한다.",
    whyBridgeOut: "모든 일에 최고 등급을 쓰면 비용이 낭비된다.",
    relatedKbIds: ["model-selection-tradeoffs"],
    relatedLessonSlugs: ["model-selection-tradeoffs"],
    sections: baseSections(
      "Model Routing",
      "Cheap / Standard / Frontier 같은 교육용 상대 분류로 모델 부담을 고른다. 공식 벤더 티어가 아니다.",
      "한 가지 ‘최고 모델’만 쓰면 간단한 일에도 과한 비용이 든다.",
      "과제 속성에 맞는 상대 성능·비용 지점을 고른다.",
      "이동 거리에 따라 자전거·버스·택시를 고르는 것과 같다.",
      "단순 포맷 작업에는 저비용 경로, 설계 판단에는 고성능 경로.",
      "브랜드 이름만 보고 무조건 최고 티어를 고른다.",
    ),
  },
  {
    id: "lu-cost-aware-orchestration",
    order: 5,
    title: "Cost-Aware Orchestration",
    oneLiner: "품질·지연·비용·위험을 함께 보고 과도한 고비용 경로를 피한다.",
    parentConcepts: ["orchestration"],
    whyBridgeIn: "모든 작업에 고성능 모델을 쓰면 낭비가 생긴다.",
    whyBridgeOut: "싸게만 가면 검증 공백이 생기므로 독립 검토가 필요하다.",
    relatedKbIds: ["model-selection-tradeoffs", "orchestration"],
    relatedLessonSlugs: ["model-selection-tradeoffs", "multi-agent-orchestration"],
    sections: baseSections(
      "Cost-Aware Orchestration",
      "반복·저위험 일은 낮은 상대 비용으로, 고위험은 검증 비용을 아끼지 않는다.",
      "품질만 보면 예산을 태우고, 비용만 보면 사고를 만든다.",
      "목표 품질을 만족하는 최소 충분 경로를 고른다.",
      "출장비 규정처럼 ‘필요할 때만 비싼 수단’을 쓰는 규칙이다 같다.",
      "동일 포맷 변환 100건은 저비용 경로 + 표본 검사.",
      "한 건의 카피 수정에 최대 비용 경로를 고정한다.",
    ),
  },
  {
    id: "lu-independent-review",
    order: 6,
    title: "Independent Review",
    oneLiner: "구현·생성 주체와 분리된 검토로 자기검증 편향을 줄인다.",
    parentConcepts: ["evaluation"],
    whyBridgeIn: "결과가 좋아 보여도 만든 사람이 스스로만 검사하면 편향이 남는다.",
    whyBridgeOut: "검토 후에도 실패하면 재시도·경로 변경 규칙이 필요하다.",
    relatedKbIds: [
      "code-change-risk-analysis",
      "human-ai-collaboration-patterns",
      "ai-system-evaluation",
    ],
    relatedLessonSlugs: ["code-change-risk-analysis", "ai-code-review-tools"],
    sections: baseSections(
      "Independent Review",
      "작성자(또는 구현 Agent)와 다른 역할이 기준표로 다시 본다.",
      "자기 테스트 통과만으로 충분하다고 믿으면 맹점이 남는다.",
      "이해충돌을 줄이고 위험 신호를 더 잘 잡는다.",
      "시험 감독과 응시자를 분리하는 것과 같다.",
      "보안 패치는 구현 Agent 후 리뷰어 경로를 거친다.",
      "같은 세션이 작성·승인을 모두 수행한다.",
    ),
  },
  {
    id: "lu-evaluation-retry",
    order: 7,
    title: "Evaluation & Retry",
    oneLiner: "성공 기준 미달 시 재시도·경로 변경·중단 조건을 적용한다.",
    parentConcepts: ["evaluation"],
    whyBridgeIn: "실패 후 무엇을 할지 기준이 없으면 무한 루프나 포기가 된다.",
    whyBridgeOut: "자동 재시도 한도를 넘기면 사람 에스컬레이션이 필요하다.",
    relatedKbIds: ["ai-system-evaluation", "loop-engineering"],
    relatedLessonSlugs: ["ai-system-evaluation", "loop-engineering-basics"],
    sections: baseSections(
      "Evaluation & Retry",
      "통과 기준을 정하고, 실패 시 재시도 횟수와 경로 업그레이드를 정한다.",
      "감으로 다시 돌리면 비용만 늘고 학습 신호가 없다.",
      "측정 가능한 실패 → 제한된 재시도 → 경로 변경.",
      "게임의 체크포인트와 남은 목숨 수와 비슷하다.",
      "테스트 실패 1회 → 수정 재시도 → 여전히 실패 시 리뷰 강화.",
      "실패할 때마다 한도 없이 같은 프롬프트만 반복한다.",
    ),
  },
  {
    id: "lu-human-escalation",
    order: 8,
    title: "Human Escalation",
    oneLiner: "자동화 한계·고위험·비가역 지점에서 사람에게 넘긴다.",
    parentConcepts: ["harness", "evaluation"],
    whyBridgeIn: "자동 재시도만으로 닫을 수 없는 결정이 있다.",
    whyBridgeOut: "사람 결정도 기록되지 않으면 다음에 배울 수 없다.",
    relatedKbIds: ["harness", "human-ai-collaboration-patterns"],
    relatedLessonSlugs: ["harness-engineering-basics", "human-ai-collaboration-patterns"],
    sections: baseSections(
      "Human Escalation",
      "승인·거절·범위 재정의처럼 책임이 큰 결정을 사람에게 올린다.",
      "모든 것을 자동화하면 사고 책임이 흐려진다.",
      "위험·비가역·정책 애매 구간에서 사람이 게이트가 된다.",
      "중요 결제 전 추가 확인 버튼과 같다.",
      "프로덕션 스키마 삭제 전에 사람 승인.",
      "챗봇이 법적 고지를 임의로 승인한다.",
    ),
  },
  {
    id: "lu-routing-observability",
    order: 9,
    title: "Routing Observability",
    oneLiner: "분류·추천·규칙·검증·승인 결정을 기록·설명 가능하게 남긴다.",
    parentConcepts: ["harness", "evaluation"],
    whyBridgeIn: "결정 근거가 없으면 개선도 감사도 어렵다.",
    whyBridgeOut: "관측된 실행·평가·복구·승인을 Harness가 안정적으로 감싼다.",
    relatedKbIds: ["harness", "ai-system-evaluation"],
    relatedLessonSlugs: ["harness-engineering-basics", "backend-observability-logs"],
    sections: baseSections(
      "Routing Observability",
      "rule ID, 축 값, 추천, 검증, 승인 여부를 추적 가능한 형태로 남긴다.",
      "결과만 보면 ‘왜 그 경로였는지’를 재현할 수 없다.",
      "학습과 운영 개선을 위한 설명 가능한 기록을 만든다.",
      "택배 송장의 경로 스캔 기록과 같다.",
      "Simulator 결과에 적용 rule ID를 표시한다.",
      "로그만 ‘완료’ 한 글자만 남긴다.",
    ),
  },
]

function baseSections(
  name: string,
  definition: string,
  previousProblem: string,
  solves: string,
  analogy: string,
  goodCase: string,
  badCase: string,
): readonly UnitSection[] {
  return [
    { id: "definition", title: "한 줄 정의", body: definition },
    {
      id: "why",
      title: "왜 등장했는가",
      body: `${name}은 이전 단계에서 생긴 모호함을 줄이기 위해 필요하다. 기준 없는 위임은 재작업과 사고를 만든다.`,
    },
    { id: "previous", title: "이전 방식의 문제", body: previousProblem },
    { id: "solves", title: "무엇을 해결하는가", body: solves },
    { id: "analogy", title: "비개발자 비유", body: analogy },
    {
      id: "good-case",
      title: "실제 사례(교육용)",
      body: `${goodCase} (교육용 시나리오 · claimScope=educational_pattern)`,
    },
    {
      id: "bad-case",
      title: "잘못된 사례(교육용)",
      body: `${badCase} (교육용 반례 · claimScope=educational_pattern)`,
    },
    {
      id: "related",
      title: "관련 개념",
      body: "Orchestration, Evaluation, Harness 및 기존 심화 강의·KB와 연결된다. 22번째 핵심 Concept가 아니다.",
    },
    {
      id: "diagram",
      title: "다이어그램",
      body: "Classification → Executor → Model Policy → Validation → Approval/Recovery 흐름을 라우트 다이어그램에서 확인한다.",
    },
    {
      id: "sim",
      title: "Mini Simulation",
      body: "Task Router Simulator에서 시나리오를 고르거나 여섯 축을 조절해 규칙 ID와 추천 경로를 관찰한다.",
    },
    {
      id: "practice",
      title: "실습",
      body: "주변의 실제 업무 하나를 여섯 축으로 점수화하고, Simulator 결과와 비교해 차이를 한 문장으로 적어 본다.",
    },
    {
      id: "quiz",
      title: "Quiz",
      body: "아래 Quiz 패널에서 이 Unit의 핵심 오해를 점검한다.",
    },
    {
      id: "checkpoint",
      title: "Checkpoint",
      body: "다른 사람에게 세 문장으로 설명해 본다: 정의, 이전 문제, 실패 시 다음 행동.",
    },
    {
      id: "why-bridge",
      title: "Why Bridge",
      body: "다음 Unit으로 넘어가는 이유를 페이지 상단·하단 Why Bridge에서 확인한다.",
    },
  ]
}

export function getUnitById(id: string): ModelRoutingUnit | undefined {
  return MODEL_ROUTING_UNITS.find((unit) => unit.id === id)
}

export function getAdjacentUnits(id: string): {
  readonly previous: ModelRoutingUnit | undefined
  readonly next: ModelRoutingUnit | undefined
} {
  const index = MODEL_ROUTING_UNITS.findIndex((unit) => unit.id === id)
  if (index === -1) {
    return { previous: undefined, next: undefined }
  }
  return {
    previous: index > 0 ? MODEL_ROUTING_UNITS[index - 1] : undefined,
    next: index < MODEL_ROUTING_UNITS.length - 1 ? MODEL_ROUTING_UNITS[index + 1] : undefined,
  }
}
