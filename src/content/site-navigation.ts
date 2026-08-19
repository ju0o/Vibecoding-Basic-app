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
export const FOOTER_NAV: readonly NavItem[] = [
  { href: "/community", label: "커뮤니티" },
  { href: "/materials", label: "자료실" },
  { href: "/start", label: "시작하기" },
  { href: "/learn", label: "배우기" },
  { href: "/tools", label: "도구" },
  { href: "/technologies", label: "기술" },
  { href: "/lab", label: "실습" },
  { href: "/curriculum", label: "전체 학습 지도" },
  { href: "/glossary", label: "용어" },
  { href: "/resources", label: "공식 문서" },
  { href: "/about", label: "소개" },
  { href: "/verification", label: "출처와 검증" },
  { href: "/atlas", label: "Atlas" },
  { href: "/privacy", label: "개인정보 처리 안내" },
  { href: "/terms", label: "이용 안내" },
  { href: "/license", label: "라이선스·고지" },
] as const

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
