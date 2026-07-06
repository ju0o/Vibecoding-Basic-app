---
id: git-rebase-cherry-pick-stash
title: "git rebase / cherry-pick / stash — 이력 편집과 임시 보관"
topicGroup: T04
status: approved
score: 91
level: 중급
prerequisites: [git-branch-switch-merge, git-restore-reset-revert]
successors: []
related: [git-log-diff-show]
sources:
  - { title: "git-rebase — Git Documentation", url: "https://git-scm.com/docs/git-rebase", checked: 2026-07-07 }
  - { title: "git-cherry-pick — Git Documentation", url: "https://git-scm.com/docs/git-cherry-pick", checked: 2026-07-07 }
  - { title: "git-stash — Git Documentation", url: "https://git-scm.com/docs/git-stash", checked: 2026-07-07 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-07
---

## 정의
rebase·cherry-pick·stash는 커밋 그래프를 편집하거나 작업을 임시 보관하는 고급 도구다. 공식 요약: rebase = "Reapply commits on top of another base tip"(커밋들을 다른 기반 끝 위에 재적용), cherry-pick = "Apply the changes introduced by some existing commits"(기존 커밋들의 변경을 적용해 각각 새 커밋으로 기록), stash = "Stash the changes in a dirty working directory away"(더러운 워킹 디렉터리의 변경을 치워 보관). (출처: git-scm.com/docs/git-rebase·git-cherry-pick·git-stash, 확인: 2026-07-07)

## 역사
rebase 문서는 이력 재작성의 위험을 본문에서 직접 경고한다 — 다른 사람이 기반으로 삼은 브랜치를 rebase하는 것은 나쁜 생각이며, 하류의 모두가 수동으로 이력을 고쳐야 한다. merge(이력 보존)와 rebase(이력 재작성)라는 두 통합 철학의 긴장이 문서 자체에 반영되어 있다. (출처: git-rebase, 확인: 2026-07-07)

## 해결하려는 문제
- 갈라진 브랜치를 병합 커밋 없이 최신 기반 위로 옮기기: rebase는 "일련의 커밋을 다른 시작점 위로 이식(transplant)"한다. (출처: git-rebase, 확인: 2026-07-07)
- 특정 커밋 하나만 다른 브랜치로 가져오기: cherry-pick은 커밋별로 그 변경을 적용해 새 커밋을 기록한다. (출처: git-cherry-pick, 확인: 2026-07-07)
- 커밋하기 애매한 진행 중 작업을 치우고 깨끗한 상태로 돌아가기: stash는 로컬 수정을 보관하고 워킹 디렉터리를 HEAD 커밋에 맞게 되돌린다. (출처: git-stash, 확인: 2026-07-07)

## 핵심 개념
1. **rebase = 재적용**: topic이 E에서 갈라져 A-B-C를 쌓았고 master가 F-G로 전진했다면, `git rebase master`는 A'-B'-C'를 G 위에 다시 만든다 — 원래 커밋이 이동하는 것이 아니라 **같은 변경의 새 커밋**이 생긴다(A→A'). (출처: git-rebase 문서의 다이어그램 예시, 확인: 2026-07-07)
2. **rebase 진행 제어**: 충돌 시 `--continue`(해결 후 계속), `--abort`(원상 복귀), `--skip`(문제 커밋 건너뜀). 인터랙티브 모드(-i)는 커밋 재배열·결합에 쓰인다. (출처: git-rebase, 확인: 2026-07-07)
3. **공유 이력 재작성 금지**: "다른 사람이 기반으로 삼은 브랜치의 rebase(또는 어떤 형태의 재작성이든)는 나쁜 생각" — 하류 전원이 수동 수습을 강요당한다. (출처: git-rebase, 확인: 2026-07-07)
4. **cherry-pick의 전제와 산출**: 워킹 트리가 깨끗해야 하며(revert와 동일), 커밋마다 새 커밋이 기록된다. 적용이 어려우면 CHERRY_PICK_HEAD가 설정되고 충돌 경로는 병합과 같은 충돌 마커로 남는다. (출처: git-cherry-pick, 확인: 2026-07-07)
5. **stash의 동작**: 워킹 디렉터리와 인덱스의 현재 상태를 기록·보관하고 워킹 디렉터리를 HEAD에 맞춰 되돌린다. 보관물은 `stash list`로 나열, `stash show`로 열람, `stash apply`로 복원(다른 커밋 위에도 가능)한다. (출처: git-stash, 확인: 2026-07-07)
6. **선택 기준**: 브랜치 전체를 최신화 → rebase / 커밋 하나만 이식 → cherry-pick / 커밋 없이 잠깐 치우기 → stash. (근거: 세 문서의 NAME·DESCRIPTION 비교, 확인: 2026-07-07)

