## 한 줄 정의

AI 도구 권한과 sandbox는 agentic coding tool이 파일 읽기·쓰기, shell command, network access, 외부 tool use를 어디까지 수행할 수 있는지 제한하고 격리하는 실행 안전 장치입니다. Codex CLI는 agent가 code를 inspect, edit, run할 수 있는 terminal surface를 문서화하고, Claude Code는 fine-grained permissions와 sandboxing을 complementary security layers로 설명합니다. ==권한과 sandbox의 핵심은 AI를 믿지 않는 태도가 아니라, 실행 권한을 가진 시스템을 검토 가능한 경계 안에 두는 설계==입니다.

이 강의는 “AI가 위험하니 쓰지 말자”가 아니라 “AI가 실제로 파일을 바꾸고 명령을 실행할 수 있을 때 무엇을 통제해야 하는가”를 다룹니다. 자동완성과 chat coding은 주로 제안과 설명의 영역이었습니다. IDE agent와 terminal agent는 여기에 file edit, command execution, test run, tool invocation을 추가합니다. 행동이 생기면 권한이 필요하고, 권한이 생기면 경계가 필요합니다.

KB의 공식 출처는 Codex CLI, Claude Code permissions, Claude Code sandboxing, Claude Code settings, GitHub Copilot Agents responsible use입니다. 이 출처들은 공통적으로 permission, sandbox, explicit permission prompt, settings hierarchy, firewalled environment 같은 실행 안전 개념을 다룹니다. 초보자에게는 낯선 단어가 많지만, 핵심 질문은 단순합니다. “AI가 무엇을 할 수 있고, 무엇은 물어봐야 하며, 무엇은 아예 못 하게 할 것인가?”

![권한과 Sandbox 방어 계층](/lesson-diagrams/tool-permissions-sandboxes/permission-sandbox-layers.svg)

## 왜 존재하는가

AI 코딩 도구가 autocomplete와 chat에 머물 때 위험은 주로 잘못된 제안을 받아들이는 데 있었습니다. 하지만 agentic coding tool은 더 많은 행동을 할 수 있습니다. 파일을 수정하고, shell command를 실행하고, test를 돌리고, 때로는 외부 도구나 network와 연결될 수 있습니다. 이 능력은 생산성을 크게 높이지만, 잘못 사용하면 삭제, secret 노출, dependency 변경, production resource 접근 같은 사고로 이어질 수 있습니다.

권한과 sandbox는 이 blast radius를 줄이기 위해 생겼습니다. “AI가 판단을 잘할 것”이라는 기대만으로는 부족합니다. 사람이 아무리 좋은 prompt를 써도 모델은 잘못된 command를 제안하거나, 필요한 확인 없이 위험한 파일을 바꾸거나, 오래된 전제를 따라갈 수 있습니다. ==Agentic coding의 안전성은 모델의 선의가 아니라, 실행 환경과 permission policy의 설계에서 나온다==고 봐야 합니다.

또 다른 이유는 팀 일관성입니다. 개인마다 AI 도구 설정이 다르면 같은 repository에서도 어떤 사람은 read-only로 쓰고, 어떤 사람은 full access로 씁니다. Claude Code settings 문서가 managed, command line, local, project, user settings precedence 같은 계층을 설명하는 이유는 이런 정책을 구조화하기 위해서입니다. 팀에서는 개인 편의보다 프로젝트 안전 기준이 우선되어야 할 때가 많습니다.

마지막 이유는 검토 가능성입니다. 권한이 제한되어 있으면 agent의 행동을 이해하기 쉽습니다. read/search만 허용한 조사 단계, 제한된 edit 단계, 승인 필요한 command 단계로 나누면 실패했을 때 어디서 문제가 생겼는지 추적할 수 있습니다. 권한이 너무 넓으면 결과가 빠를 수 있지만 검토와 복구가 어려워집니다.

## 작동 원리

### 1. 행동을 tool 단위로 나눈다

Permission 설계의 첫 단계는 agent가 할 수 있는 행동을 나누는 것입니다. 읽기, 검색, 파일 수정, shell command, network access, dependency install, delete, deployment는 모두 위험도가 다릅니다. 이들을 하나의 “AI 사용 허용”으로 묶으면 통제가 불가능합니다.

