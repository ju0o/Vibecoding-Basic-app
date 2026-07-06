---
id: git-init-add-commit-status
title: "git init / add / commit / status — 기록 사이클의 4개 명령"
topicGroup: T04
status: approved
score: 91
level: 기초
prerequisites: [files-folders-paths, terminal-shell-commands]
successors: [git-branch-switch-merge, git-log-diff-show]
related: [git-restore-reset-revert, dev-environment-map]
sources:
  - { title: "git-init — Git Documentation", url: "https://git-scm.com/docs/git-init", checked: 2026-07-06 }
  - { title: "git-add — Git Documentation", url: "https://git-scm.com/docs/git-add", checked: 2026-07-06 }
  - { title: "git-commit — Git Documentation", url: "https://git-scm.com/docs/git-commit", checked: 2026-07-06 }
  - { title: "git-status — Git Documentation", url: "https://git-scm.com/docs/git-status", checked: 2026-07-06 }
consumers:
  lessons: [git-init-add-commit-status]
  glossary: ["Repository (저장소)", "Working Tree", "Index (Staging Area)", "HEAD", "Commit (Git)", "Untracked File"]
updated: 2026-07-06
---

## 정의
git init·add·commit·status는 저장소를 만들고, 변경을 인덱스(스테이징 영역)에 올리고, 커밋으로 기록하고, 세 상태(HEAD/인덱스/워킹 트리)의 차이를 확인하는 Git의 기본 기록 사이클이다. 공식 문서 기준 각 명령의 요약은: init = "Create an empty Git repository or reinitialize an existing one", add = "Add file contents to the index", commit = "Record changes to the repository", status = "Show the working tree status". (출처: git-scm.com/docs/git-init·git-add·git-commit·git-status, 확인: 2026-07-06)

