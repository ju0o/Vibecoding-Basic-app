## 한 줄 정의

AI 보조 테스트 루프는 AI에게 테스트 초안을 만들게 한 뒤, 사람이 요구사항·edge case·사용자 행동·실행 결과를 검토하고, 실패 정보를 다시 prompt나 코드 수정으로 되돌리는 반복 검증 절차입니다. GitHub Copilot test 문서는 다양한 scenario와 edge case를 다루도록 요청하는 방향을 제시하고, Playwright와 Testing Library는 사용자 행동과 action/assertion 중심의 테스트를 강조합니다. ==AI 보조 테스트의 핵심은 테스트 파일을 많이 만드는 것이 아니라, 변경 위험을 막는 behavior를 검증 가능한 형태로 고정하는 것==입니다.

이 강의는 구현 루프의 검증 단계를 더 깊게 다룹니다. AI가 코드를 만들 수 있다면 AI가 테스트 초안도 만들 수 있습니다. 하지만 AI-generated test가 있다고 해서 품질이 보장되지는 않습니다. 테스트가 실제 요구사항을 확인하는지, happy path만 보는지, flaky wait를 숨기고 있지는 않은지, 실패했을 때 어떤 feedback으로 돌아가는지 봐야 합니다.

바이브코딩에서 테스트 루프는 두 가지 불안을 줄입니다. 첫째, AI가 만든 구현이 의도한 behavior를 만족하는지 확인합니다. 둘째, 나중에 같은 문제가 돌아오지 않도록 regression case를 남깁니다. 즉 테스트는 AI를 감시하는 장치이면서 동시에 다음 AI 작업에 줄 수 있는 명확한 evidence입니다.

## 왜 존재하는가

AI와 함께 구현하면 첫 결과가 빠르게 나옵니다. 그러나 빠른 구현은 빠른 검증 없이는 위험합니다. AI가 정상 입력 하나만 보고 코드를 만들었을 수 있고, 사람이 눈으로 확인한 화면이 실제 edge case를 막지 못할 수 있습니다. AI 보조 테스트 루프는 이 문제를 해결하기 위해 존재합니다. 요구사항을 scenario로 바꾸고, AI가 test draft를 만들고, 사람이 behavior coverage를 검토하고, 실행 결과를 다음 수정 입력으로 돌립니다.

GitHub Copilot test 문서는 wide range of scenarios, edge cases, exception handling, data validation 같은 요구를 prompt에 포함하는 방향을 제시합니다. 이 말은 AI에게 "테스트 만들어줘"라고만 하는 것이 부족하다는 뜻입니다. 어떤 scenario를 다뤄야 하는지 사람이 먼저 정해야 합니다. ==테스트 루프의 품질은 AI의 test generation 능력보다 사람이 제공한 scenario와 edge case의 선명도에 크게 좌우됩니다==.

Testing Library와 Playwright의 원칙은 AI 테스트 검토에 중요한 기준이 됩니다. Testing Library는 테스트가 software 사용 방식과 닮을수록 confidence를 준다고 설명합니다. Playwright는 action을 수행하고 expectation으로 상태를 assert하는 구조를 보여줍니다. 그래서 AI가 만든 테스트를 볼 때는 내부 구현을 많이 아는 테스트인지, 사용자가 실제로 보는 role, text, label, locator를 중심으로 한 테스트인지 확인해야 합니다.

또 하나의 문제는 flaky test입니다. AI가 timeout이나 manual wait를 추가해 race condition을 숨길 수 있습니다. Playwright는 actionability check와 auto-waiting을 제공하므로, 사용자는 sleep을 늘리는 대신 locator와 web-first assertion을 검토해야 합니다. 테스트가 불안정하면 검증 루프가 오히려 noise가 됩니다.

## 작동 원리

### 1. 변경 위험을 test scenario로 바꾼다

테스트 루프는 코드가 아니라 위험에서 시작합니다. 앞 강의에서 배운 code change risk analysis는 어떤 변경이 auth, API, data, UI, dependency, config 같은 영역을 건드렸는지 봅니다. 이 위험을 test scenario로 바꾸는 것이 첫 단계입니다. 예를 들어 empty state 변경은 "결과가 0개일 때 안내 문구가 보인다"로, session 변경은 "만료된 session이면 접근이 거부된다"로 바뀝니다.

AI에게 테스트를 요청할 때도 이 scenario가 필요합니다. "테스트 작성해줘"가 아니라 "정상 입력, 빈 값, 잘못된 타입, 권한 없음, network error를 포함한 테스트 matrix를 먼저 제안하라"처럼 요청합니다. ==테스트 초안은 요구사항을 모르는 AI가 발명하는 것이 아니라, 사람이 정한 scenario를 코드로 옮기는 작업==입니다.

