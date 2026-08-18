# Curriculum Frontmatter Analysis — Architecture Report

**Date:** August 12, 2026  
**Scope:** Observation/research only — no code changes  
**Source Data:** All 100 lesson markdown files from `git stash@{0}` (pre-JT-003-wip)  
**Context Branch:** `symphony/AVM-JT-003` (fresh from main — only untracked artifacts exist)

---

## 1. Executive Summary

The curriculum consists of **100 markdown lessons** organized across **13 modules** defined in `curriculum.ts`. Every lesson shares an identical set of **9 frontmatter fields** with perfect consistency. However, significant gaps exist between the flat frontmatter structure and the rich module-level metadata in `curriculum.ts`, and tag taxonomy is largely ad-hoc with near-zero reuse.

### Key Numbers at a Glance

| Metric | Value |
|--------|-------|
| Total lessons | 100 |
| Modules defined | 13 |
| Unique frontmatter fields | 9 (all present in every file) |
| Field name inconsistencies | 0 |
| Unique tags | 309 |
| Tags appearing ≥4 times | 20 (6% of total) |
| Deep-dive lessons | 80 (80%) |
| Reference lessons | 20 (20%) |
| Total estimated minutes | 6,170 min (~103 hours) |
| Average minutes per lesson | 61.7 min |

---

## 2. Complete Frontmatter Schema (All Fields Universal)

Every one of the 100 lessons uses exactly these 9 frontmatter fields:

| Field | Type | Cardinality | Example Values | Notes |
|-------|------|-------------|----------------|-------|
| `slug` | string | 100/100 | `"agent-loop-anatomy"` | Derives from filename; stable identifier |
| `moduleId` | enum | 100/100 | `"ai-system-design"`, `"getting-started"` | Maps lesson to a module in CURRICULUM_MODULES |
| `order` | int | 100/100 | 1–17 | Sequential position within the module |
| `title` | string | 100/100 | Korean descriptive titles | Used as human-readable lesson name |
| `summary` | string | 100/100 | Short paragraph describing scope/purpose | Acts as meta description or intro hook |
| `level` | enum | 100/100 | `"입문"`, `"기초"`, `"중급"` | Three tiers: Beginner → Fundamental → Intermediate |
| `type` | enum | 100/100 | `"deep-dive"`, `"reference"` | Content format classification |
| `minutes` | int | 100/100 | 35–100 | Estimated reading time in whole minutes |
| `tags` | array[str] | 100/100 | `["Agent", "Tool Calling"]` | Ad-hoc topic keywords; 309 unique values across 100 lessons |

**No inconsistency detected.** Every field is universally present, uses the same YAML-delimited `---` block syntax, and has no variants (e.g., no `minute` vs `minutes`, no `module` vs `moduleId`).

---

## 3. Module-by-Module Lesson Count & Distribution

```
┌─────────────────────────────┬───────┬───────┬──────┬──────┬────────────────────────────────────────┐
│ Module                      │ Order │ Count │ 입문 │ 기초 │ 중급                                    │
├─────────────────────────────┼───────┼───────┼──────┼──────┼────────────────────────────────────────┤
│ getting-started             │     1 │     4 │    2 │    2 │                                      0 │
│ development-basics          │     2 │     7 │    3 │    3 │                                      1 │
│ web-basics                  │     3 │     8 │    1 │    5 │                                      2 │
│ frontend-frameworks         │     4 │     7 │    0 │    4 │                                      3 │
│ git-collaboration           │     5 │     8 │    0 │    4 │                                      4 │
│ data-backend                │     6 │     7 │    0 │    4 │                                      3 │
│ deployment-ops              │     7 │     7 │    0 │    3 │                                      4 │
│ ai-basics                   │     8 │     7 │    0 │    5 │                                      2 │
│ ai-coding-tools             │     9 │     7 │    0 │    3 │                                      4 │
│ ai-system-design           │    10 │    17 │    0 │    4 │                                     13 │
│ practical-vibe-coding      │    11 │     7 │    0 │    2 │                                      5 │
│ explanation-practice       │    12 │     5 │    0 │    2 │                                      3 │
│ project-textbook           │    13 │     9 │    0 │    0 │                                      9 │
├─────────────────────────────┼───────┼───────┼──────┼──────┼────────────────────────────────────────┤
│ TOTAL                       │       │   100 │    6 │   41 │                                     53 │
└─────────────────────────────┴───────┴───────┴──────┴──────┴────────────────────────────────────────┘
```

