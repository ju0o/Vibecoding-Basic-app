## 한 줄 정의

제어 흐름은 코드가 어떤 순서와 조건으로 실행될지 정하는 구조이고, 함수는 그 흐름을 재사용 가능한 이름 있는 단위로 묶는 장치이며, 오류 처리는 정상 흐름이 깨졌을 때 실패를 드러내고 다루는 방식입니다. MDN은 conditionals를 test result에 따라 다른 code path를 실행하는 구조로 설명하고, loops를 반복 작업을 표현하는 구조로 설명합니다. 함수는 MDN의 표현처럼 reusable blocks of code입니다.

이 강의의 핵심은 조건문, 반복문, 함수, 오류 처리를 따로 외우는 것이 아닙니다. 네 개념은 모두 "코드가 어디로 흘러가는가"라는 하나의 질문에 답합니다. 조건문은 갈림길을 만들고, 반복문은 같은 길을 여러 번 돌게 하며, 함수는 길의 일부를 이름 붙여 다시 부르게 하고, 오류 처리는 더 이상 정상 길을 갈 수 없을 때 예외 흐름을 만듭니다.

AI가 만든 코드를 검토할 때도 이 관점이 필요합니다. 코드가 길어 보일 때 "문법이 맞나"만 보면 놓치는 것이 많습니다. 어떤 조건에서 어떤 branch가 실행되는지, 반복은 언제 멈추는지, 함수는 어떤 input을 받고 어떤 output을 내는지, 실패하면 어디서 잡히는지를 봐야 합니다. ==제어 흐름을 읽는다는 것은 코드의 가능한 경로를 읽는다는 뜻입니다.==

![제어 흐름과 오류 처리](/lesson-diagrams/control-flow-functions-errors/control-function-error-flow.svg)

## 왜 존재하는가

조건문은 프로그램이 상황을 구분해야 했기 때문에 존재합니다. 사용자 로그인이 되어 있는지, 검색어가 비어 있는지, 배열에 항목이 있는지, API 응답이 성공인지 실패인지에 따라 다음 행동은 달라집니다. MDN conditionals 문서는 조건문이 test result에 따라 다른 code paths를 실행한다고 설명합니다. 코드가 항상 한 줄 방향으로만 흘러간다면 실제 앱의 상황을 처리할 수 없습니다.

반복문은 같은 형태의 작업을 여러 번 해야 했기 때문에 존재합니다. 강의 목록 100개를 화면에 표시하거나, 검색 결과를 하나씩 확인하거나, error list를 순회할 때 같은 코드를 복사해서 붙이는 방식은 유지보수할 수 없습니다. MDN looping code 문서는 loop가 반복 작업을 빠르게 완료하는 방법이라고 설명합니다. 반복문은 코드 양을 줄이는 문법이 아니라, "여러 항목에 같은 규칙을 적용한다"는 생각을 표현합니다.

함수는 코드 덩어리를 이름 붙여 다시 쓰고, 입력과 출력을 분리하기 위해 존재합니다. MDN functions 문서는 function을 reusable blocks of code라고 설명합니다. 그러나 함수의 진짜 힘은 재사용만이 아닙니다. 함수는 프로그램의 생각 단위를 만듭니다. `getNextLessonTitle`이라는 함수 이름은 내부 구현을 보기 전에 "다음 강의 제목을 구한다"는 의도를 전달합니다.

오류 처리는 실패가 정상 흐름과 다르다는 사실을 표현하기 위해 존재합니다. MDN control flow and error handling guide는 `throw`, `try...catch`, exception handling을 다룹니다. 오류 처리가 없으면 실패는 무시되거나, 이상한 값으로 흘러가거나, 사용자가 이해할 수 없는 상태로 터집니다. 오류 처리는 실패를 숨기는 장치가 아니라 실패를 다룰 수 있게 만드는 구조입니다.

> [!KEY]
> 조건·반복·함수·오류 처리는 모두 코드의 실행 경로를 설계하는 도구입니다. 문법을 외우기 전에 "이 코드가 어떤 길로 흐르는가"를 먼저 보아야 합니다.

