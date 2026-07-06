---
id: react-component-model
title: "React Component Model (React 컴포넌트 모델)"
topicGroup: T03
status: draft
score: null
level: 기초
prerequisites: [javascript-dom-events, typescript-type-system]
successors: [react-state-effects, nextjs-routing-rendering]
related: [typescript-type-system]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Your First Component", url: "https://react.dev/learn/your-first-component", checked: 2026-07-06 }
  - { title: "Importing and Exporting Components", url: "https://react.dev/learn/importing-and-exporting-components", checked: 2026-07-06 }
  - { title: "Passing Props to a Component", url: "https://react.dev/learn/passing-props-to-a-component", checked: 2026-07-06 }
  - { title: "Keeping Components Pure", url: "https://react.dev/learn/keeping-components-pure", checked: 2026-07-06 }
  - { title: "Render and Commit", url: "https://react.dev/learn/render-and-commit", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
React 컴포넌트 모델은 UI를 재사용 가능한 JavaScript function 단위로 나누는 사고방식이다. React docs v19.2는 components가 React의 core concepts 중 하나이며 UI를 build하는 foundation이라고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
React docs는 React가 markup, CSS, JavaScript를 custom components로 combine하게 하며, component를 reusable UI elements로 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
이 KB는 component definition, composition, props, purity, render/commit 흐름을 다루며 React-specific 최신 API 세부보다 beginner mental model에 집중한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06; https://react.dev/learn/render-and-commit, 확인: 2026-07-06)

## 역사
React docs는 전통적인 web page creation에서 developers가 content를 markup하고 JavaScript를 sprinkled interaction으로 추가했지만, 많은 site와 app에서 interactivity가 expected되면서 React가 same technology를 쓰되 interactivity를 first로 둔다고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
React component는 HTML tag 자체를 대체하는 것이 아니라 HTML tags, CSS, JavaScript를 component boundary 안에서 구성하는 방식이다. React docs는 under the hood에서 component가 `<article>`, `<h1>` 같은 same HTML tags를 여전히 사용한다고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
수집 기준은 react.dev learn 문서의 v19.2 표시를 기준으로 한다. 이 KB는 React Compiler나 framework-specific routing 같은 변동성 높은 주제를 포함하지 않는다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)

## 해결하려는 문제
UI가 커지면 HTML, CSS, JavaScript가 한 파일이나 한 화면에 섞여 재사용과 수정 범위 파악이 어려워진다. React docs는 components의 magic이 reusability에 있으며, nested components가 많아질수록 different files로 split하면 files가 scan하기 쉽고 reuse가 늘어난다고 설명한다. (출처: https://react.dev/learn/importing-and-exporting-components, 확인: 2026-07-06)
컴포넌트 경계를 모르면 AI가 한 UI 조각을 수정하다가 unrelated markup과 behavior를 함께 바꿀 수 있다. React docs는 whole pages를 components를 compose, order, nest해서 design할 수 있다고 설명하므로, component tree는 UI 변경 범위를 설명하는 기준이 된다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
props를 이해하지 못하면 parent-child data flow를 component 내부 변수나 nested definitions로 잘못 처리한다. React docs는 parent component가 child component에 information을 pass하는 방법이 props라고 설명한다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06)

