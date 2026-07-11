## 한 줄 정의

REST API 설계는 서버의 기능을 **"자원(resource)"으로 보고**, 그 자원을 HTTP 메서드로 다루며, 결과를 HTTP 상태 코드로 알리는 방식입니다. 경로(`/users/42`)가 "무엇을"을 가리키고, 메서드(GET·POST·PUT·PATCH·DELETE)가 "어떻게"를 정하며, 상태 코드(2xx·4xx·5xx)가 "결과가 어땠는지"를 답합니다.

핵심은 새 규칙을 만드는 게 아니라는 것입니다. ==HTTP가 이미 정해 둔 메서드와 상태 코드의 의미를 일관되게 지키는 것==이 REST 설계의 본질입니다. 그래서 잘 설계된 API는 문서를 읽기 전에도 "이 요청이 무엇을 할지"를 메서드와 경로만으로 짐작하게 합니다.

> [!KEY]
> 메서드 선택의 뼈대는 두 성질입니다 — **safe**(서버 상태를 바꾸지 않음, 읽기 전용)와 **idempotent**(같은 요청을 여러 번 보내도 한 번과 결과가 같음). 이 둘이 "이 요청을 다시 보내도 되는가"라는 실무에서 가장 중요한 질문에 답합니다. GET은 safe이고, PUT·DELETE는 idempotent이며, POST는 둘 다 아닙니다.

![REST API: 자원×메서드 매트릭스와 상태 코드 5클래스](/lesson-diagrams/rest-api-design/rest-method-status-map.svg)

## 왜 존재하는가

API를 만들 때 "이 동작에 어떤 URL과 방식을 쓸까"를 매번 자유롭게 정하면 세 가지 혼란이 생깁니다.

첫째, **같은 동작에 제각각의 이름.** 어떤 개발자는 사용자 삭제를 `POST /deleteUser`로, 다른 이는 `GET /user/remove`로 만듭니다. REST는 "삭제는 언제나 DELETE, 조회는 언제나 GET"이라는 공통 규약으로 이 혼란을 없앱니다.

둘째, **재시도해도 되는지 알 수 없음.** 네트워크가 끊겨 응답을 못 받았을 때, 그 요청을 다시 보내도 안전한가? 조회(GET)라면 몇 번을 보내도 괜찮지만, 결제 생성(POST)을 재시도하면 중복 결제가 날 수 있습니다. safe/idempotent 성질이 이 판단의 근거입니다.

셋째, **결과를 기계가 못 읽음.** 응답이 "실패했어요"라는 문장뿐이면 프로그램은 무엇이 잘못됐는지 모릅니다. 상태 코드의 앞자리 하나(4xx=클라이언트 잘못, 5xx=서버 잘못)가 "누구 책임인가"를 코드로 먼저 말해 줍니다.

## 작동 원리

### 자원과 메서드의 분리

REST의 첫 번째 아이디어는 **경로와 동작을 분리**하는 것입니다. 경로 `/users/42`는 "42번 사용자라는 자원"을 가리킬 뿐, 그 자원에 무엇을 할지는 메서드가 정합니다:

- `GET /users/42` — 조회
- `PUT /users/42` — 전체 교체
- `PATCH /users/42` — 부분 수정
- `DELETE /users/42` — 삭제

같은 경로라도 메서드가 다르면 완전히 다른 동작입니다. 그래서 REST API는 "동사를 URL에 넣지 않습니다" — 동사는 이미 메서드가 담당하기 때문입니다.

### safe와 idempotent

이 두 성질은 자주 혼동되지만 다릅니다:

| 성질 | 의미 | 대표 메서드 |
|---|---|---|
| safe | 서버 상태를 바꾸지 않음(읽기 전용) | GET, HEAD |
| idempotent | 여러 번 = 한 번 (결과 동일) | GET, PUT, DELETE |
| 둘 다 아님 | 반복 시 상태가 계속 변함 | POST |

