---
id: terminal-shell-commands
title: "Terminal, Shell, and Basic Commands (터미널·셸 기본 명령)"
topicGroup: T01
status: approved
score: 88
level: 기초
prerequisites: [files-folders-paths]
successors: [package-json-semver, git-basics]
related: [dev-environment-map, files-folders-paths]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Command line crash course", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line", checked: 2026-07-05 }
  - { title: "Terminal Basics", url: "https://code.visualstudio.com/docs/terminal/basics", checked: 2026-07-05 }
  - { title: "Getting started with the terminal", url: "https://code.visualstudio.com/docs/terminal/getting-started", checked: 2026-07-05 }
  - { title: "Windows commands", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands", checked: 2026-07-05 }
  - { title: "What is a command shell?", url: "https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules", checked: 2026-07-05 }
  - { title: "Discover PowerShell", url: "https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
터미널은 텍스트 명령으로 컴퓨터와 상호작용하는 화면이고, 셸은 그 명령을 해석해 실행하는 프로그램이다. Microsoft Learn은 command shell을 text-based interface for interacting with a computer라고 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)
MDN은 web development 과정에서 terminal 또는 command line에 명령을 실행해야 할 것이라고 설명하고, `cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp` 같은 basic commands를 학습 대상으로 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)

## 역사
Windows에는 Command shell과 PowerShell이라는 command-line shells가 있으며, Microsoft Learn은 각 shell이 operating system 또는 application과 직접 communication하는 software program이라고 설명한다. (출처: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands, 확인: 2026-07-05)
PowerShell은 Command shell의 기능을 확장하기 위해 설계되었고, cmdlets라는 PowerShell commands를 실행한다. Microsoft Learn은 PowerShell이 Windows Commands와 PowerShell cmdlets를 모두 실행할 수 있다고 설명한다. (출처: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands, 확인: 2026-07-05)
VS Code는 integrated terminal을 제공하며, 이 terminal은 workspace root에서 시작하고 standalone terminal처럼 `mkdir`, `git` 같은 명령을 실행할 수 있다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## 해결하려는 문제
개발 도구는 build, test, deploy, Git, package manager 같은 작업을 명령으로 실행하는 경우가 많다. VS Code terminal getting started 문서는 코드를 작성하는 동안 build, test, deploy를 위해 shell commands를 실행해야 할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)
GUI만 알면 현재 폴더, 파일 생성, 파일 이동, 명령 결과, 실패 메시지를 정확히 추적하기 어렵다. MDN command line 문서는 terminal introduction, essential commands, command chaining, CLI tools를 다룬다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)
PowerShell과 Command Prompt, Git Bash, WSL 같은 shell이 다르면 같은 의도도 문법이 달라질 수 있다. VS Code Terminal Basics는 profiles에 PowerShell, Command Prompt, Git Bash, WSL 같은 shell이 포함된다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## 핵심 개념
1. Terminal: Microsoft Learn은 terminal을 command shells를 host하는 text-based interface application으로 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)
2. Shell: Microsoft Learn은 shell이 keyboard input을 받아 evaluate하고 shell command로 실행하거나 OS에 실행을 넘긴다고 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)
3. Command line: MDN은 terminal 또는 command line에 commands를 실행해야 할 것이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)
4. Current directory: VS Code Terminal Basics는 integrated terminal이 workspace root에서 시작한다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
5. Basic commands: MDN은 `cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp` 같은 명령을 basic commands로 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)
6. PowerShell cmdlets: Microsoft Learn은 PowerShell commands를 cmdlets라고 부르고 Verb-Noun pair로 이름이 구성된다고 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6, 확인: 2026-07-05)
7. Integrated terminal: VS Code Terminal Basics는 integrated terminal이 standalone terminal처럼 `mkdir`, `git` 명령을 실행할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## 관련 기술
- Terminal vs shell: terminal은 shell을 host하는 UI이고, shell은 명령을 평가하고 실행하는 프로그램이다. Microsoft Learn은 이 둘을 분리해 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)
- PowerShell vs Command shell: Microsoft Learn은 Windows에 Command shell과 PowerShell이 있으며, PowerShell은 cmdlets를 실행하고 Windows Commands도 실행할 수 있다고 설명한다. (출처: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands, 확인: 2026-07-05)
- Shell command vs programming language: shell command는 OS나 application 작업을 실행하는 명령이고, PowerShell은 command-line shell이면서 scripting language 기능을 제공한다. Microsoft Learn은 shell이 script file commands를 읽고 variables, flow control, functions 같은 programming features를 포함할 수 있다고 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)
- Terminal commands vs Git commands: `git`은 terminal에서 실행할 수 있는 command 중 하나다. VS Code Terminal Basics는 integrated terminal이 `git` 명령을 standalone terminal처럼 실행할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## 선행 개념
- files-folders-paths: terminal command는 현재 폴더와 path를 기준으로 작동하므로 파일, 폴더, 경로를 먼저 이해해야 한다. MDN basic commands에는 directory 이동과 파일 조작 명령이 포함된다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)

