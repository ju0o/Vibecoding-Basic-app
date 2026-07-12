## 한 줄 정의

JavaScript DOM events는 browser가 만든 document object tree를 JavaScript로 읽고 바꾸며, user action이나 API event에 반응하게 만드는 구조입니다. MDN은 DOM이 web pages를 scripts 또는 programming languages에 연결하고 document structure를 memory 안에 표현한다고 설명합니다. Event는 EventTarget에서 발생하는 변화를 나타내고, `addEventListener()`는 지정한 event가 target에 delivered될 때 호출할 function을 설정합니다.

이 강의의 핵심은 세 가지 경계를 분리하는 것입니다. 첫째, HTML은 문서 구조를 적습니다. 둘째, DOM은 그 구조를 browser memory 안의 logical tree와 object로 표현합니다. 셋째, JavaScript는 DOM API를 사용해 structure, style, content를 바꾸고 event에 반응합니다. ==DOM은 JavaScript 언어 그 자체가 아니라, JavaScript가 browser 안에서 사용하는 Web API==입니다.

이 구분을 세우면 "버튼 클릭이 안 된다"는 문제를 훨씬 정확하게 나눌 수 있습니다. 버튼 element가 HTML에 있는가, DOM에서 selector가 찾는가, listener가 등록됐는가, event가 target에 delivered 되는가, bubbling 과정에서 target과 currentTarget을 혼동하지 않았는가를 순서대로 확인할 수 있습니다.

![DOM event flow](/lesson-diagrams/javascript-dom-events/dom-event-flow.svg)

## 왜 존재하는가

HTML만으로도 문서의 구조와 내용을 표시할 수 있습니다. 하지만 사용자가 button을 click했을 때 menu를 열거나, form 입력에 반응하거나, list item을 선택했을 때 detail panel을 바꾸려면 runtime interaction이 필요합니다. MDN은 DOM methods로 document structure, style, content를 change할 수 있다고 설명합니다.

DOM은 이 interaction의 연결 지점입니다. browser는 HTML document를 parse해 DOM tree를 만들고, JavaScript는 DOM API로 그 tree에 접근합니다. 이 구조가 없으면 JavaScript는 문서의 element를 안전하게 찾고 변경할 표준 통로를 갖기 어렵습니다. DOM은 문서와 script 사이의 공용 모델입니다.

event system은 두 번째 연결 지점입니다. 사용자의 click, keyboard input, async task progress 같은 변화는 code가 언제 실행되어야 하는지 알려 줍니다. event handling이 없다면 프로그램은 사용자의 행동을 기다리고 반응하는 구조를 만들기 어렵습니다. Event interface와 `addEventListener()`는 이 변화를 object와 function call로 연결합니다.

AI 코딩 시대에는 이 기초가 더 중요합니다. AI는 click handler를 쉽게 생성하지만, selector가 틀리거나 null 가능성을 무시하거나, child마다 listener를 반복해서 붙이거나, bubbling을 고려하지 않는 코드를 만들 수 있습니다. DOM/event 흐름을 모르면 "AI가 만들어 준 코드가 왜 안 되는지"를 설명할 수 없습니다.

> [!KEY]
> DOM event 코드를 검토할 때는 selector, target element, listener registration, event object, propagation 순서로 나누어 봅니다.

## 작동 원리

### 1. Browser가 document를 DOM tree로 표현합니다

MDN은 DOM이 document를 logical tree로 represent하며 branch가 node로 끝나고 node가 objects를 contain한다고 설명합니다. 이 tree는 HTML source text와 완전히 같은 것이 아니라, browser가 해석한 document model입니다. JavaScript는 이 model을 통해 element와 node에 접근합니다.

이 관점은 selector debug의 출발점입니다. HTML 파일에 코드가 있다는 것과 JavaScript가 runtime에 DOM element를 찾는 것은 같은 일이 아닙니다. script가 실행되는 시점, selector 문자열, document structure가 맞아야 target을 얻을 수 있습니다. `document.querySelector()`가 null을 반환할 수 있다는 사실은 이 runtime 접근의 결과입니다.