## 관련 기술
- rebase vs merge: merge는 이력을 보존하며 병합 커밋을 만들고, rebase는 이력을 다시 써 평평하게 만든다 — 공유 전 로컬 정리는 rebase, 공유 후 통합은 merge가 안전 기본값. (출처: git-rebase 경고·git-merge, 확인: 2026-07-07)
- cherry-pick vs revert: 같은 "커밋 단위 적용" 메커니즘의 정방향/역방향 — revert는 반대 패치를, cherry-pick은 그대로의 패치를 새 커밋으로 기록한다. (출처: git-cherry-pick·git-revert, 확인: 2026-07-07)
- stash vs 임시 커밋: switch 전 임시 커밋("wip") 대신 stash를 쓰면 이력에 흔적 없이 치울 수 있다 — 단 보관물은 브랜치보다 잊히기 쉽다. (출처: git-stash, 확인: 2026-07-07)

## 선행 개념
- git-branch-switch-merge: rebase는 브랜치·병합 개념 위의 대안 통합 전략이다.
- git-restore-reset-revert: "공유 전/후" 판단 기준과 충돌 해결 절차를 공유한다.

## 후행 개념
- GitHub PR 흐름 (github-pr-review-flow KB 예정): PR 정리에 rebase가 실무적으로 쓰이는 맥락.

## AI 시대에서의 의미
AI가 만든 지저분한 커밋 열(자잘한 wip 커밋들)을 공유 전에 정리하는 도구가 rebase -i이고, AI 브랜치에서 좋은 커밋 하나만 본 이력으로 건지는 도구가 cherry-pick이다. stash는 AI에게 작업을 맡기기 직전 "내 진행 중 수정을 잠깐 치워 깨끗한 상태를 만들어주는" 준비 동작으로 쓰인다. 셋 모두 "공유 이력 재작성 금지"라는 rebase 문서의 경고 아래에서만 안전하다. (근거: git-rebase 경고·git-stash DESCRIPTION, 확인: 2026-07-07)

## 실무 활용
1. PR 올리기 전 정리: `git rebase -i`로 wip 커밋들을 의미 단위로 결합·재배열 (공유 전에만). (출처: git-rebase -i, 확인: 2026-07-07)
2. 긴급 수정 이식: main의 핫픽스 커밋을 릴리스 브랜치로 `git cherry-pick <해시>`. (출처: git-cherry-pick, 확인: 2026-07-07)
3. 급한 전환 전 치우기: `git stash` → 브랜치 전환·작업 → 복귀 후 `git stash apply`. (출처: git-stash, 확인: 2026-07-07)
4. rebase 중 사고 복구: 상황이 꼬이면 `git rebase --abort`가 시작 전 상태로 되돌린다. (출처: git-rebase, 확인: 2026-07-07)

