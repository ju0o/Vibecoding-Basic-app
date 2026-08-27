import { Suspense } from "react"
import MaterialItemClient from "./MaterialItemClient"

export default function MaterialItemPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <p className="text-[var(--text-secondary)]">불러오는 중...</p>
        </main>
      }
    >
      <MaterialItemClient />
    </Suspense>
  )
}
