# AI Engineering Atlas V2 — Project Operating Contract

This file is the **common operating contract** for every AI executor working in this repository (Grok Main, Grok SubAgents, and any other CLI/IDE agent). Detailed role contracts live under `.grok/agents/` and `.grok/skills/`. Do not duplicate long skill bodies here.

---

## 1. Project Goal (Education First)

**Product = 교육자료.** 웹사이트는 교육자료를 보여주는 **Viewer**다.

이 저장소는 비개발자를 위한 **AI · 바이브코딩 교육자료를 AI와 함께 연구·제작**하는 Living Education Project다.  
Atlas 사이트 기능 완성이 최상위 목표가 아니다. 최우선 질문은:

```text
학생이 Day 1부터 끝까지 정말 이해하며 공부할 수 있는가?
```

Every agent, skill, script, and workflow must pass:

1. Does this improve **learner understanding** (not just ship a page)?
2. Was **Research → Verification → Content → Practice → Animation → Quiz** done before Website?
3. Does it preserve existing education assets (Atlas Knowledge Layer, lessons, KB)?
4. Does it keep facts and sources honest?
5. Does it reduce unnecessary Main-agent work?
6. Does it produce verifiable results?

If not, do not add it.

**Website Last:** do not implement Viewer routes before education content is written and reviewed.

Direction SSOT candidates (operator review):  
`ai-ops/roadmap/EDUCATION_PLATFORM_MASTER_PLAN.md` and siblings  
`COURSE_ARCHITECTURE.md`, `CONTENT_PIPELINE.md`, `CURRICULUM_SYSTEM.md`.

---

## 2. SSOT priority (education wins)

When documents conflict, higher rows win:

| Priority | Document | Authority |
|---:|---|---|
| 1 | `ai-ops/roadmap/EDUCATION_PLATFORM_MASTER_PLAN.md` | **Project direction** (education materials first; site = viewer) — pending full operator stamp but **overrides old “Atlas-site-as-product” goal** |
| 2 | `ai-ops/roadmap/COURSE_ARCHITECTURE.md` · `CONTENT_PIPELINE.md` · `CURRICULUM_SYSTEM.md` | Learning Path / pipeline / living curriculum |
| 3 | `ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md` | Atlas **Knowledge Layer** technical PRD (21 concepts, 14 sections) — keep; not deleted |
| 4 | `ai-ops/roadmap/ATLAS-MODEL-ROUTING-FEATURE-SPEC.md` | Subordinate Model Routing Learning Route |
| 5 | `ai-ops/STATE.md` | Live execution queue / approval status |
| 6 | `ai-ops/roadmap/ATLAS-GROK-MULTI-AGENT-OPERATING-PLAN.md` | Grok multi-agent **operations** |
| 7 | `AGENTS.md` (this file) | Repo-wide AI operating contract |
| 8 | `.grok/agents/*`, `.grok/skills/*` | Role and skill execution contracts |

`ATLAS-BUILD-PLAN.md` remains **HOLD**. Do not activate it.

**Atlas is Knowledge / Reference Layer**, not the main Learning Path. Do not delete Atlas assets.

Operational convenience never overrides learner understanding or claim honesty.

---

## 3. AI-Ops Domain Agents vs Grok CLI SubAgents

| Layer | Location | Role |
|---|---|---|
| **AI-Ops Domain Agent** | `ai-ops/agents/*-agent.md` | Content production **role definitions** for the 100-lesson / KB pipeline |
| **AI-Ops Executor** | Codex / Cline / Fable (`ai-ops/executors/EXECUTORS.md`) | Optional auxiliary runners via existing RUN prompts |
| **Grok Main Orchestrator** | Current Grok session | Default entry for **Atlas V2** research, design, and development |
| **Grok SubAgent** | `.grok/agents/atlas-*.md` | Delegated explorers / writers / implementers / reviewers |
| **Grok Skill** | `.grok/skills/atlas-*/SKILL.md` | Repeatable execution contracts |
| **AI-Ops Skill** | `ai-ops/skills/SK-0*.md` | Domain quality rules (referenced, not replaced) |

Naming: Grok roles use the `atlas-` prefix. Never rename AI-Ops agent files to “fix” collisions.

Default Atlas V2 flow:

```text
Human → Grok Main → classify task → Script or SubAgent → QA → Independent Review → Main merge → Human gate only when required
```

Existing 100-lesson / KB production may still use AI-Ops P-01~P-09. Do not force-migrate or delete AI-Ops.