읽기와 검색은 상대적으로 안전하지만 secret이 파일에 있으면 여전히 조심해야 합니다. 파일 수정은 diff review가 필요합니다. Shell command는 실행 환경에 영향을 줄 수 있습니다. Network access와 deployment는 외부 시스템에 영향을 줄 수 있습니다. ==권한 정책은 AI에게 허락할 행동을 기능명이 아니라 위험 단위로 분해하는 작업==입니다.

### 2. allow, ask, deny 같은 정책을 둔다

KB는 Claude Code permissions 문서가 allow, ask, deny rules로 tool use를 구성한다고 정리합니다. 이 세 단계는 실무적으로 매우 유용합니다. 안전하고 반복적인 행동은 allow, 위험하지만 필요할 수 있는 행동은 ask, 절대 하면 안 되는 행동은 deny로 둡니다.

예를 들어 read/search는 allow, `src/content` 하위의 제한된 edit는 allow 또는 ask, package install과 delete는 ask, secret print와 production database command는 deny로 둘 수 있습니다. 이렇게 나누면 agent가 멈춰야 할 지점이 명확해집니다. 사람의 승인은 귀찮은 방해가 아니라 blast radius를 줄이는 checkpoint입니다.

### 3. Sandbox가 실행 자원 접근을 제한한다

Permission rule은 “무엇을 허용할지”의 정책이고, sandbox는 “실제로 어디까지 접근 가능한지”의 실행 경계입니다. KB는 Claude Code sandboxing 문서가 OS-level enforcement를 제공한다고 정리하고, GitHub Copilot Agents 문서가 ephemeral, firewalled environment를 설명한다고 정리합니다. Codex CLI도 sandboxing을 문서화합니다.

Sandbox는 filesystem과 network 같은 자원 접근을 제한합니다. 예를 들어 agent가 잘못된 command를 실행해도 sandbox 밖의 파일이나 network로 영향을 확장하지 못하게 할 수 있습니다. 다만 sandbox는 논리 오류를 자동으로 고치지 않습니다. 잘못된 코드가 sandbox 안에서 만들어질 수 있고, 그 diff를 사람이 review하지 않으면 여전히 문제가 됩니다.

### 4. Settings hierarchy로 정책을 배치한다

실무에서는 권한 정책이 한 곳에만 있지 않습니다. Claude Code settings 문서는 managed, command line, local, project, user settings precedence를 설명합니다. 이 구조는 개인 기본값, 프로젝트 정책, 조직 관리 설정을 구분하게 해줍니다. 팀 repository에서는 project settings가 중요한 이유가 여기에 있습니다.

정책이 여러 계층에 흩어지면 “왜 이 command가 허용됐지?” 또는 “왜 이 tool이 막혔지?”를 추적해야 합니다. Settings hierarchy를 문서화하면 agent behavior를 재현하기 쉬워집니다. AI 도구 설정도 코드처럼 팀이 읽고 검토해야 하는 운영 자산이 됩니다.

### 5. Review와 test가 마지막 경계다

Permission과 sandbox가 있어도 마지막 경계는 review와 test입니다. Permission은 행동을 제한하고, sandbox는 실행 환경을 격리하지만, agent가 만든 코드가 요구사항을 만족하는지는 별도의 문제입니다. 따라서 diff review, test run, build, human review가 필요합니다.

```ts
type AgentAction =
  | { kind: "read"; path: string }
  | { kind: "edit"; path: string }
  | { kind: "command"; value: string }
  | { kind: "network"; url: string }

type PermissionDecision = "allow" | "ask" | "deny"

export function decideAgentAction(action: AgentAction): PermissionDecision {
  if (action.kind === "read") return "allow"
  if (action.kind === "edit") {
    return action.path.startsWith("src/content/") ? "allow" : "ask"
  }
  if (action.kind === "command") {
    return /deploy|remove|delete|install/i.test(action.value) ? "ask" : "allow"
  }
  return "ask"
}
```

이 예시는 실제 보안 정책이 아니라 학습용 모델입니다. 핵심은 agent action을 종류별로 분해하고, 위험도에 따라 allow/ask/deny를 다르게 적용한다는 점입니다.

## 스펙과 세부

### Permission은 도구 사용의 의사결정 레이어다

Permission policy는 agent가 어떤 tool을 사용할 수 있는지 결정합니다. Claude Code permissions 문서는 fine-grained permissions를 설명하고, allow/ask/deny rules를 통해 tool use를 구성한다고 KB가 정리합니다. Fine-grained라는 말은 “AI 사용 허용” 같은 큰 스위치보다 세분화된 정책이 필요하다는 뜻입니다.

