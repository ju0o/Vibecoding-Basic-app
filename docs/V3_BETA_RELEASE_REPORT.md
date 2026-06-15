# VIBE STUDIO V3 BETA 릴리즈 보고서

## 버전
- 앱: 3.0.0-beta.1
- 현재 운영본: 기초반 2기 6주, 파일 해시 동결
- 학생 공개 과정: 5개
- 강사 전용 미리보기: 다음 기수 기초반 4주
- 신규 V3 회차: 28개

## 구현
- 카드 카탈로그를 3단 Curriculum Studio로 교체
- 강사 모드와 과정별 자료 탭
- Ctrl+K 과정·회차·자료 검색
- 13장 공통 강의 엔진과 발표자 수동 진행
- 학생 5종·강사 5종 자료 엔진
- 공식 출처 39개 갱신
- A4 PDF 45종 자동 QA

## 검증
- V2 동결 파일 13개 해시 일치
- 1280×720, 1920×1080 Electron 스모크 통과
- 신규 회차 28개 전수 스모크 통과
- 공식 출처 39개 응답 확인
- A4 자료 45종 페이지 분할 검사 통과

## 산출물
- `release/VIBE STUDIO 3.0.0-beta.1.exe`
- `release/README-현장실행가이드.md`
- `release/CHECKLIST-강의전점검.md`
- `release/assets/preview.png`

## 아이콘 교체
1. `build/icon.ico`를 교체합니다.
2. `npm run release:v3-beta`를 실행합니다.
3. 아이콘이 없으면 앱과 빌더의 기본 아이콘을 사용합니다.
