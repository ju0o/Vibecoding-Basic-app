---
id: ai-era-timeline
title: "AI 개발 도구 시대 구분 (AI Era Timeline)"
topicGroup: T08
status: approved
score: 88
level: 기초
prerequisites: [vibe-coding-origin-karpathy]
successors: [autocomplete-era, chat-coding-era, ide-agent-era]
related: [model-selection-tradeoffs, agent-loop]
consumers:
  lessons: [ai-era-timeline]
  glossary: [IntelliSense, GitHub Copilot, AI Pair Programming, Inline Suggestion, Chat Coding, Cloud Agent]
sources:
  - { title: "VS Code — IntelliSense", url: "https://code.visualstudio.com/docs/editing/intellisense", checked: 2026-07-11 }
  - { title: "GitHub Blog — Introducing GitHub Copilot", url: "https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/", checked: 2026-07-11 }
  - { title: "GitHub Docs — Copilot Quickstart", url: "https://docs.github.com/en/copilot/get-started/quickstart", checked: 2026-07-11 }
  - { title: "GitHub Docs — Copilot features", url: "https://docs.github.com/en/copilot/get-started/features", checked: 2026-07-11 }
  - { title: "OpenAI — Introducing Codex", url: "https://openai.com/index/introducing-codex/", checked: 2026-07-11 }
updated: 2026-07-11
---

## 정의
AI 개발 도구 시대 구분은 코드 보조 도구가 자동완성, AI pair programming, chat, agent로 확장된 흐름을 나누는 기준이다. VS Code 문서는 IntelliSense를 code completion, parameter info, quick info, member lists를 포함하는 기능군으로 정의한다. GitHub는 2021년 Copilot technical preview를 AI pair programmer로 소개했고, 2026년 문서에서는 inline suggestions, chat, cloud agent를 함께 설명한다. (출처: https://code.visualstudio.com/docs/editing/intellisense, https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

## 역사
전통적 IDE 보조는 IntelliSense처럼 언어 서비스 기반 completion과 quick info를 제공했다. 2021년 GitHub Copilot technical preview는 작업 중인 코드 context를 바탕으로 whole lines or entire functions를 제안하는 AI pair programmer를 발표했다. 이후 GitHub Copilot 문서는 coding suggestions뿐 아니라 coding-related questions, chat, cloud agent까지 포함하는 흐름을 보여준다. OpenAI Codex 문서는 cloud-based software engineering agent가 feature 작성, bug fix, PR 제안 등 병렬 task를 수행한다고 설명한다. (출처: https://code.visualstudio.com/docs/editing/intellisense, https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, https://docs.github.com/en/copilot/get-started/quickstart, https://openai.com/index/introducing-codex/, 확인: 2026-07-11)

## 해결하려는 문제
도구 시대를 구분하지 않으면 모든 AI 코딩 도구를 "자동완성" 또는 "챗봇"으로 뭉뚱그리게 된다. 자동완성은 현재 cursor 주변 제안에 강하고, chat은 질문·설명·디버깅 대화에 강하며, agent는 repository 조사·계획·파일 변경·PR 제안 같은 더 긴 작업을 목표로 한다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, https://docs.github.com/en/copilot/get-started/features, https://openai.com/index/introducing-codex/, 확인: 2026-07-11)

## 핵심 개념
1. **IntelliSense era**: VS Code는 IntelliSense가 code completion, parameter info, quick info, member lists를 포함한다고 설명한다. (출처: https://code.visualstudio.com/docs/editing/intellisense, 확인: 2026-07-11)
2. **AI autocomplete era**: GitHub Copilot 2021 발표는 작업 중인 코드 context를 바탕으로 whole lines 또는 entire functions를 제안한다고 설명했다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)
3. **Chat coding era**: GitHub Docs는 Copilot으로 코딩 관련 질문, 버그 수정, 타인의 코드 이해 질문을 할 수 있다고 설명한다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, 확인: 2026-07-11)
4. **Agent era**: GitHub Docs는 Copilot cloud agent가 repository를 조사하고 plan을 만들고 branch에 code changes를 만들 수 있다고 설명한다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)
5. **Cloud sandbox agent**: OpenAI Codex는 각 task가 repository가 preload된 cloud sandbox environment에서 실행된다고 설명한다. (출처: https://openai.com/index/introducing-codex/, 확인: 2026-07-11)

## 관련 기술
- Model selection: 각 시대의 tool surface는 필요한 모델 capability, latency, cost 요구가 다르다. (출처: https://docs.github.com/en/copilot/get-started/features, https://openai.com/index/introducing-codex/, 확인: 2026-07-11)
- Agent loop: cloud agent는 research, plan, code changes, review diff 흐름을 포함하므로 agent loop 개념과 연결된다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)
- Vibe coding: 자연어와 code context를 오가며 개발하는 흐름은 Copilot chat과 agent surface에서 더 커진다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, 확인: 2026-07-11)

## 선행 개념
- vibe-coding-origin-karpathy: 자연어 기반 개발 흐름의 용어와 검증 필요성을 이해해야 시대 구분을 오해하지 않는다.

## 후행 개념
- autocomplete-era: AI pair programming과 inline suggestion의 구조를 자세히 볼 수 있다.
- chat-coding-era: 질문·설명·디버깅 중심 도구 사용법으로 확장한다.
- ide-agent-era: repository 단위 계획·수정·검토를 수행하는 agent surface로 확장한다.

