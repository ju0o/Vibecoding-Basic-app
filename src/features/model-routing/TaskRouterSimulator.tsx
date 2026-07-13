"use client"

import { useMemo, useState } from "react"
import { ROUTING_SCENARIOS } from "@/content/model-routing/scenarios"
import { EducationalLabelNotice } from "@/features/model-routing/EducationalLabelNotice"
import { RoutingDiagram } from "@/features/model-routing/RoutingDiagram"
import type { AxisScore, RoutingAxes } from "@/lib/model-routing/contract"
import { evaluateRouting } from "@/lib/model-routing/engine"

const AXIS_META: readonly {
  readonly key: keyof RoutingAxes
  readonly label: string
  readonly help: string
}[] = [
  { key: "difficulty", label: "난이도", help: "추론·전문성" },
  { key: "risk", label: "위험도", help: "실패 시 피해" },
  { key: "repetition", label: "반복성", help: "같은 패턴 빈도" },
  { key: "judgment", label: "판단 필요성", help: "애매한 경계" },
  { key: "contextScope", label: "문맥 범위", help: "필요한 자료 넓이" },
  { key: "reversibility", label: "가역성", help: "높을수록 되돌리기 쉬움" },
]

const DEFAULT_AXES: RoutingAxes = {
  difficulty: 3,
  risk: 2,
  repetition: 2,
  judgment: 2,
  contextScope: 3,
  reversibility: 4,
}

function toScore(value: number): AxisScore {
  const clamped = Math.min(5, Math.max(1, Math.round(value)))
  return clamped as AxisScore
}

export function TaskRouterSimulator() {
  const [axes, setAxes] = useState<RoutingAxes>(DEFAULT_AXES)
  const [scenarioId, setScenarioId] = useState<string>("custom")

  const result = useMemo(() => evaluateRouting(axes), [axes])

  function applyScenario(id: string) {
    setScenarioId(id)
    if (id === "custom") {
      return
    }
    const scenario = ROUTING_SCENARIOS.find((item) => item.id === id)
    if (scenario) {
      setAxes(scenario.axes)
    }
  }

  function updateAxis(key: keyof RoutingAxes, value: number) {
    setScenarioId("custom")
    setAxes((current) => ({ ...current, [key]: toScore(value) }))
  }

  function reset() {
    setScenarioId("sc-ui-tweak")
    const scenario = ROUTING_SCENARIOS.find((item) => item.id === "sc-ui-tweak")
    setAxes(scenario?.axes ?? DEFAULT_AXES)
  }

  const activeStep =
    result.approvalRequired || result.recommendedModelClass === "frontier"
      ? "recovery"
      : result.recommendedModelClass === "none"
        ? "executor"
        : "model"

  return (
    <div className="grid gap-8">
      <EducationalLabelNotice />

      <div className="grid gap-3">
        <label
          className="grid gap-2 text-sm font-bold text-[var(--text-primary)]"
          htmlFor="scenario"
        >
          사전 정의 시나리오
          <select
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3 py-2 font-semibold"
            id="scenario"
            onChange={(event) => applyScenario(event.target.value)}
            value={scenarioId}
          >
            <option value="custom">직접 조절 (커스텀)</option>
            {ROUTING_SCENARIOS.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.title}
              </option>
            ))}
          </select>
        </label>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          자연어를 AI로 분류하지 않습니다. 시나리오 선택 또는 여섯 축 조절만 사용합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {AXIS_META.map((axis) => (
          <label
            className="grid gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4"
            key={axis.key}
          >
            <span className="flex items-center justify-between gap-2 text-sm font-extrabold text-[var(--text-primary)]">
              {axis.label}
              <span className="font-mono text-xs text-[var(--text-tertiary)]">
                {axes[axis.key]} / 5 · {axis.help}
              </span>
            </span>
            <input
              aria-valuemax={5}
              aria-valuemin={1}
              aria-valuenow={axes[axis.key]}
              className="w-full"
              max={5}
              min={1}
              onChange={(event) => updateAxis(axis.key, Number(event.target.value))}
              step={1}
              type="range"
              value={axes[axis.key]}
            />
            <input
              aria-label={`${axis.label} 숫자 입력`}
              className="w-20 rounded border border-[var(--border-default)] bg-[var(--surface-primary)] px-2 py-1 font-mono text-sm"
              max={5}
              min={1}
              onChange={(event) => updateAxis(axis.key, Number(event.target.value))}
              type="number"
              value={axes[axis.key]}
            />
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-bold text-white"
          onClick={reset}
          type="button"
        >
          기본 예제로 재설정
        </button>
      </div>

      <div
        aria-live="polite"
        className="grid gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5"
      >
        <h3 className="text-lg font-extrabold text-[var(--text-primary)]">라우팅 결과</h3>
        <ResultRow label="분류" value={result.classification} />
        <ResultRow label="추천 실행자" value={result.recommendedExecutor} />
        <ResultRow label="교육용 모델 등급" value={`${result.recommendedModelClass} (상대 분류)`} />
        <ResultRow
          label="AI 필요"
          value={result.needsAi ? "예 (교육 경로)" : "아니오 (스크립트/규칙)"}
        />
        <ResultRow label="검증 방식" value={result.verificationMethod} />
        <ResultRow label="사람 승인" value={result.approvalRequired ? "필요" : "기본 불필요"} />
        <ResultRow
          label="상대 비용 지수"
          value={`${result.relativeCostIndex} / 10 (통화·토큰 가격 아님)`}
        />
        <ResultRow label="적용 rule ID" value={result.appliedRuleIds.join(", ")} />
        <ResultRow label="추천 이유" value={result.rationale} />
        <ResultRow label="잘못된 Route 비교" value={result.wrongRouteWarning} />
        <ResultRow label="실패 시 다음 전략" value={result.nextStrategyOnFailure} />
        <ResultRow label="claimScope" value={result.claimScope} />
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--border-default)]">
        <table className="min-w-full text-left text-sm">
          <caption className="border-b border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-3 py-2 text-left font-bold">
            텍스트형 Route 표 (스크린리더·모바일 대안)
          </caption>
          <tbody>
            {result.textRouteTable.split(" | ").map((cell) => {
              const [k, ...rest] = cell.split("=")
              return (
                <tr className="border-b border-[var(--border-subtle)]" key={cell}>
                  <th className="px-3 py-2 font-semibold text-[var(--text-secondary)]" scope="row">
                    {k}
                  </th>
                  <td className="px-3 py-2 font-mono text-[var(--text-primary)]">
                    {rest.join("=")}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <RoutingDiagram
        activeStepId={activeStep}
        rationale={result.rationale}
        ruleIds={result.appliedRuleIds}
      />
    </div>
  )
}

function ResultRow({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <p className="text-sm leading-6 text-[var(--text-secondary)]">
      <span className="font-bold text-[var(--text-primary)]">{label}: </span>
      {value}
    </p>
  )
}
