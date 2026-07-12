## 한 줄 정의

Grounding과 citation은 모델 답변의 각 주장을 제공된 근거와 추적 가능한 출처 위치에 연결하는 방식입니다. Grounding은 "이 답변이 어떤 evidence에 묶여 있는가"를 설계하는 일이고, citation은 그 evidence의 위치를 사용자가 다시 확인할 수 있게 표시하는 형식입니다. 둘은 함께 쓰이지만 같은 개념은 아닙니다.

출처 링크를 마지막에 모아두는 것만으로는 grounding이 되지 않습니다. 어떤 문장이나 문단이 어떤 citable unit에 의해 support되는지 연결되어야 합니다. OpenAI citation formatting 문서는 cited response text를 직접 support하는 retrieved sources만 cite하라고 설명하고, Claude citations 문서는 citations가 source documents 안의 specific locations를 reference한다고 설명합니다. ==Grounding의 핵심은 "출처가 있다"가 아니라 "이 claim이 이 근거로 지지된다"입니다.==

이 강의는 레퍼런스형입니다. Prompt Engineering에서 "citation behavior should be part of the prompt"라는 원칙을 배웠다면, 여기서는 citation이 실제로 어떤 구조를 가져야 하는지 봅니다. citable unit, stable source ID, source locator, evidence missing behavior, invented reference 방지 규칙을 차례로 정리합니다.

## 왜 존재하는가

AI 답변은 자연스럽게 보이기 때문에 사용자는 쉽게 신뢰합니다. 그러나 자연스러운 문장과 근거 있는 문장은 다릅니다. 출처가 없는 답변은 어느 문장이 문서에 의해 support되는지 확인하기 어렵습니다. OpenAI citation formatting 문서는 citation이 지원하는 response text에 정확히 연결되어야 한다고 설명합니다. 따라서 grounding은 답변의 신뢰를 "느낌"이 아니라 "추적 가능성"으로 바꿉니다.

Citation이 필요한 또 다른 이유는 모델이 존재하지 않는 source ID나 locator를 만들 수 있기 때문입니다. OpenAI citation formatting 문서는 returned context에 없는 source IDs, line ranges, block locators를 invent하지 말라고 설명합니다. 이 규칙이 없으면 citation은 환각을 줄이는 장치가 아니라 환각을 더 그럴듯하게 보이게 하는 장식이 됩니다.

Grounding은 "근거가 없으면 아니다"라는 오해도 막습니다. OpenAI prompt guidance는 absence of evidence가 자동으로 factual no가 되어서는 안 된다고 설명합니다. 검색 결과에 없다는 것은 현재 제공된 evidence 안에서 찾지 못했다는 뜻이지, 사실이 거짓이라는 뜻이 아닐 수 있습니다. 따라서 evidence missing behavior를 정해야 합니다. 모름, 추가 확인 필요, 제한된 답변, 근거 부족 표시 같은 선택지가 필요합니다.

교육 사이트에서 grounding은 학습자가 원문으로 돌아갈 수 있게 하는 길입니다. 단순히 권위 있는 문서 링크를 붙이는 것이 아니라, 어떤 개념 설명이 어떤 공식 문서 문장에 기대고 있는지 보여줍니다. 바이브코딩에서도 마찬가지입니다. AI가 코드 변경 이유, API 사용법, 보안 주장을 말할 때 그 주장이 저장소 파일, 테스트 결과, 공식 문서 중 어디에 연결되는지 확인할 수 있어야 합니다.

==Grounding과 citation은 AI 답변을 "읽는 결과물"에서 "검증할 수 있는 결과물"로 바꾸기 위해 존재합니다.== 이 전환이 없으면 사용자는 AI가 만든 설명을 다시 검증할 방법을 잃습니다. 반대로 claim과 evidence가 연결되면 학습자와 개발자는 원문을 열어 직접 확인할 수 있습니다.

## 작동 원리

### 1. 먼저 claim을 식별합니다

Grounding의 첫 단계는 답변 안에서 support가 필요한 claim을 식별하는 것입니다. 모든 문장이 같은 정도의 근거를 필요로 하지는 않습니다. 정의, 수치, API 동작, 공식 문서의 권장 사항, 정책, 버전 정보처럼 외부 근거가 필요한 문장이 있습니다. 반면 문단 연결이나 학습 안내 문장은 별도의 citation이 덜 필요할 수 있습니다.

OpenAI prompt guidance의 "Define what needs support"는 이 단계를 가리킵니다. 어떤 주장에 support가 필요한지 정의하지 않으면 모델은 citation을 임의로 붙입니다. 그러면 중요한 claim에는 citation이 빠지고, 일반 문장에만 citation이 붙을 수 있습니다. 좋은 grounding은 citation을 많이 붙이는 것이 아니라 필요한 claim에 정확히 붙이는 것입니다.

