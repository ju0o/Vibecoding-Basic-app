## 한 줄 정의

자동완성 시대는 IDE가 현재 편집 중인 코드와 커서 주변 맥락을 바탕으로 다음 token, line, function 후보를 제안하고, 개발자가 그 제안을 받아들이거나 거절하며 속도를 높이는 AI 코딩 도구 사용 단계입니다. 전통적인 IntelliSense는 code completion, parameter info, quick info, member lists를 제공했고, GitHub Copilot 같은 AI-powered inline suggestion은 code, comments, tests까지 typing 중 완성하는 방향으로 확장했습니다.

이 강의는 “자동완성은 편하다”에서 멈추지 않습니다. 자동완성이 왜 생겼는지, 어떤 입력 부담을 줄이는지, IntelliSense와 AI inline suggestion이 어떻게 다른지, 그리고 제안을 받아들인 뒤 왜 내 코드로 설명하고 검증해야 하는지 다룹니다. ==자동완성 시대의 핵심은 Tab을 빨리 누르는 것이 아니라, 작은 제안을 빠르게 실험하고 책임 있게 검토하는 습관입니다==.

AI 개발 도구 시대 구분에서 자동완성은 가장 먼저 익히기 좋은 surface입니다. Agent처럼 여러 파일을 직접 바꾸지는 않고, chat처럼 긴 대화를 요구하지도 않습니다. 대신 현재 파일 안에서 제안이 바로 보이므로 학습자가 “AI가 어떤 맥락을 보고 무엇을 추측하는가”를 눈으로 관찰하기 좋습니다.

![자동완성 시대 작업 루프](/lesson-diagrams/autocomplete-era/autocomplete-era-loop.svg)

## 왜 존재하는가

개발자는 많은 시간을 “생각”이 아니라 “입력”에 씁니다. 함수 이름을 정확히 기억하고, 반복되는 JSX 구조를 쓰고, 테스트 scaffold를 만들고, import와 매개변수 이름을 맞추고, 자주 쓰는 API 호출 형태를 다시 적습니다. 물론 이 과정도 개발의 일부지만, 이미 결정된 패턴을 반복 입력하는 시간은 피로를 만듭니다.

전통적 code completion은 이 입력 부담을 줄였습니다. 객체 뒤에 점을 찍으면 가능한 member list를 보여주고, 함수를 호출하면 parameter info를 보여주며, symbol에 마우스를 올리면 quick info를 보여줍니다. 이것은 언어 서비스와 타입 정보가 제공하는 강력한 보조입니다. 초보자는 API 이름을 다 외우지 않아도 되고, 숙련자는 더 빠르게 정확한 symbol을 선택할 수 있습니다.

AI autocomplete는 여기서 한 걸음 더 나아갑니다. 현재 코드 context, 주석, 함수 이름, 주변 패턴을 보고 다음 줄이나 함수 전체를 제안할 수 있습니다. GitHub Copilot의 2021년 소개는 작업 중인 code context를 바탕으로 whole lines or entire functions를 제안한다고 설명했습니다. 이것은 단순 목록이 아니라 후보 구현을 제안한다는 점에서 변화가 큽니다.

하지만 이 변화가 곧 “생각을 안 해도 된다”는 뜻은 아닙니다. 자동완성은 현재 맥락을 바탕으로 가능성이 높은 코드를 제안합니다. 프로젝트의 숨은 요구사항, 보안 정책, 테스트 기준, 팀 스타일을 완전히 이해한다는 보장은 없습니다. 그래서 자동완성은 생산성 도구이면서 동시에 검토 습관을 요구하는 도구입니다.

> [!KEY]
> 자동완성은 개발자의 손을 빠르게 하지만, 요구사항을 이해하고 결과를 책임지는 일까지 대신하지는 않습니다.

## 작동 원리

### 1. 전통적 completion은 project symbol을 빠르게 보여준다

VS Code의 IntelliSense는 code completion, parameter info, quick info, member lists를 포함하는 기능군입니다. 이 방식은 언어 서버와 타입 시스템, 현재 프로젝트 symbol을 기반으로 합니다. 어떤 객체에 어떤 property가 있는지, 함수가 어떤 parameter를 받는지, import 가능한 symbol이 무엇인지 빠르게 보여줍니다.