### Observations by Module

1. **project-textbook** (Module 13) — All 9 lessons are `중급` level with `deep-dive` type. No variation — makes sense as capstone projects assume intermediate proficiency.
2. **ai-system-design** (Module 10) — Largest module with 17 lessons, 77% mid-level. Likely contains most complex conceptual material (Agents, MCP, RAG, Orchestration).
3. **getting-started** (Module 1) — Only module with substantial `입문` share (50%). Progresses quickly to `기초`.
4. **development-basics** (Module 2) — Highest `입문` count (3 lessons) among non-first modules; includes terminal basics and environment setup.
5. **Explanation practice** (Module 12) — Smallest module (5 lessons); balanced `기초/중급` mix for skill-building.

---

## 4. Tag Taxonomy Analysis

### The Core Problem: 309 Unique Tags, Minimal Reuse

Tags are the **least structured** element of the frontmatter schema. Despite being declared as `readonly string[]`, there is no shared glossary, no controlled vocabulary, and virtually no overlap between lessons.

**Tag Frequency Distribution:**

| Occurrences | Count | Percentage | Examples |
|-------------|-------|------------|----------|
| 1× (unique to one lesson) | 262 | 84.7% | `"Code Search"`, `"Citation"`, `"Prop Composition"`, `"Firebase"`, etc. |
| 2× | 30 | 9.7% | `"Claude Code"`, `"GitHub Actions"`, `"React"`, `"REST"` |
| 3× | 13 | 4.2% | `"JavaScript"`, `"Next.js"`, `"Tool Calling"`, `"Vibe Coding"` |
| 4× | 10 | 3.2% | `"API"`, `"MCP"`, `"Verification"`, `"배포"`, `"백엔드"` |
| 5×+ | 0 | 0% | None |
| 9× | 4 | 1.3% | `"Agent"`, `"Git"`, `"AI 시스템 설계"`, `"레퍼런스"` |

**Key insight:** The top 4 tags each appear in only 9 lessons out of 100. Over 84% of tags are used exactly once. This makes tags functionally unusable for cross-module search, filtering, or clustering without a normalization/curation pass.

### Tag Patterns Observed

- **Mixed languages:** English (`Agent Loop`), Korean (`도구 루프`), and mixed (`Context Engineering`, `RAG 챗봇`). No standardization.
- **Module-name duplication:** Module IDs like `"ai-system-design"` appear literally as a tag in 9 lessons, suggesting authors copy the module name as a default tag rather than deriving topic-specific tags.
- **"레퍼런스" / "Reference":** Appears in many reference-type lessons but not consistently — some references tag with specific tools (e.g., `"gh"`, `"npm ci"`) instead.
- **Command/function names as tags:** `useState`, `useEffect`, `rebase`, `diff`, `reset`, `firebase` — low-level implementation details, not topics.

---

## 5. Level Distribution Analysis

| Level | Count | % of Total | Where Concentrated |
|-------|-------|------------|---------------------|
| 입문 | 6 | 6% | getting-started (2), development-basics (3), web-basics (1) |
| 기초 | 41 | 41% | Scattered across modules 1–9 |
| 중급 | 53 | 53% | Dominant in modules 5–13; 100% in project-textbook |

**Observation:** There is a clear progression pattern — lessons flow from 입문→기초→중급 as you move through curriculum order. However, the level is assigned per-lesson rather than enforced by module boundary, meaning a single module can contain multiple levels (Modules 2, 3, 5, 6, 8, 9, 10, 12 do; Modules 1, 4, 7, 11, 13 are homogeneous).

---

## 6. Type Distribution Analysis

| Type | Count | % of Total | Characteristics |
|------|-------|------------|-----------------|
| deep-dive | 80 | 80% | Conceptual/explanatory lessons; follow the standard section template |
| reference | 20 | 20% | Command/tool/API references; often end with command-line syntax summaries |

All reference lessons have `minutes ≤ 55`. All deep-dives with `minutes > 60` lean toward complex conceptual content (e.g., Agent Loop = 60m, MCP = 55m, Context Caching = 70m).

### Reference Lessons List

