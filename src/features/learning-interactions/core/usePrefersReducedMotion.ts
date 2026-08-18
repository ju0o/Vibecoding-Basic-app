"use client"

import { useEffect, useState } from "react"

/** Respect OS/browser prefers-reduced-motion unless user forces. */
export function usePrefersReducedMotion(forceReduced = false): boolean {
  const [prefers, setPrefers] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setPrefers(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  return forceReduced || prefers
}
