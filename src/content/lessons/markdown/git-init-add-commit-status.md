## 한 줄 정의

git init·add·commit·status는 저장소를 만들고(init), 기록할 변경을 준비하고(add), 준비된 것을 영구 기록으로 고정하고(commit), 지금 무엇이 어떤 상태인지 확인하는(status) — Git의 **기록 사이클**을 이루는 네 개의 명령입니다.

이 네 명령의 공식 요약은 각각 이렇습니다: init은 "Create an empty Git repository or reinitialize an existing one", add는 "Add file contents to the index", commit은 "Record changes to the repository", status는 "Show the working tree status". 이 강의는 네 명령을 따로 외우게 하는 대신, ==하나의 사이클로 연결해서 언제 어떤 명령이 필요한지 판단할 수 있게== 만드는 것이 목표입니다.

> [!KEY]
> 이 4개 명령을 이해하는 열쇠는 명령 자체가 아니라 그 사이에 있는 **세 영역** — 워킹 트리, 인덱스, HEAD — 입니다. 모든 Git 명령은 이 세 영역 중 무엇을 읽고 무엇을 바꾸는가로 설명됩니다.

![Git 세 영역과 기록 사이클](/lesson-diagrams/git-init-add-commit-status/git-three-areas-cycle.svg)

## 왜 존재하는가

버전 관리가 없던 시절의 고통은 두 가지였습니다. 첫째, "어제까지는 됐는데"로 시작하는 복구 불능 — 이전 상태로 돌아갈 방법이 `프로젝트_최종_진짜최종.zip` 같은 수동 복사뿐이었습니다. 둘째, 무엇이 바뀌었는지 아무도 모르는 상태 — 파일 수십 개 중 오늘 손댄 것이 무엇인지 기억에 의존해야 했습니다.

Git의 기록 사이클은 이 두 고통을 정면으로 해결합니다. commit이 시점별 스냅숏을 만들어 복구를 가능하게 하고, status가 "무엇이 바뀌었는가"를 세 영역의 차이로 정확히 보여줍니다.

그런데 왜 add라는 중간 단계가 필요할까요? 작업 전체를 통째로 기록하는 대신, **기록할 것을 골라 담는 단계**를 분리했기 때문입니다. 공식 문서의 규칙이 이것을 명확히 합니다 — 인자 없이 commit을 실행하면 스테이징된 변경만 기록됩니다. 이 분리 덕분에 "오늘 작업 중 버그 수정만 먼저 커밋하고, 실험 코드는 나중에" 같은 부분 기록이 가능해집니다.

## 작동 원리

### 세 영역 모델

Git이 관리하는 공간은 세 개입니다.

1. **워킹 트리(working tree)** — 여러분이 편집기로 실제 수정하는 파일들. 눈에 보이는 프로젝트 폴더 그 자체입니다.
2. **인덱스(index)** — 다음 커밋에 들어갈 내용을 준비해 두는 공간. 공식 문서가 "staging area(스테이징 영역)"라는 별칭을 병기하는 바로 그것입니다.
3. **HEAD** — 마지막으로 기록된 커밋. 현재 브랜치의 끝을 가리킵니다.

네 명령은 이 세 영역 사이의 이동과 비교입니다. add는 워킹 트리 → 인덱스로 내용을 올리고, commit은 인덱스 → HEAD로 기록을 고정하며, status는 세 영역의 차이를 보여주고, init은 이 모든 것이 시작될 `.git` 저장 공간을 만듭니다.

### 저장소의 물리적 실체

init이 만드는 것은 마법이 아니라 디렉터리 하나입니다 — `.git` 아래에 objects(모든 내용물의 저장소), refs/heads(브랜치 포인터들), refs/tags(태그 포인터들)가 생깁니다. 커밋이 하나도 없는 초기 브랜치도 함께 만들어집니다. Git의 모든 이력은 결국 이 폴더 안의 파일들이며, ==저장소를 지우는 것 = `.git` 폴더를 지우는 것==과 같습니다.

### 커밋 그래프의 성장

commit이 실행될 때마다 일어나는 일은 정확히 세 가지입니다: (1) 인덱스의 현재 내용과 로그 메시지로 새 커밋 객체가 만들어지고, (2) 그 커밋은 HEAD의 직계 자식이 되며, (3) 현재 브랜치가 새 커밋을 가리키도록 이동합니다. 커밋들이 부모-자식으로 연결되며 이력의 그래프가 자라나는 것 — 이것이 뒤에서 배울 브랜치(git-branch-switch-merge)와 이력 조회(git-log-diff-show)의 토대입니다.

