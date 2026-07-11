---
id: prompt-implementation-loop
title: "프롬프트 구현 루프 (Prompt to Implementation Loop)"
topicGroup: T12
status: approved
score: 90
level: 중급
prerequisites: [requirement-task-breakdown, prompt-engineering]
successors: [ai-assisted-testing-loop]
related: [agent-loop, human-ai-collaboration-patterns, ai-learning-verification]
consumers:
  lessons: [prompt-to-implementation-loop]
  glossary: [Implementation Loop, Follow-up Prompt, Repository Instruction, Verification Feedback]
sources:
  - { title: "GitHub Docs — Prompt engineering for GitHub Copilot Chat", url: "https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering", checked: 2026-07-12 }
  - { title: "GitHub Docs — Asking GitHub Copilot questions in your IDE", url: "https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide", checked: 2026-07-12 }
  - { title: "GitHub Docs — Adding repository custom instructions for GitHub Copilot", url: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions", checked: 2026-07-12 }
  - { title: "GitHub Docs — Get the best results from Copilot cloud agent", url: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results", checked: 2026-07-12 }
  - { title: "Cursor Docs — Cloud Agents", url: "https://cursor.com/docs/cloud-agent", checked: 2026-07-12 }
updated: 2026-07-12
---

## 정의
프롬프트 구현 루프는 요구사항을 prompt로 전달하고, AI가 만든 구현 후보를 실행·검증·피드백으로 다시 prompt에 반영하는 반복 절차다. GitHub Copilot Chat 문서는 응답을 평가하고 필요하면 follow-up request를 하라고 설명하며, cloud agent 문서는 agent가 build, test, validate할 수 있는 repository guidance가 필요하다고 설명한다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 역사
초기 AI 코딩은 한 번의 prompt와 한 번의 답변 중심이었다. Copilot Chat과 cloud agent 문서는 prompt, repository instructions, build/test/validate, follow-up feedback을 연결하는 방향으로 확장되었다. Cursor Cloud Agents도 cloud VM에서 build, test, changed software interaction을 수행할 수 있다고 설명한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, https://cursor.com/docs/cloud-agent, 확인: 2026-07-12)

## 해결하려는 문제
한 번의 prompt만으로는 요구사항 누락, context 부족, test 실패, style mismatch를 모두 처리하기 어렵다. 루프는 general goal, specific requirements, repository instructions, generated change, verify result, follow-up prompt를 연결해 실패 정보를 다음 시도에 반영한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions, 확인: 2026-07-12)

## 핵심 개념
1. **Prompt contract**: GitHub prompt engineering은 broad description 뒤에 specific requirements를 적는 구조를 제시한다. 구현 루프의 첫 입력은 이 계약이다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
2. **Repository instructions**: Custom instructions는 Copilot에게 project 이해와 build, test, validate 방법에 대한 additional context를 제공한다. (출처: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions, 확인: 2026-07-12)
3. **Implementation attempt**: Chat은 code suggestions, unit test generation, code fixes를 제공할 수 있고, cloud agent는 repository task를 수행할 수 있다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)
4. **Verification result**: Cloud agent가 own development environment에서 build, test, validate할 수 있으면 good pull requests를 만들 가능성이 높다고 GitHub가 설명한다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)
5. **Follow-up feedback**: Copilot Chat 문서는 response를 evaluate하고 follow-up prompt를 제출하라고 설명한다. 실패한 test와 review comment는 다음 prompt의 입력이다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, 확인: 2026-07-12)

## 관련 기술
- Agent loop: prompt, action, observation, correction이 반복되는 구조와 연결된다. (출처: https://cursor.com/docs/cloud-agent, 확인: 2026-07-12)
- Requirement-task breakdown: 루프의 prompt는 분해된 task와 acceptance criteria에서 출발한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
- AI-assisted testing loop: verify result를 test로 남기고 다음 구현에 반영한다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 선행 개념
- requirement-task-breakdown: task가 너무 크면 루프마다 무엇을 검증해야 하는지 흐려진다.
- prompt-engineering: 목표, 맥락, 요구사항, 출력 형식을 prompt로 구성하는 기본 원리를 알아야 한다.

## 후행 개념
- ai-assisted-testing-loop: 구현 루프의 검증 단계를 테스트 생성, 실행, 수정 반복으로 확장한다.
- reviewing-ai-output: AI가 만든 변경을 diff와 근거로 검토하는 단계로 이어진다.

## AI 시대에서의 의미
바이브코딩에서 prompt는 명령 한 줄이 아니라 구현 루프의 첫 상태다. GitHub 문서가 response 평가와 follow-up request를 안내하고, cloud agent 문서가 build/test/validate guidance를 강조하는 이유는 AI 구현이 반복 검증을 통해 안정화되기 때문이다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 실무 활용
1. **Prompt 작성**: "무엇을 만들지"와 "구체 조건"을 분리해 적는다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
2. **Repository guidance 연결**: `.github/copilot-instructions.md` 같은 파일에 build/test/validate 방법을 둔다. (출처: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions, 확인: 2026-07-12)
3. **검증 결과를 다음 prompt로 반영**: 실패한 test, typecheck error, review comment를 그대로 다음 요청에 넣어 수정 범위를 좁힌다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, 확인: 2026-07-12)

