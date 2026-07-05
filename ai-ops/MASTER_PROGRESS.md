# MASTER_PROGRESS — 프로젝트 전체 진행 매트릭스

**항목별 상태 매트릭스** (구 outputs/PIPELINE.md 대체). 실행 큐와 전이 규칙은 [STATE.md](STATE.md), 요약은 [DASHBOARD.md](DASHBOARD.md).
갱신 규칙 (O-03): **RUN 프롬프트의 종료 절차가 자동 갱신** — 사람이 편집하지 않는다. 행 추가는 O-01(Fable)만. 상태 값은 STATE.md 상태 기계의 명칭을 따른다.
Executor 체제 (2026-07-04~): **Codex** = 수집(P-01)·검증(P-02)·재수집(P-03)·Lesson(P-04)·반영(P-05)·빌드수정(P-07) / **Cline** = Verify(P-06)·Release(P-08) / **Fable** = O-01·O-02·Phase 5 사후 표본 감사. Trae 제외.

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
| subagents | T10 | ✓ | ✓ 91 (2026-07-05, O-05.2 연속 검증) | order 12 근거 |
| loop-engineering | T10 | ✓ | ✓ 88 (2026-07-05, O-05.2 연속 검증) | order 14 근거 |
| context-caching | T10 | ✓ | ✓ 89 (2026-07-05, O-05.2 연속 검증) | order 15 근거 |
| ai-system-evaluation | T10 | ✓ | ✓ 90 (2026-07-05, O-05.2 연속 검증) | order 16 근거 |
| tokenization-context | T08 | ✓ | ✓ 90 (Loop A 1회 후, 2026-07-05) | order 50 근거 |
| prompt-engineering | T08 | ✓ | ✓ 89 (2026-07-05, O-05.2 연속 검증) | order 51 근거 |
| grounding-citations | T08 | ✓ | ✓ 91 (2026-07-05, O-05.2 연속 검증) | order 52 근거 |
| hallucination-verification | T08 | ✓ | ✓ 90 (2026-07-05, O-05.2 연속 검증) | order 53 근거 |
| embeddings-similarity | T08 | ✓ | ✓ 88 (2026-07-05, O-05.2 연속 검증) | order 54 근거 |
| dev-environment-map | T01 | ✓ | ✓ 88 (2026-07-06) | order 2 근거 |
| vibe-coding-origin-karpathy | T08 | ✓ | ✓ 86 (Loop A 1회 후, 2026-07-06) | order 3 근거 / 특수 출처 승인 반영 |
| ai-learning-verification | T08 | ✓ | ✓ 92 (2026-07-06) | order 4 근거 |
| files-folders-paths | T01 | ✓ | ✓ 90 (2026-07-06) | order 6 근거 |
| terminal-shell-commands | T01 | ✓ | ✓ 88 (2026-07-06) | order 7 근거 |
| variables-types-data | T01 | ✓ | ✓ 92 (2026-07-06) | order 8 근거 |
| control-flow-functions-errors | T01 | ✓ | ✓ 92 (2026-07-06) | order 9 근거 |
| debugging-error-reading | T01 | ✓ | ✓ 89 (2026-07-06) | order 10 근거 |
| regex-code-search | T01 | ✓ | ✓ 87 (2026-07-06) | order 11 근거 |
| package-json-semver | T01 | ✓ | ✓ 85 (2026-07-06) | order 12 근거 / npm·SemVer registry 명시 권고 |

## Lesson 매트릭스

