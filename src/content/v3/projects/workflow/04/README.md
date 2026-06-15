# AI Workflow Architect 04강 실습

## 목표
자율성을 높이기 전에 목표, 예산, 평가, 중단, 사람 인계와 복구 경로를 가진 Agent 시스템을 설계합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 여러 Agent가 같은 설정을 다르게 수정
- `complete`: Agent 시스템 설계도, 평가 루브릭, 비용·복구 운영표

## 복구
원인: 역할·파일·결정 소유권이 겹침

첫 수정: 작업 계약과 반환 형식, 통합 Owner, 실패 격리 설정
