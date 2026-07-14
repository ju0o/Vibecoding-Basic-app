"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { AtlasContentManifestEntry, StudioSummary } from "@/lib/atlas/content-manifest"

type FilterKey =
  | "all"
  | "complete"
  | "partial"
  | "missing"
  | "source_pending"
  | "no_quiz"
  | "no_interaction"
  | "no_kb"
  | "recommended"

type StudioConceptListProps = {
  readonly entries: readonly AtlasContentManifestEntry[]
  readonly summary: StudioSummary
}

export function StudioConceptList({ entries, summary }: StudioConceptListProps) {
  const [filter, setFilter] = useState<FilterKey>("all")
  const [arc, setArc] = useState<string>("all")

  const arcs = useMemo(() => [...new Set(entries.map((e) => e.arc))], [entries])

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      if (arc !== "all" && entry.arc !== arc) {
        return false
      }
      switch (filter) {
        case "complete":
          return entry.overallStatus === "complete"
        case "partial":
          return entry.overallStatus === "partial"
        case "missing":
          return entry.overallStatus === "missing"
        case "source_pending":
          return entry.sourceStatus === "pending" || entry.sourceStatus === "missing"
        case "no_quiz":
          return !entry.hasQuiz
        case "no_interaction":
          return !entry.hasInteractive
        case "no_kb":
          return entry.kbIds.length === 0
        case "recommended":
          return entry.recommendations.length > 0 && entry.overallStatus !== "complete"
        default:
          return true
      }
    })
  }, [entries, filter, arc])

  return (
    <div className="grid gap-6">
      <section
        aria-label="전체 요약"
        className="grid gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Stat label="총 Concept" value={`${summary.totalConcepts}`} />
        <Stat label="Complete" value={`${summary.complete}`} />
        <Stat label="Partial" value={`${summary.partial}`} />
        <Stat label="Missing" value={`${summary.missing}`} />
        <Stat label="출처 verified" value={`${summary.sourceVerified}`} />
        <Stat label="출처 pending/missing" value={`${summary.sourcePending}`} />
        <Stat label="Quiz 보유" value={`${summary.withQuiz}`} />
        <Stat label="Interactive 보유" value={`${summary.withInteractive}`} />
        <Stat label="평균 완성도" value={`${summary.averageCompleteness}%`} />
      </section>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "전체"],
            ["partial", "partial"],
            ["complete", "complete"],
            ["missing", "missing"],
            ["source_pending", "source pending"],
            ["no_interaction", "no interaction"],
            ["no_kb", "no KB"],
            ["recommended", "다음 작업"],
          ] as const
        ).map(([key, label]) => (
          <button
            className={[
              "rounded-full border px-3 py-1 text-xs font-bold",
              filter === key
                ? "border-[var(--accent-primary)] bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                : "border-[var(--border-default)] text-[var(--text-secondary)]",
            ].join(" ")}
            key={key}
            onClick={() => setFilter(key)}
            type="button"
          >
            {label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
          Arc
          <select
            className="rounded border border-[var(--border-default)] bg-[var(--surface-elevated)] px-2 py-1"
            onChange={(e) => setArc(e.target.value)}
            value={arc}
          >
            <option value="all">all</option>
            {arcs.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-sm text-[var(--text-tertiary)]" aria-live="polite">
        표시 {filtered.length} / {entries.length}
      </p>

      <ul className="grid gap-3">
        {filtered.map((entry) => (
          <li
            className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4"
            key={entry.conceptId}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[var(--text-tertiary)]">
                  {String(entry.order).padStart(2, "0")}. {entry.conceptId} · {entry.arc} ·{" "}
                  {entry.stageLabel}
                </p>
                <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{entry.title}</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  상태: <StatusText status={entry.overallStatus} /> · 완성도{" "}
                  {entry.completeness.overallPercent}% · source {entry.sourceStatus}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <Link className="text-[var(--accent-primary)]" href={entry.studentRoute}>
                  학생 화면
                </Link>
                <Link className="text-[var(--accent-primary)]" href={entry.studioRoute}>
                  콘텐츠 상세
                </Link>
              </div>
            </div>
            <dl className="mt-3 grid gap-1 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
              <div>
                14 Sections: {entry.sectionComplete} complete / {entry.sectionPartial} partial /{" "}
                {entry.sectionMissing} missing
              </div>
              <div>
                Passport {entry.passport ? "✓" : "✕"} · Why Bridge {entry.whyBridge ? "✓" : "✕"} ·
                Quiz {entry.hasQuiz ? "✓" : "✕"} · Interactive {entry.hasInteractive ? "✓" : "✕"}
              </div>
              <div>
                Wiki {entry.wikiIds.length} · KB {entry.kbIds.length}
              </div>
              <div>Workflow (inferred): {entry.workflowStage}</div>
            </dl>
            {entry.recommendations[0] ? (
              <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                다음 추천: {entry.recommendations[0].title} →{" "}
                {entry.recommendations[0].recommendedAgent}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Stat({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-2">
      <p className="text-xs font-bold text-[var(--text-tertiary)]">{label}</p>
      <p className="text-lg font-extrabold text-[var(--text-primary)]">{value}</p>
    </div>
  )
}

function StatusText({ status }: { readonly status: string }) {
  return <span className="font-bold uppercase tracking-wide">{status}</span>
}
