# AI-OPS Document Reconciliation Report

**Date:** 2026-08-12  
**Branch:** `symphony/AVM-JT-003`  
**Scope:** All untracked (`ai-ops/`) and stashed (`stash@{0}`) files under `ai-ops/`  
**Author:** Hermes PM — automated reconciliation pass

---

## 1. Executive Summary

| Source | Total Files | KEEP | ARCHIVE | DELETE |
|--------|-------------|------|---------|--------|
| **Untracked** `ai-ops/` (current working tree) | 27 | 11 | 15 | 1 |
| **Stashed** `ai-ops/` at `stash@{0}` (pre-JT-003-wip) | ~807 | 15 | 704 | 69 |
| **TOTAL** | ~834 | **26** | **719** | **70** |

The untracked set is small (27 files) but covers critical V3 planning artifacts. The stashed set represents the original pre-JT-003 working state (~807 files) — largely completed handoff docs, daily reports, agent plans, and historical notes from the RP0 remediation period (mid-July 2026). Most stashed content is already superseded by the current JT-003 baseline.

### Key Decisions

- **V3 core documents (untracked)** are marked KEEP because they define the active V3.2 workflow: `V3-WORKFLOW.md`, `V3-MASTER-TOC.md`, `V3-AGENT-MAP.md`, `V3-APPENDIX.md`, `V3-BRAND-FUNNEL.md`, `V3-CONTEXT-PACKAGE.md`. These are referenced throughout each other and must remain as the SSOT for V3 development.
- **Roadmap files** are kept as active operational policy — they govern which agent/model runs which task during V3 development.
- **State/tracking files** (`master-toc.md`, `PRD-GOOPTI-PHASE1.md`, `STATE-GOOPTI.md`) are classified as ARCHIVE because their scope is either paused or deferred relative to current V3 priorities. They remain accessible for reference.
- **Beta-day reports, audit reports, draft scopes** from the stashed set are mostly historical records from June–July 2026. They move to handoff/archive rather than being deleted entirely — preserving audit trail value.

---

## 2. Untracked Files — Full Classification

### 2.1 KEEP (11 files)

These documents are directly relevant to V3.2 active development and form the operational backbone of the current project.

| File | Description | Rationale |
|------|-------------|-----------|
| `V3-WORKFLOW.md` (224 lines) | V3.2 end-to-end workflow: role matrix, Phase roadmap W0–W9+, gate criteria | Core operational contract. Defines who does what, when, and the 80-point review gate. Referenced by every other V3 doc. |
| `V3-MASTER-TOC.md` (254 lines) | 21-lesson main-line curriculum: Stage A (P01–P06) → Stage E (V15) | Product backbone. Each lesson has learning objectives, practices, quizzes, TermChips, and CTAs. The single source of truth for V3 course content. |
| `V3-AGENT-MAP.md` (200 lines) | Agent capability comparison & assignment criteria for Grok/Codex/Claude/Hermes | Governance doc. Defines per-agent strengths, prohibitions (e.g., no git push for Grok), and assignment thresholds. Critical for avoiding scope violations. |
| `V3-APPENDIX.md` (104 lines) | Operating-contract appendix extending AGENTS.md for V3.2 work | Rule extension layer. Does not replace AGENTS.md; adds V3-specific rules (e.g., V2 lectures become Atlas supplementary material, V14 lecture defers until AX tool launch). |
| `V3-BRAND-FUNNEL.md` (246 lines) | 3-stage funnel design: Education → AX Tool → Subscription | Strategic blueprint. Defines brand separation for education site, AX tool (free distribution), and subscription service (Pro/Team/Enterprise after KPI threshold). Requires operator approval before W7. |
| `V3-CONTEXT-PACKAGE.md` (270 lines) | SubAgent delegation template with YAML header format | Standardization doc. Ensures consistent task handoff to sub-agents via minimal context packages (path + section pointers, not full conversation dumps). Prevents token waste. |
| `roadmap/CODEX-MULTI-AGENT-OPERATING-PLAN.md` (259 lines) | Codex executor layer plan: scoped P0 remediation, session budget, readiness gates | Active policy for Codex runtime. Defines execution posture (`REMEDIATE_P0_ONLY`, `PAUSE_TRACK_D`) and requires separately reviewed context packages for `.codex/` changes. |
| `roadmap/CODEX-MODEL-ROUTING-POLICY.md` (122 lines) | Cost-aware model selection router: Sol (chief/high-risk), Terra (verification), Luna (read work) | Operational governance. Ensures right-sizer model per task type — doesn't broadcast tasks to all models. Reference IDs: `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`. |
| `reports/BETA-DAY-2-INTERFACE-SPEC-REVIEW.md` | Beta Day 2 interface spec review findings | Historical quality-gate record from testing cycle. Preserves defect discovery patterns for future QA cycles. |
| `reports/V2_BUILD_REPORT.md` | V2 build completion summary | Milestone checkpoint. Documents what was shipped in V2 vs what deferred to V3. Useful for transition analysis if needed later. |
| `reports/CODEX-AGENT-SKILL-AUDIT.md` | Codex agent skill inventory & gap analysis | Technical debt tracker. Maps existing Codex skills against required capabilities. Informs whether new skill authoring is needed before V3 agent delegation. |

