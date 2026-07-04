# Fact Check 보고서: from-prompt-to-system

## 판정: PASS (1차 FIX_REQUIRED → FIX 루프 1회 후 재검증 통과)

재검증 (2026-07-03): 항목 #1 수정본 "루프 안에서 자율적으로 도구를 사용하는 LLM" — 원문 "LLMs autonomously using tools in a loop"과 일치 확인. PASS.

---
아래는 1차 검증 원본 기록.

## 1차 판정: FIX_REQUIRED

검증 방식: 브리프의 출처 5개를 2026-07-03 웹에서 직접 확인한 원문과 대조. 코드 예시는 정적 검토.
편차 기록: 교차 Executor 원칙(작성자≠검증자) 미충족 — 파일럿은 단일 세션(Claude). 실제 배치에서는 Codex 교차 검증 필수.

## 검증 항목

| # | 원문 문장 | 판정 | 근거 | 수정안 |
|---|---|---|---|---|
| 1 | "Anthropic은 에이전트를 '도구를 반복 사용하는 LLM'이라고 정의합니다" | **FIX** | 원문: "LLMs autonomously using tools in a loop" — **autonomously(자율적으로)가 정의의 핵심인데 번역에서 탈락** ([출처 1](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)) | "루프 안에서 자율적으로 도구를 사용하는 LLM" |
| 2 | "컨텍스트가 길어질수록 모델이 그 안의 정보를 정확히 기억해내는 능력은 오히려 떨어집니다(context rot)" | PASS | 원문: "as the number of tokens in the context window increases, the model's ability to accurately recall information from that context decreases" (출처 1) | |
| 3 | "MCP는 이 연결을 표준화한 오픈소스 규약", "AI 애플리케이션의 USB-C 포트" | PASS | 원문: "open-source standard for connecting AI applications to external systems", "Think of MCP like a USB-C port for AI applications" ([출처 3](https://modelcontextprotocol.io/)) | |
| 4 | "같은 지시나 체크리스트를 반복해서 붙여넣게 될 때, 그 절차를 파일로 저장해 재사용" | PASS | 원문: "Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat" ([출처 5](https://code.claude.com/docs/en/skills)) | |
| 5 | "진행 경로를 미리 코드로 정해두면 Workflow, AI가 경로와 도구 사용을 스스로 결정하면 Agent" | PASS | 원문: workflows = "orchestrated through predefined code paths" / agents = "dynamically direct their own processes and tool usage" ([출처 2](https://www.anthropic.com/engineering/building-effective-agents)) | |
| 6 | "프롬프트 공식 가이드조차 '성공 기준을 먼저 정의하고 검증 방법을 갖추라'고 시작합니다" | PASS | 원문 전제 조건: "A clear definition of the success criteria... ways to empirically test" ([출처 4](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering/overview)) | |
| 7 | "'단일 LLM 호출 최적화만으로 충분한 경우가 많다'" | PASS | 원문: "optimizing single LLM calls with retrieval and in-context examples is usually enough" (출처 2) | |
| 8 | "가장 단순한 방법에서 시작해 필요할 때만 복잡성을 높이라" | PASS | 원문: "finding the simplest solution possible, and only increasing complexity when needed" (출처 2) | |
| 9 | "성과를 측정하고 반복 개선하는 장치" | PASS | 원문: "measuring performance and iterating on implementations" (출처 2) | |
| 10 | "AI는 대화가 끝나면 기억이 사라집니다" | PASS(주석) | 무상태 세션의 일반 사실. 기초 레벨 단순화로 허용. 메모리 기능이 있는 제품도 있으므로 심화 강의(order 3)에서 보완 예정 | |

## 코드 예시 검증
- TypeScript 정적 검토: `TaskSpec` 타입과 객체 리터럴 문법 유효. `readonly` 배열 필드 표기 일관성 확인 — 이상 없음. (별도 실행 없이 정적 검토 — 순수 타입 예시)

## 퀴즈·용어 검증
- quiz: 사실 주장 없음(본문 근거 판별형) — PASS
- terms: Workflow 정의가 출처 2의 구분과 일치, AI 시스템 설계 정의가 본문 한 줄 정의와 일치 — PASS

## 확인 날짜: 2026-07-03
## FIX 요약: 항목 #1 — 1건. 수정 후 해당 항목만 재검증하면 됨.
