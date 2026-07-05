# 용어 초안: development-environment-map

## Development Environment
- category: 개발 기초
- shortDefinition: 코드를 작성, 실행, 확인, 기록하기 위해 함께 쓰는 도구들의 작업 구조
- explanation: Development Environment는 code editor, terminal, browser, local testing server, version control처럼 개발자가 하나의 프로젝트를 다룰 때 사용하는 도구 묶음입니다. 핵심은 설치 목록이 아니라 역할 분리입니다. 파일은 editor에서 수정하고, 명령은 terminal에서 실행하고, 웹 결과는 browser에서 확인하고, 변경 기록은 Git 같은 version control로 남깁니다.
- related: ["Code Editor", "Integrated Terminal", "Version Control"]

## Code Editor
- category: 개발 기초
- shortDefinition: 코드 파일의 내용을 읽고 수정하는 편집 도구
- explanation: Code Editor는 프로젝트 파일을 열고 텍스트를 수정하는 도구입니다. VS Code 문서는 자신을 핵심적으로 code editor라고 설명합니다. Terminal, Source Control 같은 기능이 함께 있어도 editor의 기본 역할은 열린 파일의 내용을 바꾸는 것입니다.
- related: ["Development Environment", "VS Code Explorer", "Source Control View"]

## VS Code Explorer
- category: 개발 기초
- shortDefinition: VS Code에서 프로젝트의 파일과 폴더 구조를 보여주는 탐색 영역
- explanation: VS Code Explorer는 접근 가능한 files and folders를 보여주는 UI입니다. Explorer에서 파일을 찾는 일과 editor에서 파일 내용을 고치는 일은 다릅니다. AI에게 파일 수정을 요청할 때도 Explorer 기준 경로를 정확히 말하면 혼란이 줄어듭니다.
- related: ["Code Editor", "File Path", "Development Environment"]

## Integrated Terminal
- category: 개발 기초
- shortDefinition: 에디터 안에서 shell command를 실행할 수 있게 하는 터미널 영역
- explanation: Integrated Terminal은 VS Code 같은 편집기 안에서 standalone terminal처럼 명령을 실행하는 공간입니다. 빌드, 테스트, 배포, Git 명령은 terminal에서 실행될 수 있으며, 현재 작업 폴더가 어디인지가 결과에 영향을 줍니다.
- related: ["Terminal", "Shell Command", "Development Environment"]

## Local Testing Server
- category: 웹 개발
- shortDefinition: 개발 중인 웹 결과를 로컬 환경에서 확인하기 위한 테스트 서버
- explanation: Local Testing Server는 개발자의 컴퓨터에서 웹 결과를 확인하기 위해 쓰는 서버입니다. 브라우저에 화면이 보인다는 사실이 공개 배포를 뜻하지는 않습니다. 로컬 확인과 운영 배포를 구분하는 입문 기준입니다.
- related: ["Browser", "Development Environment", "Deployment"]

## Version Control
- category: Git & 협업
- shortDefinition: 시간에 따른 파일 변경 기록을 남기고 특정 버전을 다시 불러올 수 있게 하는 시스템
- explanation: Version Control은 파일 또는 파일 집합의 변경을 기록하는 시스템입니다. 저장은 현재 파일 내용을 디스크에 쓰는 행위이고, version control의 commit은 변경 이력에 의미 있는 묶음을 남기는 행위입니다.
- related: ["Git", "Source Control View", "Commit"]

## Source Control View
- category: Git & 협업
- shortDefinition: 편집기 안에서 Git 변경, staging, commit 같은 source control 작업을 보여주는 UI
- explanation: Source Control View는 Git 같은 version control 시스템의 상태를 편집기 UI로 보여주는 영역입니다. VS Code는 staging, committing, branching, merge conflict resolution 같은 작업을 Source Control 기능으로 제공합니다. UI를 쓰더라도 underlying Git 개념을 이해해야 합니다.
- related: ["Version Control", "Git", "Code Editor"]

