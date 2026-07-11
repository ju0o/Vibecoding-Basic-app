## 한 줄 정의

프롬프트에서 구현 루프까지는 분해된 작업을 prompt로 전달하고, AI가 만든 구현 후보를 build, test, validate 결과로 확인한 뒤, 실패나 review feedback을 다음 prompt에 반영하는 반복 절차입니다. Copilot Chat 문서는 응답을 평가하고 follow-up request를 하라고 설명하고, Copilot cloud agent 문서는 agent가 변경을 build, test, validate할 수 있는 안내가 필요하다고 설명합니다. ==프롬프트 구현 루프의 핵심은 한 번에 완벽한 답을 얻는 것이 아니라, 검증 결과를 다음 입력으로 되돌리는 것==입니다.

이 강의는 "프롬프트를 잘 쓰면 끝난다"는 생각을 바꿉니다. 좋은 prompt는 필요하지만 충분하지 않습니다. AI가 만든 코드가 요구사항을 만족하는지, 테스트가 통과하는지, 프로젝트 규칙을 지키는지 확인해야 합니다. 그리고 확인 결과가 실패라면 그 정보를 다음 요청에 넣어 수정 방향을 좁혀야 합니다.

바이브코딩에서 이 루프는 일의 기본 리듬입니다. 사람은 목표와 성공 기준을 주고, AI는 구현 후보를 만들고, 환경은 test와 build 결과를 돌려주며, 사람은 그 결과를 해석해 다음 지시를 만듭니다. 즉 AI와 대화하는 것이 아니라, prompt, code, test, review 사이를 순환하는 작업 시스템을 운영하는 것입니다.

![프롬프트 구현 루프: prompt에서 검증 feedback까지](/lesson-diagrams/prompt-to-implementation-loop/prompt-implementation-loop.svg)

## 왜 존재하는가

한 번의 prompt만으로는 실제 개발의 불확실성을 모두 담기 어렵습니다. 요구사항이 누락될 수 있고, repository context가 부족할 수 있고, AI가 만든 코드가 typecheck를 통과하지 못할 수 있으며, test가 예상과 다르게 실패할 수 있습니다. 이때 실패를 "AI가 틀렸다"로만 보면 다음 행동이 막힙니다. 실패 로그와 review comment를 다음 prompt의 입력으로 바꾸면 루프가 이어집니다.

GitHub prompt engineering 문서는 broad description 뒤에 specific requirements를 두는 구조를 제시합니다. Copilot Chat 문서는 응답을 evaluate하고 follow-up prompt를 제출하는 흐름을 설명합니다. Repository custom instructions는 프로젝트를 이해하는 additional context를 제공하고, cloud agent 문서는 build, test, validate guidance를 강조합니다. 이 네 가지를 연결하면 prompt 구현 루프가 됩니다.

이 루프가 존재하는 이유는 AI coding output이 확률적이고 context 의존적이기 때문입니다. 첫 응답이 충분하지 않을 수 있다는 전제를 받아들이면 작업 방식이 달라집니다. ==좋은 바이브코딩은 첫 prompt의 문장력보다 실패 정보를 다음 시도로 가져가는 능력에 더 크게 좌우됩니다==. 테스트 실패, 타입 오류, review comment, 누락된 edge case는 모두 다음 prompt의 재료입니다.

Cloud agent와 IDE agent가 등장하면서 이 루프는 더 실행 중심으로 바뀌었습니다. Chat은 설명과 code suggestion을 주고, agent는 repository task를 수행할 수 있습니다. Cursor Cloud Agents KB는 cloud VM에서 build, test, changed software interaction을 수행할 수 있다고 정리합니다. 그렇기 때문에 prompt는 단순 질문이 아니라 구현, 검증, feedback을 시작하는 상태가 됩니다.

## 작동 원리

### 1. Prompt contract를 만든다

루프의 첫 입력은 prompt contract입니다. 여기에는 broad description, specific requirements, 범위, 금지 행동, 출력 기대, 검증 기준이 들어갑니다. GitHub 문서의 broad description은 목표를 전달하고, specific requirements는 무엇을 만족해야 하는지 좁힙니다. 작업 분해가 잘 되어 있다면 prompt contract는 issue나 task card에서 자연스럽게 나옵니다.

Prompt contract가 약하면 AI는 빈칸을 채웁니다. 예를 들어 "검색 개선해줘"는 모델이 UI, ranking, DB, copy 중 무엇을 바꿀지 추측하게 만듭니다. "empty state만 추가하고 검색 로직은 바꾸지 말라"는 contract는 행동 경계를 만듭니다. ==Prompt는 부탁 문장이 아니라 구현 루프의 입력 계약==입니다.

