import { collection, getDocs, query, where } from "firebase/firestore"
import { z } from "zod"
import { getFirestore } from "@/lib/firebase/client"

export const CATEGORY_SEED = [
  ...[
    "free",
    "question",
    "troubleshooting",
    "today-i-made",
    "project",
    "tool-review",
    "insight",
    "gupt-meetup",
  ].map((slug) => ({ slug, kind: "community" as const })),
  ...["prompt", "workflow", "tool-guide", "template", "case-study", "reference"].map((slug) => ({
    slug,
    kind: "material" as const,
  })),
]

export const CategorySchema = z.object({
  slug: z.string().min(1),
  label: z.string().min(1),
  kind: z.enum(["community", "material"]),
  status: z.enum(["active", "archived"]),
})
export type Category = z.infer<typeof CategorySchema>

export async function listActiveCategories(kind: Category["kind"]): Promise<Category[]> {
  const snapshot = await getDocs(
    query(
      collection(getFirestore(), "categories"),
      where("kind", "==", kind),
      where("status", "==", "active"),
    ),
  )
  return snapshot.docs.map((item) => CategorySchema.parse({ id: item.id, ...item.data() }))
}
