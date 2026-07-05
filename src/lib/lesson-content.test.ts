import { describe, expect, it } from "vitest"
import { LESSON_SECTION_DEFINITIONS } from "@/content/schema"
import { getAllLessons, parseLessonMarkdown, preprocessLessonMarkdown } from "@/lib/lesson-content"

describe("lesson content", () => {
  it("parses every required V2 lesson section when headings match the contract", () => {
    const markdown = LESSON_SECTION_DEFINITIONS.map(
      (section) => `## ${section.title}\n\n${section.title} 본문`,
    ).join("\n\n")

    const sections = parseLessonMarkdown("sample", markdown)

    expect(sections).toHaveLength(LESSON_SECTION_DEFINITIONS.length)
    expect(sections[0]?.title).toBe("한 줄 정의")
  })

  it("renders highlight marks outside code fences only", () => {
    const markdown = ["문장 ==핵심==", "", "```ts", "const value = '==raw=='", "```"].join("\n")

    expect(preprocessLessonMarkdown(markdown)).toContain("<mark>핵심</mark>")
    expect(preprocessLessonMarkdown(markdown)).toContain("const value = '==raw=='")
  })

  it("marks supported callout blockquotes outside code fences only", () => {
    const markdown = [
      "> [!EXAMPLE]",
      "> 예시 본문",
      "",
      "> [!KEY]",
      "> 핵심 본문",
      "",
      "```md",
      "> [!WARNING]",
      "```",
    ].join("\n")
    const transformed = preprocessLessonMarkdown(markdown)

    expect(transformed).toContain('<span data-callout="EXAMPLE"></span>')
    expect(transformed).toContain('<span data-callout="KEY"></span>')
    expect(transformed).toContain("> [!WARNING]")
  })

  it("loads transition-period V1 sample lessons with fallback sections", () => {
    const lessons = getAllLessons()

    expect(lessons.length).toBeGreaterThanOrEqual(5)
    expect(lessons.every((lesson) => lesson.sections.length >= 8)).toBe(true)
  })
})
