# Research Queue

```yaml
document: RESEARCH_QUEUE
rule: never_leave_unknown
ssot: this_file
date: 2026-07-14
```

모르는 사실은 본문에 `UNKNOWN`으로 끝내지 않는다. 여기 등록한다.

---

## 상태

`queued` → `researching` → `verified` | `blocked` → `applied`

---

## Open items

| id | topic | why_needed | status | owner | sources | notes |
|---|---|---|---|---|---|---|
| RQ-001 | package.json `scripts` / `npm run` | 후보 A/B | queued | researcher | docs.npmjs.com | Day1에 partial 검증 있음 · 노드 시 재확인 |
| RQ-002 | Node LTS 학습자 안내 (버전 숫자 비고정) | 후보 B | queued | researcher | nodejs.org | checked_at 갱신 |
| RQ-003 | zero-dependency `npm install` 교육 문장 | Day1·B | queued | content | node learn npm | 과장 금지 |
| RQ-004 | IDE vs editor vs AI IDE 교육 정의 | 후보 C | queued | researcher | VS Code docs + 해석 라벨 | 제품 필수화 금지 |
| RQ-005 | “AI 생성 → 파일” 저장/적용 구분 | A/C | queued | content | 교육 해석 | 마법 표현 금지 |
| RQ-006 | Day2 후보 공식 출처 묶음 (픽 후) | 선택 후 | queued | researcher | — | PICK 후 활성화 |

---

## Closed

| id | topic | status | applied_in |
|---|---|---|---|
| — | — | — | — |

---

## 사용 규칙

1. 교육 초안 중 출처 불명이면 **즉시 행 추가**  
2. `blocked`면 학생 본문에 확정형 금지 · 운영자 질문  
3. `verified`만 Outcome·Website 확정 문장에 사용  
4. X/커뮤니티는 후보 열 `notes`만  
