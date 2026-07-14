import type { Metadata } from "next"
import Link from "next/link"
import { NodeCheckpoint } from "@/features/learning-interactions/core/NodeCheckpoint"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = {
  title: "웹사이트가 화면에 나타나는 원리",
  description: "요청→응답→HTML/CSS/JS 해석→표시 흐름을 이해합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">웹사이트는 어떻게 화면에 나타날까요?</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        주소 → 요청 → 응답 → HTML/CSS/JS 해석 → 화면. 로컬 Day1에서는 server.js가 파일을 건넵니다.
        원본: <code>07-web-how-pages-appear.md</code>
      </p>
      <section className="mt-10" id="simulation">
        <WebLayersExperience
          focus="all"
          taskHint="세 레이어를 모두 켠 뒤, 하나씩 끄며 ‘표시에 무엇이 필요한지’ 관찰하세요"
        />
      </section>
      <section className="mt-8 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          요청→응답→표시 순서를 메모 · 상세:{" "}
          <code>content/practice/.../07-10-web-layers-practice.md</code>
        </p>
      </section>
      <section className="mt-10" id="quiz-outcomes">
        <NodeCheckpoint
          outcomes={[
            {
              id: "O-B01-1",
              label: "요청→응답→표시 순서를 말한다",
              level: "Explainable",
            },
            { id: "O-B01-2", label: "Day1 서버 역할 한 줄", level: "Assisted" },
            { id: "O-B01-3", label: "레이어 토글 결과 설명", level: "Observed" },
          ]}
          questions={[
            {
              id: "q1",
              question: "브라우저가 화면을 그리기 전 먼저 하는 일에 가장 가까운 것은?",
              choices: [
                "CSS만 실행한다",
                "문서/자원을 요청하고 응답을 받는다",
                "항상 유료 API를 호출한다",
                "package.json을 삭제한다",
              ],
              answer: 1,
              whyCorrect: "요청·응답 후에 문서를 해석합니다.",
              whyWrong: "스타일·유료 API·삭제는 핵심 첫 단계가 아닙니다.",
            },
            {
              id: "q2",
              question: "Day1 server.js의 교육적 역할은?",
              choices: [
                "데이터베이스",
                "요청에 로컬 파일을 건네는 미니 서버",
                "유일한 프론트엔드 프레임워크",
                "CSS 전처리기",
              ],
              answer: 1,
              whyCorrect: "파일 응답 역할의 미니 서버 예시입니다.",
              whyWrong: "DB·프레임워크·전처리기가 아닙니다.",
            },
          ]}
          teachBackPrompt="요청→응답→표시를 초등학생에게 설명하듯 3문장"
          title="B01 Checkpoint"
        />
      </section>
      <p className="mt-8 text-sm">
        다음:{" "}
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/html-basics"
        >
          HTML →
        </Link>
      </p>
    </main>
  )
}