## 작동 원리

### 1. 조건문은 branch를 만듭니다

조건문은 어떤 test가 true인지 false인지에 따라 실행할 code block을 고릅니다. MDN conditionals 문서는 `if...else`, `else if`, `switch`, ternary operator를 decision structure로 설명합니다. 입문 단계에서 가장 중요한 것은 `if`가 "조건을 검사한다"는 사실보다, 조건의 결과가 실행 경로를 바꾼다는 점입니다.

예를 들어 `if (lessons.length === 0)`은 lesson array가 비었는지 검사합니다. 비었다면 "학습할 강의가 없습니다"를 반환하고, 아니라면 다음 로직으로 넘어갑니다. 이 구조를 early return이라고 부를 수 있습니다. KB에 없는 용어를 확장해 강의의 중심으로 삼지는 않지만, 원리는 조건문이 흐름을 짧게 끊을 수 있다는 것입니다.

AI가 만든 조건문을 검토할 때는 세 가지를 봅니다. 첫째, test가 실제 data shape와 맞는가. 둘째, true branch와 false branch가 모두 필요한 처리를 하는가. 셋째, 조건이 겹치거나 빠진 case가 없는가. 변수·타입·데이터 모양 강의가 선행인 이유가 여기에 있습니다.

### 2. 반복문은 collection에 규칙을 적용합니다

반복문은 같은 작업을 여러 번 실행합니다. MDN looping code 문서는 `for`, `while` 같은 반복 구조를 다룹니다. 반복문에서 핵심은 시작점, 계속할 조건, 한 번 돌 때마다 바뀌는 값입니다. 이 세 가지가 불명확하면 무한 반복이나 누락이 생깁니다.

배열을 다룰 때 반복문은 특히 중요합니다. 강의 목록이 array라면 각 lesson object에 같은 작업을 적용할 수 있습니다. 제목만 꺼내거나, 완료된 강의만 세거나, 링크 목록을 만들 수 있습니다. 반복문은 "목록에 같은 규칙을 적용한다"는 생각을 코드로 바꿉니다.

AI가 반복문을 만들었을 때는 종료 조건을 봐야 합니다. `i < lessons.length`인지, `i <= lessons.length`인지 차이는 마지막 index 접근 오류를 만들 수 있습니다. 또한 반복 안에서 원래 array를 바꾸는지, 새 array를 만드는지도 검토해야 합니다. KB는 이 세부 method를 다루지 않지만, 반복이 collection과 연결된다는 점은 분명히 합니다.

### 3. 함수는 입력과 출력을 가진 흐름 단위입니다

MDN JavaScript functions guide는 function declaration, expression, parameters, return values, scope를 설명합니다. 함수는 이름, parameter, body, return value로 읽을 수 있습니다. 이름은 의도를 말하고, parameter는 외부에서 들어오는 값이며, body는 처리 과정이고, return value는 밖으로 나가는 값입니다.

함수를 읽을 때 가장 먼저 볼 것은 내부 코드가 아니라 boundary입니다. 이 함수는 무엇을 받아야 하는가. 무엇을 반환해야 하는가. 오류 상황에서는 값을 반환하는가, exception을 던지는가. 이 boundary가 선명하면 AI에게 수정을 맡길 때도 범위를 좁힐 수 있습니다. "이 함수가 빈 배열이면 메시지를 반환하게 해라"는 좋은 지시입니다.

함수는 scope도 만듭니다. MDN functions guide는 function scope와 closures를 다룹니다. 입문 단계에서 closure를 깊게 다루지는 않지만, 함수 안에서 만든 이름과 밖에서 만든 이름의 접근 경계는 반드시 이해해야 합니다. 오류 메시지가 "변수를 찾을 수 없다"고 말할 때 scope 문제가 원인일 수 있습니다.

### 4. 오류 처리는 정상 경로 바깥의 흐름입니다

