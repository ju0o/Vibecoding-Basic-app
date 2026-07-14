/**
 * Day 1 sample: zero external dependencies.
 * Serves files from ./src on http://127.0.0.1:3456
 * Requires Node.js only (why we install Node).
 */
const http = require("node:http")
const fs = require("node:fs")
const path = require("node:path")

const PORT = 3456
const ROOT = path.join(__dirname, "src")

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0])
  const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "")
  let filePath = path.join(ROOT, safe === path.sep ? "index.html" : safe)

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403)
    res.end("Forbidden")
    return
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html")
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
      res.end(`Not found: ${urlPath}`)
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" })
    res.end(data)
  })
})

server.listen(PORT, "127.0.0.1", () => {
  console.log("")
  console.log("  Day 1 sample server is running.")
  console.log(`  Open in browser:  http://127.0.0.1:${PORT}`)
  console.log("  Stop: Ctrl+C")
  console.log("")
})
