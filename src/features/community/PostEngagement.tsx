"use client"

import { type FormEvent, useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { type Comment, createComment, listComments } from "@/lib/community/comments"
import { hasLike, toggleLike } from "@/lib/community/reactions"
import { TargetType, UserRole } from "@/lib/firebase/types"

function isMemberRole(role: string): boolean {
  return (
    role === UserRole.Member ||
    role === UserRole.TrustedMember ||
    role === UserRole.Moderator ||
    role === UserRole.Admin
  )
}

function formatCommentDate(createdAt: unknown): string | null {
  if (!createdAt || typeof (createdAt as { toDate?: unknown }).toDate !== "function") return null
  return (createdAt as { toDate: () => Date }).toDate().toLocaleDateString("ko-KR")
}

export default function PostEngagement({
  postId,
  likeCount,
}: {
  postId: string
  likeCount: number
}) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [body, setBody] = useState("")
  const [busy, setBusy] = useState(false)
  const [loadingComments, setLoadingComments] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoadingComments(true)
    void listComments(TargetType.Post, postId)
      .then((items) => {
        if (!cancelled) setComments(items)
      })
      .catch(() => {
        if (!cancelled) setError("댓글을 불러오지 못했습니다.")
      })
      .finally(() => {
        if (!cancelled) setLoadingComments(false)
      })
    return () => {
      cancelled = true
    }
  }, [postId])

  useEffect(() => {
    if (!user || !isMemberRole(user.role)) {
      setLiked(false)
      return
    }
    void hasLike(TargetType.Post, postId, user.uid)
      .then(setLiked)
      .catch(() => setLiked(false))
  }, [postId, user])

  async function handleLike() {
    if (!user || !isMemberRole(user.role) || busy) return
    setBusy(true)
    setError(null)
    try {
      setLiked(await toggleLike(TargetType.Post, postId, user.uid, liked))
    } catch {
      setError("좋아요 처리에 실패했습니다.")
    } finally {
      setBusy(false)
    }
  }

  async function handleComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user || !isMemberRole(user.role) || !body.trim() || busy) return
    setBusy(true)
    setError(null)
    try {
      await createComment(TargetType.Post, postId, body, user.uid, user.displayName ?? user.email)
      setBody("")
      setComments(await listComments(TargetType.Post, postId))
    } catch {
      setError("댓글 작성에 실패했습니다.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-8 border-t border-white/10 pt-6" aria-label="게시글 반응과 댓글">
      <div className="flex items-center gap-3">
        {user && isMemberRole(user.role) ? (
          <button
            type="button"
            onClick={handleLike}
            disabled={busy}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-gray-200 hover:bg-white/10 disabled:opacity-50"
          >
            {liked ? "좋아요 취소" : "좋아요"} · {likeCount}
          </button>
        ) : (
          <span className="text-sm text-gray-400">좋아요 {likeCount}</span>
        )}
      </div>
      <h2 className="mt-6 text-lg font-semibold text-white">댓글 {comments.length}</h2>
      {loadingComments ? (
        <p className="mt-3 text-sm text-gray-400">댓글을 불러오는 중...</p>
      ) : comments.length === 0 ? (
        <p className="mt-3 text-sm text-gray-400">첫 댓글을 남겨보세요.</p>
      ) : (
        <div className="mt-3 space-y-3">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-gray-200">{comment.authorDisplayName ?? "회원"}</span>
                <span className="text-gray-500">{formatCommentDate(comment.createdAt)}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-gray-300">{comment.bodyMarkdown}</p>
            </article>
          ))}
        </div>
      )}
      {user && isMemberRole(user.role) && (
        <form onSubmit={handleComment} className="mt-4">
          <label className="sr-only" htmlFor="comment-body">
            댓글
          </label>
          <textarea
            id="comment-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={3}
            maxLength={5000}
            placeholder="댓글을 입력하세요"
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            disabled={busy || !body.trim()}
            className="mt-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-400 disabled:opacity-50"
          >
            댓글 작성
          </button>
        </form>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </section>
  )
}
