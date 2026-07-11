## 한 줄 정의

API와 DB는 사용자의 화면 행동을 HTTP request로 받아 서버의 규칙과 데이터 저장소를 거쳐 HTTP response로 돌려보내는 제품의 뒤쪽 흐름입니다. 사용자가 로그인 버튼을 누르거나 강의 북마크를 저장하거나 검색어를 입력할 때, 화면은 혼자 모든 일을 하지 않습니다. 브라우저는 서버에 요청을 보내고, 서버는 요청의 method, path, headers, body, 인증 정보를 해석하고, 필요한 경우 데이터베이스에서 읽거나 쓰고, 결과를 status code와 response body로 돌려줍니다.

초보자는 백엔드를 "화면 뒤에 있는 어려운 서버"로 느끼기 쉽습니다. 하지만 첫 단계에서는 하나의 왕복 흐름으로 보면 됩니다. 브라우저가 무엇을 요청했는가, 서버가 어떤 자원과 동작으로 해석했는가, DB에서 어떤 데이터가 읽히거나 바뀌었는가, 응답은 성공인지 실패인지, 화면은 그 응답을 어떻게 표시하는가입니다. ==백엔드를 이해한다는 것은 버튼 클릭 뒤의 request, API 규칙, DB 상태, response evidence를 이어서 설명할 수 있다는 뜻==입니다.

이 강의는 데이터와 백엔드 모듈의 지도입니다. 뒤의 강의에서 REST API design, database tables/indexes, auth/session/token, environment variables, rate limits, logs를 따로 깊게 다룹니다. 여기서는 프론트엔드 화면과 서버, 데이터베이스가 하나의 제품 행동을 만들 때 어떤 순서로 연결되는지 큰 그림을 잡습니다.

![API DB 백엔드 왕복 흐름](/lesson-diagrams/api-db-backend-flow/api-db-roundtrip-flow.svg)

## 왜 존재하는가

웹 화면만으로는 모든 제품 기능을 만들 수 없습니다. 사용자의 계정, 강의 진행률, 결제 내역, 팀 권한, 댓글, 검색 데이터처럼 여러 기기와 사용자 사이에서 유지되어야 하는 정보는 서버와 데이터 저장소가 필요합니다. 브라우저 localStorage에만 저장하면 기기를 바꾸거나 다른 사용자가 접근해야 할 때 한계가 생깁니다. 민감한 로직을 브라우저에만 두면 사용자가 코드를 볼 수 있고 조작할 수도 있습니다.

API는 화면과 서버 사이의 약속입니다. 어떤 URL에 어떤 method로 요청하면 어떤 의미인지, 성공하면 어떤 status와 body가 오는지, 실패하면 어떤 오류가 오는지 정합니다. DB는 서버가 장기적으로 보존해야 하는 데이터를 구조화해 저장합니다. relational database에서는 table이 rows와 columns로 데이터를 담고, data type과 index가 값의 의미와 조회 비용에 영향을 줍니다.

AI 코딩에서는 이 흐름을 모르면 위험합니다. AI가 프론트엔드 form만 만들어도 실제 저장은 되지 않을 수 있고, API route만 만들어도 DB schema가 없으면 지속성이 없습니다. 반대로 DB table을 만들었는데 API가 권한을 확인하지 않으면 보안 문제가 생길 수 있습니다. 그래서 화면, API, DB를 따로 배우되 마지막에는 반드시 하나의 request-response 흐름으로 묶어야 합니다.

> [!KEY]
> 백엔드는 "서버 코드"라는 한 덩어리가 아닙니다. 요청 해석, 인증, 비즈니스 규칙, 데이터 저장, 응답 설계, 관찰 가능성이 이어지는 흐름입니다.

## 작동 원리

### 1. 화면 행동은 HTTP request로 바뀐다

사용자가 버튼을 누르면 JavaScript는 `fetch` 같은 API로 서버에 request를 보낼 수 있습니다. request에는 method, URL path, headers, body가 포함될 수 있습니다. 예를 들어 북마크를 저장하려면 `POST /api/bookmarks`에 lesson slug를 JSON body로 보낼 수 있습니다. 서버는 이 request를 받아 어떤 자원에 어떤 동작을 하려는지 해석합니다.

