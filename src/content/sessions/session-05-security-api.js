const slides = Array.from(document.querySelectorAll(".slide"));
const counter = document.getElementById("slide-counter");
let currentSlide = 0;
let demoTimers = [];

function clearDemoTimers() {
  demoTimers.forEach(clearTimeout);
  demoTimers = [];
}

function later(fn, delay) {
  const timer = setTimeout(fn, delay);
  demoTimers.push(timer);
  return timer;
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(slides.length - 1, index));
  clearDemoTimers();
  slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
  counter.textContent = `${currentSlide + 1} / ${slides.length}`;
}

document.getElementById("prev-slide").addEventListener("click", () => showSlide(currentSlide - 1));
document.getElementById("next-slide").addEventListener("click", () => showSlide(currentSlide + 1));
document.addEventListener("keydown", (event) => {
  if (["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement?.tagName) && event.key === " ") return;
  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") showSlide(currentSlide + 1);
  if (event.key === "ArrowLeft" || event.key === "PageUp") showSlide(currentSlide - 1);
});

let gitFlowStep = -1;
const gitFlowCaption = document.getElementById("git-flow-caption");
const gitPacket = document.getElementById("git-packet");
const gitFlowMessages = [
  "변경된 파일을 확인했습니다. 아직 GitHub에는 아무것도 보내지 않았습니다.",
  "이번 commit에 포함할 파일을 staging 영역에 올렸습니다.",
  "변경 이유와 함께 현재 상태를 commit으로 저장했습니다.",
  "commit을 GitHub 원격 저장소에 전송했습니다."
];

function renderGitFlow() {
  document.querySelectorAll("[data-git-step]").forEach((card, index) => {
    card.classList.toggle("active", index === gitFlowStep);
    card.classList.toggle("done", index < gitFlowStep);
  });
  if (gitFlowStep < 0) {
    gitFlowCaption.textContent = "버튼을 누르면 한 단계씩 진행됩니다.";
    return;
  }
  gitFlowCaption.textContent = gitFlowMessages[gitFlowStep];
  const card = document.querySelector(`[data-git-step="${gitFlowStep}"]`);
  const lane = document.getElementById("git-lanes");
  const laneRect = lane.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  gitPacket.style.setProperty("--packet-x", `${Math.max(0, cardRect.left - laneRect.left)}px`);
  gitPacket.classList.remove("moving");
  void gitPacket.offsetWidth;
  gitPacket.classList.add("moving");
}

document.getElementById("git-flow-start").addEventListener("click", () => {
  gitFlowStep = Math.min(3, gitFlowStep + 1);
  renderGitFlow();
});
document.getElementById("git-flow-reset").addEventListener("click", () => {
  gitFlowStep = -1;
  gitPacket.classList.remove("moving");
  renderGitFlow();
});

const commandOutput = {
  status: [
    ["command", "> git status"],
    ["", "On branch main"],
    ["warn", "Changes not staged for commit:"],
    ["", "  modified: src/App.jsx"],
    ["", "  modified: src/styles.css"],
    ["success", "확인 완료: 변경 파일 2개"]
  ],
  add: [
    ["command", "> git add ."],
    ["", "Staging changed files..."],
    ["success", "src/App.jsx added"],
    ["success", "src/styles.css added"],
    ["success", "준비 완료: 다음 commit에 포함됩니다."]
  ],
  commit: [
    ["command", '> git commit -m "update checkout screen"'],
    ["", "[main 8f21a6c] update checkout screen"],
    ["", "2 files changed, 18 insertions(+), 6 deletions(-)"],
    ["success", "저장 완료: 되돌아갈 지점이 생겼습니다."]
  ],
  push: [
    ["command", "> git push"],
    ["", "Enumerating objects: 8, done."],
    ["", "Writing objects: 100%"],
    ["", "To github.com/my/project.git"],
    ["success", "main -> main · GitHub 전송 완료"]
  ]
};

async function typeCommand(command) {
  const terminal = document.getElementById("git-terminal");
  const dot = document.getElementById("terminal-status-dot");
  const status = document.getElementById("terminal-status-text");
  terminal.innerHTML = "";
  dot.style.background = "var(--amber)";
  status.textContent = "실행 중";
  document.querySelectorAll("[data-command]").forEach((button) => button.classList.toggle("active", button.dataset.command === command));
  for (const [kind, text] of commandOutput[command]) {
    const line = document.createElement("span");
    line.className = `terminal-line ${kind}`;
    terminal.appendChild(line);
    for (const character of text) {
      line.textContent += character;
      await new Promise((resolve) => later(resolve, kind === "command" ? 22 : 8));
    }
  }
  const cursor = document.createElement("i");
  cursor.className = "terminal-cursor";
  terminal.appendChild(cursor);
  dot.style.background = "var(--mint)";
  status.textContent = "완료";
}
document.querySelectorAll("[data-command]").forEach((button) => button.addEventListener("click", () => typeCommand(button.dataset.command)));

document.querySelectorAll("[data-branch-note]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-branch-note]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("#branch-detail b").textContent = button.querySelector("span").textContent;
    document.querySelector("#branch-detail p").textContent = button.dataset.branchNote;
  });
});

