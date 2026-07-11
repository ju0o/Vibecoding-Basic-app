## 한 줄 정의

Context와 RAG 비교 설명은 두 개념 — 모델이 한 번의 생성에 보는 토큰 집합(context)과, 외부 지식을 런타임에 검색해 그 토큰 집합에 넣는 방법(RAG) — 의 관계와 차이를 남이 이해하도록 정리하는 레퍼런스 스킬입니다. Anthropic은 context를 "the set of tokens included when sampling"이라 하고, Claude glossary는 RAG를 "combines information retrieval with language model generation"이라 설명합니다. ==핵심은 둘이 경쟁 관계가 아니라 "무엇"(context)과 "어떻게 채우나"(RAG)의 관계라는 점==입니다.

이 강의는 "context window가 크면 RAG가 필요 없다" 같은 흔한 오해를 바로잡는 비교 레퍼런스입니다. 두 개념을 나란히 놓고 층을 구분해, 팀원이나 AI에게 정확히 설명하는 방법을 다룹니다.

![Context와 RAG의 관계: RAG가 외부 지식을 런타임에 검색해 한정된 context 토큰 집합을 채우는 두 층 구조](/lesson-diagrams/explain-context-and-rag/context-rag.svg)

## 왜 존재하는가

두 개념을 혼동하는 방식은 두 가지입니다. 하나는 "context window가 크니 RAG는 필요 없다"이고, 다른 하나는 "RAG가 있으니 context 관리는 필요 없다"입니다. 둘 다 층을 뒤섞은 오해입니다.

Anthropic은 "Context is a critical but finite resource for AI agents"라고, context가 무한하지 않은 자원임을 강조합니다. 그리고 context engineering의 목표를 "finding the smallest possible set of high-signal tokens"라고 설명합니다. 즉 window가 아무리 커도 "무엇을 넣을지"는 여전히 문제입니다. 한편 RAG는 그 "무엇"을 외부에서 가져오는 방법입니다 — Claude glossary는 RAG의 지식이 "retrieved at run time"이라고 설명합니다.

비교 설명이 존재하는 이유는 이 관계를 정확히 전달하기 위해서입니다. ==RAG는 무엇을 가져올지의 문제, context engineering은 가져온 것을 얼마나·어떻게 넣을지의 문제이며, 둘은 층이 다릅니다==. 이 구분을 못 하면 "큰 window면 다 해결된다"는 잘못된 결론으로 이어집니다.

## 작동 원리

### Context는 토큰 집합이다

Anthropic은 context를 "the set of tokens included when sampling"으로 정의합니다. 모델이 한 번의 생성에서 보는 전부입니다 — 시스템 프롬프트, 대화 이력, 검색된 문서, 도구 결과가 모두 이 토큰 집합에 들어갑니다. context는 그릇입니다.

이 그릇은 유한합니다. "Context is a critical but finite resource." 그래서 무엇을 넣고 무엇을 뺄지가 항상 결정 사항입니다.

### RAG는 그릇을 채우는 방법이다

RAG는 외부 지식을 런타임에 검색해 이 그릇에 넣습니다. Claude glossary는 RAG를 "combines information retrieval with language model generation"이라 하고, 지식이 "external knowledge base or a set of documents"에서 온다고 설명합니다. 문서를 chunk로 나누고, embedding으로 검색해, 관련 조각을 prompt에 넣는 흐름입니다.

즉 RAG는 그릇 자체가 아니라, 그릇을 관련 조각으로 채우는 방법입니다. 이 층 구분이 비교의 핵심입니다.

### 크다고 더 좋지 않다

"more context isn't automatically better." context window가 커도 관련 없는 토큰이 많으면 답이 나빠집니다. 그래서 RAG의 검색 품질(관련 조각을 잘 찾는가)과 context의 선별(가져온 것 중 무엇을 넣는가)이 모두 중요합니다. 큰 window는 선별의 필요를 없애지 않습니다.

### 선택 기준은 크기와 비용이다

지식베이스가 작으면 전체를 prompt에 통째로 넣는 단순한 방법도 가능합니다. 크면 전부 넣을 수 없으므로 RAG가 확장 가능한 선택입니다. 설명할 때 이 선택 기준 — 크기와 비용 — 을 함께 제시하면 "언제 RAG를 쓰나"라는 질문에 답할 수 있습니다.

## 스펙과 세부

### 두 층을 한 문장으로 요약한다

비교 설명의 뼈대는 "context는 그릇, RAG는 채우는 방법"입니다. 이 한 문장으로 층을 구분한 뒤, 각 층의 세부를 붙입니다. 뼈대 없이 chunking·embedding·token 같은 세부부터 시작하면 듣는 사람이 관계를 놓칩니다.

### high-signal 원칙은 양쪽에 적용된다

context engineering의 원칙 "finding the smallest possible set of high-signal tokens"는 RAG로 가져온 것에도 적용됩니다. RAG가 여러 chunk를 찾아도, 그중 신호가 높은 것만 골라 넣습니다. 많이 넣는 것이 목적이 아닙니다. 이 원칙을 설명에 포함하면 "RAG로 다 가져와 넣으면 된다"는 오해를 막습니다.

### citation과 연결한다

