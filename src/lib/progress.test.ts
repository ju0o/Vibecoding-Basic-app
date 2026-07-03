import { describe, expect, it } from "vitest"
import { getProgressStats } from "@/lib/progress"

describe("getProgressStats", () => {
  it("returns zero progress when there are no lessons", () => {
    const stats = getProgressStats({ completedLessons: ["a"], totalLessons: 0 })

    expect(stats).toEqual({ completedCount: 1, totalCount: 0, percent: 0 })
  })

  it("deduplicates completed lessons before calculating percent", () => {
    const stats = getProgressStats({ completedLessons: ["a", "a", "b"], totalLessons: 4 })

    expect(stats).toEqual({ completedCount: 2, totalCount: 4, percent: 50 })
  })
})
