import type { Metadata } from "next"
import Link from "next/link"
import { PrimaryLink } from "@/components/ui/PrimaryLink"

export const metadata: Metadata = {
  title: "프로젝트 소개",
  description:
    "AI Vibe Coding Master를 만든 이유, 무료 공개의 이유, 원리 중심 교육의 이유를 소개합니다.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold text-[var(--accent-primary)]">About</p>
      <h1 className="mt-2 text-4xl font-extrabold text-[var(--text-primary)]">프로젝트 소개</h1>
      <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
        AI Vibe Coding Master는 비개발자가 AI와 함께 개발의 원리를 이해할 수 있도록, 개인적인 학습
        과정에서 정리한 자료를 비영리 목적으로 무료 공개한 교재형 사이트입니다.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <PrimaryLink href="/curriculum">커리큘럼 보기</PrimaryLink>
        <PrimaryLink href="/lessons/ai-vibe-coding-orientation" variant="secondary">
          첫 강의 시작
        </PrimaryLink>
      </div>

      <section className="mt-12 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">왜 만들었는가</h2>
        <p>
          AI 코딩 도구는 화면과 코드를 빠르게 만들어 주지만, “왜 이런 파일 구조가 생겼는지”,
          “프론트와 백엔드가 어떻게 연결되는지”, “배포와 보안에서 무엇을 확인해야 하는지”를 설명하지
          않으면 학습은 복붙으로 끝나기 쉽습니다. 이 프로젝트는 도구 사용법보다{" "}
          <strong className="text-[var(--text-primary)]">개발 구조와 판단 기준</strong>을 남기기
          위해 시작했습니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">왜 무료 공개하는가</h2>
        <p>
          혼자 공부하며 모은 노트와 정리본이, 비슷한 출발선에 있는 사람에게도 도움이 되기를
          바랍니다. 수익 상품이 아니라{" "}
          <strong className="text-[var(--text-primary)]">
            같이 공부하고 함께 고치는 공개 자료
          </strong>
          로 두기 위해 무료로 엽니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
          왜 원리 중심 교육인가
        </h2>
        <p>
          프롬프트 한 줄로 결과가 나와도, 결과가 맞는지 검증하려면 파일·HTTP·상태·Git·환경 변수 같은
          기본 언어가 필요합니다. 원리 중심 교육은 AI를 덜 쓰게 만드는 것이 아니라,{" "}
          <strong className="text-[var(--text-primary)]">AI 결과를 읽고 고칠 수 있게</strong>{" "}
          만듭니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
          왜 AI 시대에 필요한가
        </h2>
        <p>
          자동완성과 에이전트가 빨라질수록, 사람은 목표·제약·검증·설명 가능성을 붙잡는 역할이 더
          커집니다. 이 사이트는 그 역할을 연습할 수 있도록 개념, 원문 링크, 실전 패턴을 한 흐름으로
          연결합니다.
        </p>
      </section>

      <section className="mt-10 space-y-4 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
          왜 함께 개선하려고 하는가
        </h2>
        <p>
          공식 문서와 도구는 계속 바뀝니다. 혼자서는 모든 오류를 즉시 잡을 수 없습니다. 오탈자, 더
          좋은 설명, 새로운 정보, 잘못된 부분을 알려 주시면 자료를 같이 다듬어 가겠습니다. 문의는
          Instagram{" "}
          <a
            className="font-semibold text-[var(--accent-primary)] underline"
            href="https://www.instagram.com/ju0o___/"
            rel="noreferrer"
            target="_blank"
          >
            @ju0o___
          </a>
          로 보내 주세요.
        </p>
      </section>

      <section className="mt-10 space-y-3 leading-7 text-[var(--text-secondary)]">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">관련 페이지</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link className="text-[var(--accent-primary)] underline" href="/privacy">
              개인정보 처리 안내
            </Link>
          </li>
          <li>
            <Link className="text-[var(--accent-primary)] underline" href="/terms">
              이용 안내
            </Link>
          </li>
          <li>
            <Link className="text-[var(--accent-primary)] underline" href="/license">
              라이선스·고지
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
