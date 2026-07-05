## 한 줄 정의

파일, 폴더, 경로는 개발 도구가 코드와 데이터를 찾아가게 만드는 위치 체계입니다. 파일은 내용이 저장되는 단위이고, 폴더는 파일과 폴더를 묶는 구조이며, 경로는 그 위치를 가리키는 문자열입니다. Node.js Learn 문서는 every file in the system has a path라고 설명합니다. 즉 컴퓨터 안의 파일은 이름만으로 충분하지 않고, 어디에 있는지를 나타내는 path를 가집니다.

입문자가 파일과 폴더를 배워야 하는 이유는 단순히 탐색기를 잘 쓰기 위해서가 아닙니다. 에디터의 Explorer, 터미널의 현재 위치, Node.js 코드의 `path` 문자열, `node:fs`의 file system interaction, `package.json`이 설명하는 package folder tree가 모두 이 개념 위에 서 있습니다. 특히 AI에게 코드 수정을 맡길 때는 "어떤 파일"인지 정확히 말해야 합니다. 같은 이름의 파일이 여러 폴더에 있으면 파일 이름만으로는 충분하지 않습니다.

이 강의의 핵심은 ==파일 이름보다 경로가 더 정확한 식별자==라는 점입니다. `intro.md`라고만 말하면 여러 파일 중 어느 것인지 모를 수 있습니다. `src/content/lessons/markdown/intro.md`라고 말하면 폴더 구조 안의 위치가 함께 전달됩니다. AI 시대의 파일 지시는 이 정도 정밀도를 요구합니다.

![파일, 폴더, 경로의 계층 구조](/lesson-diagrams/files-folders-and-paths/path-tree.svg)

## 왜 존재하는가

파일 시스템은 많은 데이터를 질서 있게 찾기 위해 위치 체계를 사용합니다. 사람은 파일 이름을 기억하지만, 프로그램은 위치를 더 엄격하게 다룹니다. Node.js Learn 문서가 모든 file이 path를 가진다고 설명하는 이유가 여기에 있습니다. 경로가 있어야 어떤 폴더 안의 어떤 파일인지 말할 수 있습니다.

두 번째 이유는 도구들이 같은 파일을 서로 다른 방식으로 다루기 때문입니다. VS Code Explorer는 files and folders를 보여주는 UI입니다. Node.js `node:fs`는 file system과 상호작용하는 API입니다. `node:path`는 file and directory paths를 다루는 utility입니다. 이 셋은 모두 파일과 폴더를 다루지만 층이 다릅니다. Explorer는 사람에게 보여주는 화면이고, `node:path`는 문자열 경로를 다루는 도구이며, `node:fs`는 실제 파일 시스템 작업을 수행합니다.

세 번째 이유는 운영체제 차이입니다. Node.js Learn 문서는 Windows computers are different라고 설명하며, Windows와 Linux/macOS 경로 구조가 다름을 다룹니다. 초보자가 경로 문자열을 직접 이어 붙이면 OS별 separator 차이 때문에 오류가 생길 수 있습니다. Node.js가 `node:path` module을 제공하는 이유는 이런 차이를 안전하게 다루기 위해서입니다.

네 번째 이유는 프로젝트 구조입니다. Node.js packages 문서는 package를 `package.json` file로 described되는 folder tree라고 설명합니다. JavaScript 프로젝트에서는 어떤 폴더에 `package.json`이 있는지가 package 경계를 만들 수 있습니다. 즉 폴더는 단순 정리함이 아니라 프로젝트 의미를 만들기도 합니다.

> [!KEY]
> 파일·폴더·경로는 "저장 위치" 지식이 아니라, 에디터·터미널·코드·AI 요청이 같은 대상을 가리키게 만드는 공통 언어입니다.

## 작동 원리

### 1. 파일은 내용의 단위입니다

파일은 코드, 설정, 문서, 이미지처럼 어떤 데이터가 저장되는 단위입니다. 개발자는 파일을 열어 내용을 읽고 수정합니다. VS Code editor에서 보이는 것은 선택한 파일의 내용입니다. 그러나 파일 내용만 알아서는 충분하지 않습니다. 같은 이름의 파일이 여러 폴더에 있을 수 있기 때문입니다.

예를 들어 프로젝트에 `page.tsx`가 여러 개 있을 수 있습니다. 파일 이름만 말하면 AI나 동료가 어느 파일인지 추측해야 합니다. `src/app/page.tsx`처럼 경로를 함께 말하면 위치가 분명해집니다. 파일의 의미는 내용과 위치가 함께 만들 때가 많습니다.

