---
id: html-semantic-elements
title: "HTML Semantic Elements (HTML 의미 요소)"
topicGroup: T02
status: approved
score: 88
level: 기초
prerequisites: [files-folders-paths]
successors: [css-cascade-layout, javascript-dom-events, accessibility-basics]
related: [browser-rendering-network]
consumers:
  lessons: [html-semantic-elements]
  glossary: [Semantic HTML, Content Sectioning, Main Element, Nav Element, Article Element]
sources:
  - { title: "HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements", checked: 2026-07-06 }
  - { title: "<main>: The Main element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main", checked: 2026-07-06 }
  - { title: "<nav>: The Navigation Section element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav", checked: 2026-07-06 }
  - { title: "<article>: The Article Contents element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article", checked: 2026-07-06 }
  - { title: "<section>: The Generic Section element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section", checked: 2026-07-06 }
updated: 2026-07-06
---

## 정의
HTML semantic elements는 문서 구조와 콘텐츠 목적을 element 이름으로 표현하는 HTML 요소 묶음이다. MDN HTML elements reference는 HTML elements가 tags로 만들어지며 기능별로 그룹화된다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
semantic element는 `<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`처럼 페이지의 역할을 드러내는 요소를 포함한다. MDN은 content sectioning elements가 document content를 logical pieces로 조직한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)

## 역사
HTML은 문서의 구조와 의미를 표시하기 위한 markup language이며, MDN HTML elements reference는 root, metadata, content sectioning, text content, inline text semantics 같은 기능 그룹으로 요소를 정리한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
semantic elements의 필요는 generic container인 `<div>`만으로 페이지를 구성할 때 문서 outline, navigation, main content, reusable article 같은 의미가 코드에서 드러나지 않는 문제와 연결된다. MDN은 `<div>`가 generic container이고 styled되기 전에는 content나 layout에 effect가 없다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)

## 해결하려는 문제
semantic elements가 없으면 페이지의 main content, navigation, article, section, header, footer 같은 역할을 class 이름이나 시각적 배치만으로 추측해야 한다. MDN은 `<main>`이 document body의 dominant content를 나타내고, `<nav>`가 navigation links를 제공하는 section을 나타낸다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
문서 구조가 불명확하면 CSS selector, JavaScript DOM 탐색, 접근성 tree 해석, AI 코드 변경 검토가 모두 어려워진다. MDN은 text content elements가 content의 purpose 또는 structure를 identify하며 accessibility와 SEO에 중요하다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)

## 핵심 개념
1. Element와 tag: MDN은 HTML elements가 tags로 만들어진다고 설명한다. element는 문서 구조의 단위이고 tag는 element를 작성하는 markup 표기다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
2. Content sectioning: MDN은 content sectioning elements가 document content를 logical pieces로 조직한다고 설명한다. header, footer navigation, heading elements와 함께 broad outline을 만든다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
3. `<main>`: MDN은 `<main>`이 document body의 dominant content를 나타내며 central topic 또는 application의 central functionality와 직접 관련된 content라고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main, 확인: 2026-07-06)
4. `<nav>`: MDN은 `<nav>`가 current document 또는 other documents로 가는 navigation links를 제공하는 page section이라고 설명한다. common examples로 menus, tables of contents, indexes가 제시된다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav, 확인: 2026-07-06)
5. `<article>`: MDN은 `<article>`이 independently distributable or reusable composition을 나타내며 forum post, article, blog entry, product card 등을 예로 든다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article, 확인: 2026-07-06)
6. `<section>`: MDN은 `<section>`이 더 구체적인 semantic element가 없을 때 쓰는 generic standalone section이며, few exceptions를 제외하고 heading을 가져야 한다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section, 확인: 2026-07-06)

## 관련 기술
HTML semantic elements와 CSS layout은 역할이 다르다. semantic elements는 document content의 meaning과 structure를 나타내고, CSS는 appearance와 layout을 담당한다. MDN은 metadata for styles/scripts와 content sectioning을 별도 그룹으로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
HTML semantic elements와 DOM은 연결된다. DOM KB의 선행 자료로서 semantic HTML은 DOM tree의 element node와 접근성 tree가 해석할 구조를 제공한다. MDN DOM 문서는 browser가 HTML document를 parse해 DOM tree를 만든다고 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)

## 선행 개념
files-folders-paths: HTML file이 프로젝트 folder tree 안에서 어디에 있는지 알아야 semantic markup을 어느 file에서 수정해야 하는지 추적할 수 있다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)

## 후행 개념
css-cascade-layout: semantic HTML 구조가 있어야 CSS selector와 layout 대상이 명확해진다. MDN은 elements를 function별로 묶고 CSS 문서가 selector와 cascade를 다룬다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
javascript-dom-events: browser는 HTML document를 DOM tree로 만들고 JavaScript는 DOM API로 structure, style, content를 바꾼다. (출처: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model, 확인: 2026-07-06)

