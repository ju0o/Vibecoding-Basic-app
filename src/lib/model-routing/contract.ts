/**
 * App-side Model Routing data contract.
 * Ops SSOT: ai-ops/contracts/model-routing-data-contract.ts
 * Keep IDs and shapes aligned; app never imports ai-ops at runtime (static export boundary).
 */

export const MODEL_ROUTING_ROUTE_ID = "model-routing" as const

export const MODEL_ROUTING_UNIT_IDS = [
  "lu-task-classification",
  "lu-task-routing",
  "lu-executor-routing",
  "lu-model-routing",
  "lu-cost-aware-orchestration",
  "lu-independent-review",
  "lu-evaluation-retry",
  "lu-human-escalation",
  "lu-routing-observability",
] as const

export type ModelRoutingUnitId = (typeof MODEL_ROUTING_UNIT_IDS)[number]

/** Educational relative classification — not vendor tiers or official standards. */
export type EducationalModelClass = "cheap" | "standard" | "frontier" | "none"

export type ClaimScope = "educational_pattern" | "product_documented"

export type AxisScore = 1 | 2 | 3 | 4 | 5

export type RoutingAxes = {
  readonly difficulty: AxisScore
  readonly risk: AxisScore
  readonly repetition: AxisScore
  readonly judgment: AxisScore
  readonly contextScope: AxisScore
  readonly reversibility: AxisScore
}

export type AxisCondition = {
  readonly min?: AxisScore
  readonly max?: AxisScore
}

export type RoutingRule = {
  readonly id: string
  readonly name: string
  readonly priority: number
  readonly when: {
    readonly difficulty?: AxisCondition
    readonly risk?: AxisCondition
    readonly repetition?: AxisCondition
    readonly judgment?: AxisCondition
    readonly contextScope?: AxisCondition
    readonly reversibility?: AxisCondition
  }
  readonly outcome: {
    readonly taskClass: string
    readonly executor: string
    readonly modelClass: EducationalModelClass
    readonly verification: string
    readonly approvalRequired: boolean
    readonly onFailure: string
    readonly rationale: string
  }
  readonly claimScope: ClaimScope
  readonly sources?: readonly string[]
}

export type RoutingScenario = {
  readonly id: string
  readonly title: string
  readonly summary: string
  readonly axes: RoutingAxes
  readonly learningFocus: readonly string[]
  readonly expectedPrimaryRuleId?: string
}

export type RoutingDecisionResult = {
  readonly appliedRuleIds: readonly string[]
  readonly classification: string
  readonly recommendedExecutor: string
  readonly recommendedModelClass: EducationalModelClass
  /** Educational relative cost index 1–10 — not currency or token price. */
  readonly relativeCostIndex: number
  readonly rationale: string
  readonly verificationMethod: string
  readonly approvalRequired: boolean
  readonly nextStrategyOnFailure: string
  readonly claimScope: ClaimScope
  readonly needsAi: boolean
  readonly wrongRouteWarning: string
  readonly textRouteTable: string
}

export type ModelRoutingUnitProgress = {
  readonly visited: boolean
  readonly read: boolean
  readonly quizBestScore: number
  readonly simulatorDone: boolean
  readonly teachBackDone: boolean
}

export type ModelRoutingRouteProgress = {
  readonly units: Readonly<Partial<Record<ModelRoutingUnitId, ModelRoutingUnitProgress>>>
  readonly lastUnitId?: ModelRoutingUnitId
  readonly simulatorRuns: number
}

export type ModelRoutingEdgeKind =
  | "evolves_to"
  | "solves_limit_of"
  | "requires"
  | "uses"
  | "evaluated_by"
  | "bounded_by"
  | "deepens"
  | "evidenced_by"

export type ModelRoutingEdge = {
  readonly id: string
  readonly kind: ModelRoutingEdgeKind
  readonly from: string
  readonly to: string
  readonly whyBridge?: string
}

export const EDUCATIONAL_LABEL_NOTICE =
  "Cheap / Standard / Frontier와 상대 비용 지수는 학습용 상대 분류이며, 특정 벤더의 공식 티어·가격표·벤치마크 등급이 아닙니다."
