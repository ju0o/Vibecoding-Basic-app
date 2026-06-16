# V3 정식 완성 구현 현황

## Beta 2에서 완성된 기반

- 현재 2기 활성본과 V3 작업본 분리
- 회차별 검수, 승격과 이전 활성본 복구
- 34개 회차 고유 scene id와 수동 시뮬레이션
- 34개 starter·broken·complete 실행 실습 패키지
- 34개 오프라인 대체 캡처
- 수강생 6종, 강사 7종 자료 구조
- 13장별 상세 대본
- 실습 파일 탭, 저사양 모드, ZIP/JSON 백업
- Windows Electron·PDF CI와 ASAR 패키징

## 과정별 Beta 누적

1. `3.0.0-beta.3`: 단일 강사용 스튜디오, 전역 강사자료실, 공식자료 학습실, 전 V3 ready 회차의 공식자료 기반 연구노트
2. `3.0.0-beta.4`: 다음 기수 4주 기초반 현장 파일럿과 피드백 반영
3. `3.0.0-beta.5`: Workflow Architect 4회 공식 자료와 실습 검수
4. `3.0.0-beta.6`: Claude Code 6회 최신 명령·권한·시연 검수
5. `3.0.0-beta.7`: Codex 6회 최신 설정·브라우저 QA·릴리즈 검수
6. `3.0.0-beta.8`: AI 제품·수익화 8회 팀 프로젝트 파일럿
7. `3.0.0-rc.1`: 전체 현장 리허설, 인쇄물과 Windows 배포 검수
8. `3.0.0`: 한 기수 운영 중 발견된 치명적 문제 반영 후 승격

## Beta 3에서 추가된 품질 게이트

- 다음 기수 기초 4주, AI 제품·수익화 8주, Workflow Architect 4주, Claude Code 6주, Codex 6주 ready 회차는 모두 공식자료 3개 이상을 가져야 합니다.
- ready 회차는 강사용 연구노트, 공식자료 학습 포인트, 시각 시뮬레이션 설명, 시연 런북, 실패 복구 훈련, 오해 교정, 전문 Q&A를 포함해야 합니다.
- AI 제품·수익화 과정은 YC, Atlassian, Nielsen Norman Group, Material Design, Stripe, Toss Payments, Supabase 자료를 연결해 팀 프로젝트와 수익화 판단이 실제 자료 기반으로 설명되도록 했습니다.
- `npm run audit:curriculum`은 Codex만이 아니라 모든 ready 회차에 동일한 품질 기준을 적용합니다.

## 정식 승격 조건

- 각 과정 실제 수업 1회 이상 운영
- 모든 회차의 실습 완료율과 반복 질문 기록
- 도구 명령, 가격, 권한과 베타 기능의 공식 문서 재확인
- 오프라인 대체 화면만으로도 핵심 설명 가능
- 강사가 대본 없이 시연 순서와 오류 복구를 수행
- Windows portable EXE, SHA-256과 GitHub Release 검증

신규 과정은 V3 정식 이후 실제 질문과 수요를 확인한 뒤 별도 V3.1 계획으로 다룹니다.
