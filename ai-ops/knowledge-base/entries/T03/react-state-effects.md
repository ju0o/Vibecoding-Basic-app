---
id: react-state-effects
title: "React State and Effects (React 상태와 Effect)"
topicGroup: T03
status: approved
score: 91
level: 중급
prerequisites: [react-component-model, javascript-dom-events]
successors: [nextjs-routing-rendering, frontend-testing-basics]
related: [typescript-type-system]
consumers:
  lessons: [react-state-and-effects]
  glossary: [React State, useState, Hook, State Snapshot, Batching, Effect, useEffect, Effect Dependency]
sources:
  - { title: "State: A Component's Memory", url: "https://react.dev/learn/state-a-components-memory", checked: 2026-07-06 }
  - { title: "State as a Snapshot", url: "https://react.dev/learn/state-as-a-snapshot", checked: 2026-07-06 }
  - { title: "Queueing a Series of State Updates", url: "https://react.dev/learn/queueing-a-series-of-state-updates", checked: 2026-07-06 }
  - { title: "Synchronizing with Effects", url: "https://react.dev/learn/synchronizing-with-effects", checked: 2026-07-06 }
  - { title: "You Might Not Need an Effect", url: "https://react.dev/learn/you-might-not-need-an-effect", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
React state와 Effect는 component가 화면 변화와 외부 시스템 동기화를 다루는 두 축이다. React docs v19.2는 component가 interaction 결과로 screen의 내용을 바꿔야 할 때 "remember"해야 하는 component-specific memory를 state라고 설명한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
React docs는 Effects가 rendering 자체 때문에 발생하는 side effects를 지정하게 하며, component를 network나 third-party library 같은 external system과 synchronize할 때 쓰인다고 설명한다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
이 KB의 핵심은 state를 local variable과 구분하고, Effect를 모든 파생 state 처리에 쓰는 도구가 아니라 external system synchronization용 escape hatch로 보는 것이다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)

## 역사
React component model은 UI를 component function으로 계산하고 render/commit 단계를 거쳐 screen을 갱신한다. State는 component가 render 사이에 data를 retain하고 setState로 re-render를 trigger하게 하는 장치로 설명된다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
Effect는 event handler로 설명할 수 없는 external synchronization 문제에서 필요해진다. React docs는 chat server connection처럼 component가 screen에 visible하면 특정 user interaction과 무관하게 external system에 connect해야 하는 상황을 Effect 예로 설명한다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
수집 기준은 2026-07-06에 열린 react.dev learn 문서의 v19.2 표기다. 이 KB는 `useState`, state snapshot, batching, effects, unnecessary effects의 공식 설명에 한정한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)

