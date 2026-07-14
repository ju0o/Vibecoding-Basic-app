/**
 * Pure Day 1 interactive experience state machine.
 * Browser simulation only — does not run real shell.
 */

import type { PreviewModel, ServerVisualStatus, TerminalLine } from "../core/animation-types"

export const DAY1_STATES = [
  "idle",
  "requesting",
  "planning",
  "generating",
  "installing",
  "starting_server",
  "running",
  "revising",
  "error",
  "recovering",
  "completed",
] as const

export type Day1State = (typeof DAY1_STATES)[number]

export type Day1PromptId = "welcome" | "name-hero" | "simple-card"

export type Day1RevisionId = "title" | "color" | "button" | "copy"

export type Day1ErrorId = "port" | "no-install" | "typo" | "wrong-folder"

export type Day1Action =
  | { readonly type: "SELECT_PROMPT"; readonly promptId: Day1PromptId }
  | { readonly type: "ADVANCE" }
  | { readonly type: "BACK" }
  | { readonly type: "SELECT_REVISION"; readonly revisionId: Day1RevisionId }
  | { readonly type: "TRIGGER_ERROR"; readonly errorId: Day1ErrorId }
  | { readonly type: "COPY_ERROR" }
  | { readonly type: "SEND_TO_AI" }
  | { readonly type: "APPLY_FIX" }
  | { readonly type: "RERUN" }
  | { readonly type: "MARK_COMPLETE" }
  | { readonly type: "RESET" }
  | { readonly type: "PAUSE" }
  | { readonly type: "RESUME" }
  | { readonly type: "SET_PANEL"; readonly panel: Day1Panel }

export type Day1Panel = "request" | "files" | "terminal" | "preview"

export type Day1Model = {
  readonly state: Day1State
  readonly promptId: Day1PromptId | null
  readonly filesVisible: number
  readonly installStep: number
  readonly serverStatus: ServerVisualStatus
  readonly preview: PreviewModel
  readonly basePreview: PreviewModel
  readonly revisionId: Day1RevisionId | null
  readonly errorId: Day1ErrorId | null
  readonly errorCopied: boolean
  readonly errorSent: boolean
  readonly paused: boolean
  readonly mobilePanel: Day1Panel
  readonly history: readonly Day1State[]
}

export const PROMPTS: Record<
  Day1PromptId,
  { readonly label: string; readonly text: string; readonly preview: PreviewModel }
> = {
  welcome: {
    label: "환영 페이지",
    text: "내 이름과 환영 문구가 보이는 페이지를 만들어줘.",
    preview: {
      title: "나의 첫 바이브코딩",
      message: "안녕하세요",
      accent: "#e8f1ff",
      showButton: false,
      note: "나는 AI와 함께 만들고 있다",
    },
  },
  "name-hero": {
    label: "이름 히어로",
    text: "큰 제목에 내 이름을 넣고 '학습을 시작합니다'라고 써줘.",
    preview: {
      title: "주엉쓰의 학습실",
      message: "학습을 시작합니다",
      accent: "#ecfdf5",
      showButton: false,
    },
  },
  "simple-card": {
    label: "카드 UI",
    text: "연한 파란 배경에 흰 카드와 인사 문구가 있는 페이지를 만들어줘.",
    preview: {
      title: "Day 1 성공",
      message: "요청 → 결과 → 수정",
      accent: "#e0e7ff",
      showButton: false,
    },
  },
}

export const PLAN_STEPS = [
  "화면 구조 생성 (index.html)",
  "스타일 적용 (style.css)",
  "문구 연결 (main.js)",
  "프로젝트 메모 (package.json)",
  "개발 서버 실행 준비",
] as const

export const FILE_TREE = [
  {
    id: "pkg",
    name: "package.json",
    kind: "file" as const,
    depth: 0,
    role: "스크립트·프로젝트 메모",
  },
  {
    id: "server",
    name: "server.js",
    kind: "file" as const,
    depth: 0,
    role: "Node로 로컬 서버 실행",
  },
  { id: "src", name: "src/", kind: "folder" as const, depth: 0, role: "사람이 고치는 소스" },
  { id: "html", name: "index.html", kind: "file" as const, depth: 1, role: "화면 뼈대" },
  { id: "css", name: "style.css", kind: "file" as const, depth: 1, role: "색·레이아웃" },
  { id: "js", name: "main.js", kind: "file" as const, depth: 1, role: "바꿀 문구" },
] as const

export const TOTAL_FILES = FILE_TREE.length

