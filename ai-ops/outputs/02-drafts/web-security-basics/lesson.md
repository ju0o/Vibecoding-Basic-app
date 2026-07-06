## 한 줄 정의

웹 보안 기초는 browser와 server가 서로를 신뢰할 수 없는 환경에서 origin, request, response, user input, authenticated browser의 경계를 나누는 방법입니다. 이 강의는 웹 보안 전체를 한 번에 끝내려는 강의가 아닙니다. 대신 HTTP request/response 위에서 가장 먼저 만나는 same-origin policy, CORS, XSS, CSRF, CSP를 구분합니다.

초보자가 웹 보안을 어려워하는 이유는 용어들이 모두 "공격"이나 "설정"처럼 보이기 때문입니다. CORS는 client fetch option 하나로 고치는 문제가 아니고, XSS는 alert 창 장난이 아니며, CSRF는 단순히 로그인 여부 문제가 아닙니다. 각각은 다른 경계에서 생기는 문제입니다. ==웹 보안의 첫 단계는 "어느 경계가 깨졌는가"를 분리하는 것입니다.==

이 강의의 기준은 browser입니다. browser는 여러 site의 content를 같은 기기와 같은 runtime 주변에서 다루지만, 한 origin의 script가 다른 origin의 민감한 data를 마음대로 읽지 못하게 제한해야 합니다. 그 제한이 same-origin policy이고, 제한을 controlled하게 풀어 주는 mechanism 중 하나가 CORS입니다. user input이 output으로 섞여 script가 실행되는 문제는 XSS이고, authenticated browser가 사용자의 의도와 다른 request를 보내게 되는 문제는 CSRF입니다. CSP는 browser에게 site code가 할 수 있는 일을 제한하라고 지시하는 방어 계층입니다.

![Web security boundary map](/lesson-diagrams/web-security-basics/web-security-boundary-map.svg)

## 왜 존재하는가

웹은 본질적으로 여러 출처의 문서, script, image, API response를 한 화면과 한 browser 안에서 다룹니다. 사용자는 한 tab에서 회사 intranet에 로그인해 있고, 다른 tab에서 알 수 없는 사이트를 열 수도 있습니다. 이 상황에서 malicious site가 로그인된 third-party webmail이나 intranet data를 읽고 attacker에게 relay할 수 있다면 browser는 안전한 실행 환경이 될 수 없습니다.

same-origin policy는 이 문제를 줄이기 위한 기본 방어선입니다. MDN은 same-origin policy가 one origin에서 load된 document나 script가 another origin의 resource와 interact하는 방식을 제한하는 critical security mechanism이라고 설명합니다. 이 정책은 malicious documents를 isolate하고 possible attack vectors를 줄입니다. 핵심은 browser가 "같은 출처인가"를 기준으로 cross-origin read 같은 위험한 interaction을 제한한다는 점입니다.

하지만 현실의 web app은 다른 origin의 API를 호출해야 할 때가 있습니다. `https://app.example.com`에서 `https://api.example.com`으로 요청하거나, local development server에서 remote API를 호출하는 일은 흔합니다. CORS는 이런 경우 server가 HTTP headers로 어떤 origins가 information을 read할 수 있는지 표현하게 해 줍니다. 즉 CORS는 same-origin policy를 없애는 것이 아니라, server가 허용 범위를 browser에게 말하는 mechanism입니다.

XSS와 CSRF는 다른 축의 문제입니다. XSS는 untrusted input이 page output에 validation 또는 encoding 없이 포함되어 malicious script가 trusted website에서 실행될 수 있는 문제입니다. CSRF는 authenticated user의 browser가 trusted site에 unwanted action을 보내도록 속는 문제입니다. 둘 다 "사용자가 로그인했다"는 환경과 만날 수 있지만 공격 방식과 방어 evidence가 다릅니다.

CSP는 browser에게 "이 site의 code는 어디서 script를 load할 수 있고 무엇을 실행할 수 있는가" 같은 restrictions를 전달하는 방어 계층입니다. XSS를 완전히 대신하지는 않지만, browser가 certain security threats risk를 prevent 또는 minimize하도록 돕습니다.

