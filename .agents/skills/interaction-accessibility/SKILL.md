---
name: interaction-accessibility
description: Audit or design stateful learning interactions for keyboard, focus, aria-live, reduced motion, reset, retry, and recovery.
---

# Purpose

Ensure interactive learning remains operable, perceivable, and recoverable.

# When to use

Use for an approved interaction design or accessibility remediation unit.

# Authority paths

- `ai-ops/roadmap/ANIMATION_DESIGN_SYSTEM.md`
- `ai-ops/contracts/NODE_QUALITY_GATE.md`
- `.grok/skills/atlas-interaction-design/SKILL.md`
- phase-specific Context Package

# Inputs

Interaction component paths, state model, keyboard flow, motion behavior, and error states.

# Allowed writes

None by default. Exact interaction paths only when explicitly allowlisted.

# Forbidden writes

Heavy dependencies, new routes, text-only steppers, unrelated styling, and Track D.

# Execution steps

1. Confirm meaningful state change and reset/retry behavior.
2. Audit keyboard order, focus restoration, labels, and `aria-live`.
3. Respect reduced-motion preference without removing learning feedback.
4. Verify error, recovery, and mobile behavior.

# QA

Run applicable typecheck, tests, reduced-motion checks, and keyboard-focused review after implementation.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop on unapproved architecture changes, missing interaction outcomes, or inaccessible behavior that cannot be fixed in scope.
