## 한 줄 정의

위험과 검증 설명은 코드 변경을 "괜찮다" 또는 "위험하다"로 느슨하게 평가하지 않고, 변경 지점, 실패 비용, 검증 증거, 리뷰 결정을 연결해 말하는 기술입니다. AI가 만든 변경에서는 이 설명이 더 중요해집니다. 변경 속도는 빨라졌지만, 사용자의 데이터 노출, 권한 오류, 잘못된 배포 같은 실패 비용은 그대로 남아 있기 때문입니다. ==위험 설명의 핵심은 불안의 크기를 말하는 것이 아니라, 어떤 증거가 어떤 위험을 줄였는지 추적 가능하게 만드는 것==입니다.

이 강의는 설명 연습 모듈의 reference입니다. 앞에서 AI 출력 검토, 코드 변경 위험 분석, AI 보조 테스트 루프를 배웠다면 이제 그 결과를 남에게 설명할 수 있어야 합니다. "CodeQL alert가 없고 Playwright 테스트가 통과했으니 approve합니다"라는 말은 충분해 보이지만, 권한 변경처럼 business context가 중요한 영역에서는 빠진 증거가 있을 수 있습니다. 반대로 "위험합니다"라는 말만 반복하면 어떤 조치가 필요한지 알 수 없습니다.

따라서 위험과 검증 설명은 네 개의 질문으로 시작합니다. 무엇이 바뀌었는가. 실패하면 누구에게 어떤 피해가 생기는가. 어떤 증거로 확인했는가. 지금 리뷰 결정은 comment, approve, request changes 중 무엇인가. 이 네 질문이 연결되면 AI 시대의 코드 리뷰는 감정적 의심이 아니라 검증 가능한 협업 언어가 됩니다.

![위험과 검증 설명 흐름: 변경 지점, 실패 비용, 검증 증거, 리뷰 결정이 하나의 evidence packet으로 이어짐](/lesson-diagrams/explain-risk-and-verification/risk-verification-packet.svg)

## 왜 존재하는가

Pull request review는 merge 전에 변경을 검토하고 의견, 승인, 수정 요청을 남기는 협업 절차입니다. GitHub 문서의 흐름처럼 리뷰어는 변경에 대해 comment를 달 수도 있고, approve할 수도 있고, merge 전에 고쳐야 할 issue를 식별할 수도 있습니다. 이 구조가 필요한 이유는 코드 변경이 개인의 머릿속에서 끝나지 않고, 팀의 제품과 사용자에게 영향을 주기 때문입니다.

AI 코딩 도구는 이 필요를 없애지 않습니다. 오히려 더 크게 만듭니다. AI는 diff를 빠르게 만들지만, 그 diff가 제품의 의도, 권한 정책, 데이터 흐름, 배포 환경과 맞는지 자동으로 보장하지 않습니다. ==AI가 만든 코드를 검토한다는 것은 AI의 문장을 평가하는 일이 아니라, 실제 변경이 만든 위험과 증거를 분리해 판단하는 일==입니다.

위험 설명이 없으면 팀은 두 가지 극단으로 흔들립니다. 첫 번째는 속도에 취해 "테스트가 통과했으니 됐다"라고 말하는 것입니다. 이 경우 테스트가 실제로 무엇을 확인했는지, 권한이나 비즈니스 규칙은 확인했는지 빠질 수 있습니다. 두 번째는 AI 출력 전체를 막연히 불신하는 것입니다. 이 경우 어떤 증거를 더 모으면 승인 가능한지 정하지 못합니다.

위험과 검증 설명은 이 사이에 있는 절차입니다. CodeQL 같은 정적 분석은 취약점과 오류 신호를 보여줍니다. Playwright 테스트는 사용자의 action과 expectation을 통해 동작 증거를 제공합니다. OWASP Authorization 관점은 권한 로직이 app business context에 맞는지 확인하라고 요구합니다. 각 증거는 서로 다른 층을 담당합니다. 하나의 증거가 모든 위험을 지우지 않기 때문에, 설명은 증거의 종류와 한계를 함께 말해야 합니다.

## 작동 원리

### 1. 변경 지점을 먼저 고정한다

위험 설명은 "이번 변경은 위험합니다"로 시작하지 않습니다. 먼저 변경 지점을 고정합니다. 어떤 파일, 어떤 route, 어떤 data access, 어떤 권한 조건, 어떤 테스트가 바뀌었는지 말합니다. 변경 지점이 흐리면 실패 비용도 흐려집니다. 예를 들어 버튼 문구 변경과 authorization guard 변경은 모두 한 줄 diff일 수 있지만, 실패 비용은 완전히 다릅니다.

