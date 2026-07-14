/** Pure state: Node/npm/package.json interactive (Candidate B). */

export type NnScene =
  | "inspect"
  | "install"
  | "dev"
  | "missing"
  | "wrong_dir"
  | "builder"
  | "ai_error"
  | "done"

export type NnModel = {
  readonly scene: NnScene
  readonly cwd: "outside" | "project"
  readonly selectedScript: "dev" | "start" | "serve" | null
  readonly installStep: 0 | 1 | 2 | 3
  readonly server: "idle" | "starting" | "running" | "error"
  readonly lastError: string | null
  readonly builderChoice: "install" | "dev" | "build" | "test" | null
  readonly aiBits: {
    readonly cwd: boolean
    readonly cmd: boolean
    readonly err: boolean
    readonly scripts: boolean
    readonly goal: boolean
    readonly analyze: boolean
  }
  readonly paused: boolean
}

/** Matches examples/day1-first-success/package.json */
export const SAMPLE_SCRIPTS = {
  dev: "node server.js",
  start: "node server.js",
} as const

export function createNnModel(): NnModel {
  return {
    scene: "inspect",
    cwd: "project",
    selectedScript: null,
    installStep: 0,
    server: "idle",
    lastError: null,
    builderChoice: null,
    aiBits: {
      cwd: false,
      cmd: false,
      err: false,
      scripts: false,
      goal: false,
      analyze: false,
    },
    paused: false,
  }
}

export type NnAction =
  | { readonly type: "SET_SCENE"; readonly scene: NnScene }
  | { readonly type: "SELECT_SCRIPT"; readonly name: "dev" | "start" | "serve" }
  | { readonly type: "RUN_SELECTED" }
  | { readonly type: "INSTALL_STEP" }
  | { readonly type: "SET_CWD"; readonly cwd: "outside" | "project" }
  | { readonly type: "BUILDER"; readonly choice: NnModel["builderChoice"] }
  | { readonly type: "TOGGLE_AI"; readonly key: keyof NnModel["aiBits"] }
  | { readonly type: "ADVANCE" }
  | { readonly type: "BACK" }
  | { readonly type: "RESET" }
  | { readonly type: "PAUSE" }
  | { readonly type: "RESUME" }

const ORDER: readonly NnScene[] = [
  "inspect",
  "install",
  "dev",
  "missing",
  "wrong_dir",
  "builder",
  "ai_error",
  "done",
]

export function nnReduce(m: NnModel, a: NnAction): NnModel {
  if (a.type === "RESET") return createNnModel()
  if (a.type === "PAUSE") return { ...m, paused: true }
  if (a.type === "RESUME") return { ...m, paused: false }
  if (m.paused && a.type === "ADVANCE") return m

  switch (a.type) {
    case "SET_SCENE":
      return { ...m, scene: a.scene, lastError: null }
    case "SELECT_SCRIPT":
      return { ...m, selectedScript: a.name, lastError: null }
    case "SET_CWD":
      return { ...m, cwd: a.cwd, lastError: null, server: "idle" }
    case "INSTALL_STEP": {
      const next = Math.min(3, m.installStep + 1) as 0 | 1 | 2 | 3
      return { ...m, installStep: next, lastError: null }
    }
    case "RUN_SELECTED": {
      if (m.cwd === "outside") {
        return {
          ...m,
          server: "error",
          lastError: "npm error enoent Could not read package.json (wrong directory)",
        }
      }
      if (!m.selectedScript) return m
      if (m.selectedScript === "serve") {
        return {
          ...m,
          server: "error",
          lastError: 'npm error Missing script: "serve"',
        }
      }
      // dev or start
      return {
        ...m,
        server: "running",
        lastError: null,
      }
    }
    case "BUILDER": {
      const choice = a.choice
      if (choice === "build" || choice === "test") {
        return {
          ...m,
          builderChoice: choice,
          lastError: `scripts에 "${choice}" 가 없습니다. 이 샘플은 dev/start 만 정의되어 있습니다.`,
          server: "error",
        }
      }
      if (choice === "install") {
        return { ...m, builderChoice: choice, installStep: 1, lastError: null, server: "idle" }
      }
      if (choice === "dev") {
        return {
          ...m,
          builderChoice: choice,
          selectedScript: "dev",
          lastError: null,
        }
      }
      return { ...m, builderChoice: choice }
    }
    case "TOGGLE_AI":
      return { ...m, aiBits: { ...m.aiBits, [a.key]: !m.aiBits[a.key] } }
    case "ADVANCE": {
      if (m.scene === "install" && m.installStep < 3) {
        return nnReduce(m, { type: "INSTALL_STEP" })
      }
      if (m.scene === "dev" || m.scene === "missing" || m.scene === "wrong_dir") {
        return nnReduce(m, { type: "RUN_SELECTED" })
      }
      const i = ORDER.indexOf(m.scene)
      return { ...m, scene: ORDER[Math.min(i + 1, ORDER.length - 1)] ?? m.scene, lastError: null }
    }
    case "BACK": {
      const i = ORDER.indexOf(m.scene)
      if (i <= 0) return m
      return { ...m, scene: ORDER[i - 1] ?? m.scene }
    }
    default:
      return m
  }
}

