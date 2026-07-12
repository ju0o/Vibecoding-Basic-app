## 한 줄 정의

Context Caching은 반복 요청에서 변하지 않는 프롬프트, 도구 정의, 대화 prefix를 재사용해 비용과 지연을 줄이는 컨텍스트 운용 방식입니다. 모델이 이전 요청을 의미적으로 "기억"하는 것이 아니라, 동일하거나 호환되는 prefix 처리 결과를 API나 runtime이 재사용하는 구조입니다. 그래서 Context Caching을 이해하려면 먼저 "무엇이 안정적인 prefix이고, 무엇이 매번 바뀌는 suffix인가"를 나누어야 합니다.

OpenAI와 Anthropic 문서가 공통으로 강조하는 지점은 stable content의 위치입니다. 공통 system instructions, examples, tool definitions처럼 반복되는 내용은 앞쪽에 두고, 현재 사용자 입력, timestamp, request-specific data처럼 매번 바뀌는 내용은 뒤쪽에 두어야 cache hit 가능성이 커집니다. ==Context Caching은 컨텍스트를 줄이는 기술이 아니라, 반복되는 컨텍스트를 덜 비싸게 쓰는 기술입니다.==

바이브코딩에서는 이 개념이 비용과 속도에 직접 연결됩니다. 긴 프로젝트 규칙, tool definitions, 대화 history, 코드베이스 설명이 매 요청마다 다시 들어간다면 agent는 같은 재료를 계속 처리해야 합니다. 캐시가 잘 맞으면 반복 prefix 처리 비용과 latency를 줄일 수 있지만, prefix가 자주 흔들리면 캐시 효과는 사라집니다.

이 강의의 목표는 "캐시를 켜면 빨라진다"가 아닙니다. cache hit이 왜 exact prefix match에 의존하는지, dynamic data를 어디에 두어야 하는지, Anthropic의 automatic caching과 explicit cache breakpoint가 무엇을 의미하는지, Claude Code에서 cache invalidation을 어떻게 생각해야 하는지 이해하는 것입니다.

## 왜 존재하는가

LLM API는 기본적으로 stateless하게 요청을 처리합니다. Claude Code 문서는 model이 requests 사이에서 아무것도 기억하지 않기 때문에 system prompt, project context, prior messages, tool results, new message를 다시 보낸다고 설명합니다. 사용자는 대화가 이어진다고 느끼지만, 실제 요청은 필요한 context를 매번 다시 포함해야 합니다.

짧은 대화에서는 이 비용이 작습니다. 그러나 agent workflow가 길어지면 반복되는 정보가 커집니다. 프로젝트 규칙, tool definitions, coding style, examples, prior conversation, common instructions가 계속 들어갑니다. 이 정보는 작업에 필요하지만, 매번 새로 처리하면 latency와 input token cost가 커집니다.

Prompt caching은 이 문제를 줄이기 위해 등장했습니다. OpenAI는 Prompt Caching이 최근 처리한 same prompt를 재사용해 cheaper and faster processing을 가능하게 한다고 설명합니다. Anthropic은 prompt의 specific prefixes에서 resume할 수 있게 해 repetitive tasks나 consistent elements가 있는 prompts의 processing time과 costs를 줄인다고 설명합니다.

여기서 중요한 점은 caching이 context engineering을 대신하지 않는다는 것입니다. Context Engineering은 어떤 정보를 넣을지 설계합니다. Context Caching은 그 정보 중 반복되는 prefix를 재사용 가능하게 배열합니다. 정보를 많이 넣는 문제가 해결되는 것이 아니라, 반복되는 정보를 어떤 순서와 안정성으로 유지할지의 문제가 추가됩니다.

바이브코딩에서 흔한 실패는 timestamp, request id, 현재 사용자 상황처럼 매번 바뀌는 내용을 system prompt 앞쪽에 넣는 것입니다. 그러면 stable prefix가 깨지고 cache hit이 줄어들 수 있습니다. ==캐시를 잘 쓰려면 중요한 내용을 많이 넣는 것보다, 변하지 않는 내용과 변하는 내용을 분리하는 습관이 먼저입니다.==

## 작동 원리

### 1. 요청은 prefix와 suffix로 나누어 생각합니다

Context Caching의 첫 번째 원리는 prompt를 하나의 긴 문자열처럼 보지 않고, stable prefix와 dynamic suffix로 나누어 보는 것입니다. Stable prefix에는 system policy, tool definitions, canonical examples, project rules처럼 반복되는 내용이 들어갑니다. Dynamic suffix에는 current user input, timestamp, request-specific data처럼 매번 달라지는 내용이 들어갑니다.

