---
id: tokenization-context
title: "Tokenization and Context (토큰화와 컨텍스트)"
topicGroup: T08
status: approved
score: 90
level: 기초
prerequisites: []
successors: [prompt-engineering, context-engineering]
related: [context-caching, agent-loop]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Counting tokens", url: "https://developers.openai.com/api/docs/guides/token-counting", checked: 2026-07-05 }
  - { title: "Token counting", url: "https://platform.claude.com/docs/en/build-with-claude/token-counting", checked: 2026-07-05 }
  - { title: "Context windows", url: "https://platform.claude.com/docs/en/build-with-claude/context-windows", checked: 2026-07-05 }
  - { title: "Prompt caching", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching", checked: 2026-07-05 }
  - { title: "How Claude Code uses prompt caching", url: "https://code.claude.com/docs/en/prompt-caching", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
토큰화와 컨텍스트는 모델 입력을 계산 단위와 작업 메모리로 다루는 개념이다. Claude 문서는 token counting이 메시지를 보내기 전에 토큰 수를 세어 비용, rate limit, model routing, target length를 관리하게 한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
Claude 문서는 context window를 응답 생성 시 모델이 참조할 수 있는 전체 텍스트로 설명하며, 이는 학습 데이터 전체가 아니라 모델의 "working memory"에 해당한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 역사
2026-07-05 기준 OpenAI와 Anthropic은 토큰 수 계산과 context window 관리를 API 사용자가 명시적으로 다루어야 할 운영 주제로 문서화한다. (출처: https://developers.openai.com/api/docs/guides/token-counting, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
Anthropic은 Claude Opus 4.7 이후 Opus 계열, Claude Fable 5, Claude Mythos 5, Claude Sonnet 5가 새 tokenizer를 사용하며, 같은 입력도 이전 모델보다 대략 30% 더 많은 토큰을 만들 수 있다고 설명한다. 이 수치는 2026-07-05 기준 Anthropic 문서에 따른 모델 의존 정보다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
토큰화와 컨텍스트 관리는 긴 대화, 도구 정의, 파일, 이미지, PDF, system prompt가 모두 입력 비용과 context window를 차지하는 LLM API 실무에서 중요해졌다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 해결하려는 문제
토큰 수를 세지 않으면 prompt가 target length나 context window에 맞는지, 비용과 rate limit에 어떤 영향을 주는지 요청 전에 판단하기 어렵다. Anthropic은 token counting으로 rate limit과 비용을 사전에 관리하고, model routing 결정을 하며, prompt 길이를 최적화할 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
컨텍스트를 학습 데이터 전체와 혼동하면 모델이 현재 요청에 포함되지 않은 프로젝트 파일, 정책, 최신 문서를 자동으로 알고 있다고 착각하게 된다. Claude 문서는 context window가 훈련 corpus와 다르고 응답 생성 시 참조할 수 있는 작업 메모리라고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
긴 컨텍스트가 항상 정확도를 높인다는 가정도 문제다. Claude 문서는 token count가 커질수록 accuracy와 recall이 떨어질 수 있으며, 이를 context rot이라고 부른다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 핵심 개념
1. Token counting은 메시지를 보내기 전 입력 토큰 수를 추정하는 절차이며, Claude token counting endpoint는 system prompt, tools, images, PDFs를 포함한 구조화 입력을 받아 total input tokens를 반환한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
2. Token count는 추정값일 수 있으며, 실제 message creation에서 사용되는 input tokens는 작은 차이가 날 수 있다고 Anthropic 문서는 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
3. Context window는 모델이 응답 생성 중 참조할 수 있는 텍스트 전체이며, response 자체도 window에 포함된다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
4. 모든 요청 요소가 context window를 차지한다. Claude 문서는 system prompt, messages, documents, images, tool definitions, tool results가 window에 포함될 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
5. Model별 tokenizer 차이가 있으므로, Anthropic은 사용하려는 model로 prompt를 다시 세라고 권장한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
6. Prompt caching은 반복 prefix의 처리 비용과 latency를 줄일 수 있지만, cached prompt prefixes도 context window를 계속 차지한다고 Anthropic 문서는 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 관련 기술
- Tokenization vs Character Count: token count는 문자 수와 동일하지 않으며, Anthropic 문서는 model tokenizer 변화에 따라 같은 입력의 token count가 달라질 수 있다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
- Context Window vs Memory: context window는 요청에 포함된 작업 메모리이고, model이 요청 사이의 정보를 자동으로 기억한다는 뜻이 아니다. Claude Code prompt caching 문서는 model이 requests 사이에서 아무것도 기억하지 않는다고 설명한다. (출처: https://code.claude.com/docs/en/prompt-caching, 확인: 2026-07-05)
- Context Window vs Prompt Caching: context window는 현재 요청의 참조 가능 범위이고, prompt caching은 반복 prefix 처리 비용과 지연을 줄이는 기능이다. Anthropic은 cached prefix도 context window를 차지한다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
- Token Counting vs Context Engineering: token counting은 양을 측정하고, context engineering은 어떤 정보를 넣고 뺄지 설계한다. Claude context window 문서의 context rot 설명은 양만 늘리는 전략의 한계를 보여준다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 선행 개념
frontmatter prerequisites가 비어 있다. 이 KB는 T08 AI 기초 모듈의 첫 개념으로 사용되며, prompt와 context를 다루기 전에 입력 단위와 작업 메모리의 차이를 설명한다. (출처: ai-ops/outputs/00-backlog/BACKLOG.md, 확인: 2026-07-05)

## 후행 개념
- prompt-engineering: 좋은 prompt는 지시 품질뿐 아니라 token budget과 context window 안에 들어가는 정보의 구조를 고려해야 한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
- context-engineering: context window가 제한된 작업 메모리라면, 어떤 정보를 언제 유지·요약·검색할지 설계하는 context engineering으로 이어진다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 토큰화와 컨텍스트는 "AI에게 많이 넣으면 된다"는 습관을 비용, 지연, 정확도, 회상률의 문제로 바꿔 보게 한다. Claude 문서는 더 큰 context window가 더 복잡한 prompt를 처리하게 하지만, 더 많은 context가 자동으로 더 좋은 결과를 뜻하지 않는다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
AI 코딩 도구에서는 파일, 로그, 테스트 결과, tool definitions가 모두 context budget을 쓰므로, 작업자는 필요한 파일과 근거만 고르고 오래된 로그를 요약하는 기준을 가져야 한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05; https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)

## 실무 활용
1. Prompt 길이 점검: 모델에 보내기 전 token counting endpoint로 system prompt, user message, tool definitions를 포함한 입력 크기를 측정한다. (근거: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
2. 모델 라우팅: 같은 요청을 여러 모델에 보낼 수 있는 시스템에서는 token count와 context window 요구를 기준으로 model routing을 결정한다. (근거: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
3. Context budget 설계: 긴 코드 리뷰에서는 전체 로그를 붙이는 대신 실패 테스트, 변경 파일, 검증 기준처럼 high-signal 정보를 남긴다. 긴 context가 항상 좋은 결과를 만들지 않는다는 Claude 문서의 context rot 설명에 근거한다. (근거: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

```ts
type ContextBudget = {
  model: string
  estimatedInputTokens: number
  reservedOutputTokens: number
  includedEvidence: Array<{ kind: "file" | "log" | "doc"; reason: string }>
  omittedEvidence: Array<{ kind: "file" | "log" | "doc"; reason: string }>
}
```

## FAQ
Q: 토큰은 글자 수와 같은가?
A: 아니다. Anthropic은 model tokenizer 변화에 따라 같은 입력도 다른 token count를 만들 수 있다고 설명하므로, 글자 수만으로 비용이나 context fit을 판단하면 안 된다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)

Q: Context window가 크면 항상 더 좋은가?
A: 아니다. Claude 문서는 token count가 커질수록 accuracy와 recall이 떨어질 수 있으며, 더 많은 context가 자동으로 더 좋은 결과를 뜻하지 않는다고 설명한다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

Q: Prompt caching을 쓰면 context window 한계가 사라지는가?
A: 아니다. Anthropic 문서는 cached prompt prefixes도 context window를 차지한다고 설명한다. Caching은 비용과 latency를 줄이는 기능이지 window 용량을 없애는 기능이 아니다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 글자 수가 짧으면 token count도 작다고 본다. 왜 생기나: 토큰화를 문자 단위 자르기로 오해한다. 교정: 실제 사용할 model의 token counting 도구로 다시 계산한다. (출처: https://platform.claude.com/docs/en/build-with-claude/token-counting, 확인: 2026-07-05)
2. 실수: 모델이 프로젝트 파일을 이미 알고 있다고 생각한다. 왜 생기나: context window와 훈련 데이터 corpus를 혼동한다. 교정: 현재 요청에 필요한 근거를 명시적으로 넣거나 검색으로 가져온다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)
3. 실수: 긴 로그 전체를 붙이면 정확도가 오른다고 믿는다. 왜 생기나: 정보량과 신호 품질을 구분하지 않는다. 교정: context rot 가능성을 고려해 실패 원인, 재현 단계, 핵심 로그만 남긴다. (출처: https://platform.claude.com/docs/en/build-with-claude/context-windows, 확인: 2026-07-05)

## 공식 출처
- Token counting은 비용, rate limit, model routing, prompt length 관리를 돕는다 — [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) (확인: 2026-07-05)
- Context window는 응답 생성 시 모델이 참조할 수 있는 작업 메모리이며, 더 많은 context가 자동으로 더 좋은 결과를 뜻하지 않는다 — [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
- Anthropic은 모델 tokenizer 차이 때문에 목표 모델 기준으로 prompt를 다시 세라고 설명한다 — [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) (확인: 2026-07-05)
- Cached prompt prefixes는 context window를 계속 차지한다 — [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
- OpenAI는 context management 영역에서 token counting을 별도 운영 주제로 제공한다 — [Counting tokens](https://developers.openai.com/api/docs/guides/token-counting) (확인: 2026-07-05)

## Quote Bank
- > "working memory"
  - 출처: [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
  - 맥락: context window를 학습 데이터 전체가 아니라 현재 작업 메모리로 설명할 때 사용한다.
- > "more context isn't automatically better"
  - 출처: [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
  - 맥락: 긴 컨텍스트가 항상 좋은 결과를 만든다는 오개념을 교정할 때 사용한다.
- > "Count tokens in basic messages"
  - 출처: [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) (확인: 2026-07-05)
  - 맥락: token counting이 요청 전 실행 가능한 절차임을 설명할 때 사용한다.
- > "Recount prompts against the model you plan to use"
  - 출처: [Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) (확인: 2026-07-05)
  - 맥락: model별 tokenizer 차이를 설명할 때 사용한다.
- > "Cached prompt prefixes still occupy the context window"
  - 출처: [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows) (확인: 2026-07-05)
  - 맥락: caching과 context capacity를 구분할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
- 2026-07-05: 재수집 1회차 — cached prompt prefixes 관련 citation URL을 Claude Context windows 문서로 보정 (Codex, P-03)
