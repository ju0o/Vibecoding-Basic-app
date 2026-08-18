---
id: D7-deploy-infra
title: "내 컴퓨터의 앱을 어떻게 다른 사람에게 보여 줄까? — Vercel, Docker, Supabase, Firebase"
domain: "Domain 7 — Deploy·Infra: Vercel/Docker/Supabase/Firebase (운영자 지정 샘플 범위)"
status: sample_draft
audience: "AI 코딩 도구로 작은 앱을 실행해 봤지만 배포 환경·실행 패키지·관리형 백엔드의 차이는 처음 배우는 입문자"
estimated_time: "50–60분"
source_status: approved_kb_and_official_candidate_scoped
verified_at: 2026-07-16
website_status: not_started
---

# 내 컴퓨터의 앱을 어떻게 다른 사람에게 보여 줄까?

## Student Question

> 내 컴퓨터에서는 앱이 잘 열리는데 왜 다른 사람은 볼 수 없을까? Vercel, Docker, Supabase, Firebase는 모두 “배포 도구”일까, 아니면 서로 다른 일을 맡을까?

학생은 D6에서 AI 코딩 도구를 골라 작은 변경을 실행하고 diff와 검사 결과로 완료를 확인했다. 그러나 로컬 성공 뒤에 바로 “배포해 줘”라고 요청하면, 화면을 공개할 장소와 앱을 실행할 방식, 데이터·로그인을 맡을 백엔드, 환경 변수와 시크릿이 한꺼번에 섞인다.

이 노드는 네 제품의 우열을 정하거나 특정 조합을 정답으로 외우는 수업이 아니다. 학생이 **앱의 필요한 능력을 정적 화면·서버 실행·데이터·인증·파일·운영 설정으로 분해하고, 배포 표면·컨테이너·관리형 백엔드 중 필요한 층을 선택한 뒤, Preview와 Production을 분리해 안전하게 공개하는 판단법**을 익히는 수업이다.

## Why Now

로컬에서 파일을 바꾸고 실행하는 능력은 “내 환경에서 된다”는 증거다. 실제 사용자가 쓰게 하려면 다음 질문에 답해야 한다.

- 어떤 빌드 산출물이나 실행 프로세스를 어디에서 제공할까?
- 개발 환경과 운영 환경의 값은 어떻게 분리할까?
- 로그인과 데이터 저장은 브라우저 파일만으로 가능한가?
- Preview에서 무엇을 확인한 뒤 Production으로 보낼까?
- 배포가 실패하거나 데이터 접근이 잘못되면 어디까지 되돌릴 수 있을까?

Vercel과 Firebase Hosting은 앱을 사용자에게 제공하는 배포 표면의 예로, Docker는 앱과 실행 의존성을 이미지로 묶어 컨테이너로 실행하는 방식의 예로 다룬다. Supabase와 Firebase의 데이터·인증 제품은 관리형 백엔드 선택지의 예로 다룬다. 실제 제품 기능·가격·지원 범위는 바뀔 수 있으므로 학생은 제품 이름보다 **필요한 역할, 현재 공식 문서, 자신의 환경에서 확인한 증거**를 먼저 본다.

이 노드의 목표는 실제 계정이나 운영 서비스를 바꾸는 것이 아니다. **작은 앱의 배포 구조를 설계하고, 모의 Preview에서 실패를 발견해 복구한 뒤, Production 전 확인 근거를 설명하는 것**이 목표다.

## Outcomes와 완료 증거

