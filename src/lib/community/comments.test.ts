import { describe, expect, it } from "vitest"
import { CommentSchema } from "./comments"

describe("CommentSchema", () => {
  it("requires a published comment body and target", () => {
    expect(
      CommentSchema.safeParse({
        targetType: "post",
        targetId: "p1",
        authorUid: "u1",
        bodyMarkdown: "좋은 글입니다.",
        status: "published",
      }).success,
    ).toBe(true)
    expect(
      CommentSchema.safeParse({ targetType: "post", targetId: "p1", status: "hidden" }).success,
    ).toBe(false)
  })
})
