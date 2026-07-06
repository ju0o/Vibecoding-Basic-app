## 한 줄 정의

브라우저 렌더링과 네트워크 흐름은 URL navigation에서 시작해 HTTP response, HTML/CSS parsing, DOM/CSSOM construction, render tree, layout, paint까지 browser가 page를 표시하는 전체 경로입니다. MDN은 navigation이 URL 입력, link click, form submit 등으로 page load의 first step이 된다고 설명하고, parsing이 network data를 DOM과 CSSOM으로 바꾸는 단계라고 말합니다. 이 강의는 이 흐름을 "브라우저 내부 지식"이 아니라, page load 문제를 원인별로 나누는 실무 지도처럼 읽습니다.

초보자는 화면이 늦게 뜨거나 blank page가 나오면 "서버가 느린가?", "CSS가 문제인가?", "JavaScript가 터졌나?"를 한꺼번에 묻게 됩니다. 하지만 browser flow를 알면 질문이 더 작아집니다. request가 나갔는가, response가 왔는가, HTML이 parsing됐는가, CSSOM이 만들어졌는가, render tree와 layout/paint까지 갔는가를 순서대로 나눌 수 있습니다.

==브라우저 문제를 잘 읽는다는 것은 network와 rendering을 한 덩어리로 보지 않고 단계별 evidence로 분리하는 일==입니다. AI에게 성능 문제를 맡길 때도 마찬가지입니다. URL, response status, Network timing, resource list, layout/paint symptom을 함께 주면 AI는 추측보다 근거 기반으로 원인을 좁힐 수 있습니다.

![Browser rendering and network flow](/lesson-diagrams/browser-rendering-network/browser-rendering-network-flow.svg)

## 왜 존재하는가

웹 page는 단순히 HTML 파일 하나를 화면에 복사해 붙이는 방식으로 표시되지 않습니다. browser는 URL navigation을 처리하고, 필요한 network connection을 만들고, HTTP request를 보내고, server response를 받은 뒤, HTML과 CSS와 JavaScript를 parse하고, 화면에 그릴 구조를 계산합니다. 이 흐름은 page load performance와 user experience에 직접 연결됩니다.

MDN은 fast load와 smooth interaction이 user experience 목표이며, browser 작동 방식을 이해하면 performance와 perceived performance 개선에 도움이 된다고 설명합니다. 사용자는 내부 pipeline을 보지 않지만, 느린 response, render-blocking resource, layout delay, script blocking의 결과를 체감합니다. 따라서 개발자는 browser가 page를 채우는 순서를 알아야 합니다.

Critical rendering path는 이 필요에서 중요한 개념입니다. MDN critical rendering path 문서는 browser가 HTML, CSS, JavaScript를 screen pixels로 convert하는 sequence를 다룹니다. 이 개념은 "화면이 왜 늦게 보이는가"를 단순 감이 아니라 browser 단계로 설명하게 해 줍니다.

AI 시대에는 이 이해가 더 필요합니다. AI가 "CSS를 최적화했습니다" 또는 "JavaScript를 줄였습니다"라고 말해도 실제 bottleneck이 network latency인지 parsing인지 layout인지 확인하지 않으면 개선을 검증할 수 없습니다. browser flow는 AI가 제안한 성능 수정이 어떤 단계에 영향을 주는지 묻는 기준입니다.

> [!KEY]
> page load 문제는 server, network, parsing, rendering, layout, paint 중 어디에서 막히는지 나누어야 합니다. 한 단어로 "느리다"라고 부르면 원인이 흐려집니다.

## 작동 원리

### 1. Navigation이 page load의 출발점입니다

MDN은 navigation이 page loading의 first step이라고 설명합니다. navigation은 URL을 입력하거나 link를 click하거나 form을 submit할 때 발생할 수 있습니다. 이 단계에서 browser는 어떤 resource를 가져와야 하는지 결정하고 network flow를 시작합니다.

navigation을 출발점으로 보는 이유는 debugging 순서 때문입니다. blank page가 나왔을 때 먼저 "브라우저가 올바른 URL로 navigation했는가"를 봐야 합니다. URL이 틀렸거나 route가 잘못됐으면 rendering pipeline을 보기 전에 request 자체가 잘못된 것입니다. AI에게 문제를 줄 때도 affected page URL을 반드시 포함해야 합니다.

