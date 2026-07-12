## 한 줄 정의

Git은 파일 변경을 commit 그래프로 기록하고, branch로 작업 흐름을 나누며, merge와 pull request로 다른 사람의 변경과 내 변경을 합치는 협업용 버전 관리 시스템입니다. "개발자의 타임머신"이라는 표현은 Git이 과거로 돌아갈 수 있게 해 준다는 뜻만이 아닙니다. 어떤 변경이 언제, 왜, 누구에 의해 생겼는지 기록하고, 여러 작업을 안전하게 분리했다가 다시 합칠 수 있다는 뜻입니다.

초보자는 Git을 명령어 암기 과목으로 느끼기 쉽습니다. `init`, `add`, `commit`, `status`, `branch`, `switch`, `merge`, `log`, `diff`, `restore`, `reset`, `revert`가 한꺼번에 나오기 때문입니다. 하지만 Git의 중심은 명령어 목록이 아니라 working tree, index, HEAD, commit graph, branch pointer, remote review라는 몇 가지 구조입니다. ==Git을 이해한다는 것은 명령어를 많이 외우는 것이 아니라 변경이 어느 영역에 있고 어떤 기록으로 남을지 설명할 수 있다는 뜻==입니다.

이 강의는 Git & 협업 모듈의 큰 지도입니다. 뒤에서 각 명령을 reference 형식으로 자세히 다루지만, 여기서는 AI와 함께 개발할 때 Git이 왜 더 중요해지는지 먼저 봅니다. AI는 많은 파일을 빠르게 바꿀 수 있습니다. 그래서 사람은 바뀐 내용을 선별해 stage하고, 작은 commit으로 기록하고, diff를 읽고, 필요하면 되돌릴 수 있어야 합니다.

![Git 협업 흐름 지도](/lesson-diagrams/git-collaboration-basics/git-collaboration-flow.svg)

## 왜 존재하는가

코드는 한 번에 완성되지 않습니다. 기능을 추가하고, 실수를 고치고, 디자인을 바꾸고, 의존성을 업데이트하고, 다른 사람의 변경을 받아들이며 계속 변합니다. 이 변화를 파일 덮어쓰기와 폴더 복사로만 관리하면 금방 한계가 옵니다. 어떤 버전이 최신인지, 어떤 변경 때문에 버그가 생겼는지, 동시에 작업한 두 사람의 결과를 어떻게 합칠지 알기 어렵습니다.

버전 관리는 이 문제를 해결하기 위해 존재합니다. Git은 파일 변경을 commit으로 기록하고, commit 사이의 부모-자식 관계를 그래프로 유지합니다. branch는 이 그래프의 특정 지점을 가리키는 이름으로, 기능 개발, 버그 수정, 실험을 분리할 수 있게 합니다. merge는 분기된 변경을 다시 합치고, conflict가 생기면 사람이 어느 쪽을 남길지 결정하게 합니다.

AI 시대에는 Git의 필요가 더 커집니다. AI에게 "UI를 개선해줘"라고 하면 여러 파일이 한꺼번에 바뀔 수 있습니다. 그중 필요한 변경과 불필요한 변경을 가려내지 않으면 프로젝트는 금방 흐려집니다. Git은 AI가 만든 초안을 사람의 기록으로 바꾸는 관문입니다. stage할 것과 버릴 것을 나누고, commit message로 의도를 남기고, PR에서 diff를 검토할 수 있어야 AI 협업이 안전해집니다.

> [!KEY]
> Git은 "저장 버튼"이 아닙니다. 지금 작업 중인 변경, 기록 후보로 고른 변경, 이미 기록된 변경을 나누어 관리하는 시스템입니다.

## 작동 원리

### 1. 저장소는 `.git` 디렉터리에서 시작한다

`git init`은 현재 폴더에 Git 저장소를 만듭니다. 실제로는 `.git` 디렉터리와 그 안의 objects, refs 같은 구조가 생깁니다. 작업 파일과 Git의 내부 기록 저장소가 분리되는 순간, Git은 파일의 변화와 commit graph를 추적할 수 있습니다. 이미 저장소인 곳에서 다시 init을 실행해도 기존 기록을 덮어쓰지 않는다는 점은 입문자의 불안을 줄여 줍니다.

저장소가 생겼다고 모든 파일이 자동으로 기록되는 것은 아닙니다. Git은 working tree에 있는 파일 변화, index에 stage된 변화, HEAD가 가리키는 마지막 commit을 구분합니다. 이 세 영역을 모르면 `git status`의 출력도 단순 경고 목록처럼 보입니다. 하지만 status는 사실 "무엇이 아직 기록되지 않았고, 무엇이 commit 후보이고, 무엇이 추적되지 않는가"를 알려주는 지도입니다.

