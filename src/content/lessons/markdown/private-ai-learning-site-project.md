## 한 줄 정의

비공개 AI 학습 사이트 완성 프로젝트는 이 커리큘럼의 캡스톤입니다 — 지금 여러분이 읽고 있는 **이 사이트 자체**를 완성 사례로 삼아, 비공개 접근 보호·콘텐츠 파이프라인·정적 배포·AI 확장(검색 챗봇)을 하나의 프로젝트로 통합합니다. 보호의 뼈대는 인증 개념의 3분할입니다: "Authentication: Verifies if the user is who they say they are."와 "Authorization: Decides what routes and data the user can access." — 누구인지 확인하는 것과 무엇을 볼 수 있는지 정하는 것은 다른 층입니다. ==캡스톤의 목표는 새 기술이 아니라 통합입니다 — 99강에서 배운 조각들이 실제 서비스 하나로 조립되는 과정을 확인하는 것==입니다.

100번째 강의가 이 사이트를 다루는 이유는 단순합니다: 여러분이 지금 그 결과물 안에 있고, 리포지토리의 모든 결정을 직접 열어볼 수 있기 때문입니다.

참고: 이 강의가 서술하는 "비공개 모드"는 이 사이트의 초기 운영(설계~100강 완성) 사례입니다. 100강 완성 직후인 2026-07, 사이트는 인용 정책을 공개 기준(짧은 인용)으로 정리한 뒤 게이트·noindex를 제거하고 **무료 공개로 전환**했습니다. 즉 여러분은 지금 이 강의 속 "공개 전환" 시나리오가 실제로 실행된 뒤의 사이트를 보고 있습니다 — 비공개 설계는 그대로 살아 있는 학습 사례입니다.

![비공개 AI 학습 사이트: 접근 보호(게이트+noindex) · 콘텐츠 파이프라인(markdown→정적 빌드) · 배포(Firebase Hosting) · AI 확장(retrieval 챗봇)의 4층 구조](/lesson-diagrams/private-ai-learning-site-project/site-architecture.svg)

## 왜 존재하는가

학습 사이트를 "만들 줄 아는 것"과 "완성해서 운영하는 것"은 다릅니다. 완성에는 기능 외의 결정이 따라옵니다 — 누구에게 보일 것인가(접근 보호), 콘텐츠를 어떻게 쌓을 것인가(파이프라인), 어떻게 내보낼 것인가(배포), 그리고 AI를 어디까지 붙일 것인가(확장 경계). 이 결정들은 각 강의에서 하나씩 배웠지만, 실제 프로젝트에서는 동시에 서로를 제약합니다.

예를 들어 이 사이트는 "비공개"를 선택했습니다. 그 선택 하나가 연쇄를 만듭니다: 검색 엔진에 노출되지 않아야 하므로 robots가 크롤링을 차단하고, 방문자는 비밀번호를 통과해야 하므로 게이트가 필요하며, 정적 호스팅에는 서버 미들웨어가 없으므로 게이트는 클라이언트에서 동작해야 하고, 클라이언트 번들은 공개물이므로 비밀번호가 아닌 SHA-256 해시만 번들에 들어가야 합니다. ==하나의 요구("비공개")가 아키텍처 전 층의 결정을 강제하는 것 — 이것이 캡스톤에서 배우는 통합 감각==입니다.

Vercel이 플랫폼 기능으로 제공하는 것("Password Protection requires visitors to enter a pre-defined password")과 같은 목적을, 이 사이트는 정적 호스팅 제약 안에서 클라이언트 게이트로 달성했습니다. 같은 요구, 다른 제약, 다른 구현 — 이 비교가 설계 판단의 교재입니다.

## 작동 원리

### 1층 — 접근 보호: 게이트와 noindex

비공개의 구현은 두 겹입니다. 첫째, 검색 노출 차단 — robots 설정으로 크롤링을 막고 noindex를 겁니다(Next.js는 robots.txt를 파일 규약으로 지원합니다). 둘째, 방문 게이트 — 이 사이트의 `src/components/site/PasswordGate.tsx`는 입력값을 SHA-256으로 해시해 빌드 타임에 주입된 해시(`NEXT_PUBLIC_SITE_PASSWORD_HASH`, gitignored `.env.local`)와 비교합니다. 통과 상태는 localStorage에 저장되고, 해시가 바뀌면 자동 재잠금됩니다.

인증 3분할로 보면 이 게이트는 얇은 authentication("이 비밀번호를 아는 사람인가")이고, authorization은 전원 동일("통과하면 전부 열람")로 단순화되어 있습니다 — 1인 학습 사이트라는 요구에 맞춘 의도적 단순화입니다.

### 2층 — 콘텐츠 파이프라인: markdown이 단일 진실

