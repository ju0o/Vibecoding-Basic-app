## 한 줄 정의

Tool·Agent·MCP 관계 설명은 자주 뒤섞이는 세 개념 — 도구 호출(tool calling), 에이전트 루프(agent loop), MCP 프로토콜 — 이 각각 다른 층에 있음을 남이 이해하도록 정리하는 레퍼런스 스킬입니다. Anthropic은 tool use를 "Tool use lets Claude call functions"라 하고, 에이전트를 "dynamically direct their own processes"하는 시스템으로 설명하며, MCP는 서버가 "allows servers to expose tools"하는 프로토콜입니다. ==핵심은 셋이 경쟁이 아니라 층 관계 — MCP는 도구를 노출하는 표준, tool calling은 모델이 도구를 부르는 행위, agent는 그 행위를 반복하는 루프==라는 점입니다.

이 강의는 "에이전트 만들려면 MCP 써야 하나요?" 같은 층을 뒤섞은 질문을 정리하는 비교 레퍼런스입니다. 세 개념을 노출·호출·반복의 세 층으로 나눠, 설계 판단을 명확하게 만드는 방법을 다룹니다.

![Tool·Agent·MCP의 세 층: MCP가 도구를 노출하고, 모델이 도구를 호출하며, 에이전트 루프가 그 호출을 반복하는 구조](/lesson-diagrams/explain-tool-agent-mcp/three-layers.svg)

## 왜 존재하는가

세 개념은 시기가 다르게 자리잡았습니다. 먼저 도구 호출이 "모델이 함수를 부르는" 방식으로 정립됐습니다 — Anthropic은 "Claude determines when to call a tool"이라 설명합니다. 다음으로 이 호출을 반복하며 스스로 진행하는 에이전트 루프가 나왔습니다. 마지막으로 도구를 서버가 표준 방식으로 노출하는 MCP가 등장해, 각 도구를 앱마다 새로 붙이지 않아도 되게 했습니다.

문제는 이 셋이 대화에서 자주 뒤섞인다는 점입니다. "MCP가 에이전트냐", "tool calling이 곧 agent냐" 같은 혼동은 설계 판단을 흐립니다. 예를 들어 "에이전트를 만들려면 MCP가 필요한가?"라는 질문은 층을 구분하면 쉽게 답할 수 있습니다 — 아니요, MCP는 도구 노출 표준일 뿐이고 에이전트 루프는 그것 없이도 만들 수 있습니다.

비교 설명이 존재하는 이유는 이 층 구분으로 설계 질문을 명확하게 만들기 위해서입니다. ==셋을 노출(MCP) / 호출(tool) / 반복(agent)의 세 층으로 나누면, 어떤 문제에 무엇이 필요한지 판단할 수 있습니다==.

## 작동 원리

### Tool calling은 모델이 함수를 부르는 행위다

가장 아래의 행위 층입니다. "Tool use lets Claude call functions." 모델은 자연어로 답하는 대신 "returns a structured call"로 도구를 호출합니다. 그리고 "Claude determines when to call a tool" — 부를지 말지는 모델의 판단입니다. 이것은 한 번의 행위입니다: 모델이 도구를 부르고, 결과를 받습니다.

### Agent는 호출을 반복하는 자율 루프다

tool calling의 상위 층입니다. Anthropic은 에이전트를 "dynamically direct their own processes"하는 시스템으로 설명합니다. 에이전트는 도구 호출을 여러 번, 스스로 방향을 정하며 반복합니다. "도구를 부른다"가 tool calling이라면, "부르고, 결과를 보고, 다음에 무엇을 할지 정하고, 또 부른다"의 반복이 agent입니다.

### MCP는 도구를 노출하는 표준 프로토콜이다

호출도 반복도 아닌, 별도의 노출 층입니다. MCP는 "allows servers to expose tools"하고 "Tools enable models to interact with external systems"입니다. MCP가 하는 일은 도구를 표준 방식으로 제공하는 것입니다 — 어떤 앱이든 같은 방식으로 그 도구를 쓸 수 있게 합니다. MCP 자체는 도구를 부르지도, 반복하지도 않습니다.

### MCP tool은 model-controlled지만 경계가 있다

MCP tool은 "designed to be model-controlled"입니다. 모델이 호출을 주도합니다. 하지만 MCP 아키텍처는 "maintaining clear security boundaries"로 host-client-server를 분리해 안전 경계를 둡니다. 즉 모델이 도구를 부르되, 그 사이에 승인·격리 경계가 있습니다. 설명할 때 이 경계를 함께 말해야 "모델이 마음대로 다 한다"는 오해를 막습니다.

## 스펙과 세부

### 아래 층 없이 위 층만 쓸 수도 있다

세 층은 필수 의존이 아닙니다. MCP 없이도 tool calling이 가능합니다(도구를 직접 정의해 붙이면 됩니다). tool calling 없이도 단일 응답이 가능합니다(그냥 답하면 됩니다). 즉 "위 층을 쓰려면 아래 층이 필요하다"가 아니라, 필요한 만큼만 층을 올립니다. 이 사실이 "에이전트에 MCP 필수 아님"을 설명합니다.

### 설계 질문을 층으로 답한다

"MCP가 필요한가?"는 "도구를 표준 방식으로 여러 앱에 노출해야 하는가?"로 바꾸면 답이 나옵니다. "에이전트가 필요한가?"는 "자율 반복이 필요한가, 단발 호출이면 되는가?"로 바꾸면 답이 나옵니다. 층으로 질문을 재구성하는 것이 비교 설명의 실용적 가치입니다.

