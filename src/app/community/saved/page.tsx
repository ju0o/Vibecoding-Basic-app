"use client"

import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { type BookmarkDocEntry, BookmarkSchema, toSavedPostItems } from "@/lib/bookmarks"
import { getFirestore } from "@/lib/firebase/client"
import { PostStatus, UserRole } from "@/lib/firebase/types"

interface SavedPostRow {
  bookmarkId: string
  postId: string
  title: string
  authorDisplayName: string | null
}

function isFirebaseConfigured(): boolean {
  return Boolean(process.env["NEXT_PUBLIC_FIREBASE_API_KEY"] && process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"])
}

function isMemberRole(role: string): boolean {
  return (
    role === UserRole.Member ||
    role === UserRole.TrustedMember ||
    role === UserRole.Moderator ||
    role === UserRole.Admin
  )
}

export default function SavedPostsPage() {
  const { user, loading: authLoading } = useAuth()
  const [rows, setRows] = useState<SavedPostRow[]>([])
  const [loading, setLoading] = useState(true)
  const [unavailable, setUnavailable] = useState(false)
  const [removingBookmarkId, setRemovingBookmarkId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const canView = user != null && isMemberRole(user.role)

  useEffect(() => {
    if (!user || !isMemberRole(user.role)) {
      setLoading(false)
      return
    }
    const uid = user.uid
    let cancelled = false

    async function loadSavedPosts() {
      setLoading(true)
      setUnavailable(false)
      setError(null)
      setRows([])
      if (!isFirebaseConfigured()) {
        setUnavailable(true)
        setLoading(false)
        return
      }

      try {
        const db = getFirestore()
        const snapshot = await getDocs(query(collection(db, "bookmarks"), where("uid", "==", uid)))
        if (cancelled) return
        const entries: BookmarkDocEntry[] = []
        for (const bookmarkSnapshot of snapshot.docs) {
          const parsed = BookmarkSchema.safeParse(bookmarkSnapshot.data())
          if (parsed.success) entries.push({ id: bookmarkSnapshot.id, data: parsed.data })
        }

        const settled = await Promise.all(
          toSavedPostItems(entries).map(async (item): Promise<SavedPostRow | null> => {
            try {
              const postSnapshot = await getDoc(doc(db, "posts", item.postId))
              if (cancelled || !postSnapshot.exists()) return null
              const data = postSnapshot.data()
              if (data["status"] !== PostStatus.Published) return null
              return {
                bookmarkId: item.bookmarkId,
                postId: item.postId,
                title: typeof data["title"] === "string" ? data["title"] : "(제목 없음)",
                authorDisplayName:
                  typeof data["authorDisplayName"] === "string" ? data["authorDisplayName"] : null,
              }
            } catch {
              return null
            }
          }),
        )
        if (!cancelled) setRows(settled.filter((row): row is SavedPostRow => row != null))
      } catch {
        if (!cancelled) setUnavailable(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadSavedPosts()
    return () => {
      cancelled = true
    }
  }, [user])

  async function removeBookmark(row: SavedPostRow) {
    setRemovingBookmarkId(row.bookmarkId)
    setError(null)
    try {
      await deleteDoc(doc(getFirestore(), "bookmarks", row.bookmarkId))
      setRows((current) => current.filter((item) => item.bookmarkId !== row.bookmarkId))
    } catch {
      setError("북마크 해제에 실패했습니다. 다시 시도해 주세요.")
    } finally {
      setRemovingBookmarkId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/community" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
          ← 커뮤니티 목록으로
        </Link>
        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">저장한 글</h1>
          <p className="text-gray-400 mt-2">내가 북마크한 게시글 모아보기</p>
        </div>

        {!authLoading && !user && (
          <div className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-gray-200">
            저장한 글을 보려면 <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">로그인</Link>이 필요합니다.
          </div>
        )}
        {!authLoading && user && !isMemberRole(user.role) && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400">북마크는 멤버 이상만 사용할 수 있습니다.</div>
        )}
        {error && <div role="alert" className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300">{error}</div>}

        {(authLoading || canView) && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {loading || authLoading ? (
              <div className="p-8 text-center text-gray-400">불러오는 중...</div>
            ) : unavailable ? (
              <div className="p-8 text-center text-gray-400">지금은 저장한 글을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</div>
            ) : rows.length === 0 ? (
              <div className="p-8 text-center text-gray-400">아직 저장한 게시글이 없습니다. 게시글에서 북마크 저장을 누르면 여기에 모입니다.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {rows.map((row) => (
                  <div key={row.bookmarkId} className="flex items-start justify-between gap-4 px-6 py-4">
                    <Link href={`/community/post?id=${encodeURIComponent(row.postId)}`} className="min-w-0 flex-1 hover:bg-white/5 rounded-lg -mx-2 px-2 py-2">
                      <p className="text-white font-medium">{row.title}</p>
                      {row.authorDisplayName && <p className="text-gray-400 text-sm mt-1">{row.authorDisplayName}</p>}
                    </Link>
                    <button type="button" onClick={() => removeBookmark(row)} disabled={removingBookmarkId === row.bookmarkId} className="shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50">
                      {removingBookmarkId === row.bookmarkId ? "해제 중..." : "북마크 해제"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
