/** Learning Platform IA navigation (T3). Footer/more items stay out of top nav. */

export type NavItem = {
  readonly href: string
  readonly label: string
}

/** Desktop top-level navigation — leads with the 구피티(GUPITI) community identity */
export const PRIMARY_NAV: readonly NavItem[] = [
  { href: "/", label: "홈" },
  { href: "/community", label: "커뮤니티" },
  { href: "/materials", label: "자료실" },
  { href: "/curriculum", label: "전체 학습 지도" },
  { href: "/glossary", label: "용어" },
] as const

/** Mobile primary strip -- leads with the community identity, same as PRIMARY_NAV */
export const MOBILE_PRIMARY_NAV: readonly NavItem[] = [
  { href: "/community", label: "커뮤니티" },
  { href: "/materials", label: "자료실" },
  { href: "/start", label: "시작하기" },
  { href: "/learn", label: "배우기" },
  { href: "/lab", label: "실습" },
] as const

/** Mobile “더보기” second tier */
export const MOBILE_MORE_NAV: readonly NavItem[] = [
  { href: "/tools", label: "도구" },
  { href: "/technologies", label: "기술" },
  { href: "/atlas", label: "Atlas" },
  { href: "/verification", label: "함께 고치기" },
] as const

/** Footer / secondary discovery */
export type FooterNavGroup = {
  readonly label: string
  readonly items: readonly NavItem[]
}

/** Compact footer discovery, grouped by the way people use GUPITI. */
export const FOOTER_NAV_GROUPS: readonly FooterNavGroup[] = [
  {
    label: "Community",
    items: [
      { href: "/community", label: "Community home" },
      { href: "/community/post/new", label: "Share a post" },
      { href: "/community/saved", label: "Saved posts" },
    ],
  },
  {
    label: "Learn & make",
    items: [
      { href: "/start", label: "Start here" },
      { href: "/learn", label: "Learning paths" },
      { href: "/lab", label: "Practice lab" },
      { href: "/curriculum", label: "Curriculum" },
    ],
  },
  {
    label: "Explore",
    items: [
      { href: "/materials", label: "Community materials" },
      { href: "/resources", label: "Resources" },
      { href: "/tools", label: "Tools" },
      { href: "/technologies", label: "Technologies" },
      { href: "/glossary", label: "Glossary" },
      { href: "/atlas", label: "Atlas" },
      { href: "/verification", label: "Sources & verification" },
    ],
  },
  {
    label: "GUPITI",
    items: [
      { href: "/about", label: "About GUPITI" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/license", label: "License" },
    ],
  },
] as const

/** Flat compatibility view for consumers that still expect the old footer list. */
export const FOOTER_NAV: readonly NavItem[] = FOOTER_NAV_GROUPS.flatMap((group) => group.items)

export const DAY1_HREF = "/learn/vibe-coding-foundation/day-1" as const

export function isActiveNavPath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/"
  }
  if (href === "/learn") {
    return pathname === "/learn" || pathname.startsWith("/learn/")
  }
  if (href === "/atlas") {
    return pathname === "/atlas" || pathname.startsWith("/atlas/")
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
