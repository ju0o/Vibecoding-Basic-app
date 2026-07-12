## 한 줄 정의

디버깅은 코드가 기대와 다르게 동작하는 원인을 찾아 수정하는 활동이고, 오류 메시지 읽기는 그 원인을 좁히기 위해 error type, message, location, 실행 상태를 분리해 해석하는 절차입니다. MDN은 Troubleshooting JavaScript 문서에서 JavaScript console을 사용해 오류를 찾고 고치는 흐름을 설명하고, JavaScript error reference에서 error message별 설명을 제공합니다. 즉 오류 메시지는 실패의 잡음이 아니라 원인을 좁히는 구조화된 단서입니다.

이 강의의 핵심은 "오류가 났다"에서 멈추지 않는 것입니다. 오류에는 이름이 있고, 메시지가 있고, 파일과 줄 정보가 있고, 특정 함수나 branch 안에서 발생한 맥락이 있습니다. VS Code debugging 문서는 breakpoints, variables, watch, call stack 같은 기능을 제공한다고 설명합니다. 이 도구들은 모두 같은 목적을 향합니다. 실행 중인 코드의 실제 상태를 추측이 아니라 관찰로 바꾸는 것입니다.

AI 시대의 디버깅은 더 중요해졌습니다. AI에게 오류를 물어볼 때 "안 돼요"라고 말하면 AI는 원인을 추측해야 합니다. 반대로 command, current directory, error message, 관련 코드, 기대 결과를 함께 주면 문제를 훨씬 좁게 볼 수 있습니다. ==오류 메시지는 AI에게 넘길 수 있는 가장 압축된 근거 자료==입니다.

![디버깅 증거 루프](/lesson-diagrams/debugging-error-reading/debugging-evidence-loop.svg)

## 왜 존재하는가

디버깅은 프로그램이 항상 의도대로 동작하지 않기 때문에 존재합니다. MDN troubleshooting 문서는 syntax errors, logic errors, runtime errors를 소개합니다. syntax error는 코드가 아예 실행되지 않게 만들 수 있고, runtime error는 실행 중 어떤 동작이 수행될 수 없을 때 발생하며, logic error는 문법은 맞지만 결과가 의도와 다를 때 생깁니다. 이 구분은 오류를 처음 읽는 사람에게 매우 중요합니다.

오류 메시지 읽기가 필요한 이유는 실패가 스스로 원인을 설명하지 않기 때문입니다. 같은 "화면이 안 보인다"도 import 경로 문제, undefined property 접근, 잘못된 조건문, 빈 배열, 잘못된 shell command 결과일 수 있습니다. MDN error reference는 다양한 JavaScript error message를 모아 설명합니다. 오류 메시지의 첫 줄을 읽으면 최소한 어떤 범주의 실패인지 알 수 있습니다.

console과 debugger가 필요한 이유는 추측을 줄이기 위해서입니다. MDN console API는 debugging console에 접근하는 기능을 제공합니다. VS Code debugger는 breakpoint에서 실행을 멈추고 variables, watch expressions, call stack을 볼 수 있게 합니다. print 기반 관찰과 breakpoint 기반 관찰은 모두 실행 상태를 드러내는 방법입니다.

AI가 코드를 생성하는 흐름에서는 디버깅이 검증의 언어가 됩니다. AI가 만든 코드가 실패했을 때 사용자는 "다시 해줘"보다 "이 command를 이 folder에서 실행했고, 이 TypeError가 이 파일의 이 line에서 났으며, expected value는 object였지만 actual value는 undefined다"라고 말할 수 있어야 합니다. 그 정도로 쪼개면 AI의 다음 수정도 더 좁아집니다.

> [!KEY]
> 디버깅은 감으로 고치는 일이 아니라, 실패를 error type·message·location·runtime state로 나누어 원인을 좁히는 일입니다.

## 작동 원리

### 1. 오류를 먼저 분류합니다

