"use client"

import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, type Timestamp } from "firebase/firestore"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useAuth } from "@/contexts/AuthContext"
import PostEngagement from "@/features/community/PostEngagement"
import ReportButton from "@/features/community/ReportButton"
import { buildBookmarkId } from "@/lib/bookmarks"
import { getFirestore } from "@/lib/firebase/client"
import { PostStatus, TargetType, UserRole } from "@/lib/firebase/types"

interface CommunityPostDetail {
  id: string
  title: string
  bodyMarkdown: string
  authorDisplayName: string | null
  tags: string[]
  upvoteCount: number | null
  likeCount: number
  commentCount: number
  createdAt: Timestamp | null
}

function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env["NEXT_PUBLIC_FIREBASE_API_KEY"] && process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
  )
}

function isMemberRole(role: string): boolean {
  return (
    role === UserRole.Member ||
    role === UserRole.TrustedMember ||
    role === UserRole.Moderator ||
    role === UserRole.Admin
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
  const likeCount = typeof data["likeCount"] === "number" ? data["likeCount"] : (upvoteCount ?? 0)
  const commentCount = typeof data["commentCount"] === "number" ? data["commentCount"] : 0
  const createdAt = (data["createdAt"] ?? null) as Timestamp | null

  return {
    id,
    title,
    bodyMarkdown,
    authorDisplayName,
    tags,
    upvoteCount,
    likeCount,
    commentCount,
    createdAt,
  }
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
  const { user } = useAuth()
  const [post, setPost] = useState<CommunityPostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)
  const [bookmarkToggling, setBookmarkToggling] = useState(false)
  const [bookmarkError, setBookmarkError] = useState<string | null>(null)

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

  useEffect(() => {
    if (!post || !user || !isMemberRole(user.role) || !isFirebaseConfigured()) {
      setBookmarked(false)
      setBookmarkLoading(false)
      return
    }
    let cancelled = false
    setBookmarkLoading(true)
    setBookmarkError(null)
    const bookmarkId = buildBookmarkId(user.uid, TargetType.Post, post.id)
    getDoc(doc(getFirestore(), "bookmarks", bookmarkId))
      .then((snap) => {
        if (!cancelled) setBookmarked(snap.exists())
      })
      .catch(() => {
        if (!cancelled) setBookmarked(false)
      })
      .finally(() => {
        if (!cancelled) setBookmarkLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [post, user])

  async function toggleBookmark() {
    if (!post || !user) return
    if (!isMemberRole(user.role)) {
      setBookmarkError("북마크는 멤버 이상만 사용할 수 있습니다.")
      return
    }
    setBookmarkToggling(true)
    setBookmarkError(null)
    const bookmarkId = buildBookmarkId(user.uid, TargetType.Post, post.id)
    const ref = doc(getFirestore(), "bookmarks", bookmarkId)
    try {
      if (bookmarked) {
        await deleteDoc(ref)
        setBookmarked(false)
      } else {
        await setDoc(ref, {
          uid: user.uid,
          targetType: TargetType.Post,
          targetId: post.id,
          createdAt: serverTimestamp(),
        })
        setBookmarked(true)
      }
    } catch {
      setBookmarkError("북마크 처리에 실패했습니다. 다시 시도해 주세요.")
    } finally {
      setBookmarkToggling(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black px-4 py-12">
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
              <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6">
                {!user ? (
                  <Link
                    href="/login"
                    className="inline-flex w-fit rounded-lg border border-white/20 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition-colors"
                  >
                    로그인 후 북마크하기
                  </Link>
                ) : !isMemberRole(user.role) ? (
                  <p className="text-sm text-gray-400">북마크는 멤버 이상만 사용할 수 있습니다.</p>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={toggleBookmark}
                      disabled={bookmarkLoading || bookmarkToggling}
                      className="inline-flex w-fit rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      {bookmarkLoading
                        ? "확인 중..."
                        : bookmarkToggling
                          ? "처리 중..."
                          : bookmarked
                            ? "북마크 해제"
                            : "북마크 저장"}
                    </button>
                    {bookmarkError && <p className="text-sm text-red-300">{bookmarkError}</p>}
                  </>
                )}
              </div>
              <div className="mb-3">
                <ReportButton targetType="post" targetId={post.id} />
              </div>
              <PostEngagement postId={post.id} likeCount={post.likeCount} />
            </article>
          )}
        </div>
      </div>
    </div>
  )
}
