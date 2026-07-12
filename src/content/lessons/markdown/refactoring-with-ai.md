## 한 줄 정의

AI와 리팩터링하기는 외부에서 관찰되는 동작을 바꾸지 않으면서 코드의 내부 구조를 개선하는 작업을, AI 도구가 만든 변경에 규율로 적용하는 일입니다. Martin Fowler는 리팩터링을 명사로 "a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior"라고 정의합니다. 여기서 핵심은 마지막 구절, ==관찰 가능한 동작을 바꾸지 않는다==는 조건입니다. AI에게 "이 코드 정리해줘"라고 하면 구조 개선과 동작 변경이 한 diff에 뒤섞이기 쉬운데, 이 조건이 그 둘을 가르는 기준선이 됩니다.

refactoring.com은 리팩터링의 핵심이 "a series of small behavior preserving transformations"라고 설명합니다. 즉 리팩터링은 한 번의 거대한 재작성이 아니라 작은 변환의 연속입니다. AI는 한 번에 넓은 범위를 바꿀 수 있지만, 그 넓은 diff를 사람이 검증하기는 어렵습니다. 이 강의는 AI의 속도를 살리면서도 "동작 보존"과 "작은 단계"라는 두 원칙으로 검증 가능성을 지키는 방법을 다룹니다.

![AI와 리팩터링하기: 큰 재작성 요청을 작은 동작 보존 단계로 나누고 각 단계를 검증하는 흐름](/lesson-diagrams/refactoring-with-ai/refactoring-loop.svg)

## 왜 존재하는가

리팩터링은 원래 사람이 손으로 하던 규율이었습니다. refactoring.com은 그 안전성의 근거를 "Since each refactoring is small, it's less likely to go wrong"이라고 설명합니다. 작게 나눌수록 각 단계에서 잘못될 여지가 줄고, 문제가 생겨도 원인 범위가 좁습니다. 사람은 자연스럽게 한 번에 조금씩 바꿨기 때문에 이 원칙이 암묵적으로 지켜졌습니다.

AI 코딩 도구는 이 균형을 흔듭니다. "리팩터링해줘" 한 마디에 수십 개 파일에 걸친 diff가 즉시 나옵니다. 변경 속도는 빨라졌지만 production failure의 비용은 그대로입니다. 오히려 넓은 diff는 순수 구조 개선인지, 그 안에 몰래 동작 변경이 섞였는지 사람이 구분하기 어렵게 만듭니다. ==속도가 빨라졌기 때문에 동작 보존이라는 원칙이 덜 중요해진 것이 아니라, 더 중요해졌습니다==.

그래서 이 강의가 존재합니다. Fowler의 정의를 기준선으로 삼으면 판단이 단순해집니다. 관찰 가능한 동작이 바뀌었다면 그것은 리팩터링이 아니라 기능 변경이고, 다른 검증이 필요합니다. AI에게 작은 단계로 나누고 각 단계 후 시스템이 동작하는지 확인하도록 요구하면, 넓고 불투명한 diff 대신 작고 검증 가능한 변경의 연속을 얻습니다.

## 작동 원리

### 리팩터링의 경계는 동작 보존이다

리팩터링인지 아닌지를 가르는 유일한 기준은 관찰 가능한 동작입니다. Fowler의 동사 정의는 "to restructure software by applying a series of refactorings without changing its observable behavior"입니다. 함수 이름을 바꾸고, 중복을 없애고, 큰 함수를 쪼개는 것은 사용자가 보는 동작을 바꾸지 않으므로 리팩터링입니다. 반대로 응답 형식을 바꾸거나, 조건을 추가하거나, 기본값을 바꾸면 동작이 달라지므로 리팩터링이 아닙니다.

AI 변경을 받았을 때 첫 질문은 "코드가 깔끔해졌는가"가 아니라 "관찰 가능한 동작이 그대로인가"입니다. 이 질문이 리뷰의 방향을 정합니다.

### 큰 뭉치 대신 작은 변환의 연속을 요구한다

리팩터링의 핵심은 "a series of small behavior preserving transformations"입니다. AI에게 "이 모듈 전체를 다시 써줘"라고 하면 검증 불가능한 큰 diff가 나옵니다. 대신 "함수를 추출하고, 이름을 명확히 하고, 중복을 제거하라 — 각 단계를 별도로"라고 요구하면 작은 변환의 연속이 됩니다.

