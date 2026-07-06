## 한 줄 정의

TypeScript 타입 시스템은 JavaScript 값의 모양과 사용 가능성을 실행 전에 검사해, 코드가 어떤 행동을 할지 미리 예측하게 해 주는 정적 분석 체계입니다. TypeScript는 JavaScript runtime을 대체하는 별도 실행 세계가 아니라, JavaScript code에 type information을 더해 typo, wrong property access, unsafe union operation 같은 문제를 더 빨리 발견하게 합니다.

이 강의에서 "타입"은 단순히 `string`, `number` 이름을 붙이는 장식이 아닙니다. 타입은 함수가 어떤 input을 받는지, object가 어떤 property를 가지는지, 어떤 value가 여러 가능성 중 어느 모양인지, AI가 생성한 코드가 어떤 경계를 넘어서는지 설명하는 contract입니다. ==TypeScript를 잘 쓴다는 것은 type annotation을 많이 쓰는 것이 아니라, 검증이 필요한 경계에 shape를 남기는 것입니다.==

JSON 데이터 계약 강의가 network body의 shape를 다뤘다면, 이번 강의는 그 shape를 코드 안에서 어떻게 읽고 제한하는지 봅니다. API response, React props, reusable helper, error result 같은 값은 모두 "모양"을 갖고, TypeScript는 그 모양을 실행 전에 드러내는 언어적 장치를 제공합니다.

![TypeScript type system map](/lesson-diagrams/typescript-type-system/typescript-type-system-map.svg)

## 왜 존재하는가

JavaScript는 동적 typing을 제공합니다. value가 실제로 어떤 property를 갖는지, function argument가 올바른지, union처럼 여러 가능성을 가진 값에서 특정 method를 호출해도 되는지 많은 경우 실행해야 드러납니다. 작은 script에서는 이 유연성이 빠른 시도에 도움이 되지만, UI와 API가 커지면 "실행해 보고 알기"가 비용이 됩니다.

TypeScript Handbook은 pure JavaScript에서는 특정 value로 function이 무엇을 할지 알기 위해 call해서 see what happens 해야 하고, static type system은 code가 run되기 전에 expected behavior를 예측한다고 설명합니다. 즉 TypeScript는 개발자가 머릿속으로만 추측하던 value shape와 behavior를 codebase 안의 검증 가능한 정보로 바꿉니다.

AI 시대에는 이 문제가 더 선명합니다. AI는 문법적으로 그럴듯한 JavaScript를 빠르게 만들 수 있지만, property name typo, missing argument, impossible branch, `any` 남용도 함께 만들 수 있습니다. TypeScript error는 AI output을 곧장 "틀렸다"라고 단정하는 장치가 아니라, 사람이 검토해야 할 evidence를 제공합니다. compiler가 "이 property는 존재하지 않는다"고 말하면, AI가 만든 contract가 실제 data shape와 맞는지 확인해야 합니다.

또 TypeScript는 협업 언어입니다. API response type, component props type, function return type은 다음 사람과 다음 AI 세션에게 "이 값은 이렇게 생겼다"는 압축된 맥락을 줍니다. 주석보다 강한 이유는 type-checker가 그 약속을 사용해 code를 검사하기 때문입니다.

> [!KEY]
> TypeScript는 "오류를 없애는 언어"가 아니라 실행 전 예측 가능한 정보로 JavaScript를 더 검토 가능하게 만드는 체계입니다.

## 작동 원리

### 1. Type checker는 value의 shape와 behavior를 읽습니다

TypeScript의 핵심은 runtime value가 가질 shape와 behavior를 type 정보로 설명하는 것입니다. shape는 object property, function parameter, array item, union member 같은 구조를 말합니다. behavior는 그 value로 어떤 operation을 할 수 있는지와 연결됩니다. 예를 들어 string에는 `toUpperCase()`를 호출할 수 있지만, `{ title: string }` object에는 바로 호출할 수 없습니다.

TypeScript는 이 정보를 사용해 code가 실행되기 전 문제를 알려 줍니다. 이것은 browser나 Node.js가 runtime에서 값을 실행하는 것과 다른 단계입니다. TypeScript가 error를 낸다고 JavaScript runtime이 반드시 실행 불가능한 것은 아니지만, 그 error는 code가 기대한 shape와 실제로 보장된 shape 사이의 불일치를 의미합니다.

### 2. Type annotation은 경계에 붙이는 설명입니다

Type annotation은 variable, parameter, return value 등에 expected type을 명시하는 문법입니다. 초보자는 모든 변수에 annotation을 붙여야 안전하다고 생각하기 쉽지만, TypeScript Handbook은 가능한 경우 code의 types를 자동 infer한다고 설명합니다. 따라서 annotation의 우선순위는 모든 줄이 아니라 boundary입니다.