### 2. `add`는 기록 후보를 고르고 `commit`은 기록을 만든다

Git에서 commit은 현재 폴더 전체를 무조건 저장하는 동작이 아닙니다. commit은 index에 stage된 내용을 기반으로 새 기록을 만듭니다. 그래서 `git add`가 중요합니다. 어떤 파일을 이번 commit에 포함할지 고르고, 때로는 `git add -p`로 한 파일 안의 일부 hunk만 stage할 수도 있습니다. AI가 여러 변경을 만들었을 때 이 기능은 특히 유용합니다.

commit message는 단순 메모가 아닙니다. 나중에 `git log`와 PR에서 변경 의도를 읽는 단서입니다. 좋은 commit은 "무엇을 바꿨는가"와 "왜 바꿨는가"를 짧게 드러냅니다. `fix stuff`보다 `Fix lesson sidebar active section highlight`가 낫습니다. 기록은 미래의 나와 팀 동료, 그리고 다음 AI 세션이 읽을 문맥이 됩니다.

### 3. branch는 복사본이 아니라 commit을 가리키는 이름이다

입문자는 branch를 프로젝트 폴더의 복사본처럼 상상할 수 있습니다. 하지만 Git에서 branch는 특정 commit을 가리키는 pointer에 가깝습니다. 새 branch를 만들면 현재 HEAD나 지정한 start point를 가리키는 새 branch head가 생깁니다. 그 branch로 switch하면 working tree와 index가 해당 branch 상태에 맞게 업데이트되고, 이후 commit은 그 branch tip에 붙습니다.

이 구조 덕분에 기능 개발을 main 흐름과 분리할 수 있습니다. 예를 들어 `feature/search-ui` branch에서는 검색 UI를 고치고, `fix/build-error` branch에서는 빌드 오류를 고칠 수 있습니다. 작업이 끝나면 merge나 pull request로 변경을 합칩니다. branch를 잘 쓰면 실험이 실패해도 main 흐름을 덜 흔듭니다.

### 4. merge는 분기 이후 변경을 현재 branch에 합친다

merge는 다른 branch의 변경을 현재 branch로 가져오는 동작입니다. 두 branch가 서로 다른 파일이나 다른 위치를 바꿨다면 Git이 자동으로 합칠 수 있습니다. 하지만 같은 영역을 양쪽에서 바꿨다면 Git은 임의로 한쪽을 고르지 않고 conflict를 표시합니다. 이때 사람이 어느 변경을 남길지 결정해야 합니다.

conflict는 Git이 실패했다는 뜻이 아닙니다. 오히려 Git이 안전하게 멈춘 것입니다. 같은 영역을 두 사람이 다르게 바꿨다면 자동 선택은 위험합니다. AI가 만든 변경과 사용자의 변경이 겹칠 때도 마찬가지입니다. conflict marker를 읽고, 양쪽 의도를 이해하고, 최종 파일을 직접 정리한 뒤 stage하고 commit해야 합니다.

### 5. log, diff, show는 이력을 읽는 눈이다

Git을 안전하게 쓰려면 기록을 만드는 명령만큼 읽는 명령도 중요합니다. `git status`는 현재 상태를 보고, `git diff`는 아직 commit되지 않은 변경이나 두 지점의 차이를 봅니다. `git log`는 commit graph의 이력을 보여주고, `git show`는 특정 commit이나 객체의 내용을 자세히 보여줍니다. AI가 바꾼 코드도 결국 diff로 검토해야 합니다.

읽는 명령을 익히면 되돌리기도 덜 무섭습니다. 어떤 commit이 문제인지 log로 찾고, 어떤 파일이 바뀌었는지 show로 확인하고, 아직 commit 전이면 restore로 되돌릴 수 있습니다. 이미 공유된 commit이라면 revert처럼 이력을 보존하는 방식이 더 안전할 수 있습니다. reset은 강력하지만 branch pointer와 index, working tree를 바꾸므로 공유 전후의 경계를 이해해야 합니다.

### 6. Pull Request는 Git 변경을 팀 검토로 바꾸는 장치다

Git 자체는 로컬 기록을 잘 관리하지만, 팀 협업에서는 변경을 제안하고 토론하고 승인하는 공간이 필요합니다. GitHub Pull Request는 변경을 propose, review, merge하는 흐름을 제공합니다. Files changed 탭은 diff를 보여주고, review는 comment, approve, request changes 같은 상태로 품질 게이트를 만듭니다.

