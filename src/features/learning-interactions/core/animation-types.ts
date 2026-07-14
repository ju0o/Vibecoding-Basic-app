/** Shared types for learning interactive animations (no external SM libs). */

export type AnimationControlAction = "advance" | "back" | "reset" | "pause" | "resume"

export type ServerVisualStatus = "idle" | "starting" | "running" | "error"

export type FileNodeVisual = {
  readonly id: string
  readonly name: string
  readonly kind: "file" | "folder"
  readonly depth: number
  readonly role: string
  readonly highlight?: boolean
}

export type TerminalLine = {
  readonly id: string
  readonly kind: "input" | "output" | "success" | "error" | "info"
  readonly text: string
}

export type PreviewModel = {
  readonly title: string
  readonly message: string
  readonly accent: string
  readonly showButton: boolean
  readonly note?: string
}
