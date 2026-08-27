import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { getFirestore } from "@/lib/firebase/client"

export type ReportReason = "spam" | "abuse" | "illegal" | "copyright" | "wrong_info" | "other"

export async function createReport(input: {
  targetType: "post" | "material"
  targetId: string
  reporterUid: string
  reason: ReportReason
  detail?: string
}) {
  const id = `${input.targetType}__${input.targetId}__${input.reporterUid}`
  await setDoc(doc(getFirestore(), "reports", id), {
    ...input,
    status: "open",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return id
}
