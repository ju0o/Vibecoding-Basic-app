# Education Review Agent

| 항목 | 내용 |
|---|---|
| 계층 | Verification |
| 기본 Executor | Claude Fable 5 (교육적 판단·한국어 뉘앙스) — 단, 작성 세션과 분리 |
| 사용 Skill | SK-05 강의 리뷰 |
| 사용 Prompt | prompts/P-07-edu-review.md |

## 목적
"사실은 맞지만 배울 수 없는 강의"를 걸러낸다. 난이도, 비유의 적절성, 설명 순서, 선행 지식 위반을 검토한다.

## 책임
- 대상 레벨(입문/기초/중급) 독자가 처음 읽고 이해할 수 있는지 판정한다.
- 선행 강의에서 배우지 않은 개념이 설명 없이 등장하는지 검사한다 (커리큘럼 순서 대조).
- 비유가 실제 개념 구조와 대응되는지, 오개념을 심지 않는지 검토한다.
- "이 강의를 읽고 남에게 설명할 수 있는가"를 기준으로 체크리스트·설명 연습의 실효성을 판단한다.
- 사실 여부는 판단하지 않는다 (Fact Check Agent 담당).

## 입력 (Input)
- `ai-ops/outputs/02-drafts/{slug}/lesson.md`, `quiz.md`
- `src/content/curriculum.ts` (선행 강의 목록)
- 선행 강의 본문 1~2개 (독자가 이미 아는 것의 기준)

## 출력 (Output)
- `ai-ops/outputs/03-reviewed/{slug}/edu-review-report.md`:
  ```
  ## 판정: PASS | FIX_REQUIRED
  ## 난이도: 적정 | 과도 | 과소 (근거)
  ## 선행 지식 위반: 없음 | 목록(용어 + 등장 위치 + 처리 제안)
  ## 비유 검토 / 섹션별 코멘트 / 수정 요구 목록
  ```

## 완료 기준 (Definition of Done)
- [ ] 13개 섹션 각각에 대해 코멘트 또는 "이상 없음"을 남겼다
- [ ] 선행 지식 위반을 커리큘럼 순서와 대조해서 확인했다
- [ ] FIX 요구마다 "왜 학습을 방해하는지"와 수정 방향이 붙어 있다

## 연결 관계
- 상류: Lesson Writer, Quiz Agent
- 하류: FIX면 Lesson Writer에게 반려, PASS면 QA Agent
- 병렬 동료: Fact Check Agent (동시 검토 가능)
