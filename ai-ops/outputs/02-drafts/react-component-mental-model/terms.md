# 용어 초안: react-component-mental-model

## React Component
- category: React
- shortDefinition: JSX를 return해 UI 조각을 설명하는 reusable JavaScript function
- explanation: React Component는 markup, CSS, JavaScript를 custom UI element boundary로 묶는 기본 단위입니다. browser가 직접 보는 HTML tag와 달리 capitalized JSX tag로 사용되며 props를 input으로 받아 UI description을 계산합니다.
- related: ["Props", "Composition", "Render"]

## Props
- category: React
- shortDefinition: parent component가 child component에 전달하는 information
- explanation: Props는 React components가 서로 communicate하는 기본 방식입니다. string, object, array, function 등 JavaScript value를 전달할 수 있으며, TypeScript와 함께 쓰면 component의 input contract를 명확히 표현할 수 있습니다.
- related: ["React Component", "TypeScript", "Component Boundary"]

## Composition
- category: React
- shortDefinition: 여러 component를 order, nest, combine해서 page나 UI section을 만드는 방식
- explanation: Composition은 component를 HTML tags처럼 조합해 whole page를 설계하는 React 사고방식입니다. 재사용뿐 아니라 책임 분리와 수정 범위를 선명하게 만드는 데 중요합니다.
- related: ["React Component", "Props", "Component Tree"]

## Component Boundary
- category: React
- shortDefinition: component가 책임지는 UI, input props, rendering 범위를 나누는 경계
- explanation: Component Boundary는 AI에게 UI 수정을 맡길 때 특히 중요합니다. 어떤 component의 props와 rendering만 바꿀지, parent data flow를 바꿀지 구분하는 기준이 됩니다.
- related: ["React Component", "Props", "AI Code Review"]

## Pure Component
- category: React
- shortDefinition: 같은 input에 같은 JSX를 return한다고 가정할 수 있는 component
- explanation: Pure Component 관점은 render 중 외부 값을 변경하거나 unpredictable side effect를 만들지 않는 것을 의미합니다. React는 component를 pure function으로 가정하므로 render logic은 current props/state에서 UI를 계산하는 데 집중해야 합니다.
- related: ["Render", "Effect", "React Component"]

## Render
- category: React
- shortDefinition: React가 component를 호출해 screen에 표시할 UI description을 계산하는 단계
- explanation: Render는 DOM을 직접 조작하는 것이 아니라 component function을 실행해 어떤 UI를 보여줄지 계산하는 흐름입니다. commit 단계와 구분하면 React debugging과 performance 이해가 쉬워집니다.
- related: ["Commit", "React Component", "Pure Component"]

## Commit
- category: React
- shortDefinition: React가 계산된 UI 변경을 DOM에 반영하는 단계
- explanation: Commit은 render로 계산된 결과가 실제 screen update로 이어지는 단계입니다. component function 호출과 DOM update를 구분하면 React가 직접 DOM 조작 코드와 어떻게 다른지 이해할 수 있습니다.
- related: ["Render", "DOM", "React Component"]
