---
id: files-folders-paths
title: "Files, Folders, and Paths (파일, 폴더, 경로)"
topicGroup: T01
status: draft
score: null
level: 입문
prerequisites: [dev-environment-map]
successors: [terminal-shell-commands, variables-types-data]
related: [dev-environment-map, terminal-shell-commands]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Node.js File Paths", url: "https://nodejs.org/learn/manipulating-files/nodejs-file-paths", checked: 2026-07-05 }
  - { title: "Path", url: "https://nodejs.org/api/path.html", checked: 2026-07-05 }
  - { title: "File system", url: "https://nodejs.org/api/fs.html", checked: 2026-07-05 }
  - { title: "Modules: Packages", url: "https://nodejs.org/api/packages.html", checked: 2026-07-05 }
  - { title: "User interface", url: "https://code.visualstudio.com/docs/getstarted/userinterface", checked: 2026-07-05 }
updated: 2026-07-05
---

## 정의
경로는 컴퓨터 안에서 파일이나 폴더의 위치를 가리키는 문자열이다. Node.js Learn 문서는 every file in the system has a path라고 설명하고, Windows와 Linux/macOS의 path 구조가 다르다고 설명한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
파일은 데이터나 코드가 저장되는 단위이고, 폴더는 파일과 다른 폴더를 묶는 구조다. Node.js packages 문서는 package를 `package.json`으로 설명되는 folder tree라고 설명한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-05)

## 역사
파일, 폴더, 경로 개념은 운영체제와 개발 도구가 데이터를 위치 기반으로 찾기 위해 사용하는 기본 구조다. Node.js File Paths 문서는 Windows 경로 예시와 Linux/macOS 경로 예시가 다르며, application에서 path 차이를 고려해야 한다고 설명한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
Node.js는 2026-07-05 기준 `node:path` module로 file and directory paths를 다루는 utility를 제공하고, `node:fs` module로 file system과 상호작용하게 한다. (출처: https://nodejs.org/api/path.html, 확인: 2026-07-05; https://nodejs.org/api/fs.html, 확인: 2026-07-05)
JavaScript 프로젝트에서는 `package.json`이 있는 폴더와 그 하위 폴더가 하나의 package tree로 해석될 수 있다. Node.js packages 문서는 package가 `package.json` file로 described된 folder tree라고 설명한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-05)

## 해결하려는 문제
파일과 폴더 위치를 모르면 에디터에서 열린 파일, 터미널의 현재 위치, 브라우저가 읽는 파일이 서로 어디인지 알기 어렵다. VS Code UI 문서는 Explorer가 access 가능한 files and folders를 보여주고 editor가 열린 파일 내용을 보여준다고 설명한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
운영체제마다 path separator와 경로 표현이 다르므로 문자열을 직접 이어 붙이면 cross-platform 오류가 생길 수 있다. Node.js File Paths 문서는 Windows 경로가 Linux/macOS와 다르다고 설명하고, `node:path` 사용을 제시한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
Node.js에서 파일을 읽거나 쓰려면 file system API가 필요하다. Node.js fs 문서는 `node:fs` module이 file system과 상호작용하게 한다고 설명한다. (출처: https://nodejs.org/api/fs.html, 확인: 2026-07-05)

## 핵심 개념
1. File path: Node.js Learn 문서는 every file has a path라고 설명한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
2. OS별 path 차이: Node.js Learn 문서는 Linux/macOS path와 Windows path가 다르며 application에서 이를 고려해야 한다고 설명한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
3. Directory name: Node.js Learn 문서는 `path.dirname()`으로 path의 folder 구조를 얻는 예를 제시한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
4. Base name: Node.js Learn 문서는 `path.basename()`으로 file name part를 얻는 예를 제시한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
5. Extension: Node.js Learn 문서는 `path.extname()`으로 file extension을 얻는 예를 제시한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
6. Path utilities: Node.js API 문서는 `node:path` module이 file and directory paths를 다루는 utilities를 제공한다고 설명한다. (출처: https://nodejs.org/api/path.html, 확인: 2026-07-05)
7. File system API: Node.js API 문서는 `node:fs` module이 file system과 상호작용하게 하며 synchronous, callback, promise-based forms를 제공한다고 설명한다. (출처: https://nodejs.org/api/fs.html, 확인: 2026-07-05)
8. Package folder tree: Node.js packages 문서는 package를 `package.json` file이 설명하는 folder tree로 정의한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-05)

## 관련 기술
- Path vs URL: path는 file system 위치를 가리키고, URL은 web resource 위치를 가리킨다. 이 KB는 file system path만 다룬다. Node.js File Paths와 `node:path` 문서는 file and directory paths를 다룬다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05; https://nodejs.org/api/path.html, 확인: 2026-07-05)
- Folder vs package: 모든 folder가 package는 아니다. Node.js packages 문서는 package가 `package.json` file로 described된 folder tree라고 설명한다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-05)
- Absolute vs relative path: Node.js File Paths 문서는 path parts를 다루는 utilities를 소개하며, application에서 path 차이를 고려해야 한다고 설명한다. 이 KB에서는 절대/상대 경로 설명을 후속 terminal-shell-commands에서 명령 예시와 함께 다룬다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)
- File system vs editor UI: VS Code Explorer는 파일과 폴더를 보여주는 UI이고, `node:fs`는 코드에서 file system에 접근하는 API다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05; https://nodejs.org/api/fs.html, 확인: 2026-07-05)

