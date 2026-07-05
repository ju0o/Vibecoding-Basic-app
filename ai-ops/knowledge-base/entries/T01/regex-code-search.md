---
id: regex-code-search
title: "Regular Expressions for Code Search (코드 검색을 위한 정규식)"
topicGroup: T01
status: draft
score: null
level: 중급
prerequisites: [debugging-error-reading]
successors: [git-log-diff-show, code-change-risk-analysis]
related: [variables-types-data, terminal-shell-commands]
consumers:
  lessons: []
  glossary: []
sources:
  - { title: "Regular expressions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions", checked: 2026-07-06 }
  - { title: "RegExp", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp", checked: 2026-07-06 }
  - { title: "Assertions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions", checked: 2026-07-06 }
  - { title: "Character classes", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes", checked: 2026-07-06 }
  - { title: "Basic Editing in Visual Studio Code", url: "https://code.visualstudio.com/docs/editor/codebasics", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
정규식은 문자열 안에서 패턴을 찾고 비교하기 위한 표현식이다. MDN은 regular expression을 character combinations in strings를 match하는 pattern이라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
코드 검색에서 정규식은 함수명, import문, 특정 속성, 반복되는 오류 패턴을 일반 텍스트보다 더 넓거나 정확하게 찾는 도구다. VS Code Basic Editing 문서는 search view와 regular expression 검색 지원을 설명한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 역사
JavaScript는 `RegExp` 객체와 regular expression literal을 통해 문자열 pattern matching을 제공한다. MDN RegExp 문서는 `RegExp` object가 text with a pattern을 matching하는 데 쓰인다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06)
2026-07-06 기준 MDN은 regular expressions를 JavaScript reference와 guide로 나누어 설명하며, assertions, character classes, quantifiers 같은 구성요소를 별도 문서로 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes, 확인: 2026-07-06)
에디터 검색에서도 정규식은 코드베이스 전체에서 패턴을 찾는 기능으로 쓰인다. VS Code Basic Editing은 Search view와 regex search 토글을 설명한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 해결하려는 문제
일반 문자열 검색은 정확히 같은 글자만 찾기 때문에 `getUser`, `getLesson`, `getProgress`처럼 비슷한 구조를 한 번에 찾기 어렵다. MDN regular expressions는 pattern을 사용해 string matching을 수행한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
오류 메시지의 함수명이나 로그 prefix가 조금씩 다르면 단순 검색으로 놓치기 쉽다. 정규식의 character classes와 assertions는 특정 문자 범위나 위치 조건을 표현할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions, 확인: 2026-07-06)
AI가 제안한 대량 변경을 검토할 때 특정 import, prop, function call이 어디에 남아 있는지 빠르게 찾아야 한다. VS Code Search view는 workspace에서 검색하는 기능을 제공한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 핵심 개념
1. Pattern: regular expression은 문자열을 match하는 pattern이다. MDN regular expressions 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
2. Literal and constructor: JavaScript에서는 `/pattern/` literal 또는 `RegExp` constructor를 사용할 수 있다. MDN RegExp 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06)
3. Character class: `[abc]`, `\d` 같은 character class는 문자 집합을 표현한다. MDN character classes 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes, 확인: 2026-07-06)
4. Assertion: `^`, `$`, word boundary 같은 assertion은 문자를 소비하지 않고 위치 조건을 표현한다. MDN assertions 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions, 확인: 2026-07-06)
5. Quantifier: 반복 횟수 조건은 regular expression 구성요소 중 하나다. MDN regular expressions reference는 quantifiers를 구성요소로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
6. Flags: `g`, `i`, `m` 같은 flags는 matching behavior를 바꾼다. MDN RegExp 문서에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06)
7. Editor search: VS Code Search view는 workspace에서 검색하고 regular expression을 사용할 수 있다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 관련 기술
- Regex vs plain search: plain search는 literal text를 찾고 regex는 pattern을 찾는다. MDN regular expressions와 VS Code search 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)
- Regex vs parser: regex는 문자열 pattern matching 도구이며, JavaScript나 Markdown 구조를 완전히 이해하는 parser가 아니다. 이 구분은 MDN이 regex를 string pattern matching으로 정의하는 데 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
- Regex vs glob: glob은 file path pattern에 자주 쓰이고 regex는 string 내부 pattern에 쓰인다. VS Code search는 files to include/exclude와 text search를 구분한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)
- Regex in JavaScript vs editor regex: JavaScript `RegExp`와 editor search regex는 목적은 비슷하지만 구현 세부가 다를 수 있으므로 해당 도구 문서를 확인해야 한다. MDN RegExp와 VS Code Basic Editing 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 선행 개념
- debugging-error-reading: regex search는 error message의 symbol, function name, file pattern을 codebase에서 찾을 때 쓰이므로 오류 메시지 분해 능력이 먼저 필요하다. MDN error reference와 VS Code search 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 후행 개념
- git-log-diff-show: 변경 이력에서 특정 pattern이 언제 들어왔는지 찾으려면 code search와 Git diff/log 이해가 연결된다. Git 공식 문서는 후속 Git KB에서 다룬다.
- code-change-risk-analysis: 대량 변경 전후에 특정 API call이나 prop usage가 남아 있는지 pattern으로 찾는 능력이 필요하다. VS Code search와 regex 개념에 근거한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 코드베이스를 수정한 뒤 남은 import, deprecated prop, old function call을 찾아야 할 때 regex search는 검증 도구가 된다. VS Code Search view와 MDN regular expression pattern matching 설명에 근거한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
AI에게 "이 패턴과 일치하는 코드만 바꿔라"라고 지시할 때 regex를 정확히 설명하면 변경 범위가 줄어든다. 이 연결은 regular expression이 pattern을 match한다는 MDN 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)