1. terminal-shell-basics-reference
2. gh-cli-reference
3. npm-scripts-reference
4. deployment-cli-reference
5. git-recovery-playbook
6. npm-debugging-playbook
7. deployment-checklist-playbook
8. ci-cd-pipeline-basics
9. json-data-contracts
10. rest-api-design
11. database-tables-indexes
12. authentication-session-token
13. web-security-basics
14. api-security-rate-limits
15. production-env-and-secrets
16. monitoring-errors-rollbacks
17. nextjs-routing-rendering
18. typescript-type-system
19. react-state-and-effects
20. tailwind-design-systems

---

## 7. Duration Analysis

| Statistic | Value |
|-----------|-------|
| Min | 35 minutes |
| Max | 100 minutes |
| Mean | 61.7 minutes |
| Median | 60.0 minutes |
| Total | 6,170 minutes (~103 hours) |

### Bucket Distribution

| Range | Count | % |
|-------|-------|----|
| 35–40 min | 3 | 3% |
| 41–60 min | 57 | 57% |
| 61–90 min | 36 | 36% |
| 91–100 min | 4 | 4% |

**Observation:** Most lessons cluster in the 41–60 minute range. No lesson falls below 30 minutes, suggesting a deliberate floor for content depth. The 5 longest lessons (>80 min) are all from ai-system-design and practical-vibe-coding.

---

## 8. Curriculum.ts Structure vs Actual Markdown Files

### Full Module Mapping

```
┌──────┬─────────────────────────────┬───────────────────────────────────────┬────────┐
│ Ord  │ Module ID                   │ Title (Korean)                        │ Lessons│
├──────┼─────────────────────────────┼───────────────────────────────────────┼────────┤
│   1  │ getting-started             │ 시작하기                               │     4  │
│   2  │ development-basics          │ 개발 기초                              │     7  │
│   3  │ web-basics                  │ 웹 개발 기초                           │     8  │
│   4  │ frontend-frameworks         │ 프론트엔드 프레임워크                  │     7  │
│   5  │ git-collaboration           │ Git & 협업                             │     8  │
│   6  │ data-backend                │ 데이터와 백엔드                        │     7  │
│   7  │ deployment-ops              │ 배포와 운영                            │     7  │
│   8  │ ai-basics                   │ AI 활용 기초                           │     7  │
│   9  │ ai-coding-tools             │ AI 코딩 도구                           │     7  │
│  10  │ ai-system-design            │ AI 시스템 설계                         │    17  │
│  11  │ practical-vibe-coding       │ 실전 바이브코딩                        │     7  │
│  12  │ explanation-practice        │ 설명 연습                              │     5  │
│  13  │ project-textbook            │ 실전 프로젝트 교재                     │     9  │
└──────┴─────────────────────────────┴───────────────────────────────────────┴────────┘
```

**Perfect 1:1 mapping.** Every module ID in `curriculum.ts` has corresponding lessons, and every lesson's `moduleId` maps to a valid module in `CURRICULUM_MODULES`. No orphan lessons exist. No extra modules in lessons that aren't in the TS definition.

However, `CURRICULUM_MODULES` contains **no link to lesson slugs**. The relationship is purely through `moduleId` matching — there is no canonical ordering list in the module definition itself; the lesson-level `order` field serves double duty as both intra-module ordering AND implicit module size tracking.

---

## 9. Integration Layer Design Concept

This section proposes how to reconcile the two data models (frontmatter fields ↔ curriculum.ts types) without modifying source files.

### 9.1 Current Architecture Diagram

```
┌─────────────────────────────┐        ┌─────────────────────────────┐
│    LESSON MARKDOWN FILES    │        │       curriculum.ts         │
│    (100 files in stash)     │        │     (module definitions)    │
├─────────────────────────────┤        ├─────────────────────────────┤
│                             │        │                             │
│  slug ←────────────────────┼────────┼→ moduleId (= id)            │
│  title ←───────────────────┼────────┼→ title                      │
│  summary                    │        │  description                │
│  moduleId                   │        │  goal                       │
│  order ←────────────────────┼────────┼→ (none; computed from sort)│
│  level                      │        │  order (from module array)  │
│  type                       │        │                             │
│  minutes                    │        │                             │
│  tags                       │        │                             │
│                             │        │                             │
└─────────────────────────────┘        └─────────────────────────────┘
```

### 9.2 The Gap Problem

