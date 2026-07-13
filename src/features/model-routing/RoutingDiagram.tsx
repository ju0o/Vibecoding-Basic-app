"use client"

import { useId, useState } from "react"
import { DIAGRAM_STEPS } from "@/content/model-routing/graph"

type RoutingDiagramProps = {
  readonly activeStepId?: string
  readonly ruleIds?: readonly string[]
  readonly rationale?: string
}

export function RoutingDiagram({ activeStepId, ruleIds = [], rationale }: RoutingDiagramProps) {
  const labelId = useId()
  const [focused, setFocused] = useState(activeStepId ?? DIAGRAM_STEPS[0]?.id)

  return (
    <section aria-labelledby={labelId} className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]" id={labelId}>
          라우팅 단계 다이어그램
        </h2>
        {ruleIds.length > 0 ? (
          <p className="font-mono text-xs text-[var(--text-tertiary)]">
            rules: {ruleIds.join(", ")}
          </p>
        ) : null}
      </div>

      <svg
        aria-hidden="true"
        className="hidden h-auto w-full max-w-3xl text-[var(--accent-primary)] motion-safe:transition-opacity sm:block"
        role="img"
        viewBox="0 0 640 88"
      >
        <title>Classification to Approval flow</title>
        {DIAGRAM_STEPS.map((step, index) => {
          const x = 24 + index * 120
          const active = step.id === (activeStepId ?? focused)
          return (
            <g key={step.id}>
              <rect
                fill={active ? "var(--accent-soft)" : "var(--surface-secondary)"}
                height="56"
                rx="10"
                stroke={active ? "var(--accent-primary)" : "var(--border-default)"}
                strokeWidth={active ? 2 : 1}
                width="100"
                x={x}
                y="16"
              />
              <text
                fill="var(--text-primary)"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
                x={x + 50}
                y="48"
              >
                {index + 1}. {step.title.split(" ")[0]}
              </text>
              {index < DIAGRAM_STEPS.length - 1 ? (
                <path
                  d={`M ${x + 104} 44 H ${x + 116}`}
                  markerEnd="url(#arrow)"
                  stroke="var(--text-tertiary)"
                  strokeWidth="2"
                />
              ) : null}
            </g>
          )
        })}
        <defs>
          <marker id="arrow" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" />
          </marker>
        </defs>
      </svg>

      <ol className="grid gap-2">
        {DIAGRAM_STEPS.map((step, index) => {
          const active = step.id === (activeStepId ?? focused)
          return (
            <li key={step.id}>
              <button
                className={[
                  "flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition",
                  active
                    ? "border-[var(--accent-primary)] bg-[var(--accent-soft)]"
                    : "border-[var(--border-default)] bg-[var(--surface-elevated)] hover:border-[var(--accent-primary)]",
                ].join(" ")}
                onClick={() => setFocused(step.id)}
                type="button"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] font-mono text-xs font-bold"
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-[var(--text-primary)]">
                    {step.title}
                    {active ? (
                      <span className="ml-2 text-xs font-bold text-[var(--accent-primary)]">
                        (선택됨)
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--text-secondary)]">
                    {step.detail}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      {rationale ? (
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--text-primary)]">적용 이유: </span>
          {rationale}
        </p>
      ) : null}
    </section>
  )
}
