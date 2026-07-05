## 한 줄 정의

Context Engineering, MCP, Skills의 관계는 AI 시스템을 세 층으로 나누어 보는 관점입니다. Context Engineering은 모델이 현재 판단에 사용할 정보 상태를 설계하고, MCP는 외부 데이터와 도구를 표준 연결로 노출하며, Skills는 반복 절차와 자료를 필요할 때 불러오는 재사용 단위입니다.

이 세 개념은 같은 일을 다른 이름으로 부르는 말이 아닙니다. Context Engineering은 "무엇을 지금 컨텍스트에 넣을 것인가"를 묻고, MCP는 "외부 시스템을 어떤 프로토콜로 연결할 것인가"를 묻고, Skills는 "반복되는 절차와 지식을 어떻게 패키징할 것인가"를 묻습니다. ==세 개념의 차이는 기능 이름이 아니라 책임 경계==에 있습니다.

바이브코딩에서 이 구분은 특히 중요합니다. 초보자는 AI가 파일도 읽고, 도구도 쓰고, 규칙도 기억하니 모두 "AI에게 맥락을 주는 것"이라고 뭉뚱그리기 쉽습니다. 하지만 실제 시스템에서는 컨텍스트를 너무 많이 넣으면 정확도가 떨어지고, 도구 연결이 제각각이면 권한과 호출 형식이 흐려지며, 반복 지침을 매번 붙여 넣으면 작업이 길어질수록 일관성이 약해집니다.

이 강의의 목표는 세 용어를 외우는 것이 아닙니다. 읽고 나면 다른 사람에게 "Context Engineering은 상위 설계 문제, MCP는 연결 프로토콜, Skills는 재사용 가능한 절차 패키지"라고 설명할 수 있어야 합니다. 더 나아가 실제 프로젝트에서 어떤 문제를 만나면 셋 중 무엇을 먼저 조정해야 하는지도 판단할 수 있어야 합니다.

## 왜 존재하는가

프롬프트만 잘 쓰면 충분했던 단계에서는 이 구분이 크게 필요하지 않았습니다. 사용자가 질문하고 모델이 답하면 끝나는 짧은 작업에서는 긴 아키텍처가 오히려 과합니다. 그러나 바이브코딩의 실제 작업은 짧은 질문보다 훨씬 복잡합니다. AI가 파일을 읽고, 이전 결과를 기억하고, 도구를 호출하고, 외부 문서를 참고하고, 작업 상태를 다음 턴으로 넘깁니다.

이때 첫 번째 문제가 나타납니다. 모델의 컨텍스트 창은 유한합니다. 시스템 지시, 대화 이력, 파일 내용, 도구 정의, 도구 결과가 모두 같은 토큰 예산을 차지합니다. Context Engineering은 이 유한한 공간을 "많이 넣기"가 아니라 "지금 판단에 필요한 고신호 정보만 넣기"로 다룹니다.

두 번째 문제는 외부 연결입니다. 파일, DB, 문서 저장소, 디자인 도구, 검색 엔진을 AI 앱마다 다른 방식으로 연결하면 같은 종류의 연결 코드와 권한 규칙이 반복됩니다. MCP는 host, client, server를 나누고 tools, resources, prompts 같은 capability를 표준화해 이 반복을 줄입니다.

세 번째 문제는 절차의 반복입니다. 프로젝트마다 코드 리뷰 기준, 배포 체크리스트, 문서 생성 규칙, API 작성 규칙이 있습니다. 이 지침을 매번 대화에 붙여 넣으면 컨텍스트 비용이 커지고, 빠뜨리는 부분도 생깁니다. Skills는 이런 절차를 `SKILL.md`와 supporting files로 묶어 필요할 때 로드하게 만듭니다.

이 세 문제가 동시에 나타나면서 세 개념은 서로 연결됩니다. Context Engineering은 MCP와 Skills를 포함해 전체 정보 상태를 설계합니다. MCP는 외부 시스템에서 가져올 수 있는 정보와 실행 가능한 행동을 표준 인터페이스로 제공합니다. Skills는 반복되는 판단 기준과 절차를 컨텍스트에 항상 넣지 않고, 필요할 때 꺼내 쓰게 합니다. ==셋을 섞어 말하면 편하지만, 섞어 설계하면 실패 원인을 찾기 어렵습니다.==

## 작동 원리

### 1. 먼저 Context Engineering이 판단의 무대를 정합니다

