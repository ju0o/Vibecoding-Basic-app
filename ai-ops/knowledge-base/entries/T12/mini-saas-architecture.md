---
id: mini-saas-architecture
title: "미니 SaaS 아키텍처 (Mini SaaS Architecture)"
topicGroup: T12
status: approved
score: 90
level: 중급
prerequisites: [auth-session-token, database-tables-indexes, production-env-secrets]
successors: [admin-dashboard-project, private-ai-learning-site-project]
related: [deployment-platforms, web-security-basics, rest-api-design]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Next.js Docs — Authentication", url: "https://nextjs.org/docs/app/guides/authentication", checked: 2026-07-12 }
  - { title: "Next.js Docs — Data Security", url: "https://nextjs.org/docs/app/guides/data-security", checked: 2026-07-12 }
  - { title: "Next.js Docs — Fetching Data", url: "https://nextjs.org/docs/app/getting-started/fetching-data", checked: 2026-07-12 }
  - { title: "Vercel Docs — Environment variables", url: "https://vercel.com/docs/environment-variables", checked: 2026-07-12 }
  - { title: "PostgreSQL Docs — Row Security Policies", url: "https://www.postgresql.org/docs/current/ddl-rowsecurity.html", checked: 2026-07-12 }
  - { title: "PostgreSQL Docs — Indexes", url: "https://www.postgresql.org/docs/current/indexes.html", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
미니 SaaS 아키텍처는 로그인, 권한, 데이터 저장, 환경 변수, 배포 흐름을 최소 제품 단위로 묶은 웹 서비스 구조다. Next.js authentication 문서는 auth를 authentication, session management, authorization 세 개념으로 나누고, Vercel은 environment variables를 source code 밖에서 구성되는 key-value pairs로 설명한다. 미니 SaaS는 기능을 많이 넣는 것이 아니라, 사용자별 접근과 운영 환경을 처음부터 분리하는 작은 구조다. (출처: https://nextjs.org/docs/app/guides/authentication, https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

## 역사
SaaS는 설치형 소프트웨어보다 웹 기반 계정, 구독, 운영, 업데이트가 중요해지면서 널리 쓰이는 제품 형태가 되었다. 이 KB는 가격·결제 정책이 아니라 구현자가 직접 마주치는 최소 구조에 초점을 둔다. Next.js는 React Server Components와 서버 데이터 접근을 다루고, PostgreSQL은 테이블·인덱스·row security 같은 데이터 계층 원칙을 제공한다. (출처: https://nextjs.org/docs/app/getting-started/fetching-data, https://www.postgresql.org/docs/current/indexes.html, https://www.postgresql.org/docs/current/ddl-rowsecurity.html, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 "페이지가 보이면 서비스"라고 생각하기 쉽다. 하지만 SaaS는 사용자를 구분하고, 데이터 접근을 제한하고, 환경별 설정을 분리하고, 성능을 유지해야 한다. Next.js는 authorization이 routes and data 접근을 결정한다고 설명하고, PostgreSQL row security policies는 table row 접근을 제한하는 정책을 제공한다. Vercel environment variables는 build step과 function execution에서 환경별 값을 읽게 한다. (출처: https://nextjs.org/docs/app/guides/authentication, https://www.postgresql.org/docs/current/ddl-rowsecurity.html, https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

## 핵심 개념
1. **Auth 3분해**: Authentication은 사용자가 누구인지 확인하고, Session Management는 요청 사이의 auth state를 추적하며, Authorization은 routes and data 접근을 결정한다. (출처: https://nextjs.org/docs/app/guides/authentication, 확인: 2026-07-12)
2. **Data fetching boundary**: Next.js Server Components는 server에서 렌더링되므로 credentials와 query logic이 client bundle에 포함되지 않는다. 하지만 request는 여전히 properly authenticated and authorized되어야 한다. (출처: https://nextjs.org/docs/app/getting-started/fetching-data, 확인: 2026-07-12)
3. **Data security approach 선택**: Next.js data security guide는 HTTP APIs, Data Access Layer, Component-Level Data Access 중 하나를 선택하고 섞지 말라고 권장한다. 이는 팀과 auditor가 기대할 구조를 명확히 한다. (출처: https://nextjs.org/docs/app/guides/data-security, 확인: 2026-07-12)
4. **환경 변수 분리**: Vercel environment variables는 source code 밖의 key-value pairs이며, production, preview, development 환경에 다르게 적용될 수 있다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-12)
5. **Row security**: PostgreSQL row security는 table row가 returned/inserted/updated/deleted될 수 있는지를 policy로 제한한다. 사용자별 데이터 격리의 데이터베이스 층 후보가 된다. (출처: https://www.postgresql.org/docs/current/ddl-rowsecurity.html, 확인: 2026-07-12)
6. **Index budget**: PostgreSQL indexes는 특정 row를 더 빠르게 찾도록 돕지만 전체 database system에 overhead를 더하므로 sensibly 사용해야 한다. (출처: https://www.postgresql.org/docs/current/indexes.html, 확인: 2026-07-12)

## 관련 기술
- auth-session-token: SaaS는 로그인 상태와 권한 결정을 모든 사용자 흐름에 연결해야 한다. (출처: https://nextjs.org/docs/app/guides/authentication, 확인: 2026-07-12)
- database-tables-indexes: 사용자, 조직, 프로젝트, 구독 같은 핵심 엔티티가 table과 index 설계로 표현된다. (출처: https://www.postgresql.org/docs/current/indexes.html, 확인: 2026-07-12)
- production-env-secrets: 배포 환경별 secret과 public 설정을 분리해야 한다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

## 선행 개념
- auth-session-token: 사용자를 식별하고 권한을 판단하는 흐름을 알아야 한다.
- database-tables-indexes: 제품 상태를 테이블과 인덱스로 설계할 수 있어야 한다.
- production-env-secrets: 개발·프리뷰·프로덕션 값을 코드와 분리해야 한다.

## 후행 개념
- admin-dashboard-project: SaaS 운영자는 사용자·데이터·상태를 보는 관리 화면이 필요하다.
- private-ai-learning-site-project: 이 사이트를 비공개 SaaS형 학습 서비스로 마감하는 프로젝트로 이어진다.

## AI 시대에서의 의미
AI에게 "SaaS 만들어줘"라고만 요청하면 화면과 CRUD는 빠르게 나오지만 auth boundary, data access layer, env separation, index cost가 빠질 수 있다. 미니 SaaS 아키텍처 KB는 AI에게 줄 최소 설계 체크리스트가 된다. "로그인", "데이터", "배포"가 따로가 아니라 한 구조 안에서 이어져야 한다. (출처: https://nextjs.org/docs/app/guides/authentication, https://nextjs.org/docs/app/guides/data-security, https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

## 실무 활용
1. **엔티티 먼저 그리기**: users, organizations, projects, memberships 같은 table 후보를 쓰고 어떤 row가 누구에게 보이는지 정한다. (출처: https://www.postgresql.org/docs/current/ddl-rowsecurity.html, 확인: 2026-07-12)
2. **데이터 접근 경계 선택**: Next.js data security guide 기준으로 HTTP API, Data Access Layer, component-level access 중 하나를 선택한다. (출처: https://nextjs.org/docs/app/guides/data-security, 확인: 2026-07-12)
3. **환경별 설정 분리**: Vercel production, preview, development environment variable을 구분하고 변경 후 redeploy 필요성을 기록한다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-12)
4. **성능 후보 표시**: list, search, dashboard query에 필요한 index 후보를 적되, overhead 때문에 실제 query 기준으로 검토한다. (출처: https://www.postgresql.org/docs/current/indexes.html, 확인: 2026-07-12)

```text
Mini SaaS blueprint:
- Auth: sign-in, session, authorization
- Data: tables, ownership, row security
- App: server data access, UI flows
- Ops: env vars, preview/prod, logs
- Verify: role matrix, CRUD tests, deployment smoke check
```

## FAQ
Q: 미니 SaaS에 결제부터 넣어야 하는가?
A: 이 KB의 범위는 결제 이전의 최소 구조다. 먼저 auth, data access, environment separation, deployment가 안정적이어야 한다. (출처: https://nextjs.org/docs/app/guides/authentication, https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

Q: Server Components에서 DB를 읽으면 권한 검사는 필요 없나?
A: 필요하다. Next.js fetching data 문서는 server에서 credentials와 query logic이 client bundle에 포함되지 않는다고 하지만, requests는 properly authenticated and authorized되어야 한다고 명시한다. (출처: https://nextjs.org/docs/app/getting-started/fetching-data, 확인: 2026-07-12)

Q: index는 많이 만들수록 좋은가?
A: 아니다. PostgreSQL은 index가 row retrieval을 빠르게 하지만 database system 전체에 overhead를 더하므로 sensibly 사용해야 한다고 설명한다. (출처: https://www.postgresql.org/docs/current/indexes.html, 확인: 2026-07-12)

## 자주 하는 실수
1. **로그인만 만들고 authorization을 빼먹음**: 사용자가 누구인지만 확인하고 어떤 data에 접근 가능한지 분리하지 않는다. 교정: auth를 세 개념으로 나눠 설계한다. (출처: https://nextjs.org/docs/app/guides/authentication, 확인: 2026-07-12)
2. **데이터 접근 방식 혼합**: API, DAL, component access를 섞어 감사와 유지보수를 어렵게 만든다. 교정: 한 접근 방식을 선택한다. (출처: https://nextjs.org/docs/app/guides/data-security, 확인: 2026-07-12)
3. **secret을 코드에 넣음**: 환경별 값이 git에 남는다. 교정: environment variables로 분리하고 access 권한을 관리한다. (출처: https://vercel.com/docs/environment-variables, 확인: 2026-07-12)

## 공식 출처
- Authentication/session/authorization 분해 — [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication) (확인 날짜: 2026-07-12)
- Data access approach 선택 — [Next.js Docs — Data Security](https://nextjs.org/docs/app/guides/data-security) (확인 날짜: 2026-07-12)
- Server-side data fetching and authorization — [Next.js Docs — Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data) (확인 날짜: 2026-07-12)
- Environment separation — [Vercel Docs — Environment variables](https://vercel.com/docs/environment-variables) (확인 날짜: 2026-07-12)
- Row-level access policies — [PostgreSQL Docs — Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) (확인 날짜: 2026-07-12)
- Index performance tradeoff — [PostgreSQL Docs — Indexes](https://www.postgresql.org/docs/current/indexes.html) (확인 날짜: 2026-07-12)

## Quote Bank
- > "Verifies if the user is who they say they are"
  - 출처: [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication) (확인: 2026-07-12)
  - 맥락: authentication을 정의할 때 사용한다.
- > "Decides what routes and data the user can access"
  - 출처: [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication) (확인: 2026-07-12)
  - 맥락: authorization을 설명할 때 사용한다.
- > "credentials and query logic will not be included in the client bundle"
  - 출처: [Next.js Docs — Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data) (확인: 2026-07-12)
  - 맥락: server-side data access boundary를 설명할 때 사용한다.
- > "choosing one data fetching approach and avoiding mixing them"
  - 출처: [Next.js Docs — Data Security](https://nextjs.org/docs/app/guides/data-security) (확인: 2026-07-12)
  - 맥락: SaaS 데이터 접근 구조를 설명할 때 사용한다.
- > "configured outside your source code"
  - 출처: [Vercel Docs — Environment variables](https://vercel.com/docs/environment-variables) (확인: 2026-07-12)
  - 맥락: secret과 환경 설정 분리를 설명할 때 사용한다.
- > "allows the database server to find and retrieve specific rows much faster"
  - 출처: [PostgreSQL Docs — Indexes](https://www.postgresql.org/docs/current/indexes.html) (확인: 2026-07-12)
  - 맥락: dashboard query와 index를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
