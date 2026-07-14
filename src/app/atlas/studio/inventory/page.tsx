import type { Metadata } from "next"
import Link from "next/link"
import { buildAtlasContentManifest, buildContentInventory } from "@/lib/atlas/content-manifest"

export const metadata: Metadata = {
  title: "Atlas Content Inventory (Operator)",
  robots: { index: false, follow: false },
}

export default function StudioInventoryPage() {
  const entries = buildAtlasContentManifest()
  const rows = buildContentInventory(entries)

  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6">
      <header className="grid gap-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Content Inventory</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          프로젝트 상대 경로만 표시합니다. 교육 자료 SSOT와 학생 화면의 연결을 설명합니다.
        </p>
        <Link className="text-sm font-bold text-[var(--accent-primary)]" href="/atlas/studio">
          ← Studio
        </Link>
      </header>

      <div className="overflow-x-auto rounded-lg border border-[var(--border-default)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-secondary)]">
            <tr>
              <th className="px-3 py-2">Content Type</th>
              <th className="px-3 py-2">Source Path</th>
              <th className="px-3 py-2">Concept</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Used By</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                className="border-t border-[var(--border-subtle)]"
                key={`${row.contentType}-${row.sourcePath}-${row.conceptId}-${row.usedBy}`}
              >
                <td className="px-3 py-2">{row.contentType}</td>
                <td className="px-3 py-2 font-mono text-xs">{row.sourcePath}</td>
                <td className="px-3 py-2 font-mono text-xs">{row.conceptId}</td>
                <td className="px-3 py-2">{row.status}</td>
                <td className="px-3 py-2">
                  {row.usedBy.startsWith("/") ? (
                    <Link className="text-[var(--accent-primary)]" href={row.usedBy}>
                      {row.usedBy}
                    </Link>
                  ) : (
                    row.usedBy
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