### 2. Evidence를 citable unit으로 나눕니다

다음 단계는 근거를 인용 가능한 단위로 나누는 것입니다. OpenAI citation formatting 문서는 line-level, paragraph-level, document-level 같은 citable unit을 use case의 precision에 맞게 고르라고 설명합니다. 너무 큰 document-level 단위만 있으면 claim이 문서 어디에서 support되는지 찾기 어렵습니다. 너무 작은 단위만 있으면 관리가 복잡해질 수 있습니다.

교육 콘텐츠에서는 문단 단위나 quote bank 단위가 유용합니다. 코드 리뷰에서는 파일 경로와 line range가 유용할 수 있습니다. 검색 결과 답변에서는 `sourceId`, `title`, `locator`, `text` 같은 구조를 가진 block이 citable unit이 됩니다. 중요한 것은 모델이 citation할 수 있는 안정적인 단위를 미리 제공하는 것입니다.

### 3. Stable source ID와 locator를 제공합니다

Citation이 작동하려면 출처 식별자와 위치 정보가 필요합니다. Stable source ID는 tool output이나 injected context 안에서 근거를 일관되게 가리키는 ID입니다. Source locator는 문서 내부 위치입니다. Claude citations 문서는 PDF에는 page range, plain text에는 character index range 같은 locator를 사용할 수 있다고 설명합니다.

ID와 locator가 없으면 모델은 citation을 만들 때 불안정한 정보를 사용하거나 invent할 수 있습니다. 그래서 retrieval tool output을 설계할 때는 단순히 본문 text만 넘기는 것이 아니라 source metadata를 함께 넘겨야 합니다. `sourceId`, `title`, `url`, `locator`, `text`가 함께 있어야 citation이 추적 가능합니다.

### 4. Prompt가 citation behavior를 지시합니다

Prompt Engineering 강의에서 본 것처럼 citation behavior는 prompt의 일부여야 합니다. 모델에게 어떤 source만 cite할지, punctuation 뒤에 citation을 둘지, paragraph 끝에 둘지, support가 없는 claim은 어떻게 처리할지 알려야 합니다. OpenAI citation formatting 문서는 citations를 sentence나 paragraph 뒤에 두고 punctuation 뒤에 배치하라고 설명합니다.

이 지시가 없으면 citation이 불규칙해집니다. 어떤 답변은 문장마다 링크를 붙이고, 어떤 답변은 마지막에 목록만 붙이고, 어떤 답변은 source ID를 만들어냅니다. Grounding 시스템에서는 citation format도 contract입니다.

### 5. Citation은 bibliography와 다릅니다

Bibliography는 참고한 문서 목록입니다. Citation은 특정 claim이 어떤 citable unit에 의해 support되는지 표시합니다. 이 차이가 흐려지면 사용자는 답변 전체가 목록의 모든 문서로 support된다고 착각할 수 있습니다. 그러나 실제로는 어떤 문장은 첫 문서의 한 문단으로 support되고, 어떤 문장은 근거가 없을 수 있습니다.

따라서 reference lesson이나 technical answer에서는 "더 읽기" 목록과 claim-level citation을 구분해야 합니다. 더 읽기 목록은 학습 경로이고, citation은 검증 경로입니다. 둘 다 중요하지만 목적이 다릅니다.

### 6. Evidence missing behavior를 정합니다

근거가 부족할 때의 행동은 grounding의 일부입니다. OpenAI prompt guidance는 absence of evidence가 자동으로 factual no가 되어서는 안 된다고 설명합니다. 즉 검색 결과에 없다고 해서 "그렇지 않다"고 단정하면 안 됩니다. 현재 evidence 안에서 확인되지 않음, 추가 확인 필요, 답변 제한 같은 상태를 표현해야 합니다.

이 규칙은 환각을 줄이는 데 직접 연결됩니다. 모델이 답을 완성하려는 압력을 받으면 근거 없는 claim을 만들 수 있습니다. evidence missing behavior가 있으면 모델은 근거가 없는 상태를 답변의 일부로 드러낼 수 있습니다.

### 7. Verification은 citation 위에서 다시 수행됩니다

Citation이 있다고 검증이 끝나는 것은 아닙니다. Citation은 위치를 보여주고, verification은 claim이 그 source를 정확히 대표하는지 확인합니다. Claude hallucination guardrail 문서는 claim을 생성한 뒤 supporting quote를 찾아 검증하고 없으면 retract하게 할 수 있다고 설명합니다. 따라서 grounding은 verification의 입력입니다.

이 관계를 이해하면 citation의 역할이 선명해집니다. Citation은 "검증할 수 있게 만드는 장치"이지, "자동으로 참인 문장"을 보장하는 장치가 아닙니다. claim이 source를 selective하게 해석하거나 과장하면 citation이 있어도 품질 문제가 남습니다.

