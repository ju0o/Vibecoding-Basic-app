## 한 줄 정의

Chat Coding은 IDE나 개발 도구 안의 chat interface를 사용해 코드 설명, 오류 해석, 구현 방향, 테스트 아이디어를 대화형으로 요청하고 검토하는 AI 코딩 방식입니다. 자동완성이 현재 커서 주변의 다음 줄을 제안한다면, chat coding은 개발자가 질문을 만들고 AI가 code, explanation, step-by-step guidance 형태의 답을 제시하는 표면입니다. ==Chat Coding의 핵심은 AI가 정답을 말해준다는 믿음이 아니라, 질문과 맥락을 통해 이해·디버깅·검증을 빠르게 반복하는 방식==입니다.

이 강의는 “챗봇에게 코드 물어보기”보다 좁고 실무적인 개념을 다룹니다. GitHub Copilot Chat 문서는 Copilot Chat을 coding-related questions를 묻고 답을 받는 chat interface로 설명합니다. 여기서 중요한 단어는 coding-related입니다. 일반 지식 대화가 아니라 현재 코드, 오류 메시지, 열려 있는 파일, active repository, chat history 같은 개발 맥락을 중심으로 움직이는 대화입니다.

초보자에게 chat coding은 자동완성보다 더 친절하게 느껴질 수 있습니다. 왜냐하면 코드를 직접 입력하지 않아도 “이 오류가 무슨 뜻인가요?”, “이 함수가 무엇을 하나요?”, “이 테스트 실패를 어떻게 좁히나요?”라고 물을 수 있기 때문입니다. 하지만 친절함이 곧 정확성은 아닙니다. KB가 강조하듯 Copilot Chat의 답변은 human review가 필요한 AI-generated output입니다.

그래서 이 강의의 목표는 chat coding을 많이 쓰는 법이 아니라, 잘 쓰는 법입니다. 질문을 어떻게 구성해야 맥락이 선명해지는지, 답변을 어떤 단위로 받아들여야 하는지, 언제 chat에서 agent로 넘어가는지, 그리고 왜 매번 diff와 test로 돌아와야 하는지를 순서대로 봅니다.

![Chat Coding 검증 루프](/lesson-diagrams/chat-coding-era/chat-coding-loop.svg)

## 왜 존재하는가

자동완성 시대의 도구는 typing flow 안에서 강력했습니다. 함수 이름, 타입, 주석, 주변 패턴을 보고 다음 줄이나 블록을 제안합니다. 그러나 개발자가 항상 “다음 줄”만 필요한 것은 아닙니다. 실제 개발에서는 낯선 파일을 읽어야 하고, 실패한 테스트 메시지를 해석해야 하고, 라이브러리 API가 왜 이렇게 생겼는지 이해해야 하며, 수정 후보가 여러 개일 때 어떤 방향이 안전한지 비교해야 합니다.

자동완성만 있던 시절에는 이런 작업의 연결을 사람이 직접 했습니다. 검색하고, 문서를 열고, 오류 메시지를 복사하고, 관련 코드를 읽고, 가설을 세우고, 다시 실행했습니다. 이 과정은 개발의 핵심이지만 초보자에게는 너무 많은 문맥 전환을 요구합니다. Chat coding은 이 중 “질문을 만들고 답변을 받아 사고를 좁히는 단계”를 IDE 안으로 가져옵니다.

GitHub Docs가 Copilot Chat을 chat interface로 설명하는 이유도 여기에 있습니다. 개발자는 자연어로 문제를 설명하고, 도구는 code, explanations, step-by-step guidance 같은 형태로 응답합니다. 이 응답은 해결책 자체라기보다 다음 행동을 정리하는 초안입니다. ==Chat coding은 구현을 대신하는 버튼이 아니라, 개발자가 문제를 언어화하고 검증 가능한 다음 단위로 쪼개게 돕는 장치==입니다.

왜 이것이 AI 시대에 중요할까요? 바이브코딩은 “느낌으로 AI에게 맡기는 개발”로 오해되기 쉽지만, 실제로는 요구사항, 코드, 실행 결과, 검증 조건을 계속 주고받는 작업입니다. Chat coding은 이 대화 루프의 가장 낮은 진입점입니다. 초보자는 여기서 오류 설명을 배우고, 중급자는 리팩터링 방향을 비교하며, 팀은 AI 답변을 검토 가능한 작업 단위로 바꿀 수 있습니다.

