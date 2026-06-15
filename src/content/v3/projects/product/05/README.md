# AI 제품·수익화 05강 실습

## 목표
같은 강의실에서 SaaS팀은 상태·회원·권한을, 외주팀은 범위·견적·승인 구조를 완성합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 팀마다 완료 기준이 다름
- `complete`: 트랙별 설계 문서, 교차 리뷰 기록, 개인 적용본

## 복구
원인: 상태 또는 범위를 화면 이름만으로 표현

첫 수정: 입력·행동·결과·제외·승인을 표로 명시
