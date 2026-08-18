# BETA Day 2 — Goose 작업 및 커리큘럼 상태 보고서

```yaml
document: BETA-DAY-2-GOOSE-STATUS
branch: feat/community-goose-01
report_status: 일부 확인
observed_at: 2026-08-09
scope: git status, git diff --stat, 변경 파일 목적 분석, ai-ops/master-toc.md 대조
tests_run: false
deployment_run: false
```

## 1. 요약

현재 브랜치에는 커뮤니티 기능 하나만이 아니라, **AI Engineering V2 학습 경로 추가**, **Foundation 실습·접근성 보강**, **Firebase Storage 기반 미디어 확장**, **JuTell/Codex 운영 문서 및 설정**이 함께 들어와 있다.

다만 현재 작업 트리에서 `Goose`라는 작업 주체나 커밋 메타데이터를 직접 확인할 수는 없다. 따라서 이 보고서의 “Goose 작업”은 브랜치명과 변경 파일을 기준으로 묶은 작업 내용이며, 실제 작성자·작업 순서는 확인되지 않은 상태다.

## 2. Git 기준 상태

### 확인된 사실

- 현재 브랜치: `feat/community-goose-01`
- `git diff --stat`: tracked 변경 12개, **302 insertions(+), 43 deletions(-)**
- `git status --short --branch`: staged 변경 없음
- tracked modified: 12개
- untracked: 55개
- 현재 작업 트리 항목 합계: 67개
- `git diff --stat`에는 untracked 파일이 포함되지 않으므로, 실제 작업 범위는 stat보다 넓다.

### 변경 범위 요약

| 영역 | 확인된 내용 | 상태 |
|---|---|---|
| 학습 경로 | `/learn`에 AI Engineering V2 D1–D8 목록과 D1 진입 링크 추가 | 코드에 반영됨, 실제 화면 검증 안 함 |
| V2 커리큘럼 | `content/curriculum/V2_DOMAIN_OUTLINE.md`와 D1–D8 노드 명세 추가 | 파일 존재 확인, 공식 활성화 여부는 아님 |
| Foundation Practice | B05 수정, B06–B09·C01–C04 Practice 추가 | 파일 존재 확인, 전 노드 연결 검증 안 함 |
| 학습 상호작용 | NodeCheckpoint, Track C checkpoint 데이터, reduced-motion hook 추가 | 코드 존재 확인, 브라우저 동작 검증 안 함 |
| Firebase | Storage rules 연결, 클라이언트 Storage 초기화·에뮬레이터 연결, `firebase_storage` 타입 추가 | 코드·설정 반영, 실제 업로드 검증 안 함 |
| 운영·문서 | V3 문서, Codex/RP0 보고서, JuTell 설정·skill 추가 | 작업 운영자료로 보임, 승인·소유권은 별도 확인 필요 |

## 3. 이 작업들이 무엇을 위한 것인지

### A. AI Engineering V2를 학생용 진입점으로 노출

`src/app/learn/page.tsx`에 D1–D8 카드와 `/learn/ai-engineering-v2/D1-llm-basics` 진입 링크가 추가됐다. 별도 동적 라우트인 `src/app/learn/ai-engineering-v2/[nodeId]/page.tsx`와 `content/curriculum/nodes/D1–D8`가 함께 있어, V2를 문서에만 두지 않고 학습 화면의 진입 구조까지 연결하려는 작업으로 해석된다.

V2 개요는 문제 발견, 소프트웨어 구조, AI 협업, 모델 라우팅, 지식/RAG, 에이전트·워크플로, 평가·안전, 출시·운영의 8개 도메인을 제안한다. 각 노드는 현재 `sample_draft`, 대부분 `website_status: not_started`로 표시되어 있다.

### B. 기존 Foundation 노드의 “읽기 → 실습 → 확인” 연결 보강

B05 Practice는 파일 연결을 찾고, CSS/JS 연결을 끊었다가 복구하고, AI 요청을 작성하는 행동·실패·복구·완료 증거 구조로 확장됐다. B06–B09와 C01–C04에도 노드별 Practice 초안이 추가됐다.

또한 `NodeCheckpoint`와 Track C checkpoint 데이터가 추가되어, 단순 설명 페이지보다 학생의 선택·오답 이유·재시도를 연결하려는 방향이 보인다. `FileConnectExperience`와 `WebLayersExperience`는 `prefers-reduced-motion` 상태를 읽어 미리보기 전환에 전달하도록 변경됐다.

### C. 커뮤니티/미디어 확장을 위한 Firebase Storage 기반 추가

`firebase.json`에 Storage rules 파일을 연결하고, `src/lib/firebase/client.ts`에 Storage 초기화 및 개발 에뮬레이터 연결을 추가했다. 타입에도 `FirebaseStorage` 미디어 제공자가 추가됐다.

확인된 변경은 Storage 기반을 준비하는 수준이다. 현재 확인 범위에서는 실제 커뮤니티 화면, 파일 업로드 흐름, 권한 규칙의 실행 결과까지 확인되지 않았으므로 “커뮤니티 기능 완성”으로 볼 수 없다.

