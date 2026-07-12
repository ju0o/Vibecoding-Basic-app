## 한 줄 정의

웹 화면은 HTML이 의미 구조를 만들고, CSS가 그 구조의 시각 표현을 계산하며, JavaScript가 DOM과 이벤트를 통해 사용자 행동을 연결하고, 브라우저가 네트워크로 받은 자원을 해석해 렌더링하는 결과입니다. 초보자는 보통 "페이지가 보인다"는 한 덩어리로 느끼지만, 실제 웹은 문서 구조, 스타일 규칙, 실행 코드, 요청과 응답, 렌더링 단계가 겹쳐 만들어집니다.

이 강의의 목적은 HTML, CSS, JavaScript를 외우는 순서를 정하는 데 있지 않습니다. 화면 문제를 만났을 때 "구조가 잘못됐는가", "스타일 계산이 원하는 대로 되지 않았는가", "이벤트가 연결되지 않았는가", "네트워크 응답이 늦거나 실패했는가", "브라우저 렌더링 단계에서 병목이 생겼는가"를 나눠 생각하는 힘을 만드는 데 있습니다. ==웹 화면을 층으로 나눠 읽을 수 있어야 AI에게도 정확한 수정 요청을 할 수 있습니다==.

이 강의는 웹 개발 기초 모듈의 지도입니다. 뒤의 세부 강의에서 HTML semantic elements, CSS cascade와 responsive layout, JavaScript DOM events, browser rendering과 network, HTTP request/response, JSON data contract, web security를 각각 깊게 다룹니다. 여기서는 그 개념들이 하나의 화면 안에서 어떻게 연결되는지 큰 흐름을 잡습니다.

![웹 화면 구성 층](/lesson-diagrams/web-screen-anatomy/web-screen-layer-map.svg)

## 왜 존재하는가

웹은 처음부터 앱 플랫폼으로 출발하지 않았습니다. HTML은 문서 구조를 표현하는 markup으로 출발했고, 브라우저는 그 문서를 받아 사용자가 읽을 수 있게 표시했습니다. 그러나 시간이 지나며 웹은 문서에서 서비스로, 서비스에서 애플리케이션으로 확장됐습니다. 사용자는 이제 페이지를 읽기만 하지 않습니다. 검색하고, 로그인하고, 결제하고, 필터를 바꾸고, 실시간 상태를 확인합니다.

이 변화는 화면을 한 파일로 설명하기 어렵게 만들었습니다. 구조는 HTML이 맡고, 스타일은 CSS가 맡고, 동작은 JavaScript가 맡으며, 데이터는 HTTP request/response와 JSON body를 통해 오갑니다. 브라우저는 URL navigation, request, parsing, DOM/CSSOM, style, layout, paint 같은 단계를 거쳐 결과를 보여줍니다. 따라서 웹 화면을 제대로 배우려면 "보이는 화면" 아래의 층을 분리해야 합니다.

AI 시대에는 이 분리가 더 중요합니다. AI에게 "화면이 이상해"라고 하면 모델은 HTML을 고칠지, CSS를 고칠지, JavaScript를 고칠지, API 응답을 볼지 추측해야 합니다. 반대로 "모바일에서 카드가 두 줄로 겹친다", "클릭 이벤트는 실행되지만 HTTP 401이 온다", "DOM에는 버튼이 있는데 CSS 때문에 보이지 않는다"처럼 층을 좁히면 AI가 훨씬 정확하게 움직입니다.

> [!KEY]
> 웹 화면은 하나의 결과물이지만, 원인은 여러 층에 흩어져 있습니다. 학습의 첫 목표는 코드를 많이 쓰는 것이 아니라 원인이 어느 층에 있는지 말할 수 있게 되는 것입니다.

## 작동 원리

### 1. 브라우저는 URL에서 시작한다

사용자가 주소를 입력하거나 링크를 클릭하면 브라우저는 navigation을 시작합니다. 이때 브라우저는 필요한 네트워크 연결을 만들고 서버에 HTTP request를 보냅니다. 응답으로 HTML 문서가 오면 그 문서가 화면 생성의 출발점이 됩니다. 즉 웹 화면은 로컬 파일을 그냥 색칠하는 것이 아니라, 네트워크로 받은 자원을 해석하는 과정입니다.

입문자는 이 단계가 보이지 않기 때문에 "페이지가 느리다"를 CSS 문제나 JavaScript 문제로만 생각할 수 있습니다. 하지만 첫 HTML 응답이 늦거나, CSS 파일이 404이거나, JavaScript bundle이 실패하면 화면은 처음부터 다르게 만들어집니다. Network 탭을 배우는 이유가 여기에 있습니다. 화면 문제는 DOM을 보기 전에 요청과 응답부터 확인해야 할 때가 많습니다.