Context Engineering은 가장 상위에 있는 설계 질문입니다. 모델이 어느 순간 답을 만들 때 실제로 볼 수 있는 것은 컨텍스트에 들어온 토큰뿐입니다. 따라서 어떤 파일을 넣을지, 어떤 로그를 요약할지, 어떤 도구 정의를 노출할지, 어떤 Skill 설명을 항상 보이게 할지 정하는 일은 전부 Context Engineering의 일부입니다.

중요한 점은 컨텍스트가 단순한 "자료 모음"이 아니라는 것입니다. 컨텍스트에는 목표, 제약, 과거 결정, 도구 목록, 검색 결과, 실패 로그, 사용자 승인 상태가 함께 들어갑니다. 이 정보들이 서로 모순되거나 너무 많아지면 모델은 필요한 것을 찾지 못합니다. 그래서 좋은 설계는 모든 것을 넣기보다, 현재 턴에서 판단에 필요한 최소 단위를 만듭니다.

예를 들어 "학습 사이트의 새로운 강의를 만들어라"라는 작업이 있다고 합시다. Context Engineering 관점에서는 먼저 승인된 KB, 해당 강의 slug, V2 형식, Quote Bank, 금지 사항을 골라 컨텍스트 패킷으로 만듭니다. 여기서 MCP 서버 목록 전체나 모든 과거 강의 전문을 넣는 것은 좋은 선택이 아닐 수 있습니다. 지금 필요한 것은 작성에 직접 쓰이는 근거와 형식 규칙이기 때문입니다.

### 2. MCP는 외부 시스템과의 연결 방식을 표준화합니다

MCP는 컨텍스트 자체가 아니라, 외부 시스템을 AI 애플리케이션에 연결하는 프로토콜입니다. MCP 서버는 tools, resources, prompts를 노출할 수 있고, host와 client는 사용자 승인, lifecycle, server 연결을 조정합니다. 이 구조 덕분에 AI 앱은 "이 DB는 어떻게 호출하지?", "이 문서는 어떤 형식으로 읽지?" 같은 연결 방식을 매번 새로 만들 필요가 줄어듭니다.

MCP tools는 모델이 외부 시스템과 상호작용할 수 있는 호출 가능한 기능입니다. 예를 들어 `search_docs`, `get_issue`, `query_database` 같은 도구가 될 수 있습니다. MCP resources는 모델에게 제공할 컨텍스트 데이터를 URI로 노출하는 primitive입니다. 예를 들어 파일 내용, DB schema, 프로젝트 설정, 디자인 토큰이 resource로 제공될 수 있습니다.

여기서 Context Engineering과의 관계가 드러납니다. MCP가 제공한다고 해서 모든 resource와 tool이 항상 컨텍스트에 들어가야 하는 것은 아닙니다. MCP는 연결 가능성을 만들고, Context Engineering은 그중 무엇을 언제 모델에게 보여줄지 결정합니다. ==MCP는 문을 만들고, Context Engineering은 어떤 문을 지금 열지 결정합니다.==

### 3. Skills는 반복 절차를 파일 기반 capability로 패키징합니다

Skills는 반복되는 지침, 체크리스트, 예시, 스크립트, 참고 자료를 재사용 가능한 capability로 묶는 방식입니다. `SKILL.md`는 entrypoint 역할을 하고, YAML frontmatter의 description은 언제 이 Skill을 쓸지 발견 가능하게 만듭니다. 본문과 supporting files는 필요할 때 로드됩니다.

Skills의 핵심은 항상 많은 지식을 넣는 것이 아닙니다. 오히려 반대입니다. Skill 설명은 시작 시점에 작게 노출되고, 실제 지침과 자료는 요청이 맞아떨어질 때 들어옵니다. 이 구조는 Context Engineering의 "작고 신호 높은 컨텍스트" 원칙과 잘 맞습니다. 반복 절차를 매번 프롬프트에 붙이는 대신, 필요할 때만 본문과 리소스를 불러오게 만들기 때문입니다.

예를 들어 코드 리뷰 Skill은 프로젝트의 리뷰 기준, 위험 유형, 출력 형식, 예시를 담을 수 있습니다. 문서 생성 Skill은 보고서 구조, 스타일 규칙, 렌더링 검증 스크립트를 포함할 수 있습니다. API 작업 Skill은 자세한 API 스타일 가이드를 별도 파일로 분리하고, `SKILL.md`에는 언제 그 파일을 읽어야 하는지만 적을 수 있습니다.

### 4. 세 개념은 한 agent loop 안에서 함께 움직입니다

