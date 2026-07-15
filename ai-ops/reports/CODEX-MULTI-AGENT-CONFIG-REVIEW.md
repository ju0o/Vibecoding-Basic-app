# Codex Multi-Agent Configuration Review

```yaml
document: CODEX-MULTI-AGENT-CONFIG-REVIEW
date: 2026-07-15
phase: codex_configuration_only
decision: READY_FOR_CODEX_CONFIG_REVIEW
independent_review: approve_with_notes
p0_started: false
track_d: paused
push: false
deploy: false
```

## Scope

Implemented only the operator-approved project Codex configuration, agent contracts, thin skill adapters, deterministic validators, model-catalog report, STATE, and handoff updates.

No P0 content, P0 React, practice, quiz/outcome, source body, accessibility code, Studio data, learning node, route, Track D, dependency, or global Codex configuration was modified.

## Created configuration

| Item | Result |
|---|---|
| `.codex/config.toml` | created |
| `.codex/agents/*.toml` | 12 created |
| `.agents/skills/*/SKILL.md` | 10 created |
| `scripts/codex/validate-project-agents.mjs` | created |
| `scripts/codex/validate-project-skills.mjs` | created |
| External dependencies | none |

Project agent settings:

```toml
[agents]
max_threads = 4
max_depth = 1
interrupt_message = true
```

## Active model catalog

All approved mappings are present in the active authenticated catalog:

| Agent group | Model | Effort | Sandbox default |
|---|---|---|---|
| education-chief | `gpt-5.6-sol` | high | inherited |
| repository-explorer | `gpt-5.6-luna` | low | read-only |
| research-worker | `gpt-5.6-luna` | medium | read-only |
| mechanical-auditor | `gpt-5.4-mini` | low | read-only |
| source-verifier | `gpt-5.6-terra` | high | read-only |
| curriculum-architect | `gpt-5.6-terra` | high | read-only |
| content-writer | `gpt-5.6-terra` | medium | inherited |
| practice-designer | `gpt-5.5` | high | inherited |
| interaction-designer | `gpt-5.6-terra` | high | read-only |
| react-implementer | `gpt-5.4` | high | inherited |
| qa-investigator | `gpt-5.4-mini` | medium | read-only |
| independent-reviewer | `gpt-5.5` | high | read-only |

Supported effort validation:

- Sol and Terra: low, medium, high, xhigh, max, ultra.
- Luna: low, medium, high, xhigh, max.
- GPT-5.5, GPT-5.4, and GPT-5.4 Mini: low, medium, high, xhigh.

## Permission controls

- Every agent declares the Codex executor layer, existing SSOT authority, Track D pause, configuration-only scope, Context Package write control, and no push/deploy.
- Read-oriented agents use `sandbox_mode = "read-only"`.
- Writer and implementer files exist but inherit the parent sandbox and remain blocked by their configuration-only developer instructions.
- No write becomes authorized without explicit `allow_write_paths` in a future approved Context Package.
- Exact path safety remains a combination of parent permission mode, agent instructions, Context Package, git diff checks, and independent review.

## Validation evidence

| Check | Result |
|---|---|
| Active catalog: six requested models | PASS |
| Requested reasoning efforts | PASS |
| Agent files present | PASS, 12 |
| Required agent fields | PASS |
| Unique names | PASS |
| Built-in `explorer` collision | PASS, none |
| Model mapping vs catalog | PASS |
| Config values | PASS |
| Skill directories and files | PASS, 10 |
| Skill frontmatter and required headings | PASS |
| Default no-write boundary | PASS |
| Project config live load | PASS |
| `codex doctor --json` | PASS, overallStatus `ok` |
| P0 file hashes | PASS, unchanged across configuration phase |
| Durable global Codex config surfaces | PASS, unchanged |
| Track D paths | no creation by this phase |

Commands:

```text
node scripts/codex/validate-project-agents.mjs
node scripts/codex/validate-project-skills.mjs
codex debug models
codex doctor --json
codex exec --ignore-user-config --strict-config --ephemeral --sandbox read-only <bounded smoke>
```

The agent validator uses the live catalog and verifies 12 routing tuples. The skill validator verifies 10 names, frontmatter, required sections, Track D boundaries, and default no-write language.

## Strict configuration note

Running strict mode with the existing user configuration failed on the pre-existing global field:

```text
C:\Users\user\.codex\config.toml: features.child_agents_md
unknown configuration field
```

The global file is outside this phase and was not modified. Re-running with `--ignore-user-config --strict-config` loaded the project configuration and completed the bounded smoke. Normal `codex doctor --json` also reported configuration load status `ok`.

## Spawn smoke

Bounded smoke requested exactly:

1. `repository-explorer`: report only whether `AGENTS.md` and `ai-ops/STATE.md` exist.
2. `mechanical-auditor`: report only Agent and Skill counts and names.

Final result:

```text
PASS
AGENTS.md: exists
ai-ops/STATE.md: exists
Agent files: 12
Skill files: 10
Exactly two read-only subagents completed
No files modified
```

The first delegation attempt hit an orchestration-thread error, and some shell forms were rejected by read-only policy. Codex retried within the same bounded scope and completed successfully. Independent review classified this as non-blocking retry ergonomics.

## Existing working tree

```text
Codex configuration files were added.
Pre-existing P0-target working-tree changes remain untouched.
```

The repository is not globally clean. Existing changes under `content/practice/vibe-coding-foundation/**` and `src/features/learning-interactions/**` were neither inspected for ownership nor modified, staged, reset, cleaned, discarded, or committed by this phase.

## Independent review

```yaml
verdict: approve_with_notes
blocking_findings: none
```

Review conclusions:

- Model allocation is proportionate; Sol is Chief-only and barred from repetitive work.
- Mini and Luna roles are read-only and do not hold final authority.
- Writer, implementer, and independent reviewer responsibilities are separated.
- Skills are path-based thin adapters rather than copied SSOT bodies.
- Exact writes remain controlled by future Context Packages.
- P0 and Track D remain inactive.
- Validators use bounded regex and phrase checks, so live Codex loading and spawn evidence remain important complementary checks.

## Activation boundary

Every agent is intentionally locked to configuration-only scope. Before RP0-0 uses these custom roles, a new operator approval must authorize either:

- a minimal config update activating only recovery roles for RP0-0; or
- RP0-0 through the Main/built-in read-only execution path while custom roles remain frozen.

Writer and implementer activation is not implied.

## Decision

```text
READY_FOR_CODEX_CONFIG_REVIEW
```

Next operator gate:

```text
APPROVE_CODEX_RP0_RECOVERY
```
