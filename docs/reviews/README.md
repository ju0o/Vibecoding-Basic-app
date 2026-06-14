# 모바일 강의 검토 자료

컴퓨터 밖에서도 슬라이드 상태를 확인할 수 있도록, 실제 화면 캡처와
고도화 방향을 한 개의 PDF로 묶어 관리합니다.

## PDF 구성

- 표지와 확인 방법
- 슬라이드별 실제 화면 캡처
- 현재 전달되는 내용
- 다음 고도화 예시
- 권장 와이어프레임

## 3강 PDF 다시 만들기

```powershell
npm run export:review3
```

생성 파일:

```text
release/3강-모바일-검토자료.pdf
```

아이폰에서는 OneDrive의 아래 폴더에서 확인합니다.

```text
Desktop/바이브코딩 강의 검토자료/
```

앞으로 다른 강의도 `docs/reviews/`에 같은 형식의 HTML을 만들고
`scripts/export-mobile-review-pdf.js`로 PDF를 생성합니다.
