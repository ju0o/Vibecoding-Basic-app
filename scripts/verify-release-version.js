'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
const lockJson = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf-8'));
const requestedTag = process.argv[2] || process.env.GITHUB_REF_NAME || '';
const expectedTag = `v${packageJson.version}`;

if (lockJson.version !== packageJson.version) {
  console.error(`package-lock.json 버전(${lockJson.version})이 package.json 버전(${packageJson.version})과 다릅니다.`);
  process.exit(1);
}

if (requestedTag && requestedTag !== expectedTag) {
  console.error(`릴리즈 태그(${requestedTag})와 앱 버전(${packageJson.version})이 다릅니다. 예상 태그: ${expectedTag}`);
  process.exit(1);
}

console.log(`릴리즈 버전 확인 완료: ${expectedTag}`);
