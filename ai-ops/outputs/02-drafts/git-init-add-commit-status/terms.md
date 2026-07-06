# 용어 초안: git-init-add-commit-status

기존 glossary.ts 대조: Git 계열 용어 미등재 확인 (2026-07-06). 신규 6개.

## Repository (저장소)
category: Git
shortDefinition: 프로젝트의 전체 이력이 저장되는 공간 — 실체는 프로젝트 안의 .git 디렉터리
explanation: git init이 만드는 .git 디렉터리가 저장소의 실체이며, objects(내용물)·refs/heads(브랜치 포인터) 등이 그 안에 있습니다. 서버가 아니라 로컬 폴더이므로, 저장소 문제는 결국 파일 시스템 문제로 접근할 수 있습니다.
related: [Working Tree, Index (Staging Area), HEAD]

## Working Tree (워킹 트리)
category: Git
shortDefinition: 편집기로 실제 수정하는, 눈에 보이는 프로젝트 파일들의 영역
explanation: Git의 세 영역 중 첫 번째로, 아직 기록되지 않은 진행 중 작업이 머무는 곳입니다. git status의 "Changes not staged"와 "Untracked files"가 이 영역과 인덱스의 차이를 보여줍니다.
related: [Index (Staging Area), HEAD, Repository]

## Index (Staging Area)
category: Git
shortDefinition: 다음 커밋에 들어갈 내용을 골라 담아두는 준비 공간
explanation: 공식 문서가 index와 staging area를 같은 것으로 병기합니다. git add가 워킹 트리의 내용을 이곳에 올리고, git commit은 이곳의 내용만 기록합니다 — 이 분리가 부분 커밋을 가능하게 합니다.
related: [Working Tree, Commit, Repository]

## HEAD
category: Git
shortDefinition: 현재 작업의 기준이 되는 커밋 — 보통 현재 브랜치의 끝
explanation: 새 커밋은 HEAD의 직계 자식으로 만들어지고 브랜치가 그것을 가리키도록 갱신됩니다. status가 보여주는 "커밋될 것"은 HEAD와 인덱스의 차이입니다.
related: [Commit, Branch, Index (Staging Area)]

## Commit (커밋)
category: Git
shortDefinition: 인덱스의 내용과 메시지로 만들어지는, 되돌아갈 수 있는 기록 지점
explanation: 커밋은 저장 버튼이 아니라 이력 그래프에 노드를 추가하는 행위입니다. 부모-자식으로 연결된 커밋들이 이력을 이루며, 이 연결 덕분에 조회(log)·분기(branch)·복구(reset)가 가능해집니다.
related: [HEAD, Index (Staging Area), Repository]

## Untracked File (미추적 파일)
category: Git
shortDefinition: 워킹 트리에 있지만 Git이 아직 관리하지 않는 파일
explanation: git status의 세 번째 묶음으로 표시되며, git add를 거쳐야 추적이 시작됩니다. 실험 파일이나 비밀 키가 무심코 add되지 않도록, 반복 제외 대상은 .gitignore에 등록합니다.
related: [Working Tree, Index (Staging Area)]
