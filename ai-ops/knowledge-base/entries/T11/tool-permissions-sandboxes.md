---
id: tool-permissions-sandboxes
title: "AI 도구 권한과 Sandbox (Tool Permissions and Sandboxes)"
topicGroup: T11
status: approved
score: 91
level: 중급
prerequisites: [ide-agent-era]
successors: []
related: [harness, agent-loop, ai-coding-tool-comparison]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "OpenAI Developers — Codex CLI", url: "https://developers.openai.com/codex/cli", checked: 2026-07-12 }
  - { title: "Anthropic Claude Code — Configure permissions", url: "https://code.claude.com/docs/en/permissions", checked: 2026-07-12 }
  - { title: "Anthropic Claude Code — Configure sandboxing", url: "https://code.claude.com/docs/en/sandboxing", checked: 2026-07-12 }
  - { title: "Anthropic Claude Code — Settings", url: "https://code.claude.com/docs/en/settings", checked: 2026-07-12 }
  - { title: "GitHub Docs — Responsible use of GitHub Copilot Agents", url: "https://docs.github.com/en/copilot/responsible-use/agents", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
AI 도구 권한과 sandbox는 agentic coding tool이 파일 읽기·쓰기, shell command, network access, 외부 tool use를 어디까지 수행할 수 있는지 제한하고 격리하는 실행 안전 장치다. Codex CLI는 permissions와 sandboxing으로 agent actions를 제어하고, Claude Code 문서는 fine-grained permission rules와 sandboxing을 complementary security layers로 설명한다. (출처: https://developers.openai.com/codex/cli, https://code.claude.com/docs/en/permissions, https://code.claude.com/docs/en/sandboxing, 확인: 2026-07-12)

## 역사
AI 코딩 도구가 autocomplete와 chat을 넘어 file edit와 command execution을 수행하면서 권한 제어가 필수 요소가 되었다. Codex CLI는 terminal에서 code inspection, editing, command execution을 수행할 수 있다고 문서화하고, Claude Code는 permissions로 tool use를 구성하고 sandboxing으로 Bash command의 filesystem/network 접근을 제한한다고 설명한다. GitHub Copilot Agents 문서도 explicit permission prompts와 firewalled environment를 설명한다. (출처: https://developers.openai.com/codex/cli, https://code.claude.com/docs/en/permissions, https://code.claude.com/docs/en/sandboxing, https://docs.github.com/en/copilot/responsible-use/agents, 확인: 2026-07-12)

## 해결하려는 문제
Agent가 파일을 수정하고 command를 실행할 수 있으면 잘못된 삭제, secret 노출, 외부 network 호출, dependency 변경, production resource 접근 같은 위험이 생긴다. Tool permissions와 sandboxes는 agent가 수행할 수 있는 행동을 제한하고, 위험 행동에서 사람 승인 또는 차단을 적용해 blast radius를 줄인다. GitHub responsible use 문서도 command execution과 explicit permission prompts를 설명한다. (출처: https://developers.openai.com/codex/cli, https://code.claude.com/docs/en/permissions, https://docs.github.com/en/copilot/responsible-use/agents, 확인: 2026-07-12)

## 핵심 개념
1. **Permission policy**: 어떤 tool과 command를 허용할지 정하는 규칙이다. Claude Code permissions 문서는 allow, ask, deny rules로 tool use를 구성한다고 설명한다. (출처: https://code.claude.com/docs/en/permissions, 확인: 2026-07-12)
2. **Approval prompt**: GitHub Copilot Agents 문서는 local agentic execution에서 action이 current directory로 scoped되고 explicit permission prompts를 요구한다고 설명한다. (출처: https://docs.github.com/en/copilot/responsible-use/agents, 확인: 2026-07-12)
3. **Sandbox**: Sandbox는 file system이나 network 같은 실행 자원을 제한하는 경계다. Codex CLI는 sandboxing을 문서화하고, GitHub Copilot Agents 문서는 ephemeral, firewalled execution을 설명한다. (출처: https://developers.openai.com/codex/cli, https://docs.github.com/en/copilot/responsible-use/agents, 확인: 2026-07-12)
4. **Settings hierarchy**: Claude Code settings 문서는 managed, command line, local, project, user settings precedence로 동작을 구성한다고 설명한다. (출처: https://code.claude.com/docs/en/settings, 확인: 2026-07-12)
5. **Defense-in-depth**: Claude Code permissions 문서는 permissions와 sandboxing을 complementary security layers로 설명한다. Permission, sandbox, review, test는 하나만으로 충분하지 않고 함께 적용해야 한다. (출처: https://code.claude.com/docs/en/permissions, 확인: 2026-07-12)

## 관련 기술
- Harness Engineering: permission과 sandbox는 agent harness의 execution boundary다. (출처: https://developers.openai.com/codex/cli, 확인: 2026-07-12)
- Agent Loop: tool use가 반복되므로 각 turn에서 허용된 action을 제한해야 한다. (출처: https://code.claude.com/docs/en/permissions, 확인: 2026-07-12)
- Secret Management: agent에게 secret 값이나 production credential을 노출하지 않도록 environment와 log를 분리해야 한다. (출처: https://developers.openai.com/codex/cli, 확인: 2026-07-12)

## 선행 개념
- ide-agent-era: 파일 수정과 command 실행을 수행하는 agent surface를 알아야 permission과 sandbox의 필요성을 이해할 수 있다.

## 후행 개념
- ai-code-review-tools: 권한과 sandbox를 지난 agent output을 diff review와 CI로 검증하는 단계로 확장된다.

## AI 시대에서의 의미
바이브코딩에서 agent에게 "고쳐줘"라고만 요청하면 실행 권한과 위험 경계가 불명확하다. 실무에서는 allowed files, allowed commands, network policy, secret access, approval threshold를 함께 지정해야 한다. Codex CLI와 Claude Code가 permissions와 sandboxing을 문서화하는 이유는 agentic coding이 실행 권한을 동반하기 때문이다. (출처: https://developers.openai.com/codex/cli, https://code.claude.com/docs/en/permissions, https://code.claude.com/docs/en/sandboxing, 확인: 2026-07-12)

## 실무 활용
1. **읽기 전용 조사**: 처음에는 read/search만 허용해 agent가 코드 구조를 요약하게 한다. (출처: https://developers.openai.com/codex/cli, 확인: 2026-07-12)
2. **제한된 편집**: 특정 directory나 file set만 수정하도록 task scope와 permission rules를 제한한다. (출처: https://code.claude.com/docs/en/permissions, 확인: 2026-07-12)
3. **위험 command 승인**: install, delete, network, deployment command는 approval을 요구하도록 둔다. (출처: https://developers.openai.com/codex/cli, https://docs.github.com/en/copilot/responsible-use/agents, 확인: 2026-07-12)

```text
권한 정책 예시:
- allow: read files, search, edit src/content only
- require approval: package install, network access, delete, deployment
- deny: secret print, production database command
```

## FAQ
Q: Sandbox가 있으면 review가 필요 없는가?
A: 아니다. Sandbox는 실행 경계를 줄이지만 잘못된 코드 변경 자체를 막지는 않는다. diff와 test review가 필요하다. (출처: https://developers.openai.com/codex/cli, 확인: 2026-07-12)

Q: Permission과 approval은 같은가?
A: 아니다. Permission은 허용 범위이고 approval은 실행 전 사람 승인을 요구하는 정책이다. (출처: https://code.claude.com/docs/en/permissions, https://docs.github.com/en/copilot/responsible-use/agents, 확인: 2026-07-12)

Q: Project settings와 user settings는 왜 나누는가?
A: Claude Code settings 문서는 계층별 settings precedence를 제공하므로 개인 기본값과 프로젝트 정책을 분리할 수 있다. (출처: https://code.claude.com/docs/en/settings, 확인: 2026-07-12)

## 자주 하는 실수
1. **전권 부여**: 처음부터 full access를 준다. read-only 조사 후 제한된 edit로 확장한다. (출처: https://developers.openai.com/codex/cli, 확인: 2026-07-12)
2. **Secret 노출**: agent에게 실제 token이나 password를 제공한다. secret은 code, log, prompt에서 분리한다. (출처: https://developers.openai.com/codex/cli, 확인: 2026-07-12)
3. **설정 파일 미관리**: project permission policy를 기록하지 않아 실행자마다 다른 행동을 한다. settings hierarchy를 문서화한다. (출처: https://code.claude.com/docs/en/settings, 확인: 2026-07-12)

## 공식 출처
- Codex CLI approval/sandbox surface — [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli) (확인 날짜: 2026-07-12)
- Claude Code permissions — [Anthropic Claude Code — Configure permissions](https://code.claude.com/docs/en/permissions) (확인 날짜: 2026-07-12)
- Claude Code sandboxing — [Anthropic Claude Code — Configure sandboxing](https://code.claude.com/docs/en/sandboxing) (확인 날짜: 2026-07-12)
- Claude Code settings hierarchy — [Anthropic Claude Code — Settings](https://code.claude.com/docs/en/settings) (확인 날짜: 2026-07-12)
- GitHub Copilot agent permission prompts and firewalled environment — [GitHub Docs — Responsible use of GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) (확인 날짜: 2026-07-12)

## Quote Bank
- > "Inspect, edit, and run code"
  - 출처: [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli) (확인: 2026-07-12)
  - 맥락: agentic coding tool의 실행 권한 범위를 설명할 때 사용한다.
- > "permissions, and commands"
  - 출처: [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli) (확인: 2026-07-12)
  - 맥락: 위험 행동의 사람 승인 정책을 설명할 때 사용한다.
- > "Sandboxing"
  - 출처: [OpenAI Developers — Codex CLI](https://developers.openai.com/codex/cli) (확인: 2026-07-12)
  - 맥락: 실행 환경 격리를 설명할 때 사용한다.
- > "fine-grained permissions"
  - 출처: [Anthropic Claude Code — Configure permissions](https://code.claude.com/docs/en/permissions) (확인: 2026-07-12)
  - 맥락: Claude Code tool use 제어를 설명할 때 사용한다.
- > "Sandboxing provides OS-level enforcement"
  - 출처: [Anthropic Claude Code — Configure sandboxing](https://code.claude.com/docs/en/sandboxing) (확인: 2026-07-12)
  - 맥락: sandbox가 permission과 다른 실행 경계를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
