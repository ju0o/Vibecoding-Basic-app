"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getMaterial, type Material } from "@/lib/community/materials"

export default function MaterialItemPage() {
  const id = useSearchParams().get("id")
  const [material, setMaterial] = useState<Material | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    void getMaterial(id)
      .then(setMaterial)
      .finally(() => setLoading(false))
  }, [id])
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/materials" className="text-sm text-[var(--accent-primary)]">
        자료 목록으로
      </Link>
      {loading ? (
        <p className="mt-8 text-[var(--text-secondary)]">불러오는 중...</p>
      ) : !material ? (
        <p className="mt-8 text-[var(--text-secondary)]">자료를 찾을 수 없습니다.</p>
      ) : (
        <article className="mt-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-6">
          <p className="text-sm text-[var(--text-tertiary)]">
            {material.category} · {material.status}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-[var(--text-primary)]">
            {material.title}
          </h1>
          <p className="mt-5 whitespace-pre-wrap leading-7 text-[var(--text-secondary)]">
            {material.description}
          </p>
          <p className="mt-6 text-sm text-[var(--text-tertiary)]">
            작성자: {material.authorDisplayName}
          </p>
        </article>
      )}
    </main>
  )
}
