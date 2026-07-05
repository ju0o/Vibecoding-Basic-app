## 한 줄 정의

AI 학습 검증은 AI가 설명하거나 생성한 내용을 근거, 인용, 실행 결과, 평가 기준, 사람 검토로 확인하면서 배우는 절차입니다. AI와 함께 배우는 시대에는 "AI가 말했다"가 이해의 끝이 아닙니다. Claude 문서는 hallucination을 사실과 다르거나 제공된 context와 일치하지 않는 응답으로 설명하고, OpenAI citation formatting 문서는 cited text를 직접 support하는 retrieved source만 cite해야 한다고 설명합니다. 따라서 학습자는 답변의 자연스러운 문체가 아니라 ==주장과 근거의 연결==을 읽어야 합니다.

이 강의에서 검증은 부정적인 의심만을 뜻하지 않습니다. 검증은 이해를 만드는 방법입니다. AI에게 설명을 듣고, 핵심 claim을 나누고, direct quote를 요구하고, citation이 실제로 그 문장을 support하는지 보고, 코드라면 실행과 human review를 붙이고, 반복되는 주제라면 structured tests로 평가합니다. 이 과정을 거치면 AI는 단순 정답 생성기가 아니라 학습 대화의 재료가 됩니다.

AI 학습 검증은 바이브코딩의 안전 장치이기도 합니다. 앞 강의에서 본 것처럼 AI가 코드를 빠르게 생성하면 사람은 더 자주 "돌아간다"와 "검토되었다"를 구분해야 합니다. OpenAI safety best practices는 code generation에서 human review가 특히 중요하다고 설명합니다. 학습자는 이 원칙을 작은 습관으로 바꿔야 합니다. 출처가 있는가, 출처가 직접 뒷받침하는가, 실행했는가, 사람이 읽었는가, 반복 평가 기준이 있는가를 묻는 습관입니다.

![AI 학습 검증 루프](/lesson-diagrams/learning-with-ai-verification/verification-loop.svg)

## 왜 존재하는가

AI는 빠르고 자연스럽게 설명합니다. 이 장점 때문에 학습자는 어려운 개념을 더 쉽게 물어볼 수 있습니다. 그러나 자연스러운 설명은 사실성과 같지 않습니다. Claude 문서가 말하는 hallucination은 factual 또는 context mismatch입니다. 즉 답변이 매끄럽고 자신감 있어 보여도 원문이나 제공된 자료와 맞지 않을 수 있습니다. AI 학습 검증은 이 문제를 해결하기 위해 존재합니다.

두 번째 문제는 출처처럼 보이는 것의 위험입니다. OpenAI citation formatting은 source IDs, line ranges, block locators를 invent하지 말라고 설명합니다. AI가 링크나 출처명을 붙였다고 해서 검증이 끝난 것이 아닙니다. 그 source가 실제로 해당 문장을 직접 support하는지 확인해야 합니다. citation은 장식이 아니라 claim과 source 사이의 책임 연결입니다.

세 번째 문제는 코드 생성입니다. AI가 코드를 만들면 학습자는 "실행된다"는 사실에 쉽게 안심합니다. 그러나 OpenAI safety best practices는 code generation에서 human review가 특히 중요하다고 설명합니다. 실행 성공은 한 종류의 신호일 뿐입니다. 코드가 요구사항을 맞췄는지, 위험한 변경을 만들지 않았는지, 다른 파일과 충돌하지 않는지, 테스트가 충분한지 따로 봐야 합니다.

네 번째 문제는 한 번의 성공이 반복 품질을 보장하지 않는다는 점입니다. OpenAI evaluation best practices는 evals를 model performance를 측정하는 structured tests로 설명합니다. AI 답변은 변동성이 있을 수 있으므로, 학습자가 같은 유형의 문제를 반복해서 확인하려면 구조화된 평가 기준이 필요합니다. 이것은 나중에 AI 시스템 평가와 hallucination verification으로 이어집니다.

> [!KEY]
> AI 학습 검증은 AI를 불신하는 태도가 아니라, AI의 출력을 학습 가능한 근거와 실행 가능한 증거로 바꾸는 절차입니다.

## 작동 원리

### 1. 먼저 claim을 나눕니다

AI 답변은 보통 여러 문장을 한 번에 제시합니다. 검증의 첫 단계는 그 문장을 claim 단위로 나누는 것입니다. "React는 컴포넌트 기반이다", "이 오류는 경로 문제다", "이 함수는 파일을 읽는다"처럼 확인 가능한 문장으로 쪼갭니다. claim을 나누지 않으면 출처 링크가 어느 문장을 뒷받침하는지 알 수 없습니다.