OpenAI 문서는 exact prefix matches가 필요하므로 static instructions와 examples를 prompt 앞쪽에 두고 variable user-specific information을 뒤쪽에 두라고 설명합니다. 이 원리는 단순합니다. 앞부분이 같아야 이전 처리 결과를 재사용할 수 있습니다. 앞부분이 바뀌면 그 뒤도 다시 처리해야 할 가능성이 커집니다.

따라서 context caching 설계의 첫 질문은 "이 정보는 모든 요청에서 같은가?"입니다. 같다면 앞쪽에 둘 후보입니다. 자주 바뀐다면 뒤쪽에 둘 후보입니다. 애매한 정보는 versioning하거나 별도 section으로 분리해 흔들림을 줄이는 편이 좋습니다.

### 2. OpenAI Prompt Caching은 반복 prefix 처리 비용을 줄입니다

OpenAI 문서는 Prompt Caching이 all recent models, gpt-4o and newer에서 enabled라고 설명합니다. 또한 repeated traffic with common prefixes에서 `prompt_cache_key`를 consistent하게 사용하고 `usage.prompt_tokens_details.cached_tokens`를 추적하라고 설명합니다. 이 정보는 caching을 감으로 보지 말고 지표로 보라는 뜻입니다.

핵심은 cache hit이 일어났는지 확인하는 것입니다. latency가 줄었는지, cached tokens가 잡히는지, common prefix가 실제로 stable한지 봐야 합니다. "나는 같은 내용을 보냈다"고 생각해도, system prompt 앞쪽의 timestamp나 tool ordering이 달라졌다면 cache hit이 줄어들 수 있습니다.

OpenAI 쪽 사고 모델은 stable content를 request beginning에 두고 dynamic context를 end에 두는 것입니다. 이 구조를 지키면 같은 프로젝트의 반복 요청에서 비용과 latency 이점을 얻을 가능성이 커집니다.

### 3. Anthropic은 automatic caching과 explicit breakpoint를 제공합니다

Anthropic prompt caching은 automatic caching과 explicit cache breakpoints 두 방식을 제공합니다. KB에 따르면 automatic caching은 top-level `cache_control` field를 추가하면 last cacheable block에 breakpoint를 자동 적용하고, multi-turn conversation이 커질수록 cache point를 forward합니다.

Explicit cache breakpoint는 content block에 직접 cache boundary를 두는 방식으로 이해할 수 있습니다. 즉 어느 부분까지를 cacheable prefix로 볼지 더 명시적으로 잡는 사고입니다. Automatic caching은 편리하고, explicit breakpoint는 구조를 더 선명하게 만들 수 있습니다.

Anthropic prompt caching은 기본 5-minute lifetime을 사용하고 1-hour cache duration을 추가 비용으로 제공합니다. 이 lifetime 정보는 cache가 영구 저장소가 아니라는 점을 보여줍니다. 캐시는 장기 기억이 아니라 일정 시간 동안 반복 prefix 처리를 줄이는 시스템 기능입니다.

### 4. Claude Code는 full context를 다시 보내고 API cache를 활용합니다

Claude Code 문서는 full context를 매 turn 다시 보내고, API prefix cache가 unchanged part를 reprocessing하지 않게 한다고 설명합니다. 즉 "Claude Code가 기억한다"가 아니라, 필요한 context를 보내되 변경되지 않은 prefix를 재처리하지 않게 최적화하는 구조입니다.

이 구조에서 prefix match는 exact입니다. Claude Code 문서는 prefix 안의 변경이 이후 전체를 recompute하게 만든다고 설명합니다. 도구 순서 변경, system prompt timestamp, earlier message edit 같은 작은 변화도 cache invalidation의 원인이 될 수 있습니다.

바이브코딩 실무에서는 이 말이 아주 중요합니다. 프로젝트 지침을 매번 조금씩 재작성하거나, tool definitions의 순서를 자주 바꾸거나, system prompt 앞쪽에 현재 시각을 넣으면 캐시가 잘 맞기 어렵습니다. 안정적인 내용은 안정적으로 유지해야 합니다.

### 5. Cache diagnostics는 divergence point를 찾습니다

Anthropic Cache diagnostics는 previous response id와 새 request fingerprint를 비교해 model, system prompt, tools, message history 중 divergence point를 알려주는 beta 기능입니다. KB의 Quote Bank는 이 기능을 "where they diverged"라는 표현으로 요약합니다.

