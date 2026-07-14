"use client"

import { ArrowLeft, ArrowRight, MapTrifold } from "@phosphor-icons/react"
import Link from "next/link"
import { useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Badge } from "@/components/ui/Badge"
import type { AtlasConcept } from "@/content/atlas"
import type { LessonMeta } from "@/content/schema"
import { useAtlasProgress } from "@/features/atlas/AtlasProgressProvider"
import { ConceptQuiz } from "@/features/atlas/ConceptQuiz"
import { FoundationMiniDemo } from "@/features/atlas/FoundationMiniDemo"
import type { AtlasChapterSection } from "@/lib/atlas"

type ChapterShellProps = {
  readonly concept: AtlasConcept
  readonly totalConcepts: number
  readonly sections: readonly AtlasChapterSection[]
  readonly previous: AtlasConcept | undefined
  readonly next: AtlasConcept | undefined
  readonly deepenLessons: readonly LessonMeta[]
}

export function ChapterShell({
  concept,
  totalConcepts,
  sections,
  previous,
  next,
  deepenLessons,
}: ChapterShellProps) {
  const { ready, getConceptStatus, markRead, recordVisit, markTeachBack, progress } =
    useAtlasProgress()
  const status = ready ? getConceptStatus(concept.id) : "not-visited"
  const teachBackDone = progress.teachBackDone.includes(concept.id)

  useEffect(() => {
    recordVisit(concept.id)
  }, [concept.id, recordVisit])

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
          href="/atlas"
        >
          <MapTrifold size={16} weight="bold" />
          Roadmap
        </Link>
        <span className="flex items-center gap-3 text-sm font-bold text-[var(--text-tertiary)]">
          {process.env.NODE_ENV === "development" ? (
            <Link
              className="text-[var(--accent-primary)]"
              href={`/atlas/studio/concepts/${concept.id}`}
            >
              Open in Education Studio
            </Link>
          ) : null}
          {concept.order} / {totalConcepts} · {status}
        </span>
      </div>

      <header className="mt-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8">
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">
            {concept.order} · {concept.arc}
          </Badge>
          <Badge>{concept.stageLabel}</Badge>
          <Badge>{concept.status}</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl">
          {concept.title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-[var(--accent-primary)]">
          {concept.question}
        </p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
          {concept.shortDefinition}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoCard label="이전 한계" body={concept.limitationOfPrevious} />
          <InfoCard label="돌파구" body={concept.breakthrough} />
        </div>
        <p className="mt-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]">
          <span className="font-bold text-[var(--text-primary)]">Why Bridge: </span>
          {concept.whyBridge}
        </p>
        {concept.subordinateRoutes?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {concept.subordinateRoutes.map((route) => (
              <Link
                className="rounded-lg bg-[var(--accent-primary)] px-3 py-2 text-sm font-bold text-white"
                href={route.href}
                key={route.href}
              >
                {route.label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <section className="mt-6 rounded-xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Concept Passport</h2>
        <ul className="mt-3 grid gap-2 text-sm text-[var(--text-secondary)]">
          <li>
            <strong>선수:</strong> {previous?.title ?? "여정 시작"}
          </li>
          <li>
            <strong>다음:</strong> {next?.title ?? "여정 완료"}
          </li>
          <li>
            <strong>핵심 용어:</strong> {concept.glossaryTerms.join(", ") || "—"}
          </li>
          <li>
            <strong>Depth 강의:</strong>{" "}
            {deepenLessons.map((l) => l.title).join(", ") || concept.lessonSlugs.join(", ")}
          </li>
          <li>
            <strong>Evidence KB:</strong> {concept.kbIds.join(", ")}
          </li>
          <li>
            <strong>완료 상태:</strong> {status}
          </li>
        </ul>
      </section>

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <section
            className="scroll-mt-24 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-5 sm:p-8"
            id={section.id}
            key={section.id}
          >
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{section.title}</h2>
            {section.empty ? (
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">
                status=partial · 최소 shell. Textbook/KB 링크를 우선 사용하세요.
              </p>
            ) : null}
            <div className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              {section.id === "related-tech" ? (
                <RelatedTech
                  deepenLessons={deepenLessons}
                  glossaryTerms={concept.glossaryTerms}
                  kbIds={concept.kbIds}
                />
              ) : section.id === "next-tech" ? (
                <NextTech next={next} whyBridge={concept.whyBridge} />
              ) : section.id === "quiz" ? (
                <div className="grid gap-4">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                  <ConceptQuiz conceptId={concept.id} />
                  <ConceptCheckpoint conceptId={concept.id} onPass={() => markRead(concept.id)} />
                </div>
              ) : section.id === "animation" || section.id === "diagram" ? (
                <div className="grid gap-4">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                  {section.id === "animation" ? (
                    <FoundationMiniDemo conceptId={concept.id} />
                  ) : null}
                </div>
              ) : (
                <ReactMarkdown>{section.content}</ReactMarkdown>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-[var(--border-default)] p-5">
        <h2 className="text-lg font-extrabold text-[var(--text-primary)]">Teach-back</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          외부 AI 없이, 세 문장으로 정리해 보세요: 정의 · 이전 한계 · 다음이 필요한 이유. 서버로
          전송되지 않습니다.
        </p>
        <button
          className="mt-3 rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold"
          onClick={() => markTeachBack(concept.id)}
          type="button"
        >
          {teachBackDone ? "Teach-back 표시됨" : "Teach-back 완료로 표시"}
        </button>
      </section>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-bold text-white"
          onClick={() => markRead(concept.id)}
          type="button"
        >
          이 Concept 읽음으로 표시
        </button>
      </div>

      <nav className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[var(--border-subtle)] pt-6">
        {previous ? (
          <Link
            className="inline-flex items-center gap-1 text-sm font-bold text-[var(--text-secondary)]"
            href={`/atlas/concepts/${previous.id}`}
          >
            <ArrowLeft size={16} /> {previous.title}
          </Link>
        ) : (
          <Link className="text-sm font-bold text-[var(--text-secondary)]" href="/atlas">
            ← Roadmap
          </Link>
        )}
        {next ? (
          <Link
            className="inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-primary)]"
            href={`/atlas/concepts/${next.id}`}
          >
            {next.title} <ArrowRight size={16} />
          </Link>
        ) : (
          <Link className="text-sm font-bold text-[var(--accent-primary)]" href="/model-routing">
            Model Routing →
          </Link>
        )}
      </nav>
    </div>
  )
}

function InfoCard({ label, body }: { readonly label: string; readonly body: string }) {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-tertiary)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
    </div>
  )
}

function RelatedTech({
  deepenLessons,
  glossaryTerms,
  kbIds,
}: {
  readonly deepenLessons: readonly LessonMeta[]
  readonly glossaryTerms: readonly string[]
  readonly kbIds: readonly string[]
}) {
  return (
    <div className="grid gap-3">
      <p>
        <strong>Wiki 용어:</strong>{" "}
        {glossaryTerms.map((term) => (
          <Link className="mr-2 text-[var(--accent-primary)]" href="/glossary" key={term}>
            {term}
          </Link>
        ))}
      </p>
      <p>
        <strong>Textbook:</strong>
      </p>
      <ul className="list-disc pl-5">
        {deepenLessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link className="text-[var(--accent-primary)]" href={`/lessons/${lesson.slug}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-xs text-[var(--text-tertiary)]">Evidence KB ids: {kbIds.join(", ")}</p>
    </div>
  )
}

function NextTech({
  next,
  whyBridge,
}: {
  readonly next: AtlasConcept | undefined
  readonly whyBridge: string
}) {
  if (!next) {
    return <p>정본 21 Concept 여정의 끝입니다. Production 심화는 Textbook으로 이어가세요.</p>
  }
  return (
    <div className="grid gap-2">
      <p>{whyBridge}</p>
      <Link className="font-bold text-[var(--accent-primary)]" href={`/atlas/concepts/${next.id}`}>
        다음: {next.title} →
      </Link>
    </div>
  )
}

function ConceptCheckpoint({
  conceptId,
  onPass,
}: {
  readonly conceptId: string
  readonly onPass: () => void
}) {
  return (
    <div className="grid gap-2">
      <p>
        Checkpoint: 이 Concept가 이전 한계 중 무엇을 해결했는지 한 문장으로 말해 보세요. (점수 없음)
      </p>
      <button
        className="w-fit rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm font-bold"
        onClick={onPass}
        type="button"
      >
        Checkpoint 확인 ({conceptId})
      </button>
    </div>
  )
}
