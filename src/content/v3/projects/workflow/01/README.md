# AI Workflow Architect 01강 실습

## 목표
명령어 암기보다 현재 위치, 실행 중인 프로세스, 변경 기록과 오류 로그를 읽는 운영 감각을 만듭니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 개발 서버가 이미 사용 중인 포트로 실패
- `complete`: 터미널 운영 일지, 오류 분석 템플릿, Git 복구 체크포인트

## 복구
원인: 이전 프로세스가 종료되지 않음

첫 수정: 포트 사용 프로세스를 확인해 종료하거나 다른 포트로 실행
