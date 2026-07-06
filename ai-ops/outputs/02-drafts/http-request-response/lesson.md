## 한 줄 정의

HTTP 요청과 응답은 browser 같은 client가 resource를 요청하고 server가 status, headers, body로 답하는 Web data exchange의 기본 message 구조입니다. MDN은 HTTP가 HTML documents 같은 resources를 fetch하기 위한 protocol이며 Web data exchange의 foundation이라고 설명합니다. RFC 9110은 HTTP를 stateless application-level protocol로 정의하고, MDN은 client가 보내는 messages를 requests, server answer를 responses라고 설명합니다.

이 강의의 목표는 HTTP를 "인터넷 통신"이라는 큰 말로 뭉개지 않는 것입니다. 실제 개발과 AI 디버깅에서는 method, path, headers, body, status code, response body처럼 작은 조각을 구분해야 합니다. "API가 안 됩니다"라는 문장은 원인을 알려 주지 않지만, "POST `/api/login` request가 500 status와 JSON error body를 반환했습니다"라는 문장은 분석 가능한 evidence가 됩니다.

==HTTP를 이해한다는 것은 request와 response를 각각의 message 구조로 읽을 수 있다는 뜻==입니다. browser rendering/network flow 강의가 URL navigation에서 HTTP GET request로 이어지는 큰 흐름을 봤다면, 이번 강의는 그 request와 response 안쪽을 열어 봅니다.

![HTTP request response anatomy](/lesson-diagrams/http-request-response/http-message-anatomy.svg)

## 왜 존재하는가

웹은 client와 server가 resource를 주고받아야 작동합니다. browser는 HTML document를 가져오고, page는 CSS, scripts, images 같은 sub-resources를 추가로 요청할 수 있습니다. API client는 user profile, lesson progress, search results 같은 data를 요청할 수 있습니다. 이때 서로가 같은 형식으로 말하지 않으면 debugging과 interoperability가 어렵습니다.

HTTP는 이 공통 언어를 제공합니다. request는 client가 무엇을 원하는지 말하고, response는 server가 어떤 결과를 돌려주는지 말합니다. method는 어떤 operation을 원하는지 나타내고, resource path는 대상을 가리키며, headers는 message metadata를 담고, body는 실제 content 또는 payload를 담을 수 있습니다. response 쪽에서는 status code가 request가 성공했는지와 왜 그런지를 나타내는 evidence가 됩니다.

HTTP 구조를 모르면 브라우저에서 페이지가 열릴 때 어떤 resource를 요청했는지, 어떤 status code가 왔는지, headers와 body가 무엇을 의미하는지 해석하기 어렵습니다. API debugging에서도 마찬가지입니다. AI가 "서버 오류입니다"라고 말해도 request method와 path, request body, response status, response body를 보지 않으면 원인을 좁힐 수 없습니다.

HTTP는 early 1990s에 designed된 extensible protocol로 over time evolved했습니다. 현재의 공통 의미론은 RFC 9110이 HTTP Semantics로 정리합니다. 이 역사적 세부를 외우는 것이 목표는 아닙니다. 중요한 것은 HTTP가 오래된 단순 약속이 아니라, 지금도 browser, API, backend, security, deployment를 연결하는 공통 message layer라는 점입니다.

> [!KEY]
> HTTP request/response를 읽는 능력은 프론트엔드와 백엔드 사이의 책임을 나누는 기본 언어입니다. status만 보지 말고 message 전체를 봐야 합니다.

## 작동 원리

### 1. Client가 request를 시작합니다

MDN은 HTTP가 client-server protocol이고, requests는 recipient인 client 쪽, 보통 Web browser에서 initiate된다고 설명합니다. client는 "어떤 resource에 대해 어떤 operation을 원하는가"를 request message로 표현합니다. browser page load라면 HTML document를 요청할 수 있고, JavaScript fetch라면 API endpoint에 data를 요청하거나 제출할 수 있습니다.

