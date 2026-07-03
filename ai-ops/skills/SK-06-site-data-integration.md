# SK-06 Site Data Integration (사이트 데이터 통합)

Site Integration / Release Agent의 기술 절차. 이 프로젝트의 실제 데이터 규격에 결합돼 있다.

## 대상 파일과 규격
| 콘텐츠 | 대상 | 규격 출처 |
|---|---|---|
| 강의 본문 | `src/content/lessons/markdown/{slug}.md` | 13섹션 제목 = `schema.ts`의 `LESSON_SECTION_DEFINITIONS` |
| 강의 메타 | `src/content/curriculum.ts`의 `LESSON_META` | `LessonMeta` 타입 (slug, moduleId, order, title, summary, level, minutes, tags, checklist, exercise) |
| 퀴즈/설명연습 | meta의 `exercise` 필드 | `LessonExercise` 타입 |
| 용어 | `src/content/glossary.ts` | `GlossaryTerm` 타입 |
| 외부 링크 | `src/content/resources.ts` | `ResourceLink` 타입 |

## 통합 절차 (강의 1개 기준)
1. `final/lesson.md` → `src/content/lessons/markdown/{slug}.md` 복사 (내용 무수정)
2. `final/meta.md` + `final/quiz.md` → `LESSON_META`에 객체 추가
   - 같은 모듈 내 order 충돌 시: 기존 강의들의 order를 +1 밀고 기록에 남긴다
3. `final/terms.md` → `glossary.ts` 배열에 추가 (기존 항목 정렬 규칙 유지)
4. `npm run lint && npm run typecheck` — 실패 시 **모든 변경을 되돌리고** 실패 보고
5. (가능하면) `npm run dev`로 `/lessons/{slug}` 렌더링 확인, 검색에 노출 확인
6. `outputs/04-integrated/{slug}.md` 기록 작성

## 금지 사항
- 콘텐츠 문장 수정 (오탈자 발견 시에도 QA 반려로 처리)
- `schema.ts` 수정 (스키마 변경은 운영자 승인 + 별도 개발 작업)
- 여러 배치 동시 처리 (이 Skill은 항상 단일 세션 순차 실행)

## 릴리스 절차 (Release Agent)
1. `npm run verify` 실행, 로그 저장
2. 실패 → 실패 단계·로그를 `RELEASE-{date}.md`에 기록, Site Integration에 반려
3. 성공 → 릴리스 노트 작성 (추가된 강의 slug, 용어 수, 개정 목록)
4. 운영자 승인 후 배포 (커밋/푸시/호스팅 배포는 프로젝트 배포 방식 확정 후 이 문서에 추가)
