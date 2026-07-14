import type { Metadata } from "next"
import Link from "next/link"
import { StackRolesExperience } from "@/features/learning-interactions/stack-roles/StackRolesExperience"

export const metadata: Metadata = {
  title: "Frontend란 무엇인가",
  description: "브라우저 UI 레이어로서의 Frontend를 Day1 샘플과 연결합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">Frontend란 무엇인가</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        Frontend는 사용자가 보는 쪽 — 주로 브라우저에서 표시·실행되는 UI와 그 코드입니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/files-connect"
        >
          ← 파일 연결
        </Link>
      </p>

      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        Day1의 index.html · style.css · main.js ≈ Frontend 자산. React 등은 나중. 원본:{" "}
        <code>12-frontend.md</code>
      </section>

      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <StackRolesExperience focus="both" />
      </section>

      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>세 파일을 Frontend 자산으로 라벨</li>
          <li>한 줄 정의 쓰기</li>
          <li>AI: 프론트 문구만 / server.js 금지</li>
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: Frontend ≠ 디자인 툴만? → UI 코드 레이어</li>
          <li>O: 브라우저 UI로 설명</li>
          <li>O: 서버 쪽 일과 한 줄 구분</li>
        </ul>
      </section>

      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/backend"
        >
          Backend →
        </Link>
      </p>
    </main>
  )
}