RAG로 가져온 근거에 출처를 붙이면 답을 증거에 grounded할 수 있습니다. 비교 설명에서 "RAG는 검색만이 아니라 출처 추적으로도 이어진다"를 언급하면, 왜 RAG가 환각을 줄이는 데 유용한지 전달됩니다.

## 원문으로 읽기

> "Context refers to the set of tokens included when sampling"
>
> — context는 샘플링 시 포함되는 토큰 집합을 가리킨다.
> [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

context를 토큰 집합으로 정의합니다. RAG와 층을 구분하는 출발점 — context는 "그릇"임을 보여줍니다.

> "combines information retrieval with language model generation"
>
> — 정보 검색과 언어 모델 생성을 결합한다.
> [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary)

RAG의 정의입니다. RAG가 검색과 생성을 잇는 방법 — "채우는 방법"임을 보여줍니다.

> "retrieved at run time"
>
> — 런타임에 검색된다.
> [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary)

RAG의 지식이 사전 학습이 아니라 런타임 검색으로 온다는 점입니다. 이것이 RAG가 최신·도메인 지식을 붙일 수 있는 이유입니다.

> "more context isn't automatically better"
>
> — 더 많은 context가 자동으로 더 나은 것은 아니다.
> [Anthropic — Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)

큰 window 만능론을 교정합니다. 관련 없는 토큰이 많으면 오히려 답이 나빠집니다.

> "finding the smallest possible set of high-signal tokens"
>
> — 가능한 한 가장 작은, 신호가 높은 토큰 집합을 찾는 것.
> [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

context 최적화의 원칙입니다. RAG로 가져온 것도 이 원칙으로 선별해야 함을 보여줍니다.

## 실전에서

### "그릇 vs 채우는 방법"으로 시작한다

누군가 "context랑 RAG 차이가 뭐예요"라고 물으면, "context는 모델이 보는 토큰 그릇, RAG는 그 그릇을 외부 검색으로 채우는 방법"이라고 층을 먼저 구분합니다.

### 큰 window 오해를 바로잡는다

"window가 크니 RAG 필요 없죠?"라는 질문에는 "more context isn't automatically better"를 근거로, 큰 그릇에도 무엇을 넣을지는 여전히 문제임을 설명합니다.

### 선택 기준을 제시한다

"언제 RAG를 쓰나요?"에는 "지식베이스가 작으면 통째로, 크면 RAG"라는 크기·비용 기준으로 답합니다.

### 검색과 선별 둘 다 강조한다

RAG를 설명할 때 검색 품질만 말하지 않고, 가져온 것 중 high-signal만 선별해 넣는다는 점을 함께 말합니다.

## 한계와 트레이드오프

첫 번째 한계는 단순화의 위험입니다. "그릇 vs 채우는 방법"은 이해를 돕는 비유이지만, 실제로는 캐시, reranking, 하이브리드 검색(BM25+embedding) 등이 얽혀 있습니다. 비유가 출발점이지 전부가 아님을 알아야 합니다.

두 번째 trade-off는 RAG와 long context 사이의 선택입니다. 작은 지식베이스는 통째로 넣는 것이 단순하고, 큰 지식베이스는 RAG가 확장 가능합니다. 경계는 크기와 비용에 따라 달라지므로 고정된 규칙이 아닙니다.

세 번째 한계는 검색 품질 의존입니다. RAG는 관련 조각을 잘 찾아야 유용합니다. 검색이 나쁘면 관련 없는 chunk가 context를 채워 오히려 답을 흐립니다 — high-signal 원칙이 RAG에도 적용되는 이유입니다.

네 번째 한계는 설명 대상의 배경 차이입니다. 초보자에게는 "그릇/채우기" 비유가 유효하지만, 실무자에게는 chunking 전략·reranking·하이브리드 검색 같은 세부가 필요합니다. 청중에 맞춰 깊이를 조절해야 합니다.

## 더 읽기

이 강의의 근거 KB는 `explain-context-rag`이며, 그 뿌리는 `rag`와 `context-engineering` 승인 KB입니다. 먼저 Anthropic의 Effective context engineering for AI agents를 읽고 context의 정의와 high-signal 원칙을 확인하세요. 그다음 Claude glossary에서 RAG 정의와 런타임 검색을, Context windows 문서에서 "more context isn't automatically better"를 봅니다. 이 출처들이 이 강의 인용의 원문입니다.

선행 강의로 RAG와 context 관련 강의(임베딩·토큰화·grounding)를 읽으면 두 개념의 세부가 채워집니다. 함께 읽으면 좋은 강의는 `explain-web-flow`로, 같은 explanation-practice 모듈에서 개념을 순서대로 설명하는 스킬을 다룹니다. 다음 레퍼런스는 `explain-tool-agent-mcp`로, Tool·Agent·MCP의 관계를 비교 설명합니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다(원어+번역+링크+해설). 본문은 승인 KB `explain-context-rag`와 그 근거인 `rag`·`context-engineering`의 Claude·Anthropic 출처 범위 안에서 작성했으며 KB 외 신규 사실을 추가하지 않았습니다. 하이라이트(`==`)는 섹션당 3개 이하·마커 짝수로 유지했고 콜아웃은 사용하지 않았습니다.
