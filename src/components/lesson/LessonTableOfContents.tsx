"use client"

import { useEffect, useMemo, useState } from "react"
import type { LessonSection } from "@/content/schema"

type LessonTableOfContentsProps = {
  readonly sections: readonly LessonSection[]
}

export function LessonTableOfContents({ sections }: LessonTableOfContentsProps) {
  const items = useMemo(
    () =>
      sections.flatMap((section) => [
        { id: section.id, title: section.title, depth: 2 },
        ...section.subheadings.map((subheading) => ({
          id: subheading.id,
          title: subheading.title,
          depth: 3,
        })),
      ]),
    [sections],
  )
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0]

        if (visibleEntry?.target.id !== undefined) {
          setActiveId(visibleEntry.target.id)
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="mt-5" aria-label="강의 목차">
      <p className="mb-2 text-xs font-bold text-[var(--text-tertiary)]">사이드바 목차</p>
      <div className="grid gap-1">
        {items.map((item) => {
          const active = item.id === activeId

          return (
            <a
              className={[
                "rounded-md px-2 py-1.5 text-sm transition",
                item.depth === 3 ? "ml-3 border-l border-[var(--border-subtle)] pl-3 text-xs" : "",
                active
                  ? "bg-[var(--accent-soft)] font-bold text-[var(--accent-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--accent-primary)]",
              ].join(" ")}
              href={`#${item.id}`}
              key={item.id}
            >
              {item.title}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
