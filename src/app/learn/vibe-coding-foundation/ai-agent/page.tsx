import type { Metadata } from "next"
import Link from "next/link"
import { AgentWorkflowExperience } from "@/features/learning-interactions/agent-workflow/AgentWorkflowExperience"

export const metadata: Metadata = { title: "AI Agent" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">AI Agent</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        Agent = 목표를 위해 도구/단계를 반복 선택할 수 있는 패턴 (브랜드 아님). 원본: 23-ai-agent.md
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/qa-basics"
        >
          ← QA
        </Link>
      </p>
      <section className="mt-10" id="simulation">
        <AgentWorkflowExperience />
      </section>
      <section className="mt-8 rounded-2xl border p-4 text-sm" id="quiz-outcomes">
        Outcome: Agent≠앱 이름 · 루프·도구 감각
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/subagent"
        >
          SubAgent →
        </Link>
      </p>
    </main>
  )
}
