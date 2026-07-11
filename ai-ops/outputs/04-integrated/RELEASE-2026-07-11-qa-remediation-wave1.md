# RELEASE — QA Remediation Wave 1 (2026-07-11)

**판정:** verified locally / **Executor:** Codex

## 포함 범위

- M5 전수 스캔에서 발견된 V1 레거시 제외 위반 122건을 보수했다.
- 용어집 `related` 정합성 위반을 제거하고, 중복 `Hook` term을 `Agent Hook`과 `React Hook`으로 분리했다.
- 누락 related term을 실제 glossary term으로 추가해 용어 수를 259개에서 340개로 확장했다.
- 8,000자 하한 미달 V2 강의 19개에 설명 연습·점검 질문 단락을 보강했다.
- `git-branch-switch-merge`의 충돌 마커 prose를 inline code로 감싸 하이라이트 `==` 오탐을 제거했다.

## QA 결과

- `node ai-ops/reports/scripts/codex-qa-scan.mjs` exit 0.
- V1 레거시 5강 제외 위반 수: 0.
- 형식 위반: 0.
- 인용 위반: 0.
- 링크 생존 위반: 0.
- 다이어그램 참조 위반: 0.
- 용어집 위반: 0.
- V1 알려짐: 5강 유지 (`ai-vibe-coding-orientation`, `web-screen-anatomy`, `typescript-react-nextjs`, `git-collaboration-basics`, `api-db-backend-flow`).

## 검증

- `npm run verify` exit 0.
- Next.js static export build: 113 pages generated.

## 남은 일

- V1 레거시 5강을 V2 규격으로 재생성해 "V1 알려짐" 항목을 제거한다.
- 이후 `model-selection-tradeoffs` planned 강의와 남은 `kb_needed` 33건을 순차 처리한다.
