import type { Metadata } from "next"
import Link from "next/link"
import { ATLAS_CONCEPTS } from "@/content/atlas"
import { MODEL_ROUTING_EDGES } from "@/content/model-routing/graph"

export const metadata: Metadata = {
  title: "Atlas Knowledge Graph",
  description: "21 Concept and subordinate LearningUnit relationships (text-first).",
}

export default function AtlasGraphPage() {
  const conceptEdges = ATLAS_CONCEPTS.filter((c) => c.nextConceptId).map((c) => ({
    from: c.id,
    to: c.nextConceptId as string,
    kind: "evolves_to",
    why: c.whyBridge,
  }))

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6">
      <header className="grid gap-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Knowledge Graph</h1>
        <p className="text-sm leading-7 text-[var(--text-secondary)]">
          대형 Canvas 라이브러리 없이 관계 표를 제공합니다. 키보드·스크린리더 친화 텍스트
          대안입니다.
        </p>
        <Link className="text-sm font-bold text-[var(--accent-primary)]" href="/atlas">
          ← Roadmap
        </Link>
      </header>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold">Concept evolves_to</h2>
        <EdgeTable
          rows={conceptEdges.map((e) => ({
            from: e.from,
            kind: e.kind,
            to: e.to,
            why: e.why,
          }))}
        />
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold">Model Routing LearningUnit edges</h2>
        <EdgeTable
          rows={MODEL_ROUTING_EDGES.map((e) => ({
            from: e.from,
            kind: e.kind,
            to: e.to,
            why: e.whyBridge ?? "—",
          }))}
        />
      </section>
    </main>
  )
}

function EdgeTable({
  rows,
}: {
  readonly rows: readonly {
    readonly from: string
    readonly kind: string
    readonly to: string
    readonly why: string
  }[]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border-default)]">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[var(--surface-secondary)]">
          <tr>
            <th className="px-3 py-2">from</th>
            <th className="px-3 py-2">kind</th>
            <th className="px-3 py-2">to</th>
            <th className="px-3 py-2">why</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className="border-t border-[var(--border-subtle)]"
              key={`${row.from}-${row.to}-${row.kind}`}
            >
              <td className="px-3 py-2 font-mono text-xs">
                <Link className="text-[var(--accent-primary)]" href={hrefFor(row.from)}>
                  {row.from}
                </Link>
              </td>
              <td className="px-3 py-2">{row.kind}</td>
              <td className="px-3 py-2 font-mono text-xs">
                <Link className="text-[var(--accent-primary)]" href={hrefFor(row.to)}>
                  {row.to}
                </Link>
              </td>
              <td className="px-3 py-2 text-[var(--text-secondary)]">{row.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function hrefFor(id: string): string {
  if (id.startsWith("lu-") || id === "model-routing") {
    return id.startsWith("lu-") ? `/model-routing/${id}` : "/model-routing"
  }
  if (["orchestration", "evaluation", "harness"].includes(id) || !id.includes("/")) {
    const concept = ATLAS_CONCEPTS.find((c) => c.id === id)
    if (concept) {
      return `/atlas/concepts/${concept.id}`
    }
  }
  return "/atlas"
}