## 후행 개념
- package-json-semver: `npm install`, `npm run` 같은 package manager 명령은 terminal command 이해를 전제로 한다. VS Code terminal getting started 문서는 build, test, deploy를 위해 shell commands를 실행해야 할 수 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)
- git-basics: Git 명령은 terminal에서 실행할 수 있으며, VS Code Terminal Basics는 `git`을 integrated terminal command 예로 든다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

## AI 시대에서의 의미
AI 코딩 도구가 "명령을 실행했다"고 말할 때, 사용자는 어떤 shell에서 어떤 current directory 기준으로 어떤 command가 실행되었는지 확인해야 한다. Microsoft Learn은 shell이 keyboard input을 evaluate하고 실행한다고 설명하고, VS Code는 integrated terminal이 workspace root에서 시작한다고 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
AI가 제안한 명령은 OS와 shell에 따라 달라질 수 있다. VS Code Terminal Basics는 PowerShell, Command Prompt, Git Bash, WSL 같은 profiles를 설명하고, Microsoft Learn은 Windows에 Command shell과 PowerShell이 있다고 설명한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05; https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands, 확인: 2026-07-05)

## 실무 활용
1. 위치 확인: 명령 실행 전 current directory를 확인하고, 필요한 폴더로 이동한다. MDN command line 문서의 `cd`, `ls` 학습 항목과 VS Code workspace root 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
2. 프로젝트 명령 실행: build, test, deploy 명령을 terminal에서 실행하고 결과 메시지를 읽는다. VS Code getting started with terminal 문서에 근거한다. (근거: https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)
3. PowerShell 명령 탐색: `Get-Command` 같은 Verb-Noun 형태의 cmdlet을 사용해 명령을 찾고 실행한다. Microsoft Learn Discover PowerShell 문서에 근거한다. (근거: https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6, 확인: 2026-07-05)

```powershell
Get-Location
Get-ChildItem
Set-Location .\src
Get-Command -Verb Get
```

## FAQ
Q: 터미널과 셸은 같은 말인가?
A: 아니다. Microsoft Learn은 terminal을 shell을 host하는 text-based interface application으로, shell을 input을 evaluate하고 command를 실행하는 프로그램으로 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)

Q: VS Code terminal은 별도 프로그램인가?
A: VS Code Terminal Basics는 integrated terminal이 standalone terminal처럼 command를 실행할 수 있다고 설명한다. 편집기 안에 열리는 terminal UI로 이해할 수 있다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)

Q: PowerShell 명령은 왜 `Get-Process`처럼 생겼는가?
A: Microsoft Learn은 PowerShell commands를 cmdlets라고 부르고, 이름이 Verb-Noun pair로 구성되어 command가 하는 일을 이해하고 찾기 쉽게 한다고 설명한다. (출처: https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6, 확인: 2026-07-05)