| 수준 | 학생이 할 수 있는 일 | 관찰 가능한 완료 증거 |
|---|---|---|
| Observed | `로컬 코드 → 빌드/이미지 → 실행 환경 → 공개 URL → 데이터·인증` 흐름에서 각 층의 책임을 관찰한다. | 예시 구조에서 배포 표면, 컨테이너, 관리형 백엔드, 환경 변수를 서로 다른 색이나 기호로 표시한다. |
| Assisted | 안내표를 사용해 Vercel·Docker·Supabase·Firebase가 이번 시나리오에서 맡을 수 있는 역할과 맡지 않는 역할을 구분한다. | 요구사항별로 `필요/불필요/미확인`을 표시한 인프라 선택표와 공식 근거 링크가 남아 있다. |
| Independent | 새로운 작은 앱의 실행·데이터·시크릿·Preview·복구 요구를 분석하고 최소 배포 구조를 도움 없이 설계한다. | 구조도, 환경 변수 목록, Preview 검사 결과, 실패 기록, 복구 절차, Production 전 승인 기준이 한 장의 배포 기록에 남아 있다. |
| Explainable | “로컬 성공=배포 완료”가 아니며 Vercel·Docker·Supabase·Firebase가 서로 완전한 대체재가 아닌 이유를 설명한다. | 60초 teach-back 또는 6문장 설명에 역할 구분, 선택 근거, 시크릿 경계, Preview 증거, 롤백 한계, 사람 책임이 모두 들어 있다. |

### 한 줄 완료 조건

학생이 자료를 보지 않고 작은 앱 하나를 **요구 분해 → 실행·데이터 층 선택 → 환경 분리 → 모의 Preview → 실패 확인 → 복구 → Production 전 판정** 흐름으로 설계하고, 선택하지 않은 도구가 다른 요구에서는 적합할 수 있는 이유까지 설명하면 이 노드의 학습 Outcome을 충족한다.

## 개념 지도

```text
로컬에서 실행되는 앱
  ↓ 무엇을 사용자에게 제공할지 결정
Build artifact / Container image
  ├─ 빌드 산출물을 배포 표면에 제공 → Vercel·Firebase Hosting 같은 예
  └─ 실행 환경까지 image로 묶어 container 실행 → Docker 같은 예
  ↓ 앱에 서버 상태가 필요한가?
Managed backend
  ├─ Postgres 기반 데이터·Auth·Storage 등의 예 → Supabase
  └─ Hosting·Auth·NoSQL 데이터베이스 등의 제품군 예 → Firebase
  ↓ 환경별 설정 분리
Local / Preview / Production + Environment Variables / Secrets
  ↓ 사람이 증거 확인
URL·핵심 경로·로그·데이터 권한·비용 경고·복구 경로
  ↓
승격 / 수정 / 롤백 / 중단
```

이 지도는 네 제품을 같은 종류의 상자에 넣지 않는다. 한 프로젝트가 Vercel과 Supabase를 함께 사용할 수도 있고, Docker image를 컨테이너 실행을 지원하는 별도 환경에 배포할 수도 있다. Firebase도 Hosting만 사용할 때와 Auth·데이터베이스를 함께 사용할 때 역할이 다르다. 따라서 “무엇을 쓰는가?”보다 “**어떤 책임을 누구에게 맡기는가?**”를 먼저 묻는다.

### 네 이름보다 먼저 구분할 여섯 층

| 층 | 학생이 묻는 질문 | 피해야 할 오해 |
|---|---|---|
| Build | 소스 코드가 브라우저 파일이나 실행 가능한 결과로 어떻게 바뀌는가? | 로컬 개발 서버가 켜졌으므로 배포 산출물도 준비됐다고 생각하기 |
| Hosting / Runtime | 파일을 전달할까, 요청마다 서버 코드를 실행할까? | 모든 배포 플랫폼이 모든 서버 코드를 같은 방식으로 실행한다고 생각하기 |
| Container | 앱과 의존성을 어떤 image로 묶고 어디에서 container로 실행할까? | Docker 자체가 공개 URL·데이터베이스·운영 서버를 모두 제공한다고 생각하기 |
| Data / Auth | 사용자·데이터·파일을 어디에 저장하고 누가 접근하게 할까? | 백엔드 서비스를 연결하면 권한 규칙도 자동으로 안전하다고 생각하기 |
| Config / Secret | Local·Preview·Production에 어떤 값이 다르고 어떤 값은 코드에 넣으면 안 되는가? | `.env` 파일 이름만 쓰면 secret이 자동 보호된다고 생각하기 |
| Observe / Recover | 공개 뒤 성공·오류·비용·데이터 상태를 무엇으로 확인하고 어디까지 되돌릴까? | 코드 롤백이 외부 데이터 변경까지 모두 되돌린다고 생각하기 |

