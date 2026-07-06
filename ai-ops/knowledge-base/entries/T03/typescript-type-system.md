---
id: typescript-type-system
title: "TypeScript Type System (TypeScript 타입 시스템)"
topicGroup: T03
status: draft
score: null
level: 기초
prerequisites: [variables-types-data, control-flow-functions-errors]
successors: [react-component-model, nextjs-routing-rendering]
related: [json-data-contracts, react-state-effects]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "The Basics", url: "https://www.typescriptlang.org/docs/handbook/2/basic-types.html", checked: 2026-07-06 }
  - { title: "Everyday Types", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html", checked: 2026-07-06 }
  - { title: "Object Types", url: "https://www.typescriptlang.org/docs/handbook/2/objects.html", checked: 2026-07-06 }
  - { title: "Narrowing", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html", checked: 2026-07-06 }
  - { title: "Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
TypeScript 타입 시스템은 JavaScript 값의 모양과 사용 가능성을 실행 전에 검사하는 정적 분석 체계다. TypeScript Handbook은 pure JavaScript가 dynamic typing만 제공해 code가 run되기 전 동작 예측이 어렵고, static type system은 code가 run되기 전에 expected behavior를 예측한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
TypeScript docs는 static type-checker가 values의 shapes와 behaviors를 describe하고, TypeScript 같은 type-checker가 그 정보를 사용해 문제가 생길 때 알려 준다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
이 KB는 TypeScript Handbook의 stable type system concepts를 기준으로 하며, 특정 최신 compiler option 변화가 아니라 everyday types, object types, union, narrowing, generics를 다룬다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

## 역사
TypeScript는 JavaScript를 실행 전에 더 예측 가능하게 만들기 위한 static type-checking 도구로 설명된다. Handbook은 pure JavaScript에서는 특정 value로 function이 무엇을 할지 알기 위해 call해서 see what happens 해야 하고, static type system은 code가 run되기 전에 predictions를 만든다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
TypeScript는 JavaScript runtime을 대체하는 개념이 아니라 JavaScript code에 type information을 더해 type-checking errors를 찾는 체계다. Handbook은 TypeScript가 type-checking을 통해 standard JavaScript code의 문제를 찾을 수 있다고 예시로 보여 준다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
수집 기준은 2026-07-06에 열린 TypeScript 공식 Handbook이다. 최신성에 민감한 특정 버전 기능은 이 draft에 넣지 않았고, Handbook의 기본 type system 설명에 한정했다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)

## 해결하려는 문제
JavaScript만으로는 value가 어떤 property를 갖는지, function argument가 올바른지, union value에서 어떤 operation이 안전한지 실행 전 확신하기 어렵다. Handbook은 static type-checker가 values의 shapes와 behaviors를 describe하고 프로그램이 off the rails가 될 때 알려 준다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
AI가 생성한 JavaScript 코드는 property name typo, missing argument, unreachable logic 같은 실수를 만들 수 있다. Handbook은 TypeScript가 typo, uncalled function, basic logic errors 같은 legitimate bugs를 catch할 수 있다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
복잡한 API response나 component props를 다룰 때 value shape를 명시하지 않으면 UI code와 data contract 사이의 불일치가 늦게 드러난다. TypeScript docs는 object type이 properties와 their types를 list한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

## 핵심 개념
1. Static type-checking: TypeScript Handbook은 static type system이 code가 run되기 전에 expected behavior를 예측하게 한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
2. Type annotations: Handbook은 variable, parameter, return value 등에 type annotations를 붙여 values의 expected type을 명시할 수 있다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
3. Type inference: Handbook은 TypeScript가 가능한 경우 code의 types를 자동 infer한다고 설명하고, initializer에서 variable type을 infer하는 예를 제시한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
4. Object types: Handbook은 primitives 외에 가장 common한 type이 object type이며, object type은 properties와 their types를 list한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
5. Optional properties: Object Types 문서는 property name 뒤에 `?`를 붙여 optional property를 표시하고, property가 set되어 있다면 specific type을 가져야 한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/objects.html, 확인: 2026-07-06)
6. Union types: Handbook은 union type이 two or more other types로 형성되어 value가 union members 중 하나일 수 있음을 나타낸다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
7. Narrowing: Narrowing 문서는 TypeScript가 type guards와 assignments를 보고 declared type보다 더 specific한 type으로 refine하는 과정을 narrowing이라고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/narrowing.html, 확인: 2026-07-06)
8. Generics: Generics 문서는 well-defined and consistent APIs와 reusable components를 만들기 위해 generics가 flexible large software systems에 중요하다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/generics.html, 확인: 2026-07-06)

