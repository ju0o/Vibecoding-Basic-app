## 한 줄 정의

토큰화와 컨텍스트는 LLM 입력을 "모델이 처리하는 계산 단위"와 "응답을 만들 때 참조하는 작업 메모리"로 나누어 이해하는 기본 개념입니다. 사용자는 문장, 파일, 로그, 이미지, 도구 정의를 넣는다고 느끼지만 모델과 API 입장에서는 이 모든 재료가 토큰으로 계산되고 context window 안에서 경쟁합니다. 그래서 AI에게 무엇을 줄지 결정하는 일은 단순히 좋은 설명을 쓰는 일이 아니라 비용, 지연, 정확도, 회상 가능성을 함께 설계하는 일이 됩니다.

토큰은 글자 수와 같지 않습니다. context window도 모델이 학습한 모든 지식을 뜻하지 않습니다. context window는 현재 요청에서 모델이 응답을 만들 때 볼 수 있는 유한한 범위이며, system prompt, messages, documents, images, tool definitions, tool results, response 자체가 모두 이 범위에 들어갈 수 있습니다. ==AI 기초에서 가장 먼저 배워야 할 것은 "많이 넣기"가 아니라 "무엇이 window를 차지하는지 보기"입니다.==

이 강의의 목표는 token counting을 단순 비용 계산으로 끝내지 않는 것입니다. 토큰 수를 세는 이유, context window를 작업 메모리로 보는 이유, cached prompt prefix가 왜 window 용량을 없애지 않는지, 긴 context가 왜 항상 더 나은 답변을 보장하지 않는지까지 연결합니다. 이후 Prompt Engineering, Grounding, RAG, Context Engineering을 배울 때도 이 관점이 계속 바닥에 깔립니다.

## 왜 존재하는가

LLM API를 처음 쓰면 사용자는 "프롬프트를 보내고 답을 받는다"고 생각하기 쉽습니다. 그러나 운영 관점에서는 요청을 보내기 전에 이미 중요한 질문이 생깁니다. 이 입력은 target length 안에 들어가는가, context window를 넘지 않는가, 비용과 rate limit에 어떤 영향을 주는가, 더 작은 모델로 routing할 수 있는가, 출력이 들어갈 여유는 남아 있는가. Anthropic token counting 문서는 token counting이 비용, rate limit, model routing, target length 관리에 도움을 준다고 설명합니다. 이 말은 토큰 수가 단순 통계가 아니라 요청 전 의사결정의 입력이라는 뜻입니다.

토큰화 개념이 필요한 이유는 사람의 텍스트 감각과 모델의 처리 단위가 다르기 때문입니다. 우리는 "짧은 문장"과 "긴 문장"을 글자 수나 줄 수로 판단하지만, 모델은 tokenizer가 만든 토큰 단위로 입력을 처리합니다. Anthropic 문서는 모델 tokenizer 변화에 따라 같은 입력도 다른 token count를 만들 수 있고, 사용하려는 model 기준으로 다시 세라고 권장합니다. 그러므로 "대충 이 정도면 되겠지"라는 감각만으로는 비용과 window fit을 안정적으로 판단하기 어렵습니다.

context window 개념도 같은 이유로 필요합니다. 사용자는 모델이 대화 전체, 프로젝트 전체, 인터넷 전체를 자동으로 기억한다고 느낄 수 있습니다. 하지만 Claude context windows 문서는 context window를 학습 데이터 전체가 아니라 응답 생성 중 참조할 수 있는 텍스트, 즉 작업 메모리로 설명합니다. Claude Code prompt caching 문서도 model이 requests 사이에서 아무것도 기억하지 않는다고 설명합니다. 따라서 현재 요청에 포함되지 않은 파일, 문서, 정책, 로그는 모델이 자동으로 참조할 수 없습니다.

이 차이를 모르면 두 가지 실수가 생깁니다. 첫째, 모델이 프로젝트 파일을 이미 알고 있다고 믿고 중요한 근거를 빼먹습니다. 둘째, 반대로 모든 파일과 모든 로그를 넣으면 정확도가 올라간다고 믿습니다. Claude context windows 문서는 더 많은 context가 자동으로 더 좋은 결과를 뜻하지 않고, token count가 커질수록 accuracy와 recall이 떨어질 수 있다고 설명합니다. ==토큰화와 컨텍스트는 "AI에게 얼마나 말할까"가 아니라 "무엇을 넣고 무엇을 빼야 할까"라는 설계 질문을 만들기 위해 존재합니다.==

