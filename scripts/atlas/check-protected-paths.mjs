#!/usr/bin/env node
/**
 * Atlas GO-8: detect whether protected Phase 1 paths appear in a proposed stage set.
 * Usage:
 *   node scripts/atlas/check-protected-paths.mjs
 *   node scripts/atlas/check-protected-paths.mjs --staged
 * Default: inspect full working tree via `git status --porcelain`.
 */
import { execSync } from "node:child_process";

const PROTECTED_GLOBS = [
  /^src\/components\/layout\/SiteHeader\.tsx$/,
  /^src\/content\/atlas\.ts$/,
  /^src\/app\/atlas\//,
  /^src\/content\/atlas\//,
  /^src\/features\/atlas\//,
  /^src\/lib\/atlas\.ts$/,
  /^src\/lib\/atlas-progress\.ts$/,
  /^src\/lib\/atlas\.test\.ts$/,
  /^ai-ops\/ATLAS-P1-PENDING\.md$/,
  /^ai-ops\/reports\/atlas-phase-1-impact-report\.md$/,
];

const args = new Set(process.argv.slice(2));
const stagedOnly = args.has("--staged");

function git(cmd) {
  return execSync(cmd, { encoding: "utf8" }).trim();
}

const porcelain = stagedOnly
  ? git("git diff --cached --name-only")
  : git("git status --porcelain");

const paths = stagedOnly
  ? porcelain.split(/\r?\n/).filter(Boolean)
  : porcelain
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => line.slice(3).replace(/ -> /g, " ").split(" ").pop());

const hits = paths.filter((p) => PROTECTED_GLOBS.some((re) => re.test(p.replace(/\\/g, "/"))));

const result = {
  ok: true,
  mode: stagedOnly ? "staged" : "working_tree",
  protected_present: hits,
  note: stagedOnly
    ? "FAIL if staging protected paths into non-phase1 commit"
    : "INFO: protected paths may exist uncommitted; do not mix into OS commits",
};

if (stagedOnly && hits.length > 0) {
  result.ok = false;
}

console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
