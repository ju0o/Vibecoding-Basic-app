"""Export CURRICULUM_MASTER.csv to Korean-header XLSX (operator view, not SSOT)."""
from __future__ import annotations

import csv
from datetime import date
from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[2]
CSV_PATH = ROOT / "ai-ops" / "curriculum" / "CURRICULUM_MASTER.csv"
OUT = ROOT / "exports" / "curriculum" / "CURRICULUM_MASTER.xlsx"

# CSV key -> Korean header (operator-facing)
CURRICULUM_COLUMNS: list[tuple[str, str]] = [
    ("course_id", "코스 ID"),
    ("stage_id", "학습 단계"),
    ("lesson_id", "강의 ID"),
    ("order", "순서"),
    ("lesson_title", "강의 제목"),
    ("student_question", "학생 질문"),
    ("why_now", "지금 배우는 이유"),
    ("learning_goal", "학습 목표"),
    ("outcomes", "학습 성과"),
    ("practice", "실습"),
    ("interaction", "인터랙션"),
    ("assessment", "퀴즈"),
    ("atlas_refs", "참고 자료"),
    ("tool_refs", "사용 도구"),
    ("prerequisites", "선수 학습"),
    ("next_lesson", "다음 강의"),
    ("source_status", "출처 상태"),
    ("content_status", "콘텐츠 상태"),
    ("reviewer_status", "검토 상태"),
]


def style_header(cell) -> None:
    cell.font = Font(name="Malgun Gothic", bold=True, size=11)
    cell.fill = PatternFill("solid", fgColor="E8EEF7")
    cell.alignment = Alignment(wrap_text=True, vertical="center")
    cell.border = Border(
        left=Side(style="thin", color="CCCCCC"),
        right=Side(style="thin", color="CCCCCC"),
        top=Side(style="thin", color="CCCCCC"),
        bottom=Side(style="thin", color="CCCCCC"),
    )


