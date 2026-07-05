## 한 줄 정의

Prompt Engineering은 모델에게 목표, 제약, 근거 정책, 출력 형식을 명확히 전달해 실패 가능성을 줄이는 입력 설계 작업입니다. 좋은 문장을 쓰는 기술만이 아니라, 모델이 무엇을 해야 하고, 무엇을 근거로 판단해야 하며, 어떤 형식으로 결과를 내야 하는지를 현재 context 안에 배치하는 기술입니다. 그래서 프롬프트는 부탁 문장이 아니라 작업 계약에 가깝습니다.

이 강의에서 다루는 Prompt Engineering은 "마법 문구를 찾는 일"이 아닙니다. OpenAI prompt guidance와 Anthropic prompting best practices가 공통으로 말하는 방향은 명확합니다. 목표를 구체화하고, 출력 형식을 정하고, 예시와 구조를 제공하고, citation behavior와 evidence missing behavior를 prompt 안에 포함해야 합니다. ==프롬프트의 품질은 모델이 추론해야 하는 빈칸을 얼마나 줄였는가로 판단할 수 있습니다.==

앞 강의에서 context window가 작업 메모리라는 점을 배웠습니다. Prompt Engineering은 그 작업 메모리 안에 들어가는 지시를 설계하는 일입니다. 아무리 좋은 모델도 목표, 자료, 제약, 출력 형식이 섞여 있으면 성공 기준을 추론해야 합니다. 반대로 프롬프트가 구조화되어 있으면 모델은 현재 해야 할 일, 참고해야 할 근거, 증거가 없을 때의 행동을 더 일관되게 따를 수 있습니다.

## 왜 존재하는가

프롬프트가 필요한 이유는 모델이 사용자의 의도를 자동으로 안정적으로 알 수 없기 때문입니다. "좋게 정리해줘", "이 코드 고쳐줘", "출처 달아줘" 같은 요청은 사람에게도 모호합니다. 무엇을 좋다고 볼지, 어느 파일을 고쳐도 되는지, 어떤 주장에 출처가 필요한지, 증거가 없으면 어떻게 해야 하는지 빠져 있습니다. 모델은 그 빈칸을 자신의 확률적 판단으로 채우게 됩니다.

Claude prompting best practices 문서는 명확하고 직접적인 지시, 예시 사용, XML tag 구조화, 출력 형식 제어를 공식 가이드로 제공합니다. 이 목록은 프롬프트가 문체 문제가 아니라 구조 문제임을 보여줍니다. 목표를 분리하고, 자료를 분리하고, 출력 형식을 분리하면 모델은 입력 안의 역할을 더 쉽게 구분합니다.

OpenAI prompt guidance는 grounded answers에서 citation behavior를 prompt의 일부로 두라고 설명합니다. 또한 무엇이 근거가 필요한지, 충분한 evidence가 무엇인지, evidence가 없을 때 어떻게 행동해야 하는지 정의하라고 합니다. 이 지점에서 Prompt Engineering은 단순한 지시문 작성에서 근거 정책 설계로 확장됩니다. 답변을 잘 쓰라고 말하는 것만으로는 부족하고, 어떤 문장을 support해야 하는지까지 알려야 합니다.

AI 코딩에서도 같은 문제가 생깁니다. "버그 고쳐줘"라고 하면 모델은 수정 범위, 테스트 기준, 리팩터링 허용 여부, 보고 형식을 추론합니다. 어떤 경우에는 맞을 수 있지만, 코드베이스가 커지고 변경 위험이 커질수록 추론에 맡기는 면적이 위험이 됩니다. ==Prompt Engineering은 AI가 똑똑해지기를 기다리는 기술이 아니라, 작업 조건을 명시해 결과를 검증 가능하게 만드는 기술입니다.==

역사적으로도 공식 문서들은 prompt engineering을 별도 문서 영역으로 다룹니다. 2026-07-05 기준 OpenAI와 Anthropic은 모델 종류와 응답 목적에 따라 지시 구조, 근거 요구, 출력 형식을 조정하는 실무 기법으로 prompt engineering을 설명합니다. OpenAI prompt engineering 문서는 reasoning model과 GPT model의 사용 감각을 구분하며, GPT model에는 더 구체적인 지시가 잘 맞는다고 설명합니다. 이 정보는 모델 종류에 따라 프롬프트의 상세도와 역할이 달라질 수 있음을 보여줍니다.

