import type { Timestamp } from "firebase/firestore"
import { describe, expect, it } from "vitest"
import { TargetType } from "@/lib/firebase/types"
import {
  BookmarkCreateInputSchema,
  buildBookmarkId,
  isBookmarkIdForOwner,
  isPostBookmark,
  parseBookmarkId,
  toSavedPostItems,
} from "./index"

function fakeTimestamp(iso: string | null): Timestamp {
  if (iso == null) return null as unknown as Timestamp
  const date = new Date(iso)
  return {
    toDate: () => date,
    toMillis: () => date.getTime(),
  } as unknown as Timestamp
}

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

describe("isPostBookmark", () => {
  it("accepts only post targets", () => {
    expect(isPostBookmark({ targetType: TargetType.Post })).toBe(true)
    expect(isPostBookmark({ targetType: TargetType.Material })).toBe(false)
  })
})

describe("toSavedPostItems", () => {
  it("keeps only post bookmarks and maps the doc id to bookmarkId", () => {
    const newer = fakeTimestamp("2026-03-01T09:00:00Z")
    const items = toSavedPostItems([
      {
        id: "u__material__m1",
        data: { uid: "u", targetType: TargetType.Material, targetId: "m1", createdAt: newer },
      },
      {
        id: "u__post__p2",
        data: { uid: "u", targetType: TargetType.Post, targetId: "p2", createdAt: newer },
      },
    ])
    expect(items).toEqual([{ bookmarkId: "u__post__p2", postId: "p2", createdAtMillis: newer.toMillis() }])
  })

  it("sorts newest first and puts entries without a timestamp last", () => {
    const older = fakeTimestamp("2026-01-01T09:00:00Z")
    const newest = fakeTimestamp("2026-06-01T09:00:00Z")
    const items = toSavedPostItems([
      {
        id: "u__post__old",
        data: { uid: "u", targetType: TargetType.Post, targetId: "old", createdAt: older },
      },
      {
        id: "u__post__none",
        data: { uid: "u", targetType: TargetType.Post, targetId: "none", createdAt: fakeTimestamp(null) },
      },
      {
        id: "u__post__new",
        data: { uid: "u", targetType: TargetType.Post, targetId: "new", createdAt: newest },
      },
    ])
    expect(items.map((item) => item.postId)).toEqual(["new", "old", "none"])
    expect(items[2]?.createdAtMillis).toBeNull()
  })
})
