## 한 줄 정의

CSS cascade, layout, responsive design은 HTML 요소에 어떤 style value가 적용될지 결정하고, 그 값을 바탕으로 box를 배치하며, viewport와 media 조건에 따라 화면을 적응시키는 CSS의 핵심 체계입니다. MDN은 cascade를 user agents가 서로 다른 sources의 property values를 combine하는 algorithm으로 설명합니다. layout은 normal flow와 display, flexbox, grid, positioning 같은 feature로 요소 배치를 다루고, responsive design은 특정 기술 하나가 아니라 any device에 respond하는 layout을 만들기 위한 approach입니다.

CSS를 처음 배우면 color, margin, font-size 같은 property를 하나씩 익히게 됩니다. 그러나 실무에서 더 자주 부딪히는 질문은 "이 property를 쓰는 법"보다 "왜 이 값이 적용됐는가", "왜 이 layout이 여기서 깨졌는가", "왜 mobile에서는 다른 모양이어야 하는가"입니다. 이 질문에 답하려면 cascade, layout, responsive design을 따로 외우는 것이 아니라 하나의 흐름으로 연결해야 합니다.

==CSS는 선언을 적는 언어이면서 동시에 충돌을 해결하고 화면 조건에 반응하는 시스템==입니다. AI가 CSS를 생성해도 이 원리는 사라지지 않습니다. AI가 만든 스타일이 적용되지 않거나, grid가 깨지거나, mobile에서 넘친다면 우리는 cascade order, layout tool, media query 조건을 근거로 검토해야 합니다.

![CSS cascade layout responsive 흐름](/lesson-diagrams/css-cascade-layout-responsive/cascade-layout-responsive-flow.svg)

## 왜 존재하는가

HTML은 문서 구조를 설명하지만, 화면의 색상, 크기, 간격, 배치, 반응형 변화까지 담당하지는 않습니다. CSS가 없다면 문서 구조와 visual presentation이 분리되지 않습니다. CSS는 HTML element에 appearance와 layout을 부여하면서도, 구조 자체를 HTML에 남길 수 있게 해 줍니다.

그러나 style을 여러 곳에서 쓸 수 있게 되면 즉시 충돌 문제가 생깁니다. browser의 기본 style, 작성자가 쓴 stylesheet, user style, selector의 구체성, `!important`, later declaration이 모두 같은 property를 다르게 말할 수 있습니다. 이때 어떤 value가 실제로 적용되는지 정하는 체계가 필요합니다. cascade는 바로 이 문제를 해결합니다.

CSS라는 이름 자체가 Cascading Style Sheets인 이유도 여기에 있습니다. MDN은 cascade가 CSS의 core에 놓인다고 설명합니다. cascade가 없다면 style 충돌은 매번 감으로 해결해야 하고, "왜 이 색상이 적용되지 않았는지"를 설명하기 어렵습니다. AI가 CSS를 생성하는 시대에도 cascade를 모르면 AI가 만든 code diff가 실제 화면에 어떤 영향을 주는지 검토할 수 없습니다.

layout과 responsive design은 두 번째 문제에서 등장합니다. HTML source order는 문서의 논리 흐름을 제공하지만, 실제 화면에서는 sidebar와 content, 카드 grid, sticky header, mobile single column처럼 다양한 배치가 필요합니다. layout tool은 이 배치를 만들고, responsive design은 다양한 device screen sizes와 resolutions에 defensively 대응합니다.

> [!KEY]
> CSS가 해결하는 핵심 문제는 "예쁘게 꾸미기"보다 넓습니다. 최종 style value를 결정하고, box를 배치하고, unknown screen size에 대응하는 문제를 다룹니다.

## 작동 원리

### 1. Selector가 element와 match되면서 declaration 후보가 생깁니다

CSS는 HTML 구조 위에서 작동합니다. 먼저 selector가 element와 match되어 어떤 declaration들이 해당 element에 적용될 후보인지 정합니다. 예를 들어 `.lesson-layout` selector가 class를 가진 element와 match되면, 그 rule 안의 declarations가 후보가 됩니다. 이 단계는 semantic HTML과 연결됩니다. HTML 구조가 명확할수록 selector도 의미 있는 대상을 가리키기 쉽습니다.

하지만 후보가 하나만 있는 경우는 드뭅니다. 같은 element에 browser 기본 style, base stylesheet, component stylesheet, utility class, media query 안의 rule이 함께 적용될 수 있습니다. 이때는 "마지막에 쓴 것이 무조건 이긴다"처럼 단순화하면 틀립니다. cascade algorithm은 여러 단계를 거쳐 후보를 걸러 최종 value를 결정합니다.