모든 safe 메서드는 idempotent이지만 역은 아닙니다. PUT은 서버 상태를 바꾸므로 safe가 아니지만, "이 자원을 이 값으로 만들어라"를 여러 번 해도 결과가 같으므로 idempotent입니다. POST는 "새로 만들어라"이므로 두 번 보내면 두 개가 생길 수 있어 idempotent가 아닙니다.

> [!EXAMPLE]
> 결제 API를 `POST /payments`로 만들었습니다. 사용자가 "결제" 버튼을 눌렀는데 응답이 늦어 한 번 더 눌렀다면? POST는 idempotent가 아니므로 결제가 두 번 생성됩니다. 그래서 실무에서는 멱등 키(idempotency key)를 함께 보내 "같은 키의 요청은 한 번만 처리"하도록 방어합니다 — POST가 멱등이 아니라는 사실을 알아야 이 설계가 필요하다는 걸 압니다.

### 상태 코드의 5클래스

응답 코드의 앞자리가 결과의 큰 분류를 말합니다:

| 클래스 | 의미 | 대표 |
|---|---|---|
| 1xx | 정보 | (드묾) |
| 2xx | 성공 | 200 OK, 201 Created |
| 3xx | 리다이렉션 | 301, 304 |
| 4xx | 클라이언트 오류 | 400, 401, 404 |
| 5xx | 서버 오류 | 500 |

==앞자리 하나가 "누구 잘못인가"를 먼저 말한다==는 것이 핵심입니다. 4xx는 "요청한 쪽이 잘못했다", 5xx는 "서버가 잘못했다"입니다. 이 구분이 디버깅의 방향을 정합니다.

## 스펙과 세부

### 메서드별 역할과 성질

| 메서드 | 역할 | safe | idempotent |
|---|---|---|---|
| GET | 자원 조회 | ✓ | ✓ |
| POST | 자원 생성·제출 | ✗ | ✗ |
| PUT | 전체 교체 | ✗ | ✓ |
| PATCH | 부분 수정 | ✗ | (보통 ✗) |
| DELETE | 삭제 | ✗ | ✓ |

### 주요 상태 코드

| 코드 | 의미 | 언제 |
|---|---|---|
| 200 OK | 일반 성공 | 조회·수정 성공 |
| 201 Created | 생성 성공 | POST로 새 자원 생성 |
| 400 Bad Request | 잘못된 요청 | 입력 형식 오류 |
| 401 Unauthorized | 미인증 | 로그인 필요 |
| 404 Not Found | 자원 없음 | 경로·자원 부재 |
| 500 Internal Server Error | 서버 예외 | 서버 측 오류 |

MDN은 401에 대해 의미상 "unauthenticated"(인증되지 않음)라고 명시합니다 — 이름은 "unauthorized"지만 실제 뜻은 "너는 아직 로그인하지 않았다"입니다. 권한 부족(인증은 됐으나 접근 불가)은 403입니다.

### 상황별 빠른 참조

| 상황 | 메서드 | 성공 코드 |
|---|---|---|
| 목록·상세 조회 | GET | 200 |
| 새 자원 생성 | POST | 201 |
| 자원 전체 교체 | PUT | 200 |
| 자원 일부 수정 | PATCH | 200 |
| 자원 삭제 | DELETE | 200 / 204 |
| 잘못된 입력 거부 | — | 400 |
| 로그인 요구 | — | 401 |
| 자원 없음(또는 숨김) | — | 404 |

## 원문으로 읽기

