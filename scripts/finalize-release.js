'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const releaseDir = path.join(root, 'release');
const assetsDir = path.join(releaseDir, 'assets');
const docsDir = path.join(root, 'docs');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'));
const version = packageJson.version;
const productName = packageJson.build?.productName || 'VIBE STUDIO';
const executableName = `${productName} ${version}.exe`;
const releaseLabel = `V${version.split('.')[0]} BETA`;

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
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
  const smokePreview = path.join(root, 'artifacts', 'qa', 'studio-1920x1080.png');
  if (fs.existsSync(smokePreview)) {
    fs.copyFileSync(smokePreview, filePath);
    return;
  }

  const width = 1200;
  const height = 675;
  const data = Buffer.alloc((width * 4 + 1) * height);
  const setPixel = (x, y, color) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const offset = y * (width * 4 + 1) + 1 + x * 4;
    [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]] = [...color, 255];
  };
  const fill = (x, y, w, h, color) => {
    for (let yy = y; yy < y + h; yy += 1) {
      for (let xx = x; xx < x + w; xx += 1) setPixel(xx, yy, color);
    }
  };
  for (let y = 0; y < height; y += 1) {
    data[y * (width * 4)] = 0;
    for (let x = 0; x < width; x += 1) setPixel(x, y, [13, 14, 16]);
  }
  fill(0, 0, 220, height, [17, 19, 22]);
  fill(220, 0, 390, height, [18, 20, 22]);
  fill(610, 0, 590, height, [23, 26, 29]);
  fill(18, 18, 34, 34, [216, 255, 102]);
  for (let index = 0; index < 5; index += 1) {
    fill(18, 105 + index * 72, 184, 54, index === 0 ? [27, 31, 34] : [17, 19, 22]);
    fill(28, 117 + index * 72, 28, 28, index === 0 ? [216, 255, 102] : [31, 37, 41]);
  }
  fill(245, 98, 330, 2, [216, 255, 102]);
  for (let index = 0; index < 6; index += 1) fill(245, 175 + index * 67, 330, 53, index === 5 ? [28, 32, 35] : [18, 20, 22]);
  fill(660, 115, 310, 38, [244, 245, 242]);
  fill(660, 180, 460, 80, [28, 32, 35]);
  fill(660, 290, 220, 105, [20, 23, 25]);
  fill(900, 290, 220, 105, [20, 23, 25]);
  fill(660, 430, 120, 42, [216, 255, 102]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  fs.writeFileSync(filePath, Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(data)),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

function cleanReleaseDirectory() {
  fs.mkdirSync(releaseDir, { recursive: true });
  const archiveDir = path.join(root, 'output', 'release-archive');
  fs.mkdirSync(archiveDir, { recursive: true });
  const allowedFiles = new Set([
    executableName,
    'README-현장실행가이드.md',
    'CHECKLIST-강의전점검.md',
    'SHA256SUMS.txt',
  ]);
  const allowedDirectories = new Set(['assets']);
  const unpacked = path.resolve(releaseDir, 'win-unpacked');
  if (unpacked.startsWith(path.resolve(releaseDir) + path.sep) && fs.existsSync(unpacked)) {
    fs.rmSync(unpacked, { recursive: true, force: true });
  }
  for (const entry of fs.readdirSync(releaseDir, { withFileTypes: true })) {
    const source = path.join(releaseDir, entry.name);
    if (entry.isDirectory()) {
      if (allowedDirectories.has(entry.name)) continue;
      const destination = path.join(archiveDir, entry.name);
      fs.rmSync(destination, { recursive: true, force: true });
      fs.renameSync(source, destination);
      continue;
    }
    if (allowedFiles.has(entry.name)) continue;
    if (/\.nsis\.7z$|\.blockmap$|latest.*\.yml$|^builder-.*\.(yml|yaml)$/i.test(entry.name)) {
      fs.rmSync(source, { force: true });
      continue;
    }
    const parsed = path.parse(entry.name);
    let destination = path.join(archiveDir, entry.name);
    if (fs.existsSync(destination)) {
      destination = path.join(archiveDir, `${parsed.name}-${Date.now()}${parsed.ext}`);
    }
    fs.renameSync(source, destination);
  }
}

function writeReleaseDocs() {
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });

  fs.writeFileSync(path.join(releaseDir, 'README-현장실행가이드.md'), `# ${productName} ${releaseLabel} 현장 실행 가이드

## 실행
1. \`${executableName}\`를 실행합니다.
2. Windows 보안 안내가 뜨면 \`추가 정보\`와 \`실행\`을 선택합니다.
3. 앱은 현재 2기 기초반의 마지막 강의를 선택한 상태로 시작합니다.

## 화면 구조
- 왼쪽: 과정, 일정 및 메모, 화면 설정
- 가운데: 강의, 강사자료실, 수강생 출력물, 실습파일, 공식자료 학습실
- 오른쪽: 목표, 준비물, 결과물과 실행 버튼
- 빠른 검색: \`Ctrl + K\`

## 강의와 자료
- 과정 선택 후 \`강의 / 강사자료실 / 수강생 출력물 / 실습파일 / 공식자료 학습실\` 탭을 사용합니다.
- \`실습파일\` 탭에서 starter·broken·complete를 미리 보거나 문서 폴더로 추출합니다.
- \`공식자료 학습실\`에서 공식 문서의 배경, 쉬운 비유, 오해, 시연 포인트와 수업 전 체크를 확인합니다.
- 자료를 열면 상단 인쇄 또는 PDF 저장 버튼을 사용할 수 있습니다.
- 현재 2기 회차는 \`현재 운영본 / V3 개편 작업본\` 중 하나를 검수하고 회차별로 운영본에 승격할 수 있습니다.

## 백업과 복원
- 화면 설정에서 기수 일정, 메모, 진행률과 활성 강의 버전을 ZIP 또는 JSON으로 백업합니다.
- 복원 후 앱이 다시 열리면 백업한 운영 상태가 적용됩니다.

## 발표
- 전체화면: \`Ctrl + F\`
- 전체화면 나가기: \`Esc\`
- 강의 화면 판서: 플레이어 상단 연필 버튼
- 발표자 메모: 플레이어 상단 메모 버튼
- V3 애니메이션: 자동 진행하지 않고 슬라이드 안의 시작·다음·일시정지·초기화 버튼으로 제어

## 인터넷이 없을 때
- 앱, 현재 1~6강, V3 강의 엔진과 자료는 로컬에서 실행됩니다.
- 공식 문서 열기, 도구 로그인, 실제 배포와 외부 영상은 인터넷이 필요합니다.
- 오프라인 강의 전에는 필요한 웹 화면을 캡처해 둡니다.

## 빔프로젝터
- 권장 해상도: 1920×1080 또는 1280×720
- Windows 배율: 100~125%
- 강의 시작 전 복제·확장 모드, 화면비, 스피커와 전체화면을 확인합니다.
`, 'utf-8');

  fs.writeFileSync(path.join(releaseDir, 'CHECKLIST-강의전점검.md'), `# ${productName} ${releaseLabel} 강의 전 점검

## 앱
- [ ] \`${executableName}\` 실행
- [ ] 단일 강사용 스튜디오에서 6개 과정 표시
- [ ] 현재 2기 기초반 1~6강 실행
- [ ] 다음 기수 4주 개편본 표시
- [ ] \`Ctrl+K\` 검색

## V3
- [ ] 제품·수익화 8강 실행
- [ ] Workflow Architect 4강 실행
- [ ] Claude Code Professional 6강 실행
- [ ] Codex Professional 6강 실행
- [ ] 시작·다음·일시정지·초기화
- [ ] 현재 2기 운영본·V3 작업본 전환과 승격
- [ ] 실습 파일 starter·broken·complete 실행
- [ ] 오류 복구·타이머·다음 강의 화면

## 자료
- [ ] 선택 과정의 수강생 자료 6종
- [ ] 선택 과정의 강사 자료 7종
- [ ] 공식자료 학습실 39개 연구노트
- [ ] A4 인쇄와 PDF 저장
- [ ] 밝은 배경, 글자 대비와 페이지 분할

## 현장
- [ ] 인터넷 OFF 기본 실행
- [ ] 1280×720 또는 1920×1080
- [ ] 전체화면과 Esc
- [ ] 판서와 발표자 메모
- [ ] ZIP/JSON 백업과 복원
- [ ] 빔프로젝터 화면비와 스피커
`, 'utf-8');

  fs.writeFileSync(path.join(docsDir, 'V3_BETA_RELEASE_REPORT.md'), `# ${productName} ${releaseLabel} 릴리즈 보고서

## 버전
- 앱: ${version}
- 현재 운영본: 기초반 2기 6주, 활성 파일 해시 보호와 회차별 V3 작업본
- 강사용 스튜디오 과정: 6개
- 수강생 출력물: 선택 과정별 인쇄·PDF 관리
- V3 개편 회차: 현재 2기 작업본 6개 + 신규 과정 28개

## 구현
- 카드 카탈로그를 3단 Curriculum Studio로 교체
- 학생/강사 모드 토글 제거와 단일 강사용 스튜디오
- 강사자료실, 수강생 출력물, 실습파일, 공식자료 학습실 탭
- Ctrl+K 과정·회차·자료·실습파일·공식자료 검색
- 8개 장면군과 34개 고유 scene id를 가진 수동 시뮬레이션 레지스트리
- 회차별 starter·broken·complete 실행 실습 패키지
- 수강생 6종·강사 7종 자료 엔진과 13장별 상세 대본
- 회차별 운영본 승격·복구, 실습 파일 추출, ZIP/JSON 백업
- 공식 출처 39개 갱신과 강사용 연구 필드 확장
- A4 PDF 71종 자동 QA

## 검증
- V2 동결 파일 13개 해시 일치
- 1280×720, 1366×768, 1920×1080 Electron 스모크 통과
- 현재 작업본 포함 34개 회차 전수 스모크 통과
- 공식 출처 39개 응답 확인
- A4 자료 71종 페이지 분할 검사 통과

## 산출물
- \`release/${executableName}\`
- \`release/README-현장실행가이드.md\`
- \`release/CHECKLIST-강의전점검.md\`
- \`release/assets/preview.png\`

## 아이콘 교체
1. \`build/icon.ico\`를 교체합니다.
2. \`npm run release:v3-beta\`를 실행합니다.
3. 아이콘이 없으면 앱과 빌더의 기본 아이콘을 사용합니다.
`, 'utf-8');

  const executablePath = path.join(releaseDir, executableName);
  if (fs.existsSync(executablePath)) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(executablePath)).digest('hex');
    fs.writeFileSync(path.join(releaseDir, 'SHA256SUMS.txt'), `${hash}  ${executableName}\n`, 'ascii');
  }
}

cleanReleaseDirectory();
writeReleaseDocs();
writePreviewPng(path.join(assetsDir, 'preview.png'));
console.log(`✓ release ${version} finalized`);