변경 지점을 고정할 때는 code surface와 product surface를 함께 봅니다. Code surface는 파일과 함수입니다. Product surface는 사용자가 실제로 영향을 받는 흐름입니다. "src/auth/session.ts의 조건문이 바뀌었다"는 code surface이고, "비로그인 사용자가 관리자 데이터를 볼 가능성이 생긴다"는 product surface입니다. 좋은 위험 설명은 두 surface를 연결합니다.

### 2. 실패 비용을 사용자와 데이터 기준으로 말한다

다음 단계는 실패 비용입니다. 위험은 단순히 버그 가능성이 아니라 실패했을 때의 비용입니다. UI 정렬이 틀어지면 사용성이 떨어질 수 있습니다. 결제 금액 계산이 틀리면 금전 피해가 생깁니다. 권한 확인이 빠지면 다른 사용자의 데이터가 노출될 수 있습니다. 같은 변경량이라도 실패 비용이 다르면 요구되는 검증 깊이가 달라집니다.

여기서 중요한 것은 추측을 부풀리지 않는 것입니다. "큰일 날 수 있다"보다 "이 route는 관리자만 접근해야 하는데 guard 조건이 바뀌었으므로 일반 사용자의 접근 가능성을 확인해야 한다"가 낫습니다. ==위험 문장은 변경 지점과 실패 비용을 한 문장 안에서 연결할 때 행동 가능해집니다==.

### 3. 증거를 종류별로 분리한다

검증 증거는 하나가 아닙니다. CodeQL code scanning은 vulnerabilities and errors를 찾는 정적 분석 증거입니다. Playwright test는 action을 수행하고 기대 상태를 assertion으로 확인하는 동작 증거입니다. Authorization 검토는 route와 data 접근이 business context에 맞는지 확인하는 정책 증거입니다. GitHub PR review의 결정은 이 증거들을 읽은 뒤의 협업 상태입니다.

초보자는 테스트 통과를 모든 검증의 대표로 쓰기 쉽습니다. 그러나 테스트가 화면 텍스트만 확인했다면 SQL query의 인덱스나 RLS 정책을 보장하지 않습니다. CodeQL alert가 없다고 해서 business rule이 맞는 것도 아닙니다. 따라서 설명에서는 "어떤 증거가 있다"와 "어떤 증거는 아직 없다"를 같이 말해야 합니다.

### 4. 자동 신호와 사람 판단을 분리한다

CodeQL alert는 중요한 risk signal입니다. GitHub 문서는 pull request 안에서 highlighted code를 review하고 alert를 resolve할 수 있는 흐름을 설명합니다. 하지만 alert가 자동으로 모든 판단을 끝내는 것은 아닙니다. Alert는 위치와 패턴을 알려주지만, 실제 제품의 의도와 권한 정책까지 모두 알지는 못합니다.

반대로 자동 alert가 없다는 사실도 안전 증명이 아닙니다. 특히 authorization logic은 app business context에 맞아야 합니다. 이 말은 "코드가 문법적으로 맞다"와 "제품 정책에 맞다"가 다르다는 뜻입니다. AI 시대의 좋은 리뷰어는 자동 도구를 무시하지도, 자동 도구에 판단을 넘기지도 않습니다. 도구의 신호를 증거 묶음 안에 넣고, 사람이 확인해야 할 맥락을 따로 표시합니다.

### 5. 동작 검증은 action과 expectation으로 설명한다

동작 검증은 "해봤다"가 아니라 어떤 action을 수행했고 어떤 state를 expectation으로 확인했는지 말해야 합니다. Playwright 문서의 핵심은 테스트가 action을 수행하고 state를 expectation과 비교한다는 구조입니다. 따라서 위험 설명에서는 "로그인 후 관리자 페이지에 접근했다"보다 "일반 사용자 세션으로 `/admin`에 접근했을 때 접근 거부 문구가 보이고 table data가 렌더되지 않음을 확인했다"가 더 좋습니다.

이 차이는 AI prompt에도 중요합니다. AI에게 "테스트 추가해줘"라고만 하면 happy path 테스트를 만들 수 있습니다. 그러나 위험 설명을 먼저 만들면 AI에게 줄 테스트 요청도 정확해집니다. "권한 없는 사용자, 권한 있는 관리자, 세션 만료 케이스를 나누어 action과 expectation을 작성하라"처럼 검증해야 할 증거를 지정할 수 있습니다.

### 6. 리뷰 결정을 언어로 닫는다

