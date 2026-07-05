---
id: debugging-error-reading
title: "Debugging and Error Reading (디버깅과 오류 메시지 읽기)"
topicGroup: T01
status: draft
score: null
level: 기초
prerequisites: [control-flow-functions-errors]
successors: [regex-code-search, frontend-testing-basics, code-change-risk-analysis]
related: [terminal-shell-commands, variables-types-data]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "What went wrong? Troubleshooting JavaScript", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong", checked: 2026-07-06 }
  - { title: "JavaScript error reference", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors", checked: 2026-07-06 }
  - { title: "Control flow and error handling", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling", checked: 2026-07-06 }
  - { title: "Debugging in Visual Studio Code", url: "https://code.visualstudio.com/docs/editor/debugging", checked: 2026-07-06 }
  - { title: "Console", url: "https://developer.mozilla.org/en-US/docs/Web/API/console", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
디버깅은 코드가 기대와 다르게 동작하는 원인을 찾아 수정하는 활동이다. MDN은 troubleshooting JavaScript 문서에서 오류 메시지와 JavaScript console을 사용해 무엇이 잘못됐는지 찾는 흐름을 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
오류 메시지 읽기는 error type, message, file, line, 실행 흐름 같은 단서를 분리해 원인을 좁히는 작업이다. MDN JavaScript error reference는 다양한 JavaScript error message와 원인 설명을 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06)

## 역사
JavaScript 학습에서 디버깅은 문법과 제어 흐름 이후에 필요한 실전 기술로 문서화되어 있다. MDN은 초급 scripting 과정에서 variables, conditionals, loops, functions 뒤에 troubleshooting JavaScript를 배치한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
브라우저와 에디터는 오류 추적을 돕기 위해 console과 debugger를 제공한다. MDN console API는 debugging console에 접근하는 기능을 설명하고, VS Code debugging 문서는 breakpoints, call stack, variables 같은 debugger 기능을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/console, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
JavaScript error handling 구조는 exception을 던지고 처리하는 방식으로 정리된다. MDN control flow guide는 `throw`, `try...catch`, exception handling을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 해결하려는 문제
오류 메시지를 읽지 않으면 같은 명령이나 같은 코드 수정을 반복하면서 원인을 좁히지 못한다. MDN troubleshooting 문서는 JavaScript console을 사용해 오류를 찾는 과정을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
에러 이름과 메시지를 구분하지 않으면 syntax error, reference error, type error 같은 원인을 한 덩어리로 처리하게 된다. MDN JavaScript error reference는 오류 유형별 메시지 목록을 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06)
코드 실행 중 값을 확인할 도구가 없으면 추측으로 수정하게 된다. VS Code debugging 문서는 breakpoints, variable inspection, call stack을 디버깅 기능으로 설명한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)

## 핵심 개념
1. Error message: 오류가 무엇인지 설명하는 텍스트 단서다. MDN JavaScript error reference는 error message별 설명을 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06)
2. Error type: SyntaxError, ReferenceError, TypeError 같은 오류 이름은 원인 범주를 좁히는 단서다. MDN error reference의 분류에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06)
3. Console: MDN console API는 debugging console에 접근하는 기능을 제공한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/console, 확인: 2026-07-06)
4. Breakpoint: VS Code debugging 문서는 breakpoints를 code execution을 멈추는 지점으로 설명한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
5. Call stack: VS Code debugging 문서는 call stack view로 현재 실행 흐름을 볼 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
6. Variable inspection: VS Code debugging 문서는 variables view와 watch expressions로 실행 중 값을 확인하는 기능을 설명한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
7. Exception handling: `try...catch`는 오류를 잡아 처리하는 구조다. MDN control flow guide에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 관련 기술
- Debugging vs testing: 디버깅은 실패 원인을 찾는 활동이고, 테스트는 특정 기대 결과를 자동 또는 수동으로 확인하는 절차다. 이 KB는 디버깅을 다루며 frontend-testing-basics에서 테스트를 분리한다. VS Code debugging과 MDN troubleshooting 설명에 근거한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
- Console log vs debugger: console은 값을 출력해 단서를 남기고, debugger는 실행을 멈추고 상태를 조사한다. MDN console API와 VS Code debugging 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/console, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
- Error handling vs error reading: error handling은 코드 안의 복구 흐름이고, error reading은 출력된 실패 정보를 분석하는 활동이다. MDN control flow guide와 error reference에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06)
- Regex search: 오류 메시지의 함수명, 파일명, 코드 패턴을 찾을 때 정규식 검색이 쓰일 수 있다. 후속 regex-code-search에서 MDN regular expressions와 VS Code search를 연결한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 선행 개념
- control-flow-functions-errors: 오류는 특정 분기, 반복, 함수 호출, exception 흐름에서 발생하므로 control flow와 function 단위를 먼저 알아야 한다. MDN control flow and error handling guide에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 후행 개념
- regex-code-search: 오류 메시지의 symbol이나 pattern을 codebase에서 찾기 위해 search와 regular expression을 배운다. MDN regular expressions와 VS Code code basics search 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)
- frontend-testing-basics: 디버깅으로 찾은 재발 조건은 테스트로 고정할 수 있다. VS Code debugging 문서는 실행 중 상태 관찰을, 후속 테스트 KB는 기대 결과 검증을 다룬다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
- code-change-risk-analysis: 오류 원인을 이해해야 수정 범위와 회귀 위험을 판단할 수 있다. MDN troubleshooting 흐름에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)

