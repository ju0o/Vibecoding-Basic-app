#!/usr/bin/env node
/**
 * Atlas GO-8: inventory required Grok OS files.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const required = [
  "AGENTS.md",
  "ai-ops/reports/ATLAS-GROK-HANDOFF.md",
  "ai-ops/roadmap/ATLAS-GROK-MULTI-AGENT-OPERATING-PLAN.md",
  ".grok/agents/atlas-explorer.md",
  ".grok/agents/atlas-source-researcher.md",
  ".grok/agents/atlas-curriculum-architect.md",
  ".grok/agents/atlas-content-writer.md",
  ".grok/agents/atlas-interaction-designer.md",
  ".grok/agents/atlas-implementer.md",
  ".grok/agents/atlas-independent-reviewer.md",
  ".grok/skills/atlas-repository-audit/SKILL.md",
  ".grok/skills/atlas-source-research/SKILL.md",
  ".grok/skills/atlas-claim-verification/SKILL.md",
  ".grok/skills/atlas-curriculum-design/SKILL.md",
  ".grok/skills/atlas-content-authoring/SKILL.md",
  ".grok/skills/atlas-interaction-design/SKILL.md",
  ".grok/skills/atlas-implementation/SKILL.md",
  ".grok/skills/atlas-independent-review/SKILL.md",
  "scripts/atlas/check-protected-paths.mjs",
  "scripts/atlas/check-ssot-freezes.mjs",
  "scripts/atlas/check-ops-inventory.mjs",
  "scripts/atlas/check-model-routing-units.mjs",
];

const missing = required.filter((p) => !fs.existsSync(path.join(root, p)));
const result = {
  ok: missing.length === 0,
  required_count: required.length,
  missing,
};
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
