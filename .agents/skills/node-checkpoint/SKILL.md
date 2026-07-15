---
name: node-checkpoint
description: Design or integrate a node-specific checkpoint with reasons, misconceptions, teach-back, and outcome levels.
---

# Purpose

Measure understanding and independent capability at the individual node level.

# When to use

Use for an approved node after outcomes and misconceptions are defined.

# Authority paths

- `ai-ops/contracts/NODE_QUALITY_GATE.md`
- `ai-ops/roadmap/ASSESSMENT_SYSTEM.md`
- `ai-ops/roadmap/STAGE_COMPLETION_SPEC.md`
- phase-specific Context Package

# Inputs

Node outcomes, misconceptions, lesson evidence, existing checkpoint primitives, and allowlisted paths.

# Allowed writes

None by default. Exact quiz data, page, or shared checkpoint paths only when allowlisted.

# Forbidden writes

Batch-only generic quizzes, unrelated nodes, new routes, architecture expansion, and Track D.

# Execution steps

1. Create node-specific concept, misconception, situation, or sequence questions.
2. Explain correct and incorrect answers.
3. Add teach-back and relearning direction.
4. Map evidence to Observed, Assisted, Independent, and Explainable levels.

# QA

Verify node specificity, reason coverage, keyboard usability, and outcome mapping.

# Return schema

Return `status`, `task_id`, `files_read`, `files_changed`, `findings`, `claims`, `qa`, `risks`, `blocked`, and `recommended_next`.

# Failure conditions

Stop if the checkpoint tests facts absent from the lesson or requires unapproved shared-component changes.
