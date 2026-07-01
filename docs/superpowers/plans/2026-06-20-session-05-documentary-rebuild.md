# Session 05 Documentary Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Basic Session 05 as a projector-readable documentary lesson where the student follows one project from localhost to a secure public URL through real browser, GitHub, DevTools, Vercel, and Firebase surfaces.

**Architecture:** Keep the standalone HTML/CSS/JS deck and its navigation contract. Replace the visual hierarchy of the content slides: real tool captures and realistic browser surfaces become the primary scene, while only the instructional change state is simulated in DOM. Preserve the existing manual presenter controls and 30-minute practice/next-lesson slides.

**Tech Stack:** Static HTML, CSS animations using transform/opacity, vanilla JavaScript presenter controls, Electron smoke harness, local PNG asset bundle.

---

### Task 1: Lock the intended documentary deck structure in an audit

**Files:**
- Create: `scripts/audit-session-05-documentary.js`
- Test: `scripts/audit-session-05-documentary.js`

- [ ] **Step 1: Write the failing audit conditions**

```js
const requiredTitles = [
  '내 컴퓨터와 공개 URL',
  'GitHub에 남는 변경 기록',
  'GitHub 협업과 프로젝트 내려받기',
  '브라우저에서 확인하는 공개 요청',
  '비밀값과 배포 환경',
  '데이터 접근 규칙',
  'Vercel과 Firebase의 역할',
  '배포가 공개 URL이 되는 순간'
];

assert(requiredTitles.every((title) => titles.has(title)));
assert(html.includes('real-tool-shot'));
assert(!html.includes('data-title="공개 변수와 비밀 변수"'));
```

- [ ] **Step 2: Run the audit before rebuilding**

Run: `node scripts/audit-session-05-documentary.js`

Expected: FAIL because the present deck still uses the earlier title and has no complete documentary scene contract.

- [ ] **Step 3: Implement the audit parser**

```js
const titles = new Set([...html.matchAll(/data-title="([^"]+)"/g)].map((match) => match[1]));
const missing = requiredTitles.filter((title) => !titles.has(title));
if (missing.length) {
  throw new Error(`Missing documentary slides: ${missing.join(', ')}`);
}
```

- [ ] **Step 4: Re-run the audit**

Run: `node scripts/audit-session-05-documentary.js`

Expected: it remains red until Task 2 finishes.

### Task 2: Rebuild the 5강 slide sequence around one release story

**Files:**
- Modify: `src/content/sessions/session-05-security-api.html`
- Modify: `src/content/sessions/session-05-security-api.js`

- [ ] **Step 1: Replace the first eight conceptual slides with a documentary sequence**

Use this exact narrative order:

```text
01 Cover: a real deployment workbench, not an orbit illustration
02 localhost -> public URL: one identical Korean product site, external request blocked then allowed
03 Git commit -> GitHub push: capture-led repository history with a moving commit marker
04 GitHub collaboration: clone, pull, branch, push as one team timeline
05 browser DevTools: F12 -> Network -> exposed request -> rotate key recovery
06 environment handoff: .env.local -> .gitignore -> Vercel/Firebase environment settings
07 Firestore access: guest/member/admin action changes a real order screen and rule decision
08 deployment roles: Vercel hosts the front end; Firebase supplies Auth/Firestore only when required
09 Vercel release: repository import -> build log -> generated URL
10 Firebase Hosting release: CLI -> hosting URL with a concise decision boundary
11 release pipeline: success/failure/recovery with a large log and URL-state change
12 public URL checklist
13 30-minute practice
14 next session preview
```

- [ ] **Step 2: Preserve presenter interaction boundaries**

```js
// Presenter clicks explicitly advance the important state.
// Ambient glows may loop, but no conceptual step advances on a timer.
document.getElementById('release-next').addEventListener('click', advanceReleaseStep);
document.getElementById('release-reset').addEventListener('click', resetReleaseStep);
```

- [ ] **Step 3: Keep navigation and query-based slide selection unchanged**

```js
const requestedSlide = Number(new URLSearchParams(location.search).get('slide'));
showSlide(Number.isFinite(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0);
```

### Task 3: Establish a single documentary visual language

**Files:**
- Modify: `src/content/sessions/session-05-security-api.css`
- Modify: `src/content/sessions/session-05-security-api.html`

- [ ] **Step 1: Promote captures and realistic screens above containers**

