## 한 줄 정의

사람-AI 협업 패턴은 사람이 목표, 범위, 성공 기준, 금지 행동을 정하고, AI가 조사·초안·수정 후보·테스트 실행을 보조하며, 사람이 최종 review와 책임을 맡는 작업 구조입니다. Chat coding은 질문과 설명을 제공하고, agent는 task 수행과 diff 후보까지 확장할 수 있지만, repository에 들어가는 결과는 사람이 검토해야 합니다. ==사람-AI 협업의 핵심은 일을 AI에게 넘기는 것이 아니라, 의도와 검증 책임은 사람이 잡고 실행 보조를 AI가 맡는 분업==입니다.

이 강의는 바이브코딩을 “AI가 알아서 만들어 주는 개발”로 이해하지 않기 위해 필요합니다. AI 코딩 도구는 자동완성, chat, IDE agent, cloud agent로 확장되었고, 각 surface는 더 많은 도움을 제공합니다. 하지만 도움의 양이 늘어날수록 책임 경계도 더 선명해야 합니다. GitHub responsible use 문서는 human review of AI-generated output이 중요하다고 설명하고, Cursor blog는 AI-generated code needs review라고 말합니다.

따라서 사람-AI 협업은 두 극단을 모두 피합니다. 하나는 모든 줄을 사람이 직접 써야 안전하다는 생각이고, 다른 하나는 AI가 만들었으니 그대로 합쳐도 된다는 생각입니다. 실제 패턴은 그 사이에 있습니다. 사람이 작업을 작게 정의하고, AI가 후보를 만들고, 사람이 diff와 test로 검토하고, 실패하면 feedback을 다시 prompt나 task instruction으로 돌립니다.

![사람-AI 협업 루프](/lesson-diagrams/human-ai-collaboration-patterns/human-ai-collaboration-loop.svg)

## 왜 존재하는가

AI 도구를 무작정 쓰면 책임 경계가 흐려집니다. 사용자가 “고쳐줘”라고만 요청하면 AI는 범위, 성공 기준, 금지 행동을 추측합니다. 이 추측이 맞을 때도 있지만, 틀리면 잘못된 파일을 바꾸거나 검증 없는 코드를 제안할 수 있습니다. AI output을 그대로 받아들이면 그 순간 repository의 품질 기준이 모델의 추측에 의존하게 됩니다.

협업 패턴은 이 문제를 줄이기 위해 존재합니다. Task framing, context sharing, output review, test verification, rollback readiness를 통해 AI 도움을 생산성으로 바꾸면서 품질 위험을 줄입니다. ==AI와 잘 협업한다는 것은 더 많은 일을 한 번에 맡기는 것이 아니라, 맡길 수 있는 단위와 사람이 검토할 단위를 잘게 나누는 것==입니다.

역사적으로도 이 변화는 자연스럽습니다. 자동완성은 개발자의 입력 부담을 줄였고, chat coding은 질문과 설명을 가능하게 했습니다. IDE agent와 cloud agent는 task 수행과 branch/diff 결과로 확장됩니다. 작업 단위가 커질수록 사람은 “무엇을 만들까”뿐 아니라 “어떻게 검토할까”를 함께 설계해야 합니다.

바이브코딩 학습에서 이 주제가 중요한 이유는 초보자가 AI를 너무 쉽게 믿거나 너무 무서워하지 않도록 균형을 잡아주기 때문입니다. AI는 좋은 조사자, 초안 작성자, 반복 작업 보조자가 될 수 있습니다. 하지만 최종 판단자는 사람입니다. 이 역할 구분이 있어야 AI를 학습 도구이자 개발 도구로 오래 사용할 수 있습니다.

## 작동 원리

### 1. 사람이 intent와 scope를 먼저 정한다

협업의 첫 단계는 AI에게 말을 거는 것이 아니라 사람이 의도를 고정하는 것입니다. 무엇을 바꾸려는지, 어떤 파일이나 기능이 범위인지, 성공 기준은 무엇인지, 금지 행동은 무엇인지 정합니다. 이 단계가 빠지면 AI는 질문 뒤의 요구사항을 추론합니다. 추론된 요구사항은 편리하지만 검토하기 어렵습니다.

