import fs from "node:fs"
import path from "node:path"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ju0o-ec967.web.app"
const lessonDir = "src/content/lessons/markdown"
const slugs = fs
  .readdirSync(lessonDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""))

const staticPaths = [
  "",
  "/community",
  "/materials",
  "/curriculum",
  "/glossary",
  "/resources",
  "/about",
  "/privacy",
  "/terms",
  "/license",
]

const urls = [
  ...staticPaths.map((p) => `${siteUrl}${p || "/"}`),
  ...slugs.map((slug) => `${siteUrl}/lessons/${slug}`),
]

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`

fs.writeFileSync(path.join("public", "sitemap.xml"), body)
console.log(`sitemap.xml written with ${urls.length} urls`)
