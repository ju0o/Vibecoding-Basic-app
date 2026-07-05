---
id: context-caching
title: "Context Caching (컨텍스트 캐싱)"
topicGroup: T10
status: approved
score: 89
level: 중급
prerequisites: [context-engineering]
successors: [harness, ai-system-evaluation]
related: [context-engineering, agent-loop, skills]
consumers:
  lessons: [context-caching-and-state]
  glossary: [Context Caching, Prompt Caching, Cache Hit, Cache Breakpoint, Cache Diagnostics]
sources:
  - { title: "Prompt caching", url: "https://developers.openai.com/api/docs/guides/prompt-caching", checked: 2026-07-05 }
  - { title: "Using GPT-5.5", url: "https://developers.openai.com/api/docs/guides/latest-model", checked: 2026-07-05 }
  - { title: "Prompt caching", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching", checked: 2026-07-05 }
  - { title: "How Claude Code uses prompt caching", url: "https://code.claude.com/docs/en/prompt-caching", checked: 2026-07-05 }
  - { title: "Cache diagnostics", url: "https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics", checked: 2026-07-05 }
  - { title: "Best practices for Claude Code", url: "https://code.claude.com/docs/en/best-practices", checked: 2026-07-05 }
  - { title: "Modifying system prompts", url: "https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Context Caching은 반복 요청에서 변하지 않는 프롬프트·도구·대화 prefix를 재사용해 비용과 지연을 줄이는 컨텍스트 운용 방식이다. OpenAI 문서는 Prompt Caching이 최근 처리한 same prompt를 재사용해 cheaper and faster processing을 가능하게 한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
이 KB에서 Context Caching은 OpenAI와 Anthropic 문서의 prompt caching, Claude Code의 session context reuse, cache diagnostics를 묶어 설명하는 교육용 개념이다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)

## 역사
Anthropic Platform 문서는 prompt caching을 prompt의 specific prefixes에서 resume할 수 있게 해 repetitive tasks나 consistent elements가 있는 prompts의 processing time과 costs를 줄이는 기능으로 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)
OpenAI 문서는 2026-07-05 기준 Prompt Caching이 all recent models, gpt-4o and newer에서 enabled라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
Claude Code 문서는 prompt caching을 자동으로 관리하며, cache invalidation과 cache hit rate 확인 방법을 알아야 비용과 속도 문제를 진단할 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)

## 해결하려는 문제
LLM API는 stateless하게 요청을 처리하므로, 이전 대화와 도구 정의가 매 요청마다 다시 들어가면 비용과 latency가 커진다. Claude Code 문서는 model이 requests 사이에서 아무것도 기억하지 않기 때문에 system prompt, project context, prior messages, tool results, new message를 다시 보낸다고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)
컨텍스트가 길어지는 agent workflow에서는 system instructions, common examples, tool definitions, conversation history처럼 변하지 않는 prefix가 반복된다. OpenAI는 repetitive content like system prompts and common instructions가 prompt caching의 대표 대상이라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
Context Caching은 stable content를 prefix로 유지하고 variable content를 뒤로 보내 cache hit 가능성을 높인다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)

## 핵심 개념
1. OpenAI Prompt Caching은 recent prompt를 처리한 서버로 request를 route해 반복 prefix 처리 비용과 latency를 줄인다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
2. OpenAI 문서는 cache hits가 exact prefix matches에서만 가능하므로 static instructions와 examples를 prompt 앞쪽에 두고 variable user-specific information을 뒤쪽에 두라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
3. OpenAI GPT-5.5 가이드는 repeated traffic with common prefixes에서 `prompt_cache_key`를 consistent하게 사용하고 `usage.prompt_tokens_details.cached_tokens`를 추적하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/latest-model, 확인: 2026-07-05)
4. Anthropic prompt caching은 automatic caching과 explicit cache breakpoints 두 방식을 제공한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)
5. Anthropic automatic caching은 top-level `cache_control` field를 추가하면 last cacheable block에 breakpoint를 자동 적용하고, multi-turn conversation이 커질수록 cache point를 forward한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)
6. Anthropic prompt caching은 기본 5-minute lifetime을 사용하고 1-hour cache duration을 추가 비용으로 제공한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)
7. Claude Code 문서는 prefix match가 exact이며 prefix 안의 변경이 이후 전체를 recompute하게 만든다고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)
8. Anthropic Cache diagnostics는 previous response id와 새 request fingerprint를 비교해 model, system prompt, tools, message history 중 divergence point를 알려주는 beta 기능이다. (출처: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics, 확인: 2026-07-05)

