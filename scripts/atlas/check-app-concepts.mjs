import fs from "node:fs"
import path from "node:path"

const atlasPath = path.join(process.cwd(), "src/content/atlas.ts")
const source = fs.readFileSync(atlasPath, "utf8")
const countMatch = source.match(/ATLAS_CONCEPT_COUNT\s*=\s*(\d+)/)
const declared = countMatch ? Number(countMatch[1]) : null
const sectionCount = source.match(/ATLAS_SECTION_COUNT\s*=\s*(\d+)/)
const sectionDeclared = sectionCount ? Number(sectionCount[1]) : null
const chapterDir = path.join(process.cwd(), "src/content/atlas/chapters")
const chapterFiles = fs.readdirSync(chapterDir).filter((f) => f.endsWith(".md"))

const result = {
  ok: declared === 21 && sectionDeclared === 14 && chapterFiles.length === 21,
  declaredConcepts: declared,
  declaredSections: sectionDeclared,
  chapterFiles: chapterFiles.length,
  note: "App-side freeze check; PRD freezes via check-ssot-freezes.mjs",
}
console.log(JSON.stringify(result, null, 2))
process.exit(result.ok ? 0 : 1)
