## 한 줄 정의

React state와 Effect는 component가 시간에 따라 변하는 화면과 외부 시스템 동기화를 다루는 두 가지 다른 장치입니다. React docs는 interaction 결과로 screen의 내용을 바꿔야 할 때 component-specific memory가 필요하고, 이런 memory를 state라고 부릅니다. Effect는 rendering 자체 때문에 발생하는 side effects를 지정하고, component를 network나 third-party library 같은 external system과 synchronize할 때 사용합니다.

이 두 개념을 같은 "상태 변화 처리 도구"로 묶으면 React code가 빠르게 꼬입니다. state는 render 사이에 기억해야 하는 UI data를 담고, Effect는 render 결과가 screen에 반영된 뒤 external system과 맞추는 escape hatch입니다. ==state는 component memory이고, Effect는 external synchronization입니다.== 이 한 줄을 놓치면 AI가 만든 React code에서 local variable, state setter, derived state, network request가 한 곳에 뒤섞입니다.

이전 강의에서 component가 props를 input으로 받아 JSX를 계산하는 JavaScript function boundary라는 점을 배웠습니다. 이번 강의는 그 component가 사용자 interaction을 만나며 어떻게 기억하고 다시 그려지는지, 그리고 왜 모든 계산을 `useEffect`에 넣으면 안 되는지를 다룹니다.

![React state and effects flow](/lesson-diagrams/react-state-and-effects/react-state-effects-flow.svg)

## 왜 존재하는가

React component는 function처럼 보입니다. function이라면 local variable을 바꾸면 값이 변할 것 같고, 다음 줄에서 바로 그 값을 읽을 수 있을 것 같습니다. 하지만 UI는 한 번 계산하고 끝나는 값이 아닙니다. 사용자가 button을 누르고, input을 입력하고, API response가 도착하고, component가 다시 render되면서 화면이 계속 바뀝니다.

local variable은 이 문제를 해결하지 못합니다. React docs는 local variables don't persist between renders, changes to local variables won't trigger renders라고 설명합니다. 즉 local variable은 render가 다시 일어나면 새로 계산되고, 값을 바꿔도 React가 screen을 다시 그려야 한다는 signal을 받지 못합니다. state는 이 두 요구, render 사이 data retention과 re-render trigger를 해결하기 위해 존재합니다.

Effect는 다른 문제에서 생깁니다. component rendering은 React 내부의 계산이지만, 실제 앱은 외부 세계와 연결됩니다. video player를 play/pause해야 할 수 있고, chat server에 connect해야 할 수 있으며, third-party widget을 현재 props/state와 맞춰야 할 수 있습니다. React docs는 이런 external system synchronization을 Effect의 용도로 설명합니다.

하지만 Effect는 너무 쉽게 남용됩니다. 어떤 값이 props나 state에서 계산될 수 있는데도 Effect로 다시 state를 set하면 extra render가 생기고, stale value나 dependency 문제가 따라옵니다. React docs는 external system이 없다면 Effect가 필요하지 않아야 한다고 말합니다. 이 원칙은 AI가 React code를 만들 때 특히 중요합니다. AI는 "변하면 useEffect"라는 패턴을 과하게 적용하기 쉽습니다.

> [!KEY]
> state는 UI가 기억해야 할 값을 React에게 알려 주고, Effect는 React 밖의 system과 맞춰야 할 때만 꺼내는 도구입니다.

## 작동 원리

### 1. State는 render 사이에 유지되는 component-specific memory입니다

React docs는 current input value, current image, shopping cart 같은 component-specific memory를 state라고 부릅니다. state는 component instance가 기억해야 하는 값입니다. 예를 들어 counter component는 count를 기억해야 하고, tab component는 selected tab을 기억해야 하며, form component는 input value를 기억해야 합니다.

`useState` Hook은 state variable과 setter function을 제공합니다. state variable은 현재 render에서 읽는 snapshot이고, setter는 React에게 "이 state가 바뀌었으니 다시 render해 달라"고 요청하는 function입니다.

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

