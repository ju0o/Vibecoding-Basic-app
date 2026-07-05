---
id: prompt-engineering
title: "Prompt Engineering (프롬프트 엔지니어링)"
topicGroup: T08
status: draft
score: null
level: 기초
prerequisites: [tokenization-context]
successors: [grounding-citations, hallucination-verification]
related: [context-engineering, tool-calling]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Prompt engineering", url: "https://developers.openai.com/api/docs/guides/prompt-engineering", checked: 2026-07-05 }
  - { title: "Prompt guidance", url: "https://developers.openai.com/api/docs/guides/prompt-guidance", checked: 2026-07-05 }
  - { title: "Prompting best practices", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", checked: 2026-07-05 }
  - { title: "Citation Formatting", url: "https://developers.openai.com/api/docs/guides/citation-formatting", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Prompt Engineering은 모델에 목표, 제약, 근거, 출력 형식을 명확히 전달하는 입력 설계 작업이다. OpenAI prompt guidance는 grounded answers에서 citation behavior를 prompt의 일부로 두고, 무엇이 근거가 필요한지와 증거가 없을 때 어떻게 행동해야 하는지 정의하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
Claude prompting best practices 문서는 명확하고 직접적인 지시, 예시 사용, XML tag 구조화, 출력 형식 제어 같은 prompt 작성 기법을 공식 가이드로 제공한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

## 역사
2026-07-05 기준 OpenAI와 Anthropic은 prompt engineering을 별도 문서 영역으로 제공하며, 모델 종류와 응답 목적에 따라 지시 구조, 근거 요구, 출력 형식을 조정하는 실무 기법으로 다룬다. (출처: https://developers.openai.com/api/docs/guides/prompt-engineering, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
OpenAI prompt engineering 문서는 reasoning model과 GPT model의 사용 감각을 구분하며, GPT model에는 더 구체적인 지시가 잘 맞는다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-engineering, 확인: 2026-07-05)
프롬프트 작성은 단순 문장 꾸미기에서 벗어나 citation, retrieval budget, evidence missing behavior, tool 사용 지시처럼 시스템 동작을 통제하는 영역으로 확장되었다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## 해결하려는 문제
모호한 prompt는 모델이 성공 기준, 출력 형식, 사용 가능한 근거, 금지 행동을 추론하게 만든다. Claude 문서는 원하는 output format을 제어할 때 무엇을 하지 말라고 하기보다 무엇을 하라고 말하라고 권장한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
근거 기반 답변에서 prompt가 citation 규칙을 정의하지 않으면 모델은 어떤 주장에 citation이 필요한지, 증거가 부족할 때 어떻게 해야 하는지 일관되게 판단하기 어렵다. OpenAI prompt guidance는 grounded answers에서 citation behavior를 prompt에 포함하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
Prompt Engineering은 모델 성능을 "마법 문구"로 끌어내는 작업이 아니라, 목표와 검증 조건을 model input 안에 명시해 실패 가능성을 줄이는 작업이다. 이 설명은 OpenAI와 Anthropic의 명확한 지시, 근거, 출력 형식 가이드에 근거한다. (출처: https://developers.openai.com/api/docs/guides/prompt-engineering, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

## 핵심 개념
1. 명확한 목표: 모델이 달성해야 할 task, audience, output type을 구체화한다. Claude 문서는 clear and direct prompting을 best practice 항목으로 다룬다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
2. 출력 형식 제어: Claude 문서는 출력 형식을 제어할 때 긍정 지시, XML format indicators, 원하는 output style과 prompt style의 일치를 제안한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
3. 구조화된 태그: Claude 문서는 XML tags로 prompt를 구조화하고, 일관되고 설명적인 tag names를 사용하라고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
4. 예시 사용: Claude 문서는 examples를 효과적으로 사용하라는 prompting practice를 제공한다. 예시는 desired behavior를 보여주는 입력 자료로 쓰인다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
5. Grounding 규칙: OpenAI prompt guidance는 무엇이 citation support를 필요로 하는지, 충분한 evidence의 기준, evidence missing behavior를 정의하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
6. Citation 출력 규칙: OpenAI citation formatting 문서는 citations를 paragraph 끝이나 필요한 위치에 두고, source IDs를 invent하지 말라고 안내한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## 관련 기술
- Prompt Engineering vs Context Engineering: prompt engineering은 지시와 출력 구조를 설계하고, context engineering은 system prompt, messages, tools, retrieved evidence 등 전체 context 상태를 관리한다. context window가 작업 메모리라는 Claude 문서 설명에 따라 둘은 분리되지만 연결된다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
- Prompt Engineering vs Tool Calling: prompt는 모델이 언제 어떤 정보를 요구해야 하는지 안내할 수 있지만, 실제 tool execution과 schema contract는 tool calling 영역이다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
- Prompt Engineering vs RAG: RAG는 외부 근거를 검색해 넣는 방식이고, prompt engineering은 그 근거를 어떻게 사용하고 citation할지 지시한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
- Prompt Engineering vs Evaluation: prompt는 원하는 행동을 지시하고, evaluation은 실제 출력이 기준을 만족했는지 측정한다. OpenAI evaluation best practices는 generative AI의 variability 때문에 evals가 필요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)

## 선행 개념
- tokenization-context: prompt는 token budget과 context window 안에 들어가는 입력이므로, 입력 크기와 작업 메모리 개념을 먼저 알아야 한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 후행 개념
- grounding-citations: prompt가 citation behavior와 evidence rule을 정의해야 grounded response를 만들 수 있다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
- hallucination-verification: prompt에는 모르겠다고 말하기, quote로 검증하기, citation으로 auditable하게 만들기 같은 환각 완화 규칙을 넣을 수 있다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 Prompt Engineering은 "AI에게 부탁하는 문장"이 아니라 구현 목표, 수정 범위, 파일 근거, 테스트 기준, 출력 형식을 한 번에 전달하는 작업 명세 작성이다. OpenAI prompt guidance는 grounded answers의 evidence rule과 citation behavior를 prompt에 포함하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
AI 코딩에서는 prompt가 작업의 계약서 역할을 한다. Claude 문서의 긍정 지시와 구조화된 tag 권장 사항은 코드 변경 지시, 검증 기준, 금지 범위를 분리해 전달하는 방식으로 적용된다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

## 실무 활용
1. 코드 수정 요청: 목표, 파일 범위, 허용 변경, 검증 명령, 보고 형식을 `<goal>`, `<scope>`, `<verification>`, `<report>` 같은 tag로 나눈다. 이 방식은 Claude의 XML tag 구조화 권장 사항에 근거한다. (근거: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)
2. 근거 기반 답변: "출처가 있는 주장만 답하고, 증거가 없으면 모른다고 말한다"는 behavior를 prompt에 포함한다. OpenAI는 evidence missing behavior를 정의하라고 설명한다. (근거: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
3. 출력 형식 고정: "markdown을 쓰지 마"보다 "응답은 짧은 prose paragraphs로 작성한다"처럼 원하는 결과를 직접 지시한다. Claude 문서는 하지 말아야 할 것보다 해야 할 것을 말하라고 설명한다. (근거: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

```ts
type CodingPrompt = {
  goal: string
  scope: string[]
  constraints: string[]
  evidencePolicy: "cite-sources" | "repo-only" | "ask-if-missing"
  verification: string[]
  outputFormat: string
}
```

## FAQ
Q: Prompt Engineering은 좋은 문장 쓰기인가?
A: 일부는 문장 명확성 문제지만, 공식 문서 기준으로는 목표, 근거, 출력 형식, citation behavior, evidence missing behavior를 설계하는 작업이다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

Q: "하지 마"라고 쓰면 안 되는가?
A: 금지가 필요한 경우도 있지만, Claude 문서는 출력 형식을 제어할 때 무엇을 하지 말라고 하기보다 무엇을 하라고 말하는 방식을 권장한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

Q: XML tag는 꼭 필요한가?
A: 항상 필수는 아니지만, Claude 문서는 XML tags로 prompt를 구조화하고 일관된 tag names를 쓰는 방식을 best practice로 제시한다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: "좋게 만들어줘"처럼 성공 기준 없이 요청한다. 왜 생기나: 모델이 의도를 알아서 보완한다고 기대한다. 교정: 목표, 제약, 검증 기준, 출력 형식을 prompt에 넣는다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
2. 실수: 근거 없는 답변에도 citation이 붙을 것이라고 기대한다. 왜 생기나: citation을 모델의 자동 기능처럼 본다. 교정: 어떤 주장에 citation이 필요한지와 증거가 없을 때 행동을 prompt에 정의한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
3. 실수: 금지문만 길게 나열한다. 왜 생기나: 실패를 막는 방식으로 prompt를 작성한다. 교정: Claude 권장처럼 원하는 output behavior를 긍정 지시로 쓴다. (출처: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices, 확인: 2026-07-05)

## 공식 출처
- OpenAI는 reasoning model과 GPT model의 prompt 설계 차이를 설명한다 — [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering) (확인: 2026-07-05)
- Grounded answers에서는 citation behavior, evidence 기준, evidence missing behavior를 prompt에 포함해야 한다 — [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
- Claude 문서는 clear prompting, XML tags, examples, output format control을 prompting best practices로 제시한다 — [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) (확인: 2026-07-05)
- Citation formatting은 source ID를 invent하지 않고 citable context만 cite하게 지시해야 한다 — [Citation Formatting](https://developers.openai.com/api/docs/guides/citation-formatting) (확인: 2026-07-05)

## Quote Bank
- > "Define what needs support"
  - 출처: [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
  - 맥락: citation 요구 조건을 prompt에 명시해야 하는 이유를 설명할 때 사용한다.
- > "citation behavior should be part of the prompt"
  - 출처: [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
  - 맥락: prompt가 단순 명령이 아니라 근거 정책까지 담아야 함을 설명할 때 사용한다.
- > "Tell Claude what to do instead of what not to do"
  - 출처: [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) (확인: 2026-07-05)
  - 맥락: 긍정 지시 원칙을 설명할 때 사용한다.
- > "Use XML format indicators"
  - 출처: [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) (확인: 2026-07-05)
  - 맥락: prompt 구조화 방법을 설명할 때 사용한다.
- > "Never invent source IDs"
  - 출처: [Citation Formatting](https://developers.openai.com/api/docs/guides/citation-formatting) (확인: 2026-07-05)
  - 맥락: citation prompt의 검증 규칙을 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
