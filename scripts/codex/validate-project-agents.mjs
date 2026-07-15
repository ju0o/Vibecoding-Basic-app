import { execFileSync } from "node:child_process"
import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const agentDir = path.join(root, ".codex", "agents")
const expected = {
  "education-chief": ["gpt-5.6-sol", "high", null],
  "repository-explorer": ["gpt-5.6-luna", "low", "read-only"],
  "research-worker": ["gpt-5.6-luna", "medium", "read-only"],
  "mechanical-auditor": ["gpt-5.4-mini", "low", "read-only"],
  "source-verifier": ["gpt-5.6-terra", "high", "read-only"],
  "curriculum-architect": ["gpt-5.6-terra", "high", "read-only"],
  "content-writer": ["gpt-5.6-terra", "medium", null],
  "practice-designer": ["gpt-5.5", "high", null],
  "interaction-designer": ["gpt-5.6-terra", "high", "read-only"],
  "react-implementer": ["gpt-5.4", "high", null],
  "qa-investigator": ["gpt-5.4-mini", "medium", "read-only"],
  "independent-reviewer": ["gpt-5.5", "high", "read-only"],
}

const errors = []
const scalar = (text, key) => text.match(new RegExp(`^${key}\\s*=\\s*"([^"]*)"\\s*$`, "m"))?.[1]
const files = readdirSync(agentDir).filter((file) => file.endsWith(".toml")).sort()
const names = []

if (files.length !== 12) errors.push(`expected 12 agent files, found ${files.length}`)

const catalog = JSON.parse(execFileSync("codex", ["debug", "models"], { encoding: "utf8" })).models
const modelBySlug = new Map(catalog.map((model) => [model.slug, model]))

for (const file of files) {
  const text = readFileSync(path.join(agentDir, file), "utf8")
  const name = scalar(text, "name")
  const description = scalar(text, "description")
  const model = scalar(text, "model")
  const effort = scalar(text, "model_reasoning_effort")
  const sandbox = scalar(text, "sandbox_mode") ?? null
  const instructions = text.match(/developer_instructions\s*=\s*"""([\s\S]*?)"""/)?.[1]

  if (!name || !description || !instructions) errors.push(`${file}: missing required field`)
  if (name) names.push(name)
  if (!expected[name]) errors.push(`${file}: unexpected agent name ${name}`)
  if (name === "explorer") errors.push(`${file}: conflicts with built-in explorer`)

  const wanted = expected[name]
  if (wanted && (model !== wanted[0] || effort !== wanted[1] || sandbox !== wanted[2])) {
    errors.push(`${file}: routing tuple does not match approved policy`)
  }

  const catalogModel = modelBySlug.get(model)
  if (!catalogModel) errors.push(`${file}: model ${model} is not in the active catalog`)
  if (catalogModel && !catalogModel.supported_reasoning_levels.some((level) => level.effort === effort)) {
    errors.push(`${file}: effort ${effort} is unsupported for ${model}`)
  }

  for (const phrase of [
    "Layer: Codex executor.",
    "Domain authority: existing AI-Ops and education SSOT.",
    "Track D: paused",
    "Current scope: configuration only",
    "No write is authorized unless the current Context Package contains explicit allow_write_paths.",
    "Do not copy or replace domain SSOT.",
    "Do not push or deploy.",
  ]) {
    if (!instructions?.includes(phrase)) errors.push(`${file}: missing contract phrase: ${phrase}`)
  }
}

if (new Set(names).size !== names.length) errors.push("duplicate agent name")

const config = readFileSync(path.join(root, ".codex", "config.toml"), "utf8")
for (const [key, value] of [["max_threads", "4"], ["max_depth", "1"], ["interrupt_message", "true"]]) {
  if (!new RegExp(`^${key}\\s*=\\s*${value}\\s*$`, "m").test(config)) errors.push(`config: invalid ${key}`)
}

console.log(JSON.stringify({ ok: errors.length === 0, agents: files.length, models: [...new Set(Object.values(expected).map(([model]) => model))], errors }, null, 2))
process.exitCode = errors.length === 0 ? 0 : 1