def style_cell(cell) -> None:
    cell.font = Font(name="Malgun Gothic", size=10)
    cell.alignment = Alignment(wrap_text=True, vertical="top")
    cell.border = Border(
        left=Side(style="thin", color="CCCCCC"),
        right=Side(style="thin", color="CCCCCC"),
        top=Side(style="thin", color="CCCCCC"),
        bottom=Side(style="thin", color="CCCCCC"),
    )


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    wb = Workbook()

    # --- 커리큘럼 ---
    ws = wb.active
    ws.title = "커리큘럼"
    for col, (_, ko) in enumerate(CURRICULUM_COLUMNS, 1):
        style_header(ws.cell(1, col, ko))

    # 추가 표시 열 (파생 요약 — 완료율 수식 없음)
    extra_headers = ["애니메이션", "진행 상태", "샘플 프로젝트"]
    base_cols = len(CURRICULUM_COLUMNS)
    for i, h in enumerate(extra_headers, 1):
        style_header(ws.cell(1, base_cols + i, h))

    row_i = 2
    with CSV_PATH.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            for col, (key, _) in enumerate(CURRICULUM_COLUMNS, 1):
                val = row.get(key, "")
                if key == "order" and val != "":
                    val = int(val)
                if key == "student_question":
                    val = str(val).replace("|", "\n")
                if key == "outcomes":
                    val = str(val).replace(";", ", ")
                c = ws.cell(row_i, col, val)
                style_cell(c)
            # 파생 요약 (Day1 하드코드 없이 상태 문자열)
            anim = "storyboard_있음·구현_대기"
            progress = f"{row.get('content_status', '')} / {row.get('reviewer_status', '')}"
            sample = "examples/day1-first-success" if row.get("lesson_id") == "d1-first-success" else ""
            for offset, val in enumerate([anim, progress, sample], 1):
                style_cell(ws.cell(row_i, base_cols + offset, val))
            row_i += 1

    last = max(row_i - 1, 1)
    last_col = get_column_letter(base_cols + len(extra_headers))
    ws.auto_filter.ref = f"A1:{last_col}{last}"
    ws.freeze_panes = "A2"
    widths = [12, 16, 16, 6, 32, 24, 22, 22, 22, 28, 28, 28, 12, 14, 10, 10, 10, 12, 10, 22, 18, 28]
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[1].height = 32
    if last >= 2:
        ws.row_dimensions[2].height = 72
    note = ws.cell(
        last + 2,
        1,
        f"원본 CSV: ai-ops/curriculum/CURRICULUM_MASTER.csv | 생성일: {date.today().isoformat()} | 파생본(한글 헤더) — 수정은 CSV",
    )
    note.font = Font(name="Malgun Gothic", size=9, italic=True, color="666666")

    # --- Day1 학습성과 ---
    ws2 = wb.create_sheet("Day1 학습성과")
    h2 = [
        "성과 ID",
        "학습 성과",
        "목표 수준",
        "최소 완료",
        "권장 완료",
        "증거",
        "평가 방법",
        "보류 허용",
        "비고",
    ]
    for col, h in enumerate(h2, 1):
        style_header(ws2.cell(1, col, h))

    outcomes = [
        ("O1", "바이브코딩과 전통 코딩 차이를 자기 말로 설명", "Assisted", "Assisted", "Explainable", "teach-back", "설명", "아니오", "개념"),
        ("O2", "AI에게 작은 결과물 요청", "Independent", "Independent", "Independent", "결과물", "수행", "아니오", "Path A"),
        ("O3", "결과 보고 수정 요청 1회 이상", "Independent", "Independent", "Independent", "수정 전후", "수행", "아니오", "Path A"),
        ("O4", "IDE가 작업 공간임을 설명", "Assisted", "Assisted", "Explainable", "한 줄", "설명", "아니오", ""),
        ("O5", "VS Code 설치 여부 확인", "Independent", "Independent", "Independent", "실행 확인", "수행", "아니오", "대안 OK"),
        ("O6", "Node.js 설치 여부 확인", "Independent", "Assisted+", "Independent", "node -v", "수행", "권한 없으면 예", "Path B"),
        ("O7", "터미널 열기", "Independent", "Assisted+", "Independent", "화면", "수행", "아니오", ""),
        ("O8", "node -v 와 npm -v 실행", "Independent", "Assisted+", "Independent", "버전 출력", "수행", "Node 없으면 예", "Path B"),
        ("O9", "프로젝트 폴더 열기", "Assisted", "환경 허용 시 Assisted", "Independent", "폴더", "수행", "예", "샘플"),
        ("O10", "개발 서버 실행(안내 따라)", "Assisted", "환경 허용 시 Assisted", "Independent", "npm run dev", "수행", "예", "Path B"),
        ("O11", "브라우저에서 결과 확인", "Independent", "Independent", "Independent", "화면", "수행", "아니오", "A 또는 B"),
        ("O12", "package.json·src·npm 기본 설명", "Assisted", "Assisted", "Explainable", "한 줄", "설명", "아니오", ""),
        ("O13", "오류 메시지 복사 후 AI 전달", "Independent", "Assisted", "Independent", "템플릿", "시나리오/모의", "아니오", "모의 허용"),
    ]
    for r, row in enumerate(outcomes, 2):
        for col, v in enumerate(row, 1):
            style_cell(ws2.cell(r, col, v))
    ws2.auto_filter.ref = f"A1:I{1 + len(outcomes)}"
    ws2.freeze_panes = "A2"
    for i, w in enumerate([10, 40, 12, 16, 14, 14, 14, 14, 12], 1):
        ws2.column_dimensions[get_column_letter(i)].width = w

    # --- 제작 현황 ---
    ws3 = wb.create_sheet("제작 현황")
    for col, h in enumerate(["항목", "경로/설명", "상태", "다음 작업"], 1):
        style_header(ws3.cell(1, col, h))
    status_rows = [
        ("학생 콘텐츠", "content/courses/.../01-first-success.md", "drafting", "운영자 승인"),
        ("학생용 Word", "exports/student/*.docx", "generated", "MD 변경 시 재생성"),
        ("강사용 자료", "content/instructor/**", "optional", "필수 파이프라인 아님"),
        ("실습", "content/practice/...", "drafting", "샘플 경로 정합"),
        ("인터랙션 명세", "content/interactions/...", "drafting", "애니 구현 입력"),
        ("애니메이션 설계", "ANIMATION_DESIGN_SYSTEM.md", "design", "AF-1 프레임워크"),
        ("인터랙티브 애니 구현", "src/features/animations (예정)", "not_started", "Storyboard≠완료"),
        ("퀴즈/평가", "content/assessment/...", "drafting", "Outcome 연동"),
        ("샘플 프로젝트", "examples/day1-first-success/", "verified", "예제·실습·완성본 확장"),
        ("출처 팩", "DAY1-SOURCE-PACK.md", "partial", "배포 전 LTS 재확인"),
        ("사이트 연결", "Website Viewer", "not_started", "교육 패키지 완성 후"),
        ("Curriculum CSV", "ai-ops/curriculum/CURRICULUM_MASTER.csv", "SSOT", "영문 키 유지"),
    ]
    for r, row in enumerate(status_rows, 2):
        for col, v in enumerate(row, 1):
            style_cell(ws3.cell(r, col, v))
    ws3.auto_filter.ref = f"A1:D{1 + len(status_rows)}"
    ws3.freeze_panes = "A2"
    for i, w in enumerate([22, 48, 14, 28], 1):
        ws3.column_dimensions[get_column_letter(i)].width = w
    n3 = ws3.cell(16, 1, f"생성일: {date.today().isoformat()} | 가짜 완료율 수식 없음 | 강사 대본 비필수")
    n3.font = Font(name="Malgun Gothic", size=9, italic=True, color="666666")

    wb.save(OUT)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
