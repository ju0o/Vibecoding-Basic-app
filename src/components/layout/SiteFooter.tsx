import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
            <p className="text-base font-bold text-[var(--text-primary)]">AI Vibe Coding Master</p>
            <p>
              이 프로젝트는 비개발자도 AI와 개발의 원리를 쉽게 이해할 수 있도록, 개인적인 학습
              과정에서 정리한 자료를 비영리 목적으로 무료 공개한 프로젝트입니다.
            </p>
            <p>
              가능한 한 공식 문서를 기반으로 내용을 재구성하였으며, 일부 내용은 AI의 도움을 받아
              정리 및 구성되었습니다.
            </p>
            <p>
              항상 최신 정보와 정확성을 위해 노력하고 있지만, 오류가 있거나 개선이 필요한 내용이
              있을 수 있습니다. 잘못된 내용이나 더 좋은 자료, 새로운 정보, 오탈자, 개선 의견 등이
              있다면 언제든 알려주시면 함께 발전시켜 나가겠습니다.
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
            <p className="text-[var(--text-primary)]">감사합니다.</p>
          </div>

          <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <p className="font-bold text-[var(--text-primary)]">바로가기</p>
            <div className="flex flex-col gap-2">
              <Link className="hover:text-[var(--accent-primary)]" href="/about">
                프로젝트 소개
              </Link>
              <Link className="hover:text-[var(--accent-primary)]" href="/curriculum">
                커리큘럼
              </Link>
              <Link className="hover:text-[var(--accent-primary)]" href="/glossary">
                용어 사전
              </Link>
              <Link className="hover:text-[var(--accent-primary)]" href="/resources">
                공식 문서
              </Link>
              <Link className="hover:text-[var(--accent-primary)]" href="/privacy">
                개인정보 처리 안내
              </Link>
              <Link className="hover:text-[var(--accent-primary)]" href="/terms">
                이용 안내
              </Link>
              <Link className="hover:text-[var(--accent-primary)]" href="/license">
                라이선스·고지
              </Link>
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
