## 한 줄 정의

변수는 값을 이름으로 붙잡아 두는 장치이고, 타입과 데이터 모양은 그 값이 어떤 종류이며 어떤 구조를 갖는지 읽게 해주는 기준입니다. MDN은 variable을 value를 담는 container라고 설명하고, JavaScript에서는 `let`, `const`, `var`로 변수를 선언할 수 있다고 설명합니다. 그러나 입문자가 여기서 가장 먼저 붙잡아야 할 점은 "변수에 타입이 박혀 있다"가 아니라, MDN의 설명처럼 JavaScript에서는 ==variable이 아니라 value가 type을 가진다==는 점입니다.

이 말은 작은 차이처럼 보이지만 실제 코드 읽기에서는 큰 차이를 만듭니다. `let currentLesson = 1`이라고 썼을 때 `currentLesson`이라는 이름은 나중에 다른 값으로 재할당될 수 있고, JavaScript는 그 이름 자체에 number type을 영구히 붙이지 않습니다. 반대로 지금 담긴 값 `1`은 number이고, `"1"`은 string입니다. 같은 모양의 문자라도 값의 type이 다르면 연산과 비교 결과가 달라집니다.

데이터 모양은 object와 array를 읽는 능력입니다. 사용자의 이름, 학습 진행률, 북마크 목록은 낱개 변수 여러 개로 흩어질 수도 있지만, 보통 하나의 object나 array 구조로 묶입니다. AI가 만든 코드가 맞는지 검토하려면 "변수 이름이 그럴듯한가"보다 "이 값의 type과 object shape가 실제 데이터 흐름과 맞는가"를 봐야 합니다.

![변수와 데이터 모양 흐름](/lesson-diagrams/variables-types-and-data-shapes/variables-data-shape-flow.svg)

## 왜 존재하는가

변수는 프로그램이 값을 기억해야 했기 때문에 존재합니다. MDN variables 문서는 버튼 클릭 수를 저장하는 예를 통해, 값이 기억되지 않으면 사용자의 다음 행동에 맞춰 화면을 바꾸기 어렵다는 점을 보여줍니다. 값이 한 번만 쓰인다면 변수의 필요가 작아 보일 수 있지만, 웹 앱은 대부분 여러 시점의 값을 이어서 다룹니다. 사용자가 입력한 문자열, 현재 선택한 강의, 완료한 lesson id 목록, API에서 받은 응답은 모두 다음 단계로 넘어가야 합니다.

타입은 값이 어떤 규칙으로 동작하는지 설명하기 위해 필요합니다. 숫자는 더할 수 있고, 문자열은 이어 붙일 수 있으며, boolean은 조건문에서 판단 기준이 됩니다. MDN은 JavaScript value를 primitive values와 objects로 나눕니다. 이 분류는 단순 암기 목록이 아니라 오류를 읽는 첫 번째 지도입니다. `undefined`에 property를 읽으려다 TypeError가 나는 상황은 "값이 없다"라는 문제와 "object처럼 접근했다"라는 문제가 만나는 지점입니다.

데이터 모양은 값들이 관계를 갖기 시작할 때 필요합니다. 하나의 학습자 정보를 `name`, `level`, `bookmarks` 변수로 흩어 놓을 수 있지만, 실제 UI와 API는 보통 `{ name, level, bookmarks }` 같은 object shape로 정보를 전달합니다. MDN은 object를 properties의 collection으로 설명합니다. property는 key와 value의 연결입니다. 즉 object는 이름 붙은 값들의 묶음이고, 이 묶음이 UI와 API 사이의 계약이 됩니다.

배열은 순서가 필요한 여러 값을 다룰 때 등장합니다. 강의 목록, 태그 목록, 검색 결과 목록은 개수가 고정되지 않습니다. MDN indexed collections 문서는 Array object를 list-like object로 설명합니다. array를 알면 "몇 번째 항목인가", "전체를 순회할 수 있는가", "비어 있는가" 같은 질문을 할 수 있습니다. 이런 질문이 다음 강의의 조건문, 반복문, 함수로 이어집니다.