HTTP는 stateless protocol입니다. 각각의 request는 기본적으로 독립적이며, 서버가 이전 request를 자동으로 기억한다고 가정할 수 없습니다. 그래서 로그인 유지에는 cookie, session, token 같은 장치가 필요합니다. 인증 정보가 없거나 잘못되면 서버는 401 같은 status code로 실패를 알려줄 수 있습니다.

### 2. API는 자원, method, status code의 약속이다

REST API를 배울 때는 URL을 함수 이름처럼 보기보다 자원(resource)의 경로로 보는 것이 좋습니다. `/api/lessons`는 강의 목록 자원, `/api/bookmarks`는 북마크 자원처럼 읽을 수 있습니다. method는 동작의 성격을 알려줍니다. GET은 조회, POST는 새 처리나 상태 변경, PUT은 전체 교체, PATCH는 부분 수정, DELETE는 삭제를 나타낼 수 있습니다.

status code는 결과 evidence입니다. 200대는 성공, 400대는 client request 문제, 500대는 server 문제로 큰 방향을 잡을 수 있습니다. 예를 들어 201 Created는 새 resource가 만들어졌다는 의미이고, 401 Unauthorized는 인증이 필요하거나 실패했다는 신호입니다. AI에게 오류를 설명할 때 "안 돼요"보다 "POST /api/bookmarks가 401을 반환합니다"가 훨씬 좋은 맥락입니다.

### 3. JSON은 화면과 서버가 주고받는 데이터 형식이다

많은 웹 API는 request와 response body에 JSON을 사용합니다. JSON은 JavaScript object처럼 보이지만 실제로는 language-independent text-based data interchange format입니다. 서버로 보낼 때는 JavaScript object를 JSON string으로 serialize하고, 받을 때는 JSON string을 parse해 JavaScript value로 만듭니다.

여기서 데이터 계약이 중요해집니다. 프론트엔드가 `{ lessonSlug: "http-request-response" }`를 보냈는데 서버가 `slug` field를 기대하면 요청은 실패할 수 있습니다. 서버가 `{ completed: true }`를 보내기로 했는데 실제로는 `{ isDone: true }`를 보내면 화면은 값을 못 읽을 수 있습니다. ==JSON body는 그냥 데이터가 아니라 프론트엔드와 백엔드가 함께 지켜야 하는 계약==입니다.

### 4. 서버는 규칙을 적용한 뒤 DB를 읽고 쓴다

서버는 request를 받으면 먼저 method와 path를 확인하고, 필요한 경우 인증과 권한을 검사합니다. 그다음 business rule을 적용합니다. 예를 들어 사용자가 자기 계정의 진행률만 수정할 수 있는지, lesson slug가 실제로 존재하는지, 이미 저장된 bookmark인지 확인할 수 있습니다. 이 규칙을 통과하면 DB를 읽거나 씁니다.

DB table은 rows와 columns로 데이터를 저장합니다. column의 data type은 가능한 값과 그 값의 의미를 제한합니다. index는 특정 column 조회를 빠르게 할 수 있지만, table과 동기화되어야 하므로 쓰기 비용도 생깁니다. 따라서 "검색이 느리니 index를 추가하자"는 말에는 조회 이득과 쓰기 비용의 trade-off가 함께 들어 있습니다.

### 5. response는 화면의 다음 상태를 결정한다

서버는 처리 결과를 status code, headers, body로 응답합니다. 화면은 이 응답을 보고 다음 상태를 정합니다. 성공하면 새 데이터를 표시하고, 실패하면 오류 메시지를 보여주고, 401이면 로그인 화면으로 안내하고, 429면 잠시 뒤 다시 시도하라고 말할 수 있습니다. response design이 흐리면 프론트엔드는 실패를 모두 "알 수 없는 오류"로 처리하게 됩니다.

좋은 API는 성공 body만 설계하지 않습니다. validation error, authentication error, permission error, not found, rate limit, server error를 구분합니다. 로그와 observability도 중요합니다. 서버가 무엇을 받았고 어떤 status를 반환했는지 기록해야 운영 중 문제를 추적할 수 있습니다. 다만 secret과 개인정보를 로그에 남기지 않는 규칙도 함께 필요합니다.

