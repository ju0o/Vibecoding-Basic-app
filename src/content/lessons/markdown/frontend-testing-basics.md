## 한 줄 정의

프론트엔드 테스트는 UI 코드가 사용자가 기대하는 방식으로 렌더링되고, 클릭·입력·탐색 같은 행동에 맞게 반응하며, 실제 브라우저에서도 흐름이 깨지지 않는지 확인하는 절차입니다. TypeScript가 데이터 모양의 실수를 줄이고 React가 화면 상태를 컴포넌트로 나누어도, 사용자가 보는 결과가 맞는지는 별도의 검증이 필요합니다. 버튼이 보이지만 클릭이 안 될 수 있고, 상태가 바뀌었지만 화면 문구가 그대로일 수 있으며, 라우팅은 컴파일되지만 브라우저에서는 hydration 문제로 깨질 수 있습니다.

프론트엔드 테스트는 보통 작은 단위부터 큰 흐름까지 나눠 봅니다. Vitest 같은 test runner는 작은 함수나 component helper를 빠르게 확인합니다. Testing Library는 사용자가 페이지를 쓰는 방식과 닮은 테스트를 권장합니다. Playwright는 브라우저 자동화로 실제 route, click, form, navigation을 end-to-end로 확인합니다. ==프론트엔드 테스트의 핵심은 내부 구현을 증명하는 것이 아니라 사용자 경험이 의도대로 작동한다는 confidence를 얻는 것입니다==.

AI 시대에는 이 개념이 더 중요해졌습니다. AI가 만든 UI는 빠르게 그럴듯해 보일 수 있지만, 그럴듯함은 검증이 아닙니다. AI가 코드를 작성했다면 사람은 acceptance criteria와 테스트 경계를 설계해야 합니다. 이 강의는 Vitest, Testing Library, Playwright를 각각 어떤 문제에 쓰는지, 그리고 테스트를 AI 코딩 루프의 안전 장치로 만드는 방법을 설명합니다.

![프론트엔드 테스트 피라미드](/lesson-diagrams/frontend-testing-basics/frontend-testing-pyramid.svg)

## 왜 존재하는가

웹 프론트엔드는 작은 변화에도 여러 층이 함께 움직입니다. 사용자가 버튼을 클릭하면 event handler가 실행되고, state가 바뀌고, React가 다시 렌더링하며, CSS가 적용되고, 브라우저가 화면을 그립니다. 데이터가 필요하면 API 요청이 일어나고, loading/error 상태도 처리해야 합니다. 이 모든 층이 함께 맞아야 사용자는 “잘 된다”고 느낍니다.

컴파일 성공은 이 전체 흐름을 보장하지 않습니다. TypeScript가 타입 오류를 잡아도 잘못된 label, 누락된 aria attribute, 잘못 연결된 click handler, 비어 있는 loading state는 놓칠 수 있습니다. lint가 통과해도 사용자는 form submit 후 아무 반응이 없다고 느낄 수 있습니다. 프론트엔드 테스트는 이런 간극을 줄이기 위해 존재합니다.

초기에는 테스트가 함수 단위 검증에 가까웠습니다. 하지만 현대 UI는 component state, asynchronous effect, route navigation, browser rendering이 함께 얽힙니다. 그래서 테스트도 빠른 단위 테스트, 사용자 중심 component test, 실제 브라우저 e2e test로 나뉘었습니다. 각각 속도와 신뢰 범위가 다릅니다. 모든 것을 e2e로 확인하면 느리고 불안정해질 수 있고, 모든 것을 unit test로만 확인하면 실제 사용자 흐름을 놓칠 수 있습니다.

AI가 코드를 생성하는 상황에서는 테스트의 역할이 더 분명해집니다. AI는 “요구사항처럼 보이는 코드”를 만들 수 있지만, 요구사항을 만족하는지는 테스트가 확인해야 합니다. 특히 리팩터링, 디자인 변경, form 흐름, 인증 경계, 결제 전환 같은 작업에서는 테스트가 없으면 사람이 눈으로 모든 상태를 다시 확인해야 합니다.

> [!KEY]
> 테스트는 AI를 믿지 않기 위한 장치가 아니라, AI에게 더 큰 일을 맡기기 위한 안전 레일입니다. 검증 경계가 명확할수록 위임할 수 있는 작업도 커집니다.

## 작동 원리

### 1. Test runner는 테스트를 실행하고 결과를 보고한다

Vitest 같은 test runner는 테스트 파일을 찾아 실행하고, assertion 결과를 모아 pass/fail로 보고합니다. KB는 Vitest가 Vite 앱 테스트를 잘 작동하게 만들기 위해 만들어졌고, Vite config와 transform pipeline 재사용을 강조한다고 정리합니다. React 프로젝트에서 Vite 기반 tooling을 쓴다면, 같은 해석 방식으로 테스트를 빠르게 돌릴 수 있다는 장점이 있습니다.

