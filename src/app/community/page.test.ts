import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"

const PAGE_SOURCE = fs.readFileSync(path.join(__dirname, "page.tsx"), "utf-8")

describe("community page copy", () => {
  it("renders clean, natural Korean copy for every user-facing string (no mojibake)", () => {
    const expectedStrings = [
      "커뮤니티",
      "공개된 게시글 모아보기",
      "새 글쓰기",
      "저장한 글",
      "게시글을 작성하고 추천하려면",
      "로그인",
      "이 필요합니다.",
      "불러오는 중...",
      "지금은 커뮤니티 게시글을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.",
      "아직 게시글이 없습니다.",
      "추천 ",
      "(제목 없음)",
    ]

    for (const expected of expectedStrings) {
      expect(
        PAGE_SOURCE.includes(expected),
        `expected community page copy to contain "${expected}"`
      ).toBe(true)
    }

    // Guard against the Unicode replacement character, a hallmark of mojibake
    // (text decoded with the wrong charset).
    expect(PAGE_SOURCE.includes("�")).toBe(false)
  })
})
