## 한 줄 정의

HTML 의미 구조는 `<main>`, `<nav>`, `<article>`, `<section>`처럼 element 이름으로 문서 안의 역할을 드러내는 작성 방식입니다. MDN은 HTML elements가 tags로 만들어지며 기능별로 그룹화된다고 설명하고, content sectioning elements가 document content를 logical pieces로 조직한다고 말합니다. 그래서 semantic HTML은 "새로운 화면 장식 기술"이 아니라, 같은 화면을 더 읽을 수 있는 문서 구조로 만드는 기준입니다.

초보자는 HTML을 처음 배울 때 `<div>`와 class 이름만으로도 화면을 만들 수 있다는 점 때문에 semantic element를 선택 과목처럼 느낄 수 있습니다. 하지만 실제 개발에서는 화면이 보이는 것과 코드가 이해 가능한 것은 다릅니다. navigation, main content, reusable article, standalone section의 경계를 HTML 안에 남기지 않으면 CSS selector, JavaScript DOM 탐색, 접근성 해석, AI 코드 변경 검토가 모두 추측에 기대게 됩니다.

이 강의에서 기억할 중심 문장은 이것입니다. ==semantic element는 화면을 자동으로 예쁘게 만드는 태그가 아니라, 콘텐츠의 의미와 수정 경계를 코드에 남기는 장치==입니다. AI와 함께 코드를 바꾸는 시대에는 이 경계가 특히 중요합니다. "상단 메뉴를 고쳐줘"보다 "`<nav>` 안의 링크 목록을 고쳐줘"가 훨씬 좁고 검토 가능한 요청이기 때문입니다.

![HTML 의미 구조 지도](/lesson-diagrams/html-semantic-elements/semantic-document-map.svg)

## 왜 존재하는가

HTML은 본래 문서 구조를 표시하는 markup language입니다. MDN의 HTML elements reference가 root, metadata, content sectioning, text content, inline text semantics처럼 요소를 기능 그룹으로 정리하는 이유도 여기에 있습니다. HTML은 화면에 "무엇이 보이는지"만 적는 파일이 아니라, 문서가 어떤 구조와 역할을 갖는지 브라우저와 도구가 읽을 수 있게 하는 형식입니다.

문제는 generic container인 `<div>`만으로도 화면을 만들 수 있다는 데서 시작합니다. `<div class="top">`, `<div class="content">`, `<div class="box">` 같은 구조는 CSS를 붙이면 원하는 모양으로 보일 수 있습니다. 그러나 이 구조만으로는 어느 영역이 navigation인지, 어느 영역이 문서의 dominant content인지, 어느 카드가 독립적으로 재사용 가능한 article인지 HTML 표준 요소 이름에서 바로 알기 어렵습니다.

semantic elements는 이 빈칸을 채우기 위해 중요합니다. `<main>`은 문서 body의 dominant content를 나타내고, `<nav>`는 navigation links를 제공하는 section을 나타냅니다. `<article>`은 independently distributable or reusable composition을 나타내며, `<section>`은 더 구체적인 semantic element가 없을 때 쓰는 standalone section입니다. 이 구분이 있으면 구조를 class 이름의 관습에만 맡기지 않아도 됩니다.

> [!KEY]
> HTML 의미 구조의 목적은 "태그 이름을 다양하게 쓰기"가 아닙니다. 페이지 안에서 역할이 다른 영역을 코드가 직접 말하게 하는 것입니다.

AI 시대에는 이 필요가 더 선명해집니다. AI가 생성한 HTML이 `<div>`만 반복해도 화면은 어느 정도 나올 수 있습니다. 하지만 사람이 검토할 때는 "왜 이 영역이 여기 있는가", "이 링크 묶음은 navigation인가", "이 카드는 독립 단위인가", "이 section에는 heading이 있는가"를 봐야 합니다. semantic element는 AI 출력이 구조를 이해하고 만든 것인지, 아니면 보이는 배치만 흉내 낸 것인지 판단하는 첫 기준입니다.

## 작동 원리

