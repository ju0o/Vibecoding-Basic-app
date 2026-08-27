"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { createMaterial, type MaterialCreateInput } from "@/lib/community/materials"
import { UserRole } from "@/lib/firebase/types"

export default function NewMaterialPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [sourceType, setSourceType] = useState<"original" | "external">("original")
  const [resourceUrl, setResourceUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user || saving) return
    setSaving(true)
    setError(null)
    try {
      const common = { category, title, description, mediaAssetIds: [], tags: [], linkedRefs: [] }
      const input: MaterialCreateInput =
        sourceType === "external"
          ? { ...common, sourceType, resourceUrl }
          : { ...common, sourceType }
      const id = await createMaterial(
        input,
        { uid: user.uid, displayName: user.displayName ?? user.email ?? "회원" },
        user.role,
      )
      router.replace(`/materials/item?id=${encodeURIComponent(id)}`)
    } catch {
      setError("자료를 저장하지 못했습니다. 입력값과 권한을 확인해 주세요.")
      setSaving(false)
    }
  }
  if (loading || !user)
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-[var(--text-secondary)]">
        로그인이 필요합니다.
      </div>
    )
  if (
    !(
      user.role === UserRole.Member ||
      user.role === UserRole.TrustedMember ||
      user.role === UserRole.Moderator ||
      user.role === UserRole.Admin
    )
  )
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-[var(--text-secondary)]">
        활성 회원만 자료를 등록할 수 있습니다.
      </div>
    )
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/materials" className="text-sm text-[var(--accent-primary)]">
        자료 목록으로
      </Link>
      <h1 className="mt-5 text-3xl font-extrabold text-[var(--text-primary)]">자료 등록</h1>
      <form
        onSubmit={submit}
        className="mt-8 space-y-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-6"
      >
        <label className="block">
          <span className="text-sm text-[var(--text-secondary)]">카테고리</span>
          <input
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-[var(--text-primary)]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--text-secondary)]">제목</span>
          <input
            required
            minLength={2}
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-[var(--text-primary)]"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--text-secondary)]">설명</span>
          <textarea
            required
            maxLength={5000}
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-[var(--text-primary)]"
          />
        </label>
        <fieldset>
          <legend className="text-sm text-[var(--text-secondary)]">출처</legend>
          <div className="mt-2 flex gap-4 text-sm text-[var(--text-primary)]">
            <label>
              <input
                type="radio"
                checked={sourceType === "original"}
                onChange={() => setSourceType("original")}
              />{" "}
              직접 작성
            </label>
            <label>
              <input
                type="radio"
                checked={sourceType === "external"}
                onChange={() => setSourceType("external")}
              />{" "}
              외부 자료
            </label>
          </div>
        </fieldset>
        {sourceType === "external" && (
          <label className="block">
            <span className="text-sm text-[var(--text-secondary)]">출처 URL</span>
            <input
              required
              type="url"
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[var(--border-subtle)] bg-transparent px-3 py-2 text-[var(--text-primary)]"
            />
          </label>
        )}
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[var(--accent-primary)] px-5 py-2.5 font-semibold text-white disabled:opacity-50"
        >
          {saving ? "저장 중..." : "자료 등록"}
        </button>
      </form>
    </main>
  )
}
