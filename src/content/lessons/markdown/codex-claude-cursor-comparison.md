## 한 줄 정의

Codex, Claude Code, Cursor의 역할 비교는 AI 코딩 도구를 “어느 모델이 더 똑똑한가”가 아니라 실행 위치, context access, permission model, review workflow, 팀 작업 방식 기준으로 구분하는 일입니다. Codex는 cloud software engineering agent와 CLI surface를 제공하고, Claude Code는 terminal 중심 agentic coding tool로 설명되며, Cursor는 agent가 codebase search, rules, tests, review, worktree workflow를 사용하는 패턴을 공식 best practices에서 설명합니다. ==AI 코딩 도구 비교의 핵심은 도구 이름이 아니라, 어떤 작업을 어떤 surface와 검증 루틴에 배치할지 결정하는 것==입니다.

이 강의는 특정 도구의 승패를 가르는 글이 아닙니다. 도구는 빠르게 바뀌고, 같은 도구 안에서도 web, CLI, IDE, cloud 기능이 나뉩니다. 따라서 학습자가 오래 가져갈 기준은 제품명보다 비교 축입니다. 어디에서 실행되는가, 어떤 파일과 repository 정보를 볼 수 있는가, 어떤 command를 실행할 수 있는가, 결과는 diff인지 PR인지 대화 답변인지, 사람이 어디에서 검토하는가를 봐야 합니다.

KB의 공식 출처는 OpenAI Codex 소개, Codex CLI 문서, Claude Code overview, Cursor agent best practices입니다. 이 네 출처는 공통적으로 AI coding이 단순 답변 생성이 아니라 codebase, tools, review와 연결된다는 점을 보여줍니다. 그래서 이 강의의 목표는 “Codex는 A, Claude는 B, Cursor는 C”라는 암기가 아니라, 새 도구가 나와도 같은 기준으로 판단하는 능력입니다.

![AI 코딩 도구 비교 축](/lesson-diagrams/codex-claude-cursor-comparison/ai-coding-tool-fit.svg)

## 왜 존재하는가

AI 코딩 도구가 자동완성이나 chat에 머물렀을 때는 비교가 비교적 단순했습니다. 에디터 안에서 제안이 얼마나 잘 나오는지, 질문에 얼마나 잘 답하는지를 보면 됐습니다. 그러나 agentic coding tool이 등장하면서 비교가 복잡해졌습니다. 어떤 도구는 cloud sandbox에서 병렬 task를 수행하고, 어떤 도구는 terminal에서 local codebase와 함께 움직이며, 어떤 도구는 editor 안에서 search와 edit workflow를 제공합니다.

이제 “AI 코딩 도구 추천”이라는 질문은 너무 넓습니다. 버그 원인 조사를 빠르게 하고 싶은가, 큰 repository에서 관련 파일을 찾고 싶은가, 원격 sandbox에 여러 issue를 맡기고 싶은가, IDE 안에서 multi-file edit를 보며 작업하고 싶은가, PR review 흐름까지 연결하고 싶은가에 따라 답이 달라집니다. ==도구 비교가 필요한 이유는 하나의 정답을 고르기 위해서가 아니라, 작업을 올바른 실행 표면에 배치하기 위해서==입니다.

또 하나의 이유는 권한 위험입니다. Terminal이나 agent 도구는 inspect, edit, run code 같은 행동을 할 수 있습니다. 이것은 생산성을 높이지만 동시에 file edit, command execution, network, secret exposure 같은 위험을 동반합니다. 도구 비교에서 permission model을 보지 않으면 편리함만 보고 blast radius를 놓칠 수 있습니다.

마지막 이유는 협업입니다. AI가 만든 코드는 사람이 검토해야 합니다. Cursor 공식 blog도 AI-generated code needs review라고 강조합니다. Codex나 Cursor의 agent workflow가 아무리 강력해도 최종 제품 코드는 review, tests, build, merge 정책을 통과해야 합니다. 따라서 도구 비교는 개인 생산성 평가이면서 팀의 review workflow 설계이기도 합니다.

## 작동 원리

### 1. Execution surface를 먼저 구분한다

첫 번째 비교 축은 execution surface입니다. Codex는 cloud agent와 CLI surface를 모두 갖는 것으로 KB에 정리되어 있습니다. Claude Code는 terminal과 codebase 안에서 사용하는 agentic coding tool로 설명됩니다. Cursor는 editor agent workflow와 codebase search, review, worktrees 같은 패턴을 best practices에서 설명합니다.

