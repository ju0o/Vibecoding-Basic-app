"use client"

import type { FileNodeVisual } from "../core/animation-types"
import { StatusIndicator } from "./StatusIndicator"

type FileTreeAnimationProps = {
  readonly nodes: readonly FileNodeVisual[]
  readonly visibleCount: number
  readonly highlightId: string | null
  readonly reducedMotion: boolean
}

export function FileTreeAnimation({
  nodes,
  visibleCount,
  highlightId,
  reducedMotion,
}: FileTreeAnimationProps) {
  const shown = nodes.slice(0, visibleCount)
  return (
    <div className="grid h-full gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-[var(--text-primary)]">파일 트리</h3>
        <StatusIndicator
          label={visibleCount === 0 ? "비어 있음" : `${visibleCount}/${nodes.length}`}
          tone={visibleCount === 0 ? "idle" : visibleCount >= nodes.length ? "success" : "active"}
        />
      </div>
      <ul className="grid gap-1 font-mono text-xs">
        {shown.length === 0 ? (
          <li className="text-[var(--text-tertiary)]">
            파일이 아직 없습니다. 다음 단계로 생성하세요.
          </li>
        ) : (
          shown.map((node) => {
            const hi = highlightId === node.id
            return (
              <li
                className={[
                  "rounded-md border px-2 py-1.5",
                  hi
                    ? "border-sky-500 bg-sky-500/15 font-bold text-[var(--text-primary)]"
                    : "border-transparent bg-[var(--surface-primary)] text-[var(--text-secondary)]",
                  !reducedMotion && hi ? "ring-2 ring-sky-400/50" : "",
                ].join(" ")}
                key={node.id}
                style={{ paddingLeft: `${8 + node.depth * 12}px` }}
              >
                <span className="text-[var(--text-tertiary)]">
                  {node.kind === "folder" ? "📁 " : "📄 "}
                </span>
                {node.name}
                <span className="mt-0.5 block font-sans text-[10px] font-normal text-[var(--text-tertiary)]">
                  {node.role}
                </span>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}
