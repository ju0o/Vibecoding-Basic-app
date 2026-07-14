import type { Metadata } from "next"
import Link from "next/link"
import { JourneyMap } from "@/features/atlas/JourneyMap"
import { getSortedAtlasConcepts } from "@/lib/atlas"

export const metadata: Metadata = {
  title: "Atlas — AI Engineering 여정 (21 Concepts)",
  description:
    "AI에서 Production AI까지 21개 핵심 개념을 Why Bridge로 연결해 배웁니다. Model Routing은 하위 Learning Route입니다.",
}

export default function AtlasPage() {
  const concepts = getSortedAtlasConcepts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)]">
          AI Engineering Atlas V2
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[var(--text-primary)]">
          21개 개념으로 읽는 AI Engineering
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
          용어 Wiki가 아니라 <strong>필요의 역사</strong>입니다. Orchestration 이후에는{" "}
          <Link className="font-bold text-[var(--accent-primary)]" href="/model-routing">
            Model Routing
          </Link>{" "}
          하위 경로로 라우팅·비용·검증을 배우고, Evaluation·Harness로 이어집니다.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <Link className="font-bold text-[var(--text-secondary)]" href="/atlas/graph">
            Knowledge Graph
          </Link>
          <Link className="font-bold text-[var(--text-secondary)]" href="/atlas/timeline">
            Timeline
          </Link>
          <Link className="font-bold text-[var(--text-secondary)]" href="/curriculum">
            Textbook
          </Link>
          <Link className="font-bold text-[var(--text-secondary)]" href="/glossary">
            Wiki
          </Link>
          {process.env.NODE_ENV === "development" ? (
            <Link className="font-bold text-[var(--accent-primary)]" href="/atlas/studio">
              Education Studio (ops)
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-10">
        <JourneyMap concepts={concepts} />
      </div>
    </div>
  )
}
