## 한 줄 정의

미니 SaaS 아키텍처는 로그인한 사용자가 자기 계정의 기능과 데이터에 접근하고, 서버가 안전하게 데이터를 읽고, 환경 설정과 비밀값을 코드 밖에서 관리하며, 데이터베이스가 필요한 행을 빠르게 찾도록 구성한 작은 제품 구조입니다. 이 강의에서 말하는 SaaS는 거대한 기업 시스템이 아니라, 초보자가 한 번에 이해할 수 있는 최소 단위의 구독형 웹 앱입니다. ==미니 SaaS의 핵심은 화면을 많이 만드는 것이 아니라 신뢰 경계, 데이터 경계, 권한 경계를 작게라도 올바르게 세우는 것==입니다.

SaaS를 처음 만들면 보통 로그인 화면, 대시보드, 결제 버튼, 설정 페이지 같은 UI부터 떠올립니다. 하지만 교재형 프로젝트에서 먼저 이해해야 할 것은 "누가 누구인지 확인하는가", "확인된 사용자가 어떤 route와 data에 접근할 수 있는가", "데이터 query와 credential은 어디에 있어야 하는가", "secret은 코드에 들어가도 되는가", "데이터가 늘어날 때 dashboard query는 어떻게 빨라지는가"입니다. 이 질문들이 합쳐져 architecture가 됩니다.

이 강의는 Next.js Authentication, Fetching Data, Data Security, Vercel Environment Variables, PostgreSQL Indexes를 근거로 미니 SaaS의 뼈대를 설명합니다. 전체 코드를 완성하는 실습이 아니라, 나중에 어떤 SaaS를 만들더라도 구조를 설명할 수 있게 만드는 교재입니다. AI에게 프로젝트를 맡기더라도 이 구조를 이해해야 prompt가 추측이 아니라 설계가 됩니다.

![미니 SaaS 아키텍처: browser, server, authorization, database, environment boundary가 연결되는 구조](/lesson-diagrams/mini-saas-architecture/mini-saas-boundaries.svg)

## 왜 존재하는가

웹 앱이 단순한 정적 페이지일 때는 모든 방문자가 같은 콘텐츠를 봅니다. 그러나 SaaS는 다릅니다. 사용자는 로그인하고, 자신의 workspace나 account에 속한 데이터를 보고, plan이나 role에 따라 접근 가능한 기능이 달라집니다. 이때 "화면이 보인다"와 "권한이 맞다"는 같은 말이 아닙니다. UI가 아무리 좋아도 다른 사용자의 데이터를 볼 수 있으면 SaaS가 아닙니다.

미니 SaaS 아키텍처가 필요한 첫 번째 이유는 identity입니다. 사용자가 누구인지 확인하지 않으면 개인화된 데이터도, 계정 설정도, 안전한 dashboard도 만들 수 없습니다. 두 번째 이유는 authorization입니다. 로그인했다는 사실만으로 모든 route와 data에 접근할 수 있으면 제품 경계가 무너집니다. 세 번째 이유는 server-side data boundary입니다. Credential과 query logic을 클라이언트에 보내면 데이터 접근 경계가 흐려집니다.

네 번째 이유는 운영 설정입니다. 환경 변수는 코드 밖에서 설정되어야 합니다. Secret을 source code에 넣으면 배포 환경, preview 환경, local 환경을 분리하기 어렵고 노출 위험도 생깁니다. 다섯 번째 이유는 성능입니다. 사용자가 늘어나면 dashboard는 특정 account, 특정 날짜, 특정 상태의 행을 빠르게 찾아야 합니다. PostgreSQL index는 database server가 필요한 row를 더 빠르게 찾도록 도와줍니다.

AI 시대에는 이 배경이 더 중요합니다. AI에게 "미니 SaaS 만들어줘"라고 하면 많은 파일을 생성할 수 있습니다. 그러나 authentication과 authorization의 차이, server와 client의 data boundary, environment variable의 역할, index가 필요한 query pattern을 설명하지 않으면 AI는 일반적인 형태를 만들어도 제품의 실제 경계를 놓칠 수 있습니다. ==SaaS 설계는 AI가 코드를 쓰기 전에 사람이 접근 규칙과 데이터 흐름을 말로 고정하는 단계==입니다.

## 작동 원리

### 1. 사용자를 확인하는 authentication이 먼저 온다

