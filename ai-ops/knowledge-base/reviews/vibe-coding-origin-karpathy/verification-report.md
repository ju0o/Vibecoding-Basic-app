APPROVED 86

# Knowledge Verification Report: vibe-coding-origin-karpathy

검증일: 2026-07-06  
대상: `ai-ops/knowledge-base/entries/T08/vibe-coding-origin-karpathy.md`  
판정: APPROVED after P-03 Loop A

## 게이트 판정

| Gate | 판정 | 근거 |
|---|---|---|
| G1 출처 확인 불가 주장 0건 | PASS | X 원문 주장은 Wayback snapshot, Merriam-Webster, Business Insider, Times of India, arXiv로 교차 대조했다. |
| G2 필수 섹션 존재 | PASS | 템플릿 필수 섹션과 Quote Bank 존재. |
| G3 frontmatter 완전 | PASS | id, topicGroup, level, sources, updated 포함. P-03 후 status/score는 P-02에서 approved/86으로 갱신. |
| G4 URL 접속 가능 | PASS | X 원 URL은 일반 fetch 제한이 있으나 SOURCE-REGISTRY 특수 출처 규칙에 따라 Wayback snapshot URL과 capture timestamp를 기록했다. MW, Collins, BI, TOI, arXiv, Claude, OpenAI 모두 재접속 확인. |

## 원문 대조 요약

| 주장 | 대조 출처 | verdict |
|---|---|---|
| "vibe coding" 표현은 Karpathy의 X 게시물에서 기원했다 | Wayback snapshot, Merriam-Webster, Collins, Business Insider, arXiv | PASS |
| Collins는 vibe coding을 2025 Word of the Year로 선정했다 | Collins WOTY, Times of India | PASS |
| Merriam-Webster는 vibe coding을 AI에게 원하는 것을 말하고 product를 만들게 하는 방식으로 설명한다 | Merriam-Webster Slang Meaning | PASS |
| Karpathy 게시물에는 code를 잊는 표현, keyboard 사용 감소, error message copy/paste, "not really coding" 맥락이 있다 | Wayback snapshot meta, Business Insider, arXiv | PASS |
| 검증 없는 AI code generation은 human review가 필요하다 | OpenAI Safety best practices | PASS |
| 환각 완화에는 uncertainty, direct quotes, citations가 유용하다 | Claude Reduce hallucinations | PASS |

## Source Registry 판정

- Merriam-Webster, Collins: 2026-07-05 운영자 승인 "특수 출처"에 포함, 용어 역사 KB 전용으로 사용 가능.
- X 원게시물: 역사적 1차 사료로만 사용 가능. 일반 fetch 차단 문제는 Wayback snapshot `20250206155957`로 대조했고, Business Insider/Times of India 2차 보도를 병기했다.
- arXiv: registry 본표에는 없지만 원문 인용과 연구 맥락 보조로만 사용했으며, 핵심 기원 판정은 특수 출처+주요 2차 보도에 의존한다.

## 점수표

| 기준 | 점수 | 근거 |
|---|---:|---|
| S1 공식 출처 | 16/20 | 특수 출처 승인 조건 충족. 다만 역사 주제 특성상 사전/언론/아카이브 비중이 높아 일반 벤더 문서 대비 감점. |
| S2 최신성 | 15/15 | P-03 후 핵심 출처는 2026-07-06 재확인. |
| S3 교육 적합성 | 13/15 | 용어 기원과 검증 필요성을 함께 설명한다. arXiv/언론 근거가 많아 입문 난이도 조절 여지 있음. |
| S4 예시 품질 | 8/10 | VibeCodingSession 타입과 위험 경계 예시가 구체적. |
| S5 AI 시대 연관성 | 10/10 | 바이브코딩을 검증·리뷰·프로토타입 경계와 직접 연결한다. |
| S6 실무 활용성 | 12/15 | 실수 4개와 위험 경계가 실무적이다. |
| S7 용어 일관성 | 12/15 | 관련 id는 실존 또는 이번 배치. successor `ai-era-timeline`은 예약 id라 추후 KB 등록 필요. |

총점: 86 / 100

## 승인 조건

- status를 `approved`로 변경 가능.
- score를 `86`으로 기록.
- 검증 필요 잔여: 공개 전환 시 X/언론 인용 길이와 quote bank 표현은 citation-review 대상 후보.

