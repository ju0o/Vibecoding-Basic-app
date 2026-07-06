---
id: web-security-basics
title: "Web Security Basics (웹 보안 기초)"
topicGroup: T07
status: draft
score: null
level: 중급
prerequisites: [http-request-response]
successors: [auth-session-token, api-security-rate-limits]
related: [json-data-contracts]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Same-origin policy", url: "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy", checked: 2026-07-06 }
  - { title: "Cross-Origin Resource Sharing (CORS)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS", checked: 2026-07-06 }
  - { title: "Content Security Policy (CSP)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP", checked: 2026-07-06 }
  - { title: "Cross Site Scripting (XSS)", url: "https://owasp.org/www-community/attacks/xss/", checked: 2026-07-06 }
  - { title: "Cross-Site Request Forgery Prevention Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
웹 보안 기초는 브라우저와 서버 사이의 신뢰 경계를 다루는 기본 원칙이다. MDN은 same-origin policy가 한 origin에서 load된 document나 script가 다른 origin의 resource와 상호작용하는 방식을 제한하는 critical security mechanism이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)
이 KB는 XSS, CSRF, CORS, CSP를 초보자가 웹 request/response 흐름 위에서 구분하기 위한 기초 지식으로 정리한다. OWASP는 XSS를 malicious scripts가 trusted websites에 injected되는 injection type으로 설명하고, CSRF는 authenticated browser를 trusted site에서 unwanted action으로 속이는 attack으로 설명한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06; https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 역사
웹 보안의 핵심 배경은 browser가 여러 site의 content를 같은 runtime에서 다루면서도 origin별로 data access를 격리해야 한다는 점이다. MDN은 same-origin policy가 malicious website가 사용자가 로그인한 third-party webmail이나 company intranet data를 read하고 attacker에게 relay하는 것을 막는 예시를 든다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)
CORS는 strict same-origin default 위에서 server가 허용할 cross-origin access를 HTTP headers로 표현하는 mechanism이다. MDN은 CORS가 HTTP-header based mechanism이며 server가 browser에게 다른 origin에서 resource loading을 permit할 수 있음을 나타낸다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)
CSP는 site code가 할 수 있는 일을 browser가 제한하도록 website가 instructions를 보내는 방어 기법이다. MDN은 CSP가 certain security threats risk를 prevent 또는 minimize하는 feature이며 website가 browser에게 restrictions를 instruct하는 series of instructions라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP, 확인: 2026-07-06)

## 해결하려는 문제
same-origin policy가 없으면 한 site의 script가 다른 origin의 sensitive data를 읽는 위험이 커진다. MDN은 same-origin policy가 malicious documents를 isolate하고 possible attack vectors를 줄인다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)
XSS를 막지 못하면 untrusted input이 page output에 포함되어 browser가 malicious script를 trusted source에서 온 것으로 실행할 수 있다. OWASP는 XSS가 user input을 generated output에 validation 또는 encoding 없이 포함할 때 발생할 수 있다고 설명한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)
CSRF를 막지 못하면 authenticated user의 browser가 forged authenticated request를 보낼 수 있다. OWASP는 target user가 authenticated 상태이면 unprotected sites가 legitimate authorized requests와 forged authenticated requests를 구분할 수 없다고 설명한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 핵심 개념
1. Origin: MDN은 두 URL이 protocol, port, host가 같으면 same origin이라고 설명하며, 이를 scheme/host/port tuple이라고도 부른다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)
2. Same-origin policy: MDN은 이 정책이 different origins 사이의 interactions를 control하고, cross-origin reads는 typically disallowed라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)
3. CORS: MDN은 CORS가 HTTP headers를 추가해 server가 browser에서 어떤 origins가 information을 read할 수 있는지 describe하게 한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)
4. Preflight: MDN은 browser가 cross-origin resource server에 preflight request를 보내 actual request를 permit할지 확인할 수 있고, preflight에는 actual request의 method와 headers가 담긴다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)
5. XSS: OWASP는 XSS가 malicious scripts를 otherwise benign and trusted websites에 inject하는 injection type이라고 설명한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)
6. CSRF: OWASP는 CSRF가 malicious website, email, blog, instant message, program이 authenticated user's browser를 trusted site에서 unwanted action으로 속이는 attack이라고 설명한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)
7. CSP: MDN은 CSP가 browser에 site code가 allowed to do things를 제한하라는 instructions를 주는 feature라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP, 확인: 2026-07-06)

