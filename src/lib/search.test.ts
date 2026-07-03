import { describe, expect, it } from "vitest"
import type { SearchEntry } from "@/content/schema"
import { searchCatalog } from "@/lib/search"

const entries = [
  {
    kind: "lesson",
    title: "Context Engineering, MCP, Skills의 관계",
    href: "/lessons/context-engineering-mcp-skills",
    summary: "AI가 일할 맥락과 도구 연결을 설계합니다.",
    keywords: ["MCP", "Agent", "Context"],
  },
  {
    kind: "glossary",
    title: "HTML",
    href: "/glossary",
    summary: "웹 페이지 구조",
    keywords: ["CSS", "JavaScript"],
  },
] satisfies readonly SearchEntry[]

describe("searchCatalog", () => {
  it("returns no results for blank search", () => {
    expect(searchCatalog(entries, "   ")).toEqual([])
  })

  it("prioritizes direct title matches", () => {
    const results = searchCatalog(entries, "MCP")

    expect(results[0]?.title).toBe("Context Engineering, MCP, Skills의 관계")
  })
})
