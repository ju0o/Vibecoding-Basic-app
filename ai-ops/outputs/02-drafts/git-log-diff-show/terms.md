# 용어 초안: git-log-diff-show

기존 glossary.ts 대조: Diff·Reachability 계열 미등재 확인 (2026-07-06). 신규 3개.

## Diff (디프)
category: Git
shortDefinition: 두 상태 사이의 내용 차이 — 워킹 트리↔인덱스부터 두 커밋 사이까지 비교쌍을 골라 보는 것
explanation: git diff는 인자에 따라 비교쌍이 달라지므로 "지금 무엇과 무엇을 비교 중인가"가 항상 첫 질문입니다. 인자가 없으면 아직 add하지 않은 변경(워킹 트리↔인덱스)을 보여줍니다. AI 변경 검토의 핵심 도구입니다.
related: [Index (Staging Area), Working Tree, Commit]

## Reachability (도달 가능성)
category: Git
shortDefinition: 커밋에서 parent 링크를 따라 거슬러 올라가 닿을 수 있는 커밋들의 집합
explanation: git log의 나열 기준이 바로 이것입니다 — 지정한 커밋에서 도달 가능한 것을 포함하고, ^ 표시 커밋에서 도달 가능한 것을 제외합니다. main..feature 같은 범위 문법은 이 포함/제외의 표기법입니다.
related: [Commit, Branch, HEAD]

## Git Object (Git 객체)
category: Git
shortDefinition: 저장소 내용물의 저장 단위 — blob(파일 내용), tree(디렉터리), tag, commit 네 종류
explanation: .git/objects에 저장되는 모든 것이 이 네 타입 중 하나이며, git show는 이들 모두를 열람합니다. 커밋도 특별한 존재가 아니라 객체 저장소의 한 시민이라는 것이 Git 내부 모델의 핵심입니다.
related: [Repository, Commit, Diff]
