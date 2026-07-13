import Link from "next/link"
import { MODEL_ROUTING_EDGES } from "@/content/model-routing/graph"
import { MODEL_ROUTING_UNITS } from "@/content/model-routing/units"
import { EducationalLabelNotice } from "@/features/model-routing/EducationalLabelNotice"
import { RoutingDiagram } from "@/features/model-routing/RoutingDiagram"

export default function ModelRoutingHomePage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-10 sm:px-6">
      <header className="grid gap-4">
        <p className="text-sm font-bold text-[var(--accent-primary)]">
          하위 Learning Route · Orchestration → Evaluation → Harness
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          Model Routing Learning Route
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[var(--text-secondary)]">
          여러 Agent를 만든 뒤, 어떤 일을 누구에게·어떤 비용으로 맡기고 실패 시 어떻게
          검증·재시도·에스컬레이션할지 배우는 교육 경로입니다. 기존 21개 핵심 Concept를 늘리지
          않습니다.
        </p>
        <EducationalLabelNotice />
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-bold text-white"
            href="/model-routing/simulator"
          >
            Task Router Simulator 열기
          </Link>
          <Link
            className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-bold text-[var(--text-primary)]"
            href={`/model-routing/${MODEL_ROUTING_UNITS[0]?.id}`}
          >
            첫 Unit부터 학습
          </Link>
        </div>
      </header>

      <RoutingDiagram />

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">9 Learning Units</h2>
        <ol className="grid gap-3">
          {MODEL_ROUTING_UNITS.map((unit) => (
            <li key={unit.id}>
              <Link
                className="block rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 transition hover:border-[var(--accent-primary)]"
                href={`/model-routing/${unit.id}`}
              >
                <span className="text-xs font-bold text-[var(--text-tertiary)]">
                  {String(unit.order).padStart(2, "0")} · {unit.id}
                </span>
                <span className="mt-1 block text-lg font-extrabold text-[var(--text-primary)]">
                  {unit.title}
                </span>
                <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">
                  {unit.oneLiner}
                </span>
                <span className="mt-2 block text-xs text-[var(--text-tertiary)]">
                  Why: {unit.whyBridgeIn}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
          Knowledge Graph (텍스트)
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          LearningUnit / 상위 Concept 연결. 대형 그래프 라이브러리 없이 표로 제공합니다.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-default)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-secondary)]">
              <tr>
                <th className="px-3 py-2">from</th>
                <th className="px-3 py-2">kind</th>
                <th className="px-3 py-2">to</th>
                <th className="px-3 py-2">why</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_ROUTING_EDGES.map((edge) => (
                <tr className="border-t border-[var(--border-subtle)]" key={edge.id}>
                  <td className="px-3 py-2 font-mono text-xs">{edge.from}</td>
                  <td className="px-3 py-2">{edge.kind}</td>
                  <td className="px-3 py-2 font-mono text-xs">{edge.to}</td>
                  <td className="px-3 py-2 text-[var(--text-secondary)]">
                    {edge.whyBridge ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 text-sm leading-7 text-[var(--text-secondary)]">
        <h2 className="text-base font-extrabold text-[var(--text-primary)]">상위 연결</h2>
        <p className="mt-2">
          권장 진입: Orchestration 학습 이후 → 이 Route → Evaluation / Harness. 심화는 기존 강의
          (multi-agent-orchestration, model-selection-tradeoffs, harness-engineering-basics 등)로
          연결됩니다.
        </p>
      </section>
    </main>
  )
}
