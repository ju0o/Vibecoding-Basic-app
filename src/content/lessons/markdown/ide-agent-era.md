## 한 줄 정의

IDE 에이전트 시대는 chat prompt를 시작점으로 AI가 repository context를 조사하고, 작업 계획을 세우고, 파일을 수정하고, terminal command나 test를 실행하며, 결과를 diff와 보고서로 제출하는 agentic coding 단계입니다. 자동완성은 커서 주변 제안이고, chat coding은 질문과 설명의 대화라면, IDE agent는 그 대화가 실제 작업 수행 루프로 확장된 형태입니다. ==IDE agent의 핵심은 AI가 개발자를 대체한다는 뜻이 아니라, 작은 repository task를 계획·실행·검증 가능한 단위로 위임하는 방식==입니다.

이 강의는 “에이전트가 알아서 코딩한다”는 표현을 조심스럽게 해부합니다. KB에 따르면 GitHub responsible use 문서는 agent mode가 multi-step tasks를 계획하고 tools를 호출할 수 있다고 설명합니다. GitHub Copilot features 문서는 cloud agent가 repository를 조사하고 branch에 code changes를 만들 수 있음을 설명합니다. OpenAI Codex는 repository가 preload된 cloud sandbox environment에서 task를 수행한다고 소개하고, Claude Code는 terminal과 codebase 안에서 동작하는 agentic coding tool로 설명됩니다.

즉 IDE agent 시대의 변화는 output 형식의 변화만이 아닙니다. 답변 문장이 아니라 파일 변경, 실행 결과, test output, diff, branch, PR 후보가 산출물이 됩니다. 그래서 chat coding보다 권한과 검증이 훨씬 중요합니다. 초보자는 “AI가 파일을 고쳐준다”보다 “AI가 어떤 입력을 보고 어떤 행동을 했으며, 나는 무엇을 검토해야 하는가”를 먼저 배워야 합니다.

![IDE Agent 작업 루프](/lesson-diagrams/ide-agent-era/ide-agent-task-loop.svg)

## 왜 존재하는가

Chat coding은 코드 설명과 오류 해석에 강합니다. 하지만 개발 작업은 자주 여러 단계로 이어집니다. 실패한 테스트를 보고 원인을 추정하고, 관련 파일을 찾고, 수정 후보를 만들고, 다시 테스트를 실행하고, 변경 파일을 설명해야 합니다. 사람이 이 연결을 모두 수동으로 하면 문맥 전환이 많고, AI 답변을 복사해 적용하는 과정에서 실수가 생깁니다.

IDE agent는 이 문제를 줄이기 위해 생겼습니다. 작업을 하나의 자연어 prompt로 시작하되, 내부적으로는 search, read, edit, command execution, test run, observation, retry 같은 단계를 연결합니다. 개발자가 “이 컴포넌트의 empty state를 추가하라. 범위는 이 폴더, 검증은 이 명령”이라고 주면 agent는 repository를 읽고 필요한 파일을 수정한 뒤 결과를 보고할 수 있습니다.

여기서 중요한 것은 agent가 독립적 존재라서가 아니라, 여러 도구를 하나의 loop 안에서 사용한다는 점입니다. ==IDE agent는 더 똑똑한 답변기가 아니라, 권한이 부여된 작업 실행 루프입니다==. 이 관점으로 봐야 permissions, sandbox, review, CI가 왜 핵심인지 이해할 수 있습니다.

AI 시대에서 agent가 등장한 또 다른 이유는 작업 단위가 커졌기 때문입니다. 자동완성은 줄 단위, chat은 설명 단위에 강했습니다. 하지만 실제 product work는 “버그 하나를 고치고 관련 테스트를 보강한다”처럼 repository 전체의 작은 과제를 요구합니다. IDE agent는 이 과제를 인간이 설계하고 AI가 일부 실행하는 방식으로 다룹니다.

## 작동 원리

### 1. 사람이 task contract를 만든다

Agent 작업은 prompt에서 시작하지만, 좋은 prompt는 부탁 문장이 아니라 task contract에 가깝습니다. 범위, 성공 기준, 금지 영역, 검증 명령, 완료 보고 형식을 포함해야 합니다. “대시보드 개선해줘”는 agent가 성공 기준을 추론하게 만듭니다. “src/features/dashboard 하위에서 empty state를 추가하고, npm run test를 통과시키고, 변경 파일과 남은 위험을 보고하라”는 review 가능한 작업이 됩니다.