### Vercel·Docker·Supabase·Firebase 역할 카드

| 이름 | 이 노드에서 관찰할 대표 역할 | 확인해야 할 경계 |
|---|---|---|
| Vercel | 프로젝트 빌드 결과를 배포하고 배포별 URL과 환경 구분을 관찰하는 예 | 지원 런타임, 빌드 명령, 환경 변수 scope, Preview와 Production 연결을 현재 문서에서 확인한다. |
| Docker | Dockerfile로 image를 만들고 image의 실행 인스턴스인 container를 구동하는 예 | image를 어디에서 실행·공개할지는 별도 결정이며, 상태 데이터와 secret을 image 안에 고정하지 않는다. |
| Supabase | 프로젝트별 Postgres 데이터베이스와 Auth·Storage 등 백엔드 기능을 연결하는 예 | 클라이언트에서 접근할 데이터는 권한 정책을 설계하고, secret key와 공개 가능한 key를 구분한다. |
| Firebase | Hosting 또는 Auth·Firestore·Realtime Database 같은 제품을 필요한 범위에서 조합하는 예 | Firebase 전체를 하나의 데이터베이스로 뭉뚱그리지 않고 선택한 제품의 데이터 모델·규칙·배포 범위를 확인한다. |

이 표는 최신 기능 비교표가 아니다. 실제 선택 전에는 관찰 날짜, 공식 문서, 계정·리전·플랜·프레임워크 조건을 다시 확인한다. 가격, 성능 순위, 무제한 확장, 완전한 보안을 이 노드에서 주장하지 않는다.

### 최소 배포 설계 카드

| 카드 | 기록할 내용 |
|---|---|
| User path | 사용자가 공개 URL에서 반드시 성공해야 하는 한 가지 행동은 무엇인가? |
| Build / Run | 정적 빌드 파일인가, 서버 프로세스인가, container인가? |
| Data / Auth | 저장할 데이터와 로그인 필요 여부, 접근 주체는 누구인가? |
| Environment | Local·Preview·Production에서 달라지는 값은 무엇인가? |
| Secret boundary | 브라우저에 노출되면 안 되는 값과 보관 위치는 무엇인가? |
| Preview gate | Production 전에 URL·핵심 경로·오류·권한 중 무엇을 확인할까? |
| Recovery | 코드, 설정, 데이터 각각의 복구 방법과 한계는 무엇인가? |
| Evidence | 배포 성공을 어떤 화면·로그·응답·검사표로 증명할까? |

## Bridges

### Previous Why

D6에서 학생은 AI 코딩 도구의 설명만 믿지 않고 파일 diff와 실행 결과를 확인했다. 이번 노드는 그 검증 습관을 로컬 폴더 밖으로 확장해 **빌드 결과, 실행 환경, 데이터 권한, Preview URL, 운영 설정**을 각각 확인하게 한다.

### Next Why

앱을 공개하고 나면 다음 질문이 생긴다.

> 오늘 선택한 도구와 방식은 갑자기 생긴 것일까? 자동완성에서 대화형 코딩, 에이전트, 배포 자동화까지 사람과 AI의 역할은 해마다 어떻게 바뀌었을까?

이 질문은 D8 Timeline으로 이어진다. 연표는 제품 이름을 외우기 위한 표가 아니라, **AI에 위임하는 작업 단위가 커질수록 Context·권한·검증·운영 책임이 어떻게 달라졌는지** 돌아보는 지도다.

