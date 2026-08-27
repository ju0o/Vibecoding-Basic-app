"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { createReport, type ReportReason } from "@/lib/community/reports"

export default function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "post" | "material"
  targetId: string
}) {
  const { user } = useAuth()
  const [sent, setSent] = useState(false)
  async function submit() {
    if (!user || sent) return
    const reason = window.prompt(
      "신고 사유(spam, abuse, illegal, copyright, wrong_info, other)",
      "other",
    ) as ReportReason | null
    if (!reason) return
    await createReport({ targetType, targetId, reporterUid: user.uid, reason })
    setSent(true)
  }
  if (!user) return null
  return (
    <button
      type="button"
      onClick={() => void submit()}
      className="text-sm text-[var(--text-tertiary)]"
    >
      {sent ? "신고 접수됨" : "신고"}
    </button>
  )
}
