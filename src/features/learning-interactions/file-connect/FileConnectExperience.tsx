"use client"

import { useMemo, useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { BrowserPreview } from "../primitives/BrowserPreview"

type LinkKey = "css" | "js"

/**
 * B05 — break/repair HTML→CSS/JS links; preview reflects load state.
 */
export function FileConnectExperience() {
  const [linked, setLinked] = useState<Record<LinkKey, boolean>>({ css: true, js: true })

  const htmlSnippet = useMemo(() => {
    const cssLine = linked.css
      ? '<link rel="stylesheet" href="./style.css" />'
      : "<!-- CSS 연결 끊김: href 오류 또는 삭제 -->"
    const jsLine = linked.js
      ? '<script src="./main.js"></script>'
      : "<!-- JS 연결 끊김: src 오류 또는 삭제 -->"
    return `<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>Day 1</title>
    ${cssLine}
  </head>
  <body>
    <h1 id="title">나의 첫 바이브코딩</h1>
    <p id="message">안녕하세요</p>
    ${jsLine}
  </body>
</html>`
  }, [linked])

  const title = "나의 첫 바이브코딩"
  const message = "안녕하세요"
  const accent = linked.css ? "#e8f1ff" : "#ffffff"
  const note = linked.js ? "나는 AI와 함께 만들고 있다" : "(main.js 미로드 — 추가 문구 없음)"

  const body = (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-3">
        <p className="text-sm font-bold text-[var(--text-primary)]">
          HTML이 CSS·JS를 불러오는 연결을 켜고 끄세요. 미리보기가 바뀝니다.
        </p>
        {(["css", "js"] as LinkKey[]).map((key) => (
          <button
            className={`rounded-xl border px-3 py-2 text-left text-sm font-bold ${
              linked[key]
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-rose-500/40 bg-rose-500/10"
            }`}
            key={key}
            onClick={() => setLinked((s) => ({ ...s, [key]: !s[key] }))}
            type="button"
          >
            {key === "css" ? "style.css 연결" : "main.js 연결"}:{" "}
            {linked[key] ? "연결됨" : "끊김"}
          </button>
        ))}
        <pre className="max-h-56 overflow-auto rounded-xl bg-[#0f172a] p-3 font-mono text-[11px] leading-5 text-slate-100">
          {htmlSnippet}
        </pre>
      </div>
      <BrowserPreview
        active
        preview={{ title, message, accent, showButton: false, note }}
        reducedMotion={false}
      />
    </div>
  )

  return (
    <AnimationShell
      ariaLive={`css ${linked.css} js ${linked.js}`}
      controls={<span className="text-xs">경로/참조가 끊기면 해당 레이어만 사라질 수 있습니다</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 · Day1 샘플 연결 모델"
      statusLabel="files-connect"
      title="파일 연결 시뮬레이터"
    />
  )
}
