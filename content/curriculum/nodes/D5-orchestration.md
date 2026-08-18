---
id: D5-orchestration
title: "AI 작업을 어떻게 반복 가능하게 운영할까? — Workflow, Harness, Memory, Scheduler"
domain: "Domain 5 — Orchestration·Automation: Workflow/Harness/Memory/Scheduler (운영자 지정 샘플 범위)"
status: sample_draft
audience: "도구를 호출하는 AI 흐름은 이해했지만 반복 실행·상태 유지·실패 복구는 처음 설계하는 입문자"
estimated_time: "45–55분"
source_status: approved_kb_scoped
website_status: not_started
---

# AI 작업을 어떻게 반복 가능하게 운영할까?

## Student Question

> AI에게 매일 같은 일을 맡기려면 무엇이 필요할까? Workflow, Harness, Memory, Scheduler는 각각 무엇을 맡고, 실행이 겹치거나 중간에 실패하면 어디서 다시 시작해야 할까?

학생은 앞 노드에서 AI가 Tool·Function Call을 제안하고 애플리케이션이 검증과 승인 뒤 실제 도구를 실행한다는 경계를 배웠다. 그러나 한 번 성공한 도구 호출이 매일 같은 품질로 반복된다는 뜻은 아니다. 예약 시각에 실행이 두 번 시작될 수 있고, 중간 결과가 사라질 수 있으며, 오래된 상태를 최신 사실처럼 사용할 수도 있고, 검증에 실패한 결과가 다음 행동으로 넘어갈 수도 있다.

이 노드는 자동화를 “AI가 알아서 계속 일하는 기능”으로 설명하지 않는다. 학생이 **시작 신호, 단계와 의존성, 실행 상태, 검증·승인·복구 장치, 완료 증거를 한 흐름으로 설계하는 방법**을 익히는 노드다.

## Why Now

D4에서 도구를 연결하고 호출 제안과 실제 실행을 구분했다. 이제 도구 행동을 반복 업무로 확장하려면 “언제 시작하고, 어떤 순서로 진행하며, 이전 실행에서 무엇을 이어 받고, 실패하면 어디에서 멈출까?”를 정해야 한다. 이 설계가 없으면 다음과 같은 실패가 생긴다.

- Scheduler가 작업을 시작했다는 사실을 작업 완료로 착각한다.
- 단계 순서와 통과 조건이 없어 실패한 결과가 다음 단계로 전달된다.
- 실행 상태를 남기지 않아 오류 하나에도 전체 작업을 처음부터 반복한다.
- 이전 실행의 Memory를 출처가 확인된 최신 사실처럼 사용한다.
- 같은 예약 실행이 겹쳐 알림이나 쓰기 행동이 중복된다.
- Harness의 검증·중단·기록 없이 모델의 자신 있는 문장을 성공 증거로 삼는다.

이 노드의 목표는 특정 자동화 제품이나 cron 문법을 외우는 것이 아니다. **작은 반복 업무를 Scheduler → Workflow → Orchestration → Harness → Memory로 연결하고, 정상·중복·실패·복구 경로를 도움 없이 설명하는 것**이 목표다.

## Outcomes와 완료 증거

| 수준 | 학생이 할 수 있는 일 | 관찰 가능한 완료 증거 |
|---|---|---|
| Observed | 예약 신호가 들어온 뒤 여러 단계가 실행되고 검증 결과에 따라 완료 또는 중단되는 사례를 관찰한다. | 예시 실행 기록에서 trigger, 단계, 상태 읽기·쓰기, 검증, 중단, 완료를 서로 다른 기호로 표시한다. |
| Assisted | 안내 카드를 사용해 Workflow·Harness·Memory·Scheduler의 책임과 Orchestration의 조정 역할을 구분한다. | 다섯 개념 카드에 입력·행동·출력·실패 책임을 쓰고 카드 사이 전달선을 그린다. |
| Independent | 새로운 반복 업무 하나에 대해 정상·중복·실패·복구 경로를 도움 없이 설계한다. | 시작 조건, 단계 의존성, 상태 기록, 중복 방지 키, 검증 게이트, 재시도·중단 조건, 사람 승인 지점이 한 장의 실행 명세에 남아 있다. |
| Explainable | Scheduler가 작업의 정확성을 보장하지 않고 Memory가 사실 원본을 대신하지 않으며 Harness가 Workflow와 다른 이유를 설명한다. | 60초 teach-back 또는 6문장 설명에 다섯 개념의 역할, 실패 위치, 복구 기준, 사람 책임이 모두 들어 있다. |

