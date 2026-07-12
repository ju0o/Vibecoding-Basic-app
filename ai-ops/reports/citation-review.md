# Citation Review — Mode B (Public)

Updated: 2026-07-12 (Batch 2 public release preparation)

## Policy

- Active mode: **B (public)** — see `ai-ops/qa/CITATION-POLICY.md`
- Max 3 primary-source quote blocks per lesson
- Short quotes preferred; surplus converted to link-only lines

## Automation

| Script | Purpose |
|---|---|
| `scripts/scan-citations.mjs` | Detect many/long quotes |
| `scripts/apply-citation-mode-b.mjs` | Cap at 3 quotes; demote surplus; shorten |
| `scripts/shorten-long-quotes.mjs` / `force-shorten-remaining.mjs` | Extra shortening passes |

## Apply result (Batch 2)

See `citation-mode-b-apply-report.json`:

- Files changed: ~99
- Quote blocks demoted to link-only: ~173
- Shortened quote strings: multiple passes

## Residual risk

- Some lessons still teach historical “private gate” as a case study (educational).
- CC-BY-SA label consistency across every MDN cite is best-effort; links retained.
- Re-run `node scripts/scan-citations.mjs` after large content edits.
