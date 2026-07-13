# EV-1 — Phase 1 Forensic Audit

| Field | Value |
|---|---|
| Date | 2026-07-14 |
| HEAD | a6d4376 |
| Verdict | **CONTINUE** (no mass delete; rebase to 21/14) |

## File judgments

| Path | Verdict | Rationale |
|---|---|---|
| `src/content/atlas.ts` | **REBASE_TO_APPROVED_CONTRACT** | 12 nodes + 13 sections vs approved 21/14 |
| `src/content/atlas/chapters/*.md` (12) | **REBASE_TO_APPROVED_CONTRACT** | 13-heading placeholders; expand to 21×14 shells |
| `src/lib/atlas.ts` | **REUSE_WITH_SMALL_FIX** | Loader/prev-next reusable; section count 14; nodeId→conceptId |
| `src/lib/atlas-progress.ts` | **REUSE_WITH_SMALL_FIX** | Keep separate key; rename node→concept |
| `src/lib/atlas.test.ts` | **REBASE_TO_APPROVED_CONTRACT** | Assert 21/14 not 12/13 |
| `src/app/atlas/page.tsx` | **REUSE_WITH_SMALL_FIX** | Journey for 21 + 6 arcs + MR link |
| `src/app/atlas/layout.tsx` | **REUSE_AS_IS** | Boundary OK if progress not breaking lessons |
| `src/app/atlas/[nodeId]/page.tsx` | **REBASE_TO_APPROVED_CONTRACT** | Prefer `/atlas/concepts/[conceptId]` per PRD; keep redirect |
| `src/features/atlas/JourneyMap.tsx` | **REUSE_WITH_SMALL_FIX** | 21 nodes + Why Bridge list |
| `src/features/atlas/ChapterShell.tsx` | **REUSE_WITH_SMALL_FIX** | Client boundary: no lesson-content/fs; 14 sections |
| `src/features/atlas/AtlasProgressProvider.tsx` | **REUSE_WITH_SMALL_FIX** | Concept IDs; no lesson LearningState migration |
| `src/components/layout/SiteHeader.tsx` | **REUSE_WITH_SMALL_FIX** | Keep Atlas nav entry |
| `ai-ops/ATLAS-P1-PENDING.md` | **HOLD_FOR_LATER** | Legacy note |
| `ai-ops/reports/atlas-phase-1-impact-report.md` | **REUSE_AS_IS** | Historical impact SSOT |
| Model Routing `src/**/model-routing/**` | **REUSE_AS_IS** | Already shipped product; not Phase 1 |

## Findings

1. **12≠21, 13≠14** — core mismatch with Education Layer.
2. Client boundary risk: ChapterShell must not import server fs modules.
3. Separate atlas progress key avoids lesson migration (Human Gate avoided).
4. No DELETE_CANDIDATE requiring human — rebase in place.

## Decision

**CONTINUE → EV-2 / EV-3**
