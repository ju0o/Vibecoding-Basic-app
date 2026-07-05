---
id: dev-environment-map
title: "Development Environment Map (개발 환경 지도)"
topicGroup: T01
status: approved
score: 88
level: 입문
prerequisites: []
successors: [files-folders-paths, terminal-shell-commands]
related: [files-folders-paths, terminal-shell-commands]
consumers:
  lessons: [development-environment-map]
  glossary:
    [
      "Development Environment",
      "Code Editor",
      "VS Code Explorer",
      "Integrated Terminal",
      "Local Testing Server",
      "Version Control",
      "Source Control View",
    ]
sources:
  - { title: "Installing basic software", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software", checked: 2026-07-05 }
  - { title: "User interface", url: "https://code.visualstudio.com/docs/getstarted/userinterface", checked: 2026-07-05 }
  - { title: "Terminal Basics", url: "https://code.visualstudio.com/docs/terminal/basics", checked: 2026-07-05 }
  - { title: "Getting started with the terminal", url: "https://code.visualstudio.com/docs/terminal/getting-started", checked: 2026-07-05 }
  - { title: "Source Control in VS Code", url: "https://code.visualstudio.com/docs/sourcecontrol/overview", checked: 2026-07-05 }
  - { title: "About Version Control", url: "https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
개발 환경은 코드를 쓰고 실행하고 확인하고 기록하는 도구 묶음이다. MDN은 단순 웹 개발을 시작할 때 code editor, modern web browsers, local testing server를 설치 대상으로 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
이 KB에서 개발 환경 지도는 IDE 또는 에디터, 터미널, 브라우저, Git, 로컬 서버가 각각 어떤 역할을 하는지 구분하는 지식이다. VS Code 문서는 에디터, Explorer, Source Control, Panel, integrated terminal 같은 UI 영역을 설명한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)

## 역사
웹 개발 학습 문서에서 개발 환경은 "브라우저로 열어 보는 파일"에서 "에디터, 브라우저, 터미널, 로컬 서버, 버전 관리"가 함께 작동하는 구조로 설명된다. MDN은 초보 환경 설정에서 code editor, modern browsers, local testing server를 함께 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
Git 문서는 version control을 시간이 지나며 파일 또는 파일 집합의 변경을 기록해 특정 버전을 나중에 불러올 수 있게 하는 시스템으로 정의한다. (출처: https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05)
VS Code는 소스 제어와 터미널을 편집기 안에 통합해 코드 작성, 명령 실행, 변경 확인을 한 화면에서 다루게 한다. Source Control 문서는 VS Code가 Git source control 기능을 제공하고, Terminal 문서는 integrated terminal이 standalone terminal처럼 명령을 실행한다고 설명한다. (출처: https://code.visualstudio.com/docs/sourcecontrol/overview, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## 해결하려는 문제
개발 환경 지도가 없으면 초보자는 "어디에 코드를 쓰는지", "어디에서 실행하는지", "어디에서 결과를 보는지", "어디에 변경 기록이 남는지"를 혼동한다. VS Code 문서는 Explorer가 파일과 폴더를 보여주고 editor가 열린 파일 내용을 보여준다고 설명한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
웹 개발은 브라우저에서 결과를 확인하지만, 개발 도구 설치와 로컬 테스트 서버가 별도 단계로 필요할 수 있다. MDN은 modern browsers와 local testing server를 초보 환경 설정의 learning outcomes에 포함한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
변경 기록을 Git 없이 파일 복사본 이름으로 관리하면 어떤 변경이 언제 왜 들어갔는지 추적하기 어렵다. Git 문서는 version control이 변경을 기록하고 특정 버전을 나중에 불러올 수 있게 한다고 설명한다. (출처: https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05)

## 핵심 개념
1. 에디터와 IDE: VS Code 문서는 자신을 code editor라고 설명하고, 왼쪽 Explorer와 오른쪽 editor layout을 제시한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
2. 파일 탐색: VS Code의 Explorer와 Side Bar는 프로젝트 파일과 폴더 맥락을 탐색하는 화면이다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
3. 브라우저: MDN은 modern web browsers를 설치 대상으로 제시하며, 웹 결과를 확인하는 도구로 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
4. 터미널: VS Code terminal 문서는 integrated terminal이 `mkdir`, `git` 같은 명령을 standalone terminal처럼 실행할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
5. 로컬 서버: MDN은 local testing server 설치를 초보 환경 설정의 learning outcome에 포함한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
6. Source Control: VS Code Source Control 문서는 staging, committing, branching, merge conflict resolution 같은 Git 작업을 통합 기능으로 제공한다고 설명한다. (출처: https://code.visualstudio.com/docs/sourcecontrol/overview, 확인: 2026-07-05)
7. Version Control: Git 문서는 version control을 파일 변경 기록과 특정 버전 회수 능력으로 정의한다. (출처: https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05)

## 관련 기술
- 개발 환경 vs 프로젝트 폴더: 개발 환경은 도구 묶음이고, 프로젝트 폴더는 실제 파일과 설정이 놓인 작업 단위다. VS Code는 folder 또는 project context를 Explorer와 UI layout으로 보여준다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
- 에디터 vs 터미널: 에디터는 파일 내용을 수정하는 UI이고, 터미널은 shell command를 실행하는 UI다. VS Code 문서는 editor와 integrated terminal을 별도 영역으로 설명한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
- 브라우저 vs 로컬 서버: 브라우저는 웹 결과를 표시하고, 로컬 서버는 개발 중인 파일을 HTTP 환경에서 테스트하게 한다. MDN은 modern browsers와 local testing server를 모두 환경 설정 대상으로 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
- Git vs VS Code Source Control: Git은 version control 시스템이고, VS Code Source Control은 Git 작업을 편집기 UI에서 다루게 하는 통합 인터페이스다. (출처: https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05; https://code.visualstudio.com/docs/sourcecontrol/overview, 확인: 2026-07-05)

## 선행 개념
없음. 이 KB는 입문자가 개발 도구의 역할을 처음 분리하기 위한 시작점이다. MDN 초보 환경 설정 문서도 기본 OS 친숙도를 전제로 code editor, browser, local testing server 설치를 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)

## 후행 개념
- files-folders-paths: 에디터와 터미널이 같은 프로젝트 폴더를 가리키는지 이해하려면 파일, 폴더, 경로 개념이 필요하다. VS Code terminal 문서는 terminal이 workspace root에서 시작한다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
- terminal-shell-commands: 빌드, 테스트, Git 같은 명령을 실행하려면 터미널과 셸 명령의 기본 문법을 알아야 한다. VS Code terminal getting started 문서는 코드를 작성하는 동안 build, test, deploy를 위해 shell commands를 실행해야 할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)

## AI 시대에서의 의미
AI 코딩 도구가 코드를 제안해도 사용자는 어느 파일을 수정했는지, 어떤 터미널 명령을 실행했는지, 브라우저에서 무엇을 확인했는지, Git 변경이 무엇인지 판단해야 한다. VS Code UI와 Source Control 문서는 파일 탐색, 편집, 변경 관리가 별도 화면과 기능으로 나뉜다고 설명한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05; https://code.visualstudio.com/docs/sourcecontrol/overview, 확인: 2026-07-05)
AI에게 "프로젝트를 실행해줘"라고 요청할 때도 local testing server, terminal command, browser verification 중 무엇을 요구하는지 명확히 해야 한다. MDN은 local testing server를 환경 설정 요소로 제시하고, VS Code 문서는 terminal이 build, test, deploy 명령을 실행하게 한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)

## 실무 활용
1. 프로젝트 시작 점검: 에디터에서 프로젝트 폴더를 열고, Explorer에서 파일을 확인하고, 터미널이 workspace root에서 시작하는지 확인한다. VS Code UI와 Terminal 문서에 근거한다. (근거: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
2. 웹 결과 확인: HTML/CSS/JS 학습에서는 browser와 local testing server를 준비하고 결과를 확인한다. MDN 환경 설정 문서에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)
3. 변경 기록 확인: 작업 전후 Git Source Control view 또는 Git 명령으로 변경을 확인하고 commit한다. Git version control 정의와 VS Code Source Control 문서에 근거한다. (근거: https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05; https://code.visualstudio.com/docs/sourcecontrol/overview, 확인: 2026-07-05)

```ts
type DevelopmentEnvironment = {
  editor: "VS Code" | string
  terminalShell: "PowerShell" | "bash" | "zsh" | string
  browser: "Chrome" | "Edge" | "Firefox" | string
  versionControl: "Git"
  localServer?: string
}
```

## FAQ
Q: 개발 환경은 한 번 설치하면 끝인가?
A: 아니다. MDN은 code editor, browsers, local testing server 같은 여러 도구를 환경 설정 요소로 다루며, VS Code는 Source Control과 terminal 같은 작업 영역을 계속 사용한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05; https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)

Q: 브라우저만 있으면 웹 개발을 할 수 있는가?
A: 브라우저는 결과 확인 도구지만, MDN은 code editor와 local testing server도 초보 환경 설정 항목으로 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)

