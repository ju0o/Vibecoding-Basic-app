import Link from "next/link"
import type { ReactNode } from "react"

export default function ModelRoutingLayout({ children }: { readonly children: ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[var(--surface-primary)]">
      <div className="border-b border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3 text-sm sm:px-6">
          <Link className="font-bold text-[var(--accent-primary)]" href="/model-routing">
            Model Routing Learning Route
          </Link>
          <span className="text-[var(--text-tertiary)]" aria-hidden="true">
            /
          </span>
          <Link
            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            href="/model-routing/simulator"
          >
            Simulator
          </Link>
          <span className="text-[var(--text-tertiary)]" aria-hidden="true">
            /
          </span>
          <Link
            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
            href="/curriculum"
          >
            커리큘럼
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
