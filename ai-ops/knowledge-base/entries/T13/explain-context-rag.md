---
id: explain-context-rag
title: "Context와 RAG 비교 설명 (Explaining Context vs RAG)"
topicGroup: T13
status: approved
score: 89
level: 중급
prerequisites: [rag, context-engineering]
successors: []
related: [tokenization-context, grounding-citations, explain-web-flow]
consumers:
  lessons: [explain-context-and-rag]
  glossary: [Context vs RAG, Runtime Retrieval, High-Signal Tokens]
sources:
  - { title: "Claude glossary", url: "https://platform.claude.com/docs/en/about-claude/glossary", checked: 2026-07-12 }
  - { title: "Anthropic — Effective context engineering for AI agents", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", checked: 2026-07-12 }
  - { title: "Anthropic — Introducing Contextual Retrieval", url: "https://www.anthropic.com/engineering/contextual-retrieval", checked: 2026-07-12 }
---

> 소싱 방법: 본 KB는 explanation-practice 모듈의 비교 설명(reference) 강의를 위한 근거로, 승인 KB `rag`(T09)·`context-engineering`(T10)이 이미 세션 내 fetch로 원문 대조한 Claude·Anthropic 공식 문서의 verbatim 인용을 동일 출처 기준으로 재활용한다(2026-07-12 재확인). 신규 사실 없이, 두 개념을 "차이를 설명하는 순서"로 재구성한다.

## 정의
Context와 RAG 비교 설명은 두 개념 — 모델이 한 번의 생성에 보는 토큰 집합(context)과, 외부 지식을 런타임에 검색해 그 토큰 집합에 넣는 방법(RAG) — 의 관계와 차이를 남이 이해하도록 정리하는 스킬이다. Anthropic은 context를 "the set of tokens included when sampling"이라 하고, Claude glossary는 RAG를 "combines information retrieval with language model generation"이라 설명한다. ==핵심은 둘이 경쟁 관계가 아니라 "무엇"(context)과 "어떻게 채우나"(RAG)의 관계라는 점==이다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-12)

## 역사
초기에는 "프롬프트에 필요한 걸 다 넣자"는 접근이 흔했다. 하지만 Anthropic은 "Context is a critical but finite resource for AI agents"라고, context가 무한하지 않은 자원임을 강조한다. 지식베이스가 커지면 전부 넣을 수 없으므로, 런타임에 관련 조각만 검색해 넣는 RAG가 실무 패턴이 됐다 — Claude glossary는 RAG의 지식이 "retrieved at run time"이라고 설명한다. 두 개념을 함께 설명하려면 "context는 한정된 그릇, RAG는 그 그릇을 관련 조각으로 채우는 방법"이라는 관계를 잡아야 한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-12)

## 해결하려는 문제
초보자는 "context window가 크면 RAG가 필요 없다"거나 "RAG가 있으면 context 관리가 필요 없다"처럼 둘을 혼동한다. Anthropic은 "more context isn't automatically better"라고 하고, context engineering의 목표를 "finding the smallest possible set of high-signal tokens"라고 설명한다. 즉 큰 window가 있어도 무엇을 넣을지는 여전히 문제다. 비교 설명은 이 혼동을 없앤다 — RAG는 무엇을 검색할지, context engineering은 검색된 것을 어떻게·얼마나 넣을지의 문제다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

## 핵심 개념
1. **Context = 토큰 집합**: Anthropic은 context를 "the set of tokens included when sampling"으로 정의한다. 모델이 한 번의 생성에 보는 전부다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)
2. **RAG = 런타임 검색 + 생성 결합**: Claude glossary는 RAG를 "combines information retrieval with language model generation"이라 하고, 지식이 "external knowledge base or a set of documents"에서 "retrieved at run time"된다고 설명한다. (출처: https://platform.claude.com/docs/en/about-claude/glossary, 확인: 2026-07-12)
3. **관계: RAG가 context를 채운다**: RAG는 검색한 조각을 context(토큰 집합)에 넣는다. 둘은 층이 다르다 — RAG는 "무엇을 가져오나", context는 "무엇이 들어가 있나". (근거: rag·context-engineering KB, 확인: 2026-07-12)
4. **크다고 더 좋지 않다**: "more context isn't automatically better." context window가 커도 관련 없는 토큰이 많으면 답이 나빠진다. 그래서 RAG의 검색 품질과 context의 선별이 모두 중요하다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-12)
5. **작으면 통째로, 크면 RAG**: rag KB는 지식베이스가 작으면 전체를 prompt에 넣는 단순한 방법도 가능하지만 큰 지식베이스에는 RAG가 확장 가능하다고 설명한다. 선택 기준은 크기와 비용이다. (근거: rag KB, 확인: 2026-07-12)
6. **목표는 high-signal 최소 집합**: context engineering의 원칙은 "finding the smallest possible set of high-signal tokens." RAG로 가져온 것도 이 원칙으로 걸러야 한다 — 많이 넣는 것이 목적이 아니다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

