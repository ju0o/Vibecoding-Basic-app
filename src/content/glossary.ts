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
    term: "Tokenization",
    category: "AI 시스템",
    shortDefinition: "모델 입력 텍스트를 토큰이라는 처리 단위로 나누는 방식",
    explanation:
      "Tokenization은 글자 수나 단어 수를 그대로 세는 것이 아니라 모델별 tokenizer가 입력을 내부 처리 단위로 쪼개는 과정입니다. 같은 문장도 모델 tokenizer에 따라 토큰 수가 달라질 수 있으므로 비용과 context fit을 판단할 때 실제 사용할 모델 기준으로 다시 세어야 합니다.",
    related: ["Token Counting", "Context Window", "Context Engineering"],
  },
  {
    term: "Token Counting",
    category: "AI 시스템",
    shortDefinition: "요청을 보내기 전에 입력이 차지할 토큰 수를 추정하는 절차",
    explanation:
      "Token Counting은 system prompt, messages, tools, images, PDFs 같은 구조화 입력이 context window와 비용에 어떤 영향을 주는지 미리 확인하는 운영 절차입니다. 추정값과 실제 message creation의 input tokens는 작게 차이날 수 있으므로 사전 점검과 실제 usage 확인을 함께 봅니다.",
    related: ["Tokenization", "Context Budget", "Context Window"],
  },
  {
    term: "Context Budget",
    category: "AI 시스템",
    shortDefinition: "제한된 context window 안에 어떤 근거와 출력 여유를 넣을지 정하는 입력 예산",
    explanation:
      "Context Budget은 모델에 넣을 파일, 로그, 도구 정의, 문서, 출력 예약량을 선별하는 기준입니다. 많이 넣는 것이 목표가 아니라 현재 작업에 필요한 high-signal evidence를 남기고 낮은 신호는 요약하거나 제외하는 것이 핵심입니다.",
    related: ["Context Window", "Context Engineering", "Context Rot"],
  },
  {
    term: "Context Rot",
    category: "AI 시스템",
    shortDefinition:
      "context window의 토큰 수가 커질수록 회상 정확도와 활용 품질이 떨어질 수 있는 현상",
    explanation:
      "Context Rot은 긴 context가 항상 더 좋은 답변을 만든다는 오해를 교정하는 개념입니다. 토큰 수가 증가하면 모델이 context 안의 정보를 정확히 회상하는 능력이 낮아질 수 있으므로, 긴 입력에는 선별, 요약, 검색, 검증 기준이 함께 필요합니다.",
    related: ["Context Window", "Context Budget", "RAG"],
  },
  {
    term: "Prompt Contract",
    category: "AI 시스템",
    shortDefinition: "모델이 수행할 목표, 범위, 제약, 검증 기준, 출력 형식을 묶은 작업 계약",
    explanation:
      "Prompt Contract는 프롬프트를 부탁 문장으로 보지 않고 실행 조건과 성공 기준을 담은 계약으로 보는 관점입니다. 목표와 범위가 없으면 모델은 성공 기준을 추론하고, 근거 정책이 없으면 어떤 문장을 증거로 뒷받침해야 하는지 일관되게 판단하기 어렵습니다.",
    related: ["Prompt Engineering", "Evidence Policy", "Output Format Control"],
  },
  {
    term: "Evidence Policy",
    category: "AI 시스템",
    shortDefinition: "어떤 주장에 근거가 필요한지와 근거가 없을 때 어떻게 행동할지 정한 규칙",
    explanation:
      "Evidence Policy는 grounded answer에서 citation behavior와 evidence missing behavior를 prompt 안에 명시하는 규칙입니다. 어떤 주장이 support를 필요로 하는지, 충분한 evidence란 무엇인지, 증거가 없을 때 모름 또는 추가 확인으로 남길지를 정합니다.",
    related: ["Grounding", "Citation", "Verification"],
  },
  {
    term: "Output Format Control",
    category: "AI 시스템",
    shortDefinition: "모델 응답의 구조, 길이, 문체, 위치별 내용을 명시적으로 지정하는 방법",
    explanation:
      "Output Format Control은 원하는 결과를 모델이 추론하게 두지 않고 직접 지정하는 prompt 설계입니다. 금지문만 나열하기보다 무엇을 해야 하는지 긍정 지시로 쓰고, 필요한 경우 tag나 예시로 구조를 분리합니다.",
    related: ["Prompt Contract", "XML Prompt Tags"],
  },
  {
    term: "XML Prompt Tags",
    category: "AI 시스템",
    shortDefinition:
      "프롬프트의 목표, 자료, 제약, 출력 형식을 XML 형태의 구획으로 나누는 구조화 방식",
    explanation:
      "XML Prompt Tags는 `<goal>`, `<scope>`, `<evidence>`, `<format>`처럼 입력 요소를 명확한 이름의 구획으로 분리하는 방식입니다. 긴 작업에서 모델이 어떤 부분을 지시, 자료, 형식으로 읽어야 하는지 구분하게 도와줍니다.",
    related: ["Prompt Engineering", "Output Format Control", "Context Engineering"],
  },
  {
    term: "Evidence Missing Behavior",
    category: "AI 시스템",
    shortDefinition: "충분한 근거가 없을 때 모델이 답변을 제한하거나 모른다고 말하게 하는 규칙",
    explanation:
      "Evidence Missing Behavior는 검색 실패나 근거 부족을 사실 부정으로 오해하지 않게 만드는 guardrail입니다. 근거가 없으면 단정하지 않고 모름, 추가 확인 필요, 제한된 답변처럼 상태를 분리합니다.",
    related: ["Evidence Policy", "Grounding", "Hallucination"],
  },
  {
    term: "Grounding",
    category: "AI 시스템",
    shortDefinition: "모델 답변의 주장을 제공된 근거에 묶어 해석 가능하게 만드는 설계",
    explanation:
      "Grounding은 답변이 현재 제공된 문서, 검색 결과, 저장소 사실에 의해 support되는지 관리하는 방식입니다. 단순히 링크를 붙이는 것이 아니라 어떤 claim이 어떤 citable unit으로 뒷받침되는지 연결해야 합니다.",
    related: ["Citation", "RAG", "Evidence Policy"],
  },
  {
    term: "Citation",
    category: "AI 시스템",
    shortDefinition: "답변 문장이나 문단이 의존한 출처 위치를 표시하는 형식",
    explanation:
      "Citation은 참고문헌 목록과 다르게 특정 response text를 직접 support하는 source location을 가리킵니다. 문장 또는 문단 뒤에 놓이며, returned context에 없는 source ID나 locator를 만들어내면 안 됩니다.",
    related: ["Grounding", "Citable Unit", "Source Locator"],
  },
  {
    term: "Citable Unit",
    category: "AI 시스템",
    shortDefinition: "답변 claim을 뒷받침할 수 있도록 나눈 인용 가능한 근거 단위",
    explanation:
      "Citable Unit은 line-level, paragraph-level, document-level처럼 use case의 precision에 맞춰 나눈 근거 조각입니다. 너무 큰 단위는 검증이 느슨해지고, 너무 작은 단위는 관리가 복잡해지므로 목적에 맞게 정해야 합니다.",
    related: ["Citation", "Stable Source ID", "Grounding"],
  },
  {
    term: "Stable Source ID",
    category: "AI 시스템",
    shortDefinition: "검색 결과나 주입된 context 안에서 출처를 일관되게 식별하는 고정 ID",
    explanation:
      "Stable Source ID는 모델이 citation을 만들 때 사용할 수 있는 출처 식별자입니다. ID가 안정적이지 않거나 context에 제공되지 않으면 모델이 source ID를 invent할 위험이 커집니다.",
    related: ["Citation", "Source Locator", "Citable Unit"],
  },
  {
    term: "Source Locator",
    category: "AI 시스템",
    shortDefinition: "출처 문서 안의 페이지, 줄, 문자 범위처럼 근거 위치를 가리키는 정보",
    explanation:
      "Source Locator는 citation이 단순 URL이 아니라 문서 내부의 어느 위치를 참조하는지 알려주는 장치입니다. PDF page range, plain text character index range처럼 문서 형식에 따라 locator가 달라질 수 있습니다.",
    related: ["Citation", "Citable Unit", "Grounding"],
  },
  {
    term: "Hallucination",
    category: "AI 시스템",
    shortDefinition: "모델 출력이 사실과 맞지 않거나 제공된 context와 일치하지 않는 상태",
    explanation:
      "Hallucination은 자연스럽고 자신감 있는 문장처럼 보여도 원문, 제공 context, 테스트 결과와 맞지 않는 output을 가리킵니다. 운영에서는 모델 버그 하나가 아니라 prompt, grounding, verification, evaluation으로 관리해야 하는 품질 위험입니다.",
    related: ["Verification", "Grounding", "Citation"],
  },
  {
    term: "Verification",
    category: "AI 시스템",
    shortDefinition: "AI 출력의 claim을 원문, citation, test, review 기준과 대조하는 절차",
    explanation:
      "Verification은 모델의 confidence가 아니라 claim을 support하는 evidence와 실행 결과를 기준으로 판단합니다. quote가 없으면 claim을 철회하고, 코드 변경은 테스트와 human review로 확인하는 식의 루틴을 포함합니다.",
    related: ["Hallucination", "Claim Audit", "Evaluation Set"],
  },
  {
    term: "Claim Audit",
    category: "AI 시스템",
    shortDefinition: "AI 출력의 문장을 claim 단위로 나누고 각 claim의 근거를 대조하는 검증 방식",
    explanation:
      "Claim Audit은 요약이나 설명을 문장 단위로 쪼개 supporting quote, source, test result가 있는지 확인합니다. citation 링크 개수만 세는 것이 아니라 cited claim을 source가 직접 support하는지 보는 것이 핵심입니다.",
    related: ["Verification", "Citation", "Grounding"],
  },
  {
    term: "Uncertainty Permission",
    category: "AI 시스템",
    shortDefinition: "근거가 부족할 때 모델이 모른다고 말하거나 답변을 제한하도록 허용하는 규칙",
    explanation:
      "Uncertainty Permission은 근거 부족 상태에서 모델이 그럴듯한 단정을 만들지 않게 하는 기본 guardrail입니다. 충분한 evidence가 없으면 모름, 추가 확인 필요, 제한된 답변으로 상태를 분리합니다.",
    related: ["Hallucination", "Evidence Missing Behavior", "Verification"],
  },
  {
    term: "Evaluation Set",
    category: "AI 시스템",
    shortDefinition: "자주 틀리는 질문과 edge case를 모아 반복적으로 품질을 측정하는 테스트 묶음",
    explanation:
      "Evaluation Set은 generative AI 출력의 variability와 nondeterminism을 관리하기 위한 반복 검증 자료입니다. prompt나 model을 바꿀 때 같은 사례를 다시 실행해 회귀를 확인할 수 있습니다.",
    related: ["Verification", "AI System Evaluation", "Eval Run"],
  },
  {
    term: "Embeddings",
    category: "AI 시스템",
    shortDefinition: "텍스트를 의미 비교가 가능한 숫자 벡터로 표현한 것",
    explanation:
      "Embeddings는 텍스트를 floating point numbers의 vector 또는 numerical representation으로 바꾸어 relatedness와 semantic similarity를 계산할 수 있게 합니다. 검색, 추천, 분류, clustering, RAG 후보 검색에서 문서와 질문을 비교하는 기초 표현으로 쓰입니다.",
    related: ["Semantic Similarity", "Vector Store", "RAG"],
  },
  {
    term: "Semantic Similarity",
    category: "AI 시스템",
    shortDefinition: "표현이 달라도 의미상 얼마나 가까운지 비교하는 검색 신호",
    explanation:
      "Semantic Similarity는 단어가 정확히 같은지보다 문장이나 문서 조각의 의미가 얼마나 관련 있는지를 봅니다. Embedding vector 사이의 distance가 relatedness를 측정하는 데 쓰이지만, 관련성이 높다는 것이 claim의 사실성을 보장하지는 않습니다.",
    related: ["Embeddings", "Grounding", "Citation"],
  },
  {
    term: "Vector Store",
    category: "AI 시스템",
    shortDefinition:
      "embedding vector를 저장하고 semantic search에 사용할 수 있게 하는 저장·검색 컨테이너",
    explanation:
      "Vector Store는 파일이나 문서 조각을 chunk, embed, index한 뒤 질문 embedding과 가까운 후보를 찾는 데 쓰입니다. RAG에서는 runtime retrieval 단계에서 관련 chunk를 찾고 generation context에 넣는 기반이 됩니다.",
    related: ["Embeddings", "RAG", "Semantic Similarity"],
  },
  {
    term: "BM25",
    category: "검색",
    shortDefinition: "정확한 단어 일치와 문서 내 중요도를 활용하는 전통적 키워드 검색 방식",
    explanation:
      "BM25는 semantic similarity보다 exact keyword match에 강한 검색 신호입니다. 오류 코드, API 이름, 고유명사처럼 정확한 문자열이 중요한 경우 embeddings와 함께 hybrid retrieval로 쓰일 수 있습니다.",
    related: ["Hybrid Retrieval", "Vector Store", "검색"],
  },
  {
    term: "Hybrid Retrieval",
    category: "AI 시스템",
    shortDefinition:
      "embedding 기반 semantic search와 BM25 같은 keyword search를 결합하는 검색 방식",
    explanation:
      "Hybrid Retrieval은 embeddings의 의미 유사도 장점과 BM25의 exact match 장점을 함께 사용합니다. 개념 설명은 semantic similarity로 찾고, 오류 코드나 식별자는 keyword search로 보완한 뒤 결과를 합치고 rerank하는 식으로 설계할 수 있습니다.",
    related: ["Embeddings", "BM25", "RAG"],
  },
  {
    term: "Context Engineering",
    category: "AI 시스템",
    shortDefinition: "AI가 일할 때 필요한 배경 정보와 도구 상태를 설계하는 일",
    explanation: "프롬프트 한 줄보다 넓은 개념으로, 파일, 규칙, 히스토리, 도구 결과를 포함합니다.",
    related: ["MCP", "Skills", "Agent"],
  },
  {
    term: "Context Window",
    category: "AI 시스템",
    shortDefinition: "모델이 응답을 만들 때 참조할 수 있는 유한한 작업 메모리",
    explanation:
      "Context Window는 모델이 현재 응답을 만들 때 함께 볼 수 있는 토큰 범위입니다. 시스템 프롬프트, 메시지, 문서, 도구 정의, 도구 결과가 모두 이 범위를 차지할 수 있으므로 긴 작업에서는 필요한 정보를 선별하고 오래된 내용은 요약해야 합니다.",
    related: ["Context Engineering", "Agent", "Tool Calling"],
  },
  {
    term: "MCP",
    category: "AI 시스템",
    shortDefinition: "AI가 외부 도구와 데이터를 표준 방식으로 연결하게 해주는 프로토콜",
    explanation: "메일, 문서, 저장소, 데이터베이스 같은 외부 시스템을 AI 작업 흐름에 연결합니다.",
    related: ["도구", "Agent", "Workflow"],
  },
  {
    term: "MCP Resource",
    category: "AI 시스템",
    shortDefinition: "MCP server가 URI로 식별해 제공하는 컨텍스트 데이터",
    explanation:
      "MCP Resource는 파일, DB schema, 앱별 정보처럼 모델 판단에 필요한 데이터를 서버가 표준 방식으로 공유하는 primitive입니다. Tool이 외부 시스템 행동을 호출하는 기능이라면 Resource는 모델에게 읽힐 수 있는 컨텍스트 데이터를 제공하는 쪽에 가깝습니다.",
    related: ["MCP", "Context Engineering", "RAG"],
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
    term: "System Prompt",
    category: "AI 시스템",
    shortDefinition: "모델에게 원하는 행동을 분명히 제시하는 상위 지시",
    explanation:
      "System Prompt는 모델이 어떤 방식으로 행동해야 하는지 알려주는 지시입니다. Context Engineering 관점에서는 시스템 프롬프트도 컨텍스트를 차지하므로, 모호한 일반론이나 깨지기 쉬운 조건문 목록보다 작고 신호가 높은 행동 기준으로 설계해야 합니다.",
    related: ["Context Engineering", "Tool Calling", "Agent"],
  },
  {
    term: "Skills",
    category: "AI 시스템",
    shortDefinition: "반복 작업을 잘 수행하기 위한 재사용 가능한 절차와 지식 묶음",
    explanation: "특정 도메인의 기준, 스크립트, 체크리스트를 담아 AI가 일관되게 일하게 합니다.",
    related: ["Context Engineering", "Workflow", "Codex"],
  },
  {
    term: "Progressive Disclosure",
    category: "AI 시스템",
    shortDefinition: "필요한 정보만 단계적으로 로드해 컨텍스트 비용을 줄이는 방식",
    explanation:
      "Progressive Disclosure는 시스템이 모든 자료를 처음부터 모델 컨텍스트에 넣지 않고, metadata나 description처럼 작은 발견 정보만 먼저 노출한 뒤 실제 본문과 리소스는 필요할 때 로드하는 설계입니다. Skills의 metadata-first loading과 MCP의 on-demand tool/resource 사용을 이해할 때 핵심이 되는 용어입니다.",
    related: ["Context Engineering", "Skills", "MCP"],
  },
  {
    term: "SKILL.md",
    category: "AI 시스템",
    shortDefinition: "Skill의 metadata와 실행 지침을 담는 필수 entrypoint 파일",
    explanation:
      "SKILL.md는 Skill 디렉터리의 중심 파일입니다. YAML frontmatter는 모델이 Skill을 언제 사용할지 발견하는 metadata를 제공하고, Markdown 본문은 Skill이 실행될 때 따라야 할 절차, 출력 형식, supporting files 안내를 담습니다.",
    related: ["Skills", "Context Engineering", "Progressive Disclosure"],
  },
  {
    term: "Skill Discovery",
    category: "AI 시스템",
    shortDefinition: "모델이 요청과 description을 비교해 사용할 Skill을 찾는 과정",
    explanation:
      "Skill Discovery는 Skill 본문이 아니라 이름과 description 같은 가벼운 metadata를 통해 어떤 Skill이 현재 요청에 적합한지 판단하는 과정입니다. description이 모호하거나 서로 겹치면 잘못된 Skill이 선택되거나 필요한 Skill이 누락될 수 있습니다.",
    related: ["Skills", "Context Engineering"],
  },
  {
    term: "Supporting Files",
    category: "AI 시스템",
    shortDefinition: "Skill 본문 밖에 두는 예시, 템플릿, 스크립트, 참고 자료",
    explanation:
      "Supporting Files는 SKILL.md에 모든 내용을 넣지 않고, examples, templates, scripts, references처럼 필요할 때만 읽거나 실행할 자료를 분리하는 방식입니다. Skill을 간결하게 유지하면서도 깊은 작업 자료를 제공할 수 있게 합니다.",
    related: ["Skills", "Progressive Disclosure"],
  },
  {
    term: "Agent",
    category: "AI 시스템",
    shortDefinition: "목표를 받고 도구를 사용하며 여러 단계를 수행하는 AI 작업자",
    explanation: "단순 답변을 넘어 계획, 실행, 검증, 수정 루프를 돌 수 있는 구조입니다.",
    related: ["SubAgent", "Orchestration", "Loop Engineering"],
  },
  {
    term: "Agent Loop",
    category: "AI 시스템",
    shortDefinition:
      "모델이 상태를 평가하고 도구를 호출하며 결과를 받아 다시 판단하는 반복 실행 구조",
    explanation:
      "Agent Loop는 모델이 프롬프트를 평가하고, 필요한 도구를 호출하고, 도구 결과를 다시 받아 작업이 끝날 때까지 반복하는 구조입니다. 한 turn은 모델 출력과 도구 실행 결과가 오가는 왕복이며, 루프에는 max_turns, budget, allowed_tools 같은 제한 장치가 필요합니다.",
    related: ["Agent", "Tool Calling", "Workflow", "Context Engineering"],
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
  {
    term: "SubAgent",
    category: "AI 시스템",
    shortDefinition: "주 에이전트가 특정 하위 작업을 맡기는 별도 컨텍스트의 전문 에이전트",
    explanation:
      "SubAgent는 own context window, custom prompt, tool access, permissions를 가진 worker입니다. 긴 탐색 결과나 로그를 main conversation에 모두 넣지 않고, focused task를 수행한 뒤 summary나 structured result만 되돌려주는 데 사용합니다.",
    related: ["Agent", "Agent Loop", "Orchestration", "Context Engineering"],
  },
  {
    term: "Delegation",
    category: "AI 시스템",
    shortDefinition: "주 에이전트가 특정 작업 범위와 결과 계약을 정해 다른 실행 주체에 맡기는 방식",
    explanation:
      "Delegation은 단순 병렬 실행이 아니라 어떤 task를 어떤 권한으로 맡기고, 어떤 결과를 돌려받아 최종 판단에 쓸지 정하는 설계입니다.",
    related: ["SubAgent", "Orchestration", "Harness Engineering"],
  },
  {
    term: "Dynamic Workflow",
    category: "AI 시스템",
    shortDefinition: "많은 subagent를 script로 조정해 반복 실행 가능한 대규모 위임 흐름",
    explanation:
      "Dynamic Workflow는 개별 subagent 호출을 넘어, 여러 worker를 배치하고 결과를 모아 cross-check하는 script 기반 orchestration 방식입니다.",
    related: ["SubAgent", "Orchestration", "Workflow"],
  },
  {
    term: "Orchestration",
    category: "AI 시스템",
    shortDefinition: "여러 agent, tool, handoff 사이의 작업 소유권과 흐름을 조정하는 설계",
    explanation:
      "Orchestration은 specialist가 대화를 넘겨받는지, manager가 최종 답변 책임을 유지하는지, worker 결과를 어떻게 합성하는지 정하는 구조입니다.",
    related: ["Agent", "SubAgent", "Handoff", "Harness Engineering"],
  },
  {
    term: "Handoff",
    category: "AI 시스템",
    shortDefinition: "대화나 작업 제어권이 specialist agent로 이동하는 위임 방식",
    explanation:
      "Handoff는 specialist가 다음 user-facing response를 소유해야 할 때 쓰는 orchestration 패턴입니다.",
    related: ["Orchestration", "Agent", "SubAgent"],
  },
  {
    term: "Agents as Tools",
    category: "AI 시스템",
    shortDefinition:
      "manager agent가 specialist agent를 내부 도구처럼 호출하고 최종 답변 책임을 유지하는 패턴",
    explanation:
      "Agents as Tools에서는 specialist가 bounded capability로 작동하고, manager가 결과를 받아 최종 응답을 합성합니다.",
    related: ["Orchestration", "Tool Calling", "Agent"],
  },
  {
    term: "Orchestrator-Workers",
    category: "AI 시스템",
    shortDefinition: "central LLM이 작업을 동적으로 쪼개 worker LLMs에 맡기고 결과를 합성하는 구조",
    explanation:
      "Orchestrator-Workers는 subtasks를 미리 예측하기 어려운 복잡한 작업에서 central agent가 worker를 구성하고 결과를 모아 판단하는 workflow입니다.",
    related: ["Orchestration", "SubAgent", "Workflow"],
  },
  {
    term: "Loop Engineering",
    category: "AI 시스템",
    shortDefinition:
      "Agent가 판단과 도구 호출을 반복하는 루프의 종료 조건, 권한, 비용, 검증 기준을 설계하는 일",
    explanation:
      "Loop Engineering은 agent loop를 무작정 오래 돌리는 것이 아니라 max turns, budget, allowed tools, hooks, success signals, blocked signals를 함께 설계해 반복을 통제하는 관점입니다.",
    related: ["Agent Loop", "Tool Calling", "Harness Engineering", "Context Engineering"],
  },
  {
    term: "Stop Condition",
    category: "AI 시스템",
    shortDefinition: "Agent loop가 성공, 실패, 막힘, 사람 승인 등의 이유로 멈추는 기준",
    explanation:
      "Stop Condition은 테스트 통과, 공식 출처 확인, 최대 반복 도달, 같은 실패 반복처럼 루프 종료를 판단하는 신호입니다. 명확한 종료 기준이 없으면 agent는 오래 반복하면서도 실제 완료 상태를 보장하지 못할 수 있습니다.",
    related: ["Loop Engineering", "Agent Loop", "Harness Engineering"],
  },
  {
    term: "Hook",
    category: "AI 시스템",
    shortDefinition: "Agent 실행 중 특정 이벤트에서 차단, 기록, 승인, 변환 같은 결정을 넣는 제어점",
    explanation:
      "Hook은 PreToolUse, PostToolUse, Stop 같은 실행 단계에서 위험 행동을 막거나 결과를 기록하는 장치입니다. 반복 루프에서는 작은 위험 행동이 누적될 수 있으므로 hook이 중요한 통제점이 됩니다.",
    related: ["Loop Engineering", "Harness Engineering", "Tool Calling"],
  },
  {
    term: "Compaction",
    category: "AI 시스템",
    shortDefinition:
      "긴 작업에서 커진 context를 요약하거나 압축해 다음 판단에 필요한 정보만 남기는 방식",
    explanation:
      "Compaction은 context limit에 가까워질 때 긴 history와 tool output을 줄여 루프를 계속 가능하게 하는 context management 기법입니다. 중요한 목표, 시도 내역, 실패 원인, 남은 불확실성이 보존되어야 합니다.",
    related: ["Context Engineering", "Loop Engineering", "Context Window"],
  },
  {
    term: "Sandbox",
    category: "AI 시스템",
    shortDefinition:
      "Agent가 파일, shell, package, port 같은 실행 자원을 격리해 사용하는 작업 환경",
    explanation:
      "Sandbox는 agent가 실제 작업을 수행하는 execution plane입니다. 파일 시스템, shell, installed packages, snapshots 같은 실행 자원을 제공하지만, tool routing, approvals, tracing 같은 control plane은 harness가 담당합니다.",
    related: ["Harness Engineering", "Agent", "Tool Calling"],
  },
  {
    term: "Guardrails",
    category: "AI 시스템",
    shortDefinition: "Agent의 입력, 출력, 도구 행동을 자동으로 검증하는 안전 경계",
    explanation:
      "Guardrails는 input, output, tool behavior를 자동 검증하고 run을 계속할지, 멈출지, 사람 승인으로 넘길지 판단하는 데 쓰입니다. harness 안의 validation boundary로 이해할 수 있습니다.",
    related: ["Harness Engineering", "Human Review", "Tool Calling"],
  },
  {
    term: "Human Review",
    category: "AI 시스템",
    shortDefinition: "민감한 agent 행동을 잠시 멈추고 사람이 approve 또는 reject하는 승인 절차",
    explanation:
      "Human Review는 배포, 삭제, 민감 데이터 수정처럼 자동 진행이 위험한 행동에서 run을 pause하고 사람의 결정을 받는 approval boundary입니다.",
    related: ["Guardrails", "Harness Engineering", "Approval"],
  },
  {
    term: "Trace",
    category: "AI 시스템",
    shortDefinition:
      "Agent workflow run의 model call, tool call, approval, 결과 흐름을 따라갈 수 있는 실행 기록",
    explanation:
      "Trace는 agent 실패를 디버깅하고, 안정화된 뒤 agent workflow evaluation의 high-signal example로 활용할 수 있는 관찰 기록입니다.",
    related: ["Harness Engineering", "Observability", "Evaluation Harness"],
  },
  {
    term: "Evaluation Harness",
    category: "AI 시스템",
    shortDefinition:
      "Agent task를 end-to-end로 실행하고 trial, transcript, outcome, grader 결과를 모아 평가하는 infrastructure",
    explanation:
      "Evaluation Harness는 단일 답변이 아니라 agent가 여러 turn 동안 환경을 바꾸는 작업을 평가하기 위한 구조입니다. transcript와 final environment outcome을 구분해 agent의 실제 성공 여부를 판단합니다.",
    related: ["Harness Engineering", "Agent Evaluation", "Trace"],
  },
  {
    term: "Context Caching",
    category: "AI 시스템",
    shortDefinition:
      "반복 요청에서 변하지 않는 prompt prefix를 재사용해 비용과 지연을 줄이는 컨텍스트 운용 방식",
    explanation:
      "Context Caching은 모델이 의미를 기억하는 기능이 아니라, system instructions, tool definitions, examples 같은 안정적인 prefix 처리를 재사용하는 runtime 최적화입니다.",
    related: ["Context Engineering", "Prompt Caching", "Context Window"],
  },
  {
    term: "Prompt Caching",
    category: "AI 시스템",
    shortDefinition: "같은 또는 호환되는 prompt prefix 처리 결과를 재사용하는 API/runtime 기능",
    explanation:
      "Prompt Caching은 exact prefix match를 기반으로 반복되는 prompt 부분의 처리 비용과 latency를 줄입니다. stable content를 앞쪽에, dynamic content를 뒤쪽에 두는 구조가 중요합니다.",
    related: ["Context Caching", "Cache Hit", "Context Engineering"],
  },
  {
    term: "Cache Hit",
    category: "AI 시스템",
    shortDefinition:
      "이전에 처리한 prompt prefix와 현재 요청의 prefix가 맞아 재사용이 일어나는 상태",
    explanation:
      "Cache Hit은 exact prefix matches에 의존합니다. system prompt timestamp, tool order, earlier message edit처럼 prefix 안의 변화가 생기면 hit이 줄어들 수 있습니다.",
    related: ["Prompt Caching", "Cache Diagnostics"],
  },
  {
    term: "Cache Breakpoint",
    category: "AI 시스템",
    shortDefinition: "prompt에서 어느 지점까지를 cacheable prefix로 볼지 정하는 경계",
    explanation:
      "Cache Breakpoint는 automatic caching이나 explicit cache control에서 반복 prefix의 경계를 잡는 개념입니다. 긴 multi-turn conversation에서는 cache point가 forward될 수 있습니다.",
    related: ["Prompt Caching", "Context Caching"],
  },
  {
    term: "Cache Diagnostics",
    category: "AI 시스템",
    shortDefinition: "cache miss가 어디서 발생했는지 prefix divergence point를 찾는 진단 방식",
    explanation:
      "Cache Diagnostics는 previous response id와 새 request fingerprint를 비교해 model, system prompt, tools, message history 중 어디가 달라졌는지 확인하는 데 사용됩니다.",
    related: ["Cache Hit", "Observability", "Context Caching"],
  },
  {
    term: "AI System Evaluation",
    category: "AI 시스템",
    shortDefinition:
      "모델 출력, trace, 도구 사용, 환경 상태, 성공 기준을 함께 측정해 AI 애플리케이션 품질을 판단하는 평가 체계",
    explanation:
      "AI System Evaluation은 단일 답변 채점이 아니라 agent workflow의 tool calls, guardrails, handoffs, final environment outcome까지 포함해 품질을 측정하는 구조입니다.",
    related: ["Trace Grading", "Grader", "Success Criteria", "Evaluation Harness"],
  },
  {
    term: "Success Criteria",
    category: "AI 시스템",
    shortDefinition:
      "AI 시스템이 성공했다고 판단하기 위해 미리 정의하는 구체적이고 측정 가능한 기준",
    explanation:
      "Success Criteria는 eval과 grader가 무엇을 측정해야 하는지 정하는 출발점입니다. 좋은 기준은 specific, measurable, achievable, relevant해야 합니다.",
    related: ["AI System Evaluation", "Grader"],
  },
  {
    term: "Trace Grading",
    category: "AI 시스템",
    shortDefinition:
      "agent workflow trace를 보고 tool call, handoff, guardrail 같은 실행 경로 문제를 평가하는 방식",
    explanation:
      "Trace Grading은 최종 답변만 보는 대신 model calls, tool calls, guardrails, handoffs의 end-to-end record를 검토해 workflow-level issue를 찾습니다.",
    related: ["Trace", "AI System Evaluation", "Agent"],
  },
  {
    term: "Grader",
    category: "AI 시스템",
    shortDefinition: "success criteria를 출력, trace, outcome에 적용해 평가 신호를 만드는 장치",
    explanation:
      "Grader는 자동 평가나 사람 판단과 결합해 AI 시스템 품질을 측정합니다. 기준이 모호하면 grader의 점수도 의미가 약해집니다.",
    related: ["Success Criteria", "AI System Evaluation"],
  },
  {
    term: "Eval Run",
    category: "AI 시스템",
    shortDefinition:
      "정해진 dataset과 평가 기준으로 AI 시스템을 반복 실행해 품질을 측정하는 평가 실행 단위",
    explanation:
      "Eval Run은 prompt change, model migration, regression tracking처럼 반복 가능한 비교가 필요할 때 사용합니다.",
    related: ["AI System Evaluation", "Dataset", "Grader"],
  },
  {
    term: "Development Environment",
    category: "개발 기초",
    shortDefinition: "코드를 작성, 실행, 확인, 기록하기 위해 함께 쓰는 도구들의 작업 구조",
    explanation:
      "Development Environment는 code editor, terminal, browser, local testing server, version control처럼 개발자가 하나의 프로젝트를 다룰 때 사용하는 도구 묶음입니다. 핵심은 설치 목록이 아니라 역할 분리입니다. 파일은 editor에서 수정하고, 명령은 terminal에서 실행하고, 웹 결과는 browser에서 확인하고, 변경 기록은 Git 같은 version control로 남깁니다.",
    related: ["Code Editor", "Integrated Terminal", "Version Control"],
  },
  {
    term: "Code Editor",
    category: "개발 기초",
    shortDefinition: "코드 파일의 내용을 읽고 수정하는 편집 도구",
    explanation:
      "Code Editor는 프로젝트 파일을 열고 텍스트를 수정하는 도구입니다. VS Code 문서는 자신을 핵심적으로 code editor라고 설명합니다. Terminal, Source Control 같은 기능이 함께 있어도 editor의 기본 역할은 열린 파일의 내용을 바꾸는 것입니다.",
    related: ["Development Environment", "VS Code Explorer", "Source Control View"],
  },
  {
    term: "VS Code Explorer",
    category: "개발 기초",
    shortDefinition: "VS Code에서 프로젝트의 파일과 폴더 구조를 보여주는 탐색 영역",
    explanation:
      "VS Code Explorer는 접근 가능한 files and folders를 보여주는 UI입니다. Explorer에서 파일을 찾는 일과 editor에서 파일 내용을 고치는 일은 다릅니다. AI에게 파일 수정을 요청할 때도 Explorer 기준 경로를 정확히 말하면 혼란이 줄어듭니다.",
    related: ["Code Editor", "File Path", "Development Environment"],
  },
  {
    term: "Integrated Terminal",
    category: "개발 기초",
    shortDefinition: "에디터 안에서 shell command를 실행할 수 있게 하는 터미널 영역",
    explanation:
      "Integrated Terminal은 VS Code 같은 편집기 안에서 standalone terminal처럼 명령을 실행하는 공간입니다. 빌드, 테스트, 배포, Git 명령은 terminal에서 실행될 수 있으며, 현재 작업 폴더가 어디인지가 결과에 영향을 줍니다.",
    related: ["Terminal", "Shell Command", "Development Environment"],
  },
  {
    term: "Local Testing Server",
    category: "웹 개발",
    shortDefinition: "개발 중인 웹 결과를 로컬 환경에서 확인하기 위한 테스트 서버",
    explanation:
      "Local Testing Server는 개발자의 컴퓨터에서 웹 결과를 확인하기 위해 쓰는 서버입니다. 브라우저에 화면이 보인다는 사실이 공개 배포를 뜻하지는 않습니다. 로컬 확인과 운영 배포를 구분하는 입문 기준입니다.",
    related: ["Browser", "Development Environment", "Deployment"],
  },
  {
    term: "Version Control",
    category: "Git & 협업",
    shortDefinition:
      "시간에 따른 파일 변경 기록을 남기고 특정 버전을 다시 불러올 수 있게 하는 시스템",
    explanation:
      "Version Control은 파일 또는 파일 집합의 변경을 기록하는 시스템입니다. 저장은 현재 파일 내용을 디스크에 쓰는 행위이고, version control의 commit은 변경 이력에 의미 있는 묶음을 남기는 행위입니다.",
    related: ["Git", "Source Control View", "Commit"],
  },
  {
    term: "Source Control View",
    category: "Git & 협업",
    shortDefinition:
      "편집기 안에서 Git 변경, staging, commit 같은 source control 작업을 보여주는 UI",
    explanation:
      "Source Control View는 Git 같은 version control 시스템의 상태를 편집기 UI로 보여주는 영역입니다. VS Code는 staging, committing, branching, merge conflict resolution 같은 작업을 Source Control 기능으로 제공합니다. UI를 쓰더라도 underlying Git 개념을 이해해야 합니다.",
    related: ["Version Control", "Git", "Code Editor"],
  },
  {
    term: "Vibe Coding",
    category: "AI 코딩",
    shortDefinition: "자연어로 AI에게 코딩을 맡기고 결과를 보며 조정하는 개발 방식",
    explanation:
      "Vibe Coding은 AI에게 자연어로 만들 것을 말하고, AI가 생성한 코드나 변경 결과를 사람이 보며 다시 지시하는 작업 방식입니다. Karpathy 2025 맥락에서는 코드 자체를 깊게 읽지 않고 결과와 대화 흐름으로 진행하는 강한 뉘앙스가 있어, 빠른 prototype 가능성과 검증 없는 수용 위험을 함께 다루어야 합니다.",
    related: ["Natural Language to Code", "AI-Assisted Steering", "Human Review"],
  },
  {
    term: "Natural Language to Code",
    category: "AI 코딩",
    shortDefinition: "사람이 자연어로 의도를 말하고 AI가 computer code로 변환하는 흐름",
    explanation:
      "Natural Language to Code는 Collins가 vibe coding을 설명할 때 쓴 핵심 방향입니다. 사용자는 함수명이나 문법보다 만들고 싶은 결과를 말하고, AI는 그 의도를 코드 변경으로 바꿉니다. 다만 자연어 입력이 검증을 대체하지는 않으므로 결과 코드에는 review와 test가 필요합니다.",
    related: ["Vibe Coding", "Prompt Engineering", "Code Generation"],
  },
  {
    term: "AI-Assisted Steering",
    category: "AI 코딩",
    shortDefinition: "사람이 AI 생성 결과를 보며 다음 요청과 수정 방향을 조정하는 작업 방식",
    explanation:
      "AI-Assisted Steering은 사람이 모든 줄을 직접 쓰기보다 AI가 만든 결과, 오류 메시지, 화면 변화를 보고 다음 지시를 정하는 흐름입니다. Karpathy 사례의 error message 복사와 대화식 수정은 이런 steering의 예로 볼 수 있습니다.",
    related: ["Vibe Coding", "Development Environment", "Verification"],
  },
  {
    term: "Prototype Boundary",
    category: "AI 코딩",
    shortDefinition: "빠른 실험과 운영 품질이 필요한 작업을 구분하는 위험 경계",
    explanation:
      "Prototype Boundary는 throwaway, learning, production 같은 작업 위험도를 나누어 AI 생성 코드의 검증 강도를 달리하는 기준입니다. 학습용 prototype에서는 빠른 반복이 유용할 수 있지만, production feature에서는 human review, test, diff review 같은 안전 장치가 필요합니다.",
    related: ["Human Review", "Technical Debt", "Verification"],
  },
  {
    term: "Material Disengagement",
    category: "AI 코딩",
    shortDefinition: "AI 코딩 과정에서 코드 자체를 직접 다루는 감각이 약해지는 현상",
    explanation:
      "Material Disengagement는 vibe coding 연구 문맥에서 코드 물질과의 거리두기를 설명하는 관점입니다. 사람이 코드 줄을 직접 읽고 쓰기보다 자연어, 화면 결과, 오류 메시지를 통해 작업을 조정할 때 생길 수 있습니다. 이 현상은 빠른 산출을 가능하게 하지만 검토 부족 위험도 만듭니다.",
    related: ["Vibe Coding", "AI-Assisted Steering", "Human Review"],
  },
  {
    term: "Dynamic Trust",
    category: "AI 시스템",
    shortDefinition: "AI 도구에 대한 신뢰를 작업 위험도와 검증 결과에 따라 계속 조정하는 태도",
    explanation:
      "Dynamic Trust는 바이브코딩에서 AI 도구에 대한 신뢰가 고정값이 아니라는 관점입니다. 작업이 학습용인지 운영용인지, 테스트가 실행됐는지, 사람이 diff를 검토했는지에 따라 신뢰 수준과 검증 강도를 바꿔야 합니다.",
    related: ["Vibe Coding", "Human Review", "Evaluation"],
  },
  {
    term: "AI Learning Verification",
    category: "AI 학습",
    shortDefinition: "AI 설명과 생성물을 근거, 실행, 평가, 사람 검토로 확인하며 배우는 절차",
    explanation:
      "AI Learning Verification은 AI가 말한 내용을 claim 단위로 나누고, direct quote와 citation이 실제로 주장을 support하는지 확인하며, 코드에는 실행과 human review를 붙이는 학습 방식입니다. 목표는 AI를 불신하는 것이 아니라 빠른 설명을 검증 가능한 이해로 바꾸는 것입니다.",
    related: ["Verification", "Citation", "Human Review"],
  },
  {
    term: "Direct Quote Grounding",
    category: "AI 시스템",
    shortDefinition: "사실 주장에 원문 직접 인용을 붙여 claim과 source의 거리를 줄이는 방식",
    explanation:
      "Direct Quote Grounding은 AI 설명의 핵심 claim을 원문 문장과 직접 연결하는 검증 방식입니다. 링크만 제시하면 요약과 해석이 섞일 수 있으므로, 원문 구절을 함께 읽어 claim이 실제 source로 뒷받침되는지 확인합니다.",
    related: ["Citation", "Grounding", "Claim Audit"],
  },
  {
    term: "Source Invention",
    category: "AI 위험",
    shortDefinition: "AI가 실제로 제공되지 않은 source ID, 줄 번호, locator를 만들어내는 오류",
    explanation:
      "Source Invention은 citation처럼 보이지만 검증을 방해하는 hallucination 유형입니다. OpenAI citation formatting은 source IDs, line ranges, block locators를 invent하지 말라고 설명합니다. 검증 가능한 출처 위치만 사용해야 합니다.",
    related: ["Citation", "Hallucination", "Source Locator"],
  },
  {
    term: "Direct Support",
    category: "AI 시스템",
    shortDefinition: "citation source가 답변 문장의 핵심 claim을 실제로 뒷받침하는 관계",
    explanation:
      "Direct Support는 출처가 답변 주변 주제를 말하는 수준이 아니라 cited text의 핵심 의미를 실제로 support하는 상태입니다. Citation audit에서는 링크 존재보다 direct support 여부가 더 중요합니다.",
    related: ["Citation", "Citable Unit", "Claim Audit"],
  },
  {
    term: "Structured Test",
    category: "AI 평가",
    shortDefinition: "같은 기준을 반복 적용해 AI 답변이나 시스템 성능을 확인하는 테스트",
    explanation:
      "Structured Test는 OpenAI evals 설명과 연결되는 개념입니다. 학습에서는 큰 평가 플랫폼 없이도 direct quote 존재, citation direct support, invented source 없음 같은 기준을 여러 사례에 반복 적용하는 작은 eval로 사용할 수 있습니다.",
    related: ["Evaluation Set", "Eval Run", "Verification"],
  },
  {
    term: "Code Review Boundary",
    category: "AI 코딩",
    shortDefinition:
      "AI 생성 코드가 실행 결과만으로 승인되지 않고 사람이 diff와 위험을 검토해야 하는 경계",
    explanation:
      "Code Review Boundary는 code generation에서 human review가 특히 중요하다는 원칙을 학습 절차로 바꾼 것입니다. 실행 성공, 테스트 결과, 변경 파일, 사람 검토를 분리해 보며 production에 가까울수록 검토 강도를 높입니다.",
    related: ["Human Review", "Vibe Coding", "Verification"],
  },
  {
    term: "File Path",
    category: "개발 기초",
    shortDefinition: "파일이나 폴더의 위치를 나타내는 문자열",
    explanation:
      "File Path는 컴퓨터 안에서 특정 파일이나 폴더가 어디에 있는지 가리키는 문자열입니다. Node.js Learn 문서는 모든 file이 path를 가진다고 설명합니다. AI에게 파일 수정을 요청할 때 파일 이름만이 아니라 folder structure를 포함한 path를 말하면 모호성이 줄어듭니다.",
    related: ["Folder", "Path Separator", "File System"],
  },
  {
    term: "Folder",
    category: "개발 기초",
    shortDefinition: "파일과 다른 폴더를 묶어 계층 구조를 만드는 단위",
    explanation:
      "Folder는 프로젝트 파일을 구조화하고 맥락을 만드는 단위입니다. VS Code Explorer는 files and folders를 보여주며, Node.js packages 문서는 package를 folder tree로 설명합니다. 모든 folder가 package는 아니지만 package는 folder tree로 나타날 수 있습니다.",
    related: ["File Path", "Package Folder Tree", "VS Code Explorer"],
  },
  {
    term: "Path Separator",
    category: "개발 기초",
    shortDefinition: "경로 안에서 폴더 이름들을 구분하는 문자",
    explanation:
      "Path Separator는 경로 문자열에서 폴더 계층을 나누는 구분자입니다. Windows와 Linux/macOS path는 다르게 생길 수 있으므로 문자열을 직접 이어 붙이기보다 `node:path` 같은 utility를 사용하는 편이 안전합니다.",
    related: ["File Path", "Node Path Module", "Operating System"],
  },
  {
    term: "Directory Name",
    category: "개발 기초",
    shortDefinition: "경로에서 파일이 들어 있는 폴더 구조 부분",
    explanation:
      "Directory Name은 `path.dirname()`으로 얻을 수 있는 경로의 폴더 부분입니다. 파일 이름이 같아도 directory가 다르면 다른 파일일 수 있으므로, AI 요청과 오류 분석에서 directory를 함께 확인해야 합니다.",
    related: ["File Path", "Base Name", "Node Path Module"],
  },
  {
    term: "Base Name",
    category: "개발 기초",
    shortDefinition: "경로의 마지막 파일 이름 또는 폴더 이름 부분",
    explanation:
      "Base Name은 `path.basename()`으로 얻을 수 있는 경로의 마지막 이름입니다. 파일 이름을 말할 때 유용하지만, 같은 basename이 여러 folder에 있을 수 있으므로 full path와 함께 보는 것이 안전합니다.",
    related: ["Directory Name", "File Extension", "File Path"],
  },
  {
    term: "File Extension",
    category: "개발 기초",
    shortDefinition: "파일 이름 끝에서 파일 형식이나 용도를 나타내는 접미 부분",
    explanation:
      "File Extension은 `.ts`, `.md`, `.json`처럼 파일 이름 끝에 붙는 부분입니다. Node.js Learn 문서는 `path.extname()`으로 extension을 얻는 예를 제시합니다. Extension은 파일의 용도 추정에 도움을 주지만, 위치 정보인 path와 함께 봐야 합니다.",
    related: ["Base Name", "File Path", "Node Path Module"],
  },
  {
    term: "Node Path Module",
    category: "Node.js",
    shortDefinition: "file and directory paths를 다루는 Node.js utility module",
    explanation:
      "Node Path Module은 `node:path`로 import하며 file and directory paths를 조작하는 utility를 제공합니다. 경로 문자열을 직접 이어 붙이는 대신 `path.join`, `path.dirname`, `path.basename`, `path.extname` 같은 함수를 사용해 OS 차이를 고려할 수 있습니다.",
    related: ["File Path", "Path Separator", "Node File System Module"],
  },
  {
    term: "Node File System Module",
    category: "Node.js",
    shortDefinition: "Node.js에서 file system과 상호작용하게 하는 module",
    explanation:
      "Node File System Module은 `node:fs` 또는 `node:fs/promises`로 사용하며 파일 읽기와 쓰기 같은 file system interaction을 담당합니다. `node:path`가 경로 문자열을 다룬다면 `node:fs`는 그 경로의 실제 파일 시스템 작업을 수행합니다.",
    related: ["Node Path Module", "File System", "File Path"],
  },
  {
    term: "Package Folder Tree",
    category: "Node.js",
    shortDefinition: "`package.json` file로 described되는 package의 폴더 계층",
    explanation:
      "Package Folder Tree는 Node.js packages 문서가 package를 설명할 때 쓰는 구조입니다. JavaScript 프로젝트에서는 `package.json`이 있는 folder tree가 package 경계를 나타낼 수 있습니다. 모든 folder가 package는 아니므로 `package.json`과 함께 확인해야 합니다.",
    related: ["Folder", "package.json", "Node.js"],
  },
  {
    term: "Terminal",
    category: "개발 기초",
    shortDefinition: "shell을 host하고 텍스트 명령 입력과 출력을 보여주는 인터페이스",
    explanation:
      "Terminal은 command shell을 담는 text-based interface application입니다. VS Code integrated terminal처럼 편집기 안에 열릴 수도 있고 standalone terminal처럼 명령을 실행할 수도 있습니다. Terminal 화면과 내부 shell을 구분해야 현재 명령이 어떤 규칙으로 해석되는지 알 수 있습니다.",
    related: ["Shell", "Integrated Terminal", "Command Line"],
  },
  {
    term: "Shell",
    category: "개발 기초",
    shortDefinition:
      "사용자의 텍스트 입력을 평가하고 shell command 또는 OS 실행으로 넘기는 프로그램",
    explanation:
      "Shell은 keyboard input을 받아 evaluate하고 command를 실행하거나 operating system에 실행을 넘깁니다. PowerShell, Command Prompt, Git Bash, WSL 같은 profile은 서로 다른 shell 환경을 제공할 수 있으므로 AI가 제안한 명령을 실행하기 전 현재 shell을 확인해야 합니다.",
    related: ["Terminal", "Shell Profile", "Command Output"],
  },
  {
    term: "Command Line",
    category: "개발 기초",
    shortDefinition: "텍스트 명령을 입력해 개발 작업을 실행하는 상호작용 방식",
    explanation:
      "Command Line은 terminal 또는 shell에서 commands를 실행하는 텍스트 기반 작업 흐름입니다. Web development에서는 build, test, deploy, Git, package manager 작업이 command line으로 실행될 수 있습니다.",
    related: ["Terminal", "Shell", "Basic Commands"],
  },
  {
    term: "Current Directory",
    category: "개발 기초",
    shortDefinition: "shell command가 기준으로 삼는 현재 폴더",
    explanation:
      "Current Directory는 명령이 상대 경로를 해석할 때 기준이 되는 위치입니다. VS Code integrated terminal은 workspace root에서 시작할 수 있지만 사용자가 위치를 바꾸면 명령의 기준도 달라집니다. 명령 실행 전 current directory 확인은 터미널 검증의 첫 단계입니다.",
    related: ["File Path", "Terminal", "Shell Command"],
  },
  {
    term: "Shell Profile",
    category: "개발 기초",
    shortDefinition:
      "VS Code terminal 같은 환경에서 선택되는 PowerShell, Command Prompt, Git Bash, WSL 등의 shell 종류",
    explanation:
      "Shell Profile은 같은 terminal UI 안에서 어떤 shell을 사용할지 정하는 설정입니다. VS Code Terminal Basics는 PowerShell, Command Prompt, Git Bash, WSL 같은 profile을 설명합니다. Shell profile이 다르면 같은 의도의 명령도 문법과 출력이 달라질 수 있습니다.",
    related: ["Shell", "PowerShell Cmdlet", "Terminal"],
  },
  {
    term: "Basic Commands",
    category: "개발 기초",
    shortDefinition:
      "파일, 폴더, 검색, 이동, 복사 같은 기본 작업을 terminal에서 수행하는 명령 묶음",
    explanation:
      "Basic Commands는 MDN command line crash course가 다루는 `cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp` 같은 입문 명령 묶음입니다. 세부 옵션 암기보다 current directory, shell, path와 연결해 이해하는 것이 먼저입니다.",
    related: ["Command Line", "Current Directory", "File Path"],
  },
  {
    term: "PowerShell Cmdlet",
    category: "개발 기초",
    shortDefinition: "PowerShell에서 Verb-Noun pair 이름을 갖는 command",
    explanation:
      "PowerShell Cmdlet은 Microsoft Learn이 설명하는 PowerShell command 형태입니다. `Get-Location`, `Get-ChildItem`, `Set-Location`, `Get-Command`처럼 Verb-Noun 이름을 사용해 command가 하는 일을 읽기 쉽게 만듭니다.",
    related: ["PowerShell", "Shell", "Shell Profile"],
  },
  {
    term: "Command Output",
    category: "개발 기초",
    shortDefinition: "shell command 실행 후 terminal에 나타나는 결과와 오류 메시지",
    explanation:
      "Command Output은 명령 실행의 증거입니다. AI에게 오류를 물어볼 때는 command, current directory, shell, output summary를 함께 제공해야 문제 원인을 더 잘 나눌 수 있습니다.",
    related: ["Terminal", "Verification", "Shell Command"],
  },
  {
    term: "Variable",
    category: "개발 기초",
    shortDefinition: "값을 이름으로 저장하고 다시 참조하게 하는 JavaScript 이름표",
    explanation:
      "Variable은 value를 담는 container로 설명될 수 있지만, JavaScript에서는 variable 자체가 type을 갖는 것이 아니라 지금 연결된 value가 type을 가집니다. `let`은 재할당 가능한 이름을 만들고 `const`는 같은 binding에 새 값을 다시 할당하지 않겠다는 의도를 나타냅니다.",
    related: ["Value", "Data Type", "JavaScript"],
  },
  {
    term: "Value",
    category: "개발 기초",
    shortDefinition: "변수에 담기거나 표현식에서 만들어지는 실제 데이터",
    explanation:
      "Value는 string, number, boolean, object, array처럼 runtime에서 동작하는 데이터입니다. JavaScript는 dynamically typed language이므로 variable 이름보다 그 이름에 현재 연결된 value의 type을 확인하는 것이 중요합니다.",
    related: ["Variable", "Primitive Value", "Object Shape"],
  },
  {
    term: "Primitive Value",
    category: "개발 기초",
    shortDefinition: "JavaScript에서 object가 아닌 기본 value 분류",
    explanation:
      "Primitive Value는 MDN이 JavaScript data structures에서 object와 구분해 설명하는 기본 값 분류입니다. string, number, boolean, undefined, symbol, bigint, null 같은 값이 여기에 속하며, object property collection과 구분해 읽어야 합니다.",
    related: ["Data Type", "Value", "Object"],
  },
  {
    term: "Object Shape",
    category: "개발 기초",
    shortDefinition: "object가 가진 property 이름과 각 property value의 구조",
    explanation:
      "Object Shape는 object의 key-value property 구성을 읽는 방식입니다. API 응답, UI state, AI가 생성한 코드의 데이터 계약을 검토할 때 어떤 property가 있고 그 value가 어떤 type인지 확인하는 기준이 됩니다.",
    related: ["Object", "Property", "Data Contract"],
  },
  {
    term: "Array",
    category: "개발 기초",
    shortDefinition: "여러 값을 순서와 index로 다루는 list-like object",
    explanation:
      "Array는 순서가 있는 값 목록입니다. 검색 결과, 강의 목록, 태그 목록처럼 개수가 변할 수 있는 데이터를 다룰 때 사용하며, 각 element의 shape를 함께 확인해야 안전하게 렌더링하거나 반복 처리할 수 있습니다.",
    related: ["Indexed Collection", "Loop", "Object Shape"],
  },
  {
    term: "Control Flow",
    category: "개발 기초",
    shortDefinition: "코드가 어떤 순서와 조건으로 실행될지 정하는 흐름",
    explanation:
      "Control Flow는 조건문, 반복문, 함수 호출, 오류 처리처럼 코드의 가능한 실행 경로를 만드는 구조입니다. AI가 생성한 코드를 검토할 때는 문법뿐 아니라 어떤 입력이 어떤 branch와 return value로 이어지는지 확인해야 합니다.",
    related: ["Conditional", "Loop", "Exception Handling"],
  },
  {
    term: "Conditional",
    category: "개발 기초",
    shortDefinition: "test result에 따라 다른 code path를 실행하는 구조",
    explanation:
      "Conditional은 `if...else`, `switch`, ternary처럼 조건이 true인지 false인지 또는 어떤 case인지에 따라 실행할 code block을 고르는 구조입니다. 빈 값, 권한, 응답 상태, array length 같은 판단 기준을 코드 흐름으로 바꿉니다.",
    related: ["Control Flow", "Boolean", "Branch"],
  },
  {
    term: "Loop",
    category: "개발 기초",
    shortDefinition: "같은 작업을 여러 항목이나 조건에 대해 반복 실행하는 구조",
    explanation:
      "Loop는 목록의 각 항목을 처리하거나 특정 조건이 유지되는 동안 같은 규칙을 적용하는 control flow입니다. 시작점, 계속 조건, 갱신, 종료 조건을 함께 읽어야 무한 반복이나 누락을 피할 수 있습니다.",
    related: ["Array", "Control Flow", "Iteration"],
  },
  {
    term: "Function",
    category: "개발 기초",
    shortDefinition: "입력과 처리를 이름 있는 재사용 가능한 코드 블록으로 묶은 단위",
    explanation:
      "Function은 reusable blocks of code로, parameter를 받고 내부 body를 실행한 뒤 return value를 낼 수 있습니다. 함수 이름, parameter, return value는 AI에게 작업을 맡기거나 코드 변경을 검토할 때 가장 좋은 경계가 됩니다.",
    related: ["Parameter", "Return Value", "Scope"],
  },
  {
    term: "Exception Handling",
    category: "개발 기초",
    shortDefinition: "정상 흐름으로 처리할 수 없는 실패를 던지고 잡아 다루는 구조",
    explanation:
      "Exception Handling은 `throw`와 `try...catch` 같은 흐름으로 실패를 드러내고 처리합니다. 오류를 숨기는 것이 아니라 사용자 메시지, 로그, fallback, 재시도 같은 의미 있는 후속 행동으로 연결해야 합니다.",
    related: ["Error Message", "Debugging", "Control Flow"],
  },
  {
    term: "Debugging",
    category: "개발 기초",
    shortDefinition: "코드가 기대와 다르게 동작하는 원인을 찾아 수정하는 활동",
    explanation:
      "Debugging은 오류 메시지, console output, breakpoint, variables, call stack 같은 단서를 이용해 실패 원인을 좁히는 절차입니다. AI와 협업할 때는 원인 추측보다 재현 가능한 evidence packet을 만드는 것이 중요합니다.",
    related: ["Error Message", "Breakpoint", "Verification"],
  },
  {
    term: "Error Message",
    category: "개발 기초",
    shortDefinition: "코드 실행 실패의 종류와 위치를 설명하는 텍스트 단서",
    explanation:
      "Error Message는 error type, message, file, line 같은 정보를 포함할 수 있습니다. 메시지를 일부만 요약하지 말고 원문으로 보존하면 MDN error reference나 AI 디버깅 요청에서 더 정확하게 대조할 수 있습니다.",
    related: ["Debugging", "JavaScript Error Reference", "Command Output"],
  },
  {
    term: "Breakpoint",
    category: "개발 기초",
    shortDefinition: "debugger가 코드 실행을 멈추도록 지정한 위치",
    explanation:
      "Breakpoint는 특정 line에서 실행을 멈추고 현재 variables, watch expression, call stack을 확인하게 합니다. 오류가 특정 branch나 반복 중에만 발생할 때 실제 runtime state를 보는 데 유용합니다.",
    related: ["Debugger", "Call Stack", "Variable Inspection"],
  },
  {
    term: "Call Stack",
    category: "개발 기초",
    shortDefinition: "현재 실행 지점까지 이어진 함수 호출 경로",
    explanation:
      "Call Stack은 오류가 드러난 line뿐 아니라 어떤 함수들이 그 지점까지 호출되었는지 보여줍니다. 오류 location과 실제 원인이 다를 수 있으므로 call stack은 원인을 거슬러 올라가는 중요한 단서입니다.",
    related: ["Function", "Debugging", "Breakpoint"],
  },
  {
    term: "Evidence Packet",
    category: "AI 코딩",
    shortDefinition: "AI에게 오류 분석을 맡길 때 함께 제공하는 실행 증거 묶음",
    explanation:
      'Evidence Packet은 command, current directory, shell, error message, file path, expected result, actual result, 최근 변경 사항을 묶은 디버깅 입력입니다. "안 돼요"를 원인 분석 가능한 기술적 질문으로 바꿉니다.',
    related: ["Command Output", "Debugging", "AI Learning Verification"],
  },
  {
    term: "Regular Expression",
    category: "개발 기초",
    shortDefinition: "문자열에서 특정 character pattern을 찾기 위한 표현식",
    explanation:
      "Regular Expression은 character combinations를 match하는 pattern입니다. 코드 검색에서는 함수명, import문, prop 이름, console 호출처럼 반복되는 텍스트 모양을 찾아 검토 후보를 줄이는 데 쓰입니다.",
    related: ["RegExp", "Code Search", "Pattern Matching"],
  },
  {
    term: "RegExp",
    category: "JavaScript",
    shortDefinition: "JavaScript에서 regular expression pattern을 표현하는 object",
    explanation:
      "RegExp는 text를 pattern으로 matching하는 JavaScript object입니다. literal notation과 constructor 방식이 있으며, flags로 matching behavior를 바꿀 수 있습니다. editor search와 JavaScript RegExp는 비슷하지만 도구별 차이를 확인해야 합니다.",
    related: ["Regular Expression", "Flags", "Pattern Matching"],
  },
  {
    term: "Character Class",
    category: "개발 기초",
    shortDefinition: "정규식에서 가능한 문자 집합을 표현하는 요소",
    explanation:
      "Character Class는 `[A-Z]`, `[0-9]`처럼 여러 문자 후보 중 하나를 match하게 합니다. 코드 검색에서는 naming pattern, 숫자 suffix, 특정 문자 범위를 찾을 때 사용합니다.",
    related: ["Regular Expression", "Pattern Matching", "Code Search"],
  },
  {
    term: "Assertion",
    category: "개발 기초",
    shortDefinition: "정규식에서 줄 시작, 줄 끝, 단어 경계 같은 위치 조건을 표현하는 요소",
    explanation:
      "Assertion은 문자를 소비하기보다 match 위치를 제한합니다. `^import`처럼 줄 시작 조건을 사용하면 일반 문자열 검색보다 후보를 줄일 수 있습니다.",
    related: ["Regular Expression", "Search Scope", "Code Search"],
  },
  {
    term: "Search Scope",
    category: "개발 도구",
    shortDefinition: "코드 검색이 적용될 파일과 폴더 범위",
    explanation:
      "Search Scope는 VS Code Search view 같은 도구에서 어떤 파일을 포함하거나 제외할지 정하는 범위입니다. 정규식 pattern과 scope를 함께 지정해야 주석, 문서, fixture 같은 불필요한 결과를 줄일 수 있습니다.",
    related: ["Code Search", "Regular Expression", "File Path"],
  },
  {
    term: "package.json",
    category: "Node.js",
    shortDefinition: "Node.js와 npm package의 metadata를 담는 JSON 파일",
    explanation:
      "package.json은 package name, version, scripts, dependencies 같은 fields를 담아 package folder tree를 설명하는 중심 metadata 파일입니다. 프로젝트에서 어떤 command를 실행할 수 있고 어떤 package에 의존하는지 확인하는 입구가 됩니다.",
    related: ["Package Folder Tree", "npm scripts", "Dependency"],
  },
  {
    term: "Semantic Versioning",
    category: "개발 기초",
    shortDefinition: "버전 번호를 MAJOR.MINOR.PATCH 의미로 읽게 하는 규칙",
    explanation:
      "Semantic Versioning은 incompatible API changes, backwards-compatible functionality, backwards-compatible bug fixes를 major, minor, patch 증가와 연결해 version number가 변경 위험을 전달하게 합니다. dependency update를 검토할 때 첫 분류 기준으로 쓸 수 있습니다.",
    related: ["Version Range", "Dependency", "package.json"],
  },
  {
    term: "Dependency",
    category: "Node.js",
    shortDefinition: "프로젝트가 실행이나 빌드에 필요로 하는 외부 package 요구사항",
    explanation:
      "Dependency는 package.json의 dependencies field에서 package name과 version range의 mapping으로 표현됩니다. AI가 새 package를 추가하거나 upgrade할 때 package name과 version range를 함께 확인해야 합니다.",
    related: ["package.json", "Version Range", "Package Specifier"],
  },
  {
    term: "Version Range",
    category: "Node.js",
    shortDefinition: "dependency가 허용하는 package version 집합을 표현하는 범위",
    explanation:
      "Version Range는 npm semantic versioning 문서가 설명하는 dependency update 허용 범위입니다. package.json에 적힌 값이 정확한 version 하나인지 range인지 확인해야 update risk를 판단할 수 있습니다.",
    related: ["Semantic Versioning", "Dependency", "package.json"],
  },
  {
    term: "npm scripts",
    category: "Node.js",
    shortDefinition: "package.json scripts field에 저장된 실행 command 목록",
    explanation:
      "npm scripts는 package metadata 안에 command 이름과 실제 shell command를 연결해 둔 구조입니다. terminal에서 npm run build 같은 명령을 실행할 때 어떤 script entry가 실행되는지 package.json에서 확인할 수 있습니다.",
    related: ["package.json", "Terminal", "Command Line"],
  },
  {
    term: "Package Specifier",
    category: "Node.js",
    shortDefinition: "npm에서 package를 가리키는 name, version, tag, URL, git URL 등의 표기",
    explanation:
      "Package Specifier는 npm package spec 문서가 설명하는 package 식별 표기입니다. dependency나 install command를 검토할 때 package name만 보지 않고 어떤 specifier 형태로 지정됐는지 확인해야 합니다.",
    related: ["Dependency", "Version Range", "package.json"],
  },
] satisfies readonly GlossaryTerm[]
