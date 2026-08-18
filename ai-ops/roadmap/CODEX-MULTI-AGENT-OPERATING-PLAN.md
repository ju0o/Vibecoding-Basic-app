# Codex Multi-Agent Operating Plan

```yaml
document: CODEX-MULTI-AGENT-OPERATING-PLAN
status: review_ready
decision_target: READY_FOR_CODEX_MULTI_AGENT_REVIEW
date: 2026-07-15
scope: CX-0..CX-7 design only
p0_code_changes: forbidden
track_d: paused
codex_runtime_checked: codex-cli 0.144.4
```

## 1. Current goal and boundary

This plan defines a project-scoped Codex executor layer for the approved P0 remediation workflow. It does not start RP0-0, modify P0 content or source, create Track D, or install the proposed Codex agents and skills.

Current execution posture:

```text
REMEDIATE_P0_ONLY
PAUSE_TRACK_D
READY_FOR_P0_REMEDIATION_HANDOFF
```

The first implementation after this plan requires a separately reviewed Context Package that explicitly allows `.codex/config.toml`, `.codex/agents/**`, and `.agents/skills/**`.

## 2. Session budget

```yaml
session_goal: design and review the project Codex multi-agent operating system
current_phase: CX-0..CX-7
allowed_scope:
  - four requested design and handoff documents
estimated_agents: 2
expensive_agent_calls: 1 independent review escalation only if needed
stop_threshold: 3 consecutive failures or policy conflict
handoff_threshold:
  context_15_percent: do not begin a new phase
  context_10_percent: QA and consolidation only
  context_5_percent: handoff only
```

## 3. Four layers that must not be merged

| Layer | Location | Meaning |
|---|---|---|
| Codex executor | `.codex/agents/*.toml` | Runtime-specific worker contract and model default |
| Codex workflow skill | `.agents/skills/*/SKILL.md` | Reusable project workflow loaded by Codex |
| AI-Ops domain role | `ai-ops/agents/*-agent.md` | Durable content-pipeline responsibility and artifact contract |
| Grok executor/skill | `.grok/agents/**`, `.grok/skills/**` | Grok-specific runtime adapter |

Codex contracts must reference the AI-Ops and education SSOT by path. They must not copy long domain rules, because copied rules will drift.

## 4. Official Codex format decision

The current official Codex manual establishes:

- Project custom agents live in `.codex/agents/*.toml`.
- Each agent file requires `name`, `description`, and `developer_instructions`.
- Agent files may also set supported session keys such as `model`, `model_reasoning_effort`, and `sandbox_mode`.
- Project skills live in `.agents/skills/*/SKILL.md`, not `.codex/skills/**`.
- Project `.codex/config.toml` is loaded only for a trusted repository.
- `[agents].max_threads` caps open agent threads and `[agents].max_depth` controls nesting.