이 단계에서 중요한 것은 모든 문장을 같은 강도로 검증하지 않는 것입니다. 핵심 개념 정의, 코드 실행 방식, 보안·배포·데이터 관련 주장, 현재 버전이나 정책처럼 바뀔 수 있는 정보는 더 강하게 검증해야 합니다. 반대로 단순한 문장 연결이나 학습자의 이해를 돕는 일반 설명은 핵심 claim을 보조하는 역할로 볼 수 있습니다.

### 2. 불확실성을 허용합니다

Claude 문서는 "I don't know"를 허용하는 것이 false information을 줄일 수 있다고 제시합니다. 학습에서 이것은 매우 중요합니다. AI가 모르는 것을 억지로 답하도록 만들면 학습자는 그럴듯한 오류를 배울 수 있습니다. 좋은 학습 프롬프트는 "근거가 부족하면 모른다고 말해라", "추가 확인이 필요한 항목을 분리해라"처럼 불확실성을 허용합니다.

불확실성 허용은 답변을 약하게 만드는 것이 아닙니다. 오히려 답변의 경계를 선명하게 만듭니다. "확인된 것", "추론한 것", "추가 확인이 필요한 것"을 나누면 학습자는 무엇을 믿어도 되는지 알 수 있습니다. AI가 자신 있게 틀리는 것보다, 확인 범위를 정확히 말하는 것이 더 좋은 학습 도구입니다.

### 3. 직접 인용으로 사실 기반을 만듭니다

Claude 문서는 factual grounding을 위해 direct quotes를 사용하라고 설명합니다. Direct quote는 원문이 실제로 무엇을 말하는지 보여주는 가장 작은 단위입니다. AI에게 "출처를 달아줘"라고만 하면 요약과 해석이 섞일 수 있습니다. "원문에서 해당 문장을 직접 인용해줘"라고 요구하면 claim과 source의 거리가 줄어듭니다.

이 강의 사이트의 V2 형식도 같은 원리를 사용합니다. 각 강의는 KB Quote Bank에서 원문 인용을 가져오고, 한국어 번역과 해설을 붙입니다. 인용은 장식이 아니라 독자가 원문을 읽을 수 있게 하는 다리입니다. ==좋은 검증은 링크 개수를 세는 것이 아니라, 인용된 문장이 claim을 실제로 떠받치는지 보는 일입니다.==

### 4. Citation이 직접 support하는지 확인합니다

OpenAI citation formatting은 retrieved sources가 cited response text를 directly support해야 한다고 설명합니다. 직접 support한다는 것은 출처가 주장을 애매하게 둘러싼 배경이 아니라, 그 문장의 핵심 의미를 실제로 뒷받침한다는 뜻입니다. 예를 들어 "evals는 structured tests다"라는 claim에는 OpenAI evaluation best practices의 해당 설명이 직접 연결되어야 합니다.

이 단계에서 invented locator를 조심해야 합니다. OpenAI 문서는 source IDs와 locators를 invent하지 말라고 설명합니다. AI가 존재하지 않는 줄 번호, 블록 ID, 문서 위치를 만들어내면 citation처럼 보여도 검증을 방해합니다. 따라서 출처 ID와 위치는 실제 retrieved context에 있는 것만 사용해야 합니다.

### 5. 코드에는 실행과 human review를 붙입니다

설명 검증이 인용과 출처 중심이라면, 코드 검증은 실행과 review가 필요합니다. OpenAI safety best practices는 출력이 실제 사용되기 전에 사람이 review하는 것을 권장하고, code generation에서 특히 중요하다고 설명합니다. AI가 만든 코드는 diff를 읽고, 테스트를 실행하고, 요구사항과 맞는지 확인해야 합니다.

여기서 human review는 막연한 "사람이 봤다"가 아닙니다. 사람이 어떤 파일이 바뀌었는지, 어떤 동작이 달라졌는지, 어떤 위험이 있는지, 테스트 결과가 무엇인지 확인하는 절차입니다. AI가 테스트를 실행해도 사람은 테스트가 충분한지 판단해야 합니다. 실행 로그는 증거이고, review는 판단입니다.

### 6. 반복 주제에는 structured tests를 둡니다

