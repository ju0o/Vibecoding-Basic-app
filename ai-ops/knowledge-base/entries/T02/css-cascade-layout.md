---
id: css-cascade-layout
title: "CSS Cascade, Layout, and Responsive Design (CSS 캐스케이드·레이아웃·반응형)"
topicGroup: T02
status: approved
score: 87
level: 기초
prerequisites: [html-semantic-elements]
successors: [browser-rendering-network, responsive-ui-patterns]
related: [javascript-dom-events]
consumers:
  lessons: [css-cascade-layout-responsive]
  glossary: [CSS Cascade, Specificity, Normal Flow, Responsive Design, Media Query]
sources:
  - { title: "Introduction to the CSS cascade", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction", checked: 2026-07-06 }
  - { title: "Introduction to CSS layout", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction", checked: 2026-07-06 }
  - { title: "Responsive web design", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design", checked: 2026-07-06 }
  - { title: "Using media queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
CSS cascade, layout, responsive design은 HTML 요소에 적용될 style value를 고르고, box를 배치하고, viewport와 media 조건에 맞춰 화면을 적응시키는 CSS 핵심 체계다. MDN은 cascade를 user agents가 서로 다른 sources의 property values를 combine하는 algorithm으로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
layout은 elements가 normal flow에서 배치되고 display, flexbox, grid, positioning 같은 CSS 기능으로 재배치되는 영역이다. responsive design은 MDN이 separate technology가 아니라 any device에 respond하는 layout을 만들기 위한 best practices set이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)

## 역사
CSS는 Cascading Style Sheets라는 이름처럼 cascade가 core에 있다. MDN은 cascade가 CSS의 이름이 강조하듯 core에 놓인다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
responsive design은 여러 desktop/mobile 크기만 가정하던 시대를 넘어 다양한 device screen sizes와 resolutions에 대응하기 위해 필요해졌다. MDN은 Ethan Marcotte가 2010년에 responsive design term을 coined했고 fluid grids, fluid images, media queries와 연결했다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)

## 해결하려는 문제
CSS가 없으면 HTML document structure와 visual presentation이 분리되지 않는다. cascade가 없으면 user-agent styles, author styles, user styles, specificity, order가 충돌할 때 어떤 value가 적용되는지 결정하기 어렵다. MDN은 cascade algorithm의 job이 CSS declarations를 select해 correct values for CSS properties를 determine하는 것이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
layout 개념이 없으면 HTML source order와 visual arrangement를 구분하기 어렵다. responsive design이 없으면 unknown screen sizes와 resolutions에 방어적으로 대응하기 어렵다. MDN은 now many device types가 있으므로 common sizes와 unknowns에 cater defensively 해야 한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)

## 핵심 개념
1. Cascade algorithm: MDN은 cascade가 different sources에서 온 property values를 combine하고 origin/layer precedence를 정한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
2. Cascade order: MDN은 relevance, origin and importance, specificity, scoping proximity, order of appearance 단계를 cascading algorithm에 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
3. Normal flow: MDN CSS layout introduction은 normal flow를 CSS layout module의 core concept로 다룬다. HTML elements는 CSS intervention 전에도 기본 flow에 따라 배치된다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction, 확인: 2026-07-06)
4. Layout tools: MDN CSS layout module은 display values, normal flow, floats, positioning, flexbox, grid 같은 layout features를 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction, 확인: 2026-07-06)
5. Responsive design: MDN은 responsive design이 separate technology가 아니라 any device에 respond하는 layout을 만드는 best practices set이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)
6. Media queries: MDN은 media queries가 `@media`, `@custom-media`, `@import` at-rules로 styles를 conditionally apply하고 media states를 test/monitor할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using, 확인: 2026-07-06)

## 관련 기술
HTML semantic elements는 CSS selector와 layout 대상이 되는 structure를 제공한다. MDN HTML elements reference는 content sectioning elements가 logical pieces를 만든다고 설명하고, CSS cascade 문서는 selector가 element와 match될 때 property value가 적용된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
JavaScript DOM 조작은 style과 layout을 바꿀 수 있다. MDN DOM 문서는 DOM methods로 structure, style, content를 change할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)

## 선행 개념
html-semantic-elements: CSS는 HTML element와 selector를 대상으로 style을 적용하므로 document structure와 semantic element를 먼저 알아야 한다. MDN cascade 문서는 selector가 element와 match될 때 property value가 적용된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)

