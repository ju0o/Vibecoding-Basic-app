import type { Metadata } from "next"
import Link from "next/link"
import { AiLlmIdeExperience } from "@/features/learning-interactions/ai-llm-ide/AiLlmIdeExperience"

export const metadata: Metadata = {
  title: "AI·LLM·IDE 구분",
  description: "AI와 LLM, IDE와 AI 코딩 도구를 구분하고 생성→저장→실행 흐름을 이해합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">AI와 LLM, IDE와 AI IDE는 어떻게 다른가요?</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        실행은 해봤고, 오늘은 말(모델)과 작업 공간(도구)의 자리를 정리합니다. 제품 순위·가격 없음.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/node-npm-package-json"
        >
          ← Node·npm
        </Link>
      </p>
      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        AI(넓은 말) · LLM(텍스트 모델) · IDE(작업 공간 개념) · VS Code(제품 예시) · AI 코딩
        도구(편집+도움). 생성 ≠ 자동 저장/실행. 원본: content/.../04-ai-llm-ide.md
      </section>
      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <AiLlmIdeExperience />
      </section>
      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>다섯 용어를 자기 말로 한 줄씩</li>
          <li>지난 요청을 “생성→저장→실행” 단계로 분해</li>
          <li>AI 요청에 목표·파일·금지·분석만 포함해 다시 쓰기</li>
        </ol>
      </section>
      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>AI ≠ 항상 LLM</li>
          <li>IDE = 작업 공간 · VS Code = 예시 제품</li>
          <li>생성 후 저장/실행이 필요</li>
        </ul>
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/terminal-commands"
        >
          터미널과 명령어 →
        </Link>
      </p>
    </main>
  )
}