바이브코딩에서는 이 개념이 특히 빨리 중요해집니다. 코드 작업은 system prompt, repository 규칙, 파일 내용, 테스트 로그, 도구 결과, 이전 대화가 모두 붙습니다. 여기에 모델이 생성할 response 여유도 필요합니다. 작은 작업은 감으로 해도 넘어갈 수 있지만, 긴 디버깅이나 코드 리뷰, 여러 도구를 쓰는 agent loop에서는 context budget이 없으면 실패 원인을 알기 어려워집니다.

## 작동 원리

### 1. 입력은 먼저 모델별 tokenizer를 통과합니다

토큰화의 출발점은 "입력 텍스트가 내부 처리 단위로 바뀐다"는 점입니다. KB는 token count가 문자 수와 동일하지 않으며, model tokenizer 변화에 따라 같은 입력도 다른 token count를 만들 수 있다고 정리합니다. Anthropic 문서는 Claude Opus 4.7 이후 Opus 계열, Claude Fable 5, Claude Mythos 5, Claude Sonnet 5가 새 tokenizer를 사용하며 같은 입력도 이전 모델보다 대략 30% 더 많은 토큰을 만들 수 있다고 설명합니다. 이 모델명과 수치는 2026-07-05 기준 해당 문서에 근거한 정보입니다.

여기서 중요한 원리는 "토큰 수는 모델 독립적인 상수가 아니다"입니다. 같은 파일, 같은 한국어 설명, 같은 JSON 구조라도 어떤 모델로 보낼지에 따라 token count가 달라질 수 있습니다. 그래서 token counting은 프롬프트 작성이 끝난 뒤 한 번 보는 장식이 아니라, 실제 사용할 모델 기준으로 다시 계산하는 절차가 됩니다.

### 2. Token counting은 요청 전 사전 점검입니다

Anthropic token counting endpoint는 system prompt, tools, images, PDFs를 포함한 구조화 입력을 받아 total input tokens를 반환한다고 KB가 정리합니다. 이 말은 사용자가 단순한 텍스트 본문만 세는 것이 아니라 실제 요청에 들어가는 구조 전체를 봐야 한다는 뜻입니다. messages만 길다고 문제가 되는 것이 아니라 tools schema, PDF, image, system prompt도 입력 예산을 차지할 수 있습니다.

다만 token counting 결과는 추정값일 수 있습니다. Anthropic 문서는 실제 message creation에서 사용되는 input tokens와 작은 차이가 날 수 있다고 설명합니다. 따라서 운영에서는 사전 token counting과 실제 usage를 함께 봅니다. 사전 계산은 요청을 보낼지, 줄일지, 모델을 바꿀지 판단하는 데 쓰고, 실제 usage는 비용과 최적화 결과를 확인하는 데 씁니다.

### 3. Context window는 작업 메모리입니다

Context window는 모델이 응답 생성 중 참조할 수 있는 텍스트 전체입니다. KB는 response 자체도 window에 포함된다고 정리합니다. 이것이 의미하는 바는 명확합니다. 입력을 window 끝까지 꽉 채우면 모델이 충분한 출력 공간을 갖기 어렵고, 긴 응답을 기대한다면 출력 토큰을 위한 여유도 context budget에 포함해야 합니다.

Claude context windows 문서는 system prompt, messages, documents, images, tool definitions, tool results가 window에 포함될 수 있다고 설명합니다. 따라서 tool calling을 쓰는 AI 코딩 도구에서는 도구 정의 자체도 비용입니다. 도구 실행 결과도 비용입니다. 실패 로그를 길게 붙이면 그 로그가 작업 메모리를 차지하고, 다음 판단에서 다른 근거가 밀릴 수 있습니다.

### 4. Context budget은 포함과 제외를 동시에 기록합니다

context budget을 설계한다는 것은 "넣은 것"만 기록하는 일이 아닙니다. 무엇을 왜 넣었고, 무엇을 왜 뺐는지도 기록해야 합니다. 예를 들어 코드 리뷰에서는 변경 파일, 실패 테스트, 관련 문서, 검증 기준은 high-signal evidence일 수 있습니다. 반대로 반복 로그 전체, 오래된 대화, 현재 작업과 무관한 파일은 요약하거나 제외할 수 있습니다.