### 2. 폴더는 파일을 묶고 맥락을 만듭니다

폴더는 파일과 다른 폴더를 담는 구조입니다. Node.js packages 문서는 package를 folder tree라고 설명합니다. 이 표현은 중요합니다. 폴더는 단순한 시각적 정리 도구가 아니라, 어떤 파일들이 함께 하나의 package나 project context를 이루는지 나타낼 수 있습니다.

VS Code Explorer는 access 가능한 files and folders를 보여줍니다. 이 Explorer를 보면 프로젝트가 어떤 폴더 구조를 갖는지 알 수 있습니다. 초보자는 Explorer의 폴더 구조를 읽는 법을 먼저 익혀야 합니다. 어떤 파일이 어디에 있는지 알아야 터미널 명령과 AI 요청도 정확해집니다.

### 3. 경로는 위치를 문자열로 표현합니다

경로는 파일이나 폴더의 위치를 나타내는 문자열입니다. Node.js Learn 문서는 every file in the system has a path라고 설명합니다. 경로에는 폴더 이름들이 순서대로 들어가고, 마지막에 파일 이름이 올 수 있습니다. 경로를 보면 파일이 어느 폴더 아래에 있는지 알 수 있습니다.

경로는 사람에게도, 프로그램에게도 필요합니다. 사람은 "그 파일 어디 있어요?"라는 질문에 경로로 답합니다. 프로그램은 파일을 읽기 위해 path 문자열을 API에 넘깁니다. AI에게도 경로는 지시의 정확도를 높입니다. "intro 파일"보다 "`src/content/lessons/markdown/intro.md`"가 훨씬 명확합니다.

### 4. 운영체제마다 경로 형태가 다를 수 있습니다

Node.js Learn 문서는 Windows computers are different라고 설명합니다. Windows 경로와 Linux/macOS 경로는 separator와 root 표현이 다릅니다. Windows에서는 드라이브 문자와 backslash를 볼 수 있고, POSIX 계열에서는 slash 기반 경로를 볼 수 있습니다. 이 차이를 모르면 경로 문자열을 직접 조립하다가 오류를 만들 수 있습니다.

이 강의는 OS별 모든 경로 문법을 외우게 하려는 것이 아닙니다. 핵심은 application에서 path 차이를 고려해야 한다는 점입니다. 그래서 Node.js는 `node:path` module을 제공합니다. 개발자는 문자열을 직접 붙이기보다 `path.join`, `path.dirname`, `path.basename`, `path.extname` 같은 utility를 사용해야 합니다.

> [!WARNING]
> Windows의 file system path와 웹 URL은 비슷해 보여도 같은 체계가 아닙니다. 이 강의는 file system path를 다루며, URL은 후속 웹/HTTP 강의에서 별도로 다룹니다.

### 5. `node:path`는 경로 문자열을 다룹니다

Node.js API 문서는 `node:path` module이 file and directory paths를 다루는 utilities를 제공한다고 설명합니다. `path.dirname()`은 folder 구조를 얻고, `path.basename()`은 파일 이름 부분을 얻고, `path.extname()`은 extension을 얻습니다. 이 utility들은 path 문자열을 안전하게 분석하거나 조합하는 데 쓰입니다.

중요한 점은 `node:path`가 파일을 실제로 읽지는 않는다는 것입니다. `node:path`는 경로 문자열을 다룹니다. 파일 시스템에 접근하는 것은 `node:fs`의 역할입니다. 이 구분을 모르면 "path를 만들었는데 왜 파일이 생기지 않지?" 같은 혼동이 생깁니다.

### 6. `node:fs`는 파일 시스템과 상호작용합니다

Node.js `node:fs` module은 file system과 상호작용하게 합니다. KB는 fs API가 synchronous, callback, promise-based forms를 제공한다고 정리합니다. 즉 파일을 읽거나 쓰거나 확인하는 작업은 `fs` 쪽의 역할입니다. Path가 위치를 말한다면, fs는 그 위치에 실제로 접근합니다.

이 둘을 함께 생각하면 구조가 선명해집니다. `path.join("src", "content", "intro.md")`는 위치 문자열을 만듭니다. `fs.readFile(...)`은 그 위치의 파일 내용을 읽습니다. 위치 만들기와 파일 읽기는 연결되지만 같은 작업은 아닙니다.

### 7. package는 특별한 folder tree입니다

