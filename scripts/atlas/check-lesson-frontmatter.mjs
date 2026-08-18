import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const lessonsDir = join(process.cwd(), "src", "content", "lessons", "markdown")
const requiredKeys = ["slug", "moduleId", "order", "title", "summary", "level", "type", "minutes", "tags"]
const files = readdirSync(lessonsDir).filter((fileName) => fileName.endsWith(".md"))
const slugs = []
const errors = []

for (const fileName of files) {
  const markdown = readFileSync(join(lessonsDir, fileName), "utf8")
  const lines = markdown.split(/\r?\n/u)
  if (lines[0] !== "---") {
    errors.push(`${fileName}: missing opening frontmatter delimiter`)
    continue
  }

  const end = lines.indexOf("---", 1)
  if (end < 0) {
    errors.push(`${fileName}: missing closing frontmatter delimiter`)
    continue
  }

  const values = new Map()
  for (const line of lines.slice(1, end)) {
    const separator = line.indexOf(":")
    if (separator < 1) {
      errors.push(`${fileName}: malformed frontmatter line`)
      continue
    }
    const key = line.slice(0, separator).trim()
    try {
      values.set(key, JSON.parse(line.slice(separator + 1).trim()))
    } catch {
      errors.push(`${fileName}: invalid JSON value for ${key}`)
    }
  }

  for (const key of requiredKeys) {
    if (!values.has(key)) errors.push(`${fileName}: missing ${key}`)
  }
  if (values.get("slug") !== fileName.slice(0, -3)) {
    errors.push(`${fileName}: slug does not match filename`)
  }
  slugs.push(values.get("slug"))
}

const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index)
if (duplicateSlugs.length > 0) errors.push(`duplicate slugs: ${[...new Set(duplicateSlugs)].join(", ")}`)
if (readFileSync(join(process.cwd(), "src", "content", "curriculum.ts"), "utf8").includes("LESSON_META")) {
  errors.push("curriculum.ts still contains LESSON_META")
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exitCode = 1
} else {
  console.log(`PASS: ${files.length} lesson files have valid frontmatter and unique slugs.`)
}
