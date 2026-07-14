import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"
import { DAY1_HREF } from "@/content/site-navigation"

export const metadata: Metadata = {
  title: "오늘부터 시작하기",
  description:
    "코딩을 몰라도 괜찮습니다. Day 1에서 작은 결과물을 만들고, 그 과정에서 생긴 질문을 이해합니다.",
}

const OUTCOMES = [
  "AI에게 작은 결과물 요청하기",
  "결과를 보고 수정 요청하기",
  "IDE(VS Code 등)가 무엇인지 기초적으로 설명하기",
  "Node.js / npm 설치 여부 확인하기",
  "샘플 프로젝트 실행 시도하기",
  "오류 메시지를 복사해 AI에게 전달하기",
  "package.json과 src를 기초 수준에서 설명하기",
] as const

export default function StartPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Badge variant="accent">시작하기</Badge>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl">
        오늘부터 AI와 함께 만들어보세요
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
        코딩을 몰라도 괜찮습니다. 먼저 작은 결과물을 만들고, 그 과정에서 생긴 질문을 하나씩
        이해합니다.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href={DAY1_HREF}>Day 1 시작하기</PrimaryLink>
        <PrimaryLink href="/learn" variant="secondary">
          전체 학습 과정 보기
        </PrimaryLink>
      </div>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Path A</h2>
          <p className="mt-1 text-sm font-bold text-sky-800 dark:text-sky-200">
            설치 없이 먼저 경험하기 · 약 10분 목표
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
            <li>AI에게 작은 페이지 요청</li>
            <li>결과 확인</li>
            <li>수정 요청</li>
            <li>성공 경험</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5">
          <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Path B</h2>
          <p className="mt-1 text-sm font-bold text-[var(--text-secondary)]">
            내 컴퓨터에 환경 만들기 · 시간은 환경마다 다름
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-[var(--text-secondary)]">
            <li>VS Code</li>
            <li>Node.js · 터미널</li>
            <li>샘플 프로젝트</li>
            <li>개발 서버 실행</li>
          </ul>
          <p className="mt-3 text-xs text-[var(--text-tertiary)]">
            설치 권한이 없거나 시간이 더 걸려도 Path A 성공은 유효합니다.
          </p>
        </article>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">Day 1 Outcome</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Day 1 후 학생이 할 수 있게 되는 것(요약). 상세 체크는 Day 1 페이지 Outcome에 있습니다.
        </p>
        <ul className="mt-4 grid gap-2">
          {OUTCOMES.map((item) => (
            <li
              className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--text-secondary)]"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">다음 학습 흐름</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Day 1 다음: <strong className="text-[var(--text-primary)]">파일 구조 읽기</strong> (후보 A
          · A_THEN_B)
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
          <li>
            <Link
              className="font-semibold text-[var(--accent-primary)] underline"
              href="/learn/vibe-coding-foundation/project-file-structure"
            >
              AI가 만든 프로젝트 파일 구조 읽기
            </Link>
          </li>
          <li>그다음 후보 B: Node·npm (아직 미제작)</li>
        </ul>
        <p className="mt-4 text-sm">
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
            Learning Path 보기
          </Link>
        </p>
      </section>

      <p className="mt-10 text-sm text-[var(--text-tertiary)]">
        Day 1 본문·시뮬·실습은{" "}
        <Link className="font-semibold text-[var(--accent-primary)] underline" href={DAY1_HREF}>
          {DAY1_HREF}
        </Link>
        에서 이어집니다. 이 페이지는 복제본이 아닙니다.
      </p>
    </main>
  )
}
