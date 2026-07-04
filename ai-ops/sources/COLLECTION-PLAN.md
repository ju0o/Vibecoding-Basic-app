# 자료 수집 계획서 (Collection Plan)

Source Collector Agent의 작업 목록. 주제군 1개 = 수집 작업 1건 = `sources/notes/{topic}.md` 1개.
주제군 간 완전 병렬 가능. 각 노트는 WF-00 규격을 따른다.

공통 규칙: 모든 항목에 URL+확인 날짜, 공식 출처 우선(SK-01), 버전 의존 정보에 기준 버전 표기.

---

## T01 컴퓨터·개발 기초
- 핵심 질문: 프로그램은 어떻게 실행되는가 / 파일·폴더·경로·확장자는 왜 그렇게 생겼나 / 변수·조건·함수·오류는 무엇을 해결하나 / 터미널은 왜 아직도 쓰나
- 공식 출처: MDN (JavaScript 첫걸음), Microsoft Learn (Windows 기초), Node.js 문서
- 보조 출처: CS50 공개 강의 목차 (구조 참고용, 인용 금지)
- 최신성 확인: 낮음 (기초 개념은 안정적)
- 오개념 주의: "코딩=수학", "터미널=해커 도구", 컴파일과 인터프리트 혼동
- 강의화 예시: 배달 주문 앱에서 일어나는 일을 프로그램 실행 순서로 분해

## T02 웹의 원리·HTML·CSS·JavaScript
- 핵심 질문: 주소창에 URL을 치면 무슨 일이 일어나나 / HTML·CSS·JS의 역할 분리는 왜인가 / 브라우저는 무엇을 하나 / 요청과 응답, 상태 코드
- 공식 출처: MDN (HTTP, HTML, CSS, JS 전 영역 — 이 주제군의 단일 최우선 출처), WHATWG HTML 스펙
- 보조 출처: web.dev (Google)
- 최신성 확인: 중간 (CSS 신기능, JS 연례 스펙 — 기준 연도 표기)
- 오개념 주의: HTML을 "프로그래밍 언어"로 소개, CSS 캐스케이드를 "우선순위 암기"로 환원, JS와 Java 혼동
- 강의화 예시: 이 사이트의 강의 페이지 하나를 뼈대/스타일/행동으로 해부

## T03 TypeScript·React·Next.js
- 핵심 질문: 왜 JS에 타입을 얹었나 / 컴포넌트 사고란 / 상태와 렌더링의 관계 / Next.js가 React에 더하는 것(라우팅, 서버 컴포넌트, 빌드)
- 공식 출처: typescriptlang.org/docs, react.dev, nextjs.org/docs
- 보조 출처: 각 공식 블로그(버전 역사)
- 최신성 확인: **높음** — React·Next.js 메이저 버전마다 권장 패턴이 바뀜. 수집 시점 버전 고정 필수
- 오개념 주의: "TS는 JS와 다른 언어", 서버/클라이언트 컴포넌트 경계, useEffect 남용 패턴
- 강의화 예시: 이 사이트 자체가 Next.js — LessonCard 컴포넌트를 예제로 사용

## T04 Git·GitHub
- 핵심 질문: 버전 기록은 무엇을 저장하나 / 브랜치·머지·충돌 / 커밋과 푸시의 차이 / PR·리뷰 협업 흐름 / 되돌리기 3종(checkout/revert/reset) 구분
- 공식 출처: git-scm.com/doc (Pro Git), docs.github.com
- 보조 출처: GitHub Blog
- 최신성 확인: 낮음~중간 (핵심 안정, GitHub 기능은 변동)
- 오개념 주의: Git과 GitHub 동일시, "커밋=저장 버튼" 수준 이해, force push의 위험 과소평가
- 강의화 예시: 이 저장소의 실제 커밋 이력으로 설명

