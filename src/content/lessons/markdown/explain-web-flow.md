## 한 줄 정의

웹 요청 흐름 설명하기는 브라우저가 페이지를 여는 과정 — client가 request를 보내고 server가 status·headers·body로 답하는 순환 — 을 남이 이해하도록 순서대로 말하는 스킬입니다. MDN은 HTTP를 "a protocol for fetching resources such as HTML documents"라고 정의합니다. 하지만 이 강의의 목표는 정의를 외우는 것이 아니라, ==듣는 사람이 request → response → 추가 리소스 요청의 순서로 그림을 그릴 수 있게 배열하는 능력==입니다.

개념을 아는 것과 설명하는 것은 다른 능력입니다. 바이브코딩에서 여러분은 AI에게 문제를 설명하고, 팀원에게 버그를 설명하고, 자신에게 흐름을 정리합니다. 설명이 모호하면 AI의 답도 모호해집니다. 이 강의는 이미 배운 HTTP 요청/응답 개념을 "남에게 설명하는 순서"로 다시 밟는 연습입니다.

![웹 요청 흐름 설명하기: 한 문장 뼈대에서 method·status·body로, 그리고 sub-resource 요청까지 순서대로 배열하는 설명 구조](/lesson-diagrams/explain-web-flow/explain-flow.svg)

## 왜 존재하는가

"서버가 안 돼요"는 흔한 말이지만 나쁜 설명입니다. 듣는 사람(사람이든 AI든)이 원인을 좁힐 수 없기 때문입니다. 어떤 요청을 보냈는지, 어떤 status가 왔는지, body에 무엇이 있었는지가 빠지면, 상대는 추측만 할 수 있습니다.

explanation-practice 모듈은 이런 모호함을 없애기 위해 존재합니다. 개념 강의에서 배운 것을 말로 재구성하는 훈련입니다. 잘 설명하려면 표준 용어가 필요합니다. MDN과 RFC 9110은 그 공통 용어를 제공합니다 — RFC 9110은 HTTP를 "a stateless application-level protocol"로 정의합니다. 표준 용어를 쓰면 사람에게도 AI에게도 오해 없이 전달됩니다.

핵심은 설명의 품질이 곧 디버깅 속도라는 점입니다. ==method·URL·headers·body·status를 갖춰 설명하면, 그것 자체가 AI나 동료가 원인을 좁힐 수 있는 증거 묶음(evidence packet)이 됩니다==. 설명하기는 단순한 말하기가 아니라, 문제를 검증 가능한 형태로 구조화하는 스킬입니다.

## 작동 원리

### 한 문장 뼈대에서 시작한다

좋은 설명은 큰 그림부터 줍니다. MDN은 client가 보내는 메시지를 request, server의 답을 response라고 합니다("The messages sent by the client are called requests"). 설명의 뼈대는 한 문장입니다: "client가 request를 보내고 server가 response를 준다." 이 뼈대를 먼저 세운 뒤 세부를 붙입니다.

뼈대 없이 세부부터 나열하면 듣는 사람이 길을 잃습니다. 순서는 항상 큰 그림 → 세부입니다.

### 요청과 응답을 분리해서 말한다

MDN은 "There are two types of HTTP messages, requests and responses"라고 합니다. 설명할 때 이 둘을 분리하면 정확도가 올라갑니다. 요청 쪽은 method(GET/POST 등), path, headers, body를 말하고, 응답 쪽은 status code, headers, body를 말합니다. "요청은 이랬고, 응답은 저랬다"로 나누면 상대가 어느 쪽이 문제인지 짚을 수 있습니다.

### status는 class로 요약한다

MDN은 status code를 "A status code, indicating if the request was successful or not, and why"라고 설명합니다. status는 informational·successful·redirection·client error·server error 다섯 class로 나뉩니다. 설명할 때 개별 번호보다 class로 요약하면 빠릅니다: "400번대는 요청 문제, 500번대는 서버 문제." 이 한 줄이 듣는 사람의 방향을 즉시 잡아줍니다.

### 흐름은 sub-resource까지 그린다

페이지는 HTML 하나로 끝나지 않습니다. HTML을 받은 뒤 CSS·scripts·images에 추가 요청이 생깁니다. 완결된 흐름 설명은 "HTML 요청 → 파싱 → 추가 리소스 요청"까지 포함합니다. 이 마지막 단계를 빼면 "페이지가 왜 느린가", "왜 이미지가 안 뜨는가" 같은 질문에 답할 수 없습니다.

## 스펙과 세부

### stateless를 오해 없이 전달한다

MDN은 "HTTP is stateless: there is no link between two requests"라고 합니다. 그러나 cookie로 stateful session이 가능합니다. 설명할 때 이 둘을 구분하지 않으면 듣는 사람이 "로그인이 유지되는데 왜 stateless냐"고 혼란스러워합니다. 정확한 설명은 "요청 간 연결은 없지만 cookie로 세션을 유지한다"입니다 — stateless와 sessionless는 다릅니다.

### 설명을 evidence packet으로 만든다

AI에게 웹 문제를 물을 때, 설명이 그대로 증거 묶음이 되도록 구성합니다. method, URL/path, request headers, request body, response status, response body — 이 여섯 항목을 갖추면 AI는 추측 대신 증거로 원인을 좁힙니다. 좋은 설명의 형식이 곧 좋은 디버깅 입력의 형식입니다.

### 표준 용어를 사용한다

