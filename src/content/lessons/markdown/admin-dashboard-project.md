## 한 줄 정의

관리자 대시보드 프로젝트는 운영자가 제품 상태를 확인하고 판단할 수 있도록, 서버에서 가져온 데이터를 권한 경계 안에서 읽고, React state로 필터와 선택 상태를 일관되게 관리하며, 접근 가능한 table로 정보를 표현하는 운영 화면입니다. 초보자는 대시보드를 "카드와 표가 많은 페이지"로 생각하기 쉽지만, 실제 핵심은 data boundary와 state ownership입니다. ==관리자 대시보드는 예쁜 chart보다 누가 어떤 데이터를 볼 수 있고, 어떤 필터 기준으로 같은 사실을 보고 있는지가 더 중요합니다==.

이 강의는 project-textbook 모듈의 두 번째 강의입니다. 앞의 미니 SaaS 아키텍처에서 authentication, authorization, server data boundary를 배웠다면, 이제 그 구조 위에 운영 화면을 올립니다. 관리자 대시보드는 사용자가 직접 쓰는 product surface가 아니라 운영자가 제품을 이해하고 조치하는 surface입니다. 그래서 일반 사용자 화면보다 권한, 데이터 정확성, 테이블 의미, state 일관성이 더 중요합니다.

근거 KB는 React의 state sharing과 managing state, Next.js fetching data, Next.js authentication, MDN table accessibility입니다. 이 강의는 특정 dashboard library 사용법이 아니라, 어떤 dashboard를 만들더라도 지켜야 하는 구조를 설명합니다. AI에게 dashboard 생성을 맡길 때도 이 구조를 주면 카드와 표만 많은 화면이 아니라 판단 가능한 운영 도구를 만들게 할 수 있습니다.

![관리자 대시보드 구조: 운영 질문이 server data boundary, dashboard state owner, accessible table로 이어지는 흐름](/lesson-diagrams/admin-dashboard-project/admin-dashboard-flow.svg)

## 왜 존재하는가

서비스가 작을 때 운영자는 데이터베이스를 직접 보거나 로그를 훑어도 문제를 파악할 수 있습니다. 그러나 사용자가 늘어나면 주문, 가입, 오류, 권한 요청, 콘텐츠 상태 같은 정보를 한곳에서 볼 수 있어야 합니다. 이때 관리자 대시보드는 운영자의 눈이 됩니다. 하지만 눈이 되려면 정보가 정확하고, 권한이 맞고, 사용자가 같은 기준으로 필터링하고 있다는 점이 보장되어야 합니다.

관리자 대시보드가 필요한 첫 번째 이유는 판단의 집중입니다. 운영자는 여러 source에서 data를 모아 한 화면에서 봅니다. 이때 table과 card가 서로 다른 filter 기준을 쓰면 같은 화면 안에서도 숫자가 맞지 않습니다. React state ownership이 중요한 이유가 여기에 있습니다. 필터 state를 가까운 공통 부모에 두어 summary card와 table이 같은 조건을 보게 해야 합니다.

두 번째 이유는 권한입니다. 관리자 화면은 일반 사용자보다 더 민감한 data를 다룰 수 있습니다. 따라서 route를 숨기는 것만으로 충분하지 않습니다. Server data fetch에서도 authorization이 적용되어야 합니다. Next.js Authentication 문서의 authorization 정의처럼, 사용자가 어떤 route와 data에 접근할 수 있는지 결정해야 합니다.

세 번째 이유는 접근 가능한 정보 구조입니다. 대시보드 table은 운영자가 빠르게 읽는 핵심 UI입니다. MDN table accessibility 관점에서 caption과 header-cell association이 필요한 이유는 표가 단순한 grid가 아니라 의미 있는 data structure이기 때문입니다. ==운영 화면의 접근성은 친절한 옵션이 아니라 data를 오해하지 않게 만드는 정확성의 일부==입니다.

