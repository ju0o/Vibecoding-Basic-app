import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "이용 안내",
  description: "AI Vibe Coding Master 무료 교육 자료 이용 조건과 면책 안내입니다.",
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold text-[var(--accent-primary)]">Terms</p>
      <h1 className="mt-2 text-4xl font-extrabold text-[var(--text-primary)]">이용 안내</h1>
      <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
        AI Vibe Coding Master는{" "}
        <strong className="text-[var(--text-primary)]">비영리 목적의 무료 교육 자료</strong>입니다.
        수익 창출을 위한 유료 코스가 아닙니다.
      </p>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">1. 목적</h2>
        <p>
          비개발자가 AI와 함께 개발의 원리(구조, 파일, 프론트엔드·백엔드, API, Git, 배포, 보안 등)를
          이해하기 쉽도록, 개인적인 학습 과정에서 정리한 자료를 무료로 공개합니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">2. 허용되는 이용</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>개인 학습 및 비영리 교육 목적의 열람</li>
          <li>출처를 밝힌 짧은 인용과 링크 공유</li>
          <li>오류·개선 의견 제안</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">3. 제한</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>교육 콘텐츠 전체 또는 상당 부분을 유료 상품으로 재판매하는 행위</li>
          <li>출처 표기 없이 자신의 독창 저작물인 것처럼 게시하는 행위</li>
          <li>타인의 권리를 침해하는 방식으로 자료를 재배포하는 행위</li>
        </ul>
        <p>
          소프트웨어와 콘텐츠의 상세 조건은 저장소의{" "}
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/license">
            라이선스 안내
          </Link>
          및 GitHub/저장소 루트 <code className="text-sm">LICENSE</code> 파일을 따릅니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">4. 정확성·면책</h2>
        <p>
          가능한 한 공식 문서를 바탕으로 재구성했으며, 일부 정리에 AI 도구의 도움을 받았습니다.
          그러나 오류가 있을 수 있고, 도구·문서 버전이 바뀔 수 있습니다. 본 자료는{" "}
          <strong className="text-[var(--text-primary)]">그대로의 상태(AS IS)</strong>로 제공되며,
          특정 목적 적합성이나 완전성을 보증하지 않습니다. 실제 제품·보안·법률 판단에는 공식 문서와
          전문가 검토를 병행하세요.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">5. 외부 링크</h2>
        <p>
          강의와 리소스 페이지는 제3자 공식 문서로 연결됩니다. 외부 사이트의 내용·가용성·정책에
          대해서는 해당 운영 주체가 책임집니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">6. 문의</h2>
        <p>
          오류 제보, 더 좋은 자료, 개선 의견은 Instagram{" "}
          <a
            className="font-semibold text-[var(--accent-primary)] underline"
            href="https://www.instagram.com/ju0o___/"
            rel="noreferrer"
            target="_blank"
          >
            @ju0o___
          </a>{" "}
          DM으로 언제든 환영합니다.
        </p>
      </section>
    </div>
  )
}
