# Terminology Agent

| 항목 | 내용 |
|---|---|
| 계층 | Production |
| 기본 Executor | GPT-5.5 Codex 또는 Trae (대량 규격 생성) |
| 사용 Skill | SK-08 용어 집필 |
| 사용 Prompt | prompts/P-05-terminology.md |

## 목적
강의에 등장하는 새 용어를 용어 사전(`glossary.ts`) 규격으로 정의하고, **사이트 전체에서 용어가 하나의 정의로 통일**되게 유지한다.

## 책임
- 강의 초안에서 용어 사전에 없는 용어를 추출한다.
- `GlossaryTerm` 규격으로 정의: term / category / shortDefinition(한 문장) / explanation(3~5문장) / related(관련 용어).
- 기존 용어와 정의가 충돌하면 새로 만들지 말고 "충돌 보고"를 남긴다.
- 같은 개념의 표기를 통일한다 (예: "에이전트/Agent" 혼용 발견 시 표준 표기 제안).

## 입력 (Input)
- `ai-ops/outputs/02-drafts/{slug}/lesson.md` (또는 브리프)
- `src/content/glossary.ts` (기존 용어 전체 — 중복 방지 필수 입력)

## 출력 (Output)
- `ai-ops/outputs/02-drafts/{slug}/terms.md` — 용어별 블록:
  ```
  ## {term}
  category: …
  shortDefinition: …
  explanation: …
  related: [용어1, 용어2]
  status: new | conflict(기존 정의와 충돌 — 사유)
  ```

## 완료 기준 (Definition of Done)
- [ ] 추출한 모든 용어를 glossary.ts와 대조했다 (중복 생성 0건)
- [ ] shortDefinition이 한 문장이고 전문용어 없이 읽힌다
- [ ] related에 적은 용어가 실제로 사전에 존재하거나 이번 배치에 포함된다
- [ ] category가 기존 카테고리 체계를 따른다 (새 카테고리는 제안으로 분리)

## 연결 관계
- 상류: Lesson Writer (본문), Research Agent (브리프)
- 하류: QA Agent (용어 일관성 검증), Site Integration Agent
- 병렬 동료: 같은 slug의 Writer/Quiz. **주의: 서로 다른 slug의 Terminology 작업이 같은 용어를 만들 수 있으므로, glossary 반영 직전 QA Agent의 중복 검사를 반드시 거친다.**
