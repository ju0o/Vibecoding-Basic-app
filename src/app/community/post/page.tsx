import { Suspense } from "react"
import CommunityDetailClient from "./CommunityDetailClient"

function CommunityDetailFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12" />
  )
}

export default function CommunityDetailPage() {
  return (
    <Suspense fallback={<CommunityDetailFallback />}>
      <CommunityDetailClient />
    </Suspense>
  )
}