## 작동 원리

### 1. 프롬프트는 작업 계약으로 작동합니다

작업 계약으로서의 프롬프트에는 최소한 다섯 가지 요소가 들어갑니다. 목표, 범위, 제약, 근거 정책, 출력 형식입니다. 목표는 무엇을 달성할지입니다. 범위는 어떤 파일, 문서, 주제 안에서만 작업할지입니다. 제약은 하지 말아야 할 변경이나 지켜야 할 기준입니다. 근거 정책은 어떤 주장에 citation이나 quote가 필요한지입니다. 출력 형식은 결과를 어떤 구조로 받을지입니다.

이 요소들이 없으면 모델은 질문을 넓게 해석합니다. 예를 들어 "이 설명을 개선해줘"는 초보자용인지 전문가용인지, 문체만 바꿀지 구조까지 바꿀지, 출처를 유지해야 하는지 알 수 없습니다. 반면 "초보자용으로, KB에 있는 사실만 사용하고, 변경 이유를 세 문단으로 설명하라"는 요청은 판단 면적을 줄입니다.

### 2. 목표는 구체적이어야 하지만 context budget을 써야 합니다

목표를 구체화한다고 해서 무조건 길게 쓰라는 뜻은 아닙니다. 앞 강의의 관점에서 프롬프트도 context window를 차지합니다. 따라서 목표는 짧고 정확해야 합니다. "좋게"보다 "누락된 citation rule을 보강한다"가 낫고, "깔끔하게"보다 "lesson.md의 8개 섹션 순서를 유지한다"가 낫습니다.

구체성은 단어 수가 아니라 검증 가능성에서 나옵니다. 모델이 성공했는지 확인할 수 있는 조건을 넣어야 합니다. 예를 들어 "설명 연습을 만들어줘"보다 "KB Quote Bank에서만 인용하고, V2 8섹션을 유지하며, quiz.md는 만들지 않는다"가 더 좋은 작업 계약입니다.

### 3. 출력 형식은 긍정 지시로 고정합니다

Claude prompting best practices는 output format을 제어할 때 무엇을 하지 말라고 하기보다 무엇을 하라고 말하라고 권장합니다. 이 원칙은 실무에서 매우 중요합니다. "장황하게 쓰지 마"는 장황함의 기준을 모델에게 맡깁니다. "두 문단으로 쓰고, 첫 문단은 verdict, 둘째 문단은 근거로 쓴다"는 원하는 구조를 직접 제시합니다.

긍정 지시는 금지를 없애라는 뜻이 아닙니다. 금지가 필요한 상황도 있습니다. 다만 출력 제어의 중심을 "하지 말 것 목록"에만 두면 모델은 원하는 결과의 모양을 보기 어렵습니다. 원하는 결과를 직접 말하고, 금지는 위험 행동을 막는 보조 장치로 두는 편이 안정적입니다.

### 4. XML tag는 긴 프롬프트를 역할별로 나눕니다

Claude 문서는 XML tags로 prompt를 구조화하고 일관되고 설명적인 tag names를 사용하라고 설명합니다. XML tag의 실무적 가치는 모델에게 "이 부분은 목표", "이 부분은 자료", "이 부분은 제약", "이 부분은 출력 형식"이라고 구분해주는 데 있습니다. 긴 요청에서 자연어 문단만 이어지면 자료와 지시가 섞이기 쉽습니다.

예를 들어 `<goal>`, `<scope>`, `<evidence_policy>`, `<output_format>` 같은 구획을 쓰면 모델은 입력을 역할별로 읽을 수 있습니다. 이 방식은 AI 코딩 지시에서 특히 유용합니다. 변경할 파일 범위, 수정 금지 범위, 검증 명령, 보고 형식이 섞이면 모델이 우선순위를 잘못 잡을 수 있기 때문입니다.

### 5. 예시는 desired behavior를 보여줍니다

Claude 문서는 examples를 효과적으로 사용하라는 prompting practice를 제공합니다. 예시는 단순 참고자료가 아니라 "이런 형태의 결과를 원한다"는 행동 샘플입니다. 특히 출력 형식, 문체, citation 방식, 오류 처리 방식을 설명할 때 예시는 긴 설명보다 직접적일 수 있습니다.

