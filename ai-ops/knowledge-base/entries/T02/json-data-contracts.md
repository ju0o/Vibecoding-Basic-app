---
id: json-data-contracts
title: "JSON Data Contracts (JSON 데이터 계약)"
topicGroup: T02
status: approved
score: 89
level: 기초
prerequisites: [http-request-response]
successors: [web-security-basics, rest-api-design]
related: [web-security-basics, typescript-type-system]
consumers:
  lessons: [json-data-contracts]
  glossary: [JSON, Data Contract, JSON.parse, JSON.stringify, Content-Type, API Response Shape]
sources:
  - { title: "Working with JSON", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON", checked: 2026-07-06 }
  - { title: "JSON.parse()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse", checked: 2026-07-06 }
  - { title: "JSON.stringify()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify", checked: 2026-07-06 }
  - { title: "RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format", url: "https://datatracker.ietf.org/doc/html/rfc8259", checked: 2026-07-06 }
  - { title: "Content-Type header", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
JSON 데이터 계약은 API가 주고받는 JSON의 필드와 값 모양에 대한 약속이다. JSON 자체는 RFC 8259가 정의한 lightweight, text-based, language-independent data interchange format이며 structured data를 portable하게 표현하는 formatting rules를 제공한다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06)
MDN은 JSON을 JavaScript object syntax를 기반으로 한 standard text-based format이며 web applications에서 server와 client 사이에 data를 transmit할 때 commonly used한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
이 KB에서 "data contract"는 별도 표준 이름이 아니라 API request/response body가 어떤 JSON shape를 가져야 하는지 프로젝트 안에서 명시하는 학습용 용어다. 이 용어의 사실 근거는 JSON grammar, parsing/stringifying, HTTP Content-Type의 공식 문서 설명이다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 역사
RFC 8259는 JSON을 ECMAScript Programming Language Standard에서 파생된 text format으로 설명하고, JSON이 structured data serialization을 위한 format이라고 정리한다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06)
MDN은 JSON이 JavaScript object literal syntax와 닮았지만 JavaScript와 독립적으로 사용될 수 있고, 많은 programming environments가 JSON을 read(parse)하고 generate하는 기능을 제공한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
웹 API에서 JSON은 HTTP request/response body와 결합된다. MDN Content-Type 문서는 response에서 Content-Type이 returned data의 media type을 client에게 알려 주고, POST/PUT request에서 client가 server에 보내는 content type을 지정한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 해결하려는 문제
JSON 모양을 계약으로 보지 않으면 API 문제를 "데이터가 이상하다"는 모호한 말로만 설명하게 된다. MDN은 JSON을 network across transmit하기 위한 structured data string으로 설명하므로, field name, value type, nesting, array shape를 구분해야 server와 client가 같은 data를 해석할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
JSON syntax restriction을 모르면 JavaScript object literal과 JSON text를 혼동한다. MDN은 JSON이 JavaScript object literal과 닮았지만 모든 JavaScript object literal이 valid JSON인 것은 아니며, string은 double quotes를 써야 하고 comments와 trailing commas는 허용되지 않는다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
HTTP message body의 type을 기록하지 않으면 server가 body를 어떻게 해석해야 하는지 불명확해진다. MDN Content-Type 문서는 strict content type handling 환경에서 잘못된 content type이 415 client error response로 이어질 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 핵심 개념
1. JSON text: RFC 8259는 JSON을 structured data serialization을 위한 text format으로 정의하고, strings, numbers, booleans, null, objects, arrays를 표현할 수 있다고 설명한다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06)
2. Object와 array shape: RFC 8259는 object를 name/value pairs의 unordered collection으로, array를 ordered sequence of values로 설명한다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06)
3. Syntax restriction: MDN은 JSON이 serializable data types만 담을 수 있고 `undefined`, `NaN`, `Infinity`, functions, `Date`, `Set`, `Map` 같은 JavaScript object types는 JSON data type이 아니라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
4. Parsing: MDN은 `JSON.parse()`가 JSON string을 parse해 JavaScript value 또는 object를 만든다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, 확인: 2026-07-06)
5. Stringifying: MDN은 `JSON.stringify()`가 JavaScript value를 JSON string으로 변환한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify, 확인: 2026-07-06)
6. Media type: MDN은 JSON file이 `.json` extension과 `application/json` MIME type을 가질 수 있다고 설명하고, Content-Type header가 returned data 또는 request content의 media type을 알려 준다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)
7. Contract mindset: API에서 JSON body를 다룰 때 field presence, value type, optionality, error shape를 별도로 기록하는 것은 JSON syntax와 HTTP Content-Type의 공식 동작 위에 세우는 프로젝트 수준 약속이다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 관련 기술
HTTP request/response는 JSON data contract가 오가는 message layer다. Content-Type은 body의 media type을 나타내고, HTTP status code는 request 처리 결과를 나타내므로 JSON error body와 status code를 함께 읽어야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)
Fetch API의 `Response.json()`은 network response를 JavaScript object로 다루는 예다. MDN Working with JSON은 Fetch API로 JSON resource를 가져오고 `Response.json()`으로 response를 JSON으로 retrieve하는 예시를 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
TypeScript type system은 JSON data contract를 코드에서 표현하는 다음 단계가 될 수 있다. TypeScript가 static typechecker로 value shape와 behavior를 코드 실행 전 예측하게 한다는 설명은 JSON shape를 타입으로 표현하는 후속 학습과 연결된다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)

