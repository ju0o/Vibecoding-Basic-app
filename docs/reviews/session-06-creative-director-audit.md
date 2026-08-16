# 6강 슬라이드 Creative Director Audit

## Slide 16 - React / Next.js

### STEP 1. 현재 화면 문제점 20개
1. React 예시가 실제 SaaS 운영 도구처럼 보이기보다 데모 대시보드처럼 보인다.
2. React가 왜 필요한지 보여주는 핵심인 상태 변화, 컴포넌트 조립, 부분 렌더링이 화면 곳곳에 충분히 연결되지 않는다.
3. 병원 예약 시스템이라는 맥락은 있으나 실제 운영자가 쓰는 상단 바, 워크스페이스, 알림, 활동 로그가 부족하다.
4. React 화면에서 필터와 검색은 있지만 command palette나 keyboard workflow가 없어 현대 SaaS 감도가 약하다.
5. 차트가 단순 막대라 live data나 realtime dashboard 느낌이 약하다.
6. 환자 또는 예약 상세 패널이 없어 "클릭하면 오른쪽 패널만 바뀐다"는 React의 강점을 설명하기 어렵다.
7. activity feed와 audit log가 없어 실제 운영 시스템의 시간 흐름이 부족하다.
8. backend 연결 패널이 너무 설명 카드처럼 보여 실제 서비스 연결면처럼 느껴지지 않는다.
9. Next.js 예시가 상품 페이지 형태는 있지만 공개 서비스의 SEO, 공유 미리보기, URL 구조가 충분히 시각화되지 않는다.
10. Next.js의 server render/data fetch/API route가 실제 요청 흐름처럼 보이지 않는다.
11. React와 Next.js의 차이가 "한쪽은 화면, 한쪽은 서버 구조"라는 핵심으로 즉시 읽히지 않는다.
12. 튜토리얼 패널이 실제 화면의 특정 부위와 더 강하게 연결되어야 한다.
13. 모바일/데스크탑 운영 감각이 부족해 실제 제품처럼 보이는 밀도가 약하다.
14. 브라우저 내부가 넓은데도 정보 구조가 단순해 PPT용 목업처럼 보인다.
15. React 예시의 상태 변경 버튼은 하나뿐이라 학생이 상호작용 차이를 체감하기 어렵다.
16. Next.js 예시의 장바구니 액션은 React와 유사해 보여 Next.js 고유 장점 설명력이 약하다.
17. SEO/metadata가 카드로만 존재하고 실제 검색/공유 결과처럼 보이지 않는다.
18. API Route가 카드 설명에 머물러 실제 request/response 콘솔 느낌이 부족하다.
19. 전체 모달은 고급스럽지만 서비스 화면 내부 디테일이 "진짜 서비스" 수준까지는 도달하지 못했다.
20. 1280x720에서는 튜토리얼 패널과 서비스 화면이 압축되어 주요 UI가 작아질 위험이 있다.

### STEP 2. 왜 문제인가
수강생이 궁금해하는 것은 "React와 Next.js가 정확히 무엇이고, 어느 상황에서 선택해야 하는가"이다. 따라서 비유나 박스 설명보다 실제 서비스 화면 안에서 React는 화면 상태와 컴포넌트 운영에 강하고, Next.js는 공개 URL, 서버 준비, SEO, API 지점을 프로젝트 구조로 제공한다는 차이가 눈으로 보여야 한다.

### STEP 3. 새 레이아웃 설계
- React: 병원 예약 운영 SaaS `MediFlow Ops`로 재구성한다. 상단 워크스페이스 바, command palette, 실시간 KPI, 환자 테이블, 예약 상세 drawer, activity feed, 연결 서비스 레일을 포함한다.
- Next.js: 공개 쇼핑몰 `VIBE MARKET`으로 재구성한다. 실제 상품 페이지, URL breadcrumb, SEO/social preview, server render pipeline, API route request/response 콘솔을 함께 보여준다.
- 튜토리얼 버튼은 누를 때마다 실제 서비스 영역이 강조되고, callout 문장이 바뀌어야 한다.
- 1280x720에서도 제목, 핵심 UI, 튜토리얼 패널이 잘리지 않도록 서비스 UI는 밀도를 높이되 의미 없는 장식을 줄인다.

### STEP 7. 1차 Creative Director 목표 점수
- 현재: 84점
- 목표: 91점 이상

