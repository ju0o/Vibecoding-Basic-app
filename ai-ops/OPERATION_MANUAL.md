# 최종 운영 매뉴얼 (Operation Manual)

설계 종료(2026-07-04) 이후의 운영 절차. 새 설계를 추가하지 않는다 — 이 매뉴얼과 [prompts/README.md](prompts/README.md)만으로 운영한다.

## 하루 작업 시작 순서

1. [DASHBOARD.md](DASHBOARD.md)를 연다 → 병목·실패·Loop 확인
2. [MASTER_PROGRESS.md](MASTER_PROGRESS.md)에서 `▶`(진행 중)와 `↻`(루프) 행을 확인 — **어제 걸린 작업을 새 작업보다 먼저 푼다**
3. 오늘의 배치를 정한다 (권장: KB 3~5개 또는 강의 3~5개 — 두 배치를 동시에 다른 단계에서 돌려도 됨)
4. 아래 실행 순서대로 프롬프트를 전달한다

## Prompt 실행 순서 (운영 순서 그대로)

```
0. O-01 (Fable)   — 새 배치의 backlog·KB id 확정 시에만 (매일 아님)
1. P-01 (Trae)    — KB 수집·생성          [개념 간 병렬 OK]
2. P-02 (Codex)   — KB 검증·Score
3. P-03 (Trae)    — [Loop A] Score 미달 시에만 → P-02 재평가
4. P-04 (Codex)   — Lesson 생성            [slug 간 병렬 OK]
5. P-05 (Codex)   — 사이트 반영            [반드시 단일 세션 순차]
6. P-06 (Cline)   — Build·Lint·Test·verify
7. P-07 (Codex)   — [Loop B] verify 실패 시에만 → P-06 재검증
8. P-08 (Cline)   — Release (커밋, 배포는 운영자 승인)
9. O-02 (Fable)   — 강의 10개 릴리스마다 최종 편집 (매 배치 아님)
```

## Executor 호출 순서 (하루 리듬)

| 시간대 | 호출 | 내용 |
|---|---|---|
| 오전 | **Trae** (병렬 세션 가능) | P-01 신규 수집 + P-03 어제 미달분 재수집 |
| 오전~오후 | **Codex** | P-02 검증 (Trae 완료분부터) → approved 쌓이면 P-04 병렬 |
| 저녁 (통합 창 1회) | **Codex** → **Cline** | P-05 순차 반영 → P-06 verify → (P-07 루프) → P-08 |
| 배치 종료 | **Fable** | 산출물 확인, MASTER_PROGRESS·DASHBOARD 갱신, 익일 계획 |

## 병렬 가능 구간 / 순차 필수 구간

| 구간 | 규칙 |
|---|---|
| P-01, P-03 (지식 생산) | **개념 간 무제한 병렬** — Trae 다중 세션. 같은 개념의 P-02와 P-03 동시 실행만 금지 |
| P-04 (강의 생성) | **slug 간 병렬** — Codex 다중 세션 |
| 서로 다른 배치의 다른 단계 | 병렬 OK (배치 A가 P-06일 때 배치 B는 P-01) |
| P-05 (반영) | **순차 전용** — 항상 한 세션, 하루 1회 통합 창 권장 (curriculum.ts 단일 작성자) |
| P-06~P-08 (검증·릴리스) | **순차 전용** — verify 중 파일 변경 금지 |
| O-01의 backlog 수정, MASTER_PROGRESS 행 추가 | 오케스트레이터 단독 |

## Loop 발생 조건 (자동 되돌림)

| Loop | 발동 조건 | 경로 | 상한 |
|---|---|---|---|
| **A. 지식 루프** | Knowledge Score < 80 또는 필수 게이트(무출처 주장 등) 실패 | P-02가 재수집 요청서 생성 → Trae P-03 → P-02 재평가 | 2회. 3회째 미달 → `✗ escalated`, 운영자 판단 (주제 범위 재정의 등) |
| **B. 빌드 루프** | `npm run verify` 실패 | Cline이 BUILD-FAIL 보고서 → Codex P-07 (통합 실수만 수정) → Cline P-06 재검증 | 2회. 3회째 실패 → 통합 revert, 운영자 판단 |

루프 회차는 요청서/보고서 파일명의 `{n}`이 카운터다. **n=3이면 프롬프트를 실행하지 말 것.**

## 작업 종료 기준 (매 작업 공통)

작업 하나가 "끝났다"의 정의 — 세 가지 전부 충족:
1. 프롬프트에 명시된 **출력 파일이 실제로 존재**한다 (보고만 있으면 무효)
2. 완료 보고에 **완료 기준 체크 결과**가 명시돼 있다
3. **MASTER_PROGRESS.md의 해당 칸이 갱신**돼 있다

## Release 기준

- 배치 릴리스(P-08): `npm run verify` 4단계 전체 통과 + 릴리스 노트에 포함 콘텐츠(slug, 용어, KB id) 완전 나열 + git 커밋. **배포(push/hosting)는 운영자 승인 후에만**
- 모듈 "완성" 선언: [roadmap/FINAL-SITE-STRATEGY.md](roadmap/FINAL-SITE-STRATEGY.md) §9 기준 (목표 강의 전부 released + high 이슈 0건 + O-02 검토 완료)

## 문제 발생 시 (운영 중 개선 절차 — Design Freeze 이후 유일한 설계 변경 경로)

1. 문제를 `reports/`에 기록 (무엇이, 어느 단계에서, 왜)
2. 오케스트레이터(Fable)에게 개선안 제안을 요청
3. 운영자 승인 후에만 문서 수정 — 수정 시 해당 문서에 변경 사유와 날짜 기록
