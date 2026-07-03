# {Agent 이름}

| 항목 | 내용 |
|---|---|
| 계층 | Executive / Planning / Production / Verification / Release |
| 기본 Executor | (executors/EXECUTORS.md 참조 — 언제든 교체 가능) |
| 사용 Skill | SK-xx, SK-yy |
| 사용 Prompt | prompts/P-xx-*.md |

## 목적
이 Agent가 존재하는 이유 한 문단.

## 책임
- 해야 하는 일 목록 (책임지지 않는 일도 명시)

## 입력 (Input)
- 파일 경로 기준으로 명시. 예: `ai-ops/outputs/01-briefs/{slug}.md`

## 출력 (Output)
- 파일 경로 + 규격 기준으로 명시.

## 완료 기준 (Definition of Done)
- [ ] 체크 가능한 조건만 나열. "잘 작성됨" 같은 모호한 기준 금지.

## 연결 관계
- 상류(입력을 주는 Agent): …
- 하류(출력을 받는 Agent): …
- 병렬 동료(같은 slug에서 동시 작업 가능한 Agent): …
