# MASTER_PROGRESS — 프로젝트 전체 진행 매트릭스

**항목별 상태 매트릭스** (구 outputs/PIPELINE.md 대체). 실행 큐와 전이 규칙은 [STATE.md](STATE.md), 요약은 [DASHBOARD.md](DASHBOARD.md).
갱신 규칙 (O-03): **RUN 프롬프트의 종료 절차가 자동 갱신** — 사람이 편집하지 않는다. 행 추가는 O-01(Fable)만. 상태 값은 STATE.md 상태 기계의 명칭을 따른다.
Executor 체제 (2026-07-04~): **Codex** = 수집(P-01)·검증(P-02)·재수집(P-03)·Lesson(P-04)·반영(P-05)·빌드수정(P-07) / **Cline** = Verify(P-06)·Release(P-08) / **Fable** = O-01·O-02·P-02 승인. Trae 제외.

## 상태 기호
`—` 미착수 / `▶` 진행 중 / `↻n` 루프 n회차 / `✓` 완료 / `✗` 실패·에스컬레이션 / `n/a` 해당 없음

## Knowledge Base 매트릭스

| KB id (개념) | 주제군 | 수집(P-01) | 검증·Score(P-02) | 비고 |
|---|---|---|---|---|
| context-engineering | T10 | ✓ | ✓ 91 (Fable 승인 2026-07-05, QA-01) | 강의 order 2·3·4 근거 / Quote Bank 6개 보강 |
| tool-calling | T09 | ✓ | ✓ 88 (Fable 승인 2026-07-05, QA-01) | order 7·9·11 근거 / Quote Bank 6개 보강 |
| mcp | T09 | ✓ | ✓ 92 (Fable 승인 2026-07-05, QA-01) | order 9 근거 / Quote Bank 6개 보강 |
| rag | T09 | ✓ | ✓ 90 (Loop A 1회 후, Fable 승인 2026-07-05, QA-01) | order 8 근거 / Quote Bank 6개 보강 |
| agent-loop | T10 | ✓ | ✓ 91 (Fable 승인 2026-07-05, QA-01) | order 11·12·14 근거 / Quote Bank 6개 보강 |
| skills | T10 | ✓ | ✓ 93 (2026-07-05, O-05.2 연속 검증) | order 10 근거 |
| orchestration | T10 | ✓ | ✓ 89 (2026-07-05, O-05.2 연속 검증) | order 13 근거 |
| harness | T10 | ✓ | ✓ 90 (2026-07-05, O-05.2 연속 검증) | order 15 근거 |

## Lesson 매트릭스

| 강의 slug | 모듈 | 근거 KB | Lesson(P-04) | Site(P-05) | Verify(P-06) | Release(P-08) | 비고 |
|---|---|---|---|---|---|---|---|
| from-prompt-to-system | M10 | n/a (구 체제 파일럿) | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| context-engineering-basics | M10 | context-engineering | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| context-window-and-memory | M10 | context-engineering | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| system-prompts-and-instruction-layers | M10 | context-engineering | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| ai-workflow-design | M10 | agent-loop | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| context-engineering-mcp-skills | M10 | context-engineering, mcp, skills | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 2, RELEASE-2026-07-05-v2-wave2.md |
| tool-calling-basics | M10 | tool-calling | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| rag-fundamentals | M10 | rag | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| mcp-architecture-basics | M10 | mcp, tool-calling | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| designing-reusable-skills | M10 | skills | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 2, RELEASE-2026-07-05-v2-wave2.md |
| agent-loop-anatomy | M10 | agent-loop, tool-calling | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| subagents-and-delegation | M10 | agent-loop | — | — | — | — | order 12 |
| multi-agent-orchestration | M10 | (orchestration KB — 2차 배치) | — | — | — | — | order 13 |
| loop-engineering-basics | M10 | agent-loop | — | — | — | — | order 14 |
| harness-engineering-basics | M10 | (harness KB — 2차 배치) | — | — | — | — | order 15 |

