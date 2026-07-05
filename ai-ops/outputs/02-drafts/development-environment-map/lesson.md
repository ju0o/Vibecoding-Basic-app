## 한 줄 정의

개발 환경은 코드를 작성하고, 명령을 실행하고, 결과를 확인하고, 변경을 기록하기 위해 함께 쓰는 도구들의 작업 구조입니다. 이 구조에는 code editor, browser, local testing server, terminal, source control, version control이 들어갑니다. 초보자가 처음 개발을 배울 때 어려움을 느끼는 이유는 도구가 부족해서라기보다, 각 도구가 같은 프로젝트를 서로 다른 방식으로 바라본다는 사실을 아직 구분하지 못하기 때문입니다.

MDN은 단순 웹 개발을 시작할 때 필요한 기본 소프트웨어로 code editor, modern web browsers, local testing server를 제시합니다. VS Code 문서는 editor, Explorer, Side Bar, Panel, integrated terminal, Source Control 같은 화면 영역을 설명합니다. Git 문서는 version control을 시간에 따른 파일 변경 기록으로 설명합니다. 이 세 묶음을 연결하면 개발 환경은 "앱 하나"가 아니라 ==작성, 실행, 확인, 기록을 나누어 맡는 도구 지도==입니다.

이 강의의 목표는 특정 도구 사용법을 외우는 것이 아닙니다. VS Code를 열었을 때 왼쪽 Explorer는 무엇을 보여주는지, 오른쪽 editor는 무엇을 바꾸는지, 아래 terminal은 어디에서 명령을 실행하는지, 브라우저는 어떤 결과를 확인하는지, Git은 어떤 변경을 기록하는지를 한 화면 안에서 분리해 이해하는 것입니다. 이 지도가 잡히면 AI에게도 "이 파일을 고쳐줘", "터미널에서 실행해줘", "브라우저에서 확인해줘", "Git 변경을 보여줘"처럼 정확한 요청을 할 수 있습니다.

![개발 환경의 네 가지 흐름](/lesson-diagrams/development-environment-map/environment-loop.svg)

## 왜 존재하는가

처음 웹 개발을 배울 때는 HTML 파일을 만들고 브라우저에서 열어 보는 경험만으로도 화면이 나타납니다. 그러나 학습이 조금만 깊어져도 한 파일을 열어 보는 방식만으로는 부족해집니다. CSS와 JavaScript가 분리되고, 여러 파일을 폴더로 묶고, 터미널에서 명령을 실행하고, 로컬 테스트 서버로 브라우저 확인을 하며, 변경 이력을 Git으로 남겨야 합니다. MDN이 code editor, modern web browsers, local testing server를 함께 다루는 이유가 여기에 있습니다.

개발 환경이 필요한 첫 번째 이유는 역할 분리입니다. 코드를 쓰는 도구와 결과를 보는 도구는 다릅니다. VS Code의 editor는 파일 내용을 수정하는 장소이고, browser는 웹 결과를 확인하는 장소입니다. 터미널은 shell command를 실행하는 장소이고, Source Control은 변경 묶음을 확인하고 기록하는 장소입니다. 하나의 프로젝트를 다루지만, 각 도구의 질문은 다릅니다. "무엇을 수정했는가", "어디서 실행했는가", "무엇이 보이는가", "무슨 변경이 기록되었는가"가 서로 다른 질문입니다.

두 번째 이유는 재현성입니다. 파일만 저장했다고 해서 작업이 설명 가능한 상태가 되는 것은 아닙니다. Git 문서는 version control이 파일 또는 파일 집합의 변경을 기록하고 특정 버전을 나중에 불러올 수 있게 한다고 설명합니다. 초보자는 `index-final-final2.html`처럼 파일 이름으로 버전을 관리하려고 하지만, 이런 방식은 어떤 변경이 왜 들어갔는지 추적하기 어렵습니다. 개발 환경은 단순 편집 공간이 아니라 변경의 흐름을 남기는 구조입니다.

세 번째 이유는 실행 맥락입니다. 터미널 명령은 "현재 어느 폴더에서 실행되는가"에 따라 결과가 달라집니다. VS Code terminal 문서는 integrated terminal이 workspace root에서 시작한다고 설명합니다. 프로젝트 루트에서 실행해야 할 명령을 다른 폴더에서 실행하면 파일을 찾지 못하거나, 전혀 다른 위치에 결과물이 생길 수 있습니다. 그래서 에디터에서 열린 폴더와 터미널의 현재 위치를 연결해서 보는 습관이 필요합니다.

