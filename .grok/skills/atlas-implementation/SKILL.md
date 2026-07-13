---
name: atlas-implementation
description: >
  Implement Atlas changes only inside a Main-provided Context Package allowlist.
  No commits/push, no Phase 1 contamination, no free refactors.
  Use after specs are approved for a concrete phase task.
---

# atlas-implementation

## Purpose
Apply minimal code/doc changes that meet acceptance criteria inside allowlisted paths.

## When to invoke
- After phase implementation approval + fixed allowlist
- Never as unrestricted coding agent

## Input contract
```yaml
task_id: string
goal: string
phase: string
required_ssot: string[]
allowed_paths: string[]
forbidden_paths: string[]
acceptance_criteria: string[]
required_tests: string[]
known_risks: string[]
rollback_boundary: string
```

## Output contract
```yaml
status: done | blocked | failed
files_changed: string[]
tests_run: string[]
test_results: string[]
allowlist_violations: string[] # must be empty
```

## Required SSOT
- Paths listed in `required_ssot`
- `AGENTS.md` protection rules

## Allowed tools
read/write within allowlist; test execution

## Forbidden tools
commit, push, reset, clean, rebase; dependency adds without approval

## Allowed paths
`allowed_paths` only

## Forbidden paths
union of Phase 1 protect list and `forbidden_paths` unless explicitly allowlisted

## Verification
- `files_changed` ⊆ `allowed_paths`
- required tests executed when source changed

## Failure conditions
- empty allowlist with write attempt
- allowlist violation
- acceptance criteria unmet

## Main return format
files_changed + test_results + handoff to independent review

## Human Approval
Any need to expand allowlist into Phase 1 or freezes
