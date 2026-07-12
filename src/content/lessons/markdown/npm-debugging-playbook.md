## 한 줄 정의

npm 디버깅 플레이북은 "설치가 안 된다", "빌드가 깨진다", "내 컴퓨터에서만 된다" 같은 npm 계열 사고를 상황별로 복구하는 레퍼런스입니다. 핵심 도구는 넷입니다: 의존성을 설치하는 install("This command installs a package and any packages that it depends on."), 설치 결과를 고정 기록하는 package-lock.json, lockfile 그대로 재현 설치하는 ci("Clean install a project"), 그리고 취약점을 점검하는 audit. ==복구의 첫 원칙은 명령 재시도가 아니라 "어느 층이 깨졌는가"의 분류==입니다 — manifest(package.json)인가, lockfile인가, node_modules인가, 레지스트리·네트워크인가.

이 플레이북은 npm-scripts-reference와 package-json-semver에서 배운 개념을 사고 대응 절차로 재배열합니다. Git 복구 플레이북과 같은 구조 — 잃은 것을 분류하고, 분기에 맞는 도구를 씁니다.

![npm 디버깅 플레이북: 깨진 층(manifest/lockfile/node_modules/취약점)에 따라 package.json 검사·npm ci·재설치·audit로 분기하는 지도](/lesson-diagrams/npm-debugging-playbook/npm-recovery-map.svg)

## 왜 존재하는가

npm 오류는 메시지가 길고 낯설어서, 많은 사람이 이해 없이 "node_modules 지우고 재설치"를 반복합니다. 그 주문이 우연히 통할 때도 있지만, 원인이 manifest 문법이나 lockfile 불일치면 같은 사고가 재발합니다. AI에게 오류를 붙여도, 층 분류 없이는 AI도 표면 증상만 다룹니다.

플레이북이 존재하는 이유는 npm의 층 구조를 사고 대응에 그대로 쓰기 위해서입니다. npm 프로젝트는 세 층이 짝을 이룹니다: 의도를 적는 package.json(manifest), 실제 설치 결과를 고정하는 package-lock.json("`package-lock.json` is automatically generated" — 설치가 바뀔 때 자동 생성·갱신), 그리고 실체인 node_modules. ==사고의 대부분은 이 세 층의 불일치==이고, 복구는 "어느 층이 진실인가"를 정한 뒤 나머지를 거기에 맞추는 일입니다.

재현성 문제("내 컴퓨터에서만 된다")를 위해 npm은 ci라는 별도 명령을 둡니다. ci는 lockfile을 진실로 삼아 "installs are essentially frozen" — 설치가 사실상 동결된 상태로, manifest를 다시 해석하지 않고 lockfile 그대로 재현합니다. CI 서버와 팀원 환경이 같아지는 근거입니다.

## 작동 원리

### 분기 1 — 설치 자체가 실패한다: manifest부터 검사

`npm install`이 시작도 못 하면 먼저 package.json 문법을 봅니다. 공식 문서의 요구는 단호합니다: "It must be actual JSON" — 주석도, 후행 콤마도 안 되는 진짜 JSON이어야 합니다. JSON 파싱 오류 메시지가 보이면 범인은 거의 항상 manifest입니다. 문법을 고치기 전까지 다른 어떤 복구도 소용없습니다.

### 분기 2 — 설치는 되는데 결과가 이상하다: lockfile과의 불일치

"어제는 됐는데 오늘 깨진다", "팀원과 버전이 다르다"는 lockfile 층의 문제입니다. install은 semver 범위를 다시 해석해 lockfile을 갱신할 수 있지만("This command installs a package and any packages that it depends on."), 그 갱신이 의도치 않은 버전 이동을 만들 수 있습니다. 진실을 lockfile로 정했다면 install 대신 ci를 씁니다 — "Clean install a project"가 ci의 정의이고, lockfile 그대로 설치하며 어긋나면 실패로 알려줍니다.

### 분기 3 — 환경이 오염된 것 같다: 동결 재설치

node_modules가 어떤 이유로든 반쯤 깨진 상태(중단된 설치, 수동 수정)라면, 부분 수리보다 동결 재설치가 빠릅니다. ci는 기존 node_modules를 제거하고 lockfile 기준으로 다시 깝니다 — "installs are essentially frozen"이므로 이 과정에서 manifest·lockfile이 수정되지 않아, 재현 가능한 깨끗한 상태로 돌아갑니다. "지우고 재설치" 주문의 공식적·안전한 형태가 ci입니다.

### 분기 4 — 보안 경고가 떴다: audit의 범위를 알고 대응

설치 로그의 취약점 경고는 audit 층입니다. 공식 문서는 범위를 명시합니다: "`npm audit` checks direct dependencies" — 그리고 devDependencies, bundled, optional 의존성까지 검사합니다. audit 결과는 심각도와 수정 경로를 주지만, 자동 수정(fix)은 버전 이동을 동반할 수 있으므로 lockfile diff를 확인하고 verify를 돌린 뒤 커밋합니다.

## 스펙과 세부

### install과 ci의 사용처를 구분한다

install은 의존성을 추가·갱신할 때(manifest가 진실), ci는 기존 lockfile을 재현할 때(lockfile이 진실) 씁니다. CI 서버·배포 파이프라인·"팀원과 같은 상태 만들기"는 전부 ci의 영역입니다. 이 구분 하나가 재현성 사고의 절반을 예방합니다.

