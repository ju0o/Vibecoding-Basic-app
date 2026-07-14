import type { Metadata } from "next"
import Link from "next/link"
import { NodeCheckpoint } from "@/features/learning-interactions/core/NodeCheckpoint"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = { title: "HTML 기초" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">HTML은 화면의 뼈대입니다</h1>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        샘플: src/index.html · 원본 08-html-basics.md · 실습: 제목 문구 1곳 수정
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience
          focus="html"
          taskHint="HTML 초점에서 시작: HTML을 끄면 구조가 사라집니다. CSS/JS는 이후 노드"
        />
      </section>
      <section className="mt-8 text-sm" id="practice">
        index.html에서 h1/제목 찾아 문구 수정 → 저장 → 새로고침 (practice 07-10)
      </section>
      <section className="mt-10" id="quiz-outcomes">
        <NodeCheckpoint
          outcomes={[
            { id: "O-B02-1", label: "HTML=구조 한 줄", level: "Explainable" },
            { id: "O-B02-2", label: "index.html 제목 위치", level: "Observed" },
            { id: "O-B02-3", label: "작은 텍스트 수정", level: "Independent" },
          ]}
          questions={[
            {
              id: "q1",
              question: "HTML의 역할로 가장 가까운 것은?",
              choices: ["데이터베이스", "문서 구조/의미", "서버 운영체제", "유료 API 키"],
              answer: 1,
              whyCorrect: "구조와 의미를 담는 문서입니다.",
              whyWrong: "DB·OS·키와 다릅니다.",
            },
            {
              id: "q2",
              question: "HTML만으로 모든 동작이 끝나는가?",
              choices: [
                "항상 그렇다",
                "아니다. JS·서버 등이 더 있을 수 있다",
                "CSS가 데이터를 저장한다",
                "Node가 HTML이다",
              ],
              answer: 1,
              whyCorrect: "동작·저장 등은 다른 레이어가 담당할 수 있습니다.",
              whyWrong: "HTML 만능·CSS 저장·Node=HTML은 오개념입니다.",
            },
          ]}
          teachBackPrompt="HTML을 ‘뼈대’에 비유해 두 문장"
          title="B02 Checkpoint"
        />
      </section>
      <p className="mt-8 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/css-basics"
        >
          CSS →
        </Link>
      </p>
    </main>
  )
}
