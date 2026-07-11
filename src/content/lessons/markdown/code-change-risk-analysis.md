## 한 줄 정의

코드 변경 위험 분석은 pull request의 changed files, diff, security alert, 변경 의도, 자동 분석 결과, business logic 영향을 함께 읽고 어떤 부분을 더 깊게 review하고 어떤 검증을 요구할지 정하는 절차입니다. GitHub PR 문서는 changed files와 differences를 검토할 수 있다고 설명하고, CodeQL은 vulnerabilities and errors를 식별하는 code scanning에 쓰이며, OWASP는 human expertise와 contextual understanding이 필요하다고 강조합니다. ==위험 분석은 "AI가 만든 코드인가"보다 "무엇이 바뀌었고 실패 비용이 어디에 있는가"를 묻는 과정==입니다.

이 강의는 AI 코드 리뷰 도구의 다음 단계입니다. AI review comment를 받는 것만으로는 충분하지 않습니다. 어떤 comment가 중요한지, 어떤 파일 변경이 위험한지, 어떤 alert를 먼저 봐야 하는지, 어떤 경우 request changes가 필요한지 판단해야 합니다. 위험 분석은 그 판단의 언어를 제공합니다.

초보자는 파일 수나 diff 크기만 보고 위험을 판단하기 쉽습니다. 하지만 작은 인증 로직 변경이 큰 UI copy 변경보다 훨씬 위험할 수 있습니다. 반대로 큰 문서 변경은 파일 수가 많아도 runtime 위험이 낮을 수 있습니다. 위험 분석은 줄 수가 아니라 변경 영역, 사용자 영향, 보안 민감도, 검증 가능성을 봅니다.

![코드 변경 위험 분석: diff signal에서 review decision까지](/lesson-diagrams/code-change-risk-analysis/code-change-risk-map.svg)

## 왜 존재하는가

Pull request review는 merge 전에 변경을 검토하는 협업 절차입니다. 그러나 모든 변경을 같은 깊이로 읽을 수는 없습니다. 시간이 제한되어 있고, diff는 여러 파일에 흩어져 있으며, 자동 도구와 AI comment는 여러 신호를 동시에 제공합니다. 위험 분석은 이 신호를 정렬해 review 우선순위를 정하기 위해 존재합니다.

AI 시대에는 이 필요가 더 커집니다. AI agent는 여러 파일을 빠르게 바꾸고, 사람은 그 diff를 검토해야 합니다. 변경 속도는 빨라졌지만 production failure의 비용은 줄어들지 않았습니다. ==AI가 코드를 빠르게 만들수록 사람은 diff를 더 빨리 믿는 것이 아니라 더 체계적으로 의심해야 합니다==. 위험 분석은 이 의심을 감정이 아니라 절차로 바꿉니다.

GitHub PR review 문서는 changed files와 differences를 볼 수 있는 흐름을 제공합니다. Code scanning은 PR diff 안의 alert를 보여줄 수 있고, CodeQL은 vulnerabilities and errors를 찾는 분석을 제공합니다. OWASP Secure Code Review는 자동 도구가 놓칠 수 있는 영역과 human expertise의 필요를 설명합니다. 이 출처들은 서로 다른 층을 말합니다. Diff는 무엇이 바뀌었는지, alert는 어떤 자동 신호가 있는지, manual review는 맥락상 무엇이 위험한지 봅니다.

위험 분석은 review status와도 연결됩니다. PR review에는 approve 또는 request changes 같은 결정이 있습니다. 위험이 낮고 검증이 충분하면 approve할 수 있습니다. 위험이 높고 검증이 부족하거나 결함이 보이면 request changes가 필요합니다. 즉 위험 분석은 comment를 많이 다는 일이 아니라 어떤 review decision을 내려야 하는지 근거를 만드는 일입니다.

## 작동 원리

### 1. Diff scope를 먼저 고정한다

첫 단계는 changed files와 differences를 확인하는 것입니다. 어떤 파일이 바뀌었는지, 어떤 줄이 추가되거나 삭제되었는지, base와 compare branch 사이의 변경이 무엇인지 봅니다. 이때 파일 수만 세지 않고 영역을 분류합니다. UI, API, auth, database, dependency, build config, test, documentation처럼 domain별로 나눕니다.

Diff scope가 고정되어야 review 질문이 생깁니다. Auth 파일이 바뀌었으면 권한과 session flow를 봅니다. Database schema가 바뀌었으면 migration과 data compatibility를 봅니다. UI component가 바뀌었으면 state와 accessibility, test coverage를 봅니다. ==위험 분석의 첫 질문은 "코드가 좋아 보이는가"가 아니라 "이번 변경이 어떤 시스템 경계를 건드렸는가"==입니다.

