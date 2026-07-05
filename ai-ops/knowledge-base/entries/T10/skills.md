---
id: skills
title: "Skills (Agent Skills)"
topicGroup: T10
status: approved
score: 93
level: 중급
prerequisites: [context-engineering]
successors: [orchestration, harness]
related: [context-engineering, agent-loop, mcp]
consumers:
  lessons: [designing-reusable-skills, context-engineering-mcp-skills]
  glossary: [Skills]
sources:
  - { title: "Agent Skills", url: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview", checked: 2026-07-05 }
  - { title: "Skill authoring best practices", url: "https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices", checked: 2026-07-05 }
  - { title: "Extend Claude with skills", url: "https://code.claude.com/docs/en/skills", checked: 2026-07-05 }
  - { title: "Agent Skills in the SDK", url: "https://code.claude.com/docs/en/agent-sdk/skills", checked: 2026-07-05 }
  - { title: "Tools reference", url: "https://code.claude.com/docs/en/tools-reference", checked: 2026-07-05 }
  - { title: "Extend Claude Code", url: "https://code.claude.com/docs/en/features-overview", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Skills는 에이전트가 필요할 때 불러 쓰는 재사용 가능한 지침·메타데이터·자료 묶음이다. Claude Platform 문서는 Agent Skills를 Claude의 기능을 확장하는 modular capabilities로 정의하고, 각 Skill이 instructions, metadata, optional resources를 패키징한다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## 역사
Claude Platform 문서는 Agent Skills를 claude.ai, Claude API, Claude Code에서 쓸 수 있는 기능으로 설명하며, custom Skills를 Claude Code에서 만들거나 API로 업로드하거나 claude.ai 설정에 추가할 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)
Claude Code 문서는 custom commands가 Skills로 병합되었고, `.claude/commands/deploy.md`와 `.claude/skills/deploy/SKILL.md`가 모두 `/deploy`를 만들며 기존 command 파일도 계속 동작한다고 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)

## 해결하려는 문제
같은 체크리스트, 절차, 도메인 규칙을 매 대화마다 다시 붙여 넣으면 컨텍스트가 낭비되고 결과 일관성이 떨어진다. Claude Code 문서는 같은 instructions, checklist, multi-step procedure를 반복해서 붙여 넣을 때 Skill을 만들라고 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)
Claude Platform 문서는 Skills가 prompts와 달리 on-demand로 로드되어 여러 대화에서 같은 guidance를 반복 제공할 필요를 줄인다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## 핵심 개념
1. Skill은 instructions, metadata, optional resources를 포함하는 modular capability다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)
2. `SKILL.md`는 YAML frontmatter와 Markdown 지침으로 구성되며, Claude Code 문서는 모든 skill에 `SKILL.md`가 필요하다고 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)
3. `description`은 Skill discovery를 가능하게 하며, 무엇을 하는지와 언제 사용할지를 포함해야 한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, 확인: 2026-07-05)
4. Skills는 progressive disclosure를 사용해 metadata는 항상 로드하고, 본문과 리소스는 필요할 때 로드한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)
5. Claude Code에서는 personal, project, enterprise, plugin 위치의 skills를 구분하고, project skill은 `.claude/skills/<skill-name>/SKILL.md`에 둘 수 있다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)
6. Claude Agent SDK에서 Skills는 filesystem artifacts로 정의되고, startup 시 metadata가 발견되며, full content는 trigger될 때 로드된다. (출처: https://code.claude.com/docs/en/agent-sdk/skills, 확인: 2026-07-05)

## 관련 기술
- Context Engineering vs Skills: context engineering은 추론 시점 정보 상태를 관리하고, Skills는 반복 절차와 자료를 필요할 때 로드하는 파일 기반 재사용 단위다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)
- Skills vs Tools: Claude Code 문서는 custom tools를 추가하려면 MCP server를 연결하고, reusable prompt-based workflow를 확장하려면 Skill을 쓰라고 설명한다. (출처: https://code.claude.com/docs/en/tools-reference, 확인: 2026-07-05)
- Skills vs Custom Commands: Claude Code 문서는 custom commands가 Skills로 병합되었으며 Skills가 supporting files를 지원하므로 권장된다고 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)

## 선행 개념
- context-engineering: Skill은 필요할 때만 본문과 리소스를 로드해 컨텍스트 비용을 줄이는 구조이므로 컨텍스트가 유한한 자원이라는 이해가 먼저 필요하다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## 후행 개념
- orchestration: 여러 specialist agent나 workflow가 각자 필요한 Skill을 쓰려면 어느 단계에서 어떤 capability를 로드할지 조정해야 한다. (출처: https://code.claude.com/docs/en/features-overview, 확인: 2026-07-05)
- harness: Skill이 scripts나 resources를 포함할 수 있으므로 신뢰, 감사, 권한, 샌드박스 경계 설계가 필요하다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 Skills는 “매번 같은 프롬프트를 복사하는 방식”을 “검증된 절차를 재사용하는 방식”으로 바꾼다. Claude Code 문서는 Skill을 같은 instructions, checklist, multi-step procedure를 반복해서 붙여 넣는 상황의 해결책으로 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)
Skills는 컨텍스트 비용을 줄이는 장치이기도 하다. Claude Platform 문서는 metadata만 startup에 로드하고, SKILL.md 본문은 request가 description과 맞을 때 context window에 들어간다고 설명한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## 실무 활용
1. 문서 생성 Skill: 반복되는 보고서 형식, 검증 절차, 예시 파일을 `SKILL.md`, `examples/`, `scripts/`로 나누어 둔다. (근거: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)
2. 코드 리뷰 Skill: 프로젝트 규칙과 체크리스트를 Skill로 두고, description에 언제 사용할지 명시한다. (근거: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, 확인: 2026-07-05)
3. API 작업 Skill: 상세 API reference는 별도 파일로 분리하고 SKILL.md는 목차와 사용 조건만 담아 progressive disclosure를 유지한다. (근거: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, 확인: 2026-07-05)