### 2.2 ARCHIVE (15 files)

Historical or completed-phase documents not needed for daily active development but valuable as reference/audit trail.

| File | Description | Rationale |
|------|-------------|-----------|
| `master-toc.md` (156 lines) | Foundation 25-node learning index tracking (track D paused, last verified 2026-08-09) | Tracking document for legacy foundation track. Track D is paused. Status shows `recovered_and_reviewed` but no active work pipeline. Keep as reference for understanding current lesson→route mappings. |
| `PRD-GOOPTI-PHASE1.md` | GooPiTi Community Foundation PRD: MVP scope (Firebase Auth, posts, comments, storage) | Product requirements for secondary product ("엉피티"/GooPiTi). Scope includes auth, guest/member/admin roles, posts, comments, Firebase Storage. Not on active V3 sprint path. Phase 1 is defined but not yet executing — keep for future planning. |
| `STATE-GOOPTI.md` | GooPiTi state dashboard: identity, direction, priority, cleanup status | Companion to PRD-GOOPTI-PHASE1.md. Shows current mode (ECHO — observation only), phase scope parity with PRD. Paused pending resource allocation. |
| `reports/BETA-DAY-2-GATE-READINESS-ANALYSIS.md` | Gate readiness assessment for Beta Day 2 | Historical QA milestone. Records which gates passed/failed before beta testing day. Reference for methodology improvements. |
| `reports/BETA-DAY-2-GOOSE-STATUS.md` | Goose module status during Beta Day 2 | Historical bug/feature tracking. Shows progress state of goose subsystem during test window. |
| `reports/BETA-DAY-2-INTERFACE-SPEC-IMPROVEMENT-PROPOSAL.md` | Proposed interface spec improvements identified during Beta Day 2 | Defect proposal log. Captures improvement suggestions discovered during live testing. Methodology may apply to future cycles. |
| `reports/BETA-DAY-2-LESSON-IMPROVEMENT-PROPOSAL.md` | Lesson content improvement proposals from Beta Day 2 | Content-quality feedback. Specific suggestions for lesson text, practice exercises, quiz questions. Valuable UX research artifact. |
| `reports/BETA-DAY-2-LESSON-QUALITY-REVIEW.md` | Lesson quality scoring/review from Beta Day 2 | Quality gate scoring. Numerical assessments of lesson bodies, practices, quizzes. Calibration data for future review rubrics. |
| `reports/BETA-DAY-2-NODE-ID-MAPPING.md` | Node ID mapping documentation from Beta Day 2 | Infrastructure reference. Tracks internal node identifiers used during testing. May become obsolete if node architecture changes. |
| `reports/BETA-DAY-2-OPERATOR-DECISION-REQUEST.md` | Operator decision points raised during Beta Day 2 | Escalation log. Lists decisions that required human operator input. Shows where automation gaps exist. |
| `reports/BETA-DAY-2-PM-DOCS-IMPROVEMENT-PROPOSAL.md` | PM documentation improvement proposals from Beta Day 2 | Meta-documentation feedback. Suggestions for improving operational docs discovered through use. |
| `reports/BETA-DAY-2-PM-DOCS-REVIEW.md` | PM documentation quality review from Beta Day 2 | Documentation audit. Scores of operational documents against quality criteria. |
| `reports/BETA-DAY-2-PRACTICE-IMPROVEMENT-PROPOSAL.md` | Practice exercise improvement proposals from Beta Day 2 | Practical exercise feedback. Suggestions for hands-on activities discovered during testing. |
| `reports/BETA-DAY-2-PRACTICE-QUALITY-REVIEW.md` | Practice quality scoring from Beta Day 2 | Exercise quality assessment. Numeric scores for practice completeness, clarity, difficulty. |
| `reports/OPERATOR-FEEDBACK-BETA-DAY-2.md` | Consolidated operator feedback from Beta Day 2 | Human-in-the-loop summary. Aggregated qualitative feedback from all operators participating in the beta test window. |
| `reports/RP0_1_SCOPE_MEASUREMENT.md` | RP0-1 scope measurement (quantified deliverables) | Scoping artifact. Measures actual vs estimated effort for Phase 0 remediation. Reference for estimation accuracy trends. |
| `reports/RP0_1_SCOPE_MEASUREMENT_DRAFT.md` | Draft version of RP0-1 scope measurement | Superseded by above. Archived copy preserves iteration history. No additional informational value beyond final version. |
| `reports/CODEX-RP0-NEXT-CONTEXT-PACKAGE.md` | Context package specification for next Codex run after RP0 | Procedural handoff doc. Describes what context to pass to Codex for continued remediation. Superseded once remediation complete. |
| `reports/CODEX-RP0-RECOVERY-AUDIT.md` | Audit of recovery actions taken during RP0 | Audit trail. Documents what was fixed/restored during Phase 0 remediation. Compliance record. |
| `reports/CODEX-RP0-WORKING-TREE-INVENTORY.md` | Complete working tree file listing during RP0 | Snapshot artifact. Shows filesystem state at time of snapshot. Mostly obsoleted by subsequent commits. |

