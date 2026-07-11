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
    term: "Agent Hook",
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
  {
    term: "Semantic HTML",
    category: "웹 개발",
    shortDefinition:
      "화면의 모양이 아니라 콘텐츠의 역할과 구조가 드러나도록 HTML 요소를 고르는 방식",
    explanation:
      "Semantic HTML은 `main`, `nav`, `article`, `section`처럼 요소 이름 자체가 문서 안에서의 역할을 말하게 하는 작성 방식입니다. CSS class나 시각적 배치만으로 구조를 추측하게 두지 않고, DOM tree와 접근성 해석, AI 코드 수정 범위가 읽을 수 있는 의미를 HTML에 남깁니다.",
    related: ["HTML", "DOM", "Accessibility"],
  },
  {
    term: "Content Sectioning",
    category: "웹 개발",
    shortDefinition: "문서 내용을 논리적인 조각으로 조직하는 HTML 요소 범주",
    explanation:
      "Content Sectioning은 `article`, `section`, `nav`, `aside`, heading처럼 페이지 내용을 logical pieces로 나누는 HTML 요소 흐름입니다. 강의 본문, 목차, 독립 카드처럼 서로 다른 역할을 가진 영역을 분리해 문서 구조를 읽기 쉽게 만듭니다.",
    related: ["Semantic HTML", "HTML", "Heading"],
  },
  {
    term: "Main Element",
    category: "HTML",
    shortDefinition: "문서 body에서 중심 주제나 핵심 기능과 직접 연결된 dominant content 영역",
    explanation:
      "Main Element는 `<main>`으로 작성하며, 페이지에서 반복되는 navigation이나 footer가 아니라 해당 문서의 중심 내용을 나타냅니다. 학습 사이트에서는 강의 본문이나 실제 작업 영역을 main으로 잡으면 AI에게 변경 범위를 설명할 때 기준점이 됩니다.",
    related: ["Semantic HTML", "HTML", "DOM"],
  },
  {
    term: "Nav Element",
    category: "HTML",
    shortDefinition: "현재 문서나 다른 문서로 이동하는 navigation links를 제공하는 영역",
    explanation:
      "Nav Element는 `<nav>`로 작성하며 메뉴, 목차, index처럼 이동을 담당하는 링크 묶음을 나타냅니다. 모든 링크를 nav에 넣는 것이 아니라, 사용자가 길을 찾는 데 쓰는 navigation section을 명확히 표시하는 데 사용합니다.",
    related: ["Semantic HTML", "Navigation", "Accessibility"],
  },
  {
    term: "Article Element",
    category: "HTML",
    shortDefinition: "독립적으로 배포되거나 재사용될 수 있는 콘텐츠 단위",
    explanation:
      "Article Element는 `<article>`로 작성하며 글, forum post, product card, 강의 preview처럼 따로 떼어도 의미가 남는 구성에 적합합니다. 리스트 안의 카드나 학습 콘텐츠 단위를 AI가 수정할 때 article boundary는 재사용 가능한 단위를 알려 줍니다.",
    related: ["Semantic HTML", "Content Sectioning", "HTML"],
  },
  {
    term: "CSS Cascade",
    category: "CSS",
    shortDefinition: "여러 출처에서 온 CSS 선언 중 최종 property value를 고르는 알고리즘",
    explanation:
      'CSS Cascade는 user agent, author, user style과 selector, importance, specificity, order 같은 조건을 종합해 어떤 CSS declaration이 실제 값이 되는지 결정합니다. 스타일이 적용되지 않을 때는 "왜 안 먹지"보다 cascade 단계에서 어떤 선언이 이겼는지 확인해야 합니다.',
    related: ["CSS", "Specificity", "CSS Declaration"],
  },
  {
    term: "Specificity",
    category: "CSS",
    shortDefinition: "selector가 얼마나 구체적인지 비교해 cascade 판단에 쓰는 기준",
    explanation:
      "Specificity는 cascade algorithm의 한 단계이며, style 충돌에서 어떤 selector의 declaration이 더 강하게 적용될지 판단하는 데 사용됩니다. 다만 cascade는 specificity만으로 끝나지 않고 relevance, origin and importance, scoping proximity, order of appearance와 함께 작동합니다.",
    related: ["CSS Cascade", "Selector", "CSS Declaration"],
  },
  {
    term: "Normal Flow",
    category: "CSS",
    shortDefinition: "별도 layout intervention이 없을 때 HTML 요소가 기본적으로 배치되는 흐름",
    explanation:
      "Normal Flow는 CSS layout을 이해하는 출발점입니다. 요소는 기본 display와 document order에 따라 먼저 배치되고, flexbox, grid, positioning 같은 layout tools는 이 기본 흐름을 필요한 방식으로 바꿉니다.",
    related: ["CSS Layout", "Display", "HTML"],
  },
  {
    term: "Responsive Design",
    category: "CSS",
    shortDefinition: "특정 화면 하나가 아니라 다양한 device 조건에 반응하는 layout 접근법",
    explanation:
      'Responsive Design은 별도의 단일 기술이 아니라 fluid layout, flexible media, media queries 같은 best practices를 조합하는 접근입니다. AI가 "반응형으로 만들었다"고 할 때 실제로 viewport와 unknown screen sizes에 대응하는 CSS 구조가 있는지 확인해야 합니다.',
    related: ["Media Query", "CSS Layout", "Viewport"],
  },
  {
    term: "Media Query",
    category: "CSS",
    shortDefinition: "media type이나 feature 조건에 따라 CSS style을 조건부로 적용하는 문법",
    explanation:
      "Media Query는 `@media` 규칙으로 viewport width 같은 조건을 검사해 특정 CSS 선언을 적용합니다. 화면 크기만이 전부는 아니지만, responsive layout에서 breakpoints와 mobile-first 흐름을 만들 때 자주 사용됩니다.",
    related: ["Responsive Design", "CSS Cascade", "Viewport"],
  },
  {
    term: "DOM",
    category: "웹 개발",
    shortDefinition:
      "웹 문서 구조를 scripts와 programming languages가 다룰 수 있게 memory 안의 logical tree로 표현하는 Web API",
    explanation:
      "DOM은 HTML document를 node와 object로 이루어진 tree로 나타내며, JavaScript가 structure, style, content를 읽고 바꾸는 통로가 됩니다. JavaScript 언어 자체의 일부가 아니라 browser가 제공하는 Web API이므로 언어 문법과 DOM API를 구분해 읽어야 합니다.",
    related: ["JavaScript", "HTML", "Event"],
  },
  {
    term: "Event",
    category: "웹 개발",
    shortDefinition: "EventTarget에서 발생한 사용자 행동이나 API 진행 상태를 나타내는 객체",
    explanation:
      "Event는 click, keyboard input, async task progress처럼 target에서 일어난 변화를 코드가 다룰 수 있게 표현합니다. event handler는 event object를 받아 target, propagation, type 같은 정보를 기준으로 후속 동작을 결정합니다.",
    related: ["EventTarget", "addEventListener", "Event Delegation"],
  },
  {
    term: "addEventListener",
    category: "Web API",
    shortDefinition: "지정한 event가 target에 전달될 때 호출할 function을 등록하는 DOM API method",
    explanation:
      "addEventListener는 Element, Document, Window 같은 EventTarget에 listener function을 연결합니다. 버튼 click, form submit, list item 선택처럼 사용자 interaction을 JavaScript control flow로 이어 주는 핵심 method입니다.",
    related: ["Event", "EventTarget", "JavaScript"],
  },
  {
    term: "Event Bubbling",
    category: "Web API",
    shortDefinition:
      "child element에서 발생한 event가 parent 쪽으로 전파되는 event propagation 흐름",
    explanation:
      "Event Bubbling은 child를 click했을 때 parent listener도 event를 받을 수 있게 하는 흐름입니다. 이 특성 때문에 target과 currentTarget을 구분해야 하며, 많은 child에 listener를 붙이는 대신 parent listener로 처리하는 event delegation이 가능해집니다.",
    related: ["Event", "Event Delegation", "DOM"],
  },
  {
    term: "Event Delegation",
    category: "웹 개발",
    shortDefinition:
      "child마다 listener를 붙이지 않고 parent listener와 bubbling을 이용해 event를 처리하는 패턴",
    explanation:
      "Event Delegation은 list나 table처럼 반복되는 child element가 많을 때 parent에 하나의 listener를 두고 event target을 확인하는 방식입니다. AI가 생성한 반복 handler를 검토할 때 listener 수와 propagation 경로를 줄이는 실무 기준이 됩니다.",
    related: ["Event Bubbling", "addEventListener", "DOM"],
  },
  {
    term: "Browser Rendering",
    category: "웹 개발",
    shortDefinition: "browser가 HTML, CSS, JavaScript와 network data를 화면의 pixels로 바꾸는 과정",
    explanation:
      "Browser Rendering은 navigation과 HTTP response 이후 parsing, DOM/CSSOM construction, render tree, style, layout, paint, compositing 같은 단계를 거쳐 page를 표시하는 흐름입니다. 화면이 느리거나 비어 보일 때 원인을 network와 rendering 단계로 나누는 기준이 됩니다.",
    related: ["DOM", "CSSOM", "Layout"],
  },
  {
    term: "Critical Rendering Path",
    category: "웹 성능",
    shortDefinition: "browser가 HTML, CSS, JavaScript를 화면 pixels로 바꾸기 위해 거치는 핵심 순서",
    explanation:
      "Critical Rendering Path는 visible page가 만들어지기까지 필요한 browser 내부 처리 흐름을 설명하는 performance 개념입니다. HTML parsing, CSSOM construction, render tree, layout, paint의 관계를 이해하면 blank page와 slow render 문제를 단계별로 볼 수 있습니다.",
    related: ["Browser Rendering", "DOM", "CSSOM"],
  },
  {
    term: "CSSOM",
    category: "웹 개발",
    shortDefinition: "CSS rules를 browser가 이해할 수 있는 style map tree로 표현한 구조",
    explanation:
      "CSSOM은 DOM이 document content를 tree로 나타내는 것처럼 CSS rules를 browser가 계산 가능한 구조로 표현합니다. DOM과 CSSOM은 render tree와 layout으로 이어지므로 CSS cascade/layout 지식과 browser rendering 지식 사이의 연결점입니다.",
    related: ["CSS", "DOM", "Render Tree"],
  },
  {
    term: "Render Tree",
    category: "웹 개발",
    shortDefinition: "DOM과 CSSOM을 결합해 화면에 그릴 대상과 style 정보를 만든 tree",
    explanation:
      "Render Tree는 document content와 CSS style 정보를 연결해 layout과 paint의 입력이 됩니다. DOM node가 모두 화면에 그려지는 것은 아니므로, render tree는 browser가 실제 표시할 구조를 계산하는 중간 단계로 이해할 수 있습니다.",
    related: ["DOM", "CSSOM", "Layout"],
  },
  {
    term: "Performance Timing",
    category: "웹 성능",
    shortDefinition: "navigation과 resource loading의 timing data를 browser API로 관찰하는 방식",
    explanation:
      "PerformanceNavigationTiming과 PerformanceResourceTiming은 page navigation과 resource loading의 timing evidence를 제공합니다. AI에게 성능 문제를 맡길 때 URL, response status, resource list와 함께 timing data를 주면 network와 rendering 원인을 분리하기 쉬워집니다.",
    related: ["Network", "Browser Rendering", "Performance"],
  },
  {
    term: "HTTP Request",
    category: "웹 개발",
    shortDefinition: "client가 server에 resource나 작업을 요청하기 위해 보내는 HTTP message",
    explanation:
      "HTTP Request는 method, resource path, protocol version, optional headers, 일부 method의 body로 구성됩니다. AI에게 API 오류를 설명할 때 request method, URL/path, headers, body를 분리해 주면 server가 무엇을 받았는지 추적할 수 있습니다.",
    related: ["HTTP Response", "HTTP Method", "HTTP Header"],
  },
  {
    term: "HTTP Response",
    category: "웹 개발",
    shortDefinition:
      "server가 client request에 대해 status, headers, optional body로 돌려주는 HTTP message",
    explanation:
      "HTTP Response는 protocol version, status code, status message, headers, optional body를 포함합니다. response status만 보지 않고 response headers와 body까지 함께 확인해야 API와 page load 문제를 정확히 나눌 수 있습니다.",
    related: ["HTTP Request", "Status Code", "HTTP Body"],
  },
  {
    term: "HTTP Method",
    category: "웹 개발",
    shortDefinition: "client가 resource에 대해 수행하려는 operation을 나타내는 request method",
    explanation:
      "HTTP Method는 GET, POST, PUT, DELETE처럼 request가 어떤 종류의 작업을 원하는지 표현합니다. AI가 API 호출을 만들거나 수정할 때 method와 path가 의도한 작업과 맞는지 확인하는 것이 첫 검토 지점입니다.",
    related: ["HTTP Request", "API", "REST"],
  },
  {
    term: "HTTP Header",
    category: "웹 개발",
    shortDefinition: "HTTP request나 response에 붙는 metadata field",
    explanation:
      "HTTP Header는 content type, accept, authentication, cookies 같은 message metadata를 전달하는 위치입니다. request와 response 모두 headers를 가질 수 있으므로 오류 분석에서는 body만 보지 말고 headers도 함께 기록해야 합니다.",
    related: ["HTTP Request", "HTTP Response", "HTTP Body"],
  },
  {
    term: "HTTP Body",
    category: "웹 개발",
    shortDefinition:
      "HTTP message에서 실제 resource representation이나 전송 payload가 들어갈 수 있는 부분",
    explanation:
      "HTTP Body는 일부 request method나 response에서 data payload를 담는 부분입니다. API 응답 JSON, form 제출 payload, HTML document content처럼 message의 실제 내용이 들어갈 수 있으므로 status code와 함께 읽어야 합니다.",
    related: ["HTTP Header", "HTTP Response", "JSON"],
  },
  {
    term: "Status Code",
    category: "웹 개발",
    shortDefinition: "HTTP response에서 request가 성공했는지와 그 이유를 나타내는 숫자 코드",
    explanation:
      "Status Code는 2xx, 3xx, 4xx, 5xx 같은 class로 request 결과를 분류합니다. status code는 중요한 evidence이지만 오류 원인을 단독으로 확정하지 않으므로 method, path, headers, body와 함께 봐야 합니다.",
    related: ["HTTP Response", "API", "Debugging"],
  },
  {
    term: "JSON",
    category: "웹 개발",
    shortDefinition:
      "structured data를 string으로 표현해 network나 파일로 주고받는 text-based data format",
    explanation:
      "JSON은 JavaScript object syntax를 따르는 text-based data format이지만 JavaScript runtime object 자체는 아닙니다. API에서는 request/response body의 data shape를 표현하는 데 자주 쓰이며, parsing과 stringifying 단계를 분리해서 이해해야 합니다.",
    related: ["JSON.parse", "JSON.stringify", "Data Contract"],
  },
  {
    term: "Data Contract",
    category: "웹 개발",
    shortDefinition: "API가 주고받을 data field와 value shape를 명시한 프로젝트 수준 약속",
    explanation:
      "Data Contract는 JSON 표준 자체가 아니라 endpoint별 request/response body가 어떤 field, type, optionality, error shape를 가져야 하는지 기록하는 운영 관점입니다. AI가 생성한 API client code를 검토할 때 실제 body가 계약과 맞는지 확인하는 기준이 됩니다.",
    related: ["JSON", "API", "TypeScript"],
  },
  {
    term: "JSON.parse",
    category: "JavaScript",
    shortDefinition: "JSON string을 JavaScript value나 object로 바꾸는 static method",
    explanation:
      "JSON.parse는 syntax가 맞는 JSON text를 JavaScript value로 deserialization하는 단계입니다. parsing 성공은 field와 type이 API contract에 맞다는 뜻이 아니므로, 외부 JSON은 parse 이후 별도 확인이 필요합니다.",
    related: ["JSON", "Data Contract", "Validation"],
  },
  {
    term: "JSON.stringify",
    category: "JavaScript",
    shortDefinition: "JavaScript value를 JSON string으로 변환하는 static method",
    explanation:
      "JSON.stringify는 JavaScript object나 value를 network body로 보낼 수 있는 JSON string representation으로 바꿉니다. API request body를 만들 때 Content-Type header와 함께 확인해야 합니다.",
    related: ["JSON", "HTTP Body", "Content-Type"],
  },
  {
    term: "Content-Type",
    category: "HTTP",
    shortDefinition: "HTTP message body의 media type을 알려 주는 representation header",
    explanation:
      "Content-Type은 response body나 POST/PUT request body가 어떤 media type인지 알려 줍니다. JSON body를 다룰 때 `application/json` 여부는 server와 client가 body를 어떻게 해석할지 결정하는 중요한 evidence입니다.",
    related: ["HTTP Header", "JSON", "HTTP Body"],
  },
  {
    term: "API Response Shape",
    category: "백엔드",
    shortDefinition: "API response body가 갖는 field, type, nesting, array/object 구조",
    explanation:
      "API Response Shape는 status code만으로 알 수 없는 body의 실제 구조입니다. JSON syntax가 valid해도 expected response shape와 다르면 UI code와 TypeScript type, AI-generated client가 실패할 수 있습니다.",
    related: ["Data Contract", "JSON", "API"],
  },
  {
    term: "REST API",
    category: "백엔드",
    shortDefinition:
      "서버 기능을 자원으로 보고 HTTP 메서드로 다루며 결과를 상태 코드로 알리는 API 설계 방식",
    explanation:
      "경로가 자원(무엇을), 메서드가 동작(어떻게), 상태 코드가 결과(어땠는가)를 담당합니다. 새 규칙을 만드는 게 아니라 HTTP가 이미 정한 메서드·상태 코드의 의미를 일관되게 지키는 것이 본질이라, 잘 설계된 REST API는 문서 없이도 동작을 짐작하게 합니다.",
    related: ["HTTP", "Idempotent", "HTTP 상태 코드"],
  },
  {
    term: "Idempotent",
    category: "백엔드",
    shortDefinition: "같은 요청을 여러 번 보내도 한 번 보낸 것과 서버 효과가 같은 성질",
    explanation:
      "MDN 정의는 '한 번 요청한 효과가 동일한 요청을 여러 번 한 효과와 같으면 idempotent'. GET·PUT·DELETE가 멱등이고 POST는 아닙니다. 네트워크 오류로 응답을 못 받았을 때 재시도해도 되는지를 판정하는 근거로, POST 재시도는 중복 생성 위험이 있어 멱등 키 같은 방어가 필요합니다. safe(읽기 전용)와는 다른 성질입니다.",
    related: ["REST API", "HTTP", "HTTP 상태 코드"],
  },
  {
    term: "HTTP 상태 코드",
    category: "백엔드",
    shortDefinition:
      "응답 결과를 5클래스(1xx~5xx)로 알리는 세 자리 코드 — 앞자리가 결과 종류를 말함",
    explanation:
      "2xx 성공(200 OK, 201 Created), 3xx 리다이렉션, 4xx 클라이언트 오류(400/401/404), 5xx 서버 오류(500). 앞자리 하나가 '누구 잘못인가'(4xx=클라이언트, 5xx=서버)를 먼저 말해 디버깅 방향을 정합니다. 오류를 200+본문으로 감추면 모니터링·재시도 도구가 감지하지 못하므로 반드시 코드로 알려야 합니다.",
    related: ["REST API", "HTTP", "Idempotent"],
  },
  {
    term: "Database Table",
    category: "백엔드",
    shortDefinition: "관계형 데이터베이스에서 데이터를 행과 열로 담는 저장 단위 — 종이 표와 유사",
    explanation:
      "PostgreSQL 문서는 '종이 위의 표와 매우 비슷하다: 행과 열로 이루어진다'고 정의합니다. 열의 수·순서는 고정이고 각 열은 이름과 데이터 타입을 가지며(구조), 행의 수는 저장된 데이터 양에 따라 변합니다(내용). 엑셀 시트를 떠올리면 되고, 이 단순 모델이 수십 년 데이터 저장의 표준입니다.",
    related: ["Database Index", "Data Type (DB)", "JSON"],
  },
  {
    term: "Database Index",
    category: "백엔드",
    shortDefinition: "테이블에서 특정 행을 빠르게 찾기 위한 보조 구조 — 책 뒤 색인과 같은 역할",
    explanation:
      "인덱스가 있으면 전수 스캔 대신 탐색 트리를 몇 단계만 내려가 목표 행을 찾고, 조건 조회·UPDATE·DELETE·조인까지 가속합니다. 단 테이블과 동기화되어야 해서 쓰기(INSERT/UPDATE/DELETE)마다 갱신되어 오버헤드를 더합니다. '읽기에서 벌고 쓰기에서 낸다'가 핵심이라, 조회에 실제로 쓰이는 열에만 만들고 안 쓰는 것은 제거합니다.",
    related: ["Database Table", "Data Type (DB)"],
  },
  {
    term: "Data Type (DB)",
    category: "백엔드",
    shortDefinition: "열에 들어올 값의 범위를 제한하고 데이터에 의미를 부여하는 열의 타입 지정",
    explanation:
      "PostgreSQL 정의로 '값의 집합을 제한하고 저장된 데이터에 의미를 부여해 계산에 쓸 수 있게' 합니다. 정수 열에 문자열이 못 들어오게 막고(제한), 동시에 합계·평균 계산을 가능하게 합니다(의미). '모두 문자열로 저장'은 제한과 계산 능력을 모두 포기하는 선택이며, DB 열 타입과 코드(TypeScript)의 타입을 맞추는 것이 데이터 안전의 기본입니다.",
    related: ["Database Table", "Database Index", "TypeScript"],
  },
  {
    term: "Authentication",
    category: "백엔드",
    shortDefinition:
      "요청을 보낸 사람이 누구인지 확인하는 절차 — HTTP의 challenge-response 프레임워크",
    explanation:
      "MDN은 'HTTP가 접근 제어와 인증을 위한 일반 프레임워크를 제공한다'고 정의합니다. 서버가 401 + WWW-Authenticate로 인증을 요구하면 클라이언트가 Authorization 헤더에 자격 증명을 담아 응답합니다. 인증은 '누구인지 1회 확인'이고, 그 결과를 이어가는 것이 세션·토큰입니다. 인증(누구인가)과 인가(권한이 있는가, 403)는 다릅니다.",
    related: ["Session", "HTTP 상태 코드", "Session Cookie"],
  },
  {
    term: "Session",
    category: "백엔드",
    shortDefinition: "인증 결과를 이후 요청에도 이어가는 지속 상태 — stateless HTTP에 얹는 기억",
    explanation:
      "HTTP는 stateless라 각 요청이 이전을 기억하지 못하므로, 로그인 상태를 유지하려면 세션이 필요합니다. 서버가 Set-Cookie로 세션 식별자를 심으면 브라우저가 이후 요청마다 Cookie 헤더로 자동 첨부해 '이미 인증된 사람'으로 인식됩니다. 서버가 세션 상태를 보관하는 방식이라, 토큰(정보를 토큰 자체에 담음)과 대비됩니다.",
    related: ["Authentication", "Session Cookie", "Secret"],
  },
  {
    term: "Session Cookie",
    category: "백엔드",
    shortDefinition: "세션 식별자를 담아 로그인 상태를 유지하는 쿠키 — HttpOnly로 탈취를 방어",
    explanation:
      "쿠키는 '서버가 브라우저에 보내는 작은 데이터 조각'으로 Set-Cookie로 심기고 Cookie로 되돌아옵니다. Max-Age/Expires가 없으면 세션 종료 시 삭제(세션 쿠키), 있으면 만료까지 유지(영구 쿠키)됩니다. 세션을 지속하는 쿠키는 HttpOnly를 설정해 JavaScript 접근을 막아 XSS 세션 탈취를 완화해야 합니다.",
    related: ["Session", "Authentication", "Same-Origin Policy"],
  },
  {
    term: "Environment Variable",
    category: "백엔드",
    shortDefinition:
      "코드 바깥에서 프로그램에 값을 전달하는 설정 통로 — Node.js에서 process.env로 읽음",
    explanation:
      "Node.js는 'process.env가 사용자 환경을 담은 객체를 반환한다'고 정의하며 process.env.API_KEY처럼 읽습니다. 값은 근본적으로 문자열이라 숫자·불리언은 코드에서 파싱해야 합니다. 같은 코드가 환경변수만 바꿔 개발·운영에서 다르게 동작하므로, 배포마다 달라지는 값을 코드에서 분리하는 표준 통로입니다.",
    related: ["Secret", "Twelve-Factor App", "Data Type (DB)"],
  },
  {
    term: "Secret",
    category: "백엔드",
    shortDefinition:
      "유출되면 안 되는 자격 증명 — API 키, DB 비밀번호, 토큰. 코드가 아닌 환경변수로 관리",
    explanation:
      "secret을 코드에 하드코딩하면 Git 이력에 영구히 남아, 나중에 지워도 과거 커밋에 남습니다. 환경변수로 분리하고 .env는 .gitignore로 제외하며, 실수로 커밋됐다면 이력 제거와 별개로 키를 회전(폐기·재발급)해야 합니다. 클라이언트에 노출되는 변수(NEXT_PUBLIC_ 등)에는 담으면 안 됩니다.",
    related: ["Environment Variable", "Twelve-Factor App", "Authentication"],
  },
  {
    term: "Twelve-Factor App",
    category: "백엔드",
    shortDefinition: "설정을 코드에서 분리해 환경변수에 저장하는 것을 포함한 앱 설계 12원칙",
    explanation:
      "핵심 통찰은 '설정은 배포마다 크게 달라지지만 코드는 그렇지 않다'이며, 설정을 환경변수에 저장할 것을 권합니다. 분리가 잘 됐는지의 리트머스 테스트는 '지금 코드베이스를 오픈소스로 공개해도 자격 증명이 새지 않는가'입니다 — AI 코드의 하드코딩 검토 기준으로도 실용적입니다.",
    related: ["Environment Variable", "Secret"],
  },
  {
    term: "Rate Limit",
    category: "백엔드",
    shortDefinition: "클라이언트가 일정 시간에 보낼 수 있는 요청 수를 제한해 API 남용을 막는 장치",
    explanation:
      "한도를 넘으면 서버는 429 Too Many Requests로 응답합니다. MDN은 이를 '클라이언트에게 요청 속도를 늦추라고 요청하는 메커니즘'으로 정의합니다 — 영구 차단이 아니라 일시적 감속입니다. 한도는 사용자·IP·API 키 단위로 적용되므로 인증을 전제하며, 클라이언트 코드가 아니라 반드시 서버에서 강제해야 방어가 됩니다.",
    related: ["HTTP 상태 코드", "Retry-After", "Authentication"],
  },
  {
    term: "Retry-After",
    category: "백엔드",
    shortDefinition: "클라이언트가 다음 요청까지 얼마나 기다려야 하는지 알리는 HTTP 응답 헤더",
    explanation:
      "MDN 정의로 'user agent가 후속 요청 전에 얼마나 기다려야 하는지'를 나타냅니다. 429에서는 재요청까지 대기 시간, 503에서는 서비스 복구 예상 시간을 뜻합니다. 429를 받은 클라이언트는 이 값을 추측이 아니라 서버의 지시로 받아 그만큼 기다린 뒤(없으면 지수 백오프로) 재시도해야 하며, 즉시 재시도하면 제한이 길어집니다.",
    related: ["Rate Limit", "HTTP 상태 코드", "Idempotent"],
  },
  {
    term: "Observability",
    category: "백엔드",
    shortDefinition: "실행 중인 서버가 지금 무엇을 하는지 바깥에서 알 수 있는 정도",
    explanation:
      "화면 없는 서버의 동작을 알려면 시간순 이벤트 기록이 필요하며, 로그가 그 기본 수단입니다. 로그 위에 지표(metric)·추적(trace)·대시보드·알림이 얹혀 완성됩니다. '동작한다'와 '관찰 가능하다'는 다른 문제로, AI가 만든 서버는 명시하지 않으면 로그를 빈약하게 남겨 문제 원인 추적이 어려워집니다.",
    related: ["Log", "HTTP 상태 코드", "Debugging"],
  },
  {
    term: "Log",
    category: "백엔드",
    shortDefinition: "실행 중 프로세스의 집계·시간순 이벤트 스트림 — 관찰의 기본 수단",
    explanation:
      "Twelve-Factor는 로그를 '집계되고 시간순으로 정렬된 이벤트의 스트림'으로 정의하고, 앱은 이를 unbuffered로 stdout에 쓰며 저장·라우팅은 실행 환경에 위임하라고 규정합니다('앱은 출력 스트림의 저장에 결코 관여하지 않는다'). 시간·요청 ID·상태 코드를 담되 토큰·비밀번호 같은 secret은 남기지 않아야 합니다 — 로그는 저장·전송되므로 유출 경로가 됩니다.",
    related: ["Observability", "Environment Variable", "Secret"],
  },
  {
    term: "Build Time",
    category: "배포·운영",
    shortDefinition: "코드를 실행 가능한 번들로 변환하는 때 — 이 시점에 박힌 값은 재빌드해야 바뀜",
    explanation:
      "Twelve-Factor는 빌드를 '코드 저장소를 실행 가능한 번들로 변환하는 과정'으로 정의합니다. TypeScript 컴파일·번들링·최적화가 여기서 일어나며, 빌드 시점에 번들에 박히는 값(정적)은 실행 중 재시작으로는 바뀌지 않고 재빌드가 필요합니다. Next.js의 NEXT_PUBLIC_ 접두사 변수가 대표적 빌드 타임 값입니다.",
    related: ["Runtime", "Release (배포 단계)", "Environment Variable"],
  },
  {
    term: "Runtime",
    category: "배포·운영",
    shortDefinition: "빌드된 앱을 실행 환경에서 구동하는 때 — 실행 중 코드는 바꿀 수 없음",
    explanation:
      "Twelve-Factor 정의로 '앱의 프로세스들을 구동해 실행 환경에서 앱을 돌리는' 단계입니다. 런타임에 읽는 값(동적)은 재시작으로 반영되지만, 런타임에 코드를 바꾸는 것은 불가능합니다 — 그 변경을 빌드 단계로 되돌릴 방법이 없기 때문입니다. 모든 코드 수정은 빌드부터 다시 시작해야 합니다.",
    related: ["Build Time", "Release (배포 단계)", "Log"],
  },
  {
    term: "Release (배포 단계)",
    category: "배포·운영",
    shortDefinition:
      "빌드 산출물에 그 배포의 설정을 결합하는 중간 단계 — 같은 빌드도 설정이 다르면 다른 릴리스",
    explanation:
      "Twelve-Factor의 build→release→run 중 가운데 단계로, '빌드 + 그 배포의 현재 설정'입니다. 같은 빌드를 개발·운영 설정과 각각 결합해 서로 다른 릴리스를 만들므로, 환경변수가 주입되는 지점이 바로 릴리스입니다. '빌드 1회, 릴리스는 환경마다'가 재현성의 핵심입니다.",
    related: ["Build Time", "Runtime", "Environment Variable"],
  },
  {
    term: "pre/post script",
    category: "배포·운영",
    shortDefinition: "대상 스크립트 실행 시 이름 앞뒤에 붙어 자동 실행되는 npm 훅",
    explanation:
      "npm 문서에 따르면 '이름이 일치하는 pre·post 명령도 함께 실행된다'(premyscript, myscript, postmyscript). npm run build가 prebuild→build→postbuild 순으로 자동 실행되어, '빌드 전 정리·배포 전 검증' 같은 앞뒤 작업을 명령에 엮습니다. 앞 단계가 실패하면 뒤 단계는 실행되지 않습니다. 자동 실행이라 모르면 디버깅이 어려우므로 의도적으로 써야 합니다.",
    related: ["npm scripts", "package.json"],
  },
  {
    term: "Deployment Platform",
    category: "배포·운영",
    shortDefinition: "빌드된 앱을 사용자에게 서빙하는 실행 환경 — build/release/run의 run을 담당",
    explanation:
      "Firebase Hosting('빠르고 안전한 호스팅 제공')·Vercel 등이 대표적입니다. 정적 모델(빌드 파일을 CDN으로 그대로 서빙)과 서버·함수 모델(요청마다 코드 실행)로 나뉘며, 정적 모델에는 런타임 서버가 없어 서버 코드가 동작하지 않습니다. 배포 전에 '이 플랫폼은 무엇을 실행할 수 있는가'를 아는 것이 AI 배포 구성 검증의 기준입니다.",
    related: ["Build Time", "CDN", "Static Hosting"],
  },
  {
    term: "CDN",
    category: "배포·운영",
    shortDefinition: "파일을 전 세계 엣지에 캐시해 사용자와 가까운 곳에서 서빙하는 전송망",
    explanation:
      "Firebase Hosting은 '업로드한 각 파일이 전 세계 CDN 엣지의 SSD에 캐시되어 gzip/Brotli로 압축 전송된다'고 설명합니다. 파일이 사용자 가까이 복제되고 작게 압축되므로 지구 어디서든 빠릅니다. 서버가 매번 계산하는 대신 이미 만든 파일을 내보내기에 가능한 속도로, 정적 호스팅이 빠른 근본 이유입니다.",
    related: ["Static Hosting", "Deployment Platform", "Build Time"],
  },
  {
    term: "Static Hosting",
    category: "배포·운영",
    shortDefinition:
      "빌드된 파일(HTML/CSS/JS)을 CDN으로 그대로 서빙하는 배포 모델 — 런타임 서버 없음",
    explanation:
      "요청 시 서버가 코드를 실행하지 않고 이미 만들어진 파일을 엣지에서 내보냅니다. 매우 빠르고 저렴하지만 요청마다 달라지는 응답(사용자별 페이지·실시간 데이터)은 만들 수 없습니다. 이 사이트가 Next.js output export를 Firebase Hosting에 올린 정적 호스팅 방식이며, secret을 정적 파일에 담으면 전 세계에 공개되므로 주의해야 합니다.",
    related: ["CDN", "Deployment Platform", "Runtime"],
  },
  {
    term: "CI/CD",
    category: "배포·운영",
    shortDefinition:
      "코드 변경을 자동으로 빌드·테스트·배포하는 파이프라인 — 지속적 통합(CI)과 지속적 배포/전달(CD)",
    explanation:
      "GitHub Actions는 CI/CD를 '빌드·테스트·배포 파이프라인을 자동화하는 플랫폼'으로 정의합니다. CI는 변경을 자주 통합하며 자동 빌드·테스트해 '안전한가'를 묻고, CD는 검증 통과분을 자동으로 배포 가능 상태로 만들거나 배포합니다. 검증 잡 통과에만 배포 잡이 실행되게 묶으면 깨진 코드 배포를 구조적으로 막습니다.",
    related: ["Workflow (CI/CD)", "Deployment Platform", "npm scripts"],
  },
  {
    term: "Workflow (CI/CD)",
    category: "배포·운영",
    shortDefinition: "하나 이상의 잡을 실행하는 설정 가능한 자동화 프로세스 — CI/CD의 최상위 단위",
    explanation:
      "GitHub Actions 정의로 '하나 이상의 잡을 실행하는 설정 가능한 자동화된 프로세스'입니다. 이벤트(커밋·PR 등 저장소 활동)가 워크플로를 트리거하고, 워크플로는 잡을, 잡은 스텝(셸 스크립트 또는 액션)을 실행합니다. YAML 파일로 명시되어 파이프라인 자체가 코드로 관리·리뷰됩니다. 정해진 러너(서버)에서 일관되게 실행됩니다.",
    related: ["CI/CD", "Runner", "pre/post script"],
  },
  {
    term: "Runner",
    category: "배포·운영",
    shortDefinition: "워크플로가 트리거될 때 그것을 실행하는 서버",
    explanation:
      "GitHub Actions 정의로 '워크플로가 트리거될 때 그것을 실행하는 서버'입니다. 내 컴퓨터가 아니라 정해진 서버에서 언제나 같은 환경으로 실행되므로 '내 컴퓨터에서만 되는' 문제가 사라집니다. 잡은 같은 러너에서 실행되는 스텝의 묶음이며, 이 일관된 실행 환경이 CI/CD가 재현성을 보장하는 이유입니다.",
    related: ["Workflow (CI/CD)", "CI/CD"],
  },
  {
    term: "Monitoring",
    category: "배포·운영",
    shortDefinition:
      "배포된 앱이 잘 돌아가는지 로그·지표로 지켜보는 것 — 이상 신호를 감지하는 관찰",
    explanation:
      "근거 데이터는 로그(시간순 이벤트 스트림)입니다. 429·5xx 급증, 응답 지연 증가, 특정 엔드포인트 오류 집중이 이상 신호이며, '평소를 알아야 이상이 보인다'가 핵심입니다. 테스트는 배포 전 검증이고 모니터링은 배포 후 현실이라, 테스트가 재현 못한 실제 사용자·데이터·부하의 문제를 드러냅니다. 무엇을 볼지 정한 만큼만 보므로 계속 범위를 넓혀갑니다.",
    related: ["Log", "Rollback", "Observability"],
  },
  {
    term: "Rollback",
    category: "배포·운영",
    shortDefinition: "문제 시 이전 프로덕션 배포로 빠르게 되돌려 복구하는 것 — 원인 분석보다 먼저",
    explanation:
      "Vercel Instant Rollback은 '이전 프로덕션 배포로 빠르게 되돌리는 방법'으로, 새로 빌드하지 않고 도메인을 이전 배포로 재지정해 즉시 복구합니다('instantaneously'). 배포마다 고유 URL이 남기에 되돌아갈 지점이 보존됩니다. 롤백 후 자동 배포는 꺼져 되돌린 상태가 지켜지며, 코드·도메인은 되돌리지만 DB·외부 API 같은 외부 상태는 되돌리지 않으므로 별도 점검이 필요합니다.",
    related: ["Monitoring", "Deployment Platform", "Log"],
  },
  {
    term: "Deployment CLI",
    category: "배포·운영",
    shortDefinition: "배포 플랫폼을 터미널에서 조작하는 명령줄 도구 — vercel·firebase 등",
    explanation:
      "Vercel CLI는 '터미널이나 자동화 시스템으로 플랫폼과 상호작용'한다고 소개합니다. vercel deploy(배포)·rollback(복구)·promote(승격)·list/logs(조회)·login(인증)이 대표 명령이며, 이 사이트는 firebase-tools로 firebase deploy --only hosting을 실행합니다. 웹 버튼을 명령으로 옮겨 스크립트·CI/CD·AI 에이전트가 배포를 실행할 수 있게 하며, npm run deploy로 감싸 표준화합니다.",
    related: ["Deployment Platform", "npm scripts", "Rollback"],
  },
  {
    term: "Deploy Token",
    category: "배포·운영",
    shortDefinition:
      "프로덕션을 배포·롤백할 수 있는 강력한 자격 증명 — 인자가 아니라 환경변수로 다룸",
    explanation:
      "CI/CD에서 사람이 로그인할 수 없으므로 토큰으로 인증합니다. Vercel 문서는 VERCEL_TOKEN 환경변수 사용을 권하는데, 토큰을 명령 인자로 넘기면 '프로세스 목록과 로그에 노출될 수 있기' 때문입니다. 유출되면 남이 사이트를 배포·훼손할 수 있으므로, 코드·인자·로그 어디에도 평문으로 남기지 말고 secret 저장소나 환경변수로만 다뤄야 합니다.",
    related: ["Deployment CLI", "Secret", "Environment Variable"],
  },
  {
    term: "Same-Origin Policy",
    category: "웹 보안",
    shortDefinition:
      "한 origin의 document나 script가 다른 origin resource와 상호작용하는 방식을 제한하는 browser security mechanism",
    explanation:
      "Same-Origin Policy는 malicious document가 사용자가 로그인한 다른 origin의 sensitive data를 읽는 위험을 줄이는 기본 browser 방어선입니다. CORS는 이 기본 제한 위에서 server가 허용할 cross-origin access를 HTTP headers로 표현하는 mechanism입니다.",
    related: ["Origin", "CORS", "Browser Security"],
  },
  {
    term: "Origin",
    category: "웹 보안",
    shortDefinition: "URL의 protocol, host, port 조합으로 browser가 출처를 판단하는 기준",
    explanation:
      "Origin은 domain 느낌이 아니라 scheme, host, port tuple입니다. path가 같아 보여도 port나 scheme이 다르면 cross-origin일 수 있으므로 CORS debugging에서는 page origin과 target origin을 정확히 기록해야 합니다.",
    related: ["Same-Origin Policy", "CORS", "HTTP"],
  },
  {
    term: "CORS",
    category: "웹 보안",
    shortDefinition: "server가 허용할 cross-origin access를 HTTP headers로 표현하는 mechanism",
    explanation:
      "CORS는 browser의 same-origin policy 아래에서 cross-origin response를 calling script가 읽을 수 있는지 판단하게 하는 HTTP-header based mechanism입니다. client fetch option 하나가 아니라 request origin, preflight, response CORS headers를 함께 확인해야 합니다.",
    related: ["Same-Origin Policy", "Preflight Request", "HTTP Header"],
  },
  {
    term: "Preflight Request",
    category: "웹 보안",
    shortDefinition:
      "browser가 actual cross-origin request 전에 server 허용 여부를 확인하기 위해 보내는 request",
    explanation:
      "Preflight Request는 actual request의 method와 headers를 담아 server가 cross-origin request를 허용할지 확인합니다. Network tab에서 OPTIONS request가 먼저 보일 수 있으며, CORS 문제를 분석할 때 중요한 evidence입니다.",
    related: ["CORS", "HTTP Method", "HTTP Header"],
  },
  {
    term: "XSS",
    category: "웹 보안",
    shortDefinition:
      "malicious script가 trusted website output에 injected되어 실행될 수 있는 injection 공격",
    explanation:
      "XSS는 untrusted input이 validation이나 encoding 없이 generated output에 포함될 때 발생할 수 있습니다. 핵심 검토 지점은 문자열 자체보다 그 data가 어떤 rendering context로 들어가 browser에서 실행될 수 있는지입니다.",
    related: ["CSP", "Input Validation", "Rendering Context"],
  },
  {
    term: "CSRF",
    category: "웹 보안",
    shortDefinition:
      "authenticated browser가 trusted site에 unwanted action을 보내도록 속이는 공격",
    explanation:
      "CSRF는 사용자의 browser가 이미 인증된 상태일 때 forged authenticated request와 legitimate request를 server가 구분하지 못하는 문제입니다. mutation request에서는 anti-CSRF token, same-site cookie 정책, server-side intent validation을 확인해야 합니다.",
    related: ["Authentication", "Cookie", "HTTP Request"],
  },
  {
    term: "CSP",
    category: "웹 보안",
    shortDefinition:
      "browser에게 site code가 할 수 있는 일을 제한하라고 지시하는 Content Security Policy",
    explanation:
      "CSP는 certain security threats risk를 줄이기 위해 website가 browser에 restrictions를 instruct하는 방어 계층입니다. XSS를 대체하는 단일 해결책은 아니지만 script source, inline execution, resource loading을 제한하는 signal로 활용됩니다.",
    related: ["XSS", "HTTP Header", "Browser Security"],
  },
  {
    term: "Static Type Checking",
    category: "TypeScript",
    shortDefinition: "code가 실행되기 전에 value shape와 operation 가능성을 검사하는 방식",
    explanation:
      "Static Type Checking은 JavaScript runtime에서 실제 값을 실행하기 전에 TypeScript가 code의 expected behavior를 예측하고 mismatch를 알려 주는 체계입니다. AI가 만든 code를 검토할 때 type error는 중요한 evidence가 됩니다.",
    related: ["TypeScript", "Type Annotation", "Type Inference"],
  },
  {
    term: "Type Annotation",
    category: "TypeScript",
    shortDefinition: "variable, parameter, return value 등에 expected type을 명시하는 문법",
    explanation:
      "Type Annotation은 모든 줄에 붙이는 장식이 아니라 API boundary, function signature, component props처럼 다른 코드와 만나는 지점에 shape contract를 남기는 장치입니다.",
    related: ["Static Type Checking", "Object Type", "Function"],
  },
  {
    term: "Type Inference",
    category: "TypeScript",
    shortDefinition: "TypeScript가 code 흐름과 initializer를 보고 type을 자동 추론하는 기능",
    explanation:
      "Type Inference는 명백한 local value에 annotation을 반복하지 않아도 TypeScript가 type을 이해하게 해 줍니다. 중요한 경계는 명시하고 내부 계산은 inference를 활용하면 code가 읽기 쉬워집니다.",
    related: ["Type Annotation", "TypeScript", "Static Type Checking"],
  },
  {
    term: "Object Type",
    category: "TypeScript",
    shortDefinition: "object가 가질 property 이름과 각 property type을 나열한 type",
    explanation:
      "Object Type은 API response, component props, settings object처럼 field shape가 중요한 값을 표현합니다. JSON data contract를 code 안으로 옮길 때 가장 먼저 사용하는 TypeScript 구조입니다.",
    related: ["Data Contract", "Optional Property", "TypeScript"],
  },
  {
    term: "Union Type",
    category: "TypeScript",
    shortDefinition: "value가 둘 이상의 type 중 하나일 수 있음을 나타내는 type",
    explanation:
      "Union Type은 success/error result처럼 여러 가능성 중 하나인 값을 표현합니다. TypeScript는 union의 모든 member에서 유효한 operation만 바로 허용하므로 branch별 property를 쓰려면 narrowing이 필요합니다.",
    related: ["Narrowing", "Type Guard", "API Response Shape"],
  },
  {
    term: "Narrowing",
    category: "TypeScript",
    shortDefinition:
      "control flow나 type guard를 통해 넓은 type을 더 구체적인 type으로 좁히는 과정",
    explanation:
      "Narrowing은 `if`, `typeof`, discriminant field 같은 조건을 바탕으로 TypeScript가 value의 가능한 shape를 줄이는 방식입니다. union type을 안전하게 다루는 핵심 메커니즘입니다.",
    related: ["Union Type", "Type Guard", "Control Flow"],
  },
  {
    term: "Generic",
    category: "TypeScript",
    shortDefinition: "reusable type이나 function에서 변하는 data type을 parameter로 받는 방식",
    explanation:
      "Generic은 공통 구조는 유지하고 내부 data shape만 바뀌는 API wrapper나 reusable helper를 만들 때 사용합니다. 느슨함이 아니라 구조화된 재사용을 표현하는 도구입니다.",
    related: ["TypeScript", "Reusable Component", "API"],
  },
  {
    term: "any",
    category: "TypeScript",
    shortDefinition: "TypeScript type-checking을 대부분 우회하게 하는 special type",
    explanation:
      "any는 property access, function call, assignment 등을 typechecking error 없이 허용해 빠른 탈출구처럼 보입니다. 하지만 AI output 검토에서는 TypeScript의 검증 신호를 지울 수 있으므로 사용 이유를 반드시 확인해야 합니다.",
    related: ["Static Type Checking", "unknown", "Verification"],
  },
  {
    term: "React Component",
    category: "React",
    shortDefinition: "JSX를 return해 UI 조각을 설명하는 reusable JavaScript function",
    explanation:
      "React Component는 markup, CSS, JavaScript를 custom UI element boundary로 묶는 기본 단위입니다. browser가 직접 보는 HTML tag와 달리 capitalized JSX tag로 사용되며 props를 input으로 받아 UI description을 계산합니다.",
    related: ["Props", "Composition", "Render"],
  },
  {
    term: "Props",
    category: "React",
    shortDefinition: "parent component가 child component에 전달하는 information",
    explanation:
      "Props는 React components가 서로 communicate하는 기본 방식입니다. string, object, array, function 등 JavaScript value를 전달할 수 있으며, TypeScript와 함께 쓰면 component의 input contract를 명확히 표현할 수 있습니다.",
    related: ["React Component", "TypeScript", "Component Boundary"],
  },
  {
    term: "Composition",
    category: "React",
    shortDefinition: "여러 component를 order, nest, combine해서 page나 UI section을 만드는 방식",
    explanation:
      "Composition은 component를 HTML tags처럼 조합해 whole page를 설계하는 React 사고방식입니다. 재사용뿐 아니라 책임 분리와 수정 범위를 선명하게 만드는 데 중요합니다.",
    related: ["React Component", "Props", "Component Tree"],
  },
  {
    term: "Component Boundary",
    category: "React",
    shortDefinition: "component가 책임지는 UI, input props, rendering 범위를 나누는 경계",
    explanation:
      "Component Boundary는 AI에게 UI 수정을 맡길 때 특히 중요합니다. 어떤 component의 props와 rendering만 바꿀지, parent data flow를 바꿀지 구분하는 기준이 됩니다.",
    related: ["React Component", "Props", "AI Code Review"],
  },
  {
    term: "Pure Component",
    category: "React",
    shortDefinition: "같은 input에 같은 JSX를 return한다고 가정할 수 있는 component",
    explanation:
      "Pure Component 관점은 render 중 외부 값을 변경하거나 unpredictable side effect를 만들지 않는 것을 의미합니다. React는 component를 pure function으로 가정하므로 render logic은 current props/state에서 UI를 계산하는 데 집중해야 합니다.",
    related: ["Render", "Effect", "React Component"],
  },
  {
    term: "Render",
    category: "React",
    shortDefinition: "React가 component를 호출해 screen에 표시할 UI description을 계산하는 단계",
    explanation:
      "Render는 DOM을 직접 조작하는 것이 아니라 component function을 실행해 어떤 UI를 보여줄지 계산하는 흐름입니다. commit 단계와 구분하면 React debugging과 performance 이해가 쉬워집니다.",
    related: ["Commit", "React Component", "Pure Component"],
  },
  {
    term: "Commit",
    category: "React",
    shortDefinition: "React가 계산된 UI 변경을 DOM에 반영하는 단계",
    explanation:
      "Commit은 render로 계산된 결과가 실제 screen update로 이어지는 단계입니다. component function 호출과 DOM update를 구분하면 React가 직접 DOM 조작 코드와 어떻게 다른지 이해할 수 있습니다.",
    related: ["Render", "DOM", "React Component"],
  },
  {
    term: "React State",
    category: "React",
    shortDefinition: "component가 render 사이에 기억해야 하는 component-specific memory",
    explanation:
      "React State는 local variable과 달리 render 사이에 유지되고 setter를 통해 re-render를 trigger할 수 있는 값입니다. input value, selected item, completed flag처럼 UI가 기억해야 하는 값에 사용합니다.",
    related: ["useState", "State Snapshot", "React Component"],
  },
  {
    term: "useState",
    category: "React",
    shortDefinition: "state variable과 setter function을 제공하는 React Hook",
    explanation:
      "useState는 component가 값을 기억하고 그 값이 바뀌었을 때 React에게 re-render를 요청할 수 있게 합니다. setter는 현재 변수를 직접 mutate하는 것이 아니라 다음 render를 예약합니다.",
    related: ["React State", "React Hook", "State Setter"],
  },
  {
    term: "React Hook",
    category: "React",
    shortDefinition: "React component나 custom Hook top level에서 호출하는 React 기능 연결 함수",
    explanation:
      "Hook은 component memory나 effect 같은 React 기능을 component에 연결합니다. conditions, loops, nested functions 안이 아니라 component 또는 custom Hook의 top level에서 호출해야 합니다.",
    related: ["useState", "useEffect", "React Component"],
  },
  {
    term: "State Snapshot",
    category: "React",
    shortDefinition: "한 render 안에서 state variable이 고정된 값처럼 읽히는 React state model",
    explanation:
      "State Snapshot은 state setter가 current variable을 즉시 바꾸는 것이 아니라 다음 render를 요청한다는 점을 설명합니다. setter 직후 같은 handler 안에서 state를 새 값처럼 읽으면 stale value 오해가 생길 수 있습니다.",
    related: ["React State", "Batching", "State Setter"],
  },
  {
    term: "Batching",
    category: "React",
    shortDefinition: "event handler code가 끝난 뒤 여러 state update를 모아 처리하는 React 동작",
    explanation:
      "Batching은 여러 state update가 한 interaction 안에서 일어날 때 중간 render를 줄이고 UI가 half-finished state로 보이지 않게 돕습니다. previous state에 의존하는 update는 updater function으로 표현하는 것이 안전합니다.",
    related: ["State Snapshot", "Updater Function", "React State"],
  },
  {
    term: "Effect",
    category: "React",
    shortDefinition:
      "rendering 자체 때문에 발생하는 side effect와 external system synchronization을 지정하는 React 장치",
    explanation:
      "Effect는 component가 browser API, network connection, third-party widget 같은 React 밖의 system과 현재 props/state를 맞춰야 할 때 사용합니다. external system이 없다면 Effect가 필요하지 않을 수 있습니다.",
    related: ["useEffect", "Effect Dependency", "External System"],
  },
  {
    term: "useEffect",
    category: "React",
    shortDefinition:
      "component render 결과 이후 external system과 동기화하는 Effect를 선언하는 Hook",
    explanation:
      "useEffect는 commit 후 실행되어 component의 props/state와 React 밖의 system을 synchronize할 수 있게 합니다. 모든 derived value 계산에 쓰는 도구가 아니며 dependency를 통해 re-run 조건을 설명해야 합니다.",
    related: ["Effect", "Effect Dependency", "React Hook"],
  },
  {
    term: "Effect Dependency",
    category: "React",
    shortDefinition: "Effect가 다시 실행되어야 하는 reactive value 조건",
    explanation:
      "Effect Dependency는 Effect 안에서 사용하는 props/state 변화 중 external synchronization을 다시 수행해야 하는 조건을 나타냅니다. lint error를 숨기는 장치가 아니라 Effect의 re-run 기준을 설명하는 계약입니다.",
    related: ["Effect", "useEffect", "External System"],
  },
  {
    term: "Repository (저장소)",
    category: "Git",
    shortDefinition: "프로젝트의 전체 이력이 저장되는 공간 — 실체는 프로젝트 안의 .git 디렉터리",
    explanation:
      "git init이 만드는 .git 디렉터리가 저장소의 실체이며, objects(내용물)·refs/heads(브랜치 포인터) 등이 그 안에 있습니다. 서버가 아니라 로컬 폴더이므로, 저장소 문제는 결국 파일 시스템 문제로 접근할 수 있습니다.",
    related: ["Working Tree", "Index (Staging Area)", "HEAD"],
  },
  {
    term: "Working Tree",
    category: "Git",
    shortDefinition: "편집기로 실제 수정하는, 눈에 보이는 프로젝트 파일들의 영역",
    explanation:
      "Git의 세 영역 중 첫 번째로, 아직 기록되지 않은 진행 중 작업이 머무는 곳입니다. git status의 Changes not staged와 Untracked files가 이 영역과 인덱스의 차이를 보여줍니다.",
    related: ["Index (Staging Area)", "HEAD", "Repository (저장소)"],
  },
  {
    term: "Index (Staging Area)",
    category: "Git",
    shortDefinition: "다음 커밋에 들어갈 내용을 골라 담아두는 준비 공간",
    explanation:
      "공식 문서가 index와 staging area를 같은 것으로 병기합니다. git add가 워킹 트리의 내용을 이곳에 올리고, git commit은 이곳의 내용만 기록합니다 — 이 분리가 부분 커밋을 가능하게 합니다.",
    related: ["Working Tree", "Commit (Git)", "Repository (저장소)"],
  },
  {
    term: "HEAD",
    category: "Git",
    shortDefinition: "현재 작업의 기준이 되는 커밋 — 보통 현재 브랜치의 끝",
    explanation:
      "새 커밋은 HEAD의 직계 자식으로 만들어지고 브랜치가 그것을 가리키도록 갱신됩니다. status가 보여주는 커밋될 것은 HEAD와 인덱스의 차이입니다.",
    related: ["Commit (Git)", "Branch", "Index (Staging Area)"],
  },
  {
    term: "Commit (Git)",
    category: "Git",
    shortDefinition: "인덱스의 내용과 메시지로 만들어지는, 되돌아갈 수 있는 기록 지점",
    explanation:
      "커밋은 저장 버튼이 아니라 이력 그래프에 노드를 추가하는 행위입니다. 부모-자식으로 연결된 커밋들이 이력을 이루며, 이 연결 덕분에 조회(log)·분기(branch)·복구(reset)가 가능해집니다. React 렌더 단계의 Commit과는 다른 개념입니다.",
    related: ["HEAD", "Index (Staging Area)", "Repository (저장소)"],
  },
  {
    term: "Untracked File",
    category: "Git",
    shortDefinition: "워킹 트리에 있지만 Git이 아직 관리하지 않는 파일",
    explanation:
      "git status의 세 번째 묶음으로 표시되며, git add를 거쳐야 추적이 시작됩니다. 실험 파일이나 비밀 키가 무심코 add되지 않도록, 반복 제외 대상은 .gitignore에 등록합니다.",
    related: ["Working Tree", "Index (Staging Area)"],
  },
  {
    term: "Branch",
    category: "Git",
    shortDefinition: "커밋 그래프의 특정 지점을 가리키는 움직이는 포인터 — 파일 복사본이 아님",
    explanation:
      "새 브랜치는 현재 HEAD를 가리키는 이름표로 생성되며, 그 브랜치에서 커밋할 때마다 포인터가 전진합니다. 복사가 없으므로 생성 비용이 사실상 없고, 실험·기능·수정 작업을 본 이력과 격리하는 기본 수단이 됩니다.",
    related: ["HEAD", "Commit (Git)", "Merge"],
  },
  {
    term: "Merge",
    category: "Git",
    shortDefinition: "갈라진 이력의 변경을 — 분기 시점 이후분만 — 현재 브랜치로 편입하는 작업",
    explanation:
      "merge는 대칭이 아니라 방향이 있습니다: 결과를 받을 브랜치에 서서 실행해야 합니다. 편입 범위는 두 이력이 갈라진 시점 이후의 차이이며, git pull도 내부적으로 merge를 사용합니다.",
    related: ["Branch", "Merge Conflict", "Commit (Git)"],
  },
  {
    term: "Merge Conflict",
    category: "Git",
    shortDefinition: "양쪽 브랜치가 같은 영역을 다르게 수정해 Git이 사람의 판단을 요구하는 상태",
    explanation:
      "Git은 임의로 한쪽을 고르지 않고 양쪽 내용을 충돌 마커와 함께 남깁니다. 해결은 마커 삭제가 아니라 두 변경의 의도를 살리는 의미의 병합이며, 정리 후 add·commit으로 마무리합니다.",
    related: ["Merge", "Branch", "Working Tree"],
  },
  {
    term: "Switch",
    category: "Git",
    shortDefinition: "워킹 트리·인덱스·미래 커밋의 목적지를 지정 브랜치 기준으로 옮기는 작업",
    explanation:
      "git switch는 파일 내용과 스테이징 상태를 대상 브랜치에 맞게 갱신하고, 이후 커밋이 그 브랜치 끝에 쌓이게 합니다. -c 옵션은 생성과 전환을 한 번에 수행합니다. 미커밋 변경을 든 채 전환하면 작업이 섞일 수 있습니다.",
    related: ["Branch", "Working Tree", "Index (Staging Area)"],
  },
  {
    term: "Diff",
    category: "Git",
    shortDefinition: "두 상태 사이의 내용 차이 — 비교쌍을 골라 보는 조회 도구",
    explanation:
      "git diff는 인자에 따라 비교쌍이 달라지므로 지금 무엇과 무엇을 비교 중인가가 항상 첫 질문입니다. 인자가 없으면 아직 add하지 않은 변경(워킹 트리와 인덱스의 차이)을 보여줍니다. AI 변경 검토의 핵심 도구입니다.",
    related: ["Index (Staging Area)", "Working Tree", "Commit (Git)"],
  },
  {
    term: "Reachability",
    category: "Git",
    shortDefinition: "커밋에서 parent 링크를 따라 거슬러 올라가 닿을 수 있는 커밋들의 집합",
    explanation:
      "git log의 나열 기준이 바로 이것입니다 — 지정한 커밋에서 도달 가능한 것을 포함하고, ^ 표시 커밋에서 도달 가능한 것을 제외합니다. main..feature 같은 범위 문법은 이 포함/제외의 표기법입니다.",
    related: ["Commit (Git)", "Branch", "HEAD"],
  },
  {
    term: "Git Object",
    category: "Git",
    shortDefinition: "저장소 내용물의 저장 단위 — blob, tree, tag, commit 네 종류",
    explanation:
      ".git/objects에 저장되는 모든 것이 이 네 타입 중 하나이며, git show는 이들 모두를 열람합니다. 커밋도 특별한 존재가 아니라 객체 저장소의 한 시민이라는 것이 Git 내부 모델의 핵심입니다.",
    related: ["Repository (저장소)", "Commit (Git)", "Diff"],
  },
  {
    term: "Reset",
    category: "Git",
    shortDefinition: "HEAD와 인덱스를 지정 커밋 상태로 옮기는 이력 재작성 — soft/mixed/hard 3모드",
    explanation:
      "soft는 HEAD만, mixed(기본)는 HEAD+인덱스, hard는 워킹 트리까지 되감습니다. hard는 미추적 파일도 덮어쓸 수 있는 유일한 파괴 모드입니다. 공유(push) 이전의 로컬 이력에만 쓰는 것이 안전 경계입니다.",
    related: ["HEAD", "Revert", "Index (Staging Area)"],
  },
  {
    term: "Revert",
    category: "Git",
    shortDefinition: "기존 커밋의 반대 변경을 새 커밋으로 기록하는 이력 보존형 취소",
    explanation:
      "이력을 지우지 않고 오히려 한 칸 늘리므로 공유된 이력에서 안전하며, 취소했다는 사실이 감사 가능한 기록으로 남습니다. 실행 전 워킹 트리가 깨끗해야 합니다. 이미 배포·공유된 결함의 표준 취소 수단입니다.",
    related: ["Commit (Git)", "Reset", "Merge Conflict"],
  },
  {
    term: "Restore",
    category: "Git",
    shortDefinition: "파일 내용을 복원 소스에서 되살리는 명령 — 스테이징 취소 포함",
    explanation:
      "기본은 워킹 트리 복원(미커밋 수정 폐기), --staged는 스테이징 취소(내용 유지), --source는 과거 시점 파일 추출입니다. 워킹 트리 복원으로 버린 미커밋 수정은 되돌릴 수 없으므로 실행 전 diff 확인이 필수입니다.",
    related: ["Working Tree", "Index (Staging Area)", "Reset"],
  },
  {
    term: "Rebase",
    category: "Git",
    shortDefinition: "일련의 커밋을 다른 기반 위로 재적용(이식)하는 이력 재작성 명령",
    explanation:
      '원래 커밋이 이동하는 것이 아니라 같은 변경 내용의 새 커밋(해시가 바뀜)이 새 기반 위에 만들어집니다. 이력을 평평하게 정리하지만, 공식 문서가 "다른 사람이 기반으로 삼은 브랜치의 재작성은 나쁜 생각"이라고 경고하듯 공유(push) 이전에만 안전합니다. 충돌 시 --continue/--skip/--abort로 진행을 제어합니다.',
    related: ["Commit (Git)", "Branch", "Merge"],
  },
  {
    term: "Cherry-pick",
    category: "Git",
    shortDefinition: "지정한 기존 커밋의 변경만 골라 현재 브랜치에 새 커밋으로 적용하는 명령",
    explanation:
      "브랜치 전체가 아니라 커밋 하나(또는 몇 개)만 이식할 때 씁니다. revert의 정방향으로, 각 커밋의 변경을 그대로의 패치로 새 커밋에 기록합니다. 워킹 트리가 깨끗해야 시작되며, 이식본은 원본과 다른 해시의 별개 커밋이므로 이후 원 브랜치를 합칠 때 중복 적용에 주의합니다.",
    related: ["Commit (Git)", "Revert", "Merge Conflict"],
  },
  {
    term: "Stash",
    category: "Git",
    shortDefinition: "진행 중인 워킹 트리·인덱스 수정을 보관소에 치우고 HEAD 상태로 되돌리는 명령",
    explanation:
      "커밋하기엔 이르고 버리기엔 아까운 작업을 잠깐 치워 깨끗한 상태를 만듭니다. list로 나열, show로 열람, apply로 복원하며 다른 커밋 위에도 복원할 수 있습니다. 브랜치와 달리 이력에 보이지 않아 잊히기 쉬우므로 오래 갈 작업은 stash 대신 브랜치+커밋이 낫습니다.",
    related: ["Working Tree", "Index (Staging Area)", "HEAD"],
  },
  {
    term: "Pull Request",
    category: "Git",
    shortDefinition:
      "한 브랜치(head)의 변경을 다른 브랜치(base)로 병합하자는 제안이자 리뷰·병합의 협업 단위",
    explanation:
      'GitHub이 Git 위에 얹은 협업 계층으로, "제안 → 리뷰 → 승인 → 병합" 절차를 부여합니다. Files changed 탭이 base와 head의 diff를 보여주고, PR을 연 뒤 head에 커밋을 더 push하면 같은 PR이 자동 갱신됩니다. 완성 전에는 병합 불가·자동 리뷰요청 없는 Draft PR로 열 수 있습니다.',
    related: ["Branch", "Merge", "Diff"],
  },
  {
    term: "Code Review",
    category: "Git",
    shortDefinition:
      "병합 전 변경을 검토해 Comment·Approve·Request changes 세 상태로 판정하는 절차",
    explanation:
      "Comment는 승인/거부 없는 일반 피드백, Approve는 병합 승인, Request changes는 병합 전 반드시 고쳐야 할 문제 지적입니다. 특정 라인에 코멘트하거나 작성자가 바로 반영할 suggested changes를 남길 수 있으며, 저장소 관리자는 병합 전 승인 수(required approvals)를 강제할 수 있습니다.",
    related: ["Pull Request", "Diff", "Merge"],
  },
  {
    term: "Merge Strategy",
    category: "Git",
    shortDefinition:
      "PR을 base에 합칠 때 이력에 남는 모양을 정하는 세 방식 — merge commit·squash·rebase",
    explanation:
      "Create a merge commit은 head의 모든 커밋과 병합 커밋을 남겨 이력을 보존하고, Squash and merge는 PR의 커밋들을 하나로 압축하며, Rebase and merge는 병합 커밋 없이 base 위에 개별 커밋으로 얹습니다. 깔끔함(squash)과 이력 진실성(merge commit)의 트레이드오프입니다.",
    related: ["Pull Request", "Rebase", "Merge"],
  },
  {
    term: "GitHub CLI (gh)",
    category: "Git",
    shortDefinition: "PR·이슈·리뷰를 터미널에서 수행하는 GitHub 공식 명령줄 도구",
    explanation:
      "gh pr create(제안)·review(리뷰)·merge(병합)·checkout(로컬로 받기)으로 웹 PR 흐름 전체를 셸에서 처리합니다. 플래그가 웹 개념의 직역이라(--base/--head, --approve/--comment/--request-changes, --merge/--squash/--rebase) 개념을 알면 명령이 읽힙니다. 스크립트·AI 에이전트가 PR을 다룰 때 실제로 실행하는 명령군이며, gh auth login 인증과 GitHub 원격이 전제입니다.",
    related: ["Pull Request", "Code Review", "Merge Strategy"],
  },
  {
    term: "gh pr checkout",
    category: "Git",
    shortDefinition: "대상 PR을 로컬 git 브랜치로 받아 실행·검토할 수 있게 하는 명령",
    explanation:
      '매뉴얼 정의는 "Check out a pull request in git"입니다. diff를 눈으로 읽는 것을 넘어 남의(또는 AI의) PR을 실제로 내 컴퓨터에서 돌려보게 해 "읽는 리뷰"를 "돌려보는 리뷰"로 확장합니다. AI 결과일수록 실행 검증이 중요하므로 리뷰의 숨은 절반을 담당합니다.',
    related: ["GitHub CLI (gh)", "Pull Request", "Code Review"],
  },
  {
    term: "Server Component",
    category: "프론트엔드",
    shortDefinition:
      "서버에서 렌더링되어 결과만 클라이언트로 전달되는 React 컴포넌트 — App Router의 기본값",
    explanation:
      "Next.js에서 레이아웃과 페이지는 기본적으로 Server Component입니다. 서버에서 데이터를 가져와 렌더링하고 결과를 캐시·스트리밍할 수 있으며, 그 코드는 클라이언트 번들에 포함되지 않아 번들 축소와 비밀(API 키) 보호에 유리합니다.",
    related: ["Client Component", "RSC Payload", "Hydration"],
  },
  {
    term: "Client Component",
    category: "프론트엔드",
    shortDefinition: "use client 지시어로 선언되어 브라우저에서 실행되는 React 컴포넌트",
    explanation:
      "상태, 이벤트 핸들러, 생명주기 로직, 브라우저 API가 필요할 때 사용합니다. 지시어가 붙은 파일이 import하는 모든 것이 클라이언트 번들에 포함되므로, 경계를 상호작용이 필요한 최소 단위로 좁게 긋는 것이 성능의 핵심입니다.",
    related: ["Server Component", "Hydration", "React Component"],
  },
  {
    term: "RSC Payload",
    category: "프론트엔드",
    shortDefinition:
      "렌더링된 서버 컴포넌트 트리의 압축된 이진 표현 — 서버와 클라이언트를 잇는 전달 형식",
    explanation:
      "서버 컴포넌트의 렌더링 결과, 클라이언트 컴포넌트의 자리 표시와 JS 참조, 서버에서 넘기는 props가 담깁니다. 첫 로드에서는 트리 조정에, 이후 내비게이션에서는 prefetch되어 즉시 전환에 쓰입니다.",
    related: ["Server Component", "Client Component", "Hydration"],
  },
  {
    term: "Hydration",
    category: "프론트엔드",
    shortDefinition: "정적 HTML에 이벤트 핸들러를 붙여 상호작용을 살리는 React의 절차",
    explanation:
      "서버가 만든 HTML은 보이기만 하고 반응하지 못합니다. 하이드레이션이 그 HTML의 DOM에 핸들러를 연결해 클릭·입력이 동작하게 만듭니다. 서버 렌더링인데 왜 JS가 필요한가의 답이며, 첫 화면은 빠르되 상호작용이 약간 늦는 SSR 체감의 원인입니다.",
    related: ["Server Component", "Client Component", "DOM"],
  },
  {
    term: "Dynamic Route Segment",
    category: "프론트엔드",
    shortDefinition:
      "폴더명을 대괄호로 감싸([slug]) 하나의 파일로 여러 페이지를 만드는 라우팅 관례",
    explanation:
      "데이터 개수만큼 페이지가 생성되며, 컴포넌트는 params로 현재 세그먼트 값을 받아 해당 데이터를 렌더링합니다. 이 사이트의 강의 페이지 51개가 app/lessons/[slug] 파일 하나에서 나옵니다.",
    related: ["Server Component", "Client Component"],
  },
  {
    term: "AI Code Review",
    category: "AI 코딩 도구",
    shortDefinition: "AI가 코드 변경의 위험, 품질, 테스트 필요성을 검토하도록 돕는 리뷰 방식",
    explanation:
      "AI Code Review는 사람이 놓치기 쉬운 반복 패턴, 변경 범위, 누락된 테스트, 보안 위험을 빠르게 훑게 하지만 최종 책임을 대신하지 않습니다. 실무에서는 Human Review와 함께 쓰며, AI가 제안한 지적도 diff와 실행 결과로 다시 확인해야 합니다.",
    related: ["Human Review", "Code Review", "Component Boundary"],
  },
  {
    term: "AI 코딩 도구",
    category: "AI",
    shortDefinition: "코드 작성, 수정, 리뷰, 설명을 돕는 AI 기반 개발 도구",
    explanation:
      "AI 코딩 도구는 자동완성, 채팅, IDE Agent, 코드 리뷰, 터미널 실행처럼 개발 흐름의 여러 위치에 붙습니다. 도구 자체보다 중요한 것은 권한, 근거, 검증, 되돌리기 루틴을 함께 설계하는 것입니다.",
    related: ["Prompt Engineering", "AI Code Review", "Codex"],
  },
  {
    term: "Accessibility",
    category: "웹 개발",
    shortDefinition: "다양한 사용자가 웹 콘텐츠와 기능을 사용할 수 있게 만드는 품질 기준",
    explanation:
      "Accessibility는 시각, 청각, 운동, 인지 조건이 다른 사용자도 화면 구조를 이해하고 조작할 수 있게 만드는 일입니다. Semantic HTML, Heading, Navigation처럼 의미가 있는 구조를 먼저 세우면 보조 기술과 검색 모두에 유리합니다.",
    related: ["Semantic HTML", "Heading", "Navigation"],
  },
  {
    term: "Agent Evaluation",
    category: "AI 시스템",
    shortDefinition: "에이전트가 목표를 안전하고 반복 가능하게 달성하는지 평가하는 절차",
    explanation:
      "Agent Evaluation은 단일 답변 품질이 아니라 tool use, loop 종료, 오류 복구, 비용, 사람 승인 지점까지 함께 봅니다. 그래서 Evaluation Harness와 Dataset을 갖추고 실제 작업에 가까운 시나리오로 재현합니다.",
    related: ["Evaluation", "Evaluation Harness", "Dataset"],
  },
  {
    term: "Approval",
    category: "운영",
    shortDefinition: "위험한 변경이나 배포 전에 사람이 명시적으로 허가하는 결정",
    explanation:
      "Approval은 AI나 자동화가 바로 실행해도 되는 작업과 사람이 확인해야 하는 작업을 나누는 경계입니다. 권한이 큰 도구 실행, 배포, 데이터 삭제처럼 되돌리기 어려운 행동 앞에서 특히 중요합니다.",
    related: ["Human Review", "Agent Hook", "Deployment"],
  },
  {
    term: "Boolean",
    category: "프로그래밍",
    shortDefinition: "참과 거짓 두 값으로 조건을 표현하는 데이터 타입",
    explanation:
      "Boolean은 if문, 필터 조건, 기능 토글처럼 코드가 어느 경로로 갈지 결정할 때 쓰입니다. 이름은 `isOpen`, `hasError`처럼 질문 형태로 붙이면 조건문을 읽기 쉬워집니다.",
    related: ["Conditional", "Data Type", "Variable"],
  },
  {
    term: "Browser",
    category: "웹 개발",
    shortDefinition: "HTML, CSS, JavaScript를 해석해 사용자에게 웹 페이지를 보여주는 실행 환경",
    explanation:
      "Browser는 문서를 다운로드하고, DOM과 CSSOM을 만들고, JavaScript 이벤트를 실행하며, 네트워크와 보안 정책을 적용합니다. 웹 개발에서 버그를 찾을 때는 코드뿐 아니라 Browser가 실제로 해석한 결과를 함께 봐야 합니다.",
    related: ["HTML", "CSS", "JavaScript"],
  },
  {
    term: "Browser Security",
    category: "웹 보안",
    shortDefinition: "브라우저가 웹 페이지 실행 중 적용하는 격리, 권한, 보호 정책",
    explanation:
      "Browser Security는 Same-Origin Policy, CORS, CSP, Cookie 정책처럼 웹 앱이 서로의 데이터와 실행 환경을 함부로 침범하지 못하게 하는 규칙 묶음입니다. 프론트엔드 보안은 서버 코드만큼 브라우저 정책 이해가 중요합니다.",
    related: ["Same-Origin Policy", "CSP", "Cookie"],
  },
  {
    term: "CSS Declaration",
    category: "웹 개발",
    shortDefinition: "선택자 안에서 속성과 값을 짝지어 스타일을 지정하는 한 줄 규칙",
    explanation:
      "CSS Declaration은 `color: red`처럼 property와 value로 구성됩니다. Cascade와 Specificity는 여러 declaration이 같은 요소를 가리킬 때 어떤 값이 최종 적용되는지 결정합니다.",
    related: ["CSS Cascade", "Specificity", "Selector"],
  },
  {
    term: "CSS Layout",
    category: "웹 개발",
    shortDefinition: "요소의 크기, 위치, 흐름, 반응형 배치를 정하는 CSS 영역",
    explanation:
      "CSS Layout은 normal flow, flex, grid, positioning, media query를 통해 화면의 구조를 만듭니다. 콘텐츠가 늘거나 기기가 바뀌어도 깨지지 않게 제약과 흐름을 함께 설계하는 것이 핵심입니다.",
    related: ["Normal Flow", "Responsive Design", "Viewport"],
  },
  {
    term: "Code Generation",
    category: "AI 코딩 도구",
    shortDefinition: "자연어 요구사항이나 예시를 바탕으로 코드를 생성하는 과정",
    explanation:
      "Code Generation은 빠른 초안 작성에 강하지만 요구사항 누락, 라이브러리 버전 착각, 테스트 부재가 함께 생길 수 있습니다. 그래서 Natural Language to Code 뒤에는 실행, 리뷰, 작은 diff 관리가 따라와야 합니다.",
    related: ["Natural Language to Code", "AI Code Review", "검증"],
  },
  {
    term: "Code Search",
    category: "개발 기초",
    shortDefinition: "파일, 함수, 문자열, 패턴을 찾아 코드베이스의 위치와 맥락을 파악하는 작업",
    explanation:
      "Code Search는 AI에게 파일을 통째로 맡기기 전에 사람이 근거를 좁히는 기본기입니다. 검색 범위와 패턴을 잘 잡으면 관련 코드, 테스트, 문서가 빠르게 모이고 수정 위험도 줄어듭니다.",
    related: ["Search Scope", "Regular Expression", "Pattern Matching"],
  },
  {
    term: "Codex",
    category: "AI 코딩 도구",
    shortDefinition: "코드 읽기, 수정, 검증, 터미널 실행을 함께 수행하는 AI 개발 에이전트",
    explanation:
      "Codex는 단순 답변 도구가 아니라 파일 시스템과 명령 실행을 다루며 작업을 끝까지 이어가는 실행자 역할을 맡을 수 있습니다. 좋은 결과를 위해서는 명확한 목표, 작은 커밋, verify, 기록이 함께 필요합니다.",
    related: ["AI 코딩 도구", "Agent Loop", "검증"],
  },
  {
    term: "Component Tree",
    category: "프론트엔드",
    shortDefinition: "컴포넌트들이 부모와 자식 관계로 연결된 화면 구조",
    explanation:
      "Component Tree는 데이터와 상태가 어디서 내려오고 이벤트가 어디로 올라가는지 보여주는 지도입니다. React에서는 이 구조를 잘 나누어야 재사용성과 디버깅 가능성이 좋아집니다.",
    related: ["React Component", "Composition", "Component Boundary"],
  },
  {
    term: "Cookie",
    category: "웹 보안",
    shortDefinition: "브라우저가 서버와 주고받으며 저장하는 작은 상태 데이터",
    explanation:
      "Cookie는 로그인 세션, 사용자 설정, 추적 식별자 등에 쓰입니다. 인증에 쓰일 때는 HttpOnly, Secure, SameSite 같은 속성으로 XSS와 CSRF 위험을 줄여야 합니다.",
    related: ["CSRF", "Browser Security", "Auth"],
  },
  {
    term: "Data Type",
    category: "프로그래밍",
    shortDefinition: "값이 어떤 종류이고 어떤 연산이 가능한지 설명하는 분류",
    explanation:
      "Data Type은 숫자, 문자열, Boolean, 객체, 배열처럼 값의 모양과 사용법을 알려줍니다. TypeScript에서는 타입이 문서이자 안전장치가 되어 AI가 생성한 코드의 실수를 더 빨리 잡게 해 줍니다.",
    related: ["Primitive Value", "Object", "TypeScript"],
  },
  {
    term: "Dataset",
    category: "AI 시스템",
    shortDefinition: "평가, 학습, 검증에 쓰는 입력과 기대 결과의 묶음",
    explanation:
      "Dataset은 모델이나 에이전트가 실제 문제를 얼마나 잘 푸는지 반복 측정하게 해 줍니다. 좋은 평가셋은 쉬운 예시뿐 아니라 edge case와 실패하기 쉬운 상황을 포함합니다.",
    related: ["Evaluation", "Eval Run", "Agent Evaluation"],
  },
  {
    term: "Debugger",
    category: "개발 기초",
    shortDefinition: "코드 실행을 멈추고 변수와 호출 흐름을 관찰하게 해 주는 도구",
    explanation:
      "Debugger는 추측 대신 실제 실행 상태를 보는 장치입니다. Breakpoint를 걸고 Variable Inspection을 하면서 오류가 발생한 순간의 데이터와 분기 흐름을 확인합니다.",
    related: ["Breakpoint", "Variable Inspection", "Error Message"],
  },
  {
    term: "Deployment",
    category: "배포와 운영",
    shortDefinition: "개발된 코드를 사용자가 접근할 수 있는 실행 환경에 반영하는 과정",
    explanation:
      "Deployment는 빌드 결과물을 서버나 호스팅 플랫폼에 올리고, 환경변수와 도메인, 접근 보호, 롤백 전략을 함께 적용하는 일입니다. 운영에서는 배포 자체보다 실패 시 되돌릴 수 있는지가 중요합니다.",
    related: ["Build", "Environment Variable", "Rollback"],
  },
  {
    term: "Display",
    category: "웹 개발",
    shortDefinition: "요소가 문서 흐름에서 어떤 박스와 배치 규칙을 갖는지 정하는 CSS 속성",
    explanation:
      "Display는 block, inline, flex, grid처럼 요소의 기본 배치 방식을 바꿉니다. 레이아웃 문제를 볼 때는 margin보다 먼저 display와 normal flow를 확인하는 편이 빠릅니다.",
    related: ["Normal Flow", "CSS Layout", "Layout"],
  },
  {
    term: "Evaluation",
    category: "AI 시스템",
    shortDefinition: "모델이나 시스템 결과가 목표 기준을 만족하는지 측정하는 절차",
    explanation:
      "Evaluation은 감으로 좋고 나쁨을 말하는 대신 입력, 기대 결과, 채점 기준, 실패 사례를 남기는 방식입니다. AI 시스템에서는 기능 추가만큼 평가 설계가 중요합니다.",
    related: ["Dataset", "Eval Run", "Agent Evaluation"],
  },
  {
    term: "EventTarget",
    category: "웹 개발",
    shortDefinition: "이벤트 리스너를 등록하고 이벤트를 받을 수 있는 DOM 인터페이스",
    explanation:
      "EventTarget은 addEventListener가 붙는 대상입니다. 버튼, 문서, 창처럼 이벤트를 받을 수 있는 객체가 이 인터페이스를 통해 클릭, 입력, 키보드 이벤트를 처리합니다.",
    related: ["addEventListener", "Event", "DOM"],
  },
  {
    term: "External System",
    category: "프론트엔드",
    shortDefinition: "React 렌더링 바깥에 있어 effect로 동기화해야 하는 브라우저·서버·구독 대상",
    explanation:
      "External System은 DOM 이벤트, 네트워크 연결, 타이머, 브라우저 API처럼 React의 순수 렌더링만으로 다룰 수 없는 대상입니다. Effect는 이런 외부 상태와 컴포넌트 상태를 맞추는 경계입니다.",
    related: ["Effect", "Effect Dependency", "React Hook"],
  },
  {
    term: "File System",
    category: "개발 기초",
    shortDefinition: "파일과 폴더를 저장하고 경로로 찾게 해 주는 운영체제의 저장 구조",
    explanation:
      "File System은 프로젝트 구조, import 경로, 빌드 산출물, 설정 파일 위치를 결정합니다. AI와 작업할 때도 파일 경로를 정확히 말해야 수정 위치가 어긋나지 않습니다.",
    related: ["File Path", "Current Directory", "Operating System"],
  },
  {
    term: "Flags",
    category: "개발 기초",
    shortDefinition: "명령어나 정규식의 동작 옵션을 바꾸는 짧은 설정값",
    explanation:
      "Flags는 같은 명령이나 패턴을 다른 방식으로 실행하게 만듭니다. 정규식에서는 대소문자 무시, 전역 검색 같은 의미를 갖고, CLI에서는 출력 형식이나 대상 범위를 바꿉니다.",
    related: ["RegExp", "PowerShell Cmdlet", "Shell Command"],
  },
  {
    term: "Git",
    category: "Git",
    shortDefinition: "파일 변경 이력을 커밋 단위로 기록하고 되돌릴 수 있게 하는 버전 관리 도구",
    explanation:
      "Git은 코드의 시간표입니다. 커밋, 브랜치, diff, merge를 이용해 작업을 작게 저장하고, 실수했을 때 복구하며, 여러 사람이 같은 프로젝트를 안전하게 다룹니다.",
    related: ["Version Control", "Commit", "Branch"],
  },
  {
    term: "HTTP",
    category: "웹 개발",
    shortDefinition: "브라우저와 서버가 요청과 응답으로 데이터를 주고받는 웹 통신 규약",
    explanation:
      "HTTP는 method, URL, header, body, status code로 구성됩니다. 웹 앱에서 화면이 데이터를 가져오거나 저장할 때 대부분 HTTP 요청과 응답 흐름을 거칩니다.",
    related: ["HTTP Method", "HTTP 상태 코드", "REST API"],
  },
  {
    term: "Heading",
    category: "웹 개발",
    shortDefinition: "문서의 제목 계층을 나타내는 HTML 구조",
    explanation:
      "Heading은 h1부터 h6까지 문서의 목차와 의미 구조를 만듭니다. 화면 크기나 글자 크기보다 정보 계층을 먼저 표현해야 접근성과 읽기 흐름이 좋아집니다.",
    related: ["Semantic HTML", "Accessibility", "Content Sectioning"],
  },
  {
    term: "Indexed Collection",
    category: "프로그래밍",
    shortDefinition: "번호 기반 위치로 값을 저장하고 찾는 데이터 모음",
    explanation:
      "Indexed Collection은 배열처럼 0, 1, 2 순서의 index로 값에 접근합니다. 순서가 중요한 목록, 반복 처리, UI 리스트 렌더링에서 자주 사용됩니다.",
    related: ["Array", "Iteration", "Data Type"],
  },
  {
    term: "Input Validation",
    category: "웹 보안",
    shortDefinition: "외부에서 들어온 값이 기대한 형식과 범위를 만족하는지 확인하는 절차",
    explanation:
      "Input Validation은 사용자가 보낸 데이터, API 응답, 파일 내용이 안전하고 처리 가능한지 확인합니다. 보안에서는 XSS와 잘못된 상태 전파를 줄이는 첫 방어선이 됩니다.",
    related: ["Validation", "XSS", "Rendering Context"],
  },
  {
    term: "Iteration",
    category: "프로그래밍",
    shortDefinition: "조건이 만족될 때까지 같은 작업을 반복하는 실행 방식",
    explanation:
      "Iteration은 배열 순회, 재시도, agent loop처럼 반복이 필요한 문제를 다룰 때 등장합니다. 반복에는 항상 종료 조건과 실패했을 때의 처리 기준이 필요합니다.",
    related: ["Loop", "Array", "Conditional"],
  },
  {
    term: "JavaScript Error Reference",
    category: "개발 기초",
    shortDefinition: "JavaScript 오류 이름과 원인을 찾아보는 참조 자료",
    explanation:
      "JavaScript Error Reference는 TypeError, ReferenceError, SyntaxError 같은 메시지가 무엇을 뜻하는지 설명합니다. 오류 메시지를 검색할 때는 전체 문장보다 오류 이름과 발생 위치를 함께 보는 것이 좋습니다.",
    related: ["Error Message", "Debugger", "JavaScript"],
  },
  {
    term: "Layout",
    category: "웹 개발",
    shortDefinition: "화면 안에서 요소의 위치와 크기가 결정되는 방식",
    explanation:
      "Layout은 콘텐츠 흐름, 부모 크기, display, flex/grid, media query가 합쳐져 만들어집니다. 레이아웃 문제는 개별 속성보다 제약 조건과 컨테이너 관계를 함께 봐야 풀립니다.",
    related: ["CSS Layout", "Display", "Viewport"],
  },
  {
    term: "Navigation",
    category: "웹 개발",
    shortDefinition: "사용자가 사이트 안에서 위치를 이동하고 현재 맥락을 이해하게 하는 구조",
    explanation:
      "Navigation은 메뉴, 목차, 이전/다음 링크, breadcrumb처럼 정보 구조를 드러냅니다. 학습 사이트에서는 사용자가 지금 어디에 있고 다음에 무엇을 읽을지 알려주는 장치입니다.",
    related: ["Nav Element", "Accessibility", "라우팅"],
  },
  {
    term: "Network",
    category: "웹 개발",
    shortDefinition: "브라우저와 서버, API, CDN 사이에서 데이터가 오가는 통신 계층",
    explanation:
      "Network를 보면 요청 URL, method, status, timing, response가 드러납니다. 화면 문제가 데이터 문제인지 렌더링 문제인지 나눌 때 브라우저 Network 패널이 핵심 증거가 됩니다.",
    related: ["HTTP", "Performance Timing", "API"],
  },
  {
    term: "Node.js",
    category: "개발 기초",
    shortDefinition: "브라우저 밖에서 JavaScript를 실행하는 서버·도구 런타임",
    explanation:
      "Node.js는 npm scripts, 빌드 도구, 개발 서버, 파일 시스템 작업을 실행합니다. 프론트엔드 프로젝트에서도 실제 빌드와 패키지 관리는 대개 Node.js 위에서 돌아갑니다.",
    related: ["Package Folder Tree", "Node File System Module", "npm scripts"],
  },
  {
    term: "Object",
    category: "프로그래밍",
    shortDefinition: "이름 붙은 property들을 묶어 하나의 값으로 다루는 데이터 구조",
    explanation:
      "Object는 사용자, 설정, API 응답처럼 여러 값을 하나의 모양으로 묶을 때 쓰입니다. TypeScript에서는 Object Shape와 Object Type으로 그 모양을 명시해 실수를 줄입니다.",
    related: ["Object Shape", "Property", "Object Type"],
  },
  {
    term: "Operating System",
    category: "개발 기초",
    shortDefinition: "파일, 프로세스, 경로, 권한, 명령 실행을 관리하는 컴퓨터의 기본 소프트웨어",
    explanation:
      "Operating System은 Windows, macOS, Linux처럼 개발 도구가 실행되는 바닥입니다. 경로 구분자, shell 문법, 환경변수 표현이 운영체제에 따라 달라질 수 있습니다.",
    related: ["File System", "Path Separator", "Shell Command"],
  },
  {
    term: "Optional Property",
    category: "TypeScript",
    shortDefinition: "객체 타입에서 있을 수도 있고 없을 수도 있는 property",
    explanation:
      "Optional Property는 `name?: string`처럼 표시하며, 값이 없을 가능성을 타입 시스템에 알려줍니다. 이 값에 접근할 때는 undefined 가능성을 좁히거나 기본값을 둬야 합니다.",
    related: ["Object Type", "Property", "Type Guard"],
  },
  {
    term: "Parameter",
    category: "프로그래밍",
    shortDefinition: "함수가 호출될 때 외부에서 받는 입력 이름",
    explanation:
      "Parameter는 함수 안에서 사용할 입력값의 자리표입니다. 좋은 parameter 이름은 함수가 무엇을 필요로 하는지 문서처럼 보여 줍니다.",
    related: ["Function", "Return Value", "Scope"],
  },
  {
    term: "Pattern Matching",
    category: "개발 기초",
    shortDefinition: "문자열이나 코드에서 규칙에 맞는 부분을 찾아내는 방식",
    explanation:
      "Pattern Matching은 정규식, 검색 도구, 로그 분석에서 반복되는 형태를 찾는 데 쓰입니다. AI에게 검색을 맡길 때도 어떤 패턴을 찾는지 명확해야 결과가 흔들리지 않습니다.",
    related: ["Regular Expression", "Character Class", "Code Search"],
  },
  {
    term: "Performance",
    category: "웹 개발",
    shortDefinition: "사용자가 느끼는 속도와 시스템 자원 사용의 품질",
    explanation:
      "Performance는 로딩 시간, 렌더링 지연, 네트워크 대기, 번들 크기처럼 여러 요소가 합쳐져 결정됩니다. 최적화는 측정 없이 시작하면 체감 개선보다 복잡도만 늘 수 있습니다.",
    related: ["Performance Timing", "Network", "Browser Rendering"],
  },
  {
    term: "PowerShell",
    category: "개발 기초",
    shortDefinition: "Windows에서 자주 쓰이는 객체 기반 명령줄 shell",
    explanation:
      "PowerShell은 명령 결과를 단순 문자열이 아니라 객체로 다룰 수 있어 파일 검색, 프로세스 확인, 스크립트 자동화에 강합니다. Windows 개발 환경에서는 cmd와 문법 차이를 이해해야 합니다.",
    related: ["PowerShell Cmdlet", "Shell Command", "Command Output"],
  },
  {
    term: "Property",
    category: "프로그래밍",
    shortDefinition: "객체 안에서 이름으로 접근하는 값",
    explanation:
      "Property는 `user.name`의 name처럼 객체를 이루는 항목입니다. API 응답이나 컴포넌트 props를 이해하려면 어떤 property가 필수인지 선택인지 구분해야 합니다.",
    related: ["Object", "Object Shape", "Optional Property"],
  },
  {
    term: "REST",
    category: "백엔드",
    shortDefinition: "리소스를 URL로 표현하고 HTTP method로 행동을 구분하는 API 설계 방식",
    explanation:
      "REST는 `/users/1` 같은 리소스 주소와 GET, POST, PATCH, DELETE 같은 method를 조합해 API 의도를 드러냅니다. 완벽한 철학보다 일관된 URL과 상태 코드 사용이 실무의 출발점입니다.",
    related: ["REST API", "HTTP Method", "HTTP"],
  },
  {
    term: "Rendering Context",
    category: "웹 보안",
    shortDefinition:
      "데이터가 HTML, 속성, URL, JavaScript, CSS 중 어디에 삽입되는지 나타내는 실행 맥락",
    explanation:
      "Rendering Context가 달라지면 같은 문자열도 필요한 escaping과 위험이 달라집니다. XSS 방어에서는 값이 들어가는 위치를 알아야 올바른 출력 인코딩을 선택할 수 있습니다.",
    related: ["XSS", "Input Validation", "Browser Security"],
  },
  {
    term: "Return Value",
    category: "프로그래밍",
    shortDefinition: "함수가 실행을 마치고 호출한 쪽에 돌려주는 값",
    explanation:
      "Return Value는 함수의 결과 계약입니다. 함수가 무엇을 반환하는지 명확하면 다음 코드가 그 값을 안전하게 이어받아 사용할 수 있습니다.",
    related: ["Function", "Parameter", "Data Type"],
  },
  {
    term: "Reusable Component",
    category: "프론트엔드",
    shortDefinition: "여러 화면에서 같은 목적과 인터페이스로 다시 쓸 수 있는 컴포넌트",
    explanation:
      "Reusable Component는 중복 UI를 줄이지만 너무 빨리 일반화하면 props가 복잡해집니다. 반복되는 실제 사용 사례가 보일 때 경계를 잡는 것이 좋습니다.",
    related: ["React Component", "Generic", "Component Boundary"],
  },
  {
    term: "SQL",
    category: "백엔드",
    shortDefinition: "관계형 데이터베이스에서 데이터를 조회하고 변경하는 질의 언어",
    explanation:
      "SQL은 table, column, row, index를 대상으로 데이터를 찾고 집계하고 수정합니다. API 뒤에서 실제 데이터가 어떻게 저장되는지 이해하려면 SQL의 기본 구조가 필요합니다.",
    related: ["DB", "Table", "Index"],
  },
  {
    term: "Scope",
    category: "프로그래밍",
    shortDefinition: "변수와 함수 이름이 유효하게 보이는 코드 범위",
    explanation:
      "Scope는 어떤 이름을 어디서 읽고 쓸 수 있는지 결정합니다. 오류를 디버깅할 때 값이 없거나 예상과 다른 이유가 scope 경계에 있는 경우가 많습니다.",
    related: ["Variable", "Function", "Parameter"],
  },
  {
    term: "Selector",
    category: "웹 개발",
    shortDefinition: "CSS 규칙을 적용할 HTML 요소를 고르는 패턴",
    explanation:
      "Selector는 태그, 클래스, id, 속성, 상태를 조합해 대상 요소를 찾습니다. 어떤 selector가 더 강한지는 Specificity가 결정합니다.",
    related: ["Specificity", "CSS Declaration", "CSS Cascade"],
  },
  {
    term: "Shell Command",
    category: "개발 기초",
    shortDefinition: "터미널에서 shell이 해석해 실행하는 명령",
    explanation:
      "Shell Command는 파일 목록 확인, 빌드 실행, 테스트, Git 작업처럼 개발 루틴의 기본 단위입니다. AI에게 명령 실행을 맡길 때도 working directory와 인자를 정확히 남겨야 합니다.",
    related: ["PowerShell", "Command Output", "Current Directory"],
  },
  {
    term: "State Setter",
    category: "React",
    shortDefinition: "React state를 새 값으로 예약하는 함수",
    explanation:
      "State Setter는 값을 즉시 바꾸는 일반 대입이 아니라 다음 렌더링을 예약합니다. 이전 값에 의존하면 updater function을 써야 stale state 실수를 줄일 수 있습니다.",
    related: ["useState", "Updater Function", "State Snapshot"],
  },
  {
    term: "Tailwind CSS",
    category: "프론트엔드",
    shortDefinition: "작은 utility class를 조합해 빠르게 스타일을 만드는 CSS 프레임워크",
    explanation:
      "Tailwind CSS는 별도 CSS 파일에 이름을 짓는 대신 HTML/JSX에서 spacing, color, layout class를 조합합니다. 디자인 시스템과 함께 쓰면 빠르지만 class 조합이 길어질 수 있습니다.",
    related: ["CSS", "CSS Layout", "Responsive Design"],
  },
  {
    term: "Technical Debt",
    category: "개발 기초",
    shortDefinition: "빠른 구현을 위해 미뤄 둔 구조적 비용",
    explanation:
      "Technical Debt는 당장 기능은 돌아가지만 나중에 변경, 테스트, 이해를 어렵게 만드는 선택입니다. 프로토타입에서는 허용될 수 있지만 기록과 상환 계획이 없으면 제품 속도를 갉아먹습니다.",
    related: ["Prototype Boundary", "Refactoring", "Code Review"],
  },
  {
    term: "Type Guard",
    category: "TypeScript",
    shortDefinition: "값의 타입을 조건으로 확인해 더 좁은 타입으로 다루게 하는 코드",
    explanation:
      "Type Guard는 `typeof`, `in`, 사용자 정의 predicate처럼 런타임 확인을 타입 시스템에 알려 줍니다. union type에서 안전하게 property를 읽을 때 꼭 필요합니다.",
    related: ["Narrowing", "Union Type", "Validation"],
  },
  {
    term: "Updater Function",
    category: "React",
    shortDefinition: "이전 state를 받아 다음 state를 계산하는 setter 콜백",
    explanation:
      "Updater Function은 `setCount((count) => count + 1)`처럼 이전 값을 기준으로 새 값을 만듭니다. 여러 업데이트가 batching될 때도 순서대로 안전하게 계산됩니다.",
    related: ["State Setter", "Batching", "useState"],
  },
  {
    term: "Validation",
    category: "개발 기초",
    shortDefinition: "값이 약속한 형식, 범위, 필수 조건을 만족하는지 확인하는 절차",
    explanation:
      "Validation은 API 입력, JSON parsing, 폼 제출, 설정 파일에서 잘못된 데이터를 조기에 막습니다. AI가 만든 코드도 외부 입력을 신뢰하지 않는 검증 경계가 필요합니다.",
    related: ["Input Validation", "JSON.parse", "Type Guard"],
  },
  {
    term: "Variable Inspection",
    category: "개발 기초",
    shortDefinition: "디버깅 중 변수의 현재 값을 확인하는 행위",
    explanation:
      "Variable Inspection은 코드가 의도대로 실행되고 있는지 실제 값으로 확인하게 해 줍니다. breakpoint와 함께 쓰면 어떤 분기에서 값이 바뀌었는지 추적할 수 있습니다.",
    related: ["Debugger", "Breakpoint", "Variable"],
  },
  {
    term: "Viewport",
    category: "웹 개발",
    shortDefinition: "브라우저에서 현재 페이지가 보이는 화면 영역",
    explanation:
      "Viewport는 반응형 레이아웃의 기준입니다. 같은 콘텐츠라도 모바일과 데스크톱 viewport에서는 줄바꿈, grid 열 수, 터치 영역이 달라져야 합니다.",
    related: ["Responsive Design", "Media Query", "CSS Layout"],
  },
  {
    term: "unknown",
    category: "TypeScript",
    shortDefinition: "아직 타입을 알 수 없어 확인 전에는 안전하게 사용할 수 없는 타입",
    explanation:
      "unknown은 any보다 안전한 불확실성 표현입니다. 값을 사용하기 전에 type guard나 validation으로 좁혀야 하므로 외부 입력을 다룰 때 실수를 줄입니다.",
    related: ["any", "Type Guard", "Validation"],
  },
  {
    term: "검색",
    category: "AI 시스템",
    shortDefinition: "필요한 정보나 근거를 문서, 코드, 데이터에서 찾아오는 행위",
    explanation:
      "검색은 RAG, 코드 탐색, 문서 확인의 공통 동작입니다. 좋은 검색은 질문을 쪼개고 범위를 좁히며, 찾은 결과가 실제 주장에 충분한지 검증합니다.",
    related: ["RAG", "Code Search", "BM25"],
  },
  {
    term: "검증",
    category: "운영",
    shortDefinition: "결과가 요구사항과 근거, 실행 조건을 만족하는지 확인하는 절차",
    explanation:
      "검증은 AI 시대의 기본 안전장치입니다. 답변을 믿는 것이 아니라 출처, 테스트, 빌드, 사용자 흐름으로 다시 확인해 다음 작업의 기반을 단단하게 만듭니다.",
    related: ["Verification", "Evaluation", "테스트"],
  },
  {
    term: "도구",
    category: "AI 시스템",
    shortDefinition: "AI나 사람이 작업을 수행하기 위해 호출하는 외부 기능",
    explanation:
      "도구는 검색, 파일 읽기, 터미널 실행, API 호출처럼 모델 내부 지식만으로 할 수 없는 일을 가능하게 합니다. 도구 권한이 커질수록 승인과 로그가 중요해집니다.",
    related: ["Tool Calling", "MCP", "Agent Hook"],
  },
  {
    term: "라우팅",
    category: "프론트엔드",
    shortDefinition: "URL과 화면 또는 서버 동작을 연결하는 규칙",
    explanation:
      "라우팅은 사용자가 어떤 주소로 들어왔을 때 어떤 페이지와 데이터를 보여 줄지 정합니다. Next.js에서는 파일 구조와 dynamic route segment가 라우팅 설계의 중심입니다.",
    related: ["Next.js", "Dynamic Route Segment", "Navigation"],
  },
  {
    term: "반응형 UI",
    category: "웹 개발",
    shortDefinition: "화면 크기와 입력 방식에 맞춰 레이아웃과 상호작용이 조정되는 UI",
    explanation:
      "반응형 UI는 모바일, 태블릿, 데스크톱에서 같은 정보를 깨지지 않게 보여 주는 설계입니다. CSS Layout, media query, viewport 기준을 함께 고려합니다.",
    related: ["Responsive Design", "Viewport", "CSS Layout"],
  },
  {
    term: "배포",
    category: "배포와 운영",
    shortDefinition: "사용자가 접근할 수 있는 환경에 애플리케이션을 반영하는 일",
    explanation:
      "배포는 코드를 올리는 행위만이 아니라 빌드, 환경변수, 접근 제어, 롤백, 모니터링을 함께 포함합니다. 학습 사이트도 배포 전 verify와 비공개 보호가 필요합니다.",
    related: ["Deployment", "Build", "Rollback"],
  },
  {
    term: "백엔드",
    category: "백엔드",
    shortDefinition: "사용자 화면 뒤에서 데이터, 인증, 비즈니스 로직, API를 처리하는 영역",
    explanation:
      "백엔드는 DB와 API, 인증, 로그를 다루며 프론트엔드가 보여 줄 데이터를 준비합니다. 화면 문제처럼 보여도 실제 원인은 백엔드 응답이나 데이터 계약일 수 있습니다.",
    related: ["API", "DB", "REST API"],
  },
  {
    term: "브라우저",
    category: "웹 개발",
    shortDefinition: "웹 페이지를 내려받아 해석하고 실행하는 사용자 측 프로그램",
    explanation:
      "브라우저는 HTML 구조, CSS 스타일, JavaScript 동작, 네트워크 요청을 합쳐 화면을 만듭니다. 개발자는 DevTools로 브라우저가 실제로 본 상태를 확인합니다.",
    related: ["Browser", "HTML", "JavaScript"],
  },
  {
    term: "상태",
    category: "프론트엔드",
    shortDefinition: "시간에 따라 바뀌며 화면이나 동작에 영향을 주는 값",
    explanation:
      "상태는 입력값, 선택된 탭, 로딩 여부, 오류 메시지처럼 사용자 상호작용에 따라 바뀝니다. React에서는 state 변경이 렌더링을 다시 일으키므로 데이터 흐름을 명확히 해야 합니다.",
    related: ["React State", "useState", "State Snapshot"],
  },
  {
    term: "상태 코드",
    category: "웹 개발",
    shortDefinition: "HTTP 응답 결과를 숫자로 요약해 알려 주는 코드",
    explanation:
      "상태 코드는 요청이 성공했는지, 리다이렉트됐는지, 클라이언트나 서버 오류인지 알려 줍니다. API 디버깅에서는 body보다 먼저 status code와 method, URL을 확인합니다.",
    related: ["HTTP 상태 코드", "HTTP", "API"],
  },
  {
    term: "출처",
    category: "AI 학습",
    shortDefinition: "주장을 뒷받침하는 원문 문서나 근거 위치",
    explanation:
      "출처는 AI가 만든 설명을 다시 확인할 수 있게 해 주는 좌표입니다. 학습 콘텐츠에서는 직접 인용과 해설이 어떤 공식 문서에 기대는지 명확히 남겨야 합니다.",
    related: ["Citation", "Grounding", "검증"],
  },
  {
    term: "컴포넌트",
    category: "프론트엔드",
    shortDefinition: "화면의 일부와 그 동작을 재사용 가능한 단위로 묶은 조각",
    explanation:
      "컴포넌트는 버튼, 카드, 목록, 페이지 섹션처럼 UI를 작은 단위로 나눕니다. 잘 나눈 컴포넌트는 데이터 흐름과 책임이 분명하고 테스트하기 쉽습니다.",
    related: ["React Component", "Reusable Component", "Component Boundary"],
  },
  {
    term: "타입",
    category: "TypeScript",
    shortDefinition: "값의 모양과 가능한 사용법을 코드로 표현한 약속",
    explanation:
      "타입은 함수 입력, API 응답, 컴포넌트 props가 어떤 모양이어야 하는지 설명합니다. TypeScript에서는 타입을 통해 실행 전에 많은 실수를 발견할 수 있습니다.",
    related: ["TypeScript", "Data Type", "Type Guard"],
  },
  {
    term: "테스트",
    category: "개발 기초",
    shortDefinition: "코드가 기대한 동작을 하는지 자동 또는 수동으로 확인하는 절차",
    explanation:
      "테스트는 변경 후에도 기존 동작이 깨지지 않았는지 알려 주는 안전망입니다. AI가 만든 수정일수록 작은 단위 테스트와 빌드 검증을 함께 돌리는 습관이 중요합니다.",
    related: ["검증", "Evaluation", "Assertion"],
  },
  {
    term: "Auth",
    category: "백엔드",
    shortDefinition: "사용자나 시스템의 신원을 확인하고 접근 권한을 제어하는 인증·인가 영역",
    explanation:
      "Auth는 로그인, 세션, 토큰, 쿠키, 권한 확인을 포함합니다. 초보자에게는 비밀번호 확인만 떠오르기 쉽지만, 실제 서비스에서는 누구인지 확인하는 authentication과 무엇을 할 수 있는지 확인하는 authorization을 함께 봅니다.",
    related: ["Cookie", "Session", "Token"],
  },
  {
    term: "Build",
    category: "배포와 운영",
    shortDefinition: "소스 코드를 실행 가능한 산출물로 변환하는 단계",
    explanation:
      "Build는 TypeScript 변환, 번들링, 정적 페이지 생성, 최적화를 거쳐 배포 가능한 결과물을 만듭니다. 운영에서는 build, release, run을 분리해 같은 산출물이 어떤 설정으로 실행되는지 추적합니다.",
    related: ["Deployment", "Build Time", "Runtime"],
  },
  {
    term: "Index",
    category: "백엔드",
    shortDefinition: "데이터베이스가 특정 값을 더 빠르게 찾도록 돕는 보조 구조",
    explanation:
      "Index는 책의 색인처럼 검색 속도를 높이지만 저장 공간과 쓰기 비용을 늘릴 수 있습니다. 자주 조회하는 column과 조건에 맞춰 설계해야 하고, 모든 column에 무작정 붙이는 것은 좋은 전략이 아닙니다.",
    related: ["SQL", "Table", "DB"],
  },
  {
    term: "Refactoring",
    category: "개발 기초",
    shortDefinition: "겉으로 보이는 동작은 유지하면서 코드 구조를 더 이해하기 쉽게 고치는 작업",
    explanation:
      "Refactoring은 기능 추가가 아니라 구조 개선입니다. 이름, 중복, 함수 경계, 컴포넌트 책임을 정리해 다음 변경을 쉽게 만들며, 테스트나 verify가 있어야 안전하게 진행할 수 있습니다.",
    related: ["Technical Debt", "Code Review", "테스트"],
  },
  {
    term: "Table",
    category: "백엔드",
    shortDefinition: "관계형 데이터베이스에서 row와 column으로 데이터를 저장하는 기본 단위",
    explanation:
      "Table은 사용자, 주문, 게시글처럼 같은 종류의 데이터를 행 단위로 저장합니다. 어떤 column을 둘지와 어떤 index를 만들지는 API 응답 속도와 데이터 정합성에 직접 영향을 줍니다.",
    related: ["SQL", "Index", "DB"],
  },
  {
    term: "Token",
    category: "백엔드",
    shortDefinition: "인증 상태나 권한 정보를 전달하기 위해 발급되는 문자열 형태의 증표",
    explanation:
      "Token은 로그인 이후 사용자가 누구인지 또는 어떤 권한을 갖는지 서버와 클라이언트가 확인하는 데 쓰입니다. 저장 위치, 만료 시간, 갱신 방식이 보안에 직접 영향을 주므로 쿠키와 세션 개념과 함께 봐야 합니다.",
    related: ["Auth", "Session", "Cookie"],
  },
  {
    term: "Model Selection",
    category: "AI 시스템",
    shortDefinition: "작업 요구에 맞춰 AI 모델의 정확도, 지연, 비용을 선택하는 의사결정",
    explanation:
      "Model Selection은 가장 강한 모델을 무조건 고르는 일이 아니라 accuracy target을 먼저 맞추고 latency와 cost를 조정하는 운영 판단입니다. 작업 위험도, evaluation dataset, context window, effort, 가격 단위를 함께 봐야 합니다.",
    related: ["Accuracy Target", "Latency", "Cost"],
  },
  {
    term: "Accuracy Target",
    category: "AI 시스템",
    shortDefinition: "모델이 특정 작업에서 달성해야 하는 최소 정확도 기준",
    explanation:
      "Accuracy Target은 모델 비교를 감으로 하지 않게 만드는 기준입니다. 먼저 성공 기준과 evaluation dataset을 정한 뒤, 그 기준을 만족하는 후보 안에서 비용과 지연을 줄입니다.",
    related: ["Model Selection", "Evaluation", "Hallucination"],
  },
  {
    term: "Latency",
    category: "AI 시스템",
    shortDefinition: "요청 후 응답을 받기까지 사용자가 기다리는 시간",
    explanation:
      "Latency는 모델 품질만큼 사용자 경험에 큰 영향을 줍니다. 같은 모델 안에서도 effort, fast mode, caching, batch 처리 여부에 따라 체감 시간이 달라질 수 있습니다.",
    related: ["Model Selection", "Cost", "Context Caching"],
  },
  {
    term: "Cost",
    category: "AI 시스템",
    shortDefinition: "AI 요청을 처리하는 데 드는 토큰·모델·처리 방식 기반 비용",
    explanation:
      "Cost는 입력 토큰, 출력 토큰, cached input, batch/flex/priority 같은 처리 방식에 따라 달라집니다. 단가만 보지 말고 실패율과 재시도 비용까지 함께 계산해야 합니다.",
    related: ["Model Selection", "Tokenization", "Prompt Caching"],
  },
  {
    term: "Model Tier",
    category: "AI 시스템",
    shortDefinition: "성능, 속도, 가격, 용도에 따라 나뉘는 모델 등급",
    explanation:
      "Model Tier는 flagship, balanced, fast, cost-sensitive처럼 작업 성격에 맞는 선택지를 구분하는 표현입니다. 티어 이름보다 실제 evaluation과 사용 가능 여부가 더 중요합니다.",
    related: ["Model Selection", "Cost", "Latency"],
  },
  {
    term: "Effort",
    category: "AI 시스템",
    shortDefinition: "한 모델 안에서 추론 강도와 비용·지연을 조절하는 축",
    explanation:
      "Effort는 모델 자체를 바꾸기 전에 시도할 수 있는 조절 장치입니다. 더 높은 추론이 필요한 작업과 빠른 응답이 필요한 작업 사이에서 trade-off를 조정합니다.",
    related: ["Model Selection", "Accuracy Target", "Latency"],
  },
] satisfies readonly GlossaryTerm[]
