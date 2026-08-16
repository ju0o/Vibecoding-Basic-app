# 바이브코딩 기초반 · 2기 V3 작업본 02강 실습

## 목표
네 작업대를 순환하며 첫 프로젝트를 만들고 브라우저 결과를 보고 다시 수정하는 흐름을 익힙니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 개발 서버가 시작되지 않음
- `complete`: 실행되는 로컬 프로젝트, 첫 작업 요청서, 수정 전후 캡처

## 복구
원인: 프로젝트 폴더 또는 실행 명령이 다름

첫 수정: 현재 경로와 package.json scripts를 확인해 올바른 명령 실행
