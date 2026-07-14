import { describe, expect, it } from "vitest"
import { aliReduce, CORRECT, createAliModel, pairScore } from "./ai-llm-ide-state"

describe("ai-llm-ide-state", () => {
  it("scores correct pairs", () => {
    let m = createAliModel()
    for (const [term, meaning] of Object.entries(CORRECT)) {
      m = aliReduce(m, { type: "PAIR", term, meaning })
    }
    expect(pairScore(m)).toBe(5)
  })
})
