## 한 줄 정의

Git 복구 플레이북은 "망쳤다" 싶은 순간 — 파일을 잘못 고쳤거나, 커밋을 잘못했거나, 브랜치가 사라진 것 같을 때 — 상황별로 어떤 명령으로 되돌리는지를 정리한 레퍼런스입니다. 핵심 도구는 넷입니다: 작업 파일을 되돌리는 restore("git-restore - Restore working tree files"), 이력을 보존하며 되돌리는 revert, 참조 이동 기록을 보여주는 reflog, 그리고 미추적 파일을 지우는 clean. ==복구의 첫 원칙은 명령을 외우는 것이 아니라, "무엇을 잃었는가"를 먼저 분류하는 것==입니다 — 작업 파일인가, 커밋인가, 브랜치 포인터인가에 따라 쓰는 도구가 다릅니다.

이 플레이북은 git-restore-reset-revert와 git-log-diff-show에서 배운 명령들을 사고 대응 절차로 재배열합니다. 읽는 순서가 아니라 찾는 순서로 쓰는 문서입니다.

![Git 복구 플레이북: 잃은 것의 종류(작업 파일/커밋/브랜치 포인터/미추적 파일)에 따라 restore·revert·reflog·clean으로 분기하는 지도](/lesson-diagrams/git-recovery-playbook/recovery-map.svg)

## 왜 존재하는가

Git 사고는 침착함을 시험합니다. 사고 순간에는 "다 날아갔다"는 공포가 앞서고, 검색해서 나온 명령을 이해 없이 실행하다 2차 사고를 냅니다. 특히 AI에게 "되돌려줘"라고 하면 AI가 reset --hard 같은 파괴적 명령을 제안할 수 있는데, 상황 분류 없이 실행하면 살릴 수 있던 것까지 잃습니다.

플레이북이 존재하는 이유는 사고 대응을 감이 아니라 분기표로 만들기 위해서입니다. Git의 복구 도구들은 각자 대상이 다릅니다. restore는 작업 트리의 파일을, revert는 공유된 커밋을, reflog는 사라진 것처럼 보이는 참조를, clean은 미추적 파일을 다룹니다. ==잃은 것의 종류를 먼저 분류하면, 쓸 명령이 거의 자동으로 정해집니다==.

또 하나의 이유는 안전장치의 존재를 미리 아는 것입니다. reflog는 "Reference logs, or \"reflogs\", record when the tips of branches and other references were updated" — 브랜치 끝이 어디로 움직였는지의 기록입니다. 이 기록 덕분에 "사라진" 커밋 대부분은 실제로는 참조만 잃은 상태이고, 되찾을 수 있습니다. 이 사실을 사고 전에 알면 공포가 절반으로 줄어듭니다.

## 작동 원리

### 분기 1 — 작업 파일을 잘못 고쳤다: restore

아직 커밋하지 않은 수정을 되돌리려면 restore입니다. 공식 정의는 간단합니다: "git-restore - Restore working tree files". `git restore <file>`은 작업 트리의 파일을 마지막 커밋 상태로 되돌립니다. 주의: 이 명령은 저장하지 않은 수정을 버립니다 — 되돌리기 전에 그 수정이 정말 필요 없는지 확인합니다.

### 분기 2 — 공유된 커밋을 무르고 싶다: revert

이미 push된 커밋을 없애고 싶을 때, 이력을 지우는 것이 아니라 반대 커밋을 새로 만드는 것이 revert입니다. 공식 문서는 revert의 동작을 "record some new commits that record them"이라고 설명합니다 — 기존 커밋을 삭제하지 않고, 그 변경을 되돌리는 새 커밋을 기록합니다. 공유 브랜치에서는 이력 재작성(reset) 대신 revert가 안전한 선택입니다.

### 분기 3 — 커밋/브랜치가 사라진 것 같다: reflog

브랜치를 잘못 옮겼거나 reset을 과하게 했을 때, 커밋이 "사라진" 것처럼 보입니다. 하지만 reflog가 있습니다: "Reference logs, or \"reflogs\", record when the tips of branches and other references were updated". `git reflog`로 브랜치 끝이 지나온 위치들을 확인하고, 되찾을 커밋의 해시를 얻어 브랜치를 다시 세웁니다. reflog는 로컬 안전망입니다 — 대부분의 "잃어버린" 커밋은 여기서 발견됩니다.

### 분기 4 — 미추적 파일을 정리하고 싶다: clean (dry-run 먼저)

빌드 산출물이나 실험 파일 같은 미추적 파일을 지우는 명령이 clean입니다: "Remove untracked files from the working tree". clean의 대상은 추적되지 않는 파일이므로, 커밋된 파일은 건드리지 않습니다. 그러나 미추적 파일은 Git이 복구해 줄 수 없으므로, 반드시 dry-run을 먼저 합니다 — `-n` 옵션은 "Don’t actually remove anything, just show what would be done." 지울 목록을 눈으로 확인한 뒤에만 실제로 지웁니다.

## 스펙과 세부

### reset은 모드 선택이 핵심이다

reset은 강력하지만 모드에 따라 파괴 범위가 다릅니다. --soft는 커밋만 무르고 수정은 스테이지에 남기며, --mixed(기본)는 스테이지도 풀고, --hard는 작업 트리까지 덮어씁니다. 공식 문서는 작업 내용을 보존하며 최근 커밋을 제거하는 용도로 --keep을 설명합니다: "`git` `reset` `--keep` is meant to be used when removing some of the last commits". 로컬 수정을 살리며 커밋을 무를 때는 --hard 대신 --keep을 검토합니다.