Q: VS Code Source Control을 쓰면 Git 명령을 몰라도 되는가?
A: VS Code Source Control은 Git 작업을 UI로 제공하지만, Git 자체는 변경 기록을 관리하는 version control system이다. 기본 개념을 알아야 UI가 표시하는 staged, commit, diff, branch 의미를 이해할 수 있다. (출처: https://code.visualstudio.com/docs/sourcecontrol/overview, 확인: 2026-07-05; https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05)

Q: 터미널은 왜 필요한가?
A: VS Code 문서는 terminal이 build, test, deploy를 위한 shell commands를 실행할 수 있다고 설명한다. 웹 도구와 Git도 터미널 명령으로 실행되는 경우가 많다. (출처: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: VS Code 화면 전체를 "코드"라고 부른다. 왜 생기나: Explorer, editor, panel, terminal, source control이 한 앱 안에 있어서다. 교정: VS Code UI의 각 영역 역할을 나눠 부른다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
2. 실수: 터미널을 해커 전용 도구로 오해한다. 왜 생기나: 텍스트 명령 UI가 낯설기 때문이다. 교정: VS Code 문서처럼 build, test, deploy, Git 작업을 실행하는 일반 개발 도구로 이해한다. (출처: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)
3. 실수: 파일 저장과 Git commit을 같은 것으로 생각한다. 왜 생기나: 둘 다 "변경을 남긴다"는 느낌이 있기 때문이다. 교정: 저장은 파일 내용을 디스크에 쓰는 행위이고, Git commit은 version control 기록에 변경 묶음을 남기는 행위다. Git 문서는 version control이 변경을 기록해 특정 버전을 회수하게 한다고 설명한다. (출처: https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control, 확인: 2026-07-05)
4. 실수: 브라우저에서 보이면 배포된 것이라고 생각한다. 왜 생기나: 로컬 확인과 인터넷 공개를 구분하지 않아서다. 교정: MDN의 local testing server는 개발 중 로컬 테스트 환경이지 공개 배포 자체가 아니다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software, 확인: 2026-07-05)

## 공식 출처
- 단순 웹 개발 시작에는 code editor, modern browsers, local testing server가 필요하다 — [Installing basic software](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software) (확인: 2026-07-05)
- VS Code는 Explorer, editor, Side Bar, Panel, integrated terminal 등으로 구성된 code editor다 — [User interface](https://code.visualstudio.com/docs/getstarted/userinterface) (확인: 2026-07-05)
- VS Code integrated terminal은 `mkdir`, `git` 같은 명령을 standalone terminal처럼 실행할 수 있다 — [Terminal Basics](https://code.visualstudio.com/docs/terminal/basics) (확인: 2026-07-05)
- 개발 중 build, test, deploy를 위해 shell commands를 실행해야 할 수 있다 — [Getting started with the terminal](https://code.visualstudio.com/docs/terminal/getting-started) (확인: 2026-07-05)
- VS Code Source Control은 staging, committing, branching, merge conflict resolution을 다룬다 — [Source Control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview) (확인: 2026-07-05)
- Version control은 시간에 따른 파일 변경을 기록해 특정 버전을 회수하게 한다 — [About Version Control](https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control) (확인: 2026-07-05)

## Quote Bank
- > "code editor"
  - 출처: [Installing basic software](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software) (확인: 2026-07-05)
  - 맥락: 개발 환경의 첫 구성요소를 설명할 때 사용한다.
- > "modern web browsers"
  - 출처: [Installing basic software](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software) (확인: 2026-07-05)
  - 맥락: 결과 확인 도구로서 브라우저를 설명할 때 사용한다.
- > "local testing server"
  - 출처: [Installing basic software](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Installing_software) (확인: 2026-07-05)
  - 맥락: 로컬 실행과 배포를 구분할 때 사용한다.
- > "At its heart, Visual Studio Code is a code editor."
  - 출처: [User interface](https://code.visualstudio.com/docs/getstarted/userinterface) (확인: 2026-07-05)
  - 맥락: VS Code를 IDE처럼 느껴도 핵심 역할이 편집기임을 설명할 때 사용한다.
- > "integrated terminal"
  - 출처: [User interface](https://code.visualstudio.com/docs/getstarted/userinterface) (확인: 2026-07-05)
  - 맥락: 편집기 안에서 명령 실행 화면이 열리는 구조를 설명할 때 사용한다.
- > "records changes to a file or set of files"
  - 출처: [About Version Control](https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control) (확인: 2026-07-05)
  - 맥락: Git과 version control의 필요성을 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
