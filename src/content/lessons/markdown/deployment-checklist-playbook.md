## 한 줄 정의

배포 체크리스트 플레이북은 프로덕션에 내보내기 전에 확인할 항목 — 빌드·보안·환경 변수·접근 보호 — 을 순서 있는 점검표로 정리한 레퍼런스입니다. Next.js 공식 문서가 "Before taking your Next.js application to production"으로 시작하는 프로덕션 체크리스트를 제공하듯, 배포는 명령 한 번이 아니라 점검의 묶음입니다. ==체크리스트의 존재 이유는 기억력이 아니라 압박 대응입니다 — 배포 직전의 서두름 속에서도 같은 항목을 같은 순서로 확인하게 만드는 장치==입니다.

이 플레이북은 deployment-cli-reference(배포 명령), production-env-and-secrets(환경 변수), monitoring-errors-rollbacks(배포 후)를 하나의 절차로 묶습니다. 이 사이트의 실제 배포 절차가 살아 있는 예시입니다.

![배포 체크리스트 플레이북: 빌드 검증 → 보안 점검 → 환경 변수 확인 → 접근 보호 → 배포 → 배포 후 확인의 6단 점검표](/lesson-diagrams/deployment-checklist-playbook/deploy-checklist.svg)

## 왜 존재하는가

배포 사고의 다수는 "몰라서"가 아니라 "잊어서" 일어납니다. 환경 변수를 프로덕션에 안 넣었거나, 보호가 필요한 미리보기 URL을 공개로 뒀거나, 테스트를 건너뛰고 배포했거나 — 전부 아는 항목을 압박 속에서 빠뜨린 사고입니다.

체크리스트는 이 실수 유형에 대한 검증된 해법입니다. Next.js는 프로덕션 이행 전 점검을 공식 문서로 제공하고, 그 안에는 기능이 아니라 안전에 관한 항목이 많습니다. 예를 들어 서버 액션에 대해 "Verify authentication and authorization inside each action."이라고 요구합니다 — 화면에서 버튼을 숨겼어도 액션 자체가 인증을 검사하지 않으면 뚫립니다. 마찬가지로 "Route Handlers are public HTTP endpoints."라는 문장은, API 라우트가 기본적으로 공개 엔드포인트임을 상기시킵니다 — 내부용이라는 착각이 사고가 됩니다.

==체크리스트는 프레임워크 지식과 보안 원칙을 "배포 직전에 반드시 스치는 길목"에 배치하는 설계==입니다. 이 강의는 그 길목을 이 사이트의 실제 배포 흐름에 맞춰 6단으로 정리합니다.

## 작동 원리

### 1단 — 빌드 검증: verify가 녹색인가

첫 관문은 로컬에서 프로덕션과 같은 빌드가 통과하는지입니다. 이 사이트의 `npm run verify`는 lint→typecheck→test→build를 묶어 실행합니다 — 이 한 명령이 녹색이어야 다음 단으로 갑니다. npm 디버깅 플레이북에서 다뤘듯, 실패하면 층을 분류해 복구한 뒤 다시 검증합니다. "일단 배포하고 고치자"는 이 단을 건너뛰는 말입니다.

### 2단 — 보안 점검: 공개 표면을 확인한다

배포되는 순간 공개되는 표면을 점검합니다. Route Handler가 있다면 "Route Handlers are public HTTP endpoints." — 인증 없는 라우트가 의도된 공개인지 확인합니다. 서버 액션이 있다면 "Verify authentication and authorization inside each action." — UI 뒤에 숨었다고 안전하지 않습니다. 정적 export 사이트(이 사이트처럼)라면 서버 코드 표면은 없지만, 번들에 secret이 섞이지 않았는지가 같은 성격의 점검입니다.

### 3단 — 환경 변수: 코드 밖 설정이 준비됐는가

Vercel 문서의 정의처럼 "Environment variables are key-value pairs configured outside your source code" — 설정은 코드 밖에 있으므로, 배포 환경에 그 값이 준비됐는지는 별도 확인이 필요합니다. 로컬 .env.local에만 있고 배포 환경엔 없는 값이 대표적 사고입니다. 이 사이트의 경우 `NEXT_PUBLIC_SITE_PASSWORD_HASH`가 빌드 타임에 주입되므로, 배포 전 빌드가 올바른 해시로 만들어졌는지 확인합니다.

