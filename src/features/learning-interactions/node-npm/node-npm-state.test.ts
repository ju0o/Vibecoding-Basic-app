import { describe, expect, it } from "vitest"
import { createNnModel, nnReduce, terminalLines } from "./node-npm-state"

describe("node-npm-state", () => {
  it("maps dev script to success when in project", () => {
    let m = createNnModel()
    m = nnReduce(m, { type: "SELECT_SCRIPT", name: "dev" })
    m = nnReduce(m, { type: "RUN_SELECTED" })
    expect(m.server).toBe("running")
    expect(m.lastError).toBeNull()
    expect(terminalLines(m).some((l) => l.text.includes("node server.js"))).toBe(true)
  })

  it("missing script serve errors", () => {
    let m = createNnModel()
    m = nnReduce(m, { type: "SELECT_SCRIPT", name: "serve" })
    m = nnReduce(m, { type: "RUN_SELECTED" })
    expect(m.lastError).toMatch(/Missing script/)
  })

  it("wrong directory errors", () => {
    let m = createNnModel()
    m = nnReduce(m, { type: "SET_CWD", cwd: "outside" })
    m = nnReduce(m, { type: "SELECT_SCRIPT", name: "dev" })
    m = nnReduce(m, { type: "RUN_SELECTED" })
    expect(m.lastError).toMatch(/package.json/)
  })

  it("builder rejects build not in scripts", () => {
    let m = createNnModel()
    m = nnReduce(m, { type: "BUILDER", choice: "build" })
    expect(m.lastError).toMatch(/build/)
  })
})