실제 AI 작업은 보통 한 번의 호출로 끝나지 않습니다. agent loop는 현재 상태를 보고, 필요한 도구를 고르고, 결과를 받아 다시 판단합니다. 이 루프 안에서 Context Engineering은 매 턴의 정보 상태를 관리하고, MCP는 외부 시스템 행동과 데이터를 제공하고, Skills는 반복 절차를 필요할 때 공급합니다.

예를 들어 "GitHub 이슈를 읽고 수정 PR을 준비하라"는 작업을 생각해 봅시다. MCP는 GitHub 이슈와 PR 정보를 가져오는 tools/resources를 제공할 수 있습니다. Skills는 이 프로젝트의 PR 작성 규칙과 테스트 체크리스트를 제공합니다. Context Engineering은 현재 이슈, 관련 파일, 실패한 테스트 로그, PR 규칙 중 어떤 것을 지금 컨텍스트에 넣을지 결정합니다.

이 흐름에서 실패 원인도 층위별로 나뉩니다. 모델이 중요한 파일을 못 봤다면 Context Engineering 문제일 수 있습니다. 외부 시스템 호출 방식이 불안정하다면 MCP나 tool surface 문제일 수 있습니다. 매번 같은 리뷰 기준을 빠뜨린다면 Skill 설계 문제일 수 있습니다. 이처럼 세 개념을 분리해 이해하면 "AI가 별로였다"가 아니라 "어느 층의 설계가 약했는가"로 디버깅할 수 있습니다.

## 스펙과 세부

### Context는 토큰 집합이고, Skills와 MCP도 컨텍스트 비용을 만든다

Context Engineering KB는 컨텍스트를 모델 샘플링 시점에 포함되는 토큰 집합으로 설명합니다. 이 관점에서 보면 시스템 프롬프트, 메시지 이력, 도구 정의, 도구 결과, Skill 설명, 검색 결과가 모두 비용입니다. Skills는 본문을 항상 넣지 않도록 설계되지만, description은 discovery를 위해 노출될 수 있습니다. MCP 역시 idle 상태에서는 가벼울 수 있지만, 도구 이름과 schema, 호출 결과는 필요 시 컨텍스트를 차지합니다.

따라서 "MCP를 붙이면 해결"이나 "Skill을 만들면 해결"이라는 말은 충분하지 않습니다. 어떤 도구 정의가 노출되는지, 어떤 Skill description이 겹치는지, 어떤 resource가 실제 프롬프트에 들어가는지까지 봐야 합니다. Context Engineering은 이 비용과 신호를 함께 관리합니다.

### MCP spec 기준은 2025-11-25 latest이다

MCP KB는 공식 spec 기준을 2025-11-25 latest로 기록합니다. tools는 모델이 외부 시스템과 상호작용하도록 서버가 노출하는 호출 가능한 기능이고, resources는 URI로 식별되는 컨텍스트 데이터를 제공합니다. Architecture 문서는 host, client, server 책임을 나눕니다. 이 세부는 단순 구현 정보가 아니라 보안 경계와 책임 분리의 기준입니다.

MCP server가 전체 대화 이력을 볼 필요가 없고, host가 권한과 사용자 승인을 조정한다는 점도 중요합니다. 연결 표준을 도입해도 모든 권한을 server에 넘기는 것이 아닙니다. 오히려 protocol layer를 통해 host, client, server의 책임을 나누는 쪽에 가깝습니다.

### Skill은 `SKILL.md`와 description 설계가 중심이다

Skills KB는 모든 Skill에 `SKILL.md`가 필요하고, YAML frontmatter와 Markdown 지침이 중심이라고 설명합니다. description은 discovery의 핵심입니다. 무엇을 하는지뿐 아니라 언제 사용할지를 함께 담아야 합니다. description이 모호하면 모델은 적절한 Skill을 놓치거나 비슷한 Skill을 잘못 고를 수 있습니다.

Skill의 본문이 길어지는 것도 비용입니다. best practices 문서는 Skill을 concise하고 well-structured하게 만들라고 권합니다. 복잡한 reference는 supporting files로 분리하고, `SKILL.md`는 overview와 navigation 역할에 가깝게 유지하는 편이 좋습니다.

### 한 프로젝트에서의 배치 기준

작은 프로젝트에서는 세 개념이 파일 몇 개로 구현될 수 있습니다. 예를 들어 `AGENTS.md`나 시스템 지침이 Context Engineering의 일부가 되고, MCP 서버 하나가 외부 문서를 제공하며, `.claude/skills/code-review/SKILL.md`가 리뷰 절차를 담당할 수 있습니다. 큰 프로젝트에서는 같은 원리가 더 분리됩니다. 권한 정책, tool registry, context compaction, Skill catalog, trace/eval이 별도 하위 시스템이 됩니다.