### 2. Repository instruction으로 반복 정보를 고정한다

매번 prompt에 build command, test command, style rule, architecture rule을 손으로 적으면 누락이 생깁니다. GitHub custom instructions는 Copilot에게 project 이해와 build, test, validate 방법에 대한 additional context를 제공한다고 KB가 정리합니다. 이 instruction은 반복되는 context를 repository에 고정하는 역할을 합니다.

하지만 instruction은 task prompt를 대체하지 않습니다. Repository instruction은 "이 프로젝트에서는 이렇게 일한다"를 말하고, task prompt는 "이번에는 이것을 바꾼다"를 말합니다. 둘이 함께 있을 때 루프가 안정됩니다. 공통 규칙은 instruction에, 현재 목표와 acceptance criteria는 prompt에 둡니다.

### 3. AI는 구현 후보를 만들고 환경은 관찰값을 돌려준다

AI가 만든 것은 구현 후보입니다. Chat surface에서는 코드 snippet, 설명, 수정 방향, unit test 제안이 나올 수 있습니다. Cloud agent surface에서는 repository 변경과 test 실행 결과가 나올 수 있습니다. 중요한 것은 후보 다음에 observation이 있어야 한다는 점입니다. Observation은 build output, test output, changed files, review comment, 수동 확인 결과입니다.

이 observation이 없으면 루프는 대화로만 남습니다. "좋아 보여"라는 느낌은 검증이 아닙니다. Typecheck가 통과했는지, test가 어떤 조건을 확인했는지, diff가 scope 밖 파일을 건드리지 않았는지 확인해야 합니다. AI가 agent 환경에서 build와 test를 수행할 수 있다면 그 결과를 반드시 읽어야 합니다.

### 4. Evaluate 후 follow-up prompt를 쓴다

Copilot Chat 문서의 "Evaluate Copilot's response"는 루프의 중심입니다. AI 응답을 평가한 뒤 follow-up request를 합니다. 이때 follow-up은 감정적 반복이 아니라 증거 기반 수정 요청이어야 합니다. "다시 해줘"보다 "typecheck가 `SearchResultsProps` mismatch로 실패했다. props 이름은 기존 `items`를 유지하고 empty state 조건만 추가하라"가 좋습니다.

Follow-up prompt에는 세 가지가 들어갑니다. 첫째, 무엇이 실패했는지. 둘째, 어떤 요구사항은 유지해야 하는지. 셋째, 다음 시도에서 무엇을 바꾸고 무엇을 바꾸지 말아야 하는지. 이렇게 해야 AI가 이전 실패를 새로운 context로 사용할 수 있습니다.

### 5. 루프는 stop condition을 가져야 한다

반복은 무한히 계속되면 안 됩니다. 성공 조건이 충족되면 멈춰야 하고, 같은 오류가 반복되면 사람의 수동 분석이나 작업 재분해로 전환해야 합니다. Stop condition은 "모든 acceptance criteria 충족", "verify command 통과", "review comment 해결", "3회 이상 같은 실패면 scope 재정의"처럼 정할 수 있습니다.

Stop condition이 없으면 AI와 계속 대화하면서 실제 품질은 나아지지 않을 수 있습니다. 루프는 반복 자체가 목표가 아니라 검증 가능한 개선이 목표입니다. 실패가 반복되면 prompt가 아니라 task가 너무 크거나 context가 부족하거나 요구사항이 모호한 것일 수 있습니다.

```ts
type LoopObservation = {
  testsPassed: boolean
  typecheckPassed: boolean
  reviewComments: string[]
  outOfScopeFiles: string[]
}

function hasNoReviewComments(observation: LoopObservation): boolean {
  return observation.reviewComments.length < 1
}

function nextPrompt(observation: LoopObservation): string {
  if (observation.testsPassed && observation.typecheckPassed && hasNoReviewComments(observation)) {
    return "Stop: acceptance criteria satisfied."
  }

  const issues = [
    observation.testsPassed ? "" : "- tests failed",
    observation.typecheckPassed ? "" : "- typecheck failed",
    ...observation.reviewComments.map((comment) => `- review: ${comment}`),
    ...observation.outOfScopeFiles.map((file) => `- out of scope file changed: ${file}`),
  ].filter(Boolean)

  return `Revise the implementation while preserving the original scope:\n${issues.join("\n")}`
}

console.log(
  nextPrompt({
    testsPassed: false,
    typecheckPassed: true,
    reviewComments: ["empty state appears during loading"],
    outOfScopeFiles: [],
  }),
)
```

이 예시는 observation을 다음 prompt로 바꾸는 방식입니다. 테스트 실패와 review comment를 구체적인 수정 입력으로 변환합니다. 실제 프로젝트에서는 로그, 파일명, 실패한 assertion을 더 자세히 포함합니다.

