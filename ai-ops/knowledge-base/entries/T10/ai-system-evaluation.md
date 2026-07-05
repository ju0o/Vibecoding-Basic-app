---
id: ai-system-evaluation
title: "AI System Evaluation (AI 시스템 평가)"
topicGroup: T10
status: approved
score: 90
level: 중급
prerequisites: [agent-loop, harness]
successors: []
related: [loop-engineering, harness, orchestration]
consumers:
  lessons: [ai-system-evaluation]
  glossary: [AI System Evaluation, Success Criteria, Trace Grading, Grader, Eval Run]
sources:
  - { title: "Evaluate agent workflows", url: "https://developers.openai.com/api/docs/guides/agent-evals", checked: 2026-07-05 }
  - { title: "Working with evals", url: "https://developers.openai.com/api/docs/guides/evals", checked: 2026-07-05 }
  - { title: "Evaluation best practices", url: "https://developers.openai.com/api/docs/guides/evaluation-best-practices", checked: 2026-07-05 }
  - { title: "Trace grading", url: "https://developers.openai.com/api/docs/guides/trace-grading", checked: 2026-07-05 }
  - { title: "Define success criteria and build evaluations", url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests", checked: 2026-07-05 }
  - { title: "Demystifying evals for AI agents", url: "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents", checked: 2026-07-05 }
  - { title: "Quantifying infrastructure noise in agentic coding evals", url: "https://www.anthropic.com/engineering/infrastructure-noise", checked: 2026-07-05 }
  - { title: "Writing effective tools for AI agents", url: "https://www.anthropic.com/engineering/writing-tools-for-agents", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
AI System Evaluation은 모델 출력뿐 아니라 도구 사용, trace, 환경 상태, 성공 기준을 함께 측정해 AI 애플리케이션 품질을 판단하는 평가 체계이다. OpenAI는 evaluations를 model outputs가 지정한 style과 content criteria를 만족하는지 테스트하는 방법으로 설명하고, agent workflow에서는 traces, graders, datasets, eval runs를 사용한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evals, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)

## 역사
OpenAI는 2026-07-05 기준 Evals platform을 deprecating 중이며, 기존 evals content는 transition window 동안 제공되고, Evals가 2026-10-31에 read-only가 되며 2026-11-30에 shutdown scheduled라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evals, 확인: 2026-07-05)
Anthropic은 2026년 "Demystifying evals for AI agents"에서 single-turn evals와 multi-turn agent evals를 구분하고, agent eval에서는 tools, task, environment, agent loop, final environment state를 함께 본다고 설명했다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
Anthropic Platform 문서는 LLM application을 만들 때 success criteria를 먼저 정의하고, 그 기준을 측정할 evaluations를 설계하는 cycle이 prompt engineering의 중심이라고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests, 확인: 2026-07-05)