### 2. AI가 test draft를 만든다

Scenario가 정해지면 AI는 테스트 초안을 빠르게 만들 수 있습니다. Unit test, component test, E2E test 중 어떤 형태가 적절한지는 변경의 성격에 따라 다릅니다. 작은 함수나 validation logic은 Vitest 같은 runner로 확인할 수 있고, 사용자의 browser flow는 Playwright test로 확인할 수 있습니다. UI component는 Testing Library 원칙처럼 사용자가 소프트웨어를 쓰는 방식과 닮게 테스트해야 합니다.

이때 AI test draft는 완성물이 아니라 검토 대상입니다. 테스트 이름이 요구사항을 말하는지, assertion이 실제 behavior를 확인하는지, mock이 너무 많이 내부 구현을 고정하지 않는지 봅니다. 테스트가 통과해도 의미 없는 assertion이면 품질을 올리지 못합니다.

### 3. 사람은 behavior coverage를 검토한다

AI가 만든 테스트를 검토할 때는 "몇 개나 만들었는가"보다 "무엇을 막는가"를 봅니다. Happy path만 있으면 실패 비용이 큰 edge case가 빠질 수 있습니다. Exception handling, data validation, empty input, permission failure, network failure 같은 scenario가 필요한지 확인합니다. GitHub Copilot test KB가 range of scenarios를 강조하는 이유가 여기에 있습니다.

테스트는 implementation detail보다 behavior를 확인해야 합니다. Testing Library 원칙에 따르면 테스트는 소프트웨어가 사용되는 방식과 닮을수록 confidence를 줍니다. 따라서 AI가 CSS class나 내부 state variable만 확인하는 테스트를 만들었다면, role, label, visible text, user action 중심으로 바꿔야 합니다.

### 4. 실행 결과를 feedback으로 되돌린다

Vitest CLI의 `vitest run`은 watch mode 없이 test suite를 한 번 실행할 수 있습니다. 이런 반복 가능한 명령은 CI와 검증 루프에 중요합니다. 테스트가 실패하면 실패 메시지, 파일, assertion, 기대값과 실제값을 다음 prompt에 제공합니다. AI에게 "고쳐줘"라고만 하지 않고, 실패한 behavior와 유지해야 할 scope를 함께 줍니다.

실패는 두 종류일 수 있습니다. 구현이 틀려서 테스트가 실패할 수 있고, 테스트가 요구사항을 잘못 이해해서 실패할 수도 있습니다. 사람은 어느 쪽인지 판단해야 합니다. 테스트 루프는 code fix와 test fix를 모두 포함하지만, 테스트를 구현에 맞춰 약하게 바꾸는 방향으로 흐르면 안 됩니다.

### 5. 안정성 기준을 적용한다

Playwright는 actionability checks가 통과할 때까지 auto-wait한 뒤 action을 수행한다고 설명합니다. 이 원칙은 AI가 만든 E2E test를 검토할 때 중요합니다. `setTimeout`이나 무작정 긴 sleep이 있으면 테스트가 느리고 불안정해질 수 있습니다. Locator와 assertion이 상태를 기다리게 해야 합니다.

테스트 루프의 마지막은 regression 고정입니다. 한 번 발견한 bug를 test case로 남기면 다음 구현 루프에서 같은 문제가 다시 생겼을 때 빠르게 잡을 수 있습니다. AI가 만든 수정도 이 regression test를 통과해야 합니다.

```ts
import { describe, expect, test } from "vitest"

type SignupInput = {
  email: string
  password: string
}

function validateSignup(input: SignupInput): string[] {
  const errors: string[] = []

  if (!input.email.includes("@")) {
    errors.push("email must include @")
  }

  if (input.password.length < 8) {
    errors.push("password must be at least 8 characters")
  }

  return errors
}

describe("validateSignup", () => {
  test.each([
    { name: "valid input", input: { email: "user@example.com", password: "12345678" }, errors: [] },
    {
      name: "invalid email",
      input: { email: "user.example.com", password: "12345678" },
      errors: ["email must include @"],
    },
    {
      name: "short password",
      input: { email: "user@example.com", password: "123" },
      errors: ["password must be at least 8 characters"],
    },
  ])("$name", ({ input, errors }) => {
    expect(validateSignup(input)).toEqual(errors)
  })
})
```

이 예시는 AI에게 줄 수 있는 test matrix의 모양을 보여줍니다. 정상 입력 하나만 확인하지 않고 invalid email과 short password를 분리합니다. 실제 프로젝트에서는 요구사항과 risk analysis에 따라 scenario를 더 늘리거나 UI/E2E test로 옮깁니다.

## 스펙과 세부