### 1. Element와 tag를 구분합니다

MDN은 HTML elements가 tags로 만들어진다고 설명합니다. 이 말은 초보자에게 작지만 중요한 구분을 줍니다. tag는 `<main>`이나 `</main>`처럼 코드에 쓰는 표기이고, element는 브라우저가 문서 구조 안에서 다루는 단위입니다. 우리는 tag를 입력하지만, 브라우저와 DOM은 element 구조를 해석합니다.

이 구분이 없으면 HTML을 "꺾쇠괄호 문법"으로만 보게 됩니다. 그러나 의미 구조를 이해하려면 tag spelling보다 element role을 먼저 봐야 합니다. `<nav>`라는 tag를 쓴다는 것은 "여기는 navigation links를 제공하는 section"이라는 element 의미를 문서에 넣는 것입니다. `<main>`을 쓴다는 것은 "여기는 body에서 중심 주제 또는 핵심 기능과 직접 관련된 content"라는 신호를 주는 것입니다.

### 2. Content sectioning은 문서를 logical pieces로 나눕니다

MDN은 content sectioning elements가 document content를 logical pieces로 organize한다고 설명합니다. 이 표현에서 핵심은 "logical"입니다. sectioning은 화면의 박스를 나누는 일이 아니라, 문서 내용을 논리적인 조각으로 나누는 일입니다. 예를 들어 학습 사이트에서 sidebar 목차, 강의 본문, 강의 카드, footer link는 서로 다른 역할을 갖습니다.

이 역할을 HTML에 남기면 CSS와 JavaScript는 더 안전한 대상을 얻습니다. CSS selector가 `.box:nth-child(2)` 같은 위치 의존 방식에 기대기보다 `main article` 또는 `nav a`처럼 문서 구조를 따라갈 수 있습니다. JavaScript도 DOM을 탐색할 때 의미 있는 경계를 기준으로 이벤트나 상태 변경 대상을 좁힐 수 있습니다. ==semantic structure는 CSS와 JavaScript가 기대는 문서 지도를 먼저 그리는 일==입니다.

### 3. `<main>`은 반복 장식이 아니라 dominant content입니다

`<main>`은 문서 body의 dominant content를 나타냅니다. MDN 설명에 따르면 이 content는 central topic 또는 application의 central functionality와 직접 관련됩니다. 즉 `<main>`은 "가장 큰 박스"나 "가운데에 있는 영역"이 아니라, 해당 페이지의 핵심 내용입니다.

학습 사이트라면 강의 상세 페이지의 lesson body가 `<main>`에 들어가는 후보입니다. 반대로 모든 페이지에 반복되는 header, nav, footer는 보통 main content 자체가 아닙니다. 이 구분이 중요한 이유는 AI에게 변경을 맡길 때 main boundary가 작업 범위를 제한하기 때문입니다. "페이지 내용 문단을 고쳐줘"라는 요청보다 "`<main>` 안의 `<article>` 본문 문단만 고쳐줘"가 부작용을 줄입니다.

### 4. `<nav>`는 모든 링크가 아니라 navigation section입니다

`<nav>`는 current document 또는 other documents로 가는 navigation links를 제공하는 page section입니다. MDN은 menu, table of contents, index를 common examples로 듭니다. 이 설명은 두 가지 오해를 막습니다. 첫째, `<nav>`는 단순히 링크가 하나 있다는 이유로 쓰는 태그가 아닙니다. 둘째, navigation 목적의 링크 묶음은 `<div>`보다 `<nav>`로 드러내는 편이 좋습니다.

강의 사이트에는 top navigation, sidebar table of contents, curriculum index 같은 navigation 구조가 있습니다. 이 구조가 `<nav>`로 표시되면 사용자는 물론이고 AI도 "이 링크 묶음은 이동을 위한 영역"이라고 읽을 수 있습니다. AI에게 "목차 링크를 추가해줘"라고 지시할 때도 "`<nav aria-label=\"강의 목차\">` 안에 추가해줘"처럼 말할 수 있습니다.