## 해결하려는 문제
local variable은 render 사이에 persist되지 않고 변경해도 re-render를 trigger하지 않는다. React docs는 local variables don't persist between renders, changes to local variables won't trigger renders라고 설명한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
state update를 즉시 변수 변경처럼 이해하면 stale value와 batching을 오해한다. React docs는 state가 snapshot처럼 동작하고, setting state가 current state variable을 바꾸는 것이 아니라 re-render를 trigger한다고 설명한다. (출처: https://react.dev/learn/state-as-a-snapshot, 확인: 2026-07-06)
Effect를 모든 data transformation에 쓰면 code가 느리고 오류가 많아질 수 있다. React docs는 external system이 없다면 Effect가 필요하지 않아야 하고, unnecessary Effects를 제거하면 code가 easier to follow, faster to run, less error-prone하다고 설명한다. (출처: https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)

## 핵심 개념
1. State: React docs는 component-specific memory를 state라고 부르며 current input value, current image, shopping cart 같은 것을 예로 든다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
2. `useState`: React docs는 `useState` Hook이 state variable을 retain하고 setter function으로 update와 re-render를 trigger한다고 설명한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
3. Hooks rule: React docs는 Hooks가 component나 custom Hook의 top level에서만 call될 수 있으며 conditions, loops, nested functions 안에서 call할 수 없다고 설명한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
4. State snapshot: React docs는 state가 snapshot처럼 동작하며 setting state가 이미 가지고 있는 state variable을 바꾸는 것이 아니라 re-render를 trigger한다고 설명한다. (출처: https://react.dev/learn/state-as-a-snapshot, 확인: 2026-07-06)
5. Batching: React docs는 event handler 안의 모든 code가 run된 뒤 state updates를 process하며, 이것이 batching이라고 설명한다. (출처: https://react.dev/learn/queueing-a-series-of-state-updates, 확인: 2026-07-06)
6. Effect: React docs는 Effects가 rendering itself 때문에 생기는 side effects를 specify하고, commit 후 screen update가 끝난 뒤 run된다고 설명한다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
7. Effect dependencies: React docs는 most Effects should only re-run when needed and React will skip the Effect if dependencies have same values as last render라고 설명한다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
8. Unnecessary Effects: React docs는 external system이 없다면 Effect가 필요하지 않을 수 있고, state/props 변화에 따른 state update를 위해 Effect를 쓰지 말라고 설명한다. (출처: https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)

## 관련 기술
React component model은 state/effects의 선행 구조다. State는 component-specific memory이고, Effect는 component가 external system과 synchronize하는 escape hatch이므로 component render function과 props를 먼저 이해해야 한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
DOM events는 state update의 일반적인 trigger다. React docs는 event handlers가 user action으로 caused side effects를 담고, Effects는 particular event가 아니라 rendering itself 때문에 caused되는 side effects를 담는다고 구분한다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
TypeScript는 state shape와 action/result shape를 표현할 수 있지만, React state semantics 자체를 바꾸지는 않는다. TypeScript static type system은 value shapes를 describe하고, React docs는 state snapshot/batching semantics를 따로 설명한다. (출처: https://www.typescriptlang.org/docs/handbook/2/basic-types.html, 확인: 2026-07-06; https://react.dev/learn/state-as-a-snapshot, 확인: 2026-07-06)

## 선행 개념
react-component-model: state는 component-specific memory이고 Effect는 component lifecycle/rendering과 연결되므로 component function, props, render purity를 먼저 알아야 한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/keeping-components-pure, 확인: 2026-07-06)
javascript-dom-events: event handler는 specific user action 때문에 발생하는 side effects를 담고 state setter를 호출할 수 있으므로 DOM event와 JavaScript function 기초가 필요하다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)

## 후행 개념
nextjs-routing-rendering: Next.js에서 server/client components, route-level rendering, data fetching을 이해할 때 client component state와 effects의 한계를 알아야 한다. 이 KB는 React 공식 state/effects semantics에 한정한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)
frontend-testing-basics: state transition, event handler behavior, effect cleanup과 dependency는 UI test에서 확인해야 하는 주요 behavior가 된다. (출처: https://react.dev/learn/queueing-a-series-of-state-updates, 확인: 2026-07-06; https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 React code를 만들 때 가장 흔한 위험 중 하나는 local variable을 state처럼 쓰거나 state setter 이후 값을 즉시 바뀐 것으로 가정하는 것이다. React docs는 local variable이 render 사이에 persist되지 않고 state가 snapshot처럼 동작한다고 설명하므로, AI output에서 이 두 오해를 검사해야 한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06; https://react.dev/learn/state-as-a-snapshot, 확인: 2026-07-06)
AI가 `useEffect`를 남용해 derived state를 만들면 unnecessary re-render와 stale response 같은 문제를 만들 수 있다. React docs는 external system이 없으면 Effect가 필요하지 않아야 하며 unnecessary Effects 제거가 code를 faster and less error-prone하게 한다고 설명한다. (출처: https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)
AI에게 bug를 맡길 때는 event handler, state setter, render snapshot, effect dependencies, external system을 evidence로 분리해야 한다. React docs는 events와 Effects를 interaction-caused side effects와 rendering-caused side effects로 구분한다. (출처: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06)

## 실무 활용
1. Local variable을 state로 바꾸기: render 사이에 기억해야 하고 UI re-render가 필요하면 `useState`를 사용한다. React docs는 state variable과 setter function이 data retention과 re-render trigger를 제공한다고 설명한다. (근거: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

2. Updater function 사용: 같은 event handler에서 state를 여러 번 갱신하거나 previous state에 의존할 때 updater function을 사용한다. React docs는 updater function이 queue에 들어가 next render에서 previous state를 받아 final state를 계산한다고 설명한다. (근거: https://react.dev/learn/queueing-a-series-of-state-updates, 확인: 2026-07-06)

```tsx
setCount((count) => count + 1);
```

3. Effect 필요 여부 판단: network, browser API, third-party widget처럼 external system과 sync할 때 Effect를 고려한다. React docs는 Effect가 external system과 synchronize하기 위한 escape hatch이며, external system이 없으면 Effect가 필요하지 않을 수 있다고 설명한다. (근거: https://react.dev/learn/synchronizing-with-effects, 확인: 2026-07-06; https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)

## FAQ
Q: state는 그냥 변수와 같은가?
A: 아니다. React docs는 local variables가 render 사이에 persist되지 않고 changes가 renders를 trigger하지 않는다고 설명한다. state variable과 setter가 이 두 요구를 해결한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)

Q: `setState`를 호출하면 바로 현재 변수 값이 바뀌는가?
A: 아니다. React docs는 state가 snapshot처럼 동작하고 setting state가 current variable을 바꾸는 것이 아니라 re-render를 trigger한다고 설명한다. (출처: https://react.dev/learn/state-as-a-snapshot, 확인: 2026-07-06)

Q: 여러 `setState` 호출은 즉시 각각 render를 만드는가?
A: React docs는 event handler code가 모두 run된 뒤 state updates를 process하고, 이것이 batching이라고 설명한다. (출처: https://react.dev/learn/queueing-a-series-of-state-updates, 확인: 2026-07-06)

Q: `useEffect`는 data 계산에도 쓰는가?
A: external system이 없다면 보통 필요하지 않다. React docs는 state/props 변화에 따른 state update에는 Effect가 필요하지 않을 수 있고, unnecessary Effects 제거가 code를 더 쉽고 빠르고 덜 error-prone하게 한다고 설명한다. (출처: https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: local variable을 바꾸면 UI가 바뀐다고 생각한다. 왜 생기나: 일반 JavaScript variable mental model을 그대로 적용하기 때문이다. 교정: React docs처럼 data retention과 re-render trigger가 필요하면 state를 사용한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)
2. 실수: state setter 다음 줄에서 값이 이미 바뀌었다고 가정한다. 왜 생기나: state snapshot model을 모르기 때문이다. 교정: setting state는 current variable을 바꾸는 것이 아니라 re-render를 요청한다. (출처: https://react.dev/learn/state-as-a-snapshot, 확인: 2026-07-06)
3. 실수: 모든 derived data를 Effect로 만든다. 왜 생기나: Effect를 "상태 변화 감지기"로 오해하기 때문이다. 교정: external system이 없으면 render 중 계산하거나 state structure를 조정한다. (출처: https://react.dev/learn/you-might-not-need-an-effect, 확인: 2026-07-06)
4. 실수: Hook을 condition 안에서 call한다. 왜 생기나: Hook을 일반 함수처럼 보기 때문이다. 교정: React docs처럼 Hooks는 component나 custom Hook top level에서만 call한다. (출처: https://react.dev/learn/state-a-components-memory, 확인: 2026-07-06)

## 공식 출처
- state는 component-specific memory다 — [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) (확인: 2026-07-06)
- state variable과 setter function은 retention과 re-render trigger를 제공한다 — [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) (확인: 2026-07-06)
- state는 snapshot처럼 동작한다 — [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) (확인: 2026-07-06)
- React는 event handler가 끝난 뒤 state updates를 process한다 — [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) (확인: 2026-07-06)
- Effects는 rendering-caused side effects와 external system sync에 쓰인다 — [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) (확인: 2026-07-06)
- external system이 없으면 Effect가 필요하지 않을 수 있다 — [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) (확인: 2026-07-06)

## Quote Bank
- > "In React, this kind of component-specific memory is called state."
  - 출처: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) (확인: 2026-07-06)
  - 맥락: state의 정의를 설명할 때 사용한다.
- > "Local variables don’t persist between renders."
  - 출처: [State: A Component's Memory](https://react.dev/learn/state-a-components-memory) (확인: 2026-07-06)
  - 맥락: local variable과 state의 차이를 설명할 때 사용한다.
- > "State variables might look like regular JavaScript variables that you can read and write to."
  - 출처: [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) (확인: 2026-07-06)
  - 맥락: state snapshot 오해를 설명할 때 사용한다.
- > "React waits until all code in the event handlers has run before processing your state updates."
  - 출처: [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) (확인: 2026-07-06)
  - 맥락: batching을 설명할 때 사용한다.
- > "Effects let you specify side effects that are caused by rendering itself"
  - 출처: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) (확인: 2026-07-06)
  - 맥락: Effect의 역할을 설명할 때 사용한다.
- > "If there is no external system involved, you shouldn’t need an Effect."
  - 출처: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) (확인: 2026-07-06)
  - 맥락: Effect 남용을 교정할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