MDN과 RFC 9110의 용어를 쓰면 설명이 이식 가능해집니다. "가져오기" 대신 GET, "보내기" 대신 POST, "에러" 대신 status code class를 쓰면, 다른 사람이나 다른 AI에게 같은 설명을 반복해도 오해가 없습니다. 표준 용어는 설명의 재사용성을 만듭니다.

## 원문으로 읽기

> "HTTP is a protocol for fetching resources such as HTML documents."
>
> — HTTP는 HTML 문서 같은 리소스를 가져오기 위한 프로토콜이다.
> [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

설명의 출발점입니다. HTTP가 무엇을 하는지 한 문장으로 요약하면 듣는 사람이 큰 그림을 먼저 잡습니다.

> "The messages sent by the client are called requests"
>
> — client가 보내는 메시지를 request라고 부른다.
> [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

request/response 용어를 정확히 전달하는 근거입니다. 표준 용어를 쓰면 설명이 이식 가능해집니다.

> "There are two types of HTTP messages, requests and responses"
>
> — HTTP 메시지에는 request와 response 두 종류가 있다.
> [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

흐름을 두 메시지의 순환으로 설명하는 뼈대입니다. 요청과 응답을 분리하는 근거입니다.

> "HTTP is stateless: there is no link between two requests"
>
> — HTTP는 stateless다: 두 요청 사이에는 연결이 없다.
> [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

stateless를 오해 없이 설명하기 위한 근거입니다. cookie 세션과 구분해 전달해야 합니다.

> "A status code, indicating if the request was successful or not, and why."
>
> — 요청이 성공했는지 아닌지, 그리고 그 이유를 나타내는 status code.
> [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

status code를 설명의 핵심 신호로 쓰는 근거입니다. class로 요약하면 빠르게 방향을 잡아줍니다.

## 실전에서

### 버그를 설명할 때 여섯 항목을 갖춘다

동료나 AI에게 웹 버그를 설명할 때 method, path, request body, response status, response body, 그리고 기대했던 결과를 함께 말합니다. 이 형식이 상대의 추측을 없애고 원인을 좁힙니다.

### status는 class로 먼저 말한다

"500 Internal Server Error"를 말하기 전에 "서버 쪽 문제예요(500번대)"로 방향을 먼저 잡아줍니다. 그다음 구체 번호와 body를 붙입니다.

### 큰 그림 → 세부 순서를 지킨다

"client가 요청 보내고 server가 응답한다"는 뼈대를 먼저 세우고, method·status·body를 채웁니다. 세부부터 시작하지 않습니다.

### 설명한 것을 AI 입력으로 재사용한다

사람에게 설명한 evidence packet을 그대로 AI에게 붙여 원인을 묻습니다. 잘 설명한 흐름은 사람과 AI 모두에게 같은 품질의 입력이 됩니다.

## 한계와 트레이드오프

첫 번째 한계는 설명의 상세함과 간결함 사이의 균형입니다. 여섯 항목을 모두 나열하면 정확하지만 길어집니다. 상대가 이미 아는 부분은 줄이고, 문제의 핵심 지점에 집중하는 판단이 필요합니다.

두 번째 trade-off는 표준 용어와 청중 수준의 균형입니다. RFC 용어는 정확하지만 초보자에게는 낯설 수 있습니다. 듣는 사람의 수준에 맞춰 용어를 풀어주되, 정확성은 잃지 않아야 합니다.

세 번째 한계는 설명이 관찰을 대체하지 않는다는 점입니다. 아무리 잘 설명해도, 실제 로그와 네트워크 기록이 없으면 추측이 섞입니다. 좋은 설명은 관찰된 증거 위에 세워져야 합니다.

네 번째 한계는 흐름의 단순화입니다. 이 강의의 흐름 모델(요청 → 응답 → sub-resource)은 이해를 돕는 단순화입니다. 실제로는 캐시, 리다이렉트, 병렬 요청, 연결 재사용이 얽혀 있습니다. 설명이 단순화임을 알고, 필요할 때 세부를 더할 수 있어야 합니다.

## 더 읽기

이 강의의 근거 KB는 `explain-web-flow`이며, 그 개념적 뿌리는 `http-request-response`입니다. 먼저 MDN의 Overview of HTTP를 읽고 request/response·stateless·status code 정의를 확인하세요. 그다음 RFC 9110에서 HTTP를 stateless application-level protocol로 정의하는 표준 표현을 봅니다. 이 두 출처가 이 강의 인용의 원문입니다.

선행 강의로 `http-request-response`(요청/응답 구조)와 `browser-rendering-network`(HTML 이후 sub-resource 요청)를 읽으면 설명할 대상이 명확해집니다. 함께 읽으면 좋은 강의는 `reviewing-ai-output`으로, 잘 설명된 흐름이 AI 출력을 검토할 때 질문의 정확도를 어떻게 높이는지 보여줍니다. 이 설명 스킬은 이후 explanation-practice 모듈의 Context/RAG 비교, Tool·Agent·MCP 관계 설명으로 이어집니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다(원어+번역+링크+해설). 본문은 승인 KB `explain-web-flow`와 그 근거인 `http-request-response`의 MDN·RFC 9110 출처 범위 안에서 작성했으며 KB 외 신규 사실을 추가하지 않았습니다. 하이라이트(`==`)는 섹션당 3개 이하·마커 짝수로 유지했고 콜아웃은 사용하지 않았습니다.
