---
id: javascript-dom-events
title: "JavaScript, DOM, and Events (JavaScript·DOM·이벤트)"
topicGroup: T02
status: draft
score: null
level: 기초
prerequisites: [html-semantic-elements, variables-types-data, control-flow-functions-errors]
successors: [browser-rendering-network, react-component-state]
related: [css-cascade-layout]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Document Object Model (DOM)", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model", checked: 2026-07-06 }
  - { title: "EventTarget: addEventListener() method", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener", checked: 2026-07-06 }
  - { title: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event", checked: 2026-07-06 }
  - { title: "Event bubbling", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling", checked: 2026-07-06 }
  - { title: "Document: querySelector() method", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
JavaScript DOM events는 browser가 만든 document object tree를 JavaScript로 읽고 바꾸며 user action이나 API event에 반응하는 구조다. MDN은 DOM이 web pages를 scripts 또는 programming languages에 연결하고 document structure를 memory 안에 표현한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
DOM은 JavaScript language 자체가 아니라 Web API이며, JavaScript는 browser context에서 DOM API를 사용해 document structure, style, content를 조작한다. MDN은 DOM이 JavaScript language의 core part가 아니라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)

## 역사
DOM은 HTML, SVG, XML documents를 objects로 modeling해 scripting languages가 문서와 상호작용할 수 있게 하는 API로 설명된다. MDN은 DOM이 특정 programming language와 독립적으로 설계되었고, 대부분의 web developers가 JavaScript를 통해 사용한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
event handling은 user click, keyboard input, async task progress 같은 변화에 code가 반응하게 한다. MDN Event 문서는 Event interface가 EventTarget에서 발생하는 event를 represent한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Event, 확인: 2026-07-06)

## 해결하려는 문제
HTML만 있으면 문서 구조를 표현할 수 있지만 user interaction에 반응하거나 content를 runtime에 바꾸기 어렵다. MDN은 DOM methods로 document structure, style, content를 change할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
event system이 없으면 button click, form interaction, keyboard action, async progress 같은 변화에 code를 연결하기 어렵다. MDN은 `addEventListener()`가 specified event가 target에 delivered될 때 called될 function을 설정한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, 확인: 2026-07-06)

## 핵심 개념
1. DOM tree: MDN은 DOM이 document를 logical tree로 represent하며 branch가 node로 끝나고 node가 objects를 contain한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
2. DOM method: DOM methods는 programmatic access to the tree를 제공하고 structure, style, content를 change할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
3. DOM과 JavaScript의 경계: MDN은 DOM이 JavaScript language의 part가 아니라 websites를 build하기 위한 Web API라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
4. Event: MDN은 Event interface가 EventTarget에서 일어나는 event를 represent하고, user action 또는 API progress를 나타낼 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Event, 확인: 2026-07-06)
5. addEventListener: MDN은 `addEventListener()`가 event가 target에 delivered될 때 호출될 function을 설정한다고 설명한다. common targets로 Element, Document, Window가 제시된다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, 확인: 2026-07-06)
6. Event propagation: MDN event bubbling lesson은 parent에 listener를 설정하고 child를 click할 때 일어나는 event bubbling을 설명한다. capture는 reverse order로 설명된다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)
7. Event delegation: MDN은 많은 child elements 각각에 listener를 붙이는 대신 parent listener와 bubbling을 이용하는 event delegation을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)

## 관련 기술
HTML semantic elements는 DOM tree의 element nodes를 의미 있게 만든다. MDN DOM 문서는 browser가 HTML document를 parse해 DOM tree를 build한다고 설명하고, HTML elements reference는 semantic elements의 역할을 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
CSS cascade/layout은 DOM element에 적용되는 style과 layout 결과를 만든다. DOM methods가 style을 바꿀 수 있다는 MDN 설명과 CSS cascade 설명이 연결된다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)

## 선행 개념
html-semantic-elements: DOM은 HTML document structure를 tree와 objects로 표현하므로 HTML element 구조를 먼저 알아야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
variables-types-data: DOM API returns objects and lists, event handler receives event objects, so JavaScript value와 object shape 이해가 필요하다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Event, 확인: 2026-07-06)
control-flow-functions-errors: event listener는 event가 발생했을 때 실행될 function이므로 function과 control flow 이해가 필요하다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, 확인: 2026-07-06)

