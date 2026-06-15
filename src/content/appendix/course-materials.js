const params = new URLSearchParams(location.search);
const courseKey = params.get("course") || "practical";
const audience = params.get("audience") === "instructor" ? "instructor" : "student";
const course = window.VIBE_TRACKS?.[courseKey];

if (!course) {
  document.getElementById("material-root").innerHTML = '<section class="paper"><h1>과정 자료를 찾을 수 없습니다.</h1></section>';
  throw new Error(`Course material not found: ${courseKey}`);
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

document.documentElement.style.setProperty("--course-accent", course.theme?.accent || "#4a9b78");
document.title = `${course.courseTitle} ${audience === "instructor" ? "강사용 운영 가이드" : "수강생 워크북"}`;
document.getElementById("screen-code").textContent = `${course.courseCode} · ${audience === "instructor" ? "INSTRUCTOR GUIDE" : "STUDENT WORKBOOK"}`;
document.getElementById("screen-title").textContent = document.title;
document.getElementById("print-button").addEventListener("click", () => window.print());

document.getElementById("lesson-nav").innerHTML = course.lessons
  .map((lesson, index) => `<a href="#lesson-${index + 1}">${index + 1}강</a>`)
  .join("");

const cover = `
  <section class="paper cover-page">
    <div>
      <div class="cover-kicker">${escapeHtml(course.courseCode)} · ${escapeHtml(course.family)}</div>
      <h1>${escapeHtml(course.courseTitle)}</h1>
      <p class="subtitle">${audience === "instructor"
        ? "설명 순서, 화면 조작, 질문과 오개념 교정을 한 권으로 정리한 강사 운영 자료"
        : "핵심 개념을 판단표로 정리하고 내 프로젝트에 직접 적용하는 과정 워크북"}</p>
    </div>
    <div class="cover-route">
      <div><span>LESSONS</span><b>${String(course.lessons.length).padStart(2, "0")}개 회차</b></div>
      <div><span>METHOD</span><b>보고 · 판단하고 · 적용하기</b></div>
      <div><span>OUTPUT</span><b>${audience === "instructor" ? "수업 운영 계획" : "내 프로젝트 설계표"}</b></div>
    </div>
  </section>
`;

function studentPage(lesson, index) {
  return `
    <section class="paper" id="lesson-${index + 1}">
      <header class="page-head">
        <div><small>LESSON ${String(index + 1).padStart(2, "0")}</small><h2>${escapeHtml(lesson.title)}</h2></div>
        <span class="page-index">${String(index + 1).padStart(2, "0")}</span>
      </header>
      <div class="objective">${escapeHtml(lesson.objective)}</div>
      <div class="section-title">핵심 용어와 판단 축</div>
      <div class="term-grid">${lesson.nodes.map(([title, copy]) => `<div class="term"><b>${escapeHtml(title)}</b><span>${escapeHtml(copy)}</span></div>`).join("")}</div>
      <div class="section-title">확인 체크리스트</div>
      <div class="check-grid">${lesson.checklist.map((item) => `<div class="check"><div><b>${escapeHtml(item)}</b><span>내 프로젝트에서 확인 후 표시</span></div></div>`).join("")}</div>
      <div class="section-title">내 프로젝트 적용 메모</div>
      <div class="practice-box"><strong>${escapeHtml(lesson.practice)}</strong></div>
      <p class="footer-note">AI 요청 시작문: ${escapeHtml(lesson.prompt)}</p>
    </section>
  `;
}

function instructorPage(lesson, index) {
  const question = lesson.choices.find((choice) => choice[2] === "strong") || lesson.choices[0];
  return `
    <section class="paper" id="lesson-${index + 1}">
      <header class="page-head">
        <div><small>INSTRUCTOR · LESSON ${String(index + 1).padStart(2, "0")}</small><h2>${escapeHtml(lesson.title)}</h2></div>
        <span class="page-index">${String(index + 1).padStart(2, "0")}</span>
      </header>
      <div class="objective"><b>수업 목표</b><br>${escapeHtml(lesson.objective)}</div>
      <div class="teacher-grid">
        <article class="teacher-card"><h3>설명 순서</h3><ul>${lesson.steps.map(([title, copy]) => `<li><b>${escapeHtml(title)}</b> · ${escapeHtml(copy)}</li>`).join("")}</ul></article>
        <article class="teacher-card"><h3>화면 조작</h3><ul><li>개념 지도에서 네 판단 축을 한 개씩 선택합니다.</li><li>실행 순서는 자동 재생하지 않고 설명 속도에 맞춰 진행합니다.</li><li>판단 실험에서 선택 이유를 먼저 묻고 결과를 공개합니다.</li><li>실패와 복구를 좌우로 비교한 뒤 체크리스트를 표시합니다.</li></ul></article>
        <article class="teacher-card"><h3>질문 유도</h3><p>“${escapeHtml(question[0])}”가 더 강한 선택인 이유는 무엇일까요?</p><p>${escapeHtml(question[1])}</p></article>
        <article class="teacher-card"><h3>예상 오개념과 교정</h3><ul>${lesson.failure.map((item, failureIndex) => `<li><b>${escapeHtml(item)}</b> → ${escapeHtml(lesson.recovery[failureIndex] || lesson.recovery[0])}</li>`).join("")}</ul></article>
        <article class="teacher-card"><h3>수업 전 공부</h3><ul>${lesson.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
        <article class="teacher-card"><h3>실습 운영</h3><p>${escapeHtml(lesson.practice)}</p><p>완성 속도보다 선택의 근거를 말하게 하고, 막힌 수강생은 목표와 현재 상태부터 다시 적게 합니다.</p></article>
      </div>
      <p class="footer-note">강의 후 기록: 많이 나온 질문, 오해한 용어, 다음 개편에서 시각화할 장면을 메모합니다.</p>
    </section>
  `;
}

const sources = audience === "instructor" && course.sourceLinks?.length
  ? `<section class="paper source-list"><header class="page-head"><div><small>OFFICIAL REFERENCES</small><h2>공식 참고자료</h2></div></header>${course.sourceLinks.map(([label, url]) => `<p><b>${escapeHtml(label)}</b><br><a href="${escapeHtml(url)}">${escapeHtml(url)}</a></p>`).join("")}<p class="footer-note">제품 기능과 설치 방법은 변경될 수 있으므로 수업 전 공식 문서의 현재 내용을 다시 확인합니다.</p></section>`
  : "";

document.getElementById("material-root").innerHTML = cover
  + course.lessons.map(audience === "instructor" ? instructorPage : studentPage).join("")
  + sources;
