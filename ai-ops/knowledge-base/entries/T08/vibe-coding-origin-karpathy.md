---
id: vibe-coding-origin-karpathy
title: "Vibe Coding Origin and Karpathy 2025 (바이브코딩 용어의 기원)"
topicGroup: T08
status: draft
score: null
level: 기초
prerequisites: []
successors: [ai-era-timeline]
related: [ai-learning-verification, prompt-engineering]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Karpathy X post: vibe coding", url: "https://x.com/karpathy/status/1886192184808149383", checked: 2026-07-05 }
  - { title: "The Collins Word of the Year 2025 is...", url: "https://www.collinsdictionary.com/us/woty", checked: 2026-07-05 }
  - { title: "VIBE CODING Slang Meaning", url: "https://www.merriam-webster.com/slang/vibe-coding", checked: 2026-07-05 }
  - { title: "Reduce hallucinations", url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations", checked: 2026-07-05 }
  - { title: "Safety best practices", url: "https://developers.openai.com/api/docs/guides/safety-best-practices", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
바이브코딩은 자연어로 AI에게 코딩을 맡기고 결과를 보며 조정하는 개발 방식이다. Collins는 vibe coding을 natural language를 AI로 computer code로 바꾸는 emerging software development로 설명한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05)
Karpathy의 2025년 X 게시물은 "vibe coding"이라는 표현을 사용하며, 코드 자체를 거의 잊고 AI 코딩 도구와 대화하며 변경을 수용하는 경험을 묘사한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)

## 역사
2025년 2월 Karpathy는 X 게시물에서 "vibe coding"이라는 표현을 사용했고, LLM 기반 코딩 도구가 충분히 좋아져 code diff를 읽지 않고 "Accept All"을 누르는 식의 경험을 묘사했다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
Collins는 2025년 Word of the Year로 vibe coding을 선정하면서, 이 용어가 Andrej Karpathy에 의해 popularised되었다고 설명한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05)
Merriam-Webster는 vibe coding이 Karpathy의 social media post에서 coined된 것으로 여겨진다고 설명하고, AI program에게 원하는 것을 말해 code, web pages, apps를 만들게 하는 표현으로 설명한다. (출처: https://www.merriam-webster.com/slang/vibe-coding, 확인: 2026-07-05)
주의: Karpathy X, Collins, Merriam-Webster는 2026-07-05 기준 SOURCE-REGISTRY.md의 1순위 벤더 공식 문서 목록에는 없다. 이 KB는 용어 기원 설명을 위해 원저자 1차 게시물과 공식 사전 출처를 draft 근거로 사용하며, P-02에서 Source Registry 적합성 확인이 필요하다. (출처: ai-ops/sources/SOURCE-REGISTRY.md, 확인: 2026-07-05)

## 해결하려는 문제
바이브코딩이라는 말은 AI 코딩을 단순 자동완성이나 챗봇 답변이 아니라, 사람이 자연어로 의도를 말하고 AI가 코드를 생성하며 사람이 결과를 보고 조정하는 경험으로 구분하기 위해 쓰인다. Collins는 natural language를 AI로 computer code로 바꾸는 개발 방식이라고 설명한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05)
이 용어는 AI가 코드를 많이 생성할 때 생기는 검토 부족, 이해 부족, 유지보수 위험도 함께 설명해야 한다. Karpathy 게시물은 diff를 읽지 않고 "Accept All"을 누르는 경험과 code가 자신의 이해 범위를 넘어간다는 상황을 묘사한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
OpenAI safety best practices는 code generation과 high-stakes domains에서 human review가 특히 중요하다고 설명한다. 바이브코딩 학습에서는 이 원칙 때문에 "결과가 돌아간다"와 "검토되었다"를 구분해야 한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## 핵심 개념
1. Natural language to code: Collins는 vibe coding을 natural language를 AI로 computer code로 바꾸는 개발 방식으로 설명한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05)
2. AI-assisted steering: Karpathy 게시물은 AI 코딩 도구에게 padding 감소 같은 작은 변경을 말하고 결과를 수용하는 경험을 설명한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
3. Reduced code authorship: Karpathy 게시물은 keyboard를 거의 만지지 않고, code diff를 읽지 않는 경험을 묘사한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
4. Throwaway project boundary: Karpathy 게시물은 이런 방식이 throwaway weekend projects에서는 나쁘지 않다고 표현한다. 이는 운영 제품과 실험 프로젝트의 위험 수준을 구분하는 근거다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
5. Human review requirement: OpenAI safety best practices는 AI output을 실제 사용 전에 사람이 review하는 것을 권장하며, code generation에서 특히 중요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
6. Uncertainty and citations: Claude hallucination guardrail 문서는 "I don't know" 허용, direct quotes, citations를 환각 감소 전략으로 제시한다. 바이브코딩 설명에서도 근거 없는 확신을 줄이는 학습 규칙으로 연결된다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## 관련 기술
- Vibe coding vs prompt engineering: vibe coding은 AI와 대화하며 코딩 결과를 만드는 작업 방식이고, prompt engineering은 목표, 제약, 근거, 출력 형식을 설계하는 입력 설계 기법이다. Collins의 natural language-to-code 설명과 기존 prompt-engineering KB가 연결된다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; ai-ops/knowledge-base/entries/T08/prompt-engineering.md, 확인: 2026-07-05)
- Vibe coding vs AI-assisted coding: vibe coding은 특히 code를 깊게 읽지 않고 결과와 대화로 진행하는 의미가 강하다. Karpathy 게시물은 "Accept All"과 diff 미검토를 묘사한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
- Vibe coding vs no-code: Collins는 vibe coding을 natural language와 AI가 code를 생성하는 개발 방식으로 설명한다. no-code 도구와 달리 code artifact가 생성되고 운영될 수 있으므로 검토와 테스트가 필요하다. 이 검토 필요성은 OpenAI safety best practices의 code generation human review 권고에 근거한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
- Vibe coding vs production engineering: Karpathy 게시물은 throwaway weekend projects라는 경계를 언급한다. 운영 제품에서는 human review, source evidence, test, deployment guardrail이 필요하다는 점은 OpenAI safety best practices와 Claude hallucination guardrail에 근거한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05; https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)