하지만 chat coding이 생기면서 새로운 위험도 생겼습니다. 답변이 문장 형태로 자연스럽기 때문에 사실처럼 보입니다. 모델이 맥락을 사용한다고 해도 모든 파일, 모든 정책, 최신 요구사항을 완전히 이해한다는 보장은 없습니다. 그래서 chat coding의 등장은 동시에 검증 습관의 필요성을 키웠습니다.

## 작동 원리

### 1. 사용자가 문제를 질문 가능한 단위로 만든다

Chat coding의 첫 단계는 AI가 아니라 사람에게 있습니다. “이거 고쳐줘”라고만 쓰면 모델은 무엇이 문제인지, 어디까지 바꿔도 되는지, 어떤 결과가 성공인지 추론해야 합니다. 반대로 오류 메시지, 관련 코드 범위, 기대 동작, 이미 실행한 명령을 함께 주면 답변은 더 검증 가능한 방향으로 좁혀집니다.

예를 들어 테스트 실패를 다룰 때 좋은 질문은 “왜 실패해?”가 아닙니다. “이 테스트 실패 메시지를 기준으로 가능한 원인 3가지를 나누고, 각 원인을 확인할 명령 또는 코드 위치를 제안해 달라”에 가깝습니다. 이렇게 묻는 순간 chat 답변은 정답 선언이 아니라 debugging conversation의 시작점이 됩니다. ==좋은 chat prompt는 답을 요구하기 전에 확인 가능한 가설의 모양을 요구합니다==.

이 단계에서 중요한 것은 맥락의 양보다 관련성입니다. Copilot Chat은 contextual information을 활용할 수 있지만, 관련 없는 파일과 로그를 많이 넣는 것이 항상 좋은 것은 아닙니다. 오래된 로그, 무관한 파일, 불완전한 요구사항이 섞이면 답변은 더 그럴듯하지만 덜 정확해질 수 있습니다. 필요한 파일, active repository 상태, chat history의 전제를 의식적으로 관리해야 합니다.

### 2. Chat interface는 답변을 설명·절차·수정 후보로 만든다

GitHub KB는 Copilot Chat이 code, explanations, step-by-step guidance를 제공할 수 있다고 정리합니다. 이 세 가지는 같은 답변 안에 섞일 수 있지만, 실무에서는 분리해서 읽는 것이 좋습니다. Explanation은 “왜 그런가”를 설명하고, guidance는 “무엇을 어떤 순서로 확인할까”를 제시하며, code는 “수정 후보”를 제안합니다.

초보자가 자주 실수하는 지점은 이 세 가지를 모두 같은 신뢰도로 받아들이는 것입니다. 설명은 개념 이해를 돕지만 원문이나 코드와 대조해야 합니다. 절차는 실행해 볼 수 있지만 프로젝트 환경에 맞는지 확인해야 합니다. 코드 후보는 diff와 test 없이는 완료가 아닙니다. Chat coding의 답변은 한 덩어리가 아니라 검증 강도가 다른 여러 산출물의 묶음입니다.

### 3. Follow-up question과 session history가 대화를 이어간다

Chat coding이 자동완성과 다른 지점은 후속 질문입니다. 자동완성 제안은 대개 현재 위치에서 받아들이거나 거절합니다. Chat에서는 “그 설명을 더 짧게”, “두 번째 가설만 확인”, “이 파일 기준으로 다시 설명”, “테스트를 먼저 만들면 어떻게 되나”처럼 대화를 좁힐 수 있습니다. 이때 chat session history가 이전 질문과 답변을 맥락으로 남깁니다.

이 기능은 강력하지만 위험도 있습니다. 이전 답변에 잘못된 전제가 들어가면 후속 답변도 그 전제를 이어받을 수 있습니다. 따라서 대화가 길어질수록 중간에 현재 사실을 다시 고정해야 합니다. “지금 확정된 사실은 테스트 A가 실패한다는 것, 파일 B의 함수 C가 관련 있다는 것뿐이다. 나머지는 가설로 유지하라”처럼 상태를 정리하면 대화가 덜 미끄러집니다.

### 4. Context-aware response는 현재 작업에 가까워지지만 자동 검증은 아니다

Copilot Chat KB는 context-aware responses를 핵심 개념으로 둡니다. 열려 있는 파일, active repository, chat history 같은 정보가 답변에 반영될 수 있다는 뜻입니다. 이것은 일반 LLM 대화와 비교해 큰 차이입니다. 모델이 현재 프로젝트와 더 가까운 답을 만들 수 있기 때문입니다.

