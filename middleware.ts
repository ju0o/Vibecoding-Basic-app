import { type NextRequest, NextResponse } from "next/server"

const AUTH_REALM = "AI Vibe Coding Master"
const DEFAULT_USERNAME = "ai-vibe"

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next()
  }

  const sitePassword = process.env["SITE_PASSWORD"]

  if (sitePassword === undefined || sitePassword.length === 0) {
    return privateResponse("SITE_PASSWORD is required for private deployment.", 503)
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"))
  const siteUsername = process.env["SITE_USERNAME"] ?? DEFAULT_USERNAME

  if (credentials?.username === siteUsername && credentials.password === sitePassword) {
    const response = NextResponse.next()
    setRobotsHeader(response)
    return response
  }

  return privateResponse("Authentication required.", 401)
}

function parseBasicAuth(
  header: string | null,
): { readonly username: string; readonly password: string } | undefined {
  if (header === null || !header.startsWith("Basic ")) {
    return undefined
  }

  try {
    const decoded = atob(header.slice("Basic ".length))
    const separatorIndex = decoded.indexOf(":")

    if (separatorIndex === -1) {
      return undefined
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    }
  } catch {
    return undefined
  }
}

function privateResponse(message: string, status: 401 | 503): NextResponse {
  const response = new NextResponse(message, { status })
  response.headers.set("WWW-Authenticate", `Basic realm="${AUTH_REALM}", charset="UTF-8"`)
  setRobotsHeader(response)
  return response
}

function setRobotsHeader(response: NextResponse): void {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
}
