/** Student Word export for project-file-structure node (derivative). */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
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
} from "docx"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "../..")
const OUT = path.join(ROOT, "exports/student/PROJECT-FILE-STRUCTURE-프로젝트-파일-구조-읽기.docx")

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
  })
}
function h1(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text: t, font: "Arial", size: 30, bold: true })],
  })
}
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 21 })],
  })
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
            p("DERIVATIVE of content/courses/.../02-project-file-structure.md", {
              size: 16,
              color: "666666",
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
                new TextRun({ text: "Page ", font: "Arial", size: 16 }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16 }),
              ],
            }),
          ],
        }),
      },
      children: [
        h1("AI가 만든 프로젝트에는 왜 이렇게 많은 파일이 생겼을까요?"),
        p("src·package.json·파일 구조를 처음 읽는 방법"),
        p("Day 1 실행 경험 다음: 어떤 파일을 건드릴지 찾는 법. 파일명 암기 금지."),
        h1("역할 (Day1 샘플 기준)"),
        bullet("package.json — 설정·scripts·(있으면)의존성 (npm 공식)"),
        bullet("src/ — 주요 소스 대표 위치(관례, 필수 규칙 아님)"),
        bullet("server.js — 로컬 서버 실행"),
        bullet("README — 사람용 안내"),
        bullet("src/main.js — 이 샘플의 환영 문구"),
        h1("실습"),
        bullet("루트·주요 파일 찾기"),
        bullet("main.js 한 줄 수정"),
        bullet("AI: 분석 먼저 → 한 파일만 → 금지 파일"),
        bullet("단일 HTML vs 분리 구조 비교 (우열 단정 금지)"),
        h1("다음"),
        p("후보 B(Node·npm)는 이 노드 검토 후. 출처: npm package.json docs 2026-07-14"),
      ],
    },
  ],
})

fs.mkdirSync(path.dirname(OUT), { recursive: true })
const buf = await Packer.toBuffer(doc)
fs.writeFileSync(OUT, buf)
console.log("wrote", OUT)
