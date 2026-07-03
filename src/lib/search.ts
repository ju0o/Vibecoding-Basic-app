import type { SearchEntry } from "@/content/schema"

export type SearchResult = SearchEntry & {
  readonly score: number
}

export function searchCatalog(
  entries: readonly SearchEntry[],
  query: string,
): readonly SearchResult[] {
  const normalizedQuery = normalize(query)

  if (normalizedQuery.length === 0) {
    return []
  }

  const tokens = normalizedQuery.split(/\s+/).filter((token) => token.length > 0)

  return entries
    .map((entry) => ({
      ...entry,
      score: scoreEntry(entry, normalizedQuery, tokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, 8)
}

function scoreEntry(
  entry: SearchEntry,
  normalizedQuery: string,
  tokens: readonly string[],
): number {
  const normalizedTitle = normalize(entry.title)
  const haystack = normalize([entry.title, entry.summary, ...entry.keywords].join(" "))
  let score = normalizedTitle.includes(normalizedQuery) ? 6 : 0

  for (const token of tokens) {
    if (normalizedTitle.includes(token)) {
      score += 4
      continue
    }

    if (haystack.includes(token)) {
      score += 1
    }
  }

  return score
}

function normalize(value: string): string {
  return value.trim().toLowerCase()
}
