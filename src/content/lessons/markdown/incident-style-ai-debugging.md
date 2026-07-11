## 한 줄 정의

장애 대응식 AI 디버깅은 운영 사고가 났을 때 감이나 AI의 첫 추측으로 코드를 고치는 대신, 로그라는 증거에서 출발해 가설을 세우고 검증하며, 사용자 영향이 크면 즉시 롤백으로 복구하는 절차를 AI와 함께 수행하는 방식입니다. Twelve-Factor App은 로그를 "the stream of aggregated, time-ordered events collected from the output streams of all running processes and backing services"라고 정의합니다. ==장애 대응식 디버깅은 두 축 — 증거(로그)와 복구(롤백) — 사이에서 AI를 검증된 가설 생성기로 씁니다==.

AI는 오류 로그를 붙이면 즉시 원인과 수정안을 줍니다. 문제는 그 속도가 검증을 건너뛰게 만든다는 점입니다. 이 강의는 사고의 압박 속에서도 순서를 지키는 규율 — 먼저 관찰하고, 필요하면 복구하고, 그 다음 검증하는 — 을 다룹니다.

![장애 대응식 AI 디버깅: 로그 관찰에서 출발해 영향이 크면 즉시 롤백하고, AI 가설을 로그·재현으로 검증하는 흐름](/lesson-diagrams/incident-style-ai-debugging/incident-loop.svg)

## 왜 존재하는가

사고가 나면 사람은 성급해집니다. 사용자가 영향을 받고 있고, 압박이 크고, 빨리 고치고 싶습니다. 이때 AI에게 "이 오류 고쳐줘"라고 하면 즉시 수정안이 나옵니다. 하지만 그 수정이 진짜 원인을 다룬 것인지 확인하지 않으면, 증상만 가리고 사고를 키울 수 있습니다.

장애 대응식 디버깅은 이 함정에 대한 방어입니다. 개발 중 디버깅과 운영 사고 대응은 다릅니다. 운영에서는 이미 배포된 시스템이 실패하고 있고, 사용자 영향을 멈추는 것이 원인을 아는 것보다 급합니다. 그래서 이 규율은 두 가지를 강제합니다. 첫째, 원인 추정을 로그 증거에 근거하게 합니다 — 로그는 time-ordered events이므로 무엇이 언제 시작됐는지 보여줍니다. 둘째, 복구를 코드 수정이 아니라 롤백으로 우선합니다 — Vercel의 표현으로 "The rollback happens instantaneously"이므로, 원인 분석보다 먼저 사용자 영향을 멈출 수 있습니다.

AI 시대에 이 규율이 더 중요해진 이유는 AI가 가설을 너무 빠르게 주기 때문입니다. ==AI는 그럴듯한 원인 가설을 즉시 만들지만, 어떤 가설이 맞는지 정하는 것은 AI가 아니라 로그 증거입니다==. 장애 대응식 디버깅은 AI의 속도를 살리되, 결론은 증거로 내리게 합니다.

## 작동 원리

### 로그는 증거의 출발점이다

사고 대응의 첫 단계는 코드가 아니라 로그입니다. 로그는 "aggregated, time-ordered events"이므로, 오류가 언제 시작됐고 그 직전에 무엇이 있었는지 보여줍니다. 시간 순서가 핵심입니다. "오류가 났다"가 아니라 "몇 시 몇 분부터 오류가 시작됐고, 그 직전에 어떤 배포나 이벤트가 있었는가"를 봅니다.

이 시각이 용의자 목록을 만듭니다. 사고 시작 직전의 배포, 설정 변경, 트래픽 급증이 유력한 후보입니다.

### 앱은 stdout에 로그를 흘린다

Twelve-Factor App은 "Each running process writes its event stream, unbuffered, to stdout"이라고 설명합니다. 그리고 "A twelve-factor app never concerns itself with routing or storage of its output stream"이라고, 앱은 로그를 흘리기만 하고 저장·라우팅은 실행 환경이 맡는다고 말합니다. 디버깅하는 사람은 이 스트림을 읽는 데서 출발합니다 — 어디에 저장되든, 봐야 할 것은 시간 순서 이벤트입니다.

### 영향이 크면 복구가 원인 분석보다 먼저다

