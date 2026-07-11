---
id: ai-assisted-testing-loop
title: "AI 보조 테스트 루프 (AI-assisted Testing Loop)"
topicGroup: T12
status: approved
score: 90
level: 중급
prerequisites: [frontend-testing-basics, prompt-engineering]
successors: []
related: [human-ai-collaboration-patterns, code-change-risk-analysis, ai-code-review-tools]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "GitHub Docs — Writing tests with GitHub Copilot", url: "https://docs.github.com/en/copilot/tutorials/write-tests", checked: 2026-07-12 }
  - { title: "Playwright Docs — Writing tests", url: "https://playwright.dev/docs/writing-tests", checked: 2026-07-12 }
  - { title: "Playwright Docs — Auto-waiting", url: "https://playwright.dev/docs/actionability", checked: 2026-07-12 }
  - { title: "Testing Library Docs — Guiding Principles", url: "https://testing-library.com/docs/guiding-principles/", checked: 2026-07-12 }
  - { title: "Vitest Docs — Command Line Interface", url: "https://vitest.dev/guide/cli", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
AI 보조 테스트 루프는 AI가 테스트 후보를 만들고 사람이 요구사항·edge case·실행 결과를 검토한 뒤 실패를 다시 수정 요청으로 되돌리는 반복 검증 절차다. GitHub Copilot 문서는 tests가 여러 scenario와 edge case를 다루도록 구체적으로 요청하라고 설명하고, Playwright는 action과 assertion으로 상태를 검증하는 test 구조를 설명한다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

## 역사
자동화 테스트는 unit test, integration test, end-to-end test 도구로 발전해 왔다. AI 도구가 test generation을 보조하게 되면서 테스트 작성의 첫 초안을 빠르게 만들 수 있게 되었지만, Testing Library와 Playwright 문서는 여전히 사용자가 소프트웨어를 쓰는 방식과 안정적인 action/assertion을 기준으로 테스트를 작성하라고 안내한다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, https://testing-library.com/docs/guiding-principles/, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

## 해결하려는 문제
AI가 만든 코드나 사람이 빠르게 만든 변경은 happy path만 통과할 수 있다. AI 보조 테스트 루프는 요구사항을 test case로 바꾸고, edge case와 data validation을 포함하며, 실행 결과를 다시 prompt나 code fix로 돌려 regression을 줄인다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, https://vitest.dev/guide/cli, 확인: 2026-07-12)

## 핵심 개념
1. **Scenario prompt**: Copilot test 문서는 wide range of scenarios, edge cases, exception handling, data validation을 prompt에 포함한 예시를 제시한다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, 확인: 2026-07-12)
2. **User-like tests**: Testing Library는 tests가 software 사용 방식과 닮을수록 confidence를 준다는 원칙을 제시한다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-12)
3. **Action/assertion loop**: Playwright tests는 actions를 수행하고 state를 expectation으로 assert하는 방식으로 설명된다. (출처: https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)
4. **Auto-waiting**: Playwright는 actionability checks가 통과할 때까지 auto-wait한 뒤 action을 수행한다. 이는 AI가 만든 flaky wait를 줄이는 기준이 된다. (출처: https://playwright.dev/docs/actionability, 확인: 2026-07-12)
5. **Repeatable command**: Vitest CLI에서 `vitest run`은 watch mode 없이 한 번 test suite를 실행한다. CI나 검증 루프에서는 반복 가능한 단일 실행 명령이 필요하다. (출처: https://vitest.dev/guide/cli, 확인: 2026-07-12)

## 관련 기술
- Frontend testing basics: role, label, locator, assertion, test runner의 기본 개념이 필요하다. (출처: https://testing-library.com/docs/guiding-principles/, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)
- Code change risk analysis: 위험한 변경일수록 더 많은 edge case와 regression test가 필요하다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, 확인: 2026-07-12)
- AI code review tools: AI review comment에서 지적된 문제를 test case로 고정할 수 있다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, 확인: 2026-07-12)

## 선행 개념
- frontend-testing-basics: test runner, assertion, UI interaction의 기본 용어를 알아야 한다.
- prompt-engineering: AI에게 test 요구사항과 edge case를 구체적으로 전달해야 한다.

## 후행 개념
- reviewing-ai-output: AI가 만든 테스트가 실제 요구사항을 검증하는지 사람이 검토하는 단계로 이어진다.
- incident-style-ai-debugging: 실패한 test를 장애 대응식으로 좁히는 단계로 이어진다.

## AI 시대에서의 의미
바이브코딩에서 AI는 구현뿐 아니라 테스트 초안도 빠르게 만들 수 있다. 그러나 GitHub Copilot test 문서는 specific test requirements가 중요하다고 설명하고, Testing Library는 사용자와 닮은 test를 강조한다. 따라서 AI-generated test는 "있다"가 아니라 "올바른 behavior를 막는다"로 검토해야 한다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-12)