마지막 단계는 결정입니다. GitHub PR review에는 approve와 request changes 같은 명확한 결정 언어가 있습니다. 증거가 충분하고 남은 위험이 허용 가능하면 approve입니다. Merge 전에 고쳐야 할 issue가 있으면 request changes입니다. 아직 판단보다 논의가 필요한 경우는 comment입니다.

결정 언어가 중요한 이유는 설명의 끝을 흐리지 않기 위해서입니다. "조금 더 봐야 할 것 같습니다"라는 말은 무엇을 해야 하는지 남기지 않습니다. "CodeQL alert는 없고 Playwright 권한 테스트는 통과했지만, business context상 plan별 data access 검토가 빠졌으므로 request changes입니다"는 다음 행동을 만듭니다.

```ts
type Evidence = {
  kind: "static-analysis" | "behavior-test" | "authorization-review"
  description: string
  passed: boolean
}

type ReviewDecision = "comment" | "approve" | "request changes"

function decideRiskReview(evidence: Evidence[]): ReviewDecision {
  const failedEvidence = evidence.filter((item) => !item.passed)
  const hasAuthorizationEvidence = evidence.some((item) => item.kind === "authorization-review")

  if (failedEvidence.length > 0) {
    return "request changes"
  }

  if (!hasAuthorizationEvidence) {
    return "comment"
  }

  return "approve"
}

const decision = decideRiskReview([
  { kind: "static-analysis", description: "CodeQL alert 확인", passed: true },
  { kind: "behavior-test", description: "권한 없는 사용자의 /admin 접근 거부", passed: true },
  { kind: "authorization-review", description: "관리자 데이터 접근 정책 확인", passed: true },
])

console.log(decision)
```

이 예시는 실제 리뷰 시스템을 대신하지 않습니다. 다만 위험과 검증 설명이 어떻게 결정으로 닫히는지 보여줍니다. 정적 분석과 동작 테스트가 통과해도 권한 검토가 빠지면 바로 approve하지 않고 comment로 남깁니다. 실패한 증거가 있으면 request changes가 됩니다.

> [!KEY]
> 위험 설명은 "테스트 통과"를 한 줄로 적는 일이 아닙니다. 변경 지점, 실패 비용, 증거 종류, 리뷰 결정을 연결해 다음 행동이 보이게 만드는 일입니다.

## 스펙과 세부

### Review decision은 증거의 결론이다

GitHub PR review에서 approve는 merge 가능하다는 신호이고, request changes는 merge 전에 고쳐야 할 issue를 식별하는 결정입니다. 이 두 단어는 감정 표현이 아닙니다. 증거를 읽은 뒤 협업 상태를 바꾸는 동작입니다. 따라서 위험 설명은 "왜 approve인지" 또는 "왜 request changes인지"를 증거로 보여줘야 합니다.

Approve가 가능한 경우에도 남은 위험이 0이라는 뜻은 아닙니다. 소프트웨어 변경에는 항상 잔여 위험이 있습니다. Approve는 현재 변경 범위와 증거 수준에서 merge를 막을 issue가 없다는 결정입니다. 반대로 request changes는 코드가 나쁘다는 낙인이 아니라 merge 전에 반드시 고쳐야 하는 조건이 있다는 의미입니다.

### CodeQL과 code scanning은 정적 분석 층이다

CodeQL code scanning은 코드의 vulnerabilities and errors를 찾는 데 쓰이는 정적 분석 신호입니다. PR 안에서 highlighted code와 alert를 볼 수 있으면 리뷰어는 문제 위치와 suggested context를 빠르게 확인할 수 있습니다. 이 신호는 AI가 만든 diff에서도 동일하게 중요합니다. AI가 안전해 보이는 이름의 helper를 추가했더라도 실제로는 injection, unsafe path, 잘못된 validation 같은 패턴이 있을 수 있기 때문입니다.

그러나 정적 분석은 제품 의도를 모릅니다. CodeQL alert가 없다는 사실은 "CodeQL이 찾는 유형의 alert가 현재 없었다"에 가깝습니다. 제품 정책과 권한 경계는 별도의 설명이 필요합니다. 이 한계를 말하지 않으면 팀은 자동 도구를 과신하게 됩니다.

### Playwright 증거는 실행된 행동과 기대 상태로 기록한다

Playwright의 테스트 설명은 action과 assertion의 구조를 분명히 합니다. 위험 설명에서 "E2E 테스트 통과"라고만 쓰면 증거가 흐립니다. 어떤 role로 로그인했는지, 어떤 route에 접근했는지, 어떤 UI state를 기대했는지, 어떤 data가 보이지 않아야 하는지 기록해야 합니다.

