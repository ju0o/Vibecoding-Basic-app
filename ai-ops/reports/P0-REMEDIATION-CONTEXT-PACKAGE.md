# P0 Remediation Context Package

```yaml
package: P0-REMEDIATION-CONTEXT-PACKAGE
date: 2026-07-15
allow_implementation: next_session_only
allowlist_mode: exact paths below + practice/lesson/page/interaction ops listed
track_d: forbidden
```

## Operator

```text
REMEDIATE_P0_ONLY
PAUSE_TRACK_D
```

## Target nodes

### Practice (P0-1)

| Node | Slug | Lesson MD | Page | Practice (create/extend) |
|---|---|---|---|---|
| B05 | files-connect | `content/courses/vibe-coding-foundation/lessons/11-files-connect.md` | `src/app/learn/vibe-coding-foundation/files-connect/page.tsx` | `content/practice/vibe-coding-foundation/11-files-connect-practice.md` (exists stub) + full template |
| B06 | frontend | `…/12-frontend.md` | `…/frontend/page.tsx` | `content/practice/…/12-frontend-practice.md` |
| B07 | backend | `…/13-backend.md` | `…/backend/page.tsx` | `…/13-backend-practice.md` |
| B08 | api | `…/14-api.md` | `…/api/page.tsx` | `…/14-api-practice.md` |
| B09 | database | `…/15-database.md` | `…/database/page.tsx` | `…/15-database-practice.md` |
| C01 | good-ai-task-request | `…/16-good-ai-task-request.md` | `…/good-ai-task-request/page.tsx` | `…/16-good-ai-task-request-practice.md` |
| C02 | prompt-engineering | `…/17-prompt-engineering.md` | `…/prompt-engineering/page.tsx` | `…/17-prompt-engineering-practice.md` |
| C03 | context-engineering | `…/18-context-engineering.md` | `…/context-engineering/page.tsx` | `…/18-context-engineering-practice.md` |
| C04 | related-files-context | `…/19-related-files-context.md` | `…/related-files-context/page.tsx` | `…/19-related-files-context-practice.md` |

Sample reuse: `examples/day1-first-success` (do not replace).

### Quiz / Outcome (P0-2)

| Node | Page | Interactive | Implement |
|---|---|---|---|
| C05 | `…/task-breakdown/page.tsx` | `TaskBreakdownExperience` | Wire `NodeCheckpoint` (+ node questions) |
| C06 | `…/fix-loop/page.tsx` | `FixLoopExperience` | same |
| C07 | `…/qa-basics/page.tsx` | `QaChecklistExperience` | same |
| C08 | `…/ai-agent/page.tsx` | `AgentWorkflowExperience` | same + educational Agent claims |
| C09 | `…/subagent/page.tsx` | same shell | node-specific questions |
| C10 | `…/workflow/page.tsx` | same shell | node-specific questions |

Shared component (already exists):  
`src/features/learning-interactions/core/NodeCheckpoint.tsx`  
(Reference usage: B01–B04 pages after milestone.)

### Sources (P0-3)

All: `content/courses/vibe-coding-foundation/lessons/01-*.md` … `25-*.md`  
Priority domains: Node/npm, HTML/CSS/JS, HTTP/API, DB, Prompt/Context/Agent/SubAgent/Workflow.  
Audit: `ai-ops/reports/CURRICULUM-MILESTONE-A-C-SOURCE-AUDIT.md`  
Queue: `ai-ops/research-queue/RESEARCH_QUEUE.md` (pricing blocked)

### a11y (P0-4)

`src/features/learning-interactions/**`  
Especially `BrowserPreview` callers with `reducedMotion={false}`; `AnimationShell` aria-live.

### Browser smoke (P0-5)

Routes (no new Playwright install without Human Gate):

`/start` `/learn` `/lab` `/verification`  
+ all 25 foundation slugs listed in milestone handoff  
Evidence file (next session): e.g. `ai-ops/reports/P0-BROWSER-SMOKE.md`

### Studio honesty (P0-6)

- `ai-ops/curriculum/NODE_PRODUCTION_STATUS.md`  
- `ai-ops/reports/CURRICULUM-MILESTONE-A-C-MATRIX.md`  
- `ai-ops/curriculum/CURRICULUM_MASTER.csv` (+ xlsx if regenerated later)  
- Research Queue  

No false complete/◎.

## Agent routing (next session)

| Step | Agent |
|---|---|
| RP0-0/1 inventory | Main or atlas-explorer (read-only) |
| Practice MD | atlas-content-writer |
| Quiz data + page wire | atlas-implementer (allowlist pages + NodeCheckpoint only) |
| Sources | atlas-source-researcher → content-writer |
| a11y code | atlas-implementer |
| Smoke | Main / mechanical checklist |
| IR | atlas-independent-reviewer (≠ implementer) |
| STATE/Matrix | Main only |

## QA (RP0-9)

Minimum: lint · typecheck · unit tests · build/static export · practice validation · quiz checks · source sections · verified_at · reduced-motion audit · route smoke · research queue · STATUS/Matrix consistency · 21-concept / 14-section freeze.  
Record skip reason if blocked.

## IR (RP0-10)

| Track | Lens |
|---|---|
| A | beginner realism |
| B | concept accuracy |
| C | AI term overclaim |

Outcomes: approve | approve_with_notes | revise_required | blocked_by_source

## Done criteria (per P0 item)

| Item | Done |
|---|---|
| Practice | 6 fields present + executable action (not “read again”) |
| Quiz | node-specific UI + reasons + levels + teach-back |
| Sources | claimScope + date; no pricing as fact |
| a11y | no unjustified reducedMotion false; keyboard/focus notes |
| Smoke | checklist file with pass/fail per route |
| Studio | STATUS matches Matrix honesty |

## Forbidden paths (P0)

- `src/app/**` new Track D folders  
- Phase 1 protected atlas paths unless unrelated (do not touch)  
- Mass delete under `content/courses` or `exports/student` A01–A03 DOCX  

## First action next session

```text
RP0-0: git status + log; read NODE_QUALITY_GATE + MATRIX; confirm REMEDIATE_P0_ONLY; then RP0-1 file inventory only.
```
