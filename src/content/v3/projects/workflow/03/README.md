# AI Workflow Architect 03강 실습

## 목표
AI가 외부 세계를 읽고 바꿀 때 필요한 Tool 계약과 최소 권한, 인증과 사람 승인 지점을 설계합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Agent가 잘못된 고객 폴더에 결과를 저장
- `complete`: Tool 계약서, 권한 매트릭스, 승인·감사 흐름

## 복구
원인: 도구 입력 검증과 경로 제한이 없음

첫 수정: 허용 경로 목록, dry-run, 쓰기 전 승인과 감사 로그 추가
