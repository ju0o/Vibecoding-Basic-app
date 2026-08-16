# Codex Professional 03강 실습

## 목표
반복 업무를 Skill로 설계하고 다른 환경에 설치할 수 있도록 Plugin으로 묶어 검증합니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: Plugin 업데이트 후 Skill이 보이지 않음
- `complete`: Codex Skill, Plugin 패키지, 테스트·업데이트 기록

## 복구
원인: 매니페스트·설치 캐시·버전 갱신 누락

첫 수정: 구조 검증 후 버전과 설치 캐시를 갱신하고 재시작