Q: 초보자가 꼭 터미널을 배워야 하는가?
A: MDN은 web development 과정에서 terminal 또는 command line에 commands를 실행해야 할 것이라고 설명하고, VS Code는 build, test, deploy를 위해 shell commands를 실행할 수 있다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05; https://code.visualstudio.com/docs/terminal/getting-started, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: terminal, shell, PowerShell, command prompt를 모두 같은 말로 쓴다. 왜 생기나: 화면상 모두 텍스트 명령처럼 보이기 때문이다. 교정: terminal은 host UI, shell은 명령 해석기, PowerShell과 Command shell은 Windows shell 종류로 구분한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05; https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands, 확인: 2026-07-05)
2. 실수: 명령을 아무 위치에서나 실행해도 된다고 생각한다. 왜 생기나: current directory 개념을 모른다. 교정: VS Code terminal이 workspace root에서 시작한다는 점과 MDN의 directory 이동 명령을 함께 학습한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05; https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)
3. 실수: AI가 준 Linux/macOS 명령을 Windows PowerShell에 그대로 붙여넣는다. 왜 생기나: shell별 문법 차이를 모른다. 교정: VS Code profiles가 PowerShell, Command Prompt, Git Bash, WSL을 구분한다는 점을 확인하고 현재 shell에 맞는 명령을 사용한다. (출처: https://code.visualstudio.com/docs/terminal/basics, 확인: 2026-07-05)
4. 실수: 오류 메시지를 읽지 않고 같은 명령을 반복한다. 왜 생기나: terminal output을 "실패"로만 보고 정보로 보지 않는다. 교정: command가 어디에서 무엇을 실행했는지와 output을 함께 읽는다. Shell이 input을 evaluate하고 command를 실행한다는 Microsoft Learn 설명에 근거한다. (출처: https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules, 확인: 2026-07-05)

## 공식 출처
- MDN은 web development 과정에서 terminal 또는 command line commands를 실행해야 할 것이라고 설명한다 — [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) (확인: 2026-07-05)
- VS Code integrated terminal은 workspace root에서 시작하고 `mkdir`, `git` 같은 commands를 실행할 수 있다 — [Terminal Basics](https://code.visualstudio.com/docs/terminal/basics) (확인: 2026-07-05)
- VS Code terminal은 build, test, deploy를 위한 shell commands를 실행하게 한다 — [Getting started with the terminal](https://code.visualstudio.com/docs/terminal/getting-started) (확인: 2026-07-05)
- Windows에는 Command shell과 PowerShell이 있으며, PowerShell은 cmdlets를 실행한다 — [Windows commands](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands) (확인: 2026-07-05)
- Command shell은 computer와 상호작용하는 text-based interface이고, terminal은 shell을 host한다 — [What is a command shell?](https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules) (확인: 2026-07-05)
- PowerShell cmdlet 이름은 Verb-Noun pair로 구성된다 — [Discover PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6) (확인: 2026-07-05)

## Quote Bank
- > "terminal"
  - 출처: [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) (확인: 2026-07-05)
  - 맥락: 초보자에게 command line과 terminal 용어를 소개할 때 사용한다.
- > "essential commands"
  - 출처: [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line) (확인: 2026-07-05)
  - 맥락: 기본 명령 레퍼런스의 필요성을 설명할 때 사용한다.
- > "run commands such as mkdir and git"
  - 출처: [Terminal Basics](https://code.visualstudio.com/docs/terminal/basics) (확인: 2026-07-05)
  - 맥락: 터미널에서 파일 작업과 Git을 실행할 수 있음을 설명할 때 사용한다.
- > "build, test, or deploy"
  - 출처: [Getting started with the terminal](https://code.visualstudio.com/docs/terminal/getting-started) (확인: 2026-07-05)
  - 맥락: 개발자가 terminal을 쓰는 이유를 설명할 때 사용한다.
- > "text-based interface"
  - 출처: [What is a command shell?](https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules) (확인: 2026-07-05)
  - 맥락: shell의 기본 정의를 설명할 때 사용한다.
- > "Verb-Noun pair"
  - 출처: [Discover PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6) (확인: 2026-07-05)
  - 맥락: PowerShell cmdlet naming을 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)