## 관련 기술
- Context Caching vs Context Engineering: context engineering은 어떤 정보를 넣을지 설계하고, context caching은 반복되는 prefix를 비용·지연 측면에서 재사용 가능하게 배열한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
- Prompt Caching vs Memory: caching은 모델이 의미를 기억하는 것이 아니라 동일하거나 호환되는 prefix 처리 결과를 재사용하는 시스템 기능이다. Claude Code 문서는 model이 requests 사이에서 기억하지 않는다고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)
- Prompt Caching vs Compaction: caching은 반복 prefix 처리 비용을 줄이고, compaction은 context window limit에 가까울 때 오래된 history를 summary로 바꿔 공간을 확보한다. (출처: https://code.claude.com/docs/en/agent-sdk/agent-loop, 확인: 2026-07-05; https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)
- Cache Diagnostics vs Observability: diagnostics는 cache miss 원인을 찾는 도구이고, tracing/observability는 agent run 전체의 model calls, tool calls, handoffs를 분석한다. (출처: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/agents/integrations-observability, 확인: 2026-07-05)

## 선행 개념
- context-engineering: caching은 stable prefix와 dynamic context를 나누어 배치하는 일이므로 context window가 어떤 정보 상태인지 먼저 이해해야 한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)

## 후행 개념
Context Caching 뒤에는 agent cost optimization, long-running agent harness, cache diagnostics, prompt versioning, evaluation reproducibility를 다룰 수 있다. OpenAI는 cached tokens를 usage에서 추적하라고 설명하고, Anthropic은 cache diagnostics로 divergence를 찾는 beta 기능을 제공한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/latest-model, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서는 프로젝트 규칙, tool definitions, examples, prior conversation이 계속 반복되므로 캐시가 잘 맞는 구조가 비용과 속도를 크게 좌우한다. OpenAI 문서는 stable content를 beginning에, dynamic user-specific context를 end에 두라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/latest-model, 확인: 2026-07-05)
그러나 caching은 "기억"이 아니라 prefix 재사용이다. Claude Code 문서는 model이 requests 사이에서 기억하지 않고 full context를 다시 보내며, API가 unchanged part를 reprocessing하지 않게 하는 것이 prompt caching이라고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)

## 실무 활용
1. 시스템 프롬프트 안정화: 공통 정책, style guide, tool descriptions를 앞쪽에 두고 user-specific data와 timestamp를 뒤쪽에 둔다. (근거: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
2. Anthropic multi-turn 자동 캐싱: request top level에 `cache_control`을 두어 conversation history가 커질 때 cache breakpoint가 forward되게 한다. (근거: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)
3. Cache miss 진단: Anthropic beta cache diagnostics에서 previous response id를 넘겨 system prompt, tools, message history 중 어디가 달라졌는지 확인한다. (근거: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics, 확인: 2026-07-05)

```ts
type CacheAwarePrompt = {
  stablePrefix: ["system-policy", "tool-definitions", "canonical-examples"]
  dynamicSuffix: ["current-user-input", "timestamp", "request-specific-data"]
  metrics: ["cached_tokens", "latency_ms", "cache_miss_reason"]
}
```

## FAQ
Q: Context Caching은 모델 메모리인가?
A: 아니다. Claude Code 문서는 model이 requests 사이에서 기억하지 않고 full context를 다시 보낸다고 설명한다. Caching은 동일 prefix를 재처리하지 않게 하는 API/runtime 최적화다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)

Q: cache hit을 높이려면 어떻게 해야 하는가?
A: OpenAI 문서는 exact prefix matches가 필요하므로 static instructions와 examples를 앞쪽에, variable user-specific information을 뒤쪽에 두라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)

Q: Anthropic에서는 caching을 어떻게 켜는가?
A: Anthropic 문서는 automatic caching으로 top-level `cache_control` field를 추가하거나, explicit cache breakpoints를 content block에 직접 둘 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)