다만 예시는 context budget을 씁니다. 따라서 예시가 필요한 이유가 분명해야 합니다. 단순한 요약 요청에는 예시가 과할 수 있고, 복잡한 citation formatting이나 JSON 구조 출력에는 예시가 큰 도움이 됩니다. 예시 역시 현재 작업에 필요한 high-signal context인지 판단해야 합니다.

### 6. Evidence policy는 grounded answer의 중심입니다

OpenAI prompt guidance는 "무엇이 support를 필요로 하는지"와 evidence missing behavior를 prompt에 정의하라고 설명합니다. 이 규칙이 없으면 모델은 어떤 문장에 출처가 필요한지 임의로 판단합니다. "출처를 달아줘"만으로는 부족합니다. 어떤 주장에 citation이 필요한지, 어떤 출처만 사용할 수 있는지, 근거가 없으면 어떻게 말해야 하는지를 함께 정해야 합니다.

예를 들어 교육 사이트의 강의 생성 prompt라면 "KB 외 사실 금지", "Quote Bank에서만 직접 인용", "근거가 부족하면 생성 중단" 같은 정책이 필요합니다. 코드 리뷰 prompt라면 "저장소 파일과 테스트 결과로 확인한 주장만 확정적으로 말한다"는 정책이 필요합니다. ==근거 정책이 없는 프롬프트는 모델에게 사실 판단 기준까지 위임하는 셈입니다.==

### 7. Citation behavior는 prompt의 일부입니다

OpenAI prompt guidance는 citation behavior should be part of the prompt라고 설명합니다. citation은 모델이 알아서 붙이는 장식이 아니라 지시된 행동입니다. 어떤 문장 뒤에 붙일지, 어떤 source ID만 사용할지, 증거가 없으면 어떻게 할지, source ID를 만들어내지 말라는 규칙이 prompt에 들어가야 합니다.

이 원리는 다음 강의인 Grounding과 Citation으로 이어집니다. Prompt Engineering은 citation을 요구하는 지시를 만들고, Grounding은 그 citation이 실제 claim을 support하는지 다룹니다. 둘은 분리되지만 연결됩니다.

## 스펙과 세부

### Reasoning model과 GPT model의 차이

KB는 OpenAI prompt engineering 문서가 reasoning model과 GPT model의 사용 감각을 구분하고, GPT model에는 더 구체적인 지시가 잘 맞는다고 설명한다고 정리합니다. 따라서 모든 모델에 같은 프롬프트 스타일이 최적이라고 가정하지 않습니다. 모델 종류와 응답 목적에 따라 지시 상세도, 사고 과정 요구, 출력 형식을 조정해야 합니다.

### Citation formatting의 세부 규칙

OpenAI citation formatting 문서는 citations를 paragraph 끝이나 필요한 위치에 두고, source IDs를 invent하지 말라고 안내합니다. 이 규칙은 prompt에 들어가야 합니다. "출처를 붙여라"는 지시만 있으면 모델이 context에 없는 ID나 line range를 만들어낼 수 있습니다. 따라서 "returned context에 있는 source ID만 사용하라"와 같은 규칙이 필요합니다.

### Evidence missing behavior

OpenAI prompt guidance는 evidence missing behavior를 정의하라고 합니다. 증거가 부족한 상황에서 모델이 어떻게 행동할지 정하지 않으면, 모델은 답을 완성하려는 방향으로 움직일 수 있습니다. Grounded answer에서는 근거 없음, 추가 확인 필요, 모름, 제한된 답변 같은 상태를 출력 형식에 포함하는 것이 안전합니다.

### 실행 가능한 예시: 코딩 프롬프트 계약

```ts
type CodingPrompt = {
  goal: string
  scope: string[]
  constraints: string[]
  evidencePolicy: "cite-sources" | "repo-only" | "ask-if-missing"
  verification: string[]
  outputFormat: string
}

const prompt: CodingPrompt = {
  goal: "Fix the lesson metadata mismatch without changing lesson prose.",
  scope: ["ai-ops/outputs/02-drafts", "src/content"],
  constraints: ["Do not add facts outside approved KB.", "Do not create quiz.md."],
  evidencePolicy: "repo-only",
  verification: ["npm run verify"],
  outputFormat: "Report changed files, reason, and verification result.",
}

console.log(`${prompt.goal}\n${prompt.verification.join(", ")}`)
```