### 보안 경계를 빠뜨리지 않는다

MCP를 설명할 때 model-controlled만 말하고 security boundary를 빼면, 위험한 인상을 줍니다. host-client-server 분리와 승인 경계를 함께 말해야 정확합니다. 이 균형이 MCP 설명의 핵심입니다.

## 원문으로 읽기

> "Tool use lets Claude call functions"
>
> — Tool use는 Claude가 함수를 호출하게 한다.
> [Anthropic — Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

가장 아래 행위 층의 정의입니다. tool calling은 모델이 함수를 부르는 한 번의 행위입니다.

> "Claude determines when to call a tool"
>
> — Claude가 도구를 언제 호출할지 결정한다.
> [Anthropic — Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

호출 시점이 모델의 판단이라는 성질입니다. 이것이 tool calling과 고정된 스크립트의 차이입니다.

> "dynamically direct their own processes"
>
> — 자신의 프로세스를 동적으로 스스로 이끈다.
> [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

에이전트의 정의입니다. 미리 정한 경로가 아니라 스스로 방향을 정하며 호출을 반복하는 루프임을 보여줍니다.

> "allows servers to expose tools"
>
> — 서버가 도구를 노출하게 한다.
> [MCP — Tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)

MCP의 역할입니다. 도구를 표준 방식으로 제공하는 노출 층 — 호출도 반복도 아닙니다.

> "maintaining clear security boundaries"
>
> — 명확한 보안 경계를 유지한다.
> [MCP — Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)

MCP 아키텍처의 host-client-server 분리 이유입니다. 모델이 도구를 주도하되 안전 경계가 있음을 보여줍니다.

## 실전에서

### 세 층으로 먼저 그린다

누군가 세 개념을 헷갈려 하면, "MCP는 노출, tool은 호출, agent는 반복"이라고 세 층을 먼저 구분해 줍니다. 이 한 문장이 대부분의 혼동을 정리합니다.

### 설계 질문을 층으로 재구성한다

"MCP 필요해요?"에는 "도구를 표준으로 여러 곳에 노출해야 하면요"라고, "에이전트 필요해요?"에는 "자율 반복이 필요하면요, 단발 호출이면 아니요"라고 층 기준으로 답합니다.

### MCP는 경계와 함께 설명한다

MCP를 소개할 때 model-controlled와 security boundary를 항상 붙여 말해, 안전 경계가 있는 노출 표준임을 정확히 전달합니다.

### 필요한 만큼만 층을 올린다고 말한다

단일 응답으로 충분하면 tool도 agent도 필요 없고, 단발 도구 호출이면 agent가 필요 없다는 점을 강조합니다. 층은 필요에 따라 올리는 것입니다.

## 한계와 트레이드오프

첫 번째 한계는 세 층 모델의 단순화입니다. 실제로는 도구 검색, 병렬 호출, 멀티 에이전트 조율 같은 세부가 층 사이에 얽혀 있습니다. "노출·호출·반복" 세 층은 이해의 출발점이지 전부가 아닙니다.

두 번째 trade-off는 MCP 도입의 비용과 이득입니다. 도구를 한 앱에서만 쓰면 MCP 없이 직접 붙이는 것이 단순합니다. 여러 앱·여러 모델에 같은 도구를 노출해야 할 때 MCP의 표준화 이득이 커집니다. 층이 있다고 항상 써야 하는 것은 아닙니다.

세 번째 한계는 자율성의 위험입니다. 에이전트가 스스로 프로세스를 이끌수록 오류가 누적될 수 있습니다. 자율 반복(agent)을 설명할 때 이 위험과 검증의 필요를 함께 언급해야 균형 잡힌 설명이 됩니다.

네 번째 한계는 청중의 배경 차이입니다. 초보자에게는 세 층 비유가 유효하지만, 실무자에게는 각 층의 구체적 스펙(도구 스키마, 루프 종료 조건, MCP transport)이 필요합니다. 청중에 맞춰 깊이를 조절해야 합니다.

## 더 읽기

이 강의의 근거 KB는 `explain-tool-agent-mcp`이며, 그 뿌리는 `tool-calling`·`agent-loop`·`mcp` 승인 KB입니다. 먼저 Anthropic의 Tool use with Claude에서 tool calling 정의를, Building effective agents에서 에이전트의 자율성을, MCP Tools·Architecture 스펙에서 도구 노출과 보안 경계를 확인하세요. 이 출처들이 이 강의 인용의 원문입니다.

선행 강의로 도구 호출·에이전트 루프·MCP 관련 강의를 읽으면 각 층의 세부가 채워집니다. 함께 읽으면 좋은 강의는 `explain-context-and-rag`로, 같은 explanation-practice 모듈에서 혼동되는 개념 쌍을 층으로 구분하는 비교 스킬을 다룹니다. 다음 레퍼런스는 개념·도구의 흐름을 역사로 설명하는 `explain-vibe-coding-history`입니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다(원어+번역+링크+해설). 본문은 승인 KB `explain-tool-agent-mcp`와 그 근거인 `tool-calling`·`agent-loop`·`mcp`의 Anthropic·MCP 출처 범위 안에서 작성했으며 KB 외 신규 사실을 추가하지 않았습니다. 하이라이트(`==`)는 섹션당 3개 이하·마커 짝수로 유지했고 콜아웃은 사용하지 않았습니다.