### 2. Cascade algorithm은 순서 있는 필터입니다

MDN은 cascade algorithm의 job이 CSS declarations를 select해 correct values for CSS properties를 determine하는 것이라고 설명합니다. 또한 relevance, origin and importance, specificity, scoping proximity, order of appearance 단계를 제시합니다. 이 순서가 중요합니다. specificity는 cascade의 전부가 아니라 여러 단계 중 하나입니다.

예를 들어 media query 조건이 맞지 않는 rule은 relevance 단계에서 후보가 아닐 수 있습니다. `!important`와 origin은 specificity보다 앞선 단계에서 영향을 줄 수 있습니다. specificity가 같다면 scoping proximity나 order of appearance가 영향을 줄 수 있습니다. 그래서 style debug는 "specificity 숫자만 계산하기"가 아니라 cascade의 단계적 판단을 따라가는 일입니다.

==style 충돌을 디버깅할 때는 property 하나를 잡고 cascade algorithm의 단계별 후보 탈락 과정을 추적해야 합니다.== DevTools에서 computed style을 볼 때도 이 관점이 필요합니다. 어떤 rule이 crossed out 되었는지, 어떤 rule이 최종 value를 이겼는지 보는 것은 cascade algorithm을 화면으로 보는 일에 가깝습니다.

### 3. Normal flow가 layout의 기본값입니다

layout을 이해할 때 먼저 flexbox나 grid부터 외우면 기준점이 흔들립니다. MDN CSS layout introduction은 normal flow를 CSS layout module의 core concept로 다룹니다. HTML elements는 CSS intervention 전에도 기본 flow에 따라 배치됩니다. block-level element는 보통 위에서 아래로 흐르고, inline content는 line box 안에서 흐릅니다.

normal flow를 알면 layout tool의 의미가 분명해집니다. flexbox나 grid는 무에서 배치를 만드는 것이 아니라 기본 흐름을 특정 목적에 맞게 바꾸는 도구입니다. positioning도 document flow와 관계를 바꾸는 방식입니다. float 역시 layout feature 중 하나입니다. 따라서 layout 문제를 해결할 때는 먼저 "normal flow라면 어떻게 배치되는가"를 생각하고, 그다음 어떤 tool이 필요한지 선택합니다.

### 4. Layout tool은 목적별로 고릅니다

CSS layout module은 display values, normal flow, floats, positioning, flexbox, grid 같은 features를 다룹니다. 이 목록은 layout tool이 하나가 아니라는 사실을 보여 줍니다. flexbox는 한 축의 정렬과 분배에 강하고, grid는 row/column의 2차원 배치에 강합니다. positioning은 normal flow에서 벗어난 위치 제어가 필요할 때 쓰입니다.

이 강의의 KB는 각 tool의 상세 syntax를 다루지 않습니다. 중요한 것은 AI가 layout을 만들 때 tool 선택을 검토할 기준입니다. 카드 목록을 2차원 grid로 배치하려는지, toolbar button을 한 줄로 정렬하려는지, sidebar와 content column을 나누려는지에 따라 적절한 tool이 달라집니다. "CSS가 복잡하다"는 느낌은 많은 경우 tool의 목적을 섞어서 쓰는 데서 생깁니다.

### 5. Responsive design은 별도 기술이 아니라 approach입니다

MDN은 responsive web design이 separate technology가 아니라 approach라고 설명합니다. 이 말은 매우 중요합니다. responsive design은 `@media` 하나만 넣었다고 끝나는 것도 아니고, mobile/desktop 두 장면만 맞췄다고 끝나는 것도 아닙니다. 다양한 device screen sizes와 resolutions, 그리고 unknown sizes에 defensively 대응하는 설계 흐름입니다.

responsive design은 layout tool과 함께 작동합니다. grid column을 viewport width에 따라 바꾸거나, spacing을 조정하거나, image가 container를 넘지 않게 만들거나, navigation을 좁은 화면에서 다른 구조로 바꾸는 식입니다. media query는 그중 대표 도구입니다. 하지만 media query만 남발하면 breakpoint 사이의 화면에서 깨질 수 있습니다. 따라서 fluid layout과 defensive sizing도 함께 생각해야 합니다.

### 6. Media queries는 조건부 style application입니다

MDN은 media queries가 `@media`, `@custom-media`, `@import` at-rules로 styles를 conditionally apply하고 media states를 test/monitor할 수 있다고 설명합니다. 입문 단계에서는 `@media (min-width: 768px)` 같은 형태를 통해 viewport 조건에 맞는 style을 적용하는 흐름을 먼저 이해하면 됩니다.

