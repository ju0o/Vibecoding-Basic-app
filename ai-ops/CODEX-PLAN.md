> **[대체됨 2026-07-08]** 본 문서(v2)는 [ORCHESTRATION-PLAN.md](ORCHESTRATION-PLAN.md)(O-06, v3 — Fable 지휘·Grok/Codex 에이전트 체제)로 대체되었다. 파이프라인·품질 기준은 v3가 승계한다.

# CODEX 마스터 계획서 v2 — 무정지 전체 실행 (O-05.1, 2026-07-05)

> **이 문서는 Codex에게 한 번에 전달하는 무정지(no-stop) 전체 지시서다.** 정보 수집부터 사이트 완성까지 운영자 승인·중간 멈춤 없이 끝까지 실행한다. **유일한 정지점은 §9 (개발 서버 확인 후 배포 승인) 한 곳뿐이다.** 막히는 항목이 나오면 전체를 멈추지 말고 BLOCKED로 기록한 뒤 다음 작업을 계속한다.

---

## 1. 명령의 성격

- 이 계획서 전체가 하나의 명령이다. Phase를 순서대로, 완료 기준을 채우면 자동으로 다음 Phase로 넘어간다
- 운영자에게 질문하지 않는다. 판단이 필요하면 이 문서의 기준으로 스스로 결정하고 결정 기록을 남긴다
- 진행 기록: 매 단위 작업 후 `ai-ops/MASTER_PROGRESS.md`와 `ai-ops/STATE.md` 갱신 + git 커밋 (산출물 없는 보고는 무효)
- 품질 불변 조건 (어떤 경우에도 우회 금지): ① 공식 출처 없는 사실 금지 ② Knowledge Score 80 미달 KB로 강의 금지 (미달 → 재수집 루프, 2회 초과 시 그 항목만 BLOCKED) ③ `npm run verify` 실패 상태로 다음 배치 진행 금지 ④ 배포는 §9 승인 후에만

## 2. 만드는 것 — 바이브코딩 종합 지식 아카이브

**"개요 사이트"가 아니다. 단어 하나하나의 상세한 정의와 깊은 설명, 개념 간 연계성까지 전부 담는 사이트다.**

### 지식 기둥 4개

| 기둥 | 내용 |
|---|---|
| A. 코딩 기반 | 바이브코딩에 필요한 코딩 지식 전부 — IDE·에디터, 터미널·셸, HTML/CSS/JS, TypeScript, React/Next.js, API/DB, 배포. **각 영역의 용어 하나하나를 상세히** |
| B. 바이브코딩 본체 | 용어 기원(Karpathy 2025)부터 현재까지 전체 흐름·맥락. **바이브코딩 등장 이후 나타난 모든 용어의 연대기** (자동완성→챗 코딩→에이전트 시대, 각 시기에 등장한 개념·도구·용어) |
| C. AI 엔지니어링 | MCP, Skills, Agent, SubAgent, Workflow, Orchestration, Context/Prompt/Loop/Harness Engineering, Tool Calling, RAG — 각각의 깊은 정의 + **서로 간의 연계성** (무엇이 무엇 위에 서고, 무엇과 조합되는가) |
| D. 레퍼런스 | **Git/GitHub 전체 명령어 체계** — 명령어마다 문법, 옵션, 사용 예시, 실수와 복구. 같은 방식으로 터미널 기본 명령, 패키지 매니저(npm) 명령 등 |

### 자가 확장 임무 (중요)
운영자가 **언급하지 않았지만 연관된 주제를 스스로 발굴해 포함하라.** 기준: "바이브코딩을 깊이 이해하고 실전에서 쓰는 사람이 결국 만나게 되는 개념인가?" 예: HTTP·JSON·환경변수·정규식·토큰화·임베딩·컨텍스트 캐싱·시맨틱 버저닝·CI/CD 등. 발굴한 주제는 커리큘럼에 근거(왜 연관되는가)와 함께 편입한다.

