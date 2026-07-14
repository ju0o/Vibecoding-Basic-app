import type { Metadata } from "next"
import Link from "next/link"
import { DataStoreExperience } from "@/features/learning-interactions/data-store/DataStoreExperience"

export const metadata: Metadata = {
  title: "Database가 필요한 이유",
  description: "새로고침 후에도 남는 저장소가 왜 필요한지 교육 모델로 이해합니다.",
}

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm">
        <Link className="font-semibold text-[var(--accent-primary)] underline" href="/learn">
          배우기
        </Link>
      </nav>
      <h1 className="text-3xl font-extrabold">Database가 필요한 이유</h1>
      <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">
        브라우저 메모리만으로는 데이터가 사라질 수 있습니다. Database는 구조적으로 남기기 위한
        저장소입니다 — 특정 제품이 정답은 아닙니다.
      </p>
      <p className="mt-2 text-sm">
        <Link
          className="text-[var(--accent-primary)] underline"
          href="/learn/vibe-coding-foundation/api"
        >
          ← API
        </Link>
      </p>

      <section className="mt-8 rounded-2xl border bg-[var(--surface-secondary)] p-5 text-sm leading-7">
        Firebase·Supabase·Neon·MongoDB 등은 선택지. 가격·무료 범위는 공식 문서 확인 후에만. 원본:{" "}
        <code>15-database.md</code>
      </section>

      <section className="mt-10" id="simulation">
        <h2 className="mb-4 text-xl font-extrabold">인터랙티브</h2>
        <DataStoreExperience />
      </section>

      <section className="mt-10 text-sm" id="practice">
        <h2 className="font-extrabold">실습</h2>
        <ol className="mt-2 list-decimal pl-5 text-[var(--text-secondary)]">
          <li>메모리 vs 저장소 토글 후 새로고침 시뮬</li>
          <li>내 앱에 저장 필요 Yes/No + 이유</li>
          <li>AI: 제품 추천 말고 저장 데이터 목록만</li>
        </ol>
      </section>

      <section className="mt-10 rounded-2xl border p-5" id="quiz-outcomes">
        <h2 className="font-extrabold">Quiz · Outcome</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-[var(--text-secondary)]">
          <li>Q: 모든 앱에 DB 필수? → 아니오, 필요에 따라</li>
          <li>O: 남는 저장소로 설명</li>
          <li>O: 특정 제품을 유일 정답처럼 말하지 않음</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 text-sm">
        <h2 className="font-extrabold">Track B 완료 → Batch 4</h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          다음 경로: AI에게 좋은 작업 요청하기 · Prompt · Context · 관련 파일만 보여주기
        </p>
        <Link className="mt-2 inline-block font-semibold text-[var(--accent-primary)] underline" href="/learn">
          Learning Path
        </Link>
      </section>
    </main>
  )
}