> [!KEY]
> 변수는 값을 기억하게 하고, 타입은 값의 동작 규칙을 알려주며, 데이터 모양은 여러 값 사이의 관계를 읽게 합니다.

## 작동 원리

### 1. 이름을 만들고 값을 연결합니다

변수 선언은 이름을 만드는 행위입니다. MDN은 `let`, `const`, `var`를 변수 선언 방식으로 설명하지만, 현대 입문 학습에서는 `let`과 `const`를 먼저 구분하는 것이 좋습니다. `let`은 흐름 중에 다른 값을 다시 담을 수 있는 이름을 만들고, `const`는 같은 binding에 새 값을 다시 할당하지 않겠다는 의도를 드러냅니다. 여기서 binding이라는 표현은 "이 이름이 이 값을 가리키는 연결" 정도로 이해하면 충분합니다.

`const`를 "값이 절대 바뀌지 않는다"로 이해하면 곧 혼란이 옵니다. KB는 MDN variables 문서를 근거로 `const`를 재할당과 연결해 설명합니다. object를 `const user = { name: "Ada" }`로 선언했을 때 `user = 다른값`은 막히지만, object 내부 property 변경 문제는 별도로 생각해야 합니다. 입문 단계에서는 `const`는 "이 이름을 다른 값에 다시 붙이지 않겠다"는 신호로 읽는 편이 안전합니다.

### 2. 값이 type을 가집니다

MDN data structures 문서는 JavaScript가 dynamically typed language라고 설명합니다. 더 중요한 문장은 변수 자체가 특정 value type과 직접 연결되지 않는다는 설명입니다. 이 말은 JavaScript가 실행 중 값의 종류를 보고 동작한다는 뜻입니다. `let score = 10` 이후 `score = "ten"`이 가능하다는 사실은 편리하지만, 동시에 subtle bug를 만들 수 있습니다.

예를 들어 `score + 1`이 숫자 덧셈인지 문자열 연결인지 판단하려면 score에 지금 담긴 값이 무엇인지 봐야 합니다. AI가 만든 코드를 검토할 때도 variable name만 보고 추측하면 위험합니다. `count`라는 이름이어도 실제 값이 string일 수 있고, `lesson`이라는 이름이어도 object가 아니라 id string일 수 있습니다. ==코드 리뷰의 기준은 이름의 느낌이 아니라 runtime value의 type입니다.==

### 3. Primitive value와 object를 나눕니다

MDN은 JavaScript value의 큰 분류를 primitive values와 objects로 설명합니다. primitive values에는 string, number, boolean, undefined, symbol, bigint, null이 포함됩니다. 이 값들은 가장 낮은 수준에서 직접 표현되는 값으로 설명됩니다. 입문자가 모든 세부를 한 번에 외울 필요는 없지만, primitive와 object의 차이는 반드시 알아야 합니다.

object는 여러 property를 가진 구조입니다. `{ title: "Variables", level: "입문" }`처럼 key와 value의 연결을 모아 하나의 값으로 다룹니다. 여기서 key는 `title`, `level`이고 value는 `"Variables"`, `"입문"`입니다. object shape를 읽는다는 것은 어떤 key가 있고 각 key의 value가 어떤 type인지 읽는다는 뜻입니다.

### 4. Array는 순서 있는 목록입니다

MDN indexed collections는 Array object를 list-like object로 설명합니다. array는 여러 값을 순서대로 담습니다. `["variables", "functions", "debugging"]`은 세 개의 lesson slug를 순서대로 담은 array입니다. object가 이름 붙은 property 중심이라면, array는 index와 순서가 중심입니다.

이 차이는 실전에서 중요합니다. 검색 결과는 array로 오고, 각 결과 항목은 object일 수 있습니다. 그러면 전체 데이터 모양은 `Array<{ title: string, href: string }>`처럼 읽힙니다. TypeScript 문법을 아직 몰라도 이 모양을 자연어로 말할 수 있어야 합니다. "검색 결과는 목록이고, 목록의 각 항목은 title과 href를 가진 object다"라고 설명할 수 있으면 데이터 흐름의 절반은 잡은 것입니다.

### 5. Literal은 값을 코드에 쓰는 방식입니다

