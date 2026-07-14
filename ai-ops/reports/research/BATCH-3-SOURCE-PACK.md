# Batch 3 Source Pack — B05–B09

```yaml
verified_at: 2026-07-14
scope: educational_concepts
claim_style: educational_model (not product ranking)
```

## Official / standard anchors (concepts)

| Claim area | Educational claim | Scope | Source type |
|---|---|---|---|
| HTML links CSS/JS | HTML can reference stylesheets and scripts via link/script elements | educational + HTML standard pattern | WHATWG HTML / MDN conceptual |
| Frontend | UI that runs in the browser (or similar client) presents to the user | educational boundary | industry common model |
| Backend | Server-side software that handles requests, logic, files, data access | educational boundary | industry common model |
| HTTP | Clients send requests; servers return responses with status and body | educational + HTTP model | MDN / RFC conceptual |
| API | Interface for programs to talk; often HTTP JSON for web apps | educational pattern | not a single official “API standard product” |
| Database | Persistent structured storage beyond one browser session | educational | product-agnostic |

## Non-claims (do not teach as universal product facts)

- “모든 앱은 REST만 쓴다”
- “Backend = 항상 Node”
- “Database = 항상 SQL”
- Firebase/Supabase/Neon 가격·무료 범위 (제품 사실 → 별도 검증 필요 시 blocked until docs)

## Day1 sample mapping

| Layer | Sample path |
|---|---|
| HTML structure | `examples/day1-first-success/src/index.html` |
| CSS | `…/style.css` |
| JS (client) | `…/main.js` |
| Backend-ish server | `…/server.js` (Node HTTP file server — educational, not full app backend) |
| Data | no DB in sample — teach “왜 나중 단계에서 저장소가 필요한가” |

## Status

| RQ | topic | status |
|---|---|---|
| RQ-B3-01 | file link model | verified → applied |
| RQ-B3-02 | FE/BE boundary | verified → applied |
| RQ-B3-03 | HTTP request/response educational | verified → applied |
| RQ-B3-04 | API as interface | verified → applied |
| RQ-B3-05 | DB persistence need | verified → applied |
| RQ-B3-06 | product pricing Firebase etc. | blocked (not in student body as fact) |
