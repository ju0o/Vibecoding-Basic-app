import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore"
import { z } from "zod"
import { getFirestore } from "@/lib/firebase/client"
import { CommentStatus, type TargetType } from "@/lib/firebase/types"

export const CommentSchema = z.object({
  targetType: z.enum(["post", "material"]),
  targetId: z.string().min(1),
  authorUid: z.string().min(1),
  authorDisplayName: z.string().nullable().optional(),
  bodyMarkdown: z.string().min(1).max(5000),
  status: z.literal(CommentStatus.Published),
  parentCommentId: z.string().nullable().optional(),
})

export type Comment = z.infer<typeof CommentSchema> & {
  id: string
  createdAt: unknown
}

export async function createComment(
  targetType: TargetType,
  targetId: string,
  bodyMarkdown: string,
  authorUid: string,
  authorDisplayName: string | null,
  parentCommentId: string | null = null,
): Promise<string> {
  const data = CommentSchema.parse({
    targetType,
    targetId,
    authorUid,
    authorDisplayName,
    bodyMarkdown: bodyMarkdown.trim(),
    status: CommentStatus.Published,
    parentCommentId,
  })
  const snapshot = await addDoc(collection(getFirestore(), "comments"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return snapshot.id
}

export async function listComments(targetType: TargetType, targetId: string): Promise<Comment[]> {
  const snapshot = await getDocs(
    query(
      collection(getFirestore(), "comments"),
      where("targetType", "==", targetType),
      where("targetId", "==", targetId),
      where("status", "==", CommentStatus.Published),
      orderBy("createdAt", "asc"),
    ),
  )
  return snapshot.docs.flatMap((item) => {
    const parsed = CommentSchema.safeParse(item.data())
    return parsed.success
      ? [{ id: item.id, ...parsed.data, createdAt: item.data()["createdAt"] }]
      : []
  })
}