document.querySelectorAll("[data-platform]").forEach((button) => {
  button.addEventListener("click", () => {
    const result = document.getElementById("platform-result");
    if (button.dataset.platform === "vercel") {
      result.innerHTML = "<b>Vercel이 잘 맞는 경우</b><span>GitHub push를 중심으로 웹 프로젝트를 빠르게 미리보기하고 운영 URL까지 연결하려는 경우</span>";
    } else {
      result.innerHTML = "<b>Firebase가 잘 맞는 경우</b><span>Hosting과 함께 로그인, Firestore, Storage 등 Google의 앱 기능을 한 프로젝트에서 연결하려는 경우</span>";
    }
  });
});

const vercelSteps = [
  {
    title: "GitHub 저장소 연결",
    copy: "배포할 repository를 선택합니다. 이후 production branch의 변경이 운영 배포로 이어집니다.",
    html: '<div class="repo-picker"><span>IMPORT GIT REPOSITORY</span><div><i></i><b>my-vibe-project</b><small>IMPORT</small></div></div>'
  },
  {
    title: "프로젝트 설정 확인",
    copy: "Framework Preset, Root Directory, Build Command와 Output Directory를 프로젝트 구조에 맞게 확인합니다.",
    html: '<div class="settings-form"><div><span>Framework Preset</span><b>Vite</b></div><div><span>Build Command</span><b>npm run build</b></div><div><span>Output Directory</span><b>dist</b></div></div>'
  },
  {
    title: "환경변수 입력",
    copy: "로컬 .env에 있던 실제 값은 GitHub가 아니라 배포 서비스의 Environment Variables에 다시 입력합니다.",
    html: '<div class="env-form"><div><span>AI_API_KEY</span><b>••••••••••••</b></div><div><span>DATABASE_URL</span><b>••••••••••••</b></div><div><span>Environment</span><b>Production</b></div></div>'
  },
  {
    title: "빌드와 배포 실행",
    copy: "Vercel이 저장소를 내려받고 패키지를 설치한 뒤 build를 실행합니다. 실패하면 로그의 첫 오류부터 확인합니다.",
    html: '<div class="deploy-build"><div class="build-row"><i></i><span>Cloning repository</span><b>DONE</b></div><div class="build-row"><i></i><span>Installing dependencies</span><b>DONE</b></div><div class="build-row"><i></i><span>Running npm run build</span><b>DONE</b></div></div>'
  },
  {
    title: "공개 URL에서 다시 검사",
    copy: "배포 성공 표시만 보지 말고 실제 URL을 열어 로그인, 저장, 주요 버튼과 모바일 화면을 다시 확인합니다.",
    html: '<div class="live-domain"><i></i><b>my-vibe-project.vercel.app</b><span>READY · Production</span></div>'
  }
];

function selectVercelStep(index) {
  document.querySelectorAll("[data-vercel-step]").forEach((button) => button.classList.toggle("active", Number(button.dataset.vercelStep) === index));
  document.getElementById("vercel-step-count").textContent = `STEP ${index + 1} OF 5`;
  document.getElementById("vercel-title").textContent = vercelSteps[index].title;
  document.getElementById("vercel-copy").textContent = vercelSteps[index].copy;
  document.getElementById("vercel-visual").innerHTML = vercelSteps[index].html;
}
document.querySelectorAll("[data-vercel-step]").forEach((button) => button.addEventListener("click", () => selectVercelStep(Number(button.dataset.vercelStep))));
selectVercelStep(0);

