export type AliScene = "sort" | "pair" | "pipeline" | "habit" | "done"

export type AliModel = {
  readonly scene: AliScene
  readonly pairs: Record<string, string>
  readonly pipelineStep: number
  readonly paused: boolean
}

const CORRECT: Record<string, string> = {
  AI: "넓은 기술 묶음",
  LLM: "텍스트 언어 모델",
  IDE: "코드 작업 공간 개념",
  "VS Code": "편집기/IDE 제품 예시",
  "AI 코딩 도구": "편집 + 대화·수정 도움",
}

export function createAliModel(): AliModel {
  return {
    scene: "sort",
    pairs: {},
    pipelineStep: 0,
    paused: false,
  }
}

export type AliAction =
  | { type: "SET_SCENE"; scene: AliScene }
  | { type: "PAIR"; term: string; meaning: string }
  | { type: "PIPELINE_NEXT" }
  | { type: "ADVANCE" }
  | { type: "RESET" }
  | { type: "PAUSE" }
  | { type: "RESUME" }

const ORDER: AliScene[] = ["sort", "pair", "pipeline", "habit", "done"]

export function aliReduce(m: AliModel, a: AliAction): AliModel {
  if (a.type === "RESET") return createAliModel()
  if (a.type === "PAUSE") return { ...m, paused: true }
  if (a.type === "RESUME") return { ...m, paused: false }
  if (m.paused && a.type === "ADVANCE") return m
  if (a.type === "SET_SCENE") return { ...m, scene: a.scene }
  if (a.type === "PAIR") return { ...m, pairs: { ...m.pairs, [a.term]: a.meaning } }
  if (a.type === "PIPELINE_NEXT") {
    return { ...m, pipelineStep: Math.min(4, m.pipelineStep + 1) }
  }
  if (a.type === "ADVANCE") {
    if (m.scene === "pipeline" && m.pipelineStep < 4) {
      return { ...m, pipelineStep: m.pipelineStep + 1 }
    }
    const i = ORDER.indexOf(m.scene)
    const next = ORDER[Math.min(i + 1, ORDER.length - 1)]
    return { ...m, scene: next ?? m.scene }
  }
  return m
}

export function pairScore(m: AliModel): number {
  return Object.entries(CORRECT).filter(([k, v]) => m.pairs[k] === v).length
}

export { CORRECT }