MDN troubleshooting 문서는 초급 단계에서 syntax error, logic error, runtime error를 구분합니다. syntax error는 코드 형식이 잘못되어 실행이 막히는 경우입니다. runtime error는 문법은 맞지만 실행 중 수행할 수 없는 동작이 생기는 경우입니다. logic error는 코드가 실행되지만 결과가 의도와 다른 경우입니다.

이 세 분류는 완벽한 taxonomy가 아니라 첫 진입점입니다. 오류 메시지가 있으면 syntax/runtime error일 가능성이 큽니다. 결과가 틀렸지만 메시지가 없으면 logic error일 수 있습니다. AI에게 문제를 설명할 때도 "오류 메시지가 있음"과 "결과만 틀림"을 구분해야 합니다. 이 구분이 없으면 AI는 완전히 다른 문제를 풀 수 있습니다.

### 2. error type과 message를 분리합니다

MDN error reference는 JavaScript error message별 설명을 제공합니다. `TypeError`, `ReferenceError`, `SyntaxError` 같은 이름은 실패 범주를 알려줍니다. message는 그 범주 안에서 무엇이 잘못됐는지 설명합니다. 예를 들어 "is not a function"은 어떤 값을 함수처럼 호출했지만 실제 함수가 아니었다는 단서가 됩니다.

입문자가 흔히 하는 실수는 메시지 일부만 검색하거나, error type을 무시하는 것입니다. `Cannot read properties of undefined`에서 중요한 것은 "undefined인 값에 property 접근을 시도했다"는 구조입니다. 그러면 다음 질문은 자연스럽게 이어집니다. 어떤 값이 undefined였는가. 그 값은 어디에서 만들어져야 했는가. 조건문이나 함수 return에서 빠진 case가 있는가.

### 3. location은 원인과 같은 말이 아닙니다

오류 메시지는 file과 line을 줄 수 있습니다. MDN troubleshooting 예시는 error message가 file name, line, character 정보를 제공하는 흐름을 보여줍니다. 하지만 위치는 오류가 드러난 지점이지 항상 원인이 만들어진 지점은 아닙니다. 어떤 변수에 잘못된 값이 들어온 원인은 훨씬 앞의 함수나 API 응답일 수 있습니다.

그래서 call stack이 필요합니다. VS Code debugging 문서는 call stack view를 제공합니다. call stack은 현재 실행이 어떤 함수 호출 경로를 지나왔는지 보여줍니다. 단일 line만 보지 않고 호출 경로를 보면 "누가 이 함수를 불렀는가", "어떤 input이 들어왔는가"를 확인할 수 있습니다.

### 4. console은 빠른 관찰 도구입니다

MDN console API는 debugging console에 접근하는 기능을 제공합니다. `console.log`는 값의 실제 상태를 빠르게 확인하는 데 유용합니다. 예를 들어 `console.log({ lessons, currentIndex })`를 넣으면 함수가 받은 input이 기대와 같은지 볼 수 있습니다. 이 방식은 단순하지만 강력합니다.

다만 console은 신중하게 사용해야 합니다. 너무 많은 log는 오히려 중요한 신호를 묻습니다. 임시 console을 남긴 채 commit하면 학습용 흔적이 제품 코드에 남을 수 있습니다. console은 관찰 도구이지 기능의 일부가 아닐 수 있습니다. 관찰이 끝나면 제거하거나 의도 있는 logging으로 바꾸어야 합니다.

### 5. debugger는 실행을 멈추고 상태를 봅니다

VS Code debugging 문서는 breakpoint, variables, watch, call stack 같은 기능을 설명합니다. breakpoint는 코드 실행을 특정 지점에서 멈춥니다. 멈춘 상태에서 variables를 보면 현재 scope의 값이 무엇인지 알 수 있고, watch expression으로 특정 표현식을 추적할 수 있습니다.