```text
Prompt → 구현 후보 → npm run test/build → 실패 로그 → follow-up prompt → 수정 → review
```

## FAQ
Q: 한 번에 완벽한 prompt를 쓰는 것이 목표인가?
A: 아니다. GitHub Copilot Chat 문서는 응답을 평가하고 follow-up request를 하라고 설명한다. 루프는 반복을 전제로 한다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, 확인: 2026-07-12)

Q: Custom instructions는 prompt를 대체하는가?
A: 아니다. Custom instructions는 repository-specific guidance를 제공하고, task prompt는 현재 목표와 요구사항을 전달한다. (출처: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions, 확인: 2026-07-12)

Q: Agent가 test를 돌리면 사람 검토가 없어도 되는가?
A: 아니다. Build/test/validate는 중요하지만, 결과를 사람이 읽고 요구사항과 맞는지 확인해야 한다. (출처: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results, 확인: 2026-07-12)

## 자주 하는 실수
1. **Prompt에 성공 기준 없음**: broad goal만 주고 specific requirements를 쓰지 않는다. 요구사항과 error condition을 분리한다. (출처: https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering, 확인: 2026-07-12)
2. **검증 결과를 요약 없이 버림**: 실패 로그를 다음 prompt에 넣지 않아 같은 오류가 반복된다. Response 평가와 follow-up을 루프 규칙으로 둔다. (출처: https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide, 확인: 2026-07-12)
3. **프로젝트 규칙을 매번 손으로 설명**: build/test/validate 방법을 repository custom instructions로 저장하지 않는다. (출처: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions, 확인: 2026-07-12)

## 공식 출처
- Prompt goal and requirements — [GitHub Docs — Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) (확인 날짜: 2026-07-12)
- Follow-up prompt loop — [GitHub Docs — Asking GitHub Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide) (확인 날짜: 2026-07-12)
- Repository instructions — [GitHub Docs — Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) (확인 날짜: 2026-07-12)
- Build/test/validate guidance — [GitHub Docs — Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) (확인 날짜: 2026-07-12)
- Cloud agent verification environment — [Cursor Docs — Cloud Agents](https://cursor.com/docs/cloud-agent) (확인 날짜: 2026-07-12)

## Quote Bank
- > "first give Copilot a broad description"
  - 출처: [GitHub Docs — Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering) (확인: 2026-07-12)
  - 맥락: prompt의 첫 입력 구조를 설명할 때 사용한다.
- > "Evaluate Copilot's response"
  - 출처: [GitHub Docs — Asking GitHub Copilot questions in your IDE](https://docs.github.com/en/copilot/how-tos/chat-with-copilot/chat-in-ide) (확인: 2026-07-12)
  - 맥락: AI 응답을 검토하고 다음 요청으로 이어가는 루프를 설명할 때 사용한다.
- > "additional context on how to understand your project"
  - 출처: [GitHub Docs — Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) (확인: 2026-07-12)
  - 맥락: repository instruction의 역할을 설명할 때 사용한다.
- > "build, test and validate its changes"
  - 출처: [GitHub Docs — Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) (확인: 2026-07-12)
  - 맥락: 구현 루프의 검증 단계를 설명할 때 사용한다.
- > "build, test, and interact with the changed software"
  - 출처: [Cursor Docs — Cloud Agents](https://cursor.com/docs/cloud-agent) (확인: 2026-07-12)
  - 맥락: cloud agent가 자체 환경에서 변경을 확인할 수 있음을 설명할 때 사용한다.

## 변경 이력
- 2026-07-12: 최초 작성 (Codex, P-01)
