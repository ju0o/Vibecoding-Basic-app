# 용어 초안: variables-types-and-data-shapes

## Variable
- category: 개발 기초
- shortDefinition: 값을 이름으로 저장하고 다시 참조하게 하는 JavaScript 이름표
- explanation: Variable은 value를 담는 container로 설명될 수 있지만, JavaScript에서는 variable 자체가 type을 갖는 것이 아니라 지금 연결된 value가 type을 가집니다. `let`은 재할당 가능한 이름을 만들고 `const`는 같은 binding에 새 값을 다시 할당하지 않겠다는 의도를 나타냅니다.
- related: ["Value", "Data Type", "JavaScript"]

## Value
- category: 개발 기초
- shortDefinition: 변수에 담기거나 표현식에서 만들어지는 실제 데이터
- explanation: Value는 string, number, boolean, object, array처럼 runtime에서 동작하는 데이터입니다. JavaScript는 dynamically typed language이므로 variable 이름보다 그 이름에 현재 연결된 value의 type을 확인하는 것이 중요합니다.
- related: ["Variable", "Primitive Value", "Object Shape"]

## Primitive Value
- category: 개발 기초
- shortDefinition: JavaScript에서 object가 아닌 기본 value 분류
- explanation: Primitive Value는 MDN이 JavaScript data structures에서 object와 구분해 설명하는 기본 값 분류입니다. string, number, boolean, undefined, symbol, bigint, null 같은 값이 여기에 속하며, object property collection과 구분해 읽어야 합니다.
- related: ["Data Type", "Value", "Object"]

## Object Shape
- category: 개발 기초
- shortDefinition: object가 가진 property 이름과 각 property value의 구조
- explanation: Object Shape는 object의 key-value property 구성을 읽는 방식입니다. API 응답, UI state, AI가 생성한 코드의 데이터 계약을 검토할 때 어떤 property가 있고 그 value가 어떤 type인지 확인하는 기준이 됩니다.
- related: ["Object", "Property", "Data Contract"]

## Array
- category: 개발 기초
- shortDefinition: 여러 값을 순서와 index로 다루는 list-like object
- explanation: Array는 순서가 있는 값 목록입니다. 검색 결과, 강의 목록, 태그 목록처럼 개수가 변할 수 있는 데이터를 다룰 때 사용하며, 각 element의 shape를 함께 확인해야 안전하게 렌더링하거나 반복 처리할 수 있습니다.
- related: ["Indexed Collection", "Loop", "Object Shape"]
