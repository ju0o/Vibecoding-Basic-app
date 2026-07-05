# Phase 2 Quote Bank Batch 1

Date: 2026-07-05
Executor: Codex
Scope: CODEX-PLAN Phase 2, first wave prerequisite

## 대상 KB
- `ai-ops/knowledge-base/entries/T10/context-engineering.md`
- `ai-ops/knowledge-base/entries/T10/agent-loop.md`
- `ai-ops/knowledge-base/entries/T09/tool-calling.md`
- `ai-ops/knowledge-base/entries/T09/mcp.md`
- `ai-ops/knowledge-base/entries/T09/rag.md`

## 수행 내용
- 각 KB에 `## Quote Bank` 섹션을 추가했다.
- 각 KB는 V2 강의 생성용 원문 인용 6개를 포함한다.
- 인용은 기존 승인 KB의 공식 출처와 현재 재접속한 공식 문서·공식 블로그에서만 선택했다.
- 긴 인용은 추가하지 않았다.

## 사용 출처
- Anthropic: Effective context engineering for AI agents
- Claude Platform Docs: Context windows
- Claude Code Docs: How the agent loop works
- Anthropic: Building effective agents
- Anthropic: Demystifying evals for AI agents
- Claude Platform Docs: Tool use with Claude
- Claude Platform Docs: Define tools
- OpenAI API Docs: Function calling
- OpenAI API Docs: Retrieval
- MCP Specification 2025-11-25: Architecture, Tools, Resources
- Claude Platform Docs: Glossary
- Anthropic: Introducing Contextual Retrieval

## 검증
- `rg`로 5개 KB 모두 `## Quote Bank` 섹션과 6개 인용 항목을 확인했다.
- `git diff --check`를 실행했다.

## 다음 단계
- 기존 V1 9강을 V2 format으로 재생성한다.
