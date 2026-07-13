#!/usr/bin/env node
/**
 * Atlas GO-8/GO-9: ensure Feature Spec lists the nine Learning Units.
 */
import fs from "node:fs";
import path from "node:path";

const feature = fs.readFileSync(
  path.join(process.cwd(), "ai-ops/roadmap/ATLAS-MODEL-ROUTING-FEATURE-SPEC.md"),
  "utf8",
);

const requiredNames = [
  "Task Classification",
  "Task Routing",
  "Executor Routing",
  "Model Routing",
  "Cost-Aware Orchestration",
  "Independent Review",
  "Evaluation & Retry",
  "Human Escalation",
  "Routing Observability",
];

const missing = requiredNames.filter((name) => !feature.includes(name));
const result = {
  ok: missing.length === 0,
  required: 9,
  missing,
};
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