MDN grammar and types 문서는 array literal, object literal, numeric literal, string literal 같은 literal을 설명합니다. literal은 값을 코드에 직접 적는 표기입니다. `"hello"`는 string literal이고, `42`는 numeric literal이며, `{ completed: true }`는 object literal입니다. literal을 구분하면 "이 값이 어디에서 만들어졌는가"를 읽을 수 있습니다.

AI가 코드를 생성할 때 literal을 임시 데이터로 넣는 경우가 많습니다. 예를 들어 `const user = { name: "Test User" }`는 실제 로그인 사용자 데이터가 아니라 예시 object일 수 있습니다. 입문자는 literal을 보면 "이 값은 외부에서 온 것인가, 코드에 직접 박힌 것인가"를 질문해야 합니다. 이 질문이 나중에 API, DB, 환경변수, 보안 강의로 이어집니다.

### 6. 데이터 모양은 코드 사이의 계약이 됩니다

함수는 parameter를 받고 return value를 냅니다. 컴포넌트는 props를 받고 UI를 그립니다. API는 JSON object를 주고받습니다. 이 모든 곳에서 데이터 모양이 계약처럼 작동합니다. KB는 JSON data contract를 후행 개념으로 둡니다. 지금은 JSON을 깊게 배우지 않지만, object와 array를 이해해야 JSON 응답을 읽을 수 있다는 연결은 기억해야 합니다.

AI에게 "사용자 객체를 만들어줘"라고 말하는 것과 "사용자는 `{ id: string, name: string, bookmarkedLessons: string[] }` 모양이다"라고 말하는 것은 결과가 다릅니다. 후자는 shape를 제공합니다. AI는 더 좁은 범위 안에서 코드를 만들고, 사용자는 결과를 더 쉽게 검증합니다. 바이브코딩에서 데이터 모양은 prompt의 일부이자 review 기준입니다.

> [!EXAMPLE]
> 학습 진행률 UI를 만든다면 `completedCount`는 number, `isBookmarked`는 boolean, `currentLesson`은 object, `lessonSlugs`는 string array처럼 먼저 말할 수 있어야 합니다. 이 말이 곧 AI에게 줄 수 있는 데이터 계약의 초안입니다.

## 스펙과 세부

### `let`, `const`, `var`

MDN variables 문서는 세 선언 방식을 모두 다룹니다. 이 KB는 modern JavaScript 학습에서 `let`과 `const`를 먼저 사용합니다. `var`는 JavaScript 초기에 사용된 선언 방식이고, MDN variables 문서도 `var`의 confusing and error-prone한 성격을 설명합니다. 강의에서는 `var`를 금지어처럼 다루지 않고, 기존 코드에서 만날 수 있는 역사적 선언 방식으로 둡니다.

### Dynamic typing

Dynamic typing은 JavaScript의 강점이자 위험입니다. 값을 빠르게 바꿔가며 코드를 작성할 수 있지만, 의도하지 않은 type 변화가 runtime bug로 나타날 수 있습니다. MDN은 implicit type conversion이 convenience를 주지만 subtle bugs를 만들 수 있다고 설명합니다. 이 KB는 그 세부 coercion 규칙을 모두 다루지 않습니다. 다만 "지금 값이 무엇인지 확인한다"는 습관이 중요합니다.

### Object property

MDN working with objects는 object를 properties의 collection으로 설명합니다. property는 key와 value의 연결입니다. JavaScript object를 읽을 때는 "어떤 property가 있는가", "그 property value의 type은 무엇인가", "없는 property에 접근하면 어떻게 되는가"를 봐야 합니다. 이 세 질문은 TypeError와 undefined 문제를 읽는 기초가 됩니다.

### Array index

Array는 순서를 가진 collection입니다. index는 보통 0부터 시작하는 위치 번호입니다. 이 강의에서는 array method 전체를 다루지 않습니다. 하지만 array가 list-like object라는 사실은 반드시 남겨야 합니다. 반복문, map/filter, React list rendering, search results는 모두 이 기초 위에 서기 때문입니다.

### 실행 가능한 예시

