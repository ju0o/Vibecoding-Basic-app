# 용어 초안: context-caching-and-state

## Context Caching
- category: AI 시스템
- shortDefinition: 반복 요청에서 변하지 않는 prompt prefix를 재사용해 비용과 지연을 줄이는 컨텍스트 운용 방식
- explanation: Context Caching은 모델이 의미를 기억하는 기능이 아니라, system instructions, tool definitions, examples 같은 안정적인 prefix 처리를 재사용하는 runtime 최적화입니다.
- related: ["Context Engineering", "Prompt Caching", "Context Window"]

## Prompt Caching
- category: AI 시스템
- shortDefinition: 같은 또는 호환되는 prompt prefix 처리 결과를 재사용하는 API/runtime 기능
- explanation: Prompt Caching은 exact prefix match를 기반으로 반복되는 prompt 부분의 처리 비용과 latency를 줄입니다. stable content를 앞쪽에, dynamic content를 뒤쪽에 두는 구조가 중요합니다.
- related: ["Context Caching", "Cache Hit", "Context Engineering"]

## Cache Hit
- category: AI 시스템
- shortDefinition: 이전에 처리한 prompt prefix와 현재 요청의 prefix가 맞아 재사용이 일어나는 상태
- explanation: Cache Hit은 exact prefix matches에 의존합니다. system prompt timestamp, tool order, earlier message edit처럼 prefix 안의 변화가 생기면 hit이 줄어들 수 있습니다.
- related: ["Prompt Caching", "Cache Diagnostics"]

## Cache Breakpoint
- category: AI 시스템
- shortDefinition: prompt에서 어느 지점까지를 cacheable prefix로 볼지 정하는 경계
- explanation: Cache Breakpoint는 automatic caching이나 explicit cache control에서 반복 prefix의 경계를 잡는 개념입니다. 긴 multi-turn conversation에서는 cache point가 forward될 수 있습니다.
- related: ["Prompt Caching", "Context Caching"]

## Cache Diagnostics
- category: AI 시스템
- shortDefinition: cache miss가 어디서 발생했는지 prefix divergence point를 찾는 진단 방식
- explanation: Cache Diagnostics는 previous response id와 새 request fingerprint를 비교해 model, system prompt, tools, message history 중 어디가 달라졌는지 확인하는 데 사용됩니다.
- related: ["Cache Hit", "Observability", "Context Caching"]

