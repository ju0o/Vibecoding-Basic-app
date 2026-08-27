"use client"

import { collection, getDocs, orderBy, query, type Timestamp, where } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { getFirestore } from "@/lib/firebase/client"
import { PostStatus } from "@/lib/firebase/types"

interface CommunityPost {
  id: string
  title: string
  authorDisplayName: string | null
  tags: string[]
  upvoteCount: number | null
  createdAt: Timestamp | null
}

function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env["NEXT_PUBLIC_FIREBASE_API_KEY"] && process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"]
  )
}

function toCommunityPost(id: string, data: Record<string, unknown>): CommunityPost {
  const title = typeof data["title"] === "string" ? data["title"] : "(제목 없음)"
  const authorDisplayName = typeof data["authorDisplayName"] === "string" ? data["authorDisplayName"] : null
  const tags = Array.isArray(data["tags"])
    ? data["tags"].filter((tag): tag is string => typeof tag === "string")
    : []
  const upvoteCount = typeof data["upvoteCount"] === "number" ? data["upvoteCount"] : null
  const createdAt = (data["createdAt"] ?? null) as Timestamp | null

  return { id, title, authorDisplayName, tags, upvoteCount, createdAt }
}

export default function CommunityPage() {
  const { user, loading: authLoading } = useAuth()
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPosts() {
      if (!isFirebaseConfigured()) {
        setUnavailable(true)
        setLoading(false)
        return
      }

      try {
        const db = getFirestore()
        const postsQuery = query(
          collection(db, "posts"),
          where("status", "==", PostStatus.Published),
          orderBy("createdAt", "desc")
        )
        const snapshot = await getDocs(postsQuery)
        if (cancelled) return
        setPosts(snapshot.docs.map((docSnapshot) => toCommunityPost(docSnapshot.id, docSnapshot.data())))
      } catch {
        if (!cancelled) {
          setUnavailable(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            커뮤니티
          </h1>
          <p className="text-gray-400 mt-2">공개된 게시글 모아보기</p>
          {!authLoading && user && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/community/post/new"
                className="inline-flex rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-400 transition-colors"
              >
                새 글쓰기
              </Link>
              <Link
                href="/community/saved"
                className="inline-flex rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors"
              >
                저장한 글
              </Link>
            </div>
          )}
        </div>

        {!authLoading && !user && (
          <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-gray-200">
            게시글을 작성하고 추천하려면{" "}
            <Link
              href="/login"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              로그인
            </Link>
            이 필요합니다.
          </div>
        )}

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-400">불러오는 중...</div>
          ) : unavailable ? (
            <div className="p-8 text-center text-gray-400">
              지금은 커뮤니티 게시글을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-gray-400">아직 게시글이 없습니다.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/post?id=${encodeURIComponent(post.id)}`}
                  className="block px-6 py-4 hover:bg-white/5 transition-colors"
                >
                  <p className="text-white font-medium">{post.title}</p>
                  {post.authorDisplayName && (
                    <p className="text-gray-400 text-sm mt-1">{post.authorDisplayName}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
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
                  {typeof post.upvoteCount === "number" && (
                    <p className="text-gray-500 text-xs mt-2">추천 {post.upvoteCount}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