```js
const lesson = {
  slug: "variables-types-and-data-shapes",
  title: "변수, 타입, 데이터 모양",
  level: "입문",
  tags: ["JavaScript", "Data Shape"],
}

let currentStep = 0
currentStep = currentStep + 1

const isFirstStep = currentStep === 1
const firstTag = lesson.tags[0]

console.log({
  firstTag,
  isFirstStep,
  title: lesson.title,
})
```

이 예시는 변수와 값의 관계를 보여줍니다. `lesson`은 object이고, `tags`는 array입니다. `currentStep`은 흐름 중 바뀌므로 `let`을 사용했습니다. `isFirstStep`은 boolean입니다. AI가 이런 코드를 만들었을 때 검토자는 "각 이름에 지금 어떤 type의 value가 들어 있는가"와 "object shape가 실제 UI에 필요한 필드와 맞는가"를 확인해야 합니다.

## 원문으로 읽기

> "containers for values"
>
> — 값을 담는 container.
> [Storing the information you need — Variables — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables)

이 짧은 표현은 변수의 입문 정의로 충분히 좋습니다. 하지만 container라는 비유는 끝까지 밀면 깨집니다. JavaScript에서는 변수라는 box 자체가 type을 갖는 것이 아니라, 그 안에 지금 들어 있는 value가 type을 가집니다. 그래서 다음 인용이 필요합니다.

> "dynamically typed"
>
> — 동적 타입 언어.
> [JavaScript data types and data structures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)

동적 타입이라는 말은 "아무렇게나 써도 된다"가 아닙니다. 오히려 실행 시점의 value를 더 주의 깊게 봐야 한다는 뜻입니다. AI가 만든 코드에서 변수 이름만 보고 안전하다고 판단하지 말고, 값이 실제로 number인지 string인지 object인지 확인해야 합니다.

> "primitive values and objects"
>
> — primitive values와 objects.
> [JavaScript data types and data structures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)

이 구분은 JavaScript 데이터 이해의 큰 지도입니다. string, number, boolean 같은 primitive와 object/array 같은 구조적 값을 나누면 오류 메시지를 더 빨리 읽습니다. `null`이나 `undefined`에 property를 읽으려는 문제도 이 지도 안에서 이해됩니다.