이 전통적 completion은 예측 가능성이 높습니다. 이미 코드와 타입 정보에 존재하는 사실을 바탕으로 추천하므로, 개발자가 API를 기억하지 못해도 후보를 탐색할 수 있습니다. TypeScript 프로젝트에서는 타입 오류를 줄이는 데 특히 도움이 됩니다. 다만 새로운 알고리즘 전체를 만들어내거나, 주석을 해석해 긴 구현을 완성하는 데는 제한이 있습니다.

### 2. AI inline suggestion은 현재 맥락을 보고 다음 코드를 생성한다

VS Code 문서는 GitHub Copilot이 AI-powered inline suggestions를 제공한다고 설명합니다. Inline suggestion은 사용자가 타이핑하는 도중 현재 줄이나 다음 블록을 흐릿한 제안으로 보여주고, 개발자가 받아들이거나 무시할 수 있게 합니다. 이 제안은 code, comments, tests 등 다양한 작성 대상에 나타날 수 있습니다.

AI inline suggestion의 입력은 현재 편집 맥락입니다. 함수 이름, 주석, 기존 코드 스타일, 주변 test pattern이 모두 힌트가 됩니다. 예를 들어 `function isValidEmail`이라는 이름과 “빈 문자열은 false”라는 주석이 있으면, 모델은 그 의도를 바탕으로 구현 후보를 제안할 수 있습니다. 맥락이 구체적일수록 제안 품질도 좋아질 가능성이 큽니다.

### 3. Suggestion scope는 줄에서 함수까지 넓어진다

AI autocomplete는 한 단어만 제안하지 않습니다. GitHub Copilot 소개는 whole lines 또는 entire functions를 제안한다고 설명합니다. 이것은 생산성 면에서 강력합니다. 반복적인 validation helper, test skeleton, component boilerplate를 빠르게 만들 수 있습니다.

그러나 scope가 넓어질수록 검토해야 할 책임도 커집니다. 변수 이름 하나를 고르는 것과 함수 전체를 받아들이는 것은 다릅니다. 함수 전체 제안은 edge case, error handling, security assumption, performance를 모두 포함합니다. 따라서 긴 제안일수록 “그럴듯함”이 아니라 실제 요구사항과 테스트로 확인해야 합니다.

### 4. Tab accept는 코드 작성이 아니라 코드 채택이다

많은 editor에서 inline suggestion은 Tab이나 특정 shortcut으로 받아들입니다. 이 행동은 단순 입력이 아니라 코드 채택입니다. 받아들인 순간 그 코드는 AI의 코드가 아니라 내 repository의 코드가 됩니다. 따라서 읽지 않고 받아들이면 나중에 설명하기 어렵고, 버그가 생겼을 때 책임 경계도 흐려집니다.

초보자에게 좋은 습관은 제안을 작은 단위로 받는 것입니다. 전체 함수를 한 번에 받기보다 줄 단위로 받아들이고, 각 줄이 의도와 맞는지 확인합니다. 특히 조건문, 삭제, 인증, 데이터 저장, 외부 API 호출처럼 실패 비용이 큰 부분은 더 천천히 봅니다.

### 5. 자동완성은 chat과 agent의 전 단계다

자동완성은 cursor-local surface입니다. 사용자가 어느 파일의 어느 줄에서 작업할지 정하고, 모델은 그 주변에서 다음 코드를 제안합니다. Chat coding은 질문과 설명을 다루고, agent는 repository 조사와 multi-file 변경까지 넓어집니다. 그래서 자동완성은 AI 코딩 학습의 첫 관문입니다.

```ts
type SuggestionReview = {
  accepted: boolean
  reason: string
  verification: "read" | "typecheck" | "test" | "manual-run"
}

function reviewSuggestion(codeChanged: boolean, riskyArea: boolean): SuggestionReview {
  if (!codeChanged) {
    return { accepted: false, reason: "변경 없음", verification: "read" }
  }

  return {
    accepted: true,
    reason: riskyArea ? "요구사항과 edge case를 읽은 뒤 채택" : "작은 반복 패턴 채택",
    verification: riskyArea ? "test" : "typecheck",
  }
}
```

## 스펙과 세부

IntelliSense의 범위는 completion, parameter info, quick info, member lists입니다. 초보자는 이 네 가지를 구분해 보면 좋습니다. Completion은 다음 symbol 후보를 보여주고, parameter info는 함수 호출 시 필요한 인자 정보를 보여주며, quick info는 symbol의 타입이나 설명을 확인하게 해줍니다. Member list는 객체나 module이 가진 항목을 탐색하게 합니다.

