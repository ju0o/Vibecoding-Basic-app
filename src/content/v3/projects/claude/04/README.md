# Claude Code Professional 04강 실습

## 목표
Skill과 설정을 Plugin으로 묶고 MCP Tool과 Hook을 연결해 외부 서비스를 안전하게 사용합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Plugin 설치 후 MCP 연결 실패
- `complete`: Claude Plugin, MCP·Hook 설정, 보안 설치 가이드

## 복구
원인: 설치 요구사항과 인증 안내 누락

첫 수정: 환경 검사, 설정 가이드와 연결 진단 명령 추가
