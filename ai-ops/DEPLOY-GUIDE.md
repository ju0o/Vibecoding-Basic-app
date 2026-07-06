# 배포 가이드 — Firebase Hosting (비공개 학습 모드)

현재 배포: **https://ju0o-ec967.web.app** (2026-07-06, V2 47강 + 다이어그램 20개)
보호 상태: 화면 비밀번호 게이트 + `robots.txt` 전체 차단 + 전 페이지 `noindex` (CITATION-POLICY 모드 A 충족)

## 1. 비밀번호 — 설정·변경 방법

비밀번호는 **평문이 아니라 SHA-256 해시**로만 빌드에 들어갑니다. 저장 위치는 프로젝트 루트의 `.env.local` (git에 커밋되지 않음):

```
NEXT_PUBLIC_SITE_PASSWORD_HASH=<해시값>
```

**비밀번호를 바꾸려면** (예: 새 비밀번호가 `내새비번123`):

```powershell
# 1) 새 해시 생성
node -e "crypto.subtle.digest('SHA-256', new TextEncoder().encode('내새비번123')).then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))"
# 2) 출력된 해시를 .env.local의 NEXT_PUBLIC_SITE_PASSWORD_HASH= 뒤에 붙여넣기
# 3) 재빌드 + 재배포 (아래 §3)
```

비밀번호를 바꾸면 이전 비밀번호로 열어둔 브라우저도 자동으로 다시 잠깁니다 (해제 기록이 해시값 기준이라서).

## 2. 접속 방법

배포 URL 접속 → 화면 중앙의 **비밀번호 입력 카드**에 입력 → 입장. 브라우저별로 한 번만 입력하면 기억됩니다(localStorage). 다른 기기·브라우저에서는 다시 입력합니다.

## 3. 배포 절차 (강의가 새로 릴리스될 때마다)

```powershell
npm run verify                                        # 빌드 포함 전체 검증
npx firebase-tools deploy --only hosting --project ju0o-ec967
```

`npm run build`가 정적 사이트를 `out/`에 생성하고(next.config의 `output: "export"`), firebase.json이 그 폴더를 올립니다. 이 두 줄이 배포의 전부이며 **Cline에게 맡길 수 있는 작업**입니다 (P-09).

## 4. 보호 수준에 대한 정직한 설명

정적 호스팅에는 서버가 없어서 게이트는 **브라우저 화면 차단** 방식입니다. 비밀번호 평문은 어디에도 없지만, 기술적으로 아주 작정한 사람이 HTML 소스를 직접 읽는 것까지 막지는 못합니다. 개인 학습용 + 검색 차단(noindex/robots) 조합으로는 충분하며, 일반 공개(모드 B) 전환 시에는 citation-review 정리와 함께 게이트를 제거하면 됩니다.

## 5. 문제 해결

| 증상 | 원인·해결 |
|---|---|
| "비밀번호가 설정되지 않았습니다" 화면 | `.env.local` 없이 빌드됨 → §1대로 설정 후 재빌드·재배포 |
| 비밀번호가 맞는데 안 열림 | 해시 생성 시 비밀번호 앞뒤 공백/따옴표 확인, 재생성 |
| 새 강의가 배포에 안 보임 | 릴리스 커밋 후 §3 재배포를 안 한 것 — 배포는 수동 트리거 |
| 검색에 노출될까 걱정 | robots.txt 전체 차단 + noindex 메타 이중 적용됨 (out/index.html에서 확인 가능) |
