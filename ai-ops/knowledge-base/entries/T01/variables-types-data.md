---
id: variables-types-data
title: "Variables, Types, and Data Shapes (변수·타입·데이터 모양)"
topicGroup: T01
status: approved
score: 92
level: 입문
prerequisites: [files-folders-paths]
successors: [control-flow-functions-errors, json-data-contracts, typescript-type-system]
related: [debugging-error-reading, package-json-semver]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Storing the information you need — Variables", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables", checked: 2026-07-06 }
  - { title: "JavaScript data types and data structures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures", checked: 2026-07-06 }
  - { title: "Grammar and types", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types", checked: 2026-07-06 }
  - { title: "Working with objects", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects", checked: 2026-07-06 }
  - { title: "Indexed collections", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
변수는 프로그램이 값을 이름으로 저장하고 다시 사용하게 하는 이름표다. MDN은 variable을 value를 담는 container라고 설명하고, JavaScript에서는 `let`, `const`, `var`로 변수를 선언할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)
타입은 값이 숫자, 문자열, 불리언, 객체, 배열 같은 어떤 종류의 데이터인지 나타내는 분류다. MDN은 JavaScript value가 primitive values 또는 objects로 나뉘며, primitive type으로 string, number, bigint, boolean, undefined, symbol, null을 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)

## 역사
JavaScript는 웹 페이지에서 값을 저장하고 조작하기 위해 변수, 표현식, 객체, 배열 같은 언어 요소를 사용한다. MDN의 JavaScript Guide는 grammar and types, data structures, objects, indexed collections를 별도 주제로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
2026-07-06 기준 MDN은 `var`보다 `let`과 `const`를 기본적인 변수 선언 방식으로 가르치며, `const`는 재할당할 필요가 없는 값을 선언할 때 쓰는 방식으로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)
객체와 배열은 단일 값이 아니라 여러 값을 묶어 구조를 만드는 방식으로 발전했다. MDN은 objects를 properties의 collection으로 설명하고, indexed collections는 numeric index로 정렬된 값을 다루는 구조로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)

## 해결하려는 문제
변수가 없으면 같은 값을 여러 번 쓰거나, 계산 중간 결과를 저장하거나, 사용자 입력을 다음 단계로 넘기기 어렵다. MDN은 variable을 value를 담는 container로 설명하고, 값을 선언한 뒤 다시 참조하는 예제를 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)
타입을 모르면 `1`과 `"1"`처럼 겉보기에는 비슷하지만 동작이 다른 값을 구분하기 어렵다. MDN은 JavaScript가 dynamic language이며, variable이 type과 직접 연결되지 않고 value가 type을 갖는다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
데이터 모양을 모르면 API 응답, 설정 파일, UI 상태처럼 여러 필드가 묶인 값을 읽고 수정하기 어렵다. MDN은 objects가 key와 value 사이의 connection을 나타내는 properties의 collection이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06)

## 핵심 개념
1. 변수 선언: MDN은 `let`, `const`, `var`를 변수 선언 방식으로 설명하고, modern JavaScript에서는 `let`과 `const`를 먼저 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)
2. 재할당: `let`으로 선언한 변수는 다른 값을 다시 담을 수 있고, `const`는 같은 binding에 새 값을 다시 할당할 수 없다. 이 구분은 MDN variables 문서의 `let`과 `const` 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)
3. 값의 타입: MDN은 JavaScript value가 primitive values 또는 objects 중 하나라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
4. 동적 타입: MDN은 JavaScript가 dynamically typed language이며 variable이 아닌 value가 type을 갖는다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
5. Object: MDN은 object를 properties의 collection으로 설명하고, property가 name 또는 key와 value의 연결이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06)
6. Array: MDN indexed collections 문서는 Array object가 list-like objects이며 indexed collections를 다루는 방식이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)
7. Literal: MDN grammar and types 문서는 array literal, boolean literal, object literal, numeric literal, string literal 같은 literal 형태를 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types, 확인: 2026-07-06)

## 관련 기술
- JavaScript type vs TypeScript type: 이 KB는 JavaScript runtime value의 type과 데이터 모양을 다룬다. TypeScript type system은 후속 KB에서 static type checking과 연결해 다룬다. MDN은 JavaScript value가 type을 갖는다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
- Object vs Array: object는 key-value property collection이고 array는 index로 순서가 있는 list-like object다. 이 차이는 MDN working with objects와 indexed collections 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)
- Variable vs value: variable은 값을 가리키는 이름이고, type은 value가 가진 분류다. MDN은 JavaScript variable이 type과 직접 연결되지 않고 value가 type을 갖는다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
- Data shape vs JSON contract: object와 array 모양을 이해하면 JSON data contract를 읽을 수 있다. MDN object와 array 설명은 JSON을 다루기 전 선행 지식으로 쓰인다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)

## 선행 개념
- files-folders-paths: 코드 파일 안에 변수 선언이 있고, 설정 파일과 데이터 파일은 object나 array 모양의 값을 저장한다. 파일과 경로를 알아야 코드 예시가 어느 파일에서 실행되는지 추적할 수 있다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)

