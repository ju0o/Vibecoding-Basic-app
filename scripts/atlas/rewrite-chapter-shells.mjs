import fs from "node:fs"
import path from "node:path"

const sections = [
  "한 줄 정의",
  "왜 등장했는가",
  "이전 기술의 한계",
  "무엇을 해결했는가",
  "실제 사례",
  "대표 기업",
  "대표 서비스",
  "실제 프로젝트에서는 어떻게 사용하는가",
  "인터랙티브 애니메이션",
  "인터랙티브 다이어그램",
  "실습",
  "퀴즈",
  "관련 기술",
  "다음 기술",
]

const ids = [
  "ai",
  "machine-learning",
  "deep-learning",
  "generative-ai",
  "llm",
  "prompt-engineering",
  "context-engineering",
  "memory",
  "knowledge",
  "embedding",
  "rag",
  "tool-calling",
  "mcp",
  "skill",
  "agent",
  "subagent",
  "workflow",
  "orchestration",
  "evaluation",
  "harness",
  "production-ai",
]

const dir = path.join(process.cwd(), "src/content/atlas/chapters")
fs.mkdirSync(dir, { recursive: true })

const shellBody = "교육용 최소 본문입니다. 상세 원리와 출처는 연결 강의·KB에서 확인하세요."
const partialBody =
  "<!-- partial -->\n이 섹션은 교육용 shell입니다. 근거 KB와 Textbook 심화 링크는 카드에서 확인하세요. status=partial"

for (const id of ids) {
  const parts = sections.map((title, i) => {
    const body = i < 4 ? shellBody : partialBody
    return `## ${title}\n\n${body}\n`
  })
  fs.writeFileSync(path.join(dir, `${id}.md`), parts.join("\n"), "utf8")
}

const sample = fs.readFileSync(path.join(dir, "ai.md"), "utf8")
const newlines = (sample.match(/\n/g) || []).length
const headings = (sample.match(/^## /gm) || []).length
const hasLiteral = sample.includes("\\n")
console.log(
  JSON.stringify(
    {
      files: ids.length,
      aiNewlines: newlines,
      aiHeadings: headings,
      hasLiteralBackslashN: hasLiteral,
      first120: sample.slice(0, 120),
    },
    null,
    2,
  ),
)
if (headings !== 14 || hasLiteral || newlines < 28) {
  process.exit(1)
}