> [!EXAMPLE]
> 파일 3개를 수정한 뒤 그중 1개만 add하고 commit하면? 커밋에는 add한 1개의 변경만 들어갑니다. 나머지 2개는 워킹 트리에 그대로 남아 status에 "커밋할 수 있는 것"으로 표시됩니다. 이것이 세 영역 분리의 실전 의미입니다.

## 스펙과 세부

명령어 인덱스: [git init](#git-init) · [git add](#git-add) · [git commit](#git-commit) · [git status](#git-status)

### `git init`

**문법**: `git init [디렉터리]`

| 옵션 | 의미 |
|---|---|
| `--initial-branch <이름>` | 초기 브랜치 이름 지정 |
| `--separate-git-dir <경로>` | `.git`을 다른 위치에 두고 링크 |

**사용 예시**:

```bash
mkdir my-project && cd my-project
git init
# Initialized empty Git repository in .../my-project/.git/
```

**주의**: 이미 저장소인 곳에서 다시 실행해도 안전합니다 — 기존 내용을 덮어쓰지 않으며, 재실행의 주 용도는 새 템플릿 반영입니다. 반대로 조심할 것은 **위치**입니다. 홈 폴더 같은 상위 디렉터리에서 실수로 init하면 그 아래 전체가 저장소가 됩니다. init 전에 현재 위치를 확인하세요.

### `git add`

**문법**: `git add <경로>...`

| 옵션 | 의미 |
|---|---|
| `-p`, `--patch` | 인덱스↔워킹 트리 사이의 변경 덩어리(hunk)를 대화식으로 골라 스테이징 |
| `-A`, `--all` | 추가·수정·삭제를 모두 인덱스에 반영해 워킹 트리와 일치시킴 |
| `.` | 현재 디렉터리 이하의 변경을 스테이징 |

**사용 예시**:

```bash
git add src/app.ts        # 파일 하나만
git add -p                # 변경 덩어리를 하나씩 보며 y/n 선택
git add -A                # 삭제 포함 전부 반영
```

**주의**: add는 실행한 **그 시점의 파일 내용**을 인덱스에 올립니다. add 후 파일을 또 수정하면, 새 수정분은 다시 add해야 커밋에 포함됩니다.

### `git commit`

**문법**: `git commit -m "<메시지>"`

| 옵션 | 의미 |
|---|---|
| `-m <메시지>` | 로그 메시지를 인라인으로 지정 |
| `--amend` | 현재 브랜치 끝을 새 커밋으로 **교체** |

**사용 예시**:

```bash
git commit -m "fix: 검색 결과 빈 상태 처리"
git commit --amend -m "fix: 검색 결과 빈 상태 처리 (오타 수정)"
```

**주의**: `--amend`는 수정이 아니라 교체입니다 — 브랜치 끝이 다른 커밋으로 바뀝니다. 이미 푸시해 공유한 커밋에 쓰면 다른 사람의 이력과 어긋나므로, ==amend는 공유 전 커밋에만== 사용하세요.

### `git status`

**문법**: `git status`

**출력 읽는 법** — 세 묶음으로 나옵니다:

| 묶음 | 의미 | 다음 행동 |
|---|---|---|
| Changes to be committed | HEAD↔인덱스 차이 | 이대로 commit하면 기록됨 |
| Changes not staged | 워킹 트리↔인덱스 차이 | add하면 커밋 대상이 됨 |
| Untracked files | Git이 아직 모르는 파일 | add하면 추적 시작 |

**주의**: status는 아무것도 바꾸지 않는 읽기 전용 명령입니다. 언제든, 몇 번이든 실행해도 안전합니다.

### 상황별 빠른 참조

| 하고 싶은 것 | 명령 |
|---|---|
| 새 프로젝트를 Git으로 관리 시작 | `git init` |
| 파일 하나만 다음 커밋에 담기 | `git add <경로>` |
| 변경 덩어리를 골라 담기 | `git add -p` |
| 삭제한 파일까지 전부 반영 | `git add -A` |
| 담아둔 것을 기록으로 고정 | `git commit -m "..."` |
| 방금 커밋의 메시지·내용 고치기 (공유 전) | `git commit --amend` |
| 지금 세 영역의 상태 확인 | `git status` |

`git add -A`의 정확한 의미도 짚어둘 가치가 있습니다 — 워킹 트리에 파일이 있는 경로뿐 아니라 **인덱스에만 항목이 남아 있는 경로까지** 함께 갱신해서, 추가·수정·삭제를 모두 인덱스에 반영하고 워킹 트리와 일치시킵니다. "파일을 지웠는데 status에 계속 나와요"는 대부분 삭제가 아직 인덱스에 반영되지 않은 상태이며, -A가 그 간극을 닫아 줍니다.

## 원문으로 읽기

> "When you run git commit without any other arguments, it will only commit staged changes. [...]"
>
> — 다른 인자 없이 git commit을 실행하면, 스테이징된 변경만 커밋한다.
> [git-add — Git Documentation](https://git-scm.com/docs/git-add)

이 한 문장이 add-commit 2단계 모델의 전부입니다. "커밋했는데 내 수정이 안 들어갔어요"라는 하소연의 90%가 이 규칙을 모르는 데서 나옵니다 — 커밋은 워킹 트리가 아니라 인덱스를 기록합니다.

> "This command creates an empty Git repository - basically a .git directory with subdirectories for objects, refs/heads, refs/tags, and template files. [...]"
>
> — 이 명령은 빈 Git 저장소를 만든다 — 본질적으로 objects, refs/heads, refs/tags 하위 디렉터리와 템플릿 파일을 가진 .git 디렉터리다.
> [git-init — Git Documentation](https://git-scm.com/docs/git-init)

공식 문서가 저장소의 실체를 "basically a .git directory"라고 잘라 말합니다. 저장소는 서버도, 클라우드도 아니고 여러분 프로젝트 안의 숨김 폴더입니다. 이 사실을 알면 "저장소가 깨졌다"는 상황도 결국 파일 시스템 문제로 접근할 수 있습니다.

> "Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree [...]"
>
> — 인덱스와 현재 HEAD 커밋이 다른 경로들, 워킹 트리와 인덱스가 다른 경로들, 그리고 Git이 추적하지 않는 워킹 트리의 경로들을 표시한다.
> [git-status — Git Documentation](https://git-scm.com/docs/git-status)

status의 정의 자체가 세 영역 모델의 증명입니다. 출력의 세 묶음은 임의 분류가 아니라 "어느 두 영역을 비교했는가"이며, 이 구조를 알고 읽으면 status는 항상 "다음에 할 일"을 알려주는 내비게이션이 됩니다.

관련 원문(링크): [git-commit — Git Documentation](https://git-scm.com/docs/git-commit)

커밋이 "저장"이 아니라 "그래프에 노드 추가"라는 것을 보여주는 문장입니다. 부모-자식 연결이 있기에 이력을 거슬러 올라갈 수 있고(log), 갈래를 만들 수 있으며(branch), 특정 지점으로 돌아갈 수 있습니다(reset).

## 실전에서

### AI 협업의 기본 루틴: 커밋 = 체크포인트

AI 코딩 도구와 일할 때 이 사이클은 안전벨트가 됩니다. AI에게 작업을 시키기 **전에** 커밋해 두면, 결과가 나쁠 때 되돌릴 지점이 생깁니다. 이 프로젝트의 운영 규칙("AI 변경은 검토 후 커밋")이 바로 이 원리입니다.

```bash
git status              # 시작 전: 깨끗한지 확인
# ... AI에게 작업 지시 ...
git status              # AI가 무엇을 만들었나 (미추적 파일 포함)
git diff                # 내용 검토
git add -p              # 수용할 변경만 선별
git commit -m "feat: AI가 구현한 검색 필터 (검토 완료)"
```

### 선별 수용: add -p의 진가

AI가 한 번에 여러 파일을 고쳤는데 일부만 마음에 들 때 — `git add -p`가 변경 덩어리를 하나씩 보여주며 y(수용)/n(보류)을 묻습니다. 수용분만 커밋하고 나머지는 워킹 트리에 남겨 계속 다듬을 수 있습니다.

> [!TIP]
> 커밋 직전 `git status` 한 번이 사고를 막습니다. 이 프로젝트에서도 릴리스 커밋에 콘텐츠 파일이 빠진 사고가 두 번 있었고, 그 후 "커밋 후 `git show --stat`으로 포함 파일 확인"이 운영 절차가 됐습니다.

### 커밋 메시지의 실무 규칙

메시지는 "무엇을"이 아니라 "왜"를 담을 때 가치가 생깁니다. `수정`, `업데이트` 같은 메시지는 한 달 뒤의 자신에게 아무것도 알려주지 못합니다. `fix: 로그인 후 리다이렉트가 이전 페이지를 무시하는 문제` — 이렇게 쓰면 log만 훑어도 이력이 읽힙니다.

### .gitignore: 미추적 목록을 다스리는 도구

status의 세 번째 묶음(Untracked files)이 빌드 산출물·로그·의존성 폴더로 가득 차면, 정작 중요한 새 파일이 묻힙니다. 반복적으로 추적할 필요가 없는 경로는 프로젝트 루트의 `.gitignore` 파일에 등록하세요 — status의 정의 자체가 "무시되지 않은(not ignored)" 미추적 파일만 보여주도록 되어 있어서, 등록 즉시 목록이 조용해집니다. 이 프로젝트도 `node_modules`, 빌드 캐시, 로컬 백업 zip을 이 방식으로 걸러냅니다. 원칙은 하나입니다: ==명령이 만들어낼 수 있는 것은 기록하지 않고, 사람이 작성한 것만 기록한다==.

## 한계와 트레이드오프

**add 단계는 편의이자 함정입니다.** 부분 기록이라는 강력함의 대가로 "add를 잊는" 실수가 생깁니다. 수정 → add → 또 수정 → commit을 하면 마지막 수정이 빠진 커밋이 만들어집니다. 습관적 해법은 commit 전 status 확인입니다.

**`git add .`의 편리함은 무차별성과 맞바꾼 것입니다.** 실험 파일, 로그, 비밀 키까지 한 번에 스테이징될 수 있습니다. 미추적 파일 목록을 status로 먼저 확인하고, 반복적으로 제외할 것은 `.gitignore`에 등록하는 것이 정석입니다.

**--amend는 되돌리기가 아니라 다시 쓰기입니다.** 브랜치 끝을 교체하므로 로컬에서는 깔끔한 도구지만, 공유된 이력에서는 협업자의 기준점을 무너뜨립니다. 공유 이후의 정정은 뒤 강의의 revert가 담당합니다.

**이 네 명령만으로는 "과거"를 다룰 수 없습니다.** 기록은 만들지만, 기록을 조회(log/diff/show)하거나 잘못된 기록을 복구(restore/reset/revert)하는 것은 다음 강의들의 몫입니다 — 이 사이클은 출발점입니다.

> [!WARNING]
> 홈 디렉터리나 바탕화면에서 `git init`을 실행하지 마세요. 그 아래 모든 폴더가 하나의 저장소로 묶여, 이후 모든 status/add가 수천 개 파일을 상대하게 됩니다. 저장소는 항상 프로젝트 폴더 단위로.

### 설명 연습: 세 영역을 분리해서 말하기

이 강의를 남에게 설명할 때는 working tree, index, commit을 한 문장씩 분리해 보세요. working tree는 지금 파일이 실제로 놓인 작업대입니다. index는 다음 커밋에 넣기로 고른 장바구니입니다. commit은 그 장바구니를 시간 기록으로 굳힌 스냅샷입니다. status는 이 세 영역 사이의 차이를 보여 주는 안내판입니다.

이 구분을 알면 add와 commit의 차이가 자연스럽게 보입니다. add는 파일을 영구 저장하는 명령이 아니라 다음 커밋 후보로 올리는 명령입니다. commit은 그 후보를 하나의 설명 메시지와 함께 기록으로 남깁니다. AI와 협업할 때도 이 순서를 지켜야 합니다. 수정된 파일을 확인하고, 의도한 파일만 stage하고, 메시지로 왜 바꿨는지 남기면 이후 리뷰와 복구가 쉬워집니다.

## 더 읽기

- [git-init — Git Documentation](https://git-scm.com/docs/git-init) — 저장소 구조, --initial-branch, 재실행 안전성
- [git-add — Git Documentation](https://git-scm.com/docs/git-add) — 인덱스 개념, -p/-A 옵션 상세
- [git-commit — Git Documentation](https://git-scm.com/docs/git-commit) — 커밋 생성 방식, --amend
- [git-status — Git Documentation](https://git-scm.com/docs/git-status) — 세 묶음 출력의 정의

다음 순서: [git branch/switch/merge 레퍼런스](/lessons/git-branch-switch-merge) — 커밋 그래프 위에서 갈래를 만들고 합치는 법. 그 다음 [git log/diff/show](/lessons/git-log-diff-show)로 이력을 읽습니다.
