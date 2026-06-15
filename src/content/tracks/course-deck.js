const courseKey = document.body.dataset.course;
const lessonIndex = Number(document.body.dataset.lesson || 1) - 1;
const course = window.VIBE_TRACKS[courseKey];
const lesson = course?.lessons?.[lessonIndex];

if (!course || !lesson) {
  document.body.innerHTML = "<main style='padding:40px;color:white;font-family:sans-serif'>강의 데이터를 찾을 수 없습니다.</main>";
  throw new Error("Track lesson not found");
}

Object.entries(course.theme).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key}`, value));
document.title = `${course.courseTitle} ${lessonIndex + 1}강 - ${lesson.title}`;

const deck = document.getElementById("deck");
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const slideHead = (number, kicker, title) => `<header class="head"><div><div class="kicker">${escapeHtml(kicker)}</div><h2>${title}</h2></div><span class="index">${String(number).padStart(2, "0")}</span></header>`;

deck.innerHTML = `
  <section class="slide cover active" data-title="${escapeHtml(lesson.title)}">
    <div>
      <div class="kicker">${course.courseCode} · ${course.family} · LESSON ${String(lessonIndex + 1).padStart(2, "0")}</div>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p class="lead">${escapeHtml(lesson.subtitle)}</p>
      <p style="margin-top:26px;max-width:800px">${escapeHtml(lesson.objective)}</p>
    </div>
    <div class="cover-orbit" aria-hidden="true">
      <div class="ring r1"><i></i></div><div class="ring r2"><i></i></div>
      <div class="core">${course.courseCode}<br>${String(lessonIndex + 1).padStart(2, "0")}</div>
      <div class="cover-code">${String(lessonIndex + 1).padStart(2, "0")}</div>
    </div>
  </section>
  <section class="slide" data-title="오늘의 변화">
    ${slideHead(2, "01 · BEFORE / AFTER", "오늘은 무엇을 다르게 판단하게 될까요?")}
    <div class="compare">
      <article class="compare-col"><strong>BEFORE</strong><h3>감과 기능으로 결정</h3><div class="compare-list">${lesson.before.map((item) => `<div>${escapeHtml(item)}</div>`).join("")}</div></article>
      <div class="shift">→</div>
      <article class="compare-col after"><strong>AFTER</strong><h3>구조와 근거로 결정</h3><div class="compare-list">${lesson.after.map((item) => `<div>${escapeHtml(item)}</div>`).join("")}</div></article>
    </div>
  </section>
  <section class="slide" data-title="개념 지도">
    ${slideHead(3, "02 · SYSTEM MAP", escapeHtml(lesson.mapTitle))}
    <div class="system-map">
      <div class="map-core">${escapeHtml(lesson.title)}</div>
      ${lesson.nodes.map(([title, copy], index) => `<button class="map-node${index === 0 ? " active" : ""}" type="button"><b>${escapeHtml(title)}</b><span>${escapeHtml(copy)}</span></button>`).join("")}
      <i class="map-beam"></i>
    </div>
  </section>
  <section class="slide" data-title="실행 순서">
    ${slideHead(4, "03 · STEP BY STEP", "한 단계씩 판단하며 진행합니다")}
    <div class="sequence">
      <nav class="sequence-nav">${lesson.steps.map(([title], index) => `<button type="button" data-sequence="${index}" class="${index === 0 ? "active" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b></button>`).join("")}</nav>
      <div class="sequence-stage"><article class="sequence-card"><small id="sequence-label">STEP 01</small><h3 id="sequence-title">${escapeHtml(lesson.steps[0][0])}</h3><p id="sequence-copy">${escapeHtml(lesson.steps[0][1])}</p></article><div class="sequence-progress"><i id="sequence-fill" style="width:25%"></i></div></div>
    </div>
  </section>
  <section class="slide" data-title="판단 실험">
    ${slideHead(5, "04 · DECISION LAB", "어떤 선택이 더 강한 구조일까요?")}
    <div class="decision">
      <div class="choice-list">${lesson.choices.map(([title], index) => `<button type="button" data-choice="${index}">${escapeHtml(title)}</button>`).join("")}</div>
      <aside class="decision-result" id="decision-result"><small>SELECT ONE</small><b>선택지를 눌러보세요</b><p>결과가 아니라 그 판단의 이유를 확인합니다.</p></aside>
    </div>
  </section>
  <section class="slide" data-title="실제 흐름">
    ${slideHead(6, "05 · LIVE CASE", escapeHtml(lesson.caseTitle))}
    <div class="journey">${lesson.caseSteps.map((item, index) => `<article class="journey-step${index === 0 ? " active" : ""}" data-journey="${index}"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(item)}</b></article>`).join("")}</div>
    <div class="journey-controls"><button type="button" class="action" id="journey-next">다음 단계</button><button type="button" class="action sub" id="journey-reset">초기화</button></div>
  </section>
  <section class="slide" data-title="실패와 복구">
    ${slideHead(7, "06 · FAILURE / RECOVERY", "실패 원인을 구조의 변화로 바꿉니다")}
    <div class="repair">
      <article class="repair-list"><strong>FAILURE SIGNAL</strong>${lesson.failure.map((item) => `<div>${escapeHtml(item)}</div>`).join("")}</article>
      <div class="repair-arrow">→</div>
      <article class="repair-list"><strong>RECOVERY DESIGN</strong>${lesson.recovery.map((item) => `<div>${escapeHtml(item)}</div>`).join("")}</article>
    </div>
  </section>
  <section class="slide" data-title="완료 기준">
    ${slideHead(8, "07 · QUALITY GATE", "다음 단계로 가기 전에 확인합니다")}
    <div class="check-grid">${lesson.checklist.map((item, index) => `<button type="button" class="check-item" data-check="${index}"><i></i><b>${escapeHtml(item)}</b></button>`).join("")}</div>
  </section>
  <section class="slide" data-title="AI 설계 요청">
    ${slideHead(9, "08 · AI DESIGN REQUEST", "AI에게 답을 시키기 전에 설계를 함께합니다")}
    <div class="prompt-lab">
      <div class="prompt-box"><div class="prompt-top"><span>DESIGN REQUEST</span><span>${course.courseCode}-${String(lessonIndex + 1).padStart(2, "0")}</span></div><div class="prompt-text">${escapeHtml(lesson.prompt)}</div></div>
      <aside class="prompt-parts"><div><b>목표</b><span>무엇을 결정할지</span></div><div><b>질문</b><span>빠진 정보를 먼저 확인</span></div><div><b>구조</b><span>표·흐름·상태로 정리</span></div><div><b>검증</b><span>좋은 결과의 기준</span></div></aside>
    </div>
  </section>
  <section class="slide timer-slide" data-title="${lesson.timerMinutes}분 적용">
    ${slideHead(10, `PRACTICE · ${lesson.timerMinutes} MINUTES`, "지금 배운 구조를 내 프로젝트에 적용합니다")}
    <div class="timer-wrap"><p>${escapeHtml(lesson.practice)}</p><div class="timer" id="timer">${String(lesson.timerMinutes).padStart(2, "0")}:00</div><div class="timer-bar"><i id="timer-fill"></i></div><div><button class="action" id="timer-toggle">시작</button> <button class="action sub" id="timer-reset">초기화</button></div></div>
  </section>
  <section class="slide next" data-title="다음 강의">
    <div><div class="kicker">NEXT · ${course.courseCode}</div><span class="next-number">${lessonIndex + 1 === course.lessons.length ? "END" : String(lessonIndex + 2).padStart(2, "0")}</span><h2>${escapeHtml(lesson.next[0])}</h2><p class="lead">${escapeHtml(lesson.next[1])}</p></div>
    <div class="next-visual"><div></div></div>
  </section>