## 관련 기술
- explain-context-rag ↔ tokenization-context: context는 토큰으로 계산되므로 크기·비용을 함께 봐야 한다. (근거: tokenization-context KB, 확인: 2026-07-12)
- explain-context-rag ↔ grounding-citations: RAG로 가져온 근거에 citation을 붙이면 답을 증거에 grounded한다. (근거: grounding-citations KB, 확인: 2026-07-12)
- explain-context-rag ↔ explain-web-flow: 둘 다 개념을 순서대로 설명하는 explanation-practice 스킬이다. (근거: explain-web-flow KB, 확인: 2026-07-12)

## 선행 개념
- rag: 런타임 검색으로 외부 지식을 붙이는 방법.
- context-engineering: 토큰 집합을 선별·설계하는 원칙.

## 후행 개념
- explain-tool-agent-mcp: Tool·Agent·MCP의 관계를 비교 설명하는 다음 레퍼런스.

## AI 시대에서의 의미
"context window가 크니 RAG는 필요 없다"는 흔한 오해다. 비교 설명은 이를 바로잡는다: ==RAG는 무엇을 가져올지, context engineering은 가져온 것을 얼마나·어떻게 넣을지의 문제이며, 둘은 층이 다르다==. 큰 window에서도 "smallest possible set of high-signal tokens" 원칙은 유효하다. 이 관계를 정확히 설명할 수 있으면, 왜 검색 품질과 컨텍스트 선별을 둘 다 관리해야 하는지 팀·AI에게 전달할 수 있다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

## 실무 활용
1. **관계로 먼저 설명**: "context는 그릇, RAG는 채우는 방법"으로 층을 구분해 시작한다. (근거: rag·context-engineering KB, 확인: 2026-07-12)
2. **선택 기준 제시**: 작은 지식베이스는 통째로, 큰 지식베이스는 RAG로. (근거: rag KB, 확인: 2026-07-12)
3. **크기 오해 교정**: "more context isn't automatically better"로 큰 window 만능론을 바로잡는다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-12)
4. **검색+선별 둘 다 강조**: RAG 검색 품질과 high-signal 선별을 함께 관리한다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

## FAQ
Q: context window가 크면 RAG가 필요 없나?
A: 아니다. "more context isn't automatically better" — 관련 없는 토큰이 많으면 답이 나빠진다. 무엇을 넣을지는 여전히 문제다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-12)
Q: RAG와 context engineering의 차이는?
A: RAG는 무엇을 검색할지(런타임 retrieval), context engineering은 검색된 것을 어떻게·얼마나 넣을지(선별)다. 층이 다르다. (근거: rag·context-engineering KB, 확인: 2026-07-12)
Q: 언제 RAG를 쓰나?
A: 지식베이스가 크면 RAG가 확장 가능하다. 작으면 통째로 prompt에 넣는 단순한 방법도 가능하다. (근거: rag KB, 확인: 2026-07-12)

## 자주 하는 실수
1. **둘을 경쟁 관계로 설명**: RAG는 context를 채우는 방법이지 대체재가 아니다. 층을 구분한다. (근거: rag·context-engineering KB, 확인: 2026-07-12)
2. **큰 window 만능론**: "more context isn't automatically better"를 빠뜨린다. 선별의 필요를 함께 말한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-12)
3. **검색만 강조**: RAG 검색만 말하고 high-signal 선별을 빠뜨린다. 둘 다 관리 대상이다. (출처: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents, 확인: 2026-07-12)

## 공식 출처
- context = 샘플링 시 포함되는 토큰 집합, high-signal 최소 집합 원칙 — [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-12)
- RAG = 검색과 생성 결합, 런타임 검색 — [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-12)
- 작은/큰 지식베이스 선택 기준 — [Introducing Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) (확인: 2026-07-12)

## Quote Bank
- > "Context refers to the set of tokens included when sampling"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-12)
  - 맥락: context를 토큰 집합으로 정의해 RAG와 층을 구분할 때 사용한다.
- > "combines information retrieval with language model generation"
  - 출처: [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-12)
  - 맥락: RAG의 정의를 제시할 때 사용한다.
- > "external knowledge base or a set of documents"
  - 출처: [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-12)
  - 맥락: RAG가 모델 외부 지식을 연결함을 설명할 때 사용한다.
- > "retrieved at run time"
  - 출처: [Claude glossary](https://platform.claude.com/docs/en/about-claude/glossary) (확인: 2026-07-12)
  - 맥락: RAG의 런타임 검색을 사전 학습 지식과 구분할 때 사용한다.
- > "more context isn't automatically better"
  - 출처: [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-12)
  - 맥락: 큰 context window 만능론을 교정할 때 사용한다.
- > "finding the smallest possible set of high-signal tokens"
  - 출처: [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (확인: 2026-07-12)
  - 맥락: RAG로 가져온 것도 선별해야 함을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Fable — 대행, P-01/P-02). rag·context-engineering 승인 KB의 Claude·Anthropic verbatim 인용 재활용, Score 89.
