APPROVED 88

# Verification Report: tool-calling

- Target: `ai-ops/knowledge-base/entries/T09/tool-calling.md`
- Executor: Codex, P-02 Knowledge Verification
- Checked: 2026-07-05
- Status decision: `approved`

## Gate Verdict

| Gate | Verdict | Evidence |
|---|---:|---|
| G1. 출처 확인 불가(BLOCK) 주장 0건 | PASS | OpenAI docs/blog, Claude tool-use docs, MCP docs, Agent SDK docs로 핵심 주장 대조됨. |
| G2. 13개 필수 섹션 전부 존재 | PASS | KB README의 13개 필수 섹션 모두 존재. |
| G3. frontmatter 필수 필드 완전 | PASS | `id`, `topicGroup`, `level`, `sources`, `updated` 존재. |
| G4. sources URL 접속 가능 + 확인 날짜 존재 | PASS | frontmatter sources 5개 모두 원문 확인. OpenAI Platform URL은 현재 `developers.openai.com/api/docs`로 리다이렉트됨. |

## Sentence-Level Verification

| Section | Claim checked | Source check | Verdict |
|---|---|---|---|
| 정의 | function calling은 모델을 외부 시스템과 연결하는 방법 | OpenAI Function calling guide와 일치. `https://developers.openai.com/api/docs/guides/function-calling` | PASS |
| 역사 | OpenAI가 2023-06-13 function calling을 발표 | OpenAI 공식 블로그 게시일과 내용 확인. `https://openai.com/index/function-calling-and-other-api-updates/` | PASS |
| 해결하려는 문제 | 모델은 구조화된 호출을 반환하고 앱이 client tool을 실행 | Claude tool use overview와 일치. `https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview` | PASS |
| 핵심 개념 | OpenAI function tool은 JSON Schema 기반 | OpenAI guide의 strict mode 예시와 일치. | PASS |
| 핵심 개념 | Claude client tool에는 `name`, `description`, `input_schema`, optional `input_examples`가 포함 | Claude define tools 문서 확인. `https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools` | PASS |
| 핵심 개념 | OpenAI tools는 built-in tools, function calling, tool search, remote MCP servers를 포함 | OpenAI Using tools 문서 확인. `https://developers.openai.com/api/docs/guides/tools` | PASS |
| 관련 기술 | MCP는 tool/resource/prompt를 표준화하는 프로토콜 | MCP intro 및 server tools spec과 일치. | PASS |
| AI 시대 의미 | 실제 영향이 있는 작업은 사용자 확인이 필요 | OpenAI 블로그 및 Claude tool-use 실행 책임 설명과 일치. | PASS |

## Source Registry Fit

- Official source ratio: 100% official or official vendor blog/docs.
- Registered/allowed fit: PASS with note.
- Notes: `SOURCE-REGISTRY.md`는 OpenAI docs base를 `https://platform.openai.com/docs`로 적고 있으나 해당 URL이 공식적으로 `https://developers.openai.com/api/docs/...`로 리다이렉트됨을 확인했다. 현행 공식 문서 도메인으로 인정 가능.
- Non-blocking issue: body citations include MCP and Agent SDK official URLs not listed in frontmatter sources.

## Knowledge Score

| Criterion | Score | Rationale |
|---|---:|---|
| S1 공식 출처 | 18/20 | 모든 핵심 주장에 공식 출처. body-only 공식 URL 누락으로 소폭 감점. |
| S2 최신성 | 14/15 | checked 날짜는 최신. OpenAI docs domain redirect는 registry 갱신 후보라 1점 감점. |
| S3 교육 적합성 | 14/15 | tool calling과 API 호출의 층위를 잘 구분. |
| S4 예시 품질 | 8/10 | weather tool 예시는 실행 형태를 보여주지만 실제 앱 실행 흐름까지는 없음. |
| S5 AI 시대 연관성 | 9/10 | AI가 파일, DB, API와 상호작용하는 접점으로 잘 연결. |
| S6 실무 활용성 | 14/15 | 내부 API, 검색 보강, 안전 실행 장면과 오개념 3개가 유효. |
| S7 용어 일관성 | 11/15 | related/prerequisites id는 실존. `Tool Calling` 용어는 아직 `src/content/glossary.ts`에 없어 향후 용어 등록 필요. |
| Total | 88/100 | Approved threshold met. |

## Required Fixes

- None blocking.
- Recommended: `src/content/glossary.ts`에 `Tool Calling` 표준 표기를 추가하고, body-only MCP/Agent SDK URL을 frontmatter sources에 보강하면 좋다.