> [!KEY]
> 개발 환경은 설치 목록이 아니라 작업 흐름입니다. 파일을 쓰는 곳, 명령을 실행하는 곳, 결과를 보는 곳, 변경을 기록하는 곳을 구분할 때 초보자의 혼란이 줄어듭니다.

AI 시대에는 이 구분이 더 중요해졌습니다. AI 코딩 도구는 파일을 수정하고, 명령을 제안하고, 오류 메시지를 해석하고, Git diff를 설명할 수 있습니다. 하지만 사용자가 개발 환경의 지도를 모르면 AI가 어느 도구에서 무엇을 하려는지 판단하기 어렵습니다. "실행해줘"라는 말이 터미널 명령인지, 브라우저 확인인지, 로컬 서버 시작인지 모호해집니다. 개발 환경 지도는 AI에게 일을 맡기는 사람의 기본 언어입니다.

## 작동 원리

### 1. 프로젝트 폴더가 작업의 기준점이 됩니다

개발 환경은 보통 하나의 프로젝트 폴더를 기준으로 움직입니다. VS Code의 Explorer는 접근 가능한 files and folders를 보여주고, editor는 그중 열린 파일의 내용을 보여줍니다. 즉 Explorer는 "프로젝트의 구조"를 보여주고, editor는 "선택한 파일의 내용"을 보여줍니다. 이 두 화면을 구분해야 합니다. Explorer에서 파일을 고르는 것은 위치를 찾는 일이고, editor에서 코드를 고치는 것은 내용을 바꾸는 일입니다.

프로젝트 폴더는 터미널과도 연결됩니다. VS Code integrated terminal은 standalone terminal처럼 명령을 실행할 수 있고, 기본적으로 workspace root에서 시작한다는 설명이 KB에 들어 있습니다. 이것은 터미널이 에디터와 분리된 낯선 세계가 아니라, 같은 프로젝트 폴더를 텍스트 명령으로 다루는 화면이라는 뜻입니다. 에디터에서 파일을 고치는 것과 터미널에서 명령을 실행하는 것은 같은 폴더를 다른 인터페이스로 만지는 일입니다.

### 2. Editor는 파일의 내용을 바꿉니다

VS Code 문서는 "At its heart, Visual Studio Code is a code editor."라고 설명합니다. 에디터의 핵심은 파일 내용을 읽고 수정하는 것입니다. 초보자는 VS Code에 terminal, source control, extension 같은 기능이 많아서 IDE 전체를 "코드"라고 부르기도 합니다. 그러나 정확히 말하면 editor는 열린 파일의 텍스트를 수정하는 영역입니다.

이 구분은 AI에게 요청할 때도 유용합니다. "이 프로젝트를 고쳐줘"보다 "Explorer에서 `src/app/layout.tsx`를 찾고 editor에서 metadata 설명 문장을 바꿔줘"가 더 명확합니다. 물론 실제 요청을 항상 그렇게 길게 쓸 필요는 없지만, 머릿속으로는 어떤 파일의 어떤 내용을 바꾸는지 분리해야 합니다.

### 3. Terminal은 명령을 실행합니다

터미널은 파일 내용을 직접 편집하는 화면이 아니라 shell command를 실행하는 화면입니다. VS Code terminal 문서는 integrated terminal이 `mkdir`, `git` 같은 명령을 standalone terminal처럼 실행할 수 있다고 설명합니다. 또 getting started 문서는 개발 중 build, test, deploy를 위해 shell commands를 실행해야 할 수 있다고 설명합니다.

터미널의 핵심 입력은 명령입니다. 예를 들어 `npm run build`는 프로젝트를 빌드하는 명령이고, `git status`는 변경 상태를 보는 명령입니다. 같은 명령이라도 어느 폴더에서 실행하는지가 중요합니다. 그래서 터미널을 사용할 때는 "내가 지금 프로젝트 루트에 있는가"라는 질문이 먼저 와야 합니다. 이 질문은 다음 강의인 파일, 폴더, 경로 이해로 이어집니다.

### 4. Browser는 실행 결과를 확인합니다

