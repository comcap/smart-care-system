# PLAN.md — Smart Care System (React Native)

แผนงานสำหรับแบบทดสอบสัมภาษณ์ React Native — ใช้ไฟล์นี้เป็นจุดเริ่มต้นเมื่อเปิด Claude Code

---

## 1. Objective

Smart Care System — ระบบแจ้งปัญหา/ขอความช่วยเหลือภายในสำนักงาน 4 หน้า: Login → Main → Add Request → Request Detail

Data model:
```ts
interface SmartCare {
  id: string;        // uuid หรือ incremental
  title: string;
  description: string;
  createdAt: string; // ISO timestamp
}
```

## 2. Tech Stack (confirmed)

- RN + TypeScript + react-navigation (Stack) — **ห้ามใช้ Expo Router**
- react-hook-form + Zod (`@hookform/resolvers/zod`)
- Redux Toolkit → client state (auth session, UI state)
- redux-persist
- Jest + React Native Testing Library
- pnpm, Prettier, ESLint

## 3. Folder Structure

```
src/
  screens/
    Login/
    Main/
    AddRequest/
    RequestDetail/
  components/       # Button, Input, Card, ListItem, Modal
  navigation/        # RootStackParamList + Stack Navigator
  store/
    slices/authSlice.ts
    slices/smartCareSlice.ts
    store.ts
    persistConfig.ts
  schemas/          # login.schema.ts, addRequest.schema.ts
  theme/            # colors.ts, spacing.ts, typography.ts
  utils/            # id generator, date formatter
  types/
```

## 4. Screen Specs (from wireframe, decisions confirmed)

### Login
- Input เดียว รับได้ทั้งบัตร ปชช. 13 หลัก หรือเบอร์โทร 10 หลัก
- Validate ด้วย Zod, ปุ่ม submit disabled จนกว่าจะ valid
- Submit สำเร็จ → navigate ไป Main
- **Copy fix**: placeholder ต้องเป็น "กรอกเลขบัตร ปชช. หรือเบอร์โทร" (ของเดิมใน Figma พิมพ์ผิดเป็น "กรองเขตบัตร...")

### Main
- List: Smart Care ID + Title (1 บรรทัด, `numberOfLines={1}`)
- กด card → Request Detail
- ปุ่ม Add (มุมขวาบน) → Add Request
- Search box: กรอก ID กด Search → เจอไป Detail / **ไม่เจอ → แสดง modal** (ไม่ใช่ inline text, ไม่ filter list ในหน้า)
- Empty state: "ยังไม่มี Smart Care" เมื่อ list ว่าง
- Loading state ตอนโหลด list ครั้งแรก

### Add Request
- Field: Title, Description (react-hook-form + Zod, ครบทุก field ถึง submit ได้)
- **Submit สำเร็จ → navigate กลับไป Main** (ไม่ใช่ Request Detail)
- **Copy fix**: placeholder ต้องเป็น "กรอก Title" / "กรอก Description" (ของเดิมพิมพ์ผิดเป็น "กรอง...")

### Request Detail
- Read-only: Smart Care ID, Title, Description, createdAt (format อ่านง่าย)
- ไม่มี edit/delete

## 5. Open Decisions Already Made (ไม่ตรงกับสเปคเป๊ะ แต่ confirm แล้วโดยผู้สมัคร)

- Add Request submit สำเร็จ → กลับ Main
- Search ไม่เจอ → แสดง modal
- ใส่ทั้งสองข้อไว้ใน README ว่าเป็น assumption ที่ตัดสินใจเองในจุดที่สเปคไม่ระบุ

## 6. testID Convention

Format: `[screen]-[element]-[variant/state]`, kebab-case, ผ่าน prop `testID`

```
login-input-id
login-btn-submit
main-list
main-btn-add
main-input-search
main-modal-search-error
main-modal-btn-confirm
add-request-input-title
add-request-input-description
add-request-btn-submit
request-detail-card
```

## 7. Figma

- Wireframe เสร็จแล้ว 6 states (Login, Main-list, Main-empty, Add Request, Request Detail, Main+modal)
- Figma link: `https://www.figma.com/design/zkuQlprhLXhqmrheS6StAK/Smart-Care-System`
- **ยังไม่ทำ**: Design Tokens (Variables), Component/Variant จริงใน Figma — ตัดสินใจข้ามไปทำใน code เลยแทน (ประหยัดเวลา)
- Copy typo ที่ต้องแก้ตอน implement (ไม่ใช่แก้ใน Figma): ดูข้อ 4

## 8. Implementation Order

1. Scaffold RN project + install deps ตาม stack ข้อ 2
2. วาง folder structure ตามข้อ 3
3. `src/theme/` — colors, spacing, typography (ค่าเบื้องต้น ไม่ต้อง pixel-perfect กับ Figma)
4. `src/components/` — Button, Input, Card, Modal (พื้นฐานที่ใช้ซ้ำทุกหน้า)
5. `src/store/` — authSlice, smartCareSlice + persistConfig
6. `src/schemas/` — login.schema.ts, addRequest.schema.ts
7. Screens ทีละหน้า: Login → Main → Add Request → Request Detail
8. Navigation wiring (RootStackParamList + Stack)
9. Tests: schema validation, reducer logic, screen smoke tests
10. README: setup instructions, decisions ที่ตัดสินใจเอง (ข้อ 5), AI-assisted development section, เวลาที่ใช้จริง

## 9. AI SDLC Setup (already drafted, place in repo)

- `CLAUDE.md` — root of repo (stack, conventions, testID rules, AI roles table)
- `.claude/agents/ba.md` — Planner (clarify requirements, no code)
- `.claude/agents/design.md` — Design review, token sync ideas
- `.claude/agents/frontend.md` — Implementor
- `.claude/agents/qa.md` — Reviewer (no code edits, report only)
- `.claude/commands/new-screen.md` — scaffold screen
- `.claude/commands/gen-test.md` — generate test ตามชนิดไฟล์
- `.claude/commands/review-a11y.md` — a11y checklist RN-specific

Flow: `ba` (วางแผน) → approve → `frontend` (implement) → `qa` (review, ไม่แก้เอง) → done

## 10. Before Submitting

- [ ] `pnpm lint` ผ่าน
- [ ] `pnpm test` ผ่าน
- [ ] Copy typo ทั้งหมดแก้แล้ว (ข้อ 4)
- [ ] testID ครบตามข้อ 6
- [ ] README มี: วิธีรัน, decision log (ข้อ 5), AI-assisted dev section, เวลาที่ใช้จริง
- [ ] Repo เป็น public บน GitHub
- [ ] Commit history เป็น step ๆ อ่าน diff ได้ ไม่ commit เดียวยัดทุกอย่าง