이 예시는 provider API가 아니라 프롬프트 구성 요소를 타입으로 드러냅니다. 핵심은 지시가 하나의 문장에 뭉쳐 있지 않다는 점입니다. 목표, 범위, 제약, evidence policy, verification, output format이 분리되어 있으면 모델도 작업을 분리해서 처리하기 쉽습니다.

## 원문으로 읽기

> "Define what needs support"
>
> — 무엇이 근거를 필요로 하는지 정의하라.
> [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)

이 문장은 grounded answer에서 prompt가 해야 할 일을 정확히 보여줍니다. 모든 문장에 같은 수준의 citation이 필요한 것은 아닙니다. 어떤 주장이 외부 근거를 필요로 하는지, 어떤 문장은 일반 구조 설명인지 구분해야 합니다. 이 기준을 prompt에 넣어야 citation이 일관됩니다.

> "citation behavior should be part of the prompt"
>
> — citation 행동은 prompt의 일부여야 한다.
> [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)

Citation은 출력 후반에 붙이는 장식이 아닙니다. 모델이 답을 만들 때부터 어떤 claim에 citation을 붙일지, 어떤 출처만 사용할지, 근거가 없을 때 어떻게 할지 알아야 합니다. 이 문장은 Prompt Engineering이 지시 문장 작성에서 근거 정책 설계로 확장되는 지점을 보여줍니다.