### STEP 7. 구현 후 재평가
- React 화면은 병원 예약 운영 SaaS처럼 정보 구조가 살아났고, command palette, realtime sync, KPI, 환자 표, 상세 drawer, 운영 로그, backend rail이 한 화면에 결합되었다.
- Next.js 화면은 공개 상품 페이지와 server render pipeline, SEO preview, API Route console, route inspector가 함께 보이므로 "React + 프로젝트 구조 + 서버 지점"이라는 차이가 전보다 명확하다.
- 1400px 이하에서는 하단 콜아웃을 숨겨 서비스 예시를 가리지 않도록 조정했다.
- 검증 캡처: `slide16-react-1920-final.png`, `slide16-react-1366-final.png`, `slide16-react-1280-v5.png`, `slide16-next-1920-v3.png`, `slide16-next-1366-final.png`, `slide16-next-1280-v5.png`
- Creative Director 재평가: 92점

## Slide 21 - 비밀값과 배포 환경

### STEP 1. 현재 화면 문제점 20개
1. 전체가 VSCode보다 설명용 패널처럼 보인다.
2. Activity Bar가 없어 실제 코드 에디터의 시작점이 약하다.
3. 파일탭이 없어 "어떤 파일을 열었는지"가 즉시 보이지 않는다.
4. breadcrumb가 없어 `.env.local`, `.gitignore`, `src/firebase.ts`의 위치 감각이 약하다.
5. 파일 선택 상태는 있으나 editor tab과 inspector가 함께 바뀌지 않아 경험이 납작하다.
6. `.env.local`이 루트에 있다는 구조는 보이지만 VSCode 프로젝트 구조처럼 충분히 설득력 있지 않다.
7. GitHub 차단 장면이 설명은 좋지만 실제 commit view처럼 보이지 않는다.
8. Vercel 설정 장면은 좋은 편이나 개발자 도구의 입력 폼 밀도가 부족하다.
9. Firebase 코드 연결 장면은 code editor의 depth, minimap, syntax layer가 부족하다.
10. 오른쪽에 현재 단계의 위험도/강사용 설명을 모아주는 inspector가 없다.
11. 하단 status bar가 없어 실제 IDE의 현재 브랜치, env, local context가 없다.
12. 각 단계 전환 시 editor가 바뀐다는 감각이 약하다.
13. hover/selection/active marker가 파일트리 일부에만 한정되어 있다.
14. `.env.example`의 역할이 눈에 잘 들어오지 않는다.
15. GitHub로 올라가지 않는 애니메이션은 있으나 "blocked by .gitignore"의 원인이 더 체계적으로 보일 필요가 있다.
16. 서버 환경변수와 public 환경변수의 차이가 inspector에서 정리되지 않는다.
17. 코드 화면이 큰데도 실제 IDE 탭, 라인 넘버, minimap이 없어 학습 신뢰감이 낮다.
18. 1280x720에서 왼쪽 설명과 오른쪽 실습 화면의 균형이 흔들릴 수 있다.
19. 단계 버튼이 자료형 버튼처럼 보이고 현재 단계와 파일 선택의 연결이 약하다.
20. "비밀값은 어디에 두는가"라는 최종 행동이 한눈에 정리되지 않는다.

### STEP 2. 왜 문제인가
이 슬라이드는 수강생이 실제로 `.env.local`, `.gitignore`, Vercel 환경변수, `firebase.ts`를 만질 때 기준점이 되어야 한다. 따라서 단순 흐름도보다 "실제 VSCode에서 파일을 열고, GitHub/Vercel/Firebase가 어떻게 연결되는지"를 보는 편이 훨씬 오래 기억된다.

### STEP 3. 새 레이아웃 설계
- 오른쪽 장면을 `VSCode Workbench`로 재설계한다.
- Activity Bar, Explorer, editor tabs, breadcrumb, right inspector, bottom status bar를 추가한다.
- 단계 버튼을 누르면 열려 있는 파일, active tab, inspector copy, scene이 함께 바뀌도록 한다.
- 각 장면은 유지하되, IDE chrome 안에서 실제 파일/설정/배포 화면을 보는 느낌으로 배치한다.
- 작은 해상도에서는 inspector와 editor 영역을 줄이고, 파일트리와 code window가 잘리지 않게 한다.

### STEP 7. 1차 Creative Director 목표 점수
- 현재: 86점
- 목표: 91점 이상

