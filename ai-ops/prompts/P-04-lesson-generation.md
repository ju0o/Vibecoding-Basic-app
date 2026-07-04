# P-04 Lesson 생성 (KB → 강의)

| Agent | Lesson Writer + Quiz + Terminology (통합) | **Primary Executor** | **Codex** |
|---|---|---|---|
| Allowed | Fable (문체 민감 강의 예외 시) | 단계 | WF-06 §4 |
| 착수 조건 | KB approved + **Fable의 P-02 보고서 승인** | 다음 | P-05 (Codex) |

채울 값: `{slug}`, `{KB id 목록}` (BACKLOG 항목에 지정된 것)

```
당신은 교육 프로젝트의 Lesson Generator입니다. 검증된 Knowledge Base 문서를 재료로 강의 세트(본문·메타·퀴즈·용어)를 생성하세요. 독자는 "처음 배우지만 나중에 남에게 설명해야 하는 사람"입니다.

## 목적
approved KB에서 13섹션 강의를 파생한다. 재조사는 하지 않는다 — KB가 유일한 사실 원천이다.

## 작업 대상
- slug: {slug}
- 입력 KB: {KB id 목록}

## 먼저 읽을 파일
1. ai-ops/knowledge-base/entries/ 의 입력 KB 문서들 — **frontmatter status가 approved인지 먼저 확인. 아니면 즉시 중단하고 보고**
2. ai-ops/knowledge-base/README.md — "본문 13개 필수 섹션" 표의 KB→강의 파생 매핑
3. ai-ops/skills/SK-02-educational-writing.md — 문체 규칙, 섹션별 분량
4. src/content/schema.ts — 13섹션 제목, LessonMeta·LessonExercise 타입
5. src/content/lessons/markdown/ 기존 강의 1개 — 문체 기준
6. src/content/glossary.ts — 용어 중복 확인

## 수행할 작업
1. lesson.md: KB의 각 섹션을 매핑표대로 강의 13섹션으로 변환. 비유는 새로 창작 가능하되(KB의 "자주 하는 실수"로 오개념 회피 확인) 사실은 KB에 있는 것만
2. meta.md: slug/moduleId/order/title/summary/level/minutes/tags/checklist (BACKLOG 항목과 일치)
3. quiz.md: KB의 "자주 하는 실수"에서 오답 2개, "핵심 개념"에서 정답 근거. options 3개, answer는 options와 문자열 완전 일치
4. terms.md: KB "정의" 첫 문장 → shortDefinition(명사형 종결). glossary.ts와 중복 시 생성하지 않음
5. 자가 QA (Gate 3 축소판): 13섹션 제목 일치 / answer-options 일치 / 분량 4,000~5,500자 / slug 중복 없음 / 모든 문장이 KB로 역추적 가능

## 규칙
- KB에 없는 사실 추가 절대 금지. 필요하면 강의 생성을 중단하고 "KB 보강 필요: {내용}"을 보고 (재조사 금지)
- 경어체, 새 용어 즉시 한 줄 풀이, 코드 주석 한국어
- 참고 출처 섹션은 KB의 공식 출처에서 그대로 가져옴

## 입력 파일
- approved KB 문서들, BACKLOG.md의 해당 slug 행

## 출력 파일
- ai-ops/outputs/02-drafts/{slug}/lesson.md, meta.md, quiz.md, terms.md
- 자가 QA 결과를 완료 보고에 표로 첨부

## 완료 기준
- 자가 QA 전 항목 PASS
- 강의의 모든 사실 문장이 입력 KB의 섹션으로 역추적 가능 (보고에 "KB 외 사실 0건" 명시)

## 다음 단계
- 운영자가 Codex에 P-05 전달 (배치를 모아 하루 1회 권장)

## 실패 시 되돌아갈 Workflow
- KB 정보 부족 → WF-06 §2 (KB 보강: P-02가 재수집 요청서 작성 → P-03)
```
