## 한 줄 정의

TypeScript, React, Next.js는 복잡한 프론트엔드 화면을 각각 "데이터 모양 검증", "재사용 가능한 UI 구성", "라우팅과 렌더링 운영"이라는 책임으로 나누어 다루기 위해 함께 쓰입니다. TypeScript는 JavaScript가 실행되기 전에 value의 shape와 가능한 동작을 예측하게 돕고, React는 markup, CSS, JavaScript를 component라는 UI 단위로 묶으며, Next.js는 파일과 폴더를 route로 연결하고 서버와 클라이언트 렌더링 경계를 제공합니다.

초보자는 이 셋을 한꺼번에 만나면 "왜 이렇게 도구가 많은가"라고 느낄 수 있습니다. 하지만 세 도구가 해결하는 문제는 다릅니다. TypeScript는 "이 데이터가 어떤 모양인가", React는 "이 화면 조각을 어떻게 나누고 재사용할 것인가", Next.js는 "이 화면이 어떤 URL에서 어떻게 렌더링될 것인가"를 묻습니다. ==셋을 함께 쓰는 이유는 유행이 아니라 프론트엔드 복잡도를 서로 다른 책임으로 분리하기 위해서==입니다.

이 강의는 프론트엔드 프레임워크 모듈의 입구입니다. 뒤의 강의에서 TypeScript type system, React component mental model, React state/effects, Next.js routing/rendering을 따로 깊게 다룹니다. 여기서는 세 기술이 한 화면 안에서 어떻게 이어지고, AI가 생성한 프론트엔드 코드를 어떤 질문으로 검토해야 하는지 큰 그림을 잡습니다.

![TypeScript React Next.js 책임 분리](/lesson-diagrams/typescript-react-nextjs/ts-react-next-responsibility-map.svg)

## 왜 존재하는가

웹이 문서 중심이던 시절에는 HTML 파일과 약간의 CSS, 짧은 script만으로도 많은 일을 할 수 있었습니다. 그러나 현대 프론트엔드는 로그인 상태, 서버 데이터, 조건부 화면, 검색 파라미터, 권한, loading state, error state, animation, 접근성, SEO, 배포 모델까지 동시에 다룹니다. 화면 하나가 단순한 문서가 아니라 작은 애플리케이션이 된 것입니다.

JavaScript만으로도 이런 앱을 만들 수는 있습니다. 하지만 규모가 커질수록 함수가 어떤 객체를 받는지, API 응답이 어떤 field를 갖는지, component가 어떤 props를 요구하는지, URL별 화면이 어디에서 정의되는지 추적하기 어려워집니다. TypeScript는 이 문제를 실행 전 type checking으로 줄이고, React는 UI를 component 단위로 나눠 재사용성과 책임 경계를 만들며, Next.js는 route와 rendering model을 프로젝트 구조로 드러냅니다.

AI 코딩에서도 이 세 기술은 중요합니다. AI가 만든 코드는 빠르게 그럴듯해 보일 수 있지만, 데이터 shape가 틀리거나, component가 너무 많은 책임을 갖거나, server/client boundary가 맞지 않으면 유지보수가 어려워집니다. 따라서 AI에게 프론트엔드 코드를 맡길수록 type, component, route, rendering 경계를 읽을 수 있어야 합니다.

> [!KEY]
> TypeScript는 데이터의 약속을 잡고, React는 화면 조각의 약속을 잡고, Next.js는 URL과 렌더링의 약속을 잡습니다. 세 약속이 맞물릴 때 큰 프론트엔드가 버틸 수 있습니다.

## 작동 원리

### 1. TypeScript는 실행 전 예측을 추가한다

JavaScript는 runtime에 값이 실제로 들어와야 많은 오류가 드러납니다. TypeScript는 그 전에 변수, 함수 인자, object property, union, generic 같은 type 정보를 바탕으로 "이 코드가 기대한 모양으로 쓰였는가"를 검사합니다. 예를 들어 강의 카드가 `title`, `summary`, `slug`를 반드시 갖는다면, 이 shape를 type으로 적어 component가 잘못된 데이터를 받는 일을 줄일 수 있습니다.

TypeScript의 핵심은 모든 곳에 type annotation을 많이 쓰는 것이 아닙니다. 공식 문서도 가능한 곳에서는 TypeScript가 자동으로 type을 infer한다고 설명합니다. 좋은 코드는 명시가 필요한 경계에는 type을 두고, 지역 변수처럼 추론이 충분한 곳에서는 과한 annotation을 피합니다. ==TypeScript는 코드를 장황하게 만드는 도구가 아니라 데이터 계약을 코드 가까이에 두는 도구==입니다.

