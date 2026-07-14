import type { Metadata } from "next"
import Link from "next/link"
import { NodeNpmExperience } from "@/features/learning-interactions/node-npm/NodeNpmExperience"
import { NodeNpmQuiz } from "@/features/learning-interactions/node-npm/NodeNpmQuiz"

const PFS = "/learn/vibe-coding-foundation/project-file-structure"
const DAY1 = "/learn/vibe-coding-foundation/day-1"

export const metadata: Metadata = {
  title: "Node와 npm은 왜 설치하고 실행할까요?",
  description: "package.json scripts를 읽고 npm install과 npm run dev를 구분합니다.",
}

export default function NodeNpmPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-[var(--text-tertiary)]">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
        <span> / Node · npm</span>
      </nav>
      <header className="mb-10 grid gap-3">
        <p className="text-xs font-bold text-[var(--accent-primary)]">Track A · 후보 B</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Node와 npm은 왜 설치하고 실행하는 걸까요?
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
          package.json을 읽고 프로젝트 실행 명령을 이해합니다. 파일 구조 수업에서 어떤 파일을 볼지는
          익혔고, 오늘은 그 안{" "}
          <strong className="text-[var(--text-primary)]">명령이 어떻게 움직이는지</strong> 봅니다.
        </p>
        <p className="text-sm">
          <Link className="font-semibold text-[var(--accent-primary)] underline" href={PFS}>
            ← 파일 구조
          </Link>
          {" · "}
          <Link className="font-semibold text-[var(--accent-primary)] underline" href={DAY1}>
            Day 1
          </Link>
        </p>
      </header>

      <section className="mb-10 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7 text-[var(--text-secondary)]">
        <h2 className="font-extrabold text-[var(--text-primary)]">읽기 요약</h2>
        <p className="mt-2">
          Node.js = JS <strong>런타임</strong> (nodejs.org Learn). npm = 패키지 매니저 (Node와 동일
          프로그램 아님). 이 샘플 scripts: <code className="text-xs">dev → node server.js</code>.
          dependencies 필드는 없을 수 있음. 확인일 2026-07-14.
        </p>
        <p className="mt-2 text-xs">원본: content/courses/.../03-node-npm-package-json.md</p>
      </section>

      <section className="mb-12" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <NodeNpmExperience />
      </section>

      <section className="mb-12" id="practice">
        <h2 className="mb-3 text-xl font-extrabold">실습 (Day1 샘플 재사용)</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
          <li>package.json에서 name · scripts.dev · 실행 파일 확인</li>
          <li>scripts ↔ npm run ↔ node server.js ↔ 브라우저</li>
          <li>npm run serve 실패 → scripts로 복구</li>
          <li>잘못된 폴더 가정 → 루트 확인</li>
          <li>AI 오류 요청문 작성</li>
        </ol>
      </section>

      <section className="mb-12" id="quiz-outcomes">
        <h2 className="mb-4 text-xl font-extrabold">퀴즈 · Outcome</h2>
        <NodeNpmQuiz />
      </section>

      <section className="rounded-2xl border p-5 text-sm text-[var(--text-secondary)]">
        <h2 className="font-extrabold text-[var(--text-primary)]">다음 — 후보 C (미제작)</h2>
        <p className="mt-2">
          실행 방법은 이해하기 시작했다. AI는 어떻게 파일을 만들고, IDE와 AI IDE는 무엇이 다를까?
        </p>
      </section>
    </main>
  )
}
