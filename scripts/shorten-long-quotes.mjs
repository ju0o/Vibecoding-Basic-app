import fs from "node:fs"
import path from "node:path"

const dir = "src/content/lessons/markdown"
let n = 0

function shorten(text) {
  const cleaned = text
    .replace(/\s*\[\.\.\.\]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length <= 28 && cleaned.length <= 120) return cleaned
  return `${words.slice(0, 28).join(" ")} [...]`
}

for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
  const filePath = path.join(dir, f)
  const t = fs.readFileSync(filePath, "utf8")
  const next = t.replace(/> "([^"]+)"/g, (_m, q) => {
    const short = shorten(q)
    if (short !== q.trim()) n++
    return `> "${short}"`
  })
  if (next !== t) fs.writeFileSync(filePath, next)
}

console.log("shortened blocks", n)
