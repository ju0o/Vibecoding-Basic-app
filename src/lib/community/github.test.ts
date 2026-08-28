import { describe, expect, it } from "vitest"
import {
  buildGithubPostFields,
  getGithubRepositoryUrl,
  normalizeGithubRepositoryUrl,
} from "./github"

describe("GitHub repository links", () => {
  it("accepts a valid GitHub repository URL", () => {
    expect(normalizeGithubRepositoryUrl("https://github.com/ju0o/gupiti")).toBe(
      "https://github.com/ju0o/gupiti",
    )
  })

  it("rejects invalid GitHub URLs", () => {
    expect(normalizeGithubRepositoryUrl("http://github.com/ju0o/gupiti")).toBeNull()
    expect(normalizeGithubRepositoryUrl("https://example.com/ju0o/gupiti")).toBeNull()
    expect(normalizeGithubRepositoryUrl("javascript:alert(1)")).toBeNull()
    expect(normalizeGithubRepositoryUrl("https://github.com/ju0o/gupiti/issues")).toBeNull()
  })

  it("treats an empty optional field as absent", () => {
    expect(normalizeGithubRepositoryUrl("   ")).toBeNull()
    expect(buildGithubPostFields("   ")).toEqual({})
  })

  it("keeps legacy posts without githubUrl compatible", () => {
    expect(getGithubRepositoryUrl({ title: "Existing post", bodyMarkdown: "Hello" })).toBeNull()
  })

  it("reads a valid githubUrl from a project post", () => {
    expect(getGithubRepositoryUrl({ githubUrl: "https://github.com/owner/project/" })).toBe(
      "https://github.com/owner/project",
    )
  })

  it("persists only a normalized githubUrl field", () => {
    expect(buildGithubPostFields(" https://github.com/owner/project/ ")).toEqual({
      githubUrl: "https://github.com/owner/project",
    })
    expect(buildGithubPostFields("https://github.com/owner/project/issues")).toBeNull()
  })
})