> [!KEY]
> CORS, XSS, CSRF, CSP는 같은 보안 단어 묶음이 아니라 서로 다른 실패 지점을 다루는 도구와 위험입니다.

## 작동 원리

### 1. Origin은 protocol, host, port의 tuple입니다

MDN은 두 URL이 protocol, port, host가 같으면 same origin이라고 설명합니다. 여기서 domain만 보는 것이 아닙니다. `http://example.com`과 `https://example.com`은 scheme이 다르고, `https://example.com:443`과 다른 port의 URL은 같은 origin이 아닐 수 있습니다. 초보자가 "같은 사이트 아닌가요?"라고 느끼는 경우에도 browser의 origin 계산은 더 엄격합니다.

이 기준은 CORS error를 읽을 때 첫 단추입니다. request를 보낸 page의 origin, target API의 origin, response headers가 모두 필요합니다. path가 비슷하거나 회사가 같다는 식의 조직적 관계는 browser security boundary에서 같은 origin을 의미하지 않습니다.

### 2. Same-origin policy는 cross-origin interaction을 제한합니다

same-origin policy는 browser가 다른 origin 사이의 interaction을 control하는 기본 규칙입니다. MDN은 cross-origin reads가 typically disallowed라고 설명합니다. 예를 들어 malicious page가 사용자가 로그인한 webmail의 data를 그냥 읽을 수 있다면 심각한 privacy 문제가 생깁니다. policy는 이런 cross-origin read를 제한해 browser 안의 문서들을 격리합니다.

하지만 모든 cross-origin 동작이 같은 방식으로 막히는 것은 아닙니다. image embedding, form submission, script loading, fetch request는 서로 다른 규칙과 위험을 가질 수 있습니다. 이 강의에서는 세부 matrix를 다 외우기보다 "읽기 권한과 data exposure가 핵심 위험"이라는 방향을 잡습니다. Network tab에서 어떤 request가 갔는지와 JavaScript가 response를 읽을 수 있는지는 구분해야 합니다.

### 3. CORS는 server가 허용 범위를 HTTP header로 표현합니다

CORS는 HTTP-header based mechanism입니다. browser는 cross-origin request 상황에서 server response의 CORS headers를 확인해 calling script가 response를 읽을 수 있는지 판단합니다. server가 allowed origin을 적절히 표현하지 않으면 browser는 JavaScript에게 response access를 허용하지 않을 수 있습니다.

이때 CORS는 client code가 마음대로 "켜는" 기능이 아닙니다. client가 `mode: "no-cors"`를 넣어 문제를 숨기려는 접근은 response를 제대로 읽지 못하게 만들 수 있으며, 원인 해결이 아닙니다. CORS evidence는 request origin, target URL, method, request headers, preflight 여부, response CORS headers를 포함해야 합니다.

### 4. Preflight는 actual request를 보내기 전 허용 여부를 묻습니다

MDN은 browser가 cross-origin resource server에 preflight request를 보내 actual request를 permit할지 확인할 수 있고, preflight에는 actual request의 method와 headers가 담긴다고 설명합니다. 실무에서는 `OPTIONS` request가 먼저 보이고, 그 다음 실제 `POST`나 `PUT` request가 이어질 수 있습니다.

Preflight가 실패하면 actual request가 아예 서버에 도달하지 않았다고 느낄 수 있습니다. 또는 server log에서는 `OPTIONS`만 보이고 본 요청이 없는 것처럼 보일 수 있습니다. AI에게 CORS 문제를 맡길 때는 console error만 주지 말고 preflight request/response headers를 함께 제공해야 합니다.

### 5. XSS는 untrusted data가 executable context로 들어가는 문제입니다

OWASP는 XSS가 malicious scripts를 otherwise benign and trusted websites에 inject하는 injection type이라고 설명합니다. 또한 user input을 generated output에 validation 또는 encoding 없이 포함할 때 발생할 수 있다고 설명합니다. 핵심은 "문자열이 화면에 보인다"가 아니라, untrusted data가 browser에서 script처럼 실행될 수 있는 context로 들어가는가입니다.

