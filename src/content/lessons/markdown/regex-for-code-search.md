## 한 줄 정의

정규식은 문자열 안에서 특정 패턴을 찾기 위한 표현식이고, 코드 검색에서 정규식은 함수 호출, import문, 속성 접근, 오류 메시지 조각처럼 반복되는 코드 모양을 빠르게 찾는 도구입니다. MDN은 regular expression을 문자열 안의 character combinations를 match하는 pattern이라고 설명합니다. VS Code Basic Editing 문서는 Search view와 regular expression 검색을 설명합니다.

이 강의는 정규식을 "어려운 암호"로 외우게 하려는 문서가 아닙니다. 목표는 AI가 만든 코드나 기존 코드베이스를 검토할 때 필요한 최소 패턴 감각을 갖추는 것입니다. 단순 검색은 정확히 같은 글자를 찾습니다. 정규식 검색은 "get으로 시작하고 대문자가 이어지는 함수 호출", "줄 맨 앞의 import문", "특정 속성을 가진 JSX prop"처럼 더 넓은 모양을 찾을 수 있습니다.

정규식은 강력하지만 parser가 아닙니다. JavaScript나 TypeScript의 문법 구조를 완전히 이해하는 도구가 아니라 문자열 pattern matching 도구입니다. 이 한계를 이해해야 안전하게 씁니다. ==정규식은 코드를 이해하는 도구가 아니라, 코드 안에서 확인할 후보를 좁히는 검색 도구==입니다.

![정규식 코드 검색 흐름](/lesson-diagrams/regex-for-code-search/regex-search-flow.svg)

## 왜 존재하는가

일반 문자열 검색은 정확히 같은 글자만 찾습니다. `getUser(`를 검색하면 `getLesson(`이나 `getProgress(`는 찾지 못합니다. 그런데 코드 리뷰에서는 이런 비슷한 이름들을 한 번에 찾고 싶을 때가 있습니다. MDN이 regular expression을 pattern으로 설명하는 이유가 여기에 있습니다. 정규식은 고정 문자열이 아니라 규칙을 찾습니다.

디버깅에서도 정규식은 유용합니다. 오류 메시지에 특정 function name이 나오거나, stack trace에 비슷한 file path가 반복되거나, console output의 prefix가 일정한 경우 단순 검색보다 pattern search가 빠를 수 있습니다. 앞 강의에서 오류 메시지를 evidence packet으로 만드는 법을 배웠다면, 이번 강의에서는 그 evidence의 일부를 codebase 안에서 찾는 법을 배웁니다.

AI 코딩에서 정규식은 검증 도구가 됩니다. AI가 "이 prop을 모두 바꿨다"고 말했을 때 실제로 old prop이 남아 있는지 검색해야 합니다. AI가 import를 정리했다고 말했는데 unused import가 남았는지 확인할 수도 있습니다. 정규식은 AI를 불신하기 위한 것이 아니라, 변경 범위를 눈으로 확인하기 위한 작은 렌즈입니다.

다만 정규식이 등장한 순간 모든 문제를 정규식으로 풀려고 하면 위험합니다. nested syntax, string literal 내부와 코드 구조의 구분, JSX tree 변환, import reorder 같은 작업은 parser나 lint rule이 더 안전할 수 있습니다. 이 강의의 목적은 "검색 후보 찾기"입니다. 대량 자동 치환은 별도의 검토가 필요합니다.

> [!KEY]
> 정규식 코드 검색은 "정확한 수정"이 아니라 "검토할 후보를 빠르게 좁히는 과정"입니다. 찾은 결과를 눈으로 확인한 뒤 수정해야 합니다.

## 작동 원리

### 1. Pattern이 문자열을 match합니다

MDN regular expressions 문서는 정규식을 character combinations를 match하는 pattern으로 설명합니다. pattern은 "이런 모양의 문자열을 찾아라"는 규칙입니다. 예를 들어 `get[A-Z]`는 `get` 다음에 대문자 하나가 오는 문자열 후보를 찾습니다. `getUser`, `getLesson` 같은 이름이 여기에 걸릴 수 있습니다.