## 선행 개념
없음. 이 KB는 시작 모듈의 용어 기원 설명을 위한 개념이며, 뒤의 prompt-engineering과 ai-learning-verification이 위험 관리와 학습법을 보완한다. Collins와 Merriam-Webster의 설명은 용어 정의와 기원을 먼저 제공한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://www.merriam-webster.com/slang/vibe-coding, 확인: 2026-07-05)

## 후행 개념
- ai-era-timeline: vibe coding의 기원을 알면 자동완성, 챗 코딩, IDE agent, agent workflow로 이어지는 AI 개발 도구 시대 구분을 설명할 수 있다. Karpathy 게시물은 Cursor Composer와 Sonnet 같은 LLM 코딩 도구 경험을 용어 기원 맥락으로 제시한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)
- ai-learning-verification: vibe coding은 빠른 산출을 가능하게 하지만, OpenAI safety best practices는 code generation에서 human review가 중요하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩은 코딩 지식이 사라졌다는 뜻이 아니라, 자연어 지시와 AI 생성 코드를 사람이 검증하는 능력이 더 중요해졌다는 신호로 다룬다. Collins는 자연어를 AI로 code로 바꾸는 개발 방식이라고 설명하고, OpenAI는 code generation output의 human review를 특히 중요하다고 설명한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
입문자에게 이 개념은 "코드를 몰라도 된다"가 아니라 "AI가 만든 코드를 실행, 검토, 설명, 수정할 기본 지식이 필요하다"는 방향으로 가르쳐야 한다. Karpathy 게시물의 diff 미검토와 이해 범위 초과 묘사는 검증 없는 수용의 위험을 보여주는 역사적 근거로 사용된다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)