### 2. HTML은 화면의 의미 구조를 만든다

HTML은 단순히 글자를 배치하는 형식이 아닙니다. element와 tag로 문서 안의 역할을 표현합니다. `<main>`, `<nav>`, `<article>`, `<section>`, `<button>`, `<form>` 같은 element는 브라우저와 도구가 "이 영역이 무엇인가"를 읽게 합니다. 같은 화면이라도 전부 `<div>`로 만들면 사람이 보기에는 비슷해도 코드가 가진 의미 정보는 줄어듭니다.

의미 구조는 CSS와 JavaScript의 기반이 됩니다. CSS selector는 HTML 구조를 기준으로 스타일을 적용하고, JavaScript는 DOM tree에서 element를 찾아 이벤트를 연결합니다. 그래서 HTML이 흐리면 뒤의 두 층도 흐려집니다. ==HTML은 웹 화면의 골격이면서 동시에 나중에 수정할 위치를 알려주는 지도==입니다.

### 3. CSS는 충돌하는 규칙 중 최종 값을 고른다

CSS를 "꾸미기"로만 이해하면 실제 버그를 설명하기 어렵습니다. CSS에는 cascade라는 알고리즘이 있고, 여러 출처와 selector에서 온 property value 중 최종 값을 고릅니다. 같은 버튼에 여러 색상 규칙이 걸렸을 때 어떤 값이 이기는지, 왜 모바일에서 media query가 적용됐는지, 왜 부모의 display 설정이 자식 배치를 바꾸는지를 이해해야 합니다.

layout도 CSS의 핵심입니다. normal flow, flex, grid, positioning, responsive design은 화면의 공간 분배를 결정합니다. 반응형 화면은 별도 기술 하나가 아니라 viewport와 조건부 style 적용을 포함한 접근 방식입니다. AI에게 "예쁘게 해줘"라고만 말하면 이 복잡한 선택이 모두 모델의 추측이 됩니다. "카드 목록은 768px 이상에서 2열 grid, 그 아래에서는 1열"처럼 조건을 말해야 검토 가능한 CSS가 나옵니다.

### 4. JavaScript는 DOM과 이벤트를 통해 행동을 붙인다

JavaScript는 HTML을 직접 다시 쓰는 마법이 아니라 DOM이라는 문서 객체 모델을 통해 화면과 만납니다. 브라우저가 HTML을 parse하면 logical tree가 생기고, JavaScript는 그 tree의 node를 찾고, event handler를 붙이고, 사용자의 입력에 반응합니다. 버튼 클릭, form submit, input change, fetch request, 상태 업데이트가 이 층에서 일어납니다.

여기서 중요한 경계가 있습니다. DOM은 JavaScript 언어 자체가 아니라 브라우저가 제공하는 Web API입니다. 따라서 "JavaScript를 배운다"는 말에는 언어 문법과 브라우저 API를 구분해서 배우는 일이 포함됩니다. 초보자가 이벤트 버그를 만났을 때는 함수 문법이 틀렸는지, selector가 잘못됐는지, element가 아직 DOM에 없는지, event default를 막아야 하는지 나눠야 합니다.

### 5. 렌더링은 parsing 이후에도 여러 단계를 거친다

브라우저는 HTML과 CSS를 parse해 DOM과 CSSOM을 만들고, style, layout, paint, compositing 같은 rendering steps를 거칩니다. 이 단계들은 화면 성능과 연결됩니다. 예를 들어 DOM을 많이 바꾸면 style과 layout 계산이 반복될 수 있고, 큰 이미지나 무거운 script는 loading과 interaction을 늦출 수 있습니다. 처음에는 모든 세부 최적화를 외울 필요는 없지만, 화면이 보이기까지 단계가 있다는 사실은 꼭 알아야 합니다.

이 흐름을 알면 DevTools를 더 잘 읽을 수 있습니다. Elements 탭은 DOM과 적용된 CSS를 보여주고, Network 탭은 요청과 응답을 보여주며, Console은 JavaScript 오류와 로그를 보여줍니다. Performance 탭은 렌더링과 실행 비용을 볼 때 사용합니다. 도구 탭이 나뉘어 있는 이유는 웹 화면의 원인 층이 나뉘어 있기 때문입니다.

```html
<main>
  <article class="lesson-card">
    <h2>HTTP 요청과 응답</h2>
    <p>브라우저와 서버가 메시지를 주고받는 구조를 배웁니다.</p>
    <button type="button" data-bookmark>북마크</button>
  </article>
</main>
```

```css
.lesson-card {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .lesson-card {
    grid-template-columns: 1fr auto;
  }
}
```

