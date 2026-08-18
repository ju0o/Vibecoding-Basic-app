# Implementation Reconciliation — 구피티 rebase (KEEP / ADAPT / MIGRATE / REMOVE_LATER / DEPRECATED / UNKNOWN)

**Date:** 2026-08-19 (HERMESS Overnight Real Project Intake)
**Baseline:** `company/gupiti-baseline` (from `symphony/AVM-COMMUNITY-003` + preserved assets)

Machine-actionable work is generated ONLY from **ADAPT**, **MIGRATE**, and missing approved V1
requirements. **UNKNOWN** is not autonomous work.

---

## KEEP (preserve as-is in V1)

| Area | Evidence | Notes |
|---|---|---|
| Curriculum (13 modules / 100 lessons) | `src/content/curriculum.ts`, `src/content/schema.ts` | Reused by the materials archive. |
| Lesson rendering | `src/app/lessons/[slug]`, `src/lib/lesson-content.ts` | Reused by material detail. |
| Glossary (456 terms) | `src/content/glossary.ts`, `/glossary` | Keep. |
| Atlas | `src/app/atlas/*`, `src/features/atlas/*` | Keep (not part of V1 work, not removed). |
| Search (static index) | `src/lib/search-index.ts`, `src/features/search/SiteSearch.tsx` | Keep. |
| Model Routing | `/model-routing/*` | Keep. |
| Firebase client + types | `src/lib/firebase/client.ts`, `types.ts` | Reused by community feed. |
| Firebase Hosting static export | `next.config.ts` (`output: "export"`), `firebase.json` | Keep (D-001). |

## ADAPT (V1 machine-actionable work)

| Area | From | To | Work |
|---|---|---|---|
| Site navigation | `src/content/site-navigation.ts` (education-first) | Community-first nav | Reorder PRIMARY_NAV/FOOTER_NAV; lead with Home/Community/Materials; keep all destinations. |
| Header/Footer | `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx` | Render updated nav | Minimal edits only. |
| Home page | `src/app/page.tsx` (education hero) | 구피티 community identity + archive entry points | New community hero + entry points; preserve curriculum/lesson access. |
| Lesson content | `src/content/lessons/markdown/*`, `src/content/curriculum.ts` | Materials archive | New `/materials` list + `/materials/[slug]` detail reusing existing lesson renderer. |
| Auth foundation | `src/lib/firebase/user-service.ts`, login/signup | Community feed auth guards | Reuse as-is in community feed pages. |
| Community data types | `src/lib/firebase/types.ts` | Community posts feed | Reuse types for post feed/detail. |

## MIGRATE (deferred / structural, NOT overnight)

| Area | From | To | Notes |
|---|---|---|---|
| Progress/bookmark | localStorage | account-scoped Firestore | Out of V1 (D-013); backlog. |
| Frontmatter content layer | `stash@{0}` / untracked fragments | tracked `src/content/lesson-frontmatter.ts` + 100 lesson files | JT-003 migration; NOT overnight scope (would touch all 100 lessons). |
| Electron VIBE STUDIO console | repo-root tracked code | separate product/lifecycle | Not part of web rebase; preserved. |

## REMOVE_LATER (do not remove now)

| Area | Notes |
|---|---|
| Stale `out/` static export with missing-source pages (admin/login/signup/AuthProvider) | Rebuild will regenerate; do not delete evidence. |
| Legacy/unused V3 ai-ops files (719 ARCHIVE class) | Preserved; cleanup is a documented backlog, not autonomous. |

## DEPRECATED

| Area | Notes |
|---|---|
| `src/features/learning-interactions/checkpoints/track-c-checkpoints.ts` (`data_unwired`) | Deprecated by prior state; not touched. |
| `PasswordGate.tsx` (dead code) | Deprecated; not touched. |

## UNKNOWN (NOT autonomous work)

| Area | Notes |
|---|---|
| Firebase project env/credentials state | `.env.local` lacks Firebase values; build-time degradation path must not crash. |
| Live Firestore deployment/rules state | No evidence of deployment; rules are deny-all scaffolds. |
| Cohort/session real-world data model | No real session records exist yet; lightweight additive grouping only, marked compatible with existing frontmatter. |

## Approved V1 task surface (machine-actionable this run)

1. **identity-nav** — community identity + navigation rebase (Home, site nav, header/footer).
2. **materials-archive** — materials list + detail reusing lessons/curriculum.
3. **community-feed** — posts list + detail reusing Auth/Firestore.
4. **reconcile-qa** — IA reconciliation, responsive polish, tests + typecheck + build QA for touched scope.