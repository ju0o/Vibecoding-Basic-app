import type { Metadata } from "next"
import { Badge } from "@/components/ui/Badge"
import { GLOSSARY_TERMS } from "@/content/glossary"
import { GlossaryBrowser } from "@/features/glossary/GlossaryBrowser"

export const metadata: Metadata = {
  title: "용어 사전",
  description: "개발과 AI 엔지니어링 용어를 검색하고 연결해서 학습합니다.",
}

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-3xl">
        <Badge variant="accent">검색 가능한 용어 사전</Badge>
        <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">
          헷갈리는 단어를 설명 가능한 개념으로 바꿉니다
        </h1>
        <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
          HTML부터 Harness Engineering까지, 짧은 정의와 쉬운 설명, 관련 용어를 함께 봅니다.
        </p>
      </div>
      <div className="mt-8">
        <GlossaryBrowser terms={GLOSSARY_TERMS} />
      </div>
    </div>
  )
}