## 스펙과 세부

### Citable unit precision

OpenAI 문서는 line-level, paragraph-level, document-level 같은 citable unit을 use case의 precision에 맞게 고르라고 설명합니다. 레퍼런스형 강의에서는 문단 단위가 적절할 수 있고, 코드 변경 검토에서는 파일 line range가 더 필요할 수 있습니다. 중요한 것은 precision과 관리 비용의 균형입니다.

### Retrieved context pattern

OpenAI citation formatting 문서는 retrieved tool context와 injected context 두 가지 citation pattern을 예시로 제시한다고 KB가 정리합니다. retrieved context pattern에서는 검색 도구가 citable units를 반환하고, 모델은 그 returned context 안의 source만 cite합니다. 이 구조에서는 tool output schema가 citation 품질을 크게 좌우합니다.

### Injected context pattern

Injected context는 애플리케이션이 모델 입력에 citable blocks를 직접 넣는 방식으로 이해할 수 있습니다. 이때도 stable source ID와 locator가 필요합니다. source ID가 안정적이고 locator가 분명해야 모델이 응답에서 정확한 reference를 만들 수 있습니다.

### 실행 가능한 예시: citable block과 grounded claim

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

const block: CitableBlock = {
  id: "openai-citation-formatting-1",
  sourceTitle: "Citation Formatting",
  url: "https://developers.openai.com/api/docs/guides/citation-formatting",
  locator: "paragraph: citation-rules",
  text: "Cite only retrieved sources.",
}

const claim: GroundedClaim = {
  claim: "Citation should use only sources returned in context.",
  citations: [{ id: block.id, locator: block.locator }],
}

