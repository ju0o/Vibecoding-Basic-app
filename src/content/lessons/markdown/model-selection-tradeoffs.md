## 한 줄 정의

모델 선택은 작업이 요구하는 정확도, 지연, 비용, context window, 출력 한도, 접근 가능성, 평가 방법을 함께 고려해 어떤 AI 모델과 설정을 쓸지 정하는 운영 의사결정입니다. 단순히 "가장 똑똑한 모델"을 고르는 문제가 아닙니다. high-risk 코드 변경, 긴 문서 분석, 대량 분류, 실시간 UX, agent workflow처럼 작업 성격이 달라지면 적절한 모델과 effort, caching, batch 처리 방식도 달라집니다.

OpenAI의 모델 선택 KB는 performance와 cost에 맞는 모델을 고르는 문제로 설명하고, accuracy, latency, cost의 균형을 명시합니다. Anthropic KB도 capabilities, speed, cost, effort를 미리 정하면 선택이 좁혀진다고 정리합니다. ==모델 선택의 핵심은 가격표 비교가 아니라, 먼저 성공 기준을 정하고 그 기준을 만족하는 후보 안에서 비용과 속도를 최적화하는 것==입니다.

이 강의는 AI 활용 기초 모듈의 중급 관문입니다. 이미 tokenization, context window, hallucination verification, evaluation의 기본을 배웠다는 전제 위에서, 실제 제품이나 바이브코딩 작업에 어떤 모델을 붙일지 판단하는 법을 다룹니다. 모델 이름은 시간이 지나며 바뀔 수 있으므로, 이 강의는 특정 이름 암기보다 선택 절차와 trade-off 구조를 중심으로 읽어야 합니다.

![모델 선택 트레이드오프 지도](/lesson-diagrams/model-selection-tradeoffs/model-selection-tradeoff-map.svg)

## 왜 존재하는가

AI API를 처음 쓰면 "가장 좋은 모델 하나를 쓰면 되지 않을까"라고 생각하기 쉽습니다. 하지만 실제 서비스에서는 요청 수, 응답 시간, 정확도 요구, 실패 비용, context 길이, 출력 길이, 사용자 경험이 모두 다릅니다. 고객 문의를 초벌 분류하는 작업과 보안 관련 코드를 고치는 작업은 같은 모델 선택 기준을 가질 수 없습니다. 전자는 낮은 단가와 빠른 처리, 후자는 정확도와 edge case 검토가 더 중요합니다.

모델 선택이 없으면 두 종류의 낭비가 생깁니다. 첫째, 단순 작업에 비싼 상위 모델을 붙여 비용이 불필요하게 커집니다. 둘째, 높은 정확도가 필요한 작업에 낮은 모델을 붙여 실패율과 재작업 비용이 커집니다. 겉으로는 두 번째가 싸 보이지만, 사람이 다시 검토하고 수정하는 비용까지 합치면 더 비쌀 수 있습니다.

이 문제가 더 복잡해진 이유는 모델 선택지가 늘었기 때문입니다. KB는 OpenAI 문서가 복잡한 reasoning/coding 시작점, intelligence/cost 균형, cost-sensitive high-volume workload처럼 모델 티어를 나눠 제시한다고 정리합니다. Anthropic 문서도 Fable, Opus, Sonnet, Haiku 계열을 capability, price, latency, context window 기준으로 비교합니다. 같은 벤더 안에서도 "정확도", "속도", "가격", "context", "사용 가능 여부"가 다릅니다.

AI 시대의 개발자는 모델 이름을 외우는 사람이 아니라 작업 위험도와 검증 비용을 설계하는 사람이 되어야 합니다. 바이브코딩에서도 마찬가지입니다. 전체 repository refactor에는 높은 reasoning과 검증 루틴이 필요하고, commit message 후보 생성이나 대량 tag 추출에는 더 빠르고 저렴한 모델이 적합할 수 있습니다. 모델 선택은 개발 생산성의 세부 설정이 아니라 제품 품질과 운영 비용을 동시에 좌우하는 설계입니다.

> [!KEY]
> 모델 선택의 질문은 "어느 모델이 최고인가"가 아닙니다. "이 작업에서 실패 비용은 얼마이고, 어느 정확도까지는 반드시 필요하며, 그다음 무엇을 줄일 수 있는가"입니다.