| 강의 slug | 모듈 | 근거 KB | Lesson(P-04) | Site(P-05) | Verify(P-06) | Release(P-08) | 비고 |
|---|---|---|---|---|---|---|---|
| development-environment-map | getting-started | dev-environment-map | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| vibe-coding-origin-karpathy | getting-started | vibe-coding-origin-karpathy | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| learning-with-ai-verification | getting-started | ai-learning-verification | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| from-prompt-to-system | M10 | n/a (구 체제 파일럿) | ✓ | ✓ | ✓ (2026-07-05, CODEX-PLAN V2 verify) | ✓ | V2 Wave 1, RELEASE-2026-07-05-v2-wave1.md |
| files-folders-and-paths | development-basics | files-folders-paths | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 7, RELEASE-2026-07-06-v2-wave7.md |
| terminal-shell-basics-reference | development-basics | terminal-shell-commands | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 8, RELEASE-2026-07-06-v2-wave8.md |
| variables-types-and-data-shapes | development-basics | variables-types-data | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| control-flow-functions-errors | development-basics | control-flow-functions-errors | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| debugging-error-reading | development-basics | debugging-error-reading | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| regex-for-code-search | development-basics | regex-code-search | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | ✓ | V2 Wave 9, RELEASE-2026-07-06-v2-wave9.md |
| package-json-and-semver | development-basics | package-json-semver | ✓ | ✓ | ✓ (2026-07-06, CODEX-PLAN P-06 verify) | — | CODEX-PLAN Phase 3 P-06 T01 Wave 3 verified, diagram included |
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
| subagents-and-delegation | M10 | agent-loop, subagents | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| multi-agent-orchestration | M10 | orchestration | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| loop-engineering-basics | M10 | agent-loop, loop-engineering | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| harness-engineering-basics | M10 | harness | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 3, RELEASE-2026-07-05-v2-wave3.md |
| context-caching-and-state | M10 | context-caching | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 4, RELEASE-2026-07-05-v2-wave4.md |
| ai-system-evaluation | M10 | ai-system-evaluation | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 4, RELEASE-2026-07-05-v2-wave4.md |
| tokenization-and-context | ai-basics | tokenization-context | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| prompt-engineering-foundations | ai-basics | prompt-engineering | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| grounding-and-citations | ai-basics | grounding-citations | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| hallucination-and-verification | ai-basics | hallucination-verification | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 5, RELEASE-2026-07-05-v2-wave5.md |
| embeddings-and-similarity | ai-basics | embeddings-similarity | ✓ | ✓ | ✓ (2026-07-05, O-05.2 verify) | ✓ | V2 Wave 6, RELEASE-2026-07-05-v2-wave6.md |

## 집계 (Executor가 행 갱신 시 함께 갱신)