## 실무 활용
1. **AI에게 test matrix 요청**: 정상 입력, 빈 값, 잘못된 타입, 권한 없음, network error 같은 scenario를 prompt에 넣는다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, 확인: 2026-07-12)
2. **사용자 중심 selector 사용**: Testing Library 원칙과 Playwright locator를 기준으로 role, text, label 중심 test를 검토한다. (출처: https://testing-library.com/docs/guiding-principles/, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)
3. **실행 결과를 feedback으로 사용**: `vitest run`이나 Playwright 실행 실패를 AI에게 다시 제공해 code 또는 test를 수정한다. (출처: https://vitest.dev/guide/cli, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

```text
AI 보조 테스트 루프:
요구사항 → AI test draft → 사람이 scenario 보강 → test run → failure 분석 → code/test 수정 → regression 고정
```

## FAQ
Q: AI가 만든 테스트가 많으면 품질이 높은가?
A: 아니다. GitHub 문서는 range of scenarios와 edge cases를 구체적으로 요청하라고 설명한다. 개수보다 behavior coverage가 중요하다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, 확인: 2026-07-12)

Q: E2E test에서 sleep을 넣으면 안정적인가?
A: Playwright는 actionability check와 web-first assertion을 제공하므로 manual wait보다 locator와 assertion을 우선해야 한다. (출처: https://playwright.dev/docs/actionability, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

Q: Unit test와 UI test 중 무엇을 먼저 만들어야 하는가?
A: 변경 위험과 behavior에 따라 다르다. 작은 함수는 unit test, 사용자 흐름은 Playwright나 Testing Library 원칙에 맞춘 UI/E2E test가 적합하다. (출처: https://testing-library.com/docs/guiding-principles/, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

## 자주 하는 실수
1. **Happy path만 생성**: AI에게 정상 케이스만 요청한다. Edge case, exception, data validation을 prompt에 넣는다. (출처: https://docs.github.com/en/copilot/tutorials/write-tests, 확인: 2026-07-12)
2. **구현 세부사항 테스트**: 내부 함수명이나 CSS 구조만 확인한다. Testing Library 원칙처럼 사용 방식과 닮은 test를 우선한다. (출처: https://testing-library.com/docs/guiding-principles/, 확인: 2026-07-12)
3. **Flaky wait 추가**: `setTimeout`이나 sleep으로 race condition을 숨긴다. Playwright auto-waiting과 web-first assertion을 사용한다. (출처: https://playwright.dev/docs/actionability, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

## 공식 출처
- Test generation prompt quality — [GitHub Docs — Writing tests with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/write-tests) (확인 날짜: 2026-07-12)
- Playwright action/assertion structure — [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests) (확인 날짜: 2026-07-12)
- Playwright auto-waiting — [Playwright Docs — Auto-waiting](https://playwright.dev/docs/actionability) (확인 날짜: 2026-07-12)
- User-like testing principle — [Testing Library Docs — Guiding Principles](https://testing-library.com/docs/guiding-principles/) (확인 날짜: 2026-07-12)
- Repeatable test command — [Vitest Docs — Command Line Interface](https://vitest.dev/guide/cli) (확인 날짜: 2026-07-12)

## Quote Bank
- > "cover a range of scenarios"
  - 출처: [GitHub Docs — Writing tests with GitHub Copilot](https://docs.github.com/en/copilot/tutorials/write-tests) (확인: 2026-07-12)
  - 맥락: AI에게 test matrix를 요청할 때 사용한다.
- > "You don't need to add manual waits"
  - 출처: [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests) (확인: 2026-07-12)
  - 맥락: E2E test의 기본 구조를 설명할 때 사용한다.
- > "auto-waits for all the relevant checks"
  - 출처: [Playwright Docs — Auto-waiting](https://playwright.dev/docs/actionability) (확인: 2026-07-12)
  - 맥락: manual wait 대신 actionability를 설명할 때 사용한다.
- > "resemble the way your software is used"
  - 출처: [Testing Library Docs — Guiding Principles](https://testing-library.com/docs/guiding-principles/) (확인: 2026-07-12)
  - 맥락: 사용자 중심 테스트 원칙을 설명할 때 사용한다.
- > "Perform a single run without watch mode"
  - 출처: [Vitest Docs — Command Line Interface](https://vitest.dev/guide/cli) (확인: 2026-07-12)
  - 맥락: CI와 반복 검증 명령을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