export const ERRORS: Record<
  Day1ErrorId,
  { readonly label: string; readonly message: string; readonly hint: string }
> = {
  port: {
    label: "포트 충돌",
    message: "Error: listen EADDRINUSE: address already in use 127.0.0.1:3456",
    hint: "이미 서버가 켜져 있을 수 있어요. Ctrl+C 후 다시 npm run dev",
  },
  "no-install": {
    label: "의존성 미설치",
    message: "Error: Cannot find module (did you run npm install?)",
    hint: "프로젝트 폴더에서 npm install 을 먼저 실행하세요 (샘플은 외부 패키지 0개).",
  },
  typo: {
    label: "명령 오타",
    message: 'npm error Missing script: "deev"',
    hint: "package.json 의 scripts 이름을 확인하세요. 이 샘플은 npm run dev 입니다.",
  },
  "wrong-folder": {
    label: "잘못된 폴더",
    message: "npm error enoent Could not read package.json",
    hint: "examples/day1-first-success 폴더에서 명령을 실행했는지 확인하세요.",
  },
}

const DEFAULT_PREVIEW: PreviewModel = {
  title: "(미리보기 대기)",
  message: "서버가 켜지면 여기에 결과가 나타납니다.",
  accent: "#f3f4f6",
  showButton: false,
}

export function createInitialDay1Model(): Day1Model {
  return {
    state: "idle",
    promptId: null,
    filesVisible: 0,
    installStep: 0,
    serverStatus: "idle",
    preview: DEFAULT_PREVIEW,
    basePreview: DEFAULT_PREVIEW,
    revisionId: null,
    errorId: null,
    errorCopied: false,
    errorSent: false,
    paused: false,
    mobilePanel: "request",
    history: ["idle"],
  }
}

function pushHistory(model: Day1Model, state: Day1State): readonly Day1State[] {
  const last = model.history[model.history.length - 1]
  if (last === state) {
    return model.history
  }
  return [...model.history, state]
}

function applyRevision(base: PreviewModel, revisionId: Day1RevisionId): PreviewModel {
  switch (revisionId) {
    case "title":
      return { ...base, title: "Day 1 성공" }
    case "color":
      return { ...base, accent: "#fef3c7" }
    case "button":
      return { ...base, showButton: true }
    case "copy":
      return { ...base, message: `${base.message} · 수정 완료` }
    default:
      return base
  }
}

export function day1Reduce(model: Day1Model, action: Day1Action): Day1Model {
  if (action.type === "RESET") {
    return createInitialDay1Model()
  }
  if (action.type === "PAUSE") {
    return { ...model, paused: true }
  }
  if (action.type === "RESUME") {
    return { ...model, paused: false }
  }
  if (action.type === "SET_PANEL") {
    return { ...model, mobilePanel: action.panel }
  }
  // While paused, block linear advance only (choices like revision still allowed)
  if (model.paused && action.type === "ADVANCE") {
    return model
  }

  switch (action.type) {
    case "SELECT_PROMPT": {
      if (model.state !== "idle" && model.state !== "completed") {
        return model
      }
      const prompt = PROMPTS[action.promptId]
      return {
        ...createInitialDay1Model(),
        state: "requesting",
        promptId: action.promptId,
        basePreview: prompt.preview,
        history: ["idle", "requesting"],
        mobilePanel: "request",
      }
    }
    case "ADVANCE": {
      return advance(model)
    }
    case "BACK": {
      return goBack(model)
    }
    case "SELECT_REVISION": {
      if (model.state !== "running" && model.state !== "completed") {
        return model
      }
      const nextPreview = applyRevision(model.basePreview, action.revisionId)
      return {
        ...model,
        state: "revising",
        revisionId: action.revisionId,
        preview: nextPreview,
        history: pushHistory(model, "revising"),
        mobilePanel: "files",
      }
    }
    case "TRIGGER_ERROR": {
      if (
        model.state !== "running" &&
        model.state !== "starting_server" &&
        model.state !== "installing"
      ) {
        return model
      }
      return {
        ...model,
        state: "error",
        errorId: action.errorId,
        errorCopied: false,
        errorSent: false,
        serverStatus: "error",
        history: pushHistory(model, "error"),
        mobilePanel: "terminal",
      }
    }
    case "COPY_ERROR": {
      if (model.state !== "error" || !model.errorId) {
        return model
      }
      return { ...model, errorCopied: true }
    }
    case "SEND_TO_AI": {
      if (model.state !== "error" || !model.errorCopied) {
        return model
      }
      return { ...model, errorSent: true }
    }
    case "APPLY_FIX": {
      if (model.state !== "error" || !model.errorSent) {
        return model
      }
      return {
        ...model,
        state: "recovering",
        history: pushHistory(model, "recovering"),
        mobilePanel: "terminal",
      }
    }
    case "RERUN": {
      if (model.state !== "recovering" && model.state !== "error") {
        return model
      }
      return {
        ...model,
        state: "running",
        serverStatus: "running",
        errorId: null,
        errorCopied: false,
        errorSent: false,
        preview: model.revisionId
          ? applyRevision(model.basePreview, model.revisionId)
          : model.basePreview,
        history: pushHistory(model, "running"),
        mobilePanel: "preview",
      }
    }
    case "MARK_COMPLETE": {
      if (model.state !== "running") {
        return model
      }
      return {
        ...model,
        state: "completed",
        history: pushHistory(model, "completed"),
      }
    }
    default:
      return model
  }
}

