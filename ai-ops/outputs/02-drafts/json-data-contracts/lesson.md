## 한 줄 정의

JSON 데이터 계약은 API가 주고받는 JSON body의 field, value type, nesting, optionality를 서로 같은 방식으로 해석하기 위한 프로젝트 수준의 약속입니다. JSON 자체는 RFC 8259가 정의한 text-based, language-independent data interchange format이고, 데이터 계약은 그 format 위에서 "이 endpoint는 어떤 모양의 데이터를 기대하는가"를 명시하는 운영 관점입니다. 따라서 이 강의에서 중요한 구분은 JSON 문법과 API 계약을 섞지 않는 것입니다.

JSON을 안다는 것은 `{ "ok": true }` 같은 문자열을 볼 수 있다는 뜻만이 아닙니다. `JSON.parse()`가 text를 JavaScript value로 바꾸는 단계, `JSON.stringify()`가 JavaScript value를 network에 보낼 string으로 바꾸는 단계, 그리고 HTTP `Content-Type`이 body의 media type을 알려 주는 단계를 나눠 읽을 수 있어야 합니다. ==JSON 데이터 계약은 parsing 성공과 business contract 만족이 서로 다른 문제라는 점을 드러냅니다.==

이전 강의에서 HTTP request/response의 method, headers, body, status를 배웠다면, 이번 강의는 그 body 안쪽을 봅니다. body가 JSON일 때 field 이름 하나가 틀리거나 array/object shape가 바뀌면 UI, TypeScript type, database mapping, AI가 작성한 client code가 모두 다른 방향으로 흔들릴 수 있습니다.

![JSON contract flow](/lesson-diagrams/json-data-contracts/json-contract-flow.svg)

## 왜 존재하는가

웹 API는 client와 server가 같은 데이터를 서로 다른 runtime에서 다룹니다. server는 database record를 JSON response로 만들 수 있고, browser는 그 response를 JavaScript object처럼 접근해 화면을 그릴 수 있습니다. 이 사이에서 JSON은 structured data를 문자열로 표현해 network across transmit할 수 있게 해 줍니다.

문제는 JSON 문법이 맞는 것만으로는 앱이 원하는 의미가 보장되지 않는다는 데 있습니다. `{"items":[]}`와 `{"items":{}}`는 둘 다 문법적으로 가능한 JSON일 수 있지만, list UI가 기대하는 shape는 완전히 다릅니다. `completed`가 boolean인지 string인지, `updatedAt`이 항상 있는지 optional인지, error body가 `{ "message": "..." }`인지 `{ "error": "..." }`인지에 따라 client code의 조건문과 화면 표현이 달라집니다.

초보자는 종종 JSON과 JavaScript object literal을 같은 것으로 생각합니다. 문법이 닮았기 때문입니다. 하지만 MDN은 JSON이 JavaScript object literal syntax와 closely resembles하더라도 independently from JavaScript used될 수 있다고 설명합니다. 또한 comments, trailing commas, functions, `Date`, `Set`, `Map` 같은 JavaScript object type은 JSON data type이 아닙니다. 이 차이를 놓치면 "콘솔에서는 object인데 서버로 보내니 안 된다"는 문제가 반복됩니다.

JSON 데이터 계약은 이 모호함을 줄이기 위해 생깁니다. 표준이 새로 생긴 것이 아니라, JSON과 HTTP의 공식 동작 위에 "우리 API에서는 어떤 shape가 정상인가"를 적는 방식입니다. AI 시대에는 이 약속이 더 중요해집니다. AI는 그럴듯한 field 이름을 만들 수 있고, status code만 보고 body shape를 추측할 수 있습니다. 계약이 없으면 AI가 맞혔는지 틀렸는지 검토할 기준도 흐려집니다.

> [!KEY]
> JSON 문법은 "읽을 수 있는 문자열인가"를 말하고, 데이터 계약은 "이 API가 약속한 의미와 shape인가"를 말합니다.

## 작동 원리

### 1. HTTP message body에 JSON text가 들어갑니다

