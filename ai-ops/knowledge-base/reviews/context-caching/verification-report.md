APPROVED 89

# P-02 Verification Report: context-caching

검증일: 2026-07-05  
대상: `ai-ops/knowledge-base/entries/T10/context-caching.md`  
판정: APPROVED  
Knowledge Score: 89 / 100

## Gate 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | OpenAI/Anthropic prompt caching, Claude Code cache behavior, diagnostics 주장 원문 대조. |
| G2 필수 섹션 존재 | PASS | 정의~변경 이력 + Quote Bank 존재. |
| G3 frontmatter 필수 필드 | PASS | id, topicGroup, level, sources, updated 존재. |
| G4 URL 접속/확인 날짜 | PASS | 7개 sources 모두 접속 확인, checked 날짜 존재. |

## 원문 재접속 기록

| URL | 접속 | 판정 |
|---|---:|---|
| https://developers.openai.com/api/docs/guides/prompt-caching | OK | OpenAI 공식 API docs |
| https://developers.openai.com/api/docs/guides/latest-model | OK | OpenAI 공식 API docs |
| https://platform.claude.com/docs/en/build-with-claude/prompt-caching | OK | Claude 공식 docs |
| https://code.claude.com/docs/en/prompt-caching | OK | 공식 Claude Code Docs |
| https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics | OK | Claude 공식 docs |
| https://code.claude.com/docs/en/best-practices | OK | 공식 Claude Code Docs |
| https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts | OK | 공식 Claude Code Docs |

## 문장 단위 대조 요약

| KB 주장 | 출처 대조 | 판정 |
|---|---|---|
| OpenAI Prompt Caching은 반복 prompt prefix 처리 비용과 latency를 줄인다. | OpenAI prompt caching 문서와 일치. | PASS |
| Cache hit은 exact prefix match가 필요하며 static content를 앞에 둔다. | OpenAI prompt caching 문서와 GPT-5.5 guide와 일치. | PASS |
| Anthropic은 automatic caching과 explicit cache breakpoints를 제공한다. | Claude prompt caching 문서와 일치. | PASS |
| Claude Code는 매 turn full context를 보내고 prefix cache를 활용한다. | Claude Code prompt caching 문서와 일치. | PASS |
| Cache diagnostics는 divergence point를 찾는 beta 기능이다. | Claude cache diagnostics 문서와 일치. | PASS |

## Score

| 기준 | 배점 | 점수 | 근거 |
|---|---:|---:|---|
| S1 공식 출처 | 20 | 18 | 모두 공식 출처. 다만 SOURCE-REGISTRY는 OpenAI를 `platform.openai.com/docs`로 등록하고 최신 docs URL은 `developers.openai.com/api/docs`라 비차단 감점. |
| S2 최신성 | 15 | 15 | 모든 checked 날짜 2026-07-05. beta header와 GPT-5.5 관련 버전성 명시. |
| S3 교육 적합성 | 15 | 13 | "prompt caching != memory" 구분이 명확함. |
| S4 예시 품질 | 10 | 9 | stablePrefix/dynamicSuffix 코드와 세 가지 실무 활용이 구체적. |
| S5 AI 시대 연관성 | 10 | 9 | 바이브코딩 비용/latency/context 구조와 직접 연결. |
| S6 실무 활용성 | 15 | 14 | 캐시 miss, timestamp, tool order 등 실무 실수 항목이 유효함. |
| S7 용어 일관성 | 15 | 11 | prerequisite/related id 실존. `Context Caching` glossary term은 아직 없음. |

합계: 89

## 수정 필요 사항

- 비차단: SOURCE-REGISTRY에 `https://developers.openai.com/api/docs`를 OpenAI 공식 docs 최신 URL로 제안 권장.
- 비차단: `Context Caching` glossary term 추가 권장.

## 승인 가능 여부

승인 가능. G1~G4 통과, score 80 이상. URL 등록부 차이는 공식성 문제라기보다 registry 최신화 이슈임.

