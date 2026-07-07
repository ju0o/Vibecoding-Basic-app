## 한 줄 정의

GitHub CLI(`gh`)는 **PR·리뷰·병합을 브라우저 대신 터미널에서 수행하는 공식 명령줄 도구**입니다. 앞 강의에서 개념으로 배운 Pull Request 흐름을 그대로 명령으로 옮깁니다 — `gh pr create`(제안), `gh pr review`(리뷰), `gh pr merge`(병합).

이 강의의 열쇠는 하나입니다: ==`gh`의 플래그는 웹 PR 개념의 직역==입니다. 웹에서 base/head를 고르는 것이 `--base`/`--head`이고, 리뷰 3상태가 `--approve`/`--comment`/`--request-changes`이며, 병합 3전략이 `--merge`/`--squash`/`--rebase`입니다. 개념을 알면 명령은 외울 것이 없습니다 — 읽으면 이해됩니다.

> [!KEY]
> 앞 강의(github-pr-review-flow)가 "무엇을·왜"라면, 이 강의는 "터미널에서 어떻게"입니다. 두 강의는 같은 흐름의 두 표현일 뿐이므로, `gh` 명령이 낯설면 대응하는 웹 동작을 떠올리세요 — `gh pr merge --squash`는 웹의 "Squash and merge" 버튼과 정확히 같은 일을 합니다.

![gh pr 명령 생애주기: create → list/view/checkout → review → merge](/lesson-diagrams/gh-cli-reference/gh-pr-lifecycle.svg)

## 왜 존재하는가

PR 흐름을 웹 UI로만 다루면 두 가지가 불편합니다.

첫째, **맥락 전환 비용.** 코드는 터미널·에디터에서 쓰는데, PR을 열려면 브라우저로 가서 버튼을 누르고 다시 돌아와야 합니다. `gh`는 이 왕복을 없애 "코드 쓰던 자리에서" PR을 열게 합니다.

둘째, **자동화 불가능.** 웹 버튼은 사람이 눌러야 하지만, `gh` 명령은 스크립트와 AI 에이전트가 실행할 수 있습니다. AI가 "변경을 만들고 → PR을 올리고 → 검토용으로 체크아웃하고 → 병합한다"를 스스로 수행할 때, 그 각 단계가 바로 `gh pr` 명령입니다. 실제로 Claude Code 같은 도구가 PR을 다룰 때 실행하는 것이 이 명령군입니다.

`gh`는 웹 UI를 대체하려는 것이 아니라, **같은 동작에 두 번째 입구**를 여는 것입니다 — 대부분의 명령은 `--web` 플래그로 언제든 브라우저로 넘어갈 수 있습니다.

## 작동 원리

