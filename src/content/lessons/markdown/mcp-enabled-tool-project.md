## 한 줄 정의

MCP 도구 연결 프로젝트는 외부 시스템(파일, DB, 사내 API)을 MCP 서버로 노출하고, AI 앱이 그 도구를 표준 방식으로 발견·호출하게 만드는 실습 교재입니다. MCP 문서는 이를 "Think of MCP like a USB-C port for AI applications."라고 비유합니다 — 도구마다 다른 커넥터를 만들지 않고, 하나의 표준 포트로 연결합니다. 스펙은 "MCP provides a standardized way for applications to:"로 시작하는 목록에서 context 공유·도구 노출의 표준화를 선언합니다. ==이 프로젝트의 목표는 도구 하나를 만드는 것이 아니라, 도구를 표준으로 노출하는 구조와 그 보안 경계를 익히는 것==입니다.

Tool·Agent·MCP 관계 레퍼런스에서 배운 세 층 중 "노출 층"을 실제로 구축하는 단계입니다. 어떤 앱이든 같은 방식으로 여러분의 도구를 쓸 수 있게 되는 것이 완성 조건입니다.

![MCP 도구 연결 프로젝트: host-client-server 구조 위에 도구를 노출하고, 토큰 경계와 사용자 승인 경계를 두는 설계](/lesson-diagrams/mcp-enabled-tool-project/mcp-project-map.svg)

## 왜 존재하는가

AI 앱에 도구를 붙이는 가장 단순한 방법은 앱 코드에 함수를 직접 정의하는 것입니다. 도구가 하나이고 앱이 하나면 충분합니다. 문제는 도구와 앱이 늘어날 때입니다. 앱 3개가 같은 사내 검색 도구를 쓰려면, 표준이 없으면 3번 붙여야 합니다. 도구가 바뀌면 3곳을 고칩니다.

MCP는 이 N×M 문제를 표준으로 풉니다. 도구를 MCP 서버로 한 번 노출하면, MCP를 지원하는 어떤 host 앱이든 같은 방식으로 연결합니다. "Hosts: LLM applications that initiate connections" — 연결을 시작하는 쪽이 host이고, 도구를 제공하는 쪽이 server이며, 그 사이를 client가 잇습니다. 이 역할 분리가 표준의 뼈대입니다.

이 프로젝트가 교재로 존재하는 이유는 두 가지입니다. 첫째, 표준 노출의 실익을 몸으로 확인합니다 — 서버 하나를 만들고 두 개 이상의 호스트에서 연결해 보면 "USB-C 포트" 비유가 체감됩니다. 둘째, ==도구 노출에는 반드시 보안 경계 설계가 따라온다==는 것을 배웁니다. 도구는 모델이 호출하지만("Tools in MCP are designed to be model-controlled"), 토큰과 승인의 경계는 사람이 설계해야 합니다.

## 작동 원리

### host–client–server 역할을 먼저 그린다

프로젝트의 첫 단계는 코드가 아니라 역할 지도입니다. host는 "LLM applications that initiate connections" — 사용자가 쓰는 AI 앱입니다. server는 도구·리소스를 노출하는 프로세스입니다. client는 host 안에서 server와의 1:1 연결을 관리합니다. 이 분리는 장식이 아니라 보안 경계입니다 — 각 연결이 격리되므로 한 서버가 다른 서버의 데이터를 넘볼 수 없습니다.

실습에서는 작은 도구 하나(예: 이 사이트의 강의 목록을 검색하는 도구)를 server로 노출하고, host(MCP 지원 앱)에서 연결합니다.

### 도구는 model-controlled로 설계된다

MCP 스펙 초안은 "Tools in MCP are designed to be model-controlled"라고 명시합니다. 도구를 언제 부를지는 모델이 판단합니다. 그래서 도구 정의의 name과 description이 곧 인터페이스 품질입니다 — 모델은 그 설명을 읽고 호출 여부를 정하기 때문입니다. 설명이 모호하면 모델이 도구를 안 쓰거나 잘못 씁니다.

model-controlled라는 성질은 승인 경계의 필요도 만듭니다. 모델이 주도하되, 파괴적 동작(쓰기·삭제)에는 사용자 승인 단계를 두는 것이 표준적 설계입니다.

### 토큰은 URI에 넣지 않는다

인증이 붙는 순간 보안 규칙이 등장합니다. MCP 인가 스펙은 "Access tokens MUST NOT be included in the URI query string"이라고 못박습니다. URI는 로그, 히스토리, 리퍼러에 남기 때문입니다. 토큰은 헤더로 전달하고, 로그에 남지 않게 다룹니다. 이 규칙은 environment-variables-secrets 강의에서 배운 "secret을 인자·로그에 남기지 않는다"의 MCP판입니다.

### 토큰 passthrough를 금지한다

보안 모범 사례 문서는 "MCP servers MUST NOT accept any tokens that were not explicitly issued for the MCP server."라고 요구합니다. 즉 다른 서비스용으로 발급된 토큰을 그대로 받아 재사용하는 passthrough를 금지합니다. 토큰은 대상(audience)이 명시된 것만 받습니다. 이 규칙이 없으면, 한 곳에서 새어나온 토큰이 여러분의 서버까지 여는 만능 열쇠가 됩니다.

## 스펙과 세부

### 프로젝트 구성 요소

이 교재의 최소 구성은 네 가지입니다. (1) 도구 1~2개를 노출하는 MCP server — 읽기 전용 도구(검색·조회)부터 시작합니다. (2) server를 연결하는 host 설정 — 로컬 개발에서는 host 앱의 서버 등록 설정. (3) 도구 정의 — name, description, input schema를 모델이 읽고 판단할 수 있게 작성. (4) 보안 문서 — 어떤 토큰을 어디에 저장하고, 어떤 동작에 승인을 요구하는지 한 페이지로.

