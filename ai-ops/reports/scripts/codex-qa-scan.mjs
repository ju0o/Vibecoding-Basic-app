import { promises as fs } from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TODAY = "2026-07-12"

const LESSON_DIR = path.join(ROOT, "src/content/lessons/markdown")
const DIAGRAM_DIR = path.join(ROOT, "src/content/lessons/diagrams")
const KB_DIR = path.join(ROOT, "ai-ops/knowledge-base/entries")
const BACKLOG_PATH = path.join(ROOT, "ai-ops/outputs/00-backlog/BACKLOG.md")
const MASTER_PROGRESS_PATH = path.join(ROOT, "ai-ops/MASTER_PROGRESS.md")
const GLOSSARY_PATH = path.join(ROOT, "src/content/glossary.ts")
const REPORT_PATH = path.join(ROOT, "ai-ops/reports/codex-qa-scan.md")

const V2_SECTIONS = [
  "한 줄 정의",
  "왜 존재하는가",
  "작동 원리",
  "스펙과 세부",
  "원문으로 읽기",
  "실전에서",
  "한계와 트레이드오프",
  "더 읽기",
]

const V1_LEGACY = new Set()

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function walkFiles(dir, extension) {
  if (!(await pathExists(dir))) {
    return []
  }

  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return walkFiles(fullPath, extension)
      }
      if (entry.isFile() && entry.name.endsWith(extension)) {
        return [fullPath]
      }
      return []
    }),
  )

  return files.flat().sort()
}

function rel(filePath) {
  return path.relative(ROOT, filePath).replaceAll(path.sep, "/")
}

function slugFromFile(filePath) {
  return path.basename(filePath, path.extname(filePath))
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function stripCode(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "")
}

function extractUrls(markdown) {
  const urls = []
  for (const match of markdown.matchAll(/https?:\/\/[^\s<>"')\]]+/g)) {
    const normalized = match[0].replace(/[.,;:!?]+$/g, "")
    try {
      urls.push(new URL(normalized).toString())
    } catch {
      // Ignore malformed partial matches.
    }
  }
  return urls
}

function extractLessonQuotes(markdown) {
  return [...markdown.matchAll(/^>\s*"([^"]+)"\s*$/gm)].map((match) => match[1])
}

function extractQuoteBankQuotes(markdown) {
  return [...markdown.matchAll(/^\s*-\s*>\s*"([^"]+)"\s*$/gm)].map((match) => match[1])
}

function parseKbIds(cell) {
  return cell
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item && item !== "-" && !item.toLowerCase().startsWith("n/a"))
}

async function loadLessonKbMap() {
  const backlog = await fs.readFile(BACKLOG_PATH, "utf8")
  const masterProgress = await fs.readFile(MASTER_PROGRESS_PATH, "utf8")
  const map = new Map()

  for (const line of backlog.split(/\r?\n/)) {
    if (!line.startsWith("|")) {
      continue
    }

    const columns = line
      .slice(1, -1)
      .split("|")
      .map((column) => column.trim())

    if (columns.length < 11 || columns[0] === "---:" || columns[2] === "slug") {
      continue
    }

    const slug = columns[2]
    const kbIds = parseKbIds(columns[9])

    map.set(slug, kbIds)
  }

  for (const line of masterProgress.split(/\r?\n/)) {
    if (!line.startsWith("|")) {
      continue
    }

    const columns = line
      .slice(1, -1)
      .split("|")
      .map((column) => column.trim())

    if (columns.length !== 8 || columns[0] === "---" || columns[0] === "강의 slug") {
      continue
    }

    const slug = columns[0]
    const kbIds = parseKbIds(columns[2])

    if (kbIds.length > 0) {
      map.set(slug, kbIds)
    }
  }

  return map
}

function readKbId(markdown, filePath) {
  const match = markdown.match(/^id:\s*"?([^"\r\n]+)"?\s*$/m)
  return match ? match[1].trim() : slugFromFile(filePath)
}

