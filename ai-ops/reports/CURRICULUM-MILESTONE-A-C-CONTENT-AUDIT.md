# Content Depth Audit — A01–C10

```yaml
date: 2026-07-14
method: read full student markdown; measure size + structure
```

## Size signal (bytes, approximate)

| Band | Lessons | Judgment |
|---|---|---|
| Deep (>3k) | 01–03 | review_ready (A01 strongest) |
| Medium (700–1300) | 04–06, 11–19 | partial / expandable |
| Thin (<500) | **07–10, 20–25** | **thin → auto remediate** |

## Per-node depth

| ID | Depth | Notes |
|---|---|---|
| A01 | review_ready | Path A/B, misconceptions, flow |
| A02 | review_ready | tree, edit targets |
| A03 | review_ready | scripts, errors |
| A04 | partial | good distinctions; short |
| A05 | partial | command basics |
| A06 | partial | error packet |
| B01 | **thin** | definition paragraphs only |
| B02 | **thin** | ~structure only |
| B03 | **thin** | |
| B04 | **thin** | |
| B05 | partial | better why-now |
| B06 | partial | FE boundary OK |
| B07 | partial | server.js OK |
| B08 | partial | API educational |
| B09 | partial | product disclaimer good |
| C01 | partial | checklist good |
| C02 | partial | needs anti-magic |
| C03 | partial | |
| C04 | partial | overlaps C03 |
| C05 | **thin** | outline only |
| C06 | **thin** | |
| C07 | **thin** | |
| C08 | **thin** | overclaim risk if expanded poorly |
| C09 | **thin** | |
| C10 | **thin** | |

## Checks

| Risk | Finding |
|---|---|
| Non-dev readability | A01–A03 strong; thin nodes assume prior terms |
| Duplication | B02–B04 all point to same WebLayers story; C08–C10 same switcher |
| Product-as-standard | Mostly avoided; Agent/Prompt labeled educational in better nodes |
| Too abstract | C05–C10 without concrete Day1 anchors |
| Source gap | Few nodes cite official URLs inline |

## Remediation priority

1. B01–B04 deepen (foundation of Track B)
2. C05–C10 deepen + Day1/project anchors
3. A04–A06 practice/quiz completeness
4. Workbook Word later — not blocking if MD review_ready
