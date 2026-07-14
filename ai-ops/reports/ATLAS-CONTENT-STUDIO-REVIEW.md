# Atlas Education Studio — Operator Content Review Package

| Field | Value |
|---|---|
| Date | 2026-07-14 |
| Verdict | **READY_FOR_OPERATOR_CONTENT_REVIEW** |
| Push | not performed |
| Deploy | not performed |

---

## 1. Where education content lives

| Type | Path |
|---|---|
| Concept metadata | `src/content/atlas.ts` |
| Chapter bodies (14 sections) | `src/content/atlas/chapters/{id}.md` |
| Completeness rules | `src/lib/atlas/completeness.ts` |
| Status helpers | `src/lib/atlas/content-status.ts` |
| Manifest (derived index) | `src/lib/atlas/content-manifest.ts` |
| Model Routing | `src/content/model-routing/**` |
| Textbook | lessons + curriculum |
| Wiki | `src/content/glossary.ts` |
| KB | `ai-ops/knowledge-base/entries/**` |

Studio does **not** duplicate SSOT bodies.

---

## 2. How operators see it

```text
npm run dev
```

| URL | What to check |
|---|---|
| `/atlas/studio` | Summary counts, filters, 21 concept cards, next work, workflow note |
| `/atlas/studio/concepts/ai` | 14-section table, completeness breakdown, rendered/source preview, recommendations |
| `/atlas/studio/concepts/llm` | Partial sections visible as status text |
| `/atlas/studio/concepts/orchestration` | Subordinate Model Routing link + assets |
| `/atlas/studio/inventory` | Type ↔ relative path ↔ used-by routes |
| `/atlas` | Student roadmap; dev-only Studio link |
| `/atlas/concepts/ai` | Student page; dev-only “Open in Education Studio” |
| `/model-routing` · `/model-routing/simulator` | MR product regression |

Production builds hide Studio entry links (`NODE_ENV !== development`), but Studio routes still exist as static pages with `robots: noindex` — do not market as public CMS.

---

## 3. Expected completeness snapshot (rules)

- Sections 1–4 typically **complete** (shell body)
- Sections 5–14 typically **partial** (`<!-- partial -->`)
- Overall concept status mostly **partial**
- Quiz checkpoint UI counts as present
- Interactive: orchestration (+ related) flagged; many concepts missing dedicated assets

Exact numbers are computed live in Studio (not hard-coded here).

---

## 4. Workflow (visible in Studio)

```text
Source Research → Claim Verification → Curriculum → Content → Interaction → QA → Student Page
```

Per-concept stage is **inferred** from content/source status.

---

## 5. Next content priorities (typical)

1. Fill §5–§8 (사례·기업·서비스·프로젝트 사용) with verified sources (P-01/P-02)
2. Connect more interactive StepPlayer presets per arc
3. Expand company/service only with official KB

Recommended agents: `atlas-source-researcher`, `atlas-content-writer`, `atlas-interaction-designer`

---

## 6. Known limits

- No in-browser CMS editor
- No Agent execution log board
- Chapter shells still educational minimum
- Completeness weights are explicit constants (testable), not ML scores

---

## 7. QA

| Check | Result |
|---|---|
| lint / typecheck / unit tests / build | via `npm run verify` |
| 21 concepts freeze | scripts + app data |
| 14 sections | parser + studio table |
| Manifest/completeness tests | `src/lib/atlas/completeness.test.ts` |
| Model Routing regression | existing engine tests |

---

## 8. Final verdict

```text
READY_FOR_OPERATOR_CONTENT_REVIEW
```
