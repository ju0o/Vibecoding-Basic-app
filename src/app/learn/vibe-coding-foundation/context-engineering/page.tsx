import type { Metadata } from "next"
import Link from "next/link"
import { ContextPickerExperience } from "@/features/learning-interactions/context-picker/ContextPickerExperience"

export const metadata: Metadata = {
  title: "Context Engineering 기초",
  description: "모델이 볼 정보를 고르는 Context 개념과 한계를 이해합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">Context Engineering 기초</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        좋은 프롬프트만으로는 부족할 수 있습니다. 이번 응답에 보이는 정보(Context)를 고릅니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/prompt-engineering"
        >
          ← Prompt Engineering
        </Link>
      </p>
      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        Context ≠ Prompt 전체. 창에는 한계. 원본: <code>18-context-engineering.md</code>
      </section>
      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <ContextPickerExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>넣을 것 / 뺄 것 한 가지씩</li>
          <li>server.js 전체를 제목 수정에 붙이면 생기는 위험 한 줄</li>
        </ol>
      </section>
      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: Context = 프롬프트 문장만? → 아니오, 파일·도구 결과 등</li>
          <li>O: 한계 인정 + 선택 설명</li>
        </ul>
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/related-files-context"
        >
          관련 파일만 보여주기 →
        </Link>
      </p>
    </main>
  )
}
