---
id: code-change-risk-analysis
title: "코드 변경 위험 분석 (Code Change Risk Analysis)"
topicGroup: T12
status: approved
score: 91
level: 중급
prerequisites: [debugging-error-reading, github-pr-review-flow]
successors: [ai-assisted-testing-loop]
related: [web-security-basics, ai-code-review-tools, monitoring-errors-rollbacks]
consumers:
  lessons: [code-change-risk-analysis]
  glossary: [Diff Scope, Risk Signal, Security Alert, Manual Review Boundary]
sources:
  - { title: "GitHub Docs — Reviewing proposed changes in a pull request", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request", checked: 2026-07-12 }
  - { title: "GitHub Docs — About pull request reviews", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews", checked: 2026-07-12 }
  - { title: "GitHub Docs — Triaging code scanning alerts in pull requests", url: "https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests", checked: 2026-07-12 }
  - { title: "GitHub Docs — Code scanning with CodeQL", url: "https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning", checked: 2026-07-12 }
  - { title: "OWASP Cheat Sheet Series — Secure Code Review", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
코드 변경 위험 분석은 변경된 파일, diff, dependency, security alert, business logic 영향을 보고 review 우선순위와 검증 범위를 정하는 절차다. GitHub PR 문서는 changed files와 diff를 검토할 수 있다고 설명하고, OWASP Secure Code Review는 application logic, data flow, implementation details를 분석한다고 설명한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

## 역사
Pull request review는 merge 전 변경을 검토하는 협업 절차로 문서화되어 있다. 이후 code scanning과 CodeQL 같은 자동 분석이 PR에 annotation과 alert를 추가하면서, 사람은 diff와 자동 분석 결과를 함께 읽어야 하게 되었다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests, 확인: 2026-07-12)

## 해결하려는 문제
모든 변경을 같은 깊이로 검토하면 시간이 부족하고, 위험한 변경을 놓칠 수 있다. Risk analysis는 인증, 권한, 입력 검증, DB, dependency, build config, user-facing behavior처럼 실패 비용이 큰 영역에 더 깊은 review와 test를 배정한다. CodeQL은 vulnerabilities and errors를 찾는 code scanning alert를 제공하고, OWASP는 manual review가 business logic과 context-specific vulnerability를 다룬다고 설명한다. (출처: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning, https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

## 핵심 개념
1. **Diff scope**: PR에서 commits, changed files, base와 compare branch의 diff를 검토한다. 위험 분석은 먼저 변경 범위를 확인한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
2. **Intent alignment**: GitHub 문서는 PR 목적과 linked issue를 이해하면 review가 targeted and meaningful해진다고 설명한다. 위험은 코드만이 아니라 요구사항과의 불일치에서도 생긴다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
3. **Security alerts**: Code scanning은 PR diff 안의 alert를 Conversation tab과 Files changed tab에서 볼 수 있게 한다. (출처: https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests, 확인: 2026-07-12)
4. **Static analysis boundary**: CodeQL은 code를 data처럼 다루어 potential vulnerabilities를 찾는 데 도움을 준다. 하지만 OWASP는 manual analysis가 business logic과 context-specific vulnerability에 필요하다고 설명한다. (출처: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning, https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)
5. **Review decision**: Pull request review는 Comment, Approve, Request changes 중 하나로 제출된다. 위험 분석은 어떤 review status가 적절한지 판단하는 입력이다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 관련 기술
- AI code review tools: AI comment는 risk signal의 하나지만 최종 판단은 PR review 절차에서 한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
- Web security basics: input validation, access control, data protection 같은 항목은 변경 위험 분류에서 중요하다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)
- Monitoring and rollback: 위험이 큰 변경은 release 후 관찰과 rollback 준비가 필요하다. (출처: https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests, 확인: 2026-07-12)

## 선행 개념
- debugging-error-reading: 위험 분석에는 실패 로그와 error message를 읽는 능력이 필요하다.
- github-pr-review-flow: diff, comment, approve, request changes의 기본 흐름을 알아야 한다.

## 후행 개념
- ai-assisted-testing-loop: 위험 분석 결과를 test priority와 regression case로 바꾸는 단계로 이어진다.
- reviewing-ai-output: AI가 만든 변경을 위험도와 검증 증거로 검토하는 단계로 이어진다.

## AI 시대에서의 의미
AI가 만든 코드는 빠르게 넓은 변경을 만들 수 있다. 위험 분석은 "AI가 만들었는가"보다 "무엇이 바뀌었고 실패 비용이 어디에 있는가"를 본다. GitHub의 diff review, code scanning alert, OWASP의 manual review 관점을 함께 쓰면 AI output을 작은 risk buckets로 나눌 수 있다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests, https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

## 실무 활용
1. **파일별 risk label**: auth, payment, DB migration, dependency, config, public UI 같은 파일을 먼저 분류한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
2. **자동 alert 확인**: Code scanning alert가 PR diff에 있으면 annotation, details, path를 확인한다. (출처: https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests, 확인: 2026-07-12)
3. **수동 review 보강**: 자동 도구가 놓칠 수 있는 business logic과 context-specific vulnerability를 사람이 확인한다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

```text
Risk checklist:
- 변경 목적이 issue와 맞는가
- auth/permission/data path가 바뀌었는가
- code scanning alert가 있는가
- dependency/lockfile이 바뀌었는가
- 어떤 test가 이 변경을 막아야 하는가
```

## FAQ
Q: CodeQL alert가 없으면 안전한가?
A: 아니다. CodeQL은 vulnerabilities and errors를 찾지만 OWASP는 automated tools가 놓칠 수 있는 영역에 manual review가 필요하다고 설명한다. (출처: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning, https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

Q: 위험 분석은 보안 팀만 하는가?
A: 아니다. PR reviewer는 changed files와 diff를 보고 comment, approve, request changes를 선택하므로 개발 리뷰에도 필요한 절차다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

Q: AI 리뷰 도구가 위험도를 자동 분류해주면 충분한가?
A: 아니다. AI나 static analysis는 signal을 줄 수 있지만, intent alignment와 business logic은 사람이 확인해야 한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

## 자주 하는 실수
1. **파일 수만 보고 위험 판단**: 작은 auth 변경이 큰 UI 변경보다 위험할 수 있다. Diff scope와 domain impact를 함께 본다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
2. **alert annotation만 보고 종료**: code scanning details와 path를 열어 source-to-sink 정보를 확인해야 한다. (출처: https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests, 확인: 2026-07-12)
3. **business logic 누락**: 자동 도구가 찾기 어려운 domain-specific rule을 사람이 확인하지 않는다. OWASP manual review 관점을 별도 체크로 둔다. (출처: https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html, 확인: 2026-07-12)

## 공식 출처
- Diff and PR context — [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request) (확인 날짜: 2026-07-12)
- Review statuses — [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인 날짜: 2026-07-12)
- PR code scanning annotations — [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests) (확인 날짜: 2026-07-12)
- CodeQL code scanning — [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning) (확인 날짜: 2026-07-12)
- Manual security review — [OWASP Cheat Sheet Series — Secure Code Review](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html) (확인 날짜: 2026-07-12)

## Quote Bank
- > "changed files, and the differences"
  - 출처: [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request) (확인: 2026-07-12)
  - 맥락: risk analysis가 diff에서 출발함을 설명할 때 사용한다.
- > "approve or request changes"
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: 위험 판단이 review status로 이어짐을 설명할 때 사용한다.
- > "inside the diff"
  - 출처: [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests) (확인: 2026-07-12)
  - 맥락: PR 변경 내부의 security alert를 설명할 때 사용한다.
- > "identify vulnerabilities and errors"
  - 출처: [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning) (확인: 2026-07-12)
  - 맥락: CodeQL의 자동 분석 역할을 설명할 때 사용한다.
- > "human expertise and contextual understanding"
  - 출처: [OWASP Cheat Sheet Series — Secure Code Review](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html) (확인: 2026-07-12)
  - 맥락: 자동 분석의 한계와 사람 검토 필요성을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