`;

const slides = [...document.querySelectorAll(".slide")];
const counter = document.getElementById("counter");
let current = 0;
function showSlide(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  counter.textContent = `${current + 1} / ${slides.length}`;
}
document.getElementById("prev").addEventListener("click", () => showSlide(current - 1));
document.getElementById("next").addEventListener("click", () => showSlide(current + 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") showSlide(current + 1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") showSlide(current - 1);
});

document.querySelectorAll(".map-node").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".map-node").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}));

document.querySelectorAll("[data-sequence]").forEach((button) => button.addEventListener("click", () => {
  const index = Number(button.dataset.sequence);
  document.querySelectorAll("[data-sequence]").forEach((item) => item.classList.toggle("active", item === button));
  document.getElementById("sequence-label").textContent = `STEP ${String(index + 1).padStart(2, "0")}`;
  document.getElementById("sequence-title").textContent = lesson.steps[index][0];
  document.getElementById("sequence-copy").textContent = lesson.steps[index][1];
  document.getElementById("sequence-fill").style.width = `${(index + 1) * 25}%`;
}));

document.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => {
  const [title, copy, state] = lesson.choices[Number(button.dataset.choice)];
  document.querySelectorAll("[data-choice]").forEach((item) => item.classList.toggle("active", item === button));
  const labels = { strong: "강한 구조", weak: "위험한 구조", neutral: "추가 검증 필요" };
  document.getElementById("decision-result").innerHTML = `<small>${labels[state] || "판단"}</small><b>${escapeHtml(title)}</b><p>${escapeHtml(copy)}</p>`;
}));

let journeyIndex = 0;
function renderJourney() {
  document.querySelectorAll("[data-journey]").forEach((item, index) => item.classList.toggle("active", index <= journeyIndex));
}
document.getElementById("journey-next").addEventListener("click", () => { journeyIndex = Math.min(lesson.caseSteps.length - 1, journeyIndex + 1); renderJourney(); });
document.getElementById("journey-reset").addEventListener("click", () => { journeyIndex = 0; renderJourney(); });
document.querySelectorAll("[data-check]").forEach((button) => button.addEventListener("click", () => button.classList.toggle("checked")));

let timerSeconds = lesson.timerMinutes * 60;
let timerHandle = null;
const timerDisplay = document.getElementById("timer");
const timerFill = document.getElementById("timer-fill");
const timerToggle = document.getElementById("timer-toggle");
function renderTimer() {
  timerDisplay.textContent = `${String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:${String(timerSeconds % 60).padStart(2, "0")}`;
  timerFill.style.transform = `scaleX(${timerSeconds / (lesson.timerMinutes * 60)})`;
}
timerToggle.addEventListener("click", () => {
  if (timerHandle) { clearInterval(timerHandle); timerHandle = null; timerToggle.textContent = "계속"; return; }
  timerToggle.textContent = "일시정지";
  timerHandle = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    renderTimer();
    if (!timerSeconds) { clearInterval(timerHandle); timerHandle = null; timerToggle.textContent = "완료"; }
  }, 1000);
});
document.getElementById("timer-reset").addEventListener("click", () => {
  clearInterval(timerHandle); timerHandle = null; timerSeconds = lesson.timerMinutes * 60; timerToggle.textContent = "시작"; renderTimer();
});

const requested = Number(new URLSearchParams(location.search).get("slide"));
showSlide(Number.isFinite(requested) && requested > 0 ? requested - 1 : 0);
renderTimer();
