import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import {
  ATLAS_CHAPTER_SECTIONS,
  ATLAS_CONCEPT_COUNT,
  ATLAS_CONCEPTS,
  ATLAS_SECTION_COUNT,
  type AtlasChapterSectionId,
  type AtlasConcept,
} from "@/content/atlas"

export type AtlasChapterSection = {
  readonly id: AtlasChapterSectionId
  readonly title: string
  readonly content: string
  readonly empty: boolean
}

const CHAPTERS_DIRECTORY = path.join(process.cwd(), "src", "content", "atlas", "chapters")

export function getSortedAtlasConcepts(): readonly AtlasConcept[] {
  return [...ATLAS_CONCEPTS].sort((a, b) => a.order - b.order)
}

/** @deprecated prefer getSortedAtlasConcepts */
export const getSortedAtlasNodes = getSortedAtlasConcepts

export function getAtlasConceptById(conceptId: string): AtlasConcept | undefined {
  return ATLAS_CONCEPTS.find((concept) => concept.id === conceptId || concept.slug === conceptId)
}

/** @deprecated prefer getAtlasConceptById */
export const getAtlasNodeById = getAtlasConceptById

export function getPreviousNextAtlasConcepts(conceptId: string): {
  readonly previous: AtlasConcept | undefined
  readonly next: AtlasConcept | undefined
} {
  const sorted = getSortedAtlasConcepts()
  const index = sorted.findIndex((concept) => concept.id === conceptId)
  if (index === -1) {
    return { previous: undefined, next: undefined }
  }
  return {
    previous: index > 0 ? sorted[index - 1] : undefined,
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  }
}

/** @deprecated */
export const getPreviousNextAtlasNodes = getPreviousNextAtlasConcepts

export function parseAtlasChapterMarkdown(markdown: string): readonly AtlasChapterSection[] {
  const found = new Map<string, string>()
  const parts = markdown.split(/^## /m).filter((part) => part.trim().length > 0)

  for (const part of parts) {
    const newlineIndex = part.indexOf("\n")
    const heading = (newlineIndex === -1 ? part : part.slice(0, newlineIndex)).trim()
    const content = newlineIndex === -1 ? "" : part.slice(newlineIndex + 1).trim()
    const definition = ATLAS_CHAPTER_SECTIONS.find((section) => section.title === heading)
    if (definition !== undefined) {
      found.set(definition.id, content)
    }
  }

  return ATLAS_CHAPTER_SECTIONS.map((section) => {
    const content = found.get(section.id) ?? ""
    return {
      id: section.id,
      title: section.title,
      content,
      empty: content.length === 0 || content.includes("<!-- partial -->"),
    }
  })
}

export const getAtlasChapterSections = cache(
  (conceptId: string): readonly AtlasChapterSection[] | undefined => {
    const concept = getAtlasConceptById(conceptId)
    if (!concept) {
      return undefined
    }
    const filePath = path.join(CHAPTERS_DIRECTORY, `${concept.id}.md`)
    if (!fs.existsSync(filePath)) {
      return undefined
    }
    return parseAtlasChapterMarkdown(fs.readFileSync(filePath, "utf-8"))
  },
)

export function validateAtlasChapterSections(sections: readonly AtlasChapterSection[]): boolean {
  if (sections.length !== ATLAS_SECTION_COUNT) {
    return false
  }
  return sections.every((section, index) => section.id === ATLAS_CHAPTER_SECTIONS[index]?.id)
}

export function assertAtlasContract(): {
  readonly conceptCount: number
  readonly sectionCount: number
  readonly ok: boolean
} {
  return {
    conceptCount: ATLAS_CONCEPTS.length,
    sectionCount: ATLAS_CHAPTER_SECTIONS.length,
    ok:
      ATLAS_CONCEPTS.length === ATLAS_CONCEPT_COUNT &&
      ATLAS_CHAPTER_SECTIONS.length === ATLAS_SECTION_COUNT,
  }
}

export type PassportView = {
  readonly concept: AtlasConcept
  readonly previous: AtlasConcept | undefined
  readonly next: AtlasConcept | undefined
}

export function getConceptPassport(conceptId: string): PassportView | undefined {
  const concept = getAtlasConceptById(conceptId)
  if (!concept) {
    return undefined
  }
  const { previous, next } = getPreviousNextAtlasConcepts(conceptId)
  return { concept, previous, next }
}
