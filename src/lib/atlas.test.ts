import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  ATLAS_CHAPTER_SECTIONS,
  ATLAS_CONCEPT_COUNT,
  ATLAS_CONCEPTS,
  ATLAS_SECTION_COUNT,
} from "@/content/atlas"
import {
  assertAtlasContract,
  getAtlasChapterSections,
  parseAtlasChapterMarkdown,
  validateAtlasChapterSections,
} from "@/lib/atlas"
import {
  EMPTY_ATLAS_PROGRESS,
  getAtlasConceptStatus,
  markChapterRead,
  recordConceptVisit,
} from "@/lib/atlas-progress"

describe("atlas contract freezes", () => {
  it("has exactly 21 concepts and 14 sections", () => {
    const contract = assertAtlasContract()
    expect(contract.ok).toBe(true)
    expect(ATLAS_CONCEPTS).toHaveLength(ATLAS_CONCEPT_COUNT)
    expect(ATLAS_CHAPTER_SECTIONS).toHaveLength(ATLAS_SECTION_COUNT)
    expect(ATLAS_CONCEPT_COUNT).toBe(21)
    expect(ATLAS_SECTION_COUNT).toBe(14)
  })

  it("keeps continuous order and prev/next links", () => {
    const sorted = [...ATLAS_CONCEPTS].sort((a, b) => a.order - b.order)
    sorted.forEach((concept, index) => {
      expect(concept.order).toBe(index + 1)
      if (index === 0) {
        expect(concept.previousConceptId).toBeNull()
      } else {
        expect(concept.previousConceptId).toBe(sorted[index - 1]?.id)
      }
      if (index === sorted.length - 1) {
        expect(concept.nextConceptId).toBeNull()
      } else {
        expect(concept.nextConceptId).toBe(sorted[index + 1]?.id)
      }
    })
  })

  it("does not add Model Routing as a core concept id", () => {
    expect(ATLAS_CONCEPTS.some((c) => c.id === "model-routing")).toBe(false)
    const orch = ATLAS_CONCEPTS.find((c) => c.id === "orchestration")
    expect(orch?.subordinateRoutes?.[0]?.href).toBe("/model-routing")
  })
})

describe("atlas chapters", () => {
  it("loads 14 sections for every concept file", () => {
    for (const concept of ATLAS_CONCEPTS) {
      const sections = getAtlasChapterSections(concept.id)
      expect(sections, concept.id).toBeDefined()
      expect(validateAtlasChapterSections(sections ?? []), concept.id).toBe(true)
    }
  })

  it("parses section titles in PRD order", () => {
    const md = ATLAS_CHAPTER_SECTIONS.map((s) => `## ${s.title}\n\nbody\n`).join("\n")
    const sections = parseAtlasChapterMarkdown(md)
    expect(sections.map((s) => s.id)).toEqual(ATLAS_CHAPTER_SECTIONS.map((s) => s.id))
  })

  it("chapter files exist on disk", () => {
    const dir = path.join(process.cwd(), "src", "content", "atlas", "chapters")
    for (const concept of ATLAS_CONCEPTS) {
      expect(fs.existsSync(path.join(dir, `${concept.id}.md`)), concept.id).toBe(true)
    }
  })
})

describe("atlas progress", () => {
  it("tracks visit and read without affecting lessons", () => {
    let progress = EMPTY_ATLAS_PROGRESS
    progress = recordConceptVisit(progress, "ai")
    expect(getAtlasConceptStatus(progress, "ai")).toBe("reading")
    progress = markChapterRead(progress, "ai")
    expect(getAtlasConceptStatus(progress, "ai")).toBe("completed")
  })
})