JSON은 API에서 보통 HTTP request/response body로 이동합니다. client가 server에 progress 저장 요청을 보내거나, server가 lesson list를 응답할 때 body가 JSON text일 수 있습니다. 이때 body가 어떤 media type인지 알려 주는 위치가 HTTP `Content-Type` header입니다. MDN Content-Type 문서는 response에서 returned data의 media type을 client에게 알려 주고, POST/PUT request에서 client가 server에 보내는 content type을 지정한다고 설명합니다.

따라서 JSON 데이터 계약은 body만 보지 않습니다. method, path, status, headers, body를 함께 봅니다. `POST /api/progress` request body가 JSON이라면, 그 body를 만든 코드가 `JSON.stringify()`를 사용했는지, header에 `Content-Type: application/json`이 있는지, response status와 response body shape가 함께 맞는지를 확인해야 합니다.

### 2. JSON text는 object와 array의 조합으로 structured data를 표현합니다

RFC 8259는 JSON object를 name/value pairs의 unordered collection으로, array를 ordered sequence of values로 설명합니다. 이 두 구조가 API shape의 대부분을 만듭니다. lesson list는 array일 수 있고, lesson detail은 object일 수 있으며, object 안에 nested array가 들어갈 수 있습니다.

여기서 "계약"은 object와 array의 조합을 읽을 수 있는 표로 바꾸는 일입니다. 예를 들어 progress API의 response가 아래 shape를 가진다고 합시다.

```json
{
  "lessonId": "json-data-contracts",
  "completed": true,
  "updatedAt": "2026-07-06T00:00:00Z"
}
```

이 body에서 `lessonId`는 string, `completed`는 boolean, `updatedAt`은 string으로 약속됩니다. JSON 문법만으로는 `updatedAt`이 ISO timestamp인지, optional인지, 빈 문자열을 허용하는지 알 수 없습니다. 그래서 API 문서나 TypeScript type, test fixture, validation schema 같은 후속 장치가 필요해집니다. 이 강의는 그 후속 장치 전체를 다루지는 않지만, 출발점은 JSON shape를 명확히 읽는 것입니다.

### 3. Serialization과 deserialization을 분리합니다

MDN은 string을 native object로 바꾸는 것을 deserialization, native object를 network 전송 가능한 string으로 바꾸는 것을 serialization이라고 설명합니다. JavaScript에서는 `JSON.parse()`와 `JSON.stringify()`가 이 경계를 담당합니다. `JSON.parse()`는 JSON string을 JavaScript value 또는 object로 만들고, `JSON.stringify()`는 JavaScript value를 JSON string으로 바꿉니다.

이 구분은 실무에서 자주 중요합니다. `fetch()` request body에 JavaScript object를 그대로 넣는 것은 JSON text를 보낸 것이 아닙니다. network body는 text 또는 byte representation으로 이동하므로, JSON body를 보내려면 JavaScript value를 JSON string으로 serialize해야 합니다. 반대로 response를 받은 뒤 `response.json()`이나 `JSON.parse()`가 성공했다고 해서 field가 모두 contract와 맞는 것은 아닙니다. parse는 syntax를 value로 바꾼 것이고, contract check는 그 다음 단계입니다.

==Parsing은 시작점이고, field 검증은 별도 단계입니다.== 이 한 문장을 놓치면 AI가 만든 client code를 검토할 때 "JSON.parse가 있으니 안전하다"는 잘못된 결론을 내리기 쉽습니다.

### 4. JavaScript object와 JSON text를 혼동하지 않습니다

JSON text는 JavaScript object literal과 매우 비슷하게 보입니다. 하지만 JSON은 string data format이고, JavaScript object는 runtime value입니다. JSON string은 double quotes를 써야 하며 comments와 trailing commas가 허용되지 않습니다. `undefined`, `NaN`, `Infinity`, functions, `Date`, `Set`, `Map` 같은 값은 JSON data type으로 그대로 표현되지 않습니다.

이 차이는 AI 코드 리뷰에서 자주 드러납니다. AI가 sample body를 작성하면서 single quote, trailing comma, function value, `undefined`를 넣었다면 그것은 JavaScript object 예시이지 JSON body 예시가 아닐 수 있습니다. 반대로 코드 안에서 `{ completed: true }`를 만들고 `JSON.stringify()`를 거치면 network로 보낼 JSON string이 됩니다. text, runtime value, network body를 한 층씩 분리해야 합니다.