framework가 일부 escaping을 해 준다고 해서 XSS가 자동으로 사라지는 것은 아닙니다. user input이 HTML로 해석되는 경로, dangerously-set HTML 같은 escape hatch, URL이나 attribute context, third-party content embedding처럼 경계가 바뀌는 지점을 추적해야 합니다. 이 KB는 React 세부 보안 규칙을 다루지 않지만, "rendering context를 추적한다"는 원칙을 남깁니다.

### 6. CSRF는 authenticated browser의 의도 검증 문제입니다

OWASP는 CSRF가 malicious website, email, blog, instant message, program이 authenticated user's web browser를 trusted site에서 unwanted action으로 속이는 attack이라고 설명합니다. target user가 authenticated 상태이면 unprotected sites는 legitimate authorized requests와 forged authenticated requests를 구분할 수 없을 수 있습니다.

여기서 문제는 "누가 로그인했는가"만이 아닙니다. browser가 authentication cookie를 자동으로 붙여 request를 보낼 수 있고, server가 그 request가 사용자의 의도에서 온 것인지 검증하지 못하면 위험이 생깁니다. 그래서 CSRF를 볼 때는 cookie/session 사용 여부, mutation request, server-side token 검증이나 same-site cookie 정책 같은 방어를 확인합니다.

### 7. CSP는 browser에 제한 규칙을 지시합니다

CSP는 Content Security Policy입니다. MDN은 CSP가 certain types of security threats risk를 prevent 또는 minimize하는 feature이며, website가 browser에게 restrictions를 instruct하는 series of instructions라고 설명합니다. CSP는 response header로 전달되어 browser가 script, style, image, connection 같은 동작을 제한하게 할 수 있습니다.

CSP는 XSS를 없애는 마법이 아닙니다. input validation과 output encoding, safe rendering path가 기본이고, CSP는 피해를 줄이는 방어층이 될 수 있습니다. 하지만 CSP violation report나 blocked resource는 debugging evidence가 됩니다. AI에게 CSP 문제를 맡길 때는 response header와 browser console의 CSP error를 함께 줘야 합니다.

> [!WARNING]
> CORS error, XSS 위험, CSRF 위험, CSP violation은 모두 browser console에 나타날 수 있지만 원인과 수정 위치가 다릅니다.

## 스펙과 세부

### CORS는 response header 기준으로 판단됩니다

CORS를 이해할 때 가장 흔한 실수는 client request option만 보는 것입니다. browser가 cross-origin response를 script에 노출할지 판단하려면 server response headers가 중요합니다. `Access-Control-Allow-Origin` 같은 header가 어떤 origin을 허용하는지, credentials와 함께 쓸 때 어떤 제약이 있는지는 후속 실무에서 더 세밀히 봐야 합니다. 이 강의에서는 "server가 allowed origins를 describe한다"는 구조를 먼저 잡습니다.

### Same-origin은 path가 아니라 origin 단위입니다

`https://example.com/a`와 `https://example.com/b`는 path가 달라도 same origin입니다. 반대로 host나 scheme, port가 다르면 path가 비슷해도 cross-origin이 됩니다. 이 기준을 모르면 local development에서 `localhost:3000`과 `localhost:4000`을 같은 곳으로 착각할 수 있습니다. port가 다르면 origin이 달라질 수 있습니다.

### XSS는 output context가 핵심입니다

XSS 방어는 "입력값에 `<script>`가 있는가"만으로 끝나지 않습니다. 같은 string도 HTML text context, attribute context, URL context, script context에 따라 위험이 달라질 수 있습니다. KB는 OWASP의 큰 정의에 머물지만, 실무 판단은 untrusted data가 generated output으로 들어가는 경로를 추적하는 쪽으로 해야 합니다.

### CSRF는 state-changing request에서 특히 중요합니다

