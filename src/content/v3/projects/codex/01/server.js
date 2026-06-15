'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const variant = process.argv[2] || 'starter';
const root = path.join(__dirname, variant);
const port = Number(process.env.PORT || 4173);
http.createServer((request, response) => {
  const target = path.join(root, request.url === '/' ? 'index.html' : request.url);
  if (!target.startsWith(root) || !fs.existsSync(target)) {
    response.writeHead(404); response.end('Not found'); return;
  }
  response.writeHead(200, { 'Content-Type': target.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8' });
  fs.createReadStream(target).pipe(response);
}).listen(port, () => console.log(`VIBE LAB ${variant}: http://localhost:${port}`));
