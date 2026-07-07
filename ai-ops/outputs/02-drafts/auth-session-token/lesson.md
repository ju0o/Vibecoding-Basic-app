## 한 줄 정의

인증(authentication)은 **"요청을 보낸 사람이 누구인지" 확인하는 절차**이고, 세션(session)과 토큰(token)은 그 확인 결과를 이후 요청에도 이어가는 방법입니다. MDN의 표현으로 ==HTTP는 접근 제어와 인증을 위한 일반 프레임워크를 제공==합니다.

이 프레임워크의 뼈대는 **challenge-response(요구-응답)**입니다: 서버가 401로 "인증하라"고 요구하면, 클라이언트가 자격 증명(credentials)을 담아 다시 요청합니다. 앞 강의(REST API)에서 본 401(미인증) 상태 코드가 실제로 무엇을 요구하는지가 이 강의의 출발점입니다.

> [!KEY]
> HTTP는 본래 **상태가 없습니다(stateless)** — 각 요청은 이전 요청을 기억하지 못합니다. 그래서 "한 번 로그인하면 계속 로그인 상태"를 만들려면 별도 장치가 필요하고, 그 답이 쿠키(세션)와 토큰입니다. 인증은 "누구인지 1회 확인", 세션·토큰은 "그 확인을 이어가기"입니다.

![인증 흐름: challenge-response(401→Authorization)와 쿠키 세션 왕복](/lesson-diagrams/auth-session-token/auth-session-flow.svg)

## 왜 존재하는가

로그인이라는 익숙한 기능 뒤에는 세 가지 문제가 있습니다.

첫째, **신원을 어떻게 확인하나.** 서버가 아무에게나 데이터를 주면 안 됩니다. HTTP는 이를 위해 challenge-response 절차를 정의합니다 — 서버가 401 + WWW-Authenticate로 "이 방법으로 인증하라"고 요구하고, 클라이언트가 Authorization 헤더에 자격 증명을 담아 응답합니다.

둘째, **확인을 어떻게 이어가나.** HTTP가 stateless라, 로그인에 성공해도 다음 요청에서는 다시 낯선 사람이 됩니다. 매 요청마다 비밀번호를 보낼 수는 없으니, 서버는 "이미 확인된 사람"을 알아볼 표식을 줍니다 — 그것이 쿠키(세션 식별자)나 토큰입니다.

셋째, **그 표식을 어떻게 지키나.** 세션 쿠키가 탈취되면 남이 내 계정이 됩니다. 그래서 쿠키에는 HttpOnly 같은 보안 속성이 필요합니다 — JavaScript가 쿠키를 못 읽게 막아 XSS 공격으로부터 세션을 보호합니다.

## 작동 원리

### challenge-response 3단계

MDN이 인증 흐름을 세 단계로 명시합니다:

1. 서버가 **401 (Unauthorized)** 응답 + **WWW-Authenticate** 헤더로 "이 방법으로 인증하라"고 요구
2. 클라이언트가 **Authorization** 헤더에 자격 증명을 담아 재요청
3. 보통 클라이언트는 사용자에게 비밀번호 입력을 받아 올바른 Authorization 헤더로 요청

두 헤더는 방향이 반대입니다 — WWW-Authenticate는 서버→클라이언트("이렇게 인증하라"), Authorization은 클라이언트→서버("이게 내 자격 증명이다"). 문법은 `Authorization: <type> <credentials>`이고, 토큰 방식에서는 `Authorization: Bearer <토큰>`이 됩니다.

### 쿠키의 왕복

세션 방식의 핵심은 쿠키입니다. 쿠키는 ==서버가 브라우저에 보내는 작은 데이터 조각==이고, 흐름은 단순합니다:

```
로그인 성공
  서버 ──Set-Cookie: session=abc123──▶ 브라우저 (저장)
이후 요청
  브라우저 ──Cookie: session=abc123──▶ 서버 (자동 첨부)
```