이 구조에서 client는 단순 소비자가 아닙니다. client가 어떤 method를 쓰는지, 어떤 path로 보내는지, 어떤 headers와 body를 담는지가 server의 해석에 직접 영향을 줍니다. 잘못된 method, 틀린 path, 빠진 content type, 잘못된 body shape는 모두 server error 또는 client error로 이어질 수 있습니다. AI가 API 호출 코드를 생성하면 이 request 구성요소를 반드시 봐야 합니다.

### 2. Request는 method, path, protocol version, headers, body로 읽습니다

MDN은 request가 method, resource path, protocol version, optional headers, 일부 methods의 body로 구성된다고 설명합니다. 이 분해가 실무의 핵심입니다. "요청이 실패했다"는 말은 너무 큽니다. method가 잘못됐는지, path가 잘못됐는지, header가 빠졌는지, body가 schema와 맞지 않는지 각각 다른 원인입니다.

method는 operation의 성격을 말합니다. GET은 resource를 가져오는 대표 method이고, POST는 data submission이나 server-side processing과 연결될 수 있습니다. KB는 GET과 POST를 "가져오기/보내기"로만 외우지 말고 method가 operation을 define한다는 관점을 유지하라고 말합니다. 이 구분은 REST API 학습의 선행 조건입니다.

resource path는 어떤 resource를 대상으로 하는지 나타냅니다. 여기서 path는 local file path와 다릅니다. `D:\project\src\app.tsx` 같은 local path와 `/api/lessons` 같은 URL path를 혼동하면 request evidence를 잘못 전달하게 됩니다. 그래서 이 KB의 prerequisite가 files-folders-paths입니다.

headers는 message metadata입니다. Accept, Content-Type, Cookie, Authorization 같은 정보가 여기에 들어갈 수 있습니다. body는 일부 request에서 payload를 담습니다. 예를 들어 login request라면 JSON body가 들어갈 수 있습니다. body가 있는지 없는지, content type과 body shape가 맞는지는 API debugging에서 자주 중요한 evidence가 됩니다.

### 3. Server는 response로 결과를 표현합니다

MDN은 response가 protocol version, status code, status message, headers, optional body로 구성된다고 설명합니다. response는 server가 "이 request를 어떻게 처리했는가"를 client에게 돌려주는 message입니다. status code는 request가 successful인지 아닌지와 why를 indicate합니다.

하지만 status code 하나만으로 모든 것을 알 수는 없습니다. 404는 resource를 찾을 수 없다는 class의 signal이지만, path가 틀렸는지 routing 설정이 없는지, auth 때문에 숨겨졌는지 같은 세부는 추가 evidence가 필요할 수 있습니다. 500도 server error class를 말하지만 request body가 잘못되어 server code가 예외를 냈을 수도 있습니다. response body나 server log, request evidence가 함께 있어야 원인을 좁힙니다.

==response status는 출발점이지 결론 전체가 아닙니다.== AI에게 "500이 떠요"라고만 말하면 AI는 server 내부를 추측하게 됩니다. "POST `/api/login`, request body shape, response status 500, response body message"를 함께 주면 분석 가능성이 올라갑니다.

### 4. HTTP는 stateless이지만 sessionless는 아닙니다

MDN은 HTTP가 stateless지만 cookies를 통해 stateful sessions를 사용할 수 있다고 설명합니다. stateless는 request 사이에 자동 연결이 없다는 뜻입니다. 각 request는 독립적으로 해석되어야 합니다. 그러나 cookies 같은 mechanism을 통해 session state를 만들 수 있습니다. 그래서 "HTTP는 stateless"와 "웹 앱에 login session이 있다"는 말은 충돌하지 않습니다.

이 구분은 authentication과 debugging에서 중요합니다. 어떤 request가 로그인된 사용자로 처리되려면 cookie나 authorization header 같은 state-carrying evidence가 필요할 수 있습니다. AI가 API 문제를 분석할 때도 "브라우저에서는 되는데 fetch에서는 안 된다"면 headers, cookies, credentials 설정을 확인해야 할 수 있습니다. 이 강의는 auth 세부로 들어가지 않지만, HTTP message가 state를 운반하는 위치를 이해하는 것이 다음 학습으로 이어집니다.

### 5. Browser page load는 하나의 request로 끝나지 않습니다

