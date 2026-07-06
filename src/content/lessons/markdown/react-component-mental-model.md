## 한 줄 정의

React 컴포넌트 사고방식은 UI를 재사용 가능한 JavaScript function 단위로 나누고, props와 composition으로 화면 구조를 조립하는 방식입니다. React docs는 components를 React의 core concepts 중 하나이자 UI를 build하는 foundation으로 설명합니다. 중요한 점은 component가 HTML을 지우는 것이 아니라, markup, CSS, JavaScript를 하나의 custom component boundary 안에서 다루게 한다는 것입니다.

초보자는 React를 처음 볼 때 `<Profile />` 같은 문법 때문에 "새 HTML tag를 만드는 것"으로 오해하기 쉽습니다. 하지만 React component는 regular JavaScript function이고, JSX를 return하며, browser가 최종적으로 보는 것은 여전히 HTML elements입니다. lowercase `<section>`은 HTML tag이고, capitalized `<Profile />`은 component라는 구분이 출발점입니다.

==React component를 이해한다는 것은 화면을 작은 부품으로 쪼개는 것이 아니라, data flow와 rendering boundary를 함께 설계한다는 뜻입니다.== AI에게 UI 수정을 맡길 때도 이 boundary가 있으면 "어디를 고쳐야 하는가"가 훨씬 선명해집니다.

![React component mental model](/lesson-diagrams/react-component-mental-model/react-component-mental-model.svg)

## 왜 존재하는가

전통적인 web page 작성에서는 HTML이 content structure를 만들고, CSS가 style을 입히며, JavaScript가 interaction을 추가했습니다. 작은 page에서는 이 방식이 충분하지만, app의 interactivity가 커질수록 같은 버튼, 카드, 목록, form, navigation, modal이 반복됩니다. markup은 흩어지고, styling과 behavior가 서로 멀어지고, 하나의 UI 조각을 고치려면 여러 파일과 여러 위치를 추적해야 합니다.

React component는 이 문제를 "화면 조각" 단위로 다시 묶습니다. React docs는 React가 markup, CSS, JavaScript를 custom components로 combine하게 하고, components를 reusable UI elements로 설명합니다. 즉 component는 단순한 template 조각이 아니라, UI structure와 필요한 JavaScript logic을 함께 담는 경계입니다.

컴포넌트 사고방식이 없으면 AI가 만든 UI도 쉽게 비대해집니다. 한 page component 안에 모든 card, list, button, state, conditional rendering이 섞이면 수정 범위가 흐려집니다. "이 card의 title만 바꾸자"가 전체 page rendering을 건드리는 요청이 되고, "이 list item의 props shape를 바꾸자"가 여러 hidden dependency를 깨뜨릴 수 있습니다.

React의 대답은 composition입니다. HTML tags처럼 components를 compose, order, nest해서 whole pages를 design합니다. 한 번만 쓰이는 component도 의미가 있습니다. 재사용보다 더 중요한 경우도 boundary입니다. 어떤 UI 조각이 독립된 책임과 input을 갖는다면 component로 분리할 수 있습니다.

> [!KEY]
> React component는 "재사용되는 작은 HTML"이 아니라 UI 책임, input, rendering을 묶는 JavaScript function boundary입니다.

## 작동 원리

### 1. Component는 JavaScript function입니다

React docs는 React component가 markup을 sprinkle할 수 있는 JavaScript function이라고 설명합니다. function이기 때문에 input을 받을 수 있고, 내부에서 값과 조건을 계산할 수 있으며, 결과로 JSX를 return합니다. 이때 JSX는 browser가 직접 이해하는 HTML string이 아니라 React가 UI description으로 다루는 syntax입니다.

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

이 component는 `title`과 `summary`라는 props를 받고, article markup을 return합니다. TypeScript type은 props shape를 설명합니다. component의 핵심은 화면에 보이는 모양뿐 아니라 "이 UI 조각이 어떤 input으로 결정되는가"입니다.

### 2. Capitalized name은 component boundary를 만듭니다

React docs는 component names가 capital letter로 시작해야 하고 JSX markup을 return한다고 설명합니다. lowercase tag는 built-in HTML tag로 읽히고, capitalized tag는 component로 읽힙니다. 이 구분은 JSX를 읽는 첫 번째 규칙입니다.

`<article>`은 HTML element이고 `<LessonCard />`는 React component입니다. component 안에서는 HTML tags를 여전히 사용합니다. 그래서 React는 HTML을 없애는 것이 아니라, HTML elements를 JavaScript function composition 안에서 조직합니다.

### 3. Composition은 작은 component를 page로 조립합니다

React docs는 HTML tags처럼 components를 compose, order, nest해서 whole pages를 design할 수 있다고 설명합니다. page는 하나의 큰 component일 수도 있지만, 실제로는 Header, Sidebar, LessonCard, ProgressBadge, BookmarkButton 같은 component tree로 읽는 편이 좋습니다.

