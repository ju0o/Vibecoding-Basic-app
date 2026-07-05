## 한 줄 정의

환각과 검증은 모델 출력이 사실과 맞지 않거나 제공된 context와 일치하지 않을 가능성을 claim, quote, citation, test, evaluation, human review로 관리하는 개념입니다. 환각은 단순히 "AI가 이상한 말을 했다"가 아니라, 자연스럽게 보이는 출력이 실제 근거와 맞지 않는 상태입니다. 검증은 그 출력의 자신감이 아니라 근거와 실행 결과를 기준으로 판단하는 절차입니다.

Claude reduce hallucinations 문서는 hallucination을 factually incorrect or inconsistent with the given context인 content로 설명합니다. 이 정의는 두 축을 가집니다. 하나는 외부 사실과의 불일치이고, 다른 하나는 현재 제공된 context와의 불일치입니다. 따라서 검증은 모델이 그럴듯하게 말했는지가 아니라, 주어진 source와 실제 테스트가 claim을 support하는지를 봅니다.

바이브코딩에서 이 개념은 매우 실용적입니다. AI가 API 사용법을 설명하거나, 오류 원인을 추론하거나, 코드 변경을 제안할 때 문장이 자연스럽다고 해서 맞는 것은 아닙니다. 공식 문서, 저장소 파일, 테스트 결과, human review로 확인해야 합니다. ==AI를 잘 쓰는 사람은 답을 빨리 받는 사람이 아니라, 답을 검증 가능한 단위로 바꾸는 사람입니다.==

## 왜 존재하는가

LLM 출력은 자연어로 매끄럽습니다. 이 매끄러움은 장점이지만 위험이기도 합니다. 오류 메시지를 그럴듯하게 해석하고, 존재하지 않는 API 옵션을 말하고, 제공된 문서에 없는 정책을 추가하고, citation이 실제 claim을 support하지 않는데도 자신 있게 답할 수 있습니다. Claude 문서의 정의처럼 문제는 사실과 맞지 않거나 given context와 inconsistent한 content가 생긴다는 데 있습니다.

환각 완화가 필요한 첫 번째 이유는 사용자가 모델의 confidence와 정확성을 혼동하기 쉽기 때문입니다. 자연스러운 문장, 확신 있는 어조, 긴 설명은 정확성의 증거가 아닙니다. AI 학습 사이트에서는 이 차이를 아주 이른 단계에서 가르쳐야 합니다. "AI가 맞는 말을 했는가"가 아니라 "어떤 근거로 맞다고 볼 수 있는가"를 묻는 습관이 필요합니다.

두 번째 이유는 근거 부족 상황에서 모델이 단정하려는 압력이 있기 때문입니다. Claude는 모델이 "I don't know"라고 말할 수 있게 하라고 권장합니다. 이 규칙이 없으면 모델은 답을 완성하려고 하면서 근거가 약한 claim을 만들 수 있습니다. OpenAI prompt guidance도 evidence missing behavior를 정의하고, absence of evidence가 자동으로 factual no가 되어서는 안 된다고 설명합니다.

세 번째 이유는 AI 출력이 반복 실행마다 달라질 수 있기 때문입니다. OpenAI evaluation best practices는 generative AI가 variable하고 nondeterministic이기 때문에 evals가 AI system testing 방법이라고 설명합니다. 한 번 맞은 답변이 다음에도 같은 품질로 나올 것이라고 가정하면 안 됩니다. 그래서 검증은 개별 답변 확인과 반복 가능한 evaluation을 함께 다룹니다.

네 번째 이유는 실제 사용 전 human review가 필요한 영역이 있기 때문입니다. OpenAI safety best practices는 가능한 경우 outputs가 실제로 쓰이기 전에 human review를 권장하고, code generation과 high-stakes domains에서 특히 중요하다고 설명합니다. 코드 변경은 실행 환경에 영향을 줄 수 있으므로 테스트와 사람 검토가 함께 필요합니다.

## 작동 원리

### 1. 먼저 hallucination을 정의합니다