웹 개발에서 브라우저는 결과 확인 도구입니다. MDN은 modern web browsers를 기본 개발 환경 요소로 제시합니다. 브라우저는 editor가 아닙니다. 브라우저에서 보이는 버튼과 문구는 파일의 결과이지, 원본 파일 그 자체가 아닙니다. 따라서 브라우저에서 문제가 보이면 다시 에디터의 파일, 터미널의 실행 로그, 로컬 서버 상태를 함께 봐야 합니다.

로컬 테스트 서버도 여기서 중요합니다. MDN은 local testing server를 초보 환경 설정의 learning outcome에 포함합니다. 브라우저에서 파일을 직접 여는 것과 로컬 서버를 통해 확인하는 것은 학습 단계에 따라 다르게 쓰일 수 있습니다. 이 강의에서는 서버 세부 구현을 다루지 않지만, "브라우저에 보인다"와 "인터넷에 배포되었다"는 같은 말이 아니라는 점을 먼저 잡아야 합니다.

> [!WARNING]
> 브라우저에서 화면이 보인다고 해서 공개 배포가 된 것은 아닙니다. KB 기준으로 local testing server는 개발 중 확인 환경이며, 공개 운영 환경과 구분해야 합니다.

### 5. Git은 변경을 기록합니다

Git 문서는 version control을 시간에 따라 파일 변경을 기록해 특정 버전을 나중에 불러올 수 있게 하는 시스템으로 설명합니다. VS Code Source Control 문서는 staging, committing, branching, merge conflict resolution 같은 Git 작업을 편집기 안에서 다룰 수 있다고 설명합니다. 여기서 Git과 Source Control view를 구분해야 합니다. Git은 변경 기록 시스템이고, VS Code Source Control은 그 시스템을 UI로 보여주는 화면입니다.

파일을 저장하면 디스크의 현재 파일 내용이 바뀝니다. Git commit은 그 변경을 version control 기록에 하나의 의미 있는 묶음으로 남깁니다. 저장과 commit을 혼동하면 "방금 저장했는데 왜 Git에 빨간 표시가 남아 있지?" 같은 질문이 생깁니다. 저장은 파일 내용의 현재 상태이고, commit은 변경 이력의 기록입니다.

### 6. 도구들은 순환 구조로 연결됩니다

개발 환경의 작동은 한 방향으로만 흐르지 않습니다. 에디터에서 파일을 수정합니다. 터미널에서 빌드나 테스트 명령을 실행합니다. 브라우저에서 결과를 확인합니다. 문제가 있으면 다시 에디터로 돌아갑니다. 변경이 의미 있는 단위가 되면 Git에서 diff를 보고 commit합니다. 이 순환은 작은 학습 프로젝트부터 AI 코딩 도구를 쓰는 작업까지 계속 반복됩니다.

AI가 들어와도 순환은 사라지지 않습니다. AI는 editor에서 바꿀 코드를 제안하고, terminal에서 실행할 명령을 제안하고, browser verification을 요청하고, Git diff를 설명할 수 있습니다. 하지만 최종적으로 사용자는 같은 네 질문을 확인해야 합니다. 어느 파일이 바뀌었는가. 어떤 명령이 실행되었는가. 결과가 어디에서 확인되었는가. 변경 기록이 남았는가. ==AI 코딩의 기본 검증도 결국 개발 환경 지도 위에서 일어납니다.==

## 스펙과 세부

### Code editor와 IDE를 구분합니다

KB는 VS Code 문서가 자신을 code editor라고 설명한다는 점을 사용합니다. VS Code에는 terminal, Source Control, extensions처럼 IDE처럼 느껴지는 기능이 있지만, 문서의 핵심 표현은 code editor입니다. 입문 단계에서는 이 표현이 중요합니다. VS Code는 "코드가 실행되는 마법 상자"가 아니라, 프로젝트 파일을 열고 내용을 바꾸며 주변 개발 도구를 통합하는 편집기입니다.

### Explorer, editor, Panel은 같은 화면 안의 다른 역할입니다

VS Code UI 문서는 Explorer와 editor layout, Side Bar, Panel 같은 영역을 설명합니다. Explorer는 파일과 폴더 구조를 보여주고, editor는 열린 파일 내용을 보여줍니다. Panel에는 terminal 같은 도구가 열릴 수 있습니다. 초보자가 화면 전체를 "코드"라고 부르면 질문이 흐려집니다. "Explorer에서 파일을 찾는다", "editor에서 파일을 수정한다", "terminal에서 명령을 실행한다"처럼 말하면 작업이 훨씬 구체적이 됩니다.