이 코드는 local variable과 다릅니다. `count`는 render 사이에 React가 보존하고, `setCount`를 호출하면 React가 새로운 render를 준비합니다. button text는 다음 render에서 새로운 count snapshot을 보여 줍니다.

### 2. Hooks는 top level에서만 호출합니다

React docs는 Hooks가 component나 custom Hook의 top level에서만 call될 수 있고, conditions, loops, nested functions 안에서 call할 수 없다고 설명합니다. 이 규칙은 Hook 호출 순서가 render마다 안정적으로 유지되어야 하기 때문입니다.

초보자는 "조건에 따라 state가 필요하니까 if 안에서 useState를 호출하면 되지 않나?"라고 생각할 수 있습니다. 그러나 Hook은 일반 helper function이 아니라 React가 component memory를 연결하는 mechanism입니다. AI가 conditional hook call을 만들면 즉시 교정해야 합니다.

```tsx
function BadExample({ enabled }: { enabled: boolean }) {
  if (enabled) {
    const [value, setValue] = useState("");
    return <input value={value} onChange={(event) => setValue(event.target.value)} />;
  }
  return null;
}
```

이런 구조는 Hook top-level rule에 맞지 않습니다. Hook은 component top level에 두고, 조건은 return이나 rendering logic 안에서 처리해야 합니다.

### 3. State는 snapshot처럼 동작합니다

React docs는 state가 snapshot처럼 동작하고, setting state가 current state variable을 바꾸는 것이 아니라 re-render를 trigger한다고 설명합니다. 이 문장이 React state를 변수와 구분하는 핵심입니다.

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

`setCount(count + 1)`을 호출한 직후 같은 handler 안의 `count`가 바로 새 값으로 바뀐다고 생각하면 안 됩니다. 그 `count`는 현재 render의 snapshot입니다. setter는 다음 render를 요청합니다. 그래서 state setter 이후 값을 즉시 사용해야 할 때는 현재 snapshot과 다음 state 계산의 차이를 이해해야 합니다.

==State setter는 현재 변수를 mutate하지 않고 다음 render를 예약합니다.== AI가 "setState 다음 줄에서 새 state를 읽는" code를 만들면 이 원칙으로 검토합니다.

### 4. Batching은 event handler가 끝난 뒤 update를 처리합니다

React docs는 event handler 안의 모든 code가 run된 뒤 state updates를 process하며, 이것을 batching이라고 설명합니다. batching은 여러 state update가 한 interaction 안에서 일어날 때 불필요한 중간 render를 줄이는 데 도움이 됩니다.

하지만 batching을 모르면 같은 handler에서 여러 번 `setCount(count + 1)`을 호출했을 때 기대와 다른 결과를 볼 수 있습니다. previous state에 의존하는 update라면 updater function을 사용합니다.

```tsx
setCount((current) => current + 1);
setCount((current) => current + 1);
```

updater function은 queue에 들어가 next render에서 previous state를 받아 final state를 계산합니다. AI가 counter나 list update code를 만들 때 stale snapshot을 사용하는지, updater function이 필요한 상황인지 확인해야 합니다.

### 5. Event handler와 Effect는 원인이 다릅니다

React docs는 event handler가 specific interaction 때문에 발생하는 side effect를 담고, Effect는 rendering itself 때문에 생기는 side effect를 담는다고 구분합니다. 사용자가 button을 눌러 form을 제출하는 것은 event handler에 가깝습니다. component가 screen에 보이는 동안 chat connection을 유지하는 것은 Effect에 가깝습니다.

이 구분은 code placement를 결정합니다. 사용자가 click했을 때 일어나는 일은 click handler에 둡니다. component가 render되어 DOM update가 끝난 뒤 external system과 맞춰야 하는 일은 Effect를 고려합니다. 모든 side effect를 Effect에 넣으면 원인이 흐려지고 dependency가 복잡해집니다.

### 6. Effect는 commit 이후 실행됩니다