서버가 Set-Cookie로 세션 식별자를 심으면, 브라우저는 같은 도메인의 이후 요청마다 Cookie 헤더로 자동으로 되돌려보냅니다. 사용자는 매번 로그인하지 않아도 "이미 확인된 사람"으로 인식됩니다.

> [!EXAMPLE]
> 쇼핑몰에 로그인하면 서버가 `Set-Cookie: session=abc123; HttpOnly`를 내려보냅니다. 이후 장바구니에 담기, 주문하기 등 모든 요청에 브라우저가 자동으로 `Cookie: session=abc123`을 붙입니다. 서버는 이 식별자로 "아, 아까 로그인한 그 사람"을 알아봅니다 — 비밀번호는 로그인 때 한 번만 오갔습니다.

### 세션 쿠키 vs 영구 쿠키

쿠키의 수명은 속성으로 정합니다:

- **세션 쿠키** — Max-Age나 Expires가 없으면, 현재 세션(브라우저 종료 등)이 끝날 때 삭제됩니다.
- **영구 쿠키** — Expires나 Max-Age에 지정된 시점까지 유지됩니다.

"로그인 유지" 체크박스의 차이가 바로 이것입니다 — 체크하면 영구 쿠키(만료일까지 유지), 안 하면 세션 쿠키(브라우저 닫으면 로그아웃).

## 스펙과 세부

### 인증 헤더

| 헤더 | 방향 | 역할 |
|---|---|---|
| WWW-Authenticate | 서버→클라이언트 | 접근에 써야 할 인증 방법 정의 |
| Authorization | 클라이언트→서버 | 자격 증명 전달 (`<type> <credentials>`) |

### 세션(쿠키) vs 토큰

| 구분 | 세션(쿠키) | 토큰(Bearer) |
|---|---|---|
| 상태 위치 | 서버가 세션 상태 보관 | 토큰 자체에 정보 담김 |
| 전달 방식 | Cookie 헤더(자동) | Authorization 헤더(수동) |
| 대표 용도 | 웹 브라우저 로그인 | API·모바일 클라이언트 |
| 공통점 | 둘 다 stateless HTTP에 "이미 인증됨"을 얹음 | |

### 쿠키 보안 속성

| 속성 | 효과 |
|---|---|
| HttpOnly | JavaScript 접근 차단 — XSS로부터 세션 보호 |
| Max-Age / Expires | 쿠키 수명 지정 (없으면 세션 쿠키) |
| (Secure / SameSite) | HTTPS 전용·교차 사이트 전송 제한 (후속 보안 강의) |

### 상황별 빠른 참조

| 상황 | 처방 |
|---|---|
| 미인증 요청 거부 | 401 + WWW-Authenticate |
| 로그인 성공 후 상태 유지 | Set-Cookie(HttpOnly, 세션 식별자) |
| API 인증 | Authorization: Bearer <토큰> |
| 세션 탈취 방어 | 세션 쿠키에 HttpOnly 설정 |
| 로그인 유지 vs 세션 한정 | Max-Age 있음(영구) / 없음(세션) |

## 원문으로 읽기

