import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { httpsCallable } from "firebase/functions"
import { z } from "zod"
import { getFirebaseFunctions, getFirestore } from "@/lib/firebase/client"
import {
  MaterialStatus,
  type MaterialStatus as MaterialStatusValue,
  UserRole,
} from "@/lib/firebase/types"

export const LinkedRefSchema = z
  .object({ type: z.enum(["lesson", "glossary", "atlas"]), id: z.string().min(1) })
  .strict()
export const MaterialCreateInputSchema = z
  .object({
    category: z.string().min(1).max(40),
    title: z.string().min(2).max(120),
    description: z.string().min(1).max(5000),
    mediaAssetIds: z.array(z.string().min(1)).max(5).default([]),
    tags: z.array(z.string().min(1).max(20)).max(5).default([]),
    linkedRefs: z.array(LinkedRefSchema).max(5).default([]),
  })
  .and(
    z.discriminatedUnion("sourceType", [
      z.object({ sourceType: z.literal("external"), resourceUrl: z.string().url().max(2048) }),
      z.object({ sourceType: z.literal("original") }).strict(),
    ]),
  )
export type MaterialCreateInput = z.infer<typeof MaterialCreateInputSchema>
export type Material = MaterialCreateInput & {
  id: string
  authorUid: string
  authorDisplayName: string
  status: MaterialStatusValue
  likeCount: number
  commentCount: number
  createdAt: unknown
  updatedAt: unknown
}

export function initialMaterialStatus(role: UserRole): MaterialStatusValue {
  return role === UserRole.TrustedMember ? MaterialStatus.Community : MaterialStatus.Draft
}

export async function createMaterial(
  input: MaterialCreateInput,
  author: { uid: string; displayName: string },
  role: UserRole,
): Promise<string> {
  const data = MaterialCreateInputSchema.parse(input)
  const status = initialMaterialStatus(role)
  const snapshot = await addDoc(collection(getFirestore(), "materials"), {
    ...data,
    authorUid: author.uid,
    authorDisplayName: author.displayName,
    status,
    likeCount: 0,
    commentCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return snapshot.id
}

export async function updateMaterial(
  materialId: string,
  input: Partial<MaterialCreateInput>,
): Promise<void> {
  await updateDoc(doc(getFirestore(), "materials", materialId), {
    ...input,
    updatedAt: serverTimestamp(),
  })
}

function toMaterial(id: string, value: Record<string, unknown>): Material | null {
  const parsed = MaterialCreateInputSchema.safeParse(value)
  if (
    !parsed.success ||
    typeof value["authorUid"] !== "string" ||
    typeof value["status"] !== "string"
  )
    return null
  return {
    id,
    ...parsed.data,
    authorUid: value["authorUid"],
    authorDisplayName:
      typeof value["authorDisplayName"] === "string" ? value["authorDisplayName"] : "회원",
    status: value["status"] as MaterialStatusValue,
    likeCount: typeof value["likeCount"] === "number" ? value["likeCount"] : 0,
    commentCount: typeof value["commentCount"] === "number" ? value["commentCount"] : 0,
    createdAt: value["createdAt"],
    updatedAt: value["updatedAt"],
  }
}

export async function getMaterial(materialId: string): Promise<Material | null> {
  const snapshot = await getDoc(doc(getFirestore(), "materials", materialId))
  return snapshot.exists() ? toMaterial(snapshot.id, snapshot.data()) : null
}

export async function listMaterials(
  status?: MaterialStatusValue,
  category?: string,
): Promise<Material[]> {
  const constraints = []
  if (status) constraints.push(where("status", "==", status))
  if (category) constraints.push(where("category", "==", category))
  constraints.push(orderBy("createdAt", "desc"))
  const snapshot = await getDocs(query(collection(getFirestore(), "materials"), ...constraints))
  return snapshot.docs.flatMap((item) => {
    const material = toMaterial(item.id, item.data())
    return material ? [material] : []
  })
}

export async function setMaterialStatus(
  materialId: string,
  status: Exclude<MaterialStatusValue, "draft">,
  statusNote?: string,
): Promise<void> {
  const call = httpsCallable(getFirebaseFunctions(), "setMaterialStatus")
  await call({ materialId, status, statusNote })
}