OpenAI evaluation best practices는 evals를 model performance를 측정하는 structured tests로 설명합니다. 학습에서도 같은 관점을 작게 적용할 수 있습니다. 예를 들어 "AI에게 출처가 필요한 설명을 쓰게 한다"는 훈련을 한다면, 매번 답변을 보고 direct quote가 있는지, citation이 직접 support하는지, invented source가 없는지 체크할 수 있습니다.

이것은 거대한 평가 플랫폼을 만들라는 뜻이 아닙니다. 작은 체크리스트도 structured test가 될 수 있습니다. 중요한 것은 같은 기준을 반복 적용하는 것입니다. 한 번 좋은 답변이 나왔다고 프롬프트가 완성된 것이 아니라, 여러 사례에서 같은 기준을 통과하는지 봐야 합니다.

### 7. 검증 결과를 다음 프롬프트에 반영합니다

검증은 마지막에 한 번 붙이는 검수표가 아닙니다. 검증에서 발견한 실패는 다음 프롬프트의 evidence rule, citation behavior, uncertainty behavior, output format에 반영되어야 합니다. 예를 들어 AI가 출처를 만들어냈다면 "source ID를 invent하지 말고 제공된 source만 사용하라"는 규칙을 넣습니다. AI가 모르는 내용을 단정했다면 "근거가 없으면 모른다고 말하라"는 규칙을 넣습니다.

이렇게 하면 학습자는 AI와 대화하면서 자신의 질문 품질도 함께 개선합니다. 검증은 답변을 평가하는 동시에, 다음 입력을 더 정확하게 만드는 feedback loop입니다.

> [!TIP]
> AI 답변을 읽을 때 바로 "맞다/틀리다"로 판단하지 말고, 확인됨, 근거 부족, 실행 필요, 사람 검토 필요로 먼저 분류하세요. 분류가 되면 다음 행동이 보입니다.

## 스펙과 세부

### Hallucination의 기준

KB는 Claude 문서를 근거로 hallucination을 사실과 다르거나 주어진 context와 일치하지 않는 응답으로 설명합니다. 이 기준은 학습 검증에서 중요합니다. AI 답변이 일반 지식과 맞는지뿐 아니라, 지금 제공된 문서와 맞는지도 봐야 합니다. 문서 기반 학습에서는 context mismatch도 오류입니다.

### Direct quote와 citation의 차이

Direct quote는 원문 문장을 그대로 보여주는 방식입니다. Citation은 답변 문장이 의존한 출처 위치를 표시하는 방식입니다. 둘은 함께 쓰일 수 있지만 같은 것은 아닙니다. Direct quote는 원문과 claim의 거리를 줄이고, citation은 claim과 source의 연결을 표시합니다. 좋은 학습 검증은 둘을 모두 사용합니다.

### Source ID와 locator를 만들지 않습니다

OpenAI citation formatting은 source IDs, line ranges, block locators를 invent하지 말라고 설명합니다. 학습자가 이 규칙을 모르면 AI가 만든 그럴듯한 위치 정보를 그대로 믿을 수 있습니다. 실제 문서에 없는 locator는 검증 가능성을 무너뜨립니다. 따라서 source locator는 문서가 제공한 범위에서만 사용해야 합니다.

### Eval은 구조화된 반복 확인입니다

OpenAI evaluation best practices는 evals를 model performance를 측정하는 structured tests로 설명합니다. 학습에서는 이를 작게 해석할 수 있습니다. 같은 질문 유형, 같은 검증 기준, 같은 판정 형식으로 반복 확인하면 AI와 자신의 이해가 개선되는지 볼 수 있습니다. 이것은 나중에 AI 시스템 평가 강의의 기초가 됩니다.

### 실행 가능한 검증 구조 예시

```ts
type ClaimCheck = {
  claim: string
  hasDirectQuote: boolean
  citationDirectlySupportsClaim: boolean
  inventedLocatorFound: boolean
}

type CodeCheck = {
  filesReviewed: string[]
  testsRun: string[]
  humanReviewed: boolean
}

function verdict(checks: ClaimCheck[], code?: CodeCheck): "pass" | "needs-review" {
  const unsupportedClaim = checks.some((check) => {
    return !check.hasDirectQuote || !check.citationDirectlySupportsClaim || check.inventedLocatorFound
  })

  if (unsupportedClaim) {
    return "needs-review"
  }

  if (code !== undefined && (!code.humanReviewed || code.testsRun.length === 0)) {
    return "needs-review"
  }

  return "pass"
}
```

