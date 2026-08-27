import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { getFirestore } from "@/lib/firebase/client"

export async function createCategoryRequest(
  input: { slug: string; label: string; kind: "community" | "material" },
  uid: string,
) {
  const reference = await addDoc(collection(getFirestore(), "categoryRequests"), {
    ...input,
    requestedByUid: uid,
    status: "submitted",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return reference.id
}
