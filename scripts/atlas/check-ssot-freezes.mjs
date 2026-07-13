#!/usr/bin/env node
/**
 * Atlas GO-8: verify education freezes in SSOT markdown.
 * - 21 concepts in Education Layer flow block
 * - 14 section rows in §4.4
 * - BUILD-PLAN contains HOLD
 * - Model Routing feature spec does not claim modifies_core_21_concepts true
 */
import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const education = fs.readFileSync(
  path.join(root, "ai-ops/roadmap/ATLAS-EDUCATION-LAYER.md"),
  "utf8",
)
const buildPlan = fs.readFileSync(path.join(root, "ai-ops/roadmap/ATLAS-BUILD-PLAN.md"), "utf8")
const feature = fs.readFileSync(
  path.join(root, "ai-ops/roadmap/ATLAS-MODEL-ROUTING-FEATURE-SPEC.md"),
  "utf8",
)

const failures = []

// Count concepts in first ```text block after "## 4.2"
const m = education.match(/## 4\.2[\s\S]*?```text\n([\s\S]*?)```/)
if (!m) {
  failures.push("Could not find concept flow block under ## 4.2")
} else {
  const parts = m[1]
    .split("→")
    .map((s) => s.replace(/\n/g, " ").trim())
    .filter(Boolean)
  if (parts.length !== 21) {
    failures.push(`Expected 21 concepts in flow, found ${parts.length}`)
  }
}

const sectionRows = education.match(/^\| (1[0-4]|[1-9]) \|/gm) || []
// Unique section numbers 1-14
const nums = new Set(
  sectionRows.map((r) => Number(r.match(/\| (\d+)/)[1])).filter((n) => n >= 1 && n <= 14),
)
if (nums.size < 14) {
  failures.push(`Expected section numbers 1-14, found ${[...nums].sort((a, b) => a - b).join(",")}`)
}

if (!/HOLD/i.test(buildPlan.slice(0, 500))) {
  failures.push("ATLAS-BUILD-PLAN.md header missing HOLD")
}

if (/modifies_core_21_concepts\s*\|\s*\*\*true\*\*/i.test(feature)) {
  failures.push("Feature Spec claims modifies_core_21_concepts true")
}
if (!/modifies_core_21_concepts\s*\|\s*\*\*false\*\*/i.test(feature)) {
  failures.push("Feature Spec missing modifies_core_21_concepts false")
}

const result = {
  ok: failures.length === 0,
  failures,
  checks: {
    concepts: failures.some((f) => f.includes("21")) ? "FAIL" : "PASS",
    sections_1_to_14: failures.some((f) => f.includes("section")) ? "FAIL" : "PASS",
    build_plan_hold: failures.some((f) => f.includes("HOLD")) ? "FAIL" : "PASS",
    feature_no_core_mutate: failures.some((f) => f.includes("modifies_core")) ? "FAIL" : "PASS",
  },
}

console.log(JSON.stringify(result, null, 2))
process.exit(result.ok ? 0 : 1)