작은 단계는 두 가지를 줍니다. 첫째, 각 단계가 무엇을 바꾸는지 사람이 읽을 수 있습니다. 둘째, 문제가 생기면 어느 단계에서 생겼는지 좁혀집니다.

### 각 단계 후 시스템은 계속 동작해야 한다

refactoring.com은 "The system is kept fully working after each refactoring, reducing the chances that a system can get seriously broken during the restructuring"이라고 설명합니다. 즉 중간 상태도 깨지면 안 됩니다. AI가 리팩터링을 여러 단계로 나눴다면, 각 단계 후 빌드가 되고 테스트가 통과하는지 확인해야 합니다.

이 원칙은 "일단 다 갈아엎고 나중에 고치자"를 금지합니다. 각 단계가 그 자체로 완결되고 동작하는 상태여야, 언제 멈춰도 안전합니다.

### 동작 보존은 주장이 아니라 검증이다

AI가 "동작은 그대로입니다"라고 말해도 그것은 주장일 뿐입니다. refactoring.com은 자동 도구 없이 리팩터링할 때 "frequent testing to detect mistakes"가 필요하다고 설명합니다. 각 단계 후 테스트를 돌리거나, before/after 실행 결과를 비교하는 것이 동작 보존의 증거입니다. 증거가 없으면 "동작 보존"은 검증되지 않은 가정입니다.

## 스펙과 세부

### 리팩터링과 기능 변경을 분리한다

가장 흔한 실패는 구조 개선과 기능 변경을 한 커밋에 섞는 것입니다. 이러면 리뷰어가 "이 줄은 순수 정리인가, 동작을 바꾸는가"를 매 줄마다 판단해야 합니다. Fowler의 정의가 리팩터링을 구조 개선으로 한정하는 이유가 여기 있습니다. AI에게 "리팩터링과 기능 변경을 같은 커밋에 섞지 말라"고 요구하면, 리팩터링 커밋은 테스트만 통과하면 되고 기능 커밋은 별도로 검증하면 됩니다.

### 테스트가 안전망이다

작은 단계라도 사람이 모든 동작을 눈으로 확인할 수는 없습니다. 자동 테스트가 있으면 각 단계 후 테스트를 돌려 동작 보존을 기계적으로 확인할 수 있습니다. 테스트가 없는 코드를 리팩터링해야 한다면, 먼저 현재 동작을 고정하는 테스트(characterization test)를 추가한 뒤 리팩터링하는 것이 안전합니다.

### AI에게 계획을 먼저 요구한다

넓은 리팩터링일수록 AI에게 diff를 바로 만들게 하지 말고, 먼저 "어떤 작은 단계로 나눌 것인지" 계획을 요구합니다. 계획을 보면 어느 단계가 순수 구조 변경이고 어느 단계가 동작에 영향을 줄 위험이 있는지 미리 판단할 수 있습니다. 계획 단계에서 scope를 좁히는 것이 diff를 받은 뒤 되돌리는 것보다 쌉니다.

## 원문으로 읽기

> "a change made to the internal structure of software to make it easier to understand and cheaper to modify without changing its observable behavior [...]"
>
> — 소프트웨어를 이해하기 쉽고 수정 비용이 싸게 만들되, 관찰 가능한 동작은 바꾸지 않는 내부 구조 변경.
> [Martin Fowler — Definition of Refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html)

이 명사 정의는 리팩터링의 목적(이해와 수정 비용 개선)과 경계(동작 보존)를 한 문장에 담습니다. AI 변경이 이 정의에 맞는지 물으면 리뷰의 기준선이 생깁니다.

> "to restructure software by applying a series of refactorings without changing its observable behavior"
>
> — 작은 리팩터링을 연속으로 적용해 소프트웨어를 재구조화하되, 관찰 가능한 동작은 바꾸지 않는 것.
> [Martin Fowler — Definition of Refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html)

동사 정의는 리팩터링이 한 번의 작업이 아니라 작은 리팩터링의 연속임을 강조합니다. AI에게 큰 재작성 대신 단계로 나누도록 요구하는 근거입니다.

