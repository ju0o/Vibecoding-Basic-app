# RELEASE — M3 UI/UX Refactor (2026-07-11)

**판정:** Fable 검토 및 배포 대기 / **Executor:** Codex

## 포함 범위
- Phase A: 커리큘럼 모듈 아코디언, 강의 검색, 모듈별/전체 진행률, 진행률 초기화, 강의 하단 읽음 토글, curriculum 기반 prev/next 카드.
- Phase B: 강의 본문 폭 72ch, 문단/행간 조정, 콜아웃·인용 위계 강화, 코드 블록·표 가로 스크롤 안정화, 다이어그램 컨테이너 다크 모드 대비 보강.
- Phase C: 홈 재구성, 마지막 읽은 강의 기반 이어서 읽기, 전체 모듈 그리드, 동적 규모 지표, 용어집 카테고리/첫 글자 필터, 리소스 페이지 현행화.

## 검증
- Phase A: `npm run verify` exit 0.
- Phase B: `npm run verify` exit 0.
- Phase C: `npm run verify` exit 0.
- 콘텐츠 디렉터리 `src/content/**` diff 0 유지.
- 정적 export 유지: `next.config.ts`의 `output: "export"` 변경 없음.
- PasswordGate/noindex 유지: 레이아웃·게이트 정책 변경 없음, 포맷만 Biome 기준 적용.

## 라이트/다크 점검 메모
- 라이트 모드: 커리큘럼 아코디언, 검색 입력, 진행률 바, 콜아웃 색상 대비가 기존 토큰 범위 안에서 유지됨.
- 다크 모드: 코드 블록 배경, 다이어그램 컨테이너, 인용/콜아웃 경계가 표면색과 분리되도록 전용 토큰 보강.
- 모바일: 본문 폭 72ch 제한과 코드/표/다이어그램 가로 스크롤로 레이아웃 넘침을 줄임.

## 배포
- P-09 배포는 수행하지 않음.
- 다음 단계는 Fable 검토 및 세션 말미 배포 판단.
