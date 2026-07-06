# RELEASE — 2026-07-06 V2 Wave 11

Executor: Codex
Policy: CODEX-PLAN v2 continuous execution
Status: RELEASED internally, deployment still HOLD until Phase 5 approval

## 판정: 배포 가능

검증이 통과했으므로 `html-semantic-elements`, `css-cascade-layout-responsive`, `javascript-dom-events`, `browser-rendering-network`는 V2 Wave 11로 released 처리한다. 실제 외부 배포는 운영자 승인 후에만 진행한다.

## Verify 결과

Source: `ai-ops/outputs/06-build-verification/VERIFIED-2026-07-06-5.md`

- lint: PASS (`biome check .`, 74 files)
- typecheck: PASS (`tsc --noEmit`)
- test: PASS (3 files passed, 8 tests passed)
- build: PASS (Next.js 16.2.10 production build, 47 static pages)

## 포함 콘텐츠

### 강의 slug

- `html-semantic-elements`
- `css-cascade-layout-responsive`
- `javascript-dom-events`
- `browser-rendering-network`

### 추가 다이어그램

- `src/content/lessons/diagrams/html-semantic-elements/semantic-document-map.svg`
- `src/content/lessons/diagrams/css-cascade-layout-responsive/cascade-layout-responsive-flow.svg`
- `src/content/lessons/diagrams/javascript-dom-events/dom-event-flow.svg`
- `src/content/lessons/diagrams/browser-rendering-network/browser-rendering-network-flow.svg`

### 추가 용어

- Semantic HTML
- Content Sectioning
- Main Element
- Nav Element
- Article Element
- CSS Cascade
- Specificity
- Normal Flow
- Responsive Design
- Media Query
- DOM
- Event
- addEventListener
- Event Bubbling
- Event Delegation
- Browser Rendering
- Critical Rendering Path
- CSSOM
- Render Tree
- Performance Timing

### 사용된 KB id

- `html-semantic-elements`
- `css-cascade-layout`
- `javascript-dom-events`
- `browser-rendering-network`

## 사이트 파일

- `src/content/lessons/markdown/html-semantic-elements.md`
- `src/content/lessons/markdown/css-cascade-layout-responsive.md`
- `src/content/lessons/markdown/javascript-dom-events.md`
- `src/content/lessons/markdown/browser-rendering-network.md`
- `src/content/lessons/diagrams/html-semantic-elements/semantic-document-map.svg`
- `src/content/lessons/diagrams/css-cascade-layout-responsive/cascade-layout-responsive-flow.svg`
- `src/content/lessons/diagrams/javascript-dom-events/dom-event-flow.svg`
- `src/content/lessons/diagrams/browser-rendering-network/browser-rendering-network-flow.svg`
- `src/content/curriculum.ts`
- `src/content/glossary.ts`

## 개정 사항

- Lesson markdown files match their P-04 draft `lesson.md` files.
- Diagram SVG files match their P-04 draft SVG files.
- `web-screen-anatomy` order was normalized from `2` to `1`, and the new T02 lessons occupy `web-basics` orders `2` through `5`.
- Deployment remains held until CODEX-PLAN Phase 5 developer-server confirmation and operator approval.
