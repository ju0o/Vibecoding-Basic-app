## 한 줄 정의

Pull Request(PR)는 **"이 브랜치의 변경을 저 브랜치에 합치자"는 제안**이며, 그 제안 위에서 리뷰·토론·병합이 일어나는 GitHub의 협업 단위입니다. 공식 문서의 한 줄 정의는 ==PR로 코드 변경을 제안하고, 리뷰하고, 병합할 수 있다==는 것입니다.

PR은 Git의 명령이 아닙니다 — Git이 제공하는 브랜치·머지·diff라는 원자 위에, GitHub이 "제안 → 리뷰 → 승인 → 병합"이라는 사회적 절차를 얹은 계층입니다. 그래서 이 강의는 앞서 배운 브랜치(git-branch-switch-merge)와 diff(git-log-diff-show)를 "혼자 쓰는 도구"에서 "함께 쓰는 흐름"으로 확장합니다.

> [!KEY]
> PR의 핵심은 **방향과 게이트**입니다. 방향은 "head(내 브랜치) → base(합칠 대상)"이고, 게이트는 "리뷰가 통과되기 전에는 병합하지 않는다"입니다. rebase 강의에서 배운 "공유 이력은 함부로 재작성하지 않는다"는 경계가, 실무에서 강제되는 자리가 바로 이 PR 게이트입니다.

![Pull Request 흐름: head→base 제안, 리뷰 3상태, 병합 3전략](/lesson-diagrams/github-pr-review-flow/pr-review-merge-flow.svg)

## 왜 존재하는가

브랜치와 머지를 배웠다면 "혼자서 안전하게 나누고 합치기"는 할 수 있습니다. 그런데 여럿이 한 저장소를 쓰는 순간 세 가지가 필요해집니다.

첫째, **합치기 전에 보여주기.** 내 변경을 곧장 main에 밀어 넣으면 다른 사람은 이미 벌어진 뒤에야 알게 됩니다. PR은 base와 head의 차이를 "아직 합치지 않은 제안" 상태로 만들어, 합의를 병합보다 앞에 둡니다.

둘째, **병합 전에 문제 잡기.** 공식 문서는 리뷰가 "comment on changes, suggest improvements, and approve or request changes before code is merged"(병합 전에 변경에 코멘트하고, 개선을 제안하고, 승인하거나 변경을 요청)를 가능하게 한다고 말합니다. 결함을 배포 후가 아니라 병합 전에 잡는 것이 목적입니다.

셋째, **규칙을 자동으로 강제하기.** "리뷰 한 명은 꼭 거치자"는 팀 합의는 사람의 선의에 기대면 무너집니다. 저장소 관리자는 병합 전 승인(required approvals)을 강제할 수 있고, 그러면 승인이 채워지기 전에는 병합 버튼 자체가 잠깁니다.

## 작동 원리

### base와 head, 그리고 자동 갱신

PR은 두 브랜치를 가리킵니다 — **base**(변경을 합쳐 넣을 대상, 보통 main)와 **head/compare**(내 커밋이 쌓인 브랜치). PR의 **Files changed** 탭이 둘의 차이를 보여줍니다. 중요한 성질 하나: PR을 연 뒤에도 head 브랜치에 커밋을 더 push하면 ==같은 PR이 자동으로 갱신==되고 diff도 새로 반영됩니다. 리뷰 도중 지적을 반영해 커밋을 올리면, PR을 다시 열 필요 없이 그 자리에서 업데이트됩니다.

### 리뷰의 세 가지 상태

리뷰는 단순한 댓글이 아니라 **상태를 가진 판정**입니다. 공식 문서는 세 상태를 이렇게 정의합니다:

- **Comment** — 승인도 변경요청도 아닌 일반 피드백
- **Approve** — 병합을 승인
- **Request changes** — 병합 전 반드시 고쳐야 할 문제를 지적

이 셋의 차이는 "병합 게이트에 어떻게 작용하는가"입니다. Approve는 문을 열고, Request changes는 문을 잠그며, Comment는 문을 건드리지 않습니다.

### 라인 코멘트와 제안

리뷰어는 파일 전체가 아니라 **특정 라인**에 코멘트할 수 있고, 작성자가 클릭 한 번으로 반영할 수 있는 **변경 제안(suggested changes)**을 남길 수도 있습니다. "여기 이렇게 바꾸면 좋겠다"를 말이 아니라 적용 가능한 diff로 제시하는 것입니다.

### 병합의 세 가지 전략

승인이 끝나면 병합합니다. GitHub은 세 방식을 제공하며, 각각 이력에 남는 모양이 다릅니다:

