## 한 줄 정의

터미널은 텍스트 명령을 입력하는 화면이고, 셸은 그 명령을 해석하고 실행하는 프로그램입니다. Microsoft Learn은 command shell을 컴퓨터와 상호작용하기 위한 text-based interface로 설명하고, terminal은 command shells를 host하는 text-based interface application으로 설명합니다. 이 둘을 구분하면 "어느 화면에서 입력했는가"와 "어느 규칙으로 해석되었는가"를 나눌 수 있습니다.

터미널·셸 기본 명령 레퍼런스는 개발자가 프로젝트 폴더에서 위치를 확인하고, 파일과 폴더를 탐색하고, build, test, deploy, Git 같은 작업을 실행할 때 쓰는 최소 명령 체계를 정리하는 문서입니다. MDN은 web development 과정에서 terminal 또는 command line에 명령을 실행해야 할 것이라고 설명하고, `cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp` 같은 basic commands를 제시합니다. VS Code 문서는 integrated terminal이 workspace root에서 시작하고 `mkdir`, `git` 같은 명령을 standalone terminal처럼 실행할 수 있다고 설명합니다.

이 강의의 핵심은 ==명령어를 외우기 전에 current directory와 shell 종류를 먼저 확인하는 것==입니다. 같은 의도라도 PowerShell, Command Prompt, Git Bash, WSL 같은 profile에 따라 문법과 출력이 달라질 수 있습니다. AI가 명령을 제안하거나 실행했다고 말할 때도 사용자는 어떤 shell에서, 어떤 folder 기준으로, 어떤 command가 실행되었는지 확인해야 합니다.

![터미널 명령 실행 흐름](/lesson-diagrams/terminal-shell-basics-reference/terminal-command-flow.svg)

## 왜 존재하는가

웹 개발은 화면만 만드는 작업처럼 보이지만, 실제로는 많은 개발 작업이 명령으로 실행됩니다. VS Code terminal getting started 문서는 코드를 작성하는 동안 build, test, deploy를 위해 shell commands를 실행해야 할 수 있다고 설명합니다. 즉 terminal은 초보자에게 선택적 고급 도구가 아니라, 프로젝트를 실행하고 검증하고 배포하는 기본 통로입니다.

터미널 기본기가 필요한 첫 번째 이유는 현재 위치 때문입니다. 파일·폴더·경로 강의에서 배운 것처럼 파일은 path를 가지고, 명령은 어떤 폴더를 기준으로 실행되는지에 따라 결과가 달라질 수 있습니다. VS Code integrated terminal이 workspace root에서 시작한다는 설명은 "터미널이 프로젝트 맥락을 가진다"는 뜻입니다. 그러나 사용자가 `cd`로 다른 위치로 이동하면 명령의 기준도 바뀝니다.

두 번째 이유는 shell 차이입니다. VS Code Terminal Basics는 profiles에 PowerShell, Command Prompt, Git Bash, WSL 같은 shell이 포함된다고 설명합니다. Microsoft Learn은 Windows에 Command shell과 PowerShell이라는 command-line shells가 있다고 설명합니다. AI가 Linux/macOS 스타일 명령을 제안했는데 사용자는 Windows PowerShell을 쓰고 있다면 그대로 붙여넣기 전에 현재 shell에 맞는지 확인해야 합니다.

세 번째 이유는 오류 메시지를 읽기 위해서입니다. Shell은 keyboard input을 받아 evaluate하고 shell command로 실행하거나 operating system에 실행을 넘깁니다. 명령이 실패했을 때 terminal output은 실패의 흔적이 아니라 문제를 설명하는 자료입니다. "명령이 실패했다"에서 멈추면 AI에게도 좋은 질문을 할 수 없습니다. 어떤 명령을 어느 위치에서 실행했고, 어떤 output이 나왔는지를 전달해야 합니다.

> [!KEY]
> 터미널 학습의 첫 질문은 "무슨 명령을 외울까"가 아니라 "지금 어떤 shell이고, 현재 위치가 어디이며, 이 명령은 무엇을 실행하려 하는가"입니다.

## 작동 원리

### 1. Terminal은 shell을 담는 화면입니다

Microsoft Learn은 terminal을 command shells를 host하는 text-based interface application으로 설명합니다. 즉 terminal은 사용자가 입력하고 결과를 보는 화면입니다. VS Code integrated terminal도 이런 terminal UI입니다. 편집기 안에 열리지만 standalone terminal처럼 명령을 실행할 수 있습니다.