콘텐츠는 `src/content/lessons/markdown/*.md`(강의 100편), `src/content/curriculum.ts`(메타), `src/content/glossary.ts`(용어)로 관리됩니다. 다이어그램 SVG는 강의별 폴더에 있고 마크다운이 `![...]`로 참조합니다. 빌드는 이 파일들을 읽어 정적 페이지로 렌더합니다 — CMS도 DB도 없이, Git이 콘텐츠의 버전 관리와 리뷰(diff)를 담당합니다.

이 구조의 이점은 검증 가능성입니다. `npm run verify` 한 명령이 lint→typecheck→test→build를 묶어, 콘텐츠 추가가 사이트를 깨뜨리지 않는지 기계적으로 확인합니다. 이 커리큘럼의 모든 강의가 이 관문을 통과해 릴리스됐습니다.

### 3층 — 정적 배포: export와 Firebase Hosting

`next.config`의 `output: "export"`가 전체 사이트를 정적 HTML로 내보내고, `npx firebase-tools deploy --only hosting --project ju0o-ec967`이 그 결과물을 올립니다. 서버 런타임이 없으므로 서버 취약점 표면도 없고, 비용도 낮습니다. 대가는 제약입니다 — 서버 미들웨어 인증 불가(그래서 클라이언트 게이트), 요청 시점 렌더 불가(그래서 빌드 타임 주입).

배포 절차는 99번 강의의 체크리스트 그대로입니다: verify 녹색 → 보호 장치 확인 → 배포 → URL 열어 확인.

### 4층 — AI 확장: retrieval 챗봇의 설계 경계

다음 확장은 "이 사이트의 강의·용어를 검색해 답하는 챗봇"입니다. 원리는 retrieval — "Search your data using semantic similarity." 강의·KB를 의미 검색해 관련 조각을 찾고, 그것을 근거로 답합니다. 대화형이 되려면 상태 관리가 필요합니다 — "preserving information across multiple messages or turns"가 conversation state의 정의입니다.

이때 데이터 노출 경계가 다시 등장합니다. Next.js 데이터 보안 문서의 원칙 "Return safe, minimal Data Transfer Objects (DTOs)."는 챗봇에도 적용됩니다 — 검색 결과를 통째로 넘기지 않고, 답에 필요한 최소 조각만 전달합니다. 비공개 사이트의 챗봇이라면 챗봇 자체도 게이트 뒤에 있어야 하며, 외부 API로 나가는 콘텐츠 범위를 의식적으로 정해야 합니다.

## 스펙과 세부

### 이 리포지토리에서 직접 확인할 것

캡스톤 실습은 읽기에서 시작합니다: (1) `src/components/site/PasswordGate.tsx` — 해시 비교와 재잠금 로직. (2) `src/content/curriculum.ts` — 13모듈 100강의 메타 구조. (3) `ai-ops/` — 콘텐츠가 KB(출처 검증) → 강의(V2 형식) → 통합 → verify → 릴리스로 흐른 파이프라인 기록. (4) 배포 가이드 — 비밀번호 변경·재배포 절차. 코드와 운영 기록이 모두 열려 있는 것이 이 교재의 특권입니다.

### 비공개 모드와 인용 정책의 결합

비공개 운영 기간(모드 A)에는 학습 목적의 긴 원문 인용을 허용하되 모든 인용에 출처 링크+해설을 강제했고, 공개(모드 B) 전환 때는 실제로 인용 전수 정리 — 장문 인용의 링크 강등, 강의당 짧은 인용 소수 유지 — 를 선행했습니다. 접근 보호가 콘텐츠 정책과 묶여 있는 사례로, "누가 보는가"가 "무엇을 실을 수 있는가"를 결정합니다.

### 확장할 때 지킬 순서

챗봇 같은 확장을 붙일 때의 순서는 커리큘럼이 가르친 그대로입니다: 요구를 작업으로 분해(requirement-to-task) → 위험 분류(고위험: 게이트 우회 가능성, 데이터 유출) → 작은 단계로 구현·검증(prompt-to-implementation) → AI 출력 리뷰 → verify → 배포 체크리스트. 캡스톤의 완성 조건은 기능이 아니라 이 절차의 준수입니다.

## 원문으로 읽기

> "Authentication: Verifies if the user is who they say they are."
>
> — 인증: 사용자가 자신이 주장하는 사람이 맞는지 확인한다.
> [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication)

인증 3분할의 첫 층입니다. 이 사이트의 게이트는 "비밀번호를 아는 사람인가"라는 얇은 인증입니다.

> "Authorization: Decides what routes and data the user can access."
>
> — 인가: 사용자가 어떤 라우트와 데이터에 접근할 수 있는지 결정한다.
> [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication)

인증과 구분되는 인가의 정의입니다. 이 사이트는 "통과 시 전부"로 단순화했지만, 다인 사용 시 이 층이 분화됩니다.

> "Password Protection requires visitors to enter a pre-defined password"
>
> — Password Protection은 방문자에게 사전 정의된 비밀번호 입력을 요구한다.
> [Vercel Docs — Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection)

