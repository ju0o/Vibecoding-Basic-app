"use client"

import { useEffect, useState } from "react"

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollableHeight <= 0 ? 0 : (scrollTop / scrollableHeight) * 100
      setProgress(Math.min(100, Math.max(0, nextProgress)))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)

    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 h-1 bg-[var(--accent-primary)] transition-[width] duration-150"
      style={{ width: `${progress}%` }}
    />
  )
}