특히 권한 변경의 경우 부정 검증이 중요합니다. 관리자가 데이터를 볼 수 있다는 테스트만으로는 일반 사용자가 못 본다는 사실을 보장하지 않습니다. 그래서 검증 문장에는 성공 케이스와 거부 케이스를 나눠 써야 합니다.

### Authorization은 business context와 연결된다

OWASP Authorization 관점은 authorization logic이 app business context에 맞아야 한다고 말합니다. 이 문장은 AI 시대에 특히 중요합니다. AI는 코드 패턴을 잘 만들 수 있지만, 제품의 plan 정책, 조직 역할, 내부 운영 권한, 데이터 소유권 같은 business context는 prompt에 없으면 알 수 없습니다.

따라서 권한 변경 리뷰에서는 "권한 체크 코드가 있다"보다 "이 제품에서 어떤 사용자 집합이 어떤 data에 접근해야 하는가"를 먼저 확인해야 합니다. 그리고 그 정책이 코드, 테스트, 수동 검토 증거에 반영되었는지 설명해야 합니다.

## 원문으로 읽기

> "Approve the changes for merging"
>
> — 변경 사항을 병합해도 된다고 승인한다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

이 문장은 approve가 단순한 칭찬이 아니라 merge 가능 상태를 의미한다는 점을 보여줍니다. 위험 설명에서 approve를 쓰려면 검증 증거가 그 결정을 뒷받침해야 합니다. "좋아 보인다"가 아니라 "현재 변경 범위에서 필요한 증거를 확인했으므로 merge를 막을 issue가 없다"는 뜻으로 써야 합니다.

> "Identify issues that must be fixed before merging"
>
> — 병합 전에 반드시 고쳐야 하는 문제를 식별한다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

이 문장은 request changes의 무게를 정리합니다. request changes는 취향 차이를 말하는 버튼이 아닙니다. Merge 전에 고쳐야 하는 issue가 있다는 결정입니다. AI가 만든 변경에서 검증 증거가 빠졌거나 권한 흐름이 business context와 맞지 않으면 이 결정 언어를 써야 합니다.

> "identify vulnerabilities and errors in your code"
>
> — 코드의 취약점과 오류를 식별한다.
> [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql)

이 문장은 CodeQL 증거의 성격을 보여줍니다. CodeQL은 정적 분석 층에서 취약점과 오류를 찾는 신호입니다. 위험 설명에서는 이 신호를 "보안이 완전히 보장됨"으로 과장하지 않고, "정적 분석에서 확인한 증거"로 위치시켜야 합니다.

관련 원문(링크): [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests)

이 문장은 동작 검증 증거를 어떻게 표현해야 하는지 알려줍니다. 테스트 통과라는 결과보다 어떤 action과 expectation이 있었는지가 더 중요합니다. 위험 설명은 테스트 이름이 아니라 검증한 behavior를 설명해야 합니다.

## 실전에서

### PR 리뷰 코멘트를 evidence packet으로 쓴다

실무에서는 긴 보고서보다 짧고 구조화된 코멘트가 더 자주 쓰입니다. 다음 형식은 AI가 만든 변경을 리뷰할 때 그대로 사용할 수 있습니다.

```text
Change:
- /admin route의 session guard 조건이 변경됨

Risk:
- 일반 사용자가 관리자 데이터에 접근할 수 있으면 데이터 노출 위험이 있음

Evidence:
- CodeQL code scanning alert 없음
- 일반 사용자 세션으로 /admin 접근 시 접근 거부 확인
- 관리자 세션으로 table data 렌더 확인
- plan별 data access business context는 아직 확인 필요

Decision:
- comment: plan별 권한 matrix 확인 후 approve 가능
```

이 형식의 장점은 누락이 보인다는 것입니다. Evidence에 authorization business context가 빠졌다면 decision이 approve로 가기 어렵습니다. 반대로 모든 evidence가 채워졌다면 request changes가 아니라 approve가 자연스럽습니다.

### AI에게 검증 설명을 재작성시킨다

AI는 설명 초안을 정리하는 데 유용합니다. 하지만 AI에게 "위험 분석해줘"라고만 하면 넓고 흐린 답을 만들 수 있습니다. 대신 evidence packet 형식을 주고, 각 줄이 실제 diff와 테스트 결과에 근거하는지 확인하게 해야 합니다.