### 4단 — 접근 보호: 누가 볼 수 있어야 하는가

배포 URL의 공개 범위를 점검합니다. Vercel은 "Deployment Protection lets you control who can access your preview and production URLs."라고 설명합니다 — 미리보기·프로덕션 URL 접근 제어가 플랫폼 기능으로 존재합니다. 이 사이트의 비공개 운영 기간에는 PasswordGate(클라이언트 게이트)와 robots noindex가 그 역할을 했고, 공개 전환(2026-07) 때는 점검 방향이 뒤집혔습니다 — "보호 장치를 의도적으로 제거했는가, 공개해도 되는 콘텐츠인가(인용 정책 정리)"가 항목이 됐습니다. 4단의 본질은 방향이 아니라 확인입니다: 이번 배포의 공개 범위가 의도와 일치하는가.

### 5단 — 배포 실행: 명령과 대상 확인

배포 명령을 실행하기 전 대상(프로젝트·환경)을 확인합니다. 이 사이트는 `npx firebase-tools deploy --only hosting --project ju0o-ec967` — --project 지정이 잘못된 프로젝트로의 배포를 막습니다. 배포 토큰이 필요한 CI 환경에서는 토큰을 인자가 아닌 환경 변수로 넘깁니다(deployment-cli 강의의 원칙).

### 6단 — 배포 후 확인: 열어서 본다

배포 완료 메시지는 끝이 아닙니다. 실제 URL을 열어 첫 화면, 게이트 동작, 새 콘텐츠 반영을 눈으로 확인합니다. monitoring 강의의 원칙대로, 문제가 보이면 원인 분석보다 롤백이 먼저입니다.

## 스펙과 세부

### 체크리스트는 짧아야 지켜진다

항목이 30개면 아무도 안 읽습니다. 6단 각 1~3항목, 한 화면 분량이 실전 상한입니다. 상세 절차는 각 강의(레퍼런스)로 링크하고, 체크리스트에는 질문만 남깁니다 — "verify 녹색인가?", "보호 장치 살아 있는가?".

### 프로젝트마다 4단이 다르다

1·5·6단은 어디서나 비슷하지만, 2~4단은 프로젝트 구조에 따라 다릅니다. 서버 액션이 있는 앱은 액션 인증 점검이, 정적 사이트는 번들 secret 점검이 핵심입니다. 체크리스트는 복사가 아니라 자기 프로젝트의 공개 표면에 맞춰 작성합니다.

### 중복 제출 같은 UX 세부도 배포 전 점검 대상이다

Next.js 문서는 서버 액션의 실행 방식을 "Next.js dispatches Server Actions one at a time per client."라고 설명합니다 — 클라이언트당 한 번에 하나씩 순차 처리되므로, 연타 시 대기열이 쌓이는 UX를 배포 전에 확인할 가치가 있습니다. 이런 프레임워크 성질은 문서를 읽어야 알고, 체크리스트가 그 읽기를 강제하는 장치입니다.

## 원문으로 읽기

> "Before taking your Next.js application to production"
>
> — Next.js 애플리케이션을 프로덕션으로 가져가기 전에.
> [Next.js Docs — Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)

공식 체크리스트의 선언부입니다. 배포 전 점검이 프레임워크 공식 권장 절차임을 보여줍니다.

