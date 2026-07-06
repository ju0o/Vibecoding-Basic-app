# 용어 초안: css-cascade-layout-responsive

## CSS Cascade
- category: CSS
- shortDefinition: 여러 출처에서 온 CSS 선언 중 최종 property value를 고르는 알고리즘
- explanation: CSS Cascade는 user agent, author, user style과 selector, importance, specificity, order 같은 조건을 종합해 어떤 CSS declaration이 실제 값이 되는지 결정합니다. 스타일이 적용되지 않을 때는 "왜 안 먹지"보다 cascade 단계에서 어떤 선언이 이겼는지 확인해야 합니다.
- related: ["CSS", "Specificity", "CSS Declaration"]

## Specificity
- category: CSS
- shortDefinition: selector가 얼마나 구체적인지 비교해 cascade 판단에 쓰는 기준
- explanation: Specificity는 cascade algorithm의 한 단계이며, style 충돌에서 어떤 selector의 declaration이 더 강하게 적용될지 판단하는 데 사용됩니다. 다만 cascade는 specificity만으로 끝나지 않고 relevance, origin and importance, scoping proximity, order of appearance와 함께 작동합니다.
- related: ["CSS Cascade", "Selector", "CSS Declaration"]

## Normal Flow
- category: CSS
- shortDefinition: 별도 layout intervention이 없을 때 HTML 요소가 기본적으로 배치되는 흐름
- explanation: Normal Flow는 CSS layout을 이해하는 출발점입니다. 요소는 기본 display와 document order에 따라 먼저 배치되고, flexbox, grid, positioning 같은 layout tools는 이 기본 흐름을 필요한 방식으로 바꿉니다.
- related: ["CSS Layout", "Display", "HTML"]

## Responsive Design
- category: CSS
- shortDefinition: 특정 화면 하나가 아니라 다양한 device 조건에 반응하는 layout 접근법
- explanation: Responsive Design은 별도의 단일 기술이 아니라 fluid layout, flexible media, media queries 같은 best practices를 조합하는 접근입니다. AI가 "반응형으로 만들었다"고 할 때 실제로 viewport와 unknown screen sizes에 대응하는 CSS 구조가 있는지 확인해야 합니다.
- related: ["Media Query", "CSS Layout", "Viewport"]

## Media Query
- category: CSS
- shortDefinition: media type이나 feature 조건에 따라 CSS style을 조건부로 적용하는 문법
- explanation: Media Query는 `@media` 규칙으로 viewport width 같은 조건을 검사해 특정 CSS 선언을 적용합니다. 화면 크기만이 전부는 아니지만, responsive layout에서 breakpoints와 mobile-first 흐름을 만들 때 자주 사용됩니다.
- related: ["Responsive Design", "CSS Cascade", "Viewport"]
