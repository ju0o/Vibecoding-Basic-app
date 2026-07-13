import fs from "node:fs"

const curriculum = fs.readFileSync("src/content/curriculum.ts", "utf8")
const atlas = fs.readFileSync("src/content/atlas.ts", "utf8")
const slugs = [...curriculum.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])
const needed = new Set(
  [...atlas.matchAll(/lessonSlugs:\s*\[([^\]]*)\]/g)].flatMap((m) =>
    [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
  ),
)
const missing = [...needed].filter((s) => !slugs.includes(s))
console.log(JSON.stringify({ missing, ok: missing.length === 0 }, null, 2))
process.exit(missing.length === 0 ? 0 : 1)
