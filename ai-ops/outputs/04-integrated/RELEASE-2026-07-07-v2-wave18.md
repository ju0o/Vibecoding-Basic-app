# RELEASE — V2 Wave 18 (2026-07-07)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 bxz94xew2) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 2강 (git-collaboration 모듈):
  - github-pr-review-flow (order 7, reference) — PR = head→base 제안, 리뷰 3상태(Comment/Approve/Request changes), 병합 3전략(merge/squash/rebase)
  - gh-cli-reference (order 8, reference) — gh pr create/review/merge/checkout, 플래그가 웹 개념의 직역
- 다이어그램 2개: pr-review-merge-flow.svg, gh-pr-lifecycle.svg
- 신규 용어 5개: Pull Request, Code Review, Merge Strategy, GitHub CLI (gh), gh pr checkout (용어 총 229)
- 근거 KB: T04/github-pr-review-flow (88), T04/gh-cli-reference (89)

## 자가 QA
- 분량: 8,094자 / 8,485자 (하한 8,000 충족)
- 각 8섹션, 콜아웃 각 4개(KEY/EXAMPLE/TIP/WARNING, 섹션당 ≤2), 하이라이트 4·3개
- 원문 인용 각 5개 전부 KB Quote Bank와 글자 단위 일치 (github-pr 5/5, gh-cli 5/5)
- reference형: 명령어별 문법/플래그표/예시/주의 소절 + "상황별 빠른 참조" 표

## 설계 특기
- 두 강의를 **개념(웹) ↔ 명령(CLI) 짝**으로 구성: order 7이 "무엇을·왜", order 8이 "터미널에서 어떻게". gh 플래그(--base, --approve/--comment/--request-changes, --merge/--squash/--rebase)가 웹 개념의 직역임을 명시해 암기 대신 이해로 연결
- git-collaboration 모듈이 order 2~8의 7강 체계로 완성: 기록(init/add/commit) → 분기(branch/switch/merge) → 조회(log/diff/show) → 복구(restore/reset/revert) → 이력 편집(rebase/cherry-pick/stash) → 협업(PR) → 협업 자동화(gh)

## 인용 품질 노트
- github-pr-review-flow의 GitHub Docs 인용은 WebFetch 요약 모델 경유분 — 리뷰 3상태는 2회 독립 fetch로 동일 텍스트 확인, 공개(모드 B) 전환 시 운영자 citation-review 재확인 권장(KB 검증 리포트에 명시)

## 누적: **55강 released** (55/100)