## 실무 활용
1. 용어 설명: vibe coding을 "AI에게 자연어로 만들 것을 말하고 결과를 보며 조정하는 방식"으로 정의하되, production 작업에서는 review와 test를 분리해 설명한다. Collins와 OpenAI safety best practices에 근거한다. (근거: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
2. 학습 루틴: AI가 생성한 코드를 그대로 믿지 않고, claim에는 citation, code에는 human review와 실행 검증을 붙인다. Claude hallucination guardrail과 OpenAI safety best practices에 근거한다. (근거: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
3. 위험 경계 설정: weekend prototype, internal draft, production feature를 구분하고, production feature에는 diff review, test, rollback plan을 요구한다. Karpathy의 throwaway project 언급과 OpenAI code generation human review 권고에 근거한다. (근거: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

```ts
type VibeCodingSession = {
  intent: string
  aiGeneratedChanges: string[]
  humanReviewed: boolean
  testsRun: string[]
  projectRisk: "throwaway" | "learning" | "production"
}
```

## FAQ
Q: 바이브코딩은 Karpathy가 만든 말인가?
A: 2026-07-05 확인 기준, Karpathy의 2025년 X 게시물이 원표현의 1차 출처로 쓰이며, Collins와 Merriam-Webster는 용어가 Karpathy에 의해 popularised 또는 coined된 것으로 설명한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05; https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://www.merriam-webster.com/slang/vibe-coding, 확인: 2026-07-05)

Q: 바이브코딩은 코드를 읽지 않아도 된다는 뜻인가?
A: Karpathy 게시물에는 diff를 읽지 않는 경험이 묘사되지만, OpenAI safety best practices는 code generation에서 human review가 특히 중요하다고 설명한다. 학습 사이트에서는 검토 없는 수용을 권장하지 않는다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)

Q: 자연어로 만들면 모두 바이브코딩인가?
A: Collins는 natural language를 AI로 code로 바꾸는 개발 방식을 설명하지만, Karpathy식 vibe coding은 특히 code diff를 깊게 보지 않고 결과 중심으로 진행하는 뉘앙스가 있다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05)

Q: 이 KB의 출처는 SOURCE-REGISTRY에 모두 등록되어 있는가?
A: 아니다. Claude와 OpenAI 문서는 등록 출처지만, Karpathy X, Collins, Merriam-Webster는 2026-07-05 기준 SOURCE-REGISTRY에 없다. 용어 기원 근거로 필요하므로 draft에 포함했으며, P-02에서 registry 적합성 판단이 필요하다. (출처: ai-ops/sources/SOURCE-REGISTRY.md, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 바이브코딩을 "검증 없는 코딩"으로만 정의한다. 왜 생기나: Karpathy 게시물의 diff 미검토 묘사만 떼어 보기 때문이다. 교정: 용어 기원은 설명하되, 교육 과정에서는 OpenAI code generation human review 권고와 함께 다룬다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
2. 실수: 바이브코딩이면 개발 기초가 필요 없다고 생각한다. 왜 생기나: natural language-to-code 설명을 완전 자동화로 오해한다. 교정: 생성 코드를 검토하려면 파일, 실행, Git, 테스트, 배포 지식이 필요하다. human review 필요성은 OpenAI safety best practices에 근거한다. (출처: https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05)
3. 실수: 동작하면 안전하다고 본다. 왜 생기나: prototype 성공과 production 품질을 혼동한다. 교정: OpenAI safety best practices의 human review와 Claude의 citation/quote 기반 검증을 적용한다. (출처: https://developers.openai.com/api/docs/guides/safety-best-practices, 확인: 2026-07-05; https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations, 확인: 2026-07-05)
4. 실수: 모든 AI 코딩 도구 사용을 vibe coding이라고 부른다. 왜 생기나: AI-assisted coding과 vibe coding의 역사적 뉘앙스를 구분하지 않아서다. 교정: Karpathy 게시물의 "forget that the code even exists" 맥락과 Collins의 natural language-to-code 정의를 함께 사용한다. (출처: https://x.com/karpathy/status/1886192184808149383, 확인: 2026-07-05; https://www.collinsdictionary.com/us/woty, 확인: 2026-07-05)

## 공식 출처
- Karpathy는 2025년 X 게시물에서 "vibe coding"이라는 표현을 사용하고, code diff를 읽지 않는 AI 코딩 경험을 묘사했다 — [Karpathy X post: vibe coding](https://x.com/karpathy/status/1886192184808149383) (확인: 2026-07-05)
- Collins는 vibe coding을 natural language를 AI로 computer code로 바꾸는 emerging software development로 설명하고 2025 Word of the Year로 선정했다 — [The Collins Word of the Year 2025 is...](https://www.collinsdictionary.com/us/woty) (확인: 2026-07-05)
- Merriam-Webster는 vibe coding이 Karpathy의 social media post에서 coined된 것으로 여겨진다고 설명한다 — [VIBE CODING Slang Meaning](https://www.merriam-webster.com/slang/vibe-coding) (확인: 2026-07-05)
- Claude는 hallucination 완화를 위해 "I don't know", direct quotes, citations를 제시한다 — [Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) (확인: 2026-07-05)
- OpenAI는 code generation에서 human review가 특히 중요하다고 설명한다 — [Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices) (확인: 2026-07-05)
- Source Registry 적합성 확인 필요: Karpathy X, Collins, Merriam-Webster는 2026-07-05 기준 등록 출처가 아니다 — [SOURCE-REGISTRY.md](../../../sources/SOURCE-REGISTRY.md) (확인: 2026-07-05)

## Quote Bank
- > "vibe coding"
  - 출처: [Karpathy X post: vibe coding](https://x.com/karpathy/status/1886192184808149383) (확인: 2026-07-05)
  - 맥락: 용어 기원 자체를 설명할 때 사용한다.
- > "forget that the code even exists"
  - 출처: [Karpathy X post: vibe coding](https://x.com/karpathy/status/1886192184808149383) (확인: 2026-07-05)
  - 맥락: 바이브코딩의 강한 의미와 위험을 설명할 때 사용한다.
- > "natural language into computer code"
  - 출처: [The Collins Word of the Year 2025 is...](https://www.collinsdictionary.com/us/woty) (확인: 2026-07-05)
  - 맥락: 초보자용 정의를 만들 때 사용한다.
- > "popularised by Andrej Karpathy"
  - 출처: [The Collins Word of the Year 2025 is...](https://www.collinsdictionary.com/us/woty) (확인: 2026-07-05)
  - 맥락: 용어 확산 경로를 설명할 때 사용한다.
- > "coined by Andrej Karpathy"
  - 출처: [VIBE CODING Slang Meaning](https://www.merriam-webster.com/slang/vibe-coding) (확인: 2026-07-05)
  - 맥락: 기원 설명의 보조 근거로 사용한다.
- > "human review outputs"
  - 출처: [Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices) (확인: 2026-07-05)
  - 맥락: 바이브코딩을 검증 루틴과 연결할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