### 연계성 (사이트의 차별점)
- 모든 KB frontmatter의 prerequisites/successors/related를 실제 학습 연결로 사용
- 개념 관계 다이어그램(SVG) — 특히 C 기둥: MCP↔Tool Calling↔Agent↔SubAgent↔Orchestration 관계 지도
- 강의 본문에서 관련 개념 상호 링크

## 3. 규모 목표 (하한 — 상한 없음)

| 산출물 | 하한 |
|---|---|
| 강의 (V2 Deep Dive, ≥8,000자) | **100강** (기둥 A ~40 / B ~15 / C ~25 / D ~20) |
| 용어 사전 | **300개** — 각 용어 explanation을 상세 서술로 (한 문단이 아니라 정의+동작+맥락+예시) |
| Git 명령어 레퍼런스 | 실무 전 계열 (init/add/commit/branch/merge/rebase/reset/revert/stash/remote/push/pull/fetch/log/diff/tag/cherry-pick 등 + GitHub CLI·PR 흐름) — 명령어마다 예시 포함 |
| 개념 관계 다이어그램 | 기둥별 최소 1 + 강의 필요처 |

## 4. Phase 0 — 플랫폼 구현

[prompts/D-01-format-v2.md](prompts/D-01-format-v2.md) 전체 + 추가:
- V2 8섹션 스키마·파서, `==형광 하이라이트==`, 인용 blockquote 스타일, 퀴즈·체크리스트 제거 ([roadmap/CONTENT-FORMAT-V2.md](roadmap/CONTENT-FORMAT-V2.md))
- SVG 다이어그램 렌더링 (`src/content/lessons/diagrams/{slug}/`, 다크모드 안전)
- **레퍼런스형 강의 지원**: D 기둥(명령어 사전식)은 8섹션이 안 맞음 — 레퍼런스 레이아웃(명령어별 소절: 문법/옵션/예시/주의) 허용하도록 스키마에 lesson type(`deep-dive` | `reference`) 추가
- 용어 사전 상세화 지원: explanation 장문 렌더링 확인
- **읽기 경험 기준 준수**: [roadmap/READING-UX-BRIEF.md](roadmap/READING-UX-BRIEF.md) §1~8 (장문 타이포, 인용 블록 3층 구분, 스크롤 추적 목차, 읽기 진행 바, 레퍼런스형 명령어 인덱스, 모바일·다크모드)
- 완료 기준: `npm run verify` 통과 + UX 브리프의 완료 판정(샘플 2강 자가 점검 기록)

## 5. Phase 1 — 전체 커리큘럼 설계 (승인 없이 확정)

- 기둥 4개 + 자가 확장 주제를 기존 13모듈(MODULE_IDS 불변)에 배치, 규모 목표 §3 충족
- 각 강의: slug/모듈/order/제목/레벨/type/선행/근거 KB id. SK-03 규칙 (선행 그래프 순환 금지, 레벨 곡선)
- 산출: `roadmap/CURRICULUM-MAP.md` 전면 갱신 + `outputs/00-backlog/BACKLOG.md` + 필요한 KB 전체 목록
- 자가 검증 후 바로 Phase 2 진행 (운영자 승인 없음 — 커리큘럼은 §9에서 사이트와 함께 평가받는다)

## 6. Phase 2+3 — KB·강의 물결 반복 (사이트 완성까지)

