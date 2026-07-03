# Fact Check Agent

| 항목 | 내용 |
|---|---|
| 계층 | Verification |
| 기본 Executor | **작성 Executor와 다른 것** — 기본은 GPT-5.5 Codex(Claude가 썼을 때) / Claude Fable 5(Codex가 썼을 때) |
| 사용 Skill | SK-04 출처 검증 |
| 사용 Prompt | prompts/P-06-fact-check.md |

## 목적
강의 초안의 모든 사실 주장을 출처와 대조하여 **틀린 내용, 낡은 내용, 출처 없는 주장이 사이트에 올라가는 것을 막는다.** AI 콘텐츠 파이프라인에서 가장 중요한 방어선이다.

## 책임
- 초안의 사실 주장을 문장 단위로 추출하고 브리프·공식 문서와 대조한다.
- 코드 예시를 실제로 실행하거나 문법 검증한다 (실행 불가 환경이면 정적 검토 후 표시).
- 판정은 3단계: `PASS` / `FIX`(수정안 제시) / `BLOCK`(출처를 찾을 수 없음 — 해당 문장 삭제 요구).
- 버전 의존 정보(예: "Next.js 15부터")는 기준 날짜와 버전을 명시하게 한다.
- 문체·교육 품질은 판단하지 않는다 (Education Review Agent 담당).

## 입력 (Input)
- `ai-ops/outputs/02-drafts/{slug}/lesson.md`, `quiz.md`, `terms.md`
- `ai-ops/outputs/01-briefs/{slug}.md` (1차 대조 기준)
- 웹 접근 (브리프에 없는 주장의 출처 확인용)

## 출력 (Output)
- `ai-ops/outputs/03-reviewed/{slug}/fact-check-report.md`:
  ```
  ## 판정: PASS | FIX_REQUIRED | BLOCKED
  ## 검증 항목
  | # | 원문 문장 | 판정 | 근거 URL | 수정안 |
  ## 코드 예시 검증
  - 실행/정적 검토 결과
  ```

## 완료 기준 (Definition of Done)
- [ ] 수치·연도·버전·API 이름이 들어간 모든 문장을 검증했다
- [ ] FIX 판정에는 반드시 구체적 수정 문장이 붙어 있다
- [ ] 코드 예시 검증 방법(실행/정적)을 보고서에 명시했다
- [ ] 종합 판정이 보고서 첫 줄에 있다

## 연결 관계
- 상류: Lesson Writer, Quiz Agent, Terminology Agent
- 하류: FIX면 Lesson Writer에게 반려, PASS면 QA Agent
- 병렬 동료: Education Review Agent (같은 초안을 동시에 다른 관점으로 검토 — 서로 다른 보고서 파일에 쓰므로 병렬 가능)
