# Claude Code Professional 02강 실습

## 목표
반복 설명을 CLAUDE.md에 정리하고 계획, 작은 diff, 테스트와 Git 체크포인트로 변경을 운영합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: CLAUDE.md 규칙이 서로 충돌
- `complete`: CLAUDE.md, 변경 계획, 테스트가 포함된 커밋

## 복구
원인: 범위와 우선순위를 고려하지 않음

첫 수정: 루트는 공통 규칙, 하위 파일은 해당 영역의 구체 규칙으로 정리