## 스펙과 세부

### Broad description과 specific requirements는 순서가 있다

Broad description은 AI가 전체 목표를 이해하게 합니다. Specific requirements는 목표를 구현 조건으로 좁힙니다. 순서가 중요합니다. 처음부터 세부 조건만 나열하면 왜 그런 변경을 하는지 흐릴 수 있고, 목표만 주면 구현 범위가 넓어집니다.

좋은 prompt는 "무엇을 만들고 싶은가" 다음에 "반드시 만족해야 하는 조건"을 둡니다. 그리고 "건드리지 말아야 할 범위"와 "검증 방법"을 붙입니다. 이 구조는 requirement-task breakdown과 이어집니다.

### Custom instructions는 장기 context다

Repository custom instructions는 매 task마다 반복되는 정보를 담습니다. 프로젝트 이해, build/test/validate 방법, coding standard, directory rule 같은 내용입니다. KB의 additional context 문구는 이 역할을 잘 보여줍니다. 하지만 instruction은 오래되면 위험해집니다. 실제 test command가 바뀌었는데 instruction이 그대로라면 AI는 잘못된 검증을 시도할 수 있습니다.

따라서 instruction은 작고 최신이어야 합니다. Task-specific detail은 prompt에 두고, 반복되는 repository rule만 instruction에 둡니다. 이렇게 나누면 prompt가 짧아지고 루프가 일관됩니다.

### Build/test/validate는 서로 다르다

Build는 산출물이 만들어지는지 확인합니다. Test는 동작 조건을 확인합니다. Validate는 요구사항과 변경 의도가 맞는지 확인하는 더 넓은 절차입니다. KB의 build, test, validate 문구는 이 세 가지를 함께 둡니다. 하나만 통과했다고 모두 끝난 것은 아닙니다.

예를 들어 typecheck와 build가 통과해도 empty state가 실제 화면에 보이지 않을 수 있습니다. Unit test가 통과해도 요구사항에서 금지한 파일을 바꿨을 수 있습니다. Validation은 test output과 review를 연결합니다.

### Cloud agent observation은 report로 남겨야 한다

Cloud agent가 build, test, changed software interaction을 수행할 수 있다면 그 결과가 루프의 observation입니다. 단순히 "작업 완료"라고 말하는 report는 부족합니다. 어떤 파일을 바꿨는지, 어떤 명령을 실행했는지, 어떤 테스트가 통과했는지, 무엇을 확인하지 못했는지 남겨야 합니다.

이 report가 있어야 사람은 다음 prompt를 정확히 만들 수 있습니다. 테스트가 실패했는지, 테스트를 실행하지 않았는지, 실행했지만 범위가 부족한지 구분해야 합니다.

## 원문으로 읽기

> "first give Copilot a broad description"
>
> — 먼저 Copilot에게 넓은 설명을 제공한다.
> [GitHub Docs — Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)

루프의 첫 상태는 목표 설명입니다. 하지만 broad description만으로 끝나면 AI가 구현 세부를 추측합니다. 이 문장은 다음 단계인 specific requirements와 함께 읽어야 합니다. 넓은 설명은 방향을 주고, 세부 조건은 검토 가능한 경계를 만듭니다.

> "Evaluate Copilot's response"
>
> — Copilot의 응답을 평가한다.
> [GitHub Docs — Asking GitHub Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide)

이 문장은 프롬프트 구현 루프의 중심입니다. AI 응답을 그대로 채택하지 않고 평가해야 다음 행동이 생깁니다. 평가 없는 follow-up은 반복일 뿐이고, 평가가 있는 follow-up은 검증 결과를 반영한 개선입니다.

> "additional context on how to understand your project"
>
> — 프로젝트를 이해하는 방법에 대한 추가 맥락.
> [GitHub Docs — Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)

Repository instruction의 역할을 보여주는 문장입니다. AI가 프로젝트를 매번 처음 보는 것처럼 일하지 않게, 반복되는 규칙과 검증 방법을 context로 제공합니다. 이 context는 task prompt와 결합되어야 합니다.

> "build, test and validate its changes"
>
> — 변경을 빌드하고 테스트하고 검증한다.
> [GitHub Docs — Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results)

구현 루프에서 observation이 왜 필요한지 설명합니다. AI가 코드를 만들었다면 build와 test로 확인하고, 요구사항과 맞는지 validate해야 합니다. 이 결과가 다음 prompt의 근거가 됩니다.

