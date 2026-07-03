# AI Vibe Coding Master

AI Vibe Coding Master는 개발 기초부터 최신 AI 엔지니어링 개념까지 순서대로 읽고, 검색하고, 체크리스트를 완료하며 공부하는 교재형 웹 학습 사이트입니다.

## V1 설계

V1은 "완성도 높은 교재형 사이트의 뼈대"에 집중합니다.

- 홈 화면: 학습 목표, 진행률, 다음 추천 강의, 핵심 기능 안내
- 전체 커리큘럼: 13개 학습 영역과 샘플 강의 연결
- 강의 상세: 요청한 13개 고정 섹션, 이전/다음 이동, 사이드바 목차
- 학습 기능: 로컬 저장소 기반 진행률, 체크리스트, 북마크, 확인 퀴즈, 설명 연습 초안 저장
- 검색: 강의, 용어, 공식 문서 통합 검색
- 용어 사전: 개발 및 AI 시스템 용어 검색
- 공식 문서: MDN, TypeScript, React, Next.js, Git, PostgreSQL, OWASP, OpenAI, MCP 링크
- UI: 모바일 반응형, 다크모드, 초보자 친화적 교재형 레이아웃

## 폴더 구조

```txt
src/
  app/                    Next.js App Router 페이지
  components/             공통 레이아웃, 강의, UI 컴포넌트
  content/                커리큘럼, 용어, 공식 문서, Markdown 강의 원문
  features/               진행률, 검색, 다크모드, 용어 브라우저
  lib/                    강의 파서, 검색, 진행률 순수 로직
```

## 콘텐츠 구조

강의 본문은 `src/content/lessons/markdown/*.md`에 Markdown으로 관리합니다. 각 강의는 반드시 아래 13개 제목을 포함해야 합니다.

1. 오늘 배울 것
2. 한 줄 정의
3. 쉬운 비유
4. 왜 생겼는가
5. 어떤 문제를 해결하는가
6. 핵심 개념
7. 실제 예시
8. 코드 예시
9. AI 시대에서의 의미
10. 자주 헷갈리는 것
11. 실무에서 쓰는 방식
12. 공부 체크리스트
13. 참고 출처

메타데이터와 커리큘럼 순서는 `src/content/curriculum.ts`에서 관리합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 검증 명령

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

한 번에 실행하려면:

```bash
npm run verify
```

## 확장 방향

- Markdown을 MDX로 바꿔 예제 컴포넌트와 퀴즈를 본문에 직접 삽입
- 로컬 저장소 진행률을 사용자 계정과 DB 저장으로 교체
- 강의별 퀴즈 점수 기록과 설명 연습 답안 피드백
- AI 생성 학습 플랜, 복습 알림, 프로젝트형 실습 교재 추가
