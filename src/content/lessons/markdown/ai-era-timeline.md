## 한 줄 정의

AI 개발 도구 시대 구분은 코드 보조 도구가 IntelliSense식 자동완성, AI pair programming, chat coding, agent workflow로 확장된 흐름을 나누어 이해하는 기준입니다. 이 구분은 “어느 제품이 더 좋은가”를 비교하기 위한 표가 아닙니다. 개발자가 도구에게 어느 정도의 판단과 행동을 맡기고, 그 결과를 어떻게 검증해야 하는지 구분하기 위한 지도입니다.

전통적인 IDE 자동완성은 현재 파일과 언어 서비스 정보를 바탕으로 completion, parameter info, quick info를 제공합니다. GitHub Copilot의 2021년 technical preview는 현재 코드 context를 바탕으로 whole lines나 entire functions를 제안하는 AI pair programmer로 소개되었습니다. 이후 Copilot 문서는 inline suggestion뿐 아니라 coding-related question, chat, cloud agent 같은 surface를 함께 설명합니다. OpenAI Codex 문서는 cloud-based software engineering agent가 repository가 있는 sandbox에서 task를 수행할 수 있다고 설명합니다.

==AI 개발 도구 시대 구분의 핵심은 연도 암기가 아니라 작업 위임 수준의 변화입니다==. 자동완성은 커서 주변 제안에 가깝고, chat은 사람이 질문과 검증을 주도하는 대화형 도구이며, agent는 repository 조사·계획·수정·검토 제안까지 더 긴 작업을 맡을 수 있습니다. 이 차이를 모르면 모든 AI 코딩 도구를 “자동완성”이나 “챗봇”으로만 오해하게 됩니다.

![AI 개발 도구 시대 지도](/lesson-diagrams/ai-era-timeline/ai-era-timeline-map.svg)

## 왜 존재하는가

AI 코딩 도구를 처음 접하면 기능 이름이 섞여 보입니다. 어떤 도구는 줄을 추천하고, 어떤 도구는 코드 질문에 답하고, 어떤 도구는 branch를 만들고 pull request를 제안합니다. 모두 “AI가 코딩을 돕는다”는 말로 묶을 수 있지만, 실제 사용법과 위험도는 다릅니다. 현재 줄 하나를 추천받는 것과, agent에게 여러 파일 변경을 맡기는 것은 같은 검증 절차로 다룰 수 없습니다.

시대 구분이 필요한 이유는 학습 순서를 정하기 위해서입니다. 초보자가 agent부터 쓰면 결과를 검증하기 어려울 수 있습니다. 반대로 자동완성만 익히고 chat이나 agent를 모두 같은 도구로 보면, 긴 오류 분석이나 repository task를 활용하지 못합니다. 좋은 학습 순서는 작은 제안에서 시작해, 설명과 디버깅 대화로 넓히고, 마지막에 제한된 범위의 agent task로 확장하는 것입니다.

또 다른 이유는 팀 운영입니다. 팀은 “AI 도구 사용 가능”이라는 한 줄 정책만으로 충분하지 않습니다. Inline suggestion은 언제 받아들일 수 있는지, chat 답변은 어떤 출처와 테스트가 필요한지, agent가 만든 branch는 누가 review하고 어떤 verify를 통과해야 하는지 정해야 합니다. 도구 surface별로 권한과 검증 강도가 달라야 합니다.

AI 시대 구분은 hype를 줄이는 데도 도움이 됩니다. 새로운 기능이 나올 때마다 “개발자가 필요 없어졌다”거나 “이제 자동완성은 끝났다”라고 말하기 쉽지만, 실제로는 surface가 추가되고 역할이 분화됩니다. IntelliSense도 여전히 유용하고, inline suggestion도 빠른 생산성 도구이며, chat과 agent는 더 큰 작업을 다른 방식으로 보조합니다.

> [!KEY]
> AI 코딩 도구의 발전은 사람을 없애는 일직선이 아니라, 사람이 무엇을 직접 판단하고 무엇을 위임할지 다시 나누는 과정입니다.

## 작동 원리

### 1. IntelliSense 시대는 언어 서비스 기반 보조다

VS Code 문서는 IntelliSense를 code completion, parameter info, quick info, member lists를 포함하는 일반 용어로 설명합니다. 이 시대의 핵심은 언어와 프로젝트 정보를 바탕으로 현재 작성 중인 코드의 가능한 선택지를 보여주는 것입니다. 함수 이름, 속성 목록, 타입 정보, 매개변수 힌트가 대표적입니다.

