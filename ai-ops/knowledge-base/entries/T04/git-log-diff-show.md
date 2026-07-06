---
id: git-log-diff-show
title: "git log / diff / show — 이력을 읽는 3개 명령"
topicGroup: T04
status: approved
score: 92
level: 기초
prerequisites: [git-init-add-commit-status]
successors: [git-restore-reset-revert]
related: [git-branch-switch-merge, debugging-error-reading]
sources:
  - { title: "git-log — Git Documentation", url: "https://git-scm.com/docs/git-log", checked: 2026-07-06 }
  - { title: "git-diff — Git Documentation", url: "https://git-scm.com/docs/git-diff", checked: 2026-07-06 }
  - { title: "git-show — Git Documentation", url: "https://git-scm.com/docs/git-show", checked: 2026-07-06 }
consumers:
  lessons: [git-log-diff-show]
  glossary: ["Diff", "Reachability", "Git Object"]
updated: 2026-07-06
---

## 정의
git log·diff·show는 기록을 바꾸지 않고 **읽기만 하는** 조회 명령이다. 공식 요약: log = "Show commit logs", diff = "Show changes between commits, commit and working tree, etc", show = "Show various types of objects". (출처: git-scm.com/docs/git-log·git-diff·git-show, 확인: 2026-07-06)
log는 "무엇이 있었나"(이력), diff는 "무엇이 다른가"(비교), show는 "이것이 무엇인가"(단일 객체)를 담당한다.

## 역사
log 문서의 정의는 커밋 그래프 순회로 서술된다 — "parent 링크를 따라 도달 가능한 커밋을 나열"하고 `^` 접두 커밋에서 도달 가능한 것은 제외한다. 이는 log가 단순 목록이 아니라 그래프 질의 도구로 설계됐음을 보여준다. show 문서는 blob·tree·tag·commit이라는 Git의 4대 객체 타입을 전제로 하며, 조회 명령이 객체 모델 위에 서 있음을 드러낸다. (출처: git-log·git-show, 확인: 2026-07-06)

## 해결하려는 문제
- 이력 추적: 어떤 변경이 언제 어떤 순서로 쌓였는지 — log는 기본적으로 역시간순으로 출력한다. (출처: git-log, 확인: 2026-07-06)
- 상태 간 비교: diff는 워킹 트리↔인덱스, 인덱스↔트리, 트리↔트리, 병합 결과, 두 blob, 디스크의 두 파일까지 비교한다. (출처: git-diff, 확인: 2026-07-06)
- 특정 커밋의 내용 확인: show는 커밋에 대해 로그 메시지와 텍스트 diff를 함께 보여준다. (출처: git-show, 확인: 2026-07-06)

## 핵심 개념
1. **도달 가능성(reachability)**: log의 나열 기준은 "parent 링크로 도달 가능한 커밋"이다. 브랜치 이름을 주면 그 끝에서 거슬러 올라간다. (출처: git-log, 확인: 2026-07-06)
2. **제외 문법**: `^커밋`으로 "그쪽에서 도달 가능한 것은 빼라"를 표현한다 — 두 브랜치의 차이 조회의 기초. (출처: git-log, 확인: 2026-07-06)
3. **diff의 비교쌍 선택**: 인자 없는 diff는 워킹 트리↔인덱스, 커밋 하나를 주면 그 트리와 비교, 커밋 둘이면 트리↔트리 — "무엇과 무엇을 비교 중인지"가 항상 첫 질문이다. (출처: git-diff, 확인: 2026-07-06)
4. **show의 대상**: blob(파일 내용), tree(디렉터리), tag, commit — 커밋이면 메시지+diff, 병합 커밋은 `git diff-tree --cc` 형식의 특수 표현. (출처: git-show, 확인: 2026-07-06)
5. **읽기 전용**: 세 명령 모두 이력·인덱스·워킹 트리를 변경하지 않는다 — 안심하고 실험할 수 있는 조회 계층이다. (근거: 각 문서의 NAME/DESCRIPTION이 표시·나열만 기술, 확인: 2026-07-06)

## 관련 기술
- status vs diff: status는 "어느 파일이 다른가"의 목록, diff는 "어떻게 다른가"의 내용. (출처: git-status·git-diff, 확인: 2026-07-06)
- log vs show: log는 여러 커밋의 나열, show는 한 객체의 상세. 커밋 해시 하나를 파고들 땐 show가 맞다. (출처: git-log·git-show, 확인: 2026-07-06)
- `git show --stat`: 이 프로젝트의 P-08 커밋 확인 절차가 이 명령을 사용한다 — 커밋에 포함된 파일 목록 검증.

## 선행 개념
- git-init-add-commit-status: 커밋·인덱스·워킹 트리 3영역이 조회의 대상이다.

## 후행 개념
- git-restore-reset-revert: 조회로 문제 커밋을 특정한 뒤에야 복구 명령을 정확히 쓸 수 있다.