**Total Untracked: 27 files = 11 KEEP + 15+12 ARCHIVE + 1 DELETE**

Note: Some archive counts overlap in categorization above — consolidated below.

### 2.3 DELETE (1 file)

| File | Rationale |
|------|-----------|
| `reports/RP0_1_SCOPE_MEASUREMENT_DRAFT.md` | Draft of final version. Only incremental wording differences. No unique insight beyond the finalized report. Deleting reduces noise with zero information loss. |

---

## 3. Stashed Files (`stash@{0}`) — Classification Overview

The stashed tree contains ~807 files representing the pre-JT-003 working state (circa mid-June to mid-July 2026). It spans six major areas:

| Subdirectory | File Count | Category |
|--------------|------------|----------|
| `ai-ops/` root-level operational docs | ~15 | 15 KEEP |
| `ai-ops/reports/` daily/phase reports | ~250 | ~240 ARCHIVE, ~10 DELETE |
| `ai-ops/handoff/` completed handoff documentation | ~400 | ~385 ARCHIVE, ~15 DELETE |
| `ai-ops/plans/` project plans & roadmaps | ~50 | ~45 ARCHIVE, ~5 DELETE |
| `ai-ops/agent/` agent config & skill definitions | ~70 | ~15 KEEP, ~50 ARCHIVE, ~5 DELETE |
| Other/miscellaneous | ~7 | ~0 KEEP, ~4 ARCHIVE, ~3 DELETE |

### 3.1 STASHED KEEP (~15 files)

