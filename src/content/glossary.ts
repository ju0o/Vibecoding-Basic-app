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
] satisfies readonly GlossaryTerm[]
