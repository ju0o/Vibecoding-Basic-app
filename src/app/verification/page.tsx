import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"

export const metadata: Metadata = {
  title: "출처와 검증",
  description:
    "이 사이트의 자료는 완성된 진리가 아닙니다. 공식 문서를 바탕으로 검증하고 함께 수정합니다.",
}

const STATUSES = [
  { label: "공식 문서 기반", hint: "공식 docs로 확인한 사실" },
  { label: "일부 교육적 해석 포함", hint: "학습용 비유·분류 · 표준 단정 아님" },
  { label: "최신 확인 필요", hint: "가격·모델·CLI 등 변동 가능" },
  { label: "초안", hint: "아직 학생 공개 전일 수 있음" },
  { label: "출처 부족", hint: "공개 보류 권장" },
  { label: "수정 검토 중", hint: "피드백 반영 작업 중" },
] as const

const SOURCE_ORDER = [
  "공식 문서",
  "공식 GitHub · Release",
  "표준 문서 (W3C, IETF 등)",
  "논문·기술 보고서",
  "공식 Engineering Blog",
  "커뮤니티 참고 (후보만 · 단독 확정 금지)",
] as const

export default function VerificationPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Badge variant="accent">함께 고치기</Badge>
      <h1 className="mt-4 text-4xl font-extrabold text-[var(--text-primary)]">출처와 검증</h1>
      <p className="mt-5 text-lg leading-8 text-[var(--text-secondary)]">
        이 사이트의 자료는 완성된 진리가 아닙니다. 공식 문서를 바탕으로 계속 검증하고, 틀리거나
        부족한 부분은 함께 수정합니다.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
          이 사이트가 자료를 만드는 방법
        </h2>
        <ol className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
          <li>1. 학생 질문</li>
          <li>2. 공식 문서 조사</li>
          <li>3. 주장 검증</li>
          <li>4. 교육자료 제작</li>
          <li>5. 독립 검토</li>
          <li>6. 공개</li>
          <li>7. 피드백</li>
          <li>8. 수정</li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">콘텐츠 상태</h2>
        <ul className="mt-4 grid gap-2">
          {STATUSES.map((s) => (
            <li
              className="rounded-lg border border-[var(--border-default)] px-4 py-3 text-sm"
              key={s.label}
            >
              <span className="font-bold text-[var(--text-primary)]">{s.label}</span>
              <span className="mt-0.5 block text-[var(--text-tertiary)]">{s.hint}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">출처 우선순위</h2>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
          {SOURCE_ORDER.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--border-default)] p-5">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">최근 검증일 예시</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Day 1 교육·설치 안내 출처 팩 확인일:{" "}
          <strong className="text-[var(--text-primary)]">2026-07-14</strong>
        </p>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          제품 가격, 지원 모델, 설치 방법, CLI 명령, API 지원, 배포 정책은 자주 바뀝니다. 공개
          전·설치 직전에 공식 문서를 다시 확인하세요.
        </p>
        <p className="mt-3 text-sm">
          <Link className="font-semibold text-[var(--accent-primary)] underline" href="/resources">
            공식 문서 모음
          </Link>
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">수정 제안</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
          지금은 회원·DB 폼이 없습니다. 잘못된 사실, 더 좋은 출처, 오탈자는 아래로 알려 주세요.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-secondary)]">
          <li>
            Instagram DM:{" "}
            <a
              className="font-semibold text-[var(--accent-primary)] underline"
              href="https://www.instagram.com/ju0o___/"
              rel="noreferrer"
              target="_blank"
            >
              @ju0o___
            </a>
          </li>
          <li>
            저장소에 이슈를 남길 수 있다면: 제목에 <code className="text-xs">[content]</code> 또는{" "}
            <code className="text-xs">[outdated]</code>, 본문에 페이지 경로·문제·가능하면 공식 URL
          </li>
        </ul>
        <p className="mt-3 text-xs text-[var(--text-tertiary)]">
          존재하지 않는 자동 폼은 표시하지 않습니다. GitHub Issue 템플릿은 저장소 공개 설정에 따라
          추가될 수 있습니다.
        </p>
      </section>
    </main>
  )
}