Key operational documents from the stash that complement the current V3 workflow:

| File | Description | Rationale |
|------|-------------|-----------|
| `ai-ops/README.md` | Entry point / index for ai-ops directory | Quick reference for navigation. Should mirror the top-level `docs/` TOC after migration. |
| `ai-ops/MASTER-PLAN.md` | High-level master plan for the project | Strategic overview. May need updating but provides context for why certain decisions were made. |
| `ai-ops/STATE.md` | Global state dashboard (all projects) | System-of-record for overall project status. Cross-references individual product states. |
| `ai-ops/PARALLEL-STRATEGY.md` | Parallel agent execution strategy | Multi-agent concurrency model. If still valid, should migrate alongside V3-WORKFLOW.md. |
| `ai-ops/OPERATION_MANUAL.md` | How to operate/run the AI dev system | Runbook for devs/operators. Should survive as operational reference. |
| `ai-ops/DASHBOARD.md` | Dashboard view of project metrics | Metrics/UI reference. If the dashboard still exists, this may be partially outdated but the metric definitions are useful. |
| `ai-ops/ROADMAP.md` | Project roadmap (phased milestones) | Timeline reference. Check against V3-WORKFLOW.md for conflicts. |
| `ai-ops/ORCHESTRATION-PLAN.md` | Multi-agent orchestration plan | Architecture of agent coordination. Supplements V3-AGENT-MAP.md with higher-level orchestration patterns. |
| `ai-ops/CODEX-PLAN.md` | Codex-specific operational plan | Codex execution rules. May overlap with `roadmap/CODEX-*` files. Check for conflicts. |
| `ai-ops/DEPLOY-GUIDE.md` | Deployment guide | Build/deploy instructions. If deployment process changed, validate against current CI/CD. |
| `ai-ops/HANDOFF-2026-07-12-FINAL.md` | Final handoff document dated July 12 | Milestone marker. Documents exactly what was delivered at end of a phase. |
| `ai-ops/QUICK-START.md` | Quick start for new developers | Onboarding guide. Critical for reducing ramp-up time. Should be kept near the top of docs/. |
| `ai-ops/TROUBLESHOOTING.md` | Common issues & fixes | First-resort diagnostic reference. Reduces support overhead. |
| `ai-ops/GLOSSARY.md` | Project glossary / terminology | Vocabulary alignment. Essential for cross-agent consistency (avoids semantic drift). |
| `ai-ops/CONVENTIONS.md` | Code/documentation conventions | Style guide. Enforces consistency across agent-produced artifacts. |

### 3.2 STASHED ARCHIVE (~704 files)

Mostly:
- Daily beta-day reports (June–July 2026)
- Completed handoff summaries from finished phases
- Agent run logs and execution traces
- Meeting notes and standup records
- Iterative draft documents superseded by finals
- Feature experiment results (A/B tests, prototype evaluations)
- Bug reports resolved in subsequent patches

### 3.3 STASHED DELETE (~69 files)

- Corrupted binary files accidentally committed as markdown
- Duplicate files created by merge/sync conflicts
- Self-test scratch files (`*.tmp`, `*scratch*.md`, `*.bak`)
- Obsolete placeholder files from earlier scaffolding rounds
- Files referencing deprecated tools/models no longer in the stack

---

## 4. Proposed New `docs/` Structure (SSOT)

