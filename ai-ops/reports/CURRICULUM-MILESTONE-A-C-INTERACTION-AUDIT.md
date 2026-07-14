# Interaction Audit — React components (code-based)

```yaml
date: 2026-07-14
```

## Component map

| Component | Nodes | User input → state change? | Verdict |
|---|---|---|---|
| Day1FirstSuccessExperience | A01 | yes multi-step | interactive_learning |
| Day1QuizAndOutcomes | A01 | yes choices+checks | interactive_learning |
| ProjectFileStructure* | A02 | yes tree/selection | interactive_learning |
| NodeNpm* | A03 | yes scripts/errors | interactive_learning |
| AiLlmIdeExperience | A04 | yes | interactive_learning |
| TerminalCommandsExperience | A05 | yes | interactive_learning |
| ErrorsToAiExperience | A06 | yes compose request | interactive_learning |
| WebLayersExperience | **B01–B04** | toggle layers → preview | **interactive_but_shallow / duplicate_pattern** across 4 nodes |
| FileConnectExperience | B05 | break/repair links | interactive_learning |
| StackRolesExperience | B06–B07 | classify files | interactive_learning (shared OK if scenarios differ — pages don't) |
| RequestResponseExperience | B08 | method/path → status | interactive_learning |
| DataStoreExperience | B09 | save/refresh modes | interactive_learning |
| AiRequestBuilderExperience | C01 | toggle parts → quality | interactive_learning |
| PromptLabExperience | C02 | style toggles → risk | interactive_learning |
| ContextPickerExperience | C03–C04 | goal+files → grade | interactive_learning / mild duplicate |
| TaskBreakdownExperience | C05 | toggle steps → grade | interactive_learning |
| FixLoopExperience | C06 | advance phases | interactive_learning (linear; reset OK) |
| QaChecklistExperience | C07 | checkboxes → pass | interactive_learning (shallow but valid) |
| AgentWorkflowExperience | **C08–C10** | mode switch → steps/risk | **duplicate_pattern** — not three distinct decision spaces |

## a11y notes

| Check | Status |
|---|---|
| Keyboard buttons | mostly native `<button>` / checkbox — OK |
| aria-live via AnimationShell | present |
| reduced-motion | BrowserPreview accepts prop; many callers pass `false` fixed — **accessibility_gap** minor |
| No pure text stepper as sole interaction on A01–A03 | pass |

## Required interaction fixes

1. B02–B04: keep WebLayers but **node-specific default focus + task** (HTML-only edit, CSS-only, JS-only) so student decision differs.  
2. C08–C10: shared shell OK if **locked mode + node-specific scenario prompts** (agent loop exercise vs subagent assignment vs workflow design).  
3. Document not_applicable only if truly conceptual without sim — none claimed.