명령어 인덱스: [gh pr create](#gh-pr-create) · [gh pr review](#gh-pr-review) · [gh pr merge](#gh-pr-merge) · [gh pr checkout/list/view](#조회와-전환)

`gh pr`의 하위 명령들은 PR의 생애주기(생성 → 조회·검토 → 리뷰 → 병합)를 그대로 따릅니다. 각 명령의 플래그가 앞 강의의 개념과 1:1로 붙는다는 점만 잡으면 전체가 하나의 지도로 읽힙니다.

- **생성**: `gh pr create` — head의 변경으로 PR을 연다
- **조회·전환**: `gh pr list`/`view`/`checkout` — PR을 나열·열람하거나 로컬로 받는다
- **리뷰**: `gh pr review` — 3상태 중 하나로 판정한다
- **병합**: `gh pr merge` — 3전략 중 하나로 합친다

이 네 묶음이 앞 강의의 "제안 → 리뷰 → 병합" 흐름을 그대로 명령으로 편 것입니다.

> [!EXAMPLE]
> AI가 feature 브랜치에 작업을 마쳤습니다. 터미널에서 `gh pr create --base main --fill`을 실행하면, 커밋 메시지로 제목·본문을 채운 PR이 즉시 열립니다. 리뷰어는 `gh pr checkout <번호>`로 그 브랜치를 자기 컴퓨터에 받아 실행해 보고, 문제가 없으면 `gh pr merge <번호> --squash --delete-branch`로 압축 병합과 브랜치 정리를 한 번에 끝냅니다 — 브라우저를 한 번도 열지 않았습니다.

## 스펙과 세부

### `gh pr create`

**문법**: `gh pr create [플래그]` (현재 head 브랜치의 변경으로 PR 생성)

| 플래그 | 의미 |
|---|---|
| `--base`, `-B` | The branch into which you want your code merged (합칠 대상 브랜치) |
| `--head`, `-H` | The branch that contains commits for your pull request (기본값: 현재 브랜치) |
| `--title`, `-t` / `--body`, `-b` | 제목 / 본문 |
| `--fill`, `-f` | Use commit info for title and body (커밋 정보로 자동 채움) |
| `--draft`, `-d` | Mark pull request as a draft (초안으로 생성) |
| `--web`, `-w` | 브라우저에서 생성 화면 열기 |

**예시**:

```bash
git switch -c feature-search
git push -u origin feature-search
gh pr create --base main --fill    # 커밋 정보로 제목·본문 채워 PR 생성
```

**주의**: `--base`를 생략하면 기본 브랜치로 향합니다 — 의도한 대상이 아니면 명시하세요.

### `gh pr review`

**문법**: `gh pr review [<번호>] [플래그]` — 리뷰 3상태가 곧 플래그

| 플래그 | 의미 |
|---|---|
| `--approve`, `-a` | Approve pull request (병합 승인) |
| `--comment`, `-c` | Comment on a pull request (일반 피드백) |
| `--request-changes`, `-r` | Request changes on a pull request (병합 전 필수 수정) |
| `--body`, `-b` | Specify the body of a review (리뷰 본문) |

**예시**:

```bash
gh pr review 123 --request-changes --body "here에서 null 체크가 빠졌습니다"
gh pr review 123 --approve
```

**주의**: `--request-changes`는 게이트를 잠급니다 — 작성자가 고쳐 다시 올릴 때까지 병합이 막힙니다.

### `gh pr merge`

**문법**: `gh pr merge [<번호>] [플래그]` — 병합 3전략이 곧 플래그

| 플래그 | 의미 |
|---|---|
| `--merge`, `-m` | Merge the commits with the base branch (병합 커밋) |
| `--squash`, `-s` | Squash the commits into one commit and merge it into the base branch |
| `--rebase`, `-r` | Rebase the commits onto the base branch |
| `--auto` | Automatically merge only after necessary requirements are met |
| `--delete-branch`, `-d` | Delete the local and remote branch after merge |

**예시**:

```bash
gh pr merge 123 --squash --delete-branch   # 압축 병합 후 브랜치 정리
gh pr merge 123 --auto --squash            # 요건 충족되면 자동 병합
```

**주의**: `--auto`는 required review 등 요건이 충족된 뒤에만 병합하므로, 리뷰 게이트를 존중하면서 "통과되면 알아서 합쳐라"를 예약할 수 있습니다.

### 조회와 전환

| 명령 | 의미 |
|---|---|
| `gh pr list` | List pull requests in a GitHub repository. By default, this only lists open PRs |
| `gh pr view <번호>` | Display the title, body, and other information about a pull request |
| `gh pr checkout <번호>` | Check out a pull request in git (남의 PR을 로컬 브랜치로) |

`gh pr list`는 기본이 open만이므로, 닫히거나 병합된 것까지 보려면 `--state all`을 씁니다. `--author`, `--label`로도 좁힐 수 있습니다.

### 상황별 빠른 참조

| 하고 싶은 것 | 명령 |
|---|---|
| 현재 브랜치로 PR 열기 | `gh pr create --base main --fill` |
| 미완성 상태로 미리 열기 | `gh pr create --draft` |
| 열린 PR 목록 보기 | `gh pr list` |
| 닫힌 것까지 모두 보기 | `gh pr list --state all` |
| 남의 PR을 받아 실행해 보기 | `gh pr checkout <번호>` |
| 변경요청 리뷰 남기기 | `gh pr review <번호> --request-changes -b "..."` |
| 압축 병합 후 브랜치 정리 | `gh pr merge <번호> --squash -d` |
| 요건 충족 시 자동 병합 | `gh pr merge <번호> --auto --squash` |

## 원문으로 읽기

> "Create a pull request on GitHub."
>
> — GitHub에 Pull Request를 생성한다.
> [gh pr create — GitHub CLI manual](https://cli.github.com/manual/gh_pr_create)

매뉴얼의 한 줄은 군더더기가 없습니다. `gh pr create`가 하는 일은 정확히 이것 — 웹의 "New pull request" 버튼과 같은 결과를, 현재 브랜치 맥락에서 명령 한 줄로 만듭니다.

> "Add a review to a pull request."
>
> — Pull Request에 리뷰를 추가한다.
> [gh pr review — GitHub CLI manual](https://cli.github.com/manual/gh_pr_review)

"Add a review" — 리뷰가 PR에 **덧붙는 판정**임을 드러냅니다. `--approve`/`--comment`/`--request-changes` 중 무엇을 주느냐가 그 판정의 종류이고, 이는 앞 강의의 리뷰 3상태와 글자 그대로 대응합니다.

> "Squash the commits into one commit and merge it into the base branch"
>
> — 커밋들을 하나의 커밋으로 압축해 base 브랜치에 병합한다.
> [gh pr merge — GitHub CLI manual](https://cli.github.com/manual/gh_pr_merge)

`--squash`의 설명이 곧 정의입니다. rebase 강의에서 `git rebase -i`로 손수 하던 "여러 커밋을 하나로"를, 병합 시점에 서버가 대신하는 것이 이 플래그입니다. AI의 지저분한 wip 커밋을 정리하는 실무 도구가 여기 있습니다.

> "Rebase the commits onto the base branch"
>
> — 커밋들을 base 브랜치 위로 rebase한다.
> [gh pr merge — GitHub CLI manual](https://cli.github.com/manual/gh_pr_merge)

`--rebase`는 rebase 강의의 "이식" 개념을 병합 버튼으로 옮긴 것입니다. 병합 커밋 없이 base 위에 커밋을 개별적으로 얹어 평평한 이력을 만듭니다 — 단, rebase 강의의 경고("공유 이력 재작성 주의")가 여기서도 배경에 깔려 있습니다.

> "Check out a pull request in git"
>
> — git에서 Pull Request를 체크아웃한다.
> [gh pr checkout — GitHub CLI manual](https://cli.github.com/manual/gh_pr_checkout)

`gh pr checkout`은 리뷰의 숨은 절반입니다. diff를 눈으로 읽는 것을 넘어, 남의(또는 AI의) PR을 ==실제로 내 컴퓨터에서 실행해 보고== 판단할 수 있게 합니다 — "코드를 읽는 리뷰"에서 "코드를 돌려보는 리뷰"로 넘어가는 명령입니다.

## 실전에서

### AI 에이전트가 실제로 쓰는 명령

AI에게 "이 기능 만들고 PR 올려줘"라고 하면, 그 AI가 내부적으로 실행하는 것이 `gh pr create`입니다. AI 협업을 이해한다는 것은 이 명령들이 무엇을 하는지 아는 것과 같습니다 — 그래야 AI가 "PR을 올렸습니다"라고 할 때 무슨 일이 벌어졌는지 검증할 수 있습니다.

### checkout으로 "돌려보는 리뷰"

diff만 읽는 리뷰는 "이 코드가 실제로 동작하는가"에 답하지 못합니다. `gh pr checkout <번호>`로 PR을 로컬로 받아 실행·테스트하면, 앞 강의의 "실행 결과로 검증하라"를 PR 맥락에서 실천할 수 있습니다. AI 결과일수록 읽기보다 돌려보기가 중요합니다.

### `--auto`로 게이트를 존중하며 자동화

급한 변경이라도 리뷰를 건너뛰고 싶진 않을 때, `gh pr merge --auto`는 "required review 등 요건이 충족되면 그때 병합하라"를 예약합니다. 자동화와 게이트가 충돌하지 않는 지점입니다 — 사람의 승인은 남기되, 그 뒤의 병합만 자동화합니다.

> [!TIP]
> `gh pr create --fill`은 커밋 메시지를 PR 제목·본문으로 가져옵니다. 그래서 ==좋은 커밋 메시지가 좋은 PR 설명이 됩니다==. rebase 강의에서 배운 "wip 커밋을 의미 단위로 정리하기"가 여기서 보상을 받습니다 — 정리된 커밋은 `--fill` 한 번으로 읽을 만한 PR이 됩니다.

## 한계와 트레이드오프

**`gh`는 인증과 설정을 전제합니다.** 처음 쓰려면 `gh auth login`으로 GitHub 계정을 연결해야 하고, 저장소 원격(remote)이 GitHub이어야 합니다. 로컬 전용 Git 저장소에는 PR 개념 자체가 없으므로 `gh pr` 명령도 의미가 없습니다.

**명령의 간결함이 실수를 가립니다.** `gh pr merge --squash`는 한 줄이지만 되돌리기 어려운 병합을 실행합니다. 웹 UI가 병합 전 확인 화면을 보여주는 것과 달리, CLI는 플래그를 준 즉시 실행합니다 — 특히 `--delete-branch`는 병합 후 브랜치를 지우므로, 플래그를 붙이기 전에 결과를 한 번 더 생각해야 합니다.

**개념 없이 명령만 외우면 무너집니다.** 이 강의가 앞 강의(PR 개념)를 선행으로 두는 이유입니다. `--squash`와 `--rebase`의 차이는 병합 전략의 차이를 알아야 선택할 수 있고, `--request-changes`를 언제 쓸지는 리뷰 게이트를 이해해야 판단할 수 있습니다. 명령은 개념의 손잡이일 뿐입니다.

> [!WARNING]
> `gh pr merge`는 웹의 "confirm merge" 단계 없이 즉시 병합합니다. 특히 스크립트나 AI 자동화에서 `--merge`/`--squash`/`--rebase`를 넘길 때, 그 저장소의 병합 정책(어떤 전략을 표준으로 쓰는지)과 어긋나지 않는지 먼저 확인하세요 — 팀이 squash를 표준으로 쓰는데 rebase로 병합하면 이력 규칙이 깨집니다.

## 더 읽기

- [gh pr create — GitHub CLI manual](https://cli.github.com/manual/gh_pr_create) — 생성, base/head, draft, fill
- [gh pr review — GitHub CLI manual](https://cli.github.com/manual/gh_pr_review) — 리뷰 3상태 플래그
- [gh pr merge — GitHub CLI manual](https://cli.github.com/manual/gh_pr_merge) — 병합 3전략, --auto, --delete-branch
- [gh pr checkout — GitHub CLI manual](https://cli.github.com/manual/gh_pr_checkout) · [gh pr list](https://cli.github.com/manual/gh_pr_list) · [gh pr view](https://cli.github.com/manual/gh_pr_view)

이전 순서: [GitHub Pull Request 흐름](/lessons/github-pr-review-flow) — 이 명령들이 수행하는 개념. 이로써 git-collaboration 모듈의 "기록 → 분기 → 조회 → 복구 → 이력 편집 → 협업(PR) → 협업 자동화(gh)" 체계가 완성됩니다.