```
docs/
├── product/                    # Product definitions, PDs, requirements
│   ├── V3_MASTER_TOC.md        # ← KEEP: V3-MASTER-TOC.md
│   ├── V3_BRAND_FUNNEL.md      # ← KEEP: V3-BRAND-FUNNEL.md
│   ├── PRD_GOOPTI_PHASE1.md    # ← ARCHIVE: PRD-GOOPTI-PHASE1.md
│   └── README.md               # ← From stash: Product area entry point
│
├── workflows/                  # Active agent workflows ONLY
│   ├── V3_WORKFLOW.md          # ← KEEP: V3-WORKFLOW.md
│   ├── V3_AGENT_MAP.md         # ← KEEP: V3-AGENT-MAP.md
│   ├── PARALLEL_STRATEGY.md    # ← From stash (if still valid)
│   └── ORCHESTRATION_PLAN.md   # ← From stash (if still valid)
│
├── architecture/               # System design, data models, infra
│   ├── V3_CONTEXT_PACKAGE.md   # ← KEEP: V3-CONTEXT-PACKAGE.md
│   ├── CODEX_MODEL_ROUTING_POLICY.md     # ← KEEP: roadmap/*
│   ├── CODEX_MULTI_AGENT_OPERATING_PLAN.md # ← KEEP: roadmap/*
│   ├── NODE_ID_MAPPING.md      # ← ARCHIVE: reports/BETA-DAY-2-NODE-ID-MAPPING.md
│   └── INTERFACE_SPEC_IMPROVEMENT_PROPOSALS.md # ← ARCHIVE: reports/*
│
├── rules/                      # Operating contracts, conventions
│   ├── V3_APPENDIX.md          # ← KEEP: V3-APPENDIX.md
│   ├── MASTER_PLAN.md          # ← From stash
│   ├── CONVENTIONS.md          # ← From stash
│   ├── GLOSSARY.md             # ← From stash
│   └── QUICK_START.md          # ← From stash
│
├── handoff/                    # Completed handoff docs (historical archive)
│   ├── HANDOFF-2026-07-12-FINAL.md   # ← From stash
│   ├── V2_BUILD_REPORT.md        # ← ARCHIVE: reports/*
│   ├── CODEX_RP0_RECOVERY_AUDIT.md       # ← ARCHIVE: reports/*
│   ├── CODEX_RP0_NEXT_CONTEXT_PACKAGE.md # ← ARCHIVE: reports/*
│   ├── CODEX_RP0_WORKING_TREE_INVENTORY.md # ← ARCHIVE: reports/*
│   └── ...                     # Remaining handoff/audit files from stash
│
├── reports/                    # Current phase reports & measurements
│   ├── OPERATOR_FEEDBACK_BETA_DAY_2.md     # ← ARCHIVE
│   ├── BETA_DAY_* series          # ← ARCHIVE: all Beta Day 2 reports
│   ├── RP0_1_SCOPE_MEASUREMENT.md   # ← ARCHIVE (final version)
│   └── CODEX_AGENT_SKILL_AUDIT.md   # ← KEEP: tech debt tracker
│
├── operations/                 # Runbooks, deployment, monitoring
│   ├── OPERATION_MANUAL.md       # ← From stash
│   ├── DEPLOY_GUIDE.md          # ← From stash
│   ├── TROUBLESHOOTING.md       # ← From stash
│   ├── DASHBOARD.md             # ← From stash (validate currency)
│   └── ROADMAP.md               # ← From stash (check against V3-WORKFLOW.md)
│
├── state/                      # State tracking / dashboards
│   ├── MASTER_TOC.md            # ← ARCHIVE: master-toc.md
│   └── STATE.md                 # ← From stash
│
└── README.md                    # Top-level docs entry point / TOC
```

### Directory Purpose Matrix

| Directory | Content Type | Expected Lifespan | Review Cadence |
|-----------|-------------|-------------------|---------------|
| `product/` | Requirements, PRDs, course outlines | Until product version ends | Per release |
| `workflows/` | Active agent orchestration | Per project phase | Weekly during active dev |
| `architecture/` | Design docs, data models, policies | Until architecture changes | Per milestone |
| `rules/` | Contracts, conventions, onboarding | Semi-annual review | Quarterly |
| `handoff/` | Completed deliverables | Permanent archive | Never (reference-only) |
| `reports/` | Phase reports, audits, feedback | Retain for 90 days, then archive | Per phase |
| `operations/` | How-to guides, runbooks | When process/tool changes | Monthly |
| `state/` | Tracking documents | Per phase completion | Bi-weekly |

---