MDN은 Web page가 HTML document를 fetch한 뒤 scripts, CSS, images/videos 같은 sub-resources에 additional requests를 만든다고 설명합니다. 이 사실은 Network tab을 읽을 때 매우 중요합니다. page load는 하나의 HTML request만이 아니라 linked resource requests의 흐름입니다.

따라서 browser page가 깨졌을 때 initial document request와 sub-resource requests를 분리해야 합니다. HTML document는 200인데 CSS file이 404일 수 있고, JavaScript bundle이 failed 될 수 있습니다. 반대로 CSS와 JS는 성공했지만 initial document가 redirect되었거나 auth 문제를 가질 수도 있습니다. HTTP request/response 구조를 알면 Network tab에서 각 row를 별도 message exchange로 읽을 수 있습니다.

### 6. Fetch API와 HTTP는 연결되지만 같은 말은 아닙니다

KB는 Fetch API가 JavaScript에서 HTTP requests를 만들 때 쓰는 API라고 설명합니다. Fetch API는 HTTP based API 중 commonly used한 예로 소개됩니다. 즉 JavaScript 코드에서 `fetch()`를 호출하면 HTTP request를 만들 수 있지만, HTTP 자체는 browser와 server 사이의 protocol layer입니다.

이 구분을 알면 API 코드를 읽을 때 층위가 보입니다. `fetch("/api/lessons")`는 JavaScript function call이고, 그 결과로 HTTP request가 만들어집니다. request method, headers, body를 어떻게 설정하는지는 fetch options와 연결됩니다. response를 받은 뒤 `.json()`으로 body를 해석하는 것은 JavaScript runtime의 후속 처리입니다.

### 7. AI 디버깅은 request/response evidence packet에서 시작합니다

AI가 API 오류를 고치려면 request method, URL/path, headers, body, response status, response body를 알아야 합니다. 이 항목들은 KB의 request/response elements에서 직접 나온 것입니다. evidence packet이 없으면 AI는 "가능한 원인"을 나열할 수는 있어도 실제 원인을 확인하기 어렵습니다.

```http
GET /lessons/http-request-response HTTP/1.1
Host: example.com
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html

<!doctype html>
```

이 예시는 request와 response를 한 줄씩 분리해 보여 줍니다. request line은 method와 path와 protocol version을 담고, request headers는 client가 원하는 representation을 표현합니다. response line은 protocol version과 status를 담고, response headers는 content metadata를 담으며, body에는 fetched resource가 들어갈 수 있습니다.

> [!WARNING]
> HTTP debugging에서 status code만 캡처하고 request method/path/body를 버리면 원인의 절반을 잃습니다.

## 스펙과 세부

### HTTP message는 request와 response 두 종류입니다

MDN은 HTTP messages가 requests와 responses 두 type이며 각자 own format을 가진다고 설명합니다. 두 message 모두 header와 body라는 비슷한 단어를 가질 수 있지만, 역할은 다릅니다. request headers는 client intent와 constraints를 전달하고, response headers는 server result와 representation metadata를 전달합니다.

### Request method는 operation을 나타냅니다

MDN HTTP methods reference는 GET, POST, PUT, DELETE 등 request methods를 나열하고, method가 client wants to perform하는 operation을 define한다고 설명합니다. 이 기준 때문에 method는 단순 동사 암기가 아닙니다. API 설계와 debugging에서 method와 path가 함께 resource operation을 표현합니다.

### Resource path와 local file path는 다릅니다

HTTP request element로 resource path가 등장합니다. 이 path는 URL 안에서 server가 해석하는 resource target입니다. local project path와 혼동하면 AI에게 잘못된 evidence를 줄 수 있습니다. "파일 위치"는 codebase 수정에 필요하고, "request path"는 server routing과 HTTP debugging에 필요합니다.

### Headers는 metadata입니다

request와 response 모두 headers를 가질 수 있습니다. content type, accept, cookies, auth, caching 같은 주제는 headers와 연결됩니다. 이 강의는 각 header의 세부 목록을 다루지 않습니다. 핵심은 headers가 body와 별개로 message metadata를 전달한다는 점입니다.

### Body는 optional입니다