```js
document.querySelector("[data-bookmark]")?.addEventListener("click", () => {
  console.log("북마크 상태를 바꿉니다")
})
```

이 짧은 예시는 세 층을 분리해서 보여줍니다. HTML은 강의 카드와 버튼의 의미를 드러냅니다. CSS는 배치와 반응형 조건을 정합니다. JavaScript는 버튼 클릭에 행동을 연결합니다. 버그가 나면 세 파일을 한꺼번에 탓하기보다 각 층의 책임을 확인해야 합니다.

## 스펙과 세부

### semantic element는 class 이름을 대체하지 않는다

HTML의 의미 element는 역할을 표현하고, class는 주로 스타일과 컴포넌트 경계를 표현합니다. `<nav class="sidebar-nav">`처럼 둘은 함께 쓰입니다. AI가 만든 코드에서 semantic element가 빠졌다면 접근성과 구조 검토가 필요하고, class만 없으면 스타일 연결 문제가 생길 수 있습니다. 서로 경쟁하는 선택지가 아닙니다.

### cascade는 selector 싸움만이 아니다

CSS cascade는 출처, 중요도, specificity, 순서 같은 요소를 함께 봅니다. 초보자는 "아래에 쓴 CSS가 이긴다"로 단순화하기 쉽지만, 실제로는 더 복잡합니다. 특히 Tailwind 같은 utility class를 쓰더라도 CSS가 최종 값을 계산한다는 사실은 변하지 않습니다. 충돌이 보이면 DevTools에서 computed style과 적용된 rule을 확인해야 합니다.

### DOM은 HTML 원문과 같지 않을 수 있다

브라우저는 HTML을 parse하면서 DOM tree를 만듭니다. 잘못 닫힌 tag를 보정하거나 script가 element를 추가하면 DOM은 원본 파일과 달라질 수 있습니다. 따라서 디버깅할 때는 소스 파일만 보지 말고 실제 DOM을 봐야 합니다. AI가 selector를 제안했는데 동작하지 않으면 먼저 실제 DOM에 그 selector가 존재하는지 확인합니다.

### HTTP와 JSON은 화면 뒤의 데이터 계약이다

버튼을 눌렀을 때 화면이 바뀌지 않는다면 JavaScript 코드만 문제가 아닐 수 있습니다. HTTP status code가 401인지, 404인지, 500인지에 따라 원인이 다릅니다. 응답 body가 JSON이라면 field 이름과 type이 화면 코드가 기대한 형태와 맞아야 합니다. 웹 화면은 프론트엔드 파일만으로 완결되지 않고, 서버의 응답 계약과 연결됩니다.

### 브라우저 성능은 렌더링 단계의 비용이다

페이지가 느릴 때는 "컴퓨터가 느리다"가 아니라 어떤 단계가 느린지 봐야 합니다. HTML 응답이 늦은지, CSS와 JavaScript 파일이 큰지, 이미지가 큰지, layout이 반복되는지, script가 main thread를 막는지 분리합니다. 처음에는 Network waterfall과 Console 오류만 잘 읽어도 많은 문제를 좁힐 수 있습니다.

## 원문으로 읽기

> "Content sectioning elements allow you to organize the document content into logical pieces."
>
> — content sectioning element는 문서 내용을 논리적 조각으로 조직하게 해준다.
> [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)

이 문장은 HTML을 시각 배치 언어가 아니라 문서 구조 언어로 읽게 해 줍니다. 웹 화면이 복잡해질수록 논리적 조각을 코드에 남기는 일이 중요합니다. AI가 생성한 HTML을 검토할 때도 `<section>`과 `<nav>` 같은 element가 역할에 맞게 쓰였는지 먼저 봅니다.

> "The cascade is an algorithm that defines how user agents combine property values originating from different sources."
>
> — cascade는 여러 출처에서 온 property value를 user agent가 결합하는 알고리즘이다.
> [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction)

CSS가 어려운 이유는 단순히 property 이름이 많아서가 아닙니다. 여러 규칙이 같은 element에 동시에 적용되고, 브라우저가 최종 값을 골라야 하기 때문입니다. 따라서 스타일 버그를 고칠 때는 "어느 CSS가 적용됐는지"뿐 아니라 "왜 그 값이 이겼는지"를 확인해야 합니다.

