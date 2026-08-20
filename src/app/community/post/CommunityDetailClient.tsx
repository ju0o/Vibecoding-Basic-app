"use client"

import { doc, getDoc, type Timestamp } from "firebase/firestore"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { getFirestore } from "@/lib/firebase/client"
import { PostStatus } from "@/lib/firebase/types"

interface CommunityPostDetail {
  id: string
  title: string
  bodyMarkdown: string
  authorDisplayName: string | null
  tags: string[]
  upvoteCount: number | null
  createdAt: Timestamp | null
}

function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env["NEXT_PUBLIC_FIREBASE_API_KEY"] && process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
  )
}

function toCommunityPostDetail(id: string, data: Record<string, unknown>): CommunityPostDetail {
  const title = typeof data["title"] === "string" ? data["title"] : "제목 없음"
  const bodyMarkdown = typeof data["bodyMarkdown"] === "string" ? data["bodyMarkdown"] : ""
  const authorDisplayName =
    typeof data["authorDisplayName"] === "string" ? data["authorDisplayName"] : null
  const tags = Array.isArray(data["tags"])
    ? data["tags"].filter((tag): tag is string => typeof tag === "string")
    : []
  const upvoteCount = typeof data["upvoteCount"] === "number" ? data["upvoteCount"] : null
  const createdAt = (data["createdAt"] ?? null) as Timestamp | null

  return { id, title, bodyMarkdown, authorDisplayName, tags, upvoteCount, createdAt }
}

function formatDate(value: Timestamp | null): string | null {
  if (!value || typeof value.toDate !== "function") return null
  try {
    return value.toDate().toLocaleDateString("ko-KR")
  } catch {
    return null
  }
}

export default function CommunityDetailClient() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [post, setPost] = useState<CommunityPostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      setLoading(true)
      setUnavailable(false)
      setNotFound(false)
      setPost(null)

      if (!id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      if (!isFirebaseConfigured()) {
        setUnavailable(true)
        setLoading(false)
        return
      }

      try {
        const snapshot = await getDoc(doc(getFirestore(), "posts", id))
        if (cancelled) return

        if (!snapshot.exists() || snapshot.data()["status"] !== PostStatus.Published) {
          setNotFound(true)
          return
        }

        setPost(toCommunityPostDetail(snapshot.id, snapshot.data() as Record<string, unknown>))
      } catch {
        if (!cancelled) setUnavailable(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadPost()
    return () => {
      cancelled = true
    }
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/community"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← 커뮤니티 목록으로
        </Link>

        <div className="mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">불러오는 중...</div>
          ) : unavailable ? (
            <div className="p-8 text-center text-gray-400">
              게시글을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.
            </div>
          ) : notFound || !post ? (
            <div className="p-8 text-center text-gray-400">
              존재하지 않거나 공개되지 않은 게시글입니다.
            </div>
          ) : (
            <article className="px-6 py-8 sm:px-8">
              <h1 className="text-2xl font-bold text-white">{post.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-400">
                {post.authorDisplayName && <span>{post.authorDisplayName}</span>}
                {formatDate(post.createdAt) && <span>{formatDate(post.createdAt)}</span>}
                {typeof post.upvoteCount === "number" && <span>추천 {post.upvoteCount}</span>}
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 border-t border-white/10 pt-6">
                {post.bodyMarkdown ? (
                  <div className="leading-7 text-gray-200">
                    <ReactMarkdown>{post.bodyMarkdown}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-gray-500">본문이 없습니다.</p>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