## 작동 원리

### 1. 작업을 위험도와 검증 가능성으로 나눈다

모델 선택은 작업 분류에서 시작합니다. 모든 요청을 같은 모델에 보내면 관리가 단순해 보이지만, 실제로는 위험과 비용이 섞입니다. 예를 들어 색상 팔레트 초안, 문서 요약, 고객 문의 tag 분류, SQL migration 작성, 인증 로직 수정, agent가 여러 파일을 고치는 작업은 실패 비용이 다릅니다. 실패해도 쉽게 눈으로 확인할 수 있는 작업과, 실패가 숨어 있다가 나중에 큰 장애가 되는 작업도 다릅니다.

작업 위험도는 모델 티어 선택의 첫 신호입니다. low-risk, high-volume 작업은 cost-sensitive 모델과 샘플 검증이 맞을 수 있습니다. 반대로 high-risk coding, 보안, 데이터 삭제, 장기 agent loop, 사용자에게 직접 노출되는 답변은 accuracy target과 evaluation을 먼저 세워야 합니다. ==모델 선택은 모델 표에서 시작하지 않고 작업의 실패 비용에서 시작합니다==.

### 2. accuracy target을 먼저 정한다

OpenAI KB는 정확도 목표를 먼저 맞추고 그다음 cost와 latency를 낮추는 순서를 강조합니다. 이 순서가 중요한 이유는 비용 최적화를 먼저 하면 "싸지만 자주 틀리는" 선택을 할 수 있기 때문입니다. 모델이 한 번 틀릴 때마다 사람이 검토하고 되돌리는 시간이 든다면, 낮은 단가는 전체 비용을 제대로 설명하지 못합니다.

accuracy target은 숫자 하나일 수도 있고, pass/fail rule의 묶음일 수도 있습니다. 예를 들어 "고객 문의 의도 분류에서 95% 이상", "코드 리뷰 샘플 20개 중 치명적 누락 0개", "공식 문서 인용 불일치 0개"처럼 정할 수 있습니다. 중요한 것은 감이 아니라 실제 prompt와 data로 비교하는 것입니다.

### 3. evaluation dataset으로 후보를 비교한다

모델 선택은 실제 작업 샘플 없이는 추측이 됩니다. 평가셋은 작은 규모로 시작해도 됩니다. 고객 문의 50건, 코드 변경 20건, 긴 문서 질의 30개, citation 검증 샘플 15개처럼 실제 입력과 기대 결과를 모읍니다. 그런 다음 후보 모델을 같은 prompt와 같은 기준으로 비교합니다.

평가셋에는 edge case가 꼭 들어가야 합니다. 쉬운 예시만 모으면 어떤 모델도 좋아 보입니다. 실무에서 중요한 것은 애매한 요청, 긴 context, 모순된 정보, 누락된 정보, 형식 제약, 보안 위험, 잘못된 사용자의 입력입니다. 모델 선택은 평균 점수만 보는 일이 아니라 실패 양상을 관찰하는 일입니다.

### 4. latency와 cost를 두 번째 축으로 최적화한다

정확도 기준을 만족하는 후보가 생기면 그다음 latency와 cost를 봅니다. latency는 사용자가 기다리는 시간이고, cost는 입력·출력 token, cached input, batch 처리, priority 처리 같은 단가 구조와 연결됩니다. 대화형 UI에서는 빠른 응답이 중요하고, 밤에 돌리는 batch job에서는 단가가 더 중요할 수 있습니다.

비용을 줄이는 방법은 모델 하향만이 아닙니다. prompt를 줄이고, context를 잘라내고, 반복 prefix를 caching하고, batch/flex 같은 처리 방식을 쓰고, output length를 제한할 수 있습니다. Anthropic KB는 effort 조정이 모델 변경보다 좋은 lever일 때가 있다고 정리합니다. 즉 같은 모델 안에서도 추론 강도와 비용·지연의 trade-off를 조절할 수 있습니다.

### 5. context window와 max output을 확인한다