Surface는 사용자의 관찰 가능성을 바꿉니다. Terminal surface에서는 command와 output이 전면에 나타납니다. IDE surface에서는 파일 diff와 editor context가 가까이 있습니다. Cloud surface에서는 local machine과 분리된 sandbox에서 task가 진행되고, 결과를 나중에 review할 수 있습니다. ==같은 “AI가 코드를 고친다”라도 어디에서 실행되는지에 따라 위험과 장점이 달라집니다==.

### 2. Context access를 비교한다

두 번째 축은 context access입니다. Codex cloud surface는 repository가 preload된 sandbox context를 사용할 수 있습니다. Claude Code는 local codebase와 terminal context에서 작업하는 agentic coding tool로 설명됩니다. Cursor agent는 codebase search tools를 활용하는 패턴이 공식 blog에 정리되어 있습니다.

이 비교에서 중요한 것은 많이 볼수록 무조건 좋다는 뜻이 아니라는 점입니다. Context가 넓으면 관련 파일을 찾을 가능성은 높아지지만, 잘못된 파일이나 오래된 전제를 포함할 위험도 있습니다. Context가 좁으면 안전하고 빠르지만, 필요한 의존성을 놓칠 수 있습니다. 그래서 도구 선택은 “내가 이 작업에 어떤 context를 제공하거나 허용할 것인가”와 함께 결정해야 합니다.

### 3. Permission model과 sandbox를 확인한다

세 번째 축은 permission model입니다. Codex CLI 문서는 inspect, edit, run code 같은 terminal coding agent surface를 설명하고, 권한과 명령을 다룹니다. Claude Code도 tool use와 terminal 기반 workflow를 전제로 합니다. Agent가 파일을 수정하고 명령을 실행할 수 있다면, 허용 범위와 승인 기준이 필요합니다.

작업이 단순 설명이면 read-only surface가 충분합니다. 작은 파일 수정이면 특정 directory만 edit하도록 제한할 수 있습니다. Dependency install, delete, network access, deployment 같은 행동은 승인이 필요합니다. 도구 비교에서 permission을 확인하지 않으면 “편한 도구”가 “위험한 도구”가 될 수 있습니다.

### 4. Review workflow를 맞춘다

네 번째 축은 review workflow입니다. Codex는 task 수행 후 결과를 검토하는 흐름을 전제로 하고, Cursor blog는 AI-generated code needs review라고 설명합니다. Agent가 만든 결과는 diff, test output, branch, PR, worktree 같은 산출물로 검토되어야 합니다. 단순 chat 답변처럼 복사해 붙이는 방식은 agent workflow의 장점을 살리지 못합니다.

Review workflow는 도구 선택의 마지막 단계가 아니라 처음부터 포함해야 할 조건입니다. 어떤 도구를 쓰든 변경 파일 목록, 테스트 결과, 남은 위험, 사람이 읽을 수 있는 diff가 있어야 합니다. 팀에서는 AI가 만든 변경에 대한 review 기준을 정하고, 작은 task 단위로 나누어야 합니다.

### 5. Tool fit을 작업 유형에 매핑한다

마지막으로 작업 유형을 도구에 매핑합니다. 로컬에서 빠르게 명령을 실행하며 조사해야 하는 작업은 terminal agent surface가 어울릴 수 있습니다. Editor 안에서 multi-file edit를 보며 계속 조정해야 하는 작업은 IDE/editor agent surface가 어울릴 수 있습니다. 독립적인 issue를 background에서 수행하고 나중에 diff로 검토할 작업은 cloud agent surface가 어울릴 수 있습니다.

```ts
type CodingTask = "explain" | "local-debug" | "multi-file-edit" | "background-issue"
type ToolSurface = "chat" | "terminal-agent" | "editor-agent" | "cloud-agent"

export function chooseSurface(task: CodingTask): ToolSurface {
  if (task === "explain") return "chat"
  if (task === "local-debug") return "terminal-agent"
  if (task === "multi-file-edit") return "editor-agent"
  return "cloud-agent"
}
```

이 코드는 특정 제품명을 고르지 않습니다. 대신 작업 성격을 surface에 매핑합니다. 실제 선택에서는 팀 정책, 권한, 비용, 사용 가능한 도구를 추가로 봐야 하지만, 출발점은 “무슨 일을 어디서 검토할 것인가”입니다.

