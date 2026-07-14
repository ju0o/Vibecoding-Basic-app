"use client"

import { CaretDown, List, X } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type { SearchEntry } from "@/content/schema"
import {
  isActiveNavPath,
  MOBILE_MORE_NAV,
  MOBILE_PRIMARY_NAV,
  PRIMARY_NAV,
} from "@/content/site-navigation"
import { SiteSearch } from "@/features/search/SiteSearch"
import { ThemeToggle } from "@/features/theme/ThemeToggle"

type SiteHeaderProps = {
  readonly searchEntries: readonly SearchEntry[]
}

export function SiteHeader({ searchEntries }: SiteHeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--surface-primary)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] font-mono text-sm font-bold text-[var(--accent-primary)]">
            AI
          </span>
          <span className="hidden min-w-0 text-sm font-extrabold text-[var(--text-primary)] sm:block">
            AI Vibe Coding Master
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="주요 메뉴">
          {PRIMARY_NAV.map((item) => (
            <Link
              className={[
                "rounded-lg px-2.5 py-2 text-sm font-semibold transition hover:bg-[var(--surface-secondary)]",
                isActiveNavPath(pathname, item.href)
                  ? "text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)]",
              ].join(" ")}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <SiteSearch entries={searchEntries} />
          <ThemeToggle />
          <button
            aria-expanded={mobileOpen}
            aria-label="모바일 메뉴 열기"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-primary)] xl:hidden"
            onClick={() => {
              setMobileOpen((current) => !current)
              setMoreOpen(false)
            }}
            type="button"
          >
            {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <nav
          aria-label="모바일 메뉴"
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-primary)] p-3 xl:hidden"
        >
          <div className="grid gap-2">
            {MOBILE_PRIMARY_NAV.map((item) => (
              <Link
                className={[
                  "rounded-lg px-3 py-3 text-sm font-semibold",
                  isActiveNavPath(pathname, item.href)
                    ? "bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                    : "text-[var(--text-secondary)]",
                ].join(" ")}
                href={item.href}
                key={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              aria-expanded={moreOpen}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-[var(--text-secondary)]"
              onClick={() => setMoreOpen((v) => !v)}
              type="button"
            >
              더보기
              <CaretDown className={moreOpen ? "rotate-180" : ""} size={16} weight="bold" />
            </button>
            {moreOpen
              ? MOBILE_MORE_NAV.map((item) => (
                  <Link
                    className={[
                      "rounded-lg px-3 py-3 pl-6 text-sm font-semibold",
                      isActiveNavPath(pathname, item.href)
                        ? "bg-[var(--accent-soft)] text-[var(--accent-primary)]"
                        : "text-[var(--text-secondary)]",
                    ].join(" ")}
                    href={item.href}
                    key={item.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))
              : null}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