### 5. `<article>`은 독립 단위를 표시합니다

MDN은 `<article>`이 independently distributable or reusable composition을 나타내며 forum post, article, blog entry, product card 등을 예로 듭니다. 이 기준은 card UI를 만들 때 특히 유용합니다. 화면에서 반복되는 카드가 단순 장식인지, 각각 독립된 콘텐츠 단위인지 판단해야 하기 때문입니다.

예를 들어 curriculum page의 lesson card는 하나씩 따로 링크되고, 제목과 summary를 가지며, 다른 목록에도 재사용될 수 있습니다. 이런 경우 `<article>` 후보가 됩니다. 반대로 단지 여백을 만들기 위한 내부 wrapper라면 article이 아니라 CSS class가 붙은 container일 수 있습니다. article 선택의 핵심은 "이 조각이 따로 떼어져도 의미가 남는가"입니다.

### 6. `<section>`은 만능 wrapper가 아닙니다

`<section>`은 더 구체적인 semantic element가 없을 때 쓰는 generic standalone section입니다. MDN은 few exceptions를 제외하고 section은 heading을 가져야 한다고 설명합니다. 이 말은 `<section>`을 여백 wrapper처럼 마구 쓰면 안 된다는 뜻입니다. section은 문서 outline에서 하나의 주제 조각으로 읽힐 수 있어야 합니다.

초보자가 흔히 하는 실수는 `<div>`보다 semantic해 보인다는 이유만으로 모든 wrapper를 `<section>`으로 바꾸는 것입니다. 하지만 section이 의미 있는 주제 단위라면 보통 heading이 필요합니다. heading이 없다면 그 영역이 독립 section인지, 그냥 styling wrapper인지 다시 확인해야 합니다. semantic HTML은 "div 금지 운동"이 아니라, 역할에 맞는 element 선택입니다.

> [!WARNING]
> `<section>`은 여백을 주기 위한 상자가 아닙니다. heading이 붙을 수 있는 독립 주제 단위인지 먼저 확인해야 합니다.

### 7. DOM과 접근성 해석은 HTML 구조 위에서 시작합니다

HTML semantic elements는 DOM과도 연결됩니다. MDN DOM 문서는 browser가 HTML document를 parse해 DOM tree를 만든다고 설명합니다. 즉 HTML에서 어떤 element를 선택했는지는 DOM tree의 element node 구조에 영향을 줍니다. JavaScript가 `querySelector`로 찾고 이벤트를 붙이는 대상도 결국 이 DOM 구조 위에 있습니다.

KB는 접근성 tree 해석도 문서 구조 불명확성의 영향을 받는다고 설명합니다. 이 강의가 접근성 세부 기술을 다루지는 않지만, semantic element가 accessibility와 SEO에 중요하다는 MDN 설명을 기준으로 삼을 수 있습니다. 사용자는 화면을 눈으로만 읽지 않고, 브라우저와 보조 기술과 검색 엔진과 AI 도구도 HTML 구조를 읽습니다. semantic element는 이 여러 독자에게 같은 역할 신호를 남기는 방식입니다.

## 스펙과 세부

### HTML elements reference를 읽는 법

MDN HTML elements reference는 모든 element를 한 줄 목록으로만 나열하지 않습니다. root, metadata, content sectioning, text content, inline text semantics처럼 기능 그룹으로 나눕니다. 이 분류 자체가 HTML을 읽는 방법입니다. 새 element를 외울 때 "이 element가 어느 그룹에 속하는가"를 보면 그 element가 문서에서 맡는 역할을 더 정확히 추론할 수 있습니다.

### `<main>`의 세부 기준

`<main>`은 body의 dominant content입니다. 이 기준은 page마다 하나의 중심 내용을 찾는 데 도움을 줍니다. 학습 사이트에서 강의 본문과 사이드바가 함께 있을 때, navigation sidebar는 `<nav>` 후보이고 강의 body는 `<main>` 후보입니다. `<main>`을 layout 중심에 있는 모든 container에 붙이는 것이 아니라, 해당 문서의 central topic 또는 central functionality를 기준으로 선택합니다.

