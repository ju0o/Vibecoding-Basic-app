# 콘텐츠 형식 V2 — "Deep Dive" 규격 (O-04, 2026-07-05)

운영자 결정: 학습 장치(퀴즈·체크리스트·설명 연습) 전부 제거 / 단일 심층 트랙 / V1 콘텐츠 전량 재생성.
목적: "얕게 훑는 교재"가 아니라 **전문가처럼 깊게 이해하는 읽기 경험** — 공식 문서 원문을 인용으로 직접 만나되, 하이라이트·구조로 가독성을 높인다.

## 1. 강의 구조 (V1 13섹션 폐지 → V2 뼈대 7개)

| # | 섹션 (id) | 내용 | 필수 |
|---|---|---|---|
| 1 | 한 줄 정의 (definition) | 명사형 한 줄 + 3~4문장 확장 | ✅ |
| 2 | 왜 존재하는가 (why) | 이것이 없던 시절의 고통 → 등장 배경 (역사 통합) | ✅ |
| 3 | 작동 원리 (how-it-works) | **가장 긴 섹션.** 단계별 내부 동작, 구성요소 간 상호작용, 데이터 흐름. "무엇"이 아니라 "어떻게·왜 그렇게" | ✅ |
| 4 | 스펙과 세부 (spec) | 버전, 파라미터, 프로토콜 세부, 엣지 케이스 — 전문가가 아는 디테일 | ✅ |
| 5 | 원문으로 읽기 (primary-sources) | 공식 문서 핵심 구절 인용 3개 이상 + 각 인용의 해설 (아래 인용 규격) | ✅ |
| 6 | 실전에서 (in-practice) | 실무 패턴 2~3개, 실행 가능한 코드, 실패 사례와 디버깅 관점 | ✅ |
| 7 | 한계와 트레이드오프 (limits) | 안 되는 것, 흔한 오해와 교정, 대안과의 비교 | ✅ |
| 8 | 더 읽기 (further-reading) | 출처 전체 + 다음에 읽을 문서 순서 제안 | ✅ |

- 섹션 내부 소제목(###)은 자유 — 개념이 요구하는 만큼 세분화
- **분량: 하한 8,000자, 상한 없음.** 늘리기 위한 수사 금지 — 깊이는 세부와 인용에서 나온다
- 제거: 퀴즈, 체크리스트, 설명 연습, "쉬운 비유" 의무 (비유는 작동 원리 설명에 도움이 될 때만 자유롭게)

## 2. 인용 규격 (Quote — V2의 핵심 장치)

```markdown
> "The model's ability to accurately recall information from that context decreases
> as the number of tokens in the context window increases."
>
> — 컨텍스트 윈도의 토큰이 늘수록, 그 안의 정보를 정확히 회상하는 능력은 떨어진다.
> [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
```

규칙: ① 원어 원문 그대로 (수정 금지) ② 한국어 번역 병기 ③ 출처 링크 필수 ④ 인용 직후 반드시 해설 문단 (왜 이 문장이 중요한가) ⑤ 강의당 3개 이상, 전부 KB의 Quote Bank에서

## 3. 하이라이트 규격 (형광마크)

- 문법: `==핵심 문장==` → `<mark>` 렌더링 (형광 배경, 다크모드 대응)
- 남용 방지: **문단당 최대 1개, 섹션당 최대 3개.** 문장 전체가 아니라 핵심 구절만
- 용도: "이 문단에서 하나만 기억한다면 이것" — 스캔 시 하이라이트만 읽어도 골격이 잡히게

## 4. 데이터 모델 변경 (개발 작업 D-01 — Codex)

### schema.ts
- `LESSON_SECTION_DEFINITIONS` → V2 8개 섹션으로 교체
- `LessonMeta`에서 `checklist`, `exercise` 필드 **제거** (LessonExercise·LessonQuizQuestion·ExplanationPrompt 타입 제거)
- `minutes` → 유지하되 의미 변경 없음 (심층 기준 재추정)

### 파서·UI
- `lib/lesson-content.ts`: V2 섹션 검증으로 교체, `==...==` → `<mark>` 변환 지원
- `LessonMarkdown`: mark 스타일 (형광 배경 CSS 변수, 다크모드), blockquote 인용 스타일 강화 (좌측 보더 + 출처 줄 구분)
- 제거: `LessonChecklist`, `LessonPracticePanel` (퀴즈·설명연습 UI) 및 강의 페이지에서의 사용처
- 유지: 진행률(완료 버튼), 북마크, 검색, 사이드바 목차 (V2 섹션 기준)
- `curriculum.ts`: 기존 10개 LESSON_META에서 checklist/exercise 삭제
- 테스트 갱신 + `npm run verify` 통과

## 5. KB 강화 — Quote Bank (V2의 원료)

- `_TEMPLATE.md`에 **`## Quote Bank`** 섹션 추가 (14번째): 인용 후보 원문 구절 5개 이상 — 원어 그대로 + 출처 URL + 한 줄 맥락
- 기존 qa_approved KB 5건: Quote Bank 보강 필요 (P-03 변형 실행 → P-02 경량 재검증: Quote Bank의 원문 대조만)
- KNOWLEDGE-SCORE: S4(예시 품질) 평가에 "Quote Bank 5개 이상, 원문 정확성" 포함

## 6. 롤아웃 (파이프라인 정지 중 — 이 순서대로만)

| 단계 | 작업 | Executor |
|---|---|---|
| R1 | D-01 개발 (스키마·파서·UI·데이터 마이그레이션) + verify | Codex (prompts/D-01-format-v2.md) |
| R2 | KB 5건 Quote Bank 보강 → 경량 재검증 → Fable 승인 | Codex 수집→검증 세션 |
| R3 | **9강 전량 V2 재생성** (released 5강 포함 — P-04 V2) → P-05 → P-06 → P-08 | Codex → Cline |
| R4 | 파이프라인 재개 (이후 신규는 V2로만), V1 규격 문서 superseded 처리 | Fable |

주의: R1 전까지 P-04~P-08 실행 금지 (V1 규격으로 생산 금지). R3 완료 전 배포 금지 (얕은 버전을 사용자에게 노출하지 않음).

## 7. QA 게이트 V2 (Gate 3 대체 체크리스트)

- [ ] V2 8섹션 전부 존재 (schema 일치)
- [ ] 분량 ≥ 8,000자
- [ ] 인용 3개 이상 — 각각 원어+번역+링크+해설, KB Quote Bank와 대조
- [ ] 하이라이트 규칙 준수 (문단 1·섹션 3 상한)
- [ ] 모든 사실이 KB로 역추적 가능 (불변)
- [ ] 코드 예시 실행 가능 (불변)
- [ ] slug·meta 규격 (checklist/exercise 없음)
