# Codex RP0 Recovery Audit

```yaml
document: CODEX-RP0-RECOVERY-AUDIT
date: 2026-07-15
phase: RP0-0
decision: READY_FOR_CODEX_RP0_SCOPE_REVIEW
operator_scope: APPROVE_CODEX_RP0_RECOVERY
mode: recovery_and_measurement_only
track_d: paused
p0_implementation_started: false
git_write_commands_executed: false
push: false
deploy: false
```

## Goal and recovered scope

Restore the live repository state, classify all existing changes without guessing ownership, confirm protected and Track D boundaries, and prepare a candidate RP0-1 measurement scope. No Writer, Implementer, Source Verifier, or Reviewer was used.

Current authority:

```text
REMEDIATE_P0_ONLY
PAUSE_TRACK_D
RP0-0_ONLY
```

## Git state

| Field | Observed |
|---|---|
| Branch | `master` |
| HEAD | `272b2b175efefd4658c125788fa2cde3712a67fd` |
| HEAD subject | `ATLAS-OPS: add project-scoped Codex multi-agent configuration` |
| Working tree | dirty |
| Tracked unstaged | 3 |
| Untracked | 16 |
| Staged | 0 |
| Recovered baseline entries | 19 |
| Current after RP0 reports | 24: 5 tracked unstaged + 19 untracked |
| P0-related | 13 |
| Unknown owner | 14, including generated XLSX |
| Track D | 0 |
| Protected paths | 0 |

The previous handoff's clean-tree expectation is not current. The detailed record is in `CODEX-RP0-WORKING-TREE-INVENTORY.md`. The inventory records the 19-entry baseline before the five allowed RP0 report/state writes.

## P0 findings

### Practice B05-B09 and C01-C04

- Nine practice files exist in the working tree.
- All nine mechanically contain the six required headings: start, action, expected, fail, recover, and evidence.
- B05 is a tracked modification; B06-B09 and C01-C04 are untracked.
- Presence of headings does not prove executable quality, lesson consistency, or review approval.
- Classification: `P0_PARTIAL_UNVERIFIED`, owner `unknown_owner`.

### Quiz and Outcome C05-C10

- One untracked data file exports `QUESTIONS` and `OUTCOMES` for C05 through C10.
- Current page search finds NodeCheckpoint wiring only for B01-B04; no C05-C10 page wiring was found.
- Classification: `P0_PARTIAL_UNVERIFIED`, owner `unknown_owner`.

### Sources and verification

- Foundation lesson files measured: 25.
- Source/출처 heading found: 15.
- `verified_at` marker found: 19.
- `claim_scope` or `claimScope` marker found: 3.
- This remains incomplete against P0 source-scope requirements.

### Accessibility

- Two tracked components now reference an untracked shared reduced-motion hook.
- Current search found no remaining literal `reducedMotion={false}` under learning interactions.
- `AnimationShell.tsx` contains `aria-live="polite"`.
- No runtime, keyboard, browser, or React QA was executed in RP0-0.
- Classification of the four accessibility-related working-tree files: `P0_PARTIAL_UNVERIFIED`.

### Browser smoke

- No browser/smoke evidence report was found under `ai-ops/reports`.
- No browser smoke was run in RP0-0.

### Studio and Matrix

- `NODE_PRODUCTION_STATUS.md`, Matrix, and `CURRICULUM_MASTER.csv` exist.
- Matrix still records audit-with-remediation and full-contract complete count 0.
- No status synchronization was performed.

## Non-P0 changes

- Three untracked Codex CX design documents are `PREVIOUS_SESSION_ARTIFACT` and do not block RP0 read-only measurement.
- Two untracked Hermes-authored curriculum proposals are `UNRELATED_CHANGE`; they propose Module 0 and scope changes and are not authority for RP0.
- One untracked openpyxl workbook is `GENERATED_OUTPUT`; initiating owner is unknown.
- None was modified, staged, or adopted by RP0-0.

## Protected and freeze checks

| Check | Result |
|---|---|
| Phase 1 protected working-tree paths | PASS, none present |
| 21 concepts freeze | PASS |
| 14 sections freeze | PASS |
| Build Plan HOLD | PASS |
| Model Routing core mutation | PASS |
| Track D path mixing | PASS, none |

Commands:

```text
node scripts/atlas/check-protected-paths.mjs
node scripts/atlas/check-ssot-freezes.mjs
```

## Agent routing evidence

The approved Luna Explorer and GPT-5.4 Mini Auditor were launched in parallel in read-only, strict, ephemeral Codex executions. The initial broad attempt exceeded 120 seconds. A narrower retry against the 19 live entries exceeded 180 seconds. No result payload was recovered and no file writes were authorized.

Following the retry policy, the same work was not restarted a third time. Main completed the deterministic inventory with allowed Git read commands, SHA-256 hashing, file metadata, and existing Atlas check scripts. This is an execution-time limitation, not a data gap in the final inventory.

## Git command policy compliance

Used only read operations such as:

```text
git status --porcelain=v1 -uall
git diff --stat
git diff -- <path>
git log
git ls-files
Get-FileHash
```

Not executed:

```text
git reset / clean / checkout / restore / stash / add / commit / rebase / merge / push
```

## RP0-0 completion check

| Requirement | Result |
|---|---|
| Current Git state | PASS |
| Full change list | PASS, 19 entries |
| Classification | PASS |
| Track D mixing | PASS, none |
| P0 target mapping | PASS |
| Hash record | PASS, SHA-256 per file |
| Protected-path check | PASS |
| Candidate future write allowlists | PASS, next Context Package |
| Next routing | PASS, next Context Package |
| Existing P0 files unchanged by RP0-0 | PASS |

## Decision

```text
READY_FOR_CODEX_RP0_SCOPE_REVIEW
```

This does not adopt the 13 unknown-owner P0 files and does not authorize RP0-1.
