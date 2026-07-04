# Executor 변경 보고서 — Trae 제외, 3원 체제 전환

- 일자: 2026-07-04 / 지시: 운영자 (O-02, 영구 정책) / 수행: Fable
- Design Freeze 개정 1호 ([DESIGN-FREEZE.md](DESIGN-FREEZE.md) 개정 이력 참조)

## 변경 요약

| | 구 체제 (4-Executor) | 신 체제 (3-Executor) |
|---|---|---|
| 수집 (P-01, P-03) | Trae | **Codex 수집 세션** |
| 검증 (P-02) | Codex | **Codex 검증 세션 (수집과 분리) + Fable 승인** |
| 생성·반영·수정 (P-04·05·07) | Codex | Codex (불변) |
| 판정·릴리스 (P-06·08) | Cline | Cline (불변) |
| 기획·QA·최종 검토 (O-01·02) | Fable | Fable + **P-02 보고서 승인권 신설** |

## 핵심 설계 판단: 작성자≠검증자 원칙의 재구성

Trae(수집)→Codex(검증)의 모델 간 교차가 사라지는 것이 이 변경의 유일한 실질 리스크였다. 대체 장치 2겹:
1. **세션 분리 의무**: P-01과 P-02는 서로 다른 Codex 세션. 같은 컨텍스트가 자기 산출물을 검증하는 것을 구조적으로 금지
2. **Fable QA 승인**: P-02가 approved 판정을 내려도 Fable이 verification-report를 검토한 후에만 P-04 착수 — 다른 모델 계열의 시선을 판정 단계에 유지

빌드 쪽 교차(수정자 Codex ≠ 판정자 Cline)는 불변.

## 함께 확정한 운영 개선 2건 (freeze 개선 경로)
- P-06 통과 보고서 경로를 `outputs/06-build-verification/VERIFIED-{date}-{n}.md`로 확정 (Cline이 실전에서 만든 경로를 표준 채택)
- P-08에 "커밋에 src/content 포함 확인" 규칙 추가 (45fd9e6 누락 사례 → a389dee로 보완)

## 수정된 문서 (11) / 영향받은 프롬프트 (8)
- 문서: EXECUTORS.md(전면 재작성), prompts/README.md, OPERATION_MANUAL.md, WF-06, README.md, DASHBOARD.md, MASTER_PROGRESS.md, knowledge-base/README.md, qa/KNOWLEDGE-SCORE.md, ROADMAP.md, DESIGN-FREEZE.md(개정 이력), agents/source-collector-agent.md, agents/terminology-agent.md
- 프롬프트: P-01~P-08 전부 — 헤더를 **Primary Executor / Allowed / 세션 규칙** 구조로 통일. P-01·P-03(Trae→Codex 수집 세션), P-02(승인 게이트 추가), P-04(착수 조건 추가), P-06(보고서 경로), P-08(커밋 확인)
- 유지(의도적): CURRICULUM-MAP·COLLECTION-PLAN의 Trae 언급 — **교육 주제(M09 강의 소재·T11 출처)로서의 Trae**이지 운영 Executor가 아님. archive/·superseded 문서는 이력 보존

## 자체 검토: 더 단순해졌는가?

**단순해졌다.** 핸드오프 지점이 4개 Executor 경계에서 3개로 줄고, "누구에게 주지?"의 답이 사실상 둘(만들면 Codex, 판정하면 Cline)로 수렴한다. 프롬프트 헤더의 Primary/Allowed/세션 규칙 통일로 매 호출 판단이 표 읽기로 끝난다.
**대가**: ① 지식 검증의 교차가 모델 간 → 세션 간으로 약해짐 (Fable 승인으로 보강했으나 동일 모델의 계통 오류 가능성은 남음 — O-02 최종 편집에서 표본 재검증 권장) ② Codex 세션 수가 처리량 상한이 됨 (병목 우선순위 규칙으로 완화). 이 트레이드오프는 문서에 명시했고, 운영 데이터로 문제가 확인되면 freeze 개선 경로로 조정한다.

## 다음 실행 순서 (현재 진행 기준 재계산)
파일럿은 P-08까지 완주 완료. KB 0/5인 현 시점의 순서:
1. **Codex 수집 세션** ← P-01 (`{개념 목록}` = T10: context-engineering, agent-loop / T09: tool-calling, mcp, rag)
2. **Codex 검증 세션(새 세션)** ← P-02
3. (미달 시) Codex 수집 세션 ← P-03 → P-02 재평가
4. **Fable** — verification-report 승인
5. Codex ← P-04 (승인분부터) → 단독 세션 P-05 → Cline P-06 → (P-07) → P-08
