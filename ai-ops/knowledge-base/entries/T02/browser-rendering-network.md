---
id: browser-rendering-network
title: "Browser Rendering and Network Flow (브라우저 렌더링과 네트워크 흐름)"
topicGroup: T02
status: draft
score: null
level: 중급
prerequisites: [html-semantic-elements, css-cascade-layout, javascript-dom-events, http-request-response]
successors: [web-performance-basics, frontend-debugging-devtools]
related: [http-request-response]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Populating the page: how browsers work", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work", checked: 2026-07-06 }
  - { title: "Critical rendering path", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path", checked: 2026-07-06 }
  - { title: "PerformanceNavigationTiming", url: "https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming", checked: 2026-07-06 }
  - { title: "PerformanceResourceTiming", url: "https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming", checked: 2026-07-06 }
  - { title: "Overview of HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
browser rendering and network flow는 URL navigation부터 HTTP response, HTML parsing, DOM/CSSOM construction, render tree, layout, paint까지 browser가 page를 표시하는 흐름이다. MDN은 navigation이 URL 입력, link click, form submit 등으로 page load의 first step이 된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
browser는 network로 받은 bytes를 HTML, CSS, JavaScript 처리 단계로 바꾸고, DOM과 CSSOM을 render tree와 layout/paint 단계로 연결한다. MDN은 parsing이 network data를 DOM and CSSOM으로 turn하는 step이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

## 역사
웹 page load 이해는 performance 문제를 해결하기 위해 중요해졌다. MDN은 fast load와 smooth interaction이 user experience 목표이며, browser 작동 방식을 이해하면 performance와 perceived performance 개선에 도움이 된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
Critical rendering path는 HTML, CSS, JavaScript가 visible page로 바뀌는 browser 내부 순서를 설명하는 performance 개념으로 쓰인다. MDN critical rendering path 문서는 browser가 HTML, CSS, JavaScript를 pixels on the screen으로 convert하는 sequence를 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path, 확인: 2026-07-06)

## 해결하려는 문제
화면이 느리거나 비어 보이거나 interaction이 막힐 때 단순히 "서버가 느리다" 또는 "CSS가 문제다"로 단정하면 원인을 찾기 어렵다. MDN은 performance issue가 latency와 browser single-threaded nature와 관련될 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
network request와 rendering pipeline을 함께 모르면 DevTools network timing, TTFB, resource download, parsing, layout, paint의 관계를 해석하기 어렵다. MDN은 initial HTML response, linked resources, parsing, render steps를 순서대로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

## 핵심 개념
1. Navigation: MDN은 navigation이 page loading의 first step이며 URL input, link click, form submit 등에서 발생한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
2. DNS/TCP/TLS: MDN은 navigation에서 DNS lookup, TCP handshake, TLS negotiation을 설명하고, connection이 secure해지면 content request를 보낼 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
3. HTTP response: MDN은 browser가 initial HTTP GET request를 보내고 server가 response headers와 HTML contents로 reply한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
4. Parsing: MDN은 parsing이 network로 받은 data를 DOM and CSSOM으로 turn하는 step이라고 설명한다. HTML parsing은 tokenization과 tree construction을 포함한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
5. DOM/CSSOM: MDN은 DOM tree가 document content를 describe하고 CSSOM tree가 CSS rules를 browser가 이해할 수 있는 styles map으로 변환한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
6. Render/Layout/Paint: MDN은 rendering steps가 style, layout, paint, compositing을 포함하고, DOM/CSSOM trees가 render tree로 combined된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
7. Performance timing APIs: MDN PerformanceNavigationTiming과 PerformanceResourceTiming 문서는 navigation과 resource timing data를 expose하는 Web APIs다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming, 확인: 2026-07-06)

## 관련 기술
HTTP request/response는 browser network flow의 application layer 메시지다. MDN HTTP overview는 browser가 HTML document를 fetch하기 위해 original request를 보내고 additional requests를 만든다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)
HTML, CSS, JavaScript는 rendering pipeline의 입력이다. MDN how browsers work 문서는 HTML parsing으로 DOM tree, CSS processing으로 CSSOM, JavaScript parsing/compilation, rendering steps를 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

## 선행 개념
html-semantic-elements: HTML markup이 DOM tree로 parsed되므로 semantic element 구조를 알아야 DOM construction을 이해할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
css-cascade-layout: CSSOM, computed styles, layout 단계는 CSS cascade와 layout 지식 위에 놓인다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
javascript-dom-events: JavaScript는 parsing/compilation되고 DOM API와 event system을 통해 page interaction에 영향을 준다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
http-request-response: browser network flow는 HTTP request와 response 구조를 기반으로 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview, 확인: 2026-07-06)

