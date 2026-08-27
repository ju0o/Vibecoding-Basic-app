import { describe, expect, it } from "vitest"
import { CATEGORY_SEED } from "./categories"

describe("category seed", () => {
  it("contains the canonical 8 community and 6 material categories", () => {
    expect(CATEGORY_SEED).toHaveLength(14)
    expect(CATEGORY_SEED.filter((item) => item.kind === "community")).toHaveLength(8)
    expect(CATEGORY_SEED.filter((item) => item.kind === "material")).toHaveLength(6)
  })
})