### 2. DNS, TCP, TLS는 content request 전의 연결 준비입니다

MDN how browsers work는 navigation에서 DNS lookup, TCP handshake, TLS negotiation을 설명하고, connection이 secure해지면 content request를 보낼 수 있다고 말합니다. 이 단계들은 HTML parsing 이전의 network 준비입니다. 사용자는 "사이트 열기" 하나로 보지만, browser는 server address 찾기와 connection setup을 먼저 처리합니다.

이 단계가 느리면 HTML을 받기 전부터 delay가 생깁니다. 따라서 성능 문제를 볼 때 response body 크기만 볼 수 없습니다. DNS, connection, TLS timing이 영향을 줄 수 있습니다. 이 강의는 DevTools UI 세부를 직접 인용하지 않지만, PerformanceNavigationTiming 같은 timing API가 navigation timing evidence를 제공한다는 KB 근거를 사용합니다.

### 3. Browser는 initial HTTP GET request를 보냅니다

MDN은 browser가 initial HTTP GET request를 보내고 server가 response headers와 HTML contents로 reply한다고 설명합니다. 이 단계는 HTTP request/response 강의와 연결됩니다. browser network flow는 결국 HTTP message를 주고받는 흐름입니다.

HTML document response가 오면 browser는 page를 만들기 시작합니다. 하지만 HTML 하나만으로 끝나지 않을 수 있습니다. MDN HTTP overview는 browser가 HTML document를 fetch한 뒤 scripts, CSS, images/videos 같은 sub-resources에 additional requests를 만든다고 설명합니다. 따라서 Network evidence를 볼 때 initial document request와 linked resource requests를 나누어 봐야 합니다.

### 4. Parsing은 network data를 DOM과 CSSOM으로 바꿉니다

MDN은 parsing이 browser가 network로 받은 data를 DOM and CSSOM으로 turn하는 step이라고 설명합니다. HTML parsing은 tokenization과 tree construction을 포함합니다. 이 말은 response bytes가 곧바로 화면이 아니라, browser가 이해할 수 있는 tree structure로 바뀌어야 한다는 뜻입니다.

HTML parsing은 DOM tree를 만들고, CSS processing은 CSSOM을 만듭니다. DOM tree는 document content를 describe하고, CSSOM tree는 CSS rules를 browser가 이해할 수 있는 styles map으로 변환합니다. ==DOM과 CSSOM은 rendering의 입력이므로 HTML/CSS 기초가 browser 성능 이해의 기반==입니다.

### 5. DOM과 CSSOM은 render tree로 결합됩니다

MDN은 DOM and CSSOM trees가 render tree로 combined된다고 설명합니다. DOM은 content structure를, CSSOM은 style information을 제공합니다. render tree는 화면에 그릴 대상과 style을 연결해 layout과 paint 단계로 이어지는 구조입니다.

이 단계는 "HTML은 있는데 화면에 왜 안 보이지?" 같은 질문을 분해하게 합니다. DOM node가 존재해도 CSS 때문에 표시되지 않을 수 있고, CSSOM이 늦게 만들어지거나 render-blocking resource가 있으면 visible page가 늦어질 수 있습니다. 이 강의는 render-blocking 세부를 확장하지 않지만, DOM/CSSOM/render tree 관계는 blank page와 slow render를 이해하는 최소 지도입니다.

### 6. Rendering steps에는 style, layout, paint, compositing이 포함됩니다

MDN은 rendering steps가 style, layout, paint, 일부 경우 compositing을 포함한다고 설명합니다. layout은 각 box의 위치와 크기를 계산하는 단계로 볼 수 있고, paint는 그 결과를 화면에 그리는 단계로 볼 수 있습니다. CSS layout 강의에서 배운 normal flow, grid, media query는 이 rendering 단계에서 실제 화면 계산과 연결됩니다.

layout 문제가 있으면 network request가 성공해도 화면은 깨질 수 있습니다. response status가 200이고 HTML도 왔지만, CSS가 잘못되어 content가 overflow되거나 invisible할 수 있습니다. 따라서 Network tab의 status만 보고 "문제 없음"이라고 말하면 안 됩니다. status는 한 evidence일 뿐이고, render/layout/paint symptom도 함께 봐야 합니다.