### `<nav>`의 범위

`<nav>`는 navigation links를 제공하는 page section입니다. common examples가 menu, table of contents, index라는 점을 기억하면 좋습니다. 모든 link가 nav가 되는 것은 아닙니다. 본문 중간의 참고 링크 하나, footer의 저작권 링크 하나가 반드시 nav section이 되는 것은 아닙니다. navigation 목적의 묶음인지가 기준입니다.

### `<article>`과 `<section>`의 차이

`<article>`은 independently distributable or reusable composition입니다. `<section>`은 더 구체적인 semantic element가 없을 때 쓰는 generic standalone section입니다. 둘 다 "박스"처럼 보일 수 있지만, 판단 기준은 다릅니다. article은 독립 배포와 재사용성이 핵심이고, section은 문서 안의 주제 단위가 핵심입니다.

### heading의 역할

MDN은 section이 few exceptions를 제외하고 heading을 가져야 한다고 설명합니다. heading은 사용자가 문서를 스캔할 때뿐 아니라, section이 독립 주제라는 신호를 주는 역할을 합니다. 그래서 section을 만들고도 제목이 떠오르지 않는다면, 그 영역이 semantic section인지 아닌지를 다시 생각해야 합니다.

### semantic element와 CSS class는 경쟁하지 않습니다

semantic element는 meaning과 structure를 드러내고, CSS class는 styling hook을 제공합니다. `<nav class="site-nav">`처럼 둘은 함께 쓰입니다. semantic element를 썼다고 class가 필요 없어지는 것도 아니고, class가 있다고 semantic element를 포기해야 하는 것도 아닙니다. 역할은 HTML에, 모양은 CSS에, 동작은 JavaScript에 더 가깝게 나누어 생각하면 됩니다.

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

이 예시는 KB의 실무 예시를 강의 맥락으로 확장한 것입니다. `<header>`는 page header, `<nav>`는 주요 메뉴, `<main>`은 중심 본문, `<article>`은 강의 단위, `<section>`은 강의 안의 주제 조각입니다. 이 구조는 CSS 없이도 역할이 읽히고, CSS를 붙이면 layout을 만들 수 있으며, JavaScript가 DOM을 탐색할 때도 의미 있는 경계를 제공합니다.

## 원문으로 읽기

> "This page lists all the HTML elements, which are created using tags."
>
> — 이 페이지는 태그로 만들어지는 모든 HTML 요소를 나열한다.
> [HTML elements reference — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) (CC-BY-SA)

이 문장은 element와 tag를 같은 것으로 뭉개지 않게 해 줍니다. 우리는 tag를 쓰지만, 목표는 element 구조를 만드는 것입니다. AI가 HTML을 생성할 때도 tag 문자열이 맞는지만 볼 것이 아니라, 그 tag가 어떤 element 역할을 갖는지 확인해야 합니다.

> "Content sectioning elements allow you to organize the document content into logical pieces."
>
> — content sectioning 요소는 문서 내용을 논리적인 조각으로 조직하게 해 준다.
> [HTML elements reference — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements) (CC-BY-SA)

이 인용은 semantic HTML의 목적을 가장 잘 보여 줍니다. logical pieces라는 표현은 visual boxes와 다릅니다. 화면 배치를 나누는 것보다 먼저, 문서 안의 의미 있는 조각을 나누는 일이 semantic structure의 출발점입니다.

> "Represents the dominant content of the body of a document."
>
> — 문서 body의 지배적인 중심 콘텐츠를 나타낸다.
> [`<main>` element — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main) (CC-BY-SA)

`<main>`을 "가운데 박스"로 외우면 금방 깨집니다. dominant content라는 기준은 페이지의 핵심 주제와 직접 연결된 영역을 찾으라는 뜻입니다. 학습 사이트에서는 lesson body가 이 기준의 대표 예시입니다.

> "Represents a section of a page whose purpose is to provide navigation links"
>
> — navigation links를 제공하는 것이 목적인 페이지 section을 나타낸다.
> [`<nav>` element — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav) (CC-BY-SA)