## T05 API·Database
- 핵심 질문: API는 왜 계약인가 / REST의 관례 / 상태 코드가 말해주는 것 / 관계형 DB와 테이블 설계 / SQL 기본 동사 4개 / 인덱스는 왜 빠른가
- 공식 출처: MDN (HTTP), postgresql.org/docs, IETF RFC 9110(HTTP 의미론)
- 보조 출처: OpenAPI 스펙 문서
- 최신성 확인: 낮음
- 오개념 주의: "REST=JSON", GET과 POST를 "가져오기/보내기"로만 이해, NoSQL이 항상 더 빠르다는 속설
- 강의화 예시: "글 저장 버튼" 클릭 한 번의 화면→API→DB 왕복 (기존 api-db-backend-flow 강의와 경계 조정)

## T06 Firebase·Supabase (BaaS)
- 핵심 질문: BaaS가 대신해주는 것과 대신 못 해주는 것 / Firebase와 Supabase의 구조 차이(NoSQL vs Postgres) / 인증·실시간·스토리지 기능 지도 / 무료 티어의 한계
- 공식 출처: firebase.google.com/docs, supabase.com/docs
- 보조 출처: 두 서비스의 공식 블로그·가격 페이지
- 최신성 확인: **높음** — 기능·가격 변동 잦음. 확인 날짜 필수, 가격 수치는 본문에 넣지 말고 링크로
- 오개념 주의: "서버리스=서버 없음", Firebase 보안 규칙 생략 위험, Supabase RLS를 옵션으로 착각
- 강의화 예시: 같은 "회원가입+글 저장"을 Firebase와 Supabase로 비교 설계

## T07 배포·Vercel·인증·보안
- 핵심 질문: 빌드와 배포의 차이 / 환경 변수와 시크릿 / Vercel의 배포 모델(프리뷰·프로덕션) / 세션 vs 토큰 인증 / OWASP Top 10 중 입문자가 저지르는 것
- 공식 출처: vercel.com/docs, owasp.org (Top 10), MDN (웹 보안), nextjs.org/docs (배포)
- 보조 출처: Vercel Blog
- 최신성 확인: 중간~높음 (Vercel 기능 변동)
- 오개념 주의: "환경 변수는 숨겨진다"(클라이언트 노출 변수 구분), HTTPS면 안전하다는 착각, API 키를 프론트에 넣는 실수
- 강의화 예시: 이 사이트를 Vercel에 배포하는 실제 과정

## T08 LLM·Prompt Engineering
- 핵심 질문: LLM은 무엇을 학습하고 무엇을 못 하나 / 토큰·컨텍스트 윈도 / 환각은 왜 생기나 / 좋은 프롬프트의 구조(성공 기준→검증→반복) / 모델 선택 기준
- 공식 출처: platform.claude.com/docs (프롬프트 가이드), platform.openai.com/docs, Anthropic Engineering 블로그
- 보조 출처: 두 회사 공식 프롬프트 튜토리얼
- 최신성 확인: **매우 높음** — 모델·권장 기법이 분기 단위로 변동. 모든 주장에 기준 날짜
- 오개념 주의: "AI가 이해한다"는 의인화, "프롬프트 마법 문구" 신앙, 환각을 버그로만 이해
- 강의화 예시: 같은 요청의 나쁜/좋은 프롬프트 비교와 결과 차이

## T09 RAG·Tool Calling·MCP
- 핵심 질문: 모델이 모르는 것을 어떻게 알려주나(RAG) / 검색·임베딩·주입의 파이프라인 / Tool Calling은 어떻게 동작하나(스키마→호출→결과 주입) / MCP가 표준화하는 것(서버·클라이언트·도구·리소스)
- 공식 출처: modelcontextprotocol.io, platform.claude.com/docs (tool use), platform.openai.com/docs (function calling)
- 보조 출처: Anthropic·OpenAI 엔지니어링 블로그
- 최신성 확인: **매우 높음** — MCP 스펙 진화 중
- 오개념 주의: "RAG=검색만 붙이면 끝", Tool Calling에서 모델이 도구를 "실행"한다는 오해(실행은 앱이 함), MCP와 Tool Calling의 층위 혼동
- 강의화 예시: 이 사이트의 용어 사전을 RAG 소스로 쓰는 사고 실험
- **커리큘럼 갭**: 현 backlog에 RAG·Tool Calling 강의 없음 → CURRICULUM-MAP에 추가 제안 반영

