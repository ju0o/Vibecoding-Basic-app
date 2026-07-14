"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"

type Method = "GET" | "POST"
type Path = "/" | "/style.css" | "/missing" | "/api/note"

const RESPONSES: Record<string, { status: number; body: string; note: string }> = {
  "GET|/": {
    status: 200,
    body: "<!DOCTYPE html>… index.html",
    note: "서버가 HTML 파일을 응답 (Day1 미니 서버 비유)",
  },
  "GET|/style.css": {
    status: 200,
    body: "body { … } /* CSS */",
    note: "정적 자산 요청 — 브라우저가 스타일 적용",
  },
  "GET|/missing": {
    status: 404,
    body: "Not found: /missing",
    note: "경로가 틀리면 실패 응답 — 연결/경로 점검 신호",
  },
  "POST|/api/note": {
    status: 201,
    body: '{ "ok": true, "saved": "메모 예시" }',
    note: "교육용 JSON API 비유 — 실제 Day1 샘플에는 없음",
  },
  "GET|/api/note": {
    status: 200,
    body: '{ "notes": [] }',
    note: "조회 요청 예시 (교육용)",
  },
  "POST|/": {
    status: 405,
    body: "Method not allowed (교육 시나리오)",
    note: "같은 경로라도 메서드가 다르면 거절될 수 있음",
  },
  "POST|/style.css": {
    status: 405,
    body: "Method not allowed",
    note: "정적 파일 경로에 POST는 보통 맞지 않음",
  },
  "POST|/missing": {
    status: 404,
    body: "Not found",
    note: "없는 경로",
  },
}

/**
 * B08 — pick method+path → status/body change (API educational model).
 */
export function RequestResponseExperience() {
  const [method, setMethod] = useState<Method>("GET")
  const [path, setPath] = useState<Path>("/")

  const key = `${method}|${path}`
  const res = useMemo(() => {
    return (
      RESPONSES[key] ?? {
        status: 400,
        body: "Unhandled combo",
        note: "조합을 바꿔 보세요",
      }
    )
  }, [key])

  const body = (
    <div className="grid gap-3">
      <p className="text-sm font-bold">요청(메서드·경로)을 고르면 응답이 바뀝니다.</p>
      <div className="flex flex-wrap gap-2">
        {(["GET", "POST"] as Method[]).map((m) => (
          <button
            className={`rounded-lg border px-3 py-2 text-xs font-extrabold ${
              method === m ? "border-sky-500 bg-sky-500/15" : ""
            }`}
            key={m}
            onClick={() => setMethod(m)}
            type="button"
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {(["/", "/style.css", "/missing", "/api/note"] as Path[]).map((p) => (
          <button
            className={`rounded-lg border px-3 py-2 font-mono text-xs font-bold ${
              path === p ? "border-violet-500 bg-violet-500/15" : ""
            }`}
            key={p}
            onClick={() => setPath(p)}
            type="button"
          >
            {p}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-[var(--surface-secondary)] p-3 font-mono text-xs">
        <p>
          → {method} {path}
        </p>
        <p className="mt-2 text-sm font-extrabold text-[var(--text-primary)]">
          ← {res.status}{" "}
          <span
            className={
              res.status < 400 ? "text-emerald-700 dark:text-emerald-300" : "text-rose-600"
            }
          >
            {res.status < 400 ? "성공 계열" : "실패/거절 계열"}
          </span>
        </p>
        <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-[#0f172a] p-2 text-slate-100">
          {res.body}
        </pre>
        <p className="mt-2 font-sans text-sm text-[var(--text-secondary)]">{res.note}</p>
      </div>
    </div>
  )

  return (
    <AnimationShell
      ariaLive={`${method} ${path} → ${res.status}`}
      controls={<span className="text-xs">API = 요청·응답 창구 (교육 모델)</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 · 실제 네트워크 호출 없음"
      statusLabel="api-rr"
      title="요청 · 응답 시뮬레이터"
    />
  )
}