```css
.documentary-frame {
  background: #10161d;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,.24);
}

.documentary-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

- [ ] **Step 2: Reduce visual noise**

```css
.slide::before,
.slide::after,
.grid-background,
.orbit-grid { display: none; }

.slide-head h2 { max-width: 820px; font-size: clamp(34px, 3.3vw, 58px); }
.annotation { background: rgba(8,12,20,.86); backdrop-filter: blur(12px); }
```

- [ ] **Step 3: Make annotations subject-specific**

```css
.annotation.is-success { --annotation: #35d4c7; }
.annotation.is-warning { --annotation: #f6ba53; }
.annotation.is-danger { --annotation: #ff727d; }
```

### Task 4: Use the existing assets correctly and add only necessary real references

**Files:**
- Modify: `src/content/sessions/session-05-security-api.html`
- Modify: `src/content/sessions/session-05-security-api.css`
- Reuse: `src/content/assets/session-05/github-repo-reference.png`
- Reuse: `src/content/assets/session-05/chrome-devtools-network-reference.png`
- Reuse: `src/content/assets/session-05/vercel-deployments-reference.png`
- Reuse: `src/content/assets/session-05/firebase-rules-reference.png`

- [ ] **Step 1: Render the GitHub capture at legible scale**

```html
<figure class="documentary-frame github-capture">
  <img src="../assets/session-05/github-repo-reference.png" alt="GitHub 저장소의 Code, Commits, Releases 화면">
  <figcaption>한 저장소에서 코드, 변경 기록, 협업 기준점을 함께 관리합니다.</figcaption>
  <button data-github-focus="commits">변경 기록 보기</button>
</figure>
```

- [ ] **Step 2: Make the DevTools slide a browser-first teaching scene**

```html
<div class="browser-documentary">
  <div class="browser-page">결제하기 버튼이 있는 실제 한국어 서비스 화면</div>
  <div class="devtools-drawer">Network request, request header, response state</div>
  <button id="devtools-next">다음 확인</button>
</div>
```

- [ ] **Step 3: Never use screenshots as tiny decorations**

Each capture must be at least the primary area of its slide or be omitted. A capture cannot be cropped so tightly that its interface can no longer be identified.

### Task 5: Verify visual and functional quality at projector size

**Files:**
- Test: `scripts/audit-session-05-documentary.js`
- Test: `scripts/smoke-electron-session.js`

- [ ] **Step 1: Run the documentary structure audit**

Run: `node scripts/audit-session-05-documentary.js`

Expected: JSON with `ok: true` and a 14-slide count.

- [ ] **Step 2: Verify the full deck at 1366x768**

Run:

```powershell
$env:SMOKE_WIDTH='1366'
$env:SMOKE_HEIGHT='768'
.\node_modules\.bin\electron.cmd scripts\smoke-electron-session.js src\content\sessions\session-05-security-api.html
```

Expected: `ok: true`, exactly one active slide, zero `slideOverflow`, zero console errors.

- [ ] **Step 3: Capture the critical scenes**

Run the same smoke harness for slides 2, 3, 5, 7, 8, 9, and 11, including their relevant click state. Inspect each PNG for readable real-tool context, complete labels, and no collision with the pager.

- [ ] **Step 4: Run repository verification**

Run: `npm run check`

Expected: `Project check passed.`

### Task 6: Update the 5강 instructor notes after the deck is coherent

**Files:**
- Modify: `src/content/appendix/script-session5.html` (or create it if the session script convention is absent)

- [ ] **Step 1: Align speaker notes to the release story**

```text
SAY: 배포는 화면을 바꾸는 일이 아니라, 같은 프로젝트가 내 노트북 밖에서도 실행되도록 책임을 옮기는 일입니다.
DO: localhost와 public URL 화면을 나란히 보여주고, 외부 접속 요청을 수동으로 허용합니다.
ASK: 친구가 지금 내 localhost:3000에 접속할 수 있을까요?
```

- [ ] **Step 2: Add recovery prompts**

```text
If GitHub 연결이 안 되면: 현재 GitHub 로그인과 remote URL을 먼저 확인한다.
If Vercel build fails: Deploy log의 첫 오류, Node 버전, 누락 환경변수를 확인한다.
If Firestore access is denied: Rules에서 로그인 여부와 소유자 uid 조건을 확인한다.
```

- [ ] **Step 3: Keep theory and practice at 30 minutes each**

```text
0-30분: 공개 환경의 책임, GitHub, 보안, 배포 시연
30-60분: 자신의 프로젝트 기록, 환경변수 점검, 선택 배포 실습
```