## 역사
현행 man 페이지가 보여주는 설계 유산: init 문서는 저장소의 물리 구조(`.git` 아래 objects, refs/heads, refs/tags)를 그대로 노출하고, `--initial-branch` 옵션으로 초기 브랜치 이름을 선택할 수 있게 한다 — 기본 브랜치 이름이 설정 가능해진 변화가 옵션으로 남아 있다. (출처: https://git-scm.com/docs/git-init, 확인: 2026-07-06)
add 문서는 "index"의 별칭으로 "staging area"를 병기한다 — 두 용어가 역사적으로 혼용되어 왔음을 문서 자체가 반영한다. (출처: https://git-scm.com/docs/git-add, 확인: 2026-07-06)

## 해결하려는 문제
- **부분 기록**: 작업 전체가 아니라 준비된 변경만 커밋한다. "When you run git commit without any other arguments, it will only commit staged changes." (출처: git-add, 확인: 2026-07-06)
- **안전한 초기화**: "Running git init in an existing repository is safe. It will not overwrite things that are already there." (출처: git-init, 확인: 2026-07-06)
- **상태 가시성**: status는 커밋될 것(HEAD↔인덱스), 커밋할 수 있는 것(인덱스↔워킹 트리), 추적되지 않는 것을 구분해 보여준다. (출처: git-status, 확인: 2026-07-06)

## 핵심 개념
1. **저장소 구조**: init은 `.git` 디렉터리(objects, refs/heads, refs/tags, 템플릿 파일)를 만든다. 커밋 없는 초기 브랜치가 생성된다. (출처: git-init, 확인: 2026-07-06)
2. **인덱스(스테이징 영역)**: 다음 커밋의 내용을 준비하는 공간. add가 새/변경 파일 내용을 인덱스에 올린다. (출처: git-add, 확인: 2026-07-06)
3. **커밋의 부모 관계**: 새 커밋은 인덱스의 현재 내용과 로그 메시지로 만들어지며, HEAD의 직계 자식이 되고 브랜치가 그 커밋을 가리키도록 갱신된다. (출처: git-commit, 확인: 2026-07-06)
4. **세 영역 비교**: status의 출력은 (a) HEAD↔인덱스 차이 = 지금 커밋될 것, (b) 워킹 트리↔인덱스 차이 + (c) 미추적 파일 = add하면 커밋할 수 있는 것. (출처: git-status, 확인: 2026-07-06)
5. **부분 스테이징**: `git add -p`는 인덱스와 워킹 트리 사이의 패치 덩어리(hunk)를 대화식으로 골라 올린다. `git add -A`는 추가·수정·삭제를 모두 인덱스에 반영해 워킹 트리와 일치시킨다. (출처: git-add, 확인: 2026-07-06)
6. **커밋 수정**: `--amend`는 현재 브랜치 끝을 새 커밋으로 교체한다. (출처: git-commit, 확인: 2026-07-06)

## 관련 기술
- add vs commit: add는 인덱스 준비, commit은 인덱스를 영구 기록으로 고정 — 두 단계 분리가 부분 기록을 가능케 한다. (출처: git-add·git-commit, 확인: 2026-07-06)
- status vs log: status는 "지금"의 세 영역 차이, log는 과거 커밋 이력 (→ git-log-diff-show KB).
- GIT_DIR 환경변수: 저장소 위치를 `./.git` 대신 지정할 수 있다. (출처: git-init, 확인: 2026-07-06)

## 선행 개념
- files-folders-paths: `.git` 디렉터리와 워킹 트리가 파일 시스템 개념 위에 서 있다.
- terminal-shell-commands: 네 명령 모두 터미널에서 실행한다.

## 후행 개념
- git-branch-switch-merge: 커밋이 쌓인 뒤 작업 흐름을 나누는 명령들.
- git-log-diff-show: 기록된 커밋을 조회·비교하는 명령들.

## AI 시대에서의 의미
AI 코딩 도구는 커밋을 체크포인트로 사용한다 — AI가 만든 변경을 검토한 뒤 커밋해야 잘못된 변경을 안전하게 되돌릴 수 있다. status의 세 영역 구분을 읽을 줄 알면 "AI가 무엇을 바꿨고 그중 무엇을 기록할지"를 사람이 통제할 수 있으며, add -p는 AI 변경 중 일부만 선별 수용하는 도구가 된다. (근거: git-add의 staged-only 커밋 규칙, git-status의 영역 구분 — 확인: 2026-07-06)

## 실무 활용
1. 새 프로젝트 시작: `git init` → 첫 파일 작성 → `git add .` → `git commit -m "..."` — 이 KB의 사이클 전체.
2. AI 변경 선별 수용: `git add -p`로 훑으며 수용할 hunk만 스테이징, 나머지는 워킹 트리에 남긴다. (출처: git-add -p, 확인: 2026-07-06)
3. 커밋 직전 점검: `git status`로 "커밋될 것"과 "빠진 것"을 확인 — 이 프로젝트의 P-08 커밋 누락 사례가 이 점검의 필요성을 보여준다.
4. 메시지 오타 수정: 푸시 전이라면 `git commit --amend`로 브랜치 끝을 교체한다. (출처: git-commit --amend, 확인: 2026-07-06)

## FAQ
Q: git init을 이미 저장소인 곳에서 또 실행하면 망가지는가?
A: 아니다. 문서가 명시적으로 안전하다고 밝히며, 기존 내용을 덮어쓰지 않는다. 재실행의 주 용도는 새 템플릿 반영이다. (출처: git-init, 확인: 2026-07-06)
Q: add 없이 commit하면 어떻게 되는가?
A: 인자 없는 commit은 스테이징된 변경만 기록한다. 워킹 트리에만 있는 변경은 커밋에 포함되지 않는다. (출처: git-add, 확인: 2026-07-06)
Q: 인덱스와 스테이징 영역은 다른 것인가?
A: 같은 것이다. 공식 문서가 "index"(also known as the "staging area")로 병기한다. (출처: git-add, 확인: 2026-07-06)
Q: status가 보여주는 세 묶음은 각각 무엇인가?
A: HEAD↔인덱스 차이(커밋될 것), 워킹 트리↔인덱스 차이, 미추적 파일 — 뒤 둘은 add를 거치면 커밋할 수 있는 것이다. (출처: git-status, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 파일을 수정하고 add를 다시 하지 않은 채 commit한다. 왜 생기나: add가 "그 시점의 내용"을 올린다는 것을 모름. 교정: commit 전 status로 워킹 트리↔인덱스 차이를 확인한다. (출처: git-status, 확인: 2026-07-06)
2. 실수: `git add .`로 의도치 않은 파일까지 스테이징한다. 왜 생기나: 전체 추가가 습관화됨. 교정: status로 미추적 파일을 먼저 보고, 선별이 필요하면 -p를 쓴다. (출처: git-add, 확인: 2026-07-06)
3. 실수: 푸시된 커밋에 --amend를 쓴다. 왜 생기나: amend가 "수정"이 아니라 "교체"임을 모름. 교정: amend는 브랜치 끝을 새 커밋으로 교체하므로 공유 전 커밋에만 쓴다. (출처: git-commit, 확인: 2026-07-06)
4. 실수: init 위치를 잘못 잡아 상위 폴더 전체가 저장소가 된다. 왜 생기나: 현재 디렉터리 기준 동작을 간과. 교정: init 전 pwd 확인 — 저장소는 `./.git`을 기준으로 만들어진다. (출처: git-init, 확인: 2026-07-06)

## 공식 출처
- 저장소 생성·구조·재실행 안전성 — [git-init](https://git-scm.com/docs/git-init) (확인: 2026-07-06)
- 인덱스 정의·staged-only 커밋·-p/-A — [git-add](https://git-scm.com/docs/git-add) (확인: 2026-07-06)
- 커밋 생성·HEAD 자식 관계·--amend — [git-commit](https://git-scm.com/docs/git-commit) (확인: 2026-07-06)
- 세 영역 차이 표시 — [git-status](https://git-scm.com/docs/git-status) (확인: 2026-07-06)

## Quote Bank
- > "This command creates an empty Git repository - basically a .git directory with subdirectories for objects, refs/heads, refs/tags, and template files."
  - 출처: [git-init](https://git-scm.com/docs/git-init) (확인: 2026-07-06)
  - 맥락: 저장소의 물리 구조 — init이 실제로 만드는 것
- > "Running git init in an existing repository is safe. It will not overwrite things that are already there."
  - 출처: [git-init](https://git-scm.com/docs/git-init) (확인: 2026-07-06)
  - 맥락: 재실행 안전성 — 입문자의 공포 해소
- > "When you run git commit without any other arguments, it will only commit staged changes."
  - 출처: [git-add](https://git-scm.com/docs/git-add) (확인: 2026-07-06)
  - 맥락: add-commit 2단계 모델의 핵심 규칙
- > "Interactively choose hunks of patch between the index and the work tree and add them to the index."
  - 출처: [git-add](https://git-scm.com/docs/git-add) (확인: 2026-07-06)
  - 맥락: -p 옵션 — AI 변경 선별 수용의 근거
- > "Create a new commit containing the current contents of the index and the given log message describing the changes."
  - 출처: [git-commit](https://git-scm.com/docs/git-commit) (확인: 2026-07-06)
  - 맥락: 커밋의 공식 정의 — 인덱스 내용 + 메시지
- > "The new commit is a direct child of HEAD, usually the tip of the current branch, and the branch is updated to point to it [...]"
  - 출처: [git-commit](https://git-scm.com/docs/git-commit) (확인: 2026-07-06)
  - 맥락: 커밋 그래프의 부모-자식 관계
- > "Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree and the index file, and paths in the working tree that are not tracked by Git [...]"
  - 출처: [git-status](https://git-scm.com/docs/git-status) (확인: 2026-07-06)
  - 맥락: status 출력의 세 묶음 구분

## 변경 이력
- 2026-07-06: 최초 작성 (Fable — Codex 토큰 소진으로 운영자 승인 하 대행, P-01)