AI가 참여하는 프로젝트에서도 PR 사고방식은 유용합니다. 혼자 일하더라도 변경을 작게 만들고, diff를 읽고, 왜 바꿨는지 기록하고, verify 결과를 남기는 방식은 사실 개인용 PR 루틴입니다. 이 프로젝트가 단계별 commit과 release note를 요구하는 이유도 같은 맥락입니다.

```bash
git status
git diff
git add src/content/lessons/markdown/web-screen-anatomy.md
git commit -m "P-V1: regenerate web screen anatomy lesson"
git log --oneline -5
```

이 명령 묶음은 AI가 만든 변경을 기록으로 바꾸는 가장 작은 흐름입니다. 먼저 상태를 보고, diff로 내용을 읽고, 필요한 파일만 stage하고, 의도가 담긴 메시지로 commit하고, 최근 이력을 확인합니다. 실무에서는 여기에 branch 생성, test 실행, PR 생성, review 반영이 더해집니다.

## 스펙과 세부

### working tree, index, HEAD

working tree는 실제 파일이 있는 작업 공간입니다. index는 다음 commit에 들어갈 후보를 모아 둔 staging area입니다. HEAD는 현재 branch의 마지막 commit을 가리킵니다. `git status`는 이 세 영역 사이의 차이를 보여줍니다. 이 구조를 모르면 왜 add를 했는데도 파일이 남아 있는지, 왜 commit했는데 일부 변경이 빠졌는지 이해하기 어렵습니다.

### commit은 snapshot과 메시지를 함께 가진다

Git은 변경을 commit 단위로 기록합니다. commit에는 index의 내용과 log message, 부모 commit 정보가 연결됩니다. 그래서 commit message는 나중에 이력을 읽는 사람에게 매우 중요합니다. AI가 만든 변경을 한꺼번에 큰 commit으로 묶으면 어떤 의도의 변경인지 추적하기 어렵습니다.

### branch 이름은 흐름의 이름이다

branch는 commit pointer지만 사람에게는 작업 흐름의 이름이기도 합니다. `feature/search`, `fix/build`, `content/v2-lessons`처럼 이름을 정하면 현재 무슨 일을 하는지 알 수 있습니다. AI와 일할 때도 branch 이름이 명확하면 로그와 PR에서 맥락을 잃지 않습니다.

### merge conflict는 사람이 해결해야 하는 설계 질문이다

conflict가 나면 Git은 양쪽 변경을 파일에 표시합니다. 이 표시는 "어느 쪽이 맞다"를 말하지 않습니다. 사람이 제품 요구사항과 코드 의도를 보고 최종 내용을 정해야 합니다. AI에게 conflict 해결을 도와달라고 할 수는 있지만, 최종 선택은 사람이 diff를 읽고 확인해야 합니다.

### 공유된 이력과 로컬 이력은 다르게 다룬다

아직 혼자 가진 local commit은 reset, rebase, amend로 정리할 수 있습니다. 하지만 이미 원격에 push되어 다른 사람이 기반으로 삼은 이력은 조심해야 합니다. 공유 후에는 revert처럼 새 commit으로 취소하는 방식이 더 안전한 경우가 많습니다. 이 경계를 모르면 협업자의 이력을 깨뜨릴 수 있습니다.

## 원문으로 읽기

