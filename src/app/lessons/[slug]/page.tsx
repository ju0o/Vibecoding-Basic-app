import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BackToTopButton } from "@/components/lesson/BackToTopButton"
import { LessonMarkdown } from "@/components/lesson/LessonMarkdown"
import { LessonNavigationCards } from "@/components/lesson/LessonNavigationCards"
import { LessonSidebar } from "@/components/lesson/LessonSidebar"
import { ReadingProgressBar } from "@/components/lesson/ReadingProgressBar"
import { Badge } from "@/components/ui/Badge"
import { LessonCompleteButton } from "@/features/progress/LessonCompleteButton"
import { LessonVisitTracker } from "@/features/progress/LessonVisitTracker"
import {
  getLessonBySlug,
  getModuleById,
  getPreviousNextLessons,
  getRelatedLessons,
  getSortedLessonMeta,
} from "@/lib/lesson-content"

type LessonPageProps = {
  readonly params: Promise<{
    readonly slug: string
  }>
}

export function generateStaticParams() {
  return getSortedLessonMeta().map((lesson) => ({
    slug: lesson.slug,
  }))
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)

  if (lesson === undefined) {
    return {
      title: "강의를 찾을 수 없습니다",
    }
  }

  return {
    title: lesson.title,
    description: lesson.summary,
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params
  const lesson = getLessonBySlug(slug)

  if (lesson === undefined) {
    notFound()
  }

  const module = getModuleById(lesson.moduleId)
  const moduleTitle = module?.title ?? "커리큘럼"
  const { previous, next } = getPreviousNextLessons(slug)
  const relatedLessons = getRelatedLessons(slug)
  const referenceItems = lesson.sections.flatMap((section) => section.subheadings)

  return (
    <>
      <ReadingProgressBar />
      <LessonVisitTracker lessonSlug={lesson.slug} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <article className="min-w-0">
          <div className="mx-auto max-w-[78ch] rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">{moduleTitle}</Badge>
              <Badge>{lesson.level}</Badge>
              <Badge>{lesson.type === "reference" ? "Reference" : "Deep Dive"}</Badge>
              <Badge>{lesson.minutes}분</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[var(--text-primary)]">
              {lesson.title}
            </h1>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{lesson.summary}</p>
          </div>

          {lesson.type === "reference" && referenceItems.length > 0 ? (
            <div className="mx-auto mt-6 max-w-[78ch] rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5">
              <h2 className="text-lg font-extrabold text-[var(--text-primary)]">명령어 인덱스</h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {referenceItems.map((item) => (
                  <a
                    className="rounded-lg border border-[var(--border-subtle)] px-3 py-2 font-mono text-sm text-[var(--text-secondary)] transition hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                    href={`#${item.id}`}
                    key={item.id}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mx-auto mt-6 max-w-[78ch] space-y-6">
            {lesson.sections.map((section) => (
              <section
                className="scroll-mt-24 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8"
                id={section.id}
                key={section.id}
              >
                <h2 className="group text-2xl font-extrabold text-[var(--text-primary)]">
                  <a
                    aria-label={`${section.title} 섹션으로 이동`}
                    className="mr-2 opacity-0 transition group-hover:opacity-100"
                    href={`#${section.id}`}
                  >
                    #
                  </a>
                  {section.title}
                </h2>
                <div className="mt-4">
                  <LessonMarkdown content={section.content} />
                </div>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-[78ch] rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[var(--text-primary)]">읽음 표시</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  이 강의를 다 읽었다면 완료로 표시하세요. 진행률은 이 브라우저에만 저장됩니다.
                </p>
              </div>
              <LessonCompleteButton lessonSlug={lesson.slug} />
            </div>
          </div>

          {relatedLessons.length > 0 ? (
            <div className="mx-auto mt-6 max-w-[78ch] rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-6">
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">관련 강의</h2>
              <div className="mt-4 grid gap-3">
                {relatedLessons.map((relatedLesson) => (
                  <Link
                    className="rounded-lg border border-[var(--border-subtle)] p-3 transition hover:border-[var(--accent-primary)]"
                    href={`/lessons/${relatedLesson.slug}`}
                    key={relatedLesson.slug}
                  >
                    <span className="block font-bold text-[var(--text-primary)]">
                      {relatedLesson.title}
                    </span>
                    <span className="mt-1 block text-sm text-[var(--text-secondary)]">
                      {relatedLesson.summary}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <LessonNavigationCards
            currentModuleId={lesson.moduleId}
            next={next}
            previous={previous}
          />
        </article>

        <div className="mt-6 lg:mt-0">
          <LessonSidebar
            lesson={lesson}
            moduleTitle={moduleTitle}
            next={next}
            previous={previous}
          />
        </div>
      </div>
      <BackToTopButton />
    </>
  )
}
