"use client"

type FlowConnectorProps = {
  readonly steps: readonly {
    readonly id: string
    readonly label: string
    readonly active: boolean
    readonly done: boolean
  }[]
}

/** Horizontal/wrap step chips showing flow progress (not a text-only stepper lesson). */
export function FlowConnector({ steps }: FlowConnectorProps) {
  return (
    <ol className="flex flex-wrap gap-2" aria-label="학습 흐름 진행">
      {steps.map((step, index) => (
        <li className="flex items-center gap-2" key={step.id}>
          <span
            className={[
              "rounded-full border px-2.5 py-1 text-[11px] font-bold",
              step.active
                ? "border-sky-500 bg-sky-500/20 text-sky-900 dark:text-sky-100"
                : step.done
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                  : "border-[var(--border-default)] text-[var(--text-tertiary)]",
            ].join(" ")}
          >
            {step.done ? "✓ " : `${index + 1}. `}
            {step.label}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden className="text-[var(--text-tertiary)]">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