## 후행 개념
web-performance-basics: rendering/network flow를 알면 TTFB, resource timing, render-blocking, layout/reflow 같은 performance 진단으로 넘어갈 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
frontend-debugging-devtools: Network, Performance timing data, DOM/CSSOM/render 단계 이해가 DevTools 해석의 기반이 된다. PerformanceNavigationTiming와 ResourceTiming APIs 근거다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 "페이지가 느리다"고 고친 CSS나 JavaScript가 실제 bottleneck을 해결했는지 보려면 network latency, resource download, parsing, layout, paint를 분리해야 한다. MDN은 latency와 single-threaded nature가 web performance의 주요 issue라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
AI에게 성능 문제를 맡길 때는 URL, affected page, Network timing, response status, resource list, layout/paint symptoms를 함께 제공해야 한다. MDN의 browser flow와 performance timing APIs 설명은 evidence packet 구성 기준이 된다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming, 확인: 2026-07-06)

## 실무 활용
1. blank page debugging: HTTP response가 왔는지, HTML parsing이 되었는지, CSS/JS resource request가 실패했는지, render tree와 layout 단계로 갔는지 순서대로 확인한다. MDN browser flow에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
2. slow page triage: DNS/TCP/TLS/navigation, TTFB, resource download, CSS/JS parsing, layout/paint를 분리한다. MDN navigation/response/parsing/render 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
3. resource evidence: PerformanceResourceTiming로 resource timing을, PerformanceNavigationTiming으로 navigation timing을 볼 수 있다. MDN API 문서에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming, 확인: 2026-07-06)

```js
const navigation = performance.getEntriesByType("navigation")[0]
const resources = performance.getEntriesByType("resource")

console.log({
  navigationType: navigation?.entryType,
  resourceCount: resources.length,
})
```

## FAQ
Q: rendering 문제와 network 문제는 어떻게 구분하는가?
A: MDN flow 기준으로 request/response가 완료되기 전이면 network 또는 server evidence를 보고, response 이후 parsing/render/layout/paint 단계면 browser processing evidence를 본다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

Q: DOM과 CSSOM은 같은가?
A: 아니다. MDN은 DOM tree가 document content를 describe하고 CSSOM tree가 CSS rules를 browser가 이해할 styles map으로 만든다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

Q: JavaScript는 rendering에 영향을 주는가?
A: 그렇다. MDN은 JavaScript parsing, compilation, interpretation이 browser process에 포함되고 scripts can block rendering이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 느린 화면을 전부 서버 문제로 본다. 왜 생기나: request와 render pipeline을 분리하지 않기 때문이다. 교정: navigation, response, parsing, render를 단계별로 본다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
2. 실수: DOM node 수와 layout 비용을 무시한다. 왜 생기나: HTML은 텍스트라고만 생각하기 때문이다. 교정: DOM tree construction과 render tree/layout 단계의 관계를 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)
3. 실수: Network tab의 status만 보고 끝낸다. 왜 생기나: timing과 resource sequence를 보지 않기 때문이다. 교정: navigation/resource timing, response, linked resource request를 함께 본다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming, 확인: 2026-07-06)

## 공식 출처
- Navigation is the first step in loading a web page — [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
- Browser response includes headers and HTML contents — [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
- Parsing turns network data into DOM and CSSOM — [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
- Rendering includes style, layout, paint, and compositing — [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
- Navigation and resource timing APIs expose timing evidence — [PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming), [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming) (확인: 2026-07-06)

## Quote Bank
- > "Navigation is the first step in loading a web page."
  - 출처: [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
  - 맥락: browser load flow의 시작을 설명할 때 사용한다.
- > "the browser sends an initial HTTP GET request"
  - 출처: [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
  - 맥락: browser network request를 설명할 때 사용한다.
- > "Parsing is the step the browser takes to turn the data it receives over the network into the DOM and CSSOM"
  - 출처: [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
  - 맥락: network data와 rendering pipeline의 연결을 설명할 때 사용한다.
- > "Rendering steps include style, layout, paint, and in some cases compositing."
  - 출처: [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
  - 맥락: render 단계 구성요소를 설명할 때 사용한다.
- > "The DOM and CSSOM are both trees."
  - 출처: [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (확인: 2026-07-06)
  - 맥락: DOM/CSSOM 구조 비교에 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