IntelliSense는 AI라기보다 compiler, language server, type system과 가까운 도구입니다. 장점은 빠르고 예측 가능하다는 점입니다. 이미 정의된 타입과 symbol을 바탕으로 추천하기 때문에, 현재 프로젝트 구조와 강하게 연결됩니다. 한계는 새로운 로직 전체를 상상하거나 긴 요구사항을 해석하는 능력은 제한적이라는 점입니다.

### 2. AI autocomplete 시대는 맥락 기반 코드 제안이다

GitHub Copilot의 2021년 technical preview는 작업 중인 코드 context를 바탕으로 whole lines or entire functions를 제안한다고 소개되었습니다. 이것은 단순 member list와 다릅니다. 모델은 주변 코드, 주석, 함수 이름, 파일 맥락을 보고 다음 코드를 생성합니다. 그래서 반복 boilerplate, test skeleton, 간단한 helper 구현에서 큰 속도를 낼 수 있습니다.

하지만 AI autocomplete는 여전히 커서 주변의 흐름에 강합니다. 개발자가 목표를 정하고, 파일 위치를 고르고, 제안을 받아들일지 판단합니다. 제안이 그럴듯해 보여도 edge case나 보안 조건을 놓칠 수 있습니다. 따라서 자동완성 시대의 핵심 습관은 “제안을 빠르게 받되, diff를 읽고 테스트로 확인하기”입니다.

### 3. Chat coding 시대는 질문과 설명의 표면이다

GitHub Docs는 Copilot으로 coding-related questions를 할 수 있다고 설명합니다. Chat coding은 자동완성과 달리 사용자가 질문을 문장으로 던지고, 모델이 설명, 디버깅 방향, 코드 수정 제안, 파일 이해를 도와주는 방식입니다. 오류 메시지를 붙여 원인을 묻거나, 낯선 코드를 설명하게 하거나, test failure를 해석하게 할 수 있습니다.

Chat의 장점은 대화형 clarification입니다. 사용자는 “왜 이 코드가 깨지지?”, “이 hook은 언제 실행돼?”, “이 API 응답 타입을 어떻게 좁히지?”처럼 현재 이해의 빈칸을 물을 수 있습니다. 한계는 chat이 답변을 해도 실제 repository를 수정하거나 verify를 통과시키는 것은 별도 과정이라는 점입니다. 답변은 가설이고, 검증은 여전히 필요합니다.

### 4. Agent 시대는 더 긴 작업을 맡긴다

GitHub Docs는 Copilot cloud agent가 repository를 조사하고 plan을 만들고 branch에 code changes를 만들 수 있다고 설명합니다. OpenAI Codex 문서는 task가 repository가 preload된 cloud sandbox environment에서 실행된다고 설명합니다. Agent는 단일 답변보다 더 긴 루프를 가집니다. 목표를 받고, repository를 살피고, 계획을 세우고, 파일을 바꾸고, 테스트를 돌리고, 결과를 요약할 수 있습니다.

Agent 시대의 핵심은 권한과 검증입니다. Agent가 여러 파일을 바꿀 수 있다면 diff review, test, build, rollback 계획이 필요합니다. 사람은 “무슨 작업을 맡길지”뿐 아니라 “어디까지 허용할지”, “어떤 stop condition에서 멈출지”, “어떤 산출물을 검토할지”를 정해야 합니다. 자동완성보다 생산성 잠재력은 크지만, 잘못된 변경의 blast radius도 커집니다.

### 5. Surface별로 검증 루틴을 다르게 둔다

자동완성은 한 줄 또는 작은 블록을 diff로 읽고 바로 수정할 수 있습니다. Chat 답변은 공식 문서나 코드 실행으로 확인해야 합니다. Agent 변경은 commit 단위로 보고 테스트와 build 결과를 확인해야 합니다. 같은 “AI 사용”이라도 surface가 다르면 검증 루틴이 달라집니다.

```ts
type AiCodingSurface = "intellisense" | "autocomplete" | "chat" | "agent"

type VerificationPolicy = {
  surface: AiCodingSurface
  humanAction: string
  minimumCheck: string
}

const policies: VerificationPolicy[] = [
  {
    surface: "autocomplete",
    humanAction: "제안 diff를 읽고 의도와 edge case를 확인한다",
    minimumCheck: "관련 unit test 또는 수동 실행",
  },
  {
    surface: "agent",
    humanAction: "변경 파일 전체와 작업 요약을 review한다",
    minimumCheck: "lint, typecheck, test, build",
  },
]
```

## 스펙과 세부

