import type { Metadata } from "next"
import Link from "next/link"
import { TerminalCommandsExperience } from "@/features/learning-interactions/terminal-commands/TerminalCommandsExperience"

export const metadata: Metadata = {
  title: "터미널과 명령어",
  description: "현재 폴더(cwd)와 터미널 명령 습관을 익힙니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">터미널에 치는 글자는 왜 필요할까요?</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        글자로 지시하는 창 ·{" "}
        <strong className="text-[var(--text-primary)]">지금 어느 폴더에 서 있는지</strong>가
        핵심입니다.
      </p>
      <section className="mt-8 text-sm leading-7 text-[var(--text-secondary)]">
        습관: 어디에 서 있지? → package.json? → 명령? → 결과/오류. 원본: 05-terminal-commands.md
      </section>
      <section className="mt-10" id="simulation">
        <TerminalCommandsExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <p className="mt-2">
          examples/day1-first-success 에서 터미널 열고 루트 확인 후 node -v / npm run dev
        </p>
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/errors-to-ai"
        >
          오류를 AI에게 전달하기 →
        </Link>
      </p>
    </main>
  )
}
