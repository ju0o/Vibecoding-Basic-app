'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const iconPath = path.join(buildDir, 'icon.ico');
const releaseDir = path.join(root, 'release');

function cleanGeneratedReleaseFiles() {
  fs.mkdirSync(releaseDir, { recursive: true });
  const allowedDirectories = new Set(['assets']);
  for (const entry of fs.readdirSync(releaseDir, { withFileTypes: true })) {
    const target = path.resolve(releaseDir, entry.name);
    if (!target.startsWith(path.resolve(releaseDir) + path.sep)) continue;
    if (entry.isDirectory()) {
      if (!allowedDirectories.has(entry.name)) fs.rmSync(target, { recursive: true, force: true });
      continue;
    }
    if (/\.exe$|\.blockmap$|\.yml$|\.nsis\.7z$|^SHA256SUMS\.txt$|^README-|^CHECKLIST-/i.test(entry.name)) {
      fs.rmSync(target, { force: true });
    }
  }
}

function clamp(value, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function pointInPolygon(x, y, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0], yi = points[i][1];
    const xj = points[j][0], yj = points[j][1];
    const intersect = ((yi > y) !== (yj > y)) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function createIconPixels(size) {
  const pixels = Buffer.alloc(size * size * 4);
  const bolt = [
    [142, 30],
    [78, 132],
    [122, 132],
    [102, 226],
    [182, 104],
    [135, 104],
  ];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = x / (size - 1);
      const ny = y / (size - 1);
      const dx = nx - 0.5;
      const dy = ny - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - dist * 1.75);
      let r = 7 + 74 * nx + 65 * glow;
      let g = 8 + 56 * ny + 90 * glow;
      let b = 26 + 118 * (1 - nx) + 132 * glow;
      let a = 255;

      const corner = Math.max(Math.abs(x - size / 2), Math.abs(y - size / 2));
      if (corner > size * 0.48) a = clamp(255 - (corner - size * 0.48) * 28, 0, 255);

      const ring = Math.abs(dist - 0.36);
      if (ring < 0.012) {
        r = 103;
        g = 232;
        b = 249;
      }

      if (pointInPolygon(x, y, bolt)) {
        r = 245;
        g = 248;
        b = 255;
      }

      const idx = (y * size + x) * 4;
      pixels[idx] = clamp(r);
      pixels[idx + 1] = clamp(g);
      pixels[idx + 2] = clamp(b);
      pixels[idx + 3] = a;
    }
  }

  return pixels;
}

function writeIco(filePath) {
  const size = 256;
  const rgba = createIconPixels(size);
  const xor = Buffer.alloc(size * size * 4);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const source = (y * size + x) * 4;
      const target = ((size - 1 - y) * size + x) * 4;
      xor[target] = rgba[source + 2];
      xor[target + 1] = rgba[source + 1];
      xor[target + 2] = rgba[source];
      xor[target + 3] = rgba[source + 3];
    }
  }

  const mask = Buffer.alloc(size * Math.ceil(size / 32) * 4);
  const dib = Buffer.alloc(40);
  dib.writeUInt32LE(40, 0);
  dib.writeInt32LE(size, 4);
  dib.writeInt32LE(size * 2, 8);
  dib.writeUInt16LE(1, 12);
  dib.writeUInt16LE(32, 14);
  dib.writeUInt32LE(0, 16);
  dib.writeUInt32LE(xor.length, 20);

  const image = Buffer.concat([dib, xor, mask]);
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = 0;
  entry[1] = 0;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.concat([header, entry, image]));
}

cleanGeneratedReleaseFiles();

if (fs.existsSync(iconPath)) {
  console.log(`✓ brand icon exists: ${path.relative(root, iconPath)}`);
} else {
  writeIco(iconPath);
  console.log(`✓ default brand icon generated: ${path.relative(root, iconPath)}`);
}
