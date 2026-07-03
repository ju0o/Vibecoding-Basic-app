# AI Vibe Coding Master Design System

## 1. Atmosphere & Identity

AI Vibe Coding Master feels like a quiet study desk inside a modern product workspace. The signature is a "learning rail": every screen keeps the learner oriented with progress, next steps, and plain-language definitions without turning the site into a generic blog.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --surface-primary | #ffffff | #111111 | Page background |
| Surface/secondary | --surface-secondary | #f7f7f5 | #181818 | Section bands, quiet panels |
| Surface/elevated | --surface-elevated | #ffffff | #202020 | Cards, popovers, nav |
| Surface/inset | --surface-inset | #efefec | #2a2a28 | Code blocks, glossary chips |
| Text/primary | --text-primary | #171717 | #f7f7f5 | Headlines, body |
| Text/secondary | --text-secondary | #5f5f5b | #b8b8b0 | Supporting text |
| Text/tertiary | --text-tertiary | #85857e | #8d8d86 | Metadata, disabled hints |
| Border/default | --border-default | #deded8 | #363632 | Cards, dividers |
| Border/subtle | --border-subtle | #ecece6 | #282824 | Soft separations |
| Accent/primary | --accent-primary | #0568d8 | #62a8ff | CTAs, links, focus |
| Accent/hover | --accent-hover | #004fba | #8fc1ff | Hover states |
| Accent/soft | --accent-soft | #eef6ff | #102840 | Badges, selected rows |
| Status/success | --status-success | #168348 | #45c779 | Completed progress |
| Status/warning | --status-warning | #ad6a00 | #f0b44b | Study cautions |
| Status/error | --status-error | #c73535 | #ff7777 | Error states |
| Status/info | --status-info | #0568d8 | #62a8ff | Info states |

### Rules

- Accent blue is used for navigation, focus, search highlights, and primary actions only.
- The color story is paper-white, graphite, and clear blue. Avoid decorative purple gradients and beige theme drift.
- Any new color must be added here before it appears in CSS or JSX.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 48px / 3rem | 800 | 1.12 | 0 | Home and major page titles |
| H1 | 36px / 2.25rem | 800 | 1.2 | 0 | Lesson title |
| H2 | 28px / 1.75rem | 700 | 1.3 | 0 | Lesson sections |
| H3 | 22px / 1.375rem | 700 | 1.4 | 0 | Card titles |
| Body/lg | 18px / 1.125rem | 500 | 1.65 | 0 | Lead paragraphs |
| Body | 16px / 1rem | 400 | 1.7 | 0 | Reading text |
| Body/sm | 14px / 0.875rem | 400 | 1.55 | 0 | Secondary info |
| Caption | 12px / 0.75rem | 600 | 1.45 | 0 | Labels, metadata |

### Font Stack

- Primary: Noto Sans KR, system-ui, -apple-system, Segoe UI, sans-serif
- Mono: Geist Mono, Consolas, Monaco, monospace

### Rules

- Korean learning content uses roomy line height and short paragraphs.
- Body text never drops below 14px.
- Headings stay concise so the first viewport remains useful on mobile.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a base of 4px.

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Icon gaps |
| --space-2 | 8px | Inline labels |
| --space-3 | 12px | Compact controls |
| --space-4 | 16px | Default padding |
| --space-5 | 20px | Comfortable row gaps |
| --space-6 | 24px | Card padding |
| --space-8 | 32px | Section groups |
| --space-10 | 40px | Page blocks |
| --space-12 | 48px | Major breaks |
| --space-16 | 64px | Desktop vertical rhythm |
| --space-20 | 80px | Hero and page spacing |

### Grid

- Max content width: 1280px
- Column system: responsive CSS grid with 16px mobile margin and 24px desktop gutter
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px

### Rules

- Learning pages use a sticky sidebar on desktop and a compact top rail on mobile.
- Cards have 8px radius. Large panels may use 12px only when they frame a complete tool.

## 5. Components

### Site Header

- Structure: logo, primary nav, global search, theme toggle, mobile menu
- Variants: desktop, mobile
- Spacing: --space-3 to --space-6
- States: hover, active, focus, open, empty search
- Accessibility: semantic nav, buttons with labels, focus ring
- Motion: 150ms opacity and transform for menu/search states

### Lesson Card

- Structure: module label, title, summary, progress marker, actions
- Variants: default, active, completed, bookmarked
- Spacing: --space-4 to --space-6
- States: hover, active, focus, completed, empty progress
- Accessibility: full card link has descriptive text
- Motion: transform by 1px on active, border color on hover

### Progress Meter

- Structure: label, percentage, bar, detail text
- Variants: compact, panel
- Spacing: --space-2 to --space-5
- States: zero, partial, complete
- Accessibility: progressbar role with aria-valuenow
- Motion: width transition 250ms, disabled for reduced motion

### Checklist

- Structure: checkbox row list with lesson-scoped item ids
- Variants: lesson, dashboard
- Spacing: --space-3 to --space-5
- States: unchecked, checked, focus, disabled
- Accessibility: native checkbox inputs with visible labels
- Motion: color and background transition only

### Search Dialog

- Structure: search input, grouped results, empty state
- Variants: desktop popover, mobile block
- Spacing: --space-3 to --space-6
- States: empty, typing, results, no results, focus
- Accessibility: combobox-style labeling, Escape closes dialog
- Motion: opacity and translate only

### Lesson Sidebar

- Structure: lesson metadata, progress, section anchors, previous/next links
- Variants: desktop sticky, mobile horizontal
- Spacing: --space-3 to --space-6
- States: active anchor, completed lesson, bookmarked
- Accessibility: nav landmark with descriptive aria label
- Motion: color and background transition only

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 120ms | ease-out | Button press, checkbox |
| Standard | 220ms | ease-in-out | Popover, mobile menu |
| Emphasis | 420ms | cubic-bezier(0.16, 1, 0.3, 1) | First viewport panels |

### Rules

- Animate transform, opacity, background, and border color only.
- Every interactive element has hover, active, and focus states.
- Respect reduced motion for all non-essential transitions.

## 7. Depth & Surface

### Strategy

Mixed: whisper borders for structure, low-opacity shadows only for popovers and elevated learning panels.

| Level | Value | Usage |
|-------|-------|-------|
| Flat | none | Page background |
| Whisper | 1px solid var(--border-subtle) | Dividers, list rows |
| Card | 1px solid var(--border-default) plus 0 1px 2px rgba(0,0,0,0.04) | Cards |
| Popover | 0 18px 48px rgba(0,0,0,0.14) | Search and mobile menu |

Dark mode uses borders and tonal contrast more than shadow.