## 5. Migration Plan

### Phase 1: Create Target Structure (immediate)

```bash
# Under C:\Users\skkse\Desktop\Projects\Core\Master\ai_vibe_coding_master\
mkdir -p docs/{product,workflows,architecture,rules,handoff,reports,operations,state}
```

### Phase 2: Migrate UNTRACKED Files (from `ai-ops/`)

| From | To | Action |
|------|-----|--------|
| `ai-ops/V3-WORKFLOW.md` | `docs/workflows/V3_WORKFLOW.md` | COPY + commit |
| `ai-ops/V3-MASTER-TOC.md` | `docs/product/V3_MASTER_TOC.md` | COPY + commit |
| `ai-ops/V3-AGENT-MAP.md` | `docs/workflows/V3_AGENT_MAP.md` | COPY + commit |
| `ai-ops/V3-APPENDIX.md` | `docs/rules/V3_APPENDIX.md` | COPY + commit |
| `ai-ops/V3-BRAND-FUNNEL.md` | `docs/product/V3_BRAND_FUNNEL.md` | COPY + commit |
| `ai-ops/V3-CONTEXT-PACKAGE.md` | `docs/architecture/V3_CONTEXT_PACKAGE.md` | COPY + commit |
| `ai-ops/master-toc.md` | `docs/state/MASTER_TOC.md` | COPY (archive) |
| `ai-ops/PRD-GOOPTI-PHASE1.md` | `docs/product/PRD_GOOPTI_PHASE1.md` | COPY (archive) |
| `ai-ops/STATE-GOOPTI.md` | `docs/state/STATE_GOOPTI.md` | COPY (archive) |
| `ai-ops/roadmap/CODEX-MODEL-ROUTING-POLICY.md` | `docs/architecture/CODEX_MODEL_ROUTING_POLICY.md` | COPY + commit |
| `ai-ops/roadmap/CODEX-MULTI-AGENT-OPERATING-PLAN.md` | `docs/architecture/CODEX_MULTI_AGENT_OPERATING_PLAN.md` | COPY + commit |
| `ai-ops/reports/BETA-DAY-2-*.md` | `docs/reports/` | COPY (archive) |
| `ai-ops/reports/V2_BUILD_REPORT.md` | `docs/handoff/V2_BUILD_REPORT.md` | COPY (archive) |
| `ai-ops/reports/CODEX-AGENT-SKILL-AUDIT.md` | `docs/reports/CODEX_AGENT_SKILL_AUDIT.md` | COPY (keep-active) |
| `ai-ops/reports/RP0_1_SCOPE_MEASUREMENT.md` | `docs/reports/RP0_1_SCOPE_MEASUREMENT.md` | COPY (archive) |
| `ai-ops/reports/RP0_1_SCOPE_MEASUREMENT_DRAFT.md` | — | DELETE |
| `ai-ops/reports/OPERATOR-FEEDBACK-BETA-DAY-2.md` | `docs/reports/OPERATOR_FEEDBACK_BETA_DAY_2.md` | COPY (archive) |
| `ai-ops/reports/CODEX-RP0-*.md` | `docs/handoff/CODEX_RP0_*.md` | COPY (archive) |

### Phase 3: Migrate STASHED Files (from `stash@{0}`)

Use `git show stash@{0}:ai-ops/<filepath>` to extract each file, place into the target directory structure per the proposed layout above.

For ~807 files, batch extraction recommended:

```bash
# Extract all stashed ai-ops files to a temp staging area
TEMP_DIR=/tmp/stash_extraction
git archive stash@{0} -- ai-ops/ | tar x -C $TEMP_DIR

# Then organize into target structure using scripts/automation
# Files are already categorized by classification table above
```

### Phase 4: Commit New Structure

