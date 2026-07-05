# STATE — 실행 큐 + 상태 기계

**운영자는 아래 "## NEXT" 블록만 보면 된다.** 갱신 주체: 각 RUN이 종료 시 NEXT_ACTION 블록을 이 파일에 덮어쓴다 (규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md) — 보고 끝 블록과 이 파일은 항상 동일).

## 🔄 체제 전환 (O-05, 2026-07-05): CODEX 전체 위임

운영 방식 변경 — RUN 릴레이 대신 **[CODEX-PLAN.md](CODEX-PLAN.md) 단일 계획서**로 Codex가 커리큘럼→수집→검증→강의→시각자료→구현 전체 수행. 운영자는 Phase 게이트 3곳(커리큘럼 승인 / 첫 V2 배치 품질 확인 / 배포)에서만 결정. Fable은 게이트 감사 보좌. O-04의 V2 규격·품질 게이트는 계획서에 그대로 내장됨. 구 RUN 프롬프트는 유효하나 CODEX-PLAN이 우선.

## 현황판 (O-03.1 필수 필드)

| 필드 | 값 |
|---|---|
| Current Batch | CODEX-PLAN Phase 0 (플랫폼 구현: V2 스키마·파서·UI + SVG 다이어그램 렌더링) |
| Current State | 강의 9강 V1 released·미배포 (전량 V2 재생성 대상) / KB 5건 qa_approved(Quote Bank 보강 필요) + 3건 needed |
| Last Completed Step | Fable O-05 (CODEX-PLAN 작성, 2026-07-05) |
| Next Executor | Codex |
| Next Prompt File | `CODEX-PLAN.md` (§8 시작 지시 그대로) |
| Blocker | 없음 |
| Required Human Action | None (다음 게이트: Phase 1 커리큘럼 승인) |
| Release Status | V1 9강 released·미배포 — V2 재생성 완료 전 배포 금지 |

## NEXT (직전 실행자의 NEXT_ACTION — 항상 이 블록이 최신)

```
NEXT_ACTION:
- Current State: CODEX-PLAN 체제 시작, Phase 0 대기
- Verdict: DONE (O-05 계획서 확정)
- Next Executor: Codex
- Next Prompt File: CODEX-PLAN.md — 세션에 "ai-ops/CODEX-PLAN.md를 읽고 Phase 0부터 시작하라"고 전달
- Why: 운영자 결정 — 단일 계획서 전체 위임 체제 (Phase 0 플랫폼 구현이 모든 콘텐츠 작업의 선행 조건)
- Required Operator Action: None (원하면 CODEX-PLAN.md 검토 후 "Reject: {항목}"으로 수정 지시)
- If Approved: (게이트 아님 — 바로 진행 가능)
- If Rejected: Fable이 CODEX-PLAN.md 개정
- Files to Check: ai-ops/CODEX-PLAN.md
- Stop Condition: Phase 게이트 1(커리큘럼)·2(첫 V2 배치 품질)·3(배포)에서 운영자 승인 없이 다음 Phase 진행 금지
```

## 상태 기계 (전이 규칙 — NEXT 계산의 유일한 근거)

### KB 항목
```
(없음) ──backlog에 KB 필요──▶ needed ──[PRODUCE: P-01]──▶ draft
draft ──[VERIFY: P-02]──▶ 점수≥80+게이트 → approved / 미달 → recollect(n)
recollect(n) ──[PRODUCE: P-03]──▶ draft (재평가 대상 표시)   ※ n=3 → escalated
approved ──[FABLE: 보고서 승인]──▶ qa_approved   ← 강의 생성의 전제
```

### 강의 항목
```
planned(backlog 승인 + 근거 KB 전부 qa_approved) ──[PRODUCE: P-04]──▶ generated
generated ──[PRODUCE: P-05, 단독 실행]──▶ integrated
integrated ──[CLINE: P-06]──▶ VERIFIED → verified / FAILED → build_fail(n)
build_fail(n) ──[PRODUCE: P-07]──▶ integrated (재검증 대상)   ※ n=3 → 통합 revert + escalated
verified ──[CLINE: P-08, 같은 런에서 연속]──▶ released
released ──[운영자: 배포 환경·승인]──▶ deploy_ready ──[CLINE: P-09]──▶ deployed
```

### RUN 우선순위 (한 런 = 최고 우선순위 단계 하나만 수행)
- PRODUCE 세션: `build_fail` P-07 > `generated 있음` P-05(이때 다른 작업 금지) > `recollect` P-03 > `planned` P-04 > `needed` P-01
- VERIFY 세션: `draft` P-02 (전건)
- CLINE: `integrated` P-06 → 통과 시 P-08 연속
- FABLE: `approved`(승인 대기) 검토 > 에스컬레이션 > backlog 소진 시 O-01 > 강의 10개 릴리스마다 O-02

### 사람(운영자) 게이트 — 이것만 사람이 결정한다
1. **배포 승인** (P-08 후 외부 공개)
2. **에스컬레이션 결정** (루프 3회, 주제 범위 재정의, 정책 변경)
3. (선택) 품질 스팟체크 — 원할 때 아무 산출물이나 열어 반려 가능

## 항목별 현재 상태 (요약 — 상세는 MASTER_PROGRESS.md)

- KB 1차: context-engineering·tool-calling·mcp·rag·agent-loop = **qa_approved** / KB 2차: skills·orchestration·harness = **needed** (O-01 등록 2026-07-05)
- 강의: **released 5강** (파일럿 + Batch 1 Final 4강 — 배포는 HOLD, 운영자 게이트) / **integrated 4강** (order 3·4·5·11 — Cline P-06 대기) / **planned + KB 충족 2강** (order 12·14) / KB 대기 3강 (order 10·13·15)
- 루프 카운터: 없음 (rag Loop A 종결, Batch 1 빌드 재검증 1회 있었으나 VERIFIED로 종결)

## 이력 (전이 로그 — append 전용, 최근 10건)
| 일시 | 항목 | 전이 | 실행 |
|---|---|---|---|
| 2026-07-05 | context-window-and-memory·system-prompts-and-instruction-layers·ai-workflow-design·agent-loop-anatomy | generated → integrated | Codex P-05 |
| 2026-07-05 | context-window-and-memory·system-prompts-and-instruction-layers·ai-workflow-design·agent-loop-anatomy | planned → generated | Codex P-04 |
| 2026-07-05 | KB skills·orchestration·harness | (등록) → needed | Fable O-01 |
| 2026-07-05 | Batch 1 4강 | verified → released (배포 HOLD) | Cline P-08 (5bafba1, 콘텐츠 커밋 보완 a0b6849) |
| 2026-07-05 | Batch 1 4강 | integrated → verified | Cline P-06 ×2 (93ca776, e69fb4b) |
| 2026-07-05 | Batch 1 4강 | planned → generated → integrated | Codex P-04/P-05 |
| 2026-07-05 | KB 5건 | approved → qa_approved | Fable QA-01 |
| 2026-07-05 | rag | recollect(1) → draft → approved | Codex P-03/P-02 |
| 2026-07-05 | KB 5건 | needed → draft → approved | Codex P-01/P-02 |
| 2026-07-04 | from-prompt-to-system | verified → released | Cline P-08 |