이 예시는 실제 citation parser가 아닙니다. KB의 검증 원칙을 실행 가능한 TypeScript 구조로 표현한 것입니다. claim에는 direct quote와 direct support를 확인하고, code에는 tests와 human review를 확인합니다. 이 두 층을 분리하면 설명 검증과 코드 검증을 혼동하지 않게 됩니다.

## 원문으로 읽기

> "Allow Claude to say \"I don't know\""
>
> — Claude가 "모르겠습니다"라고 말할 수 있게 하라.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

이 문장은 학습 검증의 출발점입니다. AI에게 항상 답을 강요하면 false information이 생길 수 있습니다. 학습자는 모름을 실패가 아니라 정확한 상태 표현으로 받아들여야 합니다. 근거가 없을 때 모른다고 말하는 능력은 신뢰 가능한 학습 대화의 일부입니다.

> "Use direct quotes for factual grounding"
>
> — 사실 기반 grounding을 위해 직접 인용을 사용하라.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

이 인용은 "출처 링크만 달기"보다 한 단계 더 나아갑니다. 직접 인용은 원문이 실제로 무엇을 말하는지 보여줍니다. 학습자는 AI 요약을 바로 믿기보다 원문 quote를 보고, 그 quote가 설명과 어떻게 연결되는지 확인해야 합니다.

