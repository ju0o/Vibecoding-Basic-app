## 한 줄 정의

AI 코드 리뷰 도구는 pull request와 diff를 읽고 잠재적인 bug, security issue, code quality problem, 수정 제안 후보를 만들어 사람 reviewer가 더 빠르게 위험 신호를 찾도록 돕는 보조 검토 도구입니다. GitHub Copilot code review와 Cursor Bugbot은 모두 변경을 검토하는 방향의 기능으로 문서화되어 있지만, 이 기능은 사람의 승인 판단을 대체하지 않습니다. ==AI 코드 리뷰의 핵심은 "AI가 approve한다"가 아니라 "사람이 검토할 후보 신호를 더 빨리 받는다"==입니다.

이 강의에서 다루는 AI 코드 리뷰는 코드 생성 도구의 반대편에 있는 안전 장치입니다. 바이브코딩에서는 AI가 코드를 더 빨리 만들기 때문에, 그 코드를 읽고 검토하는 속도와 품질도 함께 설계해야 합니다. 하지만 검토 속도가 빨라진다는 말이 곧 책임이 자동화된다는 뜻은 아닙니다. GitHub의 pull request review 흐름에는 comment, approve, request changes가 있고, Copilot code review는 그중 Comment review로 남는다고 KB가 정리합니다.

따라서 이 주제는 도구 사용법보다 경계 인식이 먼저입니다. AI 리뷰 도구는 diff를 훑고 눈에 띄는 문제를 알려줄 수 있습니다. 그러나 보안, business logic, 팀 정책, 배포 위험처럼 context가 필요한 판단은 사람이 계속 맡아야 합니다. AI 리뷰는 사람 review를 없애는 기능이 아니라, 사람이 더 좋은 질문을 던지게 만드는 입력입니다.

## 왜 존재하는가

코드 리뷰는 원래 merge 전에 변경을 확인하기 위한 협업 절차입니다. 기능이 많아지고 pull request가 커지면 reviewer는 changed files와 diff를 읽고, 어떤 변경이 의도와 맞는지, 어떤 edge case를 놓쳤는지, 어떤 테스트가 필요한지 확인해야 합니다. 이 과정은 품질을 지키는 데 필요하지만 시간이 많이 듭니다. AI 코드 리뷰 도구는 이 병목에서 먼저 볼 곳과 의심할 지점을 제안하기 위해 등장했습니다.

AI 코딩 도구가 코드 생성으로 확장되면서 리뷰의 중요성은 더 커졌습니다. 사람이 한 줄씩 작성하던 때보다, AI가 여러 파일의 구현 후보를 빠르게 만들 수 있기 때문입니다. 생산 속도만 빨라지고 검토 체계가 그대로라면 repository는 빠르게 불확실해집니다. ==생성 속도가 올라간 시대에는 review workflow도 같은 속도로 관찰 가능해야 합니다==. AI 코드 리뷰 도구는 이 흐름에서 자동 분석과 사람 판단 사이를 잇는 보조 장치입니다.

GitHub Copilot code review는 여러 언어의 코드를 검토할 수 있는 기능으로 설명되고, Cursor Bugbot은 pull request를 검토한다고 문서화됩니다. 둘 다 같은 문제를 다룹니다. 변경이 생겼을 때 사람이 모든 줄을 처음부터 혼자 읽기 전에, 도구가 후보 문제를 먼저 표시해 주면 review 시작점이 생깁니다. 그러나 이 시작점은 결론이 아닙니다. Pull request review의 approve 또는 request changes는 여전히 사람과 팀의 절차입니다.

보안 리뷰에서는 이 경계가 더 중요합니다. OWASP Secure Code Review는 자동 도구가 놓칠 수 있는 취약점 때문에 사람의 전문성과 맥락 이해가 필요하다고 설명합니다. AI 리뷰 도구가 보안 이슈 후보를 알려주는 것은 유용하지만, business logic이나 data flow의 실제 의미를 판단하려면 사람이 application context를 읽어야 합니다. AI 리뷰가 존재하는 이유는 사람 review를 압축하는 것이 아니라, 사람 review가 더 집중할 수 있게 risk signal을 앞에 놓기 위해서입니다.