## 핵심 개념
1. Component: React docs는 React component가 markup을 sprinkle할 수 있는 JavaScript function이라고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
2. Reusable UI element: React docs는 components를 reusable UI elements for your app로 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
3. Composition: React docs는 HTML tags처럼 components를 compose, order, nest해서 whole pages를 design할 수 있다고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
4. Component naming: React docs는 component names가 capital letter로 시작해야 하고 JSX markup을 return한다고 정리한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
5. Props: React docs는 props가 parent component가 child component에 pass하는 information이며, any JavaScript value including objects, arrays, functions를 pass할 수 있다고 설명한다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06)
6. Purity: React docs는 React가 every component를 pure function으로 가정하며, same inputs에는 same JSX를 return해야 한다고 설명한다. (출처: https://react.dev/learn/keeping-components-pure, 확인: 2026-07-06)
7. Render and commit: React docs는 render와 commit을 UI update의 단계로 설명하며, React는 components를 call해 screen에 무엇을 표시할지 계산하고 DOM update를 commit한다. (출처: https://react.dev/learn/render-and-commit, 확인: 2026-07-06)

## 관련 기술
TypeScript는 component props shape를 기록하는 기술로 연결된다. React props가 component의 single argument처럼 작동한다는 문서 설명과 TypeScript object types 설명을 결합하면 props contract를 명시할 수 있다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06; https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06)
DOM과 events는 React component가 browser UI와 만나는 바닥 지식이다. React component는 JavaScript function이지만 browser가 최종적으로 보는 것은 HTML elements이며, React docs는 lowercase `<section>`은 HTML tag이고 capitalized `<Profile />`은 component라고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
State와 Effects는 component model의 다음 단계다. component가 reusable UI element라는 구조를 이해한 뒤, component-specific memory와 external system synchronization을 배운다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)

## 선행 개념
javascript-dom-events: React component는 JSX를 return하고 browser는 HTML elements를 보게 되므로 DOM과 event 기초가 필요하다. React docs는 browser가 lowercase HTML tag와 capitalized component를 다르게 본다는 예시를 든다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
typescript-type-system: TypeScript는 component props와 reusable API를 표현하는 데 쓰이므로 object types, optional properties, union types를 먼저 알면 React component contract를 더 정확히 읽을 수 있다. (출처: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html, 확인: 2026-07-06; https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06)

## 후행 개념
react-state-effects: component structure를 이해한 뒤 state가 component-specific memory로 작동하고 effects가 external system sync에 쓰이는 방식을 배운다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
nextjs-routing-rendering: Next.js는 React components를 page, layout, route boundary와 연결하므로 React component model이 선행된다. 이 KB는 React docs의 component 기초에 한정한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)

## AI 시대에서의 의미
AI에게 UI 수정을 맡길 때 component boundary를 알려 주면 변경 범위가 줄어든다. React docs가 components를 reusable UI elements로 설명하므로, AI prompt에서 "LessonCard component의 props와 rendering만 수정"처럼 경계를 명시할 수 있다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
AI가 component를 component 안에 정의하는 코드를 만들면 성능과 bug 위험이 생길 수 있다. React docs는 component가 다른 component를 render할 수 있지만 definition을 nest하면 slow and causes bugs라고 설명하고, top level에 define하라고 권고한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
AI가 props 대신 shared mutable state나 hidden global을 쓰면 component purity와 data flow가 흐려진다. React docs는 child component가 parent의 data를 필요로 하면 props로 pass하라고 설명하고, component가 pure function처럼 same inputs에 same JSX를 return해야 한다고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06; https://react.dev/learn/keeping-components-pure, 확인: 2026-07-06)

## 실무 활용
1. Component extraction: 반복되는 UI 조각을 component로 나누고 file을 분리한다. React docs는 components reusability와 file splitting이 scan/reuse를 돕는다고 설명한다. (근거: https://react.dev/learn/importing-and-exporting-components, 확인: 2026-07-06)

```tsx
type LessonCardProps = {
  title: string;
  summary: string;
};

export function LessonCard({ title, summary }: LessonCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{summary}</p>
    </article>
  );
}
```

2. Props contract: parent가 child에게 필요한 information을 props로 pass한다. React docs는 props가 child component에 pass하는 information이고 any JavaScript value를 pass할 수 있다고 설명한다. (근거: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06)

3. Pure render check: render 중 기존 object/variable을 변경하지 않고 same inputs에 same JSX를 return하는지 확인한다. React docs는 every component를 pure function으로 가정한다고 설명한다. (근거: https://react.dev/learn/keeping-components-pure, 확인: 2026-07-06)

## FAQ
Q: React component는 HTML tag인가?
A: 아니다. React docs는 lowercase `<section>`은 HTML tag이고 capitalized `<Profile />`은 component라고 설명한다. component는 JavaScript function이고 browser가 최종적으로 보는 것은 HTML이다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)

Q: component는 꼭 여러 번 재사용되어야 하는가?
A: 아니다. React docs는 buttons 같은 reusable pieces뿐 아니라 sidebars, lists, complete pages에도 components를 쓰며, 일부 component는 한 번만 사용될 수도 있다고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)