Task contract가 선명할수록 agent loop는 덜 흔들립니다. 범위가 없으면 agent가 너무 많은 파일을 읽거나 수정할 수 있고, 검증 명령이 없으면 완료 여부를 스스로 추정합니다. ==Agent에게 맡길 수 있는 작업은 사람이 먼저 성공 조건을 말로 고정할 수 있는 작업==입니다.

### 2. Agent가 repository context를 조사한다

IDE agent는 chat 답변처럼 일반 설명만 만들지 않습니다. KB는 Copilot cloud agent가 repository를 조사하고 implementation plan을 만들 수 있다고 정리합니다. Codex도 repository가 preload된 cloud sandbox에서 task를 수행한다고 소개됩니다. 이것은 agent가 현재 codebase를 입력으로 삼아 작업한다는 뜻입니다.

조사 단계에서는 search, file read, dependency inspection 같은 행동이 일어납니다. 좋은 agent는 바로 edit하지 않고 먼저 구조를 파악합니다. 어떤 파일이 entry point인지, test가 어디에 있는지, 기존 패턴이 무엇인지 확인합니다. 이 단계가 약하면 agent는 일반적인 코드 조각을 현재 프로젝트에 억지로 끼워 넣게 됩니다.

### 3. Multi-step plan과 tool invocation이 이어진다

GitHub KB의 핵심 인용은 agent가 autonomously plans multi-step tasks라는 점입니다. 이것은 agent가 한 번 답하고 끝나는 것이 아니라, 목표를 여러 단계로 나누고 도구를 호출하며 관찰 결과를 다음 행동에 반영한다는 뜻입니다. 파일을 읽고, 수정하고, 테스트를 실행하고, 실패하면 다시 수정하는 흐름입니다.

이 루프는 편리하지만 위험합니다. 도구 호출이 가능하다는 것은 파일 변경과 command execution이 가능하다는 뜻입니다. 따라서 작업 범위와 권한이 필요합니다. Agent가 많은 단계를 계획할수록 개발자는 “어떤 단계가 실제로 실행됐는가”, “어떤 명령이 실패했는가”, “어떤 파일이 바뀌었는가”를 확인해야 합니다.

### 4. 실행 환경이 local IDE 또는 cloud sandbox로 나뉜다

KB는 GitHub Copilot cloud agent가 ephemeral, firewalled environment에서 작동한다고 설명하고, OpenAI Codex가 repository가 preload된 cloud sandbox environment에서 task를 수행한다고 정리합니다. Claude Code는 terminal과 codebase 안에서 사용하는 agentic coding tool로 설명됩니다. 즉 agent surface는 하나가 아닙니다. 로컬 IDE/terminal에서 동작할 수도 있고, 원격 cloud sandbox에서 동작할 수도 있습니다.

이 차이는 중요합니다. 로컬 agent는 현재 개발자의 파일 시스템과 환경에 더 가깝지만, 잘못된 command의 영향도 가까울 수 있습니다. Cloud sandbox는 격리와 병렬 작업에 유리하지만, 로컬의 미커밋 변경이나 secret, 특정 개발 환경을 그대로 갖고 있지 않을 수 있습니다. 도구 선택은 “어떤 모델이 더 좋은가”만으로 결정되지 않습니다.

### 5. 결과는 diff, test output, 설명으로 검토한다

Agent 결과는 최종 답변이 아니라 review package입니다. 변경 파일, diff, 실행한 테스트, 실패한 명령, 남은 위험을 함께 봐야 합니다. GitHub Docs는 cloud agent가 branch에 code changes를 만들 수 있음을 설명하고, 이러한 흐름은 PR review와 연결됩니다. 사람이 diff를 읽고 CI를 확인해야 agent 작업이 제품 코드로 들어올 수 있습니다.

```ts
type AgentTaskContract = {
  goal: string
  allowedPaths: string[]
  verificationCommands: string[]
  reportMustInclude: Array<"changed-files" | "test-results" | "risks">
}

export function isReviewableAgentTask(task: AgentTaskContract): boolean {
  return (
    task.goal.trim().length > 0 &&
    task.allowedPaths.length > 0 &&
    task.verificationCommands.length > 0 &&
    task.reportMustInclude.includes("changed-files") &&
    task.reportMustInclude.includes("test-results")
  )
}
```

이 예시는 agent task를 review 가능한 단위로 만들기 위한 최소 조건을 보여줍니다. 목표, 허용 경로, 검증 명령, 보고 항목이 없으면 agent가 결과를 만들더라도 사람이 안전하게 검토하기 어렵습니다.

## 스펙과 세부

### Agent mode는 chat의 확장이지만 같은 것은 아니다

