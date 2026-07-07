---
id: api-security-rate-limits
title: "API 보안과 rate limit — 남용을 막는 설계"
topicGroup: T05
status: approved
score: 88
level: 중급
prerequisites: [rest-api-design, auth-session-token]
successors: []
related: [web-security-basics]
sources:
  - { title: "429 Too Many Requests — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429", checked: 2026-07-08 }
  - { title: "Retry-After — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After", checked: 2026-07-08 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-08
---

## 정의
rate limit(요청 제한)은 클라이언트가 일정 시간에 보낼 수 있는 요청 수를 제한해 API 남용을 막는 장치다. 한도를 넘으면 서버는 429 상태 코드로 응답한다 — MDN은 "The HTTP 429 Too Many Requests status code indicates the client has sent too many requests in a given amount of time"(주어진 시간에 너무 많은 요청을 보냈음을 나타낸다)라고 정의하고, 이 방식을 "commonly called rate limiting"이라 부른다. 함께 오는 Retry-After 헤더가 "얼마나 기다렸다 다시 보내라"를 알린다. (출처: MDN 429·Retry-After, 확인: 2026-07-08)

## 역사
rate limit은 REST의 4xx(클라이언트 오류) 체계 위에 얹힌 남용 방어다. rest-api-design 강의에서 배운 "4xx는 클라이언트 책임"이 여기서 429(너무 많은 요청)로 구체화된다. 인증(auth-session-token)이 "누구인가"를 다뤘다면, rate limit은 "그 누군가가 얼마나 자주 요청할 수 있는가"를 다룬다 — 인증된 사용자라도 무제한은 아니다. (근거: MDN 429 + rest-api-design/auth KB, 확인: 2026-07-08)

## 해결하려는 문제
- 남용·과부하 방지: 한 클라이언트가 요청을 폭주시켜 서버를 마비시키는 것을 429로 차단. (출처: MDN 429, 확인: 2026-07-08)
- 재시도 안내: Retry-After로 "언제 다시 시도하라"를 명시해 무작정 재요청을 막음. (출처: MDN Retry-After, 확인: 2026-07-08)
- 공정한 자원 배분: 소수의 헤비 유저가 전체 자원을 독점하지 못하게 함. (근거: MDN 429 rate limiting, 확인: 2026-07-08)

## 핵심 개념
1. **429 Too Many Requests**: 클라이언트가 "in a given amount of time" 너무 많은 요청을 보냈을 때의 응답. 서버 잘못(5xx)이 아니라 클라이언트가 속도를 늦춰야 하는 4xx다. (출처: MDN 429, 확인: 2026-07-08)
2. **rate limiting**: "asking the client to slow down the rate of requests" — 속도를 늦추라고 요청하는 메커니즘. (출처: MDN 429, 확인: 2026-07-08)
3. **Retry-After**: "indicates how long the user agent should wait before making a follow-up request" — 다음 요청까지 대기 시간. 429·503 응답에 함께 온다. (출처: MDN Retry-After, 확인: 2026-07-08)
4. **429 vs 503**: 429는 "네가 너무 많이 보냈다"(클라이언트), 503은 "서비스가 잠시 불가"(서버) — 둘 다 Retry-After를 쓰지만 책임 주체가 다르다. (출처: MDN Retry-After, 확인: 2026-07-08)
5. **재시도 예절**: 429를 받으면 즉시 재시도가 아니라 Retry-After만큼 기다려야 한다 — 안 그러면 제한을 더 오래 받는다. (출처: MDN Retry-After, 확인: 2026-07-08)
6. **인증과의 결합**: rate limit은 흔히 사용자·API 키 단위로 적용된다 — 인증(auth-session-token)이 "누구인지"를 알아야 "그 누구의 한도"를 셀 수 있다. (근거: MDN 429 + auth KB, 확인: 2026-07-08)

## 관련 기술
- 429 ↔ rest-api-design: 429는 REST 상태 코드 4xx 체계의 일부다. (출처: MDN 429 + rest-api-design KB, 확인: 2026-07-08)
- rate limit ↔ auth-session-token: 사용자·키 단위 한도 계산은 인증을 전제로 한다. (근거: auth KB, 확인: 2026-07-08)
- Retry-After ↔ 멱등성: 안전하게 재시도하려면 그 요청이 idempotent인지도 함께 봐야 한다(rest-api-design의 재시도 설계). (출처: MDN Retry-After + rest-api-design KB, 확인: 2026-07-08)

## 선행 개념
- rest-api-design: 상태 코드 4xx 체계와 재시도 안전성.
- auth-session-token: 사용자·키 단위 식별.

## 후행 개념
- backend-observability-logs: rate limit 초과·남용 패턴을 로그로 관찰.

## AI 시대에서의 의미
AI가 만든 클라이언트 코드가 외부 API를 호출할 때, 429를 무시하고 즉시 재시도하면 제한을 더 오래 받거나 차단된다 — AI의 재시도 로직이 ==Retry-After를 존중하는지==는 사람이 확인해야 할 지점이다. 반대로 AI에게 API 서버를 맡길 때는 "rate limit이 있는가"를 물어야 한다. AI는 동작하는 API는 잘 만들지만, 남용 방어는 명시하지 않으면 빠뜨리기 쉬운 비기능 요구사항이다. (근거: MDN 429·Retry-After, 확인: 2026-07-08)

## 실무 활용
1. 서버 측: 사용자·IP·API 키 단위로 시간당 요청 수를 세고, 초과 시 429 + Retry-After 응답. (출처: MDN 429·Retry-After, 확인: 2026-07-08)
2. 클라이언트 측: 429를 받으면 Retry-After만큼 대기 후 재시도(지수 백오프 병용). (출처: MDN Retry-After, 확인: 2026-07-08)
3. 503 처리: 서비스 불가 시에도 Retry-After로 복구 예상 시간 안내. (출처: MDN Retry-After, 확인: 2026-07-08)
4. 모니터링 연계: 429 급증은 남용·버그 신호이므로 로그·알림으로 관찰. (근거: MDN 429, 확인: 2026-07-08)

## FAQ
Q: 429는 서버 잘못인가?
A: 아니다. 429는 4xx(클라이언트 오류)로, 클라이언트가 너무 많이 보냈다는 뜻이다. 서버 불가(5xx)와 구분된다. (출처: MDN 429, 확인: 2026-07-08)
Q: 429를 받으면 어떻게 하나?
A: 즉시 재시도하지 말고 Retry-After가 지정한 시간만큼 기다린 뒤 다시 보낸다. (출처: MDN Retry-After, 확인: 2026-07-08)
Q: 429와 503의 Retry-After 차이는?
A: 429에서는 "다시 요청하기까지 대기 시간", 503에서는 "서비스 불가 예상 시간"을 뜻한다. (출처: MDN Retry-After, 확인: 2026-07-08)
Q: rate limit은 인증과 무슨 관계인가?
A: 한도를 사용자·API 키 단위로 세려면 요청자가 누구인지 알아야 하므로, 인증이 전제된다. (근거: MDN 429 + auth KB, 확인: 2026-07-08)

## 자주 하는 실수
1. 실수: 429를 받고 즉시 재시도. 왜 생기나: Retry-After를 안 봄. 교정: 지정 시간만큼 대기 후 재시도. (출처: MDN Retry-After, 확인: 2026-07-08)
2. 실수: 남용 방어 없이 API 공개. 왜 생기나: rate limit을 비기능 요구로 빠뜨림. 교정: 사용자·키 단위 한도 설계. (근거: MDN 429, 확인: 2026-07-08)
3. 실수: 429를 5xx처럼 서버 오류로 처리. 왜 생기나: 4xx/5xx 책임 구분 혼동. 교정: 429는 클라이언트가 속도를 늦춰야 하는 신호. (출처: MDN 429, 확인: 2026-07-08)
4. 실수: Retry-After 없이 429만 반환. 왜 생기나: 재시도 안내 누락. 교정: 429에 Retry-After를 함께 담아 클라이언트를 안내. (출처: MDN 429·Retry-After, 확인: 2026-07-08)

## 공식 출처
- 429 정의·rate limiting — [MDN 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (확인: 2026-07-08)
- Retry-After 정의·429/503 용법 — [MDN Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) (확인: 2026-07-08)

## Quote Bank
- > "The HTTP 429 Too Many Requests status code indicates the client has sent too many requests in a given amount of time."
  - 출처: [MDN 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (확인: 2026-07-08)
  - 맥락: 429의 정의 — 클라이언트가 짧은 시간에 과도한 요청
- > "This mechanism of asking the client to slow down the rate of requests is commonly called \"rate limiting\"."
  - 출처: [MDN 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (확인: 2026-07-08)
  - 맥락: rate limiting의 정의 — 속도를 늦추라는 요청
- > "A Retry-After header may be included to this response to indicate how long a client should wait before making the request again."
  - 출처: [MDN 429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (확인: 2026-07-08)
  - 맥락: 429와 Retry-After의 결합
- > "The HTTP Retry-After response header indicates how long the user agent should wait before making a follow-up request."
  - 출처: [MDN Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) (확인: 2026-07-08)
  - 맥락: Retry-After의 정의 — 다음 요청까지 대기
- > "In a 429 Too Many Requests response, this indicates how long to wait before making a new request."
  - 출처: [MDN Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) (확인: 2026-07-08)
  - 맥락: 429에서 Retry-After의 의미 — 재요청 대기 시간

## 변경 이력
- 2026-07-08: 최초 작성 (Fable — 대행, P-01)
