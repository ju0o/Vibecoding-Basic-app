/** Pure state for project file structure interactive (Node A). */

export type FsScene =
  | "chaos"
  | "roles"
  | "find"
  | "wrong"
  | "edit"
  | "ai_scope"
  | "compare"
  | "done"

export type FileId = "pkg" | "src" | "server" | "readme" | "html" | "css" | "js"

export type FsModel = {
  readonly scene: FsScene
  readonly selected: FileId | null
  readonly goal: "welcome_text"
  readonly previewText: string
  readonly wrongAttempts: number
  readonly aiBlocks: {
    readonly analyze: boolean
    readonly file: boolean
    readonly forbid: boolean
    readonly done: boolean
    readonly verify: boolean
  }
  readonly compareMode: "single" | "split"
  readonly paused: boolean
}

export const FILES: Record<
  FileId,
  {
    readonly name: string
    readonly role: string
    readonly link: string
    readonly risk: string
    readonly command?: string
    readonly isPhrase: boolean
  }
> = {
  pkg: {
    name: "package.json",
    role: "프로젝트 설정·scripts·(있으면) 의존성 정보",
    link: "npm run dev 가 어떤 명령인지 적혀 있음",
    risk: "잘못 고치면 실행 스크립트가 깨질 수 있음",
    command: "npm run dev",
    isPhrase: false,
  },
  src: {
    name: "src/",
    role: "주요 소스 파일이 모이는 대표 위치(관례)",
    link: "화면 관련 파일이 그 안에 있을 때가 많음",
    risk: "폴더 전체를 지우면 화면이 사라질 수 있음",
    isPhrase: false,
  },
  server: {
    name: "server.js",
    role: "로컬 서버 실행 파일",
    link: "dev 스크립트가 node server.js 를 호출",
    risk: "서버 코드 오류 시 페이지가 안 열릴 수 있음",
    command: "node server.js",
    isPhrase: false,
  },
  readme: {
    name: "README.md",
    role: "사람을 위한 사용 안내",
    link: "실행 방법이 글로 적혀 있음",
    risk: "실행 파일은 아님 · 문구 화면에 직접 안 나옴",
    isPhrase: false,
  },
  html: {
    name: "src/index.html",
    role: "화면 뼈대",
    link: "브라우저 문서 구조",
    risk: "구조 깨지면 화면 전체가 이상해질 수 있음",
    isPhrase: false,
  },
  css: {
    name: "src/style.css",
    role: "색·레이아웃",
    link: "미리보기 배경색 등",
    risk: "스타일만 바뀜 · 환영 문구 본문은 아님",
    isPhrase: false,
  },
  js: {
    name: "src/main.js",
    role: "환영 문구 문자열 (이 샘플)",
    link: "Browser Preview 하단 문구",
    risk: "이 파일만 바꿔도 문구가 바뀜",
    isPhrase: true,
  },
}

const DEFAULT_PHRASE = "나는 AI와 함께 만들고 있다"

export function createFsModel(): FsModel {
  return {
    scene: "chaos",
    selected: null,
    goal: "welcome_text",
    previewText: DEFAULT_PHRASE,
    wrongAttempts: 0,
    aiBlocks: {
      analyze: false,
      file: false,
      forbid: false,
      done: false,
      verify: false,
    },
    compareMode: "split",
    paused: false,
  }
}

export type FsAction =
  | { readonly type: "SELECT_FILE"; readonly id: FileId }
  | { readonly type: "SET_SCENE"; readonly scene: FsScene }
  | { readonly type: "ADVANCE" }
  | { readonly type: "BACK" }
  | { readonly type: "TRY_FIND" }
  | { readonly type: "APPLY_EDIT" }
  | { readonly type: "TOGGLE_AI"; readonly key: keyof FsModel["aiBlocks"] }
  | { readonly type: "SET_COMPARE"; readonly mode: "single" | "split" }
  | { readonly type: "RESET" }
  | { readonly type: "PAUSE" }
  | { readonly type: "RESUME" }

