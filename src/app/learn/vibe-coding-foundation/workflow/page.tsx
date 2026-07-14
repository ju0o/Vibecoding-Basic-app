import type { Metadata } from "next"
import Link from "next/link"
import { AgentWorkflowExperience } from "@/features/learning-interactions/agent-workflow/AgentWorkflowExperience"

export const metadata: Metadata = { title: "Workflow" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">Workflow</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        반복 가능한 단계 순서 + 사람 확인 지점. 원본: 25-workflow.md
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/subagent"
        >
          ← SubAgent
        </Link>
      </p>
      <section className="mt-10" id="simulation">
        <AgentWorkflowExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: 내 미니 워크플로 5단계 적기 (요청→…→사람 확인)
      </section>
      <section className="mt-8 rounded-2xl border p-4 text-sm" id="quiz-outcomes">
        Outcome: 5단계 워크플로 · Human-in-the-loop 포함
      </section>
      <section className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-sm">
        <h2 className="font-extrabold">Track C / Batch 5 완료</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          다음 로드맵: Track D 실제 프로젝트 (D01 첫 미니 웹사이트 …) — Continuous mode CONTINUE
        </p>
        <Link className="mt-2 inline-block font-semibold text-[var(--accent-primary)] underline" href="/learn">
          Learning Path
        </Link>
      </section>
    </main>
  )
}