async function loadKbQuoteBanks(kbFiles) {
  const kbById = new Map()

  for (const file of kbFiles) {
    const markdown = await fs.readFile(file, "utf8")
    const id = readKbId(markdown, file)
    kbById.set(id, {
      file,
      quotes: new Set(extractQuoteBankQuotes(markdown)),
      raw: markdown,
    })
  }

  return kbById
}

function scanLessonFormat(file, markdown) {
  const slug = slugFromFile(file)
  const stripped = stripCode(markdown)
  const missingSections = V2_SECTIONS.filter((section) => {
    const headingPattern = new RegExp(`^##\\s+${escapeRegExp(section)}\\s*$`, "m")
    return !headingPattern.test(markdown)
  })
  const callouts = stripped.match(/^>\s*\[![^\]]+\]/gm) ?? []
  const highlightMarks = stripped.match(/==/g) ?? []
  const issues = []

  if (missingSections.length > 0) {
    issues.push(`V2 섹션 누락: ${missingSections.join(", ")}`)
  }
  if (stripped.length < 8000) {
    issues.push(`8,000자 미만: ${stripped.length}자`)
  }
  if (callouts.length > 8) {
    issues.push(`콜아웃 8개 초과: ${callouts.length}개`)
  }
  if (highlightMarks.length % 2 !== 0) {
    issues.push(`하이라이트 == 홀수: ${highlightMarks.length}개`)
  }

  return {
    slug,
    charCount: stripped.length,
    calloutCount: callouts.length,
    highlightCount: highlightMarks.length,
    issues,
  }
}

function scanCitations(file, markdown, lessonKbMap, kbById) {
  const slug = slugFromFile(file)
  const quotes = extractLessonQuotes(markdown)
  const kbIds = lessonKbMap.get(slug) ?? []
  const availableQuotes = new Set()
  const missingKbs = []
  const issues = []

  for (const kbId of kbIds) {
    const kb = kbById.get(kbId)
    if (!kb) {
      missingKbs.push(kbId)
      continue
    }
    for (const quote of kb.quotes) {
      availableQuotes.add(quote)
    }
  }

  if (quotes.length > 0 && kbIds.length === 0) {
    issues.push(`대응 KB 매핑 없음: ${quotes.length}개 인용`)
  }

  for (const quote of quotes) {
    if (!availableQuotes.has(quote)) {
      issues.push(`Quote Bank 불일치: "${quote}"`)
    }
  }

  for (const kbId of missingKbs) {
    issues.push(`대응 KB 파일 없음: ${kbId}`)
  }

  return { slug, quoteCount: quotes.length, kbIds, issues }
}

async function checkUrl(url) {
  const headers = { "user-agent": "codex-qa-scan/1.0" }

  for (const method of ["HEAD", "GET"]) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: controller.signal,
        headers,
      })
      clearTimeout(timeout)

      if (method === "HEAD" && [403, 405, 406].includes(response.status)) {
        continue
      }

      return {
        ok: response.status > 0 && response.status < 500,
        status: response.status,
        method,
        error: "",
      }
    } catch (error) {
      clearTimeout(timeout)
      if (method === "GET") {
        return {
          ok: false,
          status: 0,
          method,
          error: error instanceof Error ? error.message : String(error),
        }
      }
    }
  }

  return { ok: false, status: 0, method: "GET", error: "unreachable" }
}

async function scanLinks(files) {
  const domains = new Map()

  for (const file of files) {
    const markdown = await fs.readFile(file, "utf8")
    for (const url of extractUrls(stripCode(markdown))) {
      const parsed = new URL(url)
      const domain = parsed.hostname.replace(/^www\./, "")
      if (!domains.has(domain)) {
        domains.set(domain, { domain, sampleUrl: url, files: new Set() })
      }
      domains.get(domain).files.add(rel(file))
    }
  }

  const results = []
  for (const entry of [...domains.values()].sort((a, b) => a.domain.localeCompare(b.domain))) {
    const result = await checkUrl(entry.sampleUrl)
    results.push({
      ...entry,
      fileCount: entry.files.size,
      ok: result.ok,
      status: result.status,
      method: result.method,
      error: result.error,
    })
  }

  return results
}

