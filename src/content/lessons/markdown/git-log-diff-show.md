## 한 줄 정의

git log·diff·show는 이력을 **바꾸지 않고 읽기만 하는** 세 개의 조회 명령입니다 — log는 "무엇이 있었나"(커밋 나열), diff는 "무엇이 다른가"(두 상태의 비교), show는 "이것이 무엇인가"(한 객체의 상세)를 담당합니다.

공식 요약은 각각: log는 "Show commit logs", diff는 "Show changes between commits, commit and working tree, etc", show는 "Show various types of objects". 세 명령의 공통점이 이 강의의 첫 번째 교훈입니다: ==전부 읽기 전용이므로, 몇 번을 실행해도 아무것도 망가지지 않습니다==. Git이 무섭게 느껴질 때 가장 먼저 친해져야 할 명령들이 바로 이 조회 계층입니다.

> [!KEY]
> 복구 명령(restore/reset/revert)을 배우기 전에 조회 명령부터 배우는 데는 이유가 있습니다 — 무엇이 잘못됐는지 정확히 읽을 수 있어야, 어디까지 되돌릴지 정확히 결정할 수 있기 때문입니다.

![log/diff/show의 조회 범위](/lesson-diagrams/git-log-diff-show/log-diff-show-scopes.svg)

## 왜 존재하는가

커밋이 쌓이기 시작하면 세 가지 질문이 반복적으로 생깁니다.

첫째, "이 프로젝트에 무슨 일이 있었지?" — 지난주에 누가(혹은 어떤 AI 세션이) 무엇을 바꿨는지 이력이 필요합니다. 둘째, "지금 내 작업은 마지막 기록과 뭐가 다르지?" — 커밋하기 전에 변경 내용을 눈으로 확인해야 합니다. 셋째, "그 커밋의 정체가 뭐지?" — log에서 수상한 커밋을 발견했을 때 그 안을 열어봐야 합니다.

log·diff·show는 이 세 질문에 각각 대응합니다. 특히 diff가 답하는 "다름"의 범위는 놀랍도록 넓습니다 — 워킹 트리와 인덱스, 인덱스와 트리, 두 트리 사이, 병합 결과, 두 blob 객체, 심지어 디스크 위의 임의의 두 파일까지. Git의 조회 계층은 "비교할 수 있는 모든 것"을 비교하도록 설계되어 있습니다.

## 작동 원리

### log = 그래프 도달 가능성 질의

log는 단순한 목록 출력기가 아닙니다. 공식 정의에 따르면 log가 나열하는 것은 "주어진 커밋에서 **parent 링크를 따라 도달 가능한** 커밋들"이며, `^`를 앞에 붙인 커밋에서 도달 가능한 것들은 제외됩니다. 1강에서 본 커밋의 부모-자식 연결이 여기서 질의의 인프라가 됩니다.

이 정의가 실전에서 의미하는 것: `git log feature`는 feature 끝에서 거슬러 올라가며 나열하고, `git log main..feature`(= `feature ^main`)는 "feature에는 있지만 main에는 없는 커밋"을 골라냅니다. 브랜치 간 차이 조회가 별도 기능이 아니라 도달 가능성 산수라는 것 — 이것이 log의 진짜 모습입니다. 출력은 기본적으로 역시간순(최신이 먼저)입니다.

### diff = 비교쌍의 선택

diff를 쓸 때 유일하게 중요한 질문은 "**지금 무엇과 무엇을 비교하고 있는가**"입니다. 인자에 따라 비교쌍이 달라집니다:

- 인자 없음 → 워킹 트리 ↔ 인덱스 (아직 add하지 않은 변경)
- 커밋 하나 → 그 커밋의 트리 ↔ 워킹 트리
- 커밋 둘 → 트리 ↔ 트리 (두 시점의 차이)

"스테이징한 변경이 diff에 안 보여요"는 버그가 아니라 기본 비교쌍(워킹 트리↔인덱스)의 정의 그대로입니다 — 이미 인덱스에 올라간 것은 그 비교에서 차이가 아니게 됩니다.

