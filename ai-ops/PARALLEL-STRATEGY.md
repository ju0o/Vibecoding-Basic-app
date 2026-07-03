# 병렬 작업 전략

여러 Executor가 동시에 작업해도 충돌하지 않기 위한 규칙. 원리는 하나다:
**"쓰는 파일이 겹치지 않으면 병렬 가능, 겹치면 순차."**

## 충돌 지도 (이 프로젝트의 공유 자원)

| 자원 | 쓰기 주체 | 규칙 |
|---|---|---|
| `src/content/curriculum.ts` | Site Integration만 | 단일 세션 순차 — **최대 충돌 지점** |
| `src/content/glossary.ts` | Site Integration만 | 단일 세션 순차 |
| `src/content/lessons/markdown/{slug}.md` | Site Integration만 | slug별 독립이라 이론상 병렬 가능하지만, 통합은 어차피 한 세션이므로 순차 |
| `ai-ops/outputs/00-backlog/BACKLOG.md` | Curriculum Agent만 | 단일 작성자 |
| `ai-ops/outputs/{단계}/{slug}/…` | 해당 slug 담당 Agent | slug가 다르면 완전 독립 → 무제한 병렬 |
| `ai-ops/outputs/PIPELINE.md` | 모든 Agent (행 단위) | 각자 자기 slug 행만 수정. 충돌 잦아지면 slug별 status 파일로 전환 (Phase 2) |

## 병렬 가능 (동시 실행 OK)

1. **다른 slug 간 모든 Production/Verification 작업** — 리서치 10건 동시, 집필 10건 동시 가능
2. **같은 slug 안의 집필 3작업** — lesson.md / quiz.md / terms.md는 서로 다른 파일
3. **같은 slug 안의 검증 2작업** — fact-check-report.md / edu-review-report.md는 서로 다른 파일
4. **강의 파이프라인과 용어 배치(WF-02)** — 단, 최종 glossary 반영은 같은 통합 큐에 줄 세움
5. **파이프라인 단계가 다른 slug들** — A는 리서치, B는 집필, C는 검증을 동시에

## 순차 필수 (병렬 금지)

1. **Site Integration** — 모든 slug를 한 세션에서 순서대로. 두 세션이 동시에 curriculum.ts를 만지는 순간 배열 충돌
2. **Release** — 항상 파이프라인 마지막, 단독 실행 (verify 중 파일 변경 금지)
3. **BACKLOG.md 수정** — Curriculum Agent 단독
4. **같은 카테고리의 용어 배치** — 두 Executor에 나누면 중복·상호참조 붕괴 (WF-02 §2)
5. **QA의 용어 중복 검사** — 배치 전체를 한 번에 봐야 하므로 배치당 1회

## 의존성 체인 (선후 관계)

```
브리프 ──┬→ lesson.md ──┬→ fact-check ──┐
         ├→ quiz.md ────┤→ edu-review ──┼→ QA 게이트 → 통합 → 릴리스
         └→ terms.md ───┘               ┘
```
- 집필 3작업은 브리프가 있어야 시작 (quiz/terms는 lesson 완성을 기다리지 않아도 됨 — 브리프 기반 시작 가능)
- 검증 2작업은 집필 3작업 완료 후
- QA는 검증 2작업 모두 PASS 후
- 통합은 QA의 final/ 생성 후

## 배치 운영 권장 패턴

- **배치 크기**: 강의 3~7개. 크면 FIX 루프가 몰릴 때 관리 불능, 작으면 통합·릴리스 오버헤드 낭비
- **통합 창(Integration Window)**: 하루 1회 정해진 시간에만 Site Integration 실행. 그 외 시간에 src/content는 읽기 전용
- **파이프라이닝**: 배치 N이 검증 중일 때 배치 N+1의 리서치를 시작 — 단계가 다르면 자원이 안 겹친다

## 충돌 발생 시 복구

- git 사용 시: 통합 직전 상태로 revert 후 단일 세션 재통합
- git 미사용 시(현재): 통합 전 `src/content/` 백업 폴더 복사를 Site Integration 절차에 포함 → **Phase 1에서 git 도입을 최우선 권장** (ROADMAP 참조)