AI 시대에는 dashboard 생성이 쉬워졌습니다. AI에게 "admin dashboard 만들어줘"라고 하면 카드, chart, table을 빠르게 생성합니다. 그러나 state owner, server data boundary, administrator authorization, table accessibility를 요구하지 않으면 시각적으로는 그럴듯하지만 운영 도구로는 불안한 화면이 됩니다. 프로젝트 교재는 이 차이를 설명해야 합니다.

## 작동 원리

### 1. 관리자 질문을 data view로 바꾼다

대시보드는 data를 많이 보여주는 화면이 아니라 운영자의 질문에 답하는 화면입니다. "이번 주 신규 가입이 줄었는가", "오류가 많은 workflow는 무엇인가", "승인이 필요한 사용자는 누구인가", "결제가 실패한 account는 어디인가" 같은 질문이 먼저 있어야 합니다. 질문이 없으면 dashboard는 숫자 장식이 됩니다.

질문이 정해지면 data view가 생깁니다. 어떤 entity를 보여줄지, 어떤 필터가 필요한지, 어떤 정렬이 기본인지, 어떤 action이 가능한지 정합니다. 이 data view는 server query와 UI state를 동시에 결정합니다. 필터가 account, status, date range라면 server query도 그 조건을 받아야 하고, table과 summary card도 같은 조건을 공유해야 합니다.

### 2. server data fetch가 관리자 권한을 확인한다

관리자 대시보드의 data는 server side에서 가져오는 것이 기본 사고입니다. Next.js 문맥에서 Server Components에서 data를 fetch할 수 있다는 점은 dashboard에 잘 맞습니다. 서버는 session을 확인하고, 사용자가 admin인지 또는 특정 운영 권한이 있는지 판단한 뒤 data를 읽습니다. 여기서 중요한 것은 route와 data를 함께 보호하는 것입니다.

만약 `/admin` route만 보호하고 API endpoint가 일반 사용자에게 열려 있으면 data boundary가 깨집니다. 반대로 data query는 보호하지만 UI가 관리자 action을 잘못 노출하면 사용자 경험과 보안 설명이 흐려집니다. Admin Data Boundary는 route, query, action을 함께 묶습니다.

### 3. shared state는 closest common parent로 올린다

React의 state sharing 원리는 dashboard에서 매우 실용적입니다. Date range filter, status filter, selected row, search query 같은 state를 table, chart, summary card가 함께 써야 할 때가 많습니다. 이때 state를 각 컴포넌트가 따로 들고 있으면 중복과 불일치가 생깁니다.

React 문서의 표현처럼 state를 가장 가까운 공통 부모로 올리면 여러 컴포넌트가 같은 기준을 공유할 수 있습니다. 예를 들어 `AdminDashboardPage`가 `filters` state를 갖고, `SummaryCards`, `OrdersTable`, `StatusFilter`가 props로 같은 값을 받는 구조입니다. ==Dashboard state owner는 "가장 편한 컴포넌트"가 아니라 "같은 판단 기준을 공유해야 하는 컴포넌트들의 가장 가까운 공통 부모"입니다==.

### 4. 중복 state를 제거한다

React managing state 문서는 redundant or duplicate state가 bug의 흔한 원천이라고 말합니다. Dashboard에서는 이 문제가 자주 생깁니다. `selectedStatus`와 `filteredRows`를 둘 다 state로 들고 있으면 하나가 업데이트될 때 다른 하나가 낡을 수 있습니다. 실제 rows와 filter state만 있으면 filtered rows는 계산할 수 있습니다.

AI가 만든 dashboard 코드를 검토할 때는 중복 state를 봐야 합니다. 같은 의미의 데이터가 여러 state로 존재하는가. Server에서 이미 필터링한 결과를 client가 또 다른 기준으로 따로 들고 있는가. URL query, local state, table internal state가 서로 충돌하지 않는가. 이 질문들이 dashboard 품질을 결정합니다.

### 5. table은 의미 있는 데이터 구조로 만든다

관리자 대시보드에서 table은 흔합니다. 그러나 table을 div grid처럼만 만들면 header와 cell의 관계, caption, summary 의미가 흐려질 수 있습니다. MDN table accessibility는 caption 추가와 header-cell association을 강조합니다. 운영자는 table을 빠르게 훑지만, 보조 기술 사용자도 행과 열의 의미를 이해할 수 있어야 합니다.

