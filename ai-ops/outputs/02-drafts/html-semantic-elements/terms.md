# 용어 초안: html-semantic-elements

## Semantic HTML
- category: 웹 개발
- shortDefinition: 화면의 모양이 아니라 콘텐츠의 역할과 구조가 드러나도록 HTML 요소를 고르는 방식
- explanation: Semantic HTML은 `main`, `nav`, `article`, `section`처럼 요소 이름 자체가 문서 안에서의 역할을 말하게 하는 작성 방식입니다. CSS class나 시각적 배치만으로 구조를 추측하게 두지 않고, DOM tree와 접근성 해석, AI 코드 수정 범위가 읽을 수 있는 의미를 HTML에 남깁니다.
- related: ["HTML", "DOM", "Accessibility"]

## Content Sectioning
- category: 웹 개발
- shortDefinition: 문서 내용을 논리적인 조각으로 조직하는 HTML 요소 범주
- explanation: Content Sectioning은 `article`, `section`, `nav`, `aside`, heading처럼 페이지 내용을 logical pieces로 나누는 HTML 요소 흐름입니다. 강의 본문, 목차, 독립 카드처럼 서로 다른 역할을 가진 영역을 분리해 문서 구조를 읽기 쉽게 만듭니다.
- related: ["Semantic HTML", "HTML", "Heading"]

## Main Element
- category: HTML
- shortDefinition: 문서 body에서 중심 주제나 핵심 기능과 직접 연결된 dominant content 영역
- explanation: Main Element는 `<main>`으로 작성하며, 페이지에서 반복되는 navigation이나 footer가 아니라 해당 문서의 중심 내용을 나타냅니다. 학습 사이트에서는 강의 본문이나 실제 작업 영역을 main으로 잡으면 AI에게 변경 범위를 설명할 때 기준점이 됩니다.
- related: ["Semantic HTML", "HTML", "DOM"]

## Nav Element
- category: HTML
- shortDefinition: 현재 문서나 다른 문서로 이동하는 navigation links를 제공하는 영역
- explanation: Nav Element는 `<nav>`로 작성하며 메뉴, 목차, index처럼 이동을 담당하는 링크 묶음을 나타냅니다. 모든 링크를 nav에 넣는 것이 아니라, 사용자가 길을 찾는 데 쓰는 navigation section을 명확히 표시하는 데 사용합니다.
- related: ["Semantic HTML", "Navigation", "Accessibility"]

## Article Element
- category: HTML
- shortDefinition: 독립적으로 배포되거나 재사용될 수 있는 콘텐츠 단위
- explanation: Article Element는 `<article>`로 작성하며 글, forum post, product card, 강의 preview처럼 따로 떼어도 의미가 남는 구성에 적합합니다. 리스트 안의 카드나 학습 콘텐츠 단위를 AI가 수정할 때 article boundary는 재사용 가능한 단위를 알려 줍니다.
- related: ["Semantic HTML", "Content Sectioning", "HTML"]