이때 "제외"는 무책임한 생략이 아닙니다. Claude 문서의 context rot 설명처럼 token count가 커질수록 accuracy와 recall이 떨어질 수 있다면, 낮은 신호를 그대로 넣는 것은 오히려 품질을 떨어뜨릴 수 있습니다. ==context budget은 정보를 적게 주기 위한 핑계가 아니라, 필요한 정보를 더 잘 보이게 만드는 정렬 방식입니다.==

### 5. 긴 context는 항상 더 좋은 답변을 만들지 않습니다

긴 context의 장점은 분명합니다. 더 많은 문서, 더 많은 로그, 더 많은 파일을 한 요청에서 참조할 수 있습니다. 그러나 KB는 Claude context windows 문서가 "더 많은 context가 자동으로 더 좋은 결과를 뜻하지 않는다"고 설명한다고 정리합니다. token count가 늘수록 accuracy와 recall이 떨어질 수 있으며, 이를 context rot이라고 부릅니다.

작동 원리 관점에서는 모델이 window 안의 모든 정보를 같은 품질로 활용한다고 가정하면 안 됩니다. 관련 없는 정보가 많아지면 중요한 정보가 덜 눈에 띄고, 오래된 맥락과 최신 맥락이 섞이며, 모델이 어느 근거를 우선해야 하는지 헷갈릴 수 있습니다. 따라서 긴 context를 쓰는 실무에서는 선별, 구조화, 요약, 검증 기준이 함께 필요합니다.

### 6. Prompt caching은 window 용량을 없애지 않습니다

Prompt caching은 반복 prefix의 처리 비용과 latency를 줄일 수 있습니다. 하지만 KB는 Anthropic 문서가 cached prompt prefixes도 context window를 계속 차지한다고 설명한다고 정리합니다. 즉 caching은 "이미 보냈던 내용이 window에서 사라진다"는 뜻이 아닙니다. 같은 prefix를 덜 비싸게 처리할 수 있을 뿐, 현재 요청에서 모델이 참조할 수 있는 범위 안에는 여전히 포함됩니다.

이 구분은 초보자에게 매우 중요합니다. 캐시를 쓰면 비용과 지연은 줄 수 있지만, context window 한계가 사라지는 것은 아닙니다. 긴 project rule, tool definitions, examples가 cache hit을 얻더라도 그 prefix는 window를 차지합니다. 그래서 caching과 context budgeting은 서로 다른 문제입니다. caching은 반복 처리 최적화이고, context budgeting은 작업 메모리 구성입니다.

### 7. 이후 개념으로 이어지는 다리

Prompt Engineering은 이 작업 메모리 안에 목표, 제약, 근거 정책, 출력 형식을 어떻게 넣을지 다룹니다. Grounding은 넣은 근거가 어떤 claim을 support하는지 다룹니다. RAG는 필요한 외부 문서를 검색해 context로 가져오는 방식입니다. Context Engineering은 이 모든 재료를 언제 넣고, 언제 빼고, 언제 요약하고, 언제 검색할지 설계합니다. 토큰화와 컨텍스트는 이 모든 주제의 출발점입니다.

## 스펙과 세부

### 모델별 token count 차이

KB는 Anthropic 문서에 근거해 모델별 tokenizer 차이를 강조합니다. 같은 입력도 목표 모델에 따라 token count가 달라질 수 있으므로, 운영에서는 "문자 수 기준"이나 "이전 모델 기준"으로 판단하지 않습니다. 특히 모델 routing을 하는 시스템에서는 요청을 어느 모델에 보낼지 결정하기 전에 해당 모델 기준으로 prompt를 다시 세어야 합니다.

### 입력 요소별 window 점유

Context window에는 system prompt, messages, documents, images, tool definitions, tool results가 포함될 수 있습니다. 여기에 response 자체도 window 안에 들어갑니다. 그래서 입력 계산은 "user message 길이"만 보는 것으로 끝나지 않습니다. 도구를 많이 등록하면 tool definitions가 늘고, 도구 결과를 길게 반환하면 다음 판단에서 tool results가 window를 차지합니다.

### 추정과 실제 usage

Token counting endpoint가 반환하는 값은 요청 전 추정에 쓰입니다. Anthropic 문서는 실제 message creation에서 사용되는 input tokens와 작은 차이가 날 수 있다고 설명합니다. 이 차이를 인정하면, 사전 계산을 절대값으로 보지 않고 운영 판단의 근사치로 사용하게 됩니다. 실제 비용 관리는 usage 결과와 함께 확인해야 합니다.

