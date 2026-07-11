---
id: autocomplete-era
title: "자동완성 시대 (Autocomplete Era)"
topicGroup: T11
status: approved
score: 89
level: 기초
prerequisites: [ai-era-timeline]
successors: [chat-coding-era]
related: [dev-environment-map, ai-learning-verification]
consumers:
  lessons: [autocomplete-era]
  glossary: [AI Autocomplete, Code Completion, Code Context, Tab Accept, Suggestion Scope, Inline Suggestion, IntelliSense, GitHub Copilot]
sources:
  - { title: "VS Code — IntelliSense", url: "https://code.visualstudio.com/docs/editing/intellisense", checked: 2026-07-11 }
  - { title: "VS Code — Inline suggestions from GitHub Copilot", url: "https://code.visualstudio.com/docs/editing/ai-powered-suggestions", checked: 2026-07-11 }
  - { title: "GitHub Blog — Introducing GitHub Copilot", url: "https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/", checked: 2026-07-11 }
  - { title: "GitHub Docs — Getting code suggestions in your IDE", url: "https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions", checked: 2026-07-11 }
updated: 2026-07-11
---

## 정의
자동완성 시대는 IDE가 현재 편집 중인 코드 주변 맥락을 바탕으로 다음 token, line, function을 제안하는 개발 보조 방식이 중심이 된 시기다. VS Code는 IntelliSense를 code completion, parameter info, quick info, member lists를 포함하는 기능군으로 정의하고, GitHub Copilot은 inline suggestions가 code, comments, tests 등을 typing 중 완성한다고 설명한다. (출처: https://code.visualstudio.com/docs/editing/intellisense, https://code.visualstudio.com/docs/editing/ai-powered-suggestions, 확인: 2026-07-11)

## 역사
자동완성은 AI 이전에도 language service 기반으로 존재했다. VS Code 문서는 IntelliSense features가 code completion, content assist, code hinting 같은 이름으로도 불린다고 설명한다. 2021년 GitHub Copilot technical preview는 작업 중인 코드 context에서 whole lines or entire functions를 제안하는 AI pair programmer로 발표됐다. (출처: https://code.visualstudio.com/docs/editing/intellisense, https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)

## 해결하려는 문제
개발자는 API 이름, 반복 boilerplate, test scaffold, syntax detail을 기억하고 입력하는 데 많은 시간을 쓴다. 자동완성은 현재 파일과 커서 주변 정보를 바탕으로 후보를 제안해 입력 부담을 줄이고 alternative solution, tests, new APIs 탐색을 돕는다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, https://code.visualstudio.com/docs/editing/ai-powered-suggestions, 확인: 2026-07-11)

## 핵심 개념
1. **Traditional completion**: IntelliSense는 code completion, parameter info, quick info, member lists를 포함한다. (출처: https://code.visualstudio.com/docs/editing/intellisense, 확인: 2026-07-11)
2. **Inline suggestion**: VS Code 문서는 Copilot inline suggestions가 code, comments, tests 등을 typing 중 완성한다고 설명한다. (출처: https://code.visualstudio.com/docs/editing/ai-powered-suggestions, 확인: 2026-07-11)
3. **Code context**: GitHub Copilot 2021 발표는 Copilot이 작업 중인 code context를 draw한다고 설명한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)
4. **Suggestion scope**: GitHub Copilot 2021 발표는 whole lines 또는 entire functions를 제안한다고 설명한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)
5. **IDE surface**: GitHub Docs는 Visual Studio Code, Visual Studio, JetBrains, Vim/Neovim 등 여러 IDE에서 code suggestions를 안내한다. (출처: https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions, 확인: 2026-07-11)

## 관련 기술
- Chat coding era: 자동완성이 cursor-local suggestion이라면 chat은 질문·설명·디버깅 대화로 확장된다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, 확인: 2026-07-11)
- IDE agent era: 자동완성보다 큰 단위로 repository 조사와 branch 변경을 수행하는 agent surface가 후속이다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)
- Human review: 자동완성 결과도 code diff와 test로 검증해야 한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)

## 선행 개념
- ai-era-timeline: 자동완성 시대가 chat·agent 시대와 어떻게 구분되는지 알아야 한다.

## 후행 개념
- chat-coding-era: completion을 넘어 질문·설명·수정 대화를 수행하는 도구 사용법으로 확장한다.
- ide-agent-era: inline suggestion보다 큰 multi-file task를 다루는 agent surface로 확장한다.