Q: 캐시가 왜 갑자기 깨지는가?
A: Anthropic cache diagnostics 문서는 reordered tool, system prompt timestamp, earlier message edit 같은 prefix 변경이 cache를 invalidate할 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: timestamp나 request id를 system prompt 앞쪽에 넣는다. 왜 생기나: 메타데이터를 먼저 쓰는 일반 로그 습관 때문이다. 교정: stable prefix 앞쪽을 고정하고 dynamic data는 뒤쪽으로 보낸다. (출처: https://developers.openai.com/api/docs/guides/prompt-caching, 확인: 2026-07-05)
2. 실수: cache hit을 의미 기억으로 이해한다. 왜 생기나: "cache"를 사용자의 장기 기억처럼 해석한다. 교정: prefix processing reuse이며 model은 request 사이에서 기억하지 않는다고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)
3. 실수: 도구 순서 변경이 캐시에 영향이 없다고 생각한다. 왜 생기나: tools를 실행 옵션으로만 보고 prompt prefix의 일부로 보지 않는다. 교정: Anthropic 문서처럼 tools, system, messages 순서의 prefix 전체를 cache 대상으로 본다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-caching, 확인: 2026-07-05)
4. 실수: 캐시 지표를 추적하지 않는다. 왜 생기나: latency와 cost가 모델 성능 문제라고만 본다. 교정: OpenAI는 cached tokens를 usage에서 추적하라고 설명하고, Anthropic은 cache diagnostics를 제공한다. (출처: https://developers.openai.com/api/docs/guides/latest-model, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics, 확인: 2026-07-05)

## 공식 출처
- Prompt Caching은 repetitive content를 재사용해 latency와 input token cost를 줄인다 — [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) (확인: 2026-07-05)
- GPT-5.5 가이드는 stable content를 request beginning에, dynamic context를 end에 두고 cached tokens를 추적하라고 설명한다 — [Using GPT-5.5](https://developers.openai.com/api/docs/guides/latest-model) (확인: 2026-07-05)
- Anthropic prompt caching은 automatic caching과 explicit cache breakpoints를 제공한다 — [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) (확인: 2026-07-05)
- Claude Code는 full context를 매 turn 다시 보내고 API prefix cache로 unchanged part 재처리를 줄인다 — [How Claude Code uses prompt caching](https://code.claude.com/docs/en/prompt-caching) (확인: 2026-07-05)
- Cache diagnostics는 beta header `cache-diagnosis-2026-04-07`로 divergence point를 찾는다 — [Cache diagnostics](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics) (확인: 2026-07-05)
- Claude Code best practices는 context window가 빠르게 차고 performance가 degrade될 수 있다고 설명한다 — [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) (확인: 2026-07-05)
- `excludeDynamicSections`는 system prompt cache를 공유하기 위해 dynamic sections를 user message로 옮길 수 있다 — [Modifying system prompts](https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts) (확인: 2026-07-05)

## Quote Bank
- > "Reduce latency and cost"
  - 출처: [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) (확인: 2026-07-05)
  - 맥락: caching의 실무 목적을 설명할 때 사용.
- > "exact prefix matches"
  - 출처: [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) (확인: 2026-07-05)
  - 맥락: cache hit 조건을 설명할 때 사용.
- > "stable content at the beginning"
  - 출처: [Using GPT-5.5](https://developers.openai.com/api/docs/guides/latest-model) (확인: 2026-07-05)
  - 맥락: prompt 구조화 규칙을 설명할 때 사용.
- > "specific prefixes in your prompts"
  - 출처: [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) (확인: 2026-07-05)
  - 맥락: Anthropic prompt caching의 원리를 설명할 때 사용.
- > "The match is exact"
  - 출처: [How Claude Code uses prompt caching](https://code.claude.com/docs/en/prompt-caching) (확인: 2026-07-05)
  - 맥락: Claude Code cache invalidation을 설명할 때 사용.
- > "where they diverged"
  - 출처: [Cache diagnostics](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics) (확인: 2026-07-05)
  - 맥락: cache diagnostics의 목적을 설명할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
