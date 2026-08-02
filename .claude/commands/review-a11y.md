---
description: Review a component/screen for React Native accessibility issues
argument-hint: [component or screen path]
---

Review `$ARGUMENTS` for accessibility. Read-only — report findings, don't edit the file yourself unless explicitly asked to fix them afterward.

## Checklist

- **Labels**: every `TouchableOpacity`/`Pressable`/`Button`/`TextInput` has `accessibilityLabel` (and `accessibilityHint` where the action isn't obvious from the label alone)
- **Roles**: interactive elements have the correct `accessibilityRole` (`button`, `link`, `search`, `text`, etc.)
- **Touch targets**: interactive elements meet a minimum ~44x44 hit area (check `hitSlop` or padding if the visual element is smaller)
- **State announcements**: loading/disabled/error states are exposed via `accessibilityState` (e.g. `{ disabled: true, busy: true }`), not just visual styling
- **Text contrast**: text/background color pairs against `src/theme/colors.ts` — flag anything that looks borderline (don't need exact WCAG ratio math, just flag for a manual check)
- **Dynamic content**: for list items or error messages that appear/disappear, check whether `accessibilityLiveRegion` or focus management is needed so screen reader users notice the change
- **Form fields**: each input is associated with its visible label (not just placeholder text, which disappears on input and isn't a reliable label)

## Output format

For each issue found:
- **File/line**
- **Severity**: blocker / should-fix / nice-to-have
- **What's wrong**
- **Concrete fix** (exact prop/value to add — not "improve accessibility")

If nothing is wrong in a checklist category, say so briefly rather than skipping it silently — this makes the review auditable.