## 3-step Practice

준비물: 종이 또는 메모 앱. 실제 계정·Git·배포·외부 데이터베이스는 사용하지 않는다. 아래 제공된 `mini-notes` 구조와 모의 배포 기록만 사용한다.

공통 시나리오: `mini-notes`는 메모 목록을 보여 주는 작은 웹 앱이다. 첫 버전은 읽기 전용 정적 JSON을 사용한다. 두 번째 요구에서 사용자별 메모 저장과 로그인이 추가된다.

```text
mini-notes/
├─ public/index.html
├─ public/notes.json
├─ server/            # 첫 버전에는 없음
├─ .env.example       # 실제 secret 없음
└─ DEPLOY-CHECKS.md   # 공개 URL, 데이터, 권한, 복구 검사표
```

모의 Preview 기록:

```text
BUILD: PASS
PREVIEW_URL: https://preview.example.invalid
HOME: 200 / 제목 표시됨
NOTES: 200 / 샘플 메모 3개 표시됨
ENV: PREVIEW_API_URL 사용
WARNING: 브라우저 bundle에서 ADMIN_SECRET 문자열 발견
PRODUCTION: NOT_PROMOTED
```

### Step 1. 앱 요구를 인프라 층으로 분해한다

- **Start:** 첫 버전 요구를 읽는다: `로그인 없이 샘플 메모 3개를 누구나 읽는다. 데이터 수정은 없다.`
- **Action:** Build, Hosting/Runtime, Container, Data/Auth, Config/Secret, Observe/Recover 여섯 칸에 `필요/불필요/미확인`을 표시한다. Vercel·Firebase Hosting·Docker·Supabase·Firebase 데이터 제품 카드 중 이번 요구에 필요한 역할만 연결한다.
- **Expected:** 학생은 정적 파일 제공만으로 가능한 최소 구조와, Docker 또는 관리형 데이터베이스가 현재 요구에는 필수가 아닌 이유를 설명한다. 제품명이 아니라 요구에서 선택이 시작된다.
- **Fail:** 네 제품을 모두 연결하거나 “유명한 조합”이라는 이유만으로 서버·데이터베이스·container를 추가한다.
- **Recover:** `사용자가 쓰는 데이터가 바뀌는가?`, `요청마다 서버 코드가 실행되어야 하는가?`, `운영 중 보존할 상태가 있는가?` 세 질문에 다시 답하고 불필요한 층을 제거한다.
- **Evidence:** 요구 분해표, 최소 구조도, 선택한 역할과 제외한 역할의 이유를 각각 한 문장씩 남긴다.

### Step 2. Preview에서 secret 노출 실패를 발견하고 복구한다

- **Start:** 위 모의 Preview 기록과 `.env.example`을 읽는다: `PUBLIC_API_URL=...`, `ADMIN_SECRET=replace_me`.
- **Action:** URL·핵심 화면·데이터·환경·secret·Production 상태를 검사한다. `ADMIN_SECRET`이 브라우저 bundle에 들어간 실패를 표시하고, Production 승격을 중단한다. 브라우저가 필요한 공개 설정과 서버에만 있어야 할 secret을 분리한 수정 설계를 만든다.
- **Expected:** Build PASS만으로 배포 완료를 선언하지 않는다. secret 노출을 차단하고 새 Preview build에서 문자열 미포함, 핵심 경로 성공, Production 미승격을 다시 확인한다.
- **Fail:** URL이 열리고 화면이 보인다는 이유로 경고를 무시하거나, 노출된 secret의 이름만 바꿔 같은 bundle에 다시 넣는다.
- **Recover:** 노출된 값은 폐기·교체가 필요하다고 기록하고, 클라이언트와 서버 경계를 다시 그린다. `공개 가능 값/서버 전용 값/현재 미확인 값`으로 분류한 뒤 Preview 검사 전체를 반복한다.
- **Evidence:** 첫 Preview 검사표, 중단 판정, secret 분류표, 수정 구조도, 재검사 결과, Production이 아직 승인되지 않았다는 기록을 남긴다.

