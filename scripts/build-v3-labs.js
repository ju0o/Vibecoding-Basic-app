'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const dataPath = path.join(root, 'src', 'content', 'v3', 'course-data.js');
const outputRoot = path.join(root, 'src', 'content', 'v3', 'projects');

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8') === content) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

function loadCourses() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(dataPath, 'utf-8'), context);
  return context.window.VIBE_V3_COURSES;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character]));
}

function projectHtml(course, lesson, variant) {
  const isBroken = variant === 'broken';
  const isComplete = variant === 'complete';
  const status = isBroken ? '오류 재현 중' : isComplete ? '검증 완료' : '시작 준비';
  const action = lesson.demo.stages[0] || '시작';
  const result = isBroken
    ? lesson.error.symptom
    : isComplete
      ? lesson.deliverables.join(' · ')
      : '버튼을 눌러 첫 상태를 확인하세요.';
  const steps = lesson.sequence.map((step, index) => `
    <li data-step="${index}"><span>${String(index + 1).padStart(2, '0')}</span><b>${escapeHtml(step)}</b></li>`).join('');
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(course.title)} - ${escapeHtml(lesson.title)} - ${variant}</title>
  <style>
    :root{color-scheme:dark;--accent:${course.color};font-family:Pretendard,"Malgun Gothic",sans-serif}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;color:#edf2f1;background:#0b1012;letter-spacing:0}
    header{display:flex;justify-content:space-between;align-items:center;padding:22px 6vw;border-bottom:1px solid #263035}
    header b{font-size:14px}header span{color:var(--accent);font:700 11px Consolas}
    main{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:24px;padding:6vh 6vw}
    .hero,.panel{border:1px solid #2b363b;background:#11181b}.hero{min-height:520px;padding:48px}
    small{color:var(--accent);font:800 10px Consolas}h1{max-width:780px;margin:22px 0 14px;font-size:clamp(36px,5vw,72px);line-height:1.02}
    p{color:#9aa8ad;font-size:18px;line-height:1.65}.state{margin:36px 0;padding:20px;border-left:3px solid var(--accent);background:#172125}
    .state b{display:block;margin-top:9px;font-size:22px}.state.error{border-color:#ff796c}.state.error b{color:#ff9a90}
    button{min-height:48px;padding:0 20px;border:0;color:#101513;background:var(--accent);font-weight:850;cursor:pointer}
    .panel{padding:24px}.panel h2{margin:0 0 20px;font-size:19px}.panel ol{display:grid;gap:7px;margin:0;padding:0;list-style:none}
    .panel li{display:grid;grid-template-columns:36px 1fr;gap:10px;align-items:center;min-height:58px;padding:10px;border:1px solid #273136;color:#758388}
    .panel li span{font:750 10px Consolas}.panel li.active{color:#edf2f1;border-color:color-mix(in srgb,var(--accent) 55%,#273136);background:color-mix(in srgb,var(--accent) 7%,transparent)}
    footer{padding:18px 6vw;color:#657378;border-top:1px solid #263035;font-size:11px}
    @media(max-width:800px){main{grid-template-columns:1fr}.hero{min-height:auto;padding:30px}}
  </style>
</head>
<body data-variant="${variant}">
  <header><b>VIBE STUDIO LAB</b><span>${escapeHtml(course.code)} · ${escapeHtml(lesson.revision)}</span></header>
  <main>
    <section class="hero">
      <small>${variant.toUpperCase()} STATE · ${escapeHtml(status)}</small>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p>${escapeHtml(lesson.objective)}</p>
      <div id="result" class="state${isBroken ? ' error' : ''}">
        <span>현재 결과</span>
        <b>${escapeHtml(result)}</b>
      </div>
      <button id="run" type="button">${escapeHtml(action)}</button>
    </section>
    <aside class="panel">
      <h2>실행 흐름</h2>
      <ol>${steps}</ol>
    </aside>
  </main>
  <footer>${escapeHtml(lesson.error.trace)} · ${escapeHtml(lesson.error.fix)}</footer>
  <script>
    const steps = [...document.querySelectorAll('[data-step]')];
    const result = document.getElementById('result');
    let index = -1;
    document.getElementById('run').addEventListener('click', () => {
      index = Math.min(steps.length - 1, index + 1);
      steps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex <= index));
      const labels = ${JSON.stringify(lesson.sequence)};
      if (document.body.dataset.variant === 'broken' && index >= 1) {
        result.classList.add('error');
        result.querySelector('b').textContent = ${JSON.stringify(lesson.error.symptom)};
        return;
      }
      result.classList.remove('error');
      result.querySelector('b').textContent = labels[index] || ${JSON.stringify(result)};
    });
  </script>
</body>
</html>
`;
}

function serverJs() {
  return `'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const variant = process.argv[2] || 'starter';
const root = path.join(__dirname, variant);
const port = Number(process.env.PORT || 4173);
http.createServer((request, response) => {
  const target = path.join(root, request.url === '/' ? 'index.html' : request.url);
  if (!target.startsWith(root) || !fs.existsSync(target)) {
    response.writeHead(404); response.end('Not found'); return;
  }
  response.writeHead(200, { 'Content-Type': target.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8' });
  fs.createReadStream(target).pipe(response);
}).listen(port, () => console.log(\`VIBE LAB \${variant}: http://localhost:\${port}\`));
`;
}

function packageJson(courseId, lessonNumber, lesson) {
  return `${JSON.stringify({
    name: `vibe-lab-${courseId}-${lessonNumber}`,
    private: true,
    version: '1.0.0',
    description: lesson.objective,
    scripts: {
      dev: 'node server.js starter',
      'dev:starter': 'node server.js starter',
      'dev:broken': 'node server.js broken',
      'dev:complete': 'node server.js complete',
    },
  }, null, 2)}\n`;
}

function courseFiles(courseId, lesson) {
  const common = {
    '.gitignore': 'node_modules/\n.env\n.env.local\n.DS_Store\n',
    '.env.example': 'PUBLIC_APP_NAME=VIBE_STUDIO_LAB\nSECRET_API_KEY=replace-me\n',
  };
  if (courseId === 'claude') {
    return {
      ...common,
      'CLAUDE.md': `# Project instructions\n\n- Goal: ${lesson.objective}\n- Verify: npm run dev:complete\n- Never expose secrets from .env files.\n`,
      '.claude/skills/lesson/SKILL.md': `---\nname: lesson-workflow\ndescription: Use for ${lesson.title}\n---\n\n1. Inspect the current state.\n2. Propose a small change.\n3. Run the verification command.\n4. Report the diff and remaining risk.\n`,
      '.claude/hooks.example.json': `${JSON.stringify({ hooks: { PostToolUse: [{ matcher: 'Edit|Write', command: 'git diff --check' }] } }, null, 2)}\n`,
    };
  }
  if (courseId === 'codex') {
    return {
      ...common,
      'AGENTS.md': `# Repository guidance\n\n## Objective\n${lesson.objective}\n\n## Verification\n- Run npm run dev:complete\n- Review git diff before completion\n`,
      '.codex/config.toml': 'approval_policy = "on-request"\nsandbox_mode = "workspace-write"\n',
      '.codex/skills/lesson/SKILL.md': `---\nname: lesson-workflow\ndescription: Apply the ${lesson.title} workflow\n---\n\nInspect, plan, implement, verify, and summarize.\n`,
    };
  }
  if (courseId === 'workflow') {
    return {
      ...common,
      'workflow.json': `${JSON.stringify({
        trigger: lesson.sequence[0],
        inputs: lesson.concepts.map(([title]) => title),
        decisions: lesson.decisions.map(([question]) => question),
        actions: lesson.sequence,
        outputs: lesson.deliverables,
        recovery: lesson.error.fix,
      }, null, 2)}\n`,
      'tool-contract.json': `${JSON.stringify({ scope: 'lesson-project', permissions: ['read'], approvalRequiredFor: ['write', 'external-send'], audit: true }, null, 2)}\n`,
    };
  }
  if (courseId === 'product') {
    return {
      ...common,
      'PRODUCT-BRIEF.md': `# Product brief\n\n## Objective\n${lesson.objective}\n\n## Deliverables\n${lesson.deliverables.map((item) => `- ${item}`).join('\n')}\n`,
      'TEAM-CONTRACT.md': '# Team contract\n\n- Planning owner:\n- Build owner:\n- Review owner:\n- Operations owner:\n- Decision log location:\n',
    };
  }
  return common;
}

function readme(course, lesson, lessonNumber) {
  return `# ${course.title} ${lessonNumber}강 실습

## 목표
${lesson.objective}

## 실행
\`\`\`powershell
npm run dev:starter
npm run dev:broken
npm run dev:complete
\`\`\`

기본 주소는 \`http://localhost:4173\`입니다. 실행 중인 서버는 \`Ctrl + C\`로 종료합니다.

## 세 상태
- \`starter\`: 수강생이 작업을 시작하는 최소 상태
- \`broken\`: ${lesson.error.symptom}
- \`complete\`: ${lesson.deliverables.join(', ')}

## 복구
원인: ${lesson.error.cause}

첫 수정: ${lesson.error.fix}
`;
}

const courses = loadCourses();
let lessonCount = 0;
for (const [courseId, course] of Object.entries(courses)) {
  // Advanced (심화 통합) ships hand-authored, theme-specific lab packages that are not
  // regenerated here; its course-data/manifest are injected pre-built upstream.
  if (courseId === 'advanced') continue;
  for (const [index, lesson] of course.sessions.entries()) {
    const lessonNumber = String(index + 1).padStart(2, '0');
    const lessonRoot = path.join(outputRoot, courseId, lessonNumber);
    for (const variant of ['starter', 'broken', 'complete']) {
      writeIfChanged(path.join(lessonRoot, variant, 'index.html'), projectHtml(course, lesson, variant));
    }
    writeIfChanged(path.join(lessonRoot, 'server.js'), serverJs());
    writeIfChanged(path.join(lessonRoot, 'package.json'), packageJson(courseId, lessonNumber, lesson));
    writeIfChanged(path.join(lessonRoot, 'README.md'), readme(course, lesson, lessonNumber));
    writeIfChanged(path.join(lessonRoot, 'lab.json'), `${JSON.stringify({
      courseId,
      lessonNumber: index + 1,
      title: lesson.title,
      revision: lesson.revision,
      status: lesson.status,
      sceneId: lesson.visualScene.id,
      variants: ['starter', 'broken', 'complete'],
      error: lesson.error,
      deliverables: lesson.deliverables,
    }, null, 2)}\n`);
    for (const [relativePath, content] of Object.entries(courseFiles(courseId, lesson))) {
      writeIfChanged(path.join(lessonRoot, relativePath), content);
    }
    lessonCount += 1;
  }
}

console.log(`✓ V3 lab packages generated: ${lessonCount} lessons`);