Test runner가 하는 일은 단순 실행 이상입니다. watch mode, mocking, coverage, snapshot, TypeScript transform처럼 개발자가 빠르게 feedback을 받을 수 있는 환경을 제공합니다. 초보자는 `expect(value).toBe(...)` 같은 assertion만 보지만, 실무에서는 “어떤 파일을 얼마나 빨리, 어떤 환경에서, 어떤 실패 메시지로 확인할 것인가”가 test runner 선택의 핵심입니다.

### 2. Unit test는 작은 로직을 빠르게 확인한다

Unit test는 작은 함수나 isolated logic을 확인합니다. 예를 들어 progress label, price formatting, validation rule, sort/filter logic은 UI 전체를 띄우지 않아도 테스트할 수 있습니다. 이 테스트는 빠르고 실패 지점이 선명합니다. 함수 하나가 잘못되면 바로 알 수 있습니다.

하지만 unit test만으로는 사용자가 보는 화면이 맞는지 알 수 없습니다. `progressLabel(true)`가 “완료”를 반환해도, 실제 버튼 클릭 후 그 함수가 호출되는지, 화면에 문구가 나타나는지는 별도 검증이 필요합니다. 그래서 unit test는 기초 안전망이지만 전체 사용자 흐름의 대체물은 아닙니다.

### 3. Component test는 사용자의 시선에 가까워진다

Testing Library의 핵심은 사용자가 소프트웨어를 쓰는 방식과 닮은 테스트일수록 confidence가 높다는 원칙입니다. 내부 state 변수 이름이나 component instance를 직접 검사하기보다, 화면에 보이는 text, role, label, accessible name을 기준으로 찾고, 사용자의 click/input에 가까운 행동을 시뮬레이션합니다.

이 원칙은 React 리팩터링에 강합니다. 내부 구현을 바꿔도 사용자가 보는 button label과 결과가 같다면 테스트는 유지됩니다. 반대로 구현 세부에 묶인 테스트는 refactor 때마다 깨져서 개발자가 테스트를 불신하게 만듭니다. ==좋은 UI 테스트는 component 내부 사정을 맞히는 시험이 아니라 사용자의 행동 계약을 지키는지 확인하는 계약서입니다==.

### 4. E2E test는 브라우저 전체 흐름을 확인한다

Playwright는 Chromium, Firefox, WebKit을 하나의 API로 다루며, route 이동, click, form input, network wait 같은 브라우저 자동화를 제공합니다. End-to-end test는 실제 앱을 띄우고 사용자의 주요 흐름을 통과시킵니다. 로그인, 검색, checkout, lesson bookmark, quiz submit 같은 중요한 흐름은 e2e smoke test가 큰 confidence를 줍니다.

Playwright에서 locator가 중요한 이유는 auto waiting과 retry-ability를 제공하기 때문입니다. UI는 비동기적으로 변합니다. 버튼이 아직 enabled가 아니거나, data fetch 후 요소가 나타나는 경우가 많습니다. locator는 이런 기다림을 actionability check와 함께 처리해 flaky test를 줄여줍니다.

### 5. 테스트 전략은 층별로 나눈다

좋은 프론트엔드 테스트 전략은 “무엇을 어디서 확인할지”를 정합니다. 작은 순수 로직은 Vitest unit test로, component interaction은 Testing Library 원칙으로, 주요 route와 browser behavior는 Playwright e2e로 확인합니다. 이렇게 나누면 빠른 feedback과 실제 confidence를 동시에 얻을 수 있습니다.

```ts
import { expect, test } from "vitest"

function progressLabel(done: boolean) {
  return done ? "완료" : "학습 전"
}

test("학습 완료 상태의 라벨을 보여준다", () => {
  expect(progressLabel(true)).toBe("완료")
})
```

## 스펙과 세부

Vitest는 Jest-compatible 생태계를 의식합니다. 기존 JavaScript 테스트 문화에서 익숙한 `test`, `expect`, mocking 흐름을 가져오면서도 Vite 프로젝트의 속도와 설정 재사용을 목표로 합니다. 따라서 Vite/React 기반 앱에서는 새 테스트 runner를 도입할 때 빌드 파이프라인과 테스트 파이프라인이 크게 어긋나지 않는 장점이 있습니다.

