# 용어 초안: files-folders-and-paths

## File Path
- category: 개발 기초
- shortDefinition: 파일이나 폴더의 위치를 나타내는 문자열
- explanation: File Path는 컴퓨터 안에서 특정 파일이나 폴더가 어디에 있는지 가리키는 문자열입니다. Node.js Learn 문서는 모든 file이 path를 가진다고 설명합니다. AI에게 파일 수정을 요청할 때 파일 이름만이 아니라 folder structure를 포함한 path를 말하면 모호성이 줄어듭니다.
- related: ["Folder", "Path Separator", "File System"]

## Folder
- category: 개발 기초
- shortDefinition: 파일과 다른 폴더를 묶어 계층 구조를 만드는 단위
- explanation: Folder는 프로젝트 파일을 구조화하고 맥락을 만드는 단위입니다. VS Code Explorer는 files and folders를 보여주며, Node.js packages 문서는 package를 folder tree로 설명합니다. 모든 folder가 package는 아니지만 package는 folder tree로 나타날 수 있습니다.
- related: ["File Path", "Package Folder Tree", "VS Code Explorer"]

## Path Separator
- category: 개발 기초
- shortDefinition: 경로 안에서 폴더 이름들을 구분하는 문자
- explanation: Path Separator는 경로 문자열에서 폴더 계층을 나누는 구분자입니다. Windows와 Linux/macOS path는 다르게 생길 수 있으므로 문자열을 직접 이어 붙이기보다 `node:path` 같은 utility를 사용하는 편이 안전합니다.
- related: ["File Path", "Node Path Module", "Operating System"]

## Directory Name
- category: 개발 기초
- shortDefinition: 경로에서 파일이 들어 있는 폴더 구조 부분
- explanation: Directory Name은 `path.dirname()`으로 얻을 수 있는 경로의 폴더 부분입니다. 파일 이름이 같아도 directory가 다르면 다른 파일일 수 있으므로, AI 요청과 오류 분석에서 directory를 함께 확인해야 합니다.
- related: ["File Path", "Base Name", "Node Path Module"]

## Base Name
- category: 개발 기초
- shortDefinition: 경로의 마지막 파일 이름 또는 폴더 이름 부분
- explanation: Base Name은 `path.basename()`으로 얻을 수 있는 경로의 마지막 이름입니다. 파일 이름을 말할 때 유용하지만, 같은 basename이 여러 folder에 있을 수 있으므로 full path와 함께 보는 것이 안전합니다.
- related: ["Directory Name", "File Extension", "File Path"]

## File Extension
- category: 개발 기초
- shortDefinition: 파일 이름 끝에서 파일 형식이나 용도를 나타내는 접미 부분
- explanation: File Extension은 `.ts`, `.md`, `.json`처럼 파일 이름 끝에 붙는 부분입니다. Node.js Learn 문서는 `path.extname()`으로 extension을 얻는 예를 제시합니다. Extension은 파일의 용도 추정에 도움을 주지만, 위치 정보인 path와 함께 봐야 합니다.
- related: ["Base Name", "File Path", "Node Path Module"]

## Node Path Module
- category: Node.js
- shortDefinition: file and directory paths를 다루는 Node.js utility module
- explanation: Node Path Module은 `node:path`로 import하며 file and directory paths를 조작하는 utility를 제공합니다. 경로 문자열을 직접 이어 붙이는 대신 `path.join`, `path.dirname`, `path.basename`, `path.extname` 같은 함수를 사용해 OS 차이를 고려할 수 있습니다.
- related: ["File Path", "Path Separator", "Node File System Module"]

## Node File System Module
- category: Node.js
- shortDefinition: Node.js에서 file system과 상호작용하게 하는 module
- explanation: Node File System Module은 `node:fs` 또는 `node:fs/promises`로 사용하며 파일 읽기와 쓰기 같은 file system interaction을 담당합니다. `node:path`가 경로 문자열을 다룬다면 `node:fs`는 그 경로의 실제 파일 시스템 작업을 수행합니다.
- related: ["Node Path Module", "File System", "File Path"]

## Package Folder Tree
- category: Node.js
- shortDefinition: `package.json` file로 described되는 package의 폴더 계층
- explanation: Package Folder Tree는 Node.js packages 문서가 package를 설명할 때 쓰는 구조입니다. JavaScript 프로젝트에서는 `package.json`이 있는 folder tree가 package 경계를 나타낼 수 있습니다. 모든 folder가 package는 아니므로 `package.json`과 함께 확인해야 합니다.
- related: ["Folder", "package.json", "Node.js"]