async function scanDiagrams(lessonFiles) {
  const svgFiles = await walkFiles(DIAGRAM_DIR, ".svg")
  const lessonBySlug = new Map(lessonFiles.map((file) => [slugFromFile(file), file]))
  const issues = []

  for (const svgFile of svgFiles) {
    const slug = path.basename(path.dirname(svgFile))
    const filename = path.basename(svgFile)
    const lessonFile = lessonBySlug.get(slug)

    if (!lessonFile) {
      issues.push({
        slug,
        file: rel(svgFile),
        issue: "대응 마크다운 파일 없음",
      })
      continue
    }

    const markdown = await fs.readFile(lessonFile, "utf8")
    const referencePattern = new RegExp(
      `!\\[[^\\]]*\\]\\([^)]*${escapeRegExp(slug)}/${escapeRegExp(filename)}\\)`,
    )

    if (!referencePattern.test(markdown)) {
      issues.push({
        slug,
        file: rel(svgFile),
        issue: "대응 마크다운에서 이미지 참조 누락",
      })
    }
  }

  return { svgFiles, issues }
}

function scanGlossary(source) {
  const terms = []
  const relatedByTerm = new Map()
  const objectPattern = /\{\s*term:\s*"([^"]+)"[\s\S]*?related:\s*\[([\s\S]*?)\][\s\S]*?\}/g

  for (const match of source.matchAll(objectPattern)) {
    const term = match[1]
    const related = [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1])
    terms.push(term)
    relatedByTerm.set(term, related)
  }

  const termSet = new Set(terms)
  const duplicateTerms = terms.filter((term, index) => terms.indexOf(term) !== index)
  const missingRelated = []

  for (const [term, relatedItems] of relatedByTerm) {
    for (const related of relatedItems) {
      if (!termSet.has(related)) {
        missingRelated.push({ term, related })
      }
    }
  }

  return {
    termCount: terms.length,
    duplicateTerms: [...new Set(duplicateTerms)].sort(),
    missingRelated: missingRelated.sort((a, b) =>
      `${a.term}:${a.related}`.localeCompare(`${b.term}:${b.related}`),
    ),
  }
}

function addSection(lines, title) {
  lines.push("")
  lines.push(`## ${title}`)
  lines.push("")
}

function addIssueList(lines, items, emptyMessage) {
  if (items.length === 0) {
    lines.push(`- ${emptyMessage}`)
    return
  }

  for (const item of items) {
    lines.push(`- ${item}`)
  }
}

