# 용어 초안: typescript-type-system

## Static Type Checking
- category: TypeScript
- shortDefinition: code가 실행되기 전에 value shape와 operation 가능성을 검사하는 방식
- explanation: Static Type Checking은 JavaScript runtime에서 실제 값을 실행하기 전에 TypeScript가 code의 expected behavior를 예측하고 mismatch를 알려 주는 체계입니다. AI가 만든 code를 검토할 때 type error는 중요한 evidence가 됩니다.
- related: ["TypeScript", "Type Annotation", "Type Inference"]

## Type Annotation
- category: TypeScript
- shortDefinition: variable, parameter, return value 등에 expected type을 명시하는 문법
- explanation: Type Annotation은 모든 줄에 붙이는 장식이 아니라 API boundary, function signature, component props처럼 다른 코드와 만나는 지점에 shape contract를 남기는 장치입니다.
- related: ["Static Type Checking", "Object Type", "Function"]

## Type Inference
- category: TypeScript
- shortDefinition: TypeScript가 code 흐름과 initializer를 보고 type을 자동 추론하는 기능
- explanation: Type Inference는 명백한 local value에 annotation을 반복하지 않아도 TypeScript가 type을 이해하게 해 줍니다. 중요한 경계는 명시하고 내부 계산은 inference를 활용하면 code가 읽기 쉬워집니다.
- related: ["Type Annotation", "TypeScript", "Static Type Checking"]

## Object Type
- category: TypeScript
- shortDefinition: object가 가질 property 이름과 각 property type을 나열한 type
- explanation: Object Type은 API response, component props, settings object처럼 field shape가 중요한 값을 표현합니다. JSON data contract를 code 안으로 옮길 때 가장 먼저 사용하는 TypeScript 구조입니다.
- related: ["Data Contract", "Optional Property", "TypeScript"]

## Union Type
- category: TypeScript
- shortDefinition: value가 둘 이상의 type 중 하나일 수 있음을 나타내는 type
- explanation: Union Type은 success/error result처럼 여러 가능성 중 하나인 값을 표현합니다. TypeScript는 union의 모든 member에서 유효한 operation만 바로 허용하므로 branch별 property를 쓰려면 narrowing이 필요합니다.
- related: ["Narrowing", "Type Guard", "API Response Shape"]

## Narrowing
- category: TypeScript
- shortDefinition: control flow나 type guard를 통해 넓은 type을 더 구체적인 type으로 좁히는 과정
- explanation: Narrowing은 `if`, `typeof`, discriminant field 같은 조건을 바탕으로 TypeScript가 value의 가능한 shape를 줄이는 방식입니다. union type을 안전하게 다루는 핵심 메커니즘입니다.
- related: ["Union Type", "Type Guard", "Control Flow"]

## Generic
- category: TypeScript
- shortDefinition: reusable type이나 function에서 변하는 data type을 parameter로 받는 방식
- explanation: Generic은 공통 구조는 유지하고 내부 data shape만 바뀌는 API wrapper나 reusable helper를 만들 때 사용합니다. 느슨함이 아니라 구조화된 재사용을 표현하는 도구입니다.
- related: ["TypeScript", "Reusable Component", "API"]

## any
- category: TypeScript
- shortDefinition: TypeScript type-checking을 대부분 우회하게 하는 special type
- explanation: any는 property access, function call, assignment 등을 typechecking error 없이 허용해 빠른 탈출구처럼 보입니다. 하지만 AI output 검토에서는 TypeScript의 검증 신호를 지울 수 있으므로 사용 이유를 반드시 확인해야 합니다.
- related: ["Static Type Checking", "unknown", "Verification"]