IntelliSense는 language service와 editor experience의 일부로 이해할 수 있습니다. 현재 symbol, imported module, function signature, type information을 바탕으로 개발자의 입력을 보조합니다. 이것은 deterministic에 가까운 보조이기 때문에, 잘못된 추천보다 “프로젝트가 알고 있는 정보 안에서 빠르게 찾기”에 강합니다.

AI autocomplete는 생성 모델의 문맥 예측을 사용합니다. 주변 코드와 주석을 읽어 다음 줄 또는 함수를 제안합니다. 좋은 함수 이름과 명확한 주석이 있으면 제안 품질이 좋아질 수 있습니다. 반대로 파일 맥락이 모호하거나 hidden requirement가 많으면 그럴듯하지만 틀린 코드를 만들 수 있습니다.

Chat coding은 prompt engineering과 연결됩니다. 질문이 모호하면 답변도 모호합니다. “고쳐줘”보다 “이 test failure의 원인을 3개 가설로 나누고, 각 가설을 확인할 명령을 제안해줘”가 더 좋습니다. Chat은 사람의 생각을 확장하는 도구이므로, 사람이 질문 구조와 검증 기준을 제시할수록 결과가 좋아집니다.

Agent는 context engineering, tool calling, workflow, evaluation과 연결됩니다. Agent가 repository를 조사하려면 파일 접근이 필요하고, 코드를 수정하려면 권한이 필요하며, 테스트를 돌리려면 실행 환경이 필요합니다. OpenAI Codex 문서가 cloud sandbox environment를 언급하는 이유도 여기 있습니다. Agent는 단순 텍스트 답변이 아니라 환경 안에서 작업을 수행합니다.

이 시대 구분은 제품 이름과 완전히 일치하지 않을 수 있습니다. 하나의 제품 안에 inline suggestion, chat, agent 기능이 함께 있을 수 있습니다. 그래서 “Copilot은 자동완성인가 chat인가 agent인가”라고 묻기보다, 지금 사용하는 surface가 무엇인지 물어야 합니다. 같은 제품 안에서도 권한과 검증이 달라집니다.

## 원문으로 읽기

VS Code 문서가 IntelliSense를 설명하는 핵심 문장은 다음입니다.

> "IntelliSense is a general term"

이 문장은 IntelliSense가 하나의 작은 기능명이 아니라 completion, parameter info, quick info 같은 여러 editor 보조 기능을 묶는 용어임을 보여줍니다. AI 이전에도 개발자는 이미 editor intelligence의 도움을 받고 있었습니다.

GitHub Copilot의 출현을 보여주는 문장은 다음입니다.

> "technical preview of GitHub Copilot"

이 표현은 2021년 AI pair programming 흐름이 공개 preview로 등장했다는 맥락을 줍니다. 도구 시대 구분에서 중요한 전환점입니다.

> "suggesting whole lines or entire functions"

이 문장은 autocomplete가 단순 member list를 넘어 code block 생성으로 확장됐음을 보여줍니다. 현재 cursor 주변에서 한 줄이나 함수 전체를 제안할 수 있다는 점이 AI pair programming의 차별점입니다.

Chat coding 시대를 보여주는 문장은 다음입니다.

> "ask Copilot coding-related questions"

이 문장은 사용자가 코드에 대해 질문하고 설명을 받는 대화형 surface를 보여줍니다. 자동완성이 “다음 코드를 제안”한다면, chat은 “현재 문제를 함께 해석”합니다.

Agent 시대의 표현은 다음과 같습니다.

> "An autonomous AI agent"

이 문장은 도구가 단순 답변을 넘어 더 자율적인 작업 수행 surface로 확장됨을 보여줍니다. 다만 autonomous라는 말은 무제한 신뢰가 아니라 더 엄격한 경계 설계가 필요하다는 뜻으로 읽어야 합니다.

> "Codex can perform tasks for you"

이 문장은 Codex 같은 cloud software engineering agent가 사용자를 대신해 작업 단위를 수행할 수 있음을 보여줍니다. 이때 핵심은 task, sandbox, diff, verification이 함께 움직인다는 점입니다.

## 실전에서

학습자는 먼저 IntelliSense와 inline suggestion을 구분해야 합니다. IntelliSense가 제공하는 type hint와 member list는 project structure를 이해하는 데 매우 좋습니다. AI autocomplete는 반복적인 코드 작성 속도를 높입니다. 처음에는 작은 함수, test skeleton, type 변환처럼 실패해도 쉽게 검토할 수 있는 영역에서 시작하는 편이 안전합니다.