### 5. Contract는 field presence, type, nesting, error shape를 기록합니다

JSON 데이터 계약은 보통 다음 질문에 답합니다. 어떤 field가 반드시 있는가? 어떤 field가 optional인가? value type은 string, number, boolean, null, object, array 중 무엇인가? array item의 shape는 무엇인가? error response는 success response와 같은 field를 쓰는가? status code별 body shape가 다른가?

이 질문은 JSON 표준 문서에 그대로 나오는 API 설계 규칙은 아닙니다. 하지만 JSON의 object/array/value model과 HTTP body/media type 규칙이 있기 때문에 프로젝트가 그 위에 의미 계약을 세울 수 있습니다. 따라서 강의에서는 data contract를 표준 용어처럼 과장하지 않고, API 실무에서 body shape를 명시하는 학습용 운영 개념으로 사용합니다.

### 6. TypeScript는 contract를 코드로 옮기는 후속 도구입니다

TypeScript type system은 JSON data contract를 코드 쪽에서 표현하는 다음 단계가 될 수 있습니다. 예를 들어 API response shape를 type alias로 적으면 component가 어떤 property를 읽을 수 있는지 실행 전에 검토할 수 있습니다.

```ts
type LessonProgress = {
  lessonId: string;
  completed: boolean;
  updatedAt?: string;
};
```

하지만 TypeScript type은 external JSON을 runtime에서 자동 검증하지 않습니다. TypeScript는 코드 실행 전에 value shape와 behavior를 예측하는 static type-checking 체계입니다. server에서 온 실제 JSON이 이 type과 맞는지는 parsing 이후 별도로 확인해야 합니다. 이 구분은 `typescript-type-system` 강의에서 더 깊게 다룹니다.

> [!WARNING]
> TypeScript type을 적었다고 외부 JSON이 자동으로 안전해지는 것은 아닙니다. type은 코드의 약속이고, network input은 runtime evidence입니다.

## 스펙과 세부

### JSON value의 범위

RFC 8259와 MDN 설명을 기준으로 JSON은 strings, numbers, booleans, null, objects, arrays를 표현합니다. object는 name/value pairs이고 array는 ordered sequence입니다. 이 제한은 단순 암기가 아니라 data contract의 후보 값을 좁히는 역할을 합니다. function, class instance, `Date` object 자체를 계약에 넣을 수 없으므로, 날짜는 string format 같은 representation으로 정해야 합니다.

### JSON string과 MIME type

MDN은 JSON file이 `.json` extension과 `application/json` MIME type을 가질 수 있다고 설명합니다. HTTP body에서 JSON을 보낼 때는 `Content-Type: application/json`을 함께 확인해야 합니다. 특히 strict content type handling 환경에서는 잘못된 content type이 415 client error response로 이어질 수 있습니다.

### `JSON.parse()`의 한계

`JSON.parse()`는 JSON string을 JavaScript value 또는 object로 만듭니다. 하지만 parse가 성공했다는 것은 syntax가 유효했다는 뜻에 가깝습니다. `{"completed":"true"}`도 문법적으로는 가능하지만, contract가 boolean `completed`를 기대한다면 의미적으로 틀린 response입니다. 따라서 parse 이후에는 expected field, type, optional field, array item shape를 확인해야 합니다.

### `JSON.stringify()`의 한계

`JSON.stringify()`는 JavaScript value를 JSON string으로 바꿉니다. 그러나 어떤 JavaScript value가 어떻게 JSON에 표현되는지, 혹은 표현되지 않는지는 주의해야 합니다. KB는 JSON data type이 아닌 JavaScript object types가 그대로 JSON type이 아니라고 정리합니다. request body를 만들 때 "object를 stringify했다"는 사실과 "계약에 맞는 body를 보냈다"는 사실은 다릅니다.

### 계약은 endpoint별로 달라집니다

같은 JSON이라도 endpoint마다 shape가 다릅니다. list endpoint는 array를 반환하고 detail endpoint는 object를 반환할 수 있습니다. mutation endpoint는 success body와 error body가 다를 수 있습니다. status code와 body shape도 함께 문서화해야 합니다. status만 보고 body를 추측하지 않고, body만 보고 HTTP 결과를 추측하지 않는 것이 핵심입니다.

