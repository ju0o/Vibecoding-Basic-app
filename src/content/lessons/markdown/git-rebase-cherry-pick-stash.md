## 한 줄 정의

git rebase·cherry-pick·stash는 커밋 그래프를 **편집**하거나 작업을 **임시 보관**하는 고급 도구입니다 — rebase는 커밋 열을 다른 기반 위에 재적용하고, cherry-pick은 특정 커밋의 변경만 골라 이식하며, stash는 커밋하기 애매한 진행 중 작업을 치워 깨끗한 상태를 만듭니다.

공식 요약은 각각: rebase는 "Reapply commits on top of another base tip", cherry-pick은 "Apply the changes introduced by some existing commits", stash는 "Stash the changes in a dirty working directory away". 앞선 복구 레퍼런스(restore/reset/revert)가 "잘못을 되돌리는" 도구였다면, 이 셋은 ==이력을 원하는 모양으로 다듬는== 도구입니다 — 그만큼 강력하고, 그만큼 "공유 전에만"이라는 경계가 중요합니다.

> [!KEY]
> 이 강의 전체를 지배하는 한 문장이 rebase 문서에 있습니다: **"다른 사람이 기반으로 삼은 브랜치의 재작성은 나쁜 생각이다."** rebase도 cherry-pick도 새 커밋을 만들며(해시가 바뀜), 공유된 이력에서 이를 수행하면 협업자 전원의 기준점이 무너집니다. 판단 기준은 복구 3형제와 동일합니다 — push 전까지만.