Accessible Data Table은 디자인의 제약이 아니라 정보 정확성의 장치입니다. Caption은 table이 무엇을 보여주는지 알려줍니다. Header는 cell의 의미를 연결합니다. Status badge, action button, error count 같은 값은 text로도 의미가 드러나야 합니다.

### 6. action은 data와 권한을 다시 확인한다

Dashboard에는 단순 조회뿐 아니라 user approve, workflow retry, invoice mark, content hide 같은 action이 들어갈 수 있습니다. 이때 client button을 숨기는 것만으로는 충분하지 않습니다. Action을 처리하는 server path에서도 관리자 권한과 대상 data 접근을 다시 확인해야 합니다.

이 원리는 AI에게 action 구현을 맡길 때 중요합니다. "Approve button을 추가하라"가 아니라 "approve action은 server side에서 admin authorization과 target row existence를 확인한 뒤 수행하라"라고 요청해야 합니다. Dashboard UI는 action의 출발점이지 권한의 최종 보증이 아닙니다.

```tsx
type OrderStatus = "pending" | "paid" | "failed"

type DashboardFilters = {
  status: OrderStatus | "all"
  search: string
}

type Order = {
  id: string
  customer: string
  status: OrderStatus
}

function filterOrders(orders: Order[], filters: DashboardFilters): Order[] {
  return orders.filter((order) => {
    const matchesStatus = filters.status === "all" || order.status === filters.status
    const matchesSearch = order.customer.toLowerCase().includes(filters.search.toLowerCase())
    return matchesStatus && matchesSearch
  })
}

const orders: Order[] = [
  { id: "o1", customer: "Ada", status: "paid" },
  { id: "o2", customer: "Linus", status: "failed" },
]

console.log(filterOrders(orders, { status: "failed", search: "" }))
```

이 예시는 dashboard filter state가 table rows를 어떻게 계산하는지 보여줍니다. `filteredOrders`를 별도 state로 저장하지 않고, 원본 data와 filter state에서 계산합니다. 실제 React 컴포넌트에서는 이 filters state를 summary card와 table이 공유하는 공통 부모에 둡니다.

> [!KEY]
> 관리자 대시보드의 품질은 카드 수가 아니라 세 가지 경계로 결정됩니다. server data boundary, admin authorization boundary, dashboard state owner입니다.

## 스펙과 세부

### State owner는 dashboard의 single source를 만든다

Shared state를 closest common parent로 옮기는 원리는 dashboard에서 single source of truth를 만듭니다. Filter bar, chart, table이 같은 `filters` 값을 받으면 같은 질문에 답합니다. 반대로 각 컴포넌트가 내부 state를 따로 갖고 있으면 화면이 서로 다른 질문에 답할 수 있습니다.

이 원리를 너무 넓게 적용하는 것도 조심해야 합니다. 모든 state를 최상위 app에 올리면 props 전달이 복잡해지고 관련 없는 컴포넌트가 리렌더링될 수 있습니다. "closest"가 중요합니다. 같은 state를 실제로 공유해야 하는 컴포넌트들의 가장 가까운 공통 부모가 적절한 위치입니다.

### Duplicate state는 stale dashboard를 만든다

Dashboard에서 중복 state는 특히 위험합니다. 운영자가 보고 있는 숫자가 낡거나, table과 chart가 다른 기준을 보여줄 수 있기 때문입니다. `orders`, `filteredOrders`, `paidOrdersCount`, `selectedStatus`를 모두 state로 들고 있으면 업데이트 경로가 많아집니다. 가능한 값은 원본 data와 filter state에서 계산하고, 사용자의 선택처럼 실제로 변하는 값만 state로 둡니다.

AI가 생성한 React dashboard에서는 이 문제가 자주 나타납니다. 빠르게 UI를 만들기 위해 여러 `useState`를 추가하는 경우가 있기 때문입니다. 검토할 때는 "이 값은 저장해야 하는가, 계산할 수 있는가"를 묻습니다.