### 2. React는 UI를 component 함수로 나눈다

React component는 UI의 재사용 가능한 단위입니다. React는 markup, CSS, JavaScript를 custom component로 묶을 수 있게 합니다. 중요한 점은 component가 "HTML 조각"만이 아니라 JavaScript function boundary라는 사실입니다. props를 입력으로 받고, JSX를 반환하며, 필요한 경우 state와 event handler를 가집니다.

component로 나누면 큰 화면을 작은 책임으로 분리할 수 있습니다. 예를 들어 학습 사이트의 lesson card, progress badge, bookmark button, sidebar navigation은 각각 component가 될 수 있습니다. 이렇게 나누면 AI에게 "bookmark button의 저장 로직만 확인해줘"처럼 좁은 작업을 맡기기 쉽습니다. component가 너무 많은 일을 하면 AI도 사람도 변경 범위를 좁히기 어렵습니다.

### 3. React state는 화면 기억이고 effect는 외부 동기화다

React에서 state는 component-specific memory입니다. 사용자가 토글을 누르면 열림/닫힘이 바뀌고, 검색어를 입력하면 query state가 바뀝니다. 하지만 state는 일반 변수와 다릅니다. render 사이에 유지되고, 업데이트가 즉시 변수 값을 바꾸는 것처럼 보이지 않을 수 있으며, event handler가 끝난 뒤 처리되는 batching과 snapshot 개념이 있습니다.

Effect는 또 다른 경계입니다. Effect는 rendering 자체로 인해 생기는 side effect를 외부 시스템과 동기화할 때 씁니다. localStorage, network, browser API, third-party widget처럼 React 바깥과 연결될 때 필요합니다. 반대로 외부 시스템이 없으면 Effect가 필요하지 않은 경우가 많습니다. AI가 `useEffect`를 습관처럼 넣는 코드를 만들면 "정말 외부 시스템과 동기화하는가"를 질문해야 합니다.

### 4. Next.js는 route와 rendering 경계를 프로젝트 구조로 만든다

Next.js App Router는 파일 시스템 기반 routing을 제공합니다. 폴더와 파일이 URL 구조를 정의하고, page는 특정 route에서 렌더링되는 UI가 됩니다. layout은 여러 page 사이에서 공유되는 UI입니다. 따라서 Next.js 프로젝트를 읽을 때는 먼저 `app` 폴더의 route tree를 봅니다. URL 구조가 코드 구조와 연결되어 있기 때문입니다.

Next.js의 또 다른 핵심은 server/client rendering 경계입니다. App Router에서는 layouts와 pages가 기본적으로 Server Components입니다. interactive state나 browser-only API가 필요하면 client boundary가 필요합니다. 이 경계를 모르면 AI가 모든 component에 client directive를 붙이거나, 반대로 browser API를 server component에서 쓰는 실수를 할 수 있습니다.

### 5. 세 도구는 한 데이터 흐름 안에서 만난다

강의 상세 페이지를 예로 들어 봅시다. Next.js는 `/lessons/[slug]` route로 어떤 page가 렌더링될지 결정합니다. 서버 쪽에서 markdown content를 읽어 lesson data를 만듭니다. TypeScript는 그 data가 `LessonMeta`와 section 구조를 만족하는지 검사합니다. React는 그 data를 `LessonHeader`, `LessonMarkdown`, `LessonNavigation` 같은 component로 나눠 표시합니다. 사용자가 bookmark를 누르면 client component가 localStorage나 state를 업데이트합니다.

이 흐름에서 하나가 틀리면 다른 층도 흔들립니다. slug가 잘못되면 route가 실패하고, data shape가 틀리면 component가 깨지고, component boundary가 흐리면 상태 관리가 복잡해지고, rendering boundary가 틀리면 build 오류가 납니다. 그러므로 세 기술은 따로 외우는 목록이 아니라 하나의 화면 제작 흐름으로 이해해야 합니다.

```ts
type LessonCardProps = {
  readonly slug: string
  readonly title: string
  readonly summary: string
  readonly completed: boolean
}

function LessonCard({ slug, title, summary, completed }: LessonCardProps) {
  return (
    <article>
      <a href={`/lessons/${slug}`}>
        <h2>{title}</h2>
        <p>{summary}</p>
        <span>{completed ? "완료" : "학습 전"}</span>
      </a>
    </article>
  )
}
```