## T10 Agent 계열 (Workflow·Agent·SubAgent·Multi-Agent·Orchestration·Loop·Harness)
- 핵심 질문: Workflow와 Agent의 공식 구분 / Agent 루프(관찰→판단→행동) / SubAgent 위임과 컨텍스트 격리 / 멀티 에이전트 협업 패턴 / 루프 종료 조건·폭주 방지 / 하네스(권한·샌드박스·검증)
- 공식 출처: Anthropic "Building effective agents", "Effective context engineering for AI agents", code.claude.com/docs (subagents, hooks), OpenAI Agents 가이드
- 보조 출처: 각사 엔지니어링 블로그
- 최신성 확인: **매우 높음**
- 오개념 주의: "에이전트=자동화 전부", 복잡한 구조 선호 편향(공식 권고는 단순성 우선), Orchestration을 도구 이름으로 착각
- 강의화 예시: **이 프로젝트의 ai-ops 파이프라인 자체** (실존 예시)

## T11 AI 코딩 도구 (AI IDE·Claude Code·Codex·Cline·Trae)
- 핵심 질문: 자동완성형·챗형·에이전트형 도구의 구분 / 각 도구의 구조(터미널/IDE/클라우드) / 권한·검증·되돌리기 관점의 도구 비교 / 도구가 바뀌어도 남는 역량은 무엇인가
- 공식 출처: code.claude.com/docs, OpenAI Codex 문서, Cline 공식 문서(GitHub), Trae 공식 문서
- 보조 출처: 각 도구 릴리스 노트
- 최신성 확인: **매우 높음** — 도구 기능 월 단위 변동. 강의는 "도구 독립적 원리 + 도구별 현황 링크" 구조로 설계해 노후화 내성 확보
- 오개념 주의: 특정 도구 튜토리얼로 전락(원리 없이 단축키만), 벤더 마케팅 문구 무비판 인용
- 강의화 예시: 같은 버그 수정을 두 도구로 시연하고 공통 원리 추출

## T12 SaaS·실전 바이브코딩 운영
- 핵심 질문: SaaS의 구성 요소(인증·결제·멀티테넌시·운영) / 요구사항→작업 분해→구현→검증 루틴 / AI와 협업할 때의 요구사항 작성법 / 실패 복구(롤백·로그) 루틴
- 공식 출처: 위 T03~T07 출처의 조합 + Vercel/Supabase 공식 아키텍처 가이드
- 보조 출처: 공개 SaaS 아키텍처 사례(참고용)
- 최신성 확인: 중간
- 오개념 주의: "일단 만들면 서비스가 된다"(운영 비용 무시), MVP와 미완성 혼동
- 강의화 예시: project-textbook 모듈의 프로젝트 4종과 직결 (SaaS, 관리자 도구, AI 챗봇, 자동화)

---

## 수집 우선순위 (커리큘럼 생산 순서와 동기화)

| 순위 | 주제군 | 이유 |
|---|---|---|
| 1 | T10, T09 | ai-system-design 모듈 backlog 12건이 승인됨 — 즉시 필요 |
| 2 | T08 | ai-basics가 ai-system-design의 선행 모듈 |
| 3 | T02, T01 | 입문 트랙의 뿌리 — 신규 학습자 이탈 방지 |
| 4 | T03, T04, T05 | 기초 트랙 본체 |
| 5 | T06, T07 | 중급 실무 트랙 |
| 6 | T11, T12 | 도구·실전 (변동성 높아 늦게 수집할수록 신선) |
