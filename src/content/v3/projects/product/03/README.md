# AI 제품·수익화 03강 실습

## 목표
사용자가 제품을 이해하고 믿고 첫 성공에 도달하도록 화면과 피드백을 설계합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 가입률은 높지만 첫 기능 사용률이 낮음
- `complete`: 5장면 UX 흐름, 상태·피드백 목록, 동료 리뷰 기록

## 복구
원인: 가입 이후 다음 행동과 빈 상태 안내가 없음

첫 수정: 샘플 데이터, 한 단계 안내와 완료 피드백 추가
