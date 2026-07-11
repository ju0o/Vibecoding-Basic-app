---
id: explain-risk-verification
title: "위험과 검증 설명 레퍼런스 (Explaining Risk and Verification)"
topicGroup: T13
status: draft
score: null
level: 중급
prerequisites: [reviewing-ai-output, code-change-risk-analysis, ai-assisted-testing-loop]
successors: []
related: [hallucination-verification, github-pr-review-flow, frontend-testing-basics]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "GitHub Docs — About pull request reviews", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews", checked: 2026-07-12 }
  - { title: "GitHub Docs — Code scanning with CodeQL", url: "https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql", checked: 2026-07-12 }
  - { title: "GitHub Docs — Triaging code scanning alerts in pull requests", url: "https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests", checked: 2026-07-12 }
  - { title: "Playwright Docs — Writing tests", url: "https://playwright.dev/docs/writing-tests", checked: 2026-07-12 }
  - { title: "OWASP Cheat Sheet Series — Authorization", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
위험과 검증 설명은 변경의 실패 가능성, 실패 비용, 확인 증거를 구분해 남에게 판단 기준을 전달하는 레퍼런스 스킬이다. GitHub pull request review는 변경에 대해 comment, approve, request changes 결정을 내리는 협업 절차이고, CodeQL code scanning은 code scanning alerts로 취약점과 오류를 드러낸다. 위험 설명은 "무서울 수 있다"가 아니라 "어떤 변경이 어떤 증거를 요구하는가"를 말한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql, 확인: 2026-07-12)

## 역사
소프트웨어 협업에서 pull request review는 merge 전 변경을 검토하고 의견, 승인, 수정 요청을 남기는 절차로 자리 잡았다. GitHub는 pull request reviews를 GitHub에서 사람들이 협업하는 주요 방식 중 하나로 설명하고, CodeQL code scanning은 pull request에서 코드 문제를 alert로 드러낸다. AI가 코드를 생성하는 시대에는 이 절차가 사람의 변경뿐 아니라 AI 출력에도 적용된다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 "테스트 통과"와 "안전함"을 같은 말로 쓰거나, AI가 설명한 내용을 검증 증거로 착각하기 쉽다. 위험과 검증 설명은 이 혼동을 막는다. CodeQL은 코드에서 vulnerabilities and errors를 찾을 수 있고, Playwright tests는 actions와 assertions로 상태를 확인한다. OWASP Authorization Cheat Sheet는 authorization logic이 business context에 맞고 maintainable, scalable해야 한다고 설명한다. 따라서 위험 설명은 정적 분석, 동작 테스트, 비즈니스 권한 검토를 서로 다른 증거로 분리한다. (출처: https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql, https://playwright.dev/docs/writing-tests, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html, 확인: 2026-07-12)

## 핵심 개념
1. **위험은 변경 지점과 실패 비용의 조합**: 같은 한 줄 변경이라도 인증, 권한, 결제, 데이터 삭제 경로라면 더 높은 검증을 요구한다. GitHub review의 request changes는 merge 전에 고쳐야 할 issue를 식별하는 결정이다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
2. **정적 분석 증거**: CodeQL code scanning은 코드에서 vulnerabilities and errors를 찾고 GitHub code scanning alerts로 보여준다. 이는 위험 신호지만, 비즈니스 의도까지 자동으로 보장하지는 않는다. (출처: https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql, 확인: 2026-07-12)
3. **PR 내부 alert**: code scanning이 pull request에서 문제를 찾으면 highlighted code를 review하고 alert를 resolve할 수 있다. 즉 보안 위험 설명은 diff와 alert 위치를 함께 보여줄 수 있다. (출처: https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests, 확인: 2026-07-12)
4. **동작 검증 증거**: Playwright tests는 actions를 수행하고 expectations로 state를 assert한다. "동작한다"는 말은 실행된 action과 기대 state의 evidence로 표현되어야 한다. (출처: https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)
5. **권한 검증 증거**: OWASP Authorization Cheat Sheet는 authorization logic이 app business context에 맞아야 한다고 설명한다. 권한 변경은 단순 화면 테스트 외에 "누가 무엇을 할 수 있는가"를 별도로 검토해야 한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html, 확인: 2026-07-12)
6. **리뷰 결정 언어**: comment, approve, request changes는 서로 다른 결정이다. 위험과 검증을 설명할 때 "논의 필요", "승인 가능", "수정 필요"를 분리한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 관련 기술
- reviewing-ai-output: AI 출력도 변경과 검증 증거를 기준으로 comment, approve, request changes 결정을 내려야 한다. (근거: reviewing-ai-output KB, 확인: 2026-07-12)
- code-change-risk-analysis: 위험 분류가 먼저이고, 검증은 그 위험에 맞춰 선택된다. (근거: code-change-risk-analysis KB, 확인: 2026-07-12)
- ai-assisted-testing-loop: 위험을 테스트 matrix로 바꾸고 실패를 다시 수정 루프로 돌리는 실천 단계다. (근거: ai-assisted-testing-loop KB, 확인: 2026-07-12)

