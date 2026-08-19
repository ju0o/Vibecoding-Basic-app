# SSOT — 구피티 Community & Education Material Archive (Product Rebase)

**Status:** OWNER-APPROVED PRODUCT PLAN (2026-08-19 overnight contract)
**SSOT role:** Single source of truth for the rebase of AI_VIBE_CODING_MASTER.
**Canonical refs:** `docs/product/PRODUCT_DEFINITION.md`, `docs/product/ROADMAP_V2.md`, `docs/community-platform/*`, `ai-ops/PRD-GOOPTI-PHASE1.md`.
**This document** supersedes conflicting scope in older docs (naming normalization; scope boundary below).
**Canonical repo baseline:** `company/gupiti-baseline` (from `symphony/AVM-COMMUNITY-003` + preserved assets).

---

## 1. Product Definition

**구피티 (GUPITI) 커뮤니티 / 모임** + **실제 강의/교육 자료 아카이브**.

The Owner has explicitly rebased AI_VIBE_CODING_MASTER from a primarily educational platform into
**a dedicated 구피티 community gathering website** where:

1. the website represents the 구피티 community / gathering itself,
2. materials actually used during 구피티 meetings/classes are archived and shared,
3. participants can revisit real session/cohort education materials,
4. community activity is a core product function,
5. useful existing Curriculum/Lesson/Learning functionality is preserved or adapted where it supports the community/archive product,
6. the site does NOT keep expanding as a generic broad AI-learning platform.

## 2. Problem

- A community exists (구피티) but has no durable online home that *is* the community.
- Meeting/class materials are scattered; participants cannot revisit them after a session.
- The existing platform is a broad one-way education site; it does not yet serve the community's
  gathering + archive function.

## 3. Target User

- 구피티 community members and participants (learners, mentors, organizers).
- People who attended real meetings/classes and need to revisit actual materials.

## 4. Core Value

- The site IS the community: a place to gather, share, and revisit what the community actually did.

## 5. Main Journey

1. Visit home → recognize 구피티 community/gathering identity.
2. Browse session/cohort/meeting structure → find a real session's materials.
3. Open an archived material (lesson/curriculum adapted) → read/revisit it.
4. Participate via community posts/comments (existing Auth + post/comment foundation).

## 6. Information Architecture (V1)

```
Home (/)
├─ 구피티 community identity + entry points
├─ Community (community feed / posts)      [reuse Auth + existing community foundation]
├─ Materials (education material archive)  [ADAPT: lessons/curriculum as archive]
│   ├─ /materials                      archive list (cohort/session/meeting structure)
│   └─ /materials/[slug]               material detail (reuse lesson rendering)
├─ Lessons (/lessons, /lessons/[slug])    [KEEP: existing curriculum/lesson]
├─ Curriculum (/curriculum)               [KEEP]
├─ Glossary / Atlas / Search              [KEEP]
└─ Login / Signup / Admin                 [reuse existing community auth/admin]
```

## 7. Community Scope (V1)

- Community identity on Home/navigation.
- Community feed: posts list + post detail (reuse Auth, Firestore types, user-service).
- Existing post/comment interaction preserved/adapted where already implemented or clearly compatible.
- Member roles from `PRD-GOOPTI-PHASE1` (guest | pending_member | member | admin) where compatible
  with existing `src/lib/firebase/types.ts`.

## 8. Education Archive Model (V1)

- A material archive that presents real meeting/session materials.
- Adapt existing 100-lesson curriculum (`src/content/curriculum.ts`, lesson markdown + frontmatter)
  into an archive list + detail, preserving the existing lesson rendering path.
- Add a lightweight session/cohort/meeting grouping layer **compatible with the existing frontmatter
  schema** (no destructive migration; additive fields only if needed).

## 9. Authentication / Permission Assumptions

- Reuse the existing Firebase Auth + user model foundation (`src/lib/firebase/*`).
- Guest = read public archive; member = post/comment; admin = approval/moderation.
- No new auth system, no credential changes.

## 10. Admin Scope (V1)

- Reuse the existing admin approval foundation (`src/app/admin/page.tsx`,
  `src/lib/firebase/admin-service.ts`, `src/lib/firebase/user-service.ts`) for materials/community
  moderation needs. No new admin subsystem.