예를 들어 “검색 화면 개선해줘”는 범위가 넓습니다. “검색 결과가 0개일 때 empty state 문구를 추가하고, 기존 검색 로직은 바꾸지 말며, 관련 component test를 통과시켜라”는 협업 가능한 task입니다. 사람의 의도가 구체적일수록 AI output은 검토 가능한 형태가 됩니다.

### 2. AI는 조사, 설명, 초안, 실행 후보를 만든다

AI의 역할은 표면에 따라 달라집니다. Chat coding에서는 현재 코드 설명, 오류 원인 가설, 수정 후보, step-by-step guidance를 제공할 수 있습니다. Agent surface에서는 task를 수행하고 diff나 PR 후보를 만들 수 있습니다. OpenAI Codex KB는 Codex가 task를 수행할 수 있다고 설명하고, GitHub Agents KB는 agent output에 대한 oversight와 review를 강조합니다.

중요한 것은 AI가 “후보”를 만든다는 점입니다. 후보는 빠른 출발점이지만 완료가 아닙니다. 설명은 원문과 코드로 확인해야 하고, 수정 후보는 diff로 읽어야 하며, test output은 실제로 통과했는지 확인해야 합니다. AI가 실행까지 했더라도 결과를 검토하는 단계는 사라지지 않습니다.

### 3. 사람은 output을 산출물 종류별로 검토한다

AI output은 여러 종류가 있습니다. 설명, 코드 diff, 테스트 결과, 문서 요약, 작업 계획, review comment가 모두 다릅니다. 각 산출물은 검토 방법도 다릅니다. 설명은 source와 현재 코드로 대조하고, diff는 요구사항과 side effect를 읽고, test는 어떤 behavior를 보장하는지 봅니다.

Cursor blog의 AI-generated code needs review는 이 원칙을 가장 짧게 말합니다. Review는 형식적인 눈도장이 아니라 협업 루프의 중심입니다. ==AI가 만든 산출물은 “좋아 보이는 답”이 아니라 “검토해야 할 작업물”로 읽어야 합니다==.

### 4. Feedback은 다음 prompt나 task instruction으로 돌아간다

검토가 끝나면 결과가 다음 입력이 됩니다. 테스트 실패, review comment, 새로 발견한 요구사항, 잘못된 가정은 모두 다음 prompt 또는 agent instruction으로 되돌아갑니다. 이 feedback loop가 없으면 AI는 같은 실수를 반복할 수 있습니다.

좋은 feedback은 구체적입니다. “다시 해줘”가 아니라 “이 diff는 empty state를 추가했지만 loading state와 겹친다. loading 분기는 건드리지 말고 empty 분기만 추가하라. 테스트는 search results 0개 조건으로 작성하라”처럼 말합니다. 이렇게 하면 사람의 review가 AI의 다음 행동을 좁혀 줍니다.

### 5. 최종 merge와 release 책임은 사람에게 남는다

AI가 만든 code라도 repository에 들어가면 팀의 코드입니다. GitHub Agents 문서는 human oversight, review of outputs, responsible use를 강조합니다. 이 말은 agent가 branch나 PR 후보를 만들 수 있어도 최종 merge 판단은 사람과 팀의 책임이라는 뜻입니다. 책임 경계가 선명해야 나중에 장애가 생겼을 때 원인과 복구 경로를 찾을 수 있습니다.

```ts
type CollaborationStep =
  | "frame-task"
  | "ask-ai"
  | "review-output"
  | "run-tests"
  | "feed-back"
  | "merge-or-reject"

type CollaborationState = {
  step: CollaborationStep
  humanOwns: string
  aiHelpsWith: string
}

export const collaborationLoop: CollaborationState[] = [
  { step: "frame-task", humanOwns: "intent and constraints", aiHelpsWith: "clarifying questions" },
  { step: "ask-ai", humanOwns: "context selection", aiHelpsWith: "explanation or draft" },
  { step: "review-output", humanOwns: "diff and source review", aiHelpsWith: "summary and alternatives" },
  { step: "run-tests", humanOwns: "verification decision", aiHelpsWith: "test command suggestions" },
  { step: "feed-back", humanOwns: "review comments", aiHelpsWith: "revision candidate" },
  { step: "merge-or-reject", humanOwns: "final responsibility", aiHelpsWith: "release notes draft" },
]
```

이 코드는 사람과 AI의 역할을 분리해 보여줍니다. 모든 단계에서 사람이 소유하는 판단과 AI가 도울 수 있는 일이 다릅니다. 이 분리가 협업의 핵심입니다.

