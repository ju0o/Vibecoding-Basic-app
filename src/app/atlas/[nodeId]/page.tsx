import { redirect } from "next/navigation"
import { ATLAS_CONCEPTS } from "@/content/atlas"
import { getAtlasConceptById } from "@/lib/atlas"

/** Legacy Phase 1 path — redirect to approved IA `/atlas/concepts/[conceptId]`. */
type PageProps = {
  readonly params: Promise<{ readonly nodeId: string }>
}

export function generateStaticParams() {
  return ATLAS_CONCEPTS.map((concept) => ({ nodeId: concept.id }))
}

export default async function LegacyAtlasNodePage({ params }: PageProps) {
  const { nodeId } = await params
  const concept = getAtlasConceptById(nodeId)
  if (!concept) {
    redirect("/atlas")
  }
  redirect(`/atlas/concepts/${concept.id}`)
}