## 후행 개념
- control-flow-functions-errors: 조건문과 함수는 변수에 담긴 값을 읽고 판단하거나 새 값을 반환한다. MDN variables 문서와 functions 문서는 변수와 함수가 함께 예제에 등장한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)
- json-data-contracts: 객체와 배열 구조를 이해하면 JSON 응답의 필드와 배열을 읽을 수 있다. MDN object와 indexed collections 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)
- typescript-type-system: JavaScript runtime value와 data shape를 이해해야 TypeScript의 static type 설명을 구분할 수 있다. MDN은 JavaScript가 dynamically typed라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)

## AI 시대에서의 의미
AI 코딩 도구가 코드를 생성할 때 변수 이름, 타입 가정, object shape를 잘못 잡으면 UI와 API 사이의 데이터 흐름이 어긋난다. JavaScript value가 type을 갖고 object가 key-value property collection이라는 MDN 설명은 AI가 만든 데이터 구조를 검토하는 기준이 된다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06)
AI에게 오류를 설명할 때는 "값이 없다"보다 어떤 variable, 어떤 type, 어떤 object property가 예상과 다른지 말해야 한다. 이 연결은 MDN의 variables, data structures, objects 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)

## 실무 활용
1. UI 상태 모델링: form input의 text는 string, checkbox는 boolean, list는 array, user profile은 object로 표현한다. MDN data structures와 objects 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06)
2. API 응답 확인: 서버에서 온 값이 object인지 array인지, 필요한 property가 있는지 확인한다. MDN object와 indexed collections 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)
3. 상수와 변수 구분: 재할당하지 않는 설정값은 `const`, 흐름 중 바뀌는 값은 `let`으로 선언한다. MDN variables 문서에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)

```js
const user = {
  name: "Ada",
  learningStreak: 3,
  bookmarkedLessons: ["files-folders-and-paths"],
}

let currentLessonIndex = 0
currentLessonIndex = currentLessonIndex + 1
```

## FAQ
Q: 변수와 값은 같은 말인가?
A: 아니다. 변수는 값을 저장하거나 참조하는 이름이고, 값은 string, number, object 같은 type을 가진 데이터다. MDN은 JavaScript variable이 type과 직접 연결되지 않고 value가 type을 갖는다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)

Q: `const` object는 절대 바뀌지 않는가?
A: `const`는 binding 재할당을 막는 선언이다. object의 property 변경 여부는 별도 문제로 다루어야 한다. MDN variables 문서는 `const` 선언을 재할당과 연결해 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)

Q: array도 object인가?
A: JavaScript에서 array는 list-like object로 다루어진다. MDN indexed collections 문서는 Array object를 list-like objects로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)

Q: 타입은 TypeScript를 배울 때만 중요한가?
A: 아니다. MDN은 JavaScript value 자체가 type을 갖는다고 설명한다. TypeScript를 쓰기 전에도 runtime value의 종류를 구분해야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: `let`과 `const`를 취향 차이로만 본다. 왜 생기나: 둘 다 변수를 선언하기 때문이다. 교정: 재할당 필요 여부로 구분한다. MDN variables 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables, 확인: 2026-07-06)
2. 실수: variable에 type이 고정된다고 생각한다. 왜 생기나: 다른 언어의 변수 타입 모델을 JavaScript에 그대로 적용하기 때문이다. 교정: MDN 설명처럼 JavaScript에서는 value가 type을 갖는다고 구분한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
3. 실수: object와 array를 모두 "묶음"으로만 설명한다. 왜 생기나: 둘 다 여러 값을 담기 때문이다. 교정: object는 key-value property collection, array는 index 기반 list-like object로 구분한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)
4. 실수: 데이터 모양을 보지 않고 AI가 만든 코드를 그대로 붙인다. 왜 생기나: 변수명만 맞으면 동작한다고 생각하기 때문이다. 교정: object property와 array element shape를 확인한다. MDN objects와 indexed collections 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)

## 공식 출처
- variable은 value를 담는 container로 소개되며 `let`, `const`, `var`로 선언된다 — [Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables) (확인: 2026-07-06)
- JavaScript value는 primitive values 또는 objects로 나뉘고 JavaScript는 dynamically typed language다 — [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) (확인: 2026-07-06)
- JavaScript literal과 기본 grammar는 value 작성 방식을 설명한다 — [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types) (확인: 2026-07-06)
- object는 properties의 collection이다 — [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) (확인: 2026-07-06)
- Array는 indexed collection에서 다루는 list-like object다 — [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections) (확인: 2026-07-06)

## Quote Bank
- > "containers for values"
  - 출처: [Storing the information you need — Variables](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables) (확인: 2026-07-06)
  - 맥락: 변수의 가장 쉬운 정의를 만들 때 사용한다.
- > "dynamically typed"
  - 출처: [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) (확인: 2026-07-06)
  - 맥락: variable과 value의 type을 구분할 때 사용한다.
- > "primitive values and objects"
  - 출처: [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) (확인: 2026-07-06)
  - 맥락: JavaScript 값의 큰 분류를 설명할 때 사용한다.
- > "properties"
  - 출처: [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) (확인: 2026-07-06)
  - 맥락: object shape를 설명할 때 사용한다.
- > "list-like objects"
  - 출처: [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections) (확인: 2026-07-06)
  - 맥락: array를 object와 비교할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
