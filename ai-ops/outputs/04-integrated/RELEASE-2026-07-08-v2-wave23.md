# RELEASE — V2 Wave 23 (2026-07-08)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 b6z6az2xp) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 2강 (deployment-ops 모듈 확장):
  - deployment-platforms (order 2, deep-dive) — 정적 CDN 호스팅(Firebase, 엣지 캐시·zero-config SSL) vs 서버·함수 모델, 배포마다 고유 URL·Preview/Production 환경·롤백
  - ci-cd-pipeline-basics (order 4, deep-dive) — CI/CD 정의, 이벤트→워크플로→잡→스텝, 6구성요소, 검증 통과에만 배포
- 다이어그램 2개: deployment-models.svg(정적/서버 모델), ci-cd-flow.svg(파이프라인 게이트)
- 신규 용어 6개: Deployment Platform, CDN, Static Hosting, CI/CD, Workflow (CI/CD), Runner (용어 총 255)
- 근거 KB: T06/deployment-platforms (89), T06/ci-cd-pipeline-basics (89)

## 자가 QA
- 분량: 8,029자 / 8,022자 (하한 8,000 충족)
- 각 8섹션, 콜아웃 각 4개(섹션당 ≤2), 하이라이트 섹션당 ≤3 확인
- 원문 인용 각 5개 전부 KB Quote Bank와 글자 단위 일치 (deployment 5/5: Firebase정의·CDN·SSL·Vercel정의·고유URL / ci-cd 5/5: CI/CD정의·워크플로·이벤트·잡·러너)
- **콜아웃 오탐 재발·수정**: ci-cd의 WARNING이 `> "`로 시작해 인용 파서 오탐 → 따옴표 제거(Wave 22 교훈 재확인, 콜아웃은 따옴표로 시작 금지)

## 설계 특기
- deployment-ops 모듈 order 1~4 완성 (build-and-runtime → deployment-platforms → npm-scripts → ci-cd)
- deployment-platforms는 이 사이트 자신이 Firebase 정적 호스팅임을 산 예시로: "정적 모델엔 런타임 서버 없음 → AI가 서버 코드 정적 배포하면 실패", "정적 파일에 secret 담으면 전 세계 공개(해시만 담는 이유)"
- ci-cd는 앞 강의들을 하나로 통합: PR(이벤트)+npm run verify(스텝)+배포 플랫폼(CD)이 하나의 파이프라인으로. "CI 먼저 CD 나중" 도입 순서, 이 프로젝트의 수동 verify→deploy가 CI/CD의 수동 버전임을 명시
- 두 강의 상호 참조: ci-cd의 CD가 도달하는 목적지가 deployment-platforms

## 인용 품질 노트
- Firebase Hosting·Vercel(원문 마크다운)·GitHub Actions 모두 verbatim 확보. 제품 문서는 checked 날짜 관리 중요(기록됨)

## 누적: **65강 released** (65/100) — deployment-ops order 1~4 (order 5 production-env-secrets, 6 monitoring, 7 deployment-cli-reference KB 대기)
