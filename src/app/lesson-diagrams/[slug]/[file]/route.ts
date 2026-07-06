import { readdir, readFile } from "node:fs/promises"
import { join, normalize } from "node:path"
import { NextResponse } from "next/server"

// 정적 내보내기(output: "export")용: 빌드 시 모든 다이어그램 경로를 열거해 정적 파일로 생성한다.
export const dynamic = "force-static"

export async function generateStaticParams() {
  const root = join(process.cwd(), "src", "content", "lessons", "diagrams")
  try {
    const slugs = await readdir(root, { withFileTypes: true })
    const params: { slug: string; file: string }[] = []
    for (const entry of slugs) {
      if (!entry.isDirectory()) {
        continue
      }
      const files = await readdir(join(root, entry.name))
      for (const file of files) {
        if (file.endsWith(".svg")) {
          params.push({ slug: entry.name, file })
        }
      }
    }
    return params
  } catch {
    return []
  }
}

type DiagramRouteContext = {
  readonly params: Promise<{
    readonly slug: string
    readonly file: string
  }>
}

const DIAGRAM_ROOT = join(process.cwd(), "src", "content", "lessons", "diagrams")

export async function GET(_request: Request, context: DiagramRouteContext) {
  const { file, slug } = await context.params
  const safeFile = file.endsWith(".svg") ? file : `${file}.svg`
  const diagramPath = normalize(join(DIAGRAM_ROOT, slug, safeFile))

  if (!diagramPath.startsWith(DIAGRAM_ROOT)) {
    return NextResponse.json({ error: "Invalid diagram path" }, { status: 400 })
  }

  try {
    const svg = await readFile(diagramPath, "utf8")

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return NextResponse.json({ error: "Diagram not found" }, { status: 404 })
  }
}
