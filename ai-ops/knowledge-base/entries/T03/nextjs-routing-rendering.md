---
id: nextjs-routing-rendering
title: "Next.js 라우팅과 렌더링 모델 (App Router)"
topicGroup: T03
status: approved
score: 89
level: 중급
prerequisites: [react-component-model, http-request-response]
successors: []
related: [react-state-effects, browser-rendering-network]
consumers:
  lessons: [nextjs-routing-rendering]
  glossary: ["Server Component", "Client Component", "RSC Payload", "Hydration", "Dynamic Route Segment"]
sources:
  - { title: "Layouts and Pages — Next.js Docs (v16.2.10)", url: "https://nextjs.org/docs/app/getting-started/layouts-and-pages", checked: 2026-07-06 }
  - { title: "Server and Client Components — Next.js Docs (v16.2.10)", url: "https://nextjs.org/docs/app/getting-started/server-and-client-components", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
Next.js의 라우팅·렌더링 모델은 파일 시스템으로 경로를 정의하고, 서버 컴포넌트를 기본값으로 서버와 클라이언트에 렌더링을 나누어 배치하는 구조다. 공식 문서는 "Next.js uses file-system based routing, meaning you can use folders and files to define routes"라고 정의한다. (출처: https://nextjs.org/docs/app/getting-started/layouts-and-pages, 확인: 2026-07-06)
페이지·레이아웃이라는 파일 관례와 Server/Client Components라는 렌더링 경계가 이 모델의 두 축이다. (출처: https://nextjs.org/docs/app/getting-started/server-and-client-components, 확인: 2026-07-06)

## 역사
본 KB의 기준 버전은 Next.js 16 (문서 버전 16.2.10, 문서 최종 갱신 2026-06-23)이다. (출처: https://nextjs.org/docs/app/getting-started/layouts-and-pages, 확인: 2026-07-06)
현행 문서는 App Router(`app` 디렉터리)를 시작 지점으로 안내하며, layouts와 pages가 기본적으로 React Server Components라는 전제를 채택하고 있다 — 클라이언트 번들 전송을 줄이는 방향으로 프레임워크 기본값이 이동해 온 결과가 현행 문서에 반영되어 있다. (출처: https://nextjs.org/docs/app/getting-started/server-and-client-components, 확인: 2026-07-06)

## 해결하려는 문제
- 라우트 설정 파일 없이 폴더/파일 구조만으로 URL 구조를 정의한다: "Folders are used to define the route segments that map to URL segments." (출처: https://nextjs.org/docs/app/getting-started/layouts-and-pages, 확인: 2026-07-06)
- 페이지 간 공유 UI의 재렌더링 낭비를 줄인다: layout은 "On navigation, layouts preserve state, remain interactive, and do not rerender." (같은 출처)
- 클라이언트로 보내는 JavaScript 양을 줄이면서도 상호작용을 유지한다: Server Components 사용 이유로 "Reduce the amount of JavaScript sent to the browser"가 명시된다. (출처: https://nextjs.org/docs/app/getting-started/server-and-client-components, 확인: 2026-07-06)

## 핵심 개념
1. **page**: "A page is UI that is rendered on a specific route." — `app` 디렉터리에 `page` 파일을 만들고 React 컴포넌트를 default export 한다. (출처: layouts-and-pages, 확인: 2026-07-06)
2. **layout**: "A layout is UI that is shared between multiple pages." 루트 레이아웃은 필수이며 `html`·`body` 태그를 포함해야 한다. 폴더 계층대로 중첩된다. (같은 출처)
3. **동적 세그먼트**: 폴더명을 대괄호로 감싸면(`[slug]`) 데이터 기반으로 여러 페이지를 생성하는 dynamic route segment가 된다. (같은 출처)
4. **Server Components 기본값**: "By default, layouts and pages are Server Components, which lets you fetch data and render parts of your UI on the server, optionally cache the result, and stream it to the client." (출처: server-and-client-components, 확인: 2026-07-06)
5. **'use client' 경계**: 파일 상단의 `"use client"` 지시어가 Server/Client 모듈 그래프의 경계를 선언하며, 그 파일이 import하는 모든 것이 클라이언트 번들에 포함된다. (같은 출처)
6. **RSC Payload와 하이드레이션**: 서버 컴포넌트는 RSC Payload로 렌더링되고, 클라이언트에서 HTML → RSC Payload 조정 → JS 하이드레이션 순으로 상호작용이 붙는다. "Hydration is React's process for attaching event handlers to the DOM, to make the static HTML interactive." (같은 출처)
7. **동적 렌더링 트리거**: "Using searchParams opts your page into dynamic rendering because it requires an incoming request to read the search parameters from." (출처: layouts-and-pages, 확인: 2026-07-06)

## 관련 기술
- React Component Model vs Next.js 라우팅: React는 컴포넌트 단위 UI를 정의하고, Next.js는 그 컴포넌트를 어떤 URL·어떤 환경(서버/클라이언트)에서 렌더링할지 배치한다. (출처: server-and-client-components, 확인: 2026-07-06)
- `<Link>` vs `<a>`: `<Link>`는 HTML `<a>`를 확장해 prefetching과 client-side navigation을 제공한다. (출처: layouts-and-pages, 확인: 2026-07-06)
- 환경 오염 방지: `NEXT_PUBLIC_` 접두사 없는 환경변수는 클라이언트 번들에서 빈 문자열로 대체되며, `server-only` 패키지로 서버 전용 모듈의 클라이언트 import를 빌드 오류로 만들 수 있다. (출처: server-and-client-components, 확인: 2026-07-06)

## 선행 개념
- react-component-model: page/layout이 전부 React 컴포넌트이므로 컴포넌트·props 사고가 전제다.
- http-request-response: 동적 렌더링이 "incoming request"를 전제하므로 요청/응답 모델 이해가 필요하다.

## 후행 개념
- 데이터 페칭·캐싱 전략 (Server Components에서의 fetch와 캐시 — 별도 KB 후보)
- 배포 (빌드 시 정적 생성과 런타임 렌더링의 구분이 배포 모델과 직결)

## AI 시대에서의 의미
AI에게 Next.js 작업을 시킬 때 가장 자주 깨지는 지점이 Server/Client 경계다. `useState`를 서버 컴포넌트에 넣거나, 서버 전용 비밀 키를 클라이언트 파일에 import하는 실수는 문서의 경계 규칙("use client" 이후 모든 import가 클라이언트 번들 포함)을 모르면 검토할 수 없다. 파일 위치(=라우트)와 지시어(=환경)를 함께 검토하는 것이 AI 산출물 리뷰의 핵심 체크포인트가 된다. (근거: server-and-client-components의 경계·환경 오염 방지 절, 확인: 2026-07-06)

## 실무 활용
1. 상호작용 최소 단위에만 `"use client"`를 붙여 번들을 줄인다 — 문서 예시: 정적 레이아웃은 서버에 두고 검색바만 Client Component로 분리. (출처: server-and-client-components, 확인: 2026-07-06)
2. 서버에서 가져온 데이터를 props로 Client Component에 전달한다 (props는 직렬화 가능해야 함). (같은 출처)
3. Client Component의 children 슬롯으로 Server Component를 끼워 넣는 인터리빙 패턴 — 모달(클라이언트) 안에 서버 렌더링된 장바구니. (같은 출처)
4. 이 학습 사이트 자체가 예시다: `app/lessons/[slug]`의 동적 세그먼트로 강의 페이지가 생성된다.

## FAQ
Q: 모든 컴포넌트에 "use client"를 붙이면 안 되는가?
A: 동작은 하지만 클라이언트 번들이 커진다. 문서는 큰 UI를 통째로 클라이언트로 만들지 말고 상호작용 컴포넌트에만 지시어를 붙이라고 권한다. (출처: server-and-client-components, 확인: 2026-07-06)
Q: layout과 page의 차이는?
A: page는 특정 라우트에 렌더링되는 UI, layout은 여러 페이지가 공유하며 내비게이션 시 재렌더링되지 않는 UI다. (출처: layouts-and-pages, 확인: 2026-07-06)
Q: Server Component에서 React context를 쓸 수 있는가?
A: 불가하다 — 문서는 context가 Server Components에서 지원되지 않으므로 children을 받는 Client Component provider를 만들어 감싸라고 안내한다. (출처: server-and-client-components, 확인: 2026-07-06)
Q: 동적 라우트는 어떻게 만드는가?
A: 폴더명을 `[segmentName]`처럼 대괄호로 감싼다. params는 Promise로 전달되어 await로 읽는다. (출처: layouts-and-pages, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 서버 컴포넌트에 useState/onClick을 넣는다. 왜 생기나: 모든 컴포넌트가 클라이언트에서 돈다고 가정. 교정: 상호작용이 필요한 조각만 "use client" 파일로 분리한다. (출처: server-and-client-components, 확인: 2026-07-06)
2. 실수: "use client" 파일 하나에 큰 트리를 전부 import한다. 왜 생기나: 지시어가 경계 선언임을 모름. 교정: 경계 이후 모든 import가 번들에 포함됨을 기억하고 경계를 좁게 잡는다. (같은 출처)
3. 실수: API 키가 든 모듈을 클라이언트 컴포넌트에서 import한다. 왜 생기나: 모듈이 양쪽에서 공유 가능함을 간과. 교정: server-only 패키지로 빌드 오류화한다. (같은 출처)
4. 실수: 루트 레이아웃에 html/body를 빼먹는다. 왜 생기나: layout을 일반 컴포넌트로 취급. 교정: 루트 레이아웃은 필수이며 html·body 태그를 포함해야 한다. (출처: layouts-and-pages, 확인: 2026-07-06)

## 공식 출처
- 파일 시스템 라우팅, page/layout 정의, 동적 세그먼트, searchParams 동적 렌더링 — [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages) (확인: 2026-07-06, 문서 v16.2.10)
- Server Components 기본값, "use client" 경계, RSC Payload, 하이드레이션, 환경 오염 방지 — [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) (확인: 2026-07-06, 문서 v16.2.10)

## Quote Bank
- > "Next.js uses file-system based routing, meaning you can use folders and files to define routes."
  - 출처: [Layouts and Pages — Next.js Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages) (확인: 2026-07-06)
  - 맥락: 라우팅 모델의 한 줄 정의
- > "A page is UI that is rendered on a specific route."
  - 출처: [Layouts and Pages — Next.js Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages) (확인: 2026-07-06)
  - 맥락: page 파일 관례의 공식 정의
- > "A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender."
  - 출처: [Layouts and Pages — Next.js Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages) (확인: 2026-07-06)
  - 맥락: layout의 정의와 재렌더링 면제 — 공유 UI 설계 근거
- > "By default, layouts and pages are Server Components, which lets you fetch data and render parts of your UI on the server, optionally cache the result, and stream it to the client."
  - 출처: [Server and Client Components — Next.js Docs](https://nextjs.org/docs/app/getting-started/server-and-client-components) (확인: 2026-07-06)
  - 맥락: 렌더링 모델의 기본값 선언
- > "The RSC Payload is a compact binary representation of the rendered React Server Components tree."
  - 출처: [Server and Client Components — Next.js Docs](https://nextjs.org/docs/app/getting-started/server-and-client-components) (확인: 2026-07-06)
  - 맥락: 서버 렌더링 결과가 클라이언트로 전달되는 형식
- > "Hydration is React's process for attaching event handlers to the DOM, to make the static HTML interactive."
  - 출처: [Server and Client Components — Next.js Docs](https://nextjs.org/docs/app/getting-started/server-and-client-components) (확인: 2026-07-06)
  - 맥락: 정적 HTML이 상호작용을 얻는 단계의 공식 정의
- > "Using searchParams opts your page into dynamic rendering because it requires an incoming request to read the search parameters from."
  - 출처: [Layouts and Pages — Next.js Docs](https://nextjs.org/docs/app/getting-started/layouts-and-pages) (확인: 2026-07-06)
  - 맥락: 정적/동적 렌더링을 가르는 조건의 실례

## 변경 이력
- 2026-07-06: 최초 작성 (Fable — Codex 토큰 소진으로 운영자 승인 하 대행, P-01)
