---
id: model-selection-tradeoffs
title: "모델 선택과 트레이드오프 (Model Selection Tradeoffs)"
topicGroup: T08
status: approved
score: 91
level: 중급
prerequisites: [tokenization-context, hallucination-verification]
successors: [ai-era-timeline]
related: [context-caching, agent-loop, ai-learning-verification]
consumers:
  lessons: [model-selection-tradeoffs]
  glossary: [Model Selection, Accuracy Target, Latency, Cost, Model Tier, Effort]
sources:
  - { title: "OpenAI API Docs — Model selection", url: "https://developers.openai.com/api/docs/guides/model-selection", checked: 2026-07-11 }
  - { title: "OpenAI API Docs — Models", url: "https://developers.openai.com/api/docs/models", checked: 2026-07-11 }
  - { title: "OpenAI API Docs — Pricing", url: "https://developers.openai.com/api/docs/pricing", checked: 2026-07-11 }
  - { title: "Claude Platform Docs — Choosing the right model", url: "https://platform.claude.com/docs/en/about-claude/models/choosing-a-model", checked: 2026-07-11 }
  - { title: "Claude Platform Docs — Models overview", url: "https://platform.claude.com/docs/en/about-claude/models/overview", checked: 2026-07-11 }
  - { title: "Claude Platform Docs — Pricing", url: "https://platform.claude.com/docs/en/about-claude/pricing", checked: 2026-07-11 }
  - { title: "Claude Platform Docs — Introducing Claude Fable 5 and Claude Mythos 5", url: "https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5", checked: 2026-07-11 }
updated: 2026-07-11
---

## 정의
모델 선택은 작업 요구에 맞춰 AI 모델의 정확도·비용·지연을 조정하는 의사결정이다. OpenAI는 모델 선택을 성능과 비용에 맞는 최적 모델을 고르는 문제로 설명하고, 선택에는 accuracy, latency, cost의 균형이 필요하다고 제시한다. Anthropic도 capabilities, speed, cost, effort를 미리 정하면 모델 결정을 좁히기 쉬워진다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)

## 역사
초기 LLM 사용에서는 제공자가 내놓은 대표 모델 하나를 쓰는 방식이 흔했지만, 2026년 현재 주요 API 문서는 같은 세대 안에서도 flagship, balanced, cost-sensitive, fast model처럼 용도별 모델을 나눠 제시한다. OpenAI 모델 문서는 GPT-5.6 Sol을 복잡한 reasoning/coding 시작점으로, Terra를 intelligence/cost 균형으로, Luna를 cost-sensitive high-volume workload로 설명한다. Anthropic 모델 문서는 Claude Fable 5, Opus 4.8, Sonnet 5, Haiku 4.5를 capability, price, latency, context window 기준으로 비교한다. (출처: https://developers.openai.com/api/docs/models, https://platform.claude.com/docs/en/about-claude/models/overview, 확인: 2026-07-11)

## 해결하려는 문제
모델 선택이 없으면 단순 분류나 대량 요약에 비싼 최상위 모델을 쓰거나, 반대로 높은 정확도가 필요한 코드 변경·검증 작업에 저비용 모델을 붙이는 문제가 생긴다. OpenAI는 먼저 accuracy target을 정하고 evaluation dataset으로 성능을 측정한 뒤 비용과 지연을 최적화하라고 설명한다. Anthropic은 모델 변경 판단에서도 실제 prompt와 data로 테스트하고 accuracy, response quality, edge case 처리와 cost tradeoff를 비교하라고 제시한다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)

