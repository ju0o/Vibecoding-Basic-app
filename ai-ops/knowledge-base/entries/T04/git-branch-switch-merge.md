---
id: git-branch-switch-merge
title: "git branch / switch / merge — 흐름을 나누고 합치는 명령"
topicGroup: T04
status: approved
score: 90
level: 기초
prerequisites: [git-init-add-commit-status]
successors: [git-restore-reset-revert]
related: [git-log-diff-show]
sources:
  - { title: "git-branch — Git Documentation", url: "https://git-scm.com/docs/git-branch", checked: 2026-07-06 }
  - { title: "git-switch — Git Documentation", url: "https://git-scm.com/docs/git-switch", checked: 2026-07-06 }
  - { title: "git-merge — Git Documentation", url: "https://git-scm.com/docs/git-merge", checked: 2026-07-06 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-06
---

## 정의
git branch·switch·merge는 커밋 이력을 갈래로 나누고(branch), 작업 위치를 그 갈래로 옮기고(switch), 갈라진 이력을 다시 합치는(merge) 명령이다. 공식 요약: branch = "List, create, or delete branches", switch = "Switch branches", merge = "Join two or more development histories together". (출처: git-scm.com/docs/git-branch·git-switch·git-merge, 확인: 2026-07-06)

## 역사
switch 문서는 브랜치 전환이라는 단일 목적의 명령으로 서술된다 — 역사적으로 checkout이 "브랜치 전환"과 "파일 복원"을 겸했고, 현행 문서 체계는 전환(switch)과 복원(restore)을 분리해 안내한다 (복원은 git-restore-reset-revert KB). merge 문서는 이 명령이 git pull의 내부에서 쓰인다는 사실을 명시해, 원격 동기화가 merge 위에 서 있음을 보여준다. (출처: git-switch·git-merge, 확인: 2026-07-06)

## 해결하려는 문제
- 실험·기능·수정 작업을 본 이력과 분리한 채 진행한다: 브랜치는 새 이름이 현재 HEAD(또는 지정 시작점)를 가리키게 만드는 가벼운 참조다. (출처: git-branch, 확인: 2026-07-06)
- 갈라진 이력의 재통합: merge는 "이력이 갈라진 시점 이후"의 변경을 현재 브랜치로 편입한다. (출처: git-merge, 확인: 2026-07-06)
- 합칠 수 없는 충돌의 명시적 처리: 같은 영역을 양쪽이 수정하면 Git은 임의로 고르지 않고 사람에게 해결을 맡긴다. (출처: git-merge, 확인: 2026-07-06)

## 핵심 개념
1. **브랜치 = 포인터**: 새 브랜치는 "현재 HEAD 또는 start-point를 가리키는 새 branch head"다. 커밋을 복사하지 않는다. (출처: git-branch, 확인: 2026-07-06)
2. **나열과 현재 표시**: 인자 없는 branch는 기존 브랜치를 나열하고 현재 브랜치를 강조 표시한다. (출처: git-branch, 확인: 2026-07-06)
3. **switch의 3중 갱신**: 브랜치를 전환하면 워킹 트리와 인덱스가 그 브랜치에 맞게 갱신되고, 이후 새 커밋은 그 브랜치 끝에 쌓인다. (출처: git-switch, 확인: 2026-07-06)
4. **생성+전환**: `switch -c <new-branch>`는 start-point에서 새 브랜치를 만든 뒤 전환한다. (출처: git-switch, 확인: 2026-07-06)
5. **merge의 방향**: merge는 "이름 붙인 커밋들"의 변경을 **현재 브랜치로** 가져온다 — 어느 브랜치에 서서 실행하는지가 결과를 결정한다. (출처: git-merge, 확인: 2026-07-06)
6. **충돌의 정의**: 양쪽이 같은 영역을 다르게 수정했을 때만 충돌이며, Git은 양쪽 내용을 남겨 사람이 해결하게 한다. (출처: git-merge, 확인: 2026-07-06)

## 관련 기술
- switch vs checkout: 현행 문서 체계에서 브랜치 전환은 switch가 전담한다 (checkout은 복원 겸용의 구형 인터페이스).
- merge vs pull: pull이 내부적으로 merge를 사용한다 — 원격 변경 통합도 같은 충돌 규칙을 따른다. (출처: git-merge, 확인: 2026-07-06)
- branch 삭제: branch 명령의 요약("List, create, or delete")에 삭제가 포함된다. (출처: git-branch, 확인: 2026-07-06)

## 선행 개념
- git-init-add-commit-status: 브랜치는 커밋 그래프 위의 포인터이므로 커밋·HEAD 개념이 전제다.

## 후행 개념
- git-restore-reset-revert: 잘못 합쳤거나 잘못 커밋한 이력의 복구.
- 원격 협업(push/pull/PR) — 별도 KB 후보.

## AI 시대에서의 의미
AI에게 큰 변경을 맡길 때 브랜치가 안전판이 된다: 새 브랜치에서 AI 작업을 진행하면 본 이력이 오염되지 않고, 결과가 나쁘면 브랜치를 버리면 된다. merge의 "현재 브랜치로 편입" 규칙과 충돌의 정의를 알면, AI가 만든 브랜치를 합치기 전에 어디 서서 merge해야 하는지·충돌 해결 책임이 사람에게 있음을 판단할 수 있다. (근거: git-merge의 방향·충돌 규칙, 확인: 2026-07-06)

## 실무 활용
1. 기능 작업 분리: `git switch -c feature-x`로 생성+전환 → 작업·커밋 → 완료 후 main에서 `git merge feature-x`. (출처: git-switch -c·git-merge, 확인: 2026-07-06)
2. 충돌 해결 루틴: merge가 멈추면 충돌 파일에서 양쪽 내용을 확인·정리 후 add·commit으로 마무리. (출처: git-merge 충돌 규칙, 확인: 2026-07-06)
3. 현재 위치 확인 습관: 작업 전 `git branch`로 현재 브랜치(강조 표시)를 확인 — 잘못된 브랜치에 커밋하는 실수를 예방. (출처: git-branch, 확인: 2026-07-06)

## FAQ
Q: 브랜치를 만들면 파일이 복사되는가?
A: 아니다. 브랜치는 커밋을 가리키는 head(포인터)일 뿐이며, 생성 시점엔 현재 HEAD를 가리킨다. (출처: git-branch, 확인: 2026-07-06)
Q: switch하면 내 파일들은 어떻게 되는가?
A: 워킹 트리와 인덱스가 대상 브랜치 내용으로 갱신된다. 이후 커밋은 새 브랜치 끝에 쌓인다. (출처: git-switch, 확인: 2026-07-06)
Q: merge는 양방향인가?
A: 아니다. 지정한 커밋들의 변경이 "현재 브랜치로" 들어온다. A에 서서 B를 merge하면 A가 바뀐다. (출처: git-merge, 확인: 2026-07-06)
Q: 충돌은 언제 나는가?
A: 양쪽이 같은 영역을 다르게 수정했을 때다. Git은 임의 선택 대신 양쪽을 남겨 해결을 요구한다. (출처: git-merge, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 반대 방향 merge — 기능 브랜치에 서서 main을 merge해놓고 main이 갱신됐다고 착각. 왜 생기나: merge의 방향 규칙을 모름. 교정: 결과를 받을 브랜치에 서서 실행한다. (출처: git-merge, 확인: 2026-07-06)
2. 실수: 미커밋 변경을 든 채 switch해 작업이 섞임. 왜 생기나: switch가 워킹 트리를 갱신함을 간과. 교정: 전환 전 status 확인, 커밋 또는 보류 후 전환. (출처: git-switch, 확인: 2026-07-06)
3. 실수: 충돌 마커를 정리하지 않고 커밋. 왜 생기나: 충돌 해결을 자동으로 착각. 교정: 충돌은 사람이 양쪽 내용을 판단해 정리하는 단계다. (출처: git-merge, 확인: 2026-07-06)
4. 실수: 어느 브랜치에 있는지 모른 채 커밋. 왜 생기나: 전환 후 확인 생략. 교정: branch 나열의 현재 표시로 확인을 습관화. (출처: git-branch, 확인: 2026-07-06)

## 공식 출처
- 브랜치 나열·생성(포인터 의미) — [git-branch](https://git-scm.com/docs/git-branch) (확인: 2026-07-06)
- 전환 시 워킹 트리·인덱스 갱신, -c 생성 전환 — [git-switch](https://git-scm.com/docs/git-switch) (확인: 2026-07-06)
- 이력 편입 방향, pull과의 관계, 충돌 규칙 — [git-merge](https://git-scm.com/docs/git-merge) (확인: 2026-07-06)

## Quote Bank
- > "git-branch - List, create, or delete branches"
  - 출처: [git-branch](https://git-scm.com/docs/git-branch) (확인: 2026-07-06)
  - 맥락: 명령의 공식 한 줄 요약
- > "The command's second form creates a new branch head named <branch-name> which points to the current HEAD, or <start-point> if given."
  - 출처: [git-branch](https://git-scm.com/docs/git-branch) (확인: 2026-07-06)
  - 맥락: 브랜치 = 포인터라는 사실의 원문 근거
- > "Switch to a specified branch. The working tree and the index are updated to match the branch. All new commits will be added to the tip of this branch."
  - 출처: [git-switch](https://git-scm.com/docs/git-switch) (확인: 2026-07-06)
  - 맥락: 전환이 실제로 바꾸는 세 가지
- > "Create a new branch named <new-branch> starting at <start-point> before switching to the branch."
  - 출처: [git-switch](https://git-scm.com/docs/git-switch) (확인: 2026-07-06)
  - 맥락: -c 옵션 — 생성과 전환의 결합
- > "Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch."
  - 출처: [git-merge](https://git-scm.com/docs/git-merge) (확인: 2026-07-06)
  - 맥락: merge의 방향과 범위(분기 이후 변경)의 공식 정의
- > "When both sides made changes to the same area, however, Git cannot randomly pick one side over the other, and asks you to resolve it by leaving what both sides did to that area."
  - 출처: [git-merge](https://git-scm.com/docs/git-merge) (확인: 2026-07-06)
  - 맥락: 충돌의 정의와 해결 책임의 소재

## 변경 이력
- 2026-07-06: 최초 작성 (Fable — Codex 토큰 소진으로 운영자 승인 하 대행, P-01)