### 2. Intent alignment를 확인한다

위험은 코드 자체에서만 생기지 않습니다. 변경이 issue나 PR 목적과 맞지 않을 때도 생깁니다. PR 목적이 empty state 추가인데 search ranking까지 바뀌었다면 scope creep입니다. PR 목적이 bug fix인데 public API shape가 바뀌었다면 downstream 영향이 생길 수 있습니다.

Intent alignment는 "이 변경이 왜 필요한가"와 "이 diff가 그 목적을 정확히 달성하는가"를 연결합니다. AI가 만든 변경에서는 특히 중요합니다. Agent가 문제를 해결하려고 주변 파일까지 바꾸는 경우가 있을 수 있기 때문입니다. Scope 밖 변경은 작아 보여도 review에서 먼저 확인해야 합니다.

### 3. 자동 alert를 risk signal로 읽는다

Code scanning alert는 PR diff 안에 표시될 수 있습니다. CodeQL은 vulnerabilities and errors를 식별하는 code scanning에 쓰입니다. 이런 alert는 중요한 risk signal입니다. 하지만 alert가 있다는 것만으로 최종 판단이 끝나지는 않습니다. Details, path, source-to-sink 맥락을 읽고 실제 변경과 연결해야 합니다.

Alert가 없는 것도 안전 증명은 아닙니다. 자동 분석은 특정 패턴과 query에 강하지만 모든 business logic을 이해하지는 못합니다. 따라서 alert는 "반드시 볼 신호"이지 "없으면 끝"이 아닙니다. 자동 신호와 manual review를 함께 둬야 합니다.

### 4. Human review boundary를 적용한다

OWASP KB의 human expertise and contextual understanding은 위험 분석에서 가장 중요한 경계입니다. 예를 들어 role check가 코드에 있어도 실제 제품 정책에서는 특정 plan 사용자만 접근해야 할 수 있습니다. Static analysis나 AI review가 이 정책을 모를 수 있습니다. 사람이 domain context를 연결해야 합니다.

Human review boundary는 자동 도구가 찾을 수 있는 것과 사람이 확인해야 하는 것을 나눕니다. Syntax issue, known vulnerability pattern, obvious null check는 도구가 잘 도울 수 있습니다. Business logic, authorization intent, data exposure, release timing은 사람이 더 깊게 봐야 합니다.

### 5. Risk에 따라 verification을 배정한다

위험 분석의 결과는 "걱정된다"가 아니라 "어떤 검증을 요구한다"여야 합니다. Auth 변경에는 auth test와 manual flow 확인이 필요할 수 있습니다. API contract 변경에는 consumer 영향과 response shape test가 필요합니다. UI 변경에는 component test나 browser check가 필요합니다. Dependency 변경에는 lockfile과 build 확인이 필요합니다.

검증을 배정한 뒤 review status를 결정합니다. 검증이 충분하고 scope가 맞으면 approve할 수 있습니다. 위험한 변경에 검증이 없거나 alert가 해결되지 않았거나 business rule이 불분명하면 request changes가 맞습니다. Comment는 토론이고, approve/request changes는 결정입니다.

```ts
type ChangedFile = {
  path: string
  hasCodeScanningAlert: boolean
}

type RiskLevel = "low" | "medium" | "high"

function classifyRisk(file: ChangedFile): RiskLevel {
  const path = file.path.toLowerCase()
  const criticalArea =
    path.includes("auth") ||
    path.includes("session") ||
    path.includes("security") ||
    path.includes("database") ||
    path.includes("migration")

  if (file.hasCodeScanningAlert || criticalArea) {
    return "high"
  }

  if (path.includes("api") || path.includes("config") || path.includes("package-lock")) {
    return "medium"
  }

  return "low"
}

const risk = classifyRisk({ path: "src/auth/session.ts", hasCodeScanningAlert: false })
console.log(risk)
```

이 예시는 파일 경로와 code scanning alert를 risk signal로 분류합니다. 실제 review에서는 이것만으로 충분하지 않습니다. 그러나 처음 diff를 읽을 때 어떤 파일을 더 깊게 볼지 정하는 출발점으로 쓸 수 있습니다.

## 스펙과 세부

### Changed files와 diff는 review의 지도다

