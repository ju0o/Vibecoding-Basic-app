---
id: control-flow-functions-errors
title: "Control Flow, Functions, and Errors (조건·반복·함수·오류)"
topicGroup: T01
status: draft
score: null
level: 입문
prerequisites: [variables-types-data]
successors: [debugging-error-reading, javascript-dom-events]
related: [variables-types-data, regex-code-search]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Making decisions in your code — Conditionals", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals", checked: 2026-07-06 }
  - { title: "Looping code", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops", checked: 2026-07-06 }
  - { title: "Functions — reusable blocks of code", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions", checked: 2026-07-06 }
  - { title: "Control flow and error handling", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling", checked: 2026-07-06 }
  - { title: "Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
제어 흐름은 코드가 어떤 순서와 조건으로 실행되는지 정하는 규칙이다. MDN은 conditionals가 조건에 따라 다른 코드를 실행하게 하고, loops가 반복 작업을 줄이는 구조라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06)
함수는 재사용 가능한 코드 블록이고, 오류 처리는 실패 상황을 감지하고 처리하는 흐름이다. MDN은 functions를 reusable blocks of code로 설명하고, control flow and error handling guide는 `throw`, `try...catch`, exception handling을 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 역사
조건, 반복, 함수, 오류 처리는 JavaScript가 웹 페이지의 동작을 구성할 때 필요한 기본 흐름 제어 요소로 문서화되어 있다. MDN JavaScript Guide는 control flow and error handling, functions를 핵심 주제로 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)
2026-07-06 기준 MDN의 초급 JavaScript 과정은 conditionals, loops, functions를 순차적으로 다루며, 각 주제를 실제 코드 구조로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions, 확인: 2026-07-06)
오류 처리는 예외를 던지고 잡는 구조로 발전했다. MDN은 `throw` statement와 `try...catch` statement를 JavaScript error handling의 구성요소로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 해결하려는 문제
조건문이 없으면 사용자 입력, 로그인 여부, 데이터 유무처럼 상황에 따라 다른 처리를 하기 어렵다. MDN conditionals 문서는 decision-making structure로 `if...else`와 `switch`를 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06)
반복문이 없으면 배열의 항목 처리나 같은 작업을 여러 번 수행하는 코드를 계속 복사해야 한다. MDN loops 문서는 loop가 반복 작업을 빠르게 완료하는 방법이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06)
함수가 없으면 같은 로직이 여러 위치에 흩어져 수정 비용이 커진다. MDN functions 문서는 function이 reusable blocks of code라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions, 확인: 2026-07-06)
오류 처리가 없으면 실패가 발생했을 때 프로그램 흐름을 설명하거나 복구하기 어렵다. MDN control flow guide는 exception handling statements를 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 핵심 개념
1. `if...else`: 조건이 true 또는 false인지에 따라 다른 code block을 실행한다. MDN conditionals 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06)
2. `switch`: 하나의 표현식을 여러 case와 비교하는 decision structure다. MDN conditionals 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06)
3. Loop: `for`, `while` 같은 loop는 반복 작업을 표현한다. MDN looping code 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06)
4. Function declaration: MDN JavaScript Guide는 function definition, function declaration, function expression을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)
5. Parameters and return values: MDN functions guide는 function이 parameters를 받을 수 있고 값을 return할 수 있음을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)
6. Exception: MDN control flow guide는 `throw` statement가 exception을 던지고 `try...catch`가 exception을 처리한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)
7. Scope: MDN functions guide는 function scope와 closures를 다루며, 함수 내부와 외부의 이름 접근 경계를 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)

## 관련 기술
- Control flow vs data shape: 제어 흐름은 값에 따라 코드 경로를 바꾸고, 데이터 모양은 그 판단의 재료가 되는 값 구조를 만든다. 이 연결은 MDN conditionals와 data structures 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures, 확인: 2026-07-06)
- Function vs method: MDN object guide는 object property value가 function이면 method라고 설명한다. 이 KB에서는 function 자체를 다루고, object method는 후속 객체 학습에서 확장한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects, 확인: 2026-07-06)
- Error handling vs debugging: error handling은 코드 안에서 실패를 처리하는 구조이고, debugging은 실패 원인을 찾아 수정하는 활동이다. MDN control flow guide와 troubleshooting guide의 범위 차이에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
- Loop vs recursion: 이 KB는 입문 단계의 loop를 우선 다룬다. MDN functions guide는 recursion을 functions의 고급 주제로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)

## 선행 개념
- variables-types-data: 조건문은 boolean 판단과 변수 값을 읽고, 함수는 parameter와 return value를 다루며, 반복문은 array 같은 데이터 구조를 순회한다. MDN conditionals, functions, indexed collections 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)