핵심은 크기가 아닙니다. 각 책임을 어디에 둘지 명확한가입니다. 프로젝트 규칙을 MCP resource에 넣을지 Skill supporting file에 넣을지, 매 턴에 항상 넣을지 필요할 때만 불러올지, 모델이 도구를 선택하게 할지 사람이 명시적으로 호출하게 할지 결정해야 합니다.

## 원문으로 읽기

> "Context is a critical but finite resource for AI agents."
>
> — 컨텍스트는 AI 에이전트에게 중요하지만 유한한 자원이다.
> [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

이 문장은 세 개념의 관계에서 가장 위에 놓이는 기준입니다. MCP와 Skills가 아무리 강력해도 결국 모델이 한 번에 보는 것은 유한한 컨텍스트입니다. 그러므로 연결할 수 있는 모든 도구와 로드할 수 있는 모든 절차를 한꺼번에 넣는 것은 좋은 설계가 아닙니다.

> "Tools enable models to interact with external systems"
>
> — 도구는 모델이 외부 시스템과 상호작용할 수 있게 한다.
> [MCP Tools — Model Context Protocol](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)

MCP의 tools primitive는 외부 시스템 행동을 표준 인터페이스로 노출합니다. 이 인용은 MCP가 단순한 문서 첨부 방식이 아니라 외부 시스템과의 상호작용 경계를 다룬다는 점을 보여줍니다. 다만 상호작용 가능성이 곧 무제한 실행 권한을 뜻하지는 않습니다.

> "Resources allow servers to share data"
>
> — Resources는 서버가 데이터를 공유할 수 있게 한다.
> [MCP Resources — Model Context Protocol](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)

resources는 행동이 아니라 컨텍스트 데이터입니다. 이 문장은 MCP 안에서도 tools와 resources를 분리해야 하는 이유를 잘 보여줍니다. tools는 외부 시스템을 움직이고, resources는 모델이 판단에 사용할 데이터를 제공합니다. 둘을 섞으면 권한과 검증 기준이 흐려집니다.

> "Agent Skills are modular capabilities"
>
> — Agent Skills는 모듈형 capability다.
> [Agent Skills — Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

Skills는 단순히 긴 프롬프트를 저장하는 폴더가 아닙니다. 반복 가능한 capability를 패키징하는 단위입니다. 이 인용을 관계도에 놓으면 Skills는 MCP와 경쟁하지 않습니다. MCP가 외부 연결 표준이라면, Skills는 특정 작업을 잘 수행하기 위한 절차와 자료의 재사용 단위입니다.

## 실전에서

### 패턴 1: 먼저 문제를 세 층으로 분류합니다

AI 작업이 실패했을 때 바로 프롬프트를 길게 고치지 마세요. 먼저 실패가 어느 층에 있는지 분류합니다. 필요한 파일이나 로그가 빠졌다면 Context Engineering 문제입니다. 외부 시스템 호출 자체가 불안정하거나 도구 설명이 겹친다면 MCP/tool surface 문제입니다. 매번 같은 절차를 빠뜨린다면 Skill 문제입니다.

이 분류는 팀 협업에서도 유용합니다. "AI가 이상하게 답했다"는 말은 고칠 수 없습니다. 하지만 "도구 description이 겹쳐서 모델이 `search_docs`와 `read_resource`를 혼동했다" 또는 "코드 리뷰 체크리스트가 항상 컨텍스트에 없어서 위험 항목을 빠뜨렸다"는 말은 고칠 수 있습니다.

### 패턴 2: Context Packet으로 현재 턴의 입력을 만든다

긴 작업에서는 아래처럼 현재 턴의 입력을 작게 묶어두면 좋습니다. 이 예시는 외부 라이브러리 없이 실행 가능한 TypeScript 값입니다. 실제 프로젝트에서는 이 값을 프롬프트 생성, 작업 로그, 검증 보고서의 중간 구조로 사용할 수 있습니다.

```ts
type ContextPacket = {
  goal: string
  constraints: string[]
  evidence: Array<{ claim: string; sourceUrl: string }>
  activeCapabilities: Array<"mcp-tool" | "mcp-resource" | "skill">
  nextAction: string
}

const packet: ContextPacket = {
  goal: "context-engineering-mcp-skills lesson draft",
  constraints: ["Use approved KB only", "Use Quote Bank only for quotes"],
  evidence: [
    {
      claim: "MCP tools expose callable external-system functions",
      sourceUrl: "https://modelcontextprotocol.io/specification/2025-11-25/server/tools",
    },
  ],
  activeCapabilities: ["mcp-resource", "skill"],
  nextAction: "write V2 lesson sections",
}

console.log(packet.activeCapabilities.includes("skill"))
```

이 코드의 요점은 기술적 복잡성이 아니라 경계입니다. 목표, 제약, 근거, capability, 다음 행동을 한 문자열에 섞지 않으면 사람이 검토하기 쉽고, 모델에게 전달할 때도 필요한 항목만 골라 넣기 쉽습니다.

### 패턴 3: Skill은 반복 절차, MCP는 외부 연결에 둔다

예를 들어 "사내 문서를 보고 API 변경 제안서를 작성"하는 작업을 설계한다고 합시다. 문서 저장소 접근은 MCP resource나 tool로 연결할 수 있습니다. 반면 제안서 형식, 위험 검토 기준, 승인 전 체크리스트는 Skill로 만들 수 있습니다. Context Engineering은 이번 요청에서 어떤 문서 resource와 어떤 Skill을 실제로 로드할지 결정합니다.

이 패턴을 따르면 설계가 깔끔해집니다. 사내 문서 위치가 바뀌면 MCP server나 resource mapping을 고치면 됩니다. 제안서 형식이 바뀌면 Skill을 고치면 됩니다. 특정 작업에서 너무 많은 정보가 들어가면 Context Engineering 규칙을 고치면 됩니다. 세 책임이 분리되어 있으므로 변화가 생겨도 전체를 다시 만들 필요가 줄어듭니다.

## 한계와 트레이드오프

첫 번째 한계는 용어가 겹쳐 보인다는 점입니다. MCP resources도 컨텍스트 데이터를 제공하고, Skills도 파일 기반 자료를 제공하며, Context Engineering도 컨텍스트를 다룹니다. 그래서 초보자는 셋을 모두 "맥락 제공"으로 이해하기 쉽습니다. 하지만 resource는 protocol primitive, Skill은 capability package, Context Engineering은 selection strategy입니다.

두 번째 한계는 도입 비용입니다. 작은 작업에 MCP server와 Skill catalog와 context packet을 모두 만들면 과합니다. 단순한 질문에는 짧은 프롬프트와 직접 파일 첨부가 충분할 수 있습니다. 복잡한 구조는 실패 비용이 크거나 반복성이 높은 작업에서 가치가 커집니다.

세 번째 한계는 보안과 신뢰입니다. MCP server는 외부 시스템과 연결되고, Skill은 scripts나 resources를 포함할 수 있습니다. 따라서 신뢰하지 않는 server와 Skill을 무심코 붙이면 오히려 위험이 커집니다. Context Engineering 관점에서도 신뢰할 수 없는 자료를 컨텍스트에 넣으면 모델 판단이 오염될 수 있습니다.

네 번째 한계는 컨텍스트 비용입니다. Skills가 on-demand로 동작해도 description은 discovery를 위해 노출될 수 있고, MCP tool schema도 필요할 때 컨텍스트를 차지합니다. 너무 많은 Skill과 도구를 연결하면 모델이 무엇을 써야 할지 헷갈릴 수 있습니다. 따라서 capability가 많아질수록 이름, description, scope, trigger 조건을 더 엄격히 관리해야 합니다.

결론적으로 좋은 설계는 세 개념을 모두 많이 쓰는 설계가 아닙니다. 좋은 설계는 현재 문제에 맞게 어느 층을 조정할지 아는 설계입니다. 정보 선택이 문제면 Context Engineering을, 연결 방식이 문제면 MCP를, 반복 절차가 문제면 Skills를 먼저 봅니다.

## 더 읽기

먼저 Context Engineering 문서를 읽어 컨텍스트가 유한한 정보 상태라는 관점을 잡는 것이 좋습니다. 그 다음 MCP Architecture, MCP Tools, MCP Resources를 읽으면 외부 시스템 연결이 어떤 책임으로 나뉘는지 보입니다. 마지막으로 Agent Skills 문서를 읽으면 반복 절차를 어떻게 파일 기반 capability로 패키징하는지 이해할 수 있습니다.

- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [MCP Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)
- [MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [MCP Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)
- [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

읽을 때는 "이 문서는 세 층 중 어디를 설명하는가"를 표시해 보세요. 같은 문서 안에도 context, tool, resource, skill이 함께 나오지만 각 문장이 맡는 책임은 다릅니다. 그 책임을 구분할 수 있으면 AI 시스템 설계가 용어 암기가 아니라 구조적 판단으로 바뀝니다.