모델이 충분히 정확하고 저렴해도 입력이 context window에 들어가지 않거나 출력 한도가 부족하면 사용할 수 없습니다. 긴 repository 분석, 대규모 문서 QA, agent state 유지, RAG 결과 결합은 context window를 크게 요구할 수 있습니다. 반대로 짧은 분류 작업은 큰 context가 필요 없습니다.

context window는 "많이 넣을 수 있다"는 뜻이지 "많이 넣으면 항상 좋다"는 뜻은 아닙니다. 이미 배운 tokenization과 context engineering 관점이 여기서 필요합니다. 긴 입력은 비용과 latency를 올리고, 중요 정보가 묻힐 수 있습니다. 따라서 모델 선택에는 context 크기뿐 아니라 필요한 정보 선별과 prompt 압축 전략도 함께 들어갑니다.

### 6. agent workflow에서는 역할별 모델을 나눈다

Agent나 workflow에서는 하나의 모델만 쓰지 않을 수 있습니다. planner나 reviewer는 높은 reasoning 모델을 쓰고, 반복적인 extraction이나 formatting subtask는 더 저렴한 모델을 쓸 수 있습니다. Long-running agentic work와 high-autonomy agentic work는 정확도와 안정성이 중요하고, 단순 변환 작업은 비용 최적화 여지가 큽니다.

이때 중요한 것은 개별 모델 점수가 아니라 전체 workflow 성능입니다. planner가 좋은 계획을 세워도 executor가 자주 실패하면 전체 품질은 낮아집니다. 반대로 모든 subtask에 상위 모델을 쓰면 품질은 높아도 비용이 감당되지 않을 수 있습니다. 역할별 모델 배정은 orchestration과 evaluation을 함께 요구합니다.

```ts
type AiTaskRisk = "low" | "medium" | "high"

type ModelRoute = {
  readonly task: string
  readonly risk: AiTaskRisk
  readonly accuracyTarget: string
  readonly latencyTarget: string
  readonly costPolicy: "minimize" | "balanced" | "accuracy-first"
  readonly evaluation: string
}

const routes: ModelRoute[] = [
  {
    task: "고객 문의 1차 분류",
    risk: "low",
    accuracyTarget: "샘플 100건 기준 macro F1 0.9 이상",
    latencyTarget: "batch 처리 가능",
    costPolicy: "minimize",
    evaluation: "주간 샘플 검수와 오분류 top 10 리뷰",
  },
  {
    task: "인증 로직 코드 리뷰",
    risk: "high",
    accuracyTarget: "critical issue 누락 0건",
    latencyTarget: "대화형 30초 이내",
    costPolicy: "accuracy-first",
    evaluation: "보안 체크리스트와 human review",
  },
]
```

이 예시는 실제 모델 이름을 고정하지 않습니다. 대신 작업 위험도, 정확도 기준, latency target, 비용 정책, 평가 방식을 먼저 적습니다. 모델 이름은 이 표를 만족하는 후보 중에서 고릅니다. 이렇게 하면 모델 세대가 바뀌어도 선택 절차는 유지됩니다.

## 스펙과 세부

### 모델 이름은 날짜와 함께 읽는다

모델 문서는 자주 바뀝니다. KB는 2026-07-11에 확인한 OpenAI와 Anthropic 공식 문서를 기준으로 합니다. 특정 모델 이름, context window, 가격, availability는 시간이 지나며 바뀔 수 있습니다. 따라서 제품 문서에는 항상 확인 날짜와 공식 pricing URL을 함께 둡니다.

### 가격 단위는 input과 output을 나눠 본다

AI 비용은 대개 입력과 출력 token 단가가 다릅니다. 긴 문서를 읽고 짧게 답하는 작업과 짧은 prompt로 긴 report를 쓰는 작업은 비용 구조가 다릅니다. cached input이나 batch 처리 가격도 별도일 수 있습니다. 그래서 "이 모델은 비싸다"보다 "우리 workload의 input/output 비율에서 얼마인가"를 계산해야 합니다.

### effort는 모델 변경 전 조절 축이다

KB는 Anthropic 문서가 effort를 intelligence와 latency/cost 사이의 trade-off를 조정하는 축으로 설명한다고 정리합니다. 즉 성능이 부족하다고 바로 상위 모델로 바꾸기 전에 effort 조정, prompt 개선, evaluation 샘플 확인을 먼저 볼 수 있습니다. 반대로 latency가 중요하면 effort를 낮추거나 빠른 모드를 고려할 수 있습니다.