Q: props는 HTML attributes와 같은가?
A: 비슷하게 보이지만 더 넓다. React docs는 props가 JSX tag에 pass하는 information이고, own components에는 objects, arrays, functions를 포함한 any JavaScript value를 pass할 수 있다고 설명한다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06)

Q: component 안에 helper component를 정의해도 되는가?
A: React docs는 component definitions를 nest하지 말고 top level에 declare하라고 권고하며, nested definitions가 slow and causes bugs라고 설명한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: component를 CSS class나 HTML block 정도로만 본다. 왜 생기나: 화면 조각처럼 보이기 때문이다. 교정: component는 markup을 return하는 JavaScript function이고 reusable UI element로 이해한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)
2. 실수: child component가 필요한 data를 parent scope에서 직접 가져오게 한다. 왜 생기나: props를 function argument처럼 보지 못하기 때문이다. 교정: React docs처럼 parent에서 child로 props를 pass한다. (출처: https://react.dev/learn/passing-props-to-a-component, 확인: 2026-07-06)
3. 실수: render 중 external variable을 바꾼다. 왜 생기나: component를 ordinary script block처럼 보기 때문이다. 교정: React는 component를 pure function으로 가정하므로 same inputs에 same JSX를 return해야 한다. (출처: https://react.dev/learn/keeping-components-pure, 확인: 2026-07-06)
4. 실수: component definition을 다른 component 내부에 중첩한다. 왜 생기나: 관련 코드를 가까이 두려는 습관 때문이다. 교정: React docs 권고대로 top level에 component를 declare하고 props로 data를 전달한다. (출처: https://react.dev/learn/your-first-component, 확인: 2026-07-06)

## 공식 출처
- components는 React의 core concepts이고 UI foundation이다 — [Your First Component](https://react.dev/learn/your-first-component) (확인: 2026-07-06)
- React는 markup, CSS, JavaScript를 custom components로 combine한다 — [Your First Component](https://react.dev/learn/your-first-component) (확인: 2026-07-06)
- component reusability와 file splitting — [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components) (확인: 2026-07-06)
- props는 parent가 child에게 pass하는 information이다 — [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) (확인: 2026-07-06)
- React는 components를 pure function으로 가정한다 — [Keeping Components Pure](https://react.dev/learn/keeping-components-pure) (확인: 2026-07-06)
- render/commit은 UI update 흐름을 설명한다 — [Render and Commit](https://react.dev/learn/render-and-commit) (확인: 2026-07-06)

## Quote Bank
- > "Components are one of the core concepts of React."
  - 출처: [Your First Component](https://react.dev/learn/your-first-component) (확인: 2026-07-06)
  - 맥락: component model의 중요성을 설명할 때 사용한다.
- > "React lets you combine your markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app."
  - 출처: [Your First Component](https://react.dev/learn/your-first-component) (확인: 2026-07-06)
  - 맥락: component가 무엇을 묶는지 설명할 때 사용한다.
- > "React components are regular JavaScript functions"
  - 출처: [Your First Component](https://react.dev/learn/your-first-component) (확인: 2026-07-06)
  - 맥락: component와 JavaScript function의 관계를 설명할 때 사용한다.
- > "The magic of components lies in their reusability"
  - 출처: [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components) (확인: 2026-07-06)
  - 맥락: component extraction과 file splitting을 설명할 때 사용한다.
- > "React components use props to communicate with each other."
  - 출처: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) (확인: 2026-07-06)
  - 맥락: parent-child data flow를 설명할 때 사용한다.
- > "React assumes that every component you write is a pure function."
  - 출처: [Keeping Components Pure](https://react.dev/learn/keeping-components-pure) (확인: 2026-07-06)
  - 맥락: render purity를 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
