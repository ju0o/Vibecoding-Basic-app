## 한 줄 정의

git restore·reset·revert는 모두 "되돌리기"지만 **되돌리는 대상이 서로 다른** 세 개의 명령입니다 — restore는 파일 내용을(워킹 트리·인덱스), reset은 HEAD와 인덱스의 위치를, revert는 이미 기록된 커밋의 효과를 **새 커밋으로** 뒤집습니다.

공식 요약은 각각: restore는 "Restore working tree files", reset은 "Set HEAD or the index to a known state", revert는 "Revert some existing commits". 셋의 혼동이 얼마나 흔했으면, ==공식 문서가 세 명령의 용도 구분을 별도의 Note로 직접 정리==해 두었을 정도입니다. 이 강의는 그 구분을 하나의 판단 기준으로 압축합니다.

> [!KEY]
> 선택 기준은 한 줄입니다: **커밋 전 실수는 restore, 커밋했지만 공유 전이면 reset, 이미 공유된 이력이면 revert.** 이 문장만 기억하면 세 명령의 옵션은 각자의 자리에서 자연스럽게 따라옵니다.

![되돌리기 3형제 선택 기준](/lesson-diagrams/git-restore-reset-revert/undo-decision-tree.svg)

## 왜 존재하는가

되돌리기가 하나의 명령이 아닌 이유는, "잘못"이 사는 곳이 세 군데이기 때문입니다.

첫째, **워킹 트리의 잘못** — 파일을 잘못 고쳤는데 아직 커밋하지 않았습니다. 기록은 멀쩡하니 파일만 되살리면 됩니다(restore). 둘째, **로컬 이력의 잘못** — 커밋을 잘못 만들었지만 아직 아무와도 공유하지 않았습니다. 브랜치 포인터를 옮겨 이력 자체를 다시 쓸 수 있습니다(reset). 셋째, **공유된 이력의 잘못** — 이미 푸시되어 다른 사람(또는 배포)이 그 커밋 위에 서 있습니다. 이력을 지우면 모두의 기준점이 무너지므로, 취소조차 새 기록으로 남겨야 합니다(revert).

세 상황의 공통 전제가 있습니다: **무엇이 어디까지 잘못됐는지 이미 알고 있다**는 것. 그래서 이 강의는 조회 3형제(log/diff/show) 다음에 옵니다 — 진단 없이 복구 명령을 쓰는 것이 가장 위험한 조합입니다.

## 작동 원리

### restore: 내용의 복원

restore는 지정한 경로의 내용을 **복원 소스**(기본은 인덱스 또는 HEAD)에서 가져와 되살립니다. 기본 대상은 워킹 트리이고, `--staged`를 붙이면 인덱스가 대상이 됩니다 — 즉 "스테이징 취소"는 restore의 정식 용법입니다. 한 가지 주의할 동작: 추적 중인 파일이 복원 소스에 없으면, 소스와 일치시키기 위해 그 파일은 **제거**됩니다. 복원은 "과거로 덮어쓰기"이지 "안전한 병합"이 아닙니다.

### reset: 포인터와 인덱스의 이동

reset의 세 모드는 "어디까지 옮기는가"의 3단계입니다:

- `--soft` — HEAD만 이동. 워킹 트리와 인덱스는 그대로. 커밋들을 하나로 합칠 때의 도구입니다.
- `--mixed`(기본) — HEAD 이동 + 인덱스를 새 HEAD에 맞춤. 워킹 디렉터리는 그대로, 스테이징만 풀립니다.
- `--hard` — HEAD·인덱스·워킹 트리 전부를 지정 커밋으로. ==모든 파일이 덮어써지고, 미추적 파일까지 덮어쓸 수 있는== 유일한 파괴 모드입니다.

1강의 세 영역 모델로 읽으면: soft는 HEAD만, mixed는 HEAD+인덱스, hard는 세 영역 전부를 과거 시점으로 되감는 것입니다.

### revert: 반대 방향의 전진

revert는 시간을 되감지 않습니다. 지정한 커밋이 도입한 변경의 **반대 패치**를 만들어 새 커밋으로 기록합니다 — 이력은 오히려 한 칸 늘어납니다. 그래서 공유된 이력에서 안전합니다: 다른 사람의 기준점(기존 커밋들)은 하나도 움직이지 않고, "취소했다"는 사실 자체가 감사 가능한 기록으로 남습니다. 실행 전제가 하나 있습니다: 워킹 트리가 HEAD 대비 깨끗해야(clean) 합니다.

> [!EXAMPLE]
> 커밋 C가 버그였다고 합시다. reset으로 지우면 이력에서 C가 사라지지만(공유 전에만 가능), revert하면 "C의 반대"인 새 커밋 C'가 끝에 추가됩니다. 결과 코드는 같아도 이력의 서사가 다릅니다 — C'는 "우리가 C를 취소했다"는 역사를 보존합니다.

