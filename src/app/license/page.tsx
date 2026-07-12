import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "라이선스·고지",
  description: "AI Vibe Coding Master 소프트웨어·교육 콘텐츠 라이선스와 제3자 고지 안내입니다.",
}

export default function LicensePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold text-[var(--accent-primary)]">License</p>
      <h1 className="mt-2 text-4xl font-extrabold text-[var(--text-primary)]">라이선스·고지</h1>
      <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
        이 프로젝트는 웹 애플리케이션 코드와 교육 콘텐츠를 함께 담고 있습니다. 이용 조건은 저장소
        루트의 <code className="text-sm">LICENSE</code> 및{" "}
        <code className="text-sm">THIRD_PARTY_NOTICES.md</code>가 기준입니다.
      </p>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">소프트웨어</h2>
        <p>
          사이트 구현 코드(예: <code className="text-sm">src/app</code>,{" "}
          <code className="text-sm">src/components</code>, <code className="text-sm">src/lib</code>{" "}
          등)는 MIT License 조건으로 제공합니다. 상세 전문은 저장소{" "}
          <code className="text-sm">LICENSE</code> 파일을 참고하세요.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">교육 콘텐츠</h2>
        <p>
          강의 본문, 다이어그램, 용어 설명 등은{" "}
          <strong className="text-[var(--text-primary)]">개인 학습 및 비영리 교육 목적</strong>으로
          무료 이용할 수 있습니다. 유료 상품으로 전면 재판매하거나, 출처 없이 자신의 단독 저작물처럼
          게시하는 행위는 허용되지 않습니다. 짧은 인용 시 프로젝트명과 가능하면 원 페이지 링크를
          남겨 주세요.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">제3자·폰트·아이콘</h2>
        <p>
          Next.js, React, Phosphor Icons, Noto Sans KR, Geist Mono 등 오픈소스·웹 폰트 고지는{" "}
          <code className="text-sm">THIRD_PARTY_NOTICES.md</code>에 정리되어 있습니다. 강의 속 공식
          문서 인용은 각 출처 소유자에게 권리가 있으며, 교육 목적의 짧은 인용과 원문 링크를
          사용합니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">관련 안내</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link className="text-[var(--accent-primary)] underline" href="/terms">
              이용 안내
            </Link>
          </li>
          <li>
            <Link className="text-[var(--accent-primary)] underline" href="/privacy">
              개인정보 처리 안내
            </Link>
          </li>
          <li>
            <Link className="text-[var(--accent-primary)] underline" href="/about">
              프로젝트 소개
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