GitHub PR review에서 changed files와 differences를 볼 수 있다는 점은 위험 분석의 출발점입니다. Diff는 이번 변경에서 실제로 바뀐 surface를 보여줍니다. Risk analysis는 이 surface를 따라갑니다. 전체 repository를 막연히 걱정하지 않고, 이번 PR이 건드린 경계를 먼저 봅니다.

Diff를 볼 때는 추가된 줄과 삭제된 줄 모두 중요합니다. 삭제된 validation, 변경된 condition, 사라진 test는 위험 신호일 수 있습니다. AI가 만든 diff에서는 특히 "왜 이 줄이 바뀌었는가"를 요구사항과 연결해야 합니다.

### Code scanning alert는 PR 안에서 읽어야 한다

KB는 code scanning alert가 PR diff 안에서 보일 수 있다고 정리합니다. Alert는 파일과 위치를 알려주지만, 실제 판단은 PR 맥락에서 해야 합니다. 이 alert가 새로 도입된 위험인지, 기존 위험을 건드렸는지, suggested fix가 scope와 맞는지 확인합니다.

Alert를 무조건 닫는 것도 위험합니다. 자동 도구가 지적한 패턴이 실제 취약점이 아닐 수 있고, 반대로 낮은 severity처럼 보여도 민감한 flow에서는 중요할 수 있습니다. Alert는 classification의 시작점입니다.

### CodeQL은 자동 분석이고 manual review와 결합된다

CodeQL은 code를 data처럼 분석해 vulnerabilities and errors를 찾는 데 쓰입니다. 하지만 OWASP KB의 자동 도구 한계와 manual review 필요성은 계속 적용됩니다. Static analysis는 알려진 pattern과 query에 강하고, manual review는 context-specific vulnerability와 business logic에 필요합니다.

따라서 "CodeQL 통과"는 중요한 신호지만 전체 안전을 증명하지 않습니다. 특히 authorization, data exposure, user role, product policy 같은 영역은 사람이 요구사항을 함께 읽어야 합니다.

### Review decision은 위험과 검증의 함수다

Pull request review의 approve 또는 request changes는 단순 취향이 아닙니다. 위험이 낮고 검증이 충분하며 scope가 맞으면 approve할 수 있습니다. 위험이 높고 검증이 부족하면 request changes가 필요합니다. Comment만 남기고 승인하는 경우와 request changes를 요구하는 경우를 구분해야 합니다.

팀에서는 이 기준을 문서화할 수 있습니다. 예를 들어 security alert가 해결되지 않은 PR은 request changes, auth 변경에 test가 없으면 request changes, documentation-only 변경은 낮은 위험으로 분류하는 식입니다. 기준이 있어야 AI review comment와 사람 판단이 연결됩니다.

## 원문으로 읽기

> "changed files, and the differences"
>
> — 변경된 파일과 차이점.
> [GitHub Docs — Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)

위험 분석은 추상적인 걱정이 아니라 changed files와 diff에서 시작합니다. 이 문장은 review 대상이 어디에 있는지 알려줍니다. 먼저 변경 범위를 고정해야 어떤 위험이 실제로 이번 PR과 관련 있는지 판단할 수 있습니다.

> "approve or request changes"
>
> — 승인하거나 변경을 요청한다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

위험 분석은 최종적으로 review decision과 연결됩니다. 위험을 발견했는데도 결정이 comment 수준에 머물면 merge gate가 약해질 수 있습니다. 어떤 경우 approve하고 어떤 경우 request changes할지 판단 기준이 필요합니다.

> "inside the diff"
>
> — diff 내부에서.
> [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests)

Code scanning alert가 PR 변경 안에서 보인다는 점은 review workflow에 중요합니다. Security signal이 별도 dashboard에만 있는 것이 아니라 diff review 흐름 안으로 들어옵니다. Reviewer는 alert를 changed code와 함께 읽어야 합니다.

> "identify vulnerabilities and errors"
>
> — 취약점과 오류를 식별한다.
> [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-code-scanning)

CodeQL의 역할을 보여주는 문장입니다. 자동 분석은 vulnerability와 error 후보를 찾는 강력한 신호를 제공합니다. 하지만 이 신호는 manual review와 결합되어야 합니다.

> "human expertise and contextual understanding"
>
> — 사람의 전문성과 맥락 이해.
> [OWASP Cheat Sheet Series — Secure Code Review](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html)

위험 분석의 최종 경계입니다. 자동 도구와 AI comment가 있어도 business logic과 context-specific vulnerability는 사람이 이해해야 합니다. 이 문장이 없으면 risk analysis는 도구 결과를 읽는 일로 축소됩니다.

