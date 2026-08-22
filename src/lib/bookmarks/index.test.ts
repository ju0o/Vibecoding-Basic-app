import { describe, expect, it } from "vitest"
import { TargetType } from "@/lib/firebase/types"
import {
  BookmarkCreateInputSchema,
  buildBookmarkId,
  isBookmarkIdForOwner,
  parseBookmarkId,
} from "./index"

describe("buildBookmarkId", () => {
  it("builds the D-007 deterministic id: {uid}__{targetType}__{targetId}", () => {
    expect(buildBookmarkId("uid1", TargetType.Post, "post1")).toBe("uid1__post__post1")
    expect(buildBookmarkId("uid1", TargetType.Material, "mat1")).toBe("uid1__material__mat1")
  })
})

describe("parseBookmarkId", () => {
  it("round-trips a valid id", () => {
    const id = buildBookmarkId("uidABC", TargetType.Post, "postXYZ")
    expect(parseBookmarkId(id)).toEqual({
      uid: "uidABC",
      targetType: TargetType.Post,
      targetId: "postXYZ",
    })
  })

  it("rejects ids with the wrong number of segments", () => {
    expect(parseBookmarkId("uid__post")).toBeNull()
    expect(parseBookmarkId("uid__post__target__extra")).toBeNull()
  })

  it("rejects ids with an invalid targetType", () => {
    expect(parseBookmarkId("uid__comment__target")).toBeNull()
  })

  it("rejects ids with empty uid or targetId", () => {
    expect(parseBookmarkId("__post__target")).toBeNull()
    expect(parseBookmarkId("uid__post__")).toBeNull()
  })
})

describe("isBookmarkIdForOwner", () => {
  it("returns true only when the id's uid segment matches", () => {
    const id = buildBookmarkId("uid1", TargetType.Post, "post1")
    expect(isBookmarkIdForOwner(id, "uid1")).toBe(true)
    expect(isBookmarkIdForOwner(id, "uid2")).toBe(false)
  })
})

describe("BookmarkCreateInputSchema", () => {
  it("accepts post and material target types", () => {
    expect(
      BookmarkCreateInputSchema.safeParse({ targetType: TargetType.Post, targetId: "post1" })
        .success,
    ).toBe(true)
    expect(
      BookmarkCreateInputSchema.safeParse({ targetType: TargetType.Material, targetId: "mat1" })
        .success,
    ).toBe(true)
  })

  it("rejects unsupported target types", () => {
    expect(
      BookmarkCreateInputSchema.safeParse({ targetType: "comment", targetId: "c1" }).success,
    ).toBe(false)
  })

  it("rejects an empty targetId", () => {
    expect(
      BookmarkCreateInputSchema.safeParse({ targetType: TargetType.Post, targetId: "" }).success,
    ).toBe(false)
  })
})
