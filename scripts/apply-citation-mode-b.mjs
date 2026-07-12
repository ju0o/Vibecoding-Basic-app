/**
 * Apply Citation Policy Mode B to lesson markdown:
 * - Keep at most 3 primary-source quote blocks per lesson (in ## 원문으로 읽기 when present)
 * - Shorten quoted strings longer than ~50 words / 160 chars
 * - Convert surplus quote blocks to link-only references; keep commentary paragraphs
 */
import fs from "node:fs"
import path from "node:path"

const dir = "src/content/lessons/markdown"
const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .sort()
const report = []

function isCallout(block) {
  return /\[!(EXAMPLE|KEY|WARNING|TIP)\]/i.test(block)
}

function isPrimaryQuote(block) {
  if (isCallout(block)) return false
  const plain = block.replace(/^>\s?/gm, "")
  return /["“”]/.test(plain) || /\n—\s/.test(`\n${plain}`) || plain.includes("](http")
}

function extractUrl(block) {
  const m = block.match(/\((https?:\/\/[^)]+)\)/)
  return m?.[1] ?? null
}

function extractLinkTitle(block) {
  const m = block.match(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/)
  return m?.[1] ?? "원문"
}

function extractQuotedText(block) {
  const plain = block.replace(/^>\s?/gm, "")
  const m = plain.match(/["“]([^"”]+)["”]/)
  return m?.[1] ?? null
}

function shortenQuote(text) {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 50 && text.length <= 160) return text.trim()
  // Prefer first sentence-ish chunk
  const sentence = text.match(/^[\s\S]{1,160}?[.!?](?:\s|$)/)
  if (sentence && sentence[0].trim().split(/\s+/).length <= 55) {
    return sentence[0].trim()
  }
  const cut = words.slice(0, 45).join(" ")
  return `${cut} [...]`
}

function splitBlocks(text) {
  const lines = text.split(/\r?\n/)
  const parts = []
  let i = 0
  while (i < lines.length) {
    if (lines[i].startsWith(">")) {
      const start = i
      while (i < lines.length && (lines[i].startsWith(">") || lines[i].trim() === "")) {
        // stop blank after block ends: only consume contiguous > lines
        if (!lines[i].startsWith(">")) break
        i++
      }
      parts.push({ type: "quote", text: lines.slice(start, i).join("\n"), start, end: i })
    } else {
      const start = i
      while (i < lines.length && !lines[i].startsWith(">")) i++
      parts.push({ type: "text", text: lines.slice(start, i).join("\n") })
    }
  }
  return parts
}

function transformFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8")
  const parts = splitBlocks(original)
  let kept = 0
  let shortened = 0
  let demoted = 0
  const out = []

  for (const part of parts) {
    if (part.type !== "quote" || !isPrimaryQuote(part.text)) {
      out.push(part.text)
      continue
    }

    const quoted = extractQuotedText(part.text)
    const url = extractUrl(part.text)
    const title = extractLinkTitle(part.text)

    if (kept < 3) {
      if (quoted) {
        const short = shortenQuote(quoted)
        if (short !== quoted.trim()) shortened++
        // rebuild block preserving translation/link lines when possible
        const lines = part.text.split("\n")
        const rebuilt = []
        let replacedQuote = false
        for (const line of lines) {
          if (!replacedQuote && /["“]/.test(line)) {
            rebuilt.push(`> "${short}"`)
            replacedQuote = true
          } else {
            rebuilt.push(line)
          }
        }
        out.push(rebuilt.join("\n"))
      } else {
        out.push(part.text)
      }
      kept++
    } else {
      // Demote to link-only reference
      demoted++
      if (url) {
        out.push(`관련 원문(링크): [${title}](${url})`)
      } else {
        out.push(`관련 원문: ${title}`)
      }
    }
  }

  let result = out.join("\n")
  // normalize excessive blank lines
  result = result.replace(/\n{3,}/g, "\n\n")
  if (result !== original) {
    fs.writeFileSync(filePath, result)
  }
  return { file: path.basename(filePath), kept, shortened, demoted, changed: result !== original }
}

for (const f of files) {
  const r = transformFile(path.join(dir, f))
  if (r.changed || r.demoted || r.shortened) report.push(r)
}

fs.writeFileSync(
  "ai-ops/reports/citation-mode-b-apply-report.json",
  JSON.stringify({ updated: report.length, report }, null, 2),
)
console.log(
  JSON.stringify(
    {
      filesChanged: report.filter((r) => r.changed).length,
      totalDemoted: report.reduce((a, r) => a + r.demoted, 0),
      totalShortened: report.reduce((a, r) => a + r.shortened, 0),
    },
    null,
    2,
  ),
)