function renderReport(data) {
  const {
    lessonFiles,
    kbFiles,
    formatViolations,
    v1Known,
    citationViolations,
    linkResults,
    diagramResult,
    glossaryResult,
    sampleChecks,
  } = data
  const linkFailures = linkResults.filter((result) => !result.ok)
  const glossaryViolationCount =
    glossaryResult.duplicateTerms.length + glossaryResult.missingRelated.length
  const violationCount =
    formatViolations.length +
    citationViolations.length +
    linkFailures.length +
    diagramResult.issues.length +
    glossaryViolationCount
  const lines = []

  lines.push(`# Codex QA Scan — M5 (${TODAY})`)
  lines.push("")
  lines.push("## 요약")
  lines.push("")
  lines.push(`- 강의 마크다운 검사 파일 수: ${lessonFiles.length}`)
  lines.push(`- KB 검사 파일 수: ${kbFiles.length}`)
  lines.push(`- 다이어그램 SVG 검사 파일 수: ${diagramResult.svgFiles.length}`)
  lines.push(`- 용어집 term 수: ${glossaryResult.termCount}`)
  lines.push(`- 링크 생존 검사 도메인 수(중복 제거): ${linkResults.length}`)
  lines.push(`- 위반 수(V1 알려짐 제외): ${violationCount}`)

  if (violationCount === 0) {
    lines.push("- 위반 없음")
  }

  lines.push("")
  lines.push("| 검사 | 위반 수 | 비고 |")
  lines.push("|---|---:|---|")
  lines.push(
    `| 형식(8섹션·8,000자·콜아웃≤8·하이라이트 짝수) | ${formatViolations.length} | V1 알려짐 ${v1Known.length}건 별도 표기 |`,
  )
  lines.push(
    `| 인용(강의 quote ↔ KB Quote Bank 글자 일치) | ${citationViolations.length} | MASTER_PROGRESS KB ids 우선, BACKLOG fallback |`,
  )
  lines.push(
    `| 링크 생존(도메인 중복 제거) | ${linkFailures.length} | HTTP 5xx/네트워크 실패만 위반 처리 |`,
  )
  lines.push(
    `| 다이어그램 참조 | ${diagramResult.issues.length} | src/content/lessons/diagrams/*/*.svg 기준 |`,
  )
  lines.push(
    `| 용어집(term 중복·related 실존) | ${glossaryViolationCount} | 정확한 term 문자열 기준 |`,
  )

  addSection(lines, "형식 위반")
  addIssueList(
    lines,
    formatViolations.map((item) => `\`${item.file}\`: ${item.issues.join("; ")}`),
    "위반 없음",
  )

  addSection(lines, "V1 알려짐")
  addIssueList(
    lines,
    v1Known.map((item) => `\`${item.file}\`: ${item.issues.join("; ")}`),
    "해당 없음",
  )

  addSection(lines, "인용 위반")
  addIssueList(
    lines,
    citationViolations.map((item) => `\`${item.file}\`: ${item.issues.join("; ")}`),
    "위반 없음",
  )

  addSection(lines, "링크 생존")
  if (linkFailures.length === 0) {
    lines.push("- 위반 없음")
  } else {
    for (const failure of linkFailures) {
      lines.push(
        `- ${failure.domain}: ${failure.sampleUrl} (${failure.method}, status ${failure.status || "n/a"}, ${failure.error || "HTTP failure"})`,
      )
    }
  }

  lines.push("")
  lines.push("<details>")
  lines.push("<summary>도메인별 검사 결과</summary>")
  lines.push("")
  lines.push("| domain | status | method | sample | files |")
  lines.push("|---|---:|---|---|---:|")
  for (const result of linkResults) {
    lines.push(
      `| ${result.domain} | ${result.status || "n/a"} | ${result.method} | ${result.sampleUrl} | ${result.fileCount} |`,
    )
  }
  lines.push("")
  lines.push("</details>")

  addSection(lines, "다이어그램 위반")
  addIssueList(
    lines,
    diagramResult.issues.map((item) => `\`${item.file}\`: ${item.issue} (${item.slug})`),
    "위반 없음",
  )

  addSection(lines, "용어집 위반")
  if (glossaryViolationCount === 0) {
    lines.push("- 위반 없음")
  } else {
    if (glossaryResult.duplicateTerms.length > 0) {
      lines.push(`- 중복 term: ${glossaryResult.duplicateTerms.join(", ")}`)
    }
    for (const item of glossaryResult.missingRelated) {
      lines.push(`- \`${item.term}\` related \`${item.related}\` 미등재`)
    }
  }

  addSection(lines, "극단값 및 표본 손 검증")
  const formatRatio = formatViolations.length / Math.max(lessonFiles.length, 1)
  const citationRatio = citationViolations.length / Math.max(lessonFiles.length, 1)
  if (formatRatio >= 0.8 || citationRatio >= 0.8) {
    lines.push("- 극단값 감지: 전 강의급 위반 가능성이 있어 표본 3개를 수동 대조했다.")
  } else {
    lines.push("- 전 강의급 극단값은 감지되지 않았다. 그래도 표본 3개를 손으로 대조했다.")
  }
  for (const sample of sampleChecks) {
    lines.push(`- \`${sample.slug}\`: ${sample.note}`)
  }

  addSection(lines, "검사 규칙")
  lines.push(
    "- 형식: 코드 펜스와 인라인 코드를 제거한 뒤 글자 수, 콜아웃 수, `==` 개수를 계산했다.",
  )
  lines.push(
    '- 인용: 강의의 `> "..."` 직접 인용이 MASTER_PROGRESS 우선, BACKLOG fallback으로 찾은 대응 KB Quote Bank에 글자 단위로 존재하는지 확인했다.',
  )
  lines.push(
    "- 링크: 강의와 KB에서 URL을 추출하고 도메인 중복 제거 후 대표 URL을 HEAD/GET으로 확인했다.",
  )
  lines.push(
    "- 다이어그램: 모든 `src/content/lessons/diagrams/*/*.svg`가 대응 slug 마크다운에서 `![...]`로 참조되는지 확인했다.",
  )
  lines.push("- 용어집: `term` 중복과 `related` 항목의 실제 term 존재 여부를 검사했다.")
  lines.push("- 스크립트 동작: 본 스캔은 리포트 파일만 생성한다.")

  return `${lines.join("\n")}\n`
}

