import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import type { LessonMeta } from "@/content/schema"

const LESSON_CONTENT_DIR = join(process.cwd(), "src", "content", "lessons", "markdown")
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u

const LessonMetaFrontmatterSchema = z.object({
  slug: z.string().min(1),
  moduleId: z.string().min(1),
  order: z.number().int().positive(),
  title: z.string().min(1),
  summary: z.string().min(1),
  level: z.enum(["입문", "기초", "중급"]),
  type: z.enum(["deep-dive", "reference"]),
  minutes: z.number().int().positive(),
  tags: z.array(z.string()).min(1),
})

function parseFrontmatter(slug: string, markdown: string): LessonMeta {
  const match = markdown.match(FRONTMATTER_PATTERN)

  if (match?.[1] === undefined) {
    throw new Error(`Lesson ${slug} is missing frontmatter`)
  }

  const values: Record<string, unknown> = {}

  for (const line of match[1].split(/\r?\n/u)) {
    const separator = line.indexOf(":")
    if (separator < 1) continue

    const key = line.slice(0, separator).trim()
    const rawValue = line.slice(separator + 1).trim()

    try {
      values[key] = JSON.parse(rawValue)
    } catch {
      throw new Error(`Lesson ${slug} has invalid frontmatter value for ${key}`)
    }
  }

  return LessonMetaFrontmatterSchema.parse(values) as LessonMeta
}

export function getLessonMetaFromFrontmatter(): readonly LessonMeta[] {
  return readdirSync(LESSON_CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.slice(0, -3)
      return parseFrontmatter(slug, readFileSync(join(LESSON_CONTENT_DIR, fileName), "utf8"))
    })
    .sort((left, right) => left.order - right.order)
}
