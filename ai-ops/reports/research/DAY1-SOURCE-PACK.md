# Day 1 Official Source Pack

```yaml
document: DAY1-SOURCE-PACK
checked_at: 2026-07-14
status: research_complete
claim_scope: install_and_tooling_facts
```

---

## 1. Purpose

Facts used in Day 1 education materials. Prefer official docs. Product UIs and pricing change — re-check before public publish.

---

## 2. Verified claims

| Claim (student-safe wording) | Status | Source | Notes |
|---|---|---|---|
| Node.js is a JavaScript **runtime** for running JS outside the browser (servers, tools, CLIs). | official_verified | https://nodejs.org/ | Definition simplified for learners |
| npm is the **standard package manager** commonly used with Node.js; installs project dependencies. | official_verified | https://nodejs.org/learn/getting-started/an-introduction-to-the-npm-package-manager | Bundled with typical Node installs |
| With a `package.json`, `npm install` installs the project’s declared dependencies (often into `node_modules`). | official_verified | same Node learn page | Exact folder layout can vary by tool versions |
| `package.json` can define **scripts**; `npm run <name>` runs a named script. | official_verified | https://docs.npmjs.com/cli/v11/using-npm/scripts | `npm run dev` only works if a `dev` script exists |
| VS Code is a free source-code editor; installers/docs at official site. | official_verified | https://code.visualstudio.com/docs | Not the only IDE |
| IDE = place to open folders/files, edit code, run terminals/tools. | educational_example | industry common meaning | Not a single ISO standard |
| AI coding assistants can generate files/projects from natural language; outputs must be reviewed. | interpretation | product docs vary | Do not claim one vendor “always” creates correct projects |
| Single-file HTML can open in a browser without Node. | official_verified (web platform) | MDN HTML / browser behavior | Path A foundation |

---

## 3. Install guidance (high level)

### Node.js

| OS | Recommended learner path (verify on site) |
|---|---|
| Windows | Official installer from https://nodejs.org/ (prefer **LTS** line on download page) |
| macOS | Official installer or platform package manager; prefer LTS |
| Linux | Distro packages or official binaries — follow nodejs.org download docs |

After install, new terminal session:

```text
node -v
npm -v
```

Expect a version string (e.g. `v22.x.x`). Exact LTS number **changes over time** — do not hardcode a version as eternal requirement in student prose; say “LTS on the official site.”

**checked_at:** 2026-07-14

### VS Code

| OS | Path |
|---|---|
| Windows / macOS / Linux | https://code.visualstudio.com/Download · docs: https://code.visualstudio.com/docs/setup/setup-overview |

Alternatives (do not ban): Cursor, Windsurf, JetBrains, vim, etc. Day 1 teaches **IDE idea**; VS Code is the default illustrated tool, not a monopoly.

**checked_at:** 2026-07-14

### npm scripts

- `npm install` — install dependencies for the current project (needs network; needs `package.json`).
- `npm run dev` — runs the script named `dev` if defined; otherwise fails with a clear npm error.
- Projects differ: some use `npm start`, `npm run build`, framework CLIs, etc.

**checked_at:** 2026-07-14

---

## 4. Path A (Zero-Setup) tool policy

| Option | Setup | Product lock-in | Day 1 use |
|---|---|---|---|
| **A1. Single HTML file + browser** | Save file, open in Chrome/Edge/Safari/Firefox | None | **Primary recommendation** |
| A2. AI chat preview / canvas / artifact (vendor-specific) | Account may be required | High if mandatory | Optional if student already uses one |
| A3. Online sandboxes (CodePen, JSFiddle, StackBlitz, etc.) | Often free tier + account | Medium | Optional; mention “one of many” |

**Policy:** Path A must remain completable with **A1 only**. Never require a paid AI IDE for Day 1 success.

---

## 5. OS differences students hit

| Issue | Windows | macOS | Linux |
|---|---|---|---|
| Terminal | PowerShell, cmd, Windows Terminal | Terminal.app | gnome-terminal, etc. |
| `node` not found | Installer PATH; restart terminal | PATH / shell profile | PATH / package |
| Open HTML | Double-click / “Open with browser” | same | same |
| Path separators | `\` | `/` | `/` |
| Permission | Admin install prompts | may need password | sudo (careful) |

---

## 6. Claims to avoid in Day 1 body

- “Everyone must use Claude Code / Cursor / Copilot.”
- Fixed absolute prices or “best model ranking.”
- “npm run dev always works for every project.”
- “Node is only for servers” (too narrow — also tooling).
- Treating vibe coding as “never read code” (education contradicts pure hands-off vibe).

---

## 7. Atlas hooks (after curiosity)

| Question | Atlas / Knowledge (existing) |
|---|---|
| What is AI / LLM? | `ai`, `llm` foundation chapters |
| Runtime? | educational pointer — not a core 21 rename |
| Tools / agents later | agent, workflow, mcp — **not** Day 1 depth |

Do not rewrite Foundation Atlas chapters in this package.

---

## 8. Freshness

Re-verify install URLs and LTS naming before any public deploy of Day 1.

| Item | checked_at |
|---|---|
| nodejs.org download / learn npm | 2026-07-14 |
| docs.npmjs.com scripts / package.json | 2026-07-14 |
| code.visualstudio.com docs | 2026-07-14 |
