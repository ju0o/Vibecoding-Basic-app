import { TaskRouterSimulator } from "@/features/model-routing/TaskRouterSimulator"

export default function ModelRoutingSimulatorPage() {
  return (
    <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6">
      <header className="grid gap-2">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">
          Task Router Simulator
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
          규칙 기반 교육용 시뮬레이터입니다. 외부 AI API를 호출하지 않으며, 같은 입력은 항상 같은
          결과를 냅니다.
        </p>
      </header>
      <TaskRouterSimulator />
    </main>
  )
}
