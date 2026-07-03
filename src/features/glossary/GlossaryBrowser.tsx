"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useMemo, useState } from "react"
import type { GlossaryTerm } from "@/content/schema"

type GlossaryBrowserProps = {
  readonly terms: readonly GlossaryTerm[]
}

export function GlossaryBrowser({ terms }: GlossaryBrowserProps) {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()
  const filteredTerms = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return terms
    }

    return terms.filter((term) =>
      [term.term, term.category, term.shortDefinition, term.explanation, ...term.related]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [normalizedQuery, terms])

  return (
    <section>
      <label className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-4 py-3">
        <MagnifyingGlass size={20} weight="bold" />
        <span className="sr-only">용어 검색</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="예: API, MCP, TypeScript"
          type="search"
          value={query}
        />
      </label>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredTerms.map((term) => (
          <article
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5"
            key={term.term}
          >
            <span className="text-xs font-bold text-[var(--accent-primary)]">{term.category}</span>
            <h2 className="mt-2 text-xl font-extrabold text-[var(--text-primary)]">{term.term}</h2>
            <p className="mt-2 font-semibold text-[var(--text-secondary)]">
              {term.shortDefinition}
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {term.explanation}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {term.related.map((item) => (
                <span
                  className="rounded-full bg-[var(--surface-secondary)] px-2 py-1 text-xs font-semibold text-[var(--text-tertiary)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      {filteredTerms.length === 0 ? (
        <p className="mt-6 rounded-lg bg-[var(--surface-secondary)] p-5 text-sm text-[var(--text-secondary)]">
          검색된 용어가 없습니다. 다른 키워드로 다시 검색해보세요.
        </p>
      ) : null}
    </section>
  )
}
