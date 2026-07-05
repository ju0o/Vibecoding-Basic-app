import type { CurriculumModule, LessonMeta } from "@/content/schema"

export const CURRICULUM_MODULES = [
  {
    id: "getting-started",
    order: 1,
    title: "시작하기",
    description: "AI 바이브코딩을 공부하는 목적, 사이트 사용법, 설명형 학습 루틴을 잡습니다.",
    goal: "학습자가 개발과 AI를 다시 배울 준비를 갖춘다.",
  },
  {
    id: "development-basics",
    order: 2,
    title: "개발 기초",
    description: "프로그램, 파일, 폴더, 변수, 조건문, 함수, 오류를 생활 언어로 연결합니다.",
    goal: "코드가 제품 행동을 만드는 과정을 설명할 수 있다.",
  },
  {
    id: "web-basics",
    order: 3,
    title: "웹 개발 기초",
    description: "HTML, CSS, JavaScript, 브라우저, 요청과 응답을 화면 중심으로 배웁니다.",
    goal: "웹 화면의 뼈대, 스타일, 행동을 분리해서 이해한다.",
  },
  {
    id: "frontend-frameworks",
    order: 4,
    title: "프론트엔드 프레임워크",
    description: "React, TypeScript, Next.js가 왜 등장했는지와 컴포넌트 사고를 익힙니다.",
    goal: "화면을 재사용 가능한 조각으로 설계할 수 있다.",
  },
  {
    id: "git-collaboration",
    order: 5,
    title: "Git & 협업",
    description: "버전 기록, 브랜치, 리뷰, 되돌리기, 협업 흐름을 학습합니다.",
    goal: "작업 이력을 안전하게 남기고 공유할 수 있다.",
  },
  {
    id: "data-backend",
    order: 6,
    title: "데이터와 백엔드",
    description: "API, DB, 인증, 상태 코드, 서버가 제품 기능을 지탱하는 방식을 배웁니다.",
    goal: "화면 뒤에서 데이터가 오가는 경로를 설명할 수 있다.",
  },
  {
    id: "deployment-ops",
    order: 7,
    title: "배포와 운영",
    description: "빌드, 배포, 환경 변수, 로그, 모니터링, 장애 대응의 기본을 다룹니다.",
    goal: "내 컴퓨터의 코드가 사용자에게 도달하는 과정을 이해한다.",
  },
  {
    id: "ai-basics",
    order: 8,
    title: "AI 활용 기초",
    description: "프롬프트, 맥락, 예시, 검증, 반복 개선의 기본기를 배웁니다.",
    goal: "AI에게 좋은 작업 지시를 만들고 결과를 검증한다.",
  },
  {
    id: "ai-coding-tools",
    order: 9,
    title: "AI 코딩 도구",
    description: "ChatGPT, Codex, IDE 에이전트, 코드 리뷰 도구의 역할과 한계를 익힙니다.",
    goal: "도구를 믿는 대신 검증하며 협업한다.",
  },
  {
    id: "ai-system-design",
    order: 10,
    title: "AI 시스템 설계",
    description: "Context Engineering, MCP, Skills, Workflow, Agent 구조를 순서대로 학습합니다.",
    goal: "AI 기능을 일회성 프롬프트가 아니라 시스템으로 설계한다.",
  },
  {
    id: "practical-vibe-coding",
    order: 11,
    title: "실전 바이브코딩",
    description: "요구사항 정리, 작업 분해, 구현, 검증, 리팩터링 루틴을 연습합니다.",
    goal: "AI와 함께 작은 제품 기능을 끝까지 완성한다.",
  },
  {
    id: "explanation-practice",
    order: 12,
    title: "설명 연습",
    description: "개념을 남에게 설명하는 훈련, 면접식 질문, 비유 만들기를 반복합니다.",
    goal: "알고 있는 것을 말로 구조화한다.",
  },
  {
    id: "project-textbook",
    order: 13,
    title: "실전 프로젝트 교재",
    description: "SaaS, 관리자 도구, AI 챗봇, 자동화 워크플로를 프로젝트형으로 연결합니다.",
    goal: "개념을 묶어 실제 서비스 설계로 확장한다.",
  },
] satisfies readonly CurriculumModule[]

