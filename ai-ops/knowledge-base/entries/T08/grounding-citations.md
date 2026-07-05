---
id: grounding-citations
title: "Grounding and Citations (근거화와 인용)"
topicGroup: T08
status: draft
score: null
level: 기초
prerequisites: [prompt-engineering]
successors: [hallucination-verification, rag]
related: [rag, context-engineering]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Prompt guidance", url: "https://developers.openai.com/api/docs/guides/prompt-guidance", checked: 2026-07-05 }
  - { title: "Citation Formatting", url: "https://developers.openai.com/api/docs/guides/citation-formatting", checked: 2026-07-05 }
  - { title: "Citations", url: "https://platform.claude.com/docs/en/build-with-claude/citations", checked: 2026-07-05 }
  - { title: "Reduce hallucinations", url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
Grounding and Citations는 모델 답변을 제공된 근거와 추적 가능한 출처 위치에 연결하는 방식이다. OpenAI prompt guidance는 grounded answers에서 citation behavior를 prompt에 포함하고, 무엇이 support를 필요로 하는지와 evidence가 없을 때의 행동을 정의하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
Claude citations 문서는 citations가 source documents 안의 특정 위치를 reference하며, PDF는 page range, plain text는 character index range 같은 locator를 사용한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/citations, 확인: 2026-07-05)

## 역사
2026-07-05 기준 OpenAI와 Anthropic은 citations를 단순 참고문헌 목록이 아니라 retrieved tool context나 injected context의 citable units와 연결되는 출력 형식으로 문서화한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/citations, 확인: 2026-07-05)
OpenAI citation formatting 문서는 retrieved tool context와 injected context 두 가지 citation pattern을 예시로 제시하고, citable units를 clear and stable structure로 제공하는 것이 중요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
Claude hallucination guardrail 문서는 privacy policy auditing 예시에서 각 claim에 quotes and sources를 cite하게 하여 auditable하게 만들 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## 해결하려는 문제
출처가 없는 답변은 사용자가 어떤 문장까지 근거가 있는지 확인하기 어렵다. OpenAI citation formatting 문서는 citation이 지원하는 response text에 정확히 연결되어야 하며, cite only retrieved sources that directly support the cited text라고 지시한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
근거가 없는 상황을 모델이 자동으로 "사실상 아니다"로 처리하는 것도 문제다. OpenAI prompt guidance는 absence of evidence가 자동으로 factual no가 되어서는 안 된다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
Grounding과 citation은 답변의 신뢰도를 높이기 위해 원문 위치, 근거 단위, 인용 규칙을 prompt와 tool output에 명시하는 문제를 해결한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/citations, 확인: 2026-07-05)

## 핵심 개념
1. Citable unit: OpenAI 문서는 line-level, paragraph-level, document-level 같은 citable unit을 use case의 precision에 맞게 고르라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
2. Stable source id: OpenAI citation formatting 문서는 tool output이나 injected context에서 stable source ID와 locator를 제공하는 패턴을 제시한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
3. Citation placement: OpenAI 문서는 citations를 sentence나 paragraph 뒤에 두고, punctuation 뒤에 배치하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
4. No invented references: OpenAI 문서는 returned context에 없는 source IDs, line ranges, block locators를 invent하지 말라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
5. Source location: Claude 문서는 citations가 source document 안의 specific locations를 reference하며 document type에 따라 citation format이 달라진다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/citations, 확인: 2026-07-05)
6. Evidence missing behavior: OpenAI prompt guidance는 enough evidence의 기준과 evidence missing 시 행동을 prompt에 정의하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)

## 관련 기술
- Grounding vs Citation: grounding은 답변 내용을 제공된 근거에 묶는 설계이고, citation은 그 근거의 위치를 출력에서 드러내는 형식이다. OpenAI 문서는 grounded answers의 citation behavior와 evidence rules를 prompt에 포함하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
- Citation vs Bibliography: citation은 문장이나 claim이 어떤 citable unit에 의해 support되는지 표시하고, bibliography는 문서 목록을 모아 보여주는 형식이다. OpenAI 문서는 response text를 support하는 citation을 문장 또는 paragraph에 붙이라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
- Grounding vs RAG: RAG는 관련 문서를 검색해 context로 넣는 방식이고, grounding은 검색된 근거가 답변 claim을 실제로 support하는지 관리한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
- Citation vs Verification: citation은 근거 위치를 표시하고, verification은 claim이 그 근거로 실제로 검증되는지 점검한다. Claude hallucination guardrail 문서는 claim을 생성한 뒤 supporting quote를 찾아 검증하고 없으면 retract하게 할 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## 선행 개념
- prompt-engineering: citation behavior, evidence 기준, evidence missing behavior는 prompt에 명시해야 하므로 prompt 설계가 선행되어야 한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)