## 해결하려는 문제
Generative AI는 같은 입력에도 다른 출력을 낼 수 있으므로 일반 deterministic test만으로 품질을 설명하기 어렵다. OpenAI Evaluation best practices 문서는 generative AI가 variable하고 nondeterministic이기 때문에 evals가 AI system을 테스트하는 방법이라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)
Agent workflow는 단순 출력보다 복잡하다. OpenAI는 trace가 model calls, tool calls, guardrails, handoffs를 포함한 end-to-end record라고 설명하고, Anthropic은 agentic coding evals에서는 runtime environment가 passive container가 아니라 problem-solving process의 integral component라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05; https://www.anthropic.com/engineering/infrastructure-noise, 확인: 2026-07-05)
AI System Evaluation은 prompt가 좋아 보이는지보다 실제 작업 outcome, tool choice, handoff, safety policy, runtime resources가 기준을 만족했는지 측정한다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 핵심 개념
1. OpenAI는 evals를 style과 content criteria 충족 여부를 테스트하는 방법으로 설명한다. (출처: https://developers.openai.com/api/docs/guides/evals, 확인: 2026-07-05)
2. OpenAI agent workflow evaluation은 traces, graders, datasets, eval runs를 사용해 agent quality를 개선한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
3. Trace는 one run의 model calls, tool calls, guardrails, handoffs를 포함하는 end-to-end record이며, trace grading은 workflow-level issues를 찾는 빠른 방법으로 제시된다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
4. Dataset과 eval run은 repeatability가 필요할 때 사용하며, prompt change, benchmark, larger-scale evaluation에 적합하다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
5. Anthropic은 good success criteria가 specific, measurable, achievable, relevant해야 한다고 설명한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests, 확인: 2026-07-05)
6. Anthropic agent eval 문서는 evaluation harness, trials, transcripts, outcomes, graders를 구분한다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
7. Anthropic infrastructure noise 글은 agentic coding eval에서 CPU, RAM, time limits 같은 runtime resource budgets가 평가 결과에 영향을 줄 수 있다고 설명한다. (출처: https://www.anthropic.com/engineering/infrastructure-noise, 확인: 2026-07-05)
8. Anthropic tool-writing 글은 tool evaluation에서 top-level accuracy뿐 아니라 total runtime, number of tool calls, token consumption, tool errors를 수집하라고 설명한다. (출처: https://www.anthropic.com/engineering/writing-tools-for-agents, 확인: 2026-07-05)

## 관련 기술
- Eval vs Unit Test: unit test는 deterministic code behavior를 검사하고, eval은 variable AI outputs와 agent workflow outcome을 criteria로 측정한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)
- Trace Grading vs Dataset Eval: trace grading은 debugging 중 workflow-level issue를 빠르게 찾고, dataset/eval runs는 repeatable benchmark와 regression tracking에 쓰인다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
- Grader vs Success Criteria: success criteria는 무엇이 좋은지의 기준이고, grader는 그 기준을 출력이나 trace에 적용해 점수화하는 장치다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests, 확인: 2026-07-05; https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
- Evaluation Harness vs Agent Harness: evaluation harness는 task를 실행하고 trial을 기록하고 grader를 적용하는 평가 infrastructure이고, agent harness는 model이 tools와 environment를 사용하도록 만드는 실행 scaffold다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 선행 개념
- agent-loop: agent evaluation은 여러 turn의 model calls와 tool calls가 누적되는 loop를 평가하므로 agent loop 구조가 선행되어야 한다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
- harness: 평가를 재현하려면 tool permissions, environment, traces, outcomes를 제어하는 harness 개념이 필요하다. (출처: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 후행 개념
이 개념 뒤에는 production monitoring, release gate, regression suite, model migration evaluation, agent benchmark design을 다룰 수 있다. OpenAI는 evals가 model upgrade나 prompt change 때 applications가 expectations에 맞는지 이해하는 데 필수라고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evals, 확인: 2026-07-05)

## AI 시대에서의 의미
바이브코딩에서 "AI가 만든 코드가 그럴듯하다"는 품질 기준이 아니다. AI System Evaluation은 테스트 통과, 올바른 도구 선택, 안전 정책 준수, trace의 행동 경로, 최종 환경 상태를 함께 확인하게 만든다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)
AI 엔지니어링에서는 prompt 개선보다 evaluation design이 먼저 올 수 있다. Anthropic은 success criteria를 명확히 정의하고 그것을 측정할 evaluations를 설계하는 cycle을 강조한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests, 확인: 2026-07-05)

