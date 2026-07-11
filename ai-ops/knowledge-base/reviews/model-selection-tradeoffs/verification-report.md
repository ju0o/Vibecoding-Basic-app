APPROVED 91

# Verification Report — model-selection-tradeoffs

- 검증일: 2026-07-11
- 대상 KB: `ai-ops/knowledge-base/entries/T08/model-selection-tradeoffs.md`
- 대상 상태: `approved`
- 판정: APPROVED
- Knowledge Score: 91

## 범위

M4 Content Refresh Sweep에서 `CONTENT-REFRESH-2026H2.md`의 R2 후보를 P-01 방식으로 승격한 KB를 검증했다. R1 Claude 5 모델 패밀리는 독립 KB로 만들지 않고, 모델 선택의 최신 사례와 Quote Bank 근거로 흡수했다.

## Gate 판정

| Gate | 결과 | 메모 |
|---|---|---|
| G1 Citation Rule | PASS | 모든 주요 주장에 공식 문서 URL과 확인일을 병기했다. |
| G2 공식 출처 비중 | PASS | OpenAI API Docs와 Claude Platform Docs만 사용했다. |
| G3 SOURCE-REGISTRY 적합성 | PASS | OpenAI, Anthropic/Claude 공식 문서 범위에 속한다. |
| G4 Quote Bank | PASS | Quote Bank 8개가 공개 공식 문서에서 확인 가능한 짧은 직접 인용으로 구성됐다. |

## 원문 대조

| 출처 | 확인 결과 | KB 반영 |
|---|---|---|
| OpenAI API Docs — Model selection | accuracy, latency, cost 균형과 accuracy 우선 최적화, evaluation dataset 항목 확인 | 정의, 해결하려는 문제, 핵심 개념, Quote Bank |
| OpenAI API Docs — Models | GPT-5.6 Sol/Terra/Luna의 역할, context, tools, 가격 개요 확인 | 역사, 핵심 개념, 실무 활용 |
| OpenAI API Docs — Pricing | input/output MTok 단가와 batch/flex/priority 관련 가격 단위 확인 | 가격 단위, 실무 비용 계산 |
| Claude Platform Docs — Choosing the right model | capabilities, speed, cost, effort 기준과 실제 prompt/data 테스트 권고 확인 | 정의, 해결하려는 문제, effort, FAQ |
| Claude Platform Docs — Models overview | Fable/Opus/Sonnet/Haiku의 capability, price, latency, context 비교 확인 | 역사, 모델 티어, 컨텍스트와 출력 한도 |
| Claude Platform Docs — Pricing | MTok, cache write/hit, batch 가격 단위 확인 | 가격 단위, context-caching 관련 기술 |
| Claude Platform Docs — Introducing Claude Fable 5 and Claude Mythos 5 | Fable 5와 Mythos 5의 specs/pricing 공유 및 Mythos 제한 접근성 확인 | R1 흡수, 접근성·정책 제약 |

## Knowledge Score

| 항목 | 점수 | 근거 |
|---|---:|---|
| S1 정의·범위 명확성 | 20 / 20 | 모델 선택을 정확도·비용·지연의 운영 의사결정으로 좁혔다. |
| S2 역사·배경 | 15 / 15 | 단일 대표 모델 사용에서 용도별 모델 티어로 바뀐 맥락을 공식 모델 문서로 설명했다. |
| S3 문제 해결성 | 14 / 15 | 비용 과다와 정확도 부족 문제를 평가셋·실데이터 테스트와 연결했다. |
| S4 핵심 원리 | 9 / 10 | 정확도 우선, 모델 티어, 가격 단위, effort, context/output 한도를 분리했다. |
| S5 실무 활용성 | 10 / 10 | 작업별 모델 표, 평가셋, 비용 계산, agent routing 예시를 포함했다. |
| S6 출처 품질 | 13 / 15 | 공식 문서만 사용했다. 다만 제품·가격 문서 특성상 주기적 재확인이 필요하다. |
| S7 커리큘럼 연결성 | 10 / 15 | 선행 KB와 ai-basics lesson 55에 연결되나 후행 `ai-era-timeline`은 아직 KB 미승격이다. |
| 합계 | 91 / 100 | APPROVED |

## 수정 필요 사항

- 필수 수정 없음.
- 후속 강의 생성 시 가격 숫자는 고정 지식처럼 쓰지 말고 확인일과 공식 pricing URL을 함께 제시해야 한다.
- `ai-era-timeline`이 승격되면 successors 연결을 재확인한다.

## 결론

`model-selection-tradeoffs`는 공식 출처 기반성, Citation Rule, Quote Bank, 커리큘럼 연결성 기준을 충족한다. M4 후보 R2는 KB 승격 완료로 처리 가능하다.
