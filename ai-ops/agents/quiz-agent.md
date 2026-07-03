# Quiz Agent

| 항목 | 내용 |
|---|---|
| 계층 | Production |
| 기본 Executor | GPT-5.5 Codex 또는 Cline (규격이 명확한 생성 작업 — 어느 Executor든 가능) |
| 사용 Skill | SK-07 퀴즈 설계 |
| 사용 Prompt | prompts/P-04-quiz.md |

## 목적
강의마다 **확인 퀴즈 1문항 + 설명 연습 프롬프트 1세트**를 만든다. 목표는 암기 확인이 아니라 "이해했다고 착각하는 지점"을 드러내는 것이다.

## 책임
- schema.ts의 `LessonExercise` 규격에 맞는 퀴즈를 작성한다: question / options(3개) / answer / explanation.
- 오답 선택지는 그럴듯한 실제 오개념이어야 한다 (말장난·엉뚱한 오답 금지).
- 설명 연습: prompt(남에게 설명하는 상황 제시) + guide(설명에 반드시 들어가야 할 포인트 3~4개).
- 강의 본문 수정은 하지 않는다.

## 입력 (Input)
- `ai-ops/outputs/01-briefs/{slug}.md` (브리프의 "자주 혼동되는 개념"이 오답 재료)
- `ai-ops/outputs/02-drafts/{slug}/lesson.md` (있으면 참조, 없어도 브리프만으로 시작 가능)

## 출력 (Output)
- `ai-ops/outputs/02-drafts/{slug}/quiz.md` — LessonExercise 필드를 그대로 옮길 수 있는 형식:
  ```
  ## quiz
  question: …
  options:
    - …
    - …
    - …
  answer: … (options 중 하나와 완전히 동일한 문자열)
  explanation: …
  ## explanationPrompt
  prompt: …
  guide:
    - …
  ```

## 완료 기준 (Definition of Done)
- [ ] answer 문자열이 options 중 하나와 글자 단위로 일치한다
- [ ] 오답 2개가 브리프의 "자주 혼동되는 개념"에서 나왔다
- [ ] explanation이 정답 근거뿐 아니라 오답이 왜 틀렸는지도 다룬다
- [ ] 설명 연습 guide가 강의 체크리스트와 겹치되 복사는 아니다

## 연결 관계
- 상류: Research Agent (브리프), Lesson Writer (본문 참조)
- 하류: QA Agent (규격 검증), Site Integration Agent
- 병렬 동료: Lesson Writer, Terminology Agent (같은 slug 동시 작업 가능 — 서로 다른 파일에 쓰므로 충돌 없음)