```text
다음 diff와 테스트 결과를 바탕으로 Risk Evidence Packet을 작성하라.

규칙:
- Change는 파일/route/data access 중 실제 변경된 것만 쓴다.
- Risk는 실패 비용을 사용자 또는 데이터 기준으로 쓴다.
- Evidence는 static-analysis, behavior-test, authorization-review로 구분한다.
- Evidence가 없으면 "미확인"이라고 표시한다.
- Decision은 comment / approve / request changes 중 하나만 고른다.
```

이 prompt는 AI가 새로운 사실을 꾸며내지 못하게 합니다. 미확인 항목은 미확인으로 남기게 하고, 결정은 증거의 결과로만 고르게 합니다. ==좋은 AI 검증 prompt는 AI의 자신감을 높이는 것이 아니라 모르는 것을 표시하게 만드는 장치==입니다.

### 권한 변경은 별도 문장으로 닫는다

권한 변경이 포함되면 리뷰 코멘트 안에 authorization 문장을 별도로 둡니다. 예를 들어 "관리자만 접근 가능한 route라는 business context를 확인했고, 일반 사용자 세션에서 데이터가 렌더되지 않음을 확인했다"처럼 씁니다. 이 문장은 UI 테스트와 다릅니다. UI가 예뻐 보이는지, 버튼이 클릭되는지보다 누가 어떤 data를 볼 수 있는지에 대한 증거입니다.

### 실패한 검증은 다음 작업으로 바꾼다

검증이 실패하면 설명은 blame으로 끝나면 안 됩니다. 어떤 evidence가 실패했는지, 다음 수정이 무엇인지 남깁니다. "Playwright test에서 일반 사용자 접근 거부 expectation이 실패했으므로 request changes입니다. Guard 조건을 role 기반으로 되돌리고 동일 테스트를 다시 실행해야 합니다"처럼 쓰면 AI agent나 동료가 바로 이어서 작업할 수 있습니다.

## 한계와 트레이드오프

위험과 검증 설명은 위험을 줄이는 언어이지, 모든 위험을 없애는 보증서가 아닙니다. CodeQL이 찾지 못하는 business logic 문제가 있을 수 있고, Playwright 테스트가 다루지 않은 edge case가 있을 수 있습니다. Authorization 검토도 제품 정책이 잘못 이해되면 틀릴 수 있습니다. 그래서 설명에는 남은 미확인 항목을 숨기지 않아야 합니다.

또한 너무 많은 증거를 요구하면 작은 변경도 merge하지 못하는 병목이 됩니다. 모든 변경에 CodeQL, E2E, 수동 권한 검토를 요구할 필요는 없습니다. 변경 지점과 실패 비용에 따라 검증 깊이를 조절해야 합니다. 문서 copy 변경과 권한 guard 변경은 같은 수준으로 다루면 안 됩니다.

흔한 오해는 "AI가 만든 코드는 모두 고위험"이라는 생각입니다. AI 사용 여부는 중요한 맥락이지만 최종 위험은 diff가 건드린 경계와 실패 비용으로 판단해야 합니다. 반대로 "AI가 test까지 만들었으니 안전"도 오해입니다. 테스트는 어떤 behavior를 확인했는지 설명될 때만 증거가 됩니다.

> [!WARNING]
> 가장 위험한 리뷰 문장은 "테스트 통과했으니 괜찮습니다"입니다. 어떤 테스트가 어떤 위험을 줄였는지 말하지 않으면, 검증 증거가 아니라 분위기 보고가 됩니다.

## 더 읽기

이 강의의 기본 순서는 GitHub PR review 문서를 먼저 읽고, CodeQL code scanning과 PR alert triage 문서를 이어서 보는 것입니다. 그다음 Playwright의 writing tests 문서로 action/assertion 기반 증거 표현을 확인하고, OWASP Authorization Cheat Sheet로 business context에 맞는 권한 검토가 왜 별도 증거인지 읽으면 좋습니다.

- [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
- [GitHub Docs — Code scanning with CodeQL](https://docs.github.com/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql)
- [GitHub Docs — Triaging code scanning alerts in pull requests](https://docs.github.com/code-security/secure-coding/triaging-code-scanning-alerts-in-pull-requests)
- [Playwright Docs — Writing tests](https://playwright.dev/docs/writing-tests)
- [OWASP Cheat Sheet Series — Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

함께 읽을 내부 강의는 `reviewing-ai-output`, `code-change-risk-analysis`, `ai-assisted-testing-loop`입니다. 이 강의들은 각각 AI 출력 검토, diff 위험 분류, 테스트 루프를 다루고, 이번 강의는 그 결과를 설명 가능한 리뷰 결정으로 닫는 역할을 합니다.