### Server Components data fetching은 권한과 붙어 있어야 한다

Next.js에서 Server Components에서 data를 fetch할 수 있다는 점은 dashboard에 유리합니다. 초기 화면에 필요한 데이터를 서버에서 가져오고, client는 상호작용을 담당할 수 있습니다. 그러나 data fetch가 server에 있다는 사실만으로 권한이 자동 보장되지는 않습니다. Session 확인과 authorization decision이 query 앞에 있어야 합니다.

교재에서는 이 순서를 강조합니다. Session 확인, admin role 확인, query 실행, table 렌더링. 이 순서가 깨지면 data leakage 위험이 생깁니다.

### Table accessibility는 정보 구조의 일부다

MDN table accessibility의 caption과 header-cell association은 dashboard table에서 기본입니다. Caption은 table이 어떤 data view인지 설명합니다. Header와 cell의 관계는 열 의미를 분명히 합니다. 특히 여러 수준의 header나 복잡한 metric table에서는 association이 더 중요해집니다.

AI가 table을 만들 때 `<div>`와 CSS grid만으로 빠르게 꾸밀 수 있습니다. 그러나 운영 data에는 semantic table이 더 적절할 수 있습니다. Table이 실제 행과 열 데이터라면 HTML table semantics를 우선 검토합니다.

## 원문으로 읽기