| 단계 | 완료 / 전체 | 진행률 |
|---|---|---|
| Knowledge Base 수집(P-01) | 27 / 27 | 100% (6차 T01 5건 approved) |
| Knowledge Base (approved 이상) | 27 / 27 | 100% (1차 qa_approved 5건 + 2차 approved 3건 + 3차 approved 4건 + 4차 approved 5건 + 5차 approved 5건 + 6차 approved 5건) |
| KB Quote Bank (1차 qa_approved KB) | 5 / 5 | 100% |
| KB Quote Bank (2차 approved KB) | 3 / 3 | 100% |
| KB Quote Bank (3차 approved KB) | 4 / 4 | 100% |
| KB Quote Bank (4차 approved KB) | 5 / 5 | 100% (tokenization-context Loop A 후 승인) |
| KB Quote Bank (5차 approved KB) | 5 / 5 | 100% (vibe-coding-origin-karpathy Loop A 후 승인) |
| KB Quote Bank (6차 approved KB) | 5 / 5 | 100% |
| V2 regeneration Wave 1 | 9 / 9 | 100% |
| Lesson 생성 | 32 / 32 | 100% (CODEX-PLAN 확정 32강 V2 generated) |
| Site 반영 | 32 / 32 | 100% (CODEX-PLAN 확정 32강 integrated) |
| Verify 통과 | 32 / 32 | 100% (`npm run verify` PASS, package-json-and-semver P-08 대기) |
| Release | 31 / 32 | 97% (V2 Wave 1+2+3+4+5+6+7+8+9 released, deployment HOLD) |

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
| 2026-07-05 | CODEX-PLAN Phase 2 KB 3차 | 완료 | subagents·loop-engineering·context-caching·ai-system-evaluation P-01 draft 생성 후 P-02 approved |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 3차 P-02 | 완료 | subagents 91·loop-engineering 88·context-caching 89·ai-system-evaluation 90 APPROVED |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 Batch 3 | 완료 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 Batch 3 | 완료 | subagents-and-delegation·multi-agent-orchestration·loop-engineering-basics·harness-engineering-basics 사이트 반영, 검증 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-06/P-08 Batch 3 | 완료 | `npm run verify` PASS, V2 Wave 3 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 Batch 4 | 완료 | context-caching-and-state·ai-system-evaluation V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 Batch 4 | 완료 | context-caching-and-state·ai-system-evaluation 사이트 반영, 검증 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-06/P-08 Batch 4 | 완료 | `npm run verify` PASS, V2 Wave 4 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 4차 P-01 | 완료 | tokenization-context·prompt-engineering·grounding-citations·hallucination-verification·embeddings-similarity draft 생성, P-02 대기 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 4차 P-02 | 부분 완료 | prompt-engineering 89·grounding-citations 91·hallucination-verification 90·embeddings-similarity 88 APPROVED / tokenization-context 78 RECOLLECT ↻1 |
| 2026-07-05 | CODEX-PLAN Phase 2 KB 4차 Loop A | 완료 | tokenization-context P-03 citation 보정 후 P-02 재평가 90 APPROVED |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 T08 Wave 1 | 완료 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 T08 Wave 1 | 완료 | tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification 사이트 반영, `npm run lint`/`npm run typecheck` PASS |
| 2026-07-05 | CODEX-PLAN Phase 3 Verify/Release T08 Wave 1 | 완료 | `npm run verify` PASS, tokenization-and-context·prompt-engineering-foundations·grounding-and-citations·hallucination-and-verification V2 Wave 5 릴리스 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-04 T08 Wave 2 | 완료 | embeddings-and-similarity V2 Lesson Draft 생성, P-05 대기 |
| 2026-07-05 | CODEX-PLAN Phase 3 P-05 T08 Wave 2 | 완료 | embeddings-and-similarity 사이트 반영, `npm run lint`/`npm run typecheck` PASS |
| 2026-07-05 | CODEX-PLAN Phase 3 Verify/Release T08 Wave 2 | 완료 | `npm run verify` PASS, embeddings-and-similarity V2 Wave 6 릴리스 |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 5차 P-02 | 완료 | dev-environment-map 88·vibe-coding-origin-karpathy 86(Loop A)·ai-learning-verification 92·files-folders-paths 90·terminal-shell-commands 88 APPROVED |
| 2026-07-06 | CODEX-PLAN D-02 플랫폼 증분 | 완료 | 콜아웃 4종 렌더링 + noindex/robots/Basic Auth(SITE_PASSWORD) 구현, `npm run verify` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T01/T08 Wave | 완료 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths V2 Lesson Draft + diagrams 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T01/T08 Wave | 완료 | 4강 사이트 반영 + glossary/KB consumers/diagrams 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T01/T08 Wave | 완료 | `npm run verify` PASS, 4강 verified |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T01/T08 Wave | 완료 | development-environment-map·vibe-coding-origin-karpathy·learning-with-ai-verification·files-folders-and-paths V2 Wave 7 릴리스 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 Terminal Reference | 완료 | terminal-shell-basics-reference V2 Reference Draft + diagram 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 Terminal Reference | 완료 | terminal-shell-basics-reference 사이트 반영 + glossary/KB consumers/diagram 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 Terminal Reference | 완료 | `npm run verify` PASS, terminal-shell-basics-reference verified |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 Terminal Reference | 완료 | terminal-shell-basics-reference V2 Wave 8 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 6차 P-01 | 완료 | variables-types-data·control-flow-functions-errors·debugging-error-reading·regex-code-search·package-json-semver draft 생성, P-02 대기 |
| 2026-07-06 | CODEX-PLAN Phase 2 KB 6차 P-02 | 완료 | variables-types-data 92·control-flow-functions-errors 92·debugging-error-reading 89·regex-code-search 87·package-json-semver 85 APPROVED |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T01 Wave 2 | 완료 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search V2 Lesson Draft + diagrams 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T01 Wave 2 | 완료 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search 사이트 반영 + glossary/KB consumers/diagrams 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T01 Wave 2 | 완료 | `npm run verify` PASS, variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search 검증 통과 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-08 T01 Wave 2 | 완료 | variables-types-and-data-shapes·control-flow-functions-errors·debugging-error-reading·regex-for-code-search V2 Wave 9 릴리스, deployment HOLD |
| 2026-07-06 | CODEX-PLAN Phase 3 P-04 T01 Wave 3 | 완료 | package-json-and-semver V2 Reference Draft + diagram 생성, P-05 대기 |
| 2026-07-06 | CODEX-PLAN Phase 3 P-05 T01 Wave 3 | 완료 | package-json-and-semver 사이트 반영 + glossary/KB consumers/diagram 통합, `npm run lint`·`npm run typecheck` PASS |
| 2026-07-06 | CODEX-PLAN Phase 3 P-06 T01 Wave 3 | 완료 | `npm run verify` PASS, package-json-and-semver 검증 통과 |
