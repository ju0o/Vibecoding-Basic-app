---
id: reviewing-ai-output
title: "AI 결과물 리뷰하는 법 (Reviewing AI Output)"
topicGroup: T12
status: approved
score: 90
level: 기초
prerequisites: [hallucination-verification, code-change-risk-analysis]
successors: []
related: [refactoring-with-ai, ai-code-review-tools, github-pr-review-flow]
consumers:
  lessons: [reviewing-ai-output]
  glossary: [AI Output Review, Review Decision, Request Changes, Verification Evidence]
sources:
  - { title: "GitHub Docs — About pull request reviews", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews", checked: 2026-07-12 }
  - { title: "GitHub Docs — Reviewing proposed changes in a pull request", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
AI 결과물 리뷰는 AI가 만든 코드·문서·답변을 승인하기 전에, 변경 내용과 검증 증거를 읽고 comment·approve·request changes 중 하나의 결정을 내리는 절차다. GitHub는 pull request review를 "one of the primary ways people collaborate on GitHub"라고 설명하며, 리뷰 상태를 "Comment: Share feedback without approving or requesting changes", "Approve: Approve the changes for merging", "Request changes: Identify issues that must be fixed before merging"로 정의한다. AI 결과물 리뷰는 이 협업 절차를 AI 출력에 적용하되, "작성자가 AI인가"가 아니라 "무엇이 바뀌었고 검증 증거가 있는가"를 기준으로 삼는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 역사
코드 리뷰는 merge 전에 변경을 검토하는 협업 절차로 오래 문서화되어 왔다. GitHub PR review는 "You can comment on specific lines, suggest changes for authors to apply directly, and discuss implementation approaches"처럼 줄 단위 논의와 제안을 지원한다. AI 코딩 도구가 코드를 대량으로 생성하면서, 이 리뷰 절차의 대상이 "동료의 PR"에서 "AI가 만든 변경"으로 확장됐다. 절차의 형태(comment/approve/request changes)는 그대로지만, 리뷰어가 확인해야 할 것은 "AI가 그럴듯하게 썼는가"가 아니라 "실제로 동작하고 요구를 충족하는가"로 옮겨갔다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 해결하려는 문제
AI 출력은 문법적으로 매끄럽고 설명이 그럴듯해서, 검증 없이 승인하기 쉽다. 하지만 hallucination-verification KB가 보이듯 AI는 사실이나 제공된 context와 불일치하는 내용을 자신 있게 만들 수 있다. AI 결과물 리뷰는 "그럴듯함"을 "검증됨"과 분리한다. GitHub의 review 상태는 이 분리를 결정으로 바꾼다 — 검증이 충분하면 approve, 고쳐야 할 문제가 있으면 "issues that must be fixed before merging"으로서 request changes다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 핵심 개념
1. **리뷰는 협업 절차다**: GitHub는 pull request review를 "one of the primary ways people collaborate on GitHub"라고 설명한다. AI 출력도 이 절차 안에서 검토된다 — 혼자 즉시 수용하는 것이 아니다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
2. **세 가지 결정**: Comment는 "Share feedback without approving or requesting changes", Approve는 "Approve the changes for merging", Request changes는 "Identify issues that must be fixed before merging"다. 리뷰의 끝은 감상이 아니라 이 셋 중 하나의 결정이다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
3. **변경에서 출발한다**: 리뷰는 changed files와 differences에서 시작한다. AI 답변 전체를 막연히 평가하지 않고, 실제로 바뀐 부분을 본다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
4. **줄 단위 논의와 제안**: GitHub는 "comment on specific lines, suggest changes for authors to apply directly, and discuss implementation approaches"를 지원한다. AI 출력의 특정 부분을 지목해 근거를 요구하거나 수정을 제안할 수 있다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
5. **검증 증거가 결정의 근거다**: approve는 검증이 충분할 때, request changes는 "issues that must be fixed"가 있을 때다. AI가 "동작합니다"라고 한 주장은 hallucination-verification 관점에서 테스트·실행 증거로 확인해야 결정의 근거가 된다. (근거: hallucination-verification KB + GitHub review 상태, 확인: 2026-07-12)

## 관련 기술
- reviewing-ai-output ↔ hallucination-verification: AI 출력의 "그럴듯함"을 quote·test·실행 증거로 검증한 뒤 리뷰 결정을 내린다. (근거: hallucination-verification KB, 확인: 2026-07-12)
- reviewing-ai-output ↔ code-change-risk-analysis: 변경 위험을 분류해 어디를 더 깊게 리뷰할지 정한다. (근거: code-change-risk-analysis KB, 확인: 2026-07-12)
- reviewing-ai-output ↔ refactoring-with-ai: 리팩터링 결과물은 동작 보존 증거를 기준으로 리뷰한다. (근거: refactoring-with-ai KB, 확인: 2026-07-12)

## 선행 개념
- hallucination-verification: AI 출력이 사실·context와 불일치할 수 있음을 검증으로 다룬다.
- code-change-risk-analysis: 변경 위험을 분류해 리뷰 깊이를 배정한다.

## 후행 개념
- explain-risk-and-verification: 리뷰 판단 기준을 남에게 설명하는 레퍼런스로 이어진다.

## AI 시대에서의 의미
AI는 즉시 그럴듯한 답을 준다. 위험은 그 유창함이 검증을 건너뛰게 만든다는 점이다. AI 결과물 리뷰는 유창함을 신뢰의 근거로 삼지 않는다. GitHub의 review 상태를 빌리면 판단이 결정으로 바뀐다: ==검증 증거가 충분하면 approve, 고쳐야 할 문제가 있으면 request changes, 논의만 필요하면 comment==. 기준은 작성자가 사람인지 AI인지가 아니라, 변경이 요구를 충족하고 검증되었는가이다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 실무 활용
1. **변경부터 읽기**: AI 답변 전체가 아니라 실제 changed files와 diff를 먼저 본다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
2. **주장에 증거 요구**: "동작합니다"·"안전합니다"에 테스트 결과나 실행 로그를 붙이게 한다. (근거: hallucination-verification KB, 확인: 2026-07-12)
3. **줄 단위 지목**: 의심되는 부분을 specific line으로 지목해 근거를 묻거나 수정을 제안한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
4. **결정으로 끝내기**: 리뷰를 comment/approve/request changes 중 하나로 닫는다 — 애매하게 수용하지 않는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## FAQ
Q: AI 코드는 대부분 맞으니 빠르게 approve해도 되지 않나?
A: 유창함은 정확함이 아니다. Approve는 "Approve the changes for merging"이라는 결정이므로 검증 증거가 뒷받침돼야 한다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
Q: Comment와 request changes의 차이는?
A: Comment는 "Share feedback without approving or requesting changes"이고, request changes는 "Identify issues that must be fixed before merging"이다 — 후자는 merge를 막는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)
Q: AI 리뷰 도구가 통과시키면 사람 리뷰는 생략해도 되나?
A: 아니다. AI 도구 신호는 입력의 하나이고, 최종 결정(comment/approve/request changes)은 사람이 내린다. (근거: ai-code-review-tools KB + GitHub review 상태, 확인: 2026-07-12)

## 자주 하는 실수
1. **유창함을 검증으로 착각**: 그럴듯한 설명에 approve. 교정: 주장에 테스트·실행 증거를 요구한다. (근거: hallucination-verification KB, 확인: 2026-07-12)
2. **전체를 뭉뚱그려 평가**: changed files와 diff를 보지 않고 인상으로 판단. 교정: 변경부터 읽는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request, 확인: 2026-07-12)
3. **결정 없이 수용**: comment만 남기고 애매하게 merge. 교정: approve 또는 request changes로 닫는다. (출처: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews, 확인: 2026-07-12)

## 공식 출처
- 리뷰 정의·세 가지 상태·줄 단위 논의 — [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인 날짜: 2026-07-12)
- 변경에서 출발하는 리뷰 흐름 — [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request) (확인 날짜: 2026-07-12)

## Quote Bank
- > "Pull request reviews are one of the primary ways people collaborate on GitHub."
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: 리뷰가 개인 즉시 수용이 아니라 협업 절차임을 설명할 때 사용한다.
- > "Comment: Share feedback without approving or requesting changes."
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: 세 결정 중 comment의 의미를 설명할 때 사용한다.
- > "Approve: Approve the changes for merging."
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: approve가 merge 승인 결정임을 설명할 때 사용한다.
- > "Request changes: Identify issues that must be fixed before merging."
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: request changes가 merge를 막는 결정임을 설명할 때 사용한다.
- > "You can comment on specific lines, suggest changes for authors to apply directly, and discuss implementation approaches."
  - 출처: [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-12)
  - 맥락: 줄 단위 지목과 수정 제안으로 AI 출력을 검토함을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Fable — 대행, P-01/P-02). Quote Bank 5건 세션 내 fetch 원문 대조, Score 90.
