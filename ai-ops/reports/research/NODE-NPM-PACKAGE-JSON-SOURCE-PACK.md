# Node · npm · package.json — Source Pack (Candidate B)

```yaml
node_id: node-npm-package-json
checked_at: 2026-07-14
pick: A_THEN_B
```

## Claims

| Claim | Status | Source |
|---|---|---|
| Node.js is an open-source, cross-platform **JavaScript runtime environment** | official_verified | https://nodejs.org/en/learn/getting-started/introduction-to-nodejs |
| Node runs V8 outside the browser | official_verified | same |
| npm is the standard **package manager** for Node.js | official_verified | https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager |
| package.json is package metadata JSON; `scripts` map names to commands | official_verified | https://docs.npmjs.com/cli/v11/configuring-npm/package-json |
| `npm run <name>` runs a script from package.json | official_verified | npm scripts docs |
| `dependencies` / `devDependencies` are separate maps of package→version range | official_verified | package-json docs |
| Day1 sample has **scripts** `dev`/`start` → `node server.js`; **no** dependencies field | educational_example | repo sample |
| LTS version numbers change — do not hardcode forever | official_verified | nodejs.org download (policy) |

## RQ

RQ-001,002,003,006,B01–B07 → applied in this pack / lesson (B02: npm often installed with Node — educational; verify install docs).
