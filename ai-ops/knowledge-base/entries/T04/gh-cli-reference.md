---
id: gh-cli-reference
title: "GitHub CLI (gh) 실무 레퍼런스 — PR을 터미널에서"
topicGroup: T04
status: approved
score: 89
level: 중급
prerequisites: [github-pr-review-flow]
successors: []
related: [git-branch-switch-merge, git-log-diff-show]
sources:
  - { title: "gh pr create — GitHub CLI manual", url: "https://cli.github.com/manual/gh_pr_create", checked: 2026-07-07 }
  - { title: "gh pr merge — GitHub CLI manual", url: "https://cli.github.com/manual/gh_pr_merge", checked: 2026-07-07 }
  - { title: "gh pr review — GitHub CLI manual", url: "https://cli.github.com/manual/gh_pr_review", checked: 2026-07-07 }
  - { title: "gh pr checkout — GitHub CLI manual", url: "https://cli.github.com/manual/gh_pr_checkout", checked: 2026-07-07 }
  - { title: "gh pr list — GitHub CLI manual", url: "https://cli.github.com/manual/gh_pr_list", checked: 2026-07-07 }
  - { title: "gh pr view — GitHub CLI manual", url: "https://cli.github.com/manual/gh_pr_view", checked: 2026-07-07 }
consumers:
  lessons: []
  glossary: []
updated: 2026-07-07
---

## 정의
GitHub CLI(`gh`)는 GitHub의 PR·이슈·리뷰 작업을 터미널에서 수행하는 공식 명령줄 도구다. 웹 UI로 하던 PR 생성·조회·리뷰·병합을 `gh pr` 하위 명령으로 옮긴다: `gh pr create`는 "Create a pull request on GitHub", `gh pr review`는 "Add a review to a pull request", `gh pr merge`는 "Merge a pull request on GitHub", `gh pr checkout`은 "Check out a pull request in git". (출처: cli.github.com/manual/gh_pr_create·gh_pr_review·gh_pr_merge·gh_pr_checkout, 확인: 2026-07-07)

## 역사
`gh`는 GitHub이 만든 공식 CLI로, 브라우저를 오가지 않고 PR 흐름 전체를 셸에서 끝내려는 목적에서 나왔다. github-pr-review-flow KB에서 배운 개념(base/head, 리뷰 3상태, 병합 3전략)이 각각 `gh pr create --base`, `gh pr review --approve/--comment/--request-changes`, `gh pr merge --merge/--squash/--rebase` 플래그로 1:1 대응한다 — 개념을 알면 명령이 자연스럽게 읽힌다. (근거: gh_pr_* 매뉴얼 플래그 대조, 확인: 2026-07-07)

## 해결하려는 문제
- 웹 UI 왕복 없이 PR 생성: `gh pr create`가 현재 브랜치에서 바로 PR을 연다. (출처: gh_pr_create, 확인: 2026-07-07)
- 리뷰를 터미널에서: `gh pr review`가 승인·코멘트·변경요청을 명령으로 제출한다. (출처: gh_pr_review, 확인: 2026-07-07)
- 병합 전략을 플래그로 선택: `gh pr merge --squash` 등으로 병합 방식을 지정한다. (출처: gh_pr_merge, 확인: 2026-07-07)

