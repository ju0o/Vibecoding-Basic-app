# Codex Agent and Skill Audit

```yaml
document: CODEX-AGENT-SKILL-AUDIT
status: review_ready
date: 2026-07-15
scope: CX-0 + CX-1
files_changed_by_audit: none
```

## 1. Current Codex environment

| Item | Finding |
|---|---|
| Installed CLI | `codex-cli 0.144.4` |
| Project `.codex/config.toml` | absent |
| Project `.codex/agents/**` | absent |
| Project `.agents/skills/**` | absent |
| Global `~/.codex/**` | not inspected or modified for project configuration |
| Repository trust requirement | project `.codex` layer loads only when trusted |

The requested `.codex/skills/**` target does not match the current official repository skill location. The reviewed implementation target is `.agents/skills/**`.

## 2. Existing structures

| Structure | Count | Purpose |
|---|---:|---|
| `.grok/agents/**` | 7 | Grok Atlas executor roles |
| `.grok/skills/**` | 8 | Grok runtime workflow adapters |
| `ai-ops/agents/**` | 13 | durable content-pipeline domain roles including template |
| `ai-ops/skills/**` | 8 | durable domain rules |
| `scripts/atlas/**` | 11 | deterministic checks and export utilities |

Key existing Grok executor coverage:

- explorer;
- source researcher;
- curriculum architect;
- content writer;
- interaction designer;
- implementer;
- independent reviewer.

Key AI-Ops domain coverage includes curriculum, research, source collection, lesson writing, quiz, terminology, fact check, education review, QA, site integration, release, illustration, and final editorial responsibilities.

## 3. Collision matrix

| Proposed Codex role | Existing overlap | Decision |
|---|---|---|
| repository-explorer | `.grok/atlas-explorer` | thin Codex adapter; no copied repository rules |
| research-worker | Grok source researcher + AI-Ops research/source collector | preprocessing-only boundary |
| source-verifier | AI-Ops fact check + SK-04 | reference SK-01/SK-04; final claim fitness only |
| curriculum-architect | Grok architect + AI-Ops curriculum | use Journey/Outcome/Node Gate SSOT |
| content-writer | Grok writer + AI-Ops lesson writer | student Markdown under exact allowlist only |
| interaction-designer | Grok interaction designer | P0 a11y/state adapter only |
| react-implementer | Grok implementer + site integration | bounded React execution only |
| qa-investigator | AI-Ops QA/release + scripts | classify script results; no edits |
| independent-reviewer | Grok reviewer + education/fact review | independent aggregation, never implementation |

The clearest new P0-specific value is in `practice-designer`, `repository-recovery`, `route-smoke`, and `studio-status-sync`. Other proposed contracts should primarily route to existing SSOT.

## 4. Naming decision

Keep the requested filenames for operator readability, but each agent contract must declare:

```text
Layer: Codex executor
Domain authority: referenced AI-Ops and education SSOT
Runtime peers: Grok adapters are separate and unchanged
```

Do not rename AI-Ops domain agents. Avoid naming a custom agent `explorer`, because it would override the built-in Codex agent with the same name.

## 5. Skill collision audit

| Proposed skill | Existing authority | Adapter rule |
|---|---|---|
| repository-recovery | P0 handoff + STATE + git rules | new thin recovery checklist |
| research-queue-processing | Research Queue + SK-01 | candidate classification only |
| claim-verification | SK-01 + SK-04 + source registry | reference, do not duplicate |
| curriculum-node-authoring | Journey/Outcome + Node Gate + SK-03 | reference and compose P0 fields |
| executable-practice | Node Gate practice contract | new P0-specific adapter |
| node-checkpoint | assessment + completion specs | bounded component/data workflow |
| interaction-accessibility | animation design system + Grok interaction skill | P0 reduced-motion/keyboard adapter |
| route-smoke | route list + scripts | new deterministic-first adapter |
| studio-status-sync | Matrix + status honesty | single-writer adapter |
| milestone-review | Node Gate + independent review contract | aggregation adapter |

`SK-07-quiz-design.md` is marked obsolete in its own body. New `node-checkpoint` work must follow the current assessment and Node Quality Gate SSOT instead of reviving SK-07 as authority.

## 6. Security and permission findings

1. `sandbox_mode` in a custom agent file can express a default, but spawned agents also operate under the parent task's active permission policy.
2. A TOML agent file does not enforce a repository-specific exact path allowlist.
3. Exact writes must be constrained by the reviewed Context Package, parent permission mode, agent instructions, git diff checks, and independent review.
4. Read-only roles should set `sandbox_mode = "read-only"` where supported and still receive an empty `allow_write_paths` list.
5. Writer and implementer roles should not receive workspace write access until a phase-specific exact allowlist is approved.

## 7. Working-tree finding

The P0 handoff expected a clean tree and `implementation_started: false`, but the live audit found existing modified and untracked P0-target files under:

- `content/practice/vibe-coding-foundation/**`;
- `src/features/learning-interactions/**`.

These changes predated the CX document writes in this session. Ownership was not inferred, and they were not modified, staged, reset, or cleaned. Therefore the correct claim is:

```text
CX work changed no P0 code.
The repository as a whole is not code-clean.
```

RP0-0 must reconcile this live state before any P0 continuation.

## 8. Audit conclusion

| Check | Result |
|---|---|
| Project Codex config already present | NO |
| Existing role/skill overlap | YES, substantial |
| Safe to copy Grok/AI-Ops contracts into Codex | NO |
| Thin adapter design feasible | YES |
| Safe to create `.codex` now | NO, review and explicit allowlist required |
| P0 code changed by CX audit | NO |
| Track D started | NO |

