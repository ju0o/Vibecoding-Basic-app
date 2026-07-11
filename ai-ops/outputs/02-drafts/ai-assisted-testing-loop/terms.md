# 용어 초안: ai-assisted-testing-loop

기존 glossary.ts 대조 완료: `Frontend Test`, `Test Runner`, `Vitest`, `Testing Library`, `Playwright`, `Locator`, `Implementation Loop`, `Verification Feedback`은 이미 등록되어 있어 중복 생성하지 않는다.

## 생성 용어

## Test Matrix

- category: AI 코딩 도구
- shortDefinition: 요구사항과 edge case를 테스트 시나리오 표로 나누어 누락을 점검하는 목록
- explanation: Test Matrix는 AI에게 테스트 초안을 만들게 하기 전에 정상 입력, 빈 값, 오류 조건, 권한, network failure 같은 scenario를 정리하는 단계입니다. 테스트 개수보다 어떤 behavior를 막는지가 중요합니다.
- related: ["Frontend Test", "Verification", "Implementation Loop"]

## User-like Test

- category: AI 코딩 도구
- shortDefinition: 내부 구현보다 사용자가 소프트웨어를 쓰는 방식과 닮은 단서로 검증하는 테스트
- explanation: User-like Test는 role, label, visible text, locator처럼 사용자-facing 계약을 기준으로 동작을 확인합니다. AI-generated test가 CSS class나 내부 state만 확인할 때 이 기준으로 보강할 수 있습니다.
- related: ["Testing Library", "Playwright", "Frontend Test"]

## Actionability Check

- category: AI 코딩 도구
- shortDefinition: Playwright가 action을 수행하기 전에 요소가 상호작용 가능한 상태인지 확인하는 검사
- explanation: Actionability Check는 manual sleep으로 기다리는 대신 locator가 실제로 보이고, 안정적이고, 사용 가능한지 확인하는 안정성 기준입니다. AI가 만든 E2E 테스트에서 flaky wait를 줄이는 데 중요합니다.
- related: ["Playwright", "Locator", "Frontend Test"]

## Repeatable Test Run

- category: AI 코딩 도구
- shortDefinition: watch mode 없이 한 번 실행되고 종료되어 CI와 검증 루프에서 반복 가능한 테스트 실행
- explanation: Repeatable Test Run은 `vitest run`처럼 동일한 명령으로 테스트 suite를 한 번 실행해 결과를 observation으로 남기는 방식입니다. AI 보조 테스트 루프에서는 이 결과가 다음 prompt의 feedback 근거가 됩니다.
- related: ["Vitest", "Test Runner", "Verification Feedback"]