MDN control flow and error handling guide는 `throw` statement와 `try...catch` statement를 설명합니다. `throw`는 정상 흐름으로 계속할 수 없는 상태를 exception으로 드러냅니다. `try...catch`는 그런 exception을 잡아 처리합니다. 이 구조를 이해하지 못하면 catch를 "오류를 없애는 곳"으로 오해하기 쉽습니다.

오류 처리는 실패를 가리는 것이 아니라 실패를 의미 있는 흐름으로 바꾸는 일입니다. 예를 들어 `count`가 number가 아니면 TypeError를 던질 수 있습니다. 이때 caller는 catch에서 사용자에게 메시지를 보여주거나, 로그를 남기거나, fallback을 선택할 수 있습니다. 아무것도 하지 않는 catch는 실패를 숨길 뿐입니다.

### 5. 네 구조는 함께 작동합니다

실제 코드는 조건문, 반복문, 함수, 오류 처리를 따로 쓰지 않습니다. 함수 안에 조건문이 있고, 조건문 안에서 오류를 던질 수 있으며, 반복문 안에서 함수를 호출할 수 있습니다. 이 조합을 읽을 때는 흐름을 그림처럼 따라가면 됩니다. input이 들어오고, 조건을 지나고, 반복이 돌고, 함수가 값을 반환하고, 실패하면 예외 흐름으로 빠집니다.

AI 코드 리뷰에서 이 구조는 강력한 체크리스트가 됩니다. 어떤 input이 들어올 수 있는가. 빈 값이면 어디로 가는가. 배열이 길면 반복이 몇 번 도는가. 함수 return value는 caller가 기대한 shape인가. exception은 어디에서 처리되는가. ==좋은 리뷰는 코드 줄을 모두 설명하는 것이 아니라 가능한 실행 경로를 빠뜨리지 않는 것입니다.==

> [!EXAMPLE]
> 검색 기능을 만든다면 "검색어가 비어 있으면 바로 빈 결과", "검색어가 있으면 lesson 목록을 반복", "각 lesson을 검사하는 함수 호출", "데이터 shape가 잘못되면 오류 처리"처럼 흐름을 먼저 말할 수 있습니다.

## 스펙과 세부

### `if...else`와 `switch`

MDN conditionals 문서는 `if...else`와 `switch`를 조건에 따른 decision structure로 설명합니다. `if...else`는 조건식을 직접 쌓아갈 때 적합하고, `switch`는 하나의 표현식을 여러 case와 비교할 때 사용됩니다. 이 강의는 어떤 문법이 더 좋다고 일반화하지 않습니다. 핵심은 branch가 서로 어떤 관계인지 드러나는 구조를 고르는 것입니다.

### Loop의 종료 조건

반복문은 끝나야 합니다. MDN loops 문서가 반복을 다루는 이유는 같은 작업을 여러 번 수행하기 위함이지 무한히 수행하기 위함이 아닙니다. `for` loop에서는 보통 초기값, 조건, 갱신이 한 줄에 드러납니다. `while` loop에서는 조건이 true인 동안 계속됩니다. 어떤 구조를 쓰든 "언제 멈추는가"가 검토 기준입니다.

### Function declaration과 expression

MDN functions guide는 function declaration과 function expression을 모두 설명합니다. 입문 단계에서는 함수 선언이 이름 있는 재사용 단위를 만든다는 점을 먼저 잡습니다. expression, arrow function, closure는 후속 JavaScript와 React 강의에서 더 많이 만납니다. 그러나 어떤 형태든 parameter와 return value를 읽는 습관은 같습니다.

### Exception handling

MDN control flow guide는 exception handling statements를 다룹니다. `throw`는 오류를 발생시키고, `try...catch`는 이를 처리합니다. 이 구조는 모든 실패를 exception으로 만들라는 뜻이 아닙니다. 예상 가능한 빈 값은 조건문으로 처리할 수 있고, 정상 흐름으로 계속할 수 없는 계약 위반은 exception으로 드러낼 수 있습니다.

### 실행 가능한 예시