> "Its heart is a series of small behavior preserving transformations."
>
> — 그 핵심은 동작을 보존하는 작은 변환의 연속이다.
> [refactoring.com](https://refactoring.com/)

리팩터링의 본질이 "작음"과 "동작 보존"이라는 두 성질에 있음을 보여줍니다. 이 두 성질이 검증 가능성의 원천입니다.

관련 원문(링크): [refactoring.com](https://refactoring.com/)

왜 작게 나눠야 하는지를 설명합니다. AI가 만드는 넓은 diff의 위험이 정확히 이 문장의 반대입니다.

관련 원문(링크): [refactoring.com](https://refactoring.com/)

중간 상태도 동작해야 한다는 원칙입니다. AI가 나눈 각 단계가 그 자체로 완결되고 동작하는지 확인해야 합니다.

## 실전에서

### 리팩터링과 기능 변경을 분리해 요청한다

AI에게 지시할 때 "동작은 그대로 두고 구조만 개선하라. 새 기능이나 버그 수정은 별도 커밋으로 하라"고 명시합니다. 그러면 리팩터링 커밋은 "테스트가 여전히 통과하는가"만 확인하면 되고, 리뷰 부담이 크게 줄어듭니다.

### 큰 요청을 단계 계획으로 바꾼다

"이 파일 리팩터링해줘" 대신 "어떤 작은 단계로 나눌지 먼저 제안하라"고 요구합니다. 계획을 검토해 동작에 영향을 줄 위험이 있는 단계를 미리 표시하고, 순수 구조 단계부터 진행합니다.

### 각 단계 후 검증 증거를 확인한다

단계마다 테스트를 돌리거나 실행 결과를 비교합니다. AI가 "동작이 그대로다"라고 하면 그 근거로 테스트 통과 로그나 before/after 실행 비교를 요구합니다. 증거 없는 "동작 보존"은 받아들이지 않습니다.

### 테스트가 없으면 먼저 만든다

리팩터링할 코드에 테스트가 없다면, 현재 동작을 고정하는 테스트를 먼저 추가합니다. 그래야 리팩터링 후 동작이 바뀌었는지 기계적으로 확인할 수 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 "관찰 가능한 동작"의 경계가 항상 명확하지는 않다는 점입니다. 성능, 로그 형식, 오류 메시지처럼 사용자가 직접 보지 않지만 다른 시스템이 의존하는 동작이 있습니다. 리팩터링이 이런 숨은 계약을 바꾸지 않는지도 확인해야 합니다.

두 번째 trade-off는 속도와 검증의 균형입니다. AI에게 큰 diff를 한 번에 받으면 빠르지만 검증이 어렵고, 작은 단계로 나누면 검증은 쉽지만 상호작용이 늘어납니다. 변경의 위험도에 따라 이 균형을 조절해야 합니다 — 위험이 낮은 코드는 큰 단계로, 민감한 코드는 더 잘게.

세 번째 한계는 테스트 자체의 불완전성입니다. 테스트가 통과해도 테스트되지 않은 동작은 바뀌었을 수 있습니다. "테스트 통과"는 동작 보존의 강한 신호이지 완전한 증명은 아닙니다. 민감한 리팩터링은 테스트 외에 manual scenario 확인이 필요할 수 있습니다.

네 번째 한계는 AI 출력에 대한 편향입니다. AI가 만들었다는 이유만으로 무조건 의심하면 생산성이 떨어지고, AI가 "동작 보존"이라 했다는 이유만으로 믿으면 품질이 떨어집니다. 기준은 작성자가 아니라 변경의 성격과 검증 증거입니다.

## 더 읽기

이 강의의 근거 KB는 `refactoring-with-ai`입니다. 먼저 Martin Fowler의 Definition of Refactoring을 읽고 명사·동사 정의와 "observable behavior" 조건을 확인하세요. 그 다음 refactoring.com에서 "small behavior preserving transformations", 각 단계의 안전성, 항상 동작하는 시스템 원칙을 봅니다. 이 두 출처가 이 강의의 모든 인용의 원문입니다.

선행 강의로 `code-change-risk-analysis`를 읽으면 리팩터링 diff도 변경 위험 분석의 대상임을 이해할 수 있고, `hallucination-and-verification`은 "동작 보존"을 주장이 아니라 검증 증거로 다루는 관점을 줍니다. 다음 학습 순서는 `reviewing-ai-output`입니다 — 리팩터링 결과물을 포함해 AI가 만든 모든 변경을 동작 보존과 검증 증거 기준으로 리뷰하는 능력으로 이어집니다.
