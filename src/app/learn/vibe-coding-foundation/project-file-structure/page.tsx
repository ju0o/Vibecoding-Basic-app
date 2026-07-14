import type { Metadata } from "next"
import Link from "next/link"
import { DAY1_HREF } from "@/content/site-navigation"
import { ProjectFileStructureExperience } from "@/features/learning-interactions/project-file-structure/ProjectFileStructureExperience"
import { ProjectFileStructureQuiz } from "@/features/learning-interactions/project-file-structure/ProjectFileStructureQuiz"

export const metadata: Metadata = {
  title: "프로젝트 파일 구조 읽기",
  description:
    "AI가 만든 프로젝트의 파일·src·package.json을 처음 읽는 방법. 수정 위치를 찾고 AI에 범위를 지정합니다.",
}

export default function ProjectFileStructurePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-[var(--text-tertiary)]">
        <Link className="font-semibold text-[var(--accent-primary)] hover:underline" href="/learn">
          배우기
        </Link>
        <span aria-hidden> / </span>
        <span>바이브코딩 파운데이션</span>
        <span aria-hidden> / </span>
        <span className="text-[var(--text-secondary)]">파일 구조</span>
      </nav>

      <header className="mb-10 grid gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
          Track A · Learning Node
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          AI가 만든 프로젝트에는 왜 이렇게 많은 파일이 생겼을까요?
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
          보조: src·package.json·파일 구조를 처음 읽는 방법. Day 1에서 실행은 해봤고, 오늘은{" "}
          <strong className="text-[var(--text-primary)]">어떤 파일을 건드릴지</strong> 찾습니다.
        </p>
        <p className="text-sm">
          <Link className="font-semibold text-[var(--accent-primary)] underline" href={DAY1_HREF}>
            ← Day 1 다시 보기
          </Link>
        </p>
      </header>

      <section className="mb-12 grid gap-3" id="read">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">1. 읽기 요약</h2>
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            샘플 트리: <code className="text-xs">examples/day1-first-success/</code> — package.json,
            server.js, README, src/(index.html, style.css, main.js)
          </p>
          <p className="mt-2">
            <code className="text-xs">src</code>는 흔한 관례이지 모든 프로젝트 필수 규칙이 아닙니다.{" "}
            <code className="text-xs">package.json</code>의 <code className="text-xs">scripts</code>
            는 npm이 실행할 명령 사전입니다 (공식 npm 문서, 2026-07-14 확인).
          </p>
          <p className="mt-2 text-xs text-[var(--text-tertiary)]">
            전체 학생 원본:{" "}
            <code>content/courses/vibe-coding-foundation/lessons/02-project-file-structure.md</code>
          </p>
        </div>
      </section>

      <section className="mb-12 grid gap-4" id="simulation">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">2. 인터랙티브 경험</h2>
        <ProjectFileStructureExperience />
      </section>

      <section className="mb-12 grid gap-4" id="practice">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
          3. 실제 실습 (Day1 샘플 재사용)
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-[var(--text-secondary)]">
          <li>루트 · package.json · src · main.js · README 위치 찾기</li>
          <li>
            <code className="text-xs">src/main.js</code> 문구 수정 → 저장 → 브라우저 확인
          </li>
          <li>AI 요청: 분석 먼저 → 허용 파일만 → 금지 파일 → 완료 조건</li>
          <li>단일 HTML vs 이 샘플 구조 비교 (우열 단정 금지)</li>
        </ol>
        <p className="text-sm text-[var(--text-tertiary)]">
          상세:{" "}
          <code className="text-xs">
            content/practice/.../02-project-file-structure-practice.md
          </code>
        </p>
      </section>

      <section className="mb-12" id="quiz-outcomes">
        <h2 className="mb-4 text-xl font-extrabold text-[var(--text-primary)]">
          4. 퀴즈 · Outcome
        </h2>
        <ProjectFileStructureQuiz />
      </section>

      <section className="mb-8 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">
          다음 — 후보 B (아직 미제작)
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
          어떤 파일이 어떤 역할인지는 알기 시작했다. 하지만 이 프로젝트를 움직이는{" "}
          <strong className="text-[var(--text-primary)]">Node, npm install, npm run dev</strong> 는
          아직 낯설 수 있다. 후보 B는 이 노드 운영자 검토 후 시작합니다.
        </p>
      </section>
    </main>
  )
}
