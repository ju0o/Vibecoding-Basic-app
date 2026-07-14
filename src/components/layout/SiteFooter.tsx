import Link from "next/link"
import { FOOTER_NAV } from "@/content/site-navigation"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
            <p className="text-base font-bold text-[var(--text-primary)]">AI Vibe Coding Master</p>
            <p>
              비개발자가 Day 1부터 AI와 바이브코딩을 따라 배우며, 궁금할 때 Atlas·도구·기술 자료를
              참고하고, 출처와 함께 자료를 고쳐 나가는 공개 학습 플랫폼입니다.
            </p>
            <p>
              자료는 완성된 진리가 아닙니다. 공식 문서를 바탕으로 검증하고, 틀린 부분은{" "}
              <Link
                className="font-semibold text-[var(--accent-primary)] underline"
                href="/verification"
              >
                함께 고치기
              </Link>
              에서 제안할 수 있습니다.
            </p>
            <p>
              <span className="font-semibold text-[var(--text-primary)]">문의 및 정보 공유</span>
              <br />
              Instagram{" "}
              <a
                className="font-semibold text-[var(--accent-primary)] underline"
                href="https://www.instagram.com/ju0o___/"
                rel="noreferrer"
                target="_blank"
              >
                @ju0o___
              </a>
              <br />
              DM은 언제든 환영합니다.
            </p>
          </div>

          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <p className="font-bold text-[var(--text-primary)]">바로가기</p>
            <div className="flex flex-col gap-2">
              {FOOTER_NAV.map((item) => (
                <Link
                  className="hover:text-[var(--accent-primary)]"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="pt-2 text-xs text-[var(--text-tertiary)]">
              © {new Date().getFullYear()} AI Vibe Coding Master · 비영리 무료 교육 자료
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
