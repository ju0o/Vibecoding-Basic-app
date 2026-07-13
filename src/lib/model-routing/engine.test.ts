import { describe, expect, it } from "vitest"
import { ROUTING_SCENARIOS } from "@/content/model-routing/scenarios"
import { MODEL_ROUTING_UNITS } from "@/content/model-routing/units"
import { MODEL_ROUTING_UNIT_IDS } from "@/lib/model-routing/contract"
import { evaluateRouting } from "@/lib/model-routing/engine"
import { markUnitRead, parseRouteProgress } from "@/lib/model-routing/progress"

describe("model routing contract", () => {
  it("keeps nine stable unit ids", () => {
    expect(MODEL_ROUTING_UNIT_IDS).toHaveLength(9)
    expect(MODEL_ROUTING_UNITS.map((unit) => unit.id)).toEqual([...MODEL_ROUTING_UNIT_IDS])
  })
})

describe("evaluateRouting", () => {
  it("is deterministic for the same axes", () => {
    const axes = {
      difficulty: 3 as const,
      risk: 3 as const,
      repetition: 2 as const,
      judgment: 2 as const,
      contextScope: 3 as const,
      reversibility: 4 as const,
    }
    const a = evaluateRouting(axes)
    const b = evaluateRouting(axes)
    expect(a).toEqual(b)
    expect(a.appliedRuleIds.length).toBeGreaterThan(0)
  })

  it("routes high-risk irreversible work to approval", () => {
    const result = evaluateRouting({
      difficulty: 4,
      risk: 5,
      repetition: 1,
      judgment: 4,
      contextScope: 4,
      reversibility: 1,
    })
    expect(result.approvalRequired).toBe(true)
    expect(result.appliedRuleIds[0]).toBe("RR-RISK-01")
  })

  it("prefers deterministic path for checklist-like work", () => {
    const result = evaluateRouting({
      difficulty: 1,
      risk: 1,
      repetition: 5,
      judgment: 1,
      contextScope: 1,
      reversibility: 5,
    })
    expect(result.appliedRuleIds[0]).toBe("RR-DET-01")
    expect(result.recommendedModelClass).toBe("none")
  })

  it("matches expected primary rules for fixture scenarios", () => {
    for (const scenario of ROUTING_SCENARIOS) {
      if (!scenario.expectedPrimaryRuleId) {
        continue
      }
      const result = evaluateRouting(scenario.axes)
      expect(result.appliedRuleIds[0], scenario.id).toBe(scenario.expectedPrimaryRuleId)
    }
  })
})

describe("progress parse", () => {
  it("defaults missing fields without throwing", () => {
    expect(parseRouteProgress(null).simulatorRuns).toBe(0)
    const next = markUnitRead(parseRouteProgress({}), "lu-task-classification")
    expect(next.units["lu-task-classification"]?.read).toBe(true)
  })
})
