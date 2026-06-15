# Claude Code Professional 03강 실습

## 목표
반복되는 한 업무를 호출 조건, 단계, 자료와 완료 검증을 가진 Claude Skill로 만듭니다.

## 실행
```powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
```

기본 주소는 `http://localhost:4173`입니다. 실행 중인 서버는 `Ctrl + C`로 종료합니다.

## 세 상태
- `starter`: 수강생이 작업을 시작하는 최소 상태
- `broken`: 관련 없는 요청에도 Skill이 활성화
- `complete`: 실행 가능한 Skill, 정상·실패 테스트, 버전 기록

## 복구
원인: 설명과 경계가 너무 넓음

첫 수정: 명확한 Trigger·비사용 조건과 한 책임으로 축소
