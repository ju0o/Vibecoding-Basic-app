# Foundation Learning Flow (Arc 1 → early Arc 2)

```yaml
parent: ATLAS-EDUCATION-LAYER.md
authority: subordinate_learning_flow
modifies_core_concepts: false
modifies_14_section_contract: false
status: active
scope_concept_ids:
  - ai
  - machine-learning
  - deep-learning
  - generative-ai
  - llm
```

## Story chain

```text
AI
→ 규칙을 모두 적기 어렵다
→ Machine Learning
→ 사람이 특징을 일일이 고르기 어렵다
→ Deep Learning
→ 분류를 넘어 새로운 샘플이 필요해진다
→ Generative AI
→ 범용 언어 인터페이스가 필요해진다
→ LLM
→ (다음 정본) Prompt Engineering
```

## Why Bridge one-liners (curriculum intent)

| From | To | Bridge intent |
|---|---|---|
| AI | ML | 지능을 “손으로 적은 규칙”만으로 다루기 어렵다 → 데이터에서 배우게 한다 |
| ML | DL | 사람이 정한 특징의 한계 → 표현을 계층적으로 학습한다 |
| DL | GenAI | 인식·분류를 넘어 새로운 출력이 필요해진다 |
| GenAI | LLM | 여러 생성 과제 중 언어가 공통 인터페이스가 된다 |
| LLM | Prompt Eng. | 같은 모델도 지시 설계에 따라 품질이 달라진다 |

## Teaching constraints

- Non-developer first language
- Misconceptions: AI≠automation only; ML≠DL; GenAI≠only LLM; LLM≠truth engine
- Depth via Textbook/KB links, not copy-paste