```tsx
export function LessonList({ lessons }: { lessons: LessonCardProps[] }) {
  return (
    <section>
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.title}
          title={lesson.title}
          summary={lesson.summary}
        />
      ))}
    </section>
  );
}
```

이 예시는 `LessonList`가 여러 `LessonCard`를 compose하는 구조입니다. component tree를 보면 data가 어디서 들어오고, 어떤 child component에 전달되는지 알 수 있습니다. AI에게 수정 요청을 할 때도 "LessonCard의 rendering만 바꿔라"와 "LessonList의 mapping 구조를 바꿔라"는 다른 요청입니다.

### 4. Props는 parent에서 child로 내려가는 information입니다

React docs는 props가 parent component가 child component에 pass하는 information이라고 설명합니다. 또 own components에는 objects, arrays, functions를 포함한 any JavaScript value를 pass할 수 있다고 설명합니다. props는 HTML attributes처럼 보이지만, component communication의 기본 통로입니다.

props를 이해하지 못하면 child component가 parent scope나 global variable에 의존하게 됩니다. 그렇게 되면 component를 재사용하거나 테스트하거나 AI에게 수정 범위를 설명하기 어려워집니다. child가 필요한 data는 props로 받게 하고, parent가 어떤 data를 줄지 결정하는 구조가 기본입니다.

==Props는 component의 public input contract입니다.== TypeScript를 함께 쓰면 props type이 이 contract를 code로 표현합니다. AI가 component를 만들 때 props type이 없으면 hidden assumption이 늘어납니다.

### 5. Component는 pure function처럼 생각합니다

React docs는 React가 every component를 pure function으로 가정하며, same inputs에는 same JSX를 return해야 한다고 설명합니다. Purity는 component를 예측 가능하게 만드는 핵심입니다. component render 중에 외부 variable을 바꾸거나, 같은 props인데 매번 다른 side effect를 만들면 React의 mental model과 충돌합니다.

Pure function 관점은 state/effect를 배우기 전에도 중요합니다. component의 역할은 현재 props와 state를 바탕으로 UI description을 계산하는 것입니다. 외부 system과 동기화하거나 browser API를 직접 다루는 일은 effect 같은 별도 mechanism에서 다루게 됩니다. 이번 강의는 state/effect를 깊게 다루지 않지만, render purity를 기본 원칙으로 세웁니다.

### 6. Render와 commit은 계산과 적용의 흐름입니다

React docs는 render와 commit을 UI update 단계로 설명합니다. React는 components를 call해 screen에 무엇을 표시할지 계산하고, DOM update를 commit합니다. 초보자는 component function이 곧 DOM을 직접 조작한다고 생각하기 쉽지만, React mental model에서는 component가 UI description을 만들고 React가 그 결과를 screen에 반영합니다.

이 구분은 performance와 debugging에 도움이 됩니다. "component가 render됐다"는 말은 function이 호출되어 UI description을 계산했다는 뜻이고, "DOM이 업데이트됐다"는 말과 항상 같은 의미는 아닙니다. AI가 "DOM을 직접 수정하자"는 식으로 React code를 작성하면, React의 render/commit 흐름과 충돌할 수 있습니다.

### 7. File splitting은 재사용과 scan을 돕습니다

React docs는 nested components가 많아질수록 different files로 split하면 files가 scan하기 쉽고 reuse가 늘어난다고 설명합니다. component extraction은 미학적 정리가 아니라 변경 범위를 줄이는 실무 도구입니다. 한 파일에 모든 component가 있어도 작동할 수 있지만, 책임이 나뉘지 않으면 읽기 어렵습니다.

다만 너무 이른 분리는 오히려 탐색 비용을 늘릴 수 있습니다. 한 component가 너무 커져서 props boundary가 분명해지거나, 같은 UI 조각이 반복되거나, 독립적으로 테스트/수정해야 할 때 분리하는 것이 좋습니다.

### 8. Component definition은 top level에 둡니다

React docs는 component가 다른 component를 render할 수 있지만 definition을 nest하면 slow and causes bugs라고 설명하고, component definitions를 top level에 declare하라고 권고합니다. 관련 코드를 가까이 두고 싶어 child component를 parent function 안에 정의하는 습관은 React에서 문제가 될 수 있습니다.

AI가 이런 코드를 자주 만들 수 있습니다. 작은 helper component를 parent 안에 두면 보기에는 편하지만, render마다 새로운 component definition이 생기는 구조가 될 수 있습니다. top level에 정의하고 props로 data를 넘기는 편이 React의 component model과 맞습니다.

> [!WARNING]
> Component 안에 component를 정의하는 코드는 "가까워 보여서 편한 코드"일 수 있지만, React docs는 top level definition을 권고합니다.

