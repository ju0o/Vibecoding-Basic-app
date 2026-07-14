import type { Metadata } from "next"
import Link from "next/link"
import { PromptLabExperience } from "@/features/learning-interactions/prompt-lab/PromptLabExperience"

export const metadata: Metadata = {
  title: "Prompt Engineering 기초",
  description: "모호한 지시와 구조화 프롬프트를 비교하고 위험을 읽습니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">Prompt Engineering 기초</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        Prompt는 입력 설계입니다. 만능 주문 문구가 아니라 반복 개선하는 실천입니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/good-ai-task-request"
        >
          ← 좋은 작업 요청
        </Link>
      </p>
      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        패턴: 목표 · 형식 · 예시 · 금지 · 추측 금지. Atlas: Prompt. 원본:{" "}
        <code>17-prompt-engineering.md</code>
      </section>
      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <PromptLabExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>모호 vs 구조화 한 세트 작성</li>
          <li>출력 형식 한 줄 지정</li>
          <li>금지 목록 3개</li>
        </ol>
      </section>
      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: 마법 문장 존재? → 교육상 과신 금지</li>
          <li>O: 형식·금지·목표 포함 예시</li>
        </ul>
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/context-engineering"
        >
          Context Engineering →
        </Link>
      </p>
    </main>
  )
}
