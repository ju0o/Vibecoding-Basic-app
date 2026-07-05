# 용어 초안: prompt-engineering-foundations

## Prompt Contract
- category: AI 시스템
- shortDefinition: 모델이 수행할 목표, 범위, 제약, 검증 기준, 출력 형식을 묶은 작업 계약
- explanation: Prompt Contract는 프롬프트를 부탁 문장으로 보지 않고 실행 조건과 성공 기준을 담은 계약으로 보는 관점입니다. 목표와 범위가 없으면 모델은 성공 기준을 추론하고, 근거 정책이 없으면 어떤 문장을 증거로 뒷받침해야 하는지 일관되게 판단하기 어렵습니다.
- related: ["Prompt Engineering", "Evidence Policy", "Output Format Control"]

## Evidence Policy
- category: AI 시스템
- shortDefinition: 어떤 주장에 근거가 필요한지와 근거가 없을 때 어떻게 행동할지 정한 규칙
- explanation: Evidence Policy는 grounded answer에서 citation behavior와 evidence missing behavior를 prompt 안에 명시하는 규칙입니다. 어떤 주장이 support를 필요로 하는지, 충분한 evidence란 무엇인지, 증거가 없을 때 모름 또는 추가 확인으로 남길지를 정합니다.
- related: ["Grounding", "Citation", "Verification"]

## Output Format Control
- category: AI 시스템
- shortDefinition: 모델 응답의 구조, 길이, 문체, 위치별 내용을 명시적으로 지정하는 방법
- explanation: Output Format Control은 원하는 결과를 모델이 추론하게 두지 않고 직접 지정하는 prompt 설계입니다. 금지문만 나열하기보다 무엇을 해야 하는지 긍정 지시로 쓰고, 필요한 경우 tag나 예시로 구조를 분리합니다.
- related: ["Prompt Contract", "XML Prompt Tags"]

## XML Prompt Tags
- category: AI 시스템
- shortDefinition: 프롬프트의 목표, 자료, 제약, 출력 형식을 XML 형태의 구획으로 나누는 구조화 방식
- explanation: XML Prompt Tags는 `<goal>`, `<scope>`, `<evidence>`, `<format>`처럼 입력 요소를 명확한 이름의 구획으로 분리하는 방식입니다. 긴 작업에서 모델이 어떤 부분을 지시, 자료, 형식으로 읽어야 하는지 구분하게 도와줍니다.
- related: ["Prompt Engineering", "Output Format Control", "Context Engineering"]

## Evidence Missing Behavior
- category: AI 시스템
- shortDefinition: 충분한 근거가 없을 때 모델이 답변을 제한하거나 모른다고 말하게 하는 규칙
- explanation: Evidence Missing Behavior는 검색 실패나 근거 부족을 사실 부정으로 오해하지 않게 만드는 guardrail입니다. 근거가 없으면 단정하지 않고 모름, 추가 확인 필요, 제한된 답변처럼 상태를 분리합니다.
- related: ["Evidence Policy", "Grounding", "Hallucination"]

