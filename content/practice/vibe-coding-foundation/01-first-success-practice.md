# 실습 가이드 — Day 1 첫 성공

```yaml
lesson_id: d1-first-success
type: practice
paths: [A_zero_setup, B_local_setup]
site_wired: false
```

---

## 준비물

| 항목 | Path A | Path B |
|---|---|---|
| 브라우저 | 필수 | 필수 |
| AI 채팅 (이미 쓰는 것) | 필수 | 권장 |
| 메모장/텍스트 편집기 | 필수 | — |
| VS Code(또는 다른 편집기) | — | 권장 |
| Node.js LTS | — | 필수에 가까움 |
| 인터넷 | 필수 | 필수 (`npm install`) |
| 설치 권한 | 불필요 | 필요할 수 있음 |

**시간:** Path A ~10분 목표 · Path B 환경에 따라 다름 (보장 없음).

---

## Path A — Zero-Setup Quick Win

### 단계

1. AI에 요청 (학생 본문 프롬프트 사용).  
2. 코드 블록 **전체** 복사.  
3. `hello-vibe.html`로 저장 (UTF-8).  
4. 브라우저로 연다.  
5. **기대 결과:** 제목 + “안녕하세요” 유사 문구 표시.  
6. 수정 요청 1회 → 저장 → 새로고침.  
7. **기대 결과:** 문구/제목 변경 확인.

### 완료 증거 (Path A)

- [ ] 브라우저 화면 스크린샷 또는  
- [ ] 옆 사람에게 화면을 보여 줌 또는  
- [ ] 파일 경로 + “수정한 문장”을 메모  

### 오류 시

| 문제 | 확인 |
|---|---|
| 코드가 화면에 글자로 보임 | 확장자 `.html`인가? |
| 빈 페이지 | `<html>` 전체가 들어갔는가? |
| 한글 깨짐 | UTF-8 저장 |

### 재시도

- 새 파일 이름 `hello-vibe-2.html`  
- AI에게 “한 파일, 외부 CSS 없이” 재요청  

### 초기화

- 해당 html 삭제 후 처음부터  
- 브라우저 캐시 문제 드묾 — 강제 새로고침  

---

## Path B — Local Setup

### B1. VS Code 확인/설치

1. 앱 검색 → 실행 또는 [공식 Download](https://code.visualstudio.com/Download)  
2. **기대:** 편집기 창이 열린다.

### B2. Node.js 확인/설치

1. [nodejs.org](https://nodejs.org/) 에서 **LTS** 설치  
2. 설치 후 **터미널을 새로** 연다  

### B3. 버전 확인

```bash
node -v
npm -v
```

**기대:** 각 줄에 버전 숫자/문자열.

### B4. 프로젝트 열기

1. 제공 zip 압축 해제 **또는** 강사 지정 폴더  
2. VS Code → Open Folder  
3. 탐색기에 `package.json`이 보이는지 확인  

### B5. 의존성 · 서버

프로젝트 루트 터미널:

```bash
npm install
```

성공 후, `package.json` → `scripts` 확인.

```bash
npm run dev
```

`dev`가 없으면 강사/README의 스크립트 이름을 사용.

**기대:** `localhost` URL · 브라우저에서 페이지.

### B6. 종료

- 터미널 `Ctrl+C` (일반적으로 서버 중지)

### 완료 증거 (Path B)

- [ ] `node -v` / `npm -v` 출력 메모  
- [ ] 브라우저 localhost 화면 (가능 시)  
- [ ] 사용한 실행 명령 한 줄 기록  

### 오류 시 확인 순서

1. 지금 폴더가 프로젝트 루트인가?  
2. `package.json`이 있는가?  
3. 인터넷이 되는가?  
4. 오류 전문을 복사했는가?  
5. AI/강사 템플릿으로 질문  

### 권한·환경으로 불가능할 때

- Path B **보류**로 기록  
- Path A 증거는 유지  
- IT/다른 PC에서 재시도 일정  

### 재시도 / 초기화

```bash
# 의존성 다시 (주의: node_modules 삭제 후)
# Windows PowerShell 예:
# Remove-Item -Recurse -Force node_modules
npm install
```

포트 충돌: 기존 서버 종료 후 재실행.

---

## 통합 체크 (둘 다)

- [ ] 수정 요청을 말로 한 번 이상 했다  
- [ ] 오류가 나면 복사해 물어보는 연습을 했다 (시뮬레이션 OK)  

---

## 안전

- API 키·비밀번호를 채팅/스크린샷에 넣지 않는다  
- 모르는 `.exe` 를 임의 사이트에서 받지 않는다 — **공식 사이트**만  