그러나 context-aware라는 말은 correct라는 뜻이 아닙니다. 맥락은 답변의 재료이지 보증서가 아닙니다. 현재 열려 있지 않은 파일, 숨은 요구사항, 팀의 보안 정책, 최신 CI 실패, 배포 환경의 설정은 빠질 수 있습니다. 그래서 chat 답변이 “프로젝트를 본 것처럼” 말하더라도 개발자는 실제 파일과 실행 결과로 돌아와야 합니다.

### 5. Chat에서 agent로 넘어가는 경계가 생긴다

Chat coding은 질문과 설명에 중심을 두지만, 최신 도구에서는 agent mode와 연결됩니다. KB의 Quote Bank에는 agent가 autonomously plans multi-step tasks라는 인용이 들어 있습니다. 이것은 chat surface가 단일 질문 답변을 넘어 tool invocation, multi-step task planning으로 확장될 수 있음을 보여줍니다.

여기서 경계를 알아야 합니다. “이 오류의 가능한 원인을 설명해 달라”는 chat coding입니다. “관련 파일을 조사하고 수정하고 테스트를 실행해 diff를 제출하라”는 agent workflow에 가깝습니다. 후자는 파일 쓰기와 command execution 권한을 포함하므로 permissions, sandbox, review boundary가 필요합니다. Chat은 생각을 정리하는 표면이고, agent는 행동을 수행하는 표면입니다.

```ts
type ChatAnswerPart = "explanation" | "procedure" | "code_candidate"

type ReviewAction = {
  part: ChatAnswerPart
  nextStep: string
  verification: "source-check" | "run-command" | "diff-review" | "test"
}

export function planChatAnswerReview(part: ChatAnswerPart): ReviewAction {
  if (part === "explanation") {
    return {
      part,
      nextStep: "원문, 현재 코드, 오류 메시지와 설명이 직접 맞는지 확인한다.",
      verification: "source-check",
    }
  }

  if (part === "procedure") {
    return {
      part,
      nextStep: "제안된 확인 절차를 하나씩 실행하고 결과를 대화에 다시 넣는다.",
      verification: "run-command",
    }
  }

  return {
    part,
    nextStep: "코드 후보는 작은 diff로 적용한 뒤 테스트와 리뷰를 통과시킨다.",
    verification: "test",
  }
}
```

이 예시는 chat 답변을 한 번에 믿지 않고 산출물 종류별로 다른 검증 행동에 연결합니다. 실제 프로젝트에서도 같은 사고방식이 필요합니다. 설명은 근거와 대조하고, 절차는 실행 결과로 확인하며, 코드 후보는 diff와 test로 검증합니다.

## 스펙과 세부

### Chat interface의 입력은 질문만이 아니다

Chat coding에서 입력은 사용자가 타이핑한 문장만이 아닙니다. KB는 Copilot Chat이 open files, active repository, chat history 같은 contextual information을 활용할 수 있다고 정리합니다. 따라서 질문을 잘 쓰는 것만큼 중요한 것은 어떤 맥락이 들어가고 있는지 이해하는 일입니다. 열려 있는 파일이 문제와 무관하면 답변이 빗나갈 수 있고, active repository의 구조를 잘못 추정하면 수정 방향도 흐려질 수 있습니다.

초보자는 “AI가 내 프로젝트를 다 알고 있다”고 생각하기 쉽습니다. 그러나 도구가 제공하는 맥락은 제품과 설정에 따라 다르며, 모델이 그 맥락을 완전히 정확하게 사용할 것이라는 보장은 없습니다. 그래서 중요한 질문일수록 파일 경로, 함수 이름, 실패 메시지, 실행 명령을 명시적으로 적는 것이 안전합니다.

### 답변 종류마다 신뢰 경계가 다르다

Chat 답변은 code, explanations, step-by-step guidance 형태로 올 수 있습니다. 설명은 개념적 이해를 돕는 데 유용하지만, 공식 문서와 현재 코드에 맞는지 확인해야 합니다. 절차는 실행 가능한 순서를 제공하지만, 프로젝트의 package manager나 script 이름과 맞는지 확인해야 합니다. 코드 후보는 가장 위험합니다. 실제 repository를 바꾸는 순간부터는 chat이 아니라 code review의 영역입니다.

