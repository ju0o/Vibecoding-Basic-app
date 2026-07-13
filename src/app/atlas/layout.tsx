import type { ReactNode } from "react"
import { AtlasProgressProvider } from "@/features/atlas/AtlasProgressProvider"

export default function AtlasLayout({ children }: { readonly children: ReactNode }) {
  return <AtlasProgressProvider>{children}</AtlasProgressProvider>
}
