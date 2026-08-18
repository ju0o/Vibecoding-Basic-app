# Current Product Map — AI_VIBE_CODING_MASTER (구피티 rebase baseline)

**Date:** 2026-08-19 (HERMESS Overnight Real Project Intake)
**Author:** HERMESS Company Runtime — real-project discovery
**Baseline ref:** `symphony/AVM-COMMUNITY-003` (`e856d8e`) + preserved working-tree assets on `company/gupiti-baseline`

---

## 1. Source-of-truth discovery (verified)

The product repository at `C:\Users\skkse\Desktop\Projects\Core\Master\ai_vibe_coding_master`
is a **hybrid workspace**. Its git HEAD lineage (`c0091b5`, branches `main`/`symphony/AVM-JT-003`,
`origin/main`) is the **Electron "VIBE STUDIO" class console** (v1.0.0..v3.0.0-beta.3).

The **actual web platform to rebase** is the **Next.js app "AI Vibe Coding Master"**, whose complete,
internally-consistent source lives on **`symphony/AVM-COMMUNITY-003`** (`e856d8e`, 256 commits) —
the only ref that is simultaneously:
- a complete Next.js platform (App Router, `src/app` 52+ routes),
- includes the merged community foundation (`AVM-COMMUNITY-001..003`),
- and is a linear history (root `caeee13`).

Additional uncommitted product/planning assets existed only in the **working tree** and the sibling
backup (`ai_vibe_coding_master_backup_20260809_220256`): `docs/community-platform/` (12 docs),
`docs/product/` (4 docs), `ai-ops/V3-*`, `CONCEPTS.md`, `INTERFACE_SPEC.md`, `TEAM_GLOSSARY.md`,
`storage.rules`, JT-003 frontmatter fragments, and a stash (`stash@{0}`) holding the frontmatter
migration. All preserved into the rebase baseline.

## 2. Feature classification

| Area | Files | Status |
|---|---|---|
| Curriculum (13 modules, 100 lessons) | `src/content/curriculum.ts`, `src/content/schema.ts` | **COMPLETE** |
| Lesson rendering | `src/app/lessons/[slug]`, `src/lib/lesson-content.ts`, `src/components/lesson/*` | **COMPLETE** |
| Learn paths (V2 foundation, ai-engineering-v2) | `src/app/learn/*` | **COMPLETE** (backup) / **PARTIAL** (repo root) |
| Atlas | `src/app/atlas/*`, `src/features/atlas/*`, `src/content/atlas.ts` | **COMPLETE** |
| Glossary (456) | `src/content/glossary.ts`, `/glossary` | **COMPLETE** |
| Search | `src/lib/search-index.ts`, `src/features/search/SiteSearch.tsx` | **COMPLETE** (static index) |
| Quiz / Learning interactions | `src/features/learning-interactions/*` | **COMPLETE** (backup) / **STUB** (repo root) |
| Model Routing | `/model-routing`, `src/features/model-routing/*` | **COMPLETE** |
| Progress / Bookmark | `src/features/progress/*`, localStorage | **PARTIAL** (local-only, V1 excludes account sync) |
| Community (posts/comments/likes) | planned only; `src/lib/firebase/types.ts` | **NOT IMPLEMENTED** (planned) |
| Authentication | `src/lib/firebase/client.ts` (wired), login/signup pages on AVM-COMMUNITY-001 | **PARTIAL** (env not configured) |
| Admin | `src/app/admin/page.tsx` (AVM-COMMUNITY-003) | **PARTIAL** (approval flow backend exists) |
| Firebase config | `firebase.json`, `firestore.rules`, `firestore.indexes.json`, `storage.rules` | **PARTIAL** (deny-all scaffolds; `.env.local` has no Firebase values) |
| V2 content (Track D, checkpoints) | `content/curriculum/nodes/D1-D8`, `track-c-checkpoints.ts` | **EXPERIMENTAL / PAUSED** |
| Electron VIBE STUDIO console | repo-root git-tracked codebase | **LEGACY / SEPARATE PRODUCT** |

## 3. Classification summary

- **COMPLETE:** Curriculum, Lesson, Atlas, Glossary, Search, Model Routing, Learning interactions (backup).
- **PARTIAL:** Progress (local-only), Authentication (wired client, unconfigured env), Admin (approval flow only).
- **LEGACY:** Electron VIBE STUDIO (separate console product; preserved, not part of the web rebase), stale `out/` export with missing-source pages.
- **CONFLICTING:** Naming (구피티 / Goopti / 엉피티) across docs; Cloud Functions vs Cloudflare Worker for image auth; full community-platform roadmap vs simplified GUPITI PRD.
- **EXPERIMENTAL:** Track D (paused), V3 ai-ops files, frontmatter migration in stash.
- **UNKNOWN:** Whether Firebase env/credentials are configured for a live project; actual Firestore deployment state.

## 4. Community planning assets (reused for SSOT)

- `docs/community-platform/00..12` — full PRD (56 FRs), IA, data model SSOT, security/moderation SSOT, 14 indexes, Phase 0-10 roadmap, GOOSE packets, 120 acceptance tests, D-001..D-026 decision log. **PLANNING_GO.**
- `ai-ops/PRD-GOOPTI-PHASE1.md` — simplified community-first MVP (roles guest|pending_member|member|admin; free board; bookmark; notifications; Firebase Storage WebP).
- `docs/product/PRODUCT_DEFINITION.md` + `ROADMAP_V2.md` — 구피티(Goopti) 6-week V1 (Learning Core + Community MVP + Polish).

## 5. Baseline decision

The rebase baseline = **`company/gupiti-baseline`** worktree at
`C:\Users\skkse\Desktop\Projects\Core\Master\ai_vibe_coding_master_gupiti`,
created from `symphony/AVM-COMMUNITY-003` plus all preserved working-tree assets.
The original repo working tree (Electron + untracked fragments) is left untouched as evidence.