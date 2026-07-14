import type { Metadata } from "next"
import Link from "next/link"
import { ContextPickerExperience } from "@/features/learning-interactions/context-picker/ContextPickerExperience"

export const metadata: Metadata = {
  title: "관련 파일만 AI에게 보여주기",
  description: "목표별 최소 관련 파일 집합을 고르고 비밀·거대 폴더를 제외합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">관련 파일만 AI에게 보여주기</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        프로젝트 전체 붙여 넣기 대신, 목표에 닿는 최소 집합을 고릅니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/context-engineering"
        >
          ← Context Engineering
        </Link>
      </p>
      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        제외 기본: node_modules · 비밀 · 거대 로그. 원본:{" "}
        <code>19-related-files-context.md</code>
      </section>
      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <ContextPickerExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>목표 3종에 대해 파일 2개 이하 선택</li>
          <li>.env 포함 시 경고 확인</li>
        </ol>
      </section>
      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: 전체 첨부 기본? → 아니오, 최소 관련</li>
          <li>O: 제외 목록 말하기</li>
        </ul>
      </section>
      <section className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-sm">
        <h2 className="font-extrabold">Batch 4 완료 → Batch 5</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          다음: 작업 분해 · 오류 수정 Loop · QA · Agent · SubAgent · Workflow
        </p>
        <Link className="mt-2 inline-block font-semibold text-[var(--accent-primary)] underline" href="/learn">
          Learning Path
        </Link>
      </section>
    </main>
  )
}
