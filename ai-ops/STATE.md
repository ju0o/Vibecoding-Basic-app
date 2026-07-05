# STATE — 실행 큐 + 상태 기계

**운영자는 아래 "## NEXT" 블록만 보면 된다.** 갱신 주체: 각 RUN이 종료 시 NEXT_ACTION 블록을 이 파일에 덮어쓴다 (규격: [OPERATION_MANUAL.md](OPERATION_MANUAL.md) — 보고 끝 블록과 이 파일은 항상 동일).

## 현황판 (O-03.1 필수 필드)

| 필드 | 값 |
|---|---|
| Current Batch | Batch 2 (강의 order 3·4·5·11 integrated, P-06 대기) + Batch 1 배포 대기 |
| Current State | 강의 4건 `integrated` / KB 2차 3건 `needed` / Batch 1 5강 `released`(배포 HOLD) |
| Last Completed Step | Codex P-05 (Batch 2 사이트 반영, 2026-07-05) |
| Next Executor | Cline |
| Next Prompt File | `prompts/RUN-CLINE.md` |
| Blocker | 없음 (파이프라인) / 배포만 환경 미정 |
| Required Human Action | 배포 환경 결정 (병행 가능 — 파이프라인은 막지 않음) |
| Release Status | 5/14 released, 0 deployed (HOLD — 인프라 미정) |

## NEXT (직전 실행자의 NEXT_ACTION — 항상 이 블록이 최신)

```
NEXT_ACTION:
- Current State: 강의 4건 integrated (order 3·4·5·11)
- Verdict: DONE (P-05)
- Next Executor: Cline
- Next Prompt File: prompts/RUN-CLINE.md
- Why: 상태 기계 — integrated 존재 시 Cline이 P-06 verify를 수행하고 통과 시 P-08 릴리스 연속
- Required Operator Action: None (병행: 배포 환경 결정은 별도 대기 — Vercel 권장)
- If Approved: (해당 없음 — 운영자 게이트 아님)
- If Rejected: P-06 FAILED 시 build_fail(n)으로 전이 → Codex 생산 세션 / RUN-CODEX-PRODUCE.md (P-07)
- Files to Check: outputs/04-integrated/context-window-and-memory.md, outputs/04-integrated/system-prompts-and-instruction-layers.md, outputs/04-integrated/ai-workflow-design.md
- Stop Condition: P-06 FAILED 시 Cline은 build_fail(n) 기록 후 중단; n=3이면 에스컬레이션
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
