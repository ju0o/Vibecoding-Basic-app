# 설계 종료 선언 (Design Freeze)

- 선언일: 2026-07-04
- 선언자: Chief AI Orchestrator (운영자) / 기록: Fable (오케스트레이터)

## 확정된 설계 (이 시점 기준)

| 영역 | 확정 내용 |
|---|---|
| 아키텍처 | Knowledge Base = SSOT (`knowledge-base/`), 모든 콘텐츠는 approved KB에서 파생 |
| 워크플로 | WF-06 마스터 파이프라인 (Loop A 지식 / Loop B 빌드, 각 상한 2회) + WF-02~05 보조 |
| Agent | 13개 (agents/) — 추가 금지 |
| Prompt | P-01~P-08 (운영 순서 = 번호) + O-01·O-02 (오케스트레이터) — 추가 금지, 구판은 archive/ |
| Executor | ~~Trae(수집) /~~ Codex(수집·검증·생성·반영·수정) / Cline(판정·릴리스) / Fable(오케스트레이터+QA) — **2026-07-04 개정 1호 참조** |
| 품질 | Gate 4단계 + Knowledge Score (80점, 필수 게이트 4) |
| 상태 추적 | MASTER_PROGRESS.md 단일 파일 + DASHBOARD.md 요약 |
| 운영 | OPERATION_MANUAL.md |

## Freeze 규칙

1. **새로운 Agent, Workflow, Skill, Prompt를 추가하지 않는다.**
2. 문서 수정은 "운영 중 발견된 문제 → reports/ 기록 → Fable 개선안 → 운영자 승인" 경로로만 (OPERATION_MANUAL 마지막 절).
3. Fable의 역할은 설계자에서 **운영 오케스트레이터**로 전환: 배치 계획, 프롬프트 전달·산출물 확인, 에스컬레이션 판단, O-01/O-02 실행, 문제 발생 시에만 개선안 제안.
4. 예정된 구조 변경(ROADMAP Phase 2의 frontmatter 전환, Phase 3의 스키마 확장)은 freeze 위반이 아니라 **로드맵에 이미 확정된 개발 작업**이다 — 착수 시 운영자 승인만 필요.

## 개정 이력

| # | 날짜 | 내용 | 근거 |
|---|---|---|---|
| 1 | 2026-07-04 | **Trae 완전 제외** — Codex/Cline/Fable 3원 체제로 전환. 작성자≠검증자 원칙을 "Codex 세션 분리 + Fable QA 승인"으로 대체. P-06 통과 보고서 경로 `outputs/06-build-verification/` 확정 | 운영자 정책 변경 (O-02 지시), [2026-07-04-executor-refactor.md](2026-07-04-executor-refactor.md) |
| 2 | 2026-07-05 | **Autopilot 전환 (O-03)** — STATE.md 상태 기계 신설, 파라미터 없는 상시 프롬프트(RUN×3) 도입, P-01~08은 작업 명세 모듈로 강등, 운영자 역할을 "확인 + 승인/반려"로 축소. 품질 게이트는 전부 불변 | 운영자 정책 변경 (O-03 지시), [2026-07-05-o03-automation-refactor.md](2026-07-05-o03-automation-refactor.md) |

## 알려진 이월 항목 (freeze 시점의 미결)

1. 파일럿 강의 from-prompt-to-system: verify 미실행, src/content 3파일 미커밋 → 운영 첫 작업 (Cline P-06)
2. M10 개정: RAG·Tool Calling 2강 추가 → O-01 승인 대기
3. 기존 glossary related의 미등재 용어 참조 → WF-02로 등재 (운영 항목)
4. QA 기계 검사 스크립트(`qa/scripts/validate-content.mjs`) → ROADMAP Phase 1 §6 (운영 항목)