> "The DOM represents a document with a logical tree."
>
> — DOM은 문서를 논리적인 tree로 표현한다.
> [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

JavaScript가 웹 화면을 다룰 수 있는 이유는 DOM이라는 tree 표현이 있기 때문입니다. 버튼을 찾고, 텍스트를 바꾸고, event listener를 붙이는 일은 모두 이 tree 위에서 일어납니다. DOM을 이해하면 "HTML 파일", "브라우저 안의 실제 구조", "JavaScript가 접근하는 객체"를 구분할 수 있습니다.

관련 원문(링크): [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work)

화면은 렌더링만으로 시작하지 않습니다. URL 이동과 네트워크 요청이 먼저 있습니다. 그래서 첫 화면이 비어 있거나 스타일이 빠지거나 데이터가 늦게 보이면 Network 탭을 함께 봐야 합니다. 웹 화면의 문제는 종종 브라우저가 첫 자원을 어떻게 가져왔는지에서 시작됩니다.

## 실전에서

### 패턴 1: 버그 설명을 층별로 좁힌다

AI에게 문제를 설명할 때는 "화면이 깨졌어"보다 층을 좁혀 말합니다. "HTML에는 버튼이 있지만 CSS에서 `display: none`이 적용됩니다", "버튼은 클릭되지만 submit default 때문에 페이지가 새로고침됩니다", "요청은 보내지지만 응답이 401입니다"처럼 말하면 해결 범위가 줄어듭니다. 이 방식은 혼자 디버깅할 때도 같습니다.

### 패턴 2: DevTools 탭을 역할별로 쓴다

Elements는 DOM과 CSS, Console은 JavaScript 오류와 로그, Network는 요청과 응답, Application은 storage와 cookie, Performance는 렌더링과 실행 비용을 봅니다. 처음부터 모든 탭을 전문가처럼 쓸 필요는 없습니다. 하지만 어떤 탭이 어떤 층을 보여주는지 알면 문제를 무작정 코드 전체에서 찾지 않게 됩니다.

### 패턴 3: 코드 생성 요청에 책임 층을 포함한다

"로그인 화면 만들어줘" 대신 "semantic form HTML, responsive CSS, submit event handler, 실패 시 status code별 메시지를 분리해서 만들어줘"라고 요청합니다. 이렇게 하면 AI가 구조, 스타일, 행동, 네트워크 처리를 섞어 한 덩어리로 만들 가능성이 줄어듭니다. 결과 코드도 리뷰하기 쉬워집니다.

> [!EXAMPLE]
> 좋은 요청 예: "모바일에서 강의 카드가 한 열, 데스크톱에서 두 열이 되도록 CSS grid만 수정해줘. HTML 구조와 데이터 로딩 코드는 바꾸지 말고, 변경 뒤 어떤 selector가 적용되는지 설명해줘."

## 한계와 트레이드오프

웹 화면을 층으로 나누면 원인을 찾기 쉬워지지만, 실제 프레임워크에서는 층이 파일 하나 안에 함께 나타날 수 있습니다. React component는 markup, event handler, 상태, 조건부 렌더링을 한 함수 안에 둘 수 있고, Tailwind class는 HTML에 CSS 결정을 함께 적습니다. 이것은 나쁜 것이 아닙니다. 중요한 것은 파일이 섞였는지가 아니라 머릿속에서 책임을 구분할 수 있는가입니다.

또 다른 한계는 단순 은유입니다. HTML은 뼈대, CSS는 옷, JavaScript는 행동이라는 설명은 입문에 좋지만, 실제 브라우저는 DOM/CSSOM, render tree, layout, paint, compositing, event loop, network cache처럼 더 많은 단계를 가집니다. 은유를 너무 오래 붙잡으면 CSS를 "꾸미기"로만, JavaScript를 "움직임"으로만 오해할 수 있습니다.

AI 생성 코드에서는 특히 trade-off가 큽니다. AI는 빠르게 예시를 만들지만, semantic HTML 없이 `<div>`를 반복하거나, CSS를 과하게 중첩하거나, JavaScript로 해결할 필요 없는 일을 script로 처리할 수 있습니다. 그러므로 이 강의의 목표는 AI가 만든 코드를 부정하는 것이 아니라, 어떤 층을 어떤 기준으로 검토할지 알려주는 것입니다.

## 더 읽기

- [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements): HTML element가 어떤 역할 그룹으로 나뉘는지 확인합니다.
- [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction): CSS 충돌 해결 알고리즘을 읽습니다.
- [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model): DOM이 HTML과 JavaScript 사이에서 어떤 역할을 하는지 확인합니다.
- [How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work): navigation, parsing, rendering 단계를 큰 흐름으로 봅니다.
- [Overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview): request/response와 status code를 화면 디버깅과 연결해 읽습니다.

다음에는 HTML 의미 구조를 먼저 읽는 것이 좋습니다. 그다음 CSS cascade와 responsive layout, JavaScript DOM events, browser rendering/network를 순서대로 읽으면 "화면이 보인다"는 한 문장이 여러 기술 층으로 나뉘는 감각이 생깁니다.
