# RELEASE — V2 Wave 25 (2026-07-08)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 buhs9fg3y) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 1강: deployment-cli-reference (deployment-ops order 7, reference) — vercel/firebase CLI로 배포·롤백·조회·인증, CI 토큰은 환경변수로 주입
- 다이어그램 1개: deploy-cli-map.svg (배포·롤백·조회·인증 4묶음 + CI 토큰 안전)
- 신규 용어 2개: Deployment CLI, Deploy Token (용어 총 259)
- 근거 KB: T06/deployment-cli-reference (88)

## 자가 QA
- 분량 8,023자 (하한 8,000 충족)
- 8섹션, 콜아웃 4개(KEY/EXAMPLE/TIP/WARNING, 섹션당 ≤2), 하이라이트 섹션당 ≤3
- 원문 인용 4개 전부 KB Quote Bank와 글자 단위 일치 (CLI정의·deploy기본명령·rollback·CI토큰환경변수)
- reference형: 명령 표(Vercel/Firebase/CI인증) + "상황별 빠른 참조"

## 설계 특기
- **deployment-ops 모듈 order 1~7 완성**: 빌드/런타임(1) → 배포플랫폼(2) → npm scripts(3) → CI/CD(4) → [production-env(5) 미착수] → 모니터링·롤백(6) → CLI(7). "내 컴퓨터의 코드가 사용자에게 도달하고, 도달 후에도 안전하게 관리되는 전 과정"
- 핵심 실무 지점 = 배포 토큰 보안: "토큰을 인자가 아니라 환경변수로"(Vercel 원문)를 앞 강의(env·로그 secret)와 연결. AI 배포 스크립트에서 토큰 인자 노출 검토를 1순위로
- 이 사이트 실제 명령(firebase deploy --only hosting --project)을 EXAMPLE·표로 활용, Firebase는 verbatim quote 없이 프로젝트 근거로 정직하게 표기

## 누적: **67강 released** (67/100) — deployment-ops order 1~4·6·7 배포 완료. 미완: order 5 production-env-and-secrets(소싱 확보 후 별도 작성 예정)