이 예시는 세 층을 함께 보여줍니다. TypeScript는 props의 shape를 잡습니다. React는 lesson card라는 UI 단위를 function으로 표현합니다. Next.js에서는 이 link가 route 구조와 연결됩니다. 실제 프로젝트에서는 `Link` component, server data loading, client state boundary가 더해지지만, 기본 질문은 같습니다. 데이터는 어떤 모양이고, UI는 어떤 단위이며, URL은 어디로 이어지는가입니다.

## 스펙과 세부

### TypeScript는 runtime을 대체하지 않는다

TypeScript는 실행 전에 많은 문제를 잡지만, runtime 검증을 완전히 대체하지 않습니다. API에서 예상과 다른 JSON이 오거나, 사용자가 form에 이상한 값을 넣거나, 환경 변수가 비어 있으면 runtime 처리도 필요합니다. TypeScript type은 내부 코드의 계약을 강하게 만들지만, 외부 입력은 별도로 검증해야 합니다.

### React component는 순수성을 기대한다

React는 component를 pure function처럼 작성한다고 가정합니다. 같은 props와 state가 들어오면 같은 UI를 반환해야 예측 가능성이 높아집니다. render 중에 외부 값을 바꾸거나 network 요청을 직접 실행하면 예측이 어려워집니다. 그래서 event handler, state update, effect, server action 같은 경계를 구분해야 합니다.

### props와 state를 섞지 않는다

props는 parent에서 child로 전달되는 입력이고, state는 component가 기억하는 값입니다. AI가 코드를 만들 때 props로 충분한 값을 state에 복사하거나, state로 관리해야 할 사용자 입력을 매번 props로만 처리하려 할 수 있습니다. "이 값은 부모가 소유하는가, 이 component가 소유하는가"를 묻는 습관이 필요합니다.

### Next.js page와 layout은 역할이 다르다

page는 특정 route에서 렌더링되는 UI이고, layout은 여러 page가 공유하는 UI입니다. navigation, sidebar, provider, 전체 wrapper는 layout 후보가 될 수 있고, 개별 강의 본문은 page나 page 안의 component가 됩니다. layout에 route별로 달라지는 무거운 로직을 넣으면 공유 UI가 불필요하게 복잡해질 수 있습니다.

### server/client boundary는 비용과 권한의 문제다

client component는 browser event, state, localStorage 같은 기능을 쓸 수 있지만 bundle로 내려가야 하므로 비용이 생깁니다. server component는 서버에서 data fetching과 rendering을 수행할 수 있지만 browser API를 직접 쓸 수 없습니다. 어느 쪽이 좋은지는 "무엇을 해야 하는가"에 따라 달라집니다. AI에게 코드를 맡길 때 이 경계를 명시하면 불필요한 client 전환을 줄일 수 있습니다.

## 원문으로 읽기