### 2. DOM은 structure, style, content를 바꿀 수 있는 method를 제공합니다

MDN은 DOM methods가 tree에 programmatic access를 제공하고 document structure, style, content를 change할 수 있다고 설명합니다. 이 말은 DOM이 읽기 전용 문서 지도만이 아니라, 화면의 일부를 바꾸는 API surface라는 뜻입니다. JavaScript는 DOM을 통해 text를 바꾸고 class를 추가하고 element를 만들고 style을 조정할 수 있습니다.

하지만 DOM을 바꾼다는 것은 HTML 원본 파일을 자동으로 수정한다는 뜻이 아닙니다. browser memory 안의 현재 document representation을 바꾸는 것입니다. 초보자가 "HTML은 그대로인데 화면은 왜 바뀌지?"라고 느끼는 이유가 여기에 있습니다. JavaScript는 runtime에 DOM을 바꾸고, browser는 그 변화에 따라 화면을 다시 계산할 수 있습니다.

### 3. DOM은 JavaScript language가 아니라 Web API입니다

MDN은 DOM이 JavaScript language의 core part가 아니라고 설명합니다. 이 구분은 초보자에게 매우 중요합니다. `let`, `const`, function, object, array 같은 것은 JavaScript language의 범위입니다. `document.querySelector`, `addEventListener`, `Event`는 browser context에서 제공되는 Web API입니다.

==JavaScript 문법 오류와 DOM API 사용 오류를 구분하는 것만으로도 디버깅 품질이 올라갑니다.== 예를 들어 `const`를 잘못 쓴 문제와 selector가 element를 찾지 못한 문제는 다릅니다. AI에게 오류를 물을 때도 "JavaScript syntax error인지, DOM target 문제인지"를 나누어 제공하면 분석이 더 정확해집니다.

### 4. Event는 변화가 일어났다는 object입니다

MDN Event 문서는 Event interface가 EventTarget에서 일어나는 event를 represent한다고 설명합니다. event는 단순히 "click이 있었다"는 문자열이 아니라, target, type, propagation 같은 정보를 담을 수 있는 object입니다. handler function은 이 event object를 받아 어떤 element에서 어떤 변화가 일어났는지 판단합니다.

이 관점은 event.target과 currentTarget의 차이를 이해하는 데 필요합니다. bubbling 과정에서 parent listener가 child event를 받을 수 있기 때문에, event가 처음 발생한 target과 listener가 붙은 current target이 다를 수 있습니다. 이 구분을 모르면 list item click을 처리할 때 잘못된 element를 읽을 수 있습니다.

### 5. addEventListener는 event와 function을 연결합니다

`addEventListener()`는 specified event가 target에 delivered될 때 called될 function을 설정합니다. common targets로 Element, Document, Window가 제시됩니다. 즉 listener는 아무 곳에나 떠 있는 함수가 아니라 특정 EventTarget에 연결된 callback입니다.

이 구조는 control flow와도 연결됩니다. script가 실행되면서 listener를 등록하고, 나중에 event가 delivered되면 handler function이 실행됩니다. 그래서 event code는 위에서 아래로 한 번 실행되는 코드와 다르게 읽어야 합니다. 등록 시점과 실행 시점이 다릅니다. AI가 생성한 event code를 볼 때도 "이 함수는 지금 실행되는가, 아니면 event 때 실행되도록 등록되는가"를 구분해야 합니다.

### 6. Bubbling은 parent로 event가 올라가는 흐름입니다

MDN event bubbling lesson은 parent에 listener를 설정하고 child를 click할 때 일어나는 event bubbling을 설명합니다. bubbling은 child에서 발생한 event가 parent 쪽으로 전파되는 흐름입니다. capture는 reverse order로 설명됩니다. 입문 단계에서는 bubbling이 event delegation의 기반이라는 점을 먼저 잡으면 됩니다.