## 핵심 개념
1. **`gh pr create`**: 현재 head 브랜치의 변경으로 PR을 만든다. 핵심 플래그 — `--base/-B`("The branch into which you want your code merged"), `--head/-H`("The branch that contains commits for your pull request"), `--title/-t`, `--body/-b`, `--draft/-d`("Mark pull request as a draft"), `--fill/-f`("Use commit info for title and body"), `--web/-w`. (출처: gh_pr_create, 확인: 2026-07-07)
2. **`gh pr review`**: 리뷰 3상태가 그대로 플래그다 — `--approve/-a`("Approve pull request"), `--comment/-c`("Comment on a pull request"), `--request-changes/-r`("Request changes on a pull request"), `--body/-b`("Specify the body of a review"). (출처: gh_pr_review, 확인: 2026-07-07)
3. **`gh pr merge`**: 병합 3전략이 플래그다 — `--merge/-m`("Merge the commits with the base branch"), `--squash/-s`("Squash the commits into one commit and merge it into the base branch"), `--rebase/-r`("Rebase the commits onto the base branch"). 부가로 `--auto`("Automatically merge only after necessary requirements are met"), `--delete-branch/-d`("Delete the local and remote branch after merge"). (출처: gh_pr_merge, 확인: 2026-07-07)
4. **조회·전환**: `gh pr list`("List pull requests in a GitHub repository. By default, this only lists open PRs"), `gh pr view`("Display the title, body, and other information about a pull request"), `gh pr checkout`("Check out a pull request in git" — 남의 PR을 로컬 브랜치로 받아 검토). (출처: gh_pr_list·gh_pr_view·gh_pr_checkout, 확인: 2026-07-07)
5. **필터**: `gh pr list --state {open|closed|merged|all}`, `--author`, `--label`로 목록을 좁힌다. (출처: gh_pr_list, 확인: 2026-07-07)
6. **--web 이중 모드**: 대부분의 `gh pr` 명령은 `--web`으로 같은 동작을 브라우저에서 열 수 있어, 터미널과 웹을 자유롭게 오간다. (출처: gh_pr_create·gh_pr_list, 확인: 2026-07-07)

## 관련 기술
- `gh pr` ↔ github-pr-review-flow: CLI 플래그가 웹 개념의 직역이다(base/head, approve/comment/request-changes, merge/squash/rebase). (출처: gh_pr_* + about-pull-request-reviews/merges, 확인: 2026-07-07)
- `gh pr checkout` ↔ git-branch-switch-merge: PR 검토를 위해 head 브랜치를 로컬로 전환하는 것은 브랜치 전환의 특수형이다. (근거: gh_pr_checkout, 확인: 2026-07-07)
- `gh pr merge --squash/--rebase` ↔ git-rebase-cherry-pick-stash: 로컬 rebase/squash를 병합 시점 서버 동작으로 대체. (출처: gh_pr_merge + git-rebase KB, 확인: 2026-07-07)

## 선행 개념
- github-pr-review-flow: gh는 그 PR 개념을 명령으로 수행하는 도구다.

## 후행 개념
- deployment-cli-reference (예정): 배포 CLI와 함께 터미널 중심 워크플로를 완성.

## AI 시대에서의 의미
AI 에이전트(예: Claude Code)가 PR을 다룰 때 실제로 실행하는 것이 `gh pr` 명령이다 — `gh pr create`로 변경을 제안하고, `gh pr view`/`gh pr checkout`으로 남의(또는 AI의) PR을 받아 diff를 검토하며, `gh pr merge --squash`로 지저분한 커밋을 정리해 병합한다. 사람이 개념을, 에이전트가 명령을 다룰 때 둘의 접점이 이 레퍼런스다. (근거: gh_pr_create·view·checkout·merge, 확인: 2026-07-07)

## 실무 활용
1. PR 생성: `gh pr create --base main --fill` — 현재 브랜치 커밋 정보로 제목·본문을 채워 즉시 제안. (출처: gh_pr_create, 확인: 2026-07-07)
2. 리뷰: `gh pr review 123 --request-changes --body "..."` — 특정 PR에 변경요청 제출. (출처: gh_pr_review, 확인: 2026-07-07)
3. 검토용 체크아웃: `gh pr checkout 123` — 리뷰 대상 PR을 로컬 브랜치로 받아 실행·검토. (출처: gh_pr_checkout, 확인: 2026-07-07)
4. 병합: `gh pr merge 123 --squash --delete-branch` — 압축 병합 후 브랜치 정리. (출처: gh_pr_merge, 확인: 2026-07-07)