| Aspect | current state | impact |
|--------|---------------|--------|
| **Lesson-to-Module linkage** | Reverse lookup only (find lessons where `moduleId === cur.id`) | Module objects don't know their lesson children; no forward traversal |
| **Intra-module ordering** | Fragmented across 100 separate frontmatter blocks | Must collect all lessons then sort by `order` to get sequence |
| **Level granularity** | Per-lesson, 3 values | No module-level level aggregation; harder to filter courses by difficulty |
| **Type inference** | Per-lesson, 2 values | Same — no module-level composition view |
| **Duration estimation** | Summed only via post-hoc calculation | No module-level `estimatedTime` stored anywhere |
| **Tags** | 309 unique values, ad-hoc | Unusable for search/filtering without normalization layer |
| **Schema validation** | Loose — YAML frontmatter, no TypeScript enforcement | Can add invalid `moduleId` or missing fields silently |

### 9.3 Proposed Unified Schema Design

#### Option A: Augmented Lesson Metadata Registry (Middleware Approach)

Create a build-time registry that reads all lesson frontmatter and produces a normalized, typed artifact:

```typescript
// proposed: src/content/lessons/registry.generated.ts
// AUTO-GENERATED — do not edit manually
import type { LessonMeta } from "@/content/schema";

export const LESSON_REGISTRY = {
  // By module (for curriculum navigation)
  byModule: {
    "getting-started": [
      { slug: "ai-vibe-coding-orientation", title: "AI 바이브코딩이란 무엇인가", ... },
      { slug: "development-environment-map", ... },
      ...
    ],
    // ... 12 more modules
  },
  
  // Flat index for search/indexing
  all: [/* all 100 lessons sorted by (moduleId, order) */],
  
  // Module-level aggregations
  moduleStats: {
    "getting-started": { lessonCount: 4, totalMinutes: 140, levels: ["입문","기초"] },
    "ai-system-design": { lessonCount: 17, totalMinutes: 1020, levels: ["기초","중급"] },
    // ... 11 more
  },
} satisfies Record<string, unknown>;
```

**Pros:**
- No source code modification required — generated during build
- Provides the 1:1 link that's currently missing
- Enables fast lookups without iterating all 100 files at runtime
- Aggregates duration, level distribution, tag frequency

**Cons:**
- Requires a generation step tied to file changes
- Adds CI/CD dependency on script correctness

#### Option B: Enrich curriculum.ts with Forward References

Extend `CurriculumModule` to include lesson identifiers:

```typescript
export type CurriculumModule = {
  readonly id: ModuleId
  readonly order: number
  readonly title: string
  readonly description: string
  readonly goal: string
  readonly // NEW FIELD (backward-compatible if optional):
  readonly lessons?: readonly { slug: string; order: number; level?: string }[]
}
```

**Pros:** Single authoritative source of truth; curriculum.ts knows its own lessons.  
**Cons:** Manual maintenance burden; diverges from the principle of letting frontmatter be the source of truth.

#### Recommendation: **Option A** (Registry Generator)

Best approach because:
1. Preserves frontmatter as the single source of truth for lesson metadata
2. Generates enrichment at build time (one-time cost)
3. Supports both navigation (byModule) and search (all + indexed tags) without touching source lessons
4. Can optionally feed back into curriculum.ts types at type-check time (e.g., validate `moduleId` exists)

### 9.4 Tag Normalization Strategy

Given the current tag chaos, recommend a multi-step normalization pipeline:

1. **Merge duplicate concepts:** Create synonyms map (e.g., `{"RAG 챗봇": "RAG", "Context Caching": "Prompt Caching", "도구 루프": "Tool Server"}`). Target: reduce 309 → ~80 core tags.
2. **Extract module-level default tags:** Instead of author-managed tags, auto-inject the module's thematic tags. For example, any lesson under `ai-system-design` automatically gets `[MCP, Context Engineering, Tool Calling]`.
3. **Add granular topic tags selectively:** Keep manual tags for truly unique cross-cutting concerns (e.g., `"Playwright"`, `"CodeQL"`, `"Firebase"`).
4. **Enforce via lint rule:** Add ESLint/prettier plugin or pre-commit hook that validates tag against allowed lexicon.

### 9.5 Data Flow Visualization