## 스펙과 세부

### Component는 JSX를 return합니다

React component는 JSX markup을 return합니다. JSX 안에서 lowercase tag는 HTML tag로, capitalized tag는 component로 해석됩니다. 이 naming rule은 단순 스타일이 아니라 React가 component와 element를 구분하는 규칙입니다.

### Props는 any JavaScript value를 담을 수 있습니다

React props는 string이나 number만이 아닙니다. object, array, function도 전달될 수 있습니다. 이 유연성은 component composition을 강력하게 만들지만, props shape가 불명확하면 component contract가 흐려집니다. TypeScript props type을 함께 쓰면 이 shape를 명시할 수 있습니다.

### Purity는 render phase의 기준입니다

React가 component를 pure function으로 가정한다는 말은 같은 input에는 같은 JSX를 기대한다는 뜻입니다. render 중 외부 state를 변경하거나 unpredictable side effect를 만들면 component behavior가 추적하기 어려워집니다. state와 effects는 다음 강의에서 다루지만, component render의 순수성은 먼저 기억해야 합니다.

### Render/commit은 DOM 직접 조작과 다릅니다

component function은 DOM node를 직접 만들고 붙이는 imperative code가 아닙니다. React가 component를 call해 UI output을 계산하고, commit 단계에서 DOM update를 반영합니다. 그래서 React code에서는 DOM을 직접 찾아 바꾸기보다 data와 state를 통해 UI를 표현하는 방식을 우선합니다.

### Component는 한 번만 쓰여도 component일 수 있습니다

React docs는 sidebars, lists, complete pages에도 components를 쓰며, 일부 component는 한 번만 사용될 수 있다고 설명합니다. 따라서 "재사용하지 않으면 component로 분리하면 안 된다"는 오해입니다. 재사용뿐 아니라 책임 분리와 scan 가능성도 기준입니다.

## 원문으로 읽기