Testing Library는 특정 test runner 자체가 아니라 테스트 철학에 가깝습니다. 중요한 것은 DOM을 사용자 관점에서 질의하는 것입니다. 가능한 한 role, label text, visible text처럼 사용자와 접근성 tree에 가까운 단서를 사용합니다. 이것은 테스트 품질뿐 아니라 접근성 개선에도 연결됩니다. label이 없어서 input을 찾기 어렵다면, 테스트가 불편한 것이 아니라 UI 계약이 불분명한 것일 수 있습니다.

Playwright는 browser-level automation을 다룹니다. test, scripting, agent workflow에도 사용할 수 있는 자동화 API로 설명됩니다. Playwright best practices는 resilient test를 위해 user-facing attributes와 explicit contracts를 우선하라고 권장합니다. CSS class나 DOM 구조에 과도하게 의존한 selector는 디자인 변경 때 쉽게 깨집니다. 반대로 role이나 text, test id 같은 명시 계약은 의도를 드러냅니다.

테스트 환경도 구분해야 합니다. Unit test는 Node-like 환경에서 빠르게 실행될 수 있고, component test는 DOM simulation이나 browser-like 환경을 사용할 수 있으며, e2e test는 실제 dev server와 browser를 요구합니다. CI에서는 이 차이가 비용과 시간으로 나타납니다. 모든 PR에서 어떤 테스트를 반드시 돌릴지, nightly나 release 전에는 어떤 e2e를 돌릴지 분리할 수 있습니다.

AI 코딩 루프에서는 테스트 실패 메시지가 작업 지시가 됩니다. “버튼이 클릭되지 않는다”보다 “role button, name 저장하기가 enabled가 되지 않는다”가 훨씬 좋습니다. 테스트가 사용자 행동과 기대 결과를 명확히 적으면 AI도 실패 원인을 좁혀 수정하기 쉽습니다.

```ts
// Playwright 스타일의 e2e smoke test 예시
import { expect, test } from "@playwright/test"

test("커리큘럼에서 첫 강의로 이동한다", async ({ page }) => {
  await page.goto("/curriculum")
  await page.getByRole("link", { name: /시작하기/ }).click()
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
})
```

## 원문으로 읽기

Vitest의 목적을 가장 짧게 보여주는 문장은 다음입니다.

> "Vitest was created to make testing just work for Vite apps."

이 문장은 Vitest를 단순한 assertion 라이브러리로 보지 말고, Vite 앱 개발 흐름 안에서 테스트를 자연스럽게 돌리기 위한 runner로 이해하게 해줍니다. Vite 설정과 transform 흐름을 쓰는 프로젝트에서는 테스트 환경이 앱 환경과 크게 어긋나지 않는 것이 중요합니다.

> "Jest-compatible"

이 표현은 기존 테스트 생태계와의 연결을 보여줍니다. 이미 Jest 스타일의 `expect`나 mocking에 익숙한 팀이라면 Vitest 전환 비용을 줄일 수 있습니다. 초보자에게는 “새로운 세계를 완전히 다시 배우는 것”이 아니라 familiar API로 시작할 수 있다는 뜻입니다.

Testing Library의 철학은 다음 문장으로 요약됩니다.

> "The more your tests resemble the way your software is used"

이 문장은 UI 테스트가 내부 구현보다 사용자 행동에 가까워져야 한다는 기준입니다. 버튼이 어떤 state variable을 바꾸는지보다, 사용자가 클릭했을 때 화면이 어떻게 바뀌는지 확인하는 편이 더 의미 있습니다.

Playwright의 범위는 다음 문장에서 드러납니다.

> "Playwright enables reliable web automation for testing, scripting, and AI agents."

이 문장은 Playwright가 단지 QA 팀만의 도구가 아니라 개발 workflow와 AI agent 검증에도 연결될 수 있음을 보여줍니다. 브라우저를 실제로 조작할 수 있다는 것은 AI가 만든 UI를 자동으로 확인하는 기반이 됩니다.

> "Locators come with auto waiting and retry-ability."

이 문장은 Playwright locator가 왜 중요한지 설명합니다. UI는 즉시 준비되지 않을 수 있습니다. locator 기반 테스트는 요소가 action 가능한 상태가 될 때까지 기다리는 구조를 제공하므로, 단순 query보다 안정적입니다.

## 실전에서

실무에서는 먼저 테스트 대상의 위험도를 나눕니다. 버튼 label을 계산하는 작은 helper는 unit test로 충분합니다. 여러 state가 얽힌 component는 Testing Library 원칙으로 사용자 행동을 확인합니다. 로그인, 결제, 강의 완료 처리처럼 제품 핵심 흐름은 Playwright e2e로 검증합니다. 이 분류 없이 “테스트를 많이 쓰자”라고만 하면 느리고 깨지기 쉬운 테스트가 늘어납니다.

