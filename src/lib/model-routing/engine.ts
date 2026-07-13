import { ROUTING_RULES } from "@/content/model-routing/rules"
import type {
  AxisCondition,
  AxisScore,
  EducationalModelClass,
  RoutingAxes,
  RoutingDecisionResult,
  RoutingRule,
} from "@/lib/model-routing/contract"

function matchesAxis(value: AxisScore, condition?: AxisCondition): boolean {
  if (!condition) {
    return true
  }
  if (condition.min !== undefined && value < condition.min) {
    return false
  }
  if (condition.max !== undefined && value > condition.max) {
    return false
  }
  return true
}

export function ruleMatches(rule: RoutingRule, axes: RoutingAxes): boolean {
  const { when } = rule
  return (
    matchesAxis(axes.difficulty, when.difficulty) &&
    matchesAxis(axes.risk, when.risk) &&
    matchesAxis(axes.repetition, when.repetition) &&
    matchesAxis(axes.judgment, when.judgment) &&
    matchesAxis(axes.contextScope, when.contextScope) &&
    matchesAxis(axes.reversibility, when.reversibility)
  )
}

export function relativeCostIndex(
  modelClass: EducationalModelClass,
  approvalRequired: boolean,
  risk: AxisScore,
): number {
  const base =
    modelClass === "none" ? 1 : modelClass === "cheap" ? 3 : modelClass === "standard" ? 5 : 8
  const approvalBump = approvalRequired ? 1 : 0
  const riskBump = risk >= 4 ? 1 : 0
  return Math.min(10, base + approvalBump + riskBump)
}

function wrongRouteWarning(result: {
  modelClass: EducationalModelClass
  approvalRequired: boolean
  risk: AxisScore
}): string {
  if (result.risk >= 4 && !result.approvalRequired) {
    return "고위험인데 승인 없이 자동 완료하는 경로는 교육적으로 위험 신호다."
  }
  if (result.modelClass === "frontier" && result.risk <= 2) {
    return "저위험 작업에 Frontier만 고집하면 비용 낭비 패턴이 된다."
  }
  if (result.modelClass === "none" && result.risk >= 4) {
    return "고위험을 스크립트만으로 닫으려 하면 검증·승인 공백이 생긴다."
  }
  return "대안: 한 단계 더 싼 경로와 한 단계 더 엄한 검증 경로를 비교해 보세요."
}

/**
 * Pure educational router. Same axes → same result. No I/O, no provider names.
 */
export function evaluateRouting(
  axes: RoutingAxes,
  rules: readonly RoutingRule[] = ROUTING_RULES,
): RoutingDecisionResult {
  const ordered = [...rules].sort((a, b) => a.priority - b.priority)
  const matched = ordered.filter((rule) => ruleMatches(rule, axes))
  const primary = matched[0] ?? ordered[ordered.length - 1]

  if (!primary) {
    throw new Error("No routing rules configured")
  }

  const supporting = matched.slice(1, 3).map((rule) => rule.id)
  const appliedRuleIds = [primary.id, ...supporting]
  const cost = relativeCostIndex(
    primary.outcome.modelClass,
    primary.outcome.approvalRequired,
    axes.risk,
  )
  const needsAi = primary.outcome.modelClass !== "none"
  const wrong = wrongRouteWarning({
    modelClass: primary.outcome.modelClass,
    approvalRequired: primary.outcome.approvalRequired,
    risk: axes.risk,
  })

  const textRouteTable = [
    `rule=${appliedRuleIds.join(",")}`,
    `class=${primary.outcome.taskClass}`,
    `executor=${primary.outcome.executor}`,
    `modelClass=${primary.outcome.modelClass}`,
    `verify=${primary.outcome.verification}`,
    `approval=${primary.outcome.approvalRequired ? "required" : "not-required"}`,
    `costIndex=${cost}`,
    `onFailure=${primary.outcome.onFailure}`,
  ].join(" | ")

  return {
    appliedRuleIds,
    classification: primary.outcome.taskClass,
    recommendedExecutor: primary.outcome.executor,
    recommendedModelClass: primary.outcome.modelClass,
    relativeCostIndex: cost,
    rationale: primary.outcome.rationale,
    verificationMethod: primary.outcome.verification,
    approvalRequired: primary.outcome.approvalRequired,
    nextStrategyOnFailure: primary.outcome.onFailure,
    claimScope: primary.claimScope,
    needsAi,
    wrongRouteWarning: wrong,
    textRouteTable,
  }
}
