# 용어 초안: package-json-and-semver

## package.json
- category: Node.js
- shortDefinition: Node.js와 npm package의 metadata를 담는 JSON 파일
- explanation: package.json은 package name, version, scripts, dependencies 같은 fields를 담아 package folder tree를 설명하는 중심 metadata 파일입니다. 프로젝트에서 어떤 command를 실행할 수 있고 어떤 package에 의존하는지 확인하는 입구가 됩니다.
- related: ["Package Folder Tree", "npm scripts", "Dependency"]

## Semantic Versioning
- category: 개발 기초
- shortDefinition: 버전 번호를 MAJOR.MINOR.PATCH 의미로 읽게 하는 규칙
- explanation: Semantic Versioning은 incompatible API changes, backwards-compatible functionality, backwards-compatible bug fixes를 major, minor, patch 증가와 연결해 version number가 변경 위험을 전달하게 합니다. dependency update를 검토할 때 첫 분류 기준으로 쓸 수 있습니다.
- related: ["Version Range", "Dependency", "package.json"]

## Dependency
- category: Node.js
- shortDefinition: 프로젝트가 실행이나 빌드에 필요로 하는 외부 package 요구사항
- explanation: Dependency는 package.json의 dependencies field에서 package name과 version range의 mapping으로 표현됩니다. AI가 새 package를 추가하거나 upgrade할 때 package name과 version range를 함께 확인해야 합니다.
- related: ["package.json", "Version Range", "Package Specifier"]

## Version Range
- category: Node.js
- shortDefinition: dependency가 허용하는 package version 집합을 표현하는 범위
- explanation: Version Range는 npm semantic versioning 문서가 설명하는 dependency update 허용 범위입니다. package.json에 적힌 값이 정확한 version 하나인지 range인지 확인해야 update risk를 판단할 수 있습니다.
- related: ["Semantic Versioning", "Dependency", "package.json"]

## npm scripts
- category: Node.js
- shortDefinition: package.json scripts field에 저장된 실행 command 목록
- explanation: npm scripts는 package metadata 안에 command 이름과 실제 shell command를 연결해 둔 구조입니다. terminal에서 npm run build 같은 명령을 실행할 때 어떤 script entry가 실행되는지 package.json에서 확인할 수 있습니다.
- related: ["package.json", "Terminal", "Command Line"]

## Package Specifier
- category: Node.js
- shortDefinition: npm에서 package를 가리키는 name, version, tag, URL, git URL 등의 표기
- explanation: Package Specifier는 npm package spec 문서가 설명하는 package 식별 표기입니다. dependency나 install command를 검토할 때 package name만 보지 않고 어떤 specifier 형태로 지정됐는지 확인해야 합니다.
- related: ["Dependency", "Version Range", "package.json"]
