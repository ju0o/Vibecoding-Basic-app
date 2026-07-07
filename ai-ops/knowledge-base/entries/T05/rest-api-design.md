---
id: rest-api-design
title: "REST API 설계 — 자원, 메서드, 상태 코드"
topicGroup: T05
status: approved
score: 90
level: 기초
prerequisites: [http-request-response, api-db-backend-flow]
successors: [auth-session-token]
related: [json-data-contracts, web-security-basics]
sources:
  - { title: "HTTP request methods — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", checked: 2026-07-07 }
  - { title: "HTTP response status codes — MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", checked: 2026-07-07 }
  - { title: "Idempotent — MDN Glossary", url: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent", checked: 2026-07-07 }
  - { title: "Safe (HTTP Methods) — MDN Glossary", url: "https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP", checked: 2026-07-07 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-07
---

## 정의
REST API 설계는 서버의 기능을 "자원(resource)"으로 보고, 그 자원을 HTTP 메서드(GET/POST/PUT/PATCH/DELETE)로 다루며, 결과를 HTTP 상태 코드로 알리는 방식이다. 메서드는 각각 역할이 정해져 있다 — GET은 "requests a representation of the specified resource"(지정 자원의 표현을 요청), POST는 "submits an entity to the specified resource, often causing a change in state"(자원에 엔티티를 제출, 흔히 상태 변경 유발), PUT은 "replaces all current representations of the target resource"(대상 자원의 현재 표현 전체를 교체), PATCH는 "applies partial modifications to a resource"(부분 수정 적용), DELETE는 "deletes the specified resource"(지정 자원 삭제). (출처: MDN HTTP Methods, 확인: 2026-07-07)

## 역사
REST는 HTTP의 메서드·상태 코드 체계를 "설계 규약"으로 승격시킨 것이다. HTTP가 이미 GET/POST/PUT/DELETE와 2xx/4xx/5xx를 정의해 두었으므로, REST API 설계란 새 규칙을 만드는 것이 아니라 ==HTTP가 이미 정한 의미를 일관되게 지키는 것==에 가깝다. 그래서 좋은 REST API는 "이 엔드포인트가 무엇을 하는지"를 메서드와 경로만으로 짐작하게 한다. (근거: MDN Methods·Status 체계, 확인: 2026-07-07)

## 해결하려는 문제
- 같은 동작을 제각각 이름 붙이는 혼란 제거: 자원 삭제는 언제나 DELETE, 조회는 언제나 GET. (출처: MDN Methods, 확인: 2026-07-07)
- 재시도 안전성 판단: safe/idempotent 성질이 "이 요청을 다시 보내도 되는가"에 답한다. (출처: MDN Glossary Safe·Idempotent, 확인: 2026-07-07)
- 결과를 기계가 읽을 수 있게: 상태 코드 클래스(2xx/4xx/5xx)가 성공·클라이언트 오류·서버 오류를 코드로 구분한다. (출처: MDN Status, 확인: 2026-07-07)

## 핵심 개념
1. **자원과 메서드의 분리**: 경로(/users/42)가 자원을 가리키고, 메서드가 그 자원에 할 동작을 정한다. 같은 경로라도 GET은 조회, DELETE는 삭제다. (출처: MDN Methods, 확인: 2026-07-07)
2. **safe(안전) 메서드**: "An HTTP method is safe if it doesn't alter the state of the server." GET·HEAD가 대표 — 읽기 전용이라 몇 번 호출해도 서버 상태가 안 바뀐다. (출처: MDN Glossary Safe, 확인: 2026-07-07)
3. **idempotent(멱등) 메서드**: "An HTTP method is idempotent if the intended effect on the server of making a single request is the same as the effect of making several identical requests." PUT·DELETE가 대표 — 같은 요청을 여러 번 보내도 결과가 한 번 보낸 것과 같다. POST는 멱등이 아니다(중복 생성 위험). (출처: MDN Glossary Idempotent, 확인: 2026-07-07)
4. **상태 코드 5클래스**: 1xx 정보, 2xx 성공(200 OK, 201 Created), 3xx 리다이렉션, 4xx 클라이언트 오류(400/401/404), 5xx 서버 오류(500). 앞자리 하나가 "누구 잘못인가"를 먼저 말한다. (출처: MDN Status, 확인: 2026-07-07)
5. **201 Created의 의미**: "a new resource was created as a result. This is typically the response sent after POST requests" — 생성 성공은 200이 아니라 201로 구분한다. (출처: MDN Status, 확인: 2026-07-07)
6. **401 vs 404의 뉘앙스**: 401은 "must authenticate itself"(인증 필요), 404는 자원 없음이되 "instead of 403 Forbidden to hide the existence of a resource"로도 쓰인다 — 상태 코드가 보안 정보 노출까지 좌우한다. (출처: MDN Status, 확인: 2026-07-07)

## 관련 기술
- REST vs http-request-response: REST는 그 HTTP 요청·응답 구조를 "자원 중심 설계 규약"으로 조직한 것. (출처: MDN Methods + http-request-response KB, 확인: 2026-07-07)
- 상태 코드 vs json-data-contracts: 응답 본문(JSON 계약)과 상태 코드(메타 결과)는 함께 API 응답을 이룬다. (근거: MDN Status + json-data-contracts KB, 확인: 2026-07-07)
- PUT/PATCH 구분: PUT은 전체 교체, PATCH는 부분 수정 — 같은 "수정"도 범위가 다르다. (출처: MDN Methods, 확인: 2026-07-07)

## 선행 개념
- http-request-response: 메서드·헤더·본문·상태 코드의 기본 구조.
- api-db-backend-flow: API가 DB와 연결되어 제품 기능을 만드는 큰 그림.

## 후행 개념
- auth-session-token: 401이 요구하는 "인증"을 실제로 구현하는 방법.
- api-security-rate-limits (예정): 4xx(429 등)로 남용을 막는 설계.

## AI 시대에서의 의미
AI에게 "이 API 만들어줘"라고 하면 메서드·상태 코드 선택을 AI가 대신한다 — 그때 "생성인데 왜 200을 반환하지?", "이건 왜 POST가 아니라 GET이지?"를 짚으려면 REST 규약을 알아야 한다. safe/idempotent 성질은 특히 중요하다: AI가 만든 재시도 로직이 POST를 재시도하면 중복 생성이 나므로, 멱등성 판단은 사람이 검증해야 할 지점이다. (근거: MDN Methods·Idempotent, 확인: 2026-07-07)

## 실무 활용
1. 메서드 선택: 조회 GET, 생성 POST, 전체 교체 PUT, 부분 수정 PATCH, 삭제 DELETE. (출처: MDN Methods, 확인: 2026-07-07)
2. 상태 코드 선택: 생성 성공 201, 잘못된 입력 400, 미인증 401, 자원 없음 404, 서버 예외 500. (출처: MDN Status, 확인: 2026-07-07)
3. 재시도 설계: safe·idempotent 메서드(GET/PUT/DELETE)만 자동 재시도, POST는 신중히. (출처: MDN Glossary, 확인: 2026-07-07)
4. 보안 고려: 자원 존재를 숨겨야 하면 403 대신 404 사용. (출처: MDN Status 404 설명, 확인: 2026-07-07)

## FAQ
Q: POST와 PUT의 차이는?
A: POST는 자원에 엔티티를 제출해 흔히 상태를 바꾸고(멱등 아님), PUT은 대상 자원의 표현 전체를 교체한다(멱등). 반복 호출 시 POST는 중복을 만들 수 있고 PUT은 같은 결과를 유지한다. (출처: MDN Methods·Idempotent, 확인: 2026-07-07)
Q: safe와 idempotent는 같은 말인가?
A: 아니다. safe는 "서버 상태를 안 바꾼다"(읽기 전용), idempotent는 "여러 번 해도 한 번과 결과가 같다"이다. 모든 safe 메서드는 idempotent이지만 역은 아니다(PUT/DELETE는 idempotent이나 safe는 아님). (출처: MDN Glossary Safe·Idempotent, 확인: 2026-07-07)
Q: 201과 200의 차이는?
A: 200은 일반 성공, 201은 새 자원 생성 성공이다. 생성 엔드포인트(POST)는 201로 "무엇이 만들어졌다"를 명확히 한다. (출처: MDN Status, 확인: 2026-07-07)
Q: 401과 403의 차이는?
A: 401은 인증되지 않음(로그인 필요), 403은 인증됐으나 권한 없음이다. MDN은 401이 의미상 "unauthenticated"라고 명시한다. (출처: MDN Status 401, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: 조회에 POST 사용. 왜 생기나: 메서드 의미를 무시. 교정: 데이터 조회는 GET(safe). (출처: MDN Methods, 확인: 2026-07-07)
2. 실수: 모든 성공에 200 반환. 왜 생기나: 상태 코드 세분화를 안 함. 교정: 생성은 201로 구분. (출처: MDN Status, 확인: 2026-07-07)
3. 실수: 서버 예외에 400 반환. 왜 생기나: 4xx/5xx 책임 구분 혼동. 교정: 클라이언트 잘못은 4xx, 서버 잘못은 5xx. (출처: MDN Status, 확인: 2026-07-07)
4. 실수: POST 요청을 무조건 재시도. 왜 생기나: 멱등성을 안 따짐. 교정: POST는 멱등이 아니므로 재시도 시 중복 생성 방지책 필요. (출처: MDN Idempotent, 확인: 2026-07-07)

## 공식 출처
- 메서드 정의(GET/POST/PUT/PATCH/DELETE/HEAD) — [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (확인: 2026-07-07)
- 상태 코드 5클래스·주요 코드 — [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) (확인: 2026-07-07)
- 멱등성 정의 — [MDN Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) (확인: 2026-07-07)
- 안전성 정의 — [MDN Safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP) (확인: 2026-07-07)

## Quote Bank
- > "The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should not contain a request content."
  - 출처: [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (확인: 2026-07-07)
  - 맥락: GET의 정의 — 조회 전용, 본문 없음
- > "The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server."
  - 출처: [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (확인: 2026-07-07)
  - 맥락: POST의 정의 — 상태 변경·부작용 유발
- > "The PUT method replaces all current representations of the target resource with the request content."
  - 출처: [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) (확인: 2026-07-07)
  - 맥락: PUT의 정의 — 전체 교체(PATCH의 부분 수정과 대비)
- > "An HTTP method is safe if it doesn't alter the state of the server. In other words, a method is safe if it leads to a read-only operation."
  - 출처: [MDN Safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP) (확인: 2026-07-07)
  - 맥락: safe 정의 — 읽기 전용(GET/HEAD)
- > "An HTTP method is idempotent if the intended effect on the server of making a single request is the same as the effect of making several identical requests."
  - 출처: [MDN Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) (확인: 2026-07-07)
  - 맥락: idempotent 정의 — 재시도 안전성의 근거
- > "The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests."
  - 출처: [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) (확인: 2026-07-07)
  - 맥락: 201 Created — 생성 성공은 200이 아니라 201

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