> "Tell Claude what to do instead of what not to do"
>
> — 하지 말아야 할 것보다 해야 할 것을 말하라.
> [Prompting best practices — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

이 인용은 출력 형식 제어에서 특히 유용합니다. "길게 쓰지 마"보다 "세 문단으로, 각 문단은 verdict, rationale, next step을 다룬다"가 더 직접적입니다. 금지가 필요할 때도 원하는 행동을 먼저 지정해야 모델이 결과의 모양을 잡을 수 있습니다.

> "Use XML format indicators"
>
> — XML 형식 표시자를 사용하라.
> [Prompting best practices — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

XML tag는 긴 prompt의 역할을 분리하는 장치입니다. 목표, 자료, 제약, 출력 형식이 한 문단 안에 섞이면 모델이 어떤 정보가 지시이고 어떤 정보가 참고자료인지 헷갈릴 수 있습니다. tag를 쓰면 context 안의 정보가 역할별로 정렬됩니다.

> "Never invent source IDs"
>
> — source ID를 절대 만들어내지 말라.
> [Citation Formatting — OpenAI API Docs](https://developers.openai.com/api/docs/guides/citation-formatting)

이 문장은 citation prompt에서 반드시 필요한 검증 규칙입니다. source ID가 context에 없는데 모델이 그럴듯한 ID를 만들면 citation은 신뢰 장치가 아니라 환각 장식이 됩니다. 따라서 citation behavior를 prompt에 넣을 때는 "사용 가능한 source만 cite한다"는 규칙까지 포함해야 합니다.

## 실전에서

### 패턴 1: AI 코딩 요청을 구획으로 나눕니다

바이브코딩에서 좋은 프롬프트는 대체로 다음 구획을 가집니다. 목표, 변경 범위, 금지 범위, 근거, 검증 명령, 보고 형식입니다. 이 구획을 자연어 문단으로 써도 되지만, 긴 작업에서는 XML tag가 더 선명합니다.

```md
<goal>
approved KB에 근거해 lesson draft 4개를 V2 형식으로 생성한다.
</goal>

<scope>
ai-ops/outputs/02-drafts/{slug}/lesson.md, meta.md, terms.md
</scope>

<constraints>
KB 외 사실을 추가하지 않는다.
quiz.md를 만들지 않는다.
</constraints>

<verification>
V2 8섹션, 인용 3개 이상, 길이 8000자 이상, Quote Bank 원문 일치.
</verification>
```

이 예시는 문법 자체보다 역할 분리가 중요합니다. 모델은 목표와 제약을 한 덩어리로 읽지 않고, 각 영역을 다른 판단 기준으로 사용할 수 있습니다.

### 패턴 2: evidence policy를 출력 형식에 포함합니다

근거 기반 답변에서는 "출처를 달아줘"로 끝내지 않습니다. 어떤 주장에 citation이 필요한지, 어떤 출처만 사용할지, source ID가 없으면 어떻게 할지까지 씁니다. 예를 들어 "retrieved context에 포함된 sourceId만 사용하고, support가 없으면 '근거 없음'으로 표시하라"는 식입니다.

이 방식은 학습 사이트에도 그대로 적용됩니다. 강의 작성자는 KB에 없는 사실을 넣지 않고, 공식 출처 인용은 Quote Bank와 글자 단위로 맞춰야 합니다. evidence policy가 있으면 강의가 멋진 문장보다 검증 가능한 문장으로 바뀝니다.

### 패턴 3: 출력 형식을 결과 검토와 연결합니다

출력 형식은 보기 좋게 만들기 위한 장치만이 아닙니다. 검토자가 빠르게 확인할 수 있게 만드는 장치입니다. "수정 파일 목록, 변경 이유, 검증 결과, 남은 위험"처럼 보고 형식을 정하면 작업 후 QA가 쉬워집니다. 모델이 잘못했을 때도 어느 항목이 비었는지 바로 보입니다.

### 패턴 4: prompt를 바꾸면 결과도 다시 검증합니다

Prompt Engineering은 evaluation과 연결됩니다. KB는 prompt가 원하는 행동을 지시하고, evaluation은 실제 출력이 기준을 만족했는지 측정한다고 정리합니다. 프롬프트를 개선했다고 해서 자동으로 시스템이 좋아졌다고 볼 수 없습니다. 근거, 출력 형식, 테스트 결과를 다시 확인해야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 프롬프트가 모델의 모든 불확실성을 제거하지 못한다는 점입니다. 좋은 프롬프트는 성공 기준을 명확히 하지만, 모델 출력은 여전히 검증이 필요합니다. 특히 grounded answer에서는 citation이 실제 claim을 support하는지 확인해야 합니다.

두 번째 한계는 context budget입니다. 지시를 자세히 쓰면 명확해지지만, 그만큼 context window를 사용합니다. 너무 긴 정책 문서는 핵심 목표를 흐리게 만들 수 있습니다. 좋은 프롬프트는 길이가 아니라 신호 밀도로 판단해야 합니다.

세 번째 한계는 모델별 차이입니다. KB는 OpenAI 문서가 reasoning model과 GPT model의 사용 감각을 구분한다고 정리합니다. 한 모델에서 잘 작동한 prompt가 다른 모델에서도 같은 방식으로 작동한다고 보장할 수 없습니다.

네 번째 한계는 prompt가 system design을 대신하지 못한다는 점입니다. Prompt Engineering은 입력 설계이고, Context Engineering은 전체 context 상태를 관리합니다. Tool Calling은 실제 도구 실행과 schema contract를 다룹니다. RAG는 외부 근거를 검색해 context에 넣습니다. Evaluation은 결과 품질을 측정합니다. ==프롬프트는 AI 시스템의 시작점이지만, 시스템 전체를 대체하지는 않습니다.==

## 더 읽기

먼저 OpenAI Prompt guidance 문서를 읽어 grounded answer에서 citation behavior와 evidence rule이 prompt에 들어가야 하는 이유를 확인하세요. 그 다음 Claude Prompting best practices에서 clear prompting, examples, XML tags, output format control을 보세요. 마지막으로 OpenAI Citation Formatting 문서를 읽으면서 "source ID를 invent하지 말라"는 규칙이 왜 prompt 단계에서 필요해지는지 연결해보세요.

- [Prompt engineering — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-engineering)
- [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)
- [Prompting best practices — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Citation Formatting — OpenAI API Docs](https://developers.openai.com/api/docs/guides/citation-formatting)

읽을 때는 세 가지 질문을 붙잡으세요. 이 prompt는 무엇을 성공으로 정의하는가, 어떤 claim에 support가 필요한가, 근거가 없을 때 모델이 어떻게 행동해야 하는가. 이 질문에 답할 수 있으면 프롬프트는 단순 요청에서 작업 계약으로 바뀝니다.
