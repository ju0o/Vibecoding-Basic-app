# 퀴즈 초안: agent-loop-anatomy

## quiz
question: Agent Loop를 가장 정확하게 설명한 것은 무엇인가요?
options:
  - 모델이 한 번 답변을 생성하면 작업이 끝나는 구조이다
  - 모델이 상태를 평가하고 도구를 호출한 뒤 결과를 받아 다시 판단하는 반복 실행 구조이다
  - 도구 이름과 입력값을 사람이 직접 코드로만 작성하므로 모델 판단은 필요 없는 구조이다
answer: 모델이 상태를 평가하고 도구를 호출한 뒤 결과를 받아 다시 판단하는 반복 실행 구조이다
explanation: KB는 Agent Loop를 프롬프트 평가, 도구 호출, 결과 수신, 반복, 최종 결과 반환으로 설명합니다. 단일 답변과 다르며, Tool Calling은 루프 안에서 쓰이는 한 행동 단위입니다.

## explanationPrompt
prompt: "Agent Loop는 그냥 while 반복문 아닌가요?"라고 묻는 동료에게 설명해보세요.
guide:
  - 루프가 모델 판단, 도구 호출, 결과 반영을 포함한다고 말하기
  - 한 turn이 모델 출력과 도구 결과의 왕복이라고 설명하기
  - Tool Calling과 Agent Loop의 차이를 구분하기
  - max_turns, budget, 권한 제한이 필요한 이유로 마무리하기