## 스펙과 세부

### Codex는 cloud와 CLI surface를 함께 봐야 한다

OpenAI Codex 소개는 Codex가 사용자를 위해 task를 수행할 수 있다고 설명하고, Codex CLI 문서는 inspect, edit, run code 같은 terminal coding agent 표면을 설명합니다. 따라서 Codex를 하나의 화면으로만 이해하면 부족합니다. Cloud task delegation과 local terminal workflow는 권한, context, review 방식이 다를 수 있습니다.

### Claude Code는 terminal 중심 codebase workflow로 읽는다

Claude Code overview는 Claude Code를 agentic coding tool로 설명합니다. KB 범위 안에서 중요한 점은 terminal과 codebase 맥락에서 작업한다는 것입니다. Terminal surface는 명령 실행과 파일 작업이 가까이 있으므로 관찰 가능성이 좋지만, 권한 관리도 직접적입니다.

### Cursor는 editor agent, search, review workflow를 중심으로 본다

Cursor 공식 best practices는 agent가 codebase search tools를 갖고 있고, AI-generated code needs review라고 설명합니다. Cursor를 비교할 때는 editor experience만이 아니라 agent가 codebase를 어떻게 찾고, rules와 tests를 어떻게 활용하며, review와 worktree workflow로 어떻게 이어지는지 봐야 합니다.

### 모델 비교와 도구 비교는 다르다

모델은 추론 품질, 속도, 비용의 축이고, 도구는 context access, permission, execution surface, review workflow의 축입니다. 좋은 모델을 쓰는 도구라도 context가 부족하면 틀릴 수 있고, 강한 agent surface라도 review가 약하면 위험합니다. 반대로 가벼운 도구라도 특정 작업에 충분히 맞을 수 있습니다.

### 팀 정책은 도구 선택보다 오래 간다

도구 이름은 바뀌지만 팀의 정책은 남습니다. 어떤 작업은 read-only 조사만 허용하고, 어떤 작업은 제한된 edit를 허용하며, 어떤 작업은 PR과 CI 없이는 merge하지 않는다는 기준이 필요합니다. 이 기준이 있으면 새 도구가 등장해도 execution surface와 permission model에 맞춰 배치할 수 있습니다.

## 원문으로 읽기

> "Codex can perform tasks for you"
>
> — Codex는 사용자를 위해 작업을 수행할 수 있다.
> [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/)

이 문장은 Codex를 단순한 code completion 도구가 아니라 task 수행 agent로 읽게 만듭니다. 하지만 task를 수행한다는 말은 작업 범위와 검증 기준이 필요하다는 뜻이기도 합니다. 수행 결과는 사람이 review해야 제품 코드가 됩니다.

> "Inspect, edit, and run code"
>
> — 코드를 검사하고, 편집하고, 실행한다.
> [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli)

이 인용은 CLI surface의 힘과 위험을 동시에 보여줍니다. inspect만 하면 read-only 보조지만, edit와 run이 들어가면 repository와 실행 환경에 영향을 줍니다. 그래서 permission model과 verification command가 비교 기준이 됩니다.