두 번째로 acceptance criteria를 테스트 언어로 바꿉니다. “검색 기능 잘 되게”는 테스트가 아닙니다. “검색창에 RAG를 입력하면 RAG 용어와 관련 강의 링크가 표시된다”는 테스트가 됩니다. AI에게 UI를 만들게 할 때도 이 기준을 먼저 적으면, AI가 결과물을 만든 뒤 테스트로 확인할 수 있습니다.

세 번째로 selector 정책을 정합니다. 사용자에게 보이는 role, label, text를 우선하고, 꼭 필요한 경우에만 explicit test id를 둡니다. CSS class나 DOM depth에 의존하면 Tailwind class 정리나 layout refactor 때 테스트가 불필요하게 깨집니다. 테스트는 구현의 족쇄가 아니라 사용자 계약의 감시자여야 합니다.

네 번째로 CI 실행 시간을 관리합니다. 모든 commit에서 unit test와 typecheck를 돌리고, 주요 PR에서는 component/e2e smoke를 돌리는 식으로 나눌 수 있습니다. e2e 전체 세트를 매번 돌리면 비용이 커질 수 있으므로, 핵심 route 중심의 smoke와 release 전 전체 회귀 테스트를 분리합니다.

> [!TIP]
> AI에게 테스트를 만들게 할 때는 먼저 사용자의 행동을 문장으로 쓰게 한 뒤, 그 문장을 role과 visible text 기반 테스트로 바꾸게 하면 implementation detail에 묶일 가능성이 줄어듭니다.

## 한계와 트레이드오프

테스트는 버그를 줄이지만, 테스트 자체도 유지보수 대상입니다. 너무 내부 구현에 묶인 테스트는 작은 refactor마다 깨져 개발 속도를 늦춥니다. 반대로 테스트가 너무 넓고 느리면 실패 원인이 흐려지고 CI 비용이 커집니다. 좋은 전략은 모든 것을 한 종류의 테스트로 해결하려 하지 않고, 실패 비용과 실행 비용을 함께 보는 것입니다.

Unit test는 빠르지만 실제 브라우저 문제를 놓칠 수 있습니다. Component test는 사용자 행동에 가까우나 network, routing, browser engine 차이를 모두 재현하지는 않습니다. E2E test는 confidence가 크지만 느리고 flaky해질 수 있습니다. locator와 explicit contract를 잘 쓰고, 테스트 데이터를 안정적으로 관리해야 합니다.

AI 시대의 한계도 있습니다. AI가 만든 테스트는 구현을 따라 쓴 “거울 테스트”가 될 수 있습니다. 코드가 잘못됐는데 테스트도 같은 잘못된 가정을 복사하면 둘 다 통과합니다. 그래서 테스트 생성 전에 사람이 acceptance criteria를 분명히 세우고, edge case를 포함해야 합니다. AI가 테스트를 써도 무엇을 검증할지는 사람이 설계해야 합니다.

또한 테스트 통과는 완전한 품질 보장이 아닙니다. 성능, 접근성, 보안, 실제 사용자 환경, 네트워크 불안정성은 별도 관찰과 검증이 필요할 수 있습니다. 테스트는 품질 시스템의 핵심 부품이지만 전부는 아닙니다. 오류 추적, 로그, 모니터링, 사용자 피드백과 함께 봐야 합니다.

## 더 읽기

이 강의의 근거는 Vitest 공식 사이트, Testing Library Guiding Principles, Playwright와 Playwright Best Practices입니다. 먼저 Vitest 문서에서 test runner가 프로젝트 설정과 어떻게 연결되는지 보고, Testing Library 원칙에서 사용자 중심 query가 왜 중요한지 읽어보세요. 그 다음 Playwright 문서에서 locator와 browser automation의 역할을 확인하면 전체 그림이 잡힙니다.

다음 학습으로는 `production-env-and-secrets`도 중요합니다. 테스트가 로컬과 CI에서 안정적으로 돌려면 환경변수와 secret을 안전하게 주입해야 합니다. 또한 이후 `ai-assisted-testing-loop`로 넘어가면 AI가 테스트를 생성하고 실패를 해석하며 수정까지 반복하는 루프를 설계하게 됩니다.

복습 질문입니다.

- Unit test, component test, e2e test는 각각 어떤 불안을 줄이는가?
- Testing Library가 사용자 사용 방식과 닮은 테스트를 강조하는 이유는 무엇인가?
- Playwright locator의 auto waiting과 retry-ability는 어떤 문제를 줄이는가?
- AI가 만든 테스트를 그대로 믿으면 어떤 위험이 있는가?
- 프론트엔드 테스트 전략에서 빠른 feedback과 높은 confidence를 어떻게 나눌 것인가?
