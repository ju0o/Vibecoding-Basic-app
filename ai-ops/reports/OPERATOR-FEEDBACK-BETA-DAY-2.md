# Beta Day 2 운영자 피드백

**기록일**: 2026-08-09  
**Session**: Beta Day 2 Project Log  
**Page**: 01 (codex / project)

---

## 📋 Codex 작업 4회 완료 후 피드백

### 👍 좋았던 점

- Codex + Luna + JuTell 조합으로 4개의 실제 프로젝트 작업을 연속 수행했고, 작업 하나가 끝날 때마다 Hermes가 다음 작업을 자동으로 이어간 점이 좋았음.
- 현재 Gate를 벗어나지 않고 문서 작업만 수행한 점이 안정적이었음.
- 파일 존재 여부와 실제 내용 품질 검증을 구분해서 보고한 점이 좋았음.
- 확인하지 못한 사항이나 실행하지 않은 테스트를 정직하게 구분해서 보고한 점이 좋았음.
- Project Log와 handoff까지 남겨 장시간 작업을 이어갈 수 있는 구조가 실제로 작동하기 시작했음.

### 👎 불편했던 점

- `Gate 준수 = JuTell 효과`, `추측 감소 = JuTell 효과`라고 너무 빨리 단정하고 있음.
- Gate는 프로젝트 STATE/ROADMAP 자체의 영향일 수 있으며 Codex 자체 판단과 JuTell 영향을 아직 분리할 수 없음.
- 4개 작업에 총 222,581 tokens가 사용됐지만 JuTell 때문에 증가한 것인지 프로젝트 Context 때문인지 구분되지 않음.
- 현재 보고는 JuTell의 긍정적인 효과를 찾는 쪽으로 편향될 가능성이 있음.
- Diff 설명, Glossary, 파일 역할 설명 등 JuTell 핵심 Feature가 실제로 언제 발동했는지는 아직 충분히 기록되지 않음.

### 💡 나라면 이렇게 말할 것 같다

- "Codex가 프로젝트 범위를 잘 지켰습니다. 이게 JuTell 때문인지 프로젝트 규칙 때문인지는 아직 모르겠습니다."
- "확인한 것과 확인하지 못한 것을 잘 나눠줬습니다. 이것도 JuTell의 영향인지 Codex 자체 성향인지는 더 확인해봐야 합니다."
- "총 222,581 tokens가 사용됐습니다. 숫자는 크지만 아직 JuTell 때문에 추가된 양이라고 볼 근거는 없습니다."
- "JuTell이 좋다는 결론보다 어떤 행동이 왜 발생했는지를 더 정확하게 보고 싶습니다."

### ⭐ JuTell 개선 아이디어

- Agent 행동 원인을 `Project Rule / Agent / JuTell / 환경 / 복합 / 구분 불가`로 기록.
- Usage는 가능하면 input/output/cached/total과 측정 출처를 함께 기록.
- JuTell Feature별 실제 발동 여부를 기록.
- `JuTell 효과 있음` 판정에는 반드시 구체적 근거를 붙임.
- 이후 작은 동일 작업에서 JuTell ON/OFF 비교 실험 후보 유지.

### 🔎 오늘의 발견

- Hermes → Codex → 검토 → 다음 작업 자동 반복 구조가 실제로 작동하기 시작함.
- JuTell 평가에서 프로젝트 규칙과 Agent 자체 행동을 분리하는 것이 매우 중요함.
- 토큰 데이터는 많이 쌓이지만 아직 원인을 분해하기 어려움.
- 문서 Gate에서는 JuTell 핵심 기능 일부만 검증 가능하며 코드 작업 단계에서 Diff/코드 설명을 본격 검증할 필요가 있음.

---

## 📌 Beta 판정 규칙 추가

앞으로 `JuTell이 잘 작동했다`는 표현을 근거 없이 사용하지 않음.

모든 의미 있는 Agent 행동을 가능하면 다음 중 하나로 분류:

- `PROJECT_RULE`
- `AGENT`
- `JUTELL`
- `ENVIRONMENT`
- `MIXED`
- `UNKNOWN`

### 예시 분류

```text
Gate 준수
→ PROJECT_RULE 가능성이 큼
→ JuTell 영향은 현재 UNKNOWN

Get-Content UTF-8 재시도
→ ENVIRONMENT + AGENT

확인/예상/미확인 구분
→ JUTELL 후보이지만 Agent 자체 행동과 구분 필요
→ 현재 MIXED 또는 UNKNOWN
```

JuTell 효과로 판정하려면 실제 Skill/MCP 규칙과 행동 사이의 근거가 있어야 함.

---

## 📊 Usage 기록 강화

각 Codex 작업마다 가능한 경우 다음을 기록:

- model
- input tokens
- cached input tokens
- output tokens
- total tokens
- elapsed time
- MCP 호출 수
- JuTell Feature 실제 발동 여부
- 재시도 횟수

Codex가 total 하나만 제공하면 그대로 기록하고 의미를 추측하지 않음.

현재 총 222,581 tokens는 `Codex reported total`로 취급.

JuTell Overhead라고 표현하지 않음.

---

## 🎯 현재 작업 우선순위

1. Practice 파일 내용 품질 심화 검토
2. 현재 Gate에서 가능한 다른 문서 품질 검토
3. 다음 Gate 진입에 필요한 문서 근거 정리

코드 실행/구현이 Gate에서 금지되어 있으면 우회하지 않음.

현재 Gate에서 의미 있는 문서 작업이 모두 끝난 경우에만 `GATE WAITING` 상태로 기록.

Human Approval이 필요한 Gate를 Hermes가 임의 승인하지 않음.

---

## 📝 다음 작업부터 적용

보고서에 반드시 포함:

1. **행동 원인 분류** (PROJECT_RULE / AGENT / JUTELL / ENVIRONMENT / MIXED / UNKNOWN)
2. **JuTell Feature 실제 발동 여부**