## 실무 활용
1. 함수 호출 찾기: `get[A-Z][A-Za-z]+\\(` 패턴으로 `getUser(`, `getLesson(` 같은 호출 후보를 찾는다. MDN character classes와 regular expression pattern 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
2. 줄 시작 import 찾기: `^import .* from`처럼 assertion을 사용해 line beginning 조건을 준다. MDN assertions 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions, 확인: 2026-07-06)
3. 에디터 전체 검색: VS Code Search view에서 regex mode를 켜고 workspace 전체에 남은 패턴을 확인한다. VS Code Basic Editing 문서에 근거한다. (근거: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

```js
const pattern = /^import .* from ["'](.+)["']$/gm
const imports = sourceCode.match(pattern)
```

## FAQ
Q: 정규식은 꼭 외워야 하는가?
A: 모든 문법을 암기하기보다 pattern, character class, assertion, quantifier를 읽는 능력이 먼저다. MDN은 regular expression 구성요소를 reference로 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)

Q: 정규식으로 코드 구조를 완전히 고칠 수 있는가?
A: 정규식은 string pattern matching 도구이므로 복잡한 코드 구조 변환에는 parser가 더 적합할 수 있다. 이 구분은 MDN이 regex를 string pattern matching으로 정의하는 데 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)

Q: VS Code regex와 JavaScript RegExp는 항상 같은가?
A: 목적은 비슷하지만 도구별 구현과 지원 문법은 다를 수 있다. JavaScript `RegExp`는 MDN 문서를, VS Code 검색은 VS Code 문서를 기준으로 확인해야 한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

Q: AI가 정규식을 제안하면 그대로 써도 되는가?
A: 아니며, 작은 샘플 문자열로 match 결과를 확인해야 한다. MDN RegExp 문서는 pattern matching 도구로 설명하고, 실제 검색은 VS Code Search view에서 검증할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: `.`이 아무 문자라고만 알고 줄바꿈 처리와 flags를 확인하지 않는다. 왜 생기나: regex를 자연어처럼 읽기 때문이다. 교정: MDN RegExp flags와 regular expression reference를 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)
2. 실수: `^`와 `$`를 문자열 전체 기준으로만 생각한다. 왜 생기나: multiline flag와 editor search 동작을 확인하지 않기 때문이다. 교정: MDN assertions와 사용하는 도구의 검색 문서를 함께 확인한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions, 확인: 2026-07-06; https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)
3. 실수: 너무 넓은 패턴으로 대량 치환한다. 왜 생기나: match 후보를 확인하지 않고 replace를 실행하기 때문이다. 교정: search result를 먼저 검토하고 필요한 file scope를 제한한다. VS Code Search view 설명에 근거한다. (출처: https://code.visualstudio.com/docs/editor/codebasics, 확인: 2026-07-06)
4. 실수: regex를 parser처럼 사용한다. 왜 생기나: pattern matching과 syntax tree parsing을 구분하지 않기 때문이다. 교정: regex는 string pattern matching 도구로 제한해 사용한다. MDN regular expressions 정의에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions, 확인: 2026-07-06)

## 공식 출처
- regular expression은 문자열에서 character combination을 match하는 pattern이다 — [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions) (확인: 2026-07-06)
- `RegExp` object는 pattern으로 text를 match하는 데 쓰인다 — [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) (확인: 2026-07-06)
- assertions는 위치 조건을 표현한다 — [Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions) (확인: 2026-07-06)
- character classes는 문자 집합을 표현한다 — [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes) (확인: 2026-07-06)
- VS Code Search view는 workspace search와 regular expression search를 제공한다 — [Basic Editing in Visual Studio Code](https://code.visualstudio.com/docs/editor/codebasics) (확인: 2026-07-06)

## Quote Bank
- > "patterns used to match character combinations"
  - 출처: [Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions) (확인: 2026-07-06)
  - 맥락: 정규식의 핵심 정의를 설명할 때 사용한다.
- > "RegExp"
  - 출처: [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) (확인: 2026-07-06)
  - 맥락: JavaScript에서 정규식 객체를 설명할 때 사용한다.
- > "Assertions"
  - 출처: [Assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions) (확인: 2026-07-06)
  - 맥락: `^`, `$`, boundary 같은 위치 조건을 설명할 때 사용한다.
- > "Character classes"
  - 출처: [Character classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes) (확인: 2026-07-06)
  - 맥락: 문자 집합 검색을 설명할 때 사용한다.
- > "Search view"
  - 출처: [Basic Editing in Visual Studio Code](https://code.visualstudio.com/docs/editor/codebasics) (확인: 2026-07-06)
  - 맥락: 에디터 전체 검색에서 regex를 사용하는 맥락을 설명할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