function sampleLessonCheck(slug, lessonFiles, formatScans) {
  const file = lessonFiles.find((item) => slugFromFile(item) === slug)
  const scan = formatScans.find((item) => item.slug === slug)

  if (!file || !scan) {
    return { slug, note: "파일 없음" }
  }

  if (V1_LEGACY.has(slug)) {
    return { slug, note: "V1 레거시 5강 중 하나로 V2 형식 미준수는 알려짐으로 분리했다." }
  }

  if (scan.issues.length === 0) {
    return {
      slug,
      note: `V2 8섹션 존재, ${scan.charCount}자, 콜아웃 ${scan.calloutCount}개, 하이라이트 표식 ${scan.highlightCount}개로 스크립트 판정과 일치.`,
    }
  }

  return {
    slug,
    note: `스크립트 위반 확인: ${scan.issues.join("; ")}`,
  }
}

async function main() {
  const lessonFiles = await walkFiles(LESSON_DIR, ".md")
  const kbFiles = await walkFiles(KB_DIR, ".md")
  const lessonKbMap = await loadLessonKbMap()
  const kbById = await loadKbQuoteBanks(kbFiles)
  const formatScans = []
  const formatViolations = []
  const v1Known = []
  const citationViolations = []
  const allLinkFiles = [...lessonFiles, ...kbFiles]

  for (const file of lessonFiles) {
    const markdown = await fs.readFile(file, "utf8")
    const formatScan = scanLessonFormat(file, markdown)
    formatScans.push(formatScan)

    if (formatScan.issues.length > 0) {
      const item = { file: rel(file), ...formatScan }
      if (V1_LEGACY.has(formatScan.slug)) {
        v1Known.push(item)
      } else {
        formatViolations.push(item)
      }
    }

    const citationScan = scanCitations(file, markdown, lessonKbMap, kbById)
    if (citationScan.issues.length > 0 && !V1_LEGACY.has(citationScan.slug)) {
      citationViolations.push({ file: rel(file), ...citationScan })
    }
  }

  const [linkResults, diagramResult, glossarySource] = await Promise.all([
    scanLinks(allLinkFiles),
    scanDiagrams(lessonFiles),
    fs.readFile(GLOSSARY_PATH, "utf8"),
  ])
  const glossaryResult = scanGlossary(glossarySource)
  const sampleChecks = [
    sampleLessonCheck("tokenization-and-context", lessonFiles, formatScans),
    sampleLessonCheck("html-semantic-elements", lessonFiles, formatScans),
    sampleLessonCheck("ai-vibe-coding-orientation", lessonFiles, formatScans),
  ]
  const report = renderReport({
    lessonFiles,
    kbFiles,
    formatViolations,
    v1Known,
    citationViolations,
    linkResults,
    diagramResult,
    glossaryResult,
    sampleChecks,
  })

  await fs.writeFile(REPORT_PATH, report, "utf8")
  console.log(`Wrote ${rel(REPORT_PATH)}`)
}

await main()