### 7. Performance timing APIs는 evidence를 제공합니다

MDN PerformanceNavigationTiming과 PerformanceResourceTiming 문서는 navigation과 resource timing data를 expose하는 Web APIs입니다. 이 API들은 browser flow를 추측이 아니라 timing evidence로 볼 수 있게 해 줍니다. Navigation timing은 document navigation 관련 지표를, resource timing은 CSS, JS, image 같은 resource loading data를 관찰하는 데 도움이 됩니다.

KB 예시는 `performance.getEntriesByType("navigation")`과 `"resource"`를 사용합니다. 이 API를 직접 사용하는 목적은 전문가처럼 모든 timing field를 외우는 것이 아니라, "network와 resource loading evidence를 코드로도 볼 수 있다"는 감각을 얻는 것입니다. AI에게 성능 문제를 맡길 때는 이런 evidence를 함께 제공할 수 있습니다.

```js
const navigation = performance.getEntriesByType("navigation")[0]
const resources = performance.getEntriesByType("resource")

console.log({
  navigationType: navigation?.entryType,
  resourceCount: resources.length,
})
```

이 코드는 page navigation entry와 resource entries의 존재를 확인합니다. 실제 분석에서는 더 많은 timing field를 볼 수 있지만, 이 강의에서는 KB 범위를 넘지 않기 위해 entry type과 resource count 수준의 evidence 흐름만 사용합니다.

> [!WARNING]
> Network status가 200이라고 해서 rendering 문제가 없는 것은 아닙니다. response 이후 parsing, DOM/CSSOM, layout, paint 단계가 남아 있습니다.

## 스펙과 세부

### Navigation source

navigation은 URL 입력, link click, form submit 같은 사용자 또는 page action에서 시작될 수 있습니다. 따라서 debugging report에는 affected URL뿐 아니라 어떤 행동으로 그 page load가 시작됐는지도 중요합니다. direct URL input인지, internal link click인지, form submit인지에 따라 request context가 달라질 수 있습니다.

### DNS/TCP/TLS

DNS lookup은 host를 network address로 찾는 단계이고, TCP handshake는 connection을 만드는 단계이며, TLS negotiation은 secure connection을 준비하는 단계입니다. KB는 이 세부를 MDN navigation 설명 안에서 다룹니다. 이 단계들이 끝나야 secure content request를 보낼 수 있습니다.

### HTTP response

browser는 initial HTTP GET request를 보내고 response headers와 HTML contents를 받습니다. response status와 headers는 Network evidence의 중요한 일부입니다. 하지만 response body가 왔다는 것과 visible page가 완성됐다는 것은 다릅니다. response는 rendering pipeline의 입력을 제공할 뿐입니다.

### Parsing과 tree construction

parsing은 network data를 DOM과 CSSOM으로 turn하는 단계입니다. HTML parsing은 tokenization과 tree construction을 포함합니다. 이 단계에서 malformed markup이나 blocking resource 문제를 의심할 수 있지만, 이 강의는 KB 범위 안에서 DOM/CSSOM construction 중심으로 설명합니다.

### DOM/CSSOM

DOM tree는 document content를 describe합니다. CSSOM tree는 CSS rules를 browser가 이해할 수 있는 styles map으로 변환합니다. 둘은 모두 tree 구조입니다. DOM과 CSSOM이 결합되어 render tree가 만들어진다는 점이 browser rendering 이해의 핵심입니다.

### Style/Layout/Paint/Compositing

rendering steps는 style, layout, paint, compositing을 포함합니다. style 단계는 적용 style을 계산하고, layout은 box geometry를 계산하며, paint는 pixels로 그리는 과정과 연결됩니다. compositing은 일부 경우 별도 단계로 다뤄질 수 있습니다. 이 세부는 performance deep dive의 출발점입니다.

### Timing APIs

PerformanceNavigationTiming과 PerformanceResourceTiming은 browser가 navigation/resource timing data를 expose하는 API입니다. 이들은 DevTools만이 아니라 code에서도 evidence를 얻을 수 있음을 보여 줍니다. AI debugging context에는 timing data, response status, resource list를 함께 넣으면 좋습니다.

## 원문으로 읽기