request와 response에는 optional body가 있을 수 있습니다. 모든 request가 body를 갖는 것은 아니며, 모든 response body가 같은 형식인 것도 아닙니다. HTML document, JSON API response, error message 등 body content는 context에 따라 다릅니다. 그래서 body를 볼 때 Content-Type 같은 header와 함께 읽어야 합니다.

### Status code class

MDN status reference는 informational, successful, redirection, client error, server error classes를 제공합니다. 2xx, 3xx, 4xx, 5xx의 큰 분류는 문제 범위를 빠르게 좁히는 데 유용합니다. 그러나 status code class만으로 root cause를 확정하지는 않습니다.

### RFC 9110의 의미

RFC 9110은 HTTP Semantics를 정리하는 표준 문서입니다. KB는 이 문서를 June 2022 Internet Standard로 기록합니다. 초보 단계에서 RFC를 처음부터 끝까지 읽을 필요는 없지만, "HTTP가 MDN tutorial만의 설명이 아니라 표준 의미론을 갖는 protocol"이라는 감각은 중요합니다.

## 원문으로 읽기

> "HTTP is a protocol for fetching resources such as HTML documents."
>
> — HTTP는 HTML 문서 같은 resource를 가져오기 위한 protocol이다.
> [Overview of HTTP — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (CC-BY-SA)

이 문장은 HTTP의 중심 역할을 짧게 보여 줍니다. HTTP는 추상적인 인터넷 전체가 아니라 resource fetching protocol입니다. browser가 HTML document를 가져오고, API client가 JSON resource를 요청하는 일이 이 기본 구조 위에 놓입니다.

> "There are two types of HTTP messages, requests and responses"
>
> — HTTP message에는 request와 response 두 종류가 있다.
> [Overview of HTTP — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (CC-BY-SA)

이 인용은 강의 전체의 분해 기준입니다. request와 response를 나누어야 method와 status, request body와 response body, request headers와 response headers를 헷갈리지 않습니다. AI debugging evidence도 이 두 message를 나누어 정리해야 합니다.

> "The Hypertext Transfer Protocol (HTTP) is a stateless application-level protocol"
>
> — Hypertext Transfer Protocol은 stateless application-level protocol이다.
> [RFC 9110 — IETF](https://datatracker.ietf.org/doc/html/rfc9110)

RFC의 표현은 HTTP의 표준적 성격을 보여 줍니다. stateless라는 단어는 request들이 자동으로 연결된 state를 공유하지 않는다는 뜻입니다. 하지만 cookies 같은 mechanism으로 session을 만들 수 있으므로, stateless와 sessionless를 구분해야 합니다.

## 실전에서

### 1. Network evidence는 표로 기록합니다

API 오류를 만났을 때는 request와 response를 분리한 표를 만듭니다. method, path, request headers/body, status code, response headers/body를 적습니다. 이 정도만 해도 "안 됩니다"라는 설명이 분석 가능한 debugging input으로 바뀝니다.

```txt
Request
- method: POST
- path: /api/login
- headers: Content-Type: application/json
- body: {"email":"...","password":"..."}

Response
- status: 500
- headers: Content-Type: application/json
- body: {"error":"internal server error"}
```

이 표는 원인을 확정하지 않습니다. 하지만 server log를 봐야 하는지, request body shape를 봐야 하는지, route path를 봐야 하는지 판단할 출발점을 줍니다. AI에게도 같은 evidence를 주면 추측 목록보다 구체적인 확인 순서를 받을 수 있습니다.

### 2. Browser page load는 document와 sub-resource를 나눕니다

page load 문제를 볼 때 initial document request와 CSS/JS/image requests를 분리합니다. document request가 200이어도 CSS가 실패하면 화면이 깨질 수 있고, script가 실패하면 interaction이 되지 않을 수 있습니다. browser-rendering-network 강의에서 본 rendering flow와 이 강의의 HTTP message 구조가 여기서 만납니다.

> [!EXAMPLE]
> HTML document request는 200인데 `/styles.css`가 404라면 server 자체가 "전체 실패"한 것이 아니라 특정 sub-resource path 또는 배포 구성이 문제일 수 있습니다.

### 3. Method와 status를 따로 읽습니다

GET과 POST를 단순히 "가져오기/보내기"로만 외우면 API debugging이 얕아집니다. method는 operation을 나타내고, status code는 request result를 나타냅니다. 둘은 다른 evidence입니다. 같은 404라도 GET `/lessons/x`와 POST `/api/login`은 의미가 다릅니다.

AI에게 API 설계를 맡길 때도 method와 path를 명시하게 해야 합니다. "로그인 API 만들어줘"보다 "POST `/api/login` request body와 response status/body를 정의해줘"가 더 검토 가능합니다. 이 요청은 AI가 code만 만들지 않고 HTTP contract를 설명하게 합니다.

### 4. Status code만으로 blame하지 않습니다

500 status가 보이면 backend 문제처럼 보일 수 있습니다. 그러나 frontend가 잘못된 body를 보내 server code가 처리하지 못했을 수도 있습니다. 400 class라면 client request evidence를 먼저 봐야 할 가능성이 커집니다. 401/403은 auth와 headers/cookies로 이어질 수 있습니다. 이 강의는 각 status code를 모두 다루지는 않지만, class와 request evidence를 함께 보라는 원칙을 세웁니다.

> [!KEY]
> HTTP 디버깅의 좋은 질문은 "누가 잘못했나"가 아니라 "request message와 response message 중 어느 조각이 기대와 다른가"입니다.

## 한계와 트레이드오프

첫째, HTTP message 구조를 알아도 backend 내부 원인을 자동으로 알 수는 없습니다. response status와 body는 server가 드러낸 결과입니다. root cause는 server log, database state, application code, auth configuration에 있을 수 있습니다. 하지만 HTTP evidence가 없으면 그다음 조사를 어디서 시작할지 정하기 어렵습니다.

둘째, status code는 중요한 signal이지만 충분하지 않습니다. KB도 status code만 보면 일부 판단은 가능하지만 debugging에는 method, path, headers, body, server log 같은 추가 evidence가 필요하다고 설명합니다. ==status code는 message의 한 field이지 전체 사건 기록이 아닙니다.==

셋째, HTTP는 stateless이지만 웹 앱은 session을 가질 수 있습니다. 이 차이를 모르면 "로그인했는데 왜 API는 모르는가" 같은 문제를 잘못 이해합니다. cookies, authentication, same-origin, CORS 같은 주제는 후속 web-security-basics에서 더 자세히 다룰 수 있습니다.

넷째, Fetch API와 HTTP를 혼동하면 debugging이 꼬입니다. `fetch()`는 JavaScript API이고 HTTP는 protocol입니다. fetch option이 request method/header/body를 만들 수 있지만, response를 어떻게 parse할지는 JavaScript code의 후속 처리입니다. 어떤 층에서 실패했는지 나누어야 합니다.

마지막으로, 이 강의는 REST API 설계 전체를 다루지 않습니다. method, path, status code를 이해하는 것은 REST API 설계의 선행 조건이지만, resource modeling, idempotency, caching, error format 같은 세부는 후속 강의에서 다루는 편이 좋습니다.

## 더 읽기

먼저 MDN의 [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)를 읽어 HTTP가 resource fetching protocol이고 client-server request/response 구조를 갖는다는 큰 그림을 잡습니다. 이 문서는 HTTP flow, stateless, cookies, browser page load의 additional requests까지 연결해 줍니다.

다음으로 [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages)를 읽어 request와 response format을 더 자세히 봅니다. request line, headers, body와 response status line, headers, body를 구분하는 연습을 합니다.

그다음 [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)와 [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)를 함께 읽습니다. method가 operation을 표현하고 status code가 result를 표현한다는 두 축을 분리해 이해하면 API debugging이 훨씬 선명해집니다.

마지막으로 [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)를 표준 문서 기준점으로 둡니다. 처음부터 전체를 읽기보다 HTTP가 stateless application-level protocol이라는 정의와 HTTP semantics의 범위를 확인하는 정도로 시작해도 충분합니다.

후속 학습은 `json-data-contracts`와 `web-security-basics`입니다. response body가 JSON data contract가 될 수 있고, cookies, authentication, same-origin, headers, CORS 같은 보안 주제는 HTTP message 구조 위에서 작동합니다.