function advance(model: Day1Model): Day1Model {
  switch (model.state) {
    case "idle":
      return model
    case "requesting":
      return {
        ...model,
        state: "planning",
        history: pushHistory(model, "planning"),
        mobilePanel: "request",
      }
    case "planning":
      return {
        ...model,
        state: "generating",
        filesVisible: 1,
        history: pushHistory(model, "generating"),
        mobilePanel: "files",
      }
    case "generating": {
      if (model.filesVisible < TOTAL_FILES) {
        return { ...model, filesVisible: model.filesVisible + 1, mobilePanel: "files" }
      }
      return {
        ...model,
        state: "installing",
        installStep: 1,
        history: pushHistory(model, "installing"),
        mobilePanel: "terminal",
      }
    }
    case "installing": {
      if (model.installStep < 3) {
        return { ...model, installStep: model.installStep + 1 }
      }
      return {
        ...model,
        state: "starting_server",
        serverStatus: "starting",
        history: pushHistory(model, "starting_server"),
        mobilePanel: "terminal",
      }
    }
    case "starting_server":
      return {
        ...model,
        state: "running",
        serverStatus: "running",
        preview: model.basePreview,
        history: pushHistory(model, "running"),
        mobilePanel: "preview",
      }
    case "revising":
      return {
        ...model,
        state: "running",
        history: pushHistory(model, "running"),
        mobilePanel: "preview",
      }
    case "recovering":
      return day1Reduce(model, { type: "RERUN" })
    case "running":
      return {
        ...model,
        state: "completed",
        history: pushHistory(model, "completed"),
      }
    case "error":
    case "completed":
      return model
    default:
      return model
  }
}

function goBack(model: Day1Model): Day1Model {
  if (model.history.length < 2) {
    return model
  }
  if (model.state === "generating" && model.filesVisible > 1) {
    return { ...model, filesVisible: model.filesVisible - 1 }
  }
  if (model.state === "installing" && model.installStep > 1) {
    return { ...model, installStep: model.installStep - 1 }
  }

  const prev = model.history[model.history.length - 2]
  if (!prev) {
    return model
  }
  const history = model.history.slice(0, -1)

  const restored: Day1Model = {
    ...model,
    state: prev,
    history,
    errorId: prev === "error" ? model.errorId : null,
    serverStatus:
      prev === "running" || prev === "completed"
        ? "running"
        : prev === "starting_server"
          ? "starting"
          : prev === "error"
            ? "error"
            : "idle",
    filesVisible:
      prev === "generating"
        ? Math.max(1, model.filesVisible)
        : prev === "installing" ||
            prev === "starting_server" ||
            prev === "running" ||
            prev === "revising" ||
            prev === "completed" ||
            prev === "error" ||
            prev === "recovering"
          ? TOTAL_FILES
          : 0,
    installStep:
      prev === "installing"
        ? Math.max(1, model.installStep)
        : prev === "starting_server" ||
            prev === "running" ||
            prev === "revising" ||
            prev === "completed" ||
            prev === "error" ||
            prev === "recovering"
          ? 3
          : 0,
    preview:
      prev === "running" || prev === "revising" || prev === "completed"
        ? model.revisionId
          ? applyRevision(model.basePreview, model.revisionId)
          : model.basePreview
        : DEFAULT_PREVIEW,
  }
  return restored
}

