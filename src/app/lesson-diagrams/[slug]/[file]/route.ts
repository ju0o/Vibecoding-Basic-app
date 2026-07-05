import { readFile } from "node:fs/promises"
import { join, normalize } from "node:path"
import { NextResponse } from "next/server"

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
