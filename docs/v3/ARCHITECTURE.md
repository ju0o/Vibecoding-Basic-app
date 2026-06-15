# V3 구조

## 콘텐츠 경계

- `src/content/sessions/`: 현재 2기 6주 운영본. V3 생성기가 수정하지 않는다.
- `src/content/archive/v2-course-manifest.json`: V2 매니페스트 보존본.
- `docs/v3/basic-v2-freeze.json`: 현재 운영 강의 파일의 SHA-256 기준.
- `scripts/build-v3-content.js`: V3 과정과 자료 연결 생성기.
- `src/content/v3/course-data.js`: 28개 신규 회차의 상세 데이터.
- `src/content/v3/deck.*`: 13장 공통 인터랙티브 강의 엔진.
- `src/content/v3/material.*`: 학생·강사용 A4 자료 엔진.
- `src/content/sources/`: 공식 출처와 갱신 상태.

## 앱 인터페이스

- `src/renderer/index.html`: 3단 스튜디오와 플레이어 구조.
- `src/renderer/studio.css`: 1280×720, 1920×1080 대응 화면 스타일.
- `src/renderer/studio.js`: 과정·회차·자료 상태, 강사 모드, 검색, 일정, 플레이어와 판서.

## 새 강의 추가

1. `scripts/build-v3-content.js`의 해당 과정 `sessions`에 `detail()` 데이터를 추가한다.
2. 제목, 목표, 개념 4개, 순서, 수동 시연 단계, 정상·실패 비교, 판단, 오류, 실습과 결과물을 작성한다.
3. 필요한 공식 출처 키를 `sources`에 연결한다.
4. `npm run build:v3`를 실행한다.
5. 감사와 스모크 테스트를 실행한다.

## 새 인터랙션 추가

공통 회차는 장식 모션보다 발표자가 제어하는 교육 흐름을 우선한다.

- 시작 전에는 움직이지 않는다.
- `시작 / 다음 / 일시정지 / 초기화`를 제공한다.
- 각 단계는 화면 변화와 확인 기준을 함께 보여준다.
- 정상 흐름과 실패 흐름을 비교한다.
- `transform`과 `opacity` 중심으로 움직여 프로젝터 노트북의 GPU 부담을 줄인다.