Chat coding은 질문과 설명 중심입니다. Agent mode는 그 질문에서 출발해 tool invocation과 multi-step task planning으로 넘어갑니다. 이 차이를 모르면 chat에 물어볼 일을 agent에게 맡기거나, agent에게 맡길 일을 chat 답변 복붙으로 처리하게 됩니다. 전자는 과한 권한을 주는 문제이고, 후자는 수동 적용 중 실수를 만드는 문제입니다.

### Repository task delegation에는 작은 범위가 필요하다

Agent에게 좋은 작업은 작고 검증 가능해야 합니다. KB의 설명처럼 agent는 repository를 조사하고 branch에 code changes를 만들 수 있지만, 이것이 모든 작업을 한 번에 맡겨도 된다는 뜻은 아닙니다. 기능 전체 재설계, 보안 정책 변경, 대규모 migration처럼 판단 범위가 넓은 작업은 더 작은 issue로 나누어야 합니다.

### Cloud sandbox는 안전 장치이지만 품질 보증은 아니다

Ephemeral, firewalled environment나 cloud sandbox는 agent 실행의 blast radius를 줄이는 데 도움을 줍니다. 하지만 sandbox에서 code change가 만들어졌다는 사실은 그 코드가 요구사항을 만족한다는 뜻이 아닙니다. 격리는 실행 환경의 경계이고, correctness는 review와 test의 문제입니다. 이 둘을 혼동하면 “sandbox니까 안전하다”는 잘못된 결론에 도달합니다.

### Terminal agent와 IDE agent는 체감 workflow가 다르다

Claude Code는 terminal과 codebase 안에서 사용하는 agentic coding tool로 설명됩니다. Codex CLI도 inspect, edit, run code 같은 terminal surface를 제공합니다. IDE agent는 editor 안에서 파일과 대화를 함께 보게 해주고, terminal agent는 shell command와 repository 조사 흐름이 더 직접적으로 드러납니다. 어느 쪽이든 권한과 검증은 필요하지만, 사용자가 관찰하는 단서는 다릅니다.

### Stop condition이 없으면 loop가 길어진다

Agent는 multi-step task를 계획할 수 있으므로 종료 조건이 중요합니다. 테스트가 실패하면 몇 번까지 수정할지, permission이 필요한 command가 나오면 멈출지, 요구사항이 모호하면 질문할지 정해야 합니다. Agent가 계속 시도하는 것은 성실함처럼 보일 수 있지만, 근거 없는 반복은 위험합니다.

## 원문으로 읽기