AI inline suggestion은 보통 editor 안에서 ghost text처럼 나타납니다. 사용자는 일부를 수락하거나, 전체를 수락하거나, 다른 제안을 요청할 수 있습니다. 중요한 것은 제안이 “현재 맥락의 후보”라는 점입니다. 프로젝트 전체 요구사항을 항상 아는 것은 아니므로, 파일에 더 좋은 주석과 명확한 test가 있으면 제안이 더 쓸모 있어질 수 있습니다.

GitHub Docs는 여러 IDE에서 code suggestions를 안내합니다. 이것은 자동완성이 특정 editor 하나에만 갇힌 개념이 아니라 개발 환경 표면에 붙는 기능이라는 뜻입니다. VS Code, Visual Studio, JetBrains, Vim/Neovim처럼 팀 도구가 다르면 설치, 권한, 설정, shortcut도 달라질 수 있습니다. 팀에서는 어떤 IDE surface에서 AI suggestion을 허용하고 어떤 검증을 요구할지 정해야 합니다.

Suggestion scope도 정책이 필요합니다. 한 줄 제안은 빠르게 읽고 받아들일 수 있습니다. 여러 줄 또는 함수 전체 제안은 요구사항 checklist와 test가 필요합니다. Test 파일 제안은 특히 조심해야 합니다. AI가 구현을 따라 test를 만들면 잘못된 구현을 그대로 승인하는 “거울 테스트”가 될 수 있습니다.

자동완성은 context engineering의 아주 작은 버전으로 볼 수도 있습니다. 현재 파일 이름, 함수 이름, 주변 코드, 주석, test pattern이 모델에게 제공되는 context입니다. 좋은 이름과 명확한 TODO는 제안을 돕고, 모호한 이름과 오래된 주석은 잘못된 제안을 부를 수 있습니다.

```ts
// 나쁜 힌트: 모델과 사람 모두 의도를 추측해야 한다.
function handle(data: unknown) {
  // fix this
}

// 좋은 힌트: 입력, 기대 결과, 예외를 좁혀 준다.
function formatLessonProgress(completed: number, total: number) {
  // Return "0%" when total is 0. Otherwise round to the nearest whole percent.
}
```

## 원문으로 읽기

전통적 editor assistance의 범위를 보여주는 문장은 다음입니다.

> "code completion, parameter info, quick info, and member lists"

이 문장은 IntelliSense가 단순 자동완성 하나가 아니라 여러 개발 보조 기능을 묶는 용어임을 보여줍니다. AI 이전에도 editor는 이미 개발자의 기억 부담을 줄여주고 있었습니다.

AI autocomplete surface를 보여주는 문장은 다음입니다.

> "GitHub Copilot provides AI-powered inline suggestions"

이 문장은 Copilot이 editor 안에서 AI 기반 제안을 제공한다는 점을 분명히 합니다. Chat 창에서 긴 답을 받는 것과 달리, inline suggestion은 작성 중인 코드 흐름 안에 바로 나타납니다.

> "complete your code, comments, tests, and more as you type"

이 문장은 제안 대상이 코드에만 국한되지 않음을 보여줍니다. 주석과 테스트도 suggestion의 대상이 될 수 있습니다. 그래서 AI가 만든 test도 검증 대상입니다.

Copilot 2021 소개에서 중요한 변화는 scope입니다.

> "suggesting whole lines or entire functions"

이 문장은 AI autocomplete가 symbol 목록을 넘어 구현 후보를 제안한다는 점을 보여줍니다. 함수 전체 제안은 편리하지만, 그만큼 로직 전체를 읽어야 합니다.

IDE 사용 방식은 다음 문장으로 정리됩니다.

> "Copilot provides suggestions inline as you type"

이 문장은 자동완성 시대의 체감 경험을 잘 보여줍니다. 개발자는 별도 대화로 이동하지 않고, 코드를 쓰는 바로 그 위치에서 제안을 보고 선택합니다.

## 실전에서

자동완성을 잘 쓰려면 먼저 제안이 잘 나오게 context를 정리해야 합니다. 함수 이름을 명확히 짓고, 입력과 출력 형태를 타입으로 적고, 예외 조건을 짧은 주석으로 남깁니다. 모델은 마법처럼 프로젝트 의도를 아는 것이 아니라 현재 context를 근거로 다음 코드를 추측합니다. 모호한 context는 모호한 제안을 부릅니다.

