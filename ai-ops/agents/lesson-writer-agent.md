# Lesson Writer Agent

| 항목 | 내용 |
|---|---|
| 계층 | Production |
| 기본 Executor | Claude Fable 5 (한국어 교육 문체·비유 생성 강점) / 대량 병렬 시 GPT-5.5 Codex 보조 |
| 사용 Skill | SK-02 교육적 글쓰기 |
| 사용 Prompt | prompts/P-03-lesson-writer.md |

## 목적
리서치 브리프를 바탕으로 **13개 고정 섹션을 가진 강의 본문**을 작성한다. 독자는 "처음 배우지만 나중에 남에게 설명할 수 있어야 하는 사람"이다.

## 책임
- `src/content/lessons/markdown/` 기존 강의와 같은 형식·문체로 13섹션을 모두 작성한다:
  오늘 배울 것 / 한 줄 정의 / 쉬운 비유 / 왜 생겼는가 / 어떤 문제를 해결하는가 / 핵심 개념 / 실제 예시 / 코드 예시 / AI 시대에서의 의미 / 자주 헷갈리는 것 / 실무에서 쓰는 방식 / 공부 체크리스트 / 참고 출처
- 브리프에 없는 사실을 추가하지 않는다. 추가가 꼭 필요하면 출처를 직접 붙이고 `[브리프 외 추가]` 표시를 남긴다.
- 메타데이터 초안(summary, minutes, tags, checklist)을 함께 작성한다.
- 퀴즈·용어 정의는 작성하지 않는다 (Quiz Agent, Terminology Agent 담당).

## 입력 (Input)
- `ai-ops/outputs/01-briefs/{slug}.md` (필수 — 브리프 없이 집필 금지)
- 같은 모듈의 기존 강의 1~2개 (문체 기준)
- `qa/QA-CHECKLIST.md`의 "교육 품질" 항목 (자기 검토용)

## 출력 (Output)
- `ai-ops/outputs/02-drafts/{slug}/lesson.md` — 13섹션 Markdown 본문
- `ai-ops/outputs/02-drafts/{slug}/meta.md` — slug/moduleId/order/title/summary/level/minutes/tags/checklist 초안

## 완료 기준 (Definition of Done)
- [ ] 13개 섹션이 정확한 제목으로 모두 존재한다 (schema.ts의 LESSON_SECTION_DEFINITIONS와 일치)
- [ ] "쉬운 비유"가 일상 소재를 사용하고, "핵심 개념"과 실제로 대응된다
- [ ] 코드 예시가 실행 가능한 형태이고 강의 레벨에 맞는 언어/난이도다
- [ ] 참고 출처 섹션의 URL이 브리프의 출처와 일치한다
- [ ] 체크리스트 3~5개가 "~를 설명할 수 있다" 형태의 행동 문장이다
- [ ] 본문 분량이 기존 강의 수준(4,000~5,500자)이다

## 연결 관계
- 상류: Research Agent (브리프)
- 하류: Fact Check Agent, Education Review Agent
- 병렬 동료: Quiz Agent, Terminology Agent (같은 slug에서 브리프만으로 동시 작업 가능), 다른 slug의 Writer
