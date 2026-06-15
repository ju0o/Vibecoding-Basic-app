const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.argv[2] || 4173);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, `http://127.0.0.1:${port}`).pathname);
  const target = path.resolve(root, `.${requestPath}`);

  if (!target.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const resolved = fs.existsSync(target) && fs.statSync(target).isDirectory()
    ? path.join(target, "index.html")
    : target;

  fs.readFile(resolved, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mime[path.extname(resolved).toLowerCase()] || "application/octet-stream"
    });
    response.end(content);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview server: http://127.0.0.1:${port}`);
});
