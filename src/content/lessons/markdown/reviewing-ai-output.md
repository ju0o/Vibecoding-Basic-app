## 한 줄 정의

AI 결과물 리뷰는 AI가 만든 코드·문서·답변을 그대로 수용하지 않고, 실제로 바뀐 부분과 검증 증거를 읽은 뒤 comment·approve·request changes 중 하나의 결정으로 닫는 절차입니다. GitHub는 pull request review를 "one of the primary ways people collaborate on GitHub"라고 설명합니다. AI 출력도 이 협업 절차 안에서 검토됩니다 — 혼자 즉시 믿는 것이 아니라, ==작성자가 사람인지 AI인지가 아니라 무엇이 바뀌었고 검증 증거가 있는가를 기준으로== 판단합니다.

AI는 유창합니다. 문법이 매끄럽고 설명이 그럴듯합니다. 그러나 유창함은 정확함이 아닙니다. 이 강의는 그 유창함이 검증을 건너뛰게 만드는 것을 막고, "그럴듯함"을 "검증됨"과 분리하는 리뷰 규율을 다룹니다.

![AI 결과물 리뷰: 변경에서 출발해 검증 증거를 확인하고 comment·approve·request changes 결정으로 닫는 흐름](/lesson-diagrams/reviewing-ai-output/review-decision.svg)

## 왜 존재하는가

AI 코딩 도구는 즉시 답을 줍니다. 그 답은 대개 그럴듯하고, 종종 맞습니다. 문제는 "종종 맞음"이 "항상 맞음"이 아니라는 점입니다. 환각과 검증 강의에서 봤듯 AI는 사실이나 제공된 context와 불일치하는 내용을 자신 있게 만들 수 있습니다. 유창한 출력은 사람이 검증을 건너뛰고 승인하도록 유혹합니다.

리뷰 절차는 이 유혹에 대한 방어입니다. GitHub의 pull request review는 오래된 협업 도구지만, 그 구조가 AI 출력 검토에 그대로 유용합니다. 리뷰는 변경을 협업적으로 검토하고, 특정 부분을 지목해 논의하며, 마지막에 명확한 결정을 남깁니다. ==AI 출력에 이 절차를 적용하면 "믿을지 말지"라는 감정적 판단이 "무엇을 검증했고 어떤 결정을 내리는가"라는 절차적 판단으로 바뀝니다==.

핵심은 기준의 이동입니다. 사람의 PR을 리뷰할 때와 AI의 출력을 리뷰할 때, 확인해야 할 것은 같습니다: 변경이 요구를 충족하는가, 동작하는가, 검증되었는가. "AI가 만들었으니 빠르다"는 속도의 이점이지 검증 면제의 근거가 아닙니다. 리뷰 절차는 이 기준을 작성자와 무관하게 유지시킵니다.

## 작동 원리

### 리뷰는 협업 절차다

GitHub는 pull request review를 "one of the primary ways people collaborate on GitHub"라고 설명합니다. 리뷰의 본질은 혼자 즉시 수용하는 것이 아니라, 변경을 검토 대상으로 놓고 확인하는 것입니다. AI 출력을 리뷰한다는 것은 그것을 "완성품"이 아니라 "제안된 변경(proposed change)"으로 대한다는 뜻입니다.

이 관점의 전환이 첫 단계입니다. AI 답변을 명령처럼 실행하지 않고, 검토가 필요한 제안으로 받으면 자연스럽게 확인 질문이 생깁니다.

### 리뷰는 세 가지 결정으로 끝난다

GitHub의 리뷰는 세 상태 중 하나로 제출됩니다. Comment는 "Share feedback without approving or requesting changes", Approve는 "Approve the changes for merging", Request changes는 "Identify issues that must be fixed before merging"입니다. 리뷰의 끝은 감상이나 애매한 수용이 아니라 이 셋 중 하나의 명확한 결정입니다.

AI 출력에 적용하면: 검증 증거가 충분하고 요구를 충족하면 approve, 고쳐야 할 문제가 있으면 request changes, 논의나 질문만 필요하면 comment입니다. 결정으로 닫아야 리뷰가 merge gate 역할을 합니다.

### 리뷰는 변경에서 출발한다

리뷰는 changed files와 differences에서 시작합니다. AI가 준 답변 전체를 인상으로 평가하지 않고, 실제로 무엇이 바뀌었는지를 봅니다. 코드라면 diff를, 문서라면 추가·삭제된 문장을, 답변이라면 어떤 주장이 새로 도입됐는지를 확인합니다.

변경에서 출발하면 리뷰가 구체적이 됩니다. "전반적으로 좋아 보인다" 대신 "이 함수가 이 조건을 바꿨는데 의도한 것인가"라는 질문이 생깁니다.

### 결정의 근거는 검증 증거다

Approve는 검증이 충분할 때의 결정입니다. AI가 "동작합니다", "안전합니다"라고 해도 그것은 주장입니다. 환각과 검증 강의의 관점에서, 이 주장은 테스트 결과, 실행 로그, before/after 비교 같은 증거로 확인되어야 결정의 근거가 됩니다. 증거가 없으면 approve가 아니라 "증거를 요구하는" request changes 또는 comment가 맞습니다.

## 스펙과 세부

### 줄 단위로 지목하고 논의한다

GitHub는 "comment on specific lines, suggest changes for authors to apply directly, and discuss implementation approaches"를 지원합니다. AI 출력 리뷰에도 이 정밀도가 유용합니다. 의심되는 부분을 통째로 반려하는 대신, 특정 줄이나 특정 주장을 지목해 "이 부분의 근거는 무엇인가", "이 조건은 왜 필요한가"를 묻습니다. 지목은 AI에게 수정 범위를 좁혀 주고, 사람에게는 검증 지점을 명확히 합니다.

