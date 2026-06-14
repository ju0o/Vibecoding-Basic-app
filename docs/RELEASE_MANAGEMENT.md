# 릴리즈 버전 관리

## 버전 규칙

이 프로젝트는 `MAJOR.MINOR.PATCH` 형식의 Semantic Versioning을 사용합니다.

- `PATCH`: 오류 수정, 문구와 디자인 보완, 기존 기능 개선
- `MINOR`: 새 강의, 새 자료실 기능, 호환되는 새 기능 추가
- `MAJOR`: 저장 구조나 강의 엔진처럼 기존 사용 방식이 크게 달라지는 변경

예시:

- `1.0.1`: 4강 슬라이드 오류 수정
- `1.1.0`: 5강 인터랙션 또는 새 강사용 기능 추가
- `2.0.0`: 강의 엔진과 프로젝트 구조의 큰 개편

## 릴리즈 전 확인

1. `package.json` 버전을 결정합니다.
2. `CHANGELOG.md`에 해당 버전의 변경 내용을 작성합니다.
3. 아래 검사를 실행합니다.

```bash
npm ci
npm run check
npm run smoke:app
```

4. 로컬 Windows EXE가 필요하면 실행합니다.

```bash
npm run release:build
```

## 권장 릴리즈 방법

패치 버전:

```bash
npm version patch
git push origin main --follow-tags
```

마이너 버전:

```bash
npm version minor
git push origin main --follow-tags
```

메이저 버전:

```bash
npm version major
git push origin main --follow-tags
```

`npm version`은 `package.json`, `package-lock.json`을 함께 수정하고 `v1.0.1` 형식의 Git 태그를 생성합니다.

## GitHub Actions 동작

`v*` 태그가 GitHub에 푸시되면 `.github/workflows/release.yml`이 다음 작업을 수행합니다.

1. 태그와 `package.json` 버전 일치 확인
2. 슬라이드 번들 생성과 정적 검사
3. Windows portable EXE 빌드
4. EXE의 SHA-256 체크섬 생성
5. GitHub Release 생성 또는 기존 Release 자산 갱신

생성되는 Release 자산:

- `VibeCoding-Basic-Class-X.Y.Z.exe`
- `SHA256SUMS.txt`

로컬 `release/` 폴더에서는 한글 EXE 이름을 사용하고, GitHub 다운로드 자산은 URL과 브라우저 호환성을 위해 ASCII 파일명으로 정규화합니다.

## 긴급 수정

이미 배포한 버전의 EXE를 같은 태그에 덮어쓰지 않습니다. 수정이 필요하면 반드시 PATCH 버전을 올립니다.

잘못된 예:

- `v1.0.0` 파일만 교체

올바른 예:

- `v1.0.1`로 수정 릴리즈 생성

## 릴리즈 체크리스트

- [ ] `package.json`과 `package-lock.json` 버전 일치
- [ ] `CHANGELOG.md` 작성
- [ ] `npm run check` 통과
- [ ] `npm run smoke:app` 통과
- [ ] 앱 이름과 EXE 파일명 확인
- [ ] 오프라인 실행 확인
- [ ] 1~6강 및 별첨자료 열기 확인
- [ ] 태그와 앱 버전 일치
- [ ] GitHub Release에 EXE와 체크섬 첨부 확인