### 한 줄 완료 조건

학생이 자료를 보지 않고 반복 업무 하나를 **Trigger → 단계 실행 → 상태 확인 → 결과 검증 → 완료 또는 복구 → 사람 승인** 흐름으로 그린 뒤, Workflow·Harness·Memory·Scheduler와 Orchestration의 역할을 서로 구분해 설명하면 이 노드의 학습 Outcome을 충족한다.

## 개념 지도

```text
시간·간격·이벤트·수동 실행
  ↓ 시작 신호를 만든다
Scheduler: 정한 조건에 따라 실행 시작을 요청하는 장치
  ↓ run_id와 trigger 정보 전달
Orchestration: 단계·도구·역할의 순서, 소유권, 전달, 분기를 조정
  ↓ 실행할 경로 선택
Workflow: 입력 → 단계 → 의존성 → 조건 → 출력으로 이어지는 작업 경로
  ↕ 이전 상태 읽기 / 새 상태 쓰기
Memory: 다음 단계나 다음 실행에서 다시 사용할 명시적 상태 기록
  ↓ 모든 실행을 둘러싼 제어
Harness: 권한·검증·승인·추적·재시도·중단·복구·run state를 관리
  ↓ PASS / RETRY / STOP / APPROVAL_REQUIRED
완료 증거 또는 복구 가능한 중단 기록
```

이 지도는 입문용 운영 모델이다. 실제 시스템에서는 Scheduler가 Workflow 플랫폼 안에 있거나, Memory가 데이터베이스·파일·체크포인트 등 여러 형태로 저장될 수 있다. Harness와 Orchestration의 경계도 제품마다 다를 수 있다. 중요한 것은 제품 이름이 아니라 **누가 시작하고, 누가 순서를 정하고, 어떤 상태를 이어 쓰며, 무엇이 실행을 허용·중단하고, 어떤 증거로 완료를 판정하는지**가 보이는가이다.

### 다섯 개념을 구분하는 질문

| 개념 | 이 노드에서 묻는 질문 | 피해야 할 오해 |
|---|---|---|
| Scheduler | “언제 어떤 조건에서 새 실행을 시작할까?” | 정시에 시작되면 내용도 정확하고 한 번만 실행된다고 생각하기 |
| Workflow | “어떤 단계가 어떤 순서와 의존성으로 진행될까?” | 할 일 목록만 있으면 실패 경로까지 갖춘 Workflow라고 생각하기 |
| Orchestration | “각 단계·도구·역할을 누가 소유하고 어디로 넘길까?” | 여러 작업을 동시에 켜는 것만 Orchestration이라고 생각하기 |
| Memory | “다음 단계나 다음 실행에 어떤 상태를 어떤 근거와 시각과 함께 남길까?” | Memory를 모델의 영구 기억이나 항상 최신인 사실 원본으로 생각하기 |
| Harness | “무엇을 허용·검증·기록하고 언제 재시도·중단·승인 요청할까?” | Prompt 한 줄이나 테스트 한 개를 Harness 전체라고 생각하기 |

### 반복 자동화 실행 카드

| 카드 | 학생이 적을 내용 |
|---|---|
| Trigger | 시간·이벤트·수동 실행 중 무엇이 시작 신호인가? |
| Run identity | 이번 실행을 구분할 `run_id`와 중복 판단 키는 무엇인가? |
| Steps | 단계와 입력·출력, 선행 의존성은 무엇인가? |
| State / Memory | 진행 상태, 마지막 성공 지점, 근거 시각 중 무엇을 남길까? |
| Gate | 어떤 기준을 통과해야 다음 단계로 갈 수 있는가? |
| Retry | 어떤 실패를 몇 번, 어느 단계에서 다시 시도할까? |
| Stop / Escalate | 어떤 실패는 자동 재시도하지 않고 누구에게 알릴까? |
| Approval | 외부 쓰기·전송·게시 전에 누가 무엇을 확인할까? |
| Evidence | 완료·중단·미실행을 무엇으로 증명할까? |