```js
function getNextLessonTitle(lessons, currentIndex) {
  if (!Array.isArray(lessons)) {
    throw new TypeError("lessons must be an array")
  }

  if (lessons.length === 0) {
    return "학습할 강의가 없습니다."
  }

  const nextIndex = currentIndex + 1
  if (nextIndex >= lessons.length) {
    return "마지막 강의입니다."
  }

  return lessons[nextIndex].title
}

try {
  const title = getNextLessonTitle([{ title: "변수" }, { title: "함수" }], 0)
  console.log(title)
} catch (error) {
  console.error("다음 강의 계산 실패:", error)
}
```

이 예시는 조건문, 함수, 오류 처리가 함께 움직이는 모습을 보여줍니다. 함수는 `lessons`와 `currentIndex`를 입력으로 받고 string을 반환합니다. `lessons`가 array가 아니면 TypeError를 던집니다. 빈 배열과 마지막 index는 조건문으로 정상 메시지를 반환합니다. `try...catch`는 실패를 사용자나 로그 흐름으로 연결합니다.

## 원문으로 읽기

> "Making decisions in your code"
>
> — 코드 안에서 결정을 내리기.
> [Making decisions in your code — Conditionals — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals)

조건문은 단순히 `if` 문법이 아닙니다. 코드가 입력과 상태에 따라 다른 결정을 하게 만드는 구조입니다. 이 문장을 우리 맥락으로 가져오면, AI가 만든 코드의 branch가 실제 제품 결정을 올바르게 표현하는지 검토해야 한다는 뜻이 됩니다.

> "Looping code"
>
> — 반복되는 코드.
> [Looping code — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops)

반복문은 코드를 짧게 쓰는 기교가 아니라, 여러 항목에 같은 규칙을 적용하는 구조입니다. 학습 사이트에서는 lesson 목록, glossary term 목록, search result 목록이 모두 반복의 대상입니다. 반복문을 읽으면 UI가 데이터 목록을 어떻게 다루는지 보입니다.

> "reusable blocks of code"
>
> — 재사용 가능한 코드 블록.
> [Functions — reusable blocks of code — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions)

함수의 재사용성은 단순 복사 제거보다 깊습니다. 함수는 코드를 이름 있는 생각 단위로 만듭니다. AI에게 함수 단위로 작업을 요청하면 변경 범위가 줄고, return value와 parameter를 기준으로 검증할 수 있습니다.

