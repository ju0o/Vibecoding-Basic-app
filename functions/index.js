const { initializeApp } = require("firebase-admin/app")
const { FieldValue, getFirestore } = require("firebase-admin/firestore")
const { onDocumentCreated, onDocumentDeleted } = require("firebase-functions/v2/firestore")

initializeApp()
const db = getFirestore()

function targetPath(data) {
  if (!data || !["post", "material"].includes(data.targetType) || typeof data.targetId !== "string") return null
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
  if (!comment || comment.status !== "published") return
  const target = targetPath(comment)
  if (!target) return

  await incrementTargetCount(comment, "commentCount", 1)
  const targetSnapshot = await db.doc(target).get()
  const targetData = targetSnapshot.data()
  const targetUid = targetData?.authorUid ?? targetData?.authorId
  if (!targetUid || targetUid === comment.authorUid) return

  const notificationType = comment.parentCommentId ? "reply_to_comment" :
    comment.targetType === "post" ? "comment_on_post" : "comment_on_material"
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
