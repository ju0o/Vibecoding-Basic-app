import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import {
  FOOTER_NAV,
  isActiveNavPath,
  MOBILE_MORE_NAV,
  MOBILE_PRIMARY_NAV,
  type NavItem,
  PRIMARY_NAV,
} from "./site-navigation"

const APP_DIR = path.join(__dirname, "..", "app")

/** Resolves a static nav href (no dynamic segments) to its `src/app/**\/page.tsx` file. */
function pageFileForHref(href: string): string {
  const segment = href === "/" ? "" : href.slice(1)
  return path.join(APP_DIR, segment, "page.tsx")
}

function expectAllRoutesResolve(items: readonly NavItem[]) {
  for (const item of items) {
    expect(fs.existsSync(pageFileForHref(item.href)), `${item.href} should have a page.tsx`).toBe(
      true
    )
  }
}

describe("site-navigation", () => {
  it("leads with the community identity: five desktop primary items", () => {
    expect(PRIMARY_NAV).toHaveLength(5)
    expect(PRIMARY_NAV.map((i) => i.href)).toEqual([
      "/",
      "/community",
      "/materials",
      "/curriculum",
      "/glossary",
    ])
  })

  it("mobile primary leads with community identity, then start learn lab", () => {
    expect(MOBILE_PRIMARY_NAV.map((i) => i.href)).toEqual([
      "/community",
      "/materials",
      "/start",
      "/learn",
      "/lab",
    ])
    expect(MOBILE_MORE_NAV.some((i) => i.href === "/verification")).toBe(true)
  })

  it("community and materials are reachable off-desktop (mobile nav and footer), not desktop-only", () => {
    expect(MOBILE_PRIMARY_NAV.some((i) => i.href === "/community")).toBe(true)
    expect(MOBILE_PRIMARY_NAV.some((i) => i.href === "/materials")).toBe(true)
    expect(FOOTER_NAV.some((i) => i.href === "/community")).toBe(true)
    expect(FOOTER_NAV.some((i) => i.href === "/materials")).toBe(true)
  })

  it("marks learn nested day-1 active under /learn", () => {
    expect(isActiveNavPath("/learn/vibe-coding-foundation/day-1", "/learn")).toBe(true)
    expect(isActiveNavPath("/learn", "/learn")).toBe(true)
    expect(isActiveNavPath("/curriculum", "/learn")).toBe(false)
  })

  it("marks atlas studio under atlas", () => {
    expect(isActiveNavPath("/atlas/studio", "/atlas")).toBe(true)
  })

  it("every navigation route resolves to an existing page path", () => {
    expectAllRoutesResolve(PRIMARY_NAV)
    expectAllRoutesResolve(MOBILE_PRIMARY_NAV)
    expectAllRoutesResolve(MOBILE_MORE_NAV)
    expectAllRoutesResolve(FOOTER_NAV)
  })
})