## 관련 기술
HTTP headers는 보안 정책을 전달하는 실무 경로다. CORS는 HTTP headers를 사용하고, CSP는 website가 browser에게 restrictions를 instruct하는 방식이므로 HTTP response 이해가 필요하다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP, 확인: 2026-07-06)
JSON data contracts와 보안은 user input/output shape 검토에서 만난다. OWASP XSS 설명은 untrusted source의 data가 web user에게 보내지는 dynamic content에 validation 없이 포함되는 상황을 말하므로, JSON field가 화면에 렌더링되는 경로를 추적해야 한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)
Authentication과 session token은 CSRF와 직접 연결된다. OWASP는 target user가 authenticated 상태인 경우 forged authenticated requests와 legitimate requests를 구분할 수 없는 문제가 생긴다고 설명한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 선행 개념
http-request-response: 웹 보안 기초는 request method, headers, body, response headers, status를 기준으로 읽어야 한다. CORS와 CSP는 HTTP headers를 사용하고, CSRF는 authenticated request를 다루므로 HTTP message 구조 이해가 선행되어야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP, 확인: 2026-07-06; https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 후행 개념
auth-session-token: CSRF와 cookie/session handling은 인증 상태와 직접 연결된다. OWASP는 authenticated user's browser가 unwanted action을 수행하도록 속는 공격을 CSRF로 설명한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)
api-security-rate-limits: API 보안은 CORS, Content-Type, authentication, authorization, rate limit을 함께 다루는 후속 주제다. 이 KB는 browser security boundary와 request/response 관찰에 한정한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 CORS error를 보면 server를 무조건 고치거나 client fetch option만 바꾸려 할 수 있다. MDN CORS 설명에 따르면 CORS는 server가 allowed origins를 headers로 표현하고 browser가 same-origin policy 아래에서 cross-origin script requests를 제한하는 mechanism이므로, origin, response headers, preflight를 evidence로 줘야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)
AI가 XSS 위험을 검토할 때는 "문자열 출력"이 아니라 untrusted data가 HTML/JS 실행 context로 들어가는 경로를 봐야 한다. OWASP는 XSS가 user input이 validation/encoding 없이 generated output에 포함될 때 발생할 수 있다고 설명한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)
AI에게 CSRF 수정을 요청할 때는 "버튼 클릭 요청"만이 아니라 인증 상태, cookie 사용, token 검증 여부를 함께 제시해야 한다. OWASP는 unprotected target sites가 legitimate authorized requests와 forged authenticated requests를 구분할 수 없는 문제를 설명한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 실무 활용
1. CORS evidence 기록: browser console error, request origin, target URL, response CORS headers, preflight method/header를 함께 기록한다. MDN은 preflight가 actual request의 method와 headers를 담아 server permission을 확인한다고 설명한다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)

```txt
Origin: https://app.example.com
Target: https://api.example.com/data
Method: POST
Preflight: OPTIONS
Response header to check: Access-Control-Allow-Origin
```

2. XSS 검토: user input이 page output에 들어갈 때 validation/encoding 여부와 rendering context를 확인한다. OWASP는 XSS flaws가 user input을 generated output에 validation 또는 encoding 없이 포함하는 곳에서 발생한다고 설명한다. (근거: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)

```tsx
// 위험 검토 대상: userInput이 HTML로 해석되는 경로인지 확인한다.
<div>{userInput}</div>
```

3. CSRF 검토: authenticated mutation request에는 server-side token 검증이나 same-site cookie 정책 같은 방어를 확인해야 한다. OWASP CSRF cheat sheet는 signed token patterns, synchronizer token pattern 등 prevention guidance를 제공한다. (근거: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## FAQ
Q: CORS는 보안 기능인가, API 설정인가?
A: 둘 다의 경계에 있다. MDN은 CORS를 HTTP-header based mechanism으로 설명하며, browser가 same-origin policy 아래에서 cross-origin requests를 제한하고 server가 허용 origin을 표현한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)

