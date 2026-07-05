# STATE — 실행 큐 + 상태 기계

**운영자는 이 파일의 "지금 할 일"만 보면 된다.** 갱신 주체: 각 RUN 프롬프트가 종료 시 재계산 (사람이 계산하지 않는다).

## 지금 할 일 (NEXT)

| # | 붙여넣을 프롬프트 | 어디에 | 이유 (자동 계산 근거) |
|---|---|---|---|
| 1 | `prompts/RUN-CODEX-PRODUCE.md` | Codex 생산 세션 | 강의 4건 `planned` + 근거 KB qa_approved (context-window-and-memory, system-prompts-and-instruction-layers, ai-workflow-design, agent-loop-anatomy) → P-04. 같은 세션의 다음 런에서 2차 KB 3건(`needed`: skills, orchestration, harness) P-01 |
| 2 | **운영자 결정** | — | Batch 1 배포 HOLD 해제: 배포 환경 선택 필요 (Vercel 권장 — `outputs/06-deployment/DEPLOY-REPORT-2026-07-05.md` 참조) |

승인 대기 (운영자 결정 필요): 배포 환경 (NEXT #2)
에스컬레이션: 없음

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
- 강의: **released 5강** (파일럿 + Batch 1 Final 4강 — 배포는 HOLD, 운영자 게이트) / **planned + KB 충족 6강** (order 3·4·5·11·12·14 — P-04 런당 4건 제한) / KB 대기 3강 (order 10·13·15)
- 루프 카운터: 없음 (rag Loop A 종결, Batch 1 빌드 재검증 1회 있었으나 VERIFIED로 종결)

## 이력 (전이 로그 — append 전용, 최근 10건)
| 일시 | 항목 | 전이 | 실행 |
|---|---|---|---|
| 2026-07-05 | KB skills·orchestration·harness | (등록) → needed | Fable O-01 |
| 2026-07-05 | Batch 1 4강 | verified → released (배포 HOLD) | Cline P-08 (5bafba1, 콘텐츠 커밋 보완 a0b6849) |
| 2026-07-05 | Batch 1 4강 | integrated → verified | Cline P-06 ×2 (93ca776, e69fb4b) |
| 2026-07-05 | Batch 1 4강 | planned → generated → integrated | Codex P-04/P-05 |
| 2026-07-05 | KB 5건 | approved → qa_approved | Fable QA-01 |
| 2026-07-05 | rag | recollect(1) → draft → approved | Codex P-03/P-02 |
| 2026-07-05 | KB 5건 | needed → draft → approved | Codex P-01/P-02 |
| 2026-07-04 | from-prompt-to-system | verified → released | Cline P-08 |
