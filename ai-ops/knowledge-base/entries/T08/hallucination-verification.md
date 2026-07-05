---
id: hallucination-verification
title: "Hallucination and Verification (환각과 검증)"
topicGroup: T08
status: approved
score: 90
level: 기초
prerequisites: [grounding-citations]
successors: [ai-system-evaluation]
related: [prompt-engineering, agent-loop]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Reduce hallucinations", url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations", checked: 2026-07-05 }
  - { title: "Citation Formatting", url: "https://developers.openai.com/api/docs/guides/citation-formatting", checked: 2026-07-05 }
  - { title: "Prompt guidance", url: "https://developers.openai.com/api/docs/guides/prompt-guidance", checked: 2026-07-05 }
  - { title: "Evaluation best practices", url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices", checked: 2026-07-05 }
  - { title: "Safety best practices", url: "https://developers.openai.com/api/docs/guides/safety-best-practices", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
환각과 검증은 모델이 사실과 맞지 않거나 제공된 context와 일치하지 않는 내용을 만들 가능성을 관리하는 개념이다. Claude reduce hallucinations 문서는 hallucination을 given context와 factually incorrect or inconsistent한 content로 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
Verification은 claim을 원문 quote, citation, test, human review, evaluation criteria와 대조해 실제로 support되는지 확인하는 절차다. 이 설명은 Claude의 citation 검증 예시와 OpenAI citation formatting, evaluation best practices에 근거한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)

## 역사
2026-07-05 기준 Anthropic은 hallucination 완화 방법으로 "I don't know" 허용, direct quotes for factual grounding, citations로 검증, external knowledge restriction을 문서화한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
OpenAI는 generative AI가 variable하고 nondeterministic이기 때문에 AI system testing에 evals가 필요하다고 설명한다. 이 문서 기준 2026-07-05에 evaluation best practices는 AI 출력 검증을 prompt 품질이 아니라 시스템 품질 측정 문제로 다룬다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)
OpenAI safety best practices는 가능한 경우 실제 사용 전에 human review를 두라고 권장하며, code generation과 high-stakes domains에서 특히 중요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## 해결하려는 문제
모델 답변은 그럴듯하지만 원문에 없는 claim, 오래된 정보, 잘못 연결된 citation, 실행되지 않은 코드 확신을 포함할 수 있다. Claude는 hallucination을 factual incorrectness 또는 given context와의 inconsistency로 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
근거가 부족한데도 모델이 단정하면 학습자나 개발자가 잘못된 결정을 할 수 있다. Claude는 "I don't know"라고 말하게 허용하는 전략을 hallucination 감소 방법으로 제시한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
Verification은 AI 출력의 confidence가 아니라 claim을 support하는 evidence, test result, human review 가능성을 기준으로 품질을 판단하게 만든다. OpenAI safety best practices는 human reviewers가 outputs를 verify하는 데 필요한 information에 access해야 한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## 핵심 개념
1. Hallucination 정의: Claude 문서는 hallucination을 factually incorrect or inconsistent with the given context인 content로 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
2. Uncertainty permission: Claude는 모델이 모를 때 "I don't know"라고 말할 수 있게 하라고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
3. Quote grounding: Claude는 factual grounding을 위해 direct quotes를 사용하라고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
4. Citation verification: Claude는 각 claim에 quotes and sources를 cite하게 하거나, response 생성 후 supporting quote를 찾아 검증하게 할 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
5. Evidence rule: OpenAI prompt guidance는 evidence missing behavior를 정의하고, absence of evidence가 자동으로 factual no가 되면 안 된다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/prompt-guidance, 확인: 2026-07-05)
6. Evaluation: OpenAI evaluation best practices는 generative AI의 variability와 nondeterminism 때문에 evals가 AI system testing 방법이라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)
7. Human review: OpenAI safety best practices는 가능한 경우 outputs가 실제로 쓰이기 전에 human review를 권장하고, code generation에서 특히 중요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## 관련 기술
- Hallucination vs Error: hallucination은 모델 출력이 사실이나 제공 context와 맞지 않는 경우이고, 일반 error는 API 실패, syntax error, test failure 같은 시스템 오류도 포함한다. Claude의 hallucination 정의는 factual/context inconsistency에 초점을 둔다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
- Verification vs Citation: citation은 source 위치를 표시하고, verification은 claim이 그 source로 실제 support되는지 확인한다. OpenAI citation formatting은 cited response text를 직접 support하는 retrieved sources만 cite하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
- Verification vs Evaluation: verification은 개별 claim이나 산출물의 근거 대조이고, evaluation은 반복 가능한 criteria와 dataset으로 시스템 품질을 측정한다. OpenAI evaluation best practices는 evals를 AI system testing 방법으로 설명한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)
- Guardrail vs Prompt: prompt는 desired behavior를 지시하고, guardrail은 unsafe 또는 unsupported output을 줄이기 위한 제한과 검토 절차다. Claude hallucination 문서와 OpenAI safety best practices 모두 검증 지시와 human oversight를 제시한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## 선행 개념
- grounding-citations: hallucination을 줄이려면 claim이 어떤 source와 quote에 의해 support되는지 먼저 추적할 수 있어야 한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