### Scenario prompt는 테스트 품질의 시작점이다

AI에게 테스트를 요청할 때는 scenario, edge case, exception handling, data validation을 명시해야 합니다. GitHub Copilot test 문서가 range of scenarios를 말하는 이유는 AI가 사용자의 의도를 자동으로 완벽히 알 수 없기 때문입니다. Prompt에 scenario가 없으면 AI는 일반적인 happy path를 만들 가능성이 커집니다.

좋은 scenario prompt는 변경 목적과 연결됩니다. "이 함수 테스트해줘"보다 "회원가입 validation에서 정상 email, 잘못된 email, 짧은 password, 빈 값, 이미 존재하는 email error를 나누어 테스트하라"가 좋습니다. 테스트는 요구사항의 언어를 코드로 고정하는 작업입니다.

### User-like test는 confidence를 만든다

Testing Library의 guiding principle은 테스트가 소프트웨어 사용 방식과 닮을수록 confidence를 준다는 것입니다. 이 원칙은 UI 테스트에서 특히 중요합니다. 사용자는 state variable이나 CSS class를 보지 않습니다. 사용자는 버튼 label, input label, visible text, navigation result를 봅니다.

AI가 만든 테스트가 내부 구현을 과도하게 확인하면 refactor에 취약해질 수 있습니다. 반대로 user-like test는 구현이 바뀌어도 사용자 계약이 유지되는지 확인합니다. 그래서 AI test draft를 볼 때 "이 테스트는 사용자가 실제로 보는 것을 검증하는가"를 묻습니다.

### Playwright의 action/assertion 구조와 auto-waiting

Playwright test는 action을 수행하고 expectation으로 state를 assert하는 구조입니다. 또한 actionability check를 통과할 때까지 auto-wait합니다. 이 구조는 AI가 만든 manual wait를 줄이는 기준이 됩니다. 무작정 기다리는 테스트보다 locator와 assertion이 상태를 기다리는 테스트가 더 안정적입니다.

E2E test에서 flaky failure가 반복되면 AI에게 timeout을 늘리라고 하기 전에 locator, assertion, loading state, navigation wait를 먼저 검토해야 합니다. 테스트 안정성은 속도만의 문제가 아니라 신뢰성의 문제입니다.

### Vitest run은 반복 가능한 검증 명령이다

Vitest CLI의 `vitest run`은 watch mode 없이 single run을 수행합니다. CI나 P-06 같은 검증 루프에서는 이처럼 한 번 실행하고 종료하는 명령이 필요합니다. Watch mode는 개발 중 feedback에는 편하지만 자동 검증에는 적합하지 않을 수 있습니다.

AI 보조 테스트 루프에서 실행 명령은 prompt에도 들어갑니다. "이 테스트를 추가하고 `vitest run` 결과를 보고하라"처럼 요청하면 AI나 agent가 어떤 observation을 만들어야 하는지 분명해집니다. 실행 결과는 다음 feedback prompt의 핵심 근거가 됩니다.

## 원문으로 읽기

> "cover a range of scenarios"
>
> — 다양한 시나리오를 다룬다.
> [GitHub Docs — Writing tests with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/write-tests)

이 문장은 AI 테스트 요청의 핵심입니다. 테스트는 정상 입력 하나만 확인하는 것이 아니라 요구사항의 여러 모서리를 다뤄야 합니다. AI에게도 어떤 scenario를 포함해야 하는지 명시해야 합니다.

> "You don't need to add manual waits"
>
> — 수동 wait를 추가할 필요가 없다.
> [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests)

E2E 테스트에서 흔한 실수를 막는 문장입니다. AI가 실패를 피하려고 sleep을 넣는다면, 이 원칙을 기준으로 다시 검토해야 합니다. Playwright는 locator와 assertion 중심의 기다림을 제공합니다.