### Caching과 capacity의 구분

Prompt caching은 반복 prefix의 비용과 latency를 줄일 수 있지만, cached prompt prefixes still occupy the context window라는 KB의 설명처럼 window 용량 문제를 해결하지 않습니다. 캐시가 잘 맞아도 너무 많은 도구 정의와 문서가 들어가면 context budget은 여전히 빡빡해집니다. 따라서 "캐시가 있으니 긴 프롬프트를 마음껏 넣어도 된다"는 결론은 KB 근거와 맞지 않습니다.

### 실행 가능한 예시: context budget 기록

```ts
type ContextBudget = {
  model: string
  estimatedInputTokens: number
  reservedOutputTokens: number
  includedEvidence: Array<{ kind: "file" | "log" | "doc"; reason: string }>
  omittedEvidence: Array<{ kind: "file" | "log" | "doc"; reason: string }>
}

const reviewBudget: ContextBudget = {
  model: "target-model",
  estimatedInputTokens: 18000,
  reservedOutputTokens: 2000,
  includedEvidence: [
    { kind: "file", reason: "changed component that failed review" },
    { kind: "log", reason: "first failing test output only" },
  ],
  omittedEvidence: [
    { kind: "log", reason: "repeated stack frames after the first failure" },
    { kind: "doc", reason: "unrelated deployment notes" },
  ],
}

console.log(reviewBudget.includedEvidence.map((item) => item.reason).join("\n"))
```

이 코드는 실제 provider SDK를 호출하지 않습니다. 대신 KB의 핵심 구조를 실행 가능한 TypeScript 데이터 모델로 표현합니다. 중요한 점은 `includedEvidence`와 `omittedEvidence`를 함께 둔다는 것입니다. context budget은 "무엇을 보냈는가"뿐 아니라 "왜 이것만 보냈는가"를 설명할 수 있어야 합니다.

## 원문으로 읽기

> "working memory"
>
> — 작업 메모리.
> [Context windows — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)

이 짧은 표현은 context window를 이해하는 기준입니다. context window는 모델의 전체 학습 데이터가 아니고, 요청 사이에 자동으로 유지되는 장기 기억도 아닙니다. 현재 응답을 만들 때 볼 수 있는 작업 메모리입니다. 그래서 바이브코딩에서 파일을 참조하게 하려면 그 파일 내용을 넣거나, 검색이나 도구 결과로 가져와야 합니다.

> "more context isn't automatically better"
>
> — 더 많은 컨텍스트가 자동으로 더 좋은 것은 아니다.
> [Context windows — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)

이 문장은 초보자가 가장 빨리 익혀야 할 반직관입니다. 긴 로그와 많은 파일을 넣으면 안심되지만, token count가 커질수록 accuracy와 recall이 떨어질 수 있다는 KB 설명과 함께 읽어야 합니다. 좋은 context는 많은 context가 아니라 현재 판단에 필요한 정보가 구조화된 context입니다.

> "Recount prompts against the model you plan to use"
>
> — 사용하려는 모델을 기준으로 프롬프트를 다시 세어라.
> [Token counting — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/token-counting)

이 인용은 token count가 고정된 글자 수 변환이 아니라 모델 의존적이라는 점을 보여줍니다. 모델을 바꾸거나 routing 조건이 달라지면 같은 prompt도 다시 세어야 합니다. 특히 운영 시스템에서는 "지난번에 들어갔다"는 경험보다 현재 target model 기준의 계산이 더 신뢰할 수 있습니다.

관련 원문(링크): [Context windows — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)

이 문장은 prompt caching에 대한 흔한 오해를 바로잡습니다. caching은 반복 prefix의 처리 비용과 지연을 줄일 수 있지만, window 용량을 비워주는 기능이 아닙니다. 따라서 캐시를 쓰는 시스템에서도 context budget, compaction, evidence selection이 여전히 필요합니다.

## 실전에서

### 패턴 1: 요청 전에 입력 크기를 점검합니다

긴 파일, PDF, 이미지, 도구 정의가 들어가는 작업에서는 먼저 token counting을 합니다. 이때 user message만 세지 말고 system prompt, tools, documents, images까지 실제 요청 구조에 가까운 형태로 봅니다. 예상 input tokens가 크다면 출력 여유를 남기고, 불필요한 로그를 줄이고, 근거를 더 작은 citable block으로 나눕니다.

