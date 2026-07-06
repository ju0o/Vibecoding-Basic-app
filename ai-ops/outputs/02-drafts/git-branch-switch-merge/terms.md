# 용어 초안: git-branch-switch-merge

기존 glossary.ts 대조: Branch·Merge 계열 미등재 확인 (2026-07-06). 신규 4개.

## Branch (브랜치)
category: Git
shortDefinition: 커밋 그래프의 특정 지점을 가리키는 움직이는 포인터 — 파일 복사본이 아님
explanation: 새 브랜치는 현재 HEAD를 가리키는 이름표로 생성되며, 그 브랜치에서 커밋할 때마다 포인터가 전진합니다. 복사가 없으므로 생성 비용이 사실상 없고, 실험·기능·수정 작업을 본 이력과 격리하는 기본 수단이 됩니다.
related: [HEAD, Commit, Merge]

## Merge (머지)
category: Git
shortDefinition: 갈라진 이력의 변경을 — 분기 시점 이후분만 — 현재 브랜치로 편입하는 작업
explanation: merge는 대칭이 아니라 방향이 있습니다: 결과를 받을 브랜치에 서서 실행해야 합니다. 편입 범위는 두 이력이 갈라진 시점 이후의 차이이며, git pull도 내부적으로 merge를 사용합니다.
related: [Branch, Merge Conflict, Commit]

## Merge Conflict (병합 충돌)
category: Git
shortDefinition: 양쪽 브랜치가 같은 영역을 다르게 수정해 Git이 자동 병합을 멈추고 사람의 판단을 요구하는 상태
explanation: Git은 임의로 한쪽을 고르지 않고 양쪽 내용을 충돌 마커와 함께 남깁니다. 해결은 마커 삭제가 아니라 두 변경의 의도를 살리는 의미의 병합이며, 정리 후 add·commit으로 마무리합니다.
related: [Merge, Branch, Working Tree]

## Switch (브랜치 전환)
category: Git
shortDefinition: 워킹 트리·인덱스·미래 커밋의 목적지를 지정 브랜치 기준으로 옮기는 작업
explanation: git switch는 파일 내용과 스테이징 상태를 대상 브랜치에 맞게 갱신하고, 이후 커밋이 그 브랜치 끝에 쌓이게 합니다. -c 옵션은 생성과 전환을 한 번에 수행합니다. 미커밋 변경을 든 채 전환하면 작업이 섞일 수 있습니다.
related: [Branch, Working Tree, Index (Staging Area)]