## FAQ
Q: `gh pr create`의 base와 head는?
A: `--base`는 코드를 합쳐 넣을 대상 브랜치, `--head`는 PR의 커밋을 담은 브랜치(기본값은 현재 브랜치)다. (출처: gh_pr_create, 확인: 2026-07-07)
Q: 터미널에서 리뷰 상태를 어떻게 정하나?
A: `gh pr review`에 `--approve`, `--comment`, `--request-changes` 중 하나를 준다 — 웹의 3상태와 동일. (출처: gh_pr_review, 확인: 2026-07-07)
Q: 병합 방식은 어떻게 고르나?
A: `--merge`(병합 커밋), `--squash`(하나로 압축), `--rebase`(base 위에 얹기) 중 선택한다. (출처: gh_pr_merge, 확인: 2026-07-07)
Q: 남의 PR을 내 컴퓨터에서 돌려보려면?
A: `gh pr checkout <번호>`로 그 PR을 로컬 git 브랜치로 체크아웃한다. (출처: gh_pr_checkout, 확인: 2026-07-07)

## 자주 하는 실수
1. 실수: `--base`를 빠뜨려 엉뚱한 브랜치로 PR 생성. 왜 생기나: 기본 base를 확인 안 함. 교정: `gh pr create --base main` 명시. (출처: gh_pr_create, 확인: 2026-07-07)
2. 실수: 리뷰 없이 `gh pr merge`로 바로 병합. 왜 생기나: required review를 잊음. 교정: 승인 요건 충족 후 병합 또는 `--auto`로 요건 충족 시 자동 병합. (출처: gh_pr_merge, 확인: 2026-07-07)
3. 실수: 병합 후 브랜치가 쌓여 지저분. 왜 생기나: 정리 플래그 미사용. 교정: `--delete-branch`로 병합과 동시에 정리. (출처: gh_pr_merge, 확인: 2026-07-07)
4. 실수: PR 목록에서 닫힌 PR을 못 찾음. 왜 생기나: 기본이 open만. 교정: `gh pr list --state all`. (출처: gh_pr_list, 확인: 2026-07-07)

## 공식 출처
- PR 생성·base/head/draft/fill — [gh pr create](https://cli.github.com/manual/gh_pr_create) (확인: 2026-07-07)
- 리뷰 3상태 플래그 — [gh pr review](https://cli.github.com/manual/gh_pr_review) (확인: 2026-07-07)
- 병합 3전략 플래그 — [gh pr merge](https://cli.github.com/manual/gh_pr_merge) (확인: 2026-07-07)
- 체크아웃·조회 — [gh pr checkout](https://cli.github.com/manual/gh_pr_checkout) · [gh pr list](https://cli.github.com/manual/gh_pr_list) · [gh pr view](https://cli.github.com/manual/gh_pr_view) (확인: 2026-07-07)

## Quote Bank
- > "Create a pull request on GitHub."
  - 출처: [gh pr create](https://cli.github.com/manual/gh_pr_create) (확인: 2026-07-07)
  - 맥락: gh pr create의 공식 한 줄 설명
- > "Add a review to a pull request."
  - 출처: [gh pr review](https://cli.github.com/manual/gh_pr_review) (확인: 2026-07-07)
  - 맥락: gh pr review의 공식 한 줄 설명 — 웹 리뷰의 CLI판
- > "Squash the commits into one commit and merge it into the base branch"
  - 출처: [gh pr merge](https://cli.github.com/manual/gh_pr_merge) (확인: 2026-07-07)
  - 맥락: --squash 플래그 설명 — 병합 3전략 중 압축
- > "Rebase the commits onto the base branch"
  - 출처: [gh pr merge](https://cli.github.com/manual/gh_pr_merge) (확인: 2026-07-07)
  - 맥락: --rebase 플래그 설명 — base 위에 얹기
- > "Check out a pull request in git"
  - 출처: [gh pr checkout](https://cli.github.com/manual/gh_pr_checkout) (확인: 2026-07-07)
  - 맥락: gh pr checkout — 남의 PR을 로컬 브랜치로 받아 검토
- > "List pull requests in a GitHub repository. By default, this only lists open PRs."
  - 출처: [gh pr list](https://cli.github.com/manual/gh_pr_list) (확인: 2026-07-07)
  - 맥락: gh pr list — 기본은 open PR만

## 변경 이력
- 2026-07-07: 최초 작성 (Fable — 대행, P-01)