## 선행 개념
http-request-response: JSON data contract는 HTTP body 안에서 전달되는 경우가 많으므로 request method, path, headers, body, response status를 먼저 구분해야 한다. Content-Type header가 request/response content type을 나타낸다는 MDN 설명은 HTTP message 구조 이해를 전제로 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 후행 개념
web-security-basics: JSON body는 user input과 server output을 담을 수 있으므로 XSS, CSRF, CORS 같은 보안 주제를 이해할 때 request body, response body, origin, Content-Type을 함께 다뤄야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)
typescript-type-system: JSON shape를 TypeScript object types, optional properties, union types로 표현하면 API response를 UI 코드에서 검토하기 쉬워진다. TypeScript docs는 object type이 properties와 types를 list한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
rest-api-design: JSON contract는 REST API request/response examples, error format, status code와 함께 문서화되는 재료가 된다. 이 연결은 HTTP message와 JSON body의 공식 동작 위에 세우는 후속 설계 주제다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## AI 시대에서의 의미
AI에게 API 오류를 맡길 때 JSON data contract를 함께 주면 "응답이 이상하다"가 아니라 "response body의 `items`가 array가 아니라 object로 왔다"처럼 대조 가능한 evidence가 된다. JSON parsing과 object access가 별도 단계라는 MDN 설명은 AI 디버깅 입력을 request/response evidence와 body shape evidence로 분리하게 해 준다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, 확인: 2026-07-06)
AI가 생성한 API client code를 검토할 때 `JSON.stringify()` 사용 여부, request Content-Type, response parsing, optional fields 처리 여부를 확인해야 한다. MDN은 `JSON.stringify()`가 JavaScript value를 JSON string으로 변환하고, Content-Type이 request content type을 지정한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)
AI 시대의 "계약"은 거창한 문서가 아니라 입력과 출력의 shape를 명시해 모델이 추측하지 않게 만드는 운영 장치다. 이 주장은 JSON structured data와 HTTP media type의 공식 동작에 기반한 프로젝트 운영 원칙이다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 실무 활용
1. API response 예시 기록: endpoint별 success body와 error body를 JSON 예시로 남긴다. JSON object와 array shape는 RFC 8259의 object/array 정의에 근거해 field와 nesting을 분리해 기록한다. (근거: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06)

```json
{
  "lessonId": "http-request-response",
  "completed": true,
  "updatedAt": "2026-07-06T00:00:00Z"
}
```

2. Fetch request 작성: POST/PUT request에서 JSON body를 보내면 `Content-Type: application/json`과 `JSON.stringify()`를 함께 검토한다. Content-Type은 request content type을 지정하고, `JSON.stringify()`는 JavaScript value를 JSON string으로 변환한다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify, 확인: 2026-07-06)

```js
await fetch("/api/progress", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ lessonId: "http-request-response", completed: true }),
});
```

3. Response parsing 확인: `JSON.parse()`나 `Response.json()` 이후의 값은 JavaScript object처럼 dot/bracket notation으로 접근할 수 있지만, JSON syntax 자체와 JavaScript object value를 혼동하지 않는다. MDN은 parsing 이후 object처럼 접근한다고 설명한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, 확인: 2026-07-06)