예를 들어 AI에게 테스트 실패를 분석하게 할 때 전체 CI 로그를 붙이는 대신 첫 실패, 재현 명령, 변경 파일, 관련 설정만 넣을 수 있습니다. 반복 stack trace는 omitted evidence로 기록하고, 필요하면 나중에 추가합니다. 이 방식은 "모델을 덜 믿는다"가 아니라 "작업 메모리를 더 잘 쓴다"에 가깝습니다.

### 패턴 2: 긴 context를 넣을수록 구조를 더 강하게 만듭니다

context가 길어질수록 제목, 구분자, 요약, 우선순위가 중요해집니다. KB는 context rot 가능성을 설명하므로, 긴 입력을 줄 수밖에 없다면 모델이 어떤 부분을 먼저 봐야 하는지 분명히 해야 합니다. "관련 파일", "실패 로그", "검증 기준", "출력 요구"처럼 영역을 나누면 중요한 신호가 덜 묻힙니다.

### 패턴 3: caching을 비용 최적화로만 봅니다

Prompt caching을 쓸 때는 "캐시가 있으니 context가 공짜가 된다"고 생각하지 않습니다. cached prefix도 window를 차지합니다. 따라서 stable system prompt나 tool definitions를 앞에 두는 cache-friendly 구조는 비용과 latency에는 도움이 될 수 있지만, context capacity 설계는 따로 해야 합니다.

### 패턴 4: 모델을 바꾸면 다시 계산합니다

모델별 tokenizer 차이가 있으므로 모델 변경, routing 변경, provider 변경, major model version 변경이 생기면 token count를 다시 봅니다. 특히 "이전 모델에서는 됐는데 새 모델에서는 왜 window가 빨리 차지?" 같은 문제는 tokenizer 차이와 context 구성 변화를 함께 봐야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 token counting이 추정이라는 점입니다. 요청 전 token counting은 매우 유용하지만, 실제 message creation의 input tokens와 작은 차이가 날 수 있습니다. 그래서 사전 점검은 실패 예방 도구이고, 실제 비용 확인은 usage 데이터를 봐야 합니다.

두 번째 한계는 context window가 크다고 정확도가 자동으로 올라가지 않는다는 점입니다. 긴 context는 더 많은 자료를 담을 수 있지만, context rot 가능성이 있습니다. 따라서 큰 window를 가진 모델을 쓰더라도 근거 선별과 구조화가 사라지지 않습니다.

세 번째 한계는 caching과 context capacity를 혼동하기 쉽다는 점입니다. prompt caching은 반복 prefix 처리 비용과 latency를 줄일 수 있지만, cached prefix도 window를 차지합니다. 비용 최적화와 작업 메모리 최적화는 서로 겹치지만 같은 문제가 아닙니다.

네 번째 한계는 초보자에게 이 개념이 눈에 보이지 않는다는 점입니다. 화면에는 텍스트가 보이지만 내부에서는 토큰 계산, window 점유, model별 tokenizer 차이가 작동합니다. 그래서 실무에서는 token count, included evidence, omitted evidence, reserved output tokens 같은 기록을 남겨야 합니다. ==보이지 않는 입력 비용을 보이는 설계 기록으로 바꾸는 것이 토큰화 학습의 실전 목표입니다.==

## 더 읽기

먼저 Anthropic의 Token counting 문서에서 token counting이 비용, rate limit, routing, target length 관리에 어떻게 쓰이는지 읽으세요. 그 다음 Claude Context windows 문서에서 context window가 작업 메모리이고, 더 많은 context가 자동으로 더 좋은 결과를 뜻하지 않는다는 부분을 보세요. 마지막으로 prompt caching 문서와 Claude Code prompt caching 문서를 읽되, caching을 memory나 capacity 확장으로 오해하지 않는 데 집중하세요.

- [Counting tokens — OpenAI API Docs](https://developers.openai.com/api/docs/guides/token-counting)
- [Token counting — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/token-counting)
- [Context windows — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [Prompt caching — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [How Claude Code uses prompt caching — Claude Code Docs](https://code.claude.com/docs/en/prompt-caching)

읽을 때는 세 질문을 계속 붙잡으세요. 이 문서는 토큰 수를 어떻게 계산하라고 말하는가, 어떤 입력 요소가 context window를 차지한다고 말하는가, 그리고 caching이 줄여주는 것은 비용인지 window 용량인지. 이 세 가지가 구분되면 다음 강의인 Prompt Engineering을 훨씬 정확하게 이해할 수 있습니다.