### Approval prompt는 인간의 판단을 loop 안에 넣는다

GitHub Copilot Agents 문서는 explicit permission prompts를 설명합니다. Approval prompt는 agent가 위험 행동을 하기 전에 사람에게 묻는 단계입니다. 이것은 속도를 늦추는 장치처럼 보일 수 있지만, 잘못된 command나 과도한 변경을 막는 중요한 checkpoint입니다. 특히 local agentic execution에서는 current directory scope와 함께 승인 prompt가 중요합니다.

### Sandbox는 permission과 다른 층이다

Claude Code permissions 문서는 permissions와 sandboxing을 complementary security layers로 설명한다고 KB가 정리합니다. 이 문장을 잘 읽어야 합니다. Permission은 정책이고 sandbox는 실행 강제입니다. Permission이 잘못 설정되어도 sandbox가 일부 위험을 막을 수 있고, sandbox가 있어도 permission이 넓으면 불필요한 행동이 많아질 수 있습니다. 둘은 대체 관계가 아니라 함께 쓰는 층입니다.

### Settings precedence는 재현성을 만든다

Settings hierarchy는 agent behavior를 추적하게 해줍니다. Managed setting이 project setting보다 우선할 수 있고, command line option이 local setting을 덮을 수 있습니다. 이 구조를 이해하지 못하면 팀원이 같은 prompt를 써도 다른 권한 결과를 경험할 수 있습니다. 권한 정책도 문서화와 review가 필요합니다.

### Secret은 prompt, log, code에서 분리한다

KB는 secret management를 관련 기술로 다룹니다. Agent에게 실제 token이나 password를 제공하면 prompt, log, tool output에 남을 수 있습니다. Secret은 environment와 secret store로 분리하고, AI에게 제공하는 로그에서는 민감 값을 제거해야 합니다. Permission이 아무리 좋아도 secret을 직접 붙여 넣으면 이미 경계가 깨진 것입니다.

## 원문으로 읽기

> "Inspect, edit, and run code"
>
> — 코드를 검사하고, 편집하고, 실행한다.
> [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli)

이 문장은 agentic coding tool의 권한 범위를 직관적으로 보여줍니다. inspect만 할 때와 edit/run이 가능할 때의 위험은 다릅니다. 따라서 AI 도구를 도입할 때는 어떤 행동이 가능한지 먼저 목록화해야 합니다.

> "permissions, and commands"
>
> — 권한과 명령.
> [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli)

짧은 구절이지만 핵심 축을 담고 있습니다. Agent가 command를 실행할 수 있다면 permission 정책은 부가 기능이 아니라 기본 안전 장치입니다. 명령 실행 권한은 항상 review와 approval 기준을 요구합니다.

> "Sandboxing"
>
> — 샌드박싱.
> [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli)

Codex CLI 문서가 sandboxing을 별도 축으로 다룬다는 사실 자체가 중요합니다. Agentic coding에서 실행 환경 격리는 선택적 장식이 아니라 권한 모델의 일부입니다. 특히 파일 시스템과 network 접근을 어디까지 허용할지 정해야 합니다.

