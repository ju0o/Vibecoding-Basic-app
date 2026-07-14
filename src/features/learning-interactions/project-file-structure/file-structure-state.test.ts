import { describe, expect, it } from "vitest"
import { buildAiRequest, createFsModel, fsReduce } from "./file-structure-state"

describe("file-structure-state", () => {
  it("wrong file stays educational, correct advances to edit", () => {
    let m = createFsModel()
    m = fsReduce(m, { type: "SET_SCENE", scene: "find" })
    m = fsReduce(m, { type: "SELECT_FILE", id: "css" })
    m = fsReduce(m, { type: "TRY_FIND" })
    expect(m.scene).toBe("wrong")
    expect(m.wrongAttempts).toBe(1)
    m = fsReduce(m, { type: "SELECT_FILE", id: "js" })
    m = fsReduce(m, { type: "TRY_FIND" })
    expect(m.scene).toBe("edit")
  })

  it("edit changes preview and moves to ai_scope", () => {
    let m = createFsModel()
    m = fsReduce(m, { type: "SELECT_FILE", id: "js" })
    m = fsReduce(m, { type: "SET_SCENE", scene: "edit" })
    const before = m.previewText
    m = fsReduce(m, { type: "APPLY_EDIT" })
    expect(m.previewText).not.toBe(before)
    expect(m.scene).toBe("ai_scope")
  })

  it("builds AI request from toggles", () => {
    let m = createFsModel()
    m = fsReduce(m, { type: "TOGGLE_AI", key: "analyze" })
    m = fsReduce(m, { type: "TOGGLE_AI", key: "file" })
    m = fsReduce(m, { type: "TOGGLE_AI", key: "forbid" })
    const text = buildAiRequest(m)
    expect(text).toContain("분석")
    expect(text).toContain("main.js")
    expect(text).toContain("다른 파일")
  })
})