이 기능이 중요한 이유는 cache miss 원인이 눈에 잘 보이지 않기 때문입니다. 사람은 두 요청이 거의 같다고 느끼지만, 실제로는 tool order가 바뀌었거나 system prompt 앞쪽이 달라졌을 수 있습니다. diagnostics는 어디서 prefix가 갈라졌는지 알려주어 cache miss를 디버깅하게 합니다.

Context Caching은 observability와도 연결됩니다. 단순히 "캐시가 된다"가 아니라, cache hit rate, cached tokens, latency, cache miss reason을 봐야 합니다. 그래야 비용 문제가 모델 성능 문제인지, prompt 구조 문제인지, runtime routing 문제인지 구분할 수 있습니다.

### 6. Caching은 compaction과 다릅니다

Prompt caching과 compaction은 자주 헷갈립니다. Caching은 반복되는 prefix 처리 비용을 줄입니다. Compaction은 context window limit에 가까울 때 오래된 history를 summary로 바꿔 공간을 확보합니다. 하나는 비용과 latency 최적화이고, 다른 하나는 context 공간 관리입니다.

둘은 함께 쓰일 수 있지만 같은 기능이 아닙니다. 캐시가 잘 맞아도 context window가 너무 커질 수 있습니다. 반대로 compaction을 해도 새 summary가 prefix를 바꾸면 cache hit이 달라질 수 있습니다. 그래서 긴 agent workflow에서는 caching, compaction, note-taking, subagent delegation을 함께 생각해야 합니다.

### 7. 좋은 cache 구조는 prompt versioning을 요구합니다

KB가 직접 "prompt versioning"을 후행 개념으로 언급하는 이유가 있습니다. stable prefix를 유지하려면 version 관리가 필요합니다. system prompt나 tool definitions가 바뀌면 캐시도 달라집니다. 어떤 버전의 prompt로 어떤 결과가 나왔는지 기록하지 않으면 비용 변화와 품질 변화를 해석하기 어렵습니다.

실무에서는 stable prefix를 파일이나 template로 관리하고, dynamic suffix를 별도 입력으로 붙이는 방식이 좋습니다. 이렇게 하면 변경 지점이 선명해지고, cache hit 문제도 진단하기 쉬워집니다.

## 스펙과 세부

### Cache-aware prompt 구조

```ts
type CacheAwarePrompt = {
  stablePrefix: ["system-policy", "tool-definitions", "canonical-examples"]
  dynamicSuffix: ["current-user-input", "timestamp", "request-specific-data"]
  metrics: ["cached_tokens", "latency_ms", "cache_miss_reason"]
}

const promptPlan: CacheAwarePrompt = {
  stablePrefix: ["system-policy", "tool-definitions", "canonical-examples"],
  dynamicSuffix: ["current-user-input", "timestamp", "request-specific-data"],
  metrics: ["cached_tokens", "latency_ms", "cache_miss_reason"],
}

console.log(promptPlan.stablePrefix[0])
```

이 코드는 특정 제공자의 SDK를 구현한 것이 아니라, KB의 cache-aware prompt 사고를 타입으로 표현한 예시입니다. 중요한 것은 prompt를 stable과 dynamic으로 나누고, cached_tokens나 latency 같은 지표를 함께 본다는 점입니다.

### OpenAI 쪽 지표

OpenAI GPT-5.5 가이드는 repeated traffic with common prefixes에서 `prompt_cache_key`를 consistent하게 사용하고 `usage.prompt_tokens_details.cached_tokens`를 추적하라고 설명합니다. 이 두 요소는 cache routing과 결과 확인에 해당합니다.

`prompt_cache_key`는 common prefix를 가진 반복 traffic을 일관되게 다루기 위한 힌트로 볼 수 있습니다. `cached_tokens`는 실제로 얼마나 재사용되었는지 확인하는 지표입니다. 둘 중 하나만 봐서는 부족합니다. key를 일관되게 써도 prompt 앞쪽이 흔들리면 cached tokens가 기대보다 낮을 수 있습니다.

### Anthropic 쪽 lifetime과 breakpoint

Anthropic prompt caching은 기본 5-minute lifetime과 추가 비용의 1-hour cache duration을 제공합니다. 또한 automatic caching과 explicit cache breakpoints를 제공합니다. 이 정보는 cache가 무기한 저장소가 아니라 비용과 시간 제약이 있는 runtime optimization이라는 점을 보여줍니다.

