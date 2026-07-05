# Executor 배정 문서 (3-Executor 체제, 2026-07-04 개편)

> 2026-07-04 운영 정책 변경: **Trae 완전 제외.** 운영 구성은 Codex / Cline / Fable 3원 체제로 확정 (영구 정책). 변경 보고서: [../reports/2026-07-04-executor-refactor.md](../reports/2026-07-04-executor-refactor.md)

Executor = 실제로 프롬프트를 실행하는 AI 도구. **Agent(역할)와 Executor(도구)는 분리**되며, 프롬프트와 파일 규격은 Executor 이름을 몰라도 동작한다. 배정 변경은 이 문서만 고치면 된다.

## 역할표

| Executor | 담당 영역 | 프롬프트 (Primary) |
|---|---|---|
| **Codex (GPT-5.5)** | Knowledge Collection, Knowledge Verification, Documentation Production(Lesson 생성), Implementation(사이트 반영), Refactoring(빌드 수정) | P-01, P-02, P-03, P-04, P-05, P-07 |
| **Cline** | Verify, Test, Build, Release, Deployment, CI | P-06, P-08 |
| **Fable (Claude)** | Architecture, Planning, Curriculum, Workflow, QA, Project Management, Final Review | O-01, O-02 + Phase 5 사후 표본 감사 |

## 품질 안전장치 (Trae 제거로 재설계된 부분)

구 체제의 "Trae 수집 → Codex 교차 검증"이 사라지고 Codex 무정지 실행이 기본이므로, 지식 품질은 실행 내부의 원문 대조와 사후 감사로 지킨다:

1. **원문 재접속 대조 (필수)**: P-02는 P-01 직후 같은 흐름에서 실행할 수 있다. 단, 수집 때의 기억을 근거로 삼지 않고 모든 출처 URL을 다시 열어 verification-report에 대조 근거를 남긴다.
2. **Fable 사후 표본 감사**: P-04/P-05 흐름은 P-02 approved 후 끊기지 않고 진행한다. Fable은 Phase 5 개발 서버 확인 직후 표본 감사로 원문 일치·점수 산정 타당성을 확인한다.
3. 빌드 쪽 교차는 불변: **수정자(Codex P-07) ≠ 판정자(Cline P-06)**. Cline은 어떤 파일도 수정하지 않는다.

## 운영 체크리스트 (매 호출 시 이대로 — 고민 없이)

### ☐ Codex를 호출할 때
- 언제: ① 새 배치 시작(P-01) ② KB draft 완성(P-02 — 같은 흐름에서 연속 실행 가능) ③ 재수집 요청서 발생(P-03) ④ KB approved 후(P-04) ⑤ 강의 세트 완성 후 통합 창(P-05 — 단일 흐름만!) ⑥ BUILD-FAIL 발생(P-07)
- 프롬프트: 수집 **P-01** / 검증 **P-02** / 재수집 **P-03** / 생성 **P-04** / 반영 **P-05** / 빌드 수정 **P-07**
- 흐름 규칙: P-01→P-02→P-03 재평가를 같은 Codex 흐름에서 이어서 실행할 수 있다. P-05는 항상 단독 흐름
- 입력 확인: P-02는 draft KB / P-03은 recollection-request-{n}.md (**n=3이면 호출 금지, 에스컬레이션**) / P-04는 status: approved 이상 + verification-report / P-07은 BUILD-FAIL-{date}-{n}.md (**n=3이면 호출 금지, revert**)
- 출력 확인: KB 문서(13섹션) / verification-report(판정 첫 줄) / 02-drafts 4종+자가 QA표 / 04-integrated 기록+lint·typecheck 로그 / 수정 내역 append
- 다음: P-01→P-02 / P-02 통과→P-04, 미달→P-03 / P-04→P-05 / P-05→Cline P-06 / P-07→Cline P-06 재검증
- 실패 시: P-04에서 KB 부족 → P-02(KB 보강)로 / P-05 lint 실패 → 변경 되돌리고 보고

### ☐ Cline을 호출할 때
- 언제: ① P-05 통합 완료 직후(P-06) ② P-07 수정 완료 직후(P-06 재검증) ③ VERIFIED 확인 후(P-08)
- 프롬프트: 검증 **P-06** / 릴리스 **P-08**
- 입력 확인: P-06은 통합 완료된 워킹 트리 / P-08은 직전 P-06의 VERIFIED 보고
- 출력 확인: VERIFIED 보고 또는 BUILD-FAIL-{date}-{n}.md / RELEASE-{date}.md + 커밋 해시. **P-08 커밋에 src/content 변경이 포함됐는지 반드시 확인** (2026-07-04 누락 사례 — git show --stat으로 확인)
- 다음: VERIFIED→P-08 / FAILED→Codex P-07 / P-08 완료→운영자 배포 승인
- 실패 시: Cline은 수정하지 않는다 — 판정·보고만. 수정은 항상 Codex