## 실전에서

### 파일별 risk label을 붙인다

PR을 열면 changed files를 보며 risk label을 붙입니다. Auth, session, payment, database, migration, dependency, build config, public API는 높은 주의를 둡니다. UI copy, documentation, test-only 변경은 상대적으로 낮은 위험일 수 있습니다. 단, 낮은 위험도 검증이 필요 없다는 뜻은 아닙니다.

이 label은 review 순서를 정합니다. 높은 위험 파일을 먼저 읽고, 관련 test와 alert를 확인합니다. AI review comment가 있다면 이 label과 연결해 우선순위를 정합니다.

### Code scanning alert를 path와 함께 읽는다

Alert가 있으면 alert message만 보지 말고 path와 diff 위치를 확인합니다. 이번 PR에서 새로 생긴 alert인지, 기존 코드가 드러난 것인지, suggested fix가 있는지 봅니다. Alert가 security 영역이면 request changes 후보로 올리고, 사람이 context를 확인합니다.

### Scope creep을 찾는다

AI가 만든 PR에서는 요구사항 밖 변경이 생길 수 있습니다. Task가 empty state인데 routing, data fetching, API contract가 바뀌었다면 위험합니다. Scope creep은 버그가 아니어도 review 비용과 rollback 비용을 키웁니다. 필요하면 PR을 나누거나 request changes로 되돌립니다.

### 검증을 위험에 맞춘다

위험이 낮은 변경은 lint와 관련 unit test로 충분할 수 있습니다. 중간 위험 변경은 typecheck, integration test, browser check가 필요할 수 있습니다. 높은 위험 변경은 security review, manual scenario, rollback plan까지 요구할 수 있습니다. 검증은 변경의 실패 비용에 맞춰야 합니다.

```text
Risk review checklist:
1. changed files와 diff scope 확인
2. PR 목적과 diff가 맞는지 확인
3. code scanning alert 확인
4. auth/data/API/dependency/config 변경 우선 검토
5. 필요한 test와 manual validation 지정
6. approve 또는 request changes 결정
```

## 한계와 트레이드오프

첫 번째 한계는 위험 판단의 불완전성입니다. 모든 위험을 사전에 찾을 수는 없습니다. 그래서 risk analysis는 예언이 아니라 우선순위 지정입니다. 무엇을 더 깊게 볼지, 어떤 검증을 요구할지 정하는 절차입니다.

두 번째 trade-off는 review 시간입니다. 위험 분석을 세밀하게 하면 시간이 듭니다. 하지만 모든 PR에 같은 깊이를 적용할 필요는 없습니다. 변경 영역과 실패 비용에 따라 검토 깊이를 조절해야 합니다.

세 번째 한계는 자동 도구 신뢰입니다. CodeQL과 code scanning은 유용하지만 완전하지 않습니다. Alert가 없다고 안전한 것도 아니고, alert가 있다고 항상 실제 취약점인 것도 아닙니다. 사람이 context를 읽어야 합니다.

네 번째 한계는 AI output에 대한 편향입니다. AI가 만든 코드라는 이유만으로 모두 위험하다고 보면 생산성이 떨어지고, AI가 리뷰했다는 이유만으로 안전하다고 보면 품질이 떨어집니다. 기준은 작성자가 아니라 변경의 성격과 검증 증거입니다.

## 더 읽기

이 강의의 근거 KB는 `code-change-risk-analysis`입니다. 먼저 GitHub의 reviewing proposed changes 문서를 읽고 changed files와 diff review 흐름을 확인하세요. 그 다음 pull request review 문서에서 approve와 request changes의 의미를 봅니다. Code scanning alert triage 문서는 alert가 PR diff 안에서 어떻게 review되는지 보여줍니다. CodeQL code scanning 문서는 자동 분석이 vulnerabilities and errors를 찾는 역할을 설명합니다. 마지막으로 OWASP Secure Code Review 문서를 읽으며 human expertise와 contextual understanding이 왜 필요한지 확인하세요.

다음 학습 순서는 `ai-assisted-testing-loop`입니다. 위험 분석으로 어떤 변경이 위험한지 알았다면, 그 위험을 test case와 검증 루프로 바꿔야 합니다. AI review comment, code scanning alert, manual review concern을 테스트와 regression check로 연결하는 능력이 실전 바이브코딩의 안전성을 만듭니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다. 본문은 승인 KB의 GitHub PR review, GitHub code scanning/CodeQL, OWASP Secure Code Review 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 changed file risk를 분류하는 독립 TypeScript 예시입니다.