## 작동 원리

### 1. 입력은 변경 범위에서 시작한다

AI 코드 리뷰는 먼저 변경 범위를 읽습니다. Pull request에는 commits, changed files, base branch와 compare branch 사이의 diff가 있습니다. 리뷰 도구가 보는 핵심도 이 diff입니다. 전체 repository를 추상적으로 이해한다기보다, 이번 변경에서 실제로 바뀐 줄과 주변 맥락을 중심으로 판단합니다.

이 구조 때문에 첫 번째 질문은 "이 도구가 똑똑한가"가 아니라 "이번 변경 범위가 reviewable한가"입니다. Pull request가 너무 크면 AI도 사람도 중요한 신호를 놓치기 쉽습니다. 작은 PR은 도구가 문제 후보를 더 구체적으로 표시하게 만들고, 사람도 그 후보가 실제 요구사항과 맞는지 확인하기 쉽습니다. ==AI review 품질의 상당 부분은 모델 자체가 아니라 diff의 크기와 의도 설명에서 결정됩니다==.

### 2. 도구는 comment와 suggested change 후보를 만든다

GitHub Copilot code review는 가능한 경우 몇 번의 클릭으로 적용할 수 있는 suggested changes를 포함할 수 있다고 KB가 정리합니다. Cursor Bugbot도 bug, security issue, code quality problem을 식별하는 pull request review 도구로 설명됩니다. 이때 도구의 산출물은 보통 comment, issue explanation, suggested fix 후보입니다.

중요한 점은 suggested change가 자동 정답이 아니라는 것입니다. 제안은 사람이 검토하고 적용 여부를 선택해야 합니다. PR comment에 적힌 문제 설명이 실제 문제인지, suggested fix가 기존 기능을 깨지 않는지, 테스트가 충분한지 따져야 합니다. AI가 코드를 만들었든 사람이 만들었든, repository에 들어가는 순간 팀의 코드가 되기 때문입니다.

### 3. 사람의 review status와 분리된다

GitHub PR review에는 comment, approve, request changes 같은 상태가 있습니다. Copilot code review가 Comment review를 남긴다는 점은 AI review의 위치를 분명히 보여줍니다. AI가 의견을 줄 수는 있지만 required approval을 대신하지 않습니다. 이 차이를 모르고 AI comment를 approval처럼 읽으면 merge gate가 약해집니다.

실무에서는 AI comment를 "검토할 항목 목록"으로 다루는 것이 안전합니다. 사람이 각 comment를 읽고 세 가지로 분류합니다. 첫째, 실제 결함이라 수정해야 하는 항목. 둘째, 스타일이나 취향 수준이라 팀 규칙에 따라 판단할 항목. 셋째, 현재 요구사항과 맞지 않아 무시하거나 반박할 항목입니다. 이 분류가 끝난 뒤에 사람이 approve 또는 request changes를 선택합니다.

### 4. repository rule과 instruction이 품질을 바꾼다

KB는 Copilot code review의 repository custom instructions와 Cursor Bugbot의 repository rules, team rules, BUGBOT.md를 언급합니다. 이것은 AI 리뷰 도구가 일반적인 코드 품질 규칙만 보는 것이 아니라, 프로젝트별 규칙을 참고하도록 만들 수 있다는 뜻입니다. 예를 들어 "이 repository는 API error를 `{ code, message }` 형식으로 반환한다" 같은 규칙은 일반 모델이 자동으로 알 수 없습니다.

규칙을 주지 않으면 AI 리뷰는 넓고 일반적인 피드백을 만들 가능성이 커집니다. 반대로 팀이 중요하게 보는 테스트 명령, 금지 패턴, security checklist, naming rule을 제공하면 comment가 더 실무적으로 바뀔 수 있습니다. 다만 rule이 있다고 해서 모든 문제가 해결되는 것은 아닙니다. 규칙 자체도 오래되거나 모호할 수 있으므로 사람이 계속 관리해야 합니다.

### 5. 보안과 business logic은 별도 수동 검토가 필요하다

