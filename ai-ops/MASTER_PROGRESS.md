# MASTER_PROGRESS — 프로젝트 전체 진행 매트릭스

**유일한 상태 추적 파일** (구 outputs/PIPELINE.md 대체). 이 파일 하나로 전체 진행률을 파악한다.
갱신 규칙: 각 Executor는 자기 작업이 끝난 행의 해당 열만 갱신한다. 행 추가는 오케스트레이터(O-01 실행 시)만.
Executor 체제 (2026-07-04~): **Codex** = 수집(P-01)·검증(P-02)·재수집(P-03)·Lesson(P-04)·반영(P-05)·빌드수정(P-07) / **Cline** = Verify(P-06)·Release(P-08) / **Fable** = O-01·O-02·P-02 승인. Trae 제외.

## 상태 기호
`—` 미착수 / `▶` 진행 중 / `↻n` 루프 n회차 / `✓` 완료 / `✗` 실패·에스컬레이션 / `n/a` 해당 없음

## Knowledge Base 매트릭스

| KB id (개념) | 주제군 | 수집(P-01) | 검증·Score(P-02) | 비고 |
|---|---|---|---|---|
| context-engineering | T10 | — | — | **1차 배치 확정 (O-01, 2026-07-04)** — 강의 order 2·3·4 근거 |
| tool-calling | T09 | — | — | 1차 배치 확정 — order 7·9·11 근거 |
| mcp | T09 | — | — | 1차 배치 확정 — order 9 근거 |
| rag | T09 | — | — | 1차 배치 확정 — order 8 근거 |
| agent-loop | T10 | — | — | 1차 배치 확정 — order 11·12·14 근거 |

## Lesson 매트릭스

| 강의 slug | 모듈 | 근거 KB | Lesson(P-04) | Site(P-05) | Verify(P-06) | Release(P-08) | 비고 |
|---|---|---|---|---|---|---|---|
| from-prompt-to-system | M10 | n/a (구 체제 파일럿) | ✓ | ✓ | ✓ (2026-07-04, VERIFIED-2026-07-04-1) | ✓ | P-08 완료, RELEASE-2026-07-04.md |
| context-engineering-basics | M10 | context-engineering | — | — | — | — | backlog 승인분 (order 2) |
| context-window-and-memory | M10 | context-engineering | — | — | — | — | order 3 |
| system-prompts-and-instruction-layers | M10 | context-engineering | — | — | — | — | order 4 |
| ai-workflow-design | M10 | agent-loop | — | — | — | — | order 5 |
| tool-calling-basics | M10 | tool-calling | — | — | — | — | order 7 (O-01 추가) |
| rag-fundamentals | M10 | rag | — | — | — | — | order 8 (O-01 추가) |
| mcp-architecture-basics | M10 | mcp, tool-calling | — | — | — | — | order 9 |
| designing-reusable-skills | M10 | (skills KB — 2차 배치) | — | — | — | — | order 10 |
| agent-loop-anatomy | M10 | agent-loop, tool-calling | — | — | — | — | order 11 |
| subagents-and-delegation | M10 | agent-loop | — | — | — | — | order 12 |
| multi-agent-orchestration | M10 | (orchestration KB — 2차 배치) | — | — | — | — | order 13 |
| loop-engineering-basics | M10 | agent-loop | — | — | — | — | order 14 |
| harness-engineering-basics | M10 | (harness KB — 2차 배치) | — | — | — | — | order 15 |

## 집계 (Executor가 행 갱신 시 함께 갱신)

| 단계 | 완료 / 전체 | 진행률 |
|---|---|---|
| Knowledge Base (approved) | 0 / 5 | 0% |
| Lesson 생성 | 1 / 14 | 7% |
| Site 반영 | 1 / 14 | 7% |
| Verify 통과 | 1 / 14 | 7% |
| Release | 1 / 14 | 7% |

## 예외 상태 로그 (✗·↻ 발생 시 append)

| 날짜 | 대상 | 상태 | 조치 |
|---|---|---|---|
| 2026-07-04 | from-prompt-to-system | ~~Verify 대기~~ **해소** | Cline P-06 실행, VERIFIED (커밋 739640b). P-08 릴리스만 남음 |
| 2026-07-04 | P-06 보고서 경로 | ~~프로세스 편차~~ **해소** | Cline의 신규 경로 `outputs/06-build-verification/`를 표준으로 확정, P-06 프롬프트에 명시 (Executor 리팩토링에 포함) |
| 2026-07-04 | P-08 커밋 누락 | **해소** | Cline P-08 커밋(45fd9e6)에 src/content 3파일 누락 → 후속 커밋 a389dee로 보완, P-08 프롬프트에 확인 규칙 추가 |
| 2026-07-04 | Executor 정책 변경 | 완료 | **Trae 완전 제외** — Codex/Cline/Fable 3원 체제. 작성자≠검증자는 "Codex 세션 분리 + Fable 승인"으로 대체 (freeze 개정 1호) |
