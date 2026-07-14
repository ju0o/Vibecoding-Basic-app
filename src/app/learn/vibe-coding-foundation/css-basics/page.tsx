import type { Metadata } from "next"
import Link from "next/link"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = { title: "CSS 기초" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold">CSS는 색과 배치를 담당합니다</h1>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        샘플: src/style.css · CSS 토글로 배경 감각 확인
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: style.css 색 관련 값 한 곳 변경
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
