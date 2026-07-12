---
id: git-recovery-playbook
title: "Git 복구 플레이북 (Git Recovery Playbook)"
topicGroup: T04
status: approved
score: 89
level: 중급
prerequisites: [git-restore-reset-revert, git-log-diff-show]
successors: [private-ai-learning-site-project]
related: [git-rebase-cherry-pick-stash, github-pr-review-flow, gh-cli-reference]
consumers:
  lessons: [git-recovery-playbook]
  glossary: []
sources:
  - { title: "git-restore — Git Documentation", url: "https://git-scm.com/docs/git-restore", checked: 2026-07-12 }
  - { title: "git-revert — Git Documentation", url: "https://git-scm.com/docs/git-revert", checked: 2026-07-12 }
  - { title: "git-reflog — Git Documentation", url: "https://git-scm.com/docs/git-reflog", checked: 2026-07-12 }
  - { title: "git-clean — Git Documentation", url: "https://git-scm.com/docs/git-clean", checked: 2026-07-12 }
  - { title: "git-reset — Git Documentation", url: "https://git-scm.com/docs/git-reset", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
Git 복구 플레이북은 작업 트리, 스테이징 영역, 로컬 커밋, 공유 커밋, 미추적 파일을 상황별로 되돌리는 의사결정 절차다. 핵심은 "되돌리기 명령 하나"가 아니라 `status → diff/log/reflog → restore/reset/revert/clean 선택 → 검증` 순서다. AI와 협업할수록 복구 절차는 실수 후 수습이 아니라 안전한 실험을 가능하게 하는 기반이 된다.

## 역사
Git은 분산 버전 관리 도구라 로컬 repository 안에 working tree, index, HEAD, branch reference, reflog 같은 여러 상태층을 둔다. `restore`, `reset`, `revert`는 모두 되돌리기처럼 보이지만 Git 문서는 각각 working tree file restore, HEAD/index reset, existing commit revert로 역할을 나눈다. `reflog`는 branch tip과 reference update 기록을 관리해 "방금 전 HEAD가 어디였는지" 찾는 복구 장치가 된다. (출처: https://git-scm.com/docs/git-restore, https://git-scm.com/docs/git-revert, https://git-scm.com/docs/git-reflog, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 "파일을 되돌릴지", "스테이징만 풀지", "공유된 커밋을 취소할지", "미추적 build artifact를 지울지"를 한 명령으로 처리하려 한다. 그 결과 `reset --hard`나 `clean -fdx` 같은 파괴적 명령을 과하게 쓰기 쉽다. 복구 플레이북은 먼저 관찰하고, 보존해야 할 변경과 버릴 변경을 분리한 뒤, 가장 좁은 범위의 명령을 선택하게 만든다. (출처: https://git-scm.com/docs/git-clean, https://git-scm.com/docs/git-reset, 확인: 2026-07-12)

## 핵심 개념
1. **관찰 우선**: `git status`, `git diff`, `git log --oneline`, `git reflog`로 현재 상태와 되돌릴 지점을 먼저 찾는다. reflog는 reference tip update 기록이므로 lost commit 후보를 찾는 데 유용하다. (출처: https://git-scm.com/docs/git-reflog, 확인: 2026-07-12)
2. **파일 복원은 restore**: `git restore <path>`는 working tree path를 restore source 내용으로 되돌린다. `--staged`는 index를 복원하므로 "add 취소"에 적합하다. (출처: https://git-scm.com/docs/git-restore, 확인: 2026-07-12)
3. **공유 커밋 취소는 revert**: `git revert`는 기존 commit patch 효과를 뒤집는 새 commit을 기록한다. shared branch에서는 history를 지우지 않으므로 협업 안전성이 높다. (출처: https://git-scm.com/docs/git-revert, 확인: 2026-07-12)
4. **로컬 이력 정리는 reset**: reset은 HEAD/index/working tree를 target 상태로 맞추는 강한 도구다. `--keep`은 working tree 변경을 유지하려 하고 충돌 가능성이 있으면 disallow된다. (출처: https://git-scm.com/docs/git-reset, 확인: 2026-07-12)
5. **미추적 파일 삭제는 clean**: `git clean`은 version control 아래 있지 않은 파일을 제거한다. 실행 전 `--dry-run`으로 무엇이 지워질지 확인해야 한다. (출처: https://git-scm.com/docs/git-clean, 확인: 2026-07-12)
6. **복구 후 검증**: 복구 명령 뒤에는 `git status`, test/verify, `git show --stat` 등으로 의도한 파일만 바뀌었는지 확인한다.

## 관련 기술
- git-rebase-cherry-pick-stash: 복구 전 임시 보존 또는 commit 이동이 필요할 때 연결된다.
- github-pr-review-flow: 공유 branch나 PR에서는 reset보다 revert/새 commit으로 수정하는 흐름이 안전하다.
- gh-cli-reference: GitHub 상태 확인과 PR diff 확인을 CLI로 보조할 수 있다.

## 선행 개념
- git-restore-reset-revert: restore, reset, revert의 대상 차이를 알아야 한다.
- git-log-diff-show: 무엇이 바뀌었고 어느 commit으로 돌아갈지 읽을 수 있어야 한다.

## 후행 개념
- private-ai-learning-site-project: 최종 프로젝트에서 AI가 만든 변경을 안전하게 통합·복구하는 운영 플레이북으로 사용된다.

## AI 시대에서의 의미
AI 코딩은 빠른 실험을 늘리지만, 실험이 안전하려면 복구 경로가 먼저 있어야 한다. "AI가 파일을 망쳤다"는 감정적 판단 대신 status/diff/reflog를 보고, 파일 단위 restore, 커밋 단위 revert, 미추적 artifact clean을 분리하면 작업 흐름이 끊기지 않는다. 특히 자동화된 agent에게 destructive command를 허용하기 전에는 dry-run과 경로 제한, commit boundary를 요구해야 한다. (출처: https://git-scm.com/docs/git-clean, https://git-scm.com/docs/git-revert, 확인: 2026-07-12)

## 실무 활용
1. **AI가 수정한 파일 하나 폐기**: `git diff path`로 확인한 뒤 `git restore path`.
2. **실수로 staging한 파일 제외**: `git restore --staged path`로 index만 되돌린다.
3. **공유된 결함 커밋 취소**: `git revert <commit>`으로 반대 commit을 만든다.
4. **build artifact 정리**: `git clean -nd`로 삭제 후보를 확인하고, 의도한 경우에만 `git clean -fd`.
5. **잘못 reset한 지점 찾기**: `git reflog`에서 이전 HEAD를 찾고 새 branch로 보존한다.

```bash
git status --short
git diff -- src/app/page.tsx
git restore -- src/app/page.tsx
git status --short
```

## FAQ
Q: `reset --hard`가 가장 빠른 복구 방법 아닌가?
A: 빠르지만 범위가 넓다. Git 문서는 revert alternatives가 uncommitted changes를 discard할 수 있다고 경고한다. 파일 하나면 restore가 더 좁다. (출처: https://git-scm.com/docs/git-revert, 확인: 2026-07-12)

Q: revert와 reset은 언제 나누는가?
A: 공유 후에는 revert가 기본이다. revert는 earlier commits 효과를 뒤집는 새 commit을 기록한다. reset은 로컬 이력 정리에 적합하다. (출처: https://git-scm.com/docs/git-revert, 확인: 2026-07-12)

Q: clean은 언제 위험한가?
A: untracked 파일을 지우므로 생성물뿐 아니라 아직 add하지 않은 새 파일도 삭제될 수 있다. `--dry-run`으로 먼저 확인한다. (출처: https://git-scm.com/docs/git-clean, 확인: 2026-07-12)

## 자주 하는 실수
1. **상태 확인 없이 삭제 명령 실행**: 무엇이 사라지는지 모른다. 교정: `status`, `diff`, `clean -n`을 먼저 실행한다.
2. **공유 branch에서 reset 사용**: 다른 사람의 history와 충돌한다. 교정: shared history는 revert commit으로 수정한다.
3. **reflog를 모름**: reset 후 "커밋이 사라졌다"고 판단한다. 교정: reflog에서 HEAD 이동 기록을 확인한다.
4. **ignored build output과 새 소스 파일을 함께 지움**: `clean -fdx`가 너무 넓다. 교정: pathspec과 dry-run으로 범위를 좁힌다.

## 공식 출처
- working tree와 index 복원 — [git-restore](https://git-scm.com/docs/git-restore) (확인 날짜: 2026-07-12)
- 공유 이력 취소와 clean working tree 전제 — [git-revert](https://git-scm.com/docs/git-revert) (확인 날짜: 2026-07-12)
- HEAD/reference 이동 기록 — [git-reflog](https://git-scm.com/docs/git-reflog) (확인 날짜: 2026-07-12)
- 미추적 파일 삭제와 dry-run — [git-clean](https://git-scm.com/docs/git-clean) (확인 날짜: 2026-07-12)
- reset --merge/--keep 의미 — [git-reset](https://git-scm.com/docs/git-reset) (확인 날짜: 2026-07-12)

## Quote Bank
- > "git-restore - Restore working tree files"
  - 출처: [git-restore](https://git-scm.com/docs/git-restore) (확인: 2026-07-12)
  - 맥락: 파일 복구는 restore가 담당한다는 정의에 사용한다.
- > "record some new commits that record them"
  - 출처: [git-revert](https://git-scm.com/docs/git-revert) (확인: 2026-07-12)
  - 맥락: revert가 history 삭제가 아니라 새 commit 생성임을 설명할 때 사용한다.
- > "Reference logs, or \"reflogs\", record when the tips of branches and other references were updated"
  - 출처: [git-reflog](https://git-scm.com/docs/git-reflog) (확인: 2026-07-12)
  - 맥락: reflog를 복구 지도라고 설명할 때 사용한다.
- > "Remove untracked files from the working tree"
  - 출처: [git-clean](https://git-scm.com/docs/git-clean) (확인: 2026-07-12)
  - 맥락: clean의 대상이 tracked file이 아님을 설명할 때 사용한다.
- > "Don’t actually remove anything, just show what would be done."
  - 출처: [git-clean](https://git-scm.com/docs/git-clean) (확인: 2026-07-12)
  - 맥락: dry-run의 안전 절차를 설명할 때 사용한다.
- > "`git` `reset` `--keep` is meant to be used when removing some of the last commits"
  - 출처: [git-reset](https://git-scm.com/docs/git-reset) (확인: 2026-07-12)
  - 맥락: reset mode 선택과 working tree 보존 조건을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