## 핵심 개념
1. **정확도 우선 원칙**: OpenAI의 모델 선택 원칙은 accuracy target을 먼저 맞추고, 그 다음 cost와 latency를 낮추는 순서다. 이 순서가 바뀌면 저렴하지만 실패가 많은 모델을 고를 위험이 커진다. (출처: https://developers.openai.com/api/docs/guides/model-selection, 확인: 2026-07-11)
2. **모델 티어**: OpenAI는 Sol/Terra/Luna처럼 complex reasoning, balanced intelligence/cost, cost-sensitive workload에 맞춘 선택지를 제시한다. Anthropic은 Fable/Opus/Sonnet/Haiku를 capability와 speed/cost 기준으로 비교한다. (출처: https://developers.openai.com/api/docs/models, https://platform.claude.com/docs/en/about-claude/models/overview, 확인: 2026-07-11)
3. **가격 단위**: 2026-07-11 확인 기준 OpenAI pricing은 gpt-5.6-sol, terra, luna의 input/output 단가를 MTok 단위로 제시하며 batch/flex/priority 같은 처리 방식에 따라 단가가 달라질 수 있다. Anthropic pricing도 Claude Fable 5, Mythos 5, Opus 4.8, Sonnet 5, Haiku 4.5의 MTok 단가와 cache write/hit, batch 가격을 구분한다. (출처: https://developers.openai.com/api/docs/pricing, https://platform.claude.com/docs/en/about-claude/pricing, 확인: 2026-07-11)
4. **지연과 속도**: Anthropic은 speed를 별도 질문으로 두며, Claude Opus fast mode가 premium pricing으로 output speed를 높일 수 있다고 설명한다. 즉 latency 문제는 반드시 모델 하향만으로 해결하는 것이 아니라 처리 모드나 effort 조정으로도 다룬다. (출처: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)
5. **effort 파라미터**: Anthropic 문서는 recent Opus/Sonnet 모델에서 effort가 intelligence와 latency/cost를 한 모델 안에서 trade할 수 있게 한다고 설명한다. 이는 모델 자체를 바꾸기 전에 시도할 수 있는 두 번째 조절 축이다. (출처: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)
6. **컨텍스트와 출력 한도**: Anthropic 모델 비교표는 Claude Fable 5/Opus 4.8/Sonnet 5가 1M token context window와 128k max output을, Haiku 4.5가 200k context와 64k output을 가진다고 제시한다. OpenAI 모델 문서도 GPT-5.6 계열의 context window, max output, supported tools를 모델별로 제시한다. (출처: https://platform.claude.com/docs/en/about-claude/models/overview, https://developers.openai.com/api/docs/models, 확인: 2026-07-11)
7. **접근성·정책 제약**: Anthropic은 Claude Mythos 5가 Project Glasswing의 approved customer에게 limited availability로 제공되고, 일반 고객은 같은 capability를 제공하는 Claude Fable 5를 사용할 수 있다고 설명한다. 따라서 모델 선택은 능력뿐 아니라 사용 가능 여부와 조직 정책에도 의존한다. (출처: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5, 확인: 2026-07-11)

## 관련 기술
- tokenization-context: 비용은 텍스트 길이가 아니라 모델이 세는 token과 MTok 단가로 계산되므로, 모델 선택 전에 토큰 계산을 이해해야 한다. (출처: https://developers.openai.com/api/docs/pricing, https://platform.claude.com/docs/en/about-claude/pricing, 확인: 2026-07-11)
- context-caching: 두 벤더 모두 cached input/cache hit 계열 가격을 따로 제시한다. 반복 context가 큰 workflow는 모델 변경보다 caching 설계가 비용에 더 크게 작용할 수 있다. (출처: https://developers.openai.com/api/docs/pricing, https://platform.claude.com/docs/en/about-claude/pricing, 확인: 2026-07-11)
- hallucination-verification: OpenAI와 Anthropic이 evaluation dataset, actual prompts/data, edge case 비교를 강조하므로 모델 선택은 검증 절차와 분리되지 않는다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)
- agent-loop: long-running agentic work, high-autonomy agentic work, sub-agent tasks는 모델별 권장 use case가 다르다. agent loop 안에서는 orchestrator와 sub-task runner에 다른 모델을 배정할 수 있다. (출처: https://platform.claude.com/docs/en/about-claude/models/overview, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)

## 선행 개념
- tokenization-context: context window, max output, MTok 단가를 이해해야 비용과 입력 한계를 계산할 수 있다.
- hallucination-verification: 모델 정확도를 말하려면 evaluation dataset, edge case, response quality를 검증하는 기준이 필요하다.

## 후행 개념
- ai-era-timeline: 모델 세대와 용도별 티어가 자동완성형, 채팅형, agentic coding 도구 시대를 구분하는 재료가 된다.
- agent-loop: 모델 선택 기준을 알면 agent loop의 planner, executor, reviewer 역할에 서로 다른 모델을 배정하는 설계를 배울 수 있다.
- context-caching: 큰 context를 반복 주입하는 workflow에서 모델 단가와 caching 단가를 함께 계산할 수 있다.

## AI 시대에서의 의미
바이브코딩에서 모델 선택은 "어떤 챗봇을 쓸까"가 아니라 작업 위험도와 검증 비용을 설계하는 일이다. 예를 들어 repository-wide refactor나 보안 관련 검토는 accuracy와 edge case 처리 기준이 중요하므로 상위 모델 또는 높은 effort가 필요하고, 대량 태깅·초안 분류는 cost-sensitive 모델과 후속 샘플 검증이 더 적합할 수 있다. OpenAI와 Anthropic 모두 정확도 기준, 실제 데이터 테스트, cost/latency 최적화 순서를 문서화하고 있으므로, AI 시대의 모델 선택은 감이 아니라 측정 가능한 운영 절차다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)

## 실무 활용
1. **작업별 기본 모델 표 작성**: high-risk coding, long-context analysis, simple classification, realtime UX처럼 작업 유형을 나누고 각 유형의 기본 모델·effort·fallback을 정한다. OpenAI와 Anthropic 모델 문서는 시작점 모델과 use case를 공개적으로 제시하므로 이 표의 근거가 된다. (출처: https://developers.openai.com/api/docs/models, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)
2. **작은 평가셋으로 교체 판단**: 고객 문의 분류 50건, 코드 리뷰 샘플 20건처럼 실제 prompt/data를 모아 모델 후보를 비교한다. OpenAI는 evaluation dataset을, Anthropic은 benchmark tests와 actual prompts/data 테스트를 권장한다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)
3. **비용 계산 예시**: 한 달 입력 200M tokens, 출력 50M tokens라면 모델별 input/output MTok 단가를 곱해 비교하고, cached input·batch·flex·priority 같은 처리 방식이 있는지 따로 계산한다. 가격은 자주 바뀌므로 강의나 제품 문서에는 숫자를 고정하기보다 확인 날짜와 공식 pricing URL을 함께 둔다. (출처: https://developers.openai.com/api/docs/pricing, https://platform.claude.com/docs/en/about-claude/pricing, 확인: 2026-07-11)
4. **agent workflow 라우팅**: planner/reviewer는 더 높은 reasoning 모델, 반복 추출·형식 변환 subtask는 cost-sensitive 모델을 쓰는 식으로 역할별 모델을 나눈다. 이때 최종 answer quality는 개별 모델이 아니라 전체 workflow 평가로 판단한다. (출처: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, https://developers.openai.com/api/docs/guides/model-selection, 확인: 2026-07-11)

## FAQ
Q: 가장 비싼 모델을 항상 쓰면 안전한가?
A: 정확도 측면에서는 출발점이 될 수 있지만, OpenAI와 Anthropic 모두 비용·지연 최적화를 별도 단계로 다룬다. 단순하거나 대량인 작업에는 더 빠르고 저렴한 모델과 샘플 검증이 맞을 수 있다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)

Q: 비용을 줄이려면 바로 모델을 낮추면 되나?
A: 아니다. Anthropic 문서는 effort 조정이 모델 변경보다 더 나은 lever일 때가 있다고 설명한다. 또한 caching, batch/flex 처리, prompt 최적화가 같은 모델 안에서도 비용을 줄일 수 있다. (출처: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, https://developers.openai.com/api/docs/pricing, 확인: 2026-07-11)

Q: 벤더 문서의 모델 추천을 그대로 따르면 되나?
A: 시작점으로는 쓸 수 있지만, 두 문서 모두 실제 use case의 benchmark/evaluation을 강조한다. 제품 데이터, edge case, latency target이 다르면 추천 모델도 달라질 수 있다. (출처: https://developers.openai.com/api/docs/guides/model-selection, https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)

Q: Claude Fable 5와 Mythos 5는 왜 별도로 언급되나?
A: Anthropic은 Fable 5를 generally available 모델로, Mythos 5를 Project Glasswing 한정 모델로 설명한다. 두 모델은 specs/pricing이 같지만 접근성이 다르므로, 실제 선택에서는 사용할 수 있는 채널인지 확인해야 한다. (출처: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5, 확인: 2026-07-11)

## 자주 하는 실수
1. **정확도 목표 없이 가격만 비교**: 가격표만 보고 모델을 고르면 실패율과 재작업 비용을 놓친다. 먼저 target accuracy와 evaluation dataset을 정한다. (출처: https://developers.openai.com/api/docs/guides/model-selection, 확인: 2026-07-11)
2. **latency 문제를 모델 하향으로만 해결**: Anthropic은 speed, effort, fast mode를 별도 축으로 제시한다. 모델 하향 전 effort나 처리 모드를 확인한다. (출처: https://platform.claude.com/docs/en/about-claude/models/choosing-a-model, 확인: 2026-07-11)
3. **context window만 보고 모델 선택**: context window가 크더라도 출력 한도, latency, tokenizer, price가 다르다. Anthropic pricing은 newer tokenizer가 같은 텍스트에서 토큰 수를 더 만들 수 있다고 설명하므로 실제 workload로 재계산해야 한다. (출처: https://platform.claude.com/docs/en/about-claude/models/overview, https://platform.claude.com/docs/en/about-claude/pricing, 확인: 2026-07-11)
4. **접근 제한을 능력 차이로 오해**: Mythos 5처럼 limited availability인 모델은 능력보다 접근 정책이 선택을 제한할 수 있다. 쓸 수 없는 모델을 계획에 넣지 않는다. (출처: https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5, 확인: 2026-07-11)

## 공식 출처
- 정확도·비용·지연의 모델 선택 원칙 — [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection) (확인: 2026-07-11)
- GPT-5.6 Sol/Terra/Luna의 권장 용도, reasoning level, context window, max output — [OpenAI Models](https://developers.openai.com/api/docs/models) (확인: 2026-07-11)
- OpenAI 모델별 MTok 단가, cached input, batch/flex/priority 가격 — [OpenAI Pricing](https://developers.openai.com/api/docs/pricing) (확인: 2026-07-11)
- Claude 모델 선택 질문, effort, fast mode, 평가 절차 — [Claude Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) (확인: 2026-07-11)
- Claude Fable/Opus/Sonnet/Haiku 비교, context/output, latency, model ID — [Claude Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) (확인: 2026-07-11)
- Claude 모델 가격, cache, batch, long context pricing — [Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing) (확인: 2026-07-11)
- Claude Fable 5/Mythos 5 launch details and availability — [Introducing Claude Fable 5 and Claude Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) (확인: 2026-07-11)

## Quote Bank
- > "Choose the best model for performance and cost."
  - 출처: [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection) (확인: 2026-07-11)
  - 맥락: 모델 선택의 목적을 설명할 때 사용.
- > "requires balancing accuracy, latency, and cost."
  - 출처: [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection) (확인: 2026-07-11)
  - 맥락: 3축 트레이드오프 정의.
- > "Optimize for accuracy first"
  - 출처: [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection) (확인: 2026-07-11)
  - 맥락: 모델 비교의 순서.
- > "Developing an evaluation dataset"
  - 출처: [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection) (확인: 2026-07-11)
  - 맥락: 정확도 목표를 측정하는 방법.
- > "Tuning effort is often a better lever than switching models."
  - 출처: [Claude Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) (확인: 2026-07-11)
  - 맥락: 모델 변경 전 조절 가능한 축.
- > "The best combination of speed and intelligence"
  - 출처: [Claude Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) (확인: 2026-07-11)
  - 맥락: Sonnet 티어의 균형 포지션.
- > "The fastest model with near-frontier intelligence"
  - 출처: [Claude Models overview](https://platform.claude.com/docs/en/about-claude/models/overview) (확인: 2026-07-11)
  - 맥락: Haiku 계열의 속도·비용 포지션.
- > "Claude Fable 5 and Claude Mythos 5 share the same specs and pricing"
  - 출처: [Introducing Claude Fable 5 and Claude Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5) (확인: 2026-07-11)
  - 맥락: R1 후보를 R2 모델 선택 KB의 세대 예시로 흡수할 때 사용.

## 변경 이력
- 2026-07-11: 최초 공개 공식 문서 기반 KB 작성 및 P-02 검증 승인 (Codex, M4/P-01→P-02)