## 집계 (Executor가 행 갱신 시 함께 갱신)

| 단계 | 완료 / 전체 | 진행률 |
|---|---|---|
| Knowledge Base 수집(P-01) | 8 / 8 | 100% (2차 3건 draft/P-02 대기) |
| Knowledge Base (approved 이상) | 8 / 8 | 100% (1차 qa_approved 5건 + 2차 approved 3건) |
| KB Quote Bank (1차 qa_approved KB) | 5 / 5 | 100% |
| KB Quote Bank (2차 draft KB) | 3 / 3 | 100% |
| V2 regeneration Wave 1 | 9 / 9 | 100% |
| Lesson 생성 | 11 / 15 | 73% |
| Site 반영 | 11 / 15 | 73% |
| Verify 통과 | 11 / 15 | 73% |
| Release | 11 / 15 | 73% (V2 Wave 1+2, deployment HOLD) |

## 예외 상태 로그 (✗·↻ 발생 시 append)

| 날짜 | 대상 | 상태 | 조치 |
|---|---|---|---|
| 2026-07-04 | from-prompt-to-system | ~~Verify 대기~~ **해소** | Cline P-06 실행, VERIFIED (커밋 739640b). P-08 릴리스만 남음 |
| 2026-07-04 | P-06 보고서 경로 | ~~프로세스 편차~~ **해소** | Cline의 신규 경로 `outputs/06-build-verification/`를 표준으로 확정, P-06 프롬프트에 명시 (Executor 리팩토링에 포함) |
| 2026-07-04 | P-08 커밋 누락 | **해소** | Cline P-08 커밋(45fd9e6)에 src/content 3파일 누락 → 후속 커밋 a389dee로 보완, P-08 프롬프트에 확인 규칙 추가 |
| 2026-07-04 | Executor 정책 변경 | 완료 | **Trae 완전 제외** — Codex/Cline/Fable 3원 체제. 작성자≠검증자는 "Codex 세션 분리 + Fable 승인"으로 대체 (freeze 개정 1호) |
| 2026-07-05 | rag Loop A | 해소 (↻1 → ✓) | 76점(S1 미등록 출처, S7 용어 부재) → 재수집 → 90점. 루프 메커니즘 첫 실전 작동 |
| 2026-07-05 | glossary.ts Loop A 중 직접 수정 | 관찰 (경미) | 재수집 요청서 지시로 RAG 용어가 P-05 밖에서 추가됨 — lint/typecheck 통과 확인, QA-01 커밋에 포함. 개선안: 재수집 중 src/content 수정 금지 + 용어 예약 목록 (운영자 승인 대기) |
| 2026-07-05 | P-08 커밋 누락 **재발** (Batch 1, 5bafba1) | 해소 | src/content 미포함 — 후속 커밋 a0b6849로 보완. 파일럿과 동일 패턴 2회째 → RUN-CLINE 종료 절차의 git show --stat 확인이 Batch 2부터 방지 |
| 2026-07-05 | Batch 1 배포 | **HOLD (운영자 게이트)** | 배포 인프라 미정 (vercel.json 등 부재) — 운영자의 배포 환경 결정 대기. `outputs/06-deployment/DEPLOY-REPORT-2026-07-05.md` |
| 2026-07-05 | CODEX-PLAN Phase 0 | 완료 | D-01 Content Format V2 구현, V1 fallback 전환기 규칙, `npm run verify` PASS |
| 2026-07-05 | CODEX-PLAN Phase 1 | 완료 | 100강 V2 커리큘럼·백로그 확정, Pillar 분포 A40/B15/C25/D20 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 2차 | 완료 | skills 93·orchestration 89·harness 90 APPROVED, O-05.2 연속 검증 첫 적용 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 | 완료 | context-engineering-mcp-skills·designing-reusable-skills V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05/verify/release | 완료 | context-engineering-mcp-skills·designing-reusable-skills 사이트 반영, `npm run verify` PASS, V2 Wave 2 릴리스 |
