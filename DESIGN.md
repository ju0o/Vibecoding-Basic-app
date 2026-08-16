# VIBE STUDIO Design System

## 1. Atmosphere & Identity

VIBE STUDIO is a dark documentary teaching studio: a calm, credible control room where beginners can inspect a real development workflow without being overwhelmed. Its signature is **evidence-led teaching**: a large, legible tool surface paired with only the annotation needed to explain what changed, why it matters, and what to do next.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Studio background | `--bg` | `#080d12` | Full slide surface |
| Primary panel | `--panel` | `#101820` | Tool simulations |
| Secondary panel | `--panel-2` | `#131e28` | Nested surfaces |
| Divider | `--line` | `rgba(224,235,240,.15)` | Tool chrome and separators |
| Primary text | `--ink` | `#f4f6f3` | Projector-safe headlines |
| Secondary text | `--muted` | `#aab7bc` | Supporting explanation |
| Action / connection | `--teal` | `#37d4c1` | Successful flow and interactive actions |
| Decision / caution | `--amber` | `#f5b951` | Version, review, and security cues |
| Error / exposure | `--coral` | `#ff737a` | Failed or unsafe states |
| Verification | `--blue` | `#6f9cff` | Checked external state |

### Rules

- Teal confirms a live connection or action. Amber names a decision point. Coral only marks an unsafe or failed state.
- Realistic tool scenes carry most of the visual weight; decorative gradients and unrelated icons are avoided.
- Capture-like scenes must remain legible without relying on brand logos.

## 3. Typography

| Level | Size | Weight | Line Height | Tracking | Usage |
|---|---:|---:|---:|---:|---|
| Slide title | `clamp(32px, 3.4vw, 49px)` | 800 | 1.12 | `0` | Projected teaching title |
| Display | `clamp(49px, 5.6vw, 92px)` | 800 | 1.03 | `0` | Cover only |
| Tool heading | `18px` | 700 | 1.35 | `0` | Tool panes |
| Body | `14px` | 500 | 1.55 | `0` | Visible explanation |
| Mono label | `10-12px` | 700 | 1.4 | `0.08em` | Commands, status, metadata |

- Primary: `Pretendard, Arial, sans-serif`.
- Mono: `ui-monospace, SFMono-Regular, Consolas, monospace`.
- Body copy is never below 12px in a projected lecture scene. Code stays at 11px or above.

## 4. Spacing & Layout

- Base unit: 4px.
- Lecture frame: `clamp(34px, 4.9vw, 78px)` horizontal padding and `clamp(28px, 4.1vw, 66px)` top padding.
- A slide uses one dominant evidence surface. Supplementary panels may support it, but must not become a card grid.
- At 1280x720 and 1366x768, the slide must not scroll or overlap the presentation navigation.

## 5. Components

### Documentary Tool Surface
- **Structure**: simulated app chrome, focused content pane, concise annotation, optional controls.
- **Variants**: browser, GitHub repository, terminal, settings editor, data policy editor.
- **States**: initial, progressing, success, failure, recovered.
- **Motion**: only transform and opacity. The presenter controls explanation steps; ambient signals may loop quietly.

### Explanation Control
- **Structure**: clear primary next/start action plus a quiet reset action.
- **States**: default, hover, focus-visible, active, paused.
- **Accessibility**: native `button`, visible focus ring, explicit Korean label.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | 150ms | ease-out | Hover and press |
| Standard | 250ms | ease-in-out | Tool state swap |
| Emphasis | 450ms | `cubic-bezier(.16,1,.3,1)` | Manual scene reveal |
| Ambient | 2.4-3.2s | ease-in-out | Quiet connection pulse |

- Explanation-changing steps require a button press.
- Automatic playback is allowed only for a clearly labelled full-flow replay or quiet background signal.
- `prefers-reduced-motion` removes non-essential loops and keeps state changes immediate.

## 7. Depth & Surface

### Strategy

`mixed`: restrained one-pixel dividers define tool chrome; a single soft shadow separates a documentary surface from the studio background.

- Rounded corners: 8-12px for tool windows, 4-6px for controls.
- No floating decorative cards, pill-heavy layouts, or broad gradient ornaments.
