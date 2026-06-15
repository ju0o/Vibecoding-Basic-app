# 바이브코딩 기초반 · 2기 V3 작업본 03강 실습

## 목표
사용자 행동이 프론트엔드·API·백엔드·DB를 지나 돌아오는 과정을 보고 문제 위치를 말할 수 있습니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 완료 알림은 뜨지만 주문 목록에 없음
- `complete`: 기능 흐름도, 문제 위치 판단표, AI 수정 요청

## 복구
원인: 화면 성공과 저장 성공이 연결되지 않음

첫 수정: 저장 완료 응답 이후에만 성공 UI 표시