### Integrated terminal은 별도 앱처럼 명령을 실행합니다

VS Code Terminal Basics는 integrated terminal이 standalone terminal처럼 명령을 실행할 수 있다고 설명합니다. 이 문장은 터미널이 단순 로그 창이 아니라 실제 shell command 실행 공간임을 보여줍니다. `mkdir`, `git` 같은 명령이 그 안에서 실행될 수 있습니다. 따라서 터미널 출력은 장식이 아니라 개발 작업의 증거입니다. 빌드 성공, 테스트 실패, Git 상태가 모두 이곳에서 확인됩니다.

### Local testing server는 배포가 아닙니다

MDN은 local testing server를 초보 환경 설정에 포함합니다. 이 표현은 로컬 확인과 공개 배포를 구분하게 해줍니다. 로컬 서버는 개발자의 컴퓨터에서 결과를 확인하기 위한 실행 환경입니다. 배포는 다른 사람이 접근할 수 있는 운영 환경으로 올리는 별도 과정입니다. 이 강의는 배포 세부를 다루지 않지만, local이라는 단어를 놓치지 않는 것이 중요합니다.

### Version control과 Source Control UI는 층이 다릅니다

Git 문서는 version control을 변경 기록 시스템으로 정의합니다. VS Code Source Control 문서는 Git 작업을 UI에서 다루게 합니다. 둘은 같은 층이 아닙니다. Git은 underlying system이고, VS Code Source Control은 그 시스템을 보여주는 interface입니다. 그래서 UI를 쓰더라도 `commit`, `branch`, `merge conflict` 같은 Git 개념은 배워야 합니다.

### 실행 가능한 구조 예시

```ts
type EnvironmentTool =
  | "code-editor"
  | "integrated-terminal"
  | "browser"
  | "local-testing-server"
  | "source-control"
  | "version-control"

type DevelopmentEnvironmentMap = {
  projectFolder: string
  writeIn: Extract<EnvironmentTool, "code-editor">
  runIn: Extract<EnvironmentTool, "integrated-terminal">
  inspectWith: Extract<EnvironmentTool, "browser">
  recordWith: Extract<EnvironmentTool, "version-control">
}

const beginnerWebProject: DevelopmentEnvironmentMap = {
  projectFolder: "ai-vibe-coding-master",
  writeIn: "code-editor",
  runIn: "integrated-terminal",
  inspectWith: "browser",
  recordWith: "version-control",
}

console.log(`${beginnerWebProject.projectFolder}: write, run, inspect, record`)
```

이 코드는 실제 개발 환경을 설치하지 않습니다. 대신 KB가 제시한 역할을 타입으로 나누어 보여줍니다. 중요한 점은 `projectFolder` 하나를 여러 도구가 함께 바라본다는 것입니다. 초보자는 도구 이름을 많이 아는 것보다, 같은 프로젝트를 어느 관점으로 다루는지 먼저 알아야 합니다.

## 원문으로 읽기

> "code editor"
>
> — 코드 편집기.
> [Installing basic software — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software)

MDN의 이 짧은 표현은 개발 환경의 첫 축을 잡아줍니다. 코드는 어딘가에 "생각으로" 존재하지 않고 파일에 텍스트로 저장됩니다. code editor는 그 텍스트를 읽고 고치는 도구입니다. AI가 코드를 생성해도 최종 결과는 파일 내용으로 남기 때문에, editor의 역할은 사라지지 않습니다.

> "modern web browsers"
>
> — 현대적인 웹 브라우저.
> [Installing basic software — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software)

브라우저는 웹 결과를 확인하는 도구입니다. 입문자는 "코드를 썼다"와 "사용자에게 보인다"를 분리해서 봐야 합니다. editor에서 HTML, CSS, JavaScript를 수정해도 실제 사용자가 경험하는 것은 browser에 렌더링된 결과입니다. 그래서 웹 개발 환경에는 editor와 browser가 함께 필요합니다.

> "local testing server"
>
> — 로컬 테스트 서버.
> [Installing basic software — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software)

local testing server라는 표현은 로컬 확인과 배포를 구분하게 해줍니다. 초보자가 브라우저에서 결과를 보면 "사이트가 올라갔다"고 느낄 수 있지만, local server는 개발 중 확인을 위한 환경입니다. 배포와 운영은 뒤의 강의에서 별도로 다루어야 합니다.