정규식은 한 글자씩 비교하는 단순 검색보다 추상적입니다. 문자 하나를 그대로 쓰면 그 문자를 찾고, character class를 쓰면 여러 가능한 문자 중 하나를 찾고, quantifier를 쓰면 반복 횟수를 표현합니다. 이 조각들이 합쳐져 pattern이 됩니다. 모든 문법을 외우지 않아도 "literal text + character class + quantifier + assertion" 정도로 나누어 읽을 수 있으면 시작할 수 있습니다.

### 2. JavaScript에서는 RegExp로 표현됩니다

MDN RegExp 문서는 `RegExp` object가 text를 pattern으로 matching하는 데 쓰인다고 설명합니다. JavaScript에서는 `/pattern/flags` 같은 literal notation이나 `new RegExp("pattern", "flags")` 같은 constructor를 사용할 수 있습니다. literal은 고정 pattern에 편하고, constructor는 동적으로 pattern을 만들 때 쓰일 수 있습니다.

이 강의의 중심은 JavaScript runtime에서 정규식을 실행하는 것이 아니라 editor search에 정규식을 쓰는 것입니다. 그래도 RegExp를 알아야 하는 이유는 많은 에디터와 도구가 JavaScript 비슷한 정규식 사고를 공유하기 때문입니다. 단, 도구마다 지원 문법과 flags가 다를 수 있으므로 VS Code 검색은 VS Code 문서를 기준으로 확인해야 합니다.

### 3. Character class는 "문자 후보"를 만듭니다

MDN character classes 문서는 문자 집합을 표현하는 정규식 요소를 설명합니다. `[A-Z]`는 대문자 범위를, `[0-9]`는 숫자 범위를, `\d`는 digit 계열을 떠올리게 합니다. code search에서는 함수명, 숫자 suffix, 파일명 일부, prop name pattern을 찾는 데 자주 쓰입니다.

예를 들어 `lesson[A-Z][A-Za-z]+`는 `lessonTitle`, `lessonCount`, `lessonProgress` 같은 후보를 찾을 수 있습니다. 이 pattern은 완벽한 JavaScript identifier parser가 아닙니다. 그러나 codebase에서 naming pattern 후보를 찾는 데는 유용합니다. 찾은 뒤 실제 의미는 사람이 확인해야 합니다.

### 4. Assertion은 위치를 조건으로 씁니다

MDN assertions 문서는 위치 조건을 표현하는 정규식 요소를 설명합니다. `^`는 줄의 시작 조건으로 자주 쓰이고, `$`는 줄의 끝 조건으로 쓰입니다. word boundary는 단어 경계를 찾는 데 쓰입니다. assertion은 문자를 소비하기보다 위치를 제한합니다.

코드 검색에서 `^import .* from`은 줄 시작의 import문 후보를 찾는 데 쓰일 수 있습니다. 그냥 `import`를 검색하면 주석, 문자열, 문서 설명까지 많이 걸릴 수 있습니다. 줄 시작 assertion을 쓰면 후보를 줄일 수 있습니다. 하지만 multiline 여부와 editor 검색 동작은 도구별로 확인해야 합니다.

### 5. Quantifier는 반복을 표현합니다

MDN regular expressions reference는 quantifiers를 구성 요소로 설명합니다. `+`는 하나 이상, `*`는 0개 이상, `{2,4}`는 반복 범위를 표현하는 식입니다. code search에서는 "하나 이상의 문자", "공백이 있을 수도 있음", "숫자가 여러 자리" 같은 조건을 표현할 때 쓰입니다.

quantifier는 편하지만 위험합니다. `.*`는 너무 넓게 match할 수 있습니다. 특히 대량 replace에서 `.*`를 무심코 쓰면 생각보다 많은 텍스트를 잡을 수 있습니다. 정규식 초보자는 넓은 pattern을 만들기보다 작은 sample에서 결과를 확인하고, 검색 결과 목록을 눈으로 검토해야 합니다.

### 6. Editor search는 file scope와 함께 써야 합니다