검증 루틴은 "무엇을 실패로 볼 것인가"를 정의하는 데서 시작합니다. Claude 문서 기준 hallucination은 factually incorrect하거나 given context와 inconsistent한 content입니다. 이 정의는 단순하지만 강력합니다. 모델이 외부 사실과 다르게 말해도 문제이고, 사용자가 제공한 문서와 다르게 말해도 문제입니다.

예를 들어 제공된 KB에 "citation behavior should be part of the prompt"라고 되어 있는데 모델이 "citation은 자동 기능이므로 prompt에 넣을 필요가 없다"고 말하면, 이는 제공 context와 inconsistent합니다. 공식 문서에 없는 옵션을 API 옵션처럼 말하면 factually incorrect일 수 있습니다. 검증은 이런 불일치를 찾는 절차입니다.

### 2. Uncertainty permission을 줍니다

Claude는 "Allow Claude to say \"I don't know\""를 hallucination 감소 전략으로 제시합니다. 이 원칙은 모델에게 모름을 허용하는 것 이상입니다. 출력 형식과 prompt 정책 안에 근거 부족 상태를 표현할 자리를 만들어야 합니다. "확인 불가", "추가 근거 필요", "현재 context에는 없음" 같은 상태가 있어야 모델이 단정을 피할 수 있습니다.

Uncertainty permission은 특히 검색 실패 상황에서 중요합니다. OpenAI prompt guidance의 absence of evidence 규칙처럼, 현재 evidence에 없다고 해서 사실이 아니라고 단정하면 안 됩니다. 모델은 "현재 제공된 근거로는 확인할 수 없다"고 말할 수 있어야 합니다.

### 3. Direct quote로 factual grounding을 강화합니다

Claude는 factual grounding을 위해 direct quotes를 사용하라고 설명합니다. quote는 claim을 추상적 출처 링크보다 더 엄격하게 묶습니다. 단순히 URL을 붙이면 사용자는 어느 문장에 근거가 있는지 다시 찾아야 합니다. direct quote를 요구하면 모델은 claim을 뒷받침하는 원문 구절을 찾아야 합니다.

이 방식은 교육 콘텐츠와 코드 리뷰 모두에 유용합니다. 교육 콘텐츠에서는 공식 문서 원문을 Quote Bank에서 가져와 설명합니다. 코드 리뷰에서는 저장소 파일, 테스트 로그, 공식 API 문서의 구절을 claim과 연결할 수 있습니다. quote가 없으면 claim을 약하게 만들거나 철회해야 합니다.

### 4. Citation으로 audit trail을 만듭니다

Claude는 "Verify with citations"를 hallucination 완화 전략으로 제시합니다. Citation은 claim이 어느 source와 연결되는지 보여주는 audit trail입니다. 하지만 앞 강의에서 배웠듯 citation 자체가 truth를 보장하지는 않습니다. source가 cited response text를 직접 support하는지 다시 봐야 합니다.

검증 루틴에서는 citation을 두 단계로 다룹니다. 먼저 모델이 claim마다 citation이나 quote를 붙이게 합니다. 그 다음 사람이든 자동 루틴이든 citation source를 열어 claim이 실제로 support되는지 확인합니다. source ID를 invent하지 않았는지, locator가 맞는지, quote가 claim을 과장하지 않는지도 봅니다.

### 5. Claim audit은 답변을 검증 단위로 나눕니다

긴 답변 전체를 "맞다/틀리다"로 판단하면 검증이 어렵습니다. Claim audit은 답변을 claim 단위로 나눕니다. 각 claim에 sourceRequired 여부를 붙이고, supportingQuote나 citation을 요구합니다. Quote가 없으면 claim을 철회하거나 "근거 부족"으로 표시합니다.

예를 들어 "Prompt Engineering은 citation behavior를 prompt에 포함해야 한다"는 claim은 OpenAI prompt guidance 인용으로 support될 수 있습니다. "모든 모델에서 같은 prompt가 항상 동일하게 작동한다"는 claim은 KB 근거와 맞지 않으므로 수정해야 합니다. claim 단위로 나누면 어떤 부분이 안전하고 어떤 부분이 위험한지 보입니다.