CSRF는 조회보다 mutation에서 더 위험하게 드러납니다. user profile 변경, password 변경, 결제, 삭제 같은 request는 authenticated browser가 보낸다고 해서 사용자가 의도했다고 볼 수 없습니다. server가 request intent를 검증하는 장치를 가져야 합니다. OWASP Cheat Sheet는 signed token pattern, synchronizer token pattern 같은 prevention guidance를 제공합니다.

### CSP는 보안 정책이자 debugging signal입니다

CSP가 강하게 설정되면 일부 script나 resource가 차단될 수 있습니다. 이것은 보안상 의도된 동작일 수 있고, 설정 실수일 수도 있습니다. response header와 blocked URI, directive를 함께 봐야 합니다. CSP를 낮추는 것이 항상 해결이 아니며, 어떤 code path가 정책을 위반했는지 확인해야 합니다.

## 원문으로 읽기

> "The same-origin policy is a critical security mechanism"
>
> — same-origin policy는 중요한 보안 mechanism이다.
> [Same-origin policy — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) (CC-BY-SA)

이 문장은 browser security의 기본값이 "열려 있음"이 아니라 "격리"라는 점을 보여 줍니다. same-origin policy를 이해해야 CORS도 이해할 수 있습니다. CORS는 이 기본 방어선을 없애는 기능이 아니라, server가 허용 범위를 표현하는 mechanism입니다.

> "Two URLs have the same origin if the protocol, port (if specified), and host are the same for both."
>
> — 두 URL은 protocol, port(명시된 경우), host가 모두 같을 때 같은 origin을 가진다.
> [Same-origin policy — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy) (CC-BY-SA)

origin 판단은 느낌이나 회사 도메인 소유 관계가 아니라 tuple 기준입니다. local 개발에서 port가 달라 CORS가 발생하는 이유도 이 문장으로 설명할 수 있습니다. API debugging에서는 page origin과 target origin을 정확히 적어야 합니다.

> "Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism"
>
> — Cross-Origin Resource Sharing(CORS)은 HTTP header 기반 mechanism이다.
> [Cross-Origin Resource Sharing — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) (CC-BY-SA)

이 인용은 CORS를 JavaScript option 문제가 아니라 HTTP response header와 browser policy의 결합으로 보게 해 줍니다. client code만 만져서 해결하려는 습관을 교정하는 근거입니다.