let firebaseStep = -1;
const firebaseCommands = [
  ["> npm install -g firebase-tools", "Firebase CLI installed successfully"],
  ["> firebase login", "Success! Logged in with your Google account"],
  ["> firebase init hosting", "Firebase Hosting configuration complete"],
  ["> firebase deploy --only hosting", "Deploy complete! Hosting URL is ready"]
];

function renderFirebase() {
  document.querySelectorAll("[data-firebase-step]").forEach((item, index) => {
    item.classList.toggle("active", index === firebaseStep);
    item.classList.toggle("done", index < firebaseStep);
  });
  document.getElementById("firebase-progress").style.height = `${Math.max(0, firebaseStep + 1) * 25}%`;
}

document.getElementById("firebase-next").addEventListener("click", async () => {
  firebaseStep = Math.min(3, firebaseStep + 1);
  renderFirebase();
  const output = document.getElementById("firebase-output");
  if (firebaseStep === 0) output.innerHTML = "";
  const [command, result] = firebaseCommands[firebaseStep];
  const commandLine = document.createElement("span");
  commandLine.className = "terminal-line command";
  commandLine.textContent = command;
  const resultLine = document.createElement("span");
  resultLine.className = "terminal-line success";
  resultLine.textContent = `  ${result}`;
  output.append(commandLine, resultLine);
});
document.getElementById("firebase-reset").addEventListener("click", () => {
  firebaseStep = -1;
  renderFirebase();
  document.getElementById("firebase-output").innerHTML = '<div class="terminal-empty"><b>Firebase 배포 연습</b><span>아래 실행 버튼을 누르면 명령이 한 줄씩 진행됩니다.</span></div>';
});

let pipelineRunning = false;
function resetPipeline() {
  clearDemoTimers();
  pipelineRunning = false;
  document.querySelectorAll("[data-pipeline]").forEach((node) => node.classList.remove("active", "success", "fail"));
  document.getElementById("pipeline-packet").classList.remove("run");
  document.getElementById("pipeline-log").innerHTML = '<span class="log-dot"></span><b>대기 중</b><p>실행하면 각 단계의 상태가 순서대로 바뀝니다.</p>';
}
function runPipeline(shouldFail = false) {
  resetPipeline();
  pipelineRunning = true;
  const keys = ["source", "install", "build", "release"];
  const labels = ["GitHub에서 소스를 받는 중", "패키지를 설치하는 중", "프로덕션 파일을 빌드하는 중", "공개 URL을 활성화하는 중"];
  const packet = document.getElementById("pipeline-packet");
  packet.classList.add("run");
  keys.forEach((key, index) => {
    later(() => {
      if (!pipelineRunning) return;
      document.querySelectorAll("[data-pipeline]").forEach((node) => node.classList.remove("active"));
      const node = document.querySelector(`[data-pipeline="${key}"]`);
      node.classList.add("active");
      document.getElementById("pipeline-log").innerHTML = `<span class="log-dot" style="background:var(--amber)"></span><b>${index + 1}/4 처리 중</b><p>${labels[index]}</p>`;
      if (index > 0) document.querySelector(`[data-pipeline="${keys[index - 1]}"]`).classList.add("success");
      if (shouldFail && key === "build") {
        pipelineRunning = false;
        node.classList.remove("active");
        node.classList.add("fail");
        packet.classList.remove("run");
        document.getElementById("pipeline-log").innerHTML = '<span class="log-dot" style="background:var(--coral)"></span><b>BUILD FAILED</b><p>환경변수 누락 · 로그의 첫 오류를 확인하고 다시 실행합니다.</p>';
      } else if (index === keys.length - 1) {
        later(() => {
          node.classList.remove("active");
          node.classList.add("success");
          document.getElementById("pipeline-log").innerHTML = '<span class="log-dot" style="background:var(--mint)"></span><b>DEPLOYMENT READY</b><p>공개 URL이 생성되었습니다. 이제 실제 주소에서 기능을 다시 확인합니다.</p>';
          pipelineRunning = false;
        }, 700);
      }
    }, index * 1000);
  });
}
document.getElementById("pipeline-run").addEventListener("click", () => runPipeline(false));
document.getElementById("pipeline-fail").addEventListener("click", () => runPipeline(true));
document.getElementById("pipeline-reset").addEventListener("click", resetPipeline);