boundary는 함수 parameter, API response, component props, exported function return처럼 다른 code와 만나는 지점입니다. 이곳에 type을 붙이면 caller와 callee가 같은 약속을 공유합니다.

```ts
type SaveProgressInput = {
  lessonId: string;
  completed: boolean;
};

function saveProgress(input: SaveProgressInput) {
  return fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
```

이 예시에서 type은 `saveProgress`가 무엇을 기대하는지 기록합니다. AI가 `completed: "yes"` 같은 값을 넣으면 TypeScript가 mismatch를 알려 줄 수 있습니다.

### 3. Type inference는 반복 설명을 줄입니다

TypeScript는 initializer, return expression, function context를 보고 type을 infer할 수 있습니다. 예를 들어 `const completed = true`는 boolean으로 infer됩니다. inference는 TypeScript를 실무적으로 쓰게 만드는 중요한 장치입니다. 모든 곳에 annotation을 붙이면 code가 장황해지고, 실제로 중요한 boundary가 눈에 덜 들어옵니다.

Inference를 믿되, 외부 경계는 명시하는 균형이 좋습니다. 내부 계산은 infer되게 두고, API response type이나 public function signature는 명시합니다. 이렇게 하면 읽는 사람은 contract를 볼 수 있고, type-checker는 내부 흐름도 따라갑니다.

### 4. Object type은 property list와 type을 함께 둡니다

TypeScript docs는 object type이 properties와 their types를 list한다고 설명합니다. JSON data contract와 가장 직접적으로 이어지는 지점입니다. object type은 "이 값은 object다"에서 멈추지 않고, 어떤 property가 있고 각 property가 어떤 type인지 설명합니다.

```ts
type LessonSummary = {
  slug: string;
  title: string;
  minutes: number;
  completed?: boolean;
};
```

`completed?`는 optional property입니다. Object Types 문서는 property name 뒤에 `?`를 붙여 optional property를 표시하고, property가 set되어 있다면 specific type을 가져야 한다고 설명합니다. optional은 "항상 있을 것"이 아니라 "없을 수 있음"입니다. 따라서 사용할 때는 `undefined` 가능성을 고려해야 합니다.

### 5. Union type은 여러 가능성을 하나의 value에 담습니다

Union type은 value가 여러 type 중 하나일 수 있음을 표현합니다. API result처럼 success와 error가 갈라지는 경우에 특히 유용합니다.

```ts
type SaveResult =
  | { ok: true; id: string }
  | { ok: false; message: string };
```

여기서 `SaveResult`는 성공 object 또는 실패 object입니다. TypeScript는 union member 모두에 valid한 operation만 허용합니다. 아직 `ok`를 확인하지 않았는데 `result.id`를 바로 읽으면 error가 날 수 있습니다. 왜냐하면 실패 branch에는 `id`가 없기 때문입니다.

### 6. Narrowing은 control flow로 가능성을 좁힙니다

Narrowing은 TypeScript가 type guard와 assignment, control flow를 보고 declared type보다 더 specific한 type으로 refine하는 과정입니다. 위의 `SaveResult`에서 `if (result.ok)`를 통과한 block 안에서는 result가 success branch로 좁혀집니다.

```ts
function renderResult(result: SaveResult) {
  if (result.ok) {
    return `Saved: ${result.id}`;
  }
  return `Failed: ${result.message}`;
}
```

이 코드는 TypeScript가 control flow를 따라 type을 좁히는 예입니다. AI가 union value에서 모든 branch의 property를 섞어 쓰면, TypeScript error는 "이 code는 가능한 모든 input을 고려하지 않았다"는 신호가 됩니다.

### 7. Generics는 reusable contract를 만듭니다

