# 용어 초안: javascript-dom-events

## DOM
- category: 웹 개발
- shortDefinition: 웹 문서 구조를 scripts와 programming languages가 다룰 수 있게 memory 안의 logical tree로 표현하는 Web API
- explanation: DOM은 HTML document를 node와 object로 이루어진 tree로 나타내며, JavaScript가 structure, style, content를 읽고 바꾸는 통로가 됩니다. JavaScript 언어 자체의 일부가 아니라 browser가 제공하는 Web API이므로 언어 문법과 DOM API를 구분해 읽어야 합니다.
- related: ["JavaScript", "HTML", "Event"]

## Event
- category: 웹 개발
- shortDefinition: EventTarget에서 발생한 사용자 행동이나 API 진행 상태를 나타내는 객체
- explanation: Event는 click, keyboard input, async task progress처럼 target에서 일어난 변화를 코드가 다룰 수 있게 표현합니다. event handler는 event object를 받아 target, propagation, type 같은 정보를 기준으로 후속 동작을 결정합니다.
- related: ["EventTarget", "addEventListener", "Event Delegation"]

## addEventListener
- category: Web API
- shortDefinition: 지정한 event가 target에 전달될 때 호출할 function을 등록하는 DOM API method
- explanation: addEventListener는 Element, Document, Window 같은 EventTarget에 listener function을 연결합니다. 버튼 click, form submit, list item 선택처럼 사용자 interaction을 JavaScript control flow로 이어 주는 핵심 method입니다.
- related: ["Event", "EventTarget", "JavaScript"]

## Event Bubbling
- category: Web API
- shortDefinition: child element에서 발생한 event가 parent 쪽으로 전파되는 event propagation 흐름
- explanation: Event Bubbling은 child를 click했을 때 parent listener도 event를 받을 수 있게 하는 흐름입니다. 이 특성 때문에 target과 currentTarget을 구분해야 하며, 많은 child에 listener를 붙이는 대신 parent listener로 처리하는 event delegation이 가능해집니다.
- related: ["Event", "Event Delegation", "DOM"]

## Event Delegation
- category: 웹 개발
- shortDefinition: child마다 listener를 붙이지 않고 parent listener와 bubbling을 이용해 event를 처리하는 패턴
- explanation: Event Delegation은 list나 table처럼 반복되는 child element가 많을 때 parent에 하나의 listener를 두고 event target을 확인하는 방식입니다. AI가 생성한 반복 handler를 검토할 때 listener 수와 propagation 경로를 줄이는 실무 기준이 됩니다.
- related: ["Event Bubbling", "addEventListener", "DOM"]