### Step 3. 저장·로그인 요구에 맞는 최소 구조를 혼자 선택한다

- **Start:** 새 요구를 받는다: `사용자가 로그인하고 자신의 메모만 생성·조회한다. 운영자는 Production 전에 다른 사용자 데이터가 보이지 않는지 확인해야 한다.`
- **Action:** Vercel·Docker·Supabase·Firebase를 모두 쓰지 않아도 된다는 전제에서 배포 표면, 실행 방식, 데이터·인증 선택지 하나를 정한다. 선택한 서비스의 현재 공식 문서에서 확인해야 할 항목을 적고, 정상 사용자·다른 사용자·로그아웃 사용자 세 사례의 Preview gate를 설계한다. 첫 시도에서 “다른 사용자 메모가 조회됨” 실패를 주입하고 중단→권한 규칙 수정 요청→테스트 데이터 초기화 여부 확인→세 사례 재검사의 복구 경로를 작성한다.
- **Expected:** 최소 구조가 요구와 연결되고, `내 메모만 보임/타인 메모 거부/로그아웃 접근 거부`가 모두 증거로 확인되기 전에는 Production을 승인하지 않는다. 코드 롤백과 데이터 복구가 별개임을 기록한다.
- **Fail:** 제품 이름만 선택하고 데이터 접근 규칙을 생략하거나, 정상 사용자 사례 하나만 통과한 뒤 Production 완료로 표시한다.
- **Recover:** `누가`, `어떤 데이터에`, `어떤 행동을`, `어떤 조건에서` 할 수 있는지 표로 다시 쓴다. 세 사용자 상태와 실패 후 데이터 상태를 모두 재검사한다.
- **Evidence:** 선택·제외 이유, 공식 확인 항목, 구조도, 환경·secret 목록, 세 사례 결과, 실패·복구 기록, Production `GO/NO-GO` 판정과 이유를 남긴다.

## Quiz와 teach-back

### Q1. Vercel·Docker·Supabase·Firebase의 관계를 가장 정확하게 설명한 것은?

A. 네 제품은 모두 같은 종류의 웹 호스팅이므로 하나만 고르면 된다.  
B. Docker를 쓰면 공개 URL·데이터베이스·인증·백업이 자동으로 모두 생긴다.  
C. 배포 표면, 실행 패키지, 데이터·인증 같은 책임이 다르므로 앱 요구를 먼저 분해하고 필요한 역할만 조합한다.  
D. 네 제품을 모두 사용해야 실제 서비스라고 부를 수 있다.

**정답: C**

- A가 아닌 이유: 제품마다 맡을 수 있는 층이 다르고 한 제품 안에도 여러 기능이 있어 같은 종류로 단순화할 수 없다.
- B가 아닌 이유: Docker image와 container는 실행 패키징·격리 방식이며 공개 인프라와 관리형 데이터 서비스를 자동으로 제공하지 않는다.
- C인 이유: 요구와 책임을 먼저 나누면 최소 구조, 확인할 경계, 선택하지 않은 이유를 함께 설명할 수 있다.
- D가 아닌 이유: 불필요한 층은 설정·비용·실패 지점을 늘리며 완성도를 증명하지 않는다.

### Q2. Preview build는 성공했고 URL도 열린다. 브라우저 bundle에서 서버용 secret이 발견됐다. 가장 적절한 행동은?

A. 화면이 열리므로 Production으로 승격한 뒤 나중에 고친다.  
B. 변수 이름만 바꾸고 같은 bundle에 다시 넣는다.  
C. 승격을 중단하고 노출 값을 폐기·교체 대상으로 기록한 뒤 클라이언트/서버 경계를 수정하고 새 Preview 전체를 재검사한다.  
D. URL을 비공개 메모에 적으면 secret 노출도 해결된다.

