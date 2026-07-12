---
id: private-ai-learning-site-project
title: "비공개 AI 학습 사이트 완성 프로젝트 (Private AI Learning Site Project)"
topicGroup: T12
status: approved
score: 89
level: 중급
prerequisites: [ai-chatbot-project, mini-saas-architecture, deployment-checklist-playbook]
successors: []
related: [mcp-enabled-tool-project, production-env-secrets, context-engineering]
consumers:
  lessons: [private-ai-learning-site-project]
  glossary: []
sources:
  - { title: "Next.js Docs — Authentication", url: "https://nextjs.org/docs/app/guides/authentication", checked: 2026-07-12 }
  - { title: "Next.js Docs — Data Security", url: "https://nextjs.org/docs/app/guides/data-security", checked: 2026-07-12 }
  - { title: "Next.js Docs — robots.txt", url: "https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots", checked: 2026-07-12 }
  - { title: "Vercel Docs — Password Protection", url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Retrieval", url: "https://developers.openai.com/api/docs/guides/retrieval", checked: 2026-07-12 }
  - { title: "OpenAI Docs — Conversation State", url: "https://developers.openai.com/api/docs/guides/conversation-state", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
비공개 AI 학습 사이트 완성 프로젝트는 이 교재 사이트를 사례로 삼아 인증, 세션, 권한, noindex/robots, 배포 보호, 검색/RAG, 챗봇 상태 관리, 운영 체크리스트를 하나의 제품으로 묶는 최종 프로젝트다. 학습자는 새 기능을 무작정 붙이는 것이 아니라 "누가 접근할 수 있고, 어떤 데이터가 노출되며, 어떤 AI 기능이 어떤 근거를 쓰는가"를 설계한다.

## 역사
학습 사이트는 전통적으로 공개 문서나 LMS 형태였지만, AI 시대에는 개인화된 설명, 질의응답, 검색, 진도 추적, 도구 호출을 포함하는 SaaS형 학습 제품으로 확장된다. Next.js authentication guide는 auth를 authentication, session management, authorization으로 나누고, data security guide는 Data Access Layer와 DTO를 통해 서버 데이터 노출을 줄이는 방법을 설명한다. 여기에 Vercel password protection과 robots metadata, OpenAI retrieval/conversation state가 결합되면 "비공개 AI 학습 사이트"라는 완성 프로젝트가 된다. (출처: https://nextjs.org/docs/app/guides/authentication, https://nextjs.org/docs/app/guides/data-security, https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection, 확인: 2026-07-12)

## 해결하려는 문제
AI 학습 사이트는 공개 블로그처럼 만들면 개인 진도, 북마크, 설명 연습, 챗봇 질의 기록이 쉽게 노출될 수 있다. 반대로 전부 막아두면 검색, AI 답변, 공유 가능한 학습 흐름이 약해진다. 이 프로젝트는 접근 보호, 검색 엔진 차단, 서버 데이터 최소화, retrieval 근거, conversation state 관리, 배포 보호를 균형 있게 설계해 "나만의 교재형 플랫폼"으로 완성하는 문제를 해결한다.

## 핵심 개념
1. **Auth 3분할**: Next.js는 authentication, session management, authorization을 별도 개념으로 설명한다. 비공개 사이트는 로그인 여부뿐 아니라 어떤 route/data를 볼 수 있는지도 결정해야 한다. (출처: https://nextjs.org/docs/app/guides/authentication, 확인: 2026-07-12)
2. **Data Access Layer**: Next.js data security guide는 new project에서 dedicated DAL을 권장하고, server-only 실행, authorization checks, safe minimal DTO 반환을 제시한다. 학습 진도와 사용자별 메모는 DTO로 최소화한다. (출처: https://nextjs.org/docs/app/guides/data-security, 확인: 2026-07-12)
3. **robots/noindex 보조 장치**: Next.js robots.txt convention은 crawler가 접근 가능한 URL을 알려주는 파일을 app root에서 추가/생성할 수 있게 한다. robots는 접근 제어가 아니라 검색 엔진 힌트이므로 password/auth와 함께 써야 한다. (출처: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots, 확인: 2026-07-12)
4. **Deployment password protection**: Vercel password protection은 deployment 접근 전 predefined password 입력을 요구한다. production domain 보호 가능 여부와 plan/scope를 확인해야 한다. (출처: https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection, 확인: 2026-07-12)
5. **Retrieval 기반 검색**: OpenAI retrieval guide는 semantic similarity로 data search를 수행하고, vector store가 data index 역할을 한다고 설명한다. 강의/용어/KB 검색 챗봇의 근거층이 된다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)
6. **Conversation state**: OpenAI conversation state guide는 여러 turn에 걸친 정보를 보존하는 방법을 설명한다. 학습 챗봇은 lesson context, user question, tool output, previous response를 상태로 관리해야 한다. (출처: https://developers.openai.com/api/docs/guides/conversation-state, 확인: 2026-07-12)

## 관련 기술
- mcp-enabled-tool-project: 사이트 검색, 용어 lookup, 진도 report를 MCP tool로 노출하는 확장으로 이어진다.
- production-env-secrets: SITE_PASSWORD, API key, bypass secret은 source code에 두지 않는다.
- context-engineering: lesson, KB, glossary, quiz를 어떤 순서로 모델에 제공할지 설계한다.

## 선행 개념
- ai-chatbot-project: retrieval, conversation state, tool boundary가 챗봇 기능의 기반이다.
- mini-saas-architecture: auth, data boundary, user state를 SaaS 구조로 이해해야 한다.
- deployment-checklist-playbook: 비공개 사이트도 build, env, protection, release evidence가 필요하다.

## 후행 개념
이 항목은 100강 완성 프로젝트의 마지막 lesson 근거다. 이후에는 배포 승인, 운영 감사, 콘텐츠 refresh, 학습자 피드백 루프로 확장한다.

## AI 시대에서의 의미
AI 학습 사이트의 차별점은 "챗봇이 있다"가 아니라, 사이트 안의 검증된 지식 구조를 AI가 안전하게 사용하는 것이다. approved KB와 lesson markdown을 retrieval index로 만들고, glossary와 quiz를 tool로 연결하면 답변은 더 근거 기반이 된다. 동시에 비공개 학습 데이터는 DAL과 authorization으로 보호하고, deployment protection과 robots/noindex는 공개 노출 위험을 줄인다.

## 실무 활용
1. **Private gate**: SITE_PASSWORD 또는 platform password protection으로 초기 접근을 제한한다.
2. **Auth/session layer**: 개인 진도와 북마크가 생기면 authentication, session management, authorization을 분리한다.
3. **Learning retrieval**: lesson markdown, KB Quote Bank, glossary를 vector store나 local index에 넣고 source id를 함께 반환한다.
4. **AI explanation coach**: conversation state에 이전 답변과 rubric을 보존해 설명 연습 피드백을 이어간다.
5. **Ops checklist**: noindex/robots, env key, verify report, release note, deployment protection scope를 릴리스마다 확인한다.

```ts
type LearningAnswerContext = {
  lessonSlug: string;
  retrievedSourceIds: string[];
  userProgressScope: "own";
  conversationId?: string;
};
```

## FAQ
Q: robots.txt만 있으면 비공개 사이트가 안전한가?
A: 아니다. robots는 crawler에게 URL 접근 정책을 알려주는 파일이지 인증이 아니다. 비공개 데이터는 password/auth/deployment protection으로 보호해야 한다. (출처: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots, https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection, 확인: 2026-07-12)

Q: 챗봇은 lesson markdown 전체를 매번 넣으면 되는가?
A: 규모가 커지면 retrieval이 필요하다. OpenAI retrieval guide는 semantic similarity search와 vector store를 설명한다. 검색 결과와 source id를 함께 전달한다. (출처: https://developers.openai.com/api/docs/guides/retrieval, 확인: 2026-07-12)

Q: 로그인만 하면 authorization은 끝인가?
A: 아니다. Next.js는 authentication, session management, authorization을 구분한다. 로그인 여부와 route/data access decision은 별도다. (출처: https://nextjs.org/docs/app/guides/authentication, 확인: 2026-07-12)

## 자주 하는 실수
1. **비밀번호 gate와 사용자 권한을 혼동**: password는 입구 보호이고 사용자별 권한은 authorization이다. 교정: 개인 데이터가 생기면 user identity와 session을 분리한다.
2. **server data를 client props로 과다 전달**: 민감 정보가 노출될 수 있다. 교정: DAL에서 safe minimal DTO만 반환한다. (출처: https://nextjs.org/docs/app/guides/data-security, 확인: 2026-07-12)
3. **AI 답변 근거를 저장하지 않음**: 나중에 검증할 수 없다. 교정: retrievedSourceIds, quote/source mapping, answer version을 기록한다.
4. **배포 보호 scope를 확인하지 않음**: preview만 막고 production domain이 열릴 수 있다. 교정: platform protection scope와 site-level gate를 함께 확인한다.

## 공식 출처
- auth 3분할과 form/server action 예시 — [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication) (확인 날짜: 2026-07-12)
- DAL, authorization, DTO — [Next.js Docs — Data Security](https://nextjs.org/docs/app/guides/data-security) (확인 날짜: 2026-07-12)
- robots.txt convention — [Next.js Docs — robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) (확인 날짜: 2026-07-12)
- deployment password protection — [Vercel Docs — Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection) (확인 날짜: 2026-07-12)
- semantic retrieval — [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인 날짜: 2026-07-12)
- conversation state — [OpenAI Docs — Conversation State](https://developers.openai.com/api/docs/guides/conversation-state) (확인 날짜: 2026-07-12)

## Quote Bank
- > "Authentication: Verifies if the user is who they say they are."
  - 출처: [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication) (확인: 2026-07-12)
  - 맥락: auth 3분할 중 authentication을 설명할 때 사용한다.
- > "Authorization: Decides what routes and data the user can access."
  - 출처: [Next.js Docs — Authentication](https://nextjs.org/docs/app/guides/authentication) (확인: 2026-07-12)
  - 맥락: 로그인과 권한 결정을 구분할 때 사용한다.
- > "Return safe, minimal Data Transfer Objects (DTOs)."
  - 출처: [Next.js Docs — Data Security](https://nextjs.org/docs/app/guides/data-security) (확인: 2026-07-12)
  - 맥락: 사용자 데이터 최소 노출 원칙을 설명할 때 사용한다.
- > "Password Protection requires visitors to enter a pre-defined password"
  - 출처: [Vercel Docs — Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection) (확인: 2026-07-12)
  - 맥락: 비공개 접근 보호를 설명할 때 사용한다.
- > "Search your data using semantic similarity."
  - 출처: [OpenAI Docs — Retrieval](https://developers.openai.com/api/docs/guides/retrieval) (확인: 2026-07-12)
  - 맥락: lesson/KB 검색 챗봇의 retrieval 원리를 설명할 때 사용한다.
- > "preserving information across multiple messages or turns"
  - 출처: [OpenAI Docs — Conversation State](https://developers.openai.com/api/docs/guides/conversation-state) (확인: 2026-07-12)
  - 맥락: 설명 연습 챗봇의 multi-turn 상태 관리를 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
