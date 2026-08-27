import { describe, expect, it } from "vitest"
import { TargetType } from "@/lib/firebase/types"
import { buildReactionId } from "./reactions"

describe("buildReactionId", () => {
  it("uses the canonical target and owner tuple", () => {
    expect(buildReactionId(TargetType.Post, "post-1", "user-1")).toBe("post__post-1__user-1")
  })
})