bubbling은 문제가 될 수도 있고 도구가 될 수도 있습니다. child button을 눌렀는데 parent card click handler도 실행되어 unexpected navigation이 생길 수 있습니다. 반대로 많은 child item에 listener를 각각 붙이는 대신 parent list에 하나의 listener를 두고 event.target을 확인하는 event delegation을 만들 수도 있습니다.

### 7. Event delegation은 반복 listener를 줄입니다

MDN은 많은 child elements 각각에 listener를 붙이는 대신 parent listener와 bubbling을 이용하는 event delegation을 설명합니다. list item이 100개라면 각 item마다 click listener를 붙이는 대신 list container에 하나를 붙이고, event target에서 어떤 item인지 읽을 수 있습니다. 이 패턴은 dynamic list에서도 유용합니다.

```js
const list = document.querySelector("[data-lesson-list]")

list?.addEventListener("click", (event) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) return
  const lessonSlug = target.dataset.lessonSlug
  if (!lessonSlug) return
  console.log(`open lesson: ${lessonSlug}`)
})
```

이 KB 예시는 몇 가지 좋은 습관을 보여 줍니다. `querySelector` 결과에 optional chaining을 사용해 null 가능성을 고려하고, `event.target`이 HTMLElement인지 확인하고, dataset에서 필요한 값이 있을 때만 후속 동작을 합니다. AI가 event delegation을 생성했다면 이런 guard가 있는지 확인해야 합니다.

> [!WARNING]
> event delegation은 편리하지만 target 확인을 생략하면 parent 영역의 엉뚱한 click까지 처리할 수 있습니다.

## 스펙과 세부

### DOM tree와 node/object

DOM은 document를 logical tree로 표현합니다. branch는 node로 끝나고 node는 objects를 contain합니다. 이 표현은 HTML source를 tree model로 바꿔 JavaScript가 접근할 수 있게 합니다. 따라서 DOM 코드를 읽을 때는 string이 아니라 tree와 object를 다룬다고 생각해야 합니다.

### DOM과 JavaScript 경계

DOM은 JavaScript language의 core part가 아닙니다. JavaScript가 DOM을 자주 사용하기 때문에 둘이 붙어 보일 뿐입니다. browser 밖의 JavaScript runtime에서는 DOM API가 없을 수 있습니다. 이 사실은 AI가 생성한 JavaScript 코드를 실행 환경별로 검토할 때 중요합니다.

### EventTarget과 listener

`addEventListener()`는 EventTarget interface method입니다. target은 Element, Document, Window처럼 events를 support하는 object일 수 있습니다. listener function은 지정한 event가 target에 delivered될 때 호출됩니다. 이 구조 때문에 listener registration line과 handler execution timing을 구분해야 합니다.

### Event object

Event interface는 EventTarget에서 발생하는 event를 나타냅니다. user action, API progress 같은 변화를 담을 수 있습니다. event object를 handler parameter로 받아 target, type, propagation state를 확인하는 것은 event code의 기본입니다.

### Bubbling과 capture

event propagation에는 bubbling과 capture 흐름이 있습니다. KB는 bubbling과 delegation에 집중하고, capture는 reverse order로 설명된다는 수준만 다룹니다. 초보 단계에서는 bubbling이 parent listener와 child target을 연결한다는 점을 먼저 이해하면 충분합니다.

### querySelector

`document.querySelector()`는 selector에 match되는 첫 element를 찾는 method입니다. 실무에서는 결과가 없을 수 있으므로 null 가능성을 확인해야 합니다. AI가 생성한 code가 `document.querySelector(".button").addEventListener(...)`처럼 바로 체이닝하면, element가 없을 때 runtime error가 날 수 있습니다.

> [!TIP]
> event bug를 AI에게 줄 때는 HTML snippet, selector, listener code, 실제 click target, console error를 함께 제공하면 원인 분리가 쉬워집니다.

## 원문으로 읽기

