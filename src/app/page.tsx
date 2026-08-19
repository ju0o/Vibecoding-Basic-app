import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"
import { GLOSSARY_TERMS } from "@/content/glossary"
import { RESOURCE_LINKS } from "@/content/resources"
import { DAY1_HREF } from "@/content/site-navigation"
import { LearningDashboard } from "@/features/progress/LearningDashboard"
import { getCurriculumModulesWithLessons, getSortedLessonMeta } from "@/lib/lesson-content"

export default function HomePage() {
  const modules = getCurriculumModulesWithLessons()
  const lessons = getSortedLessonMeta()

  return (
    <div className="bg-[var(--surface-primary)]">
      <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Badge variant="accent">구피티(GUPITI) 커뮤니티</Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-5xl">
            질문을 나누고, 함께 고치는 공부 모임
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            구피티(GUPITI)는 AI 학습을 함께하는 커뮤니티입니다. 궁금한 것을 묻고, 만든 결과를
            공유하세요.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryLink href="/community">커뮤니티</PrimaryLink>
            <PrimaryLink href="/materials" variant="secondary">
              자료실
            </PrimaryLink>
          </div>
        </div>
      </section>

      {/* Curriculum/lesson access, preserved per V1 scope (RECONCILIATION.md ADAPT: "preserve curriculum/lesson
          access") -- demoted from a second full-viewport hero to a normal content section so it supports the
          community identity above rather than competing with it (independent review finding: two <h1>s / two
          full-height hero sections back to back). */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
        <div>
          <Badge variant="accent">공개 학습 플랫폼</Badge>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-5xl">
            AI와 함께, 설명하며 만드는 법을 배웁니다
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            이 사이트는 비개발자가 Day 1부터 따라가는{" "}
            <strong className="text-[var(--text-primary)]">Learning Path</strong>입니다. 궁금한
            개념은 Atlas·도구·기술 자료에서 찾고, 자료는 출처와 함께 계속 고칩니다.
          </p>
          <ul className="mt-4 max-w-2xl space-y-1 text-sm leading-7 text-[var(--text-secondary)]">
            <li>
              <strong className="text-[var(--text-primary)]">무엇인가?</strong> AI·바이브코딩 공개
              학습 플랫폼
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">어디서 시작?</strong> 오늘부터 시작하기
              → Day 1
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">무엇을 할 수 있게?</strong>{" "}
              요청·실행·수정·오류 전달의 첫 루프
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryLink href="/start">오늘부터 시작하기</PrimaryLink>
            <PrimaryLink href="/learn" variant="secondary">
              학습 과정 보기
            </PrimaryLink>
            <PrimaryLink href="/atlas" variant="secondary">
              AI Engineering Atlas 탐색
            </PrimaryLink>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="모듈" value={`${modules.length}개`} />
            <StatCard label="연결된 강의" value={`${lessons.length}개`} />
            <StatCard label="검색 용어" value={`${GLOSSARY_TERMS.length}개`} />
            <StatCard label="공식 문서" value={`${RESOURCE_LINKS.length}개`} />
          </div>
        </div>
        <LearningDashboard lessons={lessons} />
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="text-sm font-bold text-[var(--accent-primary)]">Day 1 Interactive</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[var(--text-primary)]">
            요청하면 파일·터미널·미리보기가 변합니다
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
            교육용 시뮬레이션으로 흐름을 익히고, 같은 페이지에서 Sample Project로 실제 실행을
            이어갑니다. 텍스트 Stepper가 아닙니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryLink href={DAY1_HREF}>Day 1 인터랙티브 열기</PrimaryLink>
            <PrimaryLink href={`${DAY1_HREF}#practice`} variant="secondary">
              샘플 프로젝트 안내
            </PrimaryLink>
            <PrimaryLink href="/lab" variant="secondary">
              실습실
            </PrimaryLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">학습 방식</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <FeatureCard
            body="이론부터 길게 외우지 않습니다. 작은 성공 후 생긴 질문으로 원리를 붙입니다."
            title="경험 먼저"
          />
          <FeatureCard
            body="할 수 있는가(Outcome)로 완료를 봅니다. 페이지를 읽기만 한 것은 완료가 아닙니다."
            title="Outcome"
          />
          <FeatureCard
            body="공식 문서를 바탕으로 검증하고, 틀리면 함께 고칩니다. 완성된 진리 선언이 아닙니다."
            title="Living Verification"
          />
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[var(--accent-primary)]">전체 학습 경로</p>
              <h2 className="mt-2 text-3xl font-extrabold text-[var(--text-primary)]">
                Track으로 이어지는 Learning Path
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                기초 환경 → 개발 원리 → AI 도구 → 프로젝트 → 배포·보안. 지금 열린 노드는 Day
                1입니다.
              </p>
            </div>
            <PrimaryLink href="/learn" variant="secondary">
              /learn 열기
            </PrimaryLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">도구 · 기술 · Atlas</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 transition hover:border-[var(--accent-primary)]"
            href="/tools"
          >
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">AI 도구</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              검증 후 순차 공개. 지금은 안내 페이지만 있습니다.
            </p>
          </Link>
          <Link
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 transition hover:border-[var(--accent-primary)]"
            href="/technologies"
          >
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">기술 도감</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Node·npm·Git 등 개념. 대량 페이지 없이 후보만 안내합니다.
            </p>
          </Link>
          <Link
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 transition hover:border-[var(--accent-primary)]"
            href="/atlas"
          >
            <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
              AI Engineering Atlas
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              강의 중 궁금할 때 깊게 보는 Reference Layer입니다. 메인 Path를 대체하지 않습니다.
            </p>
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">함께 고치는 원칙</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            자료는 틀릴 수 있습니다. 공식 문서를 우선하고, 검증일을 남기며, 피드백으로 수정합니다.{" "}
            <Link
              className="font-semibold text-[var(--accent-primary)] underline"
              href="/verification"
            >
              출처와 검증
            </Link>
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[var(--accent-primary)]">
                전체 학습 지도 (기존)
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-[var(--text-primary)]">
                13개 모듈 · Textbook 강의
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Path와 별도로, 기존 100강 깊이를 탐색하려면 전체 학습 지도를 사용하세요.
              </p>
            </div>
            <PrimaryLink href="/curriculum" variant="secondary">
              커리큘럼에서 검색하기
            </PrimaryLink>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Link
                className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 transition hover:border-[var(--accent-primary)] active:translate-y-px"
                href={`/curriculum#${module.id}`}
                key={module.id}
              >
                <span className="text-xs font-bold text-[var(--text-tertiary)]">
                  {String(module.order).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-extrabold text-[var(--text-primary)]">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {module.description}
                </p>
                <span className="mt-4 inline-flex rounded-full bg-[var(--surface-secondary)] px-3 py-1 text-xs font-bold text-[var(--text-tertiary)]">
                  {module.lessons.length}개 강의
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            body="정의부터 한계까지 같은 순서로 따라가는 기존 Textbook 강의 형식입니다."
            title="심층 강의 형식"
          />
          <FeatureCard
            body="강의 완료와 북마크가 이 브라우저에 남아 이어집니다. 서버 계정은 없습니다."
            title="Continue Learning"
          />
          <FeatureCard
            body={`용어 ${GLOSSARY_TERMS.length}개와 공식 문서 ${RESOURCE_LINKS.length}개를 검색과 연결했습니다.`}
            title="용어와 공식 문서"
          />
        </div>
      </section>
    </div>
  )
}

function StatCard({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4">
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">{value}</p>
    </div>
  )
}

function FeatureCard({ body, title }: { readonly body: string; readonly title: string }) {
  return (
    <article className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5">
      <h3 className="text-xl font-extrabold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
    </article>
  )
}
