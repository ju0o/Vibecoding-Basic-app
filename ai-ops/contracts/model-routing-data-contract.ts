/**
 * Model Routing MR-1 data contract (pilot).
 * Not imported by the Next.js app in GO-9 pilot — documentation + future wiring.
 * Keep in sync with ATLAS-MODEL-ROUTING-DATA-CONTRACT.md
 */

export const MODEL_ROUTING_ROUTE_ID = "model-routing" as const;

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
] as const;

export type ModelRoutingUnitId = (typeof MODEL_ROUTING_UNIT_IDS)[number];

/** Educational relative classification — not vendor tiers. */
export type EducationalModelClass = "cheap" | "standard" | "frontier" | "none";

export type ClaimScope = "educational_pattern" | "product_documented";

export type AxisScore = 1 | 2 | 3 | 4 | 5;

export type RoutingAxes = {
  difficulty: AxisScore;
  risk: AxisScore;
  repetition: AxisScore;
  judgment: AxisScore;
  contextScope: AxisScore;
  reversibility: AxisScore;
};

export type AxisCondition = {
  min?: AxisScore;
  max?: AxisScore;
};

export type RoutingRule = {
  id: string;
  name: string;
  priority: number;
  when: {
    difficulty?: AxisCondition;
    risk?: AxisCondition;
    repetition?: AxisCondition;
    judgment?: AxisCondition;
    contextScope?: AxisCondition;
    reversibility?: AxisCondition;
  };
  then: {
    taskClass: string;
    executor: string;
    modelClass: EducationalModelClass;
    verification: string;
    approvalRequired: boolean;
    onFailure: string;
    rationale: string;
  };
  claimScope: ClaimScope;
  sources?: string[];
};

export type RoutingScenario = {
  id: string;
  title: string;
  summary: string;
  axes: RoutingAxes;
  learningFocus: string[];
  expectedPrimaryRuleId?: string;
};

export type RoutingDecisionResult = {
  appliedRuleIds: string[];
  classification: string;
  recommendedExecutor: string;
  recommendedModelClass: EducationalModelClass;
  /** Educational relative cost index — not currency. */
  relativeCostIndex: number;
  rationale: string;
  verificationMethod: string;
  approvalRequired: boolean;
  nextStrategyOnFailure: string;
  claimScope: ClaimScope;
  textRouteTable: string;
};

export type ModelRoutingUnitProgress = {
  visited: boolean;
  read: boolean;
  quizBestScore: number;
  simulatorDone: boolean;
  teachBackDone: boolean;
};

export type ModelRoutingRouteProgress = {
  units: Partial<Record<ModelRoutingUnitId, ModelRoutingUnitProgress>>;
  lastUnitId?: ModelRoutingUnitId;
  simulatorRuns?: number;
};

/** Logical graph edge kinds reused from Education Layer where possible. */
export type ModelRoutingEdgeKind =
  | "evolves_to"
  | "solves_limit_of"
  | "requires"
  | "uses"
  | "evaluated_by"
  | "bounded_by"
  | "deepens"
  | "evidenced_by";

export type ModelRoutingEdge = {
  id: string;
  kind: ModelRoutingEdgeKind;
  from: string;
  to: string;
  whyBridge?: string;
};