### ☐ Fable을 호출할 때 (오케스트레이터 겸 QA)
- 언제: ① 새 배치 기획(O-01) ② Phase 5 개발 서버 확인 후 표본 감사 ③ 강의 10개 릴리스마다(O-02) ④ 루프 3회째·에스컬레이션 판단 ⑤ 배치 종료 시 DASHBOARD 갱신
- 프롬프트: **O-01**(커리큘럼) / **O-02**(최종 편집) / Phase 5 감사는 FABLE-AUDIT-PLAN 기준 수행
- 출력 확인: BACKLOG 갱신 / editorial 보고서 / 감사 보고서 / DASHBOARD 갱신
- 금지: 파이프라인 생산 작업(수집·집필·통합) 직접 수행 — 감독 기능 상실

공통: 호출 후 완료 보고 확인 → 산출물 파일 실존 확인 → [MASTER_PROGRESS.md](../MASTER_PROGRESS.md) 갱신.

## Executor별 상세

### Codex (GPT-5.5)
- 강점: 코드 편집·실행 신뢰성, 규격 준수 생성, 다중 세션 병렬 운용
- 맡기기 좋은 작업: KB 수집·검증, Lesson 생성, 사이트 반영, 빌드 수정
- **맡기면 안 되는 작업**: 원문 재접속 대조 없는 검증, 빌드 판정(Cline 소관), 커리큘럼·에스컬레이션 판단(Fable 소관)
- 출력 형식: KB 문서 / verification-report / 02-drafts 4종 / 04-integrated 기록

### Cline
- 강점: VS Code 내 커맨드 실행, 백엔드 모델 교체 가능(비용 조절)
- 맡기기 좋은 작업: verify 실행·판정, 릴리스·커밋, (향후) 배포·CI
- **맡기면 안 되는 작업**: 코드·콘텐츠 수정 전부(판정자 독립), 창의 작업, 지식 검증
- 출력 형식: VERIFIED/BUILD-FAIL 보고, RELEASE-{date}.md

### Fable (Claude)
- 강점: 장문 맥락 유지, 교육·아키텍처 판단, 한국어 뉘앙스
- 맡기기 좋은 작업: 커리큘럼(O-01), 최종 편집(O-02), Phase 5 사후 감사, 워크플로 개선안, 프로젝트 관리
- **맡기면 안 되는 작업**: 파이프라인 생산 작업(수집·집필·통합·릴리스) — 감독과 생산의 분리
- 출력 형식: BACKLOG, editorial-{date}.md, DASHBOARD 갱신, 개선안

## 병렬/순차 규칙 (3-Executor 기준)

| 구간 | 규칙 |
|---|---|
| P-01 수집 | **개념 간 병렬 OK** — Codex 다중 세션 (개념 1개 = 파일 1개) |
| P-01 ↔ P-02 | **연속 실행 OK** — 완성된 KB부터 같은 Codex 흐름에서 검증 가능. 단 원문 URL 재접속 대조 기록 필수 |
| P-03 재수집 ↔ 신규 P-01 | 병렬 OK (다른 개념이면) |
| P-04 강의 생성 | **slug 간 병렬 OK** — Codex 다중 세션 |
| Fable 감사 ↔ Codex 작업 | Phase 5 사후 감사로 수행 — P-04 착수 전 차단 게이트가 아니다 |
| P-05 반영 | **순차 전용** — 단일 세션, 하루 1회 통합 창 |
| P-06~P-08 | **순차 전용** — verify 중 파일 변경 금지 |

Codex가 수집·검증·생성을 모두 맡으므로 **Codex 처리 흐름이 처리량의 상한**이다. 병목 시 우선순위: P-02(검증) > P-05(통합) > P-01(수집) > P-04(생성) — 하류를 먼저 비운다.

## Executor 교체 절차 (불변)
1. 이 문서의 역할표만 수정 → 2. 새 Executor로 파일럿 1건 → 3. DoD·게이트 통과 확인 후 정식 전환. 프롬프트·워크플로 수정이 필요했다면 그 부분이 Executor 종속이었다는 뜻이므로 중립화한다.

## 실행 예시 (KB 5개 → 강의 3개 배치, 하루 사이클)

```
오전  Codex 흐름A·B: P-01 KB 수집 5건 (개념 나눠 병렬) → P-02 원문 재접속 검증
오후  Codex 흐름A:   P-03 재수집 (미달분) → P-02 재평가
      Codex 흐름B·D: P-04 Lesson 생성 3건 (approved KB, slug 병렬)
저녁  Codex 단독 세션: P-05 사이트 반영 (순차)
      Cline:         P-06 verify → (실패 시 Codex P-07 → Cline P-06) → P-08 릴리스
      Fable:         산출물 확인, MASTER_PROGRESS·DASHBOARD 갱신, 익일 계획
```