> "At its heart, Visual Studio Code is a code editor."
>
> — 핵심적으로 Visual Studio Code는 코드 편집기다.
> [User interface — VS Code Docs](https://code.visualstudio.com/docs/getstarted/userinterface)

이 문장은 VS Code를 이해하는 기준점입니다. VS Code는 많은 기능을 제공하지만 핵심은 code editor입니다. AI 시대에도 이 기준은 중요합니다. AI가 만든 변경을 사람이 검토하려면 결국 editor에서 어떤 파일이 어떻게 바뀌었는지 보게 됩니다.

> "integrated terminal"
>
> — 통합 터미널.
> [User interface — VS Code Docs](https://code.visualstudio.com/docs/getstarted/userinterface)

integrated terminal은 명령 실행이 에디터 안으로 들어온 구조를 보여줍니다. 터미널은 editor와 다른 역할이지만, 같은 작업 화면 안에서 프로젝트 루트를 기준으로 명령을 실행할 수 있습니다. 이 결합 때문에 초보자는 더 편해지지만, 동시에 editor와 terminal의 역할을 구분해야 합니다.

> "records changes to a file or set of files"
>
> — 파일 또는 파일 집합의 변경을 기록한다.
> [About Version Control — Git Book](https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control)

Git을 단순 백업 도구로 이해하면 부족합니다. 이 인용은 version control의 핵심이 변경 기록임을 말합니다. 저장은 현재 내용을 바꾸는 것이고, version control은 시간에 따른 변경 묶음을 기록하는 것입니다. AI가 코드를 많이 바꾸는 시대일수록 이 기록은 더 중요해집니다.

## 실전에서

### 패턴 1: 작업 전 현재 프로젝트 폴더를 확인합니다

초보자는 먼저 VS Code에서 어떤 폴더를 열었는지 봅니다. Explorer가 보여주는 최상위 폴더가 작업 기준입니다. 터미널도 같은 기준에서 시작하는지 확인합니다. 이때 질문은 단순합니다. "내가 지금 고치려는 파일이 이 Explorer 안에 있는가?" "터미널 명령이 이 프로젝트에서 실행되는가?" 이 두 질문을 놓치면 같은 컴퓨터 안의 다른 폴더에서 작업하는 실수가 생깁니다.

### 패턴 2: AI에게 요청할 때 도구 역할을 넣습니다

AI에게 "이거 안 돼요"라고 말하면 AI는 어떤 도구의 문제인지 추측해야 합니다. 더 나은 요청은 개발 환경 지도를 반영합니다. "VS Code terminal에서 `npm run build`를 실행했더니 오류가 났고, Explorer 기준 프로젝트 루트는 `D:\Ai_Vibe_Coding_Master`입니다"처럼 말하면 AI가 터미널 출력, 프로젝트 폴더, 실행 위치를 함께 이해할 수 있습니다.

> [!TIP]
> AI에게 문제를 설명할 때는 파일 경로, 실행한 터미널 명령, 브라우저에서 본 결과, Git 변경 여부 중 확인된 것을 함께 적으세요. 이 네 가지가 개발 환경 지도의 실무 언어입니다.

### 패턴 3: 브라우저 확인과 Git 기록을 분리합니다

화면이 정상으로 보이는 것은 중요한 신호이지만, 그것만으로 작업이 끝난 것은 아닙니다. 브라우저는 사용자 경험을 확인합니다. Git은 변경 기록을 확인합니다. 화면이 맞아도 Git diff에 의도하지 않은 파일이 있으면 아직 검토가 끝난 것이 아닙니다. 반대로 Git 변경이 작아도 브라우저에서 결과가 깨지면 기능 확인이 끝난 것이 아닙니다.

### 패턴 4: 로컬 서버와 배포를 구분합니다

local testing server는 개발 중 확인에 쓰입니다. 운영 사이트에 배포하는 것은 별도 과정입니다. AI가 "서버를 띄웠습니다"라고 말할 때도 어떤 서버인지 물어야 합니다. 로컬 테스트 서버인지, 빌드 결과를 서빙하는 서버인지, 공개 배포 환경인지에 따라 검증 방법이 다릅니다.

### 패턴 5: 저장, 실행, 확인, 기록을 한 사이클로 묶습니다

실무에서는 파일을 저장하고, 터미널에서 명령을 실행하고, 브라우저에서 결과를 보고, Git에서 변경을 확인합니다. 이 네 단계가 작게 반복됩니다. 초보자는 처음부터 모든 명령을 외우려 하기보다, 이 사이클을 하나의 리듬으로 익히는 것이 좋습니다. AI가 일부 단계를 도와도 사이클 자체는 사람이 이해해야 합니다.

## 한계와 트레이드오프

첫 번째 한계는 도구가 통합될수록 역할이 더 흐려진다는 점입니다. VS Code 안에서 editor, terminal, Source Control을 모두 사용할 수 있으므로 편리하지만, 초보자는 한 화면 안의 모든 것을 같은 것으로 느끼기 쉽습니다. 그래서 더 의식적으로 "지금은 파일을 편집하는가, 명령을 실행하는가, 변경을 기록하는가"를 나누어야 합니다.

두 번째 한계는 개발 환경 지도가 실제 명령 지식을 대신하지 않는다는 점입니다. 이 강의는 터미널 명령, Git 명령, 로컬 서버 세부 설정을 모두 가르치지 않습니다. 대신 후속 강의로 갈 수 있는 길을 잡습니다. 파일과 폴더를 모르면 터미널 명령을 이해하기 어렵고, 터미널을 모르면 빌드와 테스트를 이해하기 어렵고, Git을 모르면 변경 검토가 어렵습니다.

세 번째 한계는 도구 이름이 바뀔 수 있다는 점입니다. KB는 VS Code, MDN, Git 문서를 기준으로 설명하지만, 핵심은 특정 앱 이름이 아니라 역할입니다. 다른 editor를 쓰더라도 파일을 수정하는 도구, 명령을 실행하는 도구, 결과를 확인하는 도구, 변경을 기록하는 도구라는 구조는 유지됩니다.

네 번째 한계는 AI가 도구 사용을 대신해도 이해가 면제되지 않는다는 점입니다. AI가 terminal command를 실행하고 Git diff를 요약해도, 사용자는 그 결과가 어느 역할의 증거인지 판단해야 합니다. 실행 로그는 실행의 증거이고, 브라우저 화면은 결과의 증거이며, Git diff는 변경의 증거입니다. 하나의 증거가 다른 증거를 자동으로 대체하지 않습니다.

==개발 환경 지도의 목적은 모든 도구를 잘 쓰게 만드는 것이 아니라, 도구 사이의 책임 경계를 보이게 만드는 것입니다.== 책임 경계가 보이면 오류를 추적할 수 있고, AI에게도 더 정확한 일을 맡길 수 있습니다.

## 더 읽기

먼저 MDN의 Installing basic software를 읽어 code editor, browser, local testing server가 왜 함께 등장하는지 확인하세요. 그 다음 VS Code User Interface 문서를 읽으며 Explorer, editor, Panel, integrated terminal의 위치를 실제 화면과 대조하세요. 이어서 VS Code Terminal Basics와 Getting started with the terminal을 읽으면 터미널이 build, test, deploy, Git 같은 명령 실행 공간이라는 점이 잡힙니다. 마지막으로 Git Book의 About Version Control을 읽고 저장과 commit의 차이를 분리하세요.

- [Installing basic software — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software)
- [User interface — VS Code Docs](https://code.visualstudio.com/docs/getstarted/userinterface)
- [Terminal Basics — VS Code Docs](https://code.visualstudio.com/docs/terminal/basics)
- [Getting started with the terminal — VS Code Docs](https://code.visualstudio.com/docs/terminal/getting-started)
- [Source Control in VS Code — VS Code Docs](https://code.visualstudio.com/docs/sourcecontrol/overview)
- [About Version Control — Git Book](https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control)

읽을 때는 여섯 질문을 기준으로 보세요. 코드를 쓰는 도구는 무엇인가. 결과를 보는 도구는 무엇인가. 명령을 실행하는 도구는 무엇인가. 로컬에서 확인하는 서버는 무엇인가. 변경을 기록하는 시스템은 무엇인가. 그리고 이 모든 도구가 같은 프로젝트 폴더를 바라보고 있는가. 이 여섯 질문이 잡히면 다음 강의인 파일, 폴더, 경로를 훨씬 안정적으로 이해할 수 있습니다.