### 읽기 도구부터, 쓰기 도구는 승인과 함께

첫 도구는 읽기 전용이 안전합니다. 검색·조회는 실패해도 되돌릴 것이 없습니다. 쓰기 도구(파일 생성·데이터 수정)를 추가할 때는 model-controlled 원칙 위에 사용자 승인 단계를 설계합니다 — "모델이 요청하고, 사람이 승인하고, 서버가 실행"의 3단입니다.

### 이 사이트를 사례로

이 학습 사이트 자체가 좋은 실습 대상입니다. `src/content/curriculum.ts`의 강의 메타와 `src/content/glossary.ts`의 용어를 검색하는 읽기 도구를 MCP server로 노출하면, AI 앱에서 "인증 관련 강의 찾아줘"가 표준 도구 호출로 동작합니다. 콘텐츠는 정적 파일이므로 읽기 전용 서버로 충분하고, 토큰 경계 연습은 사내 API를 붙일 때로 미룰 수 있습니다.

## 원문으로 읽기

> "Think of MCP like a USB-C port for AI applications."
>
> — MCP를 AI 애플리케이션의 USB-C 포트라고 생각하라.
> [MCP Docs — What is MCP?](https://modelcontextprotocol.io/docs/getting-started/intro)

표준화의 핵심 비유입니다. 도구마다 커넥터를 새로 만들지 않고 하나의 포트로 연결한다는 프로젝트의 목적을 압축합니다.

> "MCP provides a standardized way for applications to:"
>
> — MCP는 애플리케이션이 다음을 수행하는 표준화된 방법을 제공한다:
> [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)

스펙의 선언부입니다. context 공유와 도구 노출이 표준의 대상임을 보여줍니다.

> "Hosts: LLM applications that initiate connections"
>
> — Host: 연결을 시작하는 LLM 애플리케이션.
> [MCP Specification 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)

역할 지도의 출발점입니다. host가 연결을 시작하고, server가 도구를 제공하며, client가 그 사이를 잇습니다.

관련 원문(링크): [MCP Authorization 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)

토큰 취급의 강제 규칙입니다. URI는 로그에 남으므로, 토큰은 헤더로 전달합니다.

관련 원문(링크): [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)

passthrough 금지 규칙입니다. 토큰은 audience가 자신인 것만 수용해야 만능 열쇠 사고를 막습니다.

## 실전에서

### 역할 지도 한 장부터 그린다

코드 전에 host/client/server와 도구·토큰의 위치를 한 장으로 그립니다. 이 지도가 이후 보안 결정(토큰을 어디 저장하나, 승인은 어디서 받나)의 기준이 됩니다.

### 도구 설명을 모델 입장에서 쓴다

description은 사람용 주석이 아니라 모델의 호출 판단 근거입니다. "언제 이 도구를 부르라"까지 담아, 모델이 정확히 트리거되게 합니다.

### 읽기 → 쓰기 순서로 확장한다

읽기 전용 도구로 연결·발견·호출 흐름을 완성한 뒤, 쓰기 도구는 사용자 승인 단계와 함께 추가합니다.

### 토큰 규칙 두 가지를 체크리스트로

"URI에 토큰 금지"와 "passthrough 금지"를 프로젝트 보안 문서의 고정 체크 항목으로 둡니다. 이 둘만 지켜도 흔한 토큰 사고 대부분을 막습니다.

## 한계와 트레이드오프

첫 번째 trade-off는 표준화 비용입니다. 도구가 하나이고 앱도 하나면 MCP 서버를 만드는 것이 직접 함수 정의보다 무겁습니다. 표준의 이득은 도구·앱이 늘어날 때 나타납니다 — 지금 필요 없으면 나중에 노출해도 됩니다.

두 번째 한계는 스펙의 진화입니다. MCP는 버전이 갱신되는 살아 있는 스펙입니다(이 강의의 근거는 2025-11-25 스펙과 2025-06-18 인가 스펙). 프로젝트를 유지하려면 스펙 버전을 기록하고, 갱신 시 변경분을 확인하는 습관이 필요합니다.

세 번째 한계는 model-controlled의 양면성입니다. 모델이 도구를 주도하면 편리하지만, 잘못된 호출도 모델이 주도합니다. 파괴적 도구일수록 승인 경계와 로그를 강화해야 하며, 도구 권한을 최소로 좁히는 것이 안전합니다.

네 번째 한계는 보안 규칙의 범위입니다. 이 강의가 다룬 토큰 규칙 두 가지는 필수이지만 전부가 아닙니다. 실제 운영에서는 전송 계층 보안, 세션 관리, 입력 검증 등 일반 웹 보안이 그대로 적용됩니다 — web-security-basics의 원칙이 MCP 서버에도 유효합니다.

## 더 읽기

이 강의의 근거 KB는 `mcp-enabled-tool-project`입니다. 먼저 MCP 스펙(2025-11-25)의 개요에서 표준화 선언과 host/client/server 역할을 확인하세요. What is MCP? 문서의 USB-C 비유는 초심자 설명에 유용합니다. Tools 스펙에서 model-controlled 설계를, Authorization 스펙과 Security Best Practices에서 토큰 규칙 두 가지를 확인하세요. 이 출처들이 이 강의 인용의 원문입니다.

선행 강의로 `explain-tool-agent-mcp`(세 층 구분)와 MCP 개념 강의, `tool-permissions-sandboxes`(권한·격리)를 읽으면 이 프로젝트의 위치가 명확해집니다. 다음 학습은 `private-ai-learning-site-project` — 이 사이트 전체를 완성 프로젝트로 다루는 캡스톤에서, MCP 도구 노출이 선택 확장으로 다시 등장합니다.