Node.js packages 문서는 package가 `package.json` file로 described되는 folder tree라고 설명합니다. 이것은 JavaScript 프로젝트에서 중요한 개념입니다. 어떤 폴더에 `package.json`이 있으면 그 폴더와 하위 구조가 package로 해석될 수 있습니다. 따라서 모든 folder가 package는 아니지만, package는 folder tree로 나타납니다.

초보자는 프로젝트 루트와 package 경계를 혼동할 수 있습니다. 많은 JavaScript 프로젝트에서는 `package.json`이 있는 곳을 루트처럼 다루지만, 모든 프로젝트가 같은 방식은 아닙니다. 이 강의에서는 KB 범위를 넘어 일반화하지 않고, Node.js package 문서가 말하는 folder tree 기준만 기억합니다.

### 8. AI 요청은 path precision을 요구합니다

AI에게 파일 수정을 요청할 때는 경로가 중요합니다. VS Code Explorer에서 보이는 folder tree와 AI가 말하는 path를 대조할 수 있어야 합니다. AI가 "layout 파일을 수정했다"고 말하면 어떤 layout인지 확인해야 합니다. `src/app/layout.tsx`인지, 다른 폴더의 layout인지가 중요합니다.

AI가 생성한 코드도 path 문자열을 포함할 수 있습니다. 이때 OS별 차이를 고려하지 않고 직접 문자열을 붙이면 문제가 생길 수 있습니다. Node.js path utility를 쓰는 이유는 AI 시대에도 그대로 유지됩니다. ==AI가 코드를 만들어도 경로의 의미와 위험은 사람이 검토해야 합니다.==

## 스펙과 세부

### Path의 구성요소

KB는 Node.js Learn 문서가 dirname, basename, extname 예시를 제시한다고 정리합니다. Directory name은 파일이 들어 있는 폴더 구조입니다. Base name은 경로의 마지막 파일 이름 부분입니다. Extension은 `.ts`, `.md`, `.json`처럼 파일 이름 끝의 확장자입니다. 이 셋을 구분하면 경로를 더 정확히 읽을 수 있습니다.

### Path separator와 OS 차이

Windows와 Linux/macOS path는 다르게 생길 수 있습니다. KB는 이 차이를 Node.js Learn 문서에 근거해 설명합니다. 실무에서는 separator를 직접 하드코딩하기보다 path utility를 사용합니다. 이 강의는 초보자에게 "슬래시 모양을 외우라"가 아니라 "운영체제 차이를 고려해야 한다"를 가르칩니다.

### `node:path`의 역할

Node.js Path API는 `node:path`가 file and directory paths를 다루는 utilities를 제공한다고 설명합니다. path module은 문자열 경로를 조작합니다. `path.join`은 조각을 합치고, `path.basename`은 마지막 이름을 얻고, `path.extname`은 확장자를 얻습니다. 경로를 직접 더하는 것보다 안전한 접근입니다.

### `node:fs`의 역할

Node.js File system API는 `node:fs`가 file system과 상호작용하게 한다고 설명합니다. `fs`는 파일 읽기, 쓰기 같은 실제 작업과 연결됩니다. path가 주소라면 fs는 그 주소로 가서 작업하는 도구입니다. 다만 이 비유도 완벽하지는 않습니다. 핵심은 path string manipulation과 file system interaction을 분리하는 것입니다.

### Package folder tree

Node.js Packages 문서는 package를 `package.json` file로 described되는 folder tree라고 설명합니다. 여기서 folder tree라는 표현은 폴더 구조가 단순한 정리 방식이 아니라 package의 경계를 나타낼 수 있음을 보여줍니다. 후속 강의에서 package.json과 semantic versioning을 배울 때 이 개념이 다시 등장합니다.

### 실행 가능한 예시

```ts
import fs from "node:fs/promises"
import path from "node:path"

const lessonPath = path.join("src", "content", "lessons", "markdown", "intro.md")
const folderName = path.dirname(lessonPath)
const fileName = path.basename(lessonPath)
const extension = path.extname(lessonPath)

console.log({ extension, fileName, folderName })

async function readLesson(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf8")
}
```

이 코드는 `node:path`와 `node:fs`의 경계를 보여줍니다. `path.dirname`, `path.basename`, `path.extname`은 경로 문자열에서 정보를 꺼냅니다. `fs.readFile`은 실제 file system과 상호작용합니다. 학습자는 이 둘을 섞어 생각하지 않아야 합니다.

## 원문으로 읽기

