# 용어 초안: vibe-coding-origin-karpathy

## Vibe Coding
- category: AI 코딩
- shortDefinition: 자연어로 AI에게 코딩을 맡기고 결과를 보며 조정하는 개발 방식
- explanation: Vibe Coding은 AI에게 자연어로 만들 것을 말하고, AI가 생성한 코드나 변경 결과를 사람이 보며 다시 지시하는 작업 방식입니다. Karpathy 2025 맥락에서는 코드 자체를 깊게 읽지 않고 결과와 대화 흐름으로 진행하는 강한 뉘앙스가 있어, 빠른 prototype 가능성과 검증 없는 수용 위험을 함께 다루어야 합니다.
- related: ["Natural Language to Code", "AI-Assisted Steering", "Human Review"]

## Natural Language to Code
- category: AI 코딩
- shortDefinition: 사람이 자연어로 의도를 말하고 AI가 computer code로 변환하는 흐름
- explanation: Natural Language to Code는 Collins가 vibe coding을 설명할 때 쓴 핵심 방향입니다. 사용자는 함수명이나 문법보다 만들고 싶은 결과를 말하고, AI는 그 의도를 코드 변경으로 바꿉니다. 다만 자연어 입력이 검증을 대체하지는 않으므로 결과 코드에는 review와 test가 필요합니다.
- related: ["Vibe Coding", "Prompt Engineering", "Code Generation"]

## AI-Assisted Steering
- category: AI 코딩
- shortDefinition: 사람이 AI 생성 결과를 보며 다음 요청과 수정 방향을 조정하는 작업 방식
- explanation: AI-Assisted Steering은 사람이 모든 줄을 직접 쓰기보다 AI가 만든 결과, 오류 메시지, 화면 변화를 보고 다음 지시를 정하는 흐름입니다. Karpathy 사례의 error message 복사와 대화식 수정은 이런 steering의 예로 볼 수 있습니다.
- related: ["Vibe Coding", "Development Environment", "Verification"]

## Prototype Boundary
- category: AI 코딩
- shortDefinition: 빠른 실험과 운영 품질이 필요한 작업을 구분하는 위험 경계
- explanation: Prototype Boundary는 throwaway, learning, production 같은 작업 위험도를 나누어 AI 생성 코드의 검증 강도를 달리하는 기준입니다. 학습용 prototype에서는 빠른 반복이 유용할 수 있지만, production feature에서는 human review, test, diff review 같은 안전 장치가 필요합니다.
- related: ["Human Review", "Technical Debt", "Verification"]

## Material Disengagement
- category: AI 코딩
- shortDefinition: AI 코딩 과정에서 코드 자체를 직접 다루는 감각이 약해지는 현상
- explanation: Material Disengagement는 vibe coding 연구 문맥에서 코드 물질과의 거리두기를 설명하는 관점입니다. 사람이 코드 줄을 직접 읽고 쓰기보다 자연어, 화면 결과, 오류 메시지를 통해 작업을 조정할 때 생길 수 있습니다. 이 현상은 빠른 산출을 가능하게 하지만 검토 부족 위험도 만듭니다.
- related: ["Vibe Coding", "AI-Assisted Steering", "Human Review"]

## Dynamic Trust
- category: AI 시스템
- shortDefinition: AI 도구에 대한 신뢰를 작업 위험도와 검증 결과에 따라 계속 조정하는 태도
- explanation: Dynamic Trust는 바이브코딩에서 AI 도구에 대한 신뢰가 고정값이 아니라는 관점입니다. 작업이 학습용인지 운영용인지, 테스트가 실행됐는지, 사람이 diff를 검토했는지에 따라 신뢰 수준과 검증 강도를 바꿔야 합니다.
- related: ["Vibe Coding", "Human Review", "Evaluation"]

