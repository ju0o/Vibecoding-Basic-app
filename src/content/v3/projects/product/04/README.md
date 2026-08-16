# AI 제품·수익화 04강 실습

## 목표
가격 숫자가 아니라 고객이 돈을 내는 결과와 제공 비용을 기준으로 모델을 정하고 팀 트랙을 선택합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 사용자는 늘지만 사용할수록 손실 증가
- `complete`: 가격·원가 가설, 결제 상태표, 트랙 선택서

## 복구
원인: 사용량 비용과 무료 한도를 설계하지 않음

첫 수정: 원가 추정, 사용량 제한, 유료 전환 조건을 함께 설계