VS Code Search view는 workspace 검색을 제공합니다. 검색어만 잘 쓰는 것보다 files to include/exclude 같은 scope를 함께 쓰는 것이 중요합니다. `src/**/*.tsx` 같은 범위를 지정하면 문서나 테스트 fixture까지 같이 잡히는 문제를 줄일 수 있습니다. KB는 glob과 regex를 구분합니다. glob은 file path pattern에 가깝고 regex는 문자열 내부 pattern에 가깝습니다.

AI가 대량 변경을 했을 때는 먼저 scope를 줄입니다. 변경 대상이 React component라면 `src/**/*.tsx`에 한정할 수 있습니다. Markdown lesson은 `src/content/**/*.md`로 볼 수 있습니다. pattern과 scope가 함께 있어야 검색 결과가 의미 있게 줄어듭니다.

### 7. Search result는 수정 대상이 아니라 검토 후보입니다

정규식 검색 결과가 나왔다고 해서 모두 바꿔야 하는 것은 아닙니다. 주석, 문자열, 예제 코드, 테스트 snapshot, 실제 runtime code가 섞일 수 있습니다. 정규식은 AST를 이해하지 않습니다. 따라서 검색 결과를 하나씩 보고 수정 여부를 판단해야 합니다.

이 지점이 AI 시대에 특히 중요합니다. "이 regex로 모두 replace해줘"라는 요청은 빠르지만 위험합니다. 더 나은 흐름은 "이 regex로 후보를 찾아 목록화하고, 실제 코드 위치만 수정해라"입니다. 후보 탐색과 변경 실행을 분리하면 사고가 줄어듭니다.

> [!WARNING]
> 정규식은 문자열 pattern을 찾습니다. 코드의 문법 구조를 완전히 이해하지 않으므로 대량 치환 전에 결과 목록을 반드시 검토해야 합니다.

## 스펙과 세부

### Literal text

정규식의 가장 단순한 부분은 그대로 찾을 글자입니다. `import`는 `import`라는 문자열을 찾습니다. 단순 검색과 같아 보이지만, 이 literal text를 character class, assertion, quantifier와 조합하면 더 넓은 pattern이 됩니다.

### Character class

`[A-Z]`, `[a-z]`, `[0-9]` 같은 class는 가능한 문자 집합을 표현합니다. code search에서는 naming convention을 찾는 데 유용합니다. 예를 들어 `use[A-Z][A-Za-z]+`는 React hook처럼 보이는 함수 이름 후보를 찾을 수 있습니다. 다만 실제 hook인지 여부는 검색 결과를 보고 판단해야 합니다.

### Assertion

`^`와 `$`는 줄의 시작과 끝 조건으로 자주 쓰입니다. `^import`는 줄 시작의 import문 후보를 찾습니다. word boundary는 `id`가 `valid` 안에 들어 있는 경우를 피하는 데 도움이 될 수 있습니다. assertion은 위치 조건이므로 match되는 글자 자체를 늘리기보다 후보를 좁힙니다.

### Quantifier

`+`, `*`, `?`, `{n,m}` 같은 quantifier는 반복 횟수를 표현합니다. 초보자는 `.*`를 특히 조심해야 합니다. "아무거나 많이"는 검색 결과를 너무 넓게 만들 수 있습니다. 가능한 한 구체적인 character class와 범위를 쓰는 편이 안전합니다.

### Flags

MDN RegExp 문서는 flags가 matching behavior를 바꾼다고 설명합니다. JavaScript에서는 `g`, `i`, `m` 같은 flags가 흔히 보입니다. editor search에서는 flags를 UI 옵션으로 제공하거나 내부 방식으로 처리할 수 있습니다. 따라서 JavaScript 코드 안의 RegExp와 VS Code 검색창의 regex를 완전히 같다고 가정하면 안 됩니다.

### 코드 검색 레퍼런스 예시

