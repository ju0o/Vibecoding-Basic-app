# 용어 초안: nextjs-routing-rendering

기존 glossary.ts 대조 필요 용어: Server Component, Client Component, RSC Payload, Hydration, Dynamic Route Segment (React 물결에서 미등재 확인 대상). 신규 5개.

## Server Component
category: 프론트엔드
shortDefinition: 서버에서 렌더링되어 결과만 클라이언트로 전달되는 React 컴포넌트 — App Router의 기본값
explanation: Next.js에서 레이아웃과 페이지는 기본적으로 Server Component입니다. 서버에서 데이터를 가져와 렌더링하고 결과를 캐시·스트리밍할 수 있으며, 그 코드는 클라이언트 번들에 포함되지 않아 번들 축소와 비밀(API 키) 보호에 유리합니다.
related: [Client Component, RSC Payload, Hydration]

## Client Component
category: 프론트엔드
shortDefinition: "use client" 지시어로 선언되어 브라우저에서 실행되는 React 컴포넌트
explanation: 상태, 이벤트 핸들러, 생명주기 로직, 브라우저 API가 필요할 때 사용합니다. 지시어가 붙은 파일이 import하는 모든 것이 클라이언트 번들에 포함되므로, 경계를 상호작용이 필요한 최소 단위로 좁게 긋는 것이 성능의 핵심입니다.
related: [Server Component, Hydration, React Component]

## RSC Payload
category: 프론트엔드
shortDefinition: 렌더링된 서버 컴포넌트 트리의 압축된 이진 표현 — 서버와 클라이언트를 잇는 전달 형식
explanation: 서버 컴포넌트의 렌더링 결과, 클라이언트 컴포넌트의 자리 표시와 JS 참조, 서버에서 넘기는 props가 담깁니다. 첫 로드에서는 트리 조정에, 이후 내비게이션에서는 prefetch되어 즉시 전환에 쓰입니다.
related: [Server Component, Client Component, Hydration]

## Hydration
category: 프론트엔드
shortDefinition: 정적 HTML에 이벤트 핸들러를 붙여 상호작용을 살리는 React의 절차
explanation: 서버가 만든 HTML은 보이기만 하고 반응하지 못합니다. 하이드레이션이 그 HTML의 DOM에 핸들러를 연결해 클릭·입력이 동작하게 만듭니다. "서버 렌더링인데 왜 JS가 필요한가"의 답이며, 첫 화면은 빠르되 상호작용이 약간 늦는 SSR 체감의 원인입니다.
related: [Server Component, Client Component, DOM]

## Dynamic Route Segment
category: 프론트엔드
shortDefinition: 폴더명을 대괄호로 감싸([slug]) 하나의 파일로 여러 페이지를 만드는 라우팅 관례
explanation: 데이터 개수만큼 페이지가 생성되며, 컴포넌트는 params로 현재 세그먼트 값을 받아 해당 데이터를 렌더링합니다. 이 사이트의 강의 페이지 51개가 app/lessons/[slug] 파일 하나에서 나옵니다.
related: [Server Component, Client Component]