```ts
type BookmarkRequest = {
  readonly lessonSlug: string
}

type BookmarkResponse =
  | { ok: true; bookmarkId: string }
  | { ok: false; code: "UNAUTHENTICATED" | "NOT_FOUND" | "RATE_LIMITED" }

async function saveBookmark(input: BookmarkRequest): Promise<BookmarkResponse> {
  const response = await fetch("/api/bookmarks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  return response.json()
}
```

이 예시는 프론트엔드 쪽의 작은 계약입니다. request body의 field 이름을 type으로 잡고, response가 성공과 실패를 구분하게 합니다. 실제 서버에서는 인증 확인, lesson 존재 확인, DB insert, status code 설정, 로그 기록이 이어집니다. TypeScript type만으로 외부 API의 진실을 보장할 수는 없지만, 코드 안의 기대를 드러내는 데 도움이 됩니다.

## 스펙과 세부

### HTTP message는 request와 response로 나뉜다

HTTP에서는 client가 보내는 message를 request, server가 보내는 message를 response라고 부릅니다. request에는 method와 path, headers, body가 있고, response에는 status code, headers, body가 있습니다. 이 구조를 알면 Network 탭에서 어떤 정보를 봐야 하는지 명확해집니다.

### method에는 의미가 있다

GET은 표현을 요청하며 보통 데이터를 조회합니다. POST는 entity를 제출해 서버 상태 변경이나 side effect를 일으킬 수 있습니다. PUT은 target resource의 현재 표현을 request content로 교체합니다. method 의미를 무시하면 retry, caching, idempotency, 보안 정책을 잘못 설계할 수 있습니다.

### status code는 UI 메시지의 근거다

status code는 사용자의 화면 메시지와 운영 로그의 근거입니다. 400 validation error와 401 authentication error와 404 not found와 429 rate limit은 같은 "실패"가 아닙니다. 프론트엔드가 이 차이를 읽으면 사용자에게 더 정확한 다음 행동을 안내할 수 있습니다.

### DB schema는 제품 언어를 고정한다

table과 column 이름은 제품 개념을 코드로 고정합니다. `users`, `lessons`, `bookmarks`, `progress` 같은 table은 제품의 핵심 명사를 드러냅니다. column type과 constraint는 가능한 값을 제한합니다. AI가 DB migration을 제안할 때는 이름, type, nullability, index, relation을 함께 확인해야 합니다.

### 인증은 request 흐름의 일부다

로그인은 한 번 화면에서 끝나는 일이 아닙니다. 이후 request가 같은 사용자임을 증명해야 합니다. cookie, session, token, Authorization header 같은 방식이 여기에 연결됩니다. 인증이 빠진 API는 사용자가 아닌 누구나 호출할 수 있는 기능이 될 수 있으므로, 백엔드 흐름에서 별도 단계로 확인해야 합니다.

## 원문으로 읽기

> "HTTP is a protocol for fetching resources such as HTML documents."
>
> — HTTP는 HTML 문서 같은 resource를 가져오기 위한 protocol이다.
> [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)

HTTP를 이해하면 화면과 서버의 대화가 보입니다. 브라우저는 resource를 요청하고 서버는 응답합니다. API도 이 큰 구조 안에 있습니다. 따라서 API 오류를 볼 때는 JavaScript 함수 이름보다 먼저 request URL, method, status code, response body를 확인해야 합니다.

> "JSON is a text-based data format following JavaScript object syntax."
>
> — JSON은 JavaScript object syntax를 따르는 text-based data format이다.
> [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)

JSON은 JavaScript object와 닮았지만 네트워크를 건너는 text format입니다. 이 차이를 모르면 `JSON.stringify`, `JSON.parse`, `Content-Type`의 필요를 이해하기 어렵습니다. API 계약에서는 field 이름, type, optional 여부가 모두 중요합니다.

