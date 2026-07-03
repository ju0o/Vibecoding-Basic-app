## 오늘 배울 것

TypeScript, React, Next.js가 각각 어떤 문제를 해결하기 위해 등장했는지 배웁니다.

세 기술을 따로 외우기보다 "복잡한 화면을 안전하고 반복 가능하게 만드는 단계"로 연결해 이해합니다.

## 한 줄 정의

TypeScript는 데이터 실수를 줄이고, React는 화면을 컴포넌트로 나누며, Next.js는 React 앱을 라우팅과 서버 기능까지 갖춘 웹 서비스로 확장합니다.

## 쉬운 비유

큰 레고 도시를 만든다고 생각해봅시다. TypeScript는 부품 규격표, React는 재사용 가능한 레고 블록, Next.js는 도시의 길과 주소 체계입니다.

규격이 없으면 부품이 안 맞고, 블록이 없으면 매번 처음부터 만들며, 주소가 없으면 사용자가 원하는 장소를 찾지 못합니다.

## 왜 생겼는가

JavaScript 앱이 커지면서 데이터 모양을 착각하는 문제가 늘어났습니다. 그래서 TypeScript가 타입으로 실수를 미리 잡기 위해 널리 쓰이게 되었습니다.

화면도 점점 복잡해졌습니다. 같은 버튼, 카드, 목록을 여러 곳에서 반복하면서 React의 컴포넌트 모델이 중요해졌습니다.

React만으로는 라우팅, 서버 렌더링, 이미지 최적화, 배포 구조를 직접 조립해야 했기 때문에 Next.js 같은 프레임워크가 등장했습니다.

## 어떤 문제를 해결하는가

- TypeScript는 실행 전에 데이터 이름과 모양 실수를 줄입니다.
- React는 화면을 작은 단위로 나누고 재사용하게 합니다.
- Next.js는 페이지 라우팅, 서버 컴포넌트, 빌드, 배포 흐름을 표준화합니다.
- 세 가지를 함께 쓰면 AI가 코드를 수정할 때도 구조를 더 쉽게 따라갈 수 있습니다.

## 핵심 개념

TypeScript의 핵심은 약속입니다. 함수가 어떤 입력을 받고 어떤 출력을 내는지 코드에 적습니다.

React의 핵심은 컴포넌트입니다. 같은 UI 조각을 데이터만 바꿔 여러 곳에서 사용할 수 있습니다.

Next.js의 핵심은 앱 구조입니다. `src/app`의 폴더가 URL이 되고, 서버에서 먼저 만들 수 있는 화면은 서버 컴포넌트로 처리합니다.

## 실제 예시

강의 카드가 30개 있다고 합시다. HTML을 30번 복사하면 수정이 어렵습니다.

React에서는 `LessonCard` 컴포넌트를 만들고 제목, 요약, 진행률만 바꿔 렌더링합니다. TypeScript는 카드에 필요한 데이터가 빠졌는지 알려줍니다. Next.js는 `/lessons/web-screen-anatomy` 같은 주소로 강의 페이지를 연결합니다.

## 코드 예시

```tsx
type LessonCardProps = {
  readonly title: string
  readonly summary: string
  readonly href: string
}

export function LessonCard({ title, summary, href }: LessonCardProps) {
  return (
    <a href={href}>
      <strong>{title}</strong>
      <p>{summary}</p>
    </a>
  )
}
```

## AI 시대에서의 의미

AI는 타입과 컴포넌트 이름을 강한 힌트로 사용합니다. `data`보다 `lessonProgress`가 좋고, `Box`보다 `LessonCard`가 좋습니다.

구조가 명확할수록 AI는 수정 범위를 좁히고, 사람은 결과를 더 쉽게 리뷰할 수 있습니다.

## 자주 헷갈리는 것

TypeScript는 앱을 자동으로 안전하게 만들지 않습니다. 중요한 데이터 모양을 타입으로 표현해야 효과가 있습니다.

React는 프레임워크가 아니라 UI 라이브러리입니다. Next.js가 라우팅과 서버 기능을 더해줍니다.

Next.js를 쓴다고 모든 파일이 서버에서만 실행되는 것은 아닙니다. 클릭 상태나 로컬 저장소는 클라이언트 컴포넌트가 필요합니다.

## 실무에서 쓰는 방식

실무에서는 먼저 데이터 타입을 정하고, 그 타입을 받는 컴포넌트를 만듭니다.

페이지는 데이터를 모아 배치하고, 컴포넌트는 작은 화면 조각을 책임집니다. 상태가 필요한 부분만 클라이언트 컴포넌트로 분리합니다.

## 공부 체크리스트

- TypeScript, React, Next.js의 역할을 각각 한 문장으로 말할 수 있다.
- 컴포넌트가 왜 복붙보다 좋은지 설명할 수 있다.
- 서버 컴포넌트와 클라이언트 컴포넌트를 구분해야 하는 이유를 안다.

## 참고 출처

- TypeScript Handbook: https://www.typescriptlang.org/docs/
- React Docs: https://react.dev/
- Next.js Docs: https://nextjs.org/docs