## Bridges

### Previous Why

D4에서 모델의 Tool·Function Call은 실행 제안이고, 애플리케이션이 입력·권한·승인을 확인한 뒤 API나 다른 기능을 실제로 실행한다는 점을 배웠다. 이번 노드는 그 한 번의 실행을 **예약 가능한 반복 흐름, 단계별 상태, 검증 게이트, 실패 복구 기록**으로 확장한다.

### Next Why

복구 가능한 자동화 흐름을 만들고 나면 다음 질문이 생긴다.

> 이 Workflow가 여러 사례에서도 정확하고 안전하며 비용과 지연을 감당할 수 있다는 것을 어떻게 증명할까?

이 질문은 Evaluation·Safety·Reliability로 이어진다. 실행 기록과 Harness의 gate가 있더라도 평가 사례와 품질 기준이 없다면 “돌아갔다”와 “잘 작동했다”를 구분할 수 없다.

## 3-step Practice

준비물: 종이 또는 메모 앱, 아래 공통 시나리오와 모의 실행 기록. 실제 Scheduler, 외부 계정, API, 메시지 전송은 사용하지 않는다.

공통 시나리오: 매일 오전 9시에 새로운 학습 질문을 모아 **검토용 요약 초안**을 만드는 자동화를 설계한다. 실제 게시나 전송은 하지 않으며, 사람이 초안을 확인한 뒤 다음 행동을 결정한다.

제공된 모의 입력:

```json
{
  "triggered_at": "2026-07-17T09:00:00+09:00",
  "run_id": "daily-2026-07-17",
  "questions": [
    { "id": 101, "text": "에이전트가 실패하면 어디서 다시 시작하나요?" },
    { "id": 102, "text": "스케줄 실행이 두 번 되면 어떻게 하나요?" }
  ],
  "memory": {
    "last_successful_question_id": 100,
    "updated_at": "2026-07-16T09:03:00+09:00"
  }
}
```

### Step 1. 한 번의 실행에서 다섯 개념의 경계를 관찰한다

- **Start:** 다음 모의 기록을 읽는다: `09:00 trigger → 새 질문 조회 → 중복 제거 → 요약 초안 → 필수 항목 검사 → 검토 대기 → 상태 저장`.
- **Action:** 각 구간에 `Scheduler`, `Workflow`, `Orchestration`, `Memory`, `Harness` 카드를 배치한다. 시작 신호, 단계 순서, 상태 읽기·쓰기, gate 판정, 사람 승인 대기 위치를 서로 다른 기호로 표시한다.
- **Expected:** Scheduler는 시작만 요청하고, Workflow는 정해진 단계를 나타내며, Orchestration은 단계와 책임의 전달을 조정하고, Memory는 마지막 성공 상태를 제공하며, Harness는 검사·기록·중단·승인을 관리한다고 구분한다.
- **Fail:** `09:00 실행`만으로 요약이 정확하고 게시까지 완료됐다고 표시하거나, Memory의 `last_successful_question_id`를 새 질문 내용의 사실 근거로 사용한다.
- **Recover:** `언제 시작했나?`, `어떤 순서인가?`, `무엇을 이어 받았나?`, `누가 통과를 판정하나?`, `외부 행동 전 누가 승인하나?`를 차례로 답하고 카드를 다시 놓는다.
- **Evidence:** 다섯 카드가 놓인 실행 흐름도, 각 개념의 역할 한 문장, 아직 게시되지 않았다는 표시를 남긴다.

### Step 2. 상태와 gate가 있는 Workflow를 안내에 따라 만든다