export function getTerminalLines(model: Day1Model): readonly TerminalLine[] {
  const lines: TerminalLine[] = []
  if (model.state === "idle" || model.state === "requesting" || model.state === "planning") {
    lines.push({ id: "t0", kind: "info", text: "터미널 대기 중… (시뮬레이션)" })
    return lines
  }
  if (
    model.state === "generating" ||
    model.filesVisible > 0 ||
    model.state === "installing" ||
    model.state === "starting_server" ||
    model.state === "running" ||
    model.state === "revising" ||
    model.state === "error" ||
    model.state === "recovering" ||
    model.state === "completed"
  ) {
    if (model.installStep >= 1 || model.state !== "generating") {
      // show install when past generating
    }
  }

  if (model.state === "generating") {
    lines.push({ id: "g1", kind: "info", text: "# 파일 생성 중… (시뮬레이션)" })
    return lines
  }

  if (
    model.installStep >= 1 ||
    [
      "installing",
      "starting_server",
      "running",
      "revising",
      "error",
      "recovering",
      "completed",
    ].includes(model.state)
  ) {
    lines.push({ id: "i1", kind: "input", text: "$ npm install" })
    if (model.installStep >= 2 || model.state !== "installing") {
      lines.push({
        id: "i2",
        kind: "output",
        text: "이 샘플은 외부 패키지 0개 · install 단계 개념 체험",
      })
    }
    if (model.installStep >= 3 || model.state !== "installing") {
      lines.push({ id: "i3", kind: "success", text: "added 0 packages in 0.1s" })
    }
  }

  if (
    model.state === "starting_server" ||
    model.state === "running" ||
    model.state === "revising" ||
    model.state === "error" ||
    model.state === "recovering" ||
    model.state === "completed"
  ) {
    lines.push({ id: "d1", kind: "input", text: "$ npm run dev" })
    if (model.serverStatus === "starting") {
      lines.push({ id: "d2", kind: "output", text: "Starting Day 1 sample server…" })
    }
    if (
      model.serverStatus === "running" ||
      model.state === "completed" ||
      model.state === "revising"
    ) {
      lines.push({
        id: "d3",
        kind: "success",
        text: "Open in browser: http://127.0.0.1:3456",
      })
    }
  }

  if (model.state === "error" && model.errorId) {
    const err = ERRORS[model.errorId]
    lines.push({ id: "e1", kind: "error", text: err.message })
    lines.push({ id: "e2", kind: "info", text: err.hint })
  }

  if (model.state === "recovering") {
    lines.push({ id: "r1", kind: "info", text: "AI 제안 적용 중… (시뮬레이션 복구)" })
    lines.push({ id: "r2", kind: "success", text: "수정 완료. 다시 실행할 수 있습니다." })
  }

  if (lines.length === 0) {
    lines.push({ id: "empty", kind: "info", text: "터미널 대기 중… (시뮬레이션)" })
  }
  return lines
}

export function getHighlightedFileId(model: Day1Model): string | null {
  if (model.state === "revising") {
    if (model.revisionId === "color") {
      return "css"
    }
    if (model.revisionId === "title" || model.revisionId === "copy") {
      return "js"
    }
    if (model.revisionId === "button") {
      return "html"
    }
  }
  if (model.state === "generating" && model.filesVisible > 0) {
    return FILE_TREE[model.filesVisible - 1]?.id ?? null
  }
  return null
}

export function getAriaLiveMessage(model: Day1Model): string {
  const labels: Record<Day1State, string> = {
    idle: "시작 전. 요청을 선택하세요.",
    requesting: "요청이 AI에게 전달되었습니다.",
    planning: "AI가 작업 계획을 보여 줍니다.",
    generating: `파일 생성 중. ${model.filesVisible} / ${TOTAL_FILES}`,
    installing: `의존성 설치 시뮬레이션 단계 ${model.installStep} / 3`,
    starting_server: "개발 서버를 시작하는 중입니다.",
    running: "서버 실행 중. 브라우저 미리보기를 확인하세요.",
    revising: "수정이 파일과 미리보기에 반영되었습니다.",
    error: model.errorId ? `오류: ${ERRORS[model.errorId].label}` : "오류 상태",
    recovering: "복구 절차 진행 중.",
    completed: "이 시뮬레이션 흐름을 완료했습니다.",
  }
  return labels[model.state]
}

export function canAdvance(model: Day1Model): boolean {
  if (model.paused) {
    return false
  }
  if (model.state === "idle" || model.state === "error" || model.state === "completed") {
    return false
  }
  if (model.state === "recovering") {
    return true
  }
  return true
}