## 관련 기술
JSON data contracts는 TypeScript object types로 표현될 수 있다. TypeScript docs가 object type을 property list와 type으로 설명하므로, JSON response shape를 TypeScript type으로 옮기면 AI가 작성한 UI code의 property access를 검토하기 쉬워진다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
React component model은 props와 state shape를 TypeScript로 표현하는 실무와 연결된다. React props는 parent가 child component에 information을 pass하는 방식이고, TypeScript function parameter/object type은 그 information shape를 표현하는 후속 도구가 된다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06; https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
TypeScript는 runtime validation을 자동으로 대체하지 않는다. Handbook은 TypeScript가 static type-checking으로 predictions를 만든다고 설명하며, JSON parsing 후 실제 external data가 contract를 만족하는지는 별도 검증이 필요하다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, 확인: 2026-07-06)

## 선행 개념
variables-types-data: TypeScript type system은 JavaScript values와 primitive/object shape를 설명하므로 variable, value, object, array 기초가 필요하다. Handbook은 JavaScript primitives와 object types를 TypeScript의 common types로 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
control-flow-functions-errors: narrowing은 if/typeof/instanceof 같은 control flow를 통해 value type을 refine하므로 conditionals와 functions를 알아야 한다. Narrowing 문서는 TypeScript가 possible paths of execution을 따라 type을 분석한다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/narrowing.html, 확인: 2026-07-06)

## 후행 개념
react-component-model: React component props와 state를 이해한 뒤 TypeScript object types, union types, generics를 적용하면 component API를 더 명확히 표현할 수 있다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06; https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
nextjs-routing-rendering: Next.js page params, route data, server/client boundaries를 다룰 때 TypeScript type annotations와 object types가 data shape를 기록하는 기반이 된다. 이 KB는 Next.js 구체 기능이 아니라 TypeScript 기초만 다룬다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 만든 코드는 문법적으로 그럴듯해도 wrong property, wrong argument, unsafe union operation을 포함할 수 있다. TypeScript docs는 type-checker가 shapes와 behaviors를 이용해 문제가 생길 때 알려 준다고 설명하므로, TypeScript error는 AI output 검증 신호가 된다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)
AI에게 구현을 맡길 때 TypeScript type을 먼저 제시하면 output contract가 좁아진다. Function parameter와 return type annotations는 input/output value type을 명시할 수 있다는 Handbook 설명에 근거해, AI prompt에서도 함수 signature나 props type을 evidence로 줄 수 있다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
AI가 `any`를 남용하면 type-checking benefit을 잃는다. Handbook은 `any`가 typechecking errors를 일으키지 않게 하는 special type이고, implicit `any`를 피하기 위해 `noImplicitAny`를 사용할 수 있다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