### availability는 능력과 별개다

어떤 모델은 limited availability이거나 특정 프로젝트·고객에게만 제공될 수 있습니다. KB는 Claude Mythos 5가 Project Glasswing의 approved customer에게 limited availability로 제공되고, 일반 고객은 같은 capability를 제공하는 Claude Fable 5를 사용할 수 있다고 정리합니다. 따라서 모델 선택표에는 "사용 가능 여부"가 꼭 들어가야 합니다.

### fallback 모델과 escalation 기준을 둔다

운영에서는 모델 장애, rate limit, 가격 변경, latency 악화가 생길 수 있습니다. fallback 모델과 escalation 기준을 정하면 갑작스러운 장애에도 대응할 수 있습니다. 예를 들어 low-risk batch는 fallback을 허용하고, high-risk security review는 fallback 없이 대기하거나 human review를 요구할 수 있습니다.

## 원문으로 읽기

> "Choose the best model for performance and cost."
>
> — 성능과 비용에 맞는 최적 모델을 고른다.
> [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection)

이 문장은 모델 선택을 감각이 아니라 최적화 문제로 보게 합니다. 성능만 보면 비용을 놓치고, 비용만 보면 실패율을 놓칩니다. "best"는 절대적 최상위가 아니라 특정 작업 조건 안에서의 최적입니다.

> "requires balancing accuracy, latency, and cost."
>
> — 정확도, 지연, 비용의 균형이 필요하다.
> [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection)

모델 선택의 세 축이 여기서 분명해집니다. 정확도는 답의 품질과 실패율, latency는 사용자 경험, cost는 운영 지속 가능성과 연결됩니다. 세 축 중 하나만 보면 제품 판단이 왜곡됩니다.

> "Optimize for accuracy first"
>
> — 먼저 정확도를 최적화한다.
> [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection)

이 순서는 실무에서 매우 중요합니다. 정확도 기준을 만족하지 못하는 모델은 아무리 싸도 실제 비용을 줄여 주지 못할 수 있습니다. 재작업, human review, 사용자 불만, 장애 비용이 나중에 붙기 때문입니다.

> "Tuning effort is often a better lever than switching models."
>
> — effort 조정이 모델 변경보다 더 나은 조절 장치일 때가 많다.
> [Claude Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model)

모델 선택은 모델 이름 교체만이 아닙니다. 같은 모델 안에서도 effort를 조정해 reasoning 강도, latency, cost를 바꿀 수 있습니다. 이 인용은 모델 선택을 더 섬세한 운영 knobs의 문제로 확장합니다.

## 실전에서

### 패턴 1: 작업별 모델 라우팅 표를 만든다

팀은 먼저 작업 유형을 나눕니다. 예를 들어 "학습 콘텐츠 초안", "공식 출처 인용 대조", "코드 변경", "테스트 실패 분석", "대량 태깅", "사용자 실시간 챗봇"처럼 구분합니다. 각 row에 risk, accuracy target, latency target, cost policy, allowed model tier, fallback을 적습니다. 이렇게 하면 개발자가 임의로 모델을 고르지 않고 운영 기준을 따릅니다.

### 패턴 2: 작은 평가셋으로 모델 변경을 결정한다

새 모델이 나왔다고 바로 전체 시스템을 바꾸지 않습니다. 실제 prompt와 data를 모아 작은 evaluation dataset을 만들고 기존 모델과 비교합니다. 평균 점수뿐 아니라 edge case, hallucination, citation mismatch, tool-call 실패, output format 위반을 봅니다. 이 비교가 통과하면 일부 traffic에서 canary처럼 적용하고 로그를 관찰합니다.

### 패턴 3: 비용은 월간 workload로 계산한다

가격표의 MTok 단가만 보면 감이 잘 오지 않습니다. 월간 input token, output token, cached input 비율, batch 처리 가능 비율을 추정해 실제 비용을 계산합니다. 예를 들어 문서 요약은 input이 크고 output이 짧을 수 있고, report 생성은 output이 클 수 있습니다. 모델별 input/output 가격 차이가 결과 비용을 바꿉니다.

