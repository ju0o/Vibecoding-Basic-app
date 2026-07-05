# P-01 Knowledge Collection — Batch 2

Date: 2026-07-05  
Executor: Codex (Primary Executor, P-01 수집 세션)  
Scope: T10 skills, orchestration, harness

## 생성한 KB Draft

- `ai-ops/knowledge-base/entries/T10/skills.md`
- `ai-ops/knowledge-base/entries/T10/orchestration.md`
- `ai-ops/knowledge-base/entries/T10/harness.md`

## 완료 기준 자가 체크

| KB id | status | score | 필수 섹션 | Quote Bank | FAQ | 자주 하는 실수 |
|---|---|---|---|---:|---:|---:|
| skills | draft | null | 14/14 | 6 | 3 | 3 |
| orchestration | draft | null | 14/14 | 6 | 3 | 3 |
| harness | draft | null | 14/14 | 6 | 3 | 3 |

> 템플릿의 13섹션에 V2용 `Quote Bank`를 추가해 14개 `##` 섹션으로 작성했다.

## 사용한 공식 출처

### Skills

- Claude Platform Docs — Agent Skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- Claude Platform Docs — Skill authoring best practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- Claude Code Docs — Extend Claude with skills: https://code.claude.com/docs/en/skills
- Claude Code Docs — Agent Skills in the SDK: https://code.claude.com/docs/en/agent-sdk/skills
- Claude Code Docs — Tools reference: https://code.claude.com/docs/en/tools-reference
- Claude Code Docs — Extend Claude Code: https://code.claude.com/docs/en/features-overview

### Orchestration

- OpenAI API Docs — Orchestration and handoffs: https://developers.openai.com/api/docs/guides/agents/orchestration
- OpenAI API Docs — Agent definitions: https://developers.openai.com/api/docs/guides/agents/define-agents
- Anthropic Engineering — Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Business Guide — A practical guide to building AI agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- Claude Code Docs — How the agent loop works: https://code.claude.com/docs/en/agent-sdk/agent-loop
- Claude Platform Docs — Agent Skills: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- OpenAI API Docs — Sandbox Agents: https://developers.openai.com/api/docs/guides/agents/sandboxes

### Harness

- OpenAI API Docs — Sandbox Agents: https://developers.openai.com/api/docs/guides/agents/sandboxes
- OpenAI API Docs — Guardrails and human review: https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- OpenAI API Docs — Integrations and observability: https://developers.openai.com/api/docs/guides/agents/integrations-observability
- Claude Code Docs — Intercept and control agent behavior with hooks: https://code.claude.com/docs/en/agent-sdk/hooks
- Claude Code Docs — Configure permissions: https://code.claude.com/docs/en/permissions
- Claude Code Docs — Configure the sandboxed Bash tool: https://code.claude.com/docs/en/sandboxing
- Anthropic Engineering — Demystifying evals for AI agents: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

## 검증 필요 사항

- P-02에서 Citation Rule, 사실 정확성, Quote Bank 원문 일치, Knowledge Score를 별도 세션에서 검증해야 한다.
- `SOURCE-REGISTRY.md`에는 OpenAI 출처가 `https://platform.openai.com/docs`로 등록되어 있으나, 이번 수집은 최신 공식 API 문서 URL인 `https://developers.openai.com/api/docs/...`를 사용했다. P-02에서 동일 공식 문서 계열로 인정 가능한지 확인해야 한다.
- OpenAI Sandbox Agents 문서는 beta 상태라고 명시하므로, P-02에서 버전 의존/변경 가능성 표기 충분성을 확인해야 한다.

## 다음 단계

- P-01 명세상 자기 검증 금지: 이번 세션에서 P-02를 수행하지 않는다.
- 새 Codex 검증 세션에서 `prompts/RUN-CODEX-VERIFY.md`를 실행해 draft 3건을 검증한다.