> "Static type systems describe the shapes and behaviors of what our values will be when we run our programs."
>
> — 정적 타입 시스템은 프로그램 실행 시 값이 가질 모양과 동작을 설명한다.
> [The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

TypeScript를 배우는 이유는 type 이름을 많이 외우기 위해서가 아닙니다. 값의 모양과 가능한 동작을 실행 전에 설명하기 위해서입니다. AI가 만든 코드에서 type이 흐리면 "이 field가 항상 있는가", "이 값이 string인지 number인지" 같은 질문이 뒤늦게 runtime 오류로 나타납니다.

> "React components are regular JavaScript functions"
>
> — React component는 일반 JavaScript function이다.
> [Your First Component](https://react.dev/learn/your-first-component)

이 문장은 React를 신비한 템플릿 문법이 아니라 함수 경계로 보게 합니다. component는 입력을 받고 UI를 반환합니다. 그래서 component 분리는 단순 파일 쪼개기가 아니라 책임과 입력을 설계하는 일입니다. AI가 만든 component를 리뷰할 때도 "이 함수의 입력과 책임이 선명한가"를 봐야 합니다.

> "In React, this kind of component-specific memory is called state."
>
> — React에서 component에 특화된 기억을 state라고 부른다.
> [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)

state는 화면이 사용자의 행동을 기억하는 방식입니다. 하지만 모든 값을 state로 만들 필요는 없습니다. props에서 계산할 수 있는 값, 렌더 중 계산 가능한 값, 외부 시스템과 동기화해야 하는 값이 각각 다릅니다. 이 구분이 흐려지면 React 코드는 빠르게 복잡해집니다.

> "Next.js uses file-system based routing, meaning you can use folders and files to define routes."
>
> — Next.js는 폴더와 파일로 route를 정의하는 파일 시스템 기반 routing을 쓴다.
> [Layouts and Pages — Next.js Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages)

Next.js를 읽을 때 폴더 구조가 중요한 이유가 여기에 있습니다. URL은 별도 설정 파일에만 숨어 있지 않고, app 폴더의 구조로 드러납니다. AI가 page를 새로 만들 때는 route 위치, layout 공유 범위, server/client boundary를 함께 확인해야 합니다.

## 실전에서

### 패턴 1: 데이터 shape부터 고정한다

AI에게 component를 만들게 하기 전에 props type이나 domain type을 먼저 정합니다. 예를 들어 lesson card가 `slug`, `title`, `summary`, `completed`를 받는다고 고정하면 AI가 임의의 field 이름을 만들 가능성이 줄어듭니다. API 응답을 다룰 때도 response shape를 먼저 적고, 그 shape가 UI component까지 어떻게 흘러가는지 확인합니다.

### 패턴 2: component를 사용자 행동 단위로 나눈다

component를 너무 작게 나누면 파일만 늘어나고, 너무 크게 두면 변경 범위가 흐려집니다. 좋은 기준은 사용자 행동과 책임입니다. "bookmark button", "lesson navigation", "search box"처럼 독립적으로 설명할 수 있는 UI는 component 후보입니다. AI에게 수정 요청을 할 때도 이 단위를 사용하면 부작용이 줄어듭니다.

### 패턴 3: client component는 이유를 적게 한다

`use client`가 필요한 이유가 event handler, state, browser API인지 확인합니다. 단순한 markdown 렌더링이나 서버 데이터 표시만 한다면 server component로 충분할 수 있습니다. client boundary를 최소화하면 bundle 비용과 hydration 부담이 줄어듭니다. 다만 사용자 입력과 즉시 상호작용이 필요한 UI는 client component가 자연스럽습니다.

> [!WARNING]
> AI가 제안한 React 코드에 `useEffect`와 `useState`가 많다고 해서 더 고급인 것은 아닙니다. 외부 시스템 동기화가 없는 effect, props에서 계산할 수 있는 state는 복잡도 신호일 수 있습니다.

## 한계와 트레이드오프

TypeScript는 많은 오류를 줄이지만 학습 초반에는 문법 부담을 늘릴 수 있습니다. 특히 generic, union narrowing, utility type을 너무 빨리 만나면 본래 해결하려던 데이터 shape 문제가 흐려질 수 있습니다. 그래서 입문 단계에서는 type을 "코드를 더 어렵게 만드는 장식"이 아니라 "데이터 약속을 드러내는 문장"으로 읽어야 합니다.

React는 component model로 복잡한 UI를 나누지만, state와 effect를 잘못 쓰면 오히려 흐름이 더 어려워집니다. 작은 앱에서는 plain HTML과 JavaScript가 더 단순할 수 있습니다. React를 쓰는 이유는 모든 페이지에 필요해서가 아니라, 상태와 재사용 가능한 UI가 많아질 때 구조화 이점이 커지기 때문입니다.

Next.js는 routing, rendering, build, deployment를 강하게 통합하지만, 그만큼 framework 규칙을 따라야 합니다. server/client boundary, caching, dynamic rendering, file conventions를 모르면 "왜 build는 되는데 브라우저에서 다르게 보이는가" 같은 문제가 생깁니다. AI가 Next.js 코드를 생성할 때도 최신 문서와 프로젝트 구조를 대조해야 합니다.

## 더 읽기

- [TypeScript Handbook — The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html): 정적 타입 시스템이 value shape와 behavior를 어떻게 설명하는지 읽습니다.
- [React — Your First Component](https://react.dev/learn/your-first-component): component가 reusable UI element이자 JavaScript function이라는 관점을 잡습니다.
- [React — State: A Component's Memory](https://react.dev/learn/state-a-components-memory): state가 local variable과 어떻게 다른지 확인합니다.
- [React — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect): effect 남용을 줄이는 기준을 봅니다.
- [Next.js — Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages): file-system routing과 page/layout 역할을 확인합니다.
- [Next.js — Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components): server/client rendering 경계를 읽습니다.

다음에는 TypeScript 타입 시스템을 먼저 읽고, React component 사고방식, React state와 effect, Next.js routing/rendering으로 이어가면 좋습니다. 이 순서가 데이터 약속에서 UI 단위, 상태, route 운영으로 자연스럽게 이어집니다.
