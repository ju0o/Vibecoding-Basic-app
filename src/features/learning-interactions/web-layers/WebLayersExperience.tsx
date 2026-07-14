"use client"

import { useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { BrowserPreview } from "../primitives/BrowserPreview"

type Layer = "html" | "css" | "js"

type WebLayersExperienceProps = {
  /** Node-specific focus so B01–B04 are not identical tasks */
  readonly focus?: "all" | Layer
  readonly taskHint?: string
}

export function WebLayersExperience({
  focus = "all",
  taskHint = "레이어를 켜고 끄면 미리보기가 바뀝니다",
}: WebLayersExperienceProps) {
  const initial: Record<Layer, boolean> =
    focus === "html"
      ? { html: true, css: false, js: false }
      : focus === "css"
        ? { html: true, css: true, js: false }
        : focus === "js"
          ? { html: true, css: true, js: true }
          : { html: true, css: true, js: true }
  const [on, setOn] = useState<Record<Layer, boolean>>(initial)

  const title = on.html ? "나의 첫 바이브코딩" : "(구조 없음)"
  const message = on.html ? "안녕하세요" : ""
  const accent = on.css ? "#e8f1ff" : "#ffffff"
  const note = on.js ? "나는 AI와 함께 만들고 있다" : "(스크립트 꺼짐)"

  const body = (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="grid gap-2">
        <p className="text-sm font-bold">{taskHint}</p>
        {focus !== "all" ? (
          <p className="text-xs text-[var(--text-tertiary)]">이 노드 초점: {focus.toUpperCase()}</p>
        ) : null}
        {(["html", "css", "js"] as Layer[]).map((layer) => (
          <label className="flex items-center gap-2 text-sm font-semibold" key={layer}>
            <input
              checked={on[layer]}
              onChange={() => setOn((s) => ({ ...s, [layer]: !s[layer] }))}
              type="checkbox"
            />
            {layer.toUpperCase()} —{" "}
            {layer === "html" ? "뼈대" : layer === "css" ? "스타일" : "동작/문구"}
          </label>
        ))}
      </div>
      <BrowserPreview
        active={on.html}
        preview={{ title, message, accent, showButton: false, note }}
        reducedMotion={false}
      />
    </div>
  )

  return (
    <AnimationShell
      ariaLive={`html ${on.html} css ${on.css} js ${on.js}`}
      controls={<span className="text-xs">토글이 Preview 상태와 연결됨</span>}
      desktop={body}
      mobile={body}
      simulationNotice="교육용 · Day1 샘플 레이어 모델"
      statusLabel="web-layers"
      title="HTML · CSS · JS 레이어 탐색"
    />
  )
}