![rebase의 이식 모델: A-B-C가 새 기반 위에 A'-B'-C'로 다시 만들어짐](/lesson-diagrams/git-rebase-cherry-pick-stash/rebase-transplant.svg)

## 왜 존재하는가

branch·merge까지 배웠다면 협업의 기본은 갖춘 셈입니다. 그런데 실무에서 세 가지 불편이 남습니다.

첫째, **merge만 쓰면 이력이 얽힙니다.** 브랜치를 합칠 때마다 병합 커밋이 생기고, 여러 브랜치가 오가면 log가 다이아몬드로 뒤엉킵니다. "내 브랜치를 최신 main 위에 깔끔하게 올려놓고 싶다"는 요구의 답이 rebase입니다 — 문서의 표현으로, 일련의 커밋을 다른 시작점 위로 **이식(transplant)**합니다.

둘째, **브랜치 전체가 아니라 커밋 하나만 필요할 때가 있습니다.** main의 긴급 수정 하나를 릴리스 브랜치에도 넣어야 할 때, 브랜치 전체를 merge하는 것은 과잉입니다. cherry-pick은 지정한 커밋들의 변경만 가져와 각각 새 커밋으로 기록합니다.

셋째, **커밋하기엔 이르고 버리기엔 아까운 순간이 옵니다.** 작업 중인데 급히 다른 브랜치로 가야 할 때 — stash가 현재 워킹 디렉터리와 인덱스의 상태를 기록·보관하고, 워킹 디렉터리를 HEAD에 맞춰 깨끗하게 되돌립니다.

## 작동 원리

### rebase: 이식과 새 커밋

topic 브랜치가 E에서 갈라져 A-B-C를 쌓았고, 그사이 master가 F-G로 전진한 상황 — 문서의 다이어그램 그대로입니다:

```
      A---B---C topic                        A'--B'--C' topic
     /                    rebase master →   /
D---E---F---G master              D---E---F---G master
```

핵심은 프라임 기호(')입니다. ==A가 이동한 것이 아니라, 같은 변경 내용의 **새 커밋 A'**가 G 위에 만들어집니다==. 해시가 바뀌므로, 원래 A-B-C를 본 사람과는 이력이 어긋납니다 — 공유 금지 규칙의 기술적 근거가 바로 이것입니다.

이식 도중 충돌이 나면 rebase는 멈추고 세 갈래 출구를 줍니다: 해결 후 `--continue`, 이 커밋만 건너뛰는 `--skip`, 전부 무르고 시작 전으로 돌아가는 `--abort`. 인터랙티브 모드(`-i`)에서는 이식하면서 커밋을 재배열·결합할 수도 있습니다.

### cherry-pick: 커밋 단위 이식

cherry-pick은 "기존 커밋이 도입한 변경을 적용해, 각각에 대해 새 커밋을 기록"합니다. revert와 정확히 같은 메커니즘의 **정방향**입니다 — revert가 반대 패치를 새 커밋으로 기록한다면, cherry-pick은 그대로의 패치를 새 커밋으로 기록합니다. 전제도 같습니다: 워킹 트리가 깨끗해야 합니다.

적용이 어려운 경우의 동작도 문서에 정밀하게 정의되어 있습니다: HEAD는 마지막 성공 지점에 머물고, 문제 커밋은 CHERRY_PICK_HEAD로 표시되며, 충돌 경로는 병합과 동일한 충돌 마커(`<<<<<<<`)로 남습니다 — 해결 절차도 병합 충돌과 같습니다.

### stash: 보관 후 원상 복귀

stash의 동작은 두 단계입니다: ① 워킹 디렉터리와 인덱스의 현재 상태를 보관물로 기록하고, ② 워킹 디렉터리를 HEAD 커밋에 맞게 되돌립니다. 결과적으로 "방금까지의 작업이 안전하게 치워진 깨끗한 상태"가 됩니다. 보관물은 `stash list`로 나열하고, `stash show`로 들여다보고, `stash apply`로 복원합니다 — 문서가 명시하듯 **다른 커밋 위에도** 복원할 수 있어서, 치워둔 작업을 새 브랜치에서 이어가는 것도 가능합니다.

> [!EXAMPLE]
> AI에게 리팩터링을 맡기기 직전, 내가 만지던 미완성 수정이 워킹 트리에 있다면? `git stash`로 치워 깨끗한 기준선을 만들고 AI를 실행합니다. AI 작업이 끝나 커밋까지 마친 뒤 `git stash apply`로 내 작업을 그 위에 복원 — 두 작업이 diff에서 섞이지 않습니다.

## 스펙과 세부

명령어 인덱스: [git rebase](#git-rebase) · [git cherry-pick](#git-cherry-pick) · [git stash](#git-stash)

### `git rebase`

**문법**: `git rebase [옵션] <새 기반>` (현재 브랜치의 커밋들을 새 기반 위로)

| 형태 | 의미 |
|---|---|
| `git rebase main` | 현재 브랜치를 main 끝 위로 재적용 |
| `git rebase -i HEAD~5` | 최근 5개 커밋을 대화식으로 재배열·결합·수정 |
| `git rebase --continue` | 충돌 해결 후 계속 |
| `git rebase --skip` | 문제 커밋 건너뛰기 |
| `git rebase --abort` | 전부 취소, 시작 전 상태로 |

**사용 예시**:

```bash
git switch feature-search
git rebase main            # feature의 커밋들이 최신 main 위로
```

**주의**: 푸시한 브랜치에는 쓰지 않습니다. `--abort`가 항상 안전한 출구라는 것만 기억하면, 로컬에서는 겁낼 필요가 없습니다.

### `git cherry-pick`

**문법**: `git cherry-pick <커밋>...`

| 형태 | 의미 |
|---|---|
| `git cherry-pick <해시>` | 그 커밋의 변경을 현재 브랜치에 새 커밋으로 |
| `git cherry-pick <해시1> <해시2>` | 여러 커밋을 순서대로 |
| `git cherry-pick --continue / --abort` | 충돌 처리 후 계속 / 취소 |

**사용 예시**:

```bash
git switch release-1.2
git cherry-pick a3cf62b    # main의 핫픽스만 릴리스 브랜치로
```

**주의**: 워킹 트리가 깨끗해야 시작됩니다. 이식된 커밋은 **새 해시의 새 커밋**이므로, 나중에 원 브랜치를 merge하면 같은 변경이 두 번 적용되는 상황을 계획에 넣어야 합니다.

### `git stash`

**문법**: `git stash [하위 명령]`

| 형태 | 의미 |
|---|---|
| `git stash` | 현재 수정(워킹 트리+인덱스)을 보관하고 HEAD로 되돌림 |
| `git stash list` | 보관물 나열 |
| `git stash show` | 보관물 내용 확인 |
| `git stash apply` | 보관물 복원 (목록에는 유지) |

**사용 예시**:

```bash
git stash                  # 진행 중 작업 치우기
git switch hotfix-branch   # 깨끗한 상태로 전환
# ... 급한 일 처리 ...
git switch feature-search
git stash apply            # 치워둔 작업 복원
```

**주의**: stash는 브랜치와 달리 눈에 잘 띄지 않습니다. 오래 보관할 작업이라면 stash 대신 브랜치+커밋이 낫습니다.

### 상황별 빠른 참조

| 하고 싶은 것 | 처방 | 안전 경계 |
|---|---|---|
| 내 브랜치를 최신 main 위로 깔끔하게 | `git rebase main` | 공유 전 |
| AI의 wip 커밋 5개를 하나로 정리 | `git rebase -i HEAD~5` | 공유 전 |
| 다른 브랜치의 커밋 하나만 가져오기 | `git cherry-pick <해시>` | 대상 브랜치 기준 새 커밋 생성 인지 |
| 진행 중 작업을 잠깐 치우기 | `git stash` → 나중에 `apply` | 잊기 쉬움 — list 주기 점검 |
| rebase가 꼬였을 때 | `git rebase --abort` | 항상 안전 |

## 원문으로 읽기

> "Rebasing (or any other form of rewriting) a branch that others have based work on is a bad idea: anyone downstream of [...]"
>
> — 다른 사람이 작업의 기반으로 삼은 브랜치를 rebase(또는 어떤 형태로든 재작성)하는 것은 나쁜 생각이다: 그 하류의 모두가 자신의 이력을 수동으로 고치도록 강요당한다.
> [git-rebase — Git Documentation](https://git-scm.com/docs/git-rebase)

공식 문서가 "bad idea"라는 이례적으로 직설적인 표현을 쓴 문장입니다. rebase의 모든 옵션과 기법은 이 경고 안쪽에서만 유효합니다 — 도구 설명서가 스스로 "언제 쓰면 안 되는가"를 이렇게 강하게 못 박는 경우는 드뭅니다.

> "Transplant a series of commits onto a different starting point. [...]"
>
> — 일련의 커밋을 다른 시작점 위로 이식한다.
> [git-rebase — Git Documentation](https://git-scm.com/docs/git-rebase)

"이식"이라는 동사가 rebase의 정체를 정확히 담습니다. 나무를 옮겨 심으면 같은 나무처럼 보여도 뿌리가 새 땅에 다시 내리듯, 이식된 커밋은 같은 변경처럼 보여도 새 해시의 새 커밋입니다.

> "Given one or more existing commits, apply the change each one introduces, recording a new commit for each. [...]"
>
> — 하나 이상의 기존 커밋이 주어지면, 각각이 도입한 변경을 적용하고 각각에 대해 새 커밋을 기록한다.
> [git-cherry-pick — Git Documentation](https://git-scm.com/docs/git-cherry-pick)

"recording a new commit for each" — cherry-pick 이해의 전부가 이 구절에 있습니다. 커밋을 "가져오는" 것이 아니라 그 변경으로 "새로 기록하는" 것이며, 그래서 원본과 이식본은 같은 내용의 다른 커밋으로 공존하게 됩니다.

관련 원문(링크): [git-stash — Git Documentation](https://git-scm.com/docs/git-stash)

stash의 사용 시점을 문서가 "~하고 싶을 때"로 직접 규정합니다. 두 욕구(기록하고 싶다 + 깨끗해지고 싶다)가 동시에 있을 때가 stash의 자리이고, 둘 중 하나만 있다면 commit(기록) 또는 restore(폐기)가 맞는 도구입니다.

## 실전에서

### AI의 wip 커밋 열 정리

AI가 무정지로 작업하면 "wip: 중간 저장" 같은 커밋이 줄줄이 남습니다. 공유(push) 전이라면 `git rebase -i HEAD~n`으로 열어 관련 커밋들을 의미 단위로 결합(squash)하고 메시지를 다시 씁니다 — 리뷰어(미래의 나)가 읽을 이력은 "작업의 시행착오"가 아니라 "변경의 논리 단위"여야 하기 때문입니다. 이 프로젝트가 물결마다 "P-04: ...", "P-05: ..." 단위로 커밋을 남기는 것도 같은 원칙의 사전 적용입니다.

### 좋은 것만 건지기

AI 실험 브랜치에서 결과가 반만 좋을 때 — 브랜치 전체를 merge하는 대신, log로 좋은 커밋의 해시를 찾아 `git cherry-pick <해시>`로 본 브랜치에 이식하고 실험 브랜치는 버립니다. "전부 수용 아니면 전부 폐기"의 양자택일에서 벗어나는 세 번째 길입니다.

> [!TIP]
> cherry-pick 전에 `git show <해시>`로 그 커밋의 diff를 먼저 확인하세요 — 이식할 가치를 커밋 메시지가 아니라 실제 변경 내용으로 판단하는 습관이 이식 후 후회를 막습니다.

### stash로 기준선 만들기

diff 기반 검토(앞 강의)의 전제는 "비교 기준이 깨끗할 것"입니다. 내 미완성 수정과 AI의 변경이 워킹 트리에 섞이면 `git diff`가 두 작업을 구분해 주지 못합니다. AI 실행 전 `git stash` 한 번이 검토 가능성을 지키는 가장 싼 보험입니다.

## 한계와 트레이드오프

**rebase의 깔끔함은 진실의 대가입니다.** merge 이력은 "실제로 언제 갈라졌고 언제 합쳐졌는가"를 보존하지만, rebase된 이력은 "처음부터 최신 기반에서 작업한 것처럼" 다시 쓰인 서사입니다. 디버깅 시 "이 커밋이 실제로 어떤 코드 위에서 작성됐는가"가 중요해지는 순간, 재작성된 이력은 거짓말을 합니다.

**cherry-pick은 중복의 씨앗을 심습니다.** 이식본과 원본이 서로 다른 커밋으로 공존하므로, 이후 두 브랜치가 다시 만나면 같은 변경의 이중 적용·충돌 가능성이 생깁니다. 이식했다면 원 브랜치의 운명(폐기·merge)까지 함께 결정하는 것이 정석입니다.

**stash는 이력 밖의 존재입니다.** 브랜치도 커밋도 아닌 별도 보관소라 log에 보이지 않고, 그래서 잊힙니다. "일주일 뒤의 나"에게 전할 작업이라면 stash가 아니라 브랜치에 커밋하세요 — stash는 시간 단위, 브랜치는 날짜 단위의 도구입니다.

**세 도구 모두 merge·revert의 대체재가 아닙니다.** 공유된 이력의 통합은 여전히 merge, 공유된 잘못의 취소는 여전히 revert입니다. 이 강의의 도구들은 그 경계 안쪽 — 아직 나만의 것인 이력 — 을 다듬는 데 쓰입니다.

> [!WARNING]
> rebase 후 push가 거부되어 `--force`를 썼다는 이야기의 대부분은 사고 보고서입니다. push 거부는 Git이 "공유 이력과 어긋났다"고 알려주는 마지막 안전장치이며, 강제 푸시는 그 안전장치를 손으로 뜯는 행위입니다. 거부를 만나면 force가 아니라 "내가 공유된 것을 재작성했나"를 먼저 물으세요.

### 설명 연습: 개인 작업대와 공유 기록을 나누기

rebase, cherry-pick, stash를 설명하는 핵심은 "아직 나만 쓰는 이력인가, 이미 공유된 이력인가"입니다. rebase는 커밋을 다른 base 위에 다시 얹어 깔끔한 이야기로 바꾸는 도구이고, cherry-pick은 필요한 커밋 하나만 골라 다른 줄기에 적용하는 도구입니다. stash는 아직 커밋하기 애매한 작업을 잠시 치워 두는 서랍입니다. 셋 모두 강력하지만, 공유된 이력에 함부로 쓰면 협업자의 기준점을 흔듭니다.

초보자에게는 "이 도구들은 정리 도구이지 복구 도구가 아니다"라고 말해 주세요. rebase는 보기 좋은 이력을 만들 수 있지만 충돌을 다시 풀어야 할 수 있고, cherry-pick은 같은 변경이 여러 줄기에 생기는 중복을 만들 수 있으며, stash는 오래 쌓아 두면 무엇을 넣었는지 잊기 쉽습니다. AI에게 이 명령을 맡길 때는 대상 커밋, 현재 브랜치, 공유 여부, 되돌릴 계획을 함께 적어야 합니다.

### 스스로 점검할 질문

rebase하기 전에는 이 브랜치가 이미 공유되었는지 확인하세요. 공유 전이면 이력을 정리해 리뷰하기 쉽게 만들 수 있지만, 공유 후라면 다른 사람의 기준점을 바꾸는 일이 됩니다. cherry-pick하기 전에는 왜 전체 브랜치가 아니라 특정 커밋 하나만 필요한지 설명할 수 있어야 합니다. stash하기 전에는 이 임시 변경을 언제 다시 꺼낼지 이름이나 메시지로 남기는 것이 좋습니다.

AI와 함께 쓸 때는 "깨끗하게 정리해 줘" 같은 요청보다 "아직 push하지 않은 내 브랜치에서 fixup 커밋을 앞 커밋에 합치고, 충돌이 나면 멈춰서 diff를 보여 줘"처럼 조건을 좁히세요. 이력 편집 도구는 편리하지만, 범위를 모르면 작업 기록 전체를 흐릴 수 있습니다.

## 더 읽기

- [git-rebase — Git Documentation](https://git-scm.com/docs/git-rebase) — 이식 모델, 인터랙티브 모드, 진행 제어, 재작성 경고
- [git-cherry-pick — Git Documentation](https://git-scm.com/docs/git-cherry-pick) — 커밋 단위 적용, 충돌 시 동작
- [git-stash — Git Documentation](https://git-scm.com/docs/git-stash) — 보관·나열·복원

이전 순서: [git restore/reset/revert 복구 레퍼런스](/lessons/git-restore-reset-revert) — 공유 전/후 판단 기준의 원류. 다음 순서: GitHub PR·리뷰 흐름(예정) — 여기서 다듬은 이력이 협업의 무대에 오르는 곳.