### D. 운영·문서 체계 정비

`.codex/config.toml`, `.agents/skills/beginner-bridge/`, `.jutell.json`, `AGENTS.md` 변경은 비개발자용 근거 기반 보고와 Codex 실행 규칙을 프로젝트에 연결하는 목적이다. `DESIGN.md`는 Experience → Practice → Quiz/teach-back → Outcome → Next 학습 레일과 접근성 원칙을 명시한다.

`STATE.md`와 `CODEX-P0-WORKFLOW-HANDOFF.md`도 RP0 복구 및 커리큘럼 마일스톤 게이트 정보로 갱신돼 있다. 다만 이 파일들의 기록 기준 브랜치는 `master`이므로 현재 브랜치의 실제 상태와 직접 일치하지 않는다.

## 4. `ai-ops/master-toc.md` 기준 현재 커리큘럼 상태

### 공식 인덱스에서 확인되는 상태

- 범위: A01–C10 Foundation 25개 노드
- Track A: A01–A06
- Track B: B01–B09
- Track C: C01–C10
- Day 1 `/learn/vibe-coding-foundation/day-1`은 기준 경험으로 보존·검증된 상태
- Track D: `paused`
- Practice/Quiz 상태: A01–A03, B01–B04는 interactive 체크포인트가 있고, B05–C04는 주로 `linked_static`, C05–C10은 checkpoint 데이터가 있으나 `data_unwired`
- A05–A06은 Quiz 진입이 `missing`으로 기록됨
- V2 D1–D8은 별도 후보/샘플 문서이며 공식 Foundation 25개 노드 인덱스에 포함된 완료 노드가 아님

### 브랜치 변경과의 관계

1. B05–C04 Practice 추가는 master TOC가 제시한 “개별 Practice 자산과 연결 상태를 보완한다”는 방향과 일치한다.
2. NodeCheckpoint·reduced-motion 추가는 B01–B04 및 이후 노드의 학습 확인·접근성 보강 방향과 일치한다.
3. `/learn`의 V2 D1–D8 노출은 `master-toc.md`의 공식 Foundation 범위를 넘어서는 제품 화면 변경이다.
4. V2 개요 자체는 개별 노드 제작·Track D 시작을 승인하지 않는다고 명시한다. 따라서 현재 V2 라우트와 화면 추가는 커리큘럼 공식 전환의 증거가 아니라, 샘플/부분 구현으로 취급해야 한다.

## 5. 검증 결과와 미확인 항목

### 통과 또는 확인됨

- 브랜치명, tracked diff stat, status 목록 확인
- 변경 파일의 주요 목적을 코드·문서 내용으로 대조
- `ai-ops/master-toc.md`의 범위·Track D·노드 연결 상태 확인
- V2 개요와 D1–D8 노드의 `sample_draft`/`website_status: not_started` 상태 확인

### 실행하지 않음

- `npm run lint`
- `typecheck`
- 테스트 및 빌드
- 브라우저에서 `/learn`·V2 라우트·Practice·Checkpoint 확인
- Firebase Emulator에서 Storage rules·업로드·권한 확인
- 실제 커뮤니티 사용자 흐름 확인

따라서 이번 보고서는 **변경 목적과 문서/코드 상태 분석 보고서**이지, 기능 동작이나 배포 준비 완료 판정이 아니다.

## 6. 위험과 사용자 확인

- 위험도: **높음**
- 근거: 학습 경로 라우팅과 공유 학습 상호작용, Firebase 외부 서비스 연결 설정이 함께 변경됐다. 특히 Storage rules와 V2 노출은 실행·권한·교육 범위에 영향을 줄 수 있다.
- 추가 위험: 작업 트리가 매우 더럽고, 기존 변경과 현재 브랜치 작업의 소유권·시점이 Git상 분리되지 않는다. `STATE.md`와 핸드오프도 과거 `master` 기준이라 현재 브랜치의 최신 SSOT로 사용할 수 없다.
- 사용자 결정 필요: V2 D1–D8을 실제 `/learn`에서 노출하는 범위를 Track D 승인 전에도 유지할지, 아니면 샘플 문서로만 둘지 결정해야 한다.

## 다음 행동 제안

- V2 라우트·Practice·Checkpoint를 대상으로 lint, typecheck, test, build를 실행하고 실제 화면을 확인한다.
- Firebase Emulator에서 Storage rules와 업로드/권한 흐름을 확인한다.
- 현재 브랜치 기준으로 `STATE.md`와 핸드오프를 재작성하기 전에, V2 노출 및 Track D 상태에 대한 운영자 결정을 기록한다.

## 결론

현재 브랜치는 “Goose 커뮤니티 Day 2 단일 기능”이라기보다, 커뮤니티 기반 확장을 위한 Firebase 준비와 함께 학습 플랫폼 V2·Foundation 학습 루프를 크게 확장한 통합 작업 상태다. 커리큘럼 SSOT 기준으로는 Foundation A–C가 본선이고 Track D/V2는 아직 승인·검증 전 단계이므로, 현재 변경을 완성 또는 공식 커리큘럼 전환으로 표시해서는 안 된다.
