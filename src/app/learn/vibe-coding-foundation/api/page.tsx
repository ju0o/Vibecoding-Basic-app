import type { Metadata } from "next"
import Link from "next/link"
import { RequestResponseExperience } from "@/features/learning-interactions/request-response/RequestResponseExperience"

export const metadata: Metadata = {
  title: "API란 무엇인가",
  description: "프로그램 간 요청·응답 창구로서의 API를 교육 모델로 이해합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">API란 무엇인가</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        API는 프로그램이 서로 이야기하기 위한 약속된 창구입니다. 웹에서는 흔히 HTTP 요청·응답 형태로
        만납니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/backend"
        >
          ← Backend
        </Link>
      </p>

      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        비밀·API 키는 채팅/공개 저장소에 붙이지 않기 (오류→AI 수업 연결). 원본:{" "}
        <code>14-api.md</code>
      </section>

      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <RequestResponseExperience />
      </section>

      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>메서드·경로 바꿔 응답 관찰</li>
          <li>API 한 줄 정의</li>
          <li>AI: 정적 파일만 / 가짜 키 금지</li>
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: API = 항상 JSON REST? → 흔한 형태일 뿐, 창구 개념이 핵심</li>
          <li>O: 요청·응답 방향 설명</li>
          <li>O: 키/비밀 미포함 습관</li>
        </ul>
      </section>

      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/database"
        >
          Database →
        </Link>
      </p>
    </main>
  )
}