React docs는 Effects가 commit 후 screen update가 끝난 뒤 run된다고 설명합니다. component render가 UI description을 계산하고, React가 DOM update를 commit한 뒤, Effect가 external system synchronization을 수행합니다. 즉 Effect는 render 중 계산을 대체하는 장소가 아닙니다.

```tsx
import { useEffect, useRef } from "react";

export function VideoPlayer({ isPlaying }: { isPlaying: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} />;
}
```

이 예시는 component의 prop `isPlaying`을 browser video element라는 external system과 맞추는 구조입니다. JSX만으로 video element의 imperative play/pause method를 표현할 수 없으므로 Effect가 필요합니다.

### 7. Effect dependency는 re-run 조건을 표현합니다

React docs는 most Effects should only re-run when needed and React will skip the Effect if dependencies have same values as last render라고 설명합니다. dependency array는 "이 값이 바뀌면 external synchronization을 다시 수행해야 한다"는 조건입니다.

dependency를 빼면 stale value를 볼 수 있고, 불필요한 값을 넣으면 Effect가 너무 자주 실행될 수 있습니다. 하지만 dependency array를 error silence 용도로 조작하면 안 됩니다. Effect 안에서 읽는 reactive value가 무엇인지, 그것이 external system sync에 필요한지 검토해야 합니다.

### 8. 외부 시스템이 없으면 Effect가 필요하지 않을 수 있습니다

React docs는 external system이 없다면 Effect가 필요하지 않아야 하고, state/props 변화에 따른 state update에는 Effect를 쓰지 말라고 설명합니다. 예를 들어 firstName과 lastName으로 fullName을 만들기 위해 Effect와 state를 추가하는 것은 흔한 남용입니다.

```tsx
function NameView({ firstName, lastName }: { firstName: string; lastName: string }) {
  const fullName = `${firstName} ${lastName}`;
  return <p>{fullName}</p>;
}
```

이 계산은 render 중에 할 수 있습니다. Effect로 `fullName` state를 따로 만들면 source of truth가 늘어나고, extra render가 생기며, dependency 실수가 생길 수 있습니다.

> [!WARNING]
> 값이 바뀌면 뭔가 해야 한다는 생각만으로 `useEffect`를 쓰면 derived state와 stale value 문제가 생기기 쉽습니다.

## 스펙과 세부

### State는 local variable의 두 한계를 해결합니다

local variable은 render 사이에 persist되지 않고, 변경해도 render를 trigger하지 않습니다. state는 이 두 요구를 해결합니다. 그래서 UI가 기억해야 하고 화면을 다시 그려야 하는 값은 state 후보입니다. 반대로 render 중 계산 가능한 값은 state가 아닐 수 있습니다.

### Setter는 mutation이 아니라 scheduling입니다

state setter는 현재 render의 variable을 직접 바꾸지 않습니다. 다음 render를 요청합니다. 이 때문에 setter 직후 current state를 읽으면 이전 snapshot을 보게 됩니다. 이 모델은 처음엔 낯설지만, render를 pure calculation으로 유지하는 데 중요합니다.

### Batching은 중간 상태를 화면에 바로 보여주지 않을 수 있습니다

event handler 안에서 여러 update가 일어나도 React는 handler가 끝난 뒤 update를 처리할 수 있습니다. 이 동작은 UI가 half-finished state로 보이지 않게 돕습니다. previous state에 의존하는 update는 updater function으로 표현하는 것이 안전합니다.

### Effect는 external system synchronization입니다

Effect가 필요한 대표 조건은 React 밖의 system이 있다는 것입니다. browser API, network connection, third-party widget, imperative DOM API 같은 외부 대상이 현재 props/state와 맞아야 할 때 Effect를 고려합니다. 외부 대상이 없다면 Effect 없이 render 중 계산하거나 state structure를 바꿀 수 있는지 먼저 봅니다.

### Dependency는 숨기는 것이 아니라 설명하는 것입니다