media query는 cascade와 분리되지 않습니다. media condition이 맞을 때만 rule이 relevant 후보가 되고, 그 후 cascade algorithm의 다른 단계가 이어집니다. 그래서 responsive bug를 볼 때는 media query 조건이 맞는지, 그 rule이 cascade에서 이기는지, layout tool이 기대한 배치를 만드는지 함께 봐야 합니다.

```css
.lesson-layout {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .lesson-layout {
    grid-template-columns: 16rem 1fr;
  }
}
```

이 예시는 KB의 코드 예시를 그대로 강의 맥락에서 읽은 것입니다. 기본 상태에서는 single-column에 가까운 grid가 되고, viewport가 768px 이상일 때 sidebar와 content column을 나눕니다. 여기서 media query는 "desktop style"이라는 이름표가 아니라, 특정 condition에서 layout declaration을 추가하는 장치입니다.

> [!WARNING]
> 반응형을 desktop/mobile 두 스크린샷 맞추기로만 보면 중간 viewport와 예외 크기에서 깨집니다. responsive design은 unknown sizes에 defensively 대응하는 접근입니다.

### 7. AI 시대의 CSS 검토는 세 층으로 나눕니다

AI가 CSS를 생성했을 때 검토할 층은 세 가지입니다. 첫째, cascade 층입니다. 원하는 declaration이 relevant하고, origin/importance와 specificity/order에서 이기는지 봅니다. 둘째, layout 층입니다. normal flow, display, flexbox, grid, positioning 중 어떤 tool이 선택됐는지 봅니다. 셋째, responsive 층입니다. viewport나 media condition 변화에서 layout이 유지되는지 봅니다.

이렇게 나누면 "AI가 만든 CSS가 이상하다"라는 막연한 문제를 actionable evidence로 바꿀 수 있습니다. "이 selector는 target element와 match되지 않는다", "media query 조건 밖이라 declaration이 relevant하지 않다", "grid column은 있는데 container width constraint가 없다"처럼 구체적으로 말할 수 있습니다. 이런 설명은 AI에게 재수정을 맡길 때도 훨씬 좋은 prompt가 됩니다.

## 스펙과 세부

### Cascade order의 단계

MDN cascade 문서는 relevance, origin and importance, specificity, scoping proximity, order of appearance를 cascading algorithm의 단계로 제시합니다. 이 단계들은 모두 "최종 value를 고르는 필터"로 이해할 수 있습니다. 먼저 적용 가능한 rule인지 보고, 그다음 출처와 중요도, selector 구체성, scope proximity, 등장 순서를 따집니다.

### Origin and importance

CSS declarations는 user-agent styles, author styles, user styles처럼 서로 다른 source에서 올 수 있습니다. `!important`도 이 판단에 영향을 줍니다. 초보자가 `!important`를 남용하는 이유는 cascade를 건너뛰고 당장 값을 이기게 만들고 싶기 때문입니다. 하지만 이 방식은 다음 유지보수에서 더 큰 충돌을 만듭니다.

### Specificity는 한 단계입니다

Specificity는 중요하지만 cascade 전체가 아닙니다. selector가 더 구체적이라고 해도 이전 단계에서 relevance나 origin/importance 판단에 밀릴 수 있습니다. 따라서 "specificity가 높으면 무조건 이긴다"는 표현은 위험합니다. specificity는 cascade order 안에서 자신의 위치를 갖는 기준입니다.

### Normal flow와 display

normal flow는 layout의 baseline입니다. display value는 element가 flow 안에서 어떻게 동작하는지 바꿉니다. block, inline, flex, grid 같은 display value는 layout behavior를 결정하는 큰 스위치입니다. AI가 `display: flex`나 `display: grid`를 추가했다면, 그 선택이 문제의 목적과 맞는지 검토해야 합니다.

### Responsive design의 역사적 기준

MDN은 Ethan Marcotte가 2010년에 responsive design term을 coined했고 fluid grids, fluid images, media queries와 연결했다고 설명합니다. 이 사실은 responsive design이 하나의 property가 아니라 여러 practice의 조합임을 보여 줍니다. 지금도 responsive design은 특정 breakpoint 암기보다 다양한 조건에 대응하는 설계로 이해해야 합니다.

### Media query는 condition입니다

`@media` rule은 조건을 만족할 때 style을 적용합니다. 조건이 맞지 않으면 그 rule은 cascade 후보로 들어오지 않습니다. 따라서 responsive debug에서 첫 질문은 "이 rule이 조건상 적용 대상인가"입니다. 두 번째 질문은 "적용 대상이라면 cascade에서 이기는가"입니다.

