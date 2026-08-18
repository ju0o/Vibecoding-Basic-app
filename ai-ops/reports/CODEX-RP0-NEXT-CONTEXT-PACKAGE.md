# Codex RP0 Next Context Package — Candidate

```yaml
package: CODEX-RP0-NEXT-CONTEXT-PACKAGE
status: candidate_for_operator_review
date: 2026-07-15
next_phase: RP0-1
goal: measure P0 scope without implementation
current_decision: READY_FOR_CODEX_RP0_SCOPE_REVIEW
track_d: forbidden
allow_write_paths: []
writer_authorized: false
implementer_authorized: false
source_verifier_authorized: false
reviewer_authorized: false
```

## Proposed RP0-1 boundary

RP0-1 should remain read-only. It may measure current files, compare them with the contracts, and propose later exact write units. It must not adopt, edit, stage, commit, restore, or delete the 13 `P0_PARTIAL_UNVERIFIED` files.

Recommended routing:

```text
repository-explorer / GPT-5.6 Luna / read-only
mechanical-auditor / GPT-5.4 Mini / read-only
Chief only for evidence conflicts
```

## Measurement units

| Area | Current files and status | Missing contract or evidence | Next Agent | Candidate future write allowlist, inactive | QA candidate |
|---|---|---|---|---|---|
| B05-B09 Practice | `content/practice/.../11-*` through `15-*`; nine-field set has six headings, B05 modified and B06-B09 untracked | executable simulation, lesson alignment, evidence quality, independent practice review | Terra Curriculum -> GPT-5.5 Practice Review -> Terra Writer -> Mini QA | exact `content/practice/vibe-coding-foundation/11-*-practice.md` through `15-*-practice.md` | six-field script, content review, sample/path check |
| C01-C04 Practice | `content/practice/.../16-*` through `19-*`; untracked, six headings present | educational-label accuracy, executable actions, evidence and misconception checks | Terra Curriculum -> GPT-5.5 Practice Review -> Terra Writer -> Mini QA | exact `content/practice/vibe-coding-foundation/16-*-practice.md` through `19-*-practice.md` | six-field script, claim-scope check, content review |
| C05-C10 Quiz / Outcome | untracked `track-c-checkpoints.ts` contains six question/outcome sets; pages not wired | page integration, reasons/teach-back validation, outcome evidence, keyboard/a11y | Terra Curriculum -> GPT-5.4 Implementer -> Mini QA -> GPT-5.5 Reviewer | checkpoint data file plus six exact page paths: `task-breakdown`, `fix-loop`, `qa-basics`, `ai-agent`, `subagent`, `workflow`; shared `NodeCheckpoint.tsx` only if separately justified | typecheck, unit tests, node-specific checks, page wiring search |
| Sources / Verification | 25 lessons; 15 source headings, 19 verified markers, 3 claim-scope markers | official/educational/blocked scope per claim, missing headings/dates, freshness | Luna Research -> Terra Source Verifier -> Terra Writer -> Mini link check | exact affected lesson MD files after RP0-1 identifies gaps; Research Queue/report paths separately | source-heading/date script, link check, claim verification |
| Accessibility | two tracked components plus untracked shared hook; no literal fixed false remains; aria-live exists | ownership adoption, runtime behavior, keyboard/focus/mobile evidence, regression QA | Luna Explorer -> GPT-5.4 Implementer -> Mini QA -> GPT-5.5 Reviewer | exact affected interaction files after audit; current candidate four files only, `AnimationShell.tsx` read unless justified | typecheck, unit tests, reduced-motion search, keyboard/manual notes |
| Browser Smoke | no current evidence report | route pass/fail evidence for hubs and 25 nodes | Script First -> Mini QA Investigator | `ai-ops/reports/P0-BROWSER-SMOKE.md` only | build/static output, route checklist, documented skips |
| Studio / Matrix | status, Matrix, CSV exist; Matrix says audit-with-remediation and 0 full complete | post-fix honesty and single-writer reconciliation | Mini Auditor -> Chief single writer | `NODE_PRODUCTION_STATUS.md`, Matrix, `CURRICULUM_MASTER.csv` only after implementation/review evidence | status vocabulary/count/date consistency |

## RP0-1 read paths

- `AGENTS.md`
- `ai-ops/STATE.md`
- P0 handoff and Context Package
- RP0 recovery audit and inventory
- Node Quality Gate and Matrix
- the 13 P0 partial/unverified working-tree files
- corresponding lessons, pages, shared primitives, status files, and existing scripts

## Forbidden paths and actions

- Track D and new learning nodes
- all P0 writes
- unrelated Hermes artifacts and generated workbook
- protected/frozen assets
- `git reset`, `clean`, `checkout`, `restore`, `stash`, `add`, `commit`, `rebase`, `merge`, `push`
- Writer, Implementer, Source Verifier, or Reviewer execution

## Required RP0-1 return schema

```yaml
status:
task_id:
files_read:
files_changed: []
findings:
contracts_missing:
candidate_write_units:
qa_candidates:
risks:
blocked:
recommended_next:
```

## Operator gate

```text
APPROVE_CODEX_RP0_SCOPE_MEASUREMENT
```

Approval must keep `allow_write_paths: []` and must not imply adoption of unknown-owner work.
