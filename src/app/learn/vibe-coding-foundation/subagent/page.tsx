import type { Metadata } from "next"
import Link from "next/link"
import { AgentWorkflowExperience } from "@/features/learning-interactions/agent-workflow/AgentWorkflowExperience"

export const metadata: Metadata = { title: "SubAgent" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">SubAgent</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        역할이 좁은 하위 실행자에게 위임하는 패턴. 원본: 24-subagent.md
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/ai-agent"
        >
          ← AI Agent
        </Link>
      </p>
      <section className="mt-10" id="simulation">
        <AgentWorkflowExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: 조사 / 작성 / 검토 역할을 한 줄씩 적어 위임 문장 만들기
      </section>
      <section className="mt-8 rounded-2xl border p-4 text-sm" id="quiz-outcomes">
        Outcome: 위임·역할 분리 · 전부 한 에이전트 위험
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/workflow"
        >
          Workflow →
        </Link>
      </p>
    </main>
  )
}
