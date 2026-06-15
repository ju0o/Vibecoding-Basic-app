# VIBE STUDIO V3 BETA 릴리즈 보고서

## 버전
- 앱: 3.0.0-beta.2
- 현재 운영본: 기초반 2기 6주, 활성 파일 해시 보호와 회차별 V3 작업본
- 학생 공개 과정: 5개
- 강사 전용 미리보기: 다음 기수 기초반 4주
- V3 개편 회차: 현재 2기 작업본 6개 + 신규 과정 28개

## 구현
- 카드 카탈로그를 3단 Curriculum Studio로 교체
- 강사 모드와 과정별 자료 탭
- Ctrl+K 과정·회차·자료 검색
- 8개 장면군과 34개 고유 scene id를 가진 수동 시뮬레이션 레지스트리
- 회차별 starter·broken·complete 실행 실습 패키지
- 학생 6종·강사 7종 자료 엔진과 13장별 상세 대본
- 회차별 운영본 승격·복구, 실습 파일 추출, ZIP/JSON 백업
- 공식 출처 39개 갱신
- A4 PDF 65종 자동 QA

## 검증
- V2 동결 파일 13개 해시 일치
- 1280×720, 1366×768, 1920×1080 Electron 스모크 통과
- 현재 작업본 포함 34개 회차 전수 스모크 통과
- 공식 출처 39개 응답 확인
- A4 자료 65종 페이지 분할 검사 통과

## 산출물
- `release/VIBE STUDIO 3.0.0-beta.2.exe`
- `release/README-현장실행가이드.md`
- `release/CHECKLIST-강의전점검.md`
- `release/assets/preview.png`

## 아이콘 교체
1. `build/icon.ico`를 교체합니다.
2. `npm run release:v3-beta`를 실행합니다.
3. 아이콘이 없으면 앱과 빌더의 기본 아이콘을 사용합니다.
