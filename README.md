# AI Vibe Coding Master

비개발자가 AI와 함께 **개발의 원리**를 이해할 수 있도록, 개인적인 학습 과정에서 정리한 자료를 **비영리·무료**로 공개한 교재형 웹 사이트입니다.

> 이 프로젝트는 개인적인 학습 과정에서 정리한 자료를 같이 공부하고 함께 발전시키기 위해 무료 공개하고 있습니다.

## 무엇을 배우나요

프롬프트 “사용법”만이 아니라, AI가 만들어 내는 구조—파일·프론트엔드·백엔드·API·Git·배포·보안·AI 시스템—를 읽고 설명할 수 있게 됩니다.

- 13개 모듈 · 약 100강 (V2 심층 형식)
- 용어 사전 · 공식 문서 링크 · 로컬 진행률/북마크
- 검색, 다크모드, 모바일 반응형

## 강의 형식 (V2)

각 강의 본문(`src/content/lessons/markdown/*.md`)은 다음 8개 섹션을 사용합니다.

1. 한 줄 정의  
2. 왜 존재하는가  
3. 작동 원리  
4. 스펙과 세부  
5. 원문으로 읽기  
6. 실전에서  
7. 한계와 트레이드오프  
8. 더 읽기  

메타데이터는 `src/content/curriculum.ts`에서 관리합니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 을 엽니다.

## 검증·배포

```bash
npm run verify   # lint + typecheck + test + build (sitemap 생성 포함)
```

정적 결과는 `out/` 에 생성됩니다. Firebase Hosting 예:

```bash
npx firebase-tools deploy --only hosting --project ju0o-ec967
```

공개 URL(기본): `https://ju0o-ec967.web.app`  
환경 변수(선택): `NEXT_PUBLIC_SITE_URL` — canonical/OG 기준 URL

## 라이선스·고지

- 소프트웨어: MIT (루트 `LICENSE`)
- 교육 콘텐츠: 개인 학습·비영리 교육 목적 무료 이용 (상세는 `LICENSE`)
- 제3자 패키지·폰트: `THIRD_PARTY_NOTICES.md`
- 인용 정책: `ai-ops/qa/CITATION-POLICY.md` (Mode B 공개)

## 문의

Instagram [@ju0o___](https://www.instagram.com/ju0o___/) — 오류·개선 의견 DM 환영

## 폴더 구조

```txt
src/
  app/                    페이지 (홈, 커리큘럼, 강의, 소개, privacy/terms 등)
  components/             레이아웃·강의 UI
  content/                커리큘럼, 용어, 강의 Markdown, 다이어그램
  features/               진행률, 검색, 테마
  lib/                    파서·검색·진행률 로직
```
