---
id: http-request-response
title: "HTTP Request and Response (HTTP 요청과 응답)"
topicGroup: T02
status: approved
score: 90
level: 기초
prerequisites: [files-folders-paths]
successors: [json-data-contracts, web-security-basics, api-rest-basics]
related: [browser-rendering-network]
consumers:
  lessons: [http-request-response]
  glossary: [HTTP Request, HTTP Response, HTTP Method, HTTP Header, HTTP Body, Status Code]
sources:
  - { title: "Overview of HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", checked: 2026-07-06 }
  - { title: "HTTP messages", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages", checked: 2026-07-06 }
  - { title: "HTTP request methods", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods", checked: 2026-07-06 }
  - { title: "HTTP response status codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status", checked: 2026-07-06 }
  - { title: "RFC 9110: HTTP Semantics", url: "https://datatracker.ietf.org/doc/html/rfc9110", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
HTTP request and response는 browser 같은 client가 resource를 요청하고 server가 status, headers, body로 답하는 Web data exchange의 기본 메시지 구조다. MDN은 HTTP가 HTML documents 같은 resources를 fetch하기 위한 protocol이며 Web data exchange의 foundation이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
HTTP는 client-server protocol이며 requests는 recipient인 client 쪽, 보통 Web browser에서 initiate된다. MDN은 client가 보내는 messages를 requests, server answer를 responses라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## 역사
MDN은 HTTP가 early 1990s에 designed된 extensible protocol이며 over time evolved했다고 설명한다. 현재의 공통 의미론은 IETF RFC 9110이 HTTP Semantics로 정리하며, 해당 문서는 June 2022 Internet Standard로 제시된다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06; https://datatracker.ietf.org/doc/html/rfc9110, 확인: 2026-07-06)
RFC 9110은 HTTP를 stateless application-level protocol for distributed, collaborative, hypertext information systems로 정의한다. 이 문서는 core protocol elements, extensibility mechanisms, http/https URI schemes를 정의한다고 설명한다. (출처: https://datatracker.ietf.org/doc/html/rfc9110, 확인: 2026-07-06)

## 해결하려는 문제
HTTP request/response 구조를 모르면 브라우저에서 페이지가 열릴 때 어떤 resource를 요청했는지, 어떤 status code가 왔는지, headers와 body가 무엇을 의미하는지 해석하기 어렵다. MDN은 Web page가 HTML document를 fetch한 뒤 scripts, CSS, images/videos 같은 sub-resources에 additional requests를 만든다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
API와 backend debugging에서도 request method, path, headers, body, response status, response body를 구분해야 한다. MDN은 HTTP messages가 requests와 responses 두 type이며 각자 own format을 가진다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## 핵심 개념
1. Client-server protocol: MDN은 HTTP가 client-server protocol이고 browser가 request를 initiate한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
2. Stateless but not sessionless: MDN은 HTTP가 stateless지만 cookies를 통해 stateful sessions를 사용할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
3. HTTP flow: MDN은 TCP connection open, HTTP message send, server response read, connection close/reuse 단계를 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
4. Request elements: MDN은 request가 method, resource path, protocol version, optional headers, some methods의 body로 구성된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
5. Response elements: MDN은 response가 protocol version, status code, status message, headers, optional body로 구성된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
6. Methods: MDN HTTP methods reference는 GET, POST, PUT, DELETE 등 request methods를 나열하고 method가 client wants to perform하는 operation을 define한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
7. Status codes: MDN은 status code가 request successful 여부와 이유를 indicate한다고 설명한다. status reference는 informational, successful, redirection, client error, server error classes를 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status, 확인: 2026-07-06)

## 관련 기술
Fetch API는 JavaScript에서 HTTP requests를 만들 때 쓰는 API다. MDN HTTP overview는 Fetch API가 HTTP based API 중 가장 commonly used라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
Browser rendering/network flow는 HTTP response 이후 HTML parsing과 linked resource requests로 이어진다. MDN browser work 문서는 initial HTTP GET request와 linked resources가 parsing 중 요청된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

## 선행 개념
files-folders-paths: URL path, resource path, local project path를 구분해야 HTTP request path와 code file path를 혼동하지 않는다. MDN은 request element로 resource path를 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## 후행 개념
json-data-contracts: API response body는 JSON data contract로 다뤄질 수 있으므로 HTTP message body와 status를 먼저 알아야 한다. MDN은 response body가 fetched resource를 contain할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
web-security-basics: cookies, authentication, same-origin, headers, CORS 같은 web security 주제는 HTTP 기반에서 작동한다. MDN HTTP overview는 authentication, cookies, origin constraint를 HTTP로 controlled 가능한 features로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 API 오류를 고치려면 request method, URL/path, headers, body, response status, response body를 알아야 한다. MDN의 request/response element 설명은 AI에게 제공할 evidence packet의 항목이 된다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
AI가 "서버가 안 된다"고 말할 때 status code class, request method, response body를 분리해 확인해야 한다. MDN은 status code가 request success 여부와 why를 indicate한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status, 확인: 2026-07-06)

## 실무 활용
1. Network evidence 기록: method, path, status code, request headers/body, response headers/body를 기록한다. MDN request/response element 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
2. API debugging: GET과 POST처럼 method가 operation을 나타내고, status code가 request result를 나타내므로 두 정보를 분리해서 본다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status, 확인: 2026-07-06)
3. Browser page load: HTML document request 이후 CSS, scripts, images에 additional requests가 생긴다. MDN HTTP overview와 browser work 문서에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

```http
GET /lessons/http-request-response HTTP/1.1
Host: example.com
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html

<!doctype html>
```

## FAQ
Q: HTTP는 HTML만 가져오는가?
A: 아니다. MDN은 HTTP가 hypertext documents뿐 아니라 images, videos, server post content, partial document updates에도 쓰인다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

Q: HTTP는 상태가 전혀 없는가?
A: core HTTP는 stateless지만 MDN은 cookies가 stateful sessions를 가능하게 한다고 설명한다. 따라서 stateless와 sessionless를 구분해야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

Q: status code만 보면 오류 원인을 알 수 있는가?
A: 일부 판단은 가능하지만 충분하지 않다. MDN은 status code가 success 여부와 why를 indicate한다고 설명하지만, debugging에는 method, path, headers, body, server log 같은 추가 evidence가 필요하다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: GET과 POST를 단순히 "가져오기/보내기"로만 외운다. 왜 생기나: method가 operation을 define한다는 관점을 놓치기 때문이다. 교정: MDN request elements에서 method의 역할을 함께 본다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
2. 실수: 500 status면 frontend는 볼 필요 없다고 판단한다. 왜 생기나: response status만 보고 request evidence를 버리기 때문이다. 교정: request method/path/body와 response를 같이 기록한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
3. 실수: HTTP가 항상 연결 하나만 사용한다고 생각한다. 왜 생기나: request/response pair만 기억하기 때문이다. 교정: MDN HTTP flow와 connection reuse 설명을 함께 본다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## 공식 출처
- HTTP fetches resources and is the foundation of Web data exchange — [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
- HTTP is client-server and browser initiated — [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
- Requests and responses have separate formats — [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview), [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages) (확인: 2026-07-06)
- Status codes indicate success/failure and why — [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) (확인: 2026-07-06)
- RFC 9110 defines HTTP Semantics as an Internet Standard — [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110) (확인: 2026-07-06)

## Quote Bank
- > "HTTP is a protocol for fetching resources such as HTML documents."
  - 출처: [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
  - 맥락: HTTP의 기본 정의를 설명할 때 사용한다.
- > "The messages sent by the client are called requests"
  - 출처: [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
  - 맥락: request/response 용어를 설명할 때 사용한다.
- > "HTTP is stateless: there is no link between two requests"
  - 출처: [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
  - 맥락: stateless 개념을 설명할 때 사용한다.
- > "There are two types of HTTP messages, requests and responses"
  - 출처: [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
  - 맥락: message 구조를 설명할 때 사용한다.
- > "A status code, indicating if the request was successful or not, and why."
  - 출처: [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-06)
  - 맥락: status code의 역할을 설명할 때 사용한다.
- > "The Hypertext Transfer Protocol (HTTP) is a stateless application-level protocol"
  - 출처: [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110) (확인: 2026-07-06)
  - 맥락: 표준 문서 기준 HTTP 정의를 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
