/**
 * Only product_documented timeline events with official-ish anchors via KB.
 * No invented invention dates for Model Routing / generic patterns.
 */

export type TimelineBand = "foundation" | "model" | "system" | "industry"

export type TimelineEvent = {
  readonly id: string
  readonly conceptId: string
  readonly band: TimelineBand
  readonly dateLabel: string
  readonly precision: "year" | "range" | "era"
  readonly kind: "research" | "release" | "standard" | "adoption" | "pattern"
  readonly title: string
  readonly summary: string
  readonly kbId: string
  readonly claimScope: "product_documented" | "educational_pattern"
}

export const TIMELINE_EVENTS: readonly TimelineEvent[] = [
  {
    id: "tl-mcp",
    conceptId: "mcp",
    band: "system",
    dateLabel: "2024+",
    precision: "range",
    kind: "standard",
    title: "MCP 공개·문서화 흐름",
    summary: "모델-도구 연결 표준화 논의가 공식 문서로 정리되기 시작한 구간(제품 문서 근거).",
    kbId: "mcp",
    claimScope: "product_documented",
  },
  {
    id: "tl-model-selection",
    conceptId: "llm",
    band: "model",
    dateLabel: "ongoing",
    precision: "era",
    kind: "adoption",
    title: "Model selection 가이드 (교육 연결)",
    summary: "벤더 공식 문서의 모델 선택 가이드를 Depth로 연결한다. 단일 발명 날짜가 아니다.",
    kbId: "model-selection-tradeoffs",
    claimScope: "product_documented",
  },
  {
    id: "tl-orchestration",
    conceptId: "orchestration",
    band: "system",
    dateLabel: "ongoing",
    precision: "era",
    kind: "pattern",
    title: "Agent orchestration / handoff 패턴",
    summary: "공식 Agents 문서의 orchestration·handoff 설명을 System Evolution Flow로 연결.",
    kbId: "orchestration",
    claimScope: "product_documented",
  },
  {
    id: "tl-harness",
    conceptId: "harness",
    band: "system",
    dateLabel: "ongoing",
    precision: "era",
    kind: "pattern",
    title: "Sandbox / guardrails / human review",
    summary:
      "Harness는 단일 발명 연도가 아니라 운영 패턴 묶음이다. 공식 sandbox·approval 문서 참조.",
    kbId: "harness",
    claimScope: "product_documented",
  },
  {
    id: "tl-routing-pattern",
    conceptId: "orchestration",
    band: "system",
    dateLabel: "n/a",
    precision: "era",
    kind: "pattern",
    title: "Model Routing (educational pattern)",
    summary:
      "단일 표준 발명 날짜 없음. 교육용 Learning Route로만 표시. claimScope=educational_pattern.",
    kbId: "orchestration",
    claimScope: "educational_pattern",
  },
]

export const SYSTEM_EVOLUTION_FLOW = [
  "AI → ML → Deep Learning → Generative AI → LLM",
  "Prompt → Context → Memory → Knowledge → Embedding → RAG",
  "Tool Calling → MCP → Skill → Agent → SubAgent → Workflow → Orchestration",
  "Model Routing (subordinate) → Evaluation → Harness → Production AI",
] as const