## 후행 개념
browser-rendering-network: browser는 CSS rules를 CSSOM으로 만들고 DOM/CSSOM을 render tree와 layout 단계로 연결한다. MDN browser work 문서는 CSSOM and DOM trees가 render tree로 combined된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 CSS를 생성할 때 "왜 이 style이 적용되지 않는지"는 cascade, specificity, order of appearance를 알아야 판단할 수 있다. MDN cascade 문서는 origin/importance, specificity, order of appearance 단계를 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
AI가 반응형 UI를 만든다고 할 때 media query와 layout tool을 실제로 사용했는지 확인해야 한다. MDN responsive design 문서는 responsive design이 approach이며 media queries, mobile-first, breakpoints 같은 concepts를 다룬다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)

## 실무 활용
1. style 충돌 디버깅: 적용되지 않는 색상이나 margin은 relevance, origin/importance, specificity, order of appearance 순서로 확인한다. MDN cascade algorithm 단계에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
2. layout 설계: normal flow를 기본으로 두고 필요한 곳에 flexbox/grid/positioning 같은 layout tools를 적용한다. MDN CSS layout introduction에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction, 확인: 2026-07-06)
3. responsive 점검: mobile-first와 breakpoints, media queries를 확인한다. MDN responsive design과 media queries 문서에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using, 확인: 2026-07-06)

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

## FAQ
Q: cascade는 specificity만 외우면 되는가?
A: 아니다. MDN cascade algorithm은 relevance, origin and importance, specificity, scoping proximity, order of appearance를 순서대로 제시한다. specificity는 그중 하나다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)

Q: responsive design은 특정 CSS property인가?
A: 아니다. MDN은 responsive design이 separate technology가 아니라 any device에 respond하는 layout을 만들기 위한 best practices set이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)

Q: media query는 화면 크기에만 쓰는가?
A: 아니다. MDN은 media queries가 styles를 conditionally apply하고 media states를 test/monitor하는 데 쓰인다고 설명한다. 화면 크기는 대표적 사용 사례 중 하나다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: `!important`로 모든 충돌을 해결한다. 왜 생기나: cascade order를 단계별로 보지 않기 때문이다. 교정: origin/importance, specificity, order를 먼저 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)
2. 실수: 반응형을 desktop/mobile 두 화면만 맞추는 작업으로 본다. 왜 생기나: device 종류와 unknown sizes를 과소평가하기 때문이다. 교정: MDN의 defensive design 관점으로 common sizes와 unknowns에 대응한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design, 확인: 2026-07-06)
3. 실수: layout 문제를 HTML 구조와 분리해 보지 않는다. 왜 생기나: CSS만 고치면 된다고 보기 때문이다. 교정: semantic HTML structure, selector, cascade, layout tool을 함께 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction, 확인: 2026-07-06)

## 공식 출처
- The cascade is an algorithm for combining property values from different sources — [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) (확인: 2026-07-06)
- The cascade algorithm selects declarations through ordered steps — [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) (확인: 2026-07-06)
- CSS layout covers normal flow and layout features — [Introduction to CSS layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction) (확인: 2026-07-06)
- Responsive design is an approach, not a separate technology — [Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) (확인: 2026-07-06)
- Media queries conditionally apply styles — [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using) (확인: 2026-07-06)

## Quote Bank
- > "The cascade is an algorithm that defines how user agents combine property values originating from different sources."
  - 출처: [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) (확인: 2026-07-06)
  - 맥락: cascade의 정의를 설명할 때 사용한다.
- > "The CSS cascade algorithm's job is to select CSS declarations in order to determine the correct values for CSS properties."
  - 출처: [Introduction to the CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) (확인: 2026-07-06)
  - 맥락: cascade가 style 충돌을 해결하는 원리를 설명할 때 사용한다.
- > "This lesson recaps some of the CSS layout features we've already touched upon in previous modules"
  - 출처: [Introduction to CSS layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Introduction) (확인: 2026-07-06)
  - 맥락: CSS layout이 여러 features의 묶음임을 설명할 때 사용한다.
- > "Responsive web design isn't a separate technology — it is an approach."
  - 출처: [Responsive web design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) (확인: 2026-07-06)
  - 맥락: responsive design의 성격을 설명할 때 사용한다.
- > "To conditionally apply styles"
  - 출처: [Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using) (확인: 2026-07-06)
  - 맥락: media query의 핵심 용도를 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
