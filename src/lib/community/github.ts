const GITHUB_OWNER_PATTERN = /^[A-Za-z0-9-]+$/
const GITHUB_REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+$/

/** Returns a canonical GitHub repository URL, or null for empty/invalid input. */
export function normalizeGithubRepositoryUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  try {
    const url = new URL(trimmed)
    if (url.protocol !== "https:" || url.hostname.toLowerCase() !== "github.com") return null
    if (url.username || url.password || url.search || url.hash) return null

    const segments = url.pathname.split("/").filter(Boolean)
    if (segments.length !== 2) return null
    const [owner, repository] = segments
    if (!owner || !repository) return null
    if (!GITHUB_OWNER_PATTERN.test(owner) || !GITHUB_REPOSITORY_PATTERN.test(repository))
      return null

    return `https://github.com/${owner}/${repository}`
  } catch {
    return null
  }
}

/** Builds the optional Firestore field without persisting empty input. */
export function buildGithubPostFields(value: string): { readonly githubUrl?: string } | null {
  if (!value.trim()) return {}
  const normalized = normalizeGithubRepositoryUrl(value)
  return normalized ? { githubUrl: normalized } : null
}

/** Safely reads the optional field from a legacy or current post document. */
export function getGithubRepositoryUrl(data: Record<string, unknown>): string | null {
  const value = data["githubUrl"]
  return typeof value === "string" ? normalizeGithubRepositoryUrl(value) : null
}