배치(KB 5~8 → 강의 3~5) 물결로 반복. 각 물결:
1. **KB 수집**: [knowledge-base/_TEMPLATE.md](knowledge-base/_TEMPLATE.md) — 13섹션 + Quote Bank 5+. 공식 출처만([sources/SOURCE-REGISTRY.md](sources/SOURCE-REGISTRY.md)), 전 주장 URL+확인 날짜, 오늘 연 문서만
2. **KB 검증**: [qa/KNOWLEDGE-SCORE.md](qa/KNOWLEDGE-SCORE.md) 게이트 4+기준 7. **검증은 수집과 별도 단계로, 원문 재접속 대조를 기록으로 남긴다** (같은 실행 내 자기 검증임을 인지하고 더 엄격하게 — 대조 기록 없는 PASS 금지). 80 미달 → 재수집 루프(최대 2회) → 그래도 미달이면 해당 항목 BLOCKED 기록 후 다음 항목 진행
3. **강의 생성**: [prompts/P-04-lesson-generation.md](prompts/P-04-lesson-generation.md) — V2 규격 전부 (≥8,000자, 인용 3+ Quote Bank에서만, 하이라이트 상한, KB 외 사실 0건). 레퍼런스형은 명령어별 예시 완결성이 기준. **인용은 [qa/CITATION-POLICY.md](qa/CITATION-POLICY.md) 모드 A** — 길이 상한 없이 이해에 필요한 만큼 인용 가능 (출처 링크+해설은 필수), 단 **긴 인용(2~3문장 초과)은 전부 `reports/citation-review.md`에 자동 기록** (공개 전환 시 운영자의 정리 목록). 이미지 복사 금지·SVG 재작성
4. **다이어그램**: 필요처에 SVG
5. **용어**: 강의에서 파생되는 모든 용어를 상세 서술로 glossary에 (명사형 종결, 중복 대조)
6. **반영 + verify**: src/content 반영 → `npm run verify` → 실패 시 통합 실수 수정 후 재검증 → 통과 시 커밋(src/content 포함 — git show --stat 확인) + 릴리스 기록
- **기존 V1 9강 재생성이 첫 물결** (이미 KB 5건 qa_approved — Quote Bank만 보강 후 사용)
- 물결 순서: V1 재생성 → C 기둥 완성(M10) → B 기둥(역사) → A 기둥 → D 기둥(레퍼런스) → 자가 확장분

## 7. Phase 4 — 사이트 완성 기준 (전부 충족 시 §8로)

- [ ] 커리큘럼의 전 강의 released (BLOCKED 항목은 목록화 — 5% 이내)
- [ ] 규모 목표 §3 하한 충족
- [ ] 용어 사전·검색·진행률·상호 링크 정상 동작
- [ ] `npm run verify` 통과 상태
- [ ] 전 강의 통독 셀프 편집 1회: 용어 표기 통일, 깨진 링크 0, 난이도 곡선, 중복 제거 ([roadmap/FINAL-SITE-STRATEGY.md](roadmap/FINAL-SITE-STRATEGY.md) 9개 기준)

## 8. Phase 5 — 개발 서버 확인 (여기서 처음이자 마지막으로 멈춘다)

1. `npm run dev`로 개발 서버 기동, 주요 페이지(홈/커리큘럼/강의 3종 유형별/용어/검색) 자가 점검 + 점검 기록 작성
2. **STOP — NEXT_ACTION으로 운영자에게 보고**: "개발 서버 http://localhost:3000 에서 확인 요청" + 완성 요약(강의 수/용어 수/BLOCKED 목록/셀프 편집 결과/`reports/citation-review.md` 인용 검토 목록)
3. 운영자 확인 + **Fable 사후 감사([qa/FABLE-AUDIT-PLAN.md](qa/FABLE-AUDIT-PLAN.md) — 표본 재검증, 배포 승인 권고)** 대기. 감사 협조: 요청 시 표본 목록의 원문 대조 기록 제공

## 9. 배포 (운영자 승인 후에만 — **비공개 학습용 배포**)

- 운영자가 배포 환경 지정(Vercel 권장) → 배포 설정 + **비공개 조건 구현 필수** ([qa/CITATION-POLICY.md](qa/CITATION-POLICY.md) §0-1: robots.txt 전체 차단 + 전 페이지 noindex + Basic Auth 등 접근 보호 — 이것 없이 배포 금지) → 배포 → 접근 보호·noindex 동작 확인 → `outputs/06-deployment/` 보고서
- 이 배포는 운영자 개인 학습용이다. **일반 공개는 별도의 나중 단계** (운영자가 citation-review 목록 정리 후 선언 — 정책 §4)
- 운영자가 Reject 시: 지적 항목을 수정 물결로 처리 후 §8 재실행

## 10. 시작 지시 (Codex 세션에 이 한 줄)

```
ai-ops/CODEX-PLAN.md를 읽고 Phase 0부터 Phase 5(개발 서버 확인 보고)까지 멈춤 없이 실행하라.
```