| 목적 | 후보 패턴 | 의미 |
|---|---|---|
| 줄 시작 import 찾기 | `^import .* from` | import문 후보를 줄 시작으로 제한 |
| get 계열 함수 찾기 | `get[A-Z][A-Za-z]+\\(` | `getSomething(` 모양의 호출 후보 |
| console 호출 찾기 | `console\\.(log|error|warn)\\(` | console method 호출 후보 |
| lesson prop 찾기 | `lesson[A-Z][A-Za-z]+` | lesson으로 시작하는 camelCase 이름 후보 |

```js
const importPattern = /^import .* from ["'](.+)["']$/gm
const matches = sourceCode.match(importPattern)
console.log(matches)
```

이 예시는 JavaScript `RegExp`를 사용한 pattern matching입니다. editor search에서도 같은 사고를 사용할 수 있지만, 실제 지원 문법은 도구 문서를 확인해야 합니다. pattern을 작은 sample에서 먼저 확인하고, 결과 목록을 검토한 뒤 수정하는 순서가 안전합니다.

## 원문으로 읽기

> "patterns used to match character combinations"
>
> — character combination을 match하는 pattern.
> [Regular expressions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions)

이 인용은 정규식의 범위를 정확히 정합니다. 정규식은 의미를 이해하는 지능이 아니라 pattern matching 도구입니다. 코드 검색에서 정규식을 쓴다는 것은 코드를 완전히 분석한다는 뜻이 아니라, 검토 후보를 pattern으로 찾는다는 뜻입니다.

