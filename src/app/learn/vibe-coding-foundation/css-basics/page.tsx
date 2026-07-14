import type { Metadata } from "next"
import Link from "next/link"
import { NodeCheckpoint } from "@/features/learning-interactions/core/NodeCheckpoint"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = { title: "CSS 기초" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">CSS는 보이는 느낌을 바꿉니다</h1>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        샘플: style.css · 원본 09-css-basics.md
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience
          focus="css"
          taskHint="CSS on/off로 배경·느낌 차이를 보고, style.css 수정을 준비하세요"
        />
      </section>
      <section className="mt-8 text-sm" id="practice">
        style.css 색/여백 1값 수정 → 새로고침 (practice 07-10)
      </section>
      <section className="mt-10" id="quiz-outcomes">
        <NodeCheckpoint
          outcomes={[
            { id: "O-B03-1", label: "CSS=표현", level: "Explainable" },
            { id: "O-B03-2", label: "style.css 위치", level: "Observed" },
            { id: "O-B03-3", label: "색/여백 1곳 수정", level: "Independent" },
          ]}
          questions={[
            {
              id: "q1",
              question: "CSS가 주로 담당하는 것은?",
              choices: ["DB 백업", "색·여백·글꼴 등 표현", "서버 프로세스 관리", "도메인 구매"],
              answer: 1,
              whyCorrect: "표현(스타일) 레이어입니다.",
              whyWrong: "인프라·DB와 다릅니다.",
            },
          ]}
          teachBackPrompt="HTML과 CSS 차이를 한 문장씩"
          title="B03 Checkpoint"
        />
      </section>
      <p className="mt-8 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/javascript-basics"
        >
          JavaScript →
        </Link>
      </p>
    </main>
  )
}