### 6. Code verification은 문서와 테스트를 함께 봅니다

AI가 코드 변경을 제안할 때는 공식 문서와 저장소 테스트가 모두 중요합니다. 문서 근거는 API 사용법이 맞는지 확인하게 해주고, 테스트는 실제 코드베이스에서 동작하는지 확인하게 해줍니다. OpenAI safety best practices는 code generation에서 human review가 특히 중요하다고 설명합니다. 따라서 코드 변경을 바로 병합하지 않고, 테스트 결과와 사람 검토를 거쳐야 합니다.

AI가 "이 테스트를 통과할 것입니다"라고 말해도 실제 실행 전에는 claim입니다. 검증은 명령을 실행하고 결과를 확인해야 끝납니다. 실행하지 않은 테스트를 통과했다고 쓰면 hallucination risk가 생깁니다.

### 7. Evaluation set은 반복 품질을 봅니다

개별 답변 검증만으로는 시스템 품질을 알기 어렵습니다. OpenAI evaluation best practices는 generative AI의 variability와 nondeterminism 때문에 evals가 필요하다고 설명합니다. Evaluation set은 자주 틀리는 질문, edge case, 위험한 입력을 모아 prompt나 model 변경 전후로 반복 실행하는 자료입니다.

여기서 evaluation은 "한 번 물어보고 괜찮다"가 아닙니다. 같은 기준으로 여러 사례를 실행해 regression을 봅니다. Prompt를 바꿨을 때 grounded answer 품질이 올라갔는지, citation hallucination이 줄었는지, "I don't know"가 필요한 곳에서 잘 나오는지 확인합니다.

## 스펙과 세부

### Hallucination definition

KB의 정의는 Claude 문서에 근거합니다. Hallucination은 factually incorrect하거나 inconsistent with the given context인 content입니다. 이 정의를 쓰면 검증 기준이 명확해집니다. 외부 사실과의 불일치, 제공 context와의 불일치 모두 실패입니다.

### Evidence missing behavior

OpenAI prompt guidance는 evidence missing behavior를 정의하라고 설명하고, absence of evidence가 자동으로 factual no가 되어서는 안 된다고 설명합니다. 따라서 검증 루틴에는 "근거 없음" 상태가 필요합니다. 근거가 없으면 단정이 아니라 제한된 답변이나 추가 확인으로 처리합니다.

### Evaluation and variability

OpenAI evaluation best practices는 generative AI가 variable하고 nondeterministic이기 때문에 evals가 AI system testing 방법이라고 설명합니다. 이 규칙은 prompt 개선과 model 변경을 검증할 때 중요합니다. 출력이 매번 달라질 수 있다면, 한 사례만 보고 품질을 판단할 수 없습니다.

### Human review

OpenAI safety best practices는 가능한 경우 human review outputs before they are used를 권장하고, code generation에서 특히 중요하다고 설명합니다. Human reviewer는 output을 verify하는 데 필요한 information에 access해야 합니다. 따라서 review는 단순 승인 버튼이 아니라 source, test result, diff, context를 볼 수 있어야 합니다.

### 실행 가능한 예시: claim audit checklist

```ts
type VerificationChecklist = {
  claims: Array<{ text: string; sourceRequired: boolean; supportingQuote?: string }>
  tests: string[]
  humanReviewRequired: boolean
  unresolvedQuestions: string[]
}

const checklist: VerificationChecklist = {
  claims: [
    {
      text: "Citation behavior should be part of the prompt.",
      sourceRequired: true,
      supportingQuote: "citation behavior should be part of the prompt",
    },
    {
      text: "Current evidence is enough to confirm every implementation detail.",
      sourceRequired: true,
    },
  ],
  tests: ["npm run verify"],
  humanReviewRequired: true,
  unresolvedQuestions: ["Second claim has no supporting quote."],
}

console.log(checklist.unresolvedQuestions.join("\n"))
```

이 예시는 답변을 claim 단위로 나누고 supporting quote 유무를 기록합니다. 두 번째 claim에는 quote가 없으므로 unresolved question으로 남깁니다. 이런 구조를 쓰면 모델의 자연스러운 문장을 검증 가능한 항목으로 바꿀 수 있습니다.