AI 리뷰 도구와 자동 분석은 위험 신호를 줄 수 있습니다. 하지만 OWASP KB가 말하는 human expertise와 contextual understanding은 여전히 필요합니다. 예를 들어 input validation이 코드상으로는 있어 보이지만, 실제 business rule에서는 특정 role만 접근해야 하는 데이터일 수 있습니다. 이런 판단은 diff만으로 충분하지 않을 수 있습니다.

그래서 안전한 리뷰 루프는 두 층으로 나뉩니다. 첫째, AI와 자동 도구가 diff의 obvious issue, code smell, potential security issue를 표시합니다. 둘째, 사람 reviewer가 요구사항, data flow, 권한, 테스트 결과를 보며 실제 merge 판단을 합니다. 이 두 층이 분리되어야 AI review가 생산성 도구가 되지, 책임 회피 장치가 되지 않습니다.

```ts
type AiReviewComment = {
  file: string
  line: number
  message: string
  suggestedChange?: string
}

type HumanDecision = "fix" | "discuss" | "dismiss"

function triageAiReview(comment: AiReviewComment, changedFileIsCritical: boolean): HumanDecision {
  const message = comment.message.toLowerCase()

  if (message.includes("security") || message.includes("bug")) {
    return "fix"
  }

  if (changedFileIsCritical) {
    return "discuss"
  }

  return comment.suggestedChange ? "discuss" : "dismiss"
}

const decision = triageAiReview(
  {
    file: "src/auth/session.ts",
    line: 42,
    message: "Possible security issue around session validation.",
    suggestedChange: "Add an explicit null check before returning the session.",
  },
  true,
)

console.log(decision)
```

이 예시는 AI comment를 그대로 적용하지 않고 사람이 분류하는 흐름을 보여줍니다. 메시지가 bug나 security를 언급하면 우선 수정 또는 검토 대상으로 올리고, critical file이면 suggested change가 있어도 토론 대상으로 둡니다. 실제 프로젝트에서는 이 분류 뒤에 diff review와 test가 붙습니다.

## 스펙과 세부

### Comment review는 approval이 아니다

Copilot code review가 Comment review를 남긴다는 사실은 운영상 매우 중요합니다. Comment는 의견입니다. Approve나 Request changes와 다르게 required approval로 계산되지 않는다고 KB가 정리합니다. 따라서 branch protection이나 required review 정책이 있는 팀에서는 AI review를 merge gate의 보조 신호로만 다뤄야 합니다.

이 차이는 초보자가 특히 자주 헷갈립니다. 화면에 "review"라는 단어가 보이면 승인까지 끝난 것처럼 느낄 수 있습니다. 하지만 PR review에는 서로 다른 상태가 있고, AI review가 어떤 상태를 남기는지 문서로 확인해야 합니다. "AI가 리뷰했다"와 "사람 reviewer가 승인했다"는 다른 사건입니다.

### Suggested changes는 적용 전 검증 대상이다

Suggested change는 편리합니다. 몇 번의 클릭으로 patch를 적용할 수 있다면 review 속도가 빨라집니다. 하지만 빠른 적용은 빠른 검증을 요구합니다. 제안이 문제를 해결하는지, 새 문제를 만들지 않는지, 프로젝트 규칙과 맞는지 확인해야 합니다.

특히 AI가 제안한 fix는 좁은 줄만 고칠 수 있습니다. 문제의 원인이 더 넓은 data flow나 요구사항 불일치에 있다면 suggested change가 표면만 가릴 수 있습니다. 그래서 suggested change를 볼 때는 "이 patch가 왜 필요한가", "어떤 test가 이 patch의 효과를 보여주는가", "비슷한 코드가 다른 파일에도 있는가"를 함께 묻습니다.

### Repository instruction은 리뷰의 context layer다

Repository custom instructions와 BUGBOT.md 같은 규칙 파일은 review tool에 context를 주는 층입니다. 여기에는 coding standard, test command, domain rule, 금지 패턴, review priority를 담을 수 있습니다. KB가 말한 repository knowledge는 AI review를 일반 조언에서 프로젝트 조언으로 옮기는 장치입니다.