> "fine-grained permissions"
>
> — 세분화된 권한.
> [Anthropic Claude Code — Configure permissions](https://code.claude.com/docs/en/permissions)

Fine-grained permissions는 안전한 AI 사용의 실무 기준입니다. 모든 것을 허용하거나 모두 막는 방식은 오래가지 못합니다. 행동별 위험도에 따라 allow, ask, deny를 나누어야 실제 작업 속도와 안전성을 함께 얻을 수 있습니다.

> "Sandboxing provides OS-level enforcement"
>
> — 샌드박싱은 OS 수준의 강제를 제공한다.
> [Anthropic Claude Code — Configure sandboxing](https://code.claude.com/docs/en/sandboxing)

이 문장은 sandbox가 단순한 UI 경고가 아니라 실행 환경 수준의 경계임을 보여줍니다. 다만 OS-level enforcement가 코드 correctness를 보장하지는 않습니다. 안전한 실행과 올바른 결과는 다른 문제이므로 review와 test가 계속 필요합니다.

## 실전에서

### read-only 조사부터 시작한다

처음 agent에게 맡기는 작업은 read/search만 허용하는 것이 좋습니다. “관련 파일을 찾고 구조를 설명하라. 아직 수정하지 말라”는 방식입니다. 이 단계에서는 agent가 repository를 어떻게 이해하는지 볼 수 있고, 수정 권한 없이도 많은 학습 효과를 얻을 수 있습니다.

### 제한된 edit로 확장한다

조사 결과가 타당하면 특정 path에만 edit를 허용합니다. 예를 들어 `src/components` 또는 `src/content/lessons/markdown`처럼 범위를 정합니다. 범위가 좁으면 diff review가 쉬워지고, agent가 의도치 않게 설정 파일이나 secret 관련 파일을 바꾸는 위험을 줄일 수 있습니다.

### 위험 command는 approval로 멈춘다

Install, delete, network, deployment command는 approval 대상으로 둡니다. 특히 deployment는 외부 사용자에게 영향을 줄 수 있으므로 별도 human gate가 필요합니다. 이 프로젝트에서도 배포(P-09)는 별도 승인 없이 수행하지 않는 정책이 있습니다. 같은 원리를 모든 agent workflow에 적용할 수 있습니다.

### 권한 정책을 문서화한다

팀에서는 AI 도구 설정을 개인 취향으로만 두지 말고 repository 문서에 남깁니다. 허용되는 작업, 승인 필요한 작업, 금지 작업, 검증 명령을 적어둡니다. Settings hierarchy가 있는 도구에서는 project setting과 user setting의 우선순위도 함께 기록합니다.

```text
권한 정책 예시:
- allow: read files, search, edit src/content only
- ask: package install, delete, network access, deployment
- deny: secret print, production database command
- verify: npm run lint && npm run typecheck && npm run test
```

### 결과는 권한 로그와 함께 본다

Agent가 어떤 파일을 읽고, 어떤 파일을 바꾸고, 어떤 command를 실행했는지 확인해야 합니다. 결과 diff만 보면 왜 그런 변경이 나왔는지 알기 어렵습니다. 실행 로그와 permission decision을 함께 보면 agent loop의 실패 지점을 더 잘 찾을 수 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 sandbox가 만능이 아니라는 점입니다. Sandbox는 실행 자원 접근을 제한하지만, 잘못된 business logic이나 빠진 edge case를 자동으로 잡지 못합니다. 따라서 sandbox가 있어도 test와 review는 필요합니다.

두 번째 trade-off는 속도와 승인 비용입니다. Approval prompt가 많으면 작업이 느려지고, 너무 적으면 위험합니다. 그래서 모든 command를 묻는 방식보다 위험 행동을 기준으로 ask를 배치하는 fine-grained policy가 필요합니다.

세 번째 한계는 설정 복잡도입니다. Settings hierarchy가 생기면 팀 정책을 세밀하게 만들 수 있지만, 어디서 어떤 설정이 우선하는지 모르면 혼란이 생깁니다. 설정도 코드처럼 문서화하고 review해야 합니다.

네 번째 한계는 사용자 과신입니다. Permission이 제한되어 있으면 안전하다고 느끼지만, agent가 만든 코드가 요구사항과 맞는지는 별도 검증입니다. Permission, sandbox, review, test를 defense-in-depth로 함께 봐야 합니다.

## 더 읽기

이 강의의 근거 KB는 `tool-permissions-sandboxes`입니다. 먼저 Codex CLI 문서에서 inspect, edit, run code와 permissions, commands, sandboxing이 어떻게 함께 다뤄지는지 확인하세요. 이어서 Claude Code permissions 문서에서 fine-grained permissions와 allow/ask/deny rule을 읽고, Claude Code sandboxing 문서에서 OS-level enforcement의 의미를 확인합니다. 마지막으로 Claude Code settings와 GitHub Copilot Agents responsible use를 읽으면 settings hierarchy와 explicit permission prompts, firewalled environment의 관계가 보입니다.

다음 흐름은 `ai-code-review-tools` 또는 practical vibe coding 영역으로 이어집니다. Permission과 sandbox로 실행 경계를 만들었다면, 그 다음에는 agent가 만든 diff를 어떤 기준으로 검토하고 test할지 배워야 합니다. 안전한 AI 코딩은 한 장치가 아니라 여러 장치가 겹쳐진 운영 습관입니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다. 본문은 승인 KB의 Codex CLI, Claude Code permissions/sandboxing/settings, GitHub Copilot Agents 출처 범위 안에서 작성했으며, KB 외 신규 사실을 추가하지 않았습니다. 하이라이트는 섹션당 3개 이하로 제한했고, 코드 예시는 permission decision을 설명하는 독립 TypeScript 예시입니다.