### show = 객체 모델의 창

show의 대상은 커밋만이 아닙니다. Git 저장소의 내용물은 네 종류의 객체 — blob(파일 내용), tree(디렉터리), tag, commit — 로 저장되며, show는 이들 모두를 보여줍니다. 대상이 커밋이면 로그 메시지와 텍스트 diff를 함께 출력하고, 병합 커밋이면 `git diff-tree --cc`가 만드는 특수 형식으로 표현합니다. ==show 한 번 = 그 커밋의 "왜"(메시지)와 "무엇"(diff)을 동시에== 읽는 것입니다.

> [!EXAMPLE]
> log에서 `a3cf62b`라는 커밋이 수상해 보인다면: `git show a3cf62b` 한 번으로 그 커밋의 메시지, 작성자, 시각, 그리고 바뀐 내용 전체를 확인할 수 있습니다. log로 찾고 show로 파고드는 것이 이력 수사의 기본 동선입니다.

## 스펙과 세부

명령어 인덱스: [git log](#git-log) · [git diff](#git-diff) · [git show](#git-show)

### `git log`

**문법**: `git log [옵션] [커밋 범위] [-- 경로]`

| 자주 쓰는 형태 | 의미 |
|---|---|
| `git log --oneline` | 커밋당 한 줄 요약 |
| `git log -5` | 최근 5개만 |
| `git log main..feature` | feature에만 있는 커밋 (도달 가능성 차집합) |
| `git log -- src/app.ts` | 특정 파일을 건드린 커밋만 |

**사용 예시**:

```bash
git log --oneline -8
# a3cf62b P-08: release react state and effects lesson
# 74ec328 P-06: verify react state and effects lesson
# ...
```

**주의**: 원하는 브랜치의 커밋이 안 보이면, 현재 HEAD에서 도달할 수 없는 것입니다 — 브랜치 이름을 인자로 지정하세요.

### `git diff`

**문법**: `git diff [커밋] [커밋] [-- 경로]`

| 형태 | 비교쌍 |
|---|---|
| `git diff` | 워킹 트리 ↔ 인덱스 |
| `git diff <커밋>` | 워킹 트리 ↔ 그 커밋의 트리 |
| `git diff <커밋A> <커밋B>` | 두 커밋의 트리 비교 |

**사용 예시**:

```bash
git diff                      # 아직 add하지 않은 변경
git diff HEAD                 # 마지막 커밋 이후의 모든 변경
git diff main feature-search  # 두 브랜치 끝의 차이
```

**주의**: 출력에서 `-` 줄은 첫 번째 대상, `+` 줄은 두 번째 대상의 내용입니다. 인자 순서를 바꾸면 +/-가 뒤집힙니다.

### `git show`

**문법**: `git show [객체]`

| 형태 | 의미 |
|---|---|
| `git show` | HEAD 커밋의 메시지+diff |
| `git show <해시>` | 지정 커밋의 메시지+diff |
| `git show --stat <해시>` | 변경 파일 목록과 통계만 |
| `git show <해시>:<경로>` | 그 시점의 파일 내용(blob) |

**사용 예시**:

```bash
git show --stat HEAD    # 방금 커밋에 어떤 파일이 들어갔나
git show a3cf62b        # 특정 커밋의 전체 내용
```

**주의**: `--stat`은 diff 본문 없이 파일 목록만 보여줍니다 — 커밋 누락 점검에 가장 빠른 형태입니다.

### 상황별 빠른 참조

| 알고 싶은 것 | 명령 |
|---|---|
| 최근에 무슨 일이 있었나 | `git log --oneline -10` |
| 이 파일은 언제 누가 바꿨나 | `git log -- <경로>` |
| feature에만 있는 커밋은 | `git log main..feature` |
| 아직 add 안 한 변경은 | `git diff` |
| 마지막 커밋 이후 모든 변경은 | `git diff HEAD` |
| 두 브랜치의 코드 차이는 | `git diff main feature` |
| 방금 커밋에 뭐가 들어갔나 | `git show --stat HEAD` |
| 그 커밋의 정체는 | `git show <해시>` |

이 표의 왼쪽 열이 곧 학습 순서입니다 — 조회 명령은 "명령을 외우는" 것이 아니라 **"질문을 명령으로 번역하는"** 기술이고, 질문이 정확해지면 명령은 표에서 찾으면 됩니다. 여덟 질문 모두 저장소를 바꾸지 않으므로, 이 표 전체가 연습장처럼 안전합니다.

## 원문으로 읽기

> "List commits that are reachable by following the parent links from the given commit(s), but exclude commits that are reachable from the one(s) given with a ^ in front of them."
>
> — 주어진 커밋(들)에서 parent 링크를 따라 도달 가능한 커밋들을 나열하되, 앞에 ^가 붙은 커밋에서 도달 가능한 것들은 제외한다.
> [git-log — Git Documentation](https://git-scm.com/docs/git-log)

log의 공식 정의가 "최근 커밋을 보여준다"가 아니라 그래프 질의라는 사실이 여기 있습니다. `main..feature` 같은 범위 문법이 마법이 아니라 이 정의("포함 집합 - 제외 집합")의 표기법일 뿐임을 알면, log는 외울 것이 아니라 조립하는 도구가 됩니다.

> "Show changes between the working tree and the index or a tree, changes between the index and a tree, changes between two trees, changes resulting from a merge, changes between two blob objects, or changes between two files on disk."
>
> — 워킹 트리와 인덱스(또는 트리) 사이, 인덱스와 트리 사이, 두 트리 사이, 병합의 결과, 두 blob 객체 사이, 또는 디스크의 두 파일 사이의 변경을 보여준다.
> [git-diff — Git Documentation](https://git-scm.com/docs/git-diff)

문서의 첫 문장이 diff의 비교쌍 전체 목록입니다. "diff가 뭘 보여주지?"라는 질문의 답이 하나가 아니라 여섯이라는 것 — 그래서 diff를 쓸 때는 항상 "지금 어느 쌍인가"를 먼저 확정해야 합니다.

> "Shows one or more objects (blobs, trees, tags and commits)."
>
> — 하나 이상의 객체(blob, tree, tag, commit)를 보여준다.
> [git-show — Git Documentation](https://git-scm.com/docs/git-show)

show의 정의가 "커밋을 보여준다"가 아니라 "객체를 보여준다"인 것에 Git의 내부가 드러납니다. 저장소의 모든 것 — 파일 내용도, 폴더 구조도, 커밋도 — 이 동일한 객체 저장소(1강의 `.git/objects`)에 사는 시민이며, show는 그 저장소의 열람 창구입니다.

> "For commits it shows the log message and textual diff."
>
> — 커밋에 대해서는 로그 메시지와 텍스트 diff를 보여준다.
> [git-show — Git Documentation](https://git-scm.com/docs/git-show)

커밋 하나를 조사할 때 log(메시지)와 diff(내용)를 따로 실행할 필요가 없는 이유입니다. 이 프로젝트의 운영 절차인 "커밋 후 `git show --stat`으로 누락 확인"도 이 성질 위에 서 있습니다.

## 실전에서

### AI 변경 검토의 표준 동선

AI 협업에서 조회 3형제는 검토 파이프라인 그 자체입니다:

```bash
# 1) AI 작업 직후 — 커밋 전 검토
git status              # 어떤 파일이 바뀌었나 (목록)
git diff                # 어떻게 바뀌었나 (내용)

# 2) 커밋 후 — 기록 검증
git show --stat HEAD    # 의도한 파일이 전부 들어갔나

# 3) 세션이 끝난 뒤 — 이력 감사
git log --oneline -15   # AI가 남긴 커밋 흐름이 계획과 맞나
```

이 프로젝트의 운영 원칙 "Executor의 보고를 믿지 말고 git log로 실측 대조하라"가 정확히 이 동선입니다 — 실제로 Codex의 보고와 저장소 상태가 어긋난 것을 이 명령들이 여러 번 잡아냈습니다.

### 브랜치 검토: 합치기 전에 읽기

merge 전 마지막 점검으로 두 질의를 조합합니다: `git log main..feature --oneline`(무슨 커밋들이 들어오나) + `git diff main feature`(최종 코드 차이는 무엇인가). 커밋 단위의 서사와 코드 단위의 실체를 모두 확인한 뒤 합치는 것이 안전한 merge의 전제입니다.

> [!TIP]
> `git log -- <파일경로>`는 "이 파일, 언제 누가 왜 바꿨지?"에 답하는 파일 단위 연대기입니다. 낯선 코드를 만났을 때 그 파일의 log부터 읽으면 변경의 맥락이 따라옵니다.

### 시나리오: "어제는 됐는데 오늘 깨졌다"

조회 3형제가 함께 일하는 가장 흔한 실전 상황입니다:

```bash
git log --oneline -10        # 1) 어제 이후 어떤 커밋들이 들어왔나
git show --stat <의심 해시>   # 2) 그중 문제 영역 파일을 건드린 커밋은
git show <의심 해시>          # 3) 그 커밋이 정확히 무엇을 바꿨나
git diff <정상 해시> HEAD -- src/문제파일.ts   # 4) 정상 시점과 현재의 그 파일 차이만
```

범인 후보를 이력에서 좁히고(log), 각 후보를 심문하고(show), 정상 시점과의 정확한 차이를 확정하는(diff) 순서 — 디버깅 강의에서 배운 "증거 수집"의 Git 버전입니다. 이 진단이 끝난 뒤에야 다음 강의의 복구 명령(restore/reset/revert)을 안전하게 선택할 수 있습니다.

## 한계와 트레이드오프

**조회는 사실을 주지만 해석은 주지 않습니다.** diff는 무엇이 바뀌었는지 완벽하게 보여주지만, 그 변경이 옳은지는 말하지 않습니다. 조회 결과를 판단으로 바꾸는 것은 여전히 사람(또는 검증 절차)의 몫입니다.

**log의 유연함은 문법 비용을 치릅니다.** 도달 가능성 표기(`..`, `^`, `---`)는 강력하지만 처음엔 낯섭니다. 다만 전부 외울 필요가 없습니다 — "포함할 끝점, 제외할 끝점"이라는 원리 하나로 필요할 때 조립하면 됩니다.

**diff는 텍스트 비교입니다.** 이미지·바이너리 파일의 변경은 "바뀌었다"는 사실만 알려줄 뿐 내용을 보여주지 못합니다. 이 사이트의 SVG처럼 텍스트 기반 형식을 쓰면 다이어그램조차 diff로 검토할 수 있게 됩니다 — 자산을 텍스트로 관리하는 이유 중 하나입니다.

**병합 커밋의 표시는 특수 형식입니다.** show가 병합 커밋에 쓰는 `--cc` 형식은 일반 diff와 다르게 읽힙니다. 병합 커밋에서 "diff가 이상하다"고 느껴지면 형식이 다른 것이지 기록이 잘못된 것이 아닙니다.

> [!WARNING]
> 조회 명령이 안전하다는 것은 "저장소를 바꾸지 않는다"는 뜻이지 "출력을 오해해도 안전하다"는 뜻이 아닙니다. diff 인자 순서를 뒤집어 +/-를 반대로 읽으면, 잘못된 판단으로 이어지는 것은 결국 사람의 다음 행동입니다.

## 더 읽기

- [git-log — Git Documentation](https://git-scm.com/docs/git-log) — 도달 가능성 질의, 범위 문법, 출력 형식 옵션
- [git-diff — Git Documentation](https://git-scm.com/docs/git-diff) — 비교쌍 6종의 정의
- [git-show — Git Documentation](https://git-scm.com/docs/git-show) — 객체 표시, 병합 커밋 형식

이전 순서: [git branch/switch/merge 레퍼런스](/lessons/git-branch-switch-merge). 다음 순서: [git restore/reset/revert 복구 레퍼런스](/lessons/git-restore-reset-revert) — 조회로 문제를 특정했다면, 이제 정확히 되돌리는 법.