> "HTTP provides a general framework for access control and authentication."
>
> — HTTP는 접근 제어와 인증을 위한 일반 프레임워크를 제공한다.
> [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

인증은 프레임워크나 라이브러리가 발명한 것이 아니라, ==HTTP 자체에 내장된 틀==입니다. 401 상태 코드와 WWW-Authenticate/Authorization 헤더가 이미 표준으로 정해져 있고, 우리가 쓰는 인증 라이브러리들은 이 틀 위에서 동작합니다. 그래서 인증을 이해한다는 것은 특정 라이브러리가 아니라 이 HTTP 틀을 이해하는 것입니다.

> "The WWW-Authenticate and Proxy-Authenticate response headers define the authentication method that should be used to gain access to a resource."
>
> — WWW-Authenticate와 Proxy-Authenticate 응답 헤더는 자원 접근에 써야 할 인증 방법을 정의한다.
> [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

서버가 "너는 인증이 필요하다"만 말하는 게 아니라 "이런 방법으로 인증하라"까지 알려준다는 점이 중요합니다. 401 응답에 이 헤더가 함께 오므로, 클라이언트는 어떤 방식(Basic, Bearer 등)으로 자격 증명을 준비할지 알 수 있습니다.

> "The Authorization and Proxy-Authorization request headers contain the credentials to authenticate a user agent with a (proxy) server."
>
> — Authorization과 Proxy-Authorization 요청 헤더는 (프록시) 서버에 user agent를 인증할 자격 증명을 담는다.
> [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

자격 증명이 담기는 곳이 Authorization 헤더입니다. API 토큰 인증에서 `Authorization: Bearer eyJ...`를 보내는 것이 정확히 이 문장의 실현입니다 — 토큰이 곧 "user agent를 인증할 credentials"입니다.

> "A cookie (also known as a web cookie or browser cookie) is a small piece of data a server sends to a user's web browser. The browser may store cookies, create new cookies, modify existing ones, and send them back to the same server with later requests."
>
> — 쿠키는 서버가 사용자의 웹 브라우저에 보내는 작은 데이터 조각이다. 브라우저는 쿠키를 저장·생성·수정하고, 이후 요청에 같은 서버로 되돌려보낼 수 있다.
> [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

"send them back to the same server with later requests" — 이 되돌려보냄이 세션의 핵심입니다. 서버가 준 표식을 브라우저가 이후 요청마다 자동으로 되돌려줌으로써, stateless HTTP 위에 "기억"이 생깁니다.

> "A cookie with the HttpOnly attribute can't be accessed by JavaScript, for example using Document.cookie; it can only be accessed when it reaches the server."
>
> — HttpOnly 속성이 있는 쿠키는 JavaScript(예: Document.cookie)로 접근할 수 없고, 서버에 도달할 때만 접근된다.
> [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

이 한 속성이 세션 보안의 핵심입니다. XSS 공격으로 악성 스크립트가 페이지에 주입돼도, HttpOnly 쿠키는 `document.cookie`로 읽히지 않아 세션이 탈취되지 않습니다. ==세션을 지속하는 쿠키에는 HttpOnly가 사실상 필수==인 이유입니다.

## 실전에서

### AI가 만든 로그인의 보안 속성 검토

AI에게 "로그인 기능 만들어줘"라고 하면 세션/토큰 방식과 쿠키 속성을 AI가 대신 고릅니다. 가장 위험한 것은 보안 속성 누락입니다 — 세션 쿠키에 HttpOnly가 빠지면 XSS 한 번에 세션이 통째로 탈취됩니다. "이 세션 쿠키에 HttpOnly가 설정됐는가"는 AI 결과에서 사람이 반드시 확인해야 할 지점입니다. 동작하는 코드와 안전한 코드는 다르며, HttpOnly가 없어도 로그인은 멀쩡히 동작하기 때문에 테스트만으로는 이 결함이 드러나지 않습니다.

### 401과 403을 구분해 응답하기

"로그인 안 됨"과 "권한 없음"은 다른 상태입니다. 인증 자체가 없으면 **401**(+ WWW-Authenticate)로 "인증하라"고 요구하고, 인증은 됐으나 접근 권한이 없으면 **403**입니다. 이 둘을 섞으면 클라이언트가 "로그인 화면으로 보낼지, 권한 오류를 띄울지" 판단하지 못합니다.

### 토큰을 코드에 남기지 않기

토큰은 자격 증명입니다. AI가 편의를 위해 토큰을 코드에 하드코딩하거나 로그에 출력하면, 그 순간 secret이 유출 경로에 놓입니다. 자격 증명 관리는 다음 강의(환경변수·secret)의 주제이며, 여기서는 "토큰은 절대 코드·로그에 남기지 않는다"만 기억하면 됩니다.

### 무엇을 세션에 담을 것인가

세션·토큰에 담는 정보의 양도 판단입니다. 세션 식별자만 담고 실제 사용자 정보는 서버가 조회하면, 세션이 새어도 노출되는 것은 식별자뿐입니다. 반대로 토큰에 사용자 정보를 많이 담으면 서버 조회 없이 빠르지만, 토큰이 탈취될 때 노출 범위가 커지고 정보가 바뀌어도 이미 발급된 토큰은 옛 정보를 담고 있습니다. "편의(정보를 많이 담기)와 안전·최신성(적게 담기)" 사이의 선택이며, 민감한 정보(비밀번호·결제 정보)는 어느 쪽에도 담지 않는 것이 원칙입니다.

> [!TIP]
> 세션과 토큰 중 무엇을 쓸지 헷갈리면, ==클라이언트가 브라우저인가 아닌가==를 먼저 물으세요. 브라우저는 쿠키를 자동으로 다뤄 주므로 세션 쿠키가 자연스럽고, 모바일 앱·서버 간 통신·외부 API는 Authorization 헤더에 토큰을 담는 방식이 맞습니다.

## 한계와 트레이드오프

**세션은 서버에 상태를 둡니다.** 서버가 세션 정보를 보관하므로, 서버가 여러 대면 "누가 어느 세션을 아는가"를 공유해야 합니다(세션 저장소). 토큰은 정보를 토큰 자체에 담아 서버가 상태를 안 가져도 되지만, 대신 한번 발급한 토큰을 만료 전에 취소하기가 어렵습니다 — 상태를 어디에 둘 것인가의 트레이드오프입니다.

**쿠키의 편의는 공격 표면이기도 합니다.** 브라우저가 쿠키를 자동으로 첨부해 주는 편의가, 공격자가 사용자를 속여 요청을 보내게 하는 CSRF 공격의 토대가 됩니다. HttpOnly는 XSS를 막지만 CSRF는 또 다른 방어(SameSite 등)가 필요합니다 — 하나의 속성이 모든 공격을 막지는 않습니다.

**이 강의는 인증의 입구입니다.** 비밀번호 해싱, OAuth·소셜 로그인, JWT의 서명·검증, 토큰 갱신(refresh) 같은 주제는 여기서 다루지 않았습니다. 하지만 "인증은 1회 확인, 세션·토큰은 이어가기, 그 표식을 보안 속성으로 지킨다"는 뼈대를 잡으면, 그 위의 주제들도 같은 틀로 읽힙니다. 예를 들어 JWT는 "토큰에 정보를 담되 서명으로 위조를 막는" 방식이고, OAuth는 "인증을 다른 서비스에 위임하는" 방식이지만, 둘 다 이 강의의 Authorization 헤더와 세션 유지라는 토대 위에서 동작합니다.

> [!WARNING]
> 세션 쿠키나 토큰을 URL에 담는 것은 위험한 안티패턴입니다. URL은 브라우저 이력·서버 로그·리퍼러 헤더에 남아, 자격 증명이 곳곳에 복제됩니다. 세션은 Cookie 헤더로, 토큰은 Authorization 헤더로 — 자격 증명은 URL이 아니라 헤더에 담아야 합니다.

## 더 읽기

- [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) — 인증 프레임워크, challenge-response, WWW-Authenticate/Authorization
- [MDN Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) — 쿠키의 왕복, 세션/영구 쿠키, HttpOnly

이전 순서: [REST API 설계](/lessons/rest-api-design) — 401이 요구하는 인증이 여기서 구현됩니다. 다음 순서: [환경변수와 secret 관리](/lessons/environment-variables-secrets) — 토큰·세션 비밀키를 코드가 아닌 환경변수로 안전하게 관리하는 방법.
