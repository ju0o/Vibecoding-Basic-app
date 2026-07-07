# 용어 초안: git-rebase-cherry-pick-stash

기존 glossary.ts 대조: rebase/cherry-pick/stash 계열 미등재 확인 (2026-07-07). 신규 3개.

## Rebase (리베이스)
category: Git
shortDefinition: 일련의 커밋을 다른 기반 위로 재적용(이식)하는 이력 재작성 명령
explanation: 원래 커밋이 이동하는 것이 아니라 같은 변경 내용의 새 커밋(해시가 바뀜)이 새 기반 위에 만들어집니다. 이력을 평평하게 정리하지만, 공식 문서가 "다른 사람이 기반으로 삼은 브랜치의 재작성은 나쁜 생각"이라고 경고하듯 공유(push) 이전에만 안전합니다. 충돌 시 --continue/--skip/--abort로 진행을 제어합니다.
related: [Commit (Git), Branch, Merge, Reset]

## Cherry-pick (체리픽)
category: Git
shortDefinition: 지정한 기존 커밋의 변경만 골라 현재 브랜치에 새 커밋으로 적용하는 명령
explanation: 브랜치 전체가 아니라 커밋 하나(또는 몇 개)만 이식할 때 씁니다. revert의 정방향으로, 각 커밋의 변경을 그대로의 패치로 새 커밋에 기록합니다. 워킹 트리가 깨끗해야 시작되며, 이식본은 원본과 다른 해시의 별개 커밋이므로 이후 원 브랜치를 합칠 때 중복 적용에 주의합니다.
related: [Commit (Git), Revert, Merge Conflict]

## Stash (스태시)
category: Git
shortDefinition: 진행 중인 워킹 트리·인덱스 수정을 보관소에 치우고 HEAD 상태로 되돌리는 명령
explanation: 커밋하기엔 이르고 버리기엔 아까운 작업을 잠깐 치워 깨끗한 상태를 만듭니다. list로 나열, show로 열람, apply로 복원하며 다른 커밋 위에도 복원할 수 있습니다. 브랜치와 달리 이력에 보이지 않아 잊히기 쉬우므로 오래 갈 작업은 stash 대신 브랜치+커밋이 낫습니다.
related: [Working Tree, Index (Staging Area), HEAD]
