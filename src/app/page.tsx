import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { PrimaryLink } from "@/components/ui/PrimaryLink"
import { GLOSSARY_TERMS } from "@/content/glossary"
import { RESOURCE_LINKS } from "@/content/resources"
import { LearningDashboard } from "@/features/progress/LearningDashboard"
import { getCurriculumModulesWithLessons, getSortedLessonMeta } from "@/lib/lesson-content"

export default function HomePage() {
  const modules = getCurriculumModulesWithLessons()
  const lessons = getSortedLessonMeta()

  return (
    <div className="bg-[var(--surface-primary)]">
      <section className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
        <div>
          <Badge variant="accent">AI Vibe Coding Master</Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-5xl">
            개발 기초부터 AI 시스템 설계까지, 설명할 수 있게 배우는 교재
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            순서대로 읽고, 용어를 찾아보고, 진행률을 남기며 웹 개발 기본기와 AI 엔지니어링 개념을
            하나의 학습 흐름으로 연결합니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryLink href="/curriculum">전체 커리큘럼 보기</PrimaryLink>
            <PrimaryLink href="/lessons/ai-vibe-coding-orientation" variant="secondary">
              첫 강의 시작
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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[var(--accent-primary)]">학습 순서</p>
              <h2 className="mt-2 text-3xl font-extrabold text-[var(--text-primary)]">
                13개 모듈을 한눈에 보고 들어가기
              </h2>
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
            title="8섹션 심층 강의"
            body="정의, 존재 이유, 작동 원리, 스펙, 원문 읽기, 실전 방식, 한계, 더 읽기를 같은 순서로 따라갑니다."
          />
          <FeatureCard
            title="진행률과 북마크 저장"
            body="강의 완료, 체크리스트, 북마크가 로컬 저장소에 남아 다음 방문에도 이어집니다."
          />
          <FeatureCard
            title="용어와 공식 문서 연결"
            body={`용어 ${GLOSSARY_TERMS.length}개와 공식 문서 ${RESOURCE_LINKS.length}개를 검색과 학습 흐름에 연결했습니다.`}
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