이 구분이 중요한 이유는 terminal 화면이 같아 보여도 내부 shell이 다를 수 있기 때문입니다. VS Code profile이 PowerShell인지 Command Prompt인지 Git Bash인지에 따라 명령 해석 방식이 달라질 수 있습니다. 초보자는 화면 색이나 위치보다 profile 이름과 prompt를 먼저 확인해야 합니다.

### 2. Shell은 입력을 평가하고 실행합니다

Microsoft Learn은 shell이 keyboard input을 받아 evaluate하고, shell command로 실행하거나 operating system에 실행을 넘긴다고 설명합니다. 사용자가 한 줄을 입력하면 shell은 그것을 해석합니다. 명령 이름, 인자, 옵션, 경로, 실행할 프로그램을 판단합니다.

PowerShell은 command-line shell이면서 scripting language 기능도 가질 수 있습니다. KB는 Microsoft Learn이 shell이 script file commands를 읽고 variables, flow control, functions 같은 programming features를 포함할 수 있다고 설명한다고 정리합니다. 이 강의에서는 scripting language 세부를 깊게 다루지 않지만, shell이 단순 입력창보다 더 많은 규칙을 가진다는 점을 기억해야 합니다.

### 3. Current directory가 명령의 기준이 됩니다

VS Code Terminal Basics는 integrated terminal이 workspace root에서 시작한다고 설명합니다. workspace root는 프로젝트 작업의 기준이 되는 폴더입니다. 명령은 이 현재 위치를 기준으로 파일을 찾거나 새 폴더를 만들 수 있습니다. 그래서 명령 실행 전에는 현재 위치를 확인해야 합니다.

파일·폴더·경로 강의와 연결하면 이유가 명확합니다. 파일 이름만으로는 충분하지 않습니다. 현재 directory가 다르면 같은 relative path도 다른 파일을 가리킬 수 있습니다. AI가 "터미널에서 실행하세요"라고 제안했을 때도, 먼저 프로젝트 루트에서 실행하는 명령인지 확인해야 합니다.

### 4. Basic commands는 위치와 파일 작업의 기본 어휘입니다

MDN command line crash course는 `cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp` 같은 명령을 basic commands로 제시합니다. 이 강의에서는 이 목록을 레퍼런스의 중심으로 삼습니다. 이 명령들의 세부 옵션을 모두 외우는 것이 목표가 아니라, 어떤 종류의 작업이 terminal에서 일어나는지 분류하는 것이 목표입니다.

기본 명령은 크게 위치 이동, 목록 확인, 파일·폴더 생성, 내용 확인, 검색, 이동, 복사로 묶어 생각할 수 있습니다. 이 분류는 MDN 목록과 파일·폴더·경로 강의의 선행 개념을 연결한 학습 구조입니다. 명령 세부는 shell과 운영체제에 따라 달라질 수 있으므로 실제 사용 전 현재 shell 문서를 확인해야 합니다.

### 5. PowerShell cmdlet은 Verb-Noun 이름을 가집니다

Microsoft Learn Discover PowerShell 문서는 PowerShell commands를 cmdlets라고 부르고, 이름이 Verb-Noun pair로 구성된다고 설명합니다. 예를 들어 KB의 실무 예시에는 `Get-Location`, `Get-ChildItem`, `Set-Location`, `Get-Command`가 들어 있습니다. `Get-`은 정보를 얻는 동작이고, 뒤의 명사는 대상입니다.

이 naming은 PowerShell을 처음 배우는 사람에게 큰 힌트를 줍니다. `Get-Command -Verb Get`처럼 명령을 찾는 방식도 KB에 포함되어 있습니다. AI가 PowerShell 명령을 제안했을 때 `Verb-Noun` 구조를 보면 어떤 일을 하려는지 추정할 수 있습니다.

### 6. VS Code integrated terminal은 프로젝트 루프에 들어갑니다

VS Code terminal은 editor와 같은 작업 화면 안에 있습니다. 사용자는 editor에서 파일을 수정하고, integrated terminal에서 build, test, deploy 또는 Git 명령을 실행하고, 결과를 읽습니다. VS Code 문서가 `mkdir`, `git` 같은 명령 실행을 설명하는 이유도 이 흐름 때문입니다.

