---
description: Scaffold a new screen (component + styles + navigation type) following this project's conventions
argument-hint: [screen-name]
---

Scaffold a new screen named `$ARGUMENTS` for the Smart Care System app.

Before creating anything:
1. Read `CLAUDE.md` for folder structure and naming conventions
2. Read an existing screen under `src/screens/` (e.g. `Login` or `Main`) to match the current pattern exactly — component structure, styles file, how navigation types are declared

Then create:

1. **`src/screens/$ARGUMENTS/$ARGUMENTS.tsx`**
   - Functional component, typed with the screen's props from `RootStackParamList`
   - No business logic inline — if the screen needs state, wire it to a Redux slice under `src/store/slices/` (create one only if it doesn't already cover this screen's data)
   - If the screen has a form, use `react-hook-form` + a Zod schema from `src/schemas/` (create the schema file if it doesn't exist — do not inline validation)
   - Add `testID` to every interactive element per the testID Conventions section in `CLAUDE.md` (BEM-inspired format: `$ARGUMENTS__element--variant`, lowercased/kebab-case)
   - Handle loading/empty/error states if the screen does anything async

2. **`src/screens/$ARGUMENTS/$ARGUMENTS.styles.ts`**
   - `StyleSheet.create` — use values from `src/theme/` tokens (colors, spacing, typography), never hardcoded hex/pixel values

3. **Update `src/navigation/`**
   - Add the screen to `RootStackParamList` with its param type
   - Register it in the Stack Navigator

4. **`src/screens/$ARGUMENTS/__tests__/$ARGUMENTS.test.tsx`**
   - Minimal smoke test: renders without crashing, key `testID`s are present

## Rules

- Don't invent business rules or copy that isn't specified — mark with `TODO: confirm` and flag it in your summary
- Don't add libraries not already in `package.json` without asking first
- After scaffolding, run `pnpm lint` and report the result