> "Verify with citations"
>
> — citation으로 검증하라.
> [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

Citation은 AI 답변의 claim이 어느 출처에 기대고 있는지 표시합니다. 그러나 citation이 있다는 사실만으로 충분하지 않습니다. 다음 OpenAI 인용처럼 citation은 cited text를 직접 support해야 합니다. 따라서 verification은 citation 생성과 citation 검토를 모두 포함합니다.

> "Never invent source IDs"
>
> — source ID를 절대 만들어내지 말라.
> [Citation Formatting — OpenAI](https://developers.openai.com/api/docs/guides/citation-formatting)

이 문장은 AI 학습자가 반드시 알아야 할 안전 규칙입니다. 존재하지 않는 source ID나 locator는 검증을 불가능하게 만듭니다. AI가 만들어낸 근거 표시는 근거가 아니라 오류입니다. 검증 가능한 출처만 사용해야 합니다.

> "Evals are structured tests"
>
> — eval은 구조화된 테스트다.
> [Evaluation best practices — OpenAI](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

이 인용은 반복 학습의 기준을 제공합니다. 한 번의 좋은 답변보다 같은 기준을 여러 사례에 적용하는 것이 중요합니다. AI 답변 품질, citation 정확도, 코드 검증 루틴을 structured tests처럼 다루면 학습이 감각이 아니라 절차가 됩니다.

> "human review outputs"
>
> — 출력물을 사람이 검토한다.
> [Safety best practices — OpenAI](https://developers.openai.com/api/docs/guides/safety-best-practices)

AI가 코드나 중요한 결정을 생성할 때 사람의 검토가 필요합니다. 이 원칙은 바이브코딩의 핵심 안전 장치입니다. AI가 실행까지 도와도 human review는 사라지지 않습니다. 오히려 AI가 더 많은 output을 만들수록 review의 기준이 더 중요해집니다.

## 실전에서

### 패턴 1: 설명을 받을 때 quote-first로 요청합니다

AI에게 "Context Engineering을 설명해줘"라고만 묻기보다 "핵심 claim 3개를 쓰고, 각 claim마다 원문 direct quote와 citation을 붙여줘. 근거가 없으면 모른다고 말해줘"라고 요청합니다. 이렇게 하면 설명이 곧바로 검증 가능한 형태에 가까워집니다. Claude의 direct quotes와 OpenAI의 citation support 규칙을 함께 쓰는 방식입니다.

### 패턴 2: citation audit을 합니다

답변에 citation이 있으면 링크를 열어 핵심 문장을 찾습니다. 출처가 답변 문장을 직접 support하는지 봅니다. source ID나 locator가 실제 문서에 없는지 확인합니다. 이 과정을 citation audit이라고 부를 수 있습니다. 링크 개수가 많아도 direct support가 없으면 좋은 답변이 아닙니다.

### 패턴 3: 코드 변경은 diff, 실행, review로 나눕니다

AI가 코드를 고쳤다면 먼저 어떤 파일이 바뀌었는지 봅니다. 그 다음 관련 명령이나 테스트를 실행합니다. 마지막으로 사람이 diff를 읽고 의도하지 않은 변경이 없는지 확인합니다. OpenAI safety best practices가 code generation human review를 강조하는 이유가 여기에 있습니다.

> [!EXAMPLE]
> AI가 버튼 컴포넌트를 수정했다면 "브라우저에서 버튼이 보인다"만 확인하지 않습니다. 변경 파일 목록, diff 내용, 실행한 테스트, 사람이 읽은 위험 지점을 함께 확인합니다.

### 패턴 4: 학습 노트를 claim 단위로 씁니다

AI 설명을 들은 뒤 학습 노트를 쓸 때 문단 전체를 복사하지 않습니다. claim, source, quote, 내 해설, 남은 의문으로 나눕니다. 이렇게 하면 나중에 다른 사람에게 설명할 때도 "이 부분은 어떤 원문에 근거한다"고 말할 수 있습니다.

### 패턴 5: 반복 질문에는 작은 eval set을 만듭니다

예를 들어 citation 연습을 한다면 서로 다른 주제의 질문 5개를 준비하고, AI 답변마다 direct quote, invented source 없음, direct support를 확인합니다. 이것은 OpenAI의 eval 개념을 학습용으로 작게 적용한 것입니다. 대규모 시스템이 없어도 structured tests의 사고방식은 쓸 수 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 검증 비용입니다. 모든 문장을 원문으로 확인하면 학습 속도가 느려집니다. 그래서 claim의 위험도와 중요도를 나누어야 합니다. 핵심 정의, 최신 정책, 코드 실행, 보안과 배포 관련 내용은 강하게 검증하고, 단순한 표현 보조는 낮은 강도로 볼 수 있습니다.

두 번째 한계는 direct quote가 이해를 대신하지 않는다는 점입니다. 원문을 인용해도 그 의미를 잘못 해석할 수 있습니다. 그래서 인용 뒤에는 해설이 필요합니다. 이 사이트의 V2 형식이 인용 직후 해설 문단을 요구하는 이유도 같습니다.

세 번째 한계는 citation이 항상 충분한 증거가 아니라는 점입니다. Citation은 claim과 source의 연결을 표시하지만, 코드가 실제로 동작하는지는 실행과 테스트로 확인해야 합니다. 설명 검증과 코드 검증은 서로 보완하지만 같은 절차가 아닙니다.

네 번째 한계는 human review의 품질 차이입니다. 사람이 봤다는 사실만으로 충분하지 않습니다. reviewer가 무엇을 봤는지, 어떤 기준으로 판단했는지, 어떤 증거에 접근했는지가 중요합니다. OpenAI safety best practices도 human reviewer가 output을 verify하는 데 필요한 정보에 접근해야 한다고 설명한다는 KB 내용을 갖고 있습니다.

다섯 번째 한계는 eval이 완전한 진실 판정이 아니라는 점입니다. OpenAI 문서가 evals를 structured tests로 설명한다는 것은 eval이 기준과 사례에 의존한다는 뜻입니다. 잘못 설계한 structured test는 중요한 실패를 놓칠 수 있습니다. 따라서 eval도 검증 대상입니다.

==검증은 AI 학습을 느리게 만드는 벌칙이 아니라, 빠른 설명을 오래 남는 이해로 바꾸는 변환 과정입니다.== 이 관점을 잡으면 AI는 답을 대신하는 존재가 아니라, 검증 가능한 학습 대화를 만드는 도구가 됩니다.

## 더 읽기

먼저 Claude Reduce hallucinations 문서를 읽어 hallucination, "I don't know", direct quotes, citations의 관계를 잡으세요. 그 다음 OpenAI Citation Formatting을 읽어 direct support와 invented source ID 금지 원칙을 확인하세요. OpenAI Evaluation best practices는 반복 평가를 structured tests로 보는 관점을 줍니다. 마지막으로 OpenAI Safety best practices를 읽어 code generation과 high-stakes domains에서 human review가 왜 중요한지 확인하세요.

- [Reduce hallucinations — Claude Docs](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [Citation Formatting — OpenAI](https://developers.openai.com/api/docs/guides/citation-formatting)
- [Evaluation best practices — OpenAI](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Safety best practices — OpenAI](https://developers.openai.com/api/docs/guides/safety-best-practices)

읽을 때는 다섯 질문을 기준으로 보세요. AI가 모른다고 말할 수 있는가. 핵심 claim에 direct quote가 있는가. citation이 cited text를 직접 support하는가. source ID나 locator가 실제로 존재하는가. 코드나 중요한 출력은 사람이 검토했는가. 이 다섯 질문이 습관이 되면, AI와 함께 배우는 속도와 정확도를 동시에 높일 수 있습니다.
