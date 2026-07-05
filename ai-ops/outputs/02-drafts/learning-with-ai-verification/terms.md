# 용어 초안: learning-with-ai-verification

## AI Learning Verification
- category: AI 학습
- shortDefinition: AI 설명과 생성물을 근거, 실행, 평가, 사람 검토로 확인하며 배우는 절차
- explanation: AI Learning Verification은 AI가 말한 내용을 claim 단위로 나누고, direct quote와 citation이 실제로 주장을 support하는지 확인하며, 코드에는 실행과 human review를 붙이는 학습 방식입니다. 목표는 AI를 불신하는 것이 아니라 빠른 설명을 검증 가능한 이해로 바꾸는 것입니다.
- related: ["Verification", "Citation", "Human Review"]

## Direct Quote Grounding
- category: AI 시스템
- shortDefinition: 사실 주장에 원문 직접 인용을 붙여 claim과 source의 거리를 줄이는 방식
- explanation: Direct Quote Grounding은 AI 설명의 핵심 claim을 원문 문장과 직접 연결하는 검증 방식입니다. 링크만 제시하면 요약과 해석이 섞일 수 있으므로, 원문 구절을 함께 읽어 claim이 실제 source로 뒷받침되는지 확인합니다.
- related: ["Citation", "Grounding", "Claim Audit"]

## Source Invention
- category: AI 위험
- shortDefinition: AI가 실제로 제공되지 않은 source ID, 줄 번호, locator를 만들어내는 오류
- explanation: Source Invention은 citation처럼 보이지만 검증을 방해하는 hallucination 유형입니다. OpenAI citation formatting은 source IDs, line ranges, block locators를 invent하지 말라고 설명합니다. 검증 가능한 출처 위치만 사용해야 합니다.
- related: ["Citation", "Hallucination", "Source Locator"]

## Direct Support
- category: AI 시스템
- shortDefinition: citation source가 답변 문장의 핵심 claim을 실제로 뒷받침하는 관계
- explanation: Direct Support는 출처가 답변 주변 주제를 말하는 수준이 아니라 cited text의 핵심 의미를 실제로 support하는 상태입니다. Citation audit에서는 링크 존재보다 direct support 여부가 더 중요합니다.
- related: ["Citation", "Citable Unit", "Claim Audit"]

## Structured Test
- category: AI 평가
- shortDefinition: 같은 기준을 반복 적용해 AI 답변이나 시스템 성능을 확인하는 테스트
- explanation: Structured Test는 OpenAI evals 설명과 연결되는 개념입니다. 학습에서는 큰 평가 플랫폼 없이도 direct quote 존재, citation direct support, invented source 없음 같은 기준을 여러 사례에 반복 적용하는 작은 eval로 사용할 수 있습니다.
- related: ["Evaluation Set", "Eval Run", "Verification"]

## Code Review Boundary
- category: AI 코딩
- shortDefinition: AI 생성 코드가 실행 결과만으로 승인되지 않고 사람이 diff와 위험을 검토해야 하는 경계
- explanation: Code Review Boundary는 code generation에서 human review가 특히 중요하다는 원칙을 학습 절차로 바꾼 것입니다. 실행 성공, 테스트 결과, 변경 파일, 사람 검토를 분리해 보며 production에 가까울수록 검토 강도를 높입니다.
- related: ["Human Review", "Vibe Coding", "Verification"]