다음 단계는 chat을 학습 도구로 쓰는 것입니다. 오류 메시지를 붙이고 “이 에러가 말하는 조건을 초보자에게 설명해줘”라고 묻거나, unfamiliar code를 단계별로 설명하게 할 수 있습니다. 하지만 chat 답변을 그대로 복사하지 말고, 공식 문서·테스트·실행 결과로 확인해야 합니다. Chat은 이해를 넓히는 도구이지 최종 권위가 아닙니다.

Agent는 작은 repository task부터 시작하는 것이 좋습니다. 예를 들어 “이 컴포넌트의 비어 있는 상태 UI 추가”, “한 파일의 타입 오류 수정”, “테스트 실패 한 건 조사”처럼 범위를 좁힙니다. 처음부터 “전체 앱 개선”처럼 넓은 작업을 맡기면 변경 범위가 커지고 review가 어려워집니다. Agent task에는 항상 stop condition과 verify command를 붙이는 습관이 필요합니다.

팀에서는 surface별 정책을 만들 수 있습니다. Inline suggestion은 개발자가 직접 diff를 읽고 commit합니다. Chat 답변은 링크와 테스트로 확인합니다. Agent 변경은 pull request, reviewer, CI 통과를 요구합니다. 이렇게 나누면 AI 도구를 막연히 금지하거나 무제한 허용하는 대신, 권한과 위험에 맞게 사용할 수 있습니다.

> [!TIP]
> AI 코딩 도구를 평가할 때는 “무엇을 할 수 있는가”보다 “실패했을 때 사람이 얼마나 빨리 발견하고 되돌릴 수 있는가”를 함께 보세요.

## 한계와 트레이드오프

시대 구분은 학습을 돕지만 현실을 완벽히 나누지는 않습니다. 한 제품 안에 자동완성, chat, agent 기능이 모두 들어갈 수 있고, 기능 이름도 계속 바뀝니다. 따라서 특정 연도나 제품명만 외우면 금방 낡습니다. 더 안정적인 기준은 입력 형태, 권한 범위, 출력 형태, 검증 루틴입니다.

AI autocomplete는 빠르지만 좁은 context에 강합니다. Chat은 설명과 사고 확장에 좋지만 실제 변경과 검증을 자동으로 끝내지는 않습니다. Agent는 큰 작업을 맡길 수 있지만, 권한과 blast radius가 커집니다. 더 강력한 도구일수록 더 명확한 목표, 더 좁은 범위, 더 엄격한 검증이 필요합니다.

또한 AI 도구는 학습을 도울 수도 있고 방해할 수도 있습니다. 초보자가 모든 제안을 무비판적으로 받아들이면 개념을 이해하지 못한 채 코드만 늘어날 수 있습니다. 반대로 좋은 질문과 검증 루틴을 갖추면 AI는 훌륭한 설명자와 실습 파트너가 됩니다. 핵심은 “AI가 해준다”가 아니라 “AI와 함께 설명 가능한 결과를 만든다”입니다.

Agent 시대의 trade-off는 autonomy와 control입니다. 더 많이 맡기면 속도는 빨라질 수 있지만, 사람이 이해하지 못한 변경이 쌓일 위험도 커집니다. 그래서 commit 단위, diff summary, test result, rollback plan이 중요합니다. 긴 agent 작업일수록 중간 산출물과 검증 기록이 필요합니다.

## 더 읽기

이 강의의 근거는 VS Code IntelliSense 문서, GitHub Copilot 2021 소개 글, GitHub Copilot quickstart와 features 문서, OpenAI Codex 소개 문서입니다. 먼저 IntelliSense 문서를 읽어 AI 이전의 editor assistance를 이해하고, Copilot technical preview 글에서 AI pair programming의 출현을 확인하세요. 이어서 Copilot quickstart와 features 문서로 chat과 cloud agent surface를 구분하고, Codex 문서로 cloud sandbox agent의 작업 방식을 살펴보면 됩니다.

다음 강의는 `autocomplete-era`입니다. 이번 강의가 전체 지도라면, 다음 강의는 AI autocomplete가 실제로 어떤 맥락을 보고 제안하며, 개발자가 어떤 기준으로 받아들이고 거절해야 하는지 더 자세히 다룹니다.

복습 질문입니다.

- IntelliSense와 AI autocomplete는 어떤 점이 다른가?
- Chat coding은 자동완성과 달리 어떤 문제를 해결하는가?
- Agent에게 작업을 맡길 때 왜 diff review와 verify command가 필요한가?
- 하나의 제품 안에 여러 surface가 있을 때 무엇을 기준으로 검증 강도를 나눌 것인가?
- AI 개발 도구 시대 구분을 연도 암기가 아니라 위임 수준의 변화로 읽어야 하는 이유는 무엇인가?
