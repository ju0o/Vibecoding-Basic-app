# STATE — 실행 큐 + 상태 기계

**운영자는 아래 "## NEXT" 블록만 보면 된다.** 갱신 주체: 각 RUN이 종료 시 NEXT_ACTION 블록을 이 파일에 덮어쓴다 (규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md) — 보고 끝 블록과 이 파일은 항상 동일).

## 🔄 체제 (O-05.1, 2026-07-05): CODEX 무정지 전체 실행

**[CODEX-PLAN.md](CODEX-PLAN.md) v2** — Codex가 커리큘럼(100강+)→수집→검증(Score 루프)→강의(V2 심층)→다이어그램→용어(300+)→Git 레퍼런스→사이트 완성→개발 서버 자가 점검까지 **멈춤 없이 실행**. 유일한 운영자 게이트 = 개발 서버 확인 후 배포 승인 (Phase 5). 막힌 항목은 BLOCKED 기록 후 계속 (전체 정지 금지). Fable은 사후 표본 감사.

## 현황판 (O-03.1 필수 필드)

| 필드 | 값 |
|---|---|
| Current Batch | CODEX-PLAN v2 전체 실행 (Phase 0~5) |
| Current State | Phase 2 진행: 1차 qa_approved KB 5건 Quote Bank 보강 완료 / V1 9강 V2 재생성 준비 |
| Last Completed Step | Codex Phase 2 Quote Bank Batch 1 (5 KB, 2026-07-05) |
| Next Executor | Codex |
| Next Prompt File | `CODEX-PLAN.md` §10 시작 지시 한 줄 |
| Blocker | 없음 |
| Required Human Action | None — 다음 개입 시점: Phase 5 (개발 서버 확인 → 배포 승인) |
| Release Status | V1 9강 released·미배포 — 배포는 Phase 5 승인 후에만 |

## NEXT (직전 실행자의 NEXT_ACTION — 항상 이 블록이 최신)

```
NEXT_ACTION:
- Current State: CODEX-PLAN Phase 2 진행 — 1차 qa_approved KB 5건 Quote Bank 보강 완료
- Verdict: DONE (Phase 2 Quote Bank Batch 1)
- Next Executor: Codex
- Next Prompt File: CODEX-PLAN.md — 세션에 §10의 시작 지시 한 줄을 전달:
  "ai-ops/CODEX-PLAN.md를 읽고 Phase 0부터 Phase 5(개발 서버 확인 보고)까지 멈춤 없이 실행하라."
- Why: CODEX-PLAN — 기존 V1 9강 재생성 첫 물결 전에 승인 KB 5건의 Quote Bank 5+ 보강 필요
- Required Operator Action: None — 다음 개입은 Codex의 Phase 5 보고 때 (개발 서버 확인 + 배포 승인)
- If Approved: (Phase 5 보고 후) 배포 환경 지정 → Codex가 §9 배포 수행
- If Rejected: (Phase 5 보고 후) "Reject: {항목}" → Codex가 수정 물결 후 §8 재실행
- Files to Check: ai-ops/outputs/01-briefs/phase-2-quote-bank-batch1.md, ai-ops/knowledge-base/entries/T10/context-engineering.md, ai-ops/knowledge-base/entries/T09/rag.md
- Stop Condition: Codex는 Phase 5에서만 정지. 품질 불변 조건(§1) 우회 금지
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

- KB 1차: context-engineering·tool-calling·mcp·rag·agent-loop = **qa_approved + Quote Bank 6개씩 보강 완료** / KB 2차: skills·orchestration·harness = **needed** (O-01 등록 2026-07-05)
- 강의: **released 5강** (파일럿 + Batch 1 Final 4강 — 배포는 HOLD, 운영자 게이트) / **integrated 4강** (order 3·4·5·11 — Cline P-06 대기) / **planned + KB 충족 2강** (order 12·14) / KB 대기 3강 (order 10·13·15)
- 루프 카운터: 없음 (rag Loop A 종결, Batch 1 빌드 재검증 1회 있었으나 VERIFIED로 종결)

## 이력 (전이 로그 — append 전용, 최근 10건)
| 일시 | 항목 | 전이 | 실행 |
|---|---|---|---|
| 2026-07-05 | KB 5건 | qa_approved → qa_approved + Quote Bank 5+ | Codex Phase 2 |
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
