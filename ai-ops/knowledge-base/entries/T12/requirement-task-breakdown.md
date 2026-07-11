---
id: requirement-task-breakdown
title: "요구사항 작업 분해 (Requirement to Task Breakdown)"
topicGroup: T12
status: approved
score: 89
level: 기초
prerequisites: [human-ai-collaboration-patterns]
successors: [prompt-implementation-loop]
related: [prompt-engineering, ai-learning-verification, github-pr-review-flow]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "GitHub Docs — Quickstart for GitHub Issues", url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart", checked: 2026-07-12 }
  - { title: "GitHub Docs — Adding sub-issues", url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues", checked: 2026-07-12 }
  - { title: "GitHub Docs — Prompt engineering for GitHub Copilot Chat", url: "https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering", checked: 2026-07-12 }
  - { title: "GitHub Docs — Get the best results from Copilot cloud agent", url: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results", checked: 2026-07-12 }
  - { title: "Cursor Docs — Plan Mode", url: "https://cursor.com/docs/agent/plan-mode", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
요구사항 작업 분해는 큰 목표를 추적 가능한 작은 issue, sub-issue, task, acceptance criteria로 나누는 절차다. GitHub Issues quickstart는 work를 plan and track하는 흐름과 sub-issues로 쪼개는 방식을 설명하고, GitHub prompt engineering 문서는 넓은 목표 뒤에 구체 요구사항을 나열하라고 설명한다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart, https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)

## 역사
Issue tracker와 pull request 협업은 큰 변경을 작은 논의 단위로 나누기 위해 사용되어 왔다. GitHub는 issue를 ideas, feedback, planning tasks, reporting bugs에 사용할 수 있다고 설명하고, sub-issues로 hierarchy를 만들 수 있다고 문서화한다. AI agent 시대에는 이 분해가 agent에게 맡길 수 있는 작은 task를 만드는 선행 조건이 된다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart, https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues, https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 해결하려는 문제
큰 요구사항을 그대로 AI에게 주면 범위, 완료 조건, 검증 명령이 흐려진다. GitHub Copilot cloud agent 문서는 custom instructions가 project 이해와 build, test, validate 방법을 안내한다고 설명하고, Cursor Plan Mode는 code 작성 전에 reviewable plan을 만든다고 설명한다. 작업 분해는 agent가 무엇을 고치고 무엇을 건드리지 말아야 하는지 명확히 한다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, https://cursor.com/docs/agent/plan-mode, 확인: 2026-07-12)

## 핵심 개념
1. **Goal statement**: 먼저 넓은 목표나 시나리오를 적고, 그 다음 구체 요구사항을 나열한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
2. **Sub-issue hierarchy**: GitHub sub-issues는 큰 work를 tasks로 나누고 parent issue와의 관계를 표시한다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues, 확인: 2026-07-12)
3. **Metadata**: GitHub Issues quickstart는 labels, issue types, milestones, assignees, projects를 metadata로 사용해 작업 정보를 전달한다고 설명한다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart, 확인: 2026-07-12)
4. **Acceptance criteria**: Prompt engineering 문서의 specific requirements 예시는 입력 조건, 반환값, 오류 조건을 요구사항으로 분리한다. 이런 조건이 task의 acceptance criteria가 된다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
5. **Reviewable plan**: Cursor Plan Mode는 code 작성 전 implementation plan을 생성하는 기능으로 문서화되어 있다. Plan은 바로 구현보다 먼저 검토 가능한 산출물을 만든다. (출처: https://cursor.com/docs/agent/plan-mode, 확인: 2026-07-12)

## 관련 기술
- Prompt Engineering: task 설명은 목표, 제약, 예시, 요구사항을 구조화하는 prompt로 이어진다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
- GitHub PR review flow: 분해된 task는 PR 단위 검토와 연결된다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart, 확인: 2026-07-12)
- AI agent workflow: Copilot cloud agent가 build, test, validate를 수행하려면 task에 검증 정보를 넣어야 한다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 선행 개념
- human-ai-collaboration-patterns: 사람이 AI에게 맡길 목표와 책임 경계를 먼저 정한다는 원칙을 알아야 요구사항을 작업으로 나눌 수 있다.

## 후행 개념
- prompt-implementation-loop: 분해된 task를 prompt, 구현, 검증, feedback 루프로 실행하는 개념으로 이어진다.
- ai-assisted-testing-loop: 각 task의 acceptance criteria를 테스트 케이스로 바꾸는 개념으로 이어진다.

