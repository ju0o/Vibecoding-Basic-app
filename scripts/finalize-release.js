'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.join(__dirname, '..');
const releaseDir = path.join(root, 'release');
const assetsDir = path.join(releaseDir, 'assets');
const docsDir = path.join(root, 'docs');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
const version = packageJson.version;
const productName = packageJson.build?.productName || 'VIBE STUDIO';
const executableName = `${productName} ${version}.exe`;
const releaseLabel = `V${version.split('.')[0]}`;

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function writePreviewPng(filePath) {
  const width = 1200;
  const height = 675;
  const data = Buffer.alloc((width * 4 + 1) * height);

  const setPixel = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * (width * 4 + 1) + 1 + x * 4;
    data[idx] = r;
    data[idx + 1] = g;
    data[idx + 2] = b;
    data[idx + 3] = a;
  };

  const fillRect = (x, y, w, h, color) => {
    for (let yy = y; yy < y + h; yy += 1) {
      for (let xx = x; xx < x + w; xx += 1) setPixel(xx, yy, ...color);
    }
  };

  const line = (x1, y1, x2, y2, color, thickness = 2) => {
    const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = Math.round(x1 + (x2 - x1) * t);
      const y = Math.round(y1 + (y2 - y1) * t);
      fillRect(x - thickness, y - thickness, thickness * 2 + 1, thickness * 2 + 1, color);
    }
  };

  for (let y = 0; y < height; y += 1) {
    data[y * (width * 4)] = 0;
    for (let x = 0; x < width; x += 1) {
      const nx = x / width;
      const ny = y / height;
      const glow = Math.max(0, 1 - Math.hypot(nx - 0.72, ny - 0.28) * 1.7);
      setPixel(x, y, 7 + glow * 80, 8 + ny * 28 + glow * 90, 26 + nx * 38 + glow * 120);
    }
  }

  fillRect(70, 70, 250, 535, [13, 16, 38, 245]);
  fillRect(345, 70, 785, 72, [18, 22, 48, 245]);
  fillRect(345, 166, 785, 410, [10, 13, 32, 235]);
  fillRect(380, 202, 310, 128, [25, 30, 62, 255]);
  fillRect(720, 202, 375, 128, [22, 27, 58, 255]);
  fillRect(380, 358, 715, 76, [18, 24, 52, 255]);
  fillRect(380, 460, 715, 76, [18, 24, 52, 255]);
  fillRect(98, 105, 76, 76, [103, 232, 249, 255]);
  fillRect(98, 218, 170, 18, [167, 139, 250, 255]);
  fillRect(98, 260, 130, 14, [80, 86, 126, 255]);
  fillRect(98, 310, 150, 14, [80, 86, 126, 255]);
  fillRect(98, 360, 110, 14, [80, 86, 126, 255]);
  fillRect(390, 86, 300, 14, [103, 232, 249, 255]);
  fillRect(390, 112, 520, 12, [102, 106, 150, 255]);
  line(510, 396, 590, 396, [103, 232, 249, 255], 3);
  line(590, 396, 690, 396, [167, 139, 250, 255], 3);
  line(690, 396, 790, 396, [52, 211, 153, 255], 3);
  line(790, 396, 890, 396, [52, 211, 153, 255], 3);
  fillRect(470, 382, 48, 28, [103, 232, 249, 255]);
  fillRect(610, 382, 48, 28, [167, 139, 250, 255]);
  fillRect(750, 382, 48, 28, [52, 211, 153, 255]);
  fillRect(890, 382, 48, 28, [52, 211, 153, 255]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(data)),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

