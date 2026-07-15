# Codex P0 Workflow Handoff

```yaml
document: CODEX-P0-WORKFLOW-HANDOFF
date: 2026-07-15
phase: codex_configuration_complete
decision: READY_FOR_CODEX_CONFIG_REVIEW
operator_scope: APPROVE_CODEX_MULTI_AGENT_CONFIG
track_d: paused
p0_started_by_this_phase: false
codex_agents_installed: true
codex_agent_count: 12
codex_skills_installed: true
codex_skill_count: 10
push: false
deploy: false
```

## Configuration phase result

Project-scoped Codex configuration is installed and validated:

- `.codex/config.toml` with `max_threads = 4`, `max_depth = 1`, and `interrupt_message = true`;
- 12 model-aware Agent TOML contracts;
- 10 thin Skill adapters under the official `.agents/skills/**` location;
- two deterministic validators;
- all requested model IDs and efforts confirmed in the active catalog;
- bounded read-only spawn smoke PASS;
- independent review `approve_with_notes`, no blocking findings.

P0 and RP0-0 were not started. Track D remains paused.

## Goal

Prepare a model-aware, token-efficient Codex execution layer for P0 remediation while preserving the education SSOT, Website Last, Node Quality Gate, and Track D pause.

## Completed design work

| CX | Result |
|---|---|
| CX-0 | Current Codex project configuration audited |
| CX-1 | Existing Grok and AI-Ops agent/skill overlap audited |
| CX-2 | Multi-agent operating plan written |
| CX-3 | Model routing policy written |
| CX-4 | Agent contracts specified at design level |
| CX-5 | Skill contracts specified at design level |
| CX-6 | RP0 routing sequence and gates written |
| CX-7 | Independent review required before installation |

## Current source of truth

```text
STATE: REMEDIATE_P0_ONLY
Track D: PAUSED
P0 implementation by this CX phase: NOT STARTED
Next eligible action: review Codex design artifacts
```

## Correct target structure after approval

```text
.codex/
  config.toml
  agents/
    education-chief.toml
    repository-explorer.toml
    research-worker.toml
    mechanical-auditor.toml
    source-verifier.toml
    curriculum-architect.toml
    content-writer.toml
    practice-designer.toml
    interaction-designer.toml
    react-implementer.toml
    qa-investigator.toml
    independent-reviewer.toml
.agents/
  skills/
    repository-recovery/SKILL.md
    research-queue-processing/SKILL.md
    claim-verification/SKILL.md
    curriculum-node-authoring/SKILL.md
    executable-practice/SKILL.md
    node-checkpoint/SKILL.md
    interaction-accessibility/SKILL.md
    route-smoke/SKILL.md
    studio-status-sync/SKILL.md
    milestone-review/SKILL.md
```

The `.agents/skills` correction follows the current official Codex repository skill format.

## Configuration target

```toml
[agents]
max_threads = 4
max_depth = 1
interrupt_message = true
```

No project `config.toml`, agent TOML, or skill directory was created in CX-0..CX-7.

## P0 routing after configuration approval

```text
RP0-0 recovery             -> Luna explorer + Mini auditor
RP0-1 measurement          -> Luna explorer + Mini auditor
RP0-2 B05-B09 practice     -> Terra architect -> GPT-5.5 practice review -> Terra writer -> Mini QA
RP0-3 C01-C04 practice     -> same
RP0-4 C05-C10 checkpoint   -> Terra architect -> GPT-5.4 implementer -> Mini QA -> GPT-5.5 review
RP0-5 sources              -> Luna research -> Terra verification -> Terra writer -> script/Mini check
RP0-6 accessibility        -> Luna explorer -> GPT-5.4 implementer -> Mini QA -> GPT-5.5 review
RP0-7 browser smoke        -> script first -> QA investigator
RP0-8 Studio/Matrix        -> Mini audit -> Chief single writer
RP0-9 full QA              -> scripts -> Mini classification
RP0-10 independent review  -> GPT-5.5 reviewers; Sol conflict resolution
RP0-11 milestone decision  -> Sol Chief
```

Track D is forbidden until RP0-11 explicitly returns `CONTINUE_TRACK_D`.

## Live working-tree warning

The CX audit found pre-existing P0-target modifications and untracked files despite the earlier handoff's expected clean tree. This CX phase did not alter them. RP0-0 must inventory and reconcile them before assigning any writer or implementer.

Do not reset, clean, discard, stage, or attribute these files without operator context.

## Review checklist

- [ ] Official Codex paths and required TOML fields are correct.
- [ ] Model identifiers are present in the active account/workspace catalog.
- [ ] `.agents/skills/**` correction is accepted.
- [ ] Agent roles are thin Codex adapters, not duplicate domain authorities.
- [ ] Read-only and write roles have appropriate permission defaults.
- [ ] Exact writes remain governed by a phase Context Package.
- [ ] Script First routing precedes agent delegation.
- [ ] `max_threads = 4` and `max_depth = 1` are accepted.
- [ ] Implementer and reviewer remain sequential and independent.
- [ ] Existing P0 working-tree changes are reconciled at RP0-0.
- [ ] No Track D, P0 code, push, deploy, or global Codex changes occurred in CX.

## Independent review result

```yaml
review: approve_with_notes
p0_findings: none
blocking_findings: none
review_readiness: justified
```

Review notes:

- Active workspace catalog validation of model identifiers, supported effort values, sandbox behavior, and TOML keys remains required before configuration installation.
- `.codex/**` and `.agents/**` remain outside the default write paths until a separately reviewed Context Package and operator allowlist approve them.
- RP0-0 working-tree reconciliation remains mandatory before any P0 writer or implementer runs.
- `READY_FOR_CODEX_MULTI_AGENT_REVIEW` is not equivalent to `APPROVE_CODEX_MULTI_AGENT_CONFIG`.

## Next approval requested

Approve only the RP0 recovery and measurement gate:

```text
APPROVE_CODEX_RP0_RECOVERY
```

That approval must not implicitly authorize Writer or Implementer changes. Because all custom Agent files are deliberately configuration-only, the recovery Context Package must explicitly authorize either a minimal recovery-role config activation or Main/built-in read-only recovery execution.

## Decision

```text
READY_FOR_CODEX_CONFIG_REVIEW
```