> "auto-waits for all the relevant checks"
>
> — 관련 검사가 모두 통과할 때까지 자동으로 기다린다.
> [Playwright Docs — Auto-waiting](https://playwright.dev/docs/actionability)

Playwright의 안정성 원리를 설명합니다. Actionability check가 있기 때문에 테스트는 요소가 실제로 상호작용 가능한 상태인지 기다릴 수 있습니다. AI-generated E2E test에서 manual wait보다 이 구조를 우선해야 합니다.

> "resemble the way your software is used"
>
> — 소프트웨어가 사용되는 방식과 닮아야 한다.
> [Testing Library Docs — Guiding Principles](https://testing-library.com/docs/guiding-principles/)

테스트가 무엇을 확인해야 하는지 알려주는 기준입니다. 내부 구현을 맞추는 테스트보다 사용자가 보는 동작을 확인하는 테스트가 더 실질적인 confidence를 줍니다. AI test draft를 검토할 때 이 문장을 기준으로 삼습니다.

> "Perform a single run without watch mode"
>
> — watch mode 없이 단일 실행을 수행한다.
> [Vitest Docs — Command Line Interface](https://vitest.dev/guide/cli)

반복 검증 명령의 의미를 보여줍니다. AI 보조 테스트 루프에서는 실행 결과를 observation으로 받아야 하므로, 한 번 실행하고 종료하는 명령이 중요합니다. CI와 release verification에도 같은 원리가 적용됩니다.

## 실전에서

### AI에게 test matrix부터 요청한다

바로 테스트 파일을 만들게 하지 말고 먼저 matrix를 요청합니다. 정상 입력, 빈 값, 잘못된 타입, 권한 없음, network error, loading state, empty state 같은 scenario를 나열하게 합니다. 사람이 matrix를 검토한 뒤 테스트 코드를 만들게 하면 누락이 줄어듭니다.

### 사용자 중심 selector를 요구한다

UI 테스트에서는 role, label, visible text, locator 중심으로 작성하게 합니다. 내부 class name이나 implementation detail을 확인하는 테스트는 refactor에 약할 수 있습니다. Testing Library와 Playwright 원칙을 기준으로 AI draft를 검토합니다.

### 실패 로그를 feedback으로 바꾼다

테스트가 실패하면 실패한 assertion과 실제/기대 값을 다음 prompt에 넣습니다. "이 테스트를 통과하게 해줘"가 아니라 "이 behavior가 요구사항이며, 테스트가 이 assertion에서 실패했다. 구현을 수정하되 test assertion을 약화하지 말라"처럼 요청합니다.

### 위험한 변경에는 regression test를 남긴다

AI review comment나 risk analysis에서 발견된 문제는 regression test로 고정합니다. 한 번 고친 bug가 다시 생기지 않게 하려면 test가 그 behavior를 계속 확인해야 합니다. 이때 test 이름에는 bug의 조건이 드러나야 합니다.

```text
AI 보조 테스트 루프:
1. 변경 위험을 scenario로 나눈다.
2. AI에게 test matrix를 먼저 요청한다.
3. 사람이 scenario 누락과 user-like 기준을 검토한다.
4. AI가 test draft를 작성한다.
5. vitest run 또는 Playwright 실행 결과를 확인한다.
6. 실패를 code/test feedback으로 돌린다.
7. regression case로 남긴다.
```

## 한계와 트레이드오프

첫 번째 한계는 AI-generated test의 착시입니다. 테스트 파일이 많아도 요구사항을 잘못 검증하면 품질이 올라가지 않습니다. 개수보다 behavior coverage가 중요합니다. 사람이 scenario와 assertion을 검토해야 합니다.

두 번째 한계는 테스트가 구현을 고정할 수 있다는 점입니다. 내부 함수명, CSS 구조, state variable에 너무 의존하면 작은 refactor에도 테스트가 깨집니다. User-like test 원칙은 이 위험을 줄이는 기준입니다.

세 번째 trade-off는 속도와 깊이입니다. AI가 테스트 초안을 빠르게 만들면 시작은 빨라집니다. 하지만 edge case 검토와 flaky test 제거에는 시간이 필요합니다. 빠른 draft를 빠른 채택으로 오해하지 않아야 합니다.

네 번째 한계는 실패 해석입니다. 테스트 실패가 구현 문제인지 테스트 문제인지 AI가 항상 정확히 구분하지 못할 수 있습니다. 사람이 요구사항과 failure message를 읽고 어느 쪽을 수정할지 결정해야 합니다.

## 더 읽기

이 강의의 근거 KB는 `ai-assisted-testing-loop`입니다. 먼저 GitHub의 Writing tests with Copilot 문서에서 AI에게 scenario와 edge case를 구체적으로 요청하는 흐름을 읽으세요. 다음으로 Testing Library guiding principles에서 user-like test의 기준을 확인합니다. Playwright writing tests와 auto-waiting 문서를 읽으면 action/assertion 구조와 manual wait를 피하는 기준을 잡을 수 있습니다. 마지막으로 Vitest CLI 문서에서 `vitest run`이 반복 가능한 단일 실행 명령으로 쓰이는 의미를 확인하세요.

다음 학습 흐름은 `reviewing-ai-output` 또는 `incident-style-ai-debugging`입니다. 테스트 루프를 이해하면 AI가 만든 코드와 테스트를 review하는 기준이 더 분명해지고, 실패한 test를 장애 대응처럼 좁히는 작업으로 이어질 수 있습니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다. 본문은 승인 KB의 GitHub Copilot, Playwright, Testing Library, Vitest 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 Vitest 형태의 독립 test matrix 예시입니다.
