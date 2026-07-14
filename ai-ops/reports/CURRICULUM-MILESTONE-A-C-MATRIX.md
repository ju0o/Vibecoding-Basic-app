# Curriculum Milestone Matrix — Track A–C (A01–C10)

```yaml
gate: PAUSE_TRACK_D
status: audit_with_remediation
date: 2026-07-14
nodes: 25
method: file+code inspection (not status-table trust)
```

## Legend / 상태

| EN | KO |
|---|---|
| complete | 완료 |
| partial | 일부 완료 |
| missing | 없음 |
| needs_revision | 수정 필요 |
| not_applicable_with_reason | 해당 없음(사유) |
| blocked_by_source | 출처 대기 |

**Word policy (operator 2026-07-14):** Markdown SSOT · Website viewer 필수 · Word는 다운로드 가치 있을 때만. 얇은 DOCX 양산 금지.

## Summary counts (post-initial audit, pre-full remediation pass)

| Verdict | Count | Notes |
|---|---:|---|
| Strong package (near complete) | 3 | A01–A03 |
| Partial usable | 12 | A04–A06, B05–B09, C01–C04 |
| Thin / needs_revision | 10 | B01–B04, C05–C10 |
| Full contract complete | **0** | No node meets all 19 fields at complete |

---

## Track A

| Node | Title | Q | MD | Word | Practice | Sample | Interactive | Quiz | Outcome | Sources | Verified | Review | Web | Bridge | Verdict KO | Required Fix |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A01 | Day1 첫 성공 | complete | complete | complete (docx) | complete | complete day1 | interactive_learning | complete React | partial levels | partial official | 2026-07-14 | prior approve | complete | complete | **partial / 일부** | Outcome 수준(Observed…) 명시; IR archive |
| A02 | 파일 구조 | complete | complete | complete | complete | reuse day1 | interactive_learning | complete React | partial | partial | 2026-07-14 | prior | complete | complete | **partial** | Source footnotes in MD |
| A03 | Node·npm | complete | complete | complete | complete | reuse | interactive_learning | complete React | partial | partial+verified pack | 2026-07-14 | prior | complete | complete | **partial** | LTS freshness note OK |
| A04 | AI·LLM·IDE | complete | partial thin~ok | missing | partial page-only | n/a reuse | interactive_learning | partial page list | partial checklist | educational | 2026-07-14 | light | complete | complete | **needs_revision** | Word=workbook; full practice file; quiz reasons |
| A05 | 터미널 | complete | partial | missing | partial | n/a | interactive_learning | partial | partial | educational | 2026-07-14 | light | complete | complete | **needs_revision** | Practice start/fail/recover |
| A06 | 오류→AI | complete | partial | missing | partial | n/a | interactive_learning | partial | partial | educational | 2026-07-14 | light | complete | complete | **needs_revision** | Quiz teach-back |

## Track B

| Node | Title | Q | MD | Word | Practice | Sample | Interactive | Quiz | Outcome | Sources | Verified | Review | Web | Bridge | Verdict | Required Fix |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| B01 | 웹 표시 원리 | partial | **thin** | missing | missing/stub | reuse | interactive_but_shallow (shared layers) | missing node | partial list | educational | date thin | light | complete | partial | **needs_revision** | Deepen MD; practice; node quiz |
| B02 | HTML | partial | **thin** | missing | page one-liner | reuse | **duplicate_pattern** WebLayers | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Deepen; distinct task |
| B03 | CSS | partial | **thin** | missing | page one-liner | reuse | duplicate_pattern | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Deepen |
| B04 | JS | partial | **thin** | missing | page one-liner | reuse | duplicate_pattern | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Deepen; distinguish Node vs browser JS |
| B05 | 파일 연결 | complete | partial ok | missing | **stub** 3 lines | reuse | interactive_learning | page mini | partial | educational | 2026-07-14 | light | complete | complete | **needs_revision** | Guided practice template |
| B06 | Frontend | complete | partial | missing | page list | reuse | interactive_learning | page mini | partial | educational boundary | 2026-07-14 | light | complete | complete | **needs_revision** | Practice evidence |
| B07 | Backend | complete | partial | missing | page list | server.js | interactive_learning (shared stack) | page mini | partial | educational | 2026-07-14 | light | complete | complete | **needs_revision** | Clarify package.json role |
| B08 | API | complete | partial | missing | page list | educational | interactive_learning | page mini | partial | educational HTTP | 2026-07-14 | light | complete | complete | **needs_revision** | Official HTTP ref link |
| B09 | Database | complete | partial | missing | page list | n/a reason | interactive_learning | page mini | partial | educational + product disclaimer | 2026-07-14 | light | complete | complete | **needs_revision** | pricing blocked OK |

## Track C

| Node | Title | Q | MD | Word | Practice | Sample | Interactive | Quiz | Outcome | Sources | Verified | Review | Web | Bridge | Verdict | Required Fix |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| C01 | 좋은 요청 | complete | partial | missing | page list | n/a | interactive_learning | page mini | partial | educational pattern | 2026-07-14 | light | complete | complete | **needs_revision** | Full practice + quiz reasons |
| C02 | Prompt | complete | partial | missing | page list | n/a | interactive_learning | page mini | partial | **must label educational** | 2026-07-14 | light | complete | complete | **needs_revision** | Anti-standard disclaimer strong |
| C03 | Context | complete | partial | missing | page list | n/a | interactive_learning | page mini | partial | educational | 2026-07-14 | light | complete | complete | **needs_revision** | |
| C04 | 관련 파일 | complete | partial | missing | page list | day1 names | interactive_learning (shared picker) | page mini | partial | educational | 2026-07-14 | light | complete | complete | **needs_revision** | Distinct from C03 on page |
| C05 | 작업 분해 | partial | **thin** | missing | missing | n/a | interactive_learning | missing | partial 2 checks | educational | thin | light | complete | partial | **needs_revision** | Deepen MD+practice+quiz |
| C06 | 수정 Loop | partial | **thin** | missing | missing | n/a | interactive_learning | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Deepen |
| C07 | QA | partial | **thin** | missing | missing | n/a | interactive_learning | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Deepen |
| C08 | Agent | partial | **thin** | missing | missing | n/a | interactive_but_shallow / shared mode switch | missing | partial | educational **not product** | thin | light | complete | partial | **needs_revision** | Deepen + overclaim check |
| C09 | SubAgent | partial | **thin** | missing | missing | n/a | **duplicate_pattern** same as C08 | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Node-specific scenario |
| C10 | Workflow | partial | **thin** | missing | missing | n/a | **duplicate_pattern** same | missing | partial | educational | thin | light | complete | partial | **needs_revision** | Deepen + HITL |

---

## Student Word classification (no delete)

| Node set | Classification | KO |
|---|---|---|
| A01–A03 existing docx | standalone_download_worthy | 개별 다운로드 가치 |
| A04–A06 | merge_into_module_workbook | Track A 워크북 권장 |
| B01–B09 | merge_into_module_workbook | 웹 원리 워크북 |
| C01–C10 | merge_into_module_workbook | AI 협업 워크북 |
| Mechanical thin docx for all 25 | **do not mass-produce** | 양산 금지 |

---

## Quality contract honesty

Previous NODE_PRODUCTION_STATUS marked all columns ◎ — **overstated**. This matrix supersedes that optimism until remediation closes gaps.