> "Cross-Site Scripting (XSS) attacks are a type of injection"
>
> — Cross-Site Scripting(XSS) 공격은 injection의 한 유형이다.
> [Cross Site Scripting — OWASP](https://owasp.org/www-community/attacks/xss/)

XSS를 단순 UI 버그가 아니라 injection 문제로 보면, input과 output 사이의 경로를 추적하게 됩니다. 어떤 untrusted data가 어디서 들어와 어떤 rendering context로 나가는지가 핵심입니다.

## 실전에서

### 1. CORS evidence packet을 만듭니다

```txt
Page origin: https://app.example.com
Target URL: https://api.example.com/progress
Method: POST
Request headers: Content-Type: application/json
Preflight: OPTIONS /progress
Response headers to inspect:
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
Console error: ...
```

이 packet은 AI에게도 좋고 사람 debugging에도 좋습니다. browser console error만 있으면 server setting인지, method/header preflight인지, credentials 문제인지 구분하기 어렵습니다. CORS는 HTTP header based mechanism이므로 response headers가 중심 evidence입니다.

### 2. XSS는 rendering path로 검토합니다

```tsx
type Comment = {
  author: string;
  body: string;
};

export function CommentView({ comment }: { comment: Comment }) {
  return (
    <article>
      <h2>{comment.author}</h2>
      <p>{comment.body}</p>
    </article>
  );
}
```

이 예시 자체가 특정 framework 보안 보장을 설명하려는 것은 아닙니다. 핵심은 `comment.body`가 untrusted input일 수 있고, 그것이 어떤 output context로 들어가는지 추적해야 한다는 점입니다. AI가 "HTML로 줄바꿈을 살려 주세요" 같은 요구를 받으면 위험한 HTML injection path를 만들 수 있으므로, rendering context를 evidence로 검토해야 합니다.

### 3. CSRF는 authenticated mutation request로 봅니다

```txt
Request to inspect:
- method: POST
- path: /api/account/email
- auth: cookie-based session
- state change: yes
- anti-CSRF token or same-site policy: 확인 필요
```

CSRF는 사용자가 로그인했기 때문에 오히려 위험해질 수 있습니다. authenticated browser가 request를 보냈다는 사실만으로 사용자의 의도를 증명하지 못합니다. mutation endpoint에서 request validation을 어떻게 하는지 확인해야 합니다.

### 4. CSP는 막힌 resource를 그대로 낮추지 말고 원인을 봅니다

CSP error가 보이면 먼저 response의 Content-Security-Policy header와 console message를 함께 봅니다. 어떤 directive가 어떤 resource를 막았는지 확인합니다. AI에게 "CSP 때문에 안 됩니다. policy를 풀어 주세요"라고만 요청하면 보안 레벨을 낮추는 답을 받을 수 있습니다. 대신 "이 directive가 이 script source를 막았고, intended source인지 확인해 달라"고 요청해야 합니다.

> [!EXAMPLE]
> 좋은 질문: "이 CSP violation은 필요한 script가 정책에 누락된 것인가, 아니면 의도치 않은 inline script 실행을 막은 것인가?"

## 한계와 트레이드오프

첫째, 이 강의는 웹 보안의 전체 목록이 아닙니다. 인증, 권한, token, rate limit, dependency 보안, backend validation, database injection 같은 주제는 별도 강의가 필요합니다. 여기서는 browser security boundary와 request/response 기반 evidence에 집중합니다.

둘째, CORS를 완화한다고 보안이 자동으로 좋아지거나 나빠지는 단순 문제가 아닙니다. CORS는 server가 어떤 origins를 허용할지 browser에게 표현하는 mechanism입니다. 너무 좁으면 정상 app이 API를 읽지 못하고, 너무 넓으면 의도하지 않은 origin에 response를 노출할 수 있습니다. 따라서 origin, credentials, method/header를 함께 판단해야 합니다.

셋째, XSS 방어는 한 가지 도구로 끝나지 않습니다. input validation, output encoding, safe rendering, CSP 같은 계층이 함께 필요할 수 있습니다. framework를 사용한다는 사실만으로 untrusted data path가 안전하다고 단정하지 않습니다.

넷째, CSRF는 XSS와 다릅니다. XSS는 malicious script injection이고, CSRF는 authenticated browser가 unwanted action을 하도록 속는 attack입니다. 둘을 섞으면 방어도 잘못 고릅니다. 예를 들어 XSS에는 output context 검토가 중요하고, CSRF에는 request intent와 token validation이 중요합니다.

마지막으로, 보안은 AI에게 맡기더라도 evidence 없이 맡기면 위험합니다. AI는 CORS error를 client option으로만 보거나, CSP를 꺼서 문제를 해결하려 할 수 있습니다. ==보안 debugging에서 AI의 첫 입력은 에러 메시지가 아니라 request, response, origin, rendering path입니다.==

## 더 읽기

먼저 MDN의 [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)를 읽습니다. origin tuple과 cross-origin interaction 제한을 이해하면 browser security의 기본값이 보입니다.

다음으로 MDN의 [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)를 읽습니다. CORS가 HTTP-header based mechanism이라는 점, preflight request가 어떤 evidence를 담는지 확인합니다.

그다음 OWASP의 [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)를 읽습니다. XSS를 injection 관점으로 보고, untrusted input이 generated output에 들어가는 경로를 추적하는 습관을 잡습니다.

CSRF는 OWASP [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)를 기준점으로 둡니다. 처음에는 token pattern 세부를 모두 외우기보다 authenticated browser와 forged request의 관계를 이해합니다.

마지막으로 MDN의 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)를 읽습니다. CSP가 browser에게 restrictions를 instruct하는 방식이라는 점을 기억하고, CSP violation을 무조건 꺼야 할 장애가 아니라 보안 signal로 읽는 연습을 합니다.
