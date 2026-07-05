# 용어 초안: grounding-and-citations

## Grounding
- category: AI 시스템
- shortDefinition: 모델 답변의 주장을 제공된 근거에 묶어 해석 가능하게 만드는 설계
- explanation: Grounding은 답변이 현재 제공된 문서, 검색 결과, 저장소 사실에 의해 support되는지 관리하는 방식입니다. 단순히 링크를 붙이는 것이 아니라 어떤 claim이 어떤 citable unit으로 뒷받침되는지 연결해야 합니다.
- related: ["Citation", "RAG", "Evidence Policy"]

## Citation
- category: AI 시스템
- shortDefinition: 답변 문장이나 문단이 의존한 출처 위치를 표시하는 형식
- explanation: Citation은 참고문헌 목록과 다르게 특정 response text를 직접 support하는 source location을 가리킵니다. 문장 또는 문단 뒤에 놓이며, returned context에 없는 source ID나 locator를 만들어내면 안 됩니다.
- related: ["Grounding", "Citable Unit", "Source Locator"]

## Citable Unit
- category: AI 시스템
- shortDefinition: 답변 claim을 뒷받침할 수 있도록 나눈 인용 가능한 근거 단위
- explanation: Citable Unit은 line-level, paragraph-level, document-level처럼 use case의 precision에 맞춰 나눈 근거 조각입니다. 너무 큰 단위는 검증이 느슨해지고, 너무 작은 단위는 관리가 복잡해지므로 목적에 맞게 정해야 합니다.
- related: ["Citation", "Stable Source ID", "Grounding"]

## Stable Source ID
- category: AI 시스템
- shortDefinition: 검색 결과나 주입된 context 안에서 출처를 일관되게 식별하는 고정 ID
- explanation: Stable Source ID는 모델이 citation을 만들 때 사용할 수 있는 출처 식별자입니다. ID가 안정적이지 않거나 context에 제공되지 않으면 모델이 source ID를 invent할 위험이 커집니다.
- related: ["Citation", "Source Locator", "Citable Unit"]

## Source Locator
- category: AI 시스템
- shortDefinition: 출처 문서 안의 페이지, 줄, 문자 범위처럼 근거 위치를 가리키는 정보
- explanation: Source Locator는 citation이 단순 URL이 아니라 문서 내부의 어느 위치를 참조하는지 알려주는 장치입니다. PDF page range, plain text character index range처럼 문서 형식에 따라 locator가 달라질 수 있습니다.
- related: ["Citation", "Citable Unit", "Grounding"]