> "The Document Object Model (DOM) connects web pages to scripts or programming languages"
>
> — Document Object Model은 web page를 scripts 또는 programming languages에 연결한다.
> [Document Object Model — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (CC-BY-SA)

이 인용은 DOM을 "브라우저 안의 보이지 않는 구조"로만 보지 않게 합니다. DOM의 역할은 web page와 script를 연결하는 것입니다. JavaScript interaction은 이 연결 위에서 작동합니다.

> "The DOM represents a document with a logical tree."
>
> — DOM은 document를 logical tree로 표현한다.
> [Document Object Model — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (CC-BY-SA)

logical tree라는 표현은 DOM debug의 핵심입니다. HTML source를 눈으로 보는 것과 browser가 만든 DOM tree를 JavaScript로 탐색하는 것은 연결되어 있지만 완전히 같은 경험은 아닙니다. selector와 event target은 이 tree 안에서 확인해야 합니다.

> "Nodes can also have event handlers attached to them."
>
> — node에는 event handler를 붙일 수도 있다.
> [Document Object Model — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (CC-BY-SA)

DOM이 단순한 data structure가 아니라 interaction surface라는 점을 보여 주는 문장입니다. node에 handler를 붙이면 user action이나 event에 대한 code path가 생깁니다. UI가 정적 문서에서 상호작용 앱으로 바뀌는 순간입니다.

관련 원문(링크): [Document Object Model — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

이 문장은 입문자의 큰 오해를 바로잡습니다. JavaScript 문법과 DOM API를 구분하면 오류를 더 정확히 분류할 수 있습니다. AI가 생성한 코드가 실패했을 때도 language 문제인지 browser API 문제인지 먼저 나누어야 합니다.

관련 원문(링크): [EventTarget.addEventListener — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

listener는 event가 발생했을 때 실행될 function을 target에 설정하는 구조입니다. 이 인용은 event handler가 즉시 실행되는 일반 함수 호출과 다르다는 점을 보여 줍니다. 등록과 실행 시점의 차이를 이해해야 event flow를 읽을 수 있습니다.

관련 원문(링크): [Event — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Event)

event object는 단순 알림이 아니라 어디에서 어떤 event가 일어났는지 나타내는 API 객체입니다. target/currentTarget, event type, propagation을 이해하려면 event를 object로 다루는 관점이 필요합니다.

## 실전에서

### 1. DOM element 선택은 실패 가능성을 포함해 씁니다

DOM 코드는 target element를 찾는 것에서 시작합니다. 이때 selector가 틀리거나 element가 아직 없으면 결과가 없을 수 있습니다. 그래서 `querySelector()` 결과를 바로 사용하기보다 null 가능성을 확인합니다. TypeScript를 쓰는 프로젝트라면 타입 좁히기와 runtime guard가 함께 필요할 수 있습니다.

```js
const button = document.querySelector("[data-open-menu]")

button?.addEventListener("click", () => {
  document.body.classList.toggle("menu-open")
})
```

이 코드는 element가 없으면 listener를 등록하지 않습니다. 작은 차이지만 AI 생성 코드에서 자주 놓치는 부분입니다. AI가 "버튼 클릭 handler를 추가했다"고 하면 selector가 실제 HTML과 match되는지 먼저 확인해야 합니다.

### 2. Listener 등록과 handler 실행을 구분합니다

event code는 읽는 순서가 중요합니다. script가 load될 때 listener registration code가 실행되고, 실제 handler는 나중에 event가 delivered될 때 실행됩니다. 이 차이를 모르면 "왜 console.log가 바로 안 찍히지?" 또는 "왜 page load 때 실행되지?" 같은 혼란이 생깁니다.

```js
button?.addEventListener("click", (event) => {
  console.log(event.type)
})
```

여기서 `console.log`는 listener를 등록하는 순간이 아니라 click event가 target에 delivered될 때 실행됩니다. AI에게 event code를 설명하게 할 때도 registration time과 event time을 나누어 말하게 하면 좋습니다.

### 3. Delegation은 반복 UI에서 유용합니다

강의 목록, todo list, table row처럼 child item이 많거나 동적으로 바뀌는 UI에서는 parent listener가 유용합니다. parent에 listener를 하나 붙이고 event.target을 확인하면 child마다 listener를 반복하지 않아도 됩니다. 하지만 target 확인과 dataset validation을 생략하면 버그가 생깁니다.

> [!EXAMPLE]
> 커리큘럼 list에서 lesson card가 100개라면 각 card에 listener를 붙이는 대신 list container에 click listener를 두고, clicked element의 `data-lesson-slug`를 확인하는 delegation이 더 단순할 수 있습니다.

### 4. AI 디버깅 요청은 evidence packet으로 만듭니다

"버튼이 안 눌려요"는 원인 분석에 부족합니다. HTML element snippet, selector string, listener code, console error, click한 element, expected behavior, actual behavior를 함께 주면 AI가 DOM target 문제인지 event propagation 문제인지 handler 내부 로직 문제인지 나눌 수 있습니다.

> [!KEY]
> DOM event evidence packet은 HTML, selector, listener, event object 관찰, console output을 함께 담아야 합니다.

## 한계와 트레이드오프

첫째, DOM API를 직접 쓰는 방식은 명확하지만, 큰 UI에서는 상태 관리가 어려워질 수 있습니다. 많은 element를 직접 선택하고 수동으로 content와 style을 바꾸면 코드가 흩어질 수 있습니다. React 같은 framework가 등장하는 배경에는 DOM update를 직접 반복하기보다 state와 rendering abstraction으로 관리하려는 필요가 있습니다. 이 강의는 React를 자세히 다루지 않고 DOM/event 기초만 다룹니다.

둘째, event delegation은 항상 정답이 아닙니다. parent listener 하나로 많은 child를 처리할 수 있지만, event.target 확인이 복잡하거나 propagation을 막아야 하는 UI에서는 오히려 코드가 어려워질 수 있습니다. child별 behavior가 완전히 다르면 직접 listener가 더 명확할 때도 있습니다.

셋째, bubbling은 유용하지만 예상치 못한 side effect를 만들 수 있습니다. child button click이 parent card click으로 이어져 navigation이 발생할 수 있습니다. 이때 단순히 propagation을 막는 코드만 추가하기보다, event 구조와 handler 책임을 다시 보는 것이 좋습니다. ==bubbling은 버그 원인이면서 동시에 delegation을 가능하게 하는 메커니즘==입니다.

넷째, DOM과 JavaScript 경계를 잊으면 실행 환경 문제를 잘못 해석합니다. browser에서는 `document`가 있지만 server-side JavaScript나 build-time code에서는 없을 수 있습니다. AI가 생성한 코드를 어디에서 실행할지 확인하지 않으면 DOM API 사용이 실패할 수 있습니다.

마지막으로, DOM을 바꾸는 것이 곧 source HTML을 바꾸는 것은 아닙니다. runtime DOM manipulation은 현재 page state를 바꿉니다. 이 차이를 이해하면 "파일에는 없는데 화면에는 있다" 또는 "새로고침하면 사라진다" 같은 현상을 더 쉽게 설명할 수 있습니다.

## 더 읽기

먼저 MDN의 [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)을 읽어 DOM이 document structure를 memory 안에서 logical tree로 표현하고 scripts와 연결하는 방식을 확인합니다. 이 문서의 "DOM is not part of JavaScript language" 문장은 반드시 기억할 기준입니다.

다음으로 [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)와 [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)를 함께 읽습니다. listener registration과 event object를 같이 봐야 event handler code가 언제 왜 실행되는지 이해할 수 있습니다.

그다음 [Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)을 읽어 bubbling, capture, delegation을 연결합니다. 마지막으로 [Document.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)를 읽어 selector 기반 DOM access가 어떻게 실패하거나 성공하는지 확인합니다.

후속 학습은 `browser-rendering-network`입니다. DOM tree는 rendering pipeline의 입력이고, JavaScript는 parsing/compilation 및 DOM interaction을 통해 page rendering과 interaction에 영향을 줍니다. 이 강의에서 배운 DOM/event 흐름이 다음 강의의 browser pipeline 이해로 이어집니다.