> "This command creates an empty Git repository - basically a .git directory with subdirectories for objects, refs/heads, refs/tags, and template files. [...]"
>
> — 이 명령은 빈 Git 저장소를 만든다.
> [git-init](https://git-scm.com/docs/git-init)

Git은 추상적인 저장 버튼이 아니라 저장소 구조에서 시작합니다. `.git` 디렉터리가 생기고 Git이 objects와 refs를 관리할 준비를 합니다. 초보자는 이 시작점을 이해하면 "왜 이 폴더는 Git이 추적하고, 저 폴더는 추적하지 않는가"를 설명할 수 있습니다.

> "Create a new commit containing the current contents of the index and the given log message describing the changes."
>
> — index의 현재 내용을 담은 새 commit을 만든다.
> [git-commit](https://git-scm.com/docs/git-commit)

이 인용은 `add`와 `commit`의 관계를 정확히 보여줍니다. commit은 working tree 전체를 자동으로 기록하지 않습니다. index에 들어간 내용만 기록합니다. 따라서 AI가 만든 변경을 모두 무심코 stage하기보다, diff를 읽고 필요한 부분만 index에 올리는 습관이 중요합니다.

> "git-branch - List, create, or delete branches"
>
> — branch를 나열, 생성, 삭제한다.
> [git-branch](https://git-scm.com/docs/git-branch)

branch는 협업의 기본 단위입니다. 기능, 버그 수정, 실험을 branch로 나누면 main 흐름을 보호하면서 작업할 수 있습니다. 중요한 것은 branch가 파일 복사본이 아니라 commit graph의 pointer라는 점입니다. 이 사실을 알면 switch와 merge가 덜 신비롭게 느껴집니다.

관련 원문(링크): [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)

PR은 Git 변경을 팀의 품질 게이트로 바꿉니다. AI가 만든 코드도 PR 사고방식으로 보면 초안, diff, 검토, 수정, 승인, 병합의 흐름을 갖습니다. 혼자 작업하더라도 이 흐름을 따르면 변경을 설명하고 되돌리기 쉬워집니다.

## 실전에서

### 패턴 1: AI 작업 전후로 status를 본다

AI에게 파일 변경을 맡기기 전 `git status`를 보고 이미 존재하는 변경을 확인합니다. 작업 후에도 다시 status를 봅니다. 이렇게 하면 AI가 건드린 파일과 기존 변경을 구분할 수 있습니다. 같은 파일에 사용자의 변경이 있으면 되돌리지 말고 함께 읽어야 합니다.

### 패턴 2: 큰 AI 변경은 hunk 단위로 stage한다

AI가 여러 기능을 한 번에 바꿨다면 `git add -p`나 diff 검토로 commit을 나눕니다. 예를 들어 UI copy 수정, 타입 오류 수정, 테스트 업데이트가 한꺼번에 생겼다면 의도별로 commit을 나누는 편이 좋습니다. 나중에 문제가 생겼을 때 어느 변경을 되돌릴지 찾기 쉽습니다.

### 패턴 3: commit message는 작업 로그의 첫 줄이다

커밋 메시지는 단순 형식이 아닙니다. `P-V1: regenerate legacy lessons`처럼 단계와 요약을 담으면 운영 문서, release note, QA report와 연결됩니다. 팀 프로젝트에서는 issue 번호나 PR 목적을 함께 담을 수도 있습니다. AI가 생성한 변경일수록 사람이 어떤 판단으로 기록했는지 메시지가 중요합니다.

> [!TIP]
> AI에게 Git 도움을 받을 때는 "현재 status와 diff를 읽고, 어떤 변경을 어떤 commit으로 나누면 좋은지 제안해줘"라고 요청하면 좋습니다. 단, 실제 stage와 commit은 반드시 diff 확인 뒤 진행합니다.

## 한계와 트레이드오프

Git은 강력하지만 처음에는 복잡합니다. 특히 reset, rebase, cherry-pick, stash처럼 이력을 바꾸거나 임시로 옮기는 명령은 편리한 만큼 실수 비용도 큽니다. 입문 단계에서는 먼저 status, diff, add, commit, log, branch, switch, merge를 안정적으로 익히고, 복구 명령은 상황별로 천천히 배우는 편이 좋습니다.

또한 Git은 코드 품질을 자동으로 보장하지 않습니다. 잘못된 코드를 commit할 수도 있고, 의미 없는 메시지를 남길 수도 있으며, 큰 변경을 한 commit에 넣을 수도 있습니다. Git은 기록의 도구이지 판단의 대체물이 아닙니다. 테스트, 리뷰, CI, human review가 함께 있어야 품질 흐름이 완성됩니다.

AI와 함께 쓸 때의 trade-off도 있습니다. AI는 conflict 해결이나 commit message 제안을 도와줄 수 있지만, 어떤 변경이 제품 요구사항에 맞는지는 사람이 판단해야 합니다. 특히 destructive command나 history rewrite는 AI가 제안해도 현재 branch, remote 상태, 팀 정책을 확인한 뒤 사용해야 합니다.

## 더 읽기

- [git-init](https://git-scm.com/docs/git-init): 저장소가 어떻게 시작되는지 확인합니다.
- [git-add](https://git-scm.com/docs/git-add): working tree에서 index로 변경을 올리는 방식을 봅니다.
- [git-commit](https://git-scm.com/docs/git-commit): commit이 index 내용을 기록한다는 점을 읽습니다.
- [git-status](https://git-scm.com/docs/git-status): working tree, index, HEAD 사이의 차이를 읽는 법을 익힙니다.
- [git-branch](https://git-scm.com/docs/git-branch), [git-switch](https://git-scm.com/docs/git-switch), [git-merge](https://git-scm.com/docs/git-merge): branch 생성, 전환, 병합의 흐름을 확인합니다.
- [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests): 로컬 Git 기록이 팀 review와 merge로 이어지는 방식을 봅니다.

다음에는 `git init/add/commit/status` 레퍼런스를 먼저 읽고, branch/switch/merge, log/diff/show, restore/reset/revert 순서로 이어가면 좋습니다. Git은 한 번에 다 외우는 도구가 아니라, 현재 변경을 읽는 눈에서 시작해 협업 흐름으로 넓어지는 도구입니다.
