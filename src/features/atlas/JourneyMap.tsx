"use client"

import Link from "next/link"
import { ATLAS_ARCS, type AtlasConcept } from "@/content/atlas"
import { useAtlasProgress } from "@/features/atlas/AtlasProgressProvider"

type JourneyMapProps = {
  readonly concepts: readonly AtlasConcept[]
}

export function JourneyMap({ concepts }: JourneyMapProps) {
  const { ready, getConceptStatus, getCompletedCount, progress } = useAtlasProgress()
  const completed = ready ? getCompletedCount(concepts.map((c) => c.id)) : 0
  const continueId = progress.lastConceptId ?? concepts[0]?.id

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--accent-primary)]">21 Concepts · 6 Arcs</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            완료 {completed} / {concepts.length}
            {continueId ? (
              <>
                {" · "}
                <Link
                  className="font-bold text-[var(--accent-primary)]"
                  href={`/atlas/concepts/${continueId}`}
                >
                  Continue Learning
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <Link
          className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold"
          href="/model-routing"
        >
          Model Routing 하위 경로
        </Link>
      </div>

      {ATLAS_ARCS.map((arc) => {
        const arcConcepts = concepts.filter((c) => c.arc === arc.id)
        return (
          <section className="grid gap-3" key={arc.id}>
            <header>
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{arc.title}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{arc.question}</p>
            </header>
            <ol className="grid gap-2">
              {arcConcepts.map((concept) => {
                const status = ready ? getConceptStatus(concept.id) : "not-visited"
                return (
                  <li key={concept.id}>
                    <Link
                      className="flex flex-col gap-1 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 transition hover:border-[var(--accent-primary)]"
                      href={`/atlas/concepts/${concept.id}`}
                    >
                      <span className="text-xs font-bold text-[var(--text-tertiary)]">
                        {String(concept.order).padStart(2, "0")} · {status} · {concept.stageLabel}
                      </span>
                      <span className="text-base font-extrabold text-[var(--text-primary)]">
                        {concept.title}
                      </span>
                      <span className="text-sm leading-6 text-[var(--text-secondary)]">
                        {concept.shortDefinition}
                      </span>
                      <span className="text-xs leading-5 text-[var(--text-tertiary)]">
                        Why Bridge: {concept.whyBridge}
                      </span>
                      {concept.subordinateRoutes?.map((route) => (
                        <span
                          className="text-xs font-bold text-[var(--accent-primary)]"
                          key={route.href}
                        >
                          하위 Route: {route.label}
                        </span>
                      ))}
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