## AI 시대에서의 의미
바이브코딩에서 요구사항 분해는 AI를 더 많이 쓰기 위한 문서 작업이 아니라 AI가 추측하지 않도록 실행 단위를 줄이는 안전 장치다. GitHub 문서는 prompt에서 general goal 뒤에 specific requirements를 두라고 설명하고, cloud agent 문서는 build, test, validate 안내가 좋은 PR에 도움 된다고 설명한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 실무 활용
1. **큰 기능을 parent issue로 둔다**: 예를 들어 "검색 기능 개선"을 parent issue로 만들고 UI, indexing, empty state, tests를 sub-issues로 나눈다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues, 확인: 2026-07-12)
2. **AI task에는 scope와 validation을 넣는다**: Copilot cloud agent가 build, test, validate할 수 있도록 명령과 기준을 custom instruction 또는 issue 본문에 적는다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)
3. **구현 전 계획을 검토한다**: Cursor Plan Mode처럼 code 작성 전 plan을 보고 누락 범위와 위험한 변경을 줄인다. (출처: https://cursor.com/docs/agent/plan-mode, 확인: 2026-07-12)

```text
작업 분해 예시:
Goal: 강의 검색 품질 개선
Task 1: 검색어 empty state 추가
Task 2: glossary term 검색 연결
Task 3: mobile layout 확인
Acceptance: npm run test, npm run build 통과
Out of scope: DB 도입, 디자인 시스템 변경
```

## FAQ
Q: 작업을 얼마나 작게 나누어야 하는가?
A: GitHub sub-issues는 여러 단계 hierarchy를 허용하지만, 실무에서는 사람이 review할 수 있고 agent가 검증할 수 있는 크기가 기준이다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues, 확인: 2026-07-12)

Q: AI에게 바로 구현을 맡기면 왜 위험한가?
A: 요구사항이 모호하면 AI가 범위와 성공 기준을 추측한다. GitHub prompt engineering 문서는 specific requirements를 나열하라고 설명한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)

Q: Plan Mode는 작업 분해와 같은가?
A: 완전히 같지는 않다. Plan Mode는 구현 전 계획 산출물이고, 작업 분해는 요구사항을 issue와 acceptance criteria로 나누는 상위 절차다. (출처: https://cursor.com/docs/agent/plan-mode, 확인: 2026-07-12)

## 자주 하는 실수
1. **기능 제목만 task로 둠**: "검색 개선"처럼 넓은 제목만 쓰면 완료 기준이 없다. Goal과 specific requirements를 분리한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
2. **검증 명령 누락**: agent에게 build, test, validate 방법을 알려주지 않는다. Repository instruction이나 issue에 검증 명령을 적는다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)
3. **Hierarchy만 깊어짐**: sub-issue를 너무 많이 만들고 실제 review 단위가 흐려진다. GitHub의 hierarchy 기능은 추적을 위한 도구이며, 구현 단위는 검토 가능해야 한다. (출처: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues, 확인: 2026-07-12)

## 공식 출처
- Issues planning and sub-issues — [GitHub Docs — Quickstart for GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart) (확인 날짜: 2026-07-12)
- Sub-issue hierarchy — [GitHub Docs — Adding sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues) (확인 날짜: 2026-07-12)
- Specific requirements in prompts — [GitHub Docs — Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) (확인 날짜: 2026-07-12)
- Agent build/test/validate context — [GitHub Docs — Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) (확인 날짜: 2026-07-12)
- Reviewable plan before coding — [Cursor Docs — Plan Mode](https://cursor.com/docs/agent/plan-mode) (확인 날짜: 2026-07-12)

## Quote Bank
- > "plan and track a piece of work"
  - 출처: [GitHub Docs — Quickstart for GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/quickstart) (확인: 2026-07-12)
  - 맥락: issue가 요구사항 추적 단위임을 설명할 때 사용한다.
- > "break down larger pieces of work into tasks"
  - 출처: [GitHub Docs — Adding sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues) (확인: 2026-07-12)
  - 맥락: sub-issue 기반 작업 분해를 설명할 때 사용한다.
- > "Start general, then get specific"
  - 출처: [GitHub Docs — Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) (확인: 2026-07-12)
  - 맥락: 목표와 구체 요구사항의 순서를 설명할 때 사용한다.
- > "build, test and validate its changes"
  - 출처: [GitHub Docs — Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) (확인: 2026-07-12)
  - 맥락: AI task에 검증 기준을 포함해야 함을 설명할 때 사용한다.
- > "Create detailed implementation plans before writing code"
  - 출처: [Cursor Docs — Plan Mode](https://cursor.com/docs/agent/plan-mode) (확인: 2026-07-12)
  - 맥락: 구현 전 plan 검토의 의미를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
