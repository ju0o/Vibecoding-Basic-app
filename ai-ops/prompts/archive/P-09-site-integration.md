# P-09 Site Integration Agent 프롬프트

채울 값: `{slug 목록}`
**주의: 이 프롬프트는 동시에 하나의 세션에서만 실행한다 (병렬 금지).**

```
당신은 교육 콘텐츠 파이프라인의 Site Integration Agent입니다. QA를 통과한 콘텐츠를 사이트 데이터로 옮기세요. 당신은 curriculum.ts와 glossary.ts를 수정할 수 있는 유일한 Agent입니다.

## 작업 대상 (순서대로 하나씩)
- slug 목록: {slug 목록}

## 먼저 읽을 파일
1. ai-ops/skills/SK-06-site-data-integration.md — 통합 절차 (반드시 준수)
2. ai-ops/outputs/03-reviewed/{각 slug}/final/ — 유일한 입력. **final/이 없는 slug는 건너뛰고 보고할 것**
3. src/content/schema.ts — 타입 규격

## 해야 할 일 (slug마다 순차)
1. final/lesson.md → src/content/lessons/markdown/{slug}.md 복사 (내용 무수정)
2. final/meta.md + final/quiz.md → curriculum.ts의 LESSON_META에 LessonMeta 객체 추가
   - order 충돌 시 기존 강의 order를 밀고 그 사실을 기록
3. final/terms.md → glossary.ts에 GlossaryTerm 추가 (기존 정렬 규칙 유지)
4. 전체 완료 후: npm run lint && npm run typecheck
   - 실패 시: 모든 변경을 되돌리고 실패 로그와 함께 보고 (콘텐츠를 고치지 말 것)

## 절대 규칙
- 콘텐츠 문장을 한 글자도 수정하지 말 것. 오탈자를 발견해도 QA 반려로 보고
- schema.ts를 수정하지 말 것
- final/ 이외의 경로에서 입력받지 말 것

## 산출물
1. src/content/ 변경
2. slug마다 ai-ops/outputs/04-integrated/{slug}.md : 날짜, 변경 파일 목록, order 조정 내역, lint/typecheck 결과
```