---

## 4. How to confirm approved phase

Before any write work:

1. Read `ai-ops/STATE.md` (현황판 + NEXT).
2. Read `ai-ops/reports/ATLAS-GROK-HANDOFF.md` if present.
3. Confirm the target phase status is approved or CONTINUE-eligible.
4. Confirm **implementation_status** for Model Routing / Atlas source work.
5. If status is `HUMAN_APPROVAL_REQUIRED` or `BLOCKED`, stop and report.

Model Routing: Feature Spec **MR-0 approved**. Source implementation remains gated (MR-1+ only under controlled pilot rules).

---

## 5. Protected paths (Phase 1 preserve list)

Treat as **preserve / do not delete / do not reset / do not clean / do not rewrite outside allowlist / do not mix into Grok OS commits**:

```text
src/components/layout/SiteHeader.tsx   # Phase 1 tracked dirty
src/content/atlas.ts                   # Phase 1 tracked dirty
src/app/atlas/**
src/content/atlas/**
src/features/atlas/**
src/lib/atlas.ts
src/lib/atlas-progress.ts
src/lib/atlas.test.ts
ai-ops/ATLAS-P1-PENDING.md
ai-ops/reports/atlas-phase-1-impact-report.md
```

Also frozen without explicit operator approval:

```text
src/content/lessons/**
src/content/glossary.ts
ai-ops/knowledge-base/entries/**
ai-ops/roadmap/ATLAS-BUILD-PLAN.md
```

Re-measure with `git status` at phase start; update handoff if the list changes.

---

## 6. Phase 1 uncommitted work rules

- Preserve working tree state.
- No `git reset`, `git clean`, destructive checkout, or silent rewrite.
- Do not stage Phase 1 paths into Grok OS or docs-only commits.
- Reuse analysis from `ai-ops/reports/atlas-phase-1-impact-report.md`; do not expand it casually.

---

## 7. Script First

```text
Deterministic checks → Script
Light judgment → Worker SubAgent
Design / conflict / approval → Main or Independent Reviewer (+ Human when required)
```

Do not burn Main context counting files, scanning frontmatter, or re-reading build logs that a script can summarize.

---

## 8. Official sources first

Priority:

1. Existing **approved** KB + Quote Bank  
2. Official docs / specs / eng blogs (`ai-ops/sources/SOURCE-REGISTRY.md`)  
3. Official product announcements  
4. X / community as **candidates only**  
5. Speculation → forbidden  

New product facts that become Atlas content must still pass AI-Ops **P-01 / P-02** when they need KB status.

---

## 9. X information classification

Tag every X-derived item:

| Tag | Use in content |
|---|---|
| `verified_fact` | Only after official-doc cross-check |
| `official_announcement_candidate` | Not final until docs confirm |
| `community_interpretation` | Educational pattern only; never as industry standard |
| `unverified_claim` | Do not publish as fact |
| `opinion_sentiment` | Trend note only |

Never treat Model Routing as a single invented standard or official tier system. Educational labels (Cheap / Standard / Frontier, relative cost index) must stay labeled **educational relative classification**.

---

## 10. Default agent capabilities

| Role | Default capability |
|---|---|
| Main Orchestrator | Conditional full; git write only after explicit policy + gates |
| atlas-explorer | read-only + git read |
| atlas-source-researcher | read-only + web + X candidate search |
| atlas-curriculum-architect | documentation_write on roadmap allowlist |
| atlas-content-writer | content specs only until phase allowlist expands |
| atlas-interaction-designer | interaction/a11y specs only until phase allowlist expands |
| atlas-implementer | **no** source write unless Context Package allowlist |
| atlas-independent-reviewer | read-only |
| Mechanical / Script QA | execute tests; **no** fix-by-editing |

Implementer ≠ Reviewer for the same task unit.

---

## 11. Writable paths (default)

Without a tighter phase allowlist, AI may write only:

```text
AGENTS.md
.grok/**
ai-ops/STATE.md
ai-ops/reports/ATLAS-GROK-HANDOFF.md
ai-ops/reports/grok-runs/**
ai-ops/reports/research/**
ai-ops/roadmap/ATLAS-GROK-MULTI-AGENT-OPERATING-PLAN.md
ai-ops/contracts/**
scripts/atlas/**
```

Phase-specific Context Packages may add paths. They may never silently remove protection for Phase 1 or education freezes.