미니 SaaS는 사용자 식별에서 시작합니다. Authentication은 사용자가 자신이 말하는 그 사람인지 확인하는 단계입니다. 로그인 form, session, token, provider 같은 구현 방식은 다양할 수 있지만, 교재 관점에서 중요한 것은 "현재 요청이 어떤 사용자에게 속하는가"를 서버가 알 수 있어야 한다는 점입니다.

이때 인증 결과는 단순한 UI 상태가 아닙니다. Client에서 "로그인됨"이라고 표시하는 것만으로는 충분하지 않습니다. 서버에서 data를 읽고 route를 보호할 때도 같은 identity가 필요합니다. 그래서 미니 SaaS의 첫 trust boundary는 browser와 server 사이에 생깁니다. Browser는 사용자의 상호작용을 보내고, server는 session이나 token을 기준으로 사용자를 확인합니다.

### 2. authorization은 route와 data 접근을 결정한다

Authentication이 "누구인가"를 묻는다면 authorization은 "무엇에 접근할 수 있는가"를 묻습니다. 이 둘을 섞으면 SaaS가 위험해집니다. 로그인한 사용자가 누구인지 확인했더라도, 그 사용자가 admin route에 접근해도 되는지, 다른 organization의 invoice를 볼 수 있는지, 특정 plan 기능을 사용할 수 있는지는 별도 판단입니다.

따라서 미니 SaaS 설계에는 Access Map이 필요합니다. Route, data, action, user role, session state를 표로 나누어 "누가 무엇을 할 수 있는가"를 먼저 씁니다. 예를 들어 `/dashboard`는 로그인 사용자, `/admin`은 관리자, `/billing`은 account owner, `/api/projects/:id`는 해당 project member만 접근한다고 정리합니다. ==권한 구현은 코드에서 갑자기 떠올리는 조건문이 아니라 Access Map을 코드로 옮기는 작업==입니다.

### 3. 데이터 접근은 서버 경계 안에 둔다

Next.js의 server data access 관점에서 중요한 말은 credential과 query logic이 client bundle에 포함되지 않아야 한다는 것입니다. 미니 SaaS에서는 이 경계가 매우 큽니다. Client component가 모든 query를 직접 들고 있거나 secret을 알면, browser로 내려가는 bundle 안에 민감한 정보가 섞일 수 있습니다. Server boundary는 이런 위험을 줄입니다.

실제 흐름은 다음처럼 생각할 수 있습니다. Browser가 dashboard route를 요청합니다. Server는 session으로 사용자를 확인합니다. Authorization rule로 접근 가능한 account를 결정합니다. Server-side query가 그 account의 데이터만 읽습니다. Client는 이미 필터링된 결과를 렌더링합니다. 이 구조에서는 query credential과 filtering logic이 서버에 남습니다.

### 4. 데이터 fetching 방식은 섞지 않고 일관성을 유지한다

Data Security 관점에서 하나의 data fetching approach를 선택하고 섞지 않는 것은 유지보수성과 안전성에 연결됩니다. 프로젝트가 작을 때는 아무 곳에서나 fetch해도 동작하는 것처럼 보입니다. 그러나 Server Component, route handler, client fetch, direct DB query가 뒤섞이면 어떤 경계에서 authorization이 적용되는지 추적하기 어려워집니다.

미니 SaaS에서는 처음부터 단순한 규칙을 둡니다. 민감한 data는 server side에서 가져오고, client는 interaction과 표시를 담당합니다. 공개 데이터는 별도 route로 분리합니다. Mutation은 user session과 authorization을 다시 확인하는 server path로 보냅니다. 이렇게 하면 AI에게도 "이 프로젝트의 data access는 server boundary 안에서 처리한다"는 규칙을 줄 수 있습니다.

### 5. 환경 변수는 source code 밖의 설정이다

환경 변수는 API key, database URL, 배포 환경별 option처럼 코드에 직접 넣으면 안 되는 값을 관리합니다. Vercel 문서는 environment variable이 source code 밖에서 configured된다고 설명합니다. 이 말은 단순히 `.env` 파일을 쓰라는 뜻이 아니라, 제품 환경마다 설정을 바꾸고 secret을 코드와 분리하라는 뜻입니다.

미니 SaaS에서는 local, preview, production을 구분하는 것이 좋습니다. Local에서는 개발 database를 쓰고, production에서는 실제 database를 씁니다. API key도 환경별로 다를 수 있습니다. AI가 코드를 만들 때 secret 값을 직접 넣지 않게 하고, `process.env` 또는 framework가 권장하는 환경 변수 접근 방식을 쓰게 해야 합니다.

### 6. 데이터베이스 index는 query pattern에서 나온다

