# D-01 Content Format V2 Integration

- date: 2026-07-05
- executor: Codex
- status: completed
- phase: CODEX-PLAN Phase 0

## Changed Files

- `src/content/schema.ts`
- `src/content/curriculum.ts`
- `src/lib/lesson-content.ts`
- `src/lib/lesson-content.test.ts`
- `src/app/lessons/[slug]/page.tsx`
- `src/app/lesson-diagrams/[slug]/[file]/route.ts`
- `src/components/lesson/LessonMarkdown.tsx`
- `src/components/lesson/LessonSidebar.tsx`
- `src/components/lesson/LessonTableOfContents.tsx`
- `src/components/lesson/ReadingProgressBar.tsx`
- `src/components/lesson/BackToTopButton.tsx`
- `src/content/lessons/diagrams/.gitkeep`
- `src/app/globals.css`
- `src/features/progress/LessonChecklist.tsx` (removed)
- `src/features/progress/LessonPracticePanel.tsx` (removed)
- `package.json`
- `package-lock.json`

## Transition Rule

V2 sections are now the primary schema:

1. `definition`
2. `why`
3. `how-it-works`
4. `spec`
5. `primary-sources`
6. `in-practice`
7. `limits`
8. `further-reading`

Because all existing site lessons still use the V1 13-section body, `parseLessonMarkdown` uses a transition-period fallback:

- try V2 headings first
- if V2 is not complete, parse the legacy V1 headings
- TODO is recorded in code to remove fallback after R3 full V2 regeneration

This keeps `npm run verify` green while preventing new schema work from blocking on content regeneration.

## UX Self Check

| Check | Result | Notes |
|---|---|---|
| Long-form typography | PASS | Lesson body max width is constrained to `78ch`, with 1.78 line-height and stronger h3 hierarchy. |
| Quote blocks | PASS | Blockquote styling has left accent border, background, translation emphasis, and source-line sizing. |
| Highlight mark | PASS | `==...==` becomes `<mark>` outside fenced code blocks; dark/light CSS variables added. |
| Long-page navigation | PASS | Sidebar now includes section + h3 entries with scroll spy highlighting. |
| Reading progress | PASS | Fixed top progress bar added. |
| Back-to-top | PASS | Fixed button added for long lessons. |
| Diagrams | PASS | SVG route reads `src/content/lessons/diagrams/{slug}/{file}.svg`; figure/caption style added. |
| Reference lessons | PASS | `LessonMeta.type` supports `reference`; reference pages render a command index from h3 headings. |
| Mobile/dark mode readiness | PASS | CSS includes reduced margins for blockquotes and dark-mode variables for marks/quotes. |

Sample check targets:

- deep-dive sample: existing lesson route `/lessons/context-engineering-basics` using transition fallback.
- reference sample: platform branch for `lesson.type === "reference"` verified by typecheck/build; actual reference lessons will be produced in later waves.

## Validation

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS, 3 files / 7 tests
- `npm run build`: PASS, 21 static/dynamic routes generated
- `npm run verify`: PASS

## Notes

- `rehype-raw` was added so transformed `<mark>` tags render through ReactMarkdown.
- Existing V1 lesson markdown files were not edited.
- Pre-existing untracked Firebase files were not staged for this D-01 commit.