## AI 시대에서의 의미
AI에게 "안 돼요"라고 말하는 것보다 command, current directory, error message, stack 위치, 재현 단계, 기대 결과를 제공해야 원인 분석이 가능해진다. 이 연결은 terminal-shell-commands의 command output 개념과 MDN error reference, VS Code debugging 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
AI가 제안한 수정이 맞는지 확인하려면 오류가 사라졌는지뿐 아니라 어떤 branch와 어떤 function에서 값이 어떻게 바뀌었는지 확인해야 한다. VS Code debugging 문서의 variables, watch, call stack 설명에 근거한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)

## 실무 활용
1. 오류 메시지 분해: error type, message, file, line, 재현 단계로 나누어 기록한다. MDN error reference와 troubleshooting 문서에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06)
2. console로 관찰: 값이 예상과 다른지 확인할 때 console API를 사용한다. MDN console API에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/API/console, 확인: 2026-07-06)
3. debugger로 멈추기: 반복문, 함수 호출, 조건 branch에서 breakpoint를 걸고 call stack과 variables를 확인한다. VS Code debugging 문서에 근거한다. (근거: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)

```js
function formatLessonCount(count) {
  if (typeof count !== "number") {
    throw new TypeError("count must be a number")
  }

  console.log("formatLessonCount input:", count)
  return `${count} lessons`
}
```

## FAQ
Q: 오류 메시지는 어디부터 읽어야 하는가?
A: error type과 message를 먼저 보고, 이어서 파일과 line, 실행 흐름을 확인한다. MDN error reference와 VS Code debugging call stack 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)

Q: console.log만으로 충분한가?
A: 간단한 값 확인에는 유용하지만, 실행을 멈추고 variables와 call stack을 보려면 debugger 기능이 필요하다. MDN console API와 VS Code debugging 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/console, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)

Q: try...catch를 넣으면 오류가 해결되는가?
A: 아니다. `try...catch`는 exception을 처리하는 흐름이고, 원인 자체를 고치는 것은 별도 작업이다. MDN control flow and error handling guide에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

Q: AI에게 오류를 물어볼 때 무엇을 줘야 하는가?
A: 오류 메시지 전체, 실행한 명령 또는 동작, 관련 코드 위치, 기대 결과를 함께 제공한다. 이 기준은 MDN troubleshooting과 VS Code debugging 정보 단위에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: error type을 보지 않고 메시지 일부만 검색한다. 왜 생기나: 오류 메시지를 긴 문장으로만 보기 때문이다. 교정: MDN error reference처럼 error type별로 원인을 분류한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06)
2. 실수: 코드 여러 곳을 한 번에 고친다. 왜 생기나: 원인을 좁히기 전에 해결을 시도하기 때문이다. 교정: breakpoint와 variables view로 한 지점씩 확인한다. (출처: https://code.visualstudio.com/docs/editor/debugging, 확인: 2026-07-06)
3. 실수: console.log를 남긴 채 커밋한다. 왜 생기나: 임시 관찰 코드를 디버깅 도구가 아니라 기능 코드처럼 남기기 때문이다. 교정: console API는 관찰 목적임을 구분하고 필요 없는 로그를 제거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/console, 확인: 2026-07-06)
4. 실수: catch에서 오류를 빈 값으로 바꿔 숨긴다. 왜 생기나: 오류 처리를 사용자에게 안 보이게 하는 것으로 오해하기 때문이다. 교정: exception handling 후 복구, 재시도, 사용자 메시지, 기록 중 하나를 명시한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling, 확인: 2026-07-06)

## 공식 출처
- MDN은 JavaScript 오류를 찾아보는 troubleshooting 흐름을 제공한다 — [What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong) (확인: 2026-07-06)
- JavaScript error reference는 error message별 설명을 제공한다 — [JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) (확인: 2026-07-06)
- `throw`와 `try...catch`는 exception handling 흐름이다 — [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) (확인: 2026-07-06)
- VS Code debugger는 breakpoints, variables, watch, call stack을 제공한다 — [Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging) (확인: 2026-07-06)
- console API는 debugging console에 접근하는 기능을 제공한다 — [Console](https://developer.mozilla.org/en-US/docs/Web/API/console) (확인: 2026-07-06)

## Quote Bank
- > "What went wrong?"
  - 출처: [What went wrong? Troubleshooting JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong) (확인: 2026-07-06)
  - 맥락: 디버깅의 핵심 질문을 소개할 때 사용한다.
- > "JavaScript error reference"
  - 출처: [JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) (확인: 2026-07-06)
  - 맥락: error message를 분류해 읽는 습관을 설명할 때 사용한다.
- > "Exception handling statements"
  - 출처: [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) (확인: 2026-07-06)
  - 맥락: 오류 처리와 디버깅의 차이를 설명할 때 사용한다.
- > "Breakpoints"
  - 출처: [Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging) (확인: 2026-07-06)
  - 맥락: 실행을 멈추고 상태를 보는 방법을 설명할 때 사용한다.
- > "debugging console"
  - 출처: [Console](https://developer.mozilla.org/en-US/docs/Web/API/console) (확인: 2026-07-06)
  - 맥락: console API의 역할을 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
