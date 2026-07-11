# RELEASE — M4/M5 Content Refresh + Machine QA (2026-07-11)

**판정:** Fable 검토 및 조정 대기 / **Executor:** Codex

## 포함 범위

- M4 Content Refresh Sweep: 전 KB source `checked` 30일 경과 여부를 스캔하고 `ai-ops/reports/stale-kb.md`로 기록.
- M4 신규 후보 승격: 공식 문서 fetch가 확보된 `model-selection-tradeoffs`만 KB로 승격하고 검증 리포트를 생성.
- M5 Machine QA Scan: 전 강의·전 KB 대상 형식, 인용, 링크, 다이어그램, 용어집 검사를 스크립트화하고 리포트 생성.
- 콘텐츠 수정 없음: M5는 보고만 수행했고 `src/content/lessons/markdown` 및 기존 콘텐츠 문장은 변경하지 않음.

## M4 결과

- stale KB: 0건.
- 신규 승격 KB: `model-selection-tradeoffs`, status `approved`, score 91.
- R1 Claude 5 모델 패밀리 후보는 단독 KB가 아니라 `model-selection-tradeoffs`의 최신 사례와 Quote Bank 근거로 흡수.
- R4 AI 코딩 도구 지형 후보는 Cursor docs 본문 fetch 0줄로 소스셋 불완전, 범위 보류.

## M5 결과

- 검사 파일 수: 강의 67개, KB 58개, 다이어그램 SVG 40개.
- 용어집 term 수: 259개.
- 링크 생존 검사: 도메인 중복 제거 32개, 위반 0건.
- 인용 검사: 위반 0건.
- 다이어그램 참조 검사: 위반 0건.
- 형식 위반: 19건.
- V1 알려짐: 5건 별도 표기.
- 용어집 위반: 103건.

## 검증

- `node ai-ops/reports/scripts/codex-qa-scan.mjs` exit 0.
- `npm run verify` exit 0.
- M4 커밋 후 `git show --stat` 확인 완료.
- M5 산출물은 리포트와 스크립트만 추가하며 배포(P-09)는 수행하지 않음.

## 다음 판단

- Fable이 `ai-ops/reports/codex-qa-scan.md`를 기준으로 형식 보강 물결, glossary 정합성 보수, V1 레거시 재생성 우선순위를 정한다.
- 배포는 이번 Codex 런에서 수행하지 않는다.