debugger의 장점은 흐름을 시간 순서로 볼 수 있다는 점입니다. 반복문이 몇 번 도는지, 조건이 언제 true가 되는지, 함수 return 전에 값이 어떻게 바뀌는지 확인할 수 있습니다. AI가 제안한 수정이 맞는지 확인할 때도 debugger는 유용합니다. "이제 오류가 안 난다"가 아니라 "이 값이 이 branch에서 원하는 shape가 된다"를 볼 수 있기 때문입니다.

### 6. exception handling과 debugging을 구분합니다

MDN control flow and error handling guide는 `throw`와 `try...catch`를 설명합니다. 이것은 코드가 실패를 다루는 구조입니다. 반면 debugging은 그 실패의 원인을 찾는 활동입니다. catch를 추가했다고 디버깅이 끝나는 것이 아닙니다. catch는 오류를 잡아 다음 행동을 할 수 있게 해줄 뿐입니다.

나쁜 예시는 `try { ... } catch {}`처럼 실패를 삼키는 코드입니다. 사용자에게 아무 메시지도, 로그도, fallback도 제공하지 않으면 원인이 더 숨겨집니다. 좋은 오류 처리는 실패를 분류하고, 필요한 맥락을 남기며, 사용자나 개발자가 다음 행동을 할 수 있게 합니다.

### 7. AI에게 줄 evidence packet을 만듭니다

AI 시대의 디버깅에서는 오류 정보를 작은 evidence packet으로 묶는 습관이 중요합니다. packet에는 실행한 command, current directory, shell, error message 전체, 관련 file path, 기대 결과, 실제 결과, 최근 변경 사항이 들어갈 수 있습니다. 이 구조는 terminal-shell-commands와 debugging KB가 만나는 지점입니다.

AI는 이 packet을 바탕으로 더 정확한 가설을 세울 수 있습니다. 반대로 packet이 없으면 AI는 일반적인 해결책을 나열하거나, 실제 프로젝트와 맞지 않는 코드를 제안할 수 있습니다. ==디버깅에서 좋은 prompt는 실패를 재현 가능한 증거로 포장한 것입니다.==

> [!EXAMPLE]
> "npm run build가 실패했습니다"보다 "`D:\project`에서 PowerShell로 `npm run build`를 실행했고, `src/app/page.tsx:42`에서 `TypeError: Cannot read properties of undefined`가 발생했습니다. `lesson`은 API 응답에서 온 object여야 합니다."가 훨씬 좋은 디버깅 입력입니다.

## 스펙과 세부

### Syntax, runtime, logic

MDN troubleshooting 문서의 세 오류 분류는 입문 단계의 좋은 체크리스트입니다. syntax error는 코드 형식 문제, runtime error는 실행 중 수행할 수 없는 작업, logic error는 문법과 실행은 되지만 결과가 의도와 다른 경우입니다. logic error는 메시지가 없을 수 있어 더 어렵습니다. 그래서 테스트와 관찰이 필요합니다.

### JavaScript error reference

MDN JavaScript error reference는 오류 메시지별 설명을 제공합니다. 실제 오류를 만났을 때 error type과 message를 그대로 검색하면 관련 문서를 찾을 수 있습니다. 단, 검색하기 전에 메시지를 줄이거나 번역하지 않는 편이 좋습니다. 원문 메시지의 단어가 정확한 검색 key가 되기 때문입니다.

### Console API

MDN console API는 debugging console에 접근하는 기능을 설명합니다. 입문자는 `console.log`를 가장 먼저 쓰지만, console은 단순 출력 그 이상입니다. 이 강의에서는 console method 전체를 외우지 않습니다. 목적은 실행 중 값과 흐름을 관찰하는 도구라는 점을 이해하는 것입니다.

### Breakpoint, variables, watch, call stack

VS Code debugger는 breakpoint로 멈추고, variables view로 현재 값을 보고, watch expressions로 특정 표현식을 확인하고, call stack으로 호출 경로를 추적하게 합니다. 이 네 가지는 디버깅의 중심 도구입니다. 오류 메시지만으로 원인을 찾기 어려울 때 debugger로 실제 상태를 봅니다.