> [!TIP]
> CSS bug를 볼 때 property 값을 바로 바꾸기보다 selector match, media condition, cascade winner, layout tool을 순서대로 확인하면 원인 범위가 줄어듭니다.

## 원문으로 읽기

> "The cascade is an algorithm that defines how user agents combine property values originating from different sources."
>
> — cascade는 user agent가 서로 다른 출처에서 온 property value를 결합하는 방식을 정의하는 알고리즘이다.
> [Introduction to the CSS cascade — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) (CC-BY-SA)

이 인용은 cascade를 "암기해야 할 우선순위 표"보다 넓게 보게 합니다. 핵심은 different sources의 property values를 combine한다는 점입니다. CSS debug는 여러 출처의 값이 어떻게 결합되어 최종 값이 됐는지 추적하는 작업입니다.

> "The CSS cascade algorithm's job is to select CSS declarations in order to determine the correct values for CSS properties. [...]"
>
> — CSS cascade algorithm의 일은 CSS property의 올바른 값을 결정하기 위해 CSS declaration을 선택하는 것이다.
> [Introduction to the CSS cascade — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) (CC-BY-SA)

이 문장은 style 충돌을 볼 때 무엇을 찾아야 하는지 알려 줍니다. 문제는 "CSS가 적용됐다/안 됐다"가 아니라 어떤 declaration이 selected 되었는가입니다. DevTools의 crossed-out rule과 computed style은 이 선택 과정을 확인하는 도구입니다.

> "This lesson recaps some of the CSS layout features we've already touched upon in previous modules"
>
> — 이 lesson은 이전 module에서 다룬 CSS layout features 일부를 다시 정리한다.
> [Introduction to CSS layout — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction) (CC-BY-SA)

이 인용은 layout이 단일 기능이 아니라 features의 묶음이라는 점을 보여 줍니다. normal flow, display, float, positioning, flexbox, grid를 목적별 도구로 봐야 합니다. AI가 어떤 layout feature를 선택했는지 묻는 이유도 여기에 있습니다.

관련 원문(링크): [Responsive web design — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)

responsive design을 `@media` 하나로 축소하면 이 문장과 어긋납니다. approach라는 말은 layout, sizing, image behavior, media query, unknown screen handling이 함께 움직인다는 뜻입니다. AI 생성 UI를 검토할 때도 "breakpoint가 있는가"만 보지 말고 approach 전체를 봐야 합니다.

관련 원문(링크): [Using media queries — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)

짧은 구절이지만 media query의 핵심을 잘 보여 줍니다. media query는 특정 화면 이름을 붙이는 문법이 아니라 조건부 style application입니다. 조건이 맞아야 rule이 후보가 되고, 그다음 cascade와 layout이 이어집니다.

## 실전에서

### 1. style 충돌은 property 하나를 잡고 추적합니다

버튼 색상이 기대와 다르면 먼저 관련 property 하나를 잡습니다. 예를 들어 `color`인지 `background-color`인지 정합니다. 그다음 해당 element와 match되는 rules를 봅니다. media query 조건이 맞는지, origin/importance가 어떻게 되는지, specificity가 어떤지, order of appearance가 어떤지 순서대로 확인합니다.

```css
.button {
  background: white;
}

.toolbar .button {
  background: black;
}
```

이 작은 예시는 specificity를 보여 주지만, 실제 debug에서는 이것만으로 끝나지 않습니다. media query 안에 있는지, later rule이 있는지, `!important`가 있는지 확인해야 합니다. AI에게 수정을 맡길 때도 "배경색을 검은색으로 해줘"보다 "`.toolbar .button` rule이 cascade에서 이기도록 selector와 order를 점검해줘"가 더 검토 가능한 요청입니다.

### 2. layout은 normal flow에서 출발합니다

layout이 깨졌을 때 곧바로 `position: absolute`를 붙이면 문제를 숨길 수는 있어도 구조가 더 어려워질 수 있습니다. 먼저 normal flow에서 element가 어떻게 놓이는지 봅니다. 그다음 한 축 정렬이면 flexbox, 2차원 grid면 grid, 문서 흐름에서 벗어난 overlay면 positioning처럼 목적에 맞는 tool을 선택합니다.

> [!EXAMPLE]
> 강의 페이지에서 sidebar와 content를 나란히 배치하려면 grid가 자연스러운 후보입니다. 반면 toolbar 안의 버튼들을 한 줄로 정렬하는 문제라면 flexbox가 더 단순할 수 있습니다.

### 3. responsive 점검은 breakpoint 사이를 봅니다