---

## 12. Forbidden paths / actions (default)

- Edit Phase 1 protected list without explicit allowlist entry  
- Change 21 concepts or 14-section contract  
- Activate HOLD Build Plan  
- Edit approved KB bodies without P-01/P-02 process  
- Progress schema migration without Human Approval  
- Add heavy graph/motion libraries  
- Wire external paid model APIs into educational simulators  
- Deploy  
- `git reset`, `git clean`, `git rebase`, `git push`, force push, tag overwrite  

---

## 13. QA requirements

Before calling a phase CONTINUE:

- Run applicable scripts under `scripts/atlas/` when present  
- Run `npm run lint` / `typecheck` / `test` / `build` / `verify` when source changed  
- Confirm no Phase 1 path staged  
- Confirm education freezes (21 / 14 / HOLD)  
- Structure results as PASS/FAIL with commands and log paths  

Scripts diagnose; they do not auto-rewrite the tree.

---

## 14. Independent Review requirements

Required before implementation commits and before GO-9 merge decisions:

- Requirements vs SSOT  
- Scope creep  
- Source / claimScope fitness  
- Educational label disclaimers  
- a11y, reduced-motion, static export, client-island boundaries  
- Bundle risk  
- Test evidence  
- Phase 1 contamination  
- Whether Human Approval is still required  

If no reviewer ran or review failed → `HUMAN_APPROVAL_REQUIRED` or `Human Review Required`.

---

## 15. Git policy

- Stage **exact paths** only.  
- Separate commits: docs-ops / grok-os / phase implementation.  
- Never mix Phase 1 sources into ops commits.  
- **No push** unless operator explicitly orders it.  
- Forbidden without explicit operator approval: reset, clean, rebase, force, destructive checkout, bulk unrelated staging.

Suggested prefixes: `ATLAS-OPS:`, `ATLAS-GO{n}:`, `ATLAS-MR1:`.

---

## 16. Human Approval required (stop continuous execution)

Stop and report when any of these appear:

- 21 concepts / 14 sections / PRD authority / Feature Spec scope expansion / BUILD-PLAN activation  
- Progress migration, secrets, auth, bulk delete, irreversible data loss  
- Heavy new libraries, deploy, paid external API, remove AI-Ops executors  
- push / rebase / reset / clean / force / discard work  
- QA loop exhaustion, Independent Review FAIL, source/SSOT conflict, protected-path mix-in  

Low-risk docs, read-only agents, skills, and scripts: **do not ask permission each step** if gates pass.

---

## 17. STATE update rules

- **Main Orchestrator only** updates `ai-ops/STATE.md`.  
- End of each phase: update 현황판, Atlas status table, NEXT block, append history row.  
- Keep NEXT_ACTION fields aligned with `ai-ops/OPERATION_MANUAL.md` intent.  
- SubAgents must not race-edit STATE.

---

## 18. Handoff rules

At every phase end (and when context is large), update:

```text
ai-ops/reports/ATLAS-GROK-HANDOFF.md
```

Must include: goal, completed phases, current phase, next work, approved decisions, bans, files changed, uncommitted inventory, tests, risks, docs to read, resume prompt.

New session recovery order:

```text
AGENTS.md → STATE.md → ATLAS-GROK-HANDOFF.md → current phase SSOT → git status → resume
```

---

## 19. Context economy

- Main does not re-walk the whole repo each turn.  
- Delegate exploration and research.  
- Pass SSOT by **path + section**, not full paste.  
- SubAgents return the RESULT schema (status, files, findings, claims, tests, risks, handoff).  
- One writer path set at a time; no parallel writes to the same files.  
- No infinite retries; escalate after policy limits.

---

## 20. Completion report format (phase)

```text
Phase:
Status:
Goal:
Files Created:
Files Modified:
Agents Used:
Skills Used:
Scripts Run:
Tests:
Independent Review:
Protected Assets Check:
Git Status:
Risks:
Next Phase:
Decision: CONTINUE | BLOCKED | HUMAN_APPROVAL_REQUIRED
```

Report at: phase start, major design discovery, verification failure, phase end, human gate, session handoff — not after every file.

---

## Continuous execution mandate

After GO-1 approval, phases GO-2…GO-9 may continue automatically when each phase ends with **CONTINUE**. Only **BLOCKED** or **HUMAN_APPROVAL_REQUIRED** stops the chain for the operator.

Final goal remains learner understanding — not “more agent files.”
