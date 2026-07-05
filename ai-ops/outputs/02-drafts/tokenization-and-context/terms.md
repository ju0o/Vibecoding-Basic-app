# 용어 초안: tokenization-and-context

## Tokenization
- category: AI 시스템
- shortDefinition: 모델 입력 텍스트를 토큰이라는 처리 단위로 나누는 방식
- explanation: Tokenization은 글자 수나 단어 수를 그대로 세는 것이 아니라 모델별 tokenizer가 입력을 내부 처리 단위로 쪼개는 과정입니다. 같은 문장도 모델 tokenizer에 따라 토큰 수가 달라질 수 있으므로 비용과 context fit을 판단할 때 실제 사용할 모델 기준으로 다시 세어야 합니다.
- related: ["Token Counting", "Context Window", "Context Engineering"]

## Token Counting
- category: AI 시스템
- shortDefinition: 요청을 보내기 전에 입력이 차지할 토큰 수를 추정하는 절차
- explanation: Token Counting은 system prompt, messages, tools, images, PDFs 같은 구조화 입력이 context window와 비용에 어떤 영향을 주는지 미리 확인하는 운영 절차입니다. 추정값과 실제 message creation의 input tokens는 작게 차이날 수 있으므로 사전 점검과 실제 usage 확인을 함께 봅니다.
- related: ["Tokenization", "Context Budget", "Context Window"]

## Context Budget
- category: AI 시스템
- shortDefinition: 제한된 context window 안에 어떤 근거와 출력 여유를 넣을지 정하는 입력 예산
- explanation: Context Budget은 모델에 넣을 파일, 로그, 도구 정의, 문서, 출력 예약량을 선별하는 기준입니다. 많이 넣는 것이 목표가 아니라 현재 작업에 필요한 high-signal evidence를 남기고 낮은 신호는 요약하거나 제외하는 것이 핵심입니다.
- related: ["Context Window", "Context Engineering", "Context Rot"]

## Context Rot
- category: AI 시스템
- shortDefinition: context window의 토큰 수가 커질수록 회상 정확도와 활용 품질이 떨어질 수 있는 현상
- explanation: Context Rot은 긴 context가 항상 더 좋은 답변을 만든다는 오해를 교정하는 개념입니다. 토큰 수가 증가하면 모델이 context 안의 정보를 정확히 회상하는 능력이 낮아질 수 있으므로, 긴 입력에는 선별, 요약, 검색, 검증 기준이 함께 필요합니다.
- related: ["Context Window", "Context Budget", "RAG"]