Dashboard는 보통 "현재 사용자 또는 account의 최근 데이터"를 자주 읽습니다. PostgreSQL index는 database server가 특정 row를 더 빠르게 찾고 가져오게 해줍니다. 하지만 index는 아무 column에나 붙이는 장식이 아닙니다. 어떤 query가 자주 실행되는지, 어떤 filter와 sort가 필요한지에 따라 결정됩니다.

미니 SaaS 예를 들어 `projects` table에서 `account_id`와 `updated_at`으로 dashboard를 보여준다면, 이 query pattern을 기준으로 index를 검토할 수 있습니다. 반대로 거의 조회하지 않는 column에 index를 붙이면 쓰기 비용과 관리 비용만 늘 수 있습니다. Architecture는 UI와 DB를 분리해서 생각하지 않습니다. Dashboard가 요구하는 query가 database 설계에 영향을 줍니다.

```ts
type Role = "guest" | "member" | "owner" | "admin"

type AccessRule = {
  route: string
  allowedRoles: Role[]
  requiresAccount: boolean
}

const accessMap: AccessRule[] = [
  { route: "/dashboard", allowedRoles: ["member", "owner", "admin"], requiresAccount: true },
  { route: "/billing", allowedRoles: ["owner", "admin"], requiresAccount: true },
  { route: "/admin", allowedRoles: ["admin"], requiresAccount: false },
]

function canAccess(route: string, role: Role, hasAccount: boolean): boolean {
  const rule = accessMap.find((item) => item.route === route)

  if (!rule) {
    return false
  }

  if (rule.requiresAccount && !hasAccount) {
    return false
  }

  return rule.allowedRoles.includes(role)
}

console.log(canAccess("/billing", "member", true))
console.log(canAccess("/billing", "owner", true))
```

이 예시는 실제 인증 라이브러리 대신 Access Map의 사고방식을 보여줍니다. 미니 SaaS에서 route 접근은 "로그인했는가" 하나로 끝나지 않습니다. Role과 account 관계가 함께 판단되어야 합니다.

> [!KEY]
> 미니 SaaS는 login page, dashboard, database를 따로 만드는 프로젝트가 아닙니다. 사용자를 확인하고, 접근 권한을 결정하고, 서버에서 안전하게 data를 읽고, 운영 설정을 코드 밖에 두는 하나의 구조입니다.

## 스펙과 세부

### Authentication과 authorization은 순서가 있지만 같은 것이 아니다

Authentication은 사용자가 누구인지 확인합니다. Authorization은 그 사용자가 어떤 route와 data에 접근할 수 있는지 결정합니다. 순서상 authentication이 먼저인 경우가 많지만, 두 개념을 합치면 설계가 흐려집니다. "로그인 사용자"라는 조건이 "모든 data 접근 가능"을 뜻하지 않기 때문입니다.

교재 프로젝트에서는 이 차이를 코드 구조에도 반영해야 합니다. Session을 읽는 helper와 route/data 접근을 판단하는 helper를 분리하면 설명이 쉬워집니다. AI에게도 "session 확인 함수"와 "권한 결정 함수"를 나누어 요청할 수 있습니다.

### Server data boundary는 보안과 이해 가능성을 같이 만든다

Next.js data fetching 문맥에서 server side에 credential과 query logic이 남는다는 점은 초보자에게 중요합니다. Browser에 내려간 코드와 server에서만 실행되는 코드는 신뢰 수준이 다릅니다. Database URL, private API key, account filtering query는 server boundary 안에 있어야 합니다.

이 경계가 명확하면 debugging도 쉬워집니다. Data가 잘못 보이면 client state 문제인지, server query 문제인지, authorization rule 문제인지 나눠 볼 수 있습니다. 경계가 흐리면 오류가 났을 때 AI도 불필요하게 여러 파일을 동시에 바꾸려 할 가능성이 커집니다.

### Environment variable은 배포 환경의 계약이다

환경 변수는 secret을 감추는 도구이면서 배포 환경별 설정 계약입니다. Local, preview, production의 database나 API endpoint가 다르면 코드가 아니라 환경 설정에서 바뀌어야 합니다. Source code에 secret을 남기지 않는 것은 기본이고, 어떤 환경에서 어떤 값이 필요한지 문서화하는 것도 architecture의 일부입니다.

미니 SaaS README에는 최소한 필요한 environment variable 이름과 의미를 적어야 합니다. 값 자체는 쓰지 않습니다. AI에게 README 생성을 맡길 때도 "변수 이름과 설명만 쓰고 secret 값을 절대 쓰지 말라"는 규칙을 줍니다.