Q: same-origin은 domain만 같으면 되는가?
A: 아니다. MDN은 protocol, port, host가 모두 같아야 same origin이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)

Q: XSS는 alert 창이 뜨는 장난인가?
A: 아니다. OWASP는 malicious script가 cookies, session tokens, sensitive information에 접근하거나 HTML page content를 rewrite할 수 있다고 설명한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)

Q: CSRF는 XSS와 같은가?
A: 아니다. XSS는 malicious script injection이고, CSRF는 authenticated browser가 trusted site에서 unwanted action을 하도록 속는 attack이다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06; https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: CORS error를 client JavaScript bug로만 본다. 왜 생기나: CORS가 browser-side error처럼 보이기 때문이다. 교정: origin, preflight, response headers를 함께 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS, 확인: 2026-07-06)
2. 실수: same-origin을 같은 domain 정도로만 이해한다. 왜 생기나: origin tuple의 protocol/host/port 구분을 놓치기 때문이다. 교정: MDN의 protocol, port, host 기준을 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy, 확인: 2026-07-06)
3. 실수: React나 framework를 쓰면 XSS가 자동으로 사라진다고 생각한다. 왜 생기나: output escaping과 untrusted HTML injection 위험을 구분하지 못하기 때문이다. 교정: user input이 어떤 rendering context로 들어가는지 추적한다. OWASP는 untrusted data가 generated output에 validation/encoding 없이 포함될 때 XSS가 가능하다고 설명한다. (출처: https://owasp.org/www-community/attacks/xss/, 확인: 2026-07-06)
4. 실수: 로그인된 요청이면 모두 안전하다고 생각한다. 왜 생기나: authentication과 request intent 검증을 혼동하기 때문이다. 교정: OWASP CSRF 설명처럼 authenticated browser가 forged request를 보낼 수 있음을 전제로 token 또는 request validation을 검토한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html, 확인: 2026-07-06)

## 공식 출처
- same-origin policy는 different origins 사이의 resource interaction을 제한하는 critical security mechanism이다 — [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) (확인: 2026-07-06)
- CORS는 server가 allowed origins를 HTTP headers로 표현하는 mechanism이다 — [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) (확인: 2026-07-06)
- CSP는 browser에 code restrictions를 지시해 security threat risk를 줄이는 feature다 — [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) (확인: 2026-07-06)
- XSS는 malicious scripts가 trusted websites에 injected되는 injection type이다 — [OWASP XSS](https://owasp.org/www-community/attacks/xss/) (확인: 2026-07-06)
- CSRF는 authenticated browser를 unwanted action으로 속이는 attack이다 — [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) (확인: 2026-07-06)

## Quote Bank
- > "The same-origin policy is a critical security mechanism"
  - 출처: [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) (확인: 2026-07-06)
  - 맥락: browser origin boundary를 설명할 때 사용한다.
- > "Two URLs have the same origin if the protocol, port (if specified), and host are the same for both."
  - 출처: [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) (확인: 2026-07-06)
  - 맥락: origin의 정확한 기준을 설명할 때 사용한다.
- > "Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism"
  - 출처: [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) (확인: 2026-07-06)
  - 맥락: CORS가 client option이 아니라 HTTP header 기반이라는 점을 설명할 때 사용한다.
- > "Content Security Policy (CSP) is a feature that helps to prevent or minimize the risk of certain types of security threats."
  - 출처: [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) (확인: 2026-07-06)
  - 맥락: CSP의 목적을 설명할 때 사용한다.
- > "Cross-Site Scripting (XSS) attacks are a type of injection"
  - 출처: [OWASP XSS](https://owasp.org/www-community/attacks/xss/) (확인: 2026-07-06)
  - 맥락: XSS를 injection 관점으로 설명할 때 사용한다.
- > "A Cross-Site Request Forgery (CSRF) attack occurs when a malicious web site, email, blog, instant message, or program tricks an authenticated user's web browser"
  - 출처: [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) (확인: 2026-07-06)
  - 맥락: CSRF의 주체와 공격 흐름을 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