### 위험에 따라 리뷰 깊이를 배정한다

모든 AI 출력을 같은 깊이로 검토할 수는 없습니다. 코드 변경 위험 분석 강의의 관점을 빌리면, auth·데이터·API 계약·의존성 같은 고위험 영역은 깊게, UI copy·문서 같은 저위험 영역은 가볍게 봅니다. 리뷰 깊이는 출력의 길이가 아니라 실패 비용에 맞춥니다.

### 리뷰 기준을 팀 규칙으로 문서화한다

무엇이 approve이고 무엇이 request changes인지 사람마다 다르면 리뷰가 흔들립니다. 예를 들어 "테스트 없는 로직 변경은 request changes", "보안 경고가 남은 변경은 request changes", "문서만 바뀐 변경은 낮은 위험"처럼 기준을 문서화하면, AI 출력이든 사람 PR이든 일관되게 검토됩니다.

## 원문으로 읽기

> "Pull request reviews are one of the primary ways people collaborate on GitHub."
>
> — Pull request 리뷰는 사람들이 GitHub에서 협업하는 주요 방법 중 하나다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

리뷰가 개인의 즉시 수용이 아니라 협업 절차임을 보여줍니다. AI 출력을 "완성품"이 아니라 "제안된 변경"으로 대하는 관점의 근거입니다.

> "Comment: Share feedback without approving or requesting changes."
>
> — Comment: 승인이나 변경 요청 없이 피드백을 공유한다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

Comment는 결정을 유보한 채 논의만 하는 상태입니다. 질문이나 근거 요청이 여기 해당합니다.

> "Approve: Approve the changes for merging."
>
> — Approve: 변경을 merge용으로 승인한다.
> [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

Approve는 검증이 충분할 때의 결정입니다. 유창함이 아니라 증거가 이 결정을 뒷받침해야 합니다.

관련 원문(링크): [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

Request changes는 merge를 막는 결정입니다. 검증 부족, 미해결 경고, 요구 불일치가 여기 해당합니다.

관련 원문(링크): [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)

줄 단위 지목과 수정 제안의 근거입니다. AI 출력의 특정 부분을 지목해 근거를 묻거나 수정을 요청하는 정밀도를 줍니다.

## 실전에서

### AI 답변을 "제안"으로 받는다

AI가 준 코드나 답을 즉시 실행·병합하지 않고, "이것은 제안이고 나는 리뷰어다"라는 자세로 받습니다. 이 한 번의 전환이 검증 질문을 만들어냅니다.

### 주장에 증거를 요구한다

"동작합니다", "테스트했습니다"라는 말에 실제 테스트 결과나 실행 로그를 붙이게 합니다. 증거 없는 주장은 approve의 근거가 아니라 request changes의 사유입니다.

### 의심 지점을 줄 단위로 지목한다

전체를 반려하는 대신 특정 부분을 지목해 "이 줄의 근거는", "이 조건은 왜"를 묻습니다. 수정 범위가 좁아지고 재작업이 줄어듭니다.

### 결정으로 닫는다

리뷰를 comment·approve·request changes 중 하나로 명확히 닫습니다. 애매하게 "일단 써보자"로 넘기지 않습니다. 결정이 없으면 리뷰는 gate가 아니라 형식이 됩니다.

## 한계와 트레이드오프

첫 번째 한계는 리뷰 비용입니다. 모든 AI 출력을 깊게 검토하면 AI가 준 속도 이점이 사라집니다. 그래서 리뷰 깊이를 변경 위험에 맞춰야 합니다 — 저위험 출력은 가볍게, 고위험 출력은 깊게.

두 번째 trade-off는 과신과 과의심 사이의 균형입니다. AI 출력을 무조건 믿으면 품질이 떨어지고, 무조건 의심하면 생산성이 떨어집니다. 기준은 작성자가 아니라 검증 증거이므로, 증거가 강하면 빠르게 approve하고 약하면 request changes합니다.

세 번째 한계는 검증 증거 자체의 한계입니다. 테스트가 통과해도 테스트되지 않은 경로는 확인되지 않습니다. "테스트 통과"는 강한 신호이지 완전한 증명이 아니므로, 고위험 변경은 manual 확인을 더합니다.

네 번째 한계는 리뷰어의 맥락 부족입니다. AI가 다룬 도메인을 리뷰어가 잘 모르면 검증이 얕아집니다. 이럴 때는 리뷰를 approve로 닫지 말고, 도메인을 아는 사람에게 comment로 넘기거나 request changes로 근거를 더 요구하는 것이 안전합니다.

## 더 읽기

이 강의의 근거 KB는 `reviewing-ai-output`입니다. 먼저 GitHub의 About pull request reviews를 읽고 comment·approve·request changes 세 상태의 정의를 확인하세요. 그 다음 Reviewing proposed changes in a pull request에서 리뷰가 changed files와 diff에서 출발하는 흐름을 봅니다. 이 두 출처가 이 강의 인용의 원문입니다.

선행 강의로 `hallucination-and-verification`을 읽으면 AI 출력의 "그럴듯함"을 검증 증거로 다루는 관점을 얻고, `code-change-risk-analysis`는 리뷰 깊이를 위험에 맞추는 방법을 줍니다. 함께 읽으면 좋은 강의는 `refactoring-with-ai`로, 리팩터링 결과물을 동작 보존 증거 기준으로 리뷰하는 구체적 사례를 다룹니다. 리뷰 판단 기준을 남에게 설명하는 능력은 이후 explanation-practice 모듈로 이어집니다.