### Index는 dashboard 요구사항에서 검토한다

PostgreSQL index는 database server가 특정 row를 더 빠르게 찾게 하지만, 모든 성능 문제를 자동으로 해결하지는 않습니다. Index는 query pattern과 함께 봐야 합니다. Dashboard가 account별 최근 project를 읽는다면 account filter와 정렬 기준을 고려합니다. Admin dashboard가 status별 aggregation을 자주 읽는다면 그 query에 맞는 설계를 검토합니다.

초보자는 index를 "빠르게 만드는 버튼"으로 이해하기 쉽습니다. 그러나 architecture 관점에서는 "어떤 화면이 어떤 조건으로 데이터를 자주 읽는가"를 묻는 것이 먼저입니다. UI 요구사항이 DB 접근 방식에 영향을 준다는 점이 중요합니다.

## 원문으로 읽기

> "Verifies if the user is who they say they are"
>
> — 사용자가 자신이 말하는 그 사람인지 확인한다.
> [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication)

이 문장은 authentication의 중심을 정확히 보여줍니다. 미니 SaaS의 첫 단계는 사용자가 누구인지 확인하는 것입니다. 이 확인이 없으면 개인 dashboard, account setting, billing 같은 기능은 의미를 잃습니다. 하지만 이 문장은 authorization까지 말하지 않습니다. 그래서 다음 인용이 필요합니다.

> "Decides what routes and data the user can access"
>
> — 사용자가 어떤 route와 data에 접근할 수 있는지 결정한다.
> [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication)

이 문장은 authorization의 범위를 보여줍니다. SaaS에서는 route와 data가 함께 보호되어야 합니다. 관리자 페이지 route를 막아도 API data가 열려 있으면 부족하고, API data를 막아도 UI가 잘못된 action을 노출하면 혼란이 생깁니다. Access Map은 이 문장을 프로젝트 설계 표로 바꾸는 방법입니다.

> "credentials and query logic will not be included in the client bundle"
>
> — credential과 query logic이 client bundle에 포함되지 않는다.
> [Next.js Docs — Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)

이 문장은 server data boundary의 핵심입니다. SaaS에서 credential과 query logic은 사용자의 browser로 내려가면 안 됩니다. Server-side data access는 보안만이 아니라 사고 모델도 단순하게 만듭니다. 민감한 data는 서버에서 확인하고, client는 표시와 상호작용에 집중합니다.

