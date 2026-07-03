"use client"

import { MagnifyingGlass, X } from "@phosphor-icons/react"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import type { SearchEntry } from "@/content/schema"
import { searchCatalog } from "@/lib/search"

type SiteSearchProps = {
  readonly entries: readonly SearchEntry[]
}

export function SiteSearch({ entries }: SiteSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => searchCatalog(entries, query), [entries, query])

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  function closeSearch() {
    setOpen(false)
    setQuery("")
  }

  return (
    <div className="relative">
      <button
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)] active:translate-y-px"
        onClick={() => setOpen(true)}
        type="button"
      >
        <MagnifyingGlass size={17} weight="bold" />
        <span className="hidden sm:inline">검색</span>
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-40 w-[min(88vw,520px)] rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.14)]">
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-2">
            <MagnifyingGlass size={18} weight="bold" />
            <input
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="강의, 용어, 공식 문서 검색"
              ref={inputRef}
              type="search"
              value={query}
            />
            <button
              aria-label="검색 닫기"
              className="rounded-md p-1 text-[var(--text-tertiary)] transition hover:bg-[var(--surface-inset)] hover:text-[var(--text-primary)]"
              onClick={closeSearch}
              type="button"
            >
              <X size={16} weight="bold" />
            </button>
          </div>
          <div className="mt-3 max-h-[420px] overflow-y-auto">
            {query.trim().length === 0 ? (
              <p className="rounded-lg bg-[var(--surface-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                예: React, API, MCP, Context Engineering
              </p>
            ) : results.length === 0 ? (
              <p className="rounded-lg bg-[var(--surface-secondary)] p-4 text-sm text-[var(--text-secondary)]">
                검색 결과가 없습니다. 다른 용어로 다시 시도해보세요.
              </p>
            ) : (
              <div className="space-y-2">
                {results.map((result) =>
                  isExternalHref(result.href) ? (
                    <a
                      className="block rounded-lg border border-[var(--border-subtle)] p-3 transition hover:border-[var(--accent-primary)]"
                      href={result.href}
                      key={`${result.kind}-${result.title}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ResultBody
                        kind={result.kind}
                        summary={result.summary}
                        title={result.title}
                      />
                    </a>
                  ) : (
                    <Link
                      className="block rounded-lg border border-[var(--border-subtle)] p-3 transition hover:border-[var(--accent-primary)]"
                      href={result.href}
                      key={`${result.kind}-${result.title}`}
                      onClick={closeSearch}
                    >
                      <ResultBody
                        kind={result.kind}
                        summary={result.summary}
                        title={result.title}
                      />
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ResultBody({
  kind,
  summary,
  title,
}: {
  readonly kind: SearchEntry["kind"]
  readonly summary: string
  readonly title: string
}) {
  return (
    <>
      <span className="text-xs font-bold text-[var(--accent-primary)]">{getKindLabel(kind)}</span>
      <strong className="mt-1 block text-sm text-[var(--text-primary)]">{title}</strong>
      <span className="mt-1 line-clamp-2 block text-sm text-[var(--text-secondary)]">
        {summary}
      </span>
    </>
  )
}

function getKindLabel(kind: SearchEntry["kind"]): string {
  switch (kind) {
    case "lesson":
      return "강의"
    case "glossary":
      return "용어"
    case "resource":
      return "문서"
  }
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://")
}