## 원문으로 읽기

> "JavaScript Object Notation (JSON) is a lightweight, text-based, language-independent data interchange format."
>
> — JavaScript Object Notation(JSON)은 가볍고 text 기반이며 언어 독립적인 data interchange format이다.
> [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)

이 문장은 JSON을 JavaScript 전용 객체 문법으로 좁히지 않게 해 줍니다. JSON은 JavaScript에서 왔지만 language-independent format으로 쓰입니다. API 계약을 설계할 때도 "JavaScript object처럼 보인다"가 아니라 "언어와 runtime을 넘어 주고받는 text format"이라는 기준으로 봐야 합니다.

> "JSON is a text-based data format following JavaScript object syntax."
>
> — JSON은 JavaScript object syntax를 따르는 text-based data format이다.
> [Working with JSON — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) (CC-BY-SA)

MDN의 이 문장은 JSON이 왜 초보자에게 헷갈리는지 보여 줍니다. JavaScript object syntax를 따르기 때문에 익숙해 보이지만, 핵심은 text-based data format이라는 점입니다. 즉 runtime object와 network text 사이에는 변환 단계가 있습니다.

> "It represents structured data as a string, which is useful when you want to transmit data across a network."
>
> — JSON은 structured data를 string으로 표현하며, network across data를 전송하려 할 때 유용하다.
> [Working with JSON — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) (CC-BY-SA)

이 인용은 JSON 데이터 계약이 HTTP와 만나는 이유를 설명합니다. network를 건널 때 structured data는 string representation이 되고, 수신자는 다시 value로 해석합니다. 이 왕복 과정에서 shape를 명시하지 않으면 서로 다른 쪽이 같은 데이터를 다르게 이해할 수 있습니다.

> "The `JSON.parse()` static method parses a JSON string, constructing the JavaScript value or object described by the string."
>
> — `JSON.parse()` static method는 JSON string을 parse해 그 string이 설명하는 JavaScript value 또는 object를 만든다.
> [JSON.parse() — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) (CC-BY-SA)

parse는 string을 value로 바꾸는 단계입니다. 이 문장을 정확히 읽으면 parse와 validation을 구분할 수 있습니다. parse 이후에 contract check가 필요하다는 실무 판단은 이 구분에서 나옵니다.

## 실전에서

### 1. API response 예시를 contract 표로 바꿉니다

response body 예시를 받으면 먼저 field 표를 만듭니다. field name, JSON type, required 여부, 의미를 분리합니다. 이 표는 문서, test fixture, TypeScript type의 출발점이 됩니다.

```txt
Endpoint: GET /api/progress/:lessonId
Status: 200
Content-Type: application/json

field      type     required  meaning
lessonId   string   yes       lesson slug
completed  boolean  yes       completion state
updatedAt  string   no        last update timestamp representation
```

이 표는 JSON 표준 문서가 제공하는 것이 아니라 프로젝트가 만드는 계약입니다. 그러나 object field와 value type이라는 JSON의 기본 구조를 사용하기 때문에 누구나 검토할 수 있습니다.

### 2. Request body를 만들 때 stringify와 Content-Type을 함께 봅니다

```ts
await fetch("/api/progress", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    lessonId: "json-data-contracts",
    completed: true,
  }),
});
```

이 예시에서 `JSON.stringify()`는 JavaScript value를 JSON string으로 바꾸고, `Content-Type`은 request content type을 server에 알립니다. 둘 중 하나만 보면 부족합니다. object를 string으로 바꾸지 않으면 body representation이 기대와 다를 수 있고, Content-Type이 빠지면 server가 body를 어떻게 해석해야 하는지 불명확해질 수 있습니다.

### 3. Response parsing 뒤에 contract check를 둡니다

```ts
type LessonProgress = {
  lessonId: string;
  completed: boolean;
  updatedAt?: string;
};

function isLessonProgress(value: unknown): value is LessonProgress {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.lessonId === "string" &&
    typeof record.completed === "boolean" &&
    (record.updatedAt === undefined || typeof record.updatedAt === "string")
  );
}
```