Vercel은 롤백이 "a swift recovery from production incidents, like breaking changes or bugs"에 유용하다고 설명합니다. 사용자 영향이 크면, 원인을 완전히 이해하기 전에 롤백으로 먼저 멈춥니다. 롤백은 그 자체로 실험이기도 합니다 — 롤백 후 사고가 멈추면 "최근 변경이 원인"이라는 가설이 강해집니다.

이 순서가 중요합니다. 원인 분석에 매달리는 동안 사용자 영향은 계속 커집니다. "즉시 복구 → 안전한 상태에서 원인 분석"이 압박을 줄입니다.

### AI는 가설 생성기, 로그는 판정자

AI에게 로그를 주면 원인 가설을 빠르게 만듭니다. 이것은 유용합니다 — 사람이 놓친 패턴을 지적할 수 있습니다. 하지만 그 가설은 검증 전까지 추측입니다. 로그의 시간 순서, 최근 변경과의 연결, 재현으로 확인해야 결론이 됩니다. AI의 첫 가설이 틀리는 경우도 많으므로, "원인은 X"라는 답에 근거 로그 라인과 재현 절차를 요구합니다.

## 스펙과 세부

### 최근 변경을 첫 용의자로 둔다

사고 직전의 배포·PR·설정 변경이 가장 유력한 용의자입니다. 코드 변경 위험 분석의 관점을 사고에 적용하면 "무엇이 바뀌었나"가 첫 질문이 됩니다. 롤백은 이 용의자를 즉시 제거하는 실험입니다 — 롤백으로 사고가 멈추면 최근 변경이 범인일 가능성이 높습니다.

### 롤백 후 상태를 보호한다

롤백은 즉시 복구를 주지만, 그 후 다시 자동 배포가 덮어쓰면 사고가 재발합니다. 되돌린 상태를 보호하고, 원인이 확인·수정될 때까지 새 배포를 막는 절차가 필요합니다. 모니터링·롤백 강의에서 다룬 "롤백 후 자동 배포 중단" 개념이 여기 연결됩니다.

### AI 수정안도 리뷰 대상이다

원인을 확인한 뒤 AI에게 수정을 요청하더라도, 그 수정안은 곧바로 배포하지 않고 리뷰합니다. AI 결과물 리뷰 강의의 관점에서, "고쳤습니다"라는 주장에 테스트·재현 결과를 요구합니다. 사고 상황일수록 성급한 수정이 2차 사고를 부르므로, 검증 증거가 리뷰 결정의 근거가 됩니다.

## 원문으로 읽기