Automatic caching은 사용하기 쉽지만, prompt 구조가 나쁘면 효과가 제한될 수 있습니다. Explicit breakpoint는 cache boundary를 명확하게 잡을 수 있지만, 그만큼 prompt 구조를 더 신중하게 설계해야 합니다.

### Cache invalidation의 흔한 원인

KB에서 확인된 cache invalidation 원인은 system prompt timestamp, reordered tool, earlier message edit 같은 prefix 변경입니다. 이 원인들은 모두 "앞쪽이 흔들린다"는 공통점을 가집니다. Dynamic data를 앞에 넣거나, tool definitions 순서가 매번 달라지거나, 이전 메시지를 수정하면 prefix match가 깨질 수 있습니다.

실무에서는 cache miss가 발생했을 때 "모델이 느려졌다"고 단정하지 말고, prefix가 어디서 달라졌는지 봐야 합니다. Anthropic cache diagnostics는 이 divergence point를 찾는 데 도움이 됩니다.

## 원문으로 읽기

> "Reduce latency and cost"
>
> — 지연과 비용을 줄인다.
> [Prompt caching — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-caching)

이 문장은 Context Caching의 목적을 가장 짧게 보여줍니다. caching은 모델의 지식을 늘리는 기능이 아니라 운영 비용과 응답 시간을 줄이는 기능입니다. 그래서 캐시 설계의 성공 지표도 cached tokens, latency, cost 쪽에서 확인해야 합니다.

> "exact prefix matches"
>
> — 정확한 prefix 일치.
> [Prompt caching — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-caching)

이 인용은 cache hit 조건의 핵심입니다. "대충 비슷한 prompt"가 아니라 prefix가 정확히 맞아야 합니다. 따라서 stable content와 dynamic content의 위치를 섞어 두면 캐시 효과가 줄어듭니다.