## 선행 개념
- dev-environment-map: 파일과 폴더는 에디터 Explorer, 터미널 현재 위치, Git 변경 추적, 브라우저 확인의 공통 대상이다. VS Code UI는 Explorer와 editor layout을 설명한다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)

## 후행 개념
- terminal-shell-commands: `cd`, `ls`, `mkdir` 같은 명령은 파일, 폴더, 경로 이해를 전제로 한다. MDN command line 문서는 basic commands에 `cd`, `ls`, `mkdir`, `touch`, `mv`, `cp`를 포함한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)
- variables-types-data: 코드에서 file path를 string으로 다루고, file metadata를 object로 다루려면 데이터 형태 이해가 필요하다. Node.js path와 fs API는 path string과 file system operation을 함께 다룬다. (출처: https://nodejs.org/api/path.html, 확인: 2026-07-05; https://nodejs.org/api/fs.html, 확인: 2026-07-05)

## AI 시대에서의 의미
AI에게 파일 수정을 요청할 때 "어느 파일", "어느 폴더", "상대 경로 기준이 어디인지"를 정확히 말해야 한다. VS Code는 Explorer에서 files and folders를 보여주고 editor에서 열린 파일 내용을 보여주므로, 사용자는 AI가 언급한 path와 실제 파일 위치를 대조할 수 있다. (출처: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
AI가 생성한 코드에서 path 문자열을 직접 조립하면 OS별 차이로 오류가 생길 수 있다. Node.js는 `node:path` module을 file and directory paths utility로 제공하며 Windows와 POSIX 차이를 문서화한다. (출처: https://nodejs.org/api/path.html, 확인: 2026-07-05)

## 실무 활용
1. 에디터에서 파일 찾기: VS Code Explorer에서 프로젝트 folder tree를 확인하고, AI가 말한 path가 실제 위치와 맞는지 확인한다. VS Code UI 문서에 근거한다. (근거: https://code.visualstudio.com/docs/getstarted/userinterface, 확인: 2026-07-05)
2. Node.js path 처리: 문자열을 직접 이어 붙이지 않고 `path.join`, `path.dirname`, `path.basename`, `path.extname` 같은 utility를 사용한다. Node.js File Paths와 Path API에 근거한다. (근거: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05; https://nodejs.org/api/path.html, 확인: 2026-07-05)
3. 파일 읽기/쓰기: Node.js에서 file system과 상호작용할 때 `node:fs`의 promise, callback, synchronous forms 중 실행 맥락에 맞는 형태를 선택한다. Node.js fs API에 근거한다. (근거: https://nodejs.org/api/fs.html, 확인: 2026-07-05)

```ts
import path from "node:path"

const lessonPath = path.join("src", "content", "lessons", "markdown", "intro.md")
const fileName = path.basename(lessonPath)
const extension = path.extname(lessonPath)
```

## FAQ
Q: Windows와 macOS/Linux 경로는 왜 다르게 생겼는가?
A: Node.js Learn 문서는 Linux/macOS path 예시와 Windows path 예시가 다르며, application에서 이 차이를 고려해야 한다고 설명한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)

Q: 파일 이름 끝의 `.ts`, `.md`, `.json`은 무엇인가?
A: file extension이다. Node.js Learn 문서는 `path.extname()`으로 extension을 얻는 예를 제시한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)

Q: 폴더와 package는 같은 말인가?
A: 아니다. Node.js packages 문서는 package가 `package.json` file로 described된 folder tree라고 설명한다. 모든 folder가 package는 아니다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-05)

Q: 코드에서 파일을 읽으려면 path만 알면 되는가?
A: path는 위치 정보이고, 실제 file system interaction은 API가 필요하다. Node.js는 `node:fs` module로 file system과 상호작용하게 한다고 설명한다. (출처: https://nodejs.org/api/fs.html, 확인: 2026-07-05)

## 자주 하는 실수
1. 실수: Windows의 `\`와 웹 URL의 `/`를 같은 것으로 본다. 왜 생기나: 둘 다 위치를 나타내는 구분자처럼 보이기 때문이다. 교정: 이 KB에서는 file system path와 URL을 구분하고, Node.js path utilities를 사용한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05; https://nodejs.org/api/path.html, 확인: 2026-07-05)
2. 실수: 현재 터미널 위치를 모르고 명령을 실행한다. 왜 생기나: 에디터에서 보이는 파일 위치와 terminal current directory를 혼동한다. 교정: 후속 terminal-shell-commands에서 `pwd`, `cd`, `ls`로 현재 위치를 확인한다. MDN command line 문서는 `cd`, `ls` 같은 기본 명령을 학습 대상으로 제시한다. (출처: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line, 확인: 2026-07-05)
3. 실수: 모든 프로젝트 루트가 `package.json`이 있는 곳이라고 단정한다. 왜 생기나: JavaScript 프로젝트 경험을 일반화하기 때문이다. 교정: Node.js package에서는 `package.json`이 package tree를 설명하지만, 다른 프로젝트는 다른 기준 파일을 쓸 수 있다. (출처: https://nodejs.org/api/packages.html, 확인: 2026-07-05)
4. 실수: 파일 이름만 말하면 AI가 정확한 파일을 찾는다고 기대한다. 왜 생기나: 같은 이름의 파일이 여러 폴더에 있을 수 있음을 놓치기 때문이다. 교정: `src/content/lessons/markdown/intro.md`처럼 folder path를 포함해 말한다. Node.js File Paths 문서는 every file has a path라고 설명한다. (출처: https://nodejs.org/learn/manipulating-files/nodejs-file-paths, 확인: 2026-07-05)

## 공식 출처
- 모든 file은 path를 가지며 Windows와 Linux/macOS path 구조가 다르다 — [Node.js File Paths](https://nodejs.org/learn/manipulating-files/nodejs-file-paths) (확인: 2026-07-05)
- `node:path` module은 file and directory paths를 다루는 utilities를 제공한다 — [Path](https://nodejs.org/api/path.html) (확인: 2026-07-05)
- `node:fs` module은 file system과 상호작용하게 하며 sync, callback, promise forms를 제공한다 — [File system](https://nodejs.org/api/fs.html) (확인: 2026-07-05)
- Node.js package는 `package.json` file로 described되는 folder tree다 — [Modules: Packages](https://nodejs.org/api/packages.html) (확인: 2026-07-05)
- VS Code Explorer는 access 가능한 files and folders를 보여준다 — [User interface](https://code.visualstudio.com/docs/getstarted/userinterface) (확인: 2026-07-05)

## Quote Bank
- > "Every file in the system has a path"
  - 출처: [Node.js File Paths](https://nodejs.org/learn/manipulating-files/nodejs-file-paths) (확인: 2026-07-05)
  - 맥락: path의 기본 정의를 설명할 때 사용한다.
- > "Windows computers are different"
  - 출처: [Node.js File Paths](https://nodejs.org/learn/manipulating-files/nodejs-file-paths) (확인: 2026-07-05)
  - 맥락: OS별 경로 차이를 설명할 때 사용한다.
- > "provides utilities for working with file and directory paths"
  - 출처: [Path](https://nodejs.org/api/path.html) (확인: 2026-07-05)
  - 맥락: `node:path`의 역할을 설명할 때 사용한다.
- > "interacting with the file system"
  - 출처: [File system](https://nodejs.org/api/fs.html) (확인: 2026-07-05)
  - 맥락: path와 file system API의 차이를 설명할 때 사용한다.
- > "A package is a folder tree"
  - 출처: [Modules: Packages](https://nodejs.org/api/packages.html) (확인: 2026-07-05)
  - 맥락: folder와 package 관계를 설명할 때 사용한다.
- > "files and folders"
  - 출처: [User interface](https://code.visualstudio.com/docs/getstarted/userinterface) (확인: 2026-07-05)
  - 맥락: VS Code Explorer의 역할을 설명할 때 사용한다.

## 변경 이력
- 2026-07-05: 최초 작성 (Codex, P-01)

