'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getPendingMembers, type UserData } from '@/lib/firebase/admin-service'
import { approveUser, rejectUser } from '@/lib/firebase/user-service'

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [pendingMembers, setPendingMembers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login')
        return
      }
      if (user.role !== 'admin') {
        router.push('/')
        return
      }
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user?.role === 'admin') {
      loadPendingMembers()
    }
  }, [user])

  const loadPendingMembers = async () => {
    setLoading(true)
    try {
      const members = await getPendingMembers()
      setPendingMembers(members)
    } catch (err: any) {
      setError(err.message || '가입 신청 목록을 불러오지 못했습니다')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (uid: string) => {
    if (!user) return
    setActionLoading(uid)
    setError(null)
    try {
      await approveUser(uid, user.uid)
      setPendingMembers((prev) => prev.filter((m) => m.uid !== uid))
    } catch (err: any) {
      setError(err.message || '승인에 실패했습니다')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (uid: string) => {
    if (!user) return
    const reason = prompt('거절 사유를 입력하세요 (선택):')
    if (reason === null) return // 취소

    setActionLoading(uid)
    setError(null)
    try {
      await rejectUser(uid, user.uid, reason || undefined)
      setPendingMembers((prev) => prev.filter((m) => m.uid !== uid))
    } catch (err: any) {
      setError(err.message || '거절에 실패했습니다')
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-gray-900 to-black">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-gray-900 to-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            관리자 대시보드
          </h1>
          <p className="text-gray-400 mt-2">가입 신청 관리</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        {/* Pending Members List */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              대기 중인 가입 신청 ({pendingMembers.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">불러오는 중...</div>
          ) : pendingMembers.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              대기 중인 가입 신청이 없습니다
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {pendingMembers.map((member) => (
                <div
                  key={member.uid}
                  className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {member.displayName}
                    </p>
                    <p className="text-gray-400 text-sm truncate">{member.email}</p>
                    {member.createdAt && (
                      <p className="text-gray-500 text-xs mt-1">
                        신청일: {member.createdAt.toDate().toLocaleDateString('ko-KR')}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleApprove(member.uid)}
                      disabled={actionLoading === member.uid}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => handleReject(member.uid)}
                      disabled={actionLoading === member.uid}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
