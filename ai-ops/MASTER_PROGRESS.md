# MASTER_PROGRESS — 프로젝트 전체 진행 매트릭스

**유일한 상태 추적 파일** (구 outputs/PIPELINE.md 대체). 이 파일 하나로 전체 진행률을 파악한다.
갱신 규칙: 각 Executor는 자기 작업이 끝난 행의 해당 열만 갱신한다. 행 추가는 오케스트레이터(O-01 실행 시)만.

## 상태 기호
`—` 미착수 / `▶` 진행 중 / `↻n` 루프 n회차 / `✓` 완료 / `✗` 실패·에스컬레이션 / `n/a` 해당 없음

## Knowledge Base 매트릭스

| KB id (개념) | 주제군 | 수집(P-01) | 검증·Score(P-02) | 비고 |
|---|---|---|---|---|
| context-engineering | T10 | — | — | 1차 배치 후보 |
| tool-calling | T09 | — | — | 1차 배치 후보 |
| mcp | T09 | — | — | 1차 배치 후보 |
| rag | T09 | — | — | 1차 배치 후보 |
| agent-loop | T10 | — | — | 1차 배치 후보 |

## Lesson 매트릭스

| 강의 slug | 모듈 | 근거 KB | Lesson(P-04) | Site(P-05) | Verify(P-06) | Release(P-08) | 비고 |
|---|---|---|---|---|---|---|---|
| from-prompt-to-system | M10 | n/a (구 체제 파일럿) | ✓ | ✓ | **▶ 대기** | — | verify 미실행 — 운영 첫 작업 |
| context-engineering-basics | M10 | context-engineering | — | — | — | — | backlog 승인분 (order 2) |
| context-window-and-memory | M10 | context-engineering | — | — | — | — | order 3 |
| system-prompts-and-instruction-layers | M10 | context-engineering | — | — | — | — | order 4 |
| ai-workflow-design | M10 | agent-loop | — | — | — | — | order 5 |
| mcp-architecture-basics | M10 | mcp, tool-calling | — | — | — | — | order 7 |
| designing-reusable-skills | M10 | (skills KB 필요) | — | — | — | — | order 8 |
| agent-loop-anatomy | M10 | agent-loop, tool-calling | — | — | — | — | order 9 |
| subagents-and-delegation | M10 | agent-loop | — | — | — | — | order 10 |
| multi-agent-orchestration | M10 | (orchestration KB 필요) | — | — | — | — | order 11 |
| loop-engineering-basics | M10 | agent-loop | — | — | — | — | order 12 |
| harness-engineering-basics | M10 | (harness KB 필요) | — | — | — | — | order 13 |

(RAG·Tool Calling 신규 2강은 O-01 개정 승인 후 행 추가)

## 집계 (Executor가 행 갱신 시 함께 갱신)

| 단계 | 완료 / 전체 | 진행률 |
|---|---|---|
| Knowledge Base (approved) | 0 / 5 | 0% |
| Lesson 생성 | 1 / 12 | 8% |
| Site 반영 | 1 / 12 | 8% |
| Verify 통과 | 0 / 12 | 0% |
| Release | 0 / 12 | 0% |

## 예외 상태 로그 (✗·↻ 발생 시 append)

| 날짜 | 대상 | 상태 | 조치 |
|---|---|---|---|
| 2026-07-04 | from-prompt-to-system | Verify 대기 | 운영자 P-06 승인 필요 (구 체제 파일럿 잔여) |
