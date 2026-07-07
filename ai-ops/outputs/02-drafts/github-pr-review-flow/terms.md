# 용어 초안: github-pr-review-flow

기존 glossary.ts 대조: PR/리뷰 계열 미등재 확인 (2026-07-07). 신규 3개.

## Pull Request (풀 리퀘스트)
category: Git
shortDefinition: 한 브랜치(head)의 변경을 다른 브랜치(base)로 병합하자는 제안이자 리뷰·병합의 협업 단위
explanation: GitHub이 Git 위에 얹은 협업 계층으로, "제안 → 리뷰 → 승인 → 병합" 절차를 부여합니다. Files changed 탭이 base와 head의 diff를 보여주고, PR을 연 뒤 head에 커밋을 더 push하면 같은 PR이 자동 갱신됩니다. 완성 전에는 병합 불가·자동 리뷰요청 없는 Draft PR로 열 수 있습니다.
related: [Branch, Merge, Diff]

## Code Review (코드 리뷰)
category: Git
shortDefinition: 병합 전 변경을 검토해 Comment·Approve·Request changes 세 상태로 판정하는 절차
explanation: Comment는 승인/거부 없는 일반 피드백, Approve는 병합 승인, Request changes는 병합 전 반드시 고쳐야 할 문제 지적입니다. 특정 라인에 코멘트하거나 작성자가 바로 반영할 suggested changes를 남길 수 있으며, 저장소 관리자는 병합 전 승인 수(required approvals)를 강제할 수 있습니다.
related: [Pull Request, Diff, Merge]

## Merge Strategy (병합 전략)
category: Git
shortDefinition: PR을 base에 합칠 때 이력에 남는 모양을 정하는 세 방식 — merge commit·squash·rebase
explanation: Create a merge commit은 head의 모든 커밋과 병합 커밋을 남겨 이력을 보존하고, Squash and merge는 PR의 커밋들을 하나로 압축하며, Rebase and merge는 병합 커밋 없이 base 위에 개별 커밋으로 얹습니다. 깔끔함(squash)과 이력 진실성(merge commit)의 트레이드오프입니다.
related: [Pull Request, Rebase, Merge]