- **Start:** 반복 자동화 실행 카드의 아홉 칸을 복사한다.
- **Action:** Trigger는 `매일 09:00`, run identity는 날짜 기반 `run_id`, Steps는 `수집 → last_successful_question_id 기준 중복 제거 → 초안 생성 → 필수 항목 검사 → 검토 대기`로 채운다. Memory에는 마지막 성공 ID·갱신 시각·현재 단계만 저장한다. Harness gate는 `질문 ID와 원문 포함`, `확인되지 않은 사실 추가 금지`, `질문별 요약 1개`로 정한다. gate 실패는 초안 단계 1회 재시도 후 STOP, 통과는 사람 승인 대기로 보낸다.
- **Expected:** 단계 의존성, 최소 상태, 검증 기준, 제한된 재시도, 중단, 사람 승인, 완료 증거가 한 명세에 연결된다.
- **Fail:** 전체 대화나 모든 과거 결과를 Memory에 넣거나, gate 실패 시 제한 없이 다시 생성하거나, 초안 생성 직후 전송 완료로 표시한다.
- **Recover:** Memory 항목마다 `다음 실행에 꼭 필요한가?`, gate마다 `관찰 가능한가?`, 재시도마다 `끝나는 조건이 있는가?`를 묻고 불필요하거나 모호한 항목을 고친다.
- **Evidence:** 완성된 실행 카드, 단계별 입력·출력 표, Memory 스키마, PASS·RETRY·STOP·APPROVAL_REQUIRED 네 상태를 남긴다.

### Step 3. 중복 실행과 오래된 상태 실패를 주입해 혼자 복구한다

- **Start:** 같은 `run_id: daily-2026-07-17`이 09:00과 09:01에 두 번 들어왔고, 두 번째 실행이 읽은 Memory의 `updated_at`이 예상보다 오래됐다고 가정한다. 첫 번째 초안에는 질문 ID 102가 누락되어 gate도 실패했다.
- **Action:** 같은 run identity가 이미 `running` 또는 `completed`이면 두 번째 실행을 `duplicate_skipped`로 기록한다. Memory 갱신 시각이 허용 범위를 벗어나면 자동 진행하지 않고 원본 질문 목록을 다시 확인하도록 STOP한다. 첫 번째 실행은 마지막으로 통과한 `중복 제거` 결과를 유지한 채 초안 단계만 한 번 다시 수행하고, gate 전체를 재검사한다. 통과 후에도 사람 승인 전에는 게시·전송하지 않는다.
- **Expected:** 중복 실행은 외부 행동 없이 종료되고, 오래된 상태는 최신 사실처럼 사용되지 않으며, 실패한 단계부터 제한적으로 복구하고, 최종 상태가 실행 기록에 남는다.
- **Fail:** 두 실행을 모두 진행하거나, 오래된 Memory를 그대로 믿거나, 누락된 질문 한 개 때문에 수집부터 무한 반복하거나, gate 통과를 사람 승인으로 간주한다.
- **Recover:** `같은 실행인가?`, `마지막으로 통과한 단계는 어디인가?`, `상태는 언제 어떤 원본으로 갱신됐나?`, `재시도 횟수는 남았나?`, `외부 행동 권한은 누구에게 있나?`에 답해 분기와 종료 상태를 다시 그린다.
- **Evidence:** 정상·중복·오래된 상태·gate 실패의 네 갈래 흐름도, 수정 전후 실행 기록, 재시도 횟수, `duplicate_skipped` 또는 `stopped_stale_state`, 사람 승인 전 `not_published` 표시를 남긴다.

## Quiz와 teach-back

### Q1. Scheduler의 역할을 가장 정확하게 설명한 것은?

A. 정한 조건에서 실행 시작을 요청한다. 실행 결과의 정확성과 중복 방지는 별도 Workflow와 Harness가 확인해야 한다.  
B. 정시에 시작했으므로 결과의 내용도 자동으로 정확하다고 보장한다.  
C. 이전 실행의 모든 정보를 영구히 기억하고 최신 상태로 만든다.  
D. 검증 실패 여부와 관계없이 최종 결과를 외부에 게시한다.

**정답: A**

- A인 이유: Scheduler는 시작 조건을 담당하며 이후 단계, 상태, gate, 권한은 별도로 설계해야 한다.
- B가 아닌 이유: 실행 시각과 결과 품질은 서로 다른 문제다.
- C가 아닌 이유: 상태 저장과 최신성 확인은 Memory와 실행 제어의 책임이다.
- D가 아닌 이유: 게시 같은 외부 행동은 검증과 사람 승인 경계를 통과해야 한다.

