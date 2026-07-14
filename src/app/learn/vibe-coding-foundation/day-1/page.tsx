import type { Metadata } from "next"
import Link from "next/link"
import { Day1FirstSuccessExperience } from "@/features/learning-interactions/day1-first-success/Day1FirstSuccessExperience"
import { Day1QuizAndOutcomes } from "@/features/learning-interactions/day1-first-success/Day1QuizAndOutcomes"

export const metadata: Metadata = {
  title: "Day 1 — 첫 성공 (AI와 프로그램 실행)",
  description:
    "비개발자 Day 1: 요청→파일→서버→미리보기 인터랙티브 시뮬레이션과 Sample Project 실습, 퀴즈·Outcome Check.",
}

export default function Day1LearnPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-[var(--text-tertiary)]">
        <Link
          className="font-semibold text-[var(--accent-primary)] hover:underline"
          href="/curriculum"
        >
          커리큘럼
        </Link>
        <span aria-hidden> / </span>
        <span>바이브코딩 파운데이션</span>
        <span aria-hidden> / </span>
        <span className="text-[var(--text-secondary)]">Day 1</span>
      </nav>

      <header className="mb-10 grid gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">
          학습 경로 · vibe-coding-foundation
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Day 1 — 첫 성공: AI와 함께 결과물을 실행하기
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
          오늘은 긴 이론부터 시작하지 않습니다.{" "}
          <strong className="text-[var(--text-primary)]">
            AI에게 요청해서 결과물을 만들고, 어떻게 실행되는지 조금씩 이해
          </strong>
          합니다. 아래 순서로 진행하세요: 읽기 → 시뮬레이션 → 실제 실습 → 퀴즈 → Outcome.
        </p>
        <ol className="flex flex-wrap gap-2 text-xs font-bold text-[var(--text-secondary)]">
          <li className="rounded-full border border-[var(--border-default)] px-3 py-1">1 읽기</li>
          <li className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-sky-900 dark:text-sky-100">
            2 시뮬레이션
          </li>
          <li className="rounded-full border border-[var(--border-default)] px-3 py-1">3 실습</li>
          <li className="rounded-full border border-[var(--border-default)] px-3 py-1">4 퀴즈</li>
          <li className="rounded-full border border-[var(--border-default)] px-3 py-1">
            5 Outcome
          </li>
        </ol>
      </header>

      <section className="mb-12 grid gap-4" id="read">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
          1. 오늘 배울 것 (요약)
        </h2>
        <div className="grid gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 text-sm leading-7 text-[var(--text-secondary)]">
          <p>
            <strong className="text-[var(--text-primary)]">Path A</strong> — 설치 없이: AI에게
            HTML을 받아 브라우저로 열어 첫 성공(약 10분 목표, 시간 보장 아님).
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">Path B</strong> — 로컬: VS Code · Node ·
            터미널 · 샘플 프로젝트. 환경에 따라 시간이 달라질 수 있습니다.
          </p>
          <p>
            전체 학생용 원본 Markdown:{" "}
            <code className="rounded bg-[var(--surface-primary)] px-1.5 py-0.5 text-xs">
              content/courses/vibe-coding-foundation/lessons/01-first-success.md
            </code>
            (저장소 SSOT · 사이트는 Viewer).
          </p>
          <p>
            학생용 Word 파생본:{" "}
            <code className="rounded bg-[var(--surface-primary)] px-1.5 py-0.5 text-xs">
              exports/student/DAY1-처음으로-AI와-프로그램-실행하기.docx
            </code>
          </p>
        </div>
      </section>

      <section className="mb-12 grid gap-4" id="simulation">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
          2. 인터랙티브 경험 (교육용 시뮬레이션)
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          요청을 고르면 파일 트리·터미널·브라우저 미리보기가 <strong>실제로 상태 변화</strong>
          합니다. 텍스트만 넘기는 단계 설명이 아닙니다. 자동 재생 없이 직접 조작하세요.
        </p>
        <Day1FirstSuccessExperience />
      </section>

      <section className="mb-12 grid gap-4" id="practice">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
          3. 실제 실습 — Sample Project
        </h2>
        <div className="grid gap-4 rounded-2xl border border-[var(--border-default)] p-5">
          <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm font-bold text-amber-950 dark:text-amber-50">
            시뮬레이션 ≠ 실제 설치. 로컬 실습은 저장소의 샘플 폴더에서 진행합니다.
          </p>
          <div className="grid gap-2 text-sm text-[var(--text-secondary)]">
            <p>
              <strong className="text-[var(--text-primary)]">열 경로</strong>
            </p>
            <code className="block overflow-x-auto rounded-lg bg-[var(--surface-secondary)] p-3 font-mono text-xs">
              examples/day1-first-success/
            </code>
            <p className="pt-2">
              <strong className="text-[var(--text-primary)]">할 일</strong>
            </p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>VS Code 등으로 위 폴더를 연다</li>
              <li>
                터미널에서 <code className="text-xs">npm install</code>
              </li>
              <li>
                <code className="text-xs">npm run dev</code>
              </li>
              <li>
                브라우저에서 <code className="text-xs">http://127.0.0.1:3456</code>
              </li>
              <li>
                <code className="text-xs">src/main.js</code> 문자열을 바꾼 뒤 저장 · 새로고침
              </li>
            </ol>
            <p className="pt-2">
              <strong className="text-[var(--text-primary)]">기대 결과</strong> — 연한 파란 배경,
              제목 「나의 첫 바이브코딩」, 문구 변경이 화면에 반영.
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">오류 시</strong> — 터미널 메시지 전체
              복사 → AI/가이드에 전달. README의 Windows/macOS 안내 참고.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12" id="quiz-outcomes">
        <h2 className="mb-4 text-xl font-extrabold text-[var(--text-primary)]">
          4–5. 퀴즈 · Outcome Check
        </h2>
        <Day1QuizAndOutcomes />
      </section>

      <footer className="border-t border-[var(--border-subtle)] pt-6 text-sm text-[var(--text-tertiary)]">
        <p>
          다음:{" "}
          <Link
            className="font-semibold text-[var(--accent-primary)] underline"
            href="/learn/vibe-coding-foundation/project-file-structure"
          >
            프로젝트 파일 구조 읽기
          </Link>
          . Atlas·Model Routing·기존 100강 라우트는 그대로입니다.
        </p>
        <p className="mt-2">
          <Link
            className="font-semibold text-[var(--accent-primary)] hover:underline"
            href="/learn"
          >
            ← Learning Path
          </Link>
        </p>
      </footer>
    </main>
  )
}
