/**
 * Export student Day 1 Markdown meaning into review DOCX (derivative, not SSOT).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  TextRun,
  Header,
  BorderStyle,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(
  ROOT,
  "exports/student/DAY1-처음으로-AI와-프로그램-실행하기.docx",
);

const blue = "1E3A5F";
const gray = "555555";

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 160 },
    ...opts,
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: opts.size || 22,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color,
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: blue })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: blue })],
  });
}

function code(text) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 24, color: "94A3B8", space: 8 },
    },
    indent: { left: 200 },
    children: [new TextRun({ text, font: "Consolas", size: 18 })],
  });
}

function bullet(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22 })],
  });
}

function note(text) {
  return p(text, { italics: true, color: gray, size: 20 });
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "checks",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "☐",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1008, right: 1008, bottom: 1008, left: 1008 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Day 1 학생용 · DERIVATIVE of content/courses/.../01-first-success.md",
                  font: "Arial",
                  size: 16,
                  color: gray,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", font: "Arial", size: 16, color: gray }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: gray }),
                new TextRun({
                  text: " · Website not wired · SSOT is Markdown",
                  font: "Arial",
                  size: 16,
                  color: gray,
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "AI · 바이브코딩 교육",
              font: "Arial",
              size: 24,
              color: gray,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: "Day 1",
              font: "Arial",
              size: 48,
              bold: true,
              color: blue,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "처음으로 AI와 프로그램 실행하기",
              font: "Arial",
              size: 36,
              bold: true,
            }),
          ],
        }),
        p("학생용 교재 (비개발자 기준)", { bold: true }),
        note(
          "원본 SSOT: content/courses/vibe-coding-foundation/lessons/01-first-success.md · 이 파일은 검토용 파생본입니다.",
        ),
        note("Path A = 설치 없이 첫 성공 · Path B = 로컬 환경(시간 보장 없음)"),

        h1("1. 오늘의 목표"),
        p(
          "오늘은 AI, LLM, Node를 긴 이론부터 배우지 않습니다. 먼저 작은 성공을 경험하고, 그 과정에서 생긴 질문으로 원리를 붙입니다.",
        ),
        p("핵심 메시지:", { bold: true }),
        p(
          "AI에게 요청해서 결과물을 만들 수 있다. 그리고 그 결과가 어떻게 실행됐는지 조금씩 이해하기 시작한다.",
        ),

        h1("2. 오늘 만들 결과"),
        bullet("브라우저에서 열리는 작은 페이지(제목·문구를 내가 바꿈)", "bullets"),
        bullet(
          "(가능하면) 내 컴퓨터에서 개발 서버를 켠 프로젝트 화면",
          "bullets",
        ),

        h1("3. 시작 전 확인"),
        bullet("인터넷이 된다", "checks"),
        bullet("브라우저가 있다 (Chrome, Edge, Safari, Firefox 등)", "checks"),
        bullet(
          "AI 채팅을 쓸 수 있다 (이미 쓰는 것. 특정 유료 제품 필수 아님)",
          "checks",
        ),
        bullet("(Path B) 프로그램 설치 권한이 있는지 대략 안다", "checks"),
        p("막혀도 전부 실패가 아닙니다. Path A만으로도 첫 성공은 가능합니다."),

        h1("4. Path A — 설치 없이 첫 성공 (약 10분 목표)"),
        note("Path B와 혼동하지 마세요. Path A는 로컬 Node 설치가 필요 없습니다."),
        h2("목표"),
        p(
          "복잡한 설치 없이 작은 결과물을 보고 “내가 시켰다 → 결과가 나왔다”를 느낍니다.",
        ),
        h2("방법 A1 — HTML 파일 + 브라우저 (기본 추천)"),
        p("1) AI에게 아래처럼 요청합니다."),
        code(
          '초보자용으로, 외부 라이브러리 없이 단일 HTML 파일 하나만 만들어 주세요. 제목은 "나의 첫 바이브코딩", 본문에 "안녕하세요"를 넣고, 배경색은 아주 연한 파란색으로 해 주세요. 파일 내용 전체를 코드 블록으로 주세요.',
        ),
        p("2) AI가 준 코드 전체를 복사합니다."),
        p("3) 메모장(Windows) 또는 TextEdit(macOS)을 엽니다."),
        p("4) 붙여넣고 hello-vibe.html 로 저장합니다."),
        bullet("Windows: 인코딩 UTF-8, 확장자가 정말 .html 인지 확인", "bullets"),
        bullet("macOS: 일반 텍스트로 저장, 확장자 .html", "bullets"),
        p("5) 파일을 브라우저로 엽니다 (더블클릭 또는 끌어다 놓기)."),
        p("6) 제목과 “안녕하세요”가 보이면 첫 성공입니다."),
        h2("방법 A2 (선택)"),
        p(
          "이미 쓰는 AI에 미리보기가 있으면 써도 됩니다. 없어도 A1으로 충분합니다. 유료 플랜을 새로 강요하지 마세요.",
        ),
        h2("결과 수정해보기"),
        code(
          '제목을 "Day 1 성공"으로 바꾸고, "안녕하세요" 아래에 "나는 AI와 함께 만들고 있다" 문장을 추가해 주세요. HTML 전체 파일을 다시 주세요.',
        ),
        p("덮어쓰기 저장 → 브라우저 새로고침(F5) → 문구 확인."),
        p("리듬: 요청 → 결과 확인 → 수정 요청 → 다시 확인"),

        h1("5. Path B — 로컬 개발 환경"),
        note(
          "Path B는 10분을 보장하지 않습니다. PC 권한·보안에 따라 훨씬 걸릴 수 있습니다. 막혀도 Path A 성공은 유효합니다.",
        ),
        h2("왜 로컬이 필요한가"),
        p(
          "이후 강의는 여러 파일·도구·명령을 내 컴퓨터에서 실행하는 일이 많아집니다. 그래서 편집기, Node.js, 터미널을 준비합니다.",
        ),
        h2("VS Code 확인 또는 설치"),
        bullet("앱 검색으로 Visual Studio Code / Code 실행", "bullets"),
        bullet(
          "없으면 공식: https://code.visualstudio.com/Download",
          "bullets",
        ),
        p("다른 편집기를 써도 “IDE 역할”은 같습니다. 수업 예시는 VS Code입니다."),
        h2("Node.js 확인 또는 설치"),
        p(
          "Node.js는 자바스크립트를 브라우저 밖에서도 실행하게 해 주는 런타임입니다. 공식 사이트에서 LTS 설치를 권장합니다: https://nodejs.org/",
        ),
        p("설치 후 터미널을 새로 엽니다."),
        h2("터미널 열기"),
        bullet("Windows: PowerShell, Windows Terminal, 또는 VS Code에서 Ctrl+`", "bullets"),
        bullet("macOS: Terminal 앱, 또는 VS Code 통합 터미널", "bullets"),
        h2("실제 명령어 (버전 확인)"),
        code("node -v"),
        code("npm -v"),
        p(
          "node -v: Node 설치와 버전 문자열 확인 · npm -v: npm(패키지 도구) 사용 가능 여부 확인",
        ),
        h2("샘플 프로젝트 실행 (Path B 실습)"),
        p("폴더: examples/day1-first-success/ (코스에서 제공)"),
        p("VS Code에서 그 폴더를 연 뒤, 프로젝트 루트 터미널에서:"),
        code("npm install"),
        code("npm run dev"),
        p("브라우저에서 엽니다: http://127.0.0.1:3456"),
        p("종료: 터미널에서 Ctrl+C"),
        note(
          "이 샘플은 외부 npm 패키지가 없어 npm install이 거의 즉시 끝납니다. 실무 프로젝트는 보통 인터넷이 필요합니다.",
        ),
        h2("한 줄 수정 실습"),
        p("src/main.js 의 문자열을 바꾼 뒤 저장하고 브라우저를 새로고침합니다."),

        h1("6. 핵심 개념"),
        h2("바이브코딩 vs 전통 코딩"),
        p(
          "전통 입문 감각: 빈 파일에 문법을 많이 직접 씀. 바이브코딩 감각: 원하는 결과를 말로 요청하고, 사람이 확인·수정·설명을 붙잡음.",
        ),
        p(
          "교육용 바이브코딩은 “코드를 절대 안 본다”가 아닙니다. 실행하고, 바꾸고, 왜 그런지 조금씩 설명하는 방식입니다.",
        ),
        h2("AI에게 말했는데 왜 파일이 생기나"),
        p(
          "AI는 글(코드)을 생성합니다. 당신이 파일로 저장하거나 도구가 폴더에 써 주면 파일이 됩니다. 생성 → 저장/적용 → 실행 환경의 연결입니다.",
        ),
        h2("IDE / VS Code / AI IDE"),
        p(
          "IDE: 폴더를 열고 코드를 고치고 터미널·도구를 쓰는 작업 공간. VS Code: 널리 쓰이는 무료 편집기 예시. AI IDE/도구: 편집 + 대화로 수정·생성 지원(제품·가격은 변함).",
        ),
        h2("package.json, src, npm install, npm run dev"),
        bullet("package.json: 이름표 + 의존성 + 실행 스크립트 메모", "bullets"),
        bullet("npm install: 필요한 패키지 설치(프로젝트에 따라)", "bullets"),
        bullet(
          "npm run dev: package.json에 적힌 dev 스크립트 실행(없으면 실패할 수 있음)",
          "bullets",
        ),
        bullet("src: 많은 템플릿이 소스 코드를 두는 폴더 이름(항상 필수는 아님)", "bullets"),

        h1("7. 자주 발생하는 오류"),
        bullet("node/npm 을 찾을 수 없음 → 설치, 터미널 재시작, PATH", "bullets"),
        bullet("npm install 실패 → 인터넷, 회사 프록시, 잘못된 폴더", "bullets"),
        bullet('Missing script: "dev" → 이 프로젝트에 dev 스크립트 없음', "bullets"),
        bullet("포트 사용 중 → 이미 서버 실행 중, Ctrl+C", "bullets"),
        bullet("HTML이 글자로 보임 → 확장자가 .html 인지", "bullets"),

        h1("8. 오류를 AI에게 전달하는 방법"),
        code(
          "목표: Day 1 실습에서 개발 서버를 켜고 싶다. OS: (Windows 11 / macOS …) 내가 실행한 명령: npm run dev  전체 오류 메시지: (그대로 붙여넣기)  package.json의 scripts: (있으면)",
        ),
        p("비밀 키·비밀번호·토큰은 지우세요."),

        h1("9. 혼자 다시 해보기"),
        bullet("AI에게 다른 제목의 작은 HTML 다시 받기 → 저장 → 열기", "bullets"),
        bullet("(Path B) node -v 한 번 더", "bullets"),
        bullet("(Path B) main.js 문구 바꿔 새로고침", "bullets"),

        h1("10. Outcome Check"),
        bullet("바이브코딩과 전통 코딩 차이를 내 말로", "checks"),
        bullet("AI에게 작은 결과물 요청", "checks"),
        bullet("수정 요청 가능", "checks"),
        bullet("IDE 한 줄 설명", "checks"),
        bullet("VS Code 설치 여부 확인", "checks"),
        bullet("Node 설치 여부 확인", "checks"),
        bullet("터미널 열기", "checks"),
        bullet("node -v / npm -v", "checks"),
        bullet("프로젝트 폴더 열기", "checks"),
        bullet("안내에 따라 개발 서버 시도", "checks"),
        bullet("브라우저에서 결과 확인", "checks"),
        bullet("package.json/src/npm 기본 설명", "checks"),
        bullet("오류 문구 복사해 AI에게", "checks"),
        p(
          "최소 완료: Path A 성공 + 평가 문서의 최소 기준. 권장 완료: Path B 로컬 실행까지. 모든 항목이 Explainable일 필요는 없습니다.",
        ),

        h1("11. 오늘의 정리"),
        bullet("경험 먼저 — 요청 → 화면 → 수정", "bullets"),
        bullet("질문은 경험 뒤에", "bullets"),
        bullet("IDE = 작업 공간", "bullets"),
        bullet("Node + 터미널 + npm = 이후 수업 도구", "bullets"),
        bullet("오류는 대화 재료", "bullets"),

        h1("12. 다음 강의가 필요한 이유"),
        p(
          "오늘은 한 번 성공과 도구 문 열기까지입니다. 파일이 많아질 때 구조 읽기, HTML/CSS/JS 역할, 저장(Git) 등은 다음에서 이어집니다.",
        ),

        h1("13. 출처와 검증일"),
        bullet("Node / npm: https://nodejs.org/ · learn npm 페이지 · 확인일 2026-07-14", "bullets"),
        bullet(
          "npm scripts: https://docs.npmjs.com/cli/v11/using-npm/scripts · 2026-07-14",
          "bullets",
        ),
        bullet("VS Code: https://code.visualstudio.com/docs · 2026-07-14", "bullets"),
        p(
          "제품 UI와 LTS 번호는 변할 수 있습니다. 설치 직전 공식 사이트를 다시 보세요. 이 문서에 없는 도구 사용법을 임의로 추가하지 않았습니다.",
        ),
      ],
    },
  ],
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buf);
console.log("wrote", OUT);
