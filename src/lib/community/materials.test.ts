import { describe, expect, it } from "vitest"
import { MaterialStatus, UserRole } from "@/lib/firebase/types"
import { initialMaterialStatus, MaterialCreateInputSchema } from "./materials"

describe("materials", () => {
  it("requires a URL only for external sources", () => {
    expect(
      MaterialCreateInputSchema.safeParse({
        category: "web",
        title: "원본 자료",
        description: "설명",
        sourceType: "original",
      }).success,
    ).toBe(true)
    expect(
      MaterialCreateInputSchema.safeParse({
        category: "web",
        title: "외부 자료",
        description: "설명",
        sourceType: "external",
      }).success,
    ).toBe(false)
  })
  it("lets trusted members publish directly while members start drafts", () => {
    expect(initialMaterialStatus(UserRole.TrustedMember)).toBe(MaterialStatus.Community)
    expect(initialMaterialStatus(UserRole.Member)).toBe(MaterialStatus.Draft)
  })
})
