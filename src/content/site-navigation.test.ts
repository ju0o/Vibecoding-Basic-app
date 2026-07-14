import { describe, expect, it } from "vitest"
import {
  isActiveNavPath,
  MOBILE_MORE_NAV,
  MOBILE_PRIMARY_NAV,
  PRIMARY_NAV,
} from "./site-navigation"

describe("site-navigation", () => {
  it("has seven desktop primary items", () => {
    expect(PRIMARY_NAV).toHaveLength(7)
    expect(PRIMARY_NAV.map((i) => i.href)).toEqual([
      "/start",
      "/learn",
      "/tools",
      "/technologies",
      "/lab",
      "/atlas",
      "/verification",
    ])
  })

  it("mobile primary is start learn lab", () => {
    expect(MOBILE_PRIMARY_NAV.map((i) => i.href)).toEqual(["/start", "/learn", "/lab"])
    expect(MOBILE_MORE_NAV.some((i) => i.href === "/verification")).toBe(true)
  })

  it("marks learn nested day-1 active under /learn", () => {
    expect(isActiveNavPath("/learn/vibe-coding-foundation/day-1", "/learn")).toBe(true)
    expect(isActiveNavPath("/learn", "/learn")).toBe(true)
    expect(isActiveNavPath("/curriculum", "/learn")).toBe(false)
  })

  it("marks atlas studio under atlas", () => {
    expect(isActiveNavPath("/atlas/studio", "/atlas")).toBe(true)
  })
})