## 스펙과 세부

명령어 인덱스: [git restore](#git-restore) · [git reset](#git-reset) · [git revert](#git-revert)

### `git restore`

**문법**: `git restore [옵션] <경로>...`

| 형태 | 의미 |
|---|---|
| `git restore <경로>` | 워킹 트리의 해당 파일을 복원 (수정 폐기) |
| `git restore --staged <경로>` | 인덱스에서 내림 (스테이징 취소, 내용은 유지) |
| `git restore --staged --worktree <경로>` | 인덱스와 워킹 트리 둘 다 복원 |
| `git restore --source <커밋> <경로>` | 특정 커밋 시점의 내용으로 복원 |

**사용 예시**:

```bash
git restore src/app.ts             # 이 파일의 미커밋 수정을 버림
git restore --staged src/app.ts    # add 취소 — 수정 내용은 그대로
```

**주의**: 워킹 트리 복원은 미커밋 수정을 **즉시 폐기**합니다. 되돌릴 방법이 없으므로, 실행 전 diff로 버려질 내용을 확인하세요.

### `git reset`

**문법**: `git reset [--soft | --mixed | --hard] [커밋]`

| 모드 | HEAD | 인덱스 | 워킹 트리 | 대표 용도 |
|---|---|---|---|---|
| `--soft` | 이동 | 유지 | 유지 | 커밋 합치기 |
| `--mixed` (기본) | 이동 | 갱신 | 유지 | 스테이징 전체 해제 |
| `--hard` | 이동 | 갱신 | **덮어씀** | 로컬 작업 전체 폐기 |

**사용 예시**:

```bash
git reset --soft HEAD~5    # 최근 5개 커밋을 스테이징 상태로 풀어 재커밋 준비
git reset                  # (mixed) 전체 스테이징 해제
git reset --hard HEAD      # 미커밋 변경 전부 폐기 — 실행 전 반드시 확인
```

**주의**: `--hard`는 미추적 파일까지 덮어쓸 수 있습니다. 실행 전 `git status`로 잃을 것을 확인하는 절차를 생략하지 마세요.

### `git revert`

**문법**: `git revert <커밋>...`

**전제**: 워킹 트리가 깨끗해야 합니다 (HEAD 대비 무변경).

**사용 예시**:

```bash
git revert a3cf62b         # 그 커밋의 반대 변경을 새 커밋으로 기록
git revert HEAD            # 방금 커밋의 취소
```

**주의**: revert 대상 커밋과 이후 커밋이 같은 영역을 건드렸다면 병합과 동일한 충돌이 날 수 있습니다 — 해결 방식도 동일합니다(수정 → add → 계속).

### 상황별 빠른 참조

| 증상 | 처방 | 파괴 반경 |
|---|---|---|
| 파일 하나를 잘못 고침 (커밋 전) | `git restore <경로>` | 그 파일의 미커밋 수정 |
| 실수로 add함 | `git restore --staged <경로>` | 없음 (스테이징만 해제) |
| 과거 시점의 파일 하나만 필요 | `git restore --source <커밋> <경로>` | 그 파일의 현재 내용 |
| 커밋 메시지·내용을 고치고 싶음 (공유 전) | `git commit --amend` | 브랜치 끝 교체 |
| 자잘한 커밋 여러 개를 하나로 (공유 전) | `git reset --soft HEAD~n` 후 재커밋 | 없음 (기록만 재구성) |
| 전부 마지막 커밋 상태로 폐기 | `git reset --hard HEAD` | **미커밋 변경 전부 + 미추적 파일 위험** |
| 이미 공유된 커밋이 결함 | `git revert <해시>` | 없음 (새 커밋 추가) |

표의 세 번째 열이 이 강의의 요약입니다 — 명령을 고르기 전에 항상 **"이 처방의 파괴 반경 안에 내가 잃으면 안 되는 것이 있는가"**를 먼저 묻습니다. 반경이 "없음"인 처방부터 시도하는 것이 복구의 정석입니다.

## 원문으로 읽기

> "Note: git revert is used to record some new commits to reverse the effect of some earlier commits (often only a faulty one)."
>
> — 참고: git revert는 이전 커밋들(대개 결함 있는 커밋 하나)의 효과를 뒤집는 새 커밋들을 기록하는 데 쓰인다.
> [git-revert — Git Documentation](https://git-scm.com/docs/git-revert)

공식 문서가 Note까지 달아 셋의 용도를 직접 갈라주는 문장입니다. "record some new commits" — revert의 본질이 삭제가 아니라 기록임을 문서 스스로 강조합니다. 이 Note는 이어서 미커밋 변경 폐기는 reset --hard로, 특정 파일의 과거 추출은 restore --source로 안내합니다.

> "Overwrite all files and directories with the version from <commit>, and may overwrite untracked files."
>
> — 모든 파일과 디렉터리를 <커밋>의 버전으로 덮어쓰며, 미추적 파일도 덮어쓸 수 있다.
> [git-reset — Git Documentation](https://git-scm.com/docs/git-reset)

--hard의 파괴 반경을 문서가 명시한 문장입니다. "may overwrite untracked files" — 아직 커밋한 적 없는 새 파일조차 안전하지 않다는 뜻입니다. hard를 쓰기 전 확인 절차가 선택이 아닌 이유가 이 한 구절에 있습니다.

> "Leave your working tree files and the index unchanged. For example, if you have no staged changes, you can use git reset --soft HEAD~5; git commit to combine the last 5 commits into 1 commit."
>
> — 워킹 트리 파일과 인덱스를 그대로 둔다. 예를 들어 스테이징된 변경이 없다면, git reset --soft HEAD~5 후 git commit으로 최근 5개 커밋을 1개로 합칠 수 있다.
> [git-reset — Git Documentation](https://git-scm.com/docs/git-reset)

--soft의 정의와 함께 문서가 직접 제시하는 실전 레시피입니다. AI가 자잘한 커밋을 여럿 남겼을 때 이 레시피로 하나의 의미 있는 커밋으로 정리할 수 있습니다 — 단, 공유 전에만.

> "The command can also be used to restore the content in the index with --staged, or restore both the working tree and the index with --staged --worktree."
>
> — 이 명령은 --staged로 인덱스의 내용을 복원하거나, --staged --worktree로 워킹 트리와 인덱스 둘 다 복원하는 데에도 쓸 수 있다.
> [git-restore — Git Documentation](https://git-scm.com/docs/git-restore)

"add 취소를 어떻게 하지?"의 공식 답변입니다. 스테이징 취소가 reset의 부수 용법이 아니라 restore의 명시된 기능이라는 것 — 현행 명령 체계가 "전환은 switch, 복원은 restore"로 역할을 분리한 결과입니다.

## 실전에서

### AI 협업의 복구 시나리오 3종

```bash
# 시나리오 1 — AI가 파일을 망쳤고, 아직 커밋 전
git diff src/search.ts          # 버려질 내용 확인
git restore src/search.ts       # 마지막 기록 상태로 복원

# 시나리오 2 — AI의 커밋 3개가 전부 잘못됐고, 공유 전
git log --oneline -5            # 되돌아갈 지점 확인
git reset --hard HEAD~3         # 3개 커밋 이전으로 (파괴적 — 확인 후)

# 시나리오 3 — 릴리스된 커밋에서 결함 발견
git revert <결함 커밋 해시>       # 이력 보존형 취소
```

이 프로젝트의 운영 규칙에도 이 구분이 박혀 있습니다 — 빌드 루프(Loop B)가 3회 실패하면 "통합 revert"로 규정한 것은, 그 시점의 통합 커밋이 이미 이력에 기록·공유된 상태이기 때문입니다.

### 잊히기 쉬운 네 번째 도구: restore --source

"전체를 되돌릴 필요는 없고, 그 파일의 지난주 버전만 필요하다" — 이 흔한 요구의 답이 `git restore --source <커밋> <경로>`입니다. revert 문서가 직접 안내하는 대안이기도 합니다: 특정 파일을 다른 커밋 시점의 모습으로 꺼내는 것이라면 이력을 건드리는 reset도, 반대 커밋을 만드는 revert도 과잉 처방입니다. log로 원하는 시점의 해시를 찾고, restore --source로 그 파일만 가져온 뒤, 검토하고 커밋하면 끝 — 이력은 앞으로만 자랍니다.

### 진단 먼저, 복구는 그다음

복구 명령 실행 전 체크리스트는 짧습니다: ① `git status` — 지금 세 영역의 상태는? ② `git log --oneline` — 어느 지점으로 돌아가려는 것인가? ③ (hard/restore 전) `git diff` — 무엇이 버려지는가? 이 세 번의 조회가 복구를 "도박"에서 "수술"로 바꿉니다.

> [!TIP]
> "reset --hard 해줘"를 AI에게 시키기 전에, 미추적 파일이 있는지 먼저 물어보세요. hard는 미추적 파일까지 덮어쓸 수 있다는 공식 경고가 있는, 이 레퍼런스 전체에서 가장 파괴적인 한 줄입니다.

## 한계와 트레이드오프

**restore의 단순함은 비가역성과 함께 옵니다.** 워킹 트리 복원으로 버린 미커밋 수정은 Git 어디에도 없습니다 — 커밋된 적이 없으니까요. "일단 커밋하고 나서 정리"가 안전한 이유입니다.

**reset의 강력함은 공유 경계에서 끝납니다.** 로컬에서는 이력을 자유롭게 다시 쓰는 도구지만, 푸시된 커밋에 쓰면 협업자들의 이력과 어긋나 강제 푸시라는 더 큰 문제를 부릅니다. 경계는 명확합니다: **push 전까지만.**

**revert는 안전하지만 이력을 어지럽힙니다.** 취소 커밋이 쌓이면 "했다가 취소했다가"의 흔적이 log에 그대로 남습니다. 그것이 바로 revert의 목적(감사 가능성)이지만, 정리된 이력을 원한다면 애초에 브랜치에서 검증 후 합치는 편이 낫습니다 — 복구 명령은 예방의 대체재가 아닙니다.

**세 명령 모두 "무엇이 잘못인지"는 판단해 주지 않습니다.** 진단은 조회 3형제와 사람의 몫이고, 이 명령들은 결정을 집행할 뿐입니다.

> [!WARNING]
> 셋 중 무엇을 쓸지 모호할 때 가장 위험한 선택이 reset --hard입니다. 모호함은 대개 "상황 파악이 안 됐다"는 신호이며, 그 상태에서 유일하게 되돌릴 수 없는 모드를 고르는 것은 최악의 조합입니다. 모호하면 먼저 status와 log를 여세요.

### 설명 연습: 복구 명령을 손상 범위로 고르기

restore, reset, revert를 설명할 때는 "무엇을 되돌릴 것인가"부터 묻습니다. 아직 커밋하지 않은 파일 내용을 되돌릴 것인지, stage한 것을 내릴 것인지, 브랜치 포인터를 옮길 것인지, 이미 공유된 커밋의 효과를 새 커밋으로 취소할 것인지가 모두 다릅니다. restore는 파일과 index를 다루고, reset은 커밋 포인터와 index/working tree를 다루며, revert는 기존 이력을 지우지 않고 반대 커밋을 추가합니다.

이 구분은 AI와 작업할 때 특히 중요합니다. "되돌려줘"라는 말만 주면 AI가 가장 위험한 명령을 고를 수도 있습니다. 대신 "아직 커밋하지 않은 파일만 원래대로", "stage만 해제", "공유된 커밋은 남기고 효과만 취소"처럼 손상 범위와 보존해야 할 기록을 명시해야 합니다. 복구 명령은 진단 이후에 쓰는 집행 도구입니다. 먼저 status, diff, log로 상황을 읽고 나서 가장 좁은 명령을 고르는 것이 안전합니다.

### 스스로 점검할 질문

복구를 시작하기 전에는 세 가지를 확인하세요. 지우려는 것이 파일 내용인가, stage 상태인가, 커밋 이력인가. 그 변경은 나만 가진 것인가, 이미 공유된 것인가. 되돌린 뒤 다시 참고해야 할 가능성이 있는가. 이 질문에 따라 restore, reset, revert의 선택이 달라집니다.

가장 안전한 원칙은 좁게 되돌리는 것입니다. 파일 하나의 실수라면 저장소 전체를 reset하지 않습니다. stage만 잘못했다면 working tree까지 건드리지 않습니다. 이미 공유된 문제라면 이력을 지우기보다 revert로 반대 커밋을 남깁니다. AI에게도 같은 원칙을 적용해 "가장 좁은 범위로 복구하고, 실행 전 어떤 파일과 이력이 영향을 받는지 보고하라"고 요청하는 편이 안전합니다.

마지막으로 복구 전에는 현재 상태를 기록해 두는 편이 좋습니다. status와 diff를 읽고 필요하면 임시 커밋이나 patch로 남기면, 복구 명령을 잘못 골라도 돌아올 실마리가 생깁니다. 복구의 첫 단계는 명령 실행이 아니라 손실 범위를 줄이는 준비입니다.

## 더 읽기

- [git-restore — Git Documentation](https://git-scm.com/docs/git-restore) — 복원 소스, --staged, --source
- [git-reset — Git Documentation](https://git-scm.com/docs/git-reset) — 3모드 상세와 예시
- [git-revert — Git Documentation](https://git-scm.com/docs/git-revert) — 반대 커밋, clean 전제, 세 명령의 용도 구분 Note

이전 순서: [git log/diff/show 레퍼런스](/lessons/git-log-diff-show) — 복구의 전제인 진단. 다음 순서: git rebase/cherry-pick/stash 레퍼런스(예정) — 이력을 편집하고 작업을 임시 보관하는 고급 도구.