### 패턴 4: high-risk 작업은 human review와 묶는다

상위 모델을 쓴다고 human review가 사라지지 않습니다. 보안, 결제, 개인정보, 데이터 삭제, migration, 장기 agent refactor는 모델 선택과 별개로 review와 test를 요구합니다. 모델 선택은 위험을 낮추는 한 요소이고, 검증 루틴은 별도의 안전망입니다.

> [!EXAMPLE]
> 바이브코딩에서 간단한 UI copy 후보는 빠른 모델로 여러 안을 받고 사람이 고를 수 있습니다. 반면 auth/session/token 로직 변경은 정확도 우선 모델, 공식 문서 대조, 테스트, human review가 함께 필요합니다.

## 한계와 트레이드오프

모델 선택표는 의사결정을 돕지만, 모든 상황을 자동으로 해결하지는 않습니다. 실제 prompt 품질이 낮으면 좋은 모델도 실패할 수 있고, 평가셋이 편향되어 있으면 잘못된 모델이 좋아 보일 수 있습니다. 따라서 모델 선택은 prompt engineering, context engineering, grounding, evaluation과 연결되어야 합니다.

또 다른 한계는 문서의 변동성입니다. 모델 이름, 가격, context window, output limit, availability는 바뀔 수 있습니다. 이 강의는 2026-07-11에 승인된 KB를 기준으로 하지만, 실제 제품에 적용할 때는 공식 pricing과 model docs를 다시 확인해야 합니다. 특히 가격 숫자를 코드나 문서에 하드코딩하면 금방 낡을 수 있습니다.

비용 최적화에도 trade-off가 있습니다. 저렴한 모델을 쓰면 실패율이 올라갈 수 있고, batch 처리를 쓰면 단가는 낮아도 latency가 늘 수 있습니다. cached input을 쓰려면 stable prefix를 설계해야 하고, effort를 낮추면 빠르지만 어려운 edge case에서 성능이 떨어질 수 있습니다. ==모든 최적화는 다른 축의 비용을 만든다는 사실을 기록해야 합니다==.

마지막으로 모델 선택은 벤더 선택과도 다릅니다. 여러 벤더 문서는 서로 다른 모델명과 가격 체계를 가집니다. 제품은 특정 벤더의 장점만이 아니라 조직의 보안 정책, 데이터 위치, SDK 안정성, 도구 지원, 장애 대응, 계약 조건까지 함께 봐야 합니다. 이 강의는 그중 모델별 trade-off를 이해하는 첫 단계입니다.

## 더 읽기

- [OpenAI Model selection](https://developers.openai.com/api/docs/guides/model-selection): performance와 cost에 맞는 모델 선택 절차, accuracy-first 관점을 확인합니다.
- [OpenAI Models](https://developers.openai.com/api/docs/models): 모델별 권장 용도, context window, max output, supported tools를 확인합니다.
- [OpenAI Pricing](https://developers.openai.com/api/docs/pricing): input/output MTok 단가와 cached input, batch/flex/priority 같은 처리 방식을 봅니다.
- [Claude Choosing the right model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model): capabilities, speed, cost, effort 질문으로 선택을 좁히는 방식을 읽습니다.
- [Claude Models overview](https://platform.claude.com/docs/en/about-claude/models/overview): capability, price, latency, context window 기준의 모델 비교를 확인합니다.
- [Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing): cache write/hit, batch, long context pricing을 확인합니다.
- [Introducing Claude Fable 5 and Claude Mythos 5](https://platform.claude.com/docs/en/about-claude/models/introducing-claude-fable-5-and-claude-mythos-5): availability가 모델 선택에 어떤 영향을 주는지 확인합니다.

다음에 읽을 순서는 두 갈래입니다. 비용과 context가 궁금하면 Context Caching과 Tokenization을 다시 읽고, workflow 안에서 역할별 모델을 나누고 싶다면 Agent Loop와 Orchestration 강의로 넘어가면 좋습니다. 모델 선택은 혼자 끝나는 주제가 아니라 AI 시스템 운영 전체에 붙어 있는 결정입니다.