> "Navigation is the first step in loading a web page."
>
> — navigation은 web page loading의 첫 단계다.
> [Populating the page: how browsers work — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (CC-BY-SA)

이 문장은 page load debugging의 첫 질문을 정해 줍니다. 먼저 navigation이 무엇으로 시작됐는지, URL이 무엇인지, request가 나갔는지 봐야 합니다. rendering 문제를 보기 전에 load가 올바르게 시작됐는지 확인해야 합니다.

> "the browser sends an initial HTTP GET request"
>
> — browser는 initial HTTP GET request를 보낸다.
> [Populating the page: how browsers work — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (CC-BY-SA)

browser rendering은 network와 분리된 마법이 아닙니다. initial HTML document를 가져오기 위해 HTTP request가 먼저 필요합니다. HTTP 강의에서 배운 request/response 구조가 browser pipeline의 앞단에 놓입니다.

> "Parsing is the step the browser takes to turn the data it receives over the network into the DOM and CSSOM"
>
> — parsing은 browser가 network로 받은 data를 DOM과 CSSOM으로 바꾸는 단계다.
> [Populating the page: how browsers work — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (CC-BY-SA)

이 인용은 network와 rendering의 연결 고리입니다. bytes가 response로 왔다고 곧바로 화면이 되는 것이 아니라, browser가 DOM과 CSSOM이라는 구조로 바꿔야 합니다. blank page와 slow page를 볼 때 response 이후의 처리 단계를 확인해야 하는 이유입니다.

> "Rendering steps include style, layout, paint, and in some cases compositing."
>
> — rendering steps에는 style, layout, paint, 그리고 어떤 경우에는 compositing이 포함된다.
> [Populating the page: how browsers work — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (CC-BY-SA)

rendering이라는 한 단어 안에도 여러 단계가 있습니다. layout 문제와 paint 문제를 모두 "렌더링 문제"라고만 부르면 원인 분리가 어렵습니다. 이 인용은 rendering을 더 작은 evidence 단위로 나누게 해 줍니다.

> "The DOM and CSSOM are both trees."
>
> — DOM과 CSSOM은 둘 다 tree다.
> [Populating the page: how browsers work — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work) (CC-BY-SA)

DOM과 CSSOM을 tree로 이해하면 HTML/CSS 학습이 browser internals와 연결됩니다. semantic HTML은 DOM tree의 구조가 되고, CSS cascade/layout은 CSSOM과 render/layout 계산으로 이어집니다. 앞선 강의들이 이 강의의 선행 개념인 이유입니다.

## 실전에서

### 1. Blank page는 request부터 render까지 단계별로 봅니다

blank page가 나오면 먼저 URL과 document request를 봅니다. response status가 왔는지, HTML contents가 있는지 확인합니다. 그다음 linked CSS/JS resource requests가 실패했는지 봅니다. 이후 parsing과 DOM/CSSOM, render tree, layout/paint symptom을 봅니다. 이 순서를 따르면 "아무것도 안 보여요"가 여러 작은 질문으로 나뉩니다.

```txt
1. URL navigation이 올바른가?
2. initial HTTP response가 왔는가?
3. HTML contents가 있는가?
4. CSS/JS resource request가 실패했는가?
5. DOM/CSSOM 이후 layout/paint로 이어졌는가?
```

이 checklist는 KB의 browser flow에 근거합니다. AI에게 blank page를 맡길 때는 각 단계 evidence를 채워 줘야 합니다. "흰 화면"이라는 결론만 주면 AI는 원인을 추측해야 합니다.

### 2. Slow page triage는 network와 render를 분리합니다

slow page를 볼 때 DNS/TCP/TLS/navigation, TTFB, resource download, CSS/JS parsing, layout/paint를 분리합니다. 이 강의는 TTFB 세부 출처를 확장하지 않지만, KB는 navigation/resource timing APIs가 timing data를 expose한다고 설명합니다. 따라서 timing evidence를 모아 어느 구간이 큰지 보는 습관이 필요합니다.

> [!EXAMPLE]
> HTML response가 늦다면 server/network 쪽 evidence가 먼저입니다. response는 빠른데 CSS/JS resource가 많고 layout이 늦다면 rendering/resource processing 쪽 evidence를 봐야 합니다.

### 3. Resource evidence는 list와 timing을 함께 봅니다

PerformanceResourceTiming은 resource timing data를 제공합니다. resource count만으로 성능을 판단할 수는 없지만, 어떤 resource들이 load되었는지 보는 출발점이 됩니다. CSS와 script, image resource가 parsing과 rendering에 어떤 영향을 주는지는 후속 performance 학습에서 더 자세히 다룰 수 있습니다.

```js
const resources = performance.getEntriesByType("resource")

for (const entry of resources) {
  console.log(entry.name, entry.entryType)
}
```

이 코드는 resource entry 목록을 관찰하는 최소 예시입니다. 실제 분석에서는 timing fields를 더 보겠지만, KB 범위를 넘지 않기 위해 resource evidence를 수집한다는 목적에 집중합니다.

### 4. AI에게 줄 performance evidence packet을 만듭니다

AI에게 "페이지가 느립니다"라고 말하는 대신 URL, 발생 행동, response status, resource list, navigation/resource timing summary, layout/paint symptom, 최근 변경사항을 함께 줍니다. 그러면 AI는 server/network 문제인지, resource loading 문제인지, render/layout 문제인지 분리해 제안할 수 있습니다.

> [!KEY]
> performance evidence packet은 URL, request/response, linked resources, timing data, visible symptom을 함께 담아야 합니다.

## 한계와 트레이드오프

첫째, browser flow를 안다고 모든 performance 최적화를 할 수 있는 것은 아닙니다. 이 강의는 URL navigation부터 rendering steps까지의 지도입니다. resource prioritization, caching, script loading strategy, image optimization, layout thrashing 같은 세부는 후속 주제로 남습니다. 하지만 큰 지도 없이 세부 optimization부터 시작하면 원인을 잘못 고를 수 있습니다.

둘째, Network tab의 status code만으로 page quality를 판단할 수 없습니다. response가 성공해도 CSS/JS parsing이나 layout/paint에서 문제가 생길 수 있습니다. 반대로 rendering symptom이 있어도 initial network delay가 원인일 수 있습니다. status는 중요한 evidence지만 전체 pipeline의 한 지점입니다.

셋째, timing APIs는 evidence를 제공하지만 해석이 필요합니다. PerformanceNavigationTiming과 PerformanceResourceTiming이 data를 expose한다고 해서 자동으로 병목을 알려 주는 것은 아닙니다. 어떤 entry를 봐야 하는지, 어떤 단계와 연결되는지, 최근 변경과 어떤 관계가 있는지 해석해야 합니다.

넷째, AI가 성능 개선을 제안할 때도 검증이 필요합니다. AI가 CSS를 줄였다고 해서 network bottleneck이 해결된 것은 아닐 수 있고, JavaScript를 바꿨다고 layout issue가 사라지는 것도 아닐 수 있습니다. ==성능 수정의 성공 여부는 AI 설명이 아니라 timing evidence와 visible behavior 변화로 판단해야 합니다.==

마지막으로, 이 강의는 browser vendor별 DevTools UI 세부를 다루지 않습니다. KB의 공식 근거는 MDN browser flow와 Performance timing APIs입니다. DevTools panel을 실제로 읽는 법은 후속 `frontend-debugging-devtools` 같은 주제로 더 구체화할 수 있습니다.

## 더 읽기

먼저 MDN의 [Populating the page: how browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)를 읽습니다. 이 문서는 navigation, DNS/TCP/TLS, response, parsing, DOM/CSSOM, rendering steps를 하나의 흐름으로 설명합니다. 이번 강의의 중심 근거입니다.

다음으로 [Critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)를 읽어 HTML, CSS, JavaScript가 screen pixels로 바뀌는 sequence를 performance 관점에서 봅니다. 앞선 HTML/CSS/DOM 강의가 왜 rendering pipeline의 선행 지식인지 확인할 수 있습니다.

그다음 [PerformanceNavigationTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming)과 [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)을 읽습니다. 이 문서들은 browser flow를 timing evidence로 관찰할 수 있음을 보여 줍니다. 마지막으로 [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)를 다시 읽으면 browser가 HTML document를 fetch하고 additional requests를 만드는 network side가 더 선명해집니다.

후속 학습은 `http-request-response`입니다. browser network flow의 앞단은 HTTP request/response 구조 위에 있으므로, method, path, status, headers, body를 정확히 읽어야 Network evidence를 더 깊게 해석할 수 있습니다.
