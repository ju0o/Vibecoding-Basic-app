import type { Metadata } from "next"
import Link from "next/link"
import { WebLayersExperience } from "@/features/learning-interactions/web-layers/WebLayersExperience"

export const metadata: Metadata = { title: "JavaScript 기초" }

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold">JavaScript는 동작을 더합니다</h1>
      <p className="mt-3 text-sm text-[var(--text-secondary)]">
        샘플: src/main.js · JS 토글로 하단 문구 on/off · Node는 브라우저 밖 런타임
      </p>
      <section className="mt-8" id="simulation">
        <WebLayersExperience />
      </section>
      <section className="mt-8 text-sm" id="practice">
        실습: main.js 문자열 수정 후 새로고침
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
