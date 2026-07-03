import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LessonMarkdown } from "@/components/lesson/LessonMarkdown"
import { LessonSidebar } from "@/components/lesson/LessonSidebar"
import { Badge } from "@/components/ui/Badge"
import { LessonChecklist } from "@/features/progress/LessonChecklist"
import { LessonPracticePanel } from "@/features/progress/LessonPracticePanel"
import {
  getLessonBySlug,
  getModuleById,
  getPreviousNextLessons,
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
      <article className="min-w-0">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{moduleTitle}</Badge>
            <Badge>{lesson.level}</Badge>
            <Badge>{lesson.minutes}분</Badge>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[var(--text-primary)]">
            {lesson.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{lesson.summary}</p>
        </div>

        <div className="mt-6 space-y-5">
          {lesson.sections.map((section) => (
            <section
              className="scroll-mt-24 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8"
              id={section.id}
              key={section.id}
            >
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
                {section.title}
              </h2>
              <div className="mt-4">
                <LessonMarkdown content={section.content} />
              </div>
              {section.id === "checklist" ? (
                <LessonChecklist items={lesson.checklist} lessonSlug={lesson.slug} />
              ) : null}
            </section>
          ))}
        </div>

        <LessonPracticePanel exercise={lesson.exercise} lessonSlug={lesson.slug} />
      </article>

      <div className="mt-6 lg:mt-0">
        <LessonSidebar lesson={lesson} moduleTitle={moduleTitle} next={next} previous={previous} />
      </div>
    </div>
  )
}
