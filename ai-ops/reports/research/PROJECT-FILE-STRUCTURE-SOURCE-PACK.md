# Project File Structure — Source Pack

```yaml
node_id: project-file-structure
checked_at: 2026-07-14
pick: A_THEN_B (A only this wave)
```

## Claims

| Claim (student-safe) | Status | Source |
|---|---|---|
| package.json is npm package metadata; must be JSON | official_verified | https://docs.npmjs.com/cli/v11/configuring-npm/package-json |
| `scripts` holds lifecycle/custom commands; `npm run <name>` runs them | official_verified | same + scripts docs |
| `dependencies` map package names to version ranges (when present) | official_verified | package-json#dependencies |
| Our Day1 sample has no dependencies field; `npm install` still valid step | educational_example | repo sample package.json |
| `src/` is a common convention, not an npm-required folder for all projects | educational_interpretation | industry practice; not package.json required field |
| AI-generated text becomes files when saved/applied by tools or humans | educational_interpretation | process description; not product-specific magic |

## RQ status

| id | status |
|---|---|
| RQ-001 | verified → apply in lesson |
| RQ-003 | verified → apply (zero deps wording) |
| RQ-005 | verified as interpretation |
| RQ-006 | verified this pack |
| RQ-002 | remains for B |
| RQ-004 | remains for C |