> "The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should not contain a request content."
>
> — GET 메서드는 지정된 자원의 표현을 요청한다. GET을 쓰는 요청은 데이터를 조회만 해야 하며 요청 본문을 담아서는 안 된다.
> [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

"should only retrieve data" — GET은 조회 전용이라는 규약입니다. GET 요청에 데이터를 담아 서버 상태를 바꾸는 설계는 이 원칙을 어기는 것이며, 캐싱·재시도·프리페치 같은 HTTP의 여러 최적화가 "GET은 안전하다"는 가정 위에 서 있어서 문제를 일으킵니다.

> "The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server."
>
> — POST 메서드는 지정된 자원에 엔티티를 제출하며, 흔히 서버의 상태 변경이나 부작용을 유발한다.
> [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

"a change in state or side effects" — POST가 idempotent가 아닌 이유가 이 문장에 있습니다. 상태를 바꾸고 부작용을 만들기 때문에, 두 번 보내면 두 번의 변화가 일어납니다. 재시도 설계에서 POST를 특별 취급해야 하는 근거입니다.

> "An HTTP method is safe if it doesn't alter the state of the server. In other words, a method is safe if it leads to a read-only operation."
>
> — HTTP 메서드는 서버의 상태를 바꾸지 않으면 safe다. 다시 말해, 읽기 전용 연산으로 이어지면 safe다.
> [MDN Safe (HTTP)](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP)

safe의 정의가 "read-only operation"으로 압축됩니다. 이 성질 덕분에 브라우저와 프록시는 GET 결과를 마음대로 캐시하고, 크롤러는 GET을 자유롭게 호출합니다 — 상태를 안 바꾸니 안전합니다.

> "An HTTP method is idempotent if the intended effect on the server of making a single request is the same as the effect of making several identical requests."
>
> — HTTP 메서드는, 한 번 요청한 효과가 동일한 요청을 여러 번 한 효과와 같으면 idempotent다.
> [MDN Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)

idempotent의 정의가 재시도 안전성의 근거입니다. "1회 = n회"이므로, 네트워크 오류로 응답을 못 받아도 안심하고 다시 보낼 수 있습니다. 자동 재시도 로직이 GET·PUT·DELETE에는 안전하지만 POST에는 위험한 이유가 여기 있습니다.

> "The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests."
>
> — 요청이 성공했고 그 결과로 새 자원이 생성되었다. 이는 보통 POST 요청, 또는 일부 PUT 요청 뒤에 보내는 응답이다.
> [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

생성 성공은 200이 아니라 201로 구분한다 — 이 작은 차이가 API를 읽는 사람에게 "여기서 무언가 새로 만들어졌다"를 명확히 알립니다. 상태 코드는 단순한 성공/실패가 아니라 "어떤 종류의 성공인가"까지 전달합니다.

## 실전에서

### AI가 만든 API 검토하기

AI에게 "이 API 만들어줘"라고 하면 메서드와 상태 코드를 AI가 대신 고릅니다. 이때 검토 질문이 생깁니다 — "생성인데 왜 200을 반환하지?"(201이 맞음), "이 조회는 왜 POST지?"(GET이 맞음), "이 삭제가 왜 GET이지?"(DELETE여야 함). REST 규약을 알아야 이런 어긋남을 잡아낼 수 있습니다.

### 멱등성은 사람이 검증할 지점

가장 위험한 것은 AI가 만든 재시도 로직입니다. AI가 "실패하면 3번까지 재시도"를 넣었는데 그 요청이 POST라면, 실패처럼 보였지만 실제로는 성공한 요청이 중복 실행될 수 있습니다. ==멱등성 판단은 AI에게 맡기지 말고 사람이 확인해야 할 지점==입니다 — POST 재시도에는 멱등 키 같은 방어가 함께 있어야 합니다.

### 하나의 자원, 다섯 개의 엔드포인트

작은 CRUD를 설계해 보면 REST의 규칙성이 드러납니다. "할 일(todo)"이라는 자원 하나가 다섯 엔드포인트로 정리됩니다:

- `GET /todos` — 목록 조회 (200)
- `POST /todos` — 새 할 일 생성 (201)
- `GET /todos/7` — 7번 상세 조회 (200)
- `PATCH /todos/7` — 7번 일부 수정, 예: 완료 표시 (200)
- `DELETE /todos/7` — 7번 삭제 (200/204)

경로에 동사(`/createTodo`, `/getTodoList`)가 하나도 없다는 점에 주목하세요. 동작은 전부 메서드가 표현하므로, ==경로는 자원의 이름만 담습니다==. 이 규칙성 덕분에 다른 자원(`/users`, `/comments`)도 같은 패턴으로 즉시 예측됩니다.

### 상태 코드로 보안 노출 조절

404의 미묘한 용법이 있습니다. 권한 없는 사용자에게 "이 자원은 있지만 접근 불가(403)"라고 알리면, 자원의 존재 자체가 정보 노출입니다. 그래서 민감한 자원은 403 대신 404("없음")로 응답해 존재를 숨기기도 합니다 — 상태 코드 선택이 보안 결정이 되는 순간입니다. MDN도 404 설명에서 "서버는 권한 없는 클라이언트에게 자원의 존재를 숨기기 위해 403 대신 이 응답을 보내기도 한다"고 명시합니다.

> [!TIP]
> API를 설계할 때 "이 동작은 GET인가 POST인가"가 헷갈리면, ==이 요청을 두 번 보내도 괜찮은가==를 물어보세요. 괜찮으면(조회·교체·삭제) idempotent 메서드, 두 번 보내면 문제가 되면(생성·결제) POST입니다. 이 한 질문이 메서드 선택의 절반을 해결합니다.

## 한계와 트레이드오프

**REST는 규약이지 강제가 아닙니다.** HTTP는 GET에 본문을 담는 것을 물리적으로 막지 않고, 생성에 200을 반환해도 동작은 합니다. REST를 지키는 것은 "동작하게 만들기"가 아니라 "읽고 예측할 수 있게 만들기"입니다 — 규약을 어긴 API도 굴러가지만, 그것을 쓰는 사람과 도구가 매번 문서를 확인해야 합니다.

**모든 것이 자원으로 깔끔하게 떨어지지 않습니다.** "로그인", "검색", "일괄 처리" 같은 동작은 자원 모델에 억지로 끼워 맞추기 어렵습니다. REST를 교조적으로 따르기보다, 자원 중심 설계를 기본값으로 하되 예외를 인정하는 실용적 태도가 낫습니다.

**PATCH의 멱등성은 구현에 달렸습니다.** PUT은 전체 교체라 명확히 idempotent지만, PATCH는 "부분 수정"이라 "숫자를 1 증가"처럼 만들면 여러 번 호출 시 결과가 달라집니다. 표의 성질은 일반적 경향이며, 실제 멱등성은 그 엔드포인트를 어떻게 구현했는지에 달려 있습니다.

> [!WARNING]
> 상태 코드를 "다 200으로 주고 본문에 성공/실패를 적는" 설계는 흔한 안티패턴입니다. 이렇게 하면 HTTP 계층의 도구(모니터링·재시도·캐시)가 "성공"으로만 보여 4xx·5xx를 감지하지 못합니다. 오류는 반드시 4xx·5xx 상태 코드로 알려, 기계가 읽을 수 있게 해야 합니다.

### 설명 연습: 리소스, 행동, 결과를 한 문장으로 묶기

REST API를 설명할 때는 URL, method, status code를 따로 외우게 하지 말고 한 문장으로 묶어 보세요. URL은 무엇을 다루는지, method는 무엇을 하려는지, status code는 결과가 어땠는지 말합니다. 예를 들어 목록을 읽는 요청과 새 항목을 만드는 요청은 같은 서버로 가더라도 method와 기대 상태 코드가 다릅니다. 이 세 축이 맞으면 API가 사람과 기계 모두에게 읽힙니다.

또한 좋은 API 설명은 성공만 다루지 않습니다. 인증이 필요하면 401, 권한이 없으면 403, 대상이 없으면 404, 입력이 잘못되면 400 계열로 말해야 클라이언트와 모니터링이 상황을 구분합니다. 200 안에 오류 문장을 숨기면 화면은 당장 처리할 수 있어도 자동화와 운영 도구는 실패를 알 수 없습니다.

## 더 읽기

- [MDN HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) — GET/POST/PUT/PATCH/DELETE 정의, safe·idempotent 분류표
- [MDN HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) — 상태 코드 5클래스와 주요 코드
- [MDN Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) · [MDN Safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP) — 두 성질의 정의

이전 순서: HTTP 요청과 응답의 기본 구조. 다음 순서: [데이터베이스 — 테이블, 데이터 타입, 인덱스](/lessons/database-tables-indexes) — API가 다루는 자원이 실제로 저장되는 곳. 인증(401이 요구하는 것)은 auth-session-token 강의에서 이어집니다.
