---
description: Generate a Jest/RNTL test for a given file (schema, reducer, or component)
argument-hint: [file path]
---

Generate a test for `$ARGUMENTS`.

First, read the target file to understand what it does, and read `CLAUDE.md` for testing conventions. Then check if a test already exists nearby (`__tests__/` folder or `.test.ts(x)` alongside the file) — if one exists, extend it rather than creating a duplicate.

## What to test, by file type

**Zod schema (`src/schemas/*.ts`)**
- Valid input passes
- Each invalid case the schema is meant to catch fails with the right message (e.g. empty required field, wrong ID digit length)
- Edge cases at the boundary (e.g. exactly 13 digits vs. 12/14 for a citizen ID field)

**Redux slice (`src/store/slices/*.ts`)**
- Initial state is correct
- Each action/reducer case produces the expected state transition
- Selectors (e.g. find-by-id, search) return correct results for both hit and miss cases

**Component/screen (`src/screens/**`, `src/components/**`)**
- Renders without crashing
- Key `testID`s from the component are present and queryable
- User interactions that matter (button press, form submit) trigger the expected effect — mock the Redux store/navigation as needed
- Disabled/error/empty states render correctly when their conditions are met

## Rules

- Use descriptive test names: `should X when Y`
- Don't test implementation details (internal variable names, private helpers) — test observable behavior
- Don't write a test for behavior the file doesn't actually implement — if something looks missing, say so instead of testing around it
- After generating, run `pnpm test` on the new file and report pass/fail