> "Verify authentication and authorization inside each action."
>
> — 각 액션 내부에서 인증과 인가를 검증하라.
> [Next.js Docs — Production Checklist](https://nextjs.org/docs/app/guides/production-checklist)

보안 점검(2단)의 핵심입니다. UI 뒤에 숨었다고 안전하지 않으며, 액션 자체가 검사해야 합니다.

> "Route Handlers are public HTTP endpoints."
>
> — 라우트 핸들러는 공개 HTTP 엔드포인트다.
> [Next.js Docs — Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend)

공개 표면의 정의입니다. "내부용"이라는 가정이 사고가 되는 이유입니다.

관련 원문(링크): [Vercel Docs — Environment Variables](https://vercel.com/docs/environment-variables)

3단의 근거입니다. 코드 밖에 있으므로 배포 환경 준비 여부를 별도로 확인해야 합니다.

관련 원문(링크): [Vercel Docs — Deployment Protection](https://vercel.com/docs/deployment-protection)

4단의 근거입니다. 접근 제어가 플랫폼 기능으로 존재하며, 비공개 사이트는 이 층을 반드시 점검합니다.

## 실전에서

### 자기 프로젝트용 한 페이지를 만든다

이 강의의 6단을 골격으로, 자기 프로젝트의 공개 표면에 맞는 항목을 채워 한 페이지 체크리스트를 만듭니다. 배포 문서(이 사이트는 DEPLOY-GUIDE)에 함께 둡니다.

### AI 배포에도 같은 체크리스트를 적용한다

AI에게 "배포해줘"를 맡길 때도 이 체크리스트를 기준으로 줍니다 — "verify 통과 확인 후, 대상 프로젝트 확인 후, 배포 후 URL 확인까지". AI가 5단만 수행하고 1·6단을 건너뛰는 것을 막습니다.

### 실패 시 되돌아갈 단을 정한다

각 단이 실패하면 어디로 가는지 미리 정합니다 — 1단 실패는 npm 플레이북으로, 6단 실패는 롤백으로. 체크리스트가 플레이북들의 허브가 됩니다.

### 배포 직후 확인을 의식화한다

"Deploy complete"를 보고 닫지 않습니다. URL 열기 → 게이트 확인 → 신규 콘텐츠 1개 확인 — 3분이면 되고, 이 3분이 사고 발견 시간을 몇 시간에서 몇 분으로 줄입니다.

## 한계와 트레이드오프

첫 번째 trade-off는 속도와 점검의 균형입니다. 체크리스트는 배포를 느리게 만듭니다 — 의도된 비용입니다. 다만 위험이 낮은 배포(오타 수정)까지 전 항목을 강제하면 피로가 쌓여 체크리스트 자체가 무시됩니다. 위험도에 따라 짧은 경로(1→5→6)를 허용하는 것이 현실적입니다.

두 번째 한계는 체크리스트의 노후화입니다. 프로젝트 구조가 바뀌면(서버 액션 추가, 인증 방식 변경) 점검 항목도 바뀌어야 합니다. 낡은 체크리스트는 거짓 안심을 만들므로, 구조 변경 PR에 체크리스트 갱신을 포함시킵니다.

세 번째 한계는 점검이 검증을 대체하지 않는다는 점입니다. 체크리스트는 "확인했는가"를 묻지만, 확인의 품질은 각 단의 실행에 달렸습니다. 6단을 형식적으로 클릭만 하면 장치가 무력화됩니다 — 각 단은 관찰 가능한 증거(verify 로그, 열어본 화면)로 답해야 합니다.

네 번째 한계는 플랫폼 종속입니다. 이 강의의 인용은 Next.js·Vercel 문서지만, 원칙(빌드 검증·공개 표면·환경 변수·접근 보호·배포 후 확인)은 플랫폼 불문입니다. 다른 스택에서는 항목의 구체 명령만 바꿔 적용합니다.

## 더 읽기

이 강의의 근거 KB는 `deployment-checklist-playbook`입니다. 원문은 Next.js Production Checklist(배포 전 점검·액션 보안), Backend for Frontend(라우트 핸들러 공개성), Server Actions(순차 처리), Vercel Environment Variables(코드 밖 설정)와 Deployment Protection(URL 접근 제어)입니다.

선행 강의로 `deployment-cli-reference`(배포 명령·토큰), `production-env-and-secrets`(환경 변수), `ci-cd-pipeline-basics`(자동화 파이프라인)를 읽으면 각 단의 배경이 채워집니다. 함께 읽으면 좋은 강의는 `monitoring-errors-rollbacks`(6단 이후의 세계)와 `npm-debugging-playbook`(1단 실패 시의 플레이북)입니다. 다음 학습은 캡스톤 `private-ai-learning-site-project` — 이 체크리스트가 실제로 지켜지는 사이트 전체를 완성 프로젝트로 다룹니다.