## 11. V1 Scope (smallest coherent)

1. Community-oriented Home/navigation (구피티 identity).
2. Materials archive list + detail, reusing existing lesson content.
3. Community feed (posts) reusing existing Auth/Firestore foundation.
4. Information-architecture/navigation reconciliation.
5. Basic responsive UX for touched areas.
6. Tests/typecheck/build/QA for touched scope.

## 12. Non-goals (V1)

- Production deploy, credential changes, destructive migration, real data deletion, spending,
  payments, force push, history rewrite.
- Wholesale deletion of Atlas/Learning functionality.
- New major AI Tutor/Agent product features.
- Major branding/name decisions beyond the approved 구피티 identity.
- Architecture replacement.
- Management-seat construction (Supervisor/Site Manager) — separate follow-up work.
- Generic broad AI-learning platform expansion.

## 13. Future / Backlog

- Notifications, bookmarks, image uploads (Firebase Storage), moderation UX, member approval UI
  polish, cohort scheduling, richer session metadata, search of archived materials.

## 14. Roadmap (V1 lane)

1. **Discovery + SSOT** (this pack).
2. **Identity + navigation** (community Home/nav, materials + community entries).
3. **Materials archive** (list/detail reusing lessons).
4. **Community feed** (posts list/detail reusing Auth/Firestore).
5. **Reconciliation + responsive UX + tests/build QA** for touched scope.

See `docs/product/ROADMAP_V2.md` (6-week plan) for the extended lane; this SSOT governs the
overnight V1 scope.

## 15. State

- Product identity: **OWNER-APPROVED**.
- Product plan: **APPROVED for overnight V1 execution**.
- Ambiguous taste/Product decisions: **HUMAN_REQUIRED / BACKLOG** (not autonomous work).

## 16. Decision Log

| Date | Decision | Source |
|---|---|---|
| 2026-08-10 | Product Identity = community-first (B); V2 kept, V1 discontinued+backed up | `ai-ops/PRD-GOOPTI-PHASE1.md`, `STATE-GOOPTI.md` |
| 2026-08-12 | 구피티(Goopti) 6-week V1 product definition + roadmap | `docs/product/PRODUCT_DEFINITION.md`, `ROADMAP_V2.md` |
| 2026-08-19 | **Owner rebase decision:** dedicated 구피티 community gathering website + real meeting/education material archive; community = core function; stop generic platform expansion | Overnight contract |
| 2026-08-19 | **Naming normalized:** 구피티 / GUPITI (community identity) for the site | This SSOT |
| 2026-08-19 | V1 = community identity + navigation, materials archive (reuse lessons), community feed (reuse Auth/Firestore), IA reconciliation, responsive UX, tests/build QA | This SSOT |
| 2026-08-20 | **Independent review executed for the first time** on the V1 task set (identity-nav, materials-archive, community-feed, reconcile-qa) — every prior review attempt in Runtime evidence had crashed or escalated (`ESCALATION_REQUIRED`/`STALE`), so this content had been sitting on `company/gupiti-baseline` (commit `4dda128`) unreviewed. First-pass review verdict: `REVISION_REQUIRED` (1 Critical, 3 Major, 2 Minor). Critical: `/community` filtered Firestore on `status == "approved"`, a value `PostStatus` never produces (`published`/`hidden`/`deleted`) — the feed was silently, permanently empty. Also: `/community` and `/materials` unreachable on mobile (desktop-only `PRIMARY_NAV`); home page had two competing full-height hero `<h1>` sections; `sitemap.xml` missing the new routes. | HERMESS Live Company Dogfood Run 01 |
| 2026-08-20 | Fixed all 4 non-taste findings above (commit `0d8212d`); fresh independent review (different pass) verdict: `REVIEW_PASS`. typecheck clean, 53/53 tests, build succeeds, `/community` and `/materials` both render and are now mobile/footer-reachable. **Not fixed** (real scope gap, not a code bug): `/materials/[slug]` and `/community/[id]` detail pages and any post-creation UI do not exist, though SSOT §6 IA lists them as V1 scope — escalated to Owner Inbox as a `[DECISION]` rather than guessed at, since implementing them or explicitly descoping them is a product decision. | HERMESS Live Company Dogfood Run 01 |