## 원문으로 읽기

> "factually incorrect or inconsistent with the given context"
>
> — 사실과 맞지 않거나 제공된 context와 일치하지 않는.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

이 문장은 hallucination의 범위를 정합니다. 모델이 세상 사실과 다르게 말하는 것도 문제지만, 사용자가 제공한 context와 다르게 말하는 것도 문제입니다. AI 코딩에서는 저장소 파일이나 테스트 결과와 맞지 않는 설명이 여기에 해당할 수 있습니다.

> "Allow Claude to say \"I don't know\""
>
> — Claude가 "모른다"고 말할 수 있게 하라.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

이 인용은 근거 부족 상태를 출력 형식 안에 허용해야 한다는 뜻입니다. 모델이 무조건 답을 완성해야 한다고 느끼면 근거 없는 claim을 만들 수 있습니다. 모름을 허용하면 불확실성이 숨겨지지 않고 검토 가능한 상태로 남습니다.

> "Use direct quotes for factual grounding"
>
> — 사실 grounding을 위해 직접 인용을 사용하라.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

Direct quote는 citation보다 더 좁은 근거 단위입니다. claim을 support하는 원문 구절을 요구하면 모델이 단순히 링크를 붙이는 것을 넘어 실제 근거 문장을 찾아야 합니다. 교육 콘텐츠의 Quote Bank 방식도 이 원칙과 잘 맞습니다.

> "Verify with citations"
>
> — citation으로 검증하라.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

Citation은 claim을 source와 연결해 audit 가능하게 만듭니다. 하지만 citation이 있다고 끝나는 것은 아닙니다. cited source가 response text를 직접 support하는지 대조해야 합니다. 따라서 citation은 검증의 완료가 아니라 검증의 입구입니다.