export const LESSON_META = [
  {
    slug: "ai-vibe-coding-orientation",
    moduleId: "getting-started",
    order: 1,
    title: "AI 바이브코딩이란 무엇인가",
    summary: "AI와 함께 개발을 배우는 태도, 한계, 검증 루틴을 먼저 잡습니다.",
    level: "입문",
    minutes: 35,
    tags: ["AI", "학습법", "바이브코딩"],
    checklist: [
      "바이브코딩이 단순 자동완성이 아니라 협업 방식임을 설명한다.",
      "AI 결과를 검증해야 하는 이유를 말한다.",
      "좋은 요청과 나쁜 요청의 차이를 예시로 구분한다.",
    ],
    exercise: {
      quiz: {
        question: "AI 바이브코딩에서 가장 중요한 태도는 무엇인가요?",
        options: [
          "AI가 만든 코드를 그대로 믿기",
          "요청, 결과, 검증을 반복하며 협업하기",
          "한 번에 완벽한 프롬프트 만들기",
        ],
        answer: "요청, 결과, 검증을 반복하며 협업하기",
        explanation:
          "바이브코딩은 AI에게 맡기는 일이 아니라, 요구사항을 좁히고 결과를 확인하며 함께 완성하는 작업 방식입니다.",
      },
      explanationPrompt: {
        prompt: "바이브코딩을 처음 듣는 친구에게 3문장으로 설명해보세요.",
        guide: ["AI가 맡는 일", "사람이 검증해야 하는 일", "좋은 요청을 만드는 방법"],
      },
    },
  },
  {
    slug: "web-screen-anatomy",
    moduleId: "web-basics",
    order: 2,
    title: "웹 화면은 어떻게 만들어지는가",
    summary: "HTML, CSS, JavaScript가 화면의 뼈대, 옷, 행동을 나누어 맡는 구조를 배웁니다.",
    level: "입문",
    minutes: 40,
    tags: ["HTML", "CSS", "JavaScript", "브라우저"],
    checklist: [
      "HTML, CSS, JavaScript의 역할을 한 문장씩 말한다.",
      "브라우저가 파일을 읽고 화면으로 바꾸는 흐름을 설명한다.",
      "AI에게 화면 수정 요청을 구조적으로 작성한다.",
    ],
    exercise: {
      quiz: {
        question: "HTML, CSS, JavaScript의 역할 설명으로 가장 정확한 것은 무엇인가요?",
        options: [
          "HTML은 구조, CSS는 스타일, JavaScript는 행동을 맡는다.",
          "HTML은 서버, CSS는 DB, JavaScript는 배포를 맡는다.",
          "세 가지는 모두 같은 역할을 한다.",
        ],
        answer: "HTML은 구조, CSS는 스타일, JavaScript는 행동을 맡는다.",
        explanation:
          "웹 화면을 이해할 때는 구조, 표현, 동작을 분리하면 수정 요청과 오류 분석이 훨씬 쉬워집니다.",
      },
      explanationPrompt: {
        prompt: "로그인 화면을 예로 들어 HTML, CSS, JavaScript가 각각 무엇을 맡는지 설명해보세요.",
        guide: ["입력창과 버튼", "색상과 간격", "버튼을 눌렀을 때 일어나는 일"],
      },
    },
  },
  {
    slug: "typescript-react-nextjs",
    moduleId: "frontend-frameworks",
    order: 3,
    title: "TypeScript, React, Next.js는 왜 함께 쓰는가",
    summary: "타입 안전성, 컴포넌트, 라우팅이 복잡한 프론트엔드를 어떻게 정리하는지 봅니다.",
    level: "기초",
    minutes: 45,
    tags: ["TypeScript", "React", "Next.js", "컴포넌트"],
    checklist: [
      "TypeScript가 줄이는 실수를 예로 든다.",
      "React 컴포넌트가 재사용 단위인 이유를 설명한다.",
      "Next.js가 라우팅과 배포에 주는 장점을 말한다.",
    ],
    exercise: {
      quiz: {
        question: "React 컴포넌트를 쓰는 핵심 이유는 무엇인가요?",
        options: [
          "화면 조각을 재사용하고 상태 변화를 예측 가능하게 다루기 위해",
          "CSS 파일을 없애기 위해",
          "브라우저 없이 앱을 실행하기 위해",
        ],
        answer: "화면 조각을 재사용하고 상태 변화를 예측 가능하게 다루기 위해",
        explanation:
          "컴포넌트는 반복되는 화면과 행동을 이름 있는 단위로 묶어 복잡한 UI를 관리하게 해줍니다.",
      },
      explanationPrompt: {
        prompt:
          "쇼핑몰 상품 카드를 예로 들어 TypeScript, React, Next.js가 각각 돕는 일을 설명해보세요.",
        guide: ["상품 데이터 타입", "카드 컴포넌트", "상품 상세 페이지 라우팅"],
      },
    },
  },
  {
    slug: "git-collaboration-basics",
    moduleId: "git-collaboration",
    order: 4,
    title: "Git은 왜 개발자의 타임머신인가",
    summary: "commit, branch, merge, pull request를 협업과 복구 관점에서 배웁니다.",
    level: "기초",
    minutes: 35,
    tags: ["Git", "협업", "브랜치", "PR"],
    checklist: [
      "commit과 branch의 차이를 설명한다.",
      "작업을 되돌릴 수 있어야 하는 이유를 말한다.",
      "PR 리뷰가 품질을 높이는 방식을 이해한다.",
    ],
    exercise: {
      quiz: {
        question: "Git branch를 사용하는 가장 실무적인 이유는 무엇인가요?",
        options: [
          "작업을 분리해 안전하게 실험하고 합치기 위해",
          "파일 크기를 줄이기 위해",
          "인터넷 없이 배포하기 위해",
        ],
        answer: "작업을 분리해 안전하게 실험하고 합치기 위해",
        explanation:
          "브랜치는 기능, 버그 수정, 실험을 독립된 흐름으로 관리하게 해 협업 충돌과 복구 비용을 줄입니다.",
      },
      explanationPrompt: {
        prompt: "팀 프로젝트에서 commit, branch, pull request가 어떤 순서로 쓰이는지 설명해보세요.",
        guide: ["작업 저장", "작업 공간 분리", "리뷰와 병합"],
      },
    },
  },
  {
    slug: "api-db-backend-flow",
    moduleId: "data-backend",
    order: 5,
    title: "API와 DB는 제품 뒤에서 무엇을 하는가",
    summary: "요청, 응답, 상태 코드, 데이터 저장소가 사용자 행동과 연결되는 흐름을 배웁니다.",
    level: "기초",
    minutes: 45,
    tags: ["API", "DB", "백엔드", "HTTP"],
    checklist: [
      "요청과 응답의 방향을 그림 없이 말로 설명한다.",
      "상태 코드 200, 400, 401, 500의 의미를 구분한다.",
      "DB가 화면 상태와 다른 이유를 설명한다.",
    ],
    exercise: {
      quiz: {
        question: "API 응답 상태 코드 401은 보통 무엇을 뜻하나요?",
        options: [
          "인증이 필요하거나 인증 정보가 올바르지 않다.",
          "서버가 성공적으로 처리했다.",
          "데이터베이스가 자동 백업되었다.",
        ],
        answer: "인증이 필요하거나 인증 정보가 올바르지 않다.",
        explanation:
          "401은 사용자가 누구인지 확인되지 않았다는 신호로, 로그인 토큰이나 인증 헤더를 점검해야 합니다.",
      },
      explanationPrompt: {
        prompt:
          "사용자가 글 저장 버튼을 눌렀을 때 화면, API, DB 사이에서 일어나는 일을 설명해보세요.",
        guide: ["브라우저 요청", "서버 검증", "DB 저장과 응답"],
      },
    },
  },
  {
    slug: "from-prompt-to-system",
    moduleId: "ai-system-design",
    order: 1,
    title: "프롬프트에서 시스템으로",
    summary: "일회성 프롬프트의 한계를 이해하고, AI 시스템 설계의 다섯 구성요소 지도를 그립니다.",
    level: "기초",
    minutes: 40,
    tags: ["AI 시스템 설계", "Context Engineering", "Workflow", "Agent"],
    checklist: [
      "일회성 프롬프트 방식의 한계 두 가지를 예를 들어 설명한다.",
      "AI 시스템의 다섯 구성요소(재료, 도구 연결, 절차, 흐름, 검증)를 말한다.",
      "Workflow와 Agent의 차이를 한 문장으로 구분한다.",
      '"단순하게 시작하라"는 권고가 왜 시스템 설계와 모순되지 않는지 설명한다.',
    ],
    exercise: {
      quiz: {
        question:
          "팀이 AI에게 같은 요청을 할 때마다 결과가 달라져서 고민입니다. AI 시스템 설계 관점에서 가장 적절한 접근은 무엇인가요?",
        options: [
          "결과가 안정될 때까지 프롬프트 문장을 더 정교하게 다듬는 데만 집중한다",
          "AI가 판단에 쓸 재료, 따라야 할 절차, 완료 기준을 파일로 만들어 매 요청에 함께 제공한다",
          "가장 복잡한 멀티 에이전트 구조를 먼저 도입해 모든 단계를 자동화한다",
        ],
        answer:
          "AI가 판단에 쓸 재료, 따라야 할 절차, 완료 기준을 파일로 만들어 매 요청에 함께 제공한다",
        explanation:
          "AI는 대화가 끝나면 기억이 사라지므로, 재료·절차·검증을 구조로 만들어 매번 제공하는 것이 비일관성의 근본 해결책입니다. 프롬프트 다듬기만으로는 반복 작업의 맥락을 전달할 수 없고, 공식 권고는 가장 단순한 방법에서 시작하라는 것이므로 복잡한 구조를 먼저 도입하는 것도 취지와 반대입니다.",
      },
      explanationPrompt: {
        prompt:
          '프롬프트를 잘 쓰는데도 AI 결과물이 들쭉날쭉하다고 호소하는 동료에게, "프롬프트에서 시스템으로" 관점의 해결 방향을 설명해보세요.',
        guide: [
          "일회성 프롬프트의 한계 (기억이 사라짐, 결과 편차)",
          "시스템의 다섯 구성요소 지도 (재료, 도구 연결, 절차, 흐름, 검증)",
          "온보딩 비유로 감 잡게 하기",
          "단순하게 시작하라는 단서 달기",
        ],
      },
    },
  },
  {
    slug: "context-engineering-basics",
    moduleId: "ai-system-design",
    order: 2,
    title: "Context Engineering 기초: AI가 판단할 재료 설계",
    summary:
      "AI가 추론할 때 받는 정보 묶음을 목표, 제약, 근거, 도구 결과로 선별하고 유지하는 방법을 배웁니다.",
    level: "기초",
    minutes: 40,
    tags: ["Context Engineering", "컨텍스트", "AI 시스템 설계", "에이전트"],
    checklist: [
      "Context Engineering을 추론 시점 정보 상태 관리라고 설명한다.",
      "컨텍스트가 길수록 항상 좋은 것이 아닌 이유를 말한다.",
      "시스템 프롬프트, 도구 정의, 대화 이력이 컨텍스트를 소비한다는 점을 설명한다.",
      "긴 AI 작업에서 compaction과 상태 산출물이 필요한 이유를 예로 든다.",
    ],
    exercise: {
      quiz: {
        question: "긴 AI 작업에서 Context Engineering 관점으로 가장 적절한 행동은 무엇인가요?",
        options: [
          "모든 파일과 로그를 계속 붙여 넣어 AI가 빠뜨리는 정보가 없게 한다",
          "현재 목표, 제약, 근거, 다음 행동을 작은 상태로 정리하고 오래된 로그는 요약한다",
          "처음에 완벽한 프롬프트를 한 번 작성한 뒤 이후 컨텍스트는 바꾸지 않는다",
        ],
        answer: "현재 목표, 제약, 근거, 다음 행동을 작은 상태로 정리하고 오래된 로그는 요약한다",
        explanation:
          "KB는 컨텍스트가 많을수록 항상 좋은 것이 아니며, 긴 세션에서는 compaction과 상태 산출물이 필요하다고 설명합니다. 모든 자료를 계속 넣는 것은 context rot 위험을 키우고, 초기 프롬프트 한 번으로 장기 작업을 끝내려는 것도 오개념입니다.",
      },
      explanationPrompt: {
        prompt:
          '"AI에게 자료를 많이 줄수록 안전하다"고 말하는 동료에게 Context Engineering을 설명해보세요.',
        guide: [
          "컨텍스트는 모델이 추론할 때 받는 토큰 집합임을 말하기",
          "시스템 프롬프트, 메시지, 도구 결과, 문서가 모두 창을 차지한다고 설명하기",
          "context rot 때문에 선별과 요약이 필요하다는 점 말하기",
          "작은 상태 문서나 체크리스트 예시로 연결하기",
        ],
      },
    },
  },
  {
    slug: "context-engineering-mcp-skills",
    moduleId: "ai-system-design",
    order: 6,
    title: "Context Engineering, MCP, Skills의 관계",
    summary: "AI가 일을 잘하게 만드는 맥락, 도구 연결, 재사용 절차를 시스템 관점에서 배웁니다.",
    level: "중급",
    minutes: 50,
    tags: ["Context Engineering", "MCP", "Skills", "Agent"],
    checklist: [
      "프롬프트와 컨텍스트의 차이를 설명한다.",
      "MCP가 도구 연결 문제를 해결하는 방식을 말한다.",
      "Skill이 반복 작업 품질을 높이는 이유를 예시로 든다.",
    ],
    exercise: {
      quiz: {
        question: "Context Engineering의 핵심에 가장 가까운 설명은 무엇인가요?",
        options: [
          "AI가 일할 때 필요한 목표, 자료, 제약, 도구 사용법을 구조화하는 것",
          "프롬프트를 최대한 짧게 쓰는 것",
          "모든 도구를 하나의 파일에 복사하는 것",
        ],
        answer: "AI가 일할 때 필요한 목표, 자료, 제약, 도구 사용법을 구조화하는 것",
        explanation:
          "컨텍스트 엔지니어링은 모델이 현재 작업을 오해하지 않도록 필요한 맥락을 설계하는 시스템 작업입니다.",
      },
      explanationPrompt: {
        prompt: "MCP와 Skill이 AI 에이전트에게 왜 필요한지 신입 개발자에게 설명해보세요.",
        guide: ["도구 연결", "반복 절차", "검증 가능한 작업 흐름"],
      },
    },
  },
  {
    slug: "tool-calling-basics",
    moduleId: "ai-system-design",
    order: 7,
    title: "Tool Calling: AI가 도구를 부르는 방식",
    summary:
      "AI가 외부 함수나 도구를 구조화된 호출 요청으로 선택하고, 애플리케이션이 실행하는 경계를 배웁니다.",
    level: "중급",
    minutes: 40,
    tags: ["Tool Calling", "Function Calling", "API", "AI 도구"],
    checklist: [
      "Tool Calling이 모델의 직접 실행이 아니라 구조화된 호출 요청임을 설명한다.",
      "JSON Schema가 도구 입력 구조를 약속하는 역할을 말한다.",
      "client tool과 server tool의 실행 책임 차이를 구분한다.",
      "Tool Calling과 MCP의 층위 차이를 한 문장으로 설명한다.",
    ],
    exercise: {
      quiz: {
        question: "Tool Calling을 가장 정확하게 설명한 것은 무엇인가요?",
        options: [
          "모델이 외부 함수를 직접 실행하고 결과까지 스스로 보장하는 방식이다",
          "모델이 호출할 도구와 인자를 구조화해 반환하고, 애플리케이션이나 제공자 인프라가 실행하는 방식이다",
          "모든 API 호출을 사람이 직접 코드로 작성하므로 모델은 도구 선택에 관여하지 않는 방식이다",
        ],
        answer:
          "모델이 호출할 도구와 인자를 구조화해 반환하고, 애플리케이션이나 제공자 인프라가 실행하는 방식이다",
        explanation:
          "KB는 client tool에서 모델이 `tool_use` 같은 구조화된 호출을 반환하고 애플리케이션이 실행한다고 설명합니다. 모델이 직접 실행한다고 보는 것은 실행 책임을 혼동한 것이고, 모델이 도구 선택에 관여하지 않는다는 설명도 Tool Calling의 핵심과 맞지 않습니다.",
      },
      explanationPrompt: {
        prompt: '"Tool Calling은 그냥 API 호출 아닌가요?"라고 묻는 동료에게 차이를 설명해보세요.',
        guide: [
          "API 호출은 애플리케이션 코드의 네트워크 요청이라고 설명하기",
          "Tool Calling은 모델이 어떤 호출이 필요한지 구조화해 제안하는 인터페이스라고 설명하기",
          "JSON Schema와 description이 왜 필요한지 덧붙이기",
          "실제 영향이 있는 작업은 사용자 확인이 필요하다고 마무리하기",
        ],
      },
    },
  },
  {
    slug: "rag-fundamentals",
    moduleId: "ai-system-design",
    order: 8,
    title: "RAG: 모델이 모르는 것을 알려주는 방법",
    summary:
      "검색된 외부 지식을 모델 입력에 넣어 최신 정보와 도메인 지식에 근거한 답변을 만드는 흐름을 배웁니다.",
    level: "중급",
    minutes: 40,
    tags: ["RAG", "Retrieval", "Embedding", "Context Engineering"],
    checklist: [
      "RAG를 retrieval과 generation을 결합한 방식으로 설명한다.",
      "chunk, embedding, vector database, retrieval의 흐름을 순서대로 말한다.",
      "RAG와 long context가 항상 우열 관계가 아니라는 점을 설명한다.",
      "embedding 검색과 BM25 검색의 차이를 예로 든다.",
    ],
    exercise: {
      quiz: {
        question: "RAG를 실무에 적용할 때 가장 적절한 설명은 무엇인가요?",
        options: [
          "검색된 chunk를 많이 넣을수록 항상 답변 품질이 좋아진다",
          "문서를 chunk로 나누고 관련 chunk를 검색해 모델 입력에 넣되, reranking과 top-K로 품질을 조절한다",
          "embedding 검색만 쓰면 고유명사나 오류 코드 검색 문제도 항상 해결된다",
        ],
        answer:
          "문서를 chunk로 나누고 관련 chunk를 검색해 모델 입력에 넣되, reranking과 top-K로 품질을 조절한다",
        explanation:
          "KB는 RAG 흐름을 chunking, embedding, vector database, runtime retrieval, prompt insertion으로 설명하고, reranking을 관련 chunk만 전달하기 위한 filtering 단계로 설명합니다. 많은 chunk가 항상 좋은 것은 아니며, embedding만으로 exact match 문제를 모두 해결한다고 보는 것도 오개념입니다.",
      },
      explanationPrompt: {
        prompt:
          '"RAG는 그냥 검색 결과를 프롬프트에 붙이는 것 아닌가요?"라고 묻는 동료에게 설명해보세요.',
        guide: [
          "RAG가 retrieval과 generation을 결합하는 방식임을 말하기",
          "chunk, embedding, vector database, retrieval 순서로 설명하기",
          "long context와 RAG의 선택 기준을 간단히 말하기",
          "BM25와 reranking이 왜 필요한지 오개념과 함께 설명하기",
        ],
      },
    },
  },
  {
    slug: "mcp-architecture-basics",
    moduleId: "ai-system-design",
    order: 9,
    title: "MCP 구조: 서버, 클라이언트, 도구, 리소스",
    summary:
      "MCP의 host, client, server 구조와 tools, resources의 차이를 배우고 Tool Calling과의 관계를 정리합니다.",
    level: "중급",
    minutes: 40,
    tags: ["MCP", "Tool Calling", "Resources", "AI 시스템 설계"],
    checklist: [
      "MCP를 AI 애플리케이션과 외부 시스템을 연결하는 프로토콜로 설명한다.",
      "host, client, server의 책임을 구분한다.",
      "tools와 resources의 차이를 예로 든다.",
      "MCP와 Tool Calling의 층위 차이를 한 문장으로 설명한다.",
    ],
    exercise: {
      quiz: {
        question: "MCP에서 tools와 resources의 차이를 가장 정확하게 설명한 것은 무엇인가요?",
        options: [
          "tools는 외부 행동을 호출하는 기능이고, resources는 모델에 제공할 컨텍스트 데이터를 URI로 노출하는 기능이다",
          "tools와 resources는 모두 모델이 자동으로 항상 읽는 문서이며 차이가 없다",
          "resources는 서버의 권한을 정하고, tools는 전체 대화 이력을 서버에 전달하는 기능이다",
        ],
        answer:
          "tools는 외부 행동을 호출하는 기능이고, resources는 모델에 제공할 컨텍스트 데이터를 URI로 노출하는 기능이다",
        explanation:
          "KB는 MCP tools를 외부 시스템과 상호작용하도록 서버가 노출하는 호출 가능한 기능으로, resources를 파일·DB schema·앱별 정보 같은 컨텍스트 데이터를 URI로 식별해 제공하는 primitive로 설명합니다. resources를 자동 첨부 문서로 보거나 서버가 전체 대화를 본다고 생각하는 것은 오개념입니다.",
      },
      explanationPrompt: {
        prompt: '"MCP는 Tool Calling이랑 같은 거 아닌가요?"라고 묻는 동료에게 차이를 설명해보세요.',
        guide: [
          "Tool Calling은 모델이 도구 호출을 만드는 메커니즘이라고 설명하기",
          "MCP는 host, client, server 사이의 표준 프로토콜이라고 설명하기",
          "tools와 resources 차이를 예로 들기",
          "host가 권한과 사용자 승인을 조정한다는 점으로 마무리하기",
        ],
      },
    },
  },
] satisfies readonly LessonMeta[]