## AI 시대에서의 의미
AI가 만든 변경의 검토는 결국 diff 읽기다: 커밋 전엔 `git diff`(워킹 트리↔인덱스)로, 커밋 후엔 `git show`로 확인한다. AI의 작업 보고를 그대로 믿지 않고 log/show로 실측 대조하는 습관 — 이 프로젝트 운영에서 반복 실증된 원칙("Executor 보고는 git log로 대조") — 이 이 세 명령 위에 서 있다. (근거: git-diff의 비교쌍·git-show의 커밋 표시, 확인: 2026-07-06)

## 실무 활용
1. AI 변경 검토: 커밋 전 `git diff` → 수용 판단 → 커밋 후 `git show --stat HEAD`로 포함 파일 확인.
2. 브랜치 차이 조회: `git log main..feature` 류의 도달 가능성 질의로 "feature에만 있는 커밋"을 나열. (출처: git-log의 ^ 제외 문법, 확인: 2026-07-06)
3. 과거 커밋 파고들기: `git show <해시>`로 그 커밋의 메시지와 변경 내용을 한 번에 읽는다. (출처: git-show, 확인: 2026-07-06)

## FAQ
Q: log의 출력 순서는?
A: 기본값은 역시간순(최신이 먼저)이다. (출처: git-log, 확인: 2026-07-06)
Q: diff에 아무 인자도 안 주면 무엇을 비교하는가?
A: 워킹 트리와 인덱스의 차이 — 즉 add하지 않은 변경이다. (출처: git-diff, 확인: 2026-07-06)
Q: show는 커밋 전용인가?
A: 아니다. blob, tree, tag, commit 모두 보여준다. 커밋일 때 메시지+diff 형식이 되는 것뿐이다. (출처: git-show, 확인: 2026-07-06)
Q: 이 명령들이 실수로 이력을 바꿀 수 있는가?
A: 없다. 세 명령은 표시·나열 전용이며, 변경은 별도 명령(restore/reset/revert 등)의 몫이다. (근거: 각 문서 DESCRIPTION, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: diff가 "모든 변경"을 보여준다고 착각 — 스테이징된 변경이 안 보여 당황. 왜 생기나: 기본 비교쌍(워킹 트리↔인덱스)을 모름. 교정: 비교쌍을 의식하고 필요 시 대상 지정. (출처: git-diff, 확인: 2026-07-06)
2. 실수: log에서 원하는 브랜치 커밋이 안 보임. 왜 생기나: 도달 가능성 기준을 모르고 현재 HEAD에서만 조회. 교정: 브랜치 이름을 인자로 지정한다. (출처: git-log, 확인: 2026-07-06)
3. 실수: 커밋 내용 확인에 log만 반복. 왜 생기나: show를 모름. 교정: 단일 커밋 상세는 show가 메시지+diff를 한 번에 준다. (출처: git-show, 확인: 2026-07-06)
4. 실수: 병합 커밋의 diff가 이상하다고 느낌. 왜 생기나: 병합 커밋은 특수 형식(--cc)으로 표현됨을 모름. 교정: 병합 커밋 표시는 일반 diff와 다른 형식임을 인지. (출처: git-show, 확인: 2026-07-06)

## 공식 출처
- 커밋 나열·도달 가능성·역시간순 — [git-log](https://git-scm.com/docs/git-log) (확인: 2026-07-06)
- 비교 대상 6종 — [git-diff](https://git-scm.com/docs/git-diff) (확인: 2026-07-06)
- 객체 4종 표시·커밋의 메시지+diff — [git-show](https://git-scm.com/docs/git-show) (확인: 2026-07-06)

## Quote Bank
- > "git-log - Show commit logs"
  - 출처: [git-log](https://git-scm.com/docs/git-log) (확인: 2026-07-06)
  - 맥락: 명령의 공식 한 줄 요약
- > "List commits that are reachable by following the parent links from the given commit(s), but exclude commits that are reachable from the one(s) given with a ^ in front of them."
  - 출처: [git-log](https://git-scm.com/docs/git-log) (확인: 2026-07-06)
  - 맥락: log = 그래프 도달 가능성 질의라는 원문 근거
- > "The output is given in reverse chronological order by default."
  - 출처: [git-log](https://git-scm.com/docs/git-log) (확인: 2026-07-06)
  - 맥락: 기본 출력 순서
- > "Show changes between the working tree and the index or a tree, changes between the index and a tree, changes between two trees, changes resulting from a merge, changes between two blob objects, or changes between two files on disk."
  - 출처: [git-diff](https://git-scm.com/docs/git-diff) (확인: 2026-07-06)
  - 맥락: diff가 다루는 비교쌍의 전체 목록
- > "Shows one or more objects (blobs, trees, tags and commits)."
  - 출처: [git-show](https://git-scm.com/docs/git-show) (확인: 2026-07-06)
  - 맥락: show의 대상 = Git 객체 모델
- > "For commits it shows the log message and textual diff."
  - 출처: [git-show](https://git-scm.com/docs/git-show) (확인: 2026-07-06)
  - 맥락: 커밋 상세 확인 시 show를 쓰는 이유

## 변경 이력
- 2026-07-06: 최초 작성 (Fable — Codex 토큰 소진으로 운영자 승인 하 대행, P-01)
