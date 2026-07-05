# 용어 초안: terminal-shell-basics-reference

## Terminal
- category: 개발 기초
- shortDefinition: shell을 host하고 텍스트 명령 입력과 출력을 보여주는 인터페이스
- explanation: Terminal은 command shell을 담는 text-based interface application입니다. VS Code integrated terminal처럼 편집기 안에 열릴 수도 있고 standalone terminal처럼 명령을 실행할 수도 있습니다. Terminal 화면과 내부 shell을 구분해야 현재 명령이 어떤 규칙으로 해석되는지 알 수 있습니다.
- related: ["Shell", "Integrated Terminal", "Command Line"]

## Shell
- category: 개발 기초
- shortDefinition: 사용자의 텍스트 입력을 평가하고 shell command 또는 OS 실행으로 넘기는 프로그램
- explanation: Shell은 keyboard input을 받아 evaluate하고 command를 실행하거나 operating system에 실행을 넘깁니다. PowerShell, Command Prompt, Git Bash, WSL 같은 profile은 서로 다른 shell 환경을 제공할 수 있으므로 AI가 제안한 명령을 실행하기 전 현재 shell을 확인해야 합니다.
- related: ["Terminal", "Shell Profile", "Command Output"]

## Command Line
- category: 개발 기초
- shortDefinition: 텍스트 명령을 입력해 개발 작업을 실행하는 상호작용 방식
- explanation: Command Line은 terminal 또는 shell에서 commands를 실행하는 텍스트 기반 작업 흐름입니다. Web development에서는 build, test, deploy, Git, package manager 작업이 command line으로 실행될 수 있습니다.
- related: ["Terminal", "Shell", "Basic Commands"]

## Current Directory
- category: 개발 기초
- shortDefinition: shell command가 기준으로 삼는 현재 폴더
- explanation: Current Directory는 명령이 상대 경로를 해석할 때 기준이 되는 위치입니다. VS Code integrated terminal은 workspace root에서 시작할 수 있지만 사용자가 위치를 바꾸면 명령의 기준도 달라집니다. 명령 실행 전 current directory 확인은 터미널 검증의 첫 단계입니다.
- related: ["File Path", "Terminal", "Shell Command"]

## Shell Profile
- category: 개발 기초
- shortDefinition: VS Code terminal 같은 환경에서 선택되는 PowerShell, Command Prompt, Git Bash, WSL 등의 shell 종류
- explanation: Shell Profile은 같은 terminal UI 안에서 어떤 shell을 사용할지 정하는 설정입니다. VS Code Terminal Basics는 PowerShell, Command Prompt, Git Bash, WSL 같은 profile을 설명합니다. Shell profile이 다르면 같은 의도의 명령도 문법과 출력이 달라질 수 있습니다.
- related: ["Shell", "PowerShell Cmdlet", "Terminal"]

## Basic Commands
- category: 개발 기초
- shortDefinition: 파일, 폴더, 검색, 이동, 복사 같은 기본 작업을 terminal에서 수행하는 명령 묶음
- explanation: Basic Commands는 MDN command line crash course가 다루는 `cd`, `ls`, `mkdir`, `touch`, `grep`, `cat`, `mv`, `cp` 같은 입문 명령 묶음입니다. 세부 옵션 암기보다 current directory, shell, path와 연결해 이해하는 것이 먼저입니다.
- related: ["Command Line", "Current Directory", "File Path"]

## PowerShell Cmdlet
- category: 개발 기초
- shortDefinition: PowerShell에서 Verb-Noun pair 이름을 갖는 command
- explanation: PowerShell Cmdlet은 Microsoft Learn이 설명하는 PowerShell command 형태입니다. `Get-Location`, `Get-ChildItem`, `Set-Location`, `Get-Command`처럼 Verb-Noun 이름을 사용해 command가 하는 일을 읽기 쉽게 만듭니다.
- related: ["PowerShell", "Shell", "Shell Profile"]

## Command Output
- category: 개발 기초
- shortDefinition: shell command 실행 후 terminal에 나타나는 결과와 오류 메시지
- explanation: Command Output은 명령 실행의 증거입니다. AI에게 오류를 물어볼 때는 command, current directory, shell, output summary를 함께 제공해야 문제 원인을 더 잘 나눌 수 있습니다.
- related: ["Terminal", "Verification", "Shell Command"]

