import type { Timestamp } from "firebase/firestore"
import { z } from "zod"
import { TargetType } from "@/lib/firebase/types"

export type BookmarkTargetType = typeof TargetType.Post | typeof TargetType.Material

export type Bookmark = {
  readonly uid: string
  readonly targetType: BookmarkTargetType
  readonly targetId: string
  readonly createdAt: Timestamp
}

export function buildBookmarkId(uid: string, targetType: BookmarkTargetType, targetId: string): string {
  return `${uid}__${targetType}__${targetId}`
}

export function parseBookmarkId(bookmarkId: string): { uid: string; targetType: BookmarkTargetType; targetId: string } | null {
  const parts = bookmarkId.split("__")
  if (parts.length !== 3) return null
  const [uid, targetType, targetId] = parts as [string, string, string]
  if (!uid || !targetId) return null
  if (targetType !== TargetType.Post && targetType !== TargetType.Material) return null
  return { uid, targetType: targetType as BookmarkTargetType, targetId }
}

export const BookmarkCreateInputSchema = z.object({
  targetType: z.enum([TargetType.Post, TargetType.Material]),
  targetId: z.string().min(1).max(200),
})

export const BookmarkSchema = z.object({
  uid: z.string().min(1),
  targetType: z.enum([TargetType.Post, TargetType.Material]),
  targetId: z.string().min(1).max(200),
  createdAt: z.custom<Timestamp>((value) => value != null && typeof (value as Timestamp).toDate === "function"),
})

export const BookmarkDocumentSchema = BookmarkSchema.strict()

export function isBookmarkIdForOwner(bookmarkId: string, uid: string): boolean {
  const parsed = parseBookmarkId(bookmarkId)
  return parsed != null && parsed.uid === uid
}

export type BookmarkDocEntry = {
  readonly id: string
  readonly data: Bookmark
}

export type SavedPostItem = {
  readonly bookmarkId: string
  readonly postId: string
  readonly createdAtMillis: number | null
}

export function isPostBookmark(bookmark: Pick<Bookmark, "targetType">): boolean {
  return bookmark.targetType === TargetType.Post
}

function timestampToMillis(timestamp: Bookmark["createdAt"]): number | null {
  if (!timestamp || typeof timestamp.toMillis !== "function") return null
  try {
    return timestamp.toMillis()
  } catch {
    return null
  }
}

export function toSavedPostItems(entries: readonly BookmarkDocEntry[]): SavedPostItem[] {
  return entries
    .filter((entry) => isPostBookmark(entry.data))
    .map((entry) => ({
      bookmarkId: entry.id,
      postId: entry.data.targetId,
      createdAtMillis: timestampToMillis(entry.data.createdAt),
    }))
    .sort((a, b) => (b.createdAtMillis ?? 0) - (a.createdAtMillis ?? 0))
}