`<nav>`는 링크가 있기 때문에 쓰는 element가 아니라, 이동을 돕는 section이기 때문에 쓰는 element입니다. 이 차이를 알면 footer의 단일 링크와 sidebar table of contents를 같은 방식으로 처리하지 않게 됩니다.

> "Sections should always have a heading, with very few exceptions."
>
> — section은 아주 적은 예외를 제외하고 항상 heading을 가져야 한다.
> [`<section>` element — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section) (CC-BY-SA)

이 문장은 `<section>` 남용을 막는 실무 기준입니다. section을 만들었는데 heading이 어색하다면, 그 영역은 독립 주제 단위가 아니라 styling wrapper일 가능성이 있습니다. 이 판단 기준은 AI가 `<section>`을 많이 생성했을 때 검토 체크리스트로 바로 쓸 수 있습니다.

## 실전에서

### 1. 페이지 골격은 역할부터 잡습니다

실무에서는 CSS class를 붙이기 전에 큰 구조를 먼저 생각합니다. header, nav, main, article, section, footer 중 무엇이 필요한지 판단하고, 그다음 class를 붙여 스타일링합니다. 이렇게 하면 화면이 바뀌어도 문서의 의미 구조가 흔들리지 않습니다. CSS layout이 나중에 바뀌더라도 main content와 navigation의 경계는 유지됩니다.

```html
<main class="lesson-shell">
  <article class="lesson-content">
    <h1>브라우저 렌더링과 네트워크 흐름</h1>
    <section class="lesson-section">
      <h2>작동 원리</h2>
      <p>브라우저는 network data를 DOM과 CSSOM으로 바꿉니다.</p>
    </section>
  </article>
</main>
```

이 코드에서 class 이름은 styling hook이고, element 이름은 의미 구조입니다. AI에게 "lesson-shell layout을 grid로 바꿔줘"라고 요청할 때도, main/article/section 구조는 유지하라고 말할 수 있습니다. ==AI 수정 요청은 semantic boundary와 styling hook을 함께 지정할 때 가장 검토하기 쉽습니다.==

### 2. 목차와 메뉴는 `<nav>` 후보로 검토합니다

학습 사이트에는 전체 curriculum으로 이동하는 menu와 강의 내부 목차가 모두 있을 수 있습니다. 둘 다 navigation links를 제공하는 section이라면 `<nav>` 후보입니다. 이때 `aria-label` 같은 속성은 여러 navigation 영역을 구분하는 데 도움이 될 수 있지만, 이 강의의 핵심은 속성 세부가 아니라 navigation section을 HTML 구조에 드러내는 것입니다.

```html
<nav aria-label="강의 목차">
  <a href="#definition">한 줄 정의</a>
  <a href="#how-it-works">작동 원리</a>
  <a href="#in-practice">실전에서</a>
</nav>
```

AI가 목차 링크를 추가하거나 제거할 때 이 구조는 안전장치가 됩니다. "모든 `<a>`를 찾아 고쳐줘"보다 "`aria-label=\"강의 목차\"`인 `<nav>` 안의 링크만 고쳐줘"가 훨씬 좁은 작업 범위입니다.

### 3. 카드 목록은 article인지 먼저 묻습니다

강의 카드, 블로그 preview, product card처럼 독립적으로 재사용 가능한 항목은 `<article>` 후보입니다. 하지만 모든 card가 article은 아닙니다. 단순히 layout을 위한 wrapper라면 div와 class가 더 적절할 수 있습니다. 판단 질문은 간단합니다. "이 조각을 목록 밖으로 떼어도 하나의 콘텐츠로 읽히는가?"

> [!EXAMPLE]
> 커리큘럼 목록의 각 강의 카드는 제목, 요약, 레벨, 링크를 가지므로 독립 단위로 읽힐 수 있습니다. 이런 경우 `<article>`은 단순 장식이 아니라 재사용 가능한 콘텐츠 경계를 표시합니다.

