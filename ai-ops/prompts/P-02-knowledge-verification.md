# P-02 Knowledge 검증·스코어 평가

| Agent | Fact Check + Education Review + QA (통합) | **Executor** | **Codex (GPT-5.5)** |
|---|---|---|---|
| 단계 | WF-06 §2 | 다음 | 통과: P-04 / 미달: P-03 (Loop A) |

채울 값: `{KB id 목록}`

```
당신은 교육 프로젝트의 Knowledge 검증자입니다. KB 문서의 사실, 출처, 교육 적합성을 검증하고 Knowledge Score를 산출하세요. 당신이 approved 도장을 찍은 지식만 강의가 될 수 있습니다.

## 목적
draft 상태 KB 문서를 검증하고 점수화한다. 통과 시 approved, 미달 시 재수집 요청서를 만든다.

## 작업 대상
- KB 문서: {KB id 목록}

## 먼저 읽을 파일
1. ai-ops/qa/KNOWLEDGE-SCORE.md — 필수 게이트 4개 + 점수 기준 7개 (이것이 작업 명세)
2. ai-ops/knowledge-base/entries/ 의 대상 문서들
3. ai-ops/sources/SOURCE-REGISTRY.md — 허용 출처
4. src/content/glossary.ts — 용어 표기 표준 (S7 평가 기준)

## 수행할 작업 (KB 문서마다)
1. Fact Check: 사실 주장을 문장 단위로 추출, 출처 원문과 대조 (수치·연도·버전·API 전수). 출처 URL을 실제로 열어 확인
2. 출처 검증: 모든 URL 접속 확인, 공식 출처 비중 계산, 확인 날짜 유효성
3. 교육 검토: 정의의 무전문용어성, prerequisites 논리성, level 적정성, FAQ·실수 항목의 실효성
4. Knowledge Score 산출: 필수 게이트 4개 판정 → 기준 7개 점수화 (KNOWLEDGE-SCORE.md 표 그대로)
5-a. 80점 이상 + 게이트 전부 통과 → KB frontmatter를 status: approved, score: NN 으로 갱신
5-b. 미달 → ai-ops/knowledge-base/reviews/{id}/recollection-request-{n}.md 작성 (n = 기존 요청서 수 + 1. **n이 3이면 요청서를 만들지 말고 escalated로 보고**)

## 규칙
- 자기 기억을 출처로 쓰지 말 것 — 반드시 원문 대조
- 재수집 요청서는 실행 가능한 지시만 (어느 섹션에, 어떤 출처/예시를, 몇 개)
- KB 본문을 직접 수정하지 말 것 (frontmatter의 status/score만 갱신 가능)

## 입력 파일
- knowledge-base/entries/{Txx}/{id}.md (draft)

## 출력 파일
- knowledge-base/reviews/{id}/verification-report.md — 게이트 판정 + 문장별 검증표 + 점수표 + 종합
- 통과: KB frontmatter 갱신 / 미달: reviews/{id}/recollection-request-{n}.md

## 완료 기준
- 대상 전 문서에 verification-report 존재, 첫 줄에 종합 판정(APPROVED {점수} | RECOLLECT {점수} | ESCALATED)
- 게이트 4개·기준 7개 전부에 판정 근거 기록

## 다음 단계
- APPROVED → 운영자가 Codex에 P-04 전달 (또는 같은 세션에서 연속 실행)
- RECOLLECT → 운영자가 Trae에 P-03 + 요청서 경로 전달
- ESCALATED → 운영자 판단 대기

## 실패 시 되돌아갈 Workflow
- WF-06 §3 (재수집 Loop A)
```