AI 코딩에서도 이 루프는 유지됩니다. AI가 파일을 고친 뒤 "테스트를 실행했다"고 말하면, 사용자는 terminal output을 보고 실제 어떤 command가 실행되었는지 확인합니다. "실행했다"는 문장은 output과 command가 함께 있어야 검증 가능합니다.

> [!WARNING]
> AI가 제안한 명령을 그대로 붙여넣기 전에 현재 shell과 current directory를 확인하세요. KB 기준으로 VS Code는 여러 shell profile을 지원하고, shell에 따라 같은 의도도 문법이 달라질 수 있습니다.

## 스펙과 세부

### Terminal vs Shell

Terminal은 shell을 host하는 UI입니다. Shell은 입력을 evaluate하고 command를 실행하는 프로그램입니다. Microsoft Learn은 이 둘을 분리해 설명합니다. 따라서 "터미널이 이상하다"라는 말은 정확하지 않을 수 있습니다. 화면 문제인지, shell profile 문제인지, command 문제인지 나누어 봐야 합니다.

### Command Line

MDN은 terminal 또는 command line에 commands를 실행해야 할 것이라고 설명합니다. Command line은 텍스트 기반 명령 입력 흐름을 가리키는 학습 용어로 이해할 수 있습니다. 이 강의에서는 terminal 화면과 shell 해석기, command line 입력을 함께 다루되, 역할을 분리해 설명합니다.

### Current Directory

Current directory는 명령이 기준으로 삼는 현재 폴더입니다. VS Code integrated terminal은 workspace root에서 시작할 수 있지만, 사용자가 위치를 바꿀 수 있습니다. 명령 실패의 많은 원인은 "명령 자체"가 아니라 "어느 위치에서 실행했는가"와 연결됩니다.

### Basic Command Reference

아래 표는 KB가 보증하는 기본 명령 목록을 학습용으로 분류한 것입니다. 세부 옵션은 shell과 문서에 따라 확인해야 합니다.

| 묶음 | 명령 | 학습 목적 |
|---|---|---|
| 위치 | `cd` | 현재 directory를 바꾸는 명령으로 이해합니다. |
| 목록 | `ls` | 현재 위치의 파일과 폴더를 확인하는 명령 묶음으로 이해합니다. |
| 생성 | `mkdir`, `touch` | 폴더나 파일을 만드는 기본 명령 묶음으로 이해합니다. |
| 내용 | `cat` | 파일 내용을 terminal에서 확인하는 명령 묶음으로 이해합니다. |
| 검색 | `grep` | 텍스트 검색을 terminal에서 수행하는 명령 묶음으로 이해합니다. |
| 이동·복사 | `mv`, `cp` | 파일이나 폴더 위치를 바꾸거나 복제하는 명령 묶음으로 이해합니다. |

### PowerShell Reference

KB의 PowerShell 예시는 다음 네 명령을 포함합니다.

```powershell
Get-Location
Get-ChildItem
Set-Location .\src
Get-Command -Verb Get
```

이 예시는 PowerShell cmdlet의 Verb-Noun 구조를 보여줍니다. `Get-Location`과 `Get-ChildItem`은 현재 위치와 항목을 확인하는 방향이고, `Set-Location`은 위치를 바꾸는 방향입니다. `Get-Command -Verb Get`은 Get 계열 명령을 탐색하는 예입니다. 이 설명은 KB의 예시와 Microsoft Learn의 Verb-Noun pair 원칙에 근거합니다.

### 실행 가능한 명령 기록 구조

```ts
type ShellProfile = "PowerShell" | "Command Prompt" | "Git Bash" | "WSL" | string

type CommandRun = {
  shell: ShellProfile
  currentDirectory: string
  command: string
  purpose: "build" | "test" | "deploy" | "git" | "file-task"
  outputSummary: string
}

const run: CommandRun = {
  shell: "PowerShell",
  currentDirectory: "D:\\Ai_Vibe_Coding_Master",
  command: "npm run verify",
  purpose: "test",
  outputSummary: "lint, typecheck, test, build 순서로 실행",
}

console.log(`${run.shell}: ${run.command}`)
```

이 코드는 shell command를 실행하지 않습니다. 대신 AI 시대에 명령 실행을 기록할 때 어떤 정보를 남겨야 하는지 보여줍니다. shell, current directory, command, purpose, output summary가 함께 있어야 나중에 검증할 수 있습니다.

## 원문으로 읽기

