# 용어 초안: regex-for-code-search

## Regular Expression
- category: 개발 기초
- shortDefinition: 문자열에서 특정 character pattern을 찾기 위한 표현식
- explanation: Regular Expression은 character combinations를 match하는 pattern입니다. 코드 검색에서는 함수명, import문, prop 이름, console 호출처럼 반복되는 텍스트 모양을 찾아 검토 후보를 줄이는 데 쓰입니다.
- related: ["RegExp", "Code Search", "Pattern Matching"]

## RegExp
- category: JavaScript
- shortDefinition: JavaScript에서 regular expression pattern을 표현하는 object
- explanation: RegExp는 text를 pattern으로 matching하는 JavaScript object입니다. literal notation과 constructor 방식이 있으며, flags로 matching behavior를 바꿀 수 있습니다. editor search와 JavaScript RegExp는 비슷하지만 도구별 차이를 확인해야 합니다.
- related: ["Regular Expression", "Flags", "Pattern Matching"]

## Character Class
- category: 개발 기초
- shortDefinition: 정규식에서 가능한 문자 집합을 표현하는 요소
- explanation: Character Class는 `[A-Z]`, `[0-9]`처럼 여러 문자 후보 중 하나를 match하게 합니다. 코드 검색에서는 naming pattern, 숫자 suffix, 특정 문자 범위를 찾을 때 사용합니다.
- related: ["Regular Expression", "Pattern Matching", "Code Search"]

## Assertion
- category: 개발 기초
- shortDefinition: 정규식에서 줄 시작, 줄 끝, 단어 경계 같은 위치 조건을 표현하는 요소
- explanation: Assertion은 문자를 소비하기보다 match 위치를 제한합니다. `^import`처럼 줄 시작 조건을 사용하면 일반 문자열 검색보다 후보를 줄일 수 있습니다.
- related: ["Regular Expression", "Search Scope", "Code Search"]

## Search Scope
- category: 개발 도구
- shortDefinition: 코드 검색이 적용될 파일과 폴더 범위
- explanation: Search Scope는 VS Code Search view 같은 도구에서 어떤 파일을 포함하거나 제외할지 정하는 범위입니다. 정규식 pattern과 scope를 함께 지정해야 주석, 문서, fixture 같은 불필요한 결과를 줄일 수 있습니다.
- related: ["Code Search", "Regular Expression", "File Path"]