> "Logs are the stream of aggregated, time-ordered events collected from the output streams of all running processes and backing services."
>
> — 로그는 실행 중인 모든 프로세스와 백킹 서비스의 출력 스트림에서 수집된, 시간순으로 정렬된 이벤트의 스트림이다.
> [The Twelve-Factor App: Logs](https://12factor.net/logs)

로그가 왜 사고 대응의 출발점인지를 보여줍니다. "time-ordered"가 핵심입니다 — 무엇이 언제 시작됐는지가 원인 추적의 실마리입니다.

> "Each running process writes its event stream, unbuffered, to `stdout`."
>
> — 실행 중인 각 프로세스는 자신의 이벤트 스트림을 버퍼링 없이 stdout에 기록한다.
> [The Twelve-Factor App: Logs](https://12factor.net/logs)

로그가 어디서 나오는지를 설명합니다. 디버깅은 이 스트림을 읽는 데서 시작합니다.

> "A twelve-factor app never concerns itself with routing or storage of its output stream."
>
> — 12요소 앱은 자신의 출력 스트림의 라우팅이나 저장에 결코 관여하지 않는다.
> [The Twelve-Factor App: Logs](https://12factor.net/logs)

앱은 로그를 흘리고 저장·라우팅은 환경이 맡는 역할 분리를 보여줍니다. 사고 시 로그가 어디에 모이는지는 환경이 정하지만, 봐야 할 것은 그 이벤트 스트림입니다.

> "This can be useful in situations that require a swift recovery from production incidents, like breaking changes or bugs."
>
> — 이것은 breaking change나 버그 같은 운영 사고로부터 신속한 복구가 필요한 상황에서 유용하다.
> [Performing an Instant Rollback — Vercel](https://vercel.com/docs/instant-rollback)

롤백이 사고 복구 수단임을 보여줍니다. 원인을 완전히 알기 전에도 사용자 영향을 멈출 수 있습니다.

> "The rollback happens instantaneously."
>
> — 롤백은 즉시 일어난다.
> [Performing an Instant Rollback — Vercel](https://vercel.com/docs/instant-rollback)

복구를 원인 분석보다 먼저 수행할 수 있는 근거입니다. 즉시성은 압박 속에서 가장 빠른 방어입니다.

## 실전에서

### 로그부터 연다

사고 알림을 받으면 코드가 아니라 로그를 먼저 엽니다. 오류가 시작된 시각을 찾고, 그 직전의 이벤트·배포를 봅니다. 시간 순서가 용의자를 좁혀줍니다.

### 영향이 크면 먼저 롤백한다

사용자가 영향을 받고 있으면 원인 분석을 멈추고 롤백합니다. 롤백 후 사고가 멈추는지 관찰합니다 — 멈추면 최근 변경이 원인일 가능성이 큽니다. 되돌린 상태는 원인 수정 전까지 보호합니다.

### AI 가설에 로그 증거를 요구한다

AI에게 로그를 주고 원인을 물을 때, "원인은 X"라는 답에 그 근거가 되는 로그 라인과 재현 절차를 요구합니다. 재현되지 않는 가설은 채택하지 않습니다.

### 수정 후 재발 방지를 확인한다

원인을 고친 뒤에는 같은 사고가 재발하지 않도록 회귀 테스트나 모니터링 조건을 추가합니다. 사고는 한 번 고치는 것으로 끝이 아니라, 다음에 같은 사고를 막는 증거를 남기는 것으로 마무리됩니다.

## 한계와 트레이드오프

첫 번째 한계는 로그의 불완전성입니다. 로그가 부족하거나 중요한 이벤트를 남기지 않으면 시간 순서만으로 원인을 좁히기 어렵습니다. 그래서 평소의 관측성(observability) 설계가 사고 대응 능력을 좌우합니다.

두 번째 trade-off는 롤백과 수정 사이의 선택입니다. 롤백은 빠르지만 최근의 정당한 변경까지 되돌립니다. 사용자 영향이 작고 원인이 명확하면 롤백보다 빠른 수정이 나을 수 있습니다. 영향의 크기와 원인의 확실성으로 판단합니다.

세 번째 한계는 AI 가설의 편향입니다. AI는 흔한 원인을 먼저 제시하는 경향이 있어, 드문 원인이 진짜일 때 첫 가설이 틀릴 수 있습니다. 첫 가설을 결론으로 삼지 않고 증거로 검증하는 습관이 필요합니다.

네 번째 한계는 압박 속 절차 이탈입니다. 사고 중에는 절차를 건너뛰고 바로 고치고 싶어집니다. 그래서 "로그 먼저, 영향 크면 롤백, 그다음 검증"이라는 순서를 사전에 플레이북으로 정해두는 것이 실전에서 절차를 지키게 합니다.

## 더 읽기

이 강의의 근거 KB는 `incident-ai-debugging`입니다. 먼저 Twelve-Factor App의 Logs를 읽고 로그가 time-ordered event stream이라는 정의와 stdout·라우팅 분리 원칙을 확인하세요. 그 다음 Vercel의 Instant Rollback 문서에서 롤백이 운영 사고의 즉시 복구 수단임을 봅니다. 이 두 출처가 이 강의 인용의 원문입니다.

선행 강의로 `monitoring-errors-rollbacks`를 읽으면 로그·모니터링·롤백의 도구를 이해할 수 있고, `debugging-error-reading`은 오류 메시지와 스택 트레이스를 읽는 기초를 줍니다. 함께 읽으면 좋은 강의는 `code-change-risk-analysis`(최근 변경을 용의자로 보는 관점)와 `reviewing-ai-output`(AI 수정안을 검증 증거로 리뷰)입니다. 사고 대응 절차를 체크리스트로 묶는 실무는 이후 project-textbook 모듈의 배포 체크리스트 플레이북으로 이어집니다.

자가 QA 결과: V2 8섹션을 모두 포함했고, Quote Bank 인용 5개를 원문 그대로 사용했습니다(원어+번역+링크+해설). 본문은 승인 KB `incident-ai-debugging`의 Twelve-Factor Logs·Vercel Instant Rollback 출처와 monitoring-errors-rollbacks·debugging-error-reading 승인 KB 범위 안에서 작성했으며 KB 외 신규 사실을 추가하지 않았습니다. 하이라이트(`==`)는 섹션당 3개 이하·마커 짝수로 유지했고 콜아웃은 사용하지 않았습니다.