dependency array는 lint error를 없애기 위해 비워 두는 곳이 아닙니다. Effect가 어떤 reactive value 변화에 다시 synchronize해야 하는지 드러내는 설명입니다. dependency가 불편하다면 Effect 자체가 필요 없는 derived calculation인지, state 구조가 잘못된 것인지 먼저 검토합니다.

## 원문으로 읽기

> "In React, this kind of component-specific memory is called state."
>
> — React에서는 이런 component-specific memory를 state라고 부른다.
> [State: A Component's Memory — React](https://react.dev/learn/state-a-components-memory)

이 문장은 state를 전역 저장소나 단순 변수와 구분하게 해 줍니다. state는 component가 render 사이에 기억해야 하는 memory입니다. UI가 기억해야 하는 값인지 아닌지 판단하는 첫 기준이 됩니다.

> "Local variables don’t persist between renders."
>
> — local variables는 render 사이에 유지되지 않는다.
> [State: A Component's Memory — React](https://react.dev/learn/state-a-components-memory)

state가 왜 필요한지 가장 짧게 설명하는 문장입니다. local variable이 화면 interaction을 기억하지 못한다면, React가 보존하고 re-render를 trigger할 수 있는 state가 필요합니다.

> "State variables might look like regular JavaScript variables that you can read and write to."
>
> — State variables는 읽고 쓸 수 있는 일반 JavaScript variables처럼 보일 수 있다.
> [State as a Snapshot — React](https://react.dev/learn/state-as-a-snapshot)

이 문장은 오해의 출발점을 짚습니다. state variable은 변수처럼 보이지만 snapshot처럼 동작합니다. setter를 호출한 뒤 같은 render의 variable이 mutate된다고 생각하면 debugging이 어려워집니다.

관련 원문(링크): [Queueing a Series of State Updates — React](https://react.dev/learn/queueing-a-series-of-state-updates)

batching을 이해하게 해 주는 문장입니다. event handler 안에서 여러 update가 일어나도 React는 한 번에 처리할 수 있습니다. previous state가 필요한 경우 updater function을 써야 하는 이유도 여기서 나옵니다.

관련 원문(링크): [You Might Not Need an Effect — React](https://react.dev/learn/you-might-not-need-an-effect)

Effect 남용을 막는 가장 중요한 기준입니다. props/state에서 계산 가능한 값을 Effect로 다시 state에 넣는 code는 대개 단순하지도 빠르지도 않습니다. AI가 `useEffect`를 제안할 때 외부 시스템이 있는지 먼저 물어야 합니다.

## 실전에서

### 1. Local variable을 state로 바꿀지 판단합니다

UI가 어떤 값을 기억해야 하고, 그 값이 바뀌면 화면이 다시 그려져야 한다면 state 후보입니다.

```tsx
import { useState } from "react";

export function LessonToggle() {
  const [completed, setCompleted] = useState(false);

  return (
    <button onClick={() => setCompleted((current) => !current)}>
      {completed ? "완료" : "진행 중"}
    </button>
  );
}
```

이 예시에서 `completed`는 사용자 interaction 이후에도 기억되어야 하고, 바뀌면 button label이 바뀌어야 합니다. local variable보다 state가 맞습니다.

### 2. Derived value는 render 중 계산합니다

```tsx
function ProgressLabel({ completed, total }: { completed: number; total: number }) {
  const percentage = total <= 0 ? 0 : Math.round((completed / total) * 100);
  return <p>{percentage}% 완료</p>;
}
```

`percentage`는 props에서 계산되는 값입니다. 외부 system이 없고, render 중 계산할 수 있습니다. 이 값을 state와 Effect로 따로 만들면 source of truth가 늘어납니다.

### 3. Previous state에 의존하면 updater function을 씁니다

```tsx
function StepCounter() {
  const [count, setCount] = useState(0);

  function addThree() {
    setCount((current) => current + 1);
    setCount((current) => current + 1);
    setCount((current) => current + 1);
  }

  return <button onClick={addThree}>{count}</button>;
}
```

같은 event handler 안에서 previous state에 의존하는 여러 update를 할 때는 current snapshot이 아니라 updater function을 사용합니다. batching과 snapshot model을 함께 고려한 code입니다.

### 4. Effect는 external system이 있을 때 씁니다

```tsx
import { useEffect } from "react";

export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}
```

`document.title`은 React rendering 밖의 browser API입니다. component의 `title` prop과 external document title을 synchronize해야 하므로 Effect가 적절합니다. 반대로 `<h1>{title}</h1>`만 필요하다면 Effect가 필요 없습니다.

### 5. AI 코드 리뷰 checklist를 만듭니다

AI가 React state/effect code를 만들면 다음 질문을 던집니다.

```txt
- 이 값은 render 사이에 기억되어야 하는가?
- 이 값 변경이 re-render를 trigger해야 하는가?
- setter 직후 current state를 새 값처럼 읽고 있지 않은가?
- previous state에 의존하는데 updater function이 필요한가?
- Effect 안에 external system이 실제로 있는가?
- Effect dependency는 읽는 reactive value를 설명하는가?
```

이 checklist는 문법 검사가 아니라 mental model 검사입니다. AI가 그럴듯한 React code를 만들었더라도 snapshot, batching, external synchronization 기준을 통과해야 합니다.

> [!TIP]
> `useEffect`를 볼 때 첫 질문은 "dependency가 맞나?"가 아니라 "외부 시스템이 있나?"입니다.

## 한계와 트레이드오프

첫째, state를 많이 쓴다고 app이 더 React답게 되는 것은 아닙니다. props나 기존 state에서 계산 가능한 derived value를 state로 만들면 source of truth가 늘어납니다. state는 UI가 기억해야 하고 re-render를 trigger해야 하는 값에 집중합니다.

둘째, Effect는 강력하지만 비용이 있습니다. dependency 관리, cleanup, stale closure, extra render 같은 문제가 따라올 수 있습니다. React docs가 unnecessary Effects 제거를 권하는 이유는 code가 easier to follow, faster to run, less error-prone해질 수 있기 때문입니다.

셋째, state setter는 synchronous variable assignment가 아닙니다. 이 모델은 처음에 낯설지만, React가 render를 snapshot 단위로 다루는 데 중요합니다. setter 직후 새 값을 기대하는 code는 bug가 될 수 있습니다.

넷째, batching은 보통 성능과 일관성에 도움이 되지만, 초보자에게는 "왜 세 번 set했는데 한 번만 변하지?" 같은 혼란을 줍니다. previous state에 의존하는 update는 updater function으로 의도를 분명히 해야 합니다.

마지막으로, 이 강의는 React state/effect의 기본 mental model에 한정합니다. data fetching framework, server/client component boundary, effect cleanup 세부, concurrent rendering의 깊은 주제는 후속 강의에서 다루는 편이 좋습니다. ==초보 단계의 목표는 useState와 useEffect를 많이 쓰는 것이 아니라, 언제 쓰지 말아야 하는지 아는 것입니다.==

## 더 읽기

먼저 React의 [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)를 읽습니다. state가 component-specific memory이며 local variable의 두 한계를 해결한다는 점을 확인합니다.

다음으로 [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)을 읽습니다. state variable이 regular JavaScript variable처럼 보이지만 snapshot처럼 동작한다는 mental model을 잡습니다.

그다음 [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)를 읽습니다. batching과 updater function을 이해하면 event handler 안의 여러 update를 안전하게 다룰 수 있습니다.

이후 [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)를 읽습니다. Effect가 rendering-caused side effects와 external system synchronization에 쓰인다는 기준을 확인합니다.

마지막으로 [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)를 읽습니다. external system이 없으면 Effect가 필요하지 않을 수 있다는 원칙은 AI가 만든 React code를 검토할 때 매우 강력한 기준입니다.

후속 학습은 `nextjs-routing-rendering`과 `frontend-testing-basics`입니다. React state/effect의 경계를 이해해야 Next.js client/server rendering과 UI test에서 어떤 behavior를 확인해야 하는지 설명할 수 있습니다.
