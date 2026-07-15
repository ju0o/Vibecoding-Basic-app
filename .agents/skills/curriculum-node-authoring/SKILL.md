---
name: curriculum-node-authoring
description: Design an approved curriculum node around the student question, Why Now, outcomes, bridges, and Node Quality Gate.
---

# Purpose

Connect curiosity to evidence-linked solo capability before website work.

# When to use

Use only for operator-selected nodes after Education PM candidate selection and phase approval.

# Authority paths

- `ai-ops/roadmap/STUDENT_JOURNEY.md`
- `ai-ops/roadmap/LEARNING_OUTCOMES.md`
- `ai-ops/roadmap/EDUCATION_PM_OPERATING_MODE.md`
- `ai-ops/contracts/NODE_QUALITY_GATE.md`

# Inputs

Approved node IDs, student questions, prior outcomes, source status, and Context Package.

# Allowed writes

None by default. Exact curriculum specification paths only when allowlisted.

# Forbidden writes

New routes, unselected curriculum, frozen lessons, Track D, and website-first placeholders.

# Execution steps

1. Define Student Question and Why Now.
2. Define Observed, Assisted, Independent, and Explainable evidence.
3. Connect practice and quiz to those outcomes.
4. Add Previous Why and Next Why bridges.
5. Evaluate the node against the referenced Quality Gate.

# QA

Confirm every outcome has observable evidence and no website-complete claim precedes the full gate.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop if the node lacks operator selection, source scope, prerequisite clarity, or an approved write path.
