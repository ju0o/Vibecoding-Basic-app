import type { GlossaryTerm } from "@/content/schema"

export const GLOSSARY_TERMS = [
  {
    term: "HTML",
    category: "웹 개발",
    shortDefinition: "웹 페이지의 구조와 의미를 적는 마크업 언어",
    explanation: "제목, 문단, 버튼, 링크처럼 화면에 놓일 요소의 뼈대를 정의합니다.",
    related: ["CSS", "JavaScript", "브라우저"],
  },
  {
    term: "CSS",
    category: "웹 개발",
    shortDefinition: "HTML 요소의 모양과 배치를 정하는 스타일 언어",
    explanation: "색상, 여백, 글꼴, 반응형 레이아웃처럼 사용자에게 보이는 형태를 담당합니다.",
    related: ["HTML", "Tailwind CSS", "반응형 UI"],
  },
  {
    term: "JavaScript",
    category: "웹 개발",
    shortDefinition: "웹 페이지에 행동과 상호작용을 더하는 프로그래밍 언어",
    explanation: "버튼 클릭, 데이터 요청, 화면 상태 변경처럼 정적인 페이지를 살아 움직이게 합니다.",
    related: ["TypeScript", "React", "API"],
  },
  {
    term: "TypeScript",
    category: "프론트엔드",
    shortDefinition: "JavaScript에 타입 시스템을 더한 언어",
    explanation: "데이터 모양을 코드로 약속해서 실행 전에 실수를 발견하게 해줍니다.",
    related: ["JavaScript", "React", "타입"],
  },
  {
    term: "React",
    category: "프론트엔드",
    shortDefinition: "화면을 컴포넌트 단위로 만드는 JavaScript 라이브러리",
    explanation: "버튼, 카드, 목록 같은 조각을 만들어 상태에 따라 화면을 다시 그립니다.",
    related: ["컴포넌트", "Next.js", "상태"],
  },
  {
    term: "Next.js",
    category: "프론트엔드",
    shortDefinition: "React 앱을 라우팅, 서버 렌더링, 빌드, 배포까지 확장하는 프레임워크",
    explanation:
      "파일 기반 라우팅과 서버 컴포넌트로 학습 사이트, SaaS, 문서 사이트를 구조화합니다.",
    related: ["React", "라우팅", "배포"],
  },
  {
    term: "API",
    category: "백엔드",
    shortDefinition: "프로그램끼리 데이터를 주고받기 위한 약속",
    explanation: "프론트엔드는 API를 통해 서버에 요청하고, 서버는 정해진 형식으로 응답합니다.",
    related: ["HTTP", "DB", "상태 코드"],
  },
  {
    term: "DB",
    category: "백엔드",
    shortDefinition: "서비스의 데이터를 오래 저장하고 찾는 시스템",
    explanation: "사용자, 결제, 게시글, 학습 진행률 같은 지속 데이터가 저장됩니다.",
    related: ["SQL", "API", "백엔드"],
  },
  {
    term: "Prompt Engineering",
    category: "AI",
    shortDefinition: "AI에게 원하는 결과를 얻기 위해 요청을 설계하는 기술",
    explanation: "목표, 맥락, 출력 형식, 제약 조건, 예시를 명확히 주는 방식입니다.",
    related: ["Context Engineering", "검증", "AI 코딩 도구"],
  },
  {
    term: "Context Engineering",
    category: "AI 시스템",
    shortDefinition: "AI가 일할 때 필요한 배경 정보와 도구 상태를 설계하는 일",
    explanation: "프롬프트 한 줄보다 넓은 개념으로, 파일, 규칙, 히스토리, 도구 결과를 포함합니다.",
    related: ["MCP", "Skills", "Agent"],
  },
  {
    term: "MCP",
    category: "AI 시스템",
    shortDefinition: "AI가 외부 도구와 데이터를 표준 방식으로 연결하게 해주는 프로토콜",
    explanation: "메일, 문서, 저장소, 데이터베이스 같은 외부 시스템을 AI 작업 흐름에 연결합니다.",
    related: ["도구", "Agent", "Workflow"],
  },
  {
    term: "RAG",
    category: "AI 시스템",
    shortDefinition: "검색한 외부 지식을 AI 답변 컨텍스트에 넣어 근거를 보강하는 방식",
    explanation:
      "문서나 지식베이스를 작은 단위로 나누고 질문과 관련 있는 내용을 찾아 모델 입력에 함께 넣습니다.",
    related: ["Context Engineering", "MCP", "검색", "출처"],
  },
  {
    term: "Tool Calling",
    category: "AI 시스템",
    shortDefinition: "모델이 외부 함수나 도구를 구조화된 요청으로 선택하게 하는 연결 방식",
    explanation:
      "Tool Calling은 모델이 직접 함수를 실행하는 것이 아니라, 호출할 도구 이름과 입력값을 구조화해 반환하게 하는 방식입니다. 실제 실행은 애플리케이션 코드나 제공자 인프라가 맡습니다. JSON Schema 같은 입력 구조와 명확한 도구 설명이 있어야 모델이 언제 어떤 도구를 써야 하는지 판단할 수 있습니다.",
    related: ["MCP", "Agent", "API", "Context Engineering"],
  },
  {
    term: "Skills",
    category: "AI 시스템",
    shortDefinition: "반복 작업을 잘 수행하기 위한 재사용 가능한 절차와 지식 묶음",
    explanation: "특정 도메인의 기준, 스크립트, 체크리스트를 담아 AI가 일관되게 일하게 합니다.",
    related: ["Context Engineering", "Workflow", "Codex"],
  },
  {
    term: "Agent",
    category: "AI 시스템",
    shortDefinition: "목표를 받고 도구를 사용하며 여러 단계를 수행하는 AI 작업자",
    explanation: "단순 답변을 넘어 계획, 실행, 검증, 수정 루프를 돌 수 있는 구조입니다.",
    related: ["SubAgent", "Orchestration", "Loop Engineering"],
  },
  {
    term: "Harness Engineering",
    category: "AI 시스템",
    shortDefinition: "AI 작업을 안전하게 실행하고 검증하는 실행 환경과 평가 장치를 설계하는 일",
    explanation: "테스트, 로그, 샌드박스, 재현 절차를 준비해서 AI의 결과를 믿을 수 있게 만듭니다.",
    related: ["Loop Engineering", "검증", "테스트"],
  },
  {
    term: "Workflow",
    category: "AI 시스템",
    shortDefinition: "AI 작업의 진행 경로를 사람이 미리 코드로 정해둔 실행 흐름",
    explanation:
      "AI에게 여러 단계를 맡길 때 매번 경로가 달라지면 결과를 믿기 어렵습니다. Workflow는 리서치, 작성, 검증처럼 단계와 순서를 미리 정해두고 그 경로대로만 진행하게 만듭니다. 경로를 AI가 스스로 결정하는 Agent와 대비되는 개념이며, 예측 가능성이 중요한 반복 작업에 적합합니다.",
    related: ["Agent", "Context Engineering", "Skills"],
  },
  {
    term: "AI 시스템 설계",
    category: "AI 시스템",
    shortDefinition: "AI가 안정적으로 일하도록 재료, 도구, 절차, 검증을 갖춘 구조를 만드는 일",
    explanation:
      "프롬프트 한 번으로 얻는 결과는 매번 달라질 수 있습니다. AI 시스템 설계는 AI가 판단에 쓸 컨텍스트, 외부 도구 연결, 재사용 절차, 완료 검증까지 구조로 만들어 결과의 품질을 반복 가능하게 합니다. Context Engineering, MCP, Skills, Agent가 모두 이 설계의 부품입니다.",
    related: ["Context Engineering", "MCP", "Skills", "Agent", "Workflow"],
  },
] satisfies readonly GlossaryTerm[]