> "stable content at the beginning"
>
> — 안정적인 내용을 앞쪽에 둔다.
> [Using GPT-5.5 — OpenAI API Docs](https://developers.openai.com/api/docs/guides/latest-model)

실무에서 바로 적용할 수 있는 규칙입니다. system policy, tool definitions, examples처럼 반복되는 내용을 앞쪽에 두고, 현재 사용자 입력이나 timestamp처럼 바뀌는 정보는 뒤쪽에 두어야 합니다. 이 원칙은 cache hit뿐 아니라 context 구조의 가독성도 높입니다.

관련 원문(링크): [Prompt caching — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

Anthropic 문서의 이 표현은 caching이 prompt 전체가 아니라 prefix boundary와 관련 있음을 보여줍니다. 어떤 부분까지 반복되고 어떤 부분부터 달라지는지 알아야 automatic caching이든 explicit breakpoint든 제대로 이해할 수 있습니다.

관련 원문(링크): [How Claude Code uses prompt caching — Claude Code Docs](https://code.claude.com/docs/en/prompt-caching)

Claude Code의 caching을 이해할 때 중요한 문장입니다. full context를 다시 보내더라도 unchanged prefix를 재처리하지 않게 할 수 있지만, prefix 안의 작은 변화가 전체 재계산을 만들 수 있습니다. 그러므로 tool order와 system prompt 안정성이 실무 성능에 영향을 줍니다.

## 실전에서

### 패턴 1: system prompt 앞쪽을 안정화합니다

프로젝트 정책, coding style, tool descriptions, canonical examples는 stable prefix 후보입니다. 이 내용은 파일이나 template로 관리하고, 요청마다 같은 순서와 같은 표현으로 들어가게 하는 편이 좋습니다. 현재 시각, 사용자별 조건, 임시 요구사항은 뒤쪽으로 보냅니다.

좋은 구조는 다음과 같습니다.

```ts
const stablePrefix = [
  "project policy v3",
  "tool definitions v2",
  "canonical examples v1",
]

const dynamicSuffix = [
  "current task: fix failing test",
  "timestamp: 2026-07-05T22:00:00+09:00",
]

const requestContext = [...stablePrefix, ...dynamicSuffix]
console.log(requestContext.length)
```

이 예시는 실제 API request가 아니라 배치 사고를 보여줍니다. stable prefix의 순서와 내용이 안정적일수록 cache hit 가능성을 높일 수 있습니다.

### 패턴 2: cache 지표를 추적합니다

OpenAI 문서는 cached tokens를 usage에서 추적하라고 설명합니다. 단순히 "캐시를 쓴다"가 아니라 실제로 얼마나 hit이 나는지 봐야 합니다. latency가 예상보다 높다면 cached_tokens가 낮은지, common prefix가 흔들렸는지, prompt_cache_key가 일관적인지 확인합니다.

지표는 비용 최적화뿐 아니라 설계 검증에도 필요합니다. prompt 구조를 바꾼 뒤 cached_tokens가 급감했다면, 품질이 좋아졌더라도 운영 비용이 증가했을 수 있습니다. 반대로 cached_tokens가 높아졌는데 품질이 떨어졌다면, stable prefix가 오래된 정책을 붙잡고 있을 수도 있습니다.

### 패턴 3: cache miss를 divergence 문제로 봅니다

Anthropic cache diagnostics는 previous response id와 새 request fingerprint를 비교해 where they diverged를 찾습니다. 이 사고를 일반화하면, cache miss는 "어디서 prefix가 갈라졌는가"를 찾는 문제입니다.

예를 들어 어제는 빨랐는데 오늘은 느려졌다면, 먼저 system prompt 앞쪽에 날짜가 들어갔는지, tool definitions 순서가 바뀌었는지, earlier message가 수정되었는지 봅니다. 모델 자체의 문제로 보기 전에 prompt prefix를 확인해야 합니다.

### 패턴 4: caching과 compaction을 구분합니다

긴 agent 작업에서 context가 커지면 compaction이 필요할 수 있습니다. 그러나 compaction은 공간 확보이고 caching은 반복 prefix 처리 비용 절감입니다. 둘은 목적이 다릅니다. compaction summary가 매번 달라지면 prefix 안정성이 흔들릴 수 있으므로, 어떤 정보가 stable하고 어떤 정보가 summary로 바뀌는지 명확히 해야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 exact match입니다. prefix가 정확히 맞아야 cache hit이 가능합니다. 작은 timestamp, tool ordering 변경, earlier message edit도 영향을 줄 수 있습니다. 그래서 캐시 친화적인 prompt 구조는 자유로운 prompt 조립보다 엄격합니다.

두 번째 한계는 lifetime입니다. Anthropic의 기본 cache lifetime은 5분이고 1-hour cache duration은 추가 비용이 듭니다. 캐시는 영구 기억이 아니며, 장기 상태 저장소도 아닙니다.

세 번째 한계는 관찰 필요성입니다. cache가 잘 되는지 보려면 cached tokens, latency, cache miss reason 같은 지표가 필요합니다. 지표 없이 캐시를 설계하면 비용 변화의 원인을 알기 어렵습니다.

네 번째 한계는 품질과 비용의 분리입니다. 캐시가 잘 맞으면 싸고 빠를 수 있지만, prompt 내용이 좋은지는 별도 문제입니다. 오래된 stable prefix가 잘 캐시되어도 정책이 낡았다면 품질이 떨어질 수 있습니다. 캐시 최적화와 prompt 품질 검증은 함께 가야 합니다.

다섯 번째 한계는 memory와의 혼동입니다. caching은 모델의 장기 기억이 아닙니다. Claude Code 문서가 설명하듯 model은 requests 사이에서 기억하지 않고 full context를 다시 보냅니다. ==Context Caching을 기억으로 오해하면 상태 관리와 품질 검증을 놓치게 됩니다.==

## 더 읽기

먼저 OpenAI Prompt caching 문서를 읽어 exact prefix match와 stable/dynamic 배치 원칙을 잡으세요. 그 다음 OpenAI 최신 모델 가이드의 cached_tokens와 prompt_cache_key 설명을 보세요. Anthropic prompt caching 문서는 automatic caching과 explicit breakpoint, cache lifetime을 이해하는 데 좋습니다. Claude Code prompt caching 문서는 full context 재전송과 exact match의 실무 의미를 보여줍니다.

- [Prompt caching — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-caching)
- [Using GPT-5.5 — OpenAI API Docs](https://developers.openai.com/api/docs/guides/latest-model)
- [Prompt caching — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [How Claude Code uses prompt caching — Claude Code Docs](https://code.claude.com/docs/en/prompt-caching)
- [Cache diagnostics — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics)
- [Best practices for Claude Code — Claude Code Docs](https://code.claude.com/docs/en/best-practices)
- [Modifying system prompts — Claude Code Docs](https://code.claude.com/docs/en/agent-sdk/modifying-system-prompts)

읽을 때는 "이 문서가 말하는 cache는 memory인가, prefix reuse인가"를 계속 구분하세요. 그 구분이 명확하면 cache hit, cache invalidation, diagnostics, compaction의 차이가 훨씬 선명해집니다.
