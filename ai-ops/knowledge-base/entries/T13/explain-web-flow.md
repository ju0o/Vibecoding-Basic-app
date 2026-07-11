---
id: explain-web-flow
title: "웹 요청 흐름 설명하기 (Explaining the Web Request Flow)"
topicGroup: T13
status: approved
score: 89
level: 기초
prerequisites: [http-request-response, browser-rendering-network]
successors: []
related: [json-data-contracts, backend-observability-logs, reviewing-ai-output]
consumers:
  lessons: [explain-web-flow]
  glossary: [Explanation Skill, Request-Response Cycle, Status Code Class]
sources:
  - { title: "MDN — Overview of HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", checked: 2026-07-12 }
  - { title: "RFC 9110: HTTP Semantics", url: "https://datatracker.ietf.org/doc/html/rfc9110", checked: 2026-07-12 }
---

> 소싱 방법: 본 KB는 explanation-practice 모듈의 "설명하기" 스킬 강의를 위한 근거로, 승인 KB `http-request-response`(T02)가 이미 세션 내 fetch로 원문 대조한 MDN·RFC 9110 verbatim 인용을 동일 공식 출처 기준으로 재활용한다(2026-07-12 재확인). 신규 사실은 추가하지 않고, 개념을 "남에게 설명하는 순서"로 재구성한다.

## 정의
웹 요청 흐름 설명하기는 브라우저가 페이지를 여는 과정 — client가 request를 보내고 server가 status·headers·body로 응답하는 순환 — 을 남이 이해하도록 순서대로 말하는 스킬이다. MDN은 HTTP를 "a protocol for fetching resources such as HTML documents"라고 정의하고, "There are two types of HTTP messages, requests and responses"라고 메시지 구조를 설명한다. 설명하기는 이 사실들을 나열하는 것이 아니라, ==듣는 사람이 request → response → sub-resource 순서로 그림을 그릴 수 있게 배열하는 능력==이다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)

## 역사
개념을 아는 것과 설명하는 것은 다른 능력이다. 바이브코딩에서 사람은 AI에게 문제를 설명하고, 팀원에게 버그를 설명하고, 자신에게 흐름을 정리한다. 잘 설명하려면 표준 용어가 필요하다 — MDN과 RFC 9110은 그 공통 용어를 제공한다. RFC 9110은 HTTP를 "a stateless application-level protocol"로 정의한다. explanation-practice 모듈은 이런 개념 강의를 "설명 연습"으로 다시 밟아, 배운 것을 말로 재구성하는 훈련을 한다. (출처: https://datatracker.ietf.org/doc/html/rfc9110, 확인: 2026-07-12)

## 해결하려는 문제
흐름을 안다고 생각해도, 막상 설명하려면 순서가 엉키거나 용어가 부정확해진다. "서버가 안 돼요"처럼 뭉뚱그리면 듣는 사람(사람이든 AI든)이 원인을 좁힐 수 없다. 웹 요청 흐름 설명하기는 이 모호함을 없앤다. MDN은 status code를 "A status code, indicating if the request was successful or not, and why"라고 설명한다 — 설명할 때 method·path·status·body를 분리하면 상대가 정확한 지점을 짚을 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)

## 핵심 개념
1. **요청-응답 순환을 한 문장으로**: MDN은 client가 보내는 메시지를 request, server의 답을 response라고 한다("The messages sent by the client are called requests"). 설명의 뼈대는 "client가 request를 보내고 server가 response를 준다"이다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
2. **stateless를 오해 없이 전달**: MDN은 "HTTP is stateless: there is no link between two requests"라고 하지만, cookies로 stateful session이 가능하다. 설명할 때 stateless와 sessionless를 구분해야 듣는 사람이 오해하지 않는다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
3. **status code class로 요약**: status는 informational·successful·redirection·client error·server error 다섯 class로 나뉜다. 설명할 때 "500번대는 서버 문제, 400번대는 요청 문제"처럼 class로 요약하면 빠르게 전달된다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
4. **sub-resource 흐름까지 포함**: 페이지는 HTML 하나로 끝나지 않는다 — CSS·scripts·images에 additional request가 생긴다. 흐름 설명은 "HTML 요청 → 파싱 → 추가 리소스 요청"까지 포함해야 완결된다. (근거: browser-rendering-network KB, 확인: 2026-07-12)
5. **evidence packet으로서의 설명**: method·URL·headers·body·status·response body를 갖춰 설명하면, AI나 동료가 원인을 좁힐 수 있는 증거 묶음이 된다. 설명의 품질이 곧 디버깅 속도다. (근거: http-request-response KB, 확인: 2026-07-12)

