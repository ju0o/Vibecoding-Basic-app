# Living Curriculum Production Roadmap

```yaml
document: LIVING-CURRICULUM-PRODUCTION-ROADMAP
status: operator_proposal_not_final
date: 2026-07-14
operator_approves_order: true
no_day2_content_this_wave: true
```

---

## 1. 원칙

- 운영자가 순서 **최종 승인**  
- 강의 수 미확정 · Living  
- 각 Node: Research→…→Animation→Quiz→Website  
- Day1 = 기준 구현 · **삭제·재작성 금지**  

---

## 2. Phase 제안 (콘텐츠 생산)

### Phase 1 — Start (Track A)

| 후보 Node | 비고 |
|---|---|
| Day1 첫 성공 | **완료 기준 구현** |
| 개발 환경 점검 | VS Code/Node 심화 |
| 프로젝트 실행 습관 | sample 재사용 |
| 오류를 AI에게 전달 | Day1 O13 확장 |

### Phase 2 — Understand the Project (Track B)

파일 구조 · package.json · src · HTML/CSS/JS · FE/BE/API/DB 감각

### Phase 3 — Work with AI (Track C)

Prompt · Context · AI IDE · CLI Agent · 오류 수정 · 기능 분해

### Phase 4 — Build and Ship (Track E 선두)

Git · GitHub · Deploy · env · 보안 기초 · DB 연결 감각

### Phase 5 — AI Tools Library 채움

Claude Code · Codex · Grok · Cursor · Cline · Ollama 등  
**공식 검증 후** Tool 페이지

### Phase 6 — AI Engineering (Atlas 연동)

Agent · SubAgent · Workflow · MCP · Skill · Orchestration · Evaluation · Model Routing · Harness  
기존 Atlas/MR **재사용**

### Phase 7 — Production Projects (Track D 심화)

실전 프로젝트 · 운영 · QA · 비용 · 업데이트

---

## 3. 병렬 가능 작업

| 트랙 | 내용 |
|---|---|
| Platform T1–T6 | start/learn/lab/verification 스켈레톤 |
| Tool research | 출처 팩만 (페이지 소수) |
| Atlas reverse-link map | 메타 CSV |
| Studio tabs | 설계 후 소형 UI |

---

## 4. AI 생산 순서 (노드 단위)

```text
explorer 범위
→ source-researcher
→ claim-verification
→ curriculum-architect (매핑)
→ content-writer (MD)
→ student word export
→ practice + sample
→ interaction-designer → implementer (animation)
→ assessment
→ independent-reviewer
→ website wire (last)
→ verification update
```

강사 DOCX: optional skip.

---

## 5. 성공 지표 (운영)

- Path 완주 가능 여부 (Outcome)  
- Day1→다음 노드 이탈률 (정성)  
- needs_update 티켓 처리  
- 미검증 Tool 페이지 0  

---

## 6. 이번 Wave에서 하지 않음

- Day2 MD/페이지 생성  
- Track 전체 강의 확정  
- Tool/Tech 대량 생성  
