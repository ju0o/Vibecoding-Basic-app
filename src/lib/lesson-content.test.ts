import { describe, expect, it } from "vitest"
import { LESSON_SECTION_DEFINITIONS } from "@/content/schema"
import { getAllLessons, parseLessonMarkdown } from "@/lib/lesson-content"

describe("lesson content", () => {
  it("parses every required lesson section when headings match the contract", () => {
    const markdown = LESSON_SECTION_DEFINITIONS.map(
      (section) => `## ${section.title}\n\n${section.title} 본문`,
    ).join("\n\n")

    const sections = parseLessonMarkdown("sample", markdown)

    expect(sections).toHaveLength(LESSON_SECTION_DEFINITIONS.length)
    expect(sections[0]?.title).toBe("오늘 배울 것")
  })

  it("loads V1 sample lessons with all required sections", () => {
    const lessons = getAllLessons()

    expect(lessons.length).toBeGreaterThanOrEqual(5)
    expect(lessons.every((lesson) => lesson.sections.length === 13)).toBe(true)
  })
})