Generics는 오늘의 data와 내일의 data 모두에 동작하는 reusable component나 API wrapper를 만드는 데 쓰입니다. 예를 들어 API result container는 내부 data type을 parameter로 받을 수 있습니다.

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type LessonResult = ApiResult<LessonSummary>;
```

이 구조는 result pattern은 재사용하고, 성공 data shape만 바꿉니다. `T`는 아무 값이나 넣는 마법 상자가 아니라, 재사용되는 구조 안에서 변하는 부분을 명시한 type parameter입니다.

### 8. `any`는 type-checking 회피 장치가 될 수 있습니다

TypeScript Handbook은 `any` value에서 property access, function call, assignment 등이 typechecking errors 없이 허용된다고 설명합니다. 그래서 `any`는 막힌 build를 빨리 통과시키는 유혹이 됩니다. 하지만 AI가 만든 `any`를 그대로 두면 TypeScript가 제공하던 검증 신호가 사라집니다.

실무에서는 external data boundary에서 `unknown`으로 받고 확인한 뒤 좁히는 것이 더 검토 가능할 수 있습니다. 이 강의는 `unknown` 세부 문법을 깊게 다루지 않지만, 핵심은 "모르는 값을 아는 척하지 않는 것"입니다.

> [!WARNING]
> `any`는 TypeScript를 쓰고 있다는 느낌은 남기지만, type-checker가 도와줄 수 있는 지점을 지워 버릴 수 있습니다.

## 스펙과 세부

### TypeScript는 static type-checking 체계입니다

TypeScript의 판단은 실행 전 code에 기반합니다. runtime에 server가 보낸 JSON이 어떤 shape인지 자동으로 검사하지 않습니다. 이 때문에 JSON parsing 이후 실제 field check가 필요한 경우가 있습니다. TypeScript type과 runtime validation을 같은 것으로 보면 위험합니다.

### Type annotation은 문서이면서 검사 입력입니다

annotation은 사람이 읽는 설명인 동시에 type-checker가 사용하는 입력입니다. 주석과 다른 점은 code가 그 약속을 어기면 error가 날 수 있다는 점입니다. 그러나 annotation이 실제 runtime data를 바꾸지는 않습니다. `as SomeType` 같은 assertion을 남용하면 검증 대신 우회를 만들 수 있습니다.

### Optional property는 `undefined` 가능성을 뜻합니다

`updatedAt?: string`은 property가 없을 수도 있고, 있으면 string이어야 한다는 뜻입니다. 초보자는 `?`를 "아마 있을 것"으로 읽지만, TypeScript 관점에서는 없는 경우를 고려해야 합니다. UI에서는 optional field를 바로 render하지 않고 fallback을 두는 식으로 처리합니다.

### Union은 "둘 다 되는 값"이 아닙니다

Union은 여러 member 중 하나입니다. 따라서 모든 member에서 가능한 operation만 바로 허용됩니다. 특정 branch의 property를 쓰려면 narrowing이 필요합니다. 이 원리는 error handling과 API response modeling에서 특히 중요합니다.

### Generic은 느슨함이 아니라 구조화된 재사용입니다

Generic을 쓰면 type이 약해지는 것이 아니라, 공통 구조와 변하는 data 부분을 분리할 수 있습니다. `ApiResult<T>`는 result envelope은 고정하고 성공 data만 바꿉니다. 반대로 아무 곳에나 generic을 넣으면 읽기 어려워질 수 있으므로 반복되는 구조가 있을 때 사용합니다.

## 원문으로 읽기

> "The alternative is to use a static type system to make predictions about what the code is expected to do before it runs."
>
> — 대안은 static type system을 사용해 code가 실행되기 전에 무엇을 할 것으로 기대되는지 예측하는 것이다.
> [The Basics — TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

이 문장은 TypeScript를 "새 runtime"이 아니라 "실행 전 예측 체계"로 보게 만듭니다. AI가 만든 코드도 실행 전에 어느 정도 검토할 수 있어야 합니다. TypeScript error는 그 예측이 깨진 지점을 알려 줍니다.

> "Static type systems describe the shapes and behaviors of what our values will be when we run our programs."
>
> — static type system은 프로그램을 실행할 때 value가 가질 shape와 behavior를 설명한다.
> [The Basics — TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

shape와 behavior라는 표현이 핵심입니다. 타입은 단순 이름표가 아니라 어떤 property와 operation이 가능한지에 대한 설명입니다. JSON response, component props, function input이 모두 이 관점으로 읽힙니다.

> "Wherever possible, TypeScript tries to automatically infer the types in your code."
>
> — 가능한 곳에서는 TypeScript가 code의 type을 자동으로 infer하려고 한다.
> [Everyday Types — TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

이 인용은 annotation 남용을 막아 줍니다. TypeScript는 모든 값을 수동으로 표시하라는 도구가 아닙니다. 중요한 boundary에는 명시하고, 내부의 명백한 값은 inference를 활용하는 것이 읽기 좋습니다.

> "TypeScript will only allow an operation if it is valid for every member of the union."
>
> — TypeScript는 union의 모든 member에 valid한 operation만 허용한다.
> [Everyday Types — TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

union을 이해하는 데 가장 중요한 문장입니다. 여러 가능성 중 하나인 값을 다룰 때는 먼저 어떤 가능성인지 좁혀야 합니다. AI가 success branch와 error branch를 섞는 실수도 이 원칙으로 잡을 수 있습니다.

## 실전에서

### 1. API response type을 먼저 씁니다

API를 사용할 때 response example을 보고 TypeScript type을 만듭니다. 이 type은 UI code가 어떤 property를 기대하는지 드러냅니다.

```ts
type LessonProgress = {
  lessonId: string;
  completed: boolean;
  updatedAt?: string;
};

