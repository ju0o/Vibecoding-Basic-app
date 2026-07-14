/**
 * Export instructor Day 1 script to review DOCX (derivative, not SSOT).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  TextRun,
  BorderStyle,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const OUT = path.join(ROOT, "exports/instructor/DAY1-강사용-대본.docx");

const blue = "1E3A5F";
const gray = "555555";
const memoBg = "FFF8E7";
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 140 },
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

function h1(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text: t, font: "Arial", size: 30, bold: true, color: blue })],
  });
}

function h2(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text: t, font: "Arial", size: 24, bold: true, color: blue })],
  });
}

function say(t) {
  return new Paragraph({
    spacing: { after: 120 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 24, color: "2563EB", space: 8 },
    },
    indent: { left: 160 },
    children: [
      new TextRun({ text: "말할 말  ", font: "Arial", size: 20, bold: true, color: "2563EB" }),
      new TextRun({ text: t, font: "Arial", size: 22 }),
    ],
  });
}

function memo(t) {
  return new Paragraph({
    spacing: { after: 120 },
    shading: { type: ShadingType.CLEAR, fill: memoBg },
    children: [
      new TextRun({ text: "[강사 메모] ", font: "Arial", size: 20, bold: true, color: "92400E" }),
      new TextRun({ text: t, font: "Arial", size: 20, italics: true, color: "78350F" }),
    ],
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 21 })],
  });
}

function cell(text, w, header = false) {
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    shading: header ? { type: ShadingType.CLEAR, fill: "E8EEF7" } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: "Arial",
            size: 18,
            bold: header,
          }),
        ],
      }),
    ],
  });
}

function simpleTable(rows, widths) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, i) =>
      new TableRow({
        children: r.map((t, j) => cell(t, widths[j], i === 0)),
      }),
    ),
  });
}

const doc = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
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
            p("Day 1 강사용 대본 · DERIVATIVE of content/instructor/.../01-first-success-instructor.md", {
              size: 16,
              color: gray,
              italics: true,
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
                  text: " · 노란 음영 = 강사 메모 · 파란 줄 = 말할 말",
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
          spacing: { after: 80 },
          children: [
            new TextRun({ text: "Day 1 강사용 대본", font: "Arial", size: 40, bold: true, color: blue }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "첫 성공 — AI와 함께 결과물을 실행하기",
              font: "Arial",
              size: 26,
            }),
          ],
        }),
        memo(
          "원본 SSOT는 Markdown입니다. 이 DOCX는 수업 검토·인쇄용 파생본입니다. 사이트 미연결.",
        ),

        h1("1. 강의 목표"),
        bullet("Path A로 화면 성공을 맛본다"),
        bullet("요청 → 확인 → 수정 리듬"),
        bullet("Path B로 도구 문을 연다 (시간 가변 · 실패·재도전 OK)"),
        bullet("Complete = 출석이 아니라 can-do (Outcome)"),
        say("오늘은 많이 아는 날이 아니라, 한 번 성공하고 도구를 켜 보는 날입니다."),

        h1("2. 권장 시간표"),
        simpleTable(
          [
            ["구간", "시간", "비고"],
            ["오프닝", "3–5분", ""],
            ["Path A 라이브", "10–15분", "첫 성공 필수"],
            ["짧은 Theory", "8–12분", "경험 뒤"],
            ["IDE 설명", "5–8분", ""],
            ["Path B 랩", "20–60분+", "보장 없음"],
            ["package.json 등", "7–10분", "실습 직후"],
            ["오류→AI / Outcome", "8–15분", ""],
          ],
          [2200, 2200, 5400],
        ),
        memo("Path A only 25–40분 · A+B light 60–90분 · B full 90–150분"),

        h1("3. 오프닝 (3–5분)"),
        say("오늘은 빈 문법 시험지부터 시작하지 않습니다. AI에게 부탁해 작은 페이지를 만들고, 그다음에야 이게 왜 됐지?를 묻습니다."),
        h2("질문 시점"),
        bullet("지금 코딩이 무섭다면? (강제 X)"),
        bullet("10분 안에 ‘내가 시킨 화면’을 보는 게 Path A 목표"),
        h2("예상 반응"),
        simpleTable(
          [
            ["학생", "대응"],
            ["설치부터?", "설치는 Path B. 먼저 Path A"],
            ["어떤 AI?", "이미 쓰는 것. 유료 필수 아님"],
            ["개발자 아닌데요", "그래서 오늘 온 겁니다"],
          ],
          [3600, 6200],
        ),

        h1("4. Path A 진행 방법 (10–15분)"),
        bullet("학생 자료와 동일한 프롬프트 공유"),
        bullet("강사 1회 시연: 저장 → 브라우저"),
        bullet("학생 수행 + 수정 요청 1회"),
        h2("성공 확인"),
        bullet("확장자 .html (txt 아님)"),
        bullet("화면에 제목·문구"),
        bullet("성공을 크게 인정"),
        h2("혼동 표현"),
        simpleTable(
          [
            ["학생 말", "교정"],
            ["AI가 해킹해서 파일 만듦", "글을 생성, 우리가 저장"],
            ["코딩 안 해도 되죠?", "초안 AI, 확인·수정은 우리"],
            ["HTML이 전부?", "오늘은 화면 한 장"],
          ],
          [3600, 6200],
        ),
        memo("느린 반: 완성 HTML 배포 후 저장·열기·한 줄 수정만"),

        h1("5. 짧은 Theory (경험 뒤)"),
        say("마법이 아니라 생성 → 저장 → 실행입니다. AI마다 폴더가 다른 건 버그가 아니라 출발점이 다른 것일 수 있습니다."),
        bullet("질문: 방금 성공을 한 문장으로?"),
        bullet("질문: 코드를 전혀 안 보면 위험할 수 있는 이유는? (깊게 X)"),

        h1("6. IDE / VS Code / AI IDE"),
        say("IDE는 작업 공간입니다. VS Code는 예시 무료 편집기이고 필수 종교가 아닙니다. AI 도구는 제품·가격이 자주 바뀝니다."),

        h1("7. Path B 진행 방법"),
        say("Path B는 10분 보장이 아닙니다. 회사 PC는 설치가 막힐 수 있어요. 막혀도 Path A 성공은 남습니다."),
        bullet("VS Code 유무"),
        bullet("Node LTS (nodejs.org)"),
        bullet("터미널 새 창 · node -v · npm -v"),
        bullet("examples/day1-first-success 폴더 열기"),
        bullet("npm install → npm run dev → http://127.0.0.1:3456"),
        bullet("src/main.js 한 줄 수정 → 새로고침"),
        h2("설치 오류 대응"),
        simpleTable(
          [
            ["오류", "행동"],
            ["node not found", "설치·터미널 재시작·PATH"],
            ["권한 없음", "Path B 보류 기록 · Path A 유지"],
            ["npm 네트워크", "핫스팟 / IT"],
            ["Missing script dev", "package.json 함께 읽기"],
            ["포트 충돌", "Ctrl+C 후 재실행"],
          ],
          [3200, 6600],
        ),

        h1("8. 수업 지연 시"),
        h2("반드시 설명"),
        bullet("Path A 성공 경험"),
        bullet("요청→확인→수정 리듬"),
        bullet("Complete = 할 수 있는가"),
        bullet("오류를 복사해 묻는 법"),
        h2("축소 가능"),
        bullet("Path B full run → 버전 확인까지만"),
        bullet("package.json 깊이"),
        bullet("AI IDE 제품 비교"),
        bullet("Atlas 심화"),
        h2("선택 생략"),
        bullet("A2 미리보기 도구 시연"),
        bullet("긴 이론 표 확장"),

        h1("9. package.json / src / npm (실습 직후)"),
        say("package.json은 이름표·의존성·스크립트 메모입니다. npm run pizza가 실패하는 이유는 스크립트에 없어서일 수 있습니다. 프로젝트마다 다릅니다."),

        h1("10. 오류 → AI (5분)"),
        memo("일부러 틀린 명령(npm run deev) → 메시지 복사 → 템플릿"),
        say("오류는 실패 증명서가 아니라 AI에게 줄 재료입니다."),

        h1("11. 실습 성공 확인 · Outcome"),
        bullet("Path A: 브라우저 화면 + 수정 1회"),
        bullet("Path B 최소: node/npm -v 또는 보류 문서화"),
        bullet("권장: localhost + main.js 변경"),
        bullet("Teach-back 1–3문장"),
        bullet("최소/권장 Complete는 assessment 문서 기준"),
        say("오늘은 많이 안 것이 아니라, 할 수 있게 된 것이 성적입니다."),

        h1("12. 다음 수업 연결 멘트"),
        say(
          "다음엔 파일이 늘어날 때 구조를 읽는 법, 또는 웹 화면이 어떻게 보이는지로 이어질 수 있습니다. 오늘은 문을 연 날입니다.",
        ),

        h1("13. 준비물 체크"),
        bullet("학생용 MD/DOCX · 실습 가이드"),
        bullet("오프라인용 샘플 hello HTML"),
        bullet("examples/day1-first-success"),
        bullet("OS별 터미널 여는 법 1장"),
        bullet("Outcome 체크 시트"),
      ],
    },
  ],
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buf);
console.log("wrote", OUT);
