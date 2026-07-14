import type { Metadata } from "next"
import Link from "next/link"
import { TaskBreakdownExperience } from "@/features/learning-interactions/task-breakdown/TaskBreakdownExperience"

export const metadata: Metadata = { title: "기능을 작은 작업으로 나누기" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">기능을 작은 작업으로 나누기</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        큰 목표를 검증 가능한 조각으로 나눕니다. 원본: 20-task-breakdown.md
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/related-files-context"
        >
          ← 관련 파일
        </Link>
      </p>
      <section className="mt-10" id="simulation">
        <TaskBreakdownExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: 내 아이디어를 3단계로 쪼개고 각 성공 기준 1줄
      </section>
      <section className="mt-8 rounded-2xl border p-4 text-sm" id="quiz-outcomes">
        Outcome: 3단계 이하 분해 · 단계별 성공 기준
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/fix-loop"
        >
          오류 수정 Loop →
        </Link>
      </p>
    </main>
  )
}