관련 원문(링크): [Control flow and error handling — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

이 인용은 오류 처리가 control flow의 일부임을 보여줍니다. 오류는 코드 바깥의 사고가 아니라, 코드가 실패를 어떤 경로로 다룰지 결정하는 구조입니다. catch를 비워두는 것은 오류 처리가 아니라 실패 정보를 버리는 일입니다.

관련 원문(링크): [Functions — JavaScript Guide — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

함수 선언은 이름 있는 실행 단위를 만듭니다. 코드베이스에서 function declaration을 찾으면 그 이름, parameter, return value를 먼저 읽으세요. 내부 구현은 그 다음입니다. 이 순서가 코드 리뷰와 AI 수정 요청을 안정시킵니다.

## 실전에서

### 패턴 1: 조건으로 위험한 입력을 먼저 걸러냅니다

함수 시작 부분에서 data shape가 맞는지 검사하면 뒤쪽 코드가 단순해집니다. `Array.isArray(lessons)` 같은 검사는 후속 로직이 array를 기대한다는 계약을 드러냅니다. 이 검사가 없으면 잘못된 값이 반복문으로 들어가 더 모호한 오류를 만들 수 있습니다.

### 패턴 2: 반복문은 목록의 의미와 함께 읽습니다

반복문을 볼 때 `for` 문법만 보지 말고 "무엇의 목록인가"를 먼저 보세요. lesson 목록인지, tag 목록인지, error 목록인지에 따라 element shape가 달라집니다. 반복문 내부에서 element의 property를 읽는다면, 그 property가 실제 shape에 있는지 확인해야 합니다.

### 패턴 3: 함수를 prompt의 작업 단위로 사용합니다

AI에게 "전체 검색 기능을 고쳐줘"라고 하면 변경 범위가 넓습니다. "이 함수가 빈 검색어를 받으면 빈 배열을 반환하게 해줘"라고 하면 input, branch, return value가 분명합니다. 함수 boundary가 좋은 prompt boundary가 됩니다.

### 패턴 4: 오류는 숨기지 않고 의미를 붙입니다

`catch (error) {}`처럼 빈 catch는 실패 정보를 지웁니다. 실제 코드에서는 사용자에게 보여줄 메시지, 로그, 재시도, fallback 중 하나를 선택해야 합니다. 어떤 선택이 맞는지는 기능의 위험도와 사용자 경험에 따라 다릅니다. 이 판단은 후속 debugging과 testing 강의에서 더 깊어집니다.

> [!WARNING]
> AI가 catch를 추가했는데 내부가 비어 있거나 모든 오류를 같은 메시지로 바꾸면, 오류 처리가 아니라 오류 은폐일 수 있습니다. catch 이후의 행동을 반드시 확인하세요.

## 한계와 트레이드오프

첫 번째 한계는 조건문이 많아질수록 흐름이 복잡해진다는 점입니다. 모든 case를 `if...else`로 쌓으면 빠르게 읽기 어려워집니다. 어떤 경우에는 `switch`, 데이터 mapping, 함수 분리가 더 나을 수 있습니다. 이 강의는 그 모든 refactoring 패턴을 다루지 않고, branch를 읽는 기본을 다룹니다.

두 번째 한계는 반복문이 데이터 변경과 결합될 때 위험해진다는 점입니다. 반복 중 원본 array를 수정하면 다음 index와 결과가 헷갈릴 수 있습니다. MDN loops의 기본을 넘어서는 array method와 immutable update 패턴은 후속 JavaScript/React 강의에서 다룹니다.

세 번째 한계는 함수가 너무 작아도, 너무 커도 문제가 된다는 점입니다. 작은 함수는 의미를 잘게 쪼개지만 흐름을 따라가기 어렵게 만들 수 있고, 큰 함수는 많은 branch와 side effect를 품습니다. 기준은 줄 수가 아니라 input/output과 책임이 분명한가입니다.

네 번째 한계는 exception을 남용하면 정상 흐름까지 예외 흐름처럼 보인다는 점입니다. 빈 검색 결과는 오류가 아닐 수 있습니다. 반대로 잘못된 data shape는 오류일 수 있습니다. 어떤 실패를 return value로 표현하고 어떤 실패를 exception으로 표현할지는 팀과 코드의 계약에 따라 달라집니다.

다섯 번째 한계는 AI가 control flow를 그럴듯하게 만들 수 있다는 점입니다. 문법이 맞아도 edge case가 빠질 수 있습니다. 빈 배열, 마지막 항목, 잘못된 type, 실패한 API 응답, 권한 없음 같은 case를 사람이 확인해야 합니다. ==AI 시대의 초보자는 코드를 다 외우는 사람이 아니라, 실행 경로의 빠진 case를 질문할 수 있는 사람이 되어야 합니다.==

## 더 읽기

먼저 MDN Conditionals를 읽어 `if...else`, `switch`, ternary가 어떤 decision structure인지 확인하세요. 이어서 MDN Looping code로 반복의 시작, 조건, 종료를 읽습니다. 그 다음 MDN Functions 문서 두 개를 읽어 reusable block, function declaration, parameter, return value, scope를 확인합니다. 마지막으로 Control flow and error handling에서 `throw`와 `try...catch`가 정상 흐름 바깥의 실패를 어떻게 다루는지 봅니다.

- [Making decisions in your code — Conditionals — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals)
- [Looping code — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops)
- [Functions — reusable blocks of code — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions)
- [Control flow and error handling — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Functions — JavaScript Guide — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

읽을 때는 다섯 질문을 반복하세요. 이 조건은 무엇을 판단하는가. 이 반복은 어떤 collection을 돈다. 이 함수는 무엇을 받고 무엇을 반환하는가. 실패는 return value인가 exception인가. 그리고 AI가 만든 흐름에서 빠진 case는 무엇인가. 이 질문들이 다음 디버깅 강의의 출발점입니다.