같은 요구의 플랫폼 구현입니다. 이 사이트는 정적 호스팅 제약 때문에 같은 목적을 클라이언트 게이트로 달성했습니다 — 요구와 제약이 구현을 가르는 사례입니다.

관련 원문(링크): [Next.js Docs — Data Security](https://nextjs.org/docs/app/guides/data-security)

데이터 최소 노출 원칙입니다. AI 챗봇 확장에서 검색 결과를 통째로 넘기지 않는 근거가 됩니다.

관련 원문(링크): [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval)

AI 확장(4층)의 원리입니다. 강의·용어를 의미 검색해 답의 근거로 씁니다.

관련 원문(링크): [OpenAI Docs — Conversation State](https://developers.openai.com/api/docs/guides/conversation-state)

대화형 확장의 상태 관리 정의입니다. 챗봇이 문맥을 이어가려면 이 층이 필요합니다.

## 실전에서

### 리포지토리를 교재로 읽는다

PasswordGate, curriculum.ts, ai-ops/ 파이프라인 기록을 직접 엽니다. "왜 이렇게 했나"를 각 강의의 원칙과 대조하며 읽으면, 코드가 커리큘럼의 답안지가 됩니다.

### 자기 버전을 변형으로 만든다

같은 구조로 자신의 학습 사이트를 만들되, 한 가지 요구를 바꿔봅니다 — 예: "가족 3인 공유"로 바꾸면 authorization 층이 분화되고, "공개"로 바꾸면 인용 정책이 바뀝니다. 요구 하나가 만드는 연쇄를 직접 겪는 것이 최고의 연습입니다.

### AI 확장은 읽기 전용부터

챗봇을 붙인다면 MCP 프로젝트의 원칙대로 읽기 전용 retrieval부터 시작합니다. 콘텐츠 수정 능력은 검증 절차가 자리 잡은 뒤에 추가합니다.

### 완성 조건을 절차로 정의한다

"기능이 돌아간다"가 아니라 "verify 녹색 + 보호 장치 확인 + 배포 후 URL 확인"을 완성 조건으로 둡니다. 이 커리큘럼의 100강이 전부 그 조건으로 릴리스됐습니다.

## 한계와 트레이드오프

첫 번째 trade-off는 클라이언트 게이트의 보안 수준입니다. 정적 사이트의 클라이언트 게이트는 서버 인증보다 약합니다 — 번들과 콘텐츠 파일 자체는 URL을 아는 사람에게 기술적으로 도달 가능합니다. 해시만 번들에 넣어 비밀번호 원문은 지키지만, 기밀 데이터급 보호는 아닙니다. 1인 학습 노트라는 위험 수준에 맞춘 선택이며, 요구가 올라가면 서버 인증(미들웨어·플랫폼 보호)으로 이행해야 합니다.

두 번째 한계는 정적 export의 확장 제약입니다. 챗봇 같은 동적 기능은 정적 사이트 밖의 실행 환경(별도 API, 엣지 함수)이 필요합니다. 4층 확장은 "정적 본체 + 동적 부속"의 이중 구조가 되며, 그 경계에서 인증을 다시 설계해야 합니다.

세 번째 한계는 1인 규모의 단순화입니다. 이 사이트의 많은 결정(전원 동일 권한, localStorage 세션, Git 직접 커밋)은 1인 운영이라 성립합니다. 다인·팀 규모에서는 mini-saas-architecture 강의의 구조(역할 기반 인가, DB 세션)가 필요합니다 — 단순화는 규모의 함수임을 기억해야 합니다.

네 번째 한계는 캡스톤의 시점 고정입니다. 이 강의가 묘사한 구조는 2026-07 시점의 스냅샷입니다. 사이트가 진화하면(챗봇 추가, 공개 전환) 이 강의도 갱신 대상이 됩니다 — 콘텐츠 리프레시 절차가 이 강의 자신에게 적용되는, 자기 참조적 마무리입니다.

## 더 읽기

이 강의의 근거 KB는 `private-ai-learning-site-project`입니다. 원문은 Next.js Authentication(인증/인가 분리), Data Security(최소 DTO), robots 파일 규약, Vercel Password Protection(플랫폼 보호), OpenAI Retrieval(의미 검색)과 Conversation State(대화 상태)입니다.

이 캡스톤은 커리큘럼 전체를 선행 강의로 삼지만, 특히 `mini-saas-architecture`(인증·인가 구조), `ai-chatbot-project`(4층 확장의 상세), `deployment-checklist-playbook`(배포 절차), `production-env-and-secrets`(해시 주입의 원리)와 직결됩니다. 여기까지 왔다면 커리큘럼 100강이 완성입니다 — 다음 단계는 이 사이트의 다음 버전을 여러분이 직접 설계하는 것입니다.
