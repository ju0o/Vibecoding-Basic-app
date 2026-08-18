# Codex Model Routing Policy

```yaml
document: CODEX-MODEL-ROUTING-POLICY
status: review_ready
date: 2026-07-15
classification: project_executor_policy
not_a_claim: universal_industry_standard
```

## 1. Purpose

Choose the least expensive capable model for each bounded task while reserving stronger models for ambiguity, risk, and independent judgment. The router selects only the agents needed for the current stage; it never broadcasts a task to every model.

This is a project policy, not an official universal tier system.

## 2. Verified model identifiers

The current Codex manual documents these identifiers or examples:

| Display name | Config identifier | Project use |
|---|---|---|
| GPT-5.6 Sol | `gpt-5.6-sol` | chief, high-risk conflict, final decision |
| GPT-5.6 Terra | `gpt-5.6-terra` | bounded professional work and verification |
| GPT-5.6 Luna | `gpt-5.6-luna` | clear, repeatable, high-volume read work |
| GPT-5.5 | `gpt-5.5` | cross-review and practice-quality judgment |
| GPT-5.4 | `gpt-5.4` | pattern-following implementation and debugging |
| GPT-5.4 Mini | `gpt-5.4-mini` | mechanical checks and log classification |

Codex model availability can vary by account and workspace. Before agent installation, the operator or Chief must confirm that every configured identifier appears in the active model catalog. An unavailable model blocks only the affected agent definition; it does not authorize an invented alias.

Source: [Codex models](https://learn.chatgpt.com/docs/models) and [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## 3. Routing table

| Task class | First choice | Effort | Escalate when |
|---|---|---:|---|
| file/path/status/frontmatter/log check | `gpt-5.4-mini` | low | results conflict or require domain judgment |
| repository scan and queue preprocessing | `gpt-5.6-luna` | low/medium | ambiguity affects scope or claims |
| scoped content, curriculum, source verification | `gpt-5.6-terra` | medium/high | SSOT conflict, high-risk claim, or broad architecture |
| existing-pattern React/code work | `gpt-5.4` | high | architecture must change or two attempts fail |
| practice quality and independent cross-review | `gpt-5.5` | high | reviewer conflict or milestone decision |
| whole-plan integration, security, irreversibility, conflict | `gpt-5.6-sol` | high/xhigh | human approval condition is reached |

## 4. Task Router decision rules

```text
deterministic?       -> script
clear repeatable read? -> Mini or Luna
bounded domain judgment? -> Terra
pattern-following code? -> GPT-5.4
independent quality review? -> GPT-5.5
ambiguous/high-risk/final integration? -> Sol
```

Additional rules:

1. A script result does not become a curriculum judgment without a qualified agent.
2. Research-worker collects candidates; source-verifier decides claim fitness.
3. Implementer and independent reviewer must be different agent threads.
4. Sol does not perform bulk file inventory, formatting, or repetitive QA.
5. One task gets one primary model. Add a reviewer only when the workflow gate requires it.
6. Escalation uses the smallest stronger step that addresses the failure.

## 5. Agent assignments

| Agent | Model | Effort | Rationale |
|---|---|---:|---|
| education-chief | `gpt-5.6-sol` | high | whole-goal integration and gate judgment |
| repository-explorer | `gpt-5.6-luna` | low | read-heavy, repeatable mapping |
| research-worker | `gpt-5.6-luna` | medium | source-candidate preprocessing |
| mechanical-auditor | `gpt-5.4-mini` | low | deterministic-like checks and summaries |
| source-verifier | `gpt-5.6-terra` | high | scoped official-source judgment |
| curriculum-architect | `gpt-5.6-terra` | high | outcomes and learning-flow design |
| content-writer | `gpt-5.6-terra` | medium | bounded student-facing writing |
| practice-designer | `gpt-5.5` | high | executable-practice and evidence quality |
| interaction-designer | `gpt-5.6-terra` | high | bounded interaction and accessibility design |
| react-implementer | `gpt-5.4` | high | existing-pattern code integration |
| qa-investigator | `gpt-5.4-mini` | medium | failure location and log classification |
| independent-reviewer | `gpt-5.5` | high | independent cross-check |

Independent reviewer escalation:

```yaml
trigger:
  - reviewer conflict
  - security or irreversible change
  - SSOT authority conflict
  - RP0-11 milestone decision
model: gpt-5.6-sol
effort: high_or_xhigh_if_supported
```

## 6. Prohibited routing

- Do not call all models for comparison by default.
- Do not use Mini for educational philosophy, architecture, complex bugs, or final review.
- Do not let Luna make final factual or milestone judgments.
- Do not use Terra Writer to approve its own content.
- Do not use GPT-5.4 Implementer to expand the design.
- Do not use Sol for tasks that scripts, Mini, or Luna can close reliably.
- Do not treat model names, access, pricing, or limits as current facts without official verification.

## 7. Token controls

- Explorer and auditor results: 10-20 lines unless evidence requires more.
- Do not paste full SSOT bodies into delegated prompts.
- Return log path plus summary, not raw logs.
- Reuse a completed repository map until git status or scope changes.
- Close completed agent threads.
- No new phase below 15% remaining context; handoff-only below 5%.

## 8. Retry policy

```text
failure 1 -> same agent + exact failure delta
failure 2 -> next capable specialist or stronger model
failure 3 -> BLOCKED / HUMAN_APPROVAL_REQUIRED
```

Escalation does not broaden the task, write paths, or authority.