### Q2. 이 노드에서 Memory를 가장 안전하게 사용한 예는?

A. 이전 요약의 문장을 출처 확인 없이 오늘의 사실로 재사용한다.  
B. 모델이 기억할 것이라고 가정하고 상태를 기록하지 않는다.  
C. 마지막 성공 ID, 현재 단계, 갱신 시각을 명시적으로 저장하고 다음 실행에서 원본과 최신성을 확인한다.  
D. 관련 여부와 상관없이 모든 대화와 로그를 매 실행에 넣는다.

**정답: C**

- A가 아닌 이유: 이전 상태는 최신 사실이나 원본 근거를 자동으로 대신하지 않는다.
- B가 아닌 이유: 복구하려면 실행 사이에 확인 가능한 상태 기록이 필요하다.
- C인 이유: 다음 실행에 필요한 최소 상태와 갱신 시각을 남기고 원본과 대조할 수 있다.
- D가 아닌 이유: Memory의 양이 많다고 정확성이나 관련성이 보장되지 않으며 필요한 상태를 찾기 어려워질 수 있다.

### Q3. 초안 gate가 실패했을 때 가장 복구 가능한 행동은?

A. 통과한 이전 단계의 결과는 유지하고, 실패 원인과 재시도 한도를 기록한 뒤 초안 단계만 다시 실행해 전체 gate를 재검사한다.  
B. 실패 기록을 지우고 완료로 표시한다.  
C. 원인과 관계없이 전체 Workflow를 무한 반복한다.  
D. Harness가 있으므로 사람이 외부 게시를 승인할 필요가 없다.

**정답: A**

- A인 이유: 마지막 성공 지점과 실패 범위를 사용하면 복구 과정과 결과를 추적할 수 있다.
- B가 아닌 이유: 실패 흔적을 지우면 완료 근거와 같은 문제의 재발 원인을 잃는다.
- C가 아닌 이유: 종료 조건 없는 반복은 비용과 중복 행동을 늘리고 실패를 숨길 수 있다.
- D가 아닌 이유: Harness는 승인 경계를 구현할 수 있지만 사람의 최종 책임을 자동으로 없애지 않는다.

### Teach-back

다음 상황을 보지 않고 60초 안에 설명한다.

> “매일 오전 9시에 AI가 새 질문을 요약하는 작업에서 Workflow, Harness, Memory, Scheduler와 Orchestration은 각각 무엇을 하며, 같은 실행이 두 번 시작되거나 중간 검사가 실패하면 어떻게 복구해야 하는가?”

통과 기준:

- 다섯 개념의 역할을 서로 다르게 설명한다.
- 시작 신호와 완료 증거가 같은 것이 아님을 말한다.
- Memory에 남길 최소 상태와 최신성 확인 행동을 하나 이상 제안한다.
- 중복 실행을 건너뛰는 기준과 실패한 단계로 돌아가는 경로를 설명한다.
- 재시도 한도, STOP, 사람 승인 중 최소 두 가지를 외부 행동 전 gate와 연결한다.

## 출처 범위

| 범위 | 상태 | 사용 원칙 |
|---|---|---|
| Orchestration의 역할·소유권·handoff | `official_verified` | 승인 KB `orchestration`의 공식 OpenAI·Anthropic 문서 검증 범위만 사용한다. 단순 병렬 실행이나 Agent 수 증가와 동일시하지 않는다. |
| Harness의 권한·승인·trace·recovery·run state | `official_verified` | 승인 KB `harness`의 공식 OpenAI·Anthropic 문서 검증 범위를 사용한다. 특정 제품 하나의 필수 구조로 주장하지 않는다. |
| Workflow의 trigger·step·dependency·gate | `official_verified` | 승인 KB `automation-workflow-project`의 GitHub Actions·Anthropic·OpenAI 검증 범위에서 일반 구조만 사용한다. |
| Memory의 최소 상태·갱신 시각·원본 대조 | `educational_scope` | 복구 가능한 실행을 위한 교육용 상태 기록 모델이다. 인간의 기억, 모델의 영구 기억, 특정 메모리 제품의 표준 정의로 주장하지 않는다. |
| Scheduler의 예약 시작과 중복 방지 예시 | `educational_scope` | 예약 trigger는 승인 KB 범위를 사용하되, 날짜 기반 run key와 `duplicate_skipped`는 이번 모의 실습 패턴이다. 모든 Scheduler의 정확한 동작이나 중복 방지 보장을 주장하지 않는다. |
| 모의 질문·실행 기록·상태 값 | `simulation_only` | 실제 사용자 데이터, Scheduler, API, 게시 시스템을 사용하지 않는 학습용 데이터다. |
| 제품별 기능·가격·보안·전달 보장 | `blocked_out_of_scope` | 특정 자동화 제품의 최신 기능, exactly-once 보장, 성능, 가격, 완전한 안전을 주장하지 않는다. 필요 시 별도 Research→Verification을 거친다. |

