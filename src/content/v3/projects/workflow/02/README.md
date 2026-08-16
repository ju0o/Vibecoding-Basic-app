# AI Workflow Architect 02강 실습

## 목표
반복 업무를 단계와 상태로 분해하고 현재 작업 컨텍스트, 지속 지침과 장기 지식을 구분합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: AI가 이전 프로젝트 규칙을 현재 작업에 잘못 적용
- `complete`: 워크플로 상태도, 컨텍스트 예산표, 지침·메모리 승격 규칙

## 복구
원인: 범위와 유효기간 없는 메모리

첫 수정: 프로젝트·경로·유효기간·근거를 메모리에 함께 저장하고 폐기 규칙 설정
