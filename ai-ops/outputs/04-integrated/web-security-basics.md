# P-05 Site Integration Report: web-security-basics

Date: 2026-07-06
Executor: Codex
Status: INTEGRATED

## Source Draft

- `ai-ops/outputs/02-drafts/web-security-basics/lesson.md`
- `ai-ops/outputs/02-drafts/web-security-basics/meta.md`
- `ai-ops/outputs/02-drafts/web-security-basics/terms.md`
- `ai-ops/outputs/02-drafts/web-security-basics/diagrams/web-security-boundary-map.svg`

## Integrated Files

- `src/content/lessons/markdown/web-security-basics.md`
- `src/content/lessons/diagrams/web-security-basics/web-security-boundary-map.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`
- `ai-ops/knowledge-base/entries/T07/web-security-basics.md`

## Content Integrity

Lesson markdown was copied without content edits.

| File pair | SHA256 |
|---|---|
| draft lesson / site lesson | `7F2C9D70460CF53003A3301307B462E1BFB0D6BD5C88CAC7C9969F7A3CF33E08` |
| draft diagram / site diagram | `A7A71580B83A78821F6F078499918D1A0B591D4651EB570CE3313B5F7F2370BF` |

## Metadata

- slug: `web-security-basics`
- moduleId: `web-basics`
- order: 8
- type: `deep-dive`
- level: `중급`
- minutes: 95
- tags: `Web Security`, `CORS`, `XSS`, `CSRF`, `CSP`
- order adjustment: none

## Glossary Added

- Same-Origin Policy
- Origin
- CORS
- Preflight Request
- XSS
- CSRF
- CSP

## KB Consumers

- lessons: `web-security-basics`
- glossary: `Same-Origin Policy`, `Origin`, `CORS`, `Preflight Request`, `XSS`, `CSRF`, `CSP`

## Checks

- `npm run lint`: PASS
- `npm run typecheck`: PASS

## Next

- P-06 build verification