## 스펙과 세부

### Task framing은 prompt보다 앞선다

좋은 prompt는 좋은 task framing에서 나옵니다. 목표, 범위, 성공 기준, 금지 행동이 정해지지 않으면 prompt는 친절한 문장이어도 위험합니다. Agent에게 맡길 때는 acceptance criteria, allowed scope, verify command를 포함해야 합니다. Chat에게 물을 때도 “코드를 고쳐라”보다 “원인 가설과 확인 절차를 먼저 제시하라”가 더 안전할 수 있습니다.

### Context sharing은 많을수록 좋은 것이 아니다

AI에게 맥락을 주는 일은 협업의 핵심이지만, 관련 없는 파일과 오래된 로그를 많이 넣으면 잘못된 전제가 생길 수 있습니다. 필요한 파일, 오류 메시지, 실행 결과, 현재 목표를 선별해야 합니다. 협업 패턴에서 context sharing은 context dumping이 아니라 증거 패킷을 만드는 일입니다.

### Review output은 산출물별로 다르게 본다

설명은 문서와 코드로 대조합니다. Diff는 요구사항, side effect, security, test coverage로 봅니다. Test result는 어떤 테스트가 실행됐고 무엇을 보장하는지 확인합니다. Agent report는 변경 파일, 실행 명령, 실패 또는 미실행 검증, 남은 위험을 포함해야 합니다.

### Rollback readiness는 작은 변경에서 나온다

AI와 만든 변경은 작을수록 되돌리기 쉽습니다. 큰 작업을 한 번에 맡기면 diff가 커지고 review가 어려워집니다. 작은 task로 나누면 실패한 부분을 분리하고, git commit이나 branch 단위로 되돌릴 수 있습니다. Rollback readiness는 사고 후 복구만이 아니라 작업 전 설계입니다.

### 책임 경계는 문서화되어야 한다

팀에서 AI를 쓰려면 “AI output은 human review 없이 merge하지 않는다”, “권한이 필요한 command는 approval을 받는다”, “테스트 미실행은 release note에 남긴다” 같은 규칙이 필요합니다. 이런 규칙은 AI 도구별 기능보다 오래갑니다. 도구가 바뀌어도 책임 경계는 유지됩니다.

## 원문으로 읽기

