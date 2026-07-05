# D-02 Callouts and Private Access Integration

- date: 2026-07-06
- executor: Codex
- status: completed
- phase: CODEX-PLAN platform increment

## Scope

- `CONTENT-FORMAT-V2.md` §3.5: render four callout block types.
- `READING-UX-BRIEF.md` §4.6: keep the private learning site out of search and protect production access.

## Changed Files

- `src/lib/lesson-content.ts`
- `src/lib/lesson-content.test.ts`
- `src/components/lesson/LessonMarkdown.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `middleware.ts`
- `public/robots.txt`

## Callout Rendering

Supported Markdown markers:

- `> [!EXAMPLE]`
- `> [!KEY]`
- `> [!WARNING]`
- `> [!TIP]`

Implementation notes:

- Markers are transformed only outside fenced code blocks.
- `ReactMarkdown` detects the marker inside blockquotes and renders the block as a semantic `aside`.
- Normal citation blockquotes keep the existing quote style.
- Light and dark mode variables were added for the four callout types.

## Private Access

- `public/robots.txt` blocks all crawlers with `Disallow: /`.
- root metadata sets `robots.index=false`, `robots.follow=false`, `nocache=true`, and Googlebot noindex/noimageindex.
- `middleware.ts` enables Basic Auth only in production.
- password is read from `SITE_PASSWORD`; no password value is hardcoded.
- optional username is `SITE_USERNAME`; default username is `ai-vibe`.
- production without `SITE_PASSWORD` fails closed with 503.
- authenticated page responses include `X-Robots-Tag: noindex, nofollow, noarchive`.

## Runtime Check

Temporary production server:

- command: `SITE_PASSWORD=test-pass npm run start -- -p 3010`
- unauthenticated `/`: `401 Unauthorized`, `WWW-Authenticate: Basic realm="AI Vibe Coding Master"`, `X-Robots-Tag: noindex, nofollow, noarchive`
- authenticated `/`: `200 OK`, `X-Robots-Tag: noindex, nofollow, noarchive`
- `/robots.txt`: `User-agent: *` and `Disallow: /`

## Validation

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test`: PASS, 3 files / 8 tests
- `npm run build`: PASS, 33 routes generated
- `npm run verify`: PASS

## Notes

- Existing lesson markdown was not edited.
- Existing untracked Firebase files were not staged for this D-02 commit.
