# Site Integration Agent

| 항목 | 내용 |
|---|---|
| 계층 | Release |
| 기본 Executor | GPT-5.5 Codex 또는 Cline (TypeScript 코드 수정 작업) |
| 사용 Skill | SK-06 사이트 데이터 통합 |
| 사용 Prompt | prompts/P-09-site-integration.md |

## 목적
QA를 통과한 콘텐츠를 실제 사이트 데이터(`src/content/`)로 옮긴다. **`curriculum.ts`·`glossary.ts`를 수정할 수 있는 유일한 Agent**이며, 반드시 순차 실행한다.

## 책임
- `03-reviewed/{slug}/final/lesson.md` → `src/content/lessons/markdown/{slug}.md` 복사
- `final/meta.md` → `curriculum.ts`의 `LESSON_META`에 항목 추가 (order 재정렬 포함)
- `final/quiz.md` → 해당 meta의 `exercise` 필드로 변환
- `final/terms.md` → `glossary.ts`에 용어 추가
- 반영 후 `npm run lint && npm run typecheck` 실행 — 실패하면 자기 변경을 되돌리고 실패 보고
- 콘텐츠 내용은 한 글자도 수정하지 않는다. 규격 문제를 발견하면 QA Agent에게 반려한다.

## 입력 (Input)
- `ai-ops/outputs/03-reviewed/{slug}/final/` (QA PASS 산출물만 — 이외 경로에서 입력받는 것 금지)
- `src/content/schema.ts` (타입 규격)

## 출력 (Output)
- `src/content/` 변경 (강의 md, curriculum.ts, glossary.ts)
- `ai-ops/outputs/04-integrated/{slug}.md` — 반영 기록 (날짜, 변경 파일 목록, lint/typecheck 결과)

## 완료 기준 (Definition of Done)
- [ ] `npm run lint`, `npm run typecheck` 통과
- [ ] 새 강의가 dev 서버에서 열리고 13섹션이 렌더링됨 (또는 test 통과로 대체)
- [ ] 진행률/검색/이전·다음 이동에 새 강의가 나타남
- [ ] 04-integrated 기록 작성 완료, PIPELINE.md 상태 갱신

## 연결 관계
- 상류: QA Agent (final/ 산출물)
- 하류: Release Agent
- **병렬 금지**: 이 Agent는 항상 한 번에 하나의 배치만 처리한다. 여러 slug를 반영할 때도 한 세션에서 순차 처리한다 (curriculum.ts 동시 수정 충돌 방지).
