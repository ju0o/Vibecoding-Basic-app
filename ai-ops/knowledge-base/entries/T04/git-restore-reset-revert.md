---
id: git-restore-reset-revert
title: "git restore / reset / revert — 되돌리기 3형제의 정확한 구분"
topicGroup: T04
status: approved
score: 92
level: 중급
prerequisites: [git-log-diff-show, git-branch-switch-merge]
successors: []
related: [git-init-add-commit-status, ai-learning-verification]
sources:
  - { title: "git-restore — Git Documentation", url: "https://git-scm.com/docs/git-restore", checked: 2026-07-06 }
  - { title: "git-reset — Git Documentation", url: "https://git-scm.com/docs/git-reset", checked: 2026-07-06 }
  - { title: "git-revert — Git Documentation", url: "https://git-scm.com/docs/git-revert", checked: 2026-07-06 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-06
---

## 정의
restore·reset·revert는 모두 "되돌리기"지만 대상이 다르다: restore = **파일 내용**을 복원 소스에서 되살림, reset = **HEAD 또는 인덱스**를 알려진 상태로 이동, revert = 기존 커밋의 효과를 뒤집는 **새 커밋을 기록**. 공식 요약: restore = "Restore working tree files", reset = "Set HEAD or the index to a known state", revert = "Revert some existing commits". (출처: git-scm.com/docs/git-restore·git-reset·git-revert, 확인: 2026-07-06)

## 역사
세 명령의 혼동은 공식 문서가 직접 다룰 만큼 역사적이다 — revert 문서는 Note로 "커밋 효과를 뒤집는 새 커밋 기록은 revert, 미커밋 변경 폐기는 reset --hard, 다른 커밋 시점의 특정 파일 추출은 restore --source"라고 용도를 갈라 안내하고, git(1)의 "Reset, restore and revert" 절을 참조시킨다. (출처: git-revert, 확인: 2026-07-06)
restore는 checkout이 겸하던 파일 복원 역할을 분리한 명령으로, 워킹 트리 복원과 `--staged` 인덱스 복원을 나눠 제공한다. (출처: git-restore, 확인: 2026-07-06)

## 해결하려는 문제
- 파일 하나만 이전 상태로: restore는 지정 경로를 복원 소스의 내용으로 되살린다. (출처: git-restore, 확인: 2026-07-06)
- 스테이징 취소·커밋 합치기·전부 폐기: reset의 세 모드가 각각 담당한다. (출처: git-reset, 확인: 2026-07-06)
- 공유된 이력의 안전한 취소: revert는 이력을 지우지 않고 반대 변경을 새 커밋으로 쌓는다. (출처: git-revert, 확인: 2026-07-06)

## 핵심 개념
1. **restore의 두 대상**: 기본은 워킹 트리, `--staged`는 인덱스, `--staged --worktree`는 둘 다 복원한다. 복원 소스에 없는 추적 파일은 소스에 맞춰 제거된다. (출처: git-restore, 확인: 2026-07-06)
2. **reset --soft**: 워킹 트리와 인덱스는 그대로, HEAD만 이동 — 문서 예시처럼 최근 5개 커밋을 1개로 합칠 때 쓴다. (출처: git-reset, 확인: 2026-07-06)
3. **reset --mixed(기본)**: 워킹 디렉터리는 그대로, 인덱스를 새 HEAD에 맞춰 갱신 — 스테이징만 풀린다. (출처: git-reset, 확인: 2026-07-06)
4. **reset --hard**: 모든 파일·디렉터리를 지정 커밋 버전으로 덮어쓰며, 미추적 파일을 덮어쓸 수도 있다 — 3형제 중 유일하게 작업 내용을 파괴할 수 있는 모드. (출처: git-reset, 확인: 2026-07-06)
5. **revert의 전제와 산출**: 워킹 트리가 깨끗해야 하며(clean), 결과는 "이력 삭제"가 아니라 "반대 패치를 담은 새 커밋"이다. (출처: git-revert, 확인: 2026-07-06)
6. **선택 기준 요약**: 커밋 전 실수 → restore / 커밋했지만 공유 전 → reset / 이미 공유됨 → revert. (근거: git-revert Note의 용도 구분, 확인: 2026-07-06)

## 관련 기술
- restore --source: 다른 커밋 시점의 특정 파일만 꺼낼 때 — revert 문서가 명시하는 대안. (출처: git-revert, 확인: 2026-07-06)
- reset vs revert: reset은 브랜치 포인터·인덱스를 움직이고, revert는 커밋을 추가한다 — 공유 이력에는 revert가 안전하다. (출처: git-revert Note, 확인: 2026-07-06)
- commit --amend: 직전 커밋 하나의 교체는 amend가 더 간단 (git-init-add-commit-status KB).

## 선행 개념
- git-log-diff-show: 무엇을 어디까지 되돌릴지 특정하려면 먼저 이력·차이를 읽어야 한다.
- git-branch-switch-merge: HEAD·브랜치 포인터 개념 위에서 reset의 의미가 성립한다.

## 후행 개념
- 원격 공유 이후의 이력 관리 (force push의 위험, PR 정정 흐름) — 별도 KB 후보.

## AI 시대에서의 의미
AI 협업에서 가장 자주 필요한 안전장치가 이 3형제다: AI가 워킹 트리를 망치면 restore, 잘못된 커밋 묶음을 정리하려면 reset(공유 전), 이미 릴리스된 잘못을 취소하려면 revert. 특히 --hard가 미추적 파일까지 덮어쓸 수 있다는 문서 경고는, AI에게 "reset --hard 해줘"라고 시키기 전에 사람이 반드시 알아야 할 파괴 반경이다. (근거: git-reset --hard·git-revert Note, 확인: 2026-07-06)

## 실무 활용
1. AI가 어지럽힌 파일 복원: `git restore <path>` — 인덱스는 유지되고 워킹 트리만 마지막 스테이징/커밋 상태로. (출처: git-restore, 확인: 2026-07-06)
2. 실수로 add한 것 취소: `git restore --staged <path>` — 내용은 그대로, 스테이징만 해제. (출처: git-restore, 확인: 2026-07-06)
3. 로컬 커밋 합치기: `git reset --soft HEAD~5` 후 재커밋 — 문서 예시 그대로. (출처: git-reset, 확인: 2026-07-06)
4. 릴리스된 결함 취소: `git revert <해시>` — 이력을 보존하며 반대 커밋 기록. 이 프로젝트의 Loop B 3회 실패 시 "통합 revert" 절차가 이 명령을 전제한다. (출처: git-revert, 확인: 2026-07-06)

## FAQ
Q: reset과 revert 중 무엇을 써야 하는가?
A: 공유 여부로 가른다. 공식 문서는 "이전 커밋 효과를 뒤집는 새 커밋 기록"이 revert의 용도라고 명시한다 — 이미 공유된 이력엔 revert다. (출처: git-revert Note, 확인: 2026-07-06)
Q: reset의 기본 모드는?
A: --mixed다. 워킹 디렉터리는 두고 인덱스를 새 HEAD에 맞춰, 아무것도 스테이징되지 않은 상태로 만든다. (출처: git-reset, 확인: 2026-07-06)
Q: restore가 파일을 지울 수도 있는가?
A: 있다. 추적 중인 경로가 복원 소스에 없으면 소스에 맞추기 위해 제거된다. (출처: git-restore, 확인: 2026-07-06)
Q: revert는 아무 때나 실행되는가?
A: 아니다. 워킹 트리가 HEAD 대비 깨끗해야 한다. 변경이 있으면 먼저 커밋하거나 치워야 한다. (출처: git-revert, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 스테이징 취소에 reset --hard를 쓴다. 왜 생기나: 모드 차이를 모름. 교정: 스테이징만 풀려면 restore --staged(또는 mixed reset)면 충분 — hard는 파일 내용까지 덮어쓴다. (출처: git-reset·git-restore, 확인: 2026-07-06)
2. 실수: 공유된 브랜치에서 reset으로 이력을 지운다. 왜 생기나: 로컬 감각으로 공유 이력을 다룸. 교정: 공유 후엔 revert — 이력 보존형 취소. (출처: git-revert Note, 확인: 2026-07-06)
3. 실수: --hard 실행 후 미추적 파일이 사라져 놀란다. 왜 생기나: hard가 미추적 파일을 덮어쓸 수 있음을 모름. 교정: 실행 전 status로 미추적 파일 확인·백업. (출처: git-reset --hard, 확인: 2026-07-06)
4. 실수: 더러운 워킹 트리에서 revert 시도 후 오류에 당황. 왜 생기나: clean 전제 조건을 모름. 교정: 커밋 또는 정리 후 revert. (출처: git-revert, 확인: 2026-07-06)

## 공식 출처
- 워킹 트리/인덱스 복원, --staged, 소스 부재 시 제거 — [git-restore](https://git-scm.com/docs/git-restore) (확인: 2026-07-06)
- --soft/--mixed/--hard 3모드 — [git-reset](https://git-scm.com/docs/git-reset) (확인: 2026-07-06)
- 반대 커밋 기록, clean 전제, reset·restore와의 용도 구분 — [git-revert](https://git-scm.com/docs/git-revert) (확인: 2026-07-06)

## Quote Bank
- > "Restore specified paths in the working tree with some contents from a restore source."
  - 출처: [git-restore](https://git-scm.com/docs/git-restore) (확인: 2026-07-06)
  - 맥락: restore의 공식 정의 — 대상은 파일 내용
- > "The command can also be used to restore the content in the index with --staged, or restore both the working tree and the index with --staged --worktree."
  - 출처: [git-restore](https://git-scm.com/docs/git-restore) (확인: 2026-07-06)
  - 맥락: 스테이징 취소가 restore의 정식 용법이라는 근거
- > "Leave your working tree files and the index unchanged. For example, if you have no staged changes, you can use git reset --soft HEAD~5; git commit to combine the last 5 commits into 1 commit."
  - 출처: [git-reset](https://git-scm.com/docs/git-reset) (확인: 2026-07-06)
  - 맥락: --soft의 정의와 문서 자체의 커밋 합치기 예시
- > "Update the index to match the new HEAD, so nothing will be staged."
  - 출처: [git-reset](https://git-scm.com/docs/git-reset) (확인: 2026-07-06)
  - 맥락: 기본 모드(--mixed)가 하는 일
- > "Overwrite all files and directories with the version from <commit>, and may overwrite untracked files."
  - 출처: [git-reset](https://git-scm.com/docs/git-reset) (확인: 2026-07-06)
  - 맥락: --hard의 파괴 반경 — 미추적 파일 경고
- > "Given one or more existing commits, revert the changes that the related patches introduce, and record some new commits that record them."
  - 출처: [git-revert](https://git-scm.com/docs/git-revert) (확인: 2026-07-06)
  - 맥락: revert = 이력 보존형 취소의 공식 정의
- > "Note: git revert is used to record some new commits to reverse the effect of some earlier commits (often only a faulty one)."
  - 출처: [git-revert](https://git-scm.com/docs/git-revert) (확인: 2026-07-06)
  - 맥락: 3형제 용도 구분의 원문 — 문서가 직접 혼동을 정리

## 변경 이력
- 2026-07-06: 최초 작성 (Fable — Codex 토큰 소진으로 운영자 승인 하 대행, P-01)
