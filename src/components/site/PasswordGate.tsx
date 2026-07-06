"use client"

import { type FormEvent, type ReactNode, useEffect, useState } from "react"

// 정적 호스팅(Firebase Hosting) 제약으로 서버 미들웨어 대신 사용하는 화면 게이트.
// 번들에는 비밀번호의 SHA-256 해시만 포함되며, 해제 상태는 localStorage에 해시값으로 저장되어
// 비밀번호를 바꾸면(해시 변경) 기존 해제가 자동 무효화된다.
const STORAGE_KEY = "avcm-unlock"
const PASSWORD_HASH = process.env.NEXT_PUBLIC_SITE_PASSWORD_HASH

type GateState = "checking" | "locked" | "unlocked"

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

export function PasswordGate({ children }: { readonly children: ReactNode }) {
  const [state, setState] = useState<GateState>("checking")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (PASSWORD_HASH === undefined || PASSWORD_HASH.length === 0) {
      // 해시 미설정: 개발 환경은 통과, 프로덕션 빌드는 잠금 화면에서 설정 방법을 안내한다.
      setState(process.env.NODE_ENV === "development" ? "unlocked" : "locked")
      return
    }
    setState(window.localStorage.getItem(STORAGE_KEY) === PASSWORD_HASH ? "unlocked" : "locked")
  }, [])

  if (state === "unlocked") {
    return <>{children}</>
  }

  if (state === "checking") {
    return <div aria-hidden className="min-h-[100dvh]" />
  }

  const hashMissing = PASSWORD_HASH === undefined || PASSWORD_HASH.length === 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (hashMissing) {
      return
    }
    const input = new FormData(event.currentTarget).get("password")
    const entered = typeof input === "string" ? input : ""
    if ((await sha256Hex(entered)) === PASSWORD_HASH) {
      window.localStorage.setItem(STORAGE_KEY, PASSWORD_HASH as string)
      setError(false)
      setState("unlocked")
      return
    }
    setError(true)
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border-default,#e2e8f0)] p-8 shadow-sm">
        <h1 className="text-lg font-bold">AI Vibe Coding Master</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary,#64748b)]">
          비공개 학습 사이트입니다. 접속 비밀번호를 입력하세요.
        </p>
        {hashMissing ? (
          <p className="mt-4 text-sm text-red-600">
            비밀번호가 설정되지 않았습니다. 프로젝트 루트의 <code>.env.local</code>에{" "}
            <code>NEXT_PUBLIC_SITE_PASSWORD_HASH</code>를 설정하고 다시 빌드·배포하세요. (방법:
            ai-ops/DEPLOY-GUIDE.md)
          </p>
        ) : (
          <form className="mt-5 flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              aria-label="접속 비밀번호"
              className="rounded-lg border border-[var(--border-default,#cbd5e1)] bg-transparent px-3 py-2 text-sm outline-none focus:border-[var(--accent,#0f766e)]"
              name="password"
              placeholder="비밀번호"
              type="password"
            />
            <button
              className="rounded-lg bg-[var(--accent,#0f766e)] px-3 py-2 text-sm font-semibold text-white"
              type="submit"
            >
              입장
            </button>
            {error ? <p className="text-sm text-red-600">비밀번호가 올바르지 않습니다.</p> : null}
          </form>
        )}
      </div>
    </div>
  )
}
