# 운영 매뉴얼 — Autopilot 체제 (O-03, 2026-07-05)

> 운영자가 하는 일은 **두 가지**다: ① AI 산출물 확인 ② 승인 또는 반려. 나머지 판단(다음 단계, Executor, 프롬프트 내용, 루프, 병렬)은 전부 [STATE.md](STATE.md)의 상태 기계와 상시 프롬프트가 수행한다.

## 운영자의 하루 (전체 절차)

```
1. 직전 Executor 보고의 맨 끝 NEXT_ACTION 블록을 본다 (또는 ai-ops/STATE.md의 NEXT 블록 — 같은 내용)
2. Required Operator Action이 "None"이면: Next Prompt File을 열어 그대로 복사 → Next Executor 세션에 붙여넣는다
3. Required Operator Action이 있으면: Files to Check의 파일을 열어 확인 → "Approve" 또는 "Reject: {사유}"만 말한다
   → Approve면 If Approved에 적힌 프롬프트를, Reject면 If Rejected에 적힌 경로를 따른다
4. 반복
```

**"다음에 뭐 하지?"라는 질문은 존재하지 않는다** — 모든 작업의 마지막이 다음 행동 지정으로 끝나기 때문이다.

## NEXT_ACTION 블록 규격 (O-03.1 — 모든 RUN·Fable 보고의 의무 종결부)

모든 Executor는 작업 보고를 반드시 아래 블록으로 끝내고, **같은 블록을 STATE.md의 "## NEXT" 섹션에 그대로 덮어쓴다** (보고와 STATE가 항상 일치).

```
NEXT_ACTION:
- Current State: {방금 전이된 상태 — 상태 기계 명칭}
- Verdict: {DONE | APPROVED | RECOLLECT | VERIFIED | FAILED | RELEASED | ESCALATED | HOLD}
- Next Executor: {Codex 생산 세션 | Codex 검증 세션 | Cline | Fable | 운영자}
- Next Prompt File: {prompts/RUN-*.md 경로 | "없음 (운영자 결정)"}
- Why: {상태 기계의 어느 전이 규칙 때문인지 한 줄}
- Required Operator Action: {None | Approve/Reject 대상과 판단 기준 한 줄}
- If Approved: {승인 시 다음 프롬프트/경로}
- If Rejected: {반려 시 되돌아갈 상태와 Loop (예: P-04 반려 → planned로 회귀, RUN-CODEX-PRODUCE 재실행)}
- Files to Check: {운영자가 열어볼 산출물 경로 1~3개}
- Stop Condition: {이 방향으로 진행을 멈춰야 하는 조건 (예: 루프 n=3, verify 실패)}
```

작성 규칙:
1. **Next Executor·Next Prompt File은 빈칸 금지** — 대기 상태가 없으면 "Fable / RUN-FABLE.md (기획)"이 기본값
2. 실패 시 If Rejected가 아니라 Verdict=FAILED + Next가 해당 Loop를 가리킨다 (Loop A→RUN-CODEX-PRODUCE(P-03), Loop B→RUN-CODEX-PRODUCE(P-07))
3. Required Operator Action은 진짜 결정만 적는다 — "확인해 주세요" 같은 의례적 요청 금지 (그건 None)

## 상시 프롬프트 4개 (전체 목록)

| 프롬프트 | 세션 | 하는 일 |
|---|---|---|
| [RUN-CODEX-PRODUCE](prompts/RUN-CODEX-PRODUCE.md) | Codex 생산 세션 | 상태를 읽고 P-07>P-05>P-03>P-04>P-01 중 최우선 1단계 실행 |
| [RUN-CODEX-VERIFY](prompts/RUN-CODEX-VERIFY.md) | Codex 검증 세션 (생산과 분리) | draft KB 전건 P-02 검증·Score |
| [RUN-CLINE](prompts/RUN-CLINE.md) | Cline | P-06 verify → 통과 시 P-08 릴리스 연속, deploy_ready면 P-09 배포 |
| [RUN-FABLE](prompts/RUN-FABLE.md) (또는 Fable에게 "run") | 이 대화 | 재대사, P-02 승인, 에스컬레이션 정리, O-01/O-02, DASHBOARD, **운영자 Approve/Reject 처리** |

모든 RUN은 **NEXT_ACTION 블록**으로 끝난다 — Codex가 끝나면 다음이 Cline인지 Fable인지 스스로 지정하고, Cline이 verify를 끝내면 P-07행인지 P-08행인지 스스로 판단하며, 실패는 되돌아갈 Loop를 명시한다. 운영자는 이 판단에 관여하지 않는다.

P-01~P-08은 이제 직접 붙여넣는 프롬프트가 아니라 **RUN이 참조하는 작업 명세 모듈**이다 (품질 규칙은 그대로 유효).

## 자동으로 처리되는 것 (운영자 개입 불필요)

| 판단 | 어떻게 자동화됐나 |
|---|---|
| 다음 Task 계산 | STATE.md 상태 기계 → Executor가 종료 시 NEXT 재계산 |
| Executor 선택 | RUN 프롬프트 = Executor 고정 매핑 (고를 것이 없음) |
| 프롬프트 파라미터 채우기 | RUN이 STATE/MASTER_PROGRESS에서 스스로 채움 |
| Loop 판단 (A·B) | 요청서/보고서 파일명의 {n} 카운터 — RUN이 자체 확인, n=3이면 자동 에스컬레이션 |
| 병렬 판단 | 상태 기계 우선순위에 내장 (P-05 단독 규칙 포함). 병렬을 원하면 생산 세션을 하나 더 여는 것뿐 |
| 상태 파일 갱신 | 각 RUN의 종료 절차에 의무화 (생략 시 런 무효) |
| 커밋 | RUN 종료 절차에 포함 + git show --stat 자기 확인 |
| Release 판단 | VERIFIED → P-08 자동 연속 (Cline 런 내부) |
| 산출물 존재 확인 | 이중 확인: 종료 보고에 경로 의무 + 다음 RUN이 시작 시 전제 확인 |

## 사람만 하는 것 (E — 자동화 불가)

1. **배포 승인** — released 상태의 외부 공개 (STATE NEXT에 "운영자:" 로 표시됨)
2. **에스컬레이션 결정** — 루프 3회 초과, 주제 범위 재정의, 정책·예산 변경
3. **반려권** — 아무 산출물이나 열어보고 "반려: {사유}"를 Fable에게 말하면 해당 항목이 이전 상태로 되돌아감 (선택적 스팟체크)

## 품질 게이트 (변경 없음 — 자동화는 게이트를 우회하지 않는다)

Knowledge Score 80+ / Fable QA 승인 / 세션 분리 / npm run verify / 판정자·수정자 분리 — 전부 유지. 달라진 것은 게이트 사이의 **이동**이 자동이라는 것뿐이다.

## 배치 리듬 (권장)

- 생산 세션과 검증 세션을 아침에 하나씩 열고, STATE NEXT를 따라 번갈아 실행
- P-05(통합)가 NEXT에 뜨면 그 런은 통합만 — 직후 RUN-CLINE
- Fable "run"은 하루 1~2회면 충분 (승인 대기가 쌓였을 때)

## 문제 발생 시

- RUN이 보고한 것과 파일 상태가 다르다 → Fable에게 "감사해줘" — 상태 재대사(reconciliation) 수행
- 문서 개선이 필요하다 → Fable에게 문제만 말하면 개선안을 만들어 승인을 요청 (freeze 개정 경로)