### 4. AI 코드 리뷰에서는 semantic checklist를 만듭니다

AI가 HTML을 생성했을 때 검토 순서는 복잡할 필요가 없습니다. 먼저 page의 dominant content가 어디인지 봅니다. 다음으로 navigation links 묶음이 `<nav>`로 표현됐는지 확인합니다. 반복되는 독립 content unit이 article 후보인지 봅니다. 마지막으로 section이 있다면 heading이 있는지 확인합니다.

이 checklist는 HTML을 완벽하게 외워야 쓸 수 있는 규칙이 아닙니다. MDN Quote Bank의 짧은 원문들만으로도 충분히 만들 수 있습니다. main은 dominant content, nav는 navigation links, article은 reusable composition, section은 heading을 가진 standalone section이라는 기준을 적용하면 됩니다.

## 한계와 트레이드오프

semantic HTML은 화면을 자동으로 접근성 좋은 UI로 바꿔 주지 않습니다. 요소 선택은 출발점일 뿐입니다. 실제 접근성은 label, focus, keyboard interaction, contrast 같은 더 많은 요소와 연결됩니다. 이 KB는 HTML semantic elements에 집중하므로 접근성 전체를 다루지 않습니다. 다만 semantic structure가 accessibility와 SEO에 중요하다는 MDN 설명을 기준으로, 첫 단추를 잘 끼우는 단계라고 보면 됩니다.

또한 semantic element만으로 layout이 해결되지는 않습니다. `<main>`, `<nav>`, `<article>`을 쓴다고 grid나 responsive design이 자동으로 생기지 않습니다. CSS cascade/layout 강의에서 보겠지만, 모양과 배치는 CSS가 담당합니다. HTML은 의미 구조를 제공하고 CSS는 appearance와 layout을 만듭니다. 이 역할 분리를 놓치면 "semantic tag를 썼는데 왜 예쁘지 않지?"라는 잘못된 질문을 하게 됩니다.

`<section>`과 `<article>` 선택도 항상 기계적으로 결정되지 않습니다. 같은 UI라도 서비스 맥락에 따라 article이 더 적절할 수도 있고 section이 더 적절할 수도 있습니다. 그러므로 태그 이름을 암기하기보다 MDN이 제시한 기준을 적용해야 합니다. independently reusable composition이면 article, 더 구체적인 semantic element가 없는 standalone section이면 section입니다.

마지막으로, class 이름이 나쁘다는 뜻도 아닙니다. class는 CSS와 JS에서 여전히 필요합니다. 다만 class 이름만으로 의미 구조를 대신하게 하면 도구와 사람이 추측해야 하는 영역이 커집니다. semantic element와 class를 함께 쓰는 것이 실무에 더 가깝습니다.

> [!TIP]
> HTML을 검토할 때는 "이 태그가 더 멋져 보이는가"보다 "이 영역의 역할을 다음 사람이 tag 이름만 보고 알 수 있는가"를 먼저 묻는 편이 좋습니다.

## 더 읽기

먼저 MDN의 [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)를 읽어 element가 어떤 기능 그룹으로 나뉘는지 확인합니다. 이 문서는 단순 목록처럼 보이지만, content sectioning과 text content 같은 분류를 읽으면 HTML이 문서 역할을 어떻게 표현하는지 감이 잡힙니다.

다음으로 [`<main>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/main), [`<nav>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav), [`<article>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article), [`<section>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/section)를 차례로 읽습니다. 이 네 문서를 함께 읽으면 "중심 본문", "이동 링크 영역", "독립 콘텐츠", "standalone section"의 차이가 선명해집니다.

후속 학습은 `css-cascade-layout-responsive`가 자연스럽습니다. semantic HTML로 구조를 잡은 뒤, CSS cascade와 layout이 그 구조에 어떤 style value와 배치를 적용하는지 배워야 합니다. 그다음 `javascript-dom-events`로 넘어가면 브라우저가 HTML을 DOM tree로 만들고 JavaScript가 그 tree를 어떻게 읽고 바꾸는지 이해할 수 있습니다.