## 후행 개념
browser-rendering-network: DOM tree는 rendering pipeline의 입력이다. MDN browser work 문서는 HTML parsing이 DOM tree를 build한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
react-component-state: React component model은 DOM update를 직접 반복하기보다 state와 rendering abstraction을 제공하므로 DOM/event 기초가 선행된다. React 출처는 후속 T03 KB에서 별도 수집한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 JavaScript interaction 코드를 생성할 때 DOM query target, event type, listener function, event propagation을 검토해야 한다. MDN `addEventListener()`와 Event 문서의 정의는 AI가 만든 click handler가 언제 실행되는지 확인하는 기준이 된다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/Event, 확인: 2026-07-06)
AI가 "버튼 클릭이 안 된다"고 만든 코드를 고칠 때는 HTML element, selector, listener registration, event target/currentTarget, propagation을 evidence packet으로 제공해야 한다. MDN event bubbling lesson은 target과 currentTarget, delegation 개념을 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)

## 실무 활용
1. DOM element 선택: `document.querySelector()`나 related methods로 target element를 잡고 null 가능성을 확인한다. MDN DOM examples는 `querySelectorAll()`과 `querySelector()`를 통해 elements를 access하는 예를 제시한다. (근거: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector, 확인: 2026-07-06)
2. event listener 등록: button이나 form에 `addEventListener()`로 handler를 등록한다. MDN은 `addEventListener()`가 specified event가 target에 delivered될 때 호출될 function을 설정한다고 설명한다. (근거: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, 확인: 2026-07-06)
3. event delegation: 많은 child item에 handler를 반복해서 붙이는 대신 parent에 listener를 두고 bubbling을 활용한다. MDN event bubbling lesson에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)

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

## FAQ
Q: DOM은 JavaScript인가?
A: 아니다. MDN은 DOM이 JavaScript language의 part가 아니라 websites를 build하기 위한 Web API라고 설명한다. JavaScript는 browser에서 DOM API를 사용한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)

Q: event listener는 어디에 붙는가?
A: MDN은 common targets로 Element, Document, Window를 들고, target은 events를 support하는 object일 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, 확인: 2026-07-06)

Q: bubbling은 나쁜 것인가?
A: 아니다. MDN은 bubbling이 annoying할 수도 있지만 event delegation에 유용하다고 설명한다. parent에 listener를 두고 child events가 bubble up되게 할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: DOM을 JavaScript 언어 자체로 착각한다. 왜 생기나: 거의 모든 DOM 예제가 JavaScript로 쓰이기 때문이다. 교정: DOM은 Web API이고 JavaScript는 그 API를 사용하는 언어라고 구분한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)
2. 실수: event.target과 currentTarget을 구분하지 않는다. 왜 생기나: bubbling 과정에서 parent listener가 child click을 받을 수 있기 때문이다. 교정: event object와 propagation 문서를 기준으로 target path를 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Event, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)
3. 실수: child마다 listener를 반복해서 붙인다. 왜 생기나: bubbling과 delegation을 모르기 때문이다. 교정: parent listener와 event delegation을 검토한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling, 확인: 2026-07-06)

## 공식 출처
- DOM connects web pages to scripts and represents document structure in memory — [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (확인: 2026-07-06)
- DOM represents documents as logical trees of nodes and objects — [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (확인: 2026-07-06)
- `addEventListener()` registers a function for delivered events — [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) (확인: 2026-07-06)
- Event represents an event on EventTarget — [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) (확인: 2026-07-06)
- Bubbling and delegation explain parent/child event handling — [Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) (확인: 2026-07-06)

## Quote Bank
- > "The Document Object Model (DOM) connects web pages to scripts or programming languages"
  - 출처: [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (확인: 2026-07-06)
  - 맥락: DOM의 목적을 설명할 때 사용한다.
- > "The DOM represents a document with a logical tree."
  - 출처: [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (확인: 2026-07-06)
  - 맥락: DOM tree 구조를 설명할 때 사용한다.
- > "Nodes can also have event handlers attached to them."
  - 출처: [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (확인: 2026-07-06)
  - 맥락: DOM node와 event handler의 연결을 설명할 때 사용한다.
- > "The DOM is not part of the JavaScript language"
  - 출처: [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (확인: 2026-07-06)
  - 맥락: DOM과 JavaScript의 경계를 설명할 때 사용한다.
- > "The `addEventListener()` method of the EventTarget interface sets up a function"
  - 출처: [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) (확인: 2026-07-06)
  - 맥락: listener registration을 설명할 때 사용한다.
- > "The `Event` interface represents an event which takes place on an EventTarget."
  - 출처: [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) (확인: 2026-07-06)
  - 맥락: event object의 의미를 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
