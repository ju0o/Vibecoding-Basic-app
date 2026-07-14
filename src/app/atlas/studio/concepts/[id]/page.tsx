import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { ATLAS_CONCEPTS } from "@/content/atlas"
import { StudioPreviewTabs } from "@/features/atlas-studio/StudioPreviewTabs"
import { getAtlasChapterSections } from "@/lib/atlas"
import { buildManifestEntry } from "@/lib/atlas/content-manifest"

type PageProps = {
  readonly params: Promise<{ readonly id: string }>
}

export function generateStaticParams() {
  return ATLAS_CONCEPTS.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const concept = ATLAS_CONCEPTS.find((c) => c.id === id)
  return {
    title: concept ? `Studio · ${concept.title}` : "Studio concept",
    robots: { index: false, follow: false },
  }
}

export default async function StudioConceptDetailPage({ params }: PageProps) {
  const { id } = await params
  const concept = ATLAS_CONCEPTS.find((c) => c.id === id)
  const sections = getAtlasChapterSections(id)
  if (!concept || !sections) {
    notFound()
  }
  const entry = buildManifestEntry(concept, sections)

  return (
    <main className="mx-auto grid max-w-3xl gap-8 px-4 py-10 sm:px-6">
      <header className="grid gap-2">
        <p className="text-xs font-bold text-[var(--text-tertiary)]">
          Operator Studio · {entry.order}/{ATLAS_CONCEPTS.length}
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">{entry.title}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{entry.shortDefinition}</p>
        <p className="text-sm text-[var(--text-secondary)]">
          status=<strong>{entry.overallStatus}</strong> · source=
          <strong>{entry.sourceStatus}</strong> · completeness=
          <strong>{entry.completeness.overallPercent}%</strong> · workflow (inferred)=
          <strong>{entry.workflowStage}</strong>
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-bold">
          <Link className="text-[var(--accent-primary)]" href="/atlas/studio">
            ← Studio home
          </Link>
          <Link className="text-[var(--accent-primary)]" href={entry.studentRoute}>
            학생 화면 보기
          </Link>
        </div>
      </header>

      <section className="rounded-xl border border-[var(--border-default)] p-4 text-sm">
        <h2 className="font-extrabold text-[var(--text-primary)]">기본 정보</h2>
        <ul className="mt-2 grid gap-1 text-[var(--text-secondary)]">
          <li>slug: {entry.slug}</li>
          <li>
            arc/stage: {entry.arc} / {entry.stageLabel}
          </li>
          <li>chapter path: {entry.chapterPath}</li>
          <li>previous: {entry.previousConceptId ?? "—"}</li>
          <li>next: {entry.nextConceptId ?? "—"}</li>
          <li>Why Bridge: {entry.whyBridgeText}</li>
        </ul>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">14섹션 상태</h2>
        <div className="overflow-x-auto rounded-lg border border-[var(--border-default)]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[var(--surface-secondary)]">
              <tr>
                <th className="px-3 py-2">섹션</th>
                <th className="px-3 py-2">상태</th>
                <th className="px-3 py-2">분량</th>
                <th className="px-3 py-2">학생 anchor</th>
              </tr>
            </thead>
            <tbody>
              {entry.sectionStatuses.map((section) => (
                <tr className="border-t border-[var(--border-subtle)]" key={section.id}>
                  <td className="px-3 py-2">{section.title}</td>
                  <td className="px-3 py-2 font-bold uppercase">{section.status}</td>
                  <td className="px-3 py-2 font-mono text-xs">{section.charCount} chars</td>
                  <td className="px-3 py-2">
                    <Link
                      className="text-[var(--accent-primary)]"
                      href={`${entry.studentRoute}#${section.id}`}
                    >
                      #{section.id}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">완성도 분해</h2>
        <p className="text-sm text-[var(--text-secondary)]">
          Overall {entry.completeness.overallPercent}% · weights: sections{" "}
          {entry.completeness.weights.sections}% / passport {entry.completeness.weights.passport}% /
          why {entry.completeness.weights.whyBridge}% / quiz {entry.completeness.weights.quiz}% /
          sources {entry.completeness.weights.sources}% / interactive{" "}
          {entry.completeness.weights.interactive}% / wikiKb {entry.completeness.weights.wikiKb}%
        </p>
        <ul className="grid gap-1 text-sm text-[var(--text-secondary)]">
          <li>
            Sections {entry.completeness.parts.sections.complete}/
            {entry.completeness.parts.sections.total} (score{" "}
            {entry.completeness.parts.sections.score})
          </li>
          <li>
            Passport {entry.completeness.parts.passport.present ? "present" : "missing"} (
            {entry.completeness.parts.passport.score})
          </li>
          <li>
            Why Bridge {entry.completeness.parts.whyBridge.present ? "present" : "missing"} (
            {entry.completeness.parts.whyBridge.score})
          </li>
          <li>
            Quiz {entry.completeness.parts.quiz.present ? "present" : "missing"} (
            {entry.completeness.parts.quiz.score})
          </li>
          <li>
            Sources kb={entry.completeness.parts.sources.kbCount} lessons=
            {entry.completeness.parts.sources.lessonCount} (score{" "}
            {entry.completeness.parts.sources.score})
          </li>
          <li>
            Interactive {entry.completeness.parts.interactive.present ? "present" : "missing"} (
            {entry.completeness.parts.interactive.score})
          </li>
        </ul>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">연결 자산</h2>
        <ul className="grid gap-1 text-sm text-[var(--text-secondary)]">
          <li>Passport: {entry.passport ? "yes" : "no"}</li>
          <li>Quiz ids: {entry.quizIds.join(", ") || "—"}</li>
          <li>Interactive: {entry.interactiveAssetIds.join(", ") || "—"}</li>
          <li>Wiki: {entry.wikiIds.join(", ") || "—"}</li>
          <li>KB: {entry.kbIds.join(", ") || "—"}</li>
          <li>
            Textbook:{" "}
            {entry.lessonSlugs.map((slug) => (
              <Link
                className="mr-2 text-[var(--accent-primary)]"
                href={`/lessons/${slug}`}
                key={slug}
              >
                {slug}
              </Link>
            ))}
          </li>
          {entry.subordinateRoutes.map((r) => (
            <li key={r.href}>
              Subordinate:{" "}
              <Link className="text-[var(--accent-primary)]" href={r.href}>
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3">
        <h2 className="text-xl font-extrabold text-[var(--text-primary)]">다음 작업 추천</h2>
        <ol className="grid gap-2">
          {entry.recommendations.map((task) => (
            <li
              className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm"
              key={`${task.priority}-${task.title}`}
            >
              <span className="font-bold">
                {task.priority}. {task.title}
              </span>
              <span className="block text-xs text-[var(--text-tertiary)]">
                {task.reason} · Recommended Agent: {task.recommendedAgent}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <StudioPreviewTabs
        rendered={
          <div className="grid gap-4">
            {sections.map((section) => (
              <article
                className="rounded-lg border border-[var(--border-subtle)] p-3"
                key={section.id}
              >
                <h3 className="font-extrabold text-[var(--text-primary)]">{section.title}</h3>
                <p className="text-xs font-bold uppercase text-[var(--text-tertiary)]">
                  {entry.sectionStatuses.find((s) => s.id === section.id)?.status}
                </p>
                <div className="prose prose-sm mt-2 max-w-none text-[var(--text-secondary)]">
                  <ReactMarkdown>{section.content || "_empty_"}</ReactMarkdown>
                </div>
              </article>
            ))}
          </div>
        }
        source={
          <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg bg-[var(--surface-secondary)] p-3 font-mono text-xs leading-5 text-[var(--text-secondary)]">
            {sections.map((s) => `## ${s.title}\n\n${s.content}\n`).join("\n")}
          </pre>
        }
      />
    </main>
  )
}
