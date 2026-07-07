# RELEASE — V2 Wave 17 (2026-07-07)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 bmya15w88) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 1강: git-rebase-cherry-pick-stash (git-collaboration order 6, reference) — 이력 편집(rebase 이식·cherry-pick 선별 이식) + 임시 보관(stash), "공유 전에만" 안전 경계
- 다이어그램 1개: rebase-transplant.svg (A-B-C → A'-B'-C' 이식, A≠A' 해시 변화 강조)
- 신규 용어 3개: Rebase, Cherry-pick, Stash (용어 총 224)
- 근거 KB: T04/git-rebase-cherry-pick-stash (Score 91)

## 자가 QA
- 분량 8,316자 (하한 8,000 충족)
- 8섹션 (한 줄 정의/왜 존재하는가/작동 원리/스펙과 세부/원문으로 읽기/실전에서/한계와 트레이드오프/더 읽기)
- 원문 인용 4개 전부 KB Quote Bank와 글자 단위 일치 (rebase 3 + cherry-pick 1 + stash 1 중 rebase "bad idea" 경고 포함) — 콜아웃 내 한국어 문장 오탐 1건은 `> "` 제거로 정리
- 콜아웃 4개(KEY/EXAMPLE/TIP/WARNING, 섹션당 ≤2), 하이라이트 2개(마커 짝수)
- reference형: 명령어별 문법/옵션표/예시/주의 소절 + "상황별 빠른 참조" 표

## 부수 수정 (같은 세션)
- Wave 15/16 orphaned 다이어그램 5개(git-init/branch/log/restore, nextjs) 강의 본문에 `![...]` 참조 삽입 — SVG는 존재했으나 마크다운에서 미참조 상태였음 (commit 4958a00)

## 누적: **53강 released** — git-collaboration 모듈 order 2~6 레퍼런스 5강 + 협업 기초 1강
