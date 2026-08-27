import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { getFirestore } from "@/lib/firebase/client"
import { ReactionType, type TargetType } from "@/lib/firebase/types"

export function buildReactionId(targetType: TargetType, targetId: string, uid: string): string {
  return `${targetType}__${targetId}__${uid}`
}

export async function hasLike(
  targetType: TargetType,
  targetId: string,
  uid: string,
): Promise<boolean> {
  return (
    await getDoc(doc(getFirestore(), "reactions", buildReactionId(targetType, targetId, uid)))
  ).exists()
}

export async function toggleLike(
  targetType: TargetType,
  targetId: string,
  uid: string,
  liked: boolean,
): Promise<boolean> {
  const reactionRef = doc(getFirestore(), "reactions", buildReactionId(targetType, targetId, uid))
  if (liked) {
    await deleteDoc(reactionRef)
    return false
  }
  await setDoc(reactionRef, {
    targetType,
    targetId,
    uid,
    type: ReactionType.Like,
    createdAt: serverTimestamp(),
  })
  return true
}
