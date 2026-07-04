# AI 운영 Dashboard

운영자용 한눈 현황판. **원본 데이터는 [MASTER_PROGRESS.md](MASTER_PROGRESS.md)** — 이 파일은 거기서 파생된 요약이다.
갱신 주체·주기: 오케스트레이터(Fable)가 배치 종료 시(P-08 후 또는 하루 끝) 1회 갱신. 수동 편집 열은 없음 — 전부 MASTER_PROGRESS와 실행 기록에서 집계.

## 마지막 갱신: 2026-07-05 (QA-01: Knowledge Batch 1 승인 — P-04 진행 가능)

## 단계별 진행률

| 단계 | 진행률 | 상세 |
|---|---|---|
| Knowledge Base | `██████████` 100% (5/5, 1차 배치) | 평균 Score 90.4, QA-01 승인 완료 |
| Lesson 생성 | `█░░░░░░░░░` 7% (1/14) | 파일럿 1강만 — **P-04 착수 가능 (9강의 KB 확보)** |
| Fact Check (KB 검증) | `██████████` 100% (5/5) | rag는 Loop A 1회 후 통과 |
| Site Integration | `█░░░░░░░░░` 8% (1/12) | |
| Build / Verify | `█░░░░░░░░░` 7% (1/14) | 파일럿 VERIFIED (Cline P-06, 커밋 739640b) |
| Release | `█░░░░░░░░░` 7% (1/14) | **파일럿 릴리스 완료** (Cline P-08, 45fd9e6 + 콘텐츠 커밋 a389dee) |

## Executor별 현재 작업

| Executor | 현재 작업 | 상태 |
|---|---|---|
| Codex | P-01·P-02 완료 (KB 5건) | **호출 준비 완료 — P-04 (권장 1차: context-engineering-basics, tool-calling-basics, rag-fundamentals, mcp-architecture-basics)** |
| Cline | (없음) | 대기 — 이번 배치 P-05 후 P-06 |
| Fable | QA-01 완료 (Batch 1 APPROVED) | 다음: P-04 산출물의 통합 창 관리, 강의 10개 시 O-02 |

## 현재 병목 (Bottleneck)

1. ~~KB 0건~~ 해소 (5/5 승인). 현재 병목: **P-04 미착수** — approved KB 9강 분량이 대기 중
2. 구조적: Codex가 수집~반영을 전담하므로 **Codex 세션 수 = 처리량 상한** (병목 시 우선순위: P-02 > P-05 > P-01 > P-04)

## 실패한 작업
(없음)

## Loop 진행 중인 작업
(없음) — Loop A(재수집)·Loop B(빌드 수정) 발생 시 여기에 `대상 / 루프 종류 / 회차 n/2` 기록

## 최근 완료된 작업 (최신 5개)

| 날짜 | 작업 | 담당 |
|---|---|---|
| 2026-07-05 | **QA-01: Knowledge Batch 1 승인** (5건, 평균 90.4) — P-04 Proceed | Fable |
| 2026-07-05 | KB 1차 배치 P-01 수집 + P-02 검증 (rag Loop A 1회 포함) | Codex |
| 2026-07-04 | Executor 리팩토링 — Trae 제외, 3원 체제 (freeze 개정 1호) | Fable |
| 2026-07-04 | 파일럿 릴리스 완료 (P-08) — **파이프라인 첫 완주** | Cline |
| 2026-07-04 | 파일럿 VERIFIED (P-06) | Cline |
| 2026-07-04 | O-01: M10 = 15강, 1차 KB 배치 확정 | Fable |
| 2026-07-04 | 설계 종료 (Design Freeze) | Fable |
| 2026-07-04 | KB 중심 리팩터링 (WF-06, Knowledge Score) | Fable |
| 2026-07-04 | 파일럿 강의 통합까지 완료 (verify 대기) | Fable(파일럿 단독) |
| 2026-07-03 | ai-system-design 모듈 분해 (12강 backlog) | Fable |
| 2026-07-03 | ai-ops 운영 체계 구축 + git 초기화 | Fable |

## 갱신 절차 (오케스트레이터)
1. MASTER_PROGRESS.md의 매트릭스·집계를 읽는다
2. 단계별 진행률 표의 분수·바를 갱신한다 (바: 10칸, 반올림)
3. Executor 표는 "마지막으로 전달한 프롬프트와 그 완료 여부"로 채운다
4. 병목 = 가장 오래 `▶`에 머무는 항목 + 유휴 원인. 실패/Loop = MASTER_PROGRESS 예외 로그에서 복사
