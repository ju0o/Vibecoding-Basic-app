const { initializeApp } = require("firebase-admin/app")
const { FieldValue, getFirestore } = require("firebase-admin/firestore")
const { onDocumentCreated, onDocumentDeleted } = require("firebase-functions/v2/firestore")
const { onCall, HttpsError } = require("firebase-functions/v2/https")

initializeApp()
const db = getFirestore()

function targetPath(data) {
  if (!data || !["post", "material"].includes(data.targetType) || typeof data.targetId !== "string")
    return null
  return `${data.targetType === "post" ? "posts" : "materials"}/${data.targetId}`
}

async function incrementTargetCount(data, field, amount) {
  const path = targetPath(data)
  if (!path) return
  await db.doc(path).update({ [field]: FieldValue.increment(amount) })
}

exports.onReactionCreated = onDocumentCreated("reactions/{reactionId}", async (event) => {
  await incrementTargetCount(event.data?.data(), "likeCount", 1)
})

exports.onReactionDeleted = onDocumentDeleted("reactions/{reactionId}", async (event) => {
  await incrementTargetCount(event.data?.data(), "likeCount", -1)
})

exports.onCommentCreated = onDocumentCreated("comments/{commentId}", async (event) => {
  const comment = event.data?.data()
  if (comment?.status !== "published") return
  const target = targetPath(comment)
  if (!target) return

  await incrementTargetCount(comment, "commentCount", 1)
  const targetSnapshot = await db.doc(target).get()
  const targetData = targetSnapshot.data()
  const targetUid = targetData?.authorUid ?? targetData?.authorId
  if (!targetUid || targetUid === comment.authorUid) return

  const notificationType = comment.parentCommentId
    ? "reply_to_comment"
    : comment.targetType === "post"
      ? "comment_on_post"
      : "comment_on_material"
  await db.collection("notifications").doc(targetUid).collection("items").add({
    type: notificationType,
    actorUid: comment.authorUid,
    targetType: comment.targetType,
    targetId: comment.targetId,
    commentId: event.params.commentId,
    createdAt: FieldValue.serverTimestamp(),
    read: false,
  })
})

const allowedTransitions = {
  moderator: new Set(["community", "needs_revision"]),
  admin: new Set(["community", "needs_revision", "official", "archived"]),
}

exports.setMaterialStatus = onCall(async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "로그인이 필요합니다.")
  const role = (await db.doc(`users/${request.auth.uid}`).get()).data()?.role
  if (role !== "moderator" && role !== "admin")
    throw new HttpsError("permission-denied", "검토 권한이 없습니다.")
  const { materialId, status, statusNote } = request.data || {}
  if (typeof materialId !== "string" || !allowedTransitions[role].has(status))
    throw new HttpsError("invalid-argument", "허용되지 않은 상태 변경입니다.")
  const materialRef = db.doc(`materials/${materialId}`)
  const materialSnapshot = await materialRef.get()
  if (!materialSnapshot.exists) throw new HttpsError("not-found", "자료를 찾을 수 없습니다.")
  const before = materialSnapshot.data()?.status
  const canTransition =
    role === "admin" ||
    (before === "pending_review" && (status === "community" || status === "needs_revision"))
  if (!canTransition)
    throw new HttpsError("failed-precondition", "현재 상태에서 변경할 수 없습니다.")
  const now = FieldValue.serverTimestamp()
  const batch = db.batch()
  batch.update(materialRef, {
    status,
    statusNote: typeof statusNote === "string" ? statusNote.slice(0, 500) : null,
    reviewedByUid: request.auth.uid,
    reviewedAt: now,
    updatedAt: now,
  })
  batch.set(db.collection("adminLogs").doc(), {
    actorUid: request.auth.uid,
    action: status === "official" ? "promote_material" : "demote_material",
    targetType: "material",
    targetId: materialId,
    before: { status: before },
    after: { status },
    createdAt: now,
  })
  await batch.commit()
  return { materialId, before, status }
})
