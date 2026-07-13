"use client"

import { useState } from "react"

export type InteractiveStep = {
  readonly id: string
  readonly title: string
  readonly body: string
}

type StepPlayerProps = {
  readonly title: string
  readonly steps: readonly InteractiveStep[]
}

/** Reusable step framework — SVG/CSS free; reduced-motion safe (no autoplay). */
export function StepPlayer({ title, steps }: StepPlayerProps) {
  const [index, setIndex] = useState(0)
  const step = steps[index]

  return (
    <section className="grid gap-3 rounded-xl border border-[var(--border-default)] p-4">
      <h3 className="text-base font-extrabold text-[var(--text-primary)]">{title}</h3>
      <p className="text-xs text-[var(--text-tertiary)]">
        Step {index + 1} / {steps.length} · autoplay 없음 · prefers-reduced-motion 안전
      </p>
      {step ? (
        <div aria-live="polite" className="rounded-lg bg-[var(--surface-secondary)] p-3">
          <p className="text-sm font-bold text-[var(--text-primary)]">{step.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{step.body}</p>
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold disabled:opacity-40"
          disabled={index === 0}
          onClick={() => setIndex((v) => Math.max(0, v - 1))}
          type="button"
        >
          이전
        </button>
        <button
          className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold disabled:opacity-40"
          disabled={index >= steps.length - 1}
          onClick={() => setIndex((v) => Math.min(steps.length - 1, v + 1))}
          type="button"
        >
          다음
        </button>
      </div>
      <ol className="grid gap-1 text-xs text-[var(--text-tertiary)]">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              className={i === index ? "font-bold text-[var(--accent-primary)]" : ""}
              onClick={() => setIndex(i)}
              type="button"
            >
              {i + 1}. {s.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
