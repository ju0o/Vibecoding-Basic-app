'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const root = path.join(__dirname, '..');
const jsonPath = path.join(root, 'src', 'content', 'sources', 'official-sources.json');
const jsPath = path.join(root, 'src', 'content', 'sources', 'official-sources.js');
const catalog = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const allowedHosts = [
  'docs.github.com',
  'nodejs.org',
  'code.visualstudio.com',
  'developer.mozilla.org',
  'docs.npmjs.com',
  'firebase.google.com',
  'vercel.com',
  'modelcontextprotocol.io',
  'docs.anthropic.com',
  'code.claude.com',
  'developers.openai.com',
];

function writeOutputs() {
  fs.writeFileSync(jsonPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(jsPath, `window.VIBE_OFFICIAL_SOURCES = ${JSON.stringify(catalog, null, 2)};\n`, 'utf-8');
}

function request(url, redirects = 0) {
  return new Promise((resolve) => {
    if (redirects > 6) return resolve({ ok: false, status: 0, finalUrl: url, title: '', error: 'too many redirects' });
    let parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      return resolve({ ok: false, status: 0, finalUrl: url, title: '', error: error.message });
    }
    if (!allowedHosts.includes(parsed.hostname)) {
      return resolve({ ok: false, status: 0, finalUrl: url, title: '', error: `host not allowed: ${parsed.hostname}` });
    }
    const client = parsed.protocol === 'http:' ? http : https;
    const req = client.get(parsed, {
      headers: {
        'User-Agent': 'VIBE-STUDIO-Sources/3.0',
        Accept: 'text/html,application/xhtml+xml',
      },
      timeout: 15000,
    }, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        response.resume();
        const nextUrl = new URL(response.headers.location, parsed).toString();
        return resolve(request(nextUrl, redirects + 1));
      }
      let body = '';
      response.setEncoding('utf-8');
      response.on('data', (chunk) => {
        if (body.length < 250000) body += chunk;
      });
      response.on('end', () => {
        const title = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
          ?.replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim() || '';
        resolve({
          ok: response.statusCode >= 200 && response.statusCode < 400,
          status: response.statusCode || 0,
          finalUrl: parsed.toString(),
          title,
          error: '',
        });
      });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', (error) => resolve({ ok: false, status: 0, finalUrl: url, title: '', error: error.message }));
  });
}

async function main() {
  const checkedAt = new Date().toISOString();
  let okCount = 0;
  for (const [key, source] of Object.entries(catalog.sources)) {
    const result = await request(source.url);
    source.checkedAt = checkedAt;
    source.httpStatus = result.status;
    source.status = result.ok ? 'verified' : 'unavailable';
    source.finalUrl = result.finalUrl;
    if (result.title) source.pageTitle = result.title;
    if (result.error) source.lastError = result.error;
    else delete source.lastError;
    if (result.ok) okCount += 1;
    console.log(`${result.ok ? '✓' : '!'} ${key} ${result.status || result.error}`);
  }
  catalog.checkedAt = checkedAt;
  writeOutputs();
  console.log(`Official sources refreshed: ${okCount}/${Object.keys(catalog.sources).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