```ts
type SkillManifest = {
  name: string
  description: string
  entrypoint: "SKILL.md"
  supportingFiles: string[]
}
```

## FAQ
Q: Skill은 프롬프트와 같은가?
A: 아니다. Claude Platform 문서는 Skills를 on-demand로 로드되는 filesystem-based resources로 설명하고, prompts는 conversation-level one-off instructions로 구분한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

Q: Skill에는 무엇이 꼭 필요한가?
A: Claude Code 문서는 모든 skill에 `SKILL.md`가 필요하고, YAML frontmatter와 Markdown 지침으로 구성된다고 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)

Q: Skill이 항상 자동으로 실행되는가?
A: 아니다. Claude Code 문서는 Skill이 관련 있을 때 사용되거나 `/skill-name`으로 직접 호출될 수 있으며, `disable-model-invocation: true`로 모델 자동 호출을 막을 수 있다고 설명한다. (출처: https://code.claude.com/docs/en/skills, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: description을 짧고 모호하게 쓴다. 왜 생기나: Skill 본문이 충분하면 Claude가 알아서 고른다고 생각한다. 교정: description에 무엇을 하는지와 언제 쓸지를 함께 적는다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, 확인: 2026-07-05)
2. 실수: 모든 자료를 SKILL.md 본문에 넣는다. 왜 생기나: 한 파일이 관리하기 쉽다고 생각한다. 교정: 500줄에 가까워지면 supporting files로 분리하고 SKILL.md는 overview와 navigation으로 유지한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices, 확인: 2026-07-05)
3. 실수: 신뢰하지 않는 Skill을 그대로 사용한다. 왜 생기나: Skill을 단순 문서로 본다. 교정: scripts, images, resources까지 감사하고, 악성 Skill이 도구나 코드 실행을 유도할 수 있음을 고려한다. (출처: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, 확인: 2026-07-05)

## 공식 출처
- Agent Skills는 instructions, metadata, optional resources를 패키징하는 modular capabilities다 — [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (확인: 2026-07-05)
- 좋은 Skill은 concise, well-structured, real usage로 테스트되어야 한다 — [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) (확인: 2026-07-05)
- Claude Code에서 Skill은 `SKILL.md` 파일로 만들고 관련 시 자동 사용하거나 `/skill-name`으로 직접 호출할 수 있다 — [Extend Claude with skills](https://code.claude.com/docs/en/skills) (확인: 2026-07-05)
- Claude Agent SDK에서 Skills는 filesystem artifacts이고 metadata discovery와 triggered content loading을 따른다 — [Agent Skills in the SDK](https://code.claude.com/docs/en/agent-sdk/skills) (확인: 2026-07-05)
- Claude Code에서 custom tools는 MCP server, reusable prompt-based workflow는 Skill로 확장한다 — [Tools reference](https://code.claude.com/docs/en/tools-reference) (확인: 2026-07-05)
- Claude Code의 extension layer는 Skills, subagents, hooks, MCP, plugins를 함께 다룬다 — [Extend Claude Code](https://code.claude.com/docs/en/features-overview) (확인: 2026-07-05)

## Quote Bank
- > "Agent Skills are modular capabilities"
  - 출처: [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (확인: 2026-07-05)
  - 맥락: Skills의 한 줄 정의에 사용할 인용.
- > "Skills are reusable, filesystem-based resources"
  - 출처: [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (확인: 2026-07-05)
  - 맥락: Skill이 단순 프롬프트가 아니라 파일 기반 재사용 단위임을 설명할 때 사용.
- > "Claude loads this metadata at startup"
  - 출처: [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (확인: 2026-07-05)
  - 맥락: Level 1 metadata loading을 설명할 때 사용.
- > "Only then does this content enter the context window"
  - 출처: [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) (확인: 2026-07-05)
  - 맥락: progressive disclosure와 context 절약을 설명할 때 사용.
- > "Every skill needs a `SKILL.md` file"
  - 출처: [Extend Claude with skills](https://code.claude.com/docs/en/skills) (확인: 2026-07-05)
  - 맥락: Skill 구조의 필수 파일을 설명할 때 사용.
- > "Good Skills are concise, well-structured"
  - 출처: [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) (확인: 2026-07-05)
  - 맥락: 작성 품질 기준을 설명할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