Sources: [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents), [Codex skills](https://learn.chatgpt.com/docs/agent-configuration/skills), and [Codex configuration](https://learn.chatgpt.com/docs/config-file/config-basic).

The eventual project configuration should begin with:

```toml
[agents]
max_threads = 4
max_depth = 1
interrupt_message = true
```

This is a reviewed target, not a file created by CX-0..CX-7.

## 5. Chief and Task Router

`education-chief` is the root orchestration role. It is not a license to call every agent. Its first question is always:

```text
Can a deterministic script produce the answer?
```

Routing sequence:

1. Restore `STATE`, handoff, git status, and the current Context Package.
2. Reject work outside `REMEDIATE_P0_ONLY` or work that reaches Track D.
3. Use a script for deterministic checks.
4. Select one specialist for a bounded judgment or write task.
5. Add a second worker only for an independent, non-overlapping read task.
6. Run QA after the writer finishes.
7. Run the reviewer after the implementer and QA finish.
8. Chief integrates summaries, checks gates, and updates handoff artifacts.

The Task Router is an operating policy executed by the Chief. Codex configuration does not provide a declarative rules engine that automatically dispatches tasks based on arbitrary repository semantics.

## 6. Recommended agent structure

The requested filenames remain the human-facing plan. To avoid confusing Codex executors with AI-Ops domain agents, each eventual TOML must state `layer = Codex executor` in its instructions and reference the paired SSOT.

| Agent | Default model | Effort | Default access | Primary use | Must not do |
|---|---|---:|---|---|---|
| education-chief | `gpt-5.6-sol` | high | inherited | classification, conflict resolution, gate, handoff | repetitive scans or bulk QA |
| repository-explorer | `gpt-5.6-luna` | low | read-only | routes, files, implementation map | edit files |
| research-worker | `gpt-5.6-luna` | medium | read-only | queue preprocessing and source candidates | final fact judgment |
| mechanical-auditor | `gpt-5.4-mini` | low | read-only preferred | format, paths, status, logs | educational judgment |
| source-verifier | `gpt-5.6-terra` | high | read-only | official-source and claim decisions | publish unsupported facts |
| curriculum-architect | `gpt-5.6-terra` | high | read-only unless exact docs allowlist | questions, outcomes, bridges, gate alignment | UI implementation |
| content-writer | `gpt-5.6-terra` | medium | exact docs allowlist only | beginner student Markdown | invent curriculum scope |
| practice-designer | `gpt-5.5` | high | exact practice-doc allowlist only | executable practice contract | accept passive reading as practice |
| interaction-designer | `gpt-5.6-terra` | high | read-only unless spec allowlist | stateful interaction and a11y design | text-only stepper |
| react-implementer | `gpt-5.4` | high | workspace-write under exact Context Package | bounded React integration | architecture or scope expansion |
| qa-investigator | `gpt-5.4-mini` | medium | read-only preferred | run commands, classify failures | fix features |
| independent-reviewer | `gpt-5.5` | high | read-only | independent gate review | edit implementation |

High-risk reviewer escalation uses `gpt-5.6-sol` with `high` or `xhigh` only when the selected model exposes that effort in the active catalog.

Agent TOML settings are defaults, not exact-path filesystem enforcement. Exact write boundaries remain in the Context Package, parent sandbox/permission mode, and review checklist.

## 7. Skill structure

The reviewed target location is `.agents/skills/`:

```text
.agents/skills/
  repository-recovery/
  research-queue-processing/
  claim-verification/
  curriculum-node-authoring/
  executable-practice/
  node-checkpoint/
  interaction-accessibility/
  route-smoke/
  studio-status-sync/
  milestone-review/
```

Each skill must be a thin runtime adapter with:

- YAML frontmatter containing `name` and `description`.
- A short trigger and scope section.
- Direct links to existing SSOT paths.
- Input, output, allowed writes, forbidden writes, QA, and return schema.
- No duplicated body from `NODE_QUALITY_GATE.md`, AI-Ops skills, or `.grok` skills.

## 8. Script First

Before agent delegation, use existing or narrowly added scripts for:

- protected-path and SSOT freeze checks;
- model-routing unit checks;
- lesson reference and app-concept checks;
- file existence, frontmatter, links, routes, dates, matrix values, and queue states;
- lint, typecheck, unit test, build, and static export.

Current reusable scripts include `scripts/atlas/check-protected-paths.mjs`, `check-ssot-freezes.mjs`, `check-ops-inventory.mjs`, `check-model-routing-units.mjs`, `check-lesson-refs.mjs`, and `check-app-concepts.mjs`.

Scripts diagnose. They must not rewrite the working tree as a side effect of a check.

## 9. Parallelization

Allowed parallel reads:

- separate node audits;
- official-source candidate collection;
- practice and quiz status audits on different nodes;
- independent route smoke partitions.

Forbidden parallel work:

- two writers touching the same file or node;
- Matrix and Studio status writes at the same time;
- implementer and reviewer for the same unit;
- curriculum content and code for the same node before the design gate;
- nested delegation beyond depth 1.

Initial concurrency is four open threads maximum. A completed thread should be closed or reused rather than left open.

## 10. Context Package

Every delegated task receives only:

```yaml
task_id:
goal:
node_ids:
current_status:
ssot_paths:
read_paths:
allow_write_paths:
forbidden_paths:
required_sources:
quality_gate:
qa_commands:
return_schema:
```

Required status values include `REMEDIATE_P0_ONLY` and `PAUSE_TRACK_D`. An empty `allow_write_paths` means read-only.

## 11. Return schema

Every agent returns a concise summary:

```yaml
status:
task_id:
files_read:
files_changed:
findings:
claims:
qa:
risks:
blocked:
recommended_next:
```

Raw logs stay in files. The result includes log paths and a short classification only.

## 12. Retry and escalation

| Attempt | Action |
|---:|---|
| 1 | Return the exact failure context to the same specialist |
| 2 | Route to a stronger model or different specialist with a bounded delta |
| 3 | Stop as `BLOCKED` or `HUMAN_APPROVAL_REQUIRED` |

Never restart the whole workflow for a local failure. Never widen the write allowlist merely to make a failure disappear.

## 13. RP0 execution map after approval

| Phase | Route |
|---|---|
| RP0-0 Handoff/Git/Matrix recovery | Luna explorer + Mini auditor |
| RP0-1 Target measurement | Luna explorer + Mini auditor |
| RP0-2 B05-B09 practice | Terra curriculum -> GPT-5.5 practice review -> Terra writer -> Mini QA |
| RP0-3 C01-C04 practice | same sequence |
| RP0-4 C05-C10 quiz/outcome | Terra curriculum -> GPT-5.4 implementer -> Mini QA -> GPT-5.5 reviewer |
| RP0-5 Sources | Luna research -> Terra verifier -> Terra writer -> script/Mini link check |
| RP0-6 Accessibility | Luna explorer -> GPT-5.4 implementer -> Mini QA -> GPT-5.5 reviewer |
| RP0-7 Browser smoke | script first -> QA investigator |
| RP0-8 Studio/Matrix | Mini audit -> Chief-controlled single writer |
| RP0-9 Full QA | scripts -> Mini classification |
| RP0-10 Track review | GPT-5.5 independent reviewers; Sol resolves conflict |
| RP0-11 Milestone decision | Sol Chief |

Track D remains forbidden through RP0-10 and becomes eligible only if RP0-11 explicitly returns `CONTINUE_TRACK_D`.

## 14. Approval gate

CX-0..CX-7 may end only with review artifacts. The next action requires operator approval of:

1. official skill path correction to `.agents/skills/**`;
2. exact `.codex` and `.agents` write allowlist;
3. model availability validation in the active Codex catalog;
4. agent/skill contracts generated as thin adapters;
5. no activation of P0 or Track D during configuration generation.