console.log(`${claim.claim} [${claim.citations[0].id}]`)
```

이 코드는 실제 retrieval tool이 아니라 grounding 데이터 구조를 보여줍니다. 중요한 점은 citation이 free-form text가 아니라 `id`와 `locator`를 가진다는 것입니다. 모델에게 이런 구조를 제공하면 invented source ID를 줄이고 검증 가능한 출력을 만들 수 있습니다.

### Citation placement

OpenAI 문서는 citations를 sentence나 paragraph 뒤에 두고 punctuation 뒤에 배치하라고 설명합니다. 이 규칙은 작은 formatting 문제처럼 보이지만, 사용자가 어떤 문장이 어떤 source에 의해 support되는지 읽는 데 영향을 줍니다. Citation 위치가 뒤섞이면 support 범위가 불명확해집니다.

## 원문으로 읽기

> "citation behavior should be part of the prompt"
>
> — citation 행동은 prompt의 일부여야 한다.
> [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)

이 문장은 grounding이 출력 후처리가 아니라 prompt 단계에서 시작된다는 점을 말합니다. 모델에게 어떤 주장을 cite할지, 어떤 source만 사용할지, 근거가 없을 때 어떻게 행동할지 알려주지 않으면 citation은 일관된 검증 장치가 되기 어렵습니다.

> "Define what needs support"
>
> — 무엇이 support를 필요로 하는지 정의하라.
> [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)

이 인용은 citation 남용과 citation 누락을 동시에 막습니다. 모든 문장에 무작정 citation을 붙이는 것이 아니라, 근거가 필요한 claim을 먼저 정의해야 합니다. 정의, 수치, 버전, 공식 권장 사항처럼 support가 필요한 claim이 무엇인지 prompt에 들어가야 합니다.

> "Cite only retrieved sources"
>
> — 검색되어 제공된 출처만 인용하라.
> [Citation Formatting — OpenAI API Docs](https://developers.openai.com/api/docs/guides/citation-formatting)

이 문장은 citation hallucination을 막는 가장 직접적인 규칙입니다. 모델이 context에 없는 source ID나 locator를 만들어내면 사용자는 검증할 수 없는 citation을 보게 됩니다. 따라서 retrieval output에 있는 source만 cite하도록 제한해야 합니다.

관련 원문(링크): [Citations — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/citations)

이 인용은 citation을 단순 URL 목록과 구분하게 해줍니다. 좋은 citation은 "이 문서 어딘가"가 아니라 문서 내부의 특정 위치를 가리킵니다. PDF page range, text character range 같은 locator는 사용자가 claim을 다시 확인하게 만드는 핵심 정보입니다.

관련 원문(링크): [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

이 문장은 citation과 verification의 연결을 보여줍니다. Citation은 답변을 멋지게 보이게 하는 장식이 아니라 claim을 audit할 수 있게 만드는 구조입니다. 다만 citation 자체가 자동으로 정답을 보장하지 않으므로, claim이 source를 정확히 대표하는지 확인해야 합니다.

## 실전에서

### 패턴 1: 검색 결과를 citable block으로 반환합니다

검색 도구나 RAG 시스템을 만들 때는 단순히 텍스트 조각만 반환하지 않습니다. `sourceId`, `title`, `url`, `locator`, `text`를 함께 제공합니다. 모델에게는 "이 sourceId만 citation에 사용하라"고 지시합니다. 이렇게 하면 citation output이 애플리케이션의 실제 source registry와 연결됩니다.

### 패턴 2: 강의 작성에서는 Quote Bank와 claim을 연결합니다

교육 콘텐츠에서는 공식 문서 인용을 Quote Bank에서만 가져오게 할 수 있습니다. 이 방식은 강의 작성자가 새 사실을 임의로 추가하지 못하게 하고, 사용자가 원문 링크를 따라갈 수 있게 합니다. 강의 문장이 KB 외 사실을 포함하면 grounding이 깨지므로, 작성 단계에서 중단하거나 KB 보강으로 돌아가야 합니다.

### 패턴 3: "근거 없음"을 출력 가능한 상태로 둡니다

근거가 없을 때 답변이 실패한 것처럼 숨기면 모델은 단정적으로 보이는 문장을 만들 수 있습니다. 대신 출력 형식에 "근거 없음", "추가 확인 필요", "현재 evidence로는 확인 불가" 같은 상태를 둡니다. 이는 absence of evidence를 factual no로 처리하지 말라는 OpenAI prompt guidance와 맞습니다.

### 패턴 4: Citation을 검증 루틴의 입력으로 씁니다

답변 생성 후에는 citation 링크 개수만 세지 않습니다. 각 claim을 source text와 비교합니다. source가 claim을 직접 support하는지, 범위를 과장하지 않았는지, 다른 문서의 내용을 섞지 않았는지 봅니다. Claude hallucination guardrail의 "supporting quote를 찾아 검증하고 없으면 retract"하는 사고와 연결됩니다.

## 한계와 트레이드오프

첫 번째 한계는 citation이 정확성을 자동 보장하지 않는다는 점입니다. Citation은 source 위치를 보여주지만, claim이 source를 정확히 대표하는지는 별도 verification이 필요합니다. 잘못된 해석, 선택적 인용, 과도한 일반화는 citation이 있어도 발생할 수 있습니다.

두 번째 한계는 locator precision과 관리 비용의 균형입니다. line-level locator는 정확하지만 준비와 유지가 어렵습니다. document-level citation은 쉽지만 검증이 느슨합니다. use case의 precision에 맞게 citable unit을 정해야 합니다.

세 번째 한계는 source registry 품질입니다. source ID가 안정적이지 않거나 locator가 부정확하면 모델이 올바른 citation을 만들기 어렵습니다. Grounding은 모델 prompt만의 문제가 아니라 tool output과 데이터 구조의 문제입니다.

네 번째 한계는 evidence missing behavior를 설계하지 않으면 grounding이 단정으로 바뀐다는 점입니다. 검색 결과가 없다는 이유로 "사실이 아니다"라고 답하면 위험합니다. 현재 context에서 확인되지 않았다는 상태를 유지해야 합니다.

다섯 번째 한계는 citation 과잉입니다. 너무 많은 citation은 읽기를 방해하고 support 범위를 흐릴 수 있습니다. 필요한 claim에 정확히 붙이는 편이 더 좋습니다. ==좋은 citation은 많아서 좋은 것이 아니라, claim과 evidence의 연결이 선명해서 좋습니다.==

## 더 읽기

먼저 OpenAI Prompt guidance 문서에서 grounded answer의 citation behavior와 evidence missing behavior를 읽으세요. 그 다음 OpenAI Citation Formatting 문서에서 retrieved context, injected context, citable unit, source ID invent 금지 규칙을 보세요. Claude Citations 문서는 citation이 source document의 specific locations를 reference한다는 점을 이해하는 데 좋습니다. 마지막으로 Claude Reduce hallucinations 문서에서 citation이 verification 루틴과 어떻게 연결되는지 확인하세요.

- [Prompt guidance — OpenAI API Docs](https://developers.openai.com/api/docs/guides/prompt-guidance)
- [Citation Formatting — OpenAI API Docs](https://developers.openai.com/api/docs/guides/citation-formatting)
- [Citations — Claude Docs](https://platform.claude.com/docs/en/build-with-claude/citations)
- [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

읽을 때는 네 질문을 기준으로 보세요. 무엇이 support를 필요로 하는가, evidence는 어떤 citable unit으로 제공되는가, citation은 어떤 stable source ID와 locator를 쓰는가, 근거가 없을 때 답변은 어떤 상태를 표시하는가. 이 네 질문에 답할 수 있으면 citation은 링크 목록이 아니라 검증 가능한 구조가 됩니다.