이 구분은 교육적으로도 중요합니다. 초보자는 설명을 통해 개념을 배우고, guidance를 통해 디버깅 순서를 배우며, code candidate를 통해 패턴을 볼 수 있습니다. 하지만 세 가지를 모두 “정답”으로 받아들이면 학습이 멈춥니다. 답변을 분해해 읽을수록 AI가 어디서 도움을 주고 어디서 사람이 판단해야 하는지 보입니다.

### Context-aware는 context engineering의 작은 실습이다

Context-aware response는 큰 AI 시스템 설계에서 말하는 context engineering의 작은 버전입니다. 현재 질문에 어떤 파일, 어떤 오류, 어떤 이전 답변을 넣을지 결정하는 일입니다. 맥락이 너무 적으면 모델은 일반론으로 답하고, 너무 많거나 오래되면 잘못된 전제를 따라갈 수 있습니다. 따라서 chat coding에서는 “필요한 맥락만 주고, 답변 후 사실을 갱신하는 루틴”이 중요합니다.

### Human review는 선택 사항이 아니라 기본 경계다

KB는 GitHub responsible use 문서가 AI-generated output에 대한 human review를 강조한다고 정리합니다. 이 말은 chat coding의 운영 원칙입니다. 답변이 친절하고 구체적이어도 사람이 읽고, 실행하고, 검증해야 합니다. 특히 보안, 인증, 삭제, 결제, 데이터베이스 변경, 배포처럼 실패 비용이 큰 영역에서는 chat 답변을 바로 적용하지 않습니다.

### Agent mode와의 연결은 권한 변화다

Chat에서 agent로 넘어가면 대화의 성격이 바뀝니다. Chat은 답변을 제안하지만, agent mode는 도구 호출과 multi-step task planning으로 확장될 수 있습니다. 이것은 편의성의 변화가 아니라 권한의 변화입니다. 파일을 수정하고 command를 실행할 수 있다면 sandbox, permission, approval, stop condition이 필요합니다. Chat coding을 이해해야 agent를 안전하게 쓸 수 있는 이유가 바로 여기에 있습니다.

## 원문으로 읽기

