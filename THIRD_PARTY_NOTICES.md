# Third-Party Notices

AI Vibe Coding Master uses open-source software and web fonts. This file lists
direct dependencies and notable third-party assets relevant to distribution.

## Application dependencies (npm)

| Package | License (from package metadata) | Use |
|---|---|---|
| `next` | MIT | Web framework |
| `react` | MIT | UI library |
| `react-dom` | MIT | React DOM renderer |
| `react-markdown` | MIT | Markdown rendering |
| `rehype-raw` | MIT | Limited HTML in markdown |
| `zod` | MIT | Runtime validation |
| `@phosphor-icons/react` | MIT | Icons |
| `tailwindcss` / `@tailwindcss/postcss` | MIT | Styling (build-time) |
| `typescript` | Apache-2.0 | Type checking (dev) |
| `@biomejs/biome` | MIT OR Apache-2.0 | Lint/format (dev) |
| `vitest` | MIT | Tests (dev) |
| `@types/node`, `@types/react`, `@types/react-dom` | MIT (typings) | TypeScript types (dev) |

Full license texts are available in each package under `node_modules/<package>/`
after `npm install`, or on the package registry.

## Fonts

| Font | Delivery | License notes |
|---|---|---|
| **Noto Sans KR** | `next/font/google` | Google Fonts family; SIL Open Font License (OFL) terms as published by Google Fonts / upstream |
| **Geist Mono** | `next/font/google` | Vercel Geist family; OFL terms as published for Geist |

Font binary files may be subset/embedded by the Next.js font pipeline into the
static build (`out/_next/static/media/*.woff2`). Keep OFL attribution when
redistributing font files separately from this site.

## Icons

Phosphor Icons (`@phosphor-icons/react`) — MIT License. Copyright (c) Phosphor Icons contributors. See package LICENSE.

## Educational quotations

Lesson pages may include short quotations from official documentation and
specifications (for example MDN, RFCs, Git documentation, Next.js docs, MCP
specification, vendor guides). Those materials remain owned by their respective
copyright holders. This project:

- Links to the original URL
- Uses short excerpts for education (Citation Policy Mode B)
- Marks CC-BY-SA sources when applicable (for example MDN)

See `ai-ops/qa/CITATION-POLICY.md` and in-lesson “원문으로 읽기” / “더 읽기” sections.

## No endorsement

Use of third-party names, logos, or documentation titles does not imply
endorsement by those organizations.
