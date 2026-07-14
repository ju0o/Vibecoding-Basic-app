import type { Metadata } from "next"
import Link from "next/link"
import { FixLoopExperience } from "@/features/learning-interactions/fix-loop/FixLoopExperience"

export const metadata: Metadata = { title: "오류 수정 Loop" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">오류 수정 Loop</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        재현 → 증거 → 가설 1 → 작은 수정 → 재실행. 원본: 21-fix-loop.md
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/task-breakdown"
        >
          ← 작업 분해
        </Link>
      </p>
      <section className="mt-10" id="simulation">
        <FixLoopExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: 지난 오류 하나를 5단계로 다시 적어 보기
      </section>
      <section className="mt-8 rounded-2xl border p-4 text-sm" id="quiz-outcomes">
        Outcome: 5단계 순서 · 증거 없는 추측 수정 회피
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/qa-basics"
        >
          코드 검토와 QA →
        </Link>
      </p>
    </main>
  )
}
