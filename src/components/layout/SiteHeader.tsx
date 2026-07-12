"use client"

import { List, X } from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type { SearchEntry } from "@/content/schema"
import { SiteSearch } from "@/features/search/SiteSearch"
import { ThemeToggle } from "@/features/theme/ThemeToggle"

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/curriculum", label: "커리큘럼" },
  { href: "/glossary", label: "용어 사전" },
  { href: "/resources", label: "공식 문서" },
  { href: "/about", label: "소개" },
] as const

type SiteHeaderProps = {
  readonly searchEntries: readonly SearchEntry[]
}

export function SiteHeader({ searchEntries }: SiteHeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="주요 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link
              className={[
                "rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-[var(--surface-secondary)]",
                isActivePath(pathname, item.href)
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
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <SiteSearch entries={searchEntries} />
          <ThemeToggle />
          <button
            aria-expanded={mobileOpen}
            aria-label="모바일 메뉴 열기"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-primary)] lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            type="button"
          >
            {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <nav
          aria-label="모바일 메뉴"
          className="border-t border-[var(--border-subtle)] bg-[var(--surface-primary)] p-3 lg:hidden"
        >
          <div className="grid gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                className={[
                  "rounded-lg px-3 py-3 text-sm font-semibold",
                  isActivePath(pathname, item.href)
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
          </div>
        </nav>
      ) : null}
    </header>
  )
}

function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === href : pathname.startsWith(href)
}
