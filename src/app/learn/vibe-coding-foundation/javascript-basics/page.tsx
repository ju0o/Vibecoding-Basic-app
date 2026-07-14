import type { Metadata } from "next"
import Link from "next/link"
import { NodeCheckpoint } from "@/features/learning-interactions/core/NodeCheckpoint"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = { title: "JavaScript 기초" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">JavaScript는 동작을 더합니다</h1>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        샘플: main.js · Node는 브라우저 밖 런타임(A03) · 원본 10-javascript-basics.md
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience
          focus="js"
          taskHint="JS 레이어를 끄면 추가 문구/동작이 사라집니다. main.js 수정 실습과 연결"
        />
      </section>
      <section className="mt-8 text-sm" id="practice">
        main.js 문자열 수정 → 새로고침 · Node vs 브라우저 JS 한 줄씩 (practice 07-10)
      </section>
      <section className="mt-10" id="quiz-outcomes">
        <NodeCheckpoint
          outcomes={[
            { id: "O-B04-1", label: "JS=동작", level: "Explainable" },
            { id: "O-B04-2", label: "main.js 수정", level: "Independent" },
            { id: "O-B04-3", label: "Node vs 브라우저 JS", level: "Explainable" },
          ]}
          questions={[
            {
              id: "q1",
              question: "브라우저 JS와 Node.js의 관계로 옳은 교육 설명은?",
              choices: [
                "완전히 다른 언어",
                "같은 언어 가족이지만 실행 장소·할 수 있는 일이 다를 수 있다",
                "Node는 HTML 태그다",
                "JS는 항상 서버에서만 돈다",
              ],
              answer: 1,
              whyCorrect: "실행 환경이 다릅니다.",
              whyWrong: "다른 언어/HTML/서버 전용은 오개념입니다.",
            },
          ]}
          teachBackPrompt="main.js 역할과 Node 서버 역할을 구분"
          title="B04 Checkpoint"
        />
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="font-semibold text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/files-connect"
        >
          파일이 서로 연결되는 방식 →
        </Link>
      </p>
    </main>
  )
}