## 실무 활용
1. API response type 작성: JSON response shape를 object type으로 기록한다. Object type은 properties와 their types를 list한다는 TypeScript docs 설명에 근거한다. (근거: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

```ts
type LessonProgress = {
  lessonId: string;
  completed: boolean;
  updatedAt?: string;
};
```

2. Union과 narrowing 사용: success/error response를 union type으로 표현하고 `status` field로 narrow한다. TypeScript는 union member 모두에 valid한 operation만 허용하고, type guard를 통해 더 specific한 type을 deduce할 수 있다. (근거: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06; https://www.typescriptlang.org/docs/handbook/2/narrowing.html, 확인: 2026-07-06)

```ts
type SaveResult =
  | { ok: true; id: string }
  | { ok: false; message: string };

function renderResult(result: SaveResult) {
  if (result.ok) {
    return result.id;
  }
  return result.message;
}
```

3. Generic reusable wrapper: reusable API result container는 generic type으로 표현할 수 있다. Generics 문서는 reusable components가 today's data와 tomorrow's data 모두에 working할 수 있게 한다고 설명한다. (근거: https://www.typescriptlang.org/docs/handbook/2/generics.html, 확인: 2026-07-06)

```ts
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
```

## FAQ
Q: TypeScript는 JavaScript와 다른 runtime 언어인가?
A: 이 KB는 TypeScript를 JavaScript code에 static type-checking을 더하는 체계로 다룬다. Handbook은 JavaScript가 dynamic typing을 제공하고 TypeScript 같은 static type-checker가 code가 run되기 전에 문제를 알려 준다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06)

Q: 타입을 많이 쓰면 항상 좋은가?
A: 아니다. Handbook은 TypeScript가 가능한 곳에서 type을 infer하며, 초보자는 생각보다 적은 annotation으로도 TypeScript가 이해할 수 있다고 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

Q: `any`는 왜 위험한가?
A: Handbook은 `any` value에서 property access, function call, assignment 등이 typechecking errors 없이 허용된다고 설명한다. 따라서 AI가 `any`를 넣으면 TypeScript의 검증 신호가 약해진다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

Q: TypeScript type은 외부 JSON을 runtime에 검증하는가?
A: TypeScript는 static type-checking 체계이고, JSON.parse는 JSON string을 JavaScript value/object로 만든다. 외부 JSON이 실제로 기대 shape인지 runtime에서 검증하는 문제는 별도다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: type annotation을 모든 변수에 붙인다. 왜 생기나: type system을 문서 주석처럼만 보기 때문이다. 교정: TypeScript inference가 가능한 곳은 적게 쓰고, API boundary와 function signature에 집중한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
2. 실수: union value에서 아무 member의 method나 호출한다. 왜 생기나: union을 "둘 다 되는 값"으로 오해하기 때문이다. 교정: TypeScript는 모든 union member에 valid한 operation만 허용하므로 narrowing을 사용한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06; https://www.typescriptlang.org/docs/handbook/2/narrowing.html, 확인: 2026-07-06)
3. 실수: optional property를 바로 사용한다. 왜 생기나: `?`를 "있을 것이다"로 오해하기 때문이다. 교정: Object Types 문서처럼 optional property는 set될 수도 있고 안 될 수도 있으므로 `undefined` check가 필요하다. (출처: https://www.typescriptlang.org/docs/handbook/2/objects.html, 확인: 2026-07-06)
4. 실수: AI가 만든 `any`를 그대로 둔다. 왜 생기나: build error를 빨리 없애려는 압박 때문이다. 교정: `any`는 typechecking을 우회하므로 boundary type, unknown, narrowing, generics를 검토한다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)

## 공식 출처
- TypeScript static type system은 code가 run되기 전 expected behavior를 예측한다 — [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) (확인: 2026-07-06)
- Everyday Types는 primitives, arrays, any, annotations, inference, functions, object types, unions를 설명한다 — [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) (확인: 2026-07-06)
- Optional property와 readonly, intersection, generic object types는 Object Types 문서에 근거한다 — [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) (확인: 2026-07-06)
- Narrowing은 type guards와 control flow를 따라 type을 refine하는 과정이다 — [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) (확인: 2026-07-06)
- Generics는 reusable components와 consistent APIs를 설명한다 — [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) (확인: 2026-07-06)

## Quote Bank
- > "The alternative is to use a static type system to make predictions about what the code is expected to do before it runs."
  - 출처: [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) (확인: 2026-07-06)
  - 맥락: TypeScript가 해결하려는 문제를 설명할 때 사용한다.
- > "Static type systems describe the shapes and behaviors of what our values will be when we run our programs."
  - 출처: [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) (확인: 2026-07-06)
  - 맥락: type system의 핵심 역할을 설명할 때 사용한다.
- > "Wherever possible, TypeScript tries to automatically infer the types in your code."
  - 출처: [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) (확인: 2026-07-06)
  - 맥락: type annotation 남용을 교정할 때 사용한다.
- > "TypeScript will only allow an operation if it is valid for every member of the union."
  - 출처: [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) (확인: 2026-07-06)
  - 맥락: union type과 narrowing 필요성을 설명할 때 사용한다.
- > "the process of refining types to more specific types than declared is called narrowing."
  - 출처: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) (확인: 2026-07-06)
  - 맥락: control flow와 type guard를 설명할 때 사용한다.
- > "Components that are capable of working on the data of today as well as the data of tomorrow"
  - 출처: [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) (확인: 2026-07-06)
  - 맥락: generics가 reusable API를 만드는 이유를 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