## AI 시대에서의 의미
자동완성 시대는 AI 코딩 도구가 "코드를 대신 완성하는 보조자"로 들어온 단계다. 사용자는 제안을 빠르게 받아들일 수 있지만, 제안이 요구사항·보안·스타일·테스트와 맞는지는 직접 검토해야 한다. 특히 바이브코딩 학습에서는 Tab으로 받아들인 코드도 내 코드가 되므로 설명 가능성과 검증 루틴이 필요하다. (출처: https://code.visualstudio.com/docs/editing/ai-powered-suggestions, https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)

## 실무 활용
1. **Boilerplate 작성**: 반복적인 function, test scaffold, JSX pattern 후보를 inline suggestion으로 빠르게 받는다. (출처: https://code.visualstudio.com/docs/editing/ai-powered-suggestions, 확인: 2026-07-11)
2. **API 탐색**: Copilot 발표는 새로운 API를 탐색하는 데 도움을 줄 수 있다고 설명한다. 다만 공식 문서와 type check로 검증한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)
3. **IDE별 사용**: GitHub Docs는 IDE별 code suggestion 안내를 제공하므로 팀 도구에 맞는 설치·권한·model 설정을 확인한다. (출처: https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions, 확인: 2026-07-11)

## FAQ
Q: 자동완성은 AI 코딩의 전부인가?
A: 아니다. 자동완성은 inline suggestion surface이고, 후속 시대에는 chat과 cloud agent가 추가된다. (출처: https://docs.github.com/en/copilot/get-started/quickstart, https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

Q: IntelliSense와 Copilot은 같은가?
A: 둘 다 editor에서 제안을 주지만, VS Code는 IntelliSense를 language service 기능군으로, Copilot은 AI-powered inline suggestion으로 설명한다. (출처: https://code.visualstudio.com/docs/editing/intellisense, https://code.visualstudio.com/docs/editing/ai-powered-suggestions, 확인: 2026-07-11)

Q: 제안이 뜨면 바로 받아도 되는가?
A: 작은 제안도 요구사항과 테스트를 통과해야 한다. 특히 entire function 제안은 로직 전체를 읽고 확인해야 한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)

## 자주 하는 실수
1. **Tab accept 과신**: 제안이 자연스러워 보인다는 이유로 검토 없이 받아들인다. 결과를 읽고 test를 돌린다. (출처: https://code.visualstudio.com/docs/editing/ai-powered-suggestions, 확인: 2026-07-11)
2. **현재 context 오해**: Copilot은 작업 중인 code context를 draw하지만, 프로젝트 전체 의도와 최신 요구사항을 완전히 아는 것은 아니다. 필요한 맥락을 파일·주석·테스트로 제공한다. (출처: https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/, 확인: 2026-07-11)
3. **자동완성과 agent 혼동**: inline suggestion은 branch를 만들고 PR을 여는 cloud agent와 권한 범위가 다르다. 도구 surface를 구분한다. (출처: https://docs.github.com/en/copilot/get-started/features, 확인: 2026-07-11)

## 공식 출처
- IntelliSense 기능 정의 — [VS Code — IntelliSense](https://code.visualstudio.com/docs/editing/intellisense) (확인 날짜: 2026-07-11)
- Copilot inline suggestions — [VS Code — Inline suggestions from GitHub Copilot](https://code.visualstudio.com/docs/editing/ai-powered-suggestions) (확인 날짜: 2026-07-11)
- Copilot 2021 technical preview와 whole-line/function suggestions — [GitHub Blog — Introducing GitHub Copilot](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) (확인 날짜: 2026-07-11)
- IDE별 code suggestions — [GitHub Docs — Getting code suggestions in your IDE](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions) (확인 날짜: 2026-07-11)

## Quote Bank
- > "code completion, parameter info, quick info, and member lists"
  - 출처: [VS Code — IntelliSense](https://code.visualstudio.com/docs/editing/intellisense) (확인: 2026-07-11)
  - 맥락: 전통적 editor assistance 범위를 설명할 때 사용한다.
- > "GitHub Copilot provides AI-powered inline suggestions"
  - 출처: [VS Code — Inline suggestions from GitHub Copilot](https://code.visualstudio.com/docs/editing/ai-powered-suggestions) (확인: 2026-07-11)
  - 맥락: AI autocomplete surface를 설명할 때 사용한다.
- > "complete your code, comments, tests, and more as you type"
  - 출처: [VS Code — Inline suggestions from GitHub Copilot](https://code.visualstudio.com/docs/editing/ai-powered-suggestions) (확인: 2026-07-11)
  - 맥락: inline suggestion의 대상 범위를 설명할 때 사용한다.
- > "suggesting whole lines or entire functions"
  - 출처: [GitHub Blog — Introducing GitHub Copilot](https://github.blog/news-insights/product-news/introducing-github-copilot-ai-pair-programmer/) (확인: 2026-07-11)
  - 맥락: Copilot 2021의 제안 범위를 설명할 때 사용한다.
- > "Copilot provides suggestions inline as you type"
  - 출처: [GitHub Docs — Getting code suggestions in your IDE](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/get-ide-code-suggestions) (확인: 2026-07-11)
  - 맥락: IDE 사용 방식을 설명할 때 사용한다.

## 변경 이력
- 2026-07-11: 최초 작성 (Codex, P-01)
