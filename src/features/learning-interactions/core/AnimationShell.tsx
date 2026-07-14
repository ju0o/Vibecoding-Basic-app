"use client"

import type { ReactNode } from "react"

type AnimationShellProps = {
  readonly title: string
  readonly simulationNotice: string
  readonly ariaLive: string
  readonly statusLabel: string
  readonly controls: ReactNode
  readonly desktop: ReactNode
  readonly mobile: ReactNode
  readonly footerNote?: ReactNode
}

/** Layout chrome for interactive learning simulations. */
export function AnimationShell({
  title,
  simulationNotice,
  ariaLive,
  statusLabel,
  controls,
  desktop,
  mobile,
  footerNote,
}: AnimationShellProps) {
  return (
    <section
      aria-label={title}
      className="grid gap-4 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-4 shadow-sm sm:p-5"
    >
      <header className="grid gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{title}</h2>
          <p
            className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-900 dark:text-amber-100"
            role="status"
          >
            {simulationNotice}
          </p>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          현재 상태: <span className="font-bold text-[var(--text-primary)]">{statusLabel}</span>
        </p>
        <div aria-live="polite" className="sr-only">
          {ariaLive}
        </div>
      </header>

      <div className="hidden lg:block">{desktop}</div>
      <div className="lg:hidden">{mobile}</div>

      <div className="flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-3">
        {controls}
      </div>
      {footerNote ? <div className="text-xs text-[var(--text-tertiary)]">{footerNote}</div> : null}
    </section>
  )
}