## FAQ
Q: rebase하면 커밋이 "이동"하는가?
A: 아니다. 같은 변경 내용의 **새 커밋**(A')이 새 기반 위에 만들어진다 — 해시가 바뀌므로 공유된 이력에서 문제가 된다. (출처: git-rebase 예시, 확인: 2026-07-07)
Q: rebase와 merge 중 무엇을 써야 하는가?
A: 공유 여부가 기준이다. 공유 전 로컬 정리는 rebase, 이미 공유된 이력의 통합은 merge — rebase 문서가 공유 브랜치 재작성을 명시적으로 경고한다. (출처: git-rebase, 확인: 2026-07-07)
Q: cherry-pick도 충돌이 나는가?
A: 난다. 적용이 어려운 경로는 병합과 동일한 충돌 마커로 남고, 해결 방식도 동일하다. (출처: git-cherry-pick, 확인: 2026-07-07)
Q: stash한 것은 어디에 있고 어떻게 꺼내는가?
A: stash 목록에 보관된다 — `stash list`로 나열, `show`로 열람, `apply`로 복원하며 다른 커밋 위에 복원할 수도 있다. (출처: git-stash, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: 푸시한 브랜치를 rebase하고 강제 푸시. 왜 생기나: 로컬 정리 습관을 공유 이력에 적용. 교정: 공유 후엔 merge — 문서의 "bad idea" 경고 그대로. (출처: git-rebase, 확인: 2026-07-07)
2. 실수: rebase 충돌에서 당황해 이것저것 실행. 왜 생기나: 진행 제어 3종을 모름. 교정: 해결 후 --continue, 포기는 --abort — abort는 항상 안전한 출구다. (출처: git-rebase, 확인: 2026-07-07)
3. 실수: cherry-pick으로 여러 커밋을 이식한 뒤 원 브랜치도 merge해 중복 적용. 왜 생기나: cherry-pick이 새 커밋을 만든다는 것을 잊음. 교정: 이식한 커밋의 원 브랜치 처리 방침을 함께 결정. (출처: git-cherry-pick, 확인: 2026-07-07)
4. 실수: stash해 두고 잊어버림. 왜 생기나: stash는 브랜치와 달리 눈에 띄지 않음. 교정: stash list를 주기 점검하고, 오래 갈 작업은 stash 대신 브랜치+커밋. (출처: git-stash, 확인: 2026-07-07)

## 공식 출처
- 재적용 모델, 진행 제어, 공유 재작성 경고 — [git-rebase](https://git-scm.com/docs/git-rebase) (확인: 2026-07-07)
- 커밋 단위 이식, clean 전제, 충돌 처리 — [git-cherry-pick](https://git-scm.com/docs/git-cherry-pick) (확인: 2026-07-07)
- 보관·복원 동작 — [git-stash](https://git-scm.com/docs/git-stash) (확인: 2026-07-07)

## Quote Bank
- > "git-rebase - Reapply commits on top of another base tip"
  - 출처: [git-rebase](https://git-scm.com/docs/git-rebase) (확인: 2026-07-07)
  - 맥락: rebase의 공식 한 줄 요약 — "재적용"이 핵심 동사
- > "Transplant a series of commits onto a different starting point."
  - 출처: [git-rebase](https://git-scm.com/docs/git-rebase) (확인: 2026-07-07)
  - 맥락: 이식(transplant) 은유 — 커밋 열이 새 기반으로 옮겨 심어짐
- > "Rebasing (or any other form of rewriting) a branch that others have based work on is a bad idea: anyone downstream of it is forced to manually fix their history."
  - 출처: [git-rebase](https://git-scm.com/docs/git-rebase) (확인: 2026-07-07)
  - 맥락: 공유 이력 재작성 금지의 원문 — 이 KB 전체의 안전 경계
- > "Given one or more existing commits, apply the change each one introduces, recording a new commit for each."
  - 출처: [git-cherry-pick](https://git-scm.com/docs/git-cherry-pick) (확인: 2026-07-07)
  - 맥락: cherry-pick의 공식 정의 — 커밋마다 새 커밋
- > "Use git stash when you want to record the current state of the working directory and the index, but want to go back to a clean working directory."
  - 출처: [git-stash](https://git-scm.com/docs/git-stash) (확인: 2026-07-07)
  - 맥락: stash의 사용 시점 — 기록하되 깨끗해지고 싶을 때
- > "The command saves your local modifications away and reverts the working directory to match the HEAD commit."
  - 출처: [git-stash](https://git-scm.com/docs/git-stash) (확인: 2026-07-07)
  - 맥락: stash의 두 동작 — 보관 + HEAD로 되돌림

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