> "RegExp"
>
> — RegExp.
> [RegExp — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

JavaScript에서 정규식은 `RegExp` object로 표현됩니다. literal notation과 constructor가 있다는 MDN 설명은 pattern이 코드 안에서도 값으로 다뤄질 수 있음을 보여줍니다. 이 강의는 editor search가 중심이지만, JavaScript RegExp의 존재를 알면 test script나 간단한 검사 도구를 만들 수 있습니다.

> "Assertions"
>
> — assertions.
> [Assertions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions)

assertion은 위치 조건입니다. 줄 시작, 줄 끝, 단어 경계 같은 조건을 사용하면 검색 후보가 크게 줄어듭니다. 코드 검색에서는 `^import`, `$`, boundary 같은 조건이 특히 유용합니다.

관련 원문(링크): [Character classes — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes)

character class는 "가능한 문자 집합"을 만드는 도구입니다. 함수명이나 변수명 pattern을 찾을 때 `[A-Z]`, `[A-Za-z]`, `[0-9]` 같은 class를 사용할 수 있습니다. class는 정규식을 단순 문자열 검색보다 강하게 만드는 핵심 재료입니다.

관련 원문(링크): [Basic Editing in Visual Studio Code](https://code.visualstudio.com/docs/editor/codebasics)

정규식은 에디터 안에서 실제로 쓰일 때 가치가 생깁니다. VS Code Search view는 workspace 안에서 검색 결과를 보여줍니다. AI 변경 후 검증할 때 이 검색 결과는 diff review와 함께 중요한 확인 수단이 됩니다.

## 실전에서

### 패턴 1: 오류 메시지의 symbol을 코드에서 찾습니다

오류 메시지에 `formatLessonCount`가 나오면 먼저 literal search로 찾을 수 있습니다. 이름이 여러 변형으로 등장한다면 `format[A-Z][A-Za-z]+` 같은 pattern으로 후보를 넓힐 수 있습니다. 이때 검색 결과가 함수 선언인지 호출인지, 주석인지 테스트인지 확인해야 합니다.

### 패턴 2: AI가 바꿨다고 한 prop이 남았는지 확인합니다

AI가 `lessonTitle`을 `title`로 바꿨다고 말하면 `lessonTitle\\b` 같은 pattern으로 남은 후보를 검색할 수 있습니다. word boundary를 쓰면 `lessonTitleLong` 같은 다른 이름과 구분하는 데 도움이 될 수 있습니다. 단, boundary 동작은 도구별로 확인해야 합니다.

### 패턴 3: import문을 검토합니다

`^import .* from`은 줄 시작 import문 후보를 찾습니다. AI가 파일을 옮기거나 dependency를 제거했을 때 import가 남아 있는지 확인할 수 있습니다. 그러나 이 pattern은 모든 import syntax를 완벽히 다루지 않습니다. multiline import나 type import 같은 case는 추가 검토가 필요합니다.

### 패턴 4: console log를 릴리스 전에 찾습니다

`console\\.(log|warn|error)\\(` 같은 pattern은 console 호출 후보를 찾습니다. 모든 console이 나쁜 것은 아니지만, 임시 debugging log가 남아 있는지 확인하는 데 유용합니다. 검색 결과를 보고 의도 있는 logging인지 임시 코드인지 판단합니다.

### 패턴 5: replace 전에 search result를 freeze합니다

대량 치환 전에는 먼저 search result를 확인합니다. 어떤 파일이 걸리는지, 몇 개가 걸리는지, 주석과 문서가 섞였는지 봅니다. 바로 replace를 실행하지 않고 후보 목록을 검토하면 사고가 줄어듭니다. AI에게도 "먼저 후보를 나열하고, 그다음 실제 코드만 수정해라"라고 지시할 수 있습니다.

> [!TIP]
> 정규식 검색을 AI에게 맡길 때는 pattern, file scope, 제외할 경로, 수정 전 보고 형식을 함께 주세요. 검색과 수정을 분리하면 대량 변경 위험이 크게 줄어듭니다.

## 한계와 트레이드오프

첫 번째 한계는 정규식이 parser가 아니라는 점입니다. nested JSX, TypeScript generic, string literal 내부 code sample처럼 구조적 문맥이 중요한 경우 regex만으로 정확히 수정하기 어렵습니다. 이때는 lint rule, TypeScript compiler, AST 기반 codemod 같은 도구가 더 적합할 수 있습니다.

두 번째 한계는 pattern이 너무 넓거나 너무 좁을 수 있다는 점입니다. 넓으면 false positive가 많고, 좁으면 실제 후보를 놓칩니다. 정규식 검색은 한 번에 완벽한 pattern을 만드는 활동이 아니라, 검색 결과를 보며 조정하는 활동입니다.

세 번째 한계는 도구마다 regex dialect가 다를 수 있다는 점입니다. JavaScript `RegExp`와 VS Code search는 비슷한 사고를 공유하지만 완전히 같다고 가정하면 안 됩니다. flags, multiline, lookaround 지원은 사용하는 환경에서 확인해야 합니다.

네 번째 한계는 replace의 위험입니다. search는 비교적 안전하지만 replace는 코드를 바꿉니다. AI가 정규식 replace를 제안하면 먼저 후보를 보여달라고 요청하고, 실제 변경은 작게 나누는 편이 좋습니다. 변경 후에는 테스트와 diff review가 필요합니다.

다섯 번째 한계는 정규식 학습이 과해질 수 있다는 점입니다. 모든 패턴을 외우는 것보다 자주 쓰는 조각을 알고, 모르는 조각은 MDN reference에서 확인하는 편이 낫습니다. ==정규식의 목표는 멋진 한 줄이 아니라, 검토할 후보를 빠르게 찾고 안전하게 줄이는 것입니다.==

## 더 읽기

먼저 MDN Regular expressions reference를 읽어 정규식이 pattern matching 도구라는 큰 정의를 잡으세요. 그 다음 RegExp 문서에서 literal notation과 constructor, flags를 확인합니다. Assertions와 Character classes 문서는 코드 검색에서 가장 자주 쓰는 조각이므로 따로 읽을 가치가 있습니다. 마지막으로 VS Code Basic Editing의 Search view 설명을 실제 에디터와 대조하세요.

- [Regular expressions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions)
- [RegExp — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
- [Assertions — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions)
- [Character classes — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes)
- [Basic Editing in Visual Studio Code](https://code.visualstudio.com/docs/editor/codebasics)

읽을 때는 다섯 질문을 사용하세요. 이 pattern은 무엇을 literal로 찾는가. 어떤 character class를 쓰는가. 위치 조건은 있는가. 반복 범위가 너무 넓지는 않은가. 그리고 이 결과를 바로 수정할 것인가, 먼저 후보로 검토할 것인가. 이 질문이 AI 코드 변경의 안전장치가 됩니다.
