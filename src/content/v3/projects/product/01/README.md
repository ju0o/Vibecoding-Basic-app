# AI 제품·수익화 01강 실습

## 목표
기능 아이디어를 고객의 반복 문제로 바꾸고 팀 역할과 의사결정 규칙을 정합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 회의는 길지만 결정이 남지 않음
- `complete`: 팀 문제 선언문, 역할 순환표, 협업 계약서, 개인 문제 정의

## 복구
원인: 최종 결정자와 기록 형식이 없음

첫 수정: 결정 Owner, Reviewer, 마감과 변경 로그를 계약서에 추가
