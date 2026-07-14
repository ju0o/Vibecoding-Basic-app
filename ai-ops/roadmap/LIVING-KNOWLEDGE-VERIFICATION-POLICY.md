# Living Knowledge Verification Policy

```yaml
document: LIVING-KNOWLEDGE-VERIFICATION-POLICY
status: operator_direction_review
date: 2026-07-14
db_auth_cms: forbidden_this_wave
```

---

## 1. 목적

콘텐츠는 “완성된 진리”가 아니라 **출처와 수정 이력으로 성장**한다.

---

## 2. 출처 우선순위

1. 공식 문서 / 스펙 / 벤더 docs  
2. 공식 GitHub · 릴리스 노트  
3. 표준 기구 (W3C, IETF 등)  
4. 공식 블로그 · 공지  
5. 승인 KB  
6. 커뮤니티/X — **후보만** · 단독 확정 금지  

SOURCE-REGISTRY · claim tags 유지.

---

## 3. 검증 상태 (학생 노출 vs 운영)

| 운영 코드 | 학생 화면 (간단) |
|---|---|
| `official_verified` | 공식 문서 기반 |
| `educational_interpretation` | 일부 교육적 해석 포함 |
| `needs_refresh` | 업데이트 필요 |
| `draft` | (가급적 비공개) 초안 |
| `insufficient_source` | 출처 부족 · 비공개 권장 |
| `under_revision` | 수정 검토 중 |

항상 가능하면 **최근 검증일** 표시.

---

## 4. 최신성 · 고위험 필드

검증일 필수에 가까운 항목:

- 제품 가격 · 플랜  
- 지원 모델 목록  
- 설치 방법 · CLI 명령  
- API 지원  
- 배포 정책  

**미검증 가격/기능을 자동 생성하지 않는다.**

---

## 5. 제품 사실 vs 교육 해석

| 유형 | 규칙 |
|---|---|
| 제품 사실 | 공식 문서 + checked_at |
| 교육 해석 | 명시 · 표준/순위 단정 금지 |
| 상대 분류 (Cheap/Standard 등) | educational relative 라벨 |

---

## 6. 수정 제안 (초기 · 무DB)

1. GitHub Issue 템플릿 (`bug_content` / `outdated_fact`)  
2. 정적 페이지 안내 + 이슈 링크  
3. (선택) 외부 폼 URL 환경변수  
4. 이메일 — 운영 정책 시  

인증·회원·CMS **이번 Wave 금지**.

---

## 7. 변경 이력 필드

| 필드 | 설명 |
|---|---|
| what | 무엇 변경 |
| why | 왜 |
| sources | 근거 URL |
| review_status | draft/approved |
| changed_at | 날짜 |
| actor | human/agent role |

저장: `ai-ops/reports/revisions/` 또는 git commit message 규약 (추후).

---

## 8. 공개 전 Gate

- [ ] 출처 우선순위 충족  
- [ ] 고위험 필드 검증일  
- [ ] 교육 해석 표시  
- [ ] Independent Review (해당 시)  
- [ ] Website 연결은 패키지 승인 후  

---

## 9. Verification Center 정보 구조 (페이지 계획)

- 출처 원칙  
- 상태 설명  
- 최근 검증 예시  
- 수정 제안 방법  
- 변경 이력 샘플  
- Day1/Source pack 링크  

구현 Wave 별도.