두 번째는 작은 제안을 먼저 채택하는 것입니다. 반복 markup, 간단한 mapper, test skeleton처럼 실패해도 빠르게 읽을 수 있는 영역에서 연습합니다. 삭제, 결제, 인증, secret, database migration처럼 위험한 영역에서는 자동완성 제안을 바로 받아들이지 말고 더 강한 검증을 둡니다.

세 번째는 수락 후 설명하기입니다. 제안을 받아들인 뒤 “이 코드가 무엇을 하고, 왜 이 조건이 필요한가”를 말로 설명해보세요. 설명이 막히면 아직 내 코드가 아닙니다. 이 프로젝트의 학습 목표가 다른 사람에게 설명할 수 있을 정도의 이해이므로, 자동완성은 속도 도구이면서 설명 연습의 소재가 됩니다.

네 번째는 test와 typecheck를 연결하는 것입니다. 작은 제안은 typecheck로 충분할 수 있지만, behavior가 바뀌는 제안은 test가 필요합니다. 특히 entire function suggestion은 edge case를 포함한 테스트를 작성하거나 기존 테스트를 실행해야 합니다. AI가 만든 코드가 멋져 보여도 test failure가 있으면 아직 완료가 아닙니다.

> [!TIP]
> 자동완성 제안을 받기 전, 한 줄 주석으로 “무엇을 만족해야 하는지”를 써보세요. 좋은 힌트는 좋은 제안을 부르고, 나중에 review 기준도 됩니다.

## 한계와 트레이드오프

자동완성의 가장 큰 한계는 context가 좁다는 점입니다. 현재 파일과 주변 코드가 제안 품질에 큰 영향을 줍니다. 프로젝트의 최신 정책, 기획 의도, 보안 규칙, hidden requirement는 자동으로 반영되지 않을 수 있습니다. 따라서 제안이 현재 파일에서는 그럴듯해도 전체 시스템에서는 틀릴 수 있습니다.

두 번째 한계는 과신입니다. Ghost text는 자연스럽게 이어져 보이기 때문에 사람이 읽지 않고 받아들이기 쉽습니다. 하지만 자연스러운 문법은 올바른 로직과 다릅니다. 잘못된 condition, 빠진 null 처리, 취약한 validation, 불필요한 dependency가 숨어 있을 수 있습니다.

세 번째 trade-off는 학습입니다. 자동완성은 반복 입력을 줄여주지만, 초보자가 왜 그런 코드가 필요한지 이해하지 못한 채 넘어가면 개념 학습이 비어버립니다. 그래서 초보자는 자동완성을 끄라는 뜻이 아니라, 수락한 코드를 설명하고 실험하는 시간을 일부러 가져야 합니다.

네 번째 한계는 테스트 생성입니다. AI가 comments와 tests도 완성할 수 있다는 것은 장점이지만, 구현을 그대로 따라간 test는 품질을 보장하지 않습니다. 테스트는 요구사항과 사용자 행동에서 출발해야 합니다. 자동완성으로 test skeleton을 만들더라도 assertion은 사람이 기준을 세워야 합니다.

## 더 읽기

이 강의의 근거는 VS Code IntelliSense 문서, VS Code의 GitHub Copilot inline suggestions 문서, GitHub Copilot 2021 소개 글, GitHub Docs의 IDE별 code suggestions 문서입니다. 먼저 IntelliSense 문서를 읽어 전통적 completion의 범위를 확인하고, 이어서 Copilot inline suggestions 문서에서 AI-powered inline suggestion이 code, comments, tests를 어떻게 다루는지 살펴보세요.

다음 강의는 `chat-coding-era`입니다. 자동완성이 현재 cursor 주변에서 후보를 제안한다면, chat coding은 질문, 설명, 디버깅, 수정 방향 탐색으로 확장됩니다. 자동완성에서 배운 “맥락 제공”과 “검증 책임”은 chat에서도 그대로 이어집니다.

복습 질문입니다.

- IntelliSense의 completion과 AI inline suggestion은 무엇이 다른가?
- Code context가 모호하면 자동완성 제안에 어떤 문제가 생기는가?
- Whole function suggestion을 받을 때 왜 더 강한 검토가 필요한가?
- Tab으로 받아들인 코드를 내 코드로 설명하려면 무엇을 확인해야 하는가?
- 자동완성은 chat coding과 agent workflow와 어떤 점에서 다르게 쓰이는가?
