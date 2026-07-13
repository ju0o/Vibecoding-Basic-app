import type { Metadata } from "next"
import Link from "next/link"
import { SYSTEM_EVOLUTION_FLOW, TIMELINE_EVENTS } from "@/content/atlas/timeline"

export const metadata: Metadata = {
  title: "Atlas Timeline",
  description: "Historical anchors vs system evolution flow — no invented invention dates.",
}

export default function AtlasTimelinePage() {
  return (
    <main className="mx-auto grid max-w-3xl gap-10 px-4 py-10 sm:px-6">
      <header className="grid gap-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Timeline</h1>
        <p className="text-sm leading-7 text-[var(--text-secondary)]">
          Historical Timeline은 공식 근거가 있는 사건만, System Evolution Flow는 기술적 필요의
          흐름입니다. Model Routing을 특정 연도 발명품처럼 쓰지 않습니다.
        </p>
        <Link className="text-sm font-bold text-[var(--accent-primary)]" href="/atlas">
          ← Roadmap
        </Link>
      </header>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold">System Evolution Flow</h2>
        <ol className="grid gap-2">
          {SYSTEM_EVOLUTION_FLOW.map((line) => (
            <li
              className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3 py-2 text-sm leading-6"
              key={line}
            >
              {line}
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold">Historical / documented anchors</h2>
        <ul className="grid gap-3">
          {TIMELINE_EVENTS.map((event) => (
            <li className="rounded-xl border border-[var(--border-default)] p-4" key={event.id}>
              <p className="text-xs font-bold text-[var(--text-tertiary)]">
                {event.dateLabel} · {event.band} · {event.claimScope} · kb:{event.kbId}
              </p>
              <h3 className="mt-1 text-base font-extrabold text-[var(--text-primary)]">
                {event.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{event.summary}</p>
              <Link
                className="mt-2 inline-block text-sm font-bold text-[var(--accent-primary)]"
                href={`/atlas/concepts/${event.conceptId}`}
              >
                Concept: {event.conceptId}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