async function loadProgress(lessonId: string): Promise<LessonProgress> {
  const response = await fetch(`/api/progress/${lessonId}`);
  return response.json();
}
```

이 코드는 교육용으로 boundary를 보여 줍니다. 실제 외부 data validation까지 하려면 `response.json()` 결과를 runtime에서 확인해야 합니다. 하지만 type을 먼저 쓰면 AI가 UI code에서 `progress.isDone` 같은 없는 property를 쓰는 실수를 줄일 수 있습니다.

### 2. Union으로 success/error를 섞지 않습니다

```ts
type SaveResult =
  | { ok: true; id: string }
  | { ok: false; message: string };

function resultMessage(result: SaveResult) {
  if (result.ok) {
    return `저장됨: ${result.id}`;
  }
  return `실패: ${result.message}`;
}
```

이 pattern은 API error handling에 자주 유용합니다. 성공과 실패가 같은 object에 optional property로 뒤섞이면 code가 계속 `undefined`를 확인해야 할 수 있습니다. discriminated union처럼 branch를 분리하면 TypeScript가 narrowing을 도와줍니다.

### 3. Generic wrapper로 반복되는 API envelope을 표현합니다

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

type LessonListResult = ApiResult<LessonSummary[]>;
```

이 구조는 API response envelope이 여러 endpoint에서 반복될 때 유용합니다. AI에게 "모든 API는 `ApiResult<T>`로 반환해"라고 지시하면 output format이 좁아집니다. 다만 실제 server contract가 그렇게 되어 있을 때만 맞는 지시입니다.

### 4. AI output에서 `any`를 review marker로 봅니다

AI가 빠르게 코드를 맞추려고 `any`를 넣었다면 그냥 통과시키지 않습니다. 그 `any`가 external boundary라서 아직 shape를 모르는 것인지, 아니면 귀찮아서 검사 신호를 지운 것인지 확인합니다. 전자라면 `unknown`과 narrowing, 후자라면 object type이나 union type을 검토합니다.

> [!TIP]
> AI에게 구현을 맡길 때 "가능하면 TypeScript type을 먼저 정의하고, `any`를 쓰면 왜 필요한지 주석 대신 설명해라"라고 요구하면 검토 지점이 선명해집니다.

## 한계와 트레이드오프

첫째, TypeScript는 runtime data를 자동 검증하지 않습니다. compiler가 통과했다고 server response가 실제로 그 shape라는 뜻은 아닙니다. 외부 JSON, user input, localStorage data처럼 runtime에서 들어오는 값은 별도 validation이 필요할 수 있습니다.

둘째, type을 너무 복잡하게 만들면 학습 비용이 커집니다. 초보 단계에서는 primitive, object type, optional property, union, narrowing, generic의 기본 흐름을 먼저 익히는 것이 좋습니다. advanced type programming은 실제 중복과 위험이 있을 때 들어가도 늦지 않습니다.

셋째, annotation 남용은 code를 더 안전하게 만들기보다 읽기 어렵게 만들 수 있습니다. TypeScript는 가능한 곳에서 infer하므로, 내부 local value까지 모두 적는 대신 API boundary와 public function, props에 집중합니다.

넷째, `any`는 빠른 탈출구이지만 검증 이득을 약화합니다. build error를 없애기 위해 `any`를 넣으면 AI output의 위험 신호가 사라질 수 있습니다. `unknown`, union, narrowing을 통해 모르는 값을 차근히 좁히는 편이 더 검토 가능합니다.

마지막으로, TypeScript error는 설계 판단을 대신하지 않습니다. type-checker는 shape mismatch를 알려 줄 수 있지만, 어떤 domain model이 좋은지, 어떤 error shape가 사용자에게 적절한지, API contract가 business rule을 잘 담는지는 사람이 판단해야 합니다. ==TypeScript는 생각을 없애는 도구가 아니라 생각할 지점을 앞당기는 도구입니다.==

## 더 읽기

먼저 TypeScript Handbook의 [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)를 읽습니다. TypeScript가 static type system으로 code 실행 전 expected behavior를 예측한다는 큰 그림을 잡습니다.

다음으로 [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)를 읽습니다. primitives, arrays, `any`, type annotations, inference, functions, object types, union types를 연결해 봅니다.

그다음 [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)를 읽어 optional property와 object type 세부를 확인합니다. API response shape를 code로 옮기는 데 바로 필요합니다.

이후 [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)을 읽습니다. union value를 안전하게 다루려면 control flow와 type guard가 어떻게 type을 좁히는지 알아야 합니다.

마지막으로 [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)를 읽습니다. reusable API wrapper나 component helper를 만들 때 변하는 data shape와 고정 structure를 분리하는 감각을 익힙니다.

후속 학습은 `react-component-mental-model`입니다. React component props와 state shape는 TypeScript object type과 union type을 만나는 가장 흔한 프론트엔드 실무 지점입니다.
