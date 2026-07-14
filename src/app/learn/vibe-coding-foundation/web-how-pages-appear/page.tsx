import type { Metadata } from "next"
import Link from "next/link"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = {
  title: "웹사이트가 화면에 나타나는 원리",
  description: "브라우저가 문서를 해석해 그리는 흐름.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold">웹사이트는 어떻게 화면에 나타날까요?</h1>
      <p className="mt-3 text-[var(--text-secondary)]">
        주소 → 문서 요청 → HTML/CSS/JS 해석 → 화면. 로컬에서는 server.js가 파일을 건넵니다.
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience />
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
