RECOLLECT 78

# Verification Report: tokenization-context

- Target: `ai-ops/knowledge-base/entries/T08/tokenization-context.md`
- Executor: Codex, P-02 Knowledge Verification
- Checked: 2026-07-05
- Status decision: `recollect(1)`

## Gate Verdict

| Gate | Verdict | Evidence |
|---|---:|---|
| G1. 출처 확인 불가(BLOCK) 주장 0건 | FAIL | "Cached prompt prefixes still occupy the context window" 문구와 해당 주장은 Claude Context windows 문서에서 확인되지만, KB의 핵심 개념·공식 출처·Quote Bank는 Prompt caching 문서를 출처로 적어 locator가 불일치한다. |
| G2. 13개 필수 섹션 전부 존재 | PASS | template 13섹션 + Quote Bank 존재. |
| G3. frontmatter 필수 필드 완전 | PASS | `id`, `topicGroup`, `level`, `sources`, `updated` 존재. |
| G4. sources URL 접속 가능 + 확인 날짜 존재 | PASS | frontmatter sources 5개 모두 접속 확인, checked 2026-07-05 존재. |

## Sentence-Level Verification

| Section | Claim checked | Source check | Verdict |
|---|---|---|---|
| 정의 | token counting은 비용, rate limit, routing, target length 관리에 쓰임 | Claude Token counting 원문 일치. `https://platform.claude.com/docs/en/build-with-claude/token-counting` | PASS |
| 정의/문제 | context window는 모델의 working memory이며 훈련 corpus와 다름 | Claude Context windows 원문 일치. `https://platform.claude.com/docs/en/build-with-claude/context-windows` | PASS |
| 역사 | Claude Opus 4.7 이후 일부 모델 tokenizer가 이전 대비 약 30% 더 많은 토큰 생성 가능 | Claude Token counting 원문 일치. 기준 날짜 표기 있음. | PASS |
| 핵심 개념 | token count는 estimate일 수 있음 | Claude Token counting 원문 일치. | PASS |
| 핵심 개념/FAQ/Quote Bank | cached prompt prefixes도 context window를 차지함 | 사실은 Claude Context windows 원문과 일치하지만 KB는 Prompt caching URL을 출처로 표기. | FAIL |
| 관련 기술 | Claude Code는 요청 사이 model memory가 없고 full context를 다시 보냄 | Claude Code prompt caching 원문 일치. `https://code.claude.com/docs/en/prompt-caching` | PASS |

## Source Registry Fit

- Official source ratio: 100% official registered category.
- OpenAI docs note: `developers.openai.com/api/docs`는 현재 OpenAI 공식 API docs surface로 확인됨.
- Blocking issue: one fact/quote has the right official document family but wrong URL in KB citation.

## Knowledge Score

| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 14/20 | 대부분 공식 출처이나 핵심 개념·공식 출처·Quote Bank의 cached prefix 문구가 잘못된 문서 URL로 연결됨. |
| S2 최신성 | 15/15 | 전 sources checked 2026-07-05, 모델 의존 수치에 기준 날짜 있음. |
| S3 교육 적합성 | 14/15 | 정의와 순서가 T08 첫 개념으로 적합. |
| S4 예시 품질 | 8/10 | token budget 타입 예시와 실무 장면이 구체적. |
| S5 AI 시대 연관성 | 9/10 | 바이브코딩 context budget과 연결이 구체적. |
| S6 실무 활용성 | 13/15 | FAQ 3개, 실수 3개, 실제 오개념 반영. |
| S7 용어 일관성 | 5/15 | related/prerequisites id는 실존하나 Citation Rule 위반이 Quote Bank 표준성과 연결되어 감점. |
| Total | 78/100 | Gate G1 fail로 recollect. |

## Required Fixes

1. `## 핵심 개념` 6번의 citation URL을 Claude `Context windows` 문서로 교체한다.
2. `## 공식 출처`의 cached prefix bullet URL을 Claude `Context windows` 문서로 교체한다.
3. `## Quote Bank`의 `"Cached prompt prefixes still occupy the context window"` 출처를 Claude `Context windows` 문서로 교체한다.
4. 그 외 통과한 섹션은 임의 수정하지 않는다.