export function terminalLines(m: NnModel): readonly {
  id: string
  kind: "input" | "output" | "success" | "error" | "info"
  text: string
}[] {
  const lines: {
    id: string
    kind: "input" | "output" | "success" | "error" | "info"
    text: string
  }[] = []
  lines.push({
    id: "cwd",
    kind: "info",
    text: m.cwd === "project" ? "cwd: examples/day1-first-success" : "cwd: (프로젝트 밖)",
  })
  if (m.scene === "install" || m.installStep > 0) {
    lines.push({ id: "i0", kind: "input", text: "$ npm install" })
    if (m.installStep >= 1) {
      lines.push({
        id: "i1",
        kind: "output",
        text: "이 샘플은 dependencies 필드가 거의/없음 · 설치 단계 개념 체험",
      })
    }
    if (m.installStep >= 2) {
      lines.push({ id: "i2", kind: "output", text: "(시뮬레이션) package metadata 확인" })
    }
    if (m.installStep >= 3) {
      lines.push({ id: "i3", kind: "success", text: "added 0 packages in 0.1s" })
    }
  }
  if (m.selectedScript) {
    const cmd = `npm run ${m.selectedScript}`
    lines.push({ id: "r0", kind: "input", text: `$ ${cmd}` })
    if (m.selectedScript !== "serve" && m.cwd === "project") {
      lines.push({
        id: "r1",
        kind: "info",
        text: `→ scripts["${m.selectedScript}"] = "${SAMPLE_SCRIPTS[m.selectedScript as "dev" | "start"] ?? "?"}"`,
      })
    }
  }
  if (m.lastError) {
    lines.push({ id: "e0", kind: "error", text: m.lastError })
  }
  if (m.server === "running") {
    lines.push({ id: "s0", kind: "success", text: "Open: http://127.0.0.1:3456" })
  }
  if (lines.length === 1) {
    lines.push({ id: "w", kind: "info", text: "script를 선택하거나 다음 장면으로 이동하세요." })
  }
  return lines
}

export function buildErrorAi(m: NnModel): string {
  const p: string[] = []
  if (m.aiBits.cwd)
    p.push(`현재 폴더: ${m.cwd === "project" ? "examples/day1-first-success" : "(프로젝트 밖)"}`)
  if (m.aiBits.cmd) p.push(`실행한 명령: npm run ${m.selectedScript ?? "?"}`)
  if (m.aiBits.err) p.push(`오류: ${m.lastError ?? "(없음)"}`)
  if (m.aiBits.scripts)
    p.push('package.json scripts: { "dev": "node server.js", "start": "node server.js" }')
  if (m.aiBits.goal) p.push("원하는 결과: 개발 서버 실행")
  if (m.aiBits.analyze) p.push("아직 파일을 수정하지 말고 원인만 분석해 주세요.")
  return p.length ? p.join("\n") : "(토글을 켜면 요청문이 조립됩니다)"
}

export function ariaNn(m: NnModel): string {
  return `장면 ${m.scene}, 서버 ${m.server}${m.lastError ? ", 오류 있음" : ""}`
}
