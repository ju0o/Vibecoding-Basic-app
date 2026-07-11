---
id: frontend-testing-basics
title: "프론트엔드 테스트 기초 (Frontend Testing Basics)"
topicGroup: T03
status: approved
score: 90
level: 중급
prerequisites: [react-state-effects]
successors: [ai-assisted-testing-loop]
related: [typescript-type-system, react-component-model]
consumers:
  lessons: [frontend-testing-basics]
  glossary: [Frontend Test, Test Runner, Vitest, Testing Library, Playwright, Locator]
sources:
  - { title: "Vitest", url: "https://vitest.dev/", checked: 2026-07-11 }
  - { title: "Testing Library — Guiding Principles", url: "https://testing-library.com/docs/guiding-principles/", checked: 2026-07-11 }
  - { title: "Playwright", url: "https://playwright.dev/", checked: 2026-07-11 }
  - { title: "Playwright — Best Practices", url: "https://playwright.dev/docs/best-practices", checked: 2026-07-11 }
updated: 2026-07-11
---

## 정의
프론트엔드 테스트는 UI 코드가 사용자가 기대하는 방식으로 렌더링·상호작용·탐색되는지 확인하는 절차다. Vitest는 Vite 앱 테스트를 위해 만들어진 test runner이고, Testing Library는 사용자가 웹 페이지를 쓰는 방식과 닮은 테스트를 권장하며, Playwright는 브라우저 자동화를 통해 end-to-end 테스트를 수행한다. (출처: https://vitest.dev/, https://testing-library.com/docs/guiding-principles/, https://playwright.dev/, 확인: 2026-07-11)

## 역사
프론트엔드 테스트는 단일 함수 검증에서 component behavior와 browser-level flow 검증으로 확장됐다. 2026-07-11 확인 기준 Vitest는 Vite config와 transform pipeline 재사용을 강조하고, Testing Library는 사용자 사용 방식과 닮은 테스트 원칙을 제시하며, Playwright는 Chromium, Firefox, WebKit을 하나의 API로 구동한다고 설명한다. (출처: https://vitest.dev/, https://testing-library.com/docs/guiding-principles/, https://playwright.dev/, 확인: 2026-07-11)

## 해결하려는 문제
UI는 코드가 컴파일되어도 깨질 수 있다. 버튼이 렌더링되지만 클릭이 안 되거나, state update가 예상과 다르거나, 라우팅은 되지만 실제 브라우저에서 hydration 문제가 생길 수 있다. 프론트엔드 테스트는 unit/component/e2e 레벨을 나누어 이런 문제를 배포 전에 발견하게 한다. (출처: https://vitest.dev/, https://testing-library.com/docs/guiding-principles/, https://playwright.dev/docs/best-practices, 확인: 2026-07-11)

## 핵심 개념
1. **Test runner**: Vitest는 Vite 위에 구축되어 Vite config, resolve, transform pipeline을 재사용할 수 있다고 설명한다. (출처: https://vitest.dev/, 확인: 2026-07-11)
2. **User-centered query**: Testing Library는 사용자가 소프트웨어를 쓰는 방식과 닮은 테스트가 더 큰 confidence를 준다는 원칙을 제시한다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-11)
3. **End-to-end automation**: Playwright는 Chromium, Firefox, WebKit을 하나의 API로 구동해 tests, scripts, agent workflows에 사용할 수 있다고 설명한다. (출처: https://playwright.dev/, 확인: 2026-07-11)
4. **Locator**: Playwright best practices는 locator가 auto waiting과 retry-ability를 가진다고 설명한다. (출처: https://playwright.dev/docs/best-practices, 확인: 2026-07-11)
5. **User-facing attributes**: Playwright는 resilient test를 위해 user-facing attributes와 explicit contracts를 우선하라고 권고한다. (출처: https://playwright.dev/docs/best-practices, 확인: 2026-07-11)

## 관련 기술
- TypeScript: 테스트 코드도 input/output shape를 타입으로 고정할 수 있다. (출처: https://vitest.dev/, 확인: 2026-07-11)
- React state/effects: state 변화와 effect가 사용자 행동 뒤에 어떻게 반영되는지 component test와 e2e test에서 확인한다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-11)
- Playwright browser automation: 실제 browser engine에서 navigation, click, form, rendering을 확인한다. (출처: https://playwright.dev/, 확인: 2026-07-11)

## 선행 개념
- react-state-effects: UI test는 state update, event handler, effect synchronization을 이해해야 결과를 해석할 수 있다.

## 후행 개념
- ai-assisted-testing-loop: AI가 생성한 테스트와 사람이 정의한 acceptance criteria를 연결하는 루프를 설계할 수 있다.
- ai-code-review-tools: 테스트 결과와 diff를 함께 읽어 AI 코드 리뷰의 근거로 쓸 수 있다.

## AI 시대에서의 의미
AI가 만든 UI 코드는 빠르게 보일 수 있지만, 사용자가 실제로 클릭하고 입력하는 흐름은 테스트로 확인해야 한다. Testing Library와 Playwright의 user-centered 원칙은 AI가 내부 구현 세부를 맞춘 것처럼 보이는 테스트보다 사용자 행동을 재현하는 테스트를 우선하게 만든다. (출처: https://testing-library.com/docs/guiding-principles/, https://playwright.dev/docs/best-practices, 확인: 2026-07-11)

## 실무 활용
1. **Unit/component test**: Vitest로 pure function, formatting logic, component helper를 빠르게 검증한다. (출처: https://vitest.dev/, 확인: 2026-07-11)
2. **User behavior test**: Testing Library 원칙에 따라 button text, label, role 등 사용자에게 보이는 단서를 기준으로 component interaction을 확인한다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-11)
3. **E2E smoke test**: Playwright로 주요 route와 click flow를 browser에서 검증하고 locator auto waiting/retry-ability를 활용한다. (출처: https://playwright.dev/, https://playwright.dev/docs/best-practices, 확인: 2026-07-11)

```ts
import { expect, test } from "vitest"

function progressLabel(done: boolean) {
  return done ? "완료" : "학습 전"
}

test("progress label", () => {
  expect(progressLabel(true)).toBe("완료")
})
```

## FAQ
Q: unit test와 e2e test 중 하나만 있으면 되는가?
A: 아니다. Vitest 같은 runner는 작은 단위를 빠르게 확인하고, Playwright는 browser-level flow를 확인한다. 서로 다른 실패를 잡는다. (출처: https://vitest.dev/, https://playwright.dev/, 확인: 2026-07-11)

Q: 테스트는 implementation detail을 봐야 하는가?
A: Testing Library는 사용자가 소프트웨어를 쓰는 방식과 닮은 테스트를 강조한다. 가능한 한 사용자에게 보이는 결과와 상호작용을 우선한다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-11)

Q: Playwright locator는 왜 중요한가?
A: Playwright locator는 auto waiting과 retry-ability가 있어 element가 visible/enabled가 될 때까지 기다리는 등 actionability check를 수행한다. (출처: https://playwright.dev/docs/best-practices, 확인: 2026-07-11)

## 자주 하는 실수
1. **내부 state만 검사**: 사용자가 보는 결과와 분리된 내부 변수만 검사하면 refactor에 약하다. 사용자 행동과 결과 중심으로 바꾼다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-11)
2. **E2E만 과도하게 작성**: 모든 것을 browser test로만 확인하면 느리고 불안정할 수 있다. 작은 로직은 Vitest 같은 runner로 분리한다. (출처: https://vitest.dev/, https://playwright.dev/, 확인: 2026-07-11)
3. **불안정한 selector 사용**: Playwright는 user-facing attributes와 explicit contracts를 우선하라고 권고한다. CSS 구조에 과하게 의존한 selector를 줄인다. (출처: https://playwright.dev/docs/best-practices, 확인: 2026-07-11)

## 공식 출처
- Vitest의 Vite-native test runner 구조 — [Vitest](https://vitest.dev/) (확인 날짜: 2026-07-11)
- 사용자 사용 방식과 닮은 테스트 원칙 — [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/) (확인 날짜: 2026-07-11)
- Browser automation API — [Playwright](https://playwright.dev/) (확인 날짜: 2026-07-11)
- Locator, auto waiting, user-facing attributes — [Playwright — Best Practices](https://playwright.dev/docs/best-practices) (확인 날짜: 2026-07-11)

## Quote Bank
- > "Vitest was created to make testing just work for Vite apps."
  - 출처: [Vitest](https://vitest.dev/) (확인: 2026-07-11)
  - 맥락: Vitest의 목적을 설명할 때 사용한다.
- > "Jest-compatible"
  - 출처: [Vitest](https://vitest.dev/) (확인: 2026-07-11)
  - 맥락: 기존 테스트 생태계와의 관계를 설명할 때 사용한다.
- > "The more your tests resemble the way your software is used"
  - 출처: [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/) (확인: 2026-07-11)
  - 맥락: user-centered testing 원칙을 설명할 때 사용한다.
- > "Playwright enables reliable web automation for testing, scripting, and AI agents."
  - 출처: [Playwright](https://playwright.dev/) (확인: 2026-07-11)
  - 맥락: browser automation의 범위를 설명할 때 사용한다.
- > "Locators come with auto waiting and retry-ability."
  - 출처: [Playwright — Best Practices](https://playwright.dev/docs/best-practices) (확인: 2026-07-11)
  - 맥락: locator를 쓰는 이유를 설명할 때 사용한다.

## 변경 이력
- 2026-07-11: 최초 작성 (Codex, P-01)