## 후행 개념
- ai-system-evaluation: 개별 claim 검증을 넘어서 prompt, tool use, trace, tests, human review 기준을 반복 가능한 평가로 만들 수 있다. OpenAI는 evals가 generative AI system testing에 필요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서는 AI가 만든 코드 설명, 라이브러리 사용법, 오류 원인 분석이 그럴듯해 보여도 실제 저장소, 공식 문서, 테스트 결과로 검증해야 한다. OpenAI safety best practices는 code generation에서 human review가 특히 중요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
학습 사이트에서는 "AI 답변을 믿는 법"보다 "AI 답변을 검증하는 루틴"을 가르쳐야 한다. Claude는 quotes, citations, "I don't know" 허용을 hallucination 완화 전략으로 제시한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## 실무 활용
1. Claim audit: AI가 만든 요약을 claim 단위로 나누고 각 claim에 supporting quote와 source를 요구한다. Quote가 없으면 claim을 철회한다. (근거: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
2. Code review: AI가 제안한 코드 변경은 공식 문서와 저장소 테스트로 확인하고, 실제 사용 전에 human review를 둔다. (근거: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
3. Evaluation set: 자주 틀리는 질문과 edge case를 모아 prompt나 model 변경 전후로 반복 테스트한다. OpenAI evaluation best practices는 variability와 nondeterminism 때문에 evals가 필요하다고 설명한다. (근거: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)

```ts
type VerificationChecklist = {
  claims: Array<{ text: string; sourceRequired: boolean; supportingQuote?: string }>
  tests: string[]
  humanReviewRequired: boolean
  unresolvedQuestions: string[]
}
```

## FAQ
Q: 환각은 모델 버그인가?
A: Claude 문서 기준으로는 factually incorrect하거나 given context와 inconsistent한 output을 가리킨다. 운영에서는 버그 하나로만 보지 않고 prompt, grounding, verification, evaluation으로 관리해야 한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)

Q: Citation이 있으면 환각이 사라지는가?
A: 아니다. Citation은 검증 가능성을 높이지만, claim이 citation을 정확히 대표하는지 확인해야 한다. OpenAI citation formatting은 cited response text를 직접 support하는 source만 cite하라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)

Q: "모르면 모른다고 말하라"는 왜 필요한가?
A: Claude는 모델이 "I don't know"라고 말할 수 있게 허용하는 것을 hallucination 감소 방법으로 제시한다. 근거가 없을 때 단정하지 않게 만드는 기본 guardrail이다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: AI가 자신 있게 말하면 맞다고 본다. 왜 생기나: 자연스러운 문장을 정확성으로 착각한다. 교정: claim별 quote, citation, test로 검증한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
2. 실수: citation 링크 개수만 세고 내용 대조를 하지 않는다. 왜 생기나: citation을 품질 점수처럼 본다. 교정: source가 cited claim을 직접 support하는지 확인한다. (출처: https://developers.openai.com/api/docs/guides/citation-formatting, 확인: 2026-07-05)
3. 실수: 한 번 맞은 prompt를 영구적으로 신뢰한다. 왜 생기나: generative AI 출력의 variability를 무시한다. 교정: eval set과 regression check를 만들어 변경 때마다 다시 검증한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)
4. 실수: code generation 결과를 바로 병합한다. 왜 생기나: AI output을 사람 코드 리뷰와 같은 신뢰 수준으로 취급한다. 교정: OpenAI safety best practices처럼 code generation에서 human review와 원본 정보 접근을 보장한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## 공식 출처
- Hallucination은 factually incorrect하거나 given context와 inconsistent한 content로 설명된다 — [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
- Claim별 quote와 source 검증, "I don't know" 허용, external knowledge restriction은 hallucination 완화 전략이다 — [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
- Citation은 cited response text를 직접 support해야 하며 source IDs를 invent하면 안 된다 — [Citation Formatting](https://developers.openai.com/api/docs/guides/citation-formatting) (확인: 2026-07-05)
- Evidence missing behavior는 prompt에 정의되어야 한다 — [Prompt guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) (확인: 2026-07-05)
- Generative AI의 variability와 nondeterminism 때문에 evals가 필요하다 — [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) (확인: 2026-07-05)
- Code generation과 high-stakes domains에서는 human review가 특히 중요하다 — [Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices) (확인: 2026-07-05)

## Quote Bank
- > "factually incorrect or inconsistent with the given context"
  - 출처: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
  - 맥락: hallucination의 정의를 설명할 때 사용한다.
- > "Allow Claude to say \"I don't know\""
  - 출처: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
  - 맥락: 불확실성 허용이 왜 필요한지 설명할 때 사용한다.
- > "Use direct quotes for factual grounding"
  - 출처: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
  - 맥락: claim 검증 방식으로 quote를 소개할 때 사용한다.
- > "Verify with citations"
  - 출처: [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
  - 맥락: citation 기반 검증 루틴을 설명할 때 사용한다.
- > "Generative AI is variable"
  - 출처: [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) (확인: 2026-07-05)
  - 맥락: 반복 evaluation이 필요한 이유를 설명할 때 사용한다.
- > "human review outputs before they are used"
  - 출처: [Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices) (확인: 2026-07-05)
  - 맥락: 사람 검토가 필요한 상황을 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
