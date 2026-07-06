# 용어 초안: browser-rendering-network

## Browser Rendering
- category: 웹 개발
- shortDefinition: browser가 HTML, CSS, JavaScript와 network data를 화면의 pixels로 바꾸는 과정
- explanation: Browser Rendering은 navigation과 HTTP response 이후 parsing, DOM/CSSOM construction, render tree, style, layout, paint, compositing 같은 단계를 거쳐 page를 표시하는 흐름입니다. 화면이 느리거나 비어 보일 때 원인을 network와 rendering 단계로 나누는 기준이 됩니다.
- related: ["DOM", "CSSOM", "Layout"]

## Critical Rendering Path
- category: 웹 성능
- shortDefinition: browser가 HTML, CSS, JavaScript를 화면 pixels로 바꾸기 위해 거치는 핵심 순서
- explanation: Critical Rendering Path는 visible page가 만들어지기까지 필요한 browser 내부 처리 흐름을 설명하는 performance 개념입니다. HTML parsing, CSSOM construction, render tree, layout, paint의 관계를 이해하면 blank page와 slow render 문제를 단계별로 볼 수 있습니다.
- related: ["Browser Rendering", "DOM", "CSSOM"]

## CSSOM
- category: 웹 개발
- shortDefinition: CSS rules를 browser가 이해할 수 있는 style map tree로 표현한 구조
- explanation: CSSOM은 DOM이 document content를 tree로 나타내는 것처럼 CSS rules를 browser가 계산 가능한 구조로 표현합니다. DOM과 CSSOM은 render tree와 layout으로 이어지므로 CSS cascade/layout 지식과 browser rendering 지식 사이의 연결점입니다.
- related: ["CSS", "DOM", "Render Tree"]

## Render Tree
- category: 웹 개발
- shortDefinition: DOM과 CSSOM을 결합해 화면에 그릴 대상과 style 정보를 만든 tree
- explanation: Render Tree는 document content와 CSS style 정보를 연결해 layout과 paint의 입력이 됩니다. DOM node가 모두 화면에 그려지는 것은 아니므로, render tree는 browser가 실제 표시할 구조를 계산하는 중간 단계로 이해할 수 있습니다.
- related: ["DOM", "CSSOM", "Layout"]

## Performance Timing
- category: 웹 성능
- shortDefinition: navigation과 resource loading의 timing data를 browser API로 관찰하는 방식
- explanation: PerformanceNavigationTiming과 PerformanceResourceTiming은 page navigation과 resource loading의 timing evidence를 제공합니다. AI에게 성능 문제를 맡길 때 URL, response status, resource list와 함께 timing data를 주면 network와 rendering 원인을 분리하기 쉬워집니다.
- related: ["Network", "Browser Rendering", "Performance"]