## AI 시대에서의 의미
AI가 화면 코드를 생성할 때 `<div>`만 반복하면 화면은 보일 수 있어도 main content, navigation, article boundary가 코드에서 드러나지 않는다. MDN이 `<main>`, `<nav>`, `<article>`, `<section>`의 역할을 구분하는 설명은 AI 생성 HTML 검토 기준이 된다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
AI에게 UI 수정을 지시할 때 "상단 메뉴"보다 "`<nav>` 안의 링크 목록" 또는 "`<main>`의 lesson content"처럼 semantic element 기준으로 말하면 변경 범위가 좁아진다. 이 연결은 MDN의 content sectioning와 individual element 설명에 근거한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main, 확인: 2026-07-06)

## 실무 활용
1. 페이지 골격 작성: header, nav, main, article, section, footer를 먼저 잡고 CSS class를 붙인다. MDN은 content sectioning elements가 logical pieces를 만든다고 설명한다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
2. 학습 사이트 강의 페이지: lesson 본문은 `<main>`의 dominant content로, sidebar 목차는 navigation links를 제공하는 `<nav>`로 표현할 수 있다. `<main>`과 `<nav>` 설명에 근거한다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav, 확인: 2026-07-06)
3. 카드 목록: 독립적으로 재사용 가능한 강의 카드나 글 preview는 `<article>` 후보가 될 수 있다. MDN은 product card와 blog entry를 article 예로 든다. (근거: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article, 확인: 2026-07-06)

```html
<body>
  <header>
    <nav aria-label="주요 메뉴">
      <a href="/curriculum">커리큘럼</a>
    </nav>
  </header>
  <main>
    <article>
      <h1>HTML 의미 구조</h1>
      <section>
        <h2>오늘 배울 개념</h2>
        <p>문서의 목적을 element 이름으로 드러냅니다.</p>
      </section>
    </article>
  </main>
</body>
```

## FAQ
Q: semantic element는 화면 모양을 자동으로 예쁘게 바꾸는가?
A: 아니다. MDN은 HTML elements를 content structure와 function 기준으로 설명하고, style information은 CSS가 담당한다. semantic element는 의미와 구조를 드러내는 역할이다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)

Q: `<section>`과 `<article>`은 같은가?
A: 아니다. MDN은 `<article>`을 independently distributable or reusable composition으로, `<section>`을 더 구체적인 semantic element가 없을 때의 generic standalone section으로 설명한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article, 확인: 2026-07-06; https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section, 확인: 2026-07-06)

Q: `<nav>` 안에는 모든 링크를 넣어야 하는가?
A: 아니다. MDN은 `<nav>`를 navigation links를 제공하는 page section으로 설명하고 menus, table of contents, indexes를 common examples로 제시한다. 모든 단일 링크가 nav가 되는 것은 아니다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav, 확인: 2026-07-06)

## 자주 하는 실수
1. 실수: 모든 layout box를 `<div>`로 만든다. 왜 생기나: 화면이 보이면 구조도 충분하다고 생각하기 때문이다. 교정: main, nav, article, section처럼 역할이 있는 경우 MDN element 설명을 기준으로 고른다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)
2. 실수: `<section>`에 heading을 두지 않는다. 왜 생기나: section을 단순 여백 wrapper로 보기 때문이다. 교정: MDN의 "Sections should always have a heading" 기준을 적용한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section, 확인: 2026-07-06)
3. 실수: semantic element와 CSS class를 경쟁 관계로 본다. 왜 생기나: HTML과 CSS의 역할 분리를 놓치기 때문이다. 교정: semantic element로 구조를 드러내고 class로 스타일 hook을 제공한다. (출처: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements, 확인: 2026-07-06)

## 공식 출처
- HTML elements are created using tags — [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) (확인: 2026-07-06)
- Content sectioning elements organize document content into logical pieces — [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) (확인: 2026-07-06)
- `<main>` represents the dominant body content — [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main) (확인: 2026-07-06)
- `<nav>` represents a navigation-links section — [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav) (확인: 2026-07-06)
- `<article>` and `<section>` have different semantic roles — [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article), [`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) (확인: 2026-07-06)

## Quote Bank
- > "This page lists all the HTML elements, which are created using tags."
  - 출처: [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) (확인: 2026-07-06)
  - 맥락: element와 tag의 관계를 설명할 때 사용한다.
- > "Content sectioning elements allow you to organize the document content into logical pieces."
  - 출처: [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) (확인: 2026-07-06)
  - 맥락: semantic sectioning의 목적을 설명할 때 사용한다.
- > "Represents the dominant content of the body of a document."
  - 출처: [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main) (확인: 2026-07-06)
  - 맥락: main content의 의미를 설명할 때 사용한다.
- > "Represents a section of a page whose purpose is to provide navigation links"
  - 출처: [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav) (확인: 2026-07-06)
  - 맥락: navigation 영역의 의미를 설명할 때 사용한다.
- > "Sections should always have a heading, with very few exceptions."
  - 출처: [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) (확인: 2026-07-06)
  - 맥락: section misuse를 교정할 때 사용한다.

## 변경 이력
- 2026-07-06: 최초 작성 (Codex, P-01)