## 선행 개념
- reviewing-ai-output: AI 결과물을 결정 언어로 닫는 법을 알아야 한다.
- code-change-risk-analysis: 변경 위험을 분류해야 설명할 검증 수준을 정할 수 있다.
- ai-assisted-testing-loop: 검증 증거가 실제 테스트 실행과 연결되어야 한다.

## 후행 개념
- project-textbook 계열: 프로젝트 교재에서 checklist, test, rollback, review gate를 설명하는 기준으로 쓰인다.

## AI 시대에서의 의미
바이브코딩에서는 AI가 빠르게 변경을 만들기 때문에, 사람이 설명해야 하는 것은 "AI가 만든 코드"가 아니라 "이 변경이 어떤 위험을 만들고 어떤 증거가 그 위험을 줄였는가"다. GitHub review status, CodeQL alert, Playwright assertion을 결합하면 AI 출력의 신뢰를 감상이 아니라 검증 가능한 증거로 바꿀 수 있다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)

## 실무 활용
1. **위험 문장 만들기**: "이 변경은 authorization path를 바꾸므로 잘못되면 다른 사용자의 데이터를 볼 수 있다"처럼 변경 지점과 실패 비용을 한 문장으로 쓴다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html, 확인: 2026-07-12)
2. **증거 묶음 만들기**: CodeQL alert 없음, Playwright regression test 통과, 권한 matrix 수동 확인을 별도 줄로 기록한다. (출처: https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql, https://playwright.dev/docs/writing-tests, 확인: 2026-07-12)
3. **결정으로 마무리**: evidence가 충분하면 approve, 고쳐야 할 issue가 있으면 request changes, 논의만 필요하면 comment로 닫는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

```text
Risk explanation packet:
- Change: 어떤 파일/흐름이 바뀌었나
- Risk: 실패하면 누구에게 어떤 피해가 생기나
- Evidence: 정적 분석, 테스트, 권한 검토, 로그 중 무엇으로 확인했나
- Decision: comment / approve / request changes
```

## FAQ
Q: 테스트가 통과하면 위험이 사라진 것인가?
A: 아니다. Playwright test는 action과 expectation을 검증하지만, 권한·비즈니스 규칙·보안 alert는 별도 증거가 필요하다. (출처: https://playwright.dev/docs/writing-tests, https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html, 확인: 2026-07-12)

Q: CodeQL alert가 없으면 approve해도 되는가?
A: CodeQL은 vulnerabilities and errors를 찾는 중요한 증거지만, 요구사항과 business context까지 자동으로 승인하지 않는다. review decision에는 의도와 테스트 증거가 함께 필요하다. (출처: https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql, https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

Q: AI에게 "위험 분석해줘"라고 하면 충분한가?
A: 아니다. AI의 분석은 초안이고, 실제 diff, code scanning alert, 테스트 결과, 권한 조건으로 대조해야 한다. (출처: https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests, 확인: 2026-07-12)

## 자주 하는 실수
1. **위험을 감정으로 설명**: "왠지 위험하다"라고 말한다. 교정: 변경 지점, 실패 비용, 검증 증거를 분리한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
2. **테스트를 모든 증거로 착각**: UI test만 통과하고 권한 경계를 확인하지 않는다. 교정: authorization logic은 business context와 별도 검토한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html, 확인: 2026-07-12)
3. **결정 없이 설명만 함**: review comment만 남기고 merge 가능 여부를 말하지 않는다. 교정: comment, approve, request changes 중 하나로 닫는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 공식 출처
- PR review decision language — [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인 날짜: 2026-07-12)
- Static analysis risk signal — [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql) (확인 날짜: 2026-07-12)
- PR alert triage — [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests) (확인 날짜: 2026-07-12)
- Behavioral test evidence — [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests) (확인 날짜: 2026-07-12)
- Authorization business context — [OWASP Cheat Sheet Series — Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) (확인 날짜: 2026-07-12)

## Quote Bank
- > "Approve the changes for merging"
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: 검증 증거가 충분할 때의 결정 언어.
- > "Identify issues that must be fixed before merging"
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: request changes의 의미를 설명할 때 사용한다.
- > "identify vulnerabilities and errors in your code"
  - 출처: [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql) (확인: 2026-07-12)
  - 맥락: 정적 분석을 위험 신호로 설명할 때 사용한다.
- > "review the highlighted code and resolve the alert"
  - 출처: [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests) (확인: 2026-07-12)
  - 맥락: PR 내부 alert 처리 흐름을 설명할 때 사용한다.
- > "perform actions and assert the state against expectations"
  - 출처: [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests) (확인: 2026-07-12)
  - 맥락: 동작 검증 증거를 설명할 때 사용한다.
- > "appropriate to the app's business context"
  - 출처: [OWASP Cheat Sheet Series — Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) (확인: 2026-07-12)
  - 맥락: 권한 검증이 비즈니스 맥락과 연결됨을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