| 전략 | 이력에 남는 모양 | rebase 강의와의 관계 |
|---|---|---|
| Create a merge commit | head의 모든 커밋 + 병합 커밋 1개 | merge 그대로 — 이력 보존 |
| Squash and merge | PR의 커밋들이 하나로 압축 | rebase -i squash의 서버판 |
| Rebase and merge | 모든 커밋이 병합 커밋 없이 base 위에 개별로 | rebase의 서버판 |

> [!EXAMPLE]
> AI에게 기능 하나를 맡겼더니 "wip", "fix", "again" 같은 커밋 7개가 쌓였습니다. 이력을 그대로 두면 지저분하지만, PR에서 **Squash and merge**를 고르면 그 7개가 의미 있는 커밋 1개로 base에 들어갑니다 — 로컬에서 `git rebase -i`로 하던 정리를 병합 버튼이 대신하는 셈입니다.

## 스펙과 세부

### PR을 여는 흐름
1. feature 브랜치를 push한다.
2. base=main, head=feature로 PR을 연다.
3. 제목·본문에 "무엇을, 왜" 바꿨는지 쓴다 (리뷰어가 diff를 읽기 전의 지도).
4. Files changed로 스스로 먼저 검토한다.

### 리뷰 상태와 게이트 작용

| 리뷰 상태 | 병합 게이트 | 언제 쓰나 |
|---|---|---|
| Comment | 영향 없음 | 질문·의견, 판단 보류 |
| Approve | 문을 연다 | 합쳐도 좋다 |
| Request changes | 문을 잠근다 | 이대로는 안 된다, 고쳐라 |

### 병합 전략 선택 기준

| 원하는 것 | 전략 |
|---|---|
| 언제 갈라지고 합쳐졌는지 이력 보존 | Create a merge commit |
| 커밋 여러 개를 하나로 깔끔하게 | Squash and merge |
| 병합 커밋 없이 평평한 이력 | Rebase and merge |

### Draft PR

아직 완성 전이라면 **Draft PR**로 엽니다. 초안 PR은 병합할 수 없고 코드 소유자에게 자동 리뷰 요청도 가지 않습니다 — "지금 보되 아직 판정하지 마세요"라는 신호입니다. 완성되면 Ready for review로 전환합니다.

### 상황별 빠른 참조

| 상황 | 처방 |
|---|---|
| 내 변경을 합치기 전에 보여주고 싶다 | feature push → base=main PR |
| 리뷰 도중 지적을 반영했다 | head에 커밋 push (PR 자동 갱신) |
| 이 변경은 아직 합치면 안 된다 | 리뷰에서 Request changes |
| AI의 wip 커밋을 깔끔히 합치고 싶다 | Squash and merge |
| 작업이 미완성인데 미리 피드백받고 싶다 | Draft PR로 열기 |
| 사람 승인 없는 병합을 막고 싶다 | required approvals 설정 |

## 원문으로 읽기

