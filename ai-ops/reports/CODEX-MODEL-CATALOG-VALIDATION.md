# Codex Model Catalog Validation

```yaml
document: CODEX-MODEL-CATALOG-VALIDATION
status: pass
date: 2026-07-15
codex_cli: 0.144.4
catalog_source: active authenticated Codex catalog
command: codex debug models
```

## Result

All six requested model identifiers are visible in the active catalog for this Codex environment. No alias or fallback mapping is required.

| Model ID | Visible | API flag | Supported reasoning effort | Requested effort valid | Subagent configuration |
|---|---|---|---|---|---|
| `gpt-5.6-sol` | `list` | true | low, medium, high, xhigh, max, ultra | high: PASS | eligible |
| `gpt-5.6-terra` | `list` | true | low, medium, high, xhigh, max, ultra | medium/high: PASS | eligible |
| `gpt-5.6-luna` | `list` | true | low, medium, high, xhigh, max | low/medium: PASS | eligible |
| `gpt-5.5` | `list` | true | low, medium, high, xhigh | high: PASS | eligible |
| `gpt-5.4` | `list` | true | low, medium, high, xhigh | high: PASS | eligible |
| `gpt-5.4-mini` | `list` | true | low, medium, high, xhigh | low/medium: PASS | eligible |

## Environment and restriction notes

- `codex debug models` returned the refreshed active catalog rather than the bundled-only catalog.
- All requested models have `visibility: list`, so none is marked unavailable for the current authenticated environment.
- The catalog exposes each requested model as `supported_in_api: true`.
- Project custom agents support `model` and `model_reasoning_effort`; actual bounded spawn smoke is recorded separately in the configuration review.
- No additional account or workspace restriction was surfaced by the catalog command. This does not override future workspace policy changes or per-session permission controls.

## Bounded subagent smoke

The project configuration loaded under `--ignore-user-config --strict-config`, and Codex completed a bounded read-only smoke using `repository-explorer` and `mechanical-auditor`. Both requested checks returned PASS without file changes. This confirms current custom-agent discovery and bounded subagent use for the configured environment.

The first delegation attempt reported an orchestration-thread error, and several read-only shell forms were rejected by policy before Codex retried successfully. These are recorded as retry ergonomics, not model-unavailability evidence.

## Configuration decision

```text
ALL_REQUESTED_MODELS_CONFIRMED
CONTINUE_CONFIGURATION
```
