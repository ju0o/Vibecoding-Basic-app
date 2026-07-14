"use client"

import { useState } from "react"
import { AnimationShell } from "../core/AnimationShell"
import { BrowserPreview } from "../primitives/BrowserPreview"

type Layer = "html" | "css" | "js"

export function WebLayersExperience() {
  const [on, setOn] = useState<Record<Layer, boolean>>({ html: true, css: true, js: true })

  const title = on.html ? "나의 첫 바이브코딩" : "(구조 없음)"
  const message = on.html ? "안녕하세요" : ""
  const accent = on.css ? "#e8f1ff" : "#ffffff"
  const note = on.js ? "나는 AI와 함께 만들고 있다" : "(스크립트 꺼짐)"

  const body = (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="grid gap-2">
        <p className="text-sm font-bold">레이어를 켜고 끄면 미리보기가 바뀝니다</p>
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
