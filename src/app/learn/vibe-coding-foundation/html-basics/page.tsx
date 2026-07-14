import type { Metadata } from "next"
import Link from "next/link"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = { title: "HTML 기초" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold">HTML은 화면의 뼈대입니다</h1>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        샘플: src/index.html · 레이어 토글에서 HTML을 끄면 구조가 사라집니다.
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: index.html 제목/문단 위치 확인 후 작은 텍스트 수정
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
