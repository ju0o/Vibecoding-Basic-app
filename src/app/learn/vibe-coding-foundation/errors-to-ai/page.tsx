import type { Metadata } from "next"
import Link from "next/link"
import { ErrorsToAiExperience } from "@/features/learning-interactions/errors-to-ai/ErrorsToAiExperience"

export const metadata: Metadata = {
  title: "오류 메시지를 AI에게 전달하기",
  description: "오류·경로·명령을 묶어 AI에게 안전하게 전달하는 습관.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">오류 메시지는 AI에게 줄 재료입니다</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        폴더 · 명령 · 오류 · (scripts) · 목표 · 분석 요청. 비밀 키는 지우세요.
      </p>
      <section className="mt-10" id="simulation">
        <ErrorsToAiExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <p className="mt-2">의도적 오타 명령 후 템플릿으로 AI 요청문 작성 (키 제외)</p>
      </section>
      <section className="mt-10 rounded-2xl border p-5 text-sm">
        <h2 className="font-extrabold">Track A 배치 1 완료 → Track B</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          다음 Batch: 웹사이트가 화면에 나타나는 원리 · HTML · CSS · JS
        </p>
        <p className="mt-2">
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
            Learning Path
          </Link>
        </p>
      </section>
    </main>
  )
}