> "agentic coding tool"
>
> — 에이전트형 코딩 도구.
> [Anthropic — Claude Code overview](https://code.claude.com/docs/en/overview)

Claude Code를 설명하는 이 표현은 AI coding tool이 단순 답변기에서 agentic workflow로 이동했음을 보여줍니다. Terminal과 codebase 중심의 작업에서는 사용자가 command output과 diff를 관찰하며 검토해야 합니다.

관련 원문(링크): [Cursor Blog — Agent best practices](https://cursor.com/blog/agent-best-practices)

이 문장은 context access의 중요성을 보여줍니다. 큰 codebase에서 관련 파일을 찾는 능력은 agent 품질에 큰 영향을 줍니다. 다만 검색 도구가 강력하다는 말은 결과가 자동으로 올바르다는 뜻이 아니므로, 검색된 파일과 변경 diff를 함께 확인해야 합니다.

관련 원문(링크): [Cursor Blog — Agent best practices](https://cursor.com/blog/agent-best-practices)

도구 비교의 결론에 가까운 문장입니다. 어떤 도구를 쓰든 AI-generated code는 review가 필요합니다. 따라서 비교표에는 성능뿐 아니라 review workflow와 검증 명령이 들어가야 합니다.

## 실전에서

### 비교표를 먼저 만든다

도구를 선택하기 전에 작업을 표로 나눕니다. Surface, context, permission, review, 적합 작업을 열로 둡니다. 예를 들어 Codex cloud는 background task와 diff review에, Codex CLI나 Claude Code는 terminal 조사와 로컬 수정에, Cursor는 editor 안 multi-file edit와 search workflow에 배치할 수 있습니다. 이 배치는 절대 규칙이 아니라 판단 틀입니다.

```text
비교 축:
- surface: chat / terminal / editor / cloud
- context: selected files / local repo / remote sandbox / search tools
- permission: read / edit / run command / network
- review: explanation / diff / test output / PR
- fit: explanation / debugging / multi-file edit / background issue
```

### 작업 위험도에 따라 권한을 낮춘다

처음부터 모든 도구에 full access를 주지 않습니다. 설명과 조사 작업은 read-only로 충분합니다. 작은 수정은 제한된 path edit와 test command로 충분합니다. Dependency install, delete, deployment, secret access는 승인 대상으로 둡니다. 도구 비교는 “무엇을 할 수 있나”만 보는 것이 아니라 “무엇을 못 하게 막을 수 있나”도 봐야 합니다.

### 결과는 같은 형식으로 받는다

도구마다 UI는 달라도 결과 보고는 표준화할 수 있습니다. 변경 파일, 실행한 명령, test result, 남은 risk, 사람이 확인해야 할 점을 요구합니다. 이렇게 하면 Codex, Claude Code, Cursor 중 어떤 도구가 만든 결과라도 팀이 같은 기준으로 검토할 수 있습니다.

### 학습자는 도구보다 workflow를 익힌다

초보자는 특정 도구 단축키를 외우기 전에 “어떤 작업을 chat으로 묻고, 어떤 작업을 agent에게 맡기며, 어떤 결과를 test와 diff로 검토하는가”를 익혀야 합니다. 도구는 바뀌지만 workflow는 오래 갑니다. 이 강의가 도구 비교를 학습하는 이유도 여기에 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 공식 문서의 범위입니다. 각 도구의 세부 기능과 UI는 빠르게 바뀔 수 있습니다. 따라서 이 강의는 2026-07-12에 확인한 KB 출처 범위에서 surface와 workflow 중심으로 설명합니다. 최신 옵션이나 가격, 모델 이름 같은 변동 정보는 도구 사용 시 공식 문서에서 다시 확인해야 합니다.

두 번째 한계는 도구 이름이 workflow를 보장하지 않는다는 점입니다. 같은 Codex라도 cloud task와 CLI 사용은 다르고, 같은 editor agent라도 팀의 rules와 review 기준에 따라 결과 품질이 달라집니다. 도구 선택만으로 품질 문제가 해결되지는 않습니다.

세 번째 trade-off는 편의성과 통제입니다. Agent가 더 많이 할수록 사용자는 덜 입력하지만, 그만큼 권한과 review가 중요해집니다. 반대로 read-only chat은 안전하지만 실제 수정은 사람이 해야 합니다. 좋은 팀은 작업 위험도에 맞춰 surface와 permission을 조정합니다.

네 번째 한계는 과도한 비교입니다. 도구 비교 자체에 시간을 많이 쓰면 실제 작업 개선이 늦어집니다. 작은 task를 정하고, 후보 도구 하나로 실행해 보고, review 결과를 기준으로 조정하는 방식이 더 현실적입니다.

## 더 읽기

이 강의의 근거 KB는 `ai-coding-tool-comparison`입니다. 먼저 OpenAI의 Codex 소개를 읽어 cloud agent가 task를 수행하는 흐름을 보고, Codex CLI 문서에서 terminal surface가 inspect, edit, run code를 어떻게 다루는지 확인하세요. 이어서 Claude Code overview를 읽어 terminal/codebase 중심 agentic coding tool의 의미를 보고, Cursor agent best practices에서 search tools와 review guidance를 확인하면 비교 축이 더 선명해집니다.

다음 강의는 `tool-permissions-sandboxes`입니다. 도구 비교의 가장 중요한 후속 질문은 “그 도구가 무엇을 할 수 있는가”가 아니라 “그 행동을 어디까지 허용하고 어떻게 격리할 것인가”입니다. Permission과 sandbox를 배우면 AI coding tool을 더 안전한 팀 workflow로 가져올 수 있습니다.
