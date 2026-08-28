# Community page — actual rendered Visual QA (2026-08-28, recovery continuation)

## Continuity note
This folder went through three capture generations today:
1. **~10:44–10:49 (Codex, reviewer role)**: real `next dev` + headless Edge,
   waited 5s virtual-time-budget. Caught a real `FirebaseError:
   auth/invalid-api-key` overlay and correctly rejected as BLOCKED. SHA-256 at
   the time: desktop `0C632CF7…`, mobile `A64689CF…` (superseded, not in this
   folder anymore).
2. **~12:12–12:18**: screenshots showing a raw "Directory listing for
   /community/" page — taken against a plain static file server with no
   Firebase `cleanUrls` support. Not a product defect; a tooling defect. SHA-256
   `9CF64ADB…` / `F3D1DF6A…` (superseded).
3. **~12:57**: corrected capture against `next dev` + real CDP wall-clock wait
   (~13s), found the page rendering correctly. SHA-256 `cc2592cd…` /
   `a8eec58a…` (superseded by this session's capture below, which additionally
   fixes a real visual defect found in that capture — see Finding 2).

## This session (recovery continuation)
Independently reproduced generations 2 and 3 above from scratch (did not just
trust the prior notes): confirmed the directory-listing failure mode with a
naive static server, and confirmed `--virtual-time-budget` screenshots are
flaky (sometimes catch the page mid-`불러오는 중...`, confirmed directly:
identical output at 18s and 32s budgets — virtual time does not reliably let
the real Firestore WebChannel handshake against production complete).

### Finding 1 (confirms prior session): tooling only, not a product bug
Firestore's `persistentLocalCache` WebChannel `Listen` stream goes through a
few 404/400 responses during its initial SID handshake before stabilizing —
normal long-polling transport behavior, not an app bug. Resolves within
~10–15s of *real* wall-clock time. `posts` is empty in production, so the
resolved state is the correct empty state.

### Finding 2 (new, root-caused and fixed this session)
`src/app/community/page.tsx` and 4 sibling files (`community/saved/page.tsx`,
`community/post/page.tsx`, `community/post/CommunityDetailClient.tsx`,
`community/post/new/page.tsx`) all use
`bg-gradient-to-br from-navy-900 via-gray-900 to-black`. **`navy-900` is not a
defined color** anywhere in this project (no `tailwind.config`, no `@theme`
token in `globals.css` — checked both). Tailwind v4 silently drops the
un-resolvable `from-navy-900` utility, so `--tw-gradient-from` is never set
and defaults to transparent — the hero background degrades to whatever sits
behind it (effectively white) instead of the intended dark hero gradient. This
is directly visible in every capture above as a washed-out white/light-gray
top-left corner, which also drops the `text-gray-400` subtitle
("공개된 게시글 모아보기") to poor, sometimes near-illegible contrast.

**Fix applied**: `from-navy-900` → `from-slate-950` (a real Tailwind v4 token)
in all 5 files, 6 occurrences. Purely a gradient-stop color swap — no logic,
markup, or copy changes. Verified visually below; not yet independently
reviewed (see Owner Gate in the final report — do not treat this session's own
screenshot approval as independent QA).

## Method (this session)
- Build: `npm run build` (static export to `out/`, matches deployed
  `firebase.json` `public: "out"`).
- Server: a small purpose-built Node static server (`clean-static-server.mjs`,
  scratch file, not part of the repo) replicating Firebase Hosting's
  `cleanUrls`/`trailingSlash:false` resolution (`path`, `path.html`,
  `path/index.html`) — chosen after confirming `next start` refuses to run
  with `output: "export"`, `firebase-tools` is not available in this
  environment, and a naive server reproduces the Finding-1-style
  directory-listing failure.
- Driver: headless Edge (`msedge.exe --headless=new`) via **raw CDP**
  (`--remote-debugging-port`, Node 24's built-in `WebSocket` client), navigated
  to `/community`, waited a genuine 15s of real wall-clock time via
  `setTimeout` (not `--virtual-time-budget`, independently reconfirmed flaky
  this session), then `Page.captureScreenshot`. Used a throwaway
  `--user-data-dir` with `--disable-sync --disable-extensions` — the default
  profile injects a dev-only overlay (FPS counter / component-highlight boxes,
  consistent with a React render-tracking devtool) that has nothing to do with
  the app and would otherwise contaminate the screenshots.
- Verified against the live production Firestore project (`ju0o-ec967`), not a
  mock/emulator, same as the prior session.
- No live `claude-in-chrome` extension access in this session either (checked
  via `tabs_context_mcp`, got "extension is not connected") — same
  scripted-CDP provenance caveat as the prior session's notes.

## Result (current screenshots in this folder)
- Desktop (1440×1000) and mobile (390×844): dark navy→black hero background
  now renders as designed; header/nav, "커뮤니티" title, subtitle (now legible),
  login-required banner, and "아직 게시글이 없습니다." empty state all render
  correctly, in Korean, with no mojibake, no overlap/clipping. Mobile
  collapses the nav to a hamburger menu as expected (responsive check passed).
- `npm run typecheck` / `npm test` (71/71, 17 files) / `npm run build` (all
  routes incl. `/community`, `/community/post`, `/community/saved`,
  `/community/post/new` emitted): all PASS, re-run after the fix.

## Caveat / not verified here
- Not verified: a signed-in member's view (post list with real content,
  upvote, compose flow) — production has zero posts, so that path has no data
  to render against yet. Not verified visually (only route presence in the
  build manifest): `/community/post`, `/community/post/new`,
  `/community/saved` — they share the same gradient fix but were not
  individually screenshotted this session.
- **Independent review of the `navy-900` → `slate-950` fix has not happened.**
  This session both diagnosed and fixed the defect, so per the recovery
  contract it must not also self-certify Reviewer/QA sign-off on that change.