**정답: C**

- A가 아닌 이유: 빌드와 화면 성공은 secret 보호를 증명하지 않으며 노출 상태를 Production으로 확대한다.
- B가 아닌 이유: 이름 변경은 브라우저에 값이 포함되는 구조를 바꾸지 않는다.
- C인 이유: 확산을 멈추고 값과 구조를 함께 복구한 뒤 동일 gate를 다시 통과해야 상태를 설명할 수 있다.
- D가 아닌 이유: 공개 bundle에 포함된 값은 URL 기록 방식과 무관하게 클라이언트에서 확인될 수 있다.

### Q3. 코드 배포를 이전 버전으로 롤백했다. 데이터도 자동으로 이전 상태가 되었을까?

A. 항상 그렇다. 코드 롤백은 연결된 모든 외부 상태를 되돌린다.  
B. 반드시 별도로 확인해야 한다. 코드·배포 설정·외부 데이터는 복구 범위와 절차가 다를 수 있다.  
C. 데이터는 운영 문제와 무관하므로 확인할 필요가 없다.  
D. AI가 “롤백 완료”라고 말하면 데이터 복구도 증명된다.

**정답: B**

- A가 아닌 이유: 배포 산출물을 이전 상태로 돌려도 외부 데이터베이스의 쓰기 결과가 그대로 남을 수 있다.
- B인 이유: 각 상태의 원본·백업·복구 지점과 재검사 증거를 따로 확인해야 한다.
- C가 아닌 이유: 잘못된 데이터나 권한은 코드가 정상이어도 사용자 피해를 계속 만들 수 있다.
- D가 아닌 이유: 완료 문장은 실제 데이터 상태나 복구 결과를 대신하지 못한다.

### Teach-back

다음 상황을 보지 않고 60초 안에 설명한다.

> “읽기 전용 메모 앱을 공개했다가 나중에 로그인과 사용자별 저장을 추가하려 한다. Vercel, Docker, Supabase, Firebase를 어떤 질문으로 구분하고, Preview에서 무엇을 확인하며, secret이나 권한 실패가 나면 어떻게 복구할 것인가?”

통과 기준:

- Hosting/Runtime, Container, Data/Auth의 책임을 구분한다.
- 네 제품을 모두 쓸 필요가 없으며 요구에 따라 조합이 달라짐을 말한다.
- Local·Preview·Production과 공개 설정·server secret을 구분한다.
- URL 성공뿐 아니라 핵심 경로·데이터 권한·로그 또는 검사 결과를 증거로 제안한다.
- 실패 시 중단→기록→설정·권한 수정→새 Preview→전체 재검사 흐름을 설명한다.
- 코드 롤백과 외부 데이터 복구의 범위가 다를 수 있음을 말한다.

## 출처 범위

| 범위 | 상태 | 사용 원칙 |
|---|---|---|
| Vercel deployment·배포별 URL·환경 구분 | `approved_kb_scoped` | 승인 KB `deployment-platforms`의 공식 문서 검증 범위만 재사용한다. 특정 프레임워크·요금제·성능 우위를 주장하지 않는다. |
| Firebase Hosting | `approved_kb_scoped` | 정적 파일 제공·CDN·HTTPS의 승인 KB 범위에서만 사용한다. Firebase 전체가 정적 호스팅뿐이라고 주장하지 않는다. |
| Docker image·container | `official_candidate_verified` | Docker 공식 Get Started/Workshop에서 image를 만들고 container로 실행하는 기초 역할만 사용한다. “어디서나 동일” 또는 완전 격리를 보장하지 않는다. |
| Supabase Postgres·Auth·Storage | `official_candidate_verified` | Supabase 공식 문서에서 프로젝트별 Postgres와 연결 제품의 존재만 확인한다. 가격·백업 범위·성능·Firebase 대비 우열은 다루지 않는다. |
| Firebase 데이터 제품 | `official_candidate_verified` | Firebase 공식 문서에서 Realtime Database와 Firestore가 NoSQL 계열이며 서로 다른 데이터 모델을 가진다는 범위만 사용한다. 하나의 고정 데이터베이스로 단순화하지 않는다. |
| 인프라 선택표·Preview gate·복구 | `educational_scope` | 입문자가 책임과 증거를 구분하기 위한 교육용 모델이다. 모든 장애·보안·비용 문제를 막는다고 주장하지 않는다. |
| 최신 가격·리전·한도·벤치마크·제품 순위 | `blocked_out_of_scope` | 변경 가능성이 높으므로 게시하지 않는다. 실제 선택 시 공식 문서를 다시 확인하고 별도 Research→Verification을 거친다. |