### 실행 가능한 예시

```js
function formatLessonCount(count) {
  if (typeof count !== "number") {
    throw new TypeError("count must be a number")
  }

  console.log("formatLessonCount input:", count)
  return `${count} lessons`
}

try {
  console.log(formatLessonCount("3"))
} catch (error) {
  console.error("formatLessonCount failed:", error)
}
```

이 코드는 의도적으로 TypeError를 만듭니다. `"3"`은 string이고 함수는 number를 기대합니다. error type은 TypeError이고 message는 count가 number여야 한다고 말합니다. console output은 함수가 받은 input을 보여주고, catch는 실패를 기록합니다. 실제 프로젝트에서는 이 예시처럼 input type과 error handling을 함께 확인해야 합니다.

## 원문으로 읽기

> "What went wrong?"
>
> — 무엇이 잘못되었는가?
> [What went wrong? Troubleshooting JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong)

이 질문은 디버깅의 출발점입니다. "어떻게 고치지?"보다 먼저 "무엇이 잘못되었는가?"를 물어야 합니다. 원인을 분류하지 않은 수정은 우연히 맞을 수 있지만 재현 가능한 실력이 되지 않습니다.

> "JavaScript error reference"
>
> — JavaScript 오류 참조.
> [JavaScript error reference — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)

오류 메시지는 검색 가능한 자료입니다. 메시지를 통째로 읽고 error reference와 대조하면, 그 오류가 일반적으로 어떤 상황에서 발생하는지 알 수 있습니다. AI에게도 error message 원문을 유지해 전달하는 것이 좋습니다.

> "Exception handling statements"
>
> — exception handling statements.
> [Control flow and error handling — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)

오류 처리는 control flow입니다. 실패를 잡아서 숨기는 곳이 아니라, 실패 이후의 행동을 정하는 곳입니다. catch block 안에 어떤 정보를 남길지, 어떤 사용자 메시지를 줄지, 다시 던질지까지가 설계입니다.

관련 원문(링크): [Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging)

breakpoint는 "여기서 멈춰서 보자"는 도구입니다. AI가 수정한 코드가 맞는지 확인할 때 breakpoint를 걸면 실제 값과 branch를 볼 수 있습니다. 눈으로 코드를 읽는 것과 실행 중 상태를 보는 것은 다릅니다.