이 코드는 TypeScript type과 runtime check를 구분하기 위한 최소 예시입니다. 완전한 validation library를 다루는 강의는 아니지만, 핵심은 외부 JSON을 `unknown`으로 받고 실제 field를 확인한다는 점입니다. AI가 API client를 만들 때 이런 boundary check를 생략하면 type은 있어도 runtime input은 검증되지 않습니다.

### 4. AI에게는 body shape evidence를 함께 줍니다

AI에게 "API 응답이 이상합니다"라고 말하면 AI는 서버, 네트워크, UI를 모두 추측해야 합니다. 대신 request/response와 JSON shape를 함께 줍니다.

```txt
Expected:
{ "items": [{ "id": "a", "title": "..." }] }

Actual:
{ "items": { "id": "a", "title": "..." } }

Error:
items.map is not a function
```

이 evidence는 원인을 훨씬 좁힙니다. JSON syntax는 둘 다 가능하지만, data contract는 array를 기대했고 실제 response는 object였습니다. AI가 수정해야 할 위치도 response producer인지 client contract인지 나눠 볼 수 있습니다.

> [!EXAMPLE]
> JSON parsing failed와 parsing은 성공했지만 expected field가 없다는 상황은 서로 다른 사건입니다. error message와 actual body를 함께 기록해야 합니다.

## 한계와 트레이드오프

첫째, JSON 데이터 계약은 보안 장치 자체가 아닙니다. body shape를 명시하면 오류를 줄일 수 있지만 XSS, CSRF, authorization 같은 보안 문제를 자동으로 해결하지 않습니다. user input이 화면에 렌더링되는 경로, authenticated request, origin 정책은 `web-security-basics`에서 별도로 봐야 합니다.

둘째, TypeScript type은 external JSON runtime validation을 대체하지 않습니다. type alias는 codebase 안에서 shape를 설명하지만, server가 실제로 다른 body를 보내는 순간 runtime check가 없으면 오류가 늦게 드러납니다. 이 때문에 boundary validation, test fixture, contract test 같은 실무 장치가 필요해질 수 있습니다.

셋째, JSON은 모든 데이터를 완벽하게 표현하지 않습니다. function, `Date`, `Map`, `Set` 같은 JavaScript runtime object를 그대로 담는 format이 아닙니다. 필요한 경우 string, array, object representation으로 바꾸어 계약해야 합니다. 이 representation을 문서화하지 않으면 같은 field를 서로 다르게 해석할 수 있습니다.

넷째, 계약이 너무 느슨하면 도움이 되지 않고, 너무 상세하면 변경 비용이 커집니다. 초보 단계에서는 모든 validation framework를 도입하기보다 endpoint별 success/error example, required field, optional field, type을 먼저 기록하는 것이 좋습니다. 그다음 TypeScript type과 runtime validation을 상황에 맞게 추가합니다.

마지막으로, JSON data contract라는 표현은 이 강의의 학습용 운영 용어입니다. 공식 JSON 표준이 "data contract"라는 API 설계 방법론을 정의하는 것은 아닙니다. ==표준은 JSON format을 정의하고, 프로젝트는 그 format 위에 의미 계약을 세웁니다.==

## 더 읽기

먼저 [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)를 기준점으로 둡니다. JSON의 공식 정의, object와 array, value 범위를 확인하면 JSON을 JavaScript object와 분리해서 볼 수 있습니다.

다음으로 MDN의 [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON)을 읽습니다. JSON이 structured data를 string으로 표현하고 network transmission에 쓰인다는 큰 그림, parsing/stringifying 흐름을 확인합니다.

그다음 [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)와 [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)를 함께 읽습니다. 두 문서를 쌍으로 읽어야 serialization/deserialization 경계가 분명해집니다.

마지막으로 [Content-Type header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type)를 읽어 JSON body가 HTTP message에서 어떻게 media type으로 식별되는지 확인합니다.

후속 학습은 `web-security-basics`와 `typescript-type-system`입니다. JSON body는 user input과 server output을 담을 수 있으므로 보안 경계와 연결되고, TypeScript는 JSON shape를 코드에서 표현하는 다음 도구가 됩니다.
