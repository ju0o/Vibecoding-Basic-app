## 한 줄 정의

요구사항을 작업 단위로 쪼개기는 큰 목표를 사람이 추적하고 AI가 실행할 수 있는 issue, sub-issue, task, acceptance criteria, 검증 기준으로 나누는 절차입니다. GitHub Issues는 work를 plan and track하는 단위이고, sub-issues는 더 큰 work를 tasks로 나누게 해줍니다. ==바이브코딩에서 작업 분해는 AI에게 더 많은 일을 맡기는 기술이 아니라, AI가 추측해야 하는 범위를 줄이는 기술==입니다.

이 강의의 주제는 "좋은 프롬프트 쓰기"보다 앞에 있습니다. 프롬프트는 작업의 표현이고, 작업 분해는 표현할 대상을 만드는 과정입니다. "검색 기능 개선"은 목표일 수 있지만 바로 구현 단위가 되기에는 넓습니다. "검색 결과가 0개일 때 empty state를 표시하고, 기존 검색 로직은 바꾸지 않으며, 관련 테스트를 통과시킨다"는 AI와 사람이 함께 검토할 수 있는 task에 가깝습니다.

초보자는 요구사항을 잘게 나누는 일을 문서 작업이나 관리 업무로 오해하기 쉽습니다. 하지만 AI 시대에는 이 과정이 구현 품질에 직접 연결됩니다. 큰 요구사항을 그대로 AI에게 주면 모델은 범위, 완료 조건, 검증 방법을 스스로 채웁니다. 반대로 작업을 작게 만들면 AI output도 작아지고, 사람 review도 구체적이 됩니다.

![요구사항에서 검증 가능한 작업 단위로 쪼개는 흐름](/lesson-diagrams/requirement-to-task-breakdown/requirement-task-breakdown-flow.svg)

## 왜 존재하는가

요구사항은 보통 사람의 언어로 시작합니다. "회원가입을 쉽게 만들자", "검색 품질을 개선하자", "학습 진행률을 저장하자" 같은 문장은 제품 방향을 말하지만 구현 범위를 정확히 말하지는 않습니다. 개발자는 이 목표를 화면, 데이터, API, 상태, 오류, 테스트, 배포 영향으로 나눠야 합니다. AI agent에게 맡길 때도 똑같습니다. 목표만 주면 AI는 중간 결정을 추측합니다.

Issue tracker와 pull request 협업은 이 문제를 오래 다뤄 왔습니다. GitHub Issues는 ideas, feedback, planning tasks, bug reports 같은 work를 추적하는 곳이고, sub-issues는 더 큰 일을 작은 tasks로 나누는 구조입니다. AI가 등장하면서 이 구조는 더 중요해졌습니다. 이유는 단순합니다. ==AI는 모호한 목표를 만나면 빈칸을 채우지만, 그 빈칸이 팀의 의도와 같다는 보장은 없습니다==.

작업 분해는 이 빈칸을 줄입니다. Goal statement는 왜 이 일을 하는지 말합니다. Task는 무엇을 바꿀지 말합니다. Acceptance criteria는 완료를 어떻게 판단할지 말합니다. Out of scope는 무엇을 바꾸지 않을지 말합니다. Verification command는 어떤 명령이나 테스트로 확인할지 말합니다. 이 정보가 있으면 사람과 AI가 같은 작업을 보고 있는지 확인할 수 있습니다.

GitHub Copilot prompt engineering 문서는 broad description 뒤에 specific requirements를 두는 방향을 제시하고, Copilot cloud agent 문서는 agent가 build, test, validate할 수 있도록 안내가 필요하다고 설명합니다. Cursor Plan Mode도 code 작성 전에 detailed implementation plan을 만드는 기능으로 문서화되어 있습니다. 이 출처들이 가리키는 공통점은 하나입니다. 바로 구현보다 먼저 검토 가능한 작업 구조가 필요합니다.

## 작동 원리