> "configured outside your source code"
>
> — source code 밖에서 설정된다.
> [Vercel Docs — Environment variables](https://vercel.com/docs/environment-variables)

이 문장은 환경 변수의 운영적 의미를 보여줍니다. Secret과 배포 설정은 코드에 박아 넣는 값이 아닙니다. 프로젝트가 작아도 local, preview, production을 구분하는 습관이 있어야 나중에 SaaS로 커질 수 있습니다.

## 실전에서

### 작은 SaaS의 첫 설계 문서

실전에서 미니 SaaS를 만들 때는 코드보다 먼저 한 장짜리 설계 문서를 씁니다. 이 문서에는 사용자 역할, route, data access, server boundary, environment variables, 주요 dashboard query가 들어갑니다. 이것은 거창한 architecture diagram이 아니라 AI에게 줄 수 있는 정확한 작업 기준입니다.

```text
Mini SaaS Architecture Packet

Users:
- guest: public page만 접근
- member: 자기 account dashboard 접근
- owner: billing과 member 관리 접근
- admin: 운영 dashboard 접근

Server data boundary:
- dashboard data는 server side에서 session과 account_id 확인 후 fetch
- client bundle에는 database credential과 query logic을 포함하지 않음

Environment:
- DATABASE_URL: production database 연결 문자열
- AUTH_SECRET: session/token 검증용 secret
- PUBLIC_APP_URL: client에 노출 가능한 app base URL

Dashboard query:
- account_id 기준으로 project 목록 조회
- 최근 수정 순 정렬
- 필요 시 account_id, updated_at 기준 index 검토
```

이 문서는 AI prompt의 기준이 됩니다. "이 설계 문서 밖의 권한을 발명하지 말라", "client bundle에 secret을 넣지 말라", "dashboard data fetch는 server side boundary에 둬라"처럼 명령할 수 있습니다.

### Next.js에서 사고 경계를 코드로 나눈다

아래 예시는 실제 database 연결을 생략하고, server data boundary와 authorization check를 분리하는 모양을 보여줍니다. 중요한 것은 query가 호출되기 전에 user와 account 접근을 확인한다는 구조입니다.

```ts
type Session = {
  userId: string
  role: "member" | "owner" | "admin"
  accountId?: string
}

type Project = {
  id: string
  accountId: string
  name: string
  updatedAt: string
}

function assertDashboardAccess(session: Session): string {
  if (!session.accountId) {
    throw new Error("account is required")
  }

  if (!["member", "owner", "admin"].includes(session.role)) {
    throw new Error("not authorized")
  }

  return session.accountId
}

async function listDashboardProjects(session: Session): Promise<Project[]> {
  const accountId = assertDashboardAccess(session)

  return [
    { id: "p1", accountId, name: "AI Vibe Coding Master", updatedAt: "2026-07-12" },
  ]
}
```

실제 프로젝트에서는 `listDashboardProjects` 안에서 database query가 실행됩니다. 이때 credential과 query logic은 server side에 남아야 합니다. Client는 이 함수를 직접 browser에서 실행하지 않고, framework가 제공하는 server boundary를 통해 결과만 받습니다.

### README에는 secret 값이 아니라 요구 변수만 남긴다

프로젝트 교재에서 초보자가 자주 하는 실수는 `.env` 값을 그대로 문서나 코드에 남기는 것입니다. README에는 변수 이름, 목적, 노출 가능 여부를 적습니다. 값은 배포 플랫폼이나 local 환경 파일에 둡니다. AI에게 문서 작성을 요청할 때도 이 규칙을 반드시 명시합니다.

## 한계와 트레이드오프

미니 SaaS 아키텍처는 작은 프로젝트를 이해하기 쉽게 만드는 구조입니다. 대규모 SaaS의 multi-tenant isolation, billing compliance, audit log, organization hierarchy, row level security 전체를 다루지는 않습니다. 이 강의의 목적은 "작은 프로젝트에서도 최소한의 신뢰 경계를 세운다"는 것입니다.

Server data boundary를 강조하면 client interaction이 답답해 보일 수 있습니다. 모든 데이터를 서버에서만 처리하려고 하면 사용자 경험이 느려질 수도 있습니다. 그러나 민감한 credential과 query logic을 보호하는 경계는 유지해야 합니다. 공개 데이터와 민감 데이터, 읽기와 쓰기, UI state와 server state를 구분해야 합니다.

Index도 trade-off가 있습니다. Index는 특정 조회를 빠르게 할 수 있지만, 모든 table과 column에 무조건 추가하는 것은 좋은 설계가 아닙니다. Dashboard query pattern을 보고 결정해야 합니다. 마찬가지로 authorization rule도 너무 세밀하면 개발이 복잡해지고, 너무 넓으면 보안 경계가 무너집니다.

AI 시대의 가장 큰 오해는 "SaaS starter를 생성하면 architecture가 완성된다"입니다. 생성된 파일은 출발점일 수 있지만, Access Map, server data boundary, environment variable policy, query pattern 설명이 없으면 팀은 구조를 이해하지 못합니다. ==Architecture는 파일 수가 아니라 경계와 책임을 설명할 수 있는 능력==입니다.

> [!WARNING]
> 로그인 구현이 있다는 이유만으로 SaaS가 안전해지는 것은 아닙니다. Authentication 다음에는 route와 data에 대한 authorization 결정이 반드시 따라와야 합니다.

## 더 읽기

먼저 Next.js Authentication 문서에서 authentication과 authorization의 차이를 읽습니다. 그다음 Next.js Fetching Data와 Data Security 문서로 server-side data access boundary를 확인합니다. Vercel Environment Variables 문서는 secret과 운영 설정을 코드 밖에 두는 기준으로 읽고, PostgreSQL Indexes 문서는 dashboard query가 커질 때 database가 row를 어떻게 더 빠르게 찾는지 이해하는 데 사용합니다.

- [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication)
- [Next.js Docs — Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js Docs — Data Security](https://nextjs.org/docs/app/guides/data-security)
- [Vercel Docs — Environment variables](https://vercel.com/docs/environment-variables)
- [PostgreSQL Docs — Indexes](https://www.postgresql.org/docs/current/indexes.html)

함께 읽을 내부 강의는 `auth-session-token`, `nextjs-app-router`, `database-modeling-basics`, `deployment-environment-variables`입니다. 이 강의는 project-textbook 모듈의 첫 강의로, 뒤의 관리자 대시보드, 챗봇, workflow 프로젝트가 기대는 공통 구조를 제공합니다.
