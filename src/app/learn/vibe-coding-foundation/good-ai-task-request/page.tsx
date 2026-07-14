import type { Metadata } from "next"
import Link from "next/link"
import { AiRequestBuilderExperience } from "@/features/learning-interactions/ai-request/AiRequestBuilderExperience"

export const metadata: Metadata = {
  title: "AI에게 좋은 작업 요청하기",
  description: "목표·범위·제약·현황·모드·성공 기준으로 AI 요청을 조립합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">AI에게 좋은 작업 요청하기</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        Track C 시작. 도구 이름보다 먼저, 요청의 구조를 만듭니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/database"
        >
          ← Database
        </Link>
      </p>
      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        6요소: 목표 · 범위 · 제약 · 현황 · 모드 · 성공 기준. 원본:{" "}
        <code>16-good-ai-task-request.md</code>
      </section>
      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <AiRequestBuilderExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>내 목표로 4요소 이상 요청문 작성</li>
          <li>한 요청 = 한 목표로 쪼개기</li>
          <li>비밀 미포함 확인</li>
        </ol>
      </section>
      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: “잘 만들어 줘” 문제? → 범위·성공 기준 부재</li>
          <li>O: 6요소 중 4+ 채움</li>
        </ul>
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/prompt-engineering"
        >
          Prompt Engineering →
        </Link>
      </p>
    </main>
  )
}