## 관련 기술
- explain-web-flow ↔ http-request-response: 설명의 근거 개념 — request/response 구조. (근거: http-request-response KB, 확인: 2026-07-12)
- explain-web-flow ↔ reviewing-ai-output: 잘 설명된 흐름은 AI 출력을 검토할 때 질문의 정확도를 높인다. (근거: reviewing-ai-output KB, 확인: 2026-07-12)
- explain-web-flow ↔ backend-observability-logs: 흐름 설명에 로그 증거를 붙이면 설득력이 커진다. (근거: backend-observability-logs KB, 확인: 2026-07-12)

## 선행 개념
- http-request-response: 설명할 대상인 request/response 구조.
- browser-rendering-network: HTML 이후 sub-resource 요청 흐름.

## 후행 개념
- explain-context-and-rag: 개념을 비교·설명하는 레퍼런스 스킬로 이어진다.

## AI 시대에서의 의미
AI에게 웹 문제를 물을 때, 설명이 모호하면 AI의 답도 모호해진다. ==method·path·status·body를 분리해 순서대로 설명하면 AI는 정확한 evidence packet을 받아 원인을 좁힐 수 있다==. 설명하기는 단순한 말하기가 아니라, 문제를 검증 가능한 형태로 구조화하는 스킬이다. MDN·RFC의 표준 용어를 쓰면 사람에게도 AI에게도 오해 없이 전달된다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)

## 실무 활용
1. **한 문장 뼈대 → 세부**: "client가 request 보내고 server가 response 준다"로 시작해 method·status·body를 붙인다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
2. **status는 class로 요약**: "500번대 = 서버, 400번대 = 요청"으로 빠르게 전달. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
3. **AI에게 evidence packet으로**: method·URL·headers·body·status를 갖춰 설명한다. (근거: http-request-response KB, 확인: 2026-07-12)
4. **sub-resource까지 그리기**: HTML 이후 CSS·JS·이미지 요청 흐름을 포함해 완결한다. (근거: browser-rendering-network KB, 확인: 2026-07-12)

## FAQ
Q: 설명 연습이 왜 별도 강의인가?
A: 개념을 아는 것과 순서대로 설명하는 것은 다른 능력이다. 설명이 정확해야 사람·AI가 원인을 좁힌다. (근거: http-request-response KB, 확인: 2026-07-12)
Q: "서버가 안 돼요"는 왜 나쁜 설명인가?
A: status code class·method·body를 분리하지 않아 상대가 지점을 짚을 수 없다. MDN은 status가 success 여부와 why를 나타낸다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
Q: stateless를 어떻게 오해 없이 설명하나?
A: "요청 간 연결은 없지만 cookie로 세션을 유지한다"처럼 stateless와 sessionless를 구분해 말한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)

## 자주 하는 실수
1. **결과만 말하고 요청을 뺌**: "500 떴어요"만 말하고 method·path·body를 빼면 원인 추적이 막힌다. 교정: 요청과 응답을 함께 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
2. **stateless를 sessionless로 오해 전달**: cookie 세션을 빼먹으면 듣는 사람이 오해한다. 교정: 둘을 구분한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-12)
3. **HTML 하나로 끝난다고 설명**: sub-resource 요청을 빼면 흐름이 불완전하다. 교정: 추가 요청까지 포함한다. (근거: browser-rendering-network KB, 확인: 2026-07-12)

## 공식 출처
- HTTP 정의·request/response·stateless·status code — [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-12)
- 표준 기준 HTTP 정의 — [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110) (확인: 2026-07-12)

## Quote Bank
- > "HTTP is a protocol for fetching resources such as HTML documents."
  - 출처: [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-12)
  - 맥락: 설명의 출발점 — HTTP가 무엇을 하는지 한 문장으로.
- > "The messages sent by the client are called requests"
  - 출처: [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-12)
  - 맥락: request/response 용어를 정확히 전달할 때 사용한다.
- > "There are two types of HTTP messages, requests and responses"
  - 출처: [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-12)
  - 맥락: 흐름을 두 메시지의 순환으로 설명할 때 사용한다.
- > "HTTP is stateless: there is no link between two requests"
  - 출처: [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-12)
  - 맥락: stateless를 오해 없이 설명할 때 사용한다.
- > "A status code, indicating if the request was successful or not, and why."
  - 출처: [MDN — Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) (확인: 2026-07-12)
  - 맥락: status code를 설명의 핵심 신호로 쓸 때 사용한다.
- > "The Hypertext Transfer Protocol (HTTP) is a stateless application-level protocol"
  - 출처: [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110) (확인: 2026-07-12)
  - 맥락: 표준 용어로 정의를 못박을 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Fable — 대행, P-01/P-02). http-request-response 승인 KB의 MDN·RFC 9110 verbatim 인용 재활용, Score 89.
