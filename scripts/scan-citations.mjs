import fs from "node:fs"
import path from "node:path"

const dir = "src/content/lessons/markdown"
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"))
const long = []
const many = []
const allStats = []

for (const f of files) {
  const text = fs.readFileSync(path.join(dir, f), "utf8")
  const blocks = []
  let cur = []
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith(">")) {
      cur.push(line)
    } else if (cur.length > 0) {
      blocks.push(cur.join("\n"))
      cur = []
    }
  }
  if (cur.length > 0) {
    blocks.push(cur.join("\n"))
  }

  // Primary-source style quotes: exclude callouts [!TIP] etc.
  const quotes = blocks.filter((b) => {
    if (/\[!(EXAMPLE|KEY|WARNING|TIP)\]/i.test(b)) return false
    const plain = b.replace(/^>\s?/gm, "")
    return /["“”]/.test(plain) || plain.includes("—")
  })

  if (quotes.length > 3) {
    many.push({ f, n: quotes.length })
  }

  for (const b of quotes) {
    const plain = b
      .replace(/^>\s?/gm, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[>—-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    const words = plain.split(/\s+/).filter(Boolean).length
    // Mode B: ~50 words / 2-3 sentences. Flag >55 words OR quote body > 220 chars of English-ish content
    const quoteOnly = plain.match(/["“]([^"”]+)["”]/)?.[1] ?? plain
    if (words > 55 || quoteOnly.length > 160) {
      long.push({
        f,
        words,
        len: plain.length,
        qlen: quoteOnly.length,
        preview: plain.slice(0, 120),
      })
    }
  }
  allStats.push({ f, quoteCount: quotes.length })
}

many.sort((a, b) => b.n - a.n)
const out = {
  many,
  long,
  totalFiles: files.length,
  filesWithMany: many.length,
  longCount: long.length,
}
fs.mkdirSync("ai-ops/reports", { recursive: true })
fs.writeFileSync("ai-ops/reports/citation-review-mode-b-scan.json", JSON.stringify(out, null, 2))
console.log(
  JSON.stringify(
    { filesWithMany: many.length, longCount: long.length, topMany: many.slice(0, 20) },
    null,
    2,
  ),
)
console.log("--- long samples ---")
for (const x of long.slice(0, 30)) {
  console.log(`${x.words}w ${x.qlen}c ${x.f} :: ${x.preview}`)
}