### STEP 7. 구현 후 재평가
- 오른쪽 장면을 VSCode형 workbench로 재구성했다. Activity Bar, Explorer, tabs, breadcrumb, inspector, status bar가 추가되어 파일을 직접 열어보는 감각이 강해졌다.
- 단계 버튼과 파일 선택, active tab, breadcrumb, inspector copy가 함께 바뀌도록 연결했다.
- 1280에서는 Firebase 전체 코드 대신 핵심 연결 코드를 크게 보여 주어 가독성을 확보했다.
- Vercel 단계는 실제 dashboard 스타일을 유지하되 작은 화면에서 중복 설명 카드를 숨겨 입력 폼이 더 잘 보이게 했다.
- 검증 캡처: `slide21-local-1920-v2.png`, `slide21-github-1366-v2.png`, `slide21-vercel-1366-final.png`, `slide21-firebase-1280-final.png`
- Creative Director 재평가: 91점

## Slide 28 - Graduation Ceremony

### STEP 1. 현재 화면 문제점 20개
1. 수료증은 있지만 "행사 마지막"의 무대감이 부족하다.
2. 커튼 오픈이나 스포트라이트 같은 의식 시작 연출이 없다.
3. 학생이 사진 찍고 싶어지는 기념 장면의 밀도가 부족하다.
4. 수료증이 단독 종이처럼 보이고 무대, 조명, 관객, 카메라 맥락이 없다.
5. 축하 장면과 수료증 장면 사이의 감정 전환이 약하다.
6. 금박, 워터마크, 인증마크는 있으나 ceremony layer와 결합되지 않는다.
7. Confetti와 gold dust가 장면을 채우기보다 배경 장식 수준이다.
8. Camera flash, achievement unlock 같은 피날레 피드백이 부족하다.
9. 수료증 공개 전 anticipation이 부족하다.
10. 수료증 공개 후 사진 촬영을 유도하는 안정된 final pose가 부족하다.
11. 현재 수료증 높이와 footer는 해상도에 따라 너무 압축된다.
12. 발급번호, QR, 직인, 서명은 있지만 시선 순서가 약하다.
13. 어두운 배경과 수료증의 대비는 좋지만 공간 깊이가 약하다.
14. 강의 마지막 슬라이드로서 "우리가 여기까지 왔다"는 타임라인이 부족하다.
15. 축하 텍스트와 수료증이 서로 따로 노는 느낌이 있다.
16. 슬라이드 상태 변화가 클릭 한 번의 표시 전환에 가깝다.
17. 현장 빔프로젝터에서 사진 찍는 사람들을 고려한 중앙 여백과 안정감이 부족하다.
18. 인증 마크가 고급 홀로그램처럼 보이기엔 더 강한 빛 반사가 필요하다.
19. 배경 파티클은 있지만 금빛 ceremony palette가 충분히 통일되지 않았다.
20. "SNS에 올리고 싶은 장면"이라는 최종 목표에는 80점대 수준이다.

### STEP 2. 왜 문제인가
마지막 슬라이드는 정보 전달보다 감정의 착지가 중요하다. 학생들이 "수료했다"는 느낌을 받고 사진을 찍을 수 있어야 하므로, 수료증 자체뿐 아니라 무대, 조명, 카메라 플래시, 축하 연출, 안정된 final frame이 필요하다.

### STEP 3. 새 레이아웃 설계
- 첫 상태: 닫힌 커튼, 중앙 스포트라이트, achievement unlock copy, 과정 타임라인, "다음" 안내.
- 수료증 상태: 커튼이 열리고 certificate가 중앙 무대 위에 올라오며, 금빛 더스트, 카메라 플래시, 스탬프, 서명, QR, certificate meta가 단계적으로 나타난다.
- 1280에서도 수료증이 작아지지 않도록 certificate는 넓게, 주변 장식은 뒤로 물린다.
- 불필요하게 어색한 모션보다 final pose의 완성도를 우선한다.

### STEP 7. 1차 Creative Director 목표 점수
- 현재: 80점
- 목표: 91점 이상

### STEP 7. 구현 후 재평가
- 첫 상태는 닫힌 커튼과 중앙 ceremony card, 과정 타임라인, 수료증 열기 안내로 재구성했다.
- 수료증 상태는 커튼 오픈, 스포트라이트, 무대 바닥, 금빛 파티클, 카메라 플래시, achievement unlock, certificate spring reveal을 포함한다.
- 수료증 자체는 금박 테두리, 워터마크, 엠블럼, 발급번호, QR, 직인, 서명, 홀로그램 마크를 유지하면서 final pose에 맞게 크기와 여백을 정리했다.
- 1280에서는 수료증이 잘리지 않도록 장식을 뒤로 물리고, certificate scale을 안정화했다.
- 검증 캡처: `slide28-ceremony-1920-v2.png`, `slide28-certificate-1920-v2.png`, `slide28-ceremony-1280-v2.png`, `slide28-certificate-1366-v2.png`, `slide28-certificate-1280-v2.png`
- Creative Director 재평가: 92점