document.getElementById("leak-scan").addEventListener("click", () => {
  const route = document.getElementById("leak-route");
  route.classList.remove("scanning");
  document.querySelector(".secret-request").classList.remove("revealed");
  document.getElementById("leak-alert").classList.remove("visible");
  void route.offsetWidth;
  route.classList.add("scanning");
  later(() => {
    document.querySelector(".secret-request").classList.add("revealed");
    document.querySelector(".secret-request small").textContent = "sk_live_••••";
    document.getElementById("leak-alert").classList.add("visible");
  }, 1100);
});

document.querySelectorAll("[data-variable]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(`${button.dataset.target}-bin`);
    const empty = target.querySelector("p");
    if (empty) empty.remove();
    const card = document.createElement("div");
    card.className = "sorted-card";
    card.innerHTML = `<b>${button.querySelector("b").textContent}</b><span>${button.querySelector("span").textContent}</span>`;
    target.appendChild(card);
    button.disabled = true;
    const isSecret = button.dataset.target === "secret";
    document.getElementById("sort-feedback").innerHTML = `<b>${isSecret ? "서버 전용" : "공개 가능"}</b><span>${isSecret ? "이 값은 브라우저 코드에 포함되면 안 됩니다." : "이 값은 사용자가 보더라도 권한을 빼앗기지 않는 정보입니다."}</span>`;
  });
});

const permissions = {
  guest: { label: "비회원 요청", public: true, order: false, user: false, stock: false },
  member: { label: "회원 요청", public: true, order: true, user: false, stock: false },
  admin: { label: "관리자 요청", public: true, order: true, user: true, stock: true }
};
document.querySelectorAll("[data-user-role]").forEach((button) => {
  button.addEventListener("click", () => {
    const state = permissions[button.dataset.userRole];
    document.querySelectorAll("[data-user-role]").forEach((item) => item.classList.toggle("active", item === button));
    document.getElementById("role-label").textContent = state.label;
    ["public", "order", "user", "stock"].forEach((key) => {
      const allowed = state[key];
      document.querySelector(`[data-permission="${key}"]`).classList.toggle("allowed", allowed);
      const label = document.querySelector(`[data-permission-label="${key}"]`);
      label.classList.toggle("allowed", allowed);
      label.textContent = allowed ? "허용" : "차단";
    });
  });
});

document.querySelectorAll("[data-check]").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("checked");
    const checked = document.querySelectorAll("[data-check].checked").length;
    const meter = document.getElementById("meter-ring");
    meter.style.setProperty("--meter", `${checked * 25}%`);
    document.getElementById("meter-value").textContent = checked;
    const status = document.getElementById("launch-status");
    const copy = document.getElementById("launch-copy");
    const domain = document.getElementById("domain-ready");
    if (checked === 4) {
      status.textContent = "공개 준비 완료";
      copy.textContent = "배포 후에도 실제 URL에서 한 번 더 확인하세요.";
      domain.classList.add("ready");
    } else {
      status.textContent = `${4 - checked}개 항목이 남았습니다`;
      copy.textContent = "체크는 눈으로 읽는 것이 아니라 실제 실행 결과를 확인한 뒤 표시합니다.";
      domain.classList.remove("ready");
    }
  });
});

let timerSeconds = 30 * 60;
let timerHandle = null;
const timerDisplay = document.getElementById("timer-display");
const timerFill = document.getElementById("timer-fill");
const timerToggle = document.getElementById("timer-toggle");
function renderTimer() {
  const minutes = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const seconds = String(timerSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
  timerFill.style.transform = `scaleX(${timerSeconds / 1800})`;
}
timerToggle.addEventListener("click", () => {
  if (timerHandle) {
    clearInterval(timerHandle);
    timerHandle = null;
    timerToggle.textContent = "계속";
    return;
  }
  timerToggle.textContent = "일시정지";
  timerHandle = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    renderTimer();
    if (timerSeconds === 0) {
      clearInterval(timerHandle);
      timerHandle = null;
      timerToggle.textContent = "완료";
    }
  }, 1000);
});
document.getElementById("timer-reset").addEventListener("click", () => {
  clearInterval(timerHandle);
  timerHandle = null;
  timerSeconds = 1800;
  timerToggle.textContent = "시작";
  renderTimer();
});

const requestedSlide = Number(new URLSearchParams(location.search).get("slide"));
showSlide(Number.isFinite(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0);
renderGitFlow();
renderFirebase();
renderTimer();