> "Every file in the system has a path"
>
> — 시스템의 모든 파일은 경로를 가진다.
> [Node.js File Paths](https://nodejs.org/learn/manipulating-files/nodejs-file-paths)

이 문장은 경로 학습의 출발점입니다. 파일 이름만으로는 위치가 충분히 설명되지 않습니다. 파일은 폴더 구조 안의 path를 가집니다. AI에게 파일을 알려줄 때도 이 원칙이 그대로 적용됩니다.

> "Windows computers are different"
>
> — Windows 컴퓨터는 다르다.
> [Node.js File Paths](https://nodejs.org/learn/manipulating-files/nodejs-file-paths)

이 짧은 문장은 OS별 경로 차이를 상기시킵니다. 경로 문자열을 직접 이어 붙이는 방식은 환경 차이에 취약할 수 있습니다. 개발자는 path utility를 사용해 file and directory path를 다루는 편이 안전합니다.

> "provides utilities for working with file and directory paths"
>
> — file and directory paths를 다루는 utility를 제공한다.
> [Path — Node.js Docs](https://nodejs.org/api/path.html)

이 인용은 `node:path`의 역할을 정의합니다. `node:path`는 파일을 읽는 모듈이 아니라 경로 문자열을 다루는 utility입니다. dirname, basename, extname 같은 기능은 경로를 분석하고 조합할 때 사용됩니다.

> "interacting with the file system"
>
> — file system과 상호작용한다.
> [File system — Node.js Docs](https://nodejs.org/api/fs.html)

이 문장은 `node:fs`의 역할을 보여줍니다. 파일 내용을 읽거나 쓰는 작업은 path module이 아니라 fs module과 연결됩니다. path는 위치를 표현하고, fs는 그 위치의 file system과 상호작용합니다.

> "A package is a folder tree"
>
> — package는 folder tree다.
> [Modules: Packages — Node.js Docs](https://nodejs.org/api/packages.html)

이 인용은 folder가 프로젝트 의미를 가질 수 있음을 보여줍니다. package는 `package.json` file로 described되는 folder tree입니다. 모든 폴더가 package는 아니지만, package를 이해하려면 folder tree를 읽을 수 있어야 합니다.

> "files and folders"
>
> — files and folders.
> [User interface — VS Code Docs](https://code.visualstudio.com/docs/getstarted/userinterface)

VS Code Explorer는 files and folders를 보여줍니다. 이 UI는 개발자가 path와 folder tree를 눈으로 읽는 시작점입니다. AI가 말한 경로가 실제 Explorer 안에서 어디인지 대조하는 습관이 필요합니다.

## 실전에서

### 패턴 1: AI에게 파일을 말할 때 전체 경로를 줍니다

AI에게 "intro 파일을 고쳐줘"라고 말하면 같은 이름의 파일이 여러 개 있을 때 모호합니다. "`src/content/lessons/markdown/intro.md`를 고쳐줘"라고 말하면 훨씬 정확합니다. 이 방식은 VS Code Explorer에서 보이는 folder tree와 직접 연결됩니다.

### 패턴 2: 터미널 명령 전 현재 위치를 확인합니다

후속 강의에서 `pwd`, `cd`, `ls` 같은 명령을 배우게 됩니다. 그 전에 원리를 알아야 합니다. 터미널 명령은 현재 directory를 기준으로 relative path를 해석할 수 있습니다. 현재 위치를 모르면 같은 명령이 다른 결과를 만들 수 있습니다. 개발 환경 지도와 파일 경로 이해가 여기서 만납니다.

### 패턴 3: Node.js에서는 path와 fs를 분리합니다

파일 경로를 만들 때는 `node:path` utility를 쓰고, 파일을 읽거나 쓸 때는 `node:fs`를 씁니다. AI가 만들어준 코드가 문자열을 직접 더하고 있다면 OS별 차이를 검토해야 합니다. KB는 `node:path`가 file and directory paths utility를 제공한다고 설명합니다.

> [!TIP]
> AI가 경로 문자열을 직접 이어 붙인 코드를 제안하면, `node:path`를 사용할 수 있는지 먼저 검토하세요. 경로는 작은 문자열처럼 보이지만 OS 차이와 프로젝트 구조를 담고 있습니다.

### 패턴 4: package 경계를 `package.json`과 연결합니다

JavaScript 프로젝트에서 `package.json`은 folder tree와 연결됩니다. Node.js packages 문서의 표현처럼 package는 `package.json` file로 described됩니다. 따라서 dependency, scripts, package boundary를 이해하려면 어떤 폴더에 `package.json`이 있는지 확인해야 합니다.

### 패턴 5: 파일 이름, 확장자, 폴더를 분리해 읽습니다

`src/content/lessons/markdown/intro.md`라는 경로를 보면 `intro.md`는 basename이고, `.md`는 extension이며, 앞의 `src/content/lessons/markdown`은 folder structure입니다. 이처럼 path를 구성요소로 읽으면 오류 메시지도 더 잘 이해됩니다. "file not found"가 나오면 파일 이름이 틀렸는지, 폴더가 틀렸는지, extension이 틀렸는지 나누어 볼 수 있습니다.

## 한계와 트레이드오프

첫 번째 한계는 이 강의가 모든 운영체제 경로 문법을 세부적으로 다루지 않는다는 점입니다. KB는 Windows와 Linux/macOS path가 다르다는 사실과 `node:path` 사용의 필요성을 다룹니다. 구체적인 shell 명령과 절대/상대 경로 예시는 후속 terminal-shell-commands 강의에서 더 자세히 다룹니다.

두 번째 한계는 file system path와 URL을 일부러 분리한다는 점입니다. 둘 다 위치를 나타내지만 같은 체계가 아닙니다. 웹 URL, HTTP route, Next.js route는 후속 웹 개발 강의에서 다룹니다. 여기서는 컴퓨터의 file and directory paths에 집중합니다.

세 번째 한계는 package 개념을 Node.js 기준으로만 다룬다는 점입니다. KB는 Node.js packages 문서를 근거로 package를 설명합니다. 다른 언어나 도구의 package 기준은 다를 수 있습니다. 따라서 이 강의의 package 설명을 모든 생태계에 무리하게 일반화하면 안 됩니다.

네 번째 한계는 path utility가 모든 논리 오류를 막아주지는 않는다는 점입니다. `node:path`는 경로 문자열을 안전하게 다루는 데 도움을 주지만, 어떤 파일을 읽어야 하는지, 그 파일이 존재해야 하는지, 보안상 접근해도 되는지는 별도 판단입니다. path utility는 경로 조작 도구이지 요구사항 검증 도구가 아닙니다.

다섯 번째 한계는 AI가 path를 제안해도 실제 파일 존재를 확인해야 한다는 점입니다. AI는 그럴듯한 경로를 말할 수 있습니다. VS Code Explorer, `fs` 접근, 터미널 명령으로 실제 파일이 존재하는지 확인해야 합니다. 앞 강의의 AI 학습 검증 원칙이 여기에도 적용됩니다.

==경로를 안다는 것은 문자열을 외우는 것이 아니라, 도구들이 같은 파일을 가리키는지 검증할 수 있다는 뜻입니다.== 이 능력이 생기면 터미널, Git, build, test, 배포 오류를 읽는 힘이 함께 커집니다.

## 더 읽기

먼저 Node.js File Paths를 읽어 모든 file이 path를 가진다는 기본 정의와 Windows/POSIX 차이를 확인하세요. 그 다음 Node.js Path API를 읽어 `node:path`가 file and directory paths를 다루는 utility임을 확인합니다. 이어서 Node.js File system API를 읽어 path 문자열과 실제 file system interaction의 차이를 잡으세요. Node.js Packages 문서는 `package.json`과 folder tree의 관계를 보여줍니다. 마지막으로 VS Code User Interface 문서를 보며 Explorer가 files and folders를 어떻게 보여주는지 실제 화면과 대조하세요.

- [Node.js File Paths](https://nodejs.org/learn/manipulating-files/nodejs-file-paths)
- [Path — Node.js Docs](https://nodejs.org/api/path.html)
- [File system — Node.js Docs](https://nodejs.org/api/fs.html)
- [Modules: Packages — Node.js Docs](https://nodejs.org/api/packages.html)
- [User interface — VS Code Docs](https://code.visualstudio.com/docs/getstarted/userinterface)

읽을 때는 여섯 질문을 기준으로 보세요. 이 파일의 full path는 무엇인가. 폴더 구조에서 어디에 있는가. basename과 extension은 무엇인가. 운영체제별 path 차이를 고려했는가. path 문자열 조작과 file system interaction을 구분했는가. 그리고 AI가 말한 경로가 실제 Explorer와 file system에 존재하는가. 이 질문들이 다음 터미널·셸 명령 레퍼런스의 기초가 됩니다.