## AI 시대에서의 의미
도구 시대 구분은 특정 제품 비교가 아니라 작업 위임 수준을 구분하는 기준이다. 자동완성은 작은 code context 안에서 빠른 제안을 제공하고, chat은 사람이 질문과 검증을 주도하며, agent는 더 긴 계획과 파일 변경을 수행한다. 바이브코딩 학습자는 각 surface가 요구하는 검증 수준이 다르다는 점을 알아야 한다. (출처: https://code.visualstudio.com/docs/editing/ai-powered-suggestions, https://docs.github.com/en/copilot/get-started/features, https://openai.com/index/introducing-codex/, 확인: 2026-07-11)

## 실무 활용
1. **학습 순서 설계**: IntelliSense와 inline suggestion을 먼저 익히고, chat으로 설명·오류 해석을 연습한 뒤, agent에게 작은 repository task를 맡긴다. (출처: https://code.visualstudio.com/docs/editing/intellisense, https://docs.github.com/en/copilot/get-started/quickstart, 확인: 2026-07-11)
2. **검증 강도 조절**: inline suggestion은 diff가 작지만 agent task는 여러 파일을 바꿀 수 있으므로 git diff, test, review가 더 중요하다. (출처: https://docs.github.com/en/copilot/get-started/features, https://openai.com/index/introducing-codex/, 확인: 2026-07-11)
3. **도구 선택 표 작성**: completion, chat, cloud agent, code review 기능을 목적별로 구분해 팀의 기본 tool surface를 정한다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

## FAQ
Q: Copilot이 곧 agent인가?
A: 아니다. Copilot 문서에는 inline suggestion, chat, cloud agent가 함께 존재한다. surface와 권한이 다르다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

Q: 자동완성 시대는 끝났는가?
A: 아니다. VS Code와 Copilot 문서는 inline suggestions와 completion을 계속 다룬다. 다만 chat과 agent surface가 추가되며 역할이 분화됐다. (출처: https://code.visualstudio.com/docs/editing/ai-powered-suggestions, https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions, 확인: 2026-07-11)

Q: agent가 코드를 바꾸면 사람 검토가 필요 없는가?
A: 아니다. GitHub는 cloud agent 변경을 diff review와 PR 흐름으로 연결한다고 설명한다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

## 자주 하는 실수
1. **모든 도구를 autocomplete로 이해**: chat과 agent는 completion보다 긴 context와 권한을 가진다. surface별 검증을 나눈다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)
2. **연도만 외우기**: timeline은 암기표가 아니라 작업 위임 수준의 변화다. 각 시대의 입력·출력·검증 방식으로 구분한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, https://openai.com/index/introducing-codex/, 확인: 2026-07-11)
3. **agent 결과를 최종본으로 착각**: Agent는 branch와 PR을 만들 수 있지만 review와 test가 필요하다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

## 공식 출처
- IntelliSense 기능군 — [VS Code — IntelliSense](https://code.visualstudio.com/docs/editing/intellisense) (확인 날짜: 2026-07-11)
- Copilot technical preview와 AI pair programmer — [GitHub Blog — Introducing GitHub Copilot](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) (확인 날짜: 2026-07-11)
- Copilot chat questions — [GitHub Docs — Copilot Quickstart](https://docs.github.com/en/copilot/get-started/quickstart) (확인 날짜: 2026-07-11)
- Copilot cloud agent — [GitHub Docs — Copilot features](https://docs.github.com/en/copilot/get-started/features) (확인 날짜: 2026-07-11)
- Codex cloud software engineering agent — [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/) (확인 날짜: 2026-07-11)

## Quote Bank
- > "IntelliSense is a general term"
  - 출처: [VS Code — IntelliSense](https://code.visualstudio.com/docs/editing/intellisense) (확인: 2026-07-11)
  - 맥락: pre-AI completion era를 설명할 때 사용한다.
- > "technical preview of GitHub Copilot"
  - 출처: [GitHub Blog — Introducing GitHub Copilot](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) (확인: 2026-07-11)
  - 맥락: 2021 AI pair programmer 출현을 설명할 때 사용한다.
- > "suggesting whole lines or entire functions"
  - 출처: [GitHub Blog — Introducing GitHub Copilot](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) (확인: 2026-07-11)
  - 맥락: autocomplete era의 능력 범위를 설명할 때 사용한다.
- > "ask Copilot coding-related questions"
  - 출처: [GitHub Docs — Copilot Quickstart](https://docs.github.com/en/copilot/get-started/quickstart) (확인: 2026-07-11)
  - 맥락: chat coding era를 설명할 때 사용한다.
- > "An autonomous AI agent"
  - 출처: [GitHub Docs — Copilot features](https://docs.github.com/en/copilot/get-started/features) (확인: 2026-07-11)
  - 맥락: agent era를 설명할 때 사용한다.
- > "Codex can perform tasks for you"
  - 출처: [OpenAI — Introducing Codex](https://openai.com/index/introducing-codex/) (확인: 2026-07-11)
  - 맥락: cloud software engineering agent를 설명할 때 사용한다.

## 변경 이력
- 2026-07-11: 최초 작성 (Codex, P-01)
