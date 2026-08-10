import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LessonMarkdown } from "@/components/lesson/LessonMarkdown"
import {
  D1_OUTCOMES,
  D1_QUESTIONS,
  D1_TEACH_BACK_PROMPT,
} from "@/features/learning-interactions/checkpoints/d1-checkpoints"
import { NodeCheckpoint } from "@/features/learning-interactions/core/NodeCheckpoint"

type V2Node = {
  readonly id: string
  readonly shortTitle: string
  readonly title: string
  readonly domain: string
  readonly estimatedTime: string
  readonly canonicalConceptIds: readonly string[]
}

const V2_NODES: readonly V2Node[] = [
  {
    id: "D1-llm-basics",
    shortTitle: "AI 기초",
    title: "LLM은 어떻게 문장을 다룰까?",
    domain: "Domain 1 — AI 기초",
    estimatedTime: "35–45분",
    canonicalConceptIds: ["llm", "embedding"],
  },
  {
    id: "D2-vibe-coding",
    shortTitle: "바이브코딩",
    title: "AI와 어떻게 함께 만들까?",
    domain: "Domain 2 — Prompt · Context · Workflow",
    estimatedTime: "40–50분",
    canonicalConceptIds: ["prompt-engineering", "context-engineering", "workflow"],
  },
  {
    id: "D3-ai-agent",
    shortTitle: "AI Agent",
    title: "AI에게 여러 역할을 맡기면 무엇이 달라질까?",
    domain: "Domain 3 — Agent · SubAgent · 역할 분담",
    estimatedTime: "45–55분",
    canonicalConceptIds: ["agent", "subagent", "workflow"],
  },
  {
    id: "D4-dev-ecosystem",
    shortTitle: "개발 생태계",
    title: "AI는 어떻게 바깥 도구와 연결될까?",
    domain: "Domain 4 — Tool Calling · MCP",
    estimatedTime: "45–55분",
    canonicalConceptIds: ["tool-calling", "mcp"],
  },
  {
    id: "D5-orchestration",
    shortTitle: "오케스트레이션",
    title: "AI 작업을 어떻게 반복 가능하게 운영할까?",
    domain: "Domain 5 — Orchestration · Automation",
    estimatedTime: "45–55분",
    canonicalConceptIds: ["memory", "workflow", "orchestration", "harness"],
  },
  {
    id: "D6-ide-tools",
    shortTitle: "IDE · 도구",
    title: "어떤 AI 코딩 도구를 어떻게 골라야 할까?",
    domain: "Domain 6 — IDE · Tools",
    estimatedTime: "45–55분",
    canonicalConceptIds: ["context-engineering", "agent", "workflow"],
  },
  {
    id: "D7-deploy-infra",
    shortTitle: "배포 · 인프라",
    title: "내 컴퓨터의 앱을 어떻게 다른 사람에게 보여 줄까?",
    domain: "Domain 7 — Deploy · Infra",
    estimatedTime: "50–60분",
    canonicalConceptIds: ["production-ai"],
  },
  {
    id: "D8-timeline",
    shortTitle: "AI 개발 연표",
    title: "AI와 만드는 방식은 해마다 어떻게 바뀌었을까?",
    domain: "Domain 8 — Timeline",
    estimatedTime: "45–55분",
    canonicalConceptIds: [
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
    ],
  },
] as const

type PageProps = {
  readonly params: Promise<{ readonly nodeId: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return V2_NODES.map((node) => ({ nodeId: node.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { nodeId } = await params
  const node = V2_NODES.find((candidate) => candidate.id === nodeId)

  if (!node) {
    return { title: "AI Engineering V2" }
  }

  return {
    title: `${node.shortTitle} — AI Engineering V2`,
    description: `${node.title} 학생 자율 학습 노드. 질문, 이론, 실습, 퀴즈와 완료 증거를 한 흐름으로 학습합니다.`,
  }
}

export default async function AiEngineeringV2NodePage({ params }: PageProps) {
  const { nodeId } = await params
  const nodeIndex = V2_NODES.findIndex((candidate) => candidate.id === nodeId)

  if (nodeIndex === -1) {
    notFound()
  }

  const node = V2_NODES[nodeIndex]

  if (!node) {
    notFound()
  }

  const previousNode = V2_NODES[nodeIndex - 1]
  const nextNode = V2_NODES[nodeIndex + 1]
  const markdown = readNodeMarkdown(node.id)

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav aria-label="현재 위치" className="mb-6 text-sm text-[var(--text-tertiary)]">
        <Link className="font-semibold text-[var(--accent-primary)] hover:underline" href="/learn">
          배우기
        </Link>
        <span aria-hidden="true"> / </span>
        <span>AI Engineering V2</span>
        <span aria-hidden="true"> / </span>
        <span aria-current="page" className="text-[var(--text-secondary)]">
          {node.shortTitle}
        </span>
      </nav>

      <header className="mb-8 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
          {node.id} · concept_node
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {node.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          {node.domain} · 예상 학습 시간 {node.estimatedTime}
        </p>
        <section className="mt-5" aria-labelledby="canonical-concepts">
          <h2 className="text-sm font-extrabold text-[var(--text-primary)]" id="canonical-concepts">
            연결된 Atlas 정본 개념
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {node.canonicalConceptIds.map((conceptId) => (
              <li key={conceptId}>
                <Link
                  className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3 py-1 text-xs font-bold text-[var(--accent-primary)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  href={`/atlas/concepts/${conceptId}`}
                >
                  {conceptId}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-[var(--text-tertiary)]">
            이 노드는 Atlas의 새 정본 개념이 아닙니다. 기존 21개 개념을 연결한 V2 학습 노드입니다.
          </p>
        </section>
      </header>

      <article aria-label={`${node.shortTitle} 학습 내용`}>
        <LessonMarkdown content={markdown} />
      </article>

      {node.id === "D1-llm-basics" && (
        <section className="mt-10" aria-label="D1 학습 점검">
          <NodeCheckpoint
            title="D1 학습 점검"
            questions={D1_QUESTIONS}
            outcomes={D1_OUTCOMES}
            teachBackPrompt={D1_TEACH_BACK_PROMPT}
          />
        </section>
      )}

      <nav
        aria-label="AI Engineering V2 이전 및 다음 노드"
        className="mt-12 grid gap-3 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2"
      >
        <div>
          {previousNode ? (
            <Link
              className="font-semibold text-[var(--accent-primary)] underline"
              href={`/learn/ai-engineering-v2/${previousNode.id}`}
            >
              ← {previousNode.shortTitle}
            </Link>
          ) : (
            <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
              ← Learning Path
            </Link>
          )}
        </div>
        <div className="sm:text-right">
          {nextNode ? (
            <Link
              className="font-semibold text-[var(--accent-primary)] underline"
              href={`/learn/ai-engineering-v2/${nextNode.id}`}
            >
              {nextNode.shortTitle} →
            </Link>
          ) : (
            <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
              Learning Path로 돌아가기 →
            </Link>
          )}
        </div>
      </nav>
    </main>
  )
}

function readNodeMarkdown(nodeId: string): string {
  const filePath = join(process.cwd(), "content", "curriculum", "nodes", `${nodeId}.md`)
  const source = readFileSync(filePath, "utf8")
  const withoutFrontmatter = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")

  return withoutFrontmatter.replace(/^# .+\r?\n+/, "").trim()
}
