const CATEGORY_SEED = [
  ...["free", "question", "troubleshooting", "today-i-made", "project", "tool-review", "insight", "gupt-meetup"].map((slug) => ({ slug, kind: "community" })),
  ...["prompt", "workflow", "tool-guide", "template", "case-study", "reference"].map((slug) => ({ slug, kind: "material" })),
]

const endpoint = process.env.FIRESTORE_EMULATOR_HOST ?? "127.0.0.1:8080"
const projectId = process.env.GCLOUD_PROJECT ?? "ju0o-ec967"
const base = `http://${endpoint}/v1/projects/${projectId}/databases/(default)/documents/categories`
for (const category of CATEGORY_SEED) {
  const body = { fields: { slug: { stringValue: category.slug }, label: { stringValue: category.slug }, kind: { stringValue: category.kind }, status: { stringValue: "active" } } }
  const response = await fetch(`${base}/${category.slug}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
  if (!response.ok) throw new Error(`seed failed for ${category.slug}: ${response.status}`)
}
console.log(`seeded ${CATEGORY_SEED.length} categories`)