> "coding-related questions"
>
> — 코딩과 관련된 질문.
> [GitHub Docs — Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

이 짧은 문장은 chat coding의 범위를 정합니다. Copilot Chat은 아무 주제나 말하는 일반 대화가 아니라 개발자가 코드와 관련해 묻는 질문을 중심으로 설계된 표면입니다. 그래서 질문에는 코드 위치, 오류 메시지, 기대 동작 같은 개발 맥락이 들어가야 합니다.

> "Conversational coding assistance"
>
> — 대화형 코딩 보조.
> [GitHub Docs — Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

Conversational이라는 단어는 한 번의 답변보다 이어지는 대화가 중요하다는 뜻입니다. follow-up question을 통해 가설을 줄이고, 이전 답변의 전제를 다시 확인하고, 실행 결과를 되돌려 줄 수 있습니다. 하지만 대화가 길어질수록 잘못된 전제도 남을 수 있으므로 session history를 의식적으로 정리해야 합니다.

> "Context-aware responses"
>
> — 맥락을 고려한 응답.
> [GitHub Docs — Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

이 문장은 chat coding이 현재 작업 맥락과 연결될 수 있음을 보여줍니다. 열려 있는 파일이나 active repository 같은 정보가 답변에 영향을 줄 수 있습니다. 다만 맥락을 고려한다는 말은 맥락을 완벽히 이해한다는 뜻이 아닙니다. 답변은 여전히 현재 코드와 test로 검증해야 합니다.

관련 원문(링크): [GitHub Docs — Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

Chat coding에서 가장 중요한 안전 문장입니다. AI가 만든 설명, 절차, 코드 후보는 모두 검토 대상입니다. 특히 코드 후보는 repository에 들어오는 순간 팀의 코드가 되므로, 사람이 diff를 읽고 test를 실행해야 합니다.

관련 원문(링크): [GitHub Docs — Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

이 인용은 chat과 agent의 경계를 보여줍니다. chat coding은 질문과 설명을 중심으로 하지만, agent mode는 여러 단계를 계획하고 tool invocation으로 이어질 수 있습니다. 즉 같은 자연어 입력이라도 도구 표면이 달라지면 권한과 검증 경계도 달라집니다.

## 실전에서

### 오류 해석 대화

가장 안전한 시작점은 오류 해석입니다. 테스트 실패 메시지, 관련 파일, 최근 변경 내용을 제공하고 “가능한 원인, 확인 순서, 수정 시 주의할 edge case”를 요청합니다. 이때 답변을 바로 수정으로 옮기지 말고 먼저 가설별 확인 명령을 실행합니다. 실행 결과가 나오면 다시 chat에 넣어 가설을 좁힙니다.

좋은 질문 예시는 다음과 같습니다.

```text
이 테스트 실패를 원인 가설 3개로 나누어 설명해 주세요.
각 가설마다 확인할 파일 위치와 실행할 명령을 제안해 주세요.
아직 코드를 고치지 말고, 검증 순서만 작성해 주세요.
```

이 질문은 AI가 곧바로 코드를 만들지 않게 하고, debugging conversation을 확인 가능한 단계로 제한합니다. 초보자에게는 이 방식이 특히 좋습니다. 답변을 통해 오류 원인을 배우면서도, 실제 판단은 명령 결과와 코드 읽기로 되돌아오기 때문입니다.

### 낯선 코드 설명

두 번째 사용법은 코드 설명입니다. 낯선 함수나 파일을 선택하고 입력, 출력, side effect, 의존성을 설명하게 합니다. 단, 설명을 사실로 확정하기 전에 파일을 직접 읽어야 합니다. Chat은 이해를 빠르게 시작하게 해주지만, 이름이 비슷한 함수나 숨은 side effect를 놓칠 수 있습니다.

### 수정 후보 만들기

세 번째는 작은 수정 후보입니다. “이 컴포넌트의 empty state를 추가할 후보를 제안하라”처럼 범위를 좁히고, 변경 파일과 검증 명령을 함께 요구합니다. 이때 chat 답변은 patch가 아니라 후보입니다. 실제 반영 전에는 diff를 작게 만들고, test와 typecheck를 실행합니다.

### 설명 연습으로 되돌리기

이 사이트의 목표는 사용자가 다른 사람에게 설명할 수 있을 정도로 이해하는 것입니다. Chat coding을 학습 도구로 쓰려면 AI 답변을 받은 뒤 “내 말로 다시 설명하기”를 해야 합니다. 답변의 핵심을 세 문장으로 요약하고, 어떤 근거로 확신하는지, 어떤 부분은 아직 가설인지 분리해 보세요. 설명이 막히는 부분은 아직 내 이해가 아닙니다.

## 한계와 트레이드오프

첫 번째 한계는 자연스러운 문장이 정확한 문장처럼 보인다는 점입니다. Chat 답변은 자신감 있게 보일 수 있지만, 현재 프로젝트의 숨은 조건이나 최신 상태를 놓칠 수 있습니다. 특히 오류 메시지의 일부만 제공하면 모델은 빠진 정보를 추론합니다.

두 번째 한계는 맥락 오염입니다. Session history는 편리하지만, 잘못된 전제가 오래 남을 수 있습니다. 대화가 길어지면 “지금 확정된 사실”과 “아직 가설”을 다시 정리해야 합니다. 그렇지 않으면 AI와 사람이 함께 같은 착각을 반복할 수 있습니다.

세 번째 한계는 agent와의 혼동입니다. Chat 답변을 받는 것과 agent가 repository를 수정하는 것은 다릅니다. 후자는 파일 쓰기와 command 실행이 들어갈 수 있으므로 permission과 sandbox가 필요합니다. Chat에서 시작한 요청이 multi-step task로 커지면 작업을 쪼개거나 agent workflow로 명시적으로 전환해야 합니다.

네 번째 trade-off는 학습 속도와 이해 깊이입니다. Chat은 초보자가 빠르게 설명을 얻도록 도와주지만, 답변을 그대로 받아들이면 개념 학습이 얕아집니다. 좋은 학습자는 chat을 “정답지”가 아니라 “질문을 더 잘 만들고 검증을 설계하는 동료”로 사용합니다.

## 더 읽기

이 강의의 근거 KB는 `chat-coding-era`입니다. 먼저 GitHub Docs의 Responsible use of GitHub Copilot Chat을 읽어 chat interface, context-aware responses, human review 원칙을 확인하세요. 이어서 GitHub Copilot features 문서를 읽으면 inline suggestions, chat, agent가 하나의 제품 안에서 서로 다른 surface로 구분된다는 점을 볼 수 있습니다.

다음 강의는 `ide-agent-era`입니다. Chat coding이 질문과 설명을 중심으로 움직인다면, IDE agent는 tool invocation, 파일 수정, command 실행, diff 제출로 확장됩니다. 이 경계를 이해해야 “AI에게 물어보기”와 “AI에게 작업 맡기기”를 안전하게 구분할 수 있습니다.