const SCENE_ORDER: readonly FsScene[] = [
  "chaos",
  "roles",
  "find",
  "wrong",
  "edit",
  "ai_scope",
  "compare",
  "done",
]

export function fsReduce(model: FsModel, action: FsAction): FsModel {
  if (action.type === "RESET") return createFsModel()
  if (action.type === "PAUSE") return { ...model, paused: true }
  if (action.type === "RESUME") return { ...model, paused: false }
  if (model.paused && action.type === "ADVANCE") return model

  switch (action.type) {
    case "SELECT_FILE":
      return { ...model, selected: action.id }
    case "SET_SCENE":
      return { ...model, scene: action.scene }
    case "SET_COMPARE":
      return { ...model, compareMode: action.mode }
    case "TOGGLE_AI":
      return {
        ...model,
        aiBlocks: { ...model.aiBlocks, [action.key]: !model.aiBlocks[action.key] },
      }
    case "TRY_FIND": {
      if (model.selected === "js") {
        return { ...model, scene: "edit" }
      }
      return {
        ...model,
        scene: "wrong",
        wrongAttempts: model.wrongAttempts + 1,
      }
    }
    case "APPLY_EDIT": {
      if (model.selected !== "js") return model
      return {
        ...model,
        previewText: "Day 1 다음 — 파일을 읽을 수 있다",
        scene: "ai_scope",
      }
    }
    case "ADVANCE": {
      if (model.scene === "find") {
        return fsReduce(model, { type: "TRY_FIND" })
      }
      if (model.scene === "wrong") {
        return { ...model, scene: "find", selected: null }
      }
      if (model.scene === "edit") {
        return fsReduce(model, { type: "APPLY_EDIT" })
      }
      const i = SCENE_ORDER.indexOf(model.scene)
      const next = SCENE_ORDER[Math.min(i + 1, SCENE_ORDER.length - 1)]
      return { ...model, scene: next ?? model.scene }
    }
    case "BACK": {
      const i = SCENE_ORDER.indexOf(model.scene)
      if (i <= 0) return model
      return { ...model, scene: SCENE_ORDER[i - 1] ?? model.scene }
    }
    default:
      return model
  }
}

export function buildAiRequest(model: FsModel): string {
  const parts: string[] = []
  if (model.aiBlocks.analyze) {
    parts.push("먼저 이 프로젝트의 파일 구조를 분석해 주세요. 아직 파일은 수정하지 마세요.")
  }
  if (model.aiBlocks.file) {
    parts.push("화면 환영 문구를 담당하는 파일(src/main.js)만 수정해 주세요.")
  }
  if (model.aiBlocks.forbid) {
    parts.push("다른 파일은 변경하지 마세요.")
  }
  if (model.aiBlocks.done) {
    parts.push("완료 조건: 문구가 바뀌고 브라우저에서 확인할 수 있을 것.")
  }
  if (model.aiBlocks.verify) {
    parts.push("변경 후 실행/새로고침 방법도 알려 주세요.")
  }
  return parts.length ? parts.join("\n") : "(아래 블록을 켜면 요청문이 조립됩니다)"
}

export function ariaFor(model: FsModel): string {
  const labels: Record<FsScene, string> = {
    chaos: "여러 파일이 보입니다. 어디를 눌러야 할지 고르세요.",
    roles: "파일을 선택하면 역할이 표시됩니다.",
    find: "환영 문구 담당 파일을 찾아 선택하세요.",
    wrong: "선택과 목표가 잘 맞지 않습니다. 이유를 확인하세요.",
    edit: "올바른 파일입니다. 수정하면 미리보기가 바뀝니다.",
    ai_scope: "AI 요청 범위를 조합하세요.",
    compare: "단일 HTML과 분리 구조를 비교하세요.",
    done: "이 시뮬레이션 흐름을 마쳤습니다.",
  }
  return labels[model.scene]
}
