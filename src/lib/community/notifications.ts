import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { getFirestore } from "@/lib/firebase/client"

export async function listMyNotifications(uid: string) {
  const snapshot = await getDocs(
    query(
      collection(getFirestore(), "notifications", uid, "items"),
      where("read", "==", false),
      orderBy("createdAt", "desc"),
      limit(30),
    ),
  )
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
}