### 1. Goal과 task를 분리한다

작업 분해의 첫 단계는 goal과 task를 섞지 않는 것입니다. Goal은 "왜"에 가깝고, task는 "무엇을 어떻게 바꿀지"에 가깝습니다. 예를 들어 "검색 경험 개선"은 goal입니다. 이 goal은 empty state, loading state, 검색어 유지, glossary 검색 연결, 모바일 레이아웃 같은 여러 task로 나눌 수 있습니다.

Goal을 task처럼 쓰면 완료 기준이 흐려집니다. AI에게 "검색 경험 개선해줘"라고 요청하면 AI는 어떤 부분을 개선할지 스스로 결정해야 합니다. 하지만 "검색 결과가 없을 때 안내 문구와 추천 링크를 추가하라"라고 요청하면 구현 후보가 좁아집니다. ==좋은 task는 AI가 창의적으로 해석할 여지를 모두 없애는 것이 아니라, 검토 가능한 의사결정 경계를 만드는 것==입니다.

### 2. Sub-issue hierarchy로 큰 일을 추적한다

GitHub sub-issues는 larger pieces of work를 tasks로 나누는 방법입니다. Parent issue는 큰 목표를 담고, sub-issue는 개별 구현 단위를 담습니다. 이 구조는 AI 작업에도 유용합니다. Parent issue에는 제품 의도와 전체 범위를 두고, sub-issue에는 agent가 맡을 수 있는 좁은 변경과 acceptance criteria를 둡니다.

Hierarchy는 목적이 아니라 도구입니다. sub-issue를 많이 만들었다고 좋은 분해가 되는 것은 아닙니다. 각 sub-issue가 review 가능한 크기인지, 독립적으로 검증할 수 있는지, 완료되면 parent goal에 실제로 기여하는지 봐야 합니다. 작업이 너무 작으면 관리 비용이 커지고, 너무 크면 AI와 사람이 모두 범위를 놓칩니다.

### 3. Specific requirements를 acceptance criteria로 바꾼다

GitHub prompt engineering 문서의 "Start general, then get specific"은 작업 분해의 핵심 순서입니다. 먼저 일반 목표를 말하고, 그 다음 구체 요구사항을 나열합니다. 이 구체 요구사항은 task의 acceptance criteria가 됩니다. Acceptance criteria는 "완료되었다고 말하려면 무엇이 참이어야 하는가"를 적는 문장입니다.

예를 들어 "사용자가 빈 검색 결과를 이해할 수 있어야 한다"는 goal에 가깝습니다. Acceptance criteria는 더 구체적입니다. "검색 결과가 0개이면 empty state 문구가 보인다", "검색어는 화면에 유지된다", "기존 결과 목록 렌더링은 바뀌지 않는다", "관련 component test가 통과한다"처럼 확인 가능한 조건으로 바꿉니다.

### 4. 검증 정보를 task에 포함한다

AI agent가 build, test, validate할 수 있으려면 어떤 명령을 실행해야 하는지 알아야 합니다. KB는 Copilot cloud agent 문서가 build, test, validate guidance를 강조한다고 정리합니다. task에 검증 정보가 없으면 agent는 임의의 test를 고르거나 실행하지 않을 수 있습니다. 사람 reviewer도 어떤 결과를 기대해야 하는지 알기 어렵습니다.

따라서 task에는 verification section이 필요합니다. `npm run lint`, `npm run typecheck`, 특정 test file, 수동 확인 시나리오처럼 현재 repository에 맞는 확인 방법을 적습니다. 검증 명령을 적는 것은 AI를 믿지 못해서가 아니라, AI와 사람이 같은 성공 기준을 공유하기 위해서입니다.

### 5. 구현 전 plan을 검토한다

Cursor Plan Mode는 code 작성 전 detailed implementation plans를 만드는 흐름을 제공합니다. 이 단계는 큰 작업에서 특히 중요합니다. Plan은 바로 코드를 바꾸기 전에 어떤 파일을 볼지, 어떤 변경을 할지, 어떤 검증을 할지 사람에게 보여줍니다. 사람이 plan을 읽고 scope creep이나 위험한 변경을 막을 수 있습니다.