### 복구 전 스냅샷 습관

파괴적일 수 있는 복구(reset --hard, clean)를 하기 전, 현재 상태를 임시로 보존하는 습관이 2차 사고를 막습니다 — 브랜치를 하나 따두거나(`git branch backup-now`), stash에 넣어둡니다. 복구가 잘못돼도 돌아올 지점이 생깁니다.

### AI에게 복구를 시킬 때

AI에게 "되돌려줘"라고 하기 전에, 이 플레이북의 분류를 먼저 적용해 "무엇을 잃었는지"를 말해줍니다 — "커밋 전 수정을 버리고 싶다" vs "push된 커밋을 무르고 싶다"는 전혀 다른 명령으로 이어집니다. AI가 reset --hard나 clean 같은 파괴적 명령을 제안하면, dry-run·백업 브랜치 같은 안전장치를 먼저 요구합니다.

## 원문으로 읽기

> "git-restore - Restore working tree files"
>
> — git-restore: 작업 트리 파일을 복원한다.
> [git-restore — Git Documentation](https://git-scm.com/docs/git-restore)

파일 복구의 담당 명령입니다. 커밋 전 수정을 되돌리는 분기 1의 도구입니다.

> "record some new commits that record them"
>
> — 그것들을 기록하는 새로운 커밋을 기록한다.
> [git-revert — Git Documentation](https://git-scm.com/docs/git-revert)

revert가 이력 삭제가 아니라 새 커밋 생성임을 보여줍니다. 공유 브랜치에서 안전한 이유입니다.

> "Reference logs, or \"
>
> — 참조 로그(reflog)는 브랜치와 다른 참조의 끝이 언제 갱신되었는지 기록한다.
> [git-reflog — Git Documentation](https://git-scm.com/docs/git-reflog)

"사라진" 커밋의 구조대입니다. 브랜치 끝의 이동 기록에서 잃어버린 위치를 되찾습니다.

관련 원문(링크): [git-clean — Git Documentation](https://git-scm.com/docs/git-clean)

clean의 대상이 미추적 파일임을 명시합니다. 커밋된 파일은 건드리지 않지만, 지워진 미추적 파일은 Git이 복구하지 못합니다.

관련 원문(링크): [git-clean — Git Documentation](https://git-scm.com/docs/git-clean)

dry-run의 정의입니다. clean 전에 반드시 이 옵션으로 목록을 확인합니다.

## 실전에서

### 상황을 한 문장으로 분류한다

사고가 나면 명령 검색 전에 "나는 [작업 파일/커밋/브랜치 포인터/미추적 파일]을 잃었다"를 한 문장으로 씁니다. 이 분류가 분기표의 입구입니다.

### reflog를 첫 확인 창구로

"커밋이 사라졌다" 계열은 무조건 `git reflog`부터 봅니다. 대부분 참조만 움직인 상태이고, 해시는 살아 있습니다.

### 파괴적 명령엔 안전장치 2종

reset --hard와 clean 전에는 (1) dry-run 또는 상태 확인, (2) 백업 브랜치/stash를 습관화합니다. 복구하려다 더 잃는 2차 사고를 막습니다.

### 공유 브랜치는 revert로

push된 커밋은 reset이 아니라 revert로 무릅니다 — 팀원의 이력과 충돌하지 않는 유일한 안전 경로입니다.

## 한계와 트레이드오프

첫 번째 한계는 reflog의 범위입니다. reflog는 로컬 기록입니다 — 다른 사람의 로컬이나 원격의 이동까지 보여주지 않으며, 기본 보존 기간이 지나면 만료될 수 있습니다. "언젠가 복구하지"가 아니라 사고 직후에 확인해야 합니다.

두 번째 한계는 미추적 파일의 비가역성입니다. clean으로 지운 미추적 파일은 Git 어디에도 없습니다. dry-run이 유일한 방어선이므로, 이 단계는 생략할 수 없는 절차로 못박아야 합니다.

세 번째 trade-off는 revert의 흔적입니다. revert는 안전하지만 "되돌린 커밋"이 이력에 남습니다. 이력의 깔끔함보다 협업 안전을 우선한 선택이며, 로컬 미공유 커밋이라면 reset 계열이 더 깔끔할 수 있습니다 — 공유 여부가 분기 기준입니다.

네 번째 한계는 플레이북의 단순화입니다. 실제 사고는 분기 여러 개가 겹칠 수 있습니다(예: reset --hard 후 미추적 파일까지 섞임). 그럴수록 원칙은 같습니다 — 서두르지 말고, 잃은 것을 분류하고, 파괴적 명령 전에 스냅샷을 남깁니다.

## 더 읽기

이 강의의 근거 KB는 `git-recovery-playbook`입니다. 각 분기의 원문은 git-scm.com 공식 문서입니다: git-restore(작업 파일), git-revert(공유 커밋), git-reflog(참조 기록), git-clean(미추적 파일, dry-run), git-reset(모드 선택·--keep). 이 다섯 문서가 이 강의 인용의 원문입니다.

선행 강의로 `git-restore-reset-revert`(세 명령의 개념)와 `git-log-diff-show`(상태 확인)를 읽으면 각 분기의 배경이 채워집니다. 함께 읽으면 좋은 강의는 `incident-style-ai-debugging`으로, "복구 우선, 원인 분석은 그 다음"이라는 같은 원칙을 배포 사고에 적용합니다. 다음 학습은 `npm-debugging-playbook` — 같은 플레이북 형식으로 npm 설치·빌드 오류를 다룹니다.
