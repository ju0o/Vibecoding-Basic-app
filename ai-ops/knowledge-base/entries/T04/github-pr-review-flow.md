---
id: github-pr-review-flow
title: "GitHub Pull Request · Review · Merge 흐름"
topicGroup: T04
status: approved
score: 88
level: 중급
prerequisites: [git-branch-switch-merge, git-log-diff-show]
successors: [gh-cli-reference]
related: [git-rebase-cherry-pick-stash]
sources:
  - { title: "About pull requests — GitHub Docs", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests", checked: 2026-07-07 }
  - { title: "About pull request reviews — GitHub Docs", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews", checked: 2026-07-07 }
  - { title: "About pull request merges — GitHub Docs", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges", checked: 2026-07-07 }
consumers:
  lessons: [github-pr-review-flow]
  glossary: [Pull Request, Code Review, Merge Strategy]
updated: 2026-07-07
---

## 정의
Pull Request(PR)는 한 브랜치의 변경을 다른 브랜치로 병합하자는 제안이며, 그 제안을 놓고 리뷰·토론·병합이 일어나는 GitHub의 협업 단위다. 공식 문서는 "Pull requests let you propose, review, and merge code changes"(PR로 코드 변경을 제안하고, 리뷰하고, 병합할 수 있다)라고 요약한다. PR의 **Files changed** 탭은 "the differences between the proposed changes and the existing code"(제안된 변경과 기존 코드의 차이)를 보여준다 — 즉 앞서 배운 `git diff`의 웹 협업판이다. (출처: docs.github.com/…/about-pull-requests, 확인: 2026-07-07)

## 역사
PR은 Git 자체의 명령이 아니라 GitHub이 Git 위에 얹은 협업 계층이다. Git이 브랜치·머지·diff라는 원자를 제공하면, GitHub은 그 위에 "제안 → 리뷰 → 승인 → 병합"이라는 사회적 절차를 부여한다. rebase KB에서 다룬 "공유 이력 재작성 금지"의 경계가 실무에서 강제되는 곳이 바로 PR이다 — 공유된 브랜치는 PR을 통해서만 안전하게 통합된다. (근거: about-pull-requests 협업 서술, 확인: 2026-07-07)

## 해결하려는 문제
- 변경을 바로 main에 밀어 넣지 않고 **먼저 보여주고 합의**하기: PR은 base 브랜치와 head(compare) 브랜치의 차이를 제안으로 만든다. (출처: about-pull-requests, 확인: 2026-07-07)
- 병합 전에 **문제를 조기에 잡기**: 리뷰가 "comment on changes, suggest improvements, and approve or request changes before code is merged"를 가능하게 한다. (출처: about-pull-request-reviews, 확인: 2026-07-07)
- 팀 규칙을 **자동으로 강제**하기: 저장소 관리자는 병합 전 승인(required approvals)을 요구할 수 있다. (출처: about-pull-request-reviews, 확인: 2026-07-07)

## 핵심 개념
1. **base ↔ head(compare)**: PR은 "이 head 브랜치의 변경을 저 base 브랜치에 합치자"는 방향을 가진다. **Files changed** 탭이 둘의 diff를 보여주며, PR을 연 뒤 head에 커밋을 더 push하면 PR이 자동 갱신된다. (출처: about-pull-requests, 확인: 2026-07-07)
2. **리뷰 3상태**: 리뷰는 세 가지 상태로 제출된다 — Comment(승인/변경요청 없이 피드백), Approve(병합 승인), Request changes(병합 전 반드시 고쳐야 할 문제 지적). (출처: about-pull-request-reviews, 확인: 2026-07-07)
3. **라인 코멘트·제안**: 리뷰어는 특정 라인에 코멘트하고, 작성자가 바로 반영할 수 있는 변경 제안(suggested changes)을 남길 수 있다. (출처: about-pull-request-reviews, 확인: 2026-07-07)
4. **병합 3전략**: (a) merge commit — head 브랜치의 모든 커밋이 병합 커밋으로 base에 더해짐, (b) squash and merge — PR의 커밋들이 하나의 커밋으로 합쳐짐, (c) rebase and merge — 모든 커밋이 병합 커밋 없이 base 위에 개별적으로 얹힘. (출처: about-pull-request-merges, 확인: 2026-07-07)
5. **Draft PR**: 초안 PR은 병합할 수 없고 코드 소유자에게 자동 리뷰 요청이 가지 않는다 — "아직 리뷰하지 마세요" 신호. (출처: about-pull-requests, 확인: 2026-07-07)
6. **required reviews**: 관리자가 병합 전 승인 수를 강제하면, Approve가 채워지기 전에는 병합 버튼이 잠긴다. (출처: about-pull-request-reviews, 확인: 2026-07-07)

## 관련 기술
- PR diff vs `git diff`: PR의 Files changed는 로컬 `git diff base...head`와 같은 3-dot 비교 관점을 웹에서 보여준다. (근거: about-pull-requests + git-log-diff-show KB, 확인: 2026-07-07)
- squash/rebase merge vs 로컬 rebase·cherry-pick: GitHub의 "Rebase and merge"·"Squash and merge"는 rebase KB에서 배운 재작성 개념을 서버 측 병합 버튼으로 옮긴 것 — 로컬에서 손으로 하던 정리를 병합 시점에 자동화한다. (출처: about-pull-request-merges + git-rebase KB, 확인: 2026-07-07)
- required reviews vs 브랜치 보호: 승인 강제는 브랜치 보호 규칙(branch protection)의 한 축이다. (근거: about-pull-request-reviews, 확인: 2026-07-07)

## 선행 개념
- git-branch-switch-merge: PR은 브랜치와 머지 개념 위에서 동작한다.
- git-log-diff-show: PR의 Files changed는 diff의 웹 표현이다.

## 후행 개념
- gh-cli-reference: PR 생성·리뷰·병합을 터미널에서 수행하는 `gh pr` 명령군.
- ci-cd-pipeline-basics (예정): PR이 CI 검사와 결합되어 병합 게이트가 되는 흐름.

## AI 시대에서의 의미
AI가 만든 변경을 바로 main에 넣지 않고 PR로 올리면, Files changed diff가 "AI가 실제로 무엇을 바꿨는가"를 라인 단위로 드러낸다 — AI 협업에서 diff 기반 검토의 표준 무대가 PR이다. Request changes 상태는 "AI 결과를 병합 전에 반드시 고쳐야 한다"는 게이트로 쓰이고, required reviews는 "사람 승인 없이는 AI 변경이 못 들어간다"를 자동 강제한다. squash and merge는 AI의 지저분한 wip 커밋 열을 병합 시점에 하나로 정리하는 실무적 수단이다. (근거: about-pull-request-reviews·about-pull-request-merges, 확인: 2026-07-07)

## 실무 활용
1. 변경 제안: feature 브랜치를 push하고 base=main으로 PR을 연다 — Files changed로 diff를 자기 검토. (출처: about-pull-requests, 확인: 2026-07-07)
2. 리뷰 요청·응답: 리뷰어가 라인 코멘트·suggested changes를 남기고, Approve 또는 Request changes로 상태를 정한다. (출처: about-pull-request-reviews, 확인: 2026-07-07)
3. 병합 전략 선택: 이력을 그대로 보존하면 merge commit, 커밋을 하나로 압축하면 squash, 평평하게 얹으면 rebase and merge. (출처: about-pull-request-merges, 확인: 2026-07-07)
4. 초안 협업: 완성 전에는 Draft PR로 올려 조기 피드백을 받되 실수 병합을 막는다. (출처: about-pull-requests, 확인: 2026-07-07)

## FAQ
Q: PR을 연 뒤 코드를 더 고치면 다시 열어야 하나?
A: 아니다. head 브랜치에 커밋을 push하면 같은 PR이 자동 갱신되고 Files changed diff도 새로 반영된다. (출처: about-pull-requests, 확인: 2026-07-07)
Q: Approve와 Request changes의 차이는?
A: Approve는 병합을 승인하는 상태, Request changes는 병합 전 반드시 해결해야 할 문제를 지적하는 상태다. Comment는 둘 중 어느 것도 아닌 일반 피드백이다. (출처: about-pull-request-reviews, 확인: 2026-07-07)
Q: squash와 rebase 병합의 차이는?
A: squash는 PR의 여러 커밋을 하나로 합쳐 base에 넣고, rebase and merge는 각 커밋을 병합 커밋 없이 base 위에 개별적으로 얹는다. (출처: about-pull-request-merges, 확인: 2026-07-07)
Q: 리뷰를 강제할 수 있나?
A: 저장소 관리자가 병합 전 승인 수를 요구(required approvals)하도록 설정할 수 있다. (출처: about-pull-request-reviews, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: 리뷰 없이 곧장 main에 push. 왜 생기나: PR의 목적(사전 검토)을 건너뜀. 교정: 공유 브랜치 변경은 PR로 — required reviews로 강제 가능. (출처: about-pull-request-reviews, 확인: 2026-07-07)
2. 실수: 거대한 PR을 한 번에 올려 리뷰 불가. 왜 생기나: 변경을 작게 나누지 않음. 교정: 리뷰 가능한 크기로 분할 — Files changed diff가 읽히는 단위. (근거: about-pull-requests, 확인: 2026-07-07)
3. 실수: 이력을 남겨야 하는데 squash로 병합. 왜 생기나: 병합 전략의 차이를 모름. 교정: 개별 커밋 보존이 필요하면 merge commit 또는 rebase and merge. (출처: about-pull-request-merges, 확인: 2026-07-07)
4. 실수: Draft PR을 병합하려다 막힘. 왜 생기나: 초안은 병합 불가라는 규칙을 모름. 교정: Ready for review로 전환 후 병합. (출처: about-pull-requests, 확인: 2026-07-07)

## 공식 출처
- PR 정의·Files changed diff·Draft PR·자동 갱신 — [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (확인: 2026-07-07)
- 리뷰 3상태·라인 코멘트·required reviews — [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-07)
- 병합 3전략 — [About pull request merges](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges) (확인: 2026-07-07)

## Quote Bank
- > "Pull requests let you propose, review, and merge code changes."
  - 출처: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (확인: 2026-07-07)
  - 맥락: PR의 공식 한 줄 정의 — 제안·리뷰·병합의 3동사
- > "The Files changed tab shows the differences between the proposed changes and the existing code, making it easy to see what will change when the pull request merges."
  - 출처: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (확인: 2026-07-07)
  - 맥락: PR의 diff 뷰 — git diff의 웹 협업판
- > "Comment: Share feedback without approving or requesting changes."
  - 출처: [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-07)
  - 맥락: 리뷰 3상태 중 Comment — 승인도 변경요청도 아닌 일반 피드백
- > "Approve: Approve the changes for merging."
  - 출처: [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-07)
  - 맥락: 리뷰 3상태 중 Approve — 병합 승인
- > "Request changes: Identify issues that must be fixed before merging."
  - 출처: [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) (확인: 2026-07-07)
  - 맥락: 리뷰 3상태 중 Request changes — 병합 전 필수 수정 게이트

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
