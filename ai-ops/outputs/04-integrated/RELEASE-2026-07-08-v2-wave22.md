# RELEASE — V2 Wave 22 (2026-07-08)

**판정:** 배포 가능 (npm run verify exit 0, 백그라운드 bxsxbv3hk) / **Executor:** Fable (대행)

## 포함 콘텐츠
- 강의 2강 (deployment-ops 모듈 착수):
  - build-and-runtime (order 1, deep-dive) — build/release/run 3단계, 엄격한 분리, 런타임 코드 수정 불가, 빌드 타임 값 vs 런타임 값
  - npm-scripts-reference (order 3, reference) — scripts 필드, npm run, pre/post 자동 실행 규칙, 생명주기·의존성 스크립트
- 다이어그램 2개: build-release-run.svg(한 방향 흐름), npm-scripts-lifecycle.svg(pre/post 순서)
- 신규 용어 4개: Build Time, Runtime, Release (배포 단계), pre/post script (용어 총 249; "npm scripts"는 기존 등재분 재사용, 중복 회피)
- 근거 KB: T06/build-and-runtime (89), T06/npm-scripts-reference (89)

## 자가 QA
- 분량: 8,010자 / 8,002자 (하한 8,000 충족)
- 각 8섹션, 콜아웃 각 4개(섹션당 ≤2), 하이라이트 섹션당 ≤3 확인
- 원문 인용 각 4개 전부 KB Quote Bank와 글자 단위 일치 (build 4/4: 빌드정의·런타임정의·엄격분리·런타임수정불가 / npm 4/4: scripts역할·pre/post·npm run·의존성)
- **콜아웃 오탐 수정**: build-and-runtime의 EXAMPLE·WARNING 콜아웃이 `> "`로 시작해 인용 파서에 오탐 → 따옴표 제거로 정리(교훈: 콜아웃 본문을 따옴표로 시작하지 말 것)

## 설계 특기
- deployment-ops 모듈 착수 — "내 컴퓨터의 코드가 사용자에게 도달하는 과정"의 첫 두 강의
- build-and-runtime은 앞 모듈들을 배포 관점에서 재조명: nextjs 정적/동적 = 빌드/런타임 사례, env-vars 설정 주입 = 릴리스 단계, 이 사이트 비번 해시 재빌드 필요 = 빌드 타임 값의 산 예시
- npm-scripts는 사람·AI 공통 명령 인터페이스로 프레이밍(scripts = 실행법 목차), 이 사이트 npm run verify를 pre/post 안전장치 예시로 활용
- 두 강의 연결: npm run build가 build-and-runtime의 빌드 단계를 실행

## 인용 품질 노트
- Twelve-Factor(Build-release-run)·npm Docs(scripts) 모두 안정적 정형 문서 — verbatim 신뢰 높음. WebFetch 일시 장애로 1회 재시도 후 성공

## 누적: **63강 released** (63/100) — deployment-ops 모듈 order 1·3 착수 (order 2 deployment-platforms, 4~7 KB 대기)