> "move it to their closest common parent"
>
> — state를 가장 가까운 공통 부모로 옮긴다.
> [React Docs — Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

이 문장은 dashboard state owner의 기준입니다. 필터와 table, summary card가 같은 state를 써야 한다면 state를 그 컴포넌트들의 가까운 공통 부모로 올립니다. 너무 낮으면 공유가 안 되고, 너무 높으면 관리 범위가 불필요하게 넓어집니다.

> "Redundant or duplicate state is a common source of bugs"
>
> — 중복 state는 버그의 흔한 원천이다.
> [React Docs — Managing State](https://react.dev/learn/managing-state)

이 문장은 dashboard에서 특히 현실적입니다. 같은 data view를 여러 state로 저장하면 필터가 바뀌었는데 count가 업데이트되지 않거나, table은 최신인데 chart가 낡은 상태가 될 수 있습니다. AI가 만든 dashboard를 검토할 때 가장 먼저 중복 state를 찾는 이유입니다.

> "fetch data in Server Components"
>
> — Server Components에서 data를 fetch한다.
> [Next.js Docs — Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)

이 문장은 관리자 대시보드의 server data boundary를 설명하는 출발점입니다. 민감한 운영 data는 server에서 session과 authorization을 확인한 뒤 가져오는 구조가 이해하기 쉽습니다. Client component는 필터 UI나 상호작용을 맡고, data access는 서버 경계에 둡니다.

> "Adding captions to tables"
>
> — table에 caption을 추가한다.
> [MDN — HTML table accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility)

이 문장은 dashboard table을 의미 있는 data structure로 보게 합니다. Caption은 table이 무엇을 보여주는지 알려주는 장치입니다. 운영자가 빠르게 훑는 화면에서도 table의 목적과 범위를 드러내야 합니다.

## 실전에서

### Dashboard 설계 packet을 먼저 만든다

관리자 대시보드를 만들기 전에 운영 질문, 권한, data view, state owner를 정리합니다. 이 packet은 AI에게 코드 생성을 맡길 때도 사용합니다.

```text
Admin Dashboard Packet

Question:
- 실패한 주문을 빠르게 찾고 재시도 여부를 판단한다.

Authorization:
- /admin/orders route는 admin role만 접근
- order data fetch도 server side에서 admin role 확인 후 실행

Data view:
- columns: order id, customer, status, updated at, retry action
- filters: status, search
- default sort: updated at desc

State owner:
- AdminOrdersPage owns filters
- FilterBar updates filters
- SummaryCards and OrdersTable receive the same filters

Accessibility:
- table caption: "최근 주문 상태"
- status는 색상뿐 아니라 text로 표시
```

이 packet은 "관리자 대시보드 만들어줘"보다 훨씬 정확합니다. AI는 어떤 state를 공유해야 하는지, 어떤 권한을 확인해야 하는지, table이 어떤 의미를 가져야 하는지 알 수 있습니다.

### Accessible table 예시

```tsx
type AdminOrder = {
  id: string
  customer: string
  status: "paid" | "failed" | "pending"
}

function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <table>
      <caption>최근 주문 상태</caption>
      <thead>
        <tr>
          <th scope="col">주문 ID</th>
          <th scope="col">고객</th>
          <th scope="col">상태</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <th scope="row">{order.id}</th>
            <td>{order.customer}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

이 예시는 table caption과 header scope를 보여줍니다. 실제 design system에서는 styling이 더해지겠지만, semantic structure는 유지되어야 합니다. Status를 색상만으로 표시하지 않고 text로 남기는 것도 중요합니다.

### AI 코드 리뷰 질문

AI가 dashboard 초안을 만들었다면 다음 질문으로 검토합니다. 필터 state가 여러 컴포넌트에 중복되어 있지 않은가. Server data fetch 앞에서 admin authorization을 확인하는가. Table은 caption과 header 관계를 갖는가. Action button이 server side에서 권한을 다시 확인하는가. 이 질문들이 dashboard의 품질을 빠르게 가릅니다.

## 한계와 트레이드오프

관리자 대시보드는 제품 내부 도구이기 때문에 "사용자-facing 화면보다 대충 만들어도 된다"는 오해가 생길 수 있습니다. 그러나 운영 화면이 잘못된 data를 보여주면 잘못된 조치가 나올 수 있습니다. State와 data boundary가 흔들리면 운영 판단 자체가 흔들립니다.

반대로 모든 dashboard를 무겁게 설계할 필요는 없습니다. 작은 내부 통계 페이지에 복잡한 state management나 과도한 table abstraction을 넣으면 유지보수가 어려워집니다. 핵심은 질문과 위험에 맞게 구조를 선택하는 것입니다. 민감한 admin data와 action이 있으면 authorization과 server boundary를 강하게 두고, 단순 공개 통계라면 구조를 단순하게 유지할 수 있습니다.

Accessibility도 trade-off가 아니라 기본 품질입니다. 다만 복잡한 chart나 custom grid에서는 semantic table만으로 충분하지 않을 수 있습니다. 이때도 caption, label, text alternative, keyboard interaction 같은 원칙을 놓치지 않아야 합니다.

AI 시대의 흔한 실패는 "대시보드처럼 보이는 화면"과 "운영자가 믿고 쓸 수 있는 대시보드"를 구분하지 못하는 것입니다. 카드와 chart가 많아도 state가 중복되고 권한이 route에만 있고 table 의미가 없으면 프로젝트 교재의 목표를 달성하지 못합니다. ==관리자 대시보드는 UI 과제가 아니라 운영 판단을 위한 data product==입니다.

> [!WARNING]
> `/admin` route를 숨겼다고 관리자 data가 보호되는 것은 아닙니다. Server data fetch와 action handler에서도 같은 authorization 기준을 다시 확인해야 합니다.

## 더 읽기

먼저 React Sharing State 문서로 state owner를 이해하고, Managing State 문서로 중복 state를 줄이는 기준을 확인합니다. 그다음 Next.js Fetching Data 문서로 server data boundary를 읽고, Next.js Authentication 문서에서 authorization이 route와 data 접근을 결정한다는 점을 확인합니다. 마지막으로 MDN table accessibility 문서를 읽으며 caption과 header-cell 관계를 dashboard table에 적용합니다.

- [React Docs — Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React Docs — Managing State](https://react.dev/learn/managing-state)
- [Next.js Docs — Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication)
- [MDN — HTML table accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility)

함께 읽을 내부 강의는 `react-state-and-effects`, `nextjs-server-components`, `mini-saas-architecture`입니다. 다음 프로젝트 교재인 `ai-chatbot-project`에서는 같은 server boundary 사고를 AI conversation state, retrieval, tool calling으로 확장합니다.