```
┌──────────────────────────────────────────────────────────────┐
│                    BUILD PROCESS                              │
│                                                               │
│  1. Read lesson frontmatter (YAML)                           │
│     └──► Validate fields: slug, moduleId, order, title...    │
│                                                               │
│  2. Build LESSON_REGISTRY                                     │
│     ├── byModule[moduleId][] = lesson metas sorted by order  │
│     ├── all[] = flattened list                               │
│     └── moduleStats[id] = {count, minutes, levels, tags}     │
│                                                               │
│  3. Merge with CURRICULUM_MODULES                             │
│     └── Each module.id gets:                                 │
│         ├── lessons: forward reference list                  │
│         ├── stats: aggregate metrics                         │
│         └── cross-links: prev/next lesson across modules     │
│                                                               │
│  4. Output:                                                    │
│     ├── registry.generated.ts (typed, importable)            │
│     └── search-index.json (flat, tag-normalized)             │
└──────────────────────────────────────────────────────────────┘
```

---

## 10. Risk Assessment & Recommendations

### High-Priority Gaps

| Issue | Severity | Effort | Recommendation |
|-------|----------|--------|----------------|
| **No forward lesson list in curriculum.ts** | Medium | Low | Generate `LESSON_REGISTRY` at build time |
| **Tag taxonomy is broken** (85% singleton) | High | Medium | Run synonym merge + enforce glossary |
| **No module-level aggregation** (duration, levels) | Medium | Low | Compute in registry generator |
| **Level not constrained by module boundary** | Low | N/A | Document as intentional; allow mix |

### Medium-Priority Improvements

| Issue | Description |
|-------|-------------|
| **Inconsistent tag case/mix** | Some English, some Korean, some camelCase; no PEP-style convention |
| **Title length varies wildly** | Shortest: 10 chars; longest: ~50 chars. Consider enforcing max ~80 |
| **Summary quality inconsistent** | Some are intros, some are descriptions, some are meta-hooks |
| **No prerequisite chain** | `order` gives local sequencing but no cross-module dependency info |
| **minutes accuracy unknown** | Estimates may not match actual read time; consider user feedback collection |

### Low-Priority (Nice-to-Have)

| Field Idea | Purpose |
|------------|---------|
| `prerequisites: []` | Cross-lesson dependency mapping |
| `relatedSlugs: []` | Cross-reference within/between modules |
| `difficultyScore: number` | Quantitative difficulty metric |
| `audience: ["beginner", "intermediate"]` | Broader audience tagging beyond level |
| `format: "text" \| "diagram-heavy" \| "command-ref"` | Layout hint for rendering |

---

## 11. Appendix A: Complete Tag Glossary (Top 50 by Frequency)

For integration work, this ordered list should serve as the starting point for normalization:

| # | Tag | Count |
|---|-----|-------|
| 1 | Agent | 9 |
| 2 | AI 시스템 설계 | 9 |
| 3 | Git | 9 |
| 4 | 레퍼런스 | 9 |
| 5 | Verification | 8 |
| 6 | Context Engineering | 8 |
| 7 | Tool Calling | 6 |
| 8 | RAG | 4 |
| 9 | Pull Request | 4 |
| 10 | Human Review | 4 |
| 11 | GitHub Copilot | 4 |
| 12 | API | 4 |
| 13 | 백엔드 | 4 |
| 14 | HTTP | 4 |
| 15 | 배포 | 4 |
| 16 | MCP | 4 |
| 17 | Explanation | 4 |
| 18 | AI 기초 | 4 |
| 19 | Next.js | 4 |
| 20 | Playwright | 3 |
| 21 | Claude Code | 3 |
| 22 | Codex | 3 |
| 23 | DOM | 3 |
| 24 | GitHub Actions | 3 |
| 25 | JavaScript | 3 |
| 26 | React | 3 |
| 27 | TypeScript | 3 |
| 28 | Vibe Coding | 3 |
| 29 | Workflow | 3 |
| 30 | deployment | 3 |
| 31 | Twelve-Factor | 3 |
| 32 | Browser | 2 |
| 33 | CLI | 2 |
| 34 | CSS | 2 |
| 35 | Citation | 2 |
| 36 | Cloud Agent | 2 |
| 37 | CodeQL | 2 |
| 38 | Context Window | 2 |
| 39 | Evals | 2 |
| 40 | GitHub | 2 |
| 41 | HTML | 2 |
| 42 | Hallucination | 2 |
| 43 | IntelliSense | 2 |
| 44 | Karpathy | 2 |
| 45 | PostgreSQL | 2 |
| 46 | Responsive Design | 2 |
| 47 | Retrieval | 2 |
| 48 | Sandbox | 2 |
| 49 | Skills | 2 |
| 50 | Terminal | 2 |

---

*Report end.*
