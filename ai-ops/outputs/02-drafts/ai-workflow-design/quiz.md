# 퀴즈 초안: ai-workflow-design

## quiz
question: 반복되는 AI 작업을 Workflow로 설계할 때 가장 적절한 설명은 무엇인가요?
options:
  - 모델이 매번 다음 행동을 자유롭게 정하게 하면 항상 더 안정적이다
  - 사람이 실행 경로와 품질 게이트를 정해 LLM과 도구가 그 흐름을 따르게 한다
  - AI가 생성한 transcript가 길면 outcome 검증은 생략해도 된다
answer: 사람이 실행 경로와 품질 게이트를 정해 LLM과 도구가 그 흐름을 따르게 한다
explanation: KB는 workflow를 미리 정의된 코드 경로로 LLM과 도구를 조정하는 방식으로 설명합니다. 또한 agent eval에서는 transcript와 outcome, grader를 구분해야 하므로 긴 실행 기록만으로 성공을 판단하면 안 됩니다.

## explanationPrompt
prompt: "이 작업은 Agent로 만들면 되지 왜 Workflow가 필요하죠?"라고 묻는 동료에게 설명해보세요.
guide:
  - Workflow는 미리 정의된 경로, Agent는 모델 주도 경로라고 구분하기
  - 반복 작업에서는 예측 가능성이 중요하다고 말하기
  - 단계 분해와 품질 게이트 예시 들기
  - 복잡도를 늘리기 전에 단순한 해결책을 먼저 검토한다는 점으로 마무리하기

