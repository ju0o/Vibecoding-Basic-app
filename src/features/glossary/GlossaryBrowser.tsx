"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { type ReactNode, useMemo, useState } from "react"
import type { GlossaryTerm } from "@/content/schema"

type GlossaryBrowserProps = {
  readonly terms: readonly GlossaryTerm[]
}

const ALL_FILTER = "전체"

export function GlossaryBrowser({ terms }: GlossaryBrowserProps) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(ALL_FILTER)
  const [selectedInitial, setSelectedInitial] = useState(ALL_FILTER)
  const normalizedQuery = query.trim().toLowerCase()
  const categories = useMemo(
    () => [ALL_FILTER, ...Array.from(new Set(terms.map((term) => term.category))).sort()],
    [terms],
  )
  const categoryFilteredTerms = useMemo(() => {
    if (selectedCategory === ALL_FILTER) {
      return terms
    }

    return terms.filter((term) => term.category === selectedCategory)
  }, [selectedCategory, terms])
  const initials = useMemo(
    () => [
      ALL_FILTER,
      ...Array.from(new Set(categoryFilteredTerms.map((term) => getInitial(term.term)))).sort(
        (left, right) => left.localeCompare(right, "ko-KR"),
      ),
    ],
    [categoryFilteredTerms],
  )
  const filteredTerms = useMemo(() => {
    return categoryFilteredTerms.filter((term) => {
      const matchesInitial =
        selectedInitial === ALL_FILTER || getInitial(term.term) === selectedInitial
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [term.term, term.category, term.shortDefinition, term.explanation, ...term.related]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesInitial && matchesQuery
    })
  }, [categoryFilteredTerms, normalizedQuery, selectedInitial])

  function selectCategory(category: string) {
    setSelectedCategory(category)
    setSelectedInitial(ALL_FILTER)
  }

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
      <div className="mt-5 space-y-4">
        <FilterGroup label="분류">
          {categories.map((category) => (
            <FilterChip
              active={selectedCategory === category}
              key={category}
              label={category}
              onClick={() => selectCategory(category)}
            />
          ))}
        </FilterGroup>
        <FilterGroup label="첫 글자">
          {initials.map((initial) => (
            <FilterChip
              active={selectedInitial === initial}
              key={initial}
              label={initial}
              onClick={() => setSelectedInitial(initial)}
            />
          ))}
        </FilterGroup>
      </div>
      <p className="mt-5 text-sm font-semibold text-[var(--text-tertiary)]">
        {filteredTerms.length}/{terms.length}개 용어 표시
      </p>
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

function FilterGroup({
  children,
  label,
}: {
  readonly children: ReactNode
  readonly label: string
}) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4">
      <p className="mb-3 text-xs font-bold text-[var(--text-tertiary)]">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  readonly active: boolean
  readonly label: string
  readonly onClick: () => void
}) {
  return (
    <button
      aria-pressed={active}
      className={[
        "rounded-full border px-3 py-1.5 text-sm font-semibold transition",
        active
          ? "border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white"
          : "border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}

function getInitial(value: string): string {
  return value.trim().slice(0, 1).toUpperCase() || "#"
}