## 후행 개념
- hallucination-verification: citation은 환각 완화와 검증 루틴의 원재료가 된다. Claude는 claim을 quote와 source로 audit하게 하는 방법을 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
- rag: RAG는 외부 문서를 검색해 context로 넣고, grounding과 citation은 그 문서가 어떤 claim을 support하는지 추적한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 grounding은 AI가 작성한 설명, 코드 리뷰, 기술 선택 근거가 실제 문서와 저장소 사실에 붙어 있는지 확인하게 한다. OpenAI citation formatting 문서는 citations가 cited response text를 directly support해야 한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
교육 사이트에서는 citation이 단순 권위 표시가 아니라 학습자가 원문을 다시 찾아 확인할 수 있게 하는 탐색 경로다. Claude citations 문서는 citation이 source document의 specific location을 reference한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/citations, 확인: 2026-07-05)

## 실무 활용
1. 검색 결과 답변: retrieval tool output에 `sourceId`, `title`, `locator`, `text`를 포함하고, 모델에는 해당 source ID만 cite하게 한다. 이 방식은 OpenAI citation formatting의 retrieved context pattern에 근거한다. (근거: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
2. 교재 작성: 강의 문장마다 KB의 어떤 source가 claim을 support하는지 연결하고, support가 없는 claim은 쓰지 않는다. OpenAI prompt guidance의 evidence rule에 근거한다. (근거: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
3. 정책 감사: 답변 생성 후 각 claim의 supporting quote를 찾아 검증하고, quote를 찾지 못하면 claim을 철회한다. Claude hallucination guardrail 문서의 auditing 예시에 근거한다. (근거: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

```ts
type CitableBlock = {
  id: string
  sourceTitle: string
  url: string
  locator: string
  text: string
}

type GroundedClaim = {
  claim: string
  citations: Array<{ id: string; locator: string }>
}
```

## FAQ
Q: Citation을 마지막에 출처 목록으로만 모아도 되는가?
A: 근거 추적 목적에서는 부족하다. OpenAI 문서는 citation을 지원하는 문장이나 paragraph에 연결하고, cited response text를 직접 support하는 sources만 cite하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

Q: 근거가 없으면 "아니다"라고 답하면 되는가?
A: 아니다. OpenAI prompt guidance는 absence of evidence가 자동으로 factual no가 되어서는 안 된다고 설명한다. 증거 부족은 모름, 추가 확인 필요, 제한된 답변으로 처리해야 한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)

Q: Citation이 있으면 답이 항상 맞는가?
A: 아니다. Citation은 위치를 보여주지만, claim이 source를 정확히 대표하는지까지 자동 보장하지 않는다. OpenAI 문서는 accurate representation과 selective interpretation 금지를 higher-quality grounding rule로 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 문서 링크만 붙이면 grounding이 되었다고 생각한다. 왜 생기나: bibliography와 claim-level citation을 혼동한다. 교정: claim을 support하는 citable unit과 locator를 연결한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
2. 실수: 모델이 source ID나 line range를 만들어도 괜찮다고 본다. 왜 생기나: citation을 출력 장식으로 본다. 교정: returned context에 없는 IDs, line ranges, block locators를 invent하지 못하게 한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
3. 실수: 증거 없음과 사실 아님을 같은 뜻으로 처리한다. 왜 생기나: 검색 실패를 지식 부재로 과잉 해석한다. 교정: evidence missing behavior를 prompt에 정의하고 추가 확인 상태로 남긴다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)

## 공식 출처
- Grounded answers에는 citation behavior, enough evidence 기준, evidence missing behavior가 prompt에 포함되어야 한다 — [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
- Citation formatting은 retrieved context와 injected context를 citable unit으로 제공하고, invented source ID를 금지한다 — [Citation Formatting](https://developers.openai.com/api/docs/guides/citation-formatting) (확인: 2026-07-05)
- Claude citations는 source documents의 specific locations를 reference한다 — [Citations](https://platform.claude.com/docs/en/build-with-claude/citations) (확인: 2026-07-05)
- Claim별 quote와 source 검증은 hallucination을 줄이는 guardrail로 쓰일 수 있다 — [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)

## Quote Bank
- > "citation behavior should be part of the prompt"
  - 출처: [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
  - 맥락: citation이 자동 장식이 아니라 prompt 정책임을 설명할 때 사용한다.
- > "Define what needs support"
  - 출처: [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
  - 맥락: 어떤 주장에 근거가 필요한지 명시해야 함을 설명할 때 사용한다.
- > "Cite only retrieved sources"
  - 출처: [Citation Formatting](https://developers.openai.com/api/docs/guides/citation-formatting) (확인: 2026-07-05)
  - 맥락: citation hallucination 방지 규칙을 설명할 때 사용한다.
- > "Citations reference specific locations in source documents"
  - 출처: [Citations](https://platform.claude.com/docs/en/build-with-claude/citations) (확인: 2026-07-05)
  - 맥락: citation을 단순 URL 목록과 구분할 때 사용한다.
- > "Verify with citations"
  - 출처: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
  - 맥락: 검증 루틴과 citation을 연결할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