### lockfile은 커밋한다

"`package-lock.json` is automatically generated"이지만, 자동 생성이라고 무시하면 안 됩니다 — lockfile을 커밋해야 팀 전체와 CI가 같은 트리를 갖습니다. lockfile diff가 크게 나온 PR은 의존성 변경이 있었다는 신호이므로, 코드 변경 위험 분석의 대상입니다.

### 이 사이트를 사례로

이 학습 사이트의 `npm run verify`는 lint→typecheck→test→build를 묶은 스크립트입니다. 의존성 사고가 의심될 때의 실전 절차는: package.json 문법 확인 → `npm ci`로 동결 재설치 → `npm run verify`로 전체 확인 — 세 단계면 "환경 탓인지 코드 탓인지"가 갈립니다.

## 원문으로 읽기

> "It must be actual JSON"
>
> — 그것은 진짜 JSON이어야 한다.
> [npm Docs — package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)

manifest 층의 최소 조건입니다. 설치가 시작도 못 하는 사고의 첫 용의자가 이 규칙 위반입니다.

> "This command installs a package and any packages that it depends on."
>
> — 이 명령은 패키지와 그것이 의존하는 모든 패키지를 설치한다.
> [npm Docs — npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/)

install의 정의입니다. 의존성 트리 전체를 다루므로, 범위 재해석에 따른 버전 이동도 이 명령의 성질입니다.

> "`package-lock.json` is automatically generated"
>
> — package-lock.json은 자동으로 생성된다.
> [npm Docs — package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/)

lockfile의 출생입니다. 자동 생성되지만 커밋해서 팀·CI의 진실로 삼아야 재현성이 생깁니다.

관련 원문(링크): [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

ci의 정의입니다. 오염된 환경을 lockfile 기준의 깨끗한 상태로 되돌리는 공식 명령입니다.

관련 원문(링크): [npm Docs — npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/)

ci가 manifest·lockfile을 수정하지 않는다는 성질입니다. 재현 설치가 안전한 이유입니다.

## 실전에서

### 층을 한 문장으로 분류한다

오류를 만나면 "깨진 층은 [manifest/lockfile/node_modules/취약점]이다"를 먼저 씁니다. 오류 메시지의 첫 줄(JSON parse? version conflict? audit?)이 대개 층을 알려줍니다.

### 재현 요청에는 ci를 쓴다

"네 환경 그대로 만들고 싶다", "CI와 똑같이" — 전부 `npm ci`입니다. install로 대신하면 lockfile이 움직일 수 있습니다.

### AI에게는 층 + 로그를 함께 준다

AI에게 npm 오류를 물을 때 오류 로그 전문과 함께 "lockfile은 커밋되어 있다/없다", "ci인가 install인가"를 알려줍니다. 층 정보가 있어야 AI의 답이 표면 증상을 넘어섭니다.

### audit fix 후에는 verify

취약점 자동 수정은 버전 이동을 동반할 수 있습니다. fix 후 lockfile diff 확인 → `npm run verify` → 통과 시 커밋의 순서를 지킵니다.

## 한계와 트레이드오프

첫 번째 한계는 플레이북 밖의 원인입니다. 네트워크·프록시·레지스트리 장애, Node 버전 불일치 같은 환경 층의 문제는 이 네 분기 밖에 있습니다. 네 분기를 다 확인했는데도 실패하면 환경 층(Node 버전, 네트워크)을 의심합니다.

두 번째 trade-off는 ci의 비용입니다. ci는 node_modules를 지우고 다시 깔므로 install보다 느릴 수 있습니다. 로컬에서 사소한 패키지 하나를 추가할 때까지 ci를 고집할 필요는 없습니다 — 재현성이 필요한 순간(CI, 사고 복구, 협업 동기화)에 쓰는 도구입니다.

세 번째 한계는 audit의 범위입니다. "`npm audit` checks direct dependencies" — 검사는 의존성 트리를 다루지만, 취약점 데이터베이스에 없는 문제나 코드 자체의 결함은 잡지 못합니다. audit 통과는 "알려진 취약점 없음"이지 "안전 증명"이 아닙니다.

네 번째 한계는 자동 수정의 부작용입니다. audit fix나 install의 버전 이동이 동작을 바꿀 수 있습니다. 리팩터링과 같은 원칙이 적용됩니다 — 의존성 변경도 검증(verify) 없이 병합하지 않습니다.

## 더 읽기

이 강의의 근거 KB는 `npm-debugging-playbook`입니다. 각 분기의 원문은 npm 공식 문서입니다: package.json(JSON 규칙), npm install(의존성 설치), package-lock.json(자동 생성·재현성), npm ci(클린 설치·동결), Auditing package dependencies(취약점 검사 범위). 이 다섯 문서가 이 강의 인용의 원문입니다.

선행 강의로 `npm-scripts-reference`(스크립트 구조)와 `package-json-and-semver`(버전 범위)를 읽으면 각 층의 배경이 채워집니다. 함께 읽으면 좋은 강의는 `git-recovery-playbook` — 같은 "분류 먼저, 도구는 그다음" 구조를 Git 사고에 적용합니다. 다음 학습은 `deployment-checklist-playbook`으로, 사고를 복구하는 대신 배포 전에 예방하는 체크리스트를 다룹니다.