> "terminal"
>
> — 터미널.
> [Command line crash course — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

이 짧은 인용은 web development 학습에서 terminal이 기본 주제로 등장한다는 점을 보여줍니다. 초보자는 terminal을 무서운 고급 도구로 보기 쉽지만, MDN은 기본 환경 설정과 함께 command line을 학습 대상으로 제시합니다.

> "essential commands"
>
> — 필수 명령.
> [Command line crash course — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)

이 인용은 기본 명령 레퍼런스의 필요성을 보여줍니다. 개발자는 모든 명령을 한 번에 외우지 않아도 됩니다. 먼저 essential commands의 역할을 분류하고, 현재 위치와 shell을 확인하며, 필요한 명령을 문서로 찾아가는 습관이 중요합니다.

> "run commands such as mkdir and git"
>
> — mkdir과 git 같은 명령을 실행한다.
> [Terminal Basics — VS Code Docs](https://code.visualstudio.com/docs/terminal/basics)

이 문장은 VS Code integrated terminal의 실무 위치를 보여줍니다. 편집기 안에서 파일 작업 명령과 Git 명령을 실행할 수 있습니다. 따라서 terminal은 editor와 분리된 낯선 세계가 아니라 같은 프로젝트 작업 루프의 일부입니다.

관련 원문(링크): [Getting started with the terminal — VS Code Docs](https://code.visualstudio.com/docs/terminal/getting-started)

개발자가 terminal을 배우는 이유가 여기에 있습니다. 코드를 작성하는 것만으로 끝나지 않고, build하고 test하고 deploy하는 단계가 필요합니다. 이 세 단어는 뒤의 package manager, CI/CD, 배포 강의로 이어지는 다리입니다.

관련 원문(링크): [What is a command shell? — Microsoft Learn](https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules)

Microsoft Learn의 이 표현은 shell과 terminal을 시각적 버튼 UI가 아니라 텍스트 기반 상호작용으로 이해하게 합니다. 텍스트 입력은 불친절해 보일 수 있지만, 정확한 명령과 output을 남기기 때문에 AI와의 협업에서도 강력한 증거가 됩니다.

관련 원문(링크): [Discover PowerShell — Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6)

PowerShell cmdlet을 읽는 핵심입니다. `Get-Location`, `Get-ChildItem`, `Set-Location`처럼 이름 자체가 동작과 대상을 드러냅니다. AI가 PowerShell 명령을 제안할 때도 이 구조를 보면 명령 의도를 더 빨리 파악할 수 있습니다.

## 실전에서

### 패턴 1: 명령 실행 전 세 가지를 확인합니다

첫째, 어떤 shell인지 확인합니다. PowerShell인지 Command Prompt인지 Git Bash인지에 따라 문법이 다를 수 있습니다. 둘째, current directory를 확인합니다. 프로젝트 루트인지, 하위 폴더인지에 따라 relative path가 달라집니다. 셋째, 실행하려는 command의 목적을 확인합니다. 파일 작업인지, Git인지, build인지, test인지 구분합니다.

> [!TIP]
> AI에게 터미널 오류를 물어볼 때는 shell, current directory, 실행한 command, output summary를 함께 전달하세요. 그러면 AI가 명령 해석 문제와 프로젝트 상태 문제를 더 잘 나눌 수 있습니다.

### 패턴 2: VS Code integrated terminal을 작업 루프에 넣습니다

VS Code에서 파일을 수정한 뒤 integrated terminal에서 명령을 실행합니다. build, test, deploy 같은 작업은 terminal로 이어질 수 있습니다. output을 보고 다시 editor로 돌아와 파일을 고칩니다. 이 루프는 개발 환경 지도 강의의 editor-terminal-browser-Git 흐름과 연결됩니다.

### 패턴 3: PowerShell에서는 cmdlet 이름을 읽습니다

PowerShell 명령은 Verb-Noun pair를 사용합니다. `Get-Command`는 command를 얻거나 탐색하는 방향으로 읽을 수 있습니다. `Set-Location`은 location을 설정하는 방향입니다. 명령 이름을 읽는 힘이 생기면 낯선 명령도 무작정 복사하지 않고 의도를 먼저 판단할 수 있습니다.

### 패턴 4: 기본 명령을 파일·폴더·경로와 함께 배웁니다

`cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp`는 path 이해와 분리할 수 없습니다. 현재 위치, 상대 경로, 파일 이름, 폴더 구조를 알아야 명령이 어디에 영향을 주는지 이해할 수 있습니다. 그래서 이 강의의 선행 개념은 files-folders-paths입니다.

### 패턴 5: output을 학습 자료로 남깁니다

명령 결과는 단순 성공/실패 표시가 아닙니다. AI와 협업할 때는 output이 검증 자료가 됩니다. 어떤 명령을 실행했는지, 어떤 error가 나왔는지, 어떤 단계에서 멈췄는지 기록하면 다음 요청의 품질이 올라갑니다.

## 한계와 트레이드오프

첫 번째 한계는 shell별 문법 차이입니다. 이 강의는 KB가 보증하는 수준에서 terminal, shell, PowerShell, basic commands를 정리합니다. 그러나 각 명령의 모든 옵션과 OS별 차이는 다루지 않습니다. 실제 사용 시에는 현재 shell 문서를 확인해야 합니다.

두 번째 한계는 명령어 암기의 유혹입니다. 초보자는 명령 목록을 외우면 터미널을 배운 것처럼 느낄 수 있습니다. 하지만 현재 위치와 shell을 모르면 외운 명령도 위험합니다. 명령어 암기보다 실행 맥락 이해가 먼저입니다.

세 번째 한계는 AI가 제안한 명령의 위험입니다. AI는 사용자의 OS와 shell을 정확히 모를 수 있습니다. VS Code profiles가 여러 shell을 지원한다는 사실과 Microsoft Learn의 Command shell/PowerShell 구분을 기억해야 합니다. 같은 명령처럼 보여도 현재 환경에 맞지 않을 수 있습니다.

네 번째 한계는 output 해석입니다. Shell이 input을 evaluate하고 command를 실행한다는 설명은 output이 진단 자료라는 뜻이기도 합니다. 그러나 output을 해석하려면 파일 경로, package manager, Git, build tool 같은 후속 개념이 필요합니다. 이 강의는 그 출발점입니다.

다섯 번째 한계는 reference형 강의의 범위입니다. 이 문서는 basic commands의 방향을 잡지만, `git`, `npm`, 배포 CLI 같은 전문 명령은 별도 reference 강의로 나누어 다룹니다. 터미널은 모든 명령의 실행 장소일 수 있지만, 각 명령군의 의미는 따로 배워야 합니다.

==터미널 실력은 빠르게 타이핑하는 능력이 아니라, 명령의 실행 맥락과 결과 증거를 정확히 다루는 능력입니다.== 이 능력이 생기면 AI가 실행한 명령도 더 안전하게 검증할 수 있습니다.

## 더 읽기

먼저 MDN Command line crash course를 읽어 terminal, essential commands, command chaining, CLI tools가 왜 web development 학습에 포함되는지 확인하세요. 그 다음 VS Code Terminal Basics를 읽으며 integrated terminal이 workspace root에서 시작하고 `mkdir`, `git` 같은 명령을 실행할 수 있음을 확인합니다. VS Code Getting started with the terminal은 build, test, deploy가 terminal로 이어지는 이유를 보여줍니다. Windows 사용자는 Microsoft Learn의 Windows commands와 command shell 설명, Discover PowerShell을 함께 읽어 Command shell, PowerShell, cmdlet naming을 구분하세요.

- [Command line crash course — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line)
- [Terminal Basics — VS Code Docs](https://code.visualstudio.com/docs/terminal/basics)
- [Getting started with the terminal — VS Code Docs](https://code.visualstudio.com/docs/terminal/getting-started)
- [Windows commands — Microsoft Learn](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands)
- [What is a command shell? — Microsoft Learn](https://learn.microsoft.com/en-us/powershell/utility-modules/aishell/concepts/what-is-a-command-shell?view=ps-modules)
- [Discover PowerShell — Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/discover-powershell?view=powershell-7.6)

읽을 때는 여섯 질문을 기준으로 보세요. 지금 terminal은 어떤 shell을 host하는가. current directory는 어디인가. 명령이 파일 작업인지, Git인지, build/test/deploy인지 무엇을 하려는가. output은 어떤 증거를 제공하는가. PowerShell 명령은 Verb-Noun 구조로 읽히는가. AI가 제안한 명령은 현재 shell과 OS에 맞는가. 이 질문들이 잡히면 package manager와 Git reference로 넘어갈 준비가 됩니다.