## FAQ
Q: JSON은 JavaScript object와 같은가?
A: 아니다. MDN은 JSON이 JavaScript object literal syntax와 닮았지만 JavaScript와 독립적으로 사용될 수 있고, 모든 JavaScript object literal이 valid JSON인 것은 아니라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)

Q: JSON에는 함수나 날짜 객체를 그대로 넣을 수 있는가?
A: JSON data type은 strings, numbers, booleans, null, objects, arrays를 표현하며, MDN은 functions, Date, Set, Map 같은 JavaScript object types가 JSON data type이 아니라고 설명한다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)

Q: Content-Type이 꼭 필요한가?
A: server와 client가 body의 media type을 해석해야 하므로 중요하다. MDN은 response에서 Content-Type이 returned data의 media type을 알려 주고, request에서 client가 보내는 content type을 지정한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

Q: data contract는 표준 용어인가?
A: 이 KB에서는 프로젝트 학습용 용어로 사용한다. 공식 근거는 JSON의 structured data 표현, parse/stringify 동작, HTTP Content-Type의 media type 전달이며, 계약이라는 말은 API에서 기대 body shape를 명시한다는 운영 관점이다. (출처: https://datatracker.ietf.org/doc/html/rfc8259, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: JSON을 JavaScript object literal과 완전히 같다고 생각한다. 왜 생기나: 문법이 닮았기 때문이다. 교정: comments, trailing commas, single quotes, functions 같은 차이를 MDN JSON syntax restrictions로 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON, 확인: 2026-07-06)
2. 실수: `JSON.parse()` 결과를 검증 없이 원하는 field가 있다고 가정한다. 왜 생기나: parsing 성공과 contract 만족을 같은 것으로 보기 때문이다. 교정: parse는 JSON string을 JavaScript value/object로 만드는 단계이고, field presence와 type은 별도로 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, 확인: 2026-07-06)
3. 실수: POST body에 object를 그대로 넣고 Content-Type도 빠뜨린다. 왜 생기나: JavaScript value와 HTTP body text를 구분하지 못하기 때문이다. 교정: JSON body는 `JSON.stringify()`로 만들고 request Content-Type을 기록한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)
4. 실수: status code만 보고 response body shape를 보지 않는다. 왜 생기나: HTTP result와 JSON payload를 한 덩어리로 보기 때문이다. 교정: status, headers, body, JSON shape를 각각 기록한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type, 확인: 2026-07-06)

## 공식 출처
- JSON은 lightweight, text-based, language-independent data interchange format이다 — [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259) (확인: 2026-07-06)
- JSON은 web applications에서 server와 client 사이 data transmit에 commonly used된다 — [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) (확인: 2026-07-06)
- JSON syntax restrictions와 parsing 후 object access 설명 — [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) (확인: 2026-07-06)
- `JSON.parse()`는 JSON string을 JavaScript value/object로 parse한다 — [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) (확인: 2026-07-06)
- `JSON.stringify()`는 JavaScript value를 JSON string으로 변환한다 — [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) (확인: 2026-07-06)
- Content-Type은 request/response content media type을 나타낸다 — [Content-Type header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type) (확인: 2026-07-06)

## Quote Bank
- > "JavaScript Object Notation (JSON) is a lightweight, text-based, language-independent data interchange format."
  - 출처: [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259) (확인: 2026-07-06)
  - 맥락: JSON의 표준 정의를 설명할 때 사용한다.
- > "JSON is a text-based data format following JavaScript object syntax."
  - 출처: [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) (확인: 2026-07-06)
  - 맥락: JSON이 JavaScript syntax와 닮았지만 text format임을 설명할 때 사용한다.
- > "It represents structured data as a string, which is useful when you want to transmit data across a network."
  - 출처: [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) (확인: 2026-07-06)
  - 맥락: API body와 network transmission 맥락을 설명할 때 사용한다.
- > "The `JSON.parse()` static method parses a JSON string, constructing the JavaScript value or object described by the string."
  - 출처: [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) (확인: 2026-07-06)
  - 맥락: JSON text와 JavaScript value 변환을 설명할 때 사용한다.
- > "The `JSON.stringify()` static method converts a JavaScript value to a JSON string"
  - 출처: [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) (확인: 2026-07-06)
  - 맥락: request body serialization을 설명할 때 사용한다.
- > "The HTTP `Content-Type` representation header is used to indicate the original media type of a resource"
  - 출처: [Content-Type header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type) (확인: 2026-07-06)
  - 맥락: JSON body와 HTTP header의 연결을 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