> "build, test, and interact with the changed software"
>
> — 변경된 소프트웨어를 빌드하고 테스트하고 상호작용한다.
> [Cursor Docs — Cloud Agents](https://cursor.com/docs/cloud-agent)

Cloud agent가 단순 답변을 넘어 실행 환경에서 변경을 확인할 수 있음을 보여줍니다. 그렇기 때문에 agent report에는 실제 실행 결과가 있어야 합니다. 사람이 그 결과를 읽어야 루프가 닫힙니다.

## 실전에서

### 첫 prompt는 task card에서 만든다

요구사항 분해 단계에서 만든 task card를 그대로 prompt로 옮깁니다. Goal, scope, acceptance criteria, out of scope, verification을 포함합니다. 이렇게 하면 prompt가 감에 의존하지 않고 작업 문서와 연결됩니다.

```text
Prompt skeleton:
Goal:
Scope:
Requirements:
Out of scope:
Verification:
Report format:
```

Report format을 포함하면 AI가 무엇을 돌려줘야 하는지도 분명해집니다. Changed files, summary, tests run, remaining risks를 요구하면 review가 쉬워집니다.

### 실패 로그를 다음 prompt에 붙인다

테스트가 실패하면 전체 로그를 무작정 붙이지 말고 핵심 error, 실패한 test name, 관련 파일, 유지해야 할 요구사항을 함께 줍니다. "이 에러를 고쳐"보다 "이 에러는 props mismatch이며, 기존 public API는 유지해야 한다"가 좋습니다. 실패 정보를 맥락화해야 AI가 더 좁게 수정합니다.

### Review comment를 instruction으로 바꾼다

사람 reviewer가 "loading 상태와 empty 상태가 겹친다"고 남겼다면 다음 prompt는 "loading 분기는 그대로 유지하고, loading이 false이고 결과가 0개일 때만 empty state를 보여라"가 됩니다. Review comment를 그대로 다시 말하는 것이 아니라 구현 조건으로 바꿉니다.

### 성공하면 멈추고 기록한다

모든 criteria가 충족되고 verification이 통과하면 루프를 멈춥니다. 계속 AI에게 개선을 요청하면 scope creep이 생길 수 있습니다. 종료 시에는 변경 파일, 실행한 검증, 남은 위험을 기록합니다. 이 기록은 PR description이나 release note에 연결됩니다.

## 한계와 트레이드오프

첫 번째 한계는 루프가 길어질 수 있다는 점입니다. 매번 prompt, 구현, test, feedback을 반복하면 느려 보일 수 있습니다. 하지만 한 번에 큰 변경을 맡겼다가 review에서 무너지는 것보다 작은 루프가 더 안전할 때가 많습니다.

두 번째 한계는 context 관리입니다. 이전 실패, 현재 요구사항, repository instruction이 모두 context가 됩니다. 너무 많이 넣으면 noise가 되고, 너무 적게 넣으면 AI가 같은 실수를 반복합니다. 필요한 observation만 선별하는 능력이 중요합니다.

세 번째 trade-off는 agent autonomy입니다. Agent가 build와 test까지 수행하면 편하지만, 사람이 observation을 읽지 않으면 자동 실행이 자동 승인처럼 변질됩니다. 실행 능력은 검증 책임을 줄이지 않고, 오히려 검토할 evidence를 늘립니다.

네 번째 한계는 stop condition 부재입니다. 같은 실패가 반복되는데 계속 prompt만 바꾸면 시간을 잃습니다. 이때는 task를 더 작게 나누거나, 사람이 수동으로 원인을 분석하거나, repository instruction을 보강해야 합니다.

## 더 읽기

이 강의의 근거 KB는 `prompt-implementation-loop`입니다. 먼저 GitHub Copilot prompt engineering 문서에서 broad description과 specific requirements의 흐름을 읽으세요. 그 다음 Copilot Chat in IDE 문서에서 response 평가와 follow-up request가 어떻게 설명되는지 확인합니다. Repository custom instructions 문서는 반복 context를 어디에 둘지 알려줍니다. Copilot cloud agent 문서는 build, test, validate guidance가 왜 필요한지 보여주고, Cursor Cloud Agents 문서는 cloud agent가 changed software를 확인할 수 있는 실행 환경을 이해하는 데 도움이 됩니다.

다음 학습 순서는 `ai-assisted-testing-loop`입니다. 프롬프트 구현 루프에서 가장 중요한 observation은 test 결과입니다. 이후 강의에서는 AI가 test generation을 어떻게 도울 수 있고, 사람이 어떤 assertion과 regression case를 검토해야 하는지 다룹니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다. 본문은 승인 KB의 GitHub Copilot, GitHub custom instructions, Cursor Cloud Agents 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 observation을 follow-up prompt로 바꾸는 독립 TypeScript 예시입니다.