> "Generative AI is variable"
>
> — 생성형 AI는 가변적이다.
> [Evaluation best practices — OpenAI API Docs](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

이 문장은 eval이 필요한 이유를 요약합니다. 같은 prompt라도 출력이 달라질 수 있고, prompt나 model 변경은 품질을 바꿀 수 있습니다. 반복 가능한 evaluation set이 없으면 "이번에는 괜찮았다" 이상의 판단을 하기 어렵습니다.

> "human review outputs before they are used"
>
> — outputs가 사용되기 전에 사람이 검토한다.
> [Safety best practices — OpenAI API Docs](https://developers.openai.com/api/docs/guides/safety-best-practices)

이 인용은 자동 검증의 한계를 보여줍니다. 특히 code generation에서는 테스트와 공식 문서 대조만으로 충분하지 않을 수 있습니다. 실제 사용 전 사람이 diff, source, test result를 확인할 수 있어야 합니다.

## 실전에서

### 패턴 1: 답변을 claim 단위로 다시 씁니다

AI가 긴 설명을 만들면 먼저 claim을 분리합니다. 정의 claim, 원인 claim, 해결책 claim, 버전 claim, 코드 동작 claim을 구분합니다. 각 claim에 sourceRequired를 표시하고, quote나 citation이 있는지 확인합니다. 지원 근거가 없으면 claim을 삭제하거나 약하게 표현합니다.

### 패턴 2: "모름"을 실패가 아니라 정상 상태로 둡니다

근거가 부족할 때 "모른다"는 답변은 실패가 아닙니다. 오히려 환각을 줄이는 성공적인 행동일 수 있습니다. 프롬프트와 출력 형식에 "확인 불가", "추가 확인 필요", "현재 context에는 없음"을 넣어두면 모델이 단정 대신 상태를 표현할 수 있습니다.

### 패턴 3: 코드 변경은 테스트와 review로 닫습니다

AI가 코드를 고쳤다고 말하면 실제 테스트를 실행합니다. 테스트를 실행하지 못했다면 "실행하지 못함"을 보고해야 합니다. 테스트가 통과해도 human review가 필요한 변경이 있습니다. OpenAI safety best practices가 code generation에서 human review를 강조하는 이유가 여기에 있습니다.

### 패턴 4: 자주 틀리는 사례를 eval set으로 모읍니다

같은 유형의 hallucination이 반복되면 그것을 eval set에 넣습니다. 예를 들어 source ID를 invent하는 답변, citation이 claim을 직접 support하지 않는 답변, 근거가 없는데 단정하는 답변을 사례로 모읍니다. Prompt나 model을 바꾼 뒤 이 사례들을 다시 실행해 회귀를 확인합니다.

### 패턴 5: 교육 콘텐츠에서는 Quote Bank를 검증 기준으로 씁니다

이 사이트의 V2 강의처럼 공식 문서 원문 인용을 KB Quote Bank에서만 가져오게 하면 hallucination 위험을 줄일 수 있습니다. 작성자는 원문을 새로 꾸미지 않고 그대로 인용하고, 번역과 해설을 붙입니다. 인용이 없거나 KB 밖 사실이 필요하면 강의 생성을 중단하고 KB 보강으로 돌아가야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 검증 비용입니다. claim audit, citation 대조, test 실행, human review는 시간이 듭니다. 그러나 고위험 변경이나 교육 콘텐츠에서는 이 비용이 신뢰의 기반입니다. 검증 없이 빠른 답을 얻는 것과 검증 가능한 답을 얻는 것은 다른 목표입니다.

두 번째 한계는 citation이 완전한 방어막이 아니라는 점입니다. Citation은 audit trail을 제공하지만, source가 claim을 직접 support하는지 확인해야 합니다. 잘못된 요약, 과장, selective interpretation은 citation이 있어도 남을 수 있습니다.

세 번째 한계는 "모른다"를 너무 넓게 허용하면 답변 유용성이 떨어질 수 있다는 점입니다. 따라서 uncertainty permission은 evidence policy와 함께 설계해야 합니다. 어떤 경우에는 답변을 제한하고, 어떤 경우에는 추가 확인 질문을 하고, 어떤 경우에는 현재 evidence로 가능한 범위만 말하게 해야 합니다.

네 번째 한계는 eval set도 완전하지 않다는 점입니다. Evaluation set은 대표 사례와 edge case를 모으지만 모든 미래 입력을 담을 수 없습니다. 그래도 generative AI가 variable하다는 점을 고려하면 반복 가능한 eval은 prompt와 model 변경을 관리하는 핵심 도구입니다.

다섯 번째 한계는 human review의 품질입니다. 사람이 검토한다고 자동으로 안전해지는 것은 아닙니다. OpenAI safety best practices가 말하듯 reviewer는 output을 verify하는 데 필요한 information에 access해야 합니다. diff, source, test result, citation, unresolved question이 함께 제공되어야 합니다. ==좋은 검증은 사람에게 "믿어도 될까요?"를 묻는 것이 아니라, 사람이 확인할 재료를 함께 제공하는 것입니다.==

## 더 읽기

먼저 Claude Reduce hallucinations 문서를 읽어 hallucination 정의, "I don't know" 허용, direct quote, citation verification을 확인하세요. 그 다음 OpenAI Citation Formatting 문서에서 source가 cited response text를 직접 support해야 한다는 규칙을 보세요. OpenAI Prompt guidance는 evidence missing behavior를 prompt에 넣는 이유를 설명합니다. OpenAI Evaluation best practices와 Safety best practices는 개별 답변 검증을 넘어 반복 평가와 human review로 확장하는 데 필요합니다.

- [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [Citation Formatting — OpenAI API Docs](https://developers.openai.com/api/docs/guides/citation-formatting)
- [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)
- [Evaluation best practices — OpenAI API Docs](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Safety best practices — OpenAI API Docs](https://developers.openai.com/api/docs/guides/safety-best-practices)

읽을 때는 "이 문서가 개별 claim 검증을 말하는가, 반복 evaluation을 말하는가, human review를 말하는가"를 구분하세요. 환각 관리는 하나의 prompt trick이 아니라 prompt, grounding, citation, test, eval, review가 이어지는 루틴입니다.
