# 용어 초안: react-state-and-effects

## React State
- category: React
- shortDefinition: component가 render 사이에 기억해야 하는 component-specific memory
- explanation: React State는 local variable과 달리 render 사이에 유지되고 setter를 통해 re-render를 trigger할 수 있는 값입니다. input value, selected item, completed flag처럼 UI가 기억해야 하는 값에 사용합니다.
- related: ["useState", "State Snapshot", "React Component"]

## useState
- category: React
- shortDefinition: state variable과 setter function을 제공하는 React Hook
- explanation: useState는 component가 값을 기억하고 그 값이 바뀌었을 때 React에게 re-render를 요청할 수 있게 합니다. setter는 현재 변수를 직접 mutate하는 것이 아니라 다음 render를 예약합니다.
- related: ["React State", "Hook", "State Setter"]

## Hook
- category: React
- shortDefinition: React component나 custom Hook top level에서 호출하는 React 기능 연결 함수
- explanation: Hook은 component memory나 effect 같은 React 기능을 component에 연결합니다. conditions, loops, nested functions 안이 아니라 component 또는 custom Hook의 top level에서 호출해야 합니다.
- related: ["useState", "useEffect", "React Component"]

## State Snapshot
- category: React
- shortDefinition: 한 render 안에서 state variable이 고정된 값처럼 읽히는 React state model
- explanation: State Snapshot은 state setter가 current variable을 즉시 바꾸는 것이 아니라 다음 render를 요청한다는 점을 설명합니다. setter 직후 같은 handler 안에서 state를 새 값처럼 읽으면 stale value 오해가 생길 수 있습니다.
- related: ["React State", "Batching", "State Setter"]

## Batching
- category: React
- shortDefinition: event handler code가 끝난 뒤 여러 state update를 모아 처리하는 React 동작
- explanation: Batching은 여러 state update가 한 interaction 안에서 일어날 때 중간 render를 줄이고 UI가 half-finished state로 보이지 않게 돕습니다. previous state에 의존하는 update는 updater function으로 표현하는 것이 안전합니다.
- related: ["State Snapshot", "Updater Function", "React State"]

## Effect
- category: React
- shortDefinition: rendering 자체 때문에 발생하는 side effect와 external system synchronization을 지정하는 React 장치
- explanation: Effect는 component가 browser API, network connection, third-party widget 같은 React 밖의 system과 현재 props/state를 맞춰야 할 때 사용합니다. external system이 없다면 Effect가 필요하지 않을 수 있습니다.
- related: ["useEffect", "Effect Dependency", "External System"]

## useEffect
- category: React
- shortDefinition: component render 결과 이후 external system과 동기화하는 Effect를 선언하는 Hook
- explanation: useEffect는 commit 후 실행되어 component의 props/state와 React 밖의 system을 synchronize할 수 있게 합니다. 모든 derived value 계산에 쓰는 도구가 아니며 dependency를 통해 re-run 조건을 설명해야 합니다.
- related: ["Effect", "Effect Dependency", "Hook"]

## Effect Dependency
- category: React
- shortDefinition: Effect가 다시 실행되어야 하는 reactive value 조건
- explanation: Effect Dependency는 Effect 안에서 사용하는 props/state 변화 중 external synchronization을 다시 수행해야 하는 조건을 나타냅니다. lint error를 숨기는 장치가 아니라 Effect의 re-run 기준을 설명하는 계약입니다.
- related: ["Effect", "useEffect", "External System"]
