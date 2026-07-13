import { MODEL_ROUTING_UNITS } from "@/content/model-routing/units"
import type { ModelRoutingEdge } from "@/lib/model-routing/contract"

/** Subordinate LearningUnit edges — not core 21 concept mutations. */
export const MODEL_ROUTING_EDGES: readonly ModelRoutingEdge[] = [
  {
    id: "e-orch-class",
    kind: "requires",
    from: "lu-task-classification",
    to: "orchestration",
    whyBridge: "여러 Agent를 조율한 뒤 분류 기준이 필요해진다.",
  },
  ...MODEL_ROUTING_UNITS.slice(0, -1).map((unit, index) => {
    const next = MODEL_ROUTING_UNITS[index + 1]
    return {
      id: `e-${unit.id}-${next?.id}`,
      kind: "evolves_to" as const,
      from: unit.id,
      to: next?.id ?? "",
      whyBridge: unit.whyBridgeOut,
    }
  }),
  {
    id: "e-obs-harness",
    kind: "bounded_by",
    from: "lu-routing-observability",
    to: "harness",
    whyBridge: "실행·평가·복구·승인을 Harness가 감싼다.",
  },
  {
    id: "e-eval-link",
    kind: "evaluated_by",
    from: "lu-evaluation-retry",
    to: "evaluation",
  },
]

export const DIAGRAM_STEPS = [
  {
    id: "classification",
    title: "Classification",
    detail: "여섯 축으로 작업을 분류한다.",
  },
  {
    id: "executor",
    title: "Executor Selection",
    detail: "스크립트·Agent·사람 등 실행 주체를 고른다.",
  },
  {
    id: "model",
    title: "Model Policy",
    detail: "교육용 상대 모델 등급을 고른다.",
  },
  {
    id: "validation",
    title: "Validation",
    detail: "테스트·리뷰·평가 기준을 적용한다.",
  },
  {
    id: "recovery",
    title: "Approval / Recovery",
    detail: "승인·재시도·에스컬레이션으로 복구한다.",
  },
] as const
