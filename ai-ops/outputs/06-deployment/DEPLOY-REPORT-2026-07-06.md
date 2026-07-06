# Deployment Report — 2026-07-06

**Status:** DEPLOYED (비공개 학습 모드 A)
**URL:** https://ju0o-ec967.web.app
**방식:** Next.js 정적 내보내기(`output: "export"` → `out/`) → Firebase Hosting (`firebase deploy --only hosting`, 프로젝트 ju0o-ec967)
**Executor:** Fable (대행 — 운영자 지시: 토큰 소진 전 선배포)

## 포함 콘텐츠
- V2 강의 47강 (SSG 47 paths), 다이어그램 SVG 20개, 용어 사전 ~170개, 커리큘럼·검색·진행률

## 보호 상태 (CITATION-POLICY §0-1 모드 A)
- [x] `robots.txt` 전체 차단 (`Disallow: /`) — out/에 포함 확인
- [x] 전 페이지 `noindex` 메타 — out/index.html에서 확인
- [x] 화면 비밀번호 게이트 (D-03) — SHA-256 해시 비교, 평문 미포함, 해제 상태는 브라우저 localStorage
- 비밀번호 설정·변경: [../../DEPLOY-GUIDE.md](../../DEPLOY-GUIDE.md)

## 검증
- npm run lint / build (정적 export) PASS — 47 lesson HTML + 20 SVG + robots.txt 산출 확인
- 배포 후 URL 접속 확인: 정상 응답, 타이틀 렌더링 확인

## 특기 (구조 변경 — D-03)
- Basic Auth 미들웨어 제거: 정적 호스팅에서 실행 불가 + SITE_PASSWORD 미설정 시 503으로 "입력 기회 없는 차단"을 유발하던 원인
- 다이어그램 라우트 force-static + generateStaticParams 전환

## 재배포 절차
DEPLOY-GUIDE.md §3 — Cline 위임 가능 (P-09)
