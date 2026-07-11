# CODEX-MISSIONS — Heavy Executor 미션 카탈로그

> 사용법: 아래 미션 중 **하나**를 골라, 그 미션 블록 전체 + "공통 규약" 섹션을 Codex에 붙여넣는다. Codex는 한 번 받은 미션을 사람 호출 없이 완주한다(몇 시간이 걸려도). 막힌 항목은 BLOCKED 기록 후 계속 — 전체 정지 금지.

---

## 공통 규약 (모든 미션에 포함해 전달)

- 시작 전 `git log --oneline -5; git status` 재대사. 작업 중 다른 에이전트 커밋 발견 시 pull 후 계속.
- 파이프라인·품질 기준: `ai-ops/ORCHESTRATION-PLAN.md` §1 불변 원칙 + `ai-ops/roadmap/CONTENT-FORMAT-V2.md` (V2 8섹션·8,000자+·인용은 KB Quote Bank 글자 일치·콜아웃 상한).
- **콜아웃 본문을 `> "..."` 따옴표로 시작하지 말 것** (인용 파서 오탐 — 4회 실증).
- 초안은 처음부터 **8,500자 목표**로 작성 (8,000 하한 미달 보강 루프 방지).
- 단계별 커밋 "P-XX: 요약", 완료 시 `git show --stat` 실측 확인. src/content 커밋 누락 금지.
- P-05 통합 시: 해시 대조 복사 + **다이어그램 `![...]` 참조를 마크다운에 삽입**했는지 확인 + 용어 충돌은 `term (분류)` 접미로 회피(기존 등재 먼저 검색).
- 각 릴리스 전 `npm run verify` exit 0 필수. **배포(P-09)는 하지 않는다** — 배포는 Fable이 세션 말미 수행.
- secret(비밀번호·토큰)을 코드·로그·커밋에 남기지 않는다.
- 종료 시 `ai-ops/STATE.md` 현황판 갱신 + NEXT_ACTION 블록 + 릴리스 노트(`ai-ops/outputs/04-integrated/RELEASE-*.md`).

---

## M1 — 커리큘럼 웨이브: ai-basics 완결 + ai-coding-tools 모듈

**목표**: ai-basics 잔여 2강(model-selection-tradeoffs, ai-era-timeline) + ai-coding-tools 모듈(백로그 57행~)을 P-01→P-08로 연속 생산. 최소 6강.
- 출처 우선순위: 공식 문서(Anthropic·OpenAI·GitHub 문서, MDN 등). x.com은 용어 기원 전용.
- 신규 모델 세대(예: Claude 5 패밀리)는 공식 발표문 fetch 확보분만 서술 — 추측 금지.
- 각 강의: V2 형식 + 다이어그램 1개(+마크다운 참조) + 용어 2~3개 + KB consumers 갱신.
- 완료 조건: 대상 강의 전부 released + verify exit 0 + BACKLOG/MASTER_PROGRESS/STATE 전이 기록.

## M2 — V1 레거시 5강 재생성

**목표**: ai-vibe-coding-orientation, web-screen-anatomy, typescript-react-nextjs, git-collaboration-basics, api-db-backend-flow를 V2로 재생성.
- 각각 KB부터(P-01·P-02, 기존 KB 있으면 재확인·보강) → P-04 재작성 → 기존 마크다운 **교체**(slug 유지, curriculum 메타 유지·필요 시 summary 갱신).
- 기존 강의의 slug·URL이 바뀌면 안 된다(공유 이력 보존).
- 완료 조건: 5강 전부 V2 기준 통과 + verify exit 0.

## M3 — UI/UX 리팩토링 구현

**목표**: `ai-ops/roadmap/UIUX-REFACTOR-PLAN.md`의 Phase A→B→C를 순서대로 구현.
- **콘텐츠(마크다운·curriculum 데이터) 무수정** — UI 코드(src/app, src/components)와 스타일만.
- 정적 export(`output: "export"`)·PasswordGate·noindex 유지. 새 라이브러리 추가는 최소화(추가 시 사유를 커밋 메시지에).
- Phase마다 `npm run verify` exit 0 + 커밋. 스크린샷 대신 변경 요약을 릴리스 노트에.
- 완료 조건: Phase A~C 구현 + verify 통과 + UIUX-REFACTOR-PLAN.md에 체크 표시.

## M4 — 콘텐츠 리프레시 스윕

**목표**: `ai-ops/roadmap/CONTENT-REFRESH-2026H2.md`의 후보 목록을 P-01로 승격 시도.
- 먼저 전 KB frontmatter의 `checked` 30일 경과분을 목록화(`ai-ops/reports/stale-kb.md`) → 그 KB들의 출처 재fetch → 인용 변동 확인 → `checked` 갱신(변동 시 KB·강의 보수).
- 신규 후보는 공식 문서가 fetch로 확보되는 것만 KB화. 확보 실패는 후보 문서에 "소싱 불가(사유)" 기록.
- 완료 조건: stale 0 (또는 사유 기록) + 승격된 신규 KB의 검증 리포트.

## M5 — 기계 QA 전수 스캔

**목표**: 전 강의·전 KB 대상 기계 QA 5종을 스크립트로 전수 실행하고 리포트 생성.
1. 형식: 8섹션·8,000자·콜아웃≤8·하이라이트 `==` 짝수 (코드 펜스와 인라인 코드를 제거한 뒤 카운트 — JS `===` 오탐 방지)
2. 인용: 강의의 `> "..."` 인용이 대응 KB Quote Bank에 글자 단위로 존재하는지
3. 링크 생존 (도메인 중복 제거 후)
4. 다이어그램: `src/content/lessons/diagrams/*/*.svg`가 대응 마크다운에서 `![...]`로 참조되는지
5. 용어집: term 중복·related 실존 여부
- 산출: `ai-ops/reports/codex-qa-scan.md` (검사 파일 수·위반 수 요약 + 위반 상세. 위반 0이면 "위반 없음" 명시)
- **극단값 결과(예: 전 강의 위반)는 스크립트 오류 가정** — 표본 3개 손 검증을 리포트에 병기.
- V1 레거시 5강은 "V1 알려짐"으로 별도 표기. 콘텐츠 수정 금지(보고만).
- 완료 조건: 리포트 커밋. 스크립트는 `ai-ops/reports/scripts/` 아래 보관(repo 루트 금지).