> "human review of AI-generated output is important"
>
> — AI가 생성한 출력에 대한 사람의 검토가 중요하다.
> [GitHub Docs — Responsible use of GitHub Copilot Chat in your IDE](https://docs.github.com/en/copilot/responsible-use/chat)

이 문장은 사람-AI 협업의 출발점입니다. AI output은 설명이든 코드든 사람이 검토해야 합니다. 특히 초보자는 자연스러운 답변을 정답으로 받아들이기 쉬우므로, 검토를 학습 루틴에 포함해야 합니다.

> "human oversight, review of outputs, and responsible use"
>
> — 사람의 감독, 출력 검토, 책임 있는 사용.
> [GitHub Docs — Responsible use of GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents)

Agent는 chat보다 더 많은 행동을 할 수 있으므로 oversight가 더 중요합니다. 이 인용은 AI가 task를 수행할 수 있어도 사람의 감독과 output review가 협업 구조에서 빠지면 안 된다는 점을 보여줍니다.

> "Codex can perform tasks for you"
>
> — Codex는 사용자를 위해 작업을 수행할 수 있다.
> [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/)

이 문장은 AI의 역할이 설명을 넘어 task execution으로 확장됨을 보여줍니다. 하지만 perform tasks는 task framing과 review를 전제로 읽어야 합니다. 사람이 무엇을 맡길지 정의하지 않으면 AI는 성공 기준을 추측합니다.

> "AI-generated code needs review"
>
> — AI가 생성한 코드는 검토가 필요하다.
> [Cursor Blog — Agent best practices](https://cursor.com/blog/agent-best-practices)

협업 루프의 가장 실무적인 기준입니다. AI-generated code는 빠른 초안일 수 있지만, repository에 들어가기 전 diff와 test로 확인해야 합니다. 이 문장이 없으면 AI 협업은 생산성이 아니라 품질 위험이 됩니다.

> "review the results"
>
> — 결과를 검토하라.
> [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/)

짧지만 강한 문장입니다. AI가 task를 수행한 뒤 사람의 역할은 사라지지 않고 결과 검토로 이동합니다. 이 검토가 다음 feedback loop의 입력이 됩니다.

## 실전에서

### Explain-first 패턴

AI에게 바로 수정시키기 전에 현재 코드와 실패 원인을 설명하게 합니다. “아직 코드를 바꾸지 말고, 관련 파일과 실패 원인 가설만 정리하라”는 요청은 위험을 낮춥니다. 사람이 설명을 이해하고 범위를 확인한 뒤 수정 단계로 넘어갑니다.

### Small-task delegation 패턴

Agent에게 맡길 때는 작은 issue로 나눕니다. Acceptance criteria, allowed scope, verify command를 명시합니다. 이 패턴은 review와 rollback을 쉽게 만듭니다. 큰 기능 전체보다 작은 동작 하나, 파일 범위 하나, 테스트 하나가 더 안전합니다.

### Review loop 패턴

AI output을 diff와 tests로 확인하고, 실패하면 그 결과를 다음 prompt로 되돌립니다. “이 테스트가 실패했으니 원인을 설명하고, 기존 요구사항을 유지하면서 수정 후보를 제시하라”처럼 feedback을 구체화합니다. Review comment는 AI와 사람 사이의 작업 언어가 됩니다.

### Responsibility handoff 금지

AI가 코드를 만들었다는 이유로 책임을 AI에게 넘기지 않습니다. Repository에 들어가는 순간 팀의 책임입니다. 따라서 merge 전 사람 검토, CI, release note가 필요합니다. 이 원칙은 초보자에게 특히 중요합니다. “AI가 그렇게 했다”는 설명은 운영에서 원인 분석이 되지 않습니다.

```text
협업 루프:
1. 사람: 목표와 성공 기준 정의
2. AI: 조사, 설명, 수정 후보 생성
3. 사람: diff, test, source review
4. AI: review feedback 반영
5. 사람: 최종 commit 또는 merge 판단
```

## 한계와 트레이드오프

첫 번째 한계는 review 비용입니다. AI가 산출물을 빠르게 만들수록 사람이 검토해야 할 것도 늘어납니다. 생산성이 높아진 것처럼 보여도 diff가 너무 크면 review가 병목이 됩니다. 그래서 작은 task와 명확한 report가 필요합니다.

두 번째 한계는 책임 착시입니다. AI가 만든 코드라서 사람의 책임이 줄어드는 것처럼 느껴질 수 있습니다. 그러나 실제 repository와 사용자에게 영향을 주는 것은 팀의 코드입니다. 책임 경계를 흐리면 장애 대응도 흐려집니다.

세 번째 trade-off는 속도와 안전입니다. 바로 agent에게 수정시키면 빠르지만 잘못된 방향으로 갈 수 있습니다. Explain-first나 read-only 조사 단계를 넣으면 느려 보이지만, 큰 재작업을 줄일 수 있습니다. 작업 위험도에 따라 단계를 조정해야 합니다.

네 번째 한계는 도구별 차이입니다. Chat, IDE agent, cloud agent는 권한과 output이 다릅니다. 같은 협업 패턴도 도구 surface에 따라 다르게 적용해야 합니다. Chat 답변에는 source check가 중요하고, agent output에는 diff와 permission review가 더 중요합니다.

## 더 읽기

이 강의의 근거 KB는 `human-ai-collaboration-patterns`입니다. 먼저 GitHub Copilot Chat responsible use 문서에서 human review of AI-generated output 원칙을 읽으세요. 다음으로 GitHub Copilot Agents responsible use 문서에서 human oversight와 review of outputs를 확인합니다. OpenAI Codex 소개에서는 AI가 task를 수행할 수 있어도 사용자가 결과를 검토해야 한다는 흐름을 보고, Cursor agent best practices에서는 AI-generated code needs review라는 실무 기준을 확인하세요.

다음 학습 흐름은 `requirement-to-task-breakdown`입니다. 사람-AI 협업을 잘하려면 먼저 요구사항을 작고 검토 가능한 task로 나눌 수 있어야 합니다. 그 뒤 `prompt-to-implementation-loop`에서 prompt, implementation, test, review를 반복하는 실전 바이브코딩 루프로 확장할 수 있습니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다. 본문은 승인 KB의 GitHub, OpenAI, Cursor 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 협업 루프의 역할 분리를 설명하는 독립 TypeScript 예시입니다.
