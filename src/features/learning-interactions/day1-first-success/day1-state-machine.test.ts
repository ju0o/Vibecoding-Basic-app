import { describe, expect, it } from "vitest"
import {
  canAdvance,
  createInitialDay1Model,
  day1Reduce,
  getHighlightedFileId,
  getTerminalLines,
  TOTAL_FILES,
} from "./day1-state-machine"

describe("day1-state-machine", () => {
  it("starts idle and ignores advance", () => {
    const m0 = createInitialDay1Model()
    expect(m0.state).toBe("idle")
    expect(day1Reduce(m0, { type: "ADVANCE" }).state).toBe("idle")
  })

  it("select prompt → requesting → planning → generating files", () => {
    let m = createInitialDay1Model()
    m = day1Reduce(m, { type: "SELECT_PROMPT", promptId: "welcome" })
    expect(m.state).toBe("requesting")
    expect(m.promptId).toBe("welcome")
    m = day1Reduce(m, { type: "ADVANCE" })
    expect(m.state).toBe("planning")
    m = day1Reduce(m, { type: "ADVANCE" })
    expect(m.state).toBe("generating")
    expect(m.filesVisible).toBe(1)
    for (let i = 0; i < TOTAL_FILES - 1; i += 1) {
      m = day1Reduce(m, { type: "ADVANCE" })
    }
    expect(m.filesVisible).toBe(TOTAL_FILES)
    m = day1Reduce(m, { type: "ADVANCE" })
    expect(m.state).toBe("installing")
  })

  it("install → server → running with preview title", () => {
    let m = createInitialDay1Model()
    m = day1Reduce(m, { type: "SELECT_PROMPT", promptId: "welcome" })
    // blast through to running
    const max = 40
    for (let i = 0; i < max && m.state !== "running"; i += 1) {
      m = day1Reduce(m, { type: "ADVANCE" })
    }
    expect(m.state).toBe("running")
    expect(m.serverStatus).toBe("running")
    expect(m.preview.title).toContain("바이브코딩")
    const lines = getTerminalLines(m)
    expect(lines.some((l) => l.text.includes("npm run dev"))).toBe(true)
  })

  it("revision links file highlight and preview change", () => {
    let m = createInitialDay1Model()
    m = day1Reduce(m, { type: "SELECT_PROMPT", promptId: "welcome" })
    for (let i = 0; i < 40 && m.state !== "running"; i += 1) {
      m = day1Reduce(m, { type: "ADVANCE" })
    }
    const before = m.preview.title
    m = day1Reduce(m, { type: "SELECT_REVISION", revisionId: "title" })
    expect(m.state).toBe("revising")
    expect(m.preview.title).toBe("Day 1 성공")
    expect(m.preview.title).not.toBe(before)
    expect(getHighlightedFileId(m)).toBe("js")
    m = day1Reduce(m, { type: "ADVANCE" })
    expect(m.state).toBe("running")
  })

  it("error → copy → send → fix → rerun recovery", () => {
    let m = createInitialDay1Model()
    m = day1Reduce(m, { type: "SELECT_PROMPT", promptId: "welcome" })
    for (let i = 0; i < 40 && m.state !== "running"; i += 1) {
      m = day1Reduce(m, { type: "ADVANCE" })
    }
    m = day1Reduce(m, { type: "TRIGGER_ERROR", errorId: "typo" })
    expect(m.state).toBe("error")
    expect(m.serverStatus).toBe("error")
    m = day1Reduce(m, { type: "COPY_ERROR" })
    expect(m.errorCopied).toBe(true)
    m = day1Reduce(m, { type: "SEND_TO_AI" })
    expect(m.errorSent).toBe(true)
    m = day1Reduce(m, { type: "APPLY_FIX" })
    expect(m.state).toBe("recovering")
    m = day1Reduce(m, { type: "RERUN" })
    expect(m.state).toBe("running")
    expect(m.serverStatus).toBe("running")
  })

  it("pause blocks advance", () => {
    let m = createInitialDay1Model()
    m = day1Reduce(m, { type: "SELECT_PROMPT", promptId: "welcome" })
    m = day1Reduce(m, { type: "PAUSE" })
    expect(canAdvance(m)).toBe(false)
    const stuck = day1Reduce(m, { type: "ADVANCE" })
    expect(stuck.state).toBe("requesting")
    m = day1Reduce(m, { type: "RESUME" })
    m = day1Reduce(m, { type: "ADVANCE" })
    expect(m.state).toBe("planning")
  })

  it("reset returns idle", () => {
    let m = createInitialDay1Model()
    m = day1Reduce(m, { type: "SELECT_PROMPT", promptId: "name-hero" })
    m = day1Reduce(m, { type: "RESET" })
    expect(m).toEqual(createInitialDay1Model())
  })
})