Plan 검토는 작업 분해의 feedback loop입니다. 처음 나눈 task가 너무 넓거나 누락이 있으면 plan 단계에서 드러납니다. 이때 바로 구현하지 않고 task를 다시 쪼개면 나중의 큰 재작업을 줄일 수 있습니다.

```ts
type TaskCard = {
  goal: string
  scope: string[]
  acceptanceCriteria: string[]
  outOfScope: string[]
  verification: string[]
}

function isReadyForAgent(task: TaskCard): boolean {
  return (
    task.goal.length > 0 &&
    task.scope.length > 0 &&
    task.acceptanceCriteria.length >= 2 &&
    task.outOfScope.length > 0 &&
    task.verification.length > 0
  )
}

const emptyStateTask: TaskCard = {
  goal: "검색 결과가 없을 때 사용자가 다음 행동을 이해하게 한다.",
  scope: ["SearchResults component", "empty state copy", "component test"],
  acceptanceCriteria: [
    "검색 결과가 0개이면 empty state 문구가 보인다.",
    "기존 검색 결과 렌더링은 변경하지 않는다.",
  ],
  outOfScope: ["검색 ranking 변경", "DB schema 변경"],
  verification: ["npm run typecheck", "npm run test -- SearchResults"],
}

console.log(isReadyForAgent(emptyStateTask))
```

이 코드는 task가 agent에게 넘길 준비가 되었는지 아주 단순하게 확인합니다. 실제 프로젝트에서는 더 많은 조건이 붙겠지만, 핵심은 goal, scope, acceptance criteria, out of scope, verification이 모두 있어야 한다는 점입니다.

## 스펙과 세부

### Issue는 작업 추적 단위다

GitHub Issues는 work를 plan and track하는 단위입니다. 이 말은 issue가 단순 메모가 아니라 작업 상태, 논의, metadata, 연결 관계를 담는 컨테이너라는 뜻입니다. Labels, issue types, milestones, assignees, projects 같은 metadata는 작업의 성격과 우선순위를 전달합니다.

AI task에서도 metadata는 중요합니다. "bug", "security", "frontend", "needs-test" 같은 label은 agent와 사람 reviewer가 어떤 관점으로 봐야 하는지 알려줍니다. Metadata는 구현을 직접 만들지는 않지만, 검토 흐름을 정렬합니다.

### Sub-issue는 작은 task지만 독립성이 필요하다

Sub-issue는 큰 일을 작은 task로 나누지만, 모든 작은 문장이 좋은 sub-issue는 아닙니다. 좋은 sub-issue는 독립적으로 설명되고, 독립적으로 검증되며, parent goal과 연결됩니다. "버튼 색 바꾸기"가 독립 task일 수도 있지만, parent goal과 무관하면 noise가 됩니다.

AI에게 맡길 sub-issue는 특히 독립성이 중요합니다. Agent가 한 sub-issue를 수행하면서 다른 sub-issue 범위를 침범하면 review가 어려워집니다. 그래서 out of scope를 함께 적어야 합니다. Scope는 할 일을 말하고, out of scope는 하지 않을 일을 말합니다.

### Acceptance criteria는 테스트와 다르지만 연결되어야 한다

Acceptance criteria는 사용자가 기대하는 완료 조건입니다. Test는 그 조건을 자동 또는 수동으로 확인하는 방법입니다. 둘은 같지 않지만 연결되어야 합니다. "검색 결과가 0개이면 empty state가 보인다"는 criteria이고, component test나 Playwright flow는 이를 확인하는 수단입니다.

AI task에서 acceptance criteria가 없으면 구현이 끝났는지 판단하기 어렵습니다. Test 명령만 있어도 부족합니다. 기존 test가 통과해도 새 요구사항을 만족하지 않을 수 있기 때문입니다. Criteria와 verification을 함께 둬야 합니다.

