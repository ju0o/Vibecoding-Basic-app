import fs from "node:fs"
import path from "node:path"

const files = [
  "deployment-cli-reference.md",
  "git-init-add-commit-status.md",
  "git-log-diff-show.md",
  "github-pr-review-flow.md",
  "nextjs-routing-rendering.md",
  "database-tables-indexes.md",
  "git-rebase-cherry-pick-stash.md",
]

for (const f of files) {
  const p = path.join("src/content/lessons/markdown", f)
  if (!fs.existsSync(p)) continue
  let t = fs.readFileSync(p, "utf8")
  t = t.replace(/> "([^"]+)"/g, (_m, q) => {
    const cleaned = q
      .replace(/\s*\[\.\.\.\]\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    const short = `${cleaned.split(/\s+/).slice(0, 22).join(" ")} [...]`
    return `> "${short}"`
  })
  fs.writeFileSync(p, t)
  console.log("fixed", f)
}