> "Pull requests let you propose, review, and merge code changes. [...]"
>
> — Pull Request로 코드 변경을 제안하고, 리뷰하고, 병합할 수 있다.
> [About pull requests — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

PR의 정체가 세 동사에 압축되어 있습니다 — propose(제안), review(리뷰), merge(병합). 이 순서가 곧 흐름입니다. 제안 없이 리뷰 없고, 리뷰 없이 (안전한) 병합이 없습니다. PR을 "코드 올리는 곳"이 아니라 "이 세 단계를 거치는 절차"로 읽는 것이 핵심입니다.

> "The Files changed tab shows the differences between the proposed changes and the existing code, making it easy to see what will [...]"
>
> — Files changed 탭은 제안된 변경과 기존 코드의 차이를 보여주어, PR이 병합될 때 무엇이 바뀔지 쉽게 볼 수 있게 한다.
> [About pull requests — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

"the differences between the proposed changes and the existing code" — 이것은 정확히 `git diff`가 하는 일입니다. PR의 Files changed는 diff의 웹 협업판이며, 그래서 diff를 읽는 능력(git-log-diff-show 강의)이 PR 리뷰 능력으로 그대로 이어집니다. 리뷰란 결국 diff를 읽고 판단하는 일입니다.

> "Comment: Share feedback without approving or requesting changes. [...]"
>
> — Comment: 승인하거나 변경을 요청하지 않고 피드백을 공유한다.
> [About pull request reviews — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

Comment는 "판단 보류" 상태입니다. 질문이 있거나 의견은 있지만 승인/거부를 결정하지 않을 때 씁니다. 게이트를 건드리지 않으므로, Comment만 쌓인 PR은 여전히 "아직 승인되지 않은" 상태로 남습니다.

관련 원문(링크): [About pull request reviews — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

Approve는 병합 게이트를 여는 유일한 상태입니다. required approvals가 걸린 저장소에서는 이 Approve가 정해진 수만큼 채워져야 병합 버튼이 활성화됩니다.

관련 원문(링크): [About pull request reviews — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

"must be fixed before merging" — Request changes는 강한 상태입니다. 단순한 의견이 아니라 "이대로는 병합 불가"라는 판정이며, 작성자가 고쳐서 다시 올릴 때까지 게이트를 잠급니다.

## 실전에서

### AI 변경의 표준 검토 무대

AI에게 코드를 맡길 때 가장 위험한 습관은 "결과를 바로 main에 넣는 것"입니다. 대신 PR로 올리면, Files changed diff가 ==AI가 실제로 무엇을 바꿨는가==를 라인 단위로 드러냅니다. AI의 설명("이렇게 고쳤습니다")이 아니라 diff(실제로 바뀐 코드)를 근거로 판단할 수 있게 됩니다. 이 프로젝트의 강의들도 그런 관점에서 "AI 결과는 실행 결과·diff로 검증하라"를 반복합니다.

### Request changes를 게이트로

AI 결과가 반만 맞을 때 Comment로 "여기 좀 이상한데요"라고 남기면 게이트가 열린 채로 남아 실수로 병합될 수 있습니다. "병합 전 반드시 고쳐야 한다"면 명확히 **Request changes**를 씁니다 — 상태가 곧 안전장치입니다.

### required reviews로 실수 병합 막기

혼자 하는 저장소라도, 중요한 브랜치(main)에 required approvals를 걸어두면 "급해서 그냥 밀어 넣었다"가 구조적으로 불가능해집니다. 사람의 규율을 규칙으로 바꾸는 것 — 이것이 협업 도구의 핵심 가치입니다.

> [!TIP]
> PR 제목과 본문은 리뷰어(그리고 6개월 뒤의 나)가 diff를 읽기 전에 만나는 "지도"입니다. "무엇을" 바꿨는지는 diff가 보여주니, 본문에는 ==왜 바꿨는지==를 쓰세요. diff가 답할 수 없는 유일한 질문이 "왜"입니다.

## 한계와 트레이드오프

**PR은 Git이 아니라 GitHub의 기능입니다.** 같은 개념을 GitLab은 Merge Request, 다른 도구는 또 다른 이름으로 부릅니다. 여기서 배우는 것은 "GitHub 버튼 사용법"이 아니라 "제안-리뷰-병합이라는 협업 패턴"이며, 그 패턴은 도구가 달라도 이전됩니다.

**리뷰는 diff를 읽을 수 있는 만큼만 유효합니다.** 거대한 PR은 리뷰어가 diff를 끝까지 읽지 못해 "대충 Approve"를 부릅니다. 리뷰의 품질은 PR의 크기에 반비례합니다 — 그래서 "작게 나눠 올리기"가 협업의 기본기입니다.

**병합 전략은 이력의 진실성과 깔끔함을 맞바꿉니다.** Squash and merge는 깔끔하지만 개별 커밋의 맥락을 지웁니다. 나중에 "이 한 줄이 왜 바뀌었나"를 커밋 단위로 추적해야 하는 프로젝트라면, 깔끔함보다 보존(merge commit)이 나을 수 있습니다. rebase 강의의 교훈과 같습니다 — 깔끔한 이력에는 대가가 있습니다.

> [!WARNING]
> Approve를 "예의상 누르는 버튼"으로 다루면 리뷰 게이트는 장식이 됩니다. Approve는 "나는 이 diff를 읽었고 병합에 동의한다"는 서명입니다. 읽지 않은 diff에 Approve를 누르는 것은, 나중에 문제가 생겼을 때 "왜 통과됐나"의 답이 사라진다는 뜻입니다.

## 더 읽기

- [About pull requests — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) — PR 정의, Files changed diff, Draft PR, 자동 갱신
- [About pull request reviews — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) — 리뷰 3상태, 라인 코멘트, required reviews
- [About pull request merges — GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges) — 병합 3전략

이전 순서: [git log/diff/show 조회 레퍼런스](/lessons/git-log-diff-show) — PR의 Files changed가 곧 diff의 웹 표현. 다음 순서: [GitHub CLI(gh) 레퍼런스](/lessons/gh-cli-reference) — 이 PR 흐름 전체를 터미널에서 수행하는 `gh pr` 명령군.
