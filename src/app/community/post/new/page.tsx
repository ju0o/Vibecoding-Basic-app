"use client"

import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getFirestore } from "@/lib/firebase/client"
import { PostStatus } from "@/lib/firebase/types"

export default function NewCommunityPostPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [title, setTitle] = useState("")
  const [bodyMarkdown, setBodyMarkdown] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login")
  }, [authLoading, router, user])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user || saving) return

    const trimmedTitle = title.trim()
    const trimmedBody = bodyMarkdown.trim()
    if (!trimmedTitle || !trimmedBody) {
      setError("제목과 본문을 모두 입력해 주세요.")
      return
    }

    setSaving(true)
    setError(null)
    try {
      const post = await addDoc(collection(getFirestore(), "posts"), {
        title: trimmedTitle,
        bodyMarkdown: trimmedBody,
        authorDisplayName: user.displayName ?? user.email ?? "구피티 회원",
        authorUid: user.uid,
        tags: [],
        upvoteCount: 0,
        createdAt: serverTimestamp(),
        status: PostStatus.Published,
      })
      router.replace(`/community/post?id=${encodeURIComponent(post.id)}`)
    } catch {
      setError("게시글을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.")
      setSaving(false)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12" />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/community"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          커뮤니티 목록으로
        </Link>
        <div className="mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white">새 글쓰기</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm text-gray-300">제목</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-purple-400"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">본문 (Markdown)</span>
              <textarea
                value={bodyMarkdown}
                onChange={(event) => setBodyMarkdown(event.target.value)}
                required
                rows={12}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-purple-400"
              />
            </label>
            {error && <p className="text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-purple-500 px-5 py-2.5 font-medium text-white hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              {saving ? "저장 중..." : "게시하기"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
