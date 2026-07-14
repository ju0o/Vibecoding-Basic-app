import type { Metadata } from "next"
import Link from "next/link"
import { StackRolesExperience } from "@/features/learning-interactions/stack-roles/StackRolesExperience"

export const metadata: Metadata = {
  title: "Backend란 무엇인가",
  description: "화면 뒤 처리 쪽으로서의 Backend와 Day1 server.js 미니 서버를 연결합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">Backend란 무엇인가</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        Backend는 화면 뒤에서 요청을 처리하는 쪽입니다. Day1 <code>server.js</code>는 교육용 미니
        서버 예시입니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/frontend"
        >
          ← Frontend
        </Link>
      </p>

      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        완전한 앱 Backend(로그인·결제) ≠ Day1 서버. 역할 감각이 목표. 원본:{" "}
        <code>13-backend.md</code>
      </section>

      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <StackRolesExperience focus="both" />
      </section>

      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>server.js 주석 읽고 한 줄 요약</li>
          <li>서버 off 시 브라우저 관찰</li>
          <li>AI: 포트 설명만 / 화면 문구 금지</li>
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: Backend = 항상 Node? → 아니오, 형태 다양</li>
          <li>O: 화면 뒤 처리로 설명</li>
          <li>O: server.js를 미니 예시로 연결</li>
        </ul>
      </section>

      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/api"
        >
          API →
        </Link>
      </p>
    </main>
  )
}