> "autonomously plans multi-step tasks"
>
> — 여러 단계의 작업을 자율적으로 계획한다.
> [GitHub Docs — Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

이 문장은 agent mode의 본질을 보여줍니다. 한 번 답변하는 chat과 달리 agent는 작업을 단계로 나누고 도구 사용을 포함할 수 있습니다. 따라서 사용자는 prompt만이 아니라 단계, 권한, 종료 조건을 함께 설계해야 합니다.

> "An autonomous AI agent"
>
> — 자율적인 AI 에이전트.
> [GitHub Docs — GitHub Copilot features](https://docs.github.com/en/copilot/get-started/features)

이 표현은 cloud agent의 역할을 설명합니다. 하지만 autonomous라는 단어를 “검토 불필요”로 읽으면 안 됩니다. 자율적으로 작업을 시도할 수 있다는 말과, 사람이 결과를 검토하지 않아도 된다는 말은 전혀 다릅니다.

> "ephemeral, firewalled environment"
>
> — 일시적이고 방화벽으로 격리된 환경.
> [GitHub Docs — Responsible use of GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents)

이 인용은 agent 실행 환경의 안전 경계를 보여줍니다. 원격 agent가 어디에서 실행되는지, 그 환경이 어떤 격리를 제공하는지 이해해야 합니다. 다만 격리 환경은 잘못된 로직을 자동으로 막지 않습니다.

관련 원문(링크): [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/)

이 문장은 Codex 같은 coding agent의 사용 감각을 잘 보여줍니다. 하지만 perform tasks라는 말은 task definition과 review를 전제로 읽어야 합니다. 작업이 모호하면 수행 결과도 모호하고, 검증이 없으면 완료 여부도 모호합니다.

관련 원문(링크): [Anthropic — Claude Code overview](https://code.claude.com/docs/en/overview)

Claude Code의 설명은 agentic coding이 특정 회사 하나의 기능명이 아니라 도구 유형으로 확장되고 있음을 보여줍니다. terminal, IDE, cloud surface는 다를 수 있지만 공통적으로 codebase와 도구 사용, 검토 루프가 중요합니다.

## 실전에서

### 작은 issue 위임

처음 agent를 쓸 때는 작은 issue가 좋습니다. 예를 들어 “이 컴포넌트의 empty state를 추가하고 관련 테스트를 갱신하라”처럼 범위가 좁은 작업입니다. prompt에는 허용 경로, 변경하면 안 되는 파일, 검증 명령, 완료 보고 형식을 넣습니다. 이렇게 하면 agent 결과를 diff로 읽기 쉽고 실패해도 되돌리기 쉽습니다.

```text
작업:
src/features/lesson 하위에서 빈 검색 결과 상태를 추가하라.

제약:
- src/content 파일은 수정하지 말 것.
- 새로운 라이브러리는 추가하지 말 것.

검증:
- npm run lint
- npm run typecheck
- npm run test

보고:
- 변경 파일
- 실행한 명령과 결과
- 남은 위험
```

### 조사와 수정 단계를 나누기

Agent에게 바로 수정하게 하지 않고 먼저 조사만 시킬 수 있습니다. “관련 파일을 읽고 구현 계획만 제시하라. 아직 수정하지 말라”는 방식입니다. 계획이 타당하면 그 다음 edit 권한을 주거나 직접 수정할 수 있습니다. 이 분리는 초보자에게 특히 유용합니다. agent의 사고 경로를 관찰하면서 repository 구조를 배우기 때문입니다.

### 실패한 테스트를 loop에 넣기

Agent가 수정을 만든 뒤 테스트가 실패하면 실패 로그를 다시 입력으로 넣을 수 있습니다. 다만 무한 반복을 막아야 합니다. 두세 번 실패하면 원인을 다시 사람에게 설명하게 하고, 더 큰 구조 변경이 필요한지 판단합니다. 좋은 agent workflow는 끝없이 시도하는 흐름이 아니라 멈출 기준을 가진 흐름입니다.

### Review package로 받기

완료 보고에는 변경 파일, 핵심 diff 의도, 실행한 명령, 실패 또는 미실행 검증, 남은 위험이 있어야 합니다. 이 보고가 없으면 agent output은 검토 가능한 산출물이 아니라 “고쳤다고 주장하는 답변”에 가깝습니다. Agent 시대의 실무 능력은 prompt를 잘 쓰는 것만이 아니라 결과를 review package로 요구하고 읽는 능력입니다.

## 한계와 트레이드오프

첫 번째 한계는 과도한 위임입니다. Agent가 multi-step task를 수행할 수 있다는 말이 큰 제품 판단을 한 번에 맡겨도 된다는 뜻은 아닙니다. 요구사항이 흐리거나 성공 기준이 없으면 agent는 그럴듯한 방향으로 움직일 수 있습니다.

두 번째 한계는 권한 위험입니다. File edit와 command execution은 생산성을 높이지만 잘못된 수정, dependency 변경, secret 노출, 불필요한 network 호출 같은 위험을 동반합니다. 그래서 tool permissions와 sandboxes가 후속 강의의 핵심 주제가 됩니다.

세 번째 trade-off는 환경 차이입니다. Cloud sandbox는 격리에 유리하지만 로컬 미커밋 상태나 특정 환경 설정을 모를 수 있습니다. Local terminal agent는 현재 환경에 가깝지만 더 직접적인 위험을 만들 수 있습니다. 어떤 surface를 쓸지는 작업의 위험도와 검증 가능성에 따라 결정해야 합니다.

네 번째 한계는 review 부담입니다. Agent가 많은 파일을 바꾸면 사람이 검토해야 할 diff도 커집니다. 생산성이 올라간 것처럼 보여도 review가 불가능하면 실제 품질은 떨어질 수 있습니다. 작은 task와 명확한 report가 필요한 이유입니다.

## 더 읽기

이 강의의 근거 KB는 `ide-agent-era`입니다. 먼저 GitHub Copilot Chat responsible use 문서에서 agent mode가 chat에서 multi-step tasks로 어떻게 확장되는지 읽으세요. 그 다음 GitHub Copilot features와 Copilot Agents responsible use 문서를 통해 cloud agent와 ephemeral, firewalled environment의 의미를 확인합니다. 이어서 OpenAI Codex 소개와 Claude Code overview를 읽으면 cloud sandbox, terminal/codebase agent surface의 차이를 볼 수 있습니다.

다음 강의는 `codex-claude-cursor-comparison`입니다. IDE agent 시대를 이해했다면 이제 Codex, Claude Code, Cursor 같은 도구를 모델 이름이 아니라 execution surface, context access, permission model, review workflow 기준으로 비교할 수 있습니다.
