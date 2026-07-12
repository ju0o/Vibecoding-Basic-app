const urls = [
  "https://ju0o-ec967.web.app/",
  "https://ju0o-ec967.web.app/about",
  "https://ju0o-ec967.web.app/privacy",
  "https://ju0o-ec967.web.app/terms",
  "https://ju0o-ec967.web.app/robots.txt",
  "https://ju0o-ec967.web.app/sitemap.xml",
  "https://ju0o-ec967.web.app/favicon.svg",
  "https://ju0o-ec967.web.app/lessons/ai-vibe-coding-orientation",
]

for (const u of urls) {
  const r = await fetch(u, { redirect: "follow" })
  const t = await r.text()
  const hasGate = t.includes("접속 비밀번호")
  const robotsMeta = t.match(/name="robots" content="([^"]+)"/)?.[1] ?? "n/a"
  console.log(r.status, u, "gate?", hasGate, "robots", robotsMeta)
}