관련 원문(링크): [Working with objects — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

object shape를 읽는다는 것은 property를 읽는다는 뜻입니다. AI가 `{ name: "Ada" }`를 만들었는데 UI가 `user.displayName`을 기대한다면 shape가 맞지 않습니다. 이 문제는 문법 문제가 아니라 데이터 계약 문제입니다.

관련 원문(링크): [Indexed collections — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)

array를 list-like object로 보는 설명은 object와 array의 관계를 부드럽게 이어줍니다. array는 단순히 여러 값을 담는 통이 아니라 순서와 index를 가진 목록입니다. 이 관점이 반복문과 React list rendering으로 이어집니다.

## 실전에서

### 패턴 1: UI state를 type으로 먼저 분해합니다

화면을 만들기 전 "무슨 값이 필요한가"를 type 단어로 말합니다. 입력창 값은 string, 체크 여부는 boolean, 현재 단계는 number, 강의 목록은 array, 강의 하나는 object입니다. 이 분해는 구현 전에 AI에게 줄 수 있는 좋은 지시가 됩니다. "검색 기능 만들어줘"보다 "검색어는 string, 결과는 `{ title, href, summary }` object array"라고 말하는 편이 검증 가능한 결과를 만듭니다.

### 패턴 2: API 응답을 object shape로 확인합니다

서버에서 온 값이 `{ lessons: [...] }`인지 `[...]`인지에 따라 코드가 달라집니다. AI가 `response.lessons.map(...)`을 만들었는데 실제 API가 array 자체를 반환하면 오류가 납니다. 이런 문제는 테스트를 돌리기 전에도 데이터 모양 대조로 발견할 수 있습니다. KB는 object와 array를 JSON data contract의 선행 개념으로 둡니다.

### 패턴 3: 오류 메시지를 type 단서로 읽습니다

TypeError는 보통 값의 type이나 shape 가정이 틀렸다는 단서가 됩니다. 이 KB 자체는 error reference를 깊게 다루지 않지만, 후속 debugging-error-reading과 연결됩니다. `Cannot read properties of undefined` 같은 오류를 만나면 "어떤 object를 기대했는데 undefined가 들어왔는가"라고 질문해야 합니다.

### 패턴 4: AI 코드 리뷰에서 이름보다 값을 봅니다

AI는 그럴듯한 변수명을 잘 만듭니다. 그러나 `user`, `lesson`, `progress`라는 이름이 있다고 해서 값이 올바른 shape라는 보장은 없습니다. 리뷰자는 `console.log`, debugger, type annotation, 테스트를 통해 값의 실제 모양을 확인해야 합니다. 바이브코딩에서 변수와 데이터 모양 학습은 단순 문법 학습이 아니라 검증 능력입니다.

> [!TIP]
> AI에게 코드를 맡기기 전에 "이 화면에서 필요한 값 5개"를 type과 shape로 먼저 적어보세요. 그 목록이 prompt의 입력이 되고, 결과 코드의 review checklist가 됩니다.

## 한계와 트레이드오프

첫 번째 한계는 이 강의가 TypeScript type system을 다루지 않는다는 점입니다. 여기서 말하는 type은 JavaScript runtime value의 type입니다. TypeScript는 실행 전 static checking으로 데이터 모양을 검증하는 별도 층입니다. 둘을 섞으면 "TypeScript가 있으니 runtime 값은 안전하다" 같은 오해가 생깁니다.

두 번째 한계는 dynamic typing을 장점이나 단점 하나로만 볼 수 없다는 점입니다. 빠른 실험과 작은 스크립트에는 유연성이 도움이 됩니다. 반대로 큰 앱에서는 의도하지 않은 type 변화가 debugging 비용을 키웁니다. 이 trade-off는 TypeScript, 테스트, runtime validation 학습으로 이어집니다.

세 번째 한계는 object shape가 문서와 코드에서 동시에 관리되어야 한다는 점입니다. 문서에 `{ title, href }`라고 써 있어도 실제 API가 `{ label, url }`을 보내면 코드는 깨집니다. AI가 문서를 읽고 만든 코드도 실제 응답과 대조해야 합니다. shape는 말로 합의하는 것에서 끝나지 않고 실행 결과로 확인되어야 합니다.

네 번째 한계는 변수명을 잘 짓는 일이 type 검증을 대체하지 않는다는 점입니다. `completedLessons`라는 이름은 array처럼 보이지만 실제 값이 number일 수 있습니다. 좋은 이름은 추론을 돕지만 증거가 아닙니다. 값의 type과 shape를 확인하는 별도 절차가 필요합니다.

다섯 번째 한계는 예시 데이터와 실제 데이터의 차이입니다. 강의 예시의 object는 작고 깨끗합니다. 실제 앱에서는 optional field, null, 빈 array, 잘못된 API 응답이 섞입니다. 그래서 후속 강의에서 조건문, 오류 처리, 디버깅을 배웁니다. ==데이터 모양을 안다는 것은 정상 모양뿐 아니라 깨진 모양을 발견할 수 있다는 뜻입니다.==

## 더 읽기

먼저 MDN Variables 문서를 읽어 variable, `let`, `const`, value 저장의 기본을 확인하세요. 그 다음 MDN JavaScript data types and data structures에서 dynamic typing과 primitive/object 구분을 읽습니다. 이어서 Working with objects를 통해 property와 object shape를 확인하고, Indexed collections에서 Array가 list-like object로 설명되는 방식을 봅니다. Grammar and types는 literal을 넓게 정리할 때 참고하면 좋습니다.

- [Storing the information you need — Variables — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables)
- [JavaScript data types and data structures — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [Grammar and types — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
- [Working with objects — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- [Indexed collections — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)

읽을 때는 네 질문을 기준으로 보세요. 변수는 어떤 값을 가리키는가. 그 값의 runtime type은 무엇인가. object라면 어떤 properties가 있는가. array라면 각 element의 shape는 무엇인가. 이 네 질문이 다음 강의의 조건문, 반복문, 함수, 오류 처리로 이어집니다.