AI가 만든 UI를 검토할 때 mobile width와 desktop width 두 장면만 보면 놓치는 것이 많습니다. viewport를 천천히 줄이고 늘리면서 text wrapping, overflow, grid column, spacing 변화를 봐야 합니다. MDN이 unknown sizes에 defensively 대응하라고 말하는 이유가 여기에 있습니다.

```css
.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

이 예시는 단순하지만 중요한 원리를 담습니다. 기본값은 좁은 화면에서도 안전한 single column이고, 조건이 맞을 때 columns를 늘립니다. `minmax(0, 1fr)` 같은 세부는 CSS layout의 overflow 문제와 연결되지만, 이 강의에서는 "기본 안전값 + 조건부 확장"이라는 responsive 사고가 핵심입니다.

### 4. AI에게 CSS 수정을 요청할 때 evidence를 줍니다

좋은 요청은 "CSS가 이상해"가 아닙니다. target element, expected style, actual computed style, relevant selector, viewport width, screenshot 또는 증상, 바뀐 CSS diff를 함께 줍니다. 그러면 AI가 cascade 문제인지 layout 문제인지 responsive condition 문제인지 분리할 수 있습니다.

> [!KEY]
> CSS evidence packet은 selector, property, computed value, viewport condition, layout symptom을 함께 담을 때 가장 유용합니다.

## 한계와 트레이드오프

첫째, cascade를 안다고 모든 CSS 문제가 자동으로 풀리지는 않습니다. cascade는 최종 property value를 결정하는 체계입니다. layout engine의 세부, browser rendering, performance, accessibility까지 모두 설명하지는 않습니다. 그러나 어떤 declaration이 이겼는지 모르면 다음 단계로 갈 수 없으므로 기본 진단 도구로 중요합니다.

둘째, `!important`는 빠른 탈출구처럼 보이지만 장기 유지보수를 어렵게 만들 수 있습니다. 물론 특정 상황에서는 필요할 수 있지만, 초보 단계에서 모든 충돌을 `!important`로 해결하면 cascade order를 배울 기회를 잃습니다. 원인을 이해하기 전의 `!important`는 문제 해결이 아니라 문제 이동일 수 있습니다.

셋째, responsive design은 media query 개수로 평가되지 않습니다. breakpoint가 많아도 layout 원리가 약하면 사이 화면에서 깨질 수 있습니다. 반대로 breakpoint가 적어도 fluid layout과 defensive sizing이 잘 되어 있으면 더 안정적일 수 있습니다. ==responsive design의 품질은 breakpoint 수가 아니라 조건 변화에서 content가 유지되는가로 봐야 합니다.==

넷째, AI가 만든 CSS는 그럴듯한 property를 많이 포함할 수 있습니다. 하지만 사용하지 않는 selector, match되지 않는 class, cascade에서 지는 declaration, viewport 조건에 맞지 않는 media query가 섞이면 결과는 달라집니다. CSS는 선언이 많다고 좋은 것이 아니라, 필요한 declaration이 정확한 condition에서 이기는 것이 중요합니다.

마지막으로, 이 강의는 CSS layout의 모든 세부를 다루지 않습니다. flexbox, grid, positioning, responsive image, container query 같은 주제는 후속 학습에서 더 깊게 다룰 수 있습니다. 여기서는 AI와 함께 웹 UI를 만들 때 반드시 필요한 큰 흐름, 즉 cascade에서 value가 결정되고 layout에서 배치가 만들어지며 responsive condition에서 변화한다는 구조를 잡는 것이 목표입니다.

## 더 읽기

먼저 MDN의 [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction)를 읽어 cascade algorithm의 단계와 property value 결정 방식을 확인합니다. style이 적용되지 않는 문제를 자주 겪는다면 이 문서가 가장 좋은 출발점입니다.

다음으로 [Introduction to CSS layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction)을 읽어 normal flow와 layout features의 지도를 잡습니다. 이 문서를 읽을 때는 개별 property를 암기하기보다 normal flow에서 어떤 tool이 어떤 목적을 갖는지에 집중합니다.

그다음 [Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)과 [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using)를 이어서 읽습니다. responsive design이 approach이고 media query가 조건부 style application이라는 두 문장을 연결하면, mobile/desktop 스크린샷 맞추기를 넘어 더 안정적인 UI 검토 기준을 만들 수 있습니다.

후속 학습은 `javascript-dom-events`와 `browser-rendering-network`입니다. DOM 조작은 style과 content를 바꿀 수 있고, browser rendering은 CSSOM, render tree, layout, paint로 이어집니다. CSS를 단독 파일로만 보지 않고 HTML, DOM, browser pipeline과 연결해 읽는 것이 다음 단계입니다.