참조한 저장소 내부 자료:

- `ai-ops/knowledge-base/entries/T10/orchestration.md` (`approved`, 89)
- `ai-ops/knowledge-base/entries/T10/harness.md` (`approved`, 90)
- `ai-ops/knowledge-base/entries/T12/automation-workflow-project.md` (`approved`, 89)
- `ai-ops/knowledge-base/entries/T10/context-engineering.md` (`approved`, 91)

## Interactive 범위

`not_applicable_with_reason`: 이번 산출물은 운영자가 지정한 **단일 Markdown 샘플 노드**다. 개념 카드 배치, 실행 상태 전환, 중복 trigger·오래된 상태·gate 실패 주입은 이후 조작 가능한 인터랙션으로 전환할 수 있지만, 현재 범위에는 React 인터랙션·스토리보드·웹사이트 구현이 포함되지 않는다. 따라서 인터랙티브 완료를 주장하지 않으며 Website Last 원칙을 유지한다.

## Node Quality Gate

| Gate | 판정 | 근거 또는 남은 일 |
|---|---|---|
| 1. Student Question | PASS | D4 도구 연결 뒤 학생이 갖는 반복 실행·상태·실패 복구 질문으로 시작한다. |
| 2. Outcomes evidence-linked | PASS | Observed·Assisted·Independent·Explainable 각각에 흐름도·실행 카드·복구 기록·설명 증거가 있다. |
| 3. Markdown `review_ready` depth | PASS | 개념 지도, 오해, 브리지, 실행 실습, 퀴즈, 출처 범위를 포함한다. |
| 4. Executable Practice | PASS | 세 단계 모두 start·action·expected·fail·recover·evidence를 포함한다. |
| 5. Interactive | N/A WITH REASON | Markdown 샘플 범위이며 인터랙티브·웹 완료를 주장하지 않는다. |
| 6. Node-specific Quiz | PASS | 세 문항에 정답과 모든 선택지의 이유가 있고 teach-back 통과 기준이 있다. |
| 7. Sources scoped | PASS | 승인 KB, 교육용 Memory·Scheduler 패턴, 모의 데이터, 범위 밖 제품 보장을 구분한다. |
| 8. Independent Review | PENDING | 이번 단일 작성 범위에는 독립 리뷰가 포함되지 않았다. |
| 9. Relevant QA | N/A | 코드·라우트 변경이 없고 운영자가 build를 금지했으므로 lint·typecheck·test·build 대상이 아니다. |
| 10. Studio status honest | PASS | `sample_draft`, `website_status: not_started`로 표시한다. |

### Gate 결론

`REVIEW_READY_SAMPLE — NOT WEBSITE COMPLETE`

독립 리뷰 전에는 게시·Website 완료·다음 노드 COMPLETE를 주장하지 않는다. `V2_DOMAIN_OUTLINE.md`의 현재 Domain 5 명칭은 “데이터·지식·RAG”이고 Orchestration·Automation 주제는 Domain 6에 놓여 있지만, 이 문서는 운영자가 이번 요청에서 지정한 **“Domain 5 — Orchestration·Automation: Workflow/Harness/Memory/Scheduler” 샘플 범위**를 따른다. 상위 개요의 도메인 번호·명칭이나 21개 개념·14개 섹션 계약은 변경하지 않으며, 두 구조의 정렬은 별도 운영자 결정으로 남긴다.