> "A table in a relational database is much like a table on paper: It consists of rows and columns."
>
> — 관계형 데이터베이스의 table은 종이 표처럼 rows와 columns로 이루어진다.
> [PostgreSQL Table Basics](https://www.postgresql.org/docs/current/ddl-basics.html)

DB를 처음 배울 때 table 비유는 강력합니다. row는 하나의 기록, column은 기록이 가진 속성입니다. 하지만 실제 DB에서는 type, constraint, index, relation이 더해집니다. 그래서 단순히 데이터를 저장한다는 말보다 어떤 구조로 저장하는지가 중요합니다.

> "HTTP provides a general framework for access control and authentication."
>
> — HTTP는 접근 제어와 인증을 위한 일반 framework를 제공한다.
> [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

인증은 백엔드에 나중에 붙이는 장식이 아닙니다. request가 어떤 사용자에게 속하는지, 어떤 resource에 접근할 수 있는지 결정하는 흐름입니다. 로그인 화면을 만들 때도 이후 request가 어떻게 인증되는지 함께 생각해야 합니다.

## 실전에서

### 패턴 1: 화면 기능을 request-response 표로 바꾼다

기능을 만들기 전에 화면 행동을 표로 적습니다. 예를 들어 "북마크 저장"은 method `POST`, path `/api/bookmarks`, request body `{ lessonSlug }`, success status `201`, failure status `401`, `404`, `429`처럼 정리할 수 있습니다. 이렇게 하면 프론트엔드와 백엔드가 같은 계약을 보게 됩니다.

### 패턴 2: Network 탭을 첫 증거로 사용한다

화면에서 저장이 안 되면 먼저 Network 탭을 봅니다. 요청이 아예 안 나갔는지, URL이 틀렸는지, status code가 실패인지, response body가 예상과 다른지 확인합니다. Console 오류만 보고 JavaScript를 고치면 서버 응답 문제를 놓칠 수 있습니다.

### 패턴 3: DB 변경은 migration과 rollback을 함께 생각한다

DB table이나 column을 바꾸면 코드보다 오래 남는 상태가 바뀝니다. 새 column을 추가할 때 기존 row의 값은 어떻게 채울지, index 추가가 쓰기 비용을 늘리지 않는지, 잘못 배포했을 때 되돌릴 수 있는지 봐야 합니다. AI에게 migration을 맡길 때도 sample query와 rollback 계획을 함께 요청하는 편이 안전합니다.

> [!WARNING]
> API가 "잘 돌아간다"는 말은 성공 응답만 확인했다는 뜻일 수 있습니다. 인증 실패, 잘못된 입력, 존재하지 않는 resource, 과도한 요청, 서버 오류까지 분리해야 실무 API가 됩니다.

## 한계와 트레이드오프

API와 DB를 분리해 이해하면 구조가 선명해지지만, 실제 프레임워크에서는 둘이 한 파일이나 한 route handler 안에 함께 나타날 수 있습니다. Next.js route handler, server action, ORM call, validation schema가 가까이 놓일 수 있습니다. 중요한 것은 파일 위치가 아니라 책임을 구분하는 것입니다. request 해석, 권한 확인, business rule, DB 접근, response 생성이 각각 어떤 역할을 하는지 읽어야 합니다.

REST도 유일한 API 방식은 아닙니다. GraphQL, RPC, WebSocket, server-sent events 같은 방식이 있고, 각각 다른 trade-off를 가집니다. 이 커리큘럼은 입문 단계에서 HTTP와 REST 스타일을 먼저 다룹니다. 이유는 브라우저 Network 탭, status code, method, URL path가 웹 개발의 공통 언어이기 때문입니다.

DB 역시 relational database만 있는 것은 아닙니다. document database, key-value store, vector store, cache 등 여러 저장소가 있습니다. 하지만 table, row, column, type, index를 먼저 배우면 데이터가 구조를 갖고 저장된다는 감각을 얻을 수 있습니다. AI 시대에도 저장소 선택은 "어디에 넣을까"가 아니라 query pattern, consistency, cost, 운영 난이도의 선택입니다.

## 더 읽기

- [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview): request/response와 stateless 구조를 먼저 확인합니다.
- [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods): GET, POST, PUT 같은 method 의미를 읽습니다.
- [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status): status code가 UI와 로그의 evidence가 되는 이유를 봅니다.
- [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON): JSON text와 JavaScript value의 차이를 확인합니다.
- [PostgreSQL Table Basics](https://www.postgresql.org/docs/current/ddl-basics.html): table, row, column, data type의 기본을 읽습니다.
- [MDN HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication): 인증이 HTTP request 흐름에 어떻게 들어오는지 봅니다.

다음에는 REST API 설계와 상태 코드를 먼저 읽고, DB table/index, 인증/session/token, 환경변수와 secret, rate limit, backend log 순서로 확장하면 좋습니다. 이 순서는 request 하나가 제품 기능으로 완성되는 실제 흐름과 가장 가깝습니다.
