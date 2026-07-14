"use client"

import { useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

type Mode = "memory" | "database"

/**
 * B09 — type a note; "refresh" clears memory mode but keeps database mode.
 */
export function DataStoreExperience() {
  const [mode, setMode] = useState<Mode>("memory")
  const [draft, setDraft] = useState("오늘 배운 것: API는 창구")
  const [memoryNote, setMemoryNote] = useState("")
  const [dbNote, setDbNote] = useState("")
  const [refreshCount, setRefreshCount] = useState(0)

  const shown = mode === "memory" ? memoryNote : dbNote

  const save = () => {
    if (mode === "memory") setMemoryNote(draft)
    else setDbNote(draft)
  }

  const simulateRefresh = () => {
    setRefreshCount((n) => n + 1)
    // memory wiped; database kept
    setMemoryNote("")
  }

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">
        저장 방식을 고르고 메모를 저장한 뒤, &quot;새로고침 시뮬레이션&quot;을 눌러 차이를 보세요.
      </p>
      <div className="flex flex-wrap gap-2">
        {(["memory", "database"] as Mode[]).map((m) => (
          <button
            className={`rounded-xl border px-3 py-2 text-sm font-extrabold ${
              mode === m ? "border-sky-500 bg-sky-500/15" : ""
            }`}
            key={m}
            onClick={() => setMode(m)}
            type="button"
          >
            {m === "memory" ? "브라우저 메모리만" : "Database(교육 모델)"}
          </button>
        ))}
      </div>
      <label className="grid gap-1 text-xs font-bold">
        메모 입력
        <input
          className="rounded-lg border bg-[var(--surface-primary)] px-3 py-2 text-sm font-normal"
          onChange={(e) => setDraft(e.target.value)}
          value={draft}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-extrabold"
          onClick={save}
          type="button"
        >
          저장
        </button>
        <button
          className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-extrabold"
          onClick={simulateRefresh}
          type="button"
        >
          새로고침 시뮬레이션
        </button>
      </div>
      <div className="rounded-xl border bg-[var(--surface-secondary)] p-3 text-sm">
        <p className="text-xs font-bold text-[var(--text-tertiary)]">
          현재 모드 표시 데이터 · 새로고침 횟수 {refreshCount}
        </p>
        <p className="mt-2 font-bold">{shown ? shown : "(비어 있음)"}</p>
        <p className="mt-2 text-xs text-[var(--text-secondary)]">
          {mode === "memory"
            ? "메모리 모드: 새로고침 시 저장된 값이 사라집니다."
            : "Database 모드: 새로고침 후에도 값이 남습니다 (교육 시뮬)."}
        </p>
        <p className="mt-1 text-xs text-[var(--text-tertiary)]">
          DB 쪽 보관 값(참고): {dbNote || "(아직 없음)"} · 메모리 쪽: {memoryNote || "(비움)"}
        </p>
      </div>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={`${mode} shown=${shown || "empty"} refresh=${refreshCount}`}
      controls={<span className="text-xs">특정 DB 제품 표준 아님 · 왜 저장소가 필요한지만</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 · 실제 DB 없음"
      statusLabel="data-store"
      title="저장소 필요성 시뮬레이터"
    />
  )
}
