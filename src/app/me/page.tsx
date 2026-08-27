"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { listMyNotifications } from "@/lib/community/notifications"

export default function MePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [items, setItems] = useState<Array<{ id: string; type?: string; targetId?: string }>>([])
  useEffect(() => {
    if (!loading && !user) router.replace("/login")
  }, [loading, router, user])
  useEffect(() => {
    if (user)
      void listMyNotifications(user.uid)
        .then(setItems)
        .catch(() => setItems([]))
  }, [user])
  if (loading || !user)
    return <main className="mx-auto max-w-3xl px-4 py-12">로그인 정보를 불러오는 중...</main>
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">내 활동</h1>
      <p className="mt-2 text-[var(--text-secondary)]">{user.displayName ?? user.email}</p>
      <h2 className="mt-8 text-xl font-semibold">읽지 않은 알림 ({items.length})</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-[var(--text-secondary)]">새 알림이 없습니다.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-lg border p-3">
              {item.type ?? "알림"} {item.targetId ?? ""}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