### Plan은 구현 전 review artifact다

Plan Mode 같은 기능의 의미는 "AI가 계획도 알아서 한다"가 아닙니다. Plan은 사람이 구현 전에 검토할 수 있는 산출물입니다. 파일 목록, 변경 단계, 검증 방법이 plan에 드러나면 사람은 위험한 방향을 조기에 막을 수 있습니다.

좋은 plan은 task와 맞아야 합니다. Task는 empty state만 요구했는데 plan이 검색 알고리즘 변경을 포함한다면 scope mismatch입니다. 이 mismatch를 구현 전에 발견하는 것이 plan review의 가치입니다.

## 원문으로 읽기

> "plan and track a piece of work"
>
> — 하나의 작업을 계획하고 추적한다.
> [GitHub Docs — Quickstart for GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart)

이 문장은 issue를 단순한 TODO가 아니라 계획과 추적의 단위로 봐야 한다는 뜻입니다. AI 시대에도 작업은 추적 가능한 단위여야 합니다. 그래야 AI output이 어떤 요구사항을 만족하는지, 어떤 논의와 연결되는지 확인할 수 있습니다.

> "break down larger pieces of work into tasks"
>
> — 더 큰 작업을 task로 나눈다.
> [GitHub Docs — Adding sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues)

작업 분해의 핵심 문장입니다. 큰 목표는 그대로 구현되지 않습니다. 작은 task로 나눠야 review, test, rollback이 가능해집니다. AI agent에게 맡길 때도 이 원칙은 그대로 적용됩니다.

> "Start general, then get specific"
>
> — 일반적인 설명에서 시작한 뒤 구체화한다.
> [GitHub Docs — Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)

프롬프트 작성 문장처럼 보이지만 요구사항 분해에도 그대로 쓰입니다. 먼저 goal을 말하고, 그 다음 specific requirements를 acceptance criteria로 나눕니다. 이 순서가 있어야 AI가 목표와 세부 조건을 함께 이해할 수 있습니다.

> "build, test and validate its changes"
>
> — 변경을 빌드하고 테스트하고 검증한다.
> [GitHub Docs — Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results)

AI agent task에 검증 정보를 넣어야 하는 이유입니다. 구현만 요청하면 agent가 어떤 기준으로 완료를 판단해야 하는지 흐려집니다. Build, test, validate가 task에 포함되어야 사람도 결과를 검토할 수 있습니다.