## 실무 활용
1. Agent trace review: 도구를 잘못 골랐는지, handoff가 필요한 시점에 일어났는지, instruction이나 safety policy를 어겼는지 trace grading으로 본다. (근거: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
2. Regression eval set: prompt나 model을 바꾸기 전에 representative dataset과 eval runs로 품질 변화를 비교한다. (근거: https://developers.openai.com/api/docs/guides/evals, 확인: 2026-07-05)
3. Agentic coding eval: final answer가 아니라 repo 상태, tests, resource budget, time limit, tool transcript를 함께 기록한다. (근거: https://www.anthropic.com/engineering/infrastructure-noise, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

```ts
type AgentEvalCase = {
  input: string
  successCriteria: string[]
  traceChecks: ["tool-choice", "handoff", "guardrail"]
  outcomeChecks: ["tests-pass", "state-changed", "no-policy-violation"]
  resourceBudget: { maxTurns: number; maxMinutes: number }
}
```

## FAQ
Q: Eval은 테스트와 같은가?
A: 일부 역할은 비슷하지만, OpenAI는 evals를 nondeterministic AI system을 측정하는 구조화된 테스트로 설명한다. 일반 unit test보다 출력 변동, 기준, grader, human judgment를 함께 고려한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05)

Q: Agent eval은 왜 trace를 보는가?
A: OpenAI는 trace가 model calls, tool calls, guardrails, handoffs의 end-to-end record라서 workflow-level issue를 찾는 데 유용하다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)

Q: OpenAI Evals platform은 계속 쓰면 되는가?
A: 2026-07-05 기준 OpenAI 문서는 Evals platform이 2026-10-31 read-only, 2026-11-30 shutdown scheduled라고 설명한다. 새 설계에서는 현재 OpenAI 문서의 agent workflow evaluation, datasets, traces, transition guidance를 확인해야 한다. (출처: https://developers.openai.com/api/docs/guides/evals, 확인: 2026-07-05)

Q: Grader만 있으면 충분한가?
A: 아니다. OpenAI는 eval score만으로 충분하지 않고 metrics와 human judgment를 결합해야 한다고 설명한다. Anthropic은 agent eval에서 outcome과 transcript를 구분해야 한다고 설명한다. (출처: https://developers.openai.com/api/docs/guides/evaluation-best-practices, 확인: 2026-07-05; https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: 모델 출력 텍스트만 평가한다. 왜 생기나: 챗봇 답변 평가 습관을 agent workflow에도 적용한다. 교정: trace, tool calls, handoffs, final environment outcome을 함께 평가한다. (출처: https://developers.openai.com/api/docs/guides/agent-evals, 확인: 2026-07-05)
2. 실수: success criteria를 "좋은 답변"처럼 모호하게 둔다. 왜 생기나: 품질을 사람이 보면 알 수 있다고 생각한다. 교정: Anthropic 기준처럼 specific, measurable, achievable, relevant하게 작성한다. (출처: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests, 확인: 2026-07-05)
3. 실수: evaluation environment를 기록하지 않는다. 왜 생기나: runtime을 단순 컨테이너로 본다. 교정: Anthropic infrastructure noise 글처럼 runtime resources와 limits가 agentic coding eval 결과에 영향을 줄 수 있음을 기록한다. (출처: https://www.anthropic.com/engineering/infrastructure-noise, 확인: 2026-07-05)
4. 실수: eval set에 맞춰 prompt를 과적합한다. 왜 생기나: 점수 상승만 최적화한다. 교정: held-out tasks, human review, regression tracking을 조합한다. (출처: https://www.anthropic.com/engineering/writing-tools-for-agents, 확인: 2026-07-05)

## 공식 출처
- Agent workflow evaluation은 traces, graders, datasets, eval runs로 agent quality를 개선한다 — [Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals) (확인: 2026-07-05)
- Evals는 model outputs가 지정 기준을 만족하는지 테스트하며, OpenAI Evals platform은 2026년 read-only와 shutdown 일정이 공지되어 있다 — [Working with evals](https://developers.openai.com/api/docs/guides/evals) (확인: 2026-07-05)
- Generative AI의 variability 때문에 traditional software testing만으로는 AI architecture를 충분히 테스트하기 어렵다 — [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) (확인: 2026-07-05)
- Trace grading은 error identification at scale에 유용하다 — [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading) (확인: 2026-07-05)
- Success criteria는 specific, measurable, achievable, relevant해야 한다 — [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) (확인: 2026-07-05)
- Agent eval은 transcript, outcome, grader, evaluation harness를 구분한다 — [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)
- Agentic coding eval에서는 runtime environment와 resource budgets가 결과에 영향을 준다 — [Quantifying infrastructure noise in agentic coding evals](https://www.anthropic.com/engineering/infrastructure-noise) (확인: 2026-07-05)
- Tool evaluation에서는 runtime, tool call count, token consumption, tool errors도 수집할 수 있다 — [Writing effective tools for AI agents](https://www.anthropic.com/engineering/writing-tools-for-agents) (확인: 2026-07-05)

## Quote Bank
- > "Use traces, graders, datasets, and eval runs"
  - 출처: [Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals) (확인: 2026-07-05)
  - 맥락: agent workflow evaluation의 구성요소를 설명할 때 사용.
- > "Writing evals is an essential component"
  - 출처: [Working with evals](https://developers.openai.com/api/docs/guides/evals) (확인: 2026-07-05)
  - 맥락: eval 필요성을 설명할 때 사용.
- > "Generative AI is variable"
  - 출처: [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) (확인: 2026-07-05)
  - 맥락: traditional testing만으로 부족한 이유를 설명할 때 사용.
- > "clearly defining your success criteria"
  - 출처: [Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) (확인: 2026-07-05)
  - 맥락: 평가 설계의 시작점을 설명할 때 사용.
- > "a test for an AI system"
  - 출처: [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) (확인: 2026-07-05)
  - 맥락: eval의 가장 짧은 정의에 사용.
- > "runtime environment doesn't factor"
  - 출처: [Quantifying infrastructure noise in agentic coding evals](https://www.anthropic.com/engineering/infrastructure-noise) (확인: 2026-07-05)
  - 맥락: static benchmark와 agentic coding eval 차이를 설명할 때 사용.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