그러나 instruction은 짧고 검증 가능해야 합니다. 너무 많은 규칙을 넣으면 중요한 규칙이 묻히고, 오래된 규칙은 잘못된 comment를 만들 수 있습니다. 실무에서는 "보안 관련 변경은 반드시 auth test를 확인한다", "API response shape는 기존 contract를 유지한다"처럼 review decision에 직접 영향을 주는 규칙부터 둡니다.

### AI review와 secure code review는 역할이 다르다

AI review는 후보 문제를 빠르게 보여줄 수 있습니다. Secure code review는 application logic, data flow, implementation details를 분석해 취약점을 찾는 더 넓은 활동입니다. OWASP KB가 강조하는 automated tools의 한계 때문에, 보안 관련 PR에서는 AI comment만 보고 끝내지 않아야 합니다.

예를 들어 authentication, authorization, session, input validation, sensitive data 흐름이 바뀐 PR은 AI review comment가 없더라도 사람이 깊게 읽어야 합니다. 반대로 AI가 comment를 남겼더라도 실제 위험이 아닐 수 있습니다. 두 경우 모두 최종 판단은 사람이 변경 의도와 시스템 맥락을 연결해 내립니다.

## 원문으로 읽기

> "reviews code written in any language"
>
> — 어떤 언어로 작성된 코드든 검토한다.
> [GitHub Docs — About GitHub Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)

이 문장은 AI 코드 리뷰 도구의 범위가 특정 언어에만 묶이지 않는다는 점을 보여줍니다. 하지만 "any language"는 "모든 프로젝트 맥락을 완벽히 이해한다"는 뜻이 아닙니다. 언어 문법과 diff 패턴을 넓게 볼 수 있어도, 팀의 domain rule과 release risk는 별도의 context로 제공하고 사람이 확인해야 합니다.