## 후행 개념
- debugging-error-reading: 오류 메시지와 stack trace를 읽으려면 어떤 함수와 어떤 분기에서 실패했는지 이해해야 한다. MDN control flow and error handling guide와 troubleshooting guide에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
- javascript-dom-events: event handler는 함수로 작성되고, 사용자 입력에 따라 conditionals와 state updates가 실행된다. MDN functions guide의 reusable blocks 설명을 선행 지식으로 사용한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 생성한 코드의 품질을 보려면 "어떤 조건에서 어떤 branch가 실행되는지", "함수가 입력을 받아 무엇을 반환하는지", "오류가 나면 어떤 흐름으로 처리되는지"를 읽어야 한다. 이 기준은 MDN conditionals, functions, error handling 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)
AI에게 수정을 요청할 때 "이 함수가 빈 배열이면 early return하게 해라", "실패하면 catch에서 사용자 메시지를 남겨라"처럼 control flow 단위로 말하면 변경 범위가 명확해진다. 이 연결은 MDN의 conditionals, loops, exception handling 구조에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 실무 활용
1. 입력 검증: 값이 비어 있거나 타입이 맞지 않으면 조건문으로 조기 반환한다. MDN conditionals와 functions 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)
2. 목록 렌더링 준비: array를 loop로 순회하거나 transform할 때 반복 구조를 사용한다. MDN loops와 indexed collections 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections, 확인: 2026-07-06)
3. 실패 처리: 외부 입력이나 API 호출 주변에는 `try...catch` 같은 exception handling 구조를 둔다. MDN control flow and error handling guide에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

```js
function getNextLessonTitle(lessons, currentIndex) {
  if (!Array.isArray(lessons) || lessons.length === 0) {
    return "학습할 강의가 없습니다."
  }

  const nextIndex = currentIndex + 1
  if (nextIndex >= lessons.length) {
    return "마지막 강의입니다."
  }

  return lessons[nextIndex].title
}
```

## FAQ
Q: 조건문과 반복문은 왜 같이 배우는가?
A: 둘 다 control flow를 바꾸는 기본 구조다. 조건문은 어떤 branch를 실행할지 정하고, 반복문은 같은 구조를 여러 번 실행한다. MDN conditionals와 loops 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06)

Q: 함수는 꼭 재사용할 때만 쓰는가?
A: 재사용이 중요한 이유지만, 함수는 입력, 처리, 반환을 하나의 이름 있는 단위로 묶는 역할도 한다. MDN은 functions를 reusable blocks of code로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions, 확인: 2026-07-06)

Q: 오류 처리는 디버깅과 같은가?
A: 아니다. 오류 처리는 코드가 실패를 다루는 구조이고, 디버깅은 실패 원인을 찾는 활동이다. MDN control flow guide와 troubleshooting guide의 범위가 다르다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)

Q: `throw`는 언제 필요한가?
A: 코드가 정상 흐름을 계속할 수 없는 상태를 exception으로 알릴 때 사용한다. MDN control flow guide는 `throw` statement와 exception handling을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 조건문을 여러 개 나열하고 우선순위를 추적하지 않는다. 왜 생기나: branch가 서로 배타적인지 확인하지 않기 때문이다. 교정: `if...else` 또는 `switch`로 decision structure를 명확히 한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals, 확인: 2026-07-06)
2. 실수: 반복문 안에서 종료 조건을 잘못 써서 무한 반복을 만든다. 왜 생기나: loop가 언제 멈추는지 확인하지 않기 때문이다. 교정: MDN loops 문서처럼 loop의 시작, 조건, 갱신을 분리해 읽는다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops, 확인: 2026-07-06)
3. 실수: 함수가 값을 반환하는지 console에 출력만 하는지 구분하지 않는다. 왜 생기나: 화면에 보이는 출력과 return value를 혼동하기 때문이다. 교정: function parameters와 return values를 명시적으로 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions, 확인: 2026-07-06)
4. 실수: `try...catch`로 모든 오류를 숨긴다. 왜 생기나: 오류 처리를 "안 보이게 하기"로 이해하기 때문이다. 교정: exception을 잡은 뒤 사용자가 이해할 메시지나 복구 흐름을 둔다. MDN exception handling 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 공식 출처
- conditionals는 조건에 따라 다른 코드 경로를 실행하는 decision structure다 — [Making decisions in your code — Conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) (확인: 2026-07-06)
- loops는 반복 작업을 코드로 표현한다 — [Looping code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops) (확인: 2026-07-06)
- functions는 reusable blocks of code다 — [Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) (확인: 2026-07-06)
- `throw`와 `try...catch`는 exception handling 흐름을 만든다 — [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) (확인: 2026-07-06)
- function declaration, expression, scope, closure는 JavaScript functions guide에서 설명된다 — [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) (확인: 2026-07-06)

## Quote Bank
- > "Making decisions in your code"
  - 출처: [Making decisions in your code — Conditionals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals) (확인: 2026-07-06)
  - 맥락: 조건문의 목적을 설명할 때 사용한다.
- > "Looping code"
  - 출처: [Looping code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops) (확인: 2026-07-06)
  - 맥락: 반복문의 역할을 설명할 때 사용한다.
- > "reusable blocks of code"
  - 출처: [Functions — reusable blocks of code](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions) (확인: 2026-07-06)
  - 맥락: 함수의 한 줄 정의를 만들 때 사용한다.
- > "Exception handling statements"
  - 출처: [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) (확인: 2026-07-06)
  - 맥락: 오류 처리와 control flow의 관계를 설명할 때 사용한다.
- > "Function declarations"
  - 출처: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) (확인: 2026-07-06)
  - 맥락: 함수 선언 문법을 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