관련 원문(링크): [Console — MDN](https://developer.mozilla.org/en-US/docs/Web/API/console)

console은 가장 가까운 관찰 도구입니다. 값이 예상과 다른지 빠르게 확인할 수 있습니다. 단, console output도 evidence이므로 어떤 시점의 어떤 값인지 함께 읽어야 합니다.

## 실전에서

### 패턴 1: 오류 메시지를 4칸으로 나눕니다

첫 칸은 error type입니다. 두 번째는 message입니다. 세 번째는 file/line location입니다. 네 번째는 재현 상황입니다. 이 네 칸을 채우면 대부분의 "안 돼요"가 기술적 질문으로 바뀝니다. AI에게도 이 형태로 전달하면 더 정확한 답을 얻을 수 있습니다.

### 패턴 2: location에서 시작하되 원인을 거슬러 올라갑니다

오류가 난 line을 열어보는 것은 맞습니다. 그러나 그 line만 고치려고 하면 원인을 놓칠 수 있습니다. undefined가 들어온 line은 결과일 수 있고, 실제 원인은 API 응답, 조건문 누락, 함수 return value일 수 있습니다. call stack과 변수 값을 함께 확인하세요.

### 패턴 3: console은 좁게 넣고 빨리 지웁니다

`console.log`는 강력하지만 무분별하게 남기면 noise가 됩니다. 확인하고 싶은 값 하나, branch 하나, function input 하나를 정해서 넣습니다. 확인이 끝나면 제거하거나 의도 있는 logging으로 바꿉니다. console은 실험 장치입니다.

### 패턴 4: debugger로 "값이 바뀌는 순간"을 봅니다

오류가 반복문 안에서만 발생하거나 특정 조건에서만 발생한다면 debugger가 좋습니다. breakpoint로 멈추고 variables와 watch를 확인하면 값이 언제 잘못되는지 볼 수 있습니다. AI가 제안한 수정이 실제로 그 순간을 바꾸는지도 확인할 수 있습니다.

### 패턴 5: AI에게 evidence packet을 줍니다

AI와 협업할 때는 error message 전체를 복사하고, 실행한 명령과 환경을 함께 전달합니다. "이 파일의 이 함수에서 이 input을 넣었을 때 이 메시지가 났다" 정도로 쓰면 좋습니다. command output, shell, current directory는 terminal-shell-commands에서 배운 검증 단위와 연결됩니다.

> [!TIP]
> 오류를 AI에게 묻기 전, 메시지를 한국어로 요약하지 말고 원문 그대로 보존하세요. 요약은 사람이 읽기 편하지만, 원문 메시지는 검색과 원문 대조에 더 강합니다.

## 한계와 트레이드오프

첫 번째 한계는 오류 메시지가 항상 원인을 직접 말하지 않는다는 점입니다. 메시지는 실패가 드러난 지점을 보여주지만, 그 값을 만든 원인은 다른 함수에 있을 수 있습니다. 그래서 line number와 call stack을 함께 봐야 합니다.

두 번째 한계는 console logging이 모든 문제를 해결하지 않는다는 점입니다. 빠른 관찰에는 좋지만, 비동기 흐름, 반복 중 상태 변화, 여러 함수 호출 경로를 보기에는 debugger가 더 적합할 수 있습니다. console과 debugger는 경쟁 도구가 아니라 서로 다른 관찰 도구입니다.

세 번째 한계는 catch를 추가하면 오류가 "사라진 것처럼" 보일 수 있다는 점입니다. 실제로는 실패 정보가 숨겨졌을 뿐일 수 있습니다. 오류 처리는 사용자 메시지, 로그, fallback, 재시도, 재throw 같은 후속 행동을 설계해야 합니다.

네 번째 한계는 AI가 오류 메시지를 보고도 잘못된 일반 해결책을 제안할 수 있다는 점입니다. AI 답변은 실행 결과와 코드 diff로 검증해야 합니다. error type과 message가 맞는 방향을 가리키더라도, 프로젝트의 실제 data shape와 control flow를 확인해야 합니다.

다섯 번째 한계는 logic error입니다. logic error는 메시지 없이 결과만 틀릴 수 있습니다. 이 경우에는 expected result와 actual result를 비교하고, breakpoint나 test로 흐름을 확인해야 합니다. ==오류 메시지가 없다고 문제가 없는 것이 아닙니다. 결과가 틀리면 그것도 디버깅 대상입니다.==

## 더 읽기

먼저 MDN Troubleshooting JavaScript를 읽어 error type과 console 기반 오류 찾기 흐름을 확인하세요. 이어서 MDN JavaScript error reference에서 실제 error message가 어떻게 분류되는지 봅니다. Control flow and error handling을 읽어 exception handling이 정상 흐름 바깥의 control flow임을 확인합니다. VS Code Debugging 문서에서는 breakpoint, variables, watch, call stack을 확인하고, MDN Console 문서에서는 console API의 역할을 봅니다.

- [What went wrong? Troubleshooting JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong)
- [JavaScript error reference — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)
- [Control flow and error handling — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging)
- [Console — MDN](https://developer.mozilla.org/en-US/docs/Web/API/console)

읽을 때는 여섯 질문을 기준으로 삼으세요. 오류 type은 무엇인가. message는 무엇을 말하는가. location은 어디인가. 실제 원인은 그 line인가 더 앞인가. 실행 중 value는 무엇인가. AI에게 전달할 evidence packet은 충분한가. 이 질문이 다음 정규식 코드 검색 강의로 이어집니다.
