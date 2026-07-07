---
id: auth-session-token
title: "인증, 세션, 토큰 — 로그인은 어떻게 유지되는가"
topicGroup: T05
status: approved
score: 89
level: 중급
prerequisites: [rest-api-design, http-request-response]
successors: [environment-variables-secrets]
related: [web-security-basics]
sources:
  - { title: "HTTP authentication — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication", checked: 2026-07-07 }
  - { title: "Using HTTP cookies — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies", checked: 2026-07-07 }
consumers:
  lessons: [auth-session-token]
  glossary: [Authentication, Session, Session Cookie]
updated: 2026-07-07
---

## 정의
인증(authentication)은 "요청을 보낸 사람이 누구인지" 확인하는 절차이고, 세션(session)·토큰(token)은 그 확인 결과를 이후 요청에도 이어가는 방법이다. MDN은 "HTTP provides a general framework for access control and authentication"(HTTP는 접근 제어와 인증을 위한 일반 프레임워크를 제공한다)라고 설명한다. 이 프레임워크의 뼈대는 challenge-response(요구-응답)다: 서버가 401로 "인증하라"고 요구하면, 클라이언트가 자격 증명(credentials)을 담아 다시 요청한다. (출처: MDN HTTP authentication, 확인: 2026-07-07)

## 역사
HTTP는 본래 상태가 없는(stateless) 프로토콜이다 — 각 요청은 이전 요청을 기억하지 못한다. 그래서 "한 번 로그인하면 계속 로그인 상태"를 만들려면 별도 장치가 필요했고, 그 답이 쿠키(cookie)와 토큰이다. rest-api-design 강의에서 본 401(미인증) 상태 코드가 요구하는 "인증"이 실제로 어떻게 구현되는지가 이 강의의 주제다. (근거: MDN Authentication challenge-response + rest-api-design KB, 확인: 2026-07-07)

## 해결하려는 문제
- 신원 확인: 서버가 401 + WWW-Authenticate로 "인증하라"고 요구하고, 클라이언트가 Authorization 헤더로 자격 증명을 보낸다. (출처: MDN Authentication, 확인: 2026-07-07)
- 상태 없는 HTTP에서 로그인 유지: 쿠키가 "user sign-in status"를 서버가 기억하도록 세션 관리를 담당한다. (출처: MDN Cookies, 확인: 2026-07-07)
- 자격 증명 탈취 방어: HttpOnly 쿠키가 JavaScript 접근을 막아 XSS로부터 세션을 보호한다. (출처: MDN Cookies, 확인: 2026-07-07)

## 핵심 개념
1. **challenge-response 흐름**: 서버가 401 (Unauthorized) + WWW-Authenticate로 "이 방법으로 인증하라"고 요구 → 클라이언트가 Authorization 헤더에 credentials를 담아 재요청. MDN이 3단계로 명시한다. (출처: MDN Authentication, 확인: 2026-07-07)
2. **WWW-Authenticate ↔ Authorization**: WWW-Authenticate는 "자원 접근에 써야 할 인증 방법"을 정의하고(서버→클라이언트), Authorization은 "user agent를 인증할 credentials"를 담는다(클라이언트→서버). 문법은 `Authorization: <type> <credentials>` (예: Bearer 토큰). (출처: MDN Authentication, 확인: 2026-07-07)
3. **쿠키의 왕복**: 쿠키는 "a small piece of data a server sends to a user's web browser". 서버가 Set-Cookie로 심고, 브라우저가 이후 요청에 Cookie 헤더로 되돌려보낸다. (출처: MDN Cookies, 확인: 2026-07-07)
4. **세션 관리 용도**: 쿠키의 주 용도 중 하나가 세션 관리 — 로그인 상태, 장바구니 등 "서버가 기억해야 할 사용자 세션 정보". (출처: MDN Cookies, 확인: 2026-07-07)
5. **세션 쿠키 vs 영구 쿠키**: Max-Age/Expires가 없는 세션 쿠키는 세션 종료 시 삭제되고, 영구 쿠키는 지정된 만료 시점에 삭제된다. (출처: MDN Cookies, 확인: 2026-07-07)
6. **HttpOnly로 세션 보호**: HttpOnly 쿠키는 JavaScript(document.cookie)로 접근 불가, 서버에 도달할 때만 읽힌다 — 세션을 지속하는 쿠키는 반드시 HttpOnly로 XSS를 완화해야 한다. (출처: MDN Cookies, 확인: 2026-07-07)

## 관련 기술
- 401 ↔ rest-api-design: rest 강의의 401(unauthenticated)이 이 강의의 challenge-response 출발점이다. (출처: MDN Authentication + rest-api-design KB, 확인: 2026-07-07)
- 쿠키 세션 vs 토큰: 세션은 서버가 상태를 쥐고 쿠키로 식별자만 주고받는 방식, 토큰(Bearer)은 자격 증명 자체를 Authorization 헤더로 매 요청 전달하는 방식 — 둘 다 stateless HTTP에 상태를 얹는 두 접근. (출처: MDN Authentication·Cookies, 확인: 2026-07-07)
- HttpOnly ↔ web-security-basics: HttpOnly는 XSS 완화 장치로 웹 보안 기초와 직결된다. (출처: MDN Cookies + web-security-basics KB, 확인: 2026-07-07)

## 선행 개념
- rest-api-design: 401 상태 코드와 헤더 기반 요청·응답.
- http-request-response: 헤더의 구조와 요청/응답 왕복.

## 후행 개념
- environment-variables-secrets: 토큰·세션 비밀키를 코드가 아닌 환경변수로 관리하는 방법.
- web-security-basics: XSS·CSRF 등 세션을 노리는 공격과 방어.