> "Create detailed implementation plans before writing code"
>
> — 코드를 쓰기 전에 상세 구현 계획을 만든다.
> [Cursor Docs — Plan Mode](https://cursor.com/docs/agent/plan-mode)

이 문장은 바로 구현으로 뛰어들기 전에 plan을 review artifact로 만들라는 뜻으로 읽을 수 있습니다. 큰 task일수록 plan을 먼저 보고 scope와 위험을 확인해야 합니다. Plan이 task와 맞지 않으면 구현 전에 작업 분해를 고쳐야 합니다.

## 실전에서

### 큰 기능을 parent issue로 둔다

예를 들어 "강의 검색 품질 개선"을 parent issue로 둡니다. 이 parent에는 왜 검색 품질을 개선하는지, 사용자에게 어떤 문제가 있는지, 전체적으로 어떤 하위 작업이 필요한지 씁니다. 이 문서는 팀과 AI가 큰 방향을 공유하는 기준입니다.

그 다음 sub-issue를 나눕니다. "empty state 추가", "glossary term 검색 연결", "검색 결과 highlight 유지", "모바일 검색 UI 확인", "검색 관련 test 보강"처럼 review 가능한 단위로 나눕니다. 각 sub-issue에는 acceptance criteria와 verification을 둡니다.

### AI task template을 만든다

AI에게 맡길 task는 매번 같은 구조를 쓰면 좋습니다. Goal, Scope, Acceptance, Out of scope, Verification, Notes를 고정하면 빠뜨리는 항목이 줄어듭니다. 초보자는 특히 이 template이 도움이 됩니다. "무엇을 말해야 하지?"를 고민하기보다 항목을 채우며 요구사항을 정리할 수 있습니다.

```text
AI Task Template:
Goal:
Scope:
Acceptance Criteria:
Out of Scope:
Verification:
Plan First:
```

Plan First 항목은 agent에게 바로 수정하지 말고 먼저 계획을 제시하게 하는 선택입니다. 위험이 큰 작업에서는 이 값을 켭니다. 작은 copy 수정처럼 위험이 낮은 작업에서는 바로 구현할 수 있습니다.

### 완료 후에는 task를 닫기 전에 검증 결과를 남긴다

Task가 끝나면 "수정 완료"만 쓰지 않습니다. 어떤 criteria가 만족되었는지, 어떤 test를 실행했는지, 실행하지 못한 검증은 무엇인지 남깁니다. 이 기록은 PR review와 release note에 연결됩니다. AI가 작업했다면 특히 중요합니다. 사람이 나중에 결과를 읽을 수 있어야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 분해 비용입니다. 작은 task를 만드는 데 시간이 듭니다. 하지만 이 시간은 구현 전 review 비용입니다. 작업이 커진 뒤 잘못된 방향을 되돌리는 비용보다 보통 작습니다. 특히 AI agent가 여러 파일을 바꿀 수 있는 상황에서는 먼저 범위를 좁히는 것이 안전합니다.

두 번째 trade-off는 과도한 세분화입니다. 모든 줄 변경을 별도 issue로 만들면 추적 비용이 커지고 흐름이 끊깁니다. 좋은 기준은 "사람이 review할 수 있고, AI가 검증할 수 있고, 실패하면 되돌릴 수 있는 크기"입니다. 이보다 작으면 관리 부담이 크고, 이보다 크면 품질 위험이 커집니다.

세 번째 한계는 criteria의 품질입니다. Acceptance criteria가 모호하면 task를 나눠도 효과가 없습니다. "좋게 만들기", "깔끔하게 정리하기" 같은 criteria는 검증할 수 없습니다. 반대로 너무 구현 세부에 갇히면 더 나은 해결책을 막을 수 있습니다. Criteria는 사용자가 볼 결과와 검증 조건을 중심으로 써야 합니다.

네 번째 한계는 plan이 정답이 아니라는 점입니다. Cursor Plan Mode 같은 plan은 구현 전 검토를 돕지만, plan 자체도 AI output입니다. 사람이 읽고 scope와 위험을 확인해야 합니다. Plan을 review하지 않으면 plan-first도 사실상 바로 구현과 다르지 않습니다.

## 더 읽기

이 강의의 근거 KB는 `requirement-task-breakdown`입니다. 먼저 GitHub Issues quickstart를 읽고 issue가 work를 plan and track하는 단위임을 확인하세요. 그 다음 sub-issues 문서에서 큰 일을 tasks로 나누는 hierarchy를 봅니다. GitHub Copilot prompt engineering 문서에서는 general goal과 specific requirements의 순서를 확인하고, Copilot cloud agent 문서에서는 build, test, validate guidance가 왜 필요한지 읽습니다. 마지막으로 Cursor Plan Mode 문서를 보며 구현 전 plan이 어떤 review artifact가 될 수 있는지 확인하세요.

다음 학습 흐름은 `prompt-to-implementation-loop`입니다. 작업을 잘게 나눴다면 이제 각 task를 prompt로 전달하고, AI의 구현 후보를 build, test, validate 결과와 함께 다시 feedback하는 루프를 배울 차례입니다. 작업 분해는 그 루프의 첫 입력을 만드는 단계입니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다. 본문은 승인 KB의 GitHub Issues, GitHub Copilot, Cursor Plan Mode 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 task readiness를 확인하는 독립 TypeScript 예시입니다.