```bash
cd C:\Users\skkse\Desktop\Projects\Core\Master\ai_vibe_coding_master
git add docs/
git commit -m "docs: reorganize AI-OPS docs into SSOT structure

- Moved V3 workflow documents to docs/workflows/
- Moved product definitions to docs/product/
- Moved architecture/design docs to docs/architecture/
- Moved operational rules/conventions to docs/rules/
- Archived completed handoff docs to docs/handoff/
- Archived Beta Day and RP0 reports to docs/reports/
- Archived legacy reports to docs/handoff/
- Deleted obsolete drafts and duplicate files
- Ref: AI_OPS_RECONCILIATION.md"
```

### Phase 5: Cleanup

```bash
# After verifying all migrated files are correct:
rm -rf ai-ops/
git reset HEAD ai-ops/  # ensure clean removal
```

---

## 6. Risk Notes

### What Gets Lost If Archive/Delete Is Applied

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Beta Day 2 qualitative feedback** could be needed for V3 UX iteration | Medium | Reports moved to `docs/reports/` not deleted. If UX team needs access, provide a link/fetch script. |
| **Node ID mapping** may become outdated if architecture changes | Low | Migrated to `docs/architecture/` with "check currency" annotation. |
| **GooPiTi PRD & STATE** are paused but could be reactivated | Medium | Moved to `docs/product/` as archived reference. Reactivation requires explicit PM decision. |
| **master-toc.md track D mapping** (25 nodes) tracks student journey paths | Medium | Moved to `docs/state/`. Track D is currently paused — verify no downstream dependency before any purge. |
| **RP0 scope measurement data** informs estimation accuracy trends | Low | Final version preserved. Draft deleted safely. |
| **Codex agent skill audit** may already be outdated if skills changed | Medium-High | Flagged as KEEP but should be validated against actual `.agents/` dir contents. |
| **~807 stashed files** extraction during Phase 3 may reveal unexpected dependencies | Low | Run `git diff stash@{0}^..stash@{0} -- ai-ops/` to see what was actually changed vs what existed. |
| **Encoding issues** in some stashed files (Korean characters rendered as mojibake in terminal) | Medium | Use `read_file` or Python UTF-8 handling when extracting Korean-content files from stash. |
| **Cross-references** between docs (e.g., `V3-WORKFLOW.md` references `AGENTS.md §5`) | Medium | Update all internal relative paths after migration. Run a regex search for `ai-ops/` references in migrated files and update to new paths. |
| **Stale symlink/URL references** to external resources (`E:\hermes\learning\logs\`, `E:\hermes\projects\...`) | Medium | These Windows-path references appear in several docs. Validate they still resolve. Consider making them relative to repo root or documenting the expected workspace layout. |

### Recommendations Before Finalizing

1. **Validate Codex Agent Skill Audit**: Compare `reports/CODEX-AGENT-SKILL-AUDIT.md` against actual `.agents/` directory contents to check currency.
2. **Check cross-reference integrity**: After migration, scan all migrated files for remaining `ai-ops/` relative path references and update to new `docs/` paths.
3. **Verify GooPiTi pause status**: Confirm with operator that GooPiTi PRD/STATE can remain in archive — not blocked for imminent restart.
4. **Confirm Track D status**: Verify with operator whether `master-toc.md` track D is truly paused or just deferred.
5. **Examine .agents/ and .codex/ dirs**: Several stashed files reference these directories. Understand their current state before deciding on `CODEX-*-PLAN.md` relevance.

---

## 7. File Counts Summary

| Category | Untracked Count | Stashed Count | Grand Total |
|----------|-----------------|---------------|-------------|
| **KEEP** | 11 | 15 | **26** |
| **ARCHIVE** | 15 | 704 | **719** |
| **DELETE** | 1 | 69 | **70** |
| **TOTAL** | **27** | **~807** | **~834** |

After migration:
- **Active docs under `docs/`**: ~26 files (KEEP)
- **Archived docs under `docs/handoff/` + `docs/reports/`**: ~719 files (ARCHIVE)
- **Files permanently removed**: ~70 files (DELETE)

---

*Report generated 2026-08-12 by Hermes PM. Subject to operator review and approval before migration execution.*