## AI 시대에서의 의미
AI에게 "로그인 기능 만들어줘"라고 하면 세션/토큰 방식과 쿠키 속성을 AI가 대신 고른다 — 그때 가장 위험한 것이 보안 속성 누락이다. 세션 쿠키에 HttpOnly가 빠지면 XSS 한 번에 세션이 탈취되므로, "이 쿠키에 HttpOnly가 설정됐는가"는 사람이 반드시 확인해야 할 지점이다. 또 AI가 토큰을 코드에 하드코딩하거나 로그에 남기지 않는지도 검토해야 한다 — 자격 증명 관리는 다음 강의(환경변수·secret)로 이어진다. (근거: MDN Cookies HttpOnly·Authentication, 확인: 2026-07-07)

## 실무 활용
1. 로그인 흐름: 자격 증명 검증 성공 시 서버가 Set-Cookie(HttpOnly, 세션 식별자)를 내려보내고, 이후 요청은 Cookie 헤더로 자동 인증. (출처: MDN Cookies, 확인: 2026-07-07)
2. 토큰 인증: API가 Authorization: Bearer <토큰>을 요구하고, 401 + WWW-Authenticate로 미인증을 알린다. (출처: MDN Authentication, 확인: 2026-07-07)
3. 세션 만료 설계: 로그인 유지 기간을 Max-Age/Expires로 정하고, 민감 세션은 짧게. (출처: MDN Cookies, 확인: 2026-07-07)
4. 세션 쿠키 보호: 세션 지속 쿠키에 HttpOnly 설정으로 JS 접근 차단. (출처: MDN Cookies, 확인: 2026-07-07)

## FAQ
Q: 인증과 세션은 어떻게 다른가?
A: 인증은 "누구인지 확인"하는 1회 절차이고, 세션은 그 확인 결과를 이후 요청에 이어가는 지속 상태다. HTTP가 stateless라 인증만으로는 다음 요청에서 다시 남이 되므로 세션·토큰이 필요하다. (출처: MDN Authentication·Cookies, 확인: 2026-07-07)
Q: 쿠키는 어떻게 왕복하나?
A: 서버가 Set-Cookie로 심으면 브라우저가 저장하고, 같은 도메인의 이후 요청에 Cookie 헤더로 되돌려보낸다. (출처: MDN Cookies, 확인: 2026-07-07)
Q: 세션 쿠키와 영구 쿠키의 차이는?
A: 세션 쿠키는 Max-Age/Expires가 없어 세션이 끝나면 삭제되고, 영구 쿠키는 지정된 만료 시점까지 유지된다. (출처: MDN Cookies, 확인: 2026-07-07)
Q: HttpOnly는 왜 중요한가?
A: JavaScript가 쿠키를 못 읽게 해 XSS로 인한 세션 탈취를 완화한다. 세션 쿠키에는 필수에 가깝다. (출처: MDN Cookies, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: 세션 쿠키에 HttpOnly 미설정. 왜 생기나: 보안 속성을 몰라서. 교정: 세션 지속 쿠키는 HttpOnly 필수 — XSS 완화. (출처: MDN Cookies, 확인: 2026-07-07)
2. 실수: 토큰을 코드/저장소에 하드코딩. 왜 생기나: 임시로 넣고 방치. 교정: 환경변수·secret으로 분리(다음 강의). (근거: MDN Authentication credentials 취급, 확인: 2026-07-07)
3. 실수: 401과 403 혼동해 응답. 왜 생기나: 미인증(401)과 권한 없음(403) 구분 안 함. 교정: 인증 자체가 없으면 401 + WWW-Authenticate. (출처: MDN Authentication, 확인: 2026-07-07)
4. 실수: 세션 만료를 무한으로. 왜 생기나: Max-Age/Expires 설계 안 함. 교정: 민감 세션은 만료를 짧게 설정. (출처: MDN Cookies, 확인: 2026-07-07)

## 공식 출처
- 인증 프레임워크·challenge-response·WWW-Authenticate/Authorization — [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) (확인: 2026-07-07)
- 쿠키 정의·Set-Cookie/Cookie·세션 관리·세션/영구 쿠키·HttpOnly — [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) (확인: 2026-07-07)

## Quote Bank
- > "HTTP provides a general framework for access control and authentication."
  - 출처: [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) (확인: 2026-07-07)
  - 맥락: 인증의 출발점 — HTTP 자체가 인증 프레임워크를 제공
- > "The WWW-Authenticate and Proxy-Authenticate response headers define the authentication method that should be used to gain access to a resource."
  - 출처: [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) (확인: 2026-07-07)
  - 맥락: 서버가 "어떤 방법으로 인증하라"를 알리는 헤더
- > "The Authorization and Proxy-Authorization request headers contain the credentials to authenticate a user agent with a (proxy) server."
  - 출처: [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) (확인: 2026-07-07)
  - 맥락: 클라이언트가 자격 증명을 담는 헤더 (Bearer 토큰 등)
- > "A cookie (also known as a web cookie or browser cookie) is a small piece of data a server sends to a user's web browser. The browser may store cookies, create new cookies, modify existing ones, and send them back to the same server with later requests."
  - 출처: [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) (확인: 2026-07-07)
  - 맥락: 쿠키의 정의와 왕복 동작
- > "A cookie with the HttpOnly attribute can't be accessed by JavaScript, for example using Document.cookie; it can only be accessed when it reaches the server."
  - 출처: [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) (확인: 2026-07-07)
  - 맥락: HttpOnly — 세션 쿠키의 XSS 방어
- > "Session cookies — cookies without a Max-Age or Expires attribute – are deleted when the current session ends."
  - 출처: [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) (확인: 2026-07-07)
  - 맥락: 세션 쿠키의 수명 — 영구 쿠키와의 대비

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