> "Components are one of the core concepts of React."
>
> — Components는 React의 핵심 concepts 중 하나다.
> [Your First Component — React](https://react.dev/learn/your-first-component)

이 문장은 component가 React의 주변 기능이 아니라 중심이라는 점을 분명히 합니다. state, effects, routing, framework integration을 배우기 전에 component boundary를 이해해야 후속 개념이 흔들리지 않습니다.

> "React lets you combine your markup, CSS, and JavaScript into custom “components”, reusable UI elements for your app."
>
> — React는 markup, CSS, JavaScript를 custom "components"로 결합하게 하며, 이는 app을 위한 reusable UI elements다.
> [Your First Component — React](https://react.dev/learn/your-first-component)

React component는 HTML만 묶는 것이 아닙니다. UI structure, style 연결, interaction logic이 같은 책임 안에서 만납니다. 이 문장은 component를 "시각 조각"보다 넓은 UI element boundary로 보게 만듭니다.

> "React components are regular JavaScript functions"
>
> — React components는 일반 JavaScript functions다.
> [Your First Component — React](https://react.dev/learn/your-first-component)

이 인용은 React를 마법처럼 보지 않게 해 줍니다. component는 function이므로 input과 output을 가집니다. props는 input이고 JSX는 output입니다. 이 mental model이 있으면 TypeScript props type과 pure function 원칙이 자연스럽게 이어집니다.

> "React components use props to communicate with each other."
>
> — React components는 서로 communicate하기 위해 props를 사용한다.
> [Passing Props to a Component — React](https://react.dev/learn/passing-props-to-a-component)

Props는 component 사이의 기본 communication channel입니다. child가 parent 내부를 몰라도 필요한 information을 받을 수 있게 해 줍니다. AI가 만든 component가 hidden global이나 외부 variable에 기대면 이 원칙을 기준으로 교정할 수 있습니다.

## 실전에서

### 1. Component boundary를 먼저 이름 붙입니다

UI를 보면 바로 code를 쓰기보다 역할별 boundary를 나눕니다. 예를 들어 lesson list 화면에는 `LessonList`, `LessonCard`, `ProgressBadge`, `BookmarkButton`이 있을 수 있습니다. 각 component가 어떤 props를 받는지 적으면 구현이 명확해집니다.

```tsx
type ProgressBadgeProps = {
  completed: boolean;
};

function ProgressBadge({ completed }: ProgressBadgeProps) {
  return <span>{completed ? "완료" : "진행 중"}</span>;
}
```

이 component는 progress label이라는 작은 책임을 가집니다. 재사용될 수도 있고 한 곳에서만 쓰일 수도 있습니다. 중요한 것은 responsibility와 input이 분명하다는 점입니다.

### 2. Props type을 component contract로 봅니다

```tsx
type LessonCardProps = {
  title: string;
  summary: string;
  completed: boolean;
};

export function LessonCard({ title, summary, completed }: LessonCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{summary}</p>
      <ProgressBadge completed={completed} />
    </article>
  );
}
```

이 코드에서 `LessonCardProps`는 component의 input contract입니다. AI에게 "LessonCard에 북마크 버튼을 추가해"라고 요청할 때도 props contract를 어떻게 바꿀지 함께 확인해야 합니다. data가 parent에서 내려오는지, component 내부 state가 필요한지, 단순 rendering인지 구분합니다.

### 3. Render 중 side effect를 만들지 않습니다

component render는 현재 input을 JSX로 계산하는 흐름입니다. render 중 external variable을 변경하거나 network request를 시작하는 식의 code는 purity 원칙을 깨뜨릴 수 있습니다. 그런 작업은 state/effects 강의에서 다루는 별도 mechanism으로 옮겨야 합니다.

```tsx
let renderCount = 0;

function BadCounterLabel() {
  renderCount += 1;
  return <span>{renderCount}</span>;
}
```

이 예시는 render 중 외부 variable을 변경하는 형태입니다. 같은 input에도 output이 달라질 수 있으므로 pure function 관점과 맞지 않습니다. AI가 이런 code를 만들면 "왜 render 중 변경이 필요한가"를 되물어야 합니다.

### 4. AI 요청에는 component 범위를 포함합니다

나쁜 요청은 "이 화면을 예쁘게 고쳐줘"입니다. 더 좋은 요청은 "LessonCard component의 props contract는 유지하고, article markup 안에서 title/summary spacing만 조정해줘"입니다. component boundary와 props contract를 함께 주면 AI는 수정 범위를 좁힐 수 있습니다.

> [!TIP]
> React UI 수정 요청은 component 이름, props shape, 바꾸지 말아야 할 boundary를 함께 적으면 결과 검토가 쉬워집니다.

## 한계와 트레이드오프

첫째, component를 많이 만든다고 자동으로 좋은 구조가 되지는 않습니다. 너무 작은 component가 너무 많으면 파일 이동과 props 전달이 오히려 복잡해질 수 있습니다. 책임이 분명하거나 반복되거나 독립적으로 수정해야 할 때 분리하는 것이 좋습니다.

둘째, props는 parent-child communication의 기본이지만 모든 상태 설계 문제를 해결하지 않습니다. 여러 component가 같은 변화에 반응해야 하거나 user interaction으로 화면이 바뀌는 경우에는 state가 필요합니다. 하지만 state를 배우기 전에도 props가 input contract라는 감각은 유지해야 합니다.

셋째, component purity는 external world와의 연결을 금지한다는 뜻이 아닙니다. network, browser API, third-party widget과 synchronize해야 하는 경우가 있습니다. 다만 그 작업은 render 자체에 섞기보다 Effect 같은 별도 mechanism에서 다루어야 합니다.

넷째, React component는 final HTML이 아닙니다. component tree와 DOM tree는 관련이 있지만 같은 것은 아닙니다. component는 UI description을 만들고, React가 render/commit 흐름으로 screen update를 처리합니다. DOM을 직접 조작하는 mental model을 그대로 가져오면 React code가 어색해집니다.

마지막으로, TypeScript props type이 있어도 runtime data가 자동으로 검증되는 것은 아닙니다. parent가 외부 API response를 받아 props로 넘긴다면, 그 response가 실제 contract와 맞는지는 별도 확인이 필요할 수 있습니다. ==Component contract는 UI 경계를 선명하게 하지만, data source의 진실성을 보장하지는 않습니다.==

## 더 읽기

먼저 React의 [Your First Component](https://react.dev/learn/your-first-component)를 읽습니다. component가 core concept이고, markup/CSS/JavaScript를 custom reusable UI element로 결합한다는 큰 그림을 잡습니다.

다음으로 [Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)를 읽어 component reusability와 file splitting 감각을 봅니다. 큰 file을 언제 나누면 scan과 reuse가 좋아지는지 확인합니다.

그다음 [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)를 읽습니다. props가 parent에서 child로 information을 전달하는 방식이며 any JavaScript value를 넘길 수 있다는 점을 확인합니다.

이후 [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)를 읽어 component를 pure function으로 보는 이유를 잡습니다. 같은 input에 같은 JSX를 return한다는 기준은 state/effects를 배우기 전에도 중요합니다.

마지막으로 [Render and Commit](https://react.dev/learn/render-and-commit)를 읽습니다. React가 component를 call해 screen에 표시할 내용을 계산하고 DOM update를 commit하는 흐름을 이해하면 직접 DOM 조작 mental model에서 벗어날 수 있습니다.

후속 학습은 `react-state-and-effects`입니다. component가 input을 받아 UI를 계산하는 경계를 이해한 뒤, component-specific memory인 state와 external system synchronization인 Effect를 배워야 합니다.