공식 확인 기준일: `2026-07-16`. 새 공식 출처 후보는 이 샘플 노드의 claim scope에만 사용하며 승인 KB로 승격되었다고 주장하지 않는다.

## Interactive 범위

`not_applicable_with_reason`: 이번 산출물은 운영자가 지정한 **단일 Markdown 샘플 노드**다. 인프라 카드 조합, 환경 분리, Preview gate, secret·권한 실패 주입은 이후 조작 가능한 인터랙션으로 전환할 수 있지만 현재 범위에는 React 인터랙션·실제 계정 연결·배포·웹사이트 구현이 포함되지 않는다. 따라서 인터랙티브 완료를 주장하지 않으며 Website Last 원칙을 유지한다.

## Node Quality Gate

| Gate | 판정 | 근거 또는 남은 일 |
|---|---|---|
| 1. Student Question | PASS | 로컬 성공 뒤 무엇을 어디에 배포하고 네 도구를 어떻게 구분할지 묻는 실제 질문으로 시작한다. |
| 2. Outcomes evidence-linked | PASS | Observed·Assisted·Independent·Explainable 각각에 층 표시·선택표·배포 기록·teach-back 증거가 있다. |
| 3. Markdown `review_ready` depth | PASS | 개념 지도, 역할 카드, 오해, 브리지, 실행 실습, 퀴즈, 출처 범위를 포함한다. |
| 4. Executable Practice | PASS | 세 단계 모두 start·action·expected·fail·recover·evidence를 포함한다. |
| 5. Interactive | N/A WITH REASON | Markdown 샘플 범위이며 인터랙티브·실제 배포·웹 완료를 주장하지 않는다. |
| 6. Node-specific Quiz | PASS | 세 문항에 정답과 모든 선택지의 이유가 있고 teach-back 통과 기준이 있다. |
| 7. Sources scoped | PASS | 승인 KB, 공식 후보 검증, 교육용 해석, 범위 밖 최신 주장을 분리하고 확인일을 기록한다. |
| 8. Independent Review | PENDING | 이번 단일 작성 범위에는 독립 리뷰가 포함되지 않았다. |
| 9. Relevant QA | N/A | 코드·라우트 변경이 없고 운영자가 git·build를 금지했으므로 lint·typecheck·test·build 대상이 아니다. |
| 10. Studio status honest | PASS | `sample_draft`, `website_status: not_started`로 표시한다. |

### Gate 결론

`REVIEW_READY_SAMPLE — NOT WEBSITE COMPLETE`

독립 리뷰 전에는 게시·Website 완료·다음 노드 COMPLETE를 주장하지 않는다. `V2_DOMAIN_OUTLINE.md`의 현재 Domain 7 명칭은 “평가·안전·신뢰성”이며, 이 문서는 운영자가 이번 요청에서 지정한 **“Domain 7 — Deploy·Infra: Vercel/Docker/Supabase/Firebase” 샘플 범위**를 구체화한다. 상위 개요의 도메인 번호·명칭이나 21개 개념·14개 섹션 계약은 변경하지 않는다.
