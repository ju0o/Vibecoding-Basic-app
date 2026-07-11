# 용어 초안: explain-risk-and-verification

기존 glossary.ts 대조 완료: `Verification`, `Code Review`, `CodeQL`, `Authorization`, `Playwright` 성격의 기존 용어와 의미가 겹칠 수 있어 일반명사 단독 등록은 피한다.

## 생성 용어

## Risk Evidence Packet

- category: 설명 연습
- shortDefinition: 변경 지점, 실패 비용, 검증 증거, 리뷰 결정을 한 묶음으로 설명하는 검증 보고 단위
- explanation: Risk Evidence Packet은 AI가 만든 변경을 "괜찮아 보인다"가 아니라 어떤 위험을 어떤 증거로 낮췄는지 설명하게 만드는 형식입니다. PR review, CodeQL alert, Playwright assertion, authorization 검토를 서로 다른 evidence로 분리합니다.
- related: ["Verification", "Code Review", "CodeQL", "Playwright"]

## Review Decision Language

- category: 설명 연습
- shortDefinition: comment, approve, request changes처럼 리뷰 결과를 행동 가능한 결정으로 닫는 언어
- explanation: Review Decision Language는 위험 설명의 마지막 단계입니다. 검증 증거가 충분하면 approve, merge 전 수정이 필요하면 request changes, 판단보다 논의가 목적이면 comment로 구분합니다.
- related: ["Code Review", "Verification"]

## Authorization Evidence

- category: 보안
- shortDefinition: 권한 변경이 제품의 business context에 맞는지 확인한 검증 증거
- explanation: Authorization Evidence는 단순 화면 테스트와 별개로 누가 어떤 route와 data에 접근할 수 있는지 확인한 결과입니다. AI가 만든 권한 코드는 테스트 통과만으로 충분하지 않고 business context와 연결해 설명해야 합니다.
- related: ["Authorization", "Security"]
