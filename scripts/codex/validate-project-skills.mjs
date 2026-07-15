import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const skillRoot = path.join(root, ".agents", "skills")
const expected = [
  "claim-verification",
  "curriculum-node-authoring",
  "executable-practice",
  "interaction-accessibility",
  "milestone-review",
  "node-checkpoint",
  "repository-recovery",
  "research-queue-processing",
  "route-smoke",
  "studio-status-sync",
]
const headings = ["Purpose", "When to use", "Authority paths", "Inputs", "Allowed writes", "Forbidden writes", "Execution steps", "QA", "Return schema", "Failure conditions"]
const errors = []
const dirs = readdirSync(skillRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort()
const names = []

if (JSON.stringify(dirs) !== JSON.stringify(expected)) errors.push(`skill directories differ: ${dirs.join(",")}`)

for (const dir of dirs) {
  const file = path.join(skillRoot, dir, "SKILL.md")
  let text
  try {
    text = readFileSync(file, "utf8")
  } catch {
    errors.push(`${dir}: missing SKILL.md`)
    continue
  }

  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const name = frontmatter?.[1].match(/^name:\s*(.+)$/m)?.[1].trim()
  const description = frontmatter?.[1].match(/^description:\s*(.+)$/m)?.[1].trim()
  if (!frontmatter || !name || !description) errors.push(`${dir}: invalid frontmatter`)
  if (name !== dir) errors.push(`${dir}: frontmatter name ${name} does not match directory`)
  if (name) names.push(name)
  for (const heading of headings) {
    if (!new RegExp(`^# ${heading}$`, "m").test(text)) errors.push(`${dir}: missing heading ${heading}`)
  }
  if (!text.includes("None by default")) errors.push(`${dir}: default write boundary is not explicit`)
  if (!text.includes("Track D")) errors.push(`${dir}: Track D boundary is missing`)
}

if (new Set(names).size !== names.length) errors.push("duplicate skill name")

console.log(JSON.stringify({ ok: errors.length === 0, skills: dirs.length, names, errors }, null, 2))
process.exitCode = errors.length === 0 ? 0 : 1
