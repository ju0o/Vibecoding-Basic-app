import type { Metadata } from "next"
import Link from "next/link"
import { QaChecklistExperience } from "@/features/learning-interactions/qa-checklist/QaChecklistExperience"

export const metadata: Metadata = { title: "코드 검토와 QA" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">코드 검토와 QA</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        AI 출력은 초안. 범위·비밀·실행·의도 확인. 원본: 22-qa-basics.md
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/fix-loop"
        >
          ← 오류 수정 Loop
        </Link>
      </p>
      <section className="mt-10" id="simulation">
        <QaChecklistExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: 최근 AI 답변에 체크리스트 적용
      </section>
      <section className="mt-8 rounded-2xl border p-4 text-sm" id="quiz-outcomes">
        Outcome: 생성≠완료 · 검사 항목 3+
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/ai-agent"
        >
          AI Agent →
        </Link>
      </p>
    </main>
  )
}
