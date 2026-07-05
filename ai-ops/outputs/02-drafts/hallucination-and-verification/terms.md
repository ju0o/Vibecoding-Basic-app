# 용어 초안: hallucination-and-verification

## Hallucination
- category: AI 시스템
- shortDefinition: 모델 출력이 사실과 맞지 않거나 제공된 context와 일치하지 않는 상태
- explanation: Hallucination은 자연스럽고 자신감 있는 문장처럼 보여도 원문, 제공 context, 테스트 결과와 맞지 않는 output을 가리킵니다. 운영에서는 모델 버그 하나가 아니라 prompt, grounding, verification, evaluation으로 관리해야 하는 품질 위험입니다.
- related: ["Verification", "Grounding", "Citation"]

## Verification
- category: AI 시스템
- shortDefinition: AI 출력의 claim을 원문, citation, test, review 기준과 대조하는 절차
- explanation: Verification은 모델의 confidence가 아니라 claim을 support하는 evidence와 실행 결과를 기준으로 판단합니다. quote가 없으면 claim을 철회하고, 코드 변경은 테스트와 human review로 확인하는 식의 루틴을 포함합니다.
- related: ["Hallucination", "Claim Audit", "Evaluation Set"]

## Claim Audit
- category: AI 시스템
- shortDefinition: AI 출력의 문장을 claim 단위로 나누고 각 claim의 근거를 대조하는 검증 방식
- explanation: Claim Audit은 요약이나 설명을 문장 단위로 쪼개 supporting quote, source, test result가 있는지 확인합니다. citation 링크 개수만 세는 것이 아니라 cited claim을 source가 직접 support하는지 보는 것이 핵심입니다.
- related: ["Verification", "Citation", "Grounding"]

## Uncertainty Permission
- category: AI 시스템
- shortDefinition: 근거가 부족할 때 모델이 모른다고 말하거나 답변을 제한하도록 허용하는 규칙
- explanation: Uncertainty Permission은 근거 부족 상태에서 모델이 그럴듯한 단정을 만들지 않게 하는 기본 guardrail입니다. 충분한 evidence가 없으면 모름, 추가 확인 필요, 제한된 답변으로 상태를 분리합니다.
- related: ["Hallucination", "Evidence Missing Behavior", "Verification"]

## Evaluation Set
- category: AI 시스템
- shortDefinition: 자주 틀리는 질문과 edge case를 모아 반복적으로 품질을 측정하는 테스트 묶음
- explanation: Evaluation Set은 generative AI 출력의 variability와 nondeterminism을 관리하기 위한 반복 검증 자료입니다. prompt나 model을 바꿀 때 같은 사례를 다시 실행해 회귀를 확인할 수 있습니다.
- related: ["Verification", "AI System Evaluation", "Eval Run"]