function safeRemoveWinUnpacked() {
  const target = path.resolve(releaseDir, 'win-unpacked');
  const releaseRoot = path.resolve(releaseDir);
  if (target.startsWith(releaseRoot + path.sep) && fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }

  for (const entry of fs.readdirSync(releaseDir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (/\.nsis\.7z$|\.blockmap$|latest.*\.yml$/i.test(entry.name)) {
      fs.rmSync(path.join(releaseDir, entry.name), { force: true });
    }
  }
}

function writeReleaseDocs() {
  fs.mkdirSync(releaseDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });

  fs.writeFileSync(path.join(releaseDir, 'README-현장실행가이드.md'), `# ${productName} ${releaseLabel} 현장 실행 가이드

## 실행 방법
1. \`${executableName}\`를 더블클릭합니다.
2. Windows 보안 안내가 뜨면 \`추가 정보\` → \`실행\`을 선택합니다.
3. 첫 화면에서 진행할 강의 과정과 회차를 선택합니다.

## 전체화면
- 상단 우측 전체화면 버튼을 누릅니다.
- 단축키: \`Ctrl + F\`
- 나가기: \`Esc\`

## 강의 선택
- 왼쪽 사이드바에서 과정 선택
- 강의 카드의 \`강의 열기\` 클릭
- 하단 이전/다음 버튼으로 회차 이동

## 별첨자료 사용
- 왼쪽 \`수강생 자료\` 또는 \`강사 자료실\`을 클릭합니다.
- 과정과 회차 필터로 설치 체크리스트, 명령어 치트시트, 강사용 대본 등을 찾습니다.
- 상단 인쇄 버튼 또는 PDF 버튼으로 현장 출력 자료를 만들 수 있습니다.

## 발표자 HUD
- 강의 자료 내부 HUD에서는 현재 슬라이드와 발표 도구 안내를 확인합니다.
- 운영 콘솔의 발표자 메모 패널은 \`M\` 키로 열고 닫습니다.
- 일부 강의 자료 내부의 발표 노트는 \`N\` 키를 사용합니다.

## 레이저 포인터
- 세션 화면에서 \`L\` 키를 누르면 레이저 포인터가 켜집니다.
- 다시 \`L\` 키를 누르면 꺼집니다.
- 마우스 클릭 시 강조 pulse가 표시됩니다.

## 인터넷이 안 될 때
- 앱과 강의 HTML, 인터랙션 JS/CSS는 로컬에 포함되어 실행됩니다.
- 웹폰트 CDN이 불러와지지 않으면 기본 시스템 폰트로 표시됩니다.
- 외부 링크, 최신 AI 도구 사이트 접속, 온라인 영상 재생은 인터넷이 필요합니다.

## 빔프로젝터 연결 체크
- Windows 디스플레이 배율 100~125% 권장
- 해상도 1920x1080 또는 1600x900 권장
- 복제 모드보다 확장 모드에서 발표 화면을 먼저 확인
- 강의실 조명이 밝으면 화면 밝기와 contrast를 올림
`, 'utf-8');

  fs.writeFileSync(path.join(releaseDir, 'CHECKLIST-강의전점검.md'), `# ${productName} ${releaseLabel} 강의 전 QA 체크리스트

## 실행
- [ ] Windows에서 \`${executableName}\` 실행 확인
- [ ] 앱 창 제목이 \`VIBE STUDIO · 강의 운영 콘솔\`로 표시되는지 확인
- [ ] EXE 파일명이 \`${executableName}\`인지 확인
- [ ] 인터넷 OFF 상태에서 앱 첫 화면이 열리는지 확인

## 강의 자료
- [ ] 1강 실행 확인
- [ ] 2강 실행 확인
- [ ] 3강 실행 확인
- [ ] 4강 실행 확인
- [ ] 5강 실행 확인
- [ ] 6강 실행 확인
- [ ] 별첨자료 목록 실행 확인
- [ ] 응용·수익화반 강의 실행 확인
- [ ] AI 워크스페이스 심화반 강의 실행 확인
- [ ] SaaS·외주·자동화·MCP·Skill 강의 실행 확인
- [ ] Agent·Agent Teams·Claude Code·Codex 강의 실행 확인
- [ ] 강사 양성과정 실행 확인
- [ ] 과정별 수강생 워크북과 강사용 운영 가이드 확인
- [ ] PDF 저장 또는 인쇄 버튼 확인

## 인터랙션
- [ ] 2강 터미널 시뮬레이션 실행
- [ ] 2강 AI 채팅 시뮬레이션 실행
- [ ] 3강 API 데이터 흐름 시뮬레이션 실행
- [ ] 3강 드래그 분류 실습 실행
- [ ] 4강 파일 구조 탐색 실행
- [ ] 5강 배포 시각화 실행
- [ ] 5강 에러 해결 시뮬레이션 실행

## 발표 환경
- [ ] 전체화면 전환 확인
- [ ] \`Esc\`로 전체화면 해제 확인
- [ ] \`L\` 키 레이저 포인터 확인
- [ ] 발표자 HUD 가독성 확인
- [ ] 스피커/마이크 필요 여부 확인
- [ ] 화면비 16:9 확인
- [ ] 빔프로젝터 해상도와 배율 확인
`, 'utf-8');

  fs.writeFileSync(path.join(docsDir, `${releaseLabel}_RELEASE_REPORT.md`), `# ${productName} ${releaseLabel} 릴리즈 완료 보고서

## 버전
- 앱 버전: ${version}
- 프로그램명: ${productName}
- 포함 과정: 13개 과정, 70개 실행 강의
- 전문 과정: 응용·수익화, AI 심화, SaaS, 외주, 자동화, MCP, Skill, Agent, Agent Teams, Claude Code, Codex, 강사 마스터

## 릴리즈 산출물
- release/${executableName}
- release/README-현장실행가이드.md
- release/CHECKLIST-강의전점검.md
- release/assets/preview.png

## 포함 기능
- 전체 과정 카탈로그와 과정별 대시보드
- 강의 일정 및 운영 메모
- 수강생 자료실과 강사 자료실
- 기초반 1~6강과 64개 공통 엔진 전문 강의
- 12개 후속 과정별 수강생 워크북과 강사용 운영 가이드
- 인쇄/PDF 저장
- 발표자 모드와 화면 판서
- 파일트리, 배포, 보안, 제품 설계와 Agent 흐름 인터랙션

## 아이콘 교체 방법
1. \`build/icon.ico\` 파일을 원하는 아이콘으로 교체합니다.
2. \`npm run release:current\`를 실행합니다.
3. 아이콘 파일이 없으면 electron-builder와 앱 창 모두 기본 아이콘으로 fallback됩니다.

## 빌드 명령어
\`\`\`bash
npm run release:current
\`\`\`
`, 'utf-8');
}

safeRemoveWinUnpacked();
writeReleaseDocs();
writePreviewPng(path.join(assetsDir, 'preview.png'));
console.log(`✓ release ${version} finalized`);