> "Bugbot reviews pull requests"
>
> — Bugbot은 pull request를 리뷰한다.
> [Cursor Docs — Bugbot](https://cursor.com/docs/bugbot)

이 인용은 AI 리뷰 도구가 PR이라는 협업 단위 위에서 작동한다는 점을 압축합니다. PR은 변경 범위, 토론, review 상태가 모이는 장소입니다. AI review를 단독 기능으로 보지 말고 PR workflow의 comment 생산자로 이해해야 합니다.

> "approve or request changes"
>
> — 승인하거나 변경을 요청한다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

사람 reviewer가 내리는 최종 상태를 설명하는 구절입니다. AI comment가 있어도 approve 또는 request changes는 사람이 선택해야 합니다. 이 문장을 기준으로 보면 AI review는 merge 판단 자체가 아니라 merge 판단을 위한 evidence와 질문을 제공하는 단계입니다.

> "automated tools often miss"
>
> — 자동화 도구가 종종 놓친다.
> [OWASP Cheat Sheet Series — Secure Code Review](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html)

AI 리뷰 도구를 과신하지 않게 만드는 중요한 문장입니다. 자동 도구는 pattern과 signal을 잘 찾을 수 있지만, business logic이나 context-specific vulnerability를 항상 잡는 것은 아닙니다. 이 한계를 인정해야 AI review와 manual review를 함께 설계할 수 있습니다.

## 실전에서

### PR을 열자마자 초벌 review를 요청한다

AI 리뷰 도구는 PR 초반에 유용합니다. 사람이 전체 diff를 깊게 읽기 전에 AI comment를 받아 obvious issue와 suggested change 후보를 확인합니다. 이때 목적은 "AI가 OK를 줬는지"가 아니라 "사람이 먼저 확인할 지점이 생겼는지"입니다.

실무 루틴은 단순합니다. PR을 만들고, 변경 목적과 관련 issue를 적고, AI review를 요청합니다. 받은 comment를 fix, discuss, dismiss로 분류합니다. fix는 수정 후 테스트를 돌리고, discuss는 사람 reviewer와 확인하며, dismiss는 왜 무시했는지 간단히 남깁니다. 이 기록이 있어야 AI comment가 review noise가 아니라 review artifact가 됩니다.

### 프로젝트 규칙을 리뷰 도구에 알려준다

Repository custom instructions나 Bugbot rule에는 팀이 실제로 지키는 규칙을 둡니다. 예를 들어 API response contract, test command, 보안 민감 파일, 금지 dependency, style rule을 넣을 수 있습니다. 규칙은 짧고 reviewable해야 합니다. "좋은 코드 작성" 같은 문장은 comment 품질을 거의 바꾸지 못합니다.

좋은 규칙은 행동을 바꿉니다. "Auth/session 변경에는 session 만료 test가 필요하다"처럼 AI가 comment를 만들 때 참고할 수 있어야 합니다. 이 규칙은 사람 reviewer에게도 같은 기준을 제공합니다. 즉 repository instruction은 AI만을 위한 문서가 아니라 review 기준을 팀 안에 고정하는 문서입니다.

### AI comment를 테스트와 연결한다

AI가 bug 가능성을 지적했으면 바로 코드를 고치는 대신 어떤 test가 그 bug를 막는지 묻습니다. Suggested change가 있다면 적용 후 기존 test와 필요한 추가 test를 돌립니다. Comment가 보안 관련이면 security checklist나 관련 flow를 따로 확인합니다. 리뷰의 목표는 comment를 없애는 것이 아니라 위험을 설명 가능한 상태로 만드는 것입니다.

```text
AI review 운영 루프:
1. PR 목적과 변경 범위를 작게 작성한다.
2. AI review를 요청한다.
3. comment를 fix / discuss / dismiss로 분류한다.
4. suggested change는 diff와 test로 검증한다.
5. 사람 reviewer가 approve 또는 request changes를 결정한다.
```

## 한계와 트레이드오프

첫 번째 한계는 false positive와 false negative입니다. AI comment가 실제 문제가 아닐 수 있고, 실제 문제를 놓칠 수도 있습니다. 그래서 comment 개수를 품질 지표로 삼으면 안 됩니다. 중요한 것은 comment가 요구사항, diff, test, 보안 맥락과 어떻게 연결되는지입니다.

두 번째 trade-off는 속도와 검토 깊이입니다. Suggested change를 빠르게 적용하면 작은 문제는 빨리 고칠 수 있습니다. 하지만 patch가 왜 맞는지 읽지 않으면 codebase에 설명되지 않은 변경이 들어갑니다. 빠른 수정은 반드시 빠른 검증과 함께 움직여야 합니다.

세 번째 한계는 프로젝트 context입니다. AI review 도구가 repository rule을 참고할 수 있어도 모든 팀 정책, 제품 의도, 고객 영향, release timing을 자동으로 알지는 못합니다. 특히 security와 business logic은 사람의 contextual understanding이 필요합니다.

네 번째 한계는 책임 착시입니다. "AI가 리뷰했다"는 말이 "안전하다"로 바뀌는 순간 위험합니다. AI review는 검토를 시작하게 하는 신호이고, merge 책임은 여전히 사람과 팀에 있습니다. 이 경계를 지키면 AI 리뷰 도구는 review workflow를 더 빠르고 촘촘하게 만들 수 있습니다.

## 더 읽기

이 강의의 근거 KB는 `ai-code-review-tools`입니다. 먼저 GitHub Copilot code review 개념 문서에서 AI review의 범위와 목적을 확인하세요. 다음으로 Copilot code review 사용 문서에서 Comment review와 suggested changes의 의미를 읽습니다. Cursor Bugbot 문서는 PR 리뷰 도구가 어떤 문제 후보를 찾는지 확인하는 데 좋습니다. GitHub pull request review 문서는 comment, approve, request changes의 차이를 이해하는 기준입니다. 마지막으로 OWASP Secure Code Review 문서를 읽으며 자동 도구가 놓칠 수 있는 수동 검토 영역을 확인하세요.

다음 학습 순서는 `code-change-risk-analysis`입니다. AI review comment를 받는 것만으로는 충분하지 않습니다. 어떤 파일과 변경이 더 위험한지, 어떤 alert를 우선 검토해야 하는지, 어떤 경우 request changes가 필요한지 판단할 수 있어야 합니다. 그 뒤 `ai-assisted-testing-loop`로 넘어가면 AI review에서 나온 문제 후보를 실제 test와 regression case로 연결할 수 있습니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 4개를 원문 그대로 사용했습니다. 본문은 승인 KB의 GitHub, Cursor, OWASP 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 AI review comment를 사람이 triage하는 독립 TypeScript 예시입니다.
