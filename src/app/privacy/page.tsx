import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "개인정보 처리 안내",
  description: "AI Vibe Coding Master가 저장하는 데이터와 저장하지 않는 데이터에 대한 안내입니다.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold text-[var(--accent-primary)]">Privacy</p>
      <h1 className="mt-2 text-4xl font-extrabold text-[var(--text-primary)]">
        개인정보 처리 안내
      </h1>
      <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
        이 사이트는 무료 교육 자료입니다. 계정을 만들지 않으며, 학습 진행 정보는 기본적으로 사용자
        브라우저 안에만 남습니다.
      </p>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">1. 수집하지 않는 것</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>이름, 이메일, 전화번호 등 회원가입 정보 (가입 기능 없음)</li>
          <li>결제·결제 수단 정보 (유료 기능 없음)</li>
          <li>서버 측 사용자 계정 데이터베이스</li>
          <li>기본적으로 서버로 전송되는 학습 진도 로그</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
          2. 브라우저에 저장되는 것 (localStorage)
        </h2>
        <p>
          사이트는 학습 편의를 위해 브라우저{" "}
          <strong className="text-[var(--text-primary)]">localStorage</strong>에 다음 정보를 저장할
          수 있습니다.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>완료한 강의 목록</li>
          <li>북마크한 강의</li>
          <li>마지막으로 읽은 강의와 시각</li>
          <li>체크리스트 항목 상태(기능이 연결된 경우)</li>
          <li>테마(라이트/다크) 설정</li>
        </ul>
        <p>
          이 데이터는 사용자의 기기·브라우저에 남으며, 사이트 운영자가 다른 기기에서 이를 조회하는
          계정 서버는 없습니다. 브라우저 저장 데이터를 지우면 진행률도 함께 삭제됩니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">3. 호스팅·기술 로그</h2>
        <p>
          사이트가 Firebase Hosting 등 외부 호스팅에 배포된 경우, 호스팅 제공자가 일반적인 웹 서버
          접근 로그(IP, User-Agent, 요청 시각 등)를 처리할 수 있습니다. 그 처리 범위는 해당 제공자의
          정책에 따릅니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">4. 분석 도구</h2>
        <p>
          현재 사이트 코드에는 별도의 마케팅 분석 SDK(예: Google Analytics)를 기본 포함하지
          않습니다. 향후 익명 방문 통계를 추가할 경우 이 페이지를 갱신합니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-[var(--text-secondary)] leading-7">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">5. 문의</h2>
        <p>
          개인정보 관련 문의는 Instagram{" "}
          <a
            className="font-semibold text-[var(--accent-primary)] underline"
            href="https://www.instagram.com/ju0o___/"
            rel="noreferrer"
            target="_blank"
          >
            @ju0o___
          </a>
          로 DM 주세요.
        </p>
        <p>
          이용 조건은{" "}
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/terms">
            이용 안내
          </Link>
          를 참고하세요.
        </p>
      </section>
    </div>
  )
}
