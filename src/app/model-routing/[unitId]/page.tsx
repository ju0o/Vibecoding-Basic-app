import Link from "next/link"
import { notFound } from "next/navigation"
import { getAdjacentUnits, getUnitById, MODEL_ROUTING_UNITS } from "@/content/model-routing/units"
import { EducationalLabelNotice } from "@/features/model-routing/EducationalLabelNotice"
import { QuizPanel } from "@/features/model-routing/QuizPanel"
import type { ModelRoutingUnitId } from "@/lib/model-routing/contract"
import { MODEL_ROUTING_UNIT_IDS } from "@/lib/model-routing/contract"

type PageProps = {
  readonly params: Promise<{ readonly unitId: string }>
}

export function generateStaticParams() {
  return MODEL_ROUTING_UNIT_IDS.map((unitId) => ({ unitId }))
}

export default async function ModelRoutingUnitPage({ params }: PageProps) {
  const { unitId } = await params
  const unit = getUnitById(unitId)
  if (!unit) {
    notFound()
  }

  const { previous, next } = getAdjacentUnits(unit.id)

  return (
    <main className="mx-auto grid max-w-3xl gap-8 px-4 py-10 sm:px-6">
      <header className="grid gap-3">
        <p className="text-xs font-bold text-[var(--text-tertiary)]">
          Unit {unit.order} / {MODEL_ROUTING_UNITS.length} · {unit.id}
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">{unit.title}</h1>
        <p className="text-base leading-7 text-[var(--text-secondary)]">{unit.oneLiner}</p>
        <p className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--text-primary)]">Why Bridge (in): </span>
          {unit.whyBridgeIn}
        </p>
        <EducationalLabelNotice />
        <p className="text-sm text-[var(--text-tertiary)]">
          상위 Concept: {unit.parentConcepts.join(", ")} · Depth KB: {unit.relatedKbIds.join(", ")}
        </p>
      </header>

      <div className="grid gap-6">
        {unit.sections.map((section) => (
          <section className="grid gap-2" key={section.id} id={section.id}>
            <h2 className="text-lg font-extrabold text-[var(--text-primary)]">{section.title}</h2>
            <p className="text-sm leading-7 text-[var(--text-secondary)]">{section.body}</p>
          </section>
        ))}
      </div>

      <QuizPanel unitId={unit.id as ModelRoutingUnitId} />

      <section className="grid gap-2 rounded-xl border border-[var(--border-default)] p-4">
        <h2 className="text-base font-extrabold text-[var(--text-primary)]">Checkpoint</h2>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          60초 동안 정의해 보세요: (1) 한 줄 정의 (2) 이전 문제 (3) 실패 시 다음 행동. 서버로
          전송되지 않습니다.
        </p>
        <Link
          className="text-sm font-bold text-[var(--accent-primary)]"
          href="/model-routing/simulator"
        >
          Simulator에서 같은 축으로 관찰하기 →
        </Link>
      </section>

      <p className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]">
        <span className="font-bold text-[var(--text-primary)]">Why Bridge (out): </span>
        {unit.whyBridgeOut}
      </p>

      <nav className="flex flex-wrap justify-between gap-3 border-t border-[var(--border-subtle)] pt-6">
        {previous ? (
          <Link
            className="text-sm font-bold text-[var(--text-secondary)]"
            href={`/model-routing/${previous.id}`}
          >
            ← {previous.title}
          </Link>
        ) : (
          <Link className="text-sm font-bold text-[var(--text-secondary)]" href="/model-routing">
            ← Route 홈
          </Link>
        )}
        {next ? (
          <Link
            className="text-sm font-bold text-[var(--accent-primary)]"
            href={`/model-routing/${next.id}`}
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            className="text-sm font-bold text-[var(--accent-primary)]"
            href="/model-routing/simulator"
          >
            Simulator →
          </Link>
        )}
      </nav>
    </main>
  )
}
