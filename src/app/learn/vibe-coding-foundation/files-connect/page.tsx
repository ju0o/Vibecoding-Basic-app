import type { Metadata } from "next"
import Link from "next/link"
import { FileConnectExperience } from "@/features/learning-interactions/file-connect/FileConnectExperience"

export const metadata: Metadata = {
  title: "파일이 서로 연결되는 방식",
  description: "HTML이 CSS·JS를 불러오는 연결을 이해하고 경로 오류를 진단합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">파일이 서로 연결되는 방식</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        HTML·CSS·JS가 한 화면이 되려면 <strong className="text-[var(--text-primary)]">참조 연결</strong>
        이 필요합니다. Day1 샘플의 link/script 줄을 기준으로 봅니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/javascript-basics"
        >
          ← JavaScript 기초
        </Link>
      </p>

      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        <p>
          <strong>학생 질문</strong> · 세 파일은 어떻게 한 페이지가 되나? link/script는? 경로가
          틀리면?
        </p>
        <p className="mt-2 text-[var(--text-secondary)]">
          원본: <code>content/courses/vibe-coding-foundation/lessons/11-files-connect.md</code>
        </p>
      </section>

      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <FileConnectExperience />
      </section>

      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>index.html에서 link / script 줄 찾기</li>
          <li>(선택) 경로를 잠깐 틀렸다가 복구</li>
          <li>AI 요청: 연결 유지 + 제목 색만 변경</li>
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: CSS가 안 먹으면 첫 후보? → 연결 경로 / link 줄</li>
          <li>O: 파일이 참조로 연결됨을 설명</li>
          <li>O: Day1에서 CSS/JS 연결 줄을 가리킴</li>
        </ul>
      </section>

      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/frontend"
        >
          Frontend →
        </Link>
      </p>
    </main>
  )
